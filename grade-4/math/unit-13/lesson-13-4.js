// Math · Grade 4 · Lesson 13-4 « Convert Units of Time » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1284–k1317; On My Own 9–10 from the frames
// f08631–f08652), Practice Book p. 139–140. No teacher's key. Log: grade-4/math/SOURCES.md.
const U = {
  h: ["hours", "minutes", 60, "1 hour = 60 minutes"],
  min: ["minutes", "seconds", 60, "1 minute = 60 seconds"],
  d: ["days", "hours", 24, "1 day = 24 hours"],
};
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
const back = (q, n, u) => {
  const [big, small, f, rule] = U[u];
  return {
    type: "num",
    q: q || "What number makes the equivalence true?",
    post: `${big} = ${n} ${small}`,
    a: n / f,
    vis: { kind: "lines", rows: [rule, `? × ${f} = ${n}`] },
    x: `${rule}: ${n} ÷ ${f} = [${n / f}] ${big}.`,
  };
};
// a mixed number of hours or minutes: whole × 60 + half
const half = (q, w, u, post, more = {}) => {
  const [big, small, f] = U[u];
  return {
    type: "num",
    q,
    a: w * f + f / 2,
    post,
    vis: {
      kind: "lines",
      rows: [
        `{${w} 1/2} × ${f} = (${w} + {1/2}) × ${f}`,
        `= (${w} × ${f}) + ({1/2} × ${f})`,
      ],
    },
    x: `${w} × ${f} = ${w * f}, {1/2} × ${f} = ${f / 2}: ${w * f} + ${f / 2} = [${w * f + f / 2}] ${small}.`,
    ...more,
  };
};
const CMP = ["<", "=", ">"];
const cmpQ = (a, b, sign, x) => ({
  type: "mc",
  q: `Compare. Use <, > or =.`,
  opts: [sign, ...CMP.filter((o) => o !== sign)],
  keep: CMP,
  vis: { kind: "lines", rows: [`${a}  ?  ${b}`] },
  x,
});

