// Math · Grade 4 · Lesson 6-6 « Multiply Two Multiples of 10 » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 185–188, Student Practice Book p. 57–58. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Products are worked out by shared/math-kit.js (step); the two ways of the book: tens, and the Associative Property.
const { fmt, step } = MathKit;
// "A × B = A × (B/10) tens = ? tens = ?"
const tensWay = (A, B, q) => [
  {
    type: "num",
    q: `${q || `${A} × ${B}`}: how many tens is ${B}?`,
    pre: `${A} × ${B} = ${A} ×`,
    post: "tens",
    a: B / 10,
    vis: { kind: "lines", rows: [`${B} = ? tens`] },
    x: `${B} = [${B / 10}] tens`,
  },
  {
    type: "num",
    q: `${A} × ${B / 10} tens = ? tens`,
    pre: `${A} × ${B / 10} tens =`,
    post: "tens",
    a: (A * B) / 10,
    vis: { kind: "lines", rows: [`${A} × ${B / 10} = ?`] },
    x: `${A} × ${B / 10} = [${fmt((A * B) / 10)}]`,
  },
  step(`${fmt((A * B) / 10)} tens = ?`, `${fmt((A * B) / 10)} × 10`, ""),
];
// "A × B = a × 10 × b × 10 = a × b × 100"
const assocWay = (A, B, q) => [
  {
    type: "num",
    q: `${q || `${A} × ${B}`} = ${A / 10} × 10 × ${B / 10} × 10. First the basic fact:`,
    pre: `${A / 10} × ${B / 10} =`,
    a: (A * B) / 100,
    vis: {
      kind: "lines",
      rows: [`${A} × ${B}`, `= ${A / 10} × ${B / 10} × 10 × 10`],
    },
    x: `${A / 10} × ${B / 10} = [${(A * B) / 100}]`,
  },
  step(`Then × 100: ${A} × ${B} = ?`, `${(A * B) / 100} × 100`, ""),
];

