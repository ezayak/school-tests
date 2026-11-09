// Math · Grade 4 · Lesson 7-2 « Estimate Quotients » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 211–214, Student Practice Book p. 65–66. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Compatible numbers (a basic fact with zeros, the closest to the dividend) and ranges come from shared/math-kit.js (estDiv, rangeDiv).
const { estDiv, rangeDiv, step } = MathKit;
const lines = (...rows) => ({ kind: "lines", rows });

window.LESSON = {
  n: "7-2",
  key: "math4-l7-2",
  grade: 4,
  title: "Estimate Quotients",
  en: "Use compatible numbers (a basic fact with zeros) to estimate a quotient or a range",
  unit: "Unit 7 · Lesson 7-2",
  book: "Book p. 211–214 · Practice Book p. 65–66",
  imgDir: "img/lesson-7-2",
  cover: "curious",
  question: {
    q: "How can [compatible numbers] help me estimate a quotient?",
    a: "Change the dividend to a close number that uses a basic fact: 3,358 ÷ 7 ≈ 3,500 ÷ 7 = [500]. 2,800 ÷ 7 = 400 and 3,500 ÷ 7 = 500 give a [range].",
    img: "nuts-bolts",
  },
  words: [
    { w: "Estimate", m: "find about how much: 3,358 ÷ 7 is about 500" },
    {
      w: "Compatible numbers",
      m: "numbers that are easy to divide: 3,500 ÷ 7 (35 ÷ 7 = 5)",
    },
    { w: "Range", m: "between two numbers: between 400 and 500" },
    { w: "Quotient", m: "the answer of a division" },
    { w: "Dividend", m: "the number you divide" },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🔢",
      img: "curious",
      lines: [
        "25 ÷ 5 = 5, 250 ÷ 5 = 50, 2,500 ÷ 5 = 500.",
        "They all use the basic fact [25 ÷ 5 = 5].",
        "Different: more zeros in the dividend, more zeros in the quotient.",
      ],
    },
    {
      t: "Bolts in 7 boxes",
      ic: "🔩",
      img: "nuts-bolts",
      lines: [
        "3,358 bolts in 7 boxes: 3,358 ÷ 7.",
        "3,358 is between 2,800 and 3,500 (28 ÷ 7, 35 ÷ 7).",
        "2,800 ÷ 7 = 400, 3,500 ÷ 7 = 500: a [range] of 400 to 500.",
      ],
    },
    {
      t: "Which end is closer?",
      ic: "🎯",
      lines: [
        "3,358 is closer to 3,500 than to 2,800.",
        "So the quotient is closer to [500].",
        "About 500 bolts in each box.",
      ],
      vis: { kind: "nline", lo: 2800, hi: 3500, n: 3358 },
    },
    {
      t: "Choose a basic fact",
      ic: "🧠",
      lines: [
        "342 ÷ 8: think of 8 × ? close to 34 → 8 × 4 = [32].",
        "320 ÷ 8 = [40].",
        "So 342 ÷ 8 is about 40.",
      ],
      vis: lines("342 → 320", "320 ÷ 8 = 40"),
    },
  ],

  games: [
    {
      k: "estimate",
      t: "Estimate",
      en: "Compatible numbers",
      ic: "🎯",
      keep: true,
      items: [
        ...estDiv(463, 9),
        ...estDiv(2_712, 4),
        ...estDiv(551, 7),
        ...estDiv(4_890, 8),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 211–214",
      t: "Be Curious",
      en: "25 ÷ 5, 250 ÷ 5, 2,500 ÷ 5",
      ic: "🔢",
      from: "Book p. 211 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Same: they all use the basic fact 25 ÷ 5 = 5. Different: the dividends 25, 250, 2,500 have more zeros, and so do the quotients 5, 50, 500.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 211–214",
      t: "Learn: bolts in boxes",
      en: "A range for 3,358 ÷ 7",
      ic: "🔩",
      from: "Book p. 212 · Learn",
      keep: true,
      items: [
        ...rangeDiv(3358, 7, "3,358 bolts in 7 boxes."),
        {
          type: "mc",
          q: "Is the real quotient closer to 400 or to 500?",
          opts: ["500", "400"],
          two: true,
          vis: { kind: "nline", lo: 2800, hi: 3500, n: 3358 },
          x: "3,358 is closer to 3,500, so the quotient is closer to [500].",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 211–214",
      t: "Work Together",
      en: "561 nuts in 6 boxes",
      ic: "🤝",
      from: "Book p. 212 · Work Together",
      keep: true,
      items: estDiv(561, 6, "561 nuts in 6 boxes.", "nuts"),
    },
    {
      k: "own1",
      g: "📗 Book · p. 211–214",
      t: "On My Own 1–8",
      en: "Compatible numbers and ranges",
      ic: "🎯",
      from: "Book p. 213 · On My Own 1–8",
      keep: true,
      items: [
        ...estDiv(342, 8),
        ...estDiv(836, 9),
        ...estDiv(2134, 7),
        ...estDiv(5361, 6),
        ...rangeDiv(749, 8),
        ...rangeDiv(522, 7),
        ...rangeDiv(3297, 8),
        ...rangeDiv(6428, 9),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 211–214",
      t: "On My Own 9–15",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 213–214 · On My Own 9–15",
      keep: true,
      items: [
        ...estDiv(
          323,
          7,
          "323 cans, 7 in each bag. About how many bags?",
          "bags",
        ),
        ...estDiv(6128, 9, "6,128 points in 9 games.", "points"),
        ...estDiv(397, 5, "397 bowlers, about 5 for each lane.", "lanes"),
        ...estDiv(776, 8, "776 sheets of plywood for 8 sites.", "sheets"),
        {
          type: "mc",
          q: "How can 24 ÷ 3 help you estimate 238 ÷ 3?",
          opts: [
            "238 is close to 240, and 240 ÷ 3 = 80",
            "238 is close to 24, so the answer is 8",
            "238 ÷ 3 = 24",
          ],
          vis: lines("24 ÷ 3 = 8", "240 ÷ 3 = 80"),
          x: "24 tens ÷ 3 = 8 tens: 240 ÷ 3 = 80, so 238 ÷ 3 is about [80].",
        },
        {
          type: "mc",
          q: "Louise says 4,219 ÷ 3 is between 1,000 and 2,000, because 4,219 is between 3,000 and 6,000. What do you say?",
          opts: [
            "She is right, but 4,200 ÷ 3 = 1,400 is a closer estimate",
            "She is wrong: it is about 140",
            "She is wrong: it is more than 2,000",
          ],
          vis: lines(
            "3,000 ÷ 3 = 1,000",
            "6,000 ÷ 3 = 2,000",
            "4,200 ÷ 3 = 1,400",
          ),
          // unverified: no key; the book asks for "other compatible numbers that would work better"
          x: "Her range is right but wide. 4,200 is very close to 4,219, and 42 ÷ 3 = 14: about [1,400].",
        },
        {
          type: "mc",
          q: "Estimate 34,219 ÷ 22 the same way.",
          opts: ["About 1,500 (33,000 ÷ 22)", "About 150", "About 15,000"],
          vis: lines("22 × 15 = 330", "33,000 ÷ 22 = ?"),
          // unverified: no key; a 2-digit divisor is beyond the lesson, 34,000 ÷ 20 = 1,700 is also an estimate
          x: "22 × 15 = 330, so 33,000 ÷ 22 = [1,500]. The exact quotient is about 1,555.",
        },
        {
          type: "open",
          q: "Reflect: How did you choose the compatible numbers when estimating quotients?",
          vis: lines("342 → 320", "8 × 4 = 32"),
          // unverified: a model answer, the book gives none
          a: "I looked for a basic fact with the divisor that is close to the first digits of the dividend (8 × 4 = 32 for 342), and added the zeros: 320 ÷ 8 = 40.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 65–66",
      t: "Additional Practice 1–7",
      en: "Lesson 7-2",
      ic: "📘",
      from: "Practice Book p. 65–66",
      keep: true,
      items: [
        ...estDiv(501, 7),
        ...estDiv(714, 8),
        ...estDiv(1465, 5),
        ...estDiv(1928, 6),
        ...estDiv(3940, 10),
        ...estDiv(372, 9),
        ...estDiv(272, 4, "272 notebooks, 4 for each student.", "students"),
        ...estDiv(496, 8, "496 players, 8 on each team.", "teams"),
        ...estDiv(3708, 6, "3,708 points in 6 rounds.", "points"),
        step(
          "Adam estimates 2,336 ÷ 8 with 2,400 ÷ 8. What is his estimate?",
          "2,400 ÷ 8",
          "",
        ),
        step("Kaley uses 1,600 ÷ 8. What is her estimate?", "1,600 ÷ 8", ""),
        {
          type: "mc",
          q: "Whose estimate is closer to the exact quotient of 2,336 ÷ 8?",
          opts: ["Adam's", "Kaley's"],
          two: true,
          vis: { kind: "nline", lo: 1600, hi: 2400, n: 2336 },
          x: "2,336 is much closer to [2,400] than to 1,600. (The exact quotient is 292.)",
        },
      ],
    },
  ],
};
