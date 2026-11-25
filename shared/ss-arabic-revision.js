/* SS Arabic revision engine (Grade 4 Social Studies in Arabic, الدراسات الاجتماعية): the look of the Mid-term 1 October revision.
   A revision page loads ../../../shared/common.js, ../../../quiz-common.js, its data file (window.SSA_REV), then this file.
   window.SSA_REV = {
     key: storage prefix ("ssa4": the tab, the lessons filter, the English switch are remembered per key),
     eyebrow: the line at the top, sub: the Arabic title of the sheet tab, img: picture folder ("img/revision-1/", p → <img>/<p>.jpg),
     units: lessons filter of the Key terms tab [{k: "1", t: "Lesson 1"}, …, {k: "all", t: "All"}], mix: questions in Mixed (15),
     sheet: [{k, ic, t: English title, ar: Arabic instruction, ask?, askE?, qs: [question]}], question: {q, en, o: [[ar, en], …] (right first), p, fit} or {q, en, tf, x},
     terms: [{u: lesson, w: term, we: English term, t: Arabic definition, en: English, p: picture}]
   }
   Pages: grade-4/term-1/social-studies-arabic/revision-1.html. Skill: ss-arabic-lesson ("Revisions"). */
(function () {
  const R = window.SSA_REV,
    SHEET = R.sheet,
    TERMS = R.terms,
    MIX = R.mix || 15;
  /* ---------- utilities ---------- */
  const app = document.getElementById("app");
  const { esc, shuf, pick, star } = Kit;
  const ar = (s) => `<span class="ar" lang="ar" dir="rtl">${esc(s)}</span>`;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
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
  const bolt =
    '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#1B2440"/></svg>';
  const pic = (p, fit) =>
    `<img class="scene pic${fit ? " fit" : ""}" src="${R.img}${p}.jpg" alt="">`;

  /* ---------- voice: the device's Arabic voice, else Google's online voice (needs internet) ---------- */
  const TTS = "speechSynthesis" in window;
  let voice = null;
  function pickVoice() {
    if (!TTS) return;
    voice =
      speechSynthesis
        .getVoices()
        .find((v) => v.lang.toLowerCase().startsWith("ar")) || null;
  }
  if (TTS) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  const canSpeak = () => !!voice || navigator.onLine;
  // Online voice: unofficial Google Translate endpoint; max ~200 chars per request and it refuses requests with a referrer (meta tag in <head>)
  const TTS_URL =
    "https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=";
  const player = new Audio();
  let parts = [],
    reading = false; // reading: an online text is mid-way (so Resume may continue it)
  function chunks(t) {
    const out = [];
    let s = t.replace(/\n/g, ". ").trim();
    while (s.length > 180) {
      let k = Math.max(
        ...[".", "،", "؛", "؟", "!", ":"].map((c) => s.lastIndexOf(c, 180)),
      );
      if (k < 40) k = s.lastIndexOf(" ", 180);
      if (k < 1) k = 180;
      out.push(s.slice(0, k + 1).trim());
      s = s.slice(k + 1).trim();
    }
    if (s) out.push(s);
    return out;
  }
  function hush() {
    try {
      TTS && speechSynthesis.cancel();
    } catch (e) {}
    parts = [];
    reading = false;
    player.pause();
  }
  function sayOnline(text, slow) {
    parts = chunks(text);
    reading = true;
    const rate = slow ? 0.7 : 1;
    const nextPart = () => {
      const t = parts.shift();
      if (!t) {
        reading = false;
        return;
      }
      player.src = TTS_URL + encodeURIComponent(t);
      player.defaultPlaybackRate = player.playbackRate = rate;
      player.play().catch(() => {});
    };
    player.onended = nextPart;
    nextPart();
  }
  function say(text, slow) {
    hush();
    if (voice) {
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = voice.lang;
        u.voice = voice;
        u.rate = slow ? 0.55 : 0.75;
        speechSynthesis.speak(u);
      } catch (e) {}
    } else if (navigator.onLine) sayOnline(text, slow);
  }

  /* ---------- English toggle: remembered between questions ---------- */
  let enOn = store.get(R.key + "-en", "0") === "1";
  const tools = () =>
    `<div class="tools">${canSpeak() ? '<button type="button" class="abtn" id="say1">🔊 Listen</button><button type="button" class="abtn" id="say2">🐢 Slowly</button>' : ""}<button type="button" class="abtn" id="enBtn" aria-pressed="${enOn}">🇬🇧 English</button></div>`;
  function bindTools(t) {
    const s1 = document.getElementById("say1");
    if (s1) {
      s1.onclick = () => say(t);
      document.getElementById("say2").onclick = () => say(t, true);
    }
    const b = document.getElementById("enBtn");
    b.onclick = () => {
      enOn = !enOn;
      store.set(R.key + "-en", enOn ? "1" : "0");
      b.setAttribute("aria-pressed", enOn);
      document.getElementById("qcard").classList.toggle("show-en", enOn);
    };
  }

  /* ---------- home: pick a tab, then a game ---------- */
  const ALLQ = SHEET.flatMap((s) => expand(s));
  const MODE_NAME = Object.fromEntries([
    ...SHEET.map((s) => [s.k, s.t]),
    ["mix", "Mixed questions"],
    ["fill", "Which term?"],
    ["build", "Build the definition"],
  ]);
  const TMODES = [
    {
      k: "learn",
      ic: "📖",
      t: "Learn the terms",
      d: "Read, listen and see each term in English",
    },
    {
      k: "fill",
      ic: "🧩",
      t: "Which term?",
      d: `${ar("ما المصطلح؟")}<br>Read the meaning, choose the term`,
    },
    {
      k: "build",
      ic: "🔤",
      t: "Build the definition",
      d: `${ar("رتب الكلمات")}<br>Put the words in order`,
    },
  ];
  const TABS = [
    {
      k: "sheet",
      ic: "📝",
      t: "Revision sheet",
      short: "Sheet",
      sub: R.sub,
      ms: [
        ...SHEET.map((s) => ({
          k: s.k,
          ic: s.ic,
          t: s.t,
          d: `${ar(s.ar)}<br>${expand(s).length} questions`,
        })),
        {
          k: "mix",
          ic: "🎲",
          t: "Mixed",
          d: `${MIX} questions from the whole sheet`,
        },
      ],
    },
    {
      k: "terms",
      ic: "📚",
      t: "Key terms",
      short: "Terms",
      sub: "أهم المصطلحات",
      ms: TMODES,
    },
  ];
  let tab = store.get(R.key + "-tab", "sheet");
  if (!TABS.some((t) => t.k === tab)) tab = "sheet";
  const UNITS = R.units;
  let unit = store.get(R.key + "-unit", "all");
  if (!UNITS.some((u) => u.k === unit)) unit = "all";
  const terms = () =>
    TERMS.filter((v) => unit === "all" || String(v.u) === unit);
  const modeBtns = (ms) =>
    `<div class="modes">${ms.map((m) => `<button type="button" class="mode" id="mode-${m.k}" data-m="${m.k}"><span class="mi-ic">${m.ic}</span><b>${m.t}</b><small>${m.d}</small></button>`).join("")}</div>`;
  function home(still) {
    // still===true: switching tab, so no pop animation
    hush();
    const T = TABS.find((t) => t.k === tab);
    app.innerHTML = `<section class="card ${still === true ? "" : "pop"}">
    <div class="topbar"><a class="back" href="../../../index.html">← All games</a><span class="eyebrow">${esc(R.eyebrow)}</span></div>
    <h1 class="hero-title"><span class="p">Social Studies</span> <span class="k">Revision</span></h1>
    <div class="hero-ar ar" lang="ar" dir="rtl">مراجعة الدراسات الاجتماعية</div>
    <p class="howto">Ready? Pick a tab, then choose a game. On every question you can listen to the Arabic and see it in English.</p>
    <div class="tabbox"><div class="ftabs" role="group" aria-label="Kind of game">${TABS.map((t) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span><span class="tl">${esc(t.t)}</span><span class="ts">${esc(t.short)}</span></button>`).join("")}</div>
    <div class="panel">
    <div class="ar tab-sub" lang="ar" dir="rtl">${esc(T.sub)}</div>
    ${tab === "terms" ? `<div class="row"><span class="lab">Terms</span><div class="seg" role="group" aria-label="Terms">${UNITS.map((u) => `<button type="button" id="un-${u.k}" data-un="${u.k}" aria-pressed="${unit === u.k}">${u.t} · ${TERMS.filter((v) => u.k === "all" || String(v.u) === u.k).length}</button>`).join("")}</div></div>` : ""}
    ${modeBtns(T.ms)}
    </div></div>
  </section>`;
    app.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          store.set(R.key + "-tab", tab);
          home(true);
        }),
    );
    app.querySelectorAll("[data-un]").forEach(
      (b) =>
        (b.onclick = () => {
          unit = b.dataset.un;
          store.set(R.key + "-unit", unit);
          home(true);
        }),
    );
    app
      .querySelectorAll("[data-m]")
      .forEach((b) => (b.onclick = () => startMode(b.dataset.m)));
  }

  /* ---------- shared game state ---------- */
  const S = { mode: null, list: [], i: 0, score: 0, max: 0, miss: [] };
  // one sheet section → its questions, each knowing its section and question word
  function expand(s) {
    return s.qs.map((q) => ({
      ask: s.ask || "",
      askE: s.askE || "",
      ...q,
      sec: s,
    }));
  }
  function hud(label) {
    const pct = Math.round((S.i / Math.max(1, S.list.length)) * 100);
    return `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to games">←</button><span class="qnum">${label}</span><div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress"><i style="width:${pct}%"></i></div><span class="score" aria-label="Points">${bolt}<b id="pts">${S.score}</b></span></div>`;
  }
  function bindHome() {
    const h = document.getElementById("homeBtn");
    if (h) h.onclick = home;
  }
  function startMode(m) {
    S.mode = m;
    S.i = 0;
    S.score = 0;
    S.miss = [];
    tab = TABS.find((t) => t.ms.some((x) => x.k === m)).k;
    store.set(R.key + "-tab", tab); // back to this game's tab afterwards
    if (m === "mix") S.list = shuf(ALLQ).slice(0, MIX);
    else if (m === "learn") S.list = terms();
    else if (m === "fill" || m === "build") S.list = shuf(terms());
    else {
      const s = SHEET.find((x) => x.k === m);
      S.list = m === "map" ? expand(s) : shuf(expand(s));
    } // map questions follow the sheet's order
    S.max = S.list.length;
    next(true);
  }
  function next(first) {
    if (!first) S.i++;
    if (S.i >= S.list.length) return S.mode === "learn" ? home() : end();
    (({ learn, fill, build })[S.mode] || quiz)();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function fb(ok, html) {
    return `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? pick(["Correct!", "Great job!", "You got it!", "Super!", "ممتاز!"]) : "Not quite."}</b><span>${html}</span></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn next" id="nextBtn" type="button">${S.i + 1 < S.list.length ? "Next" : "See my score"}</button></div>`;
  }
  function bindNext() {
    const n = document.getElementById("nextBtn");
    n.onclick = () => next();
    n.focus({ preventScroll: true });
  }

  /* ---------- SHEET QUESTION: picture, Arabic sentence, choices (or صواب / خطأ) ---------- */
  function quiz() {
    const q = S.list[S.i],
      gap = q.q.includes("___");
    const opts =
      q.tf !== undefined
        ? [
            { a: "صواب", e: "right ✓", ok: q.tf },
            { a: "خطأ", e: "wrong ✗", ok: !q.tf },
          ]
        : shuf(q.o.map(([a, e], i) => ({ a, e, ok: !i })));
    const R = opts.find((o) => o.ok),
      right = R.a,
      long = opts.some((o) => o.a.length > 30);
    const sent = (g) =>
      gap
        ? esc(q.q).replace(
            "___",
            `<span class="gap">${g ? esc(g) : "&nbsp;"}</span>`,
          )
        : esc(q.q);
    const spoken = (q.ask ? q.ask + " " : "") + q.q.replace("___", "...");
    app.innerHTML = `${hud(`Question ${S.i + 1} of ${S.list.length}`)}<section class="card pop${enOn ? " show-en" : ""}" id="qcard">
    <div class="qhead"><span class="qtype mc">${esc(q.sec.t)}</span><span class="ar sec" lang="ar" dir="rtl">${esc(q.sec.ar)}</span></div>
    ${pic(q.p, q.fit)}
    ${q.ask ? `<p class="ask"><span class="ar" lang="ar" dir="rtl">${esc(q.ask)}</span><small>${esc(q.askE)}</small></p>` : ""}
    <p class="sent ar${q.q.length > 60 ? " long" : ""}" lang="ar" dir="rtl" id="sent">${sent()}</p>
    <p class="en">${esc(q.en)}</p>
    ${tools()}
    <div class="opts${long ? " long" : ""}">${opts.map((o, i) => `<button type="button" class="opt aro${long ? " lng" : ""}" id="opt-${i}" data-i="${i}"><span class="L">${"ABCD"[i]}</span><span class="ow">${ar(o.a)}<small class="en">${esc(o.e)}</small></span></button>`).join("")}</div>
    <div id="fbx"></div>
  </section>`;
    bindHome();
    bindTools(spoken);
    const btns = [...app.querySelectorAll(".opt")];
    btns.forEach(
      (b) =>
        (b.onclick = () => {
          const o = opts[+b.dataset.i];
          btns.forEach((x, i) => {
            x.disabled = true;
            if (opts[i].ok) x.classList.add("right");
            else if (x !== b) x.classList.add("dim");
          });
          if (o.ok) S.score++;
          else {
            b.classList.add("wrong");
            S.miss.push({
              q: `${q.ask ? ar(q.ask) + " " : ""}${ar(q.q)}`,
              your: o.a,
              right,
            });
          }
          document.getElementById("pts").textContent = S.score;
          let html;
          if (gap) {
            const full = q.q.replace("___", right);
            document.getElementById("sent").innerHTML = sent(right);
            say(full);
            html = `<span class="full">${ar(full)}</span><span class="fen">${esc(cap(q.en.replace("___", R.e)))}</span>`;
          } else if (q.tf !== undefined) {
            html = `This sentence is ${ar(right)} (${q.tf ? "right" : "wrong"}).${q.x ? " " + esc(q.x).replace(/[؀-ۿ]+(?:\s+[؀-ۿ]+)*/g, ar) : ""}<span class="fen">${esc(q.en)}</span>`;
          } else {
            say(right);
            html = `<span class="full">${ar(right)}</span><span class="fen">${esc(cap(R.e))}</span>`;
          }
          document.getElementById("fbx").innerHTML = fb(o.ok, html);
          bindNext();
        }),
    );
  }

  /* ---------- KEY TERMS: learn, which term, build the definition ---------- */
  const thead = (t, a) =>
    `<div class="qhead"><span class="qtype mc">${t}</span><span class="ar sec" lang="ar" dir="rtl">${a}</span></div>`;
  const tname = (v) =>
    `<p class="term"><span class="ar" lang="ar" dir="rtl">${esc(v.w)}</span><small>${esc(v.we)}</small></p>`;
  function learn() {
    const v = S.list[S.i],
      n = S.list.length;
    app.innerHTML = `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to games">←</button><span class="qnum">Term ${S.i + 1} of ${n}</span></div>
  <section class="card pop${enOn ? " show-en" : ""}" id="qcard">
    ${thead("Learn the term", "أهم المصطلحات")}
    ${pic(v.p, v.p.startsWith("map"))}
    ${tname(v)}
    <p class="verse ar" lang="ar" dir="rtl">${esc(v.t)}</p>
    <p class="en">${esc(v.en)}</p>
    ${tools()}
    <div class="row" style="justify-content:space-between"><button class="btn ghost" id="prevBtn" type="button" ${S.i ? "" : "disabled"}>Back</button><button class="btn" id="nextBtn" type="button">${S.i + 1 < n ? "Next term" : "Done"}</button></div>
  </section>`;
    bindHome();
    bindTools(v.w + ". " + v.t);
    document.getElementById("prevBtn").onclick = () => {
      S.i -= 2;
      next();
    };
    document.getElementById("nextBtn").onclick = () => next();
  }
  // definition shown → choose its term from three (the others come from all the terms)
  function fill() {
    const v = S.list[S.i];
    const opts = shuf([
      { v, ok: true },
      ...shuf(TERMS.filter((x) => x.w !== v.w))
        .slice(0, 2)
        .map((x) => ({ v: x, ok: false })),
    ]);
    app.innerHTML = `${hud(`Term ${S.i + 1} of ${S.list.length}`)}<section class="card pop${enOn ? " show-en" : ""}" id="qcard">
    ${thead("Which term?", "ما المصطلح؟")}
    ${pic(v.p, v.p.startsWith("map"))}
    <p class="verse ar" lang="ar" dir="rtl">${esc(v.t)}</p>
    <p class="en">${esc(v.en)}</p>
    ${tools()}
    <div class="opts">${opts.map((o, i) => `<button type="button" class="opt aro" id="opt-${i}" data-i="${i}"><span class="L">${"ABC"[i]}</span><span class="ow">${ar(o.v.w)}<small class="en">${esc(o.v.we)}</small></span></button>`).join("")}</div>
    <div id="fbx"></div>
  </section>`;
    bindHome();
    bindTools(v.t);
    const btns = [...app.querySelectorAll(".opt")];
    btns.forEach(
      (b) =>
        (b.onclick = () => {
          const o = opts[+b.dataset.i];
          btns.forEach((x, i) => {
            x.disabled = true;
            if (opts[i].ok) x.classList.add("right");
            else if (x !== b) x.classList.add("dim");
          });
          if (o.ok) S.score++;
          else {
            b.classList.add("wrong");
            S.miss.push({ q: ar(v.t), your: o.v.w, right: v.w });
          }
          document.getElementById("pts").textContent = S.score;
          say(v.w);
          document.getElementById("fbx").innerHTML = fb(
            o.ok,
            `<span class="full">${ar(v.w)} · ${esc(v.we)}</span><span class="fen">${esc(v.en)}</span>`,
          );
          bindNext();
        }),
    );
  }
  // tiles: single words, or 2–3 words for long definitions
  const tilesOf = (v) => {
    const w = v.t.split(" "),
      n = w.length > 24 ? 3 : w.length > 12 ? 2 : 1,
      r = [];
    for (let i = 0; i < w.length; i += n) r.push(w.slice(i, i + n).join(" "));
    return r;
  };
  function build() {
    const v = S.list[S.i],
      tiles = tilesOf(v);
    const bank = shuf(tiles.map((_, i) => i));
    let line = [],
      checked = false;
    app.innerHTML = `${hud(`Term ${S.i + 1} of ${S.list.length}`)}<section class="card pop${enOn ? " show-en" : ""}" id="qcard">
    ${thead("Build the definition", "رتب الكلمات")}
    ${pic(v.p, v.p.startsWith("map"))}
    ${tname(v)}
    <p class="hint">Tap the words in order to write what the term means. Start on the right. Tap a word in your answer to take it back.</p>
    <p class="en">${esc(v.en)}</p>
    ${tools()}
    <div class="words" id="vline" dir="rtl"></div>
    <div class="words" id="bank" dir="rtl"></div>
    <div id="fbx"><div class="row" style="justify-content:flex-end"><button class="btn" id="checkBtn" type="button" disabled>Check</button></div></div>
  </section>`;
    bindHome();
    bindTools(v.t);
    const tile = (i, cls) =>
      `<button type="button" class="mi ${cls}" data-w="${i}" ${checked ? "disabled" : ""}><span class="tx">${ar(tiles[i])}</span></button>`;
    function draw() {
      document.getElementById("vline").innerHTML = line.length
        ? line
            .map((i, k) =>
              tile(i, checked ? (tiles[i] === tiles[k] ? "ok" : "no") : ""),
            )
            .join("")
        : '<span class="hint" dir="ltr">Tap the first word.</span>';
      document.getElementById("bank").innerHTML = bank
        .map((i) => tile(i, ""))
        .join("");
      app.querySelectorAll("#vline [data-w]").forEach(
        (b) =>
          (b.onclick = () => {
            const i = +b.dataset.w;
            line = line.filter((x) => x !== i);
            bank.push(i);
            draw();
          }),
      );
      app.querySelectorAll("#bank [data-w]").forEach(
        (b) =>
          (b.onclick = () => {
            const i = +b.dataset.w;
            bank.splice(bank.indexOf(i), 1);
            line.push(i);
            say(tiles[i]);
            draw();
          }),
      );
      const cb = document.getElementById("checkBtn");
      if (cb) cb.disabled = bank.length > 0;
    }
    draw();
    document.getElementById("checkBtn").onclick = () => {
      checked = true;
      const built = line.map((i) => tiles[i]).join(" "),
        ok = built === v.t;
      if (ok) S.score++;
      else
        S.miss.push({
          q: `${ar(v.w)} · ${esc(v.we)}`,
          your: built,
          right: v.t,
        });
      document.getElementById("pts").textContent = S.score;
      draw();
      say(v.t);
      document.getElementById("fbx").innerHTML = fb(
        ok,
        `${ok ? "" : "The red words are in the wrong place. "}<span class="full">${ar(v.t)}</span><span class="fen">${esc(v.we)}: ${esc(v.en)}</span>`,
      );
      bindNext();
    };
  }

  /* ---------- END ---------- */
  function end() {
    hush();
    const pct = Math.round((S.score / Math.max(1, S.max)) * 100);
    const st = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const msg =
      pct === 100
        ? "Perfect! You know it all."
        : pct >= 90
          ? "Excellent!"
          : pct >= 70
            ? "Good work! Look at the answers below."
            : "Keep practising. Look at the answers below, then play again.";
    app.innerHTML = `<section class="card pop">
    <span class="eyebrow">${MODE_NAME[S.mode]} · your score</span>
    <div class="big-score">${S.score}<small> / ${S.max} points</small></div>
    <div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div>
    <h2>${pct}% · ${msg}</h2>
    <div class="row"><button class="btn big" id="againBtn" type="button">Play again</button><button class="btn ghost" id="modesBtn" type="button">Other games</button></div>
  </section>
  ${S.miss.length ? `<section class="card"><h3>Let's review (${S.miss.length})</h3><ul class="review">${S.miss.map((m) => `<li><div class="q">${m.q}</div><div class="a">You chose: <s>${ar(m.your)}</s><br>Right answer: <em>${ar(m.right)}</em></div></li>`).join("")}</ul></section>` : ""}`;
    document.getElementById("againBtn").onclick = () => startMode(S.mode);
    document.getElementById("modesBtn").onclick = home;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  Quiz.watch(app);
  home();
})();
