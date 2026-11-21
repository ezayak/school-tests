// Data check for one Arabic lesson, test or homework file.
// Usage: node check.js grade-3/term-1/arabic/test-3.js [--missing]
// Prints the number of Arabic words without a gloss (--missing lists them), and problems:
// a missing img file, a word without a picture, an item without a picture (tests: allowed when its tab shows a text),
// a duplicate mc option, a word answer that is empty.
// Words are matched like the engine does: exact, or without tashkeel. Single letters, syllables and "___" gaps are skipped.
const fs = require("fs"),
  path = require("path");
const f = process.argv[2];
if (!f) {
  console.error("usage: node check.js <file.js> [--missing]");
  process.exit(2);
}
global.window = {};
eval(fs.readFileSync(f, "utf8"));
const L = window.LESSON;
const H = /[ً-ٰٟـ]/g,
  bare = (s) => s.replace(H, "");
const texts = [];
const add = (s) => {
  if (typeof s === "string") texts.push(s);
  else if (Array.isArray(s)) s.forEach(add);
};
(L.stories || []).forEach((t) => {
  add(t.title);
  t.intro && add(t.intro.ar);
  t.parts.forEach((p) => {
    add(p.para);
    add(p.ar);
  });
});
(L.exercises || []).forEach((s) => {
  add(s.t);
  s.items.forEach((it) => {
    add(it.q);
    add(it.o);
    if (!it.plain) add(it.a);
    add(it.x);
    add(it.tag);
    (it.pairs || []).forEach((p) => {
      add(p[0]);
      add(p[1]);
    });
    if (it.help) {
      add(it.help.q);
      it.help.o.forEach((o) => add(Array.isArray(o) ? o[0] : o));
    }
  });
});
["opposites", "plurals", "meanings"].forEach((k) =>
  (L[k] || []).forEach((p) => {
    add(p[0]);
    add(p[1]);
  }),
);
const G = new Set(Object.keys(L.gloss || {}).map(bare));
const miss = new Map();
texts.forEach((t) =>
  t.split(/[\s–]+/).forEach((w) => {
    const c = w.replace(/^[«»"“”(]+/, "").replace(/[«»"“”)،,.؛;:؟?!…]+$/, "");
    if (!/[ء-ي]/.test(c) || c.includes("_") || bare(c).length < 2) return;
    if (!G.has(bare(c)) && !(L.gloss || {})[c]) miss.set(bare(c), c);
  }),
);
const dir = path.dirname(f),
  bad = [];
const chk = (p) => {
  if (p && !fs.existsSync(path.join(dir, p))) bad.push("missing file " + p);
};
chk(L.cover);
(L.stories || []).forEach((t) => {
  chk(t.cover);
  t.parts.forEach((p) => chk(p.img));
});
(L.words || []).forEach((w) => {
  chk(w.img);
  if (!w.img && !w.ic) bad.push("word without picture: " + w.ar);
});
Object.values(L.exPics || {}).forEach(chk);
const tabText = new Set(
  (L.tabs || []).filter((t) => t.story != null).map((t) => t.k),
);
(L.exercises || []).forEach((s) => {
  if (s.rule && typeof s.rule === "object") chk(s.rule.img);
  s.items.forEach((it, i) => {
    chk(it.img);
    const pic =
      it.img ||
      it.ic ||
      it.read != null ||
      (L.exPics || {})[s.k] ||
      tabText.has(s.tab);
    if (!s.cards && !pic) bad.push(`no picture: ${s.k} #${i + 1}`);
    if (it.o && new Set(it.o).size !== it.o.length)
      bad.push(`duplicate option: ${s.k} #${i + 1}`);
    if (it.type === "word" && !(it.a || []).length)
      bad.push(`word without answers: ${s.k} #${i + 1}`);
  });
});
console.log("words without gloss:", miss.size);
if (process.argv[3] === "--missing") console.log([...miss.values()].join("\n"));
console.log("problems:", bad.length ? bad.join("; ") : "none");
