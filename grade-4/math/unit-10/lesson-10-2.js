// Math · Grade 4 · Lesson 10-2 « Represent Adding Mixed Numbers » (Reveal Math, Unit 10 « Addition and Subtraction Strategies with Mixed Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 10:40–11:50; no page numbers;
// On My Own 1–6 read from the frames between), Student Practice Book p. 103–104. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// A sum of mixed numbers is asked in two steps: the whole number, then the fraction part (after making another whole).
const M = (w, n, d) => `{${w} ${n}/${d}}`;
// [w1, n1] + [w2, n2] (denominator d) → two items: wholes, then the fraction part
const mixAdd = (q, [w1, n1], [w2, n2], d, more = {}) => {
  const tot = (w1 + w2) * d + n1 + n2;
  const W = Math.floor(tot / d),
    N = tot % d;
  const carry = n1 + n2 >= d;
  const how = `${w1} + ${w2} = ${w1 + w2} wholes, {${n1}/${d}} + {${n2}/${d}} = {${n1 + n2}/${d}}${carry ? (N ? ` = {1 ${N}/${d}}` : " = 1") : ""}`;
  const vis = more.vis || {
    kind: "fline",
    hi: Math.ceil(tot / d) + (tot % d === 0 ? 1 : 0),
    lines: [{ d, jumps: [w1 * d + n1, w2 * d + n2], lab: false }],
  };
  const sum = `${M(w1, n1, d)} + ${M(w2, n2, d)}`;
  // the parts make exactly a whole: one step, the sum is a whole number
  if (N === 0)
    return [
      {
        type: "num",
        q: `${q} What is the sum?`,
        pre: `${sum} =`,
        a: W,
        vis,
        ...(more.first || {}),
        x: `${how}: ${sum} = [${W}].`,
      },
    ];
  return [
    {
      type: "num",
      q: `${q} How many wholes are in the sum?`,
      pre: `${sum} =`,
      post: "and a part",
      a: W,
      vis,
      ...(more.first || {}),
      x: `${how}: [${W}] wholes${carry ? " (one more whole from the parts)" : ""}.`,
    },
    {
      type: "num",
      q: `${sum}: what is the fraction part?`,
      pre: `${sum} = ${W}`,
      fr: `?/${d}`,
      a: N,
      vis,
      x: `${how}: ${sum} = ${M(W, N, d).replace(`${N}/`, `[${N}]/`)}.`,
    },
  ];
};

