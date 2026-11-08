// Data check for Grade 4 Science and Social Studies lessons (shared/computer-lesson.js, data-subject="Science" / "Social Studies").
// Usage (repo root): node .claude/skills/science-lesson/scripts/check.js grade-4/science/topic-3/lesson-1.js [more lesson .js]
//                    node .claude/skills/science-lesson/scripts/check.js grade-4/social-studies/chapter-1/lesson-4.js
// Checks: every idea card, game and exercise item has a picture (img, emoji, vis, or pics / icons on the answers), every picture file exists,
// every mc answer has a picture or emoji, a sentence answer has an explanation (x), mc options are unique, order steps have pictures, every picture in the lesson's img folder is used,
// the lesson is in lessons.js, and every picture of the folder is listed in games.js (offline).
// A lesson's stories (shared/story.js pages): every page and summary card has a picture, every picture exists and is used and offline,
// gloss keys are single lower-case words that are in the text, the lesson and hub links open.
const fs = require("fs");
const path = require("path");

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node check.js <topic-N/lesson-M.js> …");
  process.exit(2);
}
const games = fs.readFileSync("games.js", "utf8");
global.window = {};
let problems = 0;
for (const file of files) {
  const bad = [];
  const dir = path.dirname(file);
  // the subject folder (grade-4/science, grade-4/social-studies) has the lessons.js
  const subj = path.dirname(dir);
  window.CS_LESSONS = null;
  eval(fs.readFileSync(path.join(subj, "lessons.js"), "utf8"));
  const listed = window.CS_LESSONS.chapters.flatMap((ch) =>
    ch.items.map((it) => `${subj}/${ch.dir}/${it.path}`),
  );
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
  if (!L.key || !/^(sci4-t|ss4-c)\d+-(l\d+|review)$/.test(L.key))
    bad.push("key " + L.key);
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
  for (const st of L.stories || []) story(st, dir, imgDir, bad);
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

// a story page of the lesson (shared/story.js): window.STORY in the .js next to its .html
function story(st, dir, imgDir, bad) {
  const html = path.join(dir, st.path);
  const js = html.replace(/\.html$/, ".js");
  if (!fs.existsSync(html) || !fs.existsSync(js))
    return bad.push("missing story " + st.path);
  window.STORY = null;
  eval(fs.readFileSync(js, "utf8"));
  const S = window.STORY;
  const id = path.basename(js);
  const used = new Set();
  const file = (p, what) => {
    if (!p) return;
    used.add(path.normalize(path.join(dir, p)));
    if (!fs.existsSync(path.join(dir, p)))
      bad.push(`${id}: missing ${p} (${what})`);
  };
  file(S.cover, "cover");
  if (st.cover && st.cover.src) file(st.cover.src, "story tile");
  for (const l of [S.lesson && S.lesson.path, S.hub])
    if (l && !fs.existsSync(path.join(dir, l)))
      bad.push(`${id}: link ${l} does not open`);
  const words = new Set();
  S.pages.forEach((p, i) => {
    file(p.img, "page " + i);
    if (!p.img && !p.emoji && !p.vis)
      bad.push(`${id}: page ${i} has no picture`);
    if (!p.easy) bad.push(`${id}: page ${i} has no easy sentence`);
    for (const t of p.text || [])
      (typeof t === "string" ? t : t.p)
        .toLowerCase()
        .split(/[^a-z’'-]+/)
        .forEach((w) => words.add(w));
  });
  (S.summary || []).forEach((c, i) => {
    file(c.img, "summary " + i);
    if (!c.img && !c.emoji && !c.vis)
      bad.push(`${id}: summary ${i} has no picture`);
  });
  (S.questions || []).forEach((q, i) => {
    file(q.img, "question " + i);
    if (!q.img && !q.emoji && !q.vis)
      bad.push(`${id}: question ${i} has no picture`);
  });
  for (const k of Object.keys(S.gloss || {})) {
    if (!/^[a-z’'-]+$/.test(k))
      bad.push(`${id}: gloss key "${k}" is not one lower-case word`);
    else if (!words.has(k)) bad.push(`${id}: gloss "${k}" is not in the text`);
  }
  // the story's own picture folder(s): every picture used and offline (the lesson's folder is checked with the lesson)
  const dirs = new Set([...used].map((p) => path.dirname(p)));
  dirs.delete(path.normalize(imgDir));
  for (const d of dirs)
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (!used.has(p)) bad.push(`${id}: picture not used: ${p}`);
      if (!games.includes(`"${p}"`)) bad.push(`not in games.js also: ${p}`);
    }
  for (const f of [html, js])
    if (!games.includes(`"${f}"`)) bad.push(`not in games.js also: ${f}`);
}
process.exit(problems ? 1 : 0);
