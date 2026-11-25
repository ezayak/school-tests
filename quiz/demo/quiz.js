// Sheet quiz demo (not a real sheet): made from Computer Grade 4 Unit 2 Lesson 3 « Editing and grammar check »
// (grade-4/computer/chapter-2/lesson-3.js), to try shared/sheet-quiz.js. Not in games.js: opened by its link only.
const P = (n) => `../../grade-4/computer/chapter-2/img/lesson-3/${n}.jpg`;

window.SHEET = {
  key: "quiz-demo",
  lang: "en",
  eyebrow: "Demo · Computer · Unit 2 Lesson 3",
  title: ["Sheet", "Helper"],
  imgDir: "img",
  cover: P("grammar"),
  qs: [
    {
      n: "1",
      part: "A · Choose",
      q: "Which keys open Find and Replace?",
      help: "Find and Replace changes one word for another word. You press two keys together to open it.",
      p: P("girl-ctrlh"),
      o: ["Ctrl + H", "Ctrl + B", "Ctrl + P", "F7"],
      sim: {
        app: "word",
        start: { doc: "dolphin" },
        say: "Press Ctrl + H. What opens?",
      },
    },
    {
      n: "2",
      part: "A · Choose",
      q: "A red wavy line under a word means…",
      help: "Word draws lines under some words. The red line is wavy, like a snake. What does Word want to tell you?",
      e: "📄 〰️ 🔴",
      o: [
        "A spelling mistake",
        "A grammar mistake",
        "A new word",
        "A bold word",
      ],
    },
    {
      n: "3",
      part: "B · True or false",
      q: "A double blue line shows a grammar mistake.",
      help: "Look at the picture. Two blue lines are under the words. Is this about grammar?",
      p: P("grammar"),
      o: ["True", "False"],
      k: 1,
      sim: {
        app: "word",
        start: { doc: "grammar", editor: true },
        say: "Look at the blue lines.",
      },
    },
    {
      n: "4",
      part: "C · Fill in the blank",
      q: "He ______ like to eat vegetables.",
      help: "One boy: he. Choose the word that goes with « he ».",
      e: "👦 🥦 🙅",
      o: ["don't", "doesn't"],
      k: 1,
    },
    {
      n: "5",
      part: "C · Fill in the blank",
      q: "The ______ button changes every word at once.",
      help: "You want to change the word everywhere, not one by one. Which button does that?",
      p: P("replace-btn"),
      o: ["Replace", "Replace All", "Find Next", "Cancel"],
      k: 1,
    },
  ],
};
