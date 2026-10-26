// Should Kids Have Homework Every Day? (Homework Booklet Term 1, pages 37–39, Unit 1 Week 5, argumentative text). Engine: shared/story.js.
// The booklet has no model answers: the answers here are written from the text.
window.STORY = {
  key: "en4-homework",
  title: "Should Kids Have Homework Every Day?",
  kind: "Argumentative text · Homework booklet",
  cover: "img/homework/kids.jpg",
  lesson: { path: "unit1-week5.html", label: "Unit 1 · Week 5" },
  question: "Is homework every day a good idea?",
  gloss: {
    agrees: "thinks the same",
    multiplication: "times: 3 × 4 = 12",
    responsibility: "a job you must do and take care of",
    assignments: "work the teacher gives you",
    manage: "to plan and control",
    additionally: "also",
    argue: "say why they think something",
    social: "about being with other people",
    creativity: "being able to make new things",
    physical: "about your body",
    stress: "a worried, tired feeling",
    hobbies: "things you like to do for fun",
    necessary: "needed",
    reinforce: "to make stronger",
    habits: "things you do again and again",
    overwhelmed: "feeling there is too much to do",
  },
  pages: [
    {
      img: "img/homework/kids.jpg",
      text: [
        "Homework is something that almost every student has to do, but not everyone agrees on whether it’s a good idea to have homework every day. Some people believe that homework is important, while others think kids should have more free time after school.",
      ],
      easy: "Some people think homework every day is good. Other people think kids need free time.",
    },
    {
      ch: "Homework is good 👍",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { t: "3 × 4 = 12", x: 32, y: 24, s: 8, a: "pop:0.4" },
          { e: "🧒", x: 30, y: 64, s: 28 },
          { e: "📚", x: 46, y: 74, s: 14 },
          { e: "⏰", x: 66, y: 40, s: 16, a: "nod" },
          { e: "👩", x: 82, y: 62, s: 24 },
          { e: "👀", x: 82, y: 34, s: 10, a: "blink" },
        ],
        cap: "practice · responsibility · parents see",
      },
      text: [
        "Some people believe that homework is very important. They say that homework helps students practice what they learned in school. For example, if you learned how to do multiplication in math class, doing homework on multiplication can help you remember how to do it. Homework also teaches responsibility. When kids have to complete their assignments on time, they learn how to manage their time and take care of their tasks. Additionally, homework can help parents see what their children are learning at school and how well they understand it.",
      ],
      easy: "Good things about homework: you practice what you learned, you learn responsibility, and your parents see what you learn.",
    },
    {
      ch: "Homework is not so good 👎",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🏫", x: 18, y: 54, s: 26 },
          { t: "6–7 hours", x: 18, y: 22, s: 6 },
          { e: "⚽", x: 46, y: 70, s: 14, a: "jump" },
          { e: "🧒", x: 60, y: 66, s: 24 },
          { e: "📚", x: 84, y: 56, s: 22, a: "pulse" },
          { e: "😩", x: 84, y: 26, s: 14, a: "shake" },
        ],
        cap: "time to play · no stress",
      },
      text: [
        "On the other hand, some people think that kids should not have homework every day. They argue that after spending six to seven hours in school, children need time to relax and play. Playing is important because it helps kids develop their social skills, creativity, and physical health. Too much homework can cause stress and take away from family time or hobbies that children enjoy. Some people also believe that not all homework is helpful. If a student already understands the topic, doing more work on it at home might not be necessary.",
      ],
      easy: "Bad things about homework: kids need time to play and relax. Too much homework causes stress.",
    },
    {
      ch: "To sum up",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "⚖️", x: 50, y: 44, s: 40, a: "nod" },
          { e: "👍", x: 22, y: 60, s: 18 },
          { e: "👎", x: 78, y: 60, s: 18 },
        ],
        cap: "good, but not too much",
      },
      text: [
        "To sum up, homework can help students reinforce what they’ve learned in school and build good habits. However, too much homework can make students feel overwhelmed and take away from other important activities.",
      ],
      easy: "Homework helps you learn, but too much homework is not good.",
    },
  ],
  summary: [
    {
      t: "The question",
      img: "img/homework/kids.jpg",
      text: "Should kids have homework every day?",
    },
    {
      t: "For homework 👍",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { t: "3 × 4 = 12", x: 50, y: 34, s: 10 },
          { e: "📚", x: 50, y: 70, s: 26 },
        ],
      },
      text: "It helps students practice, teaches responsibility, and shows parents what their children learn.",
    },
    {
      t: "Against homework 👎",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "⚽", x: 34, y: 60, s: 26, a: "jump" },
          { e: "😩", x: 70, y: 50, s: 26 },
        ],
      },
      text: "Kids need time to relax and play. Too much homework causes stress. Some homework is not needed.",
    },
    {
      t: "The author’s point of view",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [{ e: "⚖️", x: 50, y: 50, s: 44, a: "nod" }],
      },
      text: "Homework can help, but too much homework is not good.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/homework/kids.jpg",
      q: "What is the genre of this text?",
      o: ["argumentative text", "realistic fiction", "fantasy"],
      x: "It gives reasons for and against homework, and the author gives an opinion.",
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { t: "3 × 4 = 12", x: 50, y: 30, s: 10 },
          { e: "🧒", x: 50, y: 66, s: 30 },
        ],
      },
      q: "Which one is an advantage (a good thing) of homework?",
      o: [
        "It helps students practice what they learned.",
        "It causes stress.",
        "It takes away family time.",
      ],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "📚", x: 40, y: 56, s: 30 },
          { e: "😩", x: 70, y: 40, s: 22, a: "shake" },
        ],
      },
      q: "Which one is a disadvantage (a bad thing) of homework?",
      o: [
        "Too much homework can cause stress.",
        "It teaches responsibility.",
        "Parents see what children learn.",
      ],
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [{ e: "👍", x: 50, y: 50, s: 40, a: "pulse" }],
      },
      q: "What are two advantages of homework?",
      a: "Homework helps students practice what they learned in school. It also teaches responsibility, because kids learn to manage their time.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [{ e: "👎", x: 50, y: 50, s: 40, a: "pulse" }],
      },
      q: "What are two disadvantages of homework?",
      a: "After six to seven hours in school, children need time to relax and play. Too much homework can cause stress and take away from family time or hobbies.",
    },
    {
      tag: "Point of view",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [{ e: "⚖️", x: 50, y: 50, s: 44, a: "nod" }],
      },
      q: "What is the author’s point of view?",
      a: "The author thinks homework can help students learn and build good habits, but too much homework can make students feel overwhelmed.",
    },
  ],
};
