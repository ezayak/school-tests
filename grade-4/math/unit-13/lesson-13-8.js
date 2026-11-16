// Math · Grade 4 · Lesson 13-8 « Solve Problems Using an Area Formula » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1437–k1471), Practice Book p. 147–148.
// No teacher's key. "What are 3 possible…" items are choose-all. Log: grade-4/math/SOURCES.md.
// a rectangle with side labels; cap: a line under it
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
      fill: 2,
    },
  ];
  if (lt) items.push({ t: "text", p: [150, y0 - 6], s: lt });
  if (wt) items.push({ t: "text", p: [x0 + W + 32, y0 + H / 2 + 5], s: wt });
  return { kind: "geo", w: 300, h: 130, items, ...(cap ? { cap } : {}) };
};
// area from length and width
const areaQ = (text, l, w, u, more = {}) => ({
  type: "num",
  q: text || "What is the area?",
  pre: "A =",
  post: `square ${u}`,
  a: l * w,
  vis: rect(`${l} ${u}`, `${w} ${u}`, "", l === w),
  x: `A = l × w = ${l} × ${w} = [${l * w}] square ${u}.`,
  ...more,
});
// a missing side from the area
const sideQ = (text, A, known, u, name = "l", more = {}) => ({
  type: "num",
  q: text || (name === "l" ? "What is the length?" : "What is the width?"),
  pre: `${name} =`,
  post: u,
  a: A / known,
  vis: rect(
    name === "l" ? "?" : `${known} ${u}`,
    name === "l" ? `${known} ${u}` : "?",
    `A = ${A} square ${u}`,
    A / known === known,
  ),
  x: `A = l × w, so ${A} ÷ ${known} = [${A / known}] ${u}.`,
  ...more,
});
const multi = (q, rows, vis, x) => ({
  type: "multi",
  q,
  vis,
  opts: rows.map(([t, ok]) => ({ t, ok, emoji: "▭" })),
  x,
});

