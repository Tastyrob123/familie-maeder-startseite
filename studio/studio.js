/* Empfang · Familie Maeder. Das Werkzeug, mit dem die Familie ihre gemeinsame Startseite pflegt. Ohne Bibliothek, nach dem Vorbild des Studios vom Waldhotel Doldenhorn,
   zugeschnitten auf eine Seite mit vier Häusern: Reihenfolge und Sätze der Häuser, Angaben je Haus, Brief der Familie, Texte direkt in der Seite, Bilder, Hinweis, Zahlen. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const h = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const PF = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11 11 3M4.5 3H11v6.5"/></svg>';
const SYM = {
  links: '<svg viewBox="0 0 14 14"><path d="m9 2-5 5 5 5"/></svg>', rechts: '<svg viewBox="0 0 14 14"><path d="m5 2 5 5-5 5"/></svg>',
  hoch: '<svg viewBox="0 0 14 14"><path d="m2.5 9 4.5-4.5L11.5 9"/></svg>', runter: '<svg viewBox="0 0 14 14"><path d="m2.5 5 4.5 4.5L11.5 5"/></svg>',
  zu: '<svg viewBox="0 0 14 14"><path d="m3 3 8 8M11 3l-8 8"/></svg>', auge: '<svg viewBox="0 0 16 14"><path d="M1 7s2.6-4.5 7-4.5S15 7 15 7s-2.6 4.5-7 4.5S1 7 1 7Z"/><circle cx="8" cy="7" r="1.9"/></svg>',
  augezu: '<svg viewBox="0 0 16 14"><path d="M1 7s2.6-4.5 7-4.5S15 7 15 7s-2.6 4.5-7 4.5S1 7 1 7Z"/><path d="m3 1 10 12"/></svg>',
  bild: '<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="m3 11 3.2-3 2.3 2 2-1.6L13 11"/></svg>',
  korb: '<svg viewBox="0 0 14 14"><path d="M2.5 4h9M5.5 4V2.5h3V4M3.5 4l.6 7.5h5.8L10.5 4"/></svg>',
  rechner: '<svg viewBox="0 0 16 14"><rect x="1.5" y="1.5" width="13" height="8.5" rx="1.4"/><path d="M5.5 12.5h5"/></svg>', handy: '<svg viewBox="0 0 14 16"><rect x="3.5" y="1.5" width="7" height="13" rx="1.6"/></svg>',
};
/* Zeichen der Bereiche: feine Linien, wie die Pfeile der Seite */
const IK = {
  haeuser: '<svg viewBox="0 0 24 24"><path d="M3 21V10l4.5-4 4.5 4v11M12 21V12l4.5-4 4.5 4v9M3 21h18M6.5 15h2M15.5 15h2"/></svg>',
  seite: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  brief: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  uhr: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  bild: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 4 4 3-3 4 4"/><circle cx="16" cy="9" r="1.5"/></svg>',
  glocke: '<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/></svg>',
  lupe: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
  liste: '<svg viewBox="0 0 24 24"><path d="M9 6h12M9 12h12M9 18h12"/><path d="m3 6 1.3 1.3L6.5 5M3 12l1.3 1.3L6.5 11M3 18l1.3 1.3L6.5 17"/></svg>',
  zahlen: '<svg viewBox="0 0 24 24"><path d="M4 20V11M10 20V5M16 20v-7M22 20H2"/></svg>',
  verlauf: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"/><path d="M12 8v4l3 2"/></svg>',
  schluessel: '<svg viewBox="0 0 24 24"><circle cx="8" cy="14" r="4"/><path d="m11 11 9-9M17 5l2 2M14 8l2 2"/></svg>',
  text: '<svg viewBox="0 0 24 24"><path d="M5 5h14M12 5v14M8 19h8"/></svg>',
  jahr: '<svg viewBox="0 0 24 24"><path d="M6 20V9l6-5 6 5v11M6 20h12M10 20v-5h4v5"/></svg>',
  weg: '<svg viewBox="0 0 24 24"><path d="M4 18c4-9 6-9 8-6s4 3 8-6"/><circle cx="4" cy="18" r="1.6"/><circle cx="20" cy="6" r="1.6"/></svg>',
  haken: '<svg viewBox="0 0 16 16"><path d="m3.5 8.5 3 3 6-7"/></svg>',
  marke: '<svg viewBox="0 0 48 56"><path d="M8 48V22l10-8 10 8v26M28 48V26l6-5 6 5v22M4 48h40M14 38h4M34 38h2"/></svg>',
};
const ik = n => `<span class="ik" aria-hidden="true">${IK[n] || IK.haeuser}</span>`;
const NAV = [['uebersicht', 'Übersicht', 'marke'], ['seite', 'Die Seite', 'seite'], ['haeuser', 'Die vier Häuser', 'haeuser'], ['angaben', 'Telefon, Adresse, Buchung', 'uhr'], ['familie', 'Brief & Sätze', 'brief'], ['bilder', 'Bilder', 'bild'],
  null, ['hinweis', 'Hinweis für Gäste', 'glocke'], ['google', 'Google & Co.', 'lupe'],
  null, ['zahlen', 'Zahlen', 'zahlen'], ['aenderungen', 'Änderungen', 'liste'], ['verlauf', 'Verlauf', 'verlauf'], ['zugang', 'Zugang', 'schluessel'], ['pruefung', 'Prüfung', 'haken']];
const ARTZ = { fakt: 'uhr', text: 'text', bild: 'bild', liste: 'haeuser', hinweis: 'glocke', google: 'lupe' };
const HAUS_BILD = { carlton: 'k-carlton', doldenhorn: 'k-doldenhorn', ruedihus: 'k-ruedihus', gasterntal: 'k-gasterntal' };
const sicht = $('#sicht');
let Z = null, W = null, V = null, OFFEN = false, PROBE = false, NAME = 'Empfang';

// ---------------------------------------------------------------- Verbindung
async function api(was, daten, roh) {
  const o = daten === undefined ? {} : { method: 'POST', headers: roh ? { 'X-Studio': '1' } : { 'X-Studio': '1', 'Content-Type': 'application/json' }, body: roh ? daten : JSON.stringify(daten) };
  let r;
  try { r = await fetch('/studio/api/' + was, o); } catch (e) { throw new Error('Keine Verbindung zum Empfang.'); }
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && was !== 'status') { tor('an'); throw new Error(j.fehler || 'Bitte anmelden.'); }
  if (!r.ok) throw new Error(j.fehler || 'Das hat nicht geklappt.');
  return j;
}
async function aendern(a) { Z = await api('aendern', a); rand(); leiste(); return Z; }
function sag(text, fehler) {
  $$('#meldung div').forEach(x => { if (x.textContent === text) x.remove(); });
  const d = document.createElement('div');
  d.textContent = text;
  if (fehler) d.className = 'f';
  $('#meldung').appendChild(d);
  setTimeout(() => d.remove(), fehler ? 5200 : 2600);
}
const mal = (n, eins, viele) => `${n} ${n === 1 ? eins : viele}`;
function datum(z) {
  const d = new Date(z);
  return isNaN(d) ? '' : d.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + d.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
}
const bildadr = (k, g = 's') => { const b = Z && Z.bilder && Z.bilder.find(x => x.key === k), gr = b && b.gr; const gg = gr && !gr.includes(g) ? (gr.includes('s') ? 's' : gr[0]) : g; return `/assets/img/${k}-${gg}.webp`; };   /* die kleine Fassung, wo es sie gibt (das Familienbild hat nur die grosse) */
const hausName = k => (Z && Z.haeuser && Z.haeuser[k]) || k;

// ---------------------------------------------------------------- Tor
function tor(art) {
  $('#app').hidden = true;
  const t = $('#tor');
  t.hidden = false;
  const neu = art === 'neu';
  t.innerHTML = `<img class="tor__bild" src="/assets/img/schluss-l.webp" alt="">
  <div class="tor__k">
    <div class="tor__z tor__z--breit"><svg viewBox="0 0 656 100"><use href="#zeichen"/></svg></div>
    <h1>Der <em>Empfang.</em></h1>
    <p>${neu ? 'Legen Sie ein Passwort fest. Damit kommt nur Ihre Familie an die Inhalte der Startseite.' : 'Hier pflegen Sie die gemeinsame Startseite Ihrer vier Häuser: Reihenfolge, Sätze, Angaben, Bilder.'}</p>
    <form autocomplete="off">
      <label class="feld"><span>${neu ? 'Neues Passwort' : 'Passwort'}</span><input type="password" name="p" autocomplete="${neu ? 'new-password' : 'current-password'}" required minlength="${neu ? 10 : 1}" autofocus></label>
      ${neu ? '<label class="feld"><span>Noch einmal</span><input type="password" name="p2" autocomplete="new-password" required></label>' : ''}
      <div class="fehler" role="alert"></div>
      <button class="kn kn--breit" type="submit">${neu ? 'Passwort festlegen' : 'Öffnen'}</button>
    </form>
    ${neu ? '<p class="tor__f">Mindestens 10 Zeichen. Sie können es später unter „Zugang“ ändern.</p>' : ''}
    <p class="tor__f"><a class="link" href="pruefung.html">Prüfung des Empfangs</a></p>
  </div>`;
  const f = $('form', t), fe = $('.fehler', t);
  f.addEventListener('submit', async ev => {
    ev.preventDefault();
    fe.textContent = '';
    if (neu && f.p.value !== f.p2.value) { fe.textContent = 'Die beiden Eingaben sind nicht gleich.'; return; }
    try {
      await api(neu ? 'einrichten' : 'anmelden', { passwort: f.p.value });
      t.hidden = true;
      t.innerHTML = '';
      await laden();
    } catch (e) { fe.textContent = e.message; }
  });
}
/* das gemeinsame Zeichen der Familie (die vier Zeichen der Häuser in einer Reihe) in den Sprite laden */
fetch('/assets/logo/familie-maeder.svg').then(r => r.text()).then(s => { const m = s.match(/<svg[^>]*>([\s\S]*)<\/svg>\s*$/); if (m) $('#zeichen').innerHTML = m[1]; }).catch(() => {});

// ---------------------------------------------------------------- Rahmen
async function laden() {
  Z = await api('stand');
  NAME = Z.name || NAME;
  $('#app').hidden = false;
  rand();
  leiste();
  zeige();
}
function rand() {
  const n = Z.aenderungen.length, teil = location.hash.split('/')[1] || 'uebersicht', an = teil === 'seiten' ? 'seite' : teil;
  $('#rand').innerHTML = `<a class="rand__marke rand__marke--zeichen" href="#/uebersicht"><svg viewBox="0 0 656 100" aria-label="Familie Maeder"><use href="#zeichen"/></svg><span>${h(NAME)}</span></a>
  <nav aria-label="Bereiche">${NAV.map(p => p ? `<a href="${p[0] === 'pruefung' ? 'pruefung.html' : '#/' + p[0]}" class="${an === p[0] ? 'an' : ''}">${ik(p[2])}${p[1]}${p[0] === 'aenderungen' && n ? `<b>${n}</b>` : ''}</a>` : '<div class="rand__trenn"></div>').join('')}</nav>
  <div class="rand__fuss"><a href="/live/index.html" target="_blank" rel="noopener">Website ansehen ${PF}</a>${OFFEN || PROBE ? '' : '<button type="button" data-akt="abmelden">Abmelden</button>'}</div>`;
  const aktiv = $('#rand nav a.an');
  if (aktiv && innerWidth <= 860) aktiv.scrollIntoView({ block: 'nearest', inline: 'center' });
}
function kopf(titel, text, rechts = '') {
  return `<header class="kopfz"><div><h1>${titel}</h1>${text ? `<p>${text}</p>` : ''}</div><div class="kopfz__r">${rechts}</div></header>`;
}
let hier = location.hash;
function zeige(halte) {
  if (!Z) return;
  const [, name = 'uebersicht', arg] = location.hash.split('/');
  W = null;
  offen = null;
  hier = location.hash;
  if (halte !== true) sicht.scrollTop = 0;
  (SICHTEN[name] || uebersicht)(arg ? decodeURIComponent(arg) : undefined);
  const nav = NAV.find(p => p && p[0] === (name === 'seiten' ? 'seite' : name));
  document.title = (nav ? nav[1] + ' · ' : '') + NAME + ' · Familie Maeder';
  rand();
}
addEventListener('hashchange', () => {
  if (offen && offen() && location.hash !== hier) {
    const ziel = location.hash;
    history.replaceState(null, '', hier || '#/uebersicht');
    frage('Noch nicht <em>gespeichert.</em>', 'Sie haben Angaben geändert und noch nicht auf „Speichern“ gedrückt. Wenn Sie weitergehen, gehen sie verloren.', 'Ohne Speichern weiter', async () => { offen = null; location.hash = ziel; });
    return;
  }
  if (!Z) return;
  zeige();
  leiste();
});

// ---------------------------------------------------------------- Entwurfsleiste, Liste, Quittung
const HAKEN = IK.haken;
let letzteZahl = null, BLITZ = null, offen = null;
function vor(z) {
  const m = Math.round((Date.now() - new Date(z)) / 60000);
  return isNaN(m) ? '' : m < 1 ? 'gerade eben' : m < 60 ? `vor ${m} Min.` : m < 1440 ? `vor ${Math.round(m / 60)} Std.` : datum(z);
}
const nachZeit = () => [...Z.aenderungen].sort((a, b) => (b.zeit || '').localeCompare(a.zeit || ''));
function leiste() {
  const el = $('#leiste'), n = Z.aenderungen.length, neueste = nachZeit()[0], zuletzt = Z.verlauf.find(v => !v.anfang);
  el.innerHTML = n ? `<button class="leiste__l" type="button" data-akt="lade" aria-label="Liste der Änderungen zeigen"><i class="leiste__z">${n}</i><span><b>${n === 1 ? 'Änderung' : 'Änderungen'} im Entwurf</b><small>Zuletzt: ${h(neueste.satz)}${neueste.zeit ? ' · ' + vor(neueste.zeit) : ''}</small></span></button>
    <div class="leiste__r"><button class="kn kn--klein kn--linie" type="button" data-akt="lade">Liste zeigen</button><a class="kn kn--klein kn--linie" href="/entwurf/index.html" target="_blank" rel="noopener">Entwurf ansehen ${PF}</a><button class="kn kn--hell" type="button" data-akt="raus">Veröffentlichen</button></div>`
    : `<div class="leiste__l"><i class="leiste__z ok">${HAKEN}</i><span><b>Alles veröffentlicht</b><small>${zuletzt ? 'Stand vom ' + datum(zuletzt.zeit) : 'Die Startseite zeigt den neuesten Stand.'}</small></span></div>
    <div class="leiste__r"><a class="kn kn--klein kn--linie" href="/live/index.html" target="_blank" rel="noopener">Website ansehen ${PF}</a></div>`;
  if (letzteZahl !== null && letzteZahl !== n && n) $('.leiste__z', el).classList.add('hupf');
  letzteZahl = n;
  if (!$('#lade').hidden) lade();
}
function kurzdiff(c) {
  if (c.art === 'bild') return `<span class="mini"><img src="${h(c.vorher)}" alt=""><i>→</i><img src="${h(c.nachher)}" alt=""></span>`;
  if (c.art === 'liste') return c.punkte.slice(0, 4).map(p => `<span class="zl"><b>${h(p.name)}</b> ${h(p.text)}</span>`).join('') + (c.punkte.length > 4 ? `<span class="zl">und ${c.punkte.length - 4} weitere</span>` : '');
  if (c.art === 'google') return c.teile.slice(0, 4).map(t => `<span class="zl">${h(t.feld)}: ${t.vorher ? `<s>${h(t.vorher)}</s> → ` : ''}<b>${h(t.nachher)}</b></span>`).join('');
  return `<span class="zl"><s>${h(c.vorher) || 'leer'}</s> → <b>${h(c.nachher) || 'leer'}</b></span>`;
}
function lade() {
  const l = $('#lade'), cs = nachZeit();
  l.hidden = false;
  l.innerHTML = `<div class="lade__k" role="dialog" aria-label="Ihr Entwurf"><header><div><h2>Ihr <em>Entwurf.</em></h2><p>${cs.length ? 'Gespeichert, aber noch nicht auf der Startseite. Erst „Veröffentlichen“ macht es für Gäste sichtbar.' : 'Nichts offen. Alles steht auf der Startseite.'}</p></div>
      <button class="rund" type="button" data-akt="ladezu" aria-label="Schliessen">${SYM.zu}</button></header>
    <ol class="lade__l">${cs.map(c => `<li data-id="${h(c.id)}"><span class="lade__z">${ik(ARTZ[c.art])}</span><div><b>${h(c.titel)}</b><small>${h(c.ort || '')}${c.zeit ? ' · ' + vor(c.zeit) : ''}</small><p>${kurzdiff(c)}</p>
      <div class="lade__a">${c.stellen.length ? '<button class="link" type="button" data-akt="sehen">Auf der Seite ansehen</button>' : ''}<button class="link" type="button" data-akt="weg">Zurücknehmen</button></div></div></li>`).join('')}</ol>
    ${cs.length ? `<footer><button class="link" type="button" data-akt="alles">Alles zurücknehmen</button><button class="kn kn--hell" type="button" data-akt="raus">Veröffentlichen</button></footer>` : ''}</div>`;
}
function ladeZu() { const l = $('#lade'); l.hidden = true; l.innerHTML = ''; }
async function aktAenderung(akt, id, seite) {
  const c = Z.aenderungen.find(x => x.id === id), n = Z.aenderungen.length;
  try {
    if (akt === 'sehen' && c) { ladeZu(); vergleich(c, seite); }
    else if (akt === 'weg' && c) { await aendern({ art: 'verwerfen', id: c.id }); sag('Zurückgenommen: ' + c.titel); neuZeichnen(); }
    else if (akt === 'alles') frage('Alles <em>zurücknehmen?</em>', `${mal(n, 'Änderung geht', 'Änderungen gehen')} verloren. Die Startseite bleibt, wie sie ist.`, 'Alles zurücknehmen', async () => { await aendern({ art: 'verwerfen', id: 'alles' }); sag('Der Entwurf ist leer.'); neuZeichnen(); });
    else if (akt === 'raus') { ladeZu(); veroeffentlichen(); }
  } catch (e) { sag(e.message, true); }
}
function quittung(titel, text, o = {}) {
  const m = $('#meldung');
  $$('.quitt', m).forEach(x => x.remove());
  const d = document.createElement('div'), c = o.id && Z.aenderungen.find(x => x.id === o.id);
  d.className = 'quitt';
  d.setAttribute('role', 'status');
  d.innerHTML = `<i>${HAKEN}</i><div><b>${h(titel)}</b>${text ? `<span>${h(text)}</span>` : ''}<small>Im Entwurf gespeichert. Auf der Startseite erst nach dem Veröffentlichen.</small>
    <div class="quitt__a">${c && c.stellen.length ? '<button type="button" data-q="sehen">Vorher/Nachher ansehen</button>' : ''}${o.zurueck ? '<button type="button" data-q="zurueck">Rückgängig</button>' : ''}</div></div>
    <button class="quitt__zu" type="button" data-q="zu" aria-label="Schliessen">${SYM.zu}</button>`;
  d.addEventListener('click', async ev => {
    const b = ev.target.closest('[data-q]');
    if (!b) return;
    d.remove();
    if (b.dataset.q === 'sehen') { const x = Z.aenderungen.find(y => y.id === o.id); if (x) vergleich(x, o.seite); }
    if (b.dataset.q === 'zurueck') { try { await aendern(o.zurueck); sag('Rückgängig gemacht.'); neuZeichnen(); } catch (e) { sag(e.message, true); } }
  });
  m.appendChild(d);
  setTimeout(() => d.remove(), 10000);
}
async function tun(a, q) {
  try { await aendern(a); if (q) quittung(q.titel, q.text, q); return true; } catch (e) { sag(e.message, true); return false; }
}
function neuZeichnen() {
  if (W) return neuLaden({});
  const y = sicht.scrollTop;
  zeige(true);
  sicht.scrollTop = y;
}
const schalter = (id, an, text) => `<label class="schalter"><input type="checkbox" id="${id}"${an ? ' checked' : ''}><i></i><span>${text}</span></label>`;
const kopie = x => JSON.parse(JSON.stringify(x));

// ---------------------------------------------------------------- Übersicht
function uebersicht() {
  const n = Z.aenderungen.length, st = new Date().getHours(), cs = nachZeit();
  const tuer = (akt, z, titel, text) => `<button class="tuer" type="button" data-los="${akt}">${ik(z)}<b>${titel}</b><span>${text}</span><i>${PF}</i></button>`;
  const hl = (Z.listen.haeuser || { liste: [] }).liste;
  const wert = p => (Z.felder[p] || {}).wert || '';
  sicht.innerHTML = `<div class="in">${kopf(st < 11 ? 'Guten <em>Morgen.</em>' : st < 18 ? 'Guten <em>Tag.</em>' : 'Guten <em>Abend.</em>', 'Die gemeinsame Startseite Ihrer vier Häuser. Alles, was Sie hier ändern, wird zuerst im Entwurf gespeichert. Unten sehen Sie jederzeit, was offen ist, und stellen es mit einem Knopf auf die Seite.')}
  ${Z.fehler ? `<p class="hinweis" style="margin-bottom:14px"><b>Der Entwurf lässt sich gerade nicht bauen.</b> ${h(Z.fehler)} <a class="link" href="pruefung.html">Zur Prüfung</a></p>` : ''}
  <h2 class="zw" style="margin-top:0">Was möchten Sie tun?</h2>
  <div class="raster r-3">
    ${tuer('haeuser', 'haeuser', 'Reihenfolge der Häuser', 'Welches Haus zuerst steht: in der Hausleiste, bei den Kapiteln, im Fuss.')}
    ${tuer('haeuser', 'text', 'Satz eines Hauses ändern', 'Leitsatz, grosser Satz, kurzer Text, drei Angaben, Fenster-Satz.')}
    ${tuer('angaben', 'uhr', 'Telefon, Adresse, Buchung', 'Je Haus. Einmal ändern, überall auf der Seite richtig.')}
    ${tuer('saison', 'jahr', 'Saison des Berghotels', 'Saisonschluss und Eröffnung. Das Buchen-Fenster sperrt die Tage dazwischen.')}
    ${tuer('familie', 'brief', 'Brief der Familie', 'Der grosse Satz, der Brief, die Namen, der Schluss, der Fuss.')}
    ${tuer('seite', 'seite', 'Text direkt in der Seite', 'Seite öffnen, auf einen Text klicken, schreiben.')}
    ${tuer('bilder', 'bild', 'Bild tauschen', 'Startbilder, Fenster, Kapitel, Familie, Karten, Schluss.')}
    ${tuer('hinweis', 'glocke', 'Hinweis für Gäste', 'Ein Band unten auf der Seite, zeitlich begrenzt.')}
    ${tuer('zahlen', 'zahlen', 'Was Gäste wählen', 'Welches Haus angeklickt wird, wie oft gebucht, Besuche der letzten 30 Tage.')}
  </div>
  ${n ? `<h2 class="zw">Im Entwurf<span>${String(n).padStart(2, '0')}</span></h2><section class="blatt offenes">${cs.slice(0, 4).map(c => `<div class="offenes__z" data-id="${h(c.id)}"><span class="lade__z">${ik(ARTZ[c.art])}</span><div><b>${h(c.satz)}</b><small>${h(c.ort || '')}${c.zeit ? ' · ' + vor(c.zeit) : ''}</small></div>
      ${c.stellen.length ? '<button class="kn kn--klein kn--linie" type="button" data-akt="sehen">Ansehen</button>' : ''}</div>`).join('')}
      <div class="offenes__f"><button class="link" type="button" data-akt="lade">${n > 4 ? `Alle ${n} zeigen` : 'Liste öffnen'}</button><button class="kn kn--klein" type="button" data-akt="raus">Veröffentlichen</button></div></section>` : ''}
  <h2 class="zw">Die Häuser, in dieser Reihenfolge</h2>
  <div class="raster r-4">${hl.map((x, i) => `<a class="hk" href="#/haeuser"><span class="hk__b"><img src="${bildadr(HAUS_BILD[x.k] || 'k-carlton')}" alt="" loading="lazy"><b class="hk__n">${String(i + 1).padStart(2, '0')}</b></span>
    <span class="hk__t"><b>${h(x.art)} ${h(x.name)}</b><span>${h((x.werte || []).join(' · ') || x.leit)}</span><i>${h(wert(x.k + '.tel'))}</i></span></a>`).join('')}</div></div>`;
  sicht.querySelector('.in').addEventListener('click', ev => {
    const t = ev.target.closest('[data-los]'), s = ev.target.closest('[data-akt="sehen"]');
    if (s) return aktAenderung('sehen', s.closest('[data-id]').dataset.id);
    if (!t) return;
    const los = t.dataset.los;
    if (los === 'saison') { location.hash = '#/angaben/gasterntal'; return; }
    location.hash = '#/' + los;
  });
}

// ---------------------------------------------------------------- Die Seite (Text und Bild direkt in der Seite)
const RSTIL = `.studio-hov,.studio-an{position:absolute;z-index:2147483000;pointer-events:none;border-radius:5px;display:none;box-sizing:border-box}
.studio-hov{outline:calc(1.5px*var(--studio-k,1)) dashed #b89850;outline-offset:calc(4px*var(--studio-k,1))}
.studio-hov::before{content:attr(data-w);position:absolute;left:-4px;bottom:calc(100% + 9px*var(--studio-k,1));background:#b89850;color:#0f1620;font:500 10px/1 'DM Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;padding:6px 8px;border-radius:5px;white-space:nowrap;transform:scale(var(--studio-k,1));transform-origin:0 100%}
.studio-hov[data-w=""]::before{display:none}
.studio-an{outline:calc(2px*var(--studio-k,1)) solid #b89850;outline-offset:calc(4px*var(--studio-k,1));background:rgba(184,152,80,.09)}
.studio-werk [data-e]{cursor:text}.studio-werk img[data-b]{cursor:pointer;pointer-events:auto!important}
.studio-werk .glanz,.studio-werk .eckknopf{display:none!important}.studio-werk .vorhang{display:none!important}`;
function richte(d, werk) {
  if (!d.getElementById('studio-stil')) {
    const s = d.createElement('style');
    s.id = 'studio-stil';
    s.textContent = RSTIL;
    d.head.appendChild(s);
  }
  if (werk) d.documentElement.classList.add('studio-werk');
  const k = c => { const b = d.createElement('div'); b.className = c; d.body.appendChild(b); return b; };
  return { hov: k('studio-hov'), an: k('studio-an') };
}
function rahme(box, el, wort) {
  if (!box) return;
  const r = el && el.isConnected ? el.getBoundingClientRect() : null;
  if (!r || (!r.width && !r.height)) { box.style.display = 'none'; return false; }
  const d = el.ownerDocument, w = d.defaultView, wirt = el.closest('dialog') || d.body;
  if (box.parentNode !== wirt) wirt.appendChild(box);
  let x = r.left + w.scrollX, y = r.top + w.scrollY;
  if (wirt !== d.body) { const wr = wirt.getBoundingClientRect(); x = r.left - wr.left + wirt.scrollLeft - wirt.clientLeft; y = r.top - wr.top + wirt.scrollTop - wirt.clientTop; }
  Object.assign(box.style, { display: 'block', left: x + 'px', top: y + 'px', width: r.width + 'px', height: r.height + 'px' });
  box.dataset.w = wort || '';
  return true;
}
function passe(fr, wirt, soll) {
  const tu = () => {
    if (wirt.classList.contains('handy')) { fr.style.cssText = ''; try { fr.contentDocument.documentElement.style.setProperty('--studio-k', '1'); } catch (e) {} return; }
    const w = wirt.clientWidth, hoch = wirt.clientHeight;
    if (!w) return;
    const k = Math.min(1, w / soll);
    fr.style.cssText = `position:absolute;left:0;top:0;width:${k < 1 ? soll : w}px;height:${hoch / k}px;transform-origin:0 0;transform:${k < 1 ? `scale(${k})` : 'none'}`;
    try { fr.contentDocument.documentElement.style.setProperty('--studio-k', (1 / k).toFixed(3)); } catch (e) {}
  };
  fr.addEventListener('load', tu);
  new ResizeObserver(tu).observe(wirt);
  tu();
  return tu;
}
function zeig(el) {
  for (let p = el.parentElement; p; p = p.parentElement) {
    if (p.hidden) p.hidden = false;
    if (p.tagName === 'DIALOG' && !p.open) { try { p.showModal(); } catch (e) { p.setAttribute('open', ''); } }
    if (p.tagName === 'DETAILS') p.open = true;
  }
}
function artVon(q, rein) {
  if (!rein) return 'text';
  if (q[0].startsWith('l:')) return 'liste';
  if (q[0].startsWith('hinweis.')) return 'hinweis';
  return 'angabe';
}
const WORT = { liste: 'Eintrag bearbeiten', hinweis: 'Hinweis bearbeiten', angabe: 'Angabe ändern', text: 'Text ändern' };
function ziel(d, x, y) {
  const els = d.elementsFromPoint(x, y).filter(e => !/^studio-/.test(e.className));
  if (!els.length) return null;
  let t = els[0].closest('[data-e]') || els.slice(0, 5).find(e => e.matches('[data-e]'));
  const b = els.find(e => e.matches('img[data-b]'));
  if (!t && b) return { art: 'bild', el: b, wort: 'Bild tauschen' };
  if (!t) return null;
  const q = (t.dataset.q || '').split(' ').filter(Boolean), rein = t.hasAttribute('data-rein');
  const art = artVon(q, rein);
  return { art, el: t, q, wort: WORT[art] };
}
function zielVon(el) {
  const q = (el.dataset.q || '').split(' ').filter(Boolean), rein = el.hasAttribute('data-rein');
  return { art: artVon(q, rein), el, q };
}
function seite() {
  const s = Z.seiten[0];
  sicht.innerHTML = `<div class="werk">
    <div class="werk__leiste">
      <a class="rund" href="#/uebersicht" title="Zur Übersicht" aria-label="Zur Übersicht">${SYM.links}</a>
      <b class="werk__name">${h(s.name)}</b>
      <button class="rund an" type="button" data-akt="geraet" data-g="rechner" title="Wie am Rechner" aria-label="Wie am Rechner">${SYM.rechner}</button>
      <button class="rund" type="button" data-akt="geraet" data-g="handy" title="Wie am Handy" aria-label="Wie am Handy">${SYM.handy}</button>
      <span class="werk__hin">Klicken Sie in der Seite auf einen Text oder ein Bild. Rechts ändern Sie es und bestätigen mit „Übernehmen“.</span>
    </div>
    <div class="werk__buehne" id="w-buehne"><iframe id="w-rahmen" title="${h(s.name)}" src="/entwurf/${encodeURIComponent(s.datei)}?nomotion"></iframe></div>
    <aside class="pruef" id="w-pruef" aria-live="polite"></aside>
  </div>`;
  W = { datei: s.datei, fr: $('#w-rahmen'), sel: null, y: 0, wieder: null };
  W.passe = passe(W.fr, $('#w-buehne'), 1200);
  W.fr.addEventListener('load', werkBereit);
  pruefLeer();
}
function werkBereit() {
  if (!W) return;
  const d = W.fr.contentDocument;
  if (!d || !d.body) return;
  const w = d.defaultView;
  Object.assign(W, richte(d, true), { sel: null });
  d.addEventListener('mousemove', ev => { const t = ziel(d, ev.clientX, ev.clientY); rahme(W.hov, t && (!W.sel || t.el !== W.sel.el) ? t.el : null, t && t.wort); }, true);
  d.documentElement.addEventListener('mouseleave', () => W && rahme(W.hov, null));
  d.addEventListener('click', ev => {
    if (ev.target.closest && ev.target.closest('a[href]')) ev.preventDefault();
    const t = ziel(d, ev.clientX, ev.clientY);
    if (t) waehle(t);
  }, true);
  d.addEventListener('submit', ev => ev.preventDefault(), true);
  const nach = () => { if (W && W.sel) rahme(W.an, W.sel.el); };
  w.addEventListener('scroll', nach, { passive: true, capture: true });
  w.addEventListener('resize', nach);
  if (W.wieder) {
    const m = W.wieder, el = m.q ? d.querySelector(`[data-q="${m.q}"]`) : m.b ? d.querySelector(`img[data-b="${m.b}"][data-bn="${m.n}"]`) : m.e ? d.querySelector(`[data-e="${m.e}"][data-en="${m.n}"]`) : null;
    W.wieder = null;
    if (el) {
      zeig(el);
      el.scrollIntoView({ block: 'center', inline: 'center' });
      setTimeout(() => { if (W && el.isConnected) waehle(el.matches('img') ? { art: 'bild', el } : zielVon(el)); }, 150);
      return;
    }
    w.scrollTo(0, W.y);
  }
  pruefLeer();
}
function neuLaden(merk) {
  if (!W) return;
  const w = W.fr.contentWindow;
  W.y = w.scrollY;
  W.wieder = merk || {};
  w.location.reload();
}
function pruefLeer() {
  if (!W) return;
  W.sel = null;
  rahme(W.an, null);
  const hier = Z.aenderungen.filter(c => c.stellen.some(x => x.seite === W.datei));
  $('#w-pruef').innerHTML = `<div class="pruef__leer">${ik('marke')}<b>Klicken Sie in die Seite.</b><p>Alles, was gold umrandet wird, können Sie ändern.</p>
    <ul><li><b>Text</b>Überschriften, Absätze, Knöpfe</li><li><b>Bild</b>Foto tauschen</li><li><b>Angabe</b>Telefon, Adresse, Sätze der Häuser</li></ul></div>
    ${hier.length ? `<div class="pruef__offen"><h3>Auf dieser Seite im Entwurf</h3>${hier.slice(0, 6).map(c => `<button type="button" data-id="${h(c.id)}"><b>${h(c.satz)}</b><small>Vorher/Nachher ansehen</small></button>`).join('')}</div>` : ''}`;
  $$('.pruef__offen button').forEach(b => b.addEventListener('click', () => aktAenderung('sehen', b.dataset.id, W.datei)));
}
function waehle(t) {
  if (W.sel && W.sel.orig !== undefined && W.sel.el.isConnected && !W.sel.fertig) spiegel(W.sel, W.sel.orig);
  W.sel = t;
  rahme(W.hov, null);
  rahme(W.an, t.el);
  const nach = {
    text: pruefText, angabe: pruefAngabe, bild: pruefBild,
    liste: t => { const [, key, i] = t.q[0].split(':'); pruefLeer(); listeFenster(key, +i); },
    hinweis: () => { location.hash = '#/hinweis'; },
  };
  nach[t.art](t);
}
const woSteht = (n, s) => n > 1 ? `Steht an <b>${n} Stellen</b>.` : '';
function spiegel(t, html) {
  const d = t.el.ownerDocument, alle = t.ueberall ? $$(`[data-e="${t.el.dataset.e}"]:not([data-rein])`, d) : [t.el];
  alle.forEach(e => { e.innerHTML = html; });
  rahme(W.an, t.el);
}
function rein(html) {
  return html.replace(/<div[^>]*>|<p[^>]*>/gi, '<br>').replace(/<\/(div|p)>/gi, '').replace(/\r?\n/g, '<br>').replace(/^(<br>)+/, '').replace(/&nbsp;/g, ' ');
}
function pruefText(t) {
  const el = t.el, hs = el.dataset.e, n = +el.dataset.en, lauf = el.hasAttribute('data-lauf'), m = Z.mehrfach[hs];
  const tag = el.closest('h1,h2,h3,h4,.d1,.d2,.d3') ? 'Überschrift' : el.closest('a,button') ? 'Knopf oder Link' : 'Text';
  t.orig = el.innerHTML;
  t.ueberall = !!m;
  const angaben = t.q.filter(q => Z.felder[q]).map(q => Z.felder[q]);
  const listen = t.q.filter(q => /^l:/.test(q));
  $('#w-pruef').innerHTML = `<h2>${tag}</h2>
    <div class="schreib" id="w-schreib" contenteditable="true" spellcheck="true" role="textbox" aria-multiline="true" aria-label="${tag}"></div>
    ${m ? `<div><div class="wahl2" role="group" aria-label="Wo ändern"><button type="button" class="an" data-wo="1">Überall</button><button type="button" data-wo="0">Nur an dieser Stelle</button></div>
      <p class="hinweis" style="margin-top:10px" id="w-wo">${woSteht(m[0], m[1])} Sie ändern alle auf einmal.</p></div>` : ''}
    ${angaben.length ? `<p class="hinweis">In diesem Satz steht eine Angabe, die an mehreren Stellen gleich ist: <b>${angaben.map(a => h(a.label)).join(', ')}</b>. Ändern Sie sie besser unter „Telefon, Adresse, Buchung“ oder „Brief & Sätze“. Schreiben Sie den Satz hier um, folgt er ihr nicht mehr von selbst.</p>` : ''}
    ${listen.length ? '<p class="hinweis">In diesem Satz steckt ein Eintrag aus „Die vier Häuser“. Ändern Sie ihn besser dort. Schreiben Sie den Satz hier um, folgt er dem Eintrag nicht mehr.</p>' : ''}
    <div class="pruef__kn"><button class="kn kn--breit" type="button" id="w-ok">Übernehmen</button>
      <button class="link" type="button" id="w-ab" style="justify-self:center">Abbrechen</button>
      ${el.hasAttribute('data-neu') ? '<button class="link" type="button" id="w-ur" style="justify-self:center">Ursprünglichen Text zurückholen</button>' : ''}</div>`;
  const box = $('#w-schreib');
  box.innerHTML = t.orig.replace(/\s*\n\s*/g, ' ');
  const anfang = rein(box.innerHTML);
  box.addEventListener('input', () => spiegel(t, rein(box.innerHTML)));
  box.addEventListener('keydown', ev => {
    if (ev.key === 'Enter') { ev.preventDefault(); if (!lauf && !ev.metaKey && !ev.ctrlKey) document.execCommand('insertLineBreak'); else if (ev.metaKey || ev.ctrlKey) $('#w-ok').click(); }
  });
  box.addEventListener('paste', ev => { ev.preventDefault(); document.execCommand('insertText', false, (ev.clipboardData || window.clipboardData).getData('text/plain')); });
  $$('.wahl2 button').forEach(b => b.addEventListener('click', () => {
    spiegel(t, t.orig);
    t.ueberall = b.dataset.wo === '1';
    $$('.wahl2 button').forEach(x => x.classList.toggle('an', x === b));
    $('#w-wo').innerHTML = t.ueberall ? `${woSteht(m[0], m[1])} Sie ändern alle auf einmal.` : 'Nur diese eine Stelle ändert sich. Alle anderen bleiben, wie sie sind.';
    spiegel(t, rein(box.innerHTML));
  }));
  $('#w-ab').addEventListener('click', () => { spiegel(t, t.orig); pruefLeer(); });
  const ur = $('#w-ur');
  if (ur) ur.addEventListener('click', async () => {
    try { await aendern({ art: 'text-weg', h: hs, seite: W.datei, n }); t.fertig = true; sag('Der ursprüngliche Text steht wieder da.'); neuLaden({ e: hs, n }); } catch (e) { sag(e.message, true); }
  });
  $('#w-ok').addEventListener('click', async () => {
    const neu = rein(box.innerHTML);
    if (neu === t.orig || neu === anfang) { spiegel(t, t.orig); pruefLeer(); return; }
    try {
      await aendern({ art: 'text', h: hs, seite: W.datei, n, neu, ueberall: t.ueberall, lauf });
      t.fertig = true;
      el.setAttribute('data-neu', '');
      pruefLeer();
      quittung('Text gespeichert', box.textContent.trim().slice(0, 90), { id: t.ueberall ? `t:${hs}||` : `t:${hs}|${W.datei}|${n}`, seite: W.datei });
    } catch (e) { sag(e.message, true); }
  });
  box.focus();
  const sel = getSelection(), r = document.createRange();
  r.selectNodeContents(box);
  r.collapse(false);
  sel.removeAllRanges();
  sel.addRange(r);
}
function feldEingabe(p, f, id) {
  const lang = f.art === 'lang';
  if (lang) return `<textarea data-p="${p}"${id ? ` id="${id}"` : ''} rows="${Math.min(8, Math.max(2, Math.ceil((f.wert || '').length / 70) + ((f.wert || '').match(/\n/g) || []).length))}">${h(f.wert)}</textarea>`;
  const typ = f.art === 'datum' ? ' type="date"' : f.art === 'link' ? ' inputmode="url"' : f.art === 'mail' ? ' inputmode="email"' : f.art === 'kontakt' ? ' inputmode="tel"' : f.art === 'zahl' ? ' inputmode="decimal"' : '';
  return `<input data-p="${p}"${id ? ` id="${id}"` : ''} value="${h(f.wert)}"${typ}>`;
}
function pruefAngabe(t) {
  const felder = t.q.map(q => [q, Z.felder[q]]).filter(x => x[1]);
  if (!felder.length) return pruefLeer();
  const f0 = felder[0][1], bereich = Z.bereiche[f0.bereich];
  $('#w-pruef').innerHTML = `<h2>${bereich ? h(bereich) : 'Angabe'}</h2>
    ${felder.map(([q, f]) => `<label class="feld"><span>${h(f.label)}</span>${feldEingabe(q, f)}</label>`).join('')}
    <p class="hinweis">${woSteht(f0.stellen, f0.seiten) || 'Diese Angabe gilt für die ganze Seite.'} Sie ändern sie hier für alle Stellen auf einmal.</p>
    <div class="pruef__kn"><button class="kn kn--breit" type="button" id="w-ok">Übernehmen</button><button class="link" type="button" id="w-ab" style="justify-self:center">Abbrechen</button>
    <a class="link" href="${/^(carlton|doldenhorn|ruedihus|gasterntal|leiste)$/.test(f0.bereich) ? '#/angaben/' + f0.bereich : '#/familie'}" style="justify-self:center">Alle Angaben dazu</a></div>`;
  const ins = $$('#w-pruef [data-p]');
  ins.forEach(i => i.addEventListener('keydown', ev => { if (ev.key === 'Enter' && i.tagName === 'INPUT') $('#w-ok').click(); }));
  $('#w-ab').addEventListener('click', pruefLeer);
  $('#w-ok').addEventListener('click', async () => {
    try {
      const werte = {}, alte = {};
      ins.forEach(i => { if (i.value.trim() !== Z.felder[i.dataset.p].wert) { werte[i.dataset.p] = i.value; alte[i.dataset.p] = Z.felder[i.dataset.p].wert; } });
      const ps = Object.keys(werte);
      if (!ps.length) return pruefLeer();
      await aendern({ art: 'fakten', werte });
      quittung(mal(ps.length, 'Angabe', 'Angaben') + ' gespeichert', `${bereich || 'Die Startseite'} · ${ps.map(p => Z.felder[p].label).join(', ')}`, { id: 'f:' + ps[0], seite: W.datei, zurueck: { art: 'fakten', werte: alte } });
      neuLaden({ e: t.el.dataset.e, n: t.el.dataset.en });
    } catch (e) { sag(e.message, true); }
  });
  ins[0].focus();
  if (ins[0].select) ins[0].select();
}
function pruefBild(t, neu) {
  const key = t.el.dataset.b, b = Z.bilder.find(x => x.key === key) || { seiten: [], sonder: '' };
  const sende = async (wert, titel) => { if (await tun({ art: 'bild', key, neu: wert }, { titel, text: b.sonder, id: 'b:' + key, seite: W.datei, zurueck: { art: 'bild', key, neu: b.neu || null } })) neuLaden({ b: key, n: t.el.dataset.bn }); };
  if (neu) {
    $('#w-pruef').innerHTML = `<h2>Neues Bild</h2><div class="bildvor"><img src="${h(neu.adresse)}" alt=""></div>
      <p class="hinweis">Es ersetzt das bisherige Bild (${h(b.sonder)}).${neu.hinweis ? ' ' + h(neu.hinweis) : ''}</p>
      <div class="pruef__kn"><button class="kn kn--breit" type="button" id="w-ok">Bild übernehmen</button><button class="link" type="button" id="w-ab" style="justify-self:center">Abbrechen</button></div>`;
    $('#w-ok').addEventListener('click', () => sende(neu.key, 'Bild getauscht'));
    $('#w-ab').addEventListener('click', () => pruefBild(t));
    return;
  }
  $('#w-pruef').innerHTML = `<h2>Bild</h2><div class="bildvor"><img src="${h(t.el.currentSrc || t.el.src)}" alt=""></div>
    <p class="hinweis">${h(b.sonder)}. ${/^auf-/.test(key) ? 'Ein neues Startbild wird automatisch zugeschnitten und unten abgedunkelt, damit Titel und Hausleiste lesbar bleiben; fürs Handy entsteht eine hohe Fassung.' : key === 'schluss' ? 'Das Schlussbild wird automatisch abgedunkelt, damit der Satz darauf lesbar bleibt.' : 'Ein neues Foto wird auf dasselbe Seitenverhältnis zugeschnitten, damit nichts aus dem Rahmen fällt.'}</p>
    <div class="ablage" id="w-ablage" tabindex="0" role="button"><b>Neues Bild wählen</b><span>oder hierher ziehen · JPG, PNG, WebP</span></div>
    <button class="link" type="button" id="w-vorrat" style="justify-self:center;align-self:center">Aus den Fotos der Seite wählen</button>
    ${b.neu ? '<button class="link" type="button" id="w-alt" style="justify-self:center;align-self:center">Ursprüngliches Bild zurückholen</button>' : ''}`;
  ablage($('#w-ablage'), key, r => pruefBild(t, r));
  const alt = $('#w-alt'), vorrat = $('#w-vorrat');
  if (alt) alt.addEventListener('click', () => sende(null, 'Ursprüngliches Bild zurückgeholt'));
  if (vorrat) vorrat.addEventListener('click', () => bildWahl(k => { if (k !== key) sende(k, 'Bild getauscht'); }, key));
}

// ---------------------------------------------------------------- Hochladen
function waehleDatei(accept) {
  return new Promise(ok => {
    const i = $('#datei');
    i.value = '';
    if (accept) i.accept = accept;
    i.onchange = () => { ok(i.files[0] || null); i.accept = 'image/jpeg,image/png,image/webp'; };
    i.click();
  });
}
async function ladeHoch(datei, fuer) {
  if (!datei) return null;
  if (!/^image\/(jpeg|png|webp)$/.test(datei.type)) { sag('Bitte ein JPG, PNG oder WebP wählen.', true); return null; }
  sag('Das Bild wird vorbereitet …');
  try {
    const r = await api('hochladen?fuer=' + encodeURIComponent(fuer || ''), datei, true);
    if (r.hinweis) sag(r.hinweis, true);
    return r;
  } catch (e) { sag(e.message, true); return null; }
}
async function hochladen(fuer) { return ladeHoch(await waehleDatei(), fuer); }
function ablage(el, fuer, dann) {
  const los = async d => { const r = await ladeHoch(d, fuer); if (r) dann(r); };
  el.addEventListener('click', async () => los(await waehleDatei()));
  el.addEventListener('keydown', async ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); los(await waehleDatei()); } });
  el.addEventListener('dragover', ev => { ev.preventDefault(); el.classList.add('drauf'); });
  el.addEventListener('dragleave', () => el.classList.remove('drauf'));
  el.addEventListener('drop', ev => { ev.preventDefault(); el.classList.remove('drauf'); los(ev.dataTransfer.files[0]); });
}
/* Aus den Fotos der Seite wählen (legt sich über ein offenes Fenster oder öffnet ein eigenes). Für ein Startbild kommen nur Startbilder in Frage (sie tragen ihr Dunkel und die Handy-Fassung). */
function bildWahl(dann, gewaehlt) {
  const nurAuftakt = /^auf-/.test(gewaehlt || '');
  const alle = Z.bilder.filter(b => (nurAuftakt ? /^auf-/.test(b.key) : !/^auf-/.test(b.key)) && !/^u-/.test(b.key)), f = $('#fenster');
  const wand = `<div class="bildwand">${alle.map(b => `<button class="bk${b.key === gewaehlt ? ' gewaehlt' : ''}" type="button" data-k="${h(b.key)}" title="${h(b.sonder || b.key)}"><img src="${bildadr(b.key)}" alt="" loading="lazy"></button>`).join('')}</div>
    <div class="fenster__kn">${PROBE ? '' : '<button class="kn kn--linie" type="button" id="bw-hoch">Neues Foto hochladen</button>'}<button class="kn kn--linie" type="button" id="bw-zu">${f.hidden ? 'Abbrechen' : 'Zurück'}</button></div>`;
  if (f.hidden) {
    fenster(`<h2>Foto <em>wählen.</em></h2><p>${nurAuftakt ? 'Die Startbilder der Seite. Oder Sie laden ein neues hoch.' : 'Alle Fotos, die schon auf der Seite liegen. Oder Sie laden ein neues hoch.'}</p>${wand}`, true);
    $('#bw-zu').addEventListener('click', () => fensterZu());
    $$('.bildwand .bk', f).forEach(b => b.addEventListener('click', () => { fensterZu(); dann(b.dataset.k); }));
    const hoch = $('#bw-hoch'); if (hoch) hoch.addEventListener('click', async () => { const r = await hochladen(gewaehlt || ''); if (r) { fensterZu(); dann(r.key); } });
    return;
  }
  const k = $('.fenster__k', f), rest = [...k.children].filter(c => !c.matches('.zu'));
  const w = document.createElement('div');
  w.innerHTML = `<h2>Foto <em>wählen.</em></h2>${wand}`;
  const war = rest.map(c => c.hidden);
  rest.forEach(c => { c.hidden = true; });
  k.appendChild(w);
  k.scrollTop = 0;
  const zurueck = () => { w.remove(); rest.forEach((c, i) => { c.hidden = war[i]; }); };
  $('#bw-zu', w).addEventListener('click', zurueck);
  $$('.bildwand .bk', w).forEach(b => b.addEventListener('click', () => { zurueck(); dann(b.dataset.k); }));
  const hoch = $('#bw-hoch', w); if (hoch) hoch.addEventListener('click', async () => { const r = await hochladen(gewaehlt || ''); if (r) { zurueck(); dann(r.key); } });
}

// ---------------------------------------------------------------- Listen (die vier Häuser, die grossen Zahlen)
function platzNach(stand, y, liste, nameJetzt, nameStand) {
  for (let k = stand.indexOf(y) - 1; k >= 0; k--) {
    const j = liste.findIndex(x => nameJetzt(x) === nameStand(stand[k]));
    if (j >= 0) return j + 1;
  }
  return 0;
}
const feldWert = (x, f) => f[2] === 'liste' ? (x[f[0]] || []).join(' · ') : f[2] === 'id' ? '' : String(x[f[0]] ?? '');
const listeName = (x, g) => { if (g.felder.some(f => f[0] === 'name') && x.name) return ((x.art ? x.art + ' ' : '') + x.name).trim(); const f = g.felder.find(f => f[2] === 'text' && x[f[0]]) || g.felder.find(f => f[2] === 'lang' && x[f[0]]); return f ? feldWert(x, f).slice(0, 80) : feldWert(x, g.felder.find(f => f[2] !== 'id') || g.felder[0]); };
function listeStatus(g) {
  const norm = l => JSON.stringify(l.map(x => Object.fromEntries(g.felder.filter(f => f[2] !== 'id').map(f => [f[0], f[2] === 'liste' ? (x[f[0]] || []) : (x[f[0]] ?? '')]))));
  const a = g.stand, b = g.liste, na = a.map(x => listeName(x, g)), nb = b.map(x => listeName(x, g)), gleich = a.length === b.length;
  return { status: b.map((x, i) => { const j = na.includes(nb[i]) ? na.indexOf(nb[i]) : (gleich && !nb.includes(na[i]) ? i : -1); return j < 0 ? 'neu' : (norm([a[j]]) !== norm([x]) ? 'anders' : ''); }), weg: a.filter((y, i) => !nb.includes(na[i]) && !(gleich && !na.includes(nb[i]))) };
}
function listeBlatt(key, o = {}) {
  const g = Z.listen[key];
  if (!g) return '';
  const st = listeStatus(g), haeuser = key === 'haeuser';
  const zweit = g.felder.filter(f => !['liste', 'id', 'lang'].includes(f[2]) && !['name', 'art'].includes(f[0])).slice(0, 2);
  const zeile = (x, i) => `<div class="gz${haeuser ? '' : ' gz--ohne'} gz--ohnepreis${BLITZ === key + ':' + i ? ' blitz' : ''}" data-i="${i}">
      ${haeuser ? `<button class="gz__b" type="button" data-akt="edit" tabindex="-1" aria-hidden="true"><img src="${bildadr(HAUS_BILD[x.k] || 'k-carlton')}" alt="" loading="lazy"></button>` : ''}
      <button class="gz__t" type="button" data-akt="edit" title="Bearbeiten"><b>${haeuser ? `<i class="gz__nr">${String(i + 1).padStart(2, '0')}</i>` : ''}${h(listeName(x, g)) || '<i>ohne Namen</i>'}</b>${zweit.map(f => feldWert(x, f)).filter(Boolean).length ? `<span>${h(zweit.map(f => feldWert(x, f)).filter(Boolean).join(' · '))}</span>` : ''}</button>
      <span class="gz__s">${st.status[i] === 'neu' ? '<i class="marke rot">Neu im Entwurf</i>' : st.status[i] === 'anders' ? '<i class="marke rot">Geändert</i>' : ''}</span>
      <div class="gz__r"><button class="rund" type="button" data-akt="hoch" aria-label="Nach vorn" title="Nach vorn"${i === 0 ? ' disabled' : ''}>${SYM.hoch}</button><button class="rund" type="button" data-akt="runter" aria-label="Nach hinten" title="Nach hinten"${i === g.liste.length - 1 ? ' disabled' : ''}>${SYM.runter}</button>
        ${haeuser ? `<button class="rund" type="button" data-akt="weg" title="Von der Seite nehmen" aria-label="Von der Seite nehmen"${g.liste.length < 2 ? ' disabled' : ''}>${SYM.korb}</button>` : `<button class="rund" type="button" data-akt="weg" title="Entfernen" aria-label="Entfernen">${SYM.korb}</button>`}<button class="kn kn--klein kn--linie" type="button" data-akt="edit">Bearbeiten</button></div></div>`;
  return `<section class="blatt gruppe" data-l="${h(key)}"><div class="gruppe__k"><h3>${h(o.titel || g.label)}<span>${String(g.liste.length).padStart(2, '0')}</span></h3>${g.eigen ? '<i class="marke rot">Im Entwurf geändert</i>' : ''}${haeuser ? '' : `<button class="kn kn--klein" type="button" data-akt="neu">${h(g.wort || 'Eintrag')} hinzufügen</button>`}</div>
    ${g.hinweis ? `<p class="gruppe__hin">${h(g.hinweis)}</p>` : ''}
    <div class="zeilen">${g.liste.map(zeile).join('')}${st.weg.map(y => `<div class="gz gz--ohne gz--ohnepreis weg"><span class="gz__t"><b>${h(listeName(y, g))}</b></span><span class="gz__s"><i class="marke grau">${haeuser ? 'Von der Seite genommen, noch nicht veröffentlicht' : 'Entfernt, noch nicht veröffentlicht'}</i></span><div class="gz__r"><button class="kn kn--klein kn--linie" type="button" data-akt="hol" data-n="${h(listeName(y, g))}">Zurückholen</button></div></div>`).join('')}
      ${g.liste.length || st.weg.length ? '' : '<p class="gz leer">Noch nichts in dieser Liste.</p>'}</div>
    ${g.eigen ? `<div class="gruppe__f"><button class="link" type="button" data-akt="std">${haeuser ? 'Häuser wieder so wie auf der Seite' : 'Alle Änderungen in dieser Liste zurücknehmen'}</button></div>` : ''}</section>`;
}
function listenKlick(ev) {
  const b = ev.target.closest('[data-akt]'), sec = b && b.closest('[data-l]');
  if (!sec) return false;
  const key = sec.dataset.l, g = Z.listen[key], z = b.closest('.gz'), i = z && z.dataset.i !== undefined ? +z.dataset.i : -1, akt = b.dataset.akt;
  const alt = kopie(g.liste), l = kopie(g.liste), haeuser = key === 'haeuser';
  const sende = async (liste, titel, text) => { if (await tun({ art: 'liste', key, liste }, { titel, text, id: 'l:' + key, zurueck: { art: 'liste', key, liste: alt } })) neuZeichnen(); };
  if (akt === 'neu') listeFenster(key);
  else if (akt === 'edit') listeFenster(key, i);
  else if (akt === 'std') frage('Änderungen <em>zurücknehmen?</em>', `„${g.label}“ steht danach wieder so da wie auf der Seite.`, 'Zurücknehmen', async () => { await aendern({ art: 'verwerfen', id: 'l:' + key }); sag('Zurückgenommen: ' + g.label); neuZeichnen(); });
  else if (akt === 'hol') { const y = g.stand.find(x => listeName(x, g) === b.dataset.n), pos = platzNach(g.stand, y, l, x => listeName(x, g), x => listeName(x, g)); l.splice(pos, 0, { ...y }); BLITZ = key + ':' + pos; sende(l, 'Wieder da', listeName(y, g)); }
  else if (akt === 'hoch' && i > 0) { [l[i - 1], l[i]] = [l[i], l[i - 1]]; BLITZ = key + ':' + (i - 1); sende(l, 'Reihenfolge gespeichert', haeuser ? `${listeName(l[i - 1], g)} steht jetzt an Stelle ${i}` : listeName(l[i - 1], g)); }
  else if (akt === 'runter' && i < l.length - 1) { [l[i + 1], l[i]] = [l[i], l[i + 1]]; BLITZ = key + ':' + (i + 1); sende(l, 'Reihenfolge gespeichert', haeuser ? `${listeName(l[i + 1], g)} steht jetzt an Stelle ${i + 2}` : listeName(l[i + 1], g)); }
  else if (akt === 'weg') frage(haeuser ? 'Haus von der Seite <em>nehmen?</em>' : 'Eintrag <em>entfernen?</em>', haeuser ? `„${listeName(alt[i], g)}“ verschwindet aus Hausleiste, Kapiteln, Fuss und Buchen-Fenster. Bis zum Veröffentlichen holen Sie es mit einem Klick zurück.` : `„${listeName(alt[i], g)}“ verschwindet aus „${g.label}“. Bis zum Veröffentlichen können Sie es zurückholen.`, haeuser ? 'Von der Seite nehmen' : 'Entfernen', async () => { l.splice(i, 1); await sende(l, haeuser ? 'Von der Seite genommen' : 'Entfernt', listeName(alt[i], g)); });
  else return false;
  return true;
}
function feldH(f, wert, id) {
  const [k, label, art] = f;
  if (art === 'id') return '';
  if (art === 'lang') return `<label class="feld"><span>${h(label)}</span><textarea id="${id}" rows="${k === 'fenster' ? 3 : 4}">${h(wert ?? '')}</textarea>${k === 'fenster' ? '<small>Eine Zeile je Zeile des Satzes. Die letzte Zeile steht in Gold.</small>' : '<small>Eine Leerzeile beginnt einen neuen Absatz.</small>'}</label>`;
  if (art === 'liste') return `<label class="feld"><span>${h(label)}</span><textarea id="${id}" rows="3" placeholder="Zimmer: 67">${h((wert || []).join('\n'))}</textarea><small>Höchstens drei Zeilen, je «Bezeichnung: Wert».</small></label>`;
  if (art === 'zahl') return `<label class="feld"><span>${h(label)}</span><input id="${id}" inputmode="decimal" value="${h(String(wert ?? '').replace('.', ','))}"></label>`;
  return `<label class="feld"><span>${h(label)}</span><input id="${id}" maxlength="400" value="${h(wert ?? '')}"></label>`;
}
function listeFenster(key, i) {
  const g = Z.listen[key], neu = i === undefined, st = neu ? {} : kopie(g.liste[i]);
  const wort = g.wort || 'Eintrag', haeuser = key === 'haeuser';
  fenster(`<h2>${neu ? `${h(wort)} <em>hinzufügen.</em>` : haeuser ? `${h(st.art || '')} <em>${h(st.name || '')}.</em>` : `${h(wort)} <em>bearbeiten.</em>`}</h2><p class="form2__ort">${h(g.label)}${haeuser ? ` · ${h(hausName(st.k))}` : ''}</p>
    <div class="form1">${g.felder.map((f, n) => feldH(f, st[f[0]], 'lf-' + n)).join('')}</div>
    ${haeuser ? '<p class="hinweis">Sätze in «Guillemets» sind Wortlaut Ihres Hauses. Telefon, Adresse und Buchung ändern Sie unter „Telefon, Adresse, Buchung“, die Fotos unter „Bilder“.</p>' : ''}
    <div class="fehler" id="lf-f" role="alert"></div>
    <div class="fenster__kn"><button class="kn kn--linie" type="button" data-zu>Abbrechen</button><button class="kn" type="button" id="lf-ok">${neu ? 'Hinzufügen' : 'Speichern'}</button></div>`, true);
  const lies = () => { g.felder.forEach((fd, n) => { const el = $('#lf-' + n); if (!el) return; st[fd[0]] = fd[2] === 'liste' ? el.value.split('\n').map(x => x.trim()).filter(Boolean) : el.value; }); };
  $('#lf-ok').addEventListener('click', async ev => {
    lies();
    const fe = $('#lf-f');
    fe.textContent = '';
    if (!listeName(st, g)) { fe.textContent = 'Bitte mindestens das erste Feld ausfüllen.'; return; }
    const alt = kopie(g.liste), liste = kopie(g.liste);
    if (neu) liste.push(st); else liste[i] = st;
    if (!neu && JSON.stringify(liste) === JSON.stringify(alt)) { fensterZu(); sag('Nichts geändert, nichts gespeichert.'); return; }
    ev.target.disabled = true;
    const ok = await tun({ art: 'liste', key, liste }, { titel: neu ? `${wort} hinzugefügt` : `${wort} gespeichert`, text: `${listeName(st, g)} · ${g.label}`, id: 'l:' + key, zurueck: { art: 'liste', key, liste: alt } });
    ev.target.disabled = false;
    if (!ok) return;
    fensterZu();
    BLITZ = key + ':' + (neu ? liste.length - 1 : i);
    const zielH = key === 'haeuser' ? '#/haeuser' : '#/familie';
    if (W) neuLaden({}); else if (location.hash !== zielH) location.hash = zielH; else neuZeichnen();
  });
  const erstes = $('#lf-0') || $('#lf-1');
  if (erstes) erstes.focus();
}

// ---------------------------------------------------------------- Die vier Häuser
function haeuserS() {
  sicht.innerHTML = `<div class="in">${kopf('Die vier <em>Häuser.</em>', 'Die Reihenfolge hier ist die Reihenfolge auf der Seite: das erste Haus steht im ersten Bild, dann folgen die Kapitel, der Fuss und das Buchen-Fenster. Mit „Bearbeiten“ ändern Sie je Haus den Leitsatz, den grossen Satz, den kurzen Text, die drei Angaben und den Satz im Fenster.', `<a class="kn kn--linie" href="/entwurf/index.html" target="_blank" rel="noopener">Seite im Entwurf ansehen</a>`)}
    ${listeBlatt('haeuser')}
    <h2 class="zw">Die Hausleiste</h2>
    <div class="raster r-2">${angabenKarte('leiste')}</div></div>`;
  const blitz = $('.blitz', sicht);
  BLITZ = null;
  if (blitz) blitz.scrollIntoView({ block: 'center' });
  angabenBereit();
  sicht.querySelector('.in').addEventListener('click', ev => { if (listenKlick(ev)) return; angabenKlick(ev); });
}

// ---------------------------------------------------------------- Angaben (Telefon, Adresse, Buchung je Haus; Saison; Brief & Sätze)
function angabenKarte(k, o = {}) {
  const fs = Object.entries(Z.felder).filter(([p, f]) => f.bereich === k && (!o.nur || o.nur.includes(p)) && !(o.ohne || []).includes(p));
  if (!fs.length) return '';
  const feld = (p, f) => `<label class="feld${f.art === 'lang' ? ' feld--lang' : ''}" data-feld="${p}"><span>${h(f.label)}${f.wert !== f.stand ? '<i class="marke rot">Im Entwurf geändert</i>' : ''}</span>${feldEingabe(p, f)}
      <small>${f.stellen ? `steht an ${mal(f.stellen, 'Stelle', 'Stellen')} der Seite` : (f.art === 'link' ? 'hinter den Knöpfen «Zimmer buchen»' : f.art === 'datum' ? 'das Buchen-Fenster sperrt die Tage dazwischen' : f.art === 'zahl' ? 'oben im ersten Bild' : '')}${f.wert !== f.stand ? ` · <button class="link" type="button" data-sehen="f:${p}">vorher/nachher ansehen</button>` : ''}</small></label>`;
  const fuss = '<div class="sichern"><i></i><span></span><button class="link" type="button" data-akt="verwerfen">Verwerfen</button><button class="kn kn--klein" type="button" data-akt="sichern">Speichern</button></div>';
  const bild = HAUS_BILD[k];
  return `<section class="blatt haus" data-karte="${k}" id="k-${k}">${bild ? `<div class="haus__b"><img src="${bildadr(bild)}" alt=""><b>${h(Z.bereiche[k])}</b></div>` : `<div class="haus__t" style="padding-bottom:0"><h3>${h(o.titel || Z.bereiche[k])}</h3>${o.text ? `<p class="gruppe__hin" style="padding:6px 0 0">${o.text}</p>` : ''}</div>`}
      <div class="haus__t">${bild ? '<div class="sosteht"><span>So steht es im Fuss der Seite</span><div></div></div>' : ''}${fs.map(([p, f]) => feld(p, f)).join('')}</div>${fuss}</section>`;
}
function angabenBereit() {
  const pruefe = karte => {
    const anders = $$('.feld[data-feld]', karte).filter(l => { const d = $('[data-p]', l).value.trim() !== Z.felder[l.dataset.feld].wert; l.classList.toggle('offen', d); return d; });
    const s = $('.sichern', karte), imEntwurf = $$('.feld[data-feld]', karte).filter(l => Z.felder[l.dataset.feld].wert !== Z.felder[l.dataset.feld].stand).length;
    s.classList.toggle('offen', !!anders.length);
    s.classList.toggle('entwurf', !anders.length && !!imEntwurf);
    $$('button', s).forEach(b => { b.disabled = !anders.length; });
    $('span', s).textContent = anders.length ? mal(anders.length, 'Angabe', 'Angaben') + ' noch nicht gespeichert' : imEntwurf ? `Gespeichert, ${imEntwurf} im Entwurf` : 'Nichts geändert';
    const so = $('.sosteht div', karte);
    if (so) { const v = p => { const el = $(`input[data-p="${karte.dataset.karte}.${p}"]`, karte); return el ? el.value.trim() : ''; }; so.textContent = [v('strasse') + (v('plz') ? ', ' + v('plz') : ''), v('tel'), v('mail')].filter(Boolean).join(' · '); }
    return anders;
  };
  $$('.haus', sicht).forEach(pruefe);
  offen = () => !!$('.feld.offen', sicht);
  const wurzel = sicht.querySelector('.in');
  wurzel.addEventListener('input', ev => { const k = ev.target.closest('.haus'); if (k) pruefe(k); });
  wurzel.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target.matches('.feld input')) { ev.preventDefault(); const k = ev.target.closest('.haus'); if (pruefe(k).length) $('[data-akt="sichern"]', k).click(); } });
  wurzel._pruefe = pruefe;
}
async function angabenKlick(ev) {
  const wurzel = sicht.querySelector('.in'), pruefe = wurzel._pruefe;
  const s = ev.target.closest('[data-sehen]'), b = ev.target.closest('[data-akt]'), karte = b && b.closest('.haus');
  if (s) { ev.preventDefault(); const c = Z.aenderungen.find(x => x.id === s.dataset.sehen); if (c) vergleich(c); return; }
  if (!karte || !pruefe) return;
  if (b.dataset.akt === 'verwerfen') { $$('.feld[data-feld]', karte).forEach(l => { $('[data-p]', l).value = Z.felder[l.dataset.feld].wert; }); pruefe(karte); return; }
  if (b.dataset.akt === 'sichern') {
    const anders = pruefe(karte), werte = {}, alte = {};
    anders.forEach(l => { werte[l.dataset.feld] = $('[data-p]', l).value; alte[l.dataset.feld] = Z.felder[l.dataset.feld].wert; });
    const namen = anders.map(l => Z.felder[l.dataset.feld].label), k = karte.dataset.karte, erste = Object.keys(werte)[0];
    b.disabled = true;
    const ok = await tun({ art: 'fakten', werte }, { titel: mal(anders.length, 'Angabe', 'Angaben') + ' gespeichert', text: `${Z.bereiche[k] || ''} · ${namen.slice(0, 3).join(', ')}${namen.length > 3 ? ' …' : ''}`, id: 'f:' + erste, zurueck: { art: 'fakten', werte: alte } });
    b.disabled = false;
    if (ok) { offen = null; neuZeichnen(); }
  }
}
function angabenS(haus) {
  sicht.innerHTML = `<div class="in">${kopf('Telefon, Adresse, <em>Buchung.</em>', 'Jede Angabe gibt es nur einmal. Tragen Sie sie ein und drücken Sie unten an der Karte auf „Speichern“. Danach stimmt sie überall: im Fuss, im Menü, im Buchen-Fenster. Beim Berghotel stehen dazu Saisonschluss und Eröffnung; das Buchen-Fenster sperrt die Tage dazwischen.')}
    <div class="raster r-2">${['carlton', 'doldenhorn', 'ruedihus', 'gasterntal'].map(k => angabenKarte(k)).join('')}</div></div>`;
  angabenBereit();
  sicht.querySelector('.in').addEventListener('click', angabenKlick);
  if (haus) { const k = $('#k-' + haus); if (k) { k.scrollIntoView({ block: 'start' }); k.classList.add('blitz'); } }
}
function familieS() {
  sicht.innerHTML = `<div class="in">${kopf('Brief <em>& Sätze.</em>', 'Der Titel im ersten Bild, der Brief Ihrer Familie, die Namen, der Satz über den grossen Zahlen, der Schluss und der Fuss. Sätze in «Guillemets» sind Ihr Wortlaut. Unten an jeder Karte „Speichern“.')}
    <div class="raster r-2">
      ${angabenKarte('seite', { titel: 'Der Titel im ersten Bild', nur: ['seite.titel', 'seite.sub', 'seite.sub_lang'] })}
      ${angabenKarte('familie', { titel: 'Ihre Gastgeber', nur: ['familie.titel', 'familie.zitat', 'familie.brief', 'familie.dazu'] })}
      ${angabenKarte('familie', { titel: 'Die Namen und der Weg', nur: ['familie.namen', 'familie.personen', 'familie.weg'] })}
      ${angabenKarte('seite', { titel: 'Zahlen, Schluss und Fuss', nur: ['seite.prunk', 'seite.schluss', 'seite.schluss_von', 'seite.fuss', 'seite.fuss_von', 'seite.buchen_titel'] })}
    </div>
    <h2 class="zw">Die grossen Zahlen</h2>
    ${listeBlatt('zahlen')}</div>`;
  const blitz = $('.blitz', sicht);
  BLITZ = null;
  if (blitz) blitz.scrollIntoView({ block: 'center' });
  angabenBereit();
  sicht.querySelector('.in').addEventListener('click', ev => { if (listenKlick(ev)) return; angabenKlick(ev); });
}

