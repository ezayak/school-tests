// Math · Grade 4 · Lesson 14-2 « Classify Angles » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, 46:00–46:40), book p. 219–222, checked with the teacher's key
// 20261116-L_14-2.pdf (On My Own p. 221–222); Practice Book p. 157–158; the school's Extra Practice sheet 20261116-Extra_Practice_-_L14-2.pdf (no key).
// Drawing tasks (On My Own 7–9, 12, Extra Practice 3) are left out. Log: grade-4/math/SOURCES.md.
// an angle of deg degrees: one ray at `from` degrees (0 = right, counterclockwise), the other deg further; mark: show the arc / right square
const ang = (deg, from = 0, mark = true, circle = false) => {
  const v = [150, 75],
    R = 70;
  const pt = (d) => [
    v[0] + R * Math.cos((d * Math.PI) / 180),
    v[1] - R * Math.sin((d * Math.PI) / 180),
  ];
  const a = pt(from),
    b = pt(from + deg);
  const items = [];
  if (circle)
    items.push({
      t: "poly",
      pts: Array.from({ length: 36 }, (_, i) =>
        pt(i * 10).map((x, j) => v[j] + (x - v[j]) * 0.75),
      ),
    });
  items.push(
    { t: "ray", a: v, b: a },
    { t: "ray", a: v, b },
    { t: "pt", p: v },
  );
  if (mark)
    items.push(
      deg === 90 ? { t: "right", v, a, b } : { t: "arc", v, a, b, r: 20 },
    );
  return { kind: "geo", w: 300, h: 150, items };
};
const KINDS = ["Acute", "Right", "Obtuse"];
const kind = (d) => (d < 90 ? "Acute" : d === 90 ? "Right" : "Obtuse");
const why = {
  Acute: "less than a right angle (less than {1/4} of a whole circle)",
  Right: "exactly {1/4} of a whole circle, a square corner",
  Obtuse: "greater than a right angle (more than {1/4} of a circle)",
};
const classQ = (q, deg, from, more = {}) => ({
  type: "mc",
  q,
  opts: [kind(deg), ...KINDS.filter((k) => k !== kind(deg))],
  keep: KINDS,
  vis: ang(deg, from),
  x: `The turn from one ray to the other is ${why[kind(deg)]}: [${kind(deg).toLowerCase()}].`,
  ...more,
});
const ROT = [
  "Less than {1/4} of a whole circle",
  "Equal to {1/4} of a whole circle",
  "More than {1/4} of a whole circle",
];
const rotQ = (q, deg, from, more = {}) => {
  const r = deg < 90 ? ROT[0] : deg === 90 ? ROT[1] : ROT[2];
  return {
    type: "mc",
    q,
    opts: [r, ...ROT.filter((o) => o !== r)],
    keep: ROT,
    vis: ang(deg, from, true, true),
    x: `It is ${kind(deg).toLowerCase()}: ${r.toLowerCase()}.`,
    ...more,
  };
};

