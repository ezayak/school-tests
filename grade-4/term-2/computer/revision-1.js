// Computer · Grade 4 · Term 2 · Mid-term revision (Word Quest): Unit 2 · Lesson 2 « Images and graphics », Lesson 3 « Editing and grammar check ».
// A Quest for shared/quest.js (format at the top of that file). Its card is in games.js (Grade 4 · Term 2 · Mid-term exam).
// Source: the parent's note for Mid-term 2 (2026-11-23): « Unit 2, Lesson 2 Working with Images and Graphics, Lesson 3 Editing and Grammar Check ».
// No new school sheet: the questions are the lessons' own (grade-4/computer/chapter-2/lesson-2.js, lesson-3.js: book pages 68–85, HW1 for Term 2),
// their pictures by path, the Mini Word button icons (shared/wordsim.js, loaded by the page) drawn as in the lessons.
// No answer key: the answers are the lessons' (the Hands on! answers are in grade-4/computer/UNVERIFIED.md).
// Changed to fit the Quest: « Do it in Mini Word » missions and « Steps in order » became « which button / what comes next » questions;
// the words of both lessons became matching rounds. Left out: the lessons' open answers (the SmartArt about sports, food water and shelter).

const TF = ["True", "False"];
const P2 = (n) => `../../computer/chapter-2/img/lesson-2/${n}.jpg`;
const P3 = (n) => `../../computer/chapter-2/img/lesson-3/${n}.jpg`;
// true or false: a = true / false
const tf = (l, q, a, pic, x) => ({
  l,
  ...pic,
  q,
  o: TF,
  c: a ? 0 : 1,
  k: 1,
  x,
});

/* ---------- a Mini Word button, drawn big in the middle of the picture ---------- */
const nest = (svg, x, y, s) =>
  String(svg).replace(
    "<svg ",
    `<svg x="${x}" y="${y}" width="${s}" height="${s}" style="color:#222" `,
  );
const wic = (n) =>
  WordSim.icon(n)
    .replace(/^<span[^>]*>/, "")
    .replace(/<\/span>$/, "");
// n = the icon name; label = the words under it, as on the ribbon
const btn = (n, label) =>
  `<rect x="40" y="22" width="240" height="136" rx="16" fill="#fff" stroke="#9aa0a8" stroke-width="3"/>` +
  nest(wic(n), 124, 30, 72) +
  `<text class="lbl" x="160" y="132" text-anchor="middle" dominant-baseline="central">${label}</text>`;
// a button with words only (Replace, Replace All in the Find and Replace window)
const word = (label) =>
  `<rect x="60" y="60" width="200" height="60" rx="10" fill="#fff" stroke="#2b7cd3" stroke-width="3"/>` +
  `<text class="lbl-big" x="160" y="90" text-anchor="middle" dominant-baseline="central">${label}</text>`;

