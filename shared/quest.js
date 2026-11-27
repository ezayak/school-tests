// Quest engine: the revision game of Social Studies, Science, Math and Computer (the look of the Term 1 « Quest » pages).
// A page loads theme.css + quiz.css, then common.js, quiz-common.js, its data file (window.QUEST), then this file.
// Start screen (lessons, Quick · Normal · All), mixed questions with a picture and lettered answers, matching rounds, score and review.
//
// window.QUEST = {
//   key: "g3ss-t2-mid",                 // remembers the length and lesson choice (localStorage key prefix)
//   hub: "../../../index.html",         // "← All games"
//   eyebrow: "Grade 3 Social Studies · Mid-term 2 revision",
//   title: ["Explorers", "Quest"],      // two words of the big title (orange, blue)
//   imgDir: "img/revision-1",           // p: "cabot" → img/revision-1/cabot.jpg (a name with an extension or a "/" is used as it is)
//   cover: "explorers",                 // the start picture: a picture name, or { e: "🧭 ⛵" }
//   chips: [["Early explorers", "pe"]], // the topics under it (colours: pe ke cool heat green)
//   lessons: [{ n: 2, l: "L2 · Early explorers" }],  // the lesson filter (shown when there are 2 or more); "All lessons" is added
//   mc: [ { l, q, o: [answers], c: right (default 0), k: keep order, x: why, and one picture:
//           p: "name" | e: "🌍 🌦️" (emoji) | ps: ["a", "b", "c"] (pictures A B C…) | svg: "<…>" (drawn in a 320×180 box) } ],
//   mt: [ { l, t: "Match each word to its meaning", p: [["🌦️", "Weather", "The condition of the air…"], …] } ],
// };
// An answer list ["True", "False"] shows as « True or false ».
// Every question has 🔊 (reads the question) and « Read taps » (off when the page opens): while it is on,
// each answer or matching box is read aloud when it is tapped, and a tapped answer is only chosen:
// « Check » marks it, then only « Next » is left.
(function () {
  const D = window.QUEST;
  const { esc, shuf, pick, star } = Kit;
  const app = document.getElementById("app");
  const MC = D.mc || [],
    MT = D.mt || [];

  // one picture per question (the helpers are shared with the sheet quiz: Kit.qPic in common.js)
  const scene = (q) => Kit.qPic(q, D.imgDir);

  /* ---------- reading aloud ---------- */
  const lang = document.documentElement.lang || "en";
  const V = Kit.voice(lang === "en" ? "en-US" : lang);
  let tapSay = false; // « Read taps »: off every time the page opens
  function say(t) {
    if (!V.ok || !t) return;
    V.hush();
    setTimeout(() => V.say(t, 0.9), 60); // speaking right after cancel() is ignored by Chrome
  }
  const tapRead = (t) => tapSay && say(t);
  // the question's label, 🔊 and « Read taps »
  const qbar = (label) =>
    `<div class="qbar">${label}${V.ok ? `<button type="button" class="abtn sm" id="sayQ" aria-label="Read the question">🔊</button><button type="button" class="abtn sm" id="tapSay" aria-pressed="${tapSay}">👆 Read taps: ${tapSay ? "On" : "Off"}</button>` : ""}</div>`;
  // onToggle: called after « Read taps » is switched
  function bindBar(text, onToggle) {
    const q = document.getElementById("sayQ"),
      t = document.getElementById("tapSay");
    if (q) q.onclick = () => say(text);
    if (t)
      t.onclick = () => {
        tapSay = !tapSay;
        t.setAttribute("aria-pressed", tapSay);
        t.textContent = "👆 Read taps: " + (tapSay ? "On" : "Off");
        if (!tapSay) V.hush();
        if (onToggle) onToggle();
      };
  }

  /* ---------- choices on the start screen ---------- */
  const LESSONS = [{ n: 0, l: "All lessons" }, ...(D.lessons || [])];
  const PAIRC = [
    "var(--ke)",
    "var(--pe)",
    "var(--cool)",
    "var(--heat)",
    "var(--green)",
  ];
  const LENS = [
    { mc: 8, mt: 2, l: "Quick · 10" },
    { mc: 16, mt: 4, l: "Normal · 20" },
    { mc: 0, mt: 0, l: "All" },
  ];
  const store = (k, v) => {
    try {
      localStorage.setItem(D.key + "-" + k, v);
    } catch (e) {}
  };
  const load = (k, list, def) => {
    try {
      const v = localStorage.getItem(D.key + "-" + k);
      if (v !== null && list[+v]) return +v;
    } catch (e) {}
    return def;
  };
  let lenIdx = load("len", LENS, 1),
    lesIdx = LESSONS.length > 2 ? load("lesson", LESSONS, 0) : 0;
  const pool = () => {
    const n = LESSONS[lesIdx].n;
    return {
      mc: MC.filter((q) => !n || q.l === n),
      mt: MT.filter((q) => !n || q.l === n),
    };
  };

  const S = { list: [], i: 0, score: 0, max: 0, miss: [] };
  const bolt =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#1B2440"/></svg>';

  function start() {
    const L = LENS[lenIdx],
      P = pool();
    const mc = shuf(P.mc)
      .slice(0, L.mc || P.mc.length)
      .map((q) => ({ type: "mc", ...q }));
    const mt = shuf(P.mt)
      .slice(0, L.mt || P.mt.length)
      .map((q) => ({ type: "mt", ...q }));
    let list = shuf(mc.concat(mt));
    // avoid two matching rounds in a row when possible
    for (let i = 1; i < list.length; i++) {
      if (list[i].type === "mt" && list[i - 1].type === "mt") {
        const j = list.findIndex((q, k) => k > i && q.type === "mc");
        if (j > 0) [list[i], list[j]] = [list[j], list[i]];
      }
    }
    S.list = list;
    S.i = 0;
    S.score = 0;
    S.miss = [];
    S.max = list.reduce((t, q) => t + (q.type === "mc" ? 1 : q.p.length), 0);
    render();
  }

  function hud() {
    const pct = Math.round((S.i / S.list.length) * 100);
    return `<div class="hud"><span class="qnum">Question ${S.i + 1} of ${S.list.length}</span><div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress"><i style="width:${pct}%"></i></div><span class="score" aria-label="Points">${bolt}<b id="pts">${S.score}</b></span></div>`;
  }

  function render() {
    if (!S.list.length) return home();
    if (S.i >= S.list.length) return end();
    const q = S.list[S.i];
    q.type === "mc" ? renderMC(q) : renderMT(q);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function home() {
    const P = pool(),
      n = P.mc.length + P.mt.length,
      cover =
        typeof D.cover === "string" ? { p: D.cover } : D.cover || { e: "⭐" };
    app.innerHTML = `<section class="card pop">
    <div class="topbar"><a class="back" href="${esc(D.hub)}">← All games</a><span class="eyebrow">${esc(D.eyebrow)}</span></div>
    <h1 class="hero-title"><span class="p">${esc(D.title[0])}</span> <span class="k">${esc(D.title[1])}</span></h1>
    ${scene(cover)}
    <p class="howto">Ready? Look at each picture, then choose the right answer.${MT.length ? " In matching rounds, tap a word and then tap its meaning." : ""} The questions are mixed up every time you play.</p>
    ${(D.chips || []).length ? `<div class="chips">${D.chips.map((c) => `<span class="chip ${esc(c[1] || "")}">${esc(c[0])}</span>`).join("")}</div>` : ""}
    ${LESSONS.length > 2 ? `<div class="row"><span class="eyebrow">Which lessons?</span><div class="seg" role="group" aria-label="Lessons">${LESSONS.map((l, i) => `<button type="button" id="les-${i}" data-les="${i}" aria-pressed="${i === lesIdx}">${esc(l.l)}</button>`).join("")}</div></div>` : ""}
    <div class="row"><span class="eyebrow">How many questions?</span><div class="seg" role="group" aria-label="Number of questions">${LENS.map((l, i) => `<button type="button" id="len-${i}" data-len="${i}" aria-pressed="${i === lenIdx}">${i === LENS.length - 1 ? "All · " + n : l.l}</button>`).join("")}</div></div>
    <div class="row"><button class="btn big" id="startBtn" type="button">Start</button></div>
  </section>`;
    app.querySelectorAll("[data-len]").forEach(
      (b) =>
        (b.onclick = () => {
          lenIdx = +b.dataset.len;
          store("len", lenIdx);
          home();
        }),
    );
    app.querySelectorAll("[data-les]").forEach(
      (b) =>
        (b.onclick = () => {
          lesIdx = +b.dataset.les;
          store("lesson", lesIdx);
          home();
        }),
    );
    document.getElementById("startBtn").onclick = start;
  }

  const nextRow = () =>
    `<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn next" id="nextBtn" type="button">${S.i + 1 < S.list.length ? "Next" : "See my score"}</button></div>`;
  function bindNext() {
    const n = document.getElementById("nextBtn");
    n.onclick = () => {
      V.hush();
      S.i++;
      render();
    };
    n.focus({ preventScroll: true });
  }

  function renderMC(q) {
    let opts = q.o.map((t, i) => ({ t, ok: i === (q.c || 0) }));
    if (!q.k) opts = shuf(opts);
    const long = opts.some((o) => o.t.length > 34);
    const tf = q.o.length === 2 && q.o[0] === "True" && q.o[1] === "False";
    app.innerHTML = `${hud()}<section class="card pop">
    ${qbar(`<span class="qtype mc">${tf ? "True or false" : "Choose the answer"}</span>`)}
    ${scene(q)}
    <p class="qtext">${esc(q.q)}</p>
    <div class="opts ${long ? "long" : ""}">${opts.map((o, i) => `<button type="button" class="opt" id="opt-${i}" data-i="${i}"><span class="L">${"ABCD"[i]}</span><span>${esc(o.t)}</span></button>`).join("")}</div>
    <div id="fbx"></div>
  </section>`;
    const btns = [...app.querySelectorAll(".opt")],
      fbx = document.getElementById("fbx");
    let chosen = -1,
      done = false;
    // « Read taps » on: a tap chooses (and reads) an answer, « Check » marks it
    function checkRow() {
      if (done) return;
      chosen = -1;
      btns.forEach((x) => {
        x.classList.remove("chosen");
        x.setAttribute("aria-pressed", "false");
      });
      fbx.innerHTML = tapSay
        ? `<div class="row" style="justify-content:flex-end"><button class="btn" id="checkBtn" type="button" disabled>Check my answer</button></div>`
        : "";
      const cb = document.getElementById("checkBtn");
      if (cb) cb.onclick = () => chosen >= 0 && answer(chosen);
    }
    function answer(k) {
      done = true;
      const b = btns[k],
        o = opts[k];
      const right = opts.find((z) => z.ok).t;
      btns.forEach((x, i) => {
        x.disabled = true;
        x.classList.remove("chosen");
        if (opts[i].ok) x.classList.add("right");
        else if (x !== b) x.classList.add("dim");
      });
      if (o.ok) S.score++;
      else {
        b.classList.add("wrong");
        S.miss.push({ q: q.q, your: o.t, right });
      }
      document.getElementById("pts").textContent = S.score;
      fbx.innerHTML = `<div class="fb ${o.ok ? "ok" : "no"}"><b>${o.ok ? pick(["Correct!", "Great job!", "You got it!", "Nice work!"]) : "Not quite."}</b><span>${o.ok ? "" : "The answer is <strong>" + esc(right) + "</strong>. "}${esc(q.x || "")}</span></div>${nextRow()}`;
      bindNext();
    }
    bindBar(q.q, checkRow);
    checkRow();
    btns.forEach(
      (b, k) =>
        (b.onclick = () => {
          if (!tapSay) return answer(k);
          say(opts[k].t);
          chosen = k;
          btns.forEach((x) => {
            x.classList.toggle("chosen", x === b);
            x.setAttribute("aria-pressed", x === b);
          });
          document.getElementById("checkBtn").disabled = false;
        }),
    );
  }

  function renderMT(q) {
    const left = shuf(q.p.map((p, i) => ({ i, ic: p[0], t: p[1] })));
    const right = shuf(q.p.map((p, i) => ({ i, t: p[2] })));
    const pair = {}; // leftIdx -> rightIdx
    let sel = null,
      checked = false;
    app.innerHTML = `${hud()}<section class="card pop">
    ${qbar(`<span class="qtype mt">Matching · ${q.p.length} points</span>`)}
    <p class="qtext">${esc(q.t)}</p>
    <p class="hint">Tap a word on the left, then tap its meaning on the right. Tap again to undo.</p>
    <div class="match"><div class="mcol" id="colL"></div><div class="mcol" id="colR"></div></div>
    <div id="fbx"><div class="row" style="justify-content:flex-end"><button class="btn" id="checkBtn" type="button" disabled>Check my matches</button></div></div>
  </section>`;
    bindBar(q.t);
    const colL = document.getElementById("colL"),
      colR = document.getElementById("colR");
    function draw() {
      colL.innerHTML = left
        .map((l, k) => {
          const p = pair[l.i] !== undefined;
          const ok = checked && pair[l.i] === l.i;
          const cls = checked ? (ok ? "ok" : "no") : sel === l.i ? "sel" : "";
          return `<button type="button" class="mi ${cls}" id="ml-${k}" data-l="${l.i}" ${checked ? "disabled" : ""}><span class="ic">${l.ic}</span><span class="tx">${esc(l.t)}${checked && !ok ? `<span class="fix">→ ${esc(q.p[l.i][2])}</span>` : ""}</span>${p ? `<span class="tag" style="background:${PAIRC[k % PAIRC.length]}">${k + 1}</span>` : ""}</button>`;
        })
        .join("");
      colR.innerHTML = right
        .map((r, k) => {
          const li = Object.keys(pair).find((x) => pair[x] === r.i);
          const lk = li !== undefined ? left.findIndex((x) => x.i === +li) : -1;
          const cls =
            checked && li !== undefined ? (+li === r.i ? "ok" : "no") : "";
          return `<button type="button" class="mi ${cls}" id="mr-${k}" data-r="${r.i}" ${checked ? "disabled" : ""}><span class="tx">${esc(r.t)}</span>${lk >= 0 ? `<span class="tag" style="background:${PAIRC[lk % PAIRC.length]}">${lk + 1}</span>` : ""}</button>`;
        })
        .join("");
      colL.querySelectorAll("[data-l]").forEach(
        (b) =>
          (b.onclick = () => {
            const li = +b.dataset.l;
            tapRead(q.p[li][1]);
            if (pair[li] !== undefined) {
              delete pair[li];
              sel = li;
            } else sel = sel === li ? null : li;
            draw();
          }),
      );
      colR.querySelectorAll("[data-r]").forEach(
        (b) =>
          (b.onclick = () => {
            const ri = +b.dataset.r;
            tapRead(q.p[ri][2]);
            const owner = Object.keys(pair).find((x) => pair[x] === ri);
            if (sel === null) {
              if (owner !== undefined) {
                delete pair[owner];
                draw();
              }
              return;
            }
            if (owner !== undefined) delete pair[owner];
            pair[sel] = ri;
            sel = null;
            draw();
          }),
      );
      const cb = document.getElementById("checkBtn");
      if (cb) cb.disabled = Object.keys(pair).length < q.p.length;
    }
    draw();
    document.getElementById("checkBtn").onclick = () => {
      checked = true;
      let got = 0;
      q.p.forEach((p, i) => {
        if (pair[i] === i) got++;
        else
          S.miss.push({
            q: "Match: " + p[1],
            your: q.p[pair[i]][2],
            right: p[2],
          });
      });
      S.score += got;
      document.getElementById("pts").textContent = S.score;
      draw();
      const all = got === q.p.length;
      document.getElementById("fbx").innerHTML =
        `<div class="fb ${all ? "ok" : "no"}"><b>${all ? "All matched!" : got + " of " + q.p.length + " correct"}</b><span>${all ? "Every pair is right. Great job!" : "Check the green and red boxes. The red ones show the right meaning under the word."}</span></div>${nextRow()}`;
      bindNext();
    };
  }

  function end() {
    const pct = Math.round((S.score / S.max) * 100);
    const st = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const msg =
      pct === 100
        ? "Perfect score! You are ready for the exam."
        : pct >= 90
          ? "Excellent! Almost perfect."
          : pct >= 70
            ? "Good work! Look at the review below and play again."
            : pct >= 50
              ? "Not bad. Read the review below, then try again."
              : "Keep practicing. Read the review below and play again.";
    app.innerHTML = `<section class="card pop">
    <span class="eyebrow">Your score</span>
    <div class="big-score">${S.score}<small> / ${S.max} points</small></div>
    <div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div>
    <h2>${pct}% · ${msg}</h2>
    <div class="row"><button class="btn big" id="againBtn" type="button">Play again</button><button class="btn ghost" id="homeBtn" type="button">Back to start</button></div>
  </section>
  ${S.miss.length ? `<section class="card"><h3>Let's review (${S.miss.length})</h3><ul class="review">${S.miss.map((m) => `<li><div class="q">${esc(m.q)}</div><div class="a">You chose: <s>${esc(m.your)}</s><br>Right answer: <em>${esc(m.right)}</em></div></li>`).join("")}</ul></section>` : ""}`;
    document.getElementById("againBtn").onclick = start;
    document.getElementById("homeBtn").onclick = () => {
      S.list = [];
      home();
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  Quiz.watch(app);
  home();
})();
