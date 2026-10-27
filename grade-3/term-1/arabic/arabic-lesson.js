/* =====================================================================
   Arabic lessons engine (Grade 3 · Term 1).
   One engine for every lesson. A lesson page sets <body data-view="lesson">
   or data-view="exercises" and loads its data file (lesson-N.js) first.
   The lesson list page (index.html) uses data-view="list" with lessons.js.
   ===================================================================== */
(function () {
  const app = document.getElementById("app");
  const VIEW = document.body.dataset.view || "lesson";
  const L = window.LESSON || {};
  // a lesson can have several texts: L.stories=[{title,en,uk,kind,intro,parts}]; older lessons use L.story + L.intro
  const STORIES =
    L.stories ||
    (L.story
      ? [
          {
            title: L.title,
            en: L.en,
            uk: L.uk,
            intro: L.intro,
            parts: L.story.parts,
          },
        ]
      : []);
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const shuf = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
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
  const KEY = "ar3-l" + (L.n || 0) + "-";
  let tr = store.get("ar3-tr", "en");
  if (!["off", "en", "uk"].includes(tr)) tr = "en";
  const HARAKAT = /[ً-ٰٟـ]/g; // tashkeel + tatweel
  const bare = (s) => String(s).replace(HARAKAT, "");
  const PUNCT = /^([«»"“”(]*)(.*?)([«»"“”)،,.؛;:؟?!]*)$/;
  const bolt =
    '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#1B2440"/></svg>';

  /* ---------- voice: the device's Arabic voice, else Google's online voice (same as Arabic revision) ---------- */
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
  const TTS_URL =
    "https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=";
  const player = new Audio();
  let parts = [],
    reading = false,
    paused = false,
    onWord = null;
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
    paused = false;
    player.pause();
    if (onWord) onWord(-1);
  }
  function pauseVoice() {
    paused = true;
    try {
      TTS && speechSynthesis.pause();
    } catch (e) {}
    player.pause();
  }
  function resumeVoice() {
    paused = false;
    try {
      TTS && speechSynthesis.resume();
    } catch (e) {}
    if (reading) player.play().catch(() => {});
  }
  function sayOnline(text, slow) {
    parts = chunks(text);
    reading = true;
    const rate = slow ? 0.7 : 1;
    const nextPart = () => {
      const t = parts.shift();
      if (!t) {
        reading = false;
        if (onWord) onWord(-1);
        return;
      }
      player.src = TTS_URL + encodeURIComponent(t);
      player.defaultPlaybackRate = player.playbackRate = rate;
      player.play().catch(() => {});
    };
    player.onended = nextPart;
    nextPart();
  }
  // say(text, slow, boundary): boundary(charIndex) is called while the device voice reads (for word highlighting)
  function say(text, slow, boundary) {
    hush();
    if (!text) return;
    if (voice) {
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = voice.lang;
        u.voice = voice;
        u.rate = slow ? 0.55 : 0.8;
        if (boundary) {
          u.onboundary = (e) => {
            if (e.name === "word" || e.name === undefined)
              boundary(e.charIndex);
          };
          u.onend = () => boundary(-1);
        }
        speechSynthesis.speak(u);
      } catch (e) {}
    } else if (navigator.onLine) sayOnline(text, slow);
  }
  const speakable = (s) =>
    String(s).replace(/_{2,}/g, "…").replace(/[«»]/g, "");
  const noVoiceNote = () =>
    canSpeak()
      ? ""
      : '<p class="note">No Arabic voice on this device and no internet, so listening is not available right now.</p>';

  /* ---------- shared bits ---------- */
  const trSeg = () =>
    `<div class="og"><span class="lab">Translation</span><div class="seg" role="group" aria-label="Translation">${[
      ["off", "Off"],
      ["en", "EN"],
      ["uk", "UA"],
    ]
      .map(
        ([k, n]) =>
          `<button type="button" id="tr-${k}" data-tr="${k}" aria-pressed="${tr === k}">${n}</button>`,
      )
      .join("")}</div></div>`;
  function bindTr(redraw) {
    app.querySelectorAll("[data-tr]").forEach(
      (b) =>
        (b.onclick = () => {
          tr = b.dataset.tr;
          store.set("ar3-tr", tr);
          redraw();
        }),
    );
  }
  const trText = (o) => (tr === "off" || !o ? "" : o[tr] || "");
  const fbHTML = (ok, html, last) =>
    `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? pick(["أَحْسَنْتَ! Well done!", "مُمْتَاز! Excellent!", "صَحِيح! Correct!"]) : "Not quite."}</b><span>${html}</span></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn next" id="nextBtn" type="button">${last ? "See my score" : "Next"}</button></div>`;
  function star(on) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" width="44" height="44"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill="${on ? "var(--hl)" : "var(--card)"}" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  function scoreCard(score, max, miss, again, back, label) {
    const pct = Math.round((score / Math.max(1, max)) * 100),
      st = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const msg =
      pct === 100
        ? "Perfect! مُمْتَاز"
        : pct >= 90
          ? "Excellent!"
          : pct >= 70
            ? "Good work!"
            : pct >= 50
              ? "Not bad, practise a bit more."
              : "Keep practising!";
    return `<section class="card pop"><span class="eyebrow">${esc(label || "Your score")}</span>
    <div class="big-score">${score}<small> / ${max}</small></div><div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div><h2>${pct}% · ${msg}</h2>
    <div class="row"><button class="btn big" id="againBtn" type="button">Play again</button><button class="btn ghost" id="backBtn" type="button">${esc(back)}</button></div></section>
    ${miss.length ? `<section class="card"><h3>Let's review (${miss.length})</h3><ul class="review">${miss.map((m) => `<li><div class="q ar" dir="rtl">${esc(m.q)}</div><div class="a">${m.your ? `You chose: <s class="ar">${esc(m.your)}</s><br>` : ""}Right answer: <em class="ar">${esc(m.right)}</em></div></li>`).join("")}</ul></section>` : ""}`;
  }
  const PAIRC = [
    "var(--ke)",
    "var(--pe)",
    "var(--cool)",
    "var(--heat)",
    "var(--green)",
    "var(--ink)",
  ];
  // generic tap-to-match: left items {html, i}, right items {html, i}; done(gotCount, pairsMap)
  function matchUI(host, left, right, onDone, opts = {}) {
    const pair = {};
    let sel = null,
      checked = false;
    host.innerHTML = `<p class="hint">Tap one on the right side, then its partner. Tap again to undo.</p>
    <div class="match" dir="rtl"><div class="mcol" id="colL"></div><div class="mcol" id="colR"></div></div>
    <div id="fbx" style="margin-top:18px"><div class="row" style="justify-content:flex-end"><button class="btn" id="checkBtn" type="button" disabled>Check</button></div></div>`;
    const colL = host.querySelector("#colL"),
      colR = host.querySelector("#colR");
    function draw() {
      colL.innerHTML = left
        .map((l, k) => {
          const p = pair[l.i] !== undefined;
          const ok = checked && pair[l.i] === l.i;
          const cls = checked ? (ok ? "ok" : "no") : sel === l.i ? "sel" : "";
          return `<button type="button" class="mi ${opts.lcls || ""} ${cls}" id="ml-${k}" data-l="${l.i}" ${checked ? "disabled" : ""}><span class="tx">${l.html}${checked && !ok ? `<span class="fix ar">→ ${right.find((r) => r.i === l.i).plain}</span>` : ""}</span>${p ? `<span class="tag" style="background:${PAIRC[k % PAIRC.length]}">${k + 1}</span>` : ""}</button>`;
        })
        .join("");
      colR.innerHTML = right
        .map((r, k) => {
          const li = Object.keys(pair).find((x) => pair[x] === r.i);
          const lk = li !== undefined ? left.findIndex((x) => x.i === +li) : -1;
          const cls =
            checked && li !== undefined ? (+li === r.i ? "ok" : "no") : "";
          return `<button type="button" class="mi ${opts.rcls || ""} ${cls}" id="mr-${k}" data-r="${r.i}" ${checked ? "disabled" : ""}><span class="tx">${r.html}</span>${lk >= 0 ? `<span class="tag" style="background:${PAIRC[lk % PAIRC.length]}">${lk + 1}</span>` : ""}</button>`;
        })
        .join("");
      colL.querySelectorAll("[data-l]").forEach(
        (b) =>
          (b.onclick = () => {
            const li = +b.dataset.l;
            if (pair[li] !== undefined) {
              delete pair[li];
              sel = li;
            } else sel = sel === li ? null : li;
            if (opts.sayL) opts.sayL(li);
            draw();
          }),
      );
      colR.querySelectorAll("[data-r]").forEach(
        (b) =>
          (b.onclick = () => {
            const ri = +b.dataset.r;
            const owner = Object.keys(pair).find((x) => pair[x] === ri);
            if (opts.sayR) opts.sayR(ri);
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
      const cb = host.querySelector("#checkBtn");
      if (cb) cb.disabled = Object.keys(pair).length < left.length;
    }
    draw();
    host.querySelector("#checkBtn").onclick = () => {
      checked = true;
      let got = 0;
      left.forEach((l) => {
        if (pair[l.i] === l.i) got++;
      });
      draw();
      onDone(got, pair);
    };
  }

  /* =====================================================================
   LESSON LIST (index.html)
   ===================================================================== */
  function listView() {
    const LS = window.LESSONS || [],
      TS = window.TESTS || [];
    const card = (l, label) =>
      `<a class="lesson" href="${esc(l.path)}"><img src="${esc(l.cover)}" alt=""><span class="in"><span class="n">${label} ${l.n} · ${label === "Test" ? "الاختبار" : "الدرس"} ${esc(l.nAr || "")}</span><span class="t ar" dir="rtl">${esc(l.title)}</span><span class="e">${esc(l.en)}</span><span class="parts">${esc(l.note || "")}</span></span></a>`;
    app.innerHTML = `<section class="card pop">
    <div class="toprow"><a class="back" href="../../../index.html">← All games</a><span class="eyebrow">Grade 3 · اللغة العربية</span></div>
    <h1 class="hero-title"><span class="p">Arabic</span> <span class="k">Lessons</span></h1>
    <p class="howto">Pick a lesson. Each lesson has the story to read and listen to, the new words, opposites and plurals, and the exercises from the book.</p>
  </section>
  <div class="lessons">${LS.map((l) => card(l, "Lesson")).join("")}
  <div class="soon">More lessons will be added here, one by one.</div></div>
  ${TS.length ? `<h2 class="lgroup">Tests · <span class="ar">الِاخْتِبَارَاتُ</span></h2><div class="lessons">${TS.map((l) => card(l, "Test")).join("")}</div>` : ""}`;
  }

  /* =====================================================================
   LESSON PAGE: tabs Story · Words · Opposites & plurals · Exercises
   ===================================================================== */
  // a test page sets L.tabs: one tab per group, {k, ic, t, ar, story} = that text + the exercises with tab: k
  const TABS = L.tabs || [
    { k: "story", ic: "📖", t: "Story", ar: "القصة" },
    { k: "words", ic: "🗂", t: "Words", ar: "الكلمات" },
    {
      k: "opp",
      ic: "🔄",
      t: "Opposites & plurals",
      short: "Pl / Op",
      ar: "مضاد وجمع",
    },
    { k: "ex", ic: "✏️", t: "Exercises", short: "Tasks", ar: "التدريبات" },
  ];
  let tab = store.get(KEY + "tab", TABS[0].k);
  if (!TABS.some((t) => t.k === tab)) tab = TABS[0].k;
  let part = 0,
    story = null; // story=null → show the list of texts
  function lessonView() {
    hush();
    closePop();
    app.innerHTML = `<section class="card pop">
    <div class="toprow"><div class="links">${(
      L.links || [
        ["../../../index.html", "← All games"],
        ["index.html", "Arabic lessons"],
      ]
    )
      .map(([h, t]) => `<a class="back" href="${esc(h)}">${esc(t)}</a>`)
      .join("")}</div>${trSeg()}</div>
    <div class="les-head">${L.cover ? `<img src="${esc(L.cover)}" alt="">` : `<span class="les-ic" aria-hidden="true">${esc(L.ic || "📖")}</span>`}<div><span class="eyebrow">${esc(L.unit || "")}</span><h1 class="les-title ar" dir="rtl">${esc(L.title)}</h1><div class="les-sub">${esc(tr === "uk" ? L.uk : L.en)}</div></div></div>
    <div class="tabbox"><div class="ftabs${TABS.length === 4 ? " four" : ""}" role="group" aria-label="Lesson part">${TABS.map((t) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span><span class="tl">${esc(t.t)}</span><span class="ts">${esc(t.short || t.t)}</span><span class="sub ar">${t.ar}</span></button>`).join("")}</div>
    <div class="panel" id="panel"></div></div>
  </section>`;
    bindTr(lessonView);
    app.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          store.set(KEY + "tab", tab);
          wstate = null;
          ostate = null;
          story = null;
          xs = null;
          lessonView();
        }),
    );
    const P = document.getElementById("panel");
    exHost = null;
    const T = TABS.find((t) => t.k === tab);
    if (T.story != null) {
      P.innerHTML = `<div id="tText"></div><div id="tEx"></div>`;
      story = T.story;
      storyPanel(P.querySelector("#tText"));
      exHost = P.querySelector("#tEx");
      exView();
    } else if (tab === "story") storyPanel(P);
    else if (tab === "words") wordsPanel(P);
    else if (tab === "ex") {
      exHost = P;
      exView();
    } else oppPanel(P);
  }

  /* ---------- story ---------- */
  function tokens(text) {
    // [{pre, core, post, start}] with char offsets for read-along
    const out = [];
    let pos = 0;
    text.split(" ").forEach((raw) => {
      const m = raw.match(PUNCT) || ["", "", raw, ""];
      out.push({
        pre: m[1],
        core: m[2],
        post: m[3],
        start: pos + m[1].length,
        end: pos + m[1].length + m[2].length,
      });
      pos += raw.length + 1;
    });
    return out;
  }
  function gloss(core) {
    const g = (L.gloss || {})[core] || (L.gloss || {})[bare(core)];
    if (g) return g;
    const b = bare(core);
    const k = Object.keys(L.gloss || {}).find((x) => bare(x) === b);
    return k ? L.gloss[k] : null;
  }
  // L.tapq (tests): every word of a question and of its answer can be tapped, like in the story
  const tapHTML = (text) =>
    tokens(text)
      .map((t) =>
        /^_{3,}$/.test(t.core)
          ? `${esc(t.pre)}<span class="gap"></span>${esc(t.post)}`
          : `${esc(t.pre)}<span class="w">${esc(t.core)}</span>${esc(t.post)}`,
      )
      .join(" ");
  function bindTap(root) {
    root.querySelectorAll(".tapw .w").forEach(
      (s) =>
        (s.onclick = (e) => {
          e.stopPropagation();
          root
            .querySelectorAll(".tapw .w.on")
            .forEach((x) => x.classList.remove("on"));
          s.classList.add("on");
          showPop(s.textContent, gloss(s.textContent), () =>
            s.classList.remove("on"),
          );
        }),
    );
  }
  function storyList(P) {
    P.innerHTML = `<p class="tab-sub">Choose a text to read · <span class="ar">اخْتَرْ نَصًّا</span></p>
    <div class="texts">${STORIES.map((t, i) => {
      const at = +store.get(KEY + "part-" + i, 0) || 0;
      return `<button type="button" class="text" id="txt-${i}" data-t="${i}">${t.cover || t.parts[0].img ? `<img src="${esc(t.cover || t.parts[0].img)}" alt="">` : `<span class="ticon" aria-hidden="true">${esc(t.ic || "📖")}</span>`}<span class="in">${t.kind ? `<span class="kind">${esc(t.kind)}</span>` : ""}<span class="t ar" dir="rtl">${esc(t.title)}</span><span class="e">${esc(tr === "uk" ? t.uk : t.en)}</span><span class="parts">${t.parts.length} parts${at > 0 ? ` · continue from part ${at + 1}` : ""}</span></span></button>`;
    }).join("")}</div>`;
    P.querySelectorAll("[data-t]").forEach(
      (b) =>
        (b.onclick = () => {
          story = +b.dataset.t;
          part = +store.get(KEY + "part-" + story, 0) || 0;
          storyPanel(P);
        }),
    );
  }
  function storyPanel(P) {
    if (story === null || !STORIES[story]) return storyList(P);
    const ST = STORIES[story],
      PS = ST.parts;
    if (part >= PS.length || part < 0) part = 0;
    const p = PS[part],
      tk = tokens(p.ar);
    const fixed = !!L.tabs; // a test: one text per tab, no list, no part navigation
    P.innerHTML = `${fixed ? "" : `<div class="sthead"><button type="button" class="abtn" id="stBack" aria-label="Back to the list of texts">← Texts</button><span class="sttitle ar" dir="rtl">${esc(ST.title)}</span></div>`}
    ${ST.intro && part === 0 ? `<details class="readp"><summary>About this text · تمهيد</summary><p class="ar" dir="rtl" style="font-size:1.25rem;line-height:1.9;margin:8px 0">${esc(ST.intro.ar)}</p>${trText(ST.intro) ? `<p class="trans">${esc(trText(ST.intro))}</p>` : ""}</details>` : ""}
    <div class="part${p.img ? "" : " noimg"}">
      ${p.img ? `<div class="pic"><img src="${esc(p.img)}" alt=""></div>` : ""}
      <div style="display:flex;flex-direction:column;gap:12px;min-width:0">
        <span class="pchip"><span class="ar" dir="rtl">${esc(p.para)}</span>${fixed ? "" : `<span>· Part ${part + 1} of ${PS.length}</span>`}</span>
        <p class="story ar" dir="rtl" id="storyText">${tk.map((t, i) => `${esc(t.pre)}<span class="w" data-i="${i}">${esc(t.core)}</span>${esc(t.post)}`).join(" ")}</p>
        <div class="audio"><button type="button" class="abtn big" id="say1"><span class="e">🔊</span> Listen</button><button type="button" class="abtn" id="say2"><span class="e">🐢</span> Slowly</button><button type="button" class="abtn" id="pauseBtn"><span class="e">⏸</span> Pause</button><button type="button" class="abtn" id="stopBtn"><span class="e">⏹</span> Stop</button></div>
        ${noVoiceNote()}
        ${trText(p) ? `<p class="trans">${esc(trText(p))}</p>` : ""}
        <p class="hintline">Tap any word to see what it means.</p>
      </div>
    </div>
    ${
      fixed
        ? ""
        : `<div class="nav" dir="rtl"><button type="button" class="btn ghost" id="prevBtn" ${part === 0 ? "disabled" : ""}><span class="na">→ السابق</span> <small>Back</small></button>
      <div class="dots" dir="rtl">${PS.map((_, i) => `<button type="button" id="dot-${i}" data-dot="${i}" aria-label="Part ${i + 1}" aria-current="${i === part}"></button>`).join("")}</div>
      ${part < PS.length - 1 ? `<button type="button" class="btn" id="nextPart"><span class="na">التالي ←</span> <small>Next</small></button>` : story < STORIES.length - 1 ? `<button type="button" class="btn" id="nextText"><span class="na">النص التالي ←</span> <small>Next text</small></button>` : `<button type="button" class="btn" id="toWords"><span class="na">الكلمات ←</span> <small>Words</small></button>`}</div>`
    }`;
    const txt = document.getElementById("storyText");
    const spans = [...txt.querySelectorAll(".w")];
    onWord = (ci) => {
      spans.forEach((s) => s.classList.remove("say"));
      if (ci < 0) return;
      const i = tk.findIndex((t) => ci >= t.start - 1 && ci < t.end);
      if (i >= 0) spans[i].classList.add("say");
    };
    const read = (slow) => {
      say(p.ar, slow, (ci) => onWord && onWord(ci));
      setPause(false);
    };
    document.getElementById("say1").onclick = () => read(false);
    document.getElementById("say2").onclick = () => read(true);
    const pb = document.getElementById("pauseBtn");
    const setPause = (isP) => {
      pb.innerHTML = isP
        ? '<span class="e">▶</span> Resume'
        : '<span class="e">⏸</span> Pause';
    };
    pb.onclick = () => {
      if (paused) {
        resumeVoice();
        setPause(false);
      } else {
        pauseVoice();
        setPause(true);
      }
    };
    document.getElementById("stopBtn").onclick = () => {
      hush();
      setPause(false);
    };
    spans.forEach(
      (s) =>
        (s.onclick = (e) => {
          e.stopPropagation();
          const t = tk[+s.dataset.i];
          spans.forEach((x) => x.classList.remove("on"));
          s.classList.add("on");
          showPop(t.core, gloss(t.core), () => s.classList.remove("on"));
        }),
    );
    const go = (i) => {
      part = i;
      store.set(KEY + "part-" + story, part);
      hush();
      closePop();
      storyPanel(P);
      P.scrollIntoView({ block: "nearest" });
    };
    if (fixed) return;
    document.getElementById("prevBtn").onclick = () => part > 0 && go(part - 1);
    const nx = document.getElementById("nextPart");
    if (nx) nx.onclick = () => go(part + 1);
    const nt = document.getElementById("nextText");
    if (nt)
      nt.onclick = () => {
        hush();
        closePop();
        story++;
        part = 0;
        storyPanel(P);
        P.scrollIntoView({ block: "nearest" });
      };
    document.getElementById("stBack").onclick = () => {
      hush();
      closePop();
      story = null;
      storyPanel(P);
    };
    const tw = document.getElementById("toWords");
    if (tw)
      tw.onclick = () => {
        tab = "words";
        store.set(KEY + "tab", tab);
        wstate = null;
        story = null;
        lessonView();
      };
    P.querySelectorAll("[data-dot]").forEach(
      (b) => (b.onclick = () => go(+b.dataset.dot)),
    );
  }

  /* ---------- word pop-up ---------- */
  let popEl = null,
    popClose = null;
  function closePop() {
    if (popEl) {
      popEl.remove();
      popEl = null;
    }
    if (popClose) {
      popClose();
      popClose = null;
    }
  }
  function showPop(word, g, onClose) {
    closePop();
    popClose = onClose;
    popEl = document.createElement("div");
    popEl.className = "wpop";
    popEl.setAttribute("role", "dialog");
    popEl.innerHTML = `<div class="wa ar" dir="rtl">${esc(word)}</div>
    <div class="wt"><b>EN</b>${esc(g ? g[0] : "—")}</div><div class="wbtns"><button type="button" class="abtn" id="popSay" aria-label="Listen"><span class="e">🔊</span></button><button type="button" class="x" id="popX" aria-label="Close">✕</button></div>
    <div class="wt"><b>UA</b>${esc(g ? g[1] : "—")}</div>`;
    document.body.appendChild(popEl);
    popEl.querySelector("#popSay").onclick = () => say(word, true);
    popEl.querySelector("#popX").onclick = closePop;
  }
  document.addEventListener("click", (e) => {
    if (
      popEl &&
      !popEl.contains(e.target) &&
      !(e.target.classList && e.target.classList.contains("w"))
    )
      closePop();
  });

  /* ---------- words ---------- */
  const WSETS = [
    ["all", "All", "الكل"],
    ["story", "Story", "القصة"],
    ["opp", "Opposites", "المضاد"],
    ["plural", "Plurals", "الجمع"],
  ].filter(
    ([k]) =>
      k === "all" || (L.words || []).some((w) => (w.set || "story") === k),
  );
  let wset = store.get(KEY + "wset", "all");
  if (!WSETS.some((x) => x[0] === wset)) wset = "all";
  const W = () =>
    (L.words || []).filter(
      (w) => wset === "all" || (w.set || "story") === wset,
    );
  let wstate = null;
  const picHTML = (w) =>
    w.img ? `<img src="${esc(w.img)}" alt="">` : esc(w.ic || "❓");
  const meaningHTML = (w) =>
    tr === "off"
      ? ""
      : `<div class="meaning">${esc(tr === "uk" ? w.uk : w.en)}</div>`;
  function wordsPanel(P) {
    if (wstate && wstate.mode) return wordsGame(P);
    const MODES = [
      {
        k: "cards",
        ic: "📇",
        t: "Flash cards",
        d: "Picture, Arabic word and meaning",
      },
      {
        k: "match",
        ic: "🧩",
        t: "Match",
        d: "Match each picture to its Arabic word",
      },
      {
        k: "build",
        ic: "🔤",
        t: "Build the word",
        d: "Put the Arabic letters in order",
      },
      {
        k: "listen",
        ic: "🎧",
        t: "Listen & choose",
        d: "Hear the word, tap its picture",
      },
    ];
    P.innerHTML = `<p class="tab-sub">${W().length} words from the lesson · <span class="ar">كَلِمَاتُ الدَّرْسِ</span></p>
    ${WSETS.length > 2 ? `<div class="seg wsets" role="group" aria-label="Which words">${WSETS.map(([k, n, a]) => `<button type="button" id="ws-${k}" data-ws="${k}" aria-pressed="${wset === k}">${n} <span class="ar">${a}</span></button>`).join("")}</div>` : ""}
    <div class="modes">${MODES.map((m) => `<button type="button" class="mode" id="wm-${m.k}" data-m="${m.k}"><span class="mi-ic">${m.ic}</span><b>${m.t}</b><small>${m.d}</small></button>`).join("")}</div>${noVoiceNote()}`;
    P.querySelectorAll("[data-ws]").forEach(
      (b) =>
        (b.onclick = () => {
          wset = b.dataset.ws;
          store.set(KEY + "wset", wset);
          wordsPanel(P);
        }),
    );
    P.querySelectorAll("[data-m]").forEach(
      (b) =>
        (b.onclick = () => {
          wstate = { mode: b.dataset.m, i: 0, score: 0, miss: [] };
          if (wstate.mode === "match") {
            const w = shuf(W());
            wstate.rounds = [];
            for (let i = 0; i < w.length; i += 5)
              wstate.rounds.push(w.slice(i, i + 5));
            if (wstate.rounds.length > 1 && wstate.rounds.at(-1).length < 3) {
              const l = wstate.rounds.pop();
              wstate.rounds.at(-1).push(...l);
            }
            wstate.max = W().length;
          } else {
            wstate.list = wstate.mode === "cards" ? W().slice() : shuf(W());
            wstate.max = wstate.list.length;
          }
          wordsGame(P);
        }),
    );
  }
  function wHud(label) {
    const n =
      wstate.mode === "match" ? wstate.rounds.length : wstate.list.length;
    const pct = Math.round((wstate.i / n) * 100);
    return `<div class="hud"><button type="button" class="abtn" id="wBack" aria-label="Back to word games">←</button><span class="qnum">${label}</span><div class="meter"><i style="width:${pct}%"></i></div>${wstate.mode === "cards" ? "" : `<span class="score">${bolt}<b id="pts">${wstate.score}</b></span>`}</div>`;
  }
  function wordsGame(P) {
    hush();
    const back = () => {
      wstate = null;
      wordsPanel(P);
    };
    const nextW = () => {
      wstate.i++;
      const n =
        wstate.mode === "match" ? wstate.rounds.length : wstate.list.length;
      if (wstate.i >= n) {
        P.innerHTML = scoreCard(
          wstate.score,
          wstate.max,
          wstate.miss,
          0,
          "Other word games",
          "Words · " + wstate.mode,
        );
        P.querySelector("#againBtn").onclick = () => {
          const m = wstate.mode;
          wstate = null;
          wordsPanel(P);
          P.querySelector(`[data-m="${m}"]`).click();
        };
        P.querySelector("#backBtn").onclick = back;
        return;
      }
      wordsGame(P);
    };
    const m = wstate.mode;
    if (m === "cards") {
      const n = wstate.list.length;
      if (wstate.i < 0) wstate.i = n - 1;
      if (wstate.i >= n) wstate.i = 0;
      const w = wstate.list[wstate.i];
      const show = store.get("ar3-showw", "1") === "1";
      P.innerHTML = `${wHud(`Card ${wstate.i + 1} of ${n}`)}
      <div class="seg" role="group" aria-label="Show word" style="align-self:center"><button type="button" id="sw-1" data-sw="1" aria-pressed="${show}">Picture + word</button><button type="button" id="sw-0" data-sw="0" aria-pressed="${!show}">Picture only</button></div>
      <div class="wcard"><div class="bigpic">${picHTML(w)}</div>
      <div id="wbox">${show ? `<div class="bigword ar" dir="rtl">${esc(w.ar)}</div>` : `<button type="button" class="hiddenw" id="reveal">Tap to see the word</button>`}</div>
      ${meaningHTML(w)}
      <div class="audio"><button type="button" class="abtn big" id="s1"><span class="e">🔊</span> Listen</button><button type="button" class="abtn" id="s2"><span class="e">🐢</span> Slowly</button></div></div>
      <div class="nav" dir="rtl"><button type="button" class="btn ghost" id="pv"><span class="na">→ السابق</span> <small>Back</small></button><button type="button" class="btn" id="nx"><span class="na">التالي ←</span> <small>Next</small></button></div>`;
      P.querySelectorAll("[data-sw]").forEach(
        (b) =>
          (b.onclick = () => {
            store.set("ar3-showw", b.dataset.sw);
            wordsGame(P);
          }),
      );
      const rv = P.querySelector("#reveal");
      if (rv)
        rv.onclick = () => {
          P.querySelector("#wbox").innerHTML =
            `<div class="bigword ar" dir="rtl">${esc(w.ar)}</div>`;
          say(w.ar);
        };
      P.querySelector("#s1").onclick = () => say(w.ar);
      P.querySelector("#s2").onclick = () => say(w.ar, true);
      P.querySelector("#pv").onclick = () => {
        wstate.i--;
        wordsGame(P);
      };
      P.querySelector("#nx").onclick = () => {
        wstate.i++;
        wordsGame(P);
      };
      P.querySelector("#wBack").onclick = back;
      return;
    }
    if (m === "match") {
      const round = wstate.rounds[wstate.i];
      P.innerHTML = `${wHud(`Round ${wstate.i + 1} of ${wstate.rounds.length}`)}<span class="qtype mt">Match · ${round.length} points</span><div id="mhost"></div>`;
      P.querySelector("#wBack").onclick = back;
      const left = shuf(
        round.map((w, i) => ({
          i,
          html: `<span class="pic">${picHTML(w)}</span>${tr === "off" ? "" : `<span class="gl">${esc(tr === "uk" ? w.uk : w.en)}</span>`}`,
        })),
      );
      const right = shuf(
        round.map((w, i) => ({
          i,
          html: `<span class="ar">${esc(w.ar)}</span>`,
          plain: esc(w.ar),
        })),
      );
      matchUI(
        P.querySelector("#mhost"),
        left,
        right,
        (got) => {
          wstate.score += got;
          round.forEach((w, i) => {});
          P.querySelector("#pts").textContent = wstate.score;
          P.querySelector("#fbx").innerHTML = fbHTML(
            got === round.length,
            got === round.length
              ? "Every pair is right!"
              : `${got} of ${round.length} correct.`,
            wstate.i + 1 >= wstate.rounds.length,
          );
          P.querySelector("#nextBtn").onclick = nextW;
        },
        { rcls: "arw", sayR: (ri) => say(round[ri].ar) },
      );
      return;
    }
    if (m === "build") {
      const w = wstate.list[wstate.i];
      const target = [...bare(w.ar)];
      let bank = shuf(target.map((c, i) => ({ c, i })));
      for (
        let k = 0;
        k < 6 && bank.map((b) => b.c).join("") === target.join("");
        k++
      )
        bank = shuf(bank);
      let line = [],
        done = false;
      P.innerHTML = `${wHud(`Word ${wstate.i + 1} of ${wstate.list.length}`)}<div class="wcard"><div class="bigpic">${picHTML(w)}</div>${meaningHTML(w)}
      <div class="audio"><button type="button" class="abtn" id="s1"><span class="e">🔊</span> Listen</button><button type="button" class="abtn" id="s2"><span class="e">🐢</span> Slowly</button></div></div>
      <div class="preview ar" dir="rtl" id="prev"></div>
      <div class="slots" dir="rtl" id="line"></div><div class="letters" dir="rtl" id="bank"></div>
      <p class="hint">Tap the letters in order, from right to left. Tap a placed letter to take it back.</p>
      <div id="fbx"><div class="row" style="justify-content:center"><button class="btn" id="checkBtn" type="button" disabled>Check my word</button></div></div>`;
      P.querySelector("#wBack").onclick = back;
      P.querySelector("#s1").onclick = () => say(w.ar);
      P.querySelector("#s2").onclick = () => say(w.ar, true);
      const Ln = P.querySelector("#line"),
        B = P.querySelector("#bank"),
        prev = P.querySelector("#prev");
      const draw = () => {
        prev.textContent = line.map((x) => x.c).join("");
        Ln.innerHTML = line.length
          ? line
              .map(
                (x, k) =>
                  `<button type="button" class="lt" id="tl-${k}" data-k="${k}">${esc(x.c)}</button>`,
              )
              .join("")
          : '<span class="ph">Letters go here</span>';
        B.innerHTML = bank
          .map(
            (x, k) =>
              `<button type="button" class="lt" id="tb-${k}" data-k="${k}">${esc(x.c)}</button>`,
          )
          .join("");
        if (!done) {
          Ln.querySelectorAll(".lt").forEach(
            (b) =>
              (b.onclick = () => {
                bank.push(...line.splice(+b.dataset.k, 1));
                draw();
              }),
          );
          B.querySelectorAll(".lt").forEach(
            (b) =>
              (b.onclick = () => {
                line.push(...bank.splice(+b.dataset.k, 1));
                draw();
              }),
          );
        }
        const cb = P.querySelector("#checkBtn");
        if (cb) cb.disabled = bank.length > 0;
      };
      draw();
      P.querySelector("#checkBtn").onclick = () => {
        done = true;
        const mine = line.map((x) => x.c).join(""),
          ok = mine === target.join("");
        if (ok) wstate.score++;
        else
          wstate.miss.push({ q: w.en + " · " + w.uk, your: mine, right: w.ar });
        P.querySelector("#pts").textContent = wstate.score;
        Ln.classList.add(ok ? "ok" : "no");
        draw();
        if (ok) say(w.ar);
        P.querySelector("#fbx").innerHTML = fbHTML(
          ok,
          `<span class="ar" style="font-size:1.6rem">${esc(w.ar)}</span>`,
          wstate.i + 1 >= wstate.list.length,
        );
        P.querySelector("#nextBtn").onclick = nextW;
      };
      return;
    }
    if (m === "listen") {
      const w = wstate.list[wstate.i];
      const opts = shuf([w, ...shuf(W().filter((x) => x !== w)).slice(0, 3)]);
      P.innerHTML = `${wHud(`Word ${wstate.i + 1} of ${wstate.list.length}`)}<span class="qtype mc">Listen &amp; choose</span>
      <div class="audio" style="justify-content:center"><button type="button" class="abtn big" id="s1"><span class="e">🔊</span> Play</button><button type="button" class="abtn" id="s2"><span class="e">🐢</span> Slowly</button></div>
      ${canSpeak() ? "" : `<p class="note">No voice available, so here is the word: <b class="ar">${esc(w.ar)}</b></p>`}
      <div class="pics">${opts.map((o, k) => `<button type="button" id="pc-${k}" data-k="${k}" aria-label="Picture ${k + 1}"><span>${picHTML(o)}</span><span class="pl">${esc(tr === "uk" ? o.uk : o.en)}</span></button>`).join("")}</div><div id="fbx"></div>`;
      P.querySelector("#wBack").onclick = back;
      P.querySelector("#s1").onclick = () => say(w.ar);
      P.querySelector("#s2").onclick = () => say(w.ar, true);
      setTimeout(() => say(w.ar), 300);
      P.querySelectorAll("[data-k]").forEach(
        (b) =>
          (b.onclick = () => {
            const o = opts[+b.dataset.k],
              ok = o === w;
            P.querySelectorAll("[data-k]").forEach((x, k) => {
              x.disabled = true;
              if (opts[k] === w) x.classList.add("right");
            });
            if (!ok) b.classList.add("wrong");
            if (ok) wstate.score++;
            else wstate.miss.push({ q: "🎧 " + w.ar, your: o.ar, right: w.ar });
            P.querySelector("#pts").textContent = wstate.score;
            P.querySelector("#fbx").innerHTML = fbHTML(
              ok,
              `<span class="ar" style="font-size:1.5rem">${esc(w.ar)}</span> · ${esc(w.en)} · ${esc(w.uk)}`,
              wstate.i + 1 >= wstate.list.length,
            );
            P.querySelector("#nextBtn").onclick = nextW;
          }),
      );
    }
  }

  /* ---------- opposites, plurals, meanings ---------- */
  let ostate = null;
  function oppPanel(P) {
    if (ostate) return oppGame(P);
    const SETS = [
      {
        k: "opposites",
        ic: "🔄",
        t: "Opposites",
        ar: "الْمُضَادُّ",
        d: "Match each word to its opposite",
      },
      {
        k: "plurals",
        ic: "👥",
        t: "One & many",
        ar: "الْمُفْرَدُ وَالْجَمْعُ",
        d: "Match the singular to the plural",
      },
      {
        k: "meanings",
        ic: "🟰",
        t: "Same meaning",
        ar: "الْمَعْنَى",
        d: "Match words that mean the same",
      },
      {
        k: "quiz",
        ic: "❓",
        t: "Quick quiz",
        ar: "اخْتَرِ الْإِجَابَةَ",
        d: "Mixed questions like in the book",
      },
    ];
    P.innerHTML = `<p class="tab-sub">From the lesson dictionary · <span class="ar">قَامُوسُ الْأَضْوَاءِ</span></p>
    <div class="modes">${SETS.filter(
      (s) => s.k === "quiz" || (L[s.k] || []).length,
    )
      .map(
        (s) =>
          `<button type="button" class="mode" id="om-${s.k}" data-m="${s.k}"><span class="mi-ic">${s.ic}</span><b>${s.t}</b><small class="ar" style="font-size:1.05rem">${s.ar}</small><small>${s.d}</small></button>`,
      )
      .join("")}</div>`;
    P.querySelectorAll("[data-m]").forEach(
      (b) =>
        (b.onclick = () => {
          const k = b.dataset.m;
          ostate = { k, i: 0, score: 0, miss: [] };
          if (k === "quiz") {
            const Q = [];
            (L.opposites || []).forEach((p) =>
              Q.push({
                q: `مَا مُضَادُّ «${p[0]}»؟`,
                a: p[1],
                pool: (L.opposites || []).map((x) => x[1]),
                h: p[2].split("↔")[0].trim(),
              }),
            );
            (L.plurals || []).forEach((p) =>
              Q.push({
                q: `مَا جَمْعُ «${p[0]}»؟`,
                a: p[1],
                pool: (L.plurals || []).map((x) => x[1]),
                h: p[2].split("↔")[0].trim(),
              }),
            );
            (L.meanings || []).forEach((p) =>
              Q.push({
                q: `مَا مَعْنَى «${p[0]}»؟`,
                a: p[1],
                pool: (L.meanings || []).map((x) => x[1]),
                h: p[2].split("=")[0].trim(),
              }),
            );
            ostate.list = shuf(Q).slice(0, 15);
            ostate.max = ostate.list.length;
          } else {
            const all = shuf(L[k]);
            ostate.rounds = [];
            for (let i = 0; i < all.length; i += 4)
              ostate.rounds.push(all.slice(i, i + 4));
            if (ostate.rounds.length > 1 && ostate.rounds.at(-1).length < 3) {
              const l = ostate.rounds.pop();
              ostate.rounds.at(-1).push(...l);
            }
            ostate.max = all.length;
          }
          oppGame(P);
        }),
    );
  }
  function oppGame(P) {
    hush();
    const k = ostate.k;
    const back = () => {
      ostate = null;
      oppPanel(P);
    };
    const n = k === "quiz" ? ostate.list.length : ostate.rounds.length;
    const hud = (label) =>
      `<div class="hud"><button type="button" class="abtn" id="oBack" aria-label="Back">←</button><span class="qnum">${label}</span><div class="meter"><i style="width:${Math.round((ostate.i / n) * 100)}%"></i></div><span class="score">${bolt}<b id="pts">${ostate.score}</b></span></div>`;
    const nextO = () => {
      ostate.i++;
      if (ostate.i >= n) {
        P.innerHTML = scoreCard(
          ostate.score,
          ostate.max,
          ostate.miss,
          0,
          "Other games",
          "Opposites & plurals",
        );
        P.querySelector("#againBtn").onclick = () => {
          ostate = null;
          oppPanel(P);
          P.querySelector(`[data-m="${k}"]`).click();
        };
        P.querySelector("#backBtn").onclick = back;
        return;
      }
      oppGame(P);
    };
    if (k === "quiz") {
      const it = ostate.list[ostate.i];
      const opts = shuf([
        it.a,
        ...shuf([...new Set(it.pool)].filter((x) => x !== it.a)).slice(0, 2),
      ]);
      P.innerHTML = `${hud(`Question ${ostate.i + 1} of ${n}`)}<p class="sent ar" dir="rtl">${esc(it.q)}</p>${tr === "off" ? "" : `<p class="qhelp" style="text-align:center">(${esc(it.h)})</p>`}
      <div class="audio" style="justify-content:center"><button type="button" class="abtn" id="s1"><span class="e">🔊</span> Listen</button></div>
      <div class="opts">${opts.map((o, j) => `<button type="button" class="opt aro" id="opt-${j}" data-j="${j}"><span class="L">${"ABCDEF"[j]}</span><span class="ar">${esc(o)}</span></button>`).join("")}</div><div id="fbx"></div>`;
      P.querySelector("#oBack").onclick = back;
      P.querySelector("#s1").onclick = () => say(it.q);
      P.querySelectorAll("[data-j]").forEach(
        (b) =>
          (b.onclick = () => {
            const o = opts[+b.dataset.j],
              ok = o === it.a;
            P.querySelectorAll("[data-j]").forEach((x, j) => {
              x.disabled = true;
              if (opts[j] === it.a) x.classList.add("right");
              else if (x !== b) x.classList.add("dim");
            });
            if (!ok) b.classList.add("wrong");
            if (ok) ostate.score++;
            else ostate.miss.push({ q: it.q, your: o, right: it.a });
            P.querySelector("#pts").textContent = ostate.score;
            P.querySelector("#fbx").innerHTML = fbHTML(
              ok,
              `<span class="ar" style="font-size:1.4rem">${esc(it.a)}</span>`,
              ostate.i + 1 >= n,
            );
            P.querySelector("#nextBtn").onclick = nextO;
          }),
      );
      return;
    }
    const round = ostate.rounds[ostate.i];
    const lbl = {
      opposites: "Match each word to its opposite · الْمُضَادُّ",
      plurals: "Match one to many · الْمُفْرَدُ وَالْجَمْعُ",
      meanings: "Match words with the same meaning · الْمَعْنَى",
    }[k];
    P.innerHTML = `${hud(`Round ${ostate.i + 1} of ${n}`)}<span class="qtype mt">${lbl}</span><div id="mhost"></div>`;
    P.querySelector("#oBack").onclick = back;
    const sep = k === "meanings" ? "=" : "↔";
    const gl = (p, side) => {
      if (tr === "off") return "";
      const t = (tr === "uk" ? p[3] : p[2]) || "";
      const s2 = t.split(sep);
      return `<span class="gl">${esc((s2[side] ?? s2[0]).trim())}</span>`;
    };
    const left = shuf(
      round.map((p, i) => ({
        i,
        html: `<span class="ar">${esc(p[0])}</span>${gl(p, 0)}`,
      })),
    );
    const right = shuf(
      round.map((p, i) => ({
        i,
        html: `<span class="ar">${esc(p[1])}</span>${gl(p, 1)}`,
        plain: esc(p[1]),
      })),
    );
    matchUI(
      P.querySelector("#mhost"),
      left,
      right,
      (got, pair) => {
        ostate.score += got;
        round.forEach((p, i) => {
          if (pair[i] !== i)
            ostate.miss.push({
              q: p[0],
              your: round[pair[i]] ? round[pair[i]][1] : "",
              right: p[1],
            });
        });
        P.querySelector("#pts").textContent = ostate.score;
        P.querySelector("#fbx").innerHTML = fbHTML(
          got === round.length,
          got === round.length
            ? "Every pair is right!"
            : `${got} of ${round.length} correct. The red ones show the right answer.`,
          ostate.i + 1 >= n,
        );
        P.querySelector("#nextBtn").onclick = nextO;
      },
      {
        lcls: "arw",
        rcls: "arw",
        sayL: (li) => say(round[li][0]),
        sayR: (ri) => say(round[ri][1]),
      },
    );
  }

  /* =====================================================================
   EXERCISES PAGE
   ===================================================================== */
  let xs = null,
    exHost = null; // exHost = the Exercises tab panel
  const exH = () => exHost || app;
  function exView() {
    hush();
    if (xs) return xs.sec.cards ? qaCards() : exItem();
    const SEC = (L.exercises || []).filter((s) => !s.tab || s.tab === tab);
    const H = exH();
    H.innerHTML = `<p class="tab-sub">${esc((L.exSub || [])[0] || "Exercises from the book")} · <span class="ar">${esc((L.exSub || [])[1] || "تَدْرِيبَاتُ الْكِتَابِ")}</span></p>
    <div class="modes secs">${SEC.map((s, i) => `<button type="button" class="mode" id="sec-${s.k}" data-s="${i}"><span class="mi-ic">${s.ic}</span><span class="ar" dir="rtl">${esc(s.t)}</span><b style="font-size:1.05rem">${esc(tr === "uk" ? s.uk : s.en)}</b><small>${s.items.length} ${s.cards ? "cards" : "questions"}</small></button>`).join("")}</div>
    <p class="note">Questions marked “answer” have no single right wording: read the model answer, then tick whether you got it.</p>`;
    H.querySelectorAll("[data-s]").forEach(
      (b) =>
        (b.onclick = () => {
          const sec = SEC[+b.dataset.s];
          if (L.exPics && L.exPics[sec.k])
            sec.items.forEach((it) => {
              if (!it.img && !it.ic) it.img = L.exPics[sec.k];
            });
          xs = {
            sec,
            list: sec.cards ? sec.items : sec.items.slice(),
            i: 0,
            score: 0,
            max: 0,
            miss: [],
          };
          xs.max = xs.list.reduce(
            (t, it) =>
              t +
              (it.type === "match"
                ? it.pairs.length
                : it.type === "order"
                  ? it.s.length
                  : 1),
            0,
          );
          exView();
        }),
    );
  }
  const exTop = (H) => {
    const t = exHost && (L.tabs ? exHost : exHost.closest(".tabbox"));
    if (t && t.getBoundingClientRect().top < 0)
      t.scrollIntoView({ block: "start" });
  };
  const ruleOf = (sec) => {
    let r = sec.rule;
    if (typeof r === "string") {
      const o = (L.exercises || []).find((x) => x.k === r);
      r = o && o.rule;
    }
    return r || null;
  };
  const ruleHTML = (r) =>
    `<details class="readp rule"><summary>📘 The rule · الْقَاعِدَةُ</summary>${r.img ? `<img src="${esc(r.img)}" alt="" class="ruleimg">` : ""}<p class="ar" dir="rtl">${esc(r.ar)}</p><button type="button" class="abtn" id="ruleSay"><span class="e">🔊</span> Listen</button>${tr !== "off" ? `<p class="trans">${esc(tr === "uk" ? r.uk : r.en)}</p>` : ""}</details>`;
  const qHTML = (q) => esc(q).replace(/_{3,}/g, '<span class="gap"></span>');
  function exItem() {
    const it = xs.list[xs.i],
      n = xs.list.length,
      last = xs.i + 1 >= n;
    const pct = Math.round((xs.i / n) * 100);
    const P = xs.sec.items.indexOf(it);
    const para =
      it.read == null
        ? null
        : (Array.isArray(it.read)
            ? (STORIES[it.read[0]] || { parts: [] }).parts[it.read[1]]
            : (STORIES[0] || { parts: [] }).parts[it.read]) || null;
    const H = exH();
    exTop(H);
    H.innerHTML = `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to exercise list">←</button><span class="qnum">${esc(tr === "uk" ? xs.sec.uk : xs.sec.en)} · ${xs.i + 1} / ${n}</span><div class="meter"><i style="width:${pct}%"></i></div><span class="score">${bolt}<b id="pts">${xs.score}</b></span></div>
  <section class="card pop exq">
    ${it.img ? `<div class="scene photo"><img src="${esc(it.img)}" alt=""></div>` : ""}
    ${it.ic ? `<div class="emopic" aria-hidden="true">${esc(it.ic)}</div>` : ""}
    ${ruleOf(xs.sec) ? ruleHTML(ruleOf(xs.sec)) : ""}
    ${para ? `<details class="readp"><summary>📖 Read / listen to the paragraph</summary><p class="ar" dir="rtl">${esc(para.ar)}</p><button type="button" class="abtn" id="paraSay"><span class="e">🔊</span> Listen</button></details>` : ""}
    ${it.tag ? `<span class="tag ar" dir="rtl">${esc(it.tag)}</span>` : ""}
    ${it.type === "match" ? "" : `<p class="qar ar${L.tapq ? " tapw" : ""}" dir="rtl">${L.tapq ? tapHTML(it.q) : qHTML(it.q)}</p>`}
    ${it.type === "match" ? `<p class="qar ar" dir="rtl">${esc(it.q)}</p>` : ""}
    ${trText(it) ? `<p class="qhelp">${esc(trText(it))}</p>` : ""}
    <div class="audio"><button type="button" class="abtn" id="qSay"><span class="e">🔊</span> Read the question</button></div>
    <div id="ans"></div>
    <div id="fbx"></div>
  </section>`;
    document.getElementById("homeBtn").onclick = () => {
      xs = null;
      exView();
    };
    closePop();
    bindTap(H);
    document.getElementById("qSay").onclick = () => say(speakable(it.q));
    const ps = document.getElementById("paraSay");
    if (ps) ps.onclick = () => say(para.ar);
    const rs = document.getElementById("ruleSay");
    if (rs) rs.onclick = () => say(ruleOf(xs.sec).ar);
    const rd = H.querySelector("details.rule");
    if (rd) {
      rd.open = xs.i === 0 && !xs.ruleSeen;
      rd.ontoggle = () => {
        if (!rd.open) xs.ruleSeen = true;
      };
    }
    const A = document.getElementById("ans"),
      F = document.getElementById("fbx");
    const after = (ok, html) => {
      document.getElementById("pts").textContent = xs.score;
      const cd = H.querySelector(".exq");
      cd.classList.add("answered");
      if (innerWidth > innerHeight)
        cd.querySelectorAll("details").forEach((d) => (d.open = false));
      F.innerHTML = fbHTML(ok, html, last);
      setTimeout(() => {
        const nb = document.getElementById("nextBtn");
        if (!nb) return;
        const over = nb.getBoundingClientRect().bottom - (innerHeight - 14);
        if (over > 0) scrollBy({ top: over, behavior: "instant" });
      }, 60);
      document.getElementById("nextBtn").onclick = () => {
        xs.i++;
        if (xs.i >= xs.list.length) return exEnd();
        exItem();
      };
    };
    if (it.type === "tf") {
      A.innerHTML = `<div class="tfrow"><button type="button" class="tfbtn" id="tf-1" data-v="1">✓ <span class="ar">صَحِيحٌ</span></button><button type="button" class="tfbtn" id="tf-0" data-v="0">✗ <span class="ar">خَطَأٌ</span></button></div>`;
      A.querySelectorAll("[data-v]").forEach(
        (b) =>
          (b.onclick = () => {
            const v = b.dataset.v === "1",
              ok = v === it.a;
            A.querySelectorAll("[data-v]").forEach((x) => {
              x.disabled = true;
              if ((x.dataset.v === "1") === it.a) x.classList.add("right");
            });
            if (!ok) b.classList.add("wrong");
            if (ok) xs.score++;
            else
              xs.miss.push({
                q: it.q,
                your: v ? "✓ صَحِيحٌ" : "✗ خَطَأٌ",
                right: it.a ? "✓ صَحِيحٌ" : "✗ خَطَأٌ",
              });
            after(
              ok,
              `${it.a ? "✓ صَحِيحٌ (true)" : "✗ خَطَأٌ (false)"}${it.x ? `<br><span class="ar" dir="rtl" style="font-size:1.3rem">${esc(it.x)}</span>` : ""}`,
            );
          }),
      );
    } else if (it.type === "mc") {
      const opts = shuf(it.o.map((t, j) => ({ t, ok: j === 0 })));
      A.innerHTML = `<div class="opts ${opts.some((o) => o.t.length > 18) ? "long" : ""}">${opts.map((o, j) => `<button type="button" class="opt aro" id="opt-${j}" data-j="${j}"><span class="L">${"ABCDEF"[j]}</span><span class="ar">${esc(o.t)}</span></button>`).join("")}</div>`;
      A.querySelectorAll("[data-j]").forEach(
        (b) =>
          (b.onclick = () => {
            const o = opts[+b.dataset.j];
            A.querySelectorAll("[data-j]").forEach((x, j) => {
              x.disabled = true;
              if (opts[j].ok) x.classList.add("right");
              else if (x !== b) x.classList.add("dim");
            });
            if (!o.ok) b.classList.add("wrong");
            const right = it.o[0];
            if (o.ok) xs.score++;
            else xs.miss.push({ q: it.q, your: o.t, right });
            const full = it.q.replace(/_{3,}/, right);
            after(
              o.ok,
              `<span class="ar" dir="rtl" style="font-size:1.35rem">${esc(full)}</span>`,
            );
            say(speakable(full));
          }),
      );
    } else if (it.type === "open") {
      A.innerHTML = `<p class="note">Say or write your answer, then check it.</p><div class="row"><button type="button" class="btn" id="showA">Show the answer</button></div>`;
      document.getElementById("showA").onclick = () => {
        A.innerHTML = `<div class="model"><span class="lab">Model answer · الْإِجَابَةُ</span><p class="ar${L.tapq ? " tapw" : ""}" dir="rtl" style="margin:4px 0">${L.tapq ? tapHTML(it.a) : esc(it.a)}</p><button type="button" class="abtn" id="aSay"><span class="e">🔊</span> Listen</button></div>
      <div class="tfrow" style="margin-top:12px"><button type="button" class="tfbtn" id="got-1" data-g="1">✓ I got it</button><button type="button" class="tfbtn" id="got-0" data-g="0">✗ Not yet</button></div>`;
        document.getElementById("aSay").onclick = () => say(it.a);
        bindTap(A);
        A.querySelectorAll("[data-g]").forEach(
          (b) =>
            (b.onclick = () => {
              const ok = b.dataset.g === "1";
              A.querySelectorAll("[data-g]").forEach(
                (x) => (x.disabled = true),
              );
              b.classList.add(ok ? "right" : "wrong");
              if (ok) xs.score++;
              else xs.miss.push({ q: it.q, right: it.a });
              after(
                ok,
                ok
                  ? "Great!"
                  : "Read the answer again and try to say it in your own words.",
              );
            }),
        );
      };
    } else if (it.type === "word") {
      // a: the accepted words; checked without tashkeel, alef forms or a leading ال
      const norm = (w) =>
        bare(w)
          .replace(/[أإآٱ]/g, "ا")
          .replace(/ى/g, "ي")
          .replace(/ة/g, "ه")
          .replace(/[^ء-ي]/g, "")
          .replace(/^ال/, "");
      const model = it.a.join(" ، ");
      A.innerHTML = `<div class="ansrow"><input type="text" class="ansin ar" id="ansIn" dir="rtl" lang="ar" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer"><button type="button" class="btn" id="checkBtn">Check</button></div>
      <p class="note" id="tryNote"></p><div class="row"><button type="button" class="btn ghost" id="showA">Show the answer</button></div>`;
      const inp = document.getElementById("ansIn"),
        done = (ok) => {
          inp.disabled = true;
          inp.classList.add(ok ? "right" : "wrong");
          A.querySelector(".row").remove();
          document.getElementById("checkBtn").remove();
          document.getElementById("tryNote").remove();
          A.insertAdjacentHTML(
            "beforeend",
            `<div class="model"><span class="lab">Model answer · الْإِجَابَةُ</span><p class="ar tapw" dir="rtl" style="margin:4px 0">${tapHTML(model)}</p><button type="button" class="abtn" id="aSay"><span class="e">🔊</span> Listen</button></div>`,
          );
          document.getElementById("aSay").onclick = () => say(model);
          bindTap(A);
          if (ok) xs.score++;
          else xs.miss.push({ q: it.q, your: inp.value, right: model });
          after(
            ok,
            ok ? "That's the word!" : "Read the answer and try to remember it.",
          );
        };
      const check = () => {
        const v = norm(inp.value);
        if (!v) return inp.focus();
        if (it.a.some((w) => norm(w) === v)) return done(true);
        inp.classList.remove("wrong");
        void inp.offsetWidth;
        inp.classList.add("wrong");
        document.getElementById("tryNote").textContent =
          "Not quite. Try again, or show the answer.";
      };
      document.getElementById("checkBtn").onclick = check;
      inp.onkeydown = (e) => {
        if (e.key === "Enter") check();
      };
      inp.oninput = () => inp.classList.remove("wrong");
      document.getElementById("showA").onclick = () => done(false);
    } else if (it.type === "order") {
      const n = it.s.length,
        bank = shuf(it.s.map((_, i) => i));
      let line = [],
        checked = false;
      A.innerHTML = `<p class="hint">Tap the sentences in order, from the beginning to the end. Tap a numbered sentence to take it back.</p><div class="mcol" id="oLine"></div><div class="mcol" id="oBank" style="margin-top:10px"></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" id="checkBtn" type="button" disabled>Check my order</button></div>`;
      const tile = (i, k, cls) => {
        const s = it.s[i],
          t = trText({ en: s[1], uk: s[2] });
        return `<button type="button" class="mi ${cls}" id="os-${i}" data-o="${i}" ${checked ? "disabled" : ""}>${s[3] ? `<span class="ic">${esc(s[3])}</span>` : ""}<span class="tx"><span class="ar" dir="rtl" style="display:block;font-size:1.2rem;line-height:1.8">${esc(s[0])}</span>${checked && t ? `<span class="fix">${esc(t)}</span>` : ""}</span>${k >= 0 ? `<span class="tag" style="background:${PAIRC[k % PAIRC.length]}">${k + 1}</span>` : ""}</button>`;
      };
      const draw = () => {
        A.querySelector("#oLine").innerHTML = line.length
          ? line
              .map((i, k) => tile(i, k, checked ? (i === k ? "ok" : "no") : ""))
              .join("")
          : '<p class="hint">Your story starts here: tap the first sentence.</p>';
        A.querySelector("#oBank").innerHTML = bank
          .map((i) => tile(i, -1, ""))
          .join("");
        A.querySelectorAll("#oLine [data-o]").forEach(
          (b) =>
            (b.onclick = () => {
              const i = +b.dataset.o;
              line = line.filter((x) => x !== i);
              bank.push(i);
              draw();
            }),
        );
        A.querySelectorAll("#oBank [data-o]").forEach(
          (b) =>
            (b.onclick = () => {
              const i = +b.dataset.o;
              bank.splice(bank.indexOf(i), 1);
              line.push(i);
              say(it.s[i][0]);
              draw();
            }),
        );
        const cb = A.querySelector("#checkBtn");
        if (cb) cb.disabled = bank.length > 0;
      };
      draw();
      A.querySelector("#checkBtn").onclick = () => {
        checked = true;
        let got = 0;
        line.forEach((i, k) => {
          if (i === k) got++;
          else
            xs.miss.push({
              q: it.s[i][0],
              your: "رقم " + (k + 1),
              right: "رقم " + (i + 1),
            });
        });
        xs.score += got;
        draw();
        A.querySelector("#checkBtn").remove();
        after(
          got === n,
          `${got} of ${n} in the right place.<br><span class="ar" dir="rtl">الْبِدَايَةُ: ${esc(it.s[0][0])}<br>النِّهَايَةُ: ${esc(it.s[n - 1][0])}</span>`,
        );
      };
    } else if (it.type === "match") {
      const left = shuf(
        it.pairs.map((p, i) => ({
          i,
          html: `<span class="ar" style="font-size:1.15rem;line-height:1.8">${esc(p[0])}</span>`,
        })),
      );
      const right = shuf(
        it.pairs.map((p, i) => ({
          i,
          html: `<span class="ar">${esc(p[1])}</span>${tr === "off" ? "" : `<span class="gl">${esc(p[2])}</span>`}`,
          plain: esc(p[1]),
        })),
      );
      matchUI(
        A,
        left,
        right,
        (got, pair) => {
          xs.score += got;
          it.pairs.forEach((p, i) => {
            if (pair[i] !== i)
              xs.miss.push({
                q: p[0],
                your: it.pairs[pair[i]] ? it.pairs[pair[i]][1] : "",
                right: p[1],
              });
          });
          A.querySelector("#fbx").remove();
          after(
            got === it.pairs.length,
            `${got} of ${it.pairs.length} correct.`,
          );
        },
        { lcls: "long", rcls: "arw" },
      );
    }
  }
  function exEnd() {
    const sec = xs.sec;
    const H = exH();
    exTop(H);
    H.innerHTML = scoreCard(
      xs.score,
      xs.max,
      xs.miss,
      0,
      "Other exercises",
      tr === "uk" ? sec.uk : sec.en,
    );
    document.getElementById("againBtn").onclick = () => {
      xs = {
        sec,
        list: sec.items.slice(),
        i: 0,
        score: 0,
        max: xs.max,
        miss: [],
      };
      exView();
    };
    document.getElementById("backBtn").onclick = () => {
      xs = null;
      exView();
    };
  }
  function qaCards() {
    const n = xs.list.length;
    if (xs.i < 0) xs.i = n - 1;
    if (xs.i >= n) xs.i = 0;
    const it = xs.list[xs.i];
    const H = exH();
    exTop(H);
    H.innerHTML = `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to exercise list">←</button><span class="qnum">Card ${xs.i + 1} of ${n}</span><div class="meter"><i style="width:${Math.round(((xs.i + 1) / n) * 100)}%"></i></div></div>
  <section class="card pop exq qacard">
    <span class="qtype mc" style="align-self:center">سُؤَالٌ · Question</span>
    <p class="qar ar" dir="rtl" style="text-align:center">${esc(it.q)}</p>${trText(it) ? `<p class="qhelp" style="text-align:center">${esc(trText(it))}</p>` : ""}
    <div class="audio" style="justify-content:center"><button type="button" class="abtn" id="qSay"><span class="e">🔊</span> Question</button></div>
    <div id="aBox" style="display:flex;flex-direction:column;align-items:center;gap:10px"><button type="button" class="hiddenw" id="showA">Tap to see the answer</button></div>
    <div class="nav" dir="rtl"><button type="button" class="btn ghost" id="pv"><span class="na">→ السابق</span> <small>Back</small></button><button type="button" class="btn" id="nx"><span class="na">التالي ←</span> <small>Next</small></button></div>
  </section>`;
    document.getElementById("homeBtn").onclick = () => {
      xs = null;
      exView();
    };
    document.getElementById("qSay").onclick = () => say(it.q);
    document.getElementById("showA").onclick = () => {
      document.getElementById("aBox").innerHTML =
        `<div class="model" style="width:100%"><span class="lab">جَوَابٌ · Answer</span><p class="ar" dir="rtl" style="margin:4px 0;text-align:center">${esc(it.a)}</p></div><button type="button" class="abtn" id="aSay"><span class="e">🔊</span> Answer</button>`;
      document.getElementById("aSay").onclick = () => say(it.a);
      say(it.a);
    };
    document.getElementById("pv").onclick = () => {
      hush();
      xs.i--;
      qaCards();
    };
    document.getElementById("nx").onclick = () => {
      hush();
      xs.i++;
      qaCards();
    };
  }

  /* ---------- start ---------- */
  if (VIEW === "list") listView();
  else if (VIEW === "exercises") {
    store.set(KEY + "tab", "ex");
    location.replace(`lesson-${L.n}.html`);
  } else {
    lessonView();
    if (window.Quiz) Quiz.watch(app);
  }
  addEventListener("pagehide", hush);
})();
