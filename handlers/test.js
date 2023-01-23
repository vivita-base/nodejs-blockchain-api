
module.exports = (async() => {

  // const BitcoreLib = require('bitcore-lib');
  // const Mnemonic = require('bitcore-mnemonic');
  // const Wallet = require('ethereumjs-wallet');
  // const Web3 = require('web3');
  const Dawicore = await require('../libs/dawicore');

  const {CoinNodesEnum} = await require('../enums/coin-nodes');
  const {CoinEnum} = require('../enums/coin');
  // const Coin = await require('../funcs/coin/bundle');
  const {RpcMethodEnum} = require('../enums/rpc-method');


  return {
    get: async (req) => {
      const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;


      // === Create a Seed Phrase
      // let wordList = new Mnemonic(Mnemonic.Words.ENGLISH).toString();
      // d.res.wordList = wordList;

      // === Create a Wallet using Seed Phrase
      // let seedPhrase = "enlist fee season relax evolve push chronic gold happy beef kangaroo slice";
      // let passPhrase = "vivitabase";

      // let options = {
      //   seedPhrase: seedPhrase,
      //   passPhrase: passPhrase,
      // }

      // let coin = CoinEnum.BTC.Coin;
      // r = await Coin.Address.generateHdPrivateKey(req,coin, options);
      // if(r.err.code) return r;
      // d.res = r.res;


      // // === Create a Wallet using Seed Phrase
      // let coinNode = CoinNodesEnum.BTC.Coin;
      // let height = 766390;
      // // let coinNode = CoinNodesEnum.DOGE.Coin;
      // // let height = 4505709;
      // r = await Dawicore.getBlockByHeight(coinNode,height);
      // if(r.err.code) return r;
      // d.res = r.res;


      return d;
    },
  };
})();