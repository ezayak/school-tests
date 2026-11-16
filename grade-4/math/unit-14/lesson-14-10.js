// Math · Grade 4 · Lesson 14-10 « Draw Lines of Symmetry » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1988–k2030), Practice Book p. 173–174. No teacher's key.
// "Draw the lines" items are asked as "how many lines"; the figures are redrawn (On My Own 4: five different sides; Practice Book 1–4, 9
// measured on the PDF's lines). Log: grade-4/math/SOURCES.md.
const g = (items, h = 130) => ({ kind: "geo", w: 300, h, items });
const dash = (a, b) => ({ t: "line", a, b, dash: true });
const regular = (n, cx = 150, cy = 68, r = 55, start = -90) =>
  Array.from({ length: n }, (_, i) => {
    const t = ((start + (i * 360) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
const shape = (pts, labs = [], fill = 1) =>
  g([
    { t: "poly", pts, fill },
    ...labs.map(([s, x, y]) => ({ t: "text", p: [x, y], s })),
  ]);
const S = {
  rect: shape([
    [80, 35],
    [220, 35],
    [220, 100],
    [80, 100],
  ]),
  kite: shape(
    [
      [150, 10],
      [180, 40],
      [150, 125],
      [120, 40],
    ],
    [
      ["1 ft", 120, 20],
      ["1 ft", 182, 20],
      ["3 ft", 113, 90],
      ["3 ft", 190, 90],
    ],
  ),
  arrow2: shape([
    [70, 65],
    [100, 40],
    [100, 55],
    [200, 55],
    [200, 40],
    [230, 65],
    [200, 90],
    [200, 75],
    [100, 75],
    [100, 90],
  ]),
  odd: shape([
    [168, 10],
    [223, 65],
    [195, 115],
    [92, 115],
    [75, 95],
  ]),
  penta: shape(regular(5, 150, 72, 58), [
    ["2 in.", 110, 25],
    ["2 in.", 192, 25],
    ["2 in.", 85, 95],
    ["2 in.", 217, 95],
    ["2 in.", 150, 135],
  ]),
  kite2: shape(
    [
      [150, 10],
      [185, 35],
      [150, 125],
      [115, 35],
    ],
    [
      ["2 in.", 115, 15],
      ["2 in.", 187, 15],
      ["4 in.", 110, 90],
      ["4 in.", 192, 90],
    ],
  ),
};
// how many lines of symmetry (drawing without the lines)
const countQ = (q, n, vis, x, more = {}) => ({
  type: "num",
  q,
  a: n,
  vis,
  x,
  ...more,
});

window.LESSON = {
  n: "14-10",
  key: "math4-l14-10",
  grade: 4,
  title: "Draw Lines of Symmetry",
  en: "Find all the lines of symmetry of a figure",
  unit: "Unit 14 · Lesson 14-10",
  book: "e-book Lesson 14-10 · Practice Book p. 173–174",
  imgDir: "img/lesson-14-10",
  cover: "curious",
  question: {
    q: "How do you know a figure has [more than one] line of symmetry?",
    // unverified: a model answer, the book gives none
    a: "If its sides and angles are equal, it can be folded in more than one way. A square folds 4 ways, a polygon with equal sides has as many lines as sides.",
    img: "curious",
  },
  words: [
    {
      w: "Line of symmetry",
      m: "a fold line: the two halves match exactly",
    },
    {
      w: "Regular polygon",
      m: "equal sides and equal angles: as many lines of symmetry as sides",
    },
  ],
  ideas: [
    {
      t: "Ava's paper shapes",
      ic: "✂️",
      img: "curious",
      lines: [
        "Ava folds paper and cuts out a design.",
        "The fold is a [line of symmetry]. Some shapes have [more than one].",
      ],
    },
    {
      t: "Marco's idea",
      ic: "🤔",
      lines: [
        "Marco thinks all quadrilaterals have the same number of lines of symmetry.",
        "Let's check a rhombus and a square.",
      ],
      vis: shape([
        [150, 10],
        [215, 65],
        [150, 120],
        [85, 65],
      ]),
    },
    {
      t: "A rhombus: 2",
      ic: "🔷",
      lines: [
        "4 equal sides, 2 pairs of parallel sides.",
        "A rhombus has [2] lines of symmetry: the two diagonals.",
      ],
      vis: g([
        {
          t: "poly",
          pts: [
            [150, 10],
            [215, 65],
            [150, 120],
            [85, 65],
          ],
          fill: 1,
        },
        dash([150, 0], [150, 130]),
        dash([70, 65], [230, 65]),
      ]),
    },
    {
      t: "A square: 4",
      ic: "🟦",
      lines: [
        "4 equal sides and 4 right angles.",
        "A square has [4] lines of symmetry.",
      ],
      vis: g([
        { t: "poly", pts: regular(4, 150, 65, 62, -45), fill: 1 },
        dash([150, 0], [150, 130]),
        dash([85, 65], [215, 65]),
        dash([95, 10], [205, 120]),
        dash([205, 10], [95, 120]),
      ]),
    },
    {
      t: "So, Marco…",
      ic: "💡",
      lines: [
        "Quadrilaterals do [not] all have the same number of lines of symmetry.",
        "Figures with equal sides and angles have [more] lines.",
      ],
      vis: S.rect,
    },
  ],

  games: [
    {
      k: "count",
      t: "How many lines?",
      en: "Count the lines of symmetry",
      ic: "✳️",
      items: [
        countQ(
          "How many lines of symmetry does the square have?",
          4,
          shape(regular(4, 150, 65, 62, -45)),
          "Up-down, left-right and both diagonals: [4].",
        ),
        countQ(
          "How many lines of symmetry does the rhombus have?",
          2,
          shape([
            [150, 10],
            [215, 65],
            [150, 120],
            [85, 65],
          ]),
          "The two diagonals: [2].",
        ),
        countQ(
          "How many lines of symmetry does the regular octagon have?",
          8,
          shape(regular(8, 150, 65, 60, -67.5)),
          "8 equal sides: [8] lines.",
        ),
        countQ(
          "How many lines of symmetry does the isosceles triangle have?",
          1,
          shape([
            [150, 10],
            [195, 120],
            [105, 120],
          ]),
          "Only down the middle, between the two equal sides: [1].",
        ),
        countQ(
          "How many lines of symmetry does the parallelogram have?",
          0,
          shape([
            [100, 30],
            [250, 30],
            [200, 110],
            [50, 110],
          ]),
          "No fold makes the slanted halves match: [0].",
        ),
        countQ(
          "How many lines of symmetry does the regular hexagon have?",
          6,
          shape(regular(6)),
          "6 equal sides: [6] lines.",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-10",
      t: "Be Curious",
      en: "Ava's paper shapes",
      ic: "✂️",
      from: "e-book 14-10 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Ava made the shapes by folding a piece of paper and cutting out the design. What do you notice? What do you wonder?",
          img: "curious",
          // unverified: the book takes any answer
          a: "I notice the shapes match on both sides of the folds; the flower was folded many times. I wonder how many lines of symmetry each shape has.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-10",
      t: "Learn and Work Together",
      en: "Marco's quadrilaterals; a triangle",
      ic: "🔷",
      from: "e-book 14-10 · Learn, Work Together",
      keep: true,
      items: [
        countQ(
          "How many lines of symmetry does a rhombus have?",
          2,
          shape([
            [150, 10],
            [215, 65],
            [150, 120],
            [85, 65],
          ]),
          "The two diagonals: [2] lines.",
        ),
        countQ(
          "How many lines of symmetry does a square have?",
          4,
          shape(regular(4, 150, 65, 62, -45)),
          "[4] lines: so quadrilaterals don't all have the same number.",
        ),
        {
          type: "open",
          q: "Math Is… How can you determine how many lines of symmetry a figure will have?",
          vis: S.rect,
          // unverified: a model answer, the book gives none
          a: "Look at the equal sides and angles. Try each line through the middle: through corners and through the middles of sides. Count the lines where the halves match.",
        },
        countQ(
          "Work Together: How many lines of symmetry does the triangle have?",
          3,
          shape(regular(3, 150, 75, 60)),
          // unverified: the triangle looks equilateral (all sides equal)
          "All 3 sides are equal: a line from each corner to the middle of the side across, [3] lines.",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-10",
      t: "On My Own 1–7",
      en: "How many lines?",
      ic: "✳️",
      from: "e-book 14-10 · On My Own 1–7",
      keep: true,
      items: [
        countQ(
          "How many lines of symmetry are there?",
          2,
          S.rect,
          "Up-down and left-right through the middle: [2].",
        ),
        countQ(
          "How many lines of symmetry are there?",
          1,
          S.kite,
          "Only from the top corner down: the 1 ft sides and the 3 ft sides match. [1] line.",
        ),
        countQ(
          "How many lines of symmetry are there?",
          2,
          S.arrow2,
          "Across the middle and up-down through the middle: [2].",
        ),
        countQ(
          "How many lines of symmetry are there?",
          0,
          S.odd,
          // unverified: no key; the five sides are all different
          "Its 5 sides all have different lengths: no fold matches. [0].",
        ),
        {
          type: "mc",
          q: "How can you use the attributes of the shape to determine if there are multiple lines of symmetry?",
          opts: [
            "All 5 sides are 2 in.: it has 5 lines",
            "It has 5 sides: it has 1 line",
            "It has no right angles: it has 0 lines",
          ],
          vis: S.penta,
          // unverified: no key
          x: "Equal sides (and equal angles) give a line from each corner to the middle of the side across: [5] lines.",
        },
        {
          type: "mc",
          q: "How can you use the attributes of the shape to determine if there are multiple lines of symmetry?",
          opts: [
            "Only 2 pairs of equal sides: 1 line",
            "4 sides: 4 lines",
            "2 pairs of equal sides: 2 lines",
          ],
          vis: S.kite2,
          // unverified: no key
          x: "The 2 in. sides match each other and the 4 in. sides match each other only across the line down the middle: [1] line.",
        },
        countQ(
          "How many lines of symmetry can you draw on the heptagon with equal side lengths?",
          7,
          shape(regular(7)),
          "7 equal sides: a line from each corner to the middle of the side across, [7] lines (more than 4).",
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 14-10",
      t: "On My Own 8–12",
      en: "Octagon, Roger's garden, Marcus",
      ic: "🛑",
      from: "e-book 14-10 · On My Own 8–12",
      keep: true,
      items: [
        {
          type: "multi",
          q: "What attributes of an octagon with 8 lines of symmetry make it symmetrical in more than one way?",
          vis: shape(regular(8, 150, 65, 60, -67.5)),
          opts: [
            ["There are 8 sides.", false],
            ["The 8 sides are equal.", true],
            ["The opposite sides are parallel.", true],
            ["The opposite sides are perpendicular.", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🛑" })),
          // unverified: no key; as in Practice Book 6 (equal sides, parallel opposite sides). Any octagon has 8 sides.
          x: "Equal sides and parallel opposite sides make it fold the same way in 8 places. Any octagon has 8 sides; its opposite sides are not perpendicular.",
        },
        {
          type: "mc",
          q: "A triangle has only 1 line of symmetry. What kind of triangle could it be?",
          opts: ["Isosceles", "Equilateral", "Scalene"],
          keep: ["Equilateral", "Isosceles", "Scalene"],
          vis: shape([
            [150, 10],
            [195, 120],
            [105, 120],
          ]),
          // unverified: no key
          x: "Exactly 2 equal sides: [isosceles]. Equilateral has 3 lines, scalene has 0.",
        },
        {
          type: "mc",
          q: "Roger's rectangular garden is divided into equal parts by its lines of symmetry. One part is 3 feet long and 2 feet wide. What are the length and width of the garden?",
          opts: [
            "6 feet by 4 feet",
            "3 feet by 2 feet",
            "6 feet by 2 feet",
            "5 feet by 4 feet",
          ],
          vis: g([
            {
              t: "poly",
              pts: [
                [60, 15],
                [240, 15],
                [240, 115],
                [60, 115],
              ],
              fill: 2,
            },
            dash([150, 5], [150, 125]),
            dash([50, 65], [250, 65]),
            { t: "text", p: [105, 45], s: "3 × 2" },
          ]),
          // unverified: no key; a rectangle has 2 lines of symmetry, so 4 equal parts
          x: "A rectangle has 2 lines of symmetry: they cut it into 4 parts. Length 3 + 3 = 6 feet, width 2 + 2 = 4 feet.",
        },
        {
          type: "tf",
          q: "Error Analysis: Marcus says all triangles are symmetrical. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: shape([
            [60, 115],
            [270, 110],
            [210, 25],
          ]),
          x: "A scalene triangle has no equal sides: no line of symmetry.",
        },
        {
          type: "mc",
          q: "Extend: What figure has an infinite number of lines of symmetry?",
          opts: ["A circle", "A square", "A regular octagon"],
          vis: g([
            { t: "poly", pts: regular(36, 150, 65, 55), fill: 1 },
            dash([150, 0], [150, 130]),
            dash([80, 65], [220, 65]),
            dash([100, 15], [200, 115]),
            dash([200, 15], [100, 115]),
          ]),
          x: "Every line through the center of a [circle] is a line of symmetry: there is no end to them.",
        },
        {
          type: "open",
          q: "Reflect: How do you know a figure has more than one line of symmetry?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "When it can be folded in more than one way and the halves still match. Figures with equal sides and equal angles have many lines.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 173–174",
      t: "Additional Practice 1–9",
      en: "Lesson 14-10",
      ic: "📘",
      from: "Practice Book p. 173–174",
      keep: true,
      items: [
        countQ(
          "How many lines of symmetry are there?",
          6,
          shape(regular(6, 150, 65, 58, 0)),
          "A hexagon with 6 equal sides: [6] lines.",
        ),
        countQ(
          "How many lines of symmetry are there?",
          1,
          shape([
            [115, 25],
            [185, 25],
            [210, 110],
            [90, 110],
          ]),
          "The two slanted sides are equal: only the line down the middle, [1].",
        ),
        countQ(
          "How many lines of symmetry are there?",
          1,
          shape([
            [110, 15],
            [110, 120],
            [215, 120],
          ]),
          "The two short sides are equal: one line through the right angle, [1].",
        ),
        countQ(
          "How many lines of symmetry are there?",
          4,
          shape([
            [130, 10],
            [170, 10],
            [170, 45],
            [205, 45],
            [205, 85],
            [170, 85],
            [170, 120],
            [130, 120],
            [130, 85],
            [95, 85],
            [95, 45],
            [130, 45],
          ]),
          "All 4 arms are the same: up-down, left-right and both diagonals, [4].",
        ),
        {
          type: "mc",
          q: "A triangle has three lines of symmetry. What kind of triangle could it be?",
          opts: ["Equilateral", "Isosceles", "Scalene"],
          keep: ["Equilateral", "Isosceles", "Scalene"],
          vis: shape(regular(3, 150, 75, 60)),
          // unverified: the Practice Book has no key
          x: "3 lines need 3 equal sides: [equilateral].",
        },
        {
          type: "multi",
          q: "What are the attributes of a hexagon with 6 lines of symmetry that make it symmetrical? Select all that apply.",
          vis: shape(regular(6, 150, 65, 58, 0)),
          opts: [
            ["All 6 sides are equal", true],
            ["The opposite sides are parallel", true],
            ["The angles are equal", true],
            ["The sides are perpendicular", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "⬡" })),
          // unverified: the Practice Book has no key
          x: "Equal sides, equal angles, parallel opposite sides. Its sides do not meet at right angles.",
        },
        {
          type: "mc",
          q: "How many lines of symmetry does a circle have?",
          opts: ["An infinite number", "1", "2", "4"],
          vis: g([{ t: "poly", pts: regular(36, 150, 65, 55), fill: 1 }]),
          x: "Every line through the center works: [an infinite number].",
        },
        {
          type: "tf",
          q: "Do all triangles have a line of symmetry?",
          a: false,
          yes: ["Yes, they do", "No, they don't"],
          vis: shape([
            [60, 115],
            [270, 110],
            [210, 25],
          ]),
          x: "A scalene triangle (no equal sides) has no line of symmetry.",
        },
        countQ(
          "How many lines of symmetry are there in this pentagon?",
          5,
          shape(regular(5, 150, 72, 58)),
          "5 equal sides: [5] lines.",
        ),
      ],
    },
  ],
};
