// Checks an Optima Ukrainian language or reading lesson (shared/ukr-lesson.js) before it is committed.
// Usage (from the repo root):
//   node .claude/scripts/ukr-lesson-check.js optima/grade-3/ukr-mova/lesson-1.js
//   node .claude/scripts/ukr-lesson-check.js optima/grade-3/ukr-lit/lesson-1.js
// Checks:
//   - the head (subject, key, n, title, pages, img) and learn slides (language) or texts (reading);
//   - every exercise: a question, a picture (img) or an emoji (ic), rows of a known kind, ids not twice;
//     choices: the right answer(s) among the options, no option twice; word: letters only, more than one;
//     order: 2 words or more, alt orders use the same words; open: a model answer;
//   - texts: paras (poem: arrays of lines), no double spaces, ’ (not ') in words;
//   - pictures: every img exists, every .jpg in img/lesson-N/ is used and is in "also" of games.js;
//   - lesson-N.html loads lesson-N.js and the engine; a card in lessons.js with this path; the files in games.js.
"use strict";
const fs = require("fs");
const path = require("path");
const file = process.argv[2];
if (!file) {
  console.log("usage: node ukr-lesson-check.js <lesson-N.js>");
  process.exit(2);
}
const dir = path.dirname(file);
const base = path.basename(file, ".js");
const w = {};
new Function("window", fs.readFileSync(file, "utf8"))(w);
const L = w.UA_LESSON;
const bad = [];
const err = (m) => bad.push(m);
const isLit = !!L.texts;

for (const k of ["subject", "key", "n", "title", "pages", "img"])
  if (L[k] == null) err(`head: no ${k}`);
if (!["Українська мова", "Українська література"].includes(L.subject))
  err(`head: subject "${L.subject}"`);
if (isLit && L.learn) err("a reading lesson has texts, not learn slides");
if (!isLit && !(L.learn || []).length)
  err("a language lesson needs learn slides");

const used = new Set();
const pic = (where, name) => {
  used.add(name + ".jpg");
  if (!fs.existsSync(path.join(dir, L.img, name + ".jpg")))
    err(`${where}: picture ${L.img}${name}.jpg is missing`);
};

(L.learn || []).forEach((c, i) => {
  const at = `slide ${i + 1}`;
  if (!c.t || !(c.lines || []).length) err(`${at}: t and lines`);
  if (c.img) pic(at, c.img);
});

