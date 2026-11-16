// Math · Grade 4 · Lesson 11-3 « Multiply a Fraction by a Whole Number » (Reveal Math, Unit 11 « Multiply Fractions by Whole Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 19:20–20:15; no page numbers;
// On My Own 1–5 read from the frames between), Student Practice Book p. 117–118. No teacher's key. Log: grade-4/math/SOURCES.md. Helpers as in lesson 11-2.
const mulQ = (q, n, a, d, more = {}) => ({
  type: "num",
  q,
  pre: `${n} × {${a}/${d}} =`,
  fr: `?/${d}`,
  a: n * a,
  vis:
    n * a <= 3 * d && n <= 6
      ? {
          kind: "fbar",
          side: true,
          rows: Array.from({ length: n }, () => ({ d, k: a })),
        }
      : {
          kind: "fline",
          hi: Math.ceil((n * a) / d),
          lines: [{ d, jumps: Array(n).fill(a), lab: false }],
        },
  x: `${n} × ${a} = ${n * a}: ${n} × {${a}/${d}} = {[${n * a}]/${d}}.`,
  ...more,
});
const unitStep = (q, n, a, d, vis) => ({
  type: "num",
  q,
  pre: `${n} ×`,
  post: `× {1/${d}}`,
  a,
  vis,
  x: `{${a}/${d}} = ${a} × {1/${d}}: ${n} × [${a}] × {1/${d}}.`,
});

