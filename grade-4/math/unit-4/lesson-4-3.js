// Math · Grade 4 · Lesson 4-3 « Solve Comparison Problems Using Multiplication » (Reveal Math, Unit 4).
// Sources: Student Edition Vol. 1 p. 113–116, Student Practice Book p. 31–32. No teacher's key for this lesson yet. Log: grade-4/math/SOURCES.md.
// Drawings: bar (the bar diagram; the unknown is yellow with "?"), lines.
const fmt = (n) => n.toLocaleString("en-US");
// "lb has n times as many as la": la known → lb unknown
const timesBar = (la, a, lb, n) => ({
  kind: "bar",
  rows: [
    { l: la, segs: [{ t: fmt(a) }] },
    { l: lb, seg: { t: fmt(a) }, times: n, brace: { t: "?", q: true } },
  ],
});
// lb (= total) is n times as many as la: la unknown
const partBar = (lb, total, n, la) => ({
  kind: "bar",
  rows: [
    { l: lb, seg: { t: "?", q: true }, times: n, brace: { t: fmt(total) } },
    { l: la, segs: [{ t: "?", q: true }] },
  ],
});
// how many times as many is big than small?
const howBar = (lb, big, la, small) => ({
  kind: "bar",
  rows: [
    {
      l: lb,
      segs: [{ t: fmt(big), v: big }],
      brace: { t: "? times", q: true },
    },
    { l: la, segs: [{ t: fmt(small), v: small }] },
  ],
});
const prob = (q, a, vis, post, x, more = {}) => ({
  type: "num",
  q,
  a,
  vis,
  post,
  x,
  ...more,
});