(L.texts || []).forEach((x, i) => {
  const at = `text ${i + 1} «${x.t}»`;
  if (!x.t || !(x.paras || x.pages || []).length)
    err(`${at}: t and paras (or pages)`);
  const paras = x.pages ? x.pages.flat() : x.paras || [];
  if (x.img) pic(at, x.img);
  else err(`${at}: no picture`);
  const lines = x.poem ? paras.flat() : paras;
  if (x.poem && !paras.every(Array.isArray))
    err(`${at}: a poem's paras are arrays of lines`);
  lines.forEach((l) => {
    if (typeof l !== "string") return err(`${at}: a line is not text`);
    if (/\s{2,}|^\s|\s$/.test(l)) err(`${at}: spaces in «${l}»`);
    if (/\p{L}'\p{L}/u.test(l)) err(`${at}: ' instead of ’ in «${l}»`);
    if (/ - /.test(l)) err(`${at}: - instead of — in «${l}»`);
  });
});

const ids = new Set();
(L.groups || []).forEach((g, gi) => {
  if (!g.t || !g.ic) err(`group ${gi + 1}: t and ic`);
  g.items.forEach((it, k) => {
    const id = it.k || (it.n != null ? String(it.n) : `${gi + 1}-${k + 1}`);
    const at = `«${g.t}» ${id}`;
    if (ids.has(id)) err(`${at}: id twice (give it k)`);
    ids.add(id);
    if (!it.q) err(`${at}: no q`);
    if (!it.img && !it.ic) err(`${at}: no picture (img) or emoji (ic)`);
    if (it.img) pic(at, it.img);
    if (it.ic && [...it.ic.matchAll(/\p{Extended_Pictographic}/gu)].length > 2)
      err(`${at}: more than 2 emoji in ic`);
    if (!(it.rows || []).length) err(`${at}: no rows`);
    (it.rows || []).forEach((r, ri) => {
      const rat = `${at} row ${ri + 1}`;
      const kinds = ["ch", "word", "order", "open"].filter((x) => r[x] != null);
      if (kinds.length !== 1)
        return err(`${rat}: one of ch / word / order / open`);
      if (r.ch) {
        const want = [].concat(r.a ?? []);
        if (!want.length) err(`${rat}: no a`);
        want.forEach(
          (a) => r.ch.includes(a) || err(`${rat}: «${a}» is not an option`),
        );
        if (new Set(r.ch).size !== r.ch.length) err(`${rat}: an option twice`);
        if (r.ch.length < 2) err(`${rat}: fewer than 2 options`);
      }
      if (r.word != null) {
        if (!/^[\p{L}’]{2,}$/u.test(r.word)) err(`${rat}: word «${r.word}»`);
        if (new Set(r.word).size === 1) err(`${rat}: one letter only`);
      }
      if (r.order) {
        if (r.order.length < 2) err(`${rat}: fewer than 2 words`);
        (r.alt || []).forEach((o) => {
          if (o.slice().sort().join("|") !== r.order.slice().sort().join("|"))
            err(`${rat}: alt «${o.join(" ")}» has other words`);
        });
      }
      if (r.open != null && !String(r.open).trim())
        err(`${rat}: no model answer`);
    });
  });
});

// pictures: all used, all in games.js
const games = fs.readFileSync("games.js", "utf8");
const imgDir = path.join(dir, L.img);
if (fs.existsSync(imgDir))
  fs.readdirSync(imgDir).forEach((f) => {
    if (!used.has(f)) err(`picture ${L.img}${f} is not used`);
  });
used.forEach((f) => {
  const p = path.join(dir, L.img, f);
  if (fs.existsSync(p) && !games.includes(`"${p}"`))
    err(`picture ${p} is not in "also" of games.js`);
});

// the page, the card, games.js
const html = path.join(dir, base + ".html");
if (!fs.existsSync(html)) err(`${html} is missing`);
else {
  const h = fs
    .readFileSync(html, "utf8")
    .replace(/\s+/g, " ")
    .replace(/> /g, ">")
    .replace(/ </g, "<"); // prettier may wrap the title
  for (const s of [
    `src="${base}.js"`,
    "shared/ukr-lesson.js",
    "shared/common.js",
    "shared/ukr-lesson.css",
    "shared/drag-words.css",
    "shared/math-uk.css",
    'translate="no"',
    `data-subject="${L.subject}"`,
  ])
    if (!h.includes(s)) err(`${html}: no ${s}`);
  if (!h.includes(`<title>${L.title} · ${L.subject}</title>`))
    err(`${html}: <title>${L.title} · ${L.subject}</title>`);
}
const lw = {};
new Function("window", fs.readFileSync(path.join(dir, "lessons.js"), "utf8"))(
  lw,
);
const card = lw.UA_LESSONS.parts
  .flatMap((p) => p.items)
  .find((it) => it.path === base + ".html");
if (!card) err(`lessons.js: no card for ${base}.html`);
else if (card.n !== L.n) err(`lessons.js: n ${card.n}, the lesson says ${L.n}`);
for (const f of [html, file])
  if (!games.includes(`"${f}"`)) err(`${f} is not in "also" of games.js`);

const n = (L.groups || []).reduce((s, g) => s + g.items.length, 0);
if (bad.length) {
  console.log(bad.map((b) => "✗ " + b).join("\n"));
  process.exit(1);
}
console.log(
  `OK ${file}: ${isLit ? `${L.texts.length} text(s)` : `${L.learn.length} slides`}, ${L.groups.length} groups, ${n} items, ${used.size} pictures`,
);
