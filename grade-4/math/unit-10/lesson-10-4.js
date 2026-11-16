// Math · Grade 4 · Lesson 10-4 « Represent Subtracting Mixed Numbers » (Reveal Math, Unit 10 « Addition and Subtraction Strategies with Mixed Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 12:30–13:15; no page numbers;
// On My Own 1–6 and the model of 12 read from the frames between), Student Practice Book p. 107–108. No teacher's key. Log: grade-4/math/SOURCES.md.
// A difference of mixed numbers is asked in two steps: the whole number, then the fraction part (after decomposing a whole when needed).
const M = (w, n, d) =>
  n === 0 ? `${w}` : w === 0 ? `{${n}/${d}}` : `{${w} ${n}/${d}}`;
// [w1, n1] − [w2, n2] (denominator d) → one or two items
const mixSub = (q, [w1, n1], [w2, n2], d, more = {}) => {
  const tot = w1 * d + n1 - (w2 * d + n2);
  const W = Math.floor(tot / d),
    N = tot % d;
  const borrow = n1 < n2;
  const how = borrow
    ? `decompose a whole: ${M(w1, n1, d)} = {${w1 - 1} ${n1 + d}/${d}}; ${w1 - 1} − ${w2} = ${W}, {${n1 + d}/${d}} − {${n2}/${d}} = {${n1 + d - n2}/${d}}`
    : `${w1} − ${w2} = ${W}, {${n1}/${d}} − {${n2}/${d}} = {${N}/${d}}`;
  const vis = more.vis || {
    kind: "fline",
    hi: w1 + (n1 ? 1 : 0),
    lines: [{ d, from: w1 * d + n1, jumps: [-(w2 * d + n2)], lab: false }],
  };
  const diff = `${M(w1, n1, d)} − ${M(w2, n2, d)}`;
  const res = M(W, N, d);
  if (N === 0 || W === 0)
    return [
      {
        type: "num",
        q: `${q ? q + " " : ""}What is the difference?`,
        pre: `${diff} =`,
        ...(N === 0 ? {} : { fr: `?/${d}` }),
        a: N === 0 ? W : N,
        vis,
        x: `${how}: ${diff} = ${N === 0 ? `[${W}]` : `{[${N}]/${d}}`}.`,
      },
    ];
  return [
    {
      type: "num",
      q: `${q ? q + " " : ""}How many wholes are in the difference?`,
      pre: `${diff} =`,
      post: "and a part",
      a: W,
      vis,
      x: `${how}: [${W}] wholes.`,
    },
    {
      type: "num",
      q: `${diff}: what is the fraction part?`,
      pre: `${diff} = ${W}`,
      fr: `?/${d}`,
      a: N,
      vis,
      x: `${how}: ${diff} = ${res.replace(`${N}/`, `[${N}]/`)}.`,
    },
  ];
};

