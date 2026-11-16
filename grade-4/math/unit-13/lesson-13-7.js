// Math · Grade 4 · Lesson 13-7 « Solve Problems Using a Perimeter Formula » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1407–k1433), Practice Book p. 145–146.
// No teacher's key. Log: grade-4/math/SOURCES.md.
// a rectangle with its side labels ("?" for the one to find); lt / wt = the label text, or "" for none
const rect = (lt, wt, sq = false) => {
  const W = sq ? 110 : 180,
    H = sq ? 110 : 80,
    x0 = 150 - W / 2,
    y0 = 20;
  const items = [
    {
      t: "poly",
      pts: [
        [x0, y0],
        [x0 + W, y0],
        [x0 + W, y0 + H],
        [x0, y0 + H],
      ],
      fill: 1,
    },
  ];
  if (lt) items.push({ t: "text", p: [150, y0 - 6], s: lt });
  if (wt) items.push({ t: "text", p: [x0 + W + 30, y0 + H / 2 + 5], s: wt });
  return { kind: "geo", w: 300, h: 130, items };
};
// perimeter from length and width
const perQ = (text, l, w, u, more = {}) => ({
  type: "num",
  q: text || "What is the perimeter?",
  pre: "P =",
  post: u,
  a: 2 * (l + w),
  vis: rect(`${l} ${u}`, `${w} ${u}`, l === w),
  x: `P = (2 × ${l}) + (2 × ${w}) = ${2 * l} + ${2 * w} = [${2 * (l + w)}] ${u}.`,
  ...more,
});
// the missing side from the perimeter and the other side
const sideQ = (text, p, known, u, name = "w", more = {}) => ({
  type: "num",
  q: text || (name === "w" ? "What is the width?" : "What is the length?"),
  pre: `${name} =`,
  post: u,
  a: p / 2 - known,
  vis: {
    ...rect(
      name === "w" ? `${known} ${u}` : "?",
      name === "w" ? "?" : `${known} ${u}`,
    ),
    cap: `P = ${p} ${u}`,
  },
  x: `Half of the perimeter is one length + one width: ${p} ÷ 2 = ${p / 2}. ${p / 2} − ${known} = [${p / 2 - known}] ${u}.`,
  ...more,
});
// fill the blank in a formula
const blankQ = (form, l, w, u) => ({
  type: "num",
  q: `l = ${l} ${u}, w = ${w} ${u}. Fill in the blank: ${form}`,
  a: w,
  vis: rect(`${l} ${u}`, `${w} ${u}`),
  x: `The blank is the width: [${w}]. P = ${2 * (l + w)} ${u}.`,
});

