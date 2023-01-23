// Rename this file to keys.js
const {EnvironmentEnum} = require('../enums/environments');
const {CoinEnum} = require('../enums/coin');

module.exports = {

  Coins: [
    CoinEnum.BTC,
    CoinEnum.ETH,
    CoinEnum.BCH,
    CoinEnum.LTC,
    CoinEnum.DOGE,
    CoinEnum.DASH,
  ],

  DefaultEnvironment:  EnvironmentEnum.Local,
  DefaultPort: 3084,

  ServerName:"",
  ServerToken:"",

  // Database Info
  Database:{
    Node:{
      Host: "localhost",
      Username: "root",
      Password: "root",
      Name: "vivitabase_node",
      Port: "8889",
    },
    LocalNode:{
      Host: "localhost",
      Username: "root",
      Password: "root",
      Name: "local_sign_localcoin",
      Port: "8889",
    },
  },

  RpcKeys:{
    BTC:{User:"vivitaBaseBTC",Pass:"changeThisPasswordToSomethingElsePlease"},    
    ETH:{User:"vivitaBaseETH",Pass:"changeThisPasswordToSomethingElsePlease"},
    LTC:{User:"vivitaBaseLTC",Pass:"changeThisPasswordToSomethingElsePlease"},
    BCH:{User:"vivitaBaseBCH",Pass:"changeThisPasswordToSomethingElsePlease"},
    DASH:{User:"vivitaBaseDASH",Pass:"changeThisPasswordToSomethingElsePlease"},
    DOGE:{User:"vivitaBaseDOGE",Pass:"changeThisPasswordToSomethingElsePlease"},
  }

};
