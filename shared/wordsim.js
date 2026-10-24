// Mini Word: a pretend Microsoft Word for the Computer lessons (Grade 3 and Grade 4, chapter 2), made the same way as
// Mini Windows (grade-4/computer/chapter-1/winsim.js) so the lesson engine (shared/computer-lesson.js) can use it.
// WordSim.create(box, {start}) draws it inside box. Everything the child can press has data-t="<target>":
//   tabs "tab:Home" "tab:Insert" "tab:Review" "tab:View" "tab:File", Font group "font-name" → "font:Arial",
//   "font-size" → "size:14", "fmt:bold" "fmt:italic" "fmt:underline", "fmt:hl" / "hl-arrow" → "hl:yellow" "hl:none" "hl:stop",
//   "fmt:color" / "color-arrow" → "color:red", Paragraph "para:bullets" / "bullets-arrow" → "bullet:0", "para:numbering",
//   "align:left|center|right|justify", "edit:find" → "nav-search" (input), Insert "ins:symbol" → "sym:0",
//   Review "rev:spelling" → "sug:around" "ed:ignore1" "ed:ignoreall", Quick Access "qat-save" "qat-undo" "qat-redo",
//   File "file:save" "file:saveas" "file:print" "file-back", Save As "saveas:browse" → "dlg:nav:Documents" "dlg:filename" (input) "dlg:save",
//   Print "print:go", zoom "zoom-range" (slider) "zoom:in" "zoom:out", the words of the document "w:<paragraph>:<word>".
// Steps: {act: "click"|"dbl"|"select"|"type"|"key"|"slide"|"look", t, say}
//   select: {act: "select", t: "w:0:0", to: "w:0:2"} or t: "all" / "para:1"; type: {act: "type", t: "doc"|"nav-search"|"dlg:filename", text}
//   key: {act: "key", t: "key:Ctrl+B", key: "Ctrl+B"} (also "Enter", "Shift+Enter", "F7"); slide: {act: "slide", t: "zoom-range", min: 150}
// A start: {doc: "robots" | "robotsList" | "robotsMiss" | "oneParagraph" | "global" | "volcano" | "olympic",
//   sel: "all" | "para:0" | [p0, w0, p1, w1], caret: [p, w], tab: "Insert", fmt: [{r: [p0, w0, p1, w1], b: true, …}],
//   file: "saveas" | "print", nav: true, editor: true, saved: "Robots around us", zoom: 100}
(function () {
  "use strict";
  const SW = 960,
    SH = 540;
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const FONTS = [
    "Aptos",
    "Arial",
    "Calibri",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
  ];
  const FONTCSS = {
    Aptos: "Aptos, 'Segoe UI', system-ui, sans-serif",
    Arial: "Arial, Helvetica, sans-serif",
    Calibri: "Calibri, Carlito, 'Segoe UI', sans-serif",
    "Comic Sans MS": "'Comic Sans MS', 'Comic Neue', 'Chalkboard SE', cursive",
    "Courier New": "'Courier New', Courier, monospace",
    Georgia: "Georgia, serif",
    "Times New Roman": "'Times New Roman', Times, serif",
    Verdana: "Verdana, Geneva, sans-serif",
  };
  const SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36];
  const HL = [
    ["yellow", "#ffff00"],
    ["bright green", "#00ff00"],
    ["turquoise", "#00ffff"],
    ["pink", "#ff00ff"],
    ["blue", "#3b7bff"],
    ["red", "#ff3b3b"],
    ["dark blue", "#1f3a93"],
    ["teal", "#008080"],
    ["green", "#00a000"],
    ["violet", "#8a2be2"],
    ["dark red", "#a00000"],
    ["dark yellow", "#a0a000"],
    ["gray", "#9a9a9a"],
    ["light gray", "#d0d0d0"],
    ["black", "#000000"],
  ];
  const COLORS = [
    ["dark red", "#c00000"],
    ["red", "#ff0000"],
    ["orange", "#ffc000"],
    ["yellow", "#ffff00"],
    ["light green", "#92d050"],
    ["green", "#00b050"],
    ["light blue", "#00b0f0"],
    ["blue", "#0070c0"],
    ["dark blue", "#002060"],
    ["purple", "#7030a0"],
  ];
  const hlHex = (n) => (HL.find((x) => x[0] === n) || [0, n])[1];
  const colHex = (n) => (COLORS.find((x) => x[0] === n) || [0, n])[1];
  const SYMBOLS = [
    "☺",
    "★",
    "♥",
    "✓",
    "©",
    "™",
    "€",
    "£",
    "±",
    "≠",
    "÷",
    "×",
    "∞",
    "α",
    "π",
    "Ω",
    "☼",
    "♪",
  ];
  const BULLETS = ["•", "○", "■", "❖", "➢", "✓"];
  // a keyboard shortcut does the same as a button
  const KEYS = {
    "Ctrl+B": "fmt:bold",
    "Ctrl+I": "fmt:italic",
    "Ctrl+U": "fmt:underline",
    "Ctrl+Z": "qat-undo",
    "Ctrl+Y": "qat-redo",
    "Ctrl+F": "edit:find",
    "Ctrl+S": "qat-save",
    "Ctrl+L": "align:left",
    "Ctrl+E": "align:center",
    "Ctrl+R": "align:right",
    "Ctrl+J": "align:justify",
    F7: "rev:spelling",
  };
  const KEYOF = Object.fromEntries(
    Object.entries(KEYS).map(([k, v]) => [v, k]),
  );

  /* ---------- the documents the lessons start with (the book's texts) ---------- */
  const T_ROBOTS = [
    "Robots!",
    "Robots are all around us, helping with tasks to make our lives easier. We see them in many places in our city.",
    "There are robots that open doors, help doctors in hospitals, and work in factories. Some robots can even deliver packages.",
    "When I go to the mall, I often see robots, like:",
  ];
  const T_LIST = [
    { t: "Automatic doors that open when I walk toward them.", list: "bullet" },
    { t: "ATMs that let people take out money quickly.", list: "bullet" },
    { t: "Vending machines that provide snacks and drinks.", list: "bullet" },
    "These robots make everyday tasks faster and simpler, and we often use them without thinking about it.",
  ];
  const DOCS = {
    robots: { paras: T_ROBOTS },
    robotsList: { paras: [...T_ROBOTS, ...T_LIST] },
    robotsMiss: {
      paras: [
        T_ROBOTS[0],
        T_ROBOTS[1].replace("around", "arround"),
        ...T_ROBOTS.slice(2),
        ...T_LIST,
      ],
      miss: { arround: ["around", "about", "nearby", "near"] },
    },
    oneParagraph: {
      paras: [
        "Robots are all around us, helping with tasks to make our lives easier. We see them in many places in our city. There are robots that open doors, help doctors in hospitals, and work in factories. Some robots can even deliver packages.",
      ],
    },
    global: {
      paras: [
        "Every year, our planet is becoming hotter and hotter. This is called global warming, and it's changing the Earth. It is caused by humans doing things like cutting down trees and burning fossil fuels.",
      ],
    },
    volcano: {
      paras: [
        "A volcano is a mountain with a hole at the top, where hot materials from deep inside the Earth can emerge. Enormous volcanoes can change the Earth's climate. Here are three things that can come out of a volcano:",
      ],
    },
    olympic: {
      paras: [
        "The Olympic Games are the bigest international sporting event in the world, in which thousands of athletes take part. The ancient Olympic Games were held in Olympia, Greece. Today, the modern Olympics bring together nations from arond the world to celebrate sport and unity.",
      ],
      miss: {
        bigest: ["biggest", "bigots", "begets"],
        arond: ["around", "aroid", "Aron"],
      },
    },
    blank: { paras: [""] },
  };
  const bare = (t) =>
    String(t).replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  function makeDoc(key) {
    const d = DOCS[key] || DOCS.robots;
    return {
      name: "Document1",
      miss: d.miss || {},
      paras: d.paras.map((p) => {
        p = typeof p === "string" ? { t: p } : p;
        return {
          w: p.t
            .split(/\s+/)
            .filter(Boolean)
            .map((t) => ({ t })),
          align: p.align || "left",
          list: p.list || null,
          bul: p.bul || "•",
          tight: !!p.tight,
        };
      }),
    };
  }

  /* ---------- icons (also used on the lesson pages: WordSim.icon("bold")) ---------- */
  const sv = (d, vb = "0 0 20 20") =>
    `<svg viewBox="${vb}" aria-hidden="true">${d}</svg>`;
  const lines = (xs) =>
    xs
      .map(
        ([x1, x2], i) =>
          `<path d="M${x1} ${4 + i * 4}H${x2}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
      )
      .join("");
  const IC = {
    word: `<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="2" width="13" height="16" rx="2" fill="#41a5ee"/><rect x="5" y="2" width="13" height="5" rx="1" fill="#2b7cd3"/><rect x="2" y="5" width="10" height="10" rx="1.5" fill="#185abd"/><path d="M4 7.5l1.2 5 1.3-4 1.3 4 1.2-5" fill="none" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/></svg>`,
    paste: sv(
      '<rect x="4" y="3.5" width="12" height="14" rx="1.5" fill="#f4e3c0" stroke="#7a5b2b"/><rect x="7" y="2" width="6" height="3" rx="1" fill="#9a9a9a"/><rect x="8" y="8" width="8" height="10" rx="1" fill="#fff" stroke="#555"/>',
    ),
    bold: sv(
      '<text x="10" y="15" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="14" fill="currentColor">B</text>',
    ),
    italic: sv(
      '<text x="10" y="15" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="currentColor">I</text>',
    ),
    underline: sv(
      '<text x="10" y="13.5" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="currentColor">U</text><path d="M5 17H15" stroke="currentColor" stroke-width="1.5"/>',
    ),
    highlight: (c = "#ffff00") =>
      sv(
        `<path d="M6 12l6-8 3 2.2-6 8z" fill="#fff" stroke="#333" stroke-width="1.1" stroke-linejoin="round"/><path d="M6 12l3 2.2-2.6 1.3z" fill="#555"/><rect x="2" y="16.3" width="16" height="3" fill="${c}" stroke="#999" stroke-width=".4"/>`,
      ),
    fontcolor: (c = "#ff0000") =>
      sv(
        `<text x="10" y="13" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="currentColor">A</text><rect x="2" y="15.8" width="16" height="3.4" fill="${c}"/>`,
      ),
    bullets: sv(
      '<circle cx="3.5" cy="5" r="1.4" fill="currentColor"/><circle cx="3.5" cy="10" r="1.4" fill="currentColor"/><circle cx="3.5" cy="15" r="1.4" fill="currentColor"/><path d="M7 5H18M7 10H18M7 15H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ),
    numbering: sv(
      '<text x="1.5" y="7" font-size="5.5" font-family="Arial" fill="currentColor">1</text><text x="1.5" y="12" font-size="5.5" font-family="Arial" fill="currentColor">2</text><text x="1.5" y="17" font-size="5.5" font-family="Arial" fill="currentColor">3</text><path d="M7 5H18M7 10H18M7 15H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ),
    "align-left": sv(
      lines([
        [2, 18],
        [2, 12],
        [2, 18],
        [2, 12],
      ]),
    ),
    "align-center": sv(
      lines([
        [2, 18],
        [5, 15],
        [2, 18],
        [5, 15],
      ]),
    ),
    "align-right": sv(
      lines([
        [2, 18],
        [8, 18],
        [2, 18],
        [8, 18],
      ]),
    ),
    justify: sv(
      lines([
        [2, 18],
        [2, 18],
        [2, 18],
        [2, 18],
      ]),
    ),
    find: sv(
      '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11.8 11.8L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    ),
    replace: sv(
      '<text x="1" y="9" font-size="8" font-family="Arial" fill="#2b7cd3">b</text><text x="9" y="17" font-size="8" font-family="Arial" fill="#c33">c</text><path d="M4 12q0 5 5 5M14 8q0-5-5-5" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    ),
    select: sv(
      '<path d="M5 3l10 7-4.5 1 2.5 5-2 1-2.5-5L5 15z" fill="#fff" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
    ),
    symbol: sv(
      '<text x="10" y="16" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="currentColor">Ω</text>',
    ),
    spelling: sv(
      '<text x="1" y="9" font-size="7.5" font-family="Arial" font-weight="700" fill="currentColor">ABC</text><path d="M4 13l3.5 3.5L16 8" fill="none" stroke="#1c8f4e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    save: sv(
      '<path d="M3 3h11l3 3v11H3z" fill="#8a4fc8" stroke="#5d2f94" stroke-linejoin="round"/><rect x="6" y="3" width="7" height="5" fill="#fff"/><rect x="5.5" y="11" width="9" height="6" rx="1" fill="#fff"/>',
    ),
    undo: sv(
      '<path d="M6 7h7a4 4 0 010 8H8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M8 3.5L4.5 7 8 10.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    redo: sv(
      '<path d="M14 7H7a4 4 0 000 8h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 3.5L15.5 7 12 10.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    zoom: sv(
      '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11.8 11.8L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5.5 8h5M8 5.5v5" stroke="currentColor" stroke-width="1.4"/>',
    ),
    print: sv(
      '<rect x="5" y="2.5" width="10" height="5" fill="#fff" stroke="currentColor"/><rect x="2" y="7" width="16" height="7" rx="1.5" fill="#d9dde3" stroke="currentColor"/><rect x="5" y="11.5" width="10" height="6" fill="#fff" stroke="currentColor"/>',
    ),
    folder: sv(
      '<path d="M2 5.5a1 1 0 011-1h4.5l2 2H17a1 1 0 011 1V15a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#f6c343" stroke="#c8961d"/>',
    ),
    docfile: sv(
      '<path d="M5 2h7l4 4v12H5z" fill="#fff" stroke="#7a8796"/><rect x="3" y="8" width="8" height="7" rx="1" fill="#185abd"/><text x="7" y="13.7" text-anchor="middle" font-size="5.5" font-family="Arial" font-weight="700" fill="#fff">W</text>',
    ),
  };
  const ic = (n, arg) =>
    `<span class="wd-i">${typeof IC[n] === "function" ? IC[n](arg) : IC[n] || ""}</span>`;
  // for the lesson pages: a Word button ("bold", "highlight", …) or a key ("key:Ctrl+B")
  function icon(name) {
    if (String(name).startsWith("key:"))
      return `<span class="wd-keys">${String(name)
        .slice(4)
        .split("+")
        .map((k) => `<kbd>${esc(k)}</kbd>`)
        .join("<b>+</b>")}</span>`;
    return `<span class="wd-ic">${typeof IC[name] === "function" ? IC[name]() : IC[name] || ""}</span>`;
  }

  /* ================= one Mini Word ================= */
  function create(box, opts) {
    opts = opts || {};
    box.classList.add("wd-box");
    box.innerHTML = `<div class="wd-screen" tabindex="0" role="application" aria-label="Pretend Microsoft Word"></div>`;
    const scr = box.firstElementChild;
    let k = 1;
    const fit = () => {
      k = box.clientWidth / SW;
      scr.style.transform = `scale(${k})`;
      box.style.height = SH * k + "px";
    };
    fit();
    const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(box);
    else addEventListener("resize", fit);

    let st = null,
      mis = null,
      toastT = 0;
    const timers = new Set();
    const later = (fn, ms) => {
      const t = setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };

    /* ---------- state ---------- */
    function setup(start) {
      start = start || {};
      timers.forEach(clearTimeout);
      timers.clear();
      const doc = makeDoc(start.doc);
      st = {
        doc,
        sel: null,
        caret: null,
        tab: start.tab || "Home",
        menu: null,
        pen: null, // highlighter pen colour (Text Highlight Color with nothing selected)
        hlColor: "yellow",
        fontColor: "red",
        nav: start.nav ? { q: start.find || "" } : null,
        editor: null,
        file: start.file || null,
        dlg: null,
        saved: start.saved ? { name: start.saved, folder: "Documents" } : null,
        zoom: start.zoom || 100,
        undo: [],
        redo: [],
        toast: null,
        ignored: new Set(),
        tw: null, // the word being typed
        typed: "",
      };
      if (st.saved) doc.name = st.saved;
      (start.fmt || []).forEach((f) => {
        const [p0, w0, p1, w1] = f.r;
        eachIn({ a: { p: p0, w: w0 }, b: { p: p1, w: w1 } }, (w) => {
          for (const key of ["b", "i", "u", "hl", "c", "f", "s"])
            if (f[key] !== undefined) w[key] = f[key];
        });
      });
      if (start.sel) setSel(start.sel);
      const last = doc.paras.length - 1;
      st.caret = start.caret
        ? { p: start.caret[0], w: start.caret[1] }
        : { p: last, w: doc.paras[last].w.length - 1 };
      if (start.editor) openEditor();
      render();
    }
    function setSel(v) {
      const P = st.doc.paras;
      if (v === "all") {
        const lp = P.length - 1;
        st.sel = { a: { p: 0, w: 0 }, b: { p: lp, w: P[lp].w.length - 1 } };
      } else if (typeof v === "string" && v.startsWith("para:")) {
        const p = +v.slice(5);
        st.sel = { a: { p, w: 0 }, b: { p, w: P[p].w.length - 1 } };
      } else st.sel = { a: { p: v[0], w: v[1] }, b: { p: v[2], w: v[3] } };
    }
    const cmp = (x, y) => x.p - y.p || x.w - y.w;
    const range = (x, y) => (cmp(x, y) <= 0 ? { a: x, b: y } : { a: y, b: x });
    function eachIn(r, fn) {
      if (!r) return;
      const P = st.doc.paras;
      for (let p = r.a.p; p <= r.b.p; p++) {
        const ws = P[p].w;
        const w0 = p === r.a.p ? r.a.w : 0,
          w1 = p === r.b.p ? r.b.w : ws.length - 1;
        for (let w = Math.max(0, w0); w <= w1 && w < ws.length; w++)
          fn(ws[w], p, w);
      }
    }
    const inSel = (p, w) =>
      st.sel && cmp(st.sel.a, { p, w }) <= 0 && cmp({ p, w }, st.sel.b) <= 0;
    const selWords = () => {
      const a = [];
      eachIn(st.sel, (w) => a.push(w));
      return a;
    };
    const selParas = () => {
      if (st.sel) {
        const a = [];
        for (let p = st.sel.a.p; p <= st.sel.b.p; p++) a.push(p);
        return a;
      }
      return st.caret ? [st.caret.p] : [];
    };
    function snap() {
      st.undo.push(JSON.stringify({ paras: st.doc.paras }));
      if (st.undo.length > 60) st.undo.shift();
      st.redo = [];
    }
    function restore(json) {
      st.doc.paras = JSON.parse(json).paras;
      st.sel = null;
      const lp = st.doc.paras.length - 1;
      st.caret = { p: lp, w: st.doc.paras[lp].w.length - 1 };
      st.tw = null;
    }
    function toast(t, ms = 2200) {
      st.toast = t;
      clearTimeout(toastT);
      toastT = setTimeout(() => {
        if (st) {
          st.toast = null;
          render();
        }
      }, ms);
    }
    const missKey = (w) => bare(w.t).toLowerCase();
    const isMiss = (w, p, i) =>
      st.doc.miss[missKey(w)] &&
      !st.ignored.has(missKey(w)) &&
      !st.ignored.has(p + ":" + i);
    function nextMiss() {
      const P = st.doc.paras;
      for (let p = 0; p < P.length; p++)
        for (let i = 0; i < P[p].w.length; i++)
          if (isMiss(P[p].w[i], p, i)) return { p, w: i };
      return null;
    }
    function openEditor() {
      st.editor = { cur: nextMiss() };
      st.nav = null;
    }

    /* ---------- what the buttons do ---------- */
    function toggle(key) {
      const ws = selWords();
      if (!ws.length) {
        toast("Select the text first.");
        return;
      }
      snap();
      const on = !ws.every((w) => w[key]);
      ws.forEach((w) => (w[key] = on));
    }
    function setAll(key, v) {
      const ws = selWords();
      if (!ws.length) {
        toast("Select the text first.");
        return false;
      }
      snap();
      ws.forEach((w) => (w[key] = v));
      return true;
    }
    function insertWord(text) {
      snap();
      const c = st.caret || { p: 0, w: -1 };
      const ws = st.doc.paras[c.p].w;
      const near = ws[c.w] || ws[c.w + 1] || {};
      const w = {
        t: text,
        b: near.b,
        i: near.i,
        u: near.u,
        c: near.c,
        f: near.f,
        s: near.s,
      };
      ws.splice(c.w + 1, 0, w);
      st.caret = { p: c.p, w: c.w + 1 };
      st.sel = null;
      return w;
    }
    function typeChar(ch) {
      if (ch === " ") {
        st.tw = null;
        st.typed += " ";
        render();
        return;
      }
      if (st.sel) {
        // typing replaces the selected words
        snap();
        const { a, b } = st.sel;
        const P = st.doc.paras;
        if (a.p === b.p) P[a.p].w.splice(a.w, b.w - a.w + 1);
        else {
          const tail = P[b.p].w.slice(b.w + 1);
          P[a.p].w.splice(a.w);
          P[a.p].w.push(...tail);
          P.splice(a.p + 1, b.p - a.p);
        }
        st.caret = { p: a.p, w: a.w - 1 };
        st.sel = null;
        st.tw = null;
      }
      const c = st.caret;
      if (st.tw && c && st.tw.p === c.p && st.tw.w === c.w) {
        st.doc.paras[c.p].w[c.w].t += ch;
      } else {
        insertWord(ch);
        st.tw = { ...st.caret };
      }
      st.typed += ch;
      render();
    }
    function backspace() {
      const c = st.caret;
      if (!c) return;
      const P = st.doc.paras;
      if (st.typed) st.typed = st.typed.slice(0, -1);
      if (c.w < 0) {
        if (c.p === 0) return;
        snap();
        const prev = P[c.p - 1];
        const at = prev.w.length - 1;
        prev.w.push(...P[c.p].w);
        P.splice(c.p, 1);
        st.caret = { p: c.p - 1, w: at };
      } else {
        if (!st.tw) snap();
        const w = P[c.p].w[c.w];
        w.t = w.t.slice(0, -1);
        if (!w.t) {
          P[c.p].w.splice(c.w, 1);
          st.caret = { p: c.p, w: c.w - 1 };
          st.tw = null;
        }
      }
      render();
    }
    function enter(soft) {
      snap();
      const c = st.caret || { p: st.doc.paras.length - 1, w: -1 };
      const P = st.doc.paras;
      const cur = P[c.p];
      if (!soft && cur.list && !cur.w.length) {
        cur.list = null; // Enter on an empty bullet ends the list
      } else {
        const rest = cur.w.splice(c.w + 1);
        P.splice(c.p + 1, 0, {
          w: rest,
          align: cur.align,
          list: soft ? null : cur.list,
          bul: cur.bul,
          tight: !!soft,
        });
        st.caret = { p: c.p + 1, w: -1 };
      }
      st.sel = null;
      st.tw = null;
      st.typed = "";
    }
    function command(t) {
      const [cmd, arg] = [t.split(":")[0], t.slice(t.indexOf(":") + 1)];
      const wasMenu = st.menu;
      st.menu = null;
      switch (cmd) {
        case "tab":
          if (arg === "File") st.file = "home";
          else st.tab = arg;
          break;
        case "font-name":
          st.menu = wasMenu === "font" ? null : "font";
          break;
        case "font-size":
          st.menu = wasMenu === "size" ? null : "size";
          break;
        case "font":
          setAll("f", arg);
          break;
        case "size":
          setAll("s", +arg);
          break;
        case "fmt":
          if (arg === "bold") toggle("b");
          else if (arg === "italic") toggle("i");
          else if (arg === "underline") toggle("u");
          else if (arg === "hl") {
            if (st.sel) setAll("hl", st.hlColor);
            else st.pen = st.pen ? null : st.hlColor;
          } else if (arg === "color") setAll("c", st.fontColor);
          break;
        case "hl-arrow":
          st.menu = wasMenu === "hl" ? null : "hl";
          break;
        case "hl":
          if (arg === "stop") st.pen = null;
          else if (arg === "none") {
            if (st.sel) setAll("hl", null);
            st.pen = null;
          } else {
            st.hlColor = arg;
            if (st.sel) setAll("hl", arg);
            else st.pen = arg; // the highlighter pen: now select the text
          }
          break;
        case "color-arrow":
          st.menu = wasMenu === "color" ? null : "color";
          break;
        case "color":
          if (arg !== "auto") st.fontColor = arg;
          setAll("c", arg === "auto" ? null : arg);
          break;
        case "bullets-arrow":
          st.menu = wasMenu === "bullets" ? null : "bullets";
          break;
        case "bullet":
        case "para": {
          snap();
          const ps = selParas();
          if (cmd === "bullet") {
            ps.forEach((p) => {
              const P = st.doc.paras[p];
              if (arg === "none") P.list = null;
              else {
                P.list = "bullet";
                P.bul = BULLETS[+arg] || "•";
              }
            });
          } else {
            const kind = arg === "numbering" ? "number" : "bullet";
            const on = !ps.every((p) => st.doc.paras[p].list === kind);
            ps.forEach((p) => (st.doc.paras[p].list = on ? kind : null));
          }
          break;
        }
        case "align":
          snap();
          selParas().forEach((p) => (st.doc.paras[p].align = arg));
          break;
        case "edit":
          if (arg === "find") {
            st.nav = st.nav || { q: "" };
            st.editor = null;
          }
          break;
        case "nav-close":
          st.nav = null;
          break;
        case "ins":
          if (arg === "symbol")
            st.menu = wasMenu === "symbol" ? null : "symbol";
          break;
        case "sym":
          insertWord(SYMBOLS[+arg] || "☺");
          break;
        case "rev":
          if (arg === "spelling") openEditor();
          break;
        case "sug": {
          const m = st.editor && st.editor.cur;
          if (m) {
            snap();
            const w = st.doc.paras[m.p].w[m.w];
            const b = bare(w.t);
            w.t = w.t.replace(b, arg);
          }
          st.editor = { cur: nextMiss(), fixed: true };
          break;
        }
        case "ed": {
          const m = st.editor && st.editor.cur;
          if (m) {
            const w = st.doc.paras[m.p].w[m.w];
            st.ignored.add(arg === "ignoreall" ? missKey(w) : m.p + ":" + m.w);
          }
          st.editor = { cur: nextMiss() };
          break;
        }
        case "ed-close":
          st.editor = null;
          break;
        case "qat-undo":
          if (st.undo.length) {
            st.redo.push(JSON.stringify({ paras: st.doc.paras }));
            restore(st.undo.pop());
          }
          break;
        case "qat-redo":
          if (st.redo.length) {
            st.undo.push(JSON.stringify({ paras: st.doc.paras }));
            restore(st.redo.pop());
          }
          break;
        case "qat-save":
        case "file":
          if (cmd === "qat-save" || arg === "save") {
            if (st.saved) {
              st.file = null;
              toast(`✓ Saved: ${st.doc.name}.docx`);
            } else st.file = "saveas";
          } else st.file = arg; // saveas, print, home
          break;
        case "file-back":
          st.file = null;
          break;
        case "saveas":
          st.dlg = {
            folder: "This PC",
            name:
              bare(st.doc.paras[0].w.map((w) => w.t).join(" ")).slice(0, 30) ||
              "Document1",
          };
          break;
        case "dlg":
          if (arg.startsWith("nav:")) st.dlg.folder = arg.slice(4);
          else if (arg === "save") {
            const name = (st.dlg.name || "Document1").trim() || "Document1";
            st.saved = { name, folder: st.dlg.folder };
            st.doc.name = name;
            st.dlg = null;
            st.file = null;
            toast(`✓ Saved in ${st.saved.folder}: ${name}.docx`, 3000);
          } else if (arg === "cancel") st.dlg = null;
          break;
        case "print":
          st.file = null;
          toast("🖨️ Printing… ✓", 2600);
          break;
        case "zoom":
          st.zoom =
            arg === "in"
              ? Math.min(200, st.zoom + 10)
              : arg === "out"
                ? Math.max(50, st.zoom - 10)
                : 100;
          break;
        case "view":
          if (arg === "nav") st.nav = st.nav ? null : { q: "" };
          break;
      }
    }
    function doKey(key) {
      if (KEYS[key]) return command(KEYS[key]);
      if (key === "Ctrl+A") return setSel("all");
      if (key === "Enter") return enter(false);
      if (key === "Shift+Enter") return enter(true);
      if (key === "Backspace") return backspace();
      if (key === "Escape") {
        st.menu = null;
        st.dlg = null;
      }
    }
    function perform(kind, t, info) {
      if (kind === "select") {
        if (st.pen && st.sel) {
          setAll("hl", st.pen);
        }
      } else if (kind === "key") doKey(t.slice(4));
      else if (/^(w:|para:|page$)/.test(t)) {
        const pos = info && info.pos;
        st.menu = null;
        if (kind === "dbl" && pos && pos.w >= 0) {
          st.sel = { a: pos, b: pos };
          if (st.pen) setAll("hl", st.pen);
        } else if (pos) {
          st.sel = null;
          st.caret = pos;
          st.tw = null;
        }
      } else command(t);
      render();
    }

    /* ---------- drawing ---------- */
    const tabs = [
      "File",
      "Home",
      "Insert",
      "Draw",
      "Design",
      "Layout",
      "References",
      "Mailings",
      "Review",
      "View",
      "Help",
    ];
    const btn = (t, inner, cls = "", label = "") =>
      `<button type="button" class="wd-b ${cls}" data-t="${esc(t)}"${label ? ` aria-label="${esc(label)}"` : ""}>${inner}</button>`;
    const deco = (inner, cls = "") =>
      `<span class="wd-b deco ${cls}">${inner}</span>`;
    const big = (t, icn, label, cls = "") =>
      t
        ? btn(t, `${ic(icn)}<span>${label}</span>`, "big " + cls)
        : deco(`${ic(icn)}<span>${label}</span>`, "big " + cls);
    const group = (name, inner, cls = "") =>
      `<div class="wd-grp ${cls}"><div class="wd-gin">${inner}</div><div class="wd-gl">${name}</div></div>`;
    function curFmt() {
      const ws = selWords();
      const w0 =
        ws[0] || (st.caret && st.doc.paras[st.caret.p].w[st.caret.w]) || {};
      return {
        f: w0.f || "Aptos",
        s: w0.s || 12,
        b: ws.length && ws.every((w) => w.b),
        i: ws.length && ws.every((w) => w.i),
        u: ws.length && ws.every((w) => w.u),
        align: (st.doc.paras[selParas()[0]] || {}).align || "left",
        list: (st.doc.paras[selParas()[0]] || {}).list,
      };
    }
    function ribbon() {
      const f = curFmt();
      if (st.tab === "Home")
        return (
          group(
            "Clipboard",
            big(null, "paste", "Paste") +
              `<div class="wd-col">${deco("✂")}${deco("⧉")}${deco("🖌")}</div>`,
          ) +
          group(
            "Font",
            `<div class="wd-row">${btn("font-name", `<span class="nm" style="font-family:${FONTCSS[f.f]}">${esc(f.f)}</span><i class="wd-chev"></i>`, "box fontbox" + (st.menu === "font" ? " on" : ""), "Font")}${btn("font-size", `<span class="nm">${f.s}</span><i class="wd-chev"></i>`, "box sizebox" + (st.menu === "size" ? " on" : ""), "Font size")}${deco("A<sup>▲</sup>", "sm")}${deco("A<sup>▼</sup>", "sm")}${deco("Aa", "sm")}</div>
            <div class="wd-row">${btn("fmt:bold", ic("bold"), "sq" + (f.b ? " on" : ""), "Bold")}${btn("fmt:italic", ic("italic"), "sq" + (f.i ? " on" : ""), "Italic")}${btn("fmt:underline", ic("underline"), "sq" + (f.u ? " on" : ""), "Underline")}${deco("<s>ab</s>", "sm")}${deco("x<sub>2</sub>", "sm")}${deco("x<sup>2</sup>", "sm")}<span class="wd-sep"></span>${btn("fmt:hl", ic("highlight", hlHex(st.hlColor)), "sq" + (st.pen ? " on pen" : ""), "Text Highlight Color")}${btn("hl-arrow", '<i class="wd-chev"></i>', "arr" + (st.menu === "hl" ? " on" : ""), "Highlight colors")}${btn("fmt:color", ic("fontcolor", colHex(st.fontColor)), "sq", "Font Color")}${btn("color-arrow", '<i class="wd-chev"></i>', "arr" + (st.menu === "color" ? " on" : ""), "Font colors")}</div>`,
          ) +
          group(
            "Paragraph",
            `<div class="wd-row">${btn("para:bullets", ic("bullets"), "sq" + (f.list === "bullet" ? " on" : ""), "Bullets")}${btn("bullets-arrow", '<i class="wd-chev"></i>', "arr" + (st.menu === "bullets" ? " on" : ""), "Bullet library")}${btn("para:numbering", ic("numbering"), "sq" + (f.list === "number" ? " on" : ""), "Numbering")}${deco("⇤", "sm")}${deco("⇥", "sm")}${deco("A↓Z", "sm")}${deco("¶", "sm")}</div>
            <div class="wd-row">${["left", "center", "right", "justify"].map((a) => btn("align:" + a, ic(a === "justify" ? "justify" : "align-" + a), "sq" + (f.align === a ? " on" : ""), a === "justify" ? "Justify" : "Align " + a)).join("")}${deco("↕", "sm")}${deco("▤", "sm")}</div>`,
          ) +
          group(
            "Styles",
            `<div class="wd-styles"><span class="on">Normal</span><span>No Spacing</span><span class="h">Heading 1</span></div>`,
          ) +
          group(
            "Editing",
            `<div class="wd-col edit">${btn("edit:find", `${ic("find")}<span>Find</span>`, "line")}${deco(`${ic("replace")}<span>Replace</span>`, "line")}${deco(`${ic("select")}<span>Select</span>`, "line")}</div>`,
          )
        );
      if (st.tab === "Insert")
        return (
          group(
            "Pages",
            `<div class="wd-col">${deco("📄 Cover Page", "line")}${deco("▭ Blank Page", "line")}${deco("⤓ Page Break", "line")}</div>`,
          ) +
          group("Tables", big(null, "numbering", "Table")) +
          group(
            "Illustrations",
            `<div class="wd-row">${deco("🖼️<span>Pictures</span>", "big")}${deco("🔷<span>Shapes</span>", "big")}${deco("😀<span>Icons</span>", "big")}</div>`,
          ) +
          group("Links", big(null, "select", "Link")) +
          group(
            "Text",
            `<div class="wd-col">${deco("A Text Box", "line")}${deco("𝒜 WordArt", "line")}</div>`,
          ) +
          group(
            "Symbols",
            `<div class="wd-col">${deco("π Equation", "line")}${btn("ins:symbol", `${ic("symbol")}<span>Symbol</span><i class="wd-chev"></i>`, "line" + (st.menu === "symbol" ? " on" : ""))}</div>`,
          )
        );
      if (st.tab === "Review")
        return (
          group(
            "Proofing",
            `<div class="wd-row">${deco("✍️<span>Editor</span>", "big")}<div class="wd-col">${btn("rev:spelling", `${ic("spelling")}<span>Spelling and Grammar</span>`, "line")}${deco("📖 Thesaurus", "line")}${deco("🔢 Word Count", "line")}</div></div>`,
          ) +
          group("Speech", deco("🔊<span>Read Aloud</span>", "big")) +
          group(
            "Accessibility",
            deco("✔<span>Check Accessibility</span>", "big"),
          ) +
          group("Language", deco("🌐<span>Language</span>", "big")) +
          group(
            "Comments",
            `<div class="wd-col">${deco("💬 New Comment", "line")}${deco("🗑 Delete", "line")}</div>`,
          )
        );
      if (st.tab === "View")
        return (
          group(
            "Views",
            `<div class="wd-row">${deco("📖<span>Read Mode</span>", "big")}${deco("📄<span>Print Layout</span>", "big on")}${deco("🌐<span>Web Layout</span>", "big")}</div>`,
          ) +
          group(
            "Show",
            `<div class="wd-col">${deco("☐ Ruler", "line")}${deco("☐ Gridlines", "line")}${btn("view:nav", `${st.nav ? "☑" : "☐"} Navigation Pane`, "line")}</div>`,
          ) +
          group(
            "Zoom",
            `<div class="wd-row">${deco(`${ic("zoom")}<span>Zoom</span>`, "big")}${btn("zoom:100", "<b>100</b><span>100%</span>", "big")}${deco("📄<span>One Page</span>", "big")}</div>`,
          )
        );
      const other =
        {
          Draw: ["✏️ Draw", "🖊️ Pen", "🧽 Eraser"],
          Design: ["🎨 Themes", "🅰 Fonts", "🖌 Page Color"],
          Layout: ["📐 Margins", "🔄 Orientation", "📏 Size"],
          References: ["📑 Table of Contents", "¹ Footnote", "📚 Citation"],
          Mailings: ["✉️ Envelopes", "🏷 Labels", "📨 Mail Merge"],
          Help: ["❓ Help", "💬 Feedback", "🎓 Training"],
        }[st.tab] || [];
      return group(
        st.tab,
        `<div class="wd-row">${other.map((x) => deco(`${x.split(" ")[0]}<span>${x.split(" ").slice(1).join(" ")}</span>`, "big")).join("")}</div>`,
      );
    }
    function menus() {
      if (!st.menu) return "";
      if (st.menu === "font")
        return `<div class="wd-menu m-font"><div class="mh">All Fonts</div>${FONTS.map((n) => btn("font:" + n, `<span style="font-family:${FONTCSS[n]}">${esc(n)}</span>`, "mi")).join("")}</div>`;
      if (st.menu === "size")
        return `<div class="wd-menu m-size">${SIZES.map((n) => btn("size:" + n, String(n), "mi")).join("")}</div>`;
      if (st.menu === "hl")
        return `<div class="wd-menu m-hl"><div class="wd-sw">${HL.map(([n, h]) => btn("hl:" + n, "", "sw", n)).join("")}</div>${btn("hl:none", "No Color", "mi")}${btn("hl:stop", "Stop Highlighting", "mi" + (st.pen ? "" : " dim"))}</div>`.replace(
          /data-t="hl:([^"]+)" aria-label="[^"]*"><\/button>/g,
          (m, n) =>
            m.replace(
              "></button>",
              ` style="background:${hlHex(n)}"></button>`,
            ),
        );
      if (st.menu === "color")
        return `<div class="wd-menu m-color">${btn("color:auto", "■ Automatic", "mi")}<div class="mh">Standard Colors</div><div class="wd-sw">${COLORS.map(([n]) => btn("color:" + n, "", "sw", n)).join("")}</div></div>`.replace(
          /data-t="color:([^"]+)" aria-label="[^"]*"><\/button>/g,
          (m, n) =>
            m.replace(
              "></button>",
              ` style="background:${colHex(n)}"></button>`,
            ),
        );
      if (st.menu === "bullets")
        return `<div class="wd-menu m-bul"><div class="mh">Bullet Library</div><div class="wd-sw">${btn("bullet:none", "None", "bl")}${BULLETS.map((b, i) => btn("bullet:" + i, esc(b), "bl")).join("")}</div></div>`;
      if (st.menu === "symbol")
        return `<div class="wd-menu m-sym"><div class="wd-sw">${SYMBOLS.map((s, i) => btn("sym:" + i, esc(s), "sy")).join("")}</div><span class="mi dim">Ω More Symbols…</span></div>`;
      return "";
    }
    function wordStyle(w) {
      const s = [];
      if (w.f) s.push(`font-family:${FONTCSS[w.f] || w.f}`);
      if (w.s) s.push(`font-size:${(w.s / 12).toFixed(3)}em`);
      if (w.c) s.push(`color:${colHex(w.c)}`);
      if (w.hl) s.push(`background:${hlHex(w.hl)}`);
      return s.join(";");
    }
    function page() {
      const P = st.doc.paras;
      const q = st.nav && st.nav.q.trim().toLowerCase();
      const cur = st.editor && st.editor.cur;
      let num = 0;
      return P.map((para, p) => {
        num = para.list === "number" ? num + 1 : 0;
        const lead =
          para.list === "bullet"
            ? `<span class="wd-lead">${esc(para.bul || "•")}</span>`
            : para.list === "number"
              ? `<span class="wd-lead">${num}.</span>`
              : "";
        const caretAt =
          st.caret && st.caret.p === p && !st.sel ? st.caret.w : -2;
        const ws = para.w
          .map((w, i) => {
            const cls = ["wd-w"];
            if (w.b) cls.push("b");
            if (w.i) cls.push("i");
            if (w.u) cls.push("u");
            if (isMiss(w, p, i)) cls.push("miss");
            if (inSel(p, i)) cls.push("sel");
            if (q && q.length > 1 && bare(w.t).toLowerCase().includes(q))
              cls.push("found");
            if (cur && cur.p === p && cur.w === i) cls.push("cur");
            const sp =
              i < para.w.length - 1
                ? `<span class="wd-sp${inSel(p, i) && inSel(p, i + 1) ? " sel" : ""}"> </span>`
                : "";
            return `<span class="${cls.join(" ")}" data-t="w:${p}:${i}" style="${wordStyle(w)}">${esc(w.t)}${caretAt === i ? '<i class="wd-caret"></i>' : ""}</span>${sp}`;
          })
          .join("");
        return `<div class="wd-p a-${para.align}${para.tight ? " tight" : ""}${para.list ? " li" : ""}" data-t="para:${p}">${lead}${caretAt === -1 ? '<i class="wd-caret"></i>' : ""}${ws || "&#8203;"}</div>`;
      }).join("");
    }
    function navPane() {
      if (!st.nav) return "";
      const q = st.nav.q.trim().toLowerCase();
      const hits = [];
      if (q.length > 1)
        st.doc.paras.forEach((para, p) => {
          if (para.w.some((w) => bare(w.t).toLowerCase().includes(q)))
            hits.push(
              para.w
                .map((w) =>
                  bare(w.t).toLowerCase().includes(q)
                    ? `<b>${esc(w.t)}</b>`
                    : esc(w.t),
                )
                .join(" "),
            );
        });
      const n =
        q.length > 1
          ? st.doc.paras.reduce(
              (a, para) =>
                a +
                para.w.filter((w) => bare(w.t).toLowerCase().includes(q))
                  .length,
              0,
            )
          : 0;
      return `<div class="wd-nav"><div class="wd-ph"><b>Navigation</b>${btn("nav-close", "✕", "x", "Close")}</div>
        <div class="wd-search">${ic("find")}<input type="text" data-t="nav-search" value="${esc(st.nav.q)}" placeholder="Search document" autocomplete="off" spellcheck="false"></div>
        <div class="wd-res">${q.length > 1 ? `<div class="cnt">${n} result${n === 1 ? "" : "s"}</div><div class="wd-rt"><span>Headings</span><span>Pages</span><span class="on">Results</span></div>${hits.map((h) => `<div class="hit">${h}</div>`).join("")}` : '<div class="cnt muted">Type a word to find it.</div>'}</div></div>`;
    }
    function editorPane() {
      if (!st.editor) return "";
      const m = st.editor.cur;
      const left = (() => {
        let n = 0;
        st.doc.paras.forEach((para, p) =>
          para.w.forEach((w, i) => isMiss(w, p, i) && n++),
        );
        return n;
      })();
      if (!m)
        return `<div class="wd-ed"><div class="wd-ph"><b>Editor</b>${btn("ed-close", "✕", "x", "Close")}</div><div class="wd-done">✅<b>All done!</b><span>No more suggestions. Your text looks good.</span></div></div>`;
      const para = st.doc.paras[m.p];
      const w = para.w[m.w];
      const sugs = st.doc.miss[missKey(w)] || [];
      const ctx = para.w
        .slice(Math.max(0, m.w - 3), m.w + 4)
        .map((x) => (x === w ? `<b class="bad">${esc(x.t)}</b>` : esc(x.t)))
        .join(" ");
      return `<div class="wd-ed"><div class="wd-ph"><b>Editor</b>${btn("ed-close", "✕", "x", "Close")}</div>
        <div class="wd-left">${left} remaining</div><div class="wd-kind"><b>Spelling</b><span>Not in Dictionary</span></div>
        <div class="wd-ctx">…${ctx}…</div><div class="wd-cons">Consider:</div>
        <div class="wd-sugs">${sugs.map((s, i) => btn("sug:" + s, esc(s), "sug" + (i ? "" : " first"))).join("")}</div>
        <div class="wd-ign">${btn("ed:ignore1", "⊘ Ignore once", "line")}${btn("ed:ignoreall", "⊘ Ignore all", "line")}${deco("📕 Add to dictionary", "line")}</div></div>`;
    }
    function backstage() {
      if (!st.file) return "";
      const nav = [
        ["home", "🏠 Home"],
        [null, "📄 New"],
        [null, "📂 Open"],
        ["-"],
        [null, "Get Add-ins"],
        [null, "Info"],
        ["save", "Save"],
        ["saveas", "Save As"],
        ["print", "Print"],
        [null, "Export"],
        [null, "Close"],
      ];
      let main = "";
      if (st.file === "saveas")
        main = `<h2>Save As</h2><div class="wd-sa"><div class="locs"><span class="lh">Personal</span>${deco("☁️ OneDrive - Personal", "loc")}<span class="lh">Other locations</span>${deco("💻 This PC", "loc")}${deco("➕ Add a Place", "loc")}${btn("saveas:browse", `${ic("folder")}<span>Browse</span>`, "loc browse")}</div><div class="right"><div class="path">📁 OneDrive</div><div class="fake">Enter file name here</div><div class="fake">Word Document (*.docx)</div></div></div>`;
      else if (st.file === "print")
        main = `<h2>Print</h2><div class="wd-pr"><div class="opts"><div class="row">${btn("print:go", `${ic("print")}<span>Print</span>`, "printbtn")}<span class="copies">Copies: <b>1</b></span></div><div class="lh">Printer</div><div class="fake">🖨️ Printer · Ready</div><div class="lh">Settings</div><div class="fake">Print All Pages</div><div class="fake">Print One Sided</div><div class="fake">Collated 1,2,3</div></div><div class="prev"><div class="sheet">${st.doc.paras.map((p) => `<p class="a-${p.align}">${esc(p.w.map((w) => w.t).join(" "))}</p>`).join("")}</div></div></div>`;
      else
        main = `<h2>Good afternoon</h2><div class="wd-new">${deco('<span class="blank"></span><span>Blank document</span>', "tpl")}</div><div class="lh">Recent</div><div class="fake">${ic("docfile")} ${esc(st.doc.name)}.docx</div>`;
      return `<div class="wd-file"><div class="fnav">${btn("file-back", "⬅", "back", "Back")}${nav.map(([k, t]) => (k === "-" ? '<span class="sep"></span>' : k ? btn("file:" + k, t, st.file === k ? "on" : "") : `<span class="fi2">${t}</span>`)).join("")}</div><div class="fmain">${main}</div></div>`;
    }
    function dialog() {
      if (!st.dlg) return "";
      const fs = ["Downloads", "Documents", "Pictures", "Music", "Videos"];
      return `<div class="wd-dlg"><div class="bar">${ic("word")}<b>Save As</b>${btn("dlg:cancel", "✕", "x", "Close")}</div>
        <div class="crumb">← → ↑ &nbsp; 📁 › <b>${esc(st.dlg.folder)}</b></div>
        <div class="body"><div class="side">${fs.map((f) => btn("dlg:nav:" + f, `${ic("folder")}<span>${f}</span>`, "fl" + (st.dlg.folder === f ? " on" : ""))).join("")}</div><div class="files">${st.dlg.folder === "Documents" ? '<span class="muted">No items match your search.</span>' : ""}</div></div>
        <div class="fields"><label>File name:</label><input type="text" data-t="dlg:filename" value="${esc(st.dlg.name)}" autocomplete="off" spellcheck="false"><label>Save as type:</label><span class="fake">Word Document (*.docx)</span></div>
        <div class="btns">${btn("dlg:save", "Save", "pri")}${btn("dlg:cancel", "Cancel", "")}</div></div>`;
    }
    function render() {
      if (!st) return;
      // keep the focus and the text cursor of an input while it is drawn again
      const a = document.activeElement;
      const keep =
        a && scr.contains(a) && a.tagName === "INPUT" && a.type === "text"
          ? { t: a.dataset.t, s: a.selectionStart, e: a.selectionEnd }
          : null;
      const words = st.doc.paras.reduce((n, p) => n + p.w.length, 0);
      scr.innerHTML = `<div class="wd-title">${ic("word")}<span class="as">AutoSave <i class="tg"></i> Off</span>${btn("qat-save", ic("save"), "q", "Save")}${btn("qat-undo", ic("undo"), "q" + (st.undo.length ? "" : " dim"), "Undo")}${btn("qat-redo", ic("redo"), "q" + (st.redo.length ? "" : " dim"), "Redo")}<span class="nm">${esc(st.doc.name)} - Word</span><span class="srch">${ic("find")} Search</span><span class="me">BA</span><span class="wc">— ☐ ✕</span></div>
      <div class="wd-tabs">${tabs.map((t) => btn("tab:" + t, t, "tab" + (st.tab === t && t !== "File" ? " on" : "") + (t === "File" ? " file" : ""))).join("")}<span class="cmt">💬 Comments</span></div>
      <div class="wd-ribbon">${ribbon()}</div>
      <div class="wd-body">${navPane()}<div class="wd-area${st.pen ? " pen" : ""}" data-t="page"><div class="wd-page" style="font-size:${(15 * st.zoom) / 100}px">${page()}</div></div>${editorPane()}</div>
      <div class="wd-status"><span>Page 1 of 1</span><span>${words} words</span><span class="views">📖 📄 🌐</span>${btn("zoom:out", "−", "z", "Zoom out")}<input type="range" data-t="zoom-range" min="50" max="200" step="10" value="${st.zoom}" aria-label="Zoom">${btn("zoom:in", "+", "z", "Zoom in")}<span class="pct">${st.zoom}%</span></div>
      ${menus()}${backstage()}${dialog()}
      ${st.toast ? `<div class="wd-toast">${esc(st.toast)}</div>` : ""}
      <div class="wd-cursor${mis && mis.mode === "demo" ? " show" : ""}" aria-hidden="true" style="left:${cur.x}px;top:${cur.y}px"><svg viewBox="0 0 24 24"><path d="M3 2l15 11-7 1-3 7z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
      if (keep) {
        const el = scr.querySelector(`input[data-t="${keep.t}"]`);
        if (el) {
          el.focus({ preventScroll: true });
          try {
            el.setSelectionRange(keep.s, keep.e);
          } catch (e) {}
        }
      }
      // an open list sits under its button
      const mEl = scr.querySelector(".wd-menu");
      const anchor = {
        font: "font-name",
        size: "font-size",
        hl: "hl-arrow",
        color: "color-arrow",
        bullets: "bullets-arrow",
        symbol: "ins:symbol",
      }[st.menu];
      const aEl = anchor && find(anchor);
      if (mEl && aEl) {
        const c = center(aEl);
        const h = aEl.offsetHeight;
        mEl.style.left =
          Math.max(
            4,
            Math.min(
              SW - mEl.offsetWidth - 4,
              c.x -
                (anchor === "font-name" || anchor === "font-size"
                  ? aEl.offsetWidth / 2
                  : 20),
            ),
          ) + "px";
        mEl.style.top = c.y + h / 2 + 2 + "px";
      }
      if (mis && mis.glowing) glow(true);
    }

    /* ---------- the child's pointer and keyboard ---------- */
    const cur = { x: SW / 2, y: SH / 2 };
    const toScr = (cx, cy) => {
      const r = scr.getBoundingClientRect();
      return { x: (cx - r.left) / k, y: (cy - r.top) / k };
    };
    function center(el) {
      const r = el.getBoundingClientRect(),
        s = scr.getBoundingClientRect();
      return {
        x: (r.left + r.width / 2 - s.left) / k,
        y: (r.top + r.height / 2 - s.top) / k,
      };
    }
    // the place in the text under the finger: a word, the end of a paragraph, or the end of the text
    function posAt(cx, cy) {
      const el = document.elementFromPoint(cx, cy);
      if (!el || !scr.contains(el)) return null;
      const w = el.closest(".wd-w");
      if (w) {
        const [, p, i] = w.dataset.t.split(":");
        return { p: +p, w: +i };
      }
      const pa = el.closest(".wd-p");
      if (pa) {
        const p = +pa.dataset.t.split(":")[1];
        return { p, w: st.doc.paras[p].w.length - 1 };
      }
      if (el.closest(".wd-area")) {
        const p = st.doc.paras.length - 1;
        return { p, w: st.doc.paras[p].w.length - 1 };
      }
      return null;
    }
    const docStep = (s) =>
      s &&
      (s.act === "select" ||
        s.act === "type" ||
        ((s.act === "click" || s.act === "dbl") &&
          /^(w|para|page)/.test(s.t || "")));
    let press = null,
      clicks = { t: "", n: 0, time: 0 },
      raf = 0;
    scr.addEventListener("pointerdown", (e) => {
      if (e.button === 2) return;
      const inp = e.target.closest("input");
      if (inp) {
        if (mis && mis.mode === "demo") e.preventDefault();
        return;
      }
      const textEl = e.target.closest(".wd-area");
      const el = e.target.closest("[data-t]");
      if (!el) return;
      e.preventDefault();
      scr.focus({ preventScroll: true });
      if (textEl && !e.target.closest(".wd-menu")) {
        if (mis && (mis.mode === "demo" || mis.busy)) return;
        if (mis && mis.mode === "try" && !docStep(mis.steps[mis.i])) {
          wrong(mis.steps[mis.i], "place", toScr(e.clientX, e.clientY));
          return;
        }
        const pos = posAt(e.clientX, e.clientY);
        if (!pos) return;
        press = {
          text: true,
          start: pos,
          moved: false,
          id: e.pointerId,
          x: e.clientX,
          y: e.clientY,
        };
        try {
          scr.setPointerCapture(e.pointerId);
        } catch (_) {}
        return;
      }
      press = { el, text: false };
    });
    scr.addEventListener("pointermove", (e) => {
      if (!press || !press.text) return;
      const pos = posAt(e.clientX, e.clientY);
      if (!pos || pos.w < 0) return;
      const s = press.start.w < 0 ? { p: press.start.p, w: 0 } : press.start;
      // a drag inside one word selects that word (like the letters of it in Word)
      const far = Math.hypot(e.clientX - press.x, e.clientY - press.y) > 8 * k;
      if (!press.moved && pos.p === s.p && pos.w === s.w && !far) return;
      press.moved = true;
      st.sel = range(s, pos);
      st.tw = null;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    });
    scr.addEventListener("pointerup", (e) => {
      if (!press) return;
      const pr = press;
      press = null;
      if (pr.text) {
        if (pr.moved) return user("select", "doc", {});
        const pos = pr.start;
        const t = `w:${pos.p}:${pos.w}`;
        const now = Date.now();
        clicks =
          clicks.t === t && now - clicks.time < 450
            ? { t, n: clicks.n + 1, time: now }
            : { t, n: 1, time: now };
        if (clicks.n === 3) {
          // three clicks: the whole paragraph
          st.sel = {
            a: { p: pos.p, w: 0 },
            b: { p: pos.p, w: st.doc.paras[pos.p].w.length - 1 },
          };
          return user("select", "doc", {});
        }
        return user(clicks.n === 2 ? "dbl" : "click", t, { pos });
      }
      const el = e.target.closest("[data-t]");
      if (!el || (el !== pr.el && !pr.el.contains(el))) return;
      user("click", pr.el.dataset.t, {});
    });
    scr.addEventListener("pointercancel", () => (press = null));
    // typing in the boxes (Find, file name) and moving the zoom slider
    scr.addEventListener("input", (e) => {
      const el = e.target;
      const t = el.dataset.t;
      if (mis && mis.mode === "demo") return;
      if (t === "zoom-range") {
        st.zoom = +el.value;
        const pct = scr.querySelector(".pct");
        if (pct) pct.textContent = st.zoom + "%";
        const pg = scr.querySelector(".wd-page");
        if (pg) pg.style.fontSize = (15 * st.zoom) / 100 + "px";
        const s = mis && mis.steps[mis.i];
        if (
          s &&
          s.act === "slide" &&
          ((s.min != null && st.zoom >= s.min) ||
            (s.max != null && st.zoom <= s.max))
        )
          advance();
        return;
      }
      onType(el);
    });
    scr.addEventListener("focusin", (e) => {
      if (e.target.dataset && e.target.dataset.t === "dlg:filename")
        e.target.select();
    });
    function onType(el) {
      const t = el.dataset.t;
      if (t === "nav-search" && st.nav) st.nav.q = el.value;
      if (t === "dlg:filename" && st.dlg) st.dlg.name = el.value;
      render();
      const s = mis && mis.mode === "try" && mis.steps[mis.i];
      if (s && s.act === "type" && s.t === t && norm(el.value) === norm(s.text))
        advance();
    }
    const norm = (x) =>
      String(x || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
    function keyName(e) {
      if (e.key === "F7") return "F7";
      if ((e.ctrlKey || e.metaKey) && e.key.length === 1)
        return "Ctrl+" + e.key.toUpperCase();
      if (e.key === "Enter") return e.shiftKey ? "Shift+Enter" : "Enter";
      if (e.key === "Backspace" || e.key === "Escape") return e.key;
      return null;
    }
    const onDocKey = (e) => {
      if (!box.isConnected) return;
      const a = document.activeElement;
      if (a && a.tagName === "INPUT" && scr.contains(a)) {
        if (e.key === "Enter") e.preventDefault();
        return;
      }
      // typing in a box somewhere else on the page is not for Mini Word
      if (
        a &&
        !scr.contains(a) &&
        (a.tagName === "INPUT" ||
          a.tagName === "TEXTAREA" ||
          a.tagName === "SELECT" ||
          a.isContentEditable)
      )
        return;
      const name = keyName(e);
      if (name) {
        if (name !== "Escape") e.preventDefault();
        return keyFrom(name);
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (mis && (mis.mode === "demo" || mis.busy)) return;
        const s = mis && mis.steps[mis.i];
        if (mis && !(s && s.act === "type" && s.t === "doc")) return;
        e.preventDefault();
        typeChar(e.key);
        checkTyped();
      }
    };
    document.addEventListener("keydown", onDocKey);
    function keyFrom(key) {
      user("key", "key:" + key, {});
    }
    function checkTyped() {
      const s = mis && mis.mode === "try" && mis.steps[mis.i];
      if (
        s &&
        s.act === "type" &&
        s.t === "doc" &&
        norm(st.typed) === norm(s.text)
      )
        advance();
    }

    /* ---------- missions (the same as Mini Windows) ---------- */
    function target(s) {
      const P = st.doc.paras;
      if (s.t === "all") {
        const lp = P.length - 1;
        return { a: { p: 0, w: 0 }, b: { p: lp, w: P[lp].w.length - 1 } };
      }
      if (s.t.startsWith("para:")) {
        const p = +s.t.slice(5);
        return { a: { p, w: 0 }, b: { p, w: P[p].w.length - 1 } };
      }
      const [, p0, w0] = s.t.split(":");
      const [, p1, w1] = (s.to || s.t).split(":");
      return range({ p: +p0, w: +w0 }, { p: +p1, w: +w1 });
    }
    // the selection holds the words of the step, and nothing outside their paragraphs
    function selOk(s) {
      if (!st.sel) return false;
      const r = target(s);
      return (
        cmp(st.sel.a, r.a) <= 0 &&
        cmp(r.b, st.sel.b) <= 0 &&
        st.sel.a.p >= r.a.p &&
        st.sel.b.p <= r.b.p
      );
    }
    function match(s, kind, t) {
      if (s.act === "click")
        return (
          (kind === "click" && t === s.t) ||
          (kind === "key" && KEYOF[s.t] && t === "key:" + KEYOF[s.t])
        );
      if (s.act === "dbl") return kind === "dbl" && t === s.t;
      if (s.act === "key")
        return (
          (kind === "key" &&
            t.toLowerCase() === ("key:" + s.key).toLowerCase()) ||
          (kind === "click" && KEYS[s.key] === t)
        );
      return false;
    }
    function user(kind, t, info) {
      if (!mis) return perform(kind, t, info);
      if (mis.mode === "demo" || mis.busy) return;
      const s = mis.steps[mis.i];
      if (!s) return perform(kind, t, info);
      if (match(s, kind, t)) {
        perform(kind, t, info);
        advance();
        return;
      }
      if (
        s.act === "select" &&
        (kind === "select" ||
          ((kind === "dbl" || kind === "click") && /^w:/.test(t)))
      ) {
        perform(kind, t, info);
        if (selOk(s)) advance();
        else if (kind !== "click") wrong(s, "place");
        return;
      }
      if (s.act === "dbl" && kind === "click" && t === s.t)
        return perform(kind, t, info);
      if (
        s.act === "type" &&
        s.t === "doc" &&
        kind === "click" &&
        /^(w|para|page)/.test(t)
      )
        return perform(kind, t, info);
      if (s.act === "type" && kind === "click" && t === s.t) return;
      if (kind === "key" && s.act !== "key") {
        if (t === "key:Backspace") {
          if (s.act === "type" && s.t === "doc") perform(kind, t, info);
          return;
        }
        // another shortcut (Ctrl+A, Escape …): do it, it is not a mistake
        if (!/^key:(Shift\+)?Enter$/.test(t)) return perform(kind, t, info);
      }
      wrong(s, kind !== s.act && t === s.t ? "kind" : "place");
    }
    function wrong(s, why, p) {
      mis.wrongs++;
      if (p) ring(p.x, p.y, "no");
      mis.glowing = true;
      glow(true);
      mis.cb.onWrong && mis.cb.onWrong(s, why);
    }
    const find = (t) => {
      if (t == null) return null;
      const all = [...scr.querySelectorAll(`[data-t="${CSS.escape(t)}"]`)];
      return all.find((x) => x.offsetParent !== null) || all[0] || null;
    };
    function glow(on) {
      scr
        .querySelectorAll(".wd-glow")
        .forEach((x) => x.classList.remove("wd-glow"));
      if (!on || !mis) return;
      const s = mis.steps[mis.i];
      if (!s || !s.t) return;
      if (s.act === "select") {
        const r = target(s);
        eachIn(r, (w, p, i) => {
          const el = find(`w:${p}:${i}`);
          if (el) el.classList.add("wd-glow");
        });
        return;
      }
      if (s.act === "type" && s.t === "doc") {
        const c = scr.querySelector(".wd-caret");
        if (c) c.classList.add("wd-glow");
        return;
      }
      const el = find(s.t);
      if (el) el.classList.add("wd-glow");
    }
    async function advance() {
      if (!mis) return;
      const m = mis;
      m.busy = true;
      m.glowing = false;
      glow(false);
      m.i++;
      await wait(m.mode === "demo" ? 500 : 350);
      if (mis !== m) return;
      step();
    }
    async function step() {
      const m = mis;
      if (!m) return;
      clearTimeout(m.idle);
      m.glowing = false;
      st.typed = "";
      if (m.i >= m.steps.length) {
        mis = null;
        render();
        m.cb.onDone && m.cb.onDone(m);
        return;
      }
      const s = m.steps[m.i];
      const said = m.cb.onStep ? m.cb.onStep(m.i, s) : null;
      if (m.mode === "demo") {
        await Promise.race([said || wait(0), wait(4500)]);
        if (mis !== m) return;
        await demoDo(s);
        if (mis !== m) return;
        m.i++;
        await wait(700);
        if (mis !== m) return;
        return step();
      }
      m.busy = false;
      if (s.act === "look") {
        m.glowing = true;
        glow(true);
        await Promise.race([said || wait(0), wait(5000)]);
        await wait(Math.max(900, s.wait || 0));
        if (mis !== m) return;
        m.i++;
        return step();
      }
      if (s.act === "type" && s.t !== "doc") {
        const inp = find(s.t);
        if (inp && matchMedia("(hover: hover)").matches)
          inp.focus({ preventScroll: true });
      }
      if ((s.act === "type" && s.t === "doc") || s.act === "key")
        scr.focus({ preventScroll: true });
      m.idle = setTimeout(() => {
        if (mis === m && m.i < m.steps.length) {
          m.glowing = true;
          glow(true);
        }
      }, m.helpAfter ?? 6000);
    }
    async function moveTo(x, y, ms = 650) {
      const c = scr.querySelector(".wd-cursor");
      if (!c) return;
      c.classList.add("show");
      c.style.transition = `left ${ms}ms ease,top ${ms}ms ease`;
      c.style.left = x + "px";
      c.style.top = y + "px";
      cur.x = x;
      cur.y = y;
      await wait(ms + 60);
    }
    function ring(x, y, cls) {
      const r = document.createElement("span");
      r.className = "wd-ring " + (cls || "");
      r.style.left = x + "px";
      r.style.top = y + "px";
      scr.appendChild(r);
      setTimeout(() => r.remove(), 700);
    }
    async function demoDo(s) {
      const m = mis;
      if (s.act === "look") {
        glow(true);
        await wait(Math.max(1400, s.wait || 0));
        glow(false);
        return;
      }
      if (s.act === "key") {
        const kd = document.createElement("div");
        kd.className = "wd-key";
        kd.textContent = s.key === "Enter" ? "Enter ↩" : s.key;
        scr.appendChild(kd);
        await wait(1000);
        kd.remove();
        perform("key", "key:" + s.key, {});
        return;
      }
      if (s.act === "select") {
        const r = target(s);
        const list = [];
        eachIn(r, (w, p, i) => list.push({ p, w: i }));
        const first = find(`w:${list[0].p}:${list[0].w}`);
        if (!first) return;
        const c0 = center(first);
        await moveTo(c0.x - first.offsetWidth / 2, c0.y);
        for (const pos of list) {
          if (mis !== m) return;
          st.sel = range(list[0], pos);
          render();
          const el = find(`w:${pos.p}:${pos.w}`);
          if (el) {
            const c = center(el);
            await moveTo(c.x + el.offsetWidth / 2, c.y, 110);
          }
        }
        perform("select", "doc", {});
        return;
      }
      if (s.act === "type" && s.t === "doc") {
        for (const ch of s.text) {
          if (mis !== m) return;
          typeChar(ch);
          await wait(110);
        }
        return;
      }
      const el = find(s.t);
      if (!el) return;
      el.classList.add("wd-glow");
      const c = center(el);
      await moveTo(c.x, c.y);
      if (mis !== m) return;
      if (s.act === "type") {
        el.value = "";
        for (let i = 1; i <= s.text.length; i++) {
          const e2 = find(s.t);
          if (!e2 || mis !== m) return;
          e2.value = s.text.slice(0, i);
          if (s.t === "nav-search") st.nav.q = e2.value;
          if (s.t === "dlg:filename") st.dlg.name = e2.value;
          render();
          await wait(120);
        }
        return;
      }
      if (s.act === "slide") {
        const to = s.min != null ? s.min + 10 : s.max - 10;
        while (st.zoom !== to && mis === m) {
          st.zoom += st.zoom < to ? 10 : -10;
          render();
          await wait(90);
        }
        return;
      }
      ring(c.x, c.y);
      if (s.act === "dbl") {
        await wait(160);
        ring(c.x, c.y);
      }
      await wait(250);
      const pos = /^w:/.test(s.t)
        ? { p: +s.t.split(":")[1], w: +s.t.split(":")[2] }
        : null;
      perform(s.act === "dbl" ? "dbl" : "click", s.t, { pos });
    }
    function run(steps, cb) {
      stop();
      mis = {
        steps,
        cb: cb || {},
        mode: (cb && cb.mode) || "try",
        i: 0,
        wrongs: 0,
        busy: false,
        helpAfter: cb && cb.helpAfter,
      };
      const c = scr.querySelector(".wd-cursor");
      if (c) c.classList.toggle("show", mis.mode === "demo");
      step();
    }
    function stop() {
      if (mis) clearTimeout(mis.idle);
      mis = null;
      glow(false);
      const c = scr.querySelector(".wd-cursor");
      if (c) c.classList.remove("show");
    }
    // the word button under the screen: type the text of the current "type" step for the child
    async function typeFor() {
      if (!mis) return;
      const s = mis.steps[mis.i];
      if (!s || s.act !== "type") return;
      const m = mis;
      m.busy = true;
      if (s.t === "doc") {
        for (const ch of s.text.slice(st.typed.length)) {
          typeChar(ch);
          await wait(90);
          if (mis !== m) return;
        }
        m.busy = false;
        checkTyped();
        return;
      }
      for (let i = 1; i <= s.text.length; i++) {
        const el = find(s.t);
        if (!el || mis !== m) return;
        el.value = s.text.slice(0, i);
        if (s.t === "nav-search") st.nav.q = el.value;
        if (s.t === "dlg:filename") st.dlg.name = el.value;
        if (i < s.text.length) render();
        await wait(100);
      }
      m.busy = false;
      onType(find(s.t));
    }

    setup(opts.start);
    return {
      setup,
      run,
      stop,
      find,
      render,
      typeFor,
      pressKey: keyFrom,
      showHelp: () => {
        if (mis) {
          mis.glowing = true;
          glow(true);
        }
      },
      destroy() {
        stop();
        timers.forEach(clearTimeout);
        clearTimeout(toastT);
        document.removeEventListener("keydown", onDocKey);
        if (ro) ro.disconnect();
        box.innerHTML = "";
        box.classList.remove("wd-box");
      },
      get state() {
        return st;
      },
      get mission() {
        return mis;
      },
    };
  }

  // name, icon and help line used by the lesson pages for the free-play tile
  window.WordSim = {
    create,
    icon,
    ICONS: IC,
    label: "Mini Word",
    ic: "📝",
    hint: "A pretend Word. Select text, press the buttons, type. Nothing can break!",
    about: "Play on a pretend Word",
  };
})();
