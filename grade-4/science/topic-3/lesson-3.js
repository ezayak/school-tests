// Science · Grade 4 · Topic 3 · Lesson 3 « Waves and the Electromagnetic Spectrum » (book pages 124–133).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Exercises: Term 2 booklet practice sheet (pp. 7–11) + Lesson Quiz (pp. 12–15), and the book's own questions.
// The booklet has no answer key: see grade-4/science/UNVERIFIED.md.

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-3/
// (the e-*.jpg drawings: .claude/skills/science-lesson/scripts/pictures/topic-3-lesson-3.py), a Lesson 1 picture ("../lesson-1/…"), or 1–2 emoji.
const mc = (q, answers, more) => {
  const isImg = (p) => /^[a-z.][a-z0-9./-]*$/.test(p); // "e-rays", "../lesson-1/e-transverse"
  const opts = answers.map((a) => a[0]);
  const pics = answers.map((a) => (isImg(a[1]) ? a[1] : null));
  const icons = answers.map((a) => (isImg(a[1]) ? null : a[1]));
  return {
    type: "mc",
    q,
    opts,
    ...(pics.some(Boolean) ? { pics } : {}),
    ...(icons.some(Boolean) ? { icons } : {}),
    ...more,
  };
};
// the parts of the eye, each with its drawing (the part in red)
const EYE = {
  Pupil: "e-eye-pupil",
  Lens: "e-eye-lens",
  Retina: "e-eye-retina",
  "Optic nerve": "e-eye-nerve",
  Iris: "e-front-iris",
};
const eye = (...names) =>
  names.map((n) => [n, EYE[n[0].toUpperCase() + n.slice(1)]]);
const RRA = {
  reflected: "e-reflect",
  refracted: "e-refract",
  absorbed: "e-absorb",
};
const rra = (right) => [
  [right, RRA[right]],
  ...Object.keys(RRA)
    .filter((w) => w !== right)
    .map((w) => [w, RRA[w]]),
];
// animated emoji pictures (Kit.scene, shared/common.js)
const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
const DIM = SC(
  "night",
  [
    { e: "🌙", x: 20, y: 25, s: 20 },
    { e: "👁️", x: 60, y: 60, s: 34, a: "pulse" },
  ],
  "dim light: little light",
);
const BRIGHT = SC(
  "sky",
  [
    { e: "☀️", x: 20, y: 25, s: 26, a: "pulse" },
    { e: "👁️", x: 60, y: 60, s: 20 },
  ],
  "very bright light",
);
const APPLE = SC(
  "plain",
  [
    { e: "☀️", x: 15, y: 25, s: 20 },
    { e: "🌈", x: 38, y: 38, s: 18, a: "pop:0.3" },
    { e: "🍎", x: 60, y: 60, s: 28 },
    { t: "red", x: 82, y: 40, s: 9, c: "bad", a: "pop:1.2" },
    { e: "👁️", x: 85, y: 70, s: 18 },
  ],
  "only the red light comes back",
);
const SEE = (thing, e) =>
  SC(
    "grass",
    [
      { e: "☀️", x: 14, y: 22, s: 20 },
      { e, x: 48, y: 62, s: 28 },
      { e: "👁️", x: 84, y: 40, s: 20, a: "pop:1" },
      { e: "🧠", x: 84, y: 78, s: 18, a: "pop:1.8" },
    ],
    `the sunlight, the ${thing}, the eye, the brain`,
  );
