// Math · Grade 4 · Lesson 7-5 « Divide 4-Digit Dividends by 1-Digit Divisors » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 223–226, Student Practice Book p. 71–72. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Partial quotients come from shared/math-kit.js (partialQ: groups of 1,000, 100, 10 and ones; it throws if something is left).
const { partialQ, step } = MathKit;

window.LESSON = {
  n: "7-5",
  key: "math4-l7-5",
  grade: 4,
  title: "4-Digit ÷ 1-Digit",
  en: "Divide a 4-digit number with partial quotients: groups of 1,000, 100, 10 and ones",
  unit: "Unit 7 · Lesson 7-5",
  book: "Book p. 223–226 · Practice Book p. 71–72",
  imgDir: "img/lesson-7-5",
  cover: "curious",
  question: {
    q: "How do I divide a [4-digit] number by a 1-digit number?",
    a: "Take away big easy groups first: 1,550 ÷ 5 → 5 × 100 three times (1,500), then 5 × 10 (50). 100 + 100 + 100 + 10 = [310].",
    img: "curious",
  },
  words: [
    {
      w: "Partial quotient",
      m: "one part of the answer: 100, 100, 100 and 10 in 1,550 ÷ 5",
    },
    {
      w: "Area model",
      m: "a rectangle: the divisor on the side, the dividend inside",
    },
    { w: "Dividend", m: "the number you divide: 1,550" },
    { w: "Divisor", m: "the number you divide by: 5" },
    { w: "Quotient", m: "the answer: 310" },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🟧",
      img: "curious",
      lines: [
        "Both rectangles are 4 by [42]: 168 inside.",
        "One is cut into 10 + 10 + 10 + 10 + 2, the other into 40 + 2.",
        "Different parts, the [same] total.",
      ],
    },
    {
      t: "Golf balls in boxes",
      ic: "⛳",
      lines: [
        "1,550 golf balls, 5 in each box: 1,550 ÷ 5.",
        "Think: how many 5s are in 1,550?",
        "5 × 100 = 500. Three times: [1,500].",
      ],
      vis: {
        kind: "area",
        rows: [5],
        cols: [100, 100, 100, 10],
        cells: [500, 500, 500, 50],
      },
    },
    {
      t: "Add the partial quotients",
      ic: "➕",
      lines: [
        "1,550 − 1,500 = 50, and 50 = 5 × [10].",
        "100 + 100 + 100 + 10 = [310].",
        "The factory fills 310 boxes.",
      ],
      vis: {
        kind: "lines",
        rows: ["1,550 − 500 − 500 − 500 = 50", "50 − 50 = 0", "310"],
      },
    },
    {
      t: "Start with what fits",
      ic: "⚠️",
      lines: [
        "1,962 ÷ 9: can we start with 1,000? 9 × 1,000 = [9,000]: too much!",
        "Start with 100: 9 × 100 = 900.",
        "The first partial quotient must [fit] in the dividend.",
      ],
      vis: {
        kind: "lines",
        rows: ["9 × 1,000 = 9,000 > 1,962", "9 × 200 = 1,800 ≤ 1,962"],
      },
    },
  ],

  games: [
    {
      k: "chunks",
      t: "Big groups first",
      en: "Partial quotients",
      ic: "🧱",
      keep: true,
      items: [...partialQ(3612, 3), ...partialQ(2475, 5)],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 223–226",
      t: "Be Curious",
      en: "Two area models",
      ic: "🟧",
      from: "Book p. 223 · Be Curious",
      keep: true,
      items: [
        step(
          "Both rectangles are 4 by 42. What is the total inside?",
          "4 × 42",
          "",
          { img: "curious", vis: undefined },
        ),
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Same: both are 4 × 42 = 168. Different: the top one is cut into four 10s and a 2 (40 + 40 + 40 + 40 + 8), the bottom one into 40 and 2 (160 + 8).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 223–226",
      t: "Learn: golf balls",
      en: "1,550 ÷ 5",
      ic: "⛳",
      from: "Book p. 224 · Learn",
      keep: true,
      items: partialQ(
        1550,
        5,
        [100, 100, 100, 10],
        "1,550 golf balls, 5 in each box. b = 1,550 ÷ 5.",
      ),
    },
    {
      k: "together",
      g: "📗 Book · p. 223–226",
      t: "Work Together",
      en: "4,564 ÷ 4",
      ic: "🤝",
      from: "Book p. 224 · Work Together",
      keep: true,
      items: partialQ(4564, 4),
    },
    {
      k: "own1",
      g: "📗 Book · p. 223–226",
      t: "On My Own 1–6",
      en: "What is the quotient?",
      ic: "➗",
      from: "Book p. 225 · On My Own 1–6",
      keep: true,
      items: [
        ...partialQ(2200, 2, [1000, 100]),
        ...partialQ(4840, 4, [1000, 100, 100, 10]),
        ...partialQ(9300, 3),
        ...partialQ(3240, 3),
        ...partialQ(3216, 2),
        ...partialQ(8350, 5),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 223–226",
      t: "On My Own 7–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 225–226 · On My Own 7–12",
      keep: true,
      items: [
        ...partialQ(
          1359,
          9,
          null,
          "1,359 students at 9 game stations, the same at each.",
        ),
        ...partialQ(
          2268,
          4,
          null,
          "2,268 inches of ribbon for 4 costumes, the same for each.",
        ),
        ...partialQ(
          5112,
          9,
          null,
          "5,112 gallons of milk in 9 days, the same each day.",
        ),
        ...partialQ(
          6834,
          3,
          null,
          "6,834 tickets in 3 weeks, the same each week.",
        ),
        {
          type: "tf",
          q: "Ralph says he can use 1,000 as the first partial quotient for 1,962 ÷ 9. Is he right?",
          a: false,
          yes: ["Yes, he is", "No, he is not"],
          vis: { kind: "lines", rows: ["9 × 1,000 = ?"] },
          x: "9 × 1,000 = 9,000: much more than [1,962]. He could start with 200 (9 × 200 = 1,800).",
        },
        {
          type: "multi",
          q: "You can use 100 as the first partial quotient for 2,316 ÷ 4. Which other first partial quotients could you use? Choose all.",
          opts: [500, 200, 50, 600, 1000].map((c) => ({
            t: String(c).replace(/\B(?=(\d{3})+$)/g, ","),
            ok: 4 * c <= 2316,
            emoji: "🔢",
          })),
        },
        {
          type: "open",
          q: "Reflect: How do you use partial quotients to divide a 4-digit number by a 1-digit number?",
          vis: {
            kind: "lines",
            rows: [
              "1,550 − 1,500 = 50 (300)",
              "50 − 50 = 0 (10)",
              "300 + 10 = 310",
            ],
          },
          // unverified: a model answer, the book gives none
          a: "Start with a big group that fits (1,000s or 100s of the divisor), subtract it, and keep going with 10s and ones until nothing is left. Then add the partial quotients.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 71–72",
      t: "Additional Practice 1–8",
      en: "Lesson 7-5",
      ic: "📘",
      from: "Practice Book p. 71–72",
      keep: true,
      items: [
        ...partialQ(2180, 5, null, "2,180 ÷ 5 = y."),
        ...partialQ(4936, 4, null, "4,936 ÷ 4 = z."),
        ...partialQ(5376, 3, null, "5,376 ÷ 3 = x."),
        ...partialQ(7389, 9, null, "7,389 ÷ 9 = w."),
        ...partialQ(
          1785,
          7,
          null,
          "Ansel read 7 books with 1,785 pages, the same in each.",
        ),
        ...partialQ(
          2225,
          5,
          null,
          "2,225 tickets for 5 performances, the same at each.",
        ),
        ...partialQ(
          4650,
          6,
          null,
          "4,650 pictures on 6 memory cards, the same on each.",
        ),
        {
          type: "tf",
          q: "Terry says 8,216 ÷ 8 has a 3-digit quotient. Is he right?",
          a: false,
          yes: ["Yes, he is", "No, he is not"],
          vis: { kind: "lines", rows: ["8 × 1,000 = 8,000 ≤ 8,216"] },
          x: "8 × 1,000 = 8,000 fits in 8,216, so the quotient is at least 1,000: 4 digits. 8,216 ÷ 8 = [1,027].",
        },
      ],
    },
  ],
};