// ---------------------------------------------------------------- Bilder
function bilder(filter) {
  const gruppen = [['', 'Alle'], ['auftakt', 'Startbilder'], ['fenster', 'Fenster'], ['kapitel', 'Kapitel'], ['karten', 'Karten'], ['weitere', 'Familie und Schluss']];
  const liste = Z.bilder.filter(b => !/^u-/.test(b.key) && (!filter || b.gruppe === filter));
  sicht.innerHTML = `<div class="in">${kopf('Bil<em>der.</em>', 'Jedes Foto der Startseite. Klicken Sie auf ein Bild, wählen Sie ein neues und bestätigen Sie. Startbilder werden beim Tausch automatisch zugeschnitten und abgedunkelt, damit Titel und Hausleiste lesbar bleiben; alle anderen Fotos bekommen das Seitenverhältnis des bisherigen.')}
    <div class="filter">${gruppen.map(([d, n]) => `<button type="button" data-f="${h(d)}" class="${(filter || '') === d ? 'an' : ''}">${h(n)}</button>`).join('')}</div>
    <div class="mauer">${liste.map(b => `<button class="bk" type="button" data-key="${h(b.key)}" title="${h(b.sonder || '')}"><img src="${bildadr(b.neu || b.key)}" alt="" loading="lazy">${b.neu ? '<i>Getauscht</i>' : ''}<span>${h(b.sonder)}</span><em>Tauschen</em></button>`).join('')}</div></div>`;
  sicht.querySelector('.in').addEventListener('click', ev => {
    const f = ev.target.closest('[data-f]'), k = ev.target.closest('[data-key]');
    if (f) location.hash = '#/bilder' + (f.dataset.f ? '/' + encodeURIComponent(f.dataset.f) : '');
    if (k) bildFenster(k.dataset.key);
  });
}
function bildFenster(key, neu) {
  const b = Z.bilder.find(x => x.key === key);
  if (!b) return;
  const jetzt = b.neu || b.key, auftakt = /^auf-/.test(key);
  fenster(`<h2>Bild <em>tauschen.</em></h2>
    ${neu ? `<div class="vn vn--bild"><div class="alt"><span>Bisher</span><img src="${bildadr(jetzt, 's')}" alt=""></div><svg viewBox="0 0 22 22"><path d="M3 11h15M13 6l5 5-5 5"/></svg><div class="neu"><span>Neu</span><img src="${h(neu.adresse || bildadr(neu.key, 's'))}" alt=""></div></div>
      <p>Das neue Bild ersetzt das bisherige: <b>${h(b.sonder)}</b>.${neu.hinweis ? ' ' + h(neu.hinweis) : ''}</p>
      <div class="fenster__kn"><button class="kn kn--linie" type="button" data-zu>Abbrechen</button>${PROBE ? '' : '<button class="kn kn--linie" type="button" id="f-anders">Anderes Bild</button>'}<button class="kn" type="button" id="f-ok">Bild übernehmen</button></div>`
    : `<div class="bz"><div class="bz__b"><img src="${bildadr(jetzt, 's')}" alt=""></div>
      <div><p style="margin:0"><b>${h(b.sonder)}</b></p>${b.haus ? `<p class="leise" style="margin-top:6px;font-size:13.5px">Bisher: ${h(b.haus)}${b.was ? ', ' + h(b.was) : ''}</p>` : ''}
        <p class="hinweis" style="margin-top:14px">${auftakt ? 'Ein neues Startbild wird in dieselben Masse gebracht, unten abgedunkelt und fürs Handy hoch zugeschnitten. Am besten ein Querformat mit mindestens 2400 Pixeln Breite, das Haus von aussen.' : key === 'schluss' ? 'Das Schlussbild wird in dieselben Masse gebracht und abgedunkelt, damit der Satz darauf lesbar bleibt. Querformat ab 2400 Pixeln.' : 'Ein neues Foto bekommt dasselbe Seitenverhältnis wie das bisherige, damit nichts aus dem Rahmen fällt.'}</p>
        ${PROBE ? '<p class="hinweis" style="margin-top:12px">In der Probe-Fassung wählen Sie aus den Fotos der Seite; eigene Fotos laden Sie im echten Empfang hoch.</p>' : '<div class="ablage" id="f-ablage" tabindex="0" role="button" style="margin-top:16px"><b>Neues Bild wählen</b><span>oder hierher ziehen · JPG, PNG, WebP</span></div>'}
        <p style="margin-top:14px;text-align:center"><button class="link" type="button" id="f-vorrat">Aus den Fotos der Seite wählen</button></p>
        ${b.neu ? '<p style="margin-top:14px;text-align:center"><button class="link" type="button" id="f-alt">Ursprüngliches Bild zurückholen</button></p>' : ''}</div></div>`}`, true);
  const sende = async (wert, titel) => {
    if (await tun({ art: 'bild', key, neu: wert }, { titel, text: b.sonder, id: 'b:' + key, zurueck: { art: 'bild', key, neu: b.neu || null } })) { fensterZu(); neuZeichnen(); }
  };
  if (neu) {
    $('#f-ok').addEventListener('click', () => sende(neu.key, 'Bild getauscht'));
    const anders = $('#f-anders'); if (anders) anders.addEventListener('click', async () => { const r = await hochladen(key); if (r) bildFenster(key, r); });
  } else {
    const ab = $('#f-ablage'); if (ab) ablage(ab, key, r => bildFenster(key, r));
    const alt = $('#f-alt'), vorrat = $('#f-vorrat');
    if (alt) alt.addEventListener('click', () => sende(null, 'Ursprüngliches Bild zurückgeholt'));
    if (vorrat) vorrat.addEventListener('click', () => bildWahl(k => { if (k !== key) bildFenster(key, { key: k, adresse: bildadr(k, 's') }); }, key));
  }
}

// ---------------------------------------------------------------- Änderungen
function aenderungenS() {
  const cs = nachZeit(), n = cs.length;
  const pfeil = '<svg viewBox="0 0 22 22"><path d="M3 11h15M13 6l5 5-5 5"/></svg>';
  const kern = c => {
    if (c.art === 'bild') return `<div class="vn"><div class="alt"><span>Vorher</span><img src="${h(c.vorher)}" alt=""></div>${pfeil}<div class="neu"><span>Nachher</span><img src="${h(c.nachher)}" alt=""></div></div>`;
    if (c.art === 'liste') return `<ul class="punkte">${c.punkte.map(p => `<li class="${p.was}"><i>${{ neu: 'Neu', weg: 'Entfernt', anders: 'Geändert', reihe: 'Sortiert' }[p.was]}</i><div><b>${h(p.name)}</b> <span>${h(p.text)}</span></div></li>`).join('')}</ul>`;
    if (c.art === 'google') return c.teile.map(t => `<div class="vn"><div class="alt"><span>${h(t.feld)} vorher</span>${h(t.vorher) || '–'}</div>${pfeil}<div class="neu"><span>${h(t.feld)} nachher</span>${h(t.nachher)}</div></div>`).join('');
    return `<div class="vn"><div class="alt"><span>Vorher</span>${h(c.vorher) || '–'}</div>${pfeil}<div class="neu"><span>Nachher</span>${h(c.nachher) || '–'}</div></div>`;
  };
  const karteC = c => `<article class="aend" data-id="${h(c.id)}"><div class="aend__z">${ik(ARTZ[c.art])}</div>
    <div><h3>${h(c.titel)}<small>${h(c.ort || '')}${c.zeit ? ' · gespeichert ' + vor(c.zeit) : ''}</small></h3>${kern(c)}
      ${c.verwaist ? '<p class="hinweis" style="margin-top:14px">Diese Stelle gibt es auf der Seite nicht mehr. Die Änderung hat deshalb keine Wirkung.</p>' : ''}
      ${c.anzahl > 1 ? `<div class="wo"><span>${mal(c.anzahl, 'Stelle', 'Stellen')} auf der Seite</span></div>` : ''}</div>
    <div class="aend__r">${c.stellen.length ? '<button class="kn kn--klein" type="button" data-akt="sehen">Vorher/Nachher ansehen</button>' : ''}<button class="link" type="button" data-akt="weg">Zurücknehmen</button></div></article>`;
  sicht.innerHTML = `<div class="in">${kopf('Ände<em>rungen.</em>', n ? 'Das ist im Entwurf gespeichert. Schauen Sie sich jede Stelle vorher und nachher an. Erst mit „Veröffentlichen“ sehen es Ihre Gäste.' : '',
      n ? `<button class="kn kn--linie" type="button" data-akt="alles">Alles zurücknehmen</button><button class="kn" type="button" data-akt="raus">${mal(n, 'Änderung', 'Änderungen')} veröffentlichen</button>` : '')}
    ${n ? cs.map(karteC).join('') : `<div class="leerbild">${ik('marke')}<b>Nichts offen.</b><p>Alles, was Sie geändert haben, steht auf der Startseite.</p><a class="kn" href="#/uebersicht">Zur Übersicht</a></div>`}</div>`;
  sicht.querySelector('.in').addEventListener('click', ev => {
    const b = ev.target.closest('[data-akt]');
    if (!b || !['sehen', 'weg'].includes(b.dataset.akt)) return;
    ev.stopPropagation();
    aktAenderung(b.dataset.akt, b.closest('.aend').dataset.id);
  });
}
function veroeffentlichen() {
  const cs = nachZeit(), n = cs.length;
  if (!n) return;
  fenster(`<h2>Auf die Startseite <em>stellen?</em></h2><p>${mal(n, 'Änderung wird', 'Änderungen werden')} sofort für alle sichtbar. Jeden früheren Stand können Sie im Verlauf zurückholen.</p>
    <ul class="quittliste">${cs.map(c => `<li>${ik(ARTZ[c.art])}<span>${h(c.satz)}</span></li>`).join('')}</ul>
    <label class="feld" style="margin-top:18px"><span>Notiz für den Verlauf (freiwillig)</span><input id="f-notiz" maxlength="200" placeholder="z. B. Saison 2027 eingetragen"></label>
    <div class="fenster__kn"><button class="kn kn--linie" type="button" data-zu>Abbrechen</button><button class="kn" type="button" id="f-ok">Jetzt veröffentlichen</button></div>`);
  $('#f-ok').addEventListener('click', async ev => {
    ev.target.disabled = true;
    ev.target.textContent = 'Wird veröffentlicht …';
    try {
      Z = await api('veroeffentlichen', { notiz: $('#f-notiz').value });
      rand();
      leiste();
      fenster(`<div class="erfolg"><i>${HAKEN}</i><h2>Veröffent<em>licht.</em></h2><p>Die Startseite zeigt jetzt den neuen Stand. Das ist live:</p></div>
        <ul class="quittliste ok">${cs.map(c => `<li><i>${HAKEN}</i><span>${h(c.satz)}</span></li>`).join('')}</ul>
        <div class="fenster__kn"><a class="kn kn--linie" href="/live/index.html" target="_blank" rel="noopener">Website ansehen</a><button class="kn" type="button" data-zu>Fertig</button></div>`);
      if (W) neuLaden({}); else zeige(true);
    } catch (e) { sag(e.message, true); ev.target.disabled = false; ev.target.textContent = 'Jetzt veröffentlichen'; }
  });
}

