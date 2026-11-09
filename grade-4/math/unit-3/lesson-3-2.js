// Math · Grade 4 · Lesson 3-2 « Strategies to Add Multi-Digit Numbers » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 65–68, Student Practice Book p. 11–12. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Partial sums and adjusting come from shared/math-kit.js (partials, adjust); the sums are column sums (col) worked out by shared/math.js.
const { fmt, col, partials, adjust } = MathKit;

window.LESSON = {
  n: "3-2",
  key: "math4-l3-2",
  grade: 4,
  title: "Ways to Add Big Numbers",
  en: "Add with partial sums, by adjusting the numbers, and in columns",
  unit: "Unit 3 · Lesson 3-2",
  book: "Book p. 65–68 · Practice Book p. 11–12",
  imgDir: "img/lesson-3-2",
  cover: "curious",
  question: {
    q: "What [strategies] can I use to add big numbers?",
    a: "[Partial sums]: add each place, then add the parts (10 + 100 + 800 + 2,000 = 2,910). Or [adjust]: 1,613 + 1,297 = 1,610 + 1,300 = 2,910.",
    img: "curious",
  },
  words: [
    { w: "Add", m: "put together: 1,613 + 1,297 = 2,910" },
    { w: "Sum", m: "the answer of an addition" },
    { w: "Addend", m: "a number we add: 1,613 and 1,297" },
    {
      w: "Partial sums",
      m: "add the ones, the tens, the hundreds … then add these parts",
    },
    {
      w: "Adjust",
      m: "change the numbers to easy ones: +3 to one, −3 to the other",
    },
    { w: "Strategy", m: "a way to solve a problem" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🚜",
      img: "curious",
      lines: [
        "Two vehicles on a trailer: [1,297] pounds and [1,613] pounds.",
        "The trailer can carry [3,000] pounds.",
        "Can it carry both? We [add] to find out.",
      ],
    },
    {
      t: "Partial sums",
      ic: "🧩",
      lines: [
        "Add each place: ones 3 + 7 = [10], tens 10 + 90 = [100],",
        "hundreds 600 + 200 = [800], thousands 1,000 + 1,000 = [2,000].",
        "Add the parts: 10 + 100 + 800 + 2,000 = [2,910].",
      ],
      vis: { kind: "lines", rows: ["10", "100", "800", "2,000", "2,910"] },
    },
    {
      t: "Adjust the numbers",
      ic: "🔧",
      lines: [
        "1,297 is close to 1,300: give it [3].",
        "Take the same 3 from 1,613: 1,610.",
        "1,610 + 1,300 = [2,910]. Easy!",
      ],
      vis: {
        kind: "lines",
        rows: [
          "1,613 − 3 → 1,610",
          "1,297 + 3 → 1,300",
          "1,610 + 1,300 = 2,910",
        ],
      },
    },
    {
      t: "Can the trailer carry both?",
      ic: "✅",
      lines: [
        "Both vehicles weigh [2,910] pounds.",
        "2,910 < 3,000.",
        "Yes, they can be loaded [safely].",
      ],
      vis: { kind: "colshow", op: "+", a: 1613, b: 1297 },
    },
    {
      t: "Line up the places",
      ic: "📏",
      lines: [
        "Ones under ones, tens under tens …",
        "Macy added 300 + 700 and wrote 100: it is [1,000]!",
        "Check each place: 5,331 + 2,702 = [8,033].",
      ],
      vis: { kind: "colshow", op: "+", a: 5331, b: 2702 },
    },
  ],

  games: [
    {
      k: "partial",
      t: "Partial sums",
      en: "One place at a time",
      ic: "🧩",
      items: [...partials(2346, 1528), ...partials(4071, 3856)],
    },
    {
      k: "adjust",
      t: "Make it round",
      en: "Adjust and add",
      ic: "🔧",
      items: [
        [2415, 1998],
        [3507, 2496],
        [6230, 1799],
        [4128, 3995],
        [5361, 2697],
        [1854, 4990],
      ].map(([a, b]) => adjust(a, b, b % 1000 > 900 ? 3 : 2)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 65–68",
      t: "Be Curious",
      en: "What do you notice?",
      ic: "🚜",
      from: "Book p. 65 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Two vehicles are on a trailer: one weighs 1,297 pounds, the other 1,613 pounds. I wonder how much they weigh together, and if the trailer can carry them both.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 65–68",
      t: "Learn: the trailer",
      en: "1,613 + 1,297",
      ic: "🧩",
      from: "Book p. 66 · Learn",
      keep: true,
      items: [
        ...partials(1613, 1297),
        adjust(1613, 1297),
        {
          type: "tf",
          q: "The trailer can carry 3,000 pounds. Can both vehicles (2,910 pounds) be loaded safely?",
          a: true,
          yes: ["Yes, they can", "No, they can't"],
          img: "curious",
          x: "2,910 is [less than] 3,000.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 65–68",
      t: "Work Together",
      en: "Vehicles and trailer",
      ic: "🤝",
      from: "Book p. 66 · Work Together",
      keep: true,
      items: [
        col(
          2910,
          "+",
          1550,
          "The vehicles weigh 2,910 pounds, the trailer 1,550 pounds. What is the total weight?",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 65–68",
      t: "On My Own 1–7",
      en: "What is the sum?",
      ic: "➕",
      from: "Book p. 67 · On My Own 1–7",
      keep: true,
      items: [
        [2582, 493],
        [476, 8719],
        [1945, 3289],
        [12017, 5308],
        [26118, 11043],
        [47621, 21345],
        [101253, 27285],
      ].map(([a, b]) => col(a, "+", b)),
    },
    {
      k: "own8",
      g: "📗 Book · p. 65–68",
      t: "On My Own 8–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 67–68 · On My Own 8–12",
      keep: true,
      items: [
        col(
          10242,
          "+",
          11495,
          "A water park had 10,242 visitors in January and 11,495 in February. What was the total?",
        ),
        {
          type: "mc",
          q: "A book bank collected 13,962 books last year and 15,185 this year. Next year it expects the same as this year. About how many books in all three years?",
          opts: ["About 44,000", "About 29,000", "About 30,000"],
          vis: {
            kind: "lines",
            rows: ["13,962 → 14,000", "15,185 → 15,000", "15,185 → 15,000"],
          },
          // unverified: no key; an estimate (the exact total is 44,332)
          x: "14,000 + 15,000 + 15,000 = [44,000]. The exact total is 44,332.",
        },
        adjust(11864, 9599),
        {
          type: "mc",
          q: "Macy added 5,331 + 2,702 with partial sums: 3, 30, 100, 7,000 and got 7,133. What was her mistake?",
          opts: [
            "Hundreds: 300 + 700 is 1,000, not 100",
            "Ones: 1 + 2 is not 3",
            "Thousands: 5,000 + 2,000 is 8,000",
          ],
          vis: { kind: "lines", rows: ["3", "30", "100 ?", "7,000"] },
          x: "300 + 700 = [1,000]. The partial sums are 3, 30, 1,000, 7,000.",
        },
        {
          type: "num",
          q: "What is the correct sum of 5,331 + 2,702?",
          a: 8033,
          vis: { kind: "lines", rows: ["3 + 30 + 1,000 + 7,000"] },
          x: "3 + 30 + 1,000 + 7,000 = [8,033]",
        },
        // the book prints "Stellar Sea Lion": the animal is the Steller sea lion
        col(
          1026,
          "+",
          395,
          "A Steller sea lion weighs 1,026 kg and a California sea lion 395 kg. What is the total weight?",
        ),
        {
          type: "open",
          q: "Reflect: How did you decide which strategy to use to find each sum?",
          vis: { kind: "lines", rows: ["1,613 + 1,297", "1,610 + 1,300"] },
          // unverified: a model answer, the book gives none
          a: "When a number is close to a round number (like 1,297 or 9,599) I adjust it. Otherwise I use partial sums or add in columns, place by place.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 11–12",
      t: "Additional Practice 1–8",
      en: "Lesson 3-2",
      ic: "📘",
      from: "Practice Book p. 11–12",
      keep: true,
      items: [
        ...[
          [547, 3213],
          [11372, 6284],
          [2865, 1925],
          [375, 6242],
          [124326, 34574],
        ].map(([a, b]) => col(a, "+", b)),
        col(
          1933,
          "+",
          1506,
          "An arcade had 1,933 visitors in March and 1,506 in April. How many in all?",
        ),
        col(
          11214,
          "+",
          12587,
          "A school raised $11,214 last year and $12,587 this year. What is the total?",
        ),
        // the book prints "The male elephant weights": "weighs"
        col(
          15117,
          "+",
          13945,
          "The male elephant weighs 15,117 pounds, the female 13,945 pounds. What is their combined weight?",
        ),
      ],
    },
  ],
};
