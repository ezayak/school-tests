// Math · Grade 4 · Lesson 11-4 « Multiply a Mixed Number by a Whole Number » (Reveal Math, Unit 11 « Multiply Fractions by Whole Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 20:15–21:25; no page numbers;
// On My Own 1–4 read from the frames between), Student Practice Book p. 119–120. No teacher's key. Log: grade-4/math/SOURCES.md.
// The Reflect question is not in the video (the screencast jumps to the Math Probe): left out, in TODO.md.
// n × {w a/d}: (n × w) + (n × {a/d}), regrouped; asked as wholes, then the fraction part.
const M = (w, n, d) =>
  n === 0 ? `${w}` : w === 0 ? `{${n}/${d}}` : `{${w} ${n}/${d}}`;
const mixMul = (q, n, [w, a], d, more = {}) => {
  const tot = n * (w * d + a);
  const W = Math.floor(tot / d),
    N = tot % d;
  const part = n * a;
  const how = `${n} × ${w} = ${n * w}, ${n} × {${a}/${d}} = {${part}/${d}}${part >= d ? (part % d ? ` = {${Math.floor(part / d)} ${part % d}/${d}}` : ` = ${part / d}`) : ""}`;
  const expr = `${n} × ${M(w, a, d)}`;
  const vis = more.vis || {
    kind: "lines",
    rows: [`${n} × ${w} = ?`, `${n} × {${a}/${d}} = ?`],
  };
  if (N === 0)
    return [
      {
        type: "num",
        q,
        pre: `${expr} =`,
        a: W,
        vis,
        x: `${how}: ${expr} = [${W}].`,
      },
    ];
  return [
    {
      type: "num",
      q: `${q} How many wholes?`,
      pre: `${expr} =`,
      post: "and a part",
      a: W,
      vis,
      x: `${how}: [${W}] wholes.`,
    },
    {
      type: "num",
      q: "What is the fraction part?",
      pre: `${expr} = ${W}`,
      fr: `?/${d}`,
      a: N,
      vis,
      x: `${how}: ${expr} = {${W} [${N}]/${d}}.`,
    },
  ];
};