// ---------------------------------------------------------------- Hinweis für Gäste
function hinweisS() {
  const hw = Z.hinweis, aktiv = hw.an && hw.text;
  const ziele = [['', 'Kein Link'], ['#carlton', 'Kapitel Carlton-Europe'], ['#doldenhorn', 'Kapitel Waldhotel Doldenhorn'], ['#ruedihus', 'Kapitel Landgasthof Ruedihus'], ['#gasterntal', 'Kapitel Berghotel Gasterntal'], ['#kontakt', 'Kontakt im Fuss']];
  const eigen = hw.link && !ziele.some(z => z[0] === hw.link);
  sicht.innerHTML = `<div class="in">${kopf('Hinweis für <em>Gäste.</em>', 'Ein Band unten am Bildschirm: Saisonschluss, Betriebsferien, Feiertage. Sie können es zeitlich begrenzen, dann verschwindet es von selbst.')}
    <section class="blatt" style="max-width:760px"><div class="form1" style="margin-top:0">
      ${schalter('hw-an', hw.an, 'Hinweis zeigen')}
      <label class="feld"><span>Text</span><textarea id="hw-text" rows="2" maxlength="300" placeholder="z. B. Das Berghotel Gasterntal ist bis zum 13. Mai in Winterpause. Die drei anderen Häuser sind für Sie da.">${h(hw.text)}</textarea></label>
      <div class="raster r-2"><label class="feld"><span>Zeigen ab (freiwillig)</span><input id="hw-von" type="date" value="${h(hw.von)}"></label><label class="feld"><span>Zeigen bis (freiwillig)</span><input id="hw-bis" type="date" value="${h(hw.bis)}"></label></div>
      <div class="raster r-2"><label class="feld"><span>Link (freiwillig)</span><select id="hw-link">${ziele.map(([v, n]) => `<option value="${h(v)}"${hw.link === v ? ' selected' : ''}>${h(n)}</option>`).join('')}<option value="__eigen"${eigen ? ' selected' : ''}>Eigene Adresse (https://…)</option></select><input id="hw-eigen" inputmode="url" placeholder="https://…" value="${eigen ? h(hw.link) : ''}" style="margin-top:8px"${eigen ? '' : ' hidden'}></label><label class="feld"><span>Beschriftung des Links</span><input id="hw-lt" maxlength="60" value="${h(hw.linktext)}" placeholder="Mehr"></label></div>
      <div class="feld"><span>So sieht es aus</span><div class="hwvor${aktiv ? '' : ' aus'}" id="hw-vor"></div></div>
      <div class="sichern sichern--still offen"><i></i><span id="hw-stand"></span><button class="kn kn--klein" type="button" id="hw-ok">Speichern</button></div>
    </div></section></div>`;
  const linkWert = () => $('#hw-link').value === '__eigen' ? $('#hw-eigen').value.trim() : $('#hw-link').value;
  const vor_ = () => { const t = $('#hw-text').value.trim(), lt = $('#hw-lt').value.trim() || 'Mehr', an = $('#hw-an').checked; $('#hw-eigen').hidden = $('#hw-link').value !== '__eigen'; $('#hw-vor').className = 'hwvor' + (an && t ? '' : ' aus'); $('#hw-vor').innerHTML = `${ik('glocke')}<p>${h(t || 'Ihr Hinweis …')}${linkWert() ? ` <a>${h(lt)}</a>` : ''}</p>`; $('#hw-stand').textContent = an && t ? 'Wird unten auf der Seite gezeigt' : 'Ausgeschaltet, nichts zu sehen'; };
  vor_();
  sicht.querySelector('.in').addEventListener('input', vor_);
  $('#hw-ok').addEventListener('click', async () => {
    const neu = { an: $('#hw-an').checked, text: $('#hw-text').value, von: $('#hw-von').value, bis: $('#hw-bis').value, link: linkWert(), linktext: $('#hw-lt').value };
    if (await tun({ art: 'hinweis', hinweis: neu }, { titel: neu.an && neu.text.trim() ? 'Hinweis gespeichert' : 'Hinweis ausgeschaltet', text: neu.text.trim().slice(0, 80), id: 'h:hinweis', zurueck: { art: 'hinweis', hinweis: hw } })) neuZeichnen();
  });
}

// ---------------------------------------------------------------- Google-Texte und Bildbeschreibungen
function googleS() {
  const datei = 'index.html', so = Z.seo[datei], sd = Z.seiten.find(s => s.datei === datei);
  const alts = Object.entries(Z.alt);
  sicht.innerHTML = `<div class="in">${kopf('Google <em>& Co.</em>', 'Was Google und andere Suchmaschinen über die Startseite zeigen, und die Beschreibung jedes Bildes für Menschen, die nicht sehen können.')}
    <section class="blatt" style="max-width:820px"><h3>Bei Google: ${h(sd ? sd.name : datei)}</h3><div class="form1" style="margin-top:16px">
      <label class="feld"><span>Titel (so steht es im Browser-Reiter und bei Google)</span><input id="se-titel" maxlength="120" value="${h(so.eigen.titel || '')}" placeholder="${h(so.titel)}"><small><span id="se-tz">${(so.eigen.titel || so.titel).length}</span> Zeichen, bis 60 sind ideal</small></label>
      <label class="feld"><span>Beschreibung (die zwei Zeilen unter dem Titel)</span><textarea id="se-beschr" rows="3" maxlength="320" placeholder="${h(so.beschr)}">${h(so.eigen.beschr || '')}</textarea><small><span id="se-bz">${(so.eigen.beschr || so.beschr).length}</span> Zeichen, bis 155 sind ideal · leer lassen heisst: Vorgabe behalten</small></label>
      <div class="gvor"><b id="gv-t">${h(so.eigen.titel || so.titel)}</b><i>familie-maeder.ch</i><p id="gv-b">${h(so.eigen.beschr || so.beschr)}</p></div>
      <div class="sichern sichern--still offen"><i></i><span>Google-Text</span><button class="kn kn--klein" type="button" id="se-ok">Speichern</button></div></div></section>
    <h2 class="zw">Bildbeschreibungen<span>${String(alts.length).padStart(2, '0')}</span></h2>
    <section class="blatt" style="padding:4px 0">${alts.map(([k, a]) => `<div class="ware" data-alt="${h(k)}"><img src="${bildadr(k)}" alt=""><label class="feld"><span>Beschreibung${a.eigen ? ' <i class="marke rot">Im Entwurf geändert</i>' : ''}</span><input maxlength="200" value="${h(a.eigen || '')}" placeholder="${h(a.standard || 'Was ist auf dem Bild zu sehen?')}"></label><button class="kn kn--klein kn--linie" type="button" data-akt="alt-ok">Speichern</button></div>`).join('') || '<p class="gz leer">Keine Bilder gefunden.</p>'}</section></div>`;
  const wurzel = sicht.querySelector('.in');
  wurzel.addEventListener('input', () => { const t = $('#se-titel').value.trim() || so.titel, b = $('#se-beschr').value.trim() || so.beschr; $('#gv-t').textContent = t; $('#gv-b').textContent = b; $('#se-tz').textContent = t.length; $('#se-bz').textContent = b.length; });
  wurzel.addEventListener('click', async ev => {
    const b = ev.target.closest('[data-akt]');
    if (!b) return;
    if (b.dataset.akt === 'alt-ok') { const z = b.closest('[data-alt]'), k = z.dataset.alt, alt = Z.alt[k].eigen; if (await tun({ art: 'alt', key: k, text: $('input', z).value }, { titel: 'Bildbeschreibung gespeichert', text: $('input', z).value.trim().slice(0, 80) || 'Vorgabe', id: 'a:' + k, zurueck: { art: 'alt', key: k, text: alt } })) neuZeichnen(); }
  });
  $('#se-ok').addEventListener('click', async () => { if (await tun({ art: 'seo', datei, titel: $('#se-titel').value, beschr: $('#se-beschr').value }, { titel: 'Google-Text gespeichert', text: sd ? sd.name : datei, id: 'g:' + datei, zurueck: { art: 'seo', datei, titel: so.eigen.titel || '', beschr: so.eigen.beschr || '' } })) neuZeichnen(); });
}

// ---------------------------------------------------------------- Vergleich vorher / nachher
function vergleich(c, seiteDatei) {
  const stellen = c.stellen.length ? c.stellen : [];
  if (!stellen.length) return;
  V = { c, stellen, i: Math.max(0, seiteDatei ? stellen.findIndex(s => s.seite === seiteDatei) : 0), geraet: 'rechner', box: {}, seite: {} };
  const v = $('#vergleich');
  v.hidden = false;
  v.innerHTML = `<div class="vgl__k"><button class="rund" type="button" data-akt="zu" title="Schliessen" aria-label="Schliessen">${SYM.zu}</button>
      <h2>${h(c.titel)}<small>${h(c.ort || '')}</small></h2>
      <select id="v-seite" aria-label="Seite" hidden>${c.seiten.map(s => `<option value="${h(s.datei)}">${h(s.name)}</option>`).join('')}</select>
      <div class="vgl__nav"><button class="rund" type="button" data-akt="vor" aria-label="Vorherige Stelle">${SYM.links}</button><span id="v-zahl"></span><button class="rund" type="button" data-akt="nach" aria-label="Nächste Stelle">${SYM.rechts}</button>
        <button class="rund an" type="button" data-g="rechner" aria-label="Wie am Rechner">${SYM.rechner}</button><button class="rund" type="button" data-g="handy" aria-label="Wie am Handy">${SYM.handy}</button></div></div>
    <div class="vgl__b" id="v-b">${['vorher', 'entwurf'].map(p => `<div class="vgl__s"><span>${p === 'vorher' ? 'Vorher <b>so steht es jetzt auf der Seite</b>' : 'Nachher <b>so sieht es nach dem Veröffentlichen aus</b>'}</span>
      <div class="vgl__r"><iframe id="v-${p}" title="${p === 'vorher' ? 'Vorher' : 'Nachher'}"></iframe><div class="vgl__m" id="vm-${p}"></div><div class="vgl__leer" id="vl-${p}" hidden></div></div></div>`).join('')}</div>`;
  v.onclick = ev => {
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.akt === 'zu') return vglZu();
    if (b.dataset.akt === 'vor') V.i = (V.i - 1 + V.stellen.length) % V.stellen.length;
    else if (b.dataset.akt === 'nach') V.i = (V.i + 1) % V.stellen.length;
    else if (b.dataset.g) {
      V.geraet = b.dataset.g;
      $('#v-b').classList.toggle('handy', V.geraet === 'handy');
      $$('.vgl__r', v).forEach(r => r.classList.toggle('handy', V.geraet === 'handy'));
      $$('[data-g]', v).forEach(x => x.classList.toggle('an', x === b));
      V.passe.forEach(f => f());
      setTimeout(() => ['vorher', 'entwurf'].forEach(vglMarke), 350);
      return;
    }
    else return;
    vglLade();
  };
  V.passe = [];
  ['vorher', 'entwurf'].forEach(p => {
    const fr = $('#v-' + p);
    V.passe.push(passe(fr, fr.parentNode, 1280));
    fr.addEventListener('load', () => {
      const d = fr.contentDocument;
      if (!d || !d.body || !V) return;
      V.box[p] = richte(d, false).an;
      d.documentElement.classList.add('kein-vorhang');
      d.addEventListener('click', ev => { if (ev.target.closest && ev.target.closest('a[href]')) ev.preventDefault(); }, true);
      d.defaultView.addEventListener('wheel', () => requestAnimationFrame(() => { const a = $('#v-' + (p === 'vorher' ? 'entwurf' : 'vorher')); try { a.contentWindow.scrollTo(0, d.defaultView.scrollY); vglRahmen(); } catch (e) {} }), { passive: true });
      d.defaultView.addEventListener('scroll', vglRahmen, { passive: true });
      vglMarke(p);
    });
  });
  vglLade();
}
function vglZu() { V = null; const v = $('#vergleich'); v.hidden = true; v.innerHTML = ''; }
function vglFinde(d, st, p) {
  if (st.oben) return null;
  if (st.b) return d.querySelector(`img[data-b="${st.b}"][data-bn="${st.n}"]`);
  const genau = () => d.querySelector(`[data-e="${st.h}"][data-en="${st.n}"]`);
  if (V.c.art !== 'liste' || p === (st.vorher ? 'vorher' : 'entwurf')) return genau();
  return $$(`[data-e="${st.h}"]`, d).find(e => e.textContent.trim() === st.t) || null;
}
function vglRahmen() {
  if (!V) return;
  ['vorher', 'entwurf'].forEach(p => { const el = V.el && V.el[p]; if (el) rahme(V.box[p], el); });
}
function vglMarke(p) {
  if (!V) return;
  const fr = $('#v-' + p), d = fr.contentDocument, st = V.stellen[V.i], leer = $('#vl-' + p), m = $('#vm-' + p);
  if (!d || !d.body || V.seite[p] !== st.seite || d.readyState === 'loading') return;
  V.el = V.el || {};
  let el = vglFinde(d, st, p);
  leer.hidden = true;
  if (st.oben) { d.defaultView.scrollTo(0, 0); rahme(V.box[p], null); m.innerHTML = ''; V.el[p] = null; return; }
  if (el) {
    zeig(el);
    el = el.closest('.wahl,.sitz,.fh') || el;
    el.scrollIntoView({ block: 'center', inline: 'center' });
    if (!rahme(V.box[p], el)) { leer.hidden = false; leer.textContent = 'Diese Stelle ist auf der Seite gerade nicht zu sehen (zum Beispiel im Buchen-Fenster).'; }
  } else {
    rahme(V.box[p], null);
    leer.hidden = false;
    leer.textContent = p === 'vorher' ? 'Hier stand das vorher noch nicht.' : 'Hier steht es nach dem Veröffentlichen nicht mehr.';
  }
  V.el[p] = el;
  const hoehe = d.documentElement.scrollHeight || 1;
  m.innerHTML = V.stellen.map((s, i) => {
    if (s.seite !== st.seite) return '';
    const e = i === V.i ? el : vglFinde(d, s, p);
    const r = e && e.getBoundingClientRect();
    return r && (r.width || r.height) ? `<i class="${i === V.i ? 'an' : ''}" style="top:${((r.top + d.defaultView.scrollY) / hoehe * 100).toFixed(2)}%"></i>` : '';
  }).join('');
}
function vglLade() {
  const st = V.stellen[V.i];
  $('#v-zahl').textContent = `Stelle ${V.i + 1} von ${V.stellen.length}`;
  ['vorher', 'entwurf'].forEach(p => {
    const fr = $('#v-' + p);
    if (V.seite[p] !== st.seite) { V.seite[p] = st.seite; V.el = {}; fr.src = `/${p}/${encodeURIComponent(st.seite)}?nomotion`; } else vglMarke(p);
  });
}

