// Math · Grade 4 · Lesson 13-1 « Relate Metric Units » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1171–k1204), Practice Book p. 133–134
// (and the Unit 13 Family Letter, p. 131–132). No teacher's key. Log: grade-4/math/SOURCES.md.
const fmt = (n) => n.toLocaleString("en-US");
const UNITS = {
  km: ["kilometers", "meters", 1000],
  m: ["meters", "centimeters", 100],
  mm: ["meters", "millimeters", 1000],
  cm: ["centimeters", "millimeters", 10],
  kg: ["kilograms", "grams", 1000],
  L: ["liters", "milliliters", 1000],
};
const RULE = {
  km: "1 kilometer = 1,000 meters",
  m: "1 meter = 100 centimeters",
  mm: "1 meter = 1,000 millimeters",
  cm: "1 centimeter = 10 millimeters",
  kg: "1 kilogram = 1,000 grams",
  L: "1 liter = 1,000 milliliters",
};
// n big units = ? small units
const conv = (q, n, u, more = {}) => {
  const [big, small, f] = UNITS[u];
  return {
    type: "num",
    q: q || `${n} ${big} = ? ${small}`,
    pre: `${n} ${big} =`,
    post: small,
    a: n * f,
    vis: { kind: "lines", rows: [RULE[u], `${n} × ${fmt(f)} = ?`] },
    x: `${RULE[u]}: ${n} × ${f} = [${n * f}] ${small}.`,
    ...more,
  };
};
// which unit: n big = N ?
const unitQ = (n, u, wrong) => {
  const [big, small, f] = UNITS[u];
  return {
    type: "mc",
    q: `${n} ${big} = ${fmt(n * f)} ___`,
    opts: [small, ...wrong],
    vis: { kind: "lines", rows: [RULE[u]] },
    x: `${n} × ${f} = ${n * f}: ${fmt(n * f)} [${small}].`,
  };
};

