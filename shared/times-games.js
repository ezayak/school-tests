// Times-table games, shared by the Optima math lessons (shared/math-uk.js, Ukrainian) and the Grade 4 Math
// "Multiplication games" page (grade-4/math/times/, English). Styles: shared/times-games.css (+ lesson.css, math.css).
//   🎲 mix:    the examples in random order, the answer typed on the number pad, ✓ Check.
//   🚀 rocket: a rocket flies across with an example; tap the right answer of 4 before it is gone → it explodes.
//   🧠 memory: cards face down, an example and its answer are a pair; only the steps (two cards turned = one step) are counted.
//   🔗 match:  the examples and their answers (mixed up); tap one of each to join them.
//              check "end": join them all, then ✓ Check;  check "now": a right pair disappears, a wrong one is red for 2 seconds.
// Mix, rocket and match end with the score, a reaction (90 % and more right 🎆 fireworks, 70 % and more 👍, less 😢) and the list of mistakes.
//
// const G = TimesGames({app, lang: "uk" | "en", key: "mu-om3-l4", onBack, home: "До уроку", back: "← До вправ"});
// G.mix(game), G.rocket(game), G.memory(game), G.match(game), G.setup(tile), G.best(id), G.steps(id);
// TimesGames.table(n, from, to, sign) / TimesGames.divTable(n, from, to, sign) make the examples.
// game: {id, ic, t, facts: [{t: "4 · 7", v: 28, n: 4}], count, lives, pairs, check}
//   id:    the best score is saved under key + "-best" → {id: right answers}; memory: key + "-steps" → {id: fewest steps}
//   count: mix only — ask that many of the facts, picked at random (no count = all of them)
//   lives: rocket only — the game ends after that many mistakes (no lives = it goes through all the facts)
//   pairs: memory and match — that many of the facts, picked at random, different answers first
//   check: match only — "end" or "now" (see above)
// A tile with choices (how many pairs, which mode): G.setup({id, ic, t, intro, ask: [{k, t, opts: [{v, t}]}], make(choice)})
//   shows its start screen; make({k: v, …}) returns the game to play. The last choices are saved under key + "-opt" → {id: choice}.
(function () {
  "use strict";
  const T = {
    uk: {
      answer: "Відповідь",
      say: "Прочитати",
      type: "Впиши відповідь.",
      right: "✓ Правильно!",
      no: "Ні",
      next: "Далі →",
      check: "✓ Перевірити",
      intro:
        "Ракета летить із прикладом. Натисни правильну відповідь, поки вона не відлетіла, — і ракета вибухне!",
      lives: (n) => `Гра закінчиться після ${n} помилок.`,
      speed: "Швидкість",
      slow: "🐢 Повільно",
      fast: "🐇 Швидко",
      start: "🚀 Старт",
      gone: "Ракета відлетіла",
      hit: "💥 Влучив!",
      of: "з",
      great: "Чудово!",
      good: "Добре! Ще трохи — і буде відмінно.",
      sad: "Не засмучуйся, спробуй ще раз!",
      over: (n) => `Гру закінчено: ${n} помилок.`,
      done: (n) => `Усі ${n} прикладів!`,
      mistakes: "Помилки",
      yours: "твоя відповідь",
      flew: "ракета відлетіла",
      none: "Жодної помилки! 🎉",
      again: "🔁 Ще раз",
      start: "▶ Почати",
      record: "Рекорд",
      card: "Картка",
      memIntro: "Знайди пари: приклад і його відповідь. Відкрий дві картки.",
      steps: "Кроки",
      nSteps: (n) =>
        `${n} ${n % 10 === 1 && n % 100 !== 11 ? "крок" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "кроки" : "кроків"}`,
      memDone: (p) => `Усі ${p} пар знайдено!`,
      newBest: "Новий рекорд! 🏆",
      bestSteps: (s) => `Рекорд: ${s}`,
      endIntro:
        "З’єднай кожен приклад із відповіддю: натисни приклад, потім відповідь. Потім ✓ Перевірити.",
      nowIntro: "Натисни приклад, потім його відповідь. Правильна пара зникне.",
      sums: "Приклади",
      answers: "Відповіді",
      result: "Результат →",
      voice: "uk-UA",
      words: {
        "·": " помножити на ",
        ":": " поділити на ",
        "=": " дорівнює ",
        "×": " помножити на ",
        "÷": " поділити на ",
      },
    },
    en: {
      answer: "Answer",
      say: "Read aloud",
      type: "Type the answer.",
      right: "✓ Right!",
      no: "No",
      next: "Next →",
      check: "✓ Check",
      intro:
        "A rocket flies across with a sum. Tap the right answer before it is gone — and the rocket explodes!",
      lives: (n) => `The game ends after ${n} mistakes.`,
      speed: "Speed",
      slow: "🐢 Slow",
      fast: "🐇 Fast",
      start: "🚀 Start",
      gone: "The rocket flew away",
      hit: "💥 Hit!",
      of: "of",
      great: "Great!",
      good: "Good! A little more and it will be excellent.",
      sad: "Don't be sad, try again!",
      over: (n) => `Game over: ${n} mistakes.`,
      done: (n) => `All ${n} sums!`,
      mistakes: "Mistakes",
      yours: "your answer",
      flew: "the rocket flew away",
      none: "No mistakes! 🎉",
      again: "🔁 Play again",
      start: "▶ Start",
      record: "Best",
      card: "Card",
      memIntro: "Find the pairs: a sum and its answer. Turn over two cards.",
      steps: "Steps",
      nSteps: (n) => `${n} ${n === 1 ? "step" : "steps"}`,
      memDone: (p) => `All ${p} pairs found!`,
      newBest: "New best! 🏆",
      bestSteps: (s) => `Best: ${s}`,
      endIntro:
        "Join each sum to its answer: tap a sum, then an answer. Then ✓ Check.",
      nowIntro: "Tap a sum, then its answer. A right pair disappears.",
      sums: "Sums",
      answers: "Answers",
      result: "Result →",
      voice: "en-US",
      words: {
        "×": " times ",
        "·": " times ",
        ":": " divided by ",
        "÷": " divided by ",
        "=": " equals ",
      },
    },
  };
  const SPEED = { slow: 12, fast: 7 }; // seconds for the rocket to cross
  // the marks of joined pairs in 🔗 match "end" (one per example, up to 12)
  const MARKS = [
    "🍎",
    "🍌",
    "🍇",
    "🍓",
    "🥕",
    "🌽",
    "🍋",
    "🍉",
    "🍒",
    "🥝",
    "🍐",
    "🍑",
  ];

  function TimesGames(o) {
    const { esc } = Kit;
    const S = T[o.lang] || T.en;
    const app = o.app;
    const V = Kit.voice(S.voice);
    const store = {
      get(k, d) {
        try {
          const v = localStorage.getItem(k);
          return v === null ? d : JSON.parse(v);
        } catch (e) {
          return d;
        }
      },
      set(k, v) {
        try {
          localStorage.setItem(k, JSON.stringify(v));
        } catch (e) {}
      },
    };
    const best = store.get(o.key + "-best", {});
    const fewest = store.get(o.key + "-steps", {});
    const spoken = (t) =>
      String(t)
        .replace(/[·×÷:=]/g, (c) => S.words[c])
        .replace(/\s+/g, " ");
    const top0 = () => window.scrollTo({ top: 0 });
    // the keys of the computer: digits, Backspace, Enter (only while a game screen is on)
    let keyFn = null;
    document.addEventListener("keydown", (e) => {
      if (!keyFn) return;
      if (/^[0-9]$/.test(e.key)) keyFn(e.key);
      else if (e.key === "Backspace" || e.key === "Delete") keyFn("del");
      else if (e.key === "Enter") keyFn("next");
      else return;
      e.preventDefault();
    });
    function leave() {
      V.hush();
      keyFn = null;
    }
    const hud = (t, count) =>
      `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="${esc(o.home)}">←</button><span class="qnum">${esc(t)}</span>${count ? `<span class="count">${count}</span>` : ""}</div>`;
    const bindHome = () =>
      (document.getElementById("homeBtn").onclick = () => {
        leave();
        o.onBack();
      });
    const padHTML = () =>
      `<div class="mx-pad tg-pad" role="group" aria-label="${esc(S.answer)}">${[
        1, 2, 3, 4, 5, 6, 7, 8, 9,
      ]
        .map((d) => `<button type="button" data-k="${d}">${d}</button>`)
        .join(
          "",
        )}<button type="button" data-k="del" class="del" aria-label="⌫">⌫</button><button type="button" data-k="0">0</button><button type="button" data-k="next" class="nx" aria-label="↵">↵</button></div>`;
    const shuffle = TimesGames.shuffle;
    // 3 wrong answers close to the right one: a neighbour in the table (± n), ±1, ±2, +10
    function options(f) {
      const n = f.n || 2;
      const near = shuffle(
        [f.v + n, f.v - n, f.v + 1, f.v - 1, f.v + 2, f.v - 2, f.v + 10].filter(
          (x) => x > 0 && x !== f.v,
        ),
      );
      return shuffle([f.v, ...[...new Set(near)].slice(0, 3)]);
    }
    // n of the facts at random, different answers first (🎲 Random can have two sums with one answer)
    function pickPairs(facts, n) {
      const seen = new Set();
      const first = [];
      const rest = [];
      for (const f of shuffle(facts)) {
        if (seen.has(f.v)) rest.push(f);
        else {
          seen.add(f.v);
          first.push(f);
        }
      }
      return [...first, ...rest].slice(0, n || facts.length);
    }
    const fireworks = () =>
      `<div class="tg-fws" aria-hidden="true">${[0, 1, 2, 3, 4].map((i) => `<div class="tg-fw f${i}">${Array.from({ length: 12 }, (_, j) => `<i style="--a:${j * 30}deg"></i>`).join("")}</div>`).join("")}</div>`;
    const navHTML = () =>
      `<div class="tg-nav"><button type="button" class="btn ghost" id="backBtn">${esc(o.back)}</button><button type="button" class="btn" id="againBtn">${esc(S.again)}</button></div>`;
    function bindNav(g, again) {
      bindHome();
      document.getElementById("backBtn").onclick = () => {
        leave();
        o.onBack();
      };
      document.getElementById("againBtn").onclick = () => again(g);
      top0();
    }

    // the end of a game: the score, a reaction, the mistakes
    function result(g, again, right, total, wrong, lost) {
      leave();
      if (best[g.id] === undefined || right > best[g.id]) {
        best[g.id] = right;
        store.set(o.key + "-best", best);
      }
      const share = total ? right / total : 0;
      const mood =
        share >= 0.9
          ? { ic: "🎆", t: S.great, c: "fw" }
          : share >= 0.7
            ? { ic: "👍", t: S.good, c: "up" }
            : { ic: "😢", t: S.sad, c: "cry" };
      app.innerHTML = `${hud(`${g.ic} ${g.t}`, "")}<section class="card pop tg-res">
    ${mood.c === "fw" ? fireworks() : ""}
    <div class="tg-mood ${mood.c}" aria-hidden="true">${mood.ic}</div>
    <h2 class="tg-score">${right} ${S.of} ${total}</h2>
    <p class="tg-rt">${lost ? `${esc(S.over(wrong.length))}<br>` : g.lives ? `${esc(S.done(total))}<br>` : ""}${esc(mood.t)}</p>
    ${
      wrong.length
        ? `<div class="tg-box tg-wrong"><b>${esc(S.mistakes)}</b>${wrong.map((w) => `<p><span class="tg-expr">${esc(w.t)} = ${w.v}</span> <small>${w.got === null ? esc(S.flew) : `${esc(S.yours)}: ${esc(w.got)}`}</small></p>`).join("")}</div>`
        : `<p class="tg-rt">${esc(S.none)}</p>`
    }
    ${navHTML()}
  </section>`;
      bindNav(g, again);
    }

    // 🎲 the examples in random order: type the answer, ✓ Check
    function mix(g) {
      const list = shuffle(g.facts).slice(0, g.count || g.facts.length);
      const wrong = [];
      let right = 0;
      function show1(i) {
        leave();
        if (i >= list.length) return result(g, mix, right, list.length, wrong);
        const f = list[i];
        let typed = "",
          checked = false;
        app.innerHTML = `${hud(`${g.ic} ${g.t}`, `${i + 1} / ${list.length}`)}<section class="card pop tg-game">
      <div class="tg-gq"><span class="tg-expr">${esc(f.t)} =</span><button type="button" class="tg-f on" id="ans" aria-label="${esc(S.answer)}"></button>${V.ok ? `<button type="button" class="abtn tg-say" id="sq" aria-label="${esc(S.say)}">🔊</button>` : ""}</div>
      ${padHTML()}
      <div id="fb" class="tg-fb" aria-live="polite"></div>
      <div class="tg-acts"><button type="button" class="btn" id="okBtn">${esc(S.check)}</button></div>
    </section>`;
        bindHome();
        const ans = document.getElementById("ans");
        const fb = document.getElementById("fb");
        const ok = document.getElementById("okBtn");
        const sq = document.getElementById("sq");
        if (sq) sq.onclick = () => V.say(spoken(f.t + " ="));
        function check() {
          if (checked) return show1(i + 1);
          if (!typed) {
            fb.innerHTML = `<div class="fb no"><span>${esc(S.type)}</span></div>`;
            return;
          }
          checked = true;
          ans.classList.remove("on");
          if (Number(typed) === f.v) {
            right++;
            ans.classList.add("ok");
            fb.innerHTML = `<div class="fb ok"><b>${esc(S.right)}</b></div>`;
            setTimeout(() => ans.isConnected && show1(i + 1), 700);
          } else {
            wrong.push({ ...f, got: typed });
            ans.classList.add("no");
            fb.innerHTML = `<div class="fb no"><b>${esc(S.no)}: ${esc(f.t)} = ${f.v}</b></div>`;
            ok.textContent = S.next;
          }
        }
        keyFn = (key) => {
          if (key === "next") return check();
          if (checked) return;
          if (key === "del") typed = typed.slice(0, -1);
          else if (/^\d$/.test(key) && typed.length < 3) typed += key;
          ans.textContent = typed;
        };
        app
          .querySelectorAll(".tg-pad [data-k]")
          .forEach((b) => (b.onclick = () => keyFn(b.dataset.k)));
        ok.onclick = check;
        top0();
      }
      show1(0);
    }

    // 🚀 a rocket flies from left to right with an example; the right answer → it explodes
    function rocket(g) {
      leave();
      let speed = store.get(o.key + "-speed", "slow");
      if (!SPEED[speed]) speed = "slow";
      app.innerHTML = `${hud(`${g.ic} ${g.t}`, "")}<section class="card pop tg-game">
    <div class="tg-sky tg-intro"><span class="tg-rk"><span class="tg-rk-ic">🚀</span><span class="tg-rk-t">${esc(g.facts[0].t)}</span></span></div>
    <p class="tg-rt">${esc(S.intro)}${g.lives ? `<br>${"❤️".repeat(g.lives)} ${esc(S.lives(g.lives))}` : ""}</p>
    <div class="tg-speed" role="group" aria-label="${esc(S.speed)}">${[
      ["slow", S.slow],
      ["fast", S.fast],
    ]
      .map(
        ([k, t]) =>
          `<button type="button" class="btn ghost" data-sp="${k}" aria-pressed="${speed === k}">${t}</button>`,
      )
      .join("")}</div>
    <div class="tg-acts"><button type="button" class="btn" id="goBtn">${esc(S.start)}</button></div>
  </section>`;
      bindHome();
      app.querySelectorAll("[data-sp]").forEach(
        (b) =>
          (b.onclick = () => {
            speed = b.dataset.sp;
            store.set(o.key + "-speed", speed);
            app
              .querySelectorAll("[data-sp]")
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
          }),
      );
      document.getElementById("goBtn").onclick = () =>
        fly(shuffle(g.facts), 0, 0, []);
      top0();

      function fly(list, i, right, wrong) {
        leave();
        const lost = g.lives && wrong.length >= g.lives;
        if (i >= list.length || lost)
          return result(g, rocket, right, lost ? i : list.length, wrong, lost);
        const f = list[i];
        const opts = options(f);
        const hearts = g.lives
          ? ` · ${"❤️".repeat(g.lives - wrong.length)}${"🤍".repeat(wrong.length)}`
          : "";
        app.innerHTML = `${hud(`${g.ic} ${g.t}`, `${i + 1} / ${list.length}${hearts}`)}<section class="card pop tg-game">
      <div class="tg-sky"><span class="tg-rk" id="rk" style="--dur:${SPEED[speed]}s"><span class="tg-rk-ic">🚀</span><span class="tg-rk-t">${esc(f.t)}</span></span><span class="tg-boom" id="boom" hidden>💥</span></div>
      <div class="tg-opts">${opts.map((x) => `<button type="button" class="tg-opt" data-v="${x}">${x}</button>`).join("")}</div>
      <div id="fb" class="tg-fb" aria-live="polite"></div>
    </section>`;
        bindHome();
        const rk = document.getElementById("rk");
        const fb = document.getElementById("fb");
        let over = false;
        const next = (ms) =>
          setTimeout(
            () => rk.isConnected && fly(list, i + 1, right, wrong),
            ms,
          );
        const mark = () =>
          app.querySelectorAll(".tg-opt").forEach((b) => {
            b.disabled = true;
            if (+b.dataset.v === f.v) b.classList.add("ok");
          });
        rk.addEventListener("animationend", () => {
          if (over) return;
          over = true;
          wrong.push({ ...f, got: null });
          mark();
          fb.innerHTML = `<div class="fb no"><b>${esc(S.gone)}: ${esc(f.t)} = ${f.v}</b></div>`;
          next(1600);
        });
        app.querySelectorAll(".tg-opt").forEach(
          (b) =>
            (b.onclick = () => {
              if (over) return;
              over = true;
              const v = +b.dataset.v;
              mark();
              if (v === f.v) {
                right++;
                // stop the rocket where it is and blow it up
                const sky = rk.parentElement.getBoundingClientRect();
                const r = rk.getBoundingClientRect();
                const boom = document.getElementById("boom");
                boom.style.left = `${r.left - sky.left + r.width / 2}px`;
                rk.style.animationPlayState = "paused";
                rk.classList.add("gone");
                boom.hidden = false;
                fb.innerHTML = `<div class="fb ok"><b>${esc(S.hit)} ${esc(f.t)} = ${f.v}</b></div>`;
                next(1100);
              } else {
                b.classList.add("no");
                wrong.push({ ...f, got: String(v) });
                rk.classList.add("away");
                fb.innerHTML = `<div class="fb no"><b>${esc(S.no)}: ${esc(f.t)} = ${f.v}</b></div>`;
                next(1600);
              }
            }),
        );
      }
    }

    // the start screen of a tile with choices: one row of buttons per question, the best score of the game chosen, ▶ Start
    function setup(t) {
      leave();
      const saved = store.get(o.key + "-opt", {});
      const ch = {};
      for (const a of t.ask) {
        const v = (saved[t.id] || {})[a.k];
        ch[a.k] = a.opts.some((x) => x.v === v) ? v : a.opts[0].v;
      }
      app.innerHTML = `${hud(`${t.ic} ${t.t}`, "")}<section class="card pop tg-game">
    <p class="tg-rt">${esc(t.intro)}</p>
    ${t.ask
      .map(
        (a) =>
          `<div class="tg-ask"><b class="tg-h">${esc(a.t)}</b><div class="tg-speed" role="group" aria-label="${esc(a.t)}">${a.opts
            .map(
              (x, i) =>
                `<button type="button" class="btn ghost" data-a="${esc(a.k)}" data-i="${i}" aria-pressed="${ch[a.k] === x.v}">${esc(x.t)}</button>`,
            )
            .join("")}</div></div>`,
      )
      .join("")}
    <p class="tg-rt tg-best" id="bestLine"></p>
    <div class="tg-acts"><button type="button" class="btn" id="goBtn">${esc(S.start)}</button></div>
  </section>`;
      bindHome();
      const line = document.getElementById("bestLine");
      function show() {
        const g = t.make(ch);
        const b = g.steps ? fewest[g.id] : best[g.id];
        line.textContent =
          b === undefined
            ? ""
            : g.steps
              ? S.bestSteps(S.nSteps(b))
              : `${S.record}: ${b} ${S.of} ${g.total}`;
      }
      app.querySelectorAll("[data-a]").forEach(
        (b) =>
          (b.onclick = () => {
            const a = t.ask.find((x) => x.k === b.dataset.a);
            ch[a.k] = a.opts[+b.dataset.i].v;
            saved[t.id] = { ...ch };
            store.set(o.key + "-opt", saved);
            app
              .querySelectorAll(`[data-a="${a.k}"]`)
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
            show();
          }),
      );
      document.getElementById("goBtn").onclick = () => {
        const g = t.make(ch);
        g.play(g);
      };
      show();
      top0();
    }

    // 🧠 memory: the cards lie face down. Turn two: an example and its answer stay open, anything else turns back.
    // Only the steps are counted (two cards turned = one step); the fewest steps are saved.
    function memory(g) {
      leave();
      const list = pickPairs(g.facts, g.pairs);
      const cards = shuffle([
        ...list.map((f) => ({ t: f.t, v: f.v, q: true })),
        ...list.map((f) => ({ t: String(f.v), v: f.v, q: false })),
      ]);
      const cols = cards.length > 16 ? 6 : 4;
      let open = [];
      let found = 0;
      let n = 0;
      let busy = false;
      app.innerHTML = `${hud(`${g.ic} ${g.t}`, `${esc(S.steps)}: 0`)}<section class="card pop tg-game">
    <p class="tg-rt">${esc(S.memIntro)}</p>
    <div class="tg-mem" style="--cols:${cols}">${cards.map((c, i) => `<button type="button" class="tg-card" data-i="${i}" aria-label="${esc(S.card)}"><span class="tg-back" aria-hidden="true">❓</span><span class="tg-face">${esc(c.t)}</span></button>`).join("")}</div>
  </section>`;
      bindHome();
      const cnt = app.querySelector(".hud .count");
      app.querySelectorAll(".tg-card").forEach(
        (b) =>
          (b.onclick = () => {
            if (busy || b.classList.contains("up")) return;
            b.classList.add("up");
            b.removeAttribute("aria-label");
            open.push(b);
            if (open.length < 2) return;
            n++;
            cnt.textContent = `${S.steps}: ${n}`;
            const pair = open;
            open = [];
            const [x, y] = pair.map((e) => cards[+e.dataset.i]);
            if (x.q !== y.q && x.v === y.v) {
              found++;
              pair.forEach((e) => {
                e.classList.add("ok");
                e.disabled = true;
              });
              if (found === list.length)
                setTimeout(() => cnt.isConnected && memDone(), 900);
            } else {
              busy = true;
              pair.forEach((e) => e.classList.add("no"));
              setTimeout(() => {
                pair.forEach((e) => {
                  e.classList.remove("up", "no");
                  e.setAttribute("aria-label", S.card);
                });
                busy = false;
              }, 1200);
            }
          }),
      );
      top0();

      function memDone() {
        leave();
        const old = fewest[g.id];
        if (old === undefined || n < old) {
          fewest[g.id] = n;
          store.set(o.key + "-steps", fewest);
        }
        const note =
          old === undefined ? "" : n < old ? S.newBest : S.bestSteps(old);
        app.innerHTML = `${hud(`${g.ic} ${g.t}`, "")}<section class="card pop tg-res">
    ${fireworks()}
    <div class="tg-mood fw" aria-hidden="true">🧠</div>
    <h2 class="tg-score">${esc(S.nSteps(n))}</h2>
    <p class="tg-rt">${esc(S.memDone(list.length))}${note ? `<br>${esc(note)}` : ""}</p>
    ${navHTML()}
  </section>`;
        bindNav(g, memory);
      }
    }

    // 🔗 match: the examples on the left, their answers (mixed up) on the right; tap one of each to join them (either order).
    //   check "end": a joined pair gets the same mark (🍎 …); tap a joined one to undo. When all are joined: ✓ Check.
    //   check "now": a right pair disappears, a wrong one is red for 2 seconds; an example counts as right if it had no mistake.
    function match(g) {
      leave();
      const list = pickPairs(g.facts, g.pairs);
      const ans = shuffle(list.map((f) => f.v));
      const now = g.check === "now";
      const link = new Map(); // "end": example i → answer j
      const slips = new Map(); // "now": example i → its first wrong answer
      let sel = null; // the button tapped first
      let done = 0;
      let tries = 0; // "now": every wrong pair tapped
      let checked = false;
      const item = (side, i, t) =>
        `<button type="button" class="tg-mi" data-s="${side}" data-i="${i}"><span class="tg-mk" aria-hidden="true"></span>${esc(t)}</button>`;
      app.innerHTML = `${hud(`${g.ic} ${g.t}`, now ? `${esc(S.mistakes)}: 0` : `0 / ${list.length}`)}<section class="card pop tg-game">
    <p class="tg-rt">${esc(now ? S.nowIntro : S.endIntro)}</p>
    <div class="tg-mt">
      <div class="tg-mt-col q" role="group" aria-label="${esc(S.sums)}">${list.map((f, i) => item("q", i, f.t)).join("")}</div>
      <div class="tg-mt-col a" role="group" aria-label="${esc(S.answers)}">${ans.map((v, j) => item("a", j, String(v))).join("")}</div>
    </div>
    <div id="fb" class="tg-fb" aria-live="polite"></div>
    ${now ? "" : `<div class="tg-acts"><button type="button" class="btn" id="okBtn" disabled>${esc(S.check)}</button></div>`}
  </section>`;
      bindHome();
      const cnt = app.querySelector(".hud .count");
      const fb = document.getElementById("fb");
      const ok = document.getElementById("okBtn");
      const btn = (side, i) =>
        app.querySelector(`.tg-mi[data-s="${side}"][data-i="${i}"]`);
      // "end": draw the marks of the joined pairs
      function paint() {
        app.querySelectorAll(".tg-mi").forEach((b) => {
          b.classList.remove("on");
          b.querySelector(".tg-mk").textContent = "";
        });
        for (const [i, j] of link) {
          for (const b of [btn("q", i), btn("a", j)]) {
            b.classList.add("on");
            b.querySelector(".tg-mk").textContent = MARKS[i % MARKS.length];
          }
        }
        cnt.textContent = `${link.size} / ${list.length}`;
        ok.disabled = link.size < list.length;
      }
      function join(qb, ab) {
        const i = +qb.dataset.i;
        const j = +ab.dataset.i;
        if (!now) {
          for (const [k, m] of link) if (m === j) link.delete(k);
          link.set(i, j);
          return paint();
        }
        if (ans[j] === list[i].v) {
          done++;
          for (const b of [qb, ab]) {
            b.classList.add("ok");
            b.disabled = true;
            setTimeout(() => b.classList.add("gone"), 350);
          }
          if (done === list.length)
            setTimeout(
              () =>
                cnt.isConnected &&
                result(
                  g,
                  match,
                  list.length - slips.size,
                  list.length,
                  [...slips].map(([k, got]) => ({ ...list[k], got })),
                ),
              900,
            );
        } else {
          if (!slips.has(i)) slips.set(i, String(ans[j]));
          tries++;
          cnt.textContent = `${S.mistakes}: ${tries}`;
          for (const b of [qb, ab]) {
            b.classList.add("no");
            clearTimeout(b._t);
            b._t = setTimeout(() => b.classList.remove("no"), 2000);
          }
        }
      }
      app.querySelectorAll(".tg-mi").forEach(
        (b) =>
          (b.onclick = () => {
            if (checked) return;
            const side = b.dataset.s;
            const i = +b.dataset.i;
            if (!now) {
              // tap a joined one: undo it, and it is the first of a new pair
              const k =
                side === "q" ? i : [...link].find(([, m]) => m === i)?.[0];
              if (k !== undefined && link.has(k)) {
                link.delete(k);
                paint();
              }
            }
            if (sel === b) {
              sel.classList.remove("sel");
              sel = null;
              return;
            }
            if (!sel || sel.dataset.s === side) {
              if (sel) sel.classList.remove("sel");
              sel = b;
              b.classList.add("sel");
              return;
            }
            const first = sel;
            first.classList.remove("sel");
            sel = null;
            if (side === "q") join(b, first);
            else join(first, b);
          }),
      );
      if (ok)
        ok.onclick = () => {
          if (checked) {
            const wrong = [];
            for (const [i, j] of link)
              if (ans[j] !== list[i].v)
                wrong.push({ ...list[i], got: String(ans[j]) });
            return result(
              g,
              match,
              list.length - wrong.length,
              list.length,
              wrong,
            );
          }
          checked = true;
          let right = 0;
          for (const [i, j] of link) {
            const good = ans[j] === list[i].v;
            if (good) right++;
            for (const b of [btn("q", i), btn("a", j)]) {
              b.classList.add(good ? "ok" : "no");
              b.disabled = true;
            }
          }
          fb.innerHTML = `<div class="fb ${right === list.length ? "ok" : "no"}"><b>${right} ${esc(S.of)} ${list.length}</b></div>`;
          ok.textContent = S.result;
        };
      top0();
    }

    return {
      mix,
      rocket,
      memory,
      match,
      setup,
      best: (id) => best[id],
      steps: (id) => fewest[id],
      leave,
    };
  }
  TimesGames.shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  // n · from … n · to ("4 · 2", sign "·"; the Grade 4 page uses "×")
  TimesGames.table = (n, from, to, sign = "·") => {
    const out = [];
    for (let k = from; k <= to; k++)
      out.push({ t: `${n} ${sign} ${k}`, v: n * k, n });
    return out;
  };
  // n · from : n … n · to : n ("8 : 4"; the Grade 4 page uses "÷")
  TimesGames.divTable = (n, from, to, sign = ":") => {
    const out = [];
    for (let k = from; k <= to; k++)
      out.push({ t: `${n * k} ${sign} ${n}`, v: k, n });
    return out;
  };
  window.TimesGames = TimesGames;
})();
