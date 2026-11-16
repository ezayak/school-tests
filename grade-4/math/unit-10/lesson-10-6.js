// Math · Grade 4 · Lesson 10-6 « Solve Problems Involving Mixed Numbers » (Reveal Math, Unit 10 « Addition and Subtraction Strategies with Mixed Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 14:20–15:35; no page numbers),
// Student Practice Book p. 111–112. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The Be Curious has no picture (text only): the cover is the Learn bar model (picture `learn`).
// mixQ: one step of a problem. terms: [[w, n], "+", [w, n], "−", …] in d-ths; asked as wholes, then the fraction part (or once when it is whole or less than 1).
const M = (w, n, d) =>
  n === 0 ? `${w}` : w === 0 ? `{${n}/${d}}` : `{${w} ${n}/${d}}`;
const mixQ = (q, terms, d, more = {}) => {
  let tot = 0,
    sign = 1;
  const parts = [];
  for (const t of terms) {
    if (t === "+" || t === "−") {
      sign = t === "+" ? 1 : -1;
      parts.push(t);
    } else {
      const [w, n] = typeof t === "number" ? [t, 0] : t;
      tot += sign * (w * d + n);
      parts.push(M(w, n, d));
    }
  }
  const expr = parts.join(" ");
  const W = Math.floor(tot / d),
    N = tot % d;
  const vis = more.vis || { kind: "lines", rows: [`${expr} = ?`] };
  if (N === 0 || W === 0)
    return [
      {
        type: "num",
        q,
        pre: `${expr} =`,
        ...(N === 0 ? {} : { fr: `?/${d}` }),
        a: N === 0 ? W : N,
        vis,
        ...(more.post ? { post: more.post } : {}),
        x: `${expr} = ${N === 0 ? `[${W}]` : `{[${N}]/${d}}`}.`,
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
      x: `${expr} = ${M(W, N, d)}: [${W}] wholes.`,
    },
    {
      type: "num",
      q: "What is the fraction part?",
      pre: `${expr} = ${W}`,
      fr: `?/${d}`,
      a: N,
      vis,
      x: `${expr} = {${W} [${N}]/${d}}.`,
    },
  ];
};
const bars = (rows, total) => ({
  kind: "bar",
  rows: rows.map(([l, segs]) => ({
    l,
    segs: segs.map(([t, v, q]) => ({ t, v, q })),
  })),
  ...(total ? { total: { t: total } } : {}),
});

