#!/usr/bin/env node
// Check an Optima math lesson file: node .claude/skills/optima-math/scripts/check.js optima/grade-3/math/lesson-N.js
// - every learn card and exercise has what the engine needs; book numbers are unique
// - every expression can be worked out (whole, not negative); ■ only after a row it can come from
// - every written step "a op b = c" is right (learn examples, solutions; units in brackets are ignored)
// - a word problem has q, help, schema, steps, answer and an answer row; its answer number is in the last step
// - every picture exists, every picture in img/lesson-N/ is used, every picture is listed in games.js "also"
// - lessons.js has the lesson; games.js lists lesson-N.html / .js
// Prints the problems, or "OK" with a summary.
const fs = require("fs");
const path = require("path");
const file = process.argv[2];
if (!file) {
  console.error("usage: check.js optima/grade-3/math/lesson-N.js");
  process.exit(2);
}
const dir = path.dirname(file);
const window = {};
new Function("window", fs.readFileSync(file, "utf8"))(window);
const L = window.MATH_LESSON;
const bad = [];
const err = (where, msg) => bad.push(`${where}: ${msg}`);

// the engine's rules: brackets first, then × :, then + −, left to right
const OPS = { "-": "−", "−": "−", "+": "+", "×": "×", "·": "×", ":": ":" };
function calc(e, box) {
  const toks = String(e)
    .replace(/\s+/g, "")
    .match(/\d+|[-−+×·:()■]/g);
  if (!toks || toks.join("") !== String(e).replace(/\s+/g, ""))
    throw new Error(`can't read «${e}»`);
  const t = toks.map((x) =>
    x === "■" ? box : /\d/.test(x) ? Number(x) : OPS[x] || x,
  );
  if (t.includes(null) || t.includes(undefined))
    throw new Error(`■ with no row before it in «${e}»`);
  const one = (i0, i1) => {
    const seg = t.slice(i0, i1);
    let k = seg.findIndex((x) => x === "×" || x === ":");
    if (k < 0) k = seg.findIndex((x) => x === "+" || x === "−");
    if (k < 1) throw new Error(`bad expression «${e}»`);
    const [a, op, b] = seg.slice(k - 1, k + 2);
    const r =
      op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b;
    if (!Number.isInteger(r) || r < 0)
      throw new Error(`«${e}»: ${a} ${op} ${b} = ${r}`);
    t.splice(i0 + k - 1, 3, r);
  };
  let n = 0;
  while (t.length > 1) {
    if (++n > 50) throw new Error(`bad expression «${e}»`);
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
  return t[0];
}
// every "x = y" in a line where both sides are plain arithmetic must be true (each clause of "…, …; …" on its own)
function checkLine(where, line) {
  String(line)
    .replace(/[[\]]/g, "")
    .split(/[,;→]/)
    .forEach((c) => checkClause(where, line, c));
}
function checkClause(where, line, clause) {
  const s = clause
    .replace(/\([^()]*[а-яіїєґ'’.][^()]*\)/gi, "") // (м), (дер.), (грн)
    .replace(/^\s*\d+\)\s*/, "") // "1) "
    .replace(/[✓→…]/g, " ");
  // "1 м 6 дм = 16 дм": units outside brackets, not arithmetic
  if (/\d\s*[а-яіїєґ]/i.test(s)) return;
  // "□ : 5 = 3": an equation with an unknown, not a step
  if (s.includes("□")) return;
  const parts = s.split("=");
  if (parts.length < 2) return;
  const vals = parts.map((p) => {
    const m = p.match(/[\d(][\d\s()+\-−×·:]*$/) || p.match(/^[\s\d()+\-−×·:]+/);
    const x = m ? m[0].trim() : "";
    if (!x || /[^\d\s()+\-−×·:]/.test(x)) return null;
    try {
      return calc(x);
    } catch (e) {
      return null;
    }
  });
  for (let i = 0; i + 1 < vals.length; i++)
    if (vals[i] !== null && vals[i + 1] !== null && vals[i] !== vals[i + 1])
      err(where, `wrong step «${line}» (${vals[i]} ≠ ${vals[i + 1]})`);
}

// head
for (const k of ["key", "n", "title", "pages", "img", "learn", "groups"])
  if (L[k] === undefined) err("lesson", `no ${k}`);
if (L.key !== `om3-l${L.n}`) err("lesson", `key should be om3-l${L.n}`);
const used = new Set();
const pic = (where, name) => {
  const p = path.join(dir, L.img, name + ".jpg");
  if (!fs.existsSync(p)) err(where, `no picture ${p}`);
  used.add(name + ".jpg");
};
const isWordSchema = (v) => v && v.kind === "bar" && Array.isArray(v.rows);

// 📘 learn
L.learn.forEach((c, i) => {
  const w = `learn ${i + 1} «${c.t}»`;
  if (!c.t || !c.lines || !c.lines.length) err(w, "needs t and lines");
  if (!c.from) err(w, "no from (book number and page)");
  if (c.img) pic(w, c.img);
  if (c.schema && !isWordSchema(c.schema)) err(w, "schema is not a bar");
  (c.ex || []).forEach((x) => checkLine(w, x));
  c.lines.forEach((x) => checkLine(w, x));
});

// ✏️ groups
const nums = new Set();
let items = 0,
  word = 0;
L.groups.forEach((g) => {
  if (!g.t || !g.ic || !g.items || !g.items.length)
    err(`group «${g.t}»`, "needs t, ic, items");
  g.items.forEach((it) => {
    items++;
    const w = `№ ${it.n}`;
    if (!it.n || !it.p || !it.q) err(w, "needs n, p, q");
    if (nums.has(it.n)) err(w, "number used twice");
    nums.add(it.n);
    if (it.img) pic(w, it.img);
    if (!it.rows || !it.rows.length) err(w, "no rows (answers)");
    let box = null;
    (it.rows || []).forEach((r, ri) => {
      const rw = `${w} row ${ri + 1}`;
      try {
        if (r.h) box = null;
        else if (r.e !== undefined) box = calc(r.e, box);
        else if (r.cmp) {
          if (r.why) {
            if (!/^[<>=]$/.test(r.a)) err(rw, "a must be > < =");
          } else r.cmp.forEach((x) => calc(x));
          if (r.a && !/^[<>=]$/.test(r.a)) err(rw, "a must be > < =");
        } else if (r.ops) {
          const parts = r.ops.split("●");
          if (!Array.isArray(r.a) || r.a.length !== parts.length - 1)
            err(rw, "ops: a needs one sign per ●");
          else {
            const v = calc(parts.map((x, j) => x + (r.a[j] || "")).join(""));
            if (v !== r.eq)
              err(rw, `ops: ${r.a.join(" ")} gives ${v}, not ${r.eq}`);
          }
        } else if (r.ch) {
          [].concat(r.a).forEach((a) => {
            if (!r.ch.includes(a)) err(rw, `answer «${a}» is not a choice`);
          });
        } else if (!Array.isArray(r.a) || !r.a.every(Number.isFinite))
          err(rw, "a must be a list of numbers");
        else if (r.alt && !(r.a.length === 1 && r.alt.every(Number.isFinite)))
          err(rw, "alt (other right answers) needs one box and numbers");
      } catch (e) {
        err(rw, e.message);
      }
    });
    (it.steps || []).forEach((x) => checkLine(w, x));
    if (it.schema || it.help) {
      word++;
      for (const k of ["help", "schema", "steps", "answer"])
        if (!it[k]) err(w, `word problem without ${k}`);
      if (it.schema && !isWordSchema(it.schema)) err(w, "schema is not a bar");
      const last = (it.steps || []).slice(-1)[0] || "";
      const ans = (it.rows || []).flatMap((r) => r.a || []).map(String);
      ans.forEach((a) => {
        if (!new RegExp(`= ${a}\\b`).test(last))
          err(w, `answer ${a} is not the result of the last step «${last}»`);
        if (!String(it.answer).includes(a))
          err(w, `answer ${a} is not in the answer sentence`);
      });
    }
  });
});

// pictures: all used, all in games.js
const imgDir = path.join(dir, L.img);
if (fs.existsSync(imgDir))
  fs.readdirSync(imgDir).forEach((f) => {
    if (!used.has(f)) err("pictures", `${f} is not used`);
  });
const root = path.resolve(__dirname, "../../../..");
const games = fs.readFileSync(path.join(root, "games.js"), "utf8");
const rel = (f) => path.relative(root, path.resolve(f));
const need = [
  rel(file),
  rel(file.replace(/\.js$/, ".html")),
  ...[...used].map((f) => rel(path.join(imgDir, f))),
];
need.forEach((f) => {
  if (!fs.existsSync(path.join(root, f))) err("files", `missing ${f}`);
  if (!games.includes(`"${f}"`)) err("games.js", `${f} is not in also`);
});
const htmlFile = file.replace(/\.js$/, ".html");
const html = fs.existsSync(htmlFile) ? fs.readFileSync(htmlFile, "utf8") : "";
if (!html.includes(`src="${path.basename(file)}"`))
  err("html", `does not load ${path.basename(file)}`);
const lw = {};
new Function("window", fs.readFileSync(path.join(dir, "lessons.js"), "utf8"))(
  lw,
);
const card = lw.MATH_LESSONS.parts
  .flatMap((p) => p.items)
  .find((x) => x.path === path.basename(file).replace(/\.js$/, ".html"));
if (!card) err("lessons.js", "no card for this lesson");
else if (card.n !== L.n) err("lessons.js", `card n ${card.n} ≠ ${L.n}`);

if (bad.length) {
  console.log(bad.join("\n"));
  process.exit(1);
}
console.log(
  `OK · ${L.learn.length} learn cards · ${items} exercises (${word} word problems) · ${used.size} pictures`,
);
