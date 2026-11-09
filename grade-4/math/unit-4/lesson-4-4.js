// Math · Grade 4 · Lesson 4-4 « Solve Comparison Problems Using Division » (Reveal Math, Unit 4).
// Sources: Student Edition Vol. 1 p. 117–120, Student Practice Book p. 33–34. No teacher's key for this lesson yet. Log: grade-4/math/SOURCES.md.
// Drawings: bar (the bar diagram; the unknown is yellow with "?"), lines.
const fmt = (n) => n.toLocaleString("en-US");
// lb (= total) is n times as many as la: la unknown → total ÷ n
const partBar = (lb, total, n, la) => ({
  kind: "bar",
  rows: [
    { l: lb, seg: { t: "?", q: true }, times: n, brace: { t: fmt(total) } },
    { l: la, segs: [{ t: "?", q: true }] },
  ],
});
// how many times as many is big than small? → big ÷ small
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
const timesBar = (la, a, lb, n) => ({
  kind: "bar",
  rows: [
    { l: la, segs: [{ t: fmt(a) }] },
    { l: lb, seg: { t: fmt(a) }, times: n, brace: { t: "?", q: true } },
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
  n: "4-4",
  key: "math4-l4-4",
  grade: 4,
  title: "Times as Many: Divide",
  en: "Divide to compare: find the small number or how many times as much",
  unit: "Unit 4 · Lesson 4-4",
  book: "Book p. 117–120 · Practice Book p. 33–34",
  imgDir: "img/lesson-4-4",
  cover: "curious",
  question: {
    q: "How do I know I need to [divide]?",
    a: "I know the [big] amount and look for the [small] one, or for [how many times]. A $50 coat costs 5 times as much as gloves: 50 ÷ 5 = [10], the gloves cost $10.",
    img: "curious",
  },
  words: [
    { w: "Divide (÷)", m: "share into equal parts: 50 ÷ 5 = 10" },
    { w: "Times as much", m: "$50 is 5 times as much as $10" },
    { w: "Times less than", m: "$10 is 5 times less than $50" },
    { w: "Unknown", m: "the number we look for: ?" },
    { w: "Bar diagram", m: "bars that show the amounts in a problem" },
    { w: "Equation", m: "a number sentence with =, like 50 ÷ 5 = 10" },
  ],
  ideas: [
    {
      t: "Tell me everything you can",
      ic: "🧤",
      img: "curious",
      lines: [
        "[5 pairs] of gloves cost the same as [1 coat].",
        "The coat costs [5 times as much] as a pair of gloves.",
        "A pair of gloves costs the coat's price [÷ 5].",
      ],
    },
    {
      t: "Draw the bar diagram",
      ic: "📊",
      lines: [
        "The coat costs [$50]: 5 equal parts.",
        "The gloves are [1] part: ?",
        "50 ÷ 5 = ?",
      ],
      vis: partBar("Coat 🧥", 50, 5, "Gloves 🧤"),
    },
    {
      t: "Divide to find it",
      ic: "➗",
      lines: [
        "50 ÷ 5 = ? Think: 5 × [what] = 50?",
        "5 × 10 = 50, so 50 ÷ 5 = [10].",
        "A pair of gloves costs [$10].",
      ],
      vis: {
        kind: "lines",
        rows: ["50 ÷ 5 = ?", "50 = 5 × 10", "50 ÷ 5 = 10"],
      },
    },
    {
      t: "How many times as much?",
      ic: "🍎",
      lines: [
        "An apple costs [36¢]. A banana costs [12¢].",
        "36 ÷ 12 = ? → 3 × 12 = 36.",
        "The apple costs [3 times] as much as the banana.",
      ],
      vis: howBar("Apple 🍎", 36, "Banana 🍌", 12),
    },
    {
      t: "Soccer cleats",
      ic: "⚽",
      lines: [
        "Cleats cost [$21], 3 times as much as shin guards.",
        "21 ÷ 3 = ? (or 21 = 3 × ?)",
        "21 ÷ 3 = 7. Shin guards cost [$7].",
      ],
      vis: partBar("Cleats", 21, 3, "Shin guards"),
    },
    {
      t: "Multiply or divide?",
      ic: "🤔",
      lines: [
        "I know the [small] amount → [multiply] to find the big one.",
        "I know the [big] amount → [divide] to find the small one.",
        "I know both → [divide] to find how many times.",
      ],
      vis: {
        kind: "lines",
        rows: ["10 × 5 = ? → 50", "50 ÷ 5 = ? → 10", "50 ÷ 10 = ? → 5 times"],
      },
    },
  ],

  games: [
    {
      k: "divide",
      t: "Divide to compare",
      en: "Find the small number",
      ic: "➗",
      items: [
        [36, 4],
        [42, 7],
        [30, 5],
        [64, 8],
        [27, 9],
        [48, 6],
        [80, 10],
        [18, 2],
      ].map(([big, n]) => ({
        type: "num",
        q: `${big} is ${n} times as much as ?`,
        pre: `${big} ÷ ${n} =`,
        a: big / n,
        vis: partBar("", big, n, ""),
        x: `${big} ÷ ${n} = [${big / n}] because ${n} × ${big / n} = ${big}.`,
      })),
    },
    {
      k: "which",
      t: "Multiply or divide?",
      en: "What do you know?",
      ic: "🤔",
      items: [
        [
          "A dog weighs 8 kg. A man weighs 9 times as much. How much does the man weigh?",
          "Multiply",
          "8 × 9",
        ],
        [
          "A man weighs 72 kg. That is 9 times as much as his dog. How much does the dog weigh?",
          "Divide",
          "72 ÷ 9",
        ],
        [
          "A pen costs $3. A book costs 6 times as much. How much is the book?",
          "Multiply",
          "6 × 3",
        ],
        [
          "A book costs $18. That is 6 times as much as a pen. How much is the pen?",
          "Divide",
          "18 ÷ 6",
        ],
        [
          "Sam has 40 cards. Lee has 8 cards. How many times as many cards does Sam have?",
          "Divide",
          "40 ÷ 8",
        ],
        [
          "Lee has 8 cards. Sam has 5 times as many. How many cards does Sam have?",
          "Multiply",
          "5 × 8",
        ],
      ].map(([q, a, e]) => ({
        type: "mc",
        q,
        opts:
          a === "Multiply" ? ["Multiply", "Divide"] : ["Divide", "Multiply"],
        keep: ["Multiply", "Divide"],
        icons: a === "Multiply" ? ["✖️", "➗"] : ["➗", "✖️"],
        two: true,
        vis: { kind: "lines", rows: [e + " = ?"] },
        x:
          a === "Multiply"
            ? `I know the [small] amount: ${e}.`
            : `I know the [big] amount: ${e}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 117–120",
      t: "Be Curious",
      en: "Gloves and a coat",
      ic: "🧤",
      from: "Book p. 117 · Be Curious",
      keep: true,
      items: [
        prob(
          "How many pairs of gloves cost the same as the coat?",
          5,
          null,
          "pairs",
          "Count them: [5] pairs. The coat costs 5 times as much as a pair of gloves.",
          { img: "curious" },
        ),
        {
          type: "open",
          q: "Tell me everything you can.",
          img: "curious",
          // unverified: the book gives no answer for p. 117
          a: "5 pairs of gloves cost the same as 1 coat. The coat costs 5 times as much as a pair of gloves. To find the price of the gloves, divide the price of the coat by 5.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 117–120",
      t: "Learn: the coat and the gloves",
      en: "50 ÷ 5 = ?",
      ic: "🧥",
      from: "Book p. 118 · Learn",
      keep: true,
      items: [
        prob(
          "A winter coat costs $50. It costs 5 times as much as a pair of gloves. How much does a pair of gloves cost?",
          10,
          partBar("Coat 🧥", 50, 5, "Gloves 🧤"),
          "",
          "50 ÷ 5 = [10]: the gloves cost $10.",
          { pre: "$" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 117–120",
      t: "Work Together",
      en: "An apple and a banana",
      ic: "🍎",
      from: "Book p. 118 · Work Together",
      keep: true,
      items: [
        prob(
          "An apple costs 36¢. A banana costs 12¢. How many times as much does the apple cost?",
          3,
          howBar("Apple 🍎", 36, "Banana 🍌", 12),
          "times as much",
          "36 ÷ 12 = [3]",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 117–120",
      t: "On My Own 1–4",
      en: "What is the unknown number?",
      ic: "🔍",
      from: "Book p. 119 · On My Own 1–4",
      keep: true,
      items: [
        prob(
          "24 is 8 times as much as ?.",
          3,
          partBar("", 24, 8, ""),
          "",
          "24 ÷ 8 = [3]",
          { pre: "24 ÷ 8 =" },
        ),
        prob(
          "20 is ? times as much as 5.",
          4,
          howBar("", 20, "", 5),
          "",
          "20 ÷ 5 = [4]",
          { pre: "20 ÷ 5 =" },
        ),
        prob(
          "18 is ? times as much as 6.",
          3,
          howBar("", 18, "", 6),
          "",
          "18 ÷ 6 = [3]",
          { pre: "18 ÷ 6 =" },
        ),
        prob(
          "16 is 4 times as much as ?.",
          4,
          partBar("", 16, 4, ""),
          "",
          "16 ÷ 4 = [4]",
          { pre: "16 ÷ 4 =" },
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 117–120",
      t: "On My Own 5–7",
      en: "Bar diagram and division",
      ic: "📊",
      from: "Book p. 119 · On My Own 5–7",
      keep: true,
      items: [
        prob(
          "A green string is 48 inches long. A red string is 8 inches long. How many times as long is the green string?",
          6,
          howBar("Green", 48, "Red", 8),
          "times as long",
          "48 ÷ 8 = [6]",
        ),
        prob(
          "Ellie has 50 blue blocks. She has 5 times as many blue blocks as white blocks. How many white blocks does she have?",
          10,
          partBar("Blue", 50, 5, "White"),
          "white blocks",
          "50 ÷ 5 = [10]",
        ),
        {
          type: "multi",
          q: "Charlie read 36 pages, 4 times as many pages as his sister. Which equations show the problem? Choose all.",
          opts: [
            { t: "4 × ? = 36", ok: true, emoji: "✖️" },
            { t: "36 ÷ 4 = ?", ok: true, emoji: "➗" },
            { t: "36 + 4 = ?", emoji: "➕" },
            { t: "36 − 4 = ?", emoji: "➖" },
            { t: "4 × 36 = ?", emoji: "🤔" },
            { t: "? ÷ 4 = 36", emoji: "🤔" },
          ],
        },
      ],
    },
    {
      k: "own8",
      g: "📗 Book · p. 117–120",
      t: "On My Own 8–12",
      en: "Think it through",
      ic: "🧠",
      from: "Book p. 120 · On My Own 8–12",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Michael scored 80 points. His score is 4 times as much as Alicia's. Michael thinks Alicia scored 320 points. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: partBar("Michael", 80, 4, "Alicia"),
          x: "Michael's score is the [big] one, so [divide]: 80 ÷ 4 = 20. He multiplied (4 × 80 = 320).",
        },
        prob(
          "Michael scored 80 points, 4 times as much as Alicia. How many points did Alicia score?",
          20,
          partBar("Michael", 80, 4, "Alicia"),
          "points",
          "80 ÷ 4 = [20]",
        ),
        prob(
          "A garden is 3 times as long as it is wide. The length is 9 feet. How wide is the garden?",
          3,
          partBar("Length", 9, 3, "Width"),
          "feet",
          "9 ÷ 3 = [3]",
        ),
        prob(
          "John ran 18 laps. That is twice as far as Mika and Sabrina together. Sabrina ran 5 laps. How many laps did Mika run?",
          4,
          partBar("John", 18, 2, "Mika + Sabrina"),
          "laps",
          "18 ÷ 2 = 9 laps together. 9 − 5 = [4] laps for Mika.",
        ),
        prob(
          "The airport is 5 times farther from Cory's home than the library. The airport is 30 miles away. How far is the library?",
          6,
          partBar("Airport ✈️", 30, 5, "Library 📚"),
          "miles",
          "30 ÷ 5 = [6]",
        ),
        {
          type: "open",
          q: "Write a word problem about a comparison that you can solve with 35 ÷ 5 = ?. Then solve it.",
          vis: { kind: "lines", rows: ["35 ÷ 5 = ?"] },
          // unverified: a model answer, the book gives none
          a: "A book costs $35. It costs 5 times as much as a pen. How much is the pen? 35 ÷ 5 = 7: the pen costs $7.",
        },
        {
          type: "open",
          q: "Reflect: When you solve problems like these, how do you know you need to divide?",
          vis: partBar("", 50, 5, ""),
          // unverified: a model answer, the book gives none
          a: "I divide when I know the bigger amount and look for the smaller one, or when I look for how many times as much one amount is.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 33–34",
      t: "Additional Practice 1–6",
      en: "Lesson 4-4",
      ic: "📘",
      from: "Practice Book p. 33–34",
      keep: true,
      items: [
        {
          type: "mc",
          q: "36 is 9 times as much as ?. Which division equation is right?",
          opts: ["36 ÷ 9 = 4", "36 ÷ 9 = 6", "36 ÷ 9 = 3", "36 ÷ 9 = 9"],
          keep: ["36 ÷ 9 = 6", "36 ÷ 9 = 3", "36 ÷ 9 = 4", "36 ÷ 9 = 9"],
          vis: partBar("", 36, 9, ""),
          x: "9 × 4 = 36, so [36 ÷ 9 = 4] (C).",
        },
        {
          type: "mc",
          q: "48 feet is 6 times as long as ?. Which division equation is right?",
          opts: ["48 ÷ 6 = 8", "48 ÷ 6 = 6", "48 ÷ 6 = 12", "48 ÷ 6 = 4"],
          keep: ["48 ÷ 6 = 8", "48 ÷ 6 = 6", "48 ÷ 6 = 12", "48 ÷ 6 = 4"],
          vis: partBar("", 48, 6, ""),
          x: "6 × 8 = 48, so [48 ÷ 6 = 8] (A).",
        },
        prob(
          "Peta cuts a string 32 inches long to make a necklace. A necklace is 4 times longer than a bracelet. How long is a bracelet?",
          8,
          partBar("Necklace", 32, 4, "Bracelet"),
          "inches",
          "32 ÷ 4 = [8]",
        ),
        prob(
          "A food drive fills 27 boxes. This is 3 times as many boxes as last year. How many boxes did they fill last year?",
          9,
          partBar("This year", 27, 3, "Last year"),
          "boxes",
          "27 ÷ 3 = [9]",
        ),
        prob(
          "Kai'noa uses 6 cups of flour and 2 cups of sugar. How many times more flour does he use than sugar?",
          3,
          howBar("Flour", 6, "Sugar", 2),
          "times more",
          "6 ÷ 2 = [3]",
        ),
        prob(
          "Suzanna bakes 45 muffins. This is 5 times the number the original recipe makes. How many muffins does the original recipe make?",
          9,
          partBar("Suzanna", 45, 5, "Recipe"),
          "muffins",
          "45 ÷ 5 = [9]",
        ),
      ],
    },
  ],
};
