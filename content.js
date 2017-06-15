var lastPrice, btc, eth, header, main, comision;

function initDOM(callback) {
  lastPrice = document.getElementById('menuPrice'),
  btc = document.getElementById('wallet-balance-btc'),
  eth = document.getElementById('wallet-balance-eth'),
  main = document.getElementById('main'),
  header = document.getElementsByTagName('header'),
  comision = 0.01;

  callback(true);

}
function getCoinObject() {
  var text = getCoin();
  if (text.toLowerCase() === 'btc') {
    return btc;
  } else {
    return eth;
  }
}
function getCoin() {
  var text = lastPrice.innerText.split(' ');
  return text[1];
}

function parseText(text) {
  var text = text.split(' ');

  return parseFloat(text[3]);
}

function formatMoney(value) {
  return value.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
}

function totalProfit() {
  var coin = getCoinObject(),
    lastPrice = document.getElementById('menuPrice'),
    totalCoin = parseFloat(coin.innerText),
    price = parseText(lastPrice.innerText);

  return formatMoney((price * totalCoin) - (price * totalCoin * comision));
}

function createBar() {
  var newItem = document.createElement("div"),
    newInsideItem = document.createElement("div");
  
  newInsideItem.innerHTML = 'Si vendes tus ' + getCoin() + ' al precio actual (menos comisión del 1%) obtendrías: <span>$' + totalProfit() + '</span> ' + getCoin();

  newItem.setAttribute('id','profit');  
  newInsideItem.setAttribute('id','profit-container');

  newItem.appendChild(newInsideItem);
  newItem.setAttribute('id','profit');

  document.body.insertBefore(newItem, header[0]);
}

function changeBarContent() {
  var container = document.getElementById('profit-container');

  container.innerHTML = 'Si vendes tus ' + getCoin() + ' al precio actual (menos comisión del 1%) obtendrías: <span>$' + totalProfit() + '</span> ' + getCoin();
}

function pulseBorder() {
  var target = document.querySelector('body #profit');
  target.classList = 'changed';
  setTimeout(function () {
    target.classList = '';
  }, 500);
}

function watchForChanges() {
  var target = document.querySelector('body #menuPrice a'),
    observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        changeBarContent();
        pulseBorder();
      });
    }),
    config = { attributes: true, childList: true, characterData: true };

  observer.observe(target, config);
}

setTimeout(function () {
  initDOM( function(done) {
    createBar();
    watchForChanges();
  });
}, 2000);

