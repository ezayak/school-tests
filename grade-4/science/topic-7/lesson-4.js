// Science · Grade 4 · Topic 7 · Lesson 4 « External Structures and Functions of Animals » (book pages 308–315).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 4,
  key: "sci4-t7-l4",
  grade: 4,
  title: "External Structures and Functions of Animals",
  unit: "Topic 7 · Lesson 4",
  book: "Book pages 308–315",
  cover: "crab",
  question: {
    q: "How do the [outside] parts of animals help them [survive]?",
    a: "[Shells], [skin], [fur], [feathers], [scales] and [claws] protect animals, keep them warm and help them get food.",
    img: "crab",
  },
  // the book's vocabulary + academic vocabulary (page 308)
  words: [
    {
      w: "Exoskeleton",
      m: "a hard covering outside the body, like a shell",
    },
    { w: "Shell", m: "a large exoskeleton" },
    { w: "Skin", m: "covers and protects the body" },
    { w: "Fur", m: "thick hair that keeps an animal warm" },
    { w: "Feathers", m: "cover birds; most birds fly with them" },
    { w: "Scales", m: "small hard plates on fish and reptiles" },
    { w: "Claws", m: "sharp points on feet to catch and hold food" },
    { w: "Characteristic", m: "a quality, like color, size or shape" },
  ],

  ideas: [
    {
      t: "A useful tail",
      lines: [
        "A horse's long tail hair [swats away] biting flies.",
        "People use horse hair to make [violin] bows.",
      ],
      img: "horse",
    },
    {
      t: "Exoskeletons",
      lines: [
        "Some animals have a hard covering [outside]: an [exoskeleton].",
        "It is [waterproof] and protects the soft body.",
        "A big exoskeleton is called a [shell].",
      ],
      img: "crab",
    },
    {
      t: "The snail",
      lines: [
        "The snail's shell protects it from the [sun].",
        "It keeps the snail from [drying out].",
        "Its color helps it [hide].",
      ],
      img: "snail",
    },
    {
      t: "The ladybug",
      lines: [
        "Its hard exoskeleton protects its [wings].",
        "Under it are soft wings for [flying].",
      ],
      img: "ladybug",
    },
    {
      t: "Skin",
      lines: [
        "[Skin] protects the body.",
        "A rhinoceros has [thick], rough skin against the hot sun and insects.",
        "A naked mole rat has [thin], soft skin: it lives in cool, dark soil.",
      ],
      img: "rhino",
    },
    {
      t: "Fur",
      lines: ["A bear's thick [fur] keeps it [warm] in cold weather."],
      img: "bear",
    },
    {
      t: "Feathers",
      lines: [
        "[Feathers] protect birds from hot and cold.",
        "Most birds [fly] with them: to escape, find food and travel.",
      ],
      img: "parrot",
    },
    {
      t: "Scales",
      lines: [
        "Fish and reptiles have [scales].",
        "Scales are a rough covering that [protects] the body.",
      ],
      img: "iguana",
    },
    {
      t: "Claws",
      lines: [
        "[Claws] are sharp points on the feet.",
        "They help catch, carry and tear food.",
        "A lobster has a [crusher] claw and a [pincher] claw.",
      ],
      img: "lobster",
    },
    {
      t: "Characteristics",
      lines: [
        "A [characteristic] is a quality: color, size, shape.",
        "A male tree frog blows up the skin of its throat to croak [loudly].",
        "The loudest frog is often the [healthiest].",
      ],
      img: "frog",
    },
    {
      t: "Shedding the exoskeleton",
      lines: [
        "An exoskeleton does [not grow] with the animal.",
        "So the animal [sheds] it, like clothes you grew out of.",
        "A [new] exoskeleton forms.",
      ],
      img: "mantis",
    },
  ],

  games: [
    {
      k: "cover",
      t: "What covers it?",
      en: "Shell, skin, fur, feathers, scales",
      ic: "🐢",
      items: [
        ["A bear", "Fur", "Feathers", "Shell", "bear"],
        ["A parrot", "Feathers", "Fur", "Scales", "parrot"],
        ["An iguana", "Scales", "Feathers", "Fur", "iguana"],
        ["A crab", "Shell (exoskeleton)", "Fur", "Feathers", "crab"],
        ["A rhinoceros", "Thick skin", "Feathers", "Shell", "rhino"],
        ["A snail", "Shell (exoskeleton)", "Fur", "Scales", "snail"],
      ].map(([t, a, b, c, img]) => ({
        type: "mc",
        q: `[${t}]: what covers its body?`,
        opts: [a, b, c],
        img,
      })),
    },
    {
      k: "job",
      t: "What is it for?",
      en: "Outside parts and their jobs",
      ic: "🛡️",
      items: [
        ["Thick fur", "To keep warm", "To fly", "bear"],
        ["Feathers", "To fly", "To dig", "parrot"],
        ["Sharp claws", "To catch food", "To keep warm", "claws"],
        ["A hard shell", "To protect the soft body", "To fly", "snail"],
        ["A horse's tail", "To swat away flies", "To swim", "horse"],
        [
          "Thick skin",
          "To protect from sun and insects",
          "To breathe water",
          "rhino",
        ],
      ].map(([t, a, b, img]) => ({
        type: "mc",
        q: `[${t}]: what is it for?`,
        opts: [a, b],
        img,
      })),
    },
    {
      k: "exo",
      t: "Exoskeleton or not?",
      en: "Hard covering outside?",
      ic: "🦀",
      items: [
        ["A crab", true, "crab"],
        ["A ladybug", true, "ladybug"],
        ["A snail", true, "snail"],
        ["A bear", false, "bear"],
        ["A parrot", false, "parrot"],
        ["A praying mantis", true, "mantis"],
      ].map(([t, yes, img]) => ({
        type: "mc",
        q: `[${t}]: does it have an exoskeleton?`,
        opts: yes ? ["Yes", "No"] : ["No", "Yes"],
        icons: yes ? ["🦀", "🦴"] : ["🦴", "🦀"],
        two: true,
        img,
      })),
    },
    {
      k: "match",
      t: "Pictures and words",
      en: "Match",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "bear", label: "Fur" },
            { img: "parrot", label: "Feathers" },
            { img: "iguana", label: "Scales" },
            { img: "claws", label: "Claws" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 4 Check and more",
      ic: "📕",
      from: "Book · Lesson 4",
      items: [
        {
          type: "open",
          q: "Name two outside parts of the frog. How do they help it survive?",
          a: "Its [skin] protects it. The skin of its [throat] blows up to croak loudly and find a mate. Its [feet] hold on to leaves.",
          img: "frog",
        },
        {
          type: "open",
          q: "How is an exoskeleton like the skeleton of vertebrates?",
          a: "Both [support] the body and [protect] it.",
          img: "crab",
        },
        {
          type: "open",
          q: "How are the skin of a mole rat and the scales of a fish alike? How are they different?",
          a: "Both [cover and protect] the body. Skin is [soft]; scales are [hard] and rough.",
          img: "mole-rat",
        },
        {
          type: "open",
          q: "Fur keeps animals warm. What do people use to keep warm?",
          a: "A [coat], a [blanket], gloves, a hat.",
          img: "bear",
        },
        {
          type: "open",
          q: "Why does the praying mantis need to shed its exoskeleton?",
          a: "The exoskeleton does [not grow]. The mantis grows, so it needs a [bigger] one.",
          img: "mantis",
        },
        {
          type: "open",
          q: "Think of an invention like a lobster claw. How would it help people?",
          a: "A [grabber] to pick up things, or a [nutcracker] like the crusher claw.",
          img: "lobster",
        },
        {
          type: "open",
          q: "Why do people use horse hair for violin bows?",
          a: "It is [long] and [strong].",
          img: "violin",
        },
      ],
    },
  ],
};
