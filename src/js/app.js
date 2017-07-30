/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');

var main = new UI.Card({
  title: 'CryptoTicker',
  subtitle: 'Loading..',
  body: 'Please wait...'
});

main.show();

var ajax = require('ajax');
var poloniexUrl = "https://poloniex.com/public?command=returnTicker";
/*jshint sub: true*/

function updateScreen() {
  ajax({ url: poloniexUrl, type: 'json'},
      function(data) {
        var btcPrice = data['USDT_BTC'].last;
        var ethPrice = data['USDT_ETH'].last;
       // var ltcPrice = data['USDT_LTC'].last;
        
        main.body("BTC: $" + btcPrice + '\nETH: $' + ethPrice);
        main.title('CryptoTicker');
        main.subtitle('');
        Vibe.vibrate('short');
      });
}

updateScreen();

main.on('click', 'select', function(e) {
  main.subtitle("Loading");
  main.body("Please wait...");
  updateScreen();
});