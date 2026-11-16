// Math · Grade 4 · Lesson 14-4 « Understand Parallel and Perpendicular Lines » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1768–k1807), Practice Book p. 161–162. No teacher's key.
// Practice Book 1–4: the lines at the angles of the PDF (1: 159° and 69°, 3: 133° and 170°).
// Drawing tasks (Work Together, On My Own 4–6 and 12, Practice Book 5–7) are left out. Log: grade-4/math/SOURCES.md.
const P = ["Perpendicular", "Parallel", "Neither"];
// two lines: each [x1, y1, x2, y2], optional point labels [A, B] on each
const two = (l1, l2, labs) => {
  const items = [l1, l2].map((l) => ({
    t: "line",
    a: [l[0], l[1]],
    b: [l[2], l[3]],
  }));
  if (labs)
    [l1, l2].forEach((l, i) => {
      const f = (k) => [l[0] + (l[2] - l[0]) * k, l[1] + (l[3] - l[1]) * k];
      items.push(
        { t: "pt", p: f(0.15), l: labs[i][0] },
        { t: "pt", p: f(0.85), l: labs[i][1] },
      );
    });
  return { kind: "geo", w: 300, h: 150, items };
};
const why = {
  Perpendicular: "They intersect and make a [right angle]: perpendicular.",
  Parallel:
    "They are always the [same distance] apart and never meet: parallel.",
  Neither: "They intersect, but not at a right angle: [neither].",
};
const pairQ = (q, ans, vis, more = {}) => ({
  type: "mc",
  q,
  opts: [ans, ...P.filter((o) => o !== ans)],
  keep: P,
  vis,
  x: why[ans],
  ...more,
});
// capital letters drawn with segments: H, L, Z, O
const O = Array.from({ length: 24 }, (_, i) => [
  250 + 22 * Math.cos((i * Math.PI) / 12),
  75 + 32 * Math.sin((i * Math.PI) / 12),
]);
const LETTERS = {
  kind: "geo",
  w: 300,
  h: 150,
  items: [
    { t: "seg", a: [25, 40], b: [25, 110] },
    { t: "seg", a: [65, 40], b: [65, 110] },
    { t: "seg", a: [25, 75], b: [65, 75] },
    { t: "seg", a: [100, 40], b: [100, 110] },
    { t: "seg", a: [100, 110], b: [140, 110] },
    { t: "seg", a: [170, 40], b: [210, 40] },
    { t: "seg", a: [210, 40], b: [170, 110] },
    { t: "seg", a: [170, 110], b: [210, 110] },
    { t: "poly", pts: O },
  ],
};
const LET = ["H", "L", "Z", "O"];
const letQ = (q, ans, x) => ({
  type: "mc",
  q,
  opts: [ans, ...LET.filter((o) => o !== ans)],
  keep: LET,
  vis: LETTERS,
  // unverified: the book takes any letter that fits; here one of four
  x,
});
// a bookshelf / a window: a rectangle with segments inside
const frame = (inner) => ({
  kind: "geo",
  w: 300,
  h: 150,
  items: [
    {
      t: "poly",
      pts: [
        [100, 10],
        [200, 10],
        [200, 140],
        [100, 140],
      ],
    },
    ...inner.map(([a, b]) => ({ t: "seg", a, b })),
  ],
});
const SHELF = frame([
  [
    [100, 53],
    [200, 53],
  ],
  [
    [100, 96],
    [200, 96],
  ],
]);
const WINDOW = frame([
  [
    [150, 10],
    [150, 140],
  ],
  [
    [100, 75],
    [200, 75],
  ],
]);

