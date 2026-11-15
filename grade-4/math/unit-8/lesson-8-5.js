// Math · Grade 4 · Lesson 8-5 « Other Ways to Compare Fractions » (Reveal Math, Unit 8 « Fraction Equivalence »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-18-07.mp4, 3:43–4:52; no page numbers;
// On My Own 3 and 6 were still loading in the kept frames, read from the frames between), Student Practice Book p. 87–88.
// No teacher's key for this lesson. Log: grade-4/math/SOURCES.md. The Math Probe and the Unit 8 Review after it wait for the unit reviews.
const val = ([a, b]) => a / b;
const fr = ([a, b]) => `{${a}/${b}}`;
const sign = (x, y) => (val(x) < val(y) ? "<" : val(x) > val(y) ? ">" : "=");
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);
// how to compare: same bottom, same top, or make one of them the same
const why = (x, y) => {
  const s = sign(x, y);
  if (x[1] === y[1])
    return `Same bottom number: ${x[0]} parts ${s} ${y[0]} parts. ${fr(x)} ${s} ${fr(y)}.`;
  if (x[0] === y[0])
    return `Same top number: the smaller bottom number (${Math.min(x[1], y[1])}) has the bigger parts. ${fr(x)} ${s} ${fr(y)}.`;
  const d = lcm(x[1], y[1]);
  const X = [(x[0] * d) / x[1], d],
    Y = [(y[0] * d) / y[1], d];
  return `Make the bottom numbers the same: ${fr(x)} = ${fr(X)}, ${fr(y)} = ${fr(Y)}. ${X[0]} ${s} ${Y[0]}, so ${fr(x)} ${s} ${fr(y)}.`;
};
const cmpQ = (x, y, more = {}) => ({
  type: "mc",
  q: `Choose >, < or = to compare the fractions: ${fr(x)} ___ ${fr(y)}`,
  opts: [sign(x, y), ...["<", "=", ">"].filter((s) => s !== sign(x, y))],
  keep: ["<", "=", ">"],
  vis: { kind: "lines", rows: [`${fr(x)}   ?   ${fr(y)}`] },
  help: {
    t: "Same top or same bottom?",
    lines: [
      "Same bottom: compare the tops.",
      "Same top: the smaller bottom has bigger parts.",
      "Neither: write an equivalent fraction first.",
    ],
  },
  x: why(x, y),
  ...more,
});
// "{3/4} = {?/8}": make the bottom numbers the same first
const sameQ = (q, [a, b], d, more = {}) => ({
  type: "num",
  q,
  pre: `{${a}/${b}} =`,
  fr: `?/${d}`,
  a: (a * d) / b,
  vis: { kind: "lines", rows: [`{${a}/${b}} = {?/${d}}`] },
  x: `${a} × ${d / b} = ${(a * d) / b}, ${b} × ${d / b} = ${d}: {${a}/${b}} = {[${(a * d) / b}]/${d}}`,
  ...more,
});

