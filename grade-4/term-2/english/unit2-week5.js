// English · Grade 4 · Unit 2 · Week 5 « Combining Sentences », phrases and interjections, suffixes, similes and metaphors, poetry. Engine: shared/computer-lesson.js (data-subject="English").
// Sources: Classwork Booklet Term 2 (pages 2–14), Homework Booklet Term 2 (pages 3–16); see SOURCES.md. No answer key: answers are unverified (UNVERIFIED.md).
// Teacher-sheet typos fixed: HW p. 7 "The chips was" → "were"; HW p. 11 "bout" → "about".
// Every word is read aloud and lights up; the cards have animated pictures (Kit.scene in shared/common.js).
(function () {
  const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
  const BL = (rows, more) => ({ kind: "blocks", rows, ...more });
  const cj = (q, opts, emoji, x) => ({ type: "mc", q, opts, emoji, x });
  // circle the nouns of each sentence (tap them), then choose the combined sentence; o = [right, wrong, wrong]
  const comb = (s, nouns, label, o, emoji, x) => [
    {
      type: "tapw",
      q: `Tap the [${label}] in each sentence.`,
      s,
      ans: Object.fromEntries(nouns.map((n) => [n, label])),
      emoji,
    },
    {
      type: "mc",
      q: `“${s}” Join them with [and]. Which is right?`,
      opts: o,
      emoji,
      x,
    },
  ];
  // introductory phrase, appositive or interjection; then the right punctuation
  const KINDS = ["introductory phrase", "appositive", "interjection"];
  const pai = (s, k, o, emoji) => [
    {
      type: "mc",
      q: `“${s}” What does this sentence have?`,
      opts: [KINDS[k], ...KINDS.filter((_, i) => i !== k)],
      keep: KINDS,
      emoji,
    },
    {
      type: "mc",
      q: "Which is the right way to write it?",
      opts: o,
      emoji,
      x: [
        "A [comma] after the introductory phrase.",
        "A [comma] before and after the appositive.",
        "An [exclamation point] (or a comma) after the interjection.",
      ][k],
    },
  ];
  // which word has a suffix, and what does it mean
  const sfx = (s, word, others, base, suffix, meaning, wrong, emoji) => [
    {
      type: "mc",
      q: `${s} Which word has a [suffix]?`,
      opts: [word, ...others],
      emoji,
      x: `${word} = ${base} + [${suffix}]`,
    },
    {
      type: "mc",
      q: `What does “${word}” mean?`,
      opts: [meaning, ...wrong],
      emoji,
    },
  ];
  // simile or metaphor? a, b = the two things compared
  const fm = (s, kind, a, b, emoji) => ({
    type: "mc",
    q: `“${s}” Is it a simile or a metaphor?`,
    opts: kind === "simile" ? ["simile", "metaphor"] : ["metaphor", "simile"],
    keep: ["simile", "metaphor"],
    emoji,
    x: `It compares [${a}] and [${b}]${kind === "simile" ? " with like or as." : ", without like or as."}`,
  });
  const fmean = (s, meaning, wrong, emoji) => ({
    type: "mc",
    q: `“${s}” What does it mean?`,
    opts: [meaning, ...wrong],
    emoji,
  });
  // the missing suffix of a spelling word (Homework page 5)
  const ms = (base, suffix, wrong, emoji) => ({
    type: "mc",
    q: `${base} + ___ = a spelling word`,
    opts: [suffix, ...wrong],
    emoji,
    x: `${base} + ${suffix} = [${base}${suffix}]`,
  });

  window.LESSON = {
    n: 25,
    key: "en4-u2w5",
    grade: 4,
    title: "Combining Sentences",
    unit: "Unit 2 · Week 5",
    book: "Wonders",
    hub: "../../term-1/english/index.html",
    imgDir: "img/unit2-week5",
    cover: "cover",
    question: {
      q: "How are writers [inspired] by animals?",
      a: "Writers [watch] animals and wonder about them. They write [poems] that compare animals to other things, like deer tails to [arrows], to show how the animals look, move and make us feel.",
      img: "cover",
    },

    stories: [
      {
        t: "Deer",
        en: "Classwork booklet · simile and metaphor",
        path: "story-deer.html",
        cover: { src: "img/deer/deer.jpg" },
      },
      {
        t: "The Nautilus",
        en: "Classwork booklet · a lyric poem",
        path: "story-nautilus.html",
        cover: { src: "img/nautilus/nautilus.jpg" },
      },
      {
        t: "The Beauty of Nature",
        en: "Homework booklet · a haiku",
        path: "story-beauty-nature.html",
        cover: { src: "img/beauty-nature/leaves.jpg" },
      },
      {
        t: "The Magic of Rain",
        en: "Homework booklet · a lyric poem",
        path: "story-magic-rain.html",
        cover: { src: "img/magic-rain/raindrops.jpg" },
      },
    ].map((s) => ({ ...s, g: "📖 Reading · Poetry" })),

    decks: [
      {
        k: "poetry",
        g: "📖 Reading · Poetry",
        t: "How to read a poem",
        en: "Lyric poem, haiku, rhyme, meter",
        ic: "🎵",
        cover: {
          vis: SC("sky", [
            { e: "📜", x: 36, y: 52, s: 36 },
            { e: "🎵", x: 70, y: 36, s: 20, a: "float" },
          ]),
        },
        cards: [
          {
            t: "A stanza",
            lines: [
              "A [stanza] is a group of lines in a poem, like a paragraph.",
              "“Deer” has 6 stanzas. A space comes between them.",
            ],
            vis: SC(
              "plain",
              [
                { t: "— — — —", x: 50, y: 18, s: 8, c: "plain", a: "pop:0.2" },
                { t: "— — — —", x: 50, y: 30, s: 8, c: "plain", a: "pop:0.4" },
                { t: "— — — —", x: 50, y: 56, s: 8, c: "good", a: "pop:1" },
                { t: "— — — —", x: 50, y: 68, s: 8, c: "good", a: "pop:1.2" },
              ],
              "2 stanzas",
            ),
          },
          {
            t: "Rhyme",
            lines: [
              "Words [rhyme] when they end with the same sound: high, sky, goodbye.",
              "The rhyme gives the poem a [beat], like a song.",
            ],
            vis: SC(
              "sky",
              [
                { e: "⬆️", x: 24, y: 50, s: 20, a: "pop:0.2" },
                { e: "☁️", x: 50, y: 34, s: 24, a: "pop:0.7" },
                { e: "👋", x: 76, y: 50, s: 20, a: "pop:1.2 wave:1.6" },
                { t: "high · sky · goodbye", x: 50, y: 80, s: 8, c: "good" },
              ],
              "rhyming words",
            ),
          },
          {
            t: "Rhyme scheme",
            lines: [
              "The [rhyme scheme] tells which lines rhyme. We use letters.",
              "ABAB: lines 1 and 3 rhyme, lines 2 and 4 rhyme (sea, octopus, me, nautilus).",
              "AABB: the lines rhyme in pairs (windowpane, refrain, new, hue).",
            ],
            src: "img/nautilus/nautilus.jpg",
          },
          {
            t: "Meter and syllables",
            lines: [
              "A [syllable] is one beat of a word: gol-den = 2 syllables.",
              "The [meter] is the beat of the lines: how many syllables each line has.",
              "See the bug on the rug = 6 syllables.",
            ],
            vis: SC(
              "plain",
              [
                { t: "gol", x: 30, y: 46, s: 12, c: "good", a: "pop:0.2" },
                { t: "den", x: 64, y: 46, s: 12, c: "good", a: "pop:0.8" },
                { e: "👏", x: 30, y: 78, s: 14, a: "pop:0.2" },
                { e: "👏", x: 64, y: 78, s: 14, a: "pop:0.8" },
              ],
              "clap the syllables",
            ),
          },
          {
            t: "A lyric poem",
            lines: [
              "A [lyric poem] tells the poet’s own [feelings] and thoughts.",
              "It often has rhyme and rhythm, like a song.",
              "“The Nautilus” and “The Magic of Rain” are lyric poems.",
            ],
            vis: SC(
              "rain",
              [
                { e: "😌", x: 40, y: 56, s: 30 },
                { e: "🎵", x: 70, y: 34, s: 16, a: "float" },
                { e: "❤️", x: 20, y: 30, s: 14, a: "pulse" },
              ],
              "feelings, like a song",
            ),
          },
          {
            t: "A haiku",
            lines: [
              "A [haiku] is a short poem from Japan, about [nature].",
              "It has 3 lines: [5], [7] and [5] syllables.",
              "Golden leaves falling (5) / Crisp air whispers through the trees (7) / Autumn’s song begins (5)",
            ],
            src: "img/beauty-nature/leaves.jpg",
          },
          {
            t: "The speaker",
            lines: [
              "The [speaker] is the person who talks in the poem (I, me, we).",
              "In “Deer”, the speaker watches the deer and wonders where they go.",
            ],
            src: "img/deer/deer.jpg",
          },
        ],
      },
      {
        k: "words",
        g: "🔤 Vocabulary",
        t: "4 new words",
        en: "creative · brittle · descriptive · outstretched",
        ic: "🔤",
        cover: {
          vis: SC("plain", [
            { e: "🎨", x: 34, y: 50, s: 34 },
            { e: "🍪", x: 70, y: 50, s: 26, a: "shake" },
          ]),
        },
        cards: [
          {
            t: "creative",
            lines: [
              "[creative] = good at making new things and new ideas.",
              "The young artist used her creative imagination to paint a beautiful picture.",
            ],
            vis: SC(
              "room",
              [
                { e: "🧑‍🎨", x: 30, y: 60, s: 32 },
                { e: "🖼️", x: 68, y: 54, s: 30, a: "pop:0.6" },
                { e: "💡", x: 30, y: 22, s: 16, a: "pulse" },
              ],
              "new ideas",
            ),
          },
          {
            t: "brittle",
            lines: [
              "[brittle] = hard, but it breaks [easily].",
              "The chips were brittle, so they broke easily when I tried to eat them.",
            ],
            vis: SC(
              "room",
              [
                { e: "🍪", x: 40, y: 50, s: 34, a: "shake" },
                { e: "💥", x: 66, y: 40, s: 18, a: "pop:1" },
              ],
              "it breaks easily",
            ),
          },
          {
            t: "descriptive",
            lines: [
              "[descriptive] = telling clearly how something looks, sounds or feels.",
              "The poem was very descriptive. It helped me to imagine the scene.",
            ],
            vis: SC(
              "room",
              [
                { e: "📖", x: 30, y: 60, s: 30 },
                { e: "💭", x: 66, y: 34, s: 30, a: "pop:0.5" },
                { e: "🦌", x: 66, y: 34, s: 14, a: "pop:0.9" },
              ],
              "I can see it in my mind",
            ),
          },
          {
            t: "outstretched",
            lines: [
              "[outstretched] = stretched out as far as possible.",
              "Suzan outstretched her hand to help her friend up the steep hill.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🧍", x: 34, y: 50, s: 30 },
                { e: "🫱", x: 52, y: 60, s: 16, dx: 10, a: "go" },
                { e: "🧗", x: 72, y: 72, s: 26 },
              ],
              "a hand stretched out to help",
            ),
          },
        ],
      },
      {
        k: "combine",
        g: "🧩 Grammar · Combining sentences",
        t: "Combining sentences",
        en: "Join two nouns with and",
        ic: "🧩",
        cover: {
          vis: BL(
            [
              [
                ["Jamal", "i"],
                ["and", "c"],
                ["Teri", "i"],
                ["wash the dishes.", "l"],
              ],
            ],
            { legend: false },
          ),
        },
        cards: [
          {
            t: "Two subjects → one sentence",
            lines: [
              "Jamal washes the dishes. Teri washes the dishes.",
              "Join the two nouns in the [subject] with [and]: Jamal and Teri wash the dishes.",
              "Leave out the words that repeat.",
            ],
            vis: BL(
              [
                [
                  ["Jamal", "i"],
                  ["and", "c"],
                  ["Teri", "i"],
                  ["wash the dishes.", "l"],
                ],
              ],
              { title: "two subject nouns + and", legend: false },
            ),
          },
          {
            t: "Subject and verb agree",
            lines: [
              "One person: Jamal [washes]. Two people: Jamal and Teri [wash].",
              "Kelsey goes. Kelsey and Alvin [go].",
            ],
            vis: SC(
              "room",
              [
                { e: "🧒", x: 22, y: 60, s: 26 },
                { t: "washes", x: 22, y: 22, s: 8, c: "good" },
                { e: "🧒", x: 62, y: 60, s: 24 },
                { e: "👧", x: 80, y: 60, s: 24 },
                { t: "wash", x: 71, y: 22, s: 8, c: "good", a: "pop:0.8" },
              ],
              "one → washes · two → wash",
            ),
          },
          {
            t: "Predicate nouns",
            lines: [
              "A [predicate noun] comes after a linking verb (is, am, are, was, seemed) and renames the subject.",
              "Tana is a [student]. Tana is a [ballerina].",
            ],
            vis: SC(
              "stage",
              [
                { e: "🩰", x: 30, y: 60, s: 30, a: "spin" },
                { e: "🎒", x: 70, y: 60, s: 26 },
                { t: "student · ballerina", x: 50, y: 20, s: 8, c: "good" },
              ],
              "two names for Tana",
            ),
          },
          {
            t: "Two predicate nouns → one sentence",
            lines: [
              "Join the two nouns in the [predicate] with [and].",
              "Tana is a student and a ballerina.",
            ],
            vis: BL(
              [
                [
                  ["Tana is", "l"],
                  ["a student", "i"],
                  ["and", "c"],
                  ["a ballerina.", "i"],
                ],
              ],
              { title: "two predicate nouns + and", legend: false },
            ),
          },
        ],
      },
      {
        k: "phrases",
        g: "🧩 Grammar · Phrases and interjections",
        t: "Phrases, appositives, interjections",
        en: "Where the commas go",
        ic: "❗",
        cover: {
          vis: SC("plain", [
            { t: "Oh, no!", x: 50, y: 44, s: 14, c: "bad", a: "pop shake:0.6" },
          ]),
        },
        cards: [
          {
            t: "An introductory phrase",
            lines: [
              "An [introductory phrase] comes at the [beginning] of a sentence.",
              "Put a [comma] after it: In the beginning, singing so loudly was fun.",
              "More: Once upon a time, … Yesterday, … After school, …",
            ],
            vis: BL(
              [
                [
                  ["In the beginning", "f"],
                  [",", "p"],
                  ["singing so loudly was fun.", "i"],
                ],
              ],
              { title: "phrase + comma", legend: false },
            ),
          },
          {
            t: "An appositive",
            lines: [
              "An [appositive] is a noun that tells more about the noun right before it.",
              "Put a comma [before] and [after] it: Shawna, my cousin, is very tall.",
            ],
            vis: SC(
              "school",
              [
                { e: "👩", x: 40, y: 56, s: 40 },
                { t: "Shawna, my cousin,", x: 50, y: 16, s: 8, c: "good" },
                { e: "📏", x: 72, y: 52, s: 22, a: "grow" },
              ],
              "my cousin = Shawna",
            ),
          },
          {
            t: "An interjection",
            lines: [
              "An [interjection] shows a feeling: Oh, no! Ouch! Wow! Hey! Ah!",
              "It is often followed by an [exclamation point]: Oh, no! Our basement is flooding.",
            ],
            vis: SC(
              "rain",
              [
                { e: "🏠", x: 40, y: 56, s: 36 },
                { e: "💧", x: 60, y: 74, s: 14, a: "pulse" },
                {
                  t: "Oh, no!",
                  x: 70,
                  y: 22,
                  s: 10,
                  c: "bad",
                  a: "pop:0.5 shake:1",
                },
              ],
              "a feeling!",
            ),
          },
        ],
      },
      {
        k: "suffix",
        g: "🔊 Phonics · Suffixes",
        t: "Suffixes",
        en: "-ness · -ly · -est · -ful · -less · -fully",
        ic: "🧱",
        cover: {
          vis: SC("plain", [
            { t: "care", x: 34, y: 46, s: 12, c: "light" },
            { t: "+ ful", x: 64, y: 46, s: 12, c: "good", a: "pop:0.6" },
          ]),
        },
        cards: [
          {
            t: "A suffix",
            lines: [
              "A [suffix] is added to the [end] of a word. It changes the word’s meaning.",
              "dark + ness = darkness · quick + ly = quickly",
            ],
            vis: SC(
              "night",
              [
                { t: "dark", x: 34, y: 46, s: 12, c: "light" },
                { t: "+ ness", x: 66, y: 46, s: 12, c: "good", a: "pop:0.6" },
                { e: "🌙", x: 80, y: 18, s: 14 },
              ],
              "darkness",
            ),
          },
          {
            t: "-ness and -est",
            lines: [
              "[-ness] means “the state of”: sad → sadness, ill → illness.",
              "[-est] means “most”: fast → fastest, clear → clearest.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🐢", x: 20, y: 66, s: 20 },
                { e: "🐇", x: 46, y: 66, s: 22 },
                { e: "🐆", x: 76, y: 66, s: 26, dx: 14, a: "go" },
                { t: "fastest", x: 76, y: 24, s: 8, c: "good" },
              ],
              "-est = most",
            ),
          },
          {
            t: "-ful and -less",
            lines: [
              "[-ful] means “full of”: thought → thoughtful, wonder → wonderful.",
              "[-less] means “without”: pain → painless, power → powerless.",
            ],
            vis: SC(
              "room",
              [
                { e: "🥄", x: 30, y: 56, s: 30 },
                { t: "spoonful", x: 30, y: 20, s: 8, c: "good" },
                { e: "⭕", x: 70, y: 56, s: 26 },
                { t: "shapeless", x: 70, y: 20, s: 8, c: "bad" },
              ],
              "full of · without",
            ),
          },
          {
            t: "-ly and -fully",
            lines: [
              "[-ly] means “in a certain way”: slow → slowly, perfect → perfectly.",
              "[-fully] means “in a certain way full of”: care → carefully, grace → gracefully.",
            ],
            vis: SC(
              "school",
              [
                { e: "🧒", x: 30, y: 60, s: 30 },
                { e: "✏️", x: 56, y: 66, s: 16, a: "nod" },
                { t: "carefully", x: 66, y: 24, s: 8, c: "good" },
              ],
              "in a careful way",
            ),
          },
          {
            t: "y changes to i",
            lines: [
              "A word ends in a consonant + [y]? Change the y to [i] before -ful, -less, -ly.",
              "beauty → beautiful · pity → pitiful · happy → happily",
            ],
            vis: SC(
              "grass",
              [
                { t: "beauty", x: 30, y: 30, s: 9, c: "light" },
                { t: "→", x: 50, y: 30, s: 9, c: "plain" },
                { t: "beautiful", x: 72, y: 30, s: 9, c: "good", a: "pop:0.8" },
                { e: "🌸", x: 50, y: 70, s: 26, a: "grow" },
              ],
              "y → i",
            ),
          },
          {
            t: "The 20 spelling words",
            lines: [
              "-ness: illness, darkness, goodness, weakness",
              "-ly: hardly, quickly, slowly, sickly · -est: darkest, clearest",
              "-ful: spoonful, graceful, wonderful, thoughtful, beautiful",
              "-less: spotless, shapeless, ageless, painless · -fully: carefully",
            ],
            vis: SC(
              "school",
              [
                { e: "📝", x: 40, y: 54, s: 36 },
                { t: "20 words", x: 68, y: 26, s: 9, c: "good", a: "pop" },
              ],
              "Homework p. 3",
            ),
          },
        ],
      },
      {
        k: "figure",
        g: "🧱 Vocabulary strategy · Similes and metaphors",
        t: "Similes and metaphors",
        en: "Two things compared",
        ic: "🦁",
        cover: {
          vis: SC("plain", [
            { e: "🧒", x: 32, y: 54, s: 30 },
            { t: "=", x: 52, y: 54, s: 10, c: "plain" },
            { e: "🦁", x: 72, y: 54, s: 30, a: "pulse" },
          ]),
        },
        cards: [
          {
            t: "A simile",
            lines: [
              "A [simile] compares two different things with [like] or [as].",
              "She swims like a fish. · Her heart was as big as an ocean.",
            ],
            vis: SC(
              "sky",
              [
                { e: "🏊", x: 32, y: 66, s: 28, dx: 20, a: "go" },
                { t: "like", x: 52, y: 30, s: 10, c: "good" },
                { e: "🐟", x: 74, y: 66, s: 24, a: "swing" },
              ],
              "like a fish",
            ),
          },
          {
            t: "A metaphor",
            lines: [
              "A [metaphor] compares two things [without] like or as. It says one thing [is] another.",
              "The stars are diamonds in the sky. · The girl is an angel.",
            ],
            vis: SC(
              "night",
              [
                { e: "⭐", x: 30, y: 30, s: 18, a: "blink" },
                { e: "⭐", x: 56, y: 22, s: 14, a: "blink:0.5" },
                { t: "=", x: 52, y: 54, s: 10, c: "light" },
                { e: "💎", x: 72, y: 60, s: 24, a: "pulse" },
              ],
              "stars = diamonds",
            ),
          },
          {
            t: "What does it mean?",
            lines: [
              "Think: how are the two things [the same]?",
              "The car moved like a snail. A snail is slow → the car was [very slow].",
              "The basketball player is a giant. A giant is tall → he is [very tall].",
            ],
            vis: SC(
              "grass",
              [
                { e: "🚗", x: 34, y: 62, s: 28, dx: 6, a: "go" },
                { e: "🐌", x: 72, y: 70, s: 22, dx: 4, a: "go" },
              ],
              "slow as a snail",
            ),
          },
        ],
      },
    ],
    ideas: [],

    games: [
      {
        k: "vmatch",
        g: "🔤 Vocabulary",
        t: "Words and pictures",
        en: "Match the word to its meaning",
        ic: "🔗",
        items: [
          {
            type: "match",
            pairs: [
              {
                vis: SC("room", [{ e: "🧑‍🎨", x: 50, y: 50, s: 44 }], "creative"),
                label: "good at making new things",
              },
              {
                vis: SC(
                  "room",
                  [{ e: "🍪", x: 50, y: 50, s: 40, a: "shake" }],
                  "brittle",
                ),
                label: "breaks easily",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "📖", x: 34, y: 56, s: 30 },
                    { e: "💭", x: 68, y: 36, s: 26 },
                  ],
                  "descriptive",
                ),
                label: "helps you imagine how it looks",
              },
              {
                vis: SC(
                  "grass",
                  [{ e: "🫱", x: 50, y: 50, s: 40 }],
                  "outstretched",
                ),
                label: "stretched out as far as possible",
              },
            ],
          },
        ],
      },
      {
        k: "smsort",
        g: "🧱 Vocabulary strategy · Similes and metaphors",
        t: "Simile or metaphor?",
        en: "Like or as? Or is?",
        ic: "🔍",
        items: [
          {
            type: "sort",
            q: "Tap a sentence, then its box.",
            cols: [
              { k: "s", t: "simile", ex: "like / as", e: "🐟" },
              { k: "m", t: "metaphor", ex: "is / was / are", e: "💎" },
            ],
            words: [
              { w: "She swims like a fish.", k: "s", e: "🏊" },
              { w: "He is as brave as a lion.", k: "s", e: "🦁" },
              { w: "The snow was like a blanket.", k: "s", e: "❄️" },
              { w: "My cat is as soft as silk.", k: "s", e: "🐱" },
              { w: "The classroom was a zoo.", k: "m", e: "🐒" },
              { w: "My brother is a couch potato.", k: "m", e: "🛋️" },
              { w: "The moon is a lamp in the sky.", k: "m", e: "🌙" },
              { w: "Time is money.", k: "m", e: "⏰" },
            ],
          },
        ],
      },
      {
        k: "sbuild",
        g: "🔊 Phonics · Suffixes",
        t: "Word + suffix",
        en: "Make the spelling words",
        ic: "🧱",
        items: [
          cj("dark + ness = ___", ["darkness", "darkful", "darkly"], "🌑"),
          cj("care + fully = ___", ["carefully", "carefuly", "carely"], "🧒✏️"),
          cj(
            "thought + ful = ___",
            ["thoughtful", "thoughtless", "thoughtly"],
            "🎁💭",
          ),
          cj(
            "clear + est = ___",
            ["clearest", "clearness", "clearful"],
            "💧✨",
          ),
          cj("spot + less = ___", ["spotless", "spotful", "spotly"], "🧽✨"),
          cj(
            "beauty + ful = ___",
            ["beautiful", "beautyful", "beautifull"],
            "🌸",
            "Change the [y] to [i]: beauty → beauti + ful.",
          ),
          cj(
            "I walked ___ in the snow. (slow)",
            ["slowly", "slowness", "slowest"],
            "🚶❄️",
          ),
          cj("A cold is an ___. (ill)", ["illness", "illest", "illful"], "🤧"),
        ],
      },
      {
        k: "rhyme",
        g: "📖 Reading · Poetry",
        t: "Rhyme time",
        en: "Find the rhyming word",
        ic: "🎵",
        items: [
          cj("Which word rhymes with [tree]?", ["bee", "tray", "trip"], "🌳🐝"),
          cj(
            "Which word rhymes with [rocket]?",
            ["pocket", "rock", "racket"],
            "🚀👖",
          ),
          cj(
            "Which word rhymes with [crown]?",
            ["brown", "crow", "clown car"],
            "👑🟫",
          ),
          cj(
            "Which word rhymes with [carrot]?",
            ["parrot", "car", "cart"],
            "🥕🦜",
          ),
          cj(
            "Which word rhymes with [kite]?",
            ["height", "kit", "kind"],
            "🪁📏",
          ),
          cj("Which word rhymes with [jump]?", ["thump", "jam", "jar"], "🦘🥁"),
          cj("Which word rhymes with [fly]?", ["try", "flag", "fill"], "🪰💪"),
          cj(
            "Which word rhymes with [roar]?",
            ["more", "rain", "road"],
            "🦁➕",
          ),
        ],
      },
    ],

    exercises: [
      // ---------- Grammar · Combining sentences ----------
      {
        k: "csub",
        keep: true,
        g: "🧩 Grammar · Combining sentences",
        t: "Join the subject nouns",
        en: "Classwork booklet page 3",
        ic: "🧩",
        from: "Classwork p. 3",
        items: [
          ...comb(
            "Kelsey goes to summer camp. Alvin goes to summer camp.",
            ["Kelsey", "Alvin"],
            "subject",
            [
              "Kelsey and Alvin go to summer camp.",
              "Kelsey and Alvin goes to summer camp.",
              "Kelsey goes and Alvin to summer camp.",
            ],
            "🏕️👫",
            "Two people → the verb is [go], not goes.",
          ),
          ...comb(
            "The rabbit hides under a bush. The squirrel hides under a bush.",
            ["rabbit", "squirrel"],
            "subject",
            [
              "The rabbit and the squirrel hide under a bush.",
              "The rabbit and the squirrel hides under a bush.",
              "The rabbit hides and the squirrel under a bush.",
            ],
            "🐇🐿️",
            "Two animals → [hide], not hides.",
          ),
          ...comb(
            "My sister likes to watch football. I like to watch football.",
            ["sister", "I"],
            "subject",
            [
              "My sister and I like to watch football.",
              "My sister and I likes to watch football.",
              "I and my sister likes to watch football.",
            ],
            "👧⚽",
            "My sister and I → [like].",
          ),
          ...comb(
            "The teacher knows the correct answer. The student knows the correct answer.",
            ["teacher", "student"],
            "subject",
            [
              "The teacher and the student know the correct answer.",
              "The teacher and the student knows the correct answer.",
              "The teacher knows and the student the correct answer.",
            ],
            "🧑‍🏫🧒",
            "Two people → [know], not knows.",
          ),
          ...comb(
            "Mom eats dinner with me at the table. Aunt Macy eats dinner with me at the table.",
            ["Mom", "Aunt", "Macy"],
            "subject",
            [
              "Mom and Aunt Macy eat dinner with me at the table.",
              "Mom and Aunt Macy eats dinner with me at the table.",
              "Mom eats and Aunt Macy dinner with me at the table.",
            ],
            "👩🍽️",
            "Two people → [eat], not eats.",
          ),
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Imagine you could take all your friends on vacation. Say who you would bring and what you would do. Join the nouns with [and].",
            a: "I would bring Omar and Sam. Omar, Sam and I would go to the beach. My friends and I would swim and build a sandcastle. Then we would eat ice cream and pizza.",
            vis: SC(
              "sky",
              [
                { e: "🏖️", x: 50, y: 70, s: 34 },
                { e: "👦", x: 26, y: 56, s: 20 },
                { e: "🧒", x: 74, y: 56, s: 20 },
                { e: "☀️", x: 80, y: 18, s: 16, a: "spin" },
              ],
              "a vacation with friends",
            ),
          },
        ],
      },
      {
        k: "cpred",
        keep: true,
        g: "🧩 Grammar · Combining sentences",
        t: "Join the predicate nouns",
        en: "Classwork booklet page 4",
        ic: "🧩",
        from: "Classwork p. 4",
        items: [
          ...comb(
            "The woman is an actress. The woman is a waitress.",
            ["actress", "waitress"],
            "predicate noun",
            [
              "The woman is an actress and a waitress.",
              "The woman and the woman is an actress.",
              "The woman is an actress, a waitress.",
            ],
            "🎭🍽️",
          ),
          ...comb(
            "My dog seemed like a statue. He seemed like a rock.",
            ["statue", "rock"],
            "predicate noun",
            [
              "My dog seemed like a statue and a rock.",
              "My dog and he seemed like a statue.",
              "My dog seemed like a statue and he a rock.",
            ],
            "🐕🗿",
          ),
          ...comb(
            "I am a student. I am a volunteer.",
            ["student", "volunteer"],
            "predicate noun",
            [
              "I am a student and a volunteer.",
              "I and I am a student and a volunteer.",
              "I am a student, I am a volunteer.",
            ],
            "🎒🤝",
          ),
          ...comb(
            "My parents are citizens. My parents are community leaders.",
            ["citizens", "community", "leaders"],
            "predicate noun",
            [
              "My parents are citizens and community leaders.",
              "My parents are citizens and are my parents community leaders.",
              "My parents is citizens and community leaders.",
            ],
            "👨‍👩‍👦🏛️",
          ),
          // the sentence from “Fog” is printed on the page (the whole poem is not in the booklet); unverified
          {
            type: "mc",
            q: "From the poem “Fog”: “It sits looking over harbor and city on silent haunches and then moves on.” Which two nouns were combined?",
            opts: ["harbor and city", "city and haunches", "sits and moves"],
            emoji: "🌫️🏙️",
            x: "The fog looks over the [harbor] and the [city].",
          },
          {
            type: "mc",
            q: "Which shows the same sentence as two sentences, with the nouns separated?",
            opts: [
              "It sits looking over harbor on silent haunches. It sits looking over city on silent haunches and then moves on.",
              "It sits looking over harbor. And city on silent haunches.",
              "It sits. It moves on.",
            ],
            emoji: "🌫️⚓",
          },
          {
            type: "open",
            q: "Why do you think the poet combined these nouns to make one sentence instead of two?",
            a: "One sentence is shorter and smoother. It does not repeat the same words, so the poem moves softly and quietly, like the fog.",
            emoji: "🌫️🐈",
          },
        ],
      },
      {
        k: "ctest",
        g: "🧩 Grammar · Combining sentences",
        t: "Test: combining sentences",
        en: "Classwork booklet page 7",
        ic: "📝",
        from: "Classwork p. 7",
        items: [
          {
            type: "mc",
            q: "(1) My mother is an excellent mathematician. (2) My mother is an excellent woodworker. Which predicate nouns should be joined in sentences 1 and 2?",
            opts: [
              "woodworker and mathematician",
              "my and mother",
              "excellent and woodworker",
              "excellent and mathematician",
            ],
            emoji: "👩‍🔬🪚",
            x: "My mother is an excellent [mathematician] and [woodworker].",
          },
          {
            type: "mc",
            q: "(3) My father is a great musician. (4) My sister is a great musician. Which subject nouns should be joined in sentences 3 and 4?",
            opts: [
              "father and sister",
              "my and great",
              "great and musician",
              "father and musician",
            ],
            emoji: "👨👧",
            x: "My [father] and my [sister] are great musicians.",
          },
          {
            type: "mc",
            q: "(1) We will be good listeners at the art show. (2) We will be good learners at the art show. How would you best combine sentences 1 and 2?",
            opts: [
              "We will be good listeners and learners at the art show.",
              "We and we will be good listeners at the art show.",
              "We will be good and good listeners at the art show.",
              "We will be good listeners at the art show; we will be good learners at the art show.",
            ],
            emoji: "👂🎨",
          },
          {
            type: "mc",
            q: "(3) Jessica painted a picture. (4) Brandon painted a picture. How would you best combine sentences 3 and 4?",
            opts: [
              "Jessica and Brandon painted a picture.",
              "Jessica painted a picture. Brandon painted a picture.",
              "Jessica painted a picture, and Brandon painted a picture.",
              "Jessica painted a picture, Brandon painted a picture.",
            ],
            emoji: "👩‍🎨🖼️",
          },
        ],
      },
      {
        k: "cpairs",
        g: "🧩 Grammar · Combining sentences",
        t: "Combine the sentences",
        en: "Homework booklet page 10",
        ic: "🔗",
        from: "Homework p. 10",
        items: [
          cj(
            "Luke likes to draw. Thomas likes to draw.",
            [
              "Luke and Thomas like to draw.",
              "Luke and Thomas likes to draw.",
              "Luke likes and Thomas to draw.",
            ],
            "✏️👦",
            "Subjects: [Luke] and [Thomas] → like.",
          ),
          cj(
            "Emmett wants to ski. Jackson wants to ski.",
            [
              "Emmett and Jackson want to ski.",
              "Emmett and Jackson wants to ski.",
              "Emmett wants and Jackson to ski.",
            ],
            "⛷️",
            "Subjects: [Emmett] and [Jackson] → want.",
          ),
          cj(
            "Matt ate a sandwich. Jack ate a sandwich.",
            [
              "Matt and Jack ate a sandwich.",
              "Matt ate and Jack a sandwich.",
              "Matt and Jack eats a sandwich.",
            ],
            "🥪",
            "Subjects: [Matt] and [Jack]. “Ate” is the same for one or two.",
          ),
          cj(
            "Nick played basketball. Aidan played basketball.",
            [
              "Nick and Aidan played basketball.",
              "Nick played and Aidan basketball.",
              "Nick and Aidan plays basketball.",
            ],
            "🏀",
            "Subjects: [Nick] and [Aidan].",
          ),
          cj(
            "Vanessa loves Christmas. Sadie loves Christmas.",
            [
              "Vanessa and Sadie love Christmas.",
              "Vanessa and Sadie loves Christmas.",
              "Vanessa loves and Sadie Christmas.",
            ],
            "🎄",
            "Subjects: [Vanessa] and [Sadie] → love.",
          ),
          cj(
            "Gracie ate an apple. Gracie ate a banana.",
            [
              "Gracie ate an apple and a banana.",
              "Gracie and Gracie ate an apple.",
              "Gracie ate an apple and ate Gracie a banana.",
            ],
            "🍎🍌",
            "Join the two nouns in the predicate: an [apple] and a [banana].",
          ),
          cj(
            "Bobby plays soccer. Bobby plays tennis.",
            [
              "Bobby plays soccer and tennis.",
              "Bobby and Bobby play soccer.",
              "Bobby plays soccer, Bobby plays tennis.",
            ],
            "⚽🎾",
          ),
          cj(
            "Susan likes to draw. Susan likes to paint.",
            [
              "Susan likes to draw and paint.",
              "Susan and Susan like to draw.",
              "Susan likes to draw, likes to paint Susan.",
            ],
            "✏️🎨",
          ),
          cj(
            "Perry is an artist. Perry is a singer.",
            [
              "Perry is an artist and a singer.",
              "Perry and Perry are artists.",
              "Perry is an artist, Perry is a singer.",
            ],
            "🎨🎤",
            "Predicate nouns: [artist] and [singer].",
          ),
          cj(
            "My family travelled to Luxor. My family travelled to Aswan.",
            [
              "My family travelled to Luxor and Aswan.",
              "My family and my family travelled to Luxor.",
              "My family travelled to Luxor, my family travelled to Aswan.",
            ],
            "🏛️🚆",
          ),
        ],
      },

      // ---------- Grammar · Phrases and interjections ----------
      {
        k: "pai1",
        keep: true,
        g: "🧩 Grammar · Phrases and interjections",
        t: "Phrase, appositive or interjection?",
        en: "Classwork booklet page 5",
        ic: "❗",
        from: "Classwork p. 5",
        items: [
          ...pai(
            "Eli a strong soccer player scored the most goals.",
            1,
            [
              "Eli, a strong soccer player, scored the most goals.",
              "Eli a strong soccer player, scored the most goals.",
              "Eli, a strong soccer player scored the most goals.",
            ],
            "⚽🥅",
          ),
          ...pai(
            "Once upon a time there was a beautiful princess.",
            0,
            [
              "Once upon a time, there was a beautiful princess.",
              "Once, upon a time there was a beautiful princess.",
              "Once upon a time there was, a beautiful princess.",
            ],
            "👸🏰",
          ),
          ...pai(
            "Ouch I stepped on something sharp.",
            2,
            [
              "Ouch! I stepped on something sharp.",
              "Ouch I stepped on something sharp!",
              "Ouch I, stepped on something sharp.",
            ],
            "🦶📌",
          ),
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Tell a short story about finding a mouse in your kitchen. Use one introductory phrase, one appositive and one interjection.",
            a: "One morning, I went into the kitchen. Oh, no! A tiny mouse was on the table. Max, my little brother, jumped on a chair and screamed. We opened the door, and the mouse ran away.",
            vis: SC(
              "room",
              [
                { e: "🐭", x: 40, y: 66, s: 22, dx: 30, a: "go" },
                { e: "🧀", x: 70, y: 70, s: 16 },
                { e: "😱", x: 26, y: 40, s: 22, a: "shake" },
              ],
              "a mouse in the kitchen",
            ),
          },
        ],
      },
      {
        k: "proof",
        keep: true,
        g: "🧩 Grammar · Phrases and interjections",
        t: "Proofreading",
        en: "Classwork booklet page 6",
        ic: "🔍",
        from: "Classwork p. 6",
        items: [
          cj(
            "“Long ago there was a woodcutter with three sons.” Which is right?",
            [
              "Long ago, there was a woodcutter with three sons.",
              "Long, ago there was a woodcutter with three sons.",
              "Long ago there was a woodcutter, with three sons.",
            ],
            "🪓👨",
            "A comma after the introductory phrase [Long ago].",
          ),
          cj(
            "“The woodcutter a strong man would spend his day chopping trees.” Which is right?",
            [
              "The woodcutter, a strong man, would spend his day chopping trees.",
              "The woodcutter a strong man, would spend his day chopping trees.",
              "The woodcutter, a strong man would spend his day chopping trees.",
            ],
            "🪓🌲",
            "[a strong man] is an appositive: commas before and after.",
          ),
          cj(
            "“Then one day the woodcutter used a batch of twigs …” Which is right?",
            [
              "Then one day, the woodcutter used a batch of twigs …",
              "Then, one day the woodcutter, used a batch of twigs …",
              "Then one day the woodcutter used, a batch of twigs …",
            ],
            "🌿🌿",
            "A comma after the introductory phrase [Then one day].",
          ),
          cj(
            "“Ah the woodcutter’s sons never fought again.” Which is right?",
            [
              "Ah! The woodcutter’s sons never fought again.",
              "Ah the woodcutter’s sons never fought again!",
              "Ah the woodcutter’s, sons never fought again.",
            ],
            "👨‍👦‍👦🤝",
            "[Ah] is an interjection.",
          ),
          {
            type: "open",
            q: "Read the first paragraph again, the right way.",
            a: "Long ago[,] there was a woodcutter with three sons. The woodcutter[,] a strong man[,] would spend his day chopping trees. Meanwhile, his sons would argue the entire time he was gone. Then one day[,] the woodcutter used a batch of twigs to show they were stronger when they were together as one. Ah[!] The woodcutter’s sons never fought again.",
            emoji: "🪓👨‍👦‍👦",
          },
          cj(
            "“Kids also called growing machines get taller and taller every year.” Which is right?",
            [
              "Kids, also called growing machines, get taller and taller every year.",
              "Kids also called, growing machines get taller and taller every year.",
              "Kids, also called growing machines get taller and taller every year.",
            ],
            "🧒📏",
            "[also called growing machines] tells more about kids: commas before and after.",
          ),
          cj(
            "“Like most people you probably think that we stop growing when we become adults.” Which is right?",
            [
              "Like most people, you probably think that we stop growing when we become adults.",
              "Like, most people you probably think that we stop growing when we become adults.",
              "Like most people you probably think, that we stop growing when we become adults.",
            ],
            "🧑🤔",
            "A comma after the introductory phrase [Like most people].",
          ),
          cj(
            "“Wow although this is odd, it does explain why many older people have large noses and ears.” Which is right?",
            [
              "Wow! Although this is odd, it does explain why many older people have large noses and ears.",
              "Wow although this is odd, it does explain why many older people have large noses and ears!",
              "Wow although, this is odd it does explain why many older people have large noses and ears.",
            ],
            "👴👃",
            "[Wow] is an interjection.",
          ),
          {
            type: "open",
            q: "Read the second paragraph again, the right way.",
            a: "Kids[,] also called growing machines[,] get taller and taller every year. This is because their bones are still growing. Like most people[,] you probably think that we stop growing when we become adults. This is not true. Your nose and ears never stop growing. Wow[!] Although this is odd, it does explain why many older people have large noses and ears.",
            emoji: "🧒👴",
          },
        ],
      },
      {
        k: "pai2",
        keep: true,
        g: "🧩 Grammar · Phrases and interjections",
        t: "Fix the punctuation",
        en: "Homework booklet page 11",
        ic: "✏️",
        from: "Homework p. 11",
        items: [
          ...pai(
            "Yesterday I went to the cinema.",
            0,
            [
              "Yesterday, I went to the cinema.",
              "Yesterday I, went to the cinema.",
              "Yesterday I went, to the cinema.",
            ],
            "🎬🍿",
          ),
          ...pai(
            "Ouch you stepped on my feet.",
            2,
            [
              "Ouch! You stepped on my feet.",
              "Ouch you stepped on my feet!",
              "Ouch you, stepped on my feet.",
            ],
            "🦶😣",
          ),
          ...pai(
            "Sherry my best friend is very kind.",
            1,
            [
              "Sherry, my best friend, is very kind.",
              "Sherry my best friend, is very kind.",
              "Sherry, my best friend is very kind.",
            ],
            "👭💖",
          ),
          ...pai(
            "Hey can you help me?",
            2,
            [
              "Hey! Can you help me?",
              "Hey can you help me!",
              "Hey can, you help me?",
            ],
            "🙋🆘",
          ),
          ...pai(
            "Valerie my neighbor has a trampoline.",
            1,
            [
              "Valerie, my neighbor, has a trampoline.",
              "Valerie my neighbor, has a trampoline.",
              "Valerie, my neighbor has a trampoline.",
            ],
            "👧🤸",
          ),
          ...pai(
            "Until last night I thought we were off tomorrow.",
            0,
            [
              "Until last night, I thought we were off tomorrow.",
              "Until, last night I thought we were off tomorrow.",
              "Until last night I thought, we were off tomorrow.",
            ],
            "🌙📅",
          ),
          ...pai(
            "Today we will learn about planets.",
            0,
            [
              "Today, we will learn about planets.",
              "Today we, will learn about planets.",
              "Today we will learn, about planets.",
            ],
            "🪐📚",
          ),
          ...pai(
            "Mr. John our science teacher showed us an amazing experiment about how plants grow.",
            1,
            [
              "Mr. John, our science teacher, showed us an amazing experiment about how plants grow.",
              "Mr. John our science teacher, showed us an amazing experiment about how plants grow.",
              "Mr. John, our science teacher showed us an amazing experiment about how plants grow.",
            ],
            "🧑‍🔬🌱",
          ),
          ...pai(
            "Oh it’s a very long movie.",
            2,
            [
              "Oh, it’s a very long movie.",
              "Oh it’s, a very long movie.",
              "Oh it’s a very, long movie.",
            ],
            "🎬⏳",
          ),
          ...pai(
            "After school I will go to my grandmother’s house.",
            0,
            [
              "After school, I will go to my grandmother’s house.",
              "After, school I will go to my grandmother’s house.",
              "After school I will go, to my grandmother’s house.",
            ],
            "🏫👵",
          ),
        ],
      },

      // ---------- Phonics · Suffixes ----------
      {
        k: "sfx1",
        keep: true,
        g: "🔊 Phonics · Suffixes",
        t: "Find the suffix",
        en: "Classwork booklet page 8",
        ic: "🧱",
        from: "Classwork p. 8",
        items: [
          ...sfx(
            "I was powerless to make any change in the plan.",
            "powerless",
            ["change", "plan"],
            "power",
            "-less",
            "without power; not able to do anything",
            ["full of power", "the most powerful"],
            "🔌❌",
          ),
          ...sfx(
            "I am so thankful for my loving family and friends.",
            "thankful",
            ["family", "friends"],
            "thank",
            "-ful",
            "full of thanks",
            ["without thanks", "in a quick way"],
            "🙏👨‍👩‍👧",
          ),
          ...sfx(
            "The sadness in his eyes went away after he got the gift.",
            "sadness",
            ["eyes", "gift"],
            "sad",
            "-ness",
            "the state of being sad",
            ["the most sad", "full of joy"],
            "😢🎁",
          ),
          ...sfx(
            "The teacher welcomed her students cheerfully.",
            "cheerfully",
            ["teacher", "students"],
            "cheer",
            "-fully",
            "in a happy way, full of cheer",
            ["without cheer", "the most cheerful"],
            "🧑‍🏫😄",
          ),
          ...sfx(
            "The girl dribbled the basketball perfectly.",
            "perfectly",
            ["girl", "basketball"],
            "perfect",
            "-ly",
            "in a perfect way, with no mistakes",
            ["without a ball", "the state of being tired"],
            "👧🏀",
          ),
          ...sfx(
            "Sam was the fastest boy in the class.",
            "fastest",
            ["boy", "class"],
            "fast",
            "-est",
            "the most fast",
            ["not fast", "full of speed"],
            "🏃💨",
          ),
        ],
      },
      {
        k: "ssort",
        g: "🔊 Phonics · Suffixes",
        t: "Sort the spelling words",
        en: "Homework booklet page 3",
        ic: "🗂️",
        from: "Homework p. 3",
        items: [
          {
            type: "sort",
            q: "Put each spelling word in the box of its suffix.",
            cols: [
              { k: "ness", t: "-ness", ex: "sadness", e: "😢" },
              { k: "ly", t: "-ly", ex: "perfectly", e: "👌" },
              { k: "est", t: "-est", ex: "fastest", e: "🏃" },
              { k: "ful", t: "-ful", ex: "thankful", e: "🙏" },
              { k: "less", t: "-less", ex: "powerless", e: "🔌" },
              { k: "fully", t: "-fully", ex: "cheerfully", e: "😄" },
            ],
            words: [
              { w: "illness", k: "ness", e: "🤧" },
              { w: "darkness", k: "ness", e: "🌑" },
              { w: "goodness", k: "ness", e: "😇" },
              { w: "weakness", k: "ness", e: "😩" },
              { w: "hardly", k: "ly", e: "🤏" },
              { w: "quickly", k: "ly", e: "🏃" },
              { w: "sickly", k: "ly", e: "🤒" },
              { w: "slowly", k: "ly", e: "🐢" },
              { w: "darkest", k: "est", e: "🌑" },
              { w: "clearest", k: "est", e: "💧" },
              { w: "spoonful", k: "ful", e: "🥄" },
              { w: "graceful", k: "ful", e: "🩰" },
              { w: "wonderful", k: "ful", e: "🤩" },
              { w: "thoughtful", k: "ful", e: "💭" },
              { w: "beautiful", k: "ful", e: "🌸" },
              { w: "spotless", k: "less", e: "🧽" },
              { w: "shapeless", k: "less", e: "☁️" },
              { w: "ageless", k: "less", e: "👵" },
              { w: "painless", k: "less", e: "🩹" },
              { w: "carefully", k: "fully", e: "🧒" },
            ],
          },
        ],
      },
      {
        k: "smean",
        g: "🔊 Phonics · Suffixes",
        t: "Which spelling word?",
        en: "Homework booklet page 4",
        ic: "📝",
        from: "Homework p. 4",
        items: [
          cj(
            "The road was ___ where there were no street lights.",
            ["darkest", "clearest", "spotless"],
            "🛣️🌑",
          ),
          cj(
            "The student ___ checked her test answers.",
            ["carefully", "hardly", "sickly"],
            "🧒📝",
          ),
          cj(
            "I had a ___ time at the lake and would like to go back!",
            ["wonderful", "painless", "shapeless"],
            "🏞️😄",
          ),
          cj(
            "My grandmother looks so young that people say she is ___.",
            ["ageless", "thoughtful", "darkest"],
            "👵✨",
          ),
          cj(
            "I took a ___ of medicine and felt better.",
            ["spoonful", "weakness", "goodness"],
            "🥄💊",
          ),
          cj(
            "The car moved so ___ that I thought we’d never get there.",
            ["slowly", "quickly", "graceful"],
            "🚗🐢",
          ),
          cj(
            "The scrape on my knee was ___ and healed quickly.",
            ["painless", "ageless", "beautiful"],
            "🦵🩹",
          ),
          cj(
            "The ___ model was known for her pretty face.",
            ["beautiful", "sickly", "spotless"],
            "👩📸",
          ),
          cj(
            "She gave me this for free out of the ___ of her heart.",
            ["goodness", "darkness", "illness"],
            "🎁❤️",
          ),
          cj(
            "The sky had no clouds and was the ___ I had ever seen it.",
            ["clearest", "darkest", "slowly"],
            "☀️🌤️",
          ),
          cj("lack of light = ___", ["darkness", "weakness", "goodness"], "🌑"),
          cj(
            "perfectly clean = ___",
            ["spotless", "shapeless", "painless"],
            "🧽✨",
          ),
          cj(
            "lack of strength = ___",
            ["weakness", "illness", "darkness"],
            "😩",
          ),
          cj("sickness = ___", ["illness", "goodness", "weakness"], "🤒"),
          cj("barely = ___", ["hardly", "slowly", "quickly"], "🤏"),
          cj("not healthy = ___", ["sickly", "ageless", "carefully"], "🤢"),
          cj(
            "elegant in form = ___",
            ["graceful", "thoughtful", "wonderful"],
            "🩰",
          ),
          cj(
            "kind and considerate = ___",
            ["thoughtful", "graceful", "spoonful"],
            "💐",
          ),
          cj("without form = ___", ["shapeless", "spotless", "painless"], "☁️"),
          cj("in a fast way = ___", ["quickly", "slowly", "hardly"], "🏃💨"),
        ],
      },
      {
        k: "smiss",
        g: "🔊 Phonics · Suffixes",
        t: "Add the suffix",
        en: "Homework booklet page 5",
        ic: "➕",
        from: "Homework p. 5",
        items: [
          ms("shape", "less", ["ness", "ful"], "☁️"),
          ms("sick", "ly", ["est", "ful"], "🤒"),
          ms("weak", "ness", ["less", "ly"], "😩"),
          ms("spoon", "ful", ["ly", "less"], "🥄"),
          ms("clear", "est", ["ful", "less"], "💧"),
          ms("beauti", "ful", ["ly", "less"], "🌸"),
          ms("quick", "ly", ["ful", "ness"], "🏃"),
          ms("age", "less", ["ly", "est"], "👵"),
          ms("thought", "ful", ["ly", "est"], "💭"),
          ms("dark", "est", ["ful", "ly"], "🌑"),
          ms("care", "fully", ["ness", "est"], "🧒"),
          ms("pain", "less", ["ly", "est"], "🩹"),
          ms("slow", "ly", ["ful", "less"], "🐢"),
          ms("ill", "ness", ["ful", "est"], "🤧"),
          ms("grace", "ful", ["est", "ness"], "🩰"),
          ms("dark", "ness", ["ful", "less"], "🌑"),
          ms("hard", "ly", ["ful", "less"], "🤏"),
          ms("spot", "less", ["ly", "est"], "🧽"),
          ms("good", "ness", ["ful", "est"], "😇"),
          ms("wonder", "ful", ["ly", "est"], "🤩"),
        ],
      },
      {
        k: "sfx2",
        keep: true,
        g: "🔊 Phonics · Suffixes",
        t: "Find the suffix (2)",
        en: "Homework booklet page 6",
        ic: "🧱",
        from: "Homework p. 6",
        items: [
          ...sfx(
            "The student was careless with his homework.",
            "careless",
            ["student", "homework"],
            "care",
            "-less",
            "without care; not careful",
            ["full of care", "the most careful"],
            "🧒📄",
          ),
          ...sfx(
            "The brightness of this diamond surprised us.",
            "brightness",
            ["diamond", "surprised"],
            "bright",
            "-ness",
            "the state of being bright",
            ["without light", "in a slow way"],
            "💎✨",
          ),
          ...sfx(
            "I gracefully accepted the job offer.",
            "gracefully",
            ["job", "offer"],
            "grace",
            "-fully",
            "in a polite and elegant way",
            ["without grace", "the most graceful"],
            "🤝💼",
          ),
          ...sfx(
            "Catherine is the smartest one in the competition.",
            "smartest",
            ["one", "competition"],
            "smart",
            "-est",
            "the most smart",
            ["not smart", "full of fun"],
            "👧🏆",
          ),
          ...sfx(
            "She smiled brightly as she received her award.",
            "brightly",
            ["award", "smiled"],
            "bright",
            "-ly",
            "in a bright, happy way",
            ["the state of being dark", "without a smile"],
            "😁🏅",
          ),
          ...sfx(
            "The room was colorful, filled with vibrant artwork.",
            "colorful",
            ["room", "artwork"],
            "color",
            "-ful",
            "full of colors",
            ["without colors", "the most colored"],
            "🎨🖼️",
          ),
        ],
      },
      {
        k: "sspell",
        g: "🔊 Phonics · Suffixes",
        t: "Find the spelling mistakes",
        en: "Classwork booklet page 9",
        ic: "✏️",
        from: "Classwork p. 9",
        items: [
          {
            type: "tapw",
            fix: true,
            q: "Tap the [6] words that are spelled wrong.",
            s: "Red’s grandmother had an illniss. Red didn’t like the darknes of the woods around Grandmother’s house, but she wanted to help Grandmother feel better. She quicklie ran through the woods to bring Grandmother a basket of food.\nShe was almost there when she saw a dark, shapelass figure ahead. She turned to run, but then she heard Grandmother calling her. Grandmother told Red that her weaknis had gone away and she had come to meet her. Then Grandmother thanked Red for the wonderfull basket of food.",
            ans: {
              illniss: "illness",
              darknes: "darkness",
              quicklie: "quickly",
              shapelass: "shapeless",
              weaknis: "weakness",
              wonderfull: "wonderful",
            },
            emoji: "👧🧺",
            x: "illness · darkness · quickly · shapeless · weakness · wonderful",
          },
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Tell your own tale about a favorite fairy tale character. Use at least four words from the spelling list.",
            a: "Cinderella worked carefully all day. Her stepsisters were never thoughtful. One night, a wonderful fairy made her dress beautiful. Cinderella danced gracefully, but at midnight she ran quickly home.",
            vis: SC(
              "night",
              [
                { e: "👸", x: 36, y: 58, s: 32, a: "spin" },
                { e: "🧚", x: 70, y: 36, s: 22, a: "float" },
                { e: "🕛", x: 80, y: 74, s: 14 },
              ],
              "a fairy tale",
            ),
          },
        ],
      },

      // ---------- Vocabulary ----------
      {
        k: "vfill",
        g: "🔤 Vocabulary",
        t: "Fill in the word",
        en: "Homework booklet page 7",
        ic: "🔤",
        from: "Homework p. 7",
        items: [
          cj(
            "The chips were ___, so they broke easily when I tried to eat them.",
            ["brittle", "creative", "descriptive", "outstretched"],
            "🥔💥",
          ),
          cj(
            "Suzan ___ her hand to help her friend up the steep hill.",
            ["outstretched", "brittle", "creative", "descriptive"],
            "🫱⛰️",
          ),
          cj(
            "The young artist used her ___ imagination to paint a beautiful picture.",
            ["creative", "brittle", "outstretched", "descriptive"],
            "🧑‍🎨🖼️",
          ),
          cj(
            "The poem was very ___. It helped me to imagine the scene.",
            ["descriptive", "brittle", "outstretched", "creative"],
            "📜💭",
          ),
        ],
      },

      // ---------- Vocabulary strategy · Similes and metaphors ----------
      {
        k: "deerfig",
        g: "🧱 Vocabulary strategy · Similes and metaphors",
        t: "Similes and metaphors in “Deer”",
        en: "Classwork booklet page 13",
        ic: "🦌",
        from: "Classwork p. 13",
        items: [
          {
            type: "mc",
            q: "“We see them sitting under trees at night, in my yard, like a photo of a family.” Which two things are compared?",
            opts: [
              "the deer and a photo of a family",
              "the trees and the yard",
              "the night and a family",
            ],
            src: "img/deer/deer.jpg",
            x: "A simile: “[like a photo of a family]”.",
          },
          {
            type: "mc",
            q: "“Then they dart away, their tails held high, six white arrows point at the sky.” Which two things are compared?",
            opts: [
              "the deer’s tails and white arrows",
              "the deer and the sky",
              "the arrows and the sky",
            ],
            vis: SC("night", [
              { e: "🦌", x: 36, y: 64, s: 30 },
              { e: "🏹", x: 70, y: 34, s: 20 },
            ]),
            x: "A metaphor: the tails [are] “[six white arrows]”.",
          },
          {
            type: "mc",
            q: "“Into the night they disappear, and though they move as quick as spears a little later they’ll be back here.” Which two things are compared?",
            opts: [
              "the deer and spears",
              "the night and the deer",
              "spears and the night",
            ],
            vis: SC("night", [
              { e: "🦌", x: 30, y: 64, s: 28, dx: 50, a: "out" },
            ]),
            x: "A simile: “[as quick as spears]”.",
          },
        ],
      },
      {
        k: "fig1",
        keep: true,
        g: "🧱 Vocabulary strategy · Similes and metaphors",
        t: "Simile or metaphor? What does it mean?",
        en: "Classwork booklet page 14",
        ic: "🦁",
        from: "Classwork p. 14",
        // unverified: the meanings
        items: [
          fm(
            "The car moved like a snail.",
            "simile",
            "the car",
            "a snail",
            "🚗🐌",
          ),
          fmean(
            "The car moved like a snail.",
            "The car was very slow.",
            ["The car was very small.", "The car was green."],
            "🚗🐌",
          ),
          fm(
            "The librarian was as sweet as a candy.",
            "simile",
            "the librarian",
            "a candy",
            "👩‍🏫🍬",
          ),
          fmean(
            "The librarian was as sweet as a candy.",
            "The librarian was very kind and nice.",
            [
              "The librarian ate a lot of candy.",
              "The librarian was very tall.",
            ],
            "👩‍🏫🍬",
          ),
          fm(
            "The stars are diamonds in the sky.",
            "metaphor",
            "the stars",
            "diamonds",
            "⭐💎",
          ),
          fmean(
            "The stars are diamonds in the sky.",
            "The stars shine brightly, like diamonds.",
            ["The stars cost a lot of money.", "The stars are very hard."],
            "⭐💎",
          ),
          fm(
            "The girl is an angel.",
            "metaphor",
            "the girl",
            "an angel",
            "👧😇",
          ),
          fmean(
            "The girl is an angel.",
            "The girl is very good and kind.",
            ["The girl can fly.", "The girl lives in the sky."],
            "👧😇",
          ),
          fm(
            "Her heart was as big as an ocean.",
            "simile",
            "her heart",
            "an ocean",
            "❤️🌊",
          ),
          fmean(
            "Her heart was as big as an ocean.",
            "She was very kind and loving.",
            ["She was very sick.", "She liked to swim."],
            "❤️🌊",
          ),
          fm(
            "My uncle is as straight as an arrow.",
            "simile",
            "my uncle",
            "an arrow",
            "👨🏹",
          ),
          fmean(
            "My uncle is as straight as an arrow.",
            "My uncle is very honest.",
            ["My uncle is very thin.", "My uncle can shoot arrows."],
            "👨🏹",
          ),
          fm(
            "Life is a rollercoaster.",
            "metaphor",
            "life",
            "a rollercoaster",
            "🎢",
          ),
          fmean(
            "Life is a rollercoaster.",
            "Life has good times and bad times, ups and downs.",
            ["Life is always fun.", "Life is very fast."],
            "🎢",
          ),
          fm(
            "The basketball player is a giant.",
            "metaphor",
            "the basketball player",
            "a giant",
            "🏀🧍",
          ),
          fmean(
            "The basketball player is a giant.",
            "The basketball player is very tall.",
            [
              "The basketball player is very angry.",
              "The basketball player is from a fairy tale.",
            ],
            "🏀🧍",
          ),
          fm(
            "He has a heart of a lion.",
            "metaphor",
            "his heart",
            "a lion’s heart",
            "🧑🦁",
          ),
          fmean(
            "He has a heart of a lion.",
            "He is very brave.",
            ["He is very hungry.", "He has a big heart that is sick."],
            "🧑🦁",
          ),
        ],
      },
      {
        k: "fig2",
        g: "🧱 Vocabulary strategy · Similes and metaphors",
        t: "Figures of speech and poems",
        en: "Homework booklet pages 7–8",
        ic: "🎵",
        from: "Homework p. 7–8",
        items: [
          cj(
            "Which of the following is an example of a simile?",
            [
              "She swims like a fish.",
              "The hero was a strong lion.",
              "Ben ran as fast as possible.",
            ],
            "🏊🐟",
            "It compares her and a fish with [like]. “As fast as possible” does not compare two things.",
          ),
          cj(
            "Which of the following is a metaphor?",
            [
              "The champion was a fast cheetah.",
              "The man was angry as a stormy sea.",
              "My sisters like to eat ice cream.",
            ],
            "🏆🐆",
            "It says the champion [was] a cheetah, without like or as.",
          ),
          cj(
            "Which of the following rhymes with this line: “The sun was shining so bright”?",
            [
              "It filled the sky with light.",
              "That’s how the sky was lit.",
              "The boys didn’t quit.",
            ],
            "☀️✨",
            "[bright] and [light] rhyme.",
          ),
          {
            type: "mc",
            q: "What is the meter of this stanza? “See the bug on the rug. / I will give his legs a tug. / See him run, see him go. / He did not like it, no! no!”",
            opts: ["6, 7, 6, 7", "7, 6, 7, 6", "6, 7, 7, 6"],
            keep: ["7, 6, 7, 6", "6, 7, 6, 7", "6, 7, 7, 6"],
            emoji: "🐛🧶",
            x: "Count the syllables: See the bug on the rug = [6]; I will give his legs a tug = [7]; See him run, see him go = [6]; He did not like it, no! no! = [7].",
          },
          // unverified: open answers
          {
            type: "open",
            q: "Complete with a figure of speech: When the girl was shy, her cheeks were as red as …",
            a: "… a tomato. (Or: as red as a rose.)",
            emoji: "😊🍅",
          },
          {
            type: "open",
            q: "Complete with a figure of speech: The man was a tall …",
            a: "… tree. (Or: a tall giraffe.)",
            emoji: "🧍🌳",
          },
        ],
      },
      {
        k: "fig3",
        g: "🧱 Vocabulary strategy · Similes and metaphors",
        t: "Metaphor or simile?",
        en: "Homework booklet page 12",
        ic: "🔍",
        from: "Homework p. 12",
        items: [
          fm(
            "The girl ran like the wind.",
            "simile",
            "the girl",
            "the wind",
            "👧💨",
          ),
          fm(
            "The trees were a prison, trapping the boy.",
            "metaphor",
            "the trees",
            "a prison",
            "🌲🧒",
          ),
          fm(
            "The engine of the car roared like a lion.",
            "simile",
            "the engine",
            "a lion",
            "🚗🦁",
          ),
          fm(
            "Pam was as cool as a cucumber.",
            "simile",
            "Pam",
            "a cucumber",
            "👩🥒",
          ),
          fm(
            "The shadows are stains on the snow.",
            "metaphor",
            "the shadows",
            "stains",
            "❄️🌑",
          ),
          fm(
            "The train whistle was like a sad song.",
            "simile",
            "the train whistle",
            "a sad song",
            "🚂🎵",
          ),
          fm(
            "The angry king was a furious lion.",
            "metaphor",
            "the king",
            "a lion",
            "🤴🦁",
          ),
          fm(
            "My mother likes to keep us as busy as bees.",
            "simile",
            "us",
            "bees",
            "👩🐝",
          ),
          fm(
            "My best friend is an angel.",
            "metaphor",
            "my best friend",
            "an angel",
            "🧒😇",
          ),
        ],
      },

      // ---------- Reading · Poetry ----------
      {
        k: "mypoem",
        g: "📖 Reading · Poetry",
        t: "Write a rhyming poem",
        en: "Homework booklet page 16",
        ic: "✍️",
        from: "Homework p. 16",
        items: [
          cj(
            "Pick a rhyming pair for a poem about a kite.",
            ["kite, height", "kite, tree", "kite, red"],
            "🪁",
          ),
          cj(
            "Pick a rhyming pair for a poem about a bird.",
            ["fly, try", "fly, bee", "fly, pop"],
            "🐦",
          ),
          // unverified: a model poem
          {
            type: "open",
            q: "Write a short poem about anything you choose. Use rhyming words: tree, bee · red, bed · fly, try · kite, height …",
            a: "My Red Kite: I have a kite that is red. It hangs on the wall above my bed. It flies so high up in the sky, I wave to the birds as they fly by.",
            vis: SC(
              "sky",
              [
                { e: "🪁", x: 60, y: 30, s: 26, a: "float" },
                { e: "🧒", x: 30, y: 70, s: 26 },
                { e: "🐦", x: 82, y: 20, s: 12, a: "wave" },
              ],
              "red · bed · sky · by",
            ),
          },
        ],
      },
    ],
  };
  // a revision page can load several weeks: each one keeps its data here (Term 2 weeks: "u<unit>w<week>")
  (window.EN_DATA = window.EN_DATA || {}).u2w5 = window.LESSON;
})();
