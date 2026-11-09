// Math · Grade 4 · Lesson 6-1 « Multiply by Multiples of 10, 100, or 1,000 » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 165–168, Student Practice Book p. 47–48. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Products are worked out by shared/math-kit.js (step: the equation shown, the answer computed).
const { step, timesBar } = MathKit;
// "4 × 40 = 4 × ___ tens = ___ tens = ___"
const UNIT = { 10: "tens", 100: "hundreds", 1000: "thousands" };
const viaUnits = (a, d, p) => {
  const u = UNIT[p];
  return [
    {
      type: "num",
      q: `${a} × ${(d * p).toLocaleString("en-US")}: how many ${u}?`,
      pre: `${a} × ${(d * p).toLocaleString("en-US")} = ${a} ×`,
      post: u,
      a: d,
      vis: {
        kind: "lines",
        rows: [`${(d * p).toLocaleString("en-US")} = ? ${u}`],
      },
      x: `${(d * p).toLocaleString("en-US")} = [${d}] ${u}`,
    },
    {
      type: "num",
      q: `${a} × ${d} ${u} = ? ${u}`,
      pre: `${a} × ${d} ${u} =`,
      post: u,
      a: a * d,
      vis: { kind: "lines", rows: [`${a} × ${d} = ?`] },
      x: `${a} × ${d} = [${a * d}]`,
    },
    step(
      `So ${a} × ${(d * p).toLocaleString("en-US")} = ?`,
      `${a} × ${(d * p).toLocaleString("en-US")}`,
      "",
    ),
  ];
};

