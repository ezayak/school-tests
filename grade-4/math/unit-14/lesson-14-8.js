// Math · Grade 4 · Lesson 14-8 « Classify Triangles » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1909–k1943), Practice Book p. 169–170. No teacher's key.
// On My Own 2, 3, 6: the angles and sides worked out from the frames (2: about 120°; 3 and 6: three different sides, an obtuse angle).
// Practice Book 1–10: angles and sides measured on the PDF's lines. Log: grade-4/math/SOURCES.md.
// a triangle: pts (3 points), right: the index of a right-angle vertex, labs: side labels [text, x, y]
const tri = (pts, right, labs = [], fill = 1) => {
  const items = [{ t: "poly", pts, fill }];
  if (right !== undefined)
    items.push({
      t: "right",
      v: pts[right],
      a: pts[(right + 1) % 3],
      b: pts[(right + 2) % 3],
    });
  labs.forEach(([s, x, y]) => items.push({ t: "text", p: [x, y], s }));
  return { kind: "geo", w: 300, h: 130, items };
};
const T = {
  acute: tri([
    [150, 10],
    [215, 120],
    [70, 110],
  ]),
  right: tri(
    [
      [90, 120],
      [90, 15],
      [240, 120],
    ],
    0,
  ),
  obtuse: tri([
    [40, 40],
    [110, 120],
    [270, 120],
  ]),
  equilateral: tri([
    [150, 15],
    [210, 119],
    [90, 119],
  ]),
  isosceles: tri([
    [150, 5],
    [190, 120],
    [110, 120],
  ]),
  scalene: tri([
    [60, 120],
    [270, 110],
    [210, 30],
  ]),
};
const ANG = ["acute", "right", "obtuse"];
const SIDE = ["equilateral", "isosceles", "scalene"];
const AW = {
  acute: "all 3 angles are acute (less than 90°)",
  right: "it has a right angle (90°)",
  obtuse: "it has an obtuse angle (more than 90°)",
};
const SW = {
  equilateral: "all 3 sides are equal",
  isosceles: "at least 2 sides are equal",
  scalene: "no sides are equal",
};
// by angles or by sides: one word
const angQ = (q, a, vis, more = {}) => ({
  type: "mc",
  q,
  opts: [a, ...ANG.filter((o) => o !== a)],
  keep: ANG,
  vis,
  x: `It is [${a}]: ${AW[a]}.`,
  ...more,
});
const sideQ = (q, s, vis, more = {}) => ({
  type: "mc",
  q,
  opts: [s, ...SIDE.filter((o) => o !== s)],
  keep: SIDE,
  vis,
  x: `It is [${s}]: ${SW[s]}.`,
  ...more,
});
// by angles and sides: two words; the wrong options change the angle word, the side word or both
// (an equilateral triangle is also isosceles, so its other side word is scalene)
const bothQ = (q, a, s, vis, more = {}) => {
  const s2 = s === "scalene" ? "isosceles" : "scalene";
  const [a1, a2] = ANG.filter((o) => o !== a);
  return {
    type: "mc",
    q,
    opts: [`${a} ${s}`, `${a1} ${s}`, `${a} ${s2}`, `${a2} ${s2}`],
    vis,
    x: `By angles: ${AW[a]}. By sides: ${SW[s]}. It is [${a} ${s}].`,
    ...more,
  };
};

