// Science · Grade 4 · Topic 3 · Lesson 1 « Properties of Waves » (book pages 106–113).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Learn: the book and the teacher's slides (WAVE PROPERTIES). Exercises: the slides' fill-in blanks, Term 2 booklet practice sheet (pp. 2–3) + Lesson Quiz (pp. 4–6),
// and the book's own questions. The booklet has no answer key: see grade-4/science/UNVERIFIED.md.
// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-1/
// (the e-*.jpg drawings: .claude/skills/science-lesson/scripts/pictures/topic-3-lesson-1.py) or 1–2 emoji.
const mc = (q, answers, more) => {
  const isImg = (p) => /^[a-z][a-z0-9-]*$/.test(p);
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
const PART = {
  Crest: "e-crest",
  Trough: "e-trough",
  Amplitude: "e-amplitude",
  Wavelength: "e-wavelength",
  Frequency: "e-freq-high",
};
const PART_NAMES = Object.keys(PART);
const LONG_PART = {
  Compression: "e-compression",
  Rarefaction: "e-rarefaction",
  Wavelength: "e-wavelength-long",
};
const LONG_NAMES = Object.keys(LONG_PART);
const TRANS = ["Transverse wave", "e-transverse"];
const LONG = ["Longitudinal wave", "e-longitudinal"];
// animated emoji pictures (Kit.scene, shared/common.js)
const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
const STORM = SC(
  "rain",
  [
    { e: "⚡", x: 30, y: 30, s: 26, a: "blink" },
    { t: "1. see", x: 30, y: 72, s: 9, c: "good" },
    { e: "🔊", x: 72, y: 30, s: 22, a: "pop:1.5" },
    { t: "2. hear", x: 72, y: 72, s: 9, c: "plain", a: "pop:1.5" },
  ],
  "light first, then sound",
);
const SPACE = SC(
  "night",
  [
    { e: "🧑‍🚀", x: 25, y: 55, s: 26 },
    { e: "🧑‍🚀", x: 75, y: 55, s: 26, f: 1 },
    { t: "🔇 no air", x: 50, y: 22, s: 9, c: "light", a: "pop:0.5" },
  ],
  "no air: no sound",
);
const RACE = SC(
  "sky",
  [
    { e: "💡", x: 12, y: 22, s: 16, dx: 74, a: "go" },
    { e: "🔊", x: 12, y: 50, s: 16, dx: 45, a: "go" },
    { e: "🌊", x: 12, y: 78, s: 16, dx: 18, a: "go" },
    { e: "🏁", x: 92, y: 50, s: 18 },
  ],
  "light · sound · water wave",
);
const POND = SC(
  "grass",
  [
    { e: "🪨", x: 50, y: 20, s: 16, dy: 30, a: "fall" },
    { e: "⭕", x: 50, y: 60, s: 18, a: "grow" },
  ],
  "the circles spread out and get smaller",
);
const RAFT = SC(
  "sky",
  [
    { e: "🌊", x: 18, y: 68, s: 26, dx: 30, a: "go" },
    { e: "🛶", x: 40, y: 62, s: 20, dx: 30, a: "go" },
    { e: "🏝️", x: 86, y: 58, s: 24 },
  ],
  "the wave pushes the raft",
);
const MOVE_BOX = SC(
  "room",
  [{ e: "📦", x: 20, y: 60, s: 24, dx: 60, a: "go" }],
  "move to another place",
);
const TSUNAMI = SC(
  "sky",
  [
    { e: "🌊", x: 18, y: 60, s: 34, dx: 35, a: "go" },
    { e: "🏠", x: 80, y: 62, s: 22, a: "shake" },
  ],
  "a giant wave hits the land",
);
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
    { w: "Vibration", m: "something moves back and forth: it makes a wave" },
    { w: "Medium", m: "the material a wave travels through" },
    { w: "Wave speed", m: "how fast a wave travels" },
    { w: "Compression", m: "where a longitudinal wave squeezes together" },
    { w: "Rarefaction", m: "where a longitudinal wave spreads out" },
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
      img: "tuning-fork",
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
        "[Wave speed]: how fast a wave travels.",
        "[Light] is faster than [sound]. Sound is faster than a [water] wave.",
        "Light could go around the Earth [7 times] in less than one second.",
        "We [see] lightning before we [hear] thunder.",
      ],
      img: "sun-earth",
    },
    {
      t: "Amplitude",
      lines: [
        "[Amplitude]: how high the wave is from the middle.",
        "On a drum: how [far] the drum's surface moves from where it rests.",
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
      img: "e-wavelength",
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
        "The wave [squeezes] together ([compression]) and [spreads] out ([rarefaction]).",
        "Sound waves are like this.",
      ],
      img: "longitudinal",
    },
    {
      t: "Waves carry energy, not water",
      lines: [
        "Waves [transfer] energy, not the water.",
        "A wave on a spring: the coils move back and forth, then go [back] to their place.",
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
      ].map(([q, right, img]) =>
        mc(
          q,
          [right, ...PART_NAMES.filter((w) => w !== right)]
            .slice(0, 3)
            .map((w) => [w, PART[w]]),
          { img },
        ),
      ),
    },
    {
      k: "sound",
      t: "Loud or quiet, high or low",
      en: "Amplitude, frequency, speed",
      ic: "🔊",
      items: [
        mc(
          "A sound wave with a [big] amplitude is ___",
          [
            ["loud", "e-loud"],
            ["quiet", "e-quiet"],
          ],
          { img: "e-loud", two: true },
        ),
        mc(
          "A sound wave with a [small] amplitude is ___",
          [
            ["quiet", "e-quiet"],
            ["loud", "e-loud"],
          ],
          { img: "e-quiet", two: true },
        ),
        mc(
          "A sound wave with a [high] frequency has a ___ sound",
          [
            ["high", "🐦"],
            ["low", "🐻"],
          ],
          {
            img: "e-freq-high",
            two: true,
            x: "Many waves every second = a [high] sound, like a bird. Few waves = a low sound, like a bear.",
          },
        ),
        mc(
          "More waves every second: the waves are ___",
          [
            ["shorter", "e-freq-high"],
            ["longer", "e-freq-low"],
          ],
          { img: "e-freq-high", two: true },
        ),
        mc(
          "Which travels [faster]?",
          [
            ["Light", "⚡"],
            ["Sound", "🔊"],
          ],
          {
            vis: STORM,
            two: true,
            x: "In a storm we [see] the lightning first and [hear] the thunder later.",
          },
        ),
        mc(
          "In outer space you hear ___",
          [
            ["nothing: there is no air", "🔇"],
            ["everything", "🔊"],
          ],
          {
            vis: SPACE,
            two: true,
            x: "Sound needs [air] (a medium) to travel. Space has no air.",
          },
        ),
      ],
    },
    {
      k: "type",
      t: "Transverse or longitudinal?",
      en: "Two kinds of waves",
      ic: "↕️",
      items: [
        [
          "Particles move [up and down]. The wave moves sideways.",
          "t",
          "e-transverse",
        ],
        [
          "Particles move [back and forth], the same way as the wave.",
          "l",
          "e-longitudinal",
        ],
        ["It has [crests] and [troughs].", "t", "e-crest"],
        ["It [squeezes] together and [spreads] out.", "l", "e-compression"],
        ["A [sound] wave in the air.", "l", "e-longitudinal"],
        ["Shake a rope [up and down].", "t", "e-transverse"],
      ].map(([q, t, img]) =>
        mc(q, t === "t" ? [TRANS, LONG] : [LONG, TRANS], { img }),
      ),
    },
    {
      k: "carry",
      t: "What do waves carry?",
      en: "Energy, not water",
      ic: "⛵",
      items: [
        mc(
          "A wave passes an anchored boat. The boat ___",
          [
            ["moves up and down", "⬆️⬇️"],
            ["is pushed to the shore", "🏝️"],
          ],
          {
            img: "boat",
            x: "The anchor holds the boat. The wave carries [energy], not the water, so the boat only goes up and down.",
          },
        ),
        mc(
          "A wave carries ___",
          [
            ["energy", "⚡"],
            ["the water to the shore", "💧"],
          ],
          {
            img: "surfer",
            two: true,
            x: "The water goes up and down. The [energy] moves on.",
          },
        ),
        mc(
          "A pebble falls into a pond. The waves get ___ as they spread.",
          [
            ["smaller", "e-quiet"],
            ["bigger", "e-loud"],
          ],
          { vis: POND, two: true },
        ),
        mc(
          "Where does the energy of the pond waves go?",
          [
            ["It spreads over a bigger area", "⭕"],
            ["It disappears", "💨"],
          ],
          {
            vis: POND,
            x: "The energy is not lost. The circle gets [bigger], so the energy spreads out.",
          },
        ),
        mc(
          "What makes waves?",
          [
            ["Vibrations", "tuning-fork"],
            ["Colors", "🎨"],
            ["Shadows", "👤"],
          ],
          { img: "drummer" },
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "slides",
      t: "Teacher's slides",
      en: "Fill in the blanks",
      ic: "🖥️",
      from: "Teacher's slides · Properties of waves",
      keep: true,
      items: [
        mc(
          "___ and ___ are types of waves.",
          [
            ["Light … sound", "💡🔊"],
            ["Rocks … sand", "🪨🏖️"],
            ["Wood … glass", "🪵🥛"],
          ],
          { img: "sun-earth" },
        ),
        mc(
          "A wave is a ___ that carries ___ and travels in a repeating pattern.",
          [
            ["disturbance … energy", "e-transverse"],
            ["rock … water", "🪨💧"],
            ["color … light", "🎨💡"],
          ],
          {
            img: "surfer",
            x: "A disturbance = something that moves and shakes. The wave carries [energy]: it can move the surfer.",
          },
        ),
        mc(
          "The disturbances that cause waves are ___",
          [
            ["vibrations", "tuning-fork"],
            ["colors", "🎨"],
            ["shadows", "👤"],
          ],
          { img: "tuning-fork" },
        ),
        mc(
          "When objects vibrate, they move back and forth. One back-and-forth motion causes one ___",
          [
            ["complete wave", "e-one-wave"],
            ["medium", "🌬️"],
            ["trough", "e-trough"],
          ],
          { img: "tuning-fork" },
        ),
        mc(
          "Light waves can travel through [empty space]. Other waves need a material to travel through. This material is called a ___",
          [
            ["medium", "🌬️💧🪵"],
            ["crest", "e-crest"],
            ["frequency", "e-freq-high"],
          ],
          {
            img: "sun-earth",
            x: "A medium is air, water or wood. Sound needs a medium. Light does not: it comes from the Sun through space.",
          },
        ),
        mc(
          "The wave speed is ___ a wave travels.",
          [
            ["how fast", "🏃💨"],
            ["how high", "e-amplitude"],
            ["how loud", "🔊"],
          ],
          { vis: RACE },
        ),
        mc(
          "Which wave is the [fastest]?",
          [
            ["Light", "💡"],
            ["Sound", "🔊"],
            ["Water wave", "🌊"],
          ],
          {
            vis: RACE,
            x: "Light is faster than sound, and sound is faster than a water wave.",
          },
        ),
        mc(
          "Why is it silent in outer space?",
          [
            [
              "Sound needs a medium. In space there is no air to carry the sound.",
              "🚀🚫",
            ],
            ["Space is too cold for sound.", "🥶"],
            ["Sound is faster than light.", "🔊💡"],
          ],
          {
            vis: SPACE,
            x: "Sound needs [air] to travel. There is no air in space, so there is no sound.",
          },
        ),
        mc(
          "Wave characteristics depend on the ___ that causes the wave.",
          [
            ["vibration", "tuning-fork"],
            ["color", "🎨"],
            ["medium", "🌬️"],
          ],
          {
            img: "drummer",
            x: "Hit the drum [hard]: a big vibration, a loud sound. Hit it softly: a small vibration, a quiet sound.",
          },
        ),
        {
          type: "order",
          t: "How a drum makes a sound wave",
          ask: "Put the steps in order.",
          hint: "Start with the drumsticks.",
          steps: [
            {
              say: "A hit from the drumsticks makes the drum's surface move back and forth.",
              img: "drummer",
            },
            { say: "The drum's surface pushes the air near it.", e: "🥁💨" },
            { say: "This makes a sound wave in the air.", e: "🔊" },
          ],
        },
        mc(
          "The greatest height of the wave from its resting position is called ___",
          [
            ["amplitude", "e-amplitude"],
            ["wavelength", "e-wavelength"],
            ["frequency", "e-freq-high"],
          ],
          { img: "amplitude" },
        ),
        mc(
          "___ amplitude sound waves are louder than low amplitude sound waves.",
          [
            ["High", "e-loud"],
            ["Low", "e-quiet"],
          ],
          { img: "drummer", two: true },
        ),
        mc(
          "High frequency sound waves have a ___ pitch.",
          [
            ["higher", "🐦"],
            ["lower", "🐻"],
          ],
          {
            img: "e-freq-high",
            two: true,
            x: "Pitch: how high or low a sound is. A bird sings [high], a bear growls low.",
          },
        ),
        mc(
          "More frequent waves are ___, even in the same medium.",
          [
            ["shorter", "e-freq-high"],
            ["longer", "e-freq-low"],
          ],
          { img: "frequency", two: true },
        ),
        mc(
          "You send a wave along a spring. After the wave has passed, the coils ___",
          [
            ["return to their place", "e-longitudinal"],
            ["move to the end of the spring", "➡️🔚"],
          ],
          {
            img: "longitudinal",
            x: "The wave [transfers] the energy. The coils only move back and forth, then stop where they were.",
          },
        ),
        mc(
          "Transfer means to ___",
          [
            ["relocate (move to another place)", "📦➡️"],
            ["make bigger", "➕"],
            ["stop", "🛑"],
          ],
          {
            vis: MOVE_BOX,
            x: "The box goes from [here] to [there]: it is relocated. A wave transfers energy the same way.",
          },
        ),
      ],
    },
    {
      k: "ps-label",
      t: "Label the waves",
      en: "Booklet · Practice sheet 1 and 3",
      ic: "🏷️",
      from: "Booklet · Practice sheet p. 2–3",
      keep: true,
      items: [
        ...[
          [
            "1",
            "Wavelength",
            "It is the distance from one crest to the next crest.",
          ],
          ["2", "Crest", "It is the top of the wave."],
          [
            "3",
            "Amplitude",
            "The arrow shows the height from the middle line to the crest.",
          ],
          ["4", "Trough", "It is the bottom of the wave."],
        ].map(([n, right, x]) =>
          mc(
            `What is box [${n}]?`,
            [
              right,
              ...PART_NAMES.filter((w) => w !== right && w !== "Frequency"),
            ].map((w) => [w, PART[w]]),
            { img: "label-wave", x },
          ),
        ),
        ...[
          ["1", "Wavelength", "From one compression to the next compression."],
          ["2", "Compression", "The coils are squeezed close together."],
          ["3", "Rarefaction", "The coils are spread out."],
        ].map(([n, right, x]) =>
          mc(
            `What is box [${n}]?`,
            [right, ...LONG_NAMES.filter((w) => w !== right)].map((w) => [
              w,
              LONG_PART[w],
            ]),
            { img: "label-long", x },
          ),
        ),
        mc("This type of wave is called a ___", [LONG, TRANS], {
          img: "label-long",
          x: "It squeezes together and spreads out.",
        }),
      ],
    },
    {
      k: "ps-choose",
      t: "Choose",
      en: "Booklet · Practice sheet 2",
      ic: "📝",
      from: "Booklet · Practice sheet p. 2–3",
      items: [
        mc(
          "___ is the disturbance that carries energy and travels in a repeating pattern.",
          [
            ["Wave", "e-transverse"],
            ["Frequency", "e-freq-high"],
            ["Wave period", "⏱️"],
          ],
          { img: "surfer" },
        ),
        mc(
          "___ waves can travel through empty space (they need no medium).",
          [
            ["Light", "💡"],
            ["Sound", "🔊"],
            ["Water", "🌊"],
          ],
          {
            img: "sun-earth",
            x: "Light comes to us from the Sun through empty space.",
          },
        ),
        mc(
          "The greatest distance of the wave from the resting position to the crest is called ___",
          [
            ["Amplitude", "e-amplitude"],
            ["Wavelength", "e-wavelength"],
            ["Frequency", "e-freq-high"],
          ],
          { img: "amplitude" },
        ),
        mc(
          "The distance between similar points (from crest to crest or trough to trough) of the wave is called ___",
          [
            ["wavelength", "e-wavelength"],
            ["frequency", "e-freq-high"],
            ["wave period", "⏱️"],
          ],
          { img: "amplitude" },
        ),
        mc(
          "___ is the number of wave repetitions in a certain amount of time.",
          [
            ["Frequency", "e-freq-high"],
            ["Wavelength", "e-wavelength"],
            ["Wave period", "⏱️"],
          ],
          { img: "frequency" },
        ),
        mc(
          "The ___ is the wave that moves perpendicular (up or down) to the direction of particles.",
          [TRANS, LONG],
          { img: "e-perpendicular" },
        ),
        mc(
          "The ___ is the wave that moves in the same direction (parallel) as the particles vibrate.",
          [LONG, TRANS],
          { img: "e-parallel" },
        ),
      ],
    },
    {
      k: "quiz",
      t: "Lesson Quiz",
      en: "Booklet · Lesson Quiz",
      ic: "⭐",
      from: "Booklet · Lesson Quiz p. 4–6",
      keep: true,
      items: [
        ...[
          ["1", "Wavelength"],
          ["2", "Crest"],
          ["3", "Amplitude"],
          ["4", "Trough"],
        ].map(([n, right]) =>
          mc(
            `Gabriella's model of a transverse wave. What is box [${n}]?`,
            [
              right,
              ...PART_NAMES.filter((w) => w !== right && w !== "Frequency"),
            ].map((w) => [w, PART[w]]),
            { img: "label-wave" },
          ),
        ),
        mc(
          "A transverse wave moves ___ to the particle motion.",
          [
            ["perpendicular", "e-perpendicular"],
            ["parallel", "e-parallel"],
          ],
          {
            img: "e-transverse",
            two: true,
            x: "Perpendicular: the particles go up and down, the wave goes sideways.",
          },
        ),
        mc(
          "A ___ wave moves in the same direction as the particle motion.",
          [
            ["longitudinal", "e-longitudinal"],
            ["taller", "e-loud"],
          ],
          { img: "e-parallel", two: true },
        ),
        mc(
          "Armando's table. Which heading describes [wavelength]?",
          [
            ["Distance between crests", "e-wavelength"],
            ["Wave", "🌊"],
            ["Number of crests", "e-count"],
            ["Height of crests", "e-amplitude"],
          ],
          {
            img: "wave-table",
            x: "Wavelength = the distance from one crest to the next.",
          },
        ),
        mc(
          "The height of the crest represents the ___ of a wave.",
          [
            ["amplitude", "e-amplitude"],
            ["wavelength", "e-wavelength"],
            ["frequency", "e-freq-high"],
          ],
          { img: "wave-table" },
        ),
        mc(
          "Based on the table, the height of the wave is not dependent on the ___",
          [
            ["frequency", "e-count"],
            ["wave speed", "🏃💨"],
          ],
          {
            img: "e-q-r",
            two: true,
            x: "Q and R both have 4 crests, but their heights are different (10 cm and 20 cm). So the height does not depend on how many crests there are.",
          },
        ),
        mc(
          "Picture 1 is wave ___",
          [
            ["T", "e-wave-t"],
            ["S", "e-wave-s"],
          ],
          {
            img: "armando-waves",
            two: true,
            x: "Picture 1 has 8 [short] crests: 8 crests and 10 cm high is wave T.",
          },
        ),
        mc(
          "Picture 2 is wave ___",
          [
            ["S", "e-wave-s"],
            ["T", "e-wave-t"],
          ],
          {
            img: "armando-waves",
            two: true,
            x: "Picture 2 has 8 [tall] crests: 8 crests and 20 cm high is wave S.",
          },
        ),
        mc(
          "Which feature on a model of an ocean wave is the [best] evidence that waves transfer energy?",
          [
            ["Show an ocean wave pushing a raft toward the shore.", "🌊🛶"],
            [
              "Label the wavelength of an ocean wave as 300 centimeters.",
              "e-wavelength",
            ],
            [
              "Label the amplitude of an ocean wave as 300 centimeters.",
              "e-amplitude",
            ],
            ["Show the different colors of an ocean wave.", "🎨"],
          ],
          {
            vis: RAFT,
            x: "Energy makes things [move]. The wave moves the raft: that shows the energy. A length or a color does not.",
          },
        ),
      ],
    },
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
          img: "e-freq-high",
        },
        {
          type: "open",
          q: "A tsunami is a giant water wave made by an earthquake under the ocean. Why is it dangerous when it reaches land?",
          a: "It carries a lot of [energy]. It can destroy buildings and flood the land.",
          vis: TSUNAMI,
        },
        {
          type: "open",
          q: "Why is it silent in outer space?",
          a: "Sound needs a [medium] like air. Space has [no air].",
          vis: SPACE,
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
          vis: POND,
        },
        {
          type: "open",
          q: "How do we know that light travels faster than sound?",
          a: "In a storm we [see] the lightning [before] we [hear] the thunder.",
          vis: STORM,
        },
        {
          type: "open",
          q: "How can you use waves to send a message across a room?",
          a: "With [light] (a blinking flashlight) or [sound] (tapping a code).",
          emoji: "🔦🔊",
        },
      ],
    },
  ],
};
