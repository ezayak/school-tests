// Math · Grade 4 · Lesson 2-1 « Understand the Structure of Multi-Digit Numbers » (Reveal Math, Unit 2).
// Sources: Student Edition Vol. 1 p. 33–36 (Be Curious, Learn, Work Together, On My Own 1–12, Reflect),
// Student Practice Book p. 1–2 (Additional Practice 1–5). Log: grade-4/math/SOURCES.md.
// Drawings: pv (place-value chart, hl = places from the right: 0 ones, 1 tens, 2 hundreds …), digits (the book's underlined digits), lines.
const fmt = (n) => n.toLocaleString("en-US");
const PLACE = [
  "ones",
  "tens",
  "hundreds",
  "thousands",
  "ten thousands",
  "hundred thousands",
  "millions",
];
const digitAt = (n, j) => Math.floor(n / 10 ** j) % 10;
// "What is the value of the 4 in 1,489?" with the digit yellow in the chart
const value = (n, j) => ({
  type: "num",
  q: `${fmt(n)}: what is the value of the yellow ${digitAt(n, j)}?`,
  a: digitAt(n, j) * 10 ** j,
  vis: { kind: "pv", n, hl: [j] },
  x: `The ${digitAt(n, j)} is in the [${PLACE[j]}] place.`,
});
// two marked digits (in one number or in two numbers): how do their values compare? (the bigger value is 10 times the other)
const compare = (q, rows, big, small, why) => ({
  type: "mc",
  q,
  opts: [
    `${fmt(big)} is 10 times ${fmt(small)}`,
    `${fmt(small)} is 10 times ${fmt(big)}`,
    "They have the same value",
    `${fmt(big)} is 100 times ${fmt(small)}`,
  ],
  vis: { kind: "digits", rows },
  x: why,
});
// the greatest and the least number with these digits
const digitsEmoji = (ds) => ds.join(" · ");
const greatest = (ds) => Number([...ds].sort((a, b) => b - a).join(""));
const least = (ds) => {
  const s = [...ds].sort((a, b) => a - b);
  const k = s.findIndex((d) => d > 0); // 0 can't be first
  return Number([s[k], ...s.slice(0, k), ...s.slice(k + 1)].join(""));
};
const gl = (ds) => [
  {
    type: "num",
    q: `The greatest number with the digits ${digitsEmoji(ds)} (each one once):`,
    a: greatest(ds),
    emoji: "🔢",
    x: "The [biggest] digit first, then the next biggest …",
  },
  {
    type: "num",
    q: `The least number with the digits ${digitsEmoji(ds)} (0 can't be first):`,
    a: least(ds),
    emoji: "🔢",
    x: ds.includes(0)
      ? "The smallest digit that is [not 0] first, then 0, then the others from small to big."
      : "The [smallest] digit first, then the next smallest …",
  },
];

