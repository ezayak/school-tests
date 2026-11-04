// Grade 4 Math · Multiplication games. Pick a times table (2–12) or 🎲 Random, then a game (shared/times-games.js,
// the same games as in the Optima math lessons, in English):
//   a number n:  🎲 Mixed up (n × 1 … n × 12 in random order, typed)  ·  🚀 Rockets (the same 12 sums)
//   🎲 Random:   🎲 Mixed up with 10, 20 or 30 sums picked at random from 2 × 2 … 12 × 12  ·
//                🚀 Rockets with all of them, until every sum is done or 5 mistakes.
// Saved on the device (key "tg-math4"): the number picked, the best scores, the rocket speed.
(function () {
  "use strict";
  const { esc } = Kit;
  const app = document.getElementById("app");
  const KEY = "tg-math4";
  const NUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
  // all the sums of the Random games: 2 × 2 … 12 × 12
  const ALL = NUMS.flatMap((n) => TimesGames.table(n, 2, 12, "×"));

  // the games for the number picked: {id, ic, t, sub, facts, count, lives}
  function games() {
    if (pick === "r")
      return [
        ...[10, 20, 30].map((c) => ({
          id: "mix-r" + c,
          ic: "🎲",
          t: `Mixed up · ${c} sums`,
          facts: ALL,
          count: c,
          total: c,
          play: G.mix,
        })),
        {
          id: "rocket-r",
          ic: "🚀",
          t: "Rockets · all tables",
          facts: ALL,
          lives: LIVES,
          total: ALL.length,
          play: G.rocket,
          note: `${ALL.length} sums · ${"❤️".repeat(LIVES)}`,
        },
      ];
    const facts = TimesGames.table(pick, 1, 12, "×");
    return [
      {
        id: "mix-" + pick,
        ic: "🎲",
        t: `Mixed up · × ${pick}`,
        facts,
        total: 12,
        play: G.mix,
      },
      {
        id: "rocket-" + pick,
        ic: "🚀",
        t: `Rockets · × ${pick}`,
        facts,
        total: 12,
        play: G.rocket,
      },
    ];
  }

  function home() {
    const list = games();
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="../index.html">← Math lessons</a><span class="eyebrow">Grade 4 · Math</span></div>
    <h1 class="hero-title"><span class="p">Multiplication</span> <span class="k">games</span></h1>
    <p class="howto">Pick a times table, or 🎲 Random for all of them. 🎲 Mixed up: type each answer on the number pad. 🚀 Rockets: tap the right answer before the rocket flies away.</p>
  </section>
  <section class="card tg-pick">
    <h2 class="tg-h">1. Pick a number</h2>
    <div class="tg-nums" role="group" aria-label="Times table">${NUMS.map((n) => `<button type="button" class="tg-num" data-n="${n}" aria-pressed="${pick === n}">${n}</button>`).join("")}<button type="button" class="tg-num tg-rand" data-n="r" aria-pressed="${pick === "r"}">🎲 Random</button></div>
    <h2 class="tg-h">2. Pick a game</h2>
    <div class="modes">${list
      .map((g, i) => {
        const b = G.best(g.id);
        const done = b !== undefined && b / g.total >= 0.9;
        const sub = [
          g.note || `${g.total} sums`,
          b !== undefined ? `Best: ${b}` : "",
        ]
          .filter(Boolean)
          .join(" · ");
        return `<button type="button" class="mode${done ? " done" : ""}" data-g="${i}" id="game-${esc(g.id)}"><span class="mi-ic">${g.ic}</span><b>${esc(g.t)}</b><small>${esc(sub)}</small>${done ? '<span class="tick" aria-label="done">✓</span>' : ""}</button>`;
      })
      .join("")}</div>
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
          const g = list[+b.dataset.g];
          g.play(g);
        }),
    );
    window.scrollTo({ top: 0 });
  }
  home();
})();
