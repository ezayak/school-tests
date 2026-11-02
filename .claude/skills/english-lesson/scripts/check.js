// Data check for one English lesson and the stories it links to.
// Usage: node check.js <term folder> <lesson .js>   e.g. node check.js grade-4/term-2/english unit3-week5.js
// Checks: every item and card has a picture, every img/src file exists, tapw answers are in their text,
// sort words have a box, mc options are unique, every story page/question/summary card has a picture,
// the story's lesson and hub links exist, and every picture in img/ is used by some .js file.
const fs = require("fs");
const path = require("path");

const [dir, lessonFile] = process.argv.slice(2);
if (!dir || !lessonFile) {
  console.error("usage: node check.js <term folder> <lesson .js>");
  process.exit(2);
}
global.window = {};
const bad = [];
const hasPic = (o) => o.emoji || o.vis || o.src || o.img || o.e;
const exists = (p) =>
  fs.existsSync(path.join(dir, p)) || bad.push("missing file " + p);
const load = (f) => eval(fs.readFileSync(path.join(dir, f), "utf8"));

load(lessonFile);
const L = window.LESSON;
if (!L.question || !L.question.q) bad.push("no question (the engine needs it)");
exists(L.imgDir + "/" + L.cover + ".jpg");
const walk = (o) => {
  if (o && typeof o === "object") {
    if (typeof o.src === "string") exists(o.src);
    Object.values(o).forEach(walk);
  }
};
walk(L);

for (const d of L.decks) {
  if (!d.cover) bad.push("deck without cover " + d.k);
  d.cards.forEach((c, i) => hasPic(c) || bad.push(`card ${d.k}#${i}`));
}
// the same normalisation as itTap in shared/computer-lesson.js
const key = (w) =>
  w
    .replace(/^[“"‘'(]+|[”"’'),.!?:;]+$/g, "")
    .replace(/[’]/g, "'")
    .toLowerCase();
for (const g of [...L.games, ...L.exercises])
  g.items.forEach((it, i) => {
    const id = `${g.k}#${i}`;
    if (!["match", "sort"].includes(it.type) && !hasPic(it))
      bad.push("no picture " + id);
    if (it.type === "tapw") {
      const words = it.s.split(/\s+/).map(key);
      for (const k of Object.keys(it.ans)) {
        const n = words.filter((w) => w === key(k)).length;
        if (!n) bad.push(`tapw ${id}: "${k}" is not in the text`);
        if (n > 1)
          console.log(
            `note: tapw ${id}: "${k}" is in the text ${n} times (all count as one)`,
          );
      }
    }
    if (it.type === "sort") {
      const ks = new Set(it.cols.map((c) => c.k));
      it.words.forEach((w) => {
        if (![].concat(w.k).every((k) => ks.has(k)))
          bad.push("sort box " + w.w);
        if (!w.e) bad.push("sort picture " + w.w);
      });
    }
    if (it.type === "match")
      it.pairs.forEach(
        (p, j) => hasPic(p) || bad.push(`match ${id} pair ${j}`),
      );
    if (it.type === "mc") {
      if (new Set(it.opts).size !== it.opts.length)
        bad.push("same option twice " + id);
      if (Array.isArray(it.keep) && !it.opts.every((o) => it.keep.includes(o)))
        bad.push("keep list misses an option " + id);
    }
  });
const items = [...L.games, ...L.exercises].reduce(
  (a, g) => a + g.items.length,
  0,
);
console.log(
  `${lessonFile}: ${L.decks.length} decks · ${L.games.length} games · ${L.exercises.length} exercise sets · ${items} items`,
);

for (const st of L.stories) {
  exists(st.path);
  window.STORY = null;
  load(st.path.replace(/\.html$/, ".js"));
  const S = window.STORY;
  const pic = (o, what) =>
    o.img ? exists(o.img) : o.vis || bad.push(`${st.path} ${what}`);
  exists(S.cover);
  S.pages.forEach((p, i) => {
    pic(p, "page " + i);
    if (!p.easy) bad.push(`${st.path} page ${i} has no easy sentence`);
  });
  S.questions.forEach((q, i) => {
    pic(q, "question " + i);
    if (q.keep)
      bad.push(`${st.path} question ${i}: keep is not supported in stories`);
  });
  (S.summary || []).forEach((q, i) => pic(q, "summary " + i));
  for (const k of Object.keys(S.gloss || {}))
    if (/\s/.test(k))
      bad.push(`${st.path} gloss "${k}": keys must be one word`);
  exists(S.lesson.path);
  if (S.hub) exists(S.hub);
  console.log(
    `${st.path}: ${S.pages.length} pages · ${S.questions.length} questions`,
  );
}

// every picture file is used: by its path, or (lesson covers) by name inside its imgDir
const allJs = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".js"))
  .map((f) => fs.readFileSync(path.join(dir, f), "utf8"))
  .join(" ");
for (const d of fs.readdirSync(path.join(dir, "img")))
  for (const f of fs.readdirSync(path.join(dir, "img", d))) {
    const used =
      allJs.includes(`${d}/${f}`) ||
      (allJs.includes(`"img/${d}"`) &&
        allJs.includes(`"${f.replace(/\.jpg$/, "")}"`));
    if (!used) bad.push(`picture not used: img/${d}/${f}`);
  }

console.log(bad.length ? "PROBLEMS:\n" + bad.join("\n") : "all checks passed");
process.exit(bad.length ? 1 : 0);
