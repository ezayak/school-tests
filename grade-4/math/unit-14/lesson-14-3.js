// Math · Grade 4 · Lesson 14-3 « Draw and Measure Angles » (Reveal Math, Unit 14 « Geometric Figures »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1719–k1767), Practice Book p. 159–160. No teacher's key.
// The e-book's "Move the protractor" items (Work Together, On My Own 1–4) draw a new angle each time the page loads: the lesson uses its own angles.
// Practice Book 1–4 and Sam's stretch (9) are measured on the PDF's vector lines (66°, 131°, 33°, 8°, 39°).
// Drawing tasks (On My Own 5–8 and 11, Practice Book 5–8) are left out. Log: grade-4/math/SOURCES.md.
// an angle of deg degrees on a protractor: one ray on 0° at the right (from = 0) or at the left (from = 180), the other deg further;
// base: where the first ray is when it is on neither 0 (Erica's angle); plain: no protractor, an arc instead
const meas = (deg, from = 0, base, plain = false) => {
  const v = [150, 140],
    R = 138;
  const start = base !== undefined ? base : from;
  const dir = from === 180 ? -1 : 1;
  const pt = (d) => [
    v[0] + R * Math.cos((d * Math.PI) / 180),
    v[1] - R * Math.sin((d * Math.PI) / 180),
  ];
  return {
    kind: "geo",
    w: 300,
    h: 150,
    items: [
      plain
        ? { t: "arc", v, a: pt(start), b: pt(start + dir * deg), r: 22 }
        : { t: "prot", c: v, r: 112, in: from === 180 },
      { t: "ray", a: v, b: pt(start) },
      { t: "ray", a: v, b: pt(start + dir * deg) },
      { t: "pt", p: v },
    ],
  };
};
// what is the measure of the angle
const measQ = (q, deg, from = 0, more = {}) => ({
  type: "num",
  q,
  a: deg,
  post: "°",
  vis: meas(deg, from),
  x:
    from === 180
      ? `One ray is on 0 at the [left]: read the inner numbers. The other ray is at [${deg}]°.`
      : `One ray is on 0 at the [right]: read the outer numbers. The other ray is at [${deg}]°.`,
  ...more,
});
// neither ray on 0: subtract
const subQ = (q, lo, hi, more = {}) => ({
  type: "num",
  q,
  a: hi - lo,
  post: "°",
  vis: meas(hi - lo, 0, lo),
  x: `The rays are at ${lo}° and ${hi}°: ${hi} − ${lo} = [${hi - lo}]°.`,
  ...more,
});
const kind = (d) => (d < 90 ? "acute" : d === 90 ? "right" : "obtuse");

