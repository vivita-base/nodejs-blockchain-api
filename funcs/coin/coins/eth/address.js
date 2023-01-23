module.exports = (async () => {

  const Wallet = require('ethereumjs-wallet');
  const Mnemonic = require('bitcore-mnemonic');
  const LogUtil = await require('../../../../utils/log');
  const Web3 = require('web3');

  const errMsg = "Error Getting Address. This error has been logged and will be investigated.";

  const deriveAddress = async (req,hdPrivKey,child) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    try{
      const hdwallet = Wallet.hdkey.fromExtendedKey(hdPrivKey);
      const wallet = hdwallet.deriveChild(child).getWallet();
      const address = "0x" + wallet.getAddress().toString("hex");
      const private = "0x" + wallet.getPrivateKey().toString("hex");
      const results = {
        address,  
        private,
      }

      d.res = results;
    }catch(e){
      d.err.code = 1;d.err.message = errMsg;
      await LogUtil.dbLogError("Ethereum.deriveAddress",{child,e});
      return d;
    }

    return d;
  }

  const generateHdPrivateKey = async (req,options) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    try{
      let xprivStr;
      let newMnemonicPhrase = null;
      if(options.hdPrivateKeyStr){
        xprivStr = options.hdPrivateKeyStr
      }else{
        let memPhrase = (options.seedPhrase)?options.seedPhrase:new Mnemonic(Mnemonic.Words.ENGLISH).toString();
        newMnemonicPhrase = (options.seedPhrase)?null:memPhrase
        const code = new Mnemonic(options.seedPhrase)
        const xpriv = code.toHDPrivateKey((options.passPhrase)?options.passPhrase:undefined);
        xprivStr = xpriv.toString();
      } 

      const hdwallet = Wallet.hdkey.fromExtendedKey(xprivStr);
      const hdPrivateKey = hdwallet.privateExtendedKey();
      const hdPublicKey = hdwallet.publicExtendedKey();
      const wallet = hdwallet.getWallet();
      const address = "0x" + wallet.getAddress().toString("hex");
      const private = "0x" + wallet.getPrivateKey().toString("hex");
      const results = {
        hdPrivateKey: hdPrivateKey,  
        hdPublicKey: hdPublicKey,
        address: address,  
        private: private,
      }
      if(newMnemonicPhrase) results.newMnemonicPhrase = newMnemonicPhrase;

      d.res = results;
    }catch(e){
      d.err.code = 1;d.err.message = errMsg;
      await LogUtil.dbLogError("Ethereum.generateHdPrivateKey",{e});
      return d;
    }

    return d;
  }

  const isValid = async (req,publicAddress) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    d.res.isValid = false;
    try {
      Web3.utils.toChecksumAddress(publicAddress)
      d.res.isValid = true;
    } catch(e) { 
      d.res.isValid = false;
    }

    return d;
  }

  return {
    generateHdPrivateKey,
    deriveAddress,
    isValid,
  };
})();
