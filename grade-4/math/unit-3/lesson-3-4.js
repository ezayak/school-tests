// Math · Grade 4 · Lesson 3-4 « Understand an Addition Algorithm Involving Regrouping » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 73–76, Student Practice Book p. 15–16, the teacher's key for p. 75–76 (Term 1/20261017-L_3-4_copy.pdf, every answer matches).
// The Extra Practice 3-4 sheet is on the Unit 3 page (add-subtract.js), not here. Log: grade-4/math/SOURCES.md.
// The sums are column sums (col, shared/math.js: the carried 1 goes in the small box above).
const { fmt, col } = MathKit;
// "14 ones = 1 ten and 4 ones"
const PL = ["ones", "tens", "hundreds", "thousands", "ten thousands"];
const regroup = (n, j) => ({
  type: "num",
  q: `Regroup ${n} ${PL[j]}: 1 ${PL[j + 1].replace(/s$/, "")} and how many ${PL[j]}?`,
  pre: `${n} ${PL[j]} = 1 ${PL[j + 1].replace(/s$/, "")} +`,
  post: PL[j],
  a: n - 10,
  vis: {
    kind: "lines",
    rows: [`${n} ${PL[j]}`, `10 ${PL[j]} → 1 ${PL[j + 1].replace(/s$/, "")}`],
  },
  x: `${n} = 10 + [${n - 10}]: write ${n - 10}, carry the 1 to the ${PL[j + 1]}.`,
});

