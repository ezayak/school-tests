// Math · Grade 4 · Lesson 11-5 « Solve Problems Involving Fractions and Mixed Numbers » (Reveal Math, Unit 11 « Multiply Fractions by Whole Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 21:25–22:35; no page numbers),
// Student Practice Book p. 121–122. No teacher's key. Log: grade-4/math/SOURCES.md.
// The Be Curious is text only: the cover is the Learn picture (glass of orange juice).
// stepQ: one step whose answer is tot d-ths; expr is the printed equation, how the working. Asked as wholes, then the part (or once).
const M = (w, n, d) =>
  n === 0 ? `${w}` : w === 0 ? `{${n}/${d}}` : `{${w} ${n}/${d}}`;
const stepQ = (q, expr, tot, d, how, more = {}) => {
  const W = Math.floor(tot / d),
    N = tot % d;
  const vis = more.vis || { kind: "lines", rows: [`${expr} = ?`] };
  const res = M(W, N, d);
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
        x: `${how}: ${expr} = ${N === 0 ? `[${W}]` : `{[${N}]/${d}}`}.`,
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
      x: `${how}: ${expr} = ${res}, [${W}] wholes.`,
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
// n × {w a/d}
const mul = (q, n, [w, a], d, more) =>
  stepQ(
    q,
    `${n} × ${M(w, a, d)}`,
    n * (w * d + a),
    d,
    `${M(w, a, d)} = {${w * d + a}/${d}}, ${n} × ${w * d + a} = ${n * (w * d + a)}`,
    more,
  );

window.LESSON = {
  n: "11-5",
  key: "math4-l11-5",
  grade: 4,
  title: "Fraction Times Number Problems",
  en: "Word problems with fractions and mixed numbers, step by step",
  unit: "Unit 11 · Lesson 11-5",
  book: "e-book Lesson 11-5 · Practice Book p. 121–122",
  imgDir: "img/lesson-11-5",
  cover: "juice",
  question: {
    q: "How can I solve [multiplication problems] with fractions and mixed numbers?",
    // unverified: a model answer, the book gives none
    a: "Find the equal groups and multiply: 4 × {2/3} = {8/3}. If the problem asks for more, use a second step: 4 − {2 2/3} = {1 1/3}.",
    img: "juice",
  },
  words: [
    { w: "Equal groups", m: "4 friends with {2/3} cup each: 4 × {2/3}" },
    { w: "Step", m: "multiply first, then add or subtract" },
    { w: "Mixed number", m: "{8/3} = {2 2/3}" },
    { w: "Number line", m: "jumps of {2/3} from 0" },
  ],
  ideas: [
    {
      t: "Harlow's orange juice",
      ic: "🍊",
      img: "juice",
      lines: [
        "Harlow and her 3 friends each have {2/3} cup of juice: 4 × {2/3} = {8/3} = {2 2/3} cups.",
        "The recipe needs 4 cups: 4 − {2 2/3} = [{1 1/3}] cups more.",
      ],
    },
    {
      t: "On a number line",
      ic: "📏",
      lines: [
        "4 jumps of {2/3} land on {8/3}.",
        "From {8/3} to 4 is {4/3} = {1 1/3}.",
      ],
      vis: { kind: "fline", hi: 4, lines: [{ d: 3, jumps: [2, 2, 2, 2] }] },
    },
  ],

  games: [
    {
      k: "mul",
      t: "Groups of a mixed number",
      en: "n × w a/d",
      ic: "✖️",
      keep: true,
      items: [
        [3, [1, 1], 4],
        [2, [2, 3], 5],
        [4, [0, 5], 6],
        [5, [1, 1], 3],
      ].flatMap(([n, m, d]) => mul("Multiply.", n, m, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 11-5",
      t: "Be Curious",
      en: "What's the question?",
      ic: "🍊",
      from: "e-book 11-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Harlow and her friends each have some orange juice. They need some cups of orange juice for a recipe. What's the question?",
          img: "juice",
          // unverified: any question is right
          a: "How much more orange juice do they need for the recipe?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 11-5",
      t: "Learn: Harlow's juice",
      en: "Two steps",
      ic: "🍊",
      from: "e-book 11-5 · Learn",
      keep: true,
      items: [
        ...stepQ(
          "Harlow and her 3 friends each have {2/3} cup of orange juice. How much do they have?",
          "4 × {2/3}",
          8,
          3,
          "4 × 2 = 8 thirds",
          {
            vis: {
              kind: "fline",
              hi: 4,
              lines: [{ d: 3, jumps: [2, 2, 2, 2], lab: false }],
            },
          },
        ),
        ...stepQ(
          "They need 4 cups for the recipe. How much more do they need?",
          "4 − {2 2/3}",
          4,
          3,
          "12 − 8 = 4 thirds",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 11-5",
      t: "Work Together",
      en: "Jill's apples",
      ic: "🍎",
      from: "e-book 11-5 · Work Together",
      keep: true,
      items: mul(
        "Jill fills {1 2/3} baskets on Wednesday and 6 times as many on the weekend. How many baskets on the weekend?",
        6,
        [1, 2],
        3,
      ),
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 11-5",
      t: "On My Own 1–6",
      en: "Milk, videos, bananas, wood, pillows, swimming",
      ic: "🥛",
      from: "e-book 11-5 · On My Own 1–6",
      keep: true,
      items: [
        ...mul(
          "Drew's 3 brothers each drink {3 1/2} cups of milk a day. How much do they drink?",
          3,
          [3, 1],
          2,
        ),
        ...stepQ(
          "Singh's first 3 video clips are {1 4/5} minutes each. How long are they together?",
          "3 × {1 4/5}",
          27,
          5,
          "3 × 9 = 27 fifths",
        ),
        ...stepQ(
          "He watches {9 2/5} minutes in all. How long is the last clip?",
          "{9 2/5} − {5 2/5}",
          20,
          5,
          "47 − 27 = 20 fifths",
        ),
        ...stepQ(
          "Eloise puts {3/5} cup of bananas in her oatmeal for 7 days. How much?",
          "7 × {3/5}",
          21,
          5,
          "7 × 3 = 21 fifths",
        ),
        ...stepQ(
          "Her sister uses {1/5} cup for 7 days. How much?",
          "7 × {1/5}",
          7,
          5,
          "7 × 1 = 7 fifths",
        ),
        ...stepQ(
          "How many more cups does Eloise eat than her sister?",
          "{21/5} − {7/5}",
          14,
          5,
          "21 − 7 = 14 fifths",
        ),
        ...stepQ(
          "Gilbert uses {7/10} meter of wood for each of 4 small birdhouses. How much?",
          "4 × {7/10}",
          28,
          10,
          "4 × 7 = 28 tenths",
        ),
        ...stepQ(
          "He uses {1 2/10} meters for each of 2 large birdhouses. How much?",
          "2 × {1 2/10}",
          24,
          10,
          "2 × 12 = 24 tenths",
        ),
        ...stepQ(
          "How much wood in all?",
          "{28/10} + {24/10}",
          52,
          10,
          "28 + 24 = 52 tenths",
        ),
        ...mul(
          "Kyle made 6 pillows with {1 3/8} yards of fabric each. How much fabric?",
          6,
          [1, 3],
          8,
        ),
        ...mul(
          "Priya swam {2 3/4} miles each day for 4 days. How far?",
          4,
          [2, 3],
          4,
        ),
        {
          type: "tf",
          q: "Her goal was 10 miles. Did she reach it?",
          a: true,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["11 > 10"] },
          x: "4 × {2 3/4} = 11 miles, more than 10: yes.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 11-5",
      t: "On My Own 7–9",
      en: "Nutmeg, lemons, triathlon",
      ic: "🍋",
      from: "e-book 11-5 · On My Own 7–9",
      keep: true,
      items: [
        ...stepQ(
          "STEM: Saffron uses {3/4} teaspoon of nutmeg a day, 5 days a week. How much for 4 weeks (20 days)?",
          "20 × {3/4}",
          60,
          4,
          "20 × 3 = 60 fourths",
        ),
        ...stepQ(
          "Each week she used 5 × {3/4} = {15/4} teaspoons. Now she uses {5 1/4}. How many more each week?",
          "{5 1/4} − {15/4}",
          6,
          4,
          "21 − 15 = 6 fourths",
        ),
        ...mul(
          "Jared uses {3 2/5} pounds of lemons per batch. How much for 3 batches?",
          3,
          [3, 2],
          5,
        ),
        ...stepQ(
          "He has 12 pounds. How many pounds are left after 3 batches?",
          "12 − {10 1/5}",
          9,
          5,
          "60 − 51 = 9 fifths",
        ),
        ...stepQ(
          "Extend: Jonah runs {2 1/3} miles and bikes {4 1/3} miles a day. How far each day?",
          "{2 1/3} + {4 1/3}",
          20,
          3,
          "7 + 13 = 20 thirds",
        ),
        ...stepQ(
          "How far in 7 days?",
          "7 × {6 2/3}",
          140,
          3,
          "7 × 20 = 140 thirds",
        ),
        {
          type: "open",
          q: "Reflect: How can you solve multiplication problems with fractions and mixed numbers?",
          vis: {
            kind: "lines",
            rows: ["equal groups: n × fraction", "then + or −"],
          },
          // unverified: a model answer, the book gives none
          a: "Find the equal groups and multiply the whole number by the fraction (change a mixed number to a fraction). Then add or subtract if the problem has another step.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 121–122",
      t: "Additional Practice 1–5",
      en: "Lesson 11-5",
      ic: "📘",
      from: "Practice Book p. 121–122",
      keep: true,
      items: [
        ...stepQ(
          "Each of 5 apples weighs {3/5} pound. What is the total weight?",
          "5 × {3/5}",
          15,
          5,
          "5 × 3 = 15 fifths",
          {
            vis: {
              kind: "fline",
              hi: 4,
              lines: [{ d: 5, jumps: [3, 3, 3, 3, 3], lab: false }],
            },
          },
        ),
        ...mul(
          "Lisa swims {2 1/3} miles each day. How far in 4 days?",
          4,
          [2, 1],
          3,
        ),
        ...mul(
          "Randa uses {4 1/2} gallons of water each time she washes dishes. How much for 5 times?",
          5,
          [4, 1],
          2,
        ),
        {
          type: "mc",
          q: "Will she use less than 20 gallons?",
          opts: ["No, more than 20", "Yes, less than 20", "Exactly 20"],
          keep: ["Yes, less than 20", "No, more than 20", "Exactly 20"],
          vis: { kind: "lines", rows: ["{22 1/2} ? 20"] },
          x: "{22 1/2} gallons is more than 20.",
        },
        ...stepQ(
          "How much more than 20?",
          "{22 1/2} − 20",
          5,
          2,
          "45 − 40 = 5 halves",
        ),
        ...mul(
          "Jordan drinks {2 3/4} cups at each of 3 meals. How much?",
          3,
          [2, 3],
          4,
        ),
        ...stepQ(
          "She wants 10 cups a day. How many more cups does she need?",
          "10 − {8 1/4}",
          7,
          4,
          "40 − 33 = 7 fourths",
        ),
        ...mul(
          "Conrad's shelves are {1 5/6} feet tall. How tall are 3 stacked shelves?",
          3,
          [1, 5],
          6,
        ),
        {
          type: "num",
          q: "His garage is 12 feet tall. How many shelves can he stack? (6 shelves are 11 feet, 7 shelves are {12 5/6} feet.)",
          a: 6,
          post: "shelves",
          emoji: "📦",
          x: "6 × {1 5/6} = 11 feet fits, 7 × {1 5/6} = {12 5/6} feet does not: [6] shelves.",
        },
      ],
    },
  ],
};
