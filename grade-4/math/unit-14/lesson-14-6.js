// Math · Grade 4 · Lesson 14-6 « Solve Problems Involving Unknown Angle Measures » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1844–k1883), Practice Book p. 165–166. No teacher's key.
// Extend 11 (draw an angle in three parts) is left out. Log: grade-4/math/SOURCES.md.
const V = [150, 130];
const pt = (d, r = 120) => [
  V[0] + r * Math.cos((d * Math.PI) / 180),
  V[1] - r * Math.sin((d * Math.PI) / 180),
];
// three rays at d0 < d1 < d2 degrees; the two parts labelled ("R" = a right-angle square)
const adj = (d0, d1, d2, l1, l2) => {
  const part = (a, b, l, r) =>
    l === "R"
      ? { t: "right", v: V, a: pt(a), b: pt(b) }
      : { t: "arc", v: V, a: pt(a), b: pt(b), r, l };
  return {
    kind: "geo",
    w: 300,
    h: 140,
    items: [
      { t: "ray", a: V, b: pt(d0) },
      { t: "ray", a: V, b: pt(d1) },
      { t: "ray", a: V, b: pt(d2) },
      part(d0, d1, l1, 32),
      part(d1, d2, l2, 50),
      { t: "pt", p: V },
    ],
  };
};
// the combined measure of two angles
const combQ = (q, a, b, more = {}) => ({
  type: "num",
  q,
  a: a + b,
  post: "°",
  vis: adj(10, 10 + a, 10 + a + b, `${a}°`, `${b}°`),
  x: `${a} + ${b} = [${a + b}]°.`,
  ...more,
});
// the unknown part: the combined measure is given
const unkQ = (q, whole, known, name = "?", more = {}) => ({
  type: "num",
  q,
  a: whole - known,
  post: "°",
  pre: `${name} =`,
  vis: adj(10, 10 + known, 10 + whole, `${known}°`, name),
  x: `${known}° + ${name} = ${whole}°, so ${whole} − ${known} = [${whole - known}]°.`,
  ...more,
});
// an angle on a straight line (180°)
const lineQ = (q, known, more = {}) => ({
  type: "num",
  q,
  a: 180 - known,
  post: "°",
  vis: {
    kind: "geo",
    w: 300,
    h: 140,
    items: [
      { t: "line", a: pt(180, 140), b: pt(0, 140) },
      { t: "ray", a: V, b: pt(180 - known) },
      { t: "arc", v: V, a: pt(180 - known), b: pt(180), r: 30, l: `${known}°` },
      { t: "arc", v: V, a: pt(0), b: pt(180 - known), r: 45, l: "?" },
      { t: "pt", p: V },
    ],
    cap: "A straight line: 180°",
  },
  x: `The two angles make a straight line: 180 − ${known} = [${180 - known}]°.`,
  ...more,
});

