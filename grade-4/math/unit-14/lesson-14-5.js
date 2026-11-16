// Math · Grade 4 · Lesson 14-5 « Add and Subtract Angle Measures » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1808–k1843), Practice Book p. 163–164. No teacher's key.
// The rays of On My Own 3, 4, 6, 7 are read on the book's protractors (70°, 160°, 55°, 125°); Practice Book 3–6 measured on the PDF's lines
// (90°, 170°, 40°, 75°). "Write possible measures" items (5–7, PB 5–6) are choices with one right pair. Log: grade-4/math/SOURCES.md.
const V = [150, 140],
  R = 138;
const pt = (d, r = R) => [
  V[0] + r * Math.cos((d * Math.PI) / 180),
  V[1] - r * Math.sin((d * Math.PI) / 180),
];
// an angle on a protractor from 0° to `to`, a dashed ray inside at `mid`; labels for the two parts ("" = no arc)
const split = (to, mid, l1, l2, prot = true) => {
  const items = [];
  if (prot) items.push({ t: "prot", c: V, r: 112 });
  items.push({ t: "ray", a: V, b: pt(0) }, { t: "ray", a: V, b: pt(to) });
  if (mid !== undefined) {
    items.push({ t: "ray", a: V, b: pt(mid), dash: true });
    if (l1 !== "")
      items.push({ t: "arc", v: V, a: pt(0), b: pt(mid), r: 26, l: l1 });
    if (l2 !== "")
      items.push({ t: "arc", v: V, a: pt(mid), b: pt(to), r: 40, l: l2 });
  }
  items.push({ t: "pt", p: V });
  return { kind: "geo", w: 300, h: 150, items };
};
// what is the sum of the two angles (no protractor: the whole would give the answer)
const sumQ = (q, a, b, more = {}) => ({
  type: "num",
  q,
  a: a + b,
  post: "°",
  vis: split(a + b, a, `${a}°`, `${b}°`, false),
  x: `${a} + ${b} = [${a + b}]°.`,
  ...more,
});
// the unknown part: the whole angle is read on the protractor
const unkQ = (q, to, known, more = {}) => ({
  type: "num",
  q,
  a: to - known,
  post: "°",
  vis: split(to, known, `${known}°`, "?"),
  x: `The outer ray is on ${to}°: ${to} − ${known} = [${to - known}]°.`,
  ...more,
});
// which two smaller angles can the angle be broken into (one right pair)
const pairQ = (q, to, pairs, more = {}) => ({
  type: "mc",
  q,
  opts: pairs.map(([a, b]) => `${a}° and ${b}°`),
  vis: split(to),
  // unverified: the book takes any two angles with this sum
  x: `The angle measures ${to}°: ${pairs[0][0]} + ${pairs[0][1]} = ${to}. The two parts must add up to ${to}.`,
  ...more,
});
// Work Together: rays from B, A at 136.7°, then 36°, 32°, 28°, 26° down to C at 14.7°
const WT = (() => {
  const d = { A: 136.7, E: 100.7, D: 68.7, F: 40.7, C: 14.7 };
  const P = (k, r = 150) => pt(d[k], r);
  const items = [];
  for (const k of Object.keys(d))
    items.push(
      { t: "ray", a: V, b: P(k) },
      { t: "pt", p: P(k, 135), l: k, lp: k === "C" ? "s" : "w" },
    );
  items.push(
    { t: "arc", v: V, a: P("E"), b: P("A"), r: 52, l: "36°" },
    { t: "arc", v: V, a: P("D"), b: P("E"), r: 52, l: "32°" },
    { t: "arc", v: V, a: P("F"), b: P("D"), r: 52, l: "28°" },
    { t: "arc", v: V, a: P("C"), b: P("D"), r: 86, l: "54°" },
    { t: "pt", p: V, l: "B", lp: "s" },
  );
  return { kind: "geo", w: 300, h: 160, items };
})();

