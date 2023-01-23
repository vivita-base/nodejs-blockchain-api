"use strict";

let Keys = require("./common/keys-temp");
try {Keys = require("./common/keys");} catch (e) {} // load Keys if the file is here

(async () => {
  // Server Setup
  const {CoinNodesEnum} = await require('./enums/coin-nodes');
  const {Config} = await require("./common/config");
  const app = await require("./app.js");
  const server = require("http").createServer(app);
  const port = process.env.PORT || Keys.DefaultPort;
  const AutoStart = await require('./handlers/auto-start');
  const ZeromqHandlder = await require('./handlers/zeromq');

  console.log("Keys.Coins",Keys.Coins);
  let coins = [];
  for (let i = 0; i < Keys.Coins.length; i++) {
    coins.push(Keys.Coins[i].Coin);
  }
  for(let key in CoinNodesEnum){
    let CoinNodeEnum = CoinNodesEnum[key];

    if(CoinNodeEnum.Network !== "Regular"){
      continue;
    }
    if(coins.indexOf(key) === -1){
      console.log("skipping",key);
      continue;
    }

    await ZeromqHandlder.socket(CoinNodeEnum.BlockPort,"rawblock",CoinNodeEnum.Coin)
    await ZeromqHandlder.socket(CoinNodeEnum.TransactionPort,"rawtx",CoinNodeEnum.Coin)
  }

  server.listen(process.env.PORT || port, () => {
    console.log(`VIVITA BASE Node listening port:${process.env.PORT || port} env:${Config.Env}`);
    AutoStart.run();
  });
})();
