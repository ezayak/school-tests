// Math · Grade 4 · Lesson 9-5 « Subtract Fractions with Like Denominators » (Reveal Math, Unit 9 « Addition and Subtraction Meanings and Strategies with Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 5:28–6:44; no page numbers;
// On My Own 3 and 5–10 read from the frames between), Student Practice Book p. 97–98. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// "{a/d} − {b/d} (− {c/d}) = ?": subtract the tops, keep the bottom
const subQ = (q, nums, d, more = {}) => {
  const r = nums.slice(1).reduce((x, y) => x - y, nums[0]);
  const fr = nums.map((n) => `{${n}/${d}}`).join(" − ");
  return {
    type: "num",
    q,
    pre: `${fr} =`,
    fr: `?/${d}`,
    a: r,
    vis: {
      kind: "lines",
      rows: [`${nums.join(" − ")} = ?`],
      note: `subtract the tops, the bottom stays ${d}`,
    },
    x: `${nums.join(" − ")} = ${r}: ${fr} = {[${r}]/${d}}.`,
    ...more,
  };
};
// "{a/d} − ? = {c/d}" (or "{a/d} − {b/d} − ? = {c/d}"): the part taken away
const takeQ = (q, first, c, d, more = {}) => {
  const left = first.slice(1).reduce((x, y) => x - y, first[0]);
  const t = left - c;
  const fr = first.map((n) => `{${n}/${d}}`).join(" − ");
  return {
    type: "num",
    q,
    pre: `${fr} −`,
    fr: `?/${d}`,
    post: `= {${c}/${d}}`,
    a: t,
    vis: { kind: "lines", rows: [`${first.join(" − ")} − ? = ${c}`] },
    x: `${first.join(" − ")} − ${t} = ${c}: ${fr} − {[${t}]/${d}} = {${c}/${d}}.`,
    ...more,
  };
};

