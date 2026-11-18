// Data check for a French lesson or revision page (engine: grade-4/term-1/french/french-lesson.js).
// Usage (from the repo root): node check.js <lesson .html>   e.g. node .claude/skills/french-lesson/scripts/check.js grade-4/term-1/french/lesson-3.html
// Loads the page's data scripts in order (a revision loads its lessons first), then checks:
//  - every tile, person, phrase, story panel, sound word, verb row, sentence, word to build, exercise item
//    and dictée entry has a picture (img or emoji), and every img file exists
//  - every French text the page translates has a translation (dict / auto / its own en, uk, ar),
//    in the same places the engine shows one (story lines, answers, rule lines, verb rows, …)
//  - mc: options are unique; fill: each answer is one of its pieces; tap: the answer is a picture
//  - every picture in img/lesson-N/ is used by some .js file of the folder and is in games.js "also",
//    and so are the page and its .js
// Exits 1 if anything is wrong.
const fs = require("fs");
const path = require("path");

const page = process.argv[2];
if (!page || !fs.existsSync(page)) {
  console.error("usage: node check.js <lesson .html>");
  process.exit(2);
}
const dir = path.dirname(page);
const html = fs.readFileSync(page, "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !/common\.js|french-lesson\.js/.test(s));
global.window = {};
for (const s of scripts) eval(fs.readFileSync(path.join(dir, s), "utf8"));
const L = window.LESSON;
const DATA = window.FR_DATA || {};
const SRC = [L].concat((L.use || []).map((n) => DATA[n]).filter(Boolean));

const bad = [];
const notes = [];
const IMG = (n) =>
  n.includes("/")
    ? `img/${n}.jpg`
    : `img/${L.imgDir || "lesson-" + L.n}/${n}.jpg`;
const usedImgs = new Set();
function pic(o, where) {
  if (!o || (!o.img && !o.emoji)) return bad.push("no picture: " + where);
  if (o.img) {
    usedImgs.add(IMG(o.img));
    if (!fs.existsSync(path.join(dir, IMG(o.img))))
      bad.push(`missing file ${IMG(o.img)} (${where})`);
  }
}
const bare = (w) => w.replace(/[.,!?:;«»]/g, "").trim();

// translations, as trOf() in the engine
function tr(fr) {
  const k = String(fr || "").trim();
  for (const S of SRC) {
    const d = S.dict && (S.dict[k] || S.dict[k.replace(/[.!]$/, "")]);
    if (d) return d;
    const a = S.auto && S.auto(k);
    if (a) return a;
  }
  return null;
}
const untranslated = new Set();
function needTr(fr, where, obj) {
  if (obj && obj.en && obj.uk && obj.ar) return;
  if (!fr || !String(fr).trim()) return;
  if (/^[A-ZÉ][a-zàâçéèêëîïôûü-]+[.!]?$/.test(String(fr).trim())) return; // a name: none needed
  const t = tr(fr);
  if (!t || t.length < 3 || t.some((x) => !x))
    untranslated.add(`${fr}   (${where})`);
}

// --- learn and play tiles
for (const m of [...(L.learn || []), ...(L.play || [])]) pic(m, `tile ${m.k}`);
const people = L.people || [];
const personOf = (n) => people.find((p) => p.fr === n);
people.forEach((p) => {
  pic(p, "person " + p.fr);
  needTr(p.fr, "person", p);
  if (p.say) needTr(p.say, "person say");
});
(L.phrases || []).forEach((p) => {
  pic(p, "phrase " + p.fr);
  needTr(p.fr, "phrase", p);
});
(L.story || []).forEach((s, i) => {
  pic(s, "story " + (i + 1));
  s.lines.forEach((l) => needTr(l.fr, "story " + (i + 1)));
});
// sound words: a picture from pics, a person or a phrase (wordPic in the engine)
function wordPic(w, S) {
  const q = ((S && S.pics) || {})[w];
  if (q) return typeof q === "string" ? { img: q } : q;
  const p =
    personOf(w) || (L.phrases || []).find((x) => bare(x.fr) === bare(w)) || {};
  return { img: p.img, emoji: p.emoji };
}
(L.sounds || []).forEach((S) => {
  pic({ img: S.img }, "sound " + S.s);
  const re = new RegExp(S.mark || S.s, "i");
  S.words.forEach((w) => {
    pic(wordPic(w, S), `sound ${S.s} word ${w}`);
    if (!re.test(w)) bad.push(`sound ${S.s}: "${w}" does not contain it`);
  });
  S.not.forEach((w) => {
    pic(wordPic(w, S), `sound ${S.s} not-word ${w}`);
    if (re.test(w)) bad.push(`sound ${S.s}: not-word "${w}" contains it`);
  });
});
if (L.verb) {
  if (L.verb.img) pic({ img: L.verb.img }, "verb page");
  L.verb.rows.forEach((r, i) => {
    pic(r, "verb row " + (i + 1));
    const sp = /’$/.test(r.p) ? "" : " ";
    const full = `${r.p}${sp}${r.el || ""}${r.stem ?? "appell"}${r.end} ${r.name}.`;
    if (!r.en) needTr(full, "verb row");
  });
  (L.verb.games || []).forEach((g) => {
    if (!(L.exercises || []).some((x) => x.k === g.x))
      bad.push(`verb game: no exercise "${g.x}"`);
  });
}
if (L.rule) {
  pic({ img: L.rule.img }, "rule page");
  needTr(L.rule.fr, "rule", L.rule.tr);
  L.rule.groups.forEach((g) => g.lines.forEach((l) => needTr(l, "rule line")));
  L.rule.games.forEach((g) => {
    if (!L.exercises.some((x) => x.k === g.x))
      bad.push(`rule game: no exercise "${g.x}"`);
  });
}
(L.sentences || []).forEach((s) => {
  pic(s, "sentence " + s.fr);
  needTr(s.fr, "sentence");
});
(L.build || []).forEach((b) => {
  const o = typeof b === "string" ? personOf(b) || wordPic(b) : b;
  pic(o, "build " + (b.fr || b));
});
(L.dictee || []).forEach((D) => {
  pic(D, "dictée " + D.k);
  [...(D.words || []), ...(D.sentences || [])].forEach((x) => {
    pic(x, `dictée ${D.k}: ${x.fr}`);
    needTr(x.fr, "dictée " + D.k);
  });
});

// --- exercises and game tiles
function fillFull(it) {
  let b = 0;
  return it.parts
    .map((p) => (Array.isArray(p) ? it.ans[b++] : p))
    .join("")
    .replace(/\s*([?!])/g, " $1");
}
function checkItem(it, where) {
  if (it.type !== "match" && it.type !== "tap") pic(it, where); // tap: the options are the pictures
  switch (it.type) {
    case "mc": {
      if (new Set(it.opts).size !== it.opts.length)
        bad.push("mc: the same option twice " + where);
      const right = it.opts[0];
      const full =
        it.full || (it.q.includes("___") ? it.q.replace("___", right) : right);
      needTr(full, where + " (answer)");
      if (!it.q.includes("___")) needTr(it.q, where + " (question)");
      break;
    }
    case "fill":
      it.parts
        .filter(Array.isArray)
        .forEach(
          (o, k) =>
            o.includes(it.ans[k]) ||
            bad.push(`fill: answer "${it.ans[k]}" is not a piece ${where}`),
        );
      needTr(fillFull(it), where);
      break;
    case "order":
    case "letters":
    case "spell":
      needTr(it.fr, where);
      break;
    case "yn":
      if (it.fix) needTr(it.fix, where + " (fix)");
      break;
    case "tap":
      it.opts.forEach((o) => pic({ img: o }, where + " tap option"));
      if (it.a && !it.opts.includes(it.a))
        bad.push("tap: a is not an option " + where);
      needTr(it.say, where);
      break;
    case "match":
      it.pairs.forEach((p, i) => {
        pic(p, `${where} pair ${i + 1}`);
        needTr(p.fr, where);
      });
      break;
    default:
      bad.push(`unknown item type "${it.type}" ${where}`);
  }
}
(L.play || [])
  .filter((m) => m.k === "game")
  .forEach((m) =>
    m.items.forEach((it, i) => checkItem(it, `game "${m.t}" #${i + 1}`)),
  );
(L.exercises || []).forEach((X) => {
  if (!X.img && !X.emoji) bad.push("exercise tile without picture " + X.k);
  else pic(X, "exercise tile " + X.k);
  if (!X.from) notes.push(`exercise ${X.k} has no "from"`);
  if (X.text) {
    pic(X.text, `exercise ${X.k} text`);
    X.text.lines.forEach((l) => needTr(l, `exercise ${X.k} text`));
  }
  if (X.ref) {
    const [n, k] = X.ref.split(":");
    const R = DATA[n];
    if (!R || !R.exercises.some((x) => x.k === k))
      bad.push(`ref ${X.ref}: not found`);
    return;
  }
  if (typeof X.items === "string") {
    if (X.items === "people-mc")
      people.forEach((p) =>
        needTr(
          `${p.g === "elle" ? "Elle" : "Il"} s’appelle ${p.fr}.`,
          "people-mc",
        ),
      );
    return;
  }
  X.items.forEach((it, i) => checkItem(it, `exercise ${X.k} #${i + 1}`));
});
// the engine's own sentences
if ((L.play || []).some((m) => m.k === "ilelle") || (L.verb && !L.verb.games))
  people.forEach((p) =>
    needTr(
      `${p.g === "elle" ? "Elle" : "Il"} s’appelle ${p.fr}.`,
      "Il ou Elle ?",
    ),
  );

// --- picture files: used, and listed in games.js
const folder = path.join(dir, `img/${L.imgDir || "lesson-" + L.n}`);
const games = fs.readFileSync("games.js", "utf8");
const inAlso = (rel) => games.includes(`"${path.join(dir, rel)}"`);
if ((L.imgDir || /^\d+$/.test(String(L.n))) && fs.existsSync(folder)) {
  const allJs = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".js"))
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8"))
    .join("\n");
  for (const f of fs.readdirSync(folder)) {
    const name = f.replace(/\.jpg$/, "");
    const rel = `img/${L.imgDir || "lesson-" + L.n}/${f}`;
    if (
      !usedImgs.has(rel) &&
      !allJs.includes(`"${name}"`) &&
      !allJs.includes(`${L.imgDir || "lesson-" + L.n}/${name}"`)
    )
      bad.push("picture not used: " + rel);
    if (!inAlso(rel)) bad.push("picture not in games.js also: " + rel);
  }
}
for (const rel of [
  path.basename(page),
  ...scripts.filter((s) => !s.includes("/")),
])
  if (!inAlso(rel) && !games.includes(`path: "${path.join(dir, rel)}"`))
    bad.push("not in games.js also: " + path.join(dir, rel));

// --- report
for (const u of untranslated) bad.push("no translation: " + u);
notes.forEach((n) => console.log("note: " + n));
if (bad.length) {
  console.log(bad.join("\n"));
  console.log(`\n${bad.length} problem(s)`);
  process.exit(1);
}
console.log(
  `OK: ${page} (${(L.exercises || []).length} exercises, ${usedImgs.size} pictures)`,
);
