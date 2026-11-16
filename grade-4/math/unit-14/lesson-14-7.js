// Math · Grade 4 · Lesson 14-7 « Classify Polygons » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1884–k1908), Practice Book p. 167–168. No teacher's key.
// On My Own 5: only "rectangle" and "trapezoid" of its choices are seen in the video; the two between are taken from 4 (rhombus, square).
// Practice Book 1 (match) is five questions. Log: grade-4/math/SOURCES.md.
const SHAPES = {
  square: [
    [110, 25],
    [190, 25],
    [190, 105],
    [110, 105],
  ],
  rectangle: [
    [70, 35],
    [230, 35],
    [230, 105],
    [70, 105],
  ],
  rhombus: [
    [150, 10],
    [215, 65],
    [150, 120],
    [85, 65],
  ],
  parallelogram: [
    [100, 30],
    [250, 30],
    [200, 110],
    [50, 110],
  ],
  trapezoid: [
    [110, 30],
    [190, 30],
    [240, 110],
    [60, 110],
  ],
  other: [
    [90, 30],
    [200, 15],
    [240, 110],
    [70, 95],
  ],
};
const RIGHT = { square: true, rectangle: true };
const shape = (k, fill = 1) => {
  const p = SHAPES[k];
  const items = [{ t: "poly", pts: p, fill }];
  if (RIGHT[k])
    p.forEach((v, i) =>
      items.push({ t: "right", v, a: p[(i + 1) % 4], b: p[(i + 3) % 4] }),
    );
  return { kind: "geo", w: 300, h: 130, items };
};
const NAMES = ["parallelogram", "rectangle", "rhombus", "square", "trapezoid"];
const DEF = {
  trapezoid: "a quadrilateral with exactly one pair of parallel lines",
  parallelogram: "a quadrilateral with two pairs of parallel lines",
  rhombus: "a parallelogram with 4 equal sides",
  rectangle:
    "a parallelogram with 4 right angles and 2 pairs of equal opposite sides",
  square: "a parallelogram with 4 right angles and 4 equal sides",
};
// which quadrilateral matches the attributes (opts in the book's order, right one first)
const matchQ = (q, ans, opts, vis) => ({
  type: "mc",
  q,
  opts: [ans, ...opts.filter((o) => o !== ans)],
  keep: opts,
  vis,
  x: `A ${ans} is ${DEF[ans]}.`,
});
// choose all that apply (same emoji on every option)
const multi = (q, rows, vis, x) => ({
  type: "multi",
  q,
  opts: rows.map(([t, ok]) => ({ t, ok, emoji: "🔷" })),
  vis,
  x,
});

