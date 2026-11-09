// Math · Grade 4 · Lesson 5-2 « Understand Prime and Composite Numbers » (Reveal Math, Unit 5).
// Sources: Student Edition Vol. 1 p. 137–140, Student Practice Book p. 37–38. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Prime or composite is worked out by shared/math-kit.js (primeQ, isPrime, factorPairs).
const { isPrime, primeQ } = MathKit;
const pick = (q, right, wrong, x, more = {}) => ({
  type: "mc",
  q,
  opts: [String(right), ...wrong.map(String)],
  vis: {
    kind: "lines",
    rows: [[right, ...wrong].sort((a, b) => a - b).join(" · ")],
  },
  x,
  ...more,
});
const tf = (q, a, x, vis) => ({
  type: "tf",
  q,
  a,
  yes: ["True", "False"],
  vis,
  x,
});
// the checks below throw when the page loads if a "prime" answer is not prime
[53, 83, 89, 101, 19, 67].forEach((n) => {
  if (!isPrime(n)) throw new Error(`lesson-5-2: ${n} is not prime`);
});

window.LESSON = {
  n: "5-2",
  key: "math4-l5-2",
  grade: 4,
  title: "Prime and Composite Numbers",
  en: "A prime number has one factor pair; a composite number has more than one",
  unit: "Unit 5 · Lesson 5-2",
  book: "Book p. 137–140 · Practice Book p. 37–38",
  imgDir: "img/lesson-5-2",
  cover: "curious",
  question: {
    q: "How do [factor pairs] tell me if a number is [prime] or [composite]?",
    a: "One factor pair (17 = 1 × 17): [prime]. More than one pair (12 = 1 × 12 = 2 × 6 = 3 × 4): [composite]. 1 is neither.",
    img: "curious",
  },
  words: [
    {
      w: "Prime number",
      m: "a number with exactly one factor pair: 17 = 1 × 17",
    },
    {
      w: "Composite number",
      m: "a number with more than one factor pair: 12 = 2 × 6 = 3 × 4",
    },
    { w: "Factor pair", m: "two numbers that multiply to make the number" },
    { w: "Even", m: "ends in 0, 2, 4, 6 or 8: 2 is a factor" },
    { w: "Odd", m: "ends in 1, 3, 5, 7 or 9" },
  ],
  ideas: [
    {
      t: "Bunches of balloons",
      ic: "🎈",
      img: "curious",
      lines: [
        "8 balloons: [2 bunches of 4]. 9 balloons: [3 bunches of 3].",
        "2 balloons and 5 balloons: only 1 bunch (or 1 in each).",
        "Some numbers split into equal groups, some [don't].",
      ],
    },
    {
      t: "12 basketballs: composite",
      ic: "🏀",
      lines: [
        "12 balls in equal rows: 1 × 12, 2 × 6, 3 × 4 (and turned around).",
        "12 has [more than one] factor pair.",
        "12 is a [composite] number.",
      ],
      vis: { kind: "array", r: 3, c: 4, e: "🏀", cap: "3 rows of 4" },
    },
    {
      t: "17 soccer balls: prime",
      ic: "⚽",
      lines: [
        "17 balls: only 1 row of 17 (or 17 rows of 1).",
        "17 has exactly [one] factor pair: 1 × 17.",
        "17 is a [prime] number.",
      ],
      vis: { kind: "array", r: 1, c: 17, e: "⚽", cap: "1 row of 17" },
    },
    {
      t: "Even and odd",
      ic: "⚠️",
      lines: [
        "Every even number greater than 2 has the factor 2: [composite].",
        "2 is even and [prime] (2 = 1 × 2).",
        "Odd numbers can be composite too: 9 = 3 × 3, 15 = 3 × 5.",
      ],
      vis: {
        kind: "lines",
        rows: ["2 = 1 × 2 → prime", "9 = 1 × 9 = 3 × 3 → composite"],
      },
    },
    {
      t: "1 is special",
      ic: "1️⃣",
      lines: [
        "1 = 1 × 1: it has only one factor, 1.",
        "A prime number has two different factors: 1 and itself.",
        "So 1 is [neither] prime nor composite.",
      ],
      vis: { kind: "lines", rows: ["1 = 1 × 1"] },
    },
  ],

  games: [
    {
      k: "pc",
      t: "Prime or composite?",
      en: "Look for a factor pair",
      ic: "🔢",
      items: [7, 21, 29, 49, 11, 27, 37, 57, 13, 91].map((n) => primeQ(n)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 137–140",
      t: "Be Curious",
      en: "Balloons",
      ic: "🎈",
      from: "Book p. 137 · Be Curious",
      keep: true,
      items: [
        {
          type: "multi",
          q: "2, 5, 8 and 9 balloons. Which numbers can be tied in equal bunches of 2 or more (not just one bunch)? Choose all.",
          opts: [
            { t: "8", ok: true, emoji: "🎈" },
            { t: "9", ok: true, emoji: "🎈" },
            { t: "2", emoji: "🎈" },
            { t: "5", emoji: "🎈" },
          ],
        },
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "8 balloons are in 2 bunches of 4, 9 balloons in 3 bunches of 3. 2 and 5 balloons stay in one bunch. I wonder which numbers can be split into equal groups.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 137–140",
      t: "Learn: balls on shelves",
      en: "12 and 17",
      ic: "🏀",
      from: "Book p. 138 · Learn",
      keep: true,
      items: [
        {
          type: "num",
          q: "12 basketballs in equal rows. In how many different ways?",
          a: 6,
          post: "ways",
          vis: {
            kind: "lines",
            rows: ["1 × 12", "12 × 1", "2 × 6", "6 × 2", "3 × 4", "4 × 3"],
          },
          x: "[6] ways: 3 factor pairs, each turned around.",
        },
        {
          type: "num",
          q: "17 soccer balls in equal rows. In how many different ways?",
          a: 2,
          post: "ways",
          vis: { kind: "array", r: 1, c: 17, e: "⚽", cap: "" },
          x: "Only 1 row of 17 or 17 rows of 1: [2] ways.",
        },
        primeQ(12),
        primeQ(17),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 137–140",
      t: "Work Together",
      en: "8, 19, 33, 45, 67",
      ic: "🤝",
      from: "Book p. 138 · Work Together",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Which of these numbers are prime? Choose all.",
          opts: [8, 19, 33, 45, 67].map((n) => ({
            t: String(n),
            ok: isPrime(n),
            emoji: "🔢",
          })),
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 137–140",
      t: "On My Own 1–6",
      en: "Prime or composite?",
      ic: "🔢",
      from: "Book p. 139 · On My Own 1–6",
      keep: true,
      items: [3, 24, 15, 31, 87, 2].map((n) => primeQ(n)),
    },
    {
      k: "own7",
      g: "📗 Book · p. 137–140",
      t: "On My Own 7–10",
      en: "True or false?",
      ic: "✅",
      from: "Book p. 139 · On My Own 7–10",
      keep: true,
      items: [
        tf(
          "All even numbers greater than 2 are composite.",
          true,
          "They all have the factor [2]: 4 = 2 × 2, 6 = 2 × 3 …",
          { kind: "lines", rows: ["4 = 2 × 2", "6 = 2 × 3", "8 = 2 × 4"] },
        ),
        tf(
          "1 is a prime number.",
          false,
          "1 has only one factor. A prime number has [two]: 1 and itself.",
          { kind: "lines", rows: ["1 = 1 × 1"] },
        ),
        tf(
          "All odd numbers are prime.",
          false,
          "9 is odd and [composite]: 9 = 3 × 3.",
          { kind: "lines", rows: ["9 = 3 × 3", "15 = 3 × 5"] },
        ),
        tf("All prime numbers are odd.", false, "[2] is prime and even.", {
          kind: "lines",
          rows: ["2 = 1 × 2"],
        }),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · p. 137–140",
      t: "On My Own 11–14",
      en: "Find and explain",
      ic: "🧠",
      from: "Book p. 139–140 · On My Own 11–14",
      keep: true,
      items: [
        pick(
          "Which number greater than 50 is prime?",
          53,
          [51, 55, 57],
          "53 has only one factor pair: [1 × 53].",
        ),
        pick(
          "Which number greater than 75 is composite?",
          76,
          [79, 83, 89],
          "76 = 2 × 38: it has more than one factor pair.",
        ),
        {
          type: "tf",
          q: "Scott says he can put 71 marbles in equal groups in more than 2 ways. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["71 = 1 × 71"] },
          x: "71 is [prime]: only 1 group of 71 or 71 groups of 1.",
        },
        {
          type: "num",
          q: "Armando's round buttons are in 3 rows. How many round buttons are there?",
          a: 15,
          post: "round buttons",
          img: "buttons",
          // unverified: counted from the book's picture (23 square, 15 round, 17 triangle buttons)
          x: "3 rows of 5: [15] round buttons.",
        },
        {
          type: "multi",
          q: "Armando has 23 square, 15 round and 17 triangle buttons. Which type can he put in equal groups of 2 or more? Choose all.",
          opts: [
            { t: "Round buttons (15)", ok: true, emoji: "🔘" },
            { t: "Square buttons (23)", emoji: "🔘" },
            { t: "Triangle buttons (17)", emoji: "🔘" },
          ],
        },
        {
          type: "open",
          q: "Reflect: How are factor pairs related to prime and composite numbers?",
          vis: {
            kind: "lines",
            rows: [
              "17 = 1 × 17 → prime",
              "12 = 1 × 12 = 2 × 6 = 3 × 4 → composite",
            ],
          },
          // unverified: a model answer, the book gives none
          a: "A prime number has exactly one factor pair: 1 and itself. A composite number has more than one factor pair.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 37–38",
      t: "Additional Practice 1–10",
      en: "Lesson 5-2",
      ic: "📘",
      from: "Practice Book p. 37–38",
      keep: true,
      items: [
        ...[35, 73, 39, 51].map((n) => primeQ(n)),
        tf(
          "Odd numbers cannot be composite.",
          false,
          "15 is odd and [composite]: 15 = 3 × 5.",
          { kind: "lines", rows: ["15 = 3 × 5"] },
        ),
        tf("All even numbers are composite.", false, "[2] is even and prime.", {
          kind: "lines",
          rows: ["2 = 1 × 2"],
        }),
        pick(
          "Which number between 80 and 90 is prime?",
          83,
          [81, 85, 87],
          "83 has only one factor pair: [1 × 83]. (89 is prime too.)",
        ),
        pick(
          "Which number between 100 and 150 is prime?",
          101,
          [111, 121, 133],
          "101 has only one factor pair: [1 × 101].",
        ),
        {
          type: "mc",
          q: "Kevin says he can arrange 63 cards in 6 ways. Randall says 63 is prime and has only 2 ways. Who is right?",
          opts: ["Kevin", "Randall"],
          two: true,
          vis: { kind: "lines", rows: ["63 = 1 × 63 = 3 × 21 = 7 × 9"] },
          x: "63 is composite: 3 factor pairs, each turned around = [6] ways.",
        },
        {
          type: "tf",
          q: "Jasmine thinks 41 beads can be put in equal groups in more than 2 ways. Is she right?",
          a: false,
          yes: ["Yes, she is", "No, she is not"],
          vis: { kind: "lines", rows: ["41 = 1 × 41"] },
          x: "41 is [prime]: only 1 × 41 and 41 × 1.",
        },
      ],
    },
  ],
};
