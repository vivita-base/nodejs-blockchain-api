
const {EnvironmentEnum} = require('../enums/environments');
let Keys = require("./keys-temp");
try {Keys = require("./keys");} catch (e) {} // load Keys if the file is here

let env = EnvironmentEnum.Local;

if(Keys.DefaultEnvironment && Keys.DefaultEnvironment in EnvironmentEnum){
  env = Keys.DefaultEnvironment;
}else if(process.env.setEnv){
  if(process.env.setEnv in EnvironmentEnum){
    env = EnvironmentEnum[process.env.setEnv];
  }
}

const Environment = env;

module.exports = {Environment,EnvironmentEnum,};