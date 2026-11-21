// Fill a gloss from the files that already have one.
// Usage: node gloss-reuse.js missing.txt out.txt grade-3/term-1/arabic/*.js
//   missing.txt: one word per line (from check.js --missing)
//   out.txt: "word|en|uk" for every word found in another file's gloss (same letters without tashkeel)
//   missing.txt.left: the words still to translate by hand; write them as "word|en|uk" lines too.
// Then put both lists into the file's gloss (see SKILL.md, step 5).
const fs = require("fs");
const H = /[ً-ٰٟـ]/g,
  bare = (s) => s.replace(H, "");
const [missF, outF, ...srcs] = process.argv.slice(2);
const pool = new Map();
for (const f of srcs) {
  global.window = {};
  try {
    eval(fs.readFileSync(f, "utf8"));
  } catch (e) {
    continue;
  }
  for (const [k, v] of Object.entries((window.LESSON || {}).gloss || {}))
    if (!pool.has(bare(k))) pool.set(bare(k), v);
}
const miss = fs
  .readFileSync(missF, "utf8")
  .trim()
  .split("\n")
  .filter((w) => bare(w).length > 1);
const out = [],
  left = [];
for (const w of miss) {
  const g = pool.get(bare(w));
  if (g) out.push([w, g[0], g[1]].join("|"));
  else left.push(w);
}
fs.writeFileSync(outF, out.join("\n") + "\n");
fs.writeFileSync(missF + ".left", left.join("\n") + "\n");
console.log(out.length, "reused,", left.length, "left in", missF + ".left");
