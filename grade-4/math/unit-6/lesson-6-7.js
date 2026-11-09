// Math · Grade 4 · Lesson 6-7 « Multiply Two 2-Digit Factors » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 189–192, Student Practice Book p. 59–60. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Area models with 2 rows and 2 columns come from shared/math-kit.js (areaQ: each partial product, then the sum).
const { parts, areaQ } = MathKit;
// a × b with both factors broken by place value
const twoByTwo = (a, b, intro) => areaQ(parts(a), parts(b), intro);
const factorsMC = (q, right, wrong, x, vis) => ({
  type: "mc",
  q,
  opts: [right, ...wrong],
  vis,
  x,
});

window.LESSON = {
  n: "6-7",
  key: "math4-l6-7",
  grade: 4,
  title: "2-Digit × 2-Digit",
  en: "Break both factors into tens and ones: an area model with 4 parts, then add the partial products",
  unit: "Unit 6 · Lesson 6-7",
  book: "Book p. 189–192 · Practice Book p. 59–60",
  imgDir: "img/lesson-6-7",
  cover: "curious",
  question: {
    q: "How can an area model help me multiply [two 2-digit] numbers?",
    a: "Break both factors: 16 × 23 = (10 + 6) × (20 + 3). Four parts: 200 + 30 + 120 + 18 = [368].",
    img: "curious",
  },
  words: [
    {
      w: "Area model",
      m: "a rectangle cut into parts: 2 rows and 2 columns for two 2-digit factors",
    },
    { w: "Partial product", m: "the product of one part: 10 × 20 = 200" },
    { w: "Decompose", m: "break a number into parts: 16 = 10 + 6" },
    { w: "Square feet", m: "the unit of area when the sides are in feet" },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🟧",
      img: "curious",
      lines: [
        "Two rectangles, both [16 ft by 48 ft]: the same area.",
        "They are cut into parts in [different] ways.",
        "Any way you cut it, the parts add up to the same area.",
      ],
    },
    {
      t: "Paul's carpet",
      ic: "🟦",
      lines: [
        "The room is 16 feet by 23 feet: 16 × 23.",
        "16 = 10 + 6 (two rows), 23 = 20 + 3 (two columns).",
        "Four parts: 10 × 20, 10 × 3, 6 × 20, 6 × 3.",
      ],
      vis: {
        kind: "area",
        rows: [10, 6],
        cols: [20, 3],
        cells: ["", "", "", ""],
      },
    },
    {
      t: "Add the partial products",
      ic: "➕",
      lines: [
        "200 + 30 + 120 + 18 = [368].",
        "The room needs 368 square feet of carpet.",
        "Every part of one factor meets every part of the other.",
      ],
      vis: {
        kind: "area",
        rows: [10, 6],
        cols: [20, 3],
        cells: [200, 30, 120, 18],
      },
    },
    {
      t: "Don't multiply the wrong parts",
      ic: "⚠️",
      lines: [
        "27 × 83: 27 = 20 + 7 and 83 = 80 + 3.",
        "Kim mixed the parts of the two numbers: [wrong].",
        "(20 × 80) + (20 × 3) + (7 × 80) + (7 × 3) = [2,241].",
      ],
      vis: {
        kind: "area",
        rows: [20, 7],
        cols: [80, 3],
        cells: [1600, 60, 560, 21],
      },
    },
  ],

  games: [
    {
      k: "parts",
      t: "Four parts",
      en: "Area model",
      ic: "🟦",
      keep: true,
      items: [...twoByTwo(14, 23), ...twoByTwo(32, 15)],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 189–192",
      t: "Be Curious",
      en: "Two rectangles",
      ic: "🟧",
      from: "Book p. 189 · Be Curious",
      keep: true,
      items: [
        ...areaQ(
          [10, 6],
          [40, 8],
          "Both rectangles are 16 ft by 48 ft. What is their area? 16 × 48 = (10 + 6) × (40 + 8).",
        ),
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson; the book does not label the parts
          a: "Both are 16 ft by 48 ft, so they have the same area, 768 square feet. They are cut into parts in different ways, but the parts add up to the same area.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 189–192",
      t: "Learn: Paul's carpet",
      en: "16 × 23",
      ic: "🟦",
      from: "Book p. 190 · Learn",
      keep: true,
      items: twoByTwo(
        16,
        23,
        "The room is 16 feet by 23 feet. c = 16 × 23 = (10 + 6) × (20 + 3).",
      ),
    },
    {
      k: "together",
      g: "📗 Book · p. 189–192",
      t: "Work Together",
      en: "15 buses of 66 students",
      ic: "🤝",
      from: "Book p. 190 · Work Together",
      keep: true,
      items: twoByTwo(15, 66, "15 buses, 66 students on each: 15 × 66."),
    },
    {
      k: "own1",
      g: "📗 Book · p. 189–192",
      t: "On My Own 1–5",
      en: "Partial products",
      ic: "✖️",
      from: "Book p. 191 · On My Own 1–5",
      keep: true,
      items: [
        ...twoByTwo(98, 20, "98 × 20."),
        ...twoByTwo(42, 38, "42 × 38."),
        factorsMC(
          "___ × ___ = (70 × 50) + (70 × 7) + (4 × 50) + (4 × 7). Which two factors?",
          "74 × 57",
          ["70 × 50", "77 × 54", "75 × 74"],
          "70 + 4 = 74 and 50 + 7 = 57: [74 × 57].",
          {
            kind: "area",
            rows: [70, 4],
            cols: [50, 7],
            cells: ["", "", "", ""],
          },
        ),
        ...twoByTwo(27, 45, "27 fish tanks hold 45 fish each: 27 × 45."),
        ...twoByTwo(13, 17, "Maya has 13 packs of 17 crystals: 13 × 17."),
      ],
    },
    {
      k: "own6",
      g: "📗 Book · p. 189–192",
      t: "On My Own 6–9",
      en: "Think it through",
      ic: "🧠",
      from: "Book p. 192 · On My Own 6–9",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Kim writes 27 × 83 = (20 + 80) × (20 + 3) × (7 + 80) × (7 + 3). Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: {
            kind: "area",
            rows: [20, 7],
            cols: [80, 3],
            cells: ["", "", "", ""],
          },
          x: "Break 27 = 20 + 7 and 83 = 80 + 3, multiply each part by each part and [add]: (20 × 80) + (20 × 3) + (7 × 80) + (7 × 3).",
        },
        ...twoByTwo(27, 83, "27 × 83 the right way:"),
        factorsMC(
          "Tyrone uses (60 × 50) + (60 × 9) + (4 × 50) + (4 × 9). Which two factors is he multiplying?",
          "64 × 59",
          ["60 × 50", "69 × 54", "60 × 9"],
          "60 + 4 = 64 and 50 + 9 = 59: [64 × 59].",
          {
            kind: "area",
            rows: [60, 4],
            cols: [50, 9],
            cells: ["", "", "", ""],
          },
        ),
        ...areaQ(
          [40, 2],
          [500, 90, 3],
          "593 × 42: break 42 into 40 + 2 and 593 into 500 + 90 + 3.",
        ),
        ...twoByTwo(
          65,
          45,
          "45 entrants at the local meet, 65 times as many at the state meet: 65 × 45.",
        ),
        {
          type: "open",
          q: "Reflect: How did area models help you find products of two 2-digit factors?",
          vis: {
            kind: "area",
            rows: [10, 6],
            cols: [20, 3],
            cells: [200, 30, 120, 18],
          },
          // unverified: a model answer, the book gives none
          a: "The area model has a row for each part of one factor and a column for each part of the other. I find the 4 partial products and add them, so I don't forget a part.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 59–60",
      t: "Additional Practice 1",
      en: "Solve with area models",
      ic: "📘",
      from: "Practice Book p. 59–60",
      keep: true,
      items: [
        ...twoByTwo(12, 18, "12 × 18."),
        ...twoByTwo(24, 13, "24 × 13."),
        ...twoByTwo(17, 71, "17 × 71."),
        ...twoByTwo(64, 51, "64 × 51."),
        ...twoByTwo(87, 64, "87 × 64."),
        ...twoByTwo(95, 44, "95 × 44."),
      ],
    },
    {
      k: "pb2",
      g: "📘 Practice Book · p. 59–60",
      t: "Additional Practice 2–5",
      en: "Area models and problems",
      ic: "📘",
      from: "Practice Book p. 60",
      keep: true,
      items: [
        ...areaQ(
          [30, 7],
          [70, 9],
          "Write the partial products in the area model: (30 + 7) × (70 + 9).",
        ),
        ...twoByTwo(45, 65, "45 bookshelves with 65 books each: 45 × 65."),
        ...twoByTwo(91, 26, "91 cartons of 26 strawberries: 91 × 26."),
        {
          type: "tf",
          q: "Haywood collects 85 signatures a day. He says he has 1,250 signatures after 15 days. Is he right?",
          a: false,
          yes: ["Yes, he is", "No, he is not"],
          vis: {
            kind: "area",
            rows: [10, 5],
            cols: [80, 5],
            cells: [800, 50, 400, 25],
          },
          x: "85 × 15 = 800 + 50 + 400 + 25 = [1,275], not 1,250.",
        },
      ],
    },
  ],
};
