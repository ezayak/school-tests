// Math · Grade 4 · Lesson 13-2 « Relate Customary Units of Weight » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1207–k1244), Practice Book p. 135–136.
// No teacher's key. Log: grade-4/math/SOURCES.md.
const fmt = (n) => n.toLocaleString("en-US");
const U = {
  lb: ["pounds", "ounces", 16, "1 pound = 16 ounces"],
  t: ["tons", "pounds", 2000, "1 ton = 2,000 pounds"],
};
// n big = ? small; back: ? big = n small
const conv = (q, n, u, more = {}) => {
  const [big, small, f, rule] = U[u];
  return {
    type: "num",
    q: q || "What number makes the equivalence true?",
    pre: `${n} ${big} =`,
    post: small,
    a: n * f,
    vis: { kind: "lines", rows: [rule, `${n} × ${fmt(f)} = ?`] },
    x: `${rule}: ${n} × ${f} = [${n * f}] ${small}.`,
    ...more,
  };
};
const back = (q, n, u) => {
  const [big, small, f, rule] = U[u];
  return {
    type: "num",
    q: q || "What number makes the equivalence true?",
    post: `${small} = ${n} ${big}`,
    a: n * f,
    vis: { kind: "lines", rows: [rule, `${n} × ${fmt(f)} = ?`] },
    x: `${rule}: ${n} × ${f} = [${n * f}] ${small}.`,
  };
};
const unitQ = (n, u, wrong) => {
  const [big, small, f, rule] = U[u];
  return {
    type: "mc",
    q: `What customary unit makes the equivalence true? ${n} ${big} = ${fmt(n * f)} ___`,
    opts: [small, ...wrong],
    vis: { kind: "lines", rows: [rule] },
    x: `${n} × ${f} = ${n * f}: ${fmt(n * f)} [${small}].`,
  };
};

