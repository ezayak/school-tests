// Math · Grade 4 · Lesson 2-3 « Compare Multi-Digit Numbers » (Reveal Math, Unit 2).
// Sources: Student Edition Vol. 1 p. 41–44, Student Practice Book p. 5–6, the teacher's key for p. 43–44 (Term 1/20260924-L_2-3.pdf, every answer matches).
// Log: grade-4/math/SOURCES.md. Comparisons are made by shared/math-kit.js (cmp: the sign worked out, the first different digit in yellow).
const { fmt, cmp, expanded } = MathKit;
// "Is the comparison true or false?"
const tfCmp = (a, s, b, x) => ({
  type: "tf",
  q: `Is it true? ${fmt(a)} ${s} ${fmt(b)}`,
  a: s === ">" ? a > b : s === "<" ? a < b : a === b,
  vis: cmp(a, b).vis,
  x,
});
// "Which number is greater / less?" (the right one first)
const pick = (q, right, wrong, x, more = {}) => ({
  type: "mc",
  q,
  opts: [right, ...wrong],
  vis: { kind: "lines", rows: [right, ...wrong].sort() },
  x,
  ...more,
});

window.LESSON = {
  n: "2-3",
  key: "math4-l2-3",
  grade: 4,
  title: "Compare Big Numbers",
  en: "Greater or less: compare the digits place by place, starting on the left",
  unit: "Unit 2 · Lesson 2-3",
  book: "Book p. 41–44 · Practice Book p. 5–6",
  imgDir: "img/lesson-2-3",
  cover: "curious",
  question: {
    q: "How do I [compare] two big numbers?",
    a: "Line them up and start on the [left]. The first place with [different] digits tells which number is greater: 10,295 [>] 10,229 because 9 tens > 2 tens.",
    img: "curious",
  },
  words: [
    { w: "Compare", m: "find which number is greater or less" },
    {
      w: "Greater than (>)",
      m: "bigger: 9 > 2. The open mouth eats the bigger number",
    },
    { w: "Less than (<)", m: "smaller: 2 < 9" },
    { w: "Equal to (=)", m: "the same: 47,215 = 47,215" },
    { w: "Place-value chart", m: "a table with one column for each place" },
    {
      w: "Leading digit",
      m: "the first digit on the left: in 12,621 it is 1 (ten thousands)",
    },
  ],
  ideas: [
    {
      t: "Who walked the most?",
      ic: "👟",
      img: "curious",
      lines: [
        "Gabe 10,463 · Roshni 10,229 · Jonah 10,295 steps.",
        "All three have 1 ten thousand and 0 thousands.",
        "Hundreds: [4] > 2. Gabe walked the [most] steps.",
      ],
    },
    {
      t: "One way: a place-value chart",
      ic: "📊",
      lines: [
        "Jonah 10,295 and Roshni 10,229: put them in the chart.",
        "Ten thousands, thousands, hundreds are the [same].",
        "Tens: [9 > 2], so 10,295 > 10,229. Jonah is right!",
      ],
      vis: cmp(10295, 10229).vis,
    },
    {
      t: "Another way: expanded form",
      ic: "➕",
      lines: [
        `10,295 = ${expanded(10295)}`,
        `10,229 = ${expanded(10229)}`,
        "[90] is greater than 20, so 10,295 > 10,229.",
      ],
      vis: { kind: "lines", rows: [expanded(10295), expanded(10229)] },
    },
    {
      t: "More digits = greater",
      ic: "🔢",
      lines: [
        "Roshni 245,821 steps, Jonah 43,068 steps.",
        "245,821 has [6] digits. 43,068 has [5] digits.",
        "245,821 [>] 43,068: Roshni walked more.",
      ],
      vis: cmp(245821, 43068).vis,
    },
    {
      t: "The signs",
      ic: "🐊",
      lines: [
        "[>] greater than: 9 > 2. [<] less than: 2 < 9.",
        "The open mouth eats the [bigger] number.",
        "[=] equal: the same number.",
      ],
      vis: { kind: "lines", rows: ["9 > 2", "2 < 9", "5 = 5"] },
    },
    {
      t: "Don't be fooled by a big digit",
      ic: "⚠️",
      lines: [
        "Jamar says 9,280 > 12,621 because 9 > 1.",
        "But the 1 is in the [ten thousands] place!",
        "Count the digits first: 12,621 [>] 9,280.",
      ],
      vis: cmp(12621, 9280).vis,
    },
  ],

  games: [
    {
      k: "compare",
      t: "< > =",
      en: "Compare two numbers",
      ic: "🐊",
      items: [
        [56104, 56140],
        [890321, 89321],
        [7005, 7050],
        [123456, 123456],
        [301999, 310000],
        [44871, 44817],
        [600006, 599999],
        [9876, 19876],
      ].map(([a, b]) => cmp(a, b)),
    },
    {
      k: "greatest",
      t: "The greatest",
      en: "Pick the biggest number",
      ic: "🏆",
      items: [
        [25340, 25430, 24530, 25304],
        [109876, 98761, 110002, 101999],
        [7777, 7787, 7778, 7877],
        [400004, 400040, 400400, 404000],
      ].map((ns) => {
        const s = [...ns].sort((a, b) => b - a).map(fmt);
        return pick(
          "Which number is the greatest?",
          s[0],
          s.slice(1),
          "Start on the left and find the first [different] digit.",
        );
      }),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 41–44",
      t: "Be Curious",
      en: "What question could you ask?",
      ic: "👟",
      from: "Book p. 41 · Be Curious",
      keep: true,
      items: [
        {
          type: "mc",
          q: "A question you could ask: who walked the most steps?",
          opts: ["10,463", "10,295", "10,229"],
          img: "curious",
          x: "Hundreds: [4] > 2. 10,463 is the greatest.",
        },
        {
          type: "open",
          q: "What other question could you ask about these numbers?",
          img: "curious",
          // unverified: p. 41 is not in the teacher's key
          a: "Who walked the fewest steps? (10,229.) How many more steps did the first one walk than the second? Put the numbers in order from least to greatest: 10,229 < 10,295 < 10,463.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 41–44",
      t: "Learn: Jonah and Roshni",
      en: "10,295 and 10,229",
      ic: "📊",
      from: "Book p. 42 · Learn",
      keep: true,
      items: [
        cmp(10295, 10229, { q: "Jonah 10,295 steps ___ Roshni 10,229 steps" }),
        {
          type: "mc",
          q: "Which place shows that Jonah walked more steps?",
          opts: ["Tens", "Ten thousands", "Hundreds", "Ones"],
          keep: ["Ten thousands", "Hundreds", "Tens", "Ones"],
          vis: cmp(10295, 10229).vis,
          x: "It is the first place with [different] digits: 9 tens > 2 tens.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 41–44",
      t: "Work Together",
      en: "Steps in May",
      ic: "🤝",
      from: "Book p. 42 · Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Steps in May: Roshni 245,821, Jonah 43,068. Who walked more steps?",
          opts: ["Roshni", "Jonah"],
          two: true,
          vis: cmp(245821, 43068).vis,
          x: "245,821 has [more digits] (6 > 5): it is greater.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 41–44",
      t: "On My Own 1–6",
      en: "Complete with >, < or =",
      ic: "🐊",
      from: "Book p. 43 · On My Own 1–6",
      keep: true,
      items: [
        [5598, 55889],
        [123710, 123711],
        [628910, 628800],
        [709103, 709130],
        [6217, 6241],
        [43829, 43598],
      ].map(([a, b]) => cmp(a, b)),
    },
    {
      k: "own7",
      g: "📗 Book · p. 41–44",
      t: "On My Own 7–10",
      en: "True or false?",
      ic: "✅",
      from: "Book p. 43 · On My Own 7–10",
      keep: true,
      items: [
        tfCmp(
          1780,
          "<",
          11780,
          "11,780 has [more digits]: its leading digit is in a greater place.",
        ),
        tfCmp(
          720301,
          "<",
          720031,
          "720,301 has [more hundreds] (3) than 720,031 (0).",
        ),
        tfCmp(
          34646,
          ">",
          321446,
          "321,446 has [more digits]: its leading digit is in a greater place.",
        ),
        tfCmp(24747, "<", 24774, "24,774 has [more tens] (7) than 24,747 (4)."),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · p. 41–44",
      t: "On My Own 11–14",
      en: "Think about the places",
      ic: "🧠",
      from: "Book p. 43–44 · On My Own 11–14",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Rebecca's number is greater than 15,724. She knows it from the tens place. What could her number be? Choose all.",
          opts: [
            { t: "15,734", ok: true, emoji: "🔢" },
            { t: "15,790", ok: true, emoji: "🔢" },
            { t: "15,714", emoji: "🔢" },
            { t: "15,624", emoji: "🔢" },
          ],
        },
        {
          type: "tf",
          q: "Jamar says 9,280 is greater than 12,621 because the digit 9 is greater than the digit 1. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: cmp(12621, 9280).vis,
          x: "He forgot the [places]. 12,621 > 9,280: its leading digit is in the ten thousands place.",
        },
        {
          type: "mc",
          q: "Minivan $24,990 · Pickup Truck $31,990 · Sports Car $22,990. Which vehicle is the most expensive?",
          opts: ["Pickup Truck", "Minivan", "Sports Car"],
          icons: ["🛻", "🚐", "🏎️"],
          vis: { kind: "lines", rows: ["$24,990", "$31,990", "$22,990"] },
          x: "$31,990: [3] ten thousands are more than 2 ten thousands.",
        },
        {
          type: "mc",
          q: "Switch only two digits of 4,850 to make a number less than 4,850. Which number works?",
          opts: ["4,580", "8,450", "5,840", "8,540"],
          vis: { kind: "lines", rows: ["4,850"] },
          x: "Switch the 8 (hundreds) and the 5 (tens): 4,580 has [fewer hundreds].",
        },
        {
          type: "open",
          q: "Reflect: How do you describe your answer when you compare numbers?",
          vis: cmp(10295, 10229).vis,
          // unverified: the key says "answers may vary"
          a: "I say which number is greater or less and why: the first place with different digits. 10,295 > 10,229 because 9 tens are more than 2 tens.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 5–6",
      t: "Additional Practice 1–14",
      en: "Lesson 2-3",
      ic: "📘",
      from: "Practice Book p. 5–6",
      keep: true,
      items: [
        ...[
          [6087, 6497],
          [7689, 7684],
          [2837, 22381],
          [88865, 88965],
          [471198, 471197],
          [633731, 633749],
          [525084, 525061],
          [707027, 707109],
        ].map(([a, b]) => cmp(a, b)),
        pick(
          "Which number is greater than 4,374?",
          "4,378",
          ["4,373", "437"],
          "Ones: [8] > 4.",
        ),
        pick(
          "Which number is greater than 18,607?",
          "18,609",
          ["18,606", "18,507"],
          "Ones: [9] > 7.",
        ),
        pick(
          "Which number is greater than 645,088?",
          "645,089",
          ["645,084", "645,001"],
          "Ones: [9] > 8.",
        ),
        {
          type: "mc",
          q: "Lorenzo wins 12,973 tickets. Trena wins 12,970 tickets. Who wins more tickets?",
          opts: ["Lorenzo", "Trena"],
          two: true,
          vis: cmp(12973, 12970).vis,
          x: "Ones: [3] > 0. 12,973 > 12,970.",
        },
        {
          type: "mc",
          q: "Brittany circles 142,357. Carmen circles 142,458. Which number is less?",
          opts: ["142,357", "142,458"],
          two: true,
          vis: cmp(142357, 142458).vis,
          x: "Hundreds: [3] < 4.",
        },
        {
          type: "tf",
          q: "Alexandra's town has 964,208 people. Connor's town has 964,278 people. Connor thinks his town is bigger. Is he right?",
          a: true,
          yes: ["Yes, he is right", "No, he is not"],
          vis: cmp(964278, 964208).vis,
          x: "Tens: [7] > 0, so 964,278 > 964,208.",
        },
      ],
    },
  ],
};
