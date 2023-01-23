module.exports = (async () => {

  const Db = await require('../../common/database');
  const {Config} = await require('../../common/config');
  const {CoinEnum} = require('../../enums/coin');
  const {WalletEnum} = require('../../enums/wallet');

  const BTC = await require('./coins/btc/bundle');
  const ETH = await require('./coins/eth/bundle');
  const LTC = await require('./coins/ltc/bundle');
  const BCH = await require('./coins/bch/bundle');
  const DASH = await require('./coins/dash/bundle');
  const DOGE = await require('./coins/doge/bundle');

  const deriveAddress = async (req,coin,hdPrivKey,child,private) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    if(child > 2147483647){ d.err.code = 1; d.err.message = "Derive int too large";return d;}

    switch(coin) {
      case CoinEnum.BTC.Coin:r = await BTC.Address.deriveAddress(req,hdPrivKey,child);break;
      case CoinEnum.ETH.Coin:r = await ETH.Address.deriveAddress(req,hdPrivKey,child);break;
      case CoinEnum.LTC.Coin:r = await LTC.Address.deriveAddress(req,hdPrivKey,child);break;
      case CoinEnum.BCH.Coin:r = await BCH.Address.deriveAddress(req,hdPrivKey,child);break;
      case CoinEnum.DASH.Coin:r = await DASH.Address.deriveAddress(req,hdPrivKey,child);break;
      case CoinEnum.DOGE.Coin:r = await DOGE.Address.deriveAddress(req,hdPrivKey,child);break;
      default:d.err.code = 1;d.err.message = "Coin.deriveAddress no Coin found";return d;
    }
    if(r.err.code) return r;
    let results = r.res;
    if(!private){
      if(results.private) delete results.private;
    }
    d.res = results;

    return d;
  }

  const generateHdPrivateKey = async (req,coin,options,) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;
    options = (options)?options:{};

    switch(coin) {
      case CoinEnum.BTC.Coin:r = await BTC.Address.generateHdPrivateKey(req,options,);break;
      case CoinEnum.ETH.Coin:r = await ETH.Address.generateHdPrivateKey(req,options,);break;
      case CoinEnum.LTC.Coin:r = await LTC.Address.generateHdPrivateKey(req,options,);break;
      case CoinEnum.BCH.Coin:r = await BCH.Address.generateHdPrivateKey(req,options,);break;
      case CoinEnum.DASH.Coin:r = await DASH.Address.generateHdPrivateKey(req,options,);break;
      case CoinEnum.DOGE.Coin:r = await DOGE.Address.generateHdPrivateKey(req,options,);break;
      default:d.err.code = 1;d.err.message = "Coin.generateHdPrivateKey no Coin found";return d;
    }
    if(r.err.code) return r;
    d.res = r.res;

    return d;
  }

  const isValid = async (req,coin,publicAddress,) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    switch(coin) {
      case CoinEnum.BTC.Coin:r = await BTC.Address.isValid(req,publicAddress,);break;
      case CoinEnum.ETH.Coin:r = await ETH.Address.isValid(req,publicAddress,);break;
      case CoinEnum.LTC.Coin:r = await LTC.Address.isValid(req,publicAddress,);break;
      case CoinEnum.BCH.Coin:r = await BCH.Address.isValid(req,publicAddress,);break;
      case CoinEnum.DASH.Coin:r = await DASH.Address.isValid(req,publicAddress,);break;
      case CoinEnum.DOGE.Coin:r = await DOGE.Address.isValid(req,publicAddress,);break;
      default:d.err.code = 1;d.err.message = "Coin.isValid no Coin found";return d;
    }
    if(r.err.code) return r;
    d.res = r.res;

    return d;
  }

  const generatePublicAddress = async (req,coin,child,wallet) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    if(!wallet in WalletEnum){d.err.code = 1; d.err.message = "Wallet not specified";return d;}

    let {addressGeneration,depositConfirmations,withdrawals,} = r.res;
    if(!addressGeneration){
      d.err.code = 1;
      d.err.message = "Address Generation for this coin is currently disabled";
      d.err.addressGenerationDisabled = true;
      return d;
    }

    let walletObj = Config.Wallet[wallet][coin];

    let seedPhrase = walletObj.Seed;
    let passPhrase = walletObj.Pass;

    if(seedPhrase === undefined || passPhrase === undefined){
      let msg = "seedPhrase or passPhrase is undefined";
      console.log("walletObj",walletObj);
      console.log("wallet",wallet);
      console.log("coin",coin);
      console.log("msg",msg);
      d.err.message = msg;
      d.err.code = 1; return d;
    }

    let options = {
      seedPhrase: seedPhrase,
      passPhrase: passPhrase,
    }

    r = await generateHdPrivateKey(req,coin,options);
    if(r.err.code) return r;

    let {hdPrivateKey} = r.res;
    r = await deriveAddress(req,coin,hdPrivateKey,child,);
    if(r.err.code) return r;

    let {address,} = r.res;

    //`coin`,`child`,`user_id`,`wallet`
    sql = "SELECT * FROM addresses WHERE coin = ? AND child = ? AND user_id = ? AND wallet = ?";
    vars = [coin,child,child,wallet];
    r = await Db.query(sql,vars);
    if(r.err.code) return r;
    
    if(r.res.length === 0){
      sql = "INSERT INTO addresses (`user_id`,`coin`,`address`,`wallet`,`child`,`created_date`)";
      vars = [child,coin,address,wallet,child,new Date()];
      r = await Db.query(sql,vars);
      if(r.err.code) return r;
    }

    d.res.address = address;

    return d;
  }

  return {
    deriveAddress,
    generateHdPrivateKey,
    isValid,
    generatePublicAddress,
  };
})();
