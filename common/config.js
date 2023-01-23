`use strict`;
const { Environment, EnvironmentEnum } = require("./env");
let Keys = require("./keys-temp");
try {Keys = require("./keys");} catch (e) {} // load Keys if the file is here

const Settings = {
  
};

const Config = {
  ServerName: Keys.ServerName,
  ServerToken: Keys.ServerToken,
  Coins: Keys.Coins,
  Common:{
    ReturnCollectorUserId: 2, // For output ids
  },
  Database: {
    Node:{
      Host: Keys.Database.Node.Host,
      Name: Keys.Database.Node.Name,
      Username: Keys.Database.Node.Username,
      Password: Keys.Database.Node.Password,
      Port: Keys.Database.Node.Port,
    },
    LocalNode:{
      Host: Keys.Database.LocalNode.Host,
      Name: Keys.Database.LocalNode.Name,
      Username: Keys.Database.LocalNode.Username,
      Password: Keys.Database.LocalNode.Password,
      Port: Keys.Database.LocalNode.Port,
    },
  },
  Env: Environment,
  FrontEnd:{
    AppName: "Localcoin Node",
  },
  RpcKeys: Keys.RpcKeys,
};

if (
  Environment === EnvironmentEnum.Production ||
  Environment === EnvironmentEnum.Release ||
  Environment === EnvironmentEnum.Development ||
  Environment === EnvironmentEnum.Test
) {
  Config.Env = Environment;
}

module.exports = (async () => {
  return { Config, EnvironmentEnum, Settings };
})();