window.LESSON = {
  n: "14-4",
  key: "math4-l14-4",
  grade: 4,
  title: "Parallel and Perpendicular Lines",
  en: "Lines that never meet, lines that meet at a right angle",
  unit: "Unit 14 · Lesson 14-4",
  book: "e-book Lesson 14-4 · Practice Book p. 161–162",
  imgDir: "img/lesson-14-4",
  cover: "curious",
  question: {
    q: "How can you identify [parallel] and [perpendicular] lines in the world around you?",
    // unverified: a model answer, the book gives none
    a: "Parallel lines never meet and stay the same distance apart, like the rails of a track. Perpendicular lines meet at a right angle, like the corner of a window.",
    img: "curious",
  },
  words: [
    {
      w: "Parallel lines",
      m: "lines that are always the same distance apart and never intersect",
    },
    {
      w: "Perpendicular lines",
      m: "lines that intersect to form a right angle",
    },
    { w: "Intersect", m: "meet or cross at a point" },
  ],
  ideas: [
    {
      t: "Three cars",
      ic: "🚗",
      img: "roads",
      lines: [
        "A blue car drives down Main Street, a red car down Elm Drive, a black car down Pine Road.",
        "How are the paths related?",
      ],
    },
    {
      t: "Parallel",
      ic: "🛤️",
      lines: [
        "Main Street and Elm Drive are always the [same distance] apart.",
        "They never meet: they are [parallel] lines.",
        "JK is parallel to LM.",
      ],
      vis: two([30, 50, 270, 50], [30, 105, 270, 105], ["JK", "LM"]),
    },
    {
      t: "Perpendicular",
      ic: "➕",
      lines: [
        "Main Street and Pine Road [intersect].",
        "They make a [right angle]: they are [perpendicular] lines.",
        "PQ is perpendicular to RS.",
      ],
      vis: two([150, 5, 150, 145], [40, 75, 260, 75], ["PQ", "RS"]),
    },
    {
      t: "Neither",
      ic: "✖️",
      lines: [
        "These lines intersect, but [not] at a right angle.",
        "They are [neither] parallel nor perpendicular.",
      ],
      vis: two([60, 20, 240, 130], [60, 120, 240, 40]),
    },
    {
      t: "How to tell",
      ic: "🔍",
      lines: [
        "Never meet → [parallel].",
        "Meet at a right angle → [perpendicular].",
        "Meet, but not at a right angle → [neither].",
      ],
      vis: two([150, 5, 150, 145], [40, 75, 260, 75]),
    },
  ],

  games: [
    {
      k: "pairs",
      t: "Parallel or perpendicular?",
      en: "Two lines",
      ic: "➕",
      items: [
        ["Parallel", two([40, 30, 260, 30], [40, 120, 260, 120])],
        ["Perpendicular", two([150, 5, 150, 145], [30, 80, 270, 80])],
        ["Neither", two([40, 130, 260, 20], [40, 40, 260, 110])],
        ["Parallel", two([60, 140, 140, 10], [160, 140, 240, 10])],
        ["Perpendicular", two([80, 20, 220, 130], [80, 130, 220, 20])],
        ["Neither", two([30, 75, 270, 75], [120, 140, 200, 10])],
        ["Parallel", two([60, 20, 240, 100], [60, 60, 240, 140])],
      ].map(([a, v]) => pairQ("How can you describe the pair of lines?", a, v)),
    },
    {
      k: "world",
      t: "In the world",
      en: "Rails, roads, windows",
      ic: "🛤️",
      items: [
        pairQ(
          "The two rails of a train track:",
          "Parallel",
          two([30, 50, 270, 50], [30, 100, 270, 100]),
        ),
        pairQ(
          "The side of a window and its bottom edge:",
          "Perpendicular",
          WINDOW,
        ),
        pairQ(
          "The two hands of a clock at 2 o'clock:",
          "Neither",
          two([150, 140, 150, 10], [150, 140, 260, 75]),
        ),
        pairQ("Two shelves of a bookshelf:", "Parallel", SHELF),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-4",
      t: "Be Curious",
      en: "Train tracks",
      ic: "🛤️",
      from: "e-book 14-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Which doesn't belong?",
          img: "curious",
          // unverified: the book takes any answer with a reason
          a: "In three pictures the rails cross each other. In one picture (the straight track, top right) the rails never meet: they are parallel.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-4",
      t: "Learn: three cars",
      en: "Main Street, Elm Drive, Pine Road",
      ic: "🚗",
      from: "e-book 14-4 · Learn",
      keep: true,
      items: [
        pairQ(
          "Main Street and Elm Drive are always the same distance apart. They are:",
          "Parallel",
          undefined,
          { img: "roads" },
        ),
        pairQ(
          "Main Street and Pine Road intersect to form a right angle. They are:",
          "Perpendicular",
          undefined,
          { img: "roads" },
        ),
        {
          type: "open",
          q: "Math Is… Precision: How can you explain the relationship between a pair of lines?",
          vis: two([150, 5, 150, 145], [40, 75, 260, 75]),
          // unverified: a model answer, the book gives none
          a: "Do they meet? If they never meet, they are parallel. If they meet at a right angle, they are perpendicular. If they meet at another angle, they are neither.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-4",
      t: "On My Own 1–3",
      en: "Describe the pair of lines",
      ic: "➕",
      from: "e-book 14-4 · On My Own 1–3",
      keep: true,
      items: [
        pairQ(
          "How can you describe the pair of lines shown?",
          "Perpendicular",
          two([40, 75, 260, 75], [150, 5, 150, 145], ["AB", "CD"]),
        ),
        pairQ(
          "How can you describe the pair of lines shown?",
          "Parallel",
          two([90, 15, 210, 125], [50, 35, 170, 145], ["RS", "TU"]),
        ),
        pairQ(
          "How can you describe the pair of lines shown?",
          "Neither",
          two([90, 15, 210, 135], [150, 5, 150, 145], ["PQ", "MN"]),
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 14-4",
      t: "On My Own 7–11",
      en: "Letters, a bookshelf",
      ic: "🔤",
      from: "e-book 14-4 · On My Own 7–11",
      keep: true,
      items: [
        letQ(
          "What capital letter of the alphabet has perpendicular and parallel lines?",
          "H",
          "H: the two sides are [parallel], the middle bar is [perpendicular] to them.",
        ),
        letQ(
          "What capital letter of the alphabet has perpendicular lines, but not parallel lines?",
          "L",
          "L: two lines meet at a [right angle], and none are parallel.",
        ),
        letQ(
          "What capital letter of the alphabet has parallel lines, but not perpendicular lines?",
          "Z",
          "Z: the top and the bottom are [parallel]; the slanted line does not make a right angle.",
        ),
        {
          type: "open",
          q: "What is a real-world object that does not include parallel or perpendicular lines? Explain why.",
          emoji: "⚽",
          // unverified: the book takes any object with a reason
          a: "A ball: it is round, it has no straight lines at all, so it has no parallel or perpendicular lines.",
        },
        {
          type: "tf",
          q: "Error Analysis: Lindsey states that a bookshelf has only parallel line segments, because the shelves are parallel to one another. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: SHELF,
          // unverified: no key
          x: "The shelves are parallel, but each shelf meets the sides at a right angle: the bookshelf also has [perpendicular] line segments.",
        },
        {
          type: "open",
          q: "Reflect: How can you identify parallel and perpendicular lines in the world around you?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "Parallel lines never meet, like the rails of a track or the shelves of a bookshelf. Perpendicular lines meet at a square corner, like the sides of a window or a door.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 161–162",
      t: "Additional Practice 1–4, 8",
      en: "Lesson 14-4",
      ic: "📘",
      from: "Practice Book p. 161–162",
      keep: true,
      items: [
        pairQ(
          "Label the pair of lines: parallel, perpendicular or neither?",
          "Perpendicular",
          two([71, 45, 229, 105], [175, 10, 125, 140]),
        ),
        pairQ(
          "Label the pair of lines: parallel, perpendicular or neither?",
          "Parallel",
          two([60, 120, 200, 29], [110, 140, 250, 49]),
        ),
        pairQ(
          "Label the pair of lines: parallel, perpendicular or neither?",
          "Neither",
          two([102, 24, 198, 126], [66, 61, 234, 89]),
        ),
        pairQ(
          "Label the pair of lines: parallel, perpendicular or neither?",
          "Perpendicular",
          two([150, 5, 150, 145], [60, 70, 240, 70]),
        ),
        {
          type: "tf",
          q: "Wade thinks that a window only has perpendicular line segments. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: WINDOW,
          // unverified: no key
          x: "The sides of a window meet at right angles (perpendicular), but the opposite sides are [parallel]: the top and the bottom, the left and the right.",
        },
      ],
    },
  ],
};