// ---------------------------------------------------------------- Verlauf und Zugang
function verlauf() {
  const vs = Z.verlauf;
  sicht.innerHTML = `<div class="in">${kopf('Ver<em>lauf.</em>', vs.length ? 'Jede Veröffentlichung wird aufgehoben. Holen Sie einen früheren Stand zurück, liegt er zuerst als Entwurf bereit. Sie prüfen ihn und veröffentlichen dann.' : '')}
    ${vs.length ? `<ol class="lauf">${vs.map((v, i) => `<li><div class="blatt"><div><time>${v.anfang ? 'Ursprünglicher Stand' : datum(v.zeit)}</time>
      <p>${v.anfang ? 'So war die Startseite, bevor im Empfang zum ersten Mal etwas geändert wurde.' : (v.notiz ? `<b>${h(v.notiz)}</b> · ` : '') + h(v.punkte.slice(0, 6).join(' · ')) + (v.punkte.length > 6 ? ` und ${v.punkte.length - 6} weitere` : '')}</p></div>
      ${i === 0 ? '<span class="mono leise">Das ist der Stand der Seite</span>' : `<button class="kn kn--klein kn--linie" type="button" data-id="${h(v.id)}">Diesen Stand zurückholen</button>`}</div></li>`).join('')}</ol>`
    : `<div class="leerbild">${ik('verlauf')}<b>Noch nichts veröffentlicht.</b><p>Sobald Sie zum ersten Mal etwas veröffentlichen, finden Sie hier jeden Stand der Startseite und können ihn zurückholen.</p></div>`}</div>`;
  sicht.querySelector('.in').addEventListener('click', ev => {
    const b = ev.target.closest('[data-id]');
    if (!b) return;
    frage('Stand <em>zurückholen?</em>', 'Der frühere Stand wird als Entwurf geladen. Was Sie gerade an unveröffentlichten Änderungen haben, wird dabei ersetzt. Auf der Seite ändert sich erst etwas, wenn Sie veröffentlichen.', 'Zurückholen', async () => {
      Z = await api('zurueck', { id: b.dataset.id });
      sag('Der frühere Stand liegt als Entwurf bereit.');
      location.hash = '#/aenderungen';
    });
  });
}
function zugang() {
  if (PROBE) {
    sicht.innerHTML = `<div class="in">${kopf('Zu<em>gang.</em>', 'Die Probe-Fassung braucht kein Passwort. Jeder Besucher arbeitet in seiner eigenen Kopie, die echte Startseite bleibt, wie sie ist.')}
      <section class="blatt" style="max-width:640px"><h3>Im echten Empfang</h3><p style="margin-top:12px;color:rgba(15,22,32,.7)">Dort legt Ihre Familie beim ersten Öffnen ein eigenes Passwort fest und kann es hier jederzeit ändern. Nach zwölf Stunden meldet es Sie von selbst ab.</p></section></div>`;
    return;
  }
  if (OFFEN) {
    sicht.innerHTML = `<div class="in">${kopf('Zu<em>gang.</em>', 'Der Empfang ist gerade ohne Passwort offen. Sobald Sie wirklich damit arbeiten, wird der Schutz eingeschaltet.')}
      <section class="blatt" style="max-width:640px"><h3>Offen</h3><p style="margin-top:12px;color:rgba(15,22,32,.7)">Jeder, der die Adresse kennt, kann gerade ändern und veröffentlichen. Zum Einschalten des Schutzes sagen Sie Robert Bescheid.</p></section></div>`;
    return;
  }
  sicht.innerHTML = `<div class="in">${kopf('Zu<em>gang.</em>', 'Der Empfang ist mit einem Passwort geschützt. Nach zwölf Stunden meldet er Sie von selbst ab.')}
    <div class="raster r-2"><section class="blatt"><h3>Passwort ändern</h3><form id="z-form" style="display:grid;gap:14px;margin-top:18px" autocomplete="off">
      <label class="feld"><span>Bisheriges Passwort</span><input type="password" name="alt" autocomplete="current-password" required></label>
      <label class="feld"><span>Neues Passwort</span><input type="password" name="neu" autocomplete="new-password" required minlength="10"><small>Mindestens 10 Zeichen</small></label>
      <label class="feld"><span>Noch einmal</span><input type="password" name="neu2" autocomplete="new-password" required></label>
      <div class="fehler" role="alert" style="text-align:left"></div><div><button class="kn" type="submit">Passwort ändern</button></div></form></section>
    <section class="blatt"><h3>Abmelden</h3><p style="margin:14px 0 20px;color:rgba(15,22,32,.7)">An einem fremden Rechner melden Sie sich am besten ab, wenn Sie fertig sind. Entwürfe bleiben erhalten.</p><button class="kn kn--linie" type="button" data-akt="abmelden">Abmelden</button></section></div></div>`;
  const f = $('#z-form');
  f.addEventListener('submit', async ev => {
    ev.preventDefault();
    const fe = $('.fehler', f);
    fe.textContent = '';
    if (f.neu.value !== f.neu2.value) { fe.textContent = 'Die beiden neuen Eingaben sind nicht gleich.'; return; }
    try { await api('passwort', { alt: f.alt.value, neu: f.neu.value }); f.reset(); sag('Das Passwort ist geändert.'); } catch (e) { fe.textContent = e.message; }
  });
}

// ---------------------------------------------------------------- Zahlen: was Gäste auf der Startseite tun (keine Kekse, keine Adressen, keine Namen)
async function zahlenS() {
  sicht.innerHTML = `<div class="in">${kopf('Zah<em>len.</em>', 'Was Gäste auf der Startseite tun: Besuche, welches Haus sie in der Hausleiste wählen, zu welchem Haus sie weitergehen, wie oft gebucht wird. Die letzten 30 Tage.')}<div class="leerbild">${ik('zahlen')}<b>Einen Moment.</b><p>Die Zahlen werden geladen.</p></div></div>`;
  let ev;
  try { const r = await fetch('/api/zahlen', { cache: 'no-store' }); if (!r.ok) throw new Error(r.status); ev = (await r.json()).ereignisse || []; }
  catch (e) { sicht.querySelector('.in').innerHTML = kopf('Zah<em>len.</em>', '') + `<div class="leerbild">${ik('zahlen')}<b>Gerade nicht erreichbar.</b><p>Die Zählung antwortet nicht. Alles andere im Empfang geht.</p></div>`; return; }
  const n = t => ev.filter(e => e.t === t).length;
  const zaehle = (L, f) => { const m = {}; L.forEach(e => { const k = f(e); if (k) m[k] = (m[k] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  let land = k => k; try { const dn = new Intl.DisplayNames(['de-CH'], { type: 'region' }); land = k => { try { return dn.of(k); } catch (e) { return k; } }; } catch (e) {}
  const liste = (titel, L, name, leer) => { const max = L.length ? L[0][1] : 1; return `<section class="zrang"><h3>${titel}</h3>${L.length ? L.slice(0, 8).map(([k, v]) => `<div class="zrang__z"><span>${h(name ? name(k) : k)}</span><i style="--w:${Math.max(4, Math.round(v / max * 100))}%"></i><b>${v}</b></div>`).join('') : `<p class="zrang__leer">${leer}</p>`}</section>`; };
  const tage = []; for (let i = 13; i >= 0; i--) tage.push(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));
  const proTag = tage.map(t => ev.filter(e => e.t === 'seite' && String(e.zeit).slice(0, 10) === t).length), maxT = Math.max(1, ...proTag);
  sicht.querySelector('.in').innerHTML = kopf('Zah<em>len.</em>', 'Die letzten 30 Tage. Gezählt wird ohne Kekse und ohne Adressen; Prüfläufe zählen nicht mit.') +
    `<section class="zkacheln"><div><b>${n('seite')}</b><span>Besuche der Startseite</span></div><div><b>${n('haus')}</b><span>Häuser in der Hausleiste gewählt</span></div><div><b>${n('zum')}</b><span>Zu einem Haus weitergegangen</span></div><div><b>${n('buchen')}</b><span>Buchen und Anfragen abgeschickt</span></div></section>
    <section class="zrang"><h3>Besuche, die letzten 14 Tage</h3><div class="ztage">${proTag.map((v, i) => `<div title="${v}"><i style="--h:${Math.max(2, Math.round(v / maxT * 100))}%"></i><span>${new Date(tage[i]).getDate()}.</span></div>`).join('')}</div></section>
    <div class="zrang-raster">
    ${liste('In der Hausleiste gewählt', zaehle(ev.filter(e => e.t === 'haus' && e.k), e => e.k), hausName, 'Noch kein Haus von Hand gewählt.')}
    ${liste('Zu welchem Haus es weiterging', zaehle(ev.filter(e => e.t === 'zum' && e.k), e => e.k), hausName, 'Noch niemand zu einem Haus weitergegangen.')}
    ${liste('Gebucht oder angefragt', zaehle(ev.filter(e => e.t === 'buchen' && e.k), e => e.k), hausName, 'Noch keine Buchung über die Startseite.')}
    ${liste('Länder', zaehle(ev.filter(e => e.t === 'seite'), e => e.l), land, 'Noch kein Land erkannt.')}
    </div>`;
}

// ---------------------------------------------------------------- Fenster
function fenster(html, breit) {
  const f = $('#fenster');
  f.hidden = false;
  f.oninput = f.onclick = f.bei = null;
  $$('.quitt').forEach(x => { if (!html.includes('class="erfolg"')) x.remove(); });
  f.innerHTML = `<div class="fenster__k${breit ? ' breit' : ''}" role="dialog" aria-modal="true"><button class="rund zu" type="button" data-zu aria-label="Schliessen">${SYM.zu}</button>${html}</div>`;
  const erstes = $('input,button.kn', f);
  if (erstes) erstes.focus();
}
function fensterZu() { const f = $('#fenster'); f.hidden = true; f.innerHTML = ''; }
function frage(titel, text, knopf, tun) {
  fenster(`<h2>${titel}</h2><p>${text}</p><div class="fenster__kn"><button class="kn kn--linie" type="button" data-zu>Abbrechen</button><button class="kn" type="button" id="f-ja">${knopf}</button></div>`);
  $('#f-ja').addEventListener('click', async () => { try { await tun(); fensterZu(); } catch (e) { sag(e.message, true); } });
}
$('#fenster').addEventListener('click', ev => { if (ev.target.closest('[data-zu]')) fensterZu(); });
$('#lade').addEventListener('click', ev => { if (ev.target.id === 'lade') ladeZu(); });
addEventListener('keydown', ev => {
  if (ev.key !== 'Escape') return;
  if (!$('#fenster').hidden) fensterZu(); else if (V) vglZu(); else if (!$('#lade').hidden) ladeZu();
});
document.addEventListener('click', async ev => {
  const b = ev.target.closest('[data-akt]');
  if (!b) return;
  const akt = b.dataset.akt, imLade = b.closest('#lade');
  if (akt === 'abmelden') { try { await api('abmelden', {}); } catch (e) {} Z = null; ladeZu(); tor('an'); }
  if (akt === 'lade') { if ($('#lade').hidden) lade(); else ladeZu(); }
  if (akt === 'ladezu') ladeZu();
  if (akt === 'raus' || akt === 'alles') aktAenderung(akt);
  if (imLade && (akt === 'sehen' || akt === 'weg')) aktAenderung(akt, b.closest('[data-id]').dataset.id);
  if (akt === 'geraet' && W) {
    $('#w-buehne').classList.toggle('handy', b.dataset.g === 'handy');
    W.passe();
    $$('[data-akt="geraet"]').forEach(x => x.classList.toggle('an', x === b));
    setTimeout(() => { if (W && W.sel) rahme(W.an, W.sel.el); }, 300);
  }
});
const SICHTEN = { uebersicht, seite, seiten: seite, haeuser: haeuserS, angaben: angabenS, familie: familieS, bilder, hinweis: hinweisS, google: googleS, zahlen: zahlenS, aenderungen: aenderungenS, verlauf, zugang, pruefung: () => location.replace('pruefung.html') };

(async () => {
  try {
    const s = await api('status');
    OFFEN = !!s.offen;
    PROBE = !!s.probe;
    NAME = s.name || NAME;
    if (s.offen) await laden(); else if (!s.eingerichtet) tor('neu'); else if (!s.angemeldet) tor('an'); else await laden();
  } catch (e) {
    document.body.insertAdjacentHTML('beforeend', `<div class="tor" style="display:grid"><div class="tor__k"><h1>Der Empfang <em>startet nicht.</em></h1><p>${h(e.message)}</p>
      <div style="display:grid;gap:12px;margin-top:22px"><a class="kn kn--breit" href="pruefung.html">Prüfung öffnen</a><button class="link" type="button" onclick="location.reload()" style="justify-self:center">Noch einmal versuchen</button></div></div></div>`);
  }
})();
})();
