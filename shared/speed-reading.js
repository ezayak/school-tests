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
    timers.forEach(clearTimeout);
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

  const GAMES = { flash, which, gaps, phrases, pics };
  if (GAMES[GAME]) start(GAMES[GAME]);
})();