window.QUEST = {
  key: "g4comp-t2-mid",
  hub: "../../../index.html",
  eyebrow: "Grade 4 Computer · Mid-term 2 revision",
  title: ["Word", "Quest"],
  imgDir: "../../computer/chapter-2/img/lesson-2",
  cover: "picture-styles",
  chips: [
    ["Picture Format", "pe"],
    ["SmartArt & Shapes", "ke"],
    ["Find and Replace", "cool"],
    ["Spelling and Grammar", "green"],
  ],
  lessons: [
    { n: 2, l: "L2 · Images and graphics" },
    { n: 3, l: "L3 · Editing and grammar" },
  ],
  mc: [
    /* ===== Lesson 2 · Which button? (the lesson's game) ===== */
    {
      l: 2,
      p: P2("picture-styles"),
      q: "Keep only the parrot, without the trees. Which button?",
      o: ["Remove Background", "Crop", "Picture Effects"],
      x: "Remove Background keeps only the main subject of the picture.",
    },
    {
      l: 2,
      e: "✂️ 🖼️",
      q: "Cut away the edges of the picture. Which button?",
      o: ["Crop", "Wrap Text", "Picture Border"],
      x: "Crop cuts away the parts of a picture you don't want.",
    },
    {
      l: 2,
      p: P2("wrap-text"),
      q: "Put the text around the picture. Which button?",
      o: ["Wrap Text", "Position", "Color"],
      x: "Wrap Text: how the text goes around the picture.",
    },
    {
      l: 2,
      p: P2("arrange"),
      q: "Give the picture a shadow or a glow. Which button?",
      o: ["Picture Effects", "Picture Border", "Crop"],
      x: "Picture Effects: shadow, glow, reflection or 3-D.",
    },
    {
      l: 2,
      e: "🟦 🖼️",
      q: "Put a blue line around the picture. Which button?",
      o: ["Picture Border", "Picture Effects", "Remove Background"],
      x: "Picture Border: the colour, width or style of the edge.",
    },
    {
      l: 2,
      p: P2("pyramid-colors"),
      q: "Make a diagram of ideas. Which button?",
      o: ["SmartArt", "Shapes", "Pictures"],
      x: "SmartArt makes a clear diagram.",
    },
    {
      l: 2,
      p: P2("shapes"),
      q: "Add a star or an arrow. Which button?",
      o: ["Shapes", "SmartArt", "Pictures"],
      x: "Insert › Shapes: flags, arrows, circles, stars and more.",
    },

    /* ===== Lesson 2 · Which SmartArt? ===== */
    {
      l: 2,
      e: "👩‍💼 👩‍🏫 🧒",
      q: "Show the levels in a school: principal, teachers, students. Which SmartArt?",
      o: ["Pyramid", "Cycle"],
      x: "A pyramid shows levels from top to bottom.",
    },
    {
      l: 2,
      e: "☀️ 💧 ☁️ 🌧️",
      q: "Show the water cycle: evaporation, condensation, precipitation, collection. Which SmartArt?",
      o: ["Cycle", "Pyramid"],
      x: "A cycle shows the stages of a process that goes round and round.",
    },
    {
      l: 2,
      e: "🥚 🐛 🦋",
      q: "Show how a butterfly grows: egg, caterpillar, chrysalis, butterfly, egg again. Which SmartArt?",
      o: ["Cycle", "Pyramid"],
      x: "The stages go round and round: a cycle.",
    },
    {
      l: 2,
      e: "🧢 ⚽ 👟",
      q: "Show a team: the captain on top, then the players. Which SmartArt?",
      o: ["Pyramid", "Cycle"],
      x: "Levels from top to bottom: a pyramid.",
    },

    /* ===== Lesson 2 · What does this button do? (Book p. 78, Hands on 1.1–1.4) ===== */
    {
      l: 2,
      svg: btn("removebg", "Remove Background"),
      q: "What does this button do in Microsoft Word?",
      o: [
        "Keeps only the main subject of an image and deletes the background",
        "Allows you to position an image on the page and choose how text flows around it",
        "Cuts unwanted areas from an image",
        "Adds special visual effects like shadow, glow, or 3D to the image",
      ],
      x: "Remove Background keeps only the main subject, like the parrot.",
    },
    {
      l: 2,
      svg: btn("piceffects", "Picture Effects"),
      q: "What does this button do in Microsoft Word?",
      o: [
        "Adds special visual effects like shadow, glow, or 3D to the image",
        "Allows you to position an image on the page and choose how text flows around it",
        "Cuts unwanted areas from an image",
        "Keeps only the main subject of an image and deletes the background",
      ],
      x: "Picture Effects: shadow, glow, reflection or 3-D.",
    },
    {
      l: 2,
      svg: btn("wraptext", "Wrap Text"),
      q: "What does this button do in Microsoft Word?",
      o: [
        "Allows you to position an image on the page and choose how text flows around it",
        "Cuts unwanted areas from an image",
        "Adds special visual effects like shadow, glow, or 3D to the image",
        "Keeps only the main subject of an image and deletes the background",
      ],
      x: "Wrap Text: how the text goes around the picture.",
    },
    {
      l: 2,
      svg: btn("crop", "Crop"),
      q: "What does this button do in Microsoft Word?",
      o: [
        "Cuts unwanted areas from an image",
        "Allows you to position an image on the page and choose how text flows around it",
        "Adds special visual effects like shadow, glow, or 3D to the image",
        "Keeps only the main subject of an image and deletes the background",
      ],
      x: "Crop keeps only the part you want.",
    },

    /* ===== Lesson 2 · Complete the sentence (Hands on 2.1–2.5, HW1 A) ===== */
    {
      l: 2,
      p: P2("picture-format"),
      q: "To change how a picture looks by adding styles, colors, or borders, use the ___ tab.",
      o: ["Picture Format", "Home", "Insert", "View"],
      x: "Click the picture: the Picture Format tab appears.",
    },
    {
      l: 2,
      p: P2("arrange"),
      q: "To place a picture in a specific spot on the page, use the ___ option.",
      o: ["Position", "Crop", "Color"],
      x: "Position: choose where the picture is on the page.",
    },
    {
      l: 2,
      svg: btn("picborder", "Picture Border"),
      q: "If you want to change the color, width, or style of a picture's edges, use the ___ feature.",
      o: ["Picture Border", "Picture Effects", "Remove Background"],
      x: "Picture Border changes the edge of the picture.",
    },
    {
      l: 2,
      p: P2("pyramid"),
      q: "The ___ SmartArt shows relationships from top to bottom in an organized way.",
      o: ["Pyramid", "Cycle", "List"],
      x: "A pyramid shows levels from top to bottom.",
    },
    {
      l: 2,
      p: P2("text-cycle"),
      q: "The ___ SmartArt shows the different stages of a process.",
      o: ["Cycle", "Pyramid", "Matrix"],
      x: "A cycle shows the stages of a process, like the water cycle.",
    },
    {
      l: 2,
      p: P2("text-cycle"),
      q: "You can use ___ SmartArt to create the cycle of a butterfly.",
      o: ["Cycle", "Pyramid"],
      x: "Egg, caterpillar, chrysalis, butterfly, and again: a cycle.",
    },
    {
      l: 2,
      p: P2("pyramid-colors"),
      q: "___ helps you create diagrams to show different ideas.",
      o: ["SmartArt", "Shapes"],
      x: "SmartArt makes a clear diagram.",
    },
    {
      l: 2,
      p: P2("shapes"),
      q: "To draw a shape in MS Word, you should click and ___ the mouse.",
      o: ["drag", "paste"],
      x: "Insert › Shapes › choose one › drag it on the page.",
    },
    {
      l: 2,
      svg: btn("smartart", "SmartArt"),
      q: "You can find SmartArt in the ___ group.",
      o: ["Illustrations", "Paragraph"],
      x: "Insert tab › Illustrations group › SmartArt.",
    },

    /* ===== Lesson 2 · True or false (game, Hands on 3.1–3.5, HW1 B) ===== */
    tf(
      2,
      "The Picture Format tab appears when you click a picture.",
      true,
      { p: P2("picture-format") },
      "Click the picture: the Picture Format tab appears.",
    ),
    tf(
      2,
      "A cycle shows levels from top to bottom.",
      false,
      { p: P2("text-cycle") },
      "A pyramid shows levels. A cycle shows stages that go round.",
    ),
    tf(
      2,
      '"Behind Text" puts the picture behind the words.',
      true,
      { p: P2("wrap-text") },
      "Behind Text is one of the Wrap Text options.",
    ),
    tf(
      2,
      "Remove Background deletes the whole picture.",
      false,
      { p: P2("picture-styles") },
      "It keeps the main subject.",
    ),
    tf(
      2,
      'The "Crop" tool allows you to adjust the brightness and color of a picture.',
      false,
      { svg: btn("crop", "Crop") },
      "Crop cuts away parts of the picture. Color changes the colour.",
    ),
    tf(
      2,
      'Using the "Wrap Text" option, you can control how text surrounds a picture.',
      true,
      { p: P2("wrap-text") },
      "Wrap Text: how the text goes around the picture.",
    ),
    tf(
      2,
      'The "Remove Background" tool takes away parts of an image, so only the main subject is shown.',
      true,
      { p: P2("picture-styles") },
      "Only the main subject stays, like the parrot.",
    ),
    tf(
      2,
      'The "Picture Border" option lets you add a shadow or glow effect to a picture.',
      false,
      { svg: btn("picborder", "Picture Border") },
      "Shadow and glow are in Picture Effects. Picture Border changes the edge.",
    ),
    tf(
      2,
      "Shapes cannot contain text.",
      false,
      { p: P2("shapes") },
      "You can type text in a shape and change its size, colour and font.",
    ),
    tf(
      2,
      "You can personalize a SmartArt graphic by changing its color.",
      true,
      { p: P2("pyramid-colors") },
      "SmartArt Design tab › Change Colors.",
    ),
    tf(
      2,
      "You can change the color of a picture.",
      true,
      { p: P2("picture-format") },
      "Picture Format tab › Color.",
    ),
    tf(
      2,
      "Every SmartArt has its own purpose.",
      true,
      { p: P2("pyramid") },
      "Choose the one that best shows what you want to explain.",
    ),
    tf(
      2,
      "You cannot change the size of a shape.",
      false,
      { p: P2("shapes") },
      "You can make a shape bigger or smaller.",
    ),
    tf(
      2,
      "Picture Format tab allows you to change the size, color and position of a picture.",
      true,
      { p: P2("picture-format") },
      "The Picture Format tab changes the size, shape, colour and position.",
    ),

    /* ===== Lesson 2 · Do it in Mini Word, Steps in order (the lesson's how-to's) ===== */
    {
      l: 2,
      p: P2("elephant-oval"),
      q: "Insert a picture from your computer: Insert tab › Pictures › ___",
      o: ["This Device", "Shapes", "SmartArt"],
      x: "Insert › Pictures › This Device: a picture from your computer.",
    },
    {
      l: 2,
      p: P2("picture-format"),
      q: "Make the picture gray. Picture Format tab › ___",
      o: ["Color", "Picture Border", "Crop"],
      x: "Color › Grayscale.",
    },
    {
      l: 2,
      p: P2("elephant-oval"),
      q: "This elephant has the Metal Oval style. Where do you choose a style?",
      o: ["Picture Styles", "Wrap Text", "Position"],
      x: "Picture Styles: a new outline or a shadow in one click.",
    },
    {
      l: 2,
      svg: btn("crop", "Crop"),
      q: "You clicked Crop and moved the black handles. What do you press then?",
      o: ["Enter", "Delete", "F7"],
      x: "Click Crop, move the black handles, press Enter.",
    },
    {
      l: 2,
      p: P2("pyramid"),
      q: "Insert a pyramid: Insert tab › SmartArt › ___ › Basic Pyramid › OK",
      o: ["Pyramid", "Cycle", "Shapes"],
      x: "The Pyramid group has the Basic Pyramid.",
    },
    {
      l: 2,
      p: P2("pyramid-colors"),
      q: "Make the pyramid colourful: click it › SmartArt Design tab › ___",
      o: ["Change Colors", "Picture Border", "Remove Background"],
      x: "Change Colors › Colorful - Accent Colors.",
    },
    {
      l: 2,
      p: P2("text-cycle"),
      q: "The water cycle needs only 4 stages, the cycle has 5 boxes. What do you do with the last box?",
      o: ["Click it and press Delete", "Type Collection twice", "Crop it"],
      x: "Click the last Text box and press Delete.",
    },
    {
      l: 2,
      p: P2("wrap-text"),
      q: "Which Wrap Text option puts the text around the picture, like a box?",
      o: ["Square", "Behind Text", "In Front of Text"],
      x: "Square: the text goes around the picture.",
    },

    /* ===== Lesson 3 · Which tool? (the lesson's game) ===== */
    {
      l: 3,
      e: "🔎 📄",
      q: "Find every place a word is used. Which tool?",
      o: ["Find", "Spelling and Grammar", "Replace"],
      x: "Find goes to every place the word is.",
    },
    {
      l: 3,
      p: P3("replace-btn"),
      q: "Change a word for another word. Which tool?",
      o: ["Replace", "Find", "Spelling and Grammar"],
      x: "Replace puts a new word in place of the old one.",
    },
    {
      l: 3,
      p: P3("grammar"),
      q: "Look for mistakes in the text. Which tool?",
      o: ["Spelling and Grammar", "Replace", "Find"],
      x: "Spelling and Grammar checks the text and gives ideas to fix it.",
    },
    {
      l: 3,
      p: P3("girl-ctrlh"),
      q: "Open Find and Replace with the keys.",
      o: ["Ctrl + H", "Ctrl + F", "F7"],
      x: "Press Ctrl + H.",
    },
    {
      l: 3,
      p: P3("grammar"),
      q: "Open the Editor (Spelling and Grammar) with one key.",
      o: ["F7", "Ctrl + H", "Ctrl + P"],
      x: "Press F7: the Editor opens.",
    },

    /* ===== Lesson 3 · Red or blue line? ===== */
    {
      l: 3,
      p: P3("grammar"),
      q: "A double blue line under the words means…",
      o: ["a grammar mistake", "a spelling mistake", "no mistake"],
      x: "Double blue line = grammar.",
    },
    {
      l: 3,
      svg:
        '<text class="lbl-big" x="160" y="80" text-anchor="middle" dominant-baseline="central">feild</text>' +
        '<path d="M118 104 q5 -6 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" stroke="#d22" stroke-width="3"/>',
      q: "A red wavy line under a word means…",
      o: ["a spelling mistake", "a grammar mistake", "a bold word"],
      x: "Red wavy line = spelling. « feild » should be « field ».",
    },
    {
      l: 3,
      e: "👦 🙅 🥦",
      q: "He don't like to eat vegetables. What is right?",
      o: ["He doesn't like", "He don't likes", "He not like"],
      x: "He doesn't like vegetables.",
    },

    /* ===== Lesson 3 · What does this tool do? (Book p. 84, Hands on 1.1–1.4) ===== */
    {
      l: 3,
      svg: btn("find", "Find"),
      q: "What does this tool do in Microsoft Word?",
      o: [
        "Allows you to locate every instance of a particular word or phrase within a document.",
        "Finds a specific word or phrase and lets you change it throughout the entire document in one step.",
        "Checks for spelling and grammar mistakes and provides suggestions for corrections.",
        "Lets you replace a single word or phrase with another in selected parts of the document.",
      ],
      x: "Find goes to every place the word is.",
    },
    {
      l: 3,
      svg: btn("spelling", "Spelling"),
      q: "What does this tool do in Microsoft Word?",
      o: [
        "Checks your work for mistakes and gives ideas to fix them",
        "Finds a specific word or phrase and lets you change it throughout the entire document in one step",
        "Helps you find every time a word or phrase is used in the document",
        "Lets you replace a word or phrase with another in selected parts of the document",
      ],
      x: "Spelling and Grammar checks the text for mistakes.",
    },
    {
      l: 3,
      svg: word("Replace"),
      q: "What does this tool do in Microsoft Word?",
      o: [
        "Lets you replace a word or phrase with another in selected parts of the document",
        "Finds a specific word or phrase and lets you change it throughout the entire document in one step",
        "Helps you find every time a word or phrase is used in the document",
        "Checks your work for mistakes and gives ideas to fix them",
      ],
      x: "Replace changes one place at a time.",
    },
    {
      l: 3,
      svg: word("Replace All"),
      q: "What does this tool do in Microsoft Word?",
      o: [
        "Finds a specific word or phrase and lets you change it throughout the entire document in one step",
        "Helps you find every time a word or phrase is used in the document",
        "Checks your work for mistakes and gives ideas to fix them",
        "Lets you replace a word or phrase with another in selected parts of the document",
      ],
      x: "Replace All changes it everywhere in the document.",
    },

    /* ===== Lesson 3 · Complete the sentence (Hands on 2.1–2.4) ===== */
    {
      l: 3,
      p: P3("replace-btn"),
      q: 'To search for a certain word or phrase, go to the ___ tab and select "Find."',
      o: ["Home", "Insert", "Review", "View"],
      x: "Home tab › Editing group.",
    },
    {
      l: 3,
      p: P3("grammar"),
      q: 'To check for spelling and grammar mistakes, click "Spelling and Grammar" under the ___ tab.',
      o: ["Review", "Home", "Insert", "View"],
      x: "Review tab › Spelling and Grammar.",
    },
    {
      l: 3,
      p: P3("find-replace"),
      q: 'To replace a word with a different word each time it appears in a document, type the new text in the ___ box and click "Replace All."',
      o: ["Replace with", "Find what", "Search"],
      x: "Find what: the old word. Replace with: the new word.",
    },
    {
      l: 3,
      p: P3("girl-ctrlh"),
      q: 'To open the "Find and Replace" dialog box, you can press ___ on your keyboard.',
      o: ["Ctrl + H", "Ctrl + F", "Ctrl + P", "F7"],
      x: "Ctrl + H opens Find and Replace.",
    },

    /* ===== Lesson 3 · True or false (game, Hands on 3.1–3.5) ===== */
    tf(
      3,
      "Replace is on the Home tab, in the Editing group.",
      true,
      { p: P3("replace-btn") },
      "Home tab › Editing group › Replace.",
    ),
    tf(
      3,
      "Replace All asks you before every change.",
      false,
      { p: P3("find-replace") },
      "Replace All changes everywhere at once. Replace goes one at a time.",
    ),
    tf(
      3,
      "F7 opens Spelling and Grammar.",
      true,
      { p: P3("grammar") },
      "Press F7: the Editor opens.",
    ),
    tf(
      3,
      'The "Replace" tool helps you find and change words in your document.',
      true,
      { p: P3("find-replace") },
      "Find what: the old word. Replace with: the new word.",
    ),
    tf(
      3,
      '"Replace All" changes a word or phrase everywhere in the document without asking for permission each time.',
      true,
      { svg: word("Replace All") },
      "Replace All: everywhere in the document. Double-check first!",
    ),
    tf(
      3,
      "Grammar issues in Microsoft Word are marked with a double red underline.",
      false,
      { p: P3("grammar") },
      "Grammar is a double blue line. A red wavy line is spelling.",
    ),
    tf(
      3,
      'The "Read context" tool reads selected text aloud to help with proofreading and understanding.',
      true,
      { p: P3("grammar") },
      "Read context reads the sentence aloud.",
    ),
    tf(
      3,
      'The "Spelling and Grammar" tool does not fix mistakes for you. It shows suggestions that you can choose to accept or ignore.',
      true,
      { svg: btn("spelling", "Spelling") },
      "You click the right word yourself.",
    ),

    /* ===== Lesson 3 · Do it in Mini Word, Steps in order, Dear Marco ===== */
    {
      l: 3,
      p: P3("find-replace"),
      q: "In Find and Replace, what do you type in « Find what »?",
      o: ["the old word", "the new word", "nothing"],
      x: "Find what: the old word. Replace with: the new word.",
    },
    {
      l: 3,
      p: P3("find-replace"),
      q: "Change only the first « people ». You typed the words. What do you click first?",
      o: ["Find Next", "Replace All", "Cancel"],
      x: "Find Next selects the first « people », then click Replace.",
    },
    {
      l: 3,
      p: P3("find-replace"),
      q: "The same word must change everywhere. Which button?",
      o: ["Replace All", "Find Next", "Replace"],
      x: "The same word everywhere → Replace All.",
    },
    {
      l: 3,
      p: P3("grammar"),
      q: "Check the grammar: Review tab › Spelling and Grammar › under Corrections, click ___",
      o: ["Grammar", "Spelling", "Read context"],
      x: "In the Editor: Corrections › Grammar, then click the right word.",
    },
    {
      l: 3,
      p: P3("grammar"),
      q: "What does « Stop checking for this » do?",
      o: [
        "It ignores this mistake everywhere",
        "It reads the sentence aloud",
        "It deletes the sentence",
      ],
      x: "Stop checking for this ignores this mistake everywhere.",
    },
    {
      l: 3,
      e: "🖱️ 〰️ ✅",
      q: "A spelling mistake! A quick way to fix it?",
      o: [
        "Right-click the word and click the right one",
        "Press Ctrl + H",
        "Click Crop",
      ],
      x: "Right-click the word: the ideas to fix it appear in bold.",
    },
    {
      l: 3,
      p: P3("marco"),
      q: "« I hop you are well », « feild », « arived », « dinosurs ». Which tool fixes them?",
      o: ["Spelling and Grammar", "Replace All", "Picture Format"],
      x: "Review tab › Spelling and Grammar: 1 grammar, 3 spelling mistakes.",
    },
    {
      l: 3,
      p: P3("marco"),
      q: "How many times did you replace the word « museum » with « center »?",
      o: ["2", "1", "3"],
      x: "Science Museum and the museum: 2 times.",
    },
  ],
  mt: [
    {
      l: 2,
      t: "Match each word to its meaning",
      p: [
        [
          "🖼️",
          "Picture Format",
          "the tab that changes a picture: colour, style, border, position, size",
        ],
        ["🦜", "Remove Background", "keeps only the main subject of a picture"],
        ["✂️", "Crop", "cuts away the parts of a picture you don't want"],
        ["🔁", "Wrap Text", "how the text goes around a picture"],
        [
          "🔺",
          "SmartArt",
          "a diagram that shows ideas in order, in levels or in a cycle",
        ],
      ],
    },
    {
      l: 2,
      t: "Match each button to what it does",
      p: [
        ["🟦", "Picture Border", "the colour, width or style of the edge"],
        ["✨", "Picture Effects", "shadow, glow, reflection or 3-D"],
        ["📍", "Position", "where the picture is on the page"],
        ["🎨", "Color", "changes the colour of the picture"],
        ["⭐", "Shapes", "stars, arrows, circles, banners to add"],
      ],
    },
    {
      l: 3,
      t: "Match each word to its meaning",
      p: [
        [
          "🔁",
          "Find and Replace",
          "finds a word and puts a new one in its place",
        ],
        ["1️⃣", "Replace", "changes one place at a time"],
        ["♾️", "Replace All", "changes it everywhere in the document"],
        ["➡️", "Find Next", "goes to the next place where the word is"],
        [
          "✅",
          "Spelling and Grammar",
          "checks the text for mistakes and gives ideas to fix them",
        ],
      ],
    },
    {
      l: 3,
      t: "Match each key or line to what it means",
      p: [
        ["⌨️", "Ctrl + H", "opens Find and Replace"],
        ["🔑", "F7", "opens the Editor: Spelling and Grammar"],
        ["🟦", "Double blue line", "a grammar mistake"],
        ["🟥", "Red wavy line", "a spelling mistake"],
        ["🔊", "Read context", "reads the sentence aloud"],
      ],
    },
  ],
};
