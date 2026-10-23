// Science · Grade 4 · Topic 8 · Lesson 4 « Digestive, Reproductive, and Other Systems » (book pages 366–374).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 4,
  key: "sci4-t8-l4",
  grade: 4,
  title: "Digestive, Reproductive, and Other Systems",
  unit: "Topic 8 · Lesson 4",
  book: "Book pages 366–374",
  cover: "digestive",
  question: {
    q: "How does your body use [food], remove [wastes] and fight [germs]?",
    a: "The [digestive] system breaks food into nutrients. The [excretory] system removes wastes. The [immune] system fights germs.",
    img: "digestive",
  },
  // the book's vocabulary + academic vocabulary (page 366) + words of the lesson
  words: [
    { w: "Stomach", m: "a bag of muscle that churns food" },
    { w: "Small intestine", m: "a long tube where most food is digested" },
    { w: "Large intestine", m: "takes water out of the waste" },
    { w: "Liver", m: "helps break down fats" },
    { w: "Pancreas", m: "makes a chemical that controls sugar in the body" },
    { w: "Kidneys", m: "two bean-shaped organs that clean the blood" },
    { w: "Bladder", m: "a sac that stores urine" },
    { w: "Excretory system", m: "removes wastes from the body" },
    { w: "Immune system", m: "protects the body from germs" },
    { w: "Connect", m: "to join together" },
  ],

  ideas: [
    {
      t: "Helpful bacteria",
      lines: [
        "Some [bacteria] in your body help you [digest] food.",
        "People in [Japan] have bacteria that help digest seaweed.",
      ],
      img: "japan-map",
    },
    {
      t: "The digestive system",
      lines: [
        "It breaks [food] into [nutrients] the body can use.",
        "It starts in the [mouth]: teeth crush food, saliva softens it.",
        "Food goes down the [esophagus] to the [stomach].",
      ],
      img: "digestive",
    },
    {
      t: "Stomach, liver and pancreas",
      lines: [
        "The [stomach] walls churn the food.",
        "The [liver] breaks down fats.",
        "The [pancreas] makes a chemical that controls [sugar].",
      ],
      img: "digestive",
    },
    {
      t: "The small intestine",
      lines: [
        "Most digestion happens in the [small intestine].",
        "Tiny fingers called [villi] take in the food.",
        "Capillaries carry the nutrients to [all parts] of the body.",
      ],
      img: "villi",
    },
    {
      t: "The large intestine",
      lines: [
        "The [large intestine] takes [water] out of the waste.",
        "The waste leaves the body.",
      ],
      img: "digestive",
    },
    {
      t: "The excretory system",
      lines: [
        "Cells make [wastes]. The [excretory system] removes them.",
        "The two [kidneys] clean the blood and make [urine].",
        "Urine goes down tubes to the [bladder], where it is stored.",
      ],
      img: "kidneys",
    },
    {
      t: "The reproductive system",
      lines: [
        "Babies grow up. In [adolescence] the body can make offspring.",
        "A [sperm] cell joins an [egg] cell.",
        "The cell divides and grows into a [baby].",
      ],
      img: "baby",
    },
    {
      t: "Germs",
      lines: [
        "Most [bacteria] are harmless. Some cause illness.",
        "[Viruses] cause colds and the flu.",
      ],
      img: "virus",
    },
    {
      t: "The immune system",
      lines: [
        "It protects you from [germs].",
        "Hairs and mucus in the nose trap germs. [Saliva] kills germs.",
        "[Fever], stomach juices and [skin] fight germs too.",
      ],
      img: "bacteria",
    },
    {
      t: "White blood cells",
      lines: [
        "[White blood cells] fight germs in the blood.",
        "They surround and [eat] the germs.",
      ],
      img: "white-cell",
    },
  ],

  games: [
    {
      k: "job",
      t: "Which organ does it?",
      en: "Digestive and excretory organs",
      ic: "🍽️",
      items: [
        ["Churns the food", "Stomach", "Kidneys", "Bladder", "digestive"],
        [
          "Most food is digested here",
          "Small intestine",
          "Bladder",
          "Liver",
          "villi",
        ],
        [
          "Takes water out of the waste",
          "Large intestine",
          "Stomach",
          "Pancreas",
          "digestive",
        ],
        ["Breaks down fats", "Liver", "Bladder", "Kidneys", "digestive"],
        [
          "Cleans the blood and makes urine",
          "Kidneys",
          "Stomach",
          "Liver",
          "kidneys",
        ],
        ["Stores urine", "Bladder", "Liver", "Small intestine", "kidneys"],
      ].map(([q, a, b, c, img]) => ({
        type: "mc",
        q: `${q}: which organ?`,
        opts: [a, b, c],
        img,
      })),
    },
    {
      k: "food",
      t: "The path of food",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "The path of [food]",
          ask: "Put the path of food in order.",
          hint: "It starts in the mouth.",
          steps: [
            { say: "Mouth: teeth crush the food", e: "😋" },
            { say: "Esophagus", e: "⬇️" },
            { say: "Stomach churns the food", img: "digestive" },
            {
              say: "Small intestine: nutrients go into the blood",
              img: "villi",
            },
            { say: "Large intestine takes out water", e: "💧" },
          ],
        },
      ],
    },
    {
      k: "germs",
      t: "Fighting germs",
      en: "The immune system",
      ic: "🛡️",
      items: [
        {
          type: "multi",
          q: "How does your body fight germs? (choose all)",
          opts: [
            { t: "Hairs and mucus in the nose", emoji: "👃", ok: true },
            { t: "Saliva", emoji: "👅", ok: true },
            { t: "Fever", emoji: "🌡️", ok: true },
            { t: "White blood cells", img: "white-cell", ok: true },
            { t: "Eating candy", emoji: "🍬" },
          ],
        },
        {
          type: "mc",
          q: "What causes colds and the flu?",
          opts: ["Viruses", "Vitamins", "Water"],
          icons: ["🦠", "💊", "💧"],
          img: "virus",
        },
        {
          type: "tf",
          q: "All bacteria make you sick.",
          a: false,
          img: "bacteria",
          x: "Most bacteria are [harmless]. Some help you digest food.",
        },
        {
          type: "mc",
          q: "What do white blood cells do?",
          opts: ["Eat germs", "Carry food", "Make urine"],
          img: "white-cell",
        },
        {
          type: "match",
          pairs: [
            { img: "digestive", label: "Digestive system" },
            { img: "kidneys", label: "Excretory system" },
            { img: "white-cell", label: "Immune system" },
            { img: "baby", label: "Reproductive system" },
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
          q: "How does a white blood cell help the body survive?",
          a: "It [surrounds and eats] harmful [germs].",
          img: "white-cell",
        },
        {
          type: "open",
          q: "How does the circulatory system work with the digestive system?",
          a: "The digestive system breaks food into nutrients. The [blood] carries the nutrients to [all parts] of the body.",
          img: "villi",
        },
        {
          type: "open",
          q: "What must happen for a baby to start growing?",
          a: "A [sperm] cell must join an [egg] cell.",
          img: "baby",
        },
        {
          type: "open",
          q: "Why is it important for the villi to put digested food into the blood?",
          a: "So the blood can carry the [nutrients] to every [cell].",
          img: "villi",
        },
        {
          type: "open",
          q: "Name two ways the immune system protects the body.",
          a: "[Mucus] and hairs in the nose trap germs. [White blood cells] eat germs. Also saliva, fever and skin.",
          img: "bacteria",
        },
        {
          type: "open",
          q: "How are your front teeth and back teeth different?",
          a: "Front teeth are [sharp] to bite and tear. Back teeth are [flat] to crush and grind.",
          emoji: "🦷 😁",
        },
        {
          type: "open",
          q: "Why are these seaweed bacteria found only in people from Japan?",
          a: "People in Japan [eat a lot of seaweed]. The bacteria came with the seaweed over many years.",
          img: "japan-map",
        },
      ],
    },
  ],
};
