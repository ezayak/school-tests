// Math · Grade 4 · Lesson 13-3 « Relate Customary Units of Capacity » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1245–k1283), Practice Book p. 137–138.
// No teacher's key. Log: grade-4/math/SOURCES.md.
const U = {
  gal: ["gallons", "quarts", 4, "1 gallon = 4 quarts"],
  qt: ["quarts", "pints", 2, "1 quart = 2 pints"],
  pt: ["pints", "cups", 2, "1 pint = 2 cups"],
  c: ["cups", "fluid ounces", 8, "1 cup = 8 fluid ounces"],
  galpt: ["gallons", "pints", 8, "1 gallon = 4 quarts = 8 pints"],
  qtc: ["quarts", "cups", 4, "1 quart = 2 pints = 4 cups"],
};
// n large = ? small (multiply)
const conv = (q, n, u, more = {}) => {
  const [big, small, f, rule] = U[u];
  return {
    type: "num",
    q: q || "What number makes the equivalence true?",
    pre: `${n} ${big} =`,
    post: small,
    a: n * f,
    vis: { kind: "lines", rows: [rule, `${n} × ${f} = ?`] },
    x: `${rule}: ${n} × ${f} = [${n * f}] ${small}.`,
    ...more,
  };
};
// ? large = n small (divide)
const back = (q, n, u, more = {}) => {
  const [big, small, f, rule] = U[u];
  return {
    type: "num",
    q: q || "What number makes the equivalence true?",
    post: `${big} = ${n} ${small}`,
    a: n / f,
    vis: { kind: "lines", rows: [rule, `? × ${f} = ${n}`] },
    x: `${rule}: ${n} ÷ ${f} = [${n / f}] ${big}.`,
    ...more,
  };
};
const table = (q, u, ns) => ns.map((n) => conv(q, n, u));

