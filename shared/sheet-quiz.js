// Sheet quiz: a school sheet (photos sent to the Telegram bot) made into a homework helper, with the look of the Quest pages.
// No right or wrong, no score: every question is explained (a picture, simple words, 🔊 Listen reads the question and the help,
// 🐢 Slow on = slower reading; a tapped answer is read too), the child chooses an answer,
// can go back and change it, and the end shows « My answers » in the sheet's order, to copy onto the paper.
// A page loads theme.css + quiz.css, then common.js, quiz-common.js, its data file (window.SHEET), then this file.
//
// window.SHEET = {
//   key: "quiz-alex-20261125-computer",  // where the answers are kept on the device (localStorage)
//   lang: "en",                          // the sheet's language: "en" | "fr" | "ar" (right to left, Google's online voice)
//   eyebrow: "Computer · Classwork 2 · Unit 2 Lesson 3",
//   title: ["Grammar", "Check"],         // two words of the big title (orange, blue)
//   imgDir: "img",                       // p: "find" → img/find.jpg (a name with an extension or a "/" is used as it is)
//   cover: "find" | { e: "📄 ✏️" },       // the start picture
//   story: "story.html",                 // a story on the sheet: its page (shared/story.js, no summary, done: back here); 📖 buttons
//   qs: [ { n: "1a",                     // the number on the sheet
//           part: "A · Choose the correct answer",  // the sheet's part (shown above the question)
//           q: "the question as on the sheet",
//           help: "what it asks, in simple words (one idea per sentence)",
//           o: ["answer", …],            // 2–4 answers; ["True", "False"] shows as « True or false »; k: 1 keeps their order
//           p | e | ps | svg,            // one picture, as in the Quest (Kit.qPic)
//           sim: { app: "word" | "windows" | "outlook" | "edge", start: {…}, say: "what to try" } } ],  // 🖥 Try it (Computer)
// };
(function () {
  const D = window.SHEET;
  const { esc, qPic } = Kit;
  const app = document.getElementById("app");
  const QS = D.qs || [];
  const RTL = D.lang === "ar";
  const ROOT = new URL("../", document.currentScript.src).href;

  /* ---------- the answers, kept on the device ---------- */
  let ans = {}; // question index -> answer text
  try {
    ans = JSON.parse(localStorage.getItem(D.key + "-answers")) || {};
  } catch (e) {}
  const keep = () => {
    try {
      localStorage.setItem(D.key + "-answers", JSON.stringify(ans));
    } catch (e) {}
  };
  const done = () => QS.filter((q, i) => ans[i] !== undefined).length;

  /* ---------- 🔊 read aloud ---------- */
  const V = Kit.voice(
    { en: "en-US", fr: "fr-FR", ar: "ar" }[D.lang || "en"] || "en-US",
    { online: RTL },
  );
  // 🔊 Listen reads the question, then the help; a tapped answer is read at once. 🐢 Slow (on or off, kept on the device) slows both.
  const RATE = 0.9,
    SLOW = 0.6;
  let slow = false;
  try {
    slow = localStorage.getItem("sheet-quiz-slow") === "1";
  } catch (e) {}
  const rate = () => (slow ? SLOW : RATE);
  const sayable = (t) =>
    String(t || "").replace(
      /_{2,}/g,
      D.lang === "en" || !D.lang ? " blank " : " ",
    );
  let turn = 0; // a newer speak() stops the lines still waiting of an older one
  const speak = (lines, rate) => {
    const me = ++turn;
    V.hush();
    lines
      .filter(Boolean)
      .reduce(
        (p, t) => p.then(() => me === turn && V.say(sayable(t), rate)),
        Promise.resolve(),
      );
  };
  const hush = () => {
    turn++;
    V.hush();
  };

  /* ---------- 🖥 Try it: a pretend program in a popup ---------- */
  const SIMS = {
    word: {
      g: "WordSim",
      js: "shared/wordsim.js",
      css: "shared/wordsim.css",
      name: "Mini Word",
    },
    windows: {
      g: "WinSim",
      js: "grade-4/computer/chapter-1/winsim.js",
      css: "grade-4/computer/chapter-1/winsim.css",
      name: "Mini Windows",
    },
    outlook: {
      g: "NetSim",
      js: "shared/netsim.js",
      css: "shared/netsim.css",
      name: "Mini Outlook",
    },
    edge: {
      g: "NetSim",
      js: "shared/netsim.js",
      css: "shared/netsim.css",
      name: "Mini Edge",
    },
  };
  const loaded = {};
  const need = (s) =>
    loaded[s.js] ||
    (loaded[s.js] = new Promise((ok, no) => {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = ROOT + s.css;
      document.head.appendChild(l);
      const sc = document.createElement("script");
      sc.src = ROOT + s.js;
      sc.onload = ok;
      sc.onerror = no;
      document.head.appendChild(sc);
    }));
  function openSim(sim) {
    const s = SIMS[sim.app];
    const start =
      sim.app === "edge" ? { app: "edge", ...sim.start } : sim.start || {};
    const dlg = document.createElement("dialog");
    dlg.className = "simdlg";
    dlg.innerHTML = `<div class="simhead"><b>🖥 ${esc(s.name)}</b>${sim.say ? `<span>${esc(sim.say)}</span>` : ""}<button type="button" class="btn ghost" id="simClose" aria-label="Close">✕</button></div><div class="simbox" id="simbox"></div>`;
    document.body.appendChild(dlg);
    const close = () => {
      dlg.close();
      dlg.remove();
    };
    dlg.querySelector("#simClose").onclick = close;
    dlg.addEventListener("cancel", (e) => {
      e.preventDefault();
      close();
    });
    dlg.showModal(); // shown first: the program takes its size from the box
    need(s).then(
      () => window[s.g].create(dlg.querySelector("#simbox"), { start }),
      () =>
        (dlg.querySelector("#simbox").textContent =
          "The pretend program could not be opened (no internet?)."),
    );
  }

  /* ---------- screens ---------- */
  let at = -1; // -1 = the start screen, QS.length = « My answers »
  const go = (i) => {
    hush();
    at = i;
    render();
  };
  function render() {
    if (at < 0) return home();
    if (at >= QS.length) return end();
    question(QS[at], at);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function home() {
    const n = done(),
      cover =
        typeof D.cover === "string" ? { p: D.cover } : D.cover || { e: "📝" };
    app.innerHTML = `<section class="card pop">
    <div class="topbar"><a class="back" href="${ROOT}index.html">← All games</a><span class="eyebrow">${esc(D.eyebrow)}</span></div>
    <h1 class="hero-title"><span class="p">${esc(D.title[0])}</span> <span class="k">${esc(D.title[1])}</span></h1>
    ${qPic(cover, D.imgDir)}
    <p class="howto">Your sheet has ${QS.length} questions. Look at the picture. Read the 💡 help, or press 🔊 Listen to hear the question and the help (🐢 Slow reads more slowly). Then choose your answer: it is read to you. You can go back and change it. At the end you see all your answers, to write on the sheet.</p>
    ${D.story ? `<div class="row"><a class="btn big" href="${esc(D.story)}">📖 Read the story</a></div>` : ""}
    <div class="row">${n ? `<button class="btn big" id="goOn" type="button">Go on · ${n} of ${QS.length} done</button><button class="btn ghost" id="mine" type="button">My answers</button>` : `<button class="btn big" id="goOn" type="button">Start</button>`}</div>
  </section>`;
    document.getElementById("goOn").onclick = () => {
      const i = QS.findIndex((q, k) => ans[k] === undefined);
      go(i < 0 ? 0 : i);
    };
    const m = document.getElementById("mine");
    if (m) m.onclick = () => go(QS.length);
  }

  function question(q, i) {
    const pct = Math.round((done() / QS.length) * 100);
    const tf = q.o.length === 2 && q.o[0] === "True" && q.o[1] === "False";
    const long = q.o.some((t) => t.length > 34);
    const sim = q.sim && SIMS[q.sim.app];
    app.innerHTML = `<div class="hud"><span class="qnum">Question ${i + 1} of ${QS.length}</span><div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Answered"><i style="width:${pct}%"></i></div></div>
  <section class="card pop">
    <span class="qtype mc">${esc(q.n ? "Number " + q.n : "Question")}${q.part ? " · " + esc(q.part) : ""}${tf ? " · True or false" : ""}</span>
    ${qPic(q, D.imgDir)}
    <p class="qtext" ${RTL ? 'dir="rtl" lang="ar"' : ""}>${esc(q.q)}</p>
    ${q.help ? `<div class="sq-help" ${RTL ? 'dir="rtl" lang="ar"' : ""}><b>💡</b><span>${esc(q.help)}</span></div>` : ""}
    <div class="row sq-tools">${D.story ? `<a class="btn ghost" href="${esc(D.story)}">📖 Story</a>` : ""}${V.ok ? `<button class="btn ghost" id="say" type="button">🔊 Listen</button><button class="btn ghost sq-toggle" id="slow" type="button" aria-pressed="${slow}">🐢 Slow</button>` : ""}${sim ? `<button class="btn ghost" id="sim" type="button">🖥 Try it in ${esc(sim.name)}</button>` : ""}</div>
    <div class="opts ${long ? "long" : ""}" ${RTL ? 'dir="rtl"' : ""}>${q.o.map((t, k) => `<button type="button" class="opt ${ans[i] === t ? "chosen" : ""}" data-k="${k}" aria-pressed="${ans[i] === t}"><span class="L">${"ABCD"[k]}</span><span>${esc(t)}</span></button>`).join("")}</div>
    <div class="row sq-nav"><button class="btn ghost" id="back" type="button">← Back</button><button class="btn next" id="next" type="button">${i + 1 < QS.length ? "Next →" : "My answers"}</button></div>
  </section>`;
    app.querySelectorAll(".opt").forEach(
      (b) =>
        (b.onclick = () => {
          ans[i] = q.o[+b.dataset.k];
          keep();
          speak([ans[i]], rate());
          app.querySelectorAll(".opt").forEach((x) => {
            x.classList.toggle("chosen", x === b);
            x.setAttribute("aria-pressed", x === b);
          });
          document.getElementById("next").focus({ preventScroll: true });
        }),
    );
    const s = document.getElementById("say");
    if (s) s.onclick = () => speak([q.q, q.help], rate());
    const sl = document.getElementById("slow");
    if (sl)
      sl.onclick = () => {
        slow = !slow;
        sl.setAttribute("aria-pressed", slow);
        try {
          localStorage.setItem("sheet-quiz-slow", slow ? "1" : "0");
        } catch (e) {}
      };
    if (sim) document.getElementById("sim").onclick = () => openSim(q.sim);
    document.getElementById("back").onclick = () => go(i - 1);
    document.getElementById("next").onclick = () => go(i + 1);
  }

  function end() {
    const n = done();
    app.innerHTML = `<section class="card pop">
    <div class="topbar"><a class="back" href="${ROOT}index.html">← All games</a><span class="eyebrow">${esc(D.eyebrow)}</span></div>
    <h2>My answers · ${n} of ${QS.length}</h2>
    <p class="howto">Now write your answers on the sheet. Tap a question to change it.</p>
    <ul class="review sq-mine" ${RTL ? 'dir="rtl"' : ""}>${QS.map((q, i) => `<li><button type="button" class="sq-goto" data-i="${i}"><div class="q"><b>${esc(q.n || String(i + 1))}.</b> ${esc(q.q)}</div><div class="a">${ans[i] === undefined ? "<s>not answered yet</s>" : `<em>${esc("ABCD"[q.o.indexOf(ans[i])] || "")}. ${esc(ans[i])}</em>`}</div></button></li>`).join("")}</ul>
    <div class="row"><button class="btn ghost" id="back" type="button">← Back</button><button class="btn ghost" id="clear" type="button">Start again</button></div>
  </section>`;
    app
      .querySelectorAll(".sq-goto")
      .forEach((b) => (b.onclick = () => go(+b.dataset.i)));
    document.getElementById("back").onclick = () => go(QS.length - 1);
    document.getElementById("clear").onclick = () => {
      ans = {};
      keep();
      go(-1);
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  Quiz.watch(app);
  render();
})();