window.LESSON = {
  n: "14-8",
  key: "math4-l14-8",
  grade: 4,
  title: "Classify Triangles",
  en: "Acute, right, obtuse; equilateral, isosceles, scalene",
  unit: "Unit 14 · Lesson 14-8",
  book: "e-book Lesson 14-8 · Practice Book p. 169–170",
  imgDir: "img/lesson-14-8",
  cover: "curious",
  question: {
    q: "How can you [classify] triangles?",
    // unverified: a model answer, the book gives none
    a: "By the [angles]: acute, right or obtuse. By the [sides]: equilateral, isosceles or scalene. Or by both: a right isosceles triangle.",
    img: "curious",
  },
  words: [
    { w: "Acute triangle", m: "3 acute angles (less than 90°)" },
    { w: "Right triangle", m: "a right angle (90°)" },
    { w: "Obtuse triangle", m: "an obtuse angle (more than 90°)" },
    { w: "Equilateral triangle", m: "3 equal sides" },
    { w: "Isosceles triangle", m: "at least 2 equal sides" },
    { w: "Scalene triangle", m: "no equal sides" },
  ],
  ideas: [
    {
      t: "Sort the triangles",
      ic: "🔺",
      img: "curious",
      lines: [
        "What are different ways to sort triangles?",
        "Look at the [angles] and at the [sides].",
      ],
    },
    {
      t: "By angles: right",
      ic: "📐",
      lines: ["A [right] triangle has a right angle."],
      vis: T.right,
    },
    {
      t: "By angles: acute",
      ic: "🔺",
      lines: ["An [acute] triangle has 3 acute angles."],
      vis: T.acute,
    },
    {
      t: "By angles: obtuse",
      ic: "📏",
      lines: ["An [obtuse] triangle has an obtuse angle."],
      vis: T.obtuse,
    },
    {
      t: "By sides",
      ic: "📏",
      lines: [
        "[Equilateral]: 3 equal sides.",
        "[Isosceles]: at least 2 equal sides.",
        "[Scalene]: no equal sides.",
      ],
      vis: {
        kind: "geo",
        w: 300,
        h: 110,
        items: [
          {
            t: "poly",
            pts: [
              [50, 20],
              [90, 90],
              [10, 90],
            ],
            fill: 1,
          },
          {
            t: "poly",
            pts: [
              [150, 5],
              [175, 90],
              [125, 90],
            ],
            fill: 2,
          },
          {
            t: "poly",
            pts: [
              [210, 90],
              [295, 90],
              [235, 55],
            ],
            fill: 3,
          },
        ],
      },
    },
    {
      t: "Both",
      ic: "🔀",
      lines: [
        "Use both: angles first, then sides.",
        "A right angle and 2 equal sides: a [right isosceles] triangle.",
      ],
      vis: tri(
        [
          [90, 120],
          [90, 15],
          [195, 120],
        ],
        0,
      ),
    },
  ],

  games: [
    {
      k: "ang",
      t: "By the angles",
      en: "Acute, right or obtuse?",
      ic: "📐",
      items: ["right", "obtuse", "acute", "obtuse", "right", "acute"].map((a) =>
        angQ("How can you classify the triangle by its angles?", a, T[a]),
      ),
    },
    {
      k: "side",
      t: "By the sides",
      en: "Equilateral, isosceles or scalene?",
      ic: "📏",
      items: [
        [
          "equilateral",
          tri(
            [
              [150, 15],
              [210, 119],
              [90, 119],
            ],
            undefined,
            [
              ["5 cm", 105, 60],
              ["5 cm", 200, 60],
              ["5 cm", 150, 135],
            ],
          ),
        ],
        [
          "isosceles",
          tri(
            [
              [150, 5],
              [190, 120],
              [110, 120],
            ],
            undefined,
            [
              ["8 in.", 110, 60],
              ["8 in.", 195, 60],
              ["4 in.", 150, 135],
            ],
          ),
        ],
        [
          "scalene",
          tri(
            [
              [60, 120],
              [270, 110],
              [210, 30],
            ],
            undefined,
            [
              ["7 m", 165, 132],
              ["4 m", 255, 65],
              ["6 m", 120, 65],
            ],
          ),
        ],
        [
          "isosceles",
          tri(
            [
              [90, 120],
              [90, 15],
              [195, 120],
            ],
            0,
            [
              ["6 cm", 70, 70],
              ["6 cm", 140, 135],
            ],
          ),
        ],
        [
          "scalene",
          tri(
            [
              [40, 40],
              [110, 120],
              [270, 120],
            ],
            undefined,
            [
              ["3 ft", 60, 90],
              ["5 ft", 190, 135],
              ["7 ft", 170, 70],
            ],
          ),
        ],
      ].map(([s, v]) =>
        sideQ("How can you classify the triangle by its sides?", s, v),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-8",
      t: "Be Curious",
      en: "Four triangles",
      ic: "🔺",
      from: "e-book 14-8 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Which doesn't belong?",
          img: "curious",
          // unverified: the book takes any answer with a reason
          a: "The blue triangle: its 3 sides are equal and all its angles are acute. The other three have a right or an obtuse angle, or sides of different lengths.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-8",
      t: "Learn and Work Together",
      en: "Sort by angles and sides",
      ic: "🔀",
      from: "e-book 14-8 · Learn, Work Together",
      keep: true,
      items: [
        {
          type: "open",
          q: "Math Is… Explaining: Why do you think that angles and side lengths are used to classify triangles?",
          vis: T.right,
          // unverified: a model answer, the book gives none
          a: "Every triangle has 3 angles and 3 sides, so we can compare them: the biggest angle tells acute, right or obtuse; equal sides tell equilateral, isosceles or scalene.",
        },
        bothQ(
          "Work Together: How can you classify the triangle?",
          "acute",
          "equilateral",
          tri(
            [
              [150, 15],
              [210, 119],
              [90, 119],
            ],
            undefined,
            [
              ["3 in.", 105, 60],
              ["3 in.", 200, 60],
              ["3 in.", 150, 135],
            ],
          ),
        ),
        bothQ(
          "Work Together: How can you classify the triangle?",
          "obtuse",
          "scalene",
          tri(
            [
              [60, 110],
              [150, 110],
              [250, 30],
            ],
            undefined,
            [
              ["2 cm", 105, 128],
              ["3 cm", 220, 85],
              ["4 cm", 135, 60],
            ],
          ),
          {
            x: "The sides are 2, 3 and 4 cm: no equal sides, and the angle between 2 cm and 3 cm is obtuse. It is [obtuse scalene].",
          },
        ),
        bothQ(
          "Work Together: How can you classify the triangle?",
          "right",
          "isosceles",
          tri(
            [
              [100, 120],
              [100, 15],
              [205, 120],
            ],
            0,
            [
              ["5 m", 80, 70],
              ["5 m", 152, 135],
            ],
          ),
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-8",
      t: "On My Own 1–7",
      en: "Classify the triangle",
      ic: "🔺",
      from: "e-book 14-8 · On My Own 1–7",
      keep: true,
      items: [
        angQ(
          "How can you classify the triangle by its angles?",
          "right",
          tri(
            [
              [110, 15],
              [200, 15],
              [110, 125],
            ],
            0,
          ),
        ),
        angQ(
          "How can you classify the triangle by its angles?",
          "obtuse",
          tri([
            [60, 15],
            [125, 120],
            [260, 120],
          ]),
        ),
        sideQ(
          "How can you classify the triangle by its sides?",
          "scalene",
          tri([
            [40, 110],
            [110, 45],
            [260, 110],
          ]),
        ),
        sideQ(
          "How can you classify the triangle by its sides?",
          "equilateral",
          tri(
            [
              [150, 15],
              [210, 119],
              [90, 119],
            ],
            undefined,
            [
              ["7 in.", 105, 60],
              ["7 in.", 200, 60],
              ["7 in.", 150, 135],
            ],
          ),
        ),
        bothQ(
          "How can you classify the triangle by its angles and sides?",
          "acute",
          "isosceles",
          tri(
            [
              [60, 65],
              [215, 10],
              [215, 120],
            ],
            undefined,
            [
              ["3 in.", 130, 25],
              ["3 in.", 130, 112],
              ["2 in.", 245, 70],
            ],
          ),
        ),
        bothQ(
          "How can you classify the triangle by its angles and sides?",
          "obtuse",
          "scalene",
          tri([
            [40, 75],
            [270, 25],
            [218, 100],
          ]),
        ),
        angQ(
          "Three angles of a triangle are 60°. How can you classify this triangle by its angles?",
          "acute",
          {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              {
                t: "poly",
                pts: [
                  [150, 15],
                  [210, 119],
                  [90, 119],
                ],
                fill: 1,
              },
              { t: "text", p: [150, 50], s: "60°" },
              { t: "text", p: [113, 112], s: "60°" },
              { t: "text", p: [187, 112], s: "60°" },
            ],
          },
          {
            x: "60° is less than 90°: all 3 angles are acute, so it is [acute].",
          },
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 14-8",
      t: "On My Own 8–12",
      en: "Marnie and Bill, Antonio's robot",
      ic: "🤖",
      from: "e-book 14-8 · On My Own 8–12",
      keep: true,
      items: [
        bothQ(
          "A triangle has two equal sides and an angle that is 90°. How can you classify it by its angles and sides?",
          "right",
          "isosceles",
          tri(
            [
              [100, 120],
              [100, 15],
              [205, 120],
            ],
            0,
          ),
        ),
        {
          type: "mc",
          q: "A triangle has an angle equal to 140°. How can you classify it? Why only by its angle?",
          opts: [
            "Obtuse: we don't know the side lengths",
            "Acute: we don't know the side lengths",
            "Obtuse scalene: all sides are different",
          ],
          vis: {
            kind: "geo",
            w: 300,
            h: 110,
            items: [
              {
                t: "poly",
                pts: [
                  [30, 100],
                  [120, 100],
                  [280, 40],
                ],
                fill: 1,
              },
              {
                t: "arc",
                v: [120, 100],
                a: [30, 100],
                b: [280, 40],
                r: 18,
                l: "140°",
              },
            ],
          },
          x: "140° is more than 90°: [obtuse]. The side lengths are not given, so we can't say equilateral, isosceles or scalene.",
        },
        {
          type: "mc",
          q: "A triangle has 3 equal sides. Marnie says it is isosceles; Bill says it is equilateral. Who is right?",
          opts: ["Both are right", "Only Bill", "Only Marnie", "Neither"],
          vis: T.equilateral,
          // unverified: no key; the book's isosceles is "at least 2 equal sides"
          x: "3 equal sides: equilateral. An isosceles triangle has [at least 2] equal sides, and 3 is at least 2: both are right.",
        },
        {
          type: "mc",
          q: "STEM Connection: Antonio's robot goes from Point A to B to C in the shape of an isosceles triangle. B to C is the shortest distance. What do you know about A to B and A to C?",
          opts: [
            "They are equal",
            "A to B is longer",
            "A to C is longer",
            "They are both shorter than B to C",
          ],
          vis: {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              {
                t: "poly",
                pts: [
                  [150, 10],
                  [195, 115],
                  [105, 115],
                ],
                fill: 1,
              },
              { t: "pt", p: [150, 10], l: "A", lp: "n" },
              { t: "pt", p: [105, 115], l: "B", lp: "w" },
              { t: "pt", p: [195, 115], l: "C", lp: "e" },
            ],
          },
          // unverified: no key
          x: "An isosceles triangle has 2 equal sides. B to C is the short one, so the other two are equal: A to B = A to C.",
        },
        bothQ(
          "Extend: A square is divided into two equal triangles. How can you classify the triangles by the angles and sides?",
          "right",
          "isosceles",
          {
            kind: "geo",
            w: 300,
            h: 130,
            items: [
              {
                t: "poly",
                pts: [
                  [100, 15],
                  [205, 15],
                  [205, 120],
                ],
                fill: 1,
              },
              {
                t: "poly",
                pts: [
                  [100, 15],
                  [205, 120],
                  [100, 120],
                ],
                fill: 2,
              },
              {
                t: "right",
                v: [100, 120],
                a: [100, 15],
                b: [205, 120],
              },
            ],
          },
          {
            x: "Each triangle has a corner of the square (a right angle) and two sides of the square (equal): [right isosceles].",
          },
        ),
        {
          type: "open",
          q: "Reflect: How can you classify triangles?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "By the angles (acute, right, obtuse), by the sides (equilateral, isosceles, scalene), or by both, like a right isosceles triangle.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 169–170",
      t: "Additional Practice 1–10",
      en: "Lesson 14-8",
      ic: "📘",
      from: "Practice Book p. 169–170",
      keep: true,
      items: [
        angQ(
          "Classify the triangle by its angles.",
          "acute",
          tri([
            [170, 115],
            [100, 105],
            [148, 10],
          ]),
        ),
        angQ(
          "Classify the triangle by its angles.",
          "obtuse",
          tri([
            [80, 100],
            [115, 50],
            [245, 100],
          ]),
        ),
        angQ(
          "Classify the triangle by its angles.",
          "right",
          tri(
            [
              [230, 110],
              [230, 55],
              [80, 55],
            ],
            1,
          ),
        ),
        sideQ(
          "Classify the triangle by its side lengths.",
          "equilateral",
          tri([
            [95, 20],
            [150, 115],
            [205, 20],
          ]),
        ),
        sideQ(
          "Classify the triangle by its side lengths.",
          "scalene",
          tri([
            [225, 25],
            [215, 85],
            [80, 85],
          ]),
        ),
        sideQ(
          "Classify the triangle by its side lengths.",
          "isosceles",
          tri(
            [
              [190, 15],
              [190, 115],
              [90, 115],
            ],
            1,
          ),
        ),
        bothQ(
          "Classify the triangle by its angles and side lengths.",
          "obtuse",
          "scalene",
          tri([
            [250, 15],
            [185, 85],
            [135, 85],
          ]),
        ),
        bothQ(
          "Classify the triangle by its angles and side lengths.",
          "right",
          "isosceles",
          tri(
            [
              [80, 110],
              [150, 40],
              [220, 110],
            ],
            1,
          ),
        ),
        bothQ(
          "Classify the triangle by its angles and side lengths.",
          "acute",
          "scalene",
          tri([
            [200, 115],
            [100, 115],
            [127, 25],
          ]),
        ),
        {
          type: "mc",
          q: "A park section is a triangle. Right isosceles → a baseball field; obtuse isosceles → a dog park. What will it be used for?",
          opts: ["A dog park", "A baseball field"],
          vis: tri([
            [40, 110],
            [150, 50],
            [260, 110],
          ]),
          x: "Its top angle is obtuse (about 112°) and its two slanted sides are equal: [obtuse isosceles], a dog park.",
        },
      ],
    },
  ],
};
