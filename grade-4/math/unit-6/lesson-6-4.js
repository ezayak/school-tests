// Math · Grade 4 · Lesson 6-4 « Multiply 2-Digit by 1-Digit Factors » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 177–180, Student Practice Book p. 53–54. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Partial products with an area model come from shared/math-kit.js (distrib: tens and ones, each part worked out).
const { distrib } = MathKit;
// a × b with b broken into tens + ones
const tensOnes = (a, b, q) =>
  distrib(
    a,
    b,
    b - (b % 10),
    q || `${a} × ${b} = ${a} × (${b - (b % 10)} + ${b % 10}).`,
  );

window.LESSON = {
  n: "6-4",
  key: "math4-l6-4",
  grade: 4,
  title: "2-Digit × 1-Digit",
  en: "Break the 2-digit factor into tens and ones, find the partial products with an area model, add them",
  unit: "Unit 6 · Lesson 6-4",
  book: "Book p. 177–180 · Practice Book p. 53–54",
  imgDir: "img/lesson-6-4",
  cover: "curious",
  question: {
    q: "How can I use [partial products] to multiply a 2-digit number by a 1-digit number?",
    a: "Break the 2-digit number into tens and ones: 8 × 24 = 8 × 20 + 8 × 4 = 160 + 32 = [192]. An [area model] shows the two parts.",
    img: "lawn",
  },
  words: [
    {
      w: "Area model",
      m: "a rectangle cut into parts, one partial product in each part",
    },
    { w: "Partial product", m: "the product of one part: 8 × 20 = 160" },
    { w: "Decompose", m: "break a number into parts: 24 = 20 + 4" },
    {
      w: "Area",
      m: "the space inside a shape: length × width, in square units",
    },
  ],
  ideas: [
    {
      t: "What math do you see?",
      ic: "🏠",
      img: "curious",
      lines: [
        "Cabinets and tiles in [rows and columns].",
        "Rows × columns: [multiplication].",
        "The floor is a big rectangle: its [area] is length × width.",
      ],
    },
    {
      t: "Zoe's lawn",
      ic: "🌱",
      img: "lawn",
      lines: [
        "The lawn is 8 yards by [24] yards.",
        "Area = 8 × 24.",
        "Break 24 into 20 + 4.",
      ],
    },
    {
      t: "The area model",
      ic: "🟦",
      lines: [
        "8 × 20 = [160]. 8 × 4 = [32].",
        "These are the partial products.",
        "160 + 32 = [192] square yards.",
      ],
      vis: { kind: "area", rows: [8], cols: [20, 4], cells: [160, 32] },
    },
    {
      t: "Tens first, then ones",
      ic: "🔟",
      lines: [
        "6 × 52: 6 × 50 = 300, 6 × 2 = 12.",
        "300 + 12 = [312].",
        "Multiply the [tens] (with the zero), then the ones, then add.",
      ],
      vis: { kind: "area", rows: [6], cols: [50, 2], cells: [300, 12] },
    },
  ],

  games: [
    {
      k: "parts",
      t: "Area model",
      en: "Tens and ones",
      ic: "🟦",
      keep: true,
      items: [...tensOnes(3, 47), ...tensOnes(7, 26), ...tensOnes(5, 68)],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 177–180",
      t: "Be Curious",
      en: "A kitchen",
      ic: "🏠",
      from: "Book p. 177 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What math do you see?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Cabinets, drawers and tiles in rows and columns (multiplication). The floor and the walls are rectangles: their area is length × width.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 177–180",
      t: "Learn: Zoe's lawn",
      en: "8 × 24",
      ic: "🌱",
      from: "Book p. 178 · Learn",
      keep: true,
      items: tensOnes(
        8,
        24,
        "Zoe's lawn is 8 yards by 24 yards. 8 × 24 = 8 × (20 + 4).",
      ),
    },
    {
      k: "together",
      g: "📗 Book · p. 177–180",
      t: "Work Together",
      en: "Toby's fence",
      ic: "🤝",
      from: "Book p. 178 · Work Together",
      keep: true,
      items: tensOnes(
        6,
        52,
        "Toby's fence is 6 feet high and 52 feet long. 6 × 52 = 6 × (50 + 2).",
      ),
    },
    {
      k: "own1",
      g: "📗 Book · p. 177–180",
      t: "On My Own 1–4",
      en: "Decompose and solve",
      ic: "✂️",
      from: "Book p. 179 · On My Own 1–4",
      keep: true,
      items: [
        ...tensOnes(6, 82),
        ...tensOnes(8, 91, "91 × 8 = 8 × (90 + 1)."),
        ...tensOnes(3, 76, "76 × 3 = 3 × (70 + 6)."),
        ...tensOnes(7, 45),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 177–180",
      t: "On My Own 5–8",
      en: "Complete the area model",
      ic: "🟦",
      from: "Book p. 179 · On My Own 5–8",
      keep: true,
      items: [
        ...tensOnes(7, 52),
        ...tensOnes(4, 96),
        ...tensOnes(5, 47),
        ...tensOnes(3, 29),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 177–180",
      t: "On My Own 9–11",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 180 · On My Own 9–11",
      keep: true,
      items: [
        ...tensOnes(
          8,
          84,
          "Maya searched a streambed 8 meters wide and 84 meters long. Area = 8 × (80 + 4).",
        ),
        ...tensOnes(
          6,
          53,
          "6 stone blocks weigh 53 kilograms each. 6 × 53 = 6 × (50 + 3).",
        ),
        ...distrib(
          9,
          112,
          100,
          "Marco's curtain is 9 feet high and 112 feet wide. 9 × 112 = 9 × (100 + 12).",
        ),
        {
          type: "open",
          q: "Reflect: How can you use partial products to multiply 2-digit by 1-digit factors?",
          vis: { kind: "area", rows: [8], cols: [20, 4], cells: [160, 32] },
          // unverified: a model answer, the book gives none
          a: "Break the 2-digit factor into tens and ones. Multiply each part by the 1-digit factor (8 × 20 = 160, 8 × 4 = 32), then add the partial products (160 + 32 = 192).",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 53–54",
      t: "Additional Practice 1–6",
      en: "Lesson 6-4",
      ic: "📘",
      from: "Practice Book p. 53–54",
      keep: true,
      items: [
        ...tensOnes(6, 18),
        ...tensOnes(5, 26),
        ...tensOnes(8, 19),
        ...tensOnes(4, 36),
        ...tensOnes(
          7,
          14,
          "Walker's phone screen is 7 cm by 14 cm. Area = 7 × (10 + 4).",
        ),
        ...tensOnes(
          8,
          29,
          "Lloyd's patio is 8 feet by 29 feet. Area = 8 × (20 + 9).",
        ),
      ],
    },
  ],
};
