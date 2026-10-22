// Computer · Grade 3 · Term 2 · Unit 2 · Lesson 1 « Robots in our daily lives » (book pages 38–43).
// All the content of the lesson. Same format as the term 1 lessons. No Mini Word here: the robots are learnt from pictures.
window.LESSON = {
  n: 1,
  grade: 3,
  title: "Robots in our daily lives",
  unit: "Unit 2 · Lesson 1",
  book: "Book pages 38–43",
  cover: "mobile-robot",
  question: {
    q: "Do you know what a [robot] is? Where can you find a robot in your [everyday] life?",
    a: "A robot is a [machine] that follows directions and does [tasks]. Automatic doors, ATMs and vending machines are robots!",
    img: "unit",
  },

  ideas: [
    {
      t: "What is a robot?",
      lines: [
        "A [robot] is a special machine.",
        "It finds out about the things around it and uses that to follow [directions] and do [tasks].",
      ],
      img: "battery-robot",
    },
    {
      t: "3 steps",
      lines: [
        "1. The robot [senses] the place around it.",
        "2. It [uses the information].",
        "3. It [acts]: it does something.",
      ],
      vis: { kind: "emoji", e: "👀 ➜ 🧠 ➜ 🦾" },
    },
    {
      t: "Fixed robots",
      lines: [
        "A [fixed robot] stays in [one place].",
        "It is used in [factories]: it is [fast] and [powerful].",
        "It lifts heavy things and makes cars faster than people.",
      ],
      img: "fixed-robot",
    },
    {
      t: "Mobile robots",
      lines: [
        "A [mobile robot] moves from place to place.",
        "On [land], in the [sea] and in the [air].",
        "People control it with a [remote], or it moves by itself with its [sensors].",
      ],
      img: "mobile-robot",
    },
    {
      t: "Sensors",
      lines: [
        "We have senses: [hearing] and [touch].",
        "Robots have [sensors].",
        "Sensors feel [movement], [weight], [sound] and [temperature].",
      ],
      img: "sensors",
    },
    {
      t: "Robots help us every day",
      lines: [
        "[Automatic doors] open when someone comes near.",
        "[ATMs] give us money. [Vending machines] give snacks and drinks.",
        "Robots make tasks [faster] and [easier]!",
      ],
      img: "vending",
    },
    {
      t: "Advantages 👍",
      lines: [
        "Robots can do tasks most people [cannot].",
        "They are very [accurate] and work very [fast].",
        "They [never get tired] and can be [repaired].",
      ],
      img: "advdis",
    },
    {
      t: "Disadvantages 👎",
      lines: [
        "They [cannot make choices] by themselves.",
        "They need [energy], and they are [expensive].",
        "They can [break down]. They cannot think in a creative way.",
      ],
      img: "advdis",
    },
    {
      t: "Where are robots used?",
      lines: [
        "[Factories]: they make toys, cars and clothes.",
        "[Hospitals]: they help doctors in surgery.",
        "[Construction sites]: cranes lift heavy things.",
      ],
      img: "where",
    },
    {
      t: "Energy",
      lines: [
        "We need [food] for energy. Robots need [power].",
        "Many robots get energy from [batteries].",
      ],
      img: "battery-robot",
    },
    {
      t: "Motors",
      lines: [
        "Our [muscles] help us move.",
        "[Motors] are like muscles for robots.",
        "Motors use [electricity] to make movement.",
      ],
      img: "motor-arm",
    },
  ],

  games: [
    {
      k: "type",
      t: "Fixed or mobile?",
      en: "Put each robot in its group",
      ic: "🤖",
      items: [
        {
          type: "place",
          q: "This robot arm works in a [factory]. It stays in one place.",
          thing: { img: "fixed-robot", label: "Robot arm" },
          spots: [
            { t: "Fixed robot", emoji: "📍" },
            { t: "Mobile robot", emoji: "🛞" },
          ],
        },
        {
          type: "place",
          q: "This robot has [wheels]. It moves from place to place.",
          thing: { img: "mobile-robot", label: "Robot on wheels" },
          spots: [
            { t: "Mobile robot", emoji: "🛞" },
            { t: "Fixed robot", emoji: "📍" },
          ],
        },
        {
          type: "place",
          q: "A robot [vacuum] cleans the whole house.",
          thing: { emoji: "🧹", label: "Robot vacuum" },
          spots: [
            { t: "Mobile robot", emoji: "🛞" },
            { t: "Fixed robot", emoji: "📍" },
          ],
        },
        {
          type: "place",
          q: "A [drone] flies in the air.",
          thing: { emoji: "🚁", label: "Drone" },
          spots: [
            { t: "Mobile robot", emoji: "🛞" },
            { t: "Fixed robot", emoji: "📍" },
          ],
        },
        {
          type: "place",
          q: "A robot that [builds cars] in a factory, very fast.",
          thing: { emoji: "🏭", label: "Car factory robot" },
          spots: [
            { t: "Fixed robot", emoji: "📍" },
            { t: "Mobile robot", emoji: "🛞" },
          ],
        },
      ],
    },
    {
      k: "good",
      t: "Good or not good?",
      en: "Advantages and disadvantages",
      ic: "⚖️",
      items: [
        {
          type: "place",
          q: "Robots [never get tired].",
          thing: { emoji: "💪", label: "Never tired" },
          spots: [
            { t: "Advantage", emoji: "👍" },
            { t: "Disadvantage", emoji: "👎" },
          ],
        },
        {
          type: "place",
          q: "Robots are [expensive].",
          thing: { emoji: "💰", label: "Expensive" },
          spots: [
            { t: "Disadvantage", emoji: "👎" },
            { t: "Advantage", emoji: "👍" },
          ],
        },
        {
          type: "place",
          q: "Robots work [very fast].",
          thing: { emoji: "⚡", label: "Very fast" },
          spots: [
            { t: "Advantage", emoji: "👍" },
            { t: "Disadvantage", emoji: "👎" },
          ],
        },
        {
          type: "place",
          q: "Robots [need energy] to work.",
          thing: { emoji: "🔋", label: "Need energy" },
          spots: [
            { t: "Disadvantage", emoji: "👎" },
            { t: "Advantage", emoji: "👍" },
          ],
        },
        {
          type: "place",
          q: "Robots are very [accurate].",
          thing: { emoji: "🎯", label: "Accurate" },
          spots: [
            { t: "Advantage", emoji: "👍" },
            { t: "Disadvantage", emoji: "👎" },
          ],
        },
        {
          type: "place",
          q: "Robots [cannot make choices] by themselves.",
          thing: { emoji: "🤷", label: "No choices" },
          spots: [
            { t: "Disadvantage", emoji: "👎" },
            { t: "Advantage", emoji: "👍" },
          ],
        },
        {
          type: "place",
          q: "Robots can [break down] for days or weeks.",
          thing: { emoji: "🛠️", label: "Break down" },
          spots: [
            { t: "Disadvantage", emoji: "👎" },
            { t: "Advantage", emoji: "👍" },
          ],
        },
      ],
    },
    {
      k: "where",
      t: "Where do robots help?",
      en: "Factories, hospitals, building sites",
      ic: "🏥",
      items: [
        {
          type: "place",
          q: "This robot helps the [doctor] during surgery.",
          thing: { emoji: "🩺", label: "Helps the doctor" },
          spots: [
            { t: "Hospital", img: "hospital" },
            { t: "Factory", img: "factory" },
            { t: "Construction site", img: "construction" },
          ],
        },
        {
          type: "place",
          q: "This crane lifts heavy things to build a [tall building].",
          thing: { emoji: "🏗️", label: "Crane" },
          spots: [
            { t: "Construction site", img: "construction" },
            { t: "Hospital", img: "hospital" },
            { t: "Factory", img: "factory" },
          ],
        },
        {
          type: "place",
          q: "This robot makes [toys] and [clothes] quickly.",
          thing: { emoji: "🧸", label: "Makes toys" },
          spots: [
            { t: "Factory", img: "factory" },
            { t: "Hospital", img: "hospital" },
            { t: "Construction site", img: "construction" },
          ],
        },
      ],
    },
    {
      k: "steps",
      t: "How a robot works",
      en: "Put the 3 steps in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "How a [robot] works",
          ask: "Put the 3 steps in order. How does a robot work?",
          steps: [
            { say: "It senses the place around it.", e: "👀" },
            { say: "It uses the information.", e: "🧠" },
            { say: "It acts and does something.", e: "🦾" },
          ],
        },
      ],
    },
    {
      k: "tf",
      t: "True or false?",
      en: "Robot facts",
      ic: "✅",
      items: [
        {
          type: "tf",
          q: "Robots use sensors to understand the world around them.",
          a: true,
          img: "sensors",
        },
        {
          type: "tf",
          q: "Robots use muscles to move.",
          a: false,
          img: "motor-arm",
          x: "Robots use [motors]. Motors are like muscles.",
        },
        {
          type: "tf",
          q: "Many robots get their energy from batteries.",
          a: true,
          img: "battery-robot",
        },
        {
          type: "tf",
          q: "A fixed robot moves from place to place.",
          a: false,
          img: "fixed-robot",
          x: "A fixed robot stays in [one place].",
        },
        {
          type: "tf",
          q: "A vending machine is a robot.",
          a: true,
          img: "vending",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "handson",
      t: "Choose the answer",
      en: "Book · Hands on 1.1–1.3",
      ic: "✅",
      from: "Book · Hands on! 1.1–1.3",
      items: [
        {
          type: "mc",
          q: "Where are robots commonly used?",
          opts: ["In factories", "In libraries", "In movie theaters"],
          img: "factory",
        },
        {
          type: "mc",
          q: "Why do doctors use robots in surgery?",
          opts: [
            "To do surgery more carefully",
            "To help lift heavy things",
            "To entertain patients",
          ],
          img: "hospital",
        },
        {
          type: "mc",
          q: "How do vending machines help people?",
          opts: [
            "By giving out snacks and drinks",
            "By giving directions",
            "By giving out books",
          ],
          img: "vending",
        },
      ],
    },
    {
      k: "tf",
      t: "True or false",
      en: "Book · Hands on 2.1–2.4",
      ic: "⚖️",
      from: "Book · Hands on! 2.1–2.4",
      items: [
        {
          type: "tf",
          q: "Robots are used to help people with tasks in hospitals.",
          a: true,
          img: "hospital",
        },
        {
          type: "tf",
          q: "Motors help robots move and do tasks by using electricity to create movement.",
          a: true,
          img: "motor-arm",
        },
        {
          type: "tf",
          q: "Robots can perform tasks that most humans cannot.",
          a: true,
          img: "advdis",
        },
        {
          type: "tf",
          q: "Some robots get their energy from food, just like humans.",
          a: false,
          img: "battery-robot",
          x: "Robots get energy from [batteries], not food.",
        },
      ],
    },
    {
      k: "think",
      t: "Think and answer",
      en: "Book · Hands on 3",
      ic: "💭",
      from: "Book · Hands on! 3",
      items: [
        {
          type: "open",
          q: "Why are robots important in our daily lives? How do they help us with everyday tasks?",
          a: "Robots do jobs for us [fast] and [without getting tired]. Automatic doors open for us, ATMs give us money and vending machines give us snacks.",
          img: "vending",
        },
      ],
    },
    {
      k: "pa3",
      t: "Practical Assessment 3",
      en: "Booklet · Robots in our daily lives",
      ic: "📒",
      from: "Booklet · Practical Assessment (3)",
      items: [
        {
          type: "match",
          pairs: [
            { img: "mobile-robot", label: "Mobile robot" },
            { img: "fixed-robot", label: "Fixed robot" },
          ],
        },
        {
          type: "mc",
          q: "Who am I? They use me in factories because I am very fast.",
          opts: ["Fixed robot", "Mobile robot"],
          pics: ["fixed-robot", "mobile-robot"],
        },
        {
          type: "mc",
          q: "Who am I? I can carry heavy products, more than humans.",
          opts: ["Fixed robot", "Mobile robot"],
          pics: ["fixed-robot", "mobile-robot"],
        },
        {
          type: "mc",
          q: "Who am I? You can use me in the sea and in the air.",
          opts: ["Mobile robot", "Fixed robot"],
        },
        {
          type: "mc",
          q: "What helps a mobile robot know where to go?",
          opts: ["Sensors", "Stickers"],
          img: "sensors",
        },
        {
          type: "mc",
          q: "Name two examples of human senses.",
          opts: ["Hearing and touch", "Temperature"],
          vis: { kind: "emoji", e: "👂 ✋" },
        },
        {
          type: "mc",
          q: "Name three examples of robot senses.",
          opts: ["Sound, weight and temperature", "Feelings"],
          img: "sensors",
        },
        {
          type: "mc",
          q: "Can a mobile robot work without a remote or sensors?",
          opts: ["No", "Yes"],
          img: "mobile-robot",
          x: "It needs a [remote] or its [sensors] to know where to go.",
        },
        {
          type: "tf",
          q: "Sensors help robots sense movement, weight and sound.",
          a: true,
          img: "sensors",
        },
        {
          type: "tf",
          q: "Mobile robots navigate on land, in the sea and in the air.",
          a: true,
          img: "mobile-robot",
        },
        {
          type: "tf",
          q: "Fixed robots are used in factories because they are fast and powerful.",
          a: true,
          img: "fixed-robot",
        },
        {
          type: "tf",
          q: "Automatic doors, ATMs and vending machines are robots.",
          a: true,
          img: "vending",
        },
        {
          type: "tf",
          q: "Robots make tasks slow and hard.",
          a: false,
          x: "Robots make tasks [faster] and [easier].",
          vis: { kind: "emoji", e: "🐢" },
        },
        {
          type: "multi",
          q: "Where are robots used?",
          opts: [
            { t: "Factories", img: "factory", ok: true },
            { t: "Hospitals", img: "hospital", ok: true },
            { t: "Construction sites", img: "construction", ok: true },
            { t: "Clouds", emoji: "☁️" },
          ],
        },
        {
          type: "tf",
          q: "This picture shows the sensors of a robot.",
          a: true,
          img: "sensors",
          x: "Movement, weight, sound and temperature.",
        },
        {
          type: "tf",
          q: "This picture shows the sensors of a robot.",
          a: false,
          img: "where",
          x: "This picture shows [where] robots work: factories, hospitals and construction sites.",
        },
      ],
    },
    {
      k: "hw1",
      t: "Graded Homework 1",
      en: "The robots in our daily lives",
      ic: "📝",
      from: "Graded Homework (1)",
      items: [
        {
          type: "multi",
          q: "Choose the [advantages] of robots. (One is wrong!)",
          opts: [
            { t: "Work fast", ok: true },
            { t: "Don't get tired", ok: true },
            { t: "Can do dangerous jobs", ok: true },
            { t: "Work with muscles" },
            { t: "Work with motors", ok: true },
            { t: "Work very fast", ok: true },
          ],
        },
        {
          type: "multi",
          q: "Choose the [disadvantages] of robots. (Two are wrong!)",
          opts: [
            { t: "Expensive", ok: true },
            { t: "Can think like a human" },
            { t: "Need batteries to work", ok: true },
            { t: "Need food and water to work" },
            { t: "Need maintenance", ok: true },
            { t: "Programming error", ok: true },
          ],
        },
        {
          type: "mc",
          q: "Do robots use muscles?",
          opts: ["No", "Yes"],
          img: "motor-arm",
          x: "Robots use [motors].",
        },
        {
          type: "mc",
          q: "The fixed robot…",
          opts: ["stays in one place", "moves everywhere"],
          img: "fixed-robot",
        },
        {
          type: "mc",
          q: "Which of these is a fixed robot?",
          opts: ["Robotic arm", "Robot vacuum"],
          pics: ["fixed-robot", null],
        },
        {
          type: "mc",
          q: "What is a mobile robot?",
          opts: [
            "A robot that can move from place to place",
            "A robot that stays in one place",
          ],
          img: "mobile-robot",
        },
      ],
    },
  ],
};