window.LESSON = {
  n: "13-2",
  key: "math4-l13-2",
  grade: 4,
  title: "Customary Units of Weight",
  en: "Tons, pounds and ounces",
  unit: "Unit 13 · Lesson 13-2",
  book: "e-book Lesson 13-2 · Practice Book p. 135–136",
  imgDir: "img/lesson-13-2",
  cover: "curious",
  question: {
    q: "Why is understanding how to use [multiplication] to convert larger customary units to smaller units important in the real world?",
    // unverified: a model answer, the book gives none
    a: "Recipes, stores and scales use different units. To compare or share, I change pounds to ounces (× 16) or tons to pounds (× 2,000).",
    img: "curious",
  },
  words: [
    {
      w: "Customary system",
      m: "units used in the United States: ounce, pound, ton",
    },
    { w: "Pound (lb)", m: "1 lb = 16 ounces" },
    { w: "Ounce (oz)", m: "a small unit of weight" },
    { w: "Ton", m: "1 ton = 2,000 pounds" },
  ],
  ideas: [
    {
      t: "32 oz and 2 lb",
      ic: "⚖️",
      img: "curious",
      lines: ["The same walnuts: one scale shows [32 oz], the other [2 lb]."],
    },
    {
      t: "Teri's flour",
      ic: "🍞",
      lines: [
        "Teri bought [3 pounds] of flour. Each roll needs [4 ounces].",
        "How many rolls can she make?",
      ],
      vis: { kind: "lines", rows: ["1 lb = 16 oz", "1 ton = 2,000 lb"] },
    },
    {
      t: "A table",
      ic: "📋",
      lines: ["Each pound adds 16 ounces.", "3 pounds = 3 × 16 = [48] ounces."],
      vis: {
        kind: "lines",
        rows: ["1 lb → 16 oz", "2 lb → 32 oz", "3 lb → 48 oz", "4 lb → 64 oz"],
      },
    },
    {
      t: "How many rolls",
      ic: "🥐",
      lines: ["4 × r = 48, so 48 ÷ 4 = [12].", "Teri can make [12 rolls]."],
      vis: { kind: "lines", rows: ["4 × r = 48", "48 ÷ 4 = 12"] },
    },
    {
      t: "Large to small",
      ic: "💡",
      lines: ["Pounds to ounces: [× 16].", "Tons to pounds: [× 2,000]."],
      vis: { kind: "lines", rows: ["lb → oz: × 16", "ton → lb: × 2,000"] },
    },
  ],

  games: [
    {
      k: "lb",
      t: "Pounds to ounces",
      en: "× 16",
      ic: "⚖️",
      items: [2, 9, 3, 6, 11, 5].map((n) => conv("", n, "lb")),
    },
    {
      k: "ton",
      t: "Tons to pounds",
      en: "× 2,000",
      ic: "🚚",
      items: [2, 7, 4, 10, 9].map((n) => conv("", n, "t")),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-2",
      t: "Be Curious",
      en: "Walnuts on two scales",
      ic: "⚖️",
      from: "e-book 13-2 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: the book takes any answer
          a: "The same: both bowls hold the same walnuts, the same weight. Different: one scale shows ounces (32 oz), the other pounds (2 lb). 2 × 16 = 32.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-2",
      t: "Learn and Work Together",
      en: "Teri's rolls; a table",
      ic: "🍞",
      from: "e-book 13-2 · Learn, Work Together",
      keep: true,
      items: [
        conv(
          "Teri bought 3 pounds of flour. How many ounces is that?",
          3,
          "lb",
        ),
        {
          type: "num",
          q: "Teri uses 4 ounces of flour for each roll. How many rolls can she make with 48 ounces?",
          a: 12,
          post: "rolls",
          vis: { kind: "lines", rows: ["4 × r = 48"] },
          x: "48 ÷ 4 = [12] rolls.",
        },
        {
          type: "open",
          q: "Math Is… Precision: Why is it important to include the units in the answer?",
          vis: { kind: "lines", rows: ["48 ounces", "12 rolls"] },
          // unverified: a model answer, the book gives none
          a: "A number alone doesn't say what it counts: 48 ounces and 48 pounds are very different. The unit tells what the number means.",
        },
        ...[2, 3, 4, 5].map((n) =>
          conv("Work Together: How can you convert pounds to ounces?", n, "lb"),
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-2",
      t: "On My Own 1–11",
      en: "Pounds, ounces, tons",
      ic: "⚖️",
      from: "e-book 13-2 · On My Own 1–11",
      keep: true,
      items: [
        conv("", 5, "lb"),
        conv("", 8, "t"),
        conv("", 4, "lb"),
        conv("", 5, "t"),
        back("", 6, "lb"),
        back("", 7, "t"),
        unitQ(10, "lb", ["pounds", "tons"]),
        unitQ(20, "t", ["ounces", "tons"]),
        conv(
          "Mike bought 7 pounds of tomatoes. What is the weight of the tomatoes in ounces?",
          7,
          "lb",
        ),
        {
          type: "open",
          q: "There are 160 ounces of potatoes in a 10-pound bag. Why is the number of ounces greater than the number of pounds?",
          vis: { kind: "lines", rows: ["10 lb = 160 oz"] },
          // unverified: a model answer, the book gives none
          a: "An ounce is much smaller than a pound: 16 ounces make 1 pound. It takes more small units for the same weight: 10 × 16 = 160.",
        },
        {
          type: "mc",
          q: "A minivan weighs 3 tons. A truck weighs 8,000 pounds. Which vehicle weighs more?",
          opts: ["The truck", "The minivan", "They weigh the same"],
          vis: { kind: "lines", rows: ["minivan: 3 tons", "truck: 8,000 lb"] },
          x: "3 × 2,000 = 6,000 pounds. 8,000 is more than 6,000: the truck weighs more.",
        },
      ],
    },
    {
      k: "own12",
      g: "📗 Book · Lesson 13-2",
      t: "On My Own 12–15",
      en: "Bananas, a truck, fertilizer, watermelons",
      ic: "🍉",
      from: "e-book 13-2 · On My Own 12–15",
      keep: true,
      items: [
        {
          type: "num",
          q: "Jack bought {1 1/2} pounds of bananas. What is the weight of the bananas in ounces?",
          a: 24,
          post: "ounces",
          img: "bananas",
          x: "1 pound = 16 ounces, {1/2} pound = 8 ounces: 16 + 8 = [24] ounces.",
        },
        {
          type: "num",
          q: "A truck weighs {2 3/4} tons. What is the weight of the truck in pounds?",
          a: 5500,
          post: "pounds",
          vis: {
            kind: "lines",
            rows: ["1 ton = 2,000 lb", "{1/4} ton = 500 lb"],
          },
          x: "2 tons = 4,000 pounds, {3/4} ton = 3 × 500 = 1,500 pounds: 4000 + 1500 = [5500] pounds.",
        },
        {
          type: "num",
          q: "Mark delivered 1 ton of fertilizer. Each day they spread 50 pounds. How many days will it take to spread all of it?",
          a: 40,
          post: "days",
          vis: { kind: "lines", rows: ["1 ton = 2,000 lb", "50 lb each day"] },
          x: "1 ton = 2,000 pounds: 2000 ÷ 50 = [40] days.",
        },
        {
          type: "mc",
          q: "Extend: Reeb's Market offers a 10-pound watermelon for $5. Sally's Produce Stand offers a 165-ounce watermelon for $5. Which is the better buy?",
          opts: [
            "Sally's 165-ounce watermelon",
            "Reeb's 10-pound watermelon",
            "They are the same",
          ],
          vis: { kind: "lines", rows: ["10 lb for $5", "165 oz for $5"] },
          x: "10 × 16 = 160 ounces. 165 ounces is more for the same $5: Sally's is the better buy.",
        },
        {
          type: "open",
          q: "Reflect: Why is understanding how to use multiplication to convert larger customary units to smaller units important in the real world?",
          img: "curious",
          // unverified: a model answer, the book gives none
          a: "Things are sold and measured in different units. Converting lets me compare them, like 10 pounds and 165 ounces, and follow recipes.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 135–136",
      t: "Additional Practice 1–11",
      en: "Lesson 13-2",
      ic: "📘",
      from: "Practice Book p. 135–136",
      keep: true,
      items: [
        conv("How can you convert customary units? 7 × ? = 112", 7, "lb"),
        conv("How can you convert customary units? 6 × ? = 12,000", 6, "t"),
        conv("", 5, "lb"),
        conv("", 3, "t"),
        back("", 4, "lb"),
        back("", 5, "t"),
        conv(
          "Sadie ordered 10 pounds of refill bubble solution. How many ounces did she order?",
          10,
          "lb",
        ),
        conv(
          "A female elephant weighs 4 tons. How much is that in pounds?",
          4,
          "t",
        ),
        conv(
          "Ethel weighed 8 pounds when she was born. How many ounces did she weigh?",
          8,
          "lb",
        ),
        {
          type: "tf",
          q: "Raquel buys 2 pounds of tomatoes. A recipe calls for 30 ounces. Does she have enough tomatoes?",
          a: true,
          yes: ["Yes, she does", "No, she doesn't"],
          vis: { kind: "lines", rows: ["2 lb", "recipe: 30 oz"] },
          x: "2 × 16 = 32 ounces. 32 is more than 30: enough.",
        },
        {
          type: "num",
          q: "Christopher bought {2 1/2} pounds of strawberries. What is the weight in ounces?",
          a: 40,
          post: "ounces",
          vis: { kind: "lines", rows: ["1 lb = 16 oz", "{1/2} lb = 8 oz"] },
          x: "2 pounds = 32 ounces, {1/2} pound = 8 ounces: 32 + 8 = [40] ounces.",
        },
      ],
    },
  ],
};
