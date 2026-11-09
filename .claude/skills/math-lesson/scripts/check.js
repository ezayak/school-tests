// Data check for Grade 4 Math book lessons (grade-4/math/unit-N/lesson-N-M.js, shared/computer-lesson.js + shared/math.js).
// Usage (repo root): node .claude/skills/math-lesson/scripts/check.js grade-4/math/unit-2/lesson-2-1.js [more lesson .js]
// Checks: key and n match the file name; every idea card, game and exercise item has a picture (img, emoji or vis) and every picture file exists;
// vis kinds are known and their marked places exist in the number; num answers are whole numbers; mc options are unique (and in keep);
// tf has x; open has a model answer; col sums are valid; every exercise has g and from; every picture of the lesson's folder is used;
// the .html loads the .js; the lesson is in lessons.js and in games.js "also"; "// unverified" comments have rows in UNVERIFIED.md.
const fs = require("fs");
const path = require("path");

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node check.js <unit-N/lesson-N-M.js> …");
  process.exit(2);
}
const games = fs.readFileSync("games.js", "utf8");
const VIS = [
  "lines",
  "bar",
  "groups",
  "array",
  "cubes",
  "pv",
  "nline",
  "colshow",
  "digits",
  "area",
];
global.window = {};
// the lessons build their questions with shared/math-kit.js
new Function("window", fs.readFileSync("shared/math-kit.js", "utf8"))(window);
let problems = 0;
for (const file of files) {
  const bad = [];
  const dir = path.dirname(file);
  const subj = path.dirname(dir); // grade-4/math
  window.CS_LESSONS = null;
  eval(fs.readFileSync(path.join(subj, "lessons.js"), "utf8"));
  const listed = window.CS_LESSONS.chapters.flatMap((ch) =>
    ch.items.map((it) => `${subj}/${ch.dir}/${it.path}`),
  );
  const src = fs.readFileSync(file, "utf8");
  window.LESSON = null;
  // the lesson's helpers are top-level consts: run it in its own function scope
  new Function("window", "MathKit", src)(window, window.MathKit);
  const L = window.LESSON;
  const m = path.basename(file).match(/^lesson-(\d+-\d+)\.js$/);
  if (!m || L.n !== m[1]) bad.push(`n "${L.n}" does not match the file name`);
  if (!m || L.key !== "math4-l" + m[1]) bad.push("key " + L.key);
  const imgDir = path.join(dir, L.imgDir);
  const used = new Set();
  const img = (n, id) => {
    if (!n) return;
    used.add(path.normalize(path.join(imgDir, n + ".jpg")));
    if (!fs.existsSync(path.join(imgDir, n + ".jpg")))
      bad.push(`missing picture ${n}.jpg (${id})`);
  };
  const vis = (v, id) => {
    if (!v) return;
    if (!VIS.includes(v.kind)) bad.push(`unknown vis kind ${v.kind} (${id})`);
    const places = (n, hl) =>
      (hl || []).forEach((j) => {
        if (j < 0 || j >= String(n).length)
          bad.push(`marked place ${j} is not in ${n} (${id})`);
      });
    if (v.kind === "pv") places(v.n, v.hl);
    if (v.kind === "digits") v.rows.forEach((r) => places(r.n, r.hl));
    if (v.kind === "nline" && !(v.lo <= v.n && v.n <= v.hi))
      bad.push(
        `number line: ${v.n} is not between ${v.lo} and ${v.hi} (${id})`,
      );
  };
  const hasPic = (o) => o.img || o.emoji || o.vis;
  img(L.cover, "cover");
  if (L.question) img(L.question.img, "question");
  (L.ideas || []).forEach((c, i) => {
    img(c.img, "idea " + i);
    vis(c.vis, "idea " + i);
    if (!hasPic(c)) bad.push(`idea ${i} "${c.t}" has no picture`);
  });
  const sets = [...(L.games || []), ...(L.exercises || [])];
  for (const X of L.exercises || []) {
    if (!X.g) bad.push(`exercise ${X.k} has no g (section)`);
    if (!X.from) bad.push(`exercise ${X.k} has no from (book page)`);
  }
  const keys = sets.map((s) => s.k);
  if (new Set(keys).size !== keys.length) bad.push("the same k twice");
  for (const g of sets)
    g.items.forEach((it, i) => {
      const id = `${g.k}#${i}`;
      img(it.img, id);
      vis(it.vis, id);
      if (it.story) vis(it.story.vis, id);
      if (!["multi", "flower"].includes(it.type) && !hasPic(it) && !it.story)
        if (it.type !== "col") bad.push("no picture " + id);
      if (it.type === "num" && !Number.isInteger(Number(it.a)))
        bad.push(`num answer is not a whole number ${id}`);
      if (it.type === "mc") {
        if (new Set(it.opts).size !== it.opts.length)
          bad.push("same option twice " + id);
        if (it.keep && it.opts.some((o) => !it.keep.includes(o)))
          bad.push("an option is not in keep " + id);
      }
      if (it.type === "tf" && !it.x) bad.push("tf without x " + id);
      if (it.type === "open" && !it.a)
        bad.push("open without a model answer " + id);
      if (it.type === "col") {
        if (!Number.isInteger(it.a) || !Number.isInteger(it.b))
          bad.push("col numbers " + id);
        if (it.op === "-" && it.a < it.b) bad.push("col: a < b " + id);
      }
      // multi shows each option's picture before Check: the right ones must not look different from the wrong ones
      if (it.type === "multi") {
        const okE = new Set(
          it.opts.filter((o) => o.ok).map((o) => o.emoji || o.img),
        );
        const noE = new Set(
          it.opts.filter((o) => !o.ok).map((o) => o.emoji || o.img),
        );
        if (
          [...okE].every((e) => !noE.has(e)) &&
          okE.size === 1 &&
          noE.size <= 1
        )
          bad.push(
            `multi ${id}: the right answers have their own picture (${[...okE]}): it gives them away`,
          );
        if (it.opts.some((o) => ["✅", "❌", "🤔", "❓"].includes(o.emoji)))
          bad.push(
            `multi ${id}: ✅ ❌ 🤔 ❓ on an option give the answer away`,
          );
      }
      if (it.type === "multi")
        it.opts.forEach((o, j) => {
          img(o.img, id);
          if (!o.img && !o.emoji)
            bad.push(`multi ${id} option ${j} has no picture`);
        });
      // the equations written in the explanation are right, and the [number] in it is the answer
      for (const e of mathErrors(it.x || "")) bad.push(`${e} (${id})`);
      if (it.type === "num" && it.x) {
        const b = (it.x.match(/(?<![\d,])\[\$?([\d,]+)¢?\](?![\d,])/) || [])[1];
        if (b && Number(b.replace(/,/g, "")) !== Number(it.a))
          bad.push(`x says [${b}] but the answer is ${it.a} (${id})`);
      }
    });
  for (const f of fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : []) {
    const p = path.join(imgDir, f);
    if (!used.has(path.normalize(p))) bad.push(`picture not used: ${f}`);
    if (!games.includes(`"${p}"`)) bad.push(`not in games.js also: ${p}`);
  }
  const html = file.replace(/\.js$/, ".html");
  if (!fs.existsSync(html)) bad.push("no " + html);
  else if (
    !fs.readFileSync(html, "utf8").includes(`src="${path.basename(file)}"`)
  )
    bad.push(`${html} does not load ${path.basename(file)}`);
  if (!listed.includes(html)) bad.push("not in lessons.js");
  for (const f of [file, html])
    if (!games.includes(`"${f}"`)) bad.push(`not in games.js also: ${f}`);
  const unv = (src.match(/\/\/ unverified/g) || []).length;
  const log = fs.existsSync(path.join(subj, "UNVERIFIED.md"))
    ? fs.readFileSync(path.join(subj, "UNVERIFIED.md"), "utf8")
    : "";
  const rel = path.relative(subj, file).replace(/\.js$/, "");
  if (unv && !log.includes(rel))
    bad.push(
      `${unv} "// unverified" comments but no row for ${rel} in UNVERIFIED.md`,
    );
  const n = sets.reduce((a, g) => a + g.items.length, 0);
  console.log(
    `${file}: ${(L.ideas || []).length} cards · ${(L.games || []).length} games · ${(L.exercises || []).length} exercise sets · ${n} items · ${unv} unverified`,
  );
  bad.forEach((b) => console.log("  " + b));
  problems += bad.length;
}
console.log(problems ? `${problems} problems` : "all checks passed");

