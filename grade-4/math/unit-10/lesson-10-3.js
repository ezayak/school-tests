// Math · Grade 4 · Lesson 10-3 « Add Mixed Numbers » (Reveal Math, Unit 10 « Addition and Subtraction Strategies with Mixed Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 11:50–12:30; no page numbers;
// On My Own 1–6 and 12 read from the frames between), Student Practice Book p. 105–106. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// A sum of mixed numbers is asked in two steps: the whole number, then the fraction part (after regrouping). Helper as in lesson 10-2.
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
  n: "10-3",
  key: "math4-l10-3",
  grade: 4,
  title: "Add Mixed Numbers",
  en: "Add wholes and parts, or change to fractions first",
  unit: "Unit 10 · Lesson 10-3",
  book: "e-book Lesson 10-3 · Practice Book p. 105–106",
  imgDir: "img/lesson-10-3",
  cover: "curious",
  question: {
    q: "How do I choose a [strategy] to add mixed numbers?",
    // unverified: a model answer, the book gives none
    a: "Small wholes: add the wholes, add the parts, regroup. Or write both as fractions and add the tops: {1 4/5} + {1 3/5} = {9/5} + {8/5} = {17/5} = {3 2/5}.",
    img: "curious",
  },
  words: [
    { w: "Mixed number", m: "a whole number and a fraction: {1 4/5}" },
    { w: "Regroup", m: "{7/5} = 1 and {2/5}: make another whole" },
    { w: "Equivalent fraction", m: "{1 4/5} = {9/5}" },
    { w: "Like units", m: "add wholes to wholes and fifths to fifths" },
  ],
  ideas: [
    {
      t: "Harold and Rita",
      ic: "🔴",
      img: "curious",
      lines: [
        "Both add {1 2/3} + {1 1/3}.",
        "Harold keeps the [wholes]; Rita cuts every whole into [thirds].",
        "Both get 3: {2/3} + {1/3} = 1 more whole.",
      ],
    },
    {
      t: "One way: like units",
      ic: "🐱",
      lines: [
        "A kitten weighed {1 4/5} pounds and gained {1 3/5} pounds.",
        "1 + 1 = 2. {4/5} + {3/5} = {7/5} = 1 and {2/5}: regroup!",
        "2 + {1 2/5} = {3 2/5} pounds.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "1 + 1 = 2",
          "{4/5} + {3/5} = {7/5} = {1 2/5}",
          "2 + {1 2/5} = {3 2/5}",
        ],
      },
    },
    {
      t: "Another way: fractions",
      ic: "🔁",
      lines: [
        "{1 4/5} = {9/5} and {1 3/5} = {8/5}.",
        "{9/5} + {8/5} = {17/5} = {3 2/5}.",
        "The same answer!",
      ],
      vis: {
        kind: "fline",
        hi: 4,
        lines: [{ d: 5, jumps: [9, 8], lab: false }],
      },
    },
    {
      t: "Check the bottom",
      ic: "⚠️",
      lines: [
        "Diane wrote {9/5} + {13/5} = {22/10}. Wrong: the bottom [stays 5].",
        "{9/5} + {13/5} = {22/5} = {4 2/5}.",
      ],
      vis: { kind: "lines", rows: ["{9/5} + {13/5} = {22/5}"] },
    },
  ],

  games: [
    {
      k: "add",
      t: "Add and regroup",
      en: "Wholes, then parts",
      ic: "➕",
      keep: true,
      items: [
        [[2, 3], [1, 4], 5],
        [[3, 5], [2, 4], 8],
        [[1, 2], [4, 2], 3],
        [[2, 7], [2, 5], 10],
      ].flatMap(([a, b, d]) => mixAdd("Add the mixed numbers.", a, b, d)),
    },
    {
      k: "tofrac",
      t: "Another way: fractions",
      en: "Mixed number → fraction",
      ic: "🔁",
      items: [
        [1, 4, 5],
        [2, 1, 3],
        [1, 3, 8],
        [3, 1, 4],
        [2, 5, 6],
      ].map(([w, n, d]) => ({
        type: "num",
        q: "Write the mixed number as a fraction.",
        pre: `${M(w, n, d)} =`,
        fr: `?/${d}`,
        a: w * d + n,
        vis: { kind: "lines", rows: [`${w} × ${d} + ${n} = ?`] },
        x: `${w} × ${d} + ${n} = ${w * d + n}: ${M(w, n, d)} = {[${w * d + n}]/${d}}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 10-3",
      t: "Be Curious",
      en: "Harold's and Rita's work",
      ic: "🔴",
      from: "e-book 10-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Harold and Rita work on the same problem. How are they the same? How are they different?",
          img: "curious",
          // unverified: no key; any answer with a reason is right
          a: "Both show {1 2/3} + {1 1/3} = 3. Harold keeps the wholes as whole circles; Rita cuts every whole into thirds ({5/3} + {4/3} = {9/3}).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 10-3",
      t: "Learn: the kitten",
      en: "Two ways",
      ic: "🐱",
      from: "e-book 10-3 · Learn",
      keep: true,
      items: [
        ...mixAdd(
          "A kitten weighed {1 4/5} pounds and gained {1 3/5} pounds.",
          [1, 4],
          [1, 3],
          5,
        ),
        {
          type: "num",
          q: "Another way: {1 4/5} + {1 3/5} = {9/5} + {8/5}. What fraction is the sum?",
          pre: "{9/5} + {8/5} =",
          fr: "?/5",
          a: 17,
          vis: { kind: "lines", rows: ["9 + 8 = ?"] },
          x: "9 + 8 = 17: {9/5} + {8/5} = {[17]/5} = {3 2/5}.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 10-3",
      t: "Work Together",
      en: "Kim's fruit",
      ic: "🍓",
      from: "e-book 10-3 · Work Together",
      keep: true,
      items: mixAdd(
        "Kim picked {1 6/8} lb of blueberries and {2 7/8} lb of strawberries.",
        [1, 6],
        [2, 7],
        8,
      ),
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 10-3",
      t: "On My Own 1–6",
      en: "What is the sum?",
      ic: "➕",
      from: "e-book 10-3 · On My Own 1–6",
      keep: true,
      items: [
        ...mixAdd("What is the sum?", [3, 5], [4, 3], 12),
        ...mixAdd("What is the sum?", [2, 7], [2, 5], 10),
        ...mixAdd("What is the sum?", [1, 3], [1, 4], 6),
        ...mixAdd("What is the sum?", [4, 3], [3, 2], 5),
        ...mixAdd("What is the sum?", [5, 3], [4, 4], 8),
        ...mixAdd("What is the sum?", [2, 2], [3, 2], 3),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 10-3",
      t: "On My Own 7–12",
      en: "Soup, Diane, Jane, Andy, flowers",
      ic: "🍲",
      from: "e-book 10-3 · On My Own 7–12",
      keep: true,
      items: [
        ...mixAdd(
          "Emily ate {2 1/4} cups of soup. Her father ate {1 1/4} cups more than Emily. How much did her father eat?",
          [2, 1],
          [1, 1],
          4,
        ),
        {
          type: "tf",
          q: "Error Analysis: Diane wrote {1 4/5} + {2 3/5} = {9/5} + {13/5} = {22/10}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: { kind: "lines", rows: ["{9/5} + {13/5} = {22/10} ?"] },
          x: "She added the bottoms too. The bottom stays 5: {9/5} + {13/5} = {22/5} = {4 2/5}.",
        },
        ...mixAdd("Find the correct sum.", [1, 4], [2, 3], 5),
        ...mixAdd(
          "Jane jogs {2 1/3} miles to the park and {1 2/3} miles more to meet a friend. How far did she jog?",
          [2, 1],
          [1, 2],
          3,
        ),
        {
          type: "mc",
          q: "Andy wrote 2 + 1 = 3, {5/12} + {2/12} = {7/12}, 3 + {7/12} = {3 7/12} for {2 5/12} + {1 2/12}. What strategy did he use?",
          opts: [
            "He added the wholes, then the parts, then put them together",
            "He changed both to fractions first",
            "He added only the fraction parts",
          ],
          vis: {
            kind: "lines",
            rows: [
              "2 + 1 = 3",
              "{5/12} + {2/12} = {7/12}",
              "3 + {7/12} = {3 7/12}",
            ],
          },
          x: "He decomposed: wholes with wholes (3), twelfths with twelfths ({7/12}), then {3 7/12}.",
        },
        ...mixAdd(
          "Lauren plants {2 3/8} rows of tulips and {3 7/8} rows of daffodils. How many rows in all?",
          [2, 3],
          [3, 7],
          8,
        ),
        {
          type: "mc",
          q: "Extend Your Thinking: 1 and ?/5 + 2 and ?/5 = ? and {1/5}. What numbers could be missing?",
          opts: [
            "{1 2/5} + {2 4/5} = {4 1/5}",
            "{1 2/5} + {2 4/5} = {3 1/5}",
            "{1 1/5} + {2 1/5} = {3 1/5}",
            "{1 3/5} + {2 4/5} = {4 1/5}",
          ],
          vis: { kind: "lines", rows: ["{1 ?/5} + {2 ?/5} = {? 1/5}"] },
          // unverified: the book takes any right numbers (2 and 4, 3 and 3, 4 and 2 → 4 1/5); one right equation is in the choices
          x: "{2/5} + {4/5} = {6/5} = {1 1/5}, and 1 + 2 + 1 = 4: {4 1/5}. (3 and 3, 4 and 2 work too.)",
        },
        {
          type: "open",
          q: "Reflect: How did you decide what strategy to use when adding mixed numbers?",
          vis: { kind: "lines", rows: ["wholes + parts", "or fractions"] },
          // unverified: a model answer, the book gives none
          a: "With small fraction parts I add wholes and parts and regroup. When the wholes are small, writing both as fractions is quick too.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 105–106",
      t: "Additional Practice 1–8",
      en: "Lesson 10-3",
      ic: "📘",
      from: "Practice Book p. 105–106",
      keep: true,
      items: [
        ...mixAdd("Find the sum.", [2, 2], [2, 4], 5),
        ...mixAdd("Find the sum.", [4, 5], [1, 3], 6),
        ...mixAdd("Find the sum.", [2, 7], [3, 5], 10),
        ...mixAdd("Find the sum.", [2, 7], [1, 2], 12),
        ...mixAdd(
          "Isabelle practices guitar {2 3/4} hours one week and {1 2/4} hours the next.",
          [2, 3],
          [1, 2],
          4,
        ),
        ...mixAdd(
          "Olivia buys {2 3/8} pounds of peanuts. James buys {1 6/8} pounds more than Olivia. How much does James buy?",
          [2, 3],
          [1, 6],
          8,
        ),
        ...mixAdd(
          "Leeland paints {2 5/12} rooms on Monday and {3 3/12} rooms on Tuesday.",
          [2, 5],
          [3, 3],
          12,
        ),
        {
          type: "tf",
          q: "Jashay wrote {3 4/5} + {4 3/5} = {3/5} + {4/5} + {4/5} + {3/5} = {14/5} = {2 4/5}. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["{3 4/5} + {4 3/5} = {2 4/5} ?"] },
          x: "He wrote the wholes 3 and 4 as {3/5} and {4/5}. 3 wholes = {15/5}, 4 wholes = {20/5}: the sum is {8 2/5}.",
        },
        ...mixAdd("Find the correct solution.", [3, 4], [4, 3], 5),
      ],
    },
  ],
};