window.LESSON = {
  n: "11-4",
  key: "math4-l11-4",
  grade: 4,
  title: "Mixed Number Times a Number",
  en: "Multiply the whole part and the fraction part, then add",
  unit: "Unit 11 · Lesson 11-4",
  book: "e-book Lesson 11-4 · Practice Book p. 119–120",
  imgDir: "img/lesson-11-4",
  cover: "curious",
  question: {
    q: "How do I multiply a [mixed number] by a whole number?",
    // unverified: a model answer, the book gives none
    a: "Multiply the whole part and the fraction part, then add: 5 × {2 3/4} = 10 + {15/4} = {13 3/4}. Or change to a fraction: 5 × {11/4} = {55/4}.",
    img: "curious",
  },
  words: [
    { w: "Mixed number", m: "{2 3/4}: wholes and a part" },
    {
      w: "Distributive Property",
      m: "5 × (2 + {3/4}) = (5 × 2) + (5 × {3/4})",
    },
    { w: "Partial products", m: "10 and {15/4}" },
    { w: "Regroup", m: "{15/4} = {3 3/4}" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🍒",
      img: "curious",
      lines: [
        "4 groups of 1 cup, 1 cup and {3/4} cup: 4 × {2 3/4} cups.",
        "4 × 2 = 8 cups, 4 × {3/4} = 3 cups: [11] cups.",
      ],
    },
    {
      t: "Helen volunteers",
      ic: "🤝",
      lines: [
        "Helen volunteers 5 days a month, {2 3/4} hours each day.",
        "5 × 2 = 10, 5 × {3/4} = {15/4} = {3 3/4}.",
        "10 + {3 3/4} = {13 3/4} hours.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "5 × {2 3/4} = (5 × 2) + (5 × {3/4})",
          "= 10 + {15/4} = {13 3/4}",
        ],
      },
    },
    {
      t: "Another way",
      ic: "🔁",
      lines: [
        "{2 3/4} = {11/4}, so 5 × {11/4} = {55/4}.",
        "{55/4} = {13 3/4}: the same answer.",
      ],
      vis: { kind: "lines", rows: ["5 × {11/4} = {55/4} = {13 3/4}"] },
    },
  ],

  games: [
    {
      k: "mul",
      t: "Mixed number × number",
      en: "Wholes, then parts",
      ic: "✖️",
      keep: true,
      items: [
        [2, [1, 1], 3],
        [3, [2, 1], 4],
        [4, [1, 2], 5],
        [2, [3, 5], 6],
      ].flatMap(([n, m, d]) => mixMul("Multiply.", n, m, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 11-4",
      t: "Be Curious",
      en: "Cups of cherries",
      ic: "🍒",
      from: "e-book 11-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "Each group has 1 cup, 1 cup and {3/4} cup. How many cups in all 4 groups?",
          a: 11,
          post: "cups",
          img: "curious",
          x: "4 × {2 3/4} = 8 + 3 = [11] cups.",
        },
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Each group is {2 3/4} cups, and there are 4 groups. I wonder how many cups there are in all: 4 × {2 3/4} = 11 cups.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 11-4",
      t: "Learn: Helen volunteers",
      en: "5 × 2 3/4",
      ic: "🤝",
      from: "e-book 11-4 · Learn",
      keep: true,
      items: mixMul(
        "Helen volunteers 5 days each month, {2 3/4} hours each day.",
        5,
        [2, 3],
        4,
      ),
    },
    {
      k: "together",
      g: "📗 Book · Lesson 11-4",
      t: "Work Together",
      en: "Koren walks",
      ic: "🚶",
      from: "e-book 11-4 · Work Together",
      keep: true,
      items: mixMul(
        "Koren walked {4 2/3} miles each week for 7 weeks.",
        7,
        [4, 2],
        3,
      ),
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 11-4",
      t: "On My Own 1–7",
      en: "What is the product?",
      ic: "✖️",
      from: "e-book 11-4 · On My Own 1–7",
      keep: true,
      items: [
        ...mixMul("What is the product?", 3, [2, 1], 2),
        ...mixMul("What is the product?", 4, [3, 2], 3),
        ...mixMul("What is the product?", 2, [1, 2], 5),
        ...mixMul("What is the product?", 2, [2, 3], 8),
        ...mixMul("What is the product?", 3, [1, 2], 12),
        ...mixMul("What is the product?", 2, [4, 3], 10),
        ...mixMul(
          "STEM: Saffron uses {3 3/8} cups of flour per loaf. How much for 5 loaves?",
          5,
          [3, 3],
          8,
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 11-4",
      t: "On My Own 8–12",
      en: "Homework, walking, volunteering",
      ic: "📚",
      from: "e-book 11-4 · On My Own 8–12",
      keep: true,
      items: [
        ...mixMul(
          "Parker spends {2 1/4} hours on homework each day, 4 days a week.",
          4,
          [2, 1],
          4,
        ),
        ...mixMul(
          "Eleanor's goal is {3 6/10} miles each day of the week. How far is that in 7 days?",
          7,
          [3, 6],
          10,
        ),
        {
          type: "tf",
          q: "Will Eleanor meet her goal if she walks {24 2/10} miles in a week?",
          a: false,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["{24 2/10} < {25 2/10}"] },
          x: "Her goal is {25 2/10} miles; {24 2/10} is 1 mile less: no.",
        },
        {
          type: "num",
          q: "Sandra volunteers 3 times a week for 4 weeks. How many times in all?",
          pre: "3 × 4 =",
          a: 12,
          emoji: "🏥",
          x: "3 × 4 = [12] times.",
        },
        ...mixMul(
          "Each time she volunteers {2 3/4} hours. How many hours in 4 weeks?",
          12,
          [2, 3],
          4,
        ),
        {
          type: "tf",
          q: "Error Analysis: Marlow multiplies 3 × {1 4/5} as 3 × 1 and then 3 × {1/5}. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["3 × {1 4/5} = (3 × 1) + (3 × ?)"] },
          x: "The fraction part is {4/5}, not {1/5}: 3 × 1 + 3 × {4/5} = 3 + {12/5} = {5 2/5}.",
        },
        ...mixMul("Find the correct product.", 3, [1, 4], 5),
        {
          type: "tf",
          q: "Extend: Paige rewrites 2 × {1 7/8} as 2 × 15 × {1/8}. Do you agree?",
          a: true,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["{1 7/8} = {15/8} = 15 × {1/8}"] },
          x: "{1 7/8} = {15/8} = 15 × {1/8}, so 2 × {1 7/8} = 2 × 15 × {1/8} = {30/8}. Yes.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 119–120",
      t: "Additional Practice 1–9",
      en: "Lesson 11-4",
      ic: "📘",
      from: "Practice Book p. 119–120",
      keep: true,
      items: [
        ...mixMul("Solve.", 5, [2, 1], 2),
        ...mixMul("Solve.", 4, [1, 5], 6),
        ...mixMul("Solve.", 2, [3, 3], 5),
        ...mixMul("Solve.", 6, [4, 1], 3),
        ...mixMul("Solve.", 5, [5, 9], 10),
        ...mixMul(
          "A recipe calls for {1 1/2} cups of flour. How much for 4 batches?",
          4,
          [1, 1],
          2,
        ),
        ...mixMul(
          "Chloe runs a lap in {2 3/5} minutes. How long for 6 laps?",
          6,
          [2, 3],
          5,
        ),
        ...mixMul(
          "Landon has 5 trophies of {2 1/4} pounds each. How much do they weigh?",
          5,
          [2, 1],
          4,
        ),
        {
          type: "tf",
          q: "The shelf holds 12 pounds. Can Landon display all 5 trophies?",
          a: true,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["{11 1/4} < 12"] },
          x: "{11 1/4} pounds is less than 12: yes.",
        },
        {
          type: "tf",
          q: "Harlow multiplies 7 × {2 5/6}: 7 × 2 = 14, 7 × {5/6} = {35/6}, 14 + {35/6} = {19 5/6}. Is she right?",
          a: true,
          yes: ["Yes, she is right", "No, she is not"],
          vis: {
            kind: "lines",
            rows: ["{35/6} = {5 5/6}", "14 + {5 5/6} = {19 5/6}"],
          },
          x: "{35/6} = {5 5/6} and 14 + {5 5/6} = {19 5/6}: her work is right.",
        },
      ],
    },
  ],
};
