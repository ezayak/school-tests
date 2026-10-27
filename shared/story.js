// English story engine (reading books). The page loads shared/common.js, its story-*.js (window.STORY), then this file.
// Made for a child with aphasia: the story reads itself (🔊 sentence by sentence, 🐢 word by word) and the word being read
// lights up; every page has one easy sentence; the vocabulary words show their meaning; every question has a picture and can be heard.
(function () {
  "use strict";
  const { esc, shuf, star } = Kit;
  const S = window.STORY;
  const app = document.getElementById("app");
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
  const KEY = S.key || "story";
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- voice (device voices, English) ---------- */
  const TTS = "speechSynthesis" in window;
  const RATE = 0.9,
    SLOW = 0.75;
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
    String(t ?? "")
      .replace(/[’‘]/g, "'")
      .replace(/[“”*]/g, "")
      .replace(/—/g, ", ")
      .replace(/\p{Extended_Pictographic}|️/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  let runId = 0, // a new reading (or Stop) makes the old one give up
    sayTimer = 0;
  const keep = [];
  function hush() {
    runId++;
    clearTimeout(sayTimer);
    marks();
    if (TTS)
      try {
        speechSynthesis.cancel();
      } catch (e) {}
  }
  // ends when the text has been said; onWord(charIndex) follows the voice where the device reports it
  function say(text, rate = RATE, onWord) {
    return new Promise((res) => {
      const t = speakable(text);
      if (!TTS || !t) {
        res();
        return;
      }
      clearTimeout(sayTimer);
      let busy = false;
      try {
        busy = speechSynthesis.speaking || speechSynthesis.pending;
        speechSynthesis.cancel();
      } catch (e) {}
      sayTimer = setTimeout(
        () => {
          try {
            if (!voice) pickVoice();
            const u = new SpeechSynthesisUtterance(t);
            u.lang = "en-US";
            if (voice) u.voice = voice;
            u.rate = rate;
            let done = false;
            const f = () => {
              if (done) return;
              done = true;
              res();
            };
            u.onend = f;
            u.onerror = f;
            if (onWord)
              u.onboundary = (e) => {
                if (!e.name || e.name === "word") onWord(e.charIndex);
              };
            setTimeout(f, 1500 + (t.length * 100) / rate); // some browsers never say "end"
            keep.push(u);
            if (keep.length > 6) keep.shift();
            try {
              speechSynthesis.resume();
            } catch (e) {}
            speechSynthesis.speak(u);
          } catch (e) {
            res();
          }
        },
        busy ? 160 : 40,
      ); // speaking right after cancel() is ignored by Chrome
    });
  }

  /* ---------- text: sentences of words you can tap ---------- */
  const bare = (t) =>
    t
      .replace(/[*“”"]/g, "")
      .replace(/^[‘'(]+|[’'),.!?:;—]+$/g, "")
      .toLowerCase();
  const gloss = (t) => (S.gloss || {})[bare(t)];
  // "Cody’s hand shot up. He …" → sentences; a sentence ends at . ! ? when the next word starts with a capital or a quote ("Mrs." doesn't end one)
  function sentences(p) {
    const toks = String(p).replace(/—/g, "— ").trim().split(/\s+/);
    const out = [];
    let cur = [];
    toks.forEach((t, i) => {
      cur.push(t);
      const next = toks[i + 1];
      if (
        /[.!?][”’"*]*$/.test(t) &&
        !/^(Mrs?|Dr)\.$/.test(t) &&
        (!next || /^[“"A-Z]/.test(next))
      ) {
        out.push(cur);
        cur = [];
      }
    });
    if (cur.length) out.push(cur);
    return out;
  }
  const wordHTML = (t) => {
    const g = gloss(t);
    const shown = esc(t).replace(/\*([^*]+)\*/g, "<i>$1</i>");
    return `<button type="button" class="w${g ? " vw" : ""}" data-say="${esc(t.replace(/[*“”"]/g, ""))}">${shown}</button>`;
  };
  // words glued by a dash ("Remember—real") stay without a space
  const sentHTML = (ws) =>
    `<span class="s">${ws.map((t) => wordHTML(t) + (/—$/.test(t) ? "" : " ")).join("")}</span>`;
  const textHTML = (p) => sentences(p).map(sentHTML).join("");
  function marks(on) {
    app
      .querySelectorAll(".s.on, .w.on, .line.on")
      .forEach((e) => e.classList.remove("on"));
    on && on.forEach((e) => e && e.classList.add("on"));
  }
  function showGloss(box, w) {
    if (!box) return;
    const g = gloss(w);
    box.hidden = !g;
    if (g)
      box.innerHTML = `<b>${esc(bare(w))}</b> = ${esc(g)} <button type="button" class="abtn sm" data-gsay>🔊</button>`;
    const b = box.querySelector("[data-gsay]");
    if (b)
      b.onclick = () => {
        hush();
        say(`${bare(w)}. ${g}`, SLOW);
      };
  }
  function bindWords(root, box) {
    root.querySelectorAll(".w").forEach(
      (b) =>
        (b.onclick = async () => {
          hush();
          const my = runId;
          marks([b]);
          showGloss(box, b.dataset.say);
          await say(b.dataset.say, SLOW);
          const g = gloss(b.dataset.say);
          if (g && my === runId) await say(g, SLOW);
          if (my === runId) marks();
        }),
    );
  }
  // reads the sentences one after another: "slow" = one word at a time, otherwise a sentence at a time
  async function read(sents, slow, done) {
    hush();
    const my = runId;
    for (const s of sents) {
      if (my !== runId) return;
      const ws = [...s.querySelectorAll(".w")];
      const line = s.closest(".line");
      s.scrollIntoView({ block: "nearest", behavior: "smooth" }); // long pages: keep the sentence on screen
      if (slow) {
        for (const w of ws) {
          if (my !== runId) return;
          marks([s, w, line]);
          await say(w.dataset.say, SLOW);
          await wait(/[.!?]["”’]*$/.test(w.dataset.say) ? 450 : 160);
        }
      } else {
        // the voice says the sentence in one go; the word it is on lights up where the device reports it
        let text = "";
        const at = ws.map((w) => {
          const t = speakable(w.dataset.say);
          const i = text.length;
          text += t + " ";
          return i;
        });
        marks([s, line]);
        await say(text, RATE, (ci) => {
          if (my !== runId) return;
          let k = 0;
          while (k + 1 < at.length && at[k + 1] <= ci) k++;
          marks([s, ws[k], line]);
        });
        await wait(250);
      }
    }
    if (my !== runId) return;
    marks();
    done && done();
  }

  /* ---------- page parts ---------- */
  function pic(it, cls = "pic") {
    if (it && it.img)
      return `<div class="${cls}"><img src="${esc(it.img)}" alt="" draggable="false"></div>`;
    // an animated emoji picture (Kit.scene) when the book has no picture for this page
    if (it && it.vis)
      return `<div class="${cls} vis">${it.vis.kind === "idiom" ? Kit.idiom(it.vis) : Kit.scene(it.vis)}</div>`;
    return `<div class="${cls} emo"><span>${esc((it && it.emoji) || "📖")}</span></div>`;
  }
  const opt = {
    turn: store.get(KEY + "-turn", "1") === "1", // go on to the next page by itself
    auto: store.get(KEY + "-auto", "1") === "1", // read each question when it shows
  };
  const chk = (k, label) =>
    `<label class="chk"><input type="checkbox" data-opt="${k}"${opt[k] ? " checked" : ""}> ${label}</label>`;
  function bindChecks(root) {
    root.querySelectorAll("[data-opt]").forEach(
      (c) =>
        (c.onchange = () => {
          opt[c.dataset.opt] = c.checked;
          store.set(KEY + "-" + c.dataset.opt, c.checked ? "1" : "0");
        }),
    );
  }
  const audioBtns = `<div class="audio"><button type="button" class="abtn big" data-read="0">🔊 <span>Read</span></button><button type="button" class="abtn" data-read="1">🐢 <span>Slow</span></button><button type="button" class="abtn" data-stop>⏹ <span>Stop</span></button></div>`;

  /* ---------- the page: header + 3 tabs ---------- */
  const TABS = [
    { k: "read", ic: "📖", t: "Read", sub: `${S.pages.length} pages` },
    { k: "sum", ic: "🗺️", t: "Summary", sub: `${S.summary.length} cards` },
    {
      k: "quiz",
      ic: "❓",
      t: "Questions",
      sub: `${S.questions.length} questions`,
    },
  ];
  let tab = store.get(KEY + "-tab", "read");

  // a tab change slides only the panel (theme.css: html[data-tabdir]); the pictures around it stay still.
  // dir: > 0 a tab on the right, < 0 on the left. Same function in every engine with lesson tabs.
  function tabSlide(dir, update) {
    if (
      !dir ||
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return update();
    const h = document.documentElement;
    h.dataset.tabdir = dir > 0 ? "next" : "prev";
    document
      .startViewTransition(update)
      .finished.finally(() => delete h.dataset.tabdir);
  }
  if (!TABS.some((t) => t.k === tab)) tab = "read";
  let pg = Math.min(+store.get(KEY + "-page", "0") || 0, S.pages.length - 1);

  app.innerHTML = `<section class="card">
    <div class="toprow"><div class="toplinks"><a class="back" href="../../../index.html">← All games</a><a class="back" href="index.html">English</a>${S.lesson ? `<a class="back" href="${esc(S.lesson.path)}">${esc(S.lesson.label)}</a>` : ""}</div></div>
    <div class="les-head"><span class="les-cov"><img src="${esc(S.cover)}" alt=""></span>
      <div><h1 class="les-title">${esc(S.title)}</h1><div class="les-sub">${esc(S.kind || "Story")}${S.by ? ` · by ${esc(S.by)}` : ""}</div>
      ${S.question ? `<p class="eq">❓ <b>Big question:</b> ${esc(S.question)}</p>` : ""}</div></div>
    <div class="tabbox"><div class="ftabs" role="group" aria-label="Story part">${TABS.map((t) => `<button type="button" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span>${esc(t.t)}<span class="sub">${esc(t.sub)}</span></button>`).join("")}</div>
      <div class="panel" id="panel"></div></div>
  </section>`;
  document.title = `${S.title} · English`;
  const panel = document.getElementById("panel");
  app
    .querySelectorAll("[data-tab]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          tabSlide(
            TABS.findIndex((t) => t.k === b.dataset.tab) -
              TABS.findIndex((t) => t.k === tab),
            () => show(b.dataset.tab),
          )),
    );
  function show(k) {
    hush();
    tab = k;
    store.set(KEY + "-tab", k);
    app
      .querySelectorAll("[data-tab]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.tab === k));
    ({ read: readTab, sum: sumTab, quiz: quizTab })[k]();
  }

  /* ---------- Read: one book page at a time ---------- */
  function readTab(go) {
    const P = S.pages[pg];
    const last = pg === S.pages.length - 1;
    const paras = (P.text || [])
      .map((p) =>
        typeof p === "string"
          ? `<p>${textHTML(p)}</p>`
          : `<div class="sbox"><b>${esc(p.box)}</b><p>${textHTML(p.p)}</p></div>`,
      )
      .join("");
    panel.innerHTML = `<div class="split wide">
      <div class="side">${pic(P, "pic story")}</div>
      <div class="main">
        ${P.ch ? `<div class="pg-ch">${esc(P.ch)}</div>` : ""}
        <div class="story-text">${paras}</div>
        ${P.easy ? `<div class="easy"><div class="easy-h"><b>💡 In easy words</b><span class="easy-btns"><button type="button" class="abtn sm" data-easy="0" aria-label="Read the easy words">🔊 <span>Read</span></button><button type="button" class="abtn sm" data-easy="1" aria-label="Read the easy words slowly">🐢</button></span></div><p>${textHTML(P.easy)}</p></div>` : ""}
        <div class="gloss" hidden></div>
        ${audioBtns}
        <div class="chks">${chk("turn", "Turn the pages by itself")}</div>
      </div></div>
    <div class="nav"><button type="button" class="btn" data-prev${pg ? "" : " disabled"} aria-label="Previous page">◀</button>
      <div class="dotsnav">${S.pages.map((_, i) => `<button type="button" class="dot${i === pg ? " on" : ""}" data-pg="${i}" aria-label="Page ${i + 1}"></button>`).join("")}</div>
      <button type="button" class="btn" data-next${last ? " disabled" : ""} aria-label="Next page">▶</button></div>
    ${last ? `<div class="row center"><button type="button" class="btn big" data-sum>The end! See the summary →</button></div>` : ""}`;
    const box = panel.querySelector(".gloss");
    bindWords(panel, box);
    bindChecks(panel);
    const goTo = (i, mode) => {
      hush();
      pg = i;
      store.set(KEY + "-page", i);
      readTab(mode);
      panel.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    const start = (slow) => {
      const sents = [...panel.querySelectorAll(".story-text .s")];
      read(sents, slow, () => {
        if (opt.turn && !last)
          setTimeout(() => goTo(pg + 1, slow ? "slow" : "read"), 900);
      });
    };
    panel
      .querySelectorAll("[data-read]")
      .forEach((b) => (b.onclick = () => start(b.dataset.read === "1")));
    // the easy words have their own buttons; they are not read with the page
    panel
      .querySelectorAll("[data-easy]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            read(
              [...panel.querySelectorAll(".easy .s")],
              b.dataset.easy === "1",
            )),
      );
    panel.querySelector("[data-stop]").onclick = hush;
    panel.querySelector("[data-prev]").onclick = () => goTo(pg - 1);
    panel.querySelector("[data-next]").onclick = () => goTo(pg + 1);
    panel
      .querySelectorAll("[data-pg]")
      .forEach((d) => (d.onclick = () => goTo(+d.dataset.pg)));
    const sb = panel.querySelector("[data-sum]");
    if (sb) sb.onclick = () => show("sum");
    if (go) start(go === "slow");
  }

  /* ---------- Summary: the story map, read aloud ---------- */
  function sumTab() {
    panel.innerHTML = `<p class="hint">The whole story in ${S.summary.length} cards. Tap 🔊 to hear it.</p>
    ${audioBtns}
    <div class="lines sum">${S.summary
      .map(
        (c, i) =>
          `<div class="line">${pic(c, "thumb")}<div class="said"><b class="sum-t">${esc(c.t)}</b><div>${textHTML(c.text)}</div></div><button type="button" class="abtn sm" data-one="${i}" aria-label="Read this card">🔊</button></div>`,
      )
      .join("")}</div>
    <div class="gloss" hidden></div>
    <div class="row center"><button type="button" class="btn big" data-quiz>Questions →</button></div>`;
    bindWords(panel, panel.querySelector(".gloss"));
    const lines = [...panel.querySelectorAll(".sum .line")];
    panel
      .querySelectorAll("[data-read]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            read(
              [...panel.querySelectorAll(".sum .s")],
              b.dataset.read === "1",
            )),
      );
    panel.querySelector("[data-stop]").onclick = hush;
    panel
      .querySelectorAll("[data-one]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            read([...lines[+b.dataset.one].querySelectorAll(".s")], false)),
      );
    panel.querySelector("[data-quiz]").onclick = () => show("quiz");
  }

  /* ---------- Questions: one at a time, try again until right ---------- */
  let Q = null;
  function quizTab() {
    Q = { i: 0, score: 0, miss: [], tries: 0 };
    ask();
  }
  function ask() {
    const it = S.questions[Q.i];
    const n = S.questions.length;
    Q.tries = 0;
    const tag = it.tag ? `<span class="qtype">${esc(it.tag)}</span>` : "";
    const body =
      it.type === "open"
        ? `<p class="hint">Think. Say your answer. Then look.</p><div class="row center"><button type="button" class="btn big" data-show>👀 Show the answer</button></div><div class="model" hidden></div>`
        : `<div class="opts">${shuf(it.o.map((t, k) => ({ t, ok: k === 0 })))
            .map(
              (o) =>
                `<div class="optrow"><button type="button" class="opt" data-ok="${o.ok ? 1 : 0}">${esc(o.t)}</button><button type="button" class="abtn sm" data-osay="${esc(o.t)}" aria-label="Hear this answer">🔊</button></div>`,
            )
            .join("")}</div>`;
    panel.innerHTML = `<div class="hud"><span class="qnum">Question ${Q.i + 1} / ${n}</span><span class="meter"><i style="width:${(Q.i / n) * 100}%"></i></span><span class="score">⭐ ${Q.score}</span></div>
    <div class="split pop">
      <div class="side">${pic(it, "pic card")}</div>
      <div class="main">${tag}<div class="q qtext">${textHTML(it.q)}</div>
        <div class="audio"><button type="button" class="abtn" data-read="0">🔊</button><button type="button" class="abtn" data-read="1">🐢</button></div>
        ${body}<div class="gloss" hidden></div><div class="fbx"></div>
        <div class="chks">${chk("auto", "Read each question to me")}</div></div>
    </div>`;
    bindWords(panel, panel.querySelector(".gloss"));
    bindChecks(panel);
    const qs = () => [...panel.querySelectorAll(".qtext .s")];
    panel
      .querySelectorAll("[data-read]")
      .forEach((b) => (b.onclick = () => read(qs(), b.dataset.read === "1")));
    panel.querySelectorAll("[data-osay]").forEach(
      (b) =>
        (b.onclick = () => {
          hush();
          say(b.dataset.osay, SLOW);
        }),
    );
    if (it.type === "open") bindOpen(it);
    else
      panel
        .querySelectorAll(".opt")
        .forEach((b) => (b.onclick = () => choose(b, it)));
    if (opt.auto) setTimeout(() => read(qs(), false), 350);
  }
  function choose(b, it) {
    hush();
    Q.tries++;
    if (b.dataset.ok !== "1") {
      b.classList.add("wrong");
      b.disabled = true;
      say("Try again.");
      return;
    }
    if (Q.tries === 1) Q.score++;
    else Q.miss.push(it);
    panel.querySelectorAll(".opt").forEach((o) => {
      o.disabled = true;
      if (o !== b) o.classList.add("dim");
    });
    b.classList.add("right");
    feedback(Q.tries === 1 ? "Yes! Well done!" : "Yes, that's it!", it.x);
  }
  function bindOpen(it) {
    panel.querySelector("[data-show]").onclick = (e) => {
      e.target.closest(".row").remove();
      const m = panel.querySelector(".model");
      m.hidden = false;
      m.innerHTML = `<b>A good answer:</b><div>${textHTML(it.a)}</div>
        <div class="row center"><button type="button" class="btn" data-knew="1">✅ I knew it</button><button type="button" class="btn ghost" data-knew="0">🔁 Not yet</button></div>`;
      bindWords(m, panel.querySelector(".gloss"));
      read([...m.querySelectorAll(".s")], false);
      m.querySelectorAll("[data-knew]").forEach(
        (b) =>
          (b.onclick = () => {
            if (b.dataset.knew === "1") Q.score++;
            else Q.miss.push(it);
            next();
          }),
      );
    };
  }
  function feedback(msg, x) {
    const f = panel.querySelector(".fbx");
    f.innerHTML = `<div class="fb ok"><b>${esc(msg)}</b>${x ? `<div>${textHTML(x)}</div>` : ""}</div><div class="row end"><button type="button" class="btn big" data-next>Next →</button></div>`;
    bindWords(f, panel.querySelector(".gloss"));
    f.querySelector("[data-next]").onclick = next;
    (async () => {
      await say(msg);
      if (x) read([...f.querySelectorAll(".s")], false);
    })();
  }
  function next() {
    hush();
    Q.i++;
    if (Q.i < S.questions.length) ask();
    else end();
  }
  function end() {
    const n = S.questions.length;
    const r = Q.score / n;
    const st = r >= 0.9 ? 3 : r >= 0.6 ? 2 : 1;
    const msg =
      st === 3
        ? "Super! You know the story!"
        : st === 2
          ? "Good job!"
          : "Good try! Let's read again.";
    panel.innerHTML = `<div class="end">
      <div class="big-score">${Q.score}<small> / ${n}</small></div>
      <div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div>
      <h2>${esc(msg)}</h2>
      <div class="row center"><button type="button" class="btn big" data-again>↺ Play again</button><button type="button" class="btn ghost" data-story>📖 Read the story</button></div></div>
    ${Q.miss.length ? `<h3>Let’s look again <small class="muted">(${Q.miss.length})</small></h3><ul class="review">${Q.miss.map((m) => `<li>${pic(m, "pic rv")}<div><div>${textHTML(m.q)}</div><b>${textHTML(m.type === "open" ? m.a : m.o[0])}</b></div></li>`).join("")}</ul><div class="gloss" hidden></div>` : ""}`;
    bindWords(panel, panel.querySelector(".gloss"));
    say(msg);
    panel.querySelector("[data-again]").onclick = quizTab;
    panel.querySelector("[data-story]").onclick = () => show("read");
  }

  show(tab);
})();
