module.exports = (async () => {

  const Address = await require('./address');
  const {Config} = await require('../../../../common/config');
  const DashcoreLib = require('@dashevo/dashcore-lib');
  const LogUtil = await require('../../../../utils/log');
  const StringUtil = require('../../../../utils/string');
  const {WalletEnum} = require('../../../../enums/wallet')

  const inCalc = 148;
  const outCalc = 34;
  const addCalc = 10;

  const build = async (req,inputs,outputs,changeAddress,fee) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    let utxos = [];
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const utxo = {
        "txId" : input.txId,
        "outputIndex" : input.positionIndex,
        "address" : input.address,
        "script" : input.scriptHex,// <- vout.scriptPubKey.hex
        "satoshis" : parseInt(input.valueSats),
      };
      utxos.push(utxo);
    }

    let transaction = new DashcoreLib.Transaction(); //Build Transaction
    transaction.from(utxos); // Feed information about what unspent outputs one can use
    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i];
      transaction.to(output.address, output.amountSats); // Add an output with the given amount of satoshis
    }
    transaction.change(changeAddress); // Sets up a change address where the rest of the funds will go
    transaction.fee(fee); // Adds Fee

    const serialized = transaction.toString();
    const sizeEst = (inputs.length * inCalc) + ((outputs.length + 1) * outCalc) + addCalc;

    d.res = {
      transaction,
      serialized,
      sizeEst,
    }

    return d;
  }

  // wallets = {name:[child]}
  const sign = async (req,coin,transactionObj,wallets) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;
    coin = coin.toUpperCase()
    const transaction = new DashcoreLib.Transaction(transactionObj);

    for(let key in wallets){
      let walletName = StringUtil.capitalize(key);
      for (let i = 0; i < wallets[key].length; i++) {
        const walletChild = wallets[key][i];
        if(walletName in WalletEnum && walletName in Config.Wallet){

          let seed = Config.Wallet[walletName][coin].Seed;
          let pass = Config.Wallet[walletName][coin].Pass;

          if(seed === undefined || pass === undefined){
            let msg = "Sign: Seed or Pass is undefined";
            await LogUtil.dbLogError("Sign Error",{msg,coin,transactionObj,wallets});
            d.err.message = msg
            d.err.code = 1; return d;
          }

          let options = {
            seedPhrase: seed,
            passPhrase: pass,
          }
          r = await Address.generateHdPrivateKey(req,options);
          if(r.err.code) return r;

          let {hdPrivateKey} = r.res;

          r = await Address.deriveAddress(req,hdPrivateKey,walletChild,);
          if(r.err.code) return r;

          let {private} = r.res;

          let privateKey = new DashcoreLib.PrivateKey(private);

          transaction.sign(privateKey) // Signs all the inputs it can

        }
      }
    }

    const newSerialized = transaction.toString();

    d.res = {
      transaction,
      serialized: newSerialized,
    }

    return d;
  }

  return {
    build,
    sign,
  };
})();
