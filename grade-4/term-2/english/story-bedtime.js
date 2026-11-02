// Should Kids Be Allowed to Choose Their Own Bedtime? (school sheet, argumentative text). Homework Booklet Term 2, pages 40–41. Engine: shared/story.js.
// The sheet's header says "Unit 2- Week 5", but it comes with the Unit 3 Week 5 pages. No answer key: the open answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-bedtime",
  title: "Should Kids Be Allowed to Choose Their Own Bedtime?",
  kind: "Argumentative text · Homework booklet",
  cover: "img/bedtime/bed.jpg",
  lesson: { path: "unit3-week5.html", label: "Unit 3 · Week 5" },
  hub: "../../term-1/english/index.html",
  question: "In what ways can advances in science be helpful or harmful?",
  gloss: {
    bedtime: "the time you go to bed",
    debates: "talks where people give different opinions",
    explore: "to look at closely",
    arguments: "reasons for an opinion",
    freedom: "being free to choose",
    argue: "to give reasons for what you think",
    manage: "to plan and control",
    decisions: "choices",
    responsible: "doing what you should do",
    independent: "doing things by yourself",
    routine: "the things you do every day",
    additionally: "also",
    strict: "with rules you must follow",
    especially: "most of all",
    mood: "how you feel",
    performance: "how well you do",
    ensure: "to make sure",
    reasonable: "fair and sensible",
    refreshed: "full of energy again",
    independence: "being able to do things yourself",
    responsibility: "doing what you should do",
    genre: "the kind of text",
    advantage: "a good thing",
  },
  pages: [
    {
      img: "img/bedtime/bed.jpg",
      text: [
        "Bedtime is a topic that often leads to debates between kids and parents. Some people believe that kids should be allowed to choose their own bedtime, while others think it’s important for parents to set a bedtime. Let’s explore the arguments on both sides.",
      ],
      easy: "Kids and parents often talk about bedtime. Should kids choose it, or should parents? Let’s look at both sides.",
    },
    {
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🧒", x: 30, y: 60, s: 30 },
          { e: "🕘", x: 66, y: 36, s: 24, a: "pulse" },
          { e: "🥱", x: 66, y: 70, s: 18, a: "pop:1" },
        ],
        cap: "kids choose",
      },
      text: [
        "Some people believe that kids should have the freedom to choose their own bedtime. They argue that kids need to learn how to manage their time and make decisions for themselves. By choosing their own bedtime, kids can figure out how much sleep they need and learn to be responsible for getting enough rest. This can also help them feel more independent and in control of their daily routine. Additionally, some kids may have different sleep needs, so a one-size-fits-all bedtime might not work for everyone. Letting kids choose could allow them to listen to their bodies and go to bed when they feel tired.",
      ],
      easy: "One side: kids can learn to plan their time and be responsible. Every kid needs a different amount of sleep, so they can go to bed when they feel tired.",
    },
    {
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "👩", x: 30, y: 58, s: 30 },
          { e: "🕗", x: 56, y: 28, s: 20 },
          { e: "🛏️", x: 72, y: 66, s: 30 },
        ],
        cap: "parents set a bedtime",
      },
      text: [
        "Other people believe that parents should set a strict bedtime for their kids. They argue that kids don’t always know what’s best for them, especially when it comes to getting enough sleep. Without a set bedtime, kids might stay up too late and not get enough rest, which can affect their health, mood, and performance in school. Sleep is very important for growing children, and parents are responsible for making sure their kids get the right amount. A set bedtime helps ensure that kids go to bed at a reasonable hour and wake up feeling refreshed and ready for the day.",
      ],
      easy: "Other side: kids might stay up too late. Then they are tired, in a bad mood and do worse at school. A set bedtime helps them wake up fresh.",
    },
    {
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🧒", x: 30, y: 60, s: 28 },
          { e: "⚖️", x: 52, y: 40, s: 26, a: "swing" },
          { e: "😊", x: 74, y: 60, s: 26 },
        ],
        cap: "the author’s opinion",
      },
      text: [
        "I believe that allowing kids to choose their own bedtime can help them develop independence and responsibility, but having a set bedtime ensures they get the sleep they need to stay healthy and do well in school.",
      ],
      easy: "The author sees good things on both sides: choosing helps kids grow up, and a set bedtime gives them enough sleep.",
    },
  ],
  summary: [
    {
      t: "What the text is about",
      img: "img/bedtime/bed.jpg",
      text: "Should kids choose their own bedtime, or should parents set it? The text gives both sides.",
    },
    {
      t: "Kids choose",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🧒", x: 36, y: 56, s: 30 },
          { e: "🕘", x: 66, y: 40, s: 22 },
        ],
      },
      text: "Kids learn to manage their time and be responsible. They can go to bed when they feel tired.",
    },
    {
      t: "Parents set a bedtime",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "👩", x: 36, y: 56, s: 30 },
          { e: "🛏️", x: 68, y: 60, s: 28 },
        ],
      },
      text: "Kids get enough sleep, so they stay healthy, happy and do well in school.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/bedtime/bed.jpg",
      q: "What is the genre of this text?",
      o: ["argumentative text", "realistic fiction", "Haiku"],
      x: "It gives arguments on both sides of a topic.",
    },
    // unverified: the open questions (Homework p. 41)
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🧒", x: 34, y: 58, s: 30 },
          { e: "🕘", x: 66, y: 38, s: 22 },
        ],
      },
      q: "How might choosing their own bedtime help kids become more responsible?",
      a: "Kids learn to manage their time and make their own decisions. They figure out how much sleep they need and learn to be responsible for getting enough rest.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "🥱", x: 40, y: 56, s: 32 },
          { e: "📉", x: 70, y: 46, s: 22 },
        ],
      },
      q: "What is a problem with letting kids choose their own bedtime mentioned in the text?",
      a: "Kids might stay up too late and not get enough rest. This can affect their health, mood and performance in school.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌅", x: 36, y: 50, s: 30 },
          { e: "😊", x: 66, y: 56, s: 28, a: "jump" },
        ],
      },
      q: "What is an advantage of setting a strict bedtime?",
      a: "Kids go to bed at a reasonable hour and get enough sleep, so they wake up feeling refreshed and ready for the day.",
    },
  ],
};
