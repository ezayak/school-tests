// Math · Grade 4 · Lesson 9-3 « Add Fractions with Like Denominators » (Reveal Math, Unit 9 « Addition and Subtraction Meanings and Strategies with Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 3:27–4:20; no page numbers;
// On My Own 3, 8 and 12 read from the frames between), Student Practice Book p. 93–94. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
const S = (parts, d) => parts.map((p) => `{${p}/${d}}`).join(" + ");
const tot = (parts) => parts.reduce((a, b) => a + b, 0);
// "{a/d} + {b/d} = ?": add the tops, keep the bottom
const addQ = (q, parts, d, more = {}) => {
  const n = tot(parts);
  return {
    type: "num",
    q,
    pre: `${S(parts, d)} =`,
    fr: `?/${d}`,
    a: n,
    vis: {
      kind: "lines",
      rows: [`${parts.join(" + ")} = ?`],
      note: `add the tops, the bottom stays ${d}`,
    },
    x: `${parts.join(" + ")} = ${n}: ${S(parts, d)} = {[${n}]/${d}}.`,
    ...more,
  };
};
// "{a/d} + ? = {n/d}": the missing addend
const missQ = (q, a, n, d, more = {}) => ({
  type: "num",
  q,
  pre: `{${a}/${d}} +`,
  fr: `?/${d}`,
  post: `= {${n}/${d}}`,
  a: n - a,
  vis: { kind: "lines", rows: [`${a} + ? = ${n}`] },
  x: `${a} + ${n - a} = ${n}: {${a}/${d}} + {[${n - a}]/${d}} = {${n}/${d}}.`,
  ...more,
});

