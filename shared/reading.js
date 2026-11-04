// Ukrainian reading practice (Optima, Українська література). For a child who reads slowly:
// a text is read in three steps, from syllables to whole lines, and the last step is timed against his own record.
// <body data-view="list"> → the subject page (window.READINGS from texts.js: one card per text),
// <body data-view="game"> → one text (window.READING from <text>.js):
//   1. Склади – tap the syllables of a long word in order; the word joins up and is read whole.
//      «Читати разом» reads each syllable aloud as it is tapped, then the word (device voice, Ukrainian).
//   2. Слова – the long words flash one at a time for 15…2 seconds; «Ще раз» sends a word to the end of the line.
//   3. Читання – the whole text line by line with a stopwatch; the rocket climbs; the best time is saved on the device
//      («↺ скинути» clears it, after a question).
//      A long text has pages (READING.pages instead of text): Читання shows one page at a time, «Далі» after its last line
//      turns to the next one and the rocket starts again from the ground; one stopwatch and one record for the whole text.
// Words are written with "-" between syllables and "*" before the stressed syllable: "Бог-*дан-чик".
(function () {
  "use strict";
  const { esc, shuf } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "game";
  const SUBJ = "Українська література";
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

  /* ================= list of texts ================= */
  if (view === "list") {
    const R = window.READINGS || { grade: 3, items: [] };
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">← Усі ігри</a><span class="eyebrow">${esc(R.grade)} клас · ${SUBJ}</span></div>
    <h1 class="hero-title"><span class="p">Українська</span> <span class="k">література</span></h1>
    <p class="howto">${esc(R.intro || "Обери текст. Спершу читаємо по складах, потім слова, а тоді весь текст на швидкість.")}</p>
  </section>
  <div class="items">${R.items.map((it) => Kit.lessonCard(it, "Текст")).join("")}</div>
  <div class="soon">Нові тексти з’являться тут.</div>`;
    document.title = `${SUBJ} · ${R.grade} клас`;
    return;
  }

  /* ================= one text ================= */
  const T = window.READING;
  const K = "rd-" + T.key; // saved tab, voice switch, speed and best times
  // the lines of the timed reading, page by page; AT[n] = [page, line on it] of the n-th line of the text
  const PAGES = T.pages || [T.text];
  const AT = PAGES.flatMap((pl, p) => pl.map((_, i) => [p, i]));
  // "Бог-*дан-чик" → [{t: "Бог", s: false}, {t: "дан", s: true}, {t: "чик", s: false}]
  const parse = (w) =>
    w.split("-").map((x) => ({ t: x.replace("*", ""), s: x.startsWith("*") }));
  const plain = (w) =>
    parse(w)
      .map((x) => x.t)
      .join("");
  // a word with its stressed syllable in colour; split = keep the "-" between syllables
  // A real hyphen inside a word is "‑" (non-breaking hyphen) at the end of a syllable: "*мо-ря‑-о-ке-*а-ни".
  const wordHTML = (w, split) =>
    parse(w)
      .map((x) => {
        if (!x.s) return esc(x.t);
        const [, q, t, p] = x.t.match(/^([«"(]*)(.*?)([.,!?:;…»")‑]*)$/); // the colour stops at quotes, a full stop or comma
        return `${esc(q)}<b class="rd-st">${esc(t)}</b>${esc(p)}`;
      })
      .join(split ? "-" : "")
      .replace(/‑-/g, "‑");
  const lineHTML = (l, split) =>
    l
      .split(" ")
      .map((w) => wordHTML(w, split))
      .join(" ");
  const fmt = (ms) => (ms / 1000).toFixed(1).replace(".", ",") + " с";

  /* ---------- voice (device voices, Ukrainian) ---------- */
  const V = Kit.voice("uk-UA");
  const TTS = V.ok;
  const { say, hush } = V;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- page ---------- */
  const TABS = [
    { k: "syl", ic: "🧩", t: "Склади", sub: "по складах" },
    { k: "words", ic: "⛽", t: "Слова", sub: "на швидкість" },
    { k: "read", ic: "🚀", t: "Читання", sub: "весь текст" },
  ];
  let tab = store.get(K + "-tab", "syl");
  if (!TABS.some((t) => t.k === tab)) tab = "syl";
  app.innerHTML = `<section class="card rd-card">
    <div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="index.html">${SUBJ}</a></div></div>
    <div class="rd-head"><h1 class="les-title">${esc(T.title)}</h1><span class="les-sub">${esc(T.sub || "Складова ракета")}</span></div>
    <div class="tabbox"><div class="ftabs" role="group" aria-label="Крок">${TABS.map((t, i) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span>${i + 1}. ${esc(t.t)}<span class="sub">${esc(t.sub)}</span></button>`).join("")}</div>
      <div class="panel rd-panel"><div class="rd-stage" id="stage"></div>
        <div class="rd-sky" id="sky" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          <div class="rd-best" id="bestmark" hidden>рекорд</div><div class="rd-rocket" id="rocket">🚀</div></div></div></div>
  </section>`;
  document.title = `${T.title} · ${SUBJ}`;
  const stage = document.getElementById("stage");
  const sky = document.getElementById("sky");
  const rocket = document.getElementById("rocket");
  const bestmark = document.getElementById("bestmark");
  let timers = [];
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  const every = (f, ms) => timers.push(setInterval(f, ms));
  function stop() {
    timers.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    timers = [];
    hush();
  }
  // where the rocket is: 0 = on the ground, 1 = at the top; win = a new record (a bigger rocket).
  // On a phone held upright the sky is a strip above the game (wider than tall): the rocket flies to the right.
  let at = [0, false];
  function lift(f, win) {
    at = [f, win];
    f = Math.max(0, Math.min(1, f));
    const flat = sky.clientWidth > sky.clientHeight;
    rocket.style.bottom = flat ? "" : 6 + (sky.clientHeight - 64) * f + "px";
    rocket.style.left = flat ? 6 + (sky.clientWidth - 56) * f + "px" : "";
    rocket.classList.toggle("rd-win", !!win);
  }
  // a big word (syllable tiles, a flashing word) shrinks until it fits the width of the game;
  // tiles stop at 28px and go onto two rows instead (a long word on a phone held upright)
  function fit(el) {
    if (!el) return;
    const tiles = el.id === "tiles",
      min = tiles ? 28 : 20;
    el.style.fontSize = "";
    el.classList.remove("rd-wrap");
    const room = stage.clientWidth - 12; // the tiles' shadow and pulse
    let px = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > room && px > min) {
      px -= 2;
      el.style.fontSize = px + "px";
    }
    if (tiles && el.scrollWidth > room) el.classList.add("rd-wrap");
  }
  addEventListener("resize", () => {
    fit(document.getElementById("tiles"));
    fit(document.getElementById("flash"));
    lift(...at);
  });
  function go(k) {
    stop();
    tab = k;
    store.set(K + "-tab", k);
    document
      .querySelectorAll("[data-tab]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.tab === k));
    bestmark.hidden = true;
    ({ syl, words, read })[k]();
  }
  document
    .querySelectorAll("[data-tab]")
    .forEach((b) => (b.onclick = () => go(b.dataset.tab)));
  const next = (k, label) =>
    `<button type="button" class="btn" data-go="${k}">${label}</button>`;
  function wireNext() {
    stage
      .querySelectorAll("[data-go]")
      .forEach((b) => (b.onclick = () => go(b.dataset.go)));
  }

  /* ---------- 1. Склади ---------- */
  let along = store.get(K + "-along", "0") === "1";
  function syl() {
    const L = T.launch;
    let i = 0;
    function show() {
      stop();
      if (i >= L.length) {
        lift(0.33);
        stage.innerHTML = `<p class="rd-result">🛠️ Ракета готова!<br>Ти прочитав <b>${L.length}</b> довгих слів по складах.</p>
          <div class="rd-row">${next("syl", "🔁 Ще раз")}${next("words", "Далі: Слова ⛽")}</div>`;
        wireNext();
        return;
      }
      lift((i / L.length) * 0.33);
      const w = L[i];
      const parts = parse(w);
      stage.innerHTML = `<div class="rd-top"><span class="rd-count">${i + 1} / ${L.length}</span>
        ${TTS ? `<label class="rd-switch"><input type="checkbox" id="along"${along ? " checked" : ""}> 🔊 Читати разом</label>` : ""}</div>
        ${along && TTS && !V.has() ? `<p class="rd-warn">На цьому пристрої може не бути українського голосу.</p>` : ""}
        <p class="rd-hint">${along ? "Торкайся складу, слухай і читай разом 👆🔊" : "Читай уголос кожен склад і торкайся його 👆"}</p>
        <div class="rd-tiles" id="tiles">${parts.map((x, j) => `<button type="button" class="rd-tile${x.s ? " st" : ""}${j === 0 ? " next" : ""}" data-i="${j}">${esc(x.t)}</button>`).join("")}</div>
        <p class="rd-hint" id="after" hidden>А тепер прочитай слово цілком!</p>
        <div class="rd-row"><button type="button" class="btn ghost" id="listen"${along && TTS ? "" : " hidden"}>▶ Послухати</button>
          <button type="button" class="btn" id="nextw" hidden>Далі ▶</button></div>`;
      fit(document.getElementById("tiles"));
      let cur = 0,
        joined = false,
        busy = false;
      const sw = document.getElementById("along");
      if (sw)
        sw.onchange = () => {
          along = sw.checked;
          store.set(K + "-along", along ? "1" : "0");
          show();
        };
      const listen = document.getElementById("listen");
      listen.onclick = async () => {
        if (busy) return;
        busy = true;
        if (!joined) {
          for (const t of stage.querySelectorAll(".rd-tile")) {
            t.classList.add("say");
            await say(t.textContent);
            t.classList.remove("say");
            await wait(150);
          }
          await wait(200);
        }
        await say(plain(w), 0.85);
        busy = false;
      };
      stage.querySelectorAll(".rd-tile").forEach(
        (t) =>
          (t.onclick = () => {
            if (+t.dataset.i !== cur) return;
            if (along) say(t.textContent);
            t.classList.remove("next");
            t.classList.add("done");
            cur++;
            const n = stage.querySelector(`.rd-tile[data-i="${cur}"]`);
            if (n) return n.classList.add("next");
            later(() => {
              joined = true;
              document.getElementById("tiles").classList.add("joined");
              document.getElementById("after").hidden = false;
              document.getElementById("nextw").hidden = false;
              listen.textContent = "🔊 Ще раз";
              if (along) later(() => say(plain(w), 0.85), 500);
            }, 300);
          }),
      );
      document.getElementById("nextw").onclick = () => {
        i++;
        show();
      };
    }
    show();
  }

  /* ---------- 2. Слова ---------- */
  const SPEEDS = [15, 10, 6, 5, 4, 3, 2];
  let speed = +store.get(K + "-speed", "5");
  if (!SPEEDS.includes(speed)) speed = 5;
  function words() {
    let line = shuf(T.fuel),
      done = 0,
      again = 0;
    function show() {
      stop();
      if (!line.length) {
        lift(0.66);
        stage.innerHTML = `<p class="rd-result">⛽ Бак повний!<br>Слів: <b>${T.fuel.length}</b>, ще раз: <b>${again}</b>${again === 0 && speed > 2 ? "<br>Без жодної помилки — спробуй швидше!" : ""}</p>
          <div class="rd-row">${next("words", "🔁 Ще раз")}${next("read", "Злітаємо! 🚀")}</div>`;
        wireNext();
        return;
      }
      lift(0.33 + (done / T.fuel.length) * 0.33);
      stage.innerHTML = `<div class="rd-top"><span class="rd-count">Залишилось: ${line.length}</span>
        <div class="rd-speed" role="group" aria-label="Час на слово">${SPEEDS.map((s) => `<button type="button" data-s="${s}" aria-pressed="${s === speed}">${s} с</button>`).join("")}</div></div>
        <div class="rd-flash" id="flash">${wordHTML(line[0], false)}</div>
        <div class="rd-bar"><i id="fill"></i></div>
        <div class="rd-row"><button type="button" class="btn ghost" id="again">Ще раз 🔁</button><button type="button" class="btn rd-ok" id="got">Прочитав ✅</button></div>`;
      stage.querySelectorAll("[data-s]").forEach(
        (b) =>
          (b.onclick = () => {
            speed = +b.dataset.s;
            store.set(K + "-speed", speed);
            show();
          }),
      );
      fit(document.getElementById("flash"));
      const fill = document.getElementById("fill"),
        t0 = performance.now();
      every(() => {
        const left = 1 - (performance.now() - t0) / (speed * 1000);
        fill.style.width = Math.max(0, left) * 100 + "%";
        if (left <= 0) {
          stop();
          document.getElementById("flash").classList.add("gone");
        }
      }, 50);
      document.getElementById("got").onclick = () => {
        line.shift();
        done++;
        show();
      };
      document.getElementById("again").onclick = () => {
        line.push(line.shift());
        again++;
        show();
      };
    }
    show();
  }

  /* ---------- 3. Читання ---------- */
  let split = false;
  function read() {
    stop();
    const bk = K + (split ? "-best-split" : "-best"); // reading with syllables shown has its own record
    const best = +store.get(bk, "0");
    let n = -1, // the line being read, counted through all the pages
      t0 = 0;
    lift(0);
    stage.innerHTML = `<div class="rd-top"><label class="rd-switch"><input type="checkbox" id="split"${split ? " checked" : ""}> показати склади</label>
        ${PAGES.length > 1 ? `<span class="rd-count" id="pgl"></span>` : ""}<span class="rd-clock" id="clock">0,0 с</span><span class="rd-count">Рекорд: <b>${best ? fmt(best) : "—"}</b>${best ? ` <button type="button" class="rd-reset" id="reset">↺ скинути</button>` : ""}</span></div>
      <div class="rd-text" id="text"></div>
      <div class="rd-row" id="act"><button type="button" class="btn big" id="btn">Старт! 🚀</button></div>`;
    const sp = document.getElementById("split");
    const reset = document.getElementById("reset");
    // clears both records (with and without syllables), after a question
    if (reset)
      reset.onclick = () => {
        if (!confirm("Скинути рекорд?")) return;
        store.set(K + "-best", "0");
        store.set(K + "-best-split", "0");
        read();
      };
    const text = document.getElementById("text");
    function showPage(p) {
      const first = AT.findIndex(([q]) => q === p);
      text.innerHTML = PAGES[p]
        .map(
          (l, i) =>
            `<p class="rd-line" id="l${first + i}">${lineHTML(l, split)}</p>`,
        )
        .join("");
      text.scrollTop = 0;
      const pgl = document.getElementById("pgl");
      if (pgl) pgl.textContent = `Сторінка ${p + 1} з ${PAGES.length}`;
    }
    showPage(0);
    sp.onchange = () => {
      split = sp.checked;
      read();
    };
    const clock = document.getElementById("clock"),
      btn = document.getElementById("btn");
    function step() {
      if (n === -1) {
        t0 = performance.now();
        every(() => (clock.textContent = fmt(performance.now() - t0)), 100);
        sp.disabled = true;
        if (reset) reset.hidden = true;
      }
      if (n >= 0)
        document.getElementById("l" + n).classList.replace("cur", "was");
      n++;
      if (n >= AT.length) return finish();
      const [p, i] = AT[n];
      if (i === 0 && p > 0) showPage(p); // the last line of a page was read: the next page
      const line = document.getElementById("l" + n);
      line.classList.add("cur");
      // a long text scrolls in its box: the line being read stays in the middle
      text.scrollTo({
        top: line.offsetTop - (text.clientHeight - line.offsetHeight) / 2,
        behavior: "smooth",
      });
      lift((i / PAGES[p].length) * 0.8); // the rocket starts from the ground on each page
      btn.classList.remove("big");
      btn.textContent = n === AT.length - 1 ? "Фініш 🏁" : "Далі ▶";
    }
    function finish() {
      stop();
      const ms = performance.now() - t0;
      clock.textContent = fmt(ms);
      const record = !best || ms < best;
      if (record) store.set(bk, Math.round(ms));
      if (record) lift(1, true);
      else {
        lift(Math.min(0.95, best / ms));
        bestmark.hidden = false;
      }
      document.getElementById("act").innerHTML =
        `<p class="rd-result">${record ? `🎉 <b>Новий рекорд!</b> ${fmt(ms)}${best ? ` (було ${fmt(best)})` : ""}` : `Твій час: <b>${fmt(ms)}</b> · рекорд: ${fmt(best)} — ще трохи! 💪`}</p>${next("read", "🔁 Ще раз")}`;
      wireNext();
    }
    btn.onclick = step;
    // tapping the text also turns to the next line
    text.onclick = () => {
      if (n >= 0 && n < AT.length) step();
    };
  }

  go(tab);
})();
