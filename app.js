const {EnvironmentEnum} = require("./common/env");
const ObjectUtil = require("./utils/object");
const PackageJson = require("./package.json");

// Simulate real API calls
const delayResponse = 250; // milliseconds

module.exports = (async () => {
  const {Config} = await require("./common/config");

  const Test = await require("./handlers/test");
  
  // ==============================================
  // Base setup
  // ==============================================

  process.env.TZ = "Etc/GMT";

  const express = require("express");
  const session = require("express-session");
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use(require("express-useragent").express());
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  // Cors
  app.use(async (req,res,next) => {
 
    res.header("Access-Control-Allow-Origin", "*");
    req.session.language = req.query.lg;

    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, auth-id, auth-token,");
    res.header("Access-Control-Allow-Methods","PATCH, POST, GET, DELETE, OPTIONS");
    next();
  });

  // ==============================================
  // Auth
  // ==============================================

  const normRoute = (req, res, next) => {
    req.body = (req.body != undefined && req.body != null)?ObjectUtil.toCamelCaseKeys(req.body):req.body;
    response(req, res, next(req));
  };

  // ===============================================================
  // Routes
  // ===============================================================

  app.get("/", (req,res) => {res.send(
    "<html><head></head><body>API is running <br>"+
      "App: "+Config.FrontEnd.AppName+"<br>"+
      "Env: "+Config.Env+"<br>"+
      "Version: "+PackageJson.version+"<br>"+
    "</body></html>"
  );});

  app.get('/test', (req,res) => { normRoute(req,res,Test.get) });
  app.post('/test', (req,res) => { normRoute(req,res,Test.post) });
  app.patch('/test', (req,res) => { normRoute(req,res,Test.patch) });
  // app.get(/^\/test\/(.*)-(.*)$/, (req, res) => { response(req,res,test.get) });
  // app.get('/test/:version', (req, res) => { normRoute(req,res,test.get) });

  // ==============================================
  // Response type
  // ==============================================

  const response = async (req, res, obj) => {
    await obj;

    Promise.resolve(obj).then((val) => {
      if (Config.Env === EnvironmentEnum.Local && delayResponse >= 1) {
        setTimeout(() => {
          resume(req, res, val);
        }, delayResponse);
        return true;
      }
      resume(req, res, val);
    });
  };

  const resume = (req, res, obj) => {
    obj = (obj === undefined)?{}:obj;

    var status = obj.status !== undefined ? obj.status : 200;
    // Let status override settings
    if (obj.status === undefined) {
      if (obj.err.code) {
        status = 400;
      }
    }

    let json = {
      err: obj.err,
      res: obj.res,
    };

    res.status(status).json(json);
  };

  // ==============================================
  // server.js starts the server
  // ==============================================
  return app;
})();
