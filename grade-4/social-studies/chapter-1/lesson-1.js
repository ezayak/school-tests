// Social Studies · Grade 4 · Chapter 1 · Lesson 1 « Land and Regions in the United States ».
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Sources: the teacher's slides, the booklet (Lesson 1 exercise sheet and activity), Graded Homework 1. No school model answers: answers follow the slides.
window.LESSON = {
  n: 1,
  key: "ss4-c1-l1",
  grade: 4,
  title: "Land and Regions in the United States",
  unit: "Chapter 1 · Lesson 1",
  book: "Teacher's slides",
  cover: "regions-kids",
  question: {
    q: "What are the [5 regions] of the United States?",
    a: "The [Northeast], the [Southeast], the [Midwest], the [Southwest] and the [West].",
    img: "regions-map",
  },
  // the slides' "Important Definitions" + plateau and desert from the booklet
  words: [
    { w: "Landforms", m: "the different shapes of Earth's surface" },
    { w: "Mountains", m: "the highest landforms on Earth" },
    { w: "Hills", m: "smaller than mountains" },
    { w: "Plains", m: "large or small areas covered with grasses" },
    { w: "Canyon", m: "a deep, narrow valley with steep, rocky sides" },
    { w: "Plateau", m: "a large, flat, raised area of land" },
    { w: "Desert", m: "a dry area that gets little water" },
    { w: "Mountain range", m: "a group or chain of mountains close together" },
    { w: "Coastal plain", m: "a flat area of land next to the ocean" },
    { w: "Region", m: "an area where places share similar characteristics" },
  ],

  ideas: [
    {
      t: "Landforms",
      lines: [
        "[Landforms] are the different shapes of Earth's surface.",
        "A hill, a mountain and an island are landforms.",
      ],
      img: "types",
    },
    {
      t: "Mountains and hills",
      lines: [
        "[Mountains] are the [highest] landforms on Earth.",
        "[Hills] are [smaller] than mountains, but still fun to climb!",
      ],
      img: "mountains-hills",
    },
    {
      t: "A mountain range",
      lines: [
        "Sometimes mountains join together in lines.",
        "A [mountain range] is a group or chain of mountains close together.",
      ],
      img: "range",
    },
    {
      t: "Plains",
      lines: [
        "[Plains] may be large or small.",
        "They are often covered with [grasses].",
      ],
      img: "lf-plain",
    },
    {
      t: "Canyons",
      lines: [
        "A [canyon] is a deep, narrow valley.",
        "It has [steep, rocky] sides.",
      ],
      img: "lf-canyon",
    },
    {
      t: "Plateaus",
      lines: [
        "A [plateau] is a large, [flat], [raised] area of land.",
        "It is high, but its top is flat.",
      ],
      img: "lf-plateau",
    },
    {
      t: "Regions",
      lines: [
        "Geographers divide the United States into smaller areas called [regions].",
        "A [region] is an area where places share similar characteristics.",
      ],
      img: "regions-map",
    },
    {
      t: "5 regions",
      lines: [
        "The United States has [5] regions:",
        "[West], [Midwest], [Northeast], [Southwest], [Southeast].",
      ],
      img: "regions-5",
    },
    {
      t: "The Northeast",
      lines: [
        "Rolling [hills] and [rocky soil] along the [Atlantic Ocean].",
        "The [Appalachian Mountains] run through the region.",
      ],
      img: "appalachian",
    },
    {
      t: "The Southeast",
      lines: [
        "It shares the [Appalachian Mountains] with the Northeast.",
        "It has [coastal plains] (beaches): flat land next to the ocean.",
        "The [Mississippi River] flows through it.",
      ],
      img: "coastal-plain",
    },
    {
      t: "The Midwest",
      lines: [
        "Endless [fields of grass].",
        "Many rivers: the [Missouri], the [Mississippi] and the [Ohio].",
      ],
      img: "grassland",
    },
    {
      t: "The Southwest",
      lines: [
        "[Dry lands] and [rocky canyons].",
        "[Deserts] are like super dry lands.",
        "Its most famous landmark is the [Grand Canyon].",
      ],
      img: "grand-canyon",
    },
    {
      t: "The West",
      lines: [
        "The [biggest] region, with the most different lands.",
        "[Mount McKinley] (Denali) is the [highest] point of the USA.",
        "[Death Valley] is the [lowest] point.",
      ],
      img: "denali",
    },
    {
      t: "Boundaries",
      lines: [
        "The United States is bordered by [Canada] and [Mexico].",
        "The governments of the countries agree on the borders.",
      ],
      vis: {
        kind: "strip",
        items: [
          { e: "🇨🇦", label: "Canada (north)" },
          { e: "🇺🇸", label: "United States" },
          { e: "🇲🇽", label: "Mexico (south)" },
        ],
      },
    },
  ],

  games: [
    {
      k: "lf",
      t: "Which landform?",
      en: "Look at the picture",
      ic: "⛰️",
      items: [
        {
          type: "mc",
          q: "Which landform is this?",
          img: "lf-mountain",
          opts: ["Mountain", "Plain", "Canyon"],
          x: "Mountains are the [highest] landforms.",
        },
        {
          type: "mc",
          q: "Which landform is this?",
          img: "lf-hill",
          opts: ["Hills", "Mountains", "Plateau"],
          x: "Hills are [smaller] than mountains.",
        },
        {
          type: "mc",
          q: "Which landform is this?",
          img: "lf-plain",
          opts: ["Plain", "Canyon", "Mountain"],
          x: "Plains are covered with [grasses].",
        },
        {
          type: "mc",
          q: "Which landform is this?",
          img: "lf-canyon",
          opts: ["Canyon", "Hill", "Plain"],
          x: "A canyon is a deep, narrow valley with [steep, rocky sides].",
        },
        {
          type: "mc",
          q: "Which landform is this?",
          img: "lf-plateau",
          opts: ["Plateau", "Mountain", "Hill"],
          x: "A plateau is [flat] on top and [raised].",
        },
        {
          type: "mc",
          q: "Many mountains close together. What is it?",
          img: "range",
          opts: ["A mountain range", "A plain", "A canyon"],
        },
        {
          type: "mc",
          q: "Flat land next to the ocean. What is it?",
          img: "coastal-plain",
          opts: ["A coastal plain", "A mountain", "A canyon"],
        },
        {
          type: "mc",
          q: "A very dry land with little water. What is it?",
          emoji: "🏜️🌵",
          opts: ["A desert", "A plain", "A river"],
        },
      ],
    },
    {
      k: "reg",
      t: "Which region?",
      en: "Find the region on the map",
      ic: "🗺️",
      items: [
        {
          type: "mc",
          q: "Which region is this?",
          img: "r-northeast",
          opts: ["Northeast", "Southeast", "West"],
        },
        {
          type: "mc",
          q: "Which region is this?",
          img: "r-southeast",
          opts: ["Southeast", "Southwest", "Midwest"],
        },
        {
          type: "mc",
          q: "Which region is this?",
          img: "r-midwest",
          opts: ["Midwest", "Northeast", "West"],
        },
        {
          type: "mc",
          q: "Which region is this?",
          img: "r-southwest",
          opts: ["Southwest", "Southeast", "Midwest"],
        },
        {
          type: "mc",
          q: "Which region is this?",
          img: "r-west",
          opts: ["West", "Midwest", "Northeast"],
          x: "The West is the [biggest] region.",
        },
      ],
    },
    {
      k: "where",
      t: "Where is it?",
      en: "Famous places and their region",
      ic: "📍",
      items: [
        {
          type: "mc",
          q: "The [Grand Canyon] is in the ___",
          img: "grand-canyon",
          opts: ["Southwest", "Northeast", "Midwest"],
        },
        {
          type: "mc",
          q: "[Mount McKinley] (Denali), the highest peak, is in the ___",
          img: "denali",
          opts: ["West", "Southeast", "Midwest"],
        },
        {
          type: "mc",
          q: "[Death Valley], the lowest point, is in the ___",
          img: "death-valley",
          opts: ["West", "Northeast", "Southeast"],
        },
        {
          type: "mc",
          q: "Rocky soil along the [Atlantic Ocean] is in the ___",
          img: "atlantic",
          opts: ["Northeast", "Southwest", "West"],
        },
        {
          type: "mc",
          q: "[Coastal plains] (beaches) are in the ___",
          img: "coastal-plain",
          opts: ["Southeast", "Midwest", "Southwest"],
        },
        {
          type: "mc",
          q: "Endless [fields of grass] are in the ___",
          img: "grassland",
          opts: ["Midwest", "Southwest", "Northeast"],
        },
        {
          type: "mc",
          q: "The [Missouri], [Mississippi] and [Ohio] rivers are all in the ___",
          img: "river",
          opts: ["Midwest", "West", "Northeast"],
        },
        {
          type: "mc",
          q: "[Deserts] and dry lands are in the ___",
          emoji: "🏜️🌵",
          opts: ["Southwest", "Northeast", "Midwest"],
        },
      ],
    },
    {
      k: "words",
      t: "Word and picture",
      en: "Match the word and the picture",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "lf-mountain", label: "Mountain" },
            { img: "lf-hill", label: "Hills" },
            { img: "lf-canyon", label: "Canyon" },
            { img: "lf-plateau", label: "Plateau" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "lf-plain", label: "Plains" },
            { img: "range", label: "Mountain range" },
            { img: "coastal-plain", label: "Coastal plain" },
            { img: "regions-map", label: "Regions" },
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
      from: "Booklet · Lesson 1 exercise sheet · A",
      items: [
        {
          type: "mc",
          q: "There are ___ regions in the United States.",
          img: "regions-5",
          opts: ["5", "6", "7"],
        },
        {
          type: "mc",
          q: "The ___ are in both the Northeast and Southeast regions.",
          img: "appalachian",
          opts: ["Appalachian Mountains", "deserts", "jungles"],
        },
        {
          type: "mc",
          q: "The soil was rocky in the ___",
          img: "atlantic",
          opts: ["Northeast", "Midwest"],
          two: true,
        },
        {
          type: "mc",
          q: "___ can be found in the Northeast.",
          img: "appalachian",
          opts: ["Hills", "Grand Canyon"],
          pics: ["lf-hill", "grand-canyon"],
        },
        {
          type: "mc",
          q: "You can enjoy ___ plains in the Southeast.",
          img: "coastal-plain",
          opts: ["coastal", "grassland"],
          two: true,
        },
        {
          type: "mc",
          q: "The ___ flows through the Southeast region.",
          img: "r-southeast",
          opts: ["Mississippi River", "Missouri River"],
          two: true,
          x: "The Mississippi flows through the Midwest [and] the Southeast.",
        },
        {
          type: "mc",
          q: "The Missouri, Mississippi, and Ohio rivers are all in the ___ region.",
          img: "river",
          opts: ["Midwest", "Northeast"],
          two: true,
        },
        {
          type: "mc",
          q: "You can find the fields of grass in the ___",
          img: "grassland",
          opts: ["Midwest", "Southwest"],
          two: true,
        },
        {
          type: "mc",
          q: "The ___ is all about dry lands and rocky canyons.",
          img: "grand-canyon",
          opts: ["Southwest", "Midwest"],
          two: true,
        },
        {
          type: "mc",
          q: "The highest and lowest points in the United States are found in the ___",
          img: "denali",
          opts: ["West", "Midwest"],
          two: true,
        },
        {
          type: "mc",
          q: "The countries of ___ and Mexico border the United States.",
          emoji: "🇨🇦 🇺🇸 🇲🇽",
          opts: ["Canada", "France"],
          icons: ["🇨🇦", "🇫🇷"],
          two: true,
        },
      ],
    },
    {
      k: "bk-features",
      t: "Features of each region",
      en: "Booklet · Exercise sheet B",
      ic: "🗺️",
      from: "Booklet · Lesson 1 exercise sheet · B",
      items: [
        {
          type: "multi",
          q: "Choose the geographic features of the [Northeast].",
          img: "r-northeast",
          opts: [
            { t: "Rolling hills", img: "lf-hill", ok: true },
            { t: "Rocky soil", emoji: "🪨🟫", ok: true },
            { t: "Appalachian Mountains", img: "appalachian", ok: true },
            { t: "Grand Canyon", img: "grand-canyon" },
          ],
        },
        {
          type: "multi",
          q: "Choose the geographic features of the [Southeast].",
          img: "r-southeast",
          opts: [
            { t: "Coastal plains (beaches)", img: "coastal-plain", ok: true },
            { t: "Appalachian Mountains", img: "appalachian", ok: true },
            { t: "Mississippi River", img: "river", ok: true },
            { t: "Death Valley", img: "death-valley" },
          ],
        },
        {
          type: "multi",
          q: "Choose the geographic features of the [Midwest].",
          img: "r-midwest",
          opts: [
            { t: "Fields of grass (plains)", img: "grassland", ok: true },
            {
              t: "Missouri, Mississippi and Ohio rivers",
              img: "river",
              ok: true,
            },
            { t: "Deserts", emoji: "🏜️" },
            { t: "Mount McKinley", img: "denali" },
          ],
        },
        {
          type: "multi",
          q: "Choose the geographic features of the [Southwest].",
          img: "r-southwest",
          opts: [
            { t: "Dry lands and deserts", emoji: "🏜️🌵", ok: true },
            { t: "Rocky canyons", img: "lf-canyon", ok: true },
            { t: "Grand Canyon", img: "grand-canyon", ok: true },
            { t: "Fields of grass", img: "grassland" },
          ],
        },
        {
          type: "multi",
          q: "Choose the geographic features of the [West].",
          img: "r-west",
          opts: [
            {
              t: "Mount McKinley (Denali): the highest point",
              img: "denali",
              ok: true,
            },
            {
              t: "Death Valley: the lowest point",
              img: "death-valley",
              ok: true,
            },
            { t: "The biggest region", img: "regions-5", ok: true },
            { t: "Rocky soil by the Atlantic Ocean", img: "atlantic" },
          ],
        },
      ],
    },
    {
      k: "bk-match",
      t: "Match",
      en: "Booklet · Exercise sheet C",
      ic: "🔗",
      from: "Booklet · Lesson 1 exercise sheet · C",
      items: [
        {
          type: "match",
          pairs: [
            {
              vis: {
                kind: "strip",
                items: [{ img: "types", label: "Landforms" }],
              },
              label: "The different shapes of Earth's surface.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "lf-plain", label: "Plains" }],
              },
              label: "Large or small areas covered with grass.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "lf-canyon", label: "Canyons" }],
              },
              label: "Deep, narrow valleys with steep, rocky sides.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "lf-hill", label: "Hills" }],
              },
              label: "Are shorter than mountains.",
            },
          ],
        },
        {
          type: "match",
          pairs: [
            {
              vis: {
                kind: "strip",
                items: [{ img: "lf-mountain", label: "Mountains" }],
              },
              label: "The highest landforms on Earth.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "lf-plateau", label: "Plateaus" }],
              },
              label: "Large, flat, raised areas of land.",
            },
            {
              vis: { kind: "strip", items: [{ e: "🏜️🌵", label: "A desert" }] },
              label: "A dry area that gets little water.",
            },
            {
              vis: {
                kind: "strip",
                items: [{ img: "regions-map", label: "Regions" }],
              },
              label: "Places that share similar characteristics.",
            },
          ],
        },
      ],
    },
    {
      k: "bk-draw",
      t: "Landforms of the USA",
      en: "Booklet · Activity (draw a picture)",
      ic: "🖍️",
      from: "Booklet · Lesson 1 activity",
      items: [
        {
          type: "mc",
          q: "Which picture shows [mountains]?",
          emoji: "⛰️",
          opts: ["Mountains", "Hills", "Plains"],
          pics: ["lf-mountain", "lf-hill", "lf-plain"],
        },
        {
          type: "mc",
          q: "Which picture shows [hills]?",
          emoji: "🟢",
          opts: ["Hills", "Canyon", "Plateau"],
          pics: ["lf-hill", "lf-canyon", "lf-plateau"],
        },
        {
          type: "mc",
          q: "Which picture shows [a canyon]?",
          emoji: "🏞️",
          opts: ["Canyon", "Mountains", "Plains"],
          pics: ["lf-canyon", "lf-mountain", "lf-plain"],
        },
        {
          type: "mc",
          q: "Which picture shows [plains]?",
          emoji: "🌾",
          opts: ["Plains", "Plateau", "Canyon"],
          pics: ["lf-plain", "lf-plateau", "lf-canyon"],
        },
        {
          type: "mc",
          q: "Which picture shows [a plateau]?",
          emoji: "🟫",
          opts: ["Plateau", "Hills", "Mountains"],
          pics: ["lf-plateau", "lf-hill", "lf-mountain"],
        },
        {
          type: "mc",
          q: "Which picture shows [a mountain range]?",
          emoji: "🏔️🏔️🏔️",
          opts: ["Mountain range", "Plains", "Hills"],
          pics: ["range", "lf-plain", "lf-hill"],
        },
      ],
    },
    {
      k: "hw1",
      t: "True or false?",
      en: "Graded Homework 1 · correct the mistakes",
      ic: "✅",
      from: "Graded Homework 1",
      items: [
        {
          type: "tf",
          q: "The United States is bordered (lined) by the countries of Italy and Mexico.",
          a: false,
          emoji: "🇨🇦 🇺🇸 🇲🇽",
          x: "Correct: The United States is bordered by [Canada] and Mexico.",
        },
        {
          type: "tf",
          q: "A canyon is a deep, narrow valley with steep, rocky sides.",
          a: true,
          img: "lf-canyon",
        },
        {
          type: "tf",
          q: "One of the Southwest's most famous landmarks is the Mount McKinley.",
          a: false,
          img: "grand-canyon",
          x: "Correct: One of the Southwest's most famous landmarks is the [Grand Canyon].",
        },
        {
          type: "tf",
          q: "A region is an area in which places share similar characteristics.",
          a: true,
          img: "regions-map",
        },
        {
          type: "tf",
          q: "The West shares the Appalachian Mountains with the Northeast.",
          a: false,
          img: "appalachian",
          x: "Correct: The [Southeast] shares the Appalachian Mountains with the Northeast.",
        },
      ],
    },
  ],
};
