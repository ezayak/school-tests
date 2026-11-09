// Math · Grade 4 · Lesson 2-4 « Round Multi-Digit Numbers » (Reveal Math, Unit 2).
// Sources: Student Edition Vol. 1 p. 45–48, Student Practice Book p. 7–8, the teacher's key for p. 47–48 (Term 1/20261005-L_2-4.pdf, every answer matches;
// its sample answers are the right choices of the "what could the number be" questions). Log: grade-4/math/SOURCES.md.
// Rounding is made by shared/math-kit.js (roundQ: the answer worked out, a number line with the point hidden).
const { fmt, roundQ } = MathKit;
// "Which numbers round to about N?" (choose all)
const about = (q, ok, no) => ({
  type: "multi",
  q,
  opts: [
    ...ok.map((n) => ({ t: fmt(n), ok: true, emoji: "✅" })),
    ...no.map((n) => ({ t: fmt(n), emoji: "🤔" })),
  ],
});

window.LESSON = {
  n: "2-4",
  key: "math4-l2-4",
  grade: 4,
  title: "Round Big Numbers",
  en: "Round to any place with place value or a number line, and choose a good estimate",
  unit: "Unit 2 · Lesson 2-4",
  book: "Book p. 45–48 · Practice Book p. 7–8",
  imgDir: "img/lesson-2-4",
  cover: "visitors",
  question: {
    q: "How do I [round] a big number to make a good [estimate]?",
    a: "Look at the digit on the [right] of the rounding place: 5–9 round up, 0–4 stay. 63,723 to the nearest thousand: the 7 says up → [64,000].",
    img: "visitors",
  },
  words: [
    { w: "Round", m: "change to a close, easy number: 63,723 ≈ 64,000" },
    {
      w: "Estimate",
      m: "a number that is close to the real one: about 64,000",
    },
    { w: "About", m: "close to, not exact" },
    {
      w: "Halfway",
      m: "the middle: 63,500 is halfway between 63,000 and 64,000",
    },
    { w: "Nearest thousand", m: "the closest number that ends in 000" },
    {
      w: "Number line",
      m: "a line with numbers in order; we see which end is closer",
    },
  ],
  ideas: [
    {
      t: "About 40,000 or about 35,000?",
      ic: "🏛️",
      lines: [
        "One director says [about 40,000] visitors. Another says [about 35,000].",
        "They both [round] the real number, to different places.",
        "35,400 → about 40,000 (ten thousands) and about [35,000] (thousands).",
      ],
      vis: { kind: "nline", lo: 30000, hi: 40000, n: 35400 },
    },
    {
      t: "Round with place value",
      ic: "🎯",
      img: "visitors",
      lines: [
        "63,723 to the nearest [ten thousand]: look at the 3 → stay → 60,000.",
        "63,723 to the nearest [thousand]: look at the 7 → up → 64,000.",
        "The places on the right become [0].",
      ],
    },
    {
      t: "Round with a number line",
      ic: "📏",
      lines: [
        "63,723 is between 63,000 and 64,000.",
        "Halfway is [63,500]. 63,723 is past halfway.",
        "It is closer to [64,000]. Order 64,000 T-shirts.",
      ],
      vis: { kind: "nline", lo: 63000, hi: 64000, n: 63723 },
    },
    {
      t: "Halfway goes up",
      ic: "⬆️",
      lines: [
        "385,000 is halfway between 380,000 and 390,000.",
        "A number at halfway rounds [up]: 385,000 → 390,000.",
        "384,264 is before halfway → [380,000].",
      ],
      vis: { kind: "nline", lo: 380000, hi: 390000, n: 384264 },
    },
    {
      t: "Which place?",
      ic: "🤔",
      lines: [
        "Round to a [smaller] place → closer to the real number.",
        "1,255 people need bottles: 1,000 is [too few]!",
        "Round up to 1,300 so everyone gets one.",
      ],
      vis: { kind: "nline", lo: 1200, hi: 1300, n: 1255 },
    },
  ],

  games: [
    {
      k: "round",
      t: "Round it",
      en: "Use the number line",
      ic: "🎯",
      items: [
        [27391, 3],
        [27391, 2],
        [450612, 5],
        [450612, 4],
        [8849, 1],
        [72500, 3],
        [199950, 2],
        [615049, 4],
      ].map(([n, j]) => roundQ(n, j)),
    },
    {
      k: "closer",
      t: "Which is closer?",
      en: "Left end or right end",
      ic: "📏",
      items: [
        [4380, 4000, 5000],
        [16700, 16000, 17000],
        [235000, 230000, 240000],
        [91210, 91200, 91300],
        [508000, 500000, 600000],
        [62950, 62900, 63000],
      ].map(([n, lo, hi]) => {
        const r = hi - n <= n - lo ? hi : lo;
        return {
          type: "mc",
          q: `Is ${fmt(n)} closer to ${fmt(lo)} or to ${fmt(hi)}?`,
          opts: [fmt(r), fmt(r === hi ? lo : hi)],
          keep: [fmt(lo), fmt(hi)],
          two: true,
          vis: { kind: "nline", lo, hi, n, hide: true },
          x: `Halfway is ${fmt((lo + hi) / 2)}. ${fmt(n)} rounds to [${fmt(r)}].`,
        };
      }),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 45–48",
      t: "Be Curious",
      en: "About 40,000 or about 35,000?",
      ic: "🏛️",
      from: "Book p. 45 · Be Curious",
      keep: true,
      items: [
        about(
          "One director says about 40,000 visitors, another says about 35,000. Both are right. What could the real number be? Choose all.",
          [35400, 35100],
          [34800, 36200],
        ),
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          vis: { kind: "nline", lo: 30000, hi: 40000, n: 35400 },
          // unverified: p. 45 is not in the teacher's key
          a: "Both directors give an estimate, not the exact number. The first rounded to the nearest ten thousand, the second to the nearest thousand. I wonder what the real number was: something like 35,400.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 45–48",
      t: "Learn: T-shirts for the museum",
      en: "63,723 visitors",
      ic: "👕",
      from: "Book p. 46 · Learn",
      keep: true,
      items: [
        roundQ(63723, 4, "63,723 visitors: round to the nearest ten thousand."),
        roundQ(63723, 3, "63,723 visitors: round to the nearest thousand."),
        {
          type: "mc",
          q: "How many T-shirts should the director order for about 63,723 visitors?",
          opts: ["64,000", "60,000", "70,000"],
          img: "visitors",
          x: "Round to the nearest [thousand]: 64,000 is close, and there are enough T-shirts.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 45–48",
      t: "Work Together",
      en: "Water bottles for field day",
      ic: "🤝",
      from: "Book p. 46 · Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "1,528 students, but not all of them will take part in field day. What is a good number of water bottles to order?",
          opts: ["1,500", "2,000", "1,000"],
          vis: { kind: "nline", lo: 1500, hi: 1600, n: 1528, hide: true },
          // unverified: p. 46 is not in the teacher's key
          x: "1,528 rounded to the nearest [hundred] is 1,500. Not everyone comes, so 1,500 is enough; 2,000 is too many, 1,000 too few.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 45–48",
      t: "On My Own 1–4",
      en: "Round as asked",
      ic: "🎯",
      from: "Book p. 47 · On My Own 1–4",
      keep: true,
      items: [
        roundQ(478309, 3),
        roundQ(105201, 5),
        roundQ(95550, 4),
        roundQ(132847, 3),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 45–48",
      t: "On My Own 5–8",
      en: "What could the number be?",
      ic: "🏞️",
      from: "Book p. 47–48 · On My Own 5–8",
      keep: true,
      items: [
        about(
          "Denali National Park has about 650,000 visitors each year. What could the real number be? Choose all.",
          [647550, 653100],
          [656000, 644900],
        ),
        roundQ(
          238855,
          4,
          "The moon is 238,855 miles away. Round to the nearest ten thousand.",
        ),
        {
          type: "num",
          q: "About how many miles do the astronauts travel there and back?",
          a: 480000,
          post: "miles",
          vis: { kind: "lines", rows: ["240,000 + 240,000"] },
          x: "240,000 + 240,000 = [480,000]",
        },
        {
          type: "mc",
          q: "How accurate does the estimate need to be?",
          opts: [
            "Round to the nearest ten thousand: 480,000 is close",
            "Round to the nearest hundred thousand: 400,000",
          ],
          two: true,
          vis: { kind: "nline", lo: 200000, hi: 300000, n: 238855 },
          x: "Rounding to the hundred thousand gives 200,000 × 2 = 400,000: [too far] from the real 477,710 miles.",
        },
        about(
          "About 15,000 people live in a small town. What could the real number be? Choose all.",
          [14697, 15320],
          [16100, 13900],
        ),
        {
          type: "num",
          q: "Mae rounds a number to the thousands and gets 13,000. Eli rounds it to the hundreds and gets 12,600. What is the greatest number it can be?",
          a: 12649,
          vis: { kind: "nline", lo: 12600, hi: 12700, n: 12649, hide: true },
          x: "12,6__ rounds to 12,600 when the tens are 0–4: the greatest is [12,649]. It rounds to 13,000 too.",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 45–48",
      t: "On My Own 9–12",
      en: "Good estimates",
      ic: "🧠",
      from: "Book p. 48 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Anna's family will fly 4,387 miles. What is a reasonable estimate of the distance?",
          opts: ["4,400 miles", "400 miles", "43,870 miles"],
          vis: { kind: "nline", lo: 4300, hi: 4400, n: 4387, hide: true },
          x: "4,387 rounded to the nearest hundred is [4,400].",
        },
        {
          type: "mc",
          q: "A stadium has seats for about 100,000 visitors. What could the real number of seats be?",
          opts: ["96,600", "9,660", "966,000"],
          vis: { kind: "lines", rows: ["about 100,000"] },
          x: "96,600 rounded to the nearest ten thousand is [100,000].",
        },
        {
          type: "tf",
          q: "1,255 people are coming. Leon rounds to the nearest thousand and orders 1,000 water bottles. Is that a good plan?",
          a: false,
          yes: ["Yes, it is", "No, it is not"],
          vis: { kind: "nline", lo: 1000, hi: 2000, n: 1255 },
          x: "1,000 bottles are [fewer] than 1,255 people. He can order 1,300 bottles.",
        },
        {
          type: "num",
          q: "Students collected 1,475 cans. Their goal is 2,000 cans. About how many more cans do they need?",
          a: 500,
          post: "cans",
          vis: { kind: "nline", lo: 1400, hi: 1500, n: 1475, hide: true },
          x: "1,475 ≈ 1,500. 2,000 − 1,500 = [500]",
        },
        {
          type: "open",
          q: "Reflect: How did you use what you already know about rounding in this lesson?",
          vis: { kind: "nline", lo: 63000, hi: 64000, n: 63723 },
          // unverified: the key says "answers may vary"
          a: "I already knew how to round to tens and hundreds. Big numbers work the same way: look at the digit to the right of the place. 5 or more rounds up.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 7–8",
      t: "Additional Practice 1–4",
      en: "Lesson 2-4",
      ic: "📘",
      from: "Practice Book p. 7–8",
      keep: true,
      items: [
        ...[125250, 485649, 518341, 826341].flatMap((n) =>
          [5, 4, 3].map((j) => roundQ(n, j)),
        ),
        {
          type: "num",
          q: "A company mails 16,743 letters. Envelopes come in boxes of one thousand. How many envelopes should it buy to have enough?",
          a: 17000,
          post: "envelopes",
          vis: { kind: "nline", lo: 16000, hi: 17000, n: 16743, hide: true },
          x: "16 boxes are not enough. Round [up]: 17 boxes = [17,000].",
        },
        {
          type: "mc",
          q: "A food bank collects 324,887 items in a year, and about the same next year. About how many items in the 2 years?",
          opts: ["About 650,000", "About 324,887", "About 900,000"],
          vis: { kind: "nline", lo: 320000, hi: 330000, n: 324887 },
          // unverified: no key for the Practice Book
          x: "324,887 ≈ 325,000. 325,000 + 325,000 = [650,000].",
        },
        {
          type: "mc",
          q: "There are 163,641 students, and new students come during the year. How many agenda books should the district buy?",
          opts: ["About 164,000", "About 160,000", "About 163,000"],
          vis: { kind: "nline", lo: 163000, hi: 164000, n: 163641 },
          // unverified: no key for the Practice Book
          x: "Round [up] to the nearest thousand: 164,000 books are enough for everyone, with some extra for new students.",
        },
      ],
    },
  ],
};