window.LESSON = {
  n: "14-2",
  key: "math4-l14-2",
  grade: 4,
  title: "Classify Angles",
  en: "Acute, right and obtuse angles",
  unit: "Unit 14 · Lesson 14-2",
  book: "Book p. 219–222 · Practice Book p. 157–158",
  imgDir: "img/lesson-14-2",
  cover: "curious",
  question: {
    q: "How do I [classify] an angle?",
    a: "Compare it to a right angle ({1/4} of a whole circle, a square corner): less is [acute], equal is [right], more is [obtuse].",
    img: "curious",
  },
  words: [
    { w: "Angle", m: "two rays with the same endpoint" },
    { w: "Vertex", m: "the shared endpoint of the two rays" },
    { w: "Right angle", m: "a square corner: {1/4} of a whole turn" },
    { w: "Acute angle", m: "less than a right angle" },
    { w: "Obtuse angle", m: "greater than a right angle" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🏛️",
      img: "curious",
      lines: [
        "A building with sharp, pointed corners.",
        "The walls meet at many different [angles].",
      ],
    },
    {
      t: "An angle",
      ic: "📐",
      lines: [
        "An [angle] is two rays with the same endpoint.",
        "Angles are measured by the turn from one ray to the other.",
      ],
      vis: ang(40, 0),
    },
    {
      t: "A right angle",
      ic: "⬛",
      lines: [
        "A [right angle] turns {1/4} of a whole circle.",
        "It makes a square corner.",
      ],
      vis: ang(90, 0, true, true),
    },
    {
      t: "Acute and obtuse",
      ic: "📐",
      lines: [
        "An [acute] angle is less than a right angle.",
        "An [obtuse] angle is greater than a right angle.",
      ],
      vis: ang(130, 0),
    },
  ],

  games: [
    {
      k: "class",
      t: "Acute, right or obtuse?",
      en: "Compare to a square corner",
      ic: "📐",
      items: [
        [35, 10],
        [90, 30],
        [150, 0],
        [60, 100],
        [110, 40],
        [90, 180],
        [20, 160],
        [125, 200],
      ].map(([d, f]) => classQ("What kind of angle is it?", d, f)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 219–222",
      t: "Be Curious",
      en: "A pointed building",
      ic: "🏛️",
      from: "Book p. 219 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: any answer is right
          a: "The building has walls that meet at sharp corners: some angles are smaller than a square corner, some are bigger. I wonder how big the angles are.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 219–222",
      t: "Learn: Ling sorts angles",
      en: "Right, obtuse, acute",
      ic: "📐",
      from: "Book p. 220 · Learn",
      keep: true,
      items: [
        classQ("∠ABC: what kind of angle is it?", 90, 0),
        classQ("∠PQR: what kind of angle is it?", 135, 0),
        classQ("∠LMN: what kind of angle is it?", 45, 0),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 219–222",
      t: "On My Own 1–6",
      en: "Rotation and kind",
      ic: "🔄",
      from: "Book p. 221 · On My Own 1–6",
      keep: true,
      items: [
        rotQ("How can you describe the amount of rotation?", 40, 0),
        rotQ("How can you describe the amount of rotation?", 90, 0),
        rotQ("How can you describe the amount of rotation?", 120, 0),
        classQ("How can you classify the angle?", 120, 25),
        classQ("How can you classify the angle?", 50, 0),
        classQ("How can you classify the angle?", 90, 270),
      ],
    },
    {
      k: "own10",
      g: "📗 Book · p. 219–222",
      t: "On My Own 10–11, Reflect",
      en: "A robot, a straight turn",
      ic: "🤖",
      from: "Book p. 222 · On My Own 10–11, Reflect",
      keep: true,
      items: [
        classQ(
          "STEM: Antonio draws the angle to show a turn made by a robot. What type of angle is it?",
          30,
          0,
        ),
        {
          type: "mc",
          q: "Is the angle greater than, less than, or equal to a {1/2} turn?",
          opts: [
            "Equal to a {1/2} turn",
            "Less than a {1/2} turn",
            "Greater than a {1/2} turn",
          ],
          keep: [
            "Less than a {1/2} turn",
            "Equal to a {1/2} turn",
            "Greater than a {1/2} turn",
          ],
          vis: {
            kind: "geo",
            w: 300,
            h: 60,
            items: [
              { t: "ray", a: [150, 40], b: [10, 40] },
              { t: "ray", a: [150, 40], b: [290, 40] },
              { t: "pt", p: [150, 40] },
            ],
          },
          x: "The two rays make a straight line: the turn from one to the other is {1/2} of a circle.",
        },
        {
          type: "open",
          q: "Reflect: How did you think like a mathematician when classifying angles?",
          vis: ang(90, 0, true, true),
          // unverified: the key says answers may vary
          a: "I compared each angle to a right angle (a square corner, {1/4} of a circle): smaller is acute, bigger is obtuse.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 157–158",
      t: "Additional Practice 1–9",
      en: "Lesson 14-2",
      ic: "📘",
      from: "Practice Book p. 157–158",
      keep: true,
      items: [
        rotQ("Which description matches the figure?", 35, 0),
        rotQ("Which description matches the figure?", 180, 0),
        rotQ("Which description matches the figure?", 90, 0),
        classQ("Identify the angle.", 25, 0),
        classQ("Identify the angle.", 90, 270),
        classQ("Identify the angle.", 140, 0),
        classQ("Identify the angle.", 20, 150),
        {
          type: "mc",
          q: "An acute angle measures ___ than a right angle.",
          opts: ["less", "more"],
          keep: ["less", "more"],
          vis: ang(40, 0),
          x: "Acute: [less] than a right angle.",
        },
        {
          type: "mc",
          q: "A {1/4} rotation forms a ___ angle.",
          opts: ["right", "acute", "obtuse"],
          keep: ["acute", "right", "obtuse"],
          vis: ang(90, 0, true, true),
          x: "{1/4} of a circle: a [right] angle.",
        },
        {
          type: "mc",
          q: "A ___ angle measures greater than a right angle.",
          opts: ["obtuse", "acute", "right"],
          keep: ["acute", "right", "obtuse"],
          vis: ang(130, 0),
          x: "Greater than a right angle: [obtuse].",
        },
        classQ(
          "Caroline draws an angle of {1/3} of a full turn. How can she classify it?",
          120,
          0,
          { x: "{1/3} is more than {1/4} of a circle: the angle is [obtuse]." },
        ),
      ],
    },
    {
      k: "school",
      g: "🏫 School",
      t: "Extra Practice 14-2",
      en: "Class sheet",
      ic: "🏫",
      from: "Extra Practice L14-2",
      keep: true,
      // unverified: the sheet has no key; the angles are judged from the drawing
      items: [
        classQ("How can you classify the angle?", 120, 50),
        classQ("How can you classify the angle?", 45, 135),
        classQ("How can you classify the angle?", 90, 0),
        classQ("How can you classify the angle?", 125, 25),
        classQ("How can you classify the angle?", 90, 270),
        classQ("How can you classify the angle?", 50, 330),
        {
          type: "mc",
          q: "Which figure shows the amount of rotation greater than {1/4}?",
          opts: ["A", "B", "C"],
          keep: ["A", "B", "C"],
          vis: {
            kind: "geo",
            w: 300,
            h: 100,
            items: [
              { t: "text", p: [50, 10], s: "A" },
              { t: "ray", a: [50, 60], b: [90, 50] },
              { t: "ray", a: [50, 60], b: [20, 25] },
              { t: "text", p: [150, 10], s: "B" },
              { t: "ray", a: [150, 60], b: [195, 60] },
              { t: "ray", a: [150, 60], b: [190, 35] },
              { t: "text", p: [250, 10], s: "C" },
              { t: "ray", a: [250, 60], b: [295, 60] },
              { t: "ray", a: [250, 60], b: [250, 100] },
            ],
          },
          x: "A is wider than a square corner: more than {1/4}. B is less, C is exactly {1/4}.",
        },
      ],
    },
  ],
};
