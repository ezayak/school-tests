// Data check for Grade 4 Science lessons (shared/computer-lesson.js, data-subject="Science").
// Usage (repo root): node .claude/skills/science-lesson/scripts/check.js grade-4/science/topic-3/lesson-1.js [more lesson .js]
// Checks: every idea card, game and exercise item has a picture (img, emoji, vis, or pics / icons on the answers), every picture file exists,
// every mc answer has a picture or emoji, a sentence answer has an explanation (x), mc options are unique, order steps have pictures, every picture in the lesson's img folder is used,
// the lesson is in lessons.js, and every picture of the folder is listed in games.js (offline).
const fs = require("fs");
const path = require("path");

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node check.js <topic-N/lesson-M.js> …");
  process.exit(2);
}
const games = fs.readFileSync("games.js", "utf8");
global.window = {};
eval(fs.readFileSync("grade-4/science/lessons.js", "utf8"));
const listed = window.CS_LESSONS.chapters.flatMap((ch) =>
  ch.items.map((it) => `grade-4/science/${ch.dir}/${it.path}`),
);
let problems = 0;
for (const file of files) {
  const bad = [];
  const dir = path.dirname(file);
  window.LESSON = null;
  eval(fs.readFileSync(file, "utf8"));
  const L = window.LESSON;
  const imgDir = path.join(dir, L.imgDir || "img/lesson-" + L.n);
  const used = new Set();
  const img = (n, id) => {
    if (!n) return;
    used.add(n + ".jpg");
    if (!fs.existsSync(path.join(imgDir, n + ".jpg")))
      bad.push(`missing picture ${n}.jpg (${id})`);
  };
  const hasPic = (o) => o.img || o.emoji || o.vis || o.e || o.pics || o.icons;
  img(L.cover, "cover");
  if (L.question) img(L.question.img, "question");
  if (!L.key || !/^sci4-t\d+-l\d+$/.test(L.key)) bad.push("key " + L.key);
  (L.ideas || []).forEach((c, i) => {
    img(c.img, "idea " + i);
    if (!hasPic(c)) bad.push(`idea ${i} "${c.t}" has no picture`);
  });
  const sets = [...(L.games || []), ...(L.exercises || [])];
  for (const g of sets)
    g.items.forEach((it, i) => {
      const id = `${g.k}#${i}`;
      img(it.img, id);
      (it.pics || []).forEach((p) => img(p, id));
      if (!["match", "multi", "order", "sort"].includes(it.type) && !hasPic(it))
        bad.push("no picture " + id);
      if (it.type === "mc" && !it.tf) {
        // Alex has aphasia: every answer has a picture or an emoji too
        const bare = it.opts.filter(
          (o, k) => !(it.pics && it.pics[k]) && !(it.icons && it.icons[k]),
        );
        if (bare.length)
          bad.push(`answers without a picture ${id}: ${bare.join(" · ")}`);
        // a sentence as the answer gets an explanation (x) after it is chosen
        if (it.opts[0].split(" ").length > 4 && !it.x)
          bad.push(`sentence answer without an explanation (x) ${id}`);
      }
      if (it.type === "mc") {
        if (new Set(it.opts).size !== it.opts.length)
          bad.push("same option twice " + id);
        if (it.pics && it.pics.length !== it.opts.length)
          bad.push("pics and opts differ in length " + id);
      }
      if (it.type === "multi")
        it.opts.forEach((o, j) => {
          img(o.img, id);
          if (!hasPic(o)) bad.push(`multi ${id} option ${j} has no picture`);
        });
      if (it.type === "match")
        it.pairs.forEach((p, j) => {
          img(p.img, id);
          if (!hasPic(p) && !p.icon) bad.push(`match ${id} pair ${j}`);
        });
      if (it.type === "order" && it.steps)
        it.steps.forEach((s, j) => {
          img(s.img, id);
          if (!s.img && !s.e) bad.push(`order ${id} step ${j} has no picture`);
        });
    });
  // pictures used in a vis (strip, bars) by name
  JSON.stringify(L).replace(/"img":"([^"]+)"/g, (_, n) => used.add(n + ".jpg"));
  for (const f of fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : []) {
    if (!used.has(f)) bad.push(`picture not used: ${f}`);
    if (!games.includes(`"${path.join(imgDir, f)}"`))
      bad.push(`not in games.js also: ${path.join(imgDir, f)}`);
  }
  const html = file.replace(/\.js$/, ".html");
  if (!fs.existsSync(html)) bad.push("no " + html);
  if (!listed.includes(html)) bad.push("not in lessons.js");
  for (const f of [file, html])
    if (!games.includes(`"${f}"`)) bad.push(`not in games.js also: ${f}`);
  const n = sets.reduce((a, g) => a + g.items.length, 0);
  console.log(
    `${file}: ${(L.ideas || []).length} cards · ${(L.games || []).length} games · ${(L.exercises || []).length} exercise sets · ${n} items`,
  );
  bad.forEach((b) => console.log("  " + b));
  problems += bad.length;
}
console.log(problems ? `${problems} problems` : "all checks passed");
process.exit(problems ? 1 : 0);
