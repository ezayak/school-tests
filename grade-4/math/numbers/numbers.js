// Grade 4 Math · Prime or composite? (index.html), opened from the home page's Games part (games.js).
// Made for a child with aphasia: big numbers, colours, dots, few words. Sound switch 🔇 / 🔊 (home screen and every game screen):
// off at first; on, every question and answer is said aloud, and switching it on says the one on screen.
// Below 121 a number is composite exactly when 2, 3, 5 or 7 divides it (and it is not that number itself),
// so these four checks are the whole rule for 2–99. 5 is needed: 25, 55, 65, 85, 95 pass the 2, 3 and 7 checks.
//   💎 Prime or composite (2–99):
//     🧭 Step by step: one slide per check, the child answers each one with ✓ Yes / ✗ No:
//        ÷ 2: the last digit lit, «0 2 4 6 8?» · ÷ 3: tap ＋ to add the digits (again while two digits are left), «3, 6 or 9?»
//        ÷ 5: the last digit lit, «0 or 5?» · ÷ 7: the 7 list, «Is it in the list?»
//        The first Yes (unless it is that number itself) or four No → «So it is…» 💎 Prime / 🧱 Composite.
//        A wrong step is shown right and the walk goes on as it should.
//     📋 With the steps: the number, the four checks on screen, Prime / Composite.
//     ⚡ On my own: the number, Prime / Composite.
//   Practice: ⚖️ Even or odd (1–99) · ÷ 3 (💡 Help: the digits are added, animated) · ÷ 5 · ÷ 7 (8–99, 💡 Help: the 7 list).
// A round = 10 numbers, half of them "yes" (prime / even / divisible); a prime round's composites are 2 even and 3 odd.
// After each answer: ✓ / ✗, why, n = a × b and its dots (a rectangle; a prime makes only one line), Next →.
// Score: the numbers right the first time (Step by step: every step of the number right).
// Saved on the device: key "ng-math4-best" → {game id: best score of 10}, "ng-math4-sound" → true when the sound is on.
(function () {
  "use strict";
  const { esc, shuf } = Kit;
  const app = document.getElementById("app");
  const V = Kit.voice("en-US");
  const KEY = "ng-math4-best";
  const ROUND = 10;
  const P = [2, 3, 5, 7];
  // the 7 list starts at 14: 7 × 1 would make 7 look composite (7 itself is prime: its ÷ 7 check says No)
  const SEVENS = Array.from({ length: 13 }, (_, i) => 7 * (i + 2));
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
  const best = get(KEY, {});

  // ---------- numbers ----------
  // n's first divisor of 2, 3, 5, 7 that is not n itself (none: n is prime; true below 121)
  const factor = (n) => P.find((p) => p !== n && n % p === 0);
  const isPrime = (n) => n > 1 && !factor(n);
  const last = (n) => n % 10;
  // adding the digits until one digit is left: rows [{a, b, s}], end (a one-digit n: no rows)
  function sums(n) {
    const rows = [];
    let x = n;
    while (x > 9) {
      const a = Math.floor(x / 10),
        b = x % 10;
      rows.push({ a, b, s: a + b });
      x = a + b;
    }
    return { rows, end: x };
  }
  const range = (from, to) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);
  // ROUND numbers: half pass the test, half don't, mixed up
  function deal(test, from, to) {
    const all = range(from, to);
    const h = ROUND / 2;
    const yes = shuf(all.filter(test)).slice(0, h);
    const no = shuf(all.filter((n) => !test(n))).slice(0, h);
    return shuf(yes.concat(no));
  }
  // 5 primes, 2 even composites, 3 odd composites (so the 3, 5 and 7 checks are needed too)
  function dealPrime() {
    const all = range(2, 99);
    const co = all.filter((n) => !isPrime(n));
    return shuf(
      shuf(all.filter(isPrime))
        .slice(0, 5)
        .concat(shuf(co.filter((n) => n % 2 === 0)).slice(0, 2))
        .concat(shuf(co.filter((n) => n % 2)).slice(0, 3)),
    );
  }

  // ---------- voice and timers ----------
  let said = ""; // what is on the screen, to say when the sound is switched on
  let sound = get("ng-math4-sound", false) === true;
  let timers = [];
  const say = (t) => {
    said = t;
    V.hush();
    if (sound) V.say(t);
  };
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  // the sound switch: 🔇 off / 🔊 on (aria-pressed); on → it says what is on the screen
  const soundBtn = () =>
    `<button type="button" class="abtn ng-sound" id="soundBtn" aria-pressed="${sound}" aria-label="Sound">${sound ? "🔊" : "🔇"}</button>`;
  function bindSound() {
    const b = document.getElementById("soundBtn");
    b.onclick = () => {
      sound = !sound;
      set("ng-math4-sound", sound);
      b.textContent = sound ? "🔊" : "🔇";
      b.setAttribute("aria-pressed", sound);
      say(said);
    };
  }
  function stop() {
    timers.forEach(clearTimeout);
    timers = [];
    V.hush();
  }

  // ---------- pieces of a screen ----------
  // the number, big; how: "last" = the last digit lit, "two" = the two digits in two colours
  function num(n, how) {
    const d = String(n).split("");
    return `<div class="ng-num${how === "two" ? " two" : ""}" aria-label="${n}">${d
      .map(
        (c, i) =>
          `<span class="ng-d${how === "last" && i === d.length - 1 ? " hl" : ""}">${c}</span>`,
      )
      .join("")}</div>`;
  }
  const chips = (list, cls) =>
    `<span class="ng-chips${cls ? " " + cls : ""}">${list.map((c) => `<span class="ng-chip">${c}</span>`).join("")}</span>`;
  // the 7 list: 7 × 2 … 7 × 14; hit = the number to light
  const sevens = (hit) =>
    `<div class="ng-seven">${SEVENS.map((s) => `<span class="ng-sv${s === hit ? " hit" : ""}" data-s="${s}"><b>${s}</b><small>7 × ${s / 7}</small></span>`).join("")}</div>`;
  // n = a × b and n dots in a rows of b (a prime: 1 row of n)
  function proof(n) {
    const f = factor(n);
    const rows = f || 1,
      cols = n / rows;
    return `<div class="ng-proof"><div class="ng-eq">${n} = <b class="a">${rows}</b> × <b class="b">${cols}</b></div><div class="ng-dots${f ? "" : " ng-line"}" style="--c: ${cols}" aria-hidden="true">${"<i></i>".repeat(n)}</div></div>`;
  }
  const verdict = (n) =>
    isPrime(n)
      ? `<p class="ng-verd pr">${n} is 💎 prime</p>`
      : `<p class="ng-verd co">${n} is 🧱 composite</p>`;
  // why n is prime or composite: [HTML, words]
  function why(n) {
    const f = factor(n);
    if (f === 2)
      return [
        `Last digit <b class="ng-hl">${last(n)}</b> → even → ÷ 2`,
        `The last digit is ${last(n)}. ${n} is even, so 2 divides it.`,
      ];
    if (f === 3) {
      const { rows, end } = sums(n);
      return [
        `${rows.length ? rows.map((r) => `${r.a} + ${r.b} = ${r.s}`).join(" → ") : n} → <b>${end}</b> → ÷ 3`,
        `The digits add up to ${end}, so 3 divides it.`,
      ];
    }
    if (f === 5)
      return [
        `Last digit <b class="ng-hl">${last(n)}</b> → ÷ 5`,
        `${n} ends with ${last(n)}, so 5 divides it.`,
      ];
    if (f === 7)
      return [
        `${n} = 7 × ${n / 7} → in the 7 list → ÷ 7`,
        `${n} is in the 7 list, so 7 divides it.`,
      ];
    if (P.includes(n))
      return [
        `${n} divides only by 1 and ${n}`,
        `${n} divides only by 1 and ${n}.`,
      ];
    return [
      `÷ 2 ✗ · ÷ 3 ✗ · ÷ 5 ✗ · ÷ 7 ✗ → only 1 × ${n}`,
      `2, 3, 5 and 7 do not divide ${n}.`,
    ];
  }

  // answer buttons {v, ic, t, s (HTML), c}
  const PC = [
    { v: 1, ic: "💎", t: "Prime", s: "only 1 × itself", c: "pr" },
    { v: 0, ic: "🧱", t: "Composite", s: "divides by more", c: "co" },
  ];
  const EO = [
    { v: 1, t: "Even", s: chips([0, 2, 4, 6, 8]), c: "ev" },
    { v: 0, t: "Odd", s: chips([1, 3, 5, 7, 9]), c: "od" },
  ];
  const YN = (p) => [
    { v: 1, ic: "✓", t: "Yes", s: p ? `÷ ${p}` : "", c: "y" },
    { v: 0, ic: "✗", t: "No", s: p ? `not ÷ ${p}` : "", c: "n" },
  ];
  const ans = (opts) =>
    `<div class="ng-ans">${opts.map((o) => `<button type="button" class="ng-a ${o.c}" data-v="${o.v}">${o.ic ? `<span class="ng-ic">${o.ic}</span>` : ""}<b>${esc(o.t)}</b>${o.s ? `<small>${o.s}</small>` : ""}</button>`).join("")}</div>`;
  // tap → the right one green, a wrong one red → cb(right?)
  function bindAns(right, cb) {
    const bs = [...app.querySelectorAll(".ng-a")];
    bs.forEach(
      (b) =>
        (b.onclick = () => {
          const ok = +b.dataset.v === +right;
          bs.forEach((x) => {
            x.disabled = true;
            if (+x.dataset.v === +right) x.classList.add("ok");
          });
          if (!ok) b.classList.add("no");
          cb(ok);
        }),
    );
  }
  // the answer's box under the buttons: ✓ / ✗, why, Next →
  function fb(ok, html, words, next, nextT) {
    const box = app.querySelector(".ng-fbh");
    box.innerHTML = `<div class="ng-fb ${ok ? "ok" : "no"}"><b class="ng-fbt">${ok ? "✓ Right!" : "✗ Not this time"}</b>${html}</div><button type="button" class="btn big ng-next">${nextT || "Next →"}</button>`;
    box.querySelector(".ng-next").onclick = () => {
      stop();
      next();
    };
    say(`${ok ? "Right!" : "No."} ${words}`);
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  // a game screen: ← 🔇 title · 3 / 10, the body, the answer's box
  function frame(g, i, body, words) {
    stop();
    app.innerHTML = `<section class="card ng-play"><div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to the games">←</button>${soundBtn()}<span class="qnum">${g.ic} ${esc(g.t)}</span><span class="count">${i + 1} / ${ROUND}</span></div>${body}<div class="ng-fbh"></div></section>`;
    document.getElementById("homeBtn").onclick = home;
    bindSound();
    say(words);
    window.scrollTo({ top: 0 });
  }

  // the adding of the digits, one row: a + b = s (animated: the digits, then +, then = s)
  const sumRow = (r) =>
    `<div class="ng-row"><span class="ng-t a">${r.a}</span><span class="ng-op">+</span><span class="ng-t b">${r.b}</span><span class="ng-op eq">=</span><span class="ng-t s">${r.s}</span></div>`;
  const sumEnd = (end) =>
    `<div class="ng-row end"><span class="ng-op">→</span><span class="ng-t s">${end}</span>${chips([3, 6, 9], "c369")}</div>`;
  // 💡 Help of the ÷ 3 game: the rows appear one after another, each one said
  function animSums(n, box) {
    stop();
    const { rows, end } = sums(n);
    box.innerHTML = `<div class="ng-sum"></div>`;
    const el = box.firstChild;
    let k = 0;
    const tick = () => {
      if (k < rows.length) {
        const r = rows[k++];
        el.insertAdjacentHTML("beforeend", sumRow(r));
        say(`${r.a} plus ${r.b} equals ${r.s}`);
        later(tick, 2600);
      } else {
        el.insertAdjacentHTML("beforeend", sumEnd(end));
        say(`${end}. Is it 3, 6 or 9?`);
      }
    };
    tick();
  }

  // ---------- the games: {id, ic, t, sub, deal() → numbers, ask(n, i, done(right first time?)), key(n) → the answer} ----------
  function quick(g, n, i, done, body, words) {
    frame(
      g,
      i,
      `${num(n)}${body || ""}<p class="ng-q">Prime or composite?</p>${ans(PC)}`,
      `${n}. ${words || ""}Prime or composite?`,
    );
    bindAns(isPrime(n) ? 1 : 0, (ok) => {
      const w = why(n);
      fb(
        ok,
        `<p class="ng-why">${w[0]}</p>${proof(n)}${verdict(n)}`,
        `${w[1]} ${n} is ${isPrime(n) ? "prime" : "composite"}.`,
        () => done(ok),
      );
    });
  }
  const pcKey = (n) =>
    `${n} → ${isPrime(n) ? "💎 prime" : `🧱 composite · ${n} = ${factor(n)} × ${n / factor(n)}`}`;

  // the four checks, on the screen of 📋 With the steps
  const RULES = `<div class="ng-rules">
<div class="ng-rule"><span class="ng-rk">÷ 2</span><span class="ng-rt">last digit</span>${chips([0, 2, 4, 6, 8])}</div>
<div class="ng-rule"><span class="ng-rk">÷ 3</span><span class="ng-rt">add the digits</span>${chips([3, 6, 9])}</div>
<div class="ng-rule"><span class="ng-rk">÷ 5</span><span class="ng-rt">last digit</span>${chips([0, 5])}</div>
<div class="ng-rule seven"><span class="ng-rk">÷ 7</span><span class="ng-rt">the 7 list</span>${chips(SEVENS, "small")}</div>
<div class="ng-rule all"><span class="ng-rt">All ✗ → 💎 prime · one ✓ → 🧱 composite</span></div>
</div>`;

  const STEP = {
    id: "pc-step",
    ic: "🧭",
    t: "Step by step",
    sub: "I help you check",
    deal: dealPrime,
    key: pcKey,
    ask(n, i, done) {
      const g = this;
      let clean = true;
      const res = []; // per check: true = it divides, false = it doesn't
      const strip = (k) =>
        `<div class="ng-steps">${P.map((p, j) => `<span class="ng-st${j === k ? " on" : ""}${res[j] === true ? " yes" : res[j] === false ? " no" : ""}">÷ ${p}${res[j] === undefined ? "" : res[j] ? " ✓" : " ✗"}</span>`).join("")}<span class="ng-st end${k === P.length ? " on" : ""}">💎 / 🧱</span></div>`;
      const head = (k) =>
        `${strip(k)}<h2 class="ng-sh">Can <b>${P[k]}</b> divide it?</h2>`;
      // a Yes / No step: right = it divides; then the next check, or the verdict
      const yn = (k, right, html, words) =>
        bindAns(right ? 1 : 0, (ok) => {
          if (!ok) clean = false;
          fb(ok, html, words, () => after(k, right));
        });
      function after(k, yes) {
        res[k] = yes;
        if (yes) return end(k);
        if (k + 1 < P.length) return checks[k + 1](k + 1);
        end(P.length);
      }
      const lastStep = (k, list, q, words) => {
        frame(
          g,
          i,
          `${head(k)}${num(n, "last")}<p class="ng-q">${q}</p>${chips(list, "big")}${ans(YN())}`,
          words,
        );
        const yes = list.includes(last(n));
        yn(
          k,
          n % P[k] === 0,
          `<p class="ng-why">Last digit <b class="ng-hl">${last(n)}</b> ${yes ? "is" : "is not"} ${list.join(", ")}${n % P[k] === 0 ? ` → ÷ ${P[k]}` : ""}</p>`,
          `The last digit is ${last(n)}. ${yes ? `${P[k]} divides ${n}.` : `${P[k]} does not divide ${n}.`}`,
        );
      };
      const checks = [
        (k) =>
          lastStep(
            k,
            [0, 2, 4, 6, 8],
            "Is it even?",
            `Look at the last digit of ${n}. Is it 0, 2, 4, 6 or 8?`,
          ),
        (k) => {
          const { rows, end: one } = sums(n); // one: the one digit left
          frame(
            g,
            i,
            `${head(k)}${num(n, "two")}<p class="ng-q">Add the digits</p><div class="ng-sum">${rows.length ? "" : `<div class="ng-row"><span class="ng-t s">${n}</span><small>one digit</small></div>`}</div><div class="ng-go"><button type="button" class="btn big ng-add">＋ Add</button></div><div class="ng-qbox"></div>`,
            rows.length
              ? `Now 3. Add the digits of ${n}. Tap plus.`
              : `Now 3. ${n} has only one digit.`,
          );
          const el = app.querySelector(".ng-sum");
          const go = app.querySelector(".ng-go");
          const ask = () => {
            go.hidden = true;
            app.querySelector(".ng-qbox").innerHTML =
              `<p class="ng-q">Is it 3, 6 or 9?</p>${chips([3, 6, 9], "big")}${ans(YN())}`;
            say(`${one}. Is it 3, 6 or 9?`);
            const yes = one % 3 === 0;
            yn(
              k,
              yes,
              `<p class="ng-why">${rows.length ? rows.map((r) => `${r.a} + ${r.b} = ${r.s}`).join(" → ") + " → " : ""}<b>${one}</b> ${yes ? "is" : "is not"} 3, 6 or 9${yes ? " → ÷ 3" : ""}</p>`,
              `${one} ${yes ? "is" : "is not"} 3, 6 or 9. ${yes ? `3 divides ${n}.` : `3 does not divide ${n}.`}`,
            );
          };
          let r = 0;
          if (!rows.length) {
            go.hidden = true; // one digit: nothing to add
            return later(ask, 1500);
          }
          app.querySelector(".ng-add").onclick = (e) => {
            const row = rows[r++];
            el.insertAdjacentHTML("beforeend", sumRow(row));
            if (r < rows.length) {
              e.target.textContent = "＋ Add again";
              say(
                `${row.a} plus ${row.b} equals ${row.s}. ${row.s} has two digits. Add again!`,
              );
            } else {
              e.target.disabled = true;
              say(`${row.a} plus ${row.b} equals ${row.s}.`);
              later(ask, 2200);
            }
          };
        },
        (k) =>
          lastStep(
            k,
            [0, 5],
            "Does it end with 0 or 5?",
            `Now 5. Look at the last digit of ${n}. Is it 0 or 5?`,
          ),
        (k) => {
          frame(
            g,
            i,
            `${head(k)}${num(n)}<p class="ng-q">Is ${n} in the 7 list?</p>${sevens()}${ans(YN())}`,
            `Now 7. Look at the 7 list. Is ${n} in the list?`,
          );
          const yes = SEVENS.includes(n);
          bindAns(yes ? 1 : 0, (ok) => {
            if (!ok) clean = false;
            const t = app.querySelector(`.ng-sv[data-s="${n}"]`);
            if (t) t.classList.add("hit");
            fb(
              ok,
              `<p class="ng-why">${yes ? `${n} = 7 × ${n / 7} → ÷ 7` : `${n} is not in the 7 list`}</p>`,
              yes
                ? `${n} is 7 times ${n / 7}. 7 divides ${n}.`
                : `${n} is not in the 7 list. 7 does not divide ${n}.`,
              () => after(k, yes),
            );
          });
        },
      ];
      // «So it is…»: k = the check that said yes, or P.length (all no)
      function end(k) {
        const self = k < P.length && P[k] === n;
        const note =
          k === P.length
            ? [
                `2, 3, 5 and 7 do not divide ${n}.`,
                `2, 3, 5 and 7 do not divide ${n}.`,
              ]
            : self
              ? [
                  `${n} is ${n} itself! It divides only by 1 and ${n}.`,
                  `${n} is ${n} itself. It divides only by 1 and ${n}.`,
                ]
              : [`<b>${P[k]}</b> divides ${n}.`, `${P[k]} divides ${n}.`];
        frame(
          g,
          i,
          `${strip(P.length)}${num(n)}<p class="ng-note">${note[0]}</p><p class="ng-q">So ${n} is…</p>${ans(PC)}`,
          `${note[1]} So ${n} is prime or composite?`,
        );
        bindAns(isPrime(n) ? 1 : 0, (ok) => {
          if (!ok) clean = false;
          fb(
            ok,
            `${proof(n)}${verdict(n)}`,
            `${n} is ${isPrime(n) ? "prime" : "composite"}.`,
            () => done(clean),
            i + 1 < ROUND ? "Next number →" : "Result →",
          );
        });
      }
      checks[0](0);
    },
  };
  const HINTS = {
    id: "pc-hints",
    ic: "📋",
    t: "With the steps",
    sub: "The checks are on the screen",
    deal: dealPrime,
    key: pcKey,
    ask(n, i, done) {
      quick(this, n, i, done, RULES, "Check 2, 3, 5 and 7. ");
    },
  };
  const OWN = {
    id: "pc-own",
    ic: "⚡",
    t: "On my own",
    sub: "Only the number",
    deal: dealPrime,
    key: pcKey,
    ask(n, i, done) {
      quick(this, n, i, done);
    },
  };

  const EVEN = {
    id: "even",
    ic: "⚖️",
    t: "Even or odd?",
    sub: "0 2 4 6 8 · 1 3 5 7 9",
    deal: () => deal((n) => n % 2 === 0, 1, 99),
    key: (n) => `${n} → ${n % 2 ? "odd" : "even"}`,
    ask(n, i, done) {
      frame(
        this,
        i,
        `${num(n, "last")}<p class="ng-q">Even or odd?</p>${ans(EO)}`,
        `${n}. Is it even or odd?`,
      );
      const e = n % 2 === 0;
      bindAns(e ? 1 : 0, (ok) =>
        fb(
          ok,
          `<p class="ng-why">Last digit <b class="ng-hl">${last(n)}</b> → ${e ? "even" : "odd"}</p>`,
          `The last digit is ${last(n)}. ${n} is ${e ? "even" : "odd"}.`,
          () => done(ok),
        ),
      );
    },
  };
  // a practice game "Can p divide it?": o: {ic, sub, from, how, help(n, box) = 💡 Help, why(n, yes) → [HTML, words, HTML under it]}
  function divGame(p, o) {
    return {
      id: "div" + p,
      ic: o.ic,
      t: `Divide by ${p}?`,
      sub: o.sub,
      deal: () => deal((n) => n % p === 0, o.from, 99),
      key: (n) =>
        `${n} → ${n % p ? `not ÷ ${p}` : `÷ ${p} · ${n} = ${p} × ${n / p}`}`,
      ask(n, i, done) {
        frame(
          this,
          i,
          `${num(n, o.how)}<p class="ng-q">Can ${p} divide it?</p>${o.help ? `<div class="ng-go"><button type="button" class="abtn ng-help">💡 Help</button></div><div class="ng-helpbox"></div>` : ""}${ans(YN(p))}`,
          `${n}. Can ${p} divide ${n}?`,
        );
        if (o.help) {
          const box = app.querySelector(".ng-helpbox");
          app.querySelector(".ng-help").onclick = () => o.help(n, box);
        }
        const yes = n % p === 0;
        bindAns(yes ? 1 : 0, (ok) => {
          const w = o.why(n, yes);
          fb(
            ok,
            `<p class="ng-why">${w[0]}</p>${w[2] || ""}${yes ? `<div class="ng-eq">${n} = <b class="a">${p}</b> × <b class="b">${n / p}</b></div>` : ""}`,
            w[1],
            () => done(ok),
          );
        });
      },
    };
  }
  const DIV3 = divGame(3, {
    ic: "3️⃣",
    sub: "Add the digits → 3 6 9",
    from: 10,
    how: "two",
    help: animSums,
    why(n, yes) {
      const { rows, end } = sums(n);
      return [
        `${rows.map((r) => `${r.a} + ${r.b} = ${r.s}`).join(" → ")} → <b>${end}</b> ${yes ? "is" : "is not"} 3, 6 or 9`,
        `The digits add up to ${end}. ${yes ? `3 divides ${n}.` : `3 does not divide ${n}.`}`,
      ];
    },
  });
  const DIV5 = divGame(5, {
    ic: "5️⃣",
    sub: "Last digit 0 or 5",
    from: 10,
    how: "last",
    why: (n, yes) => [
      `Last digit <b class="ng-hl">${last(n)}</b> ${yes ? "is" : "is not"} 0 or 5`,
      `The last digit is ${last(n)}. ${yes ? `5 divides ${n}.` : `5 does not divide ${n}.`}`,
    ],
  });
  const DIV7 = divGame(7, {
    ic: "7️⃣",
    sub: "The 7 list",
    from: 8, // not 7: it is not in the 7 list
    help(n, box) {
      box.innerHTML = sevens();
      say("The 7 list. Is the number in it?");
    },
    why: (n, yes) => [
      yes ? `${n} is in the 7 list` : `${n} is not in the 7 list`,
      yes
        ? `${n} is 7 times ${n / 7}. 7 divides ${n}.`
        : `${n} is not in the 7 list. 7 does not divide ${n}.`,
      sevens(n),
    ],
  });

  const PRIME = [STEP, HINTS, OWN];
  const PRACTICE = [EVEN, DIV3, DIV5, DIV7];
  const ALL = PRIME.concat(PRACTICE);

  // ---------- a round, the result, the home screen ----------
  function play(g) {
    const list = g.deal();
    const wrong = [];
    let i = 0,
      score = 0;
    const step = () => {
      if (i === list.length) return result(g, score, wrong);
      const n = list[i];
      g.ask(n, i, (ok) => {
        if (ok) score++;
        else wrong.push(n);
        i++;
        step();
      });
    };
    step();
  }

  function result(g, score, wrong) {
    stop();
    const old = best[g.id];
    const better = old === undefined || score > old;
    if (better) {
      best[g.id] = score;
      set(KEY, best);
    }
    const r = score / ROUND;
    const mood = r >= 0.9 ? "🎆" : r >= 0.7 ? "👍" : "💪";
    app.innerHTML = `<section class="card ng-res">
  <div class="ng-mood">${mood}</div>
  <p class="ng-score">${score} / ${ROUND}</p>
  ${old !== undefined ? `<p class="ng-best">${better ? "New best! 🏆" : `Best: ${best[g.id]} / ${ROUND}`}</p>` : ""}
  ${wrong.length ? `<div class="ng-wrong"><b>Look again:</b>${wrong.map((n) => `<div>${g.key(n)}</div>`).join("")}</div>` : '<p class="ng-best">No mistakes! 🎉</p>'}
  <div class="row ng-endnav"><button type="button" class="btn big" id="again">🔁 Play again</button><button type="button" class="btn ghost" id="toHome">← Games</button></div>
</section>`;
    document.getElementById("again").onclick = () => play(g);
    document.getElementById("toHome").onclick = home;
    say(
      `${score} of ${ROUND}. ${r >= 0.9 ? "Great!" : r >= 0.7 ? "Good!" : "Try again!"}`,
    );
    window.scrollTo({ top: 0 });
  }

  function tile(g, k) {
    const b = best[g.id];
    const done = b !== undefined && b / ROUND >= 0.9;
    const sub = [g.sub, b !== undefined ? `Best: ${b} / ${ROUND}` : ""]
      .filter(Boolean)
      .join(" · ");
    return `<button type="button" class="mode${done ? " done" : ""}" data-g="${k}" id="game-${g.id}"><span class="mi-ic">${g.ic}</span><b>${esc(g.t)}</b><small>${esc(sub)}</small>${done ? '<span class="tick" aria-label="done">✓</span>' : ""}</button>`;
  }

  const HOW =
    "A prime number divides only by 1 and itself. A composite number divides by another number too. Check 2, 3, 5 and 7.";
  function home() {
    stop();
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="../../../index.html">← Games</a><span class="eyebrow">Math · Games</span></div>
    <h1 class="hero-title"><span class="p">Prime</span> <span class="k">or composite?</span></h1>
    <div class="ng-intro">
      <div class="ng-ex pr"><b>💎 Prime</b>${proof(7)}<small>only 1 × itself: one line</small></div>
      <div class="ng-ex co"><b>🧱 Composite</b>${proof(6)}<small>divides by more: a rectangle</small></div>
    </div>
    <div class="row">${soundBtn()}<p class="howto">Check <b>÷ 2</b>, <b>÷ 3</b>, <b>÷ 5</b>, <b>÷ 7</b>. All ✗ → 💎 prime. One ✓ → 🧱 composite.</p></div>
  </section>
  <section class="card ng-pick">
    <h2 class="ng-h">💎 Prime or composite?</h2>
    <div class="modes">${PRIME.map((g) => tile(g, ALL.indexOf(g))).join("")}</div>
    <h2 class="ng-h">Practice the checks</h2>
    <div class="modes">${PRACTICE.map((g) => tile(g, ALL.indexOf(g))).join("")}</div>
  </section>`;
    bindSound();
    said = HOW;
    app
      .querySelectorAll("[data-g]")
      .forEach((b) => (b.onclick = () => play(ALL[+b.dataset.g])));
    window.scrollTo({ top: 0 });
  }
  home();
})();
