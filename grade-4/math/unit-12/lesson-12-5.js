// Math · Grade 4 · Lesson 12-5 « Solve Problems Involving Money » (Reveal Math, Unit 12 « Decimal Fractions »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1046–k1085; On My Own 5 from the frame f07044),
// Practice Book p. 131–132 (pictures `pb1`, `pb2` cropped from the page). No teacher's key.
// On My Own 4 never loads in the video (in TODO.md). On My Own 3: the second one-dollar bill is half hidden behind the first.
// Log: grade-4/math/SOURCES.md.
const money = (q, a, img, x, more = {}) => ({
  type: "num",
  q,
  pre: "$",
  a,
  img,
  x,
  ...more,
});
// a money sum or difference written out
const calc = (q, expr, a, x, more = {}) => ({
  type: "num",
  q,
  pre: "$",
  a,
  vis: { kind: "lines", rows: [expr] },
  x,
  ...more,
});
// bills, dimes and pennies told in words
const count = (d, dimes, p) => {
  const a = Math.round((d + dimes / 10 + p / 100) * 100) / 100;
  return {
    type: "num",
    q: `${d} one-dollar bills, ${dimes} dimes and ${p} pennies. How much money is it?`,
    pre: "$",
    a,
    vis: {
      kind: "lines",
      rows: [`💵 × ${d}`, `🪙 dimes × ${dimes}`, `🟤 pennies × ${p}`],
    },
    x: `${d} + ${(dimes / 10).toFixed(2)} + ${(p / 100).toFixed(2)} = [${a.toFixed(2)}]: dollars are the ones, dimes the tenths, pennies the hundredths.`,
  };
};

