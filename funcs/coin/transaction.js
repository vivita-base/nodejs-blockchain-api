module.exports = (async () => {

  const {CoinEnum} = require('../../enums/coin');

  const BTC = await require('./coins/btc/bundle');
  const ETH = await require('./coins/eth/bundle');
  const LTC = await require('./coins/ltc/bundle');
  const BCH = await require('./coins/bch/bundle');
  const DASH = await require('./coins/dash/bundle');
  const DOGE = await require('./coins/doge/bundle');

  const build = async (req,coin,inputs,outputs,changeAddress,fee) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    switch(coin) {
      case CoinEnum.BTC.Coin:r = await BTC.Transaction.build(req,inputs,outputs,changeAddress,fee);break;
      case CoinEnum.ETH.Coin:r = await ETH.Transaction.build(req,inputs,outputs,changeAddress,fee);break;
      case CoinEnum.LTC.Coin:r = await LTC.Transaction.build(req,inputs,outputs,changeAddress,fee);break;
      case CoinEnum.BCH.Coin:r = await BCH.Transaction.build(req,inputs,outputs,changeAddress,fee);break;
      case CoinEnum.DASH.Coin:r = await DASH.Transaction.build(req,inputs,outputs,changeAddress,fee);break;
      case CoinEnum.DOGE.Coin:r = await DOGE.Transaction.build(req,inputs,outputs,changeAddress,fee);break;
      default:d.err.code = 1;d.err.message = "Coin.build no Coin found";return d;
    }
    
    if(r.err.code) return r;
    d.res = r.res;

    return d;
  }

  const sign = async (req,coin,transactionObj,wallets) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    switch(coin) {
      case CoinEnum.BTC.Coin:r = await BTC.Transaction.sign(req,coin,transactionObj,wallets);break;
      case CoinEnum.ETH.Coin:r = await ETH.Transaction.sign(req,coin,transactionObj,wallets);break;
      case CoinEnum.LTC.Coin:r = await LTC.Transaction.sign(req,coin,transactionObj,wallets);break;
      case CoinEnum.BCH.Coin:r = await BCH.Transaction.sign(req,coin,transactionObj,wallets);break;
      case CoinEnum.DASH.Coin:r = await DASH.Transaction.sign(req,coin,transactionObj,wallets);break;
      case CoinEnum.DOGE.Coin:r = await DOGE.Transaction.sign(req,coin,transactionObj,wallets);break;
      default:d.err.code = 1;d.err.message = "Coin.build no Coin found";return d;
    }

    if(r.err.code) return r;
    d.res = r.res;

    return d;
  }

  return {
    build,
    sign,
  };
})();
