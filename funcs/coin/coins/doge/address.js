module.exports = (async () => {

  const BitcoreLibDoge = require('bitcore-lib-doge');
  const Mnemonic = require('bitcore-mnemonic');
  const LogUtil = await require('../../../../utils/log');

  const errMsg = "Error Getting Address. This error has been logged and will be investigated.";

  const deriveAddress = async (req,hdPrivKey,child) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    try{
      const hdPrivateKey = new BitcoreLibDoge.HDPrivateKey(hdPrivKey);
      const hdPublicKey = hdPrivateKey.hdPublicKey;
      const address = new BitcoreLibDoge.Address(hdPublicKey.deriveChild(child).publicKey, BitcoreLibDoge.Networks.livenet); // see deprecation warning for derive
      const public = new BitcoreLibDoge.PublicKey(hdPublicKey.deriveChild(child).publicKey, BitcoreLibDoge.Networks.livenet); // see deprecation warning for derive
      const private = new BitcoreLibDoge.PrivateKey(hdPrivateKey.deriveChild(child).privateKey, BitcoreLibDoge.Networks.livenet); // see deprecation warning for derive
      const results = {
        address: address.toString(),
        public: public.toString(),
        private: private.toString(),  
      }

      d.res = results;
    }catch(e){
      d.err.code = 1;d.err.message = errMsg;
      await LogUtil.dbLogError("Dogecoin.deriveAddress",{child,e});
      return d;
    }

    return d;
  }

  const generateHdPrivateKey = async (req,options,) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;
    options = (options)?options:{}

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

      const hdPrivateKey = new BitcoreLibDoge.HDPrivateKey(xprivStr);
      const hdPublicKey = hdPrivateKey.hdPublicKey;
      const address = new BitcoreLibDoge.Address(hdPublicKey.publicKey, BitcoreLibDoge.Networks.livenet); // see deprecation warning for derive
      const private = new BitcoreLibDoge.PrivateKey(hdPrivateKey.privateKey, BitcoreLibDoge.Networks.livenet); //

      let results = {
        hdPrivateKey: hdPrivateKey.toString(),  
        hdPublicKey: hdPublicKey.toString(),
        address: address.toString(),  
        private: private.toString(),
      }

      d.res = results;
    }catch(e){
      d.err.code = 1;d.err.message = errMsg;
      await LogUtil.dbLogError("Dogecoin.generateHdPrivateKey",{e});
      return d;
    }

    return d;
  }

  const isValid = async (req,publicAddress) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    d.res.isValid = BitcoreLibDoge.Address.isValid(publicAddress);

    return d;
  }

  return {
    generateHdPrivateKey,
    deriveAddress,
    isValid,
  };
})();