window.LESSON = {
  n: "13-1",
  key: "math4-l13-1",
  grade: 4,
  title: "Metric Units",
  en: "Kilometers, meters, centimeters, millimeters; kilograms and grams; liters and milliliters",
  unit: "Unit 13 · Lesson 13-1",
  book: "e-book Lesson 13-1 · Practice Book p. 133–134",
  imgDir: "img/lesson-13-1",
  cover: "curious",
  question: {
    q: "Why do you use [multiplication] to convert larger metric units to smaller units?",
    // unverified: a model answer, the book gives none
    a: "Each large unit is made of many small units (1 m = 100 cm), so you need more of the small units: multiply by 10, 100 or 1,000.",
    img: "curious",
  },
  words: [
    { w: "Metric system", m: "units: km, m, cm, mm; kg, g; L, mL" },
    { w: "Convert", m: "change to another unit: 5 m = 500 cm" },
    { w: "Kilometer (km)", m: "1 km = 1,000 m" },
    { w: "Meter (m)", m: "1 m = 100 cm" },
    { w: "Centimeter (cm)", m: "1 cm = 10 mm" },
    { w: "Kilogram (kg)", m: "1 kg = 1,000 g" },
    { w: "Liter (L)", m: "1 L = 1,000 mL" },
  ],
  ideas: [
    {
      t: "Same and different",
      ic: "📏",
      img: "curious",
      lines: [
        "1 km = 1,000 m. 1 kg = 1,000 g. 1 L = 1,000 mL.",
        "One [large] unit is many [small] units.",
      ],
    },
    {
      t: "Two murals",
      ic: "🎨",
      lines: [
        "The Broad Street mural is [5 meters] long.",
        "The Central Avenue mural is [485 centimeters] long. Which is longer?",
      ],
      vis: { kind: "lines", rows: ["5 m", "485 cm"] },
    },
    {
      t: "Metric units of length",
      ic: "📐",
      lines: [
        "1 kilometer = [1,000] meters.",
        "1 meter = [100] centimeters.",
        "1 centimeter = [10] millimeters.",
      ],
      vis: {
        kind: "lines",
        rows: ["1 km = 1,000 m", "1 m = 100 cm", "1 cm = 10 mm"],
      },
    },
    {
      t: "Multiply",
      ic: "✖️",
      lines: [
        "5 meters = ? centimeters: 5 × 100 = [500].",
        "500 cm is more than 485 cm: the Broad Street mural is [longer].",
      ],
      vis: { kind: "lines", rows: ["5 × 100 = 500", "500 cm > 485 cm"] },
    },
    {
      t: "Large to small",
      ic: "💡",
      lines: [
        "To change a [larger] unit to a [smaller] one, [multiply].",
        "× 10, × 100 or × 1,000.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "km → m: × 1,000",
          "m → cm: × 100",
          "cm → mm: × 10",
          "kg → g, L → mL: × 1,000",
        ],
      },
    },
  ],

  games: [
    {
      k: "conv",
      t: "Convert",
      en: "Large unit to small unit",
      ic: "✖️",
      items: [
        [3, "km"],
        [9, "m"],
        [6, "cm"],
        [4, "kg"],
        [7, "L"],
        [20, "m"],
        [15, "cm"],
        [2, "mm"],
      ].map(([n, u]) => conv("", n, u)),
    },
    {
      k: "cmp",
      t: "Which is more?",
      en: "Convert, then compare",
      ic: "⚖️",
      items: [
        ["3 m", "290 cm", "3 m", "3 m = 300 cm: 300 > 290."],
        ["4 kg", "4,500 g", "4,500 g", "4 kg = 4,000 g: 4,500 > 4,000."],
        ["2 L", "1,800 mL", "2 L", "2 L = 2,000 mL: 2,000 > 1,800."],
        ["7 cm", "75 mm", "75 mm", "7 cm = 70 mm: 75 > 70."],
        ["1 km", "900 m", "1 km", "1 km = 1,000 m: 1,000 > 900."],
      ].map(([a, b, big, x]) => ({
        type: "mc",
        q: "Which is more?",
        opts: [big, big === a ? b : a, "They are equal"],
        keep: [a, b, "They are equal"],
        vis: { kind: "lines", rows: [`${a}   or   ${b}`] },
        x,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-1",
      t: "Be Curious",
      en: "1 km, 1 kg, 1 L",
      ic: "📏",
      from: "e-book 13-1 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: the book takes any answer
          a: "The same: each is 1,000 of a smaller unit (1,000 m, 1,000 g, 1,000 mL). Different: they measure different things: length, mass and liquid volume.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-1",
      t: "Learn and Work Together",
      en: "Two murals; Mr. Decker's paint",
      ic: "🎨",
      from: "e-book 13-1 · Learn, Work Together",
      keep: true,
      items: [
        conv(
          "How long is the Broad Street mural (5 meters) in centimeters?",
          5,
          "m",
        ),
        {
          type: "mc",
          q: "The Broad Street mural is 5 meters long, the Central Avenue mural 485 centimeters. Which is longer?",
          opts: [
            "The Broad Street mural",
            "The Central Avenue mural",
            "They are the same",
          ],
          vis: { kind: "lines", rows: ["5 m = 500 cm", "485 cm"] },
          x: "5 m = 500 cm, and 500 is more than 485: the Broad Street mural is longer.",
        },
        {
          type: "open",
          q: "Math Is… Structure: What patterns help you convert units in the metric system?",
          vis: { kind: "lines", rows: ["× 10", "× 100", "× 1,000"] },
          // unverified: a model answer, the book gives none
          a: "Every metric unit is 10, 100 or 1,000 times another one. To convert, multiply by 10, 100 or 1,000: you add 1, 2 or 3 zeros.",
        },
        conv(
          "Work Together: Mr. Decker needs 7 liters of paint. How many milliliters of paint does he need?",
          7,
          "L",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-1",
      t: "On My Own 1–11",
      en: "Convert the metric units",
      ic: "📏",
      from: "e-book 13-1 · On My Own 1–11",
      keep: true,
      items: [
        conv(
          "How can you convert the metric units? 12 meters = ? centimeters",
          12,
          "m",
        ),
        conv(
          "How can you convert the metric units? 8 kilograms = ? grams",
          8,
          "kg",
        ),
        conv("", 14, "cm"),
        conv("", 25, "L"),
        conv("", 4, "cm"),
        conv("", 6, "mm"),
        unitQ(10, "L", ["liters", "grams"]),
        unitQ(200, "m", ["millimeters", "kilometers"]),
        conv(
          "How many milliliters of water will fill the 2-liter tea kettle?",
          2,
          "L",
          { vis: undefined, img: "kettle" },
        ),
        {
          type: "multi",
          q: "An inchworm crawls 3 meters. Which are other ways to represent the same distance using smaller units?",
          vis: { kind: "lines", rows: ["3 m"] },
          opts: [
            ["300 centimeters", true],
            ["3,000 millimeters", true],
            ["30 centimeters", false],
            ["300 millimeters", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🐛" })),
          x: "3 × 100 = 300 centimeters and 3 × 1,000 = 3,000 millimeters.",
        },
        {
          type: "mc",
          q: "A box of printer paper weighs 9 kilograms. Does the box weigh more than 9,000 grams?",
          opts: [
            "No, it weighs exactly 9,000 grams",
            "Yes, it weighs more",
            "No, it weighs less",
          ],
          vis: { kind: "lines", rows: ["9 kg  ?  9,000 g"] },
          x: "9 × 1,000 = 9,000: 9 kg is exactly 9,000 g, not more.",
        },
      ],
    },
    {
      k: "own12",
      g: "📗 Book · Lesson 13-1",
      t: "On My Own 12–15",
      en: "Why 6,000? Noah, Asher",
      ic: "🏃",
      from: "e-book 13-1 · On My Own 12–15",
      keep: true,
      items: [
        {
          type: "open",
          q: "In 6 kilometers there are 6,000 meters. Why does the number increase from 6 to 6,000?",
          vis: { kind: "lines", rows: ["6 km = 6,000 m"] },
          // unverified: a model answer, the book gives none
          a: "A meter is much smaller than a kilometer: each kilometer is 1,000 meters. It takes more small units to make the same length, so 6 × 1,000 = 6,000.",
        },
        {
          type: "mc",
          q: "Would it be easier to lift the 5 kg weight or one that weighs 5,000 grams?",
          opts: [
            "Neither: they weigh the same",
            "The 5 kg weight",
            "The 5,000 g weight",
          ],
          img: "weight",
          x: "5 × 1,000 = 5,000: 5 kg = 5,000 g, the same weight.",
        },
        conv(
          "STEM Connection: Noah measures 2 liters of fluids. What is the equivalent amount in milliliters?",
          2,
          "L",
        ),
        {
          type: "num",
          q: "Extend: Asher runs a 1,000-meter race and his mother runs a 5-kilometer race. How far do they run in all, in meters?",
          a: 6000,
          post: "meters",
          vis: { kind: "lines", rows: ["1,000 m + 5 km = ? m"] },
          x: "5 km = 5,000 m. 1,000 + 5,000 = [6000] meters (6 km).",
        },
        {
          type: "open",
          q: "Reflect: Why do you use multiplication to convert larger metric units to smaller units?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "One large unit is the same as many small units, so the number gets bigger: multiply by how many small units are in one large unit.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 133–134",
      t: "Additional Practice 1–5",
      en: "Lesson 13-1",
      ic: "📘",
      from: "Practice Book p. 133–134",
      keep: true,
      items: [
        ...[2, 3, 4, 5].map((n) =>
          conv("Complete the equivalency table: kilograms to grams.", n, "kg"),
        ),
        ...[4, 5, 6, 7].map((n) =>
          conv(
            "Complete the equivalency table: kilometers to meters.",
            n,
            "km",
          ),
        ),
        conv("Convert the larger unit to the smaller unit.", 5, "m"),
        conv("Convert the larger unit to the smaller unit.", 4, "kg"),
        conv("Convert the larger unit to the smaller unit.", 13, "L"),
        conv(
          "Danyail bought 2 liters of apple cider. How many milliliters did she buy?",
          2,
          "L",
        ),
        {
          type: "tf",
          q: "Vern says that 9 centimeters is equivalent to 900 millimeters. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "lines", rows: ["1 cm = 10 mm", "9 cm = 900 mm ?"] },
          x: "1 cm = 10 mm, so 9 × 10 = 90: 9 cm = 90 mm. Vern multiplied by 100.",
        },
        {
          type: "tf",
          q: "Lavette filled out the chart: 1 L = 1,000 mL, 3 L = 3,000 mL, 5 L = 5,000 mL, 7 L = 7,000 mL. Is her chart right?",
          a: true,
          yes: ["Yes, it is right", "No, it is not"],
          vis: {
            kind: "lines",
            rows: [
              "1 L → 1,000 mL",
              "3 L → 3,000 mL",
              "5 L → 5,000 mL",
              "7 L → 7,000 mL",
            ],
          },
          // unverified: the Practice Book has no key
          x: "Each liter is 1,000 mL: 1 × 1,000, 3 × 1,000, 5 × 1,000, 7 × 1,000. Every row is right.",
        },
      ],
    },
  ],
};
