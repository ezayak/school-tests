#!/usr/bin/env node
// The empty frame of a new lesson, made from a sibling lesson of the same engine.
//
//   node .claude/scripts/scaffold/new.js <new page.html> --like <sibling.html> [--title "…"] [--set n=28 --set key=en4-u3w6 --set id=u3w6]
//
// Writes <new>.html (the sibling's page: new title and data script) and <new>.js:
// - the sibling's header comment, marked TODO, as the pattern for the new one;
// - the sibling's helper imports (`const { … } = MathKit;`) and its wrapper / register line (EN_DATA, FR_DATA);
// - the same top-level fields: n, key and the register id follow the numbers of the file name
//   (unit3-week5 → unit3-week6: "en4-u3w5" → "en4-u3w6"), fields equal in every lesson of the folder are kept
//   (grade, …), true/false are kept, other text is "" and lists are [].
// Never overwrites. Then: format.js <new page.html> for the format of the items, and the subject's skill.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const L = require("./load.js");

const args = process.argv.slice(2);
const take = (n) => {
  const out = [];
  for (let i; (i = args.indexOf(n)) >= 0;) out.push(args.splice(i, 2)[1]);
  return out;
};
const like = take("--like")[0];
const title = take("--title")[0];
const sets = Object.fromEntries(
  take("--set").map((s) => [
    s.slice(0, s.indexOf("=")),
    s.slice(s.indexOf("=") + 1),
  ]),
);
const target = args[0] && path.resolve(args[0]);
const die = (m) => {
  console.error(m);
  process.exit(1);
};
if (!target || !like || !target.endsWith(".html"))
  die(
    'usage: new.js <new page.html> --like <sibling.html> [--title "…"] [--set n=…]',
  );

const sib = path.resolve(like);
const newJs = target.replace(/\.html$/, ".js");
for (const f of [target, newJs])
  if (fs.existsSync(f)) die(`${L.rel(f)} exists: not overwritten`);

// the sibling page and its data file
const eng = L.engineOf(sib);
if (!eng) die(`${L.rel(sib)}: no engine script found`);
const page = L.pagesOf(eng).find((p) => p.html === sib);
const sibJs =
  page.data.find(
    (d) => path.basename(d, ".js") === path.basename(sib, ".html"),
  ) || page.data[page.data.length - 1];
