// Math · Grade 4 · Lesson 4-2 « Represent Comparison Problems » (Reveal Math, Unit 4).
// Sources: Student Edition Vol. 1 p. 109–112, Student Practice Book p. 29–30, Term 1 sheets: the teacher's key for p. 111–112
// (20261028-L_4-2.pdf, every answer matches) and Extra Practice 4-2 (20261028-Extra_Practice_-_L4-2.pdf). Log: grade-4/math/SOURCES.md.
// Drawings: bar (the bar diagram: a "more" part in another colour, or the same bar repeated), lines.
const fmt = (n) => n.toLocaleString("en-US");
// bar diagrams: "lb has m more than la" and "lb has n times as many as la"; the unknown is the brace with "?"
const moreBar = (la, a, lb, m) => ({
  kind: "bar",
  rows: [
    { l: la, segs: [{ t: fmt(a), v: a }] },
    {
      l: lb,
      segs: [
        { t: fmt(a), v: a },
        { t: `${m} more`, v: Math.max(m, a / 3), c: 2 },
      ],
      brace: { t: "?", q: true },
    },
  ],
});
const timesBar = (la, a, lb, n) => ({
  kind: "bar",
  rows: [
    { l: la, segs: [{ t: fmt(a) }] },
    { l: lb, seg: { t: fmt(a) }, times: n, brace: { t: "?", q: true } },
  ],
});
// a word problem: type the answer; x = the equation
const prob = (q, a, vis, post, x, more = {}) => ({
  type: "num",
  q,
  a,
  vis,
  post,
  x,
  ...more,
});
// which equation shows the comparison? (the right one first)
const eq = (q, right, wrong, x) => ({
  type: "mc",
  q,
  opts: [right, ...wrong],
  vis: { kind: "lines", rows: [q.replace(/^Which equation\?\s*/, "")] },
  x,
});

