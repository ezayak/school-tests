// Speed reading (Optima, Швидкочитання): small games that train reading accuracy and the eye. Everything on screen is Ukrainian.
// <body data-view="list"> → the hub (window.SPEED from list.js): the cards in three side-bar sections
// (Kit.sideNav; the page loads shared/common.js first): Щодня · Книжка · Тексти.
// <body data-game="…" data-sec="daily"> → one game; data-sec = the hub section the back link opens. Every game has
// a start screen (a set to play, its options; the choice is kept on this device), the game, and an end screen.
//   flash  «Склади-блискавки»: a syllable or word of the set shows for 3…0.7 s, then hides; the child reads it aloud and the
//          parent taps ✓ Прочитав or ↺ Ще раз (the item goes to the end of the line). Data: window.DAILY.flash (daily.js).
//   which  «Яке слово?»: a word shows for a moment, then 2–4 look-alikes: tap the one that was shown.
//          Data: the look-alike groups of window.CATCH (catch.js), a set per level.
//   gaps   «Пропущене»: a word or sentence with a gap and its picture; tap the syllable, word or ending that fits.
//          Data: window.DAILY.gaps.
//   phrases «Читаємо фразами»: the parts of a sentence (" / ") light up one by one (Далі, or at a pace), then the whole;
//          the parent taps ✓ Прочитав or ↺ Ще раз. Data: window.DAILY.phrases.
//   pics   «Яка картинка?»: an instruction and 3 pictures (Kit.scene); the picture grows step by step.
//          Data: window.DAILY.pics.
// Книжка (data: window.BOOK from book.js; data-sec="book"):
//   schulte «Таблиці Шульте»: tap 1 → 9 (16, 25, letters) looking at the middle; time and record per set.
//   table  «Складова таблиця»: a syllable lights up and moves along the book's arrows (Далі, or at a pace).
//   wedge  «Клин»: rows of a word cut in two, the halves further apart each row; they light up down, then up faster.
//   odd    «Зайве слово»: a column of one word 3 times and a look-alike; tap the odd one (look-alikes from catch.js).
//   sizes  «Велика — маленька»: letters of a word in different sizes; tap them from the biggest (p. 10) or smallest (p. 28).
// <body data-game="text"> → a text (window.TEXT from text-<name>.js): 📖 Читаю with a stopwatch and words per minute
//   (the best time on this device, or the times of T.readings: the same text read several times), ❓ Питання, 🔎 Помилки.
(function () {
  "use strict";
  const { esc, shuf } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "game";
  const SUBJ = "Швидкочитання";
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

  /* ================= the hub ================= */
  if (view === "list") {
    const S = window.SPEED || { grade: 3, items: [] };
    const SECS = [
      {
        k: "daily",
        ic: "🎯",
        t: "Щодня",
        label: "Гра",
        soon: "Ігри на щодень з’являться тут.",
      },
      {
        k: "book",
        ic: "📒",
        t: "Книжка",
        label: "Гра",
        soon: "Вправи для очей із книжки з’являться тут.",
      },
      {
        k: "texts",
        ic: "⏱",
        t: "Тексти",
        label: "Текст",
        soon: "Тексти з книжки з’являться тут.",
      },
    ];
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">← Усі ігри</a><span class="eyebrow">${esc(S.grade)} клас · ${SUBJ}</span></div>
    <h1 class="hero-title"><span class="k">${SUBJ}</span></h1>
    <p class="howto">${esc(S.intro || "")}</p>
  </section>
  <div id="secs"></div>`;
    Kit.sideNav(
      document.getElementById("secs"),
      SECS.map((s) => {
        const list = S.items.filter((it) => it.sec === s.k);
        return {
          k: s.k,
          ic: s.ic,
          t: s.t,
          n: list.length || null,
          html: list.length
            ? `<div class="items">${list.map((it) => Kit.lessonCard(it, s.label)).join("")}</div>`
            : `<div class="soon">${esc(s.soon)}</div>`,
        };
      }),
    );
    document.title = `${SUBJ} · ${S.grade} клас`;
    return;
  }

  /* ================= one game: shared parts ================= */
  const GAME = document.body.dataset.game;
  const HUB = "index.html#" + (document.body.dataset.sec || "daily");
  const V = Kit.voice("uk-UA");
  const say = (t) => {
    V.hush();
    return V.say(t);
  };
  const ROUND = 10; // items in one round
  const links = `<div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="${HUB}">${SUBJ}</a></div></div>`;
  let timers = [];
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  function stopAll() {
    timers.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    timers = [];
    V.hush();
  }
  addEventListener("pagehide", stopAll);

  // The start screen of a game. g = {key, ic, title, howto, sets: [{k, t, sub}], opts(set) → [{k, lab, vals: [[v, label]], def}], play(set, o)}
  // The chosen set and options are kept on this device (sr-<key>-set, sr-<key>-<option>).
  function start(g) {
    stopAll();
    const K = "sr-" + g.key;
    let set = g.sets.find((s) => s.k === store.get(K + "-set")) || g.sets[0];
    const opts = (g.opts ? g.opts(set) : []).map((o) => {
      const v = store.get(K + "-" + o.k, String(o.def));
      return {
        ...o,
        v: o.vals.some(([x]) => String(x) === v) ? v : String(o.def),
      };
    });
    app.innerHTML = `<section class="card pop sr-start">
      ${links}
      <div class="sr-hero" aria-hidden="true">${esc(g.ic)}</div>
      <h1 class="hero-title">${esc(g.title)}</h1>
      <p class="howto">${esc(g.howto)}</p>
      <div class="sr-sets" role="group" aria-label="Набір">${g.sets
        .map(
          (s) =>
            `<button type="button" class="sr-set" data-set="${esc(s.k)}" aria-pressed="${s === set}"><span>${esc(s.t)}</span><small>${esc(s.sub || "")}</small></button>`,
        )
        .join("")}</div>
      ${
        opts.length
          ? `<div class="opts-row center">${opts
              .map(
                (o) =>
                  `<div class="og"><span class="lab">${esc(o.lab)}</span><div class="seg" role="group" aria-label="${esc(o.lab)}">${o.vals
                    .map(
                      ([v, l]) =>
                        `<button type="button" data-o="${esc(o.k)}" data-v="${esc(v)}" aria-pressed="${String(v) === o.v}">${esc(l)}</button>`,
                    )
                    .join("")}</div></div>`,
              )
              .join("")}</div>`
          : ""
      }
      <button class="btn big sr-go" id="go" type="button">▶ Почати</button>
    </section>`;
    app.querySelectorAll("[data-set]").forEach(
      (b) =>
        (b.onclick = () => {
          store.set(K + "-set", b.dataset.set);
          start(g); // a set can have other options
        }),
    );
    app.querySelectorAll("[data-o]").forEach(
      (b) =>
        (b.onclick = () => {
          store.set(K + "-" + b.dataset.o, b.dataset.v);
          app
            .querySelectorAll(`[data-o="${b.dataset.o}"]`)
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    app.querySelector("#go").onclick = () => {
      const o = {};
      app
        .querySelectorAll('[data-o][aria-pressed="true"]')
        .forEach((b) => (o[b.dataset.o] = b.dataset.v));
      g.play(set, o);
    };
    document.title = `${g.title} · ${SUBJ}`;
  }

  // the bar above a game: ← back to the start screen, the set's name, how far
  const bar = (set, extra) =>
    `<div class="sr-bar"><button type="button" class="abtn" id="quit" aria-label="Зупинити гру">←</button><span class="sr-name">${esc(set.t)}</span>${extra || ""}<span class="sr-prog" id="prog"></span></div>`;
  const dots = (n, done, cls) =>
    Array.from(
      { length: n },
      (_, i) => `<i class="${i < done ? cls[i] || "on" : ""}"></i>`,
    ).join("");

  // the end screen: right = right the first time, of n
  function end(g, set, right, n, more) {
    stopAll();
    const all = right === n;
    const stars = right >= n ? 3 : right >= n * 0.7 ? 2 : right > 0 ? 1 : 0;
    app.innerHTML = `<section class="card pop sr-end">
      ${links}
      <div class="sr-stars">${[1, 2, 3].map((i) => Kit.star(i <= stars)).join("")}</div>
      <h1 class="hero-title">${all ? "Чудово!" : "Молодець!"}</h1>
      <p class="sr-score"><b>${right}</b> з ${n}</p>
      <p class="note">${esc(set.t)} · з першого разу</p>
      ${more ? `<p class="howto">${esc(more)}</p>` : ""}
      <div class="row sr-row"><button class="btn big" id="again" type="button">Грати ще</button><button class="btn ghost" id="sets" type="button">Інший набір</button></div>
    </section>`;
    say(all ? "Чудово!" : "Молодець!");
    app.querySelector("#again").onclick = () => g.play(set, g.last || {});
    app.querySelector("#sets").onclick = () => start(g);
  }

  /* ================= «Склади-блискавки» ================= */
  const TIMES = [
    ["3", "3 с"],
    ["2", "2 с"],
    ["1.5", "1,5 с"],
    ["1", "1 с"],
    ["0.7", "0,7 с"],
  ];
  const flash = {
    key: "flash",
    ic: "⚡",
    title: "Склади-блискавки",
    howto:
      "Склад або слово з’являється і зникає. Прочитай його вголос! Прочитав правильно: дорослий натискає ✓. Ні: ↺, і воно повернеться ще раз.",
    sets: (window.DAILY || {}).flash || [],
    opts: (set) => [
      { k: "t", lab: "Скільки видно", vals: TIMES, def: "2" },
      ...(set.syl
        ? [
            {
              k: "syl",
              lab: "Склади",
              vals: [
                ["1", "ма-ши-на"],
                ["0", "машина"],
              ],
              def: "1",
            },
          ]
        : []),
    ],
    play(set, o) {
      stopAll();
      flash.last = o;
      const ms = +o.t * 1000;
      const show = (w) => (o.syl === "0" ? w.replace(/-/g, "") : w);
      const line = shuf(set.items)
        .slice(0, ROUND)
        .map((w) => ({ w, tries: 0 }));
      const n = line.length,
        marks = [];
      let cur = null,
        right = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <div class="sr-stage"><div class="sr-word" id="w"></div></div>
        <div class="sr-btns">
          <button type="button" class="btn ghost" id="peek">👁 Ще подивитись</button>
          <button type="button" class="btn ghost sr-no" id="re">↺ Ще раз</button>
          <button type="button" class="btn big sr-yes" id="ok">✓ Прочитав</button>
        </div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const w = app.querySelector("#w");
      const prog = () => {
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
      };
      const reveal = () => {
        stopAll();
        w.textContent = show(cur.w);
        w.classList.remove("hid");
        fit(w);
        later(() => w.classList.add("hid"), ms);
      };
      const next = () => {
        if (!line.length) return end(flash, set, right, n);
        cur = line.shift();
        prog();
        reveal();
      };
      app.querySelector("#peek").onclick = reveal;
      app.querySelector("#ok").onclick = () => {
        if (!cur) return;
        if (!cur.tries) right++;
        marks.push(cur.tries ? "late" : "on");
        next();
      };
      app.querySelector("#re").onclick = () => {
        if (!cur) return;
        cur.tries++;
        line.push(cur);
        next();
      };
      app.querySelector("#quit").onclick = () => start(flash);
      next();
    },
  };

  // a big word shrinks until it fits the width of its stage
  function fit(el) {
    el.style.fontSize = "";
    const room = el.parentNode.clientWidth - 16;
    let px = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > room && px > 18) {
      px -= 2;
      el.style.fontSize = px + "px";
    }
  }

  /* ================= «Яке слово?» ================= */
  // the items of a level: every word of a group with two or more words, its choices = its group (at most 4)
  function whichItems(level) {
    const items = [];
    for (const g of level.groups || [])
      if (g.length > 1)
        for (const w of g)
          items.push({
            w,
            o: [w, ...shuf(g.filter((x) => x !== w)).slice(0, 3)],
          });
    // each word once, groups mixed
    const seen = new Set();
    return shuf(items).filter((it) =>
      seen.has(it.w) ? false : seen.add(it.w),
    );
  }
  const which = {
    key: "which",
    ic: "🔍",
    title: "Яке слово?",
    howto:
      "Слово з’явиться на мить. Потім будуть схожі слова. Прочитай кожне до кінця і торкнись того, яке ти бачив!",
    sets: ((window.CATCH || {}).levels || []).map((l) => ({
      k: l.k,
      t: l.t,
      sub: l.sub,
      level: l,
    })),
    opts: () => [
      {
        k: "t",
        lab: "Скільки видно",
        vals: [["5", "5 с"], ...TIMES],
        def: "3",
      },
      {
        k: "caps",
        lab: "Літери",
        vals: [
          ["0", "абв"],
          ["1", "АБВ"],
        ],
        def: "0",
      },
    ],
    play(set, o) {
      stopAll();
      which.last = o;
      const ms = +o.t * 1000;
      const up = (w) => (o.caps === "1" ? w.toUpperCase() : w);
      const items = whichItems(set.level).slice(0, ROUND);
      const n = items.length,
        marks = [];
      let k = 0,
        right = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <div class="sr-stage"><div class="sr-word" id="w"></div></div>
        <div class="opts sr-opts" id="opts"></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const w = app.querySelector("#w"),
        box = app.querySelector("#opts");
      const prog = () => {
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
      };
      // the word shows, then hides; the choices come when it is gone
      const flashWord = (it, then) => {
        w.textContent = up(it.w);
        w.classList.remove("hid");
        fit(w);
        later(() => {
          w.classList.add("hid");
          then && then();
        }, ms);
      };
      const ask = () => {
        if (k >= n) return end(which, set, right, n);
        const it = items[k];
        let tries = 0;
        prog();
        box.innerHTML = "";
        flashWord(it, () => {
          box.innerHTML = shuf(it.o)
            .map(
              (x) =>
                `<button type="button" class="opt big" data-w="${esc(x)}">${esc(up(x))}</button>`,
            )
            .join("");
          box.querySelectorAll(".opt").forEach(
            (b) =>
              (b.onclick = () => {
                if (b.dataset.w === it.w) {
                  b.classList.add("right");
                  box
                    .querySelectorAll(".opt")
                    .forEach((x) => (x.disabled = true));
                  if (!tries) right++;
                  marks.push(tries ? "late" : "on");
                  say(it.w);
                  k++;
                  later(ask, 1300);
                } else {
                  tries++;
                  b.classList.add("wrong");
                  b.disabled = true;
                  say(b.dataset.w);
                  flashWord(it); // look once more
                }
              }),
          );
        });
      };
      app.querySelector("#quit").onclick = () => start(which);
      ask();
    },
  };

  /* ================= «Пропущене» ================= */
  const GAP = /_{3,}/;
  const gaps = {
    key: "gaps",
    ic: "🧩",
    title: "Пропущене",
    howto:
      "Чого не вистачає? Прочитай і торкнись склад, слово чи закінчення, що підходить. Потім прочитай усе разом!",
    sets: (window.DAILY || {}).gaps || [],
    play(set, o) {
      stopAll();
      gaps.last = o;
      const items = shuf(set.items).slice(0, ROUND);
      const n = items.length,
        marks = [];
      let k = 0,
        right = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <div class="sr-qbox"><span class="sr-ic" id="ic" aria-hidden="true"></span><p class="sr-q" id="q"></p></div>
        <div class="opts two sr-opts" id="opts"></div>
        <div class="sr-next"><button type="button" class="btn big" id="next" hidden>Далі →</button></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const q = app.querySelector("#q"),
        box = app.querySelector("#opts"),
        nextB = app.querySelector("#next");
      const ask = () => {
        if (k >= n) return end(gaps, set, right, n);
        const it = items[k],
          a = it.o[0];
        let tries = 0;
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
        app.querySelector("#ic").textContent = it.ic || "";
        q.innerHTML = esc(it.q).replace(GAP, '<span class="sr-gap">?</span>');
        nextB.hidden = true;
        box.innerHTML = shuf(it.o)
          .map(
            (x) =>
              `<div class="optrow"><button type="button" class="opt big" data-a="${esc(x)}">${esc(x)}</button></div>`,
          )
          .join("");
        box.querySelectorAll(".opt").forEach(
          (b) =>
            (b.onclick = () => {
              if (b.dataset.a === a) {
                b.classList.add("right");
                box
                  .querySelectorAll(".opt")
                  .forEach((x) => (x.disabled = true));
                if (!tries) right++;
                marks.push(tries ? "late" : "on");
                q.innerHTML = esc(it.q).replace(
                  GAP,
                  `<span class="sr-gap ok">${esc(a)}</span>`,
                );
                say(it.q.replace(GAP, a));
                nextB.hidden = false;
                nextB.focus();
              } else {
                tries++;
                b.classList.add("wrong");
                b.disabled = true;
              }
            }),
        );
      };
      nextB.onclick = () => {
        k++;
        ask();
      };
      app.querySelector("#quit").onclick = () => start(gaps);
      ask();
    },
  };

  /* ================= «Читаємо фразами» ================= */
  // the parts light up one by one (a tap on Далі, or by themselves at the chosen pace), then the whole sentence;
  // the parent taps ✓ Прочитав (or ↺ Ще раз: the parts again from the start)
  const phrases = {
    key: "phrases",
    ic: "🐾",
    title: "Читаємо фразами",
    howto:
      "Частина речення світиться: прочитай її одним духом, не зупиняючись після кожного слова. Потім прочитай усе речення разом!",
    sets: (window.DAILY || {}).phrases || [],
    opts: () => [
      {
        k: "pace",
        lab: "Далі",
        vals: [
          ["tap", "сам"],
          ["3", "3 с"],
          ["2", "2 с"],
          ["1.5", "1,5 с"],
        ],
        def: "tap",
      },
    ],
    play(set, o) {
      stopAll();
      phrases.last = o;
      const auto = o.pace !== "tap" ? +o.pace * 1000 : 0;
      const items = shuf(set.items).slice(0, ROUND);
      const n = items.length,
        marks = [];
      let k = 0,
        right = 0,
        tries = 0,
        at = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <div class="sr-qbox"><span class="sr-ic" id="ic" aria-hidden="true"></span><p class="sr-q sr-phr" id="q"></p></div>
        <div class="sr-btns" id="btns"></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const q = app.querySelector("#q"),
        btns = app.querySelector("#btns");
      const parts = () => items[k].s.split(" / ");
      // at = the part that lights up; at = parts().length: the whole sentence
      const draw = () => {
        const p = parts(),
          whole = at >= p.length;
        q.innerHTML = p
          .map(
            (x, i) =>
              `<span class="sr-part${whole ? " all" : i === at ? " now" : i < at ? " past" : ""}">${esc(x)}</span>`,
          )
          .join(" ");
        if (whole) {
          btns.innerHTML = `${V.has() ? '<button type="button" class="btn ghost" id="hear">🔊 Послухати</button>' : ""}<button type="button" class="btn ghost sr-no" id="re">↺ Ще раз</button><button type="button" class="btn big sr-yes" id="ok">✓ Прочитав</button>`;
          const h = btns.querySelector("#hear");
          if (h) h.onclick = () => say(p.join(" "));
          btns.querySelector("#re").onclick = () => {
            tries++;
            at = 0;
            step();
          };
          btns.querySelector("#ok").onclick = () => {
            if (!tries) right++;
            marks.push(tries ? "late" : "on");
            k++;
            ask();
          };
        } else
          btns.innerHTML = auto
            ? ""
            : '<button type="button" class="btn big" id="nx">Далі →</button>';
        const nx = btns.querySelector("#nx");
        if (nx)
          nx.onclick = () => {
            at++;
            step();
          };
      };
      const step = () => {
        stopAll();
        draw();
        if (auto && at < parts().length)
          later(() => {
            at++;
            step();
          }, auto);
      };
      const ask = () => {
        if (k >= n) return end(phrases, set, right, n);
        tries = 0;
        at = 0;
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
        app.querySelector("#ic").textContent = items[k].ic || "";
        step();
      };
      app.querySelector("#quit").onclick = () => start(phrases);
      ask();
    },
  };

  /* ================= «Яка картинка?» ================= */
  // the steps in their order (the picture grows); each step: the instruction and 3 pictures, tap the one that shows it
  const pics = {
    key: "pics",
    ic: "🖼️",
    title: "Яка картинка?",
    howto:
      "Прочитай речення і знайди картинку, яка йому відповідає. З кожним реченням малюнок росте!",
    sets: (window.DAILY || {}).pics || [],
    play(set, o) {
      stopAll();
      pics.last = o;
      const n = set.steps.length,
        marks = [];
      let k = 0,
        right = 0,
        sofar = [];
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <p class="sr-q sr-instr" id="q"></p>
        <div class="choices sr-pics" id="opts"></div>
        <div class="sr-next"><button type="button" class="btn big" id="next" hidden>Далі →</button></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const q = app.querySelector("#q"),
        box = app.querySelector("#opts"),
        nextB = app.querySelector("#next");
      const pic = (add) => Kit.scene({ bg: set.bg, items: [...sofar, ...add] });
      const ask = () => {
        if (k >= n) return end(pics, set, right, n);
        const st = set.steps[k];
        let tries = 0;
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
        q.textContent = st.q;
        nextB.hidden = true;
        const opts = shuf([
          { ok: true, add: st.right },
          ...st.wrong.map((w) => ({ ok: false, add: w })),
        ]);
        box.innerHTML = opts
          .map(
            (x, i) =>
              `<button type="button" class="choice" data-i="${i}" aria-label="Картинка ${i + 1}">${pic(x.add)}</button>`,
          )
          .join("");
        box.querySelectorAll(".choice").forEach(
          (b) =>
            (b.onclick = () => {
              const x = opts[+b.dataset.i];
              if (x.ok) {
                b.classList.add("right");
                box
                  .querySelectorAll(".choice")
                  .forEach((c) => (c.disabled = true));
                if (!tries) right++;
                marks.push(tries ? "late" : "on");
                sofar = [...sofar, ...st.right];
                say(st.q);
                nextB.hidden = false;
              } else {
                tries++;
                b.classList.add("wrong");
                b.disabled = true;
              }
            }),
        );
      };
      nextB.onclick = () => {
        k++;
        ask();
      };
      app.querySelector("#quit").onclick = () => start(pics);
      ask();
    },
  };

  /* ================= Книжка: shared parts ================= */
  const BOOK = window.BOOK || {};
  const mmss = (ms) => {
    const s = Math.max(0, Math.round(ms / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };
  const PACE = [
    ["tap", "сам"],
    ["2", "2 с"],
    ["1.5", "1,5 с"],
    ["1", "1 с"],
    ["0.7", "0,7 с"],
  ];
  // a stopwatch in the bar (#clk); returns {ms(), stop()}
  function stopwatch() {
    const t0 = Date.now();
    const id = setInterval(() => {
      const c = app.querySelector("#clk");
      if (c) c.textContent = mmss(Date.now() - t0);
    }, 250);
    timers.push(id);
    return { ms: () => Date.now() - t0, stop: () => clearInterval(id) };
  }
  // a Ukrainian count: plural(3, ["таблиця", "таблиці", "таблиць"]) → "3 таблиці"
  const plural = (n, [one, few, many]) => {
    const t = n % 10,
      h = n % 100;
    return `${n} ${t === 1 && h !== 11 ? one : t >= 2 && t <= 4 && (h < 12 || h > 14) ? few : many}`;
  };
  const clockHTML = '<span class="sr-clk">⏱ <b id="clk">0:00</b></span>';
  // the end of a timed game: the time, and the best time of this set on this device (best: false = no record kept)
  function endTimed(g, set, ms, line, best = true) {
    stopAll();
    const K = `sr-${g.key}-best-${set.k}`,
      b = +store.get(K, 0),
      rec = best && (!b || ms < b);
    if (rec) store.set(K, ms);
    app.innerHTML = `<section class="card pop sr-end">
      ${links}
      <div class="sr-hero" aria-hidden="true">${rec ? "🏆" : "🎉"}</div>
      <h1 class="hero-title">Молодець!</h1>
      <p class="sr-score">⏱ <b>${mmss(ms)}</b></p>
      <p class="note">${esc(set.t)}${line ? " · " + esc(line) : ""}</p>
      ${best ? `<p class="howto">${rec ? "Новий рекорд!" : `Твій рекорд: ${mmss(b)}`}</p>` : ""}
      <div class="row sr-row"><button class="btn big" id="again" type="button">Грати ще</button><button class="btn ghost" id="sets" type="button">Інший набір</button></div>
    </section>`;
    say(rec ? "Новий рекорд!" : "Молодець!");
    app.querySelector("#again").onclick = () => g.play(set, g.last || {});
    app.querySelector("#sets").onclick = () => start(g);
  }

  /* ================= «Таблиці Шульте» ================= */
  const ABC = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя".split("");
  const schulte = {
    key: "schulte",
    ic: "🔢",
    title: "Таблиці Шульте",
    howto:
      "Дивись у середину таблиці і не відводь погляду. Знайди очима і торкнись чисел по порядку: 1, 2, 3… Чим швидше, тим краще!",
    sets: [
      { k: "book", t: "З книжки · 3×3", sub: "с. 33", n: 3 },
      { k: "n4", t: "Числа · 4×4", sub: "1 … 16", n: 4 },
      { k: "n5", t: "Числа · 5×5", sub: "1 … 25", n: 5 },
      { k: "a4", t: "Літери · 4×4", sub: "а б в … л", n: 4, abc: true },
    ],
    play(set, o) {
      stopAll();
      schulte.last = o;
      const N = set.n * set.n;
      // the tables of a round: 5 of the book's, or 3 made up
      const tables =
        set.k === "book"
          ? shuf(BOOK.schulte || []).slice(0, 5)
          : Array.from({ length: 3 }, () =>
              shuf(Array.from({ length: N }, (_, i) => i + 1)),
            );
      const label = (v) => (set.abc ? ABC[v - 1] : String(v));
      let ti = 0,
        want = 1,
        miss = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set, clockHTML)}
        <p class="sr-find">Шукай: <b id="want"></b></p>
        <div class="sr-schulte n${set.n}" id="grid"></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const grid = app.querySelector("#grid");
      const draw = () => {
        const t = tables[ti],
          mid = set.n % 2 ? (N - 1) / 2 : -1;
        want = 1;
        app.querySelector("#want").textContent = label(1);
        app.querySelector("#prog").textContent = `${ti + 1} / ${tables.length}`;
        app.querySelector("#dots").innerHTML = dots(tables.length, ti, []);
        grid.innerHTML =
          t
            .map(
              (v, i) =>
                `<button type="button" class="sr-cell${i === mid ? " mid" : ""}" data-v="${v}">${esc(label(v))}</button>`,
            )
            .join("") +
          (set.n % 2 ? "" : '<i class="sr-focus" aria-hidden="true"></i>');
        grid.querySelectorAll(".sr-cell").forEach(
          (b) =>
            (b.onpointerdown = (e) => {
              e.preventDefault();
              if (want > N) return; // the table is done: the next one is coming
              if (+b.dataset.v === want) {
                b.classList.add("ok");
                if (++want > N) {
                  if (++ti >= tables.length)
                    return endTimed(
                      schulte,
                      set,
                      sw.ms(),
                      `${plural(tables.length, ["таблиця", "таблиці", "таблиць"])} · помилок: ${miss}`,
                    );
                  return later(draw, 400);
                }
                app.querySelector("#want").textContent = label(want);
              } else {
                miss++;
                b.classList.remove("no");
                void b.offsetWidth;
                b.classList.add("no");
              }
            }),
        );
      };
      const sw = stopwatch();
      app.querySelector("#quit").onclick = () => start(schulte);
      draw();
    },
  };

  /* ================= «Складова таблиця» ================= */
  // a set → its rows of syllables, the order they light up in, and the arrows above the columns
  function tableSet(k) {
    const T = BOOK.table || {},
      V = T.vowels || [];
    const flat = (rows, dirs) => {
      // dirs: columns read down / up one after another; none: rows left to right
      if (!dirs) return rows.flatMap((r, i) => r.map((_, j) => [i, j]));
      return dirs.flatMap((d, j) => {
        const col = rows.map((_, i) => [i, j]);
        return d > 0 ? col : col.reverse();
      });
    };
    if (k === "cv") {
      const rows = shuf(T.consonants || [])
        .slice(0, 4)
        .flatMap((c) => [V.map((v) => c + v), V.map((v) => v + c)]);
      return { rows, path: flat(rows) };
    }
    if (k === "r") {
      const rows = shuf(T.withR || [])
        .slice(0, 6)
        .map((c) => V.map((v) => c + "р" + v));
      return { rows, path: flat(rows) };
    }
    const G = T[k] || { rows: [], dirs: [] };
    return { rows: G.rows, path: flat(G.rows, G.dirs), dirs: G.dirs };
  }
  const table = {
    key: "table",
    ic: "🔡",
    title: "Складова таблиця",
    howto:
      "Склад світиться: прочитай його вголос і стеж очима, куди світло піде далі. «Сам» — натискай Далі; або вибери темп, і світло піде саме.",
    sets: [
      { k: "cv", t: "Таблиця", sub: "ма мо му · ам ом ум" },
      { k: "r", t: "Приголосний + р", sub: "дра дро дру · с. 14" },
      { k: "grid12", t: "Стовпчики · с. 12", sub: "↓ ↑ за стрілками" },
      { k: "grid14", t: "Змійка · с. 14", sub: "↓ ↑ ↓ ↑ ↓" },
    ],
    opts: () => [{ k: "pace", lab: "Далі", vals: PACE, def: "tap" }],
    play(set, o) {
      stopAll();
      table.last = o;
      const { rows, path, dirs } = tableSet(set.k);
      const auto = o.pace !== "tap" ? +o.pace * 1000 : 0;
      let at = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set, clockHTML)}
        <div class="sr-tablewrap"><table class="sr-table">${dirs ? `<tr class="sr-arrows">${dirs.map((d) => `<th>${d > 0 ? "↓" : "↑"}</th>`).join("")}</tr>` : ""}${rows
          .map(
            (r, i) =>
              `<tr>${r.map((s, j) => `<td data-at="${i}-${j}">${esc(s)}</td>`).join("")}</tr>`,
          )
          .join("")}</table></div>
        <div class="sr-btns">${auto ? "" : '<button type="button" class="btn big sr-yes" id="nx">Далі →</button>'}</div>
      </section>`;
      const cells = path.map(([i, j]) =>
        app.querySelector(`[data-at="${i}-${j}"]`),
      );
      const sw = stopwatch();
      const light = () => {
        cells.forEach((c, n) => {
          c.classList.toggle("now", n === at);
          c.classList.toggle("past", n < at);
        });
        cells[at].scrollIntoView({ block: "nearest", behavior: "smooth" });
        app.querySelector("#prog").textContent = `${at + 1} / ${cells.length}`;
      };
      const step = () => {
        if (++at >= cells.length)
          return endTimed(
            table,
            set,
            sw.ms(),
            plural(cells.length, ["склад", "склади", "складів"]),
            !auto,
          );
        light();
        if (auto) later(step, auto);
      };
      const nx = app.querySelector("#nx");
      if (nx) nx.onclick = step;
      app.querySelector("#quit").onclick = () => start(table);
      light();
      if (auto) later(step, auto);
    },
  };

  /* ================= «Клин» ================= */
  // the rows of a wedge light up one by one, down and then back up (faster); the halves of a word move apart row by row
  const wedge = {
    key: "wedge",
    ic: "🔺",
    title: "Клин",
    howto:
      "Дивись тільки на крапку посередині! Краєм ока побач обидві половинки і прочитай слово цілим. Спершу згори вниз, потім знизу вгору — швидше.",
    sets: BOOK.wedge || [],
    opts: () => [
      {
        k: "pace",
        lab: "Темп",
        vals: [
          ["3", "3 с"],
          ["2", "2 с"],
          ["1.5", "1,5 с"],
          ["1", "1 с"],
        ],
        def: "2",
      },
    ],
    play(set, o) {
      stopAll();
      wedge.last = o;
      const t = +o.pace * 1000;
      let wi = 0;
      const t0 = Date.now();
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <div class="sr-wedge" id="wg"></div>
        <p class="sr-tip" id="way"></p>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const wg = app.querySelector("#wg"),
        way = app.querySelector("#way");
      const run = () => {
        const W = set.wedges[wi];
        app.querySelector("#prog").textContent =
          `${wi + 1} / ${set.wedges.length}`;
        app.querySelector("#dots").innerHTML = dots(set.wedges.length, wi, []);
        wg.innerHTML = W.map((w, i) => {
          const [a, b] = w.split("-");
          return `<div class="sr-wrow" style="--gap:${0.3 + i * 0.55}em"><span class="l">${esc(a)}</span><i class="sr-dot"></i><span class="r">${esc(b)}</span></div>`;
        }).join("");
        const rowsEl = [...wg.children];
        // down at the chosen pace, then up a quarter faster
        const order = [
          ...rowsEl.map((r) => [r, t, "↓ Згори вниз"]),
          ...rowsEl
            .slice()
            .reverse()
            .map((r) => [r, t * 0.75, "↑ Знизу вгору — швидше!"]),
        ];
        let n = 0;
        const go = () => {
          rowsEl.forEach((r) => r.classList.remove("now"));
          if (n >= order.length) {
            if (++wi >= set.wedges.length)
              return endTimed(
                wedge,
                set,
                Date.now() - t0,
                plural(set.wedges.length, ["клин", "клини", "клинів"]),
                false,
              );
            return later(run, 600);
          }
          const [r, ms, w] = order[n++];
          r.classList.add("now");
          way.textContent = w;
          later(go, ms);
        };
        go();
      };
      app.querySelector("#quit").onclick = () => start(wedge);
      run();
    },
  };

  /* ================= «Зайве слово» ================= */
  // a column of 4: the same word 3 times and a look-alike once; tap the one that is different
  function oddColumns(set) {
    if (set.k === "book") return shuf(BOOK.odd || []);
    const L = ((window.CATCH || {}).levels || []).find((l) => l.k === set.k);
    const cols = [];
    for (const g of L ? L.groups : [])
      for (const w of g)
        if (g.length > 1) {
          const other = shuf(g.filter((x) => x !== w))[0];
          const c = [w, w, w];
          c.splice(Math.floor(Math.random() * 4), 0, other);
          cols.push(c);
        }
    return shuf(cols).slice(0, ROUND);
  }
  const odd = {
    key: "odd",
    ic: "🕵️",
    title: "Зайве слово",
    howto:
      "Прочитай стовпчик швидко. Одне слово не таке, як інші: торкнись його!",
    sets: [
      { k: "book", t: "З книжки · с. 20", sub: "рис · лис · рис · рис" },
      { k: "words", t: "Схожі слова", sub: "корова · корона" },
      { k: "end", t: "Закінчення", sub: "книга · книги" },
    ],
    play(set, o) {
      stopAll();
      odd.last = o;
      const cols = oddColumns(set);
      const n = cols.length,
        marks = [];
      let k = 0,
        right = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set, clockHTML)}
        <div class="sr-col" id="col"></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const col = app.querySelector("#col");
      const sw = stopwatch();
      const ask = () => {
        if (k >= n) {
          sw.stop();
          return end(odd, set, right, n, `Час: ${mmss(sw.ms())}`);
        }
        const c = cols[k],
          one = c.find((w) => c.filter((x) => x === w).length === 1);
        let tries = 0;
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
        col.innerHTML = c
          .map(
            (w, i) =>
              `<button type="button" class="opt big" data-i="${i}">${esc(w)}</button>`,
          )
          .join("");
        col.querySelectorAll(".opt").forEach(
          (b) =>
            (b.onclick = () => {
              if (c[+b.dataset.i] === one) {
                b.classList.add("right");
                col
                  .querySelectorAll(".opt")
                  .forEach((x) => (x.disabled = true));
                if (!tries) right++;
                marks.push(tries ? "late" : "on");
                say(one);
                k++;
                later(ask, 900);
              } else {
                tries++;
                b.classList.add("wrong");
                b.disabled = true;
              }
            }),
        );
      };
      app.querySelector("#quit").onclick = () => start(odd);
      ask();
    },
  };

  /* ================= «Від більшої до меншої» ================= */
  // the letters as printed, each its size: tap them from the biggest to the smallest (or back); they make the word
  const sizes = {
    key: "sizes",
    ic: "🔠",
    title: "Велика — маленька",
    howto:
      "Літери різного розміру. Торкайся їх по черзі: від найбільшої до найменшої (або навпаки) — і вийде слово!",
    sets: BOOK.sizes || [],
    play(set, o) {
      stopAll();
      sizes.last = o;
      const items = shuf(set.items).slice(0, ROUND);
      const n = items.length,
        marks = [];
      let k = 0,
        right = 0;
      app.innerHTML = `<section class="card sr-play">
        ${bar(set)}
        <p class="sr-tip">${set.dir === "down" ? "Від найбільшої до найменшої" : "Від найменшої до найбільшої"}</p>
        <div class="sr-letters" id="ls"></div>
        <div class="sr-slots" id="slots"></div>
        <div class="sr-dots" id="dots"></div>
      </section>`;
      const ls = app.querySelector("#ls"),
        slots = app.querySelector("#slots");
      const ask = () => {
        if (k >= n) return end(sizes, set, right, n);
        const it = items[k],
          L = it.w.length;
        let next = 0,
          tries = 0;
        app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
        app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
        // the size of a letter: the one read first is the biggest (p. 10) or the smallest (p. 28)
        const size = (r) => {
          const f = L > 1 ? r / (L - 1) : 0;
          return (set.dir === "down" ? 1 - f * 0.6 : 0.4 + f * 0.6).toFixed(2);
        };
        ls.innerHTML = [...it.p]
          .map(
            (c, i) =>
              `<button type="button" class="sr-big" data-r="${it.at[i]}" style="--z:${size(+it.at[i])}">${esc(c)}</button>`,
          )
          .join("");
        slots.innerHTML = "<i></i>".repeat(L);
        ls.querySelectorAll(".sr-big").forEach(
          (b) =>
            (b.onclick = () => {
              if (+b.dataset.r === next) {
                b.disabled = true;
                b.classList.add("used");
                slots.children[next].textContent = it.w[next];
                if (++next === L) {
                  slots.classList.add("done");
                  if (!tries) right++;
                  marks.push(tries ? "late" : "on");
                  say(it.w);
                  k++;
                  later(() => {
                    slots.classList.remove("done");
                    ask();
                  }, 1400);
                }
              } else {
                tries++;
                b.classList.remove("no");
                void b.offsetWidth;
                b.classList.add("no");
              }
            }),
        );
      };
      app.querySelector("#quit").onclick = () => start(sizes);
      ask();
    },
  };

  const GAMES = {
    flash,
    which,
    gaps,
    phrases,
    pics,
    schulte,
    table,
    wedge,
    odd,
    sizes,
  };
  if (GAMES[GAME]) start(GAMES[GAME]);
  if (GAME === "text") textPage(window.TEXT);

  /* ================= a text ================= */
  // Tabs: 📖 Читаю (the text with a stopwatch: words per minute, the best on this device; or the readings of T.readings,
  // each time kept), ❓ Питання (T.q), 🔎 Помилки (T.mist). «По реченню»: one sentence lights up at a time (Далі).
  function textPage(T) {
    const K = "sr-text-" + T.key;
    const lines = T.paras.flat();
    const words = lines
      .join(" ")
      .split(/\s+/)
      .filter((w) => /[\p{L}\d]/u.test(w)).length;
    const clock = (s) =>
      `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, "0")}`;
    const wpm = (s) => Math.round((words * 60) / Math.max(1, s));
    const TABS = [
      { k: "read", ic: "📖", t: "Читаю" },
      T.q && { k: "q", ic: "❓", t: "Питання" },
      T.mist && { k: "mist", ic: "🔎", t: "Помилки" },
    ].filter(Boolean);
    let tab = store.get(K + "-tab", "read");
    if (!TABS.some((t) => t.k === tab)) tab = "read";
    app.innerHTML = `<section class="card sr-textcard">
      ${links}
      <div class="sr-thead"><span class="sr-tic" aria-hidden="true">${esc(T.ic || "📖")}</span><h1 class="les-title">${esc(T.title)}</h1><span class="sr-count">${words} слів</span></div>
      <div class="tabbox">${TABS.length > 1 ? `<div class="ftabs sr-n${TABS.length}" role="group" aria-label="Що робимо">${TABS.map((t) => `<button type="button" data-tab="${t.k}" aria-pressed="${t.k === tab}"><span class="ti">${t.ic} </span>${esc(t.t)}</button>`).join("")}</div>` : ""}
      <div class="panel sr-pane" id="pane"></div></div>
    </section>`;
    document.title = `${T.title} · ${SUBJ}`;
    const pane = app.querySelector("#pane");
    const show = () => {
      stopAll();
      store.set(K + "-tab", tab);
      app
        .querySelectorAll("[data-tab]")
        .forEach((b) => b.setAttribute("aria-pressed", b.dataset.tab === tab));
      ({ read, q: questions, mist })[tab]();
    };
    app.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          show();
        }),
    );

    // the text: paragraphs of sentences; a dialogue: one line per speaker, in turn
    const textHTML = () => {
      let n = 0;
      return T.paras
        .map(
          (p, pi) =>
            `<p class="sr-para${T.dialog ? ` sr-role r${pi % 2}` : ""}">${T.dialog ? `<span class="sr-who">${esc(T.roles[pi % 2])}</span>` : ""}${p.map((l) => `<span class="sr-line" data-n="${n++}">${esc(l)}</span>`).join(" ")}</p>`,
        )
        .join("");
    };

    /* 📖 reading with a stopwatch */
    function read() {
      const R = T.readings;
      let mode = store.get(K + "-mode", "all"),
        ri = Math.min(+store.get(K + "-ri", 0) || 0, R ? R.length - 1 : 0);
      const times = () =>
        R ? JSON.parse(store.get(K + "-times", "[]") || "[]") : [];
      const best = () => +store.get(K + "-best", 0);
      pane.innerHTML = `<div class="opts-row center">
          <div class="og"><span class="lab">Як читаємо</span><div class="seg" role="group" aria-label="Як читаємо"><button type="button" data-m="all" aria-pressed="${mode === "all"}">Увесь текст</button><button type="button" data-m="line" aria-pressed="${mode === "line"}">По реченню</button></div></div>
          ${R ? `<div class="og"><span class="lab">Читання</span><div class="seg" role="group" aria-label="Читання">${R.map((_, i) => `<button type="button" data-r="${i}" aria-pressed="${i === ri}">${i + 1}</button>`).join("")}</div></div>` : ""}
        </div>
        ${R ? `<p class="sr-tip" id="tip"></p>` : ""}
        <div class="sr-btns sr-stick" id="btns"></div>
        <div class="sr-result" id="res"></div>
        <div class="sr-text${T.dialog ? " sr-dialog" : ""}" id="txt">${textHTML()}</div>`;
      const txt = pane.querySelector("#txt"),
        btns = pane.querySelector("#btns"),
        res = pane.querySelector("#res");
      let t0 = 0,
        at = 0,
        tick = 0;
      const results = () => {
        if (R) {
          const ts = times();
          res.innerHTML = `<div class="sr-times">${R.map((_, i) => `<span class="${i === ri ? "now" : ""}"><b>${i + 1}</b> ${ts[i] ? `⏱ ${clock(ts[i])}` : "—"}</span>`).join("")}</div>`;
          pane.querySelector("#tip").textContent = R[ri];
        } else
          res.innerHTML = best()
            ? `<p class="note">🏆 Рекорд: ${clock(best())} · ${wpm(best())} слів за хвилину</p>`
            : "";
      };
      const light = () =>
        txt.querySelectorAll(".sr-line").forEach((l) => {
          const n = +l.dataset.n;
          l.classList.toggle("now", mode === "line" && t0 > 0 && n === at);
          l.classList.toggle("past", mode === "line" && t0 > 0 && n < at);
        });
      const idle = () => {
        clearInterval(tick);
        t0 = 0;
        at = 0;
        txt.classList.add("wait"); // the text is blurred until ▶: the stopwatch measures the reading
        light();
        btns.innerHTML = `<button type="button" class="btn big sr-yes" id="go">▶ Почати читати</button>`;
        btns.querySelector("#go").onclick = run;
        results();
      };
      const run = () => {
        t0 = Date.now();
        txt.classList.remove("wait");
        light();
        btns.innerHTML = `<span class="sr-clock">⏱ <b id="clk">0:00</b></span>${mode === "line" ? '<button type="button" class="btn big" id="nx">Далі →</button>' : ""}<button type="button" class="btn ${mode === "line" ? "ghost" : "big sr-yes"}" id="done">■ Готово</button>`;
        tick = setInterval(() => {
          const c = btns.querySelector("#clk");
          if (c) c.textContent = clock((Date.now() - t0) / 1000);
        }, 250);
        timers.push(tick); // stopAll (another tab, leaving the page) stops the stopwatch
        const nx = btns.querySelector("#nx");
        if (nx)
          nx.onclick = () => {
            if (++at >= lines.length) return finish();
            light();
            const cur = txt.querySelector(`.sr-line[data-n="${at}"]`);
            if (cur)
              cur.scrollIntoView({ block: "nearest", behavior: "smooth" });
          };
        btns.querySelector("#done").onclick = finish;
      };
      const finish = () => {
        const s = (Date.now() - t0) / 1000;
        clearInterval(tick);
        let msg;
        if (R) {
          const ts = times();
          ts[ri] = s;
          store.set(K + "-times", JSON.stringify(ts));
          msg = `⏱ ${clock(s)} · ${wpm(s)} слів за хвилину`;
          if (ri < R.length - 1) store.set(K + "-ri", ++ri);
        } else {
          const b = best(),
            rec = !b || s < b;
          if (rec) store.set(K + "-best", s);
          msg = `⏱ ${clock(s)} · ${wpm(s)} слів за хвилину${rec ? " · 🏆 Новий рекорд!" : ""}`;
        }
        idle();
        res.insertAdjacentHTML(
          "afterbegin",
          `<p class="sr-score sr-wpm">${msg}</p>`,
        );
        if (R)
          pane
            .querySelectorAll("[data-r]")
            .forEach((b) =>
              b.setAttribute("aria-pressed", +b.dataset.r === ri),
            );
        say("Молодець!");
      };
      pane.querySelectorAll("[data-m]").forEach(
        (b) =>
          (b.onclick = () => {
            mode = b.dataset.m;
            store.set(K + "-mode", mode);
            pane
              .querySelectorAll("[data-m]")
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
            idle();
          }),
      );
      pane.querySelectorAll("[data-r]").forEach(
        (b) =>
          (b.onclick = () => {
            ri = +b.dataset.r;
            store.set(K + "-ri", ri);
            pane
              .querySelectorAll("[data-r]")
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
            idle();
          }),
      );
      idle();
    }

    /* ❓ questions: all on one page, the answers are pictures with words */
    function questions() {
      let right = 0,
        done = 0;
      pane.innerHTML = `<div class="sr-qs">${T.q
        .map(
          (it, i) => `<div class="sr-qitem" data-i="${i}">
          <p class="sr-qq"><b>${i + 1}.</b> ${esc(it.q)}${V.has() ? ` <button type="button" class="abtn sr-hear" data-say="${esc(it.q)}" aria-label="Послухати">🔊</button>` : ""}</p>
          <div class="opts two sr-opts">${shuf(it.o.map((o, k) => [...o, k]))
            .map(
              ([t, ic, k]) =>
                `<div class="optrow"><button type="button" class="opt" data-k="${k}"><span class="oic" aria-hidden="true">${esc(ic)}</span>${esc(t)}</button></div>`,
            )
            .join("")}</div></div>`,
        )
        .join("")}</div><p class="sr-score" id="qscore"></p>`;
      pane
        .querySelectorAll("[data-say]")
        .forEach((b) => (b.onclick = () => say(b.dataset.say)));
      pane.querySelectorAll(".sr-qitem").forEach((box) => {
        let tries = 0;
        box.querySelectorAll(".opt").forEach(
          (b) =>
            (b.onclick = () => {
              if (b.dataset.k === "0") {
                b.classList.add("right");
                box
                  .querySelectorAll(".opt")
                  .forEach((x) => (x.disabled = true));
                if (!tries) right++;
                say(T.q[+box.dataset.i].o[0][0]);
                if (++done === T.q.length)
                  pane.querySelector("#qscore").innerHTML =
                    `<b>${right}</b> з ${T.q.length} з першого разу`;
              } else {
                tries++;
                b.classList.add("wrong");
                b.disabled = true;
              }
            }),
        );
      });
    }

    /* 🔎 find the wrong word: tap it, or «Усе правильно» */
    function mist() {
      let right = 0,
        done = 0;
      pane.innerHTML = `<p class="howto">Порівняй з текстом. Торкнись слова, яке неправильне. Якщо все правильно, натисни ✓.</p>
        <div class="sr-qs">${T.mist
          .map(
            (it, i) => `<div class="sr-qitem sr-mist" data-i="${i}">
            <p class="sr-msent">${it.s
              .split(" ")
              .map(
                (w) =>
                  `<button type="button" class="sr-w" data-w="${esc(w.replace(/[.,!?:;…»«"]/g, ""))}">${esc(w)}</button>`,
              )
              .join(" ")}</p>
            <button type="button" class="btn ghost sr-allok">✓ Усе правильно</button>
            <p class="sr-fix" hidden></p></div>`,
          )
          .join("")}</div><p class="sr-score" id="mscore"></p>`;
      pane.querySelectorAll(".sr-mist").forEach((box) => {
        const it = T.mist[+box.dataset.i];
        let tries = 0;
        const fix = box.querySelector(".sr-fix");
        const solved = () => {
          box.querySelectorAll("button").forEach((x) => (x.disabled = true));
          if (!tries) right++;
          box.classList.add("ok");
          if (++done === T.mist.length)
            pane.querySelector("#mscore").innerHTML =
              `<b>${right}</b> з ${T.mist.length} з першого разу`;
        };
        const miss = (b) => {
          tries++;
          b.classList.add("no");
          later(() => b.classList.remove("no"), 500);
        };
        box.querySelectorAll(".sr-w").forEach(
          (b) =>
            (b.onclick = () => {
              if (it.bad && b.dataset.w === it.bad) {
                b.classList.add("bad");
                fix.hidden = false;
                fix.innerHTML = `У тексті: <b>${esc(it.fix)}</b>`;
                say(it.s.replace(it.bad, it.fix));
                solved();
              } else miss(b);
            }),
        );
        box.querySelector(".sr-allok").onclick = (e) => {
          if (!it.bad) {
            e.currentTarget.classList.add("right");
            fix.hidden = false;
            fix.textContent = "Так, у тексті саме так!";
            solved();
          } else miss(e.currentTarget);
        };
      });
    }

    show();
  }
})();
