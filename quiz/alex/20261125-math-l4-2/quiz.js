// Sheet quiz: Math Grade 4, Lesson 4-2 « Multiplication as Comparison » (Reveal Math Unit 4): the Student Practice Book's
// Additional Practice (pages 29–30) and the Student Edition's On My Own (pages 111–112), done on 2026-11-25.
// Source: the parent's Telegram photos (job 20261125-165031-quiz-alex, p-1 … p-4). Pictures: emoji (no figures on the sheet to crop).
// Changed to fit the quiz: every write-in answer made into a choice of 3–4 equations or sentences; 3 and 9 split per blank / statement;
// 12 split into its two problems; the bar diagrams are not drawn (the help says how). Left out: the Mindset question (the child's own opinion).
// Format: the top of shared/sheet-quiz.js; rules: the `sheet-quiz` skill.

const AP = "Additional Practice · ";
const OMO = "On My Own · ";

window.SHEET = {
  key: "quiz-alex-20261125-math-l4-2",
  lang: "en",
  eyebrow: "Math · Additional Practice and On My Own · Lesson 4-2",
  title: ["Comparison", "Problems"],
  imgDir: "img",
  cover: { e: "🔢 ✖️ ➕" },
  qs: [
    {
      n: "AP 1",
      part: AP + "Choose the correct comparison statement",
      q: "A small flagpole is 15 feet tall. A taller flagpole is 4 times as tall as the small flagpole. How tall is the taller flagpole?",
      help: "There are two flagpoles. The small one is 15 feet. Read the words about the tall one: is it « 4 more » or « 4 times as tall »? « More » means add. « Times as » means multiply.",
      e: "🚩 📏 🚩",
      o: ["15 + 4 = f", "15 × 4 = f"],
      k: 1,
    },
    {
      n: "AP 2",
      part: AP + "Choose the correct comparison statement",
      q: "Avery's green lizard eats 5 crickets. Her brown lizard eats 6 more crickets than her green lizard. How many crickets does her brown lizard eat?",
      help: "There are two lizards. The green one eats 5 crickets. Read the words about the brown one: is it « 6 more » or « 6 times as many »? « More » means add. « Times as » means multiply.",
      e: "🦎 🦗 🦎",
      o: ["5 + 6 = c", "5 × 6 = c"],
      k: 1,
    },
    {
      n: "AP 3a",
      part: AP + "Write equations to represent the comparison. Solve.",
      q: "Twyla picks 8 flowers. Natalie picks 4 times as many flowers as Twyla. Ava picks 12 more than Twyla. How many flowers do Natalie and Ava pick?\nNatalie picks ______ flowers.",
      help: "Twyla has 8 flowers. Natalie has 4 times as many as Twyla. Times as many means multiply. Which equation is about Natalie?",
      e: "👧 🌸 ✖️",
      o: ["8 + 4 = 12", "4 × 8 = 32", "4 × 12 = 48"],
    },
    {
      n: "AP 3b",
      part: AP + "Write equations to represent the comparison. Solve.",
      q: "Twyla picks 8 flowers. Natalie picks 4 times as many flowers as Twyla. Ava picks 12 more than Twyla. How many flowers do Natalie and Ava pick?\nAva picks ______ flowers.",
      help: "Now Ava. Ava has 12 more than Twyla, not than Natalie. Twyla has 8 flowers. More means add.",
      e: "👧 🌼 ➕",
      o: ["8 × 12 = 96", "32 + 12 = 44", "8 + 12 = 20"],
    },
    {
      n: "AP 4",
      part: AP + "Write equations to represent the comparison. Solve.",
      q: "A flamingo at a zoo is 4 feet tall. A giraffe at the zoo is 5 times as tall. How tall is the giraffe?\nThe giraffe is ______ feet tall.",
      help: "The flamingo is 4 feet tall. The giraffe is 5 times as tall. Times as tall means multiply.",
      e: "🦩 🦒 📏",
      o: ["4 + 5 = 9", "5 × 4 = 20", "5 × 5 = 25"],
    },
    {
      n: "AP 5",
      part: AP + "Write equations to represent the comparison. Solve.",
      q: "Caleb reads 7 pages a day. Nieves reads 3 times as many pages as Celeb in a day. How many pages does Nieves read each day?\nNieves reads ______ pages each day.",
      help: "Caleb reads 7 pages. Nieves reads 3 times as many pages. Times as many means multiply.",
      e: "👦 📖 👧",
      o: ["3 × 7 = 21", "7 + 3 = 10", "3 × 10 = 30"],
    },
    {
      n: "AP 6",
      part: AP + "Write equations to represent the comparison. Solve.",
      q: "Tia has 9 math problems for homework. Her brother has 3 times as many math problems for homework. Her sister has 6 more math problems for homework. How many math problems do Tia's brother and sister have for homework?",
      help: "Tia has 9 problems. First find the brother: 3 times as many as Tia. Then find the sister: 6 more than Tia. Then add the brother and the sister. Tia is not in the sum.",
      e: "👧 👦 👧 📝",
      o: ["12 + 15 = 27", "27 + 15 = 42", "9 + 27 + 15 = 51", "27 + 54 = 81"],
    },
    {
      n: "1",
      part:
        OMO +
        "What equation can you write to represent and solve the comparison?",
      q: "8 more than 4",
      help: "Start with 4. « More than » means add.",
      e: "4️⃣ ➕ 8️⃣",
      o: ["4 × 8 = 32", "8 − 4 = 4", "4 + 8 = 12"],
    },
    {
      n: "2",
      part:
        OMO +
        "What equation can you write to represent and solve the comparison?",
      q: "3 times as many as 5",
      help: "Start with 5. « Times as many » means multiply.",
      e: "5️⃣ ✖️ 3️⃣",
      o: ["3 × 5 = 15", "3 + 5 = 8", "5 × 5 = 25"],
    },
    {
      n: "3",
      part:
        OMO +
        "What equation can you write to represent and solve the comparison?",
      q: "2 times as long as 9 feet",
      help: "Start with 9 feet. « Times as long » means multiply.",
      e: "📏 ✖️ 2️⃣",
      o: ["2 + 9 = 11 feet", "2 × 9 = 18 feet", "9 × 9 = 81 feet"],
    },
    {
      n: "4",
      part:
        OMO +
        "What equation can you write to represent and solve the comparison?",
      q: "5 times as far as 10 miles",
      help: "Start with 10 miles. « Times as far » means multiply.",
      e: "🛣️ ✖️ 5️⃣",
      o: ["5 + 10 = 15 miles", "10 × 10 = 100 miles", "5 × 10 = 50 miles"],
    },
    {
      n: "5",
      part:
        OMO +
        "How can you represent the problem? Draw a bar diagram and write an equation to solve.",
      q: "A small bridge is 40 feet long. A new bridge is 3 times as long as the small bridge. How long is the new bridge?",
      help: "Draw one bar for the small bridge: 40 feet. Draw 3 bars of 40 for the new bridge. Times as long means multiply.",
      e: "🌉 📏 🌉",
      o: ["3 × 40 = 120 feet", "40 + 3 = 43 feet", "3 × 4 = 12 feet"],
    },
    {
      n: "6",
      part:
        OMO +
        "How can you represent the problem? Draw a bar diagram and write an equation to solve.",
      q: "Raya has 8 pencils in her school box. Miranda has 4 more pencils than Raya. How many pencils does Miranda have?",
      help: "Draw one bar for Raya: 8 pencils. Miranda's bar is Raya's bar and a little piece of 4 more. More means add.",
      e: "👧 ✏️ 👧",
      o: ["8 × 4 = 32 pencils", "8 + 4 = 12 pencils", "8 − 4 = 4 pencils"],
    },
    {
      n: "7",
      part:
        OMO +
        "How can you represent the problem? Draw a bar diagram and write an equation to solve.",
      q: "Louisa is 5 feet tall. The tree in her backyard is 4 times as tall as Louisa. How tall is the tree?",
      help: "Draw one bar for Louisa: 5 feet. Draw 4 bars of 5 for the tree. Times as tall means multiply.",
      e: "👧 🌳 📏",
      o: ["5 + 4 = 9 feet", "4 × 4 = 16 feet", "4 × 5 = 20 feet"],
    },
    {
      n: "8",
      part: OMO + "Write an equation and solve",
      q: "Ameer planted 6 plants. David planted 5 times as many. How many plants did David plant? Write an equation to represent the problem.",
      help: "Ameer has 6 plants. David has 5 times as many. Times as many means multiply.",
      e: "👦 🌱 👦",
      o: ["6 + 5 = 11", "5 × 6 = 30", "6 × 6 = 36"],
    },
    {
      n: "9a",
      part: OMO + "Two comparison statements",
      q: "Rosa and her brother are playing a game. Rosa scored 8 points and her brother scored 2 points. What are two comparison statements you can make about their scores?\nStatement 1: how many more?",
      help: "Rosa has 8 points. Her brother has 2 points. How many more points does Rosa have? Count up from 2 to 8.",
      e: "👧 🎮 👦",
      o: [
        "Rosa scored 10 more points than her brother.",
        "Rosa scored 6 more points than her brother.",
        "Rosa scored 4 more points than her brother.",
      ],
    },
    {
      n: "9b",
      part: OMO + "Two comparison statements",
      q: "Rosa scored 8 points and her brother scored 2 points.\nStatement 2: how many times as many?",
      help: "Now use times. How many groups of 2 make 8? Count by 2s up to 8.",
      e: "👧 🏆 👦",
      o: [
        "Rosa scored 6 times as many points as her brother.",
        "Rosa scored 2 times as many points as her brother.",
        "Rosa scored 4 times as many points as her brother.",
      ],
    },
    {
      n: "10",
      part: OMO + "Write an equation and solve",
      q: "A cat's tail can be 10 inches long. A lion's tail can be 3 times as long. How long can a lion's tail be? Write an equation to represent the problem.",
      help: "The cat's tail is 10 inches. The lion's tail is 3 times as long. Times as long means multiply.",
      e: "🐱 🦁 📏",
      o: ["10 + 3 = 13 inches", "3 × 10 = 30 inches", "10 × 10 = 100 inches"],
    },
    {
      n: "11",
      part: OMO + "Error Analysis",
      q: "Naomi wants to place three bookcases along a 7-foot wall. Each bookcase is 4 feet wide. She says the bookcases will fit, since 7 feet is three times longer than 4 feet. What would you tell her?",
      help: "There are 3 bookcases. Each one is 4 feet wide. Find how wide the 3 bookcases are together. Then compare it with the wall: 7 feet.",
      e: "📚 📚 📚 🧱",
      o: [
        "They will fit. 3 + 4 = 7 feet, the same as the wall.",
        "They will not fit. 3 × 4 = 12 feet, and the wall is only 7 feet.",
        "They will fit. The wall is 7 feet and a bookcase is 4 feet.",
      ],
    },
    {
      n: "12a",
      part: OMO + "Extend Your Thinking",
      q: "Write a comparison problem for the equation 9 + 7 = ? and another for the equation 9 × 7 = ?. Then solve each problem.\nA problem for 9 + 7 = ?",
      help: "9 + 7 is adding. Find the problem that says « more than ». Look at the answer too: 9 + 7 makes how many?",
      e: "🐟 ➕ 🐟",
      o: [
        "Sam has 9 fish. Mia has 7 more fish than Sam. Mia has 16 fish.",
        "Sam has 9 fish. Mia has 7 times as many fish as Sam. Mia has 16 fish.",
        "Sam has 9 fish. Mia has 7 more fish than Sam. Mia has 63 fish.",
      ],
    },
    {
      n: "12b",
      part: OMO + "Extend Your Thinking",
      q: "Write a comparison problem for the equation 9 + 7 = ? and another for the equation 9 × 7 = ?. Then solve each problem.\nA problem for 9 × 7 = ?",
      help: "9 × 7 is multiplying. Find the problem that says « times as many ». Look at the answer too: 9 × 7 makes how many?",
      e: "🍎 ✖️ 🍎",
      o: [
        "Leo has 9 apples. Ben has 7 more apples than Leo. Ben has 63 apples.",
        "Leo has 9 apples. Ben has 7 times as many apples as Leo. Ben has 16 apples.",
        "Leo has 9 apples. Ben has 7 times as many apples as Leo. Ben has 63 apples.",
      ],
    },
    {
      n: "Reflect",
      part: OMO + "Reflect",
      q: "What differences did you notice between multiplicative and additive comparison problems as you solved them?",
      help: "Additive means with plus. Multiplicative means with times. Which words go with plus? Which words go with times?",
      e: "➕ 🆚 ✖️",
      o: [
        "Additive problems say « more than » and I add. Multiplicative problems say « times as many » and I multiply.",
        "Additive problems say « times as many » and I add. Multiplicative problems say « more than » and I multiply.",
        "There is no difference. I always add.",
      ],
    },
  ],
};
