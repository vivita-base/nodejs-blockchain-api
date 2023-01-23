
module.exports = (async() => {

  const {request} = await require('../utils/request');
  const {RpcMethodEnum} = require('../enums/rpc-method');
  const {CoinNodesEnum} = await require('../enums/coin-nodes');

  // https://developer.bitcoin.org/reference/rpc/index.html
  const pingNode = async (coinNode,method,params,) => {
    const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;

    if(!(coinNode in CoinNodesEnum)){
      d.err.code = 1;d.err.message = "node not found";return d;
    }
    const {RpcUser,RpcPass,RpcPort} = CoinNodesEnum[coinNode];

    let endpoint = "http://"+RpcUser+":"+RpcPass+"@127.0.0.1:"+RpcPort+"/";
    let headers = {
      "Content-Type": "application/json",
    }

    let id = new Date().getTime()
    let data = {
      jsonrpc: '1.0',
      id: id,
    };
    data.method = method;
    data.params = params;

    // console.log("endpoint",endpoint);
    // console.log("data",data);
    // console.log("headers",headers);

    r = await request("name",endpoint,"POST",headers,data);
    if(r.err.code){ 
      console.log("pingNode Error",coinNode,method,params);
      console.log("r",r);
      return r;
    }

    d.res = r.res;

    return d;
  }

  const getBlockByHeight = async (coinNode,height) => {
    const d = {err: {code:0,message:""},res:{}}; let r,sql,vars;

    r = await pingNode(coinNode,RpcMethodEnum.BlockchainRPCs.getblockhash,{height: height,});
    if(r.err.code) return r;

    let blockHash = r.res.result;
    if(!blockHash){
      d.err.message = "result null";
      d.err.code = 1; return d;
    }
    let params = {
      blockhash: blockHash,
    }
    if(coinNode !== "DOGE"){
      params.verbosity = 2;
    }

    r = await pingNode(coinNode,RpcMethodEnum.BlockchainRPCs.getblock,params);
    if(r.err.code) return r;

    d.res = r.res;

    return d;
  }

  return {
    pingNode,
    getBlockByHeight,
  };
})();