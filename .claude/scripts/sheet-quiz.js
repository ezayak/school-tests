#!/usr/bin/env node
// Sheet quizzes (shared/sheet-quiz.js; the `sheet-quiz` skill): a new quiz folder, and the checks before committing one.
//
//   node .claude/scripts/sheet-quiz.js new <kid> <slug> [--lang en|fr|ar] [--title "Two words"] [--story]
//        → quiz/<kid>/<slug>/index.html (the page) + quiz.js (an empty frame); never overwrites. Prints the folder.
//          --story: also story.html + story.js (a story on the sheet, for shared/story.js: no summary, done → the quiz).
//   node .claude/scripts/sheet-quiz.js check <quiz folder>
//        → every question has n, q, help, 2–4 answers and one picture; no answer key (c); pictures exist;
//          sim apps known; the Arabic page has the no-referrer meta. Exit code 1 when something is wrong.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const REPO = path.resolve(__dirname, "../..");
const [cmd, ...args] = process.argv.slice(2);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 ? args.splice(i, 2)[1] : d;
};

function page(depth, title, lang, story) {
  const up = "../".repeat(depth);
  const ar = lang === "ar";
  return `<!doctype html>
<html lang="${lang}" translate="no"${ar ? ' dir="ltr"' : ""}>
  <head>
    <meta charset="utf-8" />
    <meta name="google" content="notranslate" />${ar ? '\n    <meta name="referrer" content="no-referrer" />' : ""}
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,viewport-fit=cover"
    />
    <link rel="manifest" href="${up}manifest.webmanifest" />
    <meta name="theme-color" content="#1B2440" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="${up}icons/favicon-32.png"
    />
    <link rel="apple-touch-icon" href="${up}icons/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Study Games" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <script>
      if ("serviceWorker" in navigator)
        addEventListener("load", () =>
          navigator.serviceWorker.register("${up}sw.js").catch(() => {}),
        );
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Atkinson+Hyperlegible:wght@400;700&family=Noto+Naskh+Arabic:wght@500;700&display=swap"
    />
    <link rel="stylesheet" href="${up}shared/theme.css" />
    ${story ? `<link rel="stylesheet" href="${up}shared/lesson.css" />\n    <link rel="stylesheet" href="${up}shared/story.css" />` : `<link rel="stylesheet" href="${up}shared/quiz.css" />`}
    <title>${title}</title>
  </head>
  <body${story ? ' data-view="story"' : ""}>
    <main class="wrap" id="app"></main>
    <script src="${up}shared/common.js"></script>
    ${story ? `<script src="story.js"></script>\n    <script src="${up}shared/story.js"></script>` : `<script src="${up}quiz-common.js"></script>\n    <script src="quiz.js"></script>\n    <script src="${up}shared/sheet-quiz.js"></script>`}
  </body>
</html>
`;
}

function frame(kid, slug, lang, title) {
  return `// Sheet quiz: TODO the sheet (subject, title, date) and what it covers (the lesson).
// Source: the parent's Telegram photos (TODO the job id / date). Pictures: TODO which lesson's, which crops of the sheet.
// Changed to fit the quiz: TODO (write-in questions made into choices, …). Format: the top of shared/sheet-quiz.js; rules: the \`sheet-quiz\` skill.

window.SHEET = {
  key: "quiz-${kid}-${slug}",
  lang: "${lang}",
  eyebrow: "",
  title: ${JSON.stringify(title.split(" ").slice(0, 2).concat(["", ""]).slice(0, 2))},
  imgDir: "img",
  cover: { e: "📝" },
  qs: [],
};
`;
}

function storyFrame(kid, slug) {
  return `// The story of the sheet quiz in this folder (quiz.js: story: "story.html"), for shared/story.js (format: README « story-*.js format »).
// Every part of the story is a page with its "easy" sentence (the summary of that part); no summary: [] (no whole-story summary), no questions
// (they are the quiz's). Source: TODO the photos.

window.STORY = {
  key: "quiz-${kid}-${slug}-story",
  subject: "Sheet quiz",
  hub: "index.html",
  done: { path: "index.html", label: "Now the questions" },
  title: "",
  cover: "",
  gloss: {},
  pages: [],
};
`;
}

function create() {
  const [kid, slug] = args.filter((a) => a !== "--story");
  const lang = opt("--lang", "en");
  if (!kid || !slug || !/^[a-z0-9-]+$/.test(kid + slug))
    throw new Error("usage: new <kid> <slug> (lower case, digits, -)");
  const title = opt("--title", "Sheet Helper");
  const story = args.includes("--story");
  const dir = path.join(REPO, "quiz", kid, slug);
  if (fs.existsSync(dir)) throw new Error(dir + " exists already");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(3, title, lang));
  fs.writeFileSync(path.join(dir, "quiz.js"), frame(kid, slug, lang, title));
  if (story) {
    fs.writeFileSync(path.join(dir, "story.html"), page(3, title, lang, true));
    fs.writeFileSync(path.join(dir, "story.js"), storyFrame(kid, slug));
  }
  console.log(path.relative(REPO, dir));
}

