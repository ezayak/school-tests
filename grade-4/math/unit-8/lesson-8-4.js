// Math · Grade 4 · Lesson 8-4 « Compare Fractions Using Benchmarks » (Reveal Math, Unit 8 « Fraction Equivalence »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-18-07.mp4, 2:47–3:43; no page numbers),
// Student Practice Book p. 85–86. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Benchmarks: 0, 1/2, 1. The comparison questions show only the two fractions; 💡 Help shows them on a number line.
const val = ([a, b]) => a / b;
const fr = ([a, b]) => `{${a}/${b}}`;
const sign = (x, y) => (val(x) < val(y) ? "<" : val(x) > val(y) ? ">" : "=");
const near = (f) => {
  const v = val(f);
  return v === 0.5
    ? "equal to {1/2}"
    : v < 0.5
      ? "less than {1/2}"
      : v < 1
        ? "between {1/2} and 1"
        : v === 1
          ? "equal to 1"
          : "greater than 1";
};
// both fractions on one number line (0 to 1, or 0 to 2), for 💡 Help
const lineOf = (x, y) => {
  const hi = Math.max(val(x), val(y)) > 1 ? 2 : 1;
  return {
    kind: "fline",
    hi,
    lines: [
      { d: x[1], pt: x[0], lab: false },
      { d: y[1], pt: y[0], lab: false },
      { d: 2 },
    ],
  };
};
// "Compare the fractions using benchmark numbers. Choose >, < or ="
const cmpQ = (x, y, more = {}) => ({
  type: "mc",
  q: `Compare the fractions using benchmark numbers: ${fr(x)} ___ ${fr(y)}`,
  opts: [sign(x, y), ...["<", "=", ">"].filter((s) => s !== sign(x, y))],
  keep: ["<", "=", ">"],
  vis: { kind: "lines", rows: [`${fr(x)}   ?   ${fr(y)}`] },
  help: {
    t: "Use the benchmarks 0, {1/2} and 1",
    lines: [`${fr(x)} is ${near(x)}.`, `${fr(y)} is ${near(y)}.`],
    vis: lineOf(x, y),
  },
  x: `${fr(x)} is ${near(x)}, ${fr(y)} is ${near(y)}: ${fr(x)} ${sign(x, y)} ${fr(y)}.`,
  ...more,
});
// "{3/4} is less than / greater than {1/2}"
const benchQ = (f, b) => {
  const bv = b === 1 ? 1 : 0.5;
  const bt = b === 1 ? "1" : "{1/2}";
  const r =
    val(f) < bv ? "less than" : val(f) > bv ? "greater than" : "equal to";
  return {
    type: "mc",
    q: `${fr(f)} is ___ ${bt}.`,
    opts: [
      r,
      ...["less than", "equal to", "greater than"].filter((s) => s !== r),
    ],
    keep: ["less than", "equal to", "greater than"],
    vis:
      f[0] > f[1]
        ? { kind: "lines", rows: [`${fr(f)}  and  ${bt}`] }
        : { kind: "fbar", rows: [{ d: f[1], k: f[0] }] },
    x: `${fr(f)} is [${r}] ${bt}.`,
  };
};