window.LESSON = {
  n: "10-4",
  key: "math4-l10-4",
  grade: 4,
  title: "Show Subtracting Mixed Numbers",
  en: "Take away wholes and parts; decompose a whole when the part is too small",
  unit: "Unit 10 · Lesson 10-4",
  book: "e-book Lesson 10-4 · Practice Book p. 107–108",
  imgDir: "img/lesson-10-4",
  cover: "curious",
  question: {
    q: "How can I [show] subtracting mixed numbers?",
    // unverified: a model answer, the book gives none
    a: "With tiles or a number line, as with fractions. If the part I take away is bigger, I break one whole into parts first: {4 2/4} = {3 6/4}.",
    img: "curious",
  },
  words: [
    { w: "Subtract", m: "take away: {4 2/4} − {1 3/4}" },
    { w: "Decompose a whole", m: "1 = {4/4}: break a whole into parts" },
    { w: "Difference", m: "the answer of a subtraction" },
    { w: "Mixed number", m: "a whole number and a fraction: {4 2/4}" },
  ],
  ideas: [
    {
      t: "Tell me everything you can",
      ic: "📏",
      img: "curious",
      lines: [
        "A tape measure on a piece of fabric, in inches.",
        "Each inch is cut in [eighths].",
        "Two pins show where to cut: the difference is the length of the piece.",
      ],
    },
    {
      t: "Ramsey's fence",
      ic: "🎨",
      lines: [
        "The fence is {4 2/4} yards. Ramsey paints {1 3/4} yards blue in the morning.",
        "{4 2/4} − {1 3/4}: he paints the rest in the afternoon.",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 4, k: 4 },
          { d: 4, k: 4 },
          { d: 4, k: 4 },
          { d: 4, k: 4 },
          { d: 4, k: 2 },
        ],
      },
    },
    {
      t: "{2/4} is less than {3/4}",
      ic: "🔨",
      lines: [
        "We can't take {3/4} from {2/4}: break one whole into [{4/4}].",
        "{4 2/4} = {3 6/4}. Now take away 1 whole and {3/4}.",
        "{3 6/4} − {1 3/4} = {2 3/4} yards.",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 4, k: 4 },
          { d: 4, k: 4 },
          { d: 4, cross: [0, 1, 2, 3] },
          { d: 4, k: 4, cross: [1] },
          { d: 4, k: 2, cross: [0, 1] },
        ],
      },
    },
    {
      t: "On a number line",
      ic: "🏃",
      lines: [
        "Eli ran {3 1/8} miles last week and {1 3/8} fewer this week.",
        "Start at {3 1/8}, jump back {1 3/8}: you land on {1 6/8}.",
      ],
      vis: {
        kind: "fline",
        hi: 4,
        lines: [{ d: 8, from: 25, jumps: [-8, -3] }],
      },
    },
  ],

  games: [
    {
      k: "sub",
      t: "Subtract mixed numbers",
      en: "Wholes, then parts",
      ic: "➖",
      keep: true,
      items: [
        [[3, 4], [1, 1], 5],
        [[4, 1], [2, 3], 4],
        [[5, 2], [2, 5], 6],
        [[3, 3], [1, 7], 8],
      ].flatMap(([a, b, d]) => mixSub("Subtract.", a, b, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 10-4",
      t: "Be Curious",
      en: "Tape measure",
      ic: "📏",
      from: "e-book 10-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Tell me everything you can.",
          img: "curious",
          // unverified: no key; any true statement is right
          a: "A tape measure in inches on fabric; each inch has 8 marks (eighths). Two pins mark the fabric; the length between them is a difference of two mixed numbers.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 10-4",
      t: "Learn: Ramsey's fence",
      en: "Decompose a whole",
      ic: "🎨",
      from: "e-book 10-4 · Learn",
      keep: true,
      items: mixSub(
        "The fence is {4 2/4} yards. Ramsey paints {1 3/4} yards in the morning. How much in the afternoon?",
        [4, 2],
        [1, 3],
        4,
      ),
    },
    {
      k: "together",
      g: "📗 Book · Lesson 10-4",
      t: "Work Together",
      en: "Eli's run",
      ic: "🏃",
      from: "e-book 10-4 · Work Together",
      keep: true,
      items: mixSub(
        "Eli ran {3 1/8} miles last week and {1 3/8} fewer miles this week. How far this week?",
        [3, 1],
        [1, 3],
        8,
      ),
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 10-4",
      t: "On My Own 1–6",
      en: "What is the difference?",
      ic: "➖",
      from: "e-book 10-4 · On My Own 1–6",
      keep: true,
      items: [
        ...mixSub("", [4, 2], [3, 3], 4),
        ...mixSub("", [3, 2], [2, 1], 3),
        ...mixSub("", [2, 7], [1, 3], 8),
        ...mixSub("", [3, 0], [0, 4], 5),
        ...mixSub("", [3, 4], [1, 3], 6),
        ...mixSub("", [3, 4], [1, 5], 6),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 10-4",
      t: "On My Own 7–12",
      en: "School, model, reading, cheese, Issac",
      ic: "🏫",
      from: "e-book 10-4 · On My Own 7–12",
      keep: true,
      items: [
        ...mixSub(
          "Stella's house is 5 miles from school, Darius's {3 9/10} miles. How much farther is Stella's?",
          [5, 0],
          [3, 9],
          10,
        ),
        ...mixSub(
          "Use the fraction model to solve {2 1/6} − {1 3/6}.",
          [2, 1],
          [1, 3],
          6,
          {
            vis: {
              kind: "fbar",
              side: true,
              rows: [
                { d: 6, g: 2, k: 6 },
                { d: 6, g: 2, k: 6 },
                { d: 6, g: 2, k: 1 },
              ],
            },
          },
        ),
        ...mixSub(
          "Norman's goal is {2 1/3} hours of reading. He has to read another {1 2/3} hours. How much has he read so far?",
          [2, 1],
          [1, 2],
          3,
        ),
        ...mixSub(
          "Rosie has {3 1/4} cups of cheese and uses {1 3/4} cups for a pizza. How much is left?",
          [3, 1],
          [1, 3],
          4,
        ),
        {
          type: "tf",
          q: "Will there be enough cheese left ({1 2/4} cups) for another pizza with {1 3/4} cups?",
          a: false,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["{1 2/4}  <  {1 3/4}"] },
          x: "{1 2/4} is less than {1 3/4}: not enough cheese.",
        },
        {
          type: "mc",
          q: "Issac found {2 2/10} − {1 4/10} on a number line: from {2 2/10} he jumped back 1 whole, then {4/10}. How can you explain his strategy?",
          opts: [
            "He took away the whole first, then the part: he landed on {8/10}",
            "He added {1 4/10}",
            "He took away only {4/10}",
          ],
          vis: {
            kind: "fline",
            hi: 3,
            lines: [{ d: 10, from: 22, jumps: [-10, -4], lab: false }],
          },
          x: "{2 2/10} − 1 = {1 2/10}, then {1 2/10} − {4/10} = {8/10}.",
        },
        ...mixSub(
          "Extend Your Thinking: the model starts with {3 1/4} and crosses out 1 whole and {3/4}.",
          [3, 1],
          [1, 3],
          4,
          {
            vis: {
              kind: "fbar",
              side: true,
              rows: [
                { d: 4, k: 4 },
                { d: 4, cross: [0, 1, 2, 3] },
                { d: 4, k: 4, cross: [0, 1] },
                { d: 4, k: 1, cross: [0] },
              ],
            },
          },
        ),
        {
          type: "open",
          q: "Write a word problem for this model: {3 1/4} − {1 3/4}.",
          vis: {
            kind: "fbar",
            side: true,
            rows: [
              { d: 4, k: 4 },
              { d: 4, cross: [0, 1, 2, 3] },
              { d: 4, k: 4, cross: [0, 1] },
              { d: 4, k: 1, cross: [0] },
            ],
          },
          // unverified: any matching story is right
          a: "Mia has {3 1/4} pizzas. Her friends eat {1 3/4} pizzas. How much pizza is left? {1 2/4} pizzas.",
        },
        {
          type: "open",
          q: "Reflect: How does the way you show subtracting mixed numbers compare to subtracting fractions?",
          vis: { kind: "lines", rows: ["{4 2/4} = {3 6/4}"] },
          // unverified: a model answer, the book gives none
          a: "The same tiles and jumps back on a number line. With mixed numbers I also take away wholes, and sometimes I break a whole into parts first.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 107–108",
      t: "Additional Practice 1–8",
      en: "Lesson 10-4",
      ic: "📘",
      from: "Practice Book p. 107–108",
      keep: true,
      items: [
        ...mixSub("Find the difference.", [5, 3], [4, 2], 4),
        ...mixSub("Find the difference.", [3, 2], [1, 2], 5),
        ...mixSub("Find the difference.", [3, 1], [1, 5], 6),
        ...mixSub("Find the difference.", [4, 5], [1, 9], 12),
        ...mixSub(
          "Trisha runs {3 4/10} miles on Saturday and {7 6/10} miles in all. How far on Sunday?",
          [7, 6],
          [3, 4],
          10,
        ),
        ...mixSub(
          "{6 3/4} gallons of paint are used. Tia uses {3 1/4}. How much does Josephine use?",
          [6, 3],
          [3, 1],
          4,
        ),
        ...mixSub(
          "Adam cuts {2 3/8} inches off a board {6 1/8} inches wide. How wide is it now?",
          [6, 1],
          [2, 3],
          8,
        ),
        ...mixSub(
          "Alejandro buys 8 cartons of eggs. The campers eat {6 7/12} cartons. How many are left?",
          [8, 0],
          [6, 7],
          12,
        ),
      ],
    },
  ],
};
