// A Helping Hand (Wonders Genre Passages, Grade 4 Unit 1 Week 5, argumentative text). Classwork Booklet Term 1, pages 34–36.
// Engine: shared/story.js. The headings of the text are shown above each page (text features: headings, a graph).
// The booklet has no model answers: the answers here are written from the text.
window.STORY = {
  key: "en4-helping-hand",
  title: "A Helping Hand",
  kind: "Argumentative text · Classwork booklet",
  cover: "img/helping-hand/graph.jpg",
  lesson: { path: "unit1-week5.html", label: "Unit 1 · Week 5" },
  question: "How can starting a business help others?",
  gloss: {
    community: "the people who live in the same place",
    variety: "a variety of ways = many different ways",
    active: "busy doing things",
    local: "near where you live",
    involved: "taking part",
    observe: "to look at carefully",
    senior: "a senior citizen center = a place for old people",
    activities: "things to do",
    nutritious: "healthy, good for your body",
    donations: "things or money you give to help",
    donate: "to give to help others",
    grateful: "thankful",
    teamwork: "working together",
    creativity: "being able to make new things",
    clinics: "small places where doctors help sick people",
    appreciate: "to be thankful for something",
    corporation: "a big company",
    foundation: "a group that gives money to help",
    individual: "one person",
    organizing: "planning",
  },
  pages: [
    {
      ch: "A Helping Hand",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🤝", x: 50, y: 40, s: 34, a: "pulse" },
          { e: "👧", x: 20, y: 72, s: 22 },
          { e: "👦", x: 40, y: 74, s: 22, a: "jump" },
          { e: "👵", x: 62, y: 72, s: 22 },
          { e: "👨", x: 82, y: 72, s: 22, a: "jump:0.4" },
        ],
        cap: "Make a Difference Day",
      },
      text: [
        "Do you like to help others? Helping out is an important part of being in a community. Many other people feel the same way. Helping can make a difference in a variety of ways, and it is something you can do every day. Make a Difference Day is one day a year that reminds us how great it is to help others.",
        "We should all be active and make a difference to better our community. There is always a way to make a difference. One way is giving food to someone who needs a meal. Another way is cleaning a local park. Make a Difference Day is a good time to get others involved. It is a great time to get your friends to help you make a difference, too.",
      ],
      easy: "The author thinks we should all help our community. We can give food or clean a park.",
    },
    {
      ch: "Clean a Park",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌳", x: 18, y: 50, s: 32 },
          { e: "🧒", x: 46, y: 70, s: 24 },
          { e: "🗑️", x: 62, y: 74, s: 16 },
          { e: "🍌", x: 34, y: 84, s: 8, dx: 26, dy: -6, a: "go" },
          { e: "🦋", x: 76, y: 36, s: 12, a: "wander" },
          { e: "🐿️", x: 84, y: 70, s: 14, a: "jump" },
        ],
        cap: "Clean a park",
      },
      text: [
        "Making a difference is about helping, and it is a good way to learn. If you and your friends help with a clean-up in a park, you will be able to observe the plant life there. You might see animals you have read about or seen in books. So while cleaning, you may learn more about plants and animals. You will make the park a cleaner place for them and for you.",
      ],
      easy: "When you clean a park, you also learn about plants and animals. The park becomes cleaner.",
    },
    {
      ch: "Meet New People",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👵", x: 26, y: 60, s: 28 },
          { e: "👴", x: 46, y: 60, s: 28 },
          { e: "👧", x: 72, y: 64, s: 24, a: "nod" },
          { e: "🎲", x: 58, y: 80, s: 12, a: "spin" },
          { e: "❤️", x: 50, y: 22, s: 14, a: "pulse" },
        ],
        cap: "a senior citizen center",
      },
      text: [
        "Cleaning your local park is helpful, but it is also good to meet the people who live in your community. For example, you and your classmates can visit a senior citizen center. You can plan activities with the people in the center. Showing you care makes a difference.",
      ],
      easy: "You can also visit old people at a senior center and do activities with them.",
    },
    {
      ch: "Feed Someone in Need",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🥫", x: 20, y: 60, s: 16, dx: 40, a: "go" },
          { e: "🍞", x: 30, y: 70, s: 16, dx: 34, a: "go:0.3" },
          { e: "🍎", x: 16, y: 78, s: 14, dx: 44, a: "go:0.6" },
          { e: "📦", x: 72, y: 66, s: 30 },
          { t: "Food Bank", x: 72, y: 36, s: 7 },
        ],
        cap: "Collect food for a food bank",
      },
      text: [
        "Do you know how important a good meal is? Some people aren’t able to have a nutritious meal every day. Make a difference by collecting food for them. You and your friends can work as a team to collect food. Choose a food bank you would like to help. Work together to collect food donations from your friends and community to give to the food bank. The food bank will be grateful for your help. And you can donate all year round. It not only helps people in need, but it also helps you and your friends know what teamwork is.",
      ],
      easy: "Work as a team to collect food for a food bank. It helps people who need food.",
    },
    {
      ch: "Be Creative",
      img: "img/helping-hand/graph.jpg",
      text: [
        "Cleaning parks, meeting new people, and donating food are good. There is also something you can do with your creativity. You and your friends can make an activity book. There are children who may not have activity books. After you make a book, ask your teacher to make copies. Then your team can take them to clinics or hospitals. Many children will appreciate the books. It is a book that you and your team created together. More importantly it is a book that will make the day better for a child.",
        {
          box: "The graph",
          p: "This graph shows where donations came from in the United States in 2015. You can see that individuals like you give the most.",
        },
        "Organizing a Make a Difference Day is a great way to start helping your community. Making a difference can show you parts of your community you did not know about. You can meet new people and learn new things. Most of all, you can make a difference.",
      ],
      easy: "Make activity books for children in hospitals. The graph shows that single people, like you, give the most.",
    },
  ],
  summary: [
    {
      t: "The author thinks",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [{ e: "🤝", x: 50, y: 44, s: 40, a: "pulse" }],
      },
      text: "We should all help and make a difference in our community.",
    },
    {
      t: "Reason 1: Clean a Park",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌳", x: 30, y: 50, s: 34 },
          { e: "🗑️", x: 66, y: 64, s: 24 },
        ],
      },
      text: "You help the park and learn about plants and animals.",
    },
    {
      t: "Reason 2: Meet New People",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👵", x: 34, y: 58, s: 30 },
          { e: "👧", x: 66, y: 62, s: 28 },
        ],
      },
      text: "Visit a senior citizen center and plan activities.",
    },
    {
      t: "Reason 3: Feed Someone in Need",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🥫", x: 30, y: 56, s: 24 },
          { e: "📦", x: 66, y: 60, s: 30 },
        ],
      },
      text: "Collect food donations for a food bank. You learn teamwork.",
    },
    {
      t: "Reason 4: Be Creative",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "📒", x: 34, y: 54, s: 30 },
          { e: "🏥", x: 68, y: 54, s: 30 },
        ],
      },
      text: "Make activity books for children in clinics and hospitals.",
    },
    {
      t: "The graph",
      img: "img/helping-hand/graph.jpg",
      text: "Individuals, people like you, give the most donations.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/helping-hand/graph.jpg",
      q: "What is the genre of “A Helping Hand”?",
      o: ["argumentative text", "realistic fiction", "fantasy"],
      x: "The author gives facts and reasons to make us agree: we should help our community.",
    },
    {
      tag: "Central idea",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [{ e: "🤝", x: 50, y: 44, s: 40, a: "pulse" }],
      },
      q: "What is the central idea of the text?",
      o: [
        "We should all help and make a difference in our community.",
        "Parks are full of animals.",
        "Activity books are fun.",
      ],
    },
    {
      tag: "Text features: headings",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🥫", x: 30, y: 56, s: 24 },
          { e: "📦", x: 66, y: 60, s: 30 },
        ],
      },
      q: "Which heading tells about collecting food?",
      o: ["Feed Someone in Need", "Clean a Park", "Be Creative"],
    },
    {
      tag: "Text features: headings",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👵", x: 34, y: 58, s: 30 },
          { e: "👧", x: 66, y: 62, s: 28 },
        ],
      },
      q: "Under which heading do you read about the senior citizen center?",
      o: ["Meet New People", "Feed Someone in Need", "Clean a Park"],
    },
    {
      tag: "Text features: graph",
      img: "img/helping-hand/graph.jpg",
      q: "Look at the graph. Who gave the most donations?",
      o: ["individuals", "corporations", "foundations"],
      x: "The tallest bar is “Individual”: about 80 out of 100.",
    },
    {
      tag: "Text features: graph",
      img: "img/helping-hand/graph.jpg",
      q: "Look at the graph. Who gave the fewest donations?",
      o: ["corporations", "individuals", "foundations"],
      x: "The shortest bar is “Corporation”.",
    },
    {
      tag: "Reread",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌳", x: 26, y: 50, s: 32 },
          { e: "🦋", x: 60, y: 36, s: 16, a: "wander" },
          { e: "🐿️", x: 74, y: 70, s: 18 },
        ],
      },
      q: "Reread “Clean a Park”. What can you learn while you clean a park?",
      o: ["about plants and animals", "how to cook", "how to make books"],
    },
    {
      tag: "Relevant details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "📒", x: 34, y: 54, s: 30 },
          { e: "🏥", x: 68, y: 54, s: 30 },
        ],
      },
      q: "Where can your team take the activity books?",
      o: ["to clinics or hospitals", "to the park", "to the food bank"],
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌳", x: 20, y: 56, s: 22 },
          { e: "👵", x: 40, y: 56, s: 22 },
          { e: "🥫", x: 60, y: 56, s: 20 },
          { e: "📒", x: 80, y: 56, s: 20 },
        ],
      },
      q: "What are some details the author uses to show how people can help in their communities?",
      a: "People can clean a local park, visit a senior citizen center, collect food for a food bank, and make activity books for children in clinics or hospitals.",
    },
    {
      tag: "Text features: graph",
      type: "open",
      img: "img/helping-hand/graph.jpg",
      q: "What do the graph and caption show?",
      a: "They show where donations came from in the United States in 2015. Individuals gave the most, then foundations, and corporations gave the least.",
    },
    {
      tag: "Text features: graph",
      type: "open",
      img: "img/helping-hand/graph.jpg",
      q: "How does the graph support the idea that many people think it is important to help others?",
      a: "The graph shows that individuals, people like you, give the most donations. So many people think helping others is important.",
    },
  ],
};