window.LESSON = {
  n: "8-5",
  key: "math4-l8-5",
  grade: 4,
  title: "Compare with Like Tops or Bottoms",
  en: "Compare fractions with the same numerator or the same denominator",
  unit: "Unit 8 · Lesson 8-5",
  book: "e-book Lesson 8-5 · Practice Book p. 87–88",
  imgDir: "img/lesson-8-5",
  cover: "curious",
  question: {
    q: "How do I choose a way to compare two fractions?",
    // unverified: a model answer, the book gives none
    a: "Same bottom: compare the tops. Same top: the smaller bottom has bigger parts. Neither: make the bottoms (or the tops) the [same] with an equivalent fraction. Or use 0, {1/2}, 1.",
    img: "curious",
  },
  words: [
    {
      w: "Like denominators",
      m: "the same bottom number: {6/8} and {5/8}",
    },
    { w: "Like numerators", m: "the same top number: {4/6} and {4/5}" },
    { w: "Numerator", m: "the top number: how many parts" },
    {
      w: "Denominator",
      m: "the bottom number: how big the parts are (more parts = smaller parts)",
    },
    { w: "Equivalent fraction", m: "the same amount: {3/4} = {6/8}" },
  ],
  ideas: [
    {
      t: "Three gardens",
      ic: "🌼",
      img: "curious",
      lines: [
        "Lisa planted {3/8} of her garden, Linda {6/8}, Trevor {6/12}.",
        "Lisa and Linda: the same [eighths]. Linda and Trevor: the same [6] boxes.",
      ],
    },
    {
      t: "Like denominators",
      ic: "🧀",
      lines: [
        "Parmesan cheese {3/4} cup, mozzarella {5/8} cup.",
        "{3/4} = {6/8}. Now the bottoms are the same: 6 eighths > 5 eighths.",
        "More parmesan than mozzarella.",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 8, k: 6, l: "{6/8}" },
          { d: 8, k: 5, l: "{5/8}" },
        ],
      },
    },
    {
      t: "Like numerators",
      ic: "🍝",
      lines: [
        "Marinara sauce {2/3} liter, meat sauce {4/5} liter.",
        "{2/3} = {4/6}. Now the tops are the same: 4 sixths < 4 fifths.",
        "Sixths are [smaller] than fifths. Less marinara than meat sauce.",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 6, k: 4, l: "{4/6}" },
          { d: 5, k: 4, l: "{4/5}" },
        ],
      },
    },
    {
      t: "The same whole",
      ic: "🍎",
      lines: [
        "Hannah ate {3/4} of a [small] apple, her brother {7/12} of a [large] apple.",
        "{9/12} > {7/12}, but the apples are not the same size!",
        "We can compare fractions only of the [same whole].",
      ],
      vis: {
        kind: "lines",
        rows: ["🍏 {3/4} of a small apple", "🍎 {7/12} of a large apple"],
      },
    },
    {
      t: "Eighths and sixths",
      ic: "🍫",
      lines: [
        "{5/8} and {10/12}: {10/12} = {5/6}. Now the tops are the same.",
        "Eighths are smaller than sixths, so {5/8} < {5/6}.",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 8, k: 5, l: "{5/8}" },
          { d: 6, k: 5, l: "{5/6}" },
        ],
      },
    },
  ],

  games: [
    {
      k: "cmp",
      t: "Same top or same bottom",
      en: "<, = or >",
      ic: "⚖️",
      items: [
        [
          [3, 7],
          [5, 7],
        ],
        [
          [2, 3],
          [2, 5],
        ],
        [
          [5, 12],
          [7, 12],
        ],
        [
          [3, 8],
          [3, 4],
        ],
        [
          [1, 2],
          [3, 8],
        ],
        [
          [4, 6],
          [2, 3],
        ],
        [
          [5, 6],
          [7, 12],
        ],
        [
          [2, 5],
          [3, 10],
        ],
      ].map(([x, y]) => cmpQ(x, y)),
    },
    {
      k: "same",
      t: "Make the bottoms the same",
      en: "Then compare",
      ic: "🟰",
      items: [
        [[1, 2], 8],
        [[2, 3], 6],
        [[3, 5], 10],
        [[3, 4], 12],
        [[1, 3], 12],
        [[5, 6], 12],
      ].map(([f, d]) =>
        sameQ(`Write {${f[0]}/${f[1]}} with ${d} as the bottom number.`, f, d),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 8-5",
      t: "Be Curious",
      en: "Three gardens",
      ic: "🌼",
      from: "e-book 8-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Lisa's, Linda's and Trevor's gardens. How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The same: the gardens are the same size. Lisa and Linda have 8 boxes (eighths); Linda and Trevor planted 6 boxes. Different: Lisa planted {3/8}, Linda {6/8}, Trevor {6/12} = {1/2}. Linda planted the most.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 8-5",
      t: "Learn: cheese and sauce",
      en: "Like denominators, like numerators",
      ic: "🧀",
      from: "e-book 8-5 · Learn",
      keep: true,
      items: [
        sameQ(
          "Marta's father used {3/4} cup of parmesan and {5/8} cup of mozzarella. Write {3/4} in eighths.",
          [3, 4],
          8,
        ),
        cmpQ([3, 4], [5, 8], {
          q: "Compare the cheese: {3/4} ___ {5/8}",
        }),
        {
          type: "num",
          q: "He used {2/3} liter of marinara and {4/5} liter of meat sauce. Make the tops the same: {2/3} = {4/?}",
          pre: "{2/3} =",
          fr: "4/?",
          a: 6,
          vis: { kind: "lines", rows: ["{2/3} = {4/?}", "2 × 2 = 4"] },
          x: "2 × 2 = 4, 3 × 2 = 6: {2/3} = {4/[6]}",
        },
        cmpQ([2, 3], [4, 5], {
          q: "Compare the sauce: {2/3} ___ {4/5}",
        }),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 8-5",
      t: "Work Together",
      en: "Hannah's apple",
      ic: "🍎",
      from: "e-book 8-5 · Work Together",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Hannah ate {3/4} of a small apple. Her brother ate {7/12} of a large apple. Hannah says she ate more because {3/4} = {9/12} and {9/12} > {7/12}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: {
            kind: "lines",
            rows: ["🍏 {3/4} of a small apple", "🍎 {7/12} of a large apple"],
          },
          // unverified: no key; the book's point is the different wholes
          x: "{9/12} > {7/12} only for the same whole. The apples are not the same size: {7/12} of a large apple can be more than {3/4} of a small one.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 8-5",
      t: "On My Own 1–6",
      en: "Choose >, < or =",
      ic: "⚖️",
      from: "e-book 8-5 · On My Own 1–6",
      keep: true,
      items: [
        cmpQ([3, 5], [8, 10]),
        cmpQ([2, 6], [1, 3]),
        cmpQ([4, 12], [2, 5]),
        cmpQ([3, 4], [6, 10]),
        cmpQ([2, 4], [5, 10]),
        cmpQ([7, 12], [2, 3]),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 8-5",
      t: "On My Own 7–8",
      en: "Popcorn, Klaya",
      ic: "🍿",
      from: "e-book 8-5 · On My Own 7–8",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Russel ate {3/5} of his popcorn and Toby ate {6/8} of his (the same box size). Did Russel eat more popcorn than Toby?",
          a: false,
          yes: ["Yes", "No"],
          vis: {
            kind: "lines",
            rows: ["🍿 Russel {3/5}", "🍿 Toby {6/8}"],
          },
          x: "{6/8} = {3/4}. Same top 3: fifths are smaller than fourths, so {3/5} < {3/4}. Toby ate more.",
        },
        {
          type: "mc",
          q: "Klaya writes one fraction as an equivalent fraction so that the two fractions have like denominators. What fractions might Klaya be comparing?",
          opts: [
            "{1/2} and {3/8}",
            "{1/3} and {1/2}",
            "{2/5} and {3/4}",
            "{3/7} and {2/5}",
          ],
          vis: { kind: "lines", rows: ["{?/?} = {?/8}"] },
          // unverified: the book takes any pair where one bottom divides the other
          x: "{1/2} = {4/8}: now both are eighths, {4/8} > {3/8}. In the other pairs neither bottom number goes into the other.",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 8-5",
      t: "On My Own 9–12",
      en: "Tickets, Julie, Extend",
      ic: "🎟️",
      from: "e-book 8-5 · On My Own 9–12",
      keep: true,
      items: [
        sameQ(
          "Ethan sold {1/4} of his raffle tickets. Petra sold {3/8} of hers (the same number of tickets). Write {1/4} in eighths.",
          [1, 4],
          8,
        ),
        {
          type: "mc",
          q: "Who sold more tickets?",
          opts: ["Petra", "Ethan", "The same"],
          keep: ["Ethan", "Petra", "The same"],
          vis: { kind: "lines", rows: ["Ethan {1/4} = {2/8}", "Petra {3/8}"] },
          x: "{1/4} = {2/8} and {2/8} < {3/8}: [Petra] sold more.",
        },
        {
          type: "mc",
          q: "Lilliana compares {4/10} and {8/12} with equivalent fractions. Brad uses a benchmark fraction. Which way is quicker?",
          opts: [
            "Brad's: {4/10} < {1/2} < {8/12}",
            "Lilliana's: write both in sixtieths",
            "Both are wrong",
          ],
          vis: { kind: "lines", rows: ["{4/10}  and  {8/12}"] },
          // unverified: the book asks for an opinion; the benchmark is the quicker way here
          x: "{4/10} is less than {1/2} and {8/12} is greater than {1/2}: one look at {1/2} is enough.",
        },
        {
          type: "tf",
          q: "Error Analysis: Janet's family eats {4/8} of a large pizza. Julie's family eats {3/6} of a small pizza. Julie says they ate the same amount because {4/8} = {3/6}. Is Julie correct?",
          a: false,
          yes: ["Yes, she is correct", "No, she is not"],
          vis: {
            kind: "lines",
            rows: ["🍕 {4/8} of a large pizza", "🍕 {3/6} of a small pizza"],
          },
          x: "{4/8} = {3/6} = {1/2}, but half of a large pizza is more than half of a small pizza: the wholes are not the same.",
        },
        sameQ(
          "Extend Your Thinking: compare {2/3} and {3/4} with equivalent fractions. Write {2/3} in twelfths.",
          [2, 3],
          12,
        ),
        sameQ("Now write {3/4} in twelfths.", [3, 4], 12),
        cmpQ([2, 3], [3, 4], { q: "So {2/3} ___ {3/4}" }),
        {
          type: "open",
          q: "Reflect: How do you choose a strategy when comparing fractions with different numerators and denominators?",
          vis: { kind: "lines", rows: ["{3/4} = {6/8}", "{2/3} = {4/6}"] },
          // unverified: a model answer, the book gives none
          a: "If one bottom number goes into the other, I make the bottoms the same. If the tops are easy to make the same, I do that. If one fraction is less than {1/2} and the other more, I use {1/2}.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 87–88",
      t: "Additional Practice 1–7",
      en: "Lesson 8-5",
      ic: "📘",
      from: "Practice Book p. 87–88",
      keep: true,
      items: [
        cmpQ([2, 5], [3, 5]),
        cmpQ([7, 6], [4, 6]),
        cmpQ([2, 10], [2, 8]),
        cmpQ([3, 4], [3, 10]),
        sameQ(
          "Compare {1/4} and {4/12} with a like denominator. Write {1/4} in twelfths.",
          [1, 4],
          12,
        ),
        cmpQ([3, 12], [4, 12]),
        cmpQ([1, 4], [4, 12], {
          q: "Compare the original fractions: {1/4} ___ {4/12}",
        }),
        {
          type: "mc",
          q: "{3/10} of Jaime's bowling balls and {1/5} of Vanessa's went in the gutter. Who had more balls in the gutter?",
          opts: ["Jaime", "Vanessa", "The same"],
          keep: ["Jaime", "Vanessa", "The same"],
          vis: { kind: "lines", rows: ["🎳 Jaime {3/10}", "🎳 Vanessa {1/5}"] },
          x: "{1/5} = {2/10}, and {3/10} > {2/10}: [Jaime].",
        },
        {
          type: "mc",
          q: "Andrew has mowed {3/5} of his yard and Carol {4/6} of hers (the same size). Who has mowed more?",
          opts: ["Carol", "Andrew", "The same"],
          keep: ["Andrew", "Carol", "The same"],
          vis: { kind: "lines", rows: ["🌱 Andrew {3/5}", "🌱 Carol {4/6}"] },
          x: "{3/5} = {18/30}, {4/6} = {20/30}: {3/5} < {4/6}. [Carol] has mowed more.",
        },
      ],
    },
  ],
};
