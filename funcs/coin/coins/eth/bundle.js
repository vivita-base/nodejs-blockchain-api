module.exports = (async () => {

  const Address = await require('./address');
  const Transaction = await require('./transaction');

  return {
    Address,
    Transaction,
  };
})();
