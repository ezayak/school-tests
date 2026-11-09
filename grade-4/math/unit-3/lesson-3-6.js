// Math · Grade 4 · Lesson 3-6 « Understand a Subtraction Algorithm » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 81–84, Student Practice Book p. 19–20. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The differences are column subtractions (col, shared/math.js).
const { fmt, col } = MathKit;

window.LESSON = {
  n: "3-6",
  key: "math4-l3-6",
  grade: 4,
  title: "Subtract in Columns",
  en: "The subtraction algorithm: line up the places and subtract from the ones to the left",
  unit: "Unit 3 · Lesson 3-6",
  book: "Book p. 81–84 · Practice Book p. 19–20",
  imgDir: "img/lesson-3-6",
  cover: "curious",
  question: {
    q: "How do I subtract with an [algorithm]?",
    a: "Write the numbers in columns, the bigger number on top. Subtract the [ones] first, then the tens, the hundreds … 5,386 − 4,185 = [1,201].",
    img: "curious",
  },
  words: [
    {
      w: "Algorithm",
      m: "steps that always work: subtract the ones, then the tens …",
    },
    { w: "Difference", m: "the answer of a subtraction" },
    { w: "Align", m: "line up: ones under ones, tens under tens" },
    { w: "Column", m: "the digits of one place, one under the other" },
  ],
  ideas: [
    {
      t: "Two elephants",
      ic: "🐘",
      img: "curious",
      lines: [
        "African elephant: [5,386] kg. Asian elephant: [4,185] kg.",
        "A question: how much [heavier] is the African elephant?",
        "We subtract: 5,386 − 4,185.",
      ],
    },
    {
      t: "Subtract place by place",
      ic: "📐",
      lines: [
        "Ones: 6 − 5 = [1]. Tens: 8 − 8 = [0].",
        "Hundreds: 3 − 1 = [2]. Thousands: 5 − 4 = [1].",
        "The African elephant weighs [1,201] kg more.",
      ],
      vis: { kind: "colshow", op: "-", a: 5386, b: 4185 },
    },
    {
      t: "Like the addition algorithm",
      ic: "🔁",
      lines: [
        "Line up the places, the same as for adding.",
        "Start on the [right], with the ones.",
        "Write one digit under each column.",
      ],
      vis: { kind: "colshow", op: "-", a: 68728, b: 43203 },
    },
    {
      t: "Find a missing digit",
      ic: "🔍",
      lines: [
        "2,74? − 1,??4 = ?,541.",
        "Ones: ? − 4 = 1 → [5]. Tens: 4 − ? = 4 → [0].",
        "Hundreds: 7 − ? = 5 → [2]. Thousands: 2 − 1 = [1].",
      ],
      vis: { kind: "colshow", op: "-", a: 2745, b: 1204 },
    },
  ],

  games: [
    {
      k: "col",
      t: "Subtract in columns",
      en: "Ones first",
      ic: "📐",
      items: [
        [6875, 2431],
        [9468, 5243],
        [47396, 12175],
        [8759, 608],
        [35864, 21530],
        [7999, 4567],
      ].map(([a, b]) => col(a, "-", b)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 81–84",
      t: "Be Curious",
      en: "What question could you ask?",
      ic: "🐘",
      from: "Book p. 81 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What question could you ask?",
          img: "curious",
          // unverified: no key for this lesson
          a: "How much heavier is the African elephant than the Asian elephant? How much do they weigh together?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 81–84",
      t: "Learn: the elephants",
      en: "5,386 − 4,185",
      ic: "🐘",
      from: "Book p. 82 · Learn",
      keep: true,
      items: [
        col(
          5386,
          "-",
          4185,
          "What is the difference in weight between the African elephant (5,386 kg) and the Asian elephant (4,185 kg)?",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 81–84",
      t: "Work Together",
      en: "A whale and a whale shark",
      ic: "🐋",
      from: "Book p. 82 · Work Together",
      keep: true,
      items: [
        col(
          68728,
          "-",
          43203,
          "A gray whale weighs 68,728 pounds, a whale shark 43,203 pounds. What is the difference?",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 81–84",
      t: "On My Own 1–8",
      en: "What is the difference?",
      ic: "➖",
      from: "Book p. 83 · On My Own 1–8",
      keep: true,
      items: [
        [1558, 247],
        [53720, 33400],
        [4964, 2803],
        [48579, 4222],
        [12923, 10712],
        [2646, 1335],
        [7438, 5225],
        [267982, 132580],
      ].map(([a, b]) => col(a, "-", b)),
    },
    {
      k: "own9",
      g: "📗 Book · p. 81–84",
      t: "On My Own 9–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 83–84 · On My Own 9–12",
      keep: true,
      items: [
        col(
          1387,
          "-",
          365,
          "The trip is 1,387 miles. They drove 365 miles the first day. How many miles are left?",
        ),
        col(
          2789,
          "-",
          1024,
          "A camp spent $2,789 on wood and tools. The tools cost $1,024. How much was the wood?",
        ),
        {
          type: "num",
          q: "Missing digits: 2,74_ − 1,_ _4 = _,541. What is the number on the bottom?",
          a: 1204,
          vis: { kind: "lines", rows: ["2,74_", "− 1,_ _4", "_,541"] },
          x: "Tens: 4 − ? = 4 → 0. Hundreds: 7 − ? = 5 → 2. The number is [1,204].",
        },
        {
          type: "num",
          q: "2,74_ − 1,204 = _,541. What is the top number?",
          a: 2745,
          vis: { kind: "lines", rows: ["2,74_", "− 1,204", "_,541"] },
          x: "Ones: ? − 4 = 1 → 5. [2,745] − 1,204 = 1,541.",
        },
        col(
          5652,
          "-",
          3420,
          "Walkathon: $3,420 two years ago, $5,652 last year. How much did it grow?",
        ),
        col(
          7875,
          "-",
          5652,
          "Last year $5,652, this year $7,875. How much did it grow?",
        ),
        {
          type: "mc",
          q: "Was the increase greater from two years ago to last year, or from last year to this year?",
          opts: [
            "From two years ago to last year",
            "From last year to this year",
          ],
          two: true,
          vis: {
            kind: "lines",
            rows: ["5,652 − 3,420 = 2,232", "7,875 − 5,652 = 2,223"],
          },
          x: "$2,232 > $2,223: the first increase is [9 dollars] bigger.",
        },
        {
          type: "open",
          q: "Reflect: Why is it helpful to write the numbers vertically when you use the subtraction algorithm?",
          vis: { kind: "colshow", op: "-", a: 5386, b: 4185 },
          // unverified: a model answer, the book gives none
          a: "The digits of the same place are in one column, one under the other, so I subtract ones from ones, tens from tens, and don't mix up the places.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 19–20",
      t: "Additional Practice 1–13",
      en: "Lesson 3-6",
      ic: "📘",
      from: "Practice Book p. 19–20",
      keep: true,
      items: [
        ...[
          [1961, 510],
          [3598, 2485],
          [5733, 3213],
          [8649, 5407],
          [19789, 5364],
          [24087, 13055],
          [31875, 11744],
          [42769, 21254],
          [55980, 34560],
          [61936, 21721],
        ].map(([a, b]) => col(a, "-", b)),
        col(
          2350,
          "-",
          1230,
          "Renetta has $2,350. A laptop costs $1,230. How much is left?",
        ),
        col(
          5798,
          "-",
          3634,
          "Ariana walks 5,798 feet and runs 3,634 feet. How many more feet does she walk?",
        ),
        col(
          12560,
          "-",
          11430,
          "Company A makes $12,560 and has $11,430 left after a gift. How much did it give?",
        ),
        col(
          13679,
          "-",
          12552,
          "Company B makes $13,679 and has $12,552 left. How much did it give?",
        ),
        {
          type: "mc",
          q: "Company A gave $1,130, company B gave $1,127. Which company gives more money?",
          opts: ["Company A", "Company B"],
          two: true,
          vis: {
            kind: "digits",
            rows: [
              { n: 1130, hl: [1] },
              { n: 1127, hl: [1] },
            ],
          },
          x: "Tens: [3] > 2, so $1,130 > $1,127.",
        },
      ],
    },
  ],
};
