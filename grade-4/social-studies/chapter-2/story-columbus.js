// Columbus Reaches the Americas (myWorld Interactive 4, Chapter 2 Lesson 1, "Europeans Explore", book p. 50). Engine: shared/story.js.
// Text exactly as printed, cut into short pages; the title is ours (the book's heading is "Europeans Explore"). No Questions tab.
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-1.py
window.STORY = {
  key: "ss4-columbus",
  subject: "Social Studies",
  title: "Columbus Reaches the Americas",
  kind: "Europeans Explore · Book p. 50",
  cover: "img/lesson-1/explorers-map.jpg",
  lesson: { path: "lesson-1.html", label: "Lesson 1" },
  hub: "../index.html",
  question: "What happened when Europeans and Native Americans met?",
  gloss: {
    approached: "came near",
    island: "land with water all around it",
    coast: "the land next to the sea",
    explorer: "a person who travels to find new places",
    direct: "straight, the shortest way",
    route: "the way from one place to another",
    asia: "the biggest continent: China, India …",
    traded: "bought and sold things",
    spices: "plants that give food a strong taste, like pepper",
    goods: "things to buy and sell",
    dangerous: "not safe",
    existed: "was there",
    believed: "thought it was true",
    indies: "islands near Asia",
    claimed: "said officially: this land is ours",
    spain: "a country in Europe",
    portugal: "a country in Europe",
    netherlands: "a country in Europe",
    riches: "gold and other precious things",
    encounters: "meetings",
    forever: "for all time",
  },
  pages: [
    {
      ch: "Europeans Explore",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🏝️", x: 82, y: 70, s: 26 },
          { e: "⛵", x: 15, y: 72, s: 16, a: "move", dx: 45 },
          { e: "⛵", x: 8, y: 80, s: 14, a: "move", dx: 45 },
          { e: "⛵", x: 22, y: 84, s: 12, a: "move", dx: 45 },
        ],
        cap: "October 1492",
      },
      text: [
        "On a warm Friday morning in October 1492, three Spanish ships approached a small island off the coast of North America. Their leader was an explorer named Christopher Columbus.",
      ],
      easy: "In October 1492, three ships from Spain came to a small island. Their leader was Christopher Columbus.",
    },
    {
      ch: "Europeans Explore",
      emoji: "🌶️🗺️",
      text: [
        "Like others in Europe, Columbus wanted to find a direct route to Asia. Europeans traded in Asia for spices and other goods but only knew long, dangerous routes to get there.",
      ],
      easy: "Columbus wanted a short way to Asia, to buy spices. The old ways to Asia were long and not safe.",
    },
    {
      ch: "Europeans Explore",
      img: "img/lesson-1/explorers-map.jpg",
      text: [
        "Columbus had no idea that North America even existed. Seeing land, he believed that he had reached the Indies. The Indies were islands near Asia. When he saw the people who lived on the island, he called them “Indians.”",
      ],
      easy: "Columbus did not know about America. He thought he was near Asia, so he called the people “Indians”.",
    },
    {
      ch: "Europeans Explore",
      emoji: "🚩🏝️",
      text: [
        "On that morning, Columbus claimed the land he found for Spain. He also claimed the people. For about 200 years, explorers would come to North and South America from Spain, France, Portugal, the Netherlands, and England.",
      ],
      easy: "Columbus said: this land is Spain's now. For 200 years, more explorers came from Europe.",
    },
    {
      ch: "Europeans Explore",
      img: "img/lesson-1/kihn.jpg",
      text: [
        "Most explorers who came to North America were like Columbus. They were looking for a shorter route to the riches of Asia. Like Columbus, they would also claim the land of North America. The encounters, or meetings, between the two groups would change the lives of Europeans and American Indians forever.",
      ],
      easy: "Other explorers also took the land. When Europeans and American Indians met, their lives changed forever.",
    },
  ],
  summary: [
    {
      t: "Who",
      emoji: "🧭",
      text: "Christopher Columbus, an explorer with three Spanish ships.",
    },
    {
      t: "When and where",
      emoji: "⛵🏝️",
      text: "October 1492: a small island off the coast of North America.",
    },
    {
      t: "Why",
      emoji: "🌶️",
      text: "Columbus wanted a short, direct route to Asia and its spices.",
    },
    {
      t: "A mistake",
      emoji: "🗺️❓",
      text: "He thought he was in the Indies, near Asia, so he called the people “Indians”.",
    },
    {
      t: "What happened",
      img: "img/lesson-1/explorers-map.jpg",
      text: "Columbus claimed the land for Spain. For 200 years, more explorers came and claimed land.",
    },
    {
      t: "Why it matters",
      img: "img/lesson-1/kihn.jpg",
      text: "The meetings of Europeans and American Indians changed their lives forever.",
    },
  ],
};
