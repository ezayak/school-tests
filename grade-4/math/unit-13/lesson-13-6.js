// Math · Grade 4 · Lesson 13-6 « Solve More Problems That Involve Units of Measure » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1369–k1403), Practice Book p. 143–144.
// No teacher's key. Log: grade-4/math/SOURCES.md.
const q = (text, a, post, rows, x, more = {}) => ({
  type: "num",
  q: text,
  a,
  post,
  vis: { kind: "lines", rows },
  x,
  ...more,
});
// elapsed time in minutes on an open number line: whole hours, then the minutes left
const elapsed = (text, from, to, hours, mins, more = {}) =>
  q(
    text,
    hours * 60 + mins,
    "minutes",
    [`${from} → ${to}`, `${hours} h and ${mins} min`],
    `From ${from} to ${to}: ${hours} hours and ${mins} minutes. ${hours} × 60 + ${mins} = [${hours * 60 + mins}] minutes.`,
    more,
  );

window.LESSON = {
  n: "13-6",
  key: "math4-l13-6",
  grade: 4,
  title: "More Measurement Problems",
  en: "Elapsed time, tables and mixed units",
  unit: "Unit 13 · Lesson 13-6",
  book: "e-book Lesson 13-6 · Practice Book p. 143–144",
  imgDir: "img/lesson-13-6",
  cover: "curious",
  question: {
    q: "How does finding [elapsed time] on a number line compare to using a number line for other units of measure?",
    // unverified: a model answer, the book gives none
    a: "It is the same idea: jump from the start to the end and add the jumps. For time, the jumps are hours (60 minutes) and minutes, not 10s or 100s.",
    img: "curious",
  },
  words: [
    { w: "Elapsed time", m: "how much time passes from the start to the end" },
    {
      w: "Open number line",
      m: "a line with jumps you choose: 1 hour, 10 minutes",
    },
  ],
  ideas: [
    {
      t: "What could the question be?",
      ic: "🕒",
      img: "curious",
      lines: [
        "Two clocks: when the girls arrive, and when they leave.",
        "How much time [passed]?",
      ],
    },
    {
      t: "Lola's movie",
      ic: "🎬",
      lines: [
        "Lola watched a movie from [3:45 p.m.] to [5:55 p.m.].",
        "How long did she watch?",
      ],
      vis: { kind: "lines", rows: ["3:45 → 5:55"] },
    },
    {
      t: "Jump on a number line",
      ic: "➡️",
      lines: [
        "3:45 → 4:45: 1 hour. 4:45 → 5:45: 1 hour. 5:45 → 5:55: 10 minutes.",
        "Elapsed time: [2 hours and 10 minutes].",
      ],
      vis: {
        kind: "lines",
        rows: ["3:45 —1 h→ 4:45 —1 h→ 5:45 —10 min→ 5:55"],
      },
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Jump whole hours first, then the minutes.",
        "Change to one unit to add or compare: 2 h 10 min = [130] minutes.",
      ],
      vis: { kind: "lines", rows: ["2 × 60 + 10 = 130"] },
    },
  ],

  games: [
    {
      k: "time",
      t: "How long?",
      en: "Elapsed time in minutes",
      ic: "🕒",
      items: [
        elapsed(
          "How many minutes from 1:15 p.m. to 3:40 p.m.?",
          "1:15",
          "3:40",
          2,
          25,
        ),
        elapsed(
          "How many minutes from 9:30 a.m. to 10:05 a.m.?",
          "9:30",
          "10:05",
          0,
          35,
        ),
        elapsed(
          "How many minutes from 4:50 p.m. to 6:20 p.m.?",
          "4:50",
          "6:20",
          1,
          30,
        ),
        elapsed(
          "How many minutes from 7:10 a.m. to 10:00 a.m.?",
          "7:10",
          "10:00",
          2,
          50,
        ),
        elapsed(
          "How many minutes from 11:45 a.m. to 1:15 p.m.?",
          "11:45",
          "1:15",
          1,
          30,
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-6",
      t: "Be Curious",
      en: "Two clocks",
      ic: "🕒",
      from: "e-book 13-6 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: the book takes any question
          a: "How long were the girls in the room? Look at the time on the first clock and on the second clock, and find the time between them.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-6",
      t: "Learn and Work Together",
      en: "Lola's movie; Julian's reading log",
      ic: "🎬",
      from: "e-book 13-6 · Learn, Work Together",
      keep: true,
      items: [
        elapsed(
          "Lola watched a movie from 3:45 p.m. to 5:55 p.m. How many minutes did she watch?",
          "3:45",
          "5:55",
          2,
          10,
        ),
        {
          type: "open",
          q: "Math Is… Choosing Tools: How does the number line help find elapsed time?",
          vis: {
            kind: "lines",
            rows: ["3:45 —1 h→ 4:45 —1 h→ 5:45 —10 min→ 5:55"],
          },
          // unverified: a model answer, the book gives none
          a: "It shows each jump: whole hours first, then the minutes. Adding the jumps gives the elapsed time.",
        },
        q(
          "Work Together: Julian reads 2 hours each week. His log: Monday 32, Tuesday 18, Wednesday 26 minutes. How many more minutes does he need to read?",
          44,
          "minutes",
          ["2 h a week", "32 + 18 + 26 min"],
          "2 × 60 = 120 minutes. 32 + 18 + 26 = 76. 120 − 76 = [44] minutes.",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-6",
      t: "On My Own 1–6",
      en: "Dogs, soup, lace, garden, vine, berries",
      ic: "🐕",
      from: "e-book 13-6 · On My Own 1–6",
      keep: true,
      items: [
        q(
          "Derinda's dog weighs 4 pounds. Elizabeth's dog weighs {5 1/4} pounds. What is the combined weight in ounces?",
          148,
          "ounces",
          ["4 lb + {5 1/4} lb", "1 lb = 16 oz"],
          "4 + {5 1/4} = {9 1/4} pounds. 9 × 16 = 144, {1/4} × 16 = 4: 144 + 4 = [148] ounces.",
        ),
        q(
          "Fasil makes 3 gallons of soup and fills 1-quart containers. How many containers can he fill?",
          12,
          "containers",
          ["3 gal", "1 gal = 4 qt"],
          "3 × 4 = [12] quarts: 12 containers.",
        ),
        q(
          "Jasmine has {3 2/3} yards of lace for 5 pillows. She uses 20 inches for each pillow. How many inches of lace does she have left?",
          32,
          "inches",
          ["{3 2/3} yd", "1 yd = 36 in.", "5 × 20 in."],
          "3 × 36 = 108, {2/3} × 36 = 24: 132 inches. 5 × 20 = 100. 132 − 100 = [32] inches.",
        ),
        elapsed(
          "Helen worked in the garden from 2:20 p.m. to 6:15 p.m. How many minutes did she work?",
          "2:20",
          "6:15",
          3,
          55,
        ),
        q(
          "A vine grows {1/2} foot each week. How many inches does it grow in 6 weeks?",
          36,
          "inches",
          ["{1/2} ft each week", "1 ft = 12 in."],
          "{1/2} foot = 6 inches. 6 × 6 = [36] inches.",
        ),
        q(
          "Hannah has 3 quarts of blueberries and 7 pints of raspberries. How many pints of berries does she have?",
          13,
          "pints",
          ["3 qt + 7 pt", "1 qt = 2 pt"],
          "3 × 2 = 6 pints. 6 + 7 = [13] pints.",
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 13-6",
      t: "On My Own 7–10",
      en: "Elephant, soccer, swimmers, concert",
      ic: "🐘",
      from: "e-book 13-6 · On My Own 7–10",
      keep: true,
      items: [
        q(
          "How much more does a {6 1/2}-ton elephant weigh than an 8,000-pound hippopotamus?",
          5000,
          "pounds",
          ["{6 1/2} tons − 8,000 lb", "1 ton = 2,000 lb"],
          "{6 1/2} tons = 12,000 + 1,000 = 13,000 pounds. 13000 − 8000 = [5000] pounds.",
        ),
        elapsed(
          "One soccer game ends at 10:15 a.m. and the next starts at 1:20 p.m. How many minutes are there between the games?",
          "10:15",
          "1:20",
          3,
          5,
        ),
        {
          type: "mc",
          q: "Jess swam 400 yards in 14 minutes. Christina swam 960 feet in the same time. Who swam faster?",
          opts: ["Jess", "Christina", "They swam the same"],
          vis: {
            kind: "lines",
            rows: ["Jess: 400 yd", "Christina: 960 ft", "1 yd = 3 ft"],
          },
          x: "400 × 3 = 1,200 feet. 1,200 is more than 960 in the same time: Jess swam faster.",
        },
        {
          type: "mc",
          q: "Extend: A movie lasts 2 hours and 8 minutes and ends at 2:24 p.m. What time did the movie start?",
          opts: ["12:16 p.m.", "12:24 p.m.", "12:08 p.m.", "4:32 p.m."],
          vis: { kind: "lines", rows: ["? → 2:24 p.m.", "2 h 8 min"] },
          x: "2:24 back 2 hours is 12:24, back 8 more minutes is 12:16 p.m.",
        },
        q(
          "The concert is from 12:15 p.m. to 2:45 p.m. How much longer was the concert than the 2-hour-8-minute movie?",
          22,
          "minutes",
          ["concert: 12:15 → 2:45", "movie: 2 h 8 min"],
          "The concert: 2 hours 30 minutes = 150 minutes. The movie: 128 minutes. 150 − 128 = [22] minutes.",
        ),
        {
          type: "open",
          q: "Reflect: How does finding elapsed time on a number line compare to using a number line for other units of measure?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "Both times I jump from the start to the end and add the jumps. With time an hour is 60 minutes, so after :60 I go to the next hour.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 143–144",
      t: "Additional Practice 1–5",
      en: "Lesson 13-6",
      ic: "📘",
      from: "Practice Book p. 143–144",
      keep: true,
      items: [
        q(
          "Ellie makes 4 gallons of apple sauce and fills 1-pint containers. How many containers can she fill?",
          32,
          "containers",
          ["4 gal", "1 gal = 8 pt"],
          "4 × 8 = [32] pints: 32 containers.",
        ),
        {
          type: "mc",
          q: "Lisa's hockey practice lasts 1 hour and 31 minutes. Practice ends at 5:46 p.m. What time did practice start?",
          opts: ["4:15 p.m.", "4:31 p.m.", "3:15 p.m.", "7:17 p.m."],
          vis: { kind: "lines", rows: ["? → 5:46 p.m.", "1 h 31 min"] },
          x: "5:46 back 1 hour is 4:46, back 31 minutes is 4:15 p.m.",
        },
        {
          type: "mc",
          q: "Hannah ran 810 yards in 4 minutes. Justin ran 1,800 feet in the same time. Who ran faster?",
          opts: ["Hannah", "Justin", "They ran the same"],
          vis: {
            kind: "lines",
            rows: ["Hannah: 810 yd", "Justin: 1,800 ft", "1 yd = 3 ft"],
          },
          x: "810 × 3 = 2,430 feet. 2,430 is more than 1,800: Hannah ran faster.",
        },
        q(
          "Henry buys a 3-pound bag of flour. Eliza already has {2 1/2} pounds. How many ounces of flour do they have together?",
          88,
          "ounces",
          ["3 lb + {2 1/2} lb", "1 lb = 16 oz"],
          "3 + {2 1/2} = {5 1/2} pounds. 5 × 16 = 80, {1/2} × 16 = 8: 80 + 8 = [88] ounces.",
        ),
        q(
          "Heather buys {5 3/4} yards of fabric. She uses 30 inches for each costume. How many costumes can she make?",
          6,
          "costumes",
          ["{5 3/4} yd", "1 yd = 36 in.", "30 in. each"],
          "5 × 36 = 180, {3/4} × 36 = 27: 207 inches. 207 ÷ 30 = 6 R 27: [6] costumes.",
        ),
      ],
    },
  ],
};
