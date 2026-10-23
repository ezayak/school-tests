// Science · Grade 4 · Topic 8 · Lesson 2 « Skeleton, Muscles, and Skin » (book pages 350–357).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  key: "sci4-t8-l2",
  grade: 4,
  title: "Skeleton, Muscles, and Skin",
  unit: "Topic 8 · Lesson 2",
  book: "Book pages 350–357",
  cover: "skater-bones",
  question: {
    q: "How do your [bones], [muscles] and [skin] help you?",
    a: "[Bones] hold you up and protect your organs. [Muscles] pull the bones so you can move. [Skin] covers and protects your body.",
    img: "skeleton",
  },
  // the book's vocabulary + academic vocabulary (page 350) + words of the lesson
  words: [
    { w: "Skeletal system", m: "the 206 bones of your body" },
    { w: "Cartilage", m: "bendable material, like in your nose and ears" },
    { w: "Calcium", m: "a mineral that makes bones strong" },
    { w: "Muscle", m: "contracts and relaxes to move bones" },
    { w: "Tendon", m: "a tough cord that joins a muscle to a bone" },
    { w: "Contract", m: "to get shorter" },
    { w: "Extend", m: "to stretch out, to straighten" },
    { w: "Skin", m: "your biggest organ; it covers and protects you" },
  ],

  ideas: [
    {
      t: "Protect your body",
      lines: [
        "Helmets, knee pads and elbow pads protect you.",
        "A [helmet] protects your [skull]. The skull protects your brain.",
      ],
      img: "skaters",
    },
    {
      t: "The skeletal system",
      lines: [
        "Your body has [206 bones].",
        "Bones [support] your body and give it [shape].",
        "Bones [protect] your organs: the skull, the ribs.",
      ],
      img: "skeleton",
    },
    {
      t: "Bones are alive",
      lines: [
        "Bones are living tissue with [minerals].",
        "[Calcium] makes bones strong.",
        "[Cartilage] can bend: feel your nose and ears.",
      ],
      img: "skeleton",
    },
    {
      t: "Three kinds of muscle",
      lines: [
        "[Smooth] muscle: in organs like the stomach.",
        "[Cardiac] muscle: in the heart.",
        "[Skeletal] muscle: moves your bones.",
      ],
      vis: { kind: "emoji", e: "🍽️ ❤️ 💪" },
    },
    {
      t: "Muscles work in pairs",
      lines: [
        "Muscles can only [pull], not push.",
        "Bend your arm: the top muscle [contracts] (gets shorter).",
        "Straighten your arm: the muscle underneath pulls. [Tendons] join muscles to bones.",
      ],
      img: "arm-muscle",
    },
    {
      t: "Systems work together",
      lines: [
        "Muscles move the skater across the ice.",
        "The [heart] pumps faster. The [lungs] work harder.",
      ],
      img: "skater-systems",
    },
    {
      t: "Bones support the jump",
      lines: [
        "The [bones] hold up the body when the skater jumps and lands.",
        "At the end, the skater [sweats] to cool down.",
      ],
      img: "skater-bones",
    },
    {
      t: "Skin",
      lines: [
        "[Skin] is your biggest organ. It covers and protects you.",
        "It keeps out [germs]. [Sweat] cools your body.",
        "Two layers: the thin [epidermis] on top, the thick [dermis] below.",
      ],
      img: "skin",
    },
  ],

  games: [
    {
      k: "which",
      t: "Bones, muscles or skin?",
      en: "Which one does it?",
      ic: "🦴",
      items: [
        ["Holds your body up and gives it shape", 0],
        ["Pulls the bones so you can move", 1],
        ["Covers your body and keeps out germs", 2],
        ["Protects your brain and your heart", 0],
        ["Sweats to cool you down", 2],
        ["Contracts and relaxes", 1],
      ].map(([q, k]) => {
        const all = [
          ["Bones", "skeleton"],
          ["Muscles", "arm-muscle"],
          ["Skin", "skin"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "muscle",
      t: "Which muscle?",
      en: "Smooth, cardiac, skeletal",
      ic: "💪",
      items: [
        ["The heart", "Cardiac muscle", "❤️"],
        ["The stomach", "Smooth muscle", "🍽️"],
        ["The arm and the leg", "Skeletal muscle", "💪"],
      ].map(([t, a, e]) => ({
        type: "mc",
        q: `[${t}]: which kind of muscle?`,
        opts: [
          a,
          ...["Cardiac muscle", "Smooth muscle", "Skeletal muscle"].filter(
            (x) => x !== a,
          ),
        ],
        emoji: e,
      })),
    },
    {
      k: "facts",
      t: "Body facts",
      en: "True or false",
      ic: "✅",
      items: [
        { type: "tf", q: "Your body has 206 bones.", a: true, img: "skeleton" },
        {
          type: "tf",
          q: "Muscles can push bones.",
          a: false,
          img: "arm-muscle",
          x: "Muscles can only [pull]. They work in pairs.",
        },
        {
          type: "tf",
          q: "Calcium makes bones strong.",
          a: true,
          emoji: "🥛 🦴",
        },
        {
          type: "tf",
          q: "Your nose and ears have cartilage, so they can bend.",
          a: true,
          emoji: "👃 👂",
        },
        {
          type: "tf",
          q: "The skin is the smallest organ.",
          a: false,
          img: "skin",
          x: "It is your [largest] organ.",
        },
        {
          type: "match",
          pairs: [
            { img: "skeleton", label: "Skeleton" },
            { img: "arm-muscle", label: "Muscle and tendon" },
            { img: "skin", label: "Skin" },
            { img: "skaters", label: "Protective gear" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 2 Check and more",
      ic: "📕",
      from: "Book · Lesson 2",
      items: [
        {
          type: "open",
          q: "Where are the three kinds of muscles found?",
          a: "[Smooth] muscle in organs like the stomach, [cardiac] muscle in the heart, [skeletal] muscle on the bones.",
          emoji: "🍽️ ❤️ 💪",
        },
        {
          type: "open",
          q: "How do muscles and bones work together to move the body?",
          a: "Muscles are joined to bones by [tendons]. They [pull] the bones. They work in [pairs].",
          img: "arm-muscle",
        },
        {
          type: "open",
          q: "Which bones protect your organs? Which help you stand up?",
          a: "The [skull] and [ribs] protect organs. The [backbone] and [leg] bones help you stand.",
          img: "skeleton",
        },
        {
          type: "open",
          q: "How do the body systems help the skater move on ice?",
          a: "[Muscles] move the body, [bones] support it, the [heart] and [lungs] bring oxygen, and the [skin] sweats to cool down.",
          img: "skater-systems",
        },
        {
          type: "open",
          q: "Why is taking care of your skin important? How do you do it?",
          a: "Skin keeps out [germs]. I [wash] it, use sunscreen, and cover cuts.",
          img: "skin",
        },
        {
          type: "open",
          q: "For which sports should people wear protective gear?",
          a: "[Biking], [skating], skateboarding, football, hockey.",
          img: "skaters",
        },
        {
          type: "open",
          q: "A leg is in a cast for weeks and the muscles are not used. What might happen to them?",
          a: "They get [weaker] and [smaller].",
          emoji: "🦵 🩹",
        },
      ],
    },
  ],
};