if (!sibJs) die(`${L.rel(sib)}: no data file`);
const text = fs.readFileSync(sibJs, "utf8");
const main = (text.match(/window\.([A-Z][A-Z0-9_]*)\s*=\s*\{/) || [])[1];
if (!main) die(`${L.rel(sibJs)}: no "window.NAME = {" found`);
const { win, errors } = L.run(page, sibJs);
if (errors.length) die(errors.join("\n"));
const obj = win[main];

// numbers that change between the file names: unit3-week5 → unit3-week6 gives [["5", "6"]]
const nums = (f) => path.basename(f).match(/\d+/g) || [];
const [a, b] = [nums(sib), nums(target)];
const changes = a
  .map((x, i) => [x, b[i]])
  .filter(([x, y]) => y !== undefined && x !== y);
if (a.length !== b.length || !changes.length)
  console.warn(
    `! file names ${path.basename(sib)} → ${path.basename(target)}: numbers don't line up, check n / key`,
  );
// the same change in a value: the last run of digits equal to the old number
const follow = (v) => {
  let s = String(v);
  for (const [x, y] of changes) {
    const re = new RegExp(`(?<!\\d)${x}(?!\\d)`, "g");
    const all = [...s.matchAll(re)];
    if (all.length) {
      const m = all[all.length - 1];
      s = s.slice(0, m.index) + y + s.slice(m.index + x.length);
    }
  }
  return s;
};
const notes = [];
function next(name, v) {
  if (name in sets)
    return typeof v === "number" ? Number(sets[name]) : sets[name];
  let w = follow(v);
  if (w === String(v) && typeof v === "number") {
    w = v + 1;
    notes.push(`${name}: ${v} → ${w} (not in the file name: +1, check it)`);
  } else if (w === String(v))
    notes.push(
      `! ${name}: ${JSON.stringify(v)} unchanged: pass --set ${name}=…`,
    );
  else
    notes.push(
      `${name}: ${JSON.stringify(v)} → ${JSON.stringify(typeof v === "number" ? Number(w) : w)}`,
    );
  return typeof v === "number" ? Number(w) : w;
}

// fields equal in every other lesson of the folder (same engine)
const others = L.pagesOf(eng)
  .filter(
    (p) =>
      path.dirname(p.html) === path.dirname(sib) &&
      p.html !== sib &&
      p.data.length,
  )
  .map((p) => {
    const d = p.data.find(
      (x) => path.basename(x, ".js") === path.basename(p.html, ".html"),
    );
    return d && L.run(p, d).win[main];
  })
  .filter(Boolean);
const same = (k) =>
  others.length > 0 &&
  others.every((o) => JSON.stringify(o[k]) === JSON.stringify(obj[k]));

// the frame of a value
const ident = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
function frame(v, depth) {
  if (typeof v === "function") return v.toString();
  if (Array.isArray(v)) return "[]";
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return "0";
  if (typeof v === "string") return '""';
  // word lists keyed by the word, lessons keyed by id: an empty {}
  const keys = v && typeof v === "object" ? Object.keys(v) : [];
  if (
    keys.length > 25 ||
    keys.some((k) => !/^[A-Za-z_$][\w$]*$/.test(k) || /\d/.test(k))
  )
    return "{}";
  if (v && typeof v === "object")
    return depth > 0
      ? "{}"
      : `{ ${Object.entries(v)
          .map(([k, x]) => `${ident(k)}: ${frame(x, depth + 1)}`)
          .join(", ")} }`;
  return String(v);
}
const kept = [];
const fields = Object.entries(obj).map(([k, v]) => {
  let s;
  if (k === "n" || k === "key" || (k === "imgDir" && v))
    s = JSON.stringify(next(k, v));
  else if (k in sets) s = JSON.stringify(sets[k]);
  else if (
    (typeof v !== "object" || v === null) &&
    typeof v !== "function" &&
    same(k)
  ) {
    s = JSON.stringify(v);
    kept.push(k);
  } else s = frame(v, 0);
  return `${ident(k)}: ${s},`;
});

// the parts of the sibling's text around the object
const lines = text.split("\n");
const header = [];
for (const l of lines) {
  if (!/^\s*\/\//.test(l)) break;
  header.push(l);
}
const at = lines.findIndex((l) =>
  new RegExp(`window\\.${main}\\s*=\\s*\\{`).test(l),
);
const iife = lines.slice(0, at).some((l) => /^\(function\s*\(\)\s*\{/.test(l));
const imports = lines
  .slice(0, at)
  .filter((l) => /^\s*const\s*\{[^}]*\}\s*=\s*[A-Za-z_$][\w$]*;\s*$/.test(l));
let reg = text.match(
  /\(window\.([A-Z_]+) = window\.\1 \|\| \{\}\)\.([A-Za-z0-9_$]+) = window\.([A-Z_]+);/,
);
if (reg) {
  const id = sets.id || follow(reg[2]);
  notes.push(
    `register id: ${reg[2]} → ${id}${id === reg[2] ? " (unchanged: pass --set id=…)" : ""}`,
  );
  reg = reg[0].replace(`).${reg[2]} =`, `).${id} =`);
}

const out = [
  `// TODO: the header of the new lesson (what it is, sources, left out, engine, pictures). The sibling's (${path.basename(sibJs)}):`,
  ...header,
  ...(iife ? ["(function () {"] : []),
  ...imports.map((l) => l.trim()),
  `window.${main} = {`,
  ...fields,
  "};",
  ...(reg ? [reg] : []),
  ...(iife ? ["})();"] : []),
  "",
];
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(newJs, out.join("\n"));

// the page: the sibling's, with the new data script and title
let html = fs.readFileSync(sib, "utf8");
const sibSrc = path.relative(path.dirname(sib), sibJs);
const newSrc = path.relative(path.dirname(target), newJs);
html = html.replace(`<script src="${sibSrc}"`, `<script src="${newSrc}"`);
html = html.replace(
  /<title>[^<]*<\/title>/,
  `<title>${title || "TODO"}</title>`,
);
// relative paths (../../../shared/…) stay right only in a folder at the same depth
if (path.relative(path.dirname(sib), path.dirname(target)).includes(".."))
  console.warn("! the new page is in another folder: check its ../ paths");
fs.writeFileSync(target, html);

// prettier: on the PATH, else ~/node_modules or nvm (not loaded in every shell)
const pretty = ["--write", "--log-level", "warn", target, newJs];
const home = require("os").homedir();
const nvms = [".nvm/versions/node", ".config/nvm/versions/node"].map((d) =>
  path.join(home, d),
);
const bins = [
  "prettier",
  path.join(home, "node_modules/.bin/prettier"),
  ...nvms.flatMap((d) =>
    fs.existsSync(d)
      ? fs.readdirSync(d).map((v) => path.join(d, v, "bin/prettier"))
      : [],
  ),
].filter((b) => b === "prettier" || fs.existsSync(b));
if (
  !bins.some((b) => {
    try {
      execFileSync(b, pretty, { stdio: "inherit" });
      return true;
    } catch (e) {
      return false;
    }
  })
)
  console.warn("! prettier did not run: format the two files by hand");
execFileSync(process.execPath, ["--check", newJs]);
const left = html.split(path.basename(sib, ".html")).length - 1;
console.log(
  [
    `wrote ${L.rel(target)} and ${L.rel(newJs)} (like ${L.rel(sibJs)}, ${main}, engine ${L.rel(eng)})`,
    ...notes.map((n) => "  " + n),
    kept.length
      ? `  kept (equal in all ${others.length} other lessons of the folder): ${kept.join(", ")}`
      : "",
    left
      ? `! "${path.basename(sib, ".html")}" still appears ${left}× in the page: check it`
      : "",
    `next: node .claude/scripts/scaffold/format.js ${L.rel(target)}`,
  ]
    .filter(Boolean)
    .join("\n"),
);
