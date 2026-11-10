// node .claude/scripts/arabic-reading-check.js arabic-reading/<step>.js: gloss, pictures, images, translations of an Arabic reading step
const fs = require("fs"),
  path = require("path");
const file = path.resolve(process.argv[2]);
global.window = {};
global.document = { currentScript: { src: "" } };
eval(fs.readFileSync(file, "utf8"));
const L = window.LESSON,
  dir = path.dirname(file);
const H = /[ً-ٰٟـ]/g,
  bare = (s) => s.replace(H, "");
const G = L.gloss || {},
  gb = new Set(Object.keys(G).map(bare));
const missing = new Set(),
  probs = [];
const words = (t) =>
  String(t)
    .split(/\s+/)
    .map((w) => w.replace(/^[«»"(]+|[«»")،,.؛:؟?!]+$/g, ""))
    .filter(
      (w) =>
        /[ء-ي]/.test(w) &&
        !/_{3}/.test(w) &&
        bare(w).length > 1 &&
        !/^[ء-ي]ـ|ـ[ء-ي]?$/.test(bare(w)) &&
        !/ـ/.test(w),
    );
const need = (t) =>
  words(t).forEach((w) => {
    if (!(w in G) && !gb.has(bare(w))) missing.add(bare(w));
  });
for (const k of ["title"]) need(L[k]);
for (const st of L.stories || []) {
  need(st.title);
  if (!st.en || !st.uk) probs.push("story en/uk");
  for (const pt of st.parts) {
    need(pt.ar);
    need(pt.para);
    if (!pt.en || !pt.uk) probs.push("part en/uk");
    if (!pt.img) probs.push("part without picture");
    else if (!fs.existsSync(path.join(dir, pt.img)))
      probs.push("missing " + pt.img);
  }
}
if (!L.en || !L.uk) probs.push("head: en/uk");
for (const s of L.exercises) {
  need(s.t);
  if (!s.en || !s.uk) probs.push(s.k + ": en/uk");
  s.items.forEach((it, i) => {
    const id = s.k + "#" + (i + 1);
    if (!it.en || !it.uk) probs.push(id + ": en/uk");
    if (!it.img && !it.ic) probs.push(id + ": no picture");
    if (it.ic && [...new Intl.Segmenter().segment(it.ic)].length > 2)
      probs.push(id + ": ic > 2");
    if (it.img && !fs.existsSync(path.join(dir, it.img)))
      probs.push(id + ": missing " + it.img);
    need(it.q);
    (it.o || []).forEach(need);
    if (it.w) need(it.w);
    if (it.a && typeof it.a === "string" && !it.plain) need(it.a);
    (it.also || []).forEach(need);
    if (it.help) {
      need(it.help.q);
      it.help.o.forEach((o) => need(Array.isArray(o) ? o[0] : o));
    }
    if (it.type === "mc" && it.o.length < 2) probs.push(id + ": options");
  });
}
if (L.cover && !fs.existsSync(path.join(dir, L.cover)))
  probs.push("missing cover");
console.log(
  "items:",
  L.exercises.reduce((t, s) => t + s.items.length, 0),
  "sections:",
  L.exercises.length,
);
console.log("problems:", probs.length ? probs.join("\n  ") : "none");
console.log(
  "words without a gloss (" + missing.size + "):",
  [...missing].join(" "),
);
