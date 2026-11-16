// Math · Grade 4 · Lesson 13-11 « Solve Problems Involving Data on a Line Plot » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1531–k1579), Practice Book p. 153–154.
// No teacher's key. Line plots redrawn (lplot). Log: grade-4/math/SOURCES.md.
const P = (title, ticks, xs) => ({ kind: "lplot", title, ticks, xs });
const Q4 = (w) => [`${w}`, `{${w} 1/4}`, `{${w} 2/4}`, `{${w} 3/4}`];
const MALE = P(
  "Length of Male Inchworm (in.)",
  ["{1/4}", "{2/4}", "{3/4}", "1", "{1 1/4}"],
  [1, 1, 2, 4, 3],
);
const FEMALE = P(
  "Length of Female Inchworm (in.)",
  ["{1/4}", "{2/4}", "{3/4}", "1", "{1 1/4}"],
  [1, 2, 1, 0, 4],
);
const CHI = P(
  "Rainfall (in.) in Chicago, IL",
  ["0", "{1/4}", "{2/4}", "{3/4}", "1"],
  [2, 1, 0, 4, 0],
);
const NYC = P(
  "Rainfall (in.) in New York City, NY",
  ["0", "{1/4}", "{2/4}", "{3/4}", "1"],
  [2, 4, 1, 0, 0],
);
const RUN = P(
  "Distance Caleb Runs (mi)",
  [...Q4(1), ...Q4(2), ...Q4(3), "4"],
  [0, 1, 2, 1, 2, 0, 4, 1, 1, 0, 0, 2, 0],
);
const MOVIE = P(
  "Movie Length (hours)",
  ["1", "{1 1/2}", "2", "{2 1/2}", "3"],
  [0, 1, 3, 2, 1],
);
const BAND = P(
  "Daily Practice Band (hr)",
  ["0", "{1/2}", "1", "{1 1/2}", "2"],
  [1, 1, 1, 2, 0],
);
const BASKET = P(
  "Daily Practice Basketball (hr)",
  ["0", "{1/2}", "1", "{1 1/2}", "2"],
  [0, 2, 1, 3, 1],
);
const BOOK = P(
  "Book Thickness (in.)",
  ["0", "{1/8}", "{2/8}", "{3/8}", "{4/8}", "{5/8}", "{6/8}", "{7/8}", "1"],
  [0, 1, 1, 1, 1, 3, 0, 2, 0],
);
const SMOOTHIE = P(
  "Amount (cups)",
  ["0", "{1/2}", "1", "{1 1/2}", "2", "{2 1/2}"],
  [0, 2, 1, 1, 0, 1],
);
const SUN = P(
  "Sunflower Height (ft)",
  [
    "8",
    "{8 1/8}",
    "{8 2/8}",
    "{8 3/8}",
    "{8 4/8}",
    "{8 5/8}",
    "{8 6/8}",
    "{8 7/8}",
    "9",
  ],
  [0, 1, 2, 1, 0, 1, 2, 2, 0],
);
const PBOOK = P(
  "Book Thickness (in.)",
  ["0", "{1/4}", "{2/4}", "{3/4}", "1", "{1 1/4}", "{1 2/4}", "{1 3/4}", "2"],
  [0, 1, 1, 1, 1, 1, 3, 0, 2],
);
// a fraction answer as a choice (the right one first)
const mcq = (q, opts, vis, x, more = {}) => ({
  type: "mc",
  q,
  opts,
  vis,
  x,
  ...more,
});

