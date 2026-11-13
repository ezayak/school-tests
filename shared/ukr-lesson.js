// Ukrainian language and reading lessons (Optima, Grade 3): «Українська мова» (Кравцова, Придаток, Романова, Ч. 1)
// and «Українська література» (А. Савчук «Українська мова та читання», Ч. 2). Everything on screen is in Ukrainian.
// <body data-view="list">   → the subject page: window.UA_LESSONS (lessons.js), a side bar with the book's sections, one card per lesson;
//                             on the reading page also «🚀 Складова ракета» (window.READINGS from texts.js, the shared/reading.js texts).
// <body data-view="lesson"> → one lesson: window.UA_LESSON (lesson-N.js). Home = the title and two tabs of tiles:
//   reading (L.texts):  📖 Текст   – one tile per text; the reader shows it whole, word by word or sentence by sentence
//                                    (the word / sentence in colour; ▶ goes on by itself at the 🐢 … 🐇 speed, ← → or a tap by hand;
//                                    🔊 reads each one aloud; a tap on a word starts there). Read to the end → ✓.
//                       ❓ Питання – one tile per group; a group shows its questions one at a time, as slides.
//   language (L.learn): 📘 Урок    – one tile per slide: the rule with the book's examples (← →).
//                       ✏️ Вправи  – one tile per group of exercises, one exercise at a time, with a strip of them on top.
// Rows of an exercise / question: {q, ch: [...], a} (choose; a: [..] = several), {q, word: "звуки", alt} (letter tiles),
// {q, order: [words], alt: [[...]]} (word tiles in order), {q, open: "model answer"} (said aloud, nothing to check).
// ✓ Готово checks; all right → done (saved on the device). 💡 Підказка = help lines, 📝 Відповідь = the answers.
// An item's mean (a proverb's meaning …) is shown in a box beside the choices.
// The page loads shared/common.js (Kit.dragTiles, Kit.voice), its lesson-N.js, then this file; styles: lesson.css, math-uk.css
// (the lesson layout shared with Optima Math), drag-words.css (tiles), ukr-lesson.css.
(function () {
  "use strict";
  const { esc, shuf } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "lesson";
  const HOME = "../../../index.html";
  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem(k);
        return v === null ? d : JSON.parse(v);
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    },
  };
  // finished lessons on this device, by page path (every text read and every exercise done)
  const COMPLETE = "ua-complete";
  const pageKey = (path) => new URL(path, location.href).pathname;
  // [word] → a highlighted word
  const kw = (t) => esc(t).replace(/\[([^\]]+)\]/g, '<b class="mu-kw">$1</b>');
  const plain = (t) => String(t ?? "").replace(/[[\]]/g, "");
  const top0 = () => window.scrollTo({ top: 0 });
  // 1 вправа, 2 вправи, 5 вправ
  const plural = (n, [one, few, many]) =>
    n % 10 === 1 && n % 100 !== 11
      ? one
      : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)
        ? few
        : many;

  /* ================= list of lessons ================= */
  if (view === "list") {
    const M = window.UA_LESSONS || { grade: 3, parts: [] };
    const R = window.READINGS;
    const complete = store.get(COMPLETE, {});
    const [w1, w2] = M.subject.split(" ");
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">← Усі ігри</a><span class="eyebrow">${esc(M.grade)} клас · ${esc(M.subject)}</span></div>
    <h1 class="hero-title"><span class="p">${esc(w1)}</span> <span class="k">${esc(w2 || "")}</span></h1>
    <p class="howto">${esc(M.intro || "")}</p>
  </section>
  <div id="secs"></div>
  <div class="soon">Нові уроки з’являться тут.</div>`;
    const secs = M.parts.map((p, i) => ({
      k: p.k || "part-" + (i + 1),
      ic: p.ic,
      t: p.tab || p.t,
      n: p.items.length,
      html: `<h2 class="mu-part">${esc(p.t)}</h2><div class="items">${p.items.map((it) => Kit.lessonCard({ ...it, done: complete[pageKey(it.path)] && "✓ Пройдено" }, "Урок")).join("")}</div>`,
    }));
    // the reading page: the syllable-rocket texts (shared/reading.js) are one more part
    if (R)
      secs.push({
        k: "rocket",
        ic: "🚀",
        t: "Складова ракета",
        n: R.items.length,
        html: `<h2 class="mu-part">Складова ракета</h2><p class="howto">${esc(R.intro || "")}</p><div class="items">${R.items.map((it) => Kit.lessonCard(it, "Текст")).join("")}</div>`,
      });
    Kit.sideNav(document.getElementById("secs"), secs);
    document.title = `${M.subject} · ${M.grade} клас`;
    return;
  }

  /* ================= one lesson ================= */
  const L = window.UA_LESSON;
  const SUBJ = L.subject;
  const K = "ua-" + L.key; // saved: tab, done exercises, chosen answers, texts read, reader settings
  const pic = (name) => `${L.img}${name}.jpg`;
  const V = Kit.voice("uk-UA");
  const sayAll = (t) => {
    V.hush();
    String(t)
      .split(/(?<=[.!?…:;])\s+/)
      .map((x) => x.trim())
      .filter((x) => /[\p{L}\d]/u.test(x))
      .forEach((x) => V.say(x));
  };
  const sayBtn = (id) =>
    V.ok
      ? `<button type="button" class="abtn mu-say" id="${id}" aria-label="Прочитати">🔊</button>`
      : "";
  const done = store.get(K + "-done", {});
  const vals = store.get(K + "-vals", {});
  const read = store.get(K + "-read", {});
  const TEXTS = L.texts || [];
  const LEARN = L.learn || [];
  // every exercise has an id: k, or its book number, or "group-place" (questions have no numbers)
  L.groups.forEach((g, gi) =>
    g.items.forEach(
      (it, k) =>
        (it.id = it.k || (it.n != null ? String(it.n) : `${gi + 1}-${k + 1}`)),
    ),
  );
  const finished = () =>
    TEXTS.every((_, i) => read[i]) &&
    L.groups.every((g) => g.items.every((it) => done[it.id]));
  const saveFinished = () => {
    if (!finished()) return false;
    const c = store.get(COMPLETE, {});
    c[pageKey(location.href)] = true;
    store.set(COMPLETE, c);
    return true;
  };
  const lit = TEXTS.length > 0;
  const TABS = lit
    ? [
        { k: "read", ic: "📖", t: "Текст", sub: "читаємо" },
        { k: "tasks", ic: "❓", t: "Питання", sub: "до тексту" },
      ]
    : [
        { k: "learn", ic: "📘", t: "Урок", sub: "правило" },
        { k: "tasks", ic: "✏️", t: "Вправи", sub: "з підручника" },
      ];
  let tab = store.get(K + "-tab", TABS[0].k);
  if (!TABS.some((t) => t.k === tab)) tab = TABS[0].k;
  document.title = `${L.title} · ${SUBJ}`;

  let keyFn = null; // the keys of the screen on show (the reader: ← → space)
  let stopFn = null; // stops the reader's timer
  document.addEventListener("keydown", (e) => {
    if (keyFn && keyFn(e)) e.preventDefault();
  });
  function leave() {
    V.hush();
    keyFn = null;
    if (stopFn) stopFn();
    stopFn = null;
  }
  const tile = (m, data) =>
    `<button type="button" class="mode${m.done ? " done" : ""}" ${data}><span class="mi-ic">${esc(m.ic)}</span><b>${esc(m.t)}</b><small>${esc(m.sub)}</small>${m.done ? '<span class="tick" aria-label="зроблено">✓</span>' : ""}</button>`;
  const hud = (t, count) =>
    `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="До уроку">←</button><span class="qnum">${esc(t)}</span>${count ? `<span class="count">${count}</span>` : ""}</div>`;
  const bindHome = () => (document.getElementById("homeBtn").onclick = home);

  /* ---------- home: tabs and tiles ---------- */
  function home() {
    leave();
    const unit = lit
      ? ["питання", "питання", "питань"]
      : ["вправа", "вправи", "вправ"];
    let tiles;
    if (tab === "read")
      tiles = TEXTS.map((x, i) =>
        tile(
          {
            ic: x.ic || "📖",
            t: x.t,
            sub: [x.kind, x.author].filter(Boolean).join(" · "),
            done: read[i],
          },
          `data-x="${i}" id="x-${i}"`,
        ),
      );
    else if (tab === "learn")
      tiles = LEARN.map((c, i) =>
        tile(
          { ic: c.ic || "📘", t: c.t, sub: `Слайд ${i + 1}` },
          `data-i="${i}" id="i-${i}"`,
        ),
      );
    else
      tiles = L.groups.map((g, gi) => {
        const n = g.items.length,
          d = g.items.filter((it) => done[it.id]).length;
        return tile(
          {
            ic: g.ic,
            t: g.t,
            sub: `${n} ${plural(n, unit)}${d && d < n ? ` · ✓ ${d}` : ""}`,
            done: d === n,
          },
          `data-g="${gi}" id="g-${gi}"`,
        );
      });
    app.innerHTML = `<section class="card pop mu-card">
    <div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="index.html">${esc(SUBJ)}</a></div></div>
    <div class="mu-head"><h1 class="les-title">${esc(L.title)}</h1><span class="les-sub">Урок ${esc(L.n)} · ${esc(L.pages)}</span>${saveFinished() ? '<span class="mu-fin">✓ Урок пройдено</span>' : ""}</div>
    <div class="tabbox"><div class="ftabs two" role="group" aria-label="Розділ">${TABS.map((t) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span>${esc(t.t)}<span class="sub">${esc(t.sub)}</span></button>`).join("")}</div>
      <div class="panel"><div class="modes">${tiles.join("")}</div></div></div>
  </section>`;
    app.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          store.set(K + "-tab", tab);
          home();
        }),
    );
    app
      .querySelectorAll("[data-x]")
      .forEach((b) => (b.onclick = () => reader(+b.dataset.x)));
    app
      .querySelectorAll("[data-i]")
      .forEach((b) => (b.onclick = () => slide(+b.dataset.i)));
    app.querySelectorAll("[data-g]").forEach(
      (b) =>
        (b.onclick = () => {
          const items = L.groups[+b.dataset.g].items;
          group(
            +b.dataset.g,
            Math.max(
              0,
              items.findIndex((it) => !done[it.id]),
            ),
          );
        }),
    );
  }

  /* ---------- 📖 Текст: the reader ---------- */
  // A text: {t, author, kind, ic, task, img, poem, paras}. A poem's paras are stanzas (arrays of lines), prose paras are strings.
  // Tokens: every piece between spaces; a token with a letter or a digit is a word (a stop of «По словах»).
  // A sentence ends after a token ending in . ! ? … (quotes and brackets after it count too).
  const MODES = [
    { k: "all", t: "📄 Увесь текст" },
    { k: "word", t: "👆 По словах" },
    { k: "sent", t: "📏 По реченнях" },
  ];
  // one word on the screen for so long at each speed (ms); a sentence: its words × this × 0.8
  const SPEED = [2600, 1900, 1400, 1000, 700];
  // A long text is shown a page at a time, so that one page fits a landscape tablet with the buttons under it.
  // x.pages: [[paras of page 1], …] sets the pages by hand; otherwise they are made here: a poem gets whole stanzas,
  // up to PAGE.lines lines a page; prose gets whole paragraphs, up to PAGE.chars letters a page, and a paragraph longer
  // than that is cut at the end of a sentence (the piece after the cut has no indent: {t, cont: true}).
  const PAGE = { lines: 16, chars: 480 };
  function paginate(x) {
    if (x.pages) return x.pages;
    const size = (q) => (x.poem ? q.length : (q.t || q).length);
    let paras = x.paras;
    if (!x.poem)
      paras = paras.flatMap((q) => {
        if (q.length <= PAGE.chars) return [q];
        const out = [""];
        q.split(/(?<=[.!?…][»")]*)\s+(?=[—«\p{Lu}])/u).forEach((sn) => {
          const last = out.length - 1;
          if (out[last] && out[last].length + sn.length > PAGE.chars)
            out.push(sn);
          else out[last] = out[last] ? out[last] + " " + sn : sn;
        });
        return out.map((t, i) => (i ? { t, cont: true } : t));
      });
    const pages = [[]];
    let n = 0;
    const max = x.poem ? PAGE.lines : PAGE.chars;
    paras.forEach((q) => {
      if (n && n + size(q) > max) {
        pages.push([]);
        n = 0;
      }
      pages[pages.length - 1].push(q);
      n += size(q);
    });
    return pages;
  }
  // each token knows its sentence (s) and page (p); a paragraph is {lines: [[token indexes]], cont}
  function tokens(x) {
    const out = [];
    let s = 0;
    let line = 0; // lines of a poem so far: an acrostic (x.acro) marks the first letter of the first x.acro lines (true: all)
    const pages = paginate(x).map((paras, p) =>
      paras.map((q) => ({
        cont: !!q.cont,
        lines: (x.poem ? q : [q.t || q]).map((l) => {
          const acro = x.poem && (x.acro === true || line++ < (x.acro || 0));
          return l
            .split(/\s+/)
            .filter(Boolean)
            .map((w, j) => {
              const i = out.length;
              out.push({
                w,
                word: /[\p{L}\d]/u.test(w),
                s,
                p,
                acro: acro && !j,
              });
              if (/[.!?…][»")]*$/.test(w)) s++;
              return i;
            });
        }),
      })),
    );
    return { toks: out, pages };
  }
  function reader(xi) {
    leave();
    const X = TEXTS[xi];
    const { toks, pages } = tokens(X);
    const words = toks.map((t, i) => (t.word ? i : -1)).filter((i) => i >= 0);
    const sents = [...new Set(toks.filter((t) => t.word).map((t) => t.s))];
    const set = store.get(K + "-reader", {});
    let mode = set.mode || "word";
    let level = set.level ?? 1;
    let loud = !!set.loud;
    let pos = -1; // the unit on show (-1: not started)
    let page = 0; // the page on show
    let playing = false;
    let run = 0; // the timer's generation: a new one stops the old one
    const save = () => store.set(K + "-reader", { mode, level, loud });
    const units = () => (mode === "word" ? words : sents);
    // a token's text: the space after it stays inside the span when the next one is in the same sentence and line,
    // so a sentence is coloured as one band
    const stanzas = (html) =>
      html
        .map(
          (st) =>
            `<div class="${X.poem ? "ur-stanza" : `ur-para${st.cont ? " cont" : ""}`}">${st.lines
              .map(
                (ws) =>
                  `<span class="ur-line">${ws
                    .map((i, j) => {
                      const t = toks[i];
                      const nx = j + 1 < ws.length ? toks[ws[j + 1]] : null;
                      // the space before a dash does not break: the dash stays at the end of its line
                      const sp = nx
                        ? nx.s === t.s
                          ? nx.w === "—"
                            ? "\u00A0"
                            : " "
                          : ""
                        : "";
                      return `<span class="ur-t${t.word ? " wd" : ""}" data-t="${i}" data-s="${t.s}"><span class="ur-nb">${t.acro ? `<b class="ur-acro">${esc(t.w[0])}</b>${esc(t.w.slice(1))}` : esc(t.w)}</span>${sp}</span>${nx && nx.s !== t.s ? " " : ""}`;
                    })
                    .join("")}</span>`,
              )
              .join(X.poem ? "" : " ")}</div>`,
        )
        .join("");
    // a poem with long lines is shown in one column
    const wide =
      X.poem && (X.pages || [X.paras]).flat(2).some((l) => l.length > 34);
    const textHTML = pages
      .map(
        (pg, p) =>
          `<div class="ur-page${X.poem ? ` poem${wide ? " wide" : ""}` : ""}" data-p="${p}">${stanzas(pg)}</div>`,
      )
      .join("");
    const many = pages.length > 1;
    app.innerHTML = `${hud(`📖 ${X.t}`, TEXTS.length > 1 ? `${xi + 1} / ${TEXTS.length}` : "")}<section class="card pop ur-card">
    ${X.task ? `<p class="ur-task">${kw(X.task)}</p>` : ""}
    <div class="ur-modes" role="group" aria-label="Як читати">${MODES.map((m) => `<button type="button" data-m="${m.k}" aria-pressed="${mode === m.k}">${m.t}</button>`).join("")}</div>
    <div class="ur-body${X.img ? "" : " one"}">
      <div class="ur-col">
        <div class="ur-text" id="txt">
          <h2 class="ur-title">${esc(X.t)}</h2>${X.author ? `<p class="ur-author">${esc(X.author)}</p>` : ""}
          ${textHTML}
        </div>
      </div>
      ${X.img ? `<img class="mu-pic ur-pic" src="${esc(pic(X.img))}" alt="">` : ""}
    </div>
    <div class="ur-bar">
      <div class="ur-ctl" id="ctl">
        <button type="button" class="btn ghost" id="backBtn" aria-label="Назад">←</button>
        <button type="button" class="btn" id="playBtn"></button>
        <button type="button" class="btn ghost" id="fwdBtn" aria-label="Далі">→</button>
        <span class="ur-speed" role="group" aria-label="Швидкість"><button type="button" class="abtn" id="slowBtn" aria-label="Повільніше">🐢</button><span class="ur-lv" id="lv"></span><button type="button" class="abtn" id="fastBtn" aria-label="Швидше">🐇</button></span>
        ${V.ok ? `<button type="button" class="abtn ur-loud" id="loudBtn" aria-pressed="${loud}">🔊 Вголос</button>` : ""}
        <button type="button" class="abtn" id="startBtn" aria-label="Спочатку">⏮</button>
      </div>
      ${many ? `<div class="ur-pnav"><button type="button" class="abtn" id="pgPrev" aria-label="Попередня сторінка">◀</button><span id="pgN"></span><button type="button" class="abtn" id="pgNext" aria-label="Наступна сторінка">▶</button></div>` : ""}
    </div>
    <div class="mu-fb" id="fb" aria-live="polite"></div>
    ${X.from ? `<span class="mu-from">📖 ${esc(X.from)}</span>` : ""}
  </section>`;
    bindHome();
    const txt = document.getElementById("txt");
    const pageEls = [...txt.querySelectorAll(".ur-page")];
    const spans = [...txt.querySelectorAll(".ur-t")];
    const fb = document.getElementById("fb");
    const playBtn = document.getElementById("playBtn");
    const ofUnit = (p) =>
      mode === "word"
        ? [spans[words[p]]]
        : spans.filter((el) => +el.dataset.s === sents[p]);
    const unitText = (p) =>
      ofUnit(p)
        .map((el) => el.textContent)
        .join("")
        .trim();
    function paint() {
      document.getElementById("ctl").hidden = mode === "all";
      txt.classList.toggle("follow", mode !== "all");
      app.querySelector(".ur-card").classList.toggle("follow", mode !== "all");
      document.getElementById("lv").textContent =
        "●".repeat(level + 1) + "○".repeat(SPEED.length - level - 1);
      playBtn.textContent = playing ? "⏸ Пауза" : "▶ Читати";
      app
        .querySelectorAll("[data-m]")
        .forEach((b) => b.setAttribute("aria-pressed", b.dataset.m === mode));
      spans.forEach((el) => el.classList.remove("on", "past"));
      // following the words: the page of the word / sentence on show
      const cur =
        mode === "all" || pos < 0
          ? null
          : ofUnit(Math.min(pos, units().length - 1));
      if (cur) page = toks[+cur[0].dataset.t].p;
      pageEls.forEach((el) => (el.hidden = +el.dataset.p !== page));
      if (many) {
        document.getElementById("pgN").textContent =
          `Сторінка ${page + 1} з ${pages.length}`;
        document.getElementById("pgPrev").disabled = page === 0;
        document.getElementById("pgNext").disabled = page === pages.length - 1;
      }
      if (!cur) return;
      const first = +cur[0].dataset.t;
      spans.forEach((el) => {
        if (+el.dataset.t < first) el.classList.add("past");
      });
      if (pos < units().length) {
        cur.forEach((el) => el.classList.add("on"));
        cur[0].scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else spans.forEach((el) => el.classList.add("past"));
    }
    function end() {
      playing = false;
      run++;
      read[xi] = true;
      store.set(K + "-read", read);
      fb.innerHTML = `<div class="fb ok"><b>🎉 Кінець! Текст прочитано.</b><span>${L.groups.length ? "Тепер — питання до тексту." : ""}</span>${L.groups.length ? '<button type="button" class="btn" id="toQ">❓ До питань →</button>' : ""}</div>`;
      const q = document.getElementById("toQ");
      if (q)
        q.onclick = () => {
          tab = "tasks";
          store.set(K + "-tab", tab);
          home();
        };
      paint();
    }
    // go to unit p (shows it, reads it aloud when 🔊 is on); past the last one → the end
    function go(p) {
      fb.innerHTML = "";
      pos = Math.max(0, p);
      if (pos >= units().length) return end();
      paint();
      if (loud && !playing) {
        V.hush();
        V.say(unitText(pos));
      }
    }
    // ▶: one unit after another; with 🔊 the next one waits for the voice too
    async function tick(gen) {
      if (gen !== run || !playing) return;
      const t0 = Date.now();
      const n =
        mode === "word"
          ? 1
          : ofUnit(pos).filter((el) => el.classList.contains("wd")).length;
      const len = mode === "word" ? unitText(pos).length : 0;
      const ms =
        mode === "word"
          ? SPEED[level] * Math.max(1, len / 6)
          : SPEED[level] * n * 0.8;
      if (loud) {
        V.hush();
        await V.say(unitText(pos));
        // the device voice may still be talking after say() gives up waiting
        for (
          let k = 0;
          k < 60 && window.speechSynthesis && speechSynthesis.speaking;
          k++
        )
          await new Promise((r) => setTimeout(r, 250));
        if (gen !== run) return;
      }
      setTimeout(
        () => {
          if (gen !== run || !playing) return;
          pos++;
          if (pos >= units().length) return end();
          paint();
          tick(gen);
        },
        Math.max(loud ? 350 : 0, ms - (Date.now() - t0)),
      );
    }
    function play(on) {
      playing = on;
      run++;
      V.hush();
      if (on) {
        fb.innerHTML = "";
        if (pos < 0 || pos >= units().length) pos = 0;
        paint();
        tick(run);
      } else paint();
    }
    stopFn = () => {
      playing = false;
      run++;
    };
    app.querySelectorAll("[data-m]").forEach(
      (b) =>
        (b.onclick = () => {
          // keep the place: the unit holding the first word on show
          const at =
            pos >= 0 && pos < units().length ? +ofUnit(pos)[0].dataset.t : -1;
          play(false);
          mode = b.dataset.m;
          save();
          pos =
            at < 0
              ? -1
              : mode === "word"
                ? words.findIndex((i) => i >= at)
                : sents.indexOf(toks[at].s);
          paint();
        }),
    );
    playBtn.onclick = () => play(!playing);
    // ◀ ▶ pages: the whole text just turns the page; following the words starts at the top of that page
    const turn = (d) => {
      const p = Math.min(pages.length - 1, Math.max(0, page + d));
      if (mode === "all") {
        page = p;
        return paint();
      }
      play(false);
      const at = toks.findIndex((t) => t.p === p && t.word);
      go(mode === "word" ? words.indexOf(at) : sents.indexOf(toks[at].s));
    };
    if (many) {
      document.getElementById("pgPrev").onclick = () => turn(-1);
      document.getElementById("pgNext").onclick = () => turn(1);
    }
    document.getElementById("fwdBtn").onclick = () => {
      play(false);
      go(pos + 1);
    };
    document.getElementById("backBtn").onclick = () => {
      play(false);
      go(Math.max(0, pos - 1));
    };
    document.getElementById("startBtn").onclick = () => {
      play(false);
      fb.innerHTML = "";
      pos = -1;
      paint();
      top0();
    };
    document.getElementById("slowBtn").onclick = () => {
      level = Math.max(0, level - 1);
      save();
      paint();
    };
    document.getElementById("fastBtn").onclick = () => {
      level = Math.min(SPEED.length - 1, level + 1);
      save();
      paint();
    };
    const lb = document.getElementById("loudBtn");
    if (lb)
      lb.onclick = () => {
        loud = !loud;
        lb.setAttribute("aria-pressed", loud);
        save();
        if (!loud) V.hush();
      };
    // a tap on a word: start there (whole text: just hear it); a tap elsewhere on the text: the next one
    txt.onclick = (e) => {
      const el = e.target.closest(".ur-t.wd");
      if (mode === "all") {
        if (el && V.ok) {
          V.hush();
          V.say(el.textContent.trim());
        }
        return;
      }
      const wasPlaying = playing;
      play(false);
      if (el) {
        const t = +el.dataset.t;
        go(mode === "word" ? words.indexOf(t) : sents.indexOf(toks[t].s));
        if (wasPlaying) play(true);
      } else go(pos + 1);
    };
    keyFn = (e) => {
      if (mode === "all") return false;
      if (e.key === "ArrowRight") document.getElementById("fwdBtn").click();
      else if (e.key === "ArrowLeft")
        document.getElementById("backBtn").click();
      else if (e.key === " ") playBtn.click();
      else return false;
      return true;
    };
    paint();
    top0();
  }

  /* ---------- 📘 Урок: one slide at a time ---------- */
  function slide(i) {
    leave();
    const n = LEARN.length;
    const c = LEARN[i];
    const vis =
      c.img || c.ex
        ? `<div class="mu-lv">${c.img ? `<img class="mu-pic" src="${esc(pic(c.img))}" alt="">` : ""}${c.ex ? `<div class="mu-ex ua-ex">${c.ex.map((x) => `<div>${kw(x)}</div>`).join("")}</div>` : ""}</div>`
        : "";
    app.innerHTML = `${hud("📘 Урок", `${i + 1} / ${n}`)}<section class="card pop mu-slide">
    <div class="mu-lh"><span class="mu-ic" aria-hidden="true">${esc(c.ic || "📘")}</span><h2>${esc(c.t)}</h2>${sayBtn("sq")}</div>
    <div class="mu-lb${vis ? "" : " one"}"><div class="mu-lt">${c.lines.map((l) => `<p>${kw(l)}</p>`).join("")}${c.text ? `<p class="mu-text">${esc(c.text)}</p>` : ""}</div>${vis}</div>
    ${c.from ? `<span class="mu-from">📖 ${esc(c.from)}</span>` : ""}
    <div class="dotsnav">${LEARN.map((_, k) => `<button type="button" class="dot${k === i ? " on" : ""}" data-go="${k}" aria-label="Слайд ${k + 1}"></button>`).join("")}</div>
    <div class="nav"><button type="button" class="btn ghost" id="prevBtn" aria-label="Назад"${i ? "" : " disabled"}>←</button><button type="button" class="btn" id="nextBtn" aria-label="${i + 1 < n ? "Далі" : "До уроку"}">${i + 1 < n ? "→" : "✓"}</button></div>
  </section>`;
    bindHome();
    const sq = document.getElementById("sq");
    if (sq)
      sq.onclick = () =>
        sayAll(
          plain([c.t, ...c.lines, c.text || "", ...(c.ex || [])].join(". ")),
        );
    app
      .querySelectorAll("[data-go]")
      .forEach((b) => (b.onclick = () => slide(+b.dataset.go)));
    document.getElementById("prevBtn").onclick = () => i && slide(i - 1);
    document.getElementById("nextBtn").onclick = () =>
      i + 1 < n ? slide(i + 1) : home();
    top0();
  }

  /* ---------- ✏️ Вправи / ❓ Питання: one at a time ---------- */
  const kindOf = (r) =>
    r.ch ? "ch" : r.word ? "word" : r.order ? "order" : "open";
  function group(gi, k) {
    leave();
    const G = L.groups[gi];
    const items = G.items;
    const it = items[k];
    const last = k === items.length - 1;
    const rows = (it.rows || []).map((r) => ({ ...r, kind: kindOf(r) }));
    const saved = vals[it.id] || {};
    const label = (x, j) => x.chip || (x.n != null ? `№${x.n}` : String(j + 1));
    const chips = () =>
      items
        .map(
          (x, j) =>
            `<button type="button" class="mu-chip${done[x.id] ? " done" : ""}${j === k ? " cur" : ""}" data-go="${j}" aria-label="${esc(label(x, j))}${done[x.id] ? ", зроблено" : ""}">${done[x.id] ? "✓ " : ""}${esc(label(x, j))}${x.hw ? '<span class="mu-hw" aria-label="домашнє">🏠</span>' : ""}</button>`,
        )
        .join("");
    const rowHTML = (r, ri) => {
      const q = r.q ? `<span class="mu-rq">${kw(r.q)}</span>` : "";
      if (r.kind === "ch") {
        const sel = saved[ri] || [];
        const multi = [].concat(r.a).length > 1;
        return `<div class="mu-row mu-qrow">${q}${multi ? '<span class="ua-many">Обери кілька.</span>' : ""}<span class="mu-chs">${r.ch.map((c) => `<button type="button" class="mu-ch${sel.includes(c) ? " on" : ""}" data-c="${ri}" data-v="${esc(c)}" data-multi="${multi}">${esc(c)}</button>`).join("")}</span></div>`;
      }
      if (r.kind === "word" || r.kind === "order")
        return `<div class="mu-row mu-qrow ua-tl">${q}<div class="line ua-line" id="L-${ri}"></div><div class="bank ua-bank" id="B-${ri}"></div></div>`;
      return `<div class="mu-row mu-qrow">${q}<p class="ua-open">🗣️ Скажи відповідь уголос. Тоді відкрий 📝 Відповідь і порівняй.</p></div>`;
    };
    const answerOf = (r) =>
      r.kind === "ch"
        ? [].concat(r.a).join(", ")
        : r.kind === "word"
          ? r.word
          : r.kind === "order"
            ? r.order.join(", ")
            : r.open;
    const solution = () =>
      `<div class="ua-sol">${rows.map((r) => `<div class="mu-sol">${r.q ? `<div>${kw(r.q)}</div>` : ""}<b>${esc(answerOf(r))}</b></div>`).join("")}${(it.x || []).map((x) => `<p>${kw(x)}</p>`).join("")}</div>`;
    const head =
      it.n != null
        ? `№ ${it.n}`
        : it.chip || (lit ? `Питання ${k + 1}` : `${k + 1}`);
    app.innerHTML = `${hud(`${G.ic} ${G.t}`, `${k + 1} / ${items.length}`)}<section class="card pop mu-taskcard${done[it.id] ? " is-done" : ""}">
    <div class="mu-strip">${chips()}</div>
    <div class="mu-task">
      <div class="mu-side">
        <div class="mu-qh"><span class="mu-num">${esc(head)}</span>${it.hw ? '<span class="mu-hwtag">🏠 домашнє</span>' : ""}${it.p ? `<span class="mu-pg">с. ${esc(it.p)}</span>` : ""}${sayBtn("sq")}</div>
        <p class="mu-q">${kw(it.q)}</p>
        ${it.tip ? `<p class="mu-tip">${kw(it.tip)}</p>` : ""}
        ${it.mean ? `<div class="ua-mean"><b>💭 Що означає</b><p>${kw(it.mean)}</p></div>` : ""}
        ${it.ic ? `<span class="ua-big" aria-hidden="true">${esc(it.ic)}</span>` : ""}
        ${it.img ? `<img class="mu-pic" src="${esc(pic(it.img))}" alt="">` : ""}
        <div class="mu-box" id="helpBox" hidden><b>💡 Підказка</b>${(it.help || []).map((h) => `<p>${kw(h)}</p>`).join("")}</div>
        <div class="mu-box" id="solBox" hidden><b>📝 Відповідь</b>${solution()}</div>
      </div>
      <div class="mu-main">
        <div class="mu-rows">${rows.map(rowHTML).join("")}</div>
        <div class="mu-acts">
          ${it.help ? '<button type="button" class="btn ghost" id="helpBtn">💡 Підказка</button>' : ""}
          <button type="button" class="btn ghost" id="solBtn">📝 Відповідь</button>
          <button type="button" class="btn" id="okBtn">✓ Готово</button>
        </div>
        <div class="mu-fb" id="fb" aria-live="polite">${done[it.id] ? '<div class="fb ok"><b>✓ Зроблено!</b></div>' : ""}</div>
        <div class="mu-nav">
          <button type="button" class="btn ghost" id="prevBtn"${k ? "" : " disabled"}>← Назад</button>
          <button type="button" class="btn" id="nextBtn">${last ? (lit ? "До питань ✓" : "До вправ ✓") : "Далі →"}</button>
        </div>
      </div>
    </div>
  </section>`;
    bindHome();
    const go = (j) => group(gi, j);
    const bindChips = () =>
      app
        .querySelectorAll("[data-go]")
        .forEach((b) => (b.onclick = () => go(+b.dataset.go)));
    bindChips();
    document.getElementById("prevBtn").onclick = () => k && go(k - 1);
    document.getElementById("nextBtn").onclick = () =>
      last ? home() : go(k + 1);
    const sq = document.getElementById("sq");
    if (sq)
      sq.onclick = () =>
        sayAll(
          plain(
            [
              it.q,
              it.tip || "",
              it.mean ? "Що означає: " + it.mean : "",
              ...rows.map((r) =>
                r.kind === "ch"
                  ? `${r.q || ""}. ${r.ch.join(". ")}`
                  : r.q || "",
              ),
            ]
              .filter(Boolean)
              .join(". "),
          ),
        );
    const toggle = (btn, box) => {
      const b = document.getElementById(btn),
        x = document.getElementById(box);
      if (b)
        b.onclick = () => {
          x.hidden = !x.hidden;
          b.classList.toggle("on", !x.hidden);
        };
    };
    toggle("helpBtn", "helpBox");
    toggle("solBtn", "solBox");
    const fb = document.getElementById("fb");
    const clear = () => (fb.innerHTML = "");
    const remember = () => {
      vals[it.id] = saved;
      store.set(K + "-vals", vals);
    };

    // tiles: the letters of a word / the words of an order, shuffled (never already in the right order)
    const boards = {};
    rows.forEach((r, ri) => {
      if (r.kind !== "word" && r.kind !== "order") return;
      const parts = r.kind === "word" ? [...r.word] : r.order.slice();
      let mixed = shuf(parts);
      for (let n = 0; n < 9 && mixed.join("|") === parts.join("|"); n++)
        mixed = shuf(parts);
      const Ln = document.getElementById("L-" + ri);
      boards[ri] = Kit.dragTiles(
        Ln,
        document.getElementById("B-" + ri),
        mixed.map((t) => ({ t })),
        {
          cls: r.kind === "word" ? "ua-let" : "ua-wd",
          ph:
            r.kind === "word" ? "Склади слово з букв" : "Перетягни слова сюди",
          onChange: () => {
            Ln.classList.remove("ok", "no");
            clear();
          },
        },
      );
    });
    app.querySelectorAll("[data-c]").forEach(
      (b) =>
        (b.onclick = () => {
          const id = b.dataset.c;
          const all = app.querySelectorAll(`[data-c="${id}"]`);
          all.forEach((x) => x.classList.remove("ok", "no"));
          if (b.dataset.multi !== "true")
            all.forEach((x) => x !== b && x.classList.remove("on"));
          b.classList.toggle("on");
          saved[id] = [...all]
            .filter((x) => x.classList.contains("on"))
            .map((x) => x.dataset.v);
          remember();
          clear();
        }),
    );

    // ✓ Готово: every answer right → done
    document.getElementById("okBtn").onclick = () => {
      let empty = 0,
        wrong = 0;
      rows.forEach((r, ri) => {
        if (r.kind === "open") return;
        if (r.kind === "ch") {
          const want = [].concat(r.a);
          const v = (saved[ri] || []).slice().sort();
          if (!v.length) return empty++;
          if (v.join("|") !== want.slice().sort().join("|")) wrong++;
          app
            .querySelectorAll(`[data-c="${ri}"].on`)
            .forEach((b) =>
              b.classList.add(want.includes(b.dataset.v) ? "ok" : "no"),
            );
          return;
        }
        const line = boards[ri].line.map((x) => x.t);
        const el = document.getElementById("L-" + ri);
        if (!line.length) return empty++;
        const ok =
          r.kind === "word"
            ? [r.word, ...(r.alt || [])].includes(line.join(""))
            : [r.order, ...(r.alt || [])].some(
                (o) => o.join("|") === line.join("|"),
              );
        if (!ok) wrong++;
        el.classList.add(ok ? "ok" : "no");
      });
      if (empty) {
        fb.innerHTML = `<div class="fb no"><span>Дай відповідь на кожне питання.</span></div>`;
        return;
      }
      if (wrong) {
        fb.innerHTML = `<div class="fb no"><b>Не все правильно</b><span>Спробуй ще раз. Можна подивитися 📝 Відповідь.</span></div>`;
        return;
      }
      done[it.id] = true;
      store.set(K + "-done", done);
      app.querySelector(".mu-taskcard").classList.add("is-done");
      app.querySelector(".mu-strip").innerHTML = chips();
      bindChips();
      const left = items.filter((x) => !done[x.id]).length;
      const unit = lit
        ? ["питання", "питання", "питань"]
        : ["вправа", "вправи", "вправ"];
      fb.innerHTML = `<div class="fb ok"><b>✓ Молодець!</b><span>${left ? `Тут залишилось: ${left} ${plural(left, unit)}.` : saveFinished() ? "🎉 Урок пройдено!" : lit ? "🎉 Усі питання тут зроблено!" : "🎉 Усі вправи тут зроблено!"}</span></div>`;
      document.getElementById("nextBtn").focus();
    };
    top0();
  }

  home();
})();
