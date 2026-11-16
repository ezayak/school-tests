// Math · Grade 4 · Lesson 13-5 « Solve Problems That Involve Units of Measure » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1318–k1352), Practice Book p. 141–142.
// No teacher's key. A problem in steps is one item per step. Log: grade-4/math/SOURCES.md.
// a number answer with the problem's facts written out
const q = (text, a, post, rows, x, more = {}) => ({
  type: "num",
  q: text,
  a,
  post,
  vis: { kind: "lines", rows },
  x,
  ...more,
});

window.LESSON = {
  n: "13-5",
  key: "math4-l13-5",
  grade: 4,
  title: "Measurement Problems",
  en: "Convert to the smaller unit, then add, subtract, multiply or divide",
  unit: "Unit 13 · Lesson 13-5",
  book: "e-book Lesson 13-5 · Practice Book p. 141–142",
  imgDir: "img/lesson-13-5",
  cover: "curious",
  question: {
    q: "How do you know when it is necessary to [convert units] before solving a problem?",
    // unverified: a model answer, the book gives none
    a: "When the numbers in the problem have different units (kilograms and grams), change them to the same, smaller unit first. Then add or subtract.",
    img: "curious",
  },
  words: [
    { w: "Convert", m: "change to the same unit: 3 kg = 3,000 g" },
    { w: "Maximum", m: "the most it can hold" },
    { w: "Mass", m: "how heavy: grams and kilograms" },
  ],
  ideas: [
    {
      t: "Chuck's shelf",
      ic: "📚",
      img: "curious",
      lines: [
        "The shelf holds at most [5,000 grams].",
        "The frame and plants have a mass of [3 kilograms and 245 grams].",
        "How heavy can two new vases be?",
      ],
    },
    {
      t: "Step 1: same unit",
      ic: "🔁",
      lines: [
        "3 kilograms = 3 × 1,000 = 3,000 grams.",
        "3,000 + 245 = [3,245] grams.",
      ],
      vis: { kind: "lines", rows: ["1 kg = 1,000 g", "3,000 + 245 = 3,245"] },
    },
    {
      t: "Step 2: what is left",
      ic: "➖",
      lines: [
        "5,000 − 3,245 = [1,755].",
        "The vases can have a mass of [1,755 grams] at most.",
      ],
      vis: {
        kind: "bar",
        rows: [
          {
            segs: [
              { t: "frame and plants 3,245 g", v: 3245 },
              { t: "vases ?", v: 1755, q: true },
            ],
          },
        ],
        total: { t: "5,000 g" },
      },
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Different units? [Convert] to the smaller unit first.",
        "Then solve, one step at a time.",
      ],
      vis: { kind: "lines", rows: ["km → m", "kg → g", "L → mL"] },
    },
  ],

  games: [
    {
      k: "two",
      t: "Same unit first",
      en: "Convert, then add or subtract",
      ic: "🔁",
      items: [
        q(
          "A rope is 2 meters. Another is 80 centimeters. How many centimeters in all?",
          280,
          "cm",
          ["2 m + 80 cm"],
          "2 m = 200 cm: 200 + 80 = [280] cm.",
        ),
        q(
          "A jug holds 3 liters. 1,200 milliliters are poured out. How many milliliters are left?",
          1800,
          "mL",
          ["3 L − 1,200 mL"],
          "3 L = 3,000 mL: 3000 − 1200 = [1800] mL.",
        ),
        q(
          "A bag of rice is 2 kilograms. A bag of beans is 650 grams. How many more grams of rice?",
          1350,
          "g",
          ["2 kg − 650 g"],
          "2 kg = 2,000 g: 2000 − 650 = [1350] g.",
        ),
        q(
          "Max runs 4 kilometers and walks 500 meters. How many meters in all?",
          4500,
          "m",
          ["4 km + 500 m"],
          "4 km = 4,000 m: 4000 + 500 = [4500] m.",
        ),
        q(
          "A board is 1 meter long. It is cut into 4 equal pieces. How many centimeters is each piece?",
          25,
          "cm",
          ["1 m ÷ 4"],
          "1 m = 100 cm: 100 ÷ 4 = [25] cm.",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-5",
      t: "Be Curious",
      en: "Chuck's bookcase",
      ic: "📚",
      from: "e-book 13-5 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What math do you see in this problem? The top shelf holds a maximum of some grams; the frame and the plants have a mass of some kilograms and some grams.",
          img: "curious",
          // unverified: the book takes any answer
          a: "Mass in grams and kilograms. I need to change the kilograms to grams, add the masses, and compare with the most the shelf can hold.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-5",
      t: "Learn and Work Together",
      en: "Chuck's vases; Jonah's tea",
      ic: "🏺",
      from: "e-book 13-5 · Learn, Work Together",
      keep: true,
      items: [
        q(
          "Step 1: The frame and the plants have a mass of 3 kilograms and 245 grams. How many grams is that?",
          3245,
          "grams",
          ["3 kg 245 g", "1 kg = 1,000 g"],
          "3 × 1,000 = 3,000: 3000 + 245 = [3245] grams.",
        ),
        q(
          "Step 2: The shelf holds a maximum of 5,000 grams. What is the greatest possible mass of the two vases?",
          1755,
          "grams",
          ["5,000 g − 3,245 g"],
          "5000 − 3245 = [1755] grams.",
        ),
        {
          type: "open",
          q: "Math Is… Modeling: What is another way to represent the problem?",
          vis: {
            kind: "bar",
            rows: [
              {
                segs: [
                  { t: "3,245 g", v: 3245 },
                  { t: "?", v: 1755, q: true },
                ],
              },
            ],
            total: { t: "5,000 g" },
          },
          // unverified: a model answer, the book gives none
          a: "A bar diagram: the whole bar is 5,000 g, one part is 3,245 g, the other part is the vases. Or one equation: 3,245 + x = 5,000.",
        },
        q(
          "Work Together: Jonah mixes 500 milliliters of honey with 4 liters of tea. How many milliliters of sweetened tea is that?",
          4500,
          "mL",
          ["4 L + 500 mL"],
          "4 L = 4,000 mL: 4000 + 500 = [4500] mL.",
        ),
        q(
          "He pours it equally into 5 containers. How many milliliters are in each container?",
          900,
          "mL",
          ["4,500 mL ÷ 5"],
          "4500 ÷ 5 = [900] mL.",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-5",
      t: "On My Own 1–6",
      en: "Metric problems",
      ic: "📏",
      from: "e-book 13-5 · On My Own 1–6",
      keep: true,
      items: [
        q(
          "Lacey walks {1 1/2} kilometers to school. Hsu walks 2 kilometers. How many meters do they walk in all?",
          3500,
          "meters",
          ["{1 1/2} km + 2 km", "1 km = 1,000 m"],
          "{1 1/2} km = 1,500 m, 2 km = 2,000 m: 1500 + 2000 = [3500] meters.",
        ),
        q(
          "Jeanette made 6 liters of soup. She serves 5,500 milliliters. How many milliliters remain?",
          500,
          "mL",
          ["6 L − 5,500 mL"],
          "6 L = 6,000 mL: 6000 − 5500 = [500] mL.",
        ),
        q(
          "A restaurant owner buys 8 sacks of potatoes of 5 kilograms each. How many grams of potatoes does he buy?",
          40000,
          "grams",
          ["8 × 5 kg"],
          "8 × 5 = 40 kg = 40 × 1,000 = [40000] grams.",
        ),
        q(
          "Niamh has 320 centimeters of red ribbon and 6,300 millimeters of blue ribbon. How many more millimeters of blue ribbon?",
          3100,
          "mm",
          ["red: 320 cm", "blue: 6,300 mm"],
          "320 cm = 3,200 mm: 6300 − 3200 = [3100] mm.",
        ),
        q(
          "STEM Connection: Saffron's recipe calls for 100 milliliters of olive oil. How many times can she make it with 1 liter?",
          10,
          "times",
          ["1 L ÷ 100 mL"],
          "1 L = 1,000 mL: 1000 ÷ 100 = [10] times.",
        ),
        q(
          "Sylvia mixes 30 milliliters of red dye and 40 milliliters of yellow dye. How many milliliters of orange dye will she have?",
          70,
          "mL",
          ["30 mL + 40 mL"],
          "30 + 40 = [70] mL.",
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 13-5",
      t: "On My Own 7–10",
      en: "A melon, a sister, a jug, berries",
      ic: "🍈",
      from: "e-book 13-5 · On My Own 7–10",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Terrance wants a melon that weighs 3,950 grams. His bag can hold 4 kilograms. Can he carry the melon in his bag?",
          a: true,
          yes: ["Yes, he can", "No, he can't"],
          vis: { kind: "lines", rows: ["melon: 3,950 g", "bag: 4 kg"] },
          x: "4 kg = 4,000 g. 3,950 is less than 4,000: yes.",
        },
        q(
          "A boy is 2 meters tall. His sister is one-half of his height. How many centimeters tall is his sister?",
          100,
          "cm",
          ["2 m", "{1/2} of it"],
          "2 m = 200 cm: 200 ÷ 2 = [100] cm.",
        ),
        q(
          "A jug holds 1 liter. There are 820 milliliters in it. How many more milliliters are needed to fill it?",
          180,
          "mL",
          ["1 L − 820 mL"],
          "1 L = 1,000 mL: 1000 − 820 = [180] mL.",
        ),
        {
          type: "mc",
          q: "Extend: Olivia can buy 1 kilogram of berries for $10 at the store, or 100 grams for $0.50 at the farmer's market. Which is a better buy?",
          opts: ["The farmer's market", "The store", "They cost the same"],
          vis: {
            kind: "lines",
            rows: ["store: 1 kg for $10", "market: 100 g for $0.50"],
          },
          x: "1 kg = 1,000 g = 10 × 100 g. At the market: 10 × $0.50 = $5. $5 is less than $10: the farmer's market.",
        },
        {
          type: "open",
          q: "Reflect: How do you know when it is necessary to convert units before solving a problem?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "When the problem uses two different units, like liters and milliliters, I convert to the smaller unit first so I can add or subtract.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 141–142",
      t: "Additional Practice 1–8",
      en: "Lesson 13-5",
      ic: "📘",
      from: "Practice Book p. 141–142",
      keep: true,
      items: [
        q(
          "Lydia's puppy has a mass of 8 kilograms. Her cat has a mass of 3,850 grams. What is the difference in grams?",
          4150,
          "grams",
          ["8 kg − 3,850 g"],
          "8 kg = 8,000 g: 8000 − 3850 = [4150] grams.",
        ),
        q(
          "A play starts at 6:30 p.m. and ends at 8:25 p.m. How many minutes long is the play?",
          115,
          "minutes",
          ["6:30 → 8:25"],
          "6:30 to 8:30 is 120 minutes, 5 minutes less: 120 − 5 = [115] minutes.",
        ),
        q(
          "Jody needs to knit 13 yards of yarn. She knits 9 feet each day for 4 days. How many more feet does she need to knit?",
          3,
          "feet",
          ["13 yd", "9 ft × 4 days", "1 yd = 3 ft"],
          "13 × 3 = 39 feet, 9 × 4 = 36 feet: 39 − 36 = [3] feet.",
        ),
        q(
          "Gina's bottle holds 2 liters. She drinks 750 milliliters. How many milliliters are left?",
          1250,
          "mL",
          ["2 L − 750 mL"],
          "2 L = 2,000 mL: 2000 − 750 = [1250] mL.",
        ),
        q(
          "Elena runs {3 1/2} miles on Sunday and 5 miles on Monday. How many more feet does she run on Monday? (1 mile = 5,280 feet)",
          7920,
          "feet",
          ["5 mi − {3 1/2} mi", "1 mi = 5,280 ft"],
          "5 − {3 1/2} = {1 1/2} miles. 5280 + 2640 = [7920] feet.",
        ),
        q(
          "Liam has 5 quarts of apple juice. He needs 13 pints. How many more pints does he need?",
          3,
          "pints",
          ["5 qt", "13 pt", "1 qt = 2 pt"],
          "5 × 2 = 10 pints: 13 − 10 = [3] pints.",
        ),
        q(
          "Rosemary lives 8 kilometers from the library, Callie 6.5 kilometers. How many meters closer is Callie's house?",
          1500,
          "meters",
          ["8 km − 6.5 km"],
          "8 km = 8,000 m, 6.5 km = 6,500 m: 8000 − 6500 = [1500] meters.",
        ),
        {
          type: "num",
          q: "Lloyd has $10.75 to buy 3 gallons of milk. The store sells quarts for $1. How much more money does Lloyd need?",
          pre: "$",
          a: 1.25,
          vis: {
            kind: "lines",
            rows: ["3 gal of milk", "$1 a quart", "he has $10.75"],
          },
          x: "3 gallons = 12 quarts = $12. 12.00 − 10.75 = [1.25].",
        },
      ],
    },
  ],
};
