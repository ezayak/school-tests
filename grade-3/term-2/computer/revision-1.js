// Computer · Grade 3 · Term 2 · Mid-term revision (RoboWord Quest): Unit 2 · Lesson 1 « Robots in our daily lives », Lesson 2 « Working with text ».
// A Quest for shared/quest.js (format at the top of that file). Its card is in games.js (Grade 3 · Term 2 · Mid-term exam).
// Source: the parent's note for Mid-term 2 (2026-11-24): « Unit2-Lesson 1: Robot in our daily lives, Unit2-Lesson 2: working with text. Use the pictures from the lesson ».
// No new school sheet: the questions are the lessons' own (grade-3/computer/chapter-2/lesson-1.js, lesson-2.js: book pages 36–51,
// Practical Assessments 3 and 4, Graded Homework 1 and 2, Graded Classwork 1 and 2 with their model answers),
// their pictures by path, the Mini Word button icons (shared/wordsim.js, loaded by the page) drawn as in the lessons.
// No answer key beyond the lessons': the answers are the lessons' (the Classwork answers follow the model answers).
// Changed to fit the Quest: « Fixed or mobile? », « Good or not good? », « Where do robots help? » (put in a group) and the picture
// matches became choose questions; « How a robot works » and « Steps in order » became « what comes first / next » questions;
// « Choose all that are right » questions became one question per answer; the « Do it in Mini Word » missions became « which button / which keys »;
// the words of both lessons became matching rounds.
// Left out: the open questions « Think and answer » (Why are robots important? Why highlight text?): the lessons have them.

const TF = ["True", "False"];
const P1 = (n) => `../../computer/chapter-2/img/lesson-1/${n}.jpg`;
const P2 = (n) => `../../computer/chapter-2/img/lesson-2/${n}.jpg`;
// true or false: a = true / false; pic = { p } | { e } | { svg }
const tf = (l, q, a, pic, x) => ({
  l,
  ...pic,
  q,
  o: TF,
  c: a ? 0 : 1,
  k: 1,
  x,
});
// Fixed or mobile? (right first)
const FM = ["Fixed robot", "Mobile robot"];
const fm = (q, fixed, pic, x) => ({
  l: 1,
  ...pic,
  q,
  o: fixed ? FM : [FM[1], FM[0]],
  x,
});
// Advantage or disadvantage?
const AD = ["Advantage 👍", "Disadvantage 👎"];
const ad = (q, good, e, x) => ({
  l: 1,
  e,
  q,
  o: AD,
  c: good ? 0 : 1,
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
// keyboard keys side by side: keys("Ctrl", "F")
const keys = (...ks) => {
  const w = 96,
    gap = 40,
    all = ks.length * w + (ks.length - 1) * gap,
    x0 = 160 - all / 2;
  return ks
    .map((k, i) => {
      const x = x0 + i * (w + gap);
      return (
        `<rect x="${x}" y="50" width="${w}" height="80" rx="12" fill="#fff" stroke="#555" stroke-width="3"/>` +
        `<rect x="${x + 6}" y="56" width="${w - 12}" height="62" rx="8" fill="#f2f3f5"/>` +
        `<text class="lbl-big" x="${x + w / 2}" y="88" text-anchor="middle" dominant-baseline="central">${k}</text>` +
        (i
          ? `<text class="lbl-big" x="${x - gap / 2}" y="90" text-anchor="middle" dominant-baseline="central">+</text>`
          : "")
      );
    })
    .join("");
};

window.QUEST = {
  key: "g3comp-t2-mid",
  hub: "../../../index.html",
  eyebrow: "Grade 3 Computer · Mid-term 2 revision",
  title: ["RoboWord", "Quest"],
  imgDir: "../../computer/chapter-2/img/lesson-1",
  cover: "mobile-robot",
  chips: [
    ["Robots", "pe"],
    ["Fixed & mobile", "ke"],
    ["Bold · Italic · Underline", "cool"],
    ["Find · Undo · Zoom", "green"],
  ],
  lessons: [
    { n: 1, l: "L1 · Robots in our daily lives" },
    { n: 2, l: "L2 · Working with text" },
  ],
  mc: [
    /* ===== Lesson 1 · What is a robot? (Learn cards, Graded Classwork 1) ===== */
    {
      l: 1,
      p: "battery-robot",
      q: "What is a robot?",
      o: [
        "A machine that follows directions and does tasks",
        "A person who works in a factory",
        "A kind of computer game",
      ],
      x: "A robot is a special machine that follows directions and does tasks.",
    },
    {
      l: 1,
      e: "👀 ➜ 🧠 ➜ 🦾",
      q: "How does a robot work? What does it do first?",
      o: [
        "It senses the place around it",
        "It acts and does something",
        "It uses the information",
      ],
      x: "1. It senses the place around it. 2. It uses the information. 3. It acts.",
    },
    {
      l: 1,
      e: "👀 ➜ 🧠 ➜ 🦾",
      q: "The robot sensed the place around it and used the information. What does it do next?",
      o: [
        "It acts: it does something",
        "It goes to sleep",
        "It senses again and stops",
      ],
      x: "The third step: the robot acts.",
    },
    {
      l: 1,
      p: "sensors",
      q: "Does the robot get information from its environment?",
      o: ["Yes", "No"],
      k: 1,
      x: "Its sensors find out about the things around it.",
    },
    {
      l: 1,
      e: "🎮 ➜ 🤖",
      q: "Can a human control a robot remotely?",
      o: ["Yes", "No"],
      k: 1,
      x: "People can control a mobile robot with a remote.",
    },

    /* ===== Lesson 1 · Fixed or mobile? (game, Practical Assessment 3, Homework 1, Classwork 1) ===== */
    fm(
      "This robot arm works in a factory. It stays in one place. What is it?",
      true,
      { p: "fixed-robot" },
      "A fixed robot stays in one place.",
    ),
    fm(
      "This robot has wheels. It moves from place to place. What is it?",
      false,
      { p: "mobile-robot" },
      "A mobile robot moves from place to place.",
    ),
    fm(
      "A robot vacuum cleans the whole house. What is it?",
      false,
      { e: "🧹 🤖" },
      "It moves around the house: a mobile robot.",
    ),
    fm(
      "A drone flies in the air. What is it?",
      false,
      { e: "🚁" },
      "Mobile robots move on land, in the sea and in the air.",
    ),
    fm(
      "A robot that builds cars in a factory, very fast. What is it?",
      true,
      { e: "🏭 🚗" },
      "Fixed robots work in factories: they are fast and powerful.",
    ),
    fm(
      "Who am I? They use me in factories because I am very fast.",
      true,
      { ps: ["fixed-robot", "mobile-robot"] },
      "A fixed robot is fast and powerful.",
    ),
    fm(
      "Who am I? I can carry heavy products, more than humans.",
      true,
      { ps: ["fixed-robot", "mobile-robot"] },
      "A fixed robot lifts heavy things.",
    ),
    fm(
      "Who am I? You can use me in the sea and in the air.",
      false,
      { e: "🌊 ✈️" },
      "A mobile robot moves on land, in the sea and in the air.",
    ),
    {
      l: 1,
      p: "fixed-robot",
      q: "The fixed robot…",
      o: ["stays in one place", "moves everywhere"],
      x: "A fixed robot stays in one place.",
    },
    {
      l: 1,
      ps: ["fixed-robot", "mobile-robot"],
      q: "Which of these is a fixed robot?",
      o: ["A", "B"],
      k: 1,
      x: "A: the robotic arm stays in one place.",
    },
    {
      l: 1,
      e: "🦾 🌊",
      q: "A type of fixed robot is…",
      o: ["a robotic arm", "a sea robot", "a robot vacuum"],
      x: "A robotic arm is a fixed robot.",
    },
    {
      l: 1,
      p: "mobile-robot",
      q: "What is a mobile robot?",
      o: [
        "A robot that can move from place to place",
        "A robot that stays in one place",
      ],
      x: "Mobile = it moves.",
    },
    {
      l: 1,
      p: "mobile-robot",
      q: "A ___ robot can move in the air, in the sea or navigate on land.",
      o: ["mobile", "fixed"],
      x: "A mobile robot moves on land, in the sea and in the air.",
    },
    {
      l: 1,
      p: "mobile-robot",
      q: "Is a robot on wheels one type of robot?",
      o: ["Yes", "No"],
      k: 1,
      x: "A robot on wheels is a mobile robot.",
    },
    {
      l: 1,
      p: "sensors",
      q: "What helps a mobile robot know where to go?",
      o: ["Sensors", "Stickers", "Muscles"],
      x: "A remote or its sensors tell it where to go.",
    },
    {
      l: 1,
      p: "mobile-robot",
      q: "Can a mobile robot work without a remote or sensors?",
      o: ["No", "Yes"],
      k: 1,
      x: "It needs a remote or its sensors to know where to go.",
    },

    /* ===== Lesson 1 · Sensors, energy, motors ===== */
    {
      l: 1,
      e: "👂 ✋",
      q: "Name two examples of human senses.",
      o: ["Hearing and touch", "Temperature and weight", "Wheels and motors"],
      x: "We have senses: hearing and touch.",
    },
    {
      l: 1,
      p: "sensors",
      q: "Name three examples of robot senses.",
      o: ["Sound, weight and temperature", "Feelings", "Food and water"],
      x: "Sensors feel movement, weight, sound and temperature.",
    },
    {
      l: 1,
      p: "battery-robot",
      q: "The robot needs ___ to work.",
      o: ["power", "food"],
      x: "We need food for energy. Robots need power.",
    },
    {
      l: 1,
      p: "battery-robot",
      q: "Where do many robots get their energy from?",
      o: ["Batteries", "Food", "Water"],
      x: "Many robots get energy from batteries.",
    },
    {
      l: 1,
      p: "motor-arm",
      q: "A motor is like ___. It helps the robot move using electricity.",
      o: ["muscles", "food"],
      x: "Motors are like muscles for robots.",
    },
    {
      l: 1,
      p: "motor-arm",
      q: "Do robots use muscles?",
      o: ["No", "Yes"],
      k: 1,
      x: "Robots use motors.",
    },
    tf(
      1,
      "Robots use sensors to understand the world around them.",
      true,
      { p: "sensors" },
      "Sensors tell the robot about the things around it.",
    ),
    tf(
      1,
      "Sensors help robots sense movement, weight and sound.",
      true,
      { p: "sensors" },
      "And temperature too.",
    ),
    tf(
      1,
      "Robots use muscles to move.",
      false,
      { p: "motor-arm" },
      "Robots use motors. Motors are like muscles.",
    ),
    tf(
      1,
      "Motors help robots move and do tasks by using electricity to create movement.",
      true,
      { p: "motor-arm" },
      "Motors use electricity to make movement.",
    ),
    tf(
      1,
      "Many robots get their energy from batteries.",
      true,
      { p: "battery-robot" },
      "Robots need power: often from batteries.",
    ),
    tf(
      1,
      "Some robots get their energy from food, just like humans.",
      false,
      { p: "battery-robot" },
      "Robots get energy from batteries, not food.",
    ),
    tf(
      1,
      "A fixed robot moves from place to place.",
      false,
      { p: "fixed-robot" },
      "A fixed robot stays in one place.",
    ),
    tf(
      1,
      "Mobile robots navigate on land, in the sea and in the air.",
      true,
      { p: "mobile-robot" },
      "Mobile robots move from place to place.",
    ),
    tf(
      1,
      "Fixed robots are used in factories because they are fast and powerful.",
      true,
      { p: "fixed-robot" },
      "They lift heavy things and make cars faster than people.",
    ),

    /* ===== Lesson 1 · Robots help us every day, where robots are used ===== */
    {
      l: 1,
      p: "factory",
      q: "Where are robots commonly used?",
      o: ["In factories", "In libraries", "In movie theaters"],
      x: "Robots make toys, cars and clothes in factories.",
    },
    {
      l: 1,
      p: "hospital",
      q: "Why do doctors use robots in surgery?",
      o: [
        "To do surgery more carefully",
        "To help lift heavy things",
        "To entertain patients",
      ],
      x: "Robots are very accurate: they help doctors in surgery.",
    },
    {
      l: 1,
      p: "hospital",
      q: "Can a robot help a doctor during surgery?",
      o: ["Yes", "No"],
      k: 1,
      x: "Robots help doctors in hospitals.",
    },
    {
      l: 1,
      p: "vending",
      q: "How do vending machines help people?",
      o: [
        "By giving out snacks and drinks",
        "By giving directions",
        "By giving out books",
      ],
      x: "Vending machines give snacks and drinks.",
    },
    {
      l: 1,
      ps: ["hospital", "factory", "construction"],
      q: "This robot helps the doctor during surgery. Where does it work?",
      o: ["Hospital", "Factory", "Construction site"],
      k: 1,
      x: "Robots help doctors in hospitals.",
    },
    {
      l: 1,
      ps: ["hospital", "factory", "construction"],
      q: "This crane lifts heavy things to build a tall building. Where does it work?",
      o: ["Construction site", "Hospital", "Factory"],
      c: 2,
      k: 1,
      x: "Cranes lift heavy things on construction sites.",
    },
    {
      l: 1,
      ps: ["hospital", "factory", "construction"],
      q: "This robot makes toys and clothes quickly. Where does it work?",
      o: ["Hospital", "Factory", "Construction site"],
      c: 1,
      k: 1,
      x: "Robots make toys, cars and clothes in factories.",
    },
    {
      l: 1,
      p: "where",
      q: "Where are robots used? Which one is wrong?",
      o: ["In the clouds", "Factories", "Hospitals", "Construction sites"],
      x: "Robots work in factories, hospitals and construction sites.",
    },
    {
      l: 1,
      ps: ["sensors", "where"],
      q: "Which picture shows the sensors of a robot?",
      o: ["A", "B"],
      k: 1,
      x: "A: movement, weight, sound and temperature. B shows where robots work.",
    },
    tf(
      1,
      "Automatic doors, ATMs and vending machines are robots.",
      true,
      { p: "vending" },
      "They help us every day.",
    ),
    tf(
      1,
      "A vending machine is a robot.",
      true,
      { p: "vending" },
      "It gives us snacks and drinks.",
    ),
    tf(
      1,
      "Robots are used to help people with tasks in hospitals.",
      true,
      { p: "hospital" },
      "They help doctors in surgery.",
    ),
    tf(
      1,
      "Robots make tasks slow and hard.",
      false,
      { e: "🐢" },
      "Robots make tasks faster and easier.",
    ),

    /* ===== Lesson 1 · Advantages and disadvantages (game, Homework 1) ===== */
    ad(
      "Robots never get tired.",
      true,
      "💪",
      "They never get tired: an advantage.",
    ),
    ad("Robots are expensive.", false, "💰", "Expensive: a disadvantage."),
    ad("Robots work very fast.", true, "⚡", "Very fast: an advantage."),
    ad(
      "Robots need energy to work.",
      false,
      "🔋",
      "They need energy (batteries): a disadvantage.",
    ),
    ad("Robots are very accurate.", true, "🎯", "Accurate: an advantage."),
    ad(
      "Robots cannot make choices by themselves.",
      false,
      "🤷",
      "No choices by themselves: a disadvantage.",
    ),
    ad(
      "Robots can break down for days or weeks.",
      false,
      "🛠️",
      "Break down: a disadvantage. They need maintenance.",
    ),
    ad(
      "Robots can do dangerous jobs.",
      true,
      "⛑️",
      "They do tasks most people cannot.",
    ),
    {
      l: 1,
      p: "advdis",
      q: "Which one is NOT an advantage of robots?",
      o: ["They work with muscles", "They work fast", "They don't get tired"],
      x: "Robots work with motors, not muscles.",
    },
    {
      l: 1,
      p: "advdis",
      q: "Which one is NOT a disadvantage of robots?",
      o: [
        "They can think like a human",
        "They are expensive",
        "They need batteries to work",
      ],
      x: "Robots cannot think like a human or in a creative way.",
    },
    {
      l: 1,
      p: "advdis",
      q: "Which one is NOT a disadvantage of robots?",
      o: [
        "They need food and water to work",
        "They need maintenance",
        "A programming error",
      ],
      x: "Robots need power, not food and water.",
    },
    tf(
      1,
      "Robots can perform tasks that most humans cannot.",
      true,
      { p: "advdis" },
      "An advantage of robots.",
    ),

    /* ===== Lesson 2 · Which button? (game, Practical Assessment 4, Homework 2) ===== */
    {
      l: 2,
      svg: btn("bold", "Bold"),
      q: "Make the text thick and dark. Which button?",
      o: ["Bold", "Italic", "Underline"],
      x: "B = Bold: thick letters.",
    },
    {
      l: 2,
      svg: btn("italic", "Italic"),
      q: "Make the letters slope. Which button?",
      o: ["Italic", "Bold", "Underline"],
      x: "I = Italic: sloping letters.",
    },
    {
      l: 2,
      p: P2("underline"),
      q: "Put a line under the words. Which button?",
      o: ["Underline", "Bold", "Italic"],
      x: "U = Underline: a line under the words.",
    },
    {
      l: 2,
      p: P2("highlighted"),
      q: "Colour behind the words, like a marker pen. Which button?",
      o: ["Text Highlight Color", "Font Color", "Bold"],
      x: "Text Highlight Color colours behind the words.",
    },
    {
      l: 2,
      svg: btn("fontcolor", "Font Color"),
      q: "Change the colour of the letters. Which button?",
      o: ["Font Color", "Text Highlight Color", "Underline"],
      x: "Font Color = the colour of the letters.",
    },
    {
      l: 2,
      svg: btn("fontcolor", "?"),
      q: "Which one is this button?",
      o: ["Font Color", "Text Highlight Color", "Bold"],
      x: "The A with a coloured line under it: Font Color.",
    },
    {
      l: 2,
      svg: btn("highlight", "?"),
      q: "Which one is this button?",
      o: ["Text Highlight Color", "Font Color", "Underline"],
      x: "The marker pen: Text Highlight Color.",
    },
    {
      l: 2,
      svg: btn("find", "?"),
      q: "Which one is this button? (Ctrl + F)",
      o: ["Find", "Replace", "Select"],
      x: "The magnifying glass: Find.",
    },
    {
      l: 2,
      p: P2("find"),
      q: "Find a word in the text. Which button?",
      o: ["Find", "Undo", "Save"],
      x: "Home tab › Editing › Find.",
    },
    {
      l: 2,
      svg: btn("undo", "Undo"),
      q: "Go back: undo your last action. Which button?",
      o: ["Undo", "Find", "Bold"],
      x: "Undo takes back the last action.",
    },
    {
      l: 2,
      p: P2("highlight"),
      q: "To highlight the selected text, you use…",
      o: ["Text Highlight Color", "Font Color"],
      x: "Text Highlight Color, like a marker pen.",
    },

    /* ===== Lesson 2 · Select first! ===== */
    {
      l: 2,
      p: P2("boy-select"),
      q: "To use Bold, you ___ select the text.",
      o: ["should", "shouldn't"],
      k: 1,
      x: "Remember to select the text before you format it.",
    },
    {
      l: 2,
      p: P2("select-text"),
      q: "To add and remove Bold, Italic, Underline, Highlight and Font Color, you ___ select the text first.",
      o: ["should", "shouldn't"],
      k: 1,
      x: "First select the text, then press the button.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "B"),
      q: "Can you use Ctrl + B, Ctrl + I or Ctrl + U without selecting?",
      o: ["No", "Yes"],
      k: 1,
      x: "Select the text first.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "F"),
      q: "Which shortcut can you use WITHOUT selecting the text first?",
      o: ["Ctrl + F", "Ctrl + U", "Ctrl + B"],
      x: "Ctrl + F and Ctrl + Z work without selecting. Ctrl + U needs selected text.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "Z"),
      q: "Which shortcut can you use WITHOUT selecting the text first?",
      o: ["Ctrl + Z", "Ctrl + I", "Ctrl + U"],
      x: "Ctrl + Z (Undo) works without selecting.",
    },
    tf(
      2,
      "You must select the text before you make it bold.",
      true,
      { p: P2("boy-select") },
      "Select first, then click Bold.",
    ),

    /* ===== Lesson 2 · Shortcut keys (Homework 2, Classwork 2, Practical Assessment 4) ===== */
    {
      l: 2,
      svg: keys("Ctrl", "?"),
      q: "To bold the selected text, use…",
      o: ["Ctrl + B", "B + Ctrl", "Shift + B"],
      x: "Ctrl + B = Bold.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "?"),
      q: "To italic the selected text, use…",
      o: ["Ctrl + I", "I + Ctrl", "Shift + I"],
      x: "Ctrl + I = Italic.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "?"),
      q: "To underline the selected text, use…",
      o: ["Ctrl + U", "U + Ctrl", "Shift + U"],
      x: "Ctrl + U = Underline.",
    },
    {
      l: 2,
      p: P2("find"),
      q: "How do you find your phrase?",
      o: ["Ctrl + F", "Ctrl + Z", "Ctrl + B"],
      x: "Ctrl + F opens Find.",
    },
    {
      l: 2,
      p: P2("find"),
      q: "You use ___ to find a word or phrase.",
      o: ["Ctrl + F", "Ctrl + W"],
      x: "Ctrl + F = Find.",
    },
    {
      l: 2,
      p: P2("undo"),
      q: "How do you get the last action back?",
      o: ["Ctrl + Z", "Z + Ctrl", "Ctrl + F"],
      x: "Ctrl + Z = Undo.",
    },
    {
      l: 2,
      p: P2("undo"),
      q: "___ is used to reverse an action.",
      o: ["Ctrl + Z", "Shift + Z", "Z + Ctrl"],
      x: "Ctrl + Z = Undo.",
    },
    {
      l: 2,
      svg: keys("?", "F"),
      q: "Which key do you use with the F key to search for a text?",
      o: ["Ctrl", "Shift", "Fn"],
      x: "Ctrl + F = Find.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "F"),
      q: "Ctrl + F is used to…",
      o: ["find a word", "capitalize the letter “F”", "make the text bold"],
      x: "Ctrl + F opens Find.",
    },
    {
      l: 2,
      svg: keys("Ctrl", "S"),
      q: "What does Ctrl + S do?",
      o: ["Saves your Word file", "Finds a word", "Underlines the text"],
      x: "You can use Ctrl + S to save your Word file.",
    },
    tf(
      2,
      "Ctrl + F opens Find.",
      true,
      { svg: keys("Ctrl", "F") },
      "Ctrl + F = Find.",
    ),
    tf(
      2,
      'The keyboard shortcut to open the "Find" tool in Microsoft Word is Ctrl + F.',
      true,
      { p: P2("find") },
      "Or Home tab › Editing › Find.",
    ),
    tf(
      2,
      "Ctrl + Z makes the text bold.",
      false,
      { svg: keys("Ctrl", "Z") },
      "Ctrl + Z = Undo. Ctrl + B = Bold.",
    ),
    tf(
      2,
      "You use Ctrl + Z to find a word.",
      false,
      { svg: keys("Ctrl", "Z") },
      "Ctrl + F finds a word.",
    ),
    tf(
      2,
      "You can undo a formatting change by pressing Ctrl + Z.",
      true,
      { svg: keys("Ctrl", "Z") },
      "Ctrl + Z = Undo.",
    ),
    tf(
      2,
      "You use F + Ctrl to find a phrase.",
      true,
      { svg: keys("Ctrl", "F") },
      "Ctrl and F together.",
    ),
    tf(
      2,
      "You use Shift + B to bold the selected text.",
      false,
      { svg: keys("Shift", "B") },
      "Ctrl + B makes it bold.",
    ),
    tf(
      2,
      "You can use Ctrl + S to save your Word file.",
      true,
      { svg: keys("Ctrl", "S") },
      "Ctrl + S = Save.",
    ),
    tf(
      2,
      "Ctrl + F can only find numbers, not words.",
      false,
      { p: P2("find") },
      "It finds words too.",
    ),

    /* ===== Lesson 2 · Undo, zoom, Find, where things are (Book Hands on!, Classwork 2) ===== */
    tf(
      2,
      "You can use Ctrl + Z after you save your file.",
      false,
      { p: P2("undo") },
      "You can't undo saving a file.",
    ),
    tf(
      2,
      'You can undo the "Save" command by pressing the Undo button.',
      false,
      { p: P2("undo") },
      "Some things can't be undone, like saving a file.",
    ),
    tf(
      2,
      "Zoom makes the font size bigger.",
      false,
      { p: P2("zoom") },
      "Zoom only makes it look bigger on the screen.",
    ),
    tf(
      2,
      "Adjusting the zoom slider will increase the font size of the text.",
      false,
      { p: P2("zoom") },
      "Zoom does not change the font size.",
    ),
    tf(
      2,
      'Using the "Underline" option will change the font color to black.',
      false,
      { p: P2("underline") },
      "Underline only puts a line under the words.",
    ),
    tf(
      2,
      "Highlight is like a marker pen.",
      true,
      { p: P2("highlighted") },
      "It colours behind the words.",
    ),
    {
      l: 2,
      p: P2("highlighted"),
      q: "Does the Text Highlight tool add colour behind the selected text?",
      o: ["Yes", "No"],
      k: 1,
      x: "Like a marker pen.",
    },
    {
      l: 2,
      p: P2("zoom"),
      q: "Where can you find the zoom tool in your Word document?",
      o: ["On the status bar", "On the File tab", "On the title bar"],
      x: "The zoom slider is on the status bar at the bottom.",
    },
    {
      l: 2,
      p: P2("zoom"),
      q: "You drag the zoom slider to the right. What happens?",
      o: [
        "The text looks bigger",
        "The text looks smaller",
        "The font size changes to 72",
      ],
      x: "Right: bigger. Left: smaller. The real font size does not change.",
    },
    {
      l: 2,
      svg: btn("bold", "Bold"),
      q: "Which tab contains the option to make text bold?",
      o: ['The "Home" tab', 'The "View" tab', 'The "File" tab'],
      x: "Home tab › Font group.",
    },
    {
      l: 2,
      e: "🔤 🔠 🎨",
      q: "You can find the Font group in the ___ tab.",
      o: ["Home", "File", "View"],
      x: "Home tab › Font group: font, size, colour, bold, italic, underline.",
    },
    {
      l: 2,
      e: "🔤 🅱️ 🖍️",
      q: 'Which of these is NOT a formatting option in the "Font" group?',
      o: ["Find", "Bold", "Highlight"],
      x: "Find is in the Editing group.",
    },
    {
      l: 2,
      svg: btn("find", "Find"),
      q: "Where can you find the Find command?",
      o: ["On the Home tab", "On the status bar", "On the Help tab"],
      x: "Home tab › Editing › Find.",
    },
    {
      l: 2,
      p: P2("find"),
      q: "Can you find any word in the document easily?",
      o: ["Yes", "No"],
      k: 1,
      x: "Type the word in Find: it is highlighted everywhere in the text.",
    },
    {
      l: 2,
      p: P2("find"),
      q: "You type the word « robots » in Find. What happens?",
      o: [
        "Every « robots » in the text is highlighted",
        "Every « robots » is deleted",
        "The text gets bigger",
      ],
      x: "Find highlights the word everywhere in the text.",
    },
    {
      l: 2,
      p: P2("typing"),
      q: "Which program can you use to write and format an article about robots?",
      o: ["Microsoft Word", "Paint", "A calculator"],
      x: "Word is a program to write and format text.",
    },
    {
      l: 2,
      e: "📄 ➜ 🖨️",
      q: "How do you print a document?",
      o: [
        "File tab › Print › Print",
        "Home tab › Bold",
        "Drag the zoom slider",
      ],
      x: "File tab › Print, choose the printer, then click Print.",
    },

    /* ===== Lesson 2 · Steps in order (game) ===== */
    {
      l: 2,
      p: P2("underline"),
      q: "You want the title Bold, Italic and Underlined. What do you do first?",
      o: ["Select the title", "Click Bold", "Click Underline"],
      x: "Select first, then Bold, then Italic, then Underline.",
    },
    {
      l: 2,
      p: P2("highlight"),
      q: "To highlight a sentence in yellow: click the arrow next to Text Highlight Color, then…",
      o: [
        "click Yellow, then select the sentence",
        "click Print",
        "press Ctrl + Z",
      ],
      x: "Arrow › Yellow › select the text.",
    },
  ],

  mt: [
    {
      l: 1,
      t: "Match each word to its meaning",
      p: [
        ["🤖", "Robot", "a machine that follows directions and does tasks"],
        ["📍", "Fixed robot", "stays in one place, in factories"],
        ["🛞", "Mobile robot", "moves on land, in the sea and in the air"],
        ["📡", "Sensors", "feel movement, weight, sound and temperature"],
        ["⚙️", "Motors", "like muscles: they use electricity to move"],
      ],
    },
    {
      l: 1,
      t: "Match each robot to where it helps us",
      p: [
        ["🏥", "Hospital", "helps doctors in surgery"],
        ["🏭", "Factory", "makes toys, cars and clothes"],
        ["🏗️", "Construction site", "a crane lifts heavy things"],
        ["🥤", "Vending machine", "gives snacks and drinks"],
        ["🏧", "ATM", "gives us money"],
      ],
    },
    {
      l: 2,
      t: "Match the keys and what they do",
      p: [
        ["🅱️", "Ctrl + B", "Bold"],
        ["📐", "Ctrl + I", "Italic"],
        ["➖", "Ctrl + U", "Underline"],
        ["↩️", "Ctrl + Z", "Undo"],
        ["🔍", "Ctrl + F", "Find"],
      ],
    },
    {
      l: 2,
      t: "Match each button to what it does",
      p: [
        ["🔤", "Font", "the kind of letters"],
        ["🔠", "Font Size", "how big the letters are"],
        ["🎨", "Font Color", "the colour of the letters"],
        [
          "🖍️",
          "Text Highlight Color",
          "colour behind the words, like a marker",
        ],
        ["🔎", "Zoom slider", "makes the page look bigger or smaller"],
      ],
    },
  ],
};
