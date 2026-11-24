// Social Studies · Grade 4 · Chapter 1 · Lesson 4 « People and the Land » (myWorld Interactive 4, book pp. 28–33).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Learn: the teacher's slides « People and the Land » (20261118, slides 2–16, their pictures t-*.jpg) with the book's facts the booklet asks about (picture cards), the book's vocabulary + the booklet's words, the story « Marjory Stoneman Douglas » (p. 36, story-douglas.html).
// Exercises: Term 2 booklet, Lesson 4 exercise sheet (pp. 3–5), Graded Homework (1) of Term 2 (with 💡 Help), the teacher's Quiz Time (slide 15), and the book's Reading Checks and Lesson 4 Check (pp. 29–33).
// The booklet has no answer key: the answers follow the book (grade-4/social-studies/UNVERIFIED.md).
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-1-lesson-4.py (book crops, the booklet's irrigation drawing, e-*.jpg drawings);
// t-*.jpg: the photos of the teacher's slides (pdfimages -j, at most 720 px wide; t-fun, t-houses, t-sprinklers, t-wind-sun made with two_pictures of draw.py).

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

// Graded Homework 1: a 💡 Help for each question (a hint and the Learn card to look at)
const card = (name) => `Look at the card «${name}» in Learn.`;
const HW_HELP = [
  {
    t: "Saving the aquifer",
    lines: [
      card("Saving the aquifer"),
      "In open [ditches], the sun dried up the water.",
      "Where does the water go now?",
    ],
    vis: {
      kind: "strip",
      items: [
        { e: "☀️💧", label: "Open ditches" },
        { e: "🚇💧", label: "Tunnels" },
      ],
    },
  },
  {
    t: "People change the land",
    lines: [
      card("People change the land"),
      "Burning made the land [clear]. What grew after the fire?",
    ],
    vis: {
      kind: "strip",
      items: [
        { e: "🔥🌾", label: "Burn" },
        { e: "🌱🦬", label: "Grass for animals" },
      ],
    },
  },
  {
    t: "Irrigation",
    lines: [card("Irrigation"), "Water goes to the [crops] in pipes."],
    vis: { kind: "strip", items: [{ e: "💧➡️🌽", label: "Water to crops" }] },
  },
  {
    t: "Aquifer",
    lines: [card("Aquifer"), "The water is in the [rock under the ground]."],
    vis: { kind: "strip", items: [{ e: "🪨💧", label: "Under the ground" }] },
  },
  {
    t: "Houses on stilts",
    lines: [card("Houses on stilts"), "The word has [beach] in it."],
    vis: { kind: "strip", items: [{ e: "🏖️🏠", label: "At the beach" }] },
  },
];

window.LESSON = {
  n: 4,
  key: "ss4-c1-l4",
  grade: 4,
  title: "People and the Land",
  unit: "Chapter 1 · Lesson 4",
  book: "Book pp. 28–33",
  cover: "t-cover",
  question: {
    q: "How do people [adapt to] the land, and how do they [change] it?",
    a: "People [adapt]: they change their clothes, homes and activities to fit the place. People [change] the land with [technology] to meet their needs, and they use technology to [save] resources.",
    img: "t-beach-forest",
  },
  // the book's Vocabulary and Academic Vocabulary (p. 28), + the booklet's words (skyway, treatment plant), + the teacher's Word Wall (slide 16)
  words: [
    { w: "Adapt", m: "to change to fit a new place" },
    { w: "Beach house", m: "a house built on or near a beach" },
    { w: "Stilts", m: "poles that lift a house up" },
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
    { w: "Water treatment", m: "cleaning water so it is safe to use" },
    { w: "Planting", m: "putting seeds in the ground to grow" },
    { w: "Renewable", m: "we can use it again and again (wind, sun)" },
  ],

  // Learn follows the teacher's slides « People and the Land » (20261118, 16 slides: easier than the book, with their pictures t-*.jpg);
  // the book's facts the booklet asks about (pp. 28–33) are added where they fit.
  ideas: [
    // slide 2 · book p. 28
    {
      t: "Where we live matters",
      lines: [
        "Our world has [mountains], [plains] and [beaches].",
        "Some people love to live near the [ocean]. Others want to be close to [mountains].",
        "In a new place, we have to [adapt]!",
      ],
      img: "t-beach-forest",
    },
    {
      t: "Living near resources",
      lines: [
        "Some people live near [natural resources]: they [depend] on them for their jobs.",
        "Miners live near the [coal mines] of Illinois.",
      ],
      img: "mountain-home",
    },
    // slide 3 · book p. 29
    {
      t: "Big word: adapt",
      lines: [
        "To [adapt] means to change so you fit a new place.",
        "[Cold] place? You wear a warm coat and boots.",
        "[Hot] place? You wear a hat and drink more water.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "❄️🧥", label: "Cold: coat and boots" },
          { e: "☀️👒", label: "Hot: hat and water" },
        ],
      },
    },
    {
      t: "Florida or Wisconsin",
      lines: [
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
    // slide 4 · book p. 29
    {
      t: "Our fun changes with the place",
      lines: [
        "At the beach in [Florida]: swim, [surf] and relax!",
        "In [snowy places]: [ski] and snowboard!",
        "In [Wisconsin] you can swim in a [lake] in summer.",
      ],
      img: "t-fun",
    },
    // slide 5 · book p. 29
    {
      t: "Smart buildings",
      lines: [
        "People build their houses to fit the place where they live.",
        "In places with a lot of [rain] or [snow], houses have [steep, sloped roofs].",
        "Why? So the snow and rain [slide off].",
      ],
      img: "t-snow-house",
    },
    {
      t: "Steep roofs",
      lines: [
        "A [steep] roof: the snow slides off.",
        "A [flat] roof: the heavy snow stays on top.",
      ],
      img: "e-roof",
    },
    {
      t: "Beach houses",
      lines: [
        "At the beach, water can rise high during [storms].",
        "So people build [beach houses] on tall [poles]. The house stays up high and dry.",
        "A [beach house] is a house built on or near a beach. Example: the coast in [North Carolina].",
      ],
      img: "t-beach-house",
    },
    // slide 6 · book p. 29
    {
      t: "Houses on stilts",
      lines: [
        "[Stilts] are tall poles that raise a house up.",
        "Beach houses on stilts stay above [flood water]!",
        "They are built strong for [strong winds] and [heavy rain].",
      ],
      img: "t-stilts",
    },
    // book p. 29 (the booklet asks about it)
    {
      t: "Tunnels between buildings",
      lines: [
        "In [Minneapolis] the winter is very cold and snowy.",
        "People built [glass tunnels] between buildings: a [skyway].",
        "They walk inside, out of the cold. The tunnels link about 80 city blocks.",
      ],
      img: "e-skyway",
    },
    // slide 7 · book p. 30
    {
      t: "People change the land",
      lines: [
        "For thousands of years, [Native Americans] [burned] forests and prairies to change the land.",
        "Why? To [clear] the land and make [rich soil]!",
        "The new grass fed the animals.",
      ],
      img: "t-burn",
    },
    // slide 8
    {
      t: "How fire helps the soil",
      lines: [
        "1. Fire [clears] trees and bushes.",
        "2. [Ash] goes into the soil.",
        "3. [Rich soil] helps new plants grow.",
      ],
      img: "t-fire-soil",
    },
    // slide 9 · book p. 30
    {
      t: "People keep changing the land",
      lines: [
        "[European settlers] in the [Northeast] cut down trees to clear fields for [planting].",
        "[Planting]: putting seeds in the ground to grow.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🪓🌲", label: "Cut down trees" },
          { e: "🌱🟫", label: "Planting" },
        ],
      },
    },
    // slide 12 · book p. 30
    {
      t: "The power of technology",
      lines: [
        "Over time, people made [bigger changes] to the land, thanks to [technology].",
        "[Technology] is the use of [tools] and [scientific knowledge].",
        "In the 1800s people cut trees [by hand]. Today [big machines] clear the land quickly.",
      ],
      img: "t-bulldozer",
    },
    {
      t: "Building big",
      lines: [
        "Today, people use technology to build large structures:",
        "[roads], [bridges] over rivers and [dams] that hold back rivers.",
      ],
      img: "t-roads",
    },
    // slide 10 · book p. 31
    {
      t: "Irrigation",
      lines: [
        "[Irrigation] is using technology to bring [water] to [crops].",
        "Some farms are far from water. So [pipes] bring water from lakes, streams and rivers to the plants.",
      ],
      img: "t-sprinklers",
    },
    {
      t: "Irrigation drawing",
      lines: ["The water goes from the river, in [pipes], to the [crops]."],
      img: "irrigation-drawing",
    },
    // slide 11 · book p. 31
    {
      t: "Aquifer",
      lines: [
        "Some farms use water from [under the ground].",
        "An [aquifer] is an underground layer of [rock] that holds [water].",
        "Farms [pump] the water up from the aquifer.",
      ],
      img: "t-aquifer",
    },
    {
      t: "The Ogallala Aquifer",
      lines: [
        "The [Ogallala Aquifer] is a very big aquifer in the [central US], under [8 states].",
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
    // book p. 32 · slide 15 (quiz)
    {
      t: "Saving the aquifer",
      lines: [
        "First, people carried the water in open [ditches]. The sun dried up a lot of it ([evaporation]).",
        "They took water out [faster] than the rain put it back.",
        "Now [tunnels under the ground] carry the water, and nothing is lost to the sun.",
      ],
      img: "e-tunnel",
    },
    // book p. 32 · slide 15 (quiz)
    {
      t: "Factories clean the air",
      lines: [
        "[Air] is a natural resource that everyone needs to live.",
        "Factories make dirty air: [pollution].",
        "A [scrubber] cleans the air with water or chemicals before it goes out.",
      ],
      img: "e-scrubber",
    },
    // slide 13 · book p. 32
    {
      t: "Saving water with technology",
      lines: [
        "People use new technologies to [conserve] (save) resources.",
        "We clean water [before] we use it and [after] we use it.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🏞️💧", label: "1. Pump water from lakes and rivers" },
          { e: "🏭🧽", label: "2. A treatment plant cleans it" },
          { e: "🏠🚿", label: "3. We use it at home" },
          { e: "♻️🌊", label: "4. Clean again, back to rivers" },
        ],
      },
    },
    {
      t: "Water treatment",
      lines: [
        "A [treatment plant] cleans water so it is safe to [drink].",
        "Used water is cleaned again and goes back to [rivers], lakes and the ocean.",
      ],
      img: "e-treatment",
    },
    // slide 14 · book p. 33
    {
      t: "Clean energy from wind and sun",
      lines: [
        "[Wind turbines] have big blades. When the wind blows, the blades spin. This makes [energy].",
        "[Solar panels] sit in the sun. They use [sunlight] to make energy.",
        "Wind and sun are [renewable]: we can use them again and again!",
      ],
      img: "t-wind-sun",
    },
    {
      t: "Saving oil",
      lines: [
        "[Oil] is [nonrenewable]: it can run out.",
        "Use [renewable] energy, like the sun, wind and ocean [waves], to save oil.",
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
            { img: "then-now", label: "Technology: tools and science" },
            { img: "e-scrubber", label: "Scrubber: cleans the air" },
            { img: "e-treatment", label: "Treatment plant: cleans water" },
            { img: "wind-turbines", label: "Wind turbine: wind → electricity" },
          ],
        },
      ],
    },
    {
      k: "steps",
      t: "What comes next?",
      en: "The teacher's steps: fire and soil, clean water",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "How fire helps the soil",
          ask: "Put the steps in order: 1, 2, 3.",
          hint: "Look at the card «How fire helps the soil» in Learn.",
          img: "t-fire-soil",
          steps: [
            { say: "Fire clears trees and bushes.", e: "🔥🌳" },
            { say: "Ash goes into the soil.", e: "⚫🟫" },
            { say: "Rich soil helps new plants grow.", e: "🌱" },
          ],
        },
        {
          type: "order",
          t: "Saving water with technology",
          ask: "Put the steps in order: 1, 2, 3, 4.",
          hint: "Look at the card «Saving water with technology» in Learn.",
          img: "e-treatment",
          steps: [
            { say: "Pump water from lakes and rivers.", e: "🏞️💧" },
            {
              say: "A treatment plant cleans the water so it is safe to drink.",
              e: "🏭🧽",
            },
            { say: "We use it at homes and businesses.", e: "🏠🚿" },
            {
              say: "Used water is cleaned and goes back to rivers.",
              e: "♻️🌊",
            },
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
    // Graded Homework (1), Term 2 (due 24 Nov 2026): A answer 1–2, B write the term 1–3.
    // The open questions are two-choice (Help works only on choose items); help: the Learn card to look at.
    {
      k: "hw1",
      t: "Graded Homework 1",
      en: "Graded Homework 1 · with 💡 Help",
      ic: "🏠",
      from: "Graded Homework (1) · Term 2",
      keep: true,
      items: [
        two(
          "How did people protect the Ogallala Aquifer?",
          "ogallala-map",
          [
            [
              "They carry the water in tunnels under the ground, and better irrigation wastes less water.",
              "e-tunnel",
            ],
            ["They carry the water in open ditches in the sun.", "☀️💧"],
          ],
          "Open ditches lost water: the [sun] dried it up. [Tunnels under the ground] keep the water, and better [irrigation] wastes less.",
        ),
        two(
          "Why did American Indians change the land by burning forests?",
          "🔥🌲",
          [
            [
              "To clear the land: it made rich soil and grass for animals.",
              "🌾🦬",
            ],
            ["To build big cities and roads.", "🏙️🛣️"],
          ],
          "[American Indians] [burned] prairies and forests to [clear] the land. Then the soil was rich and grass grew for the animals.",
        ),
        mc(
          "___ : using technology to bring water to crops.",
          [
            ["Irrigation", "w-irrigation"],
            ["Aquifer", "w-aquifer"],
            ["Beach house", "stilts"],
          ],
          {
            img: "irrigation-drawing",
            x: "[Irrigation] brings water to the crops in pipes, from lakes, rivers and streams.",
          },
        ),
        mc(
          "An ___ is an underground layer of rocks that holds water.",
          [
            ["Aquifer", "w-aquifer"],
            ["Irrigation", "w-irrigation"],
            ["Beach house", "stilts"],
          ],
          {
            img: "e-aquifer",
            x: "An [aquifer] is a layer of rock under the ground that holds water.",
          },
        ),
        mc(
          "___ is a house built on or near a beach.",
          [
            ["Beach house", "stilts"],
            ["Skyway", "w-skyway"],
            ["Aquifer", "w-aquifer"],
          ],
          {
            emoji: "🏖️🏠",
            x: "A [beach house] is at the beach. It stands on [stilts], so the water does not come in.",
          },
        ),
      ].map((it, k) => ({ ...it, help: HW_HELP[k] })),
    },
    {
      k: "quiz",
      t: "Quiz Time",
      en: "The teacher's questions (slide 15)",
      ic: "❓",
      from: "Teacher's slides « People and the Land » · Quiz Time (slide 15)",
      items: [
        {
          type: "open",
          q: "How did people protect the [Ogallala Aquifer]?",
          a: "They built [tunnels underground] to move water without losing it to [evaporation].",
          img: "e-tunnel",
        },
        {
          type: "open",
          q: "Why must factories help protect the [air]?",
          a: "[Air] is a natural resource that everyone needs to live.",
          img: "e-scrubber",
        },
        {
          type: "open",
          q: "Where is water cleaned before and after we use it?",
          a: "At [water treatment plants]. Then it returns to rivers, lakes, and the ocean.",
          img: "e-treatment",
        },
        {
          type: "open",
          q: "How can we protect [nonrenewable] energy without using less?",
          a: "Use [renewable] energy like the sun, wind, and waves.",
          img: "t-wind-sun",
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