// "3 × 40 = 120", "60,000 + 400 + 8 = 60,408", "56 = 8 × 7", "50 ÷ 5 = 10" in a text: each one must be true (× ÷ before + −; "7 ÷ 2 = 3 R1" is skipped)
function mathErrors(text) {
  const t = text.replace(/[[\]$¢]/g, "");
  const N = "\\d[\\d,]*";
  const chain = `${N}(?:\\s*[×÷+−]\\s*${N})+`;
  const val = (e) =>
    Function(
      `return ${e.replace(/,/g, "").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")}`,
    )();
  const n = (s) => Number(s.replace(/,/g, ""));
  const errs = [];
  // a chain = a number, not inside a longer chain on either side
  for (const m of t.matchAll(
    new RegExp(
      `(?<![\\d,×÷+−]\\s*)(${chain})\\s*=\\s*(${N})(?!\\s*[×÷+−]|[\\d,]|\\s*R\\s*\\d)`,
      "g",
    ),
  ))
    if (Math.abs(val(m[1]) - n(m[2])) > 1e-9) errs.push(`wrong: ${m[0]}`);
  for (const m of t.matchAll(
    new RegExp(
      `(?<![\\d,×÷+−]\\s*)(${N})\\s*=\\s*(${chain})(?![\\d,]|\\s*[×÷+−])`,
      "g",
    ),
  ))
    if (Math.abs(val(m[2]) - n(m[1])) > 1e-9) errs.push(`wrong: ${m[0]}`);
  return errs;
}
process.exit(problems ? 1 : 0);
