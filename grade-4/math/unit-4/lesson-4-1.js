// Math · Grade 4 · Lesson 4-1 « Understand Comparing with Multiplication » (Reveal Math, Unit 4).
// Sources: Student Edition Vol. 1 p. 105–108, Student Practice Book p. 27–28, the teacher's key for p. 107–108 (Term 1/20261022-L_4-1.pdf, every answer matches).
// The Extra Practice 4-1 sheet is on the Unit 4 page (multiplication.js), not here. Log: grade-4/math/SOURCES.md.
// Drawings: cubes (sticks of connecting cubes), bar. The drawing tasks 7–9 are "count the sticks" questions.
const { fmt, timesBar, step, value } = MathKit;
// "big is ? times as many as small", with the cubes drawn in sticks of `small`
const sticks = (big, small, q, more = {}) => ({
  type: "num",
  q: q || `${big} is ___ times as many as ${small}.`,
  pre: `${big} is`,
  post: `times as many as ${small}`,
  a: big / small,
  vis: {
    kind: "cubes",
    rows: [
      { l: String(big), n: small, times: big / small, c: 0 },
      { l: String(small), n: small, c: 1 },
    ],
  },
  x: `${big} = [${big / small}] × ${small}`,
  ...more,
});

window.LESSON = {
  n: "4-1",
  key: "math4-l4-1",
  grade: 4,
  title: "Compare with Multiplication",
  en: "Times as many, times as much: a multiplicative comparison and its equation",
  unit: "Unit 4 · Lesson 4-1",
  book: "Book p. 105–108 · Practice Book p. 27–28",
  imgDir: "img/lesson-4-1",
  cover: "curious",
  question: {
    q: "How can I [compare] two numbers with [multiplication]?",
    a: "Say how many [times]: 20 is 2 times as much as 10. Write it as an equation: [20 = 2 × 10].",
    img: "curious",
  },
  words: [
    {
      w: "Times as many",
      m: "how many times one amount fits in the other: 20 is 2 times as many as 10",
    },
    {
      w: "Times as much",
      m: "the same for amounts: $20 is 2 times as much as $10",
    },
    {
      w: "Multiplicative comparison",
      m: "a sentence that compares with times: 20 = 2 × 10",
    },
    { w: "Equation", m: "a number sentence with =: 20 = 2 × 10" },
    { w: "Factor", m: "a number we multiply: in 2 × 10, 2 and 10" },
    { w: "Product", m: "the answer of a multiplication: 20" },
  ],
  ideas: [
    {
      t: "Four ribbons",
      ic: "🎀",
      img: "curious",
      lines: [
        "Ribbons of [3], [6], [9] and [12] inches.",
        "Ribbon B (6 in.) is 2 times as long as Ribbon A (3 in.).",
        "Ribbon D (12 in.) is [4 times] as long as Ribbon A.",
      ],
    },
    {
      t: "20 is 2 times as much as 10",
      ic: "🧊",
      lines: [
        "Stick C has 10 cubes. Stick D has 20 cubes.",
        "Two sticks C make one stick D.",
        "20 is [2 times] as much as 10: [20 = 2 × 10].",
      ],
      vis: {
        kind: "cubes",
        rows: [
          { l: "D", n: 10, times: 2, c: 0 },
          { l: "C", n: 10, c: 1 },
        ],
      },
    },
    {
      t: "20 is 10 times as much as 2",
      ic: "🔟",
      lines: [
        "Stick A has 2 cubes. Stick D has 20 cubes.",
        "Ten sticks A make one stick D.",
        "20 is [10 times] as much as 2: [20 = 10 × 2].",
      ],
      vis: {
        kind: "cubes",
        rows: [
          { l: "D", n: 2, times: 10, c: 0 },
          { l: "A", n: 2, c: 1 },
        ],
      },
    },
    {
      t: "Two ways to say it",
      ic: "🔄",
      lines: [
        "450 = 90 × 5.",
        "450 is [90 times] as much as 5.",
        "450 is also [5 times] as much as 90. Both are right!",
      ],
      vis: { kind: "lines", rows: ["450 = 90 × 5", "450 = 5 × 90"] },
    },
    {
      t: "The product is the big one",
      ic: "⚠️",
      lines: [
        "3 × 9 = 27: [27] is 3 times as much as 9.",
        "Not “3 is 9 times as much as 27”: 3 is the small number!",
        "The [product] comes first in the sentence.",
      ],
      vis: {
        kind: "cubes",
        rows: [
          { l: "27", n: 9, times: 3, c: 0 },
          { l: "9", n: 9, c: 1 },
        ],
      },
    },
  ],

  games: [
    {
      k: "times",
      t: "How many times?",
      en: "Count the sticks",
      ic: "🧊",
      items: [
        [12, 4],
        [15, 3],
        [18, 6],
        [20, 5],
        [14, 2],
        [24, 8],
      ].map(([b, s]) => sticks(b, s)),
    },
    {
      k: "equation",
      t: "Which equation?",
      en: "Times as many → ×",
      ic: "✖️",
      items: [
        [35, 7, 5],
        [48, 6, 8],
        [27, 9, 3],
        [40, 4, 10],
        [56, 8, 7],
      ].map(([p, a, b]) => ({
        type: "mc",
        q: `${p} is ${a} times as many as ${b}. Which equation?`,
        opts: [
          `${p} = ${a} × ${b}`,
          `${p} = ${a} + ${b}`,
          `${b} = ${a} × ${p}`,
        ],
        vis: timesBar("", b, "", a),
        x: `The product [${p}] is ${a} groups of ${b}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 105–108",
      t: "Be Curious",
      en: "Four ribbons",
      ic: "🎀",
      from: "Book p. 105 · Be Curious",
      keep: true,
      items: [
        sticks(
          12,
          3,
          "Ribbon D is 12 in., Ribbon A is 3 in. Ribbon D is ___ times as long.",
          {
            img: "curious",
            vis: undefined,
            post: "times as long as A",
            pre: "12 is",
          },
        ),
        sticks(
          9,
          3,
          "Ribbon C is 9 in., Ribbon A is 3 in. Ribbon C is ___ times as long.",
          {
            img: "curious",
            vis: undefined,
            post: "times as long as A",
            pre: "9 is",
          },
        ),
        sticks(
          12,
          6,
          "Ribbon D is 12 in., Ribbon B is 6 in. Ribbon D is ___ times as long.",
          {
            img: "curious",
            vis: undefined,
            post: "times as long as B",
            pre: "12 is",
          },
        ),
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: p. 105 is not in the teacher's key
          a: "The ribbons are 3, 6, 9 and 12 inches: each is 3 inches longer. Ribbon B is 2 times as long as A, C is 3 times, D is 4 times. I wonder which other ribbons compare with times.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 105–108",
      t: "Learn: sticks of cubes",
      en: "20 = 2 × 10",
      ic: "🧊",
      from: "Book p. 106 · Learn",
      keep: true,
      items: [
        sticks(
          20,
          10,
          "Stick D has 20 cubes, Stick C 10 cubes. 20 is ___ times as much as 10.",
        ),
        sticks(
          20,
          2,
          "Stick D has 20 cubes, Stick A 2 cubes. 20 is ___ times as much as 2.",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 105–108",
      t: "Work Together",
      en: "Marvin's pins",
      ic: "📍",
      from: "Book p. 106 · Work Together",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Marvin has 5 water park pins, 3 amusement park pins and 15 wildlife park pins. Which comparisons are right? Choose all.",
          opts: [
            {
              t: "15 is 3 times as many as 5 (15 = 3 × 5)",
              ok: true,
              emoji: "🧊",
            },
            {
              t: "15 is 5 times as many as 3 (15 = 5 × 3)",
              ok: true,
              emoji: "🧊",
            },
            { t: "5 is 3 times as many as 15", emoji: "🧊" },
            { t: "15 is 2 times as many as 5", emoji: "🧊" },
          ],
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 105–108",
      t: "On My Own 1–6",
      en: "Comparison statements",
      ic: "✖️",
      from: "Book p. 107 · On My Own 1–6",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Which statement can be shown by 3 × 9 = 27?",
          opts: [
            "27 is 3 times as much as 9",
            "3 is 3 times as much as 27",
            "27 is 9 times as much as 9",
            "3 is 9 times as much as 27",
          ],
          keep: [
            "3 is 3 times as much as 27",
            "27 is 9 times as much as 9",
            "3 is 9 times as much as 27",
            "27 is 3 times as much as 9",
          ],
          vis: { kind: "lines", rows: ["3 × 9 = 27"] },
          x: "The product [27] is 3 times as much as 9 (D).",
        },
        {
          type: "multi",
          q: "Which statements are true? Choose all.",
          opts: [
            { t: "18 is 2 times as much as 9", ok: true, emoji: "🧊" },
            { t: "18 is 9 times as much as 2", ok: true, emoji: "🧊" },
            { t: "9 is 2 times as much as 18", emoji: "🧊" },
            { t: "2 is 9 times as much as 18", emoji: "🧊" },
            { t: "9 is 18 times as much as 2", emoji: "🧊" },
          ],
        },
        sticks(
          12,
          4,
          "Stick A has 12 cubes. Stick B is 3 sticks of 4. There are ___ times as many cubes in Stick A as in Stick B?",
          { pre: "", post: "times as many" },
        ),
        sticks(10, 2, "2 cubes and 10 cubes. 10 is ___ times as much as 2."),
        {
          type: "mc",
          q: "Which equation shows: 24 is 4 times as much as 6?",
          opts: ["24 = 4 × 6", "24 = 4 + 6", "6 = 4 × 24", "4 = 24 × 6"],
          vis: timesBar("6", 6, "24", 4),
          x: "4 groups of 6 make [24].",
        },
        {
          type: "mc",
          q: "450 = 90 × 5. Sarah says: 450 is 90 times as much as 5. Mark says: 450 is 5 times as much as 90. Who is right?",
          opts: ["Both are right", "Only Sarah", "Only Mark"],
          vis: { kind: "lines", rows: ["450 = 90 × 5", "450 = 5 × 90"] },
          x: "The order of the factors does not matter: [both] sentences are true.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 105–108",
      t: "On My Own 7–12",
      en: "Pictures and equations",
      ic: "🧠",
      from: "Book p. 108 · On My Own 7–12",
      keep: true,
      items: [
        sticks(
          16,
          4,
          "Draw it with cubes: 16 is 4 times as many as 4. How many sticks of 4?",
          { pre: "16 is", post: "sticks of 4" },
        ),
        sticks(12, 6, "12 is 2 times as many as 6. How many sticks of 6?", {
          pre: "12 is",
          post: "sticks of 6",
        }),
        sticks(12, 4, "12 is 3 times as many as 4. How many sticks of 4?", {
          pre: "12 is",
          post: "sticks of 4",
        }),
        sticks(
          12,
          3,
          "12 is also 4 times as many as 3. How many sticks of 3?",
          { pre: "12 is", post: "sticks of 3" },
        ),
        {
          type: "mc",
          q: "Which equation shows: 36 is 9 times as many as 4 and 4 times as many as 9?",
          opts: ["36 = 9 × 4", "36 = 9 + 4", "36 = 4 + 4 + 9"],
          vis: { kind: "lines", rows: ["36 = 9 × 4 = 4 × 9"] },
          x: "[36 = 9 × 4] (or 36 = 4 × 9).",
        },
        step(
          "The smallest bottle weighs 8 pounds. The largest weighs 9 times as much. How much does the largest weigh?",
          "9 × 8",
          "pounds",
          { vis: timesBar("Small", 8, "Large", 9) },
        ),
        step(
          "Aaron plants 4 tomato plants and 3 times as many pepper plants. How many pepper plants?",
          "3 × 4",
          "pepper plants",
          { vis: timesBar("Tomato", 4, "Pepper", 3) },
        ),
        step(
          "He plants twice as many zucchini plants as pepper plants. How many zucchini?",
          "2 × 12",
          "zucchini plants",
          { vis: timesBar("Pepper", 12, "Zucchini", 2) },
        ),
        step("How many plants in all?", "4 + 12 + 24", "plants"),
        {
          type: "open",
          q: "Reflect: What do you notice when you use comparison words to describe a multiplication equation?",
          vis: {
            kind: "lines",
            rows: ["20 = 2 × 10", "20 is 2 times as much as 10"],
          },
          // unverified: the key says "answers may vary"
          a: "The product is the bigger number and comes first: 20 is 2 times as much as 10. Each factor can be the “times”: 20 is also 10 times as much as 2.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 27–28",
      t: "Additional Practice 1–6",
      en: "Lesson 4-1",
      ic: "📘",
      from: "Practice Book p. 27–28",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Which statement shows 4 × 8 = 32?",
          opts: [
            "32 is 4 times as many as 8",
            "4 is 8 times as many as 32",
            "4 is 4 times as many as 32",
            "8 is 8 times as many as 32",
          ],
          keep: [
            "4 is 8 times as many as 32",
            "32 is 4 times as many as 8",
            "4 is 4 times as many as 32",
            "8 is 8 times as many as 32",
          ],
          vis: { kind: "lines", rows: ["4 × 8 = 32"] },
          x: "The product [32] is 4 times as many as 8 (B).",
        },
        {
          type: "mc",
          q: "Which statement is true?",
          opts: [
            "24 is 4 times as many as 6",
            "4 is 6 times as many as 24",
            "6 is 4 times as many as 24",
            "4 is 24 times as many as 6",
          ],
          keep: [
            "24 is 4 times as many as 6",
            "4 is 6 times as many as 24",
            "6 is 4 times as many as 24",
            "4 is 24 times as many as 6",
          ],
          vis: { kind: "lines", rows: ["4 × 6 = 24"] },
          x: "4 × 6 = 24: [24] is 4 times as many as 6 (A).",
        },
        sticks(12, 3, "3 cubes and 12 cubes. 12 is ___ times as many as 3."),
        {
          type: "mc",
          q: "2 cubes and 10 cubes. Which equation shows the comparison?",
          opts: ["10 = 5 × 2", "10 = 5 + 2", "2 = 5 × 10"],
          vis: {
            kind: "cubes",
            rows: [
              { l: "10", n: 2, times: 5, c: 0 },
              { l: "2", n: 2, c: 1 },
            ],
          },
          x: "5 sticks of 2 make [10]: 10 = 5 × 2.",
        },
        {
          type: "mc",
          q: "Which equation matches: 63 is 7 times as much as 9?",
          opts: ["63 = 7 × 9", "63 = 7 + 9", "9 = 7 × 63"],
          vis: timesBar("9", 9, "63", 7),
          x: "7 groups of 9 make [63].",
        },
        sticks(
          6,
          3,
          "Macy's Stick A has 3 cubes, Stick B 6 cubes. 6 is ___ times as many as 3.",
        ),
        sticks(15, 3, "Stick C has 15 cubes. 15 is ___ times as many as 3."),
      ],
    },
  ],
};
[
  ["9 × 8", 72],
  ["3 × 4", 12],
  ["2 × 12", 24],
  ["4 + 12 + 24", 40],
].forEach(([e, v]) => {
  if (value(e) !== v) throw new Error(`lesson-4-1: ${e} is not ${v}`);
});
