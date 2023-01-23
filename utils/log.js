
module.exports = (async () => {
  const Db = await  require('../common/database');

  const dbLog = async (header, logObj) => {
    const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;

    return d;
  }

  const dbLogError = async (header, logObj) => {
    const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;

    return d;
  }

  const dbLogWarning = async (header, logObj) => {
    const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;

    return d;
  }

  return {
    dbLog,
    dbLogError,
    dbLogWarning,
  };
})();
