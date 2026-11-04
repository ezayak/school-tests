#!/usr/bin/env node
// Register an Optima math lesson whose lesson-N.js is written:
//   node .claude/skills/optima-math/scripts/add.js N "ic" "card line (en)" ["New part title"]
// - lesson-N.html: a copy of lesson-2.html with lesson-N.js and the lesson's title
// - lessons.js: a card {n, title, en, path, ic, note: "с. … · K вправ"} at the end of the last part (or of a new part)
// - games.js, Математика entry: lesson-N.html / .js and every picture in img/lesson-N/ in "also", countLabel "N уроків"
// Run it again after changing the lesson: it replaces the card and the "also" lines instead of adding them twice.
// Then: prettier --write games.js optima/grade-3/math/lessons.js optima/grade-3/math/lesson-N.html, and check.js.
const fs = require("fs");
const path = require("path");
const [n, ic, en, part] = process.argv.slice(2);
if (!n || !ic || !en) {
  console.error('usage: add.js N "ic" "card line" ["New part title"]');
  process.exit(2);
}
const root = path.resolve(__dirname, "../../../..");
const dir = path.join(root, "optima/grade-3/math");
const w = {};
new Function(
  "window",
  fs.readFileSync(path.join(dir, `lesson-${n}.js`), "utf8"),
)(w);
const L = w.MATH_LESSON;
const count = L.groups.reduce((s, g) => s + g.items.length, 0);
const vpr = (k) =>
  k % 10 === 1 && k % 100 !== 11
    ? "вправа"
    : [2, 3, 4].includes(k % 10) && ![12, 13, 14].includes(k % 100)
      ? "вправи"
      : "вправ";
const games = L.drill
  ? ` · 🚀 таблиця ${[...(L.drill.mul || []).map((x) => "×" + x), ...(L.drill.div || []).map((x) => ":" + x)].join(", ")}`
  : "";
const q = JSON.stringify;

// the page
const html = fs
  .readFileSync(path.join(dir, "lesson-2.html"), "utf8")
  .replace("lesson-2.js", `lesson-${n}.js`)
  .replace(/<title>[^<]*<\/title>/, `<title>${L.title} · Математика</title>`);
fs.writeFileSync(path.join(dir, `lesson-${n}.html`), html);

// the card
const lp = path.join(dir, "lessons.js");
let ls = fs.readFileSync(lp, "utf8");
const card = `{ n: ${n}, title: ${q(L.title)}, en: ${q(en)}, path: "lesson-${n}.html", ic: ${q(ic)}, note: ${q(`${L.pages} · ${count} ${vpr(count)}${games}`)} },`;
const old = new RegExp(
  `\\{\\s*n: ${n},[\\s\\S]*?path: "lesson-${n}\\.html"[\\s\\S]*?\\},\\n`,
);
if (old.test(ls)) ls = ls.replace(old, card + "\n");
else {
  const end = ls.lastIndexOf("],", ls.lastIndexOf("],") - 1); // the end of the last part's items
  const add = part ? `]}, { t: ${q(part)}, items: [${card}` : card;
  ls = ls.slice(0, end) + add + "\n" + ls.slice(end);
}
fs.writeFileSync(lp, ls);

// games.js
const gp = path.join(root, "games.js");
let gs = fs.readFileSync(gp, "utf8");
const at = gs.indexOf('path: "optima/grade-3/math/index.html"');
const a0 = gs.indexOf("also: [", at);
const a1 = gs.indexOf("]", a0);
const base = "optima/grade-3/math/";
const mine = (x) =>
  x.startsWith(`${base}lesson-${n}.`) ||
  x.startsWith(`${base}img/lesson-${n}/`);
let also = gs
  .slice(a0 + 7, a1)
  .split("\n")
  .map((x) => x.trim().replace(/,$/, ""))
  .filter(Boolean)
  .map((x) => JSON.parse(x));
const was = also.findIndex(mine); // a lesson added before keeps its place
also = also.filter((x) => !mine(x));
const imgs = fs.existsSync(path.join(dir, `img/lesson-${n}`))
  ? fs
      .readdirSync(path.join(dir, `img/lesson-${n}`))
      .sort()
      .map((f) => `${base}img/lesson-${n}/${f}`)
  : [];
also.splice(
  was < 0 ? also.length : was,
  0,
  `${base}lesson-${n}.html`,
  `${base}lesson-${n}.js`,
  ...imgs,
);
gs =
  gs.slice(0, a0 + 7) +
  "\n" +
  also.map((x) => `      ${q(x)},`).join("\n") +
  "\n    " +
  gs.slice(a1);
const lw = {};
new Function("window", ls)(lw);
const total = lw.MATH_LESSONS.parts.reduce((s, p) => s + p.items.length, 0);
const uroky =
  total % 10 === 1 && total % 100 !== 11
    ? "урок"
    : [2, 3, 4].includes(total % 10) && ![12, 13, 14].includes(total % 100)
      ? "уроки"
      : "уроків";
const c0 = gs.indexOf("countLabel:", at);
const c1 = gs.indexOf("\n", c0);
gs = gs.slice(0, c0) + `countLabel: "${total} ${uroky}",` + gs.slice(c1);
fs.writeFileSync(gp, gs);
console.log(
  `lesson-${n}.html · card «${L.title}» (${count} ${vpr(count)}) · ${also.length} files in also · ${total} ${uroky}`,
);