window.LESSON = {
  n: "3-4",
  key: "math4-l3-4",
  grade: 4,
  title: "Add with Regrouping",
  en: "Add in columns when a place makes 10 or more: write the ones digit, carry the 1",
  unit: "Unit 3 · Lesson 3-4",
  book: "Book p. 73–76 · Practice Book p. 15–16",
  imgDir: "img/lesson-3-4",
  cover: "curious",
  question: {
    q: "What do I do when a column adds up to [10 or more]?",
    a: "[Regroup]: 6 + 8 = 14 ones = 1 ten and 4 ones. Write the [4], carry the [1] to the tens column and add it there.",
    img: "marta",
  },
  words: [
    {
      w: "Regroup",
      m: "change 10 of a place into 1 of the next place: 14 ones = 1 ten 4 ones",
    },
    { w: "Carry", m: "write the regrouped 1 above the next column" },
    {
      w: "Algorithm",
      m: "steps that always work: add the ones, then the tens …",
    },
    { w: "Column", m: "the digits of one place, one under the other" },
    { w: "Sum", m: "the answer of an addition" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🚗",
      img: "curious",
      lines: [
        "Two cars: one has gone [15,852] miles, the other [8,849] miles.",
        "How far together? 15,852 + 8,849.",
        "2 + 9 = 11: more than 9! We need to [regroup].",
      ],
    },
    {
      t: "Step 1: the ones",
      ic: "1️⃣",
      img: "marta",
      lines: [
        "Marta had 14,156 steps, then 8,238 more.",
        "Ones: 6 + 8 = [14] = 1 ten and 4 ones.",
        "Write [4]. Carry the 1 above the tens.",
      ],
    },
    {
      t: "Steps 2–5",
      ic: "➡️",
      lines: [
        "Tens: 1 + 5 + 3 = [9]. Hundreds: 1 + 2 = [3].",
        "Thousands: 4 + 8 = 12 → write [2], carry 1.",
        "Ten thousands: 1 + 1 = [2]. Marta has 22,394 steps.",
      ],
      vis: { kind: "colshow", op: "+", a: 14156, b: 8238 },
    },
    {
      t: "Don't forget the carry",
      ic: "⚠️",
      lines: [
        "Delma added 13,687 + 3,595 and got 17,272.",
        "Tens: 8 + 9 + the carried [1] = 18, not 17.",
        "The right sum is [17,282].",
      ],
      vis: { kind: "colshow", op: "+", a: 13687, b: 3595 },
    },
  ],

  games: [
    {
      k: "regroup",
      t: "Regroup",
      en: "10 ones = 1 ten",
      ic: "🔄",
      items: [
        [14, 0],
        [17, 0],
        [12, 1],
        [15, 2],
        [11, 3],
        [16, 1],
      ].map(([n, j]) => regroup(n, j)),
    },
    {
      k: "col",
      t: "Add and carry",
      en: "In columns",
      ic: "📐",
      items: [
        [2768, 1455],
        [5089, 3926],
        [14637, 8574],
        [3999, 2001],
        [26485, 17639],
        [907, 4396],
      ].map(([a, b]) => col(a, "+", b)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 73–76",
      t: "Be Curious",
      en: "Two odometers",
      ic: "🚗",
      from: "Book p. 73 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: p. 73 is not in the teacher's key
          a: "Two dials show 15,852 miles and 8,849 miles. I wonder how many miles they are together and how many more miles one has than the other.",
        },
        col(15852, "+", 8849, "How many miles are they together?"),
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 73–76",
      t: "Learn: Marta's steps",
      en: "14,156 + 8,238",
      ic: "👟",
      from: "Book p. 74 · Learn",
      keep: true,
      items: [
        regroup(14, 0),
        regroup(12, 3),
        col(
          14156,
          "+",
          8238,
          "Marta had 14,156 steps. The hike added 8,238 steps. How many steps now?",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 73–76",
      t: "Work Together",
      en: "Kaden's steps",
      ic: "🤝",
      from: "Book p. 74 · Work Together",
      keep: true,
      items: [
        col(
          6972,
          "+",
          6344,
          "Kaden walks 6,972 steps on Monday and 6,344 on Tuesday. How many steps in both days?",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 73–76",
      t: "On My Own 1–8",
      en: "What is the sum?",
      ic: "➕",
      from: "Book p. 75 · On My Own 1–8",
      keep: true,
      items: [
        ...[
          [1458, 926],
          [4239, 765],
          [2744, 1306],
          [4827, 3505],
          [9087, 7668],
          [12058, 4867],
        ].map(([a, b]) => col(a, "+", b)),
        col(
          4569,
          "+",
          5286,
          "A car maker made 4,569 cars so far and will make 5,286 more. How many cars this month?",
        ),
        col(
          1425,
          "+",
          395,
          "Trevon had 1,425 cards. Now he has 395 more. How many cards does he have?",
        ),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 73–76",
      t: "On My Own 9–10",
      en: "The road trip and missing digits",
      ic: "🗺️",
      from: "Book p. 76 · On My Own 9–10",
      keep: true,
      items: [
        col(
          467,
          "+",
          838,
          "Chicago to Omaha 467 miles, Omaha to Billings 838 miles. How many miles in two days?",
        ),
        col(
          1305,
          "+",
          1238,
          "Then 1,238 miles more to Salt Lake City and Los Angeles. How many miles so far?",
        ),
        col(
          1259,
          "+",
          1259,
          "On the way home, halfway is 1,259 miles. How long is the whole trip home?",
        ),
        {
          type: "num",
          q: "Missing digits: 2_,1_9 + 84_ = 22,_04. What is the bottom number 84_?",
          a: 845,
          vis: { kind: "lines", rows: ["2_,1_9", "+  84_", "22,_04"] },
          x: "Ones: 9 + ? ends in 4 → 9 + 5 = 14. The number is [845].",
        },
        {
          type: "num",
          q: "2_,1_9 + 845 = 22,_04. What is the top number?",
          a: 21159,
          vis: { kind: "lines", rows: ["2_,1_9", "+  845", "22,_04"] },
          x: "Tens: 1 + ? + 4 ends in 0 → ? = 5. Hundreds: 1 + 1 + 8 = 10. Thousands: 1 + ? = 2 → 1. [21,159] + 845 = 22,004.",
        },
        {
          type: "open",
          q: "Reflect: How is adding with regrouping different from adding without regrouping? How is it the same?",
          vis: { kind: "colshow", op: "+", a: 14156, b: 8238 },
          // unverified: the key says "answers may vary"
          a: "The same: line up the places and add from the ones. Different: when a column makes 10 or more, I write the ones digit and carry 1 to the next column.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 15–16",
      t: "Additional Practice 1–12",
      en: "Lesson 3-4",
      ic: "📘",
      from: "Practice Book p. 15–16",
      keep: true,
      items: [
        ...[
          [1642, 387],
          [2094, 1037],
          [5947, 4506],
          [18761, 2390],
          [13483, 14918],
          [19798, 10403],
          [26917, 17015],
          [20685, 18832],
          [29731, 25933],
          [28675, 24739],
        ].map(([a, b]) => col(a, "+", b)),
        col(
          2467,
          "+",
          3946,
          "Alene scores 2,467 points in round 1 and 3,946 in round 2. How many in all?",
        ),
        {
          type: "mc",
          q: "Delma added 13,687 + 3,595 and got 17,272. What went wrong?",
          opts: [
            "She forgot the carried 1 in the tens: 1 + 8 + 9 = 18",
            "She forgot to carry in the thousands",
            "Her answer is right",
          ],
          vis: { kind: "lines", rows: ["13,687", "+ 3,595", "17,272 ?"] },
          x: "Ones 7 + 5 = 12: carry 1. Tens 1 + 8 + 9 = 18, not 17. The sum is [17,282].",
        },
        col(13687, "+", 3595, "Now add 13,687 + 3,595 the right way:"),
      ],
    },
  ],
};
