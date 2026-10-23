// Science · Grade 4 · Topic 8 · Lesson 1 « Circulatory and Respiratory Systems » (book pages 340–349).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t8-l1",
  grade: 4,
  title: "Circulatory and Respiratory Systems",
  unit: "Topic 8 · Lesson 1",
  book: "Book pages 340–349",
  cover: "heart",
  question: {
    q: "How do your [heart] and [lungs] work together?",
    a: "The [lungs] take [oxygen] from the air. The [heart] pumps blood that carries the oxygen to [every cell] of the body.",
    img: "body-blood",
  },
  // the book's vocabulary + academic vocabulary (page 340) + words of the lesson
  words: [
    { w: "Cell", m: "the smallest living part of the body" },
    { w: "Tissue", m: "a group of the same cells that do one job" },
    { w: "Organ", m: "a body part with a special job, like the heart" },
    {
      w: "Organ system",
      m: "organs that work together to do a job",
    },
    { w: "Lungs", m: "take oxygen from the air you breathe" },
    { w: "Diaphragm", m: "a muscle under the lungs that helps you breathe" },
    { w: "Heart", m: "pumps blood around the body" },
    { w: "Artery", m: "carries blood away from the heart" },
    { w: "Vein", m: "carries blood back to the heart" },
    { w: "Function", m: "a job" },
  ],

  ideas: [
    {
      t: "Breathing",
      lines: [
        "Air goes in and out through your [nose] or [mouth].",
        "Your rib cage goes up and down.",
        "Singers learn to control their breathing.",
      ],
      img: "singers",
    },
    {
      t: "Cells, tissues, organs",
      lines: [
        "[Cells] of the same kind make a [tissue].",
        "Tissues make an [organ], like the heart.",
        "Organs work together in an [organ system].",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "cell", label: "Cell" },
          { img: "tissue", label: "Tissue" },
          { img: "organ", label: "Organ" },
          { img: "body-blood", label: "Organ system" },
        ],
      },
    },
    {
      t: "The respiratory system",
      lines: [
        "Your cells need [oxygen]. Oxygen is in the air.",
        "Air goes down the [trachea] (windpipe) into the [lungs].",
        "In tiny sacs, oxygen goes into the [blood].",
      ],
      img: "lungs",
    },
    {
      t: "The diaphragm",
      lines: [
        "The lungs cannot move by themselves.",
        "The [diaphragm] is a muscle under the lungs.",
        "It makes air flow [in] and [out].",
      ],
      img: "lungs",
    },
    {
      t: "The heart",
      lines: [
        "The [heart] is a muscle. It [pumps] blood.",
        "Put two fingers on your neck: you feel your [pulse].",
        "The pulse is how many times your heart beats in a minute.",
      ],
      img: "heart",
    },
    {
      t: "Inside the heart",
      lines: [
        "The heart fills up with blood, then [squeezes] it out.",
        "Blood goes to the [lungs] and comes back from the lungs.",
      ],
      img: "heart-diagram",
    },
    {
      t: "The circulatory system",
      lines: [
        "Heart + blood + [blood vessels] (tubes).",
        "[Arteries] carry blood [away] from the heart.",
        "[Veins] carry blood [back] to the heart.",
      ],
      img: "body-blood",
    },
    {
      t: "Capillaries",
      lines: [
        "[Capillaries] are tiny blood vessels.",
        "They bring [oxygen] and food to every cell.",
        "They take [wastes] away. Then veins carry the blood back.",
      ],
      img: "capillaries",
    },
  ],

  games: [
    {
      k: "job",
      t: "Which part does it?",
      en: "Heart, lungs, arteries, veins",
      ic: "🫀",
      items: [
        ["Pumps blood around the body", "Heart", "Lungs", "Diaphragm", "heart"],
        ["Takes oxygen from the air", "Lungs", "Heart", "Veins", "lungs"],
        [
          "Carries blood away from the heart",
          "Arteries",
          "Veins",
          "Lungs",
          "body-blood",
        ],
        [
          "Carries blood back to the heart",
          "Veins",
          "Arteries",
          "Heart",
          "body-blood",
        ],
        [
          "A muscle that helps you breathe",
          "Diaphragm",
          "Heart",
          "Capillaries",
          "lungs",
        ],
        [
          "Tiny tubes that reach every cell",
          "Capillaries",
          "Lungs",
          "Diaphragm",
          "capillaries",
        ],
      ].map(([q, a, b, c, img]) => ({
        type: "mc",
        q: `${q}: which part?`,
        opts: [a, b, c],
        img,
      })),
    },
    {
      k: "levels",
      t: "Cell, tissue, organ, system",
      en: "From small to big",
      ic: "🔬",
      items: [
        {
          type: "order",
          t: "From [small] to [big]",
          ask: "Put them in order, from the smallest to the biggest.",
          hint: "The cell is the smallest.",
          steps: [
            { say: "Cell", img: "cell" },
            { say: "Tissue", img: "tissue" },
            { say: "Organ", img: "organ" },
            { say: "Organ system", img: "body-blood" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "cell", label: "Cell" },
            { img: "tissue", label: "Tissue" },
            { img: "organ", label: "Organ" },
          ],
        },
      ],
    },
    {
      k: "path",
      t: "Follow the air and the blood",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "The path of [air]",
          ask: "Put the path of the air in order.",
          hint: "The air comes in through the nose.",
          steps: [
            { say: "Nose or mouth", e: "👃" },
            { say: "Trachea (windpipe)", e: "🫁" },
            { say: "Lungs", img: "lungs" },
            { say: "Oxygen goes into the blood", e: "🩸" },
          ],
        },
        {
          type: "order",
          t: "How [oxygen] gets to your cells",
          ask: "Put the steps in order: how oxygen gets to your cells.",
          hint: "Start with the lungs.",
          steps: [
            { say: "The lungs put oxygen into the blood", img: "lungs" },
            { say: "The heart pumps the blood", img: "heart" },
            { say: "Arteries carry it away from the heart", e: "➡️" },
            { say: "Capillaries give oxygen to the cells", img: "capillaries" },
          ],
        },
        {
          type: "mc",
          q: "You do jumping jacks. Your pulse goes ___",
          opts: ["up (faster)", "down (slower)"],
          two: true,
          emoji: "🤸 ❤️",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 1 Check and more",
      ic: "📕",
      from: "Book · Lesson 1",
      items: [
        {
          type: "open",
          q: "What is the job of the lungs?",
          a: "They take [oxygen] from the air into the blood and get rid of gas [wastes].",
          img: "lungs",
        },
        {
          type: "open",
          q: "How do the circulatory and respiratory systems work together?",
          a: "The [lungs] put oxygen into the blood. The [heart] pumps the blood with oxygen to all the cells.",
          img: "body-blood",
        },
        {
          type: "open",
          q: "How are cells, tissues, organs and organ systems related?",
          a: "Cells make [tissues]. Tissues make [organs]. Organs work together in [organ systems].",
          img: "organ",
        },
        {
          type: "open",
          q: "Name two facts about the heart.",
          a: "It is a [muscle]. It [pumps] blood to all parts of the body.",
          img: "heart",
        },
        {
          type: "open",
          q: "How does blood flow through the body?",
          a: "The heart pumps it into [arteries], then [capillaries] reach the cells, then [veins] bring it back to the heart.",
          img: "capillaries",
        },
        {
          type: "open",
          q: "When do you take deeper breaths? Why?",
          a: "When I [run] or [exercise]. My body needs [more oxygen].",
          emoji: "🏃 💨",
        },
        {
          type: "open",
          q: "What happens to your pulse when you exercise?",
          a: "It goes [up]: your heart beats [faster].",
          emoji: "🤸 ❤️",
        },
      ],
    },
  ],
};
