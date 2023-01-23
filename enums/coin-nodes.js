module.exports = (async () => {
  const {CoinEnum} = require('./coin');
  const {Config} = await require("../common/config");

  const CoinNodesEnum = {
    BTC:{ Coin: "BTC", Confirmations: 4, RpcPort: 7000, BlockPort: 7001, TransactionPort: 7002, RpcUser: Config.RpcKeys.BTC.User, RpcPass: Config.RpcKeys.BTC.Pass, Network:"Regular", },
    LTC:{ Coin: "LTC", Confirmations: 12, RpcPort: 7003, BlockPort: 7004, TransactionPort: 7005, RpcUser: Config.RpcKeys.LTC.User, RpcPass: Config.RpcKeys.LTC.Pass, Network:"Regular", },
    BCH:{ Coin: "BCH", Confirmations: 15, RpcPort: 7006, BlockPort: 7007, TransactionPort: 7008, RpcUser: Config.RpcKeys.BCH.User, RpcPass: Config.RpcKeys.BCH.Pass, Network:"Regular", },
    DASH:{ Coin: "DASH", Confirmations: 2, RpcPort: 7009, BlockPort: 7010, TransactionPort: 7011, RpcUser: Config.RpcKeys.DASH.User, RpcPass: Config.RpcKeys.DASH.Pass, Network:"Regular", },
    DOGE:{ Coin: "DOGE", Confirmations: 40, RpcPort: 7012, BlockPort: 7013, TransactionPort: 7014, RpcUser: Config.RpcKeys.DOGE.User, RpcPass: Config.RpcKeys.DOGE.Pass, Network:"Regular", },

    ETH:{ Coin: "ETH", Confirmations: 20, RpcPort: 8545, Network:"ETH", },
  };

  const EthTokenEnum = {
    DAWI:{Coin: CoinEnum.DAWI, Contract:"0xb7cc662dd8b834ceb8751ffebc4297bee4285d7b", Decimals: 18, },
    USDT:{Coin: CoinEnum.USDT, Contract:"0xdAC17F958D2ee523a2206206994597C13D831ec7", Decimals: 6, },
    USDC:{Coin: CoinEnum.USDC, Contract:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", Decimals: 6, },
  }

  const EthTokenContractEnum = {}
  EthTokenContractEnum[EthTokenEnum.DAWI.Contract] = EthTokenEnum.DAWI.Coin;
  EthTokenContractEnum[EthTokenEnum.USDT.Contract] = EthTokenEnum.USDT.Coin;
  EthTokenContractEnum[EthTokenEnum.USDC.Contract] = EthTokenEnum.USDC.Coin;

  return {  
    CoinNodesEnum,
    EthTokenEnum,
  };
})();