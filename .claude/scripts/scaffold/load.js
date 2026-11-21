// Shared by format.js and new.js: find the pages of an engine and run their data files in node.
// A page's scripts run in order in one sandbox (a stub browser), the engine itself is skipped,
// so helpers like MathKit or Kit are there when the data file needs them.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "../../..");
const SKIP = new Set([".git", ".claude", "node_modules"]);

function htmlFiles(dir = ROOT, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

// the local scripts of a page, in order (absolute paths)
function scriptsOf(html) {
  const t = fs.readFileSync(html, "utf8");
  return [...t.matchAll(/<script\s+src="([^"]+)"/g)]
    .filter((m) => !/^https?:/.test(m[1]))
    .map((m) => path.resolve(path.dirname(html), m[1]));
}

// the engine of a page: its last script from shared/ or named *-lesson.js
function engineOf(html) {
  const s = scriptsOf(html);
  return s
    .filter((p) => /-lesson\.js$/.test(p) || p.includes("/shared/"))
    .pop();
}

// pages that load the engine: [{html, scripts, data}], data = the page's own files
function pagesOf(engine, subject) {
  const eng = path.resolve(engine);
  const out = [];
  for (const html of htmlFiles()) {
    const scripts = scriptsOf(html);
    if (!scripts.includes(eng)) continue;
    const m = fs.readFileSync(html, "utf8").match(/data-subject="([^"]+)"/);
    // computer-lesson.js: a page without data-subject is a Computer lesson
    if (subject && (m ? m[1] : "Computer") !== subject) continue;
    const data = scripts.filter(
      (s) => s !== eng && !s.includes("/shared/") && fs.existsSync(s),
    );
    out.push({ html, scripts, data, eng });
  }
  return out;
}

// a value that answers anything: stands in for document, navigator, localStorage …
const stub = new Proxy(function () {}, {
  get: (t, k) =>
    k === Symbol.toPrimitive ? () => "" : k === "length" ? 0 : stub,
  apply: () => stub,
  construct: () => stub,
  set: () => true,
});

// run the page's scripts up to `upto` (included); returns the sandbox (window)
function run(page, upto) {
  const ctx = {
    console,
    URL,
    URLSearchParams,
    document: stub,
    navigator: stub,
    location: stub,
    localStorage: stub,
    sessionStorage: stub,
    addEventListener: () => {},
    removeEventListener: () => {},
    setTimeout: () => 0,
    clearTimeout: () => {},
    matchMedia: () => stub,
    speechSynthesis: stub,
    Audio: function () {
      return stub;
    },
  };
  ctx.window = ctx;
  ctx.self = ctx;
  vm.createContext(ctx);
  const errors = [];
  for (const s of page.scripts) {
    if (s === page.eng || !fs.existsSync(s)) continue;
    try {
      vm.runInContext(fs.readFileSync(s, "utf8"), ctx, { filename: s });
    } catch (e) {
      if (s === upto) errors.push(`${path.relative(ROOT, s)}: ${e.message}`);
    }
    if (s === upto) break;
  }
  return { win: ctx, errors };
}

// the data globals of a sandbox: LESSON, EN_DATA, FR_DATA, STORY …
const dataGlobals = (win) =>
  Object.keys(win).filter((k) => /^[A-Z][A-Z0-9_]*$/.test(k));

const rel = (p) => path.relative(ROOT, p);

module.exports = {
  ROOT,
  htmlFiles,
  scriptsOf,
  engineOf,
  pagesOf,
  run,
  dataGlobals,
  rel,
};
