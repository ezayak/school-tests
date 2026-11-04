// Ukrainian math lessons (Optima, Grade 3). Everything on screen is in Ukrainian.
// <body data-view="list">   → the subject page: window.MATH_LESSONS (lessons.js), one card per lesson.
// <body data-view="lesson"> → one lesson: window.MATH_LESSON (lesson-N.js). Home = the title and two tabs of tiles:
//   📘 Урок   – one tile per slide; the slides explain the topic with examples and schemas from the book (← →).
//   ✏️ Задачі – one tile per group (a type of exercise); a group shows its exercises one at a time, with a strip
//               of them on top (green ✓ = done). The child solves on paper and types the answer: numbers on the
//               number pad, > < = on the block of signs under the comparisons. ✓ Готово checks it; all right → done
//               (saved on the device). 💡 Підказка shows the schema of a word problem, 📝 Розв’язання the steps.
//               «Далі →» always works, solved or not. 🔊 reads the task (never by itself).
// The page loads shared/common.js, shared/math.js (the schema drawing: CS_EXT.vis.bar), its lesson-N.js, then this file.
// Expressions are text ("34 − (18 − 9)"): the answer and the steps are worked out here. ■ = the answer of the row before.
(function () {
  "use strict";
  const { esc } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "lesson";
  const SUBJ = "Математика";
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
  // [word] → a highlighted word
  const kw = (t) => esc(t).replace(/\[([^\]]+)\]/g, '<b class="mu-kw">$1</b>');
  const plain = (t) => String(t ?? "").replace(/[[\]]/g, "");

  /* ================= list of lessons ================= */
  if (view === "list") {
    const M = window.MATH_LESSONS || { grade: 3, parts: [] };
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">← Усі ігри</a><span class="eyebrow">${esc(M.grade)} клас · ${SUBJ}</span></div>
    <h1 class="hero-title"><span class="p">Мате</span><span class="k">матика</span></h1>
    <p class="howto">${esc(M.intro || "")}</p>
  </section>
  ${M.parts
    .map(
      (p) =>
        `<h2 class="mu-part">${esc(p.t)}</h2><div class="items">${p.items.map((it) => Kit.lessonCard(it, "Урок")).join("")}</div>`,
    )
    .join("")}
  <div class="soon">Нові уроки з’являться тут.</div>`;
    document.title = `${SUBJ} · ${M.grade} клас`;
    return;
  }

  /* ================= expressions ================= */
  // "34 − (18 − 9)" → {v: 25, steps: ["18 − 9 = 9", "34 − 9 = 25"]}: brackets first, then × and :, then + and −, left to right.
  const OPS = { "-": "−", "−": "−", "+": "+", "×": "×", "·": "×", ":": ":" };
  function calc(e, box) {
    const t = String(e)
      .replace(/\s+/g, "")
      .match(/\d+|[-−+×·:()■]/g)
      .map((x) => (x === "■" ? box : /\d/.test(x) ? Number(x) : OPS[x] || x));
    const steps = [];
    // one operation inside t[i0 … i1) (no brackets there)
    function one(i0, i1) {
      const seg = t.slice(i0, i1);
      let k = seg.findIndex((x) => x === "×" || x === ":");
      if (k < 0) k = seg.findIndex((x) => x === "+" || x === "−");
      const a = seg[k - 1],
        op = seg[k],
        b = seg[k + 1];
      const r =
        op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b;
      steps.push({ a, op, b, r });
      t.splice(i0 + k - 1, 3, r);
    }
    while (t.length > 1) {
      const close = t.indexOf(")");
      if (close < 0) {
        one(0, t.length);
        continue;
      }
      const open = t.lastIndexOf("(", close);
      if (close - open === 2) {
        t.splice(close, 1);
        t.splice(open, 1);
      } else one(open + 1, close);
    }
    return { v: t[0], steps };
  }
  // the book writes × as · (4 · 3 = 12)
  const stepText = (s) => `${s.a} ${s.op === "×" ? "·" : s.op} ${s.b} = ${s.r}`;
  // going over ten (46 − 29, 38 + 15): tens first, then ones
  function overTen(s) {
    if (s.op !== "+" && s.op !== "−") return "";
    if (s.a < 10 || s.b < 10 || s.b % 10 === 0) return "";
    const T = s.b - (s.b % 10),
      O = s.b % 10;
    const cross = s.op === "+" ? (s.a % 10) + O >= 10 : s.a % 10 < O;
    if (!cross) return "";
    const m = s.op === "+" ? s.a + T : s.a - T;
    return `${s.a} ${s.op} ${T} = ${m}, ${m} ${s.op} ${O} = ${s.r}`;
  }
  const show = (e) =>
    String(e)
      .replace(/\s*-\s*/g, " − ")
      .replace(/\s+/g, " ")
      .trim();

  /* ================= voice ================= */
  const V = Kit.voice("uk-UA");
  // what the voice reads: signs as words
  const spoken = (t) =>
    plain(t)
      .replace(/■/g, " віконце ")
      .replace(/(\d)\s*[−-]\s*(?=[\d(■])/g, "$1 мінус ")
      .replace(/\)\s*[−-]\s*/g, ") мінус ")
      .replace(/\s+−\s+/g, " мінус ")
      .replace(/\+/g, " плюс ")
      .replace(/[×·]/g, " помножити на ")
      .replace(/(\d)\s*:\s*(?=\d)/g, "$1 поділити на ")
      .replace(/=/g, " дорівнює ")
      .replace(/●/g, " і ")
      .replace(/</g, " менше ")
      .replace(/>/g, " більше ")
      .replace(/[()]/g, " ")
      .replace(/\s+/g, " ");
  const sayBtn = (id) =>
    V.ok
      ? `<button type="button" class="abtn mu-say" id="${id}" aria-label="Прочитати">🔊</button>`
      : "";

  /* ================= one lesson ================= */
  // Home: the title and two tabs of tiles. 📘 Урок: one tile per slide, a slide opens the slides (← →).
  // ✏️ Задачі: one tile per group (type of exercise); a group opens its exercises one at a time (← Назад, Далі →).
  const L = window.MATH_LESSON;
  const K = "mu-" + L.key; // saved: tab, done exercises, typed answers
  const pic = (name) => `${L.img}${name}.jpg`;
  const bar = (v) => (window.CS_EXT && CS_EXT.vis.bar ? CS_EXT.vis.bar(v) : "");
  const done = store.get(K + "-done", {});
  const vals = store.get(K + "-vals", {});
  const TABS = [
    { k: "learn", ic: "📘", t: "Урок", sub: "пояснення" },
    { k: "tasks", ic: "✏️", t: "Задачі", sub: "вправи з підручника" },
  ];
  let tab = store.get(K + "-tab", "learn");
  if (!TABS.some((t) => t.k === tab)) tab = "learn";
  document.title = `${L.title} · ${SUBJ}`;
  const top0 = () => window.scrollTo({ top: 0 });
  // 1 вправа, 2 вправи, 5 вправ
  const vpr = (n) =>
    n % 10 === 1 && n % 100 !== 11
      ? "вправа"
      : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)
        ? "вправи"
        : "вправ";

  // the pad of the exercise on screen (also the computer keys)
  let keyFn = null;
  document.addEventListener("keydown", (e) => {
    if (!keyFn) return;
    const k = { "-": "−", "*": "·", "/": ":" }[e.key] || e.key;
    if (/^[0-9<>=+−·:]$/.test(k)) keyFn(k);
    else if (e.key === "Backspace" || e.key === "Delete") keyFn("del");
    else if (e.key === "Enter" || e.key === "Tab") keyFn("next");
    else return;
    e.preventDefault();
  });
  function leave() {
    V.hush();
    keyFn = null;
  }
  const tile = (m, data) =>
    `<button type="button" class="mode${m.done ? " done" : ""}" ${data}><span class="mi-ic">${esc(m.ic)}</span><b>${esc(m.t)}</b><small>${esc(m.sub)}</small>${m.done ? '<span class="tick" aria-label="зроблено">✓</span>' : ""}</button>`;
  const hud = (t, count) =>
    `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="До уроку">←</button><span class="qnum">${esc(t)}</span>${count ? `<span class="count">${count}</span>` : ""}</div>`;
  const bindHome = () => (document.getElementById("homeBtn").onclick = home);

  /* ---------- home: tabs and tiles ---------- */
  function home() {
    leave();
    const tiles =
      tab === "learn"
        ? L.learn
            .map((c, i) =>
              tile(
                { ic: c.ic || "📘", t: c.t, sub: `Слайд ${i + 1}` },
                `data-i="${i}" id="i-${i}"`,
              ),
            )
            .join("")
        : L.groups
            .map((g, gi) => {
              const n = g.items.length,
                d = g.items.filter((it) => done[it.n]).length;
              return tile(
                {
                  ic: g.ic,
                  t: g.t,
                  sub: `${n} ${vpr(n)}${d && d < n ? ` · ✓ ${d}` : ""}`,
                  done: d === n,
                },
                `data-g="${gi}" id="g-${gi}"`,
              );
            })
            .concat(
              GAMES.filter(() => FACTS.length).map((g) => {
                const b = best[g.k];
                return tile(
                  {
                    ic: g.ic,
                    t: g.t,
                    sub:
                      b === undefined
                        ? `${FACTS.length} прикладів`
                        : `Найкраще: ${b} з ${FACTS.length}`,
                    done: b / FACTS.length >= 0.9,
                  },
                  `data-game="${g.k}" id="game-${g.k}"`,
                );
              }),
            )
            .join("");
    app.innerHTML = `<section class="card pop mu-card">
    <div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">← Усі ігри</a><a class="back" href="index.html">${SUBJ}</a></div></div>
    <div class="mu-head"><h1 class="les-title">${esc(L.title)}</h1><span class="les-sub">Урок ${esc(L.n)} · ${esc(L.pages)}</span></div>
    <div class="tabbox"><div class="ftabs two" role="group" aria-label="Розділ">${TABS.map((t) => `<button type="button" id="tab-${t.k}" data-tab="${t.k}" aria-pressed="${tab === t.k}"><span class="ti">${t.ic} </span>${esc(t.t)}<span class="sub">${esc(t.sub)}</span></button>`).join("")}</div>
      <div class="panel"><div class="modes">${tiles}</div></div></div>
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
      .querySelectorAll("[data-game]")
      .forEach((b) => (b.onclick = () => GAME[b.dataset.game]()));
    app
      .querySelectorAll("[data-i]")
      .forEach((b) => (b.onclick = () => slide(+b.dataset.i)));
    app.querySelectorAll("[data-g]").forEach(
      (b) =>
        (b.onclick = () => {
          const items = L.groups[+b.dataset.g].items;
          // start at the first exercise that is not done yet
          group(
            +b.dataset.g,
            Math.max(
              0,
              items.findIndex((it) => !done[it.n]),
            ),
          );
        }),
    );
  }

  /* ---------- 📘 Урок: one slide at a time ---------- */
  function slide(i) {
    leave();
    const n = L.learn.length;
    const c = L.learn[i];
    const vis =
      c.img || c.schema || c.ex
        ? `<div class="mu-lv">${c.img ? `<img class="mu-pic" src="${esc(pic(c.img))}" alt="">` : ""}${c.schema ? `<div class="mu-schema">${bar(c.schema)}</div>` : ""}${c.ex ? `<div class="mu-ex">${c.ex.map((x) => `<div>${esc(x)}</div>`).join("")}</div>` : ""}</div>`
        : "";
    app.innerHTML = `${hud("📘 Урок", `${i + 1} / ${n}`)}<section class="card pop mu-slide">
    <div class="mu-lh"><span class="mu-ic" aria-hidden="true">${esc(c.ic || "📘")}</span><h2>${esc(c.t)}</h2>${sayBtn("sq")}</div>
    <div class="mu-lb${vis ? "" : " one"}"><div class="mu-lt">${c.lines.map((l) => `<p>${kw(l)}</p>`).join("")}${c.text ? `<p class="mu-text">${esc(c.text)}</p>` : ""}</div>${vis}</div>
    ${c.from ? `<span class="mu-from">📖 ${esc(c.from)}</span>` : ""}
    <div class="dotsnav">${L.learn.map((_, k) => `<button type="button" class="dot${k === i ? " on" : ""}" data-go="${k}" aria-label="Слайд ${k + 1}"></button>`).join("")}</div>
    <div class="nav"><button type="button" class="btn ghost" id="prevBtn" aria-label="Назад"${i ? "" : " disabled"}>←</button><button type="button" class="btn" id="nextBtn" aria-label="${i + 1 < n ? "Далі" : "До уроку"}">${i + 1 < n ? "→" : "✓"}</button></div>
  </section>`;
    bindHome();
    const sq = document.getElementById("sq");
    if (sq)
      sq.onclick = () =>
        V.say(
          spoken([c.t, ...c.lines, c.text || "", ...(c.ex || [])].join(". ")),
        );
    app
      .querySelectorAll("[data-go]")
      .forEach((b) => (b.onclick = () => slide(+b.dataset.go)));
    document.getElementById("prevBtn").onclick = () => i && slide(i - 1);
    document.getElementById("nextBtn").onclick = () =>
      i + 1 < n ? slide(i + 1) : home();
    top0();
  }

  /* ---------- ✏️ Задачі: the exercises of one group, one at a time ---------- */
  const padHTML = () =>
    `<div class="mx-pad mu-pad" role="group" aria-label="Цифри">${[
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]
      .map((d) => `<button type="button" data-k="${d}">${d}</button>`)
      .join(
        "",
      )}<button type="button" data-k="del" class="del" aria-label="Стерти">⌫</button><button type="button" data-k="0">0</button><button type="button" data-k="next" class="nx" aria-label="Наступне віконце">↵</button></div>`;
  // one block of signs under all the comparisons: tap a box, then a sign
  const signsHTML = (set) =>
    `<div class="mu-spad" role="group" aria-label="Знаки" style="--n:${set.length + 1}">${set.map((s) => `<button type="button" data-k="${s}">${s}</button>`).join("")}<button type="button" data-k="del" class="del" aria-label="Стерти">⌫</button></div>`;

  // the rows of an exercise, worked out: expressions get their value and steps, ■ = the row before
  function prep(it) {
    let box = null;
    return (it.rows || []).map((r) => {
      if (r.h) {
        box = null;
        return { ...r, kind: "h" };
      }
      if (r.e !== undefined) {
        const c = calc(r.e, box);
        const sub = r.e.includes("■") ? show(r.e).replace("■", box) : null;
        const was = box;
        box = c.v;
        return { ...r, kind: "e", want: [c.v], steps: c.steps, sub, box: was };
      }
      // with units ("1 м 6 дм" ● "6 м 1 дм"): the sign is given (a) with the reason (why)
      if (r.cmp && r.why) return { ...r, kind: "cmp", want: [r.a] };
      if (r.cmp) {
        const [l, rr] = r.cmp.map((x) => calc(x));
        const sign = r.a || (l.v > rr.v ? ">" : l.v < rr.v ? "<" : "=");
        return { ...r, kind: "cmp", want: [sign], l, r: rr };
      }
      if (r.ch) return { ...r, kind: "ch", want: [].concat(r.a) };
      // the signs between numbers: "14 ● 2 ● 8" = 15; any signs that give eq are right, a = one answer
      if (r.ops) {
        const parts = r.ops.split("●");
        const fill = (signs) =>
          parts.map((x, j) => x + (signs[j] || "")).join("");
        return { ...r, kind: "ops", parts, fill, want: r.a };
      }
      // a word problem's answer: the box goes inside the answer sentence ("Артем пройшов [  ] м до зустрічі з товаришем.")
      const m =
        (it.schema || it.help) &&
        it.answer &&
        r.a.length === 1 &&
        !r.pre &&
        !r.post
          ? String(it.answer).match(
              new RegExp(`^(.*?\\D|)${r.a[0]}(?!\\d)(.*)$`),
            )
          : null;
      if (m && !m[2].match(new RegExp(`(^|\\D)${r.a[0]}(?!\\d)`)))
        return {
          ...r,
          kind: "num",
          want: r.a,
          pre: m[1].trim(),
          post: m[2].trim(),
          sent: true,
        };
      return { ...r, kind: "num", want: r.a };
    });
  }

  function group(gi, k) {
    leave();
    const G = L.groups[gi];
    const items = G.items;
    const it = items[k];
    const last = k === items.length - 1;
    const rows = prep(it);
    const saved = vals[it.n] || {};
    const fid = (ri, j) => `${ri}-${j}`;
    const field = (ri, j, sign) =>
      `<button type="button" class="mu-f${sign ? " sg" : ""}" data-f="${fid(ri, j)}" aria-label="${sign ? "Знак" : "Відповідь"}">${esc(saved[fid(ri, j)] ?? "")}</button>`;
    const hasNum = rows.some((r) => r.kind === "e" || r.kind === "num");
    const hasOps = rows.some((r) => r.kind === "ops");
    const hasSign = hasOps || rows.some((r) => r.kind === "cmp");
    const isWord = !!(it.schema || it.help);
    const chips = () =>
      items
        .map(
          (x, j) =>
            `<button type="button" class="mu-chip${done[x.n] ? " done" : ""}${j === k ? " cur" : ""}" data-go="${j}" aria-label="Вправа ${esc(x.n)}${done[x.n] ? ", зроблено" : ""}">${done[x.n] ? "✓ " : ""}№${esc(x.n)}${x.hw ? '<span class="mu-hw" aria-label="домашнє">🏠</span>' : ""}</button>`,
        )
        .join("");

    const rowHTML = (r, ri) => {
      if (r.kind === "h") return `<div class="mu-rh">${esc(r.h)}</div>`;
      if (r.kind === "e")
        return `<div class="mu-row">${r.q ? `<span class="mu-rq">${esc(r.q)}</span>` : ""}<span class="mu-expr">${esc(show(r.e))} =</span>${field(ri, 0)}</div>`;
      if (r.kind === "cmp")
        return `<div class="mu-row mu-cmp"><span class="mu-expr l">${esc(show(r.cmp[0]))}</span>${field(ri, 0, true)}<span class="mu-expr">${esc(show(r.cmp[1]))}</span></div>`;
      if (r.kind === "ops")
        return `<div class="mu-row">${r.parts.map((x, j) => `<span class="mu-expr">${esc(show(x))}${j === r.parts.length - 1 ? ` = ${esc(r.eq)}` : ""}</span>${j < r.parts.length - 1 ? field(ri, j, true) : ""}`).join("")}</div>`;
      if (r.kind === "ch") {
        const sel = saved[fid(ri, 0)] || [];
        return `<div class="mu-row mu-qrow"><span class="mu-rq">${esc(r.q)}</span><span class="mu-chs">${r.ch.map((c) => `<button type="button" class="mu-ch${sel.includes(c) ? " on" : ""}" data-c="${fid(ri, 0)}" data-v="${esc(c)}" data-multi="${r.want.length > 1}">${esc(c)}</button>`).join("")}</span></div>`;
      }
      return `<div class="mu-row mu-qrow">${r.q ? `<span class="mu-rq">${esc(r.q)}</span>` : ""}<span class="mu-fs">${r.pre ? `<span class="${r.sent ? "mu-sent" : "mu-expr"}">${esc(r.pre)}</span>` : ""}${r.want.map((_, j) => field(ri, j)).join('<span class="mu-comma">,</span>')}${r.post ? `<span class="${r.sent ? "mu-sent" : "mu-post"}">${esc(r.post)}</span>` : ""}</span></div>`;
    };

    // 📝 the solution: the book's steps (word problems) or the steps of each expression
    function solution() {
      if (it.steps)
        return `<div class="mu-ex">${it.steps.map((s, i) => `<div>${it.steps.length > 1 ? `${i + 1}) ` : ""}${esc(s)}</div>`).join("")}${it.answer ? `<div class="mu-ans">Відповідь: ${esc(it.answer)}</div>` : ""}</div>`;
      return `<div class="mu-ex">${rows
        .map((r) => {
          if (r.kind === "h") return `<div class="mu-rh">${esc(r.h)}</div>`;
          if (r.kind === "e") {
            const lines = r.steps.map(
              (s, i) =>
                `<div>${r.steps.length > 1 ? `${i + 1}) ` : ""}${esc(stepText(s))}${overTen(s) ? `<small> (${esc(overTen(s))})</small>` : ""}</div>`,
            );
            return `<div class="mu-sol"><b>${esc(r.sub || show(r.e))} = ${r.want[0]}</b>${r.sub ? `<small> (■ = ${r.box})</small>` : ""}${r.steps.length > 1 || overTen(r.steps[0] || {}) ? lines.join("") : ""}</div>`;
          }
          if (r.kind === "ops")
            return `<div class="mu-sol"><b>${esc(show(r.fill(r.a)))} = ${esc(r.eq)}</b></div>`;
          if (r.kind === "cmp" && r.why)
            return `<div class="mu-sol"><b>${esc(r.cmp[0])} ${r.want[0]} ${esc(r.cmp[1])}</b><div>${esc(r.why)}</div></div>`;
          if (r.kind === "cmp") {
            const side = (x, c) =>
              c.steps.length ? `${show(x)} = ${c.v}` : "";
            const calcs = [side(r.cmp[0], r.l), side(r.cmp[1], r.r)]
              .filter(Boolean)
              .join("; ");
            return `<div class="mu-sol"><b>${esc(show(r.cmp[0]))} ${r.want[0]} ${esc(show(r.cmp[1]))}</b><div>${esc(calcs)}${calcs ? " → " : ""}${r.l.v} ${r.want[0]} ${r.r.v}</div></div>`;
          }
          return "";
        })
        .join("")}</div>`;
    }

    const readText = () =>
      spoken(
        [
          it.q,
          it.tip || "",
          ...rows.map((r) =>
            r.kind === "h"
              ? r.h
              : r.kind === "e"
                ? (r.q ? r.q + ": " : "") + show(r.e) + " ="
                : r.kind === "cmp"
                  ? `${show(r.cmp[0])} ● ${show(r.cmp[1])}`
                  : r.kind === "ops"
                    ? `${r.parts.map(show).join(" віконце ")} = ${r.eq}`
                    : r.q || "",
          ),
        ].join(". "),
      );

    app.innerHTML = `${hud(`${G.ic} ${G.t}`, `${k + 1} / ${items.length}`)}<section class="card pop mu-taskcard${done[it.n] ? " is-done" : ""}">
    <div class="mu-strip">${chips()}</div>
    <div class="mu-task">
      <div class="mu-side">
        <div class="mu-qh"><span class="mu-num">№ ${esc(it.n)}</span>${it.hw ? '<span class="mu-hwtag">🏠 домашнє</span>' : ""}<span class="mu-pg">с. ${esc(it.p)}</span>${sayBtn("sq")}</div>
        <p class="mu-q">${kw(it.q)}</p>
        ${it.tip ? `<p class="mu-tip">${kw(it.tip)}</p>` : ""}
        ${it.img ? `<img class="mu-pic" src="${esc(pic(it.img))}" alt="">` : ""}
        <div class="mu-box" id="helpBox" hidden><b>💡 Підказка</b>${it.help ? it.help.map((h) => `<p>${kw(h)}</p>`).join("") : ""}${it.schema ? `<div class="mu-schema">${bar(it.schema)}</div>` : ""}</div>
        <div class="mu-box" id="solBox" hidden><b>📝 Розв’язання</b>${solution()}</div>
      </div>
      <div class="mu-main">
        <div class="mu-rows">${rows.map(rowHTML).join("")}</div>
        ${hasSign ? signsHTML(hasOps ? ["+", "−", "·", ":"] : [">", "<", "="]) : ""}
        ${hasNum ? padHTML() : ""}
        <div class="mu-acts">
          ${isWord ? '<button type="button" class="btn ghost" id="helpBtn">💡 Підказка</button>' : ""}
          <button type="button" class="btn ghost" id="solBtn">📝 Розв’язання</button>
          <button type="button" class="btn" id="okBtn">✓ Готово</button>
        </div>
        <div class="mu-fb" id="fb" aria-live="polite">${done[it.n] ? '<div class="fb ok"><b>✓ Зроблено!</b></div>' : ""}</div>
        <div class="mu-nav">
          <button type="button" class="btn ghost" id="prevBtn"${k ? "" : " disabled"}>← Назад</button>
          <button type="button" class="btn" id="nextBtn">${last ? "До вправ ✓" : "Далі →"}</button>
        </div>
      </div>
    </div>
  </section>`;
    bindHome();

    // navigation: «Далі» always works, solved or not; after the last exercise → the tiles
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
    if (sq) sq.onclick = () => V.say(readText());
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

    // typing: a box is chosen by a tap; the number pad types numbers, the sign block types > < =
    const remember = () => {
      vals[it.n] = saved;
      store.set(K + "-vals", vals);
    };
    const fs = [...app.querySelectorAll(".mu-f")];
    let on = null;
    const focus = (el) => {
      fs.forEach((x) => x.classList.remove("on"));
      on = el;
      if (el) el.classList.add("on");
    };
    fs.forEach((el) => (el.onclick = () => focus(el)));
    focus(fs.find((x) => !x.textContent) || fs[0] || null);
    const fb = document.getElementById("fb");
    const clear = () => (fb.innerHTML = "");
    keyFn = fs.length
      ? (key) => {
          if (!on) return;
          const sign = on.classList.contains("sg");
          if (key === "next") {
            const i = fs.indexOf(on);
            return focus(fs[(i + 1) % fs.length]);
          }
          if (key !== "del" && sign !== /[<>=+−·:]/.test(key)) return; // a digit in a sign box, a sign in a number box
          on.classList.remove("ok", "no");
          if (key === "del") on.textContent = on.textContent.slice(0, -1);
          else if (sign) on.textContent = key;
          else if (on.textContent.length < 4)
            on.textContent =
              (on.textContent === "0" ? "" : on.textContent) + key;
          saved[on.dataset.f] = on.textContent;
          remember();
          clear();
          // a sign is one key: go on to the next empty sign box
          if (sign && key !== "del") {
            const i = fs.indexOf(on);
            const nx = [...fs.slice(i + 1), ...fs.slice(0, i)].find(
              (x) => x.classList.contains("sg") && !x.textContent,
            );
            if (nx) focus(nx);
          }
        }
      : null;
    app
      .querySelectorAll(".mu-pad [data-k], .mu-spad [data-k]")
      .forEach((b) => (b.onclick = () => keyFn && keyFn(b.dataset.k)));
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
        if (r.kind === "h") return;
        if (r.kind === "ch") {
          const v = (saved[fid(ri, 0)] || []).slice().sort();
          if (!v.length) return empty++;
          const ok = v.join("|") === r.want.slice().sort().join("|");
          if (!ok) wrong++;
          app
            .querySelectorAll(`[data-c="${fid(ri, 0)}"].on`)
            .forEach((b) =>
              b.classList.add(r.want.includes(b.dataset.v) ? "ok" : "no"),
            );
          return;
        }
        const got = r.want.map((_, j) => saved[fid(ri, j)] || "");
        if (got.some((x) => x === "")) return empty++;
        if (r.kind === "ops") {
          const ok = calc(r.fill(got)).v === r.eq;
          if (!ok) wrong++;
          got.forEach((_, j) =>
            app
              .querySelector(`[data-f="${fid(ri, j)}"]`)
              .classList.add(ok ? "ok" : "no"),
          );
          return;
        }
        // any: the numbers in any order (all the Saturdays …)
        const left = r.want.map(String);
        got.forEach((x, j) => {
          const el = app.querySelector(`[data-f="${fid(ri, j)}"]`);
          let ok;
          if (r.any) {
            const i = left.indexOf(String(Number(x)));
            ok = i >= 0;
            if (ok) left.splice(i, 1);
          } else
            ok =
              r.kind === "cmp"
                ? x === r.want[j]
                : Number(x) === Number(r.want[j]) ||
                  // alt: other right answers ("22" or "10" for 10 o'clock in the evening)
                  (r.alt || []).map(Number).includes(Number(x));
          if (!ok) wrong++;
          el.classList.add(ok ? "ok" : "no");
        });
      });
      if (empty) {
        fb.innerHTML = `<div class="fb no"><span>Заповни всі віконця.</span></div>`;
        return;
      }
      if (wrong) {
        fb.innerHTML = `<div class="fb no"><b>Не все правильно</b><span>Перевір червоні віконця. Можна подивитися 📝 Розв’язання.</span></div>`;
        return;
      }
      done[it.n] = true;
      store.set(K + "-done", done);
      app.querySelector(".mu-taskcard").classList.add("is-done");
      app.querySelector(".mu-strip").innerHTML = chips();
      bindChips();
      const left = items.filter((x) => !done[x.n]).length;
      fb.innerHTML = `<div class="fb ok"><b>✓ Молодець! Усе правильно.</b>${it.answer ? `<span>Відповідь: ${esc(it.answer)}</span>` : ""}<span>${left ? `Тут залишилось: ${left} ${vpr(left)}.` : "🎉 Усі вправи цього розділу зроблено!"}</span></div>`;
      document.getElementById("nextBtn").focus();
    };
    top0();
  }

  /* ================= games of the table (lessons with drill) ================= */
  // drill: {mul: [4]} → 4 · 2 … 4 · 9; {div: [4]} → 8 : 4 … 36 : 4 (the book's tables go from 2 to 9).
  // 🎲 Врозкид: every example once, in random order, typed on the number pad.
  // 🚀 Ракети: a rocket flies across with an example; tap the right answer of 4 before it is gone → it explodes.
  // Both end with the score, a reaction (90 % and more 🎆 fireworks, 70 % and more 👍, less 😢: 9–10 / 7–8 of 10) and the mistakes.
  const D = L.drill || {};
  const FACTS = [];
  (D.mul || []).forEach((n) => {
    for (let k = 2; k <= 9; k++) FACTS.push({ t: `${n} · ${k}`, v: n * k });
  });
  (D.div || []).forEach((n) => {
    for (let k = 2; k <= 9; k++) FACTS.push({ t: `${n * k} : ${n}`, v: k });
  });
  const GAMES = [
    { k: "mix", ic: "🎲", t: "Таблиця врозкид" },
    { k: "rocket", ic: "🚀", t: "Ракети" },
  ];
  const best = store.get(K + "-best", {});
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  // 3 wrong answers close to the right one: a neighbour of the table, ±1, ±2
  function options(f) {
    const n = (D.mul || D.div || [2])[0];
    const near = shuffle(
      [f.v + n, f.v - n, f.v + 1, f.v - 1, f.v + 2, f.v - 2, f.v + 10].filter(
        (x) => x > 0 && x !== f.v,
      ),
    );
    return shuffle([f.v, ...[...new Set(near)].slice(0, 3)]);
  }

  // the end of a game: the score, a reaction, the mistakes
  function result(g, right, wrong) {
    leave();
    if (best[g.k] === undefined || right > best[g.k]) {
      best[g.k] = right;
      store.set(K + "-best", best);
    }
    const share = right / FACTS.length;
    const mood =
      share >= 0.9
        ? { ic: "🎆", t: "Чудово!", c: "fw" }
        : share >= 0.7
          ? { ic: "👍", t: "Добре! Ще трохи — і буде відмінно.", c: "up" }
          : { ic: "😢", t: "Не засмучуйся, спробуй ще раз!", c: "cry" };
    app.innerHTML = `${hud(`${g.ic} ${g.t}`, "")}<section class="card pop mu-res">
    ${mood.c === "fw" ? `<div class="mu-fws" aria-hidden="true">${[0, 1, 2, 3, 4].map((i) => `<div class="mu-fw f${i}">${Array.from({ length: 12 }, (_, j) => `<i style="--a:${j * 30}deg"></i>`).join("")}</div>`).join("")}</div>` : ""}
    <div class="mu-mood ${mood.c}" aria-hidden="true">${mood.ic}</div>
    <h2 class="mu-score">${right} з ${FACTS.length}</h2>
    <p class="mu-rt">${esc(mood.t)}</p>
    ${
      wrong.length
        ? `<div class="mu-box mu-wrong"><b>Помилки</b>${wrong.map((w) => `<p><span class="mu-expr">${esc(w.t)} = ${w.v}</span> <small>${w.got === null ? "ракета відлетіла" : `твоя відповідь: ${esc(w.got)}`}</small></p>`).join("")}</div>`
        : `<p class="mu-rt">Жодної помилки! 🎉</p>`
    }
    <div class="mu-nav"><button type="button" class="btn ghost" id="backBtn">← До вправ</button><button type="button" class="btn" id="againBtn">🔁 Ще раз</button></div>
  </section>`;
    bindHome();
    document.getElementById("backBtn").onclick = home;
    document.getElementById("againBtn").onclick = GAME[g.k];
    top0();
  }

  // 🎲 every example once, in random order: type the answer, ✓ Перевірити
  function mix() {
    const g = GAMES[0];
    const list = shuffle(FACTS);
    const wrong = [];
    let right = 0;
    function show1(i) {
      leave();
      if (i >= list.length) return result(g, right, wrong);
      const f = list[i];
      let typed = "",
        checked = false;
      app.innerHTML = `${hud(`${g.ic} ${g.t}`, `${i + 1} / ${list.length}`)}<section class="card pop mu-game">
      <div class="mu-gq"><span class="mu-expr">${esc(f.t)} =</span><button type="button" class="mu-f on" id="ans" aria-label="Відповідь"></button>${sayBtn("sq")}</div>
      ${padHTML()}
      <div id="fb" class="mu-fb" aria-live="polite"></div>
      <div class="mu-acts"><button type="button" class="btn" id="okBtn">✓ Перевірити</button></div>
    </section>`;
      bindHome();
      const ans = document.getElementById("ans");
      const fb = document.getElementById("fb");
      const ok = document.getElementById("okBtn");
      const sq = document.getElementById("sq");
      if (sq) sq.onclick = () => V.say(spoken(f.t + " ="));
      function check() {
        if (checked) return show1(i + 1);
        if (!typed) {
          fb.innerHTML = `<div class="fb no"><span>Впиши відповідь.</span></div>`;
          return;
        }
        checked = true;
        ans.classList.remove("on");
        if (Number(typed) === f.v) {
          right++;
          ans.classList.add("ok");
          fb.innerHTML = `<div class="fb ok"><b>✓ Правильно!</b></div>`;
          setTimeout(() => ans.isConnected && show1(i + 1), 700);
        } else {
          wrong.push({ ...f, got: typed });
          ans.classList.add("no");
          fb.innerHTML = `<div class="fb no"><b>Ні: ${esc(f.t)} = ${f.v}</b></div>`;
          ok.textContent = "Далі →";
        }
      }
      keyFn = (key) => {
        if (key === "next") return check();
        if (checked) return;
        if (key === "del") typed = typed.slice(0, -1);
        else if (/^\d$/.test(key) && typed.length < 3) typed += key;
        ans.textContent = typed;
      };
      app
        .querySelectorAll(".mu-pad [data-k]")
        .forEach((b) => (b.onclick = () => keyFn(b.dataset.k)));
      ok.onclick = check;
      top0();
    }
    show1(0);
  }

  // 🚀 a rocket flies from left to right with an example; the right answer → it explodes
  const SPEED = { slow: 12, fast: 7 }; // seconds to cross
  function rocket() {
    leave();
    const g = GAMES[1];
    let speed = store.get(K + "-speed", "slow");
    if (!SPEED[speed]) speed = "slow";
    app.innerHTML = `${hud(`${g.ic} ${g.t}`, "")}<section class="card pop mu-game">
    <div class="mu-sky mu-intro"><span class="mu-rk"><span class="mu-rk-ic">🚀</span><span class="mu-rk-t">${esc(FACTS[0].t)}</span></span></div>
    <p class="mu-rt">Ракета летить із прикладом. Натисни правильну відповідь, поки вона не відлетіла, — і ракета вибухне!</p>
    <div class="mu-speed" role="group" aria-label="Швидкість">${[
      ["slow", "🐢 Повільно"],
      ["fast", "🐇 Швидко"],
    ]
      .map(
        ([k, t]) =>
          `<button type="button" class="btn ghost" data-sp="${k}" aria-pressed="${speed === k}">${t}</button>`,
      )
      .join("")}</div>
    <div class="mu-acts"><button type="button" class="btn" id="goBtn">🚀 Старт</button></div>
  </section>`;
    bindHome();
    app.querySelectorAll("[data-sp]").forEach(
      (b) =>
        (b.onclick = () => {
          speed = b.dataset.sp;
          store.set(K + "-speed", speed);
          app
            .querySelectorAll("[data-sp]")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    document.getElementById("goBtn").onclick = () =>
      fly(shuffle(FACTS), 0, 0, []);
    top0();

    function fly(list, i, right, wrong) {
      leave();
      if (i >= list.length) return result(g, right, wrong);
      const f = list[i];
      const opts = options(f);
      app.innerHTML = `${hud(`${g.ic} ${g.t}`, `${i + 1} / ${list.length}`)}<section class="card pop mu-game">
      <div class="mu-sky"><span class="mu-rk" id="rk" style="--dur:${SPEED[speed]}s"><span class="mu-rk-ic">🚀</span><span class="mu-rk-t">${esc(f.t)}</span></span><span class="mu-boom" id="boom" hidden>💥</span></div>
      <div class="mu-opts">${opts.map((o) => `<button type="button" class="mu-opt" data-v="${o}">${o}</button>`).join("")}</div>
      <div id="fb" class="mu-fb" aria-live="polite"></div>
    </section>`;
      bindHome();
      const rk = document.getElementById("rk");
      const fb = document.getElementById("fb");
      let over = false;
      const next = (ms) =>
        setTimeout(() => rk.isConnected && fly(list, i + 1, right, wrong), ms);
      const mark = () =>
        app.querySelectorAll(".mu-opt").forEach((b) => {
          b.disabled = true;
          if (+b.dataset.v === f.v) b.classList.add("ok");
        });
      rk.addEventListener("animationend", () => {
        if (over) return;
        over = true;
        wrong.push({ ...f, got: null });
        mark();
        fb.innerHTML = `<div class="fb no"><b>Ракета відлетіла: ${esc(f.t)} = ${f.v}</b></div>`;
        next(1600);
      });
      app.querySelectorAll(".mu-opt").forEach(
        (b) =>
          (b.onclick = () => {
            if (over) return;
            over = true;
            const v = +b.dataset.v;
            mark();
            if (v === f.v) {
              right++;
              // stop the rocket where it is and blow it up
              const sky = rk.parentElement.getBoundingClientRect();
              const r = rk.getBoundingClientRect();
              const boom = document.getElementById("boom");
              boom.style.left = `${r.left - sky.left + r.width / 2}px`;
              rk.style.animationPlayState = "paused";
              rk.classList.add("gone");
              boom.hidden = false;
              fb.innerHTML = `<div class="fb ok"><b>💥 Влучив! ${esc(f.t)} = ${f.v}</b></div>`;
              next(1100);
            } else {
              b.classList.add("no");
              wrong.push({ ...f, got: String(v) });
              rk.classList.add("away");
              fb.innerHTML = `<div class="fb no"><b>Ні: ${esc(f.t)} = ${f.v}</b></div>`;
              next(1600);
            }
          }),
      );
    }
  }
  const GAME = { mix, rocket };

  home();
})();
