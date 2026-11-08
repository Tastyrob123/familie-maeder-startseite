/* Fassungen der Doldenhorn-Station umschalten (Pfeiltasten links/rechts, Knöpfe, Wischen). Nummer in der Adresse (#7). Auftritte beim Hereinscrollen. */
(function () {
  'use strict';
  var V = [].slice.call(document.querySelectorAll('.dv')), akt = -1;
  var nr = document.querySelector('[data-nr]'), name = document.querySelector('[data-name]'), wv = document.querySelector('.wahl-v');
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('da'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -6% 0px' }) : null;
  function lade(v) {
    if (!v || v._geladen) return; v._geladen = true;
    v.querySelectorAll('[data-src]').forEach(function (el) { el.setAttribute('src', el.getAttribute('data-src')); el.removeAttribute('data-src'); });
    v.querySelectorAll('[data-bg]').forEach(function (el) { el.style.backgroundImage = 'url(' + el.getAttribute('data-bg') + ')'; });
  }
  function zeige(n) {
    n = (n + V.length) % V.length; if (n === akt) return;
    if (akt >= 0) V[akt].classList.remove('an');
    akt = n; var v = V[n]; lade(v); lade(V[(n + 1) % V.length]);
    v.classList.add('an'); window.scrollTo(0, 0);
    v.querySelectorAll('[data-e]').forEach(function (el) { el.classList.remove('da'); if (io) io.observe(el); else el.classList.add('da'); });
    if (io) io.observe(v); else v.classList.add('da');
    zaehle(v);
    nr.textContent = n; name.textContent = NAMEN[n][0];
    wv.classList.add('zeig'); clearTimeout(wv._t); wv._t = setTimeout(function () { wv.classList.remove('zeig'); }, 2200);
    if (location.hash !== '#' + n) history.replaceState(null, '', '#' + n);
  }
  function zaehle(v) {
    v.querySelectorAll('[data-zahl]').forEach(function (el) {
      var ziel = +el.getAttribute('data-zahl'), von = ziel > 1000 ? ziel - 24 : 0, t0 = null;
      el.textContent = von;
      var los = function () { requestAnimationFrame(function s(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1800); el.textContent = Math.round(von + (ziel - von) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(s); }); };
      if (io) { var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { o.disconnect(); los(); } }); o.observe(el); } else los();
    });
  }
  document.querySelectorAll('[data-schritt]').forEach(function (b) { b.addEventListener('click', function () { zeige(akt + (+b.getAttribute('data-schritt'))); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); zeige(akt + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); zeige(akt - 1); }
  });
  var rahmen = document.querySelector('.dv0 iframe');
  if (rahmen) rahmen.addEventListener('load', function () { try { rahmen.contentWindow.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') zeige(akt + 1); if (e.key === 'ArrowLeft') zeige(akt - 1); }); } catch (x) {} });
  var x0 = null, y0 = null;
  document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', function (e) { if (x0 === null) return; var d = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; if (Math.abs(d) > 80 && Math.abs(d) > Math.abs(dy) * 2) zeige(akt + (d < 0 ? 1 : -1)); x0 = null; }, { passive: true });
  /* 16 Drei Reiter: Foto und Satz tauschen an derselben Stelle */
  document.querySelectorAll('[data-reiter]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-reiter');
      document.querySelectorAll('[data-reiter]').forEach(function (x) { x.classList.toggle('an', x === b); });
      document.querySelectorAll('[data-reiter-p]').forEach(function (p) { p.classList.toggle('an', p.getAttribute('data-reiter-p') === k); });
    });
  });
  window.addEventListener('hashchange', function () { var n = parseInt(location.hash.slice(1), 10); if (!isNaN(n)) zeige(n); });
  zeige(Math.max(0, Math.min(V.length - 1, parseInt((location.hash || '#0').slice(1), 10) || 0)));
})();
