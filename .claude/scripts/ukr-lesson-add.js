#!/usr/bin/env node
// Register the Optima Ukrainian lessons of a folder (shared/ukr-lesson.js) after a lesson-N.js is written or changed:
//   node .claude/scripts/ukr-lesson-add.js optima/grade-3/ukr-lit      (or optima/grade-3/ukr-mova)
// For every lesson-N.js of the folder, in the order of N:
// - lesson-N.html: a copy of lesson-1.html with lesson-N.js and «<title> · <subject>» (made when missing, the title kept up to date);
// - lessons.js: rebuilt from the lessons' heads: part {k, tab, ic, t} (lessons with the same part.k go together, in order),
//   the card {n, title, en: card.en, path, cover: img of card.cover | ic: card.ic, note: "<pages> · K питань / вправ"};
//   the intro and the comment at the top of lessons.js are kept;
// - games.js, the subject's entry: every lesson file and picture in "also" (other files there, like the rocket texts, are kept),
//   countLabel «N уроків» (reading: «N уроків · M тексти»), topics = the parts' book titles (the part of t after « · »).
// Run it again after any change: it rewrites, never doubles. Then prettier --write the three files and run ukr-lesson-check.js.
"use strict";
const fs = require("fs");
const path = require("path");
const dir = process.argv[2];
if (!dir) {
  console.error("usage: ukr-lesson-add.js <folder>");
  process.exit(2);
}
const load = (f, name) => {
  const w = {};
  new Function("window", fs.readFileSync(f, "utf8"))(w);
  return w[name];
};
const files = fs
  .readdirSync(dir)
  .map((f) => f.match(/^lesson-(\d+)\.js$/))
  .filter(Boolean)
  .map((m) => +m[1])
  .sort((a, b) => a - b);
const lessons = files.map((n) => ({
  n,
  L: load(path.join(dir, `lesson-${n}.js`), "UA_LESSON"),
}));
const S = lessons[0].L.subject;
const lit = S === "Українська література";
const plural = (n, [one, few, many]) =>
  n % 10 === 1 && n % 100 !== 11
    ? one
    : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)
      ? few
      : many;
const q = JSON.stringify;

// the pages
const tpl = fs.readFileSync(path.join(dir, "lesson-1.html"), "utf8");
for (const { n, L } of lessons) {
  if (L.n !== n) throw new Error(`lesson-${n}.js says n: ${L.n}`);
  if (!L.part || !L.card) throw new Error(`lesson-${n}.js: no part or card`);
  const f = path.join(dir, `lesson-${n}.html`);
  const old = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
  const title = `${L.title} · ${S}`;
  // an existing page whose title (maybe wrapped by Prettier) and script are right is left as it is
  const cur = old && old.match(/<title>([\s\S]*?)<\/title>/);
  if (
    old &&
    old.includes(`src="lesson-${n}.js"`) &&
    cur &&
    cur[1].replace(/\s+/g, " ").trim() === title
  )
    continue;
  const h = (old || tpl)
    .replace(/src="lesson-\d+\.js"/, `src="lesson-${n}.js"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  fs.writeFileSync(f, h);
}

// lessons.js
const lp = path.join(dir, "lessons.js");
const old = fs.readFileSync(lp, "utf8");
const top = old.slice(0, old.indexOf("window.UA_LESSONS"));
const M = load(lp, "UA_LESSONS");
const parts = [];
for (const { n, L } of lessons) {
  let p = parts.find((x) => x.k === L.part.k);
  if (!p) parts.push((p = { ...L.part, items: [] }));
  // reading: every question; language: the book's exercises (an exercise with several items counts once)
  const items = L.groups.flatMap((g) => g.items);
  const k = lit ? items.length : new Set(items.map((it) => it.n ?? it.k)).size;
  p.items.push({
    n,
    title: L.title,
    en: L.card.en,
    path: `lesson-${n}.html`,
    ...(L.card.cover
      ? { cover: `${L.img}${L.card.cover}.jpg` }
      : { ic: L.card.ic || "📖" }),
    note: `${L.pages} · ${k} ${plural(k, lit ? ["питання", "питання", "питань"] : ["вправа", "вправи", "вправ"])}`,
  });
}
fs.writeFileSync(
  lp,
  `${top}window.UA_LESSONS = ${q({ subject: S, grade: M.grade, intro: M.intro, parts }, null, 2)};\n`,
);

// games.js
const gp = "games.js";
let gs = fs.readFileSync(gp, "utf8");
const at = gs.indexOf(`subject: ${q(S)},`);
const a = gs.lastIndexOf("  {\n", at);
const b = gs.indexOf("\n  },\n", at) + 5;
let e = gs.slice(a, b);
const rel = dir.replace(/\/$/, "") + "/";
const mine = (f) =>
  f === rel + "lessons.js" ||
  /\/lesson-\d+\.(html|js)$/.test(f) ||
  f.startsWith(rel + "img/lesson-");
const also = [...e.match(/also: \[([\s\S]*?)\]/)[1].matchAll(/"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((f) => f.startsWith(rel));
const keep = also.filter((f) => !mine(f));
const add = [rel + "lessons.js"];
for (const { n, L } of lessons) {
  add.push(`${rel}lesson-${n}.html`, `${rel}lesson-${n}.js`);
  const id = path.join(dir, L.img);
  if (fs.existsSync(id))
    fs.readdirSync(id)
      .sort()
      .forEach((f) => add.push(path.join(rel, L.img, f)));
}
const list = [...add, ...keep];
e = e.replace(
  /also: \[[\s\S]*?\],/,
  `also: [\n${list.map((f) => `      ${q(f)},`).join("\n")}\n    ],`,
);
const texts = keep.filter((f) => f.endsWith(".html")).length;
const nl = lessons.length;
const count = `${nl} ${plural(nl, ["урок", "уроки", "уроків"])}${lit && texts ? ` · ${texts} ${plural(texts, ["текст", "тексти", "текстів"])}` : ""}`;
e = e.replace(/countLabel: "[^"]*"/, `countLabel: ${q(count)}`);
// topics: the book's section names (the part after « · » in t, the theme's subtitle)
const names = parts.map((p) => p.t.split(" · ").pop()).join(" · ");
const topics = lit && texts ? `${names} · Складова ракета` : names;
e = e.replace(/topics:\s*"[^"]*"/, `topics: ${q(topics)}`);
gs = gs.slice(0, a) + e + gs.slice(b);
fs.writeFileSync(gp, gs);
console.log(
  `${S}: ${nl} lessons in ${parts.length} parts; games.js ${count}; ${list.length} files in also`,
);
