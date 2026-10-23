// Science · Grade 4 · Topic 8 · Lesson 3 « Nervous System » (book pages 358–365).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
const SENSES = [
  ["Sight: the eye", "eye"],
  ["Hearing: the ear", "ear"],
  ["Taste: the tongue", "tongue"],
  ["Smell: the nose", "nose"],
  ["Touch: the skin", "touch"],
];
window.LESSON = {
  n: 3,
  key: "sci4-t8-l3",
  grade: 4,
  title: "Nervous System",
  unit: "Topic 8 · Lesson 3",
  book: "Book pages 358–365",
  cover: "senses",
  question: {
    q: "How does your body [sense] the world and [respond]?",
    a: "[Sensory organs] (eyes, ears, tongue, nose, skin) send signals through [nerves] to the [brain]. The brain tells the body what to do.",
    img: "senses",
  },
  // the book's vocabulary + academic vocabulary (page 358) + words of the lesson
  words: [
    {
      w: "Sensory organ",
      m: "a body part that senses: eye, ear, tongue, nose, skin",
    },
    { w: "Brain", m: "the control center of the body" },
    { w: "Nerve", m: "carries messages to and from the brain" },
    { w: "Spinal cord", m: "a thick bundle of nerves in your back" },
    { w: "Respond", m: "to react" },
    { w: "Cerebrum", m: "the thinking part of the brain" },
    { w: "Cerebellum", m: "the part of the brain for balance" },
    { w: "Brain stem", m: "controls breathing and heartbeat" },
  ],

  ideas: [
    {
      t: "A bionic arm",
      lines: [
        "A [bionic arm] is an artificial arm.",
        "The person [thinks] about a task.",
        "Messages go from the brain through the nerves to the arm.",
      ],
      img: "bionic-arm",
    },
    {
      t: "The sensory organs",
      lines: [
        "[Sensory organs] connect your body to the world.",
        "They send information to the [brain].",
        "The brain tells the body how to react.",
      ],
      img: "senses",
    },
    {
      t: "The eye: sight",
      lines: [
        "Light goes in through the [pupil].",
        "The [lens] focuses it on the back of the eye.",
        "A nerve sends signals to the brain: you [see].",
      ],
      img: "eye",
    },
    {
      t: "The ear: hearing",
      lines: [
        "Sound waves make the [eardrum] vibrate.",
        "The ear changes the vibrations into nerve signals.",
        "The brain hears words, music and other sounds.",
      ],
      img: "ear",
    },
    {
      t: "The tongue: taste",
      lines: [
        "The tongue has [taste buds].",
        "Tastes: [sweet], [salty], [bitter], [sour].",
      ],
      img: "tongue",
    },
    {
      t: "The nose: smell",
      lines: [
        "The nose senses [chemicals] in the air.",
        "Smell also helps you [taste] food.",
      ],
      img: "nose",
    },
    {
      t: "The skin: touch",
      lines: [
        "Nerve endings in the skin feel [pressure], [pain], [hot] and [cold].",
        "Your [fingertips] have many nerve endings.",
      ],
      img: "touch",
    },
    {
      t: "The brain",
      lines: [
        "[Cerebrum]: thinking, imagination, feelings, moving muscles.",
        "[Cerebellum]: [balance].",
        "[Brain stem]: breathing, heartbeat, swallowing.",
      ],
      img: "brain",
    },
    {
      t: "Nerves and the spinal cord",
      lines: [
        "The [brain] and [spinal cord] are the central nervous system.",
        "[Nerves] branch out to every part of the body.",
        "Messages travel to and from the brain.",
      ],
      img: "nerves",
    },
  ],

  games: [
    {
      k: "sense",
      t: "Which sense?",
      en: "Eye, ear, tongue, nose, skin",
      ic: "👀",
      items: [
        ["You see a rainbow.", 0],
        ["You hear music.", 1],
        ["Lemon is sour.", 2],
        ["You smell cookies.", 3],
        ["The stove is hot!", 4],
        ["You read a book.", 0],
        ["A dog barks.", 1],
      ].map(([q, k]) => {
        const o = [0, 2, 4].map((d) => SENSES[(k + d) % SENSES.length]);
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "brain",
      t: "Which part of the brain?",
      en: "Cerebrum, cerebellum, brain stem",
      ic: "🧠",
      items: [
        ["Thinking and imagination", "Cerebrum"],
        ["Balance on one foot", "Cerebellum"],
        ["Breathing and heartbeat", "Brain stem"],
        ["Feelings", "Cerebrum"],
      ].map(([q, a]) => ({
        type: "mc",
        q: `[${q}]: which part of the brain?`,
        opts: [
          a,
          ...["Cerebrum", "Cerebellum", "Brain stem"].filter((x) => x !== a),
        ],
        img: "brain",
      })),
    },
    {
      k: "path",
      t: "The path of a message",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "You touch something [hot]",
          ask: "Put the path of the message in order.",
          hint: "The skin feels it first.",
          steps: [
            { say: "The skin feels heat", img: "touch" },
            { say: "Nerves carry the message", img: "nerves" },
            { say: "The brain decides: move!", img: "brain" },
            { say: "Your hand moves away", e: "✋" },
          ],
        },
        {
          type: "order",
          t: "How you [hear]",
          ask: "Put the steps of hearing in order.",
          hint: "The sound wave comes first.",
          steps: [
            { say: "A sound wave enters the ear", e: "🔊" },
            { say: "The eardrum vibrates", img: "ear" },
            { say: "A nerve carries the signal", e: "⚡" },
            { say: "The brain hears the sound", img: "brain" },
          ],
        },
        {
          type: "multi",
          q: "Which tastes can your tongue sense? (choose all)",
          opts: [
            { t: "Sweet", emoji: "🍬", ok: true },
            { t: "Salty", emoji: "🥨", ok: true },
            { t: "Bitter", emoji: "☕", ok: true },
            { t: "Sour", emoji: "🍋", ok: true },
            { t: "Loud", emoji: "📢" },
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
          q: "How does your nervous system help you hear sounds?",
          a: "Sound makes the [eardrum] vibrate. A [nerve] carries the signal to the [brain]. The brain understands the sound.",
          img: "ear",
        },
        {
          type: "open",
          q: "Write one main idea about the nervous system.",
          a: "The nervous system [carries messages] between the [brain] and the body.",
          img: "nerves",
        },
        {
          type: "open",
          q: "How can signals from the brain reach a bionic arm?",
          a: "Through the [nerves]: the arm reads the messages from the nerves.",
          img: "bionic-arm",
        },
        {
          type: "open",
          q: "Which part is most sensitive to touch: fingertip, arm or ankle? Why?",
          a: "The [fingertip]. It has the most [nerve endings].",
          img: "touch",
        },
        {
          type: "open",
          q: "What messages does the brain respond to, to keep you balanced on one foot?",
          a: "Messages from your [eyes], [muscles] and inner [ears]. The [cerebellum] keeps your balance.",
          emoji: "🦩 🧠",
        },
        {
          type: "open",
          q: "Draw the path of a message from your fingertip.",
          a: "Fingertip → [nerves] in the arm → [spinal cord] → [brain].",
          img: "nerves",
        },
        {
          type: "open",
          q: "Choose one sense. What can you detect with it?",
          a: "Eyes: [colors] and shapes. Ears: [music]. Nose: [flowers]. Tongue: [sweet] candy. Skin: [hot] or cold.",
          img: "senses",
        },
      ],
    },
  ],
};
