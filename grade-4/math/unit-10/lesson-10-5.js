// Math · Grade 4 · Lesson 10-5 « Subtract Mixed Numbers » (Reveal Math, Unit 10 « Addition and Subtraction Strategies with Mixed Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 13:15–14:20; no page numbers;
// On My Own 1–6 read from the frames between), Student Practice Book p. 109–110. No teacher's key. Log: grade-4/math/SOURCES.md.
// A difference of mixed numbers is asked in steps (helper as in lesson 10-4).
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
  n: "10-5",
  key: "math4-l10-5",
  grade: 4,
  title: "Subtract Mixed Numbers",
  en: "Subtract with equivalent fractions or a related addition",
  unit: "Unit 10 · Lesson 10-5",
  book: "e-book Lesson 10-5 · Practice Book p. 109–110",
  imgDir: "img/lesson-10-5",
  cover: "curious",
  question: {
    q: "How do I choose a strategy to [subtract] mixed numbers?",
    // unverified: a model answer, the book gives none
    a: "Write both as fractions and subtract the tops: {2 1/8} − {1 4/8} = {17/8} − {12/8} = {5/8}. Or count up from the smaller number: {1 4/8} + {4/8} = 2, + {1/8} = {2 1/8}.",
    img: "curious",
  },
  words: [
    { w: "Equivalent fraction", m: "{2 1/8} = {17/8}" },
    {
      w: "Related addition",
      m: "{2 1/8} − {1 4/8} = q, so {1 4/8} + q = {2 1/8}",
    },
    { w: "Difference", m: "how much more: {5/8}" },
    { w: "Decompose a whole", m: "1 = {8/8}" },
  ],
  ideas: [
    {
      t: "What could the question be?",
      ic: "🪧",
      img: "curious",
      lines: [
        "Ford St is {1 3/4} miles away, Coolidge Ave {3 1/4} miles.",
        "How much farther is Coolidge Ave?",
        "{3 1/4} − {1 3/4} = {1 2/4} miles.",
      ],
    },
    {
      t: "One way: fractions",
      ic: "🧃",
      lines: [
        "Jennifer used {2 1/8} qt of orange juice and {1 4/8} qt of pineapple juice.",
        "{2 1/8} = {17/8}, {1 4/8} = {12/8}. {17/8} − {12/8} = {5/8}.",
        "She used {5/8} qt more orange juice.",
      ],
      vis: { kind: "lines", rows: ["{17/8} − {12/8} = {5/8}"] },
    },
    {
      t: "Another way: count up",
      ic: "🦘",
      lines: [
        "{1 4/8} + q = {2 1/8}.",
        "From {1 4/8} jump {4/8} to 2, then {1/8} to {2 1/8}.",
        "{4/8} + {1/8} = {5/8}.",
      ],
      vis: {
        kind: "fline",
        hi: 3,
        lines: [{ d: 8, from: 12, jumps: [4, 1], lab: false }],
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
        [[5, 1], [2, 4], 6],
        [[3, 2], [1, 7], 10],
        [[4, 3], [2, 1], 5],
        [[6, 0], [3, 2], 3],
      ].flatMap(([a, b, d]) => mixSub("Subtract.", a, b, d)),
    },
    {
      k: "frac",
      t: "Write as a fraction",
      en: "Then subtract the tops",
      ic: "🔁",
      items: [
        [2, 1, 8],
        [3, 2, 5],
        [1, 5, 6],
        [4, 1, 4],
      ].map(([w, n, d]) => ({
        type: "num",
        q: "Write the mixed number as a fraction.",
        pre: `{${w} ${n}/${d}} =`,
        fr: `?/${d}`,
        a: w * d + n,
        vis: { kind: "lines", rows: [`${w} × ${d} + ${n} = ?`] },
        x: `${w} × ${d} + ${n} = ${w * d + n}: {${w} ${n}/${d}} = {[${w * d + n}]/${d}}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 10-5",
      t: "Be Curious",
      en: "A street sign",
      ic: "🪧",
      from: "e-book 10-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: any question about the sign is right
          a: "How much farther is Coolidge Ave than Ford St? {3 1/4} − {1 3/4} = {1 2/4} miles.",
        },
        ...mixSub(
          "How much farther is Coolidge Ave than Ford St?",
          [3, 1],
          [1, 3],
          4,
        ),
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 10-5",
      t: "Learn: punch recipe",
      en: "Two ways",
      ic: "🧃",
      from: "e-book 10-5 · Learn",
      keep: true,
      items: mixSub(
        "Jennifer used {2 1/8} qt of orange juice and {1 4/8} qt of pineapple juice. How many more quarts of orange juice?",
        [2, 1],
        [1, 4],
        8,
      ),
    },
    {
      k: "together",
      g: "📗 Book · Lesson 10-5",
      t: "Work Together",
      en: "Joseph's plywood",
      ic: "🪵",
      from: "e-book 10-5 · Work Together",
      keep: true,
      items: mixSub(
        "Joseph's plywood is {4 1/4} feet long. He cuts off {2 3/4} feet. How long is the piece left?",
        [4, 1],
        [2, 3],
        4,
      ),
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 10-5",
      t: "On My Own 1–6",
      en: "What is the difference?",
      ic: "➖",
      from: "e-book 10-5 · On My Own 1–6",
      keep: true,
      items: [
        ...mixSub("", [4, 10], [2, 3], 12),
        ...mixSub("", [3, 1], [1, 5], 8),
        ...mixSub("", [1, 1], [0, 2], 3),
        ...mixSub("", [4, 0], [0, 8], 10),
        ...mixSub("", [3, 1], [0, 2], 4),
        ...mixSub("", [4, 2], [0, 3], 6),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 10-5",
      t: "On My Own 7–12",
      en: "Rug, Christy, fruit, Cooper, fabric",
      ic: "🧶",
      from: "e-book 10-5 · On My Own 7–12",
      keep: true,
      items: [
        ...mixSub(
          "A rug is {9 5/12} feet long and {6 1/12} feet wide. How much longer is the length?",
          [9, 5],
          [6, 1],
          12,
        ),
        {
          type: "tf",
          q: "Error Analysis: Christy solved {3 2/8} − {2 7/8} and got {1 5/8}. Is that reasonable?",
          a: false,
          yes: ["Yes, it is", "No, it is not"],
          vis: { kind: "lines", rows: ["{3 2/8} − {2 7/8} = {1 5/8} ?"] },
          x: "{2 7/8} is almost 3 and {3 2/8} is a little more than 3: the difference is less than 1. {3 2/8} − {2 7/8} = {3/8}.",
        },
        ...mixSub("Find the correct difference.", [3, 2], [2, 7], 8),
        ...mixSub(
          "Jon has {3 1/4} cups of fruit: {1 3/4} cups of strawberries and the rest blueberries. How many cups of blueberries?",
          [3, 1],
          [1, 3],
          4,
        ),
        {
          type: "mc",
          q: "Cooper solved {8 9/12} − {4 4/12}: {8 9/12} − 4 = {4 9/12}, then {4 9/12} − {4/12} = {4 5/12}. What strategy did he use?",
          opts: [
            "He took away the whole number first, then the fraction part",
            "He changed both numbers to fractions",
            "He added {4 4/12}",
          ],
          vis: {
            kind: "lines",
            rows: ["{8 9/12} − 4 = {4 9/12}", "{4 9/12} − {4/12} = {4 5/12}"],
          },
          x: "He decomposed {4 4/12} into 4 and {4/12} and took them away one at a time.",
        },
        ...mixSub(
          "Tammy has {4 1/3} feet of fabric, {3 2/3} feet more than Megan. How much does Megan have?",
          [4, 1],
          [3, 2],
          3,
        ),
        {
          type: "mc",
          q: "Extend Your Thinking: {3 ?/8} − {2 ?/8} = {? 6/8}. Which numbers could be missing?",
          opts: [
            "{3 7/8} − {2 1/8} = {1 6/8}",
            "{3 7/8} − {2 1/8} = {6/8}",
            "{3 6/8} − {2 6/8} = {1 6/8}",
            "{3 2/8} − {2 4/8} = {1 6/8}",
          ],
          vis: { kind: "lines", rows: ["{3 ?/8} − {2 ?/8} = {? 6/8}"] },
          // unverified: the book takes any right numbers (7 and 1 → {1 6/8}, 1 and 3 → {6/8} …)
          x: "7 − 1 = 6 eighths, 3 − 2 = 1 whole: {1 6/8}. ({3 1/8} − {2 3/8} = {6/8} works too.)",
        },
        {
          type: "open",
          q: "Reflect: How did you decide what strategy to use when subtracting mixed numbers?",
          vis: { kind: "lines", rows: ["fractions", "or count up"] },
          // unverified: a model answer, the book gives none
          a: "If the first fraction part is big enough I subtract wholes and parts. If not, I write both as fractions, or count up from the smaller number.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 109–110",
      t: "Additional Practice 1–8",
      en: "Lesson 10-5",
      ic: "📘",
      from: "Practice Book p. 109–110",
      keep: true,
      items: [
        ...mixSub("Find the difference.", [5, 2], [1, 1], 3),
        ...mixSub("Find the difference.", [2, 9], [1, 5], 12),
        ...mixSub("Find the difference.", [4, 4], [2, 5], 10),
        ...mixSub("Find the difference.", [6, 1], [3, 2], 8),
        ...mixSub(
          "A green caterpillar is {2 3/4} inches long, a brown one {1 2/4} inches. How much longer is the green one?",
          [2, 3],
          [1, 2],
          4,
        ),
        ...mixSub(
          "Jim bikes 5 miles on Monday and {1 5/8} miles less on Tuesday. How far on Tuesday?",
          [5, 0],
          [1, 5],
          8,
        ),
        ...mixSub(
          "Ashley spent {4 1/6} hours on her yard and {2 5/6} hours cleaning. How much more on her yard?",
          [4, 1],
          [2, 5],
          6,
        ),
        {
          type: "tf",
          q: "Ian found {4 1/10} − {3 4/10}: 4 − 3 = 1, {1/10} − {4/10} = {3/10}, so {1 3/10}. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["{4 1/10} − {3 4/10} = {1 3/10} ?"] },
          x: "He can't take {4/10} from {1/10}: break a whole first. {4 1/10} = {3 11/10}, and {3 11/10} − {3 4/10} = {7/10}.",
        },
        ...mixSub("Find the correct solution.", [4, 1], [3, 4], 10),
      ],
    },
  ],
};
