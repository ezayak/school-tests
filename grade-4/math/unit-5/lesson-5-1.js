// Math · Grade 4 · Lesson 5-1 « Understand Factors of a Number » (Reveal Math, Unit 5).
// Sources: Student Edition Vol. 1 p. 131–134, Student Practice Book p. 35–36. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Factor pairs come from shared/math-kit.js (factorPairs, pairsQ: choose all the pairs, near misses as wrong ones); arrays from shared/math.js.
const { factorPairs, pairsQ } = MathKit;
// "Can n things go in equal rows of k?"
const rowsTF = (q, n, k, more = {}) => ({
  type: "tf",
  q,
  a: n % k === 0,
  yes: ["Yes", "No"],
  vis: { kind: "lines", rows: [`${k} × ? = ${n}`] },
  x:
    n % k === 0
      ? `${n} = ${n / k} × ${k}: [${k}] is a factor of ${n}.`
      : `${k} is [not a factor] of ${n}: ${k} × ${Math.floor(n / k)} = ${k * Math.floor(n / k)}, ${k} × ${Math.floor(n / k) + 1} = ${k * (Math.floor(n / k) + 1)}.`,
  ...more,
});
// "Which arrangements work?" (choose all): groups × size = n
const arrange = (q, ok, no, unit) => ({
  type: "multi",
  q,
  opts: [
    ...ok.map(([a, b]) => ({
      t: `${a} ${unit[0]} of ${b}`,
      ok: true,
      emoji: unit[1],
    })),
    ...no.map(([a, b]) => ({ t: `${a} ${unit[0]} of ${b}`, emoji: unit[1] })),
  ],
});

