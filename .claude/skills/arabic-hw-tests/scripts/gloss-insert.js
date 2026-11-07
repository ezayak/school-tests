// Put "word|en|uk" lines into the gloss of a data file (the file must have `gloss: {},` or an existing `gloss: {`).
// Usage: node gloss-insert.js grade-3/term-1/arabic/test-3.js words1.txt [words2.txt …]
// Later duplicates (same letters without tashkeel) and words already in the gloss are dropped. Run prettier after.
const fs = require("fs");
const H = /[ً-ٰٟـ]/g,
  bare = (s) => s.replace(H, "");
const [file, ...lists] = process.argv.slice(2);
let s = fs.readFileSync(file, "utf8");
global.window = {};
eval(s);
const seen = new Set(Object.keys(window.LESSON.gloss || {}).map(bare));
const out = [];
for (const l of lists.flatMap((f) =>
  fs.readFileSync(f, "utf8").trim().split("\n"),
)) {
  const [a, e, u] = l.split("|");
  if (!u || seen.has(bare(a))) continue;
  seen.add(bare(a));
  out.push(
    `    ${JSON.stringify(a)}: [${JSON.stringify(e)}, ${JSON.stringify(u)}],`,
  );
}
if (s.includes("  gloss: {},"))
  s = s.replace("  gloss: {},", "  gloss: {\n" + out.join("\n") + "\n  },");
else s = s.replace("  gloss: {\n", "  gloss: {\n" + out.join("\n") + "\n");
fs.writeFileSync(file, s);
console.log(out.length, "entries added");
