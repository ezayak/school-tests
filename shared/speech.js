// Speech games (Мовлення): letters, syllables, words, positions and sentences for a child with aphasia.
// Everything is said aloud with the device voice (Kit.voice); a recording (snd) replaces the voice for one item.
// <body data-view="list">  → a group page (window.SPEECH_LIST from list.js: one card per game),
// <body data-view="cards"> → the ABC cards (window.SPEECH_LETTERS from ../letters.js): tap a card → the letter, a pause, the word.
(function () {
  "use strict";
  const { esc } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "list";
  const HOME = "../../../index.html";
  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem(k);
        return v === null ? d : v;
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch (e) {}
    },
  };

  /* ================= list of games ================= */
  if (view === "list") {
    const L = window.SPEECH_LIST;
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">← Усі ігри</a><span class="eyebrow">Мовлення</span></div>
    <h1 class="hero-title"><span class="p">${esc(L.title)}</span></h1>
    <p class="howto">${esc(L.intro || "")}</p>
  </section>
  <div class="items">${L.items.map((it) => Kit.lessonCard(it, "Гра")).join("")}</div>
  <div class="soon">Нові ігри з’являться тут.</div>`;
    document.title = `${L.title} · Мовлення`;
    return;
  }

  /* ---------- voice: the device voice, or a recording ---------- */
  const D = window.SPEECH_LETTERS;
  const V = Kit.voice(D.lang);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let audio = null;
  function hush() {
    V.hush();
    if (audio) audio.pause();
    audio = null;
  }
  // a recording; ends when it has been played (or could not be played)
  function play(src) {
    return new Promise((res) => {
      const a = (audio = new Audio(src));
      a.onended = a.onerror = a.onpause = () => res();
      a.play().catch(() => res());
    });
  }
  const sound = (text, snd) => (snd ? play(snd) : V.say(text));

  // "[а]втобус" → the word with its letter in colour; plain() → "автобус"
  const kind = (it) => "sp-" + (it.k || "c");
  const wordHTML = (it) =>
    esc(it.w).replace(/\[(.+?)\]/, `<b class="${kind(it)}">$1</b>`);
  const plain = (w) => w.replace(/[[\]]/g, "");
  const letter = (it) => (it.up ? `${it.up} ${it.lo}` : it.lo);

  /* ================= ABC cards ================= */
  const K = "sp-" + D.lang + "-cards"; // the last card seen
  const N = D.items.length;
  let i = Math.min(N - 1, Math.max(0, +store.get(K, 0) || 0));
  let run = 0; // a newer tap stops what an older one was saying
  // the parent's layout «A · Card + letter panel»: the card on the left, all the letters on the right
  const icon = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  app.innerHTML = `<div class="sp-split">
    <div class="sp-side">
      <button type="button" class="sp-lcard" id="lcard"></button>
      <button type="button" class="sp-nav sp-prev" id="prev" aria-label="Попередня літера">${icon('<path d="M15 18l-6-6 6-6"/>')}</button>
      <button type="button" class="sp-nav sp-next" id="next" aria-label="Наступна літера">${icon('<path d="M9 6l6 6-6 6"/>')}</button>
      <button type="button" class="sp-snd" id="again" aria-label="Послухати ще раз">${icon('<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>')}</button>
    </div>
    <section class="card sp-panel">
      <div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="index.html">Абетка</a></div><span class="sp-count" id="count"></span></div>
      <h1 class="les-title">Абетка</h1>
      <div class="sp-abc" role="group" aria-label="Літери">${D.items.map((it, k) => `<button type="button" class="${kind(it)}" data-i="${k}">${esc(it.up || it.lo)}</button>`).join("")}</div>
      <p class="sp-warn" id="warn" hidden>На цьому пристрої може не бути українського голосу.</p>
    </section>
  </div>`;
  const lcard = document.getElementById("lcard");
  function show() {
    const it = D.items[i];
    lcard.className = `sp-lcard sp-p${i % 7}`;
    lcard.innerHTML = `<span class="sp-hd ${kind(it)}">${esc(letter(it))}</span><span class="sp-pic" aria-hidden="true">${esc(it.ic)}</span><span class="sp-wd">${wordHTML(it)}</span>`;
    lcard.setAttribute("aria-label", `${it.name}, ${plain(it.w)}`);
    document.getElementById("count").textContent = `${i + 1} / ${N}`;
    app
      .querySelectorAll("[data-i]")
      .forEach((b) => b.setAttribute("aria-pressed", +b.dataset.i === i));
    store.set(K, i);
  }
  // the letter, a pause, then the word
  async function speak() {
    const my = ++run;
    hush();
    // checked at a tap: the device lists its voices a moment after the page opens
    document.getElementById("warn").hidden = !V.ok || V.has();
    const it = D.items[i];
    await sound(it.name, it.snd);
    if (my !== run) return;
    await wait(900);
    if (my !== run) return;
    await sound(plain(it.w), it.wsnd);
  }
  function go(k) {
    i = (k + N) % N;
    show();
    speak();
  }
  document.getElementById("prev").onclick = () => go(i - 1);
  document.getElementById("next").onclick = () => go(i + 1);
  lcard.onclick = speak;
  document.getElementById("again").onclick = speak;
  app
    .querySelectorAll("[data-i]")
    .forEach((b) => (b.onclick = () => go(+b.dataset.i)));
  document.title = `Картки · Абетка`;
  show(); // no sound before the first tap: the browser would block it
})();
