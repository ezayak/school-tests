// Math · Grade 4 · Lesson 13-9 « Solve Problems Involving Perimeter and Area » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1474–k1500; On My Own 6 from the frame f09850),
// Practice Book p. 149–150. No teacher's key. A problem in two steps is two items. Log: grade-4/math/SOURCES.md.
const rect = (lt, wt, cap, sq = false) => {
  const W = sq ? 100 : 170,
    H = sq ? 100 : 80,
    x0 = 150 - W / 2,
    y0 = 20;
  const items = [
    {
      t: "poly",
      pts: [
        [x0, y0],
        [x0 + W, y0],
        [x0 + W, y0 + H],
        [x0, y0 + H],
      ],
      fill: 3,
    },
  ];
  if (lt) items.push({ t: "text", p: [150, y0 - 6], s: lt });
  if (wt) items.push({ t: "text", p: [x0 + W + 32, y0 + H / 2 + 5], s: wt });
  return { kind: "geo", w: 300, h: 130, items, ...(cap ? { cap } : {}) };
};
// area and one side → the other side, then the perimeter (two items)
const fromArea = (text, A, w, u, more = {}) => {
  const l = A / w;
  return [
    {
      type: "num",
      q: `${text} What is the length?`,
      pre: "l =",
      post: u,
      a: l,
      vis: rect("?", `${w} ${u}`, `A = ${A} square ${u}`),
      x: `A = l × w: ${A} ÷ ${w} = [${l}] ${u}.`,
      ...more,
    },
    {
      type: "num",
      q: `${text} What is the perimeter?`,
      pre: "P =",
      post: u,
      a: 2 * (l + w),
      vis: rect(`${l} ${u}`, `${w} ${u}`, `A = ${A} square ${u}`),
      x: `P = 2 × (${l} + ${w}) = 2 × ${l + w} = [${2 * (l + w)}] ${u}.`,
    },
  ];
};
const multi = (q, rows, vis, x) => ({
  type: "multi",
  q,
  vis,
  opts: rows.map(([t, ok]) => ({ t, ok, emoji: "▭" })),
  x,
});

