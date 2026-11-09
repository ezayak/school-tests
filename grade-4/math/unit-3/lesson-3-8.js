// Math · Grade 4 · Lesson 3-8 « Represent and Solve Multi-Step Problems » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 89–92, Student Practice Book p. 23–24. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Each problem is cut into steps (shared/math-kit.js step: the equation is shown, the answer worked out), with bar diagrams.
const { fmt, step, sumBar, value } = MathKit;
// "Level 2 is 2,700 fewer than Level 1": two bars, the second shorter
const fewerBar = (la, a, lb, d) => ({
  kind: "bar",
  rows: [
    { l: la, segs: [{ t: fmt(a), v: a }] },
    {
      l: lb,
      segs: [
        { t: "?", q: true, v: a - d },
        { t: `${fmt(d)} fewer`, v: d, c: 3 },
      ],
    },
  ],
});
const moreBar2 = (la, a, lb, d) => ({
  kind: "bar",
  rows: [
    { l: la, segs: [{ t: fmt(a), v: a }] },
    {
      l: lb,
      segs: [
        { t: fmt(a), v: a },
        { t: `${fmt(d)} more`, v: Math.max(d, a / 4), c: 2 },
      ],
      brace: { t: "?", q: true },
    },
  ],
});

window.LESSON = {
  n: "3-8",
  key: "math4-l3-8",
  grade: 4,
  title: "Problems in Steps",
  en: "Solve a problem one step at a time, with bar diagrams and letters for the unknowns",
  unit: "Unit 3 · Lesson 3-8",
  book: "Book p. 89–92 · Practice Book p. 23–24",
  imgDir: "img/lesson-3-8",
  cover: "curious",
  question: {
    q: "How do I solve a problem with [many steps]?",
    a: "Find one unknown at a time. Give it a [letter]: s = 9,200 − 2,700 = 6,500. Then use it in the next step, until you find what the question asks.",
    img: "curious",
  },
  words: [
    { w: "Multi-step problem", m: "a problem you solve in two or more steps" },
    { w: "Variable", m: "a letter for a number we don't know yet: s, t, f" },
    { w: "Fewer", m: "less: 2,700 fewer → subtract" },
    { w: "Bar diagram", m: "bars that show the numbers in a problem" },
    { w: "Equation", m: "a number sentence with =: s = 9,200 − 2,700" },
  ],
  ideas: [
    {
      t: "What's the question?",
      ic: "🎮",
      img: "curious",
      lines: [
        "Tori played three levels of a video game.",
        "The bars show her scores: Level 1 is the [longest].",
        "A question: what was her [total] score?",
      ],
    },
    {
      t: "Step 1: Level 2",
      ic: "1️⃣",
      lines: [
        "Level 1: 9,200 points. Level 2: [2,700 fewer].",
        "s = 9,200 − 2,700",
        "s = [6,500] points.",
      ],
      vis: fewerBar("Level 1", 9200, "Level 2", 2700),
    },
    {
      t: "Step 2: Level 3",
      ic: "2️⃣",
      lines: [
        "Level 3: [1,980 fewer] than Level 2.",
        "t = 6,500 − 1,980",
        "t = [4,520] points.",
      ],
      vis: fewerBar("Level 2", 6500, "Level 3", 1980),
    },
    {
      t: "Step 3: the total",
      ic: "3️⃣",
      lines: [
        "f = 9,200 + 6,500 + 4,520",
        "f = [20,220].",
        "Tori's final score is 20,220 points.",
      ],
      vis: sumBar(
        [
          ["", 9200],
          ["", 6500],
          ["", 4520],
        ],
        "?",
      ),
    },
    {
      t: "Work backwards",
      ic: "⏪",
      lines: [
        "At the end there are 13,807 people. 2,011 left, so before that: 13,807 [+] 2,011.",
        "People who arrived: take them away again ([−]).",
        "Undo each step from the end to the start.",
      ],
      vis: { kind: "lines", rows: ["? + 1,120 + 8,456 − 2,011 = 13,807"] },
    },
  ],

  games: [
    {
      k: "steps",
      keep: true,
      t: "Step by step",
      en: "Two-step problems",
      ic: "🪜",
      items: [
        step(
          "Ana has 4,500 stickers. Ben has 1,250 fewer. How many does Ben have?",
          "4,500 − 1,250",
          "stickers",
          { vis: fewerBar("Ana", 4500, "Ben", 1250) },
        ),
        step(
          "Ana 4,500 and Ben 3,250. How many do they have together?",
          "4,500 + 3,250",
          "stickers",
        ),
        step(
          "A farm has 2,340 hens. It buys 860 more. How many hens now?",
          "2,340 + 860",
          "hens",
          { vis: moreBar2("Before", 2340, "Now", 860) },
        ),
        step(
          "Then 1,150 hens are sold. How many are left?",
          "3,200 − 1,150",
          "hens",
        ),
        step(
          "A shop had 6,000 pens. It sold 2,480 on Monday and 1,920 on Tuesday. How many were sold?",
          "2,480 + 1,920",
          "pens",
        ),
        step(
          "6,000 pens, 4,400 sold. How many are left?",
          "6,000 − 4,400",
          "pens",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 89–92",
      t: "Be Curious",
      en: "Tori's video game",
      ic: "🎮",
      from: "Book p. 89 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Tori played the first three levels of a video game. What's the question?",
          img: "curious",
          // unverified: no key for this lesson
          a: "How many points did Tori score in each level? What was her total score after the three levels? How many fewer points did she get in Level 3 than in Level 1?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 89–92",
      t: "Learn: Tori's score",
      en: "Three steps",
      ic: "🎮",
      from: "Book p. 90 · Learn",
      keep: true,
      items: [
        step(
          "Step 1: Level 1 was 9,200 points. Level 2 was 2,700 fewer. s = ?",
          "9,200 − 2,700",
          "points",
          { vis: fewerBar("Level 1", 9200, "Level 2", 2700) },
        ),
        step(
          "Step 2: Level 3 was 1,980 fewer than Level 2 (6,500). t = ?",
          "6,500 − 1,980",
          "points",
          { vis: fewerBar("Level 2", 6500, "Level 3", 1980) },
        ),
        step(
          "Step 3: Tori's final score. f = ?",
          "9,200 + 6,500 + 4,520",
          "points",
          {
            vis: sumBar(
              [
                ["", 9200],
                ["", 6500],
                ["", 4520],
              ],
              "?",
            ),
          },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 89–92",
      t: "Work Together",
      en: "The soccer stadium",
      ic: "🤝",
      from: "Book p. 90 · Work Together",
      keep: true,
      items: [
        step(
          "Some people were at the stadium. 1,120 came, then 8,456 came, then 2,011 left. Now there are 13,807. Work backwards: how many were there before 2,011 left?",
          "13,807 + 2,011",
          "people",
        ),
        step("Before the 8,456 came?", "15,818 − 8,456", "people"),
        step(
          "Before the 1,120 came: how many were there when the game started?",
          "7,362 − 1,120",
          "people",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 89–92",
      t: "On My Own 1–4",
      en: "Problems in steps",
      ic: "🪜",
      from: "Book p. 91 · On My Own 1–4",
      keep: true,
      items: [
        step(
          "The king's costume needs 3,250 sequins. The queen's needs 1,750 more. How many for the queen?",
          "3,250 + 1,750",
          "sequins",
          { vis: moreBar2("King", 3250, "Queen", 1750) },
        ),
        step(
          "The jester's needs 750 fewer than the queen's (5,000). How many for the jester?",
          "5,000 − 750",
          "sequins",
          { vis: fewerBar("Queen", 5000, "Jester", 750) },
        ),
        step(
          "How many sequins for all three costumes?",
          "3,250 + 5,000 + 4,250",
          "sequins",
        ),
        step(
          "550 students eat in four picnic areas: Giraffe Jump 217, Manatee Munch 138, Gorilla Garden 97. How many in these three?",
          "217 + 138 + 97",
          "students",
        ),
        step(
          "How many students eat at Flamingo Feast?",
          "550 − 452",
          "students",
          {
            vis: sumBar(
              [
                ["217", 217],
                ["138", 138],
                ["97", 97],
                ["", "?"],
              ],
              550,
            ),
          },
        ),
        step(
          "A teacher had 140 jars of paint. Her students used 95 in the first half of the year. How many were left?",
          "140 − 95",
          "jars",
        ),
        step(
          "She bought 35 more jars. How many did she have then?",
          "45 + 35",
          "jars",
        ),
        step(
          "At the end of the year 15 jars were left. How many did the students use in the second half?",
          "80 − 15",
          "jars",
        ),
        step(
          "The cafeteria gave out 940 cartons of milk at breakfast and 1,670 at lunch. How many in all?",
          "940 + 1,670",
          "cartons",
        ),
        step(
          "7,036 cartons were left at the end of the day. How many were there at the start?",
          "7,036 + 2,610",
          "cartons",
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 89–92",
      t: "On My Own 5–6",
      en: "Fish and Gina's steps",
      ic: "🐟",
      from: "Book p. 92 · On My Own 5–6",
      keep: true,
      items: [
        step(
          "Sonar counted fish in four schools: 234, 536, 1,112 and 189. How many fish?",
          "234 + 536 + 1,112 + 189",
          "fish",
        ),
        {
          type: "tf",
          q: "The sonar can be wrong by 10 fish for every 1,000 fish. It counted 2,071. Could there really be 2,090 fish?",
          a: true,
          yes: ["Yes, it could", "No, it couldn't"],
          vis: {
            kind: "lines",
            rows: ["2,071 fish", "about 2,000 → wrong by up to about 20"],
          },
          // unverified: no key; read as "up to about 20 fish too many or too few for 2,071"
          x: "2,071 fish ≈ 2 thousands, so the count can be wrong by about [20]. 2,090 − 2,071 = 19: reasonable.",
        },
        {
          type: "open",
          q: "Gina wrote: 5,700 − 2,200 = 3,500. 3,500 − 1,545 = 1,955. 5,700 + 3,500 + 1,955 = 11,155. Write a word problem for these steps.",
          vis: {
            kind: "lines",
            rows: [
              "5,700 − 2,200 = 3,500",
              "3,500 − 1,545 = 1,955",
              "5,700 + 3,500 + 1,955 = 11,155",
            ],
          },
          // unverified: a model answer; many problems fit
          a: "A shop sold 5,700 cups in May. In June it sold 2,200 fewer cups than in May. In July it sold 1,545 fewer than in June. How many cups did it sell in the three months? (11,155 cups)",
        },
        {
          type: "open",
          q: "Reflect: How do you decide whether to write an addition or a subtraction equation for each step?",
          vis: {
            kind: "lines",
            rows: [
              "more, together, in all → +",
              "fewer, left, how many more → −",
            ],
          },
          // unverified: a model answer, the book gives none
          a: "I look at the words and the bar diagram. Parts put together (in all, total, more) → I add. Fewer, left, or how many more → I subtract.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 23–24",
      t: "Additional Practice 1–4",
      en: "Lesson 3-8",
      ic: "📘",
      from: "Practice Book p. 23–24",
      keep: true,
      items: [
        step(
          "Batch 1 had 7,355 flyers. Batch 2 had 1,690 fewer. How many in batch 2?",
          "7,355 − 1,690",
          "flyers",
          { vis: fewerBar("Batch 1", 7355, "Batch 2", 1690) },
        ),
        step(
          "Batch 3 had 895 fewer than batch 2. How many in batch 3?",
          "5,665 − 895",
          "flyers",
        ),
        step("How many flyers in all?", "7,355 + 5,665 + 4,770", "flyers"),
        step(
          "625 students in four groups: Blue 144, Green 162, Yellow 155. How many in these three?",
          "144 + 162 + 155",
          "students",
        ),
        step(
          "How many students are in the red group?",
          "625 − 461",
          "students",
        ),
        step(
          "A food bank collected 3,887 items. The next month 997 more. How many in the second month?",
          "3,887 + 997",
          "items",
        ),
        step(
          "The third month: 572 fewer than the first month. How many?",
          "3,887 − 572",
          "items",
        ),
        step(
          "How many items in the three months?",
          "3,887 + 4,884 + 3,315",
          "items",
        ),
        step(
          "Opening weekend: 15,276 visitors. The next weekend: 1,231 fewer. How many?",
          "15,276 − 1,231",
          "visitors",
        ),
        step(
          "The third weekend: 765 more than the second. How many?",
          "14,045 + 765",
          "visitors",
        ),
        step(
          "How many visitors in the three weekends?",
          "15,276 + 14,045 + 14,810",
          "visitors",
        ),
      ],
    },
  ],
};
// the steps above use the answer of the step before: check the chain here (a wrong number throws when the page loads)
[
  ["9,200 − 2,700", 6500],
  ["6,500 − 1,980", 4520],
  ["13,807 + 2,011", 15818],
  ["15,818 − 8,456", 7362],
  ["3,250 + 1,750", 5000],
  ["5,000 − 750", 4250],
  ["217 + 138 + 97", 452],
  ["140 − 95", 45],
  ["45 + 35", 80],
  ["940 + 1,670", 2610],
  ["7,355 − 1,690", 5665],
  ["5,665 − 895", 4770],
  ["144 + 162 + 155", 461],
  ["3,887 + 997", 4884],
  ["3,887 − 572", 3315],
  ["15,276 − 1,231", 14045],
  ["14,045 + 765", 14810],
].forEach(([e, v]) => {
  if (value(e) !== v) throw new Error(`lesson-3-8: ${e} is not ${v}`);
});
