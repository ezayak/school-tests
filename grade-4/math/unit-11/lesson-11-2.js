// Math · Grade 4 · Lesson 11-2 « Understand Multiplying a Fraction by a Whole Number » (Reveal Math, Unit 11 « Multiply Fractions by Whole Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 18:20–19:20; no page numbers;
// On My Own 1, 2 and 7 read from the frames between), Student Practice Book p. 115–116. No teacher's key. Log: grade-4/math/SOURCES.md.
// n × {a/d} = (n × a) × {1/d} = {na/d}.
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
// the step before: n × {a/d} = n × a × {1/d}: the missing a
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
  n: "11-2",
  key: "math4-l11-2",
  grade: 4,
  title: "Fraction Times a Number",
  en: "n × a/d: multiply the top, keep the bottom",
  unit: "Unit 11 · Lesson 11-2",
  book: "e-book Lesson 11-2 · Practice Book p. 115–116",
  imgDir: "img/lesson-11-2",
  cover: "curious",
  question: {
    q: "How does a [fraction model] help me multiply a fraction by a whole number?",
    // unverified: a model answer, the book gives none
    a: "It shows the equal groups: 3 × {3/4} is 3 groups of 3 fourths, 9 fourths in all: {9/4}. Multiply the top, keep the bottom.",
    img: "curious",
  },
  words: [
    { w: "Multiple", m: "{9/4} is a multiple of {3/4}: 3 × {3/4}" },
    { w: "Unit fraction", m: "{1/4}: 1 on top" },
    { w: "Product", m: "3 × {3/4} = {9/4}" },
    { w: "Equal groups", m: "3 groups of {3/4}" },
  ],
  ideas: [
    {
      t: "What do you see?",
      ic: "🫐",
      img: "curious",
      lines: [
        "A yogurt parfait: yogurt, berries and granola.",
        "A recipe uses a [fraction] of a cup of each.",
      ],
    },
    {
      t: "Erika's smoothies",
      ic: "🥤",
      lines: [
        "3 smoothies, each with {3/4} cup of yogurt: 3 groups of {3/4}.",
        "{3/4} = 3 × {1/4}, so 3 × {3/4} = 9 × {1/4} = [{9/4}].",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 4, k: 3 },
          { d: 4, k: 3 },
          { d: 4, k: 3 },
        ],
      },
    },
    {
      t: "The rule",
      ic: "💡",
      lines: [
        "Multiply the [top] by the whole number.",
        "Keep the [bottom].",
        "4 × {2/3} = {8/3}",
      ],
      vis: { kind: "fline", hi: 3, lines: [{ d: 3, jumps: [2, 2, 2, 2] }] },
    },
  ],

  games: [
    {
      k: "mul",
      t: "Fraction times a number",
      en: "Multiply the top",
      ic: "✖️",
      items: [
        [2, 3, 5],
        [3, 2, 4],
        [4, 2, 3],
        [5, 3, 8],
        [2, 5, 6],
        [3, 3, 10],
        [6, 2, 5],
        [4, 3, 4],
      ].map(([n, a, d]) => mulQ("What is the product?", n, a, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 11-2",
      t: "Be Curious",
      en: "Yogurt parfait",
      ic: "🫐",
      from: "e-book 11-2 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you see?",
          img: "curious",
          // unverified: any answer is right
          a: "A yogurt parfait in a jar, a jar of yogurt, a bowl of berries and a bowl of granola. A recipe could use a fraction of a cup of each.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 11-2",
      t: "Learn: Erika's smoothies",
      en: "3 × 3/4",
      ic: "🥤",
      from: "e-book 11-2 · Learn",
      keep: true,
      items: [
        unitStep(
          "Erika makes 3 smoothies with {3/4} cup of yogurt each. {3/4} is how many {1/4}?",
          3,
          3,
          4,
          {
            kind: "fbar",
            side: true,
            rows: [
              { d: 4, k: 3 },
              { d: 4, k: 3 },
              { d: 4, k: 3 },
            ],
          },
        ),
        mulQ("How much yogurt does Erika need?", 3, 3, 4, { post: "cups" }),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 11-2",
      t: "Work Together",
      en: "Shawn walks to school",
      ic: "🚶",
      from: "e-book 11-2 · Work Together",
      keep: true,
      items: [
        mulQ(
          "Shawn walks {3/8} mile to and from school each day. How far in a 5-day week?",
          5,
          3,
          8,
          { post: "mile" },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 11-2",
      t: "On My Own 1–7",
      en: "What is the product?",
      ic: "✖️",
      from: "e-book 11-2 · On My Own 1–7",
      keep: true,
      items: [
        unitStep(
          "Use the fraction model. Each grid shows how many twelfths?",
          2,
          5,
          12,
          {
            kind: "fbar",
            side: true,
            rows: [
              { d: 12, g: 3, on: [2, 5, 8, 11, 10] },
              { d: 12, g: 3, on: [2, 5, 8, 11, 10] },
            ],
          },
        ),
        mulQ("What is the product?", 2, 5, 12),
        unitStep(
          "Use the fraction circles. Each circle shows how many eighths?",
          4,
          4,
          8,
          {
            kind: "fbar",
            side: true,
            rows: [1, 2, 3, 4].map(() => ({ d: 8, k: 4, pie: true })),
          },
        ),
        mulQ("What is the product?", 4, 4, 8),
        mulQ("Use the fraction model. What is the product?", 2, 2, 3),
        mulQ("Use the fraction model. What is the product?", 3, 2, 5, {
          vis: {
            kind: "fbar",
            side: true,
            rows: [1, 2, 3].map(() => ({ d: 5, k: 2, pie: true })),
          },
        }),
        mulQ("Use the number line. What is the product?", 3, 3, 10),
        mulQ("What is the product?", 2, 5, 8),
        mulQ("What is the product?", 3, 4, 6),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 11-2",
      t: "On My Own 8–12",
      en: "Nuts, relay, Michael, juice",
      ic: "🏃",
      from: "e-book 11-2 · On My Own 8–12",
      keep: true,
      items: [
        mulQ(
          "Krystol uses 3 bags of nuts, {4/5} cup in each. How many cups of nuts?",
          3,
          4,
          5,
          { post: "cups" },
        ),
        {
          type: "num",
          q: "m × {7/12} = {14/12}. What is m?",
          pre: "m =",
          a: 2,
          vis: { kind: "lines", rows: ["m × 7 = 14"] },
          x: "[2] × 7 = 14: 2 × {7/12} = {14/12}.",
        },
        {
          type: "open",
          q: "Write a real-world problem for m × {7/12} = {14/12}.",
          vis: { kind: "lines", rows: ["m × {7/12} = {14/12}"] },
          // unverified: any matching story is right
          a: "A muffin recipe needs {7/12} cup of sugar. Lily used {14/12} cups. How many batches did she make? m = 2.",
        },
        mulQ(
          "Each leg of a relay race is {3/4} mile. There are 4 legs. How long is the race?",
          4,
          3,
          4,
          { post: "miles" },
        ),
        {
          type: "tf",
          q: "Error Analysis: Michael ran {7/10} mile each day for 10 days. He says he ran {70/100} mile in all. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["10 × {7/10} = ?"] },
          x: "He multiplied the bottom too. 10 × {7/10} = {70/10} = 7 miles.",
        },
        mulQ("How far did Michael really run?", 10, 7, 10, { post: "miles" }),
        {
          type: "num",
          q: "Extend: {12/4} cups of juice. How many {3/4}-cup servings? ? × {3/4} = {12/4}",
          post: "× {3/4} = {12/4}",
          a: 4,
          vis: {
            kind: "fline",
            hi: 3,
            lines: [{ d: 4, jumps: [3, 3, 3, 3], lab: false }],
          },
          x: "[4] × 3 = 12: 4 servings.",
        },
        {
          type: "open",
          q: "Reflect: How does a fraction model help you find the product of a whole number and a fraction?",
          vis: {
            kind: "fbar",
            side: true,
            rows: [
              { d: 4, k: 3 },
              { d: 4, k: 3 },
              { d: 4, k: 3 },
            ],
          },
          // unverified: a model answer, the book gives none
          a: "It shows the equal groups of parts. I count all the shaded parts: that is the top of the product; the size of the parts (the bottom) stays the same.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 115–116",
      t: "Additional Practice 1–8",
      en: "Lesson 11-2",
      ic: "📘",
      from: "Practice Book p. 115–116",
      keep: true,
      items: [
        mulQ("Use a number line.", 3, 4, 5),
        mulQ("Use a number line.", 5, 1, 2),
        mulQ("Use a number line.", 7, 6, 10),
        mulQ("Make a fraction model.", 9, 1, 4),
        mulQ("Make a fraction model.", 7, 3, 6),
        mulQ("Make a fraction model.", 6, 7, 8),
        mulQ(
          "Each plant needs {3/4} gallon of water a day. How much for 5 plants?",
          5,
          3,
          4,
          { post: "gallons" },
        ),
        mulQ(
          "Evan reads each chapter in {1/5} hour. How long for 9 chapters?",
          9,
          1,
          5,
          { post: "hours" },
        ),
        {
          type: "tf",
          q: "Evan says it will take him 2 hours. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["{9/5} < {10/5} = 2"] },
          x: "9 × {1/5} = {9/5} hours, a little less than 2 hours ({10/5}).",
        },
      ],
    },
  ],
};
