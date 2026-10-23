// Science · Grade 4 · Topic 1 · Lesson 2 « Collisions » (book pages 16–23).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Not in the school booklet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  grade: 4,
  title: "Collisions",
  unit: "Topic 1 · Lesson 2",
  book: "Book pages 16–23",
  cover: "pins",
  question: {
    q: "What happens to [energy] when objects [collide]?",
    a: "Energy is [transferred] from one object to the other. Some energy [changes] into sound, heat or light.",
    img: "pins",
  },
  // the book's vocabulary (page 16)
  words: [
    { w: "Collision", m: "one object bumps into another object" },
    { w: "Simulate", m: "to copy how something happens, with a model" },
    { w: "Compress", m: "to squeeze something smaller" },
    { w: "Transfer", m: "energy moves from one object to another" },
    { w: "Transform", m: "energy changes from one form to another" },
  ],

  ideas: [
    {
      t: "A collision",
      lines: [
        "A [collision]: one object [bumps into] another object.",
        "In a collision, energy is [transferred].",
      ],
      img: "pins",
    },
    {
      t: "Collisions in sports",
      lines: [
        "A stick hits a puck. A bat hits a ball.",
        "Energy moves from the [stick] to the [puck].",
        "The [harder] the hit, the [farther] it goes.",
      ],
      img: "hit",
    },
    {
      t: "The bouncing ball",
      lines: [
        "The ball falls: its energy is [transformed].",
        "It hits the floor and [compresses] (squeezes), like a spring.",
        "Then it [stretches back] and bounces up.",
      ],
      img: "basketball",
    },
    {
      t: "Bowling",
      lines: [
        "The ball hits the pins.",
        "Its [kinetic energy] moves to the pins.",
        "The pins fly and fall.",
      ],
      img: "bowling-ball",
    },
    {
      t: "Crash! Other energy changes",
      lines: [
        "A loud [sound] shows that energy changed.",
        "Some kinetic energy changes into [sound] energy.",
        "Collisions can also make [light] and [heat] (thermal energy).",
      ],
      vis: { kind: "emoji", e: "💥 🔊 🔥" },
    },
    {
      t: "Newton's cradle",
      lines: [
        "Lift one ball and drop it.",
        "Its energy is [transferred] through the middle balls.",
        "The ball on the [other side] flies up. The middle balls barely move.",
      ],
      img: "cradle",
    },
    {
      t: "Faster = more damage",
      lines: [
        "[Faster] objects have [more] kinetic energy.",
        "Two fast cars crash: [more damage] than two slow cars.",
      ],
      img: "crash",
    },
    {
      t: "Heavy or light ball?",
      lines: [
        "A [heavy] ball has more energy than a [light] ball at the same speed.",
        "The bowling ball knocks down [more] pins.",
      ],
      vis: {
        kind: "bars",
        items: [
          { e: "🏐", label: "Plastic ball", v: 1, note: "light" },
          { e: "🥎", label: "Softball", v: 2, note: "light" },
          { img: "bowling-ball", label: "Bowling ball", v: 7, note: "heavy" },
        ],
      },
    },
    {
      t: "Engineers simulate crashes",
      lines: [
        "Car safety engineers [simulate] crashes with models and toy cars.",
        "They study what happened, to make cars [safer].",
      ],
      vis: { kind: "emoji", e: "🚗 💥 🚙" },
    },
  ],

  games: [
    {
      k: "what",
      t: "What happens in a collision?",
      en: "Where does the energy go?",
      ic: "💥",
      items: [
        {
          type: "mc",
          q: "The bowling ball hits the pins. Where does its energy go?",
          opts: ["To the pins: they move", "Nowhere: it disappears"],
          two: true,
          img: "pins",
          x: "Energy is [transferred]. It never disappears.",
        },
        {
          type: "mc",
          q: "You hear a loud crash. Kinetic energy changed into ___",
          opts: ["sound energy", "potential energy", "chemical energy"],
          emoji: "💥",
        },
        {
          type: "mc",
          q: "The ball hits the floor. For a moment the ball ___",
          opts: ["compresses (squeezes)", "gets bigger", "melts"],
          img: "basketball",
        },
        {
          type: "mc",
          q: "Then the ball ___",
          opts: ["stretches back and bounces up", "stays flat", "disappears"],
          img: "basketball",
        },
        {
          type: "mc",
          q: "In Newton's cradle, you drop one ball. Which ball flies up?",
          opts: ["The ball on the other side", "The middle balls", "No ball"],
          img: "cradle",
          x: "The energy goes [through] the middle balls.",
        },
        {
          type: "multi",
          q: "A collision can change kinetic energy into … (choose all)",
          opts: [
            { t: "Sound", emoji: "🔊", ok: true },
            { t: "Light", emoji: "💡", ok: true },
            { t: "Heat", emoji: "🔥", ok: true },
            { t: "Nothing: the energy disappears", emoji: "🚫" },
          ],
        },
      ],
    },
    {
      k: "more",
      t: "Which hits harder?",
      en: "Faster and heavier",
      ic: "⚖️",
      items: [
        {
          type: "mc",
          q: "Which crash makes [more] damage?",
          opts: ["Two fast cars", "Two slow cars"],
          icons: ["🏎️🏎️", "🚗🚗"],
          two: true,
          x: "Faster = more kinetic energy.",
        },
        {
          type: "mc",
          q: "Which ball knocks down [more] pins?",
          opts: ["A heavy bowling ball", "A light plastic ball"],
          icons: ["🎳", "🏐"],
          two: true,
          x: "Heavier = more kinetic energy.",
        },
        {
          type: "mc",
          q: "The player hits the puck [harder]. The puck goes ___",
          opts: ["farther", "less far", "the same"],
          img: "hit",
        },
        {
          type: "mc",
          q: "A softball hits the pins instead of a bowling ball. The softball is ___",
          opts: [
            "lighter, so it has less energy",
            "heavier, so it has more energy",
          ],
          emoji: "🥎",
        },
        {
          type: "mc",
          q: "Which car has [more] kinetic energy?",
          opts: ["A fast car", "A parked car"],
          icons: ["🏎️", "🅿️🚗"],
          two: true,
        },
      ],
    },
    {
      k: "order",
      t: "What happens first?",
      en: "Put the steps in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "The [bouncing] ball",
          ask: "Put the steps of the bouncing ball in order.",
          hint: "The ball falls first.",
          steps: [
            { say: "The ball falls down", e: "⬇️" },
            { say: "It hits the floor and compresses", e: "💥" },
            { say: "It stretches back out", e: "🏀" },
            { say: "It bounces up", e: "⬆️" },
          ],
        },
        {
          type: "order",
          t: "[Newton's cradle]",
          ask: "Put the steps of Newton's cradle in order.",
          hint: "Lift the ball first.",
          steps: [
            { say: "Lift one ball", e: "✋" },
            { say: "Drop it: it hits the next ball", e: "💥" },
            { say: "The energy goes through the middle balls", e: "➡️" },
            { say: "The last ball flies up", e: "⬆️" },
          ],
        },
      ],
    },
    {
      k: "pics",
      t: "Pictures and words",
      en: "Match",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "pins", label: "Collision" },
            { img: "cradle", label: "Newton's cradle" },
            { img: "basketball", label: "Compress and bounce" },
            { img: "crash", label: "Car crash" },
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
          q: "What changes in energy happen when the bowling ball strikes the pins?",
          a: "Kinetic energy is [transferred] to the pins. Some changes into [sound] energy.",
          img: "pins",
        },
        {
          type: "open",
          q: "In Newton's cradle, why do the balls in the center barely move?",
          a: "The energy is [transferred through] them to the last ball. They pass the energy on.",
          img: "cradle",
        },
        {
          type: "open",
          q: "You go bowling with a softball or a large plastic ball, not a heavy bowling ball. How would the speed and motion be different?",
          a: "They are [lighter], so they have [less] kinetic energy. They knock down [fewer] pins.",
          img: "bowling-ball",
        },
        {
          type: "open",
          q: "Why would a crash of two fast cars cause more damage than a crash of two slow cars?",
          a: "Fast cars have [more kinetic energy]. More energy is transferred in the crash.",
          img: "crash",
        },
        {
          type: "open",
          q: "Name two other sports with energy transfer between objects. Where does it happen?",
          a: "[Tennis]: the racket hits the ball. [Baseball]: the bat hits the ball. [Football]: the foot kicks the ball.",
          img: "hit",
        },
      ],
    },
  ],
};