window.LESSON = {
  n: "9-3",
  key: "math4-l9-3",
  grade: 4,
  title: "Add Fractions",
  en: "Add the numerators, keep the denominator",
  unit: "Unit 9 · Lesson 9-3",
  book: "e-book Lesson 9-3 · Practice Book p. 93–94",
  imgDir: "img/lesson-9-3",
  cover: "curious",
  question: {
    q: "How do I add fractions with [like denominators]?",
    // unverified: a model answer, the book gives none
    a: "Add the [numerators] (the tops) and keep the [denominator] (the bottom): {4/6} + {3/6} = {7/6}. The parts are the same size, so the bottom does not change.",
    img: "curious",
  },
  words: [
    { w: "Numerator", m: "the top number: how many parts" },
    { w: "Denominator", m: "the bottom number: the size of the parts" },
    { w: "Like denominators", m: "the same bottom number: {4/6} and {3/6}" },
    { w: "Sum", m: "the answer of an addition: {4/6} + {3/6} = {7/6}" },
  ],
  ideas: [
    {
      t: "Is it always true?",
      ic: "🤔",
      img: "curious",
      lines: [
        "{5/8} + {4/8} = {9/8}, {3/12} + {5/12} = {8/12}, {2/6} + {3/6} = {5/6}.",
        "Each time the [tops] are added and the [bottom] stays the same.",
        "Yes, it is always true for like denominators.",
      ],
    },
    {
      t: "Mateo's walk",
      ic: "🚶",
      lines: [
        "Mateo walked {4/6} mile to the bakery and {3/6} mile home.",
        "4 tiles of {1/6} and 3 tiles of {1/6}: 7 tiles of {1/6}.",
        "{4/6} + {3/6} = {7/6} mile.",
      ],
      vis: {
        kind: "fline",
        hi: 2,
        lines: [{ d: 6, jumps: [4, 3] }],
      },
    },
    {
      t: "Why the bottom stays",
      ic: "🟰",
      lines: [
        "The tops count the parts: we [add] them.",
        "The bottom is the size of the parts: it [does not change].",
        "{2/5} + {1/5} = {3/5}",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 5, on: [0, 1], l: "{2/5}" },
          { d: 5, on: [2], l: "{1/5}", c: 1 },
          { d: 5, k: 3, l: "{3/5}", c: 2 },
        ],
      },
    },
    {
      t: "A missing part",
      ic: "❓",
      lines: [
        "{5/12} + ? = {8/12}",
        "5 + 3 = 8, so the missing part is [{3/12}].",
      ],
      vis: { kind: "fline", lines: [{ d: 12, jumps: [5, 3] }] },
    },
  ],

  games: [
    {
      k: "add",
      t: "Add the tops",
      en: "Keep the bottom",
      ic: "➕",
      items: [
        [[2, 5], 9],
        [[3, 4], 10],
        [[1, 6], 8],
        [[5, 4], 6],
        [[2, 2, 3], 12],
        [[3, 3], 5],
        [[4, 7], 12],
        [[1, 2, 3], 4],
      ].map(([p, d]) => addQ("What is the sum?", p, d)),
    },
    {
      k: "miss",
      t: "The missing part",
      en: "Find the missing part",
      ic: "❓",
      items: [
        [2, 7, 10],
        [3, 5, 8],
        [1, 4, 6],
        [4, 11, 12],
        [2, 5, 5],
        [3, 7, 4],
      ].map(([a, n, d]) => missQ("What is the missing part?", a, n, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 9-3",
      t: "Be Curious",
      en: "Is it always true?",
      ic: "🤔",
      from: "e-book 9-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Is it always true? {5/8} + {4/8} = {9/8}, {3/12} + {5/12} = {8/12}, {2/6} + {3/6} = {5/6}: add the tops and keep the bottom.",
          a: true,
          yes: ["Yes", "No"],
          img: "curious",
          // unverified: no key; the book asks for a reason
          x: "Yes: with like denominators the parts are the same size, so we add how many parts and keep their size.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 9-3",
      t: "Learn: Mateo's walk",
      en: "Fraction tiles, number line",
      ic: "🚶",
      from: "e-book 9-3 · Learn",
      keep: true,
      items: [
        addQ(
          "Mateo walked {4/6} mile to the bakery and {3/6} mile home. How many miles did he walk in all?",
          [4, 3],
          6,
          {
            post: "mile",
            vis: {
              kind: "fline",
              hi: 2,
              lines: [{ d: 6, jumps: [4, 3], lab: false }],
            },
          },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 9-3",
      t: "On My Own 1–8",
      en: "Fill in the blank",
      ic: "➕",
      from: "e-book 9-3 · On My Own 1–8",
      keep: true,
      items: [
        addQ("What is the sum?", [3, 3], 5),
        addQ("What is the sum?", [1, 2], 4),
        addQ("What is the missing value?", [2, 3], 3),
        {
          type: "num",
          q: "What is the missing value?",
          pre: "{2/10} + {6/10} =",
          fr: "8/?",
          a: 10,
          vis: { kind: "lines", rows: ["{2/10} + {6/10} = {8/?}"] },
          x: "The bottom stays the same: {2/10} + {6/10} = {8/[10]}.",
        },
        addQ("What is the missing value?", [1, 5], 8),
        addQ("What is the missing value?", [3, 4], 2),
        missQ("What is the missing value?", 4, 5, 6, {
          pre: "",
          post: "+ {4/6} = {5/6}",
          q: "What is the missing value? ? + {4/6} = {5/6}",
          vis: { kind: "lines", rows: ["? + 4 = 5"] },
          x: "1 + 4 = 5: {[1]/6} + {4/6} = {5/6}.",
        }),
        missQ("What is the missing value?", 5, 8, 12),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 9-3",
      t: "On My Own 9–11",
      en: "Wire, swimming, charity",
      ic: "🏊",
      from: "e-book 9-3 · On My Own 9–11",
      keep: true,
      items: [
        addQ(
          "Anu has {1/6} meter of wire. She buys {3/6} meter more. How much wire does Anu have now?",
          [1, 3],
          6,
          {
            post: "meter",
            emoji: "🧵",
          },
        ),
        missQ(
          "James swims {4/5} mile in all: {3/5} mile backstroke and the rest freestyle. How far did he swim freestyle?",
          3,
          4,
          5,
          { post: "= {4/5} mile", emoji: "🏊" },
        ),
        missQ(
          "A class collects {2/10} of its charity goal in the first week. After the second week they have {6/10}. How much did they collect in the second week?",
          2,
          6,
          10,
          { emoji: "💰" },
        ),
      ],
    },
    {
      k: "own12",
      g: "📗 Book · Lesson 9-3",
      t: "On My Own 12–14",
      en: "Choose all, butterflies, tape",
      ic: "🦋",
      from: "e-book 9-3 · On My Own 12–14",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Which expressions have a sum of {5/6}? Choose all that apply.",
          opts: [
            ["{2/2} + {3/4}", false],
            ["{2/3} + {3/3}", false],
            ["{5/3} + {5/3}", false],
            ["{2/6} + {3/6}", true],
            ["{1/6} + {4/6}", true],
          ].map(([t, ok]) => ({ t, ok, emoji: "➕" })),
          vis: { kind: "lines", rows: ["? = {5/6}"] },
          x: "Only sixths can make {5/6}: {2/6} + {3/6} = {5/6} and {1/6} + {4/6} = {5/6}. The others are not sixths.",
        },
        addQ(
          "STEM Connection: Owen studies {4/5} of a butterfly population in the morning and {1/5} in the afternoon. How much did he study in one day?",
          [4, 1],
          5,
          { emoji: "🦋" },
        ),
        addQ(
          "Extend Your Thinking: Dionne uses {3/10} roll of tape for boxes and {4/10} roll for an art project. How much tape in all?",
          [3, 4],
          10,
          { emoji: "📦" },
        ),
        {
          type: "mc",
          q: "Did Dionne use more than or less than {1/2} roll of tape in all?",
          opts: ["More than {1/2}", "Less than {1/2}", "Exactly {1/2}"],
          keep: ["More than {1/2}", "Less than {1/2}", "Exactly {1/2}"],
          vis: {
            kind: "fline",
            lines: [
              { d: 10, pt: 7, lab: false },
              { d: 2, pt: 1 },
            ],
          },
          x: "{1/2} = {5/10}, and {7/10} > {5/10}: more than {1/2}.",
        },
        {
          type: "open",
          q: "Reflect: How can you add fractions with like denominators?",
          vis: { kind: "lines", rows: ["{4/6} + {3/6} = {7/6}"] },
          // unverified: a model answer, the book gives none
          a: "Add the numerators and keep the denominator: the parts are the same size, so only the number of parts changes.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 93–94",
      t: "Additional Practice 1–10",
      en: "Lesson 9-3",
      ic: "📘",
      from: "Practice Book p. 93–94",
      keep: true,
      items: [
        addQ("Complete the equation.", [2, 1], 4),
        addQ("Complete the equation.", [3, 1], 6),
        addQ("Complete the equation.", [4, 5], 8),
        addQ("Complete the equation.", [1, 2, 2], 3),
        addQ("Complete the equation.", [2, 4, 3], 10),
        addQ("Complete the equation.", [5, 1, 6], 12),
        {
          type: "multi",
          q: "Which three fractions have a sum of {13/6}? Choose three.",
          opts: [3, 4, 10, 7, 6, 1].map((n) => ({
            t: `{${n}/6}`,
            ok: [3, 4, 6].includes(n),
            emoji: "🟦",
          })),
          vis: { kind: "lines", rows: ["? + ? + ? = {13/6}"] },
          x: "3 + 4 + 6 = 13: {3/6} + {4/6} + {6/6} = {13/6}. No other three tops make 13.",
        },
        addQ(
          "Maxwell mixes {2/8} gallon of white paint with {3/8} gallon of black paint. How much gray paint does he have?",
          [2, 3],
          8,
          {
            post: "gallon",
            emoji: "🎨",
          },
        ),
        addQ(
          "Blanca jogs {5/10} mile in the morning, {4/10} mile at noon and {8/10} mile in the evening. How far does she jog each day?",
          [5, 4, 8],
          10,
          {
            post: "mile",
            emoji: "🏃",
          },
        ),
        addQ(
          "Dennis uses {3/12} yard of blue fabric, {2/12} yard of red and {2/12} yard of yellow. How much fabric in all?",
          [3, 2, 2],
          12,
          {
            post: "yard",
            emoji: "🧵",
          },
        ),
        {
          type: "tf",
          q: "Dennis says he uses more than {1/2} yard of fabric in all. Is he correct?",
          a: true,
          yes: ["Yes, he is correct", "No, he is not"],
          vis: {
            kind: "fline",
            lines: [
              { d: 12, pt: 7, lab: false },
              { d: 2, pt: 1 },
            ],
          },
          x: "{1/2} = {6/12}, and {7/12} > {6/12}: yes, more than {1/2} yard.",
        },
      ],
    },
  ],
};
