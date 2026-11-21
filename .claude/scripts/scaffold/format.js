#!/usr/bin/env node
// The data format of a lesson engine, read from the lessons already built with it.
// Read this instead of the engine or a whole sibling lesson when writing a new lesson.
//
//   node .claude/scripts/scaffold/format.js <engine.js | page.html> [--subject Math] [--full]
//
// A page.html stands for its engine (and, for computer-lesson.js, its data-subject).
// For each kind of object (by path, and by `type` for items) it prints how often it occurs,
// its fields (`name:kind`, `?N` = only in N of them) and the shortest real example.
// Word lists keyed by the word itself and lessons keyed by id (u2, u3w5, 3) show as `{key}`.
// --full: whole examples (default: cut at 220 characters).
const fs = require("fs");
const path = require("path");
const L = require("./load.js");

const args = process.argv.slice(2);
const opt = (n) => {
  const i = args.indexOf(n);
  return i < 0 ? null : args.splice(i, 2)[1];
};
const full = args.includes("--full") && args.splice(args.indexOf("--full"), 1);
let subject = opt("--subject");
let target = args[0];
if (!target) {
  console.error(
    "usage: format.js <engine.js | page.html> [--subject Math] [--full]",
  );
  process.exit(2);
}
target = path.resolve(target);
if (target.endsWith(".html")) {
  const m = fs.readFileSync(target, "utf8").match(/data-subject="([^"]+)"/);
  target = L.engineOf(target);
  if (!subject && /computer-lesson\.js$/.test(target))
    subject = m ? m[1] : "Computer";
}
const pages = L.pagesOf(target, subject);
if (!pages.length) {
  console.error(
    `no page loads ${L.rel(target)}${subject ? " with data-subject=" + subject : ""}`,
  );
  process.exit(1);
}

const shapes = new Map(); // path -> {n, fields: Map, ex, map}
const seen = new WeakSet();
const isId = (k) => !/^[A-Za-z_$][\w$]*$/.test(k) || /\d/.test(k);

function see(p, v) {
  if (Array.isArray(v)) return v.forEach((x) => see(p + "[]", x));
  if (!v || typeof v !== "object" || seen.has(v)) return;
  seen.add(v);
  const key = typeof v.type === "string" ? `${p}(type: ${v.type})` : p;
  let s = shapes.get(key);
  if (!s) shapes.set(key, (s = { n: 0, fields: new Map(), ex: null, map: 0 }));
  s.n++;
  const ents = Object.entries(v);
  if (ents.length > 25 || ents.some(([k]) => isId(k))) {
    s.map += ents.length;
    for (const [, x] of ents) see(`${key}.{key}`, x);
    return;
  }
  let j;
  try {
    j = JSON.stringify(v);
  } catch (e) {
    j = null;
  }
  if (j && j.length > 20 && (!s.ex || j.length < s.ex.length)) s.ex = j;
  for (const [k, x] of ents) {
    const t = Array.isArray(x) ? "[]" : x === null ? "null" : typeof x;
    s.fields.set(`${k}:${t}`, (s.fields.get(`${k}:${t}`) || 0) + 1);
    see(`${key}.${k}`, x);
  }
}

// every data file once, run on the first page that loads it
const done = new Set();
const errors = [];
let files = 0;
for (const page of pages)
  for (const d of page.data) {
    if (done.has(d)) continue;
    done.add(d);
    files++;
    const { win, errors: e } = L.run(page, d);
    errors.push(...e);
    // the lesson object first, the id-keyed registers (EN_DATA, FR_DATA) after it
    const g = L.dataGlobals(win).sort(
      (a, b) => /_DATA$/.test(a) - /_DATA$/.test(b) || a.localeCompare(b),
    );
    for (const name of g) see(name, win[name]);
    for (const name of g) delete win[name];
  }

const out = [
  `# ${L.rel(target)}${subject ? ` · ${subject}` : ""}: ${pages.length} pages, ${files} data files`,
  "# fields: name:kind, ?N = only in N of them; e.g. = the shortest real example",
];
for (const [p, s] of [...shapes].sort((a, b) => a[0].localeCompare(b[0]))) {
  out.push("", `${p}  ×${s.n}`);
  if (s.map) out.push(`  {key: …}, ${s.map} keys`);
  if (!s.fields.size) continue;
  out.push(
    "  " +
      [...s.fields].map(([k, n]) => (n === s.n ? k : `${k}?${n}`)).join(", "),
  );
  if (s.ex)
    out.push(
      "  e.g. " +
        (!full && s.ex.length > 220 ? s.ex.slice(0, 220) + "…" : s.ex),
    );
}
if (errors.length)
  out.push("", "# could not run:", ...errors.map((e) => "#   " + e));
console.log(out.join("\n"));