window.LESSON = {
  n: "12-5",
  key: "math4-l12-5",
  grade: 4,
  title: "Problems with Money",
  en: "Dollars, dimes and pennies as decimals: add, subtract, compare",
  unit: "Unit 12 · Lesson 12-5",
  book: "e-book Lesson 12-5 · Practice Book p. 131–132",
  imgDir: "img/lesson-12-5",
  cover: "curious",
  question: {
    q: "How did you use your understanding of [tenths and hundredths] to solve problems in this lesson?",
    // unverified: a model answer, the book gives none
    a: "A dime is a tenth of a dollar and a penny is a hundredth. Dollars go in the ones place, dimes in the tenths, pennies in the hundredths: $6.85.",
    img: "curious",
  },
  words: [
    { w: "Dollar", m: "$1.00: the ones place" },
    { w: "Dime", m: "$0.10: one tenth of a dollar" },
    { w: "Penny (cent)", m: "$0.01: one hundredth of a dollar" },
    { w: "Quarter", m: "$0.25: 25 cents" },
  ],
  ideas: [
    {
      t: "Hannah's lunch",
      ic: "🥪",
      img: "curious",
      lines: [
        "Hannah buys a sandwich ($5.60) and a yogurt ($1.25).",
        "How much money did she spend?",
      ],
    },
    {
      t: "Bills and coins",
      ic: "💵",
      lines: [
        "Bills: $5 + $1 = [$6.00].",
        "Dimes: 8 dimes = [$0.80]. Pennies: 5 pennies = [$0.05].",
      ],
      vis: {
        kind: "lines",
        rows: ["$5.60 = $5 + 6 dimes", "$1.25 = $1 + 2 dimes + 5 pennies"],
      },
    },
    {
      t: "Place value",
      ic: "🔢",
      lines: [
        "Dollars are the [ones], dimes the [tenths], pennies the [hundredths].",
        "6 ones, 8 tenths, 5 hundredths: Hannah spent [$6.85].",
      ],
      vis: { kind: "lines", rows: ["ones | tenths | hundredths", "6 . 8 5"] },
    },
    {
      t: "Money left",
      ic: "➖",
      lines: [
        "Tony has $4.82. A notebook costs $2.50.",
        "$4.82 − $2.50 = [$2.32] left.",
      ],
      vis: { kind: "lines", rows: ["$4.82 − $2.50 = $2.32"] },
    },
  ],

  games: [
    {
      k: "count",
      t: "Count the money",
      en: "Dollars, dimes, pennies",
      ic: "💵",
      items: [
        [2, 3, 4],
        [5, 1, 8],
        [3, 7, 0],
        [1, 0, 9],
        [4, 5, 5],
        [6, 2, 3],
      ].map(([d, t, p]) => count(d, t, p)),
    },
    {
      k: "add",
      t: "Add and subtract",
      en: "Prices and change",
      ic: "🧾",
      items: [
        calc(
          "How much in all?",
          "$2.35 + $1.40",
          3.75,
          "2.35 + 1.40 = [3.75].",
        ),
        calc(
          "How much in all?",
          "$4.60 + $3.25",
          7.85,
          "4.60 + 3.25 = [7.85].",
        ),
        calc(
          "How much is left?",
          "$5.00 − $1.75",
          3.25,
          "5.00 − 1.75 = [3.25].",
        ),
        calc(
          "How much is left?",
          "$9.48 − $6.20",
          3.28,
          "9.48 − 6.20 = [3.28].",
        ),
        calc(
          "How much in all?",
          "$0.85 + $0.50",
          1.35,
          "0.85 + 0.50 = [1.35].",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 12-5",
      t: "Be Curious",
      en: "A menu",
      ic: "🍽️",
      from: "e-book 12-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: the book takes any question
          a: "How much do a sandwich and an apple cost together? ($1.05 + $0.45 = $1.50.) How much more is the salmon than the chicken breast?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 12-5",
      t: "Learn and Work Together",
      en: "Hannah's lunch, Tony's notebook",
      ic: "🥪",
      from: "e-book 12-5 · Learn, Work Together",
      keep: true,
      items: [
        calc(
          "Hannah buys a sandwich for $5.60 and a yogurt for $1.25. How much money did she spend?",
          "$5.60 + $1.25",
          6.85,
          "Bills $6.00, dimes $0.80, pennies $0.05: 5.60 + 1.25 = [6.85].",
        ),
        {
          type: "open",
          q: "In My World: What is another way to represent the same cost ($6.85)?",
          vis: { kind: "lines", rows: ["$6.85"] },
          // unverified: a model answer, the book gives any
          a: "6 one-dollar bills, 8 dimes and 5 pennies; or a five-dollar bill, a one-dollar bill, 3 quarters, 1 dime and 5 pennies.",
        },
        calc(
          "Work Together: Tony has $4.82. He buys a notebook for $2.50. How much money does he have left?",
          "$4.82 − $2.50",
          2.32,
          "4.82 − 2.50 = [2.32].",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 12-5",
      t: "On My Own 1–7",
      en: "Count, add, take away",
      ic: "💵",
      from: "e-book 12-5 · On My Own 1–3, 5–7",
      keep: true,
      items: [
        money(
          "What decimal represents the total amount of money?",
          1.24,
          "m1",
          "1 dollar, 2 dimes, 4 pennies: 1 + 0.20 + 0.04 = [1.24].",
        ),
        money(
          "What decimal represents the total amount of money?",
          5.33,
          "m2",
          "5 dollars, 3 dimes, 3 pennies: 5 + 0.30 + 0.03 = [5.33].",
        ),
        money(
          "What decimal represents the total amount of money?",
          7.46,
          "m3",
          // unverified: the second one-dollar bill is half hidden behind the first
          "5 + 2 dollars, 4 dimes, 6 pennies: 7 + 0.40 + 0.06 = [7.46].",
        ),
        money(
          "Marnie has the amount shown. Her mom gives her a one-dollar bill and 2 dimes. How much money does Marnie have now?",
          6.82,
          "m5",
          "She has 5 + 0.60 + 0.02 = 5.62. 5.62 + 1.20 = [6.82].",
        ),
        money(
          "John has the amount shown. He spends $1.25. How much money does John have now?",
          1.23,
          "m6",
          "He has 2 + 0.40 + 0.08 = 2.48. 2.48 − 1.25 = [1.23].",
        ),
        {
          type: "tf",
          q: "Sergio wants a snack for $1.75. He has a one-dollar bill, 6 dimes and 7 pennies. Does he have enough money?",
          a: false,
          yes: ["Yes, he does", "No, he doesn't"],
          vis: {
            kind: "lines",
            rows: ["$1 + 6 dimes + 7 pennies", "snack: $1.75"],
          },
          x: "1 + 0.60 + 0.07 = 1.67. $1.67 is less than $1.75: not enough.",
        },
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 12-5",
      t: "On My Own 8–12",
      en: "Pizza, Sally and Earl, Sarah, Mia",
      ic: "🍕",
      from: "e-book 12-5 · On My Own 8–12",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Pizza is $0.80 for 1 piece. Roger buys 2 pieces and hands the cashier $2.00. What coins could Roger receive back in change?",
          opts: ["4 dimes", "8 dimes", "2 dimes", "4 pennies"],
          emoji: "🍕",
          // unverified: the book takes any coins that make $0.40
          x: "2 × 0.80 = 1.60. The change is 2.00 − 1.60 = 0.40 dollars: for example 4 dimes.",
        },
        {
          type: "mc",
          q: "Sally has 9 one-dollar bills, 12 dimes and 5 pennies. Earl has a ten-dollar bill, 1 dime and 5 pennies. Who has more money?",
          opts: ["Sally", "Earl", "They have the same"],
          vis: {
            kind: "lines",
            rows: [
              "Sally: $9 + 12 dimes + 5 pennies",
              "Earl: $10 + 1 dime + 5 pennies",
            ],
          },
          x: "Sally: 9 + 1.20 + 0.05 = 10.25. Earl: 10 + 0.10 + 0.05 = 10.15. Sally has more.",
        },
        {
          type: "mc",
          q: "Sarah spent exactly $8.00 on school supplies. What supplies could Sarah have bought?",
          opts: [
            "A calculator, a notebook, 2 folders and a pencil",
            "A calculator, 2 notebooks and a folder",
            "A calculator and 3 folders",
            "2 notebooks, 2 folders and 2 pencils",
          ],
          img: "supplies",
          // unverified: the book takes any set that costs $8.00
          x: "5.00 + 1.00 + 0.75 + 0.75 + 0.50 = 8.00. The others cost 7.75, 7.25 and 4.50.",
        },
        {
          type: "num",
          q: "Mia has 4 quarters and some dimes. She has $1.80. How many dimes does Mia have?",
          a: 8,
          post: "dimes",
          vis: { kind: "lines", rows: ["4 quarters + ? dimes = $1.80"] },
          x: "4 quarters = 1.00. 1.80 − 1.00 = 0.80 = [8] dimes.",
        },
        {
          type: "mc",
          q: "Extend: Which is a way to represent $7.75 using dollars, dimes and pennies?",
          opts: [
            "7 dollars, 7 dimes, 5 pennies",
            "7 dollars, 5 dimes, 7 pennies",
            "7 dollars, 75 dimes",
            "77 dimes, 5 pennies",
          ],
          vis: { kind: "lines", rows: ["$7.75"] },
          // unverified: the book asks for two ways; another: 7 dollars, 6 dimes, 15 pennies
          x: "7 + 0.70 + 0.05 = 7.75. Another way: 7 dollars, 6 dimes and 15 pennies.",
        },
        {
          type: "open",
          q: "Reflect: How did you use your understanding of tenths and hundredths to solve problems in this lesson?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "A dime is one tenth of a dollar and a penny is one hundredth. I wrote dollars, dimes and pennies as ones, tenths and hundredths, then added or subtracted the decimals.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 131–132",
      t: "Additional Practice 1–7",
      en: "Lesson 12-5",
      ic: "📘",
      from: "Practice Book p. 131–132",
      keep: true,
      items: [
        money(
          "What decimal represents the total amount of money?",
          3.22,
          "pb1",
          "3 dollars, 2 dimes, 2 pennies: 3 + 0.20 + 0.02 = [3.22].",
        ),
        money(
          "What decimal represents the total amount of money?",
          5.06,
          "pb2",
          "5 dollars and 6 pennies: 5 + 0.06 = [5.06].",
        ),
        {
          type: "tf",
          q: "Popcorn costs $3.75. Kevin has 3 one-dollar bills, 7 dimes and 10 pennies. Does he have enough money?",
          a: true,
          yes: ["Yes, he does", "No, he doesn't"],
          vis: {
            kind: "lines",
            rows: ["$3 + 7 dimes + 10 pennies", "popcorn: $3.75"],
          },
          x: "3 + 0.70 + 0.10 = 3.80. $3.80 is more than $3.75: enough.",
        },
        {
          type: "mc",
          q: "Evelyn has 4 one-dollar bills, 15 dimes and 8 pennies. Sandra has a five-dollar bill, 6 dimes and 12 pennies. Who has more money?",
          opts: ["Sandra", "Evelyn", "They have the same"],
          vis: {
            kind: "lines",
            rows: [
              "Evelyn: $4 + 15 dimes + 8 pennies",
              "Sandra: $5 + 6 dimes + 12 pennies",
            ],
          },
          x: "Evelyn: 4 + 1.50 + 0.08 = 5.58. Sandra: 5 + 0.60 + 0.12 = 5.72. Sandra has more.",
        },
        {
          type: "num",
          q: "Jenelle has 6 quarters and some dimes. She has $1.90. How many dimes does she have?",
          a: 4,
          post: "dimes",
          vis: { kind: "lines", rows: ["6 quarters + ? dimes = $1.90"] },
          x: "6 quarters = 1.50. 1.90 − 1.50 = 0.40 = [4] dimes.",
        },
        {
          type: "multi",
          q: "Brian has $9.00 to spend on lunch. Which two menu items could he order? Choose all that fit.",
          vis: {
            kind: "lines",
            rows: [
              "Chicken sandwich $4.50",
              "Grilled cheese $3.27",
              "Chicken tenders $5.38",
              "Fruit plate $2.95",
            ],
          },
          opts: [
            ["Chicken sandwich and grilled cheese", true],
            ["Chicken sandwich and chicken tenders", false],
            ["Chicken sandwich and fruit plate", true],
            ["Grilled cheese and chicken tenders", true],
            ["Grilled cheese and fruit plate", true],
            ["Chicken tenders and fruit plate", true],
          ].map(([t, ok]) => ({ t, ok, emoji: "🍽️" })),
          // unverified: the book asks for one pair
          x: "4.50 + 5.38 = 9.88 is more than 9.00. All the other pairs cost $9.00 or less.",
        },
        calc(
          "Marco has $5.67. His art supplies cost $5.13. How much money does Marco have left?",
          "$5.67 − $5.13",
          0.54,
          "5.67 − 5.13 = [0.54].",
        ),
      ],
    },
  ],
};
