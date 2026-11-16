// Math · Grade 4 · Lesson 11-1 « Represent Multiplication of a Unit Fraction by a Whole Number » (Reveal Math, Unit 11 « Multiply Fractions by Whole Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 17:25–18:20; no page numbers;
// On My Own 1 and 9 read from the frames between), Student Practice Book p. 113–114 (and the Unit 11 Family Letter). No teacher's key. Log: grade-4/math/SOURCES.md.
// n × {1/d}: n groups of {1/d} = {n/d}. The models: n strips with one part shaded each, or circles.
const S = (n, d) => Array.from({ length: n }, () => `{1/${d}}`).join(" + ");
const mulQ = (q, n, d, more = {}) => ({
  type: "num",
  q,
  pre: `${n} × {1/${d}} =`,
  fr: `?/${d}`,
  a: n,
  vis:
    n <= 6
      ? {
          kind: "fbar",
          side: true,
          rows: Array.from({ length: n }, () => ({ d, k: 1 })),
        }
      : {
          kind: "fline",
          hi: Math.ceil(n / d),
          lines: [{ d, jumps: Array(n).fill(1), lab: false }],
        },
  x: `${n} × {1/${d}} = {[${n}]/${d}}: ${n} groups of {1/${d}}.`,
  ...more,
});

window.LESSON = {
  n: "11-1",
  key: "math4-l11-1",
  grade: 4,
  title: "Unit Fraction Times a Number",
  en: "n × 1/d is n groups of 1/d: repeated addition",
  unit: "Unit 11 · Lesson 11-1",
  book: "e-book Lesson 11-1 · Practice Book p. 113–114",
  imgDir: "img/lesson-11-1",
  cover: "curious",
  question: {
    q: "How is multiplying a [unit fraction] by a whole number like multiplying whole numbers?",
    // unverified: a model answer, the book gives none
    a: "Both are equal groups: 4 × 3 is 4 groups of 3, 4 × {1/5} is 4 groups of {1/5} = {4/5}. Both are repeated addition.",
    img: "curious",
  },
  words: [
    { w: "Unit fraction", m: "a fraction with 1 on top: {1/5}" },
    { w: "Multiple", m: "{4/5} is a multiple of {1/5}: 4 × {1/5} = {4/5}" },
    { w: "Repeated addition", m: "{1/5} + {1/5} + {1/5} + {1/5} = 4 × {1/5}" },
    { w: "Product", m: "the answer of a multiplication" },
  ],
  ideas: [
    {
      t: "What could the question be?",
      ic: "🥤",
      img: "curious",
      lines: [
        "A pitcher of juice poured into [6] glasses.",
        "If each glass holds {1/4} liter, how much juice was in the pitcher?",
        "6 × {1/4} = {6/4} liters.",
      ],
    },
    {
      t: "Tyler's strawberries",
      ic: "🍓",
      lines: [
        "Tyler makes 4 bowls of fruit salad with {1/5} pound of strawberries in each.",
        "4 groups of {1/5}: {1/5} + {1/5} + {1/5} + {1/5} = {4/5}.",
        "4 × {1/5} = {4/5} pound.",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 5, k: 1 },
          { d: 5, k: 1 },
          { d: 5, k: 1 },
          { d: 5, k: 1 },
        ],
      },
    },
    {
      t: "A multiple",
      ic: "✖️",
      lines: [
        "{4/5} is a [multiple] of {1/5}, because 4 × {1/5} = {4/5}.",
        "Any fraction is a multiple of its unit fraction: {7/3} = 7 × {1/3}.",
      ],
      vis: { kind: "fline", lines: [{ d: 5, jumps: [1, 1, 1, 1] }] },
    },
  ],

  games: [
    {
      k: "mul",
      t: "Groups of a unit fraction",
      en: "n × 1/d",
      ic: "✖️",
      items: [
        [3, 4],
        [5, 6],
        [2, 3],
        [6, 8],
        [4, 10],
        [7, 5],
        [9, 4],
        [5, 2],
      ].map(([n, d]) => mulQ("What is the product?", n, d)),
    },
    {
      k: "multiple",
      t: "Fraction as a multiple",
      en: "a/d = a × 1/d",
      ic: "🔁",
      items: [
        [5, 6],
        [3, 8],
        [7, 4],
        [9, 10],
        [4, 3],
      ].map(([a, d]) => ({
        type: "num",
        q: `Write {${a}/${d}} as a multiple of {1/${d}}.`,
        pre: `{${a}/${d}} =`,
        post: `× {1/${d}}`,
        a,
        vis: {
          kind: "fline",
          hi: Math.ceil(a / d),
          lines: [{ d, jumps: Array(a).fill(1), lab: false }],
        },
        x: `${a} groups of {1/${d}}: {${a}/${d}} = [${a}] × {1/${d}}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 11-1",
      t: "Be Curious",
      en: "Pitcher and glasses",
      ic: "🥤",
      from: "e-book 11-1 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "How many glasses of juice are there?",
          a: 6,
          post: "glasses",
          img: "curious",
          x: "[6] glasses.",
        },
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: any question is right
          a: "If each glass holds {1/4} liter, how much juice was in the pitcher? 6 × {1/4} = {6/4} liters.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 11-1",
      t: "Learn: Tyler's strawberries",
      en: "4 × 1/5",
      ic: "🍓",
      from: "e-book 11-1 · Learn",
      keep: true,
      items: [
        mulQ(
          "Tyler makes 4 bowls of fruit salad with {1/5} pound of strawberries in each. How many pounds of strawberries?",
          4,
          5,
          { post: "pound" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 11-1",
      t: "Work Together",
      en: "Tanya's fruit pizzas",
      ic: "🍍",
      from: "e-book 11-1 · Work Together",
      keep: true,
      items: [
        mulQ(
          "Tanya made 2 fruit pizzas with {1/8} pound of pineapple on each. What is the total weight of the pineapple?",
          2,
          8,
          { post: "pound" },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 11-1",
      t: "On My Own 1–10",
      en: "Products and factors",
      ic: "✖️",
      from: "e-book 11-1 · On My Own 1–10",
      keep: true,
      items: [
        mulQ("What is the product?", 3, 6),
        mulQ("What is the product?", 4, 3, {
          vis: {
            kind: "fbar",
            side: true,
            rows: [1, 2, 3, 4].map(() => ({ d: 3, k: 1, pie: true })),
          },
        }),
        {
          type: "num",
          q: "What is the missing factor?",
          pre: "",
          post: "× {1/8} = {5/8}",
          a: 5,
          vis: { kind: "fline", lines: [{ d: 8, jumps: [1, 1, 1, 1, 1] }] },
          x: "5 jumps of {1/8}: [5] × {1/8} = {5/8}.",
        },
        {
          type: "num",
          q: "What is the missing factor?",
          pre: "7 ×",
          fr: "1/?",
          post: "= {7/10}",
          a: 10,
          vis: { kind: "fbar", rows: [{ d: 10, k: 7 }] },
          x: "7 tiles of {1/10}: 7 × {1/[10]} = {7/10}.",
        },
        {
          type: "num",
          q: "Express {7/3} as a multiple of a unit fraction.",
          pre: "{7/3} =",
          post: "× {1/3}",
          a: 7,
          vis: {
            kind: "fline",
            hi: 3,
            lines: [{ d: 3, jumps: [1, 1, 1, 1, 1, 1, 1], lab: false }],
          },
          x: "{7/3} = [7] × {1/3}.",
        },
        {
          type: "num",
          q: "Express {5/2} as a multiple of a unit fraction.",
          pre: "{5/2} =",
          post: "× {1/2}",
          a: 5,
          vis: {
            kind: "fline",
            hi: 3,
            lines: [{ d: 2, jumps: [1, 1, 1, 1, 1], lab: false }],
          },
          x: "{5/2} = [5] × {1/2}.",
        },
        mulQ("What is the product?", 8, 4),
        mulQ("What is the product?", 9, 7),
        mulQ("What is the product?", 5, 3),
        mulQ("What is the product?", 6, 5),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · Lesson 11-1",
      t: "On My Own 11–13",
      en: "Raisins, hallway, puppy",
      ic: "🍞",
      from: "e-book 11-1 · On My Own 11–13",
      keep: true,
      items: [
        mulQ(
          "STEM: Saffron needs {1/8} cup of raisins for one batch of bread pudding. How much for 4 batches?",
          4,
          8,
          { post: "cup" },
        ),
        {
          type: "num",
          q: "The hallway is {1/10} mile long. Jackson walked its length several times, {6/10} mile in all. How many times?",
          post: "times",
          a: 6,
          vis: {
            kind: "fline",
            lines: [{ d: 10, jumps: [1, 1, 1, 1, 1, 1], lab: false }],
          },
          x: "{6/10} = [6] × {1/10}: 6 times.",
        },
        mulQ(
          "Extend: Layla's puppy gained {1/2} pound each month for 4 months. How much did it gain?",
          4,
          2,
          { post: "pounds" },
        ),
        {
          type: "num",
          q: "The puppy weighs 12 pounds now. How much did it weigh 4 months ago?",
          pre: "12 − 2 =",
          post: "pounds",
          a: 10,
          emoji: "🐶",
          x: "4 × {1/2} = {4/2} = 2 pounds gained; 12 − 2 = [10] pounds.",
        },
        {
          type: "open",
          q: "Reflect: How is multiplying unit fractions by whole numbers similar to multiplying whole numbers?",
          vis: {
            kind: "lines",
            rows: [
              "4 × 3 = 3 + 3 + 3 + 3",
              "4 × {1/5} = {1/5} + {1/5} + {1/5} + {1/5}",
            ],
          },
          // unverified: a model answer, the book gives none
          a: "Both mean equal groups and repeated addition: 4 × {1/5} is 4 groups of {1/5}, like 4 × 3 is 4 groups of 3.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 113–114",
      t: "Additional Practice 1–9",
      en: "Lesson 11-1",
      ic: "📘",
      from: "Practice Book p. 113–114",
      keep: true,
      items: [
        mulQ(`5 × {1/6} = ${S(5, 6)}. What is the product?`, 5, 6),
        mulQ(`7 × {1/5} = ${S(7, 5)}. What is the product?`, 7, 5),
        mulQ("Solve.", 4, 2),
        {
          type: "num",
          q: "{4/2} is how many wholes?",
          pre: "{4/2} =",
          a: 2,
          vis: { kind: "fline", hi: 2, lines: [{ d: 2, pt: 4 }] },
          x: "{4/2} = [2].",
        },
        mulQ("Solve.", 6, 4),
        mulQ("Solve.", 9, 8),
        mulQ("Solve.", 8, 5),
        mulQ(
          "Monroe swims {1/3} lap in one minute. How many laps in 9 minutes?",
          9,
          3,
          { post: "laps" },
        ),
        {
          type: "num",
          q: "{9/3} laps is how many whole laps?",
          pre: "{9/3} =",
          post: "laps",
          a: 3,
          vis: { kind: "fline", hi: 3, lines: [{ d: 3, pt: 9 }] },
          x: "{9/3} = [3] laps.",
        },
        mulQ(
          "Flora eats {1/4} cup of fruit every day. How much in 5 days?",
          5,
          4,
          { post: "cup" },
        ),
        mulQ(
          "Maryrose makes an octagon: 8 sides of {1/2} foot of ribbon. How much ribbon?",
          8,
          2,
          { post: "feet" },
        ),
        {
          type: "tf",
          q: "She has 5 feet of ribbon. Is it enough?",
          a: true,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["{8/2} = 4 feet", "4 < 5"] },
          x: "8 × {1/2} = {8/2} = 4 feet, less than 5: enough.",
        },
      ],
    },
  ],
};
