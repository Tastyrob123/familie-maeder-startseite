/* Fassungen umschalten: Pfeiltasten, Knöpfe, Wischen. Die Nummer steht in der Adresse (#7). Bilder einer Fassung werden erst geladen, wenn sie gezeigt wird. */
(function () {
  'use strict';
  var V = [].slice.call(document.querySelectorAll('.v')), N = V.length - 1, akt = -1;
  var nr = document.querySelector('[data-nr]'), name = document.querySelector('[data-name]'), satz = document.querySelector('[data-satz]');
  function lade(v) {
    if (!v || v._geladen) return; v._geladen = true;
    v.querySelectorAll('[data-src]').forEach(function (el) { el.setAttribute('src', el.getAttribute('data-src')); el.removeAttribute('data-src'); });
    v.querySelectorAll('[data-bg]').forEach(function (el) { el.style.backgroundImage = 'url(' + el.getAttribute('data-bg') + ')'; });
  }
  function zeige(n) {
    n = (n + V.length) % V.length; if (n === akt) return;
    if (akt >= 0) V[akt].classList.remove('an', 'da');
    akt = n; var v = V[n]; lade(v); lade(V[(n + 1) % V.length]); lade(V[(n - 1 + V.length) % V.length]);
    v.classList.add('an'); document.body.classList.toggle('ist0', n === 0);
    requestAnimationFrame(function () { requestAnimationFrame(function () { v.classList.add('da'); }); });
    var wv = document.querySelector('.wahl-v'); wv.classList.add('zeig'); clearTimeout(wv._t); wv._t = setTimeout(function () { wv.classList.remove('zeig'); }, 2200);
    nr.textContent = n; name.textContent = NAMEN[n][0]; satz.textContent = NAMEN[n][1];
    if (location.hash !== '#' + n) history.replaceState(null, '', '#' + n);
    if (v.classList.contains('v5')) zeit();
  }
  document.querySelectorAll('[data-schritt]').forEach(function (b) { b.addEventListener('click', function () { zeige(akt + (+b.getAttribute('data-schritt'))); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); zeige(akt + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); zeige(akt - 1); }
  });
  /* Im Rahmen der heutigen Seite (Nr. 0) landen die Tasten im Rahmen: dort mithören */
  var rahmen = document.querySelector('.v0 iframe');
  if (rahmen) rahmen.addEventListener('load', function () { try { rahmen.contentWindow.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') zeige(akt + 1); if (e.key === 'ArrowLeft') zeige(akt - 1); }); } catch (x) {} });
  var x0 = null;
  document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) { if (x0 === null) return; var d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 60) zeige(akt + (d < 0 ? 1 : -1)); x0 = null; }, { passive: true });

  /* 5 Tageslicht: Bild nach der Uhrzeit, von Hand wählbar */
  function setzeZeit(z) {
    document.querySelectorAll('.v5__l').forEach(function (l) { l.classList.toggle('an', l.getAttribute('data-zeit') === z); });
    document.querySelectorAll('[data-zeit-t]').forEach(function (b) { b.classList.toggle('an', b.getAttribute('data-zeit-t') === z); });
  }
  function zeit() { var h = new Date().getHours(); setzeZeit(h >= 6 && h < 11 ? 'morgen' : h >= 11 && h < 17 ? 'mittag' : h >= 17 && h < 21 ? 'abend' : 'nacht'); }
  document.querySelectorAll('[data-zeit-t]').forEach(function (b) { b.addEventListener('click', function () { setzeZeit(b.getAttribute('data-zeit-t')); }); });

  /* 15 Antippen: das gewählte Haus füllt die Fläche, nichts wechselt von allein */
  document.querySelectorAll('.v15__n').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-k');
      document.querySelectorAll('.v15__l').forEach(function (l) { l.classList.toggle('an', l.getAttribute('data-k') === k); });
      document.querySelectorAll('.v15__n').forEach(function (x) { x.classList.toggle('an', x === b); });
    });
  });
  window.addEventListener('hashchange', function () { var n = parseInt(location.hash.slice(1), 10); if (!isNaN(n)) zeige(n); });
  zeige(Math.min(N, Math.max(0, parseInt((location.hash || '#0').slice(1), 10) || 0)));
})();
