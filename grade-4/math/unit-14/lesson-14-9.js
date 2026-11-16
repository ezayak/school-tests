// Math · Grade 4 · Lesson 14-9 « Understand Line Symmetry » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1959–k1987; On My Own 9 from the frames f13086–f13092),
// Practice Book p. 171–172 (pictures `pb1`–`pb6` cropped from the page). No teacher's key.
// The book's figures for On My Own 1–4, 7, 8 are redrawn. Drawing tasks (Work Together, On My Own 10–11, Practice Book 7–9) are left out
// or asked as a question. Log: grade-4/math/SOURCES.md.
const g = (items, h = 130) => ({ kind: "geo", w: 300, h, items });
const dash = (a, b) => ({ t: "line", a, b, dash: true });
const ellipse = (cx, cy, rx, ry, rot = 0, n = 28) =>
  Array.from({ length: n }, (_, i) => {
    const t = (i * 2 * Math.PI) / n,
      x = rx * Math.cos(t),
      y = ry * Math.sin(t),
      r = (rot * Math.PI) / 180;
    return [
      cx + x * Math.cos(r) - y * Math.sin(r),
      cy + x * Math.sin(r) + y * Math.cos(r),
    ];
  });
const regular = (n, cx = 150, cy = 68, r = 55, start = -90) =>
  Array.from({ length: n }, (_, i) => {
    const t = ((start + (i * 360) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
const F = {
  football: g([
    { t: "poly", pts: ellipse(150, 65, 80, 38), fill: 2 },
    { t: "seg", a: [125, 65], b: [175, 65] },
    ...[130, 140, 150, 160, 170].map((x) => ({
      t: "seg",
      a: [x, 58],
      b: [x, 72],
    })),
    dash([45, 65], [255, 65]),
  ]),
  house: g([
    {
      t: "poly",
      pts: [
        [110, 20],
        [175, 20],
        [195, 40],
        [195, 110],
        [110, 110],
      ],
      fill: 1,
    },
    dash([80, 65], [225, 65]),
  ]),
  steps: g([
    {
      t: "poly",
      pts: [
        [70, 10],
        [152, 10],
        [152, 49],
        [213, 49],
        [213, 111],
        [152, 111],
        [70, 88],
      ],
      fill: 1,
    },
    dash([166, 28], [96, 122]),
  ]),
  flower: g([
    ...[0, 60, 120, 180, 240, 300].map((d) => ({
      t: "poly",
      pts: ellipse(
        150 + 28 * Math.cos(((d - 90) * Math.PI) / 180),
        65 + 28 * Math.sin(((d - 90) * Math.PI) / 180),
        26,
        10,
        d - 90,
      ),
      fill: 3,
    })),
    dash([150, 0], [150, 130]),
  ]),
  arrow: g([
    {
      t: "poly",
      pts: [
        [80, 50],
        [170, 50],
        [170, 30],
        [220, 65],
        [170, 100],
        [170, 80],
        [80, 80],
      ],
      fill: 1,
    },
  ]),
  odd: g([
    {
      t: "poly",
      pts: [
        [130, 10],
        [242, 78],
        [207, 126],
        [40, 126],
        [140, 78],
      ],
      fill: 1,
    },
  ]),
};
const YN = ["Yes", "No"];
// does the dashed line show a line of symmetry
const lineQ = (q, yes, vis, x, more = {}) => ({
  type: "mc",
  q,
  opts: yes ? YN : ["No", "Yes"],
  keep: YN,
  vis,
  x,
  ...more,
});
// how many lines of symmetry
const countQ = (q, n, pts, x) => ({
  type: "num",
  q,
  a: n,
  vis: g([{ t: "poly", pts, fill: 1 }]),
  x,
});

window.LESSON = {
  n: "14-9",
  key: "math4-l14-9",
  grade: 4,
  title: "Line Symmetry",
  en: "Fold a figure so the two halves match",
  unit: "Unit 14 · Lesson 14-9",
  book: "e-book Lesson 14-9 · Practice Book p. 171–172",
  imgDir: "img/lesson-14-9",
  cover: "curious",
  question: {
    q: "How do you know where to draw a line on a shape to find a [line of symmetry]?",
    // unverified: a model answer, the book gives none
    a: "Look for a line that cuts the shape into two halves that are the same, like a mirror. If you fold along it, the halves match exactly.",
    img: "letters",
  },
  words: [
    {
      w: "Line symmetry",
      m: "a figure can be folded over a line so that the two halves match exactly",
    },
    { w: "Line of symmetry", m: "the fold line" },
    {
      w: "Symmetrical figure",
      m: "a figure with at least one line of symmetry",
    },
  ],
  ideas: [
    {
      t: "Ben's stickers",
      ic: "🔤",
      img: "letters",
      lines: [
        "Ben folds his letter stickers over a line.",
        "Which letters have two halves that [match exactly]?",
      ],
    },
    {
      t: "Line of symmetry",
      ic: "📏",
      lines: [
        "Fold a figure over a line: if the two halves match exactly, it has [line symmetry].",
        "The fold line is a [line of symmetry].",
      ],
      vis: g([
        { t: "poly", pts: regular(3, 150, 75, 60), fill: 1 },
        dash([150, 0], [150, 130]),
      ]),
    },
    {
      t: "Symmetrical letters",
      ic: "✅",
      lines: [
        "B, M and H have at least one line of symmetry: they are [symmetrical].",
        "F, J and Z have none: they are [not symmetrical].",
      ],
      img: "letters",
    },
    {
      t: "More than one line",
      ic: "✳️",
      lines: [
        "Some figures have [more than one] line of symmetry.",
        "An equilateral triangle has [3].",
      ],
      vis: g([
        { t: "poly", pts: regular(3, 150, 75, 60), fill: 1 },
        ...regular(3, 150, 75, 60).map((p) =>
          dash(p, [150 + (150 - p[0]) * 0.6, 75 + (75 - p[1]) * 0.6]),
        ),
      ]),
    },
    {
      t: "How to check",
      ic: "💡",
      lines: [
        "Draw a line through the middle.",
        "Is each point on one side the [same distance] from the line as a point on the other side? Then the halves match.",
      ],
      vis: F.arrow,
    },
  ],

  games: [
    {
      k: "yn",
      t: "Line of symmetry?",
      en: "Yes or no",
      ic: "📏",
      items: [
        lineQ(
          "Does the dashed line show a line of symmetry?",
          true,
          g([
            {
              t: "poly",
              pts: [
                [70, 25],
                [230, 25],
                [230, 105],
                [70, 105],
              ],
              fill: 1,
            },
            dash([150, 0], [150, 130]),
          ]),
          "The left half and the right half of the rectangle match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          false,
          g([
            {
              t: "poly",
              pts: [
                [70, 25],
                [230, 25],
                [230, 105],
                [70, 105],
              ],
              fill: 1,
            },
            dash([50, 5], [250, 125]),
          ]),
          "Folded along the diagonal, the corners of a long rectangle do not match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          true,
          g([
            { t: "poly", pts: regular(6), fill: 2 },
            dash([150, 0], [150, 135]),
          ]),
          "The hexagon's left and right halves match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          false,
          g([
            {
              t: "poly",
              pts: [
                [80, 110],
                [240, 110],
                [120, 20],
              ],
              fill: 3,
            },
            dash([150, 0], [150, 130]),
          ]),
          "The two parts of this triangle are different: they don't match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          true,
          g([
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
            dash([60, 65], [240, 65]),
          ]),
          "The top half and the bottom half of the rhombus match.",
        ),
      ],
    },
    {
      k: "count",
      t: "How many lines?",
      en: "Count the lines of symmetry",
      ic: "✳️",
      items: [
        countQ(
          "How many lines of symmetry does the square have?",
          4,
          regular(4, 150, 68, 60, -45),
          "Up-down, left-right and the two diagonals: [4] lines.",
        ),
        countQ(
          "How many lines of symmetry does the rectangle have?",
          2,
          [
            [70, 25],
            [230, 25],
            [230, 105],
            [70, 105],
          ],
          "Up-down and left-right: [2] lines. The diagonals don't work.",
        ),
        countQ(
          "How many lines of symmetry does the equilateral triangle have?",
          3,
          regular(3, 150, 75, 60),
          "One from each corner to the middle of the side across: [3] lines.",
        ),
        countQ(
          "How many lines of symmetry does the regular hexagon have?",
          6,
          regular(6),
          "3 through the corners and 3 through the middles of the sides: [6] lines.",
        ),
        countQ(
          "How many lines of symmetry does this triangle have?",
          0,
          [
            [80, 110],
            [240, 110],
            [120, 20],
          ],
          "All its sides are different: [0] lines.",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-9",
      t: "Be Curious",
      en: "A house",
      ic: "🏠",
      from: "e-book 14-9 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: the book takes any answer
          a: "The left side and the right side of the house look the same: the same windows, the same roofs, the door in the middle. Small things are different, like the trees.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-9",
      t: "Learn and Work Together",
      en: "Ben's letters",
      ic: "🔤",
      from: "e-book 14-9 · Learn, Work Together",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Which letters can Ben fold over a line so that the two halves match exactly?",
          img: "letters",
          opts: [
            ["B", true],
            ["F", false],
            ["M", true],
            ["J", false],
            ["Z", false],
            ["H", true],
          ].map(([t, ok]) => ({ t, ok, emoji: "🔤" })),
          x: "B (fold across the middle), M (fold down the middle) and H (both ways) have a line of symmetry. F, J and Z have none.",
        },
        {
          type: "open",
          q: "Math Is… Explaining: How can you tell whether a letter has two halves that match exactly?",
          img: "letters",
          // unverified: a model answer, the book gives none
          a: "Look for a line through the letter. If one side is a mirror of the other, the halves match exactly when you fold it.",
        },
        {
          type: "open",
          q: "Work Together: Half of the figure is missing. How can you use the line of symmetry to help you draw the rest?",
          vis: g([
            {
              t: "poly",
              pts: [
                [150, 10],
                [150, 120],
                [90, 120],
                [110, 60],
              ],
              fill: 1,
            },
            dash([150, 0], [150, 130]),
          ]),
          // unverified: a model answer, the book gives none
          a: "Each corner on one side gets a partner on the other side, the same distance from the line. Draw the partners and join them: the new half is a mirror of the first half.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-9",
      t: "On My Own 1–6",
      en: "Is it a line of symmetry?",
      ic: "📏",
      from: "e-book 14-9 · On My Own 1–6",
      keep: true,
      items: [
        lineQ(
          "Does the dashed line show a line of symmetry?",
          true,
          F.football,
          "The top half and the bottom half of the football match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          false,
          F.house,
          "Only the top corner is cut: the top half and the bottom half don't match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          false,
          F.steps,
          "The two parts have different sizes and only one edge is slanted: they don't match.",
        ),
        lineQ(
          "Does the dashed line show a line of symmetry?",
          true,
          F.flower,
          "The left half and the right half of the flower match.",
        ),
        lineQ(
          "Does a rectangle have a line of symmetry?",
          true,
          g([
            {
              t: "poly",
              pts: [
                [70, 25],
                [230, 25],
                [230, 105],
                [70, 105],
              ],
              fill: 1,
            },
          ]),
          "Yes: it has 2, up-down through the middle and left-right through the middle.",
        ),
        lineQ(
          "Does a pentagon with equal side lengths have a line of symmetry?",
          true,
          g([{ t: "poly", pts: regular(5), fill: 2 }]),
          "Yes: a line from each corner to the middle of the side across, 5 lines.",
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 14-9",
      t: "On My Own 7–12",
      en: "Symmetrical figures",
      ic: "✳️",
      from: "e-book 14-9 · On My Own 7–12",
      keep: true,
      items: [
        lineQ(
          "Is the figure symmetrical?",
          true,
          F.arrow,
          "A line across the middle of the arrow cuts it into a top half and a bottom half that match.",
        ),
        lineQ(
          "Is the figure symmetrical?",
          false,
          F.odd,
          // unverified: no key; no two sides have the same length
          "No line cuts it into two matching halves: its sides all have different lengths.",
        ),
        {
          type: "num",
          q: "How many lines of symmetry are shown on the equilateral triangle?",
          a: 3,
          vis: g([
            { t: "poly", pts: regular(3, 150, 75, 60), fill: 1 },
            ...regular(3, 150, 75, 60).map((p) =>
              dash(p, [150 + (150 - p[0]) * 0.6, 75 + (75 - p[1]) * 0.6]),
            ),
          ]),
          x: "There are [3] dashed lines, one from each corner.",
        },
        {
          type: "open",
          q: "Extend: Alice plans to make a card in the shape of a heart. How can she make a heart shape that is symmetrical? Describe the steps.",
          emoji: "❤️",
          // unverified: a model answer, the book gives none
          a: "Fold the paper in half. Draw half a heart along the fold. Cut along the line and open the paper: both halves of the heart are the same.",
        },
        {
          type: "open",
          q: "Reflect: How do you know where to draw a line on a shape to find a line of symmetry?",
          img: "letters",
          // unverified: a model answer, the book gives none
          a: "I look for a line through the middle where one side is a mirror of the other. If I fold along it, the halves match exactly.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 171–172",
      t: "Additional Practice 1–6",
      en: "Lesson 14-9",
      ic: "📘",
      from: "Practice Book p. 171–172",
      keep: true,
      items: [
        [
          false,
          "The arrow points left: its left half and right half don't match.",
        ],
        [true, "The star's two halves match across this diagonal line."],
        [true, "The lotus's left half and right half match."],
        [
          false,
          "The top wings and the bottom wings are different: they don't match.",
        ],
        [
          false,
          "The line is near the top: the short top part and the long bottom part don't match.",
        ],
        [true, "The top half and the bottom half of the heart match."],
      ].map(([yes, x], i) =>
        lineQ(
          "Does the dotted line show a line of symmetry? Write yes or no.",
          yes,
          undefined,
          x,
          { img: `pb${i + 1}` },
        ),
      ),
    },
  ],
};
