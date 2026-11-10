// Data check for one Computer lesson (Grade 4, shared/computer-lesson.js).
// Usage (repo root): node check.js <chapter folder> <lesson .js>
//   e.g. node .claude/skills/computer-lesson/scripts/check.js grade-4/computer/chapter-3 lesson-1.js
// Checks: the cover, question and every idea, word-free item and match pair has a picture; every img file exists;
// mc options are unique; order items point to a how-to; every how-to and sim item has steps whose targets the
// simulator knows (when the simulator exports TARGETS); every file in img/lesson-N/ is used; the lesson is in
// lessons.js and its files are in the "also" list of games.js.
const fs = require("fs");
const path = require("path");

const [dir, lessonFile] = process.argv.slice(2);
if (!dir || !lessonFile) {
  console.error("usage: node check.js <chapter folder> <lesson .js>");
  process.exit(2);
}
const bad = [];
const notes = [];
global.window = {};
global.document = undefined; // the simulators only touch the page inside create()
eval(fs.readFileSync(path.join(dir, lessonFile), "utf8"));
const L = window.LESSON;
const imgDir = L.imgDir || "img/lesson-" + L.n;
const used = new Set();
const img = (n, what) => {
  used.add(n + ".jpg");
  if (!fs.existsSync(path.join(dir, imgDir, n + ".jpg")))
    bad.push(`${what}: missing ${imgDir}/${n}.jpg`);
};
const hasPic = (o) =>
  o && (o.img || o.vis || o.emoji || o.e || o.icon || o.oi || o.oh || o.pics);
// any img / pics anywhere in the lesson must exist
const walk = (o, where) => {
  if (Array.isArray(o)) return o.forEach((x, i) => walk(x, `${where}#${i}`));
  if (!o || typeof o !== "object") return;
  if (typeof o.img === "string") img(o.img, where);
  if (Array.isArray(o.pics)) o.pics.forEach((p) => p && img(p, where));
  for (const [k, v] of Object.entries(o)) if (k !== "img") walk(v, where);
};
walk(L, "lesson");

if (!L.cover) bad.push("no cover");
if (!L.question || !L.question.q) bad.push("no question (the engine needs it)");
(L.ideas || []).forEach(
  (c, i) =>
    hasPic(c) || c.video || bad.push(`idea ${i} "${c.t}" has no picture`),
);

// the simulator the page loads: its TARGETS (regexes) say which step targets exist
const html = fs.readFileSync(
  path.join(dir, lessonFile.replace(/\.js$/, ".html")),
  "utf8",
);
let TARGETS = null;
for (const m of html.matchAll(/<script src="([^"]*sim\.js)"/g)) {
  try {
    eval(fs.readFileSync(path.join(dir, m[1]), "utf8"));
  } catch (e) {
    notes.push(`could not load ${m[1]} in node: ${e.message}`);
  }
  const S = window.NetSim || window.WordSim || window.WinSim;
  if (S && S.TARGETS) TARGETS = S.TARGETS;
}
const stepsOk = (steps, where) => {
  if (!Array.isArray(steps) || !steps.length)
    return bad.push(`${where}: no steps`);
  steps.forEach((s, i) => {
    if (!s.say) bad.push(`${where} step ${i}: no say`);
    if (s.act === "type" && !s.text)
      bad.push(`${where} step ${i}: type without text`);
    if (s.act === "key" && !s.key)
      bad.push(`${where} step ${i}: key without key`);
    if (TARGETS && s.t && !TARGETS.some((r) => r.test(s.t)))
      bad.push(`${where} step ${i}: unknown target "${s.t}"`);
  });
};
const HOW = L.howto || [];
HOW.forEach((h) => {
  stepsOk(h.steps, `howto ${h.k}`);
  if (!h.img && !h.vis) notes.push(`howto ${h.k} has no book picture`);
});
if (!TARGETS && HOW.length)
  notes.push("the simulator has no TARGETS list: step targets not checked");

let items = 0;
for (const g of [...(L.games || []), ...(L.exercises || [])]) {
  if (!g.items || !g.items.length) bad.push(`${g.k}: no items`);
  (g.items || []).forEach((it, i) => {
    items++;
    const id = `${g.k}#${i}`;
    if (
      !["match", "order", "sim", "wsearch", "touch"].includes(it.type) &&
      !hasPic(it)
    )
      bad.push(`no picture ${id}`);
    if (it.type === "mc") {
      if (new Set(it.opts).size !== it.opts.length)
        bad.push(`same option twice ${id}`);
      if (it.oi && it.oi.length !== it.opts.length)
        bad.push(`oi length ≠ opts ${id}`);
    }
    if (it.type === "match")
      it.pairs.forEach(
        (p, j) => hasPic(p) || bad.push(`match ${id} pair ${j}`),
      );
    if (it.type === "order" && it.howto && !HOW.some((h) => h.k === it.howto))
      bad.push(`order ${id}: no how-to "${it.howto}"`);
    if (it.type === "sim") stepsOk(it.steps, `sim ${id}`);
    if (it.type === "open" && !it.a) bad.push(`open ${id}: no model answer`);
    if (it.type === "tf" && typeof it.a !== "boolean")
      bad.push(`tf ${id}: a is not true/false`);
  });
}

// every picture file is used
const folder = path.join(dir, imgDir);
if (fs.existsSync(folder))
  for (const f of fs.readdirSync(folder))
    if (!used.has(f) && f !== L.cover + ".jpg")
      bad.push(`picture not used: ${imgDir}/${f}`);
img(L.cover, "cover");

// listed in lessons.js and (for offline) in games.js
const lessons = fs.readFileSync(path.join(dir, "..", "lessons.js"), "utf8");
const page = lessonFile.replace(/\.js$/, ".html");
const chap = path.basename(dir);
if (!new RegExp(`dir: "${chap}"[\\s\\S]*?path: "${page}"`).test(lessons))
  notes.push(`not in lessons.js yet (${chap}/${page})`);
const games = fs.readFileSync("games.js", "utf8");
const rel = (f) => path.join(dir, f).split(path.sep).join("/");
for (const f of [page, lessonFile, ...[...used].map((u) => imgDir + "/" + u)])
  if (fs.existsSync(path.join(dir, f)) && !games.includes(`"${rel(f)}"`))
    notes.push(`not in games.js also: ${rel(f)}`);

console.log(
  `${lessonFile}: ${(L.ideas || []).length} ideas · ${HOW.length} how-to's · ${(L.games || []).length} games · ${(L.exercises || []).length} exercise sets · ${items} items`,
);
notes.forEach((n) => console.log("note: " + n));
console.log(bad.length ? "PROBLEMS:\n" + bad.join("\n") : "all checks passed");
process.exit(bad.length ? 1 : 0);