window.LESSON = {
  n: "5-1",
  key: "math4-l5-1",
  grade: 4,
  title: "Factors of a Number",
  en: "Factor pairs: all the ways to make a number by multiplying two whole numbers",
  unit: "Unit 5 · Lesson 5-1",
  book: "Book p. 131–134 · Practice Book p. 35–36",
  imgDir: "img/lesson-5-1",
  cover: "curious",
  question: {
    q: "How do I find all the [factor pairs] of a number?",
    a: "Start with 1 and check 2, 3, 4 … in order: does it divide the number? Stop when the pairs [turn around]. 18 = 1 × 18 = 2 × 9 = 3 × 6.",
    img: "curious",
  },
  words: [
    { w: "Factor", m: "a number you multiply: 3 and 6 are factors of 18" },
    {
      w: "Factor pair",
      m: "two factors that make the number: 3 and 6 (3 × 6 = 18)",
    },
    { w: "Product", m: "the answer of a multiplication: 18" },
    { w: "Array", m: "things in equal rows and columns" },
    { w: "Equal rows", m: "every row has the same number of things" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🎟️",
      img: "curious",
      lines: [
        "Every row has [6] tickets, but in different groups.",
        "1 group of 6, 2 groups of 3, 3 groups of 2, 6 groups of 1.",
        "6 = 1 × 6 = 2 × 3: 1, 2, 3 and 6 are the [factors] of 6.",
      ],
    },
    {
      t: "18 stickers in rows",
      ic: "⭐",
      lines: [
        "Rachel puts 18 stickers in equal rows.",
        "1 row of 18, 2 rows of 9, 3 rows of 6 …",
        "18 = 1 × 18 = 2 × 9 = 3 × 6.",
      ],
      vis: { kind: "array", r: 3, c: 6, e: "⭐", cap: "3 rows of 6 = [18]" },
    },
    {
      t: "Factor pairs",
      ic: "✖️",
      lines: [
        "1 and 18, 2 and 9, 3 and 6 are the [factor pairs] of 18.",
        "6 × 3 is the same pair as 3 × 6, turned around.",
        "The factors of 18: [1, 2, 3, 6, 9, 18].",
      ],
      vis: { kind: "lines", rows: ["1 × 18", "2 × 9", "3 × 6"] },
    },
    {
      t: "Check in order",
      ic: "🔍",
      lines: [
        "48: 1 × 48, 2 × 24, 3 × 16, 4 × 12, 5? [no], 6 × 8, 7? no.",
        "8 × 6 is a pair we have already: [stop].",
        "48 has 5 factor pairs.",
      ],
      vis: {
        kind: "lines",
        rows: ["1 × 48", "2 × 24", "3 × 16", "4 × 12", "6 × 8"],
      },
    },
    {
      t: "Only one pair",
      ic: "1️⃣",
      lines: [
        "23 = 1 × 23. 2, 3, 4 … don't work.",
        "23 has only [one] factor pair.",
        "11 bulbs can't go in 3 equal rows: 3 is [not a factor] of 11.",
      ],
      vis: { kind: "array", r: 1, c: 11, e: "🌷", cap: "11 = 1 × 11" },
    },
  ],

  games: [
    {
      k: "factor",
      t: "Is it a factor?",
      en: "Yes or no",
      ic: "🔍",
      items: [
        [42, 6],
        [35, 4],
        [27, 9],
        [40, 6],
        [36, 4],
        [29, 3],
        [56, 7],
        [50, 8],
      ].map(([n, k]) => rowsTF(`Is ${k} a factor of ${n}?`, n, k)),
    },
    {
      k: "pair",
      t: "Find the partner",
      en: "n = a × ?",
      ic: "✖️",
      items: [
        [24, 3],
        [36, 4],
        [45, 5],
        [28, 7],
        [60, 6],
        [32, 8],
      ].map(([n, k]) => ({
        type: "num",
        q: `${k} is a factor of ${n}. What is its partner?`,
        pre: `${n} = ${k} ×`,
        a: n / k,
        vis: { kind: "lines", rows: [`${n} = ${k} × ?`] },
        x: `${n} = ${k} × [${n / k}]`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 131–134",
      t: "Be Curious",
      en: "Rows of tickets",
      ic: "🎟️",
      from: "Book p. 131 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "How many tickets are in each row?",
          a: 6,
          img: "curious",
          post: "tickets",
          x: "Every row has [6] tickets.",
        },
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Each row has 6 tickets, put in groups in different ways: 6 = 1 × 6 = 2 × 3 = 3 × 2 = 6 × 1. I wonder how many ways there are to group other numbers.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 131–134",
      t: "Learn: 18 stickers",
      en: "The factor pairs of 18",
      ic: "⭐",
      from: "Book p. 132 · Learn",
      keep: true,
      items: [
        {
          type: "num",
          q: "18 stickers in 3 equal rows. How many in each row?",
          pre: "18 = 3 ×",
          a: 6,
          vis: { kind: "array", r: 3, c: 6, e: "⭐", cap: "" },
          x: "18 = 3 × [6]",
        },
        {
          type: "num",
          q: "18 stickers in 2 equal rows. How many in each row?",
          pre: "18 = 2 ×",
          a: 9,
          vis: { kind: "array", r: 2, c: 9, e: "⭐", cap: "" },
          x: "18 = 2 × [9]",
        },
        pairsQ(
          18,
          "How can Rachel arrange 18 stickers? Choose all the factor pairs of 18.",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 131–134",
      t: "Work Together",
      en: "The factor pairs of 48",
      ic: "🤝",
      from: "Book p. 132 · Work Together",
      keep: true,
      items: [
        pairsQ(48),
        {
          type: "num",
          q: "How many factor pairs does 48 have?",
          a: 5,
          vis: {
            kind: "lines",
            rows: ["1 × 48", "2 × 24", "3 × 16", "4 × 12", "6 × 8"],
          },
          x: "[5] pairs",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 131–134",
      t: "On My Own 1–6",
      en: "All the factor pairs",
      ic: "✖️",
      from: "Book p. 133 · On My Own 1–6",
      keep: true,
      items: [14, 65, 23, 64, 32, 100].map((n) => pairsQ(n)),
    },
    {
      k: "own7",
      g: "📗 Book · p. 131–134",
      t: "On My Own 7–13",
      en: "Arrangements",
      ic: "🌷",
      from: "Book p. 133–134 · On My Own 7–13",
      keep: true,
      items: [
        arrange(
          "Adrian puts 12 flowers in vases, the same number in each, and can use up to 6 vases. Which ways work? Choose all.",
          [
            [3, 4],
            [4, 3],
            [6, 2],
          ],
          [
            [5, 2],
            [4, 4],
          ],
          ["vases", "💐"],
        ),
        arrange(
          "Setsuko puts 36 books on up to 3 shelves, the same number on each. Which ways work? Choose all.",
          [
            [1, 36],
            [2, 18],
            [3, 12],
          ],
          [
            [2, 16],
            [3, 11],
          ],
          ["shelves", "📚"],
        ),
        pairsQ(
          24,
          "24 trophies in equal rows. Choose all the factor pairs of 24.",
        ),
        rowsTF(
          "Finn used 84 nails for 7 shelves. Could he use 12 nails for each shelf?",
          84,
          7,
          {
            vis: { kind: "lines", rows: ["7 × 12 = ?"] },
            x: "7 × 12 = [84]: yes, 12 nails for each shelf.",
          },
        ),
        arrange(
          "Kiara has 30 toy cars: 1 row of 30, 2 rows of 15, 3 rows of 10, 5 rows of 6. Which other arrangements could she show? Choose all.",
          [
            [6, 5],
            [10, 3],
            [15, 2],
            [30, 1],
          ],
          [
            [4, 7],
            [7, 4],
          ],
          ["rows", "🚗"],
        ),
        rowsTF("Can Ahmet plant 11 bulbs in 3 equal rows?", 11, 3),
        {
          type: "num",
          q: "Which number less than 20 has 3 factor pairs but only 5 factors?",
          a: 16,
          vis: { kind: "lines", rows: ["3 pairs", "5 factors"] },
          x: "[16] = 1 × 16 = 2 × 8 = 4 × 4. The factors 1, 2, 4, 8, 16: the 4 is used twice in 4 × 4.",
        },
        {
          type: "open",
          q: "Reflect: What strategy can you use to find all the factor pairs of a number?",
          vis: {
            kind: "lines",
            rows: ["1 × 18", "2 × 9", "3 × 6", "4? 5? no", "6 × 3 → stop"],
          },
          // unverified: a model answer, the book gives none
          a: "Start with 1 × the number. Then try 2, 3, 4 … in order: if it divides the number, write the pair. Stop when the first factor is already in a pair (the pairs turn around).",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 35–36",
      t: "Additional Practice 1–4",
      en: "Lesson 5-1",
      ic: "📘",
      from: "Practice Book p. 35–36",
      keep: true,
      items: [
        ...[8, 14, 24, 45, 50, 55, 65, 71].map((n) => pairsQ(n)),
        pairsQ(
          32,
          "Angela puts 32 pictures in equal rows. Choose all the factor pairs of 32.",
        ),
        arrange(
          "Milo puts 20 photos on up to 4 shelves, the same number on each. Which ways work? Choose all.",
          [
            [1, 20],
            [2, 10],
            [4, 5],
          ],
          [
            [3, 7],
            [4, 4],
          ],
          ["shelves", "🖼️"],
        ),
        rowsTF(
          "Jenine says she can put 17 boxes in equal rows of 4. Is she right?",
          17,
          4,
        ),
      ],
    },
  ],
};
