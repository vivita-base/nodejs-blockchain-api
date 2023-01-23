
module.exports = (async() => {

  // const BitcoreLib = require('bitcore-lib');
  // const Mnemonic = require('bitcore-mnemonic');
  // const Wallet = require('ethereumjs-wallet');
  // const Web3 = require('web3');
  // const Dawicore = await require('../libs/dawicore');

  // const {CoinNodesEnum} = await require('../enums/coin-nodes');
  // const {CoinEnum} = require('../enums/coin');
  // const Coin = await require('../funcs/coin/bundle');
  // const {RpcMethodEnum} = require('../enums/rpc-method');


  const {erc20abi} = require('../funcs/eth-block/erc20abi');
  // const Eth = require('web3-eth');
  const Web3 = require('web3');
  const InputDataDecoder = require('ethereum-input-data-decoder');
  const decoder = new InputDataDecoder(erc20abi);

  const ethProvider = "http://127.0.0.1:8545";
  // const ethProvider = "https://celo-mainnet.infura.io/v3/156213a1d9b54f989b3c532adefa7921";
  const web3 = new Web3(new Web3.providers.HttpProvider(ethProvider))

  return {
    get: async (req) => {
      const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;


      // // === Create a Seed Phrase
      // let wordList = new Mnemonic(Mnemonic.Words.ENGLISH).toString();
      // let wordList = new Mnemonic(Mnemonic.Words.CHINESE).toString();
      // let wordList = new Mnemonic(Mnemonic.Words.FRENCH).toString();
      // let wordList = new Mnemonic(Mnemonic.Words.ITALIAN).toString();
      // let wordList = new Mnemonic(Mnemonic.Words.JAPANESE).toString();
      // let wordList = new Mnemonic(Mnemonic.Words.KOREAN).toString();
      // let wordList = new Mnemonic(Mnemonic.Words.SPANISH).toString();
      // d.res.wordList = wordList;

      // // === Create a Wallet using Seed Phrase
      // let seedPhrase = "sleep original click erupt under already that initial arch tribe nuclear action";
      // let passPhrase = "vivitabase";

      // let options = {
      //   seedPhrase: seedPhrase,
      //   passPhrase: passPhrase,
      // }

      // let coin = CoinEnum.ETH.Coin;
      // r = await Coin.Address.generateHdPrivateKey(req, coin, options);
      // if(r.err.code) return r;
      // d.res = r.res;


      // // === Fetch Block
      // let coinNode = CoinNodesEnum.BTC.Coin;
      // let height = 766390;
      // let coinNode = CoinNodesEnum.DOGE.Coin;
      // let height = 4505709;
      // // r = await Dawicore.getBlockByHeight(coinNode,height);
      // r = await Dawicore.pingNode()
      // if(r.err.code) return r;
      // d.res = r.res;



      // === Fetch Eth Block
      let blockNum = 16145146;
      let block = await web3.eth.getBlock(blockNum);
      d.res.block = block;

      // let txHash = "0x4aa41b293d2cdc7b5c4bb7bf58e55cc61398eec774e6c09a01e072fbd133ef0a";
      // let transaction = await web3.eth.getTransaction(txHash);
      // d.res.transaction = transaction;

      return d;
    },
  };
})();