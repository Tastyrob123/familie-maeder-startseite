/* Familie Maeder · Weg A «Die Strecke»: Auftakt, Linien, Überschriften, Bild des Auftakts, Schiene am Rand.
   Läuft nach main.js (das Einblenden, Gleiten, Buchen und Zählen übernimmt). Nur transform, ein Scroll-Takt, Rechnen nur bei Bedarf. */
(function () {
  'use strict';
  var doc = document.documentElement, $ = function (s, c) { return (c || document).querySelector(s); }, $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var ruhig = doc.classList.contains('ruhig') || !('IntersectionObserver' in window);
  var sa = $('.sa');

  /* ---------- Auftakt: Bild zoomt in die Fläche, Titel steigt, die Strecke zeichnet sich, die Orte setzen sich nacheinander */
  if (sa) requestAnimationFrame(function () { requestAnimationFrame(function () {
    sa.classList.add('da');
    $$('[data-r], [data-strecke]', sa).forEach(function (el) { el.classList.add('da'); });
  }); });

  if (ruhig) { $$('[data-strecke], .z, .ks, .ks__naht').forEach(function (el) { el.classList.add('da'); }); }
  else {
    /* Linien und Überschriften, die keinen eigenen Auslöser haben: sobald sie ein Stück im Fenster stehen */
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('da'); io.unobserve(e.target); } });
    }, { rootMargin: '100000px 0px -12% 0px', threshold: 0 });
    $$('[data-strecke], .ks, .ks__naht').forEach(function (el) { if (!el.closest('.sa')) io.observe(el); });
    $$('.z').forEach(function (z) { if (!z.closest('.sa, .bruch, [data-r], .szene')) io.observe(z); });
  }

  /* ---------- Szenen: --rein (0…1) zoomt das Foto beim Hereinkommen in die Fläche,
     --lauf (−1…1) lässt es beim Scrollen leicht gegen die Richtung gleiten. Der Text startet, wenn die Szene zur Hälfte da ist. Gerechnet wird nur, was nah am Fenster ist. */
  var szenen = $$('.szene'), nah = [];
  if (ruhig) szenen.forEach(function (s) { s.classList.add('da'); });
  else if (szenen.length) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target._nah = e.isIntersecting; });
      nah = szenen.filter(function (s) { return s._nah; }); szeneTakt();
    }, { rootMargin: '30% 0px 30% 0px' });
    szenen.forEach(function (s) { sio.observe(s); });
  }
  function szeneTakt() {
    for (var i = 0; i < nah.length; i++) {
      var s = nah[i], r = s.getBoundingClientRect();
      var rein = Math.max(0, Math.min(1, 1 - r.top / vh));
      s.style.setProperty('--rein', rein.toFixed(3));
      if (rein > 0.5 && !s.classList.contains('da')) s.classList.add('da');
      var lauf = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      s.style.setProperty('--lauf', lauf.toFixed(3));
    }
  }

  /* ---------- Ein Scroll-Takt: Auftaktbild zieht langsam mit, die Schiene zeigt den Ort */
  var bildA = $('.sa__bild'), schiene = $('.schiene'), fuell = schiene && $('.schiene__l', schiene);
  var orte = schiene ? $$('a[data-ort]', schiene).map(function (a) { return { a: a, el: document.getElementById(a.getAttribute('data-ort')), top: 0 }; }) : [];
  var start = 0, ende = 1, aus = 1, vh = window.innerHeight, ziel = 0, ist = 0, laeuft = false, jetzt = -1;
  function miss() {
    vh = window.innerHeight;
    var y = window.scrollY;
    orte.forEach(function (o) { o.top = o.el ? o.el.getBoundingClientRect().top + y : 0; });
    var se = $('#selden'), ga = $('.ziel');
    start = orte.length ? orte[0].top : 0;
    ende = se ? se.getBoundingClientRect().bottom + y - vh : start + 1;
    aus = ga ? ga.getBoundingClientRect().top + y - vh * 0.4 : ende;
  }
  function takt() {
    var y = window.scrollY;
    if (bildA && !ruhig && sa) { ziel = Math.min(y, sa.offsetHeight) * 0.18; if (!laeuft && Math.abs(ziel - ist) > 0.2 && y < sa.offsetHeight * 1.2) { laeuft = true; requestAnimationFrame(gleite); } }
    if (!schiene) return;
    var p = Math.max(0, Math.min(1, (y - start + vh * 0.5) / Math.max(1, ende - start + vh * 0.5)));
    schiene.style.setProperty('--p', p.toFixed(4));
    schiene.classList.toggle('an', y > start - vh * 0.5 && y < aus);
    var n = -1; orte.forEach(function (o, i) { if (o.top <= y + vh * 0.5) n = i; });
    if (n !== jetzt) { jetzt = n; orte.forEach(function (o, i) { o.a.classList.toggle('jetzt', i === n); }); }
  }
  function gleite() {
    ist += (ziel - ist) * 0.12;
    if (Math.abs(ziel - ist) < 0.2) { ist = ziel; laeuft = false; }
    bildA.style.transform = 'translate3d(0,' + ist.toFixed(1) + 'px,0)';
    if (laeuft) requestAnimationFrame(gleite);
  }
  var wartet = false;
  window.addEventListener('scroll', function () { if (wartet) return; wartet = true; requestAnimationFrame(function () { wartet = false; takt(); szeneTakt(); }); }, { passive: true });
  window.addEventListener('resize', function () { miss(); takt(); }, { passive: true });
  window.addEventListener('load', function () { miss(); takt(); });
  miss(); takt();
  /* Bilder, die später laden, verschieben die Halte: nach dem Laden noch einmal messen */
  if ('ResizeObserver' in window) { var t0; new ResizeObserver(function () { clearTimeout(t0); t0 = setTimeout(function () { miss(); takt(); }, 120); }).observe(document.body); }
})();