window.LESSON = {
  n: "14-6",
  key: "math4-l14-6",
  grade: 4,
  title: "Unknown Angle Measures",
  en: "Find a missing angle with an equation",
  unit: "Unit 14 · Lesson 14-6",
  book: "e-book Lesson 14-6 · Practice Book p. 165–166",
  imgDir: "img/lesson-14-6",
  cover: "curious",
  question: {
    q: "What strategies did you use to solve for [unknown angle] measures?",
    // unverified: a model answer, the book gives none
    a: "I wrote an equation: part + part = whole. To find a missing part, I subtracted: whole − known part. A straight line is 180°, a right angle is 90°.",
    img: "window",
  },
  words: [
    {
      w: "Combined angle measure",
      m: "the measure of the whole angle: the parts added together",
    },
    {
      w: "Unknown angle",
      m: "the angle to find, shown with a letter: b, x, m",
    },
    { w: "Half-turn", m: "a straight line: 180°" },
    { w: "Equation", m: "b + 68° = 180°" },
  ],
  ideas: [
    {
      t: "A window",
      ic: "🪟",
      img: "window",
      lines: ["What is the measure of angle [b]?"],
    },
    {
      t: "A half-turn",
      ic: "↩️",
      lines: [
        "The two angles form a [half-turn] of a circle.",
        "A half-turn measures [180°].",
      ],
      vis: {
        kind: "geo",
        w: 300,
        h: 140,
        items: [
          { t: "line", a: pt(180, 140), b: pt(0, 140) },
          { t: "ray", a: V, b: pt(112) },
          { t: "arc", v: V, a: pt(112), b: pt(180), r: 30, l: "68°" },
          { t: "arc", v: V, a: pt(0), b: pt(112), r: 45, l: "b" },
          { t: "pt", p: V },
        ],
      },
    },
    {
      t: "Write an equation",
      ic: "✏️",
      img: "window",
      lines: ["b + 68° = 180°", "Subtract: 180° − 68° = [112°]."],
    },
    {
      t: "Combined angles",
      ic: "➕",
      lines: ["Both parts are known: [add] them.", "30° + 55° = 85°."],
      vis: adj(10, 40, 95, "30°", "55°"),
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Find the whole: a straight line ([180°]), a right angle ([90°]), or the combined measure given.",
        "Unknown part = whole − known part.",
      ],
      vis: adj(10, 55, 140, "45°", "?"),
    },
  ],

  games: [
    {
      k: "comb",
      t: "Combined angle",
      en: "Part + part",
      ic: "➕",
      items: [
        [25, 40],
        [60, 35],
        [45, 70],
        [15, 50],
        [80, 65],
      ].map(([a, b]) => combQ("What is the combined angle measure?", a, b)),
    },
    {
      k: "unk",
      t: "Unknown angle",
      en: "Whole − part",
      ic: "➖",
      items: [
        [100, 35, "x"],
        [75, 30, "y"],
        [160, 90, "m"],
        [52, 18, "a"],
        [130, 55, "k"],
      ].map(([w, k, n]) =>
        unkQ(`The combined angle measure is ${w}°. What is ${n}?`, w, k, n),
      ),
    },
    {
      k: "line",
      t: "A straight line",
      en: "180° − part",
      ic: "📏",
      items: [50, 135, 72, 100, 25].map((k) =>
        lineQ(
          "The two angles make a straight line. What is the unknown angle?",
          k,
        ),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-6",
      t: "Be Curious",
      en: "Excavators",
      ic: "🚜",
      from: "e-book 14-6 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What question could you ask?",
          img: "curious",
          // unverified: the book takes any question
          a: "What angle does the arm of the excavator make? If I know one part of the angle, how can I find the other part?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-6",
      t: "Learn: the window",
      en: "b + 68° = 180°",
      ic: "🪟",
      from: "e-book 14-6 · Learn",
      keep: true,
      items: [
        {
          type: "num",
          q: "The two angles form a half-turn (180°). What is the measure of angle b?",
          a: 112,
          post: "°",
          pre: "b =",
          img: "window",
          x: "b + 68° = 180°, so 180 − 68 = [112]°.",
        },
        {
          type: "open",
          q: "Math Is… Generalizations: How is solving this problem similar to other problems you have solved?",
          img: "window",
          // unverified: a model answer, the book gives none
          a: "It is like a missing number in an addition: ? + 68 = 180. I subtract the part I know from the whole, the same as with other unknown numbers.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 14-6",
      t: "Work Together",
      en: "Sunny Street and Desert Avenue",
      ic: "🛣️",
      from: "e-book 14-6 · Work Together",
      keep: true,
      items: [
        {
          type: "num",
          q: "Sunny Street and Desert Avenue make a 83° angle. What is the measure of the other angle?",
          a: 97,
          post: "°",
          img: "streets",
          x: "Sunny Street is a straight line (180°): 180 − 83 = [97]°.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-6",
      t: "On My Own 1–6",
      en: "Combined and unknown angles",
      ic: "📐",
      from: "e-book 14-6 · On My Own 1–6",
      keep: true,
      items: [
        combQ("What is the combined angle measure?", 30, 55),
        {
          type: "num",
          q: "What is the combined angle measure?",
          a: 145,
          post: "°",
          vis: adj(35, 90, 180, "55°", "R"),
          x: "A right angle is 90°: 55 + 90 = [145]°.",
        },
        unkQ(
          "The sum of the angles is 155°. What is the unknown angle measure?",
          155,
          25,
          "u",
        ),
        unkQ(
          "The sum of the angles is 45°. What is the unknown angle measure?",
          45,
          20,
          "m",
        ),
        {
          type: "num",
          q: "The sum of the angles of the rake is 72°. What is the unknown angle measure?",
          a: 36,
          post: "°",
          pre: "p =",
          img: "rake",
          x: "36° + p = 72°, so 72 − 36 = [36]°.",
        },
        {
          type: "num",
          q: "The sum of the angles is 180°. What is the unknown angle measure?",
          a: 60,
          post: "°",
          pre: "m =",
          img: "flower",
          x: "m + 120° = 180°, so 180 − 120 = [60]°.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 14-6",
      t: "On My Own 7–10",
      en: "A tart, a pizza, a robot",
      ic: "🍕",
      from: "e-book 14-6 · On My Own 7–10",
      keep: true,
      items: [
        {
          type: "num",
          q: "The combined angle measure is 140°. What is the unknown angle measure?",
          a: 50,
          post: "°",
          pre: "k =",
          img: "tart",
          x: "The square corner is a right angle (90°): 140 − 90 = [50]°.",
        },
        {
          type: "num",
          q: "The combined angle measure is 133°. What is the unknown angle measure?",
          a: 86,
          post: "°",
          pre: "x =",
          img: "pizza",
          x: "x + 47° = 133°, so 133 − 47 = [86]°.",
        },
        unkQ(
          "STEM Connection: the drawing is the turn of Antonio's robot. The total turn measures 78°. What is the measure of angle a?",
          78,
          46,
          "a",
        ),
        unkQ(
          "An angle that measures 65° is partitioned into two smaller angles. The first angle measures 22°. What is the measure of the second angle?",
          65,
          22,
        ),
        {
          type: "open",
          q: "Reflect: What strategies did you use to solve for unknown angle measures?",
          vis: adj(10, 55, 140, "45°", "?"),
          // unverified: a model answer, the book gives none
          a: "I found the whole angle (the combined measure, 180° for a straight line, 90° for a right angle) and wrote an equation. Then I subtracted the part I knew: whole − part.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 165–166",
      t: "Additional Practice 1–7",
      en: "Lesson 14-6",
      ic: "📘",
      from: "Practice Book p. 165–166",
      keep: true,
      items: [
        combQ("Find the combined angle measure.", 18, 27),
        combQ("Find the combined angle measure.", 104, 39),
        combQ("Find the combined angle measure.", 74, 60),
        combQ("Find the combined angle measure.", 21, 92),
        unkQ(
          "The combined angle measure is 94°. Write an equation and find y.",
          94,
          63,
          "y",
        ),
        unkQ(
          "The combined angle measure is 142°. Write an equation and find x.",
          142,
          20,
          "x",
        ),
        {
          type: "num",
          q: "Elvira gets home at 4:17. The angle the hour and second hands make is 102°. Find the value of x.",
          a: 76,
          post: "°",
          pre: "x =",
          img: "clock",
          x: "x + 26° = 102°, so 102 − 26 = [76]°.",
        },
      ],
    },
  ],
};
