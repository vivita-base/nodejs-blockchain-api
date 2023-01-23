module.exports = (async () => {

  const build = async (req,inputs,outputs,changeAddress,fee) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    d.err.code = 1;
    d.err.message = "Needs Code";

    return d;
  }

  const sign = async (req,coin,transactionObj,wallets) => {
    const d = {err:{code:0,message:""},res:{}};let r,sql,vars;

    d.err.code = 1;
    d.err.message = "Needs Code";

    return d;
  }

  return {
    build,
    sign,
  };
})();