window.LESSON = {
  n: "11-3",
  key: "math4-l11-3",
  grade: 4,
  title: "Multiply a Fraction by a Number",
  en: "n × a/d = n × a × 1/d = na/d",
  unit: "Unit 11 · Lesson 11-3",
  book: "e-book Lesson 11-3 · Practice Book p. 117–118",
  imgDir: "img/lesson-11-3",
  cover: "curious",
  question: {
    q: "How do I multiply a [fraction] by a whole number?",
    // unverified: a model answer, the book gives none
    a: "Write the fraction as a multiple of a unit fraction: 5 × {5/8} = 5 × 5 × {1/8} = 25 × {1/8} = {25/8} = {3 1/8}.",
    img: "curious",
  },
  words: [
    { w: "Unit fraction", m: "{1/8}" },
    { w: "Multiple", m: "{5/8} = 5 × {1/8}" },
    { w: "Mixed number", m: "{25/8} = {3 1/8}" },
    { w: "Product", m: "5 × {5/8} = {25/8}" },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🟥",
      img: "curious",
      lines: [
        "4 rows of {2/5}, 8 rows of {1/5}, and 8 fifths in two strips.",
        "4 × {2/5} = 8 × {1/5} = {8/5}: the [same amount].",
      ],
    },
    {
      t: "Molly's bracelets",
      ic: "📿",
      lines: [
        "5 bracelets with {5/8} foot of leather each: 5 × {5/8}.",
        "{5/8} = 5 × {1/8}, so 5 × {5/8} = 25 × {1/8} = {25/8}.",
        "{25/8} = {3 1/8} feet.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "5 × {5/8} = 5 × 5 × {1/8}",
          "= 25 × {1/8} = {25/8}",
          "= {3 1/8}",
        ],
      },
    },
    {
      t: "The rule",
      ic: "💡",
      lines: [
        "Multiply the [top] by the whole number, keep the [bottom].",
        "Write the answer as a mixed number when it is more than 1.",
      ],
      vis: { kind: "lines", rows: ["3 × {3/4} = {9/4} = {2 1/4}"] },
    },
  ],

  games: [
    {
      k: "mul",
      t: "Multiply the top",
      en: "Keep the bottom",
      ic: "✖️",
      items: [
        [3, 2, 5],
        [4, 3, 8],
        [2, 5, 6],
        [5, 2, 3],
        [6, 3, 4],
        [3, 7, 10],
        [4, 5, 12],
        [7, 2, 5],
      ].map(([n, a, d]) => mulQ("What is the product?", n, a, d)),
    },
    {
      k: "unit",
      t: "As unit fractions",
      en: "n × a × 1/d",
      ic: "1️⃣",
      items: [
        [3, 2, 8],
        [4, 3, 5],
        [2, 5, 6],
        [5, 3, 4],
      ].map(([n, a, d]) => ({
        type: "num",
        q: `${n} × {${a}/${d}} = ? × {1/${d}}`,
        pre: `${n} × {${a}/${d}} =`,
        post: `× {1/${d}}`,
        a: n * a,
        vis: { kind: "lines", rows: [`${n} × ${a} × {1/${d}}`] },
        x: `${n} × ${a} = ${n * a}: ${n} × {${a}/${d}} = [${n * a}] × {1/${d}}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 11-3",
      t: "Be Curious",
      en: "Three models",
      ic: "🟥",
      from: "e-book 11-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The same: all show {8/5} (4 × {2/5} = 8 × {1/5} = {8/5}). Different: 4 strips with 2 fifths each, 8 strips with 1 fifth each, and 8 fifths in two wholes.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 11-3",
      t: "Learn: Molly's bracelets",
      en: "5 × 5/8",
      ic: "📿",
      from: "e-book 11-3 · Learn",
      keep: true,
      items: [
        unitStep(
          "Molly makes 5 bracelets with {5/8} foot of leather each. {5/8} is how many {1/8}?",
          5,
          5,
          8,
          { kind: "lines", rows: ["5 × {5/8} = 5 × ? × {1/8}"] },
        ),
        mulQ("How many feet of leather does Molly need?", 5, 5, 8, {
          post: "feet",
        }),
        {
          type: "num",
          q: "Write {25/8} as a mixed number. How many wholes?",
          pre: "{25/8} =",
          post: "and {1/8}",
          a: 3,
          vis: { kind: "fline", hi: 4, lines: [{ d: 8, pt: 25, lab: false }] },
          x: "3 × 8 = 24: {25/8} = {[3] 1/8} feet.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 11-3",
      t: "Work Together",
      en: "Sonia's lasagna",
      ic: "🍝",
      from: "e-book 11-3 · Work Together",
      keep: true,
      items: [
        mulQ(
          "Sonia made 3 pans of lasagna. {3/4} of each pan was eaten. How many pans were eaten?",
          3,
          3,
          4,
        ),
        {
          type: "num",
          q: "{9/4} pans: how many whole pans?",
          pre: "{9/4} =",
          post: "and {1/4}",
          a: 2,
          vis: { kind: "fline", hi: 3, lines: [{ d: 4, pt: 9, lab: false }] },
          x: "{9/4} = {[2] 1/4} pans.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 11-3",
      t: "On My Own 1–7",
      en: "What is the product?",
      ic: "✖️",
      from: "e-book 11-3 · On My Own 1–7",
      keep: true,
      items: [
        mulQ(
          "3 × {2/8} = 3 × 2 × {1/8} = 6 × {1/8}. What is the product?",
          3,
          2,
          8,
        ),
        mulQ(
          "4 × {2/5} = 4 × 2 × {1/5} = 8 × {1/5}. What is the product?",
          4,
          2,
          5,
        ),
        unitStep("2 × {2/3} = 2 × ? × {1/3}", 2, 2, 3, {
          kind: "lines",
          rows: ["2 × {2/3} = 2 × ? × {1/3}"],
        }),
        mulQ("2 × {2/3} = 2 × 2 × {1/3}. What is the product?", 2, 2, 3),
        unitStep("3 × {3/6} = 3 × ? × {1/6}", 3, 3, 6, {
          kind: "lines",
          rows: ["3 × {3/6} = 3 × ? × {1/6}"],
        }),
        mulQ("3 × {3/6} = 3 × 3 × {1/6}. What is the product?", 3, 3, 6),
        mulQ("What is the product?", 5, 2, 12),
        mulQ("What is the product?", 2, 3, 10),
        mulQ(
          "Helen combines 5 bags of seeds with {3/4} pound each. How much bird food?",
          5,
          3,
          4,
          { post: "pounds" },
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 11-3",
      t: "On My Own 8–11",
      en: "Walking, wood, Desmond, quilt",
      ic: "🪵",
      from: "e-book 11-3 · On My Own 8–11",
      keep: true,
      items: [
        mulQ(
          "Stella walked {9/10} mile each day. How far in 5 days?",
          5,
          9,
          10,
          { post: "miles" },
        ),
        mulQ(
          "Brady needs 6 pieces of wood, each {7/8} foot. How many feet?",
          6,
          7,
          8,
          { post: "feet" },
        ),
        {
          type: "tf",
          q: "Error Analysis: Desmond rewrites 4 × {3/5} as 4 × 3 × {3/5}. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["4 × {3/5} = 4 × 3 × ?"] },
          x: "{3/5} = 3 × {1/5}, so 4 × {3/5} = 4 × 3 × {1/5} = {12/5}, not × {3/5}.",
        },
        mulQ("Find the correct product.", 4, 3, 5),
        {
          type: "num",
          q: "Extend: Judie has {5 5/8} yards of fabric, cut into {1/8} yard pieces. How many pieces?",
          fr: "?/8",
          a: 45,
          vis: { kind: "lines", rows: ["{5 5/8} = {?/8}"] },
          x: "5 × 8 + 5 = 45: {5 5/8} = {[45]/8}, 45 pieces.",
        },
        {
          type: "num",
          q: "5 pieces make one strip. How many strips can she make?",
          pre: "45 ÷ 5 =",
          post: "strips",
          a: 9,
          emoji: "🧵",
          x: "45 ÷ 5 = [9] strips.",
        },
        {
          type: "open",
          q: "Reflect: How can you explain the strategies used to find the product of a whole number and a fraction?",
          vis: { kind: "lines", rows: ["5 × {5/8} = 25 × {1/8}"] },
          // unverified: a model answer, the book gives none
          a: "Write the fraction as a multiple of its unit fraction, multiply the whole numbers, and count unit fractions: 5 × {5/8} = 25 × {1/8} = {25/8}.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 117–118",
      t: "Additional Practice 1–9",
      en: "Lesson 11-3",
      ic: "📘",
      from: "Practice Book p. 117–118",
      keep: true,
      items: [
        unitStep("5 × {3/5} = 5 × ? × {1/5}", 5, 3, 5, {
          kind: "lines",
          rows: ["5 × {3/5} = 5 × ? × {1/5}"],
        }),
        mulQ("Solve.", 5, 3, 5),
        unitStep("6 × {5/8} = 6 × ? × {1/8}", 6, 5, 8, {
          kind: "lines",
          rows: ["6 × {5/8} = 6 × ? × {1/8}"],
        }),
        mulQ("Solve.", 6, 5, 8),
        mulQ("Solve.", 3, 3, 4),
        mulQ("Solve.", 7, 5, 6),
        mulQ("Solve.", 4, 7, 10),
        mulQ("Solve.", 8, 5, 12),
        mulQ(
          "Shy feeds each of her 3 cats {3/4} cup of food. How much each morning?",
          3,
          3,
          4,
          { post: "cups" },
        ),
        {
          type: "num",
          q: "A carpenter uses {9/10} gallon of stain for every 3 picnic tables. 12 tables are how many groups of 3?",
          pre: "12 ÷ 3 =",
          a: 4,
          emoji: "🪑",
          x: "12 ÷ 3 = [4] groups.",
        },
        mulQ("How much stain for 12 tables?", 4, 9, 10, { post: "gallons" }),
        {
          type: "tf",
          q: "Sunny rewrites 8 × {7/8} as 8 × {1/7} × {1/8}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: { kind: "lines", rows: ["{7/8} = 7 × {1/8}"] },
          x: "{7/8} = 7 × {1/8}, not {1/7} × {1/8}. 8 × {7/8} = 8 × 7 × {1/8} = {56/8} = 7.",
        },
      ],
    },
  ],
};