window.LESSON = {
  n: "14-3",
  key: "math4-l14-3",
  grade: 4,
  title: "Draw and Measure Angles",
  en: "Measure angles in degrees with a protractor",
  unit: "Unit 14 · Lesson 14-3",
  book: "e-book Lesson 14-3 · Practice Book p. 159–160",
  imgDir: "img/lesson-14-3",
  cover: "curious",
  question: {
    q: "How would you explain to a friend what it means to [measure an angle]?",
    // unverified: a model answer, the book gives none
    a: "To measure an angle is to find how many [degrees] it turns. Put the protractor's center on the vertex, one ray on 0, and read the number on the other ray.",
    img: "curious",
  },
  words: [
    { w: "Degree (°)", m: "the unit for measuring angles; a circle is 360°" },
    { w: "Unit angle", m: "an angle of 1°: {1/360} of a circle" },
    { w: "Protractor", m: "a tool for measuring and drawing angles" },
    { w: "Vertex", m: "the point where the two rays of an angle meet" },
  ],
  ideas: [
    {
      t: "A protractor",
      ic: "📐",
      img: "curious",
      lines: ["Keisha wants to measure an angle.", "She uses a [protractor]."],
    },
    {
      t: "Degrees",
      ic: "⭕",
      lines: [
        "We measure angles in [degrees] (°).",
        "A whole circle is [360°].",
        "1° is {1/360} of a circle: a [unit angle].",
      ],
      vis: meas(90),
    },
    {
      t: "Step 1",
      ic: "1️⃣",
      lines: [
        "Put the [center] of the protractor on the [vertex]: the point where the rays meet.",
      ],
      vis: meas(60),
    },
    {
      t: "Step 2",
      ic: "2️⃣",
      lines: ["Line up [one ray] with [0°]."],
      vis: meas(60),
    },
    {
      t: "Step 3",
      ic: "3️⃣",
      lines: [
        "Find the tick mark on the [other ray].",
        "This angle measures [60°].",
      ],
      vis: meas(60),
    },
    {
      t: "Which numbers?",
      ic: "🔢",
      lines: [
        "Start from the 0 that is on a ray.",
        "0 at the right: the [outer] numbers. 0 at the left: the [inner] numbers.",
        "This angle measures [45°].",
      ],
      vis: meas(45, 180),
    },
    {
      t: "No ray on 0?",
      ic: "➖",
      lines: ["Read both rays and [subtract].", "30° − 10° = [20°]."],
      vis: meas(20, 0, 10),
    },
  ],

  games: [
    {
      k: "read",
      t: "Read the protractor",
      en: "One ray on 0 at the right",
      ic: "📐",
      items: [40, 75, 120, 155, 25, 90, 108, 63].map((d) =>
        measQ("What is the measure of the angle?", d),
      ),
    },
    {
      k: "left",
      t: "0 at the left",
      en: "Read the inner numbers",
      ic: "⬅️",
      items: [50, 135, 20, 100, 70, 160].map((d) =>
        measQ("What is the measure of the angle?", d, 180),
      ),
    },
    {
      k: "sub",
      t: "No ray on 0",
      en: "Read both rays and subtract",
      ic: "➖",
      items: [
        [20, 65],
        [10, 95],
        [30, 150],
        [40, 70],
        [15, 120],
      ].map(([lo, hi]) => subQ("What is the measure of the angle?", lo, hi)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 14-3",
      t: "Be Curious",
      en: "A protractor",
      ic: "📐",
      from: "e-book 14-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "I notice a half circle with numbers from 0 to 180, two times: one row from the right, one row from the left. I wonder how to use it to measure an angle.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 14-3",
      t: "Learn: Keisha's angle",
      en: "Degrees and the protractor",
      ic: "📐",
      from: "e-book 14-3 · Learn",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Keisha wants to measure an angle. What tool can she use?",
          opts: ["A protractor", "A ruler", "A clock"],
          img: "curious",
          x: "A [protractor] measures angles in degrees.",
        },
        {
          type: "num",
          q: "A circle is how many degrees?",
          a: 360,
          post: "°",
          vis: meas(90),
          x: "A whole circle is [360]°.",
        },
        {
          type: "mc",
          q: "A unit angle measures 1°. What part of a circle is it?",
          opts: ["{1/360}", "{1/180}", "{1/100}", "{1/4}"],
          vis: meas(1),
          x: "A circle is 360°, so 1° is {1/360} of it.",
        },
        measQ(
          "Keisha lines up one ray with 0°. What does this angle measure?",
          60,
        ),
        {
          type: "open",
          q: "Math Is… Choosing Tools: How does a protractor help you measure an angle?",
          vis: meas(60),
          // unverified: a model answer, the book gives none
          a: "It has a scale of degrees from 0 to 180. Put the center on the vertex and one ray on 0, then the other ray points to the measure.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 14-3",
      t: "Work Together",
      en: "Move the protractor",
      ic: "🤝",
      from: "e-book 14-3 · Work Together",
      keep: true,
      // the e-book draws a new angle each time: these are the lesson's own
      items: [
        measQ(
          "Move the protractor to measure the angle. What is the measure?",
          135,
        ),
        measQ("What is the measure of the angle?", 55, 180),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 14-3",
      t: "On My Own 1–4",
      en: "Measure the angle",
      ic: "📐",
      from: "e-book 14-3 · On My Own 1–4",
      keep: true,
      // the e-book draws a new angle each time: these are the lesson's own
      items: [
        measQ("Measure the angle.", 165, 180),
        measQ("Measure the angle.", 125),
        measQ("Measure the angle.", 35),
        measQ("Measure the angle.", 72, 180),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 14-3",
      t: "On My Own 9–10",
      en: "Alex's obtuse angle, Erica's mistake",
      ic: "⚠️",
      from: "e-book 14-3 · On My Own 9–10",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Alex drew an obtuse angle. Which of the following could be its measure?",
          opts: ["127°", "34°", "90°"],
          keep: ["127°", "34°", "90°"],
          vis: meas(127, 0, undefined, true),
          x: "An obtuse angle is more than 90°: [127°]. 34° is acute, 90° is right.",
        },
        {
          type: "tf",
          q: "Error Analysis: Erica states that the angle shown has a measure of 28°. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: meas(18, 0, 10),
          // unverified: no key; the rays are at 10° and 28° on the book's protractor
          x: "The bottom ray is at 10°, not at 0°. Erica read only the top ray (28°).",
        },
        subQ("What is the real measure of Erica's angle?", 10, 28),
        {
          type: "open",
          q: "Reflect: How would you explain to a friend what it means to measure an angle?",
          vis: meas(60),
          // unverified: a model answer, the book gives none
          a: "Measuring an angle means finding how many degrees one ray turns from the other. Put the protractor's center on the vertex, one ray on 0, and read the number on the other ray.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 159–160",
      t: "Additional Practice 1–4, 9",
      en: "Lesson 14-3",
      ic: "📘",
      from: "Practice Book p. 159–160",
      keep: true,
      items: [
        measQ("Use a protractor to measure the angle.", 66),
        measQ("Use a protractor to measure the angle.", 131),
        // the book's angle: rays at 102° and 135°; turned here so one ray is on 0
        measQ("Use a protractor to measure the angle.", 33, 180),
        measQ("Use a protractor to measure the angle.", 8),
        {
          type: "num",
          q: "Sam raises his legs. Measure the angle.",
          a: 39,
          post: "°",
          vis: meas(39),
          x: "The legs are at [39]° from the floor.",
        },
        {
          type: "tf",
          q: "Sam must raise his legs to greater than a 30 degree angle. Is Sam performing the stretch properly?",
          a: true,
          yes: ["Yes, he is", "No, he is not"],
          img: "sam",
          // unverified: no key; the angle measures 39° on the PDF's lines
          x: `His legs make a 39° angle: 39° is greater than 30°. It is ${kind(39)}.`,
        },
      ],
    },
  ],
};
