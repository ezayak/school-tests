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
//   colors «Сині літери» (p. 6): tap only the dark-blue letters of a row, in order → the word.
//   cross  «Закресли повтори» (p. 18): tap a repeated letter to cross it out everywhere; the ones left make two animals.
//   poem   «Носоріг» (p. 16): put the numbered words into the poem, then read it.
//   anagram «Анаграми» (p. 8, p. 22 with pictures) and mirror «Дзеркальні кубики» (p. 24): build the word from tiles (Kit.dragTiles).
//   circle «Стрілки по колу» (p. 26): follow the arrows round the letters, tap them in order.
//   split  «Роз’єднай слова» (p. 30): tap the last letter of each word of a sentence written without spaces.
//   hidden «Заховані слова» (p. 30): tap the first and last letter of each word hidden in a row.
//   lines  «Заплутані лінії» (p. 4): follow each number's tangled line (drawn new each time) to its letter.
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

  /* ================= Книжка, part 2: shared helpers ================= */
  // A round of items: html = the game's own part of the card; render(item, done) shows one item and calls
  // done(tries) when it is solved (tries = wrong taps; 0 = right the first time). Ends with the score screen.
  function rounds(g, set, o, items, html, render) {
    stopAll();
    g.last = o || {};
    const n = items.length,
      marks = [];
    let k = 0,
      right = 0;
    app.innerHTML = `<section class="card sr-play">${bar(set)}${html}<div class="sr-dots" id="dots"></div></section>`;
    const next = () => {
      if (k >= n) return end(g, set, right, n);
      app.querySelector("#prog").textContent = `${marks.length} / ${n}`;
      app.querySelector("#dots").innerHTML = dots(n, marks.length, marks);
      let over = false;
      render(items[k], (tries, wait = 1500) => {
        if (over) return;
        over = true;
        if (!tries) right++;
        marks.push(tries ? "late" : "on");
        k++;
        later(next, wait);
      });
    };
    app.querySelector("#quit").onclick = () => start(g);
    next();
  }
  // Tap letters in a fixed order: every [data-t] in box is a letter to tap; data-q = its place in the word (none = a wrong one).
  // The slots fill with the word's letters; done(tries) when the word is complete.
  function tapInOrder(box, slots, word, done) {
    let next = 0,
      tries = 0;
    slots.classList.remove("done");
    slots.innerHTML = "<i></i>".repeat(word.length);
    box.querySelectorAll("[data-t]").forEach(
      (b) =>
        (b.onclick = () => {
          if (b.classList.contains("used")) return;
          if (b.dataset.q !== undefined && +b.dataset.q === next) {
            b.classList.add("used");
            slots.children[next].textContent = word[next];
            if (++next === word.length) {
              slots.classList.add("done");
              say(word);
              done(tries);
            }
          } else {
            tries++;
            b.classList.remove("no");
            void b.offsetWidth;
            b.classList.add("no");
          }
        }),
    );
  }
  // words for the made-up rounds: the book's words of 5–7 letters
  const bookWords = () =>
    [
      ...new Set([
        ...(BOOK.colors || []).map((r) => r.w),
        ...(BOOK.lines || []).map((r) => r.w),
        ...((BOOK.sizes || [])[1] || { items: [] }).items.map((r) => r.w),
      ]),
    ].filter((w) => w.length >= 5 && w.length <= 7);

  /* ================= «Сині літери» ================= */
  const colors = {
    key: "colors",
    ic: "🔵",
    title: "Сині літери",
    howto:
      "Літери різних кольорів. Читай тільки темно-сині! Торкайся їх по черзі зліва направо — і вийде слово.",
    sets: [{ k: "book", t: "З книжки · с. 6", sub: "ВНІКУНЛО → вікно" }],
    play(set, o) {
      rounds(
        colors,
        set,
        o,
        shuf(BOOK.colors || []),
        `<p class="sr-tip">Тільки такі літери: <span class="sr-cl c-n">А</span></p><div class="sr-letters sr-row" id="ls"></div><div class="sr-slots" id="slots"></div>`,
        (it, done) => {
          let q = 0;
          const ls = app.querySelector("#ls");
          ls.innerHTML = [...it.p]
            .map(
              (ch, i) =>
                `<button type="button" class="sr-cl c-${it.c[i]}" data-t${it.c[i] === "n" ? ` data-q="${q++}"` : ""}>${esc(ch)}</button>`,
            )
            .join("");
          tapInOrder(ls, app.querySelector("#slots"), it.w, done);
        },
      );
    },
  };

  /* ================= «Закресли повтори» ================= */
  // tap a letter: if it is in the grid more than once, all of it is crossed out; the letters left, read from the top, make the words
  const cross = {
    key: "cross",
    ic: "❌",
    title: "Закресли повтори",
    howto:
      "Торкнись літери, яка повторюється — її закреслить усюди. Залиш тільки ті, що є один раз. З них склади слова і знайди їхні картинки!",
    sets: [{ k: "book", t: "З книжки · с. 18", sub: "8 рядків по 10 літер" }],
    play(set, o) {
      const C = BOOK.cross;
      rounds(
        cross,
        set,
        o,
        [C],
        `<div class="sr-grid" id="grid"></div><p class="sr-tip" id="msg"></p><div class="sr-slots" id="left"></div><div class="choices sr-animals" id="pics" hidden></div>`,
        (it, done) => {
          const all = it.rows.join("");
          const many = new Set([...all].filter((c) => all.split(c).length > 2));
          const grid = app.querySelector("#grid"),
            msg = app.querySelector("#msg");
          let tries = 0;
          grid.innerHTML = it.rows
            .map((r) =>
              [...r]
                .map(
                  (ch) =>
                    `<button type="button" class="sr-gc" data-c="${esc(ch)}">${esc(ch)}</button>`,
                )
                .join(""),
            )
            .join("");
          msg.textContent = "Закресли всі літери, які повторюються.";
          const pics = () => {
            const box = app.querySelector("#pics");
            box.hidden = false;
            msg.textContent =
              "Прочитай літери згори вниз. Які тварини тут сховалися? Торкнись їх!";
            app.querySelector("#left").innerHTML = [...all]
              .filter((c) => !many.has(c))
              .map((c) => `<i>${esc(c)}</i>`)
              .join("");
            let found = 0;
            box.innerHTML = shuf(it.pics)
              .map(
                ([w, ic]) =>
                  `<button type="button" class="choice sr-animal" data-w="${esc(w)}"><span class="sr-ic">${esc(ic)}</span><b>${esc(w)}</b></button>`,
              )
              .join("");
            box.querySelectorAll(".choice").forEach(
              (b) =>
                (b.onclick = () => {
                  if (it.words.includes(b.dataset.w)) {
                    b.classList.add("right");
                    b.disabled = true;
                    say(b.dataset.w);
                    if (++found === it.words.length) done(tries, 2500);
                  } else {
                    tries++;
                    b.classList.add("wrong");
                    b.disabled = true;
                  }
                }),
            );
          };
          grid.querySelectorAll(".sr-gc").forEach(
            (b) =>
              (b.onclick = () => {
                const c = b.dataset.c;
                if (b.classList.contains("gone")) return;
                if (many.has(c)) {
                  grid
                    .querySelectorAll(`[data-c="${c}"]`)
                    .forEach((x) => x.classList.add("gone"));
                  const left = [
                    ...grid.querySelectorAll(".sr-gc:not(.gone)"),
                  ].filter((x) => many.has(x.dataset.c));
                  if (!left.length) {
                    grid
                      .querySelectorAll(".sr-gc:not(.gone)")
                      .forEach((x) => x.classList.add("keep"));
                    pics();
                  }
                } else {
                  // a letter that is there once stays: no mistake to tap it, it is marked
                  b.classList.add("keep");
                }
              }),
          );
        },
      );
    },
  };

  /* ================= «Носоріг» ================= */
  // the poem with numbered gaps; the gap lights up, tap the word with that number (or, harder, without numbers)
  const poem = {
    key: "poem",
    ic: "🦏",
    title: "Носоріг",
    howto:
      "У вірші замість слів — цифри. Знайди слово з такою цифрою і встав його. Потім прочитай увесь вірш!",
    sets: [{ k: "book", t: "З книжки · с. 16", sub: "Е. Звоницький" }],
    opts: () => [
      {
        k: "num",
        lab: "Слова",
        vals: [
          ["1", "з цифрами"],
          ["0", "без цифр"],
        ],
        def: "1",
      },
    ],
    play(set, o) {
      const P = BOOK.poem;
      rounds(
        poem,
        set,
        o,
        [P],
        `<div class="sr-poem"><h2 class="sr-ptitle">${esc(P.title)}</h2><div id="lines"></div><p class="note">${esc(P.author)}</p></div><div class="sr-wordlist" id="words"></div><div class="sr-btns" id="btns"></div>`,
        (it, done) => {
          let at = 1,
            tries = 0;
          const nums = o.num !== "0";
          const lines = app.querySelector("#lines"),
            words = app.querySelector("#words");
          const draw = () => {
            lines.innerHTML = it.lines
              .map(
                (l) =>
                  `<p class="sr-pl">${esc(l).replace(/\{(\d)\}/g, (_, n) => (+n < at ? `<b class="sr-in">${esc(it.words[n - 1])}</b>` : `<span class="sr-num${+n === at ? " now" : ""}">${n}</span>`))}</p>`,
              )
              .join("");
          };
          const order = nums
            ? it.words.map((w, i) => [w, i + 1])
            : shuf(it.words.map((w, i) => [w, i + 1]));
          words.innerHTML = order
            .map(
              ([w, n]) =>
                `<button type="button" class="opt" data-n="${n}">${nums ? `<b class="sr-wn">${n}</b> ` : ""}${esc(w)}</button>`,
            )
            .join("");
          words.querySelectorAll(".opt").forEach(
            (b) =>
              (b.onclick = () => {
                if (+b.dataset.n === at) {
                  b.disabled = true;
                  b.classList.add("right");
                  at++;
                  draw();
                  if (at > it.words.length) {
                    const hear = V.has()
                      ? '<button type="button" class="btn ghost" id="hear">🔊 Послухати вірш</button>'
                      : "";
                    app.querySelector("#btns").innerHTML =
                      `${hear}<button type="button" class="btn big sr-yes" id="ok">✓ Прочитав увесь вірш</button>`;
                    const h = app.querySelector("#hear");
                    if (h)
                      h.onclick = () =>
                        say(
                          it.lines
                            .map((l) =>
                              l.replace(/\{(\d)\}/g, (_, n) => it.words[n - 1]),
                            )
                            .join(" "),
                        );
                    app.querySelector("#ok").onclick = () => done(tries, 300);
                  }
                } else {
                  tries++;
                  b.classList.remove("wrong");
                  void b.offsetWidth;
                  b.classList.add("wrong");
                }
              }),
          );
          draw();
        },
      );
    },
  };

  /* ================= «Анаграми» and «Дзеркальні кубики»: build the word from letter tiles (Kit.dragTiles) ================= */
  // shows the tiles in box (a .line and a .bank), checks when the bank is empty; done(tries) when the word is right
  function buildWord(box, word, done) {
    box.innerHTML =
      '<div class="line sr-line-w" id="L"></div><div class="bank sr-bank" id="B"></div>';
    const L = box.querySelector("#L");
    let tries = 0;
    let letters = shuf([...word]);
    if (letters.join("") === word && word.length > 1)
      letters = [...letters.slice(1), letters[0]];
    const T = Kit.dragTiles(
      L,
      box.querySelector("#B"),
      letters.map((t) => ({ t })),
      {
        cls: "letter",
        ph: "Склади слово тут",
        onChange: (line, bank) => {
          L.classList.remove("ok", "no");
          if (bank.length) return;
          if (line.map((x) => x.t).join("") === word) {
            L.classList.add("ok");
            T.lock();
            say(word);
            done(tries);
          } else {
            tries++;
            L.classList.add("no");
          }
        },
      },
    );
    T.draw();
  }
  const anagram = {
    key: "anagram",
    ic: "🔀",
    title: "Анаграми",
    howto:
      "Літери в слові переплуталися. Переставляй їх (торкнись або перетягни), щоб вийшло справжнє слово!",
    sets: BOOK.anagrams || [],
    opts: (set) =>
      set.k === "p22"
        ? [
            {
              k: "pic",
              lab: "Картинка",
              vals: [
                ["1", "одразу"],
                ["0", "після"],
              ],
              def: "1",
            },
          ]
        : [],
    play(set, o) {
      rounds(
        anagram,
        set,
        o,
        shuf(set.items),
        `<div class="sr-qbox"><img class="sr-img" id="img" alt="" hidden><p class="sr-q sr-scr" id="scr"></p></div><div class="sr-build" id="build"></div>`,
        ([p, w, img], done) => {
          const im = app.querySelector("#img");
          app.querySelector("#scr").textContent = p;
          im.hidden = !(img && o.pic !== "0");
          if (img) im.src = img;
          buildWord(app.querySelector("#build"), w, (t) => {
            im.hidden = !img;
            done(t);
          });
        },
      );
    },
  };
  const mirror = {
    key: "mirror",
    ic: "🪞",
    title: "Дзеркальні кубики",
    howto:
      "На кубиках літери як у дзеркалі. Прочитай слово і склади його з правильних літер!",
    sets: [
      { k: "book", t: "З книжки · с. 24", sub: "бук · сир · вовк" },
      { k: "more", t: "Ще слова", sub: "слова з книжки" },
    ],
    play(set, o) {
      const items =
        set.k === "book"
          ? shuf(BOOK.mirror || [])
          : shuf(bookWords())
              .slice(0, 8)
              .map((w) => ({ w, c: Kit.pick(["r", "y", "b", "p", "g"]) }));
      rounds(
        mirror,
        set,
        o,
        items,
        `<div class="sr-qbox"><div class="sr-cubes" id="cubes"></div><span class="sr-ic" id="ic" hidden></span></div><div class="sr-build" id="build"></div>`,
        (it, done) => {
          const ic = app.querySelector("#ic");
          ic.hidden = true;
          ic.textContent = it.ic || "";
          app.querySelector("#cubes").innerHTML = [...it.w]
            .map(
              (ch) =>
                `<span class="sr-cube k-${it.c}"><span class="sr-mir">${esc(ch.toUpperCase())}</span></span>`,
            )
            .join("");
          buildWord(app.querySelector("#build"), it.w, (t) => {
            ic.hidden = !it.ic;
            done(t);
          });
        },
      );
    },
  };

  /* ================= «Стрілки по колу» ================= */
  // letters on a circle, arrows from one to the next: follow them with the eyes and tap the letters in that order
  function ringSVG(n, path, cls) {
    // node j sits clockwise from the top left (two at the top, as in the book)
    const pos = (j) => {
      const a = ((-90 - 180 / n + (360 / n) * j) * Math.PI) / 180;
      return [50 + 38 * Math.cos(a), 50 + 38 * Math.sin(a)];
    };
    const arrows = path
      .slice(0, -1)
      .map((j, i) => {
        const [x1, y1] = pos(j),
          [x2, y2] = pos(path[i + 1]);
        const d = Math.hypot(x2 - x1, y2 - y1),
          r = 9 / d;
        return `<line x1="${(x1 + (x2 - x1) * r).toFixed(1)}" y1="${(y1 + (y2 - y1) * r).toFixed(1)}" x2="${(x2 - (x2 - x1) * r).toFixed(1)}" y2="${(y2 - (y2 - y1) * r).toFixed(1)}" marker-end="url(#ah-${cls})"/>`;
      })
      .join("");
    return {
      pos,
      svg: `<svg class="sr-arrows ${cls}" viewBox="0 0 100 100" aria-hidden="true"><defs><marker id="ah-${cls}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z"/></marker></defs>${arrows}</svg>`,
    };
  }
  const circle = {
    key: "circle",
    ic: "🔄",
    title: "Стрілки по колу",
    howto:
      "Літери стоять по колу. Стеж за стрілками тільки очима і торкайся літер по черзі — вийде слово!",
    sets: [
      { k: "book", t: "З книжки · с. 26", sub: "веселка · Україна" },
      { k: "more", t: "Ще слова", sub: "слова з книжки" },
    ],
    play(set, o) {
      const items =
        set.k === "book"
          ? BOOK.circles || []
          : shuf(bookWords())
              .slice(0, 8)
              .map((w) => {
                // the word's letters on random places of the ring
                const spots = shuf([...Array(w.length).keys()]);
                const ring = [];
                spots.forEach((s, i) => (ring[s] = w[i].toUpperCase()));
                return { w, ring: ring.join(""), path: spots };
              });
      rounds(
        circle,
        set,
        o,
        items,
        `<div class="sr-ring" id="ring"></div><div class="sr-slots" id="slots"></div>`,
        (it, done) => {
          const n = it.ring.length,
            cls = Kit.pick(["a", "b"]);
          const R = ringSVG(n, it.path, cls);
          const ring = app.querySelector("#ring");
          ring.innerHTML =
            R.svg +
            [...it.ring]
              .map((ch, j) => {
                const [x, y] = R.pos(j);
                return `<button type="button" class="sr-node ${cls}" style="left:${x}%;top:${y}%" data-t data-q="${it.path.indexOf(j)}">${esc(ch)}</button>`;
              })
              .join("");
          tapInOrder(ring, app.querySelector("#slots"), it.w, done);
        },
      );
    },
  };

  /* ================= «Роз’єднай слова» ================= */
  // the sentence without spaces; tap the last letter of each word, a gap opens after it
  const split = {
    key: "split",
    ic: "✂️",
    title: "Роз’єднай слова",
    howto:
      "Слова злиплися! Торкнись останньої літери кожного слова — між словами з’явиться проміжок. Потім прочитай речення.",
    sets: [
      { k: "book", t: "З книжки · с. 30", sub: "Бджілкабриніланадквіткою." },
    ],
    play(set, o) {
      rounds(
        split,
        set,
        o,
        shuf(BOOK.split || []),
        `<p class="sr-glued" id="glued"></p>`,
        (s, done) => {
          const chars = [],
            cuts = new Set();
          for (const ch of s) {
            if (ch === " ") cuts.add(chars.length - 1);
            else chars.push(ch);
          }
          const box = app.querySelector("#glued");
          let tries = 0,
            found = 0;
          box.innerHTML = chars
            .map(
              (ch, i) =>
                `<button type="button" class="sr-ch" data-i="${i}">${esc(ch)}</button>`,
            )
            .join("");
          box.querySelectorAll(".sr-ch").forEach(
            (b) =>
              (b.onclick = () => {
                const i = +b.dataset.i;
                if (b.classList.contains("cut")) return;
                if (cuts.has(i)) {
                  b.classList.add("cut");
                  if (++found === cuts.size) {
                    box.classList.add("done");
                    say(s);
                    done(tries, 2600);
                  }
                } else {
                  tries++;
                  b.classList.remove("no");
                  void b.offsetWidth;
                  b.classList.add("no");
                }
              }),
          );
        },
      );
    },
  };

  /* ================= «Заховані слова» ================= */
  // a row of letters with 3 words in it: tap the first and the last letter of a word to circle it
  const hidden = {
    key: "hidden",
    ic: "🔎",
    title: "Заховані слова",
    howto:
      "У рядку сховалися слова. Знайди слово і торкнись його першої та останньої літери — воно обведеться. У кожному рядку три слова!",
    sets: [{ k: "book", t: "З книжки · с. 30", sub: "…АСЛОНІГМАСКА…" }],
    play(set, o) {
      rounds(
        hidden,
        set,
        o,
        (BOOK.hidden || []).slice(),
        `<p class="sr-hrow" id="row"></p><div class="sr-found" id="found"></div>`,
        (it, done) => {
          const box = app.querySelector("#row"),
            fl = app.querySelector("#found");
          const got = new Set();
          let a = -1,
            tries = 0;
          box.innerHTML = [...it.p]
            .map(
              (ch, i) =>
                `<button type="button" class="sr-ch" data-i="${i}">${esc(ch)}</button>`,
            )
            .join("");
          const cells = [...box.children];
          const list = () =>
            (fl.innerHTML = it.w
              .map((w) =>
                got.has(w)
                  ? `<span class="ok">${esc(w.toLowerCase())}</span>`
                  : `<span>${"_ ".repeat(w.length).trim()}</span>`,
              )
              .join(""));
          list();
          cells.forEach(
            (b) =>
              (b.onclick = () => {
                const i = +b.dataset.i;
                if (a < 0) {
                  a = i;
                  b.classList.add("sel");
                  return;
                }
                const [x, y] = a < i ? [a, i] : [i, a];
                cells[a].classList.remove("sel");
                a = -1;
                const w = it.p.slice(x, y + 1);
                if (x !== y && it.w.includes(w) && !got.has(w)) {
                  got.add(w);
                  for (let j = x; j <= y; j++)
                    cells[j].classList.add(
                      "in",
                      ...(j === x ? ["s"] : []),
                      ...(j === y ? ["e"] : []),
                    );
                  say(w.toLowerCase());
                  list();
                  if (got.size === it.w.length) done(tries, 1800);
                } else if (x !== y) {
                  tries++;
                  box.classList.remove("no");
                  void box.offsetWidth;
                  box.classList.add("no");
                }
              }),
          );
        },
      );
    },
  };

  /* ================= «Заплутані лінії» ================= */
  // numbers at the top, letters at the bottom, tangled lines between them (drawn new each time):
  // follow the line of 1, 2, 3… with the eyes and tap the letter where it ends
  function tangle(n) {
    const xs = (i) => 50 + (i * 500) / Math.max(1, n - 1);
    // a smooth line through the points (Catmull-Rom as cubic Bézier)
    const smooth = (P) =>
      P.map((p, i) => {
        if (!i) return `M${p[0].toFixed(0)} ${p[1]}`;
        const p0 = P[i - 2] || P[i - 1],
          p1 = P[i - 1],
          p3 = P[i + 1] || p;
        const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6],
          c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
        return `C${c1[0].toFixed(0)} ${c1[1].toFixed(0)} ${c2[0].toFixed(0)} ${c2[1].toFixed(0)} ${p[0].toFixed(0)} ${p[1]}`;
      }).join(" ");
    const R = () => 30 + Math.random() * 540;
    return {
      xs,
      line: (i, j) =>
        smooth([
          [xs(i), 46],
          [R(), 120],
          [R(), 200],
          [R(), 280],
          [xs(j), 352],
        ]),
    };
  }
  const lines = {
    key: "lines",
    ic: "🧶",
    title: "Заплутані лінії",
    howto:
      "Від кожної цифри йде лінія до літери. Стеж за лінією тільки очима! Знайди, куди веде 1, потім 2, 3… — і прочитай слово.",
    sets: [{ k: "book", t: "З книжки · с. 4", sub: "1 2 3 → У А И" }],
    play(set, o) {
      rounds(
        lines,
        set,
        o,
        (BOOK.lines || []).map((l, i) =>
          i ? { w: l.w, low: shuf([...l.w.toUpperCase()]).join("") } : l,
        ),
        `<p class="sr-find">Куди веде <b id="want">1</b>?</p><div class="sr-tangle" id="tangle"></div><div class="sr-slots" id="slots"></div>`,
        (it, done) => {
          const W = it.w.toUpperCase(),
            n = W.length,
            T = tangle(n);
          // the bottom place of each number's letter (a letter twice: each number gets its own place)
          const used = new Set(),
            to = [...W].map((ch) => {
              const j = [...it.low].findIndex(
                (c, k) => c === ch && !used.has(k),
              );
              used.add(j);
              return j;
            });
          const tg = app.querySelector("#tangle");
          tg.innerHTML = `<svg viewBox="0 0 600 400" class="sr-tsvg" aria-hidden="true">${to.map((j, i) => `<path d="${T.line(i, j)}" data-l="${i}"/>`).join("")}${[...Array(n).keys()].map((i) => `<circle cx="${T.xs(i)}" cy="26" r="24"/><text x="${T.xs(i)}" y="36">${i + 1}</text>`).join("")}</svg>${[...it.low].map((ch, j) => `<button type="button" class="sr-low" style="left:${(T.xs(j) / 600) * 100}%" data-t data-q="${to.indexOf(j)}">${esc(ch)}</button>`).join("")}`;
          const want = app.querySelector("#want");
          want.textContent = "1";
          const slots = app.querySelector("#slots");
          tapInOrder(tg, slots, it.w, done);
          // a solved line turns green, the next number shows
          tg.querySelectorAll("[data-t]").forEach((b) =>
            b.addEventListener("click", () => {
              if (!b.classList.contains("used")) return;
              const k = +b.dataset.q;
              const p = tg.querySelector(`[data-l="${k}"]`);
              if (p) p.classList.add("ok");
              want.textContent = k + 2 <= n ? String(k + 2) : "✓";
            }),
          );
        },
      );
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
    colors,
    cross,
    poem,
    anagram,
    mirror,
    circle,
    split,
    hidden,
    lines,
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
