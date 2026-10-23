// Science · Grade 4 · Topic 7 · Lesson 5 « Plant and Animal Responses to the Environment » (book pages 316–323).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 5,
  key: "sci4-t7-l5",
  grade: 4,
  title: "Plant and Animal Responses to the Environment",
  unit: "Topic 7 · Lesson 5",
  book: "Book pages 316–323",
  cover: "elephants",
  question: {
    q: "How do animals use their [senses] and [behaviors] to survive?",
    a: "Senses send signals to the [brain], and the brain tells the body how to [respond]. Animals stay in [groups], [hibernate], [huddle] or [migrate] to survive.",
    img: "elephants",
  },
  // the book's vocabulary + academic vocabulary (page 316) + words of the lesson
  words: [
    { w: "Stimulus", m: "something an animal senses, a signal" },
    { w: "Respond", m: "to act because of a signal" },
    { w: "Extinct", m: "no more of that kind lives on Earth" },
    { w: "Hibernate", m: "to sleep through the cold winter" },
    { w: "Migrate", m: "to travel to a warmer place and back" },
    {
      w: "Echolocation",
      m: "finding things by sound that bounces back",
    },
  ],

  ideas: [
    {
      t: "A dog's nose",
      lines: [
        "Dogs can [smell] much better than people.",
        "At airports they sniff for dangerous things.",
        "They help find [missing people] by their smell.",
      ],
      img: "dog",
    },
    {
      t: "Stimulus and response",
      lines: [
        "A [stimulus] is a signal from the senses.",
        "The signal goes to the [brain]. The brain tells the body how to [respond].",
      ],
      vis: { kind: "emoji", e: "👀 👂 ✋ ➡️ 🧠 ➡️ 🏃" },
    },
    {
      t: "Elephants see",
      lines: [
        "The oldest elephant leads the family to [water].",
        "The others [see] which way she points her body.",
      ],
      img: "elephants-see",
    },
    {
      t: "Elephants hear and feel",
      lines: [
        "Elephants make loud calls with their trunks to warn of [danger].",
        "They [feel] low rumbling sounds through their [feet].",
        "The older elephants make a circle around the young ones.",
      ],
      img: "elephants-hear",
    },
    {
      t: "A strong sense of smell",
      lines: [
        "[Bears], [sharks], dogs and snakes smell very well.",
        "They smell [food], or an [enemy] coming.",
        "A snake smells with its [tongue].",
      ],
      img: "shark",
    },
    {
      t: "When the environment changes",
      lines: [
        "Plants and animals that can live in the new environment [survive].",
        "If they cannot, that kind can become [extinct]: gone forever.",
      ],
      img: "frog",
    },
    {
      t: "Groups and hibernation",
      lines: [
        "Deer live in [groups] for safety.",
        "Bears [hibernate]: they sleep in winter when there is little food.",
      ],
      img: "bear",
    },
    {
      t: "Huddling",
      lines: [
        "Penguins do not hibernate.",
        "They stand close together in a [huddle] to keep [warm].",
      ],
      img: "penguins",
    },
    {
      t: "Migration",
      lines: [
        "Many birds [migrate]: they fly [south] in winter,",
        "and fly [north] again when it is warmer.",
      ],
      img: "geese",
    },
    {
      t: "Bats use sound",
      lines: [
        "Bats hunt at [night] in dark caves.",
        "They make a sound. It [bounces back] from an insect: [echolocation].",
        "The echo tells the bat how [close] and how [big] it is.",
      ],
      img: "bat",
    },
  ],

  games: [
    {
      k: "sense",
      t: "Which sense?",
      en: "See, hear, smell, feel",
      ic: "👃",
      items: [
        ["A dog finds a missing person.", 2, "dog"],
        ["Elephants follow the direction of the leader.", 0, "elephants-see"],
        ["Elephants feel rumbling through their feet.", 3, "elephants-hear"],
        ["A bat finds an insect in the dark.", 1, "bat"],
        ["A shark finds food far away.", 2, "shark"],
      ].map(([q, k, img]) => {
        const all = [
          ["Sight", "👀"],
          ["Hearing", "👂"],
          ["Smell", "👃"],
          ["Touch (feeling)", "✋"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)].slice(0, 3);
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          img,
        };
      }),
    },
    {
      k: "winter",
      t: "How do they survive winter?",
      en: "Hibernate, huddle, migrate",
      ic: "❄️",
      items: [
        ["A bear", 0, "bear"],
        ["Penguins", 1, "penguins"],
        ["Geese", 2, "geese"],
      ].map(([t, k, img]) => {
        const all = [
          ["Hibernate: sleep all winter", "😴"],
          ["Huddle: stand close together", "🐧"],
          ["Migrate: fly to a warm place", "✈️"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q: `[${t}]: how do they survive the winter?`,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          img,
        };
      }),
    },
    {
      k: "order",
      t: "Put it in order",
      en: "Stimulus to response, echolocation",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "From [stimulus] to [response]",
          ask: "Put the steps from stimulus to response in order.",
          hint: "The animal senses something first.",
          steps: [
            { say: "The animal senses a stimulus", e: "👂" },
            { say: "A signal goes to the brain", e: "🧠" },
            { say: "The brain tells the body what to do", e: "📣" },
            { say: "The body responds", e: "🏃" },
          ],
        },
        {
          type: "order",
          t: "How a bat finds an [insect]",
          ask: "Put the steps of echolocation in order.",
          hint: "The bat makes a sound first.",
          steps: [
            { say: "The bat makes a sound", img: "bat" },
            { say: "The sound hits the insect", e: "🦋" },
            { say: "The sound bounces back", e: "↩️" },
            { say: "The bat hears it and finds the insect", e: "👂" },
          ],
        },
      ],
    },
    {
      k: "tf",
      t: "True or false?",
      en: "Senses and survival",
      ic: "✅",
      items: [
        {
          type: "tf",
          q: "An extinct animal can come back again.",
          a: false,
          img: "frog",
          x: "Extinct means gone [forever].",
        },
        {
          type: "tf",
          q: "Dogs can smell things that people cannot.",
          a: true,
          img: "dog",
        },
        {
          type: "tf",
          q: "Penguins hibernate in winter.",
          a: false,
          img: "penguins",
          x: "Penguins [huddle] together.",
        },
        {
          type: "tf",
          q: "Elephants can feel sounds through their feet.",
          a: true,
          img: "elephants-hear",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 5 Check and more",
      ic: "📕",
      from: "Book · Lesson 5",
      items: [
        {
          type: "open",
          q: "An animal cannot see in the dark. How else could it find food?",
          a: "By [smell], by [hearing] (like a bat's echolocation), or by [touch].",
          img: "bat",
        },
        {
          type: "open",
          q: "How are the winter behaviors of bears and penguins alike and different?",
          a: "Both help them survive the [cold]. Bears [hibernate]; penguins [huddle] together.",
          img: "penguins",
        },
        {
          type: "open",
          q: "What changes in the environment could make a plant or animal extinct?",
          a: "It gets too [hot] or [cold], there is no [water] or [food], or its [home] is destroyed.",
          img: "frog",
        },
        {
          type: "open",
          q: "How might a mother animal use her sense of smell to protect her babies?",
          a: "She [smells an enemy] coming, then hides or moves her babies away.",
          img: "bear",
        },
        {
          type: "open",
          q: "How does a bat use sound to find an insect?",
          a: "It makes a sound that [bounces off] the insect and comes back to its ears.",
          img: "bat",
        },
        {
          type: "open",
          q: "When could it help people to find things using sound?",
          a: "Finding things [underwater] (ships use sonar), or in the [dark].",
          emoji: "🚢 🔊",
        },
        {
          type: "open",
          q: "How do your senses help you respond to things around you?",
          a: "I [see] a car and stop. I [hear] my name and turn. I [feel] something hot and pull my hand away.",
          emoji: "👀 👂 ✋",
        },
      ],
    },
  ],
};