window.LESSON = {
  n: "8-4",
  key: "math4-l8-4",
  grade: 4,
  title: "Compare with 0, 1/2 and 1",
  en: "Compare fractions with the benchmarks 0, one half and 1",
  unit: "Unit 8 · Lesson 8-4",
  book: "e-book Lesson 8-4 · Practice Book p. 85–86",
  imgDir: "img/lesson-8-4",
  cover: "curious",
  question: {
    q: "How can I compare fractions with [benchmark numbers]?",
    // unverified: a model answer, the book gives none
    a: "Look where each fraction is: near 0, near {1/2} or near 1. {2/6} is less than {1/2}, {6/10} is greater than {1/2}: {2/6} < {6/10}.",
    img: "curious",
  },
  words: [
    {
      w: "Benchmark fraction",
      m: "a fraction we know well, used to compare: {1/2}",
    },
    { w: "Benchmark numbers", m: "0, {1/2} and 1" },
    { w: "Greater than", m: "> : {7/8} > {4/6}" },
    { w: "Less than", m: "< : {5/12} < {4/6}" },
    { w: "Half", m: "{1/2}: the top is half of the bottom ({3/6}, {5/10})" },
  ],
  ideas: [
    {
      t: "What do you see?",
      ic: "🍉",
      img: "curious",
      lines: [
        "A small piece, a bigger piece, and almost a whole watermelon.",
        "Some pieces are close to 0, some are close to {1/2}, some are close to 1.",
      ],
    },
    {
      t: "Jade's ribbons",
      ic: "🎀",
      lines: [
        "Red {4/6} yard, green {7/8} yard, blue {5/12} yard.",
        "How can Jade compare them?",
        "Compare each one to a [benchmark]: 0, {1/2} or 1.",
      ],
      vis: {
        kind: "lines",
        rows: ["Red: {4/6} yard", "Green: {7/8} yard", "Blue: {5/12} yard"],
      },
    },
    {
      t: "Green and red",
      ic: "💚",
      lines: [
        "{7/8} is close to [1]. {4/6} is close to [{1/2}].",
        "{7/8} > {4/6}: more green ribbon than red.",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 8, pt: 7, lab: false },
          { d: 6, pt: 4, lab: false },
          { d: 2 },
        ],
      },
    },
    {
      t: "Red and blue",
      ic: "💙",
      lines: [
        "{4/6} is greater than {1/2}. {5/12} is less than {1/2}.",
        "{4/6} > {5/12}: more red ribbon than blue.",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 6, pt: 4, lab: false },
          { d: 12, pt: 5, lab: false },
          { d: 2 },
        ],
      },
    },
    {
      t: "Is it more than a half?",
      ic: "🌗",
      lines: [
        "{1/2} = {3/6} = {5/10}: the top is [half] of the bottom.",
        "{2/6}: 2 is less than half of 6, so {2/6} < {1/2}.",
        "{6/10}: 6 is more than half of 10, so {6/10} > {1/2}. So {2/6} < {6/10}.",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 6, k: 3, l: "{3/6}" },
          { d: 2, k: 1, l: "{1/2}" },
          { d: 10, k: 5, l: "{5/10}" },
        ],
      },
    },
    {
      t: "How to compare",
      ic: "💡",
      lines: [
        "1. Is each fraction near 0, near {1/2} or near 1?",
        "2. One is less than {1/2}, one is greater: the greater one is [bigger].",
        "3. Both near 1: the one with the [smaller missing part] is bigger ({7/8} > {5/6}).",
      ],
      vis: {
        kind: "fline",
        lines: [{ d: 2 }],
      },
    },
  ],

  games: [
    {
      k: "half",
      t: "More or less than a half?",
      en: "Compare to one half",
      ic: "🌗",
      items: [
        [3, 8],
        [5, 6],
        [4, 10],
        [7, 12],
        [2, 3],
        [1, 4],
        [6, 12],
        [4, 5],
      ].map((f) => benchQ(f, 2)),
    },
    {
      k: "cmp",
      t: "Compare with benchmarks",
      en: "<, = or >",
      ic: "⚖️",
      items: [
        [
          [2, 5],
          [5, 6],
        ],
        [
          [7, 8],
          [3, 10],
        ],
        [
          [1, 6],
          [4, 6],
        ],
        [
          [5, 10],
          [3, 6],
        ],
        [
          [9, 10],
          [2, 4],
        ],
        [
          [5, 4],
          [9, 10],
        ],
      ].map(([x, y]) => cmpQ(x, y)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 8-4",
      t: "Be Curious",
      en: "Pieces of watermelon",
      ic: "🍉",
      from: "e-book 8-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you see?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Three pieces of watermelon: a small piece (close to 0), a bigger piece (a bit less than {1/2}), and almost a whole watermelon (close to 1).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 8-4",
      t: "Learn: Jade's ribbons",
      en: "Compare to a benchmark",
      ic: "🎀",
      from: "e-book 8-4 · Learn",
      keep: true,
      items: [
        cmpQ([7, 8], [4, 6], {
          q: "Jade used {7/8} yard of green ribbon and {4/6} yard of red ribbon. Compare: {7/8} ___ {4/6}",
        }),
        cmpQ([4, 6], [5, 12], {
          q: "Jade used {4/6} yard of red ribbon and {5/12} yard of blue ribbon. Compare: {4/6} ___ {5/12}",
        }),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 8-4",
      t: "Work Together",
      en: "2 tenths and 4 fifths",
      ic: "🤝",
      from: "e-book 8-4 · Work Together",
      keep: true,
      items: [
        cmpQ([2, 10], [4, 5], {
          q: "Use benchmark numbers to compare {2/10} and {4/5}.",
          vis: {
            kind: "fbar",
            rows: [
              { d: 10, k: 2, l: "{2/10}" },
              { d: 5, k: 4, l: "{4/5}" },
            ],
          },
        }),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 8-4",
      t: "On My Own 1–6",
      en: "Compare, choose all",
      ic: "⚖️",
      from: "e-book 8-4 · On My Own 1–6",
      keep: true,
      items: [
        cmpQ([4, 6], [9, 10]),
        cmpQ([6, 12], [4, 8]),
        cmpQ([3, 4], [4, 10]),
        cmpQ([4, 3], [7, 8]),
        {
          type: "multi",
          q: "Which fractions are greater than {7/12}? Choose all that apply.",
          opts: [
            [2, 10],
            [6, 5],
            [3, 6],
            [8, 10],
          ].map((f) => ({ t: fr(f), ok: val(f) > 7 / 12, emoji: "🔢" })),
          vis: { kind: "lines", rows: ["greater than {7/12}?"] },
          x: "{7/12} is a little more than {1/2}. {6/5} is greater than 1, {8/10} is close to 1. {2/10} and {3/6} are not more than {1/2}.",
        },
        {
          type: "multi",
          q: "Which fractions are less than {5/8}? Choose all that apply.",
          opts: [
            [2, 6],
            [3, 2],
            [9, 10],
            [4, 12],
          ].map((f) => ({ t: fr(f), ok: val(f) < 5 / 8, emoji: "🔢" })),
          vis: { kind: "lines", rows: ["less than {5/8}?"] },
          x: "{5/8} is a little more than {1/2}. {2/6} and {4/12} are less than {1/2}. {3/2} is more than 1, {9/10} is close to 1.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 8-4",
      t: "On My Own 7–8",
      en: "Oscar and Ron",
      ic: "🏃",
      from: "e-book 8-4 · On My Own 7–8",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Oscar ran {7/8} mile on Tuesday and {6/10} mile on Thursday. On which day did Oscar run a greater distance?",
          opts: ["Tuesday", "Thursday", "The same"],
          keep: ["Tuesday", "Thursday", "The same"],
          vis: {
            kind: "lines",
            rows: ["Tuesday: {7/8} mile", "Thursday: {6/10} mile"],
          },
          help: {
            t: "Use the benchmarks",
            lines: ["{7/8} is close to 1.", "{6/10} is close to {1/2}."],
            vis: lineOf([7, 8], [6, 10]),
          },
          x: "{7/8} is close to 1, {6/10} is close to {1/2}: {7/8} > {6/10}. He ran farther on [Tuesday].",
        },
        {
          type: "mc",
          q: "Ron knows which of two fractions is greater by comparing them to {1/2}. What two fractions could Ron be comparing?",
          opts: [
            "{2/5} and {3/4}",
            "{1/3} and {2/5}",
            "{5/6} and {3/4}",
            "{1/2} and {3/6}",
          ],
          vis: { kind: "fline", lines: [{ d: 2 }] },
          // unverified: the book takes any pair with one fraction less than 1/2 and one greater
          x: "{2/5} is less than {1/2} and {3/4} is greater than {1/2}: {2/5} < {3/4}. The other pairs are on the same side of {1/2} (or equal).",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 8-4",
      t: "On My Own 9–13",
      en: "Sandwiches, a welder, a puzzle",
      ic: "🥪",
      from: "e-book 8-4 · On My Own 9–13",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Aldwin and Rashika each cut their sub sandwich into fifths. Each ate about half, but a different number of pieces. How many pieces did each eat?",
          opts: [
            "2 pieces and 3 pieces",
            "1 piece and 4 pieces",
            "2 pieces and 2 pieces",
            "4 pieces and 5 pieces",
          ],
          vis: { kind: "fbar", rows: [{ d: 5 }, { d: 5 }] },
          x: "{1/2} of 5 pieces is 2 and a half: {2/5} is a little less than {1/2}, {3/5} is a little more.",
        },
        {
          type: "mc",
          q: "STEM Connection: {3/5} of a welder's materials are aluminum and {2/6} are stainless steel. Does the welder need more steel or more aluminum?",
          opts: ["More aluminum", "More steel", "The same"],
          keep: ["More aluminum", "More steel", "The same"],
          vis: {
            kind: "lines",
            rows: ["aluminum: {3/5}", "steel: {2/6}"],
          },
          help: {
            t: "Use the benchmark {1/2}",
            lines: [
              "{3/5} is greater than {1/2}.",
              "{2/6} is less than {1/2}.",
            ],
            vis: lineOf([3, 5], [2, 6]),
          },
          x: "{3/5} is greater than {1/2}, {2/6} is less than {1/2}: [more aluminum].",
        },
        {
          type: "mc",
          q: "Jacob finished {1/2} of today's reading. Anushka finished more than Jacob. What fraction could Anushka have finished?",
          opts: ["{3/4}", "{2/5}", "{1/3}", "{4/8}"],
          vis: { kind: "fline", lines: [{ d: 2, pt: 1 }] },
          // unverified: the book takes any fraction greater than 1/2 (and not more than 1)
          x: "{3/4} is greater than {1/2}. {2/5} and {1/3} are less, {4/8} is equal.",
        },
        {
          type: "mc",
          q: "Malai finished {10/12} of a puzzle. Nina finished {5/8} of the same puzzle. Did Malai finish more or less than Nina?",
          opts: ["More", "Less", "The same"],
          keep: ["More", "Less", "The same"],
          vis: {
            kind: "lines",
            rows: ["Malai: {10/12}", "Nina: {5/8}"],
          },
          help: {
            t: "Use the benchmarks",
            lines: ["{10/12} is close to 1.", "{5/8} is close to {1/2}."],
            vis: lineOf([10, 12], [5, 8]),
          },
          x: "{10/12} is close to 1, {5/8} is close to {1/2}: Malai finished [more].",
        },
        {
          type: "mc",
          q: "Extend Your Thinking: Stella compares {5/6} and {7/8} by how close they are to 1. Which is greater?",
          opts: ["{7/8}", "{5/6}", "They are equal"],
          vis: {
            kind: "fbar",
            rows: [
              { d: 6, k: 5, l: "{5/6}" },
              { d: 8, k: 7, l: "{7/8}" },
            ],
          },
          x: "{5/6} is {1/6} away from 1, {7/8} is {1/8} away from 1. {1/8} is the smaller piece: {7/8} is closer to 1, so {7/8} > {5/6}.",
        },
        {
          type: "open",
          q: "Reflect: How did you think like a mathematician when comparing fractions?",
          vis: { kind: "fline", lines: [{ d: 2 }] },
          // unverified: a model answer, the book gives none
          a: "I put each fraction near 0, {1/2} or 1 on a number line. If one is less than {1/2} and the other is greater, I know which is bigger without drawing.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 85–86",
      t: "Additional Practice 1–7",
      en: "Lesson 8-4",
      ic: "📘",
      from: "Practice Book p. 85–86",
      keep: true,
      items: [
        benchQ([3, 4], 2),
        benchQ([3, 10], 2),
        cmpQ([3, 4], [3, 10]),
        benchQ([2, 5], 2),
        benchQ([7, 12], 2),
        cmpQ([2, 5], [7, 12]),
        benchQ([9, 10], 1),
        benchQ([6, 5], 1),
        cmpQ([9, 10], [6, 5]),
        benchQ([15, 12], 1),
        benchQ([6, 8], 1),
        cmpQ([15, 12], [6, 8]),
        {
          type: "tf",
          q: "Bridgette plays basketball {4/12} of an hour and the violin {5/8} of an hour. Does she spend more time playing the violin?",
          a: true,
          yes: ["Yes", "No"],
          vis: {
            kind: "lines",
            rows: ["🏀 {4/12} hour", "🎻 {5/8} hour"],
          },
          x: "{4/12} is less than {1/2}, {5/8} is greater than {1/2}: more time on the violin.",
        },
        {
          type: "mc",
          q: "Philip runs {11/10} lap and Howard runs {5/6} lap around a track. Who runs farther?",
          opts: ["Philip", "Howard", "The same"],
          keep: ["Philip", "Howard", "The same"],
          vis: {
            kind: "lines",
            rows: ["Philip: {11/10} lap", "Howard: {5/6} lap"],
          },
          x: "{11/10} is greater than 1, {5/6} is less than 1: [Philip] runs farther.",
        },
        {
          type: "mc",
          q: "Choose one fraction greater than 1 and one fraction less than 1.",
          opts: [
            "{5/4} and {3/4}",
            "{3/4} and {2/3}",
            "{5/4} and {7/6}",
            "{4/4} and {3/4}",
          ],
          vis: { kind: "fline", hi: 2, lines: [{ d: 2 }] },
          // unverified: the book takes any such pair
          x: "{5/4} is greater than 1 (more than 4 fourths), {3/4} is less than 1: {5/4} > {3/4}.",
        },
      ],
    },
  ],
};
