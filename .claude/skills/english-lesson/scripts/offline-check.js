// Lists what sw.js will precache from games.js (the same regexes as sw.js) and reports missing files
// and files of a folder that are not listed. Usage (repo root): node offline-check.js [folder]
//   e.g. node .claude/skills/english-lesson/scripts/offline-check.js grade-4/term-2/english
const fs = require("fs");
const path = require("path");
const txt = fs.readFileSync("games.js", "utf8");
const paths = [...txt.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
for (const m of txt.matchAll(/also:\s*\[([^\]]*)\]/g))
  for (const f of m[1].matchAll(/"([^"]+)"/g)) paths.push(f[1]);
const missing = paths.filter((p) => !fs.existsSync(p));
console.log(`${paths.length} files listed · ${missing.length} missing`);
missing.forEach((p) => console.log("missing: " + p));
const folder = process.argv[2];
if (folder) {
  const listed = new Set(paths);
  const walk = (d) =>
    fs
      .readdirSync(d, { withFileTypes: true })
      .flatMap((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
      );
  const notListed = walk(folder).filter(
    (f) =>
      !f.endsWith(".md") && !path.basename(f).startsWith("_") && !listed.has(f),
  );
  console.log(`${folder}: ${notListed.length} files not in games.js`);
  notListed.forEach((f) => console.log("not listed: " + f));
}
process.exit(missing.length ? 1 : 0);