window.LESSON = {
  n: "4-3",
  key: "math4-l4-3",
  grade: 4,
  title: "Times as Many: Find the Unknown",
  en: "Times as many: find the big number, the small number or how many times",
  unit: "Unit 4 · Lesson 4-3",
  book: "Book p. 113–116 · Practice Book p. 31–32",
  imgDir: "img/lesson-4-3",
  cover: "learn-bar",
  question: {
    q: "Which [comparison words] tell me to write a [multiplication] equation?",
    a: "[times as many], [times as much], [times as long]. Penelope strikes out 21, 3 times as many as Madison: 21 = 3 × ?, so Madison strikes out [7].",
    img: "learn-bar",
  },
  words: [
    { w: "Times as many", m: "multiply: 3 times as many as 7 is 3 × 7 = 21" },
    {
      w: "Times as much",
      m: "the same for amounts: $63 is 7 times as much as $9",
    },
    { w: "Unknown", m: "the number we look for. We write ? or a letter" },
    { w: "Symbol", m: "a sign for the unknown: ?, a, b, c …" },
    { w: "Factor", m: "a number we multiply: 3 × 7, 3 and 7 are factors" },
    { w: "Bar diagram", m: "bars that show the amounts in a problem" },
  ],
  ideas: [
    {
      t: "What math do you see?",
      ic: "🥎",
      lines: [
        "Penelope strikes out [3 times as many] batters as Madison.",
        "If Madison strikes out 5, Penelope strikes out 3 × 5 = [15].",
        "Many answers are right: 3, 6, 9, 12, 15 … (3 times a number).",
      ],
      vis: timesBar("Madison", 5, "Penelope", 3),
    },
    {
      t: "Draw the bar diagram",
      ic: "📊",
      img: "learn-bar",
      lines: [
        "Penelope: [21] batters, in 3 equal parts.",
        "Madison: [1] part. We don't know it: ?",
        "The equation: [21 = 3 × ?]",
      ],
    },
    {
      t: "Find the unknown factor",
      ic: "🔍",
      lines: [
        "21 = 3 × ? → “3 times [what] is 21?”",
        "Count by 3s: 3, 6, 9, 12, 15, 18, 21 → [7] jumps.",
        "21 = 3 × 7. Madison strikes out [7] batters.",
      ],
      vis: partBar("Penelope", 21, 3, "Madison"),
    },
    {
      t: "How many times as many?",
      ic: "🪙",
      lines: [
        "Ty has [32] coins. Dan has [8] coins.",
        "32 = ? × 8 → “what times 8 is 32?”",
        "4 × 8 = 32. Ty has [4 times] as many coins.",
      ],
      vis: howBar("Ty", 32, "Dan", 8),
    },
    {
      t: "A letter for the unknown",
      ic: "🔤",
      lines: [
        "Owen serves 7 aces. Emma serves [3 times as many].",
        "We can write the unknown as a letter: 7 × 3 = [a].",
        "a = 21. Emma serves [21] aces.",
      ],
      vis: timesBar("Owen", 7, "Emma", 3),
    },
    {
      t: "Three kinds of questions",
      ic: "🧩",
      lines: [
        "The [big] amount: 3 × 7 = [?]",
        "The [small] amount: 21 = 3 × [?]",
        "[How many times]: 21 = [?] × 7",
      ],
      vis: {
        kind: "lines",
        rows: ["3 × 7 = ?", "21 = 3 × ?", "21 = ? × 7"],
      },
    },
  ],

  games: [
    {
      k: "factor",
      t: "Missing factor",
      en: "Find the ?",
      ic: "🔍",
      items: [
        [42, 6, 7],
        [36, 4, 9],
        [45, 5, 9],
        [28, 7, 4],
        [64, 8, 8],
        [27, 3, 9],
        [54, 9, 6],
        [40, 10, 4],
      ].map(([p, a, b], i) => ({
        type: "num",
        q: i % 2 ? `${p} = ? × ${b}` : `${p} = ${a} × ?`,
        pre: i % 2 ? `${p} =` : `${p} = ${a} ×`,
        post: i % 2 ? `× ${b}` : "",
        a: i % 2 ? a : b,
        vis: i % 2 ? howBar("", p, "", b) : partBar("", p, a, ""),
        x: `${p} = ${a} × ${b}`,
      })),
    },
    {
      k: "times",
      t: "How many times?",
      en: "Compare two numbers",
      ic: "📏",
      items: [
        [40, 5],
        [18, 3],
        [49, 7],
        [30, 10],
        [24, 6],
        [72, 8],
      ].map(([b, s]) => ({
        type: "num",
        q: `${b} is ? times as many as ${s}.`,
        a: b / s,
        post: "times",
        vis: howBar("", b, "", s),
        x: `${b} = [${b / s}] × ${s}`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 113–116",
      t: "Be Curious",
      en: "What math do you see?",
      ic: "🥎",
      from: "Book p. 113 · Be Curious",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Penelope strikes out 3 times as many batters as Madison. How many batters could Penelope have struck out? Choose all that could be right.",
          opts: [
            { t: "12 (Madison 4)", ok: true, emoji: "✅" },
            { t: "15 (Madison 5)", ok: true, emoji: "✅" },
            { t: "21 (Madison 7)", ok: true, emoji: "✅" },
            { t: "10", emoji: "🤔" },
            { t: "7", emoji: "🤔" },
          ],
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 113–116",
      t: "Learn: Penelope and Madison",
      en: "21 = 3 × ?",
      ic: "🥎",
      from: "Book p. 114 · Learn",
      keep: true,
      items: [
        prob(
          "Penelope strikes out 21 batters. She strikes out 3 times as many batters as Madison. How many batters does Madison strike out?",
          7,
          partBar("Penelope", 21, 3, "Madison"),
          "batters",
          "21 = 3 × [7]",
          { pre: "21 = 3 ×" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 113–116",
      t: "Work Together",
      en: "Ty's and Dan's coins",
      ic: "🪙",
      from: "Book p. 114 · Work Together",
      keep: true,
      items: [
        prob(
          "Ty has 32 coins. Dan has 8 coins. How many times as many coins does Ty have than Dan?",
          4,
          howBar("Ty", 32, "Dan", 8),
          "times as many",
          "32 = [4] × 8",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 113–116",
      t: "On My Own 1–4",
      en: "What is the unknown number?",
      ic: "🔍",
      from: "Book p. 115 · On My Own 1–4",
      keep: true,
      items: [
        prob(
          "56 is ? times as much as 7.",
          56 / 7,
          howBar("", 56, "", 7),
          "",
          "56 = [8] × 7",
          { pre: "56 = ? × 7 → ? =" },
        ),
        prob(
          "35 is 7 times as many as ?.",
          5,
          partBar("", 35, 7, ""),
          "",
          "35 = 7 × [5]",
          { pre: "35 = 7 × ? → ? =" },
        ),
        prob(
          "24 is 8 times as many as ?.",
          3,
          partBar("", 24, 8, ""),
          "",
          "24 = 8 × [3]",
          { pre: "24 = 8 × ? → ? =" },
        ),
        prob(
          "45 is ? times as much as 9.",
          5,
          howBar("", 45, "", 9),
          "",
          "45 = [5] × 9",
          { pre: "45 = ? × 9 → ? =" },
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 113–116",
      t: "On My Own 5–7",
      en: "Bar diagram and equation",
      ic: "📊",
      from: "Book p. 115 · On My Own 5–7",
      keep: true,
      items: [
        prob(
          "Marie read 20 pages last week. She read 2 times as many pages this week. How many pages did she read this week?",
          40,
          timesBar("Last week", 20, "This week", 2),
          "pages",
          "2 × 20 = [40]",
        ),
        prob(
          "A tomato plant is 48 inches tall. A pepper plant is 8 inches tall. How many times as tall is the tomato plant?",
          6,
          howBar("Tomato 🍅", 48, "Pepper 🫑", 8),
          "times as tall",
          "48 = [6] × 8",
        ),
        prob(
          "Dana saved $63. Dana saved 7 times as much as Julie. How much did Julie save?",
          9,
          partBar("Dana", 63, 7, "Julie"),
          "",
          "63 = 7 × [9]: Julie saved $9.",
          { pre: "$" },
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · p. 113–116",
      t: "On My Own 8–12",
      en: "Think it through",
      ic: "🧠",
      from: "Book p. 116 · On My Own 8–12",
      keep: true,
      items: [
        prob(
          "Wilani has 12 nickels. Wilani has 6 times as many nickels as Brenda. How many nickels does Brenda have?",
          2,
          partBar("Wilani", 12, 6, "Brenda"),
          "nickels",
          "12 = 6 × [2]",
        ),
        prob(
          "Wilani has 12 nickels and Brenda has 2 nickels. A nickel is 5¢. What is the value of all their coins?",
          70,
          { kind: "lines", rows: ["12 + 2 = 14 nickels", "14 × 5¢ = ?"] },
          "¢",
          "14 nickels × 5¢ = [70¢] ($0.70).",
        ),
        {
          type: "multi",
          q: "Perry ran 5 times as many minutes as Louis. How many minutes could they have run? Choose all that could be right.",
          opts: [
            { t: "Louis 4, Perry 20", ok: true, emoji: "✅" },
            { t: "Louis 10, Perry 50", ok: true, emoji: "✅" },
            { t: "Louis 5, Perry 10", emoji: "🤔" },
            { t: "Louis 20, Perry 4", emoji: "🤔" },
          ],
        },
        prob(
          "A welder used 4 meters of metal rod last week and 32 meters this week. How many times as many meters did the welder use this week?",
          8,
          howBar("This week", 32, "Last week", 4),
          "times as many",
          "32 = [8] × 4",
        ),
        prob(
          "There are 12 birds in the apple tree. This is 4 times as many birds as in the cherry tree. How many birds are in the cherry tree?",
          3,
          partBar("Apple tree", 12, 4, "Cherry tree"),
          "birds",
          "12 = 4 × [3]",
        ),
        prob(
          "Vela practiced piano 12 hours. That is 4 times as long as Marina. How many hours did Marina practice?",
          3,
          partBar("Vela", 12, 4, "Marina"),
          "hours",
          "12 = 4 × [3]",
        ),
        prob(
          "Rian practiced 2 times as long as Marina (3 hours). How many hours did Rian practice?",
          6,
          timesBar("Marina", 3, "Rian", 2),
          "hours",
          "2 × 3 = [6]",
        ),
        prob(
          "Vela practiced 12 hours, Rian 6 hours. How many times as long did Vela practice as Rian?",
          2,
          howBar("Vela", 12, "Rian", 6),
          "times as long",
          "12 = [2] × 6",
        ),
        {
          type: "open",
          q: "Reflect: What comparison words do you look for in a problem to find the equation you can use?",
          vis: {
            kind: "lines",
            rows: ["times as many", "times as much", "times as long"],
          },
          // unverified: a model answer, the book gives none
          a: "“Times as many”, “times as much”, “times as long / tall / far” tell me to write a multiplication equation. “More than” tells me to add.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 31–32",
      t: "Additional Practice 1–5",
      en: "Lesson 4-3",
      ic: "📘",
      from: "Practice Book p. 31–32",
      keep: true,
      items: [
        {
          type: "mc",
          q: "There are 3 cars in a parking lot. There are 5 times as many cars in a parking garage. Which equation shows the problem?",
          opts: ["3 × 5 = c", "5 × b = 3", "3 × b = 5", "3 + 5 = c"],
          keep: ["5 × b = 3", "3 × b = 5", "3 + 5 = c", "3 × 5 = c"],
          vis: timesBar("Lot", 3, "Garage", 5),
          x: "5 bars of 3 cars: [3 × 5 = c] (D).",
        },
        prob(
          "How many cars are in the parking garage?",
          15,
          timesBar("Lot", 3, "Garage", 5),
          "cars",
          "3 × 5 = [15]",
        ),
        prob(
          "Marcy studied 4 hours last week. She studies 4 times as many hours this week. How many hours does Marcy study this week?",
          16,
          timesBar("Last week", 4, "This week", 4),
          "hours",
          "4 × 4 = [16]",
        ),
        prob(
          "One piece of fabric is 8 feet long. A second piece is 4 times as long. How long is the second piece?",
          32,
          timesBar("First", 8, "Second", 4),
          "feet",
          "4 × 8 = [32]",
        ),
        {
          type: "tf",
          q: "Jackie has 9 stamps. Kevin has 36 stamps. Kevin says he has 5 times as many stamps as Jackie. Is Kevin correct?",
          a: false,
          yes: ["Yes, he is", "No, he is not"],
          vis: howBar("Kevin", 36, "Jackie", 9),
          x: "36 = [4] × 9. Kevin has 4 times as many, not 5 (5 × 9 = 45).",
        },
        prob(
          "Erin picked 8 flowers. Jason picked 5 times as many flowers as Erin. How many flowers did Jason pick?",
          40,
          timesBar("Erin", 8, "Jason", 5),
          "flowers",
          "5 × 8 = [40]",
        ),
      ],
    },
  ],
};