window.LESSON = {
  n: "13-9",
  key: "math4-l13-9",
  grade: 4,
  title: "Perimeter and Area Problems",
  en: "Use one formula to find a side, then the other formula",
  unit: "Unit 13 · Lesson 13-9",
  book: "e-book Lesson 13-9 · Practice Book p. 149–150",
  imgDir: "img/lesson-13-9",
  cover: "curious",
  question: {
    q: "What is a real-world problem you can solve using the formulas for [area] and [perimeter] of a rectangle?",
    // unverified: a model answer, the book gives none
    a: "Building a sandbox: the area tells how much sand covers it (A = l × w), the perimeter tells how much wood goes around it (P = 2 × (l + w)).",
    img: "curious",
  },
  words: [
    { w: "Area", m: "A = l × w (square units)" },
    { w: "Perimeter", m: "P = 2 × (l + w) (units)" },
    { w: "Dimensions", m: "the length and the width" },
  ],
  ideas: [
    {
      t: "A batting cage",
      ic: "⚾",
      img: "curious",
      lines: [
        "A fence goes [around] the field: perimeter.",
        "The ground [inside] is covered: area.",
      ],
    },
    {
      t: "The sandbox",
      ic: "🏖️",
      lines: [
        "Danesh and Phillipe build a sandbox of [24 square feet]. One side is [6 feet].",
        "What will be the perimeter?",
      ],
      vis: rect("6 ft", "?", "A = 24 sq ft"),
    },
    {
      t: "Step 1: the width",
      ic: "1️⃣",
      lines: ["A = l × w: 24 = 6 × w.", "24 ÷ 6 = [4]: the width is 4 feet."],
      vis: rect("6 ft", "4 ft", "A = 24 sq ft"),
    },
    {
      t: "Step 2: the perimeter",
      ic: "2️⃣",
      lines: ["P = 2 × (6 + 4) = 2 × 10 = [20] feet."],
      vis: rect("6 ft", "4 ft", "P = 20 ft"),
    },
    {
      t: "The most area",
      ic: "🐕",
      lines: [
        "With the same perimeter, a [square] gives the most area.",
        "36 feet of fence: 9 × 9 = [81] square feet.",
      ],
      vis: rect("9 ft", "9 ft", "P = 36 ft", true),
    },
  ],

  games: [
    {
      k: "two",
      t: "Two steps",
      en: "Area → side → perimeter",
      ic: "🧮",
      items: [
        ...fromArea(
          "A rectangle has an area of 35 square cm and a width of 5 cm.",
          35,
          5,
          "cm",
        ),
        ...fromArea(
          "A rectangle has an area of 54 square m and a width of 6 m.",
          54,
          6,
          "m",
        ),
        ...fromArea(
          "A rectangle has an area of 32 square in. and a width of 4 in.",
          32,
          4,
          "in.",
        ),
      ],
      keep: true,
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-9",
      t: "Be Curious",
      en: "A batting cage",
      ic: "⚾",
      from: "e-book 13-9 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: the book takes any answer
          a: "I notice a rectangular batting cage with a fence and a dirt floor. I wonder how much fence goes around it (perimeter) and how big the floor is (area).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-9",
      t: "Learn and Work Together",
      en: "The sandbox; the dog pen",
      ic: "🏖️",
      from: "e-book 13-9 · Learn, Work Together",
      keep: true,
      items: [
        ...fromArea(
          "The sandbox has an area of 24 square feet and one side of 6 feet.",
          24,
          6,
          "ft",
        ).map((it, i) =>
          i === 0
            ? {
                ...it,
                q: "The sandbox has an area of 24 square feet and a length of 6 feet. What is the width?",
                pre: "w =",
                vis: rect("6 ft", "?", "A = 24 sq ft"),
              }
            : it,
        ),
        {
          type: "open",
          q: "Math Is… Modeling: How does the representation help you understand the relationship between the quantities?",
          vis: rect("6 ft", "4 ft", "A = 24 sq ft, P = 20 ft"),
          // unverified: a model answer, the book gives none
          a: "The drawing shows the sides: the area connects the length and the width, and once I know both, I can add them for the perimeter.",
        },
        {
          type: "mc",
          q: "Work Together: Danesh and Phillipe have 36 feet of fencing for a rectangular dog pen. Which dimensions give the dog the most area?",
          opts: [
            "9 feet by 9 feet",
            "10 feet by 8 feet",
            "12 feet by 6 feet",
            "17 feet by 1 foot",
          ],
          vis: rect("?", "?", "P = 36 ft"),
          // unverified: no key
          x: "Length + width = 18. 9 × 9 = 81, 10 × 8 = 80, 12 × 6 = 72, 17 × 1 = 17: the square 9 by 9 gives the most area.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-9",
      t: "On My Own 1–6",
      en: "Billboard, pool, pond, rug",
      ic: "🪧",
      from: "e-book 13-9 · On My Own 1–6",
      keep: true,
      items: [
        ...fromArea(
          "A billboard has an area of 48 square yards and a width of 4 yards.",
          48,
          4,
          "yd",
        ).map((it) => ({ ...it, vis: undefined, img: "billboard" })),
        ...fromArea(
          "A lap pool has an area of 300 square feet and a length of 30 feet.",
          300,
          30,
          "ft",
        ).map((it, i) =>
          i === 0
            ? {
                ...it,
                q: "A lap pool has an area of 300 square feet and a length of 30 feet. What is the width?",
                pre: "w =",
                vis: rect("30 ft", "?", "A = 300 sq ft"),
              }
            : it,
        ),
        ...fromArea(
          "A rectangular koi pond has an area of 12 square feet and a width of 2 feet.",
          12,
          2,
          "ft",
        ),
        ...fromArea(
          "A rectangular rug has an area of 15 square feet and a width of 3 feet.",
          15,
          3,
          "ft",
        ),
        {
          type: "num",
          q: "A rectangular greenhouse has a perimeter of 40 feet and a length of 10 feet. What is the area?",
          pre: "A =",
          post: "sq ft",
          a: 100,
          vis: rect("10 ft", "?", "P = 40 ft"),
          x: "Length + width = 40 ÷ 2 = 20, so w = 10 feet. A = 10 × 10 = [100] square feet.",
        },
        {
          type: "num",
          q: "A square frame has an area of 400 square inches. What are the side lengths?",
          pre: "l =",
          post: "in.",
          a: 20,
          vis: rect("?", "?", "A = 400 sq in.", true),
          x: "A square has equal sides: 20 × 20 = 400, so each side is [20] inches.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 13-9",
      t: "On My Own 7–10",
      en: "Park, flowerbed, building, doubling",
      ic: "🌷",
      from: "e-book 13-9 · On My Own 7–10",
      keep: true,
      items: [
        multi(
          "A rectangular park has an area of 12 square miles. Which are possible perimeters? Choose all.",
          [
            ["26 miles (12 by 1)", true],
            ["16 miles (6 by 2)", true],
            ["14 miles (4 by 3)", true],
            ["12 miles (6 by 6)", false],
          ],
          rect("?", "?", "A = 12 sq mi"),
          // unverified: the book takes the three perimeters with an explanation
          "Sides with l × w = 12: 12 × 1 (P = 26), 6 × 2 (P = 16), 4 × 3 (P = 14). 6 by 6 has an area of 36.",
        ),
        {
          type: "num",
          q: "A gardener has 60 inches of edging to surround a rectangular flowerbed. What is the greatest possible area?",
          pre: "A =",
          post: "sq in.",
          a: 225,
          vis: rect("?", "?", "P = 60 in."),
          // unverified: no key; with whole-number sides the square 15 by 15 gives the most
          x: "Length + width = 30. The most area is a square: 15 × 15 = [225] square inches.",
        },
        multi(
          "STEM Connection: Sam's rectangular building can have an area of at most 360,000 square feet. The length is 900 feet. Which could be the width? Choose all.",
          [
            ["400 feet", true],
            ["300 feet", true],
            ["200 feet", true],
            ["500 feet", false],
          ],
          rect("900 ft", "?", "A ≤ 360,000 sq ft"),
          // unverified: the book takes any three widths up to 400 feet
          "360,000 ÷ 900 = 400: the width can be 400 feet or less. 500 × 900 = 450,000 is too much.",
        ),
        {
          type: "mc",
          q: "Extend: The length and width of a rectangle are doubled. How do the area and the perimeter change?",
          opts: [
            "The perimeter doubles, the area is 4 times as great",
            "Both double",
            "Both are 4 times as great",
            "The area doubles, the perimeter is 4 times as great",
          ],
          vis: {
            kind: "lines",
            rows: ["3 × 2: P = 10, A = 6", "6 × 4: P = 20, A = 24"],
          },
          // unverified: no key
          x: "3 by 2 → 6 by 4: P goes 10 → 20 (× 2), A goes 6 → 24 (× 4). Doubling again: P × 2 and A × 4 again.",
        },
        {
          type: "open",
          q: "Reflect: What is a real-world problem you can solve using the formulas for area and perimeter of a rectangle?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "How much fence and how much grass a rectangular yard needs: the fence is the perimeter, the grass is the area.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 149–150",
      t: "Additional Practice 1–4",
      en: "Lesson 13-9",
      ic: "📘",
      from: "Practice Book p. 149–150",
      keep: true,
      items: [
        {
          type: "num",
          q: "The perimeter of the pool is 52 yards. Its length is 16 yards. What is the width x?",
          pre: "x =",
          post: "yd",
          a: 10,
          vis: rect("16 yd", "x yd", "P = 52 yd"),
          x: "Length + width = 52 ÷ 2 = 26. 26 − 16 = [10] yards.",
        },
        {
          type: "num",
          q: "What is the area of the pool?",
          pre: "A =",
          post: "sq yd",
          a: 160,
          vis: rect("16 yd", "10 yd", "P = 52 yd"),
          x: "A = 16 × 10 = [160] square yards.",
        },
        ...fromArea(
          "The garden has an area of 56 square feet and a side of 8 feet.",
          56,
          8,
          "ft",
        ).map((it, i) =>
          i === 0
            ? {
                ...it,
                q: "The garden has an area of 56 square feet and a side of 8 feet. What is the other side n?",
                pre: "n =",
              }
            : it,
        ),
        multi(
          "Goldie has 28 feet of mesh for the perimeter of a sanctuary. Which whole-number dimensions can she use? Choose all.",
          [
            ["13 ft by 1 ft", true],
            ["10 ft by 4 ft", true],
            ["7 ft by 7 ft", true],
            ["14 ft by 14 ft", false],
            ["12 ft by 3 ft", false],
          ],
          rect("?", "?", "P = 28 ft"),
          "Length + width must be 14: 13 + 1, 10 + 4, 7 + 7 (also 12 + 2, 11 + 3, 9 + 5, 8 + 6).",
        ),
        {
          type: "mc",
          q: "Which set of dimensions gives the largest area for Goldie's sanctuary?",
          opts: [
            "7 ft by 7 ft",
            "8 ft by 6 ft",
            "10 ft by 4 ft",
            "13 ft by 1 ft",
          ],
          vis: rect("?", "?", "P = 28 ft"),
          x: "7 × 7 = 49, 8 × 6 = 48, 10 × 4 = 40, 13 × 1 = 13: the square 7 by 7.",
        },
        {
          type: "open",
          q: "What do you notice about the dimensions that give the butterflies the largest area?",
          vis: rect("7 ft", "7 ft", "A = 49 sq ft", true),
          // unverified: the Practice Book has no key
          a: "The length and the width are the same (or as close as possible): the shape is a square.",
        },
        ...[
          [15, 1],
          [14, 2],
          [13, 3],
          [12, 4],
          [11, 5],
          [10, 6],
          [9, 7],
          [8, 8],
        ].map(([l, w]) => ({
          type: "num",
          q: `Lonnie has 32 inches of wood for a picture frame. One possible frame is ${l} in. by ${w} in. What is its area?`,
          pre: "A =",
          post: "sq in.",
          a: l * w,
          vis: rect(`${l} in.`, `${w} in.`, "P = 32 in.", l === w),
          x: `${l} + ${w} = 16, half of 32. A = ${l} × ${w} = [${l * w}] square inches.`,
        })),
      ],
    },
  ],
};
