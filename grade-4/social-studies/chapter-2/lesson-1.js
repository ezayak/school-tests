// Social Studies · Grade 4 · Chapter 2 · Lesson 1 « America and Europe » (myWorld Interactive 4, book pp. 48–53).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Not in the Term 2 booklet (it starts at Lesson 2): built from the book only, so Lesson 2 has its start. "Term 2*" on its card (lessons.js).
// Learn: the book's text in easy words (picture cards), the book's vocabulary, the story « Columbus Reaches the Americas » (p. 50, story-columbus.html).
// Exercises: the book's Reading Checks 1–4 and Lesson 1 Check 5–7. No answer key: model answers from the book (grade-4/social-studies/UNVERIFIED.md).
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-1.py (book crops, e-timeline.jpg).

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-1/ or 1–2 emoji.
const mc = (q, answers, more) => {
  const isImg = (p) => /^[a-z.][a-z0-9./-]*$/.test(p);
  const opts = answers.map((a) => a[0]);
  const pics = answers.map((a) => (isImg(a[1]) ? a[1] : null));
  const icons = answers.map((a) => (isImg(a[1]) ? null : a[1]));
  return {
    type: "mc",
    q,
    opts,
    ...(pics.some(Boolean) ? { pics } : {}),
    ...(icons.some(Boolean) ? { icons } : {}),
    ...more,
  };
};
// the lesson's words, each with its picture: "which word?" answers
const WORD = {
  Archeologist: "⛏️🔎",
  Artifact: "🏺",
  "Hunter-gatherer": "🏹🫐",
  Agriculture: "🌽🧑‍🌾",
  Culture: "kihn",
  Colony: "jamestown",
  Fort: "🏰",
  Tradition: "👴👦",
};
const words = (...ws) => ws.map((w) => [w, WORD[w]]);
// the Columbian Exchange: which way did it go?
const TO_EU = ["From the Americas to Europe", "from-americas"],
  TO_AM = ["From Europe to the Americas", "from-europe"];
const way = (q, e, toEurope) =>
  mc(q, toEurope ? [TO_EU, TO_AM] : [TO_AM, TO_EU], {
    emoji: e,
    two: true,
    x: toEurope
      ? `[${q}]: from the Americas. Explorers took it to [Europe].`
      : `Before 1492 there was no ${q.toLowerCase()} in the Americas: it came from [Europe].`,
  });