window.LESSON = {
  n: "14-7",
  key: "math4-l14-7",
  grade: 4,
  title: "Classify Polygons",
  en: "Trapezoid, parallelogram, rhombus, rectangle, square",
  unit: "Unit 14 · Lesson 14-7",
  book: "e-book Lesson 14-7 · Practice Book p. 167–168",
  imgDir: "img/lesson-14-7",
  cover: "curious",
  question: {
    q: "How can you use [parallel] and/or [perpendicular] lines to classify quadrilaterals?",
    // unverified: a model answer, the book gives none
    a: "Count the pairs of parallel sides: one pair is a trapezoid, two pairs is a parallelogram. Then look for right angles (perpendicular sides) and equal sides: rectangle, rhombus, square.",
    img: "curious",
  },
  words: [
    { w: "Quadrilateral", m: "a polygon with 4 sides" },
    { w: "Trapezoid", m: "exactly one pair of parallel sides" },
    { w: "Parallelogram", m: "two pairs of parallel sides" },
    { w: "Rhombus", m: "a parallelogram with 4 equal sides" },
    { w: "Rectangle", m: "a parallelogram with 4 right angles" },
    { w: "Square", m: "a parallelogram with 4 right angles and 4 equal sides" },
  ],
  ideas: [
    {
      t: "Edgar's quadrilaterals",
      ic: "🔷",
      lines: [
        "Edgar is classifying [quadrilaterals]: shapes with 4 sides.",
        "He looks at [parallel] sides, [right angles] and [equal] sides.",
      ],
      vis: shape("other", 2),
    },
    {
      t: "Trapezoid",
      ic: "⏢",
      lines: ["Exactly [one pair] of parallel sides: a [trapezoid]."],
      vis: shape("trapezoid"),
    },
    {
      t: "Parallelogram",
      ic: "▱",
      lines: ["[Two pairs] of parallel sides: a [parallelogram]."],
      vis: shape("parallelogram"),
    },
    {
      t: "Rhombus",
      ic: "🔷",
      lines: ["A parallelogram with [4 equal sides]: a [rhombus]."],
      vis: shape("rhombus"),
    },
    {
      t: "Rectangle",
      ic: "▭",
      lines: [
        "A parallelogram with [4 right angles] and 2 pairs of equal sides: a [rectangle].",
      ],
      vis: shape("rectangle"),
    },
    {
      t: "Square",
      ic: "🟦",
      lines: [
        "A parallelogram with [4 right angles] and [4 equal sides]: a [square].",
      ],
      vis: shape("square"),
    },
    {
      t: "Neither",
      ic: "✖️",
      lines: [
        "Some quadrilaterals have [no] parallel and [no] perpendicular sides.",
      ],
      vis: shape("other", 2),
    },
  ],

  games: [
    {
      k: "name",
      t: "Name the shape",
      en: "Which quadrilateral is it?",
      ic: "🔷",
      items: [
        "square",
        "trapezoid",
        "rhombus",
        "rectangle",
        "parallelogram",
        "trapezoid",
        "square",
      ].map((k) =>
        matchQ(
          "What is the best name for this quadrilateral?",
          k,
          NAMES,
          shape(k),
        ),
      ),
    },
    {
      k: "attr",
      t: "Match the attributes",
      en: "Read the rule, find the shape",
      ic: "📋",
      items: [
        "rhombus",
        "trapezoid",
        "square",
        "parallelogram",
        "rectangle",
      ].map((k) =>
        matchQ(
          `Which quadrilateral is ${DEF[k]}?`,
          k,
          NAMES,
          shape("other", 2),
        ),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-7",
      t: "Be Curious",
      en: "Four shapes",
      ic: "🔺",
      from: "e-book 14-7 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Which doesn't belong?",
          img: "curious",
          // unverified: the book takes any answer with a reason
          a: "The triangle: it has 3 sides, the others have more. Or the trapezoid: it is the only one with 4 sides (a quadrilateral).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-7",
      t: "Learn and Work Together",
      en: "Edgar's quadrilaterals; a square and a rhombus",
      ic: "🔷",
      from: "e-book 14-7 · Learn, Work Together",
      keep: true,
      items: [
        {
          type: "open",
          q: "Math Is… Precision: Why is it important to use precise vocabulary when classifying figures?",
          vis: shape("rhombus"),
          // unverified: a model answer, the book gives none
          a: 'Each name means exact attributes. "Rhombus" tells that all 4 sides are equal; "square" also tells that all 4 angles are right angles. The right word tells exactly which shape it is.',
        },
        {
          type: "open",
          q: "Work Together: How are a square and a rhombus the same? How are they different?",
          vis: {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              {
                t: "poly",
                pts: [
                  [30, 30],
                  [110, 30],
                  [110, 110],
                  [30, 110],
                ],
                fill: 1,
              },
              {
                t: "poly",
                pts: [
                  [215, 10],
                  [275, 65],
                  [215, 120],
                  [155, 65],
                ],
                fill: 1,
              },
            ],
          },
          // unverified: a model answer, the book gives none
          a: "The same: both have 4 equal sides and 2 pairs of parallel sides. Different: a square has 4 right angles, a rhombus does not have to.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-7",
      t: "On My Own 1–5",
      en: "Which quadrilateral matches?",
      ic: "📋",
      from: "e-book 14-7 · On My Own 1–5",
      keep: true,
      items: [
        matchQ(
          "Which quadrilateral matches the attributes? A parallelogram with 4 right angles and 4 equal sides.",
          "square",
          ["rhombus", "square", "trapezoid"],
          shape("other", 2),
        ),
        multi(
          "Which quadrilaterals match the attributes? A quadrilateral with two pairs of parallel lines.",
          [
            ["parallelogram", true],
            ["rectangle", true],
            ["rhombus", true],
            ["square", true],
            ["trapezoid", false],
          ],
          shape("parallelogram"),
          "Parallelograms, rectangles, rhombuses and squares all have two pairs of parallel lines. A trapezoid has only one pair.",
        ),
        matchQ(
          "Which quadrilateral matches the attributes? A quadrilateral with exactly one pair of parallel lines.",
          "trapezoid",
          NAMES,
          shape("other", 2),
        ),
        matchQ(
          "Which quadrilateral matches the attributes? A parallelogram with 4 equal sides but no right angles.",
          "rhombus",
          ["rectangle", "rhombus", "square", "trapezoid"],
          shape("other", 2),
        ),
        matchQ(
          "Which quadrilateral matches the attributes? A parallelogram with 4 right angles and 2 pairs of equal sides.",
          "rectangle",
          ["rectangle", "rhombus", "square", "trapezoid"],
          shape("other", 2),
        ),
      ],
    },
    {
      k: "own6",
      g: "📗 Book · Lesson 14-7",
      t: "On My Own 6–9",
      en: "Squares, rectangles, Rhonda",
      ic: "🟦",
      from: "e-book 14-7 · On My Own 6–9",
      keep: true,
      items: [
        multi(
          "Which statements are true about all squares?",
          [
            ["All squares have 4 sides.", true],
            ["All squares have 2 pairs of parallel lines.", true],
            ["All squares have 4 right angles.", true],
            ["All squares have 4 equal sides.", true],
          ],
          shape("square"),
          "A square is a parallelogram with 4 right angles and 4 equal sides: all four are true.",
        ),
        multi(
          "Which statements are true about all rectangles?",
          [
            ["All rectangles have 4 sides.", true],
            ["All rectangles have 2 pairs of parallel lines.", true],
            ["All rectangles have 4 right angles.", true],
            ["All rectangles have 4 equal sides.", false],
          ],
          shape("rectangle"),
          "A rectangle has 4 right angles and 2 pairs of equal sides: its sides are not all equal.",
        ),
        {
          type: "tf",
          q: "Error Analysis: Rhonda states that all quadrilaterals have parallel and perpendicular lines. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: shape("other", 2),
          // unverified: no key
          x: "Some quadrilaterals have neither: this one has no parallel sides and no right angles. A rhombus has parallel sides but no perpendicular ones.",
        },
        {
          type: "tf",
          q: "Extend: Are parallelograms also trapezoids?",
          a: false,
          yes: ["Yes, they are", "No, they are not"],
          vis: {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              {
                t: "poly",
                pts: [
                  [50, 30],
                  [140, 30],
                  [110, 110],
                  [20, 110],
                ],
                fill: 1,
              },
              {
                t: "poly",
                pts: [
                  [200, 30],
                  [250, 30],
                  [285, 110],
                  [165, 110],
                ],
                fill: 2,
              },
            ],
          },
          // unverified: no key; the book defines a trapezoid as exactly one pair of parallel lines
          x: "A trapezoid has [exactly one] pair of parallel lines. A parallelogram has two pairs, so it is not a trapezoid.",
        },
        {
          type: "open",
          q: "Reflect: How can you use parallel and/or perpendicular lines to classify quadrilaterals?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "One pair of parallel sides: a trapezoid. Two pairs: a parallelogram. A parallelogram with perpendicular sides (right angles) is a rectangle or a square.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 167–168",
      t: "Additional Practice 1–4",
      en: "Lesson 14-7",
      ic: "📘",
      from: "Practice Book p. 167–168",
      keep: true,
      items: [
        ...["parallelogram", "rectangle", "trapezoid", "square", "rhombus"].map(
          (k) =>
            matchQ(
              `Match: ${DEF[k][0].toUpperCase()}${DEF[k].slice(1)}.`,
              k,
              ["square", "rhombus", "rectangle", "parallelogram", "trapezoid"],
              shape("other", 2),
            ),
        ),
        multi(
          "Which statements are true about all trapezoids?",
          [
            ["All trapezoids have 4 sides.", true],
            ["All trapezoids have 2 pairs of parallel lines.", false],
            ["All trapezoids have 4 right angles.", false],
            ["All trapezoids have 4 equal sides.", false],
          ],
          shape("trapezoid"),
          "A trapezoid has 4 sides and exactly one pair of parallel lines; its angles and sides can be different.",
        ),
        multi(
          "Which statements are true about all rhombuses?",
          [
            ["All rhombuses have 4 sides.", true],
            ["All rhombuses have 2 pairs of parallel lines.", true],
            ["All rhombuses have 4 right angles.", false],
            ["All rhombuses have 4 equal sides.", true],
          ],
          shape("rhombus"),
          "A rhombus is a parallelogram with 4 equal sides; it does not need right angles.",
        ),
        {
          type: "open",
          q: "How are a square and a rectangle the same? How are they different?",
          vis: {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              {
                t: "poly",
                pts: [
                  [20, 35],
                  [100, 35],
                  [100, 115],
                  [20, 115],
                ],
                fill: 1,
              },
              {
                t: "poly",
                pts: [
                  [140, 45],
                  [285, 45],
                  [285, 105],
                  [140, 105],
                ],
                fill: 1,
              },
            ],
          },
          // unverified: a model answer, the Practice Book has no key
          a: "The same: both are parallelograms with 4 right angles. Different: a square has 4 equal sides; a rectangle has 2 pairs of equal sides (long and short).",
        },
      ],
    },
  ],
};