window.LESSON = {
  n: "13-4",
  key: "math4-l13-4",
  grade: 4,
  title: "Units of Time",
  en: "Hours to minutes, minutes to seconds",
  unit: "Unit 13 · Lesson 13-4",
  book: "e-book Lesson 13-4 · Practice Book p. 139–140",
  imgDir: "img/lesson-13-4",
  cover: "curious",
  question: {
    q: "How do you convert [larger] units of time to [smaller] units?",
    // unverified: a model answer, the book gives none
    a: "Multiply: hours × 60 = minutes, minutes × 60 = seconds, days × 24 = hours. For a half, add half of 60: 30.",
    img: "curious",
  },
  words: [
    { w: "Hour (h)", m: "1 hour = 60 minutes" },
    { w: "Minute (min)", m: "1 minute = 60 seconds" },
    { w: "Second (s)", m: "a very short unit of time" },
    { w: "Day", m: "1 day = 24 hours" },
  ],
  ideas: [
    {
      t: "Which doesn't belong?",
      ic: "⏰",
      img: "curious",
      lines: [
        "2 minutes, 2 hours, 120 seconds, 2 days.",
        "2 minutes and 120 seconds are the [same] time.",
      ],
    },
    {
      t: "Dora's trip",
      ic: "🚗",
      lines: [
        "Dora's family drove {3 1/2} hours to the beach.",
        "How many [minutes] is that?",
      ],
      vis: { kind: "lines", rows: ["1 h = 60 min", "1 min = 60 s"] },
    },
    {
      t: "Break it apart",
      ic: "🧩",
      lines: [
        "{3 1/2} × 60 = (3 × 60) + ({1/2} × 60)",
        "= 180 + 30 = [210] minutes.",
      ],
      vis: {
        kind: "lines",
        rows: ["3 × 60 = 180", "{1/2} × 60 = 30", "180 + 30 = 210"],
      },
    },
    {
      t: "Minutes to seconds",
      ic: "⏱️",
      lines: [
        "They took [7 minutes] to set up the picnic.",
        "7 × 60 = [420] seconds.",
      ],
      vis: { kind: "lines", rows: ["7 × 60 = 420"] },
    },
    {
      t: "Larger to smaller",
      ic: "💡",
      lines: [
        "Hours → minutes: [× 60].",
        "Minutes → seconds: [× 60].",
        "Days → hours: [× 24].",
      ],
      vis: {
        kind: "lines",
        rows: ["h → min: × 60", "min → s: × 60", "day → h: × 24"],
      },
    },
  ],

  games: [
    {
      k: "conv",
      t: "Convert the time",
      en: "× 60, × 24",
      ic: "⏰",
      items: [
        conv("", 3, "h"),
        conv("", 8, "min"),
        conv("", 2, "d"),
        conv("", 12, "h"),
        conv("", 5, "min"),
        conv("", 9, "h"),
      ],
    },
    {
      k: "cmp",
      t: "Which is longer?",
      en: "Convert, then compare",
      ic: "⚖️",
      items: [
        cmpQ("2 h", "100 min", ">", "2 h = 120 min, 120 > 100."),
        cmpQ("3 min", "180 s", "=", "3 min = 3 × 60 = 180 s."),
        cmpQ("5 min", "320 s", "<", "5 min = 300 s, 300 < 320."),
        cmpQ("1 day", "20 h", ">", "1 day = 24 h, 24 > 20."),
        cmpQ("90 min", "2 h", "<", "2 h = 120 min, 90 < 120."),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-4",
      t: "Be Curious",
      en: "Four notes",
      ic: "📝",
      from: "e-book 13-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Which doesn't belong?",
          img: "curious",
          // unverified: the book takes any answer with a reason
          a: "2 days: it is the only long time with days. Or 2 hours. 2 minutes and 120 seconds are the same time (2 × 60 = 120), so they belong together.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-4",
      t: "Learn and Work Together",
      en: "Dora's trip; tables",
      ic: "🚗",
      from: "e-book 13-4 · Learn, Work Together",
      keep: true,
      items: [
        half(
          "Dora's family drove {3 1/2} hours. How many minutes did they spend driving?",
          3,
          "h",
          "minutes",
        ),
        conv(
          "Dora's family took 7 minutes to set up their picnic. How many seconds is that?",
          7,
          "min",
        ),
        {
          type: "open",
          q: "Math Is… Quantities: Why does the number of units increase when converting to smaller units?",
          vis: { kind: "lines", rows: ["7 min = 420 s"] },
          // unverified: a model answer, the book gives none
          a: "A smaller unit is shorter, so you need more of them for the same time: each minute is 60 seconds.",
        },
        ...[2, 3, 4, 5].map((n) =>
          conv("Work Together: complete the table, hours to minutes.", n, "h"),
        ),
        ...[2, 3, 4, 5].map((n) =>
          conv(
            "Work Together: complete the table, minutes to seconds.",
            n,
            "min",
          ),
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-4",
      t: "On My Own 1–10",
      en: "Convert and compare",
      ic: "⏱️",
      from: "e-book 13-4 · On My Own 1–10",
      keep: true,
      items: [
        conv("", 5, "h"),
        conv("", 10, "min"),
        conv("", 7, "h"),
        conv("", 6, "min"),
        back("", 360, "h"),
        back("", 900, "h"),
        conv(
          "Salma volunteered for 4 hours last weekend. How many minutes did she volunteer?",
          4,
          "h",
        ),
        {
          type: "open",
          q: "When a timer reads 8 minutes, that is 480 seconds. Why is the number of seconds greater than the number of minutes?",
          vis: { kind: "lines", rows: ["8 min = 480 s"] },
          // unverified: a model answer, the book gives none
          a: "A second is much shorter than a minute: 60 seconds make 1 minute. So 8 minutes are 8 × 60 = 480 seconds.",
        },
        {
          type: "mc",
          q: "Lola sang a song that was 4 minutes long. Selina sang a song that was 220 seconds long. Who sang longer?",
          opts: ["Lola", "Selina", "They sang the same time"],
          vis: { kind: "lines", rows: ["Lola: 4 min", "Selina: 220 s"] },
          x: "4 × 60 = 240 seconds. 240 is more than 220: Lola sang longer.",
        },
        {
          type: "num",
          q: "In a {1/2}-mile relay, Chad runs the first part in 3 minutes, Nathan runs the second part in 150 seconds. Chad took longer. How many seconds longer?",
          a: 30,
          post: "seconds",
          vis: { kind: "lines", rows: ["Chad: 3 min", "Nathan: 150 s"] },
          x: "3 × 60 = 180 seconds. 180 − 150 = [30] seconds longer.",
        },
      ],
    },
    {
      k: "own11",
      g: "📗 Book · Lesson 13-4",
      t: "On My Own 11–15",
      en: "Kyle, Leann, Diane, Stacy",
      ic: "⏲️",
      from: "e-book 13-4 · On My Own 11–15",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Error Analysis: Kyle converted {4 1/4} hours to 244 minutes. Do you agree with Kyle?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["{4 1/4} h = 244 min ?"] },
          x: "4 × 60 = 240 and {1/4} × 60 = 15: 240 + 15 = 255 minutes, not 244. Kyle added 4 instead of {1/4} of an hour.",
        },
        {
          type: "num",
          q: "Leann spent 3 hours online last week, the same time on each of 5 days. How many minutes did she spend online in a day?",
          a: 36,
          post: "minutes",
          vis: { kind: "lines", rows: ["3 h in 5 days"] },
          x: "3 × 60 = 180 minutes. 180 ÷ 5 = [36] minutes a day.",
        },
        half(
          "Diane boiled an egg for {9 1/2} minutes. For how many seconds did she boil the egg?",
          9,
          "min",
          "seconds",
        ),
        conv(
          "Stacy reads a page in 3 minutes. How many seconds does it take?",
          3,
          "min",
        ),
        conv(
          "Extend: There are 24 hours in one day. How many minutes are there in one day?",
          24,
          "h",
        ),
        {
          type: "open",
          q: "Reflect: How do you convert larger units of time to smaller units?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "Multiply by how many small units are in one large unit: hours × 60 for minutes, minutes × 60 for seconds.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 139–140",
      t: "Additional Practice 1–6",
      en: "Lesson 13-4",
      ic: "📘",
      from: "Practice Book p. 139–140",
      keep: true,
      items: [
        ...[3, 6, 9, 12].map((n) =>
          conv("Complete the table: minutes to seconds.", n, "min"),
        ),
        ...[2, 4, 6, 8].map((n) =>
          conv("Complete the table: hours to minutes.", n, "h"),
        ),
        cmpQ("300 min", "3 h", ">", "3 h = 180 min, 300 > 180."),
        cmpQ("190 s", "4 min", "<", "4 min = 240 s, 190 < 240."),
        cmpQ("480 min", "8 h", "=", "8 h = 8 × 60 = 480 min."),
        cmpQ("20 min", "750 s", ">", "20 min = 1,200 s, 1,200 > 750."),
        half(
          "Tasha sleeps {8 1/2} hours each night. How many minutes does she sleep?",
          8,
          "h",
          "minutes",
        ),
        conv(
          "Felix runs for 15 minutes each day. How many seconds does he run?",
          15,
          "min",
        ),
        {
          type: "tf",
          q: "Kelly should practice the piano for 20 minutes. She practices for 1,100 seconds. Does she practice for the required time?",
          a: false,
          yes: ["Yes, she does", "No, she doesn't"],
          vis: { kind: "lines", rows: ["20 min", "1,100 s"] },
          x: "20 × 60 = 1,200 seconds. 1,100 is less than 1,200: not enough.",
        },
        {
          type: "mc",
          q: "Amie takes {2 1/2} hours to make an art project. Renee takes 135 minutes. Who takes more time?",
          opts: ["Amie", "Renee", "They take the same time"],
          vis: { kind: "lines", rows: ["Amie: {2 1/2} h", "Renee: 135 min"] },
          x: "{2 1/2} hours = 120 + 30 = 150 minutes. 150 is more than 135: Amie.",
        },
      ],
    },
  ],
};
