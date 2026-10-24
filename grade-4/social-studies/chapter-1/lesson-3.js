// Social Studies · Grade 4 · Chapter 1 · Lesson 3 « Regions and Resources ».
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Sources: the teacher's slides, the booklet (Lesson 3 exercise sheet and activities), Graded Homework 2. No school model answers: answers follow the slides.
// Soil is renewable everywhere (slide 10; slide 5 says otherwise). Gas and money in the booklet sort: gas is natural, money is capital.
window.LESSON = {
  n: 3,
  key: "ss4-c1-l3",
  grade: 4,
  title: "Regions and Resources",
  unit: "Chapter 1 · Lesson 3",
  book: "Teacher's slides",
  cover: "explore",
  question: {
    q: "What [resources] do people use to make things?",
    a: "[Natural] resources from nature, [capital] resources made by people, and [human] resources: people and their skills.",
    img: "explore",
  },
  // the slides' "Important Definitions" + non-renewable and processing from the booklet
  words: [
    { w: "Resource", m: "any material that is used to make things" },
    {
      w: "Natural resource",
      m: "something in the environment that people can use",
    },
    {
      w: "Capital resources",
      m: "human-made things that we use to make other things",
    },
    {
      w: "Human resources",
      m: "people and their skills, ideas, and hard work",
    },
    { w: "Renewable resource", m: "can be replaced" },
    {
      w: "Non-renewable resource",
      m: "cannot be replaced, or takes a very long time to form again",
    },
    { w: "Processing", m: "making resources useful through extra steps" },
    { w: "Pollution", m: "anything that makes the earth dirty and unhealthy" },
    { w: "Conserve", m: "save and protect" },
  ],

  ideas: [
    {
      t: "Natural resources",
      lines: [
        "Everything in [nature] that people can use is a [natural resource].",
        "Think of a forest, a beach or a farm!",
      ],
      img: "natural-chart",
    },
    {
      t: "Resources make products",
      lines: [
        "A [resource] is any material used to make things.",
        "We make [food], [houses], [clothes] and [toys] from resources.",
      ],
      img: "explore",
    },
    {
      t: "Examples of natural resources",
      lines: [
        "[Coal], [animals], [metal], [soil], [stone], [trees and plants].",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "coal", label: "Coal" },
          { img: "animals", label: "Animals" },
          { img: "metal", label: "Metal" },
          { img: "soil", label: "Soil" },
          { img: "stone", label: "Stone" },
          { img: "trees", label: "Trees" },
        ],
      },
    },
    {
      t: "From tree to book",
      lines: [
        "We use [wood] from trees to make furniture and your school desk.",
        "When wood is [processed], it becomes [paper] for your books.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "trees", label: "Tree" },
          { img: "furniture", label: "Furniture" },
          { img: "paper", label: "Paper" },
        ],
      },
    },
    {
      t: "Processing",
      lines: [
        "Some resources need extra steps to be useful: [processing].",
        "[Oil] is processed to make [gasoline] for cars.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "oil", label: "Oil" },
          { e: "🏭", label: "Processing" },
          { img: "worker", label: "Gasoline" },
        ],
      },
    },
    {
      t: "Renewable resources",
      lines: [
        "[Renewable] resources can be [replaced in a short time].",
        "They grow again or come back: [trees], [water], [soil].",
      ],
      img: "planting",
    },
    {
      t: "Soil is renewable",
      lines: [
        "Nature makes new [soil] all the time, so soil is [renewable].",
        "But new soil forms [very, very slowly].",
        "So we must [protect] the soil we have.",
      ],
      img: "soil",
    },
    {
      t: "Non-renewable resources",
      lines: [
        "[Non-renewable] resources [cannot be replaced] once we use them.",
        "Or they take a very long time to form again.",
        "[Coal], [oil] and [natural gas] are non-renewable.",
      ],
      img: "coal-truck",
    },
    {
      t: "Renewable and non-renewable energy",
      lines: [
        "Renewable: [sun], [wind], water, plants.",
        "Non-renewable: [coal], [oil], [natural gas], [nuclear].",
      ],
      img: "energy-sources",
    },
    {
      t: "Save non-renewable resources",
      lines: [
        "They are [precious]: we must [conserve] (save and protect) them.",
        "[Turn off the lights] when you don't use them.",
        "[Walk or bike] instead of driving.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "lights-off", label: "Lights off" },
          { img: "bike", label: "Walk or bike" },
        ],
      },
    },
    {
      t: "Take care of renewable resources",
      lines: [
        "[Pollution] makes the earth dirty and unhealthy. It can harm water and soil.",
        "People clean our water and protect our soil.",
        "[Replant trees] and [recycle paper] to care for forests.",
      ],
      img: "planting",
    },
    {
      t: "Capital resources",
      lines: [
        "[Capital resources] are [human-made] things we use to make other things.",
        "[Tools], [machines] and [buildings] are capital resources.",
      ],
      img: "tractor",
    },
    {
      t: "Examples of capital resources",
      lines: [
        "Machinery, vehicles, stationery, packing boxes, office furniture, uniforms.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "machinery", label: "Machinery" },
          { img: "vehicles", label: "Vehicles" },
          { img: "stationery", label: "Stationery" },
          { img: "boxes", label: "Boxes" },
          { img: "office", label: "Office" },
          { img: "uniform", label: "Uniforms" },
        ],
      },
    },
    {
      t: "Human resources",
      lines: [
        "The most important resource of all: [people]!",
        "[Human resources] are people and their [skills], [ideas] and [hard work].",
        "Every person who has a [job] is a human resource.",
      ],
      img: "carpenter",
    },
  ],

  games: [
    {
      k: "nhc",
      t: "Natural, human or capital?",
      en: "Which kind of resource?",
      ic: "🧺",
      items: [
        {
          type: "mc",
          q: "Trees",
          img: "trees",
          opts: ["Natural", "Human", "Capital"],
          icons: ["🌳", "🧑‍🌾", "🚜"],
        },
        {
          type: "mc",
          q: "A tractor",
          img: "tractor",
          opts: ["Capital", "Natural", "Human"],
          icons: ["🚜", "🌳", "🧑‍🌾"],
          x: "A tractor is [made by people] to make other things.",
        },
        {
          type: "mc",
          q: "A carpenter and his skills",
          img: "carpenter",
          opts: ["Human", "Natural", "Capital"],
          icons: ["🧑‍🌾", "🌳", "🚜"],
        },
        {
          type: "mc",
          q: "Coal",
          img: "coal",
          opts: ["Natural", "Capital", "Human"],
          icons: ["🌳", "🚜", "🧑‍🌾"],
        },
        {
          type: "mc",
          q: "Office furniture",
          img: "office",
          opts: ["Capital", "Human", "Natural"],
          icons: ["🚜", "🧑‍🌾", "🌳"],
        },
        {
          type: "mc",
          q: "A worker at the gas station",
          img: "worker",
          opts: ["Human", "Capital", "Natural"],
          icons: ["🧑‍🌾", "🚜", "🌳"],
        },
        {
          type: "mc",
          q: "Animals",
          img: "animals",
          opts: ["Natural", "Human", "Capital"],
          icons: ["🌳", "🧑‍🌾", "🚜"],
        },
        {
          type: "mc",
          q: "Machinery",
          img: "machinery",
          opts: ["Capital", "Natural", "Human"],
          icons: ["🚜", "🌳", "🧑‍🌾"],
        },
      ],
    },
    {
      k: "rn",
      t: "Renewable or not?",
      en: "Can it come back?",
      ic: "♻️",
      items: [
        {
          type: "mc",
          q: "Trees",
          img: "tree",
          opts: ["Renewable", "Non-renewable"],
          icons: ["♻️", "⛔"],
          two: true,
          x: "We can plant new trees.",
        },
        {
          type: "mc",
          q: "Coal",
          img: "coal",
          opts: ["Non-renewable", "Renewable"],
          icons: ["⛔", "♻️"],
          two: true,
        },
        {
          type: "mc",
          q: "Water",
          img: "water",
          opts: ["Renewable", "Non-renewable"],
          icons: ["♻️", "⛔"],
          two: true,
        },
        {
          type: "mc",
          q: "Oil",
          img: "oil",
          opts: ["Non-renewable", "Renewable"],
          icons: ["⛔", "♻️"],
          two: true,
        },
        {
          type: "mc",
          q: "Soil",
          img: "soil",
          opts: ["Renewable", "Non-renewable"],
          icons: ["♻️", "⛔"],
          two: true,
          x: "Soil is renewable, but it forms [very slowly]. Protect it!",
        },
        {
          type: "mc",
          q: "Natural gas",
          img: "gas",
          opts: ["Non-renewable", "Renewable"],
          icons: ["⛔", "♻️"],
          two: true,
        },
        {
          type: "mc",
          q: "The sun",
          img: "sun",
          opts: ["Renewable", "Non-renewable"],
          icons: ["♻️", "⛔"],
          two: true,
        },
        {
          type: "mc",
          q: "Wind",
          img: "wind",
          opts: ["Renewable", "Non-renewable"],
          icons: ["♻️", "⛔"],
          two: true,
        },
      ],
    },
    {
      k: "save",
      t: "Good for the Earth?",
      en: "Save and protect resources",
      ic: "🌍",
      items: [
        {
          type: "multi",
          q: "Choose the ways to [save] non-renewable resources.",
          opts: [
            { t: "Turn off the lights", img: "lights-off", ok: true },
            { t: "Walk or bike instead of driving", img: "bike", ok: true },
            { t: "Leave the lights on all the time", emoji: "💡💡💡" },
            { t: "Drive everywhere", emoji: "🚗💨" },
          ],
        },
        {
          type: "multi",
          q: "Choose the ways to [care for our forests].",
          opts: [
            { t: "Replant trees", img: "planting", ok: true },
            { t: "Recycle paper", emoji: "📄♻️", ok: true },
            { t: "Cut down all the trees", emoji: "🪓🌲" },
          ],
        },
        {
          type: "mc",
          q: "Wood is processed. What does it become?",
          img: "trees",
          opts: ["Paper", "Metal", "Water"],
          pics: ["paper", "metal", "water"],
        },
        {
          type: "mc",
          q: "Oil is processed. What does it become?",
          img: "oil",
          opts: ["Gasoline for cars", "Paper", "Wood"],
          icons: ["⛽", "📄", "🪵"],
        },
      ],
    },
    {
      k: "words",
      t: "Resource words",
      en: "Match the word and the picture",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "natural-chart", label: "Natural resources" },
            { img: "tractor", label: "Capital resources" },
            { img: "carpenter", label: "Human resources" },
            { img: "planting", label: "Renewable: can be replaced" },
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
      from: "Booklet · Lesson 3 exercise sheet · A",
      items: [
        {
          type: "mc",
          q: "___ resources are things in nature that people can use.",
          img: "natural-chart",
          opts: ["Natural", "Human"],
          icons: ["🌳", "🧑‍🌾"],
          two: true,
        },
        {
          type: "mc",
          q: "Which of the following is an example of a natural resource?",
          emoji: "🌳 🔑",
          opts: ["Tree / wood", "A key"],
          icons: ["🌳", "🔑"],
          two: true,
        },
        {
          type: "mc",
          q: "What happens to wood when it is processed?",
          img: "trees",
          opts: ["It becomes paper", "It turns into metal"],
          pics: ["paper", "metal"],
          two: true,
        },
        {
          type: "mc",
          q: "___ resources are human-made things used to develop or make other things.",
          img: "tractor",
          opts: ["Capital", "Human"],
          icons: ["🚜", "🧑‍🌾"],
          two: true,
        },
        {
          type: "mc",
          q: "Which of the following is a capital resource?",
          img: "office",
          opts: ["A building", "The Moon"],
          icons: ["🏢", "🌙"],
          two: true,
        },
        {
          type: "mc",
          q: "What are human resources?",
          img: "carpenter",
          opts: [
            "People and their skills, ideas, and hard work",
            "Animals in the wild",
          ],
          icons: ["🧑‍🔧", "🦁"],
          two: true,
        },
        {
          type: "mc",
          q: "___ is making resources useful through extra steps.",
          emoji: "🛢️ ➡️ 🏭 ➡️ ⛽",
          opts: ["Processing", "Packaging"],
          icons: ["🏭", "📦"],
          two: true,
        },
        {
          type: "mc",
          q: "Why does oil need processing?",
          img: "oil",
          opts: ["To make gasoline for cars", "To make it disappear"],
          icons: ["⛽", "💨"],
          two: true,
        },
        {
          type: "mc",
          q: "What does nonrenewable mean?",
          img: "coal-truck",
          opts: [
            "Cannot be replaced or would take a long time to form again",
            "Can be replaced quickly",
          ],
          icons: ["⛔", "♻️"],
          two: true,
        },
        {
          type: "mc",
          q: "Which of the following is a non-renewable resource?",
          emoji: "⚫ 💨",
          opts: ["Coal", "Wind"],
          pics: ["coal", "wind"],
          two: true,
        },
        {
          type: "mc",
          q: "What does renewable mean?",
          img: "planting",
          opts: ["Can be replaced over time", "Can never be replaced"],
          icons: ["♻️", "⛔"],
          two: true,
        },
        {
          type: "mc",
          q: "How can we care for our forests?",
          img: "planting",
          opts: [
            "Plant more trees and recycle paper",
            "Cut down all the trees",
          ],
          icons: ["🌱♻️", "🪓"],
          two: true,
        },
        {
          type: "mc",
          q: "What is a good way to protect water and soil?",
          img: "soil",
          opts: ["Clean the water and protect the soil", "Pollute them more"],
          icons: ["🧹💧", "🏭💨"],
          two: true,
        },
        {
          type: "mc",
          q: "Which of the following is a good practice for conserving / saving resources?",
          img: "bike",
          opts: [
            "Walking or biking instead of driving",
            "Leaving lights on all the time",
          ],
          icons: ["🚲", "💡"],
          two: true,
        },
        {
          type: "mc",
          q: "What is the main idea behind conserving / saving resources?",
          emoji: "🌍👧👦",
          opts: [
            "Save them for future generations",
            "Use them as quickly as possible",
          ],
          icons: ["👶", "⏩"],
          two: true,
        },
        {
          type: "mc",
          q: "Why is it important to protect nonrenewable resources?",
          img: "coal-truck",
          opts: [
            "Because they are precious and limited",
            "Because they can be replaced",
          ],
          icons: ["💎", "♻️"],
          two: true,
        },
      ],
    },
    {
      k: "bk-match",
      t: "Match",
      en: "Booklet · Exercise sheet B",
      ic: "🔗",
      from: "Booklet · Lesson 3 exercise sheet · B",
      items: [
        {
          type: "match",
          pairs: [
            {
              vis: {
                kind: "strip",
                items: [{ img: "natural-chart", label: "Natural resources" }],
              },
              label: "Are in the environment and people can use them.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "tractor", label: "Capital resources" }],
              },
              label:
                "Are the human-made things that we use to make other things.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "coal-cart", label: "Non-renewable resources" }],
              },
              label:
                "Cannot be replaced or will not be replaced for a long time.",
            },
          ],
        },
        {
          type: "match",
          pairs: [
            {
              vis: {
                kind: "strip",
                items: [{ img: "carpenter", label: "Human resources" }],
              },
              label: "Include people and their skills, ideas, and hard work.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "planting", label: "Renewable resources" }],
              },
              label: "Can be replaced.",
            },
          ],
        },
      ],
    },
    {
      k: "bk-renew",
      t: "Renewable or non-renewable?",
      en: "Booklet · Activity (sort the resources)",
      ic: "♻️",
      from: "Booklet · Lesson 3 activity",
      items: [
        ["Water", "water", true],
        ["Oil", "oil", false],
        ["Solar energy", "sun", true],
        ["Nuclear energy", "nuclear", false],
        ["Wind energy", "wind", true],
        ["Plants", "plants", true],
        ["Gold", "gold", false],
        ["Coal", "coal-cart", false],
        ["Natural gas", "gas", false],
        ["Trees", "tree", true],
        ["Iron", "iron", false],
        ["Air", "air", true],
      ].map(([q, img, r]) => ({
        type: "mc",
        q,
        img,
        opts: r
          ? ["Renewable", "Non-renewable"]
          : ["Non-renewable", "Renewable"],
        icons: r ? ["♻️", "⛔"] : ["⛔", "♻️"],
        two: true,
      })),
    },
    {
      k: "bk-sort",
      t: "Sorting resources",
      en: "Booklet · Activity (natural, human, capital)",
      ic: "🗂️",
      from: "Booklet · Sorting Resources",
      items: [
        ["Honeybees", "🐝", "N"],
        ["Grain silos", "🌾🏗️", "C"],
        ["Sunlight", "☀️", "N"],
        ["Farmers", "🧑‍🌾", "H"],
        ["Water", "💧", "N"],
        ["Teachers", "🧑‍🏫", "H"],
        ["Tractors", "🚜", "C"],
        ["Money", "💵", "C"],
        ["Truck drivers", "🚚🧑", "H"],
        ["Greenhouses", "🏡🌱", "C"],
        ["Gas", "🔥", "N"],
        ["Farming tools", "🧰", "C"],
        ["Soil", "🟫🌱", "N"],
        ["Fields", "🌾", "N"],
        ["Trees", "🌳", "N"],
      ].map(([q, emoji, k]) => {
        const all = [
          ["N", "Natural", "🌳"],
          ["H", "Human", "🧑‍🌾"],
          ["C", "Capital", "🚜"],
        ];
        const o = [
          all.find((a) => a[0] === k),
          ...all.filter((a) => a[0] !== k),
        ];
        return {
          type: "mc",
          q,
          emoji,
          opts: o.map((a) => a[1]),
          icons: o.map((a) => a[2]),
        };
      }),
    },
    {
      k: "hw2",
      t: "Graded Homework 2",
      en: "Answer the questions",
      ic: "🏠",
      from: "Graded Homework 2",
      items: [
        {
          type: "open",
          q: "How can we save nonrenewable resources? Write [two] ways.",
          a: "a) [Turning off lights] when not in use. b) [Walking or biking] instead of driving.",
          img: "lights-off",
        },
        {
          type: "open",
          q: "Write one example of a [natural resource].",
          a: "[Trees] (also: water, soil, coal, animals, stone).",
          img: "natural-chart",
        },
        {
          type: "open",
          q: "Write one example of a [capital resource].",
          a: "[A tractor] (also: machines, tools, buildings, vehicles).",
          img: "tractor",
        },
        {
          type: "open",
          q: "Write one example of a [human resource].",
          a: "[A farmer] (also: a teacher, a carpenter, a truck driver).",
          img: "carpenter",
        },
      ],
    },
  ],
};