window.LESSON = {
  n: "13-11",
  key: "math4-l13-11",
  grade: 4,
  title: "Line Plot Problems",
  en: "Add and subtract fractions read from line plots",
  unit: "Unit 13 · Lesson 13-11",
  book: "e-book Lesson 13-11 · Practice Book p. 153–154",
  imgDir: "img/lesson-13-11",
  cover: "curious",
  question: {
    q: "How can you use data on a [line plot] to solve problems involving fractions?",
    // unverified: a model answer, the book gives none
    a: "Read the values from the ✕ marks. Subtract the least from the greatest for the difference, add all the values for the total.",
    img: "curious",
  },
  words: [
    { w: "Greatest value", m: "the ✕ furthest to the right" },
    { w: "Least value", m: "the ✕ furthest to the left" },
    { w: "Total", m: "add the value of every ✕" },
  ],
  ideas: [
    {
      t: "Inchworms",
      ic: "🐛",
      img: "curious",
      lines: [
        "Two line plots: male and female inchworms.",
        "We can compare them and do math with the fractions.",
      ],
    },
    {
      t: "Rainfall in two cities",
      ic: "🌧️",
      lines: [
        "Chicago: the greatest rainfall is [{3/4}] inch.",
        "New York City: the greatest is [{2/4}] inch.",
      ],
      vis: CHI,
    },
    {
      t: "The difference",
      ic: "➖",
      lines: ["{3/4} − {2/4} = [{1/4}] inch."],
      vis: NYC,
    },
    {
      t: "The total",
      ic: "➕",
      lines: [
        "Add every ✕ in New York City:",
        "0 + 0 + {1/4} + {1/4} + {1/4} + {1/4} + {2/4} = {6/4} = [{1 2/4}] inches.",
      ],
      vis: NYC,
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Difference: greatest − least.",
        "Total: add the value of every ✕ (3 ✕ above {1/4} is {3/4}).",
      ],
      vis: SUN,
    },
  ],

  games: [
    {
      k: "sun",
      t: "Sunflowers",
      en: "Read and subtract",
      ic: "🌻",
      items: [
        {
          type: "num",
          q: "How many sunflowers are there?",
          a: 9,
          vis: SUN,
          x: "1 + 2 + 1 + 1 + 2 + 2 = [9].",
        },
        mcq(
          "What is the difference between the tallest and the shortest sunflower?",
          ["{6/8} foot", "{7/8} foot", "1 foot", "{5/8} foot"],
          SUN,
          "{8 7/8} − {8 1/8} = {6/8} foot.",
        ),
        {
          type: "num",
          q: "How many sunflowers are taller than {8 1/2} feet?",
          a: 5,
          vis: SUN,
          x: "1 + 2 + 2 = [5] above {8 5/8}, {8 6/8}, {8 7/8}.",
        },
        mcq(
          "How much taller is the female inchworm's greatest length than the male's least length?",
          ["1 inch", "{3/4} inch", "{1 1/4} inches", "{1/2} inch"],
          FEMALE,
          "Female greatest {1 1/4}, male least {1/4}: {1 1/4} − {1/4} = 1 inch.",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-11",
      t: "Be Curious",
      en: "Inchworms",
      ic: "🐛",
      from: "e-book 13-11 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you see?",
          img: "curious",
          // unverified: the book takes any answer
          a: "Two line plots of inchworm lengths. Most male inchworms are 1 inch long; most female inchworms are {1 1/4} inches. No female is 1 inch.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-11",
      t: "Learn and Work Together",
      en: "Rainfall; Caleb's runs",
      ic: "🌧️",
      from: "e-book 13-11 · Learn, Work Together",
      keep: true,
      items: [
        mcq(
          "What is the difference between the greatest rainfall in New York City and the greatest rainfall in Chicago?",
          ["{1/4} inch", "{2/4} inch", "{3/4} inch", "1 inch"],
          CHI,
          "Chicago {3/4}, New York City {2/4}: {3/4} − {2/4} = {1/4} inch.",
        ),
        {
          type: "open",
          q: "Math Is… Precision: Why are there 7 ✕ in each of the line plots?",
          vis: NYC,
          // unverified: a model answer, the book gives none
          a: "The data is for one week, February 1–7: one ✕ for each of the 7 days.",
        },
        mcq(
          "What was New York City's total rainfall for the week?",
          ["{1 2/4} inches", "{6/8} inch", "{2/4} inch", "{1 1/4} inches"],
          NYC,
          "0 + 0 + {1/4} + {1/4} + {1/4} + {1/4} + {2/4} = {6/4} = {1 2/4} inches.",
        ),
        {
          type: "multi",
          q: "Work Together: Which two routes could Caleb combine to run {5 1/4} miles? Choose all.",
          vis: RUN,
          opts: [
            ["{1 2/4} and {3 3/4} miles", true],
            ["{2 2/4} and {2 3/4} miles", true],
            ["2 and 3 miles", false],
            ["{1 1/4} and {3 3/4} miles", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🏃" })),
          // unverified: no key; the pairs on the plot that make {5 1/4}
          x: "{1 2/4} + {3 3/4} = {5 1/4} and {2 2/4} + {2 3/4} = {5 1/4}. 2 + 3 = 5, {1 1/4} + {3 3/4} = 5.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-11",
      t: "On My Own 1–8",
      en: "Movies, band and basketball",
      ic: "🎬",
      from: "e-book 13-11 · On My Own 1–8",
      keep: true,
      items: [
        mcq(
          "What is the difference between the length of the longest movie and the shortest movie?",
          ["{1 1/2} hours", "2 hours", "1 hour", "{2 1/2} hours"],
          MOVIE,
          "3 − {1 1/2} = {1 1/2} hours.",
        ),
        mcq(
          "What is the combined length of the shortest movie and the longest movie?",
          ["{4 1/2} hours", "4 hours", "{3 1/2} hours", "5 hours"],
          MOVIE,
          "{1 1/2} + 3 = {4 1/2} hours.",
        ),
        mcq(
          "How long would you need to watch all the movies?",
          ["{15 1/2} hours", "15 hours", "{13 1/2} hours", "{16 1/2} hours"],
          MOVIE,
          "{1 1/2} + 2 + 2 + 2 + {2 1/2} + {2 1/2} + 3 = {15 1/2} hours.",
        ),
        {
          type: "tf",
          q: "If the two longest movies played one right after the other, could you watch both in 5 hours?",
          a: false,
          yes: ["Yes, you could", "No, you couldn't"],
          vis: MOVIE,
          x: "The two longest: 3 + {2 1/2} = {5 1/2} hours. That is more than 5.",
        },
        mcq(
          "How many hours were spent practicing band?",
          ["{4 1/2} hours", "5 hours", "4 hours", "{3 1/2} hours"],
          BAND,
          "0 + {1/2} + 1 + {1 1/2} + {1 1/2} = {4 1/2} hours.",
        ),
        mcq(
          "How many hours were spent practicing basketball?",
          ["{8 1/2} hours", "8 hours", "7 hours", "{7 1/2} hours"],
          BASKET,
          "{1/2} + {1/2} + 1 + {1 1/2} + {1 1/2} + {1 1/2} + 2 = {8 1/2} hours.",
        ),
        mcq(
          "To practice both for the same amount of time, which activity would you need to practice more? By how much?",
          [
            "Band, 4 hours more",
            "Basketball, 4 hours more",
            "Band, 3 hours more",
            "Basketball, 2 hours more",
          ],
          BASKET,
          "Basketball {8 1/2}, band {4 1/2}: {8 1/2} − {4 1/2} = 4. Band needs 4 more hours.",
        ),
        {
          type: "num",
          q: "How much time was spent practicing both activities in the week?",
          a: 13,
          post: "hours",
          vis: BAND,
          x: "{4 1/2} + {8 1/2} = [13] hours.",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 13-11",
      t: "On My Own 9–12",
      en: "Book thickness, Ella's smoothies",
      ic: "📚",
      from: "e-book 13-11 · On My Own 9–12",
      keep: true,
      items: [
        mcq(
          "What is the difference in thickness between the thickest book and the thinnest book?",
          ["{6/8} inch", "{7/8} inch", "{5/8} inch", "1 inch"],
          BOOK,
          "{7/8} − {1/8} = {6/8} inch.",
        ),
        mcq(
          "What is the combined thickness of the {5/8}-inch books?",
          ["{1 7/8} inches", "{1 5/8} inches", "{15/24} inch", "{5/8} inch"],
          BOOK,
          "3 books: {5/8} + {5/8} + {5/8} = {15/8} = {1 7/8} inches.",
        ),
        {
          type: "tf",
          q: "Error Analysis: Caleb says the combined thickness of all the books is {2 6/8} inches. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: BOOK,
          x: "{1/8} + {2/8} + {3/8} + {4/8} + {15/8} + {14/8} = {39/8} = {4 7/8} inches, not {2 6/8}.",
        },
        mcq(
          "Extend: Ella plotted the amounts of one ingredient of her 5 smoothie recipes. Which ingredient did she plot?",
          ["Almond milk", "Yogurt", "Banana", "Blueberries"],
          SMOOTHIE,
          "Almond milk: {1/2}, {1 1/2}, 1, {1/2}, {2 1/2} cups. That is the plot: 2 ✕ at {1/2}, one at 1, {1 1/2} and {2 1/2}.",
          { vis: undefined, img: "smoothies" },
        ),
        {
          type: "open",
          q: "Reflect: How can you use data on a line plot to solve problems involving fractions?",
          vis: BOOK,
          // unverified: a model answer, the book gives none
          a: "I read the fractions from the ✕ marks. I subtract to find a difference and add to find a total, like {5/8} + {5/8} + {5/8} = {1 7/8}.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 153–154",
      t: "Additional Practice 1–5",
      en: "Book thickness, Caleb's homework",
      ic: "📘",
      from: "Practice Book p. 153–154",
      keep: true,
      items: [
        mcq(
          "What is the difference between the thicknesses of the two thinnest books?",
          ["{1/4} inch", "{2/4} inch", "{3/4} inch", "1 inch"],
          PBOOK,
          "{2/4} − {1/4} = {1/4} inch.",
        ),
        mcq(
          "What is the difference between the thicknesses of the thickest and the thinnest book?",
          ["{1 3/4} inches", "2 inches", "{1 1/4} inches", "{1 2/4} inches"],
          PBOOK,
          "2 − {1/4} = {1 3/4} inches.",
        ),
        mcq(
          "What is the combined thickness of all the books?",
          [
            "{12 1/4} inches",
            "{11 3/4} inches",
            "{10 1/4} inches",
            "{12 3/4} inches",
          ],
          PBOOK,
          "{1/4} + {2/4} + {3/4} + 1 + {1 1/4} + {4 2/4} + 4 = {12 1/4} inches.",
        ),
        {
          type: "num",
          q: "Two more books of 1 inch and {1 3/4} inches are added. What is the new combined thickness?",
          a: 15,
          post: "inches",
          vis: PBOOK,
          x: "{12 1/4} + 1 + {1 3/4} = [15] inches.",
        },
        {
          type: "tf",
          q: "A line plot shows one ✕ above {1/4}, three ✕ above {2/4} and one ✕ above {3/4} (hours of math homework). Caleb says he spent {2 1/4} hours in all. Is he correct?",
          a: false,
          yes: ["Yes, he is", "No, he is not"],
          vis: P(
            "Math Homework (hr)",
            ["0", "{1/4}", "{2/4}", "{3/4}", "1"],
            [0, 1, 3, 1, 0],
          ),
          x: "{1/4} + {2/4} + {2/4} + {2/4} + {3/4} = {10/4} = {2 2/4} hours, not {2 1/4}.",
        },
      ],
    },
  ],
};
