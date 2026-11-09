// Math · Grade 4 · Lesson 7-6 « Understand Remainders » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 227–230, Student Practice Book p. 73–74. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Partial quotients with a remainder come from shared/math-kit.js (partialQ with rem: true: the quotient, then the remainder).
const { partialQ } = MathKit;
const divR = (n, d, intro, chunks) =>
  partialQ(n, d, chunks || null, intro, true);
const lines = (...rows) => ({ kind: "lines", rows });

window.LESSON = {
  n: "7-6",
  key: "math4-l7-6",
  grade: 4,
  title: "Remainders",
  en: "When a number can't be divided evenly, what is left over is the remainder: 235 ÷ 8 = 29 R3",
  unit: "Unit 7 · Lesson 7-6",
  book: "Book p. 227–230 · Practice Book p. 73–74",
  imgDir: "img/lesson-7-6",
  cover: "curious",
  question: {
    q: "What is a [remainder]?",
    a: "What is left over when a number can't be shared evenly: 235 ÷ 8 → 8 × 29 = 232, and 3 are left. 235 ÷ 8 = [29 R3]. The remainder is always less than the divisor.",
    img: "bookcase",
  },
  words: [
    { w: "Remainder", m: "what is left over after dividing: 235 ÷ 8 = 29 R3" },
    { w: "R", m: "short for remainder: 29 R3" },
    { w: "Divide evenly", m: "nothing is left over: 24 ÷ 8 = 3" },
    { w: "Partial quotient", m: "one part of the answer: 20 and 9 in 235 ÷ 8" },
  ],
  ideas: [
    {
      t: "What could the question be?",
      ic: "🥕",
      img: "curious",
      lines: [
        "Four friends, four plates and a plate of carrots.",
        "A question: how many carrots does each friend get?",
        "And: will some carrots be [left over]?",
      ],
    },
    {
      t: "235 books on 8 shelves",
      ic: "📚",
      img: "bookcase",
      lines: [
        "Take away 8 × 20 = 160: 75 left.",
        "Take away 8 × 9 = 72: [3] left.",
        "3 is less than 8: we can't make another group of 8.",
      ],
    },
    {
      t: "Write the remainder",
      ic: "✍️",
      lines: [
        "20 + 9 = 29 books on each shelf.",
        "3 books are left over: the [remainder].",
        "235 ÷ 8 = [29 R3].",
      ],
      vis: lines("235 − 160 = 75 (20)", "75 − 72 = 3 (9)", "29 R3"),
    },
    {
      t: "Check",
      ic: "🔄",
      lines: [
        "8 × 29 = 232. 232 + 3 = [235].",
        "The remainder must be [less than] the divisor.",
        "A remainder of 8 or more means one more group fits.",
      ],
      vis: lines("8 × 29 + 3 = 235"),
    },
  ],

  games: [
    {
      k: "rem",
      t: "What is left?",
      en: "Quotient and remainder",
      ic: "🧮",
      keep: true,
      items: [...divR(53, 4), ...divR(127, 5), ...divR(250, 7)],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 227–230",
      t: "Be Curious",
      en: "Carrots for four",
      ic: "🥕",
      from: "Book p. 227 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: no key for this lesson; the carrots are not counted
          a: "How many carrots can each of the four friends get if they share them equally? Will there be any carrots left over?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 227–230",
      t: "Learn: books on shelves",
      en: "235 ÷ 8",
      ic: "📚",
      from: "Book p. 228 · Learn",
      keep: true,
      items: divR(235, 8, "235 books on 8 shelves, the same on each."),
    },
    {
      k: "together",
      g: "📗 Book · p. 227–230",
      t: "Work Together",
      en: "7,220 books, 6 each",
      ic: "🤝",
      from: "Book p. 228 · Work Together",
      keep: true,
      items: divR(
        7220,
        6,
        "7,220 books, 6 for each student. How many are left over?",
      ),
    },
    {
      k: "own1",
      g: "📗 Book · p. 227–230",
      t: "On My Own 1–7",
      en: "Quotient and remainder",
      ic: "➗",
      from: "Book p. 229 · On My Own 1–7",
      keep: true,
      items: [
        ...divR(415, 2, "415 ÷ 2.", [100, 100, 7]),
        ...divR(5044, 5, "5,044 ÷ 5.", [1000, 8]),
        ...divR(929, 3, "929 ÷ 3."),
        ...divR(119, 4, "119 ÷ 4."),
        ...divR(3225, 8, "3,225 ÷ 8."),
        ...divR(8254, 5, "8,254 ÷ 5."),
        ...divR(8437, 7, "8,437 ÷ 7."),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · p. 227–230",
      t: "On My Own 8–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 229–230 · On My Own 8–12",
      keep: true,
      items: [
        ...divR(
          609,
          9,
          "A restaurant has $609. A box of cups costs $9. How many boxes, and how much money is left?",
        ),
        ...divR(
          275,
          6,
          "275 balloons, 6 on each table. How many tables, and how many balloons are left?",
        ),
        ...divR(
          20,
          3,
          "George has $20. Snow cones cost $3 each. How many can he buy, and how much is left?",
        ),
        {
          type: "mc",
          q: "When you solve a division problem, how do you know you have a remainder?",
          opts: [
            "Something is left that is less than the divisor",
            "The quotient is a big number",
            "The divisor is odd",
          ],
          vis: lines("235 − 232 = 3", "3 < 8"),
          x: "If what is left is [less than the divisor] but not 0, it is the remainder.",
        },
        {
          type: "mc",
          q: "Why do 1,240 ÷ 2, 1,240 ÷ 5 and 1,240 ÷ 10 have no remainder?",
          opts: [
            "1,240 ends in 0: it is a multiple of 10, so of 2 and 5 too",
            "1,240 is a big number",
            "1,240 is odd",
          ],
          vis: lines("1,240 = 124 × 10", "10 = 2 × 5"),
          x: "A number that ends in [0] is a multiple of 10, and 10 = 2 × 5.",
        },
        {
          type: "open",
          q: "Reflect: How can you make sense of a remainder in a word problem?",
          img: "bookcase",
          // unverified: a model answer, the book gives none
          a: "The remainder is what is left over: books not on a shelf, money not spent. I read the question to know if I need the quotient, the remainder, or both.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 73–74",
      t: "Additional Practice 1–7",
      en: "Lesson 7-6",
      ic: "📘",
      from: "Practice Book p. 73–74",
      keep: true,
      items: [
        ...divR(451, 7, "451 ÷ 7 = p."),
        ...divR(839, 5, "839 ÷ 5 = s."),
        ...divR(2999, 9, "2,999 ÷ 9 = q."),
        ...divR(3736, 3, "3,736 ÷ 3 = r."),
        ...divR(
          112,
          5,
          "Ava has $112. A spool of ribbon costs $5. How many spools, and how much money is left?",
        ),
        ...divR(
          2608,
          9,
          "2,608 golf balls in 9 buckets, the same in each. How many in each, and how many left over?",
        ),
        {
          type: "mc",
          q: "Can there be a remainder when the dividend has 1 digit? 2 digits? More digits?",
          opts: ["Yes, in all three cases", "Only with 1 digit", "Never"],
          vis: lines("7 ÷ 2 = 3 R1", "25 ÷ 4 = 6 R1", "235 ÷ 8 = 29 R3"),
          x: "Any dividend can have a remainder if it is not a multiple of the divisor: [7 ÷ 2 = 3 R1].",
        },
      ],
    },
  ],
};
