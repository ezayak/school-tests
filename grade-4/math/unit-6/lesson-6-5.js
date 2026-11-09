// Math · Grade 4 · Lesson 6-5 « Multiply Multi-Digit by 1-Digit Factors » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 181–184, Student Practice Book p. 55–56. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Area models and partial products come from shared/math-kit.js (areaQ: one question per part, then the sum).
const { parts, areaQ } = MathKit;
// n × k with n broken by place value
const byPlace = (k, n, intro) => areaQ([k], parts(n), intro);

window.LESSON = {
  n: "6-5",
  key: "math4-l6-5",
  grade: 4,
  title: "Big Number × 1-Digit",
  en: "Break a 3- or 4-digit number by place value, multiply each part, add the partial products",
  unit: "Unit 6 · Lesson 6-5",
  book: "Book p. 181–184 · Practice Book p. 55–56",
  imgDir: "img/lesson-6-5",
  cover: "curious",
  question: {
    q: "How can an [area model] help me multiply a big number by a 1-digit number?",
    a: "Break the big number by place value: 7 × 125 = 7 × 100 + 7 × 20 + 7 × 5 = 700 + 140 + 35 = [875].",
    img: "curious",
  },
  words: [
    {
      w: "Area model",
      m: "a rectangle cut into parts, one partial product in each part",
    },
    { w: "Partial product", m: "the product of one part: 7 × 100 = 700" },
    { w: "Place value", m: "hundreds, tens, ones: 125 = 100 + 20 + 5" },
    { w: "Product", m: "the answer of a multiplication" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🧻",
      img: "curious",
      lines: [
        "6 boxes of tissues, [165] in each box.",
        "How many tissues in all? 6 × 165.",
        "165 = 100 + 60 + 5: three parts to multiply.",
      ],
    },
    {
      t: "Three parts",
      ic: "🟦",
      lines: [
        "7 × 125: 125 = 100 + 20 + 5.",
        "7 × 100 = [700], 7 × 20 = [140], 7 × 5 = [35].",
        "700 + 140 + 35 = [875] points.",
      ],
      vis: {
        kind: "area",
        rows: [7],
        cols: [100, 20, 5],
        cells: [700, 140, 35],
      },
    },
    {
      t: "Four parts",
      ic: "4️⃣",
      lines: [
        "3 × 4,732: 4,732 = 4,000 + 700 + 30 + 2.",
        "12,000 + 2,100 + 90 + 6 = [14,196].",
        "One part for each [place].",
      ],
      vis: {
        kind: "area",
        rows: [3],
        cols: [4000, 700, 30, 2],
        cells: [12000, 2100, 90, 6],
      },
    },
    {
      t: "Multiply each part",
      ic: "⚠️",
      lines: [
        "Karen wrote 7 × 632 = 7 + (600 × 30 × 2): [wrong]!",
        "Multiply 7 by [each] part, then add:",
        "(7 × 600) + (7 × 30) + (7 × 2) = 4,200 + 210 + 14 = [4,424].",
      ],
      vis: {
        kind: "area",
        rows: [7],
        cols: [600, 30, 2],
        cells: [4200, 210, 14],
      },
    },
  ],

  games: [
    {
      k: "parts",
      t: "Area model",
      en: "Part by part",
      ic: "🟦",
      keep: true,
      items: [...byPlace(4, 236), ...byPlace(6, 1203)],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 181–184",
      t: "Be Curious",
      en: "Tissue boxes",
      ic: "🧻",
      from: "Book p. 181 · Be Curious",
      keep: true,
      items: [
        ...byPlace(
          6,
          165,
          "6 boxes of 165 tissues. How many tissues? 6 × 165.",
        ),
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "There are 6 boxes and each has 165 tissues. I wonder how many tissues there are in all: 6 × 165 = 990.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 181–184",
      t: "Learn: Solange's points",
      en: "7 × 125",
      ic: "🎮",
      from: "Book p. 182 · Learn",
      keep: true,
      items: byPlace(
        7,
        125,
        "7 levels, 125 points at each level. t = 7 × 125.",
      ),
    },
    {
      k: "together",
      g: "📗 Book · p. 181–184",
      t: "Work Together",
      en: "3 × 4,732",
      ic: "🤝",
      from: "Book p. 182 · Work Together",
      keep: true,
      items: byPlace(3, 4732, "3 levels, 4,732 points at each level."),
    },
    {
      k: "own1",
      g: "📗 Book · p. 181–184",
      t: "On My Own 1–4",
      en: "Area model and partial products",
      ic: "🟦",
      from: "Book p. 183 · On My Own 1–4",
      keep: true,
      items: [
        ...byPlace(2, 214, "214 × 2."),
        ...byPlace(4, 523, "523 × 4."),
        ...byPlace(3, 6232, "6,232 × 3."),
        ...byPlace(5, 3317, "3,317 × 5."),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 181–184",
      t: "On My Own 5–10",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 183–184 · On My Own 5–10",
      keep: true,
      items: [
        ...byPlace(3, 689, "Maya has 3 sets of 689 geodes."),
        ...byPlace(9, 372, "Molly earns $372 each week, for 9 weeks."),
        ...byPlace(5, 895, "895 people visit the museum each day, for 5 days."),
        {
          type: "tf",
          q: "Karen writes 7 × 632 = 7 + (600 × 30 × 2). Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: {
            kind: "area",
            rows: [7],
            cols: [600, 30, 2],
            cells: ["", "", ""],
          },
          x: "Multiply 7 by each part and add: (7 × 600) + (7 × 30) + (7 × 2) = 4,200 + 210 + 14 = [4,424].",
        },
        ...areaQ(
          [60, 5],
          [200, 30, 4],
          "234 × 65: break 65 into 60 + 5 and 234 into 200 + 30 + 4.",
        ),
        {
          type: "open",
          q: "Write a word problem for w = 3 × 415. Then solve it with partial products.",
          vis: {
            kind: "area",
            rows: [3],
            cols: [400, 10, 5],
            cells: [1200, 30, 15],
          },
          // unverified: a model answer; any problem is right
          a: "A farm has 3 fields with 415 apple trees in each. How many trees? 3 × 400 + 3 × 10 + 3 × 5 = 1,200 + 30 + 15 = 1,245 trees.",
        },
        {
          type: "open",
          q: "Reflect: How did area models help you find products of multi-digit and 1-digit factors?",
          vis: {
            kind: "area",
            rows: [7],
            cols: [100, 20, 5],
            cells: [700, 140, 35],
          },
          // unverified: a model answer, the book gives none
          a: "The area model shows one part for each place value. I multiply each part, write the partial product in it, then add the parts.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 55–56",
      t: "Additional Practice 1–5",
      en: "Lesson 6-5",
      ic: "📘",
      from: "Practice Book p. 55–56",
      keep: true,
      items: [
        ...byPlace(4, 518, "518 × 4 = (500 + 10 + 8) × 4."),
        ...byPlace(5, 687, "687 × 5 = (600 + 80 + 7) × 5."),
        ...byPlace(3, 7542, "7,542 × 3 = (7,000 + 500 + 40 + 2) × 3."),
        ...byPlace(4, 978, "Vanita hands out 978 pamphlets a day for 4 days."),
        ...byPlace(
          5,
          4325,
          "4,325 people attend a play each week, for 5 weeks.",
        ),
      ],
    },
  ],
};