const SIMS = ["word", "windows", "outlook", "edge"];
function check() {
  const dir = path.resolve(args[0] || "");
  const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(dir, "quiz.js"), "utf8"), ctx);
  const D = ctx.window.SHEET;
  const bad = [];
  if (!D) throw new Error("quiz.js sets no window.SHEET");
  for (const f of ["key", "lang", "eyebrow", "title", "imgDir", "cover"])
    if (!D[f]) bad.push(`SHEET.${f} is missing`);
  if (!D.title || D.title.length !== 2 || D.title.some((w) => !w))
    bad.push("title: two words");
  if (!(D.qs || []).length) bad.push("no questions");
  if (D.lang === "ar" && !/name="referrer" content="no-referrer"/.test(html))
    bad.push(
      'an Arabic page needs <meta name="referrer" content="no-referrer" />',
    );
  const pic = (p, where) => {
    const f = /[./]/.test(p) ? p : `${D.imgDir}/${p}.jpg`;
    if (!fs.existsSync(path.resolve(dir, f)))
      bad.push(`${where}: picture ${f} not found`);
  };
  if (typeof D.cover === "string") pic(D.cover, "cover");
  (D.qs || []).forEach((q, i) => {
    const w = `question ${i + 1} (${q.n || "no n"})`;
    for (const f of ["n", "q", "help"]) if (!q[f]) bad.push(`${w}: no ${f}`);
    if ("c" in q)
      bad.push(`${w}: has c (an answer key): the quiz never shows answers`);
    if (!Array.isArray(q.o) || q.o.length < 2 || q.o.length > 4)
      bad.push(`${w}: o needs 2–4 answers`);
    else if (new Set(q.o).size !== q.o.length)
      bad.push(`${w}: two answers are the same`);
    const pics = ["p", "e", "ps", "svg"].filter((k) => q[k]);
    if (pics.length !== 1)
      bad.push(
        `${w}: needs exactly one picture (p, e, ps or svg), has ${pics.length}`,
      );
    if (q.p) pic(q.p, w);
    (q.ps || []).forEach((p) => pic(p, w));
    if (q.sim && !SIMS.includes(q.sim.app))
      bad.push(`${w}: sim.app must be one of ${SIMS.join(", ")}`);
  });
  if (D.story) {
    // the story: one page per part, each with its easy sentence (the part's summary) and a picture; no whole-story summary
    const sc = { window: {} };
    vm.createContext(sc);
    try {
      if (!fs.existsSync(path.join(dir, D.story)))
        throw new Error(`${D.story} not found`);
      vm.runInContext(fs.readFileSync(path.join(dir, "story.js"), "utf8"), sc);
      const S = sc.window.STORY;
      if (!S) throw new Error("story.js sets no window.STORY");
      for (const f of ["key", "title", "cover", "done"])
        if (!S[f]) bad.push(`STORY.${f} is missing`);
      if (S.cover && !fs.existsSync(path.resolve(dir, S.cover)))
        bad.push(`STORY.cover ${S.cover} not found`);
      if ((S.summary || []).length)
        bad.push("STORY.summary: no whole-story summary in a sheet quiz");
      if ((S.questions || []).length)
        bad.push("STORY.questions: the questions are the quiz's");
      if (!(S.pages || []).length) bad.push("STORY.pages: empty");
      (S.pages || []).forEach((g, i) => {
        if (!g.easy) bad.push(`story page ${i + 1}: no easy sentence`);
        if (!(g.text || []).length) bad.push(`story page ${i + 1}: no text`);
        if (!(g.img || g.emoji || g.vis))
          bad.push(`story page ${i + 1}: no picture (img, emoji or vis)`);
        if (g.img && !fs.existsSync(path.resolve(dir, g.img)))
          bad.push(`story page ${i + 1}: picture ${g.img} not found`);
      });
    } catch (e) {
      bad.push("story: " + e.message);
    }
  }
  if (bad.length) {
    console.log(bad.map((b) => "✗ " + b).join("\n"));
    process.exit(1);
  }
  console.log(
    `OK: ${D.qs.length} questions, every one with a picture, help and 2–4 answers, no answer key.`,
  );
}

try {
  if (cmd === "new") create();
  else if (cmd === "check") check();
  else throw new Error("usage: new <kid> <slug> | check <quiz folder>");
} catch (e) {
  console.error(e.message);
  process.exit(2);
}
