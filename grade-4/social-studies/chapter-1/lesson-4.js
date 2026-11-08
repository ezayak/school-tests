// Social Studies · Grade 4 · Chapter 1 · Lesson 4 « People and the Land » (myWorld Interactive 4, book pp. 28–33).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Learn: the book's text in easy words (picture cards), the book's vocabulary + the booklet's words, the story « Marjory Stoneman Douglas » (p. 36, story-douglas.html).
// Exercises: Term 2 booklet, Lesson 4 exercise sheet (pp. 3–5), and the book's Reading Checks and Lesson 4 Check (pp. 29–33).
// The booklet has no answer key: the answers follow the book (grade-4/social-studies/UNVERIFIED.md).
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-1-lesson-4.py (book crops, the booklet's irrigation drawing, e-*.jpg drawings).

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-4/ or 1–2 emoji.
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
// the booklet's two-choice questions: a picture for the question (file name or emoji), the right answer first
const two = (q, pic, answers, x) =>
  mc(q, answers, {
    ...(/^[a-z]/.test(pic) ? { img: pic } : { emoji: pic }),
    two: true,
    ...(x ? { x } : {}),
  });
// adapt to the land, or change it?
const ADAPT = ["Adapt to the land", "🧥"],
  CHANGE = ["Change the land", "🚜"];
const adapt = (q, pic, isAdapt, x) =>
  two(q, pic, isAdapt ? [ADAPT, CHANGE] : [CHANGE, ADAPT], x);
// Florida or Wisconsin?
const FL = ["Florida", "🌴"],
  WI = ["Wisconsin", "❄️"];
const where = (q, emoji, inFlorida) =>
  two(q, emoji, inFlorida ? [FL, WI] : [WI, FL]);

window.LESSON = {
  n: 4,
  key: "ss4-c1-l4",
  grade: 4,
  title: "People and the Land",
  unit: "Chapter 1 · Lesson 4",
  book: "Book pp. 28–33",
  cover: "mountain-home",
  question: {
    q: "How do people [adapt to] the land, and how do they [change] it?",
    a: "People [adapt]: they change their clothes, homes and activities to fit the place. People [change] the land with [technology] to meet their needs, and they use technology to [save] resources.",
    img: "mountain-home",
  },
  // the book's Vocabulary and Academic Vocabulary (p. 28), + the booklet's words (skyway, treatment plant)
  words: [
    { w: "Adapt", m: "to change to fit a new place or new conditions" },
    { w: "Technology", m: "using tools and science to do work" },
    { w: "Irrigation", m: "using technology to bring water to crops" },
    { w: "Aquifer", m: "a layer of rock under the ground that holds water" },
    { w: "Depend", m: "to need something; to rely on it" },
    { w: "Monitor", m: "to watch and control" },
    { w: "Conserve", m: "to save and protect" },
    { w: "Skyway", m: "glass tunnels that connect buildings in a city" },
    {
      w: "Treatment plant",
      m: "a place that cleans water before and after we use it",
    },
  ],

  ideas: [
    // p. 28
    {
      t: "Where people live",
      lines: [
        "Some people live near the [ocean], some near [mountains] or [plains].",
        "Some people live near [natural resources]: they [depend] on them for their jobs.",
        "Miners live near the [coal mines] of Illinois.",
      ],
      img: "mountain-home",
    },
    // p. 29: People Adapt to the Environment
    {
      t: "Adapt = change to fit",
      lines: [
        "To [adapt] means to change to fit a new place.",
        "You move from warm [Florida] to cold [Wisconsin].",
        "You wear [warm clothes] and use more [heat].",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🌴☀️", label: "Florida: warm" },
          { e: "❄️🧥", label: "Wisconsin: cold" },
        ],
      },
    },
    {
      t: "New place, new activities",
      lines: [
        "In [Florida] you swim and [surf] in the ocean.",
        "In [Wisconsin] you swim in a [lake] in summer.",
        "In winter you [ski] down snowy hills.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🏄", label: "Florida: surf" },
          { e: "🏊", label: "Wisconsin: lake" },
          { e: "⛷️", label: "Wisconsin: ski" },
        ],
      },
    },
    {
      t: "Steep roofs",
      lines: [
        "Where there is a lot of [rain] or [snow], houses have [steep roofs].",
        "Rain and snow [slide off]. They do not stay on top.",
      ],
      img: "e-roof",
    },
    {
      t: "Tunnels between buildings",
      lines: [
        "In [Minneapolis] the winter is very cold and snowy.",
        "People built [glass tunnels] between buildings: a [skyway].",
        "They walk inside, out of the cold. The tunnels link about 80 city blocks.",
      ],
      img: "e-skyway",
    },
    {
      t: "Houses on stilts",
      lines: [
        "At the beach in [North Carolina], the water can rise.",
        "Houses stand on [stilts] (tall legs), so the water does not come in.",
        "They are built strong for [strong winds] and [heavy rain].",
      ],
      img: "stilts",
    },
    // p. 30: People Change the Environment
    {
      t: "People change the land",
      lines: [
        "[American Indians] [burned] prairies and forests to [clear] the land.",
        "That made rich soil and grass for animals.",
        "[European settlers] [cut down] forests to make fields for planting.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🔥🌾", label: "Burn the prairie" },
          { e: "🪓🌲", label: "Cut down trees" },
        ],
      },
    },
    {
      t: "Technology",
      lines: [
        "[Technology] is using [tools] and [science] to do work.",
        "In the 1800s, people cut down trees [by hand], with saws and axes.",
        "Today [big machines] clear the land quickly, for homes, shops and farms.",
      ],
      img: "then-now",
    },
    {
      t: "Building big",
      lines: [
        "People build [roads] on mountains, [highways] and [bridges] over rivers.",
        "They build [dams] to hold back rivers.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "⛰️🛣️", label: "Roads" },
          { e: "🌉", label: "Bridges" },
          { e: "🧱💧", label: "Dams" },
        ],
      },
    },
    // p. 31: irrigation and the Ogallala Aquifer
    {
      t: "Irrigation",
      lines: [
        "[Irrigation] is using technology to bring [water] to [crops].",
        "The water comes in [pipes] from lakes, rivers and streams.",
      ],
      img: "irrigation-drawing",
    },
    {
      t: "Aquifer",
      lines: [
        "An [aquifer] is a layer of [rock under the ground] that holds [water].",
        "Farms far from rivers [pump] the water up from an aquifer.",
      ],
      img: "e-aquifer",
    },
    {
      t: "The Ogallala Aquifer",
      lines: [
        "The [Ogallala Aquifer] is a big aquifer in the [center] of the USA, under [8 states].",
        "Its water helps farms grow [wheat] and [corn].",
        "Nearly all its water is used for [irrigation].",
      ],
      img: "ogallala-map",
    },
    {
      t: "Watching the water",
      lines: [
        "Big [pumps] and [tunnels] bring the water up to the farms.",
        "[Computers] [monitor] the water: how much is taken, and how much is left.",
      ],
      img: "pivot",
    },
    // p. 32: Saving Resources with Technology
    {
      t: "Saving the aquifer",
      lines: [
        "First, people carried the water in open [ditches]. The sun dried up a lot of it.",
        "They took water out [faster] than the rain put it back.",
        "Now [tunnels under the ground] carry the water, and better irrigation [wastes less].",
      ],
      img: "e-tunnel",
    },
    {
      t: "Factories clean the air",
      lines: [
        "Factories make dirty air: [pollution].",
        "A [scrubber] cleans the air with water or chemicals before it goes out.",
      ],
      img: "e-scrubber",
    },
    {
      t: "Clean water",
      lines: [
        "[Treatment plants] clean water [before] it goes to homes, so we can drink it.",
        "They clean the dirty water [after] we use it, and send it back into [rivers].",
      ],
      img: "e-treatment",
    },
    // p. 33
    {
      t: "Energy from wind and sun",
      lines: [
        "[Wind turbines] make electricity from the [wind]. [Solar panels] use the [sun].",
        "Wind, sun and ocean waves are [renewable]: they never run out.",
        "[Oil] is [nonrenewable]: it can run out. Wind and sun help us [save] oil.",
      ],
      img: "wind-turbines",
    },
  ],

  // the book's Citizenship page (p. 36): a story page (shared/story.js) of its own
  stories: [
    {
      t: "Marjory Stoneman Douglas",
      en: "Story · Rescuer of the Everglades",
      path: "story-douglas.html",
      cover: { src: "img/douglas/douglas.jpg" },
    },
  ],

  games: [
    {
      k: "adapt",
      t: "Adapt or change?",
      en: "Do people adapt to the land, or change it?",
      ic: "🧥",
      items: [
        adapt("Wear warm clothes in cold Wisconsin", "🧥❄️", true),
        adapt("Ski down snowy hills", "⛷️", true),
        adapt("Build houses with steep roofs", "e-roof", true),
        adapt("Build houses on stilts at the beach", "stilts", true),
        adapt("Build glass tunnels between buildings", "e-skyway", true),
        adapt("Burn the prairie to clear the land", "🔥🌾", false),
        adapt("Cut down forests to make fields", "🪓🌲", false),
        adapt("Clear land with big machines", "bulldozer", false),
        adapt("Build dams to hold back rivers", "🧱💧", false),
      ],
    },
    {
      k: "where",
      t: "Florida or Wisconsin?",
      en: "Where can you do it?",
      ic: "🌴",
      items: [
        where("Swim and surf in the ocean", "🏄🌊", true),
        where("Ski down snowy hills", "⛷️🏔️", false),
        where("Swim in a freshwater lake", "🏊", false),
        where("Use a lot of air conditioning", "🥵", true),
        where("Bundle up against the cold", "🧣🧤", false),
      ],
    },
    {
      k: "tech",
      t: "Technology at work",
      en: "What does the job?",
      ic: "⚙️",
      items: [
        mc(
          "What brings water to the crops?",
          [
            ["Irrigation", "irrigation-drawing"],
            ["A scrubber", "e-scrubber"],
            ["A wind turbine", "wind-turbines"],
          ],
          { emoji: "🌽💧" },
        ),
        mc(
          "What cleans the dirty air from a factory?",
          [
            ["A scrubber", "e-scrubber"],
            ["A treatment plant", "e-treatment"],
            ["Irrigation", "irrigation-drawing"],
          ],
          { emoji: "🏭💨" },
        ),
        mc(
          "What makes electricity from the wind?",
          [
            ["A wind turbine", "wind-turbines"],
            ["A pump", "e-aquifer"],
            ["A scrubber", "e-scrubber"],
          ],
          { emoji: "💨⚡" },
        ),
        mc(
          "Where is water cleaned before and after we use it?",
          [
            ["At a treatment plant", "e-treatment"],
            ["In an aquifer", "e-aquifer"],
            ["On a skyway", "e-skyway"],
          ],
          { emoji: "💧🧼" },
        ),
        mc(
          "What holds water under the ground?",
          [
            ["An aquifer", "e-aquifer"],
            ["A skyway", "e-skyway"],
            ["A wind turbine", "wind-turbines"],
          ],
          { emoji: "🪨💧" },
        ),
        mc(
          "What links buildings in a cold, snowy city?",
          [
            ["A skyway", "e-skyway"],
            ["Stilts", "stilts"],
            ["Irrigation", "irrigation-drawing"],
          ],
          { emoji: "🏢❄️" },
        ),
      ],
    },
    {
      k: "words",
      t: "Lesson words",
      en: "Match the word and the picture",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "irrigation-drawing", label: "Irrigation: water to crops" },
            { img: "e-aquifer", label: "Aquifer: water under the ground" },
            { img: "e-skyway", label: "Skyway: tunnels between buildings" },
            { img: "stilts", label: "Stilts: houses on tall legs" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "bulldozer", label: "Technology: tools and science" },
            { img: "e-scrubber", label: "Scrubber: cleans the air" },
            { img: "e-treatment", label: "Treatment plant: cleans water" },
            { img: "wind-turbines", label: "Wind turbine: wind → electricity" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "bk-choose",
      t: "Choose",
      en: "Booklet · Exercise sheet A",
      ic: "📝",
      from: "Booklet · Lesson 4 exercise sheet · A (pp. 3–4)",
      keep: true,
      items: [
        two(
          "What does adapt mean?",
          "🌴➡️❄️",
          [
            ["Changing to fit something new", "🧥"],
            ["Staying the same", "🟰"],
          ],
          "To [adapt] is to change to fit a new place, like wearing warm clothes when you move to a cold place.",
        ),
        two("What activity can you do in snowy places?", "❄️🏔️", [
          ["Skiing", "⛷️"],
          ["Surfing", "🏄"],
        ]),
        two(
          "Why do some houses in rainy/snowy places have steep, sloped roofs?",
          "🌨️🏠",
          [
            ["To let rain and snow slide off easily", "e-roof"],
            ["To make the house look bigger", "🏠🔍"],
          ],
          "A [slope] keeps rain and snow from collecting on top of the house.",
        ),
        two(
          "How are beach buildings protected?",
          "🏖️🌊",
          [
            ["by using stilts to raise the building", "stilts"],
            ["by building underground tunnels", "🚇"],
          ],
          "[Stilts] hold the house up high, so rising water does not flood it.",
        ),
        two(
          "How did European/English settlers clear fields for planting?",
          "🌲🌲🌲",
          [
            ["They cut down trees.", "🪓🌲"],
            ["They used technology.", "🚜"],
          ],
          "Long ago there were no big machines: the settlers [cut down forests] to make fields.",
        ),
        two(
          "What is irrigation?",
          "pivot",
          [
            ["Bringing water to crops", "irrigation-drawing"],
            ["Cleaning water", "e-treatment"],
          ],
          "[Irrigation] uses technology to bring water to the crops.",
        ),
        two(
          "What is an aquifer?",
          "ogallala-map",
          [
            ["an underground water source", "e-aquifer"],
            ["a type of house", "🏠"],
          ],
          "An [aquifer] is a layer of rock under the ground that holds water.",
        ),
        two(
          "Where does wastewater go after it is treated?",
          "e-treatment",
          [
            ["back into rivers", "🏞️"],
            ["into the soil", "🟫"],
          ],
          "Treatment plants clean the dirty water, then send it back into [rivers].",
        ),
        two(
          "How do wind turbines make electricity?",
          "wind-turbines",
          [
            ["They use wind.", "💨"],
            ["They use water.", "💧"],
          ],
          "The [wind] turns the blades, and that makes electricity.",
        ),
        two(
          "Why are wind and sun considered renewable resources?",
          "💨☀️",
          [
            ["They never run out.", "♻️"],
            ["They pollute the environment.", "🏭💨"],
          ],
          "The wind blows and the sun shines again and again: they [never run out].",
        ),
        two(
          "How did people use the technology to protect the Ogallala Aquifer?",
          "ogallala-map",
          [
            ["They built tunnels underground.", "e-tunnel"],
            ["They created artificial rain clouds.", "🌧️"],
          ],
          "In open ditches the sun dried up the water. [Tunnels under the ground] keep it.",
        ),
        two(
          "Why is it important for the factories to help protect the air?",
          "e-scrubber",
          [
            ["Because the air is important for everyone", "👨‍👩‍👧"],
            ["Because the air is too cold", "🥶"],
          ],
          "Everyone [breathes] the air: dirty air makes people sick.",
        ),
        two(
          "Where is water cleaned before and after use?",
          "💧🧼",
          [
            ["at treatment plants", "e-treatment"],
            ["in houses", "🏠"],
          ],
          "[Treatment plants] clean water before it goes to homes and after we use it.",
        ),
        two(
          "What can people do to protect nonrenewable resources of energy?",
          "🛢️",
          [
            ["use renewable resources instead", "wind-turbines"],
            ["use more nonrenewable resources", "🛢️🛢️"],
          ],
          "When we use [wind and sun], we use less oil, so the oil lasts longer.",
        ),
        two(
          "Where might you go if you want to swim and surf?",
          "🏄",
          [
            ["Florida", "🌴☀️"],
            ["Alaska", "🏔️❄️"],
          ],
          "[Florida] is warm and has ocean beaches. Alaska is very cold.",
        ),
        two(
          "What is the name of the large aquifer in Central U.S.A?",
          "🇺🇸💧",
          [
            ["Ogallala aquifer", "ogallala-map"],
            ["Floridian aquifer", "🌴"],
          ],
          "The [Ogallala Aquifer] is under 8 states in the middle of the USA.",
        ),
        two(
          "Who used the fire to clean the land?",
          "🔥🌾",
          [
            ["American Indians", "🪶"],
            ["European settlers", "⛵"],
          ],
          "[American Indians] burned prairies and forests to clear the land.",
        ),
      ],
    },
    {
      k: "bk-match",
      t: "Match",
      en: "Booklet · Exercise sheet B",
      ic: "🔗",
      from: "Booklet · Lesson 4 exercise sheet · B (p. 5)",
      // word cards w-*.jpg: the picture and the word (made by the picture script)
      items: [
        {
          type: "match",
          pairs: [
            {
              img: "w-skyway",
              label: "connects different buildings across a large city.",
            },
            {
              img: "w-adapting",
              label: "means changing to fit the new conditions",
            },
            {
              img: "w-aquifer",
              label: "is an underground layer of rocks that holds water",
            },
          ],
        },
        {
          type: "match",
          pairs: [
            {
              img: "w-irrigation",
              label: "is using technology to bring water to crops.",
            },
            {
              img: "w-technology",
              label: "is the use of tools and scientific knowledge to do work",
            },
            {
              img: "w-treatment",
              label:
                "provide clean water to the houses and treat the water to return it to the river",
            },
          ],
        },
      ],
    },
    {
      k: "bk-answer",
      t: "Answer",
      en: "Booklet · Exercise sheet C",
      ic: "✏️",
      from: "Booklet · Lesson 4 exercise sheet · C (p. 5)",
      items: [
        // unverified: no school model answer; written from the book p. 32–33
        {
          type: "open",
          q: "What technology can we use to [conserve] (save) resources?",
          a: "[Tunnels under the ground] and better [irrigation] save water. [Scrubbers] clean the air from factories. [Treatment plants] clean the water. [Wind turbines] and [solar panels] save oil.",
          img: "e-tunnel",
        },
      ],
    },
    {
      k: "check",
      t: "Book questions",
      en: "Reading Checks and Lesson 4 Check",
      ic: "📘",
      from: "Book pp. 29–33 · Reading Checks 1–3, Lesson 4 Check 4–6",
      keep: true,
      items: [
        {
          type: "open",
          q: "Identify one way people in [Minnesota] have adapted to the environment.",
          a: "They built [glass tunnels] between buildings, so people can walk inside during the cold, snowy winter.",
          img: "e-skyway",
        },
        {
          type: "open",
          q: "Explain why the [Ogallala Aquifer] is important to farming.",
          a: "Many farms are far from rivers. The aquifer gives them [water] to [irrigate] millions of acres of wheat, corn and other crops.",
          img: "pivot",
        },
        {
          type: "multi",
          q: "Technology at work: choose the uses of technology to [conserve] resources.",
          opts: [
            { t: "Tunnels that carry water", img: "e-tunnel", ok: true },
            { t: "Scrubbers that clean the air", img: "e-scrubber", ok: true },
            {
              t: "Treatment plants that clean water",
              img: "e-treatment",
              ok: true,
            },
            {
              t: "Wind turbines and solar panels",
              img: "wind-turbines",
              ok: true,
            },
            { t: "Cutting down all the forests", emoji: "🪓🌲" },
          ],
        },
        // unverified: the book's open questions have no key; the answers follow the book's text
        {
          type: "open",
          q: "Explain why people might [settle] near certain natural resources.",
          a: "They can [work] in businesses that use those resources, so they [depend] on them. Example: miners live near the coal mines of Illinois.",
          emoji: "⛏️🏠",
        },
        {
          type: "open",
          q: "Describe how you [adapt] to your physical environment.",
          a: "When it is hot, I wear light clothes and use the air conditioning. When it is cold, I wear a warm coat.",
          emoji: "🥵🧥",
        },
        {
          type: "open",
          q: "Identify some activities people do outside that visitors to the United States would also want to do.",
          a: "Swim and surf at the beach in Florida, swim in a lake, and ski down snowy hills.",
          emoji: "🏄⛷️",
        },
      ],
    },
  ],
};