window.LESSON = {
  n: "4-2",
  key: "math4-l4-2",
  grade: 4,
  title: "More Than or Times as Many?",
  en: "Add for “more than”, multiply for “times as many”: bar diagrams and equations",
  unit: "Unit 4 · Lesson 4-2",
  book: "Book p. 109–112 · Practice Book p. 29–30",
  imgDir: "img/lesson-4-2",
  cover: "curious",
  question: {
    q: "What is different between [more than] and [times as many]?",
    a: "[More than]: add. 4 more than 6 is 6 + 4 = 10. [Times as many]: multiply. 4 times as many as 6 is 4 × 6 = 24.",
    img: "curious",
  },
  words: [
    { w: "Compare", m: "say how two amounts are different" },
    { w: "More than", m: "add: 4 more than 6 is 6 + 4 = 10" },
    { w: "Times as many", m: "multiply: 4 times as many as 6 is 4 × 6 = 24" },
    {
      w: "Additive comparison",
      m: "compares by telling how many more: an addition equation",
    },
    {
      w: "Multiplicative comparison",
      m: "compares by telling how many times: a multiplication equation",
    },
    { w: "Bar diagram", m: "bars that show the amounts in a problem" },
    { w: "Equation", m: "a number sentence with =, like 4 × 6 = 24" },
  ],
  ideas: [
    {
      t: "Julie's shells",
      ic: "🐚",
      img: "curious",
      lines: [
        "Julie has [10] shells.",
        "Mark has [4 times as many]: 4 × 10 = 40 shells.",
        "Jamal has [4 more]: 10 + 4 = 14 shells. Both use 4, but they are [different]!",
      ],
    },
    {
      t: "4 more: add",
      ic: "➕",
      lines: [
        "Jackson biked 6 miles. Karen biked [4 more] miles.",
        "Karen's bar = Jackson's bar + a piece of 4.",
        "6 + 4 = [10]. Karen biked 10 miles.",
      ],
      vis: moreBar("Jackson", 6, "Karen", 4),
    },
    {
      t: "4 times as many: multiply",
      ic: "✖️",
      lines: [
        "Terry biked [4 times as many] miles as Jackson.",
        "Terry's bar = Jackson's bar [4 times].",
        "4 × 6 = [24]. Terry biked 24 miles.",
      ],
      vis: timesBar("Jackson", 6, "Terry", 4),
    },
    {
      t: "Which one is it?",
      ic: "🔎",
      lines: [
        "“more than”, “more … than” → [additive] comparison → [+]",
        "“times as many”, “times as long”, “times as far” → [multiplicative] comparison → [×]",
        "Read the words carefully!",
      ],
      vis: {
        kind: "lines",
        rows: ["4 more than 6 → 6 + 4", "4 times as many as 6 → 4 × 6"],
      },
    },
    {
      t: "Two in one problem",
      ic: "🏀",
      lines: [
        "Elliot scored 9 points.",
        "Michael scored [2 times as many]: 2 × 9 = 18.",
        "Deanna scored [6 more]: 9 + 6 = 15.",
      ],
      vis: {
        kind: "bar",
        rows: [
          { l: "Elliot", segs: [{ t: "9" }] },
          { l: "Michael", seg: { t: "9" }, times: 2, brace: { t: "18" } },
          {
            l: "Deanna",
            segs: [
              { t: "9", v: 1 },
              { t: "6 more", v: 0.67, c: 2 },
            ],
            brace: { t: "15" },
          },
        ],
      },
    },
    {
      t: "Same answer, different way",
      ic: "🥾",
      lines: [
        "Nick hikes 2 miles. Logan hikes [4 more]: 2 + 4 = 6.",
        "Ava hikes [3 times as many]: 2 × 3 = 6.",
        "Both 6 miles, but one [adds] and one [multiplies].",
      ],
      vis: {
        kind: "lines",
        rows: ["2 + 4 = 6", "2 × 3 = 6"],
      },
    },
  ],

  games: [
    {
      k: "which",
      t: "Add or multiply?",
      en: "Pick the equation",
      ic: "🔎",
      items: [
        [3, "more than", 7],
        [3, "times as many as", 7],
        [5, "more than", 8],
        [5, "times as many as", 8],
        [2, "times as long as", 9],
        [9, "more than", 2],
        [6, "times as far as", 4],
        [10, "more than", 6],
      ].map(([a, w, b]) => {
        const add = w === "more than";
        const plus = `${b} + ${a} = ${a + b}`,
          times = `${a} × ${b} = ${a * b}`;
        return {
          type: "mc",
          q: `${a} ${w} ${b}`,
          opts: add ? [plus, times] : [times, plus],
          two: true,
          vis: add ? moreBar("", b, "", a) : timesBar("", b, "", a),
          x: add
            ? "[More than]: add."
            : "[Times as many / long / far]: multiply.",
        };
      }),
    },
    {
      k: "solve",
      t: "Solve it",
      en: "More than or times as many",
      ic: "🧮",
      items: [
        [4, "times as many as", 5],
        [4, "more than", 5],
        [3, "times as many as", 8],
        [8, "more than", 12],
        [5, "times as many as", 6],
        [7, "more than", 30],
        [2, "times as many as", 25],
        [10, "times as many as", 7],
      ].map(([a, w, b]) => {
        const add = w === "more than";
        return {
          type: "num",
          q: `What is ${a} ${w} ${b}?`,
          a: add ? a + b : a * b,
          vis: add ? moreBar("", b, "", a) : timesBar("", b, "", a),
          x: add ? `${b} + ${a} = ${a + b}` : `${a} × ${b} = ${a * b}`,
        };
      }),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 109–112",
      t: "Be Curious",
      en: "Julie's shells",
      ic: "🐚",
      from: "Book p. 109 · Be Curious",
      keep: true,
      items: [
        prob(
          "Count Julie's shells. Mark has 4 times as many shells as Julie. How many shells does Mark have?",
          40,
          null,
          "shells",
          "Julie has 10. 4 × 10 = [40].",
          { img: "curious" },
        ),
        prob(
          "Jamal has 4 more shells than Julie. How many shells does Jamal have?",
          14,
          null,
          "shells",
          "10 + 4 = [14].",
          { img: "curious" },
        ),
        {
          type: "open",
          q: "How are Mark's and Jamal's shells the same? How are they different?",
          img: "curious",
          // unverified: the book gives no answer for p. 109
          a: "Both compare with Julie's 10 shells and both use the number 4. But Mark has 4 times as many (4 × 10 = 40) and Jamal has only 4 more (10 + 4 = 14).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 109–112",
      t: "Learn: Jackson, Karen, Terry",
      en: "4 more and 4 times as many",
      ic: "🚲",
      from: "Book p. 110 · Learn",
      keep: true,
      items: [
        prob(
          "Jackson biked 6 miles. Karen biked 4 more miles than Jackson. How many miles did Karen bike?",
          10,
          moreBar("Jackson", 6, "Karen", 4),
          "miles",
          "6 + 4 = [10]: an [additive] comparison.",
        ),
        prob(
          "Terry biked 4 times as many miles as Jackson. How many miles did Terry bike?",
          24,
          timesBar("Jackson", 6, "Terry", 4),
          "miles",
          "4 × 6 = [24]: a [multiplicative] comparison.",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 109–112",
      t: "Work Together",
      en: "Elliot, Michael and Deanna",
      ic: "🏀",
      from: "Book p. 110 · Work Together",
      keep: true,
      items: [
        prob(
          "Elliot scored 9 points. Michael scored 2 times as many points as Elliot. How many points did Michael score?",
          18,
          timesBar("Elliot", 9, "Michael", 2),
          "points",
          "2 × 9 = [18]",
        ),
        prob(
          "Deanna scored 6 more points than Elliot. How many points did Deanna score?",
          15,
          moreBar("Elliot", 9, "Deanna", 6),
          "points",
          "9 + 6 = [15]",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 109–112",
      t: "On My Own 1–4",
      en: "Write the equation",
      ic: "✍️",
      from: "Book p. 111 · On My Own 1–4",
      keep: true,
      items: [
        eq(
          "Which equation? 8 more than 4",
          "4 + 8 = 12",
          ["4 × 8 = 32", "8 − 4 = 4"],
          "[More than]: add.",
        ),
        eq(
          "Which equation? 3 times as many as 5",
          "3 × 5 = 15",
          ["3 + 5 = 8", "5 − 3 = 2"],
          "[Times as many]: multiply.",
        ),
        eq(
          "Which equation? 2 times as long as 9 feet",
          "2 × 9 = 18",
          ["2 + 9 = 11", "9 − 2 = 7"],
          "[Times as long]: multiply. 18 feet.",
        ),
        eq(
          "Which equation? 5 times as far as 10 miles",
          "5 × 10 = 50",
          ["5 + 10 = 15", "10 − 5 = 5"],
          "[Times as far]: multiply. 50 miles.",
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 109–112",
      t: "On My Own 5–8",
      en: "Bar diagram and equation",
      ic: "📊",
      from: "Book p. 111–112 · On My Own 5–8",
      keep: true,
      items: [
        prob(
          "A small bridge is 40 feet long. A new bridge is 3 times as long as the small bridge. How long is the new bridge?",
          120,
          timesBar("Small", 40, "New", 3),
          "feet",
          "3 × 40 = [120]",
        ),
        prob(
          "Raya has 8 pencils in her school box. Miranda has 4 more pencils than Raya. How many pencils does Miranda have?",
          12,
          moreBar("Raya", 8, "Miranda", 4),
          "pencils",
          "8 + 4 = [12]",
        ),
        prob(
          "Louisa is 5 feet tall. The tree in her backyard is 4 times as tall as Louisa. How tall is the tree?",
          20,
          timesBar("Louisa", 5, "Tree", 4),
          "feet",
          "4 × 5 = [20]",
        ),
        prob(
          "Ameer planted 6 plants. David planted 5 times as many. How many plants did David plant?",
          30,
          timesBar("Ameer", 6, "David", 5),
          "plants",
          "5 × 6 = [30]",
        ),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 109–112",
      t: "On My Own 9–12",
      en: "Think about comparisons",
      ic: "🧠",
      from: "Book p. 112 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Rosa scored 8 points. Her brother scored 2 points. Which two comparisons are right?",
          opts: [
            {
              t: "Rosa scored 4 times as many points as her brother.",
              ok: true,
              emoji: "🏆",
            },
            {
              t: "Rosa scored 6 more points than her brother.",
              ok: true,
              emoji: "🏆",
            },
            {
              t: "Her brother scored 4 times as many points as Rosa.",
              emoji: "🏆",
            },
            { t: "Rosa scored 10 more points than her brother.", emoji: "🏆" },
          ],
        },
        prob(
          "A cat's tail can be 10 inches long. A lion's tail can be 3 times as long. How long can a lion's tail be?",
          30,
          timesBar("Cat 🐈", 10, "Lion 🦁", 3),
          "inches",
          "3 × 10 = [30]",
        ),
        {
          type: "tf",
          q: "Naomi wants 3 bookcases along a 7-foot wall. Each bookcase is 4 feet wide. She says they fit, because 7 feet is 3 times longer than 4 feet. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: timesBar("1 bookcase", 4, "3 bookcases", 3),
          x: "7 feet is only [3 feet longer] than 4 feet, not 3 times. 3 bookcases need 3 × 4 = [12] feet.",
        },
        {
          type: "open",
          q: "Write a comparison problem for 9 + 7 = ? and another one for 9 × 7 = ?. Then solve them.",
          vis: { kind: "lines", rows: ["9 + 7 = ?", "9 × 7 = ?"] },
          // unverified: the key says "answers may vary"
          a: "Ann has 9 stickers. Ben has 7 more stickers than Ann: 9 + 7 = 16. Cara has 7 times as many stickers as Ann: 9 × 7 = 63.",
        },
        {
          type: "open",
          q: "Reflect: What differences did you notice between multiplicative and additive comparison problems?",
          vis: {
            kind: "lines",
            rows: ["4 more than 6 → 6 + 4", "4 times as many as 6 → 4 × 6"],
          },
          // unverified: the key says "answers may vary"
          a: "Additive problems say “more than”: I add. Multiplicative problems say “times as many”: I multiply, and the answer is much bigger.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 29–30",
      t: "Additional Practice 1–6",
      en: "Lesson 4-2",
      ic: "📘",
      from: "Practice Book p. 29–30",
      keep: true,
      items: [
        {
          type: "mc",
          q: "A small flagpole is 15 feet tall. A taller flagpole is 4 times as tall. Which equation tells how tall the taller flagpole is?",
          opts: ["15 × 4 = f", "15 + 4 = f"],
          two: true,
          vis: timesBar("Small", 15, "Tall", 4),
          x: "[4 times as tall]: multiply. f = 60 feet.",
        },
        {
          type: "mc",
          q: "Avery's green lizard eats 5 crickets. Her brown lizard eats 6 more crickets. Which equation tells how many the brown lizard eats?",
          opts: ["5 + 6 = c", "5 × 6 = c"],
          two: true,
          vis: moreBar("Green 🦎", 5, "Brown 🦎", 6),
          x: "[6 more]: add. c = 11 crickets.",
        },
        prob(
          "Twyla picks 8 flowers. Natalie picks 4 times as many flowers as Twyla. How many flowers does Natalie pick?",
          32,
          timesBar("Twyla", 8, "Natalie", 4),
          "flowers",
          "4 × 8 = [32]",
        ),
        prob(
          "Ava picks 12 more flowers than Twyla. How many flowers does Ava pick?",
          20,
          moreBar("Twyla", 8, "Ava", 12),
          "flowers",
          "8 + 12 = [20]",
        ),
        prob(
          "A flamingo at a zoo is 4 feet tall. A giraffe is 5 times as tall. How tall is the giraffe?",
          20,
          timesBar("Flamingo 🦩", 4, "Giraffe 🦒", 5),
          "feet",
          "5 × 4 = [20]",
        ),
        prob(
          // the book prints "as Celeb": a typo for Caleb
          "Caleb reads 7 pages a day. Nieves reads 3 times as many pages as Caleb. How many pages does Nieves read each day?",
          21,
          timesBar("Caleb", 7, "Nieves", 3),
          "pages",
          "3 × 7 = [21]",
        ),
        prob(
          "Tia has 9 math problems. Her brother has 3 times as many. How many problems does her brother have?",
          27,
          timesBar("Tia", 9, "Brother", 3),
          "problems",
          "3 × 9 = [27]",
        ),
        prob(
          "Tia has 9 math problems. Her sister has 6 more. How many problems does her sister have?",
          15,
          moreBar("Tia", 9, "Sister", 6),
          "problems",
          "9 + 6 = [15]",
        ),
      ],
    },
    {
      k: "sheet",
      g: "🏫 School",
      t: "Extra Practice 4-2",
      en: "The class sheet",
      ic: "🏫",
      from: "Extra Practice 4-2",
      keep: true,
      items: [
        prob("7 more than 9", 16, moreBar("", 9, "", 7), "", "9 + 7 = [16]"),
        prob("8 more than 11", 19, moreBar("", 11, "", 8), "", "11 + 8 = [19]"),
        prob(
          "6 times as long as 2 cm",
          12,
          timesBar("", 2, "", 6),
          "cm",
          "6 × 2 = [12]",
        ),
        prob(
          "4 times as many as 8",
          32,
          timesBar("", 8, "", 4),
          "",
          "4 × 8 = [32]",
        ),
        prob(
          "Brad baked 36 muffins. Adam baked 8 more muffins than Brad. How many muffins did Adam bake?",
          44,
          moreBar("Brad", 36, "Adam", 8),
          "muffins",
          "36 + 8 = [44]",
        ),
        prob(
          "Fred baked 2 times as many muffins as Adam (44). How many muffins did Fred bake?",
          88,
          timesBar("Adam", 44, "Fred", 2),
          "muffins",
          "2 × 44 = [88]",
        ),
        {
          type: "mc",
          q: "Molar plants 7 trees. Eric plants 4 times as many trees as Molar. Which expression shows how many trees Eric plants?",
          opts: ["4 × 7", "4 + 3", "5 + 7", "5 × 7"],
          keep: ["4 + 3", "5 + 7", "5 × 7", "4 × 7"],
          vis: timesBar("Molar", 7, "Eric", 4),
          x: "4 bars of 7 trees: [4 × 7].",
        },
        prob(
          "Eric plants 4 × 7 trees. How many trees does Eric plant?",
          28,
          timesBar("Molar", 7, "Eric", 4),
          "trees",
          "4 × 7 = [28]",
        ),
      ],
    },
  ],
};
