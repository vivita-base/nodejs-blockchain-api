module.exports = (async () => {

  var zmq = require('zeromq');

  const Block = await require('../funcs/block/block');
  const Transaction = await require('../funcs/transaction/transaction');

  return {  
    socket: async (port,sub,coin) => {
      let lastSocketTimeUpdate = new Date().getTime();
      let restartTime = 1000 * 60 * 30;
      const sock = zmq.socket('sub');
      const addr = 'tcp://127.0.0.1:'+port;

      // Block.blockCheck(coin);
      
      const startSocket = () => {
        let timenow = new Date();
        console.log("start socket",coin,sub,timenow)
        sock.connect(addr);
        sock.subscribe(sub);
        sock.on('message', function(topic, message) {
          lastSocketTimeUpdate = new Date().getTime();
          try{
            if (topic.toString() === 'rawtx') {
              // console.log("Transaction Added",coin);
              // const rawTx = message.toString('hex');
              // console.log("rawTx",rawTx);
              // Transaction.transactionCheck(coin,rawTx);          
            }
  
            if (topic.toString() === 'rawblock') {
              // console.log("Block Updated",coin);
              // Block.blockCheck(coin);
            }
          }catch(err){
            console.log("err",err);
          }
        });
      }
      
      const listenSocket = () => {
        setInterval(() => {
          let minTime = new Date().getTime() - restartTime;
          if(lastSocketTimeUpdate < minTime){
            let timenow = new Date()
            console.log("restart socket",coin,sub,timenow);
            lastSocketTimeUpdate = new Date().getTime();
            sock.disconnect(addr);
            startSocket();
          }
        },1000)
      }

      startSocket();
      listenSocket();
      
    },
  };
})();