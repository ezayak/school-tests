// Science · Grade 4 · Topic 3 · Lesson 1 « Properties of Waves » (book pages 106–113).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t3-l1",
  grade: 4,
  title: "Properties of Waves",
  unit: "Topic 3 · Lesson 1",
  book: "Book pages 106–113",
  cover: "surfer",
  question: {
    q: "What is a [wave]? How does it carry [energy]?",
    a: "A wave is a [disturbance] that carries [energy] in a repeating pattern. It moves the energy, [not] the water or the air.",
    img: "surfer",
  },
  // the book's vocabulary + academic vocabulary (page 106)
  words: [
    { w: "Wave", m: "carries energy in a repeating pattern" },
    { w: "Crest", m: "the top of a wave" },
    { w: "Trough", m: "the bottom of a wave" },
    { w: "Amplitude", m: "how high the wave is from the middle" },
    { w: "Wavelength", m: "the distance from one crest to the next" },
    { w: "Frequency", m: "how many waves in a certain time" },
    {
      w: "Transverse wave",
      m: "particles move up and down, the wave moves sideways",
    },
    {
      w: "Longitudinal wave",
      m: "particles move back and forth, the same way as the wave",
    },
    { w: "Medium", m: "the material a wave travels through" },
    { w: "Transfer", m: "to move to another place" },
  ],

  ideas: [
    {
      t: "Waves are all around",
      lines: [
        "[Light] and [sound] are waves.",
        "Ripples on a lake and earthquakes are waves too.",
        "A [wave] carries [energy] in a repeating pattern.",
      ],
      img: "surfer",
    },
    {
      t: "Vibrations make waves",
      lines: [
        "A [vibration]: something moves back and forth.",
        "One back-and-forth = [one] complete wave.",
        "Hit a drum: it vibrates and makes a sound wave.",
      ],
      vis: { kind: "emoji", e: "🥁 〰️" },
    },
    {
      t: "The medium",
      lines: [
        "Sound needs a [medium] (a material) to travel: air, water, wood.",
        "Light can travel through [empty space].",
        "In outer space there is no air: it is [silent].",
      ],
      vis: { kind: "emoji", e: "🔊 💨 🚀" },
    },
    {
      t: "Light is faster than sound",
      lines: [
        "Different waves travel at different speeds.",
        "[Light] is much [faster] than sound.",
        "We [see] lightning before we [hear] thunder.",
      ],
      vis: { kind: "emoji", e: "⛈️ 👀 👂" },
    },
    {
      t: "Amplitude",
      lines: [
        "[Amplitude]: how high the wave is from the middle.",
        "Big amplitude sound = [loud]. Small amplitude = [quiet].",
      ],
      img: "amplitude",
    },
    {
      t: "Wavelength",
      lines: [
        "[Wavelength]: the distance from one point to the same point on the next wave.",
        "From [crest to crest], or from trough to trough.",
      ],
      img: "amplitude",
    },
    {
      t: "Frequency",
      lines: [
        "[Frequency]: how many waves in a certain time.",
        "High frequency = [short] waves and a [high] sound.",
        "Low frequency = long waves and a low sound.",
      ],
      img: "frequency",
    },
    {
      t: "Transverse wave",
      lines: [
        "The particles move [up and down]. The wave moves [sideways].",
        "The top is the [crest]. The bottom is the [trough].",
      ],
      img: "transverse",
    },
    {
      t: "Longitudinal wave",
      lines: [
        "The particles move [back and forth], the same way as the wave.",
        "The wave [squeezes] together and [spreads] out.",
        "Sound waves are like this.",
      ],
      img: "longitudinal",
    },
    {
      t: "Waves carry energy, not water",
      lines: [
        "Waves [transfer] energy, not the water.",
        "An anchored boat only moves [up and down].",
        "It is [not] pushed to the shore.",
      ],
      img: "boat",
    },
    {
      t: "The energy spreads out",
      lines: [
        "Drop a pebble into a pond: the waves get [smaller] as they go out.",
        "The energy is not lost. It [spreads] over a bigger area.",
      ],
      vis: { kind: "emoji", e: "🪨 💧 ⭕" },
    },
    {
      t: "Surfing",
      lines: [
        "A surfer paddles at the [same speed] as the wave.",
        "Near the shore the bottom of the wave slows down: the wave [breaks].",
      ],
      img: "surfer",
    },
  ],

  games: [
    {
      k: "parts",
      t: "Parts of a wave",
      en: "Crest, trough, amplitude, wavelength",
      ic: "〰️",
      items: [
        ["The [top] of the wave", "Crest", "transverse"],
        ["The [bottom] of the wave", "Trough", "transverse"],
        ["How [high] the wave is from the middle", "Amplitude", "amplitude"],
        ["From one crest to the [next] crest", "Wavelength", "amplitude"],
        ["How [many] waves in a second", "Frequency", "frequency"],
      ].map(([q, right, img], _, all) => ({
        type: "mc",
        q,
        opts: [right, ...all.map((x) => x[1]).filter((x) => x !== right)].slice(
          0,
          3,
        ),
        img,
      })),
    },
    {
      k: "sound",
      t: "Loud or quiet, high or low",
      en: "Amplitude, frequency, speed",
      ic: "🔊",
      items: [
        {
          type: "mc",
          q: "A sound wave with a [big] amplitude is ___",
          opts: ["loud", "quiet"],
          icons: ["🔊", "🔈"],
          two: true,
          img: "amplitude",
        },
        {
          type: "mc",
          q: "A sound wave with a [small] amplitude is ___",
          opts: ["quiet", "loud"],
          icons: ["🔈", "🔊"],
          two: true,
          img: "amplitude",
        },
        {
          type: "mc",
          q: "A sound wave with a [high] frequency has a ___ sound",
          opts: ["high", "low"],
          icons: ["🐦", "🐻"],
          two: true,
          img: "frequency",
        },
        {
          type: "mc",
          q: "More waves every second: the waves are ___",
          opts: ["shorter", "longer"],
          two: true,
          img: "frequency",
        },
        {
          type: "mc",
          q: "Which travels [faster]?",
          opts: ["Light", "Sound"],
          icons: ["⚡", "🔊"],
          two: true,
          emoji: "⛈️",
        },
        {
          type: "mc",
          q: "In outer space you hear ___",
          opts: ["nothing: there is no air", "everything"],
          two: true,
          emoji: "🚀",
        },
      ],
    },
    {
      k: "type",
      t: "Transverse or longitudinal?",
      en: "Two kinds of waves",
      ic: "↕️",
      items: [
        "Particles move [up and down]. The wave moves sideways.|t",
        "Particles move [back and forth], the same way as the wave.|l",
        "It has [crests] and [troughs].|t",
        "It [squeezes] together and [spreads] out.|l",
        "A [sound] wave in the air.|l",
        "Shake a rope [up and down].|t",
      ].map((s) => {
        const [q, t] = s.split("|");
        const o = t === "t" ? [0, 1] : [1, 0];
        const names = ["Transverse", "Longitudinal"];
        const pics = ["transverse", "longitudinal"];
        return {
          type: "mc",
          q,
          opts: o.map((i) => names[i]),
          pics: o.map((i) => pics[i]),
        };
      }),
    },
    {
      k: "carry",
      t: "What do waves carry?",
      en: "Energy, not water",
      ic: "⛵",
      items: [
        {
          type: "mc",
          q: "A wave passes an anchored boat. The boat ___",
          opts: ["moves up and down", "is pushed to the shore"],
          img: "boat",
        },
        {
          type: "mc",
          q: "A wave carries ___",
          opts: ["energy", "the water to the shore"],
          two: true,
          img: "surfer",
        },
        {
          type: "mc",
          q: "A pebble falls into a pond. The waves get ___ as they spread.",
          opts: ["smaller", "bigger"],
          two: true,
          emoji: "🪨 💧 ⭕",
        },
        {
          type: "mc",
          q: "Where does the energy of the pond waves go?",
          opts: ["It spreads over a bigger area", "It disappears"],
          emoji: "💧 ⭕",
        },
        {
          type: "mc",
          q: "What makes waves?",
          opts: ["Vibrations", "Colors", "Shadows"],
          emoji: "🥁 〰️",
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
          q: "Two waves: one has more repetitions per second. How are the waves different?",
          a: "It has a higher [frequency] and a [shorter] wavelength.",
          img: "frequency",
        },
        {
          type: "open",
          q: "A tsunami is a giant water wave made by an earthquake under the ocean. Why is it dangerous when it reaches land?",
          a: "It carries a lot of [energy]. It can destroy buildings and flood the land.",
          emoji: "🌊 🏠",
        },
        {
          type: "open",
          q: "Why is it silent in outer space?",
          a: "Sound needs a [medium] like air. Space has [no air].",
          emoji: "🚀 🔇",
        },
        {
          type: "open",
          q: "Label the wave: crest, trough, amplitude, wavelength.",
          a: "[Crest] = the top. [Trough] = the bottom. [Amplitude] = the height from the middle. [Wavelength] = from crest to crest.",
          img: "transverse",
        },
        {
          type: "open",
          q: "Why does a surfer have to paddle at a certain speed?",
          a: "To move at the [same speed] as the wave, so the wave can carry the surfer.",
          img: "surfer",
        },
        {
          type: "open",
          q: "A diver jumps into a pool. What happens to the waves as they spread?",
          a: "They get [smaller]. The energy spreads over a bigger area.",
          emoji: "🏊 💧",
        },
        {
          type: "open",
          q: "How do we know that light travels faster than sound?",
          a: "In a storm we [see] the lightning [before] we [hear] the thunder.",
          emoji: "⛈️ 👀 👂",
        },
        {
          type: "open",
          q: "How can you use waves to send a message across a room?",
          a: "With [light] (a blinking flashlight) or [sound] (tapping a code).",
          emoji: "🔦 🔊",
        },
      ],
    },
  ],
};
