// Should Kids Be Allowed to Have Dessert Every Day? (school sheet, argumentative text). Homework Booklet Term 2, pages 42–43. Engine: shared/story.js.
// No answer key: the open answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-dessert",
  title: "Should Kids Be Allowed to Have Dessert Every Day?",
  kind: "Argumentative text · Homework booklet",
  cover: "img/dessert/desserts.jpg",
  lesson: { path: "unit3-week5.html", label: "Unit 3 · Week 5" },
  hub: "../../term-1/english/index.html",
  question: "In what ways can advances in science be helpful or harmful?",
  gloss: {
    dessert: "something sweet after a meal",
    treat: "something nice you do not have every day",
    portioned: "given in a small amount",
    reasonably: "in a sensible way",
    harm: "something bad",
    daily: "every day",
    overeat: "to eat too much",
    sugary: "with a lot of sugar",
    "long-term": "lasting a long time",
    diabetes: "an illness with too much sugar in the blood",
    occasions: "special days",
    appreciate: "to enjoy and value",
    moreover: "also",
    limiting: "giving less of",
    encourage: "to help someone want to do something",
    impact: "an effect",
    genre: "the kind of text",
  },
  pages: [
    {
      img: "img/dessert/desserts.jpg",
      text: [
        "Dessert is something that many kids look forward to after a meal. But should kids be allowed to have dessert every day?",
      ],
      easy: "Kids like dessert. Should they have it every day?",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🍪", x: 30, y: 56, s: 28, a: "pop" },
          { e: "🍎", x: 52, y: 56, s: 24, a: "pop:0.4" },
          { e: "😋", x: 76, y: 52, s: 30 },
        ],
        cap: "a small treat",
      },
      text: [
        "Some people argue that dessert can be a small treat that makes kids happy and gives them something to look forward to. Having a little bit of dessert, like a cookie or a piece of fruit, can be a nice way to end a meal. Some parents believe that as long as the dessert is portioned reasonably and the rest of the meal is healthy, there’s no harm in having a daily treat. Also, they argue that by allowing dessert every day, kids might not feel the need to overeat when they do get a treat, because they know they will have another chance tomorrow.",
      ],
      easy: "One side: a small dessert makes kids happy. If the meal is healthy, a little dessert is OK. Kids will not eat too much, because they know there is more tomorrow.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🍰", x: 26, y: 56, s: 26 },
          { e: "🎂", x: 50, y: 40, s: 22, a: "pop:0.6" },
          { e: "🥕", x: 74, y: 60, s: 24, a: "pop:1" },
        ],
        cap: "for special days",
      },
      text: [
        "Others argue that too much sugar can be bad for children’s health. Eating sugary desserts every day can lead to problems like weight gain and even long-term health issues such as diabetes. Instead of having dessert every day, they believe it’s better to save it for special occasions, like birthdays or holidays. This way, dessert remains something special and kids learn to appreciate it more. Moreover, by limiting dessert, parents can encourage their children to enjoy healthier snacks, like fruits and vegetables, which are better for their growing bodies.",
      ],
      easy: "Other side: too much sugar is bad for health. Save dessert for birthdays and holidays. Then it stays special, and kids eat more fruit and vegetables.",
    },
    {
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🍨", x: 34, y: 56, s: 28 },
          { e: "⚖️", x: 66, y: 46, s: 26, a: "swing" },
        ],
        cap: "the author’s opinion",
      },
      text: [
        "I think having a small dessert every day can be a fun treat, but it’s also important to think about the impact on health.",
      ],
      easy: "The author thinks a small dessert every day is fun, but we must think about our health.",
    },
  ],
  summary: [
    {
      t: "What the text is about",
      img: "img/dessert/desserts.jpg",
      text: "Should kids have dessert every day? The text gives both sides.",
    },
    {
      t: "Yes, every day",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🍪", x: 36, y: 56, s: 28 },
          { e: "😋", x: 66, y: 52, s: 28 },
        ],
      },
      text: "A small treat makes kids happy, and they will not overeat.",
    },
    {
      t: "Only on special days",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🎂", x: 36, y: 52, s: 28 },
          { e: "🥕", x: 66, y: 58, s: 26 },
        ],
      },
      text: "Too much sugar is bad for health. Dessert stays special, and kids eat healthier snacks.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/dessert/desserts.jpg",
      q: "What is the genre of this text? Why?",
      o: [
        "It’s an argumentative text because it gives different opinions on certain topics.",
        "It’s a realistic fiction text because it presents real information.",
        "It’s an argumentative text because the events are real.",
      ],
    },
    // unverified: the open questions (Homework p. 43)
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🍬", x: 34, y: 56, s: 28 },
          { e: "🩺", x: 66, y: 50, s: 28 },
        ],
      },
      q: "How might having dessert every day affect a child’s health?",
      a: "Eating sugary desserts every day can lead to weight gain and long-term health problems such as diabetes.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🎂", x: 36, y: 52, s: 30, a: "pop" },
          { e: "🎉", x: 68, y: 40, s: 22 },
        ],
      },
      q: "Why should dessert be saved for special occasions?",
      a: "So dessert stays something special and kids learn to appreciate it more. Also, kids eat less sugar and enjoy healthier snacks, like fruits and vegetables.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🍨", x: 34, y: 56, s: 28 },
          { e: "⚖️", x: 66, y: 46, s: 26 },
        ],
      },
      q: "What is the author’s point of view?",
      a: "The author thinks a small dessert every day can be a fun treat, but it is also important to think about the impact on health.",
    },
  ],
};
