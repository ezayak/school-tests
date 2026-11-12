// Grade 4 Math · Multiplication games (index.html) and Division games (division.html, <body data-op="div">).
// Pick a table (2–12) or 🎲 Random, then a game tile (shared/times-games.js, the same games as in the Optima math lessons, in English).
// A game with choices opens its start screen first (G.setup):
//   🎲 Mixed up:  a number n: n × 1 … n × 12 in random order, typed;  🎲 Random: 10, 20 or 30 sums from 2 × 2 … 12 × 12 (a choice)
//   🚀 Rockets:   the same 12 sums;  🎲 Random: all of them, until every sum is done or 5 mistakes (its own screen: the speed)
//   🧠 Memory:    6, 8 or 12 pairs (a choice); only the steps are counted
//   🔗 Matching:  check at the end, or a right pair disappears (a choice); 6, 8 or 12 pairs (a choice)
// Division: the same games with n · k ÷ n (48 ÷ 6); Random from 4 ÷ 2 … 144 ÷ 12.
// Saved on the device (key "tg-math4" / "tg-div4"): the number picked, the choices, the best scores and steps, the rocket speed.
(function () {
  "use strict";
  const { esc } = Kit;
  const app = document.getElementById("app");
  const DIV = document.body.dataset.op === "div";
  const SIGN = DIV ? "÷" : "×";
  const KEY = DIV ? "tg-div4" : "tg-math4";
  const NUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const PAIRS = [6, 8, 12].map((v) => ({ v, t: `${v} pairs` }));
  const LIVES = 5;
  const get = (k, d) => {
    try {
      const v = localStorage.getItem(k);
      return v === null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  };
  const set = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  };
  let pick = get(KEY + "-n", 2);
  if (pick !== "r" && !NUMS.includes(pick)) pick = 2;

  const G = TimesGames({
    app,
    lang: "en",
    key: KEY,
    onBack: home,
    home: "Back to the games",
    back: "← Games",
  });
  // n's sums from × from to × to. Division: n: 1, so the rockets' wrong answers are the quotient ± 1, ± 2, + 10
  // (TimesGames uses ± n, which suits a product, not a quotient)
  const facts = (n, from, to) =>
    DIV
      ? TimesGames.divTable(n, from, to, "÷").map((f) => ({ ...f, n: 1 }))
      : TimesGames.table(n, from, to, "×");
  // all the sums of the Random games: 2 × 2 … 12 × 12 (4 ÷ 2 … 144 ÷ 12)
  const ALL = NUMS.flatMap((n) => facts(n, 2, 12));

  // the tiles for the number picked: a game {id, ic, t, facts, total, play, …},
  // or a game with choices {id, ic, t, sub, intro, ask, make(choice) → a game} (it opens G.setup)
  function tiles() {
    const r = pick === "r";
    const list = r ? ALL : facts(pick, 1, 12);
    const tag = r ? "r" : pick;
    const of = r ? "" : ` · ${SIGN} ${pick}`;
    const mixed = r
      ? {
          id: "mix-r",
          ic: "🎲",
          t: "Mixed up",
          sub: "10 · 20 · 30 sums",
          intro:
            "Sums from all the tables in random order. Type each answer on the number pad.",
          ask: [
            {
              k: "count",
              t: "How many sums?",
              opts: [10, 20, 30].map((v) => ({ v, t: `${v} sums` })),
            },
          ],
          make: (c) => ({
            id: "mix-r" + c.count,
            ic: "🎲",
            t: `Mixed up · ${c.count} sums`,
            facts: list,
            count: c.count,
            total: c.count,
            play: G.mix,
          }),
        }
      : {
          id: "mix-" + pick,
          ic: "🎲",
          t: `Mixed up${of}`,
          facts: list,
          total: 12,
          play: G.mix,
        };
    const rockets = r
      ? {
          id: "rocket-r",
          ic: "🚀",
          t: "Rockets · all tables",
          facts: list,
          lives: LIVES,
          total: list.length,
          play: G.rocket,
          sub: `${list.length} sums · ${"❤️".repeat(LIVES)}`,
        }
      : {
          id: "rocket-" + pick,
          ic: "🚀",
          t: `Rockets${of}`,
          facts: list,
          total: 12,
          play: G.rocket,
        };
    const memory = {
      id: "mem-" + tag,
      ic: "🧠",
      t: `Memory${of}`,
      sub: "6 · 8 · 12 pairs",
      intro:
        "The cards lie face down. Turn over two cards to find a sum and its answer. Only the steps are counted: the fewer, the better.",
      ask: [{ k: "pairs", t: "How many pairs?", opts: PAIRS }],
      make: (c) => ({
        id: `mem-${tag}-${c.pairs}`,
        ic: "🧠",
        t: `Memory${of} · ${c.pairs} pairs`,
        facts: list,
        pairs: c.pairs,
        total: c.pairs,
        steps: true,
        play: G.memory,
      }),
    };
    const matching = {
      id: "mt-" + tag,
      ic: "🔗",
      t: `Matching${of}`,
      sub: "2 ways · 6 · 8 · 12 pairs",
      intro: "Join each sum to its answer: tap a sum, then its answer.",
      ask: [
        {
          k: "check",
          t: "How to play?",
          opts: [
            { v: "end", t: "✓ Join them all, then check" },
            { v: "now", t: "✨ A right pair disappears" },
          ],
        },
        { k: "pairs", t: "How many pairs?", opts: PAIRS },
      ],
      make: (c) => ({
        id: `${c.check === "now" ? "mtn" : "mte"}-${tag}-${c.pairs}`,
        ic: c.check === "now" ? "✨" : "🔗",
        t: `Matching${of} · ${c.pairs} pairs`,
        facts: list,
        pairs: c.pairs,
        total: c.pairs,
        check: c.check,
        play: G.match,
      }),
    };
    return [mixed, rockets, memory, matching];
  }

  // every game a tile can start (all the combinations of its choices)
  function variants(t) {
    if (!t.ask) return [t];
    let all = [{}];
    for (const a of t.ask)
      all = all.flatMap((c) => a.opts.map((x) => ({ ...c, [a.k]: x.v })));
    return all.map(t.make);
  }

  // ✓ when one of its games is done: 90 % right, or a memory game finished; the best score on a tile without choices
  function tile(t, k) {
    const done = variants(t).some((g) => {
      if (g.steps) return G.steps(g.id) !== undefined;
      const b = G.best(g.id);
      return b !== undefined && b / g.total >= 0.9;
    });
    const b = t.ask ? undefined : G.best(t.id);
    const sub = [
      t.sub || `${t.total} sums`,
      b !== undefined ? `Best: ${b}` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    return `<button type="button" class="mode${done ? " done" : ""}" data-g="${k}" id="game-${esc(t.id)}"><span class="mi-ic">${t.ic}</span><b>${esc(t.t)}</b><small>${esc(sub)}</small>${done ? '<span class="tick" aria-label="done">✓</span>' : ""}</button>`;
  }

  function home() {
    const list = tiles();
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="../index.html">← Math lessons</a><span class="eyebrow">Grade 4 · Math</span></div>
    <h1 class="hero-title"><span class="p">${DIV ? "Division" : "Multiplication"}</span> <span class="k">games</span></h1>
    <p class="howto">Pick a ${DIV ? "number to divide by" : "times table"}, or 🎲 Random for all of them. 🎲 Mixed up: type each answer on the number pad. 🚀 Rockets: tap the right answer before the rocket flies away. 🧠 Memory: turn over two cards to find a sum and its answer. 🔗 Matching: tap a sum, then its answer.</p>
  </section>
  <section class="card tg-pick">
    <h2 class="tg-h">1. Pick a number</h2>
    <div class="tg-nums" role="group" aria-label="${DIV ? "Divide by" : "Times table"}">${NUMS.map((n) => `<button type="button" class="tg-num" data-n="${n}" aria-pressed="${pick === n}">${DIV ? `÷ ${n}` : n}</button>`).join("")}<button type="button" class="tg-num tg-rand" data-n="r" aria-pressed="${pick === "r"}">🎲 Random</button></div>
    <h2 class="tg-h">2. Pick a game</h2>
    <div class="modes">${list.map(tile).join("")}</div>
  </section>`;
    app.querySelectorAll("[data-n]").forEach(
      (b) =>
        (b.onclick = () => {
          pick = b.dataset.n === "r" ? "r" : +b.dataset.n;
          set(KEY + "-n", pick);
          home();
        }),
    );
    app.querySelectorAll("[data-g]").forEach(
      (b) =>
        (b.onclick = () => {
          const t = list[+b.dataset.g];
          if (t.ask) G.setup(t);
          else t.play(t);
        }),
    );
    window.scrollTo({ top: 0 });
  }
  home();
})();