window.LESSON = {
  n: "10-2",
  key: "math4-l10-2",
  grade: 4,
  title: "Show Adding Mixed Numbers",
  en: "Add the wholes and the parts; make another whole",
  unit: "Unit 10 · Lesson 10-2",
  book: "e-book Lesson 10-2 · Practice Book p. 103–104",
  imgDir: "img/lesson-10-2",
  cover: "curious",
  question: {
    q: "How do I add [mixed numbers]?",
    // unverified: a model answer, the book gives none
    a: "Add the whole numbers, then add the fraction parts. If the parts make a whole or more, make [another whole]: {1 2/4} + {2 3/4} = 3 + {5/4} = {4 1/4}.",
    img: "curious",
  },
  words: [
    { w: "Mixed number", m: "a whole number and a fraction: {1 2/4}" },
    { w: "Whole-number part", m: "{1 2/4}: the 1" },
    { w: "Fraction part", m: "{1 2/4}: the {2/4}" },
    {
      w: "Another whole",
      m: "{5/4} = 1 and {1/4}: the parts make one more whole",
    },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🍎",
      img: "curious",
      lines: [
        "Two plates: a whole apple and slices on each.",
        "Wholes and parts, like a [mixed number].",
        "How much apple is there in all?",
      ],
    },
    {
      t: "Tara's shelves",
      ic: "🪵",
      lines: [
        "Tara cuts shelves {1 2/4} feet and {2 3/4} feet from a 5-foot board.",
        "{1 2/4} + {2 3/4} = b. How much of the board will she use?",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 4, k: 4, l: "1" },
          { d: 4, k: 2, l: "{2/4}" },
          { d: 4, k: 4, l: "2", c: 1 },
          { d: 4, k: 4, c: 1 },
          { d: 4, k: 3, l: "{3/4}", c: 1 },
        ],
      },
    },
    {
      t: "Wholes, then parts",
      ic: "➕",
      lines: [
        "Wholes: 1 + 2 = [3].",
        "Parts: {2/4} + {3/4} = {5/4} = [1 and {1/4}]: another whole!",
        "3 + {1 1/4} = {4 1/4} feet.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "1 + 2 = 3",
          "{2/4} + {3/4} = {5/4} = {1 1/4}",
          "3 + {1 1/4} = {4 1/4}",
        ],
      },
    },
    {
      t: "On a number line",
      ic: "🚲",
      lines: [
        "Kyle rode {2 3/5} miles in the morning and {1 4/5} miles in the afternoon.",
        "Jump {2 3/5}, then {1 4/5}: you land on {4 2/5}.",
      ],
      vis: { kind: "fline", hi: 5, lines: [{ d: 5, jumps: [13, 9] }] },
    },
  ],

  games: [
    {
      k: "add",
      t: "Add mixed numbers",
      en: "Wholes, then parts",
      ic: "➕",
      keep: true,
      items: [
        [[1, 1], [2, 1], 3],
        [[2, 3], [1, 2], 5],
        [[1, 5], [1, 4], 6],
        [[3, 1], [1, 3], 4],
      ].flatMap(([a, b, d]) => mixAdd("Add the mixed numbers.", a, b, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 10-2",
      t: "Be Curious",
      en: "Apples and slices",
      ic: "🍎",
      from: "e-book 10-2 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key; any answer is right
          a: "Each plate has a whole apple and some slices: 2 slices on one plate, 3 on the other. I wonder how much apple there is in all, if the slices are the same size.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 10-2",
      t: "Learn: Tara's shelves",
      en: "Make another whole",
      ic: "🪵",
      from: "e-book 10-2 · Learn",
      keep: true,
      items: mixAdd(
        "Tara makes shelves {1 2/4} feet and {2 3/4} feet long.",
        [1, 2],
        [2, 3],
        4,
      ),
    },
    {
      k: "together",
      g: "📗 Book · Lesson 10-2",
      t: "Work Together",
      en: "Kyle's bike ride",
      ic: "🚲",
      from: "e-book 10-2 · Work Together",
      keep: true,
      items: mixAdd(
        "Kyle rode {2 3/5} miles in the morning and {1 4/5} miles in the afternoon.",
        [2, 3],
        [1, 4],
        5,
      ),
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 10-2",
      t: "On My Own 1–6",
      en: "What is the sum?",
      ic: "➕",
      from: "e-book 10-2 · On My Own 1–6",
      keep: true,
      items: [
        ...mixAdd("What is the sum?", [1, 2], [2, 2], 5),
        ...mixAdd("What is the sum?", [2, 3], [1, 2], 4),
        ...mixAdd("What is the sum?", [1, 6], [1, 4], 12),
        ...mixAdd("What is the sum?", [2, 5], [1, 7], 8),
        ...mixAdd("What is the sum?", [1, 7], [1, 9], 10),
        ...mixAdd("What is the sum?", [2, 2], [1, 3], 6),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 10-2",
      t: "On My Own 7–12",
      en: "Peaches, circles, walking, Nate",
      ic: "🍑",
      from: "e-book 10-2 · On My Own 7–12",
      keep: true,
      items: [
        ...mixAdd(
          "Greg has {1 3/4} pounds of peaches and buys {3 3/4} pounds more.",
          [1, 3],
          [3, 3],
          4,
        ),
        ...mixAdd(
          "Use the fraction circles to find the sum of {1 4/6} + {1 3/6}.",
          [1, 4],
          [1, 3],
          6,
          {
            vis: {
              kind: "fbar",
              side: true,
              rows: [
                { d: 6, k: 6, pie: true },
                { d: 6, k: 4, pie: true },
                { d: 6, k: 6, pie: true, c: 1 },
                { d: 6, k: 3, pie: true, c: 1 },
              ],
            },
          },
        ),
        ...mixAdd(
          "Lynelle walked {2 5/8} miles in the morning and {1 5/8} miles in the evening.",
          [2, 5],
          [1, 5],
          8,
        ),
        {
          type: "tf",
          q: "Lynelle's goal is 4 miles each day. Did she meet her goal yesterday?",
          a: true,
          yes: ["Yes", "No"],
          vis: { kind: "fline", hi: 5, lines: [{ d: 8, pt: 34, lab: false }] },
          x: "{2 5/8} + {1 5/8} = {4 2/8}: more than 4 miles. Yes!",
        },
        ...mixAdd(
          "Tomika spent {1 2/3} hours on her science project and {1 1/3} more hours reading than that. How many hours did she read?",
          [1, 2],
          [1, 1],
          3,
        ),
        {
          type: "mc",
          q: "Nate used a number line to find {1 5/10} + {1 3/10}: jump 1, jump 1, then {5/10}, then {3/10}. How can you explain his strategy?",
          opts: [
            "He added the wholes first, then the parts: {2 8/10}",
            "He added only the parts: {8/10}",
            "He added the wholes and the bottoms: {2 8/20}",
          ],
          vis: {
            kind: "fline",
            hi: 3,
            lines: [{ d: 10, jumps: [10, 10, 5, 3], lab: false }],
          },
          x: "Two jumps of 1 (the wholes), then {5/10} and {3/10} (the parts): {2 8/10}.",
        },
        {
          type: "mc",
          q: "Extend Your Thinking: Jason drove {3 5/6} hours, before and after stopping to eat. How long could he have driven before and after?",
          opts: [
            "{1 2/6} and {2 3/6} hours",
            "{1 2/6} and {2 2/6} hours",
            "{2 5/6} and {1 5/6} hours",
            "{3/6} and {3 2/6} hours",
          ],
          vis: { kind: "lines", rows: ["? + ? = {3 5/6}"] },
          // unverified: the book takes any two times that add to 3 5/6 (the 4th choice works too: {3/6} + {3 2/6})
          x: "{1 2/6} + {2 3/6} = {3 5/6}. ({3/6} + {3 2/6} works too; the 2nd and 3rd do not.)",
        },
        {
          type: "open",
          q: "Reflect: How does the way you think about the mixed numbers in a problem help you represent the addition?",
          vis: { kind: "lines", rows: ["wholes + wholes", "parts + parts"] },
          // unverified: a model answer, the book gives none
          a: "A mixed number is wholes and parts. I show the wholes as whole tiles or jumps of 1 and the parts as small tiles, add each kind, then make another whole if the parts make 1 or more.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 103–104",
      t: "Additional Practice 1–9",
      en: "Lesson 10-2",
      ic: "📘",
      from: "Practice Book p. 103–104",
      keep: true,
      items: [
        ...mixAdd("Find the sum.", [1, 2], [1, 4], 6),
        ...mixAdd("Find the sum.", [2, 3], [1, 1], 12),
        ...mixAdd("Find the sum.", [2, 2], [2, 2], 3),
        ...mixAdd("Find the sum.", [4, 3], [2, 4], 5),
        ...mixAdd("Find the sum.", [3, 2], [2, 9], 10),
        ...mixAdd("Find the sum.", [1, 11], [2, 5], 12),
        ...mixAdd(
          "Anthony uses {2 3/6} cups white flour and {1 5/6} cups wheat flour.",
          [2, 3],
          [1, 5],
          6,
        ),
        ...mixAdd(
          "Lisa read {3 4/5} pages on Wednesday and {4 2/5} pages on Thursday.",
          [3, 4],
          [4, 2],
          5,
        ),
        ...mixAdd(
          "Joel hiked {3 5/8} miles on Saturday and {5 7/8} miles on Sunday.",
          [3, 5],
          [5, 7],
          8,
        ),
        {
          type: "tf",
          q: "Joel says he hiked more than 10 miles on Saturday and Sunday. Is he correct?",
          a: false,
          yes: ["Yes, he is correct", "No, he is not"],
          vis: { kind: "fline", hi: 11, lines: [{ d: 1, pt: 9 }] },
          x: "{3 5/8} + {5 7/8} = {9 4/8}: less than 10 miles.",
        },
      ],
    },
  ],
};
