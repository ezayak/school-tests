// Speech games (Мовлення): letters, syllables, words, positions and sentences for a child with aphasia.
// Everything is said aloud with the device voice (Kit.voice); a recording (snd) replaces the voice for one item.
// <body data-view="list">  → a group page (window.SPEECH_LIST from list.js: one card per game),
// <body data-view="cards"> → the ABC cards (window.SPEECH_LETTERS from ../letters.js): tap a card → the letter, a pause, the word.
// <body data-view="guess"> → guess the letter (../letters.js): the voice says a letter, tap it among 4.
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

  const icon = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const SPEAKER = icon(
    '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
  );
  // the links back (home, the ABC games), with something on the right (a counter)
  const top = (right) =>
    `<div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="index.html">Абетка</a></div>${right || ""}</div>`;
  const WARN = `<p class="sp-warn" id="warn" hidden>На цьому пристрої може не бути українського голосу.</p>`;
  // checked at a tap: the device lists its voices a moment after the page opens
  const warn = () =>
    (document.getElementById("warn").hidden = !V.ok || V.has());

  /* ================= ABC cards ================= */
  function cards() {
    const K = "sp-" + D.lang + "-cards"; // the last card seen
    const N = D.items.length;
    let i = Math.min(N - 1, Math.max(0, +store.get(K, 0) || 0));
    let run = 0; // a newer tap stops what an older one was saying
    // the parent's layout «A · Card + letter panel»: the card on the left, all the letters on the right
    app.innerHTML = `<div class="sp-split">
      <div class="sp-side">
        <button type="button" class="sp-lcard" id="lcard"></button>
        <button type="button" class="sp-nav sp-prev" id="prev" aria-label="Попередня літера">${icon('<path d="M15 18l-6-6 6-6"/>')}</button>
        <button type="button" class="sp-nav sp-next" id="next" aria-label="Наступна літера">${icon('<path d="M9 6l6 6-6 6"/>')}</button>
        <button type="button" class="sp-snd" id="again" aria-label="Послухати ще раз">${SPEAKER}</button>
      </div>
      <section class="card sp-panel">
        ${top('<span class="sp-count" id="count"></span>')}
        <h1 class="les-title">Абетка</h1>
        <div class="sp-abc" role="group" aria-label="Літери">${D.items.map((it, k) => `<button type="button" class="${kind(it)}" data-i="${k}">${esc(it.up || it.lo)}</button>`).join("")}</div>
        ${WARN}
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
      warn();
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
  }

  /* ================= guess the letter ================= */
  // The voice says a letter; tap it among 4. A right tap shows the letter's picture and word and says the word,
  // then the next letter comes. 10 letters a round; a star for each letter found at the first tap.
  // Two modes, switched at any time (saved on the device): «З картинкою» shows the letter's picture next to 🔊 as a hint,
  // «Без картинки» gives only the sound.
  function guess() {
    const ROUND = 10;
    const KP = "sp-" + D.lang + "-guess-pic";
    let pic = store.get(KP, "1") === "1";
    let q = [],
      n = 0,
      score = 0,
      miss = false,
      run = 0; // a newer sound stops what an older one was saying
    app.innerHTML = `<section class="card sp-game">
      ${top('<span class="sp-count" id="count"></span>')}
      <div class="sp-head"><h1 class="les-title">Вгадай літеру</h1>
        <div class="seg" role="group" aria-label="Підказка"><button type="button" id="pic-1" data-pic="1">🖼️ З картинкою</button><button type="button" id="pic-0" data-pic="0">🔊 Без картинки</button></div></div>
      <div class="sp-stage" id="stage"></div>
      ${WARN}
    </section>`;
    const stage = document.getElementById("stage");
    const count = document.getElementById("count");
    const tally = () =>
      (count.textContent = `${n + 1} / ${q.length} · ⭐ ${score}`);
    document.title = "Вгадай літеру · Абетка";
    function mode() {
      app
        .querySelectorAll("[data-pic]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", b.dataset.pic === (pic ? "1" : "0")),
        );
      const h = document.getElementById("hint");
      if (h) h.hidden = !pic;
    }
    app.querySelectorAll("[data-pic]").forEach(
      (b) =>
        (b.onclick = () => {
          pic = b.dataset.pic === "1";
          store.set(KP, pic ? "1" : "0");
          mode();
        }),
    );
    mode();
    function begin() {
      stage.innerHTML = `<p class="sp-hint">Послухай літеру і натисни на неї.</p>
        <button type="button" class="btn big" id="go">▶ Почати</button>`;
      document.getElementById("go").onclick = start; // the first tap also lets the browser speak
    }
    function start() {
      q = Kit.shuf(D.items).slice(0, ROUND);
      n = score = 0;
      ask();
    }
    async function say(text, snd) {
      const my = ++run;
      hush();
      warn();
      await sound(text, snd);
      return my === run;
    }
    function ask() {
      if (n >= q.length) return end();
      miss = false;
      const it = q[n];
      const opts = Kit.shuf([
        it,
        ...Kit.shuf(D.items.filter((x) => x !== it)).slice(0, 3),
      ]);
      tally();
      stage.innerHTML = `<div class="sp-say" id="say"><button type="button" class="sp-snd sp-listen" id="listen" aria-label="Послухати ще раз">${SPEAKER}</button><span class="sp-fpic sp-hintpic" id="hint" aria-hidden="true"${pic ? "" : " hidden"}>${esc(it.ic)}</span></div>
        <div class="sp-choices">${opts.map((o, k) => `<button type="button" class="sp-choice ${kind(o)}" data-k="${k}">${esc(o.up || o.lo)}</button>`).join("")}</div>`;
      document.getElementById("listen").onclick = () => say(it.name, it.snd);
      stage.querySelectorAll("[data-k]").forEach(
        (b) =>
          (b.onclick = async () => {
            if (opts[+b.dataset.k] !== it) {
              miss = true;
              b.disabled = true;
              b.classList.add("no");
              say(it.name, it.snd);
              return;
            }
            stage
              .querySelectorAll("[data-k]")
              .forEach((x) => (x.disabled = true));
            b.classList.add("ok");
            if (!miss) score++;
            tally();
            document.getElementById("say").innerHTML =
              `<span class="sp-found pop"><span class="sp-fpic" aria-hidden="true">${esc(it.ic)}</span><span>${wordHTML(it)}</span></span>`;
            if (!(await say(plain(it.w), it.wsnd))) return;
            await wait(900);
            if (!stage.contains(b)) return; // the page moved on meanwhile
            n++;
            ask();
          }),
      );
      say(it.name, it.snd);
    }
    function end() {
      const stars = Math.round((score / q.length) * 3);
      count.textContent = "";
      stage.innerHTML = `<div class="sp-stars">${[0, 1, 2].map((k) => Kit.star(k < stars)).join("")}</div>
        <p class="sp-result">${score === q.length ? "Молодець! " : ""}З першого разу: <b>${score}</b> з ${q.length}</p>
        <div class="sp-row"><button type="button" class="btn" id="again">🔁 Ще раз</button><a class="btn ghost" href="index.html">Абетка</a></div>`;
      document.getElementById("again").onclick = start;
    }
    begin();
  }

  ({ cards, guess })[view]();
})();
