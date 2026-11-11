// node .claude/scripts/arabic-reading-game-data.js
// Builds the data of the two Arabic reading games from the Grade 3 Arabic lessons and the reading steps:
//   arabic-reading/game-words.js     window.GAME_WORDS = [[word, en, uk], …]   (one word, no spaces)
//   arabic-reading/game-sentences.js window.GAME_SENTENCES = [{q, a, o, img | ic, en, uk}, …]
// A sentence is a lesson "mc" item with a gap (___), at most 10 words, no brackets, quotes or questions, one-word options.
// It gets more wrong options (5 in all): words from other items' options with the same last vowel and the same "ال".
// Run it again after adding lessons or steps; the output is the same each time (no randomness).
const fs = require("fs");
const R = __dirname + "/../../";
const H = /[ً-ْٰـ]/g;
const bare = (s) => s.replace(H, "");
function load(f) {
  global.window = { READING_LINKS: [] };
  global.document = { currentScript: { src: "" } };
  eval(fs.readFileSync(R + f, "utf8"));
  return window.LESSON;
}
const lessons = fs
  .readdirSync(R + "grade-3/term-1/arabic")
  .filter((f) => /^lesson-\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.slice(7)) - parseInt(b.slice(7)))
  .map((f) => "grade-3/term-1/arabic/" + f);
const steps = fs
  .readdirSync(R + "arabic-reading")
  .filter((f) => f.endsWith(".js") && !/^(lessons|hub|game-)/.test(f))
  .sort()
  .map((f) => "arabic-reading/" + f);

// words: the lessons' word lists, then the words read in the steps (their meaning from the step's gloss)
const words = new Map();
const one = (w) => w && !/[\s–\-_«»().،؟]/.test(w) && bare(w).length >= 2;
for (const f of lessons)
  for (const w of load(f).words || [])
    if (one(w.ar) && !words.has(bare(w.ar)))
      words.set(bare(w.ar), [w.ar, w.en, w.uk]);
for (const f of steps) {
  const L = load(f);
  for (const s of L.exercises || [])
    for (const it of s.items)
      if (it.type === "read" && one(it.a) && !words.has(bare(it.a))) {
        const g = (L.gloss || {})[it.a] || (L.gloss || {})[bare(it.a)];
        if (g) words.set(bare(it.a), [it.a, g[0], g[1]]);
      }
}

// sentences
const last = (w) => (w.match(/[ً-ِ](?=[^ً-ْ]*$)/) || [""])[0];
const al = (w) => /^ال/.test(bare(w));
const items = [];
for (const f of lessons) {
  const L = load(f);
  for (const s of L.exercises || [])
    for (const it of s.items) {
      if (it.type !== "mc" || !/_{3}/.test(it.q)) continue;
      if (/[():«»؟?\-–←]/.test(it.q) || it.q.split(" ").length > 10) continue;
      if (!it.o.every((o) => !o.includes(" "))) continue;
      // a gap inside a word (النَّبَاتَا___) or an option that is a piece of a word (ـهِ)
      if (/[^\s]_{3}|_{3}[^\s.،]/.test(it.q) || it.o.some((o) => /ـ/.test(o)))
        continue;
      items.push({ f, it, L });
    }
}
// the extra wrong options: real words only (glossed in their lesson, not marked as a wrong spelling, no syllables)
const gl = (L, w) => (L.gloss || {})[w] || (L.gloss || {})[bare(w)];
const pool = [
  ...new Set(
    items.flatMap(({ it, L }) =>
      it.o.filter((w) => {
        const g = gl(L, w);
        return g && !/✗|wrong|spelt|syllable/i.test(g[0]) && !/نْ$/.test(w);
      }),
    ),
  ),
];
const seen = new Set();
const sentences = [];
items.forEach(({ f, it }, n) => {
  const key = bare(it.q) + "|" + bare(it.o[0]);
  if (seen.has(key)) return;
  seen.add(key);
  const a = it.o[0];
  const have = new Set(it.o.map(bare));
  const fits = pool.filter(
    (w) => !have.has(bare(w)) && last(w) === last(a) && al(w) === al(a),
  );
  const extra = [];
  const need = 5 - it.o.length; // 5 options in all
  for (let k = 0; extra.length < need && k < fits.length; k++) {
    const w = fits[(n * 7 + k * 13) % fits.length];
    if (!extra.includes(w)) extra.push(w);
  }
  if (extra.length < need) return;
  const e = {
    q: it.q.trim(),
    a,
    o: [...it.o.slice(1), ...extra],
    en: it.en || "",
    uk: it.uk || "",
  };
  if (it.img) e.img = "../grade-3/term-1/arabic/" + it.img;
  else if (it.ic) e.ic = it.ic;
  sentences.push(e);
});

const head = (what) =>
  `// ${what}. Made by .claude/scripts/arabic-reading-game-data.js from the Grade 3 Arabic lessons and the reading steps: don't edit by hand.\n`;
fs.writeFileSync(
  R + "arabic-reading/game-words.js",
  head("Words of the game «Catch the word»") +
    "window.GAME_WORDS = " +
    JSON.stringify([...words.values()]) +
    ";\n",
);
fs.writeFileSync(
  R + "arabic-reading/game-sentences.js",
  head("Sentences of the game «Complete the sentence»") +
    "window.GAME_SENTENCES = " +
    JSON.stringify(sentences) +
    ";\n",
);
console.log(
  "words",
  words.size,
  "sentences",
  sentences.length,
  "with a picture",
  sentences.filter((s) => s.img || s.ic).length,
);
