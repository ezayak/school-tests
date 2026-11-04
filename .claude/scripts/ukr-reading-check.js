// Checks a Ukrainian reading text (optima/grade-3/ukr-lit/<name>.js) before it is committed.
// Usage (from the repo root):
//   node .claude/scripts/ukr-reading-check.js optima/grade-3/ukr-lit/litachky.js
//   node .claude/scripts/ukr-reading-check.js optima/grade-3/ukr-lit/litachky.js "<book.pdf>" 18
// Checks:
//   - every syllable has one vowel (one-letter words like «з», «й» have none);
//   - every word of two syllables or more has one "*", at the start of a syllable (before « if there is one);
//     a hyphenated word ("*мо-ря‑-о-ке-*а-ни") has one per part;
//   - every launch / fuel word is in the text with the same syllables and stress, and none is there twice;
//   - with a PDF and a page: the text, without "-" and "*", is on that page word for word (needs pdftotext).
"use strict";
const fs = require("fs");
const { execFileSync } = require("child_process");
const [file, pdf, page] = process.argv.slice(2);
if (!file) {
  console.log("usage: node ukr-reading-check.js <text.js> [<book.pdf> <page>]");
  process.exit(2);
}
const w = {};
new Function("window", fs.readFileSync(file, "utf8"))(w);
const R = w.READING;
const pages = R.pages || [R.text];
const lines = pages.flat();
const V = /[аеєиіїоуюя]/gi;
const bad = [];

// the word without the punctuation around it: "*«Ма-буть," → "*Ма-буть"
const core = (x) =>
  x
    .replace(/^(\*?)[«"(]+/, "$1")
    .replace(/[.,!?:;…»")]+$/, "")
    .replace(/‑$/, "");
function word(x, where) {
  if (x === "–") return;
  const c = core(x);
  for (const part of c.split("‑")) {
    const syl = part.split("-").filter(Boolean);
    for (const s of syl) {
      const n = (s.match(V) || []).length;
      if (n !== 1 && !(n === 0 && syl.length === 1 && c.length === 1))
        bad.push(`${where}: «${x}» syllable «${s}» has ${n} vowels`);
      if (s.slice(1).includes("*"))
        bad.push(`${where}: «${x}» "*" inside a syllable`);
    }
    const st = (part.match(/\*/g) || []).length;
    if (syl.length > 1 && st !== 1)
      bad.push(`${where}: «${x}» has ${st} stress marks`);
    if (syl.length === 1 && st > 0)
      bad.push(`${where}: «${x}» one syllable with a stress mark`);
  }
  if (/^[«"(]+\*/.test(x))
    bad.push(`${where}: «${x}» "*" goes before the quote`);
}
lines.forEach((l, i) => l.split(" ").forEach((x) => word(x, `line ${i + 1}`)));
const inText = new Set(
  lines.flatMap((l) => l.split(" ").map((x) => core(x).toLowerCase())),
);
for (const k of ["launch", "fuel"]) {
  const L = R[k] || [];
  L.forEach((x) => {
    word(x, k);
    if (!inText.has(x.toLowerCase()))
      bad.push(`${k}: «${x}» is not in the text with these syllables`);
  });
  if (new Set(L).size !== L.length) bad.push(`${k}: a word is there twice`);
}

if (pdf) {
  const norm = (s) =>
    s
      .replace(/[​\s]+/g, " ")
      .replace(/[’']/g, "’")
      .replace(/‑/g, "-")
      .trim();
  const book = norm(
    execFileSync("pdftotext", ["-f", page, "-l", page, pdf, "-"], {
      encoding: "utf8",
    }),
  );
  const mine = norm(
    lines
      .join(" ")
      .replace(/\*/g, "")
      .replace(/‑-/g, "‑")
      .replace(/-/g, "")
      .replace(/‑/g, "-"),
  );
  if (!book.includes(mine)) {
    const a = mine.split(" ");
    let i = 0;
    while (i < a.length && book.includes(a.slice(0, i + 1).join(" "))) i++;
    bad.push(
      `book p. ${page}: the text differs from word ${i + 1}: «${a.slice(Math.max(0, i - 3), i + 3).join(" ")}»`,
    );
  }
}

const words = lines.join(" ").split(" ").length;
console.log(
  `${R.title}: ${pages.length} page(s), ${lines.length} lines, ${words} words, launch ${(R.launch || []).length}, fuel ${(R.fuel || []).length}`,
);
if (pdf && !bad.some((b) => b.startsWith("book")))
  console.log(`text matches the book, p. ${page}`);
console.log(bad.length ? bad.join("\n") : "no problems");
process.exit(bad.length ? 1 : 0);