window.LESSON = {
  n: "14-5",
  key: "math4-l14-5",
  grade: 4,
  title: "Add and Subtract Angles",
  en: "Break an angle into smaller angles: add and subtract their measures",
  unit: "Unit 14 · Lesson 14-5",
  book: "e-book Lesson 14-5 · Practice Book p. 163–164",
  imgDir: "img/lesson-14-5",
  cover: "curious",
  question: {
    q: "How did you think like a mathematician when [adding and subtracting] angle measures?",
    // unverified: a model answer, the book gives none
    a: "The smaller angles [add up] to the whole angle. To find a missing part, I [subtract] the part I know from the whole: 75° − 40° = 35°.",
    img: "melon",
  },
  words: [
    {
      w: "Decompose an angle",
      m: "break it into smaller angles with a ray inside",
    },
    { w: "Sum", m: "the smaller angles add up to the whole angle" },
    { w: "Unknown angle", m: "the part to find: whole − the part you know" },
  ],
  ideas: [
    {
      t: "A watermelon slice",
      ic: "🍉",
      img: "melon",
      lines: [
        "Yuma cuts a watermelon slice into [2 pieces].",
        "What could be the angle of each piece?",
      ],
    },
    {
      t: "The whole angle",
      ic: "📐",
      lines: ["Draw an angle for the slice and measure it: [75°]."],
      vis: split(75),
    },
    {
      t: "Two pieces",
      ic: "✂️",
      lines: [
        "Draw a ray [inside] the angle.",
        "The first angle measures [40°].",
      ],
      vis: split(75, 40, "40°", "?"),
    },
    {
      t: "Add up to the whole",
      ic: "➕",
      lines: [
        "The two smaller angles add up to 75°: 40° + ? = 75°.",
        "75 − 40 = 35: the second angle is [35°].",
      ],
      vis: split(75, 40, "40°", "35°"),
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Parts known → [add]: part + part = whole.",
        "Whole and one part known → [subtract]: whole − part = the other part.",
      ],
      vis: split(120, 50, "50°", "70°"),
    },
  ],

  games: [
    {
      k: "sum",
      t: "Add the angles",
      en: "Part + part = whole",
      ic: "➕",
      items: [
        [30, 45],
        [50, 40],
        [25, 65],
        [70, 60],
        [45, 90],
        [20, 35],
      ].map(([a, b]) => sumQ("What is the sum of the two angles?", a, b)),
    },
    {
      k: "unk",
      t: "Find the unknown angle",
      en: "Whole − part",
      ic: "➖",
      items: [
        [90, 30],
        [120, 45],
        [60, 25],
        [150, 70],
        [80, 55],
        [140, 100],
      ].map(([to, k]) =>
        unkQ("What is the measure of the unknown angle?", to, k),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-5",
      t: "Be Curious",
      en: "Three kiwi slices",
      ic: "🥝",
      from: "e-book 14-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: the book takes any answer
          a: "The same: all three slices are the same angle. Different: the white lines break them into different smaller angles: 3 pieces, 2 pieces, 2 other pieces.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-5",
      t: "Learn: Yuma's watermelon",
      en: "75° = 40° + 35°",
      ic: "🍉",
      from: "e-book 14-5 · Learn",
      keep: true,
      items: [
        {
          type: "num",
          q: "Use a protractor to measure the angle of the watermelon slice.",
          a: 75,
          post: "°",
          vis: split(75),
          x: "The other ray is on [75]°.",
        },
        unkQ(
          "The first angle is 40°. What is the measure of the second angle?",
          75,
          40,
        ),
        {
          type: "open",
          q: "Math Is… Quantities: How does the equation 40° + ? = 75° represent the decomposed angle?",
          vis: split(75, 40, "40°", "?"),
          // unverified: a model answer, the book gives none
          a: "40° is the first piece, ? is the second piece, and 75° is the whole slice: the two pieces add up to the whole.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 14-5",
      t: "Work Together",
      en: "Angles ABD, FBC, ABC",
      ic: "🤝",
      from: "e-book 14-5 · Work Together",
      keep: true,
      items: [
        {
          type: "num",
          q: "What is the measure of angle ABD?",
          a: 68,
          post: "°",
          vis: WT,
          x: "From A to D: 36 + 32 = [68]°.",
        },
        {
          type: "num",
          q: "What is the measure of angle FBC?",
          a: 26,
          post: "°",
          vis: WT,
          x: "DBC is 54° and DBF is 28°: 54 − 28 = [26]°.",
        },
        {
          type: "num",
          q: "What is the measure of angle ABC?",
          a: 122,
          post: "°",
          vis: WT,
          x: "From A to D is 68°, from D to C is 54°: 68 + 54 = [122]°.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-5",
      t: "On My Own 1–5",
      en: "Sums and unknown angles",
      ic: "📐",
      from: "e-book 14-5 · On My Own 1–5",
      keep: true,
      items: [
        sumQ("What is the sum of the two angles?", 50, 35),
        sumQ("What is the sum of the two angles?", 70, 60),
        unkQ("What is the measure of the unknown angle?", 70, 35),
        unkQ("What is the measure of the unknown angle?", 160, 60),
        {
          type: "mc",
          q: "Gabriela drew a ray inside an obtuse angle to partition it into two acute angles. What could the measures be?",
          opts: [
            "120° = 60° + 60°",
            "120° = 100° + 20°",
            "80° = 40° + 40°",
            "150° = 50° + 50°",
          ],
          vis: split(120, 60, "", ""),
          // unverified: the book takes any right answer
          x: "120° is obtuse (more than 90°), 60° and 60° are acute (less than 90°), and 60 + 60 = 120.",
        },
      ],
    },
    {
      k: "own6",
      g: "📗 Book · Lesson 14-5",
      t: "On My Own 6–9",
      en: "Break the angle, Andy's orange",
      ic: "🍊",
      from: "e-book 14-5 · On My Own 6–9",
      keep: true,
      items: [
        pairQ("How can the angle be broken into two smaller angles?", 55, [
          [25, 30],
          [20, 30],
          [30, 35],
          [55, 55],
        ]),
        pairQ("How can the angle be broken into two smaller angles?", 125, [
          [60, 65],
          [60, 60],
          [70, 65],
          [100, 35],
        ]),
        {
          type: "tf",
          q: "Error Analysis: Andy wants to cut a 110° orange slice into two smaller pieces. He says 45° and 55° are possible. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          img: "orange",
          x: "45 + 55 = 100, not 110. The two pieces must add up to 110°, for example 55° and 55°.",
        },
        {
          type: "num",
          q: "Extend: three angles make a straight line (180°): 64°, x and 55°. What is x?",
          a: 61,
          post: "°",
          vis: {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              { t: "line", a: [10, 110], b: [290, 110] },
              { t: "ray", a: [150, 110], b: [106, 20] },
              { t: "ray", a: [150, 110], b: [207, 28] },
              {
                t: "arc",
                v: [150, 110],
                a: [10, 110],
                b: [106, 20],
                r: 30,
                l: "64°",
              },
              {
                t: "arc",
                v: [150, 110],
                a: [106, 20],
                b: [207, 28],
                r: 30,
                l: "x",
              },
              {
                t: "arc",
                v: [150, 110],
                a: [207, 28],
                b: [290, 110],
                r: 30,
                l: "55°",
              },
              { t: "pt", p: [150, 110] },
            ],
            cap: "A straight line: 180°",
          },
          x: "180 − 64 − 55 = [61]°.",
        },
        {
          type: "open",
          q: "Reflect: How did you think like a mathematician when adding and subtracting angle measures?",
          img: "melon",
          // unverified: a model answer, the book gives none
          a: "I used what I know about adding and subtracting: the parts add up to the whole angle, and the whole minus one part gives the other part.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 163–164",
      t: "Additional Practice 1–6",
      en: "Lesson 14-5",
      ic: "📘",
      from: "Practice Book p. 163–164",
      keep: true,
      items: [
        sumQ("What is the sum of the two angles?", 45, 85),
        sumQ("What is the sum of the two angles?", 20, 15),
        unkQ("What is the measure of the unknown angle?", 90, 40),
        unkQ("What is the measure of the unknown angle?", 170, 80),
        pairQ("How can the angle be broken into two smaller angles?", 40, [
          [15, 25],
          [15, 20],
          [20, 30],
          [40, 40],
        ]),
        pairQ("How can the angle be broken into two smaller angles?", 75, [
          [30, 45],
          [30, 40],
          [35, 45],
          [70, 15],
        ]),
      ],
    },
  ],
};
