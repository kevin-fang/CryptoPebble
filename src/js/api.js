/* jshint sub: true */
/* global module */
var ajax = require("ajax");

function getPoloniex(callback, name) {
  var poloniexUrl = "https://poloniex.com/public?command=returnTicker";
  ajax({ url: poloniexUrl, type: 'json'}, function (data) {
    var priceObject = {
      btc: Number(data['USDT_BTC'].last).toFixed(2),
      eth: Number(data['USDT_ETH'].last).toFixed(2),
      ltc: Number(data['USDT_LTC'].last).toFixed(2)
    };
    callback(priceObject, name);
  });
}

function getGdax(callback, name) {
  var gdaxUrlBtc = "https://api.gdax.com/products/BTC-USD/ticker";
  var gdaxUrlEth = "https://api.gdax.com/products/ETH-USD/ticker";
  var gdaxUrlLtc = "https://api.gdax.com/products/LTC-USD/ticker";
  var priceObject = {};
  
  ajax({ url: gdaxUrlBtc, type: 'json'}, function(data) {
    priceObject.btc = Number(data.price).toFixed(2);
    
    ajax({url: gdaxUrlEth, type: 'json'}, function(data) {
      priceObject.eth = Number(data.price).toFixed(2);
      
      ajax({url: gdaxUrlLtc, type: 'json'}, function(data) {
        priceObject.ltc = Number(data.price).toFixed(2);
        callback(priceObject, name);
        
      });
    });
  });
} 

function getBitfinex(callback, name) {
  var bitfinexUrl = "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tLTCUSD";
  ajax({ url: bitfinexUrl, type: 'json'}, function(data) {
    var priceObject = {
      btc: Number(data[0][7]).toFixed(2),
      eth: Number(data[1][7]).toFixed(2),
      ltc: Number(data[2][7]).toFixed(2)
    };
    callback(priceObject, name);
  });
}

module.exports = {
  getGdax: getGdax,
  getPoloniex: getPoloniex,
  getBitfinex: getBitfinex
};