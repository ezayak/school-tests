// French lessons engine (Grade 4). <body data-view="list"> → list of lessons (lessons.js),
// <body data-view="lesson"> → one lesson (window.LESSON from lesson-N.js).
// Made for a child who learns best from pictures and sound: every picture is big, every
// French word can be heard (tap it), and wrong answers can be tried again.
(function () {
  "use strict";
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "lesson";
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

  /* ================= list of lessons ================= */
  if (view === "list") {
    const LS = window.FR_LESSONS || { grade: 4, term: 1, items: [] };
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="../../../index.html">← All games</a><span class="eyebrow">Grade ${esc(LS.grade)} · Term ${esc(LS.term)} · French</span></div>
    <h1 class="hero-title"><span class="p">Français</span> <span class="k">Leçons</span></h1>
    <p class="howto">Pick a lesson. Each lesson has the story with pictures and sound, the words, games (listen, match, build the word, build the sentence) and the school exercises.</p>
  </section>
  <div class="items">${LS.items.map((it) => Kit.lessonCard(it, "Leçon")).join("")}</div>
  <div class="soon">New lessons will be added here.</div>`;
    document.title = `French · Grade ${LS.grade}`;
    return;
  }

  /* ================= lesson ================= */
  const L = window.LESSON;
  const IMG = (n) => `img/lesson-${L.n}/${n}.jpg`;
  let trLang = store.get("fr-tr", "off");
  if (!["off", "en", "uk", "ar"].includes(trLang)) trLang = "off";
  let slow = store.get("fr-slow", "0") === "1";
  let auto = store.get("fr-auto", "1") === "1";

  /* ---------- translations ---------- */
  const TRI = { en: 0, uk: 1, ar: 2 };
  function trOf(fr, obj) {
    if (trLang === "off") return "";
    if (obj && obj[trLang]) return obj[trLang];
    const k = String(fr || "").trim();
    const d = L.dict && (L.dict[k] || L.dict[k.replace(/[.!]$/, "")]);
    if (d) return d[TRI[trLang]];
    const a = L.auto && L.auto(k);
    return a ? a[TRI[trLang]] : "";
  }
  const trHTML = (fr, obj) => {
    const t = trOf(fr, obj);
    return t
      ? `<div class="tr" ${trLang === "ar" ? 'dir="rtl" lang="ar"' : `lang="${trLang}"`}>${esc(t)}</div>`
      : "";
  };

  /* ---------- voice (device voices, French) ---------- */
  const TTS = "speechSynthesis" in window;
  let voice = null;
  function pickVoice() {
    if (!TTS) return;
    const vs = speechSynthesis.getVoices();
    voice =
      vs.find((v) => /^fr[-_]FR/i.test(v.lang) && v.localService) ||
      vs.find((v) => /^fr[-_]FR/i.test(v.lang)) ||
      vs.find((v) => /^fr/i.test(v.lang)) ||
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
    String(t)
      .replace(/[’‘]/g, "'")
      .replace(/_+|…/g, " ")
      .replace(/[«»]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  let sayToken = 0;
  function hush() {
    sayToken++;
    clearTimeout(sayTimer);
    if (TTS)
      try {
        speechSynthesis.cancel();
      } catch (e) {}
    document.querySelectorAll(".w.on").forEach((x) => x.classList.remove("on"));
  }
  const keep = [];
  let sayTimer = 0;
  function say(text, forceSlow, onend) {
    if (!TTS || !text) {
      onend && onend();
      return;
    }
    clearTimeout(sayTimer);
    let busy = false;
    try {
      busy = speechSynthesis.speaking || speechSynthesis.pending;
      speechSynthesis.cancel();
    } catch (e) {}
    const go = () => {
      try {
        if (!voice) pickVoice();
        const u = new SpeechSynthesisUtterance(speakable(text));
        u.lang = "fr-FR";
        if (voice) u.voice = voice;
        u.rate = (forceSlow ?? slow) ? 0.6 : 0.85;
        u.pitch = 1.05;
        if (onend) {
          let done = false;
          const f = () => {
            if (done) return;
            done = true;
            onend();
          };
          u.onend = f;
          u.onerror = f;
        }
        keep.push(u);
        if (keep.length > 6) keep.shift(); // a reference stops some browsers from losing the sentence
        try {
          speechSynthesis.resume();
        } catch (e) {}
        speechSynthesis.speak(u);
      } catch (e) {
        onend && onend();
      }
    };
    sayTimer = setTimeout(go, busy ? 160 : 40); // speaking right after cancel() is ignored by Chrome
  }
  // sound that plays by itself when a screen opens (the "Auto sound" switch)
  function autoSay(text, forceSlow) {
    if (auto && text) setTimeout(() => say(text, forceSlow), 350);
  }
  // read word by word, lighting up each word (spans with class "w" inside el)
  function sayWords(el) {
    hush();
    const my = sayToken;
    const ws = [...el.querySelectorAll(".w")];
    let i = 0;
    const step = () => {
      if (my !== sayToken) return;
      ws.forEach((w) => w.classList.remove("on"));
      if (i >= ws.length) return;
      const w = ws[i++];
      w.classList.add("on");
      say(w.dataset.say || w.textContent, true, () => setTimeout(step, 180));
    };
    step();
  }
  /* ---------- words you can tap ---------- */
  // "Comment tu t’appelles ?" → ["Comment","tu","t’appelles ?"] (punctuation stays with its word)
  function tokens(fr) {
    const out = [];
    String(fr)
      .trim()
      .split(/\s+/)
      .forEach((t) => {
        if (/^[?!:;.,]+$/.test(t) && out.length) out[out.length - 1] += " " + t;
        else out.push(t);
      });
    return out;
  }
  const bare = (t) => t.replace(/[?!:;.,]/g, "").trim();
  function wordsHTML(fr, cls = "") {
    return `<span class="say ${cls}">${tokens(fr)
      .map(
        (t) =>
          `<button type="button" class="w" data-say="${esc(bare(t))}">${hlOu(t)}</button>`,
      )
      .join(" ")}</span>`;
  }
  function bindWords(root = app) {
    root.querySelectorAll(".w").forEach((b) => {
      if (b.dataset.b) return;
      b.dataset.b = 1;
      b.onclick = (e) => {
        e.stopPropagation();
        hush();
        b.classList.add("on");
        say(b.dataset.say, true, () => b.classList.remove("on"));
      };
    });
  }
  let ouOn = false; // highlight « ou » only in the sound lesson
  function hlOu(t) {
    const e = esc(t);
    return ouOn ? e.replace(/ou/gi, (m) => `<span class="ou">${m}</span>`) : e;
  }

  /* ---------- pictures ---------- */
  function pic(it, cls = "pic") {
    if (it && it.img)
      return `<div class="${cls}"><img src="${IMG(it.img)}" alt="" draggable="false">${it.ic ? `<span class="badge">${it.ic}</span>` : ""}</div>`;
    return `<div class="${cls} emo"><span>${esc((it && it.emoji) || "❓")}</span></div>`;
  }
  const people = () => L.people;
  const personOf = (n) => L.people.find((p) => p.fr === n);

  /* ---------- shared bits ---------- */
  const bolt =
    '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#1B2440"/></svg>';
  const audioBtns = (id = "") =>
    `<div class="audio"><button type="button" class="abtn big" data-play="${id}">🔊 <span>Écoute</span></button><button type="button" class="abtn" data-slow="${id}">🐢 <span>Lentement</span></button><button type="button" class="abtn" data-step="${id}">👆 <span>Mot à mot</span></button></div>`;
  function bindAudio(root, text, wordsEl) {
    root.querySelectorAll("[data-play]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          say(text, false);
        }),
    );
    root.querySelectorAll("[data-slow]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          say(text, true);
        }),
    );
    root
      .querySelectorAll("[data-step]")
      .forEach((b) => (b.onclick = () => sayWords(wordsEl || root)));
  }
  const titleBar = (t, sub) =>
    `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to the lesson">←</button><span class="qnum">${esc(t)}</span>${sub || ""}</div>`;
  function bindHome() {
    const h = document.getElementById("homeBtn");
    if (h)
      h.onclick = () => {
        hush();
        home();
      };
  }
  const top0 = () => window.scrollTo({ top: 0 });
  // two columns on a landscape tablet (picture | answers), one column on a phone or portrait tablet
  const split = (side, main, cls = "") =>
    `<div class="split ${cls}"><div class="side">${side}</div><div class="main">${main}</div></div>`;

  /* ================= HOME ================= */
  const LEARN = [
    { k: "story", t: "L’histoire", en: "The story", img: "panel2" },
    { k: "words", t: "Les mots", en: "Words & names", img: "bouli" },
    { k: "ou", t: "Le son « ou »", en: "The sound ou", img: "minou" },
    {
      k: "verb",
      t: "Le verbe s’appeler",
      en: "The verb s’appeler",
      img: "verbe",
    },
  ];
  const PLAY = [
    {
      k: "listen",
      t: "Écoute et touche",
      en: "Listen, tap the picture",
      img: "nounours",
    },
    { k: "match", t: "Relie", en: "Match pictures and names", img: "lapinou" },
    { k: "bword", t: "Construis le mot", en: "Build the word", img: "noura" },
    {
      k: "bsent",
      t: "Construis la phrase",
      en: "Build the sentence",
      img: "ph-stephanie",
    },
    { k: "ilelle", t: "Il ou Elle ?", en: "He or she?", img: "alice" },
  ];
  function tile(m, data) {
    return `<button type="button" class="mode" ${data}>${pic(m, "thumb")}<b>${esc(m.t)}</b><small>${esc(m.en)}</small></button>`;
  }
  let tab = store.get("fr-tab-" + L.n, "learn");
  if (!["learn", "play", "ex"].includes(tab)) tab = "learn";
  const TABS = [
    { k: "learn", ic: "📖", t: "Apprends", en: "Learn" },
    { k: "play", ic: "🎲", t: "Joue", en: "Play" },
    { k: "ex", ic: "✏️", t: "Exercices", en: "School exercises" },
  ];
  function home() {
    hush();
    ouOn = false;
    const sub = trLang === "uk" ? L.uk : trLang === "ar" ? L.ar : L.en;
    const tiles =
      tab === "learn"
        ? LEARN.map((m) => tile(m, `data-m="${m.k}" id="m-${m.k}"`)).join("")
        : tab === "play"
          ? PLAY.map((m) => tile(m, `data-m="${m.k}" id="m-${m.k}"`)).join("")
          : L.exercises
              .map((x, i) =>
                tile(
                  { t: x.t, en: x.en, img: x.img, emoji: x.emoji },
                  `data-x="${i}" id="x-${x.k}"`,
                ),
              )
              .join("");
    app.innerHTML = `<section class="card pop">
    <div class="toprow"><div class="toplinks"><a class="back" href="../../../index.html">← All games</a><a class="back" href="index.html">Français</a></div>
      <div class="seg" role="group" aria-label="Translation">${[
        ["off", "Off"],
        ["en", "EN"],
        ["uk", "UA"],
        ["ar", "AR"],
      ]
        .map(
          ([k, n]) =>
            `<button type="button" id="tr-${k}" data-tr="${k}" aria-pressed="${trLang === k}" title="Translation">${n}</button>`,
        )
        .join("")}</div></div>
    <div class="les-head"><button type="button" class="les-cov" id="coverBtn" aria-label="Open the story"><img src="${IMG(L.cover)}" alt=""></button>
      <div><span class="eyebrow">Grade ${esc(L.grade)} · Leçon ${esc(L.n)} · ${esc(L.book)}</span><h1 class="les-title">${esc(L.title)}</h1>${sub ? `<div class="les-sub" ${trLang === "ar" ? 'dir="rtl"' : ""}>${esc(sub)}</div>` : ""}</div></div>
    <div class="opts-row">
      <div class="og"><span class="lab">Voice</span><div class="seg" role="group" aria-label="Voice speed"><button type="button" id="sp-0" data-sp="0" aria-pressed="${!slow}">Normal</button><button type="button" id="sp-1" data-sp="1" aria-pressed="${slow}">🐢 Slow</button></div></div>
      <div class="og"><span class="lab">Auto sound</span><div class="seg" role="group" aria-label="Play sound automatically"><button type="button" id="au-1" data-au="1" aria-pressed="${auto}">On</button><button type="button" id="au-0" data-au="0" aria-pressed="${!auto}">Off</button></div></div>
    </div>
    ${TTS ? "" : '<p class="note">This browser cannot speak. Open the lesson in Chrome or Safari to hear the French words.</p>'}
    <div class="tabbox"><div class="ftabs" role="group" aria-label="Lesson part">${TABS.map((t) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span>${esc(t.t)}<span class="sub">${esc(t.en)}</span></button>`).join("")}</div>
      <div class="panel" id="panel"><div class="modes">${tiles}</div>${tab === "learn" ? '<p class="hint">Tap any French word to hear it.</p>' : ""}</div></div>
  </section>`;
    document.getElementById("coverBtn").onclick = () => story(0);
    app.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          store.set("fr-tab-" + L.n, tab);
          home();
        }),
    );
    app.querySelectorAll("[data-tr]").forEach(
      (b) =>
        (b.onclick = () => {
          trLang = b.dataset.tr;
          store.set("fr-tr", trLang);
          home();
        }),
    );
    app.querySelectorAll("[data-sp]").forEach(
      (b) =>
        (b.onclick = () => {
          slow = b.dataset.sp === "1";
          store.set("fr-slow", slow ? "1" : "0");
          home();
        }),
    );
    app.querySelectorAll("[data-au]").forEach(
      (b) =>
        (b.onclick = () => {
          auto = b.dataset.au === "1";
          store.set("fr-auto", auto ? "1" : "0");
          home();
        }),
    );
    app
      .querySelectorAll("[data-m]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            ({
              story: () => story(0),
              words: () => words(0, "all"),
              ou: ouView,
              verb: verbView,
              listen: gameListen,
              match: gameMatch,
              bword: gameBuildWord,
              bsent: chooseSent,
              ilelle: gameIlElle,
            })[b.dataset.m]()),
      );
    app
      .querySelectorAll("[data-x]")
      .forEach((b) => (b.onclick = () => startExercise(+b.dataset.x)));
    document.title = `${L.title} · Français Leçon ${L.n}`;
  }

  /* ================= LEARN: story ================= */
  function story(i) {
    hush();
    const n = L.story.length;
    i = (i + n) % n;
    const c = L.story[i];
    const text = c.lines.map((l) => l.fr).join(" ");
    app.innerHTML = `${titleBar("L’histoire", `<span class="count">${i + 1} / ${n}</span>`)}<section class="card pop fc">
    ${split(
      `${c.title ? `<span class="qtype">${esc(c.title)}</span>` : ""}
    ${pic(c, "pic story")}
    <div class="dotsnav">${L.story.map((_, k) => `<button type="button" class="dot${k === i ? " on" : ""}" data-go="${k}" aria-label="Picture ${k + 1}"></button>`).join("")}</div>`,
      `<div class="lines" id="lines">${c.lines.length ? c.lines.map((l) => `<div class="line">${l.who ? `<button type="button" class="who" data-who="${esc(l.who)}">${pic(personOf(l.who) || { emoji: "🙂" }, "pic face")}<span>${esc(l.who)}</span></button>` : ""}<div class="said">${wordsHTML(l.fr, "big")}${trHTML(l.fr)}</div></div>`).join("") : `<div class="line"><div class="said">${wordsHTML(c.note.fr, "big")}${trHTML(c.note.fr, c.note)}</div></div>`}</div>
    ${audioBtns()}
    <div class="nav"><button type="button" class="btn ghost" id="prevBtn">← </button><button type="button" class="btn" id="nextBtn">${i + 1 < n ? "→" : "Encore ↺"}</button></div>
    <details class="book" id="allBox"><summary>📄 Lis tout <small class="muted">Read the whole text</small></summary><div class="alltext" id="all">${L.story
      .filter((s) => s.lines.length && !s.title)
      .flatMap((s) => s.lines)
      .map((l) => `<p><b class="nm">${esc(l.who)} :</b> ${wordsHTML(l.fr)}</p>`)
      .join(
        "",
      )}</div><div class="audio left"><button type="button" class="abtn" id="allPlay">🔊 Écoute tout</button><button type="button" class="abtn" id="allStep">👆 Mot à mot</button></div></details>`,
      "wide story",
    )}
  </section>`;
    bindHome();
    bindWords();
    const t = text || c.note.fr;
    bindAudio(app.querySelector(".card"), t, document.getElementById("lines"));
    app
      .querySelectorAll("[data-who]")
      .forEach((b) => (b.onclick = () => say(b.dataset.who)));
    app
      .querySelectorAll("[data-go]")
      .forEach((b) => (b.onclick = () => story(+b.dataset.go)));
    document.getElementById("prevBtn").onclick = () => story(i - 1);
    document.getElementById("nextBtn").onclick = () => story(i + 1);
    const allT = L.story
      .filter((s) => s.lines.length && !s.title)
      .flatMap((s) => s.lines)
      .map((l) => l.fr)
      .join(" ");
    document.getElementById("allPlay").onclick = () => {
      hush();
      say(allT);
    };
    document.getElementById("allStep").onclick = () =>
      sayWords(document.getElementById("all"));
    autoSay(t);
  }

  /* ================= LEARN: words (flash cards) ================= */
  let showWord = store.get("fr-show", "1") === "1";
  function words(i, set) {
    hush();
    const list =
      set === "people"
        ? L.people
        : set === "phrases"
          ? L.phrases
          : L.people.concat(L.phrases);
    const n = list.length;
    i = (i + n) % n;
    const it = list[i];
    const isP = L.people.includes(it);
    const say1 = isP
      ? `${it.g === "elle" ? "Elle" : "Il"} s’appelle ${it.fr}.`
      : it.fr;
    app.innerHTML = `${titleBar("Les mots", `<span class="count">${i + 1} / ${n}</span>`)}<section class="card pop fc">
    ${split(
      pic(it, "pic card"),
      `<div class="opts-row center">
      <div class="seg" role="group" aria-label="Cards">${[
        ["all", "Tous"],
        ["people", "Les personnages"],
        ["phrases", "Les phrases"],
      ]
        .map(
          ([k, t]) =>
            `<button type="button" data-set="${k}" aria-pressed="${set === k}">${t}</button>`,
        )
        .join("")}</div>
      <div class="seg" role="group" aria-label="Show the word"><button type="button" data-sw="1" aria-pressed="${showWord}">🖼️ + Aa</button><button type="button" data-sw="0" aria-pressed="${!showWord}">🖼️ only</button></div>
    </div>
    <div id="wbox">${showWord ? `<div class="fc-word">${wordsHTML(it.fr)}</div>${isP ? `<div class="sub">${wordsHTML(say1)}</div>` : ""}${trHTML(it.fr, it)}` : `<button type="button" class="fc-hidden" id="reveal">👁️ Montre le mot</button>`}</div>
    <div class="audio"><button type="button" class="abtn big" id="s1">🔊 <span>Écoute</span></button><button type="button" class="abtn" id="s2">🐢 <span>Lentement</span></button></div>
    <div class="nav"><button type="button" class="btn ghost" id="prevBtn">←</button><button type="button" class="btn" id="nextBtn">→</button></div>`,
    )}
  </section>`;
    bindHome();
    bindWords();
    app
      .querySelectorAll("[data-set]")
      .forEach((b) => (b.onclick = () => words(0, b.dataset.set)));
    app.querySelectorAll("[data-sw]").forEach(
      (b) =>
        (b.onclick = () => {
          showWord = b.dataset.sw === "1";
          store.set("fr-show", showWord ? "1" : "0");
          words(i, set);
        }),
    );
    const rv = document.getElementById("reveal");
    if (rv)
      rv.onclick = () => {
        document.getElementById("wbox").innerHTML =
          `<div class="fc-word">${wordsHTML(it.fr)}</div>${isP ? `<div class="sub">${wordsHTML(say1)}</div>` : ""}${trHTML(it.fr, it)}`;
        bindWords();
        say(it.fr);
      };
    document.getElementById("s1").onclick = () => {
      hush();
      say(isP ? say1 : it.fr, false);
    };
    document.getElementById("s2").onclick = () => {
      hush();
      say(it.fr, true);
    };
    document.getElementById("prevBtn").onclick = () => words(i - 1, set);
    document.getElementById("nextBtn").onclick = () => words(i + 1, set);
    autoSay(isP ? say1 : it.fr);
  }

  /* ================= LEARN: le son « ou » ================= */
  const ouPic = (w) => {
    const p = personOf(w);
    return p ? { img: p.img } : { img: (L.ou.pics || {})[w] };
  };
  function ouView() {
    hush();
    ouOn = true;
    app.innerHTML = `${titleBar("Le son « ou »")}<section class="card pop">
    <div class="ou-hero"><button type="button" class="ou-big" id="ouBig"><span class="ou">ou</span> = [u] 🔊</button>${pic({ img: L.ou.img }, "pic strip")}</div>
    <p class="hint">Tap a picture to hear the word. Listen for <b class="ou">ou</b>.</p>
    <div class="ou-grid">${L.ou.words.map((w, k) => `<button type="button" class="ou-card" data-ou="${k}">${pic(ouPic(w), "pic sq")}<span class="ou-w">${hlOu(w)}</span></button>`).join("")}</div>
    <div class="row center"><button type="button" class="btn" id="ouGame">🎲 Tu entends « ou » ?</button><button type="button" class="btn ghost" id="ouBuild">🔤 Construis les mots</button></div>
  </section>`;
    bindHome();
    document.getElementById("ouBig").onclick = () =>
      say("ou… ou… Bonjour, Bouli, Minou", true);
    autoSay("Le son ou. " + L.ou.words.join(", "), true);
    app.querySelectorAll("[data-ou]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          app
            .querySelectorAll(".ou-card")
            .forEach((x) => x.classList.remove("on"));
          b.classList.add("on");
          say(L.ou.words[+b.dataset.ou], true);
        }),
    );
    document.getElementById("ouGame").onclick = () => {
      ouOn = false;
      run("Tu entends « ou » ?", ouItems());
    };
    document.getElementById("ouBuild").onclick = () => {
      run(
        "Construis les mots « ou »",
        shuf(L.ou.words).map((w) => ({ type: "letters", fr: w, ...ouPic(w) })),
      );
    };
  }
  function ouItems() {
    const yes = L.ou.words.map((w) => ({
      type: "yn",
      fr: w,
      a: true,
      ...ouPic(w),
    }));
    const no = L.ou.not.map((w) => {
      const p = personOf(w) || L.phrases.find((x) => x.fr === w) || {};
      return { type: "yn", fr: w, a: false, img: p.img, ic: p.ic };
    });
    return shuf(yes.concat(no));
  }

  /* ================= LEARN: le verbe s'appeler ================= */
  function verbView() {
    hush();
    const V = L.verb;
    const full = (r) => `${r.p} ${r.el}appell${r.end} ${r.name}.`;
    app.innerHTML = `${titleBar("Le verbe s’appeler")}<section class="card pop">
    ${split(
      `<p class="hint">Tap a line to hear it. The coloured letters change.</p>
    <div class="verb">${V.rows.map((r, k) => `<button type="button" class="vrow" data-v="${k}">${pic(r, "pic face2")}<span class="vpv"><span class="vp">${esc(r.p)}</span> <span class="vv"><span class="el">${esc(r.el)}</span>appell<span class="end">${esc(r.end)}</span></span></span><span class="vn">${esc(r.name)}</span>${trLang !== "off" ? `<span class="vt" ${trLang === "ar" ? 'dir="rtl"' : ""}>${esc(r[trLang])} ${esc(personOf(r.name) ? N3(r.name) : r.name)}</span>` : ""}</button>`).join("")}</div>
`,
      `<div class="audio"><button type="button" class="abtn big" id="vAll">🔊 <span>Écoute tout</span></button></div>
    <details class="book"><summary>📕 The page in the book</summary>${pic({ img: V.img }, "pic wide")}</details>
    <div class="row center"><button type="button" class="btn" id="vIl">👦 Il ou Elle ? 👧</button><button type="button" class="btn ghost" id="vFill">✍️ Complète</button></div>`,
      "wide",
    )}
  </section>`;
    bindHome();
    app.querySelectorAll("[data-v]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          app
            .querySelectorAll(".vrow")
            .forEach((x) => x.classList.remove("on"));
          b.classList.add("on");
          say(full(V.rows[+b.dataset.v]), true);
        }),
    );
    document.getElementById("vAll").onclick = () => {
      hush();
      say(V.rows.map(full).join(" "), true);
    };
    document.getElementById("vIl").onclick = gameIlElle;
    autoSay(V.rows.map(full).join(" "), true);
    document.getElementById("vFill").onclick = () =>
      startExercise(L.exercises.findIndex((x) => x.k === "verbe"));
  }
  function N3(n) {
    const a = L.auto && L.auto(`C’est ${n}.`);
    if (!a) return n;
    const t = a[TRI[trLang]];
    return t.replace(/^(This is |Це |هذا )/, "").replace(/[.]$/, "");
  }

  /* ================= PLAY: game builders ================= */
  function gameListen() {
    const P = people();
    const items = shuf(P).map((p) => {
      const others = shuf(P.filter((x) => x !== p)).slice(0, 2);
      return {
        type: "tap",
        say: `${p.g === "elle" ? "Elle" : "Il"} s’appelle ${p.fr}.`,
        opts: shuf([p, ...others]).map((x) => x.img),
        a: p.img,
      };
    });
    run("Écoute et touche", items);
  }
  function gameMatch() {
    const P = shuf(people());
    const rounds = [P.slice(0, 5), P.slice(5)];
    run(
      "Relie",
      rounds.map((r) => ({
        type: "match",
        pairs: r.map((p) => ({ img: p.img, fr: p.fr })),
      })),
    );
  }
  function gameBuildWord() {
    run(
      "Construis le mot",
      shuf(L.build).map((w) => {
        const p = personOf(w) || L.phrases.find((x) => bare(x.fr) === w) || {};
        return {
          type: "letters",
          fr: w,
          img: p.img || (L.ou.pics || {})[w],
          ic: p.ic,
        };
      }),
    );
  }
  function chooseSent() {
    hush();
    app.innerHTML = `${titleBar("Construis la phrase")}<section class="card pop">
    <p class="qtext">Choose how to build:</p>
    <div class="modes two">
      <button type="button" class="mode" id="bs-w" data-k="order"><span class="mi-ic">🧱</span><b>Les mots</b><small>Put the word cards in order (like “Mets en ordre”)</small></button>
      <button type="button" class="mode" id="bs-l" data-k="letters"><span class="mi-ic">🔤</span><b>Les lettres</b><small>Build each word letter by letter</small></button>
    </div></section>`;
    bindHome();
    app.querySelectorAll("[data-k]").forEach(
      (b) =>
        (b.onclick = () =>
          run(
            b.dataset.k === "order"
              ? "Construis la phrase"
              : "Construis la phrase · lettres",
            shuf(L.sentences).map((s) => ({
              type: b.dataset.k,
              fr: s.fr,
              img: s.img,
            })),
          )),
    );
  }
  function gameIlElle() {
    run(
      "Il ou Elle ?",
      shuf(people()).map((p) => ({
        type: "mc",
        img: p.img,
        q: `___ s’appelle ${p.fr}.`,
        opts: p.g === "elle" ? ["Elle", "Il"] : ["Il", "Elle"],
        icons: p.g === "elle" ? ["👧", "👦"] : ["👦", "👧"],
        two: true,
        full: `${p.g === "elle" ? "Elle" : "Il"} s’appelle ${p.fr}.`,
      })),
    );
  }
  function startExercise(i) {
    const X = L.exercises[i];
    let items = X.items;
    if (items === "people-mc")
      items = shuf(people()).map((p) => {
        const G = p.g === "elle" ? "Elle" : "Il",
          g2 = G === "Il" ? "Elle" : "Il";
        const other = pick(people().filter((x) => x !== p && x.g === p.g));
        return {
          type: "mc",
          img: p.img,
          q: `Comment ${G.toLowerCase()} s’appelle ?`,
          opts: [
            `${G} s’appelle ${p.fr}.`,
            `${g2} s’appelle ${p.fr}.`,
            `${G} s’appelle ${other.fr}.`,
          ],
        };
      });
    else if (items === "ou-yn") items = ouItems();
    else
      items =
        X.k === "entends" || X.k === "relie" ? items.slice() : shuf(items);
    if (X.text) return readText(X, items);
    run(X.t, items, X.from);
  }
  function readText(X, items) {
    hush();
    const T = X.text;
    app.innerHTML = `${titleBar(X.t)}<section class="card pop fc">
    ${split(
      `<span class="qtype">${esc(X.from || "")}</span>
    ${pic(T, "pic card")}`,
      `<div class="lines tight" id="txt">${T.lines.map((l) => `<div class="line"><div class="said">${wordsHTML(l, "big")}${trHTML(l)}</div></div>`).join("")}</div>
    ${audioBtns()}
    <div class="row center"><button type="button" class="btn big" id="goQ">Questions →</button></div>`,
    )}
  </section>`;
    bindHome();
    bindWords();
    bindAudio(app, T.lines.join(" "), document.getElementById("txt"));
    document.getElementById("goQ").onclick = () =>
      run(
        X.t,
        items.map((it) => ({ ...it, text: T })),
        X.from,
      );
    autoSay(T.lines.join(" "));
  }

  /* ================= runner ================= */
  const S = {
    title: "",
    items: [],
    i: 0,
    score: 0,
    max: 0,
    miss: [],
    from: "",
  };
  function run(title, items, from) {
    S.title = title;
    S.items = items;
    S.i = 0;
    S.score = 0;
    S.miss = [];
    S.from = from || "";
    S.max = items.reduce(
      (a, it) => a + (it.type === "match" ? it.pairs.length : 1),
      0,
    );
    show();
  }
  function hud() {
    const pct = Math.round((S.i / Math.max(1, S.items.length)) * 100);
    return `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to the lesson">←</button><span class="qnum">${esc(S.title)} · ${S.i + 1}/${S.items.length}</span><div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress"><i style="width:${pct}%"></i></div><span class="score" aria-label="Points">${bolt}<b id="pts">${S.score}</b></span></div>`;
  }
  function show() {
    hush();
    top0();
    const it = S.items[S.i];
    ({
      tap: itTap,
      mc: itMC,
      yn: itYN,
      order: itOrder,
      letters: itLetters,
      fill: itFill,
      match: itMatch,
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
    "Bravo !",
    "Super !",
    "Très bien !",
    "Excellent !",
    "Génial !",
  ];
  function feedback(ok, html) {
    const box = document.getElementById("fbx");
    box.innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "🎉 " + pick(PRAISE) : "💡 La bonne réponse"}</b>${html ? `<span>${html}</span>` : ""}</div><div class="row end"><button class="btn big" id="nextBtn" type="button">${S.i + 1 < S.items.length ? "→" : "⭐ Score"}</button></div>`;
    bindWords(box);
    const nb = document.getElementById("nextBtn");
    nb.onclick = next;
    requestAnimationFrame(() => {
      nb.focus({ preventScroll: true });
      const r = nb.getBoundingClientRect();
      if (r.bottom > innerHeight)
        nb.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }
  const answerHTML = (fr) => `${wordsHTML(fr, "big")}${trHTML(fr)}`;

  /* --- listen & tap a picture (retry until right; point only on first try) --- */
  function itTap(it) {
    let tries = 0;
    app.innerHTML = `${hud()}<section class="card pop fc">
    <div class="row center"><span class="qtype">👂 Écoute. Touche la bonne image.</span><div class="audio"><button type="button" class="abtn big" id="s1">🔊 <span>Écoute</span></button><button type="button" class="abtn" id="s2">🐢</button></div></div>
    <div class="choices n${it.opts.length}">${it.opts.map((o, k) => `<button type="button" class="choice" data-k="${k}" aria-label="Picture ${k + 1}">${pic({ img: o }, "pic sq")}</button>`).join("")}</div>
    <div id="fbx" class="fbx"></div></section>`;
    bindHome();
    const ans = it.a || it.opts[0];
    document.getElementById("s1").onclick = () => say(it.say, false);
    document.getElementById("s2").onclick = () => say(it.say, true);
    app.querySelectorAll(".choice").forEach(
      (b) =>
        (b.onclick = () => {
          const ok = it.opts[+b.dataset.k] === ans;
          if (!ok) {
            tries++;
            b.classList.add("wrong");
            b.disabled = true;
            say("Essaie encore !", false, () => say(it.say, true));
            return;
          }
          b.classList.add("right");
          app.querySelectorAll(".choice").forEach((x) => {
            x.disabled = true;
            if (x !== b) x.classList.add("dim");
          });
          if (!tries) addPts(1);
          else S.miss.push({ img: ans, right: it.say });
          say(it.say);
          feedback(true, answerHTML(it.say));
        }),
    );
    setTimeout(() => say(it.say), 350);
  }

  /* --- multiple choice (sentence answers, each can be heard) --- */
  function itMC(it) {
    let tries = 0;
    const right = it.opts[0];
    const order = shuf(
      it.opts.map((t, k) => ({
        t,
        k,
        ic: it.icons && it.icons[k],
        sy: it.say && it.say[k],
      })),
    );
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${split(
      `${it.text ? `<details class="book"><summary>📄 Le texte</summary><div class="alltext">${it.text.lines.map((l) => `<p>${wordsHTML(l)}</p>`).join("")}</div></details>` : ""}
    ${pic(it, "pic card")}`,
      `<div class="q">${wordsHTML(it.q, "big")}<button type="button" class="abtn" id="sq">🔊</button></div>${trHTML(it.q)}
    <div class="opts ${it.two ? "two" : ""}">${order.map((o, j) => `<div class="optrow"><button type="button" class="opt" data-j="${j}">${o.ic ? `<span class="oic">${o.ic}</span>` : ""}<span>${esc(o.t)}</span></button><button type="button" class="abtn sm" data-h="${j}" aria-label="Listen">🔊</button></div>`).join("")}</div>
    <div id="fbx" class="fbx"></div>`,
    )}</section>`;
    bindHome();
    bindWords();
    const qs = it.q.replace(/___/, "…");
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
            say(o.sy || o.t, false, () => say("Essaie encore !"));
            return;
          }
          b.classList.add("right");
          app.querySelectorAll(".opt").forEach((x) => {
            x.disabled = true;
            if (x !== b) x.classList.add("dim");
          });
          const full =
            it.full ||
            (it.q.includes("___") ? it.q.replace("___", right) : right);
          if (!tries) addPts(1);
          else
            S.miss.push({
              img: it.img,
              emoji: it.emoji,
              q: it.q,
              right:
                it.q.includes("___") || it.full ? full : it.q + " " + right,
            });
          say(full);
          feedback(true, answerHTML(full));
        }),
    );
    autoSay(qs);
  }

  /* --- yes / no: do you hear « ou »? --- */
  function itYN(it) {
    let tries = 0;
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${split(
      `<span class="qtype">🔉 Tu entends « ou » ?</span>
    ${pic(it, "pic card")}`,
      `<div class="fc-word">${wordsHTML(it.fr)}</div>
    <div class="audio"><button type="button" class="abtn big" id="s1">🔊 <span>Écoute</span></button><button type="button" class="abtn" id="s2">🐢</button></div>
    <div class="yn"><button type="button" class="opt big" data-a="1">👍 Oui</button><button type="button" class="opt big" data-a="0">👎 Non</button></div>
    <div id="fbx" class="fbx"></div>`,
    )}</section>`;
    bindHome();
    bindWords();
    document.getElementById("s1").onclick = () => say(it.fr);
    document.getElementById("s2").onclick = () => say(it.fr, true);
    app.querySelectorAll("[data-a]").forEach(
      (b) =>
        (b.onclick = () => {
          const ok = (b.dataset.a === "1") === it.a;
          if (!ok) {
            tries++;
            b.classList.add("wrong");
            b.disabled = true;
            say(it.fr, true);
            return;
          }
          b.classList.add("right");
          app.querySelectorAll("[data-a]").forEach((x) => (x.disabled = true));
          if (!tries) addPts(1);
          else
            S.miss.push({
              img: it.img,
              right: it.fr + (it.a ? " — oui, « ou »" : " — non"),
            });
          ouOn = true;
          app.querySelector(".fc-word").innerHTML = wordsHTML(it.fr);
          ouOn = false;
          bindWords();
          feedback(
            true,
            it.a
              ? `<b>${esc(it.fr)}</b> : on entend <b class="ou">ou</b>.`
              : `<b>${esc(it.fr)}</b> : pas de « ou ».`,
          );
        }),
    );
    setTimeout(() => say(it.fr), 350);
  }

  /* --- fill the blanks (verb s'appeler) --- */
  function itFill(it) {
    const blanks = it.parts.filter((p) => Array.isArray(p));
    const got = blanks.map(() => null);
    let act = 0;
    let tries = 0;
    const full = it.parts
      .map((p, k) =>
        Array.isArray(p)
          ? it.ans[it.parts.slice(0, k).filter(Array.isArray).length]
          : p,
      )
      .join("");
    function draw(done) {
      let b = -1;
      const sent = it.parts
        .map((p) => {
          if (!Array.isArray(p)) return `<span class="fx">${esc(p)}</span>`;
          b++;
          const k = b;
          const v = got[k];
          const cls = done
            ? v === it.ans[k]
              ? " ok"
              : " no"
            : k === act
              ? " act"
              : "";
          return `<button type="button" class="blank${cls}" data-b="${k}" ${done ? "disabled" : ""}>${v ? esc(v) : "&nbsp;?&nbsp;"}</button>`;
        })
        .join("");
      document.getElementById("sent").innerHTML = sent;
      document.getElementById("chips").innerHTML = done
        ? ""
        : blanks[act]
            .map(
              (o) =>
                `<button type="button" class="chip-o" data-o="${esc(o)}">${esc(o)}</button>`,
            )
            .join("");
      document.querySelectorAll("[data-b]").forEach(
        (x) =>
          (x.onclick = () => {
            act = +x.dataset.b;
            got[act] = null;
            draw();
          }),
      );
      document.querySelectorAll("[data-o]").forEach(
        (x) =>
          (x.onclick = () => {
            got[act] = x.dataset.o;
            {
              const o = x.dataset.o;
              const sp =
                { "m’": "me", "t’": "te", "s’": "se" }[o] ||
                (/’/.test(o) ? o : "");
              if (sp) say(sp, true);
            }
            const nx = got.findIndex((v) => v === null);
            if (nx >= 0) act = nx;
            draw();
          }),
      );
      const cb = document.getElementById("checkBtn");
      if (cb) cb.disabled = got.some((v) => v === null);
    }
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${split(
      `<span class="qtype">✍️ Complète</span>
    ${pic(it, "pic card")}`,
      `<div class="fill" id="sent"></div>
    <div class="chips-o" id="chips"></div>
    <p class="hint">Tap the blue box, then tap the right piece.</p>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn" id="checkBtn" type="button" disabled>✔ Vérifie</button></div></div>`,
    )}</section>`;
    bindHome();
    draw();
    autoSay("Complète.");
    const check = () => {
      const ok = got.every((v, k) => v === it.ans[k]);
      if (!ok && tries === 0) {
        tries++;
        draw(true);
        say("Essaie encore !");
        document.getElementById("fbx").innerHTML =
          `<div class="fb no"><b>Presque ! Essaie encore.</b><span>Red boxes are wrong.</span></div><div class="row center"><button class="btn" id="againBtn" type="button">↺ Encore</button></div>`;
        document.getElementById("againBtn").onclick = () => {
          got.forEach((v, k) => {
            if (v !== it.ans[k]) got[k] = null;
          });
          act = got.findIndex((v) => v === null);
          document.getElementById("fbx").innerHTML =
            `<div class="row center"><button class="btn" id="checkBtn" type="button">✔ Vérifie</button></div>`;
          document.getElementById("checkBtn").onclick = check;
          draw();
        };
        return;
      }
      draw(true);
      if (ok && !tries) addPts(1);
      else S.miss.push({ img: it.img, emoji: it.emoji, right: full });
      say(full);
      feedback(ok, answerHTML(full));
    };
    document.getElementById("checkBtn").onclick = check;
  }

  /* --- tiles you can drag or tap (shared by order & letters) --- */
  function tiles(Lel, Bel, st, { cls = "", ph = "", onChange }) {
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
        if (y <= r.bottom + 4 && x < r.left + r.width / 2) break;
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
              if (t.say) say(t.say, true);
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
                `<button type="button" class="tile ${cls}${st.done ? (w.t === st.target[k] ? " ok" : " no") : ""}" data-from="line" data-k="${k}" ${st.done ? "disabled" : ""}>${esc(w.t)}</button>`,
            )
            .join("")
        : `<span class="ph">${esc(ph)}</span>`;
      Bel.innerHTML = st.bank
        .map(
          (w, k) =>
            `<button type="button" class="tile ${cls}" data-from="bank" data-k="${k}">${esc(w.t)}</button>`,
        )
        .join("");
      if (!st.done)
        [
          ...Lel.querySelectorAll(".tile"),
          ...Bel.querySelectorAll(".tile"),
        ].forEach(bindTile);
      onChange && onChange();
    }
    // 💡 hint: put the next right tile in place
    st.hint = () => {
      let k = 0;
      while (k < st.line.length && st.line[k].t === st.target[k]) k++;
      while (st.line.length > k) st.bank.push(st.line.pop());
      const j = st.bank.findIndex((w) => w.t === st.target[k]);
      if (j >= 0) {
        const [w] = st.bank.splice(j, 1);
        st.line.push(w);
        if (w.say) say(w.say, true);
      }
      draw();
    };
    st.draw = draw;
    draw();
    return st;
  }
  const mixed = (arr, target) => {
    let b = shuf(arr);
    for (
      let n = 0;
      n < 8 &&
      arr.length > 1 &&
      b.map((x) => x.t).join("|") === target.join("|");
      n++
    )
      b = shuf(b);
    return b;
  };

  /* --- word cards in order (Mets en ordre) --- */
  // elided verbs are cut like at school: "s’appelle" → "s’" + "appelle"
  function orderTokens(fr) {
    const out = [];
    tokens(fr).forEach((t) => {
      const m = t.match(/^([mtsMTS]’)(appel.*)$/);
      if (m) out.push(m[1], m[2]);
      else out.push(t);
    });
    return out;
  }
  function itOrder(it) {
    const target = orderTokens(it.fr);
    let tries = 0;
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${split(
      `<span class="qtype">🧱 Mets en ordre</span>
    ${pic(it, "pic card")}
    ${it.q ? `<div class="q">${wordsHTML(it.q, "big")}<button type="button" class="abtn" id="sq">🔊</button></div>` : ""}
    <div class="audio"><button type="button" class="abtn big" id="s1">🔊 <span>Écoute la phrase</span></button><button type="button" class="abtn" id="s2">🐢</button></div>`,
      `<div class="slots" id="line" aria-label="Your sentence"></div>
    <div class="bank" id="bank" aria-label="Word cards"></div>
    <p class="hint">Tap the cards in order, or drag them. Tap a card on the line to take it back.</p>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn ghost" id="hintBtn" type="button">💡 Aide</button><button class="btn" id="checkBtn" type="button" disabled>✔ Vérifie</button></div></div>`,
    )}</section>`;
    bindHome();
    bindWords();
    const sq = document.getElementById("sq");
    if (sq) sq.onclick = () => say(it.q);
    document.getElementById("s1").onclick = () => say(it.fr);
    document.getElementById("s2").onclick = () => say(it.fr, true);
    const st = {
      target,
      line: [],
      bank: mixed(
        target.map((t, i) => ({ t, i, say: bare(t).replace(/’$/, "") })),
        target,
      ),
      done: false,
    };
    tiles(
      document.getElementById("line"),
      document.getElementById("bank"),
      st,
      {
        cls: "wd",
        ph: "Put the cards here",
        onChange: () => {
          const cb = document.getElementById("checkBtn");
          if (cb) cb.disabled = st.bank.length > 0;
        },
      },
    );
    document.getElementById("hintBtn").onclick = () => {
      tries++;
      st.hint();
    };
    const check = () => {
      const ok = st.line.map((w) => w.t).join("|") === target.join("|");
      if (!ok && tries < 1) {
        tries++;
        st.done = true;
        st.draw();
        say("Essaie encore !");
        document.getElementById("fbx").innerHTML =
          `<div class="fb no"><b>Presque ! Essaie encore.</b><span>The red cards are in the wrong place.</span></div><div class="row center"><button class="btn" id="againBtn" type="button">↺ Encore</button></div>`;
        document.getElementById("againBtn").onclick = () => {
          let k = 0;
          while (k < st.line.length && st.line[k].t === target[k]) k++;
          while (st.line.length > k) st.bank.push(st.line.pop());
          st.done = false;
          document.getElementById("fbx").innerHTML =
            `<div class="row center"><button class="btn ghost" id="hintBtn" type="button">💡 Aide</button><button class="btn" id="checkBtn" type="button" disabled>✔ Vérifie</button></div>`;
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
      document.getElementById("line").classList.add(ok ? "ok" : "no");
      if (ok && !tries) addPts(1);
      else S.miss.push({ img: it.img, emoji: it.emoji, right: it.fr });
      say(it.fr);
      feedback(ok, answerHTML(it.fr));
    };
    document.getElementById("checkBtn").onclick = check;
    autoSay(it.q || it.fr);
  }

  /* --- letters (a word, or a sentence word by word) --- */
  function itLetters(it) {
    const sent = /\s/.test(it.fr.trim());
    const W = tokens(it.fr).map((t) => {
      const m = t.match(/^(.*?)(\s?[?!.,:;]*)$/);
      return { w: m[1], p: m[2] };
    });
    let act = sent ? -1 : 0;
    let tries = 0;
    app.innerHTML = `${hud()}<section class="card pop fc">
    ${split(
      `<span class="qtype">🔤 Construis ${sent ? "la phrase" : "le mot"}</span>
    ${pic(it, "pic card")}
    <div class="audio"><button type="button" class="abtn big" id="s1">🔊 <span>Écoute</span></button><button type="button" class="abtn" id="s2">🐢</button></div>`,
      `${sent ? '<div class="sent-row" id="sr"></div>' : ""}
    <div class="slots" id="line"></div>
    <div class="bank" id="bank"></div>
    <p class="hint">${sent ? "Tap a word box, then put its letters in order." : "Put the letters in order. Tap or drag."}</p>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn ghost" id="hintBtn" type="button">💡 Aide</button><button class="btn" id="checkBtn" type="button" disabled>✔ Vérifie</button></div></div>`,
    )}</section>`;
    bindHome();
    document.getElementById("s1").onclick = () => say(it.fr);
    document.getElementById("s2").onclick = () => say(it.fr, true);
    const Lel = document.getElementById("line"),
      Bel = document.getElementById("bank"),
      SR = document.getElementById("sr");
    W.forEach((x) => {
      const tg = [...x.w];
      x.st = {
        target: tg,
        line: [],
        bank: mixed(
          tg.map((t, i) => ({ t, i })),
          tg,
        ),
        done: false,
      };
    });
    let done = false;
    function drawSR() {
      if (!sent) return;
      SR.innerHTML = W.map(
        (x, k) =>
          `<span class="wgrp"><button type="button" class="wbox${k === act ? " sel" : ""}${done ? (x.st.line.map((l) => l.t).join("") === x.w ? " ok" : " no") : ""}" data-w="${k}" ${done ? "disabled" : ""}>${x.st.target.map((_, j) => `<span>${x.st.line[j] ? esc(x.st.line[j].t) : ""}</span>`).join("")}</button>${x.p ? `<span class="punct">${esc(x.p.trim())}</span>` : ""}</span>`,
      ).join("");
      SR.querySelectorAll("[data-w]").forEach(
        (b) =>
          (b.onclick = () => {
            select(+b.dataset.w);
            say(W[act].w, true);
          }),
      );
      Lel.style.display = Bel.style.display = done || act < 0 ? "none" : "";
    }
    const onChange = () => {
      drawSR();
      const cb = document.getElementById("checkBtn");
      if (cb) cb.disabled = W.some((x) => x.st.bank.length);
      if (sent && act >= 0 && !W[act].st.bank.length) {
        const nx = W.findIndex((x) => x.st.bank.length);
        if (nx >= 0) setTimeout(() => select(nx), 250);
      }
    };
    function select(k) {
      act = k;
      tiles(Lel, Bel, W[k].st, { cls: "let", ph: "Letters here", onChange });
    }
    if (sent) drawSR();
    else select(0);
    if (sent) select(0);
    document.getElementById("hintBtn").onclick = () => {
      tries++;
      if (act < 0) select(0);
      W[act].st.hint();
    };
    document.getElementById("checkBtn").onclick = () => {
      const ok = W.every((x) => x.st.line.map((l) => l.t).join("") === x.w);
      done = true;
      W.forEach((x) => (x.st.done = true));
      if (act >= 0) W[act].st.draw();
      drawSR();
      if (!sent) {
        Lel.classList.add(ok ? "ok" : "no");
      }
      if (ok && !tries) addPts(1);
      else S.miss.push({ img: it.img, right: it.fr });
      say(it.fr);
      feedback(ok, answerHTML(it.fr));
    };
    autoSay(it.fr);
  }

  /* --- match pictures and words --- */
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
    const right = shuf(round.map((p, i) => ({ i, fr: p.fr })));
    const pair = {};
    let sel = null,
      checked = false;
    app.innerHTML = `${hud()}<section class="card pop">
    <div class="row center"><span class="qtype">🔗 Relie</span><span class="hint">Tap a picture, then tap its words. Tap the words alone to hear them.</span></div>
    <div class="match n${round.length}"><div class="mcol pics" id="colL"></div><div class="mcol" id="colR"></div></div>
    <div id="fbx" class="fbx"><div class="row center"><button class="btn" id="checkBtn" type="button" disabled>✔ Vérifie</button></div></div></section>`;
    bindHome();
    const colL = document.getElementById("colL"),
      colR = document.getElementById("colR");
    function draw() {
      colL.innerHTML = left
        .map((l, k) => {
          const has = pair[l.i] !== undefined;
          const ok = checked && pair[l.i] === l.i;
          const cls = checked ? (ok ? "ok" : "no") : sel === l.i ? "sel" : "";
          return `<button type="button" class="mi ${cls}" data-l="${l.i}" ${checked ? "disabled" : ""} aria-label="Picture ${k + 1}">${pic(l.p, "pic mpic")}${has ? `<span class="tag" style="background:${PAIRC[k % 6]}">${k + 1}</span>` : ""}${checked && !ok ? `<span class="fix">${esc(l.p.fr)}</span>` : ""}</button>`;
        })
        .join("");
      colR.innerHTML = right
        .map((r) => {
          const li = Object.keys(pair).find((x) => pair[x] === r.i);
          const lk = li !== undefined ? left.findIndex((x) => x.i === +li) : -1;
          const cls =
            checked && li !== undefined ? (+li === r.i ? "ok" : "no") : "";
          return `<button type="button" class="mi word ${cls}" data-r="${r.i}" ${checked ? "disabled" : ""}><span class="tx">${esc(r.fr)}</span>${trHTML(r.fr)}${lk >= 0 ? `<span class="tag" style="background:${PAIRC[lk % 6]}">${lk + 1}</span>` : ""}</button>`;
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
            say(round[ri].fr, true);
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
    autoSay("Relie.");
    document.getElementById("checkBtn").onclick = () => {
      checked = true;
      let got = 0;
      round.forEach((p, i) => {
        if (pair[i] === i) got++;
        else S.miss.push({ img: p.img, right: p.fr });
      });
      addPts(got);
      draw();
      feedback(
        got === round.length,
        got === round.length
          ? "Tout est juste !"
          : `${got} / ${round.length}. Look at the red ones: the right words are under the picture.`,
      );
    };
  }

  /* ================= END ================= */
  function star(on) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill="${on ? "var(--hl)" : "var(--card)"}" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  function end() {
    hush();
    const pct = Math.round((S.score / Math.max(1, S.max)) * 100);
    const st = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const msg =
      pct === 100
        ? "Parfait !"
        : pct >= 90
          ? "Excellent !"
          : pct >= 70
            ? "Très bien !"
            : "Bravo, continue !";
    app.innerHTML = `<section class="card pop">
    <span class="eyebrow">${esc(S.title)}</span>
    <div class="big-score">${S.score}<small> / ${S.max}</small></div>
    <div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div>
    <h2>${msg}</h2>
    <div class="row"><button class="btn big" id="againBtn" type="button">↺ Encore</button><button class="btn ghost" id="menuBtn" type="button">← Leçon</button></div>
  </section>
  ${S.miss.length ? `<section class="card"><h3>On révise <small class="muted">Let’s look again (${S.miss.length})</small></h3><ul class="review">${S.miss.map((m) => `<li>${m.img || m.emoji ? pic(m, "pic rv") : ""}<div>${wordsHTML(m.right)}</div></li>`).join("")}</ul></section>` : ""}`;
    bindWords();
    say(msg);
    document.getElementById("againBtn").onclick = () => {
      S.items = S.items.map((x) => x);
      S.i = 0;
      S.score = 0;
      S.miss = [];
      show();
    };
    document.getElementById("menuBtn").onclick = home;
    top0();
  }

  home();
})();