window.LESSON = {
  n: "2-1",
  key: "math4-l2-1",
  grade: 4,
  title: "The Structure of Big Numbers",
  unit: "Unit 2 · Lesson 2-1",
  book: "Book p. 33–36 · Practice Book p. 1–2",
  imgDir: "img/lesson-2-1",
  cover: "curious",
  question: {
    q: "How can [place value] help me find the [value] of a digit?",
    a: "The [place] of a digit tells its value. In 8,888 every 8 is worth something different: [8,000], [800], [80], [8]. One place to the left = [10 times] more.",
    img: "akira",
  },
  words: [
    { w: "Digit", m: "one of the signs 0 1 2 3 4 5 6 7 8 9" },
    { w: "Place", m: "where a digit is: ones, tens, hundreds, thousands …" },
    { w: "Value", m: "what a digit is worth: in 380 the 3 is worth 300" },
    { w: "Place-value chart", m: "a table with one column for each place" },
    { w: "Expanded form", m: "the values added: 8,888 = 8,000 + 800 + 80 + 8" },
    { w: "10 times", m: "10 groups of it: 10 times 80 is 800" },
  ],
  ideas: [
    {
      t: "Which doesn't belong?",
      ic: "🤔",
      img: "curious",
      lines: [
        "Look at the 4 numbers. One is [different]. Which one?",
        "11,808 has [5] digits. The others have 3 or 4 digits.",
        "There are more answers: 1,389 is the only [odd] number.",
      ],
    },
    {
      t: "Same digit, different value",
      ic: "8️⃣",
      lines: [
        "Akira says: “All the digits of 8,888 are 8, so they have the [same value].”",
        "Is he right? [No]!",
        "Each 8 is in a different [place], so each 8 is worth something different.",
      ],
      vis: { kind: "pv", n: 8888 },
    },
    {
      t: "Expanded form shows the values",
      ic: "➕",
      lines: [
        "Write 8,888 in [expanded form]: 8,000 + 800 + 80 + 8.",
        "The first 8 is worth [8,000]. The last 8 is worth only [8].",
        "The place gives the value.",
      ],
      vis: { kind: "pv", n: 8888, hl: [3, 2, 1, 0], val: true },
    },
    {
      t: "One place left = 10 times",
      ic: "🔟",
      img: "akira",
      lines: [
        "80 = 8 × 10. 800 = 80 × 10. 8,000 = 800 × 10.",
        "Each 8 is [10 times] the 8 on its right.",
        "A digit in one place is [10 times] what it is in the place to its right.",
      ],
    },
    {
      t: "Two places apart = 100 times",
      ic: "💯",
      lines: [
        "3,830: the first 3 is in the thousands: [3,000].",
        "The other 3 is in the tens: [30].",
        "They are 2 places apart: 10 × 10 = [100 times]. 3,000 = 100 × 30.",
      ],
      vis: { kind: "pv", n: 3830, hl: [3, 1], val: true },
    },
    {
      t: "The place-value chart",
      ic: "📊",
      lines: [
        "68: the 6 is in the [tens] place: 60.",
        "680: the 6 moved one place left, to the [hundreds]: 600.",
        "600 is [10 times] 60.",
      ],
      vis: {
        kind: "digits",
        rows: [
          { n: 68, hl: [1], t: "→ 60" },
          { n: 680, hl: [2], t: "→ 600" },
        ],
        cap: "600 = [10 times] 60",
      },
    },
    {
      t: "The greatest and the least number",
      ic: "🔢",
      lines: [
        "Digits 3, 5, 8, 9. Greatest: [biggest digit first]: 9,853.",
        "Least: [smallest digit first]: 3,589.",
        "A 0 can't be first: 7, 1, 0, 6, 4 → least is [10,467].",
      ],
      vis: { kind: "lines", rows: ["9,853", "3,589"] },
    },
  ],

  games: [
    {
      k: "value",
      t: "Value of a digit",
      en: "Look at the yellow digit",
      ic: "💎",
      // the number in the Unit 2 family letter (Practice Book, before p. 1)
      items: [6, 5, 4, 3, 2, 1, 0].map((j) => value(4695132, j)),
    },
    {
      k: "times",
      t: "10 or 100 times?",
      en: "Compare two yellow digits",
      ic: "🔟",
      items: [
        [5550, 2, 1],
        [7070, 3, 1],
        [44312, 4, 3],
        [606, 2, 0],
        [9009, 3, 0],
        [233, 1, 0],
        [121, 2, 0],
        [66084, 4, 3],
      ].map(([n, a, b]) => {
        const t = ["10 times", "100 times", "1,000 times"][a - b - 1];
        const va = digitAt(n, a) * 10 ** a,
          vb = digitAt(n, b) * 10 ** b;
        return {
          type: "mc",
          q: `${fmt(n)}: the left yellow ${digitAt(n, a)} is worth ___ the right one.`,
          opts: [
            t,
            ...["10 times", "100 times", "1,000 times"].filter((o) => o !== t),
          ],
          keep: ["10 times", "100 times", "1,000 times"],
          vis: { kind: "pv", n, hl: [a, b], val: true },
          x: `${fmt(va)} = ${t.replace(" times", "")} × ${fmt(vb)}: ${a - b === 1 ? "one place apart" : `${a - b} places apart`}.`,
        };
      }),
    },
    {
      k: "make",
      t: "Make a number",
      en: "The greatest and the least",
      ic: "🔢",
      items: [...gl([2, 7, 5, 1]), ...gl([6, 0, 3, 9]), ...gl([8, 4, 1, 0, 5])],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 33–36",
      t: "Be Curious",
      en: "Which doesn't belong?",
      ic: "🤔",
      from: "Book p. 33 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Which doesn't belong? 180 · 1,389 · 11,808 · 2,382",
          img: "curious",
          // unverified: the book gives no answer, more than one answer is right
          a: "11,808: it is the only number with 5 digits. (Also right: 180 is the only one with 3 digits; 1,389 is the only odd number.)",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 33–36",
      t: "Learn: Akira's number",
      en: "Do all the 8s have the same value?",
      ic: "8️⃣",
      from: "Book p. 34 · Learn",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Akira says: “All the digits of 8,888 are the same, so they all have the same value.” Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["8,888"] },
          x: "Each 8 is in a different [place]: 8,000 + 800 + 80 + 8.",
        },
        ...[3, 2, 1, 0].map((j) => value(8888, j)),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 33–36",
      t: "Work Together",
      en: "The two 3s in 3,830",
      ic: "🤝",
      from: "Book p. 34 · Work Together",
      keep: true,
      items: [
        value(3830, 3),
        value(3830, 1),
        {
          type: "mc",
          q: "3,830: the 3 in the thousands place is worth ___ the 3 in the tens place.",
          opts: ["100 times", "10 times", "the same as", "1,000 times"],
          vis: { kind: "pv", n: 3830, hl: [3, 1], val: true },
          x: "3,000 = 100 × 30. They are [2 places] apart: 10 × 10 = 100.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 33–36",
      t: "On My Own 1–2",
      en: "The values of the digits",
      ic: "💎",
      from: "Book p. 35 · On My Own 1–2",
      keep: true,
      items: [
        ...[3, 2, 1, 0].map((j) => value(1489, j)),
        ...[2, 1, 0, 3, 4].map((j) => value(98124, j)), // the book's order: 1, 2, 4, 8, 9
      ],
    },
    {
      k: "own3",
      g: "📗 Book · p. 33–36",
      t: "On My Own 3–6",
      en: "Compare the underlined digits",
      ic: "⚖️",
      from: "Book p. 35 · On My Own 3–6",
      keep: true,
      items: [
        compare(
          "258 and 2,180: how do the values of the yellow 2s compare?",
          [
            { n: 258, hl: [2] },
            { n: 2180, hl: [3] },
          ],
          2000,
          200,
          "258: [hundreds] → 200. 2,180: [thousands] → 2,000. One place left = 10 times.",
        ),
        compare(
          "16,852 and 14,674: how do the values of the yellow 6s compare?",
          [
            { n: 16852, hl: [3] },
            { n: 14674, hl: [2] },
          ],
          6000,
          600,
          "16,852: [thousands] → 6,000. 14,674: [hundreds] → 600.",
        ),
        compare(
          "12,184 and 541,247: how do the values of the yellow 1s compare?",
          [
            { n: 12184, hl: [4] },
            { n: 541247, hl: [3] },
          ],
          10000,
          1000,
          "12,184: [ten thousands] → 10,000. 541,247: [thousands] → 1,000.",
        ),
        compare(
          "453 and 1,333: how do the values of the yellow 3s compare?",
          [
            { n: 453, hl: [0] },
            { n: 1333, hl: [1] },
          ],
          30,
          3,
          "453: [ones] → 3. 1,333: [tens] → 30.",
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 33–36",
      t: "On My Own 7–8",
      en: "The greatest and the least number",
      ic: "🔢",
      from: "Book p. 35 · On My Own 7–8",
      keep: true,
      items: [...gl([3, 5, 8, 9]), ...gl([7, 1, 0, 6, 4])],
    },
    {
      k: "own9",
      g: "📗 Book · p. 33–36",
      t: "On My Own 9–12",
      en: "Think about the places",
      ic: "🧠",
      from: "Book p. 35–36 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "tf",
          q: "3,735: is the hundreds digit worth 10 times the tens digit?",
          a: false,
          yes: ["Yes", "No"],
          vis: { kind: "pv", n: 3735, hl: [2, 1], val: true },
          x: "Hundreds: 7 → 700. Tens: 3 → 30. 10 × 30 = 300, not 700. Only the [same digit] one place to the left is 10 times.",
        },
        {
          type: "num",
          q: "Karma's number uses the digits 4, 2 and 7. It is between 7,000 and 8,000. The 4 is worth 40. The thousands digit is worth 10 times the digit on its right. What is Karma's number?",
          a: 7742,
          vis: {
            kind: "lines",
            rows: ["7,000 < ? < 8,000", "4 → 40", "7,000 = 10 × 700"],
          },
          x: "7 thousands, 7 hundreds (7,000 = 10 × 700), 4 tens, 2 ones: [7,742].",
        },
        {
          type: "mc",
          q: "Sienna moves the digits of 1,258,072 so that one digit is worth 10 times another. Which number could she write?",
          opts: ["1,580,722", "1,258,072", "1,285,702", "2,158,072"],
          vis: { kind: "digits", rows: [{ n: 1258072, hl: [5, 0] }] },
          // teacher's key (Term 1/20261005-L_2-1.pdf): any number with the two 2s side by side; its sample is 1,228,075
          x: "Put the two 2s [side by side]: 1,580,722. The 2 in the tens (20) is 10 times the 2 in the ones (2). The teacher's example: 1,[22]8,075.",
        },
        {
          type: "tf",
          q: "Rahul says: the 3s in 45,339 and the 6s in 66,084 are compared in a different way. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: {
            kind: "digits",
            rows: [
              { n: 45339, hl: [2, 1], t: "300 · 30" },
              { n: 66084, hl: [4, 3], t: "60,000 · 6,000" },
            ],
          },
          x: "In both numbers the two digits are [side by side], so one is [10 times] the other: 300 = 10 × 30, 60,000 = 10 × 6,000.",
        },
        {
          type: "open",
          q: "Reflect: How can place value help you find the value of a digit?",
          vis: { kind: "pv", n: 8888, hl: [3, 2, 1, 0], val: true },
          // unverified: a model answer (the teacher's key says "answers may vary")
          a: "The place of the digit tells its value: in 8,888 the 8s are worth 8,000, 800, 80 and 8. Each place is 10 times the place on its right.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 1–2",
      t: "Additional Practice 1–5",
      en: "Lesson 2-1",
      ic: "📘",
      from: "Practice Book p. 1–2",
      keep: true,
      items: [
        compare(
          "885,217: how do the values of the two 8s compare?",
          [{ n: 885217, hl: [5, 4] }],
          800000,
          80000,
          "Hundred thousands → 800,000. Ten thousands → 80,000. Side by side = 10 times.",
        ),
        compare(
          "Margie's sum is 640,357. Cindy's sum is 4,793,812. How do the values of the 3s compare?",
          [
            { n: 640357, hl: [2], t: "Margie" },
            { n: 4793812, hl: [3], t: "Cindy" },
          ],
          3000,
          300,
          "Margie: [hundreds] → 300. Cindy: [thousands] → 3,000. Cindy's 3 is 10 times Margie's 3.",
        ),
        ...[4, 3, 2, 1, 0].map((j) => value(94053, j)),
        {
          type: "num",
          q: "Swap two digits of 2,957,648 so that the 4 is worth 10 times more. Write the new number.",
          a: 2957468,
          vis: { kind: "pv", n: 2957648, hl: [1] },
          x: "The 4 is in the tens (40). Swap it with the 6 on its left: 2,957,[4]68. Now it is worth 400 = 10 × 40.",
        },
        {
          type: "mc",
          q: "Two numbers: the 9 in the second number is worth 10 times the 9 in the first number. Which pair is right?",
          opts: ["90 and 900", "900 and 90", "90 and 9,000", "9 and 9"],
          emoji: "9️⃣",
          // unverified: the book asks to write any two such numbers
          x: "900 = 10 × 90: the 9 moved [one place] to the left. Other pairs work too: 9 and 90, 9,000 and 90,000.",
        },
      ],
    },
  ],
};