window.LESSON = {
  n: "13-8",
  key: "math4-l13-8",
  grade: 4,
  title: "Area Formula",
  en: "A = l × w: find the area or a missing side",
  unit: "Unit 13 · Lesson 13-8",
  book: "e-book Lesson 13-8 · Practice Book p. 147–148",
  imgDir: "img/lesson-13-8",
  cover: "curious",
  question: {
    q: "How is finding the [perimeter] different from finding the [area]?",
    // unverified: a model answer, the book gives none
    a: "Perimeter adds the sides all around (a length). Area multiplies length × width and counts the square units inside (square feet).",
    img: "curious",
  },
  words: [
    { w: "Area (A)", m: "the number of square units that cover a figure" },
    {
      w: "Square unit",
      m: "a square 1 unit on each side: square feet, square meters",
    },
    { w: "Area formula", m: "A = l × w" },
  ],
  ideas: [
    {
      t: "A floor plan",
      ic: "🏠",
      img: "curious",
      lines: [
        "Rooms: 10 × 12, 10 × 5, 4 × 3.",
        "Each room's area is length × width.",
      ],
    },
    {
      t: "Artificial grass",
      ic: "🌱",
      lines: [
        "The play area is [15 ft] by [9 ft].",
        "How many square feet of grass does the principal need?",
      ],
      vis: rect("15 ft", "9 ft"),
    },
    {
      t: "Use a formula",
      ic: "🧮",
      lines: ["A = l × w = 15 × 9 = [135] square feet."],
      vis: { kind: "lines", rows: ["A = l × w", "A = 15 × 9 = 135"] },
    },
    {
      t: "A missing side",
      ic: "❓",
      lines: [
        "A = 36 square feet, w = 4 feet.",
        "36 ÷ 4 = [9]: the length is 9 feet.",
      ],
      vis: rect("?", "4 ft", "A = 36 sq ft"),
    },
  ],

  games: [
    {
      k: "area",
      t: "Find the area",
      en: "A = l × w",
      ic: "🟩",
      items: [
        areaQ("", 8, 6, "cm"),
        areaQ("", 12, 4, "m"),
        areaQ("", 9, 9, "in."),
        areaQ("", 20, 3, "ft"),
        areaQ("", 11, 7, "yd"),
      ],
    },
    {
      k: "side",
      t: "Find the missing side",
      en: "Area ÷ the other side",
      ic: "❓",
      items: [
        sideQ("", 40, 5, "cm"),
        sideQ("", 63, 9, "m", "w"),
        sideQ("", 100, 10, "ft"),
        sideQ("", 56, 8, "in.", "w"),
        sideQ("", 72, 6, "yd"),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-8",
      t: "Be Curious",
      en: "A floor plan",
      ic: "🏠",
      from: "e-book 13-8 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you see?",
          img: "curious",
          // unverified: the book takes any answer
          a: "A floor plan of a house with rooms of 10 × 12, 10 × 5 and 4 × 3. They are rectangles, so I can find the area of each room.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-8",
      t: "Learn and Work Together",
      en: "Grass for a play area",
      ic: "🌱",
      from: "e-book 13-8 · Learn, Work Together",
      keep: true,
      items: [
        areaQ(
          "The play area is 15 feet by 9 feet. How many square feet of grass does the principal need?",
          15,
          9,
          "ft",
        ),
        {
          type: "open",
          q: "How does a representation help you determine the area of the rectangle?",
          vis: rect("15 ft", "9 ft"),
          // unverified: a model answer, the book gives none
          a: "The drawing shows the length and the width, so I can see which numbers to multiply: 15 rows of 9 square feet.",
        },
        sideQ(
          "Work Together: The area is 36 square feet and the width is 4 feet. What is the length of the rectangle?",
          36,
          4,
          "ft",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-8",
      t: "On My Own 1–10",
      en: "Areas and sides",
      ic: "🟩",
      from: "e-book 13-8 · On My Own 1–10",
      keep: true,
      items: [
        areaQ("", 7, 5, "ft"),
        areaQ("", 15, 7, "yd"),
        areaQ("l = 12 meters, w = 6 meters. What is the area?", 12, 6, "m"),
        areaQ("l = 25 km, w = 4 km. What is the area?", 25, 4, "km"),
        areaQ("l = 8 cm, w = 5 cm. What is the area?", 8, 5, "cm"),
        areaQ("l = 22 miles, w = 5 miles. What is the area?", 22, 5, "miles"),
        sideQ("", 44, 4, "miles"),
        sideQ("", 49, 7, "in.", "w"),
        sideQ(
          "A rectangular garden has a width of 9 feet and an area of 144 square feet. What is the length?",
          144,
          9,
          "ft",
        ),
        areaQ(
          "A square piece of cardboard has a side length of 18 inches. What is its area?",
          18,
          18,
          "in.",
        ),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · Lesson 13-8",
      t: "On My Own 11–15",
      en: "A park, a blanket, Marcus",
      ic: "🧺",
      from: "e-book 13-8 · On My Own 11–15",
      keep: true,
      items: [
        multi(
          "A rectangular park has an area of 60 square miles. Which are possible length and width combinations? Choose all.",
          [
            ["10 miles by 6 miles", true],
            ["12 miles by 5 miles", true],
            ["15 miles by 4 miles", true],
            ["30 miles by 30 miles", false],
            ["50 miles by 10 miles", false],
          ],
          rect("?", "?", "A = 60 sq mi"),
          // unverified: the book takes any three right pairs
          "l × w must be 60: 10 × 6, 12 × 5, 15 × 4 (also 20 × 3, 30 × 2, 60 × 1). 30 × 30 = 900, 50 × 10 = 500.",
        ),
        {
          type: "num",
          q: "The blanket is 60 inches long. Its width is half the length. What is the area of the blanket?",
          pre: "A =",
          post: "square in.",
          a: 1800,
          img: "blanket",
          x: "Width: 60 ÷ 2 = 30 inches. A = 60 × 30 = [1800] square inches.",
        },
        {
          type: "tf",
          q: "Error Analysis: The side lengths of a square are 6 units. Marcus says the area is 24 square units. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: rect("6 units", "6 units", "", true),
          x: "6 + 6 + 6 + 6 = 24 is the perimeter. The area is 6 × 6 = 36 square units.",
        },
        sideQ(
          "The area of a rectangular parking lot is 2,500 square feet. The length is 100 feet. What is the width?",
          2500,
          100,
          "ft",
          "w",
        ),
        multi(
          "Extend: The perimeter of a rectangle is 24 feet. What could be the area? Choose all.",
          [
            ["35 square feet (7 by 5)", true],
            ["32 square feet (8 by 4)", true],
            ["20 square feet (10 by 2)", true],
            ["24 square feet (24 by 1)", false],
          ],
          rect("?", "?", "P = 24 ft"),
          // unverified: the book takes any three right areas
          "Length + width = 12: 7 × 5 = 35, 8 × 4 = 32, 10 × 2 = 20, 6 × 6 = 36 … 24 by 1 has a perimeter of 50.",
        ),
        {
          type: "open",
          q: "Reflect: How is finding the perimeter different from finding the area?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "For the perimeter I add the sides around the rectangle (feet). For the area I multiply length × width to count the squares inside (square feet).",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 147–148",
      t: "Additional Practice 1–10",
      en: "Lesson 13-8",
      ic: "📘",
      from: "Practice Book p. 147–148",
      keep: true,
      items: [
        areaQ("What is the missing value? Use the area formula.", 8, 4, "ft"),
        areaQ("What is the missing value? Use the area formula.", 6, 8, "ft"),
        areaQ("l = 15, w = 7. What is A?", 15, 7, "units"),
        areaQ("l = 21, w = 8. What is A?", 21, 8, "units"),
        sideQ(
          "A = 45 square feet, l = 9 feet. What is the width?",
          45,
          9,
          "ft",
          "w",
        ),
        sideQ(
          "A = 30 square feet, l = 6 feet. What is the width?",
          30,
          6,
          "ft",
          "w",
        ),
        areaQ(
          "A puzzle has a length of 18 inches and a width of 24 inches. What is its area?",
          18,
          24,
          "in.",
        ),
        multi(
          "Caleb's patio has an area of 180 square feet. Which are possible length and width combinations? Choose all.",
          [
            ["18 feet by 10 feet", true],
            ["20 feet by 9 feet", true],
            ["15 feet by 12 feet", true],
            ["90 feet by 90 feet", false],
            ["100 feet by 80 feet", false],
          ],
          rect("?", "?", "A = 180 sq ft"),
          // unverified: the book takes any three right pairs
          "l × w must be 180: 18 × 10, 20 × 9, 15 × 12 (also 30 × 6, 36 × 5 …).",
        ),
        sideQ(
          "A soccer goal has a width of 7 feet and an area of 147 square feet. What is the length?",
          147,
          7,
          "ft",
        ),
        multi(
          "The perimeter of Jesse's garden is 36 feet. What could its area be? Choose all.",
          [
            ["81 square feet (9 by 9)", true],
            ["80 square feet (10 by 8)", true],
            ["65 square feet (13 by 5)", true],
            ["36 square feet (36 by 1)", false],
          ],
          rect("?", "?", "P = 36 ft"),
          // unverified: the book takes any right area
          "Length + width = 18: 9 × 9 = 81, 10 × 8 = 80, 13 × 5 = 65. 36 by 1 has a perimeter of 74.",
        ),
      ],
    },
  ],
};