window.LESSON = {
  n: "10-6",
  key: "math4-l10-6",
  grade: 4,
  title: "Mixed Number Word Problems",
  en: "Add and subtract mixed numbers to solve problems, step by step",
  unit: "Unit 10 · Lesson 10-6",
  book: "e-book Lesson 10-6 · Practice Book p. 111–112",
  imgDir: "img/lesson-10-6",
  cover: "learn",
  question: {
    q: "How do I know whether to [add] or [subtract] mixed numbers in a problem?",
    // unverified: a model answer, the book gives none
    a: 'Draw a bar model. Parts put together, "in all", "total": add. "Left", "less", "how much more", "the rest": subtract. Some problems need both, one step at a time.',
  },
  words: [
    { w: "Add", m: "put together: {5/6} + {1 2/6}" },
    { w: "Subtract", m: "take away, the rest: 3 − {2 1/6}" },
    { w: "Bar model", m: "a drawing of the parts and the whole" },
    { w: "Variable", m: "a letter for the unknown: h, t, b" },
  ],
  ideas: [
    {
      t: "Paul's soccer",
      ic: "⚽",
      lines: [
        "Paul practiced 3 hours this week: {5/6} hour on Monday, {1 2/6} on Wednesday.",
        "How much did he practice the rest of the week?",
        "Two steps: add, then subtract.",
      ],
      vis: bars(
        [
          [
            "week",
            [
              ["{5/6}", 5],
              ["{1 2/6}", 8],
              ["t", 5, true],
            ],
          ],
        ],
        "3",
      ),
    },
    {
      t: "Step 1: add",
      ic: "➕",
      lines: ["Monday and Wednesday: {5/6} + {1 2/6} = [{2 1/6}] hours."],
      vis: bars(
        [
          [
            "Mon + Wed",
            [
              ["{5/6}", 5],
              ["{1 2/6}", 8],
            ],
          ],
        ],
        "h",
      ),
    },
    {
      t: "Step 2: subtract",
      ic: "➖",
      lines: ["The rest of the week: 3 − {2 1/6} = [{5/6}] hour."],
      vis: bars(
        [
          [
            "week",
            [
              ["{2 1/6}", 13],
              ["t", 5, true],
            ],
          ],
        ],
        "3",
      ),
    },
    {
      t: "Add or subtract?",
      ic: "🤔",
      lines: [
        '"In all", "total", "combined": [add].',
        '"Left", "the rest", "less", "how much more": [subtract].',
      ],
      vis: { kind: "lines", rows: ["+ in all, total", "− left, the rest"] },
    },
  ],

  games: [
    {
      k: "which",
      t: "Add or subtract?",
      en: "Read the problem",
      ic: "🤔",
      items: [
        [
          "Mia ran {1 2/4} miles and then {2 1/4} miles more. How far in all?",
          "Add",
        ],
        [
          "A rope is {5 3/8} feet. Sam cuts off {2 1/8} feet. How much is left?",
          "Subtract",
        ],
        [
          "Leo has {3 1/3} cups of flour and uses {1 2/3}. How much is left?",
          "Subtract",
        ],
        [
          "A cake needs {1 1/2} cups of milk and {2 1/2} cups of water. How much liquid?",
          "Add",
        ],
        [
          "Ana read {4 2/5} hours, Ben {2 4/5}. How much longer did Ana read?",
          "Subtract",
        ],
      ].map(([q, a]) => ({
        type: "mc",
        q,
        opts: [a, a === "Add" ? "Subtract" : "Add"],
        keep: ["Add", "Subtract"],
        emoji: "📖",
        x:
          a === "Add"
            ? "Parts put together: [add]."
            : "Taking away or finding the difference: [subtract].",
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 10-6",
      t: "Be Curious",
      en: "What math do you see?",
      ic: "⚽",
      from: "e-book 10-6 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Paul practiced soccer this week, some on Monday and some on Wednesday. What math do you see in this problem?",
          emoji: "⚽",
          // unverified: no key; any answer is right
          a: "Parts of the week's practice: Monday and Wednesday can be added; if we know the total, we can subtract to find the rest of the week.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 10-6",
      t: "Learn: Paul's soccer",
      en: "Two steps",
      ic: "⚽",
      from: "e-book 10-6 · Learn",
      keep: true,
      items: [
        ...mixQ(
          "Paul practiced {5/6} hour on Monday and {1 2/6} hours on Wednesday. How long on both days?",
          [[0, 5], "+", [1, 2]],
          6,
          {
            vis: bars(
              [
                [
                  "Mon + Wed",
                  [
                    ["{5/6}", 5],
                    ["{1 2/6}", 8],
                  ],
                ],
              ],
              "h",
            ),
          },
        ),
        ...mixQ(
          "He practiced 3 hours in all. How long the rest of the week?",
          [3, "−", [2, 1]],
          6,
          {
            vis: bars(
              [
                [
                  "week",
                  [
                    ["{2 1/6}", 13],
                    ["t", 5, true],
                  ],
                ],
              ],
              "3",
            ),
          },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 10-6",
      t: "Work Together",
      en: "Bianca's dog",
      ic: "🐕",
      from: "e-book 10-6 · Work Together",
      keep: true,
      items: [
        ...mixQ(
          "Bianca's dog eats {1 3/4} cups in the morning: {2/4} cup more than in the afternoon. How much in the afternoon?",
          [[1, 3], "−", [0, 2]],
          4,
        ),
        ...mixQ(
          "How much food does the dog eat in a day?",
          [[1, 3], "+", [1, 1]],
          4,
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 10-6",
      t: "On My Own 1–6",
      en: "Soil, ribbon, salad, running, lemonade, muffins",
      ic: "🌱",
      from: "e-book 10-6 · On My Own 1–6",
      keep: true,
      items: [
        ...mixQ(
          "Bella had {3 4/5} bags of soil and has {1 3/5} left. How much did she use?",
          [[3, 4], "−", [1, 3]],
          5,
        ),
        ...mixQ(
          "Lori had {2 3/4} yards of ribbon and now has {4 1/4}. How much did she buy?",
          [[4, 1], "−", [2, 3]],
          4,
        ),
        ...mixQ(
          "Arthur uses {5 2/8} pounds of berries and pineapple, {2 4/8} pounds of berries. How much pineapple?",
          [[5, 2], "−", [2, 4]],
          8,
        ),
        ...mixQ(
          "How many more pounds of pineapple than berries?",
          [[2, 6], "−", [2, 4]],
          8,
        ),
        ...mixQ(
          "Cal ran {3 1/4} miles. Marnie ran {2/4} mile more than Cal. How far did Marnie run?",
          [[3, 1], "+", [0, 2]],
          4,
        ),
        ...mixQ(
          "Roger ran {3/4} mile less than Marnie. How far did Roger run?",
          [[3, 3], "−", [0, 3]],
          4,
        ),
        ...mixQ(
          "Abram drank {3 1/3} cups of lemonade and has {6 2/3} cups left. How much was in the pitcher?",
          [[3, 1], "+", [6, 2]],
          3,
        ),
        ...mixQ(
          "A bakery made 6 batches of muffins, sold {2 7/8} in the morning and has {1 5/8} left. How many did it sell in the afternoon?",
          [6, "−", [2, 7], "−", [1, 5]],
          8,
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 10-6",
      t: "On My Own 7–10",
      en: "Playpen, plywood, flour, your own problem",
      ic: "🐶",
      from: "e-book 10-6 · On My Own 7–10",
      keep: true,
      items: [
        ...mixQ(
          "Gwyn's playpen is {2 4/6} feet long and {2 1/6} feet wide. How much fencing goes all the way around?",
          [[2, 4], "+", [2, 1], "+", [2, 4], "+", [2, 1]],
          6,
        ),
        {
          type: "tf",
          q: "Will 10 feet of fencing be enough?",
          a: true,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["{9 4/6} < 10"] },
          x: "The playpen needs {9 4/6} feet, less than 10: yes, enough.",
        },
        ...mixQ(
          "STEM: Finn uses {10 6/12} feet and {8 9/12} feet of plywood for two projects. How much in all?",
          [[10, 6], "+", [8, 9]],
          12,
        ),
        ...mixQ(
          "He has 16 feet. How many feet does he need to buy?",
          [[19, 3], "−", 16],
          12,
        ),
        {
          type: "mc",
          q: "Vinny had {5 1/4} cups of flour, used some for muffins, and has {3 2/4} left. Which equation shows it?",
          opts: [
            "{5 1/4} − f = {3 2/4}",
            "{5 1/4} + {3 2/4} = f",
            "f − {5 1/4} = {3 2/4}",
          ],
          vis: { kind: "lines", rows: ["had − used = left"] },
          x: "He had {5 1/4}, used f, and {3 2/4} is left: {5 1/4} − f = {3 2/4}.",
        },
        ...mixQ("How much flour did Vinny use?", [[5, 1], "−", [3, 2]], 4),
        ...mixQ(
          "Extend Your Thinking: b + {2 5/8} = {4 4/8}. What is b?",
          [[4, 4], "−", [2, 5]],
          8,
        ),
        {
          type: "open",
          q: "Write a word problem for b + {2 5/8} = {4 4/8}.",
          vis: { kind: "lines", rows: ["b + {2 5/8} = {4 4/8}"] },
          // unverified: any matching story is right
          a: "Sam had some rope. He bought {2 5/8} feet more and now has {4 4/8} feet. How much did he have? b = {1 7/8} feet.",
        },
        {
          type: "open",
          q: "Reflect: How can you determine whether you need to add or subtract to solve word problems with mixed numbers?",
          vis: { kind: "lines", rows: ["+ in all", "− left, less"] },
          // unverified: a model answer, the book gives none
          a: "I draw a bar model: if I know the parts and want the whole, I add; if I know the whole and one part, I subtract.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 111–112",
      t: "Additional Practice 1–5",
      en: "Lesson 10-6",
      ic: "📘",
      from: "Practice Book p. 111–112",
      keep: true,
      items: [
        ...mixQ(
          "Drew spends {3 2/3} minutes on one math problem and {4 2/3} on another. How long on both?",
          [[3, 2], "+", [4, 2]],
          3,
        ),
        ...mixQ(
          "Jessica uses {6 2/5} bags of mulch: {2 4/5} around her mailbox and the rest in her flower beds. How much in the flower beds?",
          [[6, 2], "−", [2, 4]],
          5,
        ),
        ...mixQ(
          "Erin's hair was 9 inches long, now {7 7/10}. How much was trimmed off?",
          [9, "−", [7, 7]],
          10,
        ),
        ...mixQ(
          "Cara's airplane flew {9 7/12} feet, Andy's {6 11/12}. How much farther did Cara's fly?",
          [[9, 7], "−", [6, 11]],
          12,
        ),
        ...mixQ(
          "A picture frame is {4 3/8} inches long and {5 3/8} inches wide. What is the perimeter?",
          [[4, 3], "+", [5, 3], "+", [4, 3], "+", [5, 3]],
          8,
        ),
      ],
    },
  ],
};
