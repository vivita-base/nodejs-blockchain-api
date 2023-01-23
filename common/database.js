module.exports = (async () => {
  
  const {Config,EnvironmentEnum} = await require('./config');
  const {DatabaseEnum} = await require('../enums/database');
  const {clone} = require('../utils/clone');

  const Mysql = require('mysql');
  const { promisify } = require('util');

  const DefaultDatabase = DatabaseEnum.Node;

  const DatabaseConfig = {}
  const MockDatabaseConfig = {};
  for(let key in DatabaseEnum){
    let dbObj = {
      host: Config.Database[key].Host, user: Config.Database[key].Username, password: Config.Database[key].Password,
      port: Config.Database[key].Port, database: Config.Database[key].Name, 
      connectionLimit: 10, multipleStatements: true,
    }
    DatabaseConfig[key] = dbObj;
    if(Config.MockTests){
      let cloneDbObj = clone(dbObj);
      cloneDbObj.database += "_mock" ;
      DatabaseConfig[key+"Mock"] = cloneDbObj;
      MockDatabaseConfig[key+"Mock"] = cloneDbObj
    }
  }

  const Pool = {}
  for (let key in DatabaseConfig) {
    Pool[key] = Mysql.createPool(DatabaseConfig[key]);
  }

  const PromiseQuery = {}
  for (let key in DatabaseConfig) {
    PromiseQuery[key] = {
      query: promisify(Pool[key].query).bind(Pool[key]),
    }
  }

  const promiseQuery = async (sql,vars,dbName) => {
    dbName = (dbName && dbName in DatabaseEnum)?dbName:DefaultDatabase;

    if(Config.MockTests && Config.MockTesting){
      dbName += "Mock";
    }

    return await PromiseQuery[dbName].query(sql,vars);
  }

  const query = async (sql,vars,dbName) =>{
    const d = {err: {code:0,message:""},res:{}}; let r;

    if(sql.includes("INSERT INTO")){
      if(!sql.includes("VALUES")){
        sql += " VALUES ("
        for (let i = 0; i < vars.length; i++){
          sql += (i)?",?":"?";
        }
        sql += ")";
      }
    }

    try{
      r = await promiseQuery(sql,vars,dbName);
    }catch(e){
      d.err.code = 1;
      d.err.message = "Database Error: "+e;
      if(Config.Env !== EnvironmentEnum.Production){
        d.err.message += " SQL: "+sql;
      }
      try{
        // Database Error logging
        const timenow = new Date();
        const rpSql = "INSERT INTO z_database_error_log "+
        "(error_msg,sql_text,var_text,created_date)"+
        " VALUES (?,?,?,?)";
        const rpVars = [JSON.stringify(e),sql,vars.toString(),timenow];
        await promiseQuery(rpSql,rpVars,dbName);
      }catch(e){
        console.error("z_database_error_log failed",dbName);
        console.log("e:",e);
      }
      console.log("database error dump:",dbName," d.err",d.err);
      return d;  
    }

    d.res = r;

    return d;
  }

  const getTransaction = async (dbEnum) => {
    const d = {err: {code:0,message:""},res:{}}; let r;
    dbEnum = dbEnum in DatabaseEnum?dbEnum:DefaultDatabase;

    const con = Mysql.createConnection(DatabaseConfig[dbEnum]);

    const query = async (sql, vars) => {
      if(sql.includes("INSERT INTO")){
        if(!sql.includes("VALUES")){
          sql += " VALUES ("
          for (let i = 0; i < vars.length; i++){
            sql += (i)?",?":"?";
          }
          sql += ")";
        }
      }

      let localQuery = promisify(con.query).bind(con)

      return localQuery(sql,vars);
    }

    const Transaction = {
      query: query,
      begin: promisify(con.beginTransaction).bind(con),
      commit: promisify(con.commit).bind(con),
      rollback: promisify(con.rollback).bind(con),
      end: promisify(con.end).bind(con),
    }
    
    d.res = {
      Transaction,
    }

    return d;
  }

  const Node = { query: async (sql,vars,) => query(sql,vars,DatabaseEnum.Node) }
  const LocalNode = { query: async (sql,vars,) => query(sql,vars,DatabaseEnum.LocalNode) }

  console.log("Database Ready");

  return {
    DatabaseConfig,
    MockDatabaseConfig,
    query: query,
    getTransaction,
    Node:{query:Node.query, Config: DatabaseConfig.Node},
    LocalNode:{query:LocalNode.query, Config: DatabaseConfig.LocalNode},
  }

})();