window.LESSON = {
  n: "6-1",
  key: "math4-l6-1",
  grade: 4,
  title: "Multiply by 10s, 100s, 1,000s",
  en: "Use a basic fact and place value: 4 × 300 = 4 × 3 hundreds = 12 hundreds = 1,200",
  unit: "Unit 6 · Lesson 6-1",
  book: "Book p. 165–168 · Practice Book p. 47–48",
  imgDir: "img/lesson-6-1",
  cover: "curious",
  question: {
    q: "How can I multiply by [10, 100 or 1,000] fast?",
    a: "Use the [basic fact], then write the zeros: 4 × 3 = 12, so 4 × 300 = 12 hundreds = [1,200].",
    img: "curious",
  },
  words: [
    { w: "Multiple of 10", m: "10, 20, 30 … : a number times 10" },
    { w: "Basic fact", m: "a times-table fact: 4 × 3 = 12" },
    {
      w: "Associative Property",
      m: "you can group the factors any way: 4 × (3 × 100) = (4 × 3) × 100",
    },
    { w: "Product", m: "the answer of a multiplication" },
    {
      w: "Place value",
      m: "the place of a digit: ones, tens, hundreds, thousands",
    },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🦒",
      img: "curious",
      lines: [
        "About 2, 20, 200 and 2,000 pounds.",
        "They all start with [2]; only the zeros change.",
        "Each animal is about [10 times] as heavy as the one before.",
      ],
    },
    {
      t: "4 groups of 300",
      ic: "🍞",
      lines: [
        "4 kinds of bread, 300 loaves of each.",
        "4 × 3 hundreds = [12 hundreds].",
        "12 hundreds = [1,200] loaves.",
      ],
      vis: {
        kind: "groups",
        n: 4,
        of: 3,
        e: "💯",
        cap: "4 × 3 hundreds = 12 hundreds",
      },
    },
    {
      t: "Group the factors",
      ic: "🔗",
      lines: [
        "300 = 3 × 100, so 4 × 300 = 4 × 3 × 100.",
        "Multiply 4 × 3 first: 12 × 100.",
        "12 × 100 = [1,200].",
      ],
      vis: {
        kind: "lines",
        rows: ["4 × 300", "= 4 × 3 × 100", "= 12 × 100", "= 1,200"],
      },
    },
    {
      t: "A pattern of zeros",
      ic: "0️⃣",
      lines: [
        "4 × 3 = 12, 4 × 30 = 120,",
        "4 × 300 = 1,200, 4 × 3,000 = 12,000.",
        "Count the zeros in the factor and write them after the basic fact.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "4 × 3 = 12",
          "4 × 30 = 120",
          "4 × 300 = 1,200",
          "4 × 3,000 = 12,000",
        ],
      },
    },
    {
      t: "When the fact has a zero",
      ic: "⚠️",
      lines: [
        "5 × 200: the basic fact 5 × 2 = [10] already ends in 0.",
        "Then add the two zeros of 200: [1,000].",
        "Don't lose a zero!",
      ],
      vis: { kind: "lines", rows: ["5 × 2 = 10", "5 × 200 = 1,000"] },
    },
  ],

  games: [
    {
      k: "zeros",
      t: "Fact and zeros",
      en: "Multiply fast",
      ic: "0️⃣",
      items: [
        "3 × 40",
        "6 × 300",
        "7 × 2,000",
        "5 × 60",
        "8 × 500",
        "9 × 3,000",
        "2 × 700",
        "4 × 50",
      ].map((e) => step(`${e} = ?`, e, "")),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 165–168",
      t: "Be Curious",
      en: "Animals",
      ic: "🦒",
      from: "Book p. 165 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "About 20 pounds and about 200 pounds. 200 is how many times 20?",
          a: 10,
          post: "times",
          img: "curious",
          x: "200 = [10] × 20",
        },
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "All the weights start with 2: about 2, 20, 200 and 2,000 pounds. They are different by the zeros: each animal is about 10 times as heavy as the one before.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 165–168",
      t: "Learn: the bakery",
      en: "4 × 300",
      ic: "🍞",
      from: "Book p. 166 · Learn",
      keep: true,
      items: [
        ...viaUnits(4, 3, 100),
        step(
          "Another way: 4 × 300 = 4 × 3 × 100 = 12 × 100 = ?",
          "12 × 100",
          "loaves",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 165–168",
      t: "Work Together",
      en: "8 × 2,000",
      ic: "🤝",
      from: "Book p. 166 · Work Together",
      keep: true,
      items: [
        step("8 × 2 = 16. What is 8 × 2,000?", "8 × 2,000", "", {
          vis: {
            kind: "lines",
            rows: ["8 × 2 = 16", "8 × 2 thousands = 16 thousands"],
          },
        }),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 165–168",
      t: "On My Own 1–10",
      en: "What's the product?",
      ic: "✖️",
      from: "Book p. 167 · On My Own 1–10",
      keep: true,
      items: [
        ...viaUnits(4, 4, 10),
        ...viaUnits(4, 4, 100),
        ...viaUnits(6, 6, 100),
        ...viaUnits(6, 6, 1000),
        step("4 × 20 = 4 × 2 × 10 = 8 × 10 = ?", "8 × 10", ""),
        step("4 × 200 = 4 × 2 × 100 = 8 × 100 = ?", "8 × 100", ""),
        ...["7 × 300", "2 × 900", "8 × 80", "9 × 7,000"].map((e) =>
          step(`${e} = ?`, e, ""),
        ),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · p. 165–168",
      t: "On My Own 11–13",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 168 · On My Own 11–13",
      keep: true,
      items: [
        step(
          "Maya has 6 boxes of 50 glass beakers. How many beakers?",
          "6 × 50",
          "beakers",
          { vis: timesBar("1 box", 50, "6 boxes", 6) },
        ),
        step(
          "4 trucks weigh 7,000 pounds each. What is the total weight?",
          "4 × 7,000",
          "pounds",
          { vis: timesBar("1 truck", 7000, "4 trucks", 4) },
        ),
        step(
          "3 boxes of 20,000 salt packets. How many packets?",
          "3 × 20,000",
          "packets",
          { vis: timesBar("1 box", 20000, "3 boxes", 3) },
        ),
        {
          type: "open",
          q: "Reflect: What patterns do you see when you multiply by multiples of 10, 100 and 1,000?",
          vis: {
            kind: "lines",
            rows: ["4 × 3 = 12", "4 × 30 = 120", "4 × 300 = 1,200"],
          },
          // unverified: a model answer, the book gives none
          a: "The basic fact stays the same; only the zeros change. The product has the same zeros as the multiple of 10, 100 or 1,000 (plus a zero of the fact, as in 5 × 200 = 1,000).",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 47–48",
      t: "Additional Practice 1–7",
      en: "Lesson 6-1",
      ic: "📘",
      from: "Practice Book p. 47–48",
      keep: true,
      items: [
        {
          type: "mc",
          q: "What is another way to write 5 × 700?",
          opts: [
            "(5 × 7) × 100",
            "(5 × 70) × 100",
            "(2 × 5) × 100",
            "(5 × 5) × 100",
          ],
          keep: [
            "(5 × 70) × 100",
            "(2 × 5) × 100",
            "(5 × 5) × 100",
            "(5 × 7) × 100",
          ],
          vis: { kind: "lines", rows: ["700 = 7 × 100"] },
          x: "700 = 7 × 100, so 5 × 700 = [(5 × 7) × 100] (D).",
        },
        {
          type: "mc",
          q: "Which basic fact helps to find 3 × 800?",
          opts: ["3 × 8 = 24", "2 × 8 = 16", "5 × 8 = 40", "10 × 8 = 80"],
          keep: ["3 × 8 = 24", "2 × 8 = 16", "5 × 8 = 40", "10 × 8 = 80"],
          vis: { kind: "lines", rows: ["3 × 800 = 3 × 8 hundreds"] },
          x: "3 × 8 = 24, so 3 × 800 = [2,400] (A).",
        },
        ...[
          "9 × 6",
          "9 × 60",
          "9 × 600",
          "9 × 6,000",
          "7 × 8",
          "7 × 80",
          "7 × 800",
          "7 × 8,000",
        ].map((e) => step(`${e} = ?`, e, "")),
        step(
          "200 seats, 4 sold-out showings. How many people see the movie?",
          "4 × 200",
          "people",
        ),
        step(
          "9 boxes, each holds 300 pictures. How many pictures?",
          "9 × 300",
          "pictures",
        ),
        step(
          "An elephant weighs 6 tons. 1 ton = 2,000 pounds. How many pounds?",
          "6 × 2,000",
          "pounds",
        ),
      ],
    },
  ],
};
