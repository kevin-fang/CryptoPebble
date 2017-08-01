/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

/* jshint sub: true, unused: false */

var UI = require('ui');
var Vibe = require('ui/vibe');
var ApiCall = require('./api.js');

var main = new UI.Card({
  title: 'CryptoTicker',
  body: 'Up: Poloniex\nMiddle: Bitfinex\nBottom: GDAX'
});

main.show();

function setMainDisplay(priceObject, name) {
  main.body("BTC: $" + priceObject.btc + '\nETH: $' + priceObject.eth + '\nLTC: $' + priceObject.ltc);
  main.subtitle('');
  Vibe.vibrate('short');
}

// bitfinex
main.on('click', 'select', function(e) {
  if (e) console.log(e);
  main.title("Bitfinex");
  main.subtitle("Loading");
  main.body("Please wait...");
  ApiCall.getBitfinex(setMainDisplay);
});

// poloniex
main.on('click', 'up', function(e) {
  if (e) console.log(e);
  main.title("Poloniex");
  main.subtitle("Loading");
  main.body("Please wait...");
  ApiCall.getPoloniex(setMainDisplay, "Poloniex");
});

// gdax
main.on('click', 'down', function(e) {
  if (e) console.log(e);
  main.title("GDAX");
  main.subtitle("Loading");
  main.body("Please wait...");
  ApiCall.getGdax(setMainDisplay, "GDAX");
});
