// Social Studies · Grade 3 · Term 2 · Mid-term revision: Chapter 3 « Communities Build a Nation » · Lesson 2 « Early Explorers ».
// Its card is in games.js (Grade 3 · Term 2 · Mid-term exam); Grade 3 Social Studies has no lessons hub yet, so « hub » is the home page.
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Learn: the teacher's slides « chapter 3 lesson 2 2026-2027 » (17 pages) in easy words, one picture card per idea, the slides' words.
// Exercises: Graded Homework (1) of Term 2 (correct the underlined words, with 💡 Help) and revision questions on the slides.
// No answer key: the answers follow the slides (the underlined words of the homework are not visible in the text layer: the wrong word of each sentence was found from the slides).
// Pictures (img/revision-1/): crops of the slides (rendered 1280×720), slide page in the comment above each card.
// Sources: 20261123-chapter 3 lesson 2 2026-2027.pdf (pp. 1–17), 20261123-Term (2) Graded Homework (1) 2026-2027.pdf (p. 1).

// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/revision-1/ or 1–2 emoji.
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
// a picture for the question (file name or emoji)
const pic = (p) => (/^[a-z]/.test(p) ? { img: p } : { emoji: p });
// the three countries
const SPAIN = ["Spain", "spain-flag"],
  FRANCE = ["France", "france-flag"],
  ENGLAND = ["England", "uk-flag"];
const country = (q, p, right, x) =>
  mc(q, [right, ...[SPAIN, FRANCE, ENGLAND].filter((c) => c !== right)], {
    ...pic(p),
    x,
  });

// Graded Homework 1: a 💡 Help for each sentence (a hint and the Learn card to look at)
const card = (name) => `Look at the card «${name}» in Learn.`;