window.LESSON = {
  n: "13-7",
  key: "math4-l13-7",
  grade: 4,
  title: "Perimeter Formula",
  en: "P = (2 × l) + (2 × w): find the perimeter or a missing side",
  unit: "Unit 13 · Lesson 13-7",
  book: "e-book Lesson 13-7 · Practice Book p. 145–146",
  imgDir: "img/lesson-13-7",
  cover: "curious",
  question: {
    q: "How did you use a [formula] to find the perimeter of a rectangle?",
    // unverified: a model answer, the book gives none
    a: "Put the length and the width in P = (2 × l) + (2 × w) and calculate: a rectangle 12 by 6 has P = 24 + 12 = 36.",
    img: "curious",
  },
  words: [
    { w: "Perimeter (P)", m: "the distance around a figure" },
    { w: "Formula", m: "an equation with symbols: P = (2 × l) + (2 × w)" },
    { w: "Length (l)", m: "the long side of a rectangle" },
    { w: "Width (w)", m: "the short side of a rectangle" },
  ],
  ideas: [
    {
      t: "A pool",
      ic: "🏊",
      img: "curious",
      lines: [
        "What could the question be?",
        "How long is the edge [around] the pool?",
      ],
    },
    {
      t: "Keira's garden",
      ic: "🥕",
      lines: [
        "Keira and her mother build a fence around a rectangular garden, [12 yd] by [6 yd].",
        "How many yards of fencing do they need?",
      ],
      vis: rect("12 yd", "6 yd"),
    },
    {
      t: "One way: add the sides",
      ic: "➕",
      lines: ["P = 12 + 6 + 12 + 6 = [36] yards."],
      vis: rect("12 yd", "6 yd"),
    },
    {
      t: "Another way: a formula",
      ic: "🧮",
      lines: [
        "Two sides are the length, two are the width.",
        "P = (2 × l) + (2 × w) = (2 × 12) + (2 × 6) = 24 + 12 = [36].",
      ],
      vis: {
        kind: "lines",
        rows: ["P = (2 × l) + (2 × w)", "P = 2 × (l + w)"],
      },
    },
    {
      t: "A missing side",
      ic: "❓",
      lines: [
        "Half of the perimeter = one length + one width.",
        "P = 48, l = 12: 48 ÷ 2 = 24, 24 − 12 = [12] = w.",
      ],
      vis: rect("12 yd", "?"),
    },
  ],

  games: [
    {
      k: "per",
      t: "Find the perimeter",
      en: "P = (2 × l) + (2 × w)",
      ic: "📏",
      items: [
        perQ("", 9, 4, "cm"),
        perQ("", 15, 10, "m"),
        perQ("", 7, 7, "in."),
        perQ("", 20, 3, "ft"),
        perQ("", 11, 6, "yd"),
      ],
    },
    {
      k: "side",
      t: "Find the missing side",
      en: "Half the perimeter − the other side",
      ic: "❓",
      items: [
        sideQ("", 30, 10, "cm"),
        sideQ("", 40, 12, "m"),
        sideQ("", 26, 5, "ft", "l"),
        sideQ("", 50, 18, "in."),
        sideQ("", 34, 7, "yd", "l"),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-7",
      t: "Be Curious",
      en: "A swimming pool",
      ic: "🏊",
      from: "e-book 13-7 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: the book takes any question
          a: "How many meters is it all around the pool? How much tile is needed for the edge of the pool?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-7",
      t: "Learn and Work Together",
      en: "Keira's fences",
      ic: "🥕",
      from: "e-book 13-7 · Learn, Work Together",
      keep: true,
      items: [
        perQ(
          "Keira's garden is 12 yards by 6 yards. How many yards of fencing do they need?",
          12,
          6,
          "yd",
        ),
        {
          type: "open",
          q: "Math Is… Generalizations: How is the formula like adding the sides?",
          vis: {
            kind: "lines",
            rows: ["12 + 6 + 12 + 6", "(2 × 12) + (2 × 6)"],
          },
          // unverified: a model answer, the book gives none
          a: "The formula adds the same four sides: the two lengths (2 × l) and the two widths (2 × w), just grouped.",
        },
        sideQ(
          "Work Together: Keira uses 48 yards of fencing for a rectangular garden with a length of 12 yards. What is the width?",
          48,
          12,
          "yd",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-7",
      t: "On My Own 1–9",
      en: "Perimeters and widths",
      ic: "📏",
      from: "e-book 13-7 · On My Own 1–9",
      keep: true,
      items: [
        perQ("", 6, 5, "ft"),
        perQ("", 14, 7, "yd"),
        blankQ("P = 2 × (10 + ?)", 10, 4, "miles"),
        perQ(
          "l = 10 miles, w = 4 miles. What is the perimeter?",
          10,
          4,
          "miles",
        ),
        blankQ("P = (2 × 5) + (2 × ?)", 5, 2, "km"),
        perQ("l = 5 km, w = 2 km. What is the perimeter?", 5, 2, "km"),
        perQ("l = 8 m, w = 5 m. What is the perimeter?", 8, 5, "m"),
        perQ("l = 5 units, w = 5 units. What is the perimeter?", 5, 5, "units"),
        sideQ("", 24, 8, "in."),
        sideQ("", 36, 10, "yd"),
        perQ(
          "A rectangular playground has a length of 72 feet and a width of 36 feet. What is the perimeter?",
          72,
          36,
          "ft",
        ),
      ],
    },
    {
      k: "own10",
      g: "📗 Book · Lesson 13-7",
      t: "On My Own 10–13",
      en: "Paper, tablecloth, building",
      ic: "🏢",
      from: "e-book 13-7 · On My Own 10–13",
      keep: true,
      items: [
        sideQ(
          "A rectangular piece of paper has a length of 8 inches. Its perimeter is 32 inches. What is the width?",
          32,
          8,
          "in.",
        ),
        {
          type: "num",
          q: "A rectangular tablecloth has a width of 60 inches. The length is {1 1/2} times the width. What is the perimeter?",
          pre: "P =",
          post: "in.",
          a: 300,
          vis: rect("? in.", "60 in."),
          x: "Length: 60 + 30 = 90 inches. P = (2 × 90) + (2 × 60) = 180 + 120 = [300] inches.",
        },
        sideQ(
          "STEM Connection: Sam designs a rectangular building with one side 1,000 meters and a perimeter of 2,800 meters. What is the length of the other side?",
          2800,
          1000,
          "m",
          "w",
        ),
        {
          type: "multi",
          q: "Extend: If the length is double the width, which could be perimeters of the rectangle? Choose all.",
          vis: rect("2 × w", "w"),
          opts: [
            ["6 cm", true],
            ["12 cm", true],
            ["18 cm", true],
            ["10 cm", false],
            ["20 cm", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "▭" })),
          // unverified: the book takes any three right perimeters
          x: "P = 2 × (2w + w) = 6 × w: the perimeter is a multiple of 6 (w = 1, 2, 3 gives 6, 12, 18). 10 and 20 are not.",
        },
        {
          type: "open",
          q: "Reflect: How did you use a formula to find the perimeter of a rectangle?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "I put the length and the width in P = (2 × l) + (2 × w). When the perimeter was given, I took half of it and subtracted the side I knew.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 145–146",
      t: "Additional Practice 1–10",
      en: "Lesson 13-7",
      ic: "📘",
      from: "Practice Book p. 145–146",
      keep: true,
      items: [
        perQ(
          "What is the missing value? Use the perimeter formula.",
          7,
          5,
          "feet",
        ),
        perQ(
          "What is the missing value? Use the perimeter formula.",
          8,
          3,
          "yards",
        ),
        blankQ("P = 2 × (6 + ?)", 6, 7, "units"),
        perQ("l = 6, w = 7. What is P?", 6, 7, "units"),
        blankQ("P = (2 × 9) + (2 × ?)", 9, 4, "units"),
        perQ("l = 9, w = 4. What is P?", 9, 4, "units"),
        perQ("l = 6, w = 9. What is P?", 6, 9, "units"),
        perQ("l = 5, w = 9. What is P?", 5, 9, "units"),
        sideQ(
          "P = 18 yards, w = 3 yards. What is the length?",
          18,
          3,
          "yd",
          "l",
        ),
        sideQ("P = 24 feet, l = 5 feet. What is the width?", 24, 5, "ft"),
        sideQ(
          "The school playground has a width of 35 feet and a perimeter of 100 feet. What is the length?",
          100,
          35,
          "ft",
          "l",
        ),
        {
          type: "num",
          q: "A rectangular swimming pool has a width of 20 feet. The length is {2 1/2} times the width. What is the perimeter?",
          pre: "P =",
          post: "ft",
          a: 140,
          vis: rect("? ft", "20 ft"),
          x: "Length: 2 × 20 + 10 = 50 feet. P = (2 × 50) + (2 × 20) = 100 + 40 = [140] feet.",
        },
      ],
    },
  ],
};
