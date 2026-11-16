// Math · Grade 4 · Lesson 14-1 « Understand Lines, Line Segments, and Rays » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 45:20–46:00),
// book p. 215–218 (the teacher's key Term 1/20261008-L_14-1.pdf shows On My Own on p. 217–218 and Practice Book p. 155–156 with the answers).
// Checked against the key. Drawing tasks (On My Own 7–9, 11, Practice Book 1–3, 8) are left out. Log: grade-4/math/SOURCES.md.
const NAMES = ["Point", "Line", "Line segment", "Ray"];
const nameQ = (q, right, vis, x, letters = "") => ({
  type: "mc",
  q,
  opts: [
    `${right}${letters ? " " + letters : ""}`,
    ...NAMES.filter((n) => n !== right).map(
      (n) => `${n}${letters ? " " + letters : ""}`,
    ),
  ],
  keep: NAMES.map((n) => `${n}${letters ? " " + letters : ""}`),
  vis,
  x,
});
const G = (items, w = 300, h = 120) => ({ kind: "geo", w, h, items });

window.LESSON = {
  n: "14-1",
  key: "math4-l14-1",
  grade: 4,
  title: "Lines, Segments and Rays",
  en: "Points, lines, line segments and rays",
  unit: "Unit 14 · Lesson 14-1",
  book: "Book p. 215–218 · Practice Book p. 155–156",
  imgDir: "img/lesson-14-1",
  cover: "curious",
  question: {
    q: "How can I tell a [line], a [line segment] and a [ray] apart?",
    a: "Look at the ends: a line has arrows at both ends (it goes on forever), a line segment has two endpoints, a ray has one endpoint and one arrow.",
    img: "curious",
  },
  words: [
    { w: "Point", m: "a location in space, named with a letter: point A" },
    { w: "Line", m: "goes on forever in both directions: line AB" },
    {
      w: "Line segment",
      m: "a part of a line with two endpoints: line segment EF",
    },
    { w: "Ray", m: "one endpoint, goes on forever in one direction: ray LK" },
    { w: "Endpoint", m: "a point where a segment or a ray stops" },
  ],
  ideas: [
    {
      t: "Which doesn't belong?",
      ic: "📍",
      img: "curious",
      lines: [
        "Figure 1 is a point, Figure 2 a line, Figure 3 a line segment, Figure 4 a ray.",
        "Only the point has [no length].",
      ],
    },
    {
      t: "A point",
      ic: "📍",
      lines: ["A point is a [location]. We name it with a letter: point A."],
      vis: G([{ t: "pt", p: [150, 60], l: "A" }]),
    },
    {
      t: "A line",
      ic: "↔️",
      lines: [
        "A line goes on forever in [both] directions: arrows at both ends.",
        "Line AB.",
      ],
      vis: G([
        { t: "line", a: [20, 60], b: [280, 60] },
        { t: "pt", p: [90, 60], l: "A" },
        { t: "pt", p: [210, 60], l: "B" },
      ]),
    },
    {
      t: "A line segment",
      ic: "📏",
      lines: [
        "A line segment is a part of a line with [two endpoints].",
        "Line segment EF.",
      ],
      vis: G([
        { t: "seg", a: [60, 60], b: [240, 60] },
        { t: "pt", p: [60, 60], l: "E" },
        { t: "pt", p: [240, 60], l: "F" },
      ]),
    },
    {
      t: "A ray",
      ic: "➡️",
      lines: [
        "A ray has [one endpoint] and goes on forever in one direction.",
        "Ray LK starts at L.",
      ],
      vis: G([
        { t: "ray", a: [40, 60], b: [280, 60] },
        { t: "pt", p: [40, 60], l: "L" },
        { t: "pt", p: [190, 60], l: "K" },
      ]),
    },
  ],

  games: [
    {
      k: "name",
      t: "Name the figure",
      en: "Line, segment or ray?",
      ic: "📏",
      items: [
        nameQ(
          "What is this figure?",
          "Ray",
          G([
            { t: "ray", a: [40, 90], b: [270, 20] },
            { t: "pt", p: [40, 90], l: "P" },
          ]),
          "One endpoint and one arrow: a ray.",
        ),
        nameQ(
          "What is this figure?",
          "Line segment",
          G([
            { t: "seg", a: [40, 30], b: [260, 90] },
            { t: "pt", p: [40, 30], l: "M" },
            { t: "pt", p: [260, 90], l: "N" },
          ]),
          "Two endpoints: a line segment.",
        ),
        nameQ(
          "What is this figure?",
          "Line",
          G([
            { t: "line", a: [20, 100], b: [280, 20] },
            { t: "pt", p: [100, 75], l: "R" },
            { t: "pt", p: [200, 45], l: "S" },
          ]),
          "Arrows at both ends: a line.",
        ),
        nameQ(
          "What is this figure?",
          "Point",
          G([{ t: "pt", p: [150, 60], l: "Z" }]),
          "Only a location: a point.",
        ),
        nameQ(
          "What is this figure?",
          "Ray",
          G([
            { t: "ray", a: [260, 60], b: [20, 60] },
            { t: "pt", p: [260, 60], l: "T" },
          ]),
          "One endpoint at T, an arrow at the other end: a ray.",
        ),
        nameQ(
          "What is this figure?",
          "Line segment",
          G([
            { t: "seg", a: [150, 10], b: [150, 110] },
            { t: "pt", p: [150, 10], l: "G", lp: "e" },
            { t: "pt", p: [150, 110], l: "H", lp: "e" },
          ]),
          "Two endpoints: a line segment.",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 215–218",
      t: "Be Curious",
      en: "Which doesn't belong?",
      ic: "📍",
      from: "Book p. 215 · Be Curious",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Which figure doesn't belong?",
          opts: [
            "Figure 1 (a point)",
            "Figure 2 (a line)",
            "Figure 3 (a line segment)",
            "Figure 4 (a ray)",
          ],
          keep: [
            "Figure 1 (a point)",
            "Figure 2 (a line)",
            "Figure 3 (a line segment)",
            "Figure 4 (a ray)",
          ],
          img: "curious",
          // unverified: any answer with a reason is right
          x: "Figure 1 is only a point: the others have length. (Other reasons work too: Figure 3 has no arrow, Figure 2 has two arrows.)",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 215–218",
      t: "Learn: Stacey's figures",
      en: "Properties",
      ic: "✏️",
      from: "Book p. 216 · Learn",
      keep: true,
      items: [
        nameQ(
          "Which figure goes on forever in both directions?",
          "Line",
          G([
            { t: "line", a: [20, 60], b: [280, 60] },
            { t: "pt", p: [90, 60], l: "A" },
            { t: "pt", p: [210, 60], l: "B" },
          ]),
          "Arrows at both ends: line AB.",
        ),
        nameQ(
          "Which figure has two endpoints?",
          "Line segment",
          G([
            { t: "seg", a: [60, 60], b: [240, 60] },
            { t: "pt", p: [60, 60], l: "E" },
            { t: "pt", p: [240, 60], l: "F" },
          ]),
          "Line segment EF.",
        ),
        nameQ(
          "Which figure has one endpoint and goes on forever in one direction?",
          "Ray",
          G([
            { t: "ray", a: [40, 60], b: [280, 60] },
            { t: "pt", p: [40, 60], l: "L" },
            { t: "pt", p: [190, 60], l: "K" },
          ]),
          "Ray LK.",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 215–218",
      t: "On My Own 1–6",
      en: "Name the figure",
      ic: "📏",
      from: "Book p. 217 · On My Own 1–6",
      keep: true,
      items: [
        nameQ(
          "Which name best describes the figure?",
          "Ray",
          G([
            { t: "ray", a: [230, 100], b: [50, 10] },
            { t: "pt", p: [230, 100], l: "E", lp: "e" },
            { t: "pt", p: [80, 25], l: "F" },
          ]),
          "Endpoint E and an arrow past F: ray EF.",
          "EF",
        ),
        nameQ(
          "Which name best describes the figure?",
          "Line",
          G([
            { t: "line", a: [60, 110], b: [240, 10] },
            { t: "pt", p: [110, 82], l: "K", lp: "e" },
            { t: "pt", p: [200, 32], l: "L", lp: "e" },
          ]),
          "Arrows at both ends: line KL.",
          "KL",
        ),
        nameQ(
          "Which name best describes the figure?",
          "Line segment",
          G([
            { t: "seg", a: [60, 15], b: [240, 105] },
            { t: "pt", p: [60, 15], l: "C" },
            { t: "pt", p: [240, 105], l: "D", lp: "e" },
          ]),
          "Two endpoints C and D: line segment CD.",
          "CD",
        ),
        nameQ(
          "Which name best describes the part of the figure containing points A and B?",
          "Line",
          G([
            { t: "line", a: [20, 60], b: [280, 60] },
            { t: "line", a: [150, 0], b: [150, 120] },
            { t: "pt", p: [60, 60], l: "A" },
            { t: "pt", p: [230, 60], l: "B" },
            { t: "pt", p: [150, 20], l: "C", lp: "e" },
            { t: "pt", p: [150, 100], l: "D", lp: "e" },
            { t: "right", v: [150, 60], a: [20, 60], b: [150, 0] },
          ]),
          "A and B are on the part with arrows at both ends: a line.",
          "AB",
        ),
        nameQ(
          "Which name best describes the part of the figure containing points C and F?",
          "Ray",
          G([
            { t: "line", a: [10, 70], b: [290, 70] },
            { t: "ray", a: [130, 70], b: [230, 0] },
            { t: "seg", a: [130, 70], b: [210, 120] },
            { t: "pt", p: [130, 70], l: "F", lp: "s" },
            { t: "pt", p: [200, 21], l: "C", lp: "e" },
          ]),
          "It starts at F and has an arrow past C: a ray.",
          "FC",
        ),
        nameQ(
          "Which name best describes the part of the figure containing points G and J?",
          "Line segment",
          G([
            { t: "line", a: [10, 60], b: [290, 60] },
            { t: "seg", a: [120, 10], b: [200, 110] },
            { t: "pt", p: [120, 10], l: "G", lp: "w" },
            { t: "pt", p: [160, 60], l: "J", lp: "se" },
          ]),
          "From G to J there are two endpoints: a line segment.",
          "GJ",
        ),
      ],
    },
    {
      k: "own10",
      g: "📗 Book · p. 215–218",
      t: "On My Own 10–12, Reflect",
      en: "Marsha, a box, Reflect",
      ic: "📦",
      from: "Book p. 218 · On My Own 10–12, Reflect",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Error Analysis: Marsha says the edge of a desk is an example of a line. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          emoji: "🪑",
          x: "A line goes on forever. The edge of a desk has two endpoints: it is a line segment.",
        },
        {
          type: "num",
          q: "Extend: how many line segments (edges) does the box shape have?",
          a: 12,
          post: "segments",
          emoji: "📦",
          x: "AB, BD, AC, CD, AE, CG, EG, GH, DH, FH, EF, BF: [12] line segments.",
        },
        {
          type: "open",
          q: "Reflect: How did you think like a mathematician when analyzing properties of points, lines, line segments, and rays?",
          vis: G([
            { t: "line", a: [10, 30], b: [130, 30] },
            { t: "seg", a: [160, 30], b: [290, 30] },
            { t: "ray", a: [80, 90], b: [240, 90] },
            { t: "pt", p: [160, 30] },
            { t: "pt", p: [290, 30] },
            { t: "pt", p: [80, 90] },
          ]),
          // unverified: the key says answers may vary
          a: "I looked at the ends of each figure: arrows mean it goes on forever, a dot means an endpoint. I used the exact names line, line segment and ray.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 155–156",
      t: "Additional Practice 4–7",
      en: "Lesson 14-1",
      ic: "📘",
      from: "Practice Book p. 155–156",
      keep: true,
      items: [
        nameQ(
          "Name the figure.",
          "Ray",
          G([
            { t: "ray", a: [150, 10], b: [150, 115] },
            { t: "pt", p: [150, 10], l: "A", lp: "e" },
            { t: "pt", p: [150, 80], l: "B", lp: "e" },
          ]),
          "Endpoint A, arrow past B: ray AB.",
          "AB",
        ),
        nameQ(
          "Name the figure.",
          "Line segment",
          G([
            { t: "seg", a: [50, 80], b: [250, 50] },
            { t: "pt", p: [50, 80], l: "R", lp: "s" },
            { t: "pt", p: [250, 50], l: "S" },
          ]),
          "Two endpoints: line segment RS.",
          "RS",
        ),
        nameQ(
          "Is the dashed part a line, a line segment or a ray?",
          "Line segment",
          G([
            { t: "ray", a: [150, 50], b: [150, 0] },
            { t: "ray", a: [150, 50], b: [60, 110] },
            { t: "seg", a: [150, 50], b: [230, 110], dash: true },
            { t: "pt", p: [150, 50] },
            { t: "pt", p: [230, 110] },
          ]),
          "The dashed part has two endpoints: a line segment.",
        ),
        nameQ(
          "Is the dashed part a line, a line segment or a ray?",
          "Line",
          G([
            { t: "line", a: [150, 0], b: [150, 120], dash: true },
            { t: "ray", a: [150, 60], b: [60, 10] },
            { t: "ray", a: [150, 60], b: [250, 110] },
            { t: "pt", p: [150, 60] },
          ]),
          "The dashed part has arrows at both ends: a line.",
        ),
      ],
    },
  ],
};