window.LESSON = {
  n: 1,
  key: "ss4-c2-l1",
  grade: 4,
  title: "America and Europe",
  unit: "Chapter 2 · Lesson 1",
  book: "Book pp. 48–53",
  cover: "kihn",
  question: {
    q: "What happened when [Europeans] and [Native Americans] met?",
    a: "Their [cultures] changed forever: Europeans built [colonies], plants and animals crossed the ocean (the [Columbian Exchange]), and many American Indians died of [germs].",
    img: "explorers-map",
  },
  // the book's Vocabulary and Academic Vocabulary (p. 48)
  words: [
    { w: "Archeologist", m: "a person who studies things from long ago" },
    { w: "Artifact", m: "an object made by people long ago" },
    {
      w: "Hunter-gatherer",
      m: "a person who hunts animals and gathers plants for food",
    },
    { w: "Agriculture", m: "planting and growing crops for food" },
    { w: "Culture", m: "the way of life of a group of people" },
    { w: "Colony", m: "a place that is ruled by another country" },
    { w: "Enslaved", m: "not free; forced to work for someone" },
    {
      w: "Tradition",
      m: "a belief or custom that parents pass on to their children",
    },
    { w: "Claim", m: "to say officially: this land is ours" },
    { w: "Create", m: "to make something happen" },
  ],

  ideas: [
    // p. 48
    {
      t: "Historians",
      lines: [
        "People have lived in the Americas for [thousands of years].",
        "[Historians] study the past.",
        "They learn how people have [changed], and how they stayed the same.",
      ],
      img: "kihn",
    },
    // p. 49: The First Americans
    {
      t: "Archeologists and artifacts",
      lines: [
        "An [archeologist] studies old places and [artifacts].",
        "An [artifact] is an object made by people long ago: a pot, a tool.",
        "Artifacts tell us about the past.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "⛏️🔎", label: "Archeologist" },
          { e: "🏺", label: "Artifact" },
        ],
      },
    },
    {
      t: "The first Americans",
      lines: [
        "The first Americans came from [Asia], thousands of years ago.",
        "Then [land] connected Asia and the Americas. They walked across it.",
        "Others may have come by [water].",
      ],
      img: "routes-map",
    },
    {
      t: "Hunter-gatherers",
      lines: [
        "They were [hunter-gatherers]: they [hunted] animals and [gathered] plants for food.",
        "Slowly they spread across North and South America.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🏹🦬", label: "Hunt" },
          { e: "🫐🌿", label: "Gather" },
        ],
      },
    },
    {
      t: "Agriculture",
      lines: [
        "[Agriculture] is planting and growing [crops] for food.",
        "When people learned to farm, they could [stay in one place].",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🌽🧑‍🌾", label: "Farm" },
          { e: "🏘️", label: "Stay in a village" },
        ],
      },
    },
    {
      t: "Culture",
      lines: [
        "[Culture] is the way of life of a group of people.",
        "Some American Indians [farmed] and lived in villages.",
        "Others [moved] from place to place and followed the animals.",
      ],
      img: "kihn",
    },
    // p. 50: Europeans Explore
    {
      t: "Columbus, 1492",
      lines: [
        "In October [1492], three Spanish ships came to a small island near North America.",
        "Their leader was [Christopher Columbus]. He wanted a short way to [Asia].",
        "He thought he was in the [Indies], near Asia, so he called the people “Indians”.",
      ],
      emoji: "⛵⛵⛵",
    },
    {
      t: "Claiming the land",
      lines: [
        "Columbus [claimed] the land for [Spain]: he said it now belonged to Spain.",
        "For 200 years, explorers came from Spain, France, Portugal, the Netherlands and England.",
        "These meetings changed the lives of Europeans and American Indians [forever].",
      ],
      img: "explorers-map",
    },
    // p. 51: European Colonies
    {
      t: "Colonies",
      lines: [
        "In the 1500s, Europeans began to settle in the Americas.",
        "A [colony] is a place ruled by [another country].",
        "[Colonists] are the people who settle a colony.",
      ],
      img: "jamestown",
    },
    {
      t: "Forts",
      lines: [
        "A [fort] is a place for soldiers, with walls around it.",
        "In [1565], Spaniards settled [St. Augustine], in Florida.",
      ],
      emoji: "🏰",
    },
    {
      t: "Jamestown and Plymouth",
      lines: [
        "[1607]: [Jamestown], in Virginia, the first English colony that lasted.",
        "[1620]: the [Pilgrims] came to [Plymouth]. They wanted [religious freedom].",
      ],
      img: "jamestown-plymouth",
    },
    {
      t: "13 English colonies",
      lines: [
        "The French settled Canada: [New France]. Spain claimed the [Southwest].",
        "By the early 1700s, [13 English colonies] were along the [Atlantic] coast.",
      ],
      img: "explorers-map",
    },
    {
      t: "Enslaved Africans",
      lines: [
        "From [1619], people from [Africa] were brought to America [against their will].",
        "A person who is [enslaved] is not free. They were forced to work on the farms.",
      ],
      emoji: "⛓️",
    },
    {
      t: "A diverse people",
      lines: [
        "In 1492, the Americas belonged to the [indigenous] people who lived there.",
        "By 1790, almost [4 million] colonists and enslaved Africans lived there too.",
        "Americans came from [Europe], [Africa], and were [Native Americans].",
      ],
      emoji: "🧑🏻🧑🏿🧑🏽",
    },
    // p. 52: The Columbian Exchange
    {
      t: "The Columbian Exchange",
      lines: [
        "Before 1492 there were [no cows], [no wheat] and [no apples] in the Americas!",
        "Explorers carried plants and animals across the ocean, both ways.",
        "This exchange is called the [Columbian Exchange].",
      ],
      img: "exchange",
    },
    {
      t: "From the Americas to Europe",
      lines: [
        "[Corn], [potatoes], [tobacco], [pineapples] and [gold] went to Europe.",
        "Corn and potatoes helped to feed people in Europe.",
      ],
      img: "from-americas",
    },
    {
      t: "From Europe to the Americas",
      lines: [
        "[Cows], [wheat], [apples], [rice] and [horses] came to the Americas.",
        "Wheat and rice fed people. Horses helped with work and travel.",
      ],
      img: "from-europe",
    },
    {
      t: "Deadly germs",
      lines: [
        "Not all the exchanges were good.",
        "Europeans brought [germs]. American Indians had no protection against them.",
        "Many thousands of American Indians died of [smallpox].",
      ],
      emoji: "🦠",
    },
    // p. 53: Government in the English Colonies
    {
      t: "Tradition",
      lines: [
        "A [tradition] is a belief or custom that parents pass on to their children.",
        "In England, people had a part in their government.",
        "The colonists wanted to [make their own laws] too.",
      ],
      emoji: "👴👦",
    },
    {
      t: "The House of Burgesses",
      lines: [
        "In [1619], the colonists of Virginia [created] the [House of Burgesses].",
        "People [elected] representatives to make laws for the colony.",
        "It started [self-government]: people govern themselves.",
      ],
      emoji: "🏛️🗳️",
    },
  ],

  stories: [
    {
      t: "Columbus Reaches the Americas",
      en: "Story · Europeans Explore",
      path: "story-columbus.html",
      cover: { src: "img/lesson-1/explorers-map.jpg" },
    },
  ],

  games: [
    {
      k: "words",
      t: "Which word?",
      en: "The lesson's words",
      ic: "🔤",
      items: [
        mc(
          "This person studies things from long ago.",
          words("Archeologist", "Artifact", "Colony"),
          { emoji: "🔎🏺" },
        ),
        mc(
          "An object made by people long ago.",
          words("Artifact", "Fort", "Culture"),
          { emoji: "🏺" },
        ),
        mc(
          "People who hunt animals and gather plants.",
          words("Hunter-gatherer", "Archeologist", "Colony"),
          { emoji: "🏹🫐" },
        ),
        mc(
          "Planting and growing crops for food.",
          words("Agriculture", "Tradition", "Fort"),
          { emoji: "🌽" },
        ),
        mc(
          "The way of life of a group of people.",
          words("Culture", "Artifact", "Agriculture"),
          { img: "kihn" },
        ),
        mc(
          "A place ruled by another country.",
          words("Colony", "Culture", "Tradition"),
          { img: "jamestown" },
        ),
        mc(
          "A place for soldiers, with walls around it.",
          words("Fort", "Colony", "Artifact"),
          { emoji: "🧱💂" },
        ),
        mc(
          "A custom that parents pass on to their children.",
          words("Tradition", "Agriculture", "Fort"),
          { emoji: "👴👦" },
        ),
      ],
    },
    {
      k: "exchange",
      t: "The Columbian Exchange",
      en: "Which way did it go?",
      ic: "🌍",
      items: [
        way("Corn", "🌽", true),
        way("Potatoes", "🥔", true),
        way("Tobacco", "🍂", true),
        way("Pineapples", "🍍", true),
        way("Gold", "🪙", true),
        way("Cows", "🐄", false),
        way("Wheat", "🌾", false),
        way("Apples", "🍎", false),
        way("Horses", "🐎", false),
        way("Rice", "🍚", false),
      ],
    },
    {
      k: "time",
      t: "What came first?",
      en: "Put the events in order",
      ic: "📅",
      items: [
        {
          type: "order",
          t: "From [1492] to [1620]",
          ask: "Put the events in order: the oldest first.",
          hint: "Columbus came first, in 1492.",
          steps: [
            { say: "1492: Columbus reaches the Americas.", e: "⛵" },
            { say: "1565: Spaniards settle St. Augustine.", e: "🏰" },
            { say: "1607: the English found Jamestown.", img: "jamestown" },
            { say: "1619: the House of Burgesses meets.", e: "🏛️" },
            { say: "1620: the Pilgrims settle Plymouth.", e: "🙏" },
          ],
        },
      ],
    },
    {
      k: "match",
      t: "Lesson pictures",
      en: "Match the word and the picture",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "routes-map", label: "The first Americans came from Asia" },
            { img: "explorers-map", label: "Explorers in the Americas" },
            { img: "jamestown", label: "A colony: Jamestown" },
            { img: "from-europe", label: "Animals brought from Europe" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Reading Checks and Lesson 1 Check",
      ic: "📘",
      from: "Book pp. 49–53 · Reading Checks 1–4, Lesson 1 Check 5–7",
      keep: true,
      items: [
        mc(
          "Look at the map. Which place let people cross from [Asia] to [North America]?",
          [
            ["The Beringia Land Bridge", "🌉"],
            ["The Atlantic Ocean", "🌊"],
            ["South America", "🌎"],
          ],
          {
            img: "routes-map",
            x: "On the map, the [Beringia Land Bridge] was dry land between Asia and North America. The red arrows cross it.",
          },
        ),
        mc(
          "Look at the map. Which explorer came to the Americas [first]?",
          [
            ["Christopher Columbus, 1492", "⛵"],
            ["Samuel de Champlain, 1603", "🧭"],
            ["Robert de La Salle, 1679", "🗺️"],
          ],
          {
            img: "explorers-map",
            x: "The legend gives the years: [Columbus] came in [1492], before all the others.",
          },
        ),
        mc(
          "Which explorer came [110 years later]?",
          [
            ["Samuel de Champlain, 1603", "🧭"],
            ["John Cabot, 1497", "⛵"],
            ["Hernando de Soto, 1539", "🗺️"],
          ],
          {
            img: "explorers-map",
            x: "Columbus's travels ended in 1493. 1493 + 110 = [1603]: [Champlain].",
          },
        ),
        {
          type: "sort",
          q: "Sort the food: which way did it go?",
          img: "from-americas",
          cols: [
            { k: "eu", t: "From Europe to the Americas", e: "🐄" },
            { k: "am", t: "From the Americas to Europe", e: "🌽" },
          ],
          words: [
            { w: "milk", k: "eu", e: "🥛" },
            { w: "bread (wheat)", k: "eu", e: "🍞" },
            { w: "applesauce", k: "eu", e: "🍎" },
            { w: "rice", k: "eu", e: "🍚" },
            { w: "corn", k: "am", e: "🌽" },
            { w: "potatoes", k: "am", e: "🥔" },
            { w: "tomatoes", k: "am", e: "🍅" },
            { w: "pineapple", k: "am", e: "🍍" },
          ],
        },
        // unverified: open questions, model answers written from the book
        {
          type: "open",
          q: "Explain how the idea of [self-government] might have led the English colonists to want freedom from the King of England.",
          a: "The colonists were used to [making their own laws] in the House of Burgesses. So they wanted to govern themselves, not to be ruled by a king far away.",
          emoji: "🏛️👑",
        },
        {
          type: "order",
          t: "What happened first?",
          ask: "Put the events in order: 1, 2, 3.",
          hint: "Look at the years on the timeline.",
          img: "e-timeline",
          steps: [
            { say: "Christopher Columbus reaches the Americas.", e: "⛵" },
            {
              say: "English people set up first colonies on the Atlantic coast.",
              img: "jamestown",
            },
            { say: "House of Burgesses meets in Virginia.", e: "🏛️" },
          ],
        },
        {
          type: "open",
          q: "Describe one building or place that tells something about the history of your [community]. How has it changed over time?",
          a: "Example: an old school or a market in my town. Long ago it was small. Today it is bigger and has new buildings around it.",
          emoji: "🏛️🏙️",
        },
        {
          type: "open",
          q: "Summarize the ways that Europeans changed the [culture] of American Indians forever.",
          a: "Europeans [claimed] their land and built [colonies]. They brought new plants and animals, like [horses] and [cows]. They also brought [germs]: many American Indians died of smallpox.",
          img: "explorers-map",
        },
      ],
    },
  ],
};
