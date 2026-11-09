// Math · Grade 4 · Lesson 7-1 « Divide Multiples of 10, 100, and 1,000 » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 207–210, Student Practice Book p. 63–64. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Quotients are worked out by shared/math-kit.js (step: the equation shown, the answer computed).
const { step, partBar } = MathKit;
const lines = (...rows) => ({ kind: "lines", rows });
// "24 tens ÷ 3 = ? tens"
const unitDiv = (n, d, u) => ({
  type: "num",
  q: `${n} ${u} ÷ ${d} = ? ${u}`,
  pre: `${n} ${u} ÷ ${d} =`,
  post: u,
  a: n / d,
  vis: lines(`${n} ÷ ${d} = ?`),
  x: `${n} ÷ ${d} = [${n / d}], so ${n} ${u} ÷ ${d} = ${n / d} ${u}.`,
});
const unitMC = (q, right, x) => ({
  type: "mc",
  q,
  opts: [
    right,
    ...["ones", "tens", "hundreds", "thousands"]
      .filter((u) => u !== right)
      .slice(0, 2),
  ],
  vis: lines(q.replace(/^.*?: /, "")),
  x,
});

window.LESSON = {
  n: "7-1",
  key: "math4-l7-1",
  grade: 4,
  title: "Divide 10s, 100s, 1,000s",
  en: "Use a basic fact and place value: 24 ÷ 3 = 8, so 24,000 ÷ 3 = 8,000",
  unit: "Unit 7 · Lesson 7-1",
  book: "Book p. 207–210 · Practice Book p. 63–64",
  imgDir: "img/lesson-7-1",
  cover: "curious",
  question: {
    q: "How can a [basic fact] help me divide big numbers?",
    a: "24 ÷ 3 = 8. So 24 tens ÷ 3 = 8 tens: [240 ÷ 3 = 80]. 24 thousands ÷ 3 = 8 thousands: 24,000 ÷ 3 = 8,000.",
    img: "curious",
  },
  words: [
    { w: "Divide (÷)", m: "share into equal groups: 24 ÷ 3 = 8" },
    { w: "Dividend", m: "the number you divide: 24 in 24 ÷ 3" },
    { w: "Divisor", m: "the number you divide by: 3 in 24 ÷ 3" },
    { w: "Quotient", m: "the answer of a division: 8 in 24 ÷ 3 = 8" },
    { w: "Basic fact", m: "a times-table fact: 3 × 8 = 24, so 24 ÷ 3 = 8" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "💵",
      img: "curious",
      lines: [
        "Five $10 bills: [$50]. Two piggy banks.",
        "Share the money equally: 50 ÷ 2.",
        "Each bank gets [$25].",
      ],
    },
    {
      t: "Basic facts and place value",
      ic: "🔢",
      lines: [
        "24 ÷ 3 = 8.",
        "24 tens ÷ 3 = 8 tens: [240 ÷ 3 = 80].",
        "24 hundreds ÷ 3 = 8 hundreds: [2,400 ÷ 3 = 800].",
      ],
      vis: lines(
        "24 ÷ 3 = 8",
        "240 ÷ 3 = 80",
        "2,400 ÷ 3 = 800",
        "24,000 ÷ 3 = 8,000",
      ),
    },
    {
      t: "Multiply to check",
      ic: "🔄",
      lines: [
        "3 × 8 = 24, so 24 ÷ 3 = 8.",
        "3 × 800 = 2,400, so 2,400 ÷ 3 = [800].",
        "Division is the [opposite] of multiplication.",
      ],
      vis: lines("3 × 8,000 = 24,000", "24,000 ÷ 3 = 8,000"),
    },
    {
      t: "Count the zeros",
      ic: "0️⃣",
      lines: [
        "More zeros in the dividend → [more zeros] in the quotient.",
        "560 ÷ 7: 56 ÷ 7 = 8, so 560 ÷ 7 = [80].",
        "Careful: in 30 ÷ 5 = 6 the zero is part of the fact.",
      ],
      vis: lines("56 ÷ 7 = 8", "560 ÷ 7 = 80"),
    },
  ],

  games: [
    {
      k: "zeros",
      t: "Fact and zeros",
      en: "Divide fast",
      ic: "0️⃣",
      items: [
        "420 ÷ 6",
        "3,600 ÷ 4",
        "250 ÷ 5",
        "16,000 ÷ 8",
        "810 ÷ 9",
        "2,800 ÷ 7",
        "490 ÷ 7",
        "6,300 ÷ 9",
      ].map((e) => step(`${e} = ?`, e, "")),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 207–210",
      t: "Be Curious",
      en: "Money and piggy banks",
      ic: "💵",
      from: "Book p. 207 · Be Curious",
      keep: true,
      items: [
        step(
          "Five $10 bills and two piggy banks. Share the money equally: how much in each bank?",
          "50 ÷ 2",
          "dollars",
          { img: "curious", vis: undefined },
        ),
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "There are five $10 bills ($50) and two piggy banks. I wonder how to share the money equally: $25 in each bank.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 207–210",
      t: "Learn: 24,000 ÷ 3",
      en: "Facts and place value",
      ic: "🔢",
      from: "Book p. 208 · Learn",
      keep: true,
      items: [
        step("24 ÷ 3 = ?", "24 ÷ 3", ""),
        unitDiv(24, 3, "tens"),
        unitDiv(24, 3, "hundreds"),
        step("So 24,000 ÷ 3 = ?", "24,000 ÷ 3", "", {
          vis: lines("24 thousands ÷ 3 = ? thousands"),
        }),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 207–210",
      t: "Work Together",
      en: "300 seedlings in 6 rows",
      ic: "🤝",
      from: "Book p. 208 · Work Together",
      keep: true,
      items: [
        step(
          "Miguel plants 300 seedlings in 6 equal rows. How many in each row? (30 tens ÷ 6)",
          "300 ÷ 6",
          "seedlings",
          { vis: partBar("300", 300, 6, "1 row") },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 207–210",
      t: "On My Own 1–6",
      en: "Complete the equations",
      ic: "➗",
      from: "Book p. 209 · On My Own 1–6",
      keep: true,
      items: [
        unitDiv(36, 9, "ones"),
        unitDiv(36, 9, "tens"),
        unitMC(
          "36 ___ ÷ 9 = 4 hundreds: which word goes in the blank?",
          "hundreds",
          "36 [hundreds] ÷ 9 = 4 hundreds.",
        ),
        ...["180 ÷ 3", "1,800 ÷ 3", "18,000 ÷ 3"].map((e) =>
          step(`${e} = ?`, e, ""),
        ),
        {
          type: "num",
          q: "48 tens ÷ 6 = ?. Use 6 × 8 tens = 48 tens.",
          pre: "48 tens ÷ 6 =",
          post: "tens",
          a: 8,
          vis: lines("6 × 8 tens = 48 tens"),
          x: "6 × 8 = 48: [8] tens = 80.",
        },
        {
          type: "num",
          q: "35,000 ÷ 5 = ?. Which number times 5 is 35,000?",
          pre: "5 ×",
          post: "= 35,000",
          a: 7000,
          vis: lines("5 × 7 = 35"),
          x: "5 × [7,000] = 35,000, so 35,000 ÷ 5 = 7,000.",
        },
        step("560 ÷ 7 = ?", "560 ÷ 7", ""),
        step("360 ÷ 4 = ?", "360 ÷ 4", ""),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 207–210",
      t: "On My Own 7–13",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 209–210 · On My Own 7–13",
      keep: true,
      items: [
        step(
          "A bus travels 3,000 miles in 5 days, the same each day. How far in one day?",
          "3,000 ÷ 5",
          "miles",
          { vis: partBar("5 days", 3000, 5, "1 day") },
        ),
        step(
          "420 textbooks in 6 boxes. How many in each box?",
          "420 ÷ 6",
          "books",
          { vis: partBar("6 boxes", 420, 6, "1 box") },
        ),
        step(
          "Naomi read 320 pages in 8 days. How many each day?",
          "320 ÷ 8",
          "pages",
          { vis: partBar("8 days", 320, 8, "1 day") },
        ),
        step(
          "7,200 nails for 8 buildings. How many for each building?",
          "7,200 ÷ 8",
          "nails",
        ),
        step(
          "A 150-minute movie in 5 equal parts. How many minutes in each part?",
          "150 ÷ 5",
          "minutes",
        ),
        step(
          "210 hours in 3 months. How many hours each month?",
          "210 ÷ 3",
          "hours",
        ),
        step(
          "2,400 ÷ 60: think 240 tens ÷ 6 tens. What is the quotient?",
          "2,400 ÷ 60",
          "",
          { vis: lines("240 ÷ 6 = 40", "2,400 ÷ 60 = ?") },
        ),
        {
          type: "open",
          q: "Reflect: How can you use place value to help you divide multiples of 10, 100 and 1,000?",
          vis: lines(
            "24 ÷ 3 = 8",
            "24 tens ÷ 3 = 8 tens",
            "24 hundreds ÷ 3 = 8 hundreds",
          ),
          // unverified: a model answer, the book gives none
          a: "I use the basic fact and keep the place: 24 hundreds ÷ 3 = 8 hundreds, so 2,400 ÷ 3 = 800. The zeros of the dividend stay in the quotient.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 63–64",
      t: "Additional Practice 1–7",
      en: "Lesson 7-1",
      ic: "📘",
      from: "Practice Book p. 63–64",
      keep: true,
      items: [
        unitDiv(32, 8, "ones"),
        {
          type: "num",
          q: "___ ÷ 8 = 4",
          pre: "",
          post: "÷ 8 = 4",
          a: 32,
          vis: lines("8 × 4 = ?"),
          x: "8 × 4 = [32]",
        },
        unitMC(
          "32 ___ ÷ 8 = 4 tens: which word goes in the blank?",
          "tens",
          "32 [tens] ÷ 8 = 4 tens.",
        ),
        step("320 ÷ 8 = ?", "320 ÷ 8", ""),
        unitDiv(32, 8, "hundreds"),
        step("3,200 ÷ 8 = ?", "3,200 ÷ 8", ""),
        ...["30 ÷ 5", "300 ÷ 5", "3,000 ÷ 5", "15 ÷ 3", "150 ÷ 3"].map((e) =>
          step(`${e} = ?`, e, ""),
        ),
        {
          type: "num",
          q: "1,500 ÷ ___ = 500",
          pre: "1,500 ÷",
          post: "= 500",
          a: 3,
          vis: lines("15 ÷ ? = 5"),
          x: "15 ÷ [3] = 5, so 1,500 ÷ 3 = 500.",
        },
        unitDiv(72, 8, "tens"),
        step(
          "720 shirts in 8 days, the same each day. How many each day?",
          "720 ÷ 8",
          "shirts",
        ),
        step(
          "Darlene earns $1,400 in 7 days. How much each day?",
          "1,400 ÷ 7",
          "dollars",
        ),
        step(
          "Kyle scores 4,500 points in 9 levels. How many in each level?",
          "4,500 ÷ 9",
          "points",
        ),
        {
          type: "mc",
          q: "How are 20, 200 and 2,000 related?",
          opts: [
            "Each is 10 times the one before",
            "Each is 2 more than the one before",
            "They are all equal",
          ],
          vis: lines("20 × 10 = 200", "200 × 10 = 2,000"),
          x: "One more zero: [10 times] as much.",
        },
      ],
    },
  ],
};