window.LESSON = {
  n: "Revision",
  label: "Mid-term 2",
  key: "ss3-t2-revision-1",
  grade: 3,
  imgDir: "img/revision-1",
  hub: "../../../index.html",
  title: "Early Explorers",
  unit: "Mid-term 2 · Chapter 3 · Lesson 2",
  book: "Teacher's slides",
  cover: "explorers",
  question: {
    q: "Why did [explorers] from Europe sail across the ocean?",
    a: "They looked for a [water route to Asia], for [spices] and for [gold] and other riches.",
    img: "explorers",
  },
  // the slides' words (pp. 3, 6, 8, 10, 12, 13, 15)
  words: [
    {
      w: "Explorer",
      m: "a person who travels looking for new lands and discoveries",
    },
    { w: "Route", m: "the way you take to get somewhere" },
    {
      w: "Spices",
      m: "plants that make food taste better and keep it from spoiling",
    },
    { w: "Native Indians", m: "the first people to live in America" },
    { w: "Wealth", m: "a large amount of money" },
    { w: "Trader", m: "a person who buys and sells goods" },
    { w: "Fur traders", m: "people who buy and sell animal furs" },
    { w: "Claim", m: "to say that something belongs to you" },
  ],
  ideas: [
    // p. 1
    {
      t: "Early Explorers",
      lines: [
        "Chapter 3: [Communities Build a Nation].",
        "Long ago, people from [Europe] wanted to reach [Asia].",
      ],
      img: "world-map",
    },
    // p. 2
    {
      t: "What did they search for?",
      lines: [
        "More than [500 years] ago, explorers from [Spain], [France] and [England] searched for:",
        "a [water route] to Asia, [spices] and herbs, [gold] and other riches.",
      ],
      img: "explorers",
    },
    {
      t: "Spices and herbs",
      lines: ["They needed [spices] and herbs for [cooking] and [medicine]."],
      img: "spices",
    },
    // p. 3
    {
      t: "By water to Asia",
      lines: [
        "Explorers thought going to Asia [by water] might take [less time] than going by land.",
        "They all wanted to be the [first] to find a [route] to Asia.",
      ],
      img: "ships-asia",
    },
    {
      t: "Explorer and route",
      lines: [
        "An [explorer] travels to look for new lands.",
        "A [route] is the way you take to get somewhere.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🧭🧔", label: "Explorer" },
          { e: "⛵➡️🏝️", label: "Route" },
        ],
      },
    },
    // p. 4
    {
      t: "Spain",
      lines: ["First, the explorers of [Spain]."],
      img: "spain-map",
    },
    // p. 5
    {
      t: "Christopher Columbus",
      lines: [
        "Christopher Columbus was an [Italian] explorer.",
        "He sailed from [Spain] to [North America] in [1492].",
      ],
      img: "columbus",
    },
    {
      t: "Others followed",
      lines: [
        "He sailed across the [Atlantic Ocean].",
        "Soon, [other explorers] followed Columbus.",
      ],
      img: "columbus-map",
    },
    // p. 6
    {
      t: "Sail to China",
      lines: [
        "Spain wanted Columbus to sail to [China] to search for [spices].",
        "Why? They thought spices kept food from [spoiling].",
      ],
      img: "routes",
    },
    {
      t: "Why spices?",
      lines: [
        "Spices were [valuable].",
        "They made food [taste better].",
        "They helped keep food from [spoiling].",
      ],
      img: "spice-uses",
    },
    // p. 7
    {
      t: "China in Asia?",
      lines: ["Columbus thought he was sailing to [China] in [Asia]."],
      img: "china",
    },
    {
      t: "Florida",
      lines: [
        "He did not arrive in Asia.",
        "Columbus landed in the area we call [Florida] today.",
      ],
      img: "florida-map",
    },
    // p. 8
    {
      t: "Indians",
      lines: [
        "Some people already [lived] on the island.",
        "Columbus called them [“Indians”]: he thought he was in the [Indies], in Asia.",
      ],
      img: "indians-meet",
    },
    // p. 9
    {
      t: "Amerigo Vespucci",
      lines: [
        "Amerigo Vespucci was an [Italian] explorer. He sailed from [Spain].",
        "He explored North and South [America]: they are [named after him].",
      ],
      img: "amerigo",
    },
    // p. 10
    {
      t: "Gold",
      lines: ["The Spanish searched for [gold] and other [riches]."],
      img: "gold",
    },
    {
      t: "Religion and culture",
      lines: [
        "They also wanted to change the Native Indians' [religion] and [culture].",
      ],
      img: "mission",
    },
    {
      t: "Native Indians",
      lines: ["[Native Indians] were the [first people] to live in America."],
      img: "native-kids",
    },
    // p. 11
    {
      t: "French explorers",
      lines: ["Next, the explorers of [France]."],
      img: "french-map",
    },
    // p. 12
    {
      t: "Wealth",
      lines: [
        "France's main goal was [wealth].",
        "Wealth is a [large amount of money].",
      ],
      img: "wealth",
    },
    // p. 13
    {
      t: "Louis Jolliet",
      lines: [
        "Louis Jolliet was a [French] explorer and [mapmaker].",
        "He explored the [Mississippi River] in [1673].",
      ],
      img: "jolliet",
    },
    {
      t: "Fur traders",
      lines: [
        "The French looked for resources and chances to [trade].",
        "Many French settlers were [fur traders]. A trader [buys and sells] goods.",
      ],
      img: "fur-traders",
    },
    // p. 14
    {
      t: "English explorers",
      lines: [
        "Last, the explorers of [England]:",
        "Henry Hudson, John Cabot, Francis Drake, James Cook.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "hudson", label: "Henry Hudson" },
          { img: "p-cabot", label: "John Cabot" },
          { img: "drake", label: "Francis Drake" },
          { img: "cook", label: "James Cook" },
        ],
      },
    },
    // p. 15
    {
      t: "More powerful",
      lines: [
        "Great Britain wanted to become [more powerful] by [claiming land].",
        "To [claim] something is to say it [belongs to you].",
      ],
      img: "age-exploration",
    },
    {
      t: "New ways to Asia",
      lines: [
        "Some British explorers also hoped to find new ways to sail to [Asia].",
      ],
      img: "uk-flag",
    },
    // p. 16
    {
      t: "John Cabot",
      lines: [
        "John Cabot was an [Italian] explorer.",
        "He was the first person from [England] to discover the land of [North America].",
      ],
      img: "cabot",
    },
    // p. 17
    {
      t: "The explorers' routes",
      lines: [
        "The map shows the routes of the [Spanish], [French], [English] and Portuguese explorers.",
      ],
      img: "explore-map",
    },
  ],
  games: [
    {
      k: "who",
      t: "Who is it?",
      en: "The explorers",
      ic: "🧭",
      items: [
        mc("Who is he?", [
          ["Christopher Columbus", "columbus"],
          ["Amerigo Vespucci", "amerigo"],
          ["John Cabot", "cabot"],
        ]),
        mc("Who explored the [Mississippi River] in 1673?", [
          ["Louis Jolliet", "jolliet"],
          ["Christopher Columbus", "columbus"],
          ["John Cabot", "cabot"],
        ]),
        mc("Who sailed from Spain to North America in [1492]?", [
          ["Christopher Columbus", "columbus"],
          ["Louis Jolliet", "jolliet"],
          ["Amerigo Vespucci", "amerigo"],
        ]),
        mc("North and South [America] are named after him. Who is he?", [
          ["Amerigo Vespucci", "amerigo"],
          ["John Cabot", "cabot"],
          ["Christopher Columbus", "columbus"],
        ]),
        mc(
          "He was the first person from [England] to discover North America. Who is he?",
          [
            ["John Cabot", "cabot"],
            ["Amerigo Vespucci", "amerigo"],
            ["Louis Jolliet", "jolliet"],
          ],
        ),
        mc(
          "Who called the people he met [“Indians”]?",
          [
            ["Christopher Columbus", "columbus"],
            ["Louis Jolliet", "jolliet"],
            ["John Cabot", "cabot"],
          ],
          { img: "indians-meet" },
        ),
      ],
    },
    {
      k: "country",
      t: "Which country?",
      en: "Spain, France or England",
      ic: "🚩",
      items: [
        country(
          "Columbus sailed from this country.",
          "columbus-map",
          SPAIN,
          "Columbus was Italian, but he sailed from [Spain].",
        ),
        country(
          "Amerigo Vespucci sailed from this country.",
          "amerigo",
          SPAIN,
          "Amerigo Vespucci was Italian. He sailed from [Spain].",
        ),
        country(
          "Its main goal was [wealth].",
          "wealth",
          FRANCE,
          "France's main goal was [wealth]: a large amount of money.",
        ),
        country(
          "Many of its settlers were [fur traders].",
          "fur-traders",
          FRANCE,
          "Many early [French] settlers were fur traders.",
        ),
        country(
          "It wanted to become more powerful by [claiming land].",
          "age-exploration",
          ENGLAND,
          "[Great Britain] wanted to become more powerful by claiming land.",
        ),
        country(
          "The Spanish searched for [gold] and other riches.",
          "gold",
          SPAIN,
          "The [Spanish] (from Spain) searched for gold and other riches.",
        ),
        country(
          "Louis Jolliet was an explorer from this country.",
          "jolliet",
          FRANCE,
          "Louis Jolliet was a [French] explorer.",
        ),
        country(
          "Henry Hudson, Francis Drake and James Cook were explorers from this country.",
          "🧭⛵",
          ENGLAND,
          "They were [English] explorers.",
        ),
      ],
    },
    {
      k: "words",
      t: "Words",
      en: "Word ↔ picture",
      ic: "🔤",
      items: [
        {
          type: "match",
          pairs: [
            { img: "ships-asia", label: "Explorer" },
            { img: "spices", label: "Spices" },
            { img: "wealth", label: "Wealth" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "fur-traders", label: "Trader" },
            { img: "native-kids", label: "Native Indians" },
            { img: "gold", label: "Gold and riches" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "spain-flag", label: "Spain" },
            { img: "france-flag", label: "France" },
            { img: "uk-flag", label: "England" },
          ],
        },
      ],
    },
    {
      k: "order",
      t: "Columbus's trip",
      en: "Put in order",
      ic: "⛵",
      items: [
        {
          type: "order",
          t: "Columbus's trip",
          ask: "Put the events in order: 1, 2, 3, 4.",
          hint: "He leaves Spain first.",
          img: "columbus-map",
          steps: [
            { say: "Columbus sails from Spain in 1492.", img: "columbus" },
            { say: "He thinks he is sailing to China in Asia.", img: "china" },
            { say: "He lands in the area we call Florida.", img: "landing" },
            {
              say: "He calls the people there “Indians”.",
              img: "indians-meet",
            },
          ],
        },
      ],
    },
  ],
  exercises: [
    // Graded Homework (1), Term 2 (2026-11-23): correct the underlined words (the wrong word is shown in [brackets]).
    {
      k: "hw1",
      t: "Graded Homework 1",
      en: "Correct the underlined words · with 💡 Help",
      ic: "🏠",
      from: "Graded Homework (1) · Term 2",
      keep: true,
      items: [
        mc(
          "Correct the word: Christopher Columbus was an [American] explorer.",
          [
            ["Italian", "columbus"],
            ["French", "france-flag"],
            ["English", "uk-flag"],
          ],
          {
            img: "columbus",
            x: "Christopher Columbus was an [Italian] explorer. He sailed from Spain.",
            help: {
              t: "Christopher Columbus",
              lines: [card("Christopher Columbus"), "He came from [Italy]."],
              vis: { kind: "strip", items: [{ e: "🇮🇹", label: "Italy" }] },
            },
          },
        ),
        mc(
          "Correct the word: Spain wanted Christopher Columbus to sail to [London] to search for spices.",
          [
            ["China", "china"],
            ["Florida", "florida-map"],
            ["France", "france-flag"],
          ],
          {
            img: "routes",
            x: "Spain wanted Columbus to sail to [China], in Asia, to search for spices.",
            help: {
              t: "Sail to China",
              lines: [card("Sail to China"), "Spices came from [Asia]."],
              vis: { kind: "strip", items: [{ e: "🏯🌶️", label: "Asia" }] },
            },
          },
        ),
        mc(
          "Correct the word: France's main goal was [gold].",
          [
            ["wealth", "wealth"],
            ["spices", "spices"],
            ["land", "age-exploration"],
          ],
          {
            img: "france-flag",
            x: "France's main goal was [wealth]: a large amount of money. The Spanish searched for gold.",
            help: {
              t: "Wealth",
              lines: [card("Wealth"), "A large amount of [money]."],
              vis: { kind: "strip", items: [{ e: "💰💶", label: "Money" }] },
            },
          },
        ),
        mc(
          "Correct the words: The first people who lived in America were called [Americans].",
          [
            ["Native Indians", "native-kids"],
            ["Explorers", "ships-asia"],
            ["Fur traders", "fur-traders"],
          ],
          {
            img: "indians-meet",
            x: "[Native Indians] were the first people to live in America.",
            help: {
              t: "Native Indians",
              lines: [
                card("Native Indians"),
                "Columbus called them “Indians”.",
              ],
              vis: {
                kind: "strip",
                items: [{ img: "native-kids", label: "The first people" }],
              },
            },
          },
        ),
        mc(
          "Correct the words: French people were [spice traders].",
          [
            ["fur traders", "fur-traders"],
            ["gold traders", "gold"],
            ["explorers of China", "china"],
          ],
          {
            img: "france-flag",
            x: "Many early French settlers were [fur traders]: they bought and sold animal furs.",
            help: {
              t: "Fur traders",
              lines: [
                card("Fur traders"),
                "They bought and sold animal [furs].",
              ],
              vis: { kind: "strip", items: [{ e: "🦫🧥", label: "Fur" }] },
            },
          },
        ),
      ],
    },
    // revision on the slides (mid-term): true or false, then choose
    {
      k: "tf",
      t: "True or false?",
      en: "Revision · the slides",
      ic: "✅",
      from: "Teacher's slides pp. 2–16",
      items: [
        {
          type: "tf",
          q: "Explorers from Spain, France and England searched for a water route to Asia.",
          a: true,
          img: "explorers",
          x: "They searched for a [water route to Asia], spices and gold.",
        },
        {
          type: "tf",
          q: "Explorers thought going to Asia by land was faster than by water.",
          a: false,
          img: "ships-asia",
          x: "They thought going [by water] might take less time than by land.",
        },
        {
          type: "tf",
          q: "Columbus sailed from Spain to North America in 1492.",
          a: true,
          img: "columbus-map",
          x: "Columbus sailed from [Spain] in [1492].",
        },
        {
          type: "tf",
          q: "Columbus arrived in China.",
          a: false,
          img: "florida-map",
          x: "He thought he was sailing to China, but he landed in the area we call [Florida].",
        },
        {
          type: "tf",
          q: "Spices helped keep food from spoiling.",
          a: true,
          img: "spice-uses",
          x: "Spices made food taste better and kept it from [spoiling].",
        },
        {
          type: "tf",
          q: "Amerigo Vespucci was a French explorer.",
          a: false,
          img: "amerigo",
          x: "Amerigo Vespucci was an [Italian] explorer. He sailed from Spain.",
        },
        {
          type: "tf",
          q: "Louis Jolliet explored the Mississippi River in 1673.",
          a: true,
          img: "jolliet",
          x: "Louis Jolliet, a French explorer and mapmaker, explored the [Mississippi River] in 1673.",
        },
        {
          type: "tf",
          q: "Great Britain wanted to become more powerful by claiming land.",
          a: true,
          img: "age-exploration",
          x: "To [claim] land is to say it belongs to you.",
        },
        {
          type: "tf",
          q: "John Cabot was an English explorer.",
          a: false,
          img: "cabot",
          x: "John Cabot was an [Italian] explorer. He was the first person from England to discover North America.",
        },
      ],
    },
    {
      k: "choose",
      t: "Choose",
      en: "Revision · the slides",
      ic: "📝",
      from: "Teacher's slides pp. 3–15",
      items: [
        mc(
          "A person who travels looking for new lands and discoveries is an …",
          [
            ["explorer", "ships-asia"],
            ["trader", "fur-traders"],
            ["mapmaker", "explore-map"],
          ],
          { x: "An [explorer] travels to find new lands." },
        ),
        mc(
          "The way you take to get somewhere is a …",
          [
            ["route", "routes"],
            ["claim", "age-exploration"],
            ["wealth", "wealth"],
          ],
          { x: "A [route] is the way you take to get somewhere." },
        ),
        mc(
          "A person who buys and sells goods is a …",
          [
            ["trader", "fur-traders"],
            ["explorer", "ships-asia"],
            ["king", "👑"],
          ],
          { x: "A [trader] buys and sells goods." },
        ),
        mc(
          "Why did Columbus call the people “Indians”?",
          [
            ["He thought he was in the Indies, in Asia.", "china"],
            ["They came from India with him.", "⛵"],
            ["They told him their name.", "🗣️"],
          ],
          {
            img: "indians-meet",
            x: "Columbus thought he had landed in an area of Asia called the [Indies].",
          },
        ),
        mc(
          "The Spanish also wanted to change the Native Indians' …",
          [
            ["religion and culture", "mission"],
            ["rivers and lakes", "🏞️"],
            ["ships", "⛵"],
          ],
          {
            img: "culture",
            x: "They wanted to change their [religion] and [culture].",
          },
        ),
        mc(
          "To claim something is to …",
          [
            ["say it belongs to you", "🙋"],
            ["buy and sell it", "fur-traders"],
            ["cook with it", "spices"],
          ],
          {
            img: "age-exploration",
            x: "To [claim] something is to say it belongs to you.",
          },
        ),
      ],
    },
  ],
};