window.LESSON = {
  n: "6-6",
  key: "math4-l6-6",
  grade: 4,
  title: "Multiply Two Multiples of 10",
  en: "30 × 50: the basic fact 3 × 5 = 15, then the two zeros: 1,500",
  unit: "Unit 6 · Lesson 6-6",
  book: "Book p. 185–188 · Practice Book p. 57–58",
  imgDir: "img/lesson-6-6",
  cover: "curious",
  question: {
    q: "How do I multiply two [multiples of 10]?",
    a: "Multiply the basic fact, then write the [zeros] of both factors: 30 × 50 → 3 × 5 = 15 → [1,500]. Careful: 60 × 50 → 6 × 5 = 30 → 3,000.",
    img: "bottles",
  },
  words: [
    { w: "Multiple of 10", m: "10, 20, 30 … : a number times 10" },
    { w: "Basic fact", m: "a times-table fact: 3 × 5 = 15" },
    {
      w: "Associative Property",
      m: "you can group the factors any way: 3 × 10 × 5 × 10 = 3 × 5 × 10 × 10",
    },
    { w: "Pattern", m: "3 × 5 = 15, 3 × 50 = 150, 30 × 50 = 1,500" },
  ],
  ideas: [
    {
      t: "Tell me everything you can",
      ic: "🏋️",
      img: "curious",
      lines: [
        "A rack of weights, each marked [50].",
        "Two rows of weights.",
        "Rows × weights × 50: multiplying with [multiples of 10].",
      ],
    },
    {
      t: "One way: patterns",
      ic: "🔢",
      img: "bottles",
      lines: [
        "30 bottles in a case, 50 cases: 30 × 50.",
        "3 × 5 = 15. 3 × 50 = 150. 30 × 50 = [1,500].",
        "Each zero in a factor gives a zero in the product.",
      ],
    },
    {
      t: "Another way: regroup the factors",
      ic: "🔗",
      lines: [
        "30 × 50 = 3 × 10 × 5 × 10.",
        "Put them in another order: 3 × 5 × 10 × 10.",
        "15 × 100 = [1,500] bottles.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "30 × 50",
          "= 3 × 10 × 5 × 10",
          "= 3 × 5 × 10 × 10",
          "= 15 × 100 = 1,500",
        ],
      },
    },
    {
      t: "When the fact has a zero",
      ic: "⚠️",
      lines: [
        "60 × 50: the fact 6 × 5 = [30] already has a zero.",
        "Then two more zeros: 3,000.",
        "So 60 × 50 has [three] zeros.",
      ],
      vis: { kind: "lines", rows: ["6 × 5 = 30", "60 × 50 = 3,000"] },
    },
  ],

  games: [
    {
      k: "zeros",
      t: "Fact and zeros",
      en: "Two multiples of 10",
      ic: "0️⃣",
      items: [
        "40 × 30",
        "20 × 70",
        "60 × 60",
        "50 × 80",
        "30 × 90",
        "80 × 40",
        "50 × 20",
        "70 × 70",
      ].map((e) => step(`${e} = ?`, e, "")),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 185–188",
      t: "Be Curious",
      en: "A rack of weights",
      ic: "🏋️",
      from: "Book p. 185 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Tell me everything you can.",
          img: "curious",
          // unverified: no key for this lesson; the weights are not counted
          a: "There are two rows of weights on a rack. Each weight is marked 50. To find how much they weigh in all, multiply the number of weights by 50.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 185–188",
      t: "Learn: cases of juice",
      en: "30 × 50",
      ic: "🧃",
      from: "Book p. 186 · Learn",
      keep: true,
      items: [
        step("3 × 5 = ?", "3 × 5", "", { img: "bottles", vis: undefined }),
        step("3 × 50 = ?", "3 × 50", ""),
        step(
          "30 bottles in a case. How many bottles in 50 cases? 30 × 50 = ?",
          "30 × 50",
          "bottles",
        ),
        ...assocWay(30, 50, "Another way: 30 × 50"),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 185–188",
      t: "Work Together",
      en: "60 × 40",
      ic: "🤝",
      from: "Book p. 186 · Work Together",
      keep: true,
      items: assocWay(60, 40),
    },
    {
      k: "own1",
      g: "📗 Book · p. 185–188",
      t: "On My Own 1–8",
      en: "Complete the equation",
      ic: "✖️",
      from: "Book p. 187 · On My Own 1–8",
      keep: true,
      items: [
        ...tensWay(20, 20),
        ...tensWay(50, 40),
        ...assocWay(70, 20),
        ...assocWay(90, 50),
        ...["90 × 90", "70 × 50", "20 × 90", "20 × 60"].map((e) =>
          step(`${e} = ?`, e, ""),
        ),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 185–188",
      t: "On My Own 9–13",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 187–188 · On My Own 9–13",
      keep: true,
      items: [
        step(
          "20 pencils in a package. How many pencils in 50 packages?",
          "20 × 50",
          "pencils",
        ),
        step(
          "Tisha has 90 dimes. A dime is 10 cents. How many cents?",
          "90 × 10",
          "cents",
        ),
        {
          type: "num",
          q: "900 cents: how many dollars? (100 cents = $1)",
          pre: "$",
          a: 9,
          vis: { kind: "lines", rows: ["100 cents = $1"] },
          x: "900 cents = [9] dollars.",
        },
        step(
          "Samson exercised 40 minutes a day for 30 days. How many minutes?",
          "40 × 30",
          "minutes",
        ),
        {
          type: "tf",
          q: "Alex uses 6 × 5 to find 60 × 50. He says the product has two zeros. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["6 × 5 = 30", "60 × 50 = ?"] },
          x: "6 × 5 = 30 already has a zero, plus the two zeros of 60 and 50: 60 × 50 = [3,000], three zeros.",
        },
        ...assocWay(30, 800, "30 × 800 = 3 × 10 × 8 × 100"),
        {
          type: "open",
          q: "Reflect: How did you use patterns while multiplying two multiples of 10?",
          vis: {
            kind: "lines",
            rows: ["3 × 5 = 15", "3 × 50 = 150", "30 × 50 = 1,500"],
          },
          // unverified: a model answer, the book gives none
          a: "I multiply the basic fact and then write the zeros of both factors: 30 × 50 → 3 × 5 = 15 → 1,500. If the fact already ends in 0 (6 × 5 = 30), that zero stays too.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 57–58",
      t: "Additional Practice 1–7",
      en: "Lesson 6-6",
      ic: "📘",
      from: "Practice Book p. 57–58",
      keep: true,
      items: [
        ...assocWay(60, 30),
        ...tensWay(40, 80),
        ...assocWay(70, 50),
        ...tensWay(60, 80),
        step(
          "A booklet has 20 stamps. How many stamps in 60 booklets?",
          "20 × 60",
          "stamps",
        ),
        step(
          "A food bank collected 50 items every day for 30 days. How many items?",
          "50 × 30",
          "items",
        ),
        {
          type: "mc",
          q: "Evie solves 50 × 80 with 5 × 8. She thinks the product has two zeros; Hudson thinks three. Who is right?",
          opts: ["Hudson", "Evie"],
          two: true,
          vis: { kind: "lines", rows: ["5 × 8 = 40", "50 × 80 = ?"] },
          x: "5 × 8 = 40 has a zero, plus two more: 50 × 80 = [4,000].",
        },
      ],
    },
  ],
};
