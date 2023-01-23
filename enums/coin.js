
const {ChainEnum} = require('./chain');

const CoinEnum = {
  BTC:{Coin:"BTC",Name:"Bitcoin",Chain:ChainEnum.Regular},
  LTC:{Coin:"LTC",Name:"Litecoin",Chain:ChainEnum.Regular},
  BCH:{Coin:"BCH",Name:"Bitcoin Cash",Chain:ChainEnum.Regular},
  DASH:{Coin:"DASH",Name:"Dashcoin",Chain:ChainEnum.Regular},
  DOGE:{Coin:"DOGE",Name:"Dogecoin",Chain:ChainEnum.Regular},

  ETH:{Coin:"ETH",Name:"Ethereum",Chain:ChainEnum.Ethereum},
  DAWI:{Coin:"DAWI",Name:"Dawicoin",Chain:ChainEnum.Ethereum},
  USDC:{Coin:"USDC",Name:"USD Coin",Chain:ChainEnum.Ethereum},
  USDT:{Coin:"USDT",Name:"Tether USD",Chain:ChainEnum.Ethereum},
}

module.exports = {
  CoinEnum,
};