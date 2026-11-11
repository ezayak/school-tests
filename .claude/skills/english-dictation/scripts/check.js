// Data check for one English dictation (shared/spelling.js).
// Usage (from the repo root): node .claude/skills/english-dictation/scripts/check.js <dictation .js>
//   e.g. node .claude/skills/english-dictation/scripts/check.js grade-4/term-2/english/english-dictation-unit2-week5.js
// Checks: every item has a picture (a pics drawing, an emoji or an img that exists), every drawing is used,
// marks fall inside their word, every sentence contains its key, translations for every langs entry, no item twice,
// the page loads the data file and the engine, the hub link exists, the dictations.js entry and games.js also.
// Prints each word with its highlight [in brackets] and each sentence's key, to compare with the sheet.
const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) {
  console.error("usage: node check.js <dictation .js>");
  process.exit(2);
}
global.window = {};
eval(fs.readFileSync(file, "utf8"));
const D = window.SPELLING;
const dir = path.dirname(file);
const name = path.basename(file, ".js");
const bad = [];
const h = () => "";
const pics = D.pics
  ? D.pics({ em: h, tx: h, wv: h, ml: h, SKY: "", G: h, bubble: h })
  : {};
const used = new Set();

for (const k of ["title", "subtitle", "lang", "items"])
  if (!D[k]) bad.push("no " + k);
const seen = new Set();
const words = D.items.filter((i) => i.type !== "sentence");
const sents = D.items.filter((i) => i.type === "sentence");
for (const it of D.items) {
  const id = `"${it.w}"`;
  if (seen.has(it.w)) bad.push(id + " twice");
  seen.add(it.w);
  if (it.pic) {
    if (!pics[it.pic]) bad.push(id + ": no drawing " + it.pic);
    else {
      used.add(it.pic);
      try {
        pics[it.pic]();
      } catch (e) {
        bad.push(id + ": drawing " + it.pic + " fails: " + e.message);
      }
    }
  } else if (it.img) {
    if (!fs.existsSync(path.join(dir, it.img)))
      bad.push(id + ": missing " + it.img);
  } else if (!it.emoji) bad.push(id + ": no picture");
  for (const l of Object.keys(D.langs || {}))
    if (!it.tr || !it.tr[l]) bad.push(id + ": no " + l + " translation");
}
for (const k of Object.keys(pics))
  if (!used.has(k)) bad.push("drawing not used: " + k);

console.log(`${D.title} · ${words.length} words, ${sents.length} sentences`);
for (const it of words) {
  if (/\s/.test(it.w))
    bad.push(`"${it.w}": a word with a space (type: "sentence"?)`);
  let shown = it.w;
  if (it.mark) {
    const [i, n] = it.mark;
    if (i < 0 || n < 1 || i + n > it.w.length)
      bad.push(`"${it.w}": mark ${it.mark} is outside the word`);
    shown =
      it.w.slice(0, i) + "[" + it.w.slice(i, i + n) + "]" + it.w.slice(i + n);
  } else shown += "   (no mark: the long-vowel pattern is found by itself)";
  console.log("  " + shown);
}
for (const it of sents) {
  if (!it.key) bad.push(`"${it.w}": no key`);
  else if (!it.w.toLowerCase().includes(it.key.toLowerCase()))
    bad.push(`"${it.w}": the key "${it.key}" is not in it`);
  if (!/[.!?]$/.test(it.w)) bad.push(`"${it.w}": no end punctuation`);
  console.log(`  ${it.w}   [${it.key || "-"}]`);
}

// page, hub, lists
const page = path.join(dir, name + ".html");
if (!fs.existsSync(page)) bad.push("no page " + page);
else {
  const p = fs.readFileSync(page, "utf8");
  if (!p.includes(`src="${name}.js"`))
    bad.push("the page does not load " + name + ".js");
  if (!p.includes("shared/spelling.js"))
    bad.push("the page does not load shared/spelling.js");
  if (p.indexOf(`${name}.js`) > p.indexOf("shared/spelling.js"))
    bad.push("the data file must load before the engine");
}
const hub = path.join(dir, D.hub || "index.html");
if (!fs.existsSync(hub)) bad.push("the English link goes nowhere: " + hub);
const grade = file.match(/grade-\d/)[0];
const list = fs.readFileSync(`${grade}/term-1/english/dictations.js`, "utf8");
const rel = path.relative(`${grade}/term-1/english`, page);
if (!list.includes(`"${rel}"`))
  bad.push(`no entry for "${rel}" in ${grade}/term-1/english/dictations.js`);
const games = fs.readFileSync("games.js", "utf8");
for (const f of [page, file])
  if (!games.includes(`"${f}"`)) bad.push(`"${f}" is not in also (games.js)`);

console.log(bad.length ? "\nPROBLEMS:\n- " + bad.join("\n- ") : "\nOK");
process.exit(bad.length ? 1 : 0);
