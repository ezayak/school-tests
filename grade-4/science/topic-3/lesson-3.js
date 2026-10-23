// Science · Grade 4 · Topic 3 · Lesson 3 « Waves and the Electromagnetic Spectrum » (book pages 124–133).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 3,
  key: "sci4-t3-l3",
  grade: 4,
  title: "Waves and the Electromagnetic Spectrum",
  unit: "Topic 3 · Lesson 3",
  book: "Book pages 124–133",
  cover: "banana-eye",
  question: {
    q: "How do we [see] things?",
    a: "Light [reflects] (bounces) off an object into our [eyes]. The eye sends a message to the [brain].",
    img: "banana-eye",
  },
  // the book's vocabulary + academic vocabulary (page 124) + the light-and-matter words
  words: [
    { w: "Ray", m: "a line of light going in one direction" },
    { w: "Reflect", m: "to bounce off" },
    { w: "Refract", m: "to bend" },
    { w: "Absorb", m: "to take in" },
    { w: "System", m: "parts that work together" },
    { w: "Transparent", m: "lets almost all light through" },
    { w: "Translucent", m: "lets some light through" },
    { w: "Opaque", m: "lets no light through" },
    {
      w: "Electromagnetic spectrum",
      m: "all the kinds of light waves, seen and unseen",
    },
  ],

  ideas: [
    {
      t: "Light is a wave",
      lines: [
        "Light is a [transverse] wave.",
        "It needs [no medium]: it travels through empty space.",
        "Light travels in straight lines called [rays].",
      ],
      vis: { kind: "emoji", e: "☀️ ➡️ ➡️" },
    },
    {
      t: "Reflect",
      lines: [
        "[Reflect]: light [bounces] off a surface.",
        "A mirror sends the light in a [new direction].",
      ],
      img: "laser",
    },
    {
      t: "Refract",
      lines: [
        "[Refract]: light [bends] when it goes into new matter.",
        "A [prism] bends white light into the [rainbow] colors.",
      ],
      img: "prism",
    },
    {
      t: "Absorb",
      lines: [
        "[Absorb]: to take in.",
        "Light that is absorbed is [not seen] any more.",
        "Black clothes absorb more light, so they get [warmer].",
      ],
      vis: { kind: "emoji", e: "⬛ ☀️ 🔥" },
    },
    {
      t: "Light lets us see",
      lines: [
        "Light must [reflect] off an object into your eye.",
        "In the [dark] there is no light to reflect, so we cannot see.",
      ],
      vis: { kind: "emoji", e: "💡 ➡️ 🍎 ➡️ 👁️" },
    },
    {
      t: "The eye is a system",
      lines: [
        "[Pupil]: the black hole that lets light in.",
        "[Lens]: bends and focuses the light.",
        "[Retina]: gets the picture. The [optic nerve] sends it to the [brain].",
      ],
      img: "eye",
    },
    {
      t: "How we see colors",
      lines: [
        "White sunlight has [all] the colors of the rainbow.",
        "A banana reflects [yellow] light.",
        "The retina tells the brain: yellow!",
      ],
      img: "banana-eye",
    },
    {
      t: "Light through matter",
      lines: [
        "[Transparent]: almost all light goes through, like clear glass.",
        "[Translucent]: some light goes through, like a thin curtain.",
        "[Opaque]: no light goes through, like a thick curtain.",
      ],
      img: "curtains",
    },
    {
      t: "Waves we cannot see",
      lines: [
        "The light we see is only a [small] part of the [electromagnetic spectrum].",
        "We cannot see [radio waves], [microwaves] and [X-rays].",
      ],
      vis: { kind: "emoji", e: "📻 🍲 🩻" },
    },
    {
      t: "X-rays",
      lines: [
        "[Bones] absorb X-rays.",
        "So an X-ray picture shows the bones inside you.",
      ],
      img: "xray",
    },
    {
      t: "Light carries information",
      lines: [
        "Scientists study the light that comes from [planets].",
        "It tells them what the planet is made of, like [Mars].",
      ],
      img: "mars",
    },
  ],

  games: [
    {
      k: "rra",
      t: "Reflect, refract or absorb?",
      en: "Bounce, bend or take in",
      ic: "↩️",
      items: [
        ["Light bounces off a mirror.", 0, "laser"],
        ["Light bends in a prism.", 1, "prism"],
        ["Black clothes take in the sunlight.", 2, "⬛ ☀️"],
        ["You see yourself in a still lake.", 0, "🏞️"],
        ["A straw looks bent in a glass of water.", 1, "🥤"],
        ["A banana sends back yellow light.", 0, "🍌"],
        ["A dark road gets hot in the sun.", 2, "🛣️ ☀️"],
      ].map(([q, k, p]) => {
        const all = [
          ["Reflect", "↩️"],
          ["Refract", "↘️"],
          ["Absorb", "⬛"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)]; // the right one first
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
        };
      }),
    },
    {
      k: "through",
      t: "Does light go through?",
      en: "Transparent, translucent, opaque",
      ic: "🪟",
      items: [
        ["Clear window glass", 0, "🪟"],
        ["A wooden door", 2, "🚪"],
        ["A thin white curtain", 1, "curtains"],
        ["A brick wall", 2, "🧱"],
        ["Clean water", 0, "💧"],
        ["Tissue paper", 1, "🧻"],
      ].map(([t, k, p]) => {
        const all = [
          ["Transparent", "🪟"],
          ["Translucent", "🌫️"],
          ["Opaque", "🧱"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q: `[${t}]: how much light goes through?`,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          ...(p === "curtains" ? { img: p } : { emoji: p }),
        };
      }),
    },
    {
      k: "eye",
      t: "How we see",
      en: "The parts of the eye",
      ic: "👁️",
      items: [
        ...[
          ["Which part lets the light [in]?", "Pupil"],
          ["Which part [bends] and focuses the light?", "Lens"],
          ["Which part gets the [picture]?", "Retina"],
          ["Which part carries the message to the [brain]?", "Optic nerve"],
        ].map(([q, right]) => ({
          type: "mc",
          q,
          opts: [
            right,
            ...["Pupil", "Lens", "Retina", "Optic nerve"].filter(
              (x) => x !== right,
            ),
          ],
          img: "eye",
        })),
        {
          type: "order",
          t: "How you see a [banana]",
          ask: "Put the steps of seeing the banana in order.",
          hint: "The sunlight comes first.",
          steps: [
            { say: "White sunlight", e: "☀️" },
            { say: "It hits the banana", e: "🍌" },
            { say: "Yellow light reflects into the eye", e: "👁️" },
            { say: "The retina sends a message to the brain", e: "🧠" },
          ],
        },
      ],
    },
    {
      k: "see",
      t: "Can we see it?",
      en: "The electromagnetic spectrum",
      ic: "🌈",
      items: [
        ["The colors of the rainbow", true, "🌈"],
        ["Radio waves", false, "📻"],
        ["X-rays", false, "🩻"],
        ["Microwaves", false, "🍲"],
        ["Sunlight", true, "☀️"],
      ].map(([t, yes, e]) => ({
        type: "mc",
        q: `[${t}]: can our eyes see them?`,
        opts: yes ? ["Yes", "No"] : ["No", "Yes"],
        icons: yes ? ["👁️", "🙈"] : ["🙈", "👁️"],
        two: true,
        emoji: e,
      })),
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
          q: "Why does your eye see a banana as yellow?",
          a: "The banana [reflects] yellow light into the eye. The retina tells the [brain]: yellow.",
          img: "banana-eye",
        },
        {
          type: "open",
          q: "Why are you not able to see objects in the dark?",
          a: "There is [no light] to reflect off them into your eyes.",
          emoji: "🌑 👁️",
        },
        {
          type: "open",
          q: "Why does black clothing get warmer than white clothing in sunlight?",
          a: "Black [absorbs] more light. White [reflects] it.",
          emoji: "⬛ ⬜ ☀️",
        },
        {
          type: "open",
          q: "What shows that the eye is a system?",
          a: "It has [parts] (pupil, lens, retina) that [work together] so we can see.",
          img: "eye",
        },
        {
          type: "open",
          q: "A curtain makes the room completely dark when it is closed. How can you describe the curtain?",
          a: "It is [opaque]: no light goes through.",
          img: "curtains",
        },
        {
          type: "open",
          q: "Would X-rays be useful for sending messages a long distance?",
          a: "[No]. X-rays interact with matter and are absorbed.",
          img: "xray",
        },
        {
          type: "open",
          q: "Shine a flashlight on smooth foil, then on crumpled foil. Why does the light look different?",
          a: "Smooth foil reflects the light in [one direction]. Crumpled foil reflects it in [many directions].",
          emoji: "🔦 ✨",
        },
        {
          type: "open",
          q: "How could you use colors to make a code?",
          a: "Each [color] means a letter or a word, like traffic lights.",
          emoji: "🔴 🟡 🟢",
        },
      ],
    },
  ],
};
