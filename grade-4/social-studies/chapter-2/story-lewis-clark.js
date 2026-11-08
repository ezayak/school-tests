// Lewis and Clark Explore the West (myWorld Interactive 4, Chapter 2 Lesson 2, book p. 61). Engine: shared/story.js.
// Text exactly as printed, cut into short pages. No Questions tab.
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-2.py
window.STORY = {
  key: "ss4-lewis-clark",
  subject: "Social Studies",
  title: "Lewis and Clark Explore the West",
  kind: "A New Nation · Book p. 61",
  cover: "img/lesson-2/map-1804.jpg",
  lesson: { path: "lesson-2.html", label: "Lesson 2" },
  hub: "../index.html",
  question: "Why did Thomas Jefferson send an expedition to the West?",
  gloss: {
    rivers: "big streams of water that flow to the sea",
    louisiana: "the Louisiana Territory: the land bought from France in 1803",
    purchase: "buying something",
    control: "the power to use and rule something",
    mississippi: "the biggest river in the middle of the USA",
    route: "the way from one place to another",
    pacific: "the ocean on the west of the USA",
    missouri: "a long river that flows into the Mississippi",
    contact: "to meet and talk with",
    region: "an area",
    expedition: "a journey made for a special purpose",
    journey: "a long trip",
    purpose: "a reason, a goal",
    valuable: "very useful",
    guide: "a person who shows the way",
    explored: "travelled to learn about a place",
    round: "a round trip: there and back again",
    miles: "a mile is about 1.6 kilometres",
    information: "facts and news",
  },
  pages: [
    {
      ch: "Lewis and Clark Explore the West",
      img: "img/lesson-2/map-1804.jpg",
      text: [
        "Thomas Jefferson knew that the rivers of the United States were important. The Louisiana Purchase gave Americans control of the Mississippi River. Now Jefferson wanted to find a river route to the Pacific Ocean. He hoped the Missouri River could be part of that route.",
      ],
      easy: "Jefferson wanted a way by river from the Mississippi River to the Pacific Ocean.",
    },
    {
      ch: "Lewis and Clark Explore the West",
      emoji: "🤝🪶",
      text: [
        "He also wanted to make contact with the Native Americans in the region. So he sent an expedition west. An expedition is a journey made for a special purpose.",
      ],
      easy: "He also wanted to meet the Native Americans. So he sent an expedition to the West.",
    },
    {
      ch: "Lewis and Clark Explore the West",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🛶", x: 15, y: 70, s: 22, a: "move", dx: 60 },
          { e: "🧭", x: 80, y: 25, s: 16, a: "pulse" },
          { e: "⛰️", x: 85, y: 55, s: 24 },
        ],
        cap: "about 50 men and Sacagawea",
      },
      text: [
        "Meriwether Lewis and William Clark led the expedition. They took about 50 men with them. Sacagawea, an American Indian, helped Lewis and Clark. She was a valuable guide.",
      ],
      easy: "Lewis and Clark led about 50 men. Sacagawea, an American Indian, showed them the way.",
    },
    {
      ch: "Lewis and Clark Explore the West",
      img: "img/lesson-2/map-1804.jpg",
      text: [
        "They explored the rivers. The round trip was almost 8,000 miles long. It took more than two years. There was no river route to the Pacific, but they brought back important information about the land and people of the west.",
      ],
      easy: "The trip was 8,000 miles and took more than 2 years. They learned a lot about the West.",
    },
  ],
  summary: [
    {
      t: "Who",
      emoji: "🛶🧭",
      text: "Meriwether Lewis and William Clark, with about 50 men and their guide Sacagawea.",
    },
    {
      t: "Why",
      img: "img/lesson-2/map-1804.jpg",
      text: "Jefferson wanted a river route to the Pacific Ocean, and to meet the Native Americans of the West.",
    },
    {
      t: "The journey",
      emoji: "🏞️⛰️",
      text: "They explored the rivers: almost 8,000 miles, more than 2 years.",
    },
    {
      t: "What they found",
      emoji: "📓🗺️",
      text: "There was no river route to the Pacific, but they brought back important information about the land and people of the West.",
    },
  ],
};