// the steps of seeing something (booklet: a lion; quiz: a dog), the right order
const seeing = (thing, e) => ({
  type: "order",
  t: `How a person sees a [${thing}]`,
  ask: `Number the steps in the correct order to explain how a person is able to see a ${thing}.`,
  hint: "The light comes from the Sun first.",
  steps: [
    { say: "Light energy radiates from a source.", e: "☀️" },
    { say: `Light energy reflects off the ${thing}.`, e },
    { say: "Light energy enters the eye.", img: "e-eye-pupil" },
    { say: "Light energy is focused on the retina.", img: "e-eye-retina" },
    { say: `Light energy is interpreted by the brain as a ${thing}.`, e: "🧠" },
  ],
});
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
          pics: [
            right,
            ...["Pupil", "Lens", "Retina", "Optic nerve"].filter(
              (x) => x !== right,
            ),
          ].map((x) => EYE[x]),
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
      k: "ps-choose",
      t: "Choose: light",
      en: "Booklet · Practice sheet 1 (1–8)",
      ic: "💡",
      from: "Booklet · Practice sheet p. 7–8",
      keep: true,
      items: [
        mc(
          "Light wave is a type of ___",
          [
            ["transverse wave", "../lesson-1/e-transverse"],
            ["longitudinal wave", "../lesson-1/e-longitudinal"],
          ],
          { img: "e-rays", two: true },
        ),
        mc(
          "Light can travel through ___",
          [
            ["empty space", "🌌"],
            ["gas only", "💨"],
            ["liquid only", "💧"],
          ],
          {
            img: "../lesson-1/sun-earth",
            x: "Light comes from the Sun through [empty space]. It also goes through air, water and glass.",
          },
        ),
        mc(
          "Light travels in the form of ___",
          [
            ["rays", "e-rays"],
            ["curved lines", "e-curved"],
          ],
          {
            vis: { kind: "emoji", e: "🔦" },
            two: true,
            x: "Rays are [straight] lines of light.",
          },
        ),
        mc(
          "Light can be ___",
          [
            ["all the above", "✅"],
            ["reflected", "e-reflect"],
            ["refracted", "e-refract"],
            ["absorbed", "e-absorb"],
          ],
          {
            img: "prism",
            keep: ["reflected", "refracted", "absorbed", "all the above"],
            x: "Light can bounce (reflect), bend (refract) and be taken in (absorb): [all] of them.",
          },
        ),
        mc(
          "When light bounces off a surface, then the light is ___",
          rra("reflected"),
          {
            img: "laser",
          },
        ),
        mc(
          "Light rays bend, or ___, when light enters a new medium (air to water).",
          rra("refracted"),
          {
            emoji: "🥄🥛",
            x: "A spoon in a glass of water looks [bent]: the light bends.",
          },
        ),
        mc(
          "When light hits an object, it is ___, which means that light is no longer visible.",
          rra("absorbed"),
          { emoji: "⬛☀️" },
        ),
        mc(
          "A ___ is a geometric shape which bends the light rays.",
          [
            ["prism", "prism"],
            ["rectangle", "e-rectangle"],
            ["square", "e-square"],
          ],
          { img: "e-white-light" },
        ),
      ],
    },
    {
      k: "ps-eye",
      t: "Choose: the eye",
      en: "Booklet · Practice sheet 1 (9–13) and 2",
      ic: "👁️",
      from: "Booklet · Practice sheet p. 8",
      keep: true,
      items: [
        mc(
          "The ___ is the black hole which lets the light enter the eye.",
          [
            ["pupil", "e-front-pupil"],
            ["retina", "e-eye-retina"],
            ["iris", "e-front-iris"],
          ],
          { img: "e-eye-pupil" },
        ),
        mc(
          "When the light is dim (little light), the pupil will get ___, so it will let more light in.",
          [
            ["bigger", "e-pupil-big"],
            ["smaller", "e-pupil-small"],
          ],
          {
            vis: DIM,
            two: true,
            x: "In the dark the pupil opens [wide] to let in more light.",
          },
        ),
        mc(
          "When the light is very bright, the pupil will get ___",
          [
            ["smaller", "e-pupil-small"],
            ["bigger", "e-pupil-big"],
          ],
          {
            vis: BRIGHT,
            two: true,
            x: "Too much light: the pupil gets [small] to let in less light.",
          },
        ),
        mc(
          "Which part of the eye can bend or focus the light?",
          eye("lens", "pupil", "retina"),
          {
            img: "eye",
          },
        ),
        mc(
          "The ___ is the part of the eye which receives images and sends electrical messages to the brain.",
          eye("retina", "pupil", "iris"),
          { img: "eye" },
        ),
        mc(
          "___ is the part which receives images and changes them to electrical signals.",
          eye("Retina", "Lens", "Optic nerve", "Pupil"),
          { img: "eye" },
        ),
        mc(
          "___ carries the electric signals to the brain.",
          eye("Optic nerve", "Retina", "Lens", "Pupil"),
          {
            img: "eye",
            x: "The optic nerve goes from the back of the eye to the [brain].",
          },
        ),
        mc(
          "___ is a black hole which lets the light in.",
          eye("Pupil", "Retina", "Lens", "Optic nerve"),
          {
            img: "eye",
          },
        ),
        mc(
          "___ focuses the light in the eye.",
          eye("Lens", "Retina", "Optic nerve", "Pupil"),
          {
            img: "eye",
          },
        ),
      ],
    },
    {
      k: "ps-label",
      t: "Label the eye",
      en: "Booklet · Practice sheet 3",
      ic: "🏷️",
      from: "Booklet · Practice sheet p. 9",
      keep: true,
      items: [
        ["1", "Retina", "It is at the [back] of the eye."],
        ["2", "Optic nerve", "It goes from the eye to the [brain]."],
        [
          "3",
          "Pupil",
          "It is the hole at the [front] where the light comes in.",
        ],
        ["4", "Lens", "It is [behind] the pupil."],
      ].map(([n, right, x]) =>
        mc(
          `What is box [${n}]?`,
          eye(
            right,
            ...["Retina", "Optic nerve", "Pupil", "Lens"].filter(
              (w) => w !== right,
            ),
          ),
          { img: "label-eye", x },
        ),
      ),
    },
    {
      k: "ps-sort",
      t: "Transparent, translucent, opaque",
      en: "Booklet · Practice sheet 4",
      ic: "🪟",
      from: "Booklet · Practice sheet p. 9",
      items: [
        {
          type: "sort",
          q: "Sort the objects: how much light goes through?",
          img: "curtains",
          cols: [
            { k: "tp", t: "Transparent", ex: "almost all light", e: "🪟" },
            { k: "tl", t: "Translucent", ex: "some light", e: "🌫️" },
            { k: "op", t: "Opaque", ex: "no light", e: "🧱" },
          ],
          words: [
            { w: "clear plastic cup", k: "tp", e: "🥤" },
            { w: "a wooden chair", k: "op", e: "🪑" },
            { w: "fabrics", k: "op", e: "🧶" },
            { w: "paper", k: "tl", e: "📄" },
            { w: "keys", k: "op", e: "🔑" },
            { w: "milk carton", k: "op", e: "🥛" },
            { w: "jellyfish", k: "tl", e: "🪼" },
            { w: "stained glass window", k: "tl", e: "⛪" },
            { w: "clean window", k: "tp", e: "🪟" },
            { w: "tissue paper", k: "tl", e: "🧻" },
            { w: "plastic water bottle", k: "tp", e: "🍶" },
            { w: "clear plastic bag", k: "tp", e: "🛍️" },
          ],
        },
      ],
    },
    {
      k: "ps-spectrum",
      t: "Choose: colors and the spectrum",
      en: "Booklet · Practice sheet 5 and 6",
      ic: "🌈",
      from: "Booklet · Practice sheet p. 10–11",
      keep: true,
      items: [
        mc(
          "Waves of white light contain ___",
          [
            ["all the colors of the rainbow", "e-white-light"],
            ["half the colors of the rainbow", "🔴🟡"],
            ["no colors of the rainbow", "⬜"],
          ],
          {
            img: "prism",
            x: "A prism splits white light into [all] the rainbow colors.",
          },
        ),
        mc(
          "We see the apple red, because ___",
          [
            [
              "the apple absorbs all the colors of the rainbow except the red, which is reflected.",
              "🍎↩️",
            ],
            ["the apple absorbs all the colors.", "⬛"],
            ["the apple reflects all colors.", "⬜"],
          ],
          {
            vis: APPLE,
            x: "The apple takes in (absorbs) the other colors. Only the [red] light bounces back into our eyes.",
          },
        ),
        mc(
          "The ___ connects the eye to the brain.",
          [
            ["optic nerve", "e-eye-nerve"],
            ["iris", "e-front-iris"],
            ["pupil", "e-front-pupil"],
          ],
          { emoji: "👁️🧠" },
        ),
        mc(
          "The visible light wavelengths range between ___ nanometers.",
          [
            ["380 to 780", "e-visible"],
            ["200 to 700", "❓"],
            ["500 to 1000", "❓"],
          ],
          {
            img: "spectrum",
            x: "The book: visible light is between [380] and [780] nanometers.",
          },
        ),
        mc(
          "The ___ is used to image the bones inside your body.",
          [
            ["X-ray", "xray"],
            ["infrared", "🌡️"],
            ["visible light", "🌈"],
          ],
          {
            emoji: "🦴🏥",
            x: "Bones [absorb] X-rays, so the bones show on the X-ray picture.",
          },
        ),
        mc(
          "All are invisible light except ___",
          [
            ["visible light from the sun", "☀️🌈"],
            ["microwave", "🍲"],
            ["X-ray", "🩻"],
          ],
          {
            img: "spectrum",
            x: "We can [see] the light from the Sun. We cannot see microwaves or X-rays.",
          },
        ),
        {
          type: "multi",
          q: 'Mark\'s spectrum. Which waves should be labeled "[Invisible] light waves"? (choose all)',
          opts: [
            { t: "radio waves", emoji: "📻", ok: true },
            { t: "microwaves", emoji: "🍲", ok: true },
            { t: "X-rays", emoji: "🩻", ok: true },
            { t: "blue light", emoji: "🔵" },
          ],
          x: "Blue light is a color of the rainbow: we can see it. The others we [cannot] see.",
        },
        seeing("lion", "🦁"),
      ],
    },
    {
      k: "quiz",
      t: "Lesson Quiz",
      en: "Booklet · Lesson Quiz",
      ic: "⭐",
      from: "Booklet · Lesson Quiz p. 12–15",
      keep: true,
      items: [
        mc(
          "A camera is like an eye. The ___ of a camera works like the [lens] of an eye.",
          [
            ["lens", "e-eye-lens"],
            ["retina", "e-eye-retina"],
            ["pupil", "e-eye-pupil"],
          ],
          { img: "camera-eye", x: "Both lenses [focus] the light." },
        ),
        mc(
          "The ___ of a camera works like the [retina] of an eye.",
          [
            ["digital sensor", "📷🔲"],
            ["aperture", "📷⭕"],
            ["lens", "🔍"],
          ],
          {
            img: "camera-eye",
            x: "The digital sensor [receives the image], like the retina.",
          },
        ),
        mc(
          "The ___ of a camera works like the [pupil] of an eye.",
          [
            ["aperture", "📷⭕"],
            ["digital sensor", "📷🔲"],
            ["lens", "🔍"],
          ],
          {
            img: "camera-eye",
            x: "The aperture [opens and closes] to let light in, like the pupil.",
          },
        ),
        seeing("dog", "🐕"),
        mc(
          'Noelle\'s spectrum. Which wave should be labeled "absorbed by dense materials inside the human body"?',
          [
            ["X-rays", "xray"],
            ["blue light", "🔵"],
            ["radio waves", "📻"],
            ["microwaves", "🍲"],
          ],
          {
            img: "spectrum",
            x: "Dense materials = hard things like [bones]. Bones absorb X-rays.",
          },
        ),
        {
          type: "multi",
          q: "Cody's table. Which [two] samples could refract a beam of light?",
          opts: [
            {
              t: "Q: round, transparent, colorless",
              img: "e-sample-q",
              ok: true,
            },
            { t: "T: cube, transparent, green", img: "e-sample-t", ok: true },
            { t: "R: rectangle, opaque, shiny", img: "e-sample-r" },
            { t: "S: round, opaque, rough, dull", img: "e-sample-s" },
          ],
          x: "Q and T are [transparent]: light goes through them and bends.",
        },
        mc(
          "Which is the [best] reason the two samples will refract light?",
          [
            ["Light can go through a transparent material.", "e-through"],
            ["Light cannot travel through an opaque material.", "🧱"],
            ["Light can bounce off a shiny material.", "e-reflect"],
            ["Light can be scattered by a rough surface.", "e-sample-s"],
          ],
          {
            img: "cody-table",
            x: "To refract (bend), the light must go [through] the material. Q and T are transparent.",
          },
        ),
        mc(
          "Based on Cody's data, what happens when you shine a light on sample [R]?",
          [
            [
              "Most of the light will bounce off sample R and move in a new direction.",
              "e-reflect",
            ],
            ["Most of the light will be absorbed by sample R.", "e-absorb"],
            [
              "Most of the light will be slowed down as it strikes sample R.",
              "🐢",
            ],
            [
              "Most of the light will disappear as it reaches and leaves sample R.",
              "💨",
            ],
          ],
          {
            img: "e-sample-r",
            x: "R is [shiny] and opaque: the light cannot go through, it bounces off (reflects), like on a mirror.",
          },
        ),
      ],
    },
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
