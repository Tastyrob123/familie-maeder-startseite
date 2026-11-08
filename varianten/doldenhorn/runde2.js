/* Zweite Runde: Raumverzeichnis (Fassung 14) tauscht das Bild an derselben Stelle, beim Antippen oder Darüberfahren. */
(function () {
  'use strict';
  document.querySelectorAll('[data-raum]').forEach(function (b) {
    var zeig = function () {
      var n = b.getAttribute('data-raum');
      document.querySelectorAll('[data-raum]').forEach(function (x) { x.classList.toggle('an', x === b); });
      document.querySelectorAll('[data-raum-b]').forEach(function (im) {
        if (im.getAttribute('data-raum-b') === n) { if (im.dataset.src) { im.src = im.dataset.src; im.removeAttribute('data-src'); } im.classList.add('an'); } else im.classList.remove('an');
      });
    };
    b.addEventListener('click', zeig);
    b.addEventListener('mouseenter', zeig);
  });
})();