window.LESSON = {
  n: "13-3",
  key: "math4-l13-3",
  grade: 4,
  title: "Customary Units of Capacity",
  en: "Gallons, quarts, pints, cups and fluid ounces",
  unit: "Unit 13 · Lesson 13-3",
  book: "e-book Lesson 13-3 · Practice Book p. 137–138",
  imgDir: "img/lesson-13-3",
  cover: "curious",
  question: {
    q: "How is converting larger units of [capacity] to smaller units similar to converting larger units of [length]?",
    // unverified: a model answer, the book gives none
    a: "Both times one large unit is many small ones, so I multiply: 1 gallon = 4 quarts like 1 meter = 100 centimeters.",
    img: "curious",
  },
  words: [
    { w: "Capacity", m: "how much a container holds (liquid volume)" },
    { w: "Gallon (gal)", m: "1 gal = 4 quarts" },
    { w: "Quart (qt)", m: "1 qt = 2 pints" },
    { w: "Pint (pt)", m: "1 pt = 2 cups" },
    { w: "Cup (c)", m: "1 c = 8 fluid ounces" },
    { w: "Fluid ounce (fl oz)", m: "a small unit of capacity" },
  ],
  ideas: [
    {
      t: "Containers",
      ic: "🥛",
      img: "curious",
      lines: [
        "A gallon, a quart, a pint, a cup: from [largest] to [smallest].",
      ],
    },
    {
      t: "Leah's sauce",
      ic: "🍝",
      lines: [
        "Leah made [5 quarts] of sauce.",
        "How many 1-pint containers? How many 1-cup containers?",
      ],
      vis: {
        kind: "lines",
        rows: ["1 gal = 4 qt", "1 qt = 2 pt", "1 pt = 2 c", "1 c = 8 fl oz"],
      },
    },
    {
      t: "Quarts to pints",
      ic: "✖️",
      lines: [
        "1 quart = 2 pints.",
        "5 × 2 = [10]: Leah can fill [10] pint containers.",
      ],
      vis: { kind: "lines", rows: ["1 qt → 2 pt", "5 qt → 10 pt"] },
    },
    {
      t: "Quarts to cups",
      ic: "☕",
      lines: [
        "1 quart = 4 cups.",
        "5 × 4 = [20]: Leah can fill [20] cup containers.",
      ],
      vis: { kind: "lines", rows: ["1 qt → 4 c", "5 qt → 20 c"] },
    },
    {
      t: "Larger to smaller",
      ic: "💡",
      lines: [
        "Larger unit to smaller unit: [multiply].",
        "Smaller unit to larger unit: [divide].",
      ],
      vis: {
        kind: "lines",
        rows: [
          "gal → qt: × 4",
          "qt → pt: × 2",
          "pt → c: × 2",
          "c → fl oz: × 8",
        ],
      },
    },
  ],

  games: [
    {
      k: "mul",
      t: "Larger to smaller",
      en: "Multiply",
      ic: "✖️",
      items: [
        conv("", 6, "gal"),
        conv("", 9, "qt"),
        conv("", 7, "pt"),
        conv("", 3, "c"),
        conv("", 2, "galpt"),
        conv("", 3, "qtc"),
      ],
    },
    {
      k: "div",
      t: "Smaller to larger",
      en: "Divide",
      ic: "➗",
      items: [
        back("", 12, "gal"),
        back("", 18, "qt"),
        back("", 10, "pt"),
        back("", 40, "c"),
        back("", 28, "gal"),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-3",
      t: "Be Curious",
      en: "Quart, pint, cup, gallon",
      ic: "🥛",
      from: "e-book 13-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: the book takes any answer
          a: "I notice four containers of different sizes: a gallon, a quart, a pint and a cup. I wonder how many cups fill a quart, and how many quarts fill a gallon.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-3",
      t: "Learn and Work Together",
      en: "Leah's sauce; equivalence tables",
      ic: "🍝",
      from: "e-book 13-3 · Learn, Work Together",
      keep: true,
      items: [
        conv(
          "Leah made 5 quarts of sauce. How many 1-pint containers could she fill?",
          5,
          "qt",
        ),
        conv("How many 1-cup containers could she fill?", 5, "qtc"),
        {
          type: "open",
          q: "How can you describe the relationship between pints and cups?",
          vis: { kind: "lines", rows: ["1 pt = 2 c"] },
          // unverified: a model answer, the book gives none
          a: "1 pint is 2 cups: there are always twice as many cups as pints. Multiply the pints by 2.",
        },
        ...table(
          "Work Together: complete the table, gallons to quarts.",
          "gal",
          [2, 3, 4, 5],
        ),
        ...table(
          "Work Together: complete the table, pints to cups.",
          "pt",
          [2, 3, 4, 5],
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-3",
      t: "On My Own 1–10",
      en: "Tables and conversions",
      ic: "📋",
      from: "e-book 13-3 · On My Own 1–10",
      keep: true,
      items: [
        ...table(
          "Complete the table: cups to fluid ounces.",
          "c",
          [2, 3, 4, 5],
        ),
        ...table("Complete the table: quarts to pints.", "qt", [2, 3, 4, 5]),
        conv("", 6, "c"),
        conv("", 8, "qt"),
        back("", 16, "gal"),
        back("", 14, "pt"),
        conv(
          "Jerry's coffee pot holds 4 cups. How many fluid ounces does the pot hold?",
          4,
          "c",
        ),
        conv(
          "The baseball teams drink 10 gallons of water. How many quarts do they drink?",
          10,
          "gal",
        ),
        back(
          "Kelly's juice recipe uses 16 quarts of water. How many gallons does it use?",
          16,
          "gal",
        ),
        back(
          "Ben used 40 pints of water to fill his aquarium. How many quarts does it hold?",
          40,
          "qt",
        ),
      ],
    },
    {
      k: "own11",
      g: "📗 Book · Lesson 13-3",
      t: "On My Own 11–14",
      en: "Kayla, Jack, Celia, Geraldo",
      ic: "🚰",
      from: "e-book 13-3 · On My Own 11–14",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Kayla has a pitcher that holds 18 pints and a punch bowl that holds 3 gallons. Which holds more?",
          opts: ["The punch bowl", "The pitcher", "They hold the same"],
          vis: { kind: "lines", rows: ["pitcher: 18 pt", "punch bowl: 3 gal"] },
          x: "3 gallons = 3 × 8 = 24 pints. 24 is more than 18: the punch bowl.",
        },
        {
          type: "num",
          q: "Jack used {2 1/2} quarts of oil for the lawnmower. How many pints of oil did he use?",
          a: 5,
          post: "pints",
          vis: { kind: "lines", rows: ["1 qt = 2 pt", "{1/2} qt = 1 pt"] },
          x: "2 quarts = 4 pints, {1/2} quart = 1 pint: 4 + 1 = [5] pints.",
        },
        {
          type: "num",
          q: "Celia made 12 quarts of lemonade. She fills bottles that hold 2 cups. How many bottles can she fill?",
          a: 24,
          post: "bottles",
          vis: { kind: "lines", rows: ["1 qt = 4 c", "2 c in each bottle"] },
          x: "12 × 4 = 48 cups. 48 ÷ 2 = [24] bottles.",
        },
        {
          type: "mc",
          q: "Extend: Geraldo can fill 7 cups every 30 seconds indoors, and 2 quarts every 30 seconds outdoors. Which faucet fills a bucket faster?",
          opts: [
            "The outdoor faucet",
            "The indoor faucet",
            "They are the same",
          ],
          vis: {
            kind: "lines",
            rows: ["indoor: 7 c / 30 s", "outdoor: 2 qt / 30 s"],
          },
          x: "2 quarts = 2 × 4 = 8 cups. 8 cups is more than 7 cups in the same time: the outdoor faucet.",
        },
        {
          type: "open",
          q: "Reflect: How is converting larger units of capacity to smaller units similar to converting larger units of length to smaller units?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "In both, one large unit equals many small units, so I multiply by how many small units fit in one large unit.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 137–138",
      t: "Additional Practice 1–7",
      en: "Lesson 13-3",
      ic: "📘",
      from: "Practice Book p. 137–138",
      keep: true,
      items: [
        ...table(
          "Complete the table: gallons to quarts.",
          "gal",
          [1, 2, 3, 4, 5],
        ),
        ...table("Complete the table: pints to cups.", "pt", [1, 2, 3, 4, 5]),
        conv(
          "Marco makes 3 quarts of salsa. How many pints of salsa did he make?",
          3,
          "qt",
        ),
        conv(
          "Seth made 5 gallons of orange juice. How many quarts did he make?",
          5,
          "gal",
        ),
        conv(
          "Annabel's water bottle holds 6 cups. How many fluid ounces does it hold?",
          6,
          "c",
        ),
        conv(
          "The soccer team drinks 3 gallons of water. How many pints did they drink?",
          3,
          "galpt",
        ),
        {
          type: "mc",
          q: "Stephanie fills a pitcher with 12 quarts of orange juice and a dispenser with 4 gallons of ice tea. Which container holds more?",
          opts: ["The beverage dispenser", "The pitcher", "They hold the same"],
          vis: { kind: "lines", rows: ["pitcher: 12 qt", "dispenser: 4 gal"] },
          x: "4 gallons = 4 × 4 = 16 quarts. 16 is more than 12: the dispenser holds more.",
        },
      ],
    },
  ],
};
