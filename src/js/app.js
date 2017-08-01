/**
 * Welcome to Pebble.js!
 *
 */

/* jshint sub: true, unused: false */

var UI = require('ui');
var Vibe = require('ui/vibe');
var ApiCall = require('./api.js');
var exchanges = ["GDAX", "Poloniex", "Bitfinex"];
var defaultExchange = exchanges[0]; // "GDAX", "Poloniex", or "Bitfinex". If anything else, will display main screen


var main = new UI.Card({
  body: 'Poloniex ->\n\nBitfinex ->\n\nGDAX ->'
});

main.show();

function setMainDisplay(priceObject, name) {
  main.body("BTC: $" + priceObject.btc + '\nETH: $' + priceObject.eth + '\nLTC: $' + priceObject.ltc);
  main.subtitle('');
  Vibe.vibrate('short');
}

function setInitial(title, e) {
  if (e) console.log(e);
  main.title(title);
  main.subtitle("Loading");
  main.body("Please wait...");
}

if (defaultExchange == "GDAX" || defaultExchange == "Poloniex" || defaultExchange == "Bitfinex") {
  setInitial(defaultExchange, null);
  switch(defaultExchange) {
    case "GDAX":
      ApiCall.gdax(setMainDisplay);
      break;
    case "Poloniex":
      ApiCall.poloniex(setMainDisplay);
      break;
    case "Bitfinex":
      ApiCall.bitfinex(setMainDisplay);
      break;
  }
}

// bitfinex
main.on('click', 'select', function(e) {
  setInitial("Bitfinex", e);
  ApiCall.bitfinex(setMainDisplay);
});

// poloniex
main.on('click', 'up', function(e) {
  setInitial("Poloniex", e);
  ApiCall.poloniex(setMainDisplay);
});

// gdax
main.on('click', 'down', function(e) {
  setInitial("GDAX", e);
  ApiCall.gdax(setMainDisplay);
});