window.LESSON = {
  n: "9-5",
  key: "math4-l9-5",
  grade: 4,
  title: "Subtract Fractions",
  en: "Subtract the numerators, keep the denominator",
  unit: "Unit 9 · Lesson 9-5",
  book: "e-book Lesson 9-5 · Practice Book p. 97–98",
  imgDir: "img/lesson-9-5",
  cover: "nails",
  question: {
    q: "How are adding and subtracting fractions the [same]? How are they [different]?",
    // unverified: a model answer, the book gives none
    a: "The same: the bottom number stays the same, we work only with the tops. Different: adding puts parts together (the top grows), subtracting takes parts away (the top gets smaller).",
    img: "nails",
  },
  words: [
    { w: "Subtract", m: "take away: {9/10} − {4/10}" },
    { w: "Difference", m: "the answer of a subtraction: {5/10}" },
    { w: "Numerator", m: "the top number: how many parts" },
    { w: "Denominator", m: "the bottom number: the size of the parts" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🤔",
      lines: [
        "{8/12} − {5/12} and {11/6} − {4/6}.",
        "Each time the [bottom numbers] are the same.",
        "{8/12} − {5/12} = {3/12}, {11/6} − {4/6} = {7/6}.",
      ],
      vis: { kind: "lines", rows: ["{8/12} − {5/12}", "{11/6} − {4/6}"] },
    },
    {
      t: "Robert's nails",
      ic: "🔩",
      img: "nails",
      lines: [
        "Nails are in {9/10} of the container. Robert uses {4/10} for a bookshelf.",
        "Take away 4 parts: 5 parts are left.",
        "{9/10} − {4/10} = {5/10} of the container still has nails.",
      ],
    },
    {
      t: "On a number line",
      ic: "🦘",
      lines: [
        "Start at {9/10}, jump back 4 tenths.",
        "You land on [{5/10}]. Each interval is the same size.",
      ],
      vis: { kind: "fline", lines: [{ d: 10, from: 9, jumps: [-4] }] },
    },
    {
      t: "The rule",
      ic: "💡",
      lines: [
        "Subtract the [numerators] (the tops).",
        "Keep the [denominator] (the bottom): the parts stay the same size.",
        "{7/8} − {2/8} = {5/8}",
      ],
      vis: { kind: "fbar", rows: [{ d: 8, k: 7, cross: [5, 6] }] },
    },
    {
      t: "Who has more?",
      ic: "🍚",
      lines: [
        "Ryan has {6/8} cup of rice, Rita has {4/8} cup.",
        "{6/8} − {4/8} = {2/8}: Ryan has {2/8} cup [more].",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 8, k: 6, l: "Ryan" },
          { d: 8, k: 4, l: "Rita" },
        ],
      },
    },
  ],

  games: [
    {
      k: "sub",
      t: "Subtract the tops",
      en: "Keep the bottom",
      ic: "➖",
      items: [
        [[7, 3], 9],
        [[11, 5], 12],
        [[6, 1], 8],
        [[9, 4], 6],
        [[8, 2, 3], 10],
        [[5, 2], 4],
        [[12, 7], 8],
        [[10, 3, 3], 12],
      ].map(([n, d]) => subQ("What is the difference?", n, d)),
    },
    {
      k: "take",
      t: "What is taken away?",
      en: "Find the missing part",
      ic: "❓",
      items: [
        [[9], 4, 10],
        [[7], 2, 8],
        [[5], 3, 6],
        [[11, 3], 5, 12],
        [[8, 1], 2, 5],
        [[6], 1, 4],
      ].map(([f, c, d]) =>
        takeQ("What fraction are you taking away?", f, c, d),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 9-5",
      t: "Be Curious",
      en: "Two subtractions",
      ic: "🤔",
      from: "e-book 9-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "{8/12} − {5/12} and {11/6} − {4/6}. What do you notice? What do you wonder?",
          vis: { kind: "lines", rows: ["{8/12} − {5/12}", "{11/6} − {4/6}"] },
          // unverified: no key for this lesson
          a: "Both have like denominators. The first is in twelfths, the second in sixths and starts with more than 1 whole. I wonder if the answer stays in twelfths and sixths: {3/12} and {7/6}.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 9-5",
      t: "Learn: Robert's nails",
      en: "Fraction circle, number line",
      ic: "🔩",
      from: "e-book 9-5 · Learn",
      keep: true,
      items: [
        subQ(
          "Robert had nails in {9/10} of the container. He used nails in {4/10} of it. How much of the container still has nails?",
          [9, 4],
          10,
          { img: "nails" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 9-5",
      t: "Work Together",
      en: "Ryan and Rita's rice",
      ic: "🍚",
      from: "e-book 9-5 · Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Ryan has {6/8} cup of rice. Rita has {4/8} cup. Who has more rice?",
          opts: ["Ryan", "Rita", "The same"],
          keep: ["Ryan", "Rita", "The same"],
          vis: {
            kind: "lines",
            rows: ["🍚 Ryan {6/8} cup", "🍚 Rita {4/8} cup"],
          },
          x: "Same bottom number: 6 eighths > 4 eighths. [Ryan] has more.",
        },
        subQ("How much more rice does Ryan have?", [6, 4], 8, { post: "cup" }),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 9-5",
      t: "On My Own 1–6",
      en: "What is the difference?",
      ic: "➖",
      from: "e-book 9-5 · On My Own 1–6",
      keep: true,
      items: [
        subQ(
          "Henry's home is {7/8} mile from school. The library is {4/8} mile from school, on his way home. How much farther does he travel to get home?",
          [7, 4],
          8,
          {
            post: "mile",
            vis: {
              kind: "fline",
              lines: [{ d: 8, jumps: [4, 3], lab: false }],
            },
          },
        ),
        subQ(
          "A tank was {7/12} full of water. Camryn drained {5/12} of the tank. How much of the tank is still filled?",
          [7, 5],
          12,
          {
            vis: {
              kind: "fline",
              lines: [{ d: 12, from: 7, jumps: [-5], lab: false }],
            },
          },
        ),
        subQ("What is the difference?", [6, 2], 8),
        subQ("What is the difference?", [15, 11], 12),
        subQ("What is the difference?", [9, 4], 6),
        subQ("What is the difference?", [7, 2, 2], 8),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 9-5",
      t: "On My Own 7–10",
      en: "What are you taking away?",
      ic: "❓",
      from: "e-book 9-5 · On My Own 7–10",
      keep: true,
      items: [
        takeQ("What fraction are you taking away?", [8], 6, 10),
        takeQ("What fraction are you taking away?", [8], 5, 12),
        takeQ("What fraction are you taking away?", [4, 1], 2, 5),
        takeQ("What fraction are you taking away?", [9, 2], 4, 12),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · Lesson 9-5",
      t: "On My Own 11–14",
      en: "String, protein bars, Tamara, nuts",
      ic: "🧶",
      from: "e-book 9-5 · On My Own 11–14",
      keep: true,
      items: [
        subQ(
          "Gianna has {5/6} yard of string. She cuts off {3/6} yard for bracelets. How much string is left?",
          [5, 3],
          6,
          {
            post: "yard",
            emoji: "🧶",
          },
        ),
        {
          type: "mc",
          q: "Does Gianna have more than or less than {1/2} yard of string left?",
          opts: ["Less than {1/2}", "More than {1/2}", "Exactly {1/2}"],
          keep: ["More than {1/2}", "Less than {1/2}", "Exactly {1/2}"],
          vis: {
            kind: "fline",
            lines: [
              { d: 6, pt: 2, lab: false },
              { d: 2, pt: 1 },
            ],
          },
          x: "{1/2} = {3/6}, and {2/6} < {3/6}: less than {1/2} yard.",
        },
        {
          type: "tf",
          q: "Roger eats {2/4} of a large protein bar. Sammi eats {3/4} of a small protein bar. Jenna says Sammi ate more. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, not for sure"],
          vis: {
            kind: "lines",
            rows: [
              "🍫 Roger {2/4} of a large bar",
              "🍫 Sammi {3/4} of a small bar",
            ],
          },
          // unverified: no key; the book's point is the different wholes
          x: "The bars are not the same size: {3/4} of a small bar can be less than {2/4} of a large bar. We can't compare them like this.",
        },
        {
          type: "tf",
          q: "Error Analysis: Tamara says the difference of {12/7} and {5/7} is {7/0}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: { kind: "lines", rows: ["{12/7} − {5/7} = {7/0} ?"] },
          x: "She subtracted the bottoms too. The bottom stays the same: {12/7} − {5/7} = {7/7}.",
        },
        subQ("What is the correct difference?", [12, 5], 7),
        subQ(
          "Extend Your Thinking: Marnie has {7/8} cup of nuts. After a recipe she has {3/8} cup. How much did she use?",
          [7, 3],
          8,
          { post: "cup", emoji: "🥜" },
        ),
        {
          type: "open",
          q: "Reflect: How are adding and subtracting fractions the same? How are they different?",
          vis: {
            kind: "lines",
            rows: ["{4/6} + {1/6} = {5/6}", "{5/6} − {1/6} = {4/6}"],
          },
          // unverified: a model answer, the book gives none
          a: "The same: the denominator stays the same, we add or subtract only the numerators. Different: adding puts parts together, subtracting takes parts away.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 97–98",
      t: "Additional Practice 1–10",
      en: "Lesson 9-5",
      ic: "📘",
      from: "Practice Book p. 97–98",
      keep: true,
      items: [
        subQ("Complete the equation.", [4, 1], 3),
        takeQ("Complete the equation.", [4], 2, 5),
        subQ("Complete the equation.", [5, 3], 6),
        takeQ("Complete the equation.", [7], 4, 10),
        subQ("Complete the equation.", [6, 2, 1], 8),
        {
          type: "num",
          q: "Complete the equation.",
          pre: "{11/12} −",
          fr: "?/12",
          post: "− {1/12} = {5/12}",
          a: 5,
          vis: { kind: "lines", rows: ["11 − ? − 1 = 5"] },
          x: "11 − 5 − 1 = 5: {11/12} − {[5]/12} − {1/12} = {5/12}.",
        },
        {
          type: "multi",
          q: "Which two fractions have a difference of {3/12}? Choose two.",
          opts: [6, 8, 2, 13, 1, 9].map((n) => ({
            t: `{${n}/12}`,
            ok: n === 6 || n === 9,
            emoji: "🟦",
          })),
          vis: { kind: "lines", rows: ["? − ? = {3/12}"] },
          x: "9 − 6 = 3: {9/12} − {6/12} = {3/12}. No other two tops are 3 apart.",
        },
        subQ(
          "Chad bought {4/8} gallon of paint. {1/8} gallon was left. How much paint did he use?",
          [4, 1],
          8,
          {
            post: "gallon",
            emoji: "🎨",
          },
        ),
        subQ(
          "Sean used {2/5} of a bag of cement for his steps and the rest for the sidewalk. How much did he use for the sidewalk? (A whole bag is {5/5}.)",
          [5, 2],
          5,
          { emoji: "🧱" },
        ),
        subQ(
          "Yeral used {18/6} cup of tomato paste: {4/6} on pizza, {8/6} on spaghetti and the rest on ravioli. How much on the ravioli?",
          [18, 4, 8],
          6,
          { post: "cup", emoji: "🍅" },
        ),
      ],
    },
  ],
};
