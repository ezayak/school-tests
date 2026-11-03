// Speech games (Мовлення): letters, syllables, words, positions and sentences for a child with aphasia.
// Everything is said aloud with the device voice (Kit.voice); a recording (snd) replaces the voice for one item.
// <body data-view="list">  → a group page (window.SPEECH_LIST from list.js: one card per game),
// <body data-view="cards"> → cards: tap a card → the letter (syllable), a pause, the word.
// <body data-view="guess"> → guess: the voice says a letter (syllable), tap it among 4.
// <body data-deck="letters"> (or none) plays window.SPEECH_LETTERS (../letters.js), data-deck="syllables" window.SPEECH_SYLLABLES (../syllables.js).
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

  /* ---------- the deck: letters or syllables (<body data-deck>) ---------- */
  const deck = (
    document.body.dataset.deck === "syllables" ? syllables : letters
  )();
  const V = Kit.voice(deck.lang);

  /* ---------- voice: the device voice, or a recording ---------- */
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

  const plain = (w) => w.replace(/[[\]-]/g, "");
  const icon = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const SPEAKER = icon(
    '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
  );
  // the links back (home, the group's games), with something on the right (a counter)
  const top = (right) =>
    `<div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="index.html">${esc(deck.group)}</a></div>${right || ""}</div>`;
  const WARN = `<p class="sp-warn" id="warn" hidden>На цьому пристрої може не бути українського голосу.</p>`;
  // checked at a tap: the device lists its voices a moment after the page opens
  const warn = () =>
    (document.getElementById("warn").hidden = !V.ok || V.has());
  const cls = (c) => (c ? " " + c : "");

  /* ================= decks ================= */
  // A deck gives the games what they show and say. items: [{name: what is said, snd, w: the word with its part in [ ],
  // wsnd, ic: the picture}]; head(it) / tile(it): {c: a class, html} for the card's top and a guess button;
  // word(it): the word with its part in colour; page(i) + panel(i): the cards view's right panel (drawn again when page(i) changes);
  // others(it): 3 wrong answers; sets: the choice of what to play (none = everything).

  // Letters (window.SPEECH_LETTERS, letters.js): vowels red, consonants blue, ь green (k).
  function letters() {
    const D = window.SPEECH_LETTERS;
    const kind = (it) => "sp-" + (it.k || "c");
    const items = D.items;
    return {
      lang: D.lang,
      key: "",
      group: "Абетка",
      what: ["літеру", "неї"],
      nav: ["Попередня літера", "Наступна літера"],
      items,
      head: (it) => ({
        c: kind(it),
        html: esc(it.up ? `${it.up} ${it.lo}` : it.lo),
      }),
      tile: (it) => ({ c: kind(it), html: esc(it.up || it.lo) }),
      word: (it) =>
        esc(it.w).replace(/\[(.+?)\]/, `<b class="${kind(it)}">$1</b>`),
      page: () => 0,
      panel: () =>
        `<div class="sp-abc" role="group" aria-label="Літери">${items.map((it, k) => `<button type="button" class="${kind(it)}" data-i="${k}">${esc(it.up || it.lo)}</button>`).join("")}</div>`,
      others: (it) => Kit.shuf(items.filter((x) => x !== it)).slice(0, 3),
    };
  }

  // Syllables (window.SPEECH_SYLLABLES, syllables.js): every letter in colour (consonant blue, vowel red).
  function syllables() {
    const D = window.SPEECH_SYLLABLES;
    const VOW = "аеєиіїоуюя";
    const paint = (t) =>
      [...t]
        .map(
          (ch) =>
            `<span class="${VOW.includes(ch.toLowerCase()) ? "sp-v" : "sp-c"}">${esc(ch)}</span>`,
        )
        .join("");
    const items = [];
    D.groups.forEach((g, gi) =>
      g.syl.forEach((x) => items.push({ ...x, name: x.s, g: gi })),
    );
    const first = (gi) => items.findIndex((x) => x.g === gi);
    return {
      lang: D.lang,
      key: "syl-",
      group: "Склади",
      what: ["склад", "нього"],
      nav: ["Попередній склад", "Наступний склад"],
      items,
      head: (it) => ({
        c: "sp-long",
        html: `<span>${paint(it.s.toUpperCase())}</span><span>${paint(it.s)}</span>`,
      }),
      tile: (it) => ({ c: "sp-long", html: paint(it.s.toUpperCase()) }),
      word: (it) =>
        esc(it.w).replace(/\[(.+?)\]/, (m, t) => `<b>${paint(t)}</b>`),
      page: (i) => items[i].g,
      // the consonants, the syllables of this one, the sheet's words
      panel: (i) => {
        const g = items[i].g;
        return `<div class="sp-cons" role="group" aria-label="Приголосні">${D.groups.map((x, k) => `<button type="button" class="sp-c" data-g="${k}" aria-pressed="${k === g}">${esc(x.c.toUpperCase())}</button>`).join("")}</div>
          <div class="sp-abc sp-syls" role="group" aria-label="Склади">${items.map((x, k) => (x.g === g ? `<button type="button" data-i="${k}">${paint(x.s.toUpperCase())}</button>` : "")).join("")}</div>
          <div class="sp-words" role="group" aria-label="Слова">${D.groups[g].words.map((w, k) => `<button type="button" class="abtn" data-w="${k}">🔊 <span>${w.split("-").map(paint).join("-")}</span></button>`).join("")}</div>`;
      },
      first,
      words: (i) => D.groups[items[i].g].words,
      // mostly the same consonant with another vowel (МА – МО), one with the same vowel (МА – НА)
      others: (it) => {
        const same = Kit.shuf(items.filter((x) => x.g === it.g && x !== it));
        const vow = Kit.shuf(
          items.filter((x) => x.g !== it.g && x.s[1] === it.s[1]),
        );
        return [...same.slice(0, 2), ...vow.slice(0, 1)];
      },
      sets: [{ t: "Усі", items }].concat(
        D.groups.map((g, gi) => ({
          t: g.c.toUpperCase(),
          items: items.filter((x) => x.g === gi),
        })),
      ),
    };
  }

  /* ================= cards ================= */
  // The parent's layout «A · Card + letter panel»: the card on the left, the panel on the right.
  // Tap the card (or 🔊, ‹ ›, a button in the panel): the letter or syllable, a pause, the word.
  // A word of the sheet (syllables): each syllable, then the whole word.
  function cards() {
    const K = "sp-" + deck.lang + "-" + deck.key + "cards"; // the last card seen
    const N = deck.items.length;
    let i = Math.min(N - 1, Math.max(0, +store.get(K, 0) || 0));
    let run = 0; // a newer tap stops what an older one was saying
    let page = null;
    app.innerHTML = `<div class="sp-split">
      <div class="sp-side">
        <button type="button" class="sp-lcard" id="lcard"></button>
        <button type="button" class="sp-nav sp-prev" id="prev" aria-label="${deck.nav[0]}">${icon('<path d="M15 18l-6-6 6-6"/>')}</button>
        <button type="button" class="sp-nav sp-next" id="next" aria-label="${deck.nav[1]}">${icon('<path d="M9 6l6 6-6 6"/>')}</button>
        <button type="button" class="sp-snd" id="again" aria-label="Послухати ще раз">${SPEAKER}</button>
      </div>
      <section class="card sp-panel">
        ${top('<span class="sp-count" id="count"></span>')}
        <h1 class="les-title">${esc(deck.group)}</h1>
        <div class="sp-pane" id="pane"></div>
        ${WARN}
      </section>
    </div>`;
    const lcard = document.getElementById("lcard");
    const pane = document.getElementById("pane");
    function show() {
      const it = deck.items[i];
      if (deck.page(i) !== page) {
        page = deck.page(i);
        pane.innerHTML = deck.panel(i);
      }
      const h = deck.head(it);
      lcard.className = `sp-lcard sp-p${i % 7}`;
      lcard.innerHTML = `<span class="sp-hd${cls(h.c)}">${h.html}</span><span class="sp-pic" aria-hidden="true">${esc(it.ic)}</span><span class="sp-wd">${deck.word(it)}</span>`;
      lcard.setAttribute("aria-label", `${it.name}, ${plain(it.w)}`);
      document.getElementById("count").textContent = `${i + 1} / ${N}`;
      pane
        .querySelectorAll("[data-i]")
        .forEach((b) => b.setAttribute("aria-pressed", +b.dataset.i === i));
      store.set(K, i);
    }
    // texts one after the other, with a pause after each; stops when a newer tap comes
    async function say(parts) {
      const my = ++run;
      hush();
      warn();
      for (const [text, snd, pause] of parts) {
        await sound(text, snd);
        if (my !== run) return;
        if (pause) await wait(pause);
        if (my !== run) return;
      }
    }
    const speak = () => {
      const it = deck.items[i];
      say([
        [it.name, it.snd, 900],
        [plain(it.w), it.wsnd],
      ]);
    };
    function go(k) {
      i = (k + N) % N;
      show();
      speak();
    }
    document.getElementById("prev").onclick = () => go(i - 1);
    document.getElementById("next").onclick = () => go(i + 1);
    lcard.onclick = speak;
    document.getElementById("again").onclick = speak;
    pane.onclick = (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.i != null) go(+b.dataset.i);
      else if (b.dataset.g != null) go(deck.first(+b.dataset.g));
      else if (b.dataset.w != null) {
        const w = deck.words(i)[+b.dataset.w];
        say([...w.split("-").map((x) => [x, null, 350]), [plain(w)]]);
      }
    };
    document.title = `Картки · ${deck.group}`;
    show(); // no sound before the first tap: the browser would block it
  }

  /* ================= guess ================= */
  // The voice says a letter (syllable); tap it among 4. A right tap shows its picture and word and says the word,
  // then the next one comes. 10 a round; a star for each one found at the first tap.
  // Two modes, switched at any time (saved on the device): «З картинкою» shows the picture next to 🔊 as a hint,
  // «Без картинки» gives only the sound. A deck with sets (syllables) first asks what to play: everything or one consonant.
  function guess() {
    const ROUND = 10;
    const KP = "sp-" + deck.lang + "-" + deck.key + "guess-pic";
    const KS = "sp-" + deck.lang + "-" + deck.key + "guess-set";
    const title = "Вгадай " + deck.what[0];
    let pic = store.get(KP, "1") === "1";
    let set = deck.sets ? +store.get(KS, 0) || 0 : 0;
    if (deck.sets && !deck.sets[set]) set = 0;
    let q = [],
      n = 0,
      score = 0,
      miss = false,
      run = 0; // a newer sound stops what an older one was saying
    app.innerHTML = `<section class="card sp-game">
      ${top('<span class="sp-count" id="count"></span>')}
      <div class="sp-head"><h1 class="les-title">${esc(title)}</h1>
        <div class="seg" role="group" aria-label="Підказка"><button type="button" id="pic-1" data-pic="1">🖼️ З картинкою</button><button type="button" id="pic-0" data-pic="0">🔊 Без картинки</button></div></div>
      <div class="sp-stage" id="stage"></div>
      ${WARN}
    </section>`;
    const stage = document.getElementById("stage");
    const count = document.getElementById("count");
    const tally = () =>
      (count.textContent = `${n + 1} / ${q.length} · ⭐ ${score}`);
    document.title = `${title} · ${deck.group}`;
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
      count.textContent = "";
      stage.innerHTML = `${deck.sets ? `<div class="seg sp-sets" role="group" aria-label="Що грати">${deck.sets.map((x, k) => `<button type="button" data-set="${k}" aria-pressed="${k === set}">${esc(x.t)}</button>`).join("")}</div>` : ""}
        <p class="sp-hint">Послухай ${deck.what[0]} і натисни на ${deck.what[1]}.</p>
        <button type="button" class="btn big" id="go">▶ Почати</button>`;
      stage.querySelectorAll("[data-set]").forEach(
        (b) =>
          (b.onclick = () => {
            set = +b.dataset.set;
            store.set(KS, set);
            stage
              .querySelectorAll("[data-set]")
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
          }),
      );
      document.getElementById("go").onclick = start; // the first tap also lets the browser speak
    }
    function start() {
      const pool = deck.sets ? deck.sets[set].items : deck.items;
      // a small set (one consonant) comes round again, never twice in a row
      q = [];
      while (q.length < ROUND) {
        let more = Kit.shuf(pool);
        if (q.length && more[0] === q[q.length - 1]) more.push(more.shift());
        q = q.concat(more);
      }
      q = q.slice(0, ROUND);
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
      const opts = Kit.shuf([it, ...deck.others(it)]);
      tally();
      stage.innerHTML = `<div class="sp-say" id="say"><button type="button" class="sp-snd sp-listen" id="listen" aria-label="Послухати ще раз">${SPEAKER}</button><span class="sp-fpic sp-hintpic" id="hint" aria-hidden="true"${pic ? "" : " hidden"}>${esc(it.ic)}</span></div>
        <div class="sp-choices">${opts
          .map((o, k) => {
            const t = deck.tile(o);
            return `<button type="button" class="sp-choice${cls(t.c)}" data-k="${k}">${t.html}</button>`;
          })
          .join("")}</div>`;
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
              `<span class="sp-found pop"><span class="sp-fpic" aria-hidden="true">${esc(it.ic)}</span><span>${deck.word(it)}</span></span>`;
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
        <div class="sp-row"><button type="button" class="btn" id="again">🔁 Ще раз</button>${deck.sets ? `<button type="button" class="btn ghost" id="other">Інші ${deck.group.toLowerCase()}</button>` : ""}<a class="btn ghost" href="index.html">${esc(deck.group)}</a></div>`;
      document.getElementById("again").onclick = start;
      if (deck.sets) document.getElementById("other").onclick = begin;
    }
    begin();
  }

  ({ cards, guess })[view]();
})();
