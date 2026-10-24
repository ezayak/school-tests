// Computer lessons engine (Grade 3 and Grade 4). <body data-view="list"> → grade-N/computer/index.html, lessons by chapter (lessons.js),
// <body data-view="lesson"> → one lesson in grade-N/computer/chapter-N/ (window.LESSON from lesson-N.js). Mini Windows comes from winsim.js,
// Mini Word (chapter 2 of Grade 3 and 4) from shared/wordsim.js: the page loads one of them and the lesson uses whichever is there.
// Made for a child who learns best from pictures and sound: short sentences, key words in colour,
// every question can be heard (🔊), wrong answers can be tried again, and the computer steps are shown
// on a pretend Windows screen (▶ Show me) before the child does them (✋ Your turn).
(function () {
  "use strict";
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "lesson";
  const SUBJ = document.body.dataset.subject || "Computer"; // Science pages reuse this engine
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
  // "[Search]" → a coloured key word; plain() is the same text for the voice
  const kw = (t) => esc(t).replace(/\[([^\]]+)\]/g, '<b class="kw">$1</b>');
  const plain = (t) =>
    String(t ?? "")
      .replace(/[[\]]/g, "")
      .replace(/___/g, "…");

  /* ================= list of lessons ================= */
  if (view === "list") {
    const LS = window.CS_LESSONS || { grade: 4, chapters: [] };
    // one block per chapter; a lesson's path and cover are relative to its chapter folder
    const chapter = (ch) =>
      `<h2 class="chapter">${esc(LS.part || "Chapter")} ${esc(ch.n)}${ch.title ? ` · ${esc(ch.title)}` : ""}</h2>
  <div class="items">${ch.items.map((it) => Kit.lessonCard({ ...it, path: `${ch.dir}/${it.path}`, cover: `${ch.dir}/${it.cover}` }, "Lesson")).join("")}</div>`;
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="../../index.html">← All games</a><span class="eyebrow">Grade ${esc(LS.grade)} · ${esc(SUBJ)}</span></div>
    <h1 class="hero-title"><span class="p">${esc(SUBJ)}</span> <span class="k">Lessons</span></h1>
    <p class="howto">${esc(LS.intro || "Pick a lesson. Each lesson has big pictures, a pretend Windows computer to practise on, games, and the school exercises. Everything can be read aloud.")}</p>
  </section>
  ${LS.chapters.map(chapter).join("")}
  <div class="soon">New lessons will be added here.</div>`;
    document.title = `${SUBJ} · Grade ${LS.grade}`;
    return;
  }

  /* ================= lesson ================= */
  const L = window.LESSON;
  const IMG = (n) => `img/lesson-${L.n}/${n}.jpg`;
  const LK = L.key || L.n; // saved ticks and tab; Science lessons set a key so topics don't share lesson numbers
  const W = window.WinSim || window.WordSim;
  // the pretend program's name for the free-play tile: Mini Windows unless the program says otherwise
  const SIM = {
    name: (W && W.label) || "Mini Windows",
    ic: (W && W.ic) || "🪟",
    about: (W && W.about) || "Play on a pretend computer",
  };
  const HOW = L.howto || []; // the Mini Windows how-to's (Grade 3 has none)
  let slow = store.get("cs-slow", "0") === "1";
  let auto = store.get("cs-auto", "1") === "1";
  const TOUCH = matchMedia("(hover: none)").matches;

  /* ---------- voice (device voices, English) ---------- */
  const TTS = "speechSynthesis" in window;
  let voice = null;
  function pickVoice() {
    if (!TTS) return;
    const vs = speechSynthesis.getVoices();
    voice =
      vs.find((v) => /^en[-_]US/i.test(v.lang) && v.localService) ||
      vs.find((v) => /^en[-_]US/i.test(v.lang)) ||
      vs.find((v) => /^en[-_]GB/i.test(v.lang)) ||
      vs.find((v) => /^en/i.test(v.lang)) ||
      null;
  }
  if (TTS) {
    pickVoice();
    try {
      speechSynthesis.addEventListener("voiceschanged", pickVoice);
    } catch (e) {
      speechSynthesis.onvoiceschanged = pickVoice;
    }
  }
  const speakable = (t) =>
    plain(t)
      .replace(/[’‘]/g, "'")
      .replace(/\p{Extended_Pictographic}|\uFE0F/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  let sayToken = 0,
    sayTimer = 0;
  const keep = [];
  function hush() {
    sayToken++;
    clearTimeout(sayTimer);
    if (TTS)
      try {
        speechSynthesis.cancel();
      } catch (e) {}
  }
  // returns a promise that ends when the sentence has been said (or could not be said)
  function say(text, forceSlow) {
    return new Promise((res) => {
      if (!TTS || !text) {
        res();
        return;
      }
      clearTimeout(sayTimer);
      let busy = false;
      try {
        busy = speechSynthesis.speaking || speechSynthesis.pending;
        speechSynthesis.cancel();
      } catch (e) {}
      const my = ++sayToken;
      sayTimer = setTimeout(
        () => {
          try {
            if (!voice) pickVoice();
            const u = new SpeechSynthesisUtterance(speakable(text));
            u.lang = "en-US";
            if (voice) u.voice = voice;
            u.rate = (forceSlow ?? slow) ? 0.72 : 0.92;
            let done = false;
            const f = () => {
              if (done) return;
              done = true;
              res();
            };
            u.onend = f;
            u.onerror = f;
            setTimeout(f, 1500 + speakable(text).length * 110); // some browsers never say "end"
            keep.push(u);
            if (keep.length > 6) keep.shift();
            try {
              speechSynthesis.resume();
            } catch (e) {}
            if (my === sayToken) speechSynthesis.speak(u);
            else f();
          } catch (e) {
            res();
          }
        },
        busy ? 160 : 40,
      ); // speaking right after cancel() is ignored by Chrome
    });
  }
  function autoSay(text) {
    if (auto && text) setTimeout(() => say(text), 350);
  }

  /* ---------- pictures: book images and drawings ---------- */
  const ic = (type, size) =>
    `<span class="fi" style="--fis:${size || 64}px">${W.icon(type)}</span>`;
  function visHTML(v) {
    if (!v) return "";
    switch (v.kind) {
      case "icons":
        return `<div class="vis-icons">${v.items.map((it) => `<div class="vi${it.mark ? " m-" + it.mark : ""}">${ic(it.type + (it.sc ? "*" : ""), v.size || 64)}${it.label ? `<span>${esc(it.label)}</span>` : ""}${it.mark === "link" ? "<em>↗ link</em>" : it.mark === "file" ? "<em>real file</em>" : ""}</div>`).join("")}</div>`;
      case "compare":
        return `<div class="vis-cmp"><div class="bad"><b>✗</b>${v.bad.map((it) => `<div class="vi">${ic(it.type, 44)}<span>${esc(it.label)}</span></div>`).join("")}</div><div class="good"><b>✓</b>${v.good.map((it) => `<div class="vi">${ic(it.type, 44)}<span>${esc(it.label)}</span></div>`).join("")}</div></div>`;
      case "nameext":
        return `<div class="vis-ne">${ic(v.type, 90)}<div class="ne"><span class="n"><b>${esc(v.name)}</b><small>name</small></span><span class="d"><b>${v.hideDot ? "?" : "."}</b><small>dot</small></span><span class="e"><b>${esc(v.ext)}</b><small>extension</small></span></div></div>`;
      case "lines":
        return `<div class="vis-lines">${v.rows.map((r) => `<div>${esc(r)}</div>`).join("")}${v.note ? `<small>${esc(v.note)}</small>` : ""}</div>`;
      case "sizes": {
        const mx = Math.max(...v.items.map((i) => i.kb));
        return `<div class="vis-sizes">${v.items.map((it) => `<div class="sz">${ic(it.type, 40)}<span class="nm">${esc(it.name)}</span><span class="bar"><i style="width:${Math.max(3, Math.round(Math.sqrt(it.kb / mx) * 100))}%"></i></span><b>${it.kb >= 1024 ? Math.round(it.kb / 1024) + " MB" : it.kb + " KB"}</b></div>`).join("")}</div>`;
      }
      case "wild":
        return `<div class="vis-wild"><div class="pat">🔍 ${esc(v.pattern)}</div><div class="arr">↓</div><div class="vis-icons">${v.items.map((it) => `<div class="vi">${ic(it.type, 52)}<span>${esc(it.label.replace(/ball$/i, ""))}<b class="kw">ball</b></span></div>`).join("")}</div></div>`;
      case "flow":
        return `<div class="vis-flow">${v.rows.map((r) => `<div class="fr${r.x ? " x" : ""}"><span class="from">${esc(r.from)}</span><span class="to">→</span>${ic(r.type + (r.sc ? "*" : ""), 56)}<span class="lb">${esc(r.label)}</span></div>`).join("")}</div>`;
      case "emoji":
        return `<div class="vis-emo">${esc(v.e)}</div>`;
      case "searchbox":
        return `<div class="vis-sbox">${W.ICONS.search}<span>Search</span></div>`;
      case "ribbon":
        return `<div class="vis-ribbon"><span>Home</span><span>Insert</span><span>Design</span></div>`;
      case "view": {
        const files = [
          ["folder", "Lessons"],
          ["docx", "Grammar.docx"],
          ["zip", "My courses.zip"],
          ["jpg", "Boat.jpg"],
        ];
        const sz =
          {
            xl: 84,
            large: 60,
            medium: 40,
            small: 18,
            list: 18,
            details: 16,
            tiles: 34,
            content: 24,
          }[v.v] || 40;
        if (v.v === "details")
          return `<div class="vis-view v-details"><div class="vh"><span>Name</span><span>Date modified</span><span>Type</span><span>Size</span></div>${files.map(([t, nm], k) => `<div class="vr">${ic(t, sz)}<span>${nm}</span><span>10/3/2026</span><span>${{ folder: "File folder", docx: "Word Document", zip: "Compressed", jpg: "JPG File" }[t]}</span><span>${t === "folder" ? "" : [13, 11, 2100][k - 1] + " KB"}</span></div>`).join("")}</div>`;
        return `<div class="vis-view v-${v.v}">${files.map(([t, nm]) => `<div class="vf">${ic(t, sz)}<span>${nm}</span>${v.v === "tiles" ? "<small>File · 13 KB</small>" : ""}</div>`).join("")}</div>`;
      }
      case "bars": {
        // "which holds more": a bar for each thing
        const mx = Math.max(...v.items.map((i) => i.v));
        return `<div class="vis-bars">${v.items.map((it) => `<div class="bb">${it.img ? `<img src="${IMG(it.img)}" alt="">` : `<span class="be">${esc(it.e || "")}</span>`}<span class="nm">${esc(it.label)}</span><span class="bar"><i style="width:${Math.max(4, Math.round((it.v / mx) * 100))}%"></i></span>${it.note ? `<small>${esc(it.note)}</small>` : ""}</div>`).join("")}</div>`;
      }
      case "ink":
        // the 4 inks of an inkjet printer
        return `<div class="vis-ink">${[
          ["c", "Cyan", "blue"],
          ["m", "Magenta", "pink"],
          ["y", "Yellow", ""],
          ["k", "Black", ""],
        ]
          .map(
            ([k, n, s]) =>
              `<div class="drop d-${k}"><i></i><b>${n}</b>${s ? `<small>(${s})</small>` : ""}</div>`,
          )
          .join("")}</div>`;
      case "strip":
        // a row of book pictures with their names
        return `<div class="vis-strip">${v.items.map((it) => `<div class="vs">${it.img ? `<img src="${IMG(it.img)}" alt="">` : `<span class="be">${esc(it.e || "")}</span>`}<span>${esc(it.label)}</span></div>`).join("")}</div>`;
      case "filerow":
        return `<div class="vis-frow">${ic(v.type, 34)}<span>${esc(v.name)}</span><b>${esc(v.size)}</b></div>`;
    }
    return "";
  }
  // a picture box: book image, drawing, or emoji
  function pic(it, cls = "pic card") {
    if (it && it.img)
      return `<div class="${cls}"><img src="${IMG(it.img)}" alt="" draggable="false"></div>`;
    if (it && it.vis) return `<div class="${cls} vis">${visHTML(it.vis)}</div>`;
    if (it && it.icon)
      return `<div class="${cls} vis">${ic(it.icon, 96)}</div>`;
    return `<div class="${cls} emo"><span>${esc((it && it.emoji) || "💻")}</span></div>`;
  }
  const hasPic = (it) => it && (it.img || it.vis || it.icon || it.emoji);

  /* ---------- shared bits ---------- */
  const bolt =
    '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#1B2440"/></svg>';
  const titleBar = (t, sub) =>
    `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to the lesson">←</button><span class="qnum">${esc(t)}</span>${sub || ""}</div>`;
  // ← goes back to the page this one was opened from (a tab of the lesson, Mini Windows, a big-idea card …)
  let backTo = null;
  function bindHome() {
    const h = document.getElementById("homeBtn");
    if (h)
      h.onclick = () => {
        const b = backTo || home;
        backTo = null;
        leave();
        b();
      };
  }
  const openTab = (t) => () => {
    tab = t;
    store.set("cs-tab-" + LK, t);
    home();
  };
  const top0 = () => window.scrollTo({ top: 0 });
  const split = (side, main, cls = "") =>
    `<div class="split ${cls}"><div class="side">${side}</div><div class="main">${main}</div></div>`;
  const sayBtns = (id) =>
    `<div class="audio"><button type="button" class="abtn big" data-sayall="${id || ""}">🔊 <span>Listen</span></button><button type="button" class="abtn" data-sayslow="${id || ""}">🐢 <span>Slow</span></button></div>`;
  function bindSay(root, text) {
    root.querySelectorAll("[data-sayall]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          say(text, false);
        }),
    );
    root.querySelectorAll("[data-sayslow]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          say(text, true);
        }),
    );
  }
  // what kind of mouse action a step is
  const ACT = {
    click: { i: "👆", t: "Click" },
    dbl: { i: "👆👆", t: "Double-click" },
    right: {
      i: "🖱️",
      t: TOUCH ? "Right-click · hold your finger" : "Right-click",
    },
    drag: { i: "✋", t: "Drag" },
    type: { i: "⌨️", t: "Type" },
    hover: { i: "🖱️", t: TOUCH ? "Point · tap" : "Point" },
    look: { i: "👀", t: "Look" },
    key: { i: "⌨️", t: "Press a key" },
    slide: { i: "↔️", t: "Drag the slider" },
    select: {
      i: "🖍️",
      t: TOUCH ? "Select · slide your finger over it" : "Select · drag over it",
    },
  };
  const keyName = (k) => (k === "Enter" ? "Enter ↩️" : k);
  const actPill = (a) =>
    `<span class="act a-${a}"><span class="ai">${ACT[a].i}</span>${esc(ACT[a].t)}</span>`;
  let sim = null;
  function leave() {
    hush();
    closePop();
    if (sim) {
      sim.destroy();
      sim = null;
    }
    document.querySelectorAll("video").forEach((v) => {
      try {
        v.pause();
      } catch (e) {}
    });
  }
  // popup for the school video and the book picture: fills the screen, the picture or video fits inside
  function closePop() {
    const p = document.getElementById("pop");
    if (p) {
      p.querySelectorAll("video").forEach((v) => {
        try {
          v.pause();
        } catch (e) {}
      });
      p.remove();
      document.body.classList.remove("popopen");
    }
  }
  function openPop(title, inner) {
    closePop();
    hush();
    const p = document.createElement("div");
    p.id = "pop";
    p.className = "popup";
    p.setAttribute("role", "dialog");
    p.setAttribute("aria-modal", "true");
    p.setAttribute("aria-label", title);
    p.innerHTML = `<div class="pop-in"><div class="pop-bar"><b>${esc(title)}</b><button type="button" class="abtn" id="popX" aria-label="Close">✕</button></div><div class="pop-body">${inner}</div></div>`;
    document.body.appendChild(p);
    document.body.classList.add("popopen");
    p.addEventListener("click", (e) => {
      if (e.target === p) closePop();
    });
    document.getElementById("popX").onclick = closePop;
    document.getElementById("popX").focus();
    return p;
  }
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePop();
  });
  // school videos are not saved for offline use
  function videoHTML(name) {
    return `<div class="vbox" data-v="${esc(name)}"></div>`;
  }
  function bindVideos(root) {
    root.querySelectorAll(".vbox").forEach((b) => {
      const name = b.dataset.v;
      const off = () => {
        b.innerHTML = `<div class="voff">📶<b>You need the internet to watch the video.</b><span>Connect to Wi-Fi and open this page again.</span></div>`;
      };
      if (navigator.onLine === false) {
        off();
        return;
      }
      b.innerHTML = `<video controls playsinline preload="none" poster="video/${esc(name)}.jpg"><source src="video/${esc(name)}.mp4" type="video/mp4"></video>`;
      const v = b.querySelector("video");
      v.addEventListener("error", off, true);
      v.querySelector("source").addEventListener("error", off);
    });
  }

  function playVideo(v) {
    const p = openPop("🎬 " + v.t, videoHTML(v.video));
    bindVideos(p);
    const el = p.querySelector("video");
    if (el) el.play().catch(() => {});
  }

  /* ================= HOME ================= */
  const done = (k) => store.get(`cs-done-${LK}-${k}`, "") === "1";
  const setDone = (k) => store.set(`cs-done-${LK}-${k}`, "1");
  let tab = store.get("cs-tab-" + LK, "learn");
  if (!["learn", "play", "ex"].includes(tab)) tab = "learn";
  const TABS = [
    {
      k: "learn",
      ic: "📖",
      t: "Learn",
      en: HOW.length ? "Pictures & how to" : "Pictures & videos",
    },
    {
      k: "play",
      ic: "🎲",
      t: "Play",
      en: W && HOW.length ? "Games & " + SIM.name : "Games",
    },
    { k: "ex", ic: "✏️", t: "Exercises", en: "School exercises" },
  ];
  const tileHTML = (m, data) =>
    `<button type="button" class="mode${m.done ? " done" : ""}" ${data}>${m.img ? pic({ img: m.img }, "thumb") : `<span class="mi-ic">${m.ic || "💻"}</span>`}<b>${esc(m.t)}</b><small>${esc(m.en || "")}</small>${m.done ? '<span class="tick" aria-label="done">✓</span>' : ""}</button>`;
  function home() {
    leave();
    let tiles = "";
    if (tab === "learn") {
      tiles =
        // with a key-word list (Science) the first tile is the list, not a copy of the first card;
        // a lesson with how-to's keeps "Big ideas" too, its cards have no tiles of their own
        (L.words
          ? tileHTML(
              { t: "Key words", en: `${L.words.length} words`, ic: "🔤" },
              'data-m="words" id="m-words"',
            )
          : "") +
        (!L.words || HOW.length
          ? tileHTML(
              {
                t: "Big ideas",
                en: `${L.ideas.length} picture cards`,
                ic: "💡",
              },
              'data-m="ideas" id="m-ideas"',
            )
          : "") +
        HOW.map((h, i) =>
          tileHTML(
            {
              t: h.t,
              en: `How to · ${h.code}${h.video ? " · 🎬" : ""}`,
              ic: h.ic,
              done: done("h-" + h.k),
            },
            `data-h="${i}" id="h-${h.k}"`,
          ),
        ).join("") +
        // no how-to's (Grade 3): one tile per picture card, so a card can be found by its picture
        (HOW.length
          ? ""
          : L.ideas
              .map((c, i) =>
                tileHTML(
                  {
                    t: c.t,
                    en: "Picture card",
                    // a picture strip shows its first picture on the tile
                    img:
                      c.img ||
                      (c.vis &&
                        c.vis.kind === "strip" &&
                        (c.vis.items.find((x) => x.img) || {}).img),
                    ic: c.vis && c.vis.kind === "emoji" ? c.vis.e : "💡",
                  },
                  `data-i="${i}" id="i-${i}"`,
                ),
              )
              .join("")) +
        (L.videos || [])
          .map((v, i) =>
            tileHTML(
              { t: v.t, en: "🎬 Video from school", img: v.img },
              `data-v="${i}" id="v-${v.k}"`,
            ),
          )
          .join("");
    } else if (tab === "play") {
      tiles =
        (W && HOW.length
          ? tileHTML(
              { t: SIM.name, en: SIM.about, ic: SIM.ic },
              'data-m="mini" id="m-mini"',
            )
          : "") +
        L.games
          .map((g, i) =>
            tileHTML(
              { t: g.t, en: g.en, ic: g.ic },
              `data-g="${i}" id="g-${g.k}"`,
            ),
          )
          .join("");
    } else {
      tiles = L.exercises
        .map((x, i) =>
          tileHTML(
            { t: x.t, en: x.en, ic: x.ic, done: done("x-" + x.k) },
            `data-x="${i}" id="x-${x.k}"`,
          ),
        )
        .join("");
    }
    app.innerHTML = `<section class="card pop">
    <div class="toprow"><div class="toplinks"><a class="back" href="../../../index.html">← All games</a><a class="back" href="../index.html">${esc(SUBJ)}</a></div></div>
    <div class="les-head"><button type="button" class="les-cov" id="coverBtn" aria-label="The lesson question"><img src="${IMG(L.cover)}" alt=""></button>
      <div><span class="eyebrow">Grade ${esc(L.grade)} · ${esc(L.unit)} · ${esc(L.book)}</span><h1 class="les-title">${esc(L.title)}</h1><div class="les-sub">${kw(L.question.q)}</div></div></div>
    <div class="opts-row">
      <div class="og"><span class="lab">Voice</span><div class="seg" role="group" aria-label="Voice speed"><button type="button" id="sp-0" data-sp="0" aria-pressed="${!slow}">Normal</button><button type="button" id="sp-1" data-sp="1" aria-pressed="${slow}">🐢 Slow</button></div></div>
      <div class="og"><span class="lab">Auto sound</span><div class="seg" role="group" aria-label="Play sound automatically"><button type="button" id="au-1" data-au="1" aria-pressed="${auto}">On</button><button type="button" id="au-0" data-au="0" aria-pressed="${!auto}">Off</button></div></div>
    </div>
    ${TTS ? "" : '<p class="note">This browser cannot speak. Open the lesson in Chrome or Safari to hear the words.</p>'}
    <div class="tabbox"><div class="ftabs" role="group" aria-label="Lesson part">${TABS.map((t) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span>${esc(t.t)}<span class="sub">${esc(t.en)}</span></button>`).join("")}</div>
      <div class="panel" id="panel"><div class="modes">${tiles}</div></div></div>
  </section>`;
    document.getElementById("coverBtn").onclick = () => questionView();
    app.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          store.set("cs-tab-" + LK, tab);
          home();
        }),
    );
    app.querySelectorAll("[data-sp]").forEach(
      (b) =>
        (b.onclick = () => {
          slow = b.dataset.sp === "1";
          store.set("cs-slow", slow ? "1" : "0");
          home();
        }),
    );
    app.querySelectorAll("[data-au]").forEach(
      (b) =>
        (b.onclick = () => {
          auto = b.dataset.au === "1";
          store.set("cs-auto", auto ? "1" : "0");
          home();
        }),
    );
    app
      .querySelectorAll("[data-m]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            ({ ideas: () => ideas(0), words: keyWords, mini: miniWindows })[
              b.dataset.m
            ]()),
      );
    app
      .querySelectorAll("[data-h]")
      .forEach(
        (b) => (b.onclick = () => howto(+b.dataset.h, null, openTab("learn"))),
      );
    app
      .querySelectorAll("[data-i]")
      .forEach((b) => (b.onclick = () => ideas(+b.dataset.i)));
    app
      .querySelectorAll("[data-v]")
      .forEach((b) => (b.onclick = () => playVideo(L.videos[+b.dataset.v])));
    app
      .querySelectorAll("[data-g]")
      .forEach((b) => (b.onclick = () => startGame(+b.dataset.g)));
    app
      .querySelectorAll("[data-x]")
      .forEach((b) => (b.onclick = () => startExercise(+b.dataset.x)));
    document.title = `${L.title} · ${SUBJ} Lesson ${L.n}`;
  }

  /* ================= LEARN: the lesson question ================= */
  function questionView() {
    leave();
    backTo = openTab("learn");
    const Q = L.question;
    app.innerHTML = `${titleBar("The big question")}<section class="card pop fc">
    ${split(
      pic(Q),
      `<div class="bigq">❓ ${kw(Q.q)}</div>
    <div id="ans"><button type="button" class="btn" id="showA">💡 Answer</button></div>
    ${sayBtns()}
    <div class="row center"><button type="button" class="btn ghost" id="goIdeas">📖 Big ideas →</button></div>`,
    )}
  </section>`;
    bindHome();
    bindSay(app, Q.q);
    document.getElementById("showA").onclick = () => {
      document.getElementById("ans").innerHTML =
        `<div class="fb ok"><b>${kw(Q.a)}</b></div>`;
      say(Q.a);
    };
    document.getElementById("goIdeas").onclick = () => ideas(0);
    autoSay(Q.q);
  }

  /* ================= LEARN: key words (word = short meaning, each can be heard) ================= */
  function keyWords() {
    leave();
    backTo = openTab("learn");
    const text = L.words.map((w) => w.w + ". " + plain(w.m)).join(" ");
    app.innerHTML = `${titleBar("Key words", `<span class="count">${L.words.length}</span>`)}<section class="card pop fc">
    <div class="idea-lines">${L.words.map((w, k) => `<button type="button" class="iline" data-l="${k}"><span class="num">${k + 1}</span><span>${kw("[" + w.w + "] = " + w.m)}</span><span class="spk">🔊</span></button>`).join("")}</div>
    ${sayBtns()}
    <div class="row center"><button type="button" class="btn ghost" id="goIdeas">📖 Picture cards →</button></div>
  </section>`;
    bindHome();
    bindSay(app, text);
    app.querySelectorAll("[data-l]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          app
            .querySelectorAll(".iline")
            .forEach((x) => x.classList.remove("on"));
          b.classList.add("on");
          const w = L.words[+b.dataset.l];
          say(w.w + ". " + w.m).then(() => b.classList.remove("on"));
        }),
    );
    document.getElementById("goIdeas").onclick = () => ideas(0);
    top0();
  }

  /* ================= LEARN: big ideas (picture cards) ================= */
  function ideas(i) {
    leave();
    backTo = openTab("learn");
    const n = L.ideas.length;
    i = (i + n) % n;
    const c = L.ideas[i];
    const text = c.t + ". " + c.lines.map(plain).join(" ");
    const hi = c.howto ? HOW.findIndex((h) => h.k === c.howto) : -1;
    app.innerHTML = `${titleBar("Big ideas", `<span class="count">${i + 1} / ${n}</span>`)}<section class="card pop fc">
    ${split(
      `${pic(c)}
    <div class="dotsnav">${L.ideas.map((_, k) => `<button type="button" class="dot${k === i ? " on" : ""}" data-go="${k}" aria-label="Card ${k + 1}"></button>`).join("")}</div>`,
      `<h2 class="idea-t">${esc(c.t)}</h2>
    <div class="idea-lines">${c.lines.map((l, k) => `<button type="button" class="iline" data-l="${k}"><span class="num">${k + 1}</span><span>${kw(l)}</span><span class="spk">🔊</span></button>`).join("")}</div>
    ${c.tip ? `<div class="tipb">${pic({ img: c.tip.img }, "pic face")}<span>${kw(c.tip.say)}</span></div>` : ""}
    ${sayBtns()}
    ${hi >= 0 ? `<div class="row center"><button type="button" class="btn ghost" id="tryIt">${SIM.ic} Try it: ${esc(HOW[hi].t)}</button></div>` : ""}
    ${c.video ? `<div class="row center"><button type="button" class="btn ghost" id="vidIt">🎬 Video from school</button></div>` : ""}
    <div class="nav"><button type="button" class="btn ghost" id="prevBtn" aria-label="Back">←</button><button type="button" class="btn" id="nextBtn" aria-label="Next">${i + 1 < n ? "→" : "↺"}</button></div>`,
      "wide",
    )}
  </section>`;
    bindHome();
    bindSay(app, text);
    app.querySelectorAll("[data-l]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          app
            .querySelectorAll(".iline")
            .forEach((x) => x.classList.remove("on"));
          b.classList.add("on");
          say(c.lines[+b.dataset.l]).then(() => b.classList.remove("on"));
        }),
    );
    app
      .querySelectorAll("[data-go]")
      .forEach((b) => (b.onclick = () => ideas(+b.dataset.go)));
    document.getElementById("prevBtn").onclick = () => ideas(i - 1);
    document.getElementById("nextBtn").onclick = () => ideas(i + 1);
    const tb = document.getElementById("tryIt");
    if (tb) tb.onclick = () => howto(hi, null, () => ideas(i));
    const vb = document.getElementById("vidIt");
    if (vb) vb.onclick = () => playVideo({ t: c.t, video: c.video });
    autoSay(text);
    top0();
  }

  /* ================= LEARN: how to … (Mini Windows: Show me / Your turn) ================= */
  function stepsHTML(steps, cur) {
    return `<ol class="steps">${steps.map((s, k) => `<li class="${k < cur ? "ok" : k === cur ? "now" : ""}" data-s="${k}"><span class="sn">${k < cur ? "✓" : k + 1}</span>${actPill(s.act)}<span class="st">${kw(s.say)}</span></li>`).join("")}</ol>`;
  }
  function howto(hIdx, startMode, back) {
    leave();
    backTo = back || openTab("learn");
    const H = HOW[hIdx];
    let cur = 0;
    let mode = "idle";
    app.innerHTML = `${titleBar(H.t, `<span class="count">${esc(H.code)}</span>`)}<section class="card pop">
    <div class="cap" id="cap"></div>
    <div class="simwrap"><div id="simbox"></div></div>
    <p class="turn">📱↻ Turn your phone sideways for a bigger screen.</p>
    <div class="row center simbtns">
      <button type="button" class="btn" id="showBtn">▶ Show me</button>
      <button type="button" class="btn ghost" id="tryBtn">✋ Your turn</button>
      <button type="button" class="abtn" id="againBtn" aria-label="Start again">↺</button>
    </div>
    <div id="stepsBox">${stepsHTML(H.steps, -1)}</div>
    ${
      H.video || H.img
        ? `<div class="row center extras">
      ${H.video ? `<button type="button" class="btn ghost" id="vidBtn">🎬 Video from school</button>` : ""}
      ${H.img ? `<button type="button" class="btn ghost" id="bookBtn">📕 The picture in the book</button>` : ""}
    </div>`
        : ""
    }
  </section>`;
    bindHome();
    const vb = document.getElementById("vidBtn");
    if (vb)
      vb.onclick = () => {
        if (sim) sim.stop();
        const p = openPop("🎬 " + H.t, videoHTML(H.video));
        bindVideos(p);
        const v = p.querySelector("video");
        if (v) v.play().catch(() => {});
      };
    const bb = document.getElementById("bookBtn");
    if (bb)
      bb.onclick = () =>
        openPop(
          "📕 " + H.t + " · " + H.code,
          `<img class="pop-img" src="${IMG(H.img)}" alt="The picture in the book">`,
        );
    sim = W.create(document.getElementById("simbox"), { start: H.start });
    const cap = document.getElementById("cap");
    function caption(k, extra) {
      const s = H.steps[k];
      if (!s) {
        cap.innerHTML = `<div class="capt"><span class="sbig">${esc(H.t)}</span><span class="hint">Press ▶ Show me to watch, or ✋ Your turn to do it.</span></div>`;
        return;
      }
      cap.innerHTML = `<div class="capt"><span class="sno">${k + 1}/${H.steps.length}</span>${actPill(s.act)}<span class="sbig">${kw(s.say)}</span><button type="button" class="abtn" id="capSay" aria-label="Listen">🔊</button></div>${extra || ""}${s.act === "type" && mode === "try" ? `<div class="row center"><button type="button" class="btn ghost typebtn" id="typeBtn">⌨️ ${esc(s.text)}</button><span class="hint">Type it, or tap the button.</span></div>` : ""}${s.act === "key" && mode === "try" ? `<div class="row center"><button type="button" class="btn ghost keybtn" id="keyBtn">${esc(keyName(s.key))}</button><span class="hint">Press it on the keyboard, or tap the button.</span></div>` : ""}`;
      document.getElementById("capSay").onclick = () => say(s.say);
      const tb = document.getElementById("typeBtn");
      if (tb) tb.onclick = () => sim.typeFor();
      const kb = document.getElementById("keyBtn");
      if (kb) kb.onclick = () => sim.pressKey(s.key);
      document.getElementById("stepsBox").innerHTML = stepsHTML(H.steps, k);
    }
    caption(-1);
    function go(m) {
      mode = m;
      sim.setup(H.start);
      document
        .getElementById("showBtn")
        .classList.toggle("ghost", m !== "demo");
      document.getElementById("tryBtn").classList.toggle("ghost", m !== "try");
      sim.run(H.steps, {
        mode: m,
        onStep: (k, s) => {
          cur = k;
          caption(k);
          return say(s.say);
        },
        onWrong: (s, why) => {
          const msg =
            why === "kind"
              ? s.act === "right"
                ? TOUCH
                  ? "Hold your finger on it."
                  : "Use the right mouse button."
                : s.act === "dbl"
                  ? "Click two times, fast."
                  : "Try again."
              : "Not there. Look for the yellow light.";
          caption(cur, `<div class="fb no"><b>💡 ${esc(msg)}</b></div>`);
          say(msg + " " + plain(s.say));
        },
        onDone: (m2) => {
          document.getElementById("stepsBox").innerHTML = stepsHTML(
            H.steps,
            H.steps.length,
          );
          if (m === "demo") {
            cap.innerHTML = `<div class="capt"><span class="sbig">👏 Now <b class="kw">you</b> try!</span></div>`;
            say("Now you try!");
            document.getElementById("tryBtn").classList.remove("ghost");
            document.getElementById("showBtn").classList.add("ghost");
          } else {
            setDone("h-" + H.k);
            const perfect = !m2.wrongs;
            cap.innerHTML = `<div class="fb ok"><b>🎉 ${perfect ? "Perfect!" : "Well done!"}</b><span>${esc(H.t)} ✓</span></div><div class="row center">${hIdx + 1 < HOW.length ? `<button type="button" class="btn" id="nextH">Next: ${esc(HOW[hIdx + 1].t)} →</button>` : ""}</div>`;
            say(perfect ? "Perfect!" : "Well done!");
            const nb = document.getElementById("nextH");
            if (nb) nb.onclick = () => howto(hIdx + 1, null, backTo);
          }
        },
      });
    }
    document.getElementById("showBtn").onclick = () => {
      hush();
      go("demo");
    };
    document.getElementById("tryBtn").onclick = () => {
      hush();
      go("try");
    };
    document.getElementById("againBtn").onclick = () => {
      hush();
      sim.stop();
      sim.setup(H.start);
      mode = "idle";
      caption(-1);
      document.getElementById("stepsBox").innerHTML = stepsHTML(H.steps, -1);
    };
    if (startMode) go(startMode);
    else autoSay(H.t + ". Press Show me.");
    top0();
  }

  /* ================= PLAY: Mini Windows (free play + missions) ================= */
  function miniWindows() {
    leave();
    backTo = openTab("play");
    app.innerHTML = `${titleBar(SIM.name)}<section class="card pop">
    <p class="hint">${W.hint ? esc(W.hint) : `A pretend computer. Click, double-click, right-click${TOUCH ? " (hold your finger)" : ""} and drag. Nothing can break!`}</p>
    <div class="simwrap"><div id="simbox"></div></div>
    <p class="turn">📱↻ Turn your phone sideways for a bigger screen.</p>
    <div class="row center"><button type="button" class="abtn" id="resetBtn">↺ Start again</button></div>
    <h3>🏅 Missions <small class="muted">Do the book's steps by yourself</small></h3>
    <div class="missions">${HOW.map((h, i) => `<button type="button" class="mission${done("h-" + h.k) ? " done" : ""}" data-h="${i}"><span class="mi-ic">${h.ic}</span><span>${esc(h.t)}</span>${done("h-" + h.k) ? "<b>✓</b>" : ""}</button>`).join("")}</div>
  </section>`;
    bindHome();
    sim = W.create(document.getElementById("simbox"), { start: {} });
    document.getElementById("resetBtn").onclick = () => sim.setup({});
    app
      .querySelectorAll("[data-h]")
      .forEach(
        (b) => (b.onclick = () => howto(+b.dataset.h, "try", miniWindows)),
      );
    autoSay(
      W.hint
        ? SIM.name + ". " + SIM.about + "."
        : "Mini Windows. Play on the pretend computer.",
    );
  }

  /* ================= runner (games and exercises) ================= */
  const S = {
    title: "",
    items: [],
    i: 0,
    score: 0,
    max: 0,
    miss: [],
    from: "",
    key: "",
  };
  function startGame(i) {
    const G = L.games[i];
    S.back = openTab("play");
    run(G.t, prep(G.items, true), "", "g-" + G.k);
  }
  function startExercise(i) {
    const X = L.exercises[i];
    S.back = openTab("ex");
    run(X.t, prep(X.items, X.k !== "handson"), X.from, "x-" + X.k);
  }
  function prep(items, mix) {
    return (mix ? shuf(items) : items.slice()).map((it) =>
      it.type === "tf"
        ? {
            ...it,
            type: "mc",
            opts: it.a
              ? it.yes || ["True", "False"]
              : it.yes
                ? [it.yes[1], it.yes[0]]
                : ["False", "True"],
            icons: it.a ? ["✅", "❌"] : ["❌", "✅"],
            two: true,
            tf: true,
          }
        : it,
    );
  }
  function run(title, items, from, key) {
    S.title = title;
    S.items = items;
    S.i = 0;
    S.score = 0;
    S.miss = [];
    S.from = from || "";
    S.key = key || "";
    S.max = items.reduce(
      (a, it) =>
        a +
        (it.type === "match"
          ? it.pairs.length
          : it.type === "wsearch"
            ? it.words.length
            : 1),
      0,
    );
    show();
  }
  function hud() {
    const pct = Math.round((S.i / Math.max(1, S.items.length)) * 100);
    return `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to the lesson">←</button><span class="qnum">${esc(S.title)} · ${S.i + 1}/${S.items.length}</span><div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress"><i style="width:${pct}%"></i></div><span class="score" aria-label="Points">${bolt}<b id="pts">${S.score}</b></span></div>`;
  }
  function show() {
    leave();
    backTo = S.back;
    top0();
    const it = S.items[S.i];

    ({
      mc: itMC,
      match: itMatch,
      order: itOrder,
      open: itOpen,
      parts: itParts,
      sim: itSim,
      place: itPlace,
      multi: itMulti,
      touch: itTouch,
      wsearch: itWsearch,
    })[it.type](it);
  }
  function next() {
    S.i++;
    if (S.i >= S.items.length) return end();
    show();
  }
  function addPts(n) {
    S.score += n;
    const p = document.getElementById("pts");
    if (p) p.textContent = S.score;
  }
  const PRAISE = [
    "Great!",
    "Super!",
    "Very good!",
    "Excellent!",
    "Well done!",
    "Yes!",
  ];
  function feedback(ok, html) {
    const box = document.getElementById("fbx");
    box.innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "🎉 " + pick(PRAISE) : "💡 The right answer"}</b>${html ? `<span>${html}</span>` : ""}</div><div class="row end"><button class="btn big" id="nextBtn" type="button">${S.i + 1 < S.items.length ? "→" : "⭐ Score"}</button></div>`;
    const nb = document.getElementById("nextBtn");
    nb.onclick = next;
    requestAnimationFrame(() => {
      nb.focus({ preventScroll: true });
      const r = nb.getBoundingClientRect();
      if (r.bottom > innerHeight)
        nb.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }
  const qHTML = (q) =>
    `<div class="q"><span class="say big">${kw(q)}</span><button type="button" class="abtn" id="sq" aria-label="Listen">🔊</button></div>`;
  const fromTag = () =>
    S.from ? `<span class="qtype">${esc(S.from)}</span>` : "";

  /* --- multiple choice (also True / False); wrong answers can be tried again --- */
  function itMC(it) {
    let tries = 0;
    const right = it.opts[0];
    const order = shuf(
      it.opts.map((t, k) => ({
        t,
        k,
        ic: it.icons && it.icons[k],
        oi: it.oi && it.oi[k],
        oh: it.oh && it.oh[k],
        sy: it.say && it.say[k],
        pi: it.pics && it.pics[k],
      })),
    );
    if (it.tf)
      order.sort(
        (a, b) =>
          (it.yes ? it.yes : ["True", "False"]).indexOf(a.t) -
          (it.yes ? it.yes : ["True", "False"]).indexOf(b.t),
      );
    const big = it.oi || it.oh || it.pics;
    const side = `${fromTag()}${hasPic(it) ? pic(it) : ""}`;
    const main = `${qHTML(it.q)}
    <div class="opts ${it.two ? "two" : ""} ${big ? "pics" : ""}">${order.map((o, j) => `<div class="optrow"><button type="button" class="opt${big ? " popt" : ""}" data-j="${j}">${o.ic ? `<span class="oic">${o.ic}</span>` : ""}${o.oi ? ic(o.oi, big ? 72 : 40) : ""}${o.oh ? visHTML(o.oh) : ""}${o.pi ? `<img class="oimg" src="${IMG(o.pi)}" alt="">` : ""}<span>${kw(o.t)}</span></button><button type="button" class="abtn sm" data-h="${j}" aria-label="Listen">🔊</button></div>`).join("")}</div>
    <div id="fbx" class="fbx"></div>`;
    app.innerHTML = `${hud()}<section class="card pop fc">${hasPic(it) ? split(side, main) : `<div class="row center">${fromTag()}</div>${main}`}</section>`;
    bindHome();
    const qs = plain(it.q);
    document.getElementById("sq").onclick = () => say(qs);
    app.querySelectorAll("[data-h]").forEach(
      (b) =>
        (b.onclick = () => {
          const o = order[+b.dataset.h];
          say(o.sy || o.t);
        }),
    );
    app.querySelectorAll(".opt").forEach(
      (b) =>
        (b.onclick = () => {
          const o = order[+b.dataset.j];
          if (o.k !== 0) {
            tries++;
            b.classList.add("wrong");
            b.disabled = true;
            say(o.sy || o.t).then(() => say("Try again!"));
            return;
          }
          b.classList.add("right");
          app.querySelectorAll(".opt").forEach((x) => {
            x.disabled = true;
            if (x !== b) x.classList.add("dim");
          });
          const full = it.q.includes("___")
            ? it.q.replace("___", "[" + right.trim() + "]")
            : it.tf
              ? it.q
              : it.q + " → [" + right.trim() + "]";
          const x = it.x ? `<br>${kw(it.x)}` : "";
          if (!tries) addPts(1);
          else
            S.miss.push({
              img: it.img,
              vis: it.vis,
              right: it.tf ? `${right}: ${it.q}` : full,
            });
          say(
            it.tf
              ? right + ". " + (it.x || "")
              : plain(full) + ". " + (it.x || ""),
          );
          feedback(true, it.tf ? `<b>${esc(right)}</b>${x}` : kw(full) + x);
        }),
    );
    autoSay(qs);
  }

  /* --- match icons and words --- */
  const PAIRC = [
    "#E8661A",
    "#14899A",
    "#3474CF",
    "#DD3B34",
    "#2C9B4F",
    "#8A4FC8",
  ];
  function itMatch(it) {
    const round = it.pairs;
    const left = shuf(round.map((p, i) => ({ i, p })));
    const right = shuf(round.map((p, i) => ({ i, label: p.label })));
    const pair = {};
    let sel = null,
      checked = false;
    app.innerHTML = `${hud()}<section class="card pop">
    <div class="row center"><span class="qtype">🔗 Match</span><span class="hint">Tap a picture, then tap its words.</span></div>
    <div class="match n${round.length}"><div class="mcol pics" id="colL"></div><div class="mcol" id="colR"></div></div>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn" id="checkBtn" type="button" disabled>✔ Check</button></div></div></section>`;
    bindHome();
    const colL = document.getElementById("colL"),
      colR = document.getElementById("colR");
    function draw() {
      colL.innerHTML = left
        .map((l, k) => {
          const has = pair[l.i] !== undefined;
          const ok = checked && pair[l.i] === l.i;
          const cls = checked ? (ok ? "ok" : "no") : sel === l.i ? "sel" : "";
          return `<button type="button" class="mi ${cls}" data-l="${l.i}" ${checked ? "disabled" : ""} aria-label="Picture ${k + 1}">${l.p.icon ? `<span class="mpic vis">${ic(l.p.icon, 70)}</span>` : pic(l.p, "pic mpic")}${has ? `<span class="tag" style="background:${PAIRC[k % 6]}">${k + 1}</span>` : ""}${checked && !ok ? `<span class="fix">${esc(l.p.label)}</span>` : ""}</button>`;
        })
        .join("");
      colR.innerHTML = right
        .map((r) => {
          const li = Object.keys(pair).find((x) => pair[x] === r.i);
          const lk = li !== undefined ? left.findIndex((x) => x.i === +li) : -1;
          const cls =
            checked && li !== undefined ? (+li === r.i ? "ok" : "no") : "";
          return `<button type="button" class="mi word ${cls}" data-r="${r.i}" ${checked ? "disabled" : ""}><span class="tx">${esc(r.label)}</span>${lk >= 0 ? `<span class="tag" style="background:${PAIRC[lk % 6]}">${lk + 1}</span>` : ""}</button>`;
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
            draw();
          }),
      );
      colR.querySelectorAll("[data-r]").forEach(
        (b) =>
          (b.onclick = () => {
            const ri = +b.dataset.r;
            const owner = Object.keys(pair).find((x) => pair[x] === ri);
            say(round[ri].label);
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
      if (cb) cb.disabled = Object.keys(pair).length < round.length;
    }
    draw();
    autoSay("Match the pictures and the words.");
    document.getElementById("checkBtn").onclick = () => {
      checked = true;
      let got = 0;
      round.forEach((p, i) => {
        if (pair[i] === i) got++;
        else S.miss.push({ icon: p.icon, right: p.label });
      });
      addPts(got);
      draw();
      feedback(
        got === round.length,
        got === round.length
          ? "All right!"
          : `${got} / ${round.length}. The right words are under the red pictures.`,
      );
    };
  }

  /* --- put step cards in order (tap or drag) --- */
  function tiles(Lel, Bel, st, onChange) {
    function move(from, k, to, idx) {
      const src = st[from];
      const [w] = src.splice(k, 1);
      const dst = st[to];
      if (idx != null && from === to && idx > k) idx--;
      if (idx == null || idx > dst.length) idx = dst.length;
      dst.splice(idx, 0, w);
      draw();
    }
    function insertIndex(x, y) {
      let idx = 0;
      for (const t of Lel.querySelectorAll(".tile")) {
        const r = t.getBoundingClientRect();
        if (y < r.top - 4) break;
        if (y <= r.bottom + 4 && y < r.top + r.height / 2 + 4) break;
        idx++;
      }
      return idx;
    }
    function bindTile(el) {
      el.onpointerdown = (e) => {
        if (st.done) return;
        e.preventDefault();
        const from = el.dataset.from,
          k = +el.dataset.k,
          sx = e.clientX,
          sy = e.clientY;
        let ghost = null;
        const r = el.getBoundingClientRect();
        const ox = sx - r.left,
          oy = sy - r.top;
        try {
          el.setPointerCapture(e.pointerId);
        } catch (_) {}
        const inLine = (ev) => {
          const lr = Lel.getBoundingClientRect();
          return (
            ev.clientX >= lr.left &&
            ev.clientX <= lr.right &&
            ev.clientY >= lr.top - 14 &&
            ev.clientY <= lr.bottom + 14
          );
        };
        const mv = (ev) => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
            ghost = el.cloneNode(true);
            ghost.classList.add("drag");
            ghost.removeAttribute("id");
            ghost.style.width = r.width + "px";
            document.body.appendChild(ghost);
            el.classList.add("ghost");
          }
          if (ghost) {
            ghost.style.left = ev.clientX - ox + "px";
            ghost.style.top = ev.clientY - oy + "px";
            Lel.classList.toggle("over", inLine(ev));
          }
        };
        const up = (ev) => {
          el.removeEventListener("pointermove", mv);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", up);
          Lel.classList.remove("over");
          if (!ghost) {
            const t = st[from][k];
            if (from === "bank") {
              move("bank", k, "line", null);
              say(t.say);
            } else move("line", k, "bank", null);
            return;
          }
          ghost.remove();
          el.classList.remove("ghost");
          if (inLine(ev))
            move(from, k, "line", insertIndex(ev.clientX, ev.clientY));
          else if (from === "line") move("line", k, "bank", null);
          else draw();
        };
        el.addEventListener("pointermove", mv);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", up);
      };
      el.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const from = el.dataset.from,
            k = +el.dataset.k;
          from === "bank"
            ? move("bank", k, "line", null)
            : move("line", k, "bank", null);
        }
      };
    }
    function draw() {
      Lel.innerHTML = st.line.length
        ? st.line
            .map(
              (w, k) =>
                `<button type="button" class="tile stp${st.done ? (st.same(w.k, k) ? " ok" : " no") : ""}" data-from="line" data-k="${k}" ${st.done ? "disabled" : ""}><span class="sn">${k + 1}</span>${w.html}</button>`,
            )
            .join("")
        : `<span class="ph">Put the steps here: 1, 2, 3 …</span>`;
      Bel.innerHTML = st.bank
        .map(
          (w, k) =>
            `<button type="button" class="tile stp" data-from="bank" data-k="${k}">${w.html}</button>`,
        )
        .join("");
      if (!st.done)
        [
          ...Lel.querySelectorAll(".tile"),
          ...Bel.querySelectorAll(".tile"),
        ].forEach(bindTile);
      onChange && onChange();
    }
    st.hint = () => {
      let k = 0;
      while (k < st.line.length && st.same(st.line[k].k, k)) k++;
      while (st.line.length > k) st.bank.push(st.line.pop());
      const j = st.bank.findIndex((w) => st.same(w.k, k));
      if (j >= 0) {
        const [w] = st.bank.splice(j, 1);
        st.line.push(w);
        say(w.say);
      }
      draw();
    };
    st.draw = draw;
    draw();
    return st;
  }
  // one step card: the mouse action (Mini Windows steps) or a book picture, then the words
  const stepHTML = (s) =>
    `${s.act ? actPill(s.act) : ""}${s.img ? `<img class="simg" src="${IMG(s.img)}" alt="">` : ""}${s.e ? `<span class="se">${esc(s.e)}</span>` : ""}<span>${kw(s.say)}</span>`;
  function itOrder(it) {
    const H = it.howto ? HOW.find((h) => h.k === it.howto) : it;
    const steps = H.steps.filter((s) => s.act !== "look");
    let tries = 0;
    const cards = steps.map((s, k) => ({
      k,
      say: s.say,
      html: stepHTML(s),
    }));
    let bank = shuf(cards);
    for (let n = 0; n < 8 && bank.every((c, k) => c.k === k); n++)
      bank = shuf(cards);
    app.innerHTML = `${hud()}<section class="card pop">
    <div class="q"><span class="say big">🔢 ${kw(H.t)}</span><button type="button" class="abtn" id="sq" aria-label="Listen">🔊</button></div>
    <p class="hint">${esc(H.hint || "Tap the steps in order, or drag them.")}</p>
    <div class="slots steps-line" id="line"></div>
    <div class="bank steps-bank" id="bank"></div>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn ghost" id="hintBtn" type="button">💡 Help</button><button class="btn" id="checkBtn" type="button" disabled>✔ Check</button></div></div></section>`;
    bindHome();
    const ask = H.ask || "Put the steps in order. " + plain(H.t);
    document.getElementById("sq").onclick = () => say(ask);
    // two steps with the same words (e.g. "Click Change." twice) can swap places
    const st = {
      line: [],
      bank,
      done: false,
      same: (a, b) => a === b || cards[a].say === cards[b].say,
    };
    tiles(
      document.getElementById("line"),
      document.getElementById("bank"),
      st,
      () => {
        const cb = document.getElementById("checkBtn");
        if (cb) cb.disabled = st.bank.length > 0;
      },
    );
    document.getElementById("hintBtn").onclick = () => {
      tries++;
      st.hint();
    };
    const check = () => {
      const ok = st.line.every((w, k) => st.same(w.k, k));
      if (!ok && tries < 1) {
        tries++;
        st.done = true;
        st.draw();
        say("Try again!");
        document.getElementById("fbx").innerHTML =
          `<div class="fb no"><b>Almost! Try again.</b><span>The red steps are in the wrong place.</span></div><div class="row center"><button class="btn" id="againBtn" type="button">↺ Again</button></div>`;
        document.getElementById("againBtn").onclick = () => {
          let k = 0;
          while (k < st.line.length && st.same(st.line[k].k, k)) k++;
          while (st.line.length > k) st.bank.push(st.line.pop());
          st.done = false;
          document.getElementById("fbx").innerHTML =
            `<div class="row center"><button class="btn ghost" id="hintBtn" type="button">💡 Help</button><button class="btn" id="checkBtn" type="button" disabled>✔ Check</button></div>`;
          document.getElementById("hintBtn").onclick = () => {
            tries++;
            st.hint();
          };
          document.getElementById("checkBtn").onclick = check;
          st.draw();
        };
        return;
      }
      st.done = true;
      st.draw();
      if (ok && !tries) addPts(1);
      else
        S.miss.push({
          emoji: "🔢",
          right:
            H.t +
            ": " +
            steps.map((s, k) => k + 1 + ". " + plain(s.say)).join("  "),
        });
      feedback(
        ok,
        `<ol class="steps mini">${steps.map((s) => `<li>${stepHTML(s)}</li>`).join("")}</ol>`,
      );
      say(ok ? "Great!" : "Look at the right order.");
    };
    document.getElementById("checkBtn").onclick = check;
    autoSay(ask);
  }

  /* --- name . extension: tap the right part --- */
  function itParts(it) {
    const i = it.file.lastIndexOf(".");
    const parts = [
      { k: "name", t: it.file.slice(0, i) },
      { k: "dot", t: "." },
      { k: "ext", t: it.file.slice(i + 1) },
    ];
    const ask = {
      name: "the [name]",
      dot: "the [dot]",
      ext: "the [extension]",
    }[it.ask];
    let tries = 0;
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${qHTML("Tap " + ask + ".")}
    <div class="parts-file">${ic(it.icon, 110)}<div class="parts">${parts.map((p, k) => `<button type="button" class="part p-${p.k}" data-p="${k}">${esc(p.t)}</button>`).join("")}</div></div>
    <div id="fbx" class="fbx"></div></section>`;
    bindHome();
    document.getElementById("sq").onclick = () => say("Tap " + plain(ask));
    app.querySelectorAll("[data-p]").forEach(
      (b) =>
        (b.onclick = () => {
          const p = parts[+b.dataset.p];
          if (p.k !== it.ask) {
            tries++;
            b.classList.add("wrong");
            say(
              p.k === "dot"
                ? "This is the dot."
                : "This is the " +
                    (p.k === "ext" ? "extension" : "name") +
                    ". Try again!",
            );
            return;
          }
          b.classList.add("right");
          app.querySelectorAll("[data-p]").forEach((x) => (x.disabled = true));
          app.querySelector(".parts").classList.add("shown");
          if (!tries) addPts(1);
          else
            S.miss.push({
              icon: it.icon,
              right: `${it.file}: ${p.t} = ${it.ask === "ext" ? "extension" : it.ask}`,
            });
          feedback(
            true,
            `<span class="ne-ans"><b class="p-name">${esc(parts[0].t)}</b> = name · <b class="p-dot">.</b> = dot · <b class="p-ext">${esc(parts[2].t)}</b> = extension</span>`,
          );
          say(
            it.ask === "dot"
              ? "Yes, the dot."
              : `Yes! ${p.t} is the ${it.ask === "ext" ? "extension" : "name"}.`,
          );
        }),
    );
    autoSay("Tap " + plain(ask));
  }

  /* --- open question: answer out loud or in the notebook, then look at the model answer --- */
  function itOpen(it) {
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${(hasPic(it) ? split : (x, y) => `<div class="row center">${x}</div>${y}`)(
      `${fromTag()}${hasPic(it) ? pic(it) : ""}`,
      `${qHTML(it.q)}
    <p class="hint">Say your answer, or write it in your notebook.</p>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn" id="showBtn" type="button">💡 Show the answer</button></div></div>`,
    )}</section>`;
    bindHome();
    document.getElementById("sq").onclick = () => say(it.q);
    document.getElementById("showBtn").onclick = () => {
      document.getElementById("fbx").innerHTML =
        `<div class="fb ok"><b>💡 A good answer</b><span>${kw(it.a)}</span></div><p class="hint">Was your answer like this?</p><div class="yn"><button type="button" class="opt big" id="yes">👍 Yes</button><button type="button" class="opt big" id="no">🤔 Not yet</button></div>`;
      say(it.a);
      document.getElementById("yes").onclick = () => {
        addPts(1);
        next();
      };
      document.getElementById("no").onclick = () => {
        S.miss.push({ img: it.img, vis: it.vis, right: it.q + " → " + it.a });
        next();
      };
    };
    autoSay(it.q);
  }

  /* --- do it in Mini Windows --- */
  function itSim(it) {
    let cur = 0;
    app.innerHTML = `${hud()}<section class="card pop">
    ${it.q ? `<div class="q"><span class="say big">${kw(it.q)}</span></div>` : ""}
    <div class="cap" id="cap"></div>
    <div class="simwrap"><div id="simbox"></div></div>
    <p class="turn">📱↻ Turn your phone sideways for a bigger screen.</p>
    <div class="row center"><button type="button" class="btn ghost" id="helpBtn">💡 Help</button></div>
    ${it.steps.length > 1 ? `<div id="stepsBox">${stepsHTML(it.steps, 0)}</div>` : ""}
    <div id="fbx" class="fbx"></div></section>`;
    bindHome();
    sim = W.create(document.getElementById("simbox"), { start: it.start });
    const cap = document.getElementById("cap");
    const caption = (k, extra) => {
      const s = it.steps[k];
      if (!s) return;
      cap.innerHTML = `<div class="capt">${it.steps.length > 1 ? `<span class="sno">${k + 1}/${it.steps.length}</span>` : ""}${actPill(s.act)}<span class="sbig">${kw(s.say)}</span><button type="button" class="abtn" id="capSay" aria-label="Listen">🔊</button></div>${extra || ""}${s.act === "type" ? `<div class="row center"><button type="button" class="btn ghost typebtn" id="typeBtn">⌨️ ${esc(s.text)}</button></div>` : ""}${s.act === "key" ? `<div class="row center"><button type="button" class="btn ghost keybtn" id="keyBtn">${esc(keyName(s.key))}</button></div>` : ""}`;
      document.getElementById("capSay").onclick = () => say(s.say);
      const tb = document.getElementById("typeBtn");
      if (tb) tb.onclick = () => sim.typeFor();
      const kb = document.getElementById("keyBtn");
      if (kb) kb.onclick = () => sim.pressKey(s.key);
      const sb = document.getElementById("stepsBox");
      if (sb) sb.innerHTML = stepsHTML(it.steps, k);
    };
    document.getElementById("helpBtn").onclick = () => {
      sim.showHelp();
      const s = it.steps[cur];
      if (s) say(s.say);
    };
    sim.run(it.steps, {
      mode: "try",
      helpAfter: it.steps.length > 1 ? 7000 : 9000,
      onStep: (k, s) => {
        cur = k;
        caption(k);
        return say(s.say);
      },
      onWrong: (s, why) => {
        const msg =
          why === "kind"
            ? s.act === "right"
              ? TOUCH
                ? "Hold your finger on it."
                : "Use the right mouse button."
              : s.act === "dbl"
                ? "Click two times, fast."
                : "Try again."
            : "Not there. Try again!";
        caption(cur, `<div class="fb no"><b>💡 ${esc(msg)}</b></div>`);
        say(msg);
      },
      onDone: (m) => {
        document.getElementById("helpBtn").remove();
        const sb = document.getElementById("stepsBox");
        if (sb) sb.innerHTML = stepsHTML(it.steps, it.steps.length);
        if (!m.wrongs) addPts(1);
        else
          S.miss.push({
            emoji: SIM.ic,
            right: it.steps
              .filter((s) => s.act !== "look")
              .map((s) => plain(s.say))
              .join(" → "),
          });
        cap.innerHTML = "";
        feedback(
          !m.wrongs,
          m.wrongs
            ? "You did it with help. Next time by yourself!"
            : "You did it by yourself!",
        );
      },
    });
  }

  /* --- put the thing in the right place: drag it there, or tap the place --- */
  function itPlace(it) {
    let tries = 0,
      busy = false;
    const T = it.thing || {};
    const spots = shuf(it.spots.map((s, k) => ({ ...s, k })));
    app.innerHTML = `${hud()}<section class="card pop fc">
    <div class="row center">${fromTag()}</div>
    ${qHTML(it.q)}
    <div class="place">
      <button type="button" class="thing" id="thing" aria-label="${esc(plain(T.label || "Drag me"))}">${pic(T, "pic tpic")}${T.label ? `<span>${kw(T.label)}</span>` : ""}</button>
      <p class="hint">✋ Drag it to the right place, or tap the place.</p>
      <div class="spots n${spots.length}">${spots.map((s, j) => `<button type="button" class="spot" data-j="${j}">${hasPic(s) ? pic(s, "pic spic") : ""}<b>${kw(s.t)}</b></button>`).join("")}</div>
    </div>
    <div id="fbx" class="fbx"></div></section>`;
    bindHome();
    document.getElementById("sq").onclick = () => say(plain(it.q));
    const th = document.getElementById("thing");
    const choose = (j) => {
      if (busy) return;
      const s = spots[j];
      const b = app.querySelector(`.spot[data-j="${j}"]`);
      if (s.k !== 0) {
        tries++;
        b.classList.remove("wrong");
        void b.offsetWidth;
        b.classList.add("wrong");
        say(plain(s.t)).then(() => say(s.no || "Try again!"));
        return;
      }
      busy = true;
      b.classList.remove("wrong");
      b.classList.add("right");
      b.insertAdjacentHTML(
        "beforeend",
        `<span class="in-spot">${pic(T, "pic ipic")}</span>`,
      );
      th.classList.add("placed");
      app.querySelectorAll(".spot").forEach((x) => {
        x.disabled = true;
        if (x !== b) x.classList.add("dim");
      });
      const ans = (T.label ? T.label + " → " : "") + "[" + plain(s.t) + "]";
      if (!tries) addPts(1);
      else S.miss.push({ img: T.img, emoji: T.emoji, right: ans });
      say(plain(ans) + ". " + plain(it.x || ""));
      feedback(true, kw(ans) + (it.x ? `<br>${kw(it.x)}` : ""));
    };
    app
      .querySelectorAll(".spot")
      .forEach((b) => (b.onclick = () => choose(+b.dataset.j)));
    th.onpointerdown = (e) => {
      if (busy) return;
      e.preventDefault();
      const r = th.getBoundingClientRect();
      const sx = e.clientX,
        sy = e.clientY;
      let ghost = null;
      try {
        th.setPointerCapture(e.pointerId);
      } catch (_) {}
      const over = (ev) =>
        [...app.querySelectorAll(".spot")].find((b) => {
          const q = b.getBoundingClientRect();
          return (
            ev.clientX >= q.left &&
            ev.clientX <= q.right &&
            ev.clientY >= q.top &&
            ev.clientY <= q.bottom
          );
        });
      const mv = (ev) => {
        if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
          ghost = th.cloneNode(true);
          ghost.removeAttribute("id");
          ghost.classList.add("drag");
          ghost.style.width = r.width + "px";
          document.body.appendChild(ghost);
          th.classList.add("ghost");
        }
        if (ghost) {
          ghost.style.left = ev.clientX - r.width / 2 + "px";
          ghost.style.top = ev.clientY - r.height / 2 + "px";
          const o = over(ev);
          app
            .querySelectorAll(".spot")
            .forEach((b) => b.classList.toggle("over", b === o));
        }
      };
      const up = (ev) => {
        th.removeEventListener("pointermove", mv);
        th.removeEventListener("pointerup", up);
        th.removeEventListener("pointercancel", up);
        app
          .querySelectorAll(".spot")
          .forEach((b) => b.classList.remove("over"));
        if (!ghost) {
          say(plain(T.label || it.q));
          return;
        }
        ghost.remove();
        th.classList.remove("ghost");
        const o = over(ev);
        if (o) choose(+o.dataset.j);
      };
      th.addEventListener("pointermove", mv);
      th.addEventListener("pointerup", up);
      th.addEventListener("pointercancel", up);
    };
    autoSay(plain(it.q));
  }

  /* --- choose all the right ones --- */
  function itMulti(it) {
    let tries = 0;
    const sel = new Set();
    const opts = shuf(it.opts.map((o, k) => ({ ...o, k })));
    const pics = opts.some(hasPic);
    app.innerHTML = `${hud()}<section class="card pop fc">
    <div class="row center">${fromTag()}</div>
    ${qHTML(it.q)}
    <p class="hint">Tap <b>all</b> the right ones. Then press ✔ Check.</p>
    <div class="multi${pics ? " pics" : ""}">${opts.map((o, j) => `<button type="button" class="mopt" data-j="${j}" aria-pressed="false">${hasPic(o) ? pic(o, "pic mpc") : ""}<span>${kw(o.t)}</span><i class="mk" aria-hidden="true"></i></button>`).join("")}</div>
    <div id="fbx" class="fbx"><div id="tryMsg"></div><div class="row center"><button class="btn" id="checkBtn" type="button" disabled>✔ Check</button></div></div></section>`;
    bindHome();
    document.getElementById("sq").onclick = () => say(plain(it.q));
    const btns = [...app.querySelectorAll(".mopt")];
    btns.forEach(
      (b) =>
        (b.onclick = () => {
          const j = +b.dataset.j;
          if (sel.has(j)) sel.delete(j);
          else {
            sel.add(j);
            say(plain(opts[j].t));
          }
          b.setAttribute("aria-pressed", sel.has(j));
          b.classList.remove("no");
          document.getElementById("checkBtn").disabled = !sel.size;
        }),
    );
    const right = opts.filter((o) => o.ok).map((o) => plain(o.t));
    document.getElementById("checkBtn").onclick = () => {
      const ok = opts.every((o, j) => !!o.ok === sel.has(j));
      if (!ok && tries < 1) {
        tries++;
        let bad = 0;
        btns.forEach((b, j) => {
          if (sel.has(j) && !opts[j].ok) {
            b.classList.add("no");
            bad++;
          }
        });
        const msg = bad
          ? "Almost! The red ones are not right."
          : "Almost! Find one more.";
        document.getElementById("tryMsg").innerHTML =
          `<div class="fb no"><b>${msg}</b></div>`;
        say(msg + " Try again!");
        return;
      }
      btns.forEach((b, j) => {
        b.disabled = true;
        b.classList.remove("no");
        if (opts[j].ok) b.classList.add("ok");
        else if (sel.has(j)) b.classList.add("no");
        else b.classList.add("dim");
      });
      if (ok && !tries) addPts(1);
      else
        S.miss.push({
          emoji: "✅",
          right: plain(it.q) + " → " + right.join(", "),
        });
      say(ok ? "" : "The right ones are: " + right.join(", "));
      feedback(
        ok,
        (ok ? "" : esc(right.join(" · "))) + (it.x ? `<br>${kw(it.x)}` : ""),
      );
    };
    autoSay(plain(it.q));
  }

  /* --- touch practice on a pretend tablet: tap, swipe, pinch, draw with a stylus --- */
  function itTouch(it) {
    const g = it.g;
    let fin = false;
    const HINT = {
      tap: "Tap the star with one finger.",
      swipe: "Put your finger on the picture and slide it to the left.",
      pinch: TOUCH
        ? "Put two fingers on the picture and move them apart."
        : "Put two fingers on the touchpad and move them apart, or press ＋.",
      draw: "Follow the dotted line with your finger, like a stylus.",
    }[g];
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${qHTML(it.q)}
    <div class="tablet t-${g}"><div class="tscreen" id="ts"></div></div>
    <p class="hint" id="thint">👆 ${esc(HINT)}</p>
    <div class="tdots" id="tdots"></div>
    <div id="fbx" class="fbx"></div></section>`;
    bindHome();
    document.getElementById("sq").onclick = () => say(plain(it.q));
    const ts = document.getElementById("ts");
    const dots = (n, k) =>
      (document.getElementById("tdots").innerHTML = Array.from(
        { length: n },
        (_, i) => `<i class="${i < k ? "on" : ""}"></i>`,
      ).join(""));
    const finish = () => {
      if (fin) return;
      fin = true;
      addPts(1);
      say("Great! " + plain(it.x || ""));
      feedback(true, kw(it.x || "You did it!"));
    };
    if (g === "tap") {
      let n = 0;
      const put = () => {
        ts.innerHTML = `<button type="button" class="tstar" id="tstar" aria-label="Star" style="left:${10 + Math.random() * 70}%;top:${12 + Math.random() * 60}%">⭐</button>`;
        document.getElementById("tstar").onclick = () => {
          n++;
          dots(3, n);
          if (n >= 3) {
            ts.innerHTML = '<div class="tbig">🎉</div>';
            finish();
          } else {
            say(["One!", "Two!"][n - 1]);
            put();
          }
        };
      };
      dots(3, 0);
      put();
    } else if (g === "swipe") {
      const P = it.pics;
      let k = 0;
      ts.innerHTML = `<div class="tstrip" id="tstrip">${P.map((p) => `<div class="tpg"><img src="${IMG(p)}" alt="" draggable="false"></div>`).join("")}</div>`;
      const strip = document.getElementById("tstrip");
      const go = (d) => {
        k = Math.max(0, Math.min(P.length - 1, k + d));
        strip.style.transform = `translateX(${-k * 100}%)`;
        dots(P.length, k + 1);
        if (k === P.length - 1) finish();
      };
      dots(P.length, 1);
      let x0 = null;
      ts.onpointerdown = (e) => {
        x0 = e.clientX;
        try {
          ts.setPointerCapture(e.pointerId);
        } catch (_) {}
      };
      ts.onpointerup = (e) => {
        if (x0 === null) return;
        const dx = e.clientX - x0;
        x0 = null;
        if (dx < -40) go(1);
        else if (dx > 40) go(-1);
      };
      ts.onpointercancel = () => (x0 = null);
    } else if (g === "pinch") {
      let sc = 1;
      ts.innerHTML = `<img class="tzoom" id="tz" src="${IMG(it.img)}" alt="" draggable="false">${TOUCH ? "" : `<div class="tzb"><button type="button" class="abtn" id="zOut" aria-label="Zoom out">－</button><button type="button" class="abtn" id="zIn" aria-label="Zoom in">＋</button></div>`}`;
      const img = document.getElementById("tz");
      const setSc = (v) => {
        sc = Math.max(1, Math.min(3, v));
        img.style.transform = `scale(${sc})`;
        dots(1, sc >= 1.8 ? 1 : 0);
        if (sc >= 1.8) finish();
      };
      dots(1, 0);
      const pts = new Map();
      let d0 = 0,
        s0 = 1;
      const dist = () => {
        const [a, b] = [...pts.values()];
        return Math.hypot(a.x - b.x, a.y - b.y);
      };
      ts.onpointerdown = (e) => {
        if (e.target.closest("button")) return; // the ＋ / － buttons
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        try {
          ts.setPointerCapture(e.pointerId);
        } catch (_) {}
        if (pts.size === 2) {
          d0 = dist();
          s0 = sc;
        }
      };
      ts.onpointermove = (e) => {
        if (!pts.has(e.pointerId)) return;
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 2 && d0 > 0) setSc((s0 * dist()) / d0);
      };
      const lift = (e) => {
        pts.delete(e.pointerId);
        d0 = 0;
      };
      ts.onpointerup = lift;
      ts.onpointercancel = lift;
      // a laptop touchpad pinch arrives as ctrl + wheel
      ts.addEventListener(
        "wheel",
        (e) => {
          if (!e.ctrlKey) return;
          e.preventDefault();
          setSc(sc * (e.deltaY < 0 ? 1.08 : 0.93));
        },
        { passive: false },
      );
      const zi = document.getElementById("zIn");
      if (zi) {
        zi.onclick = () => setSc(sc + 0.4);
        document.getElementById("zOut").onclick = () => setSc(sc - 0.4);
      }
    } else if (g === "draw") {
      // a wavy line with 9 check points; draw over all of them
      const CP = Array.from({ length: 9 }, (_, i) => ({
        x: 40 + i * 40,
        y: 110 + Math.sin(i * 0.9) * 55,
      }));
      const path = "M" + CP.map((p) => `${p.x} ${p.y}`).join(" L");
      ts.innerHTML = `<svg viewBox="0 0 400 220" class="tdraw" id="tsvg"><path d="${path}" class="guide"/>${CP.map((p, i) => `<circle cx="${p.x}" cy="${p.y}" r="9" class="cp" data-i="${i}"/>`).join("")}<polyline class="ink" id="tink" points=""/></svg>`;
      const svg = document.getElementById("tsvg");
      const ink = document.getElementById("tink");
      const hit = new Set();
      let pts = [],
        down = false;
      dots(CP.length, 0);
      const at = (e) => {
        const r = svg.getBoundingClientRect();
        return {
          x: ((e.clientX - r.left) / r.width) * 400,
          y: ((e.clientY - r.top) / r.height) * 220,
        };
      };
      const add = (e) => {
        const p = at(e);
        pts.push(Math.round(p.x) + "," + Math.round(p.y));
        ink.setAttribute("points", pts.join(" "));
        CP.forEach((c, i) => {
          if (!hit.has(i) && Math.hypot(c.x - p.x, c.y - p.y) < 22) {
            hit.add(i);
            svg.querySelector(`[data-i="${i}"]`).classList.add("on");
          }
        });
        dots(CP.length, hit.size);
        if (hit.size === CP.length) finish();
      };
      svg.onpointerdown = (e) => {
        down = true;
        try {
          svg.setPointerCapture(e.pointerId);
        } catch (_) {}
        add(e);
      };
      svg.onpointermove = (e) => {
        if (down) add(e);
      };
      svg.onpointerup = () => (down = false);
      svg.onpointercancel = () => (down = false);
    }
    autoSay(plain(it.q) + " " + HINT);
  }

  /* --- word search: tap the first letter, then the last letter (or drag) --- */
  function wsGrid(words, n) {
    const dirs = [
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    for (let t0 = 0; t0 < 200; t0++) {
      const g = Array.from({ length: n }, () => Array(n).fill(""));
      let ok = true;
      for (const w of words.slice().sort((a, b) => b.length - a.length)) {
        let put = false;
        for (let t = 0; t < 300 && !put; t++) {
          const [dr, dc] = pick(dirs);
          const r0 = Math.floor(Math.random() * (n - dr * (w.length - 1)));
          const c0 = Math.floor(Math.random() * (n - dc * (w.length - 1)));
          let fits = true;
          for (let i = 0; i < w.length && fits; i++) {
            const ch = g[r0 + dr * i][c0 + dc * i];
            if (ch && ch !== w[i]) fits = false;
          }
          if (!fits) continue;
          for (let i = 0; i < w.length; i++) g[r0 + dr * i][c0 + dc * i] = w[i];
          put = true;
        }
        if (!put) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      const AB = "ABCDEFGHIJKLMNOPRSTUVWY";
      return g.map((row) => row.map((ch) => ch || pick(AB.split(""))));
    }
  }
  function itWsearch(it) {
    const n = it.size || 10;
    const W8 = it.words.map((t) => ({
      t,
      w: t.toUpperCase().replace(/[^A-Z0-9]/g, ""),
      found: false,
      help: false,
    }));
    const g = wsGrid(
      W8.map((x) => x.w),
      n,
    );
    let start = null,
      fin = false;
    app.innerHTML = `${hud()}<section class="card pop fc">
    <div class="row center">${fromTag()}</div>
    ${qHTML(it.q)}
    <p class="hint">Tap the <b>first</b> letter, then the <b>last</b> letter. Words go → across, ↓ down or ↘ on a slant.</p>
    <div class="ws-wrap"><div class="ws" id="ws" style="--n:${n}">${g.map((row, r) => row.map((ch, c) => `<span class="wc" data-r="${r}" data-c="${c}">${ch}</span>`).join("")).join("")}</div>
    <ul class="ws-list" id="wsl"></ul></div>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn ghost" id="helpBtn" type="button">💡 Help</button></div></div></section>`;
    bindHome();
    document.getElementById("sq").onclick = () => say(plain(it.q));
    const grid = document.getElementById("ws");
    const cell = (r, c) => grid.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    const list = () =>
      (document.getElementById("wsl").innerHTML = W8.map(
        (x) =>
          `<li class="${x.found ? "ok" : ""}">${x.found ? "✓ " : ""}${esc(x.t)}</li>`,
      ).join(""));
    list();
    const line = (a, b) => {
      const dr = Math.sign(b.r - a.r),
        dc = Math.sign(b.c - a.c);
      const len = Math.max(Math.abs(b.r - a.r), Math.abs(b.c - a.c)) + 1;
      if (
        (b.r - a.r &&
          b.c - a.c &&
          Math.abs(b.r - a.r) !== Math.abs(b.c - a.c)) ||
        len < 2
      )
        return null;
      return Array.from({ length: len }, (_, i) => ({
        r: a.r + dr * i,
        c: a.c + dc * i,
      }));
    };
    const clearSel = () =>
      grid.querySelectorAll(".sel").forEach((x) => x.classList.remove("sel"));
    const tryLine = (a, b) => {
      clearSel();
      const cs = line(a, b);
      if (!cs) {
        say("Try again!");
        return;
      }
      const s = cs.map((p) => g[p.r][p.c]).join("");
      const x = W8.find(
        (x) => !x.found && (x.w === s || x.w === [...s].reverse().join("")),
      );
      if (!x) {
        cs.forEach((p) => {
          const el = cell(p.r, p.c);
          el.classList.add("bad");
          setTimeout(() => el.classList.remove("bad"), 450);
        });
        say("Not a word. Try again!");
        return;
      }
      x.found = true;
      cs.forEach((p) => cell(p.r, p.c).classList.add("found"));
      if (!x.help) addPts(1);
      else S.miss.push({ emoji: "🔎", right: x.t });
      list();
      say(x.t);
      if (W8.every((y) => y.found) && !fin) {
        fin = true;
        feedback(true, `All ${W8.length} words found!`);
      }
    };
    const at = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      return el && el.classList.contains("wc") && grid.contains(el)
        ? { r: +el.dataset.r, c: +el.dataset.c }
        : null;
    };
    let downAt = null;
    grid.onpointerdown = (e) => {
      if (fin) return;
      e.preventDefault();
      const p = at(e);
      if (!p) return;
      try {
        grid.releasePointerCapture(e.pointerId);
      } catch (_) {}
      if (start && (start.r !== p.r || start.c !== p.c)) {
        const s = start;
        start = null;
        downAt = null;
        tryLine(s, p);
        return;
      }
      start = p;
      downAt = p;
      clearSel();
      cell(p.r, p.c).classList.add("sel");
    };
    grid.onpointermove = (e) => {
      if (!downAt || !start) return;
      const p = at(e);
      if (!p) return;
      const cs = line(start, p);
      clearSel();
      (cs || [start]).forEach((q) => cell(q.r, q.c).classList.add("sel"));
    };
    grid.onpointerup = (e) => {
      if (!downAt) return;
      const p = at(e);
      downAt = null;
      if (p && start && (p.r !== start.r || p.c !== start.c)) {
        const s = start;
        start = null;
        tryLine(s, p);
      }
    };
    document.getElementById("helpBtn").onclick = () => {
      const x = W8.find((y) => !y.found);
      if (!x) return;
      x.help = true;
      for (let r = 0; r < n; r++)
        for (let c = 0; c < n; c++)
          for (const [dr, dc] of [
            [0, 1],
            [1, 0],
            [1, 1],
          ]) {
            const cs = line(
              { r, c },
              { r: r + dr * (x.w.length - 1), c: c + dc * (x.w.length - 1) },
            );
            if (
              cs &&
              cs.every((p) => p.r < n && p.c < n) &&
              cs.map((p) => g[p.r][p.c]).join("") === x.w
            ) {
              const el = cell(r, c);
              el.classList.add("hint");
              setTimeout(() => el.classList.remove("hint"), 2500);
              say("Look for " + x.t + ". It starts here.");
              return;
            }
          }
    };
    autoSay(plain(it.q));
  }

  /* ================= END ================= */
  function star(on) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill="${on ? "var(--hl)" : "var(--card)"}" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  function end() {
    leave();
    const pct = Math.round((S.score / Math.max(1, S.max)) * 100);
    const st = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const msg =
      pct === 100
        ? "Perfect!"
        : pct >= 90
          ? "Excellent!"
          : pct >= 70
            ? "Very good!"
            : "Good work, keep going!";
    if (S.key && pct >= 70) setDone(S.key);
    app.innerHTML = `<section class="card pop">
    <span class="eyebrow">${esc(S.title)}</span>
    <div class="big-score">${S.score}<small> / ${S.max}</small></div>
    <div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div>
    <h2>${msg}</h2>
    <div class="row"><button class="btn big" id="againBtn" type="button">↺ Again</button><button class="btn ghost" id="menuBtn" type="button">← Lesson</button></div>
  </section>
  ${S.miss.length ? `<section class="card"><h3>Let's look again <small class="muted">(${S.miss.length})</small></h3><ul class="review">${S.miss.map((m) => `<li>${hasPic(m) ? pic(m, "pic rv" + (m.vis || m.icon ? " vis" : "")) : ""}<div>${kw(m.right)}</div></li>`).join("")}</ul></section>` : ""}`;
    say(msg);
    document.getElementById("againBtn").onclick = () => {
      S.i = 0;
      S.score = 0;
      S.miss = [];
      S.items = S.items.map((x) =>
        x.type === "mc" || x.type === "parts" ? x : x,
      );
      show();
    };
    document.getElementById("menuBtn").onclick = S.back || home;
    top0();
  }

  home();
})();
