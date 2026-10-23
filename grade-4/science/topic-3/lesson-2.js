// Science · Grade 4 · Topic 3 · Lesson 2 « Patterns of Waves » (book pages 116–123).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  key: "sci4-t3-l2",
  grade: 4,
  title: "Patterns of Waves",
  unit: "Topic 3 · Lesson 2",
  book: "Book pages 116–123",
  cover: "circular",
  question: {
    q: "What [patterns] do waves make?",
    a: "Waves [repeat], so we can predict them. One [point] makes [circular] waves. A [line] makes [plane] (line) waves. Waves can [add together].",
    img: "circular",
  },
  // the book's vocabulary + academic vocabulary (page 116)
  words: [
    { w: "Pattern", m: "something that repeats" },
    { w: "Oscillate", m: "to move back and forth between two points" },
    { w: "Wave period", m: "the time for one back-and-forth motion" },
    { w: "Circular wave", m: "waves in circles, from one point" },
    { w: "Plane wave", m: "waves in straight lines, from a line" },
    { w: "Superposition", m: "two waves meet and add together" },
    { w: "Appear", m: "to show up" },
  ],

  ideas: [
    {
      t: "Waves have patterns",
      lines: [
        "Frequency, amplitude and wavelength [repeat].",
        "So if you see part of a wave, you can [predict] the rest.",
      ],
      vis: { kind: "emoji", e: "〰️ 〰️ 〰️" },
    },
    {
      t: "Oscillate",
      lines: [
        "To [oscillate]: to move back and forth between two points.",
        "A swing, a pendulum, a rocking chair.",
      ],
      img: "swing",
    },
    {
      t: "Wave period",
      lines: [
        "[Wave period]: the time for [one] back-and-forth motion.",
        "[High] frequency = [short] wavelength. Low frequency = long wavelength.",
      ],
      vis: { kind: "emoji", e: "⏱️ ↔️" },
    },
    {
      t: "Waves need a disturbance",
      lines: [
        "For waves to [appear], something must [disturb] the water.",
        "She throws a stone into the lake.",
      ],
      img: "stone",
    },
    {
      t: "Circular waves",
      lines: [
        "The stone hits the water at [one point].",
        "Waves spread out in [circles], in all directions.",
        "The circles grow, but the space between them stays the [same].",
      ],
      img: "splash",
    },
    {
      t: "Circles carry energy outward",
      lines: [
        "The energy moves [outward] in circles.",
        "The space from one circle to the next = one [wavelength].",
      ],
      img: "circular",
    },
    {
      t: "Plane (line) waves",
      lines: [
        "Push the water with your flat [hand]: the waves move in [straight lines].",
        "[Plane waves] move in parallel lines, the same way.",
        "From above they look like [stripes].",
      ],
      img: "line-wave",
    },
    {
      t: "Superposition",
      lines: [
        "Two waves meet and [add together]: [superposition].",
        "Crest + crest = a [taller] wave for a moment.",
        "Crest + equal trough = they [cancel]: the water is still for a moment.",
      ],
      img: "superposition",
    },
    {
      t: "Ham radio",
      lines: [
        "A [ham radio] uses radio waves with special [frequencies].",
        "You can talk to people far away.",
        "To reach far, you need a big [antenna].",
      ],
      img: "radio",
    },
  ],

  games: [
    {
      k: "shape",
      t: "Circular or line wave?",
      en: "From a point or from a line",
      ic: "⭕",
      items: [
        ["A stone falls into a lake.", "c"],
        ["You push the water with your flat hand.", "l"],
        ["From above, the waves look like stripes.", "l"],
        ["The waves spread out in circles from one point.", "c"],
        ["A raindrop falls into a puddle.", "c"],
        ["The waves move in straight, parallel lines.", "l"],
      ].map(([q, t]) => {
        const o = t === "c" ? [0, 1] : [1, 0];
        const names = ["Circular wave", "Line (plane) wave"];
        const pics = ["circular", "line-wave"];
        return {
          type: "mc",
          q,
          opts: o.map((i) => names[i]),
          pics: o.map((i) => pics[i]),
        };
      }),
    },
    {
      k: "meet",
      t: "When waves meet",
      en: "Superposition",
      ic: "➕",
      items: [
        {
          type: "mc",
          q: "Two [crests] meet. The wave is ___",
          opts: ["taller for a moment", "gone forever"],
          img: "superposition",
        },
        {
          type: "mc",
          q: "A crest meets an equal [trough]. The water is ___",
          opts: ["still for a moment", "very high"],
          img: "superposition",
        },
        {
          type: "mc",
          q: "Two waves meet. After that they ___",
          opts: ["go on, through each other", "stop forever"],
          img: "superposition",
        },
      ],
    },
    {
      k: "osc",
      t: "Does it oscillate?",
      en: "Back and forth?",
      ic: "↔️",
      items: [
        ["A swing", true, "swing"],
        ["A pendulum clock", true, "🕰️"],
        ["A rocking chair", true, "🪑"],
        ["A car driving away", false, "🚗 💨"],
        ["A stone falling down", false, "🪨 ⬇️"],
      ].map(([t, yes, p]) => ({
        type: "mc",
        q: `[${t}]: does it move back and forth?`,
        opts: yes ? ["Yes, it oscillates", "No"] : ["No", "Yes, it oscillates"],
        icons: yes ? ["↔️", "➡️"] : ["➡️", "↔️"],
        two: true,
        ...(p === "swing" ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "words",
      t: "Wave words",
      en: "Match",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "circular", label: "Circular wave" },
            { img: "line-wave", label: "Plane (line) wave" },
            { img: "superposition", label: "Superposition" },
            { img: "swing", label: "Oscillate" },
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
          q: "Describe line waves and circular waves. How is each one made?",
          a: "[Circular] waves come from [one point], like a stone in water. They spread in circles. [Line] waves come from a [line], like pushing with your hand. They move in straight lines.",
          img: "circular",
        },
        {
          type: "open",
          q: "How could two waves moving toward each other suddenly disappear?",
          a: "A [crest] meets an equal [trough]. They [cancel] each other for a moment.",
          img: "superposition",
        },
        {
          type: "open",
          q: "Someone skips a rock on a pond. What wave pattern forms?",
          a: "[Circular] waves, each time the rock touches the water at one point.",
          img: "splash",
        },
        {
          type: "open",
          q: "How is a swing like an oscillating wave?",
          a: "Both move [back and forth] between two points, again and again.",
          img: "swing",
        },
        {
          type: "open",
          q: "Tap the water in a bowl. How could you change the frequency of the waves?",
          a: "Tap [faster] for a higher frequency. Tap [slower] for a lower frequency.",
          emoji: "👆 💧",
        },
        {
          type: "open",
          q: "How could you use long and short sound waves to send a message?",
          a: "Use [low] and [high] sounds as a code, like long and short beeps.",
          emoji: "🎵 🔊",
        },
        {
          type: "open",
          q: "What would a ham radio need to reach someone far away?",
          a: "A big [antenna] and the right [frequency].",
          img: "radio",
        },
      ],
    },
  ],
};
