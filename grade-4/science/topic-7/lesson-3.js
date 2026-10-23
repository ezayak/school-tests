// Science · Grade 4 · Topic 7 · Lesson 3 « Internal Structures and Functions of Animals » (book pages 300–307).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 3,
  key: "sci4-t7-l3",
  grade: 4,
  title: "Internal Structures and Functions of Animals",
  unit: "Topic 7 · Lesson 3",
  book: "Book pages 300–307",
  cover: "hearts",
  question: {
    q: "What parts are [inside] an animal? What do they [do]?",
    a: "The [skeleton] holds the body up, the [heart] pumps blood, [lungs] or [gills] take in oxygen, and the [brain] tells the body what to do.",
    img: "skeleton",
  },
  // the book's vocabulary + academic vocabulary (page 300)
  words: [
    { w: "Skeleton", m: "the bones that hold the body up" },
    { w: "Vertebrate", m: "an animal with a backbone" },
    { w: "Heart", m: "pumps blood around the body" },
    { w: "Lungs", m: "take in oxygen from the air" },
    { w: "Gills", m: "take in oxygen from the water" },
    { w: "Brain", m: "gets information and tells the body what to do" },
    { w: "Interpret", m: "to figure out what something means" },
  ],

  ideas: [
    {
      t: "The skeleton",
      lines: [
        "The [skeleton]: hard bones that hold the body up.",
        "Without it, an animal could not keep its [shape] or [move].",
      ],
      img: "skeleton",
    },
    {
      t: "Same parts, different animals",
      lines: [
        "A dog has a [skull], [backbone], [ribs] and [legs], like you.",
        "Animals with a backbone are [vertebrates].",
        "Mammals, fish, frogs, snakes and birds are vertebrates.",
      ],
      img: "dog-skeleton",
    },
    {
      t: "The heart",
      lines: [
        "The [heart] pumps [blood] around the body.",
        "Blood carries what the body needs.",
        "The [ribs] protect the heart.",
      ],
      img: "hearts",
    },
    {
      t: "Fish heart and mammal heart",
      lines: [
        "A [fish] heart pumps blood in [one] circle.",
        "A [mammal] heart pumps blood in [two] circles: to the lungs, and to the body.",
      ],
      img: "hearts",
    },
    {
      t: "Lungs",
      lines: [
        "Animals need [oxygen]. They give out [carbon dioxide].",
        "[Lungs] take oxygen from the [air].",
        "A dolphin breathes air through its [blowhole].",
      ],
      img: "lungs",
    },
    {
      t: "Gills",
      lines: [
        "[Gills]: fish take oxygen from the [water].",
        "Water goes in the mouth and flows over the gills.",
      ],
      img: "gills",
    },
    {
      t: "The brain",
      lines: [
        "The [brain] gets information and tells the body what to do.",
        "[Cerebrum]: thinking. [Cerebellum]: moving.",
        "[Brain stem]: controls the inside parts. The [skull] protects the brain.",
      ],
      img: "brain",
    },
    {
      t: "The swim bladder",
      lines: [
        "Some fish have a [swim bladder], like a balloon inside.",
        "More air = the fish goes [up]. Less air = the fish goes [down].",
      ],
      img: "swim-bladder",
    },
  ],

  games: [
    {
      k: "job",
      t: "Which part does it?",
      en: "Inside parts and their jobs",
      ic: "🫀",
      items: [
        ["Pumps blood around the body", "Heart", "Lungs", "Brain", "hearts"],
        ["Holds the body up", "Skeleton", "Heart", "Gills", "skeleton"],
        ["Takes oxygen from the air", "Lungs", "Gills", "Heart", "lungs"],
        ["Takes oxygen from the water", "Gills", "Lungs", "Brain", "gills"],
        ["Tells the body what to do", "Brain", "Heart", "Skeleton", "brain"],
        [
          "Helps a fish float up and down",
          "Swim bladder",
          "Gills",
          "Heart",
          "swim-bladder",
        ],
      ].map(([q, a, b, c, img]) => ({
        type: "mc",
        q: `${q}: which part?`,
        opts: [a, b, c],
        img,
      })),
    },
    {
      k: "breathe",
      t: "Lungs or gills?",
      en: "How do they breathe?",
      ic: "🫁",
      items: [
        ["A fish", false, "🐟"],
        ["A dolphin", true, "🐬"],
        ["A dog", true, "🐕"],
        ["A shark", false, "🦈"],
        ["A bird", true, "🐦"],
        ["You", true, "🧒"],
      ].map(([t, lungs, e]) => ({
        type: "mc",
        q: `[${t}]: lungs or gills?`,
        opts: lungs ? ["Lungs", "Gills"] : ["Gills", "Lungs"],
        pics: lungs ? ["lungs", "gills"] : ["gills", "lungs"],
        emoji: e,
      })),
    },
    {
      k: "brain",
      t: "The brain",
      en: "Cerebrum, cerebellum, brain stem",
      ic: "🧠",
      items: [
        ["Thinking", "Cerebrum"],
        ["Moving and balance", "Cerebellum"],
        ["Controls the inside parts", "Brain stem"],
      ].map(([q, right]) => ({
        type: "mc",
        q: `[${q}]: which part of the brain?`,
        opts: [
          right,
          ...["Cerebrum", "Cerebellum", "Brain stem"].filter(
            (x) => x !== right,
          ),
        ],
        img: "brain",
      })),
    },
    {
      k: "bones",
      t: "Bones and protection",
      en: "What protects what?",
      ic: "🦴",
      items: [
        {
          type: "mc",
          q: "What protects the [brain]?",
          opts: ["The skull", "The ribs", "The legs"],
          img: "dog-skeleton",
        },
        {
          type: "mc",
          q: "What protects the [heart]?",
          opts: ["The ribs", "The skull", "The legs"],
          img: "dog-skeleton",
        },
        {
          type: "mc",
          q: "An animal with a backbone is a ___",
          opts: ["vertebrate", "plant", "rock"],
          img: "skeleton",
        },
        {
          type: "match",
          pairs: [
            { img: "skeleton", label: "Skeleton" },
            { img: "hearts", label: "Heart" },
            { img: "gills", label: "Gills" },
            { img: "brain", label: "Brain" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 3 Check and more",
      ic: "📕",
      from: "Book · Lesson 3",
      items: [
        {
          type: "open",
          q: "What is the job of the skeleton?",
          a: "It [holds the body up], gives it [shape], helps it [move] and [protects] the inside parts.",
          img: "skeleton",
        },
        {
          type: "open",
          q: "How are lungs and gills made for different places?",
          a: "[Lungs] take oxygen from the [air]. [Gills] take oxygen from the [water].",
          img: "gills",
        },
        {
          type: "open",
          q: "How is a fish heart different from a mammal heart?",
          a: "A fish heart pumps blood in [one] circle. A mammal heart pumps it in [two] circles.",
          img: "hearts",
        },
        {
          type: "open",
          q: "Why do dolphins and fish have different parts to get oxygen?",
          a: "A dolphin is a [mammal] and breathes [air]. A fish gets oxygen from the [water].",
          img: "lungs",
        },
        {
          type: "open",
          q: "Which human inventions are like a fish's swim bladder?",
          a: "A [life jacket], a [submarine], a balloon.",
          img: "swim-bladder",
        },
        {
          type: "open",
          q: 'Why do people call serious thinkers "cerebral"?',
          a: "The [cerebrum] is the [thinking] part of the brain.",
          img: "brain",
        },
      ],
    },
  ],
};
