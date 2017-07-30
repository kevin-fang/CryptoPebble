/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');

var card = new UI.Card({
  title: 'CryptoTicker',
  subtitle: 'Loading..',
  body: 'Please wait...'
});

card.show();

var ajax = require('ajax');
var poloniexUrl = "https://poloniex.com/public?command=returnTicker";
/*jshint sub: true*/

ajax({ url: poloniexUrl, type: 'json'},
    function(data) {
      var btcPrice = data['USDT_BTC'].last;
      var ethPrice = data['USDT_ETH'].last;
     // var ltcPrice = data['USDT_LTC'].last;
      
      card.body("BTC: $" + btcPrice + '\nETH: $' + ethPrice);
      card.title('CryptoTicker');
      card.subtitle('');
      Vibe.vibrate('short');
    });