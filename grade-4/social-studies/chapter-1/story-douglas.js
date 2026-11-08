// Marjory Stoneman Douglas: Rescuer of the Everglades (myWorld Interactive 4, Chapter 1, Citizenship, book p. 36). Engine: shared/story.js.
// Text exactly as printed, one paragraph cut into short pages. No Questions tab: the "Find Out More" questions are left out (a story to know, not a test).
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-1-lesson-4.py
window.STORY = {
  key: "ss4-douglas",
  subject: "Social Studies",
  title: "Marjory Stoneman Douglas",
  kind: "Citizenship · Rescuer of the Everglades · Book p. 36",
  cover: "img/douglas/douglas.jpg",
  lesson: { path: "lesson-4.html", label: "Lesson 4" },
  hub: "../index.html",
  question: "How can one person help to protect the environment?",
  gloss: {
    journalist: "a person who writes news for a newspaper",
    proved: "showed that it is true",
    massachusetts: "a state in the north-east of the USA",
    miami: "a big city in Florida",
    newspaper: "printed pages with the news of the day",
    discovered: "found out",
    everglades: "a big, wet, grassy place in the south of Florida",
    marshy: "wet and soft, with water and tall grass",
    remarkable: "very special",
    environment: "the land, water, plants and animals around us",
    alligators: "big reptiles with long mouths and sharp teeth",
    panthers: "big wild cats",
    roam: "walk around freely",
    countless: "too many to count",
    national: "of the whole country",
    park: "a place that is protected for everyone",
    airport: "a place where planes land and take off",
    determination: "not giving up",
    preserve: "keep safe, as it is",
    protect: "keep safe from harm",
    evident: "easy to see",
    organization: "a group of people who work together",
  },
  pages: [
    {
      ch: "Marjory Stoneman Douglas (1890–1998)",
      img: "img/douglas/douglas.jpg",
      text: [
        "Some people really do change the world! Marjory Stoneman Douglas proved that. Douglas was a journalist and writer. In 1915, she moved from Massachusetts to Miami, Florida, to work for a newspaper.",
      ],
      easy: "Marjory Stoneman Douglas wrote for a newspaper. In 1915 she moved to Miami, in Florida.",
    },
    {
      ch: "Rescuer of the Everglades",
      img: "img/douglas/everglades.jpg",
      text: [
        "Soon after Douglas arrived in Florida, she discovered how much her new state had to offer. She wrote about the people and different places in the state. Some of those stories were about the Everglades, a marshy area in southern Florida.",
      ],
      easy: "Douglas wrote about the Everglades: a big, wet, grassy place in the south of Florida.",
    },
    {
      ch: "Rescuer of the Everglades",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🐊", x: 25, y: 75, s: 22, a: "wander" },
          { e: "🐢", x: 60, y: 82, s: 14 },
          { e: "🦌", x: 80, y: 55, s: 18 },
          { e: "🦋", x: 40, y: 25, s: 12, a: "float" },
          { e: "🐦", x: 70, y: 18, s: 12, a: "float" },
        ],
        cap: "animals of the Everglades",
      },
      text: [
        "Douglas found that the Everglades have a truly remarkable environment. Alligators, turtles, and panthers roam this watery world. Deer, gray foxes, and even marsh rabbits call the Everglades home. Countless birds and butterflies also live here.",
      ],
      easy: "Many animals live in the Everglades: alligators, turtles, panthers, deer, foxes, rabbits, birds and butterflies.",
    },
    {
      ch: "Rescuer of the Everglades",
      emoji: "📖🏞️",
      text: [
        "She wrote a book about the Everglades that helped to make them a national park. But the Everglades were not exactly safe. Some people wanted to build an airport next to them.",
      ],
      easy: "Douglas's book helped to make the Everglades a national park. But some people wanted to build an airport next to it.",
    },
    {
      ch: "Rescuer of the Everglades",
      img: "img/douglas/douglas.jpg",
      text: [
        "Her determination to preserve and protect the Everglades became even more evident when in 1969, she started the organization Friends of the Everglades to work to look after this special place.",
        { box: "Quality", p: "Determination" },
      ],
      easy: "In 1969 Douglas started a group, Friends of the Everglades, to protect this special place. She did not give up.",
    },
  ],
  summary: [
    {
      t: "Who",
      img: "img/douglas/douglas.jpg",
      text: "Marjory Stoneman Douglas (1890–1998), a journalist and writer.",
    },
    {
      t: "Where",
      img: "img/douglas/everglades.jpg",
      text: "The Everglades: a marshy area in southern Florida, full of animals.",
    },
    {
      t: "What she did",
      emoji: "📖🏞️",
      text: "She wrote a book about the Everglades. It helped to make them a national park.",
    },
    {
      t: "The problem",
      emoji: "✈️🚧",
      text: "Some people wanted to build an airport next to the Everglades.",
    },
    {
      t: "What she did next",
      emoji: "🤝🌿",
      text: "In 1969 she started Friends of the Everglades, a group that looks after this special place.",
    },
    {
      t: "Message",
      emoji: "💪🌍",
      text: "One person with determination can change the world and protect the environment.",
    },
  ],
};
