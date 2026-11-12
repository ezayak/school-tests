// Wire Grade 4 Math book lessons into the site: the .html, the card in lessons.js, the files in games.js.
// Usage (repo root): node .claude/skills/math-lesson/scripts/add.js grade-4/math/unit-4/lesson-4-2.js [more lesson .js]
// - writes unit-N/lesson-N-M.html from unit-2/lesson-2-1.html (its .js and <title>), if it does not exist yet;
// - adds or updates the lesson's card in lessons.js under its unit (a new unit gets a chapter with the book's unit title);
//   the card's note counts the picture cards, games and exercises;
// - rewrites the "also" list of the Math entry in games.js from the files of grade-4/math (fixed order), and its countLabel / topics.
// Then run prettier on lessons.js and games.js, and check.js on the lessons.
const fs = require("fs");
const path = require("path");

const ROOT = "grade-4/math";
const UNITS = {
  2: "Generalize Place-Value Structure",
  3: "Addition and Subtraction Strategies and Algorithms",
  4: "Multiplication as Comparison",
  5: "Numbers and Number Patterns",
  6: "Multiplication Strategies with Multi-Digit Numbers",
  7: "Division Strategies with Multi-Digit Dividends and 1-Digit Divisors",
};
const num = (s) => s.split("-").map(Number);
const byLesson = (a, b) => {
  const [x, y] = [num(a), num(b)];
  return x[0] - y[0] || x[1] - y[1];
};

global.window = {};
// the lessons build their questions with shared/math-kit.js
new Function("window", fs.readFileSync("shared/math-kit.js", "utf8"))(window);
const lsFile = path.join(ROOT, "lessons.js");
const lsText = fs.readFileSync(lsFile, "utf8");
const head = lsText.slice(0, lsText.indexOf("window.CS_LESSONS"));
eval(lsText);
const LS = window.CS_LESSONS;
const template = fs.readFileSync(
  path.join(ROOT, "unit-2/lesson-2-1.html"),
  "utf8",
);

for (const file of process.argv.slice(2)) {
  window.LESSON = null;
  new Function("window", "MathKit", fs.readFileSync(file, "utf8"))(
    window,
    window.MathKit,
  );
  const L = window.LESSON;
  const [u] = num(L.n);
  const dir = `unit-${u}`;
  const base = path.basename(file, ".js");
  const html = file.replace(/\.js$/, ".html");
  if (!fs.existsSync(html)) {
    fs.writeFileSync(
      html,
      template
        .replace('src="lesson-2-1.js"', `src="${base}.js"`)
        .replace(
          /<title>.*<\/title>/,
          `<title>${L.title} · Math Lesson ${L.n}</title>`,
        ),
    );
    console.log("wrote " + html);
  }
  let ch = LS.chapters.find((c) => c.dir === dir);
  if (!ch) {
    ch = { n: u, dir, title: UNITS[u], items: [] };
    LS.chapters.push(ch);
    LS.chapters.sort((a, b) => (a.n === "" ? 1 : b.n === "" ? -1 : a.n - b.n));
  }
  const card = {
    n: L.n,
    title: L.title,
    en: L.en || "",
    path: base + ".html",
    cover: `${L.imgDir}/${L.cover}.jpg`,
    note: `${(L.ideas || []).length} picture cards · ${(L.games || []).length} games · ${(L.exercises || []).length} exercises`,
  };
  if (!card.en)
    console.log(
      `! ${file}: no en (one line for the card): add it to the LESSON head`,
    );
  const old = ch.items.findIndex((it) => it.n === L.n);
  if (old >= 0) ch.items[old] = { ...ch.items[old], ...card };
  else ch.items.push(card);
  // the unit page first, then the book lessons in order
  ch.items.sort((a, b) =>
    a.label === "Unit"
      ? -1
      : b.label === "Unit"
        ? 1
        : byLesson(String(a.n), String(b.n)),
  );
}
fs.writeFileSync(
  lsFile,
  head + "window.CS_LESSONS = " + JSON.stringify(LS, null, 2) + ";\n",
);

// games.js: the Math entry's also, countLabel, topics
const files = [
  `${ROOT}/lessons.js`,
  `${ROOT}/times/index.html`,
  `${ROOT}/times/division.html`,
  `${ROOT}/times/times.js`,
];
const units = fs
  .readdirSync(ROOT)
  .filter((d) => /^unit-\d+$/.test(d))
  .sort((a, b) => num(a.slice(5))[0] - num(b.slice(5))[0]);
const book = [];
let unitPages = 0;
for (const d of units) {
  const all = fs.readdirSync(path.join(ROOT, d));
  for (const f of all
    .filter(
      (f) =>
        /\.(html|js)$/.test(f) &&
        !f.startsWith("lesson-") &&
        !f.startsWith("_"),
    )
    .sort((a, b) => (a.endsWith(".html") ? -1 : 1))) {
    files.push(`${ROOT}/${d}/${f}`);
    if (f.endsWith(".html")) unitPages++;
  }
  if (fs.existsSync(path.join(ROOT, d, "img/cover.jpg")))
    files.push(`${ROOT}/${d}/img/cover.jpg`);
  const lessons = all
    .filter((f) => /^lesson-\d+-\d+\.js$/.test(f))
    .map((f) => f.slice(7, -3))
    .sort(byLesson);
  for (const n of lessons) {
    book.push(n);
    files.push(`${ROOT}/${d}/lesson-${n}.html`, `${ROOT}/${d}/lesson-${n}.js`);
    const img = path.join(ROOT, d, "img", "lesson-" + n);
    if (fs.existsSync(img))
      for (const f of fs.readdirSync(img).sort()) files.push(`${img}/${f}`);
  }
}
let g = fs.readFileSync("games.js", "utf8");
const at = g.indexOf(`path: "${ROOT}/index.html"`);
const a0 = g.indexOf("also: [", at),
  a1 = g.indexOf("]", a0);
g =
  g.slice(0, a0) +
  "also: [\n" +
  files.map((f) => `      "${f}",`).join("\n") +
  "\n    " +
  g.slice(a1);
// "Book lessons: 2-1 · 4-2–4-4" (a run of lessons in one unit is one range)
const runs = [];
for (const n of book) {
  const r = runs[runs.length - 1];
  const [u, m] = num(n);
  if (r && r.u === u && r.m + 1 === m) Object.assign(r, { m, to: n });
  else runs.push({ u, m, from: n, to: n });
}
const list = runs
  .map((r) => (r.from === r.to ? r.from : `${r.from}–${r.to}`))
  .join(" · ");
const entry = g.slice(g.lastIndexOf("{", at), a0);
const fixed = entry
  .replace(
    /countLabel:\s*"[^"]*"/,
    `countLabel: "${unitPages} unit lessons · ${book.length} book lessons · Units ${num(units[0].slice(5))[0]}–${num(units[units.length - 1].slice(5))[0]} · Multiplication and division games"`,
  )
  .replace(
    /(topics:\s*"[^"]*?)( · Book lessons:[^"]*)?"/,
    `$1 · Book lessons: ${list}"`,
  );
g = g.replace(entry, fixed);
fs.writeFileSync("games.js", g);
console.log(
  `lessons.js and games.js: ${book.length} book lessons (${list}), ${files.length} files offline`,
);
