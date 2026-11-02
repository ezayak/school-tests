// English · Grade 4 · Unit 3 · Week 5 « Irregular Verbs », compound words, vocabulary, Greek roots, argumentative texts. Engine: shared/computer-lesson.js (data-subject="English").
// Sources: Classwork Booklet Term 2 (pages 32–46), Homework Booklet Term 2 (pages 29–31, 33–44); see SOURCES.md. No answer key: answers are unverified (UNVERIFIED.md).
// Teacher-sheet typo fixed: HW p. 39 "protect their crops from pets" → "pests".
// Every word is read aloud and lights up; the cards have animated pictures (Kit.scene in shared/common.js).
(function () {
  const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
  const cj = (q, opts, emoji, x) => ({ type: "mc", q, opts, emoji, x });
  // underline the verb, then write its past tense (Classwork page 33)
  const past = (s, verb, o, emoji, x) => [
    {
      type: "tapw",
      q: "Tap the [verb].",
      s,
      ans: { [verb]: "verb" },
      emoji,
    },
    {
      type: "mc",
      q: `“${s}” What is the past tense of [${verb}]?`,
      opts: o,
      emoji,
      x,
    },
  ];
  // circle the right verb, then regular or irregular (Classwork page 34)
  const RI = ["regular (R)", "irregular (I)"];
  const ri = (s, o, irregular, emoji, x) => [
    { type: "mc", q: s, opts: o, emoji, x },
    {
      type: "mc",
      q: `“${o[0]}” Is it a regular or an irregular verb?`,
      opts: irregular ? [RI[1], RI[0]] : RI,
      keep: RI,
      emoji,
      x: irregular
        ? `[${o[0]}] does not end with -ed.`
        : `[${o[0]}] ends with -ed.`,
    },
  ];
  // circle the compound word(s); ans = {word: "part + part"}
  const cw = (s, ans, emoji) => ({
    type: "tapw",
    q:
      Object.keys(ans).length > 1
        ? `Tap the [${Object.keys(ans).length}] compound words.`
        : "Tap the [compound word].",
    s,
    ans,
    emoji,
  });
  // the missing part of a compound spelling word (Homework page 30)
  const mp = (gap, word, part, wrong, emoji) => ({
    type: "mc",
    q: `${gap} → a spelling word`,
    opts: [part, ...wrong],
    emoji,
    x: `[${word}]`,
  });
  // the meaning of a word with a Greek root
  const gr = (s, word, meaning, wrong, emoji, x) => ({
    type: "mc",
    q: `${s} What does [${word}] mean?`,
    opts: [meaning, ...wrong],
    emoji,
    x,
  });

  window.LESSON = {
    n: 27,
    key: "en4-u3w5",
    grade: 4,
    title: "Irregular Verbs",
    unit: "Unit 3 · Week 5",
    book: "Wonders",
    hub: "../../term-1/english/index.html",
    imgDir: "img/unit3-week5",
    cover: "cover",
    question: {
      q: "In what ways can [advances] in science be [helpful] or [harmful]?",
      a: "Science helps us grow food in new ways: with [hydroponics], plants grow faster and even in space. But new ways can also have [problems]: they can cost a lot, and pests can spread quickly. We must think about both sides.",
      img: "cover",
    },

    stories: [
      {
        t: "Food for Thought",
        en: "Classwork booklet · hydroponics",
        path: "story-food-thought.html",
        cover: { src: "img/food-thought/diagram.jpg" },
      },
      {
        t: "Should Kids Choose Their Own Bedtime?",
        en: "Homework booklet · two sides",
        path: "story-bedtime.html",
        cover: { src: "img/bedtime/bed.jpg" },
      },
      {
        t: "Should Kids Have Dessert Every Day?",
        en: "Homework booklet · two sides",
        path: "story-dessert.html",
        cover: { src: "img/dessert/desserts.jpg" },
      },
    ].map((s) => ({ ...s, g: "📖 Reading · Argumentative text" })),

    decks: [
      {
        k: "irregular",
        g: "🧩 Grammar · Irregular verbs",
        t: "Irregular verbs",
        en: "run → ran · eat → ate · know → known",
        ic: "🔀",
        cover: {
          vis: SC("plain", [
            { t: "run", x: 30, y: 46, s: 12, c: "plain" },
            { t: "→ ran", x: 64, y: 46, s: 12, c: "good", a: "pop:0.6" },
          ]),
        },
        cards: [
          {
            t: "Regular and irregular",
            lines: [
              "Regular past-tense verbs end with [-ed]: walk → walked.",
              "[Irregular] past-tense verbs do [not] end with -ed: run → ran.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🚶", x: 26, y: 62, s: 26, dx: 10, a: "go" },
                { t: "walked", x: 26, y: 22, s: 8, c: "plain" },
                { e: "🏃", x: 70, y: 62, s: 26, dx: 20, a: "go" },
                { t: "ran", x: 70, y: 22, s: 8, c: "good" },
              ],
              "walked · ran",
            ),
          },
          {
            t: "Be and have",
            lines: [
              "be: I [was] · you, we, they [were] · he, she, it [was]",
              "have / has: everyone [had]",
            ],
            vis: SC(
              "room",
              [
                { e: "🐝", x: 30, y: 50, s: 26 },
                { t: "was", x: 30, y: 20, s: 9, c: "good" },
                { e: "📘", x: 70, y: 56, s: 26 },
                { t: "had", x: 70, y: 20, s: 9, c: "good", a: "pop:0.6" },
              ],
              "was · were · had",
            ),
          },
          {
            t: "A spelling change, or no change",
            lines: [
              "Some verbs change a letter inside: run → [ran], begin → [began], drive → [drove].",
              "Some verbs stay the [same]: read → read, set → set, cut → cut, let → let.",
            ],
            vis: SC(
              "room",
              [
                { e: "✂️", x: 34, y: 56, s: 28, a: "nod" },
                { t: "cut → cut", x: 34, y: 20, s: 8, c: "good" },
                { e: "📖", x: 72, y: 56, s: 26 },
                { t: "read → read", x: 72, y: 20, s: 8, c: "good" },
              ],
              "no change",
            ),
          },
          {
            t: "With a helping verb: -n or -en",
            lines: [
              "With [have], [has], [had] or [was], some verbs end with -n or -en.",
              "know → have [known] · eat → have [eaten] · shake → have [shaken] · fall → have [fallen] · freeze → was [frozen]",
            ],
            vis: SC(
              "room",
              [
                { e: "🍽️", x: 36, y: 60, s: 30 },
                { t: "I have eaten.", x: 56, y: 22, s: 9, c: "good" },
              ],
              "have eaten",
            ),
          },
          {
            t: "The list (1)",
            lines: [
              "draw → drew · do → did · run → ran · find → found · know → knew",
              "feel → felt · keep → kept · sing → sang · see → saw · tell → told",
              "say → said · break → broke · wake → woke · smell → smelled / smelt",
              "shake → shook · tear → tore · buy → bought",
            ],
            vis: SC(
              "school",
              [
                { e: "📋", x: 40, y: 54, s: 36 },
                { t: "Classwork p. 37", x: 70, y: 24, s: 8, c: "good" },
              ],
              "irregular past verbs",
            ),
          },
          {
            t: "The list (2)",
            lines: [
              "speak → spoke · drive → drove · go → went · begin → began · set → set",
              "build → built · eat → ate · grow → grew · spend → spent · forget → forgot",
              "bring → brought · cut → cut · let → let · leave → left · take → took",
              "sleep → slept · can → could · fall → fell · make → made · get → got",
            ],
            vis: SC(
              "school",
              [
                { e: "📋", x: 40, y: 54, s: 36 },
                { t: "Classwork p. 37", x: 70, y: 24, s: 8, c: "good" },
              ],
              "irregular past verbs",
            ),
          },
          {
            t: "The list (3)",
            lines: [
              "give → gave · swim → swam · fly → flew · teach → taught",
              "choose → chose · catch → caught · fight → fought",
            ],
            vis: SC(
              "sky",
              [
                { e: "🐦", x: 30, y: 40, s: 24, dx: 40, a: "go" },
                { t: "flew", x: 70, y: 24, s: 9, c: "good" },
              ],
              "fly → flew",
            ),
          },
        ],
      },
      {
        k: "compound",
        g: "🔊 Phonics · Compound words",
        t: "Compound words",
        en: "Two small words → one word",
        ic: "🧱",
        cover: {
          vis: SC("sky", [
            { e: "☀️", x: 28, y: 46, s: 26 },
            { t: "+", x: 46, y: 46, s: 10, c: "plain" },
            { e: "🌻", x: 66, y: 50, s: 30, a: "grow" },
          ]),
        },
        cards: [
          {
            t: "A compound word",
            lines: [
              "A [compound word] is made of smaller words.",
              "snow + ball = [snowball] · bed + room = [bedroom]",
            ],
            vis: SC(
              "night",
              [
                { e: "❄️", x: 24, y: 46, s: 22 },
                { t: "+", x: 42, y: 46, s: 10, c: "light" },
                { e: "⚽", x: 58, y: 46, s: 22 },
                { e: "⚪", x: 82, y: 46, s: 24, a: "pop:1" },
              ],
              "snowball",
            ),
          },
          {
            t: "Three types",
            lines: [
              "Joined together: [evergreen], fishbowl.",
              "With a hyphen: [left-handed].",
              "As separate words: [school day].",
            ],
            vis: SC(
              "grass",
              [
                { e: "🌲", x: 24, y: 56, s: 26 },
                { e: "✍️", x: 50, y: 56, s: 24 },
                { e: "🏫", x: 76, y: 56, s: 26 },
              ],
              "evergreen · left-handed · school day",
            ),
          },
          {
            t: "Syllables",
            lines: [
              "Clap the syllables: camp-fire = [2], o-ver-head = [3].",
              "Each small word has its own syllables.",
            ],
            vis: SC(
              "night",
              [
                { e: "🔥", x: 34, y: 56, s: 30 },
                { e: "👏", x: 68, y: 46, s: 22, a: "pulse" },
              ],
              "camp · fire",
            ),
          },
          {
            t: "The 20 spelling words",
            lines: [
              "2 syllables: fishbowl, campfire, railroad, bedroom, yourself, lookout, snowstorm",
              "blindfold, yardstick, newborn, clothesline, desktop, bookcase, bedspread",
              "3 syllables: overhead, overdo, waterproof, loudspeaker, grandparent, undertake",
            ],
            vis: SC(
              "school",
              [
                { e: "📝", x: 40, y: 54, s: 36 },
                { t: "20 words", x: 68, y: 26, s: 9, c: "good", a: "pop" },
              ],
              "Homework p. 29",
            ),
          },
          {
            t: "VCe: the silent e",
            lines: [
              "A word ends in a silent [e], as in case: the vowel before the consonant is [long].",
              "lake, home, undertake",
            ],
            vis: SC(
              "room",
              [
                { e: "💼", x: 34, y: 56, s: 30 },
                { t: "cas(e)", x: 68, y: 44, s: 12, c: "good", a: "pop:0.6" },
              ],
              "the e is silent",
            ),
          },
        ],
      },
      {
        k: "words",
        g: "🔤 Vocabulary",
        t: "8 new words",
        en: "advancements · characteristics · concern · prevalent · …",
        ic: "🔤",
        cover: {
          vis: SC("sky", [
            { e: "🔬", x: 34, y: 52, s: 32 },
            { e: "🌽", x: 68, y: 52, s: 28, a: "grow" },
          ]),
        },
        cards: [
          {
            t: "advancements",
            lines: [
              "[advancements] = new steps forward; better ways of doing things.",
              "Medical advancements help doctors to treat and cure diseases more effectively.",
            ],
            vis: SC(
              "room",
              [
                { e: "🧑‍⚕️", x: 32, y: 58, s: 30 },
                { e: "💉", x: 62, y: 50, s: 20 },
                { e: "📈", x: 80, y: 30, s: 18, a: "pop" },
              ],
              "steps forward",
            ),
          },
          {
            t: "characteristics",
            lines: [
              "[characteristics] = the qualities that make someone or something what it is.",
              "Honesty is one of the characteristics that is highly appreciated in a person’s personality.",
            ],
            vis: SC(
              "school",
              [
                { e: "🧒", x: 34, y: 58, s: 30 },
                { e: "😇", x: 66, y: 40, s: 22, a: "pop" },
              ],
              "what a person is like",
            ),
          },
          {
            t: "concern",
            lines: [
              "[concern] = a worry.",
              "Parents have a concern about their children crossing the street alone.",
            ],
            vis: SC(
              "grass",
              [
                { e: "😟", x: 28, y: 50, s: 28 },
                { e: "🚸", x: 66, y: 56, s: 28 },
              ],
              "a worry",
            ),
          },
          {
            t: "prevalent",
            lines: [
              "[prevalent] = common; found almost everywhere.",
              "Using smartphones has become prevalent in our society.",
            ],
            vis: SC(
              "school",
              [
                { e: "📱", x: 22, y: 56, s: 20 },
                { e: "📱", x: 42, y: 50, s: 20, a: "pop:0.3" },
                { e: "📱", x: 62, y: 56, s: 20, a: "pop:0.6" },
                { e: "📱", x: 82, y: 50, s: 20, a: "pop:0.9" },
              ],
              "everywhere",
            ),
          },
          {
            t: "inherit",
            lines: [
              "[inherit] = to receive something from your parents.",
              "Plants inherit characteristics from their parents.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🌻", x: 32, y: 52, s: 32 },
                { e: "🌱", x: 66, y: 64, s: 22, a: "grow" },
              ],
              "from parent to child",
            ),
          },
          {
            t: "agriculture",
            lines: [
              "[agriculture] = the science of raising crops and farm animals.",
              "Rain is important for agriculture.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🚜", x: 30, y: 60, s: 30, dx: 10, a: "go" },
                { e: "🌾", x: 66, y: 60, s: 26 },
                { e: "🌽", x: 84, y: 60, s: 22 },
              ],
              "farming",
            ),
          },
          {
            t: "resistance",
            lines: [
              "[resistance] = the act of fighting against something.",
              "Pests can build a resistance to a pesticide: it does not hurt them any more.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🐛", x: 34, y: 62, s: 26 },
                { e: "🛡️", x: 56, y: 56, s: 22, a: "pulse" },
                { e: "💨", x: 76, y: 50, s: 20 },
              ],
              "fighting against",
            ),
          },
          {
            t: "disagree",
            lines: [
              "[disagree] = to have a different opinion.",
              "I disagree with my brother about the best football team.",
            ],
            vis: SC(
              "room",
              [
                { e: "🙋", x: 30, y: 58, s: 28 },
                { e: "🙅", x: 70, y: 58, s: 28, a: "shake" },
              ],
              "different opinions",
            ),
          },
        ],
      },
      {
        k: "roots",
        g: "🧱 Vocabulary strategy · Greek roots",
        t: "Greek roots",
        en: "phys · hydro · photo · astro · agr · techn · chron · gen",
        ic: "🏛️",
        cover: {
          vis: SC("sky", [
            { e: "💧", x: 30, y: 50, s: 26 },
            { e: "☀️", x: 54, y: 40, s: 24 },
            { e: "⭐", x: 76, y: 52, s: 22, a: "blink" },
          ]),
        },
        cards: [
          {
            t: "A Greek root",
            lines: [
              "A [root] is the main part of a word. Many English words have roots from [Greek].",
              "Know the root → guess the word: [hydro] = water → hydroponics = growing plants in water.",
            ],
            src: "img/food-thought/diagram.jpg",
          },
          {
            t: "phys · hydro",
            lines: [
              "[phys] = nature or body: physician, physics, physiology.",
              "[hydro] = water: hydroponics, hydropower, hydroelectric.",
            ],
            vis: SC(
              "sky",
              [
                { e: "🩺", x: 30, y: 54, s: 28 },
                { e: "💧", x: 70, y: 54, s: 28, a: "pulse" },
              ],
              "body · water",
            ),
          },
          {
            t: "photo · astro",
            lines: [
              "[photo] = light: photograph, photosynthesis, photogenic.",
              "[astro] = stars: astronaut, astronomical, astrologer.",
            ],
            vis: SC(
              "night",
              [
                { e: "📷", x: 30, y: 54, s: 28 },
                { e: "⭐", x: 70, y: 40, s: 24, a: "blink" },
                { e: "🧑‍🚀", x: 70, y: 70, s: 20 },
              ],
              "light · stars",
            ),
          },
          {
            t: "agr · techn",
            lines: [
              "[agr] = field: agriculture, agrochemical.",
              "[techn] = art, skill, method: technical, technology.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🌾", x: 30, y: 56, s: 28 },
                { e: "💻", x: 70, y: 56, s: 28 },
              ],
              "field · skill",
            ),
          },
          {
            t: "chron · gen",
            lines: [
              "[chron] = time: chronological, chronicle.",
              "[gen] = race or kind: genetic, generation.",
            ],
            vis: SC(
              "room",
              [
                { e: "⏳", x: 30, y: 54, s: 28 },
                { e: "👪", x: 70, y: 54, s: 28 },
              ],
              "time · kind",
            ),
          },
        ],
      },
    ],
    ideas: [],

    games: [
      {
        k: "ipast",
        g: "🧩 Grammar · Irregular verbs",
        t: "Past tense, fast!",
        en: "Pick the irregular past",
        ic: "⚡",
        items: [
          cj("go → ___", ["went", "goed", "gone"], "🚶"),
          cj("eat → ___", ["ate", "eated", "eaten"], "🍽️"),
          cj("buy → ___", ["bought", "buyed", "brought"], "🛒"),
          cj("bring → ___", ["brought", "bringed", "brang"], "🎁"),
          cj("sleep → ___", ["slept", "sleeped", "slep"], "😴"),
          cj("teach → ___", ["taught", "teached", "tought"], "🧑‍🏫"),
          cj("swim → ___", ["swam", "swimmed", "swum"], "🏊"),
          cj("catch → ___", ["caught", "catched", "cought"], "⚾"),
        ],
      },
      {
        k: "cbuild",
        g: "🔊 Phonics · Compound words",
        t: "Make a compound word",
        en: "Word + word",
        ic: "🧱",
        items: [
          cj(
            "rain + ___ = a colorful arc in the sky",
            ["bow", "coat", "drop"],
            "🌈",
          ),
          cj(
            "tooth + ___ = you brush your teeth with it",
            ["brush", "paste", "ache"],
            "🪥",
          ),
          cj(
            "water + ___ = a big green fruit",
            ["melon", "fall", "proof"],
            "🍉",
          ),
          cj(
            "sand + ___ = you build it at the beach",
            ["castle", "box", "paper"],
            "🏖️",
          ),
          cj(
            "___ + fly = an insect with big, colorful wings",
            ["butter", "cat", "sun"],
            "🦋",
          ),
          cj(
            "___ + case = a place for books",
            ["book", "suit", "pillow"],
            "📚",
          ),
          cj(
            "snow + ___ = a person made of snow",
            ["man", "ball", "flake"],
            "⛄",
          ),
          cj(
            "___ + ball = a game with a bat",
            ["base", "foot", "basket"],
            "⚾",
          ),
        ],
      },
      {
        k: "vmatch",
        g: "🔤 Vocabulary",
        t: "Words and meanings",
        en: "Match the word to its meaning",
        ic: "🔗",
        items: [
          {
            type: "match",
            pairs: [
              {
                vis: SC("room", [{ e: "😟", x: 50, y: 50, s: 44 }], "concern"),
                label: "a worry",
              },
              {
                vis: SC(
                  "school",
                  [{ e: "📱", x: 50, y: 50, s: 40, a: "pulse" }],
                  "prevalent",
                ),
                label: "common, everywhere",
              },
              {
                vis: SC(
                  "room",
                  [{ e: "📈", x: 50, y: 50, s: 40 }],
                  "advancements",
                ),
                label: "new steps forward",
              },
              {
                vis: SC(
                  "grass",
                  [{ e: "🚜", x: 50, y: 50, s: 40 }],
                  "agriculture",
                ),
                label: "raising crops",
              },
              {
                vis: SC(
                  "grass",
                  [{ e: "🛡️", x: 50, y: 50, s: 40 }],
                  "resistance",
                ),
                label: "fighting against something",
              },
            ],
          },
        ],
      },
      {
        k: "rmatch",
        g: "🧱 Vocabulary strategy · Greek roots",
        t: "Roots and meanings",
        en: "Match the root to its meaning",
        ic: "🏛️",
        items: [
          {
            type: "match",
            pairs: [
              {
                vis: SC("sky", [{ e: "💧", x: 50, y: 50, s: 40 }], "hydro"),
                label: "water",
              },
              {
                vis: SC("sky", [{ e: "☀️", x: 50, y: 50, s: 40 }], "photo"),
                label: "light",
              },
              {
                vis: SC(
                  "night",
                  [{ e: "⭐", x: 50, y: 50, s: 40, a: "blink" }],
                  "astro",
                ),
                label: "stars",
              },
              {
                vis: SC("room", [{ e: "⏳", x: 50, y: 50, s: 40 }], "chron"),
                label: "time",
              },
              {
                vis: SC("grass", [{ e: "🌾", x: 50, y: 50, s: 40 }], "agr"),
                label: "field",
              },
              {
                vis: SC("room", [{ e: "🩺", x: 50, y: 50, s: 40 }], "phys"),
                label: "nature or body",
              },
            ],
          },
        ],
      },
    ],

    exercises: [
      // ---------- Grammar · Irregular verbs ----------
      {
        k: "irr1",
        keep: true,
        g: "🧩 Grammar · Irregular verbs",
        t: "Find the verb, write the past",
        en: "Classwork booklet page 33",
        ic: "🔀",
        from: "Classwork p. 33",
        items: [
          ...past(
            "We drive all night to my cousin’s house.",
            "drive",
            ["drove", "drived", "driven"],
            "🚗🌙",
          ),
          ...past(
            "The child break the glass vase.",
            "break",
            ["broke", "breaked", "broken"],
            "🏺💥",
          ),
          ...past(
            "The bumblebee is on the flower.",
            "is",
            ["was", "were", "is"],
            "🐝🌸",
            "The bumblebee = one → [was].",
          ),
          ...past(
            "Carlos go to school late today.",
            "go",
            ["went", "goed", "gone"],
            "🏫⏰",
          ),
          ...past(
            "He has a book about sharks in the ocean.",
            "has",
            ["had", "haved", "has"],
            "📘🦈",
          ),
          ...past(
            "The rain begin to fall outside.",
            "begin",
            ["began", "beginned", "begun"],
            "🌧️",
          ),
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Write four sentences about getting ready for school. Each sentence should include an [irregular verb] in the past tense.",
            a: "I woke up at seven o’clock. I ate eggs for breakfast. Then I put on my uniform and found my bag. My dad drove me to school.",
            vis: SC(
              "room",
              [
                { e: "⏰", x: 24, y: 40, s: 22, a: "shake" },
                { e: "🧒", x: 50, y: 60, s: 30 },
                { e: "🎒", x: 78, y: 64, s: 22 },
              ],
              "woke · ate · found · drove",
            ),
          },
        ],
      },
      {
        k: "irr2",
        keep: true,
        g: "🧩 Grammar · Irregular verbs",
        t: "Regular or irregular?",
        en: "Classwork booklet page 34",
        ic: "🔀",
        from: "Classwork p. 34",
        items: [
          ...ri(
            "The workers slowly (built / builded) the house.",
            ["built", "builded"],
            true,
            "👷🏠",
          ),
          ...ri(
            "She (fold / folded) the laundry before putting it away.",
            ["folded", "fold"],
            false,
            "👕",
          ),
          {
            type: "mc",
            q: "I (smelt / smelled) the pie baking from down the street.",
            opts: [
              "Both are right.",
              "Only smelt is right.",
              "Only smelled is right.",
            ],
            emoji: "🥧👃",
            x: "The verb list says smell → [smelled / smelt]. smelled is regular (R), smelt is irregular (I).",
          },
          ...ri(
            "My mother (set / setted) the table earlier.",
            ["set", "setted"],
            true,
            "🍽️",
          ),
          ...ri(
            "Together we (drew / drawed) a picture of our family.",
            ["drew", "drawed"],
            true,
            "🖍️👪",
          ),
          ...ri(
            "They had (knew / known) that this would happen.",
            ["known", "knew"],
            true,
            "🤔",
            "After [had] → known.",
          ),
          // the excerpt is printed on the page; "A New Kind of Corn" itself is not in the booklet
          {
            type: "tapw",
            q: "Tap the [6] main verbs.",
            s: "Over time, pests can build a resistance to any pesticide. A 2011 study shows that rootworm beetles are already developing a resistance to Bt corn. If these rootworms can eat Bt corn and survive, why grow it?",
            ans: {
              build: "could build",
              shows: "showed",
              developing: "were developing",
              eat: "could eat",
              survive: "survived",
              grow: "grew",
            },
            emoji: "🌽🐛",
            x: "can build → could build · shows → showed · are developing → were developing · can eat → could eat · survive → survived · grow → grew",
          },
          cj(
            "can build → past",
            ["could build", "can built", "builded"],
            "🐛🛡️",
          ),
          cj("shows → past", ["showed", "shown", "showes"], "📊"),
          cj(
            "are developing → past",
            ["were developing", "was developing", "are developed"],
            "🐛",
          ),
          cj("can eat → past", ["could eat", "can ate", "eated"], "🌽"),
          cj("survive → past", ["survived", "survove", "survivd"], "🐛"),
          cj("grow → past", ["grew", "growed", "grown"], "🌽🌱"),
        ],
      },
      {
        k: "iproof",
        g: "🧩 Grammar · Irregular verbs",
        t: "Correct the verbs",
        en: "Classwork booklet page 35",
        ic: "✏️",
        from: "Classwork p. 35",
        items: [
          cj(
            "“The reporter bringed his pad and taked notes while the mayor speaked.” Which is right?",
            [
              "The reporter brought his pad and took notes while the mayor spoke.",
              "The reporter brung his pad and took notes while the mayor spoked.",
              "The reporter brought his pad and taken notes while the mayor spoke.",
            ],
            "📰🎤",
            "bring → [brought] · take → [took] · speak → [spoke]",
          ),
          cj(
            "“I cutted the paper and folded it in the shape of an animal.” Which is right?",
            [
              "I cut the paper and folded it in the shape of an animal.",
              "I cuts the paper and folded it in the shape of an animal.",
              "I cutted the paper and fold it in the shape of an animal.",
            ],
            "✂️🦢",
            "cut → [cut]: no change.",
          ),
          cj(
            "“You have fell down twice while skiing this morning.” Which is right?",
            [
              "You have fallen down twice while skiing this morning.",
              "You have falled down twice while skiing this morning.",
              "You has fallen down twice while skiing this morning.",
            ],
            "⛷️",
            "After [have] → fallen.",
          ),
          cj(
            "“The shirt was teared in the washing machine and ruined.” Which is right?",
            [
              "The shirt was torn in the washing machine and ruined.",
              "The shirt was tore in the washing machine and ruined.",
              "The shirt were torn in the washing machine and ruined.",
            ],
            "👕🌀",
            "After [was] → torn.",
          ),
          cj(
            "“My mother letted me play outside while she maked dinner.” Which is right?",
            [
              "My mother let me play outside while she made dinner.",
              "My mother let me play outside while she maked dinner.",
              "My mother lets me play outside while she made dinner.",
            ],
            "👩‍🍳⚽",
            "let → [let] · make → [made]",
          ),
        ],
      },
      {
        k: "itest",
        g: "🧩 Grammar · Irregular verbs",
        t: "Test: irregular verbs",
        en: "Classwork booklet page 36",
        ic: "📝",
        from: "Classwork p. 36",
        items: [
          cj(
            "(3) First, I ___ my room. Which past-tense verb goes in the blank?",
            ["cleaned", "clean", "cleanen", "cleaning"],
            "🧹",
          ),
          cj(
            "(4) Then I ___ the grass. Which past-tense verb goes in the blank?",
            ["cut", "cutted", "cutten", "cuttened"],
            "🌱✂️",
          ),
          cj(
            "(5) I accidentally ___ the hose out in the yard. Which past-tense verb goes in the blank?",
            ["left", "leave", "leaved", "leaven"],
            "🚿",
          ),
          cj(
            "(6) Finally, I ___ the trash out. Which past-tense verb goes in the blank?",
            ["took", "taken", "taked", "take"],
            "🗑️",
          ),
          cj(
            "(1) Jared and I was froze after playing outside in the snow! Which is the correct helping verb and past-tense verb?",
            ["were frozen", "was frozen", "was freezed", "Make no change."],
            "❄️🥶",
            "Jared and I = two → [were] frozen.",
          ),
          cj(
            "(2) We have heard the school bell, so we ran inside. Which is the correct helping verb and past-tense verb?",
            ["had heard", "had heared", "has heared", "Make no change."],
            "🔔",
          ),
          cj(
            "(3) I had tried so hard to warm up by rubbing my face. Which is the correct helping verb and past-tense verb?",
            ["Make no change.", "were tried", "had tryed", "have tryed"],
            "🤲",
            "[had tried] is already right.",
          ),
          cj(
            "(4) I had to sit down and pay attention though, because the lesson have started. Which is the correct helping verb and past-tense verb?",
            ["had started", "had start", "have starten", "Make no change."],
            "🏫",
          ),
        ],
      },
      {
        k: "ifill",
        g: "🧩 Grammar · Irregular verbs",
        t: "Irregular past tense verbs",
        en: "Classwork booklet page 38",
        ic: "✍️",
        from: "Classwork p. 38",
        items: [
          cj(
            "They ___ (swim) 500m yesterday afternoon.",
            ["swam", "swimmed", "swum"],
            "🏊",
          ),
          cj(
            "Mrs. Black ___ (teach) English at the university.",
            ["taught", "teached", "tought"],
            "👩‍🏫",
          ),
          cj(
            "The Smiths ___ (speak) Italian to the waitress.",
            ["spoke", "speaked", "spoken"],
            "🍝",
          ),
          cj(
            "Peter ___ (tell) me that he lived in New York.",
            ["told", "telled", "tell"],
            "🗽",
          ),
          cj(
            "I ___ (give) my mother a CD for her birthday.",
            ["gave", "gived", "given"],
            "💿🎁",
          ),
          cj(
            "She ___ (drink) too much coffee yesterday.",
            ["drank", "drinked", "drunk"],
            "☕",
          ),
          cj(
            "We ___ (choose) steak for dinner.",
            ["chose", "choosed", "chosen"],
            "🥩",
          ),
          cj(
            "“The ambulance take the injured man to the hospital.” In the past tense:",
            [
              "The ambulance took the injured man to the hospital.",
              "The ambulance taked the injured man to the hospital.",
              "The ambulance taken the injured man to the hospital.",
            ],
            "🚑",
          ),
          cj(
            "“The boys fight after school yesterday.” In the past tense:",
            [
              "The boys fought after school yesterday.",
              "The boys fighted after school yesterday.",
              "The boys fights after school yesterday.",
            ],
            "👦👦",
          ),
          cj(
            "“Fred catch a cold last week.” In the past tense:",
            [
              "Fred caught a cold last week.",
              "Fred catched a cold last week.",
              "Fred cought a cold last week.",
            ],
            "🤧",
          ),
          cj(
            "The children ___ (built - builded) a sandcastle at the beach.",
            ["built", "builded"],
            "🏖️",
          ),
          cj(
            "The bed was very comfortable; I ___ (sleeped - slept) very well.",
            ["slept", "sleeped"],
            "🛏️",
          ),
          cj(
            "We went to Kate’s house, but she ___ (was - were) not at home.",
            ["was", "were"],
            "🏠",
          ),
          cj(
            "My cousin ___ (forgut - forgot) his keys in the taxi.",
            ["forgot", "forgut"],
            "🔑🚕",
          ),
          cj(
            "The window was open, so the bird ___ (flew, flied) away.",
            ["flew", "flied"],
            "🐦🪟",
          ),
        ],
      },
      {
        k: "ifill2",
        g: "🧩 Grammar · Irregular verbs",
        t: "Irregular past verbs",
        en: "Homework booklet page 34",
        ic: "✍️",
        from: "Homework p. 34",
        items: [
          cj(
            "She ___ (forget) to buy some milk.",
            ["forgot", "forgetted", "forgotten"],
            "🥛",
          ),
          cj(
            "I ___ (speak) English in class today.",
            ["spoke", "speaked", "spoken"],
            "🗣️",
          ),
          cj("They ___ (run) 10km.", ["ran", "runned", "run"], "🏃"),
          cj(
            "He ___ (leave) the house at 8am.",
            ["left", "leaved", "leaft"],
            "🏠🕗",
          ),
          cj(
            "We ___ (buy) sandwiches for lunch.",
            ["bought", "buyed", "brought"],
            "🥪",
          ),
          cj("He ___ (keep) his promise.", ["kept", "keeped", "keep"], "🤝"),
          cj(
            "They ___ (eat) sushi for dinner.",
            ["ate", "eated", "eaten"],
            "🍣",
          ),
          cj(
            "I ___ (bring) donuts for everyone.",
            ["brought", "bringed", "bought"],
            "🍩",
          ),
          cj(
            "The girl ___ (tear) the gift’s wrap.",
            ["tore", "teared", "torn"],
            "🎁",
          ),
          cj(
            "The children ___ (break) their neighbor’s window.",
            ["broke", "breaked", "broken"],
            "🪟💥",
          ),
          cj("Luke ___ (do) his homework.", ["did", "doed", "done"], "📝"),
          cj(
            "The bird ___ (fly) between the trees.",
            ["flew", "flied", "flown"],
            "🐦🌳",
          ),
          cj(
            "When I ___ (get) home, I smelled something nice.",
            ["got", "getted", "gotten"],
            "🏠",
          ),
          cj(
            "When I got home, I ___ (smell) something nice.",
            ["smelled", "smelld", "smole"],
            "👃🍲",
            "smell → [smelled] or [smelt]: both are right.",
          ),
          cj(
            "My grandma ___ (make) a bright scarf.",
            ["made", "maked", "make"],
            "👵🧣",
          ),
          cj(
            "Last summer, my brother and I ___ (build) a sandcastle.",
            ["built", "builded", "build"],
            "🏖️",
          ),
        ],
      },

      // ---------- Phonics · Compound words ----------
      {
        k: "ccircle",
        g: "🔊 Phonics · Compound words",
        t: "Find the compound word",
        en: "Classwork booklet page 39",
        ic: "🔍",
        from: "Classwork p. 39",
        items: [
          cw(
            "We love to play with snowballs.",
            { snowballs: "snow + balls" },
            "⛄",
          ),
          cw(
            "I was too full to eat any more pancakes.",
            { pancakes: "pan + cakes" },
            "🥞",
          ),
          cw(
            "Tod picked up seashells at the beach.",
            { seashells: "sea + shells" },
            "🐚",
          ),
          cw(
            "Can anyone tell me the answer of my question?",
            { anyone: "any + one" },
            "🙋",
          ),
          cw(
            "I had butterflies in my stomach before the big game.",
            { butterflies: "butter + flies" },
            "🦋",
          ),
          cw(
            "I would love to eat hamburgers for lunch today.",
            { hamburgers: "ham + burgers" },
            "🍔",
          ),
          cw(
            "Ben wears a helmet when he rides his skateboard.",
            { skateboard: "skate + board" },
            "🛹",
          ),
          cw(
            "I put my books in the bookcase.",
            { bookcase: "book + case" },
            "📚",
          ),
          cw(
            "At the end of the day, I went to my bedroom to sleep.",
            { bedroom: "bed + room" },
            "🛏️",
          ),
          cw(
            "When I wake up in the morning, I use a toothbrush to brush my teeth.",
            { toothbrush: "tooth + brush" },
            "🪥",
          ),
        ],
      },
      {
        k: "ccircle2",
        g: "🔊 Phonics · Compound words",
        t: "Compound words",
        en: "Homework booklet pages 35–36",
        ic: "🔍",
        from: "Homework p. 35–36",
        items: [
          cw(
            "The girl was playing baseball at the park.",
            { baseball: "base + ball" },
            "⚾",
          ),
          cw(
            "Sandy brought some balloons for her sister’s birthday.",
            { birthday: "birth + day" },
            "🎈",
          ),
          cw(
            "I help my mom put dirty dishes in the dishwasher.",
            { dishwasher: "dish + washer" },
            "🍽️",
          ),
          cw(
            "As soon as it stopped raining, a beautiful rainbow appeared.",
            { rainbow: "rain + bow" },
            "🌈",
          ),
          cw(
            "We will go to the cinema this afternoon.",
            { afternoon: "after + noon" },
            "🎬",
          ),
          cw(
            "This morning, I ate a big blueberry pie.",
            { blueberry: "blue + berry" },
            "🫐",
          ),
          cw(
            "I love eating strawberries everyday.",
            { strawberries: "straw + berries", everyday: "every + day" },
            "🍓",
          ),
          cw(
            "We sang a song around the campfire.",
            { campfire: "camp + fire" },
            "🔥",
          ),
          cw(
            "Mom cuts the watermelon into slices.",
            { watermelon: "water + melon" },
            "🍉",
          ),
          cw(
            "I don’t have a blackboard at home.",
            { blackboard: "black + board" },
            "🧑‍🏫",
          ),
          // unverified: a model for the research task
          {
            type: "open",
            q: "Research and write [10] new compound words of your own. Then write the words that make up each one.",
            a: "sunflower = sun + flower · football = foot + ball · rainbow = rain + bow · cupcake = cup + cake · airplane = air + plane · goldfish = gold + fish · doorbell = door + bell · sunglasses = sun + glasses · popcorn = pop + corn · jellyfish = jelly + fish",
            vis: SC(
              "sky",
              [
                { e: "🌻", x: 22, y: 56, s: 24 },
                { e: "⚽", x: 42, y: 60, s: 20 },
                { e: "🧁", x: 60, y: 60, s: 20 },
                { e: "🐟", x: 78, y: 56, s: 22, a: "swing" },
              ],
              "10 compound words",
            ),
          },
        ],
      },
      {
        k: "csort",
        g: "🔊 Phonics · Compound words",
        t: "Two or three syllables?",
        en: "Homework booklet page 29",
        ic: "👏",
        from: "Homework p. 29",
        items: [
          {
            type: "sort",
            q: "Tap a word, then the box with its number of syllables.",
            cols: [
              { k: "2", t: "two syllables", ex: "camp-fire", e: "✌️" },
              { k: "3", t: "three syllables", ex: "o-ver-head", e: "👌" },
            ],
            words: [
              { w: "fishbowl", k: "2", e: "🐠" },
              { w: "campfire", k: "2", e: "🔥" },
              { w: "railroad", k: "2", e: "🛤️" },
              { w: "bedroom", k: "2", e: "🛏️" },
              { w: "yourself", k: "2", e: "🪞" },
              { w: "lookout", k: "2", e: "🔭" },
              { w: "snowstorm", k: "2", e: "🌨️" },
              { w: "blindfold", k: "2", e: "🙈" },
              { w: "yardstick", k: "2", e: "📏" },
              { w: "newborn", k: "2", e: "👶" },
              { w: "clothesline", k: "2", e: "👕" },
              { w: "desktop", k: "2", e: "🖥️" },
              { w: "bookcase", k: "2", e: "📚" },
              { w: "bedspread", k: "2", e: "🛌" },
              { w: "overhead", k: "3", e: "⬆️" },
              { w: "overdo", k: "3", e: "😵" },
              { w: "waterproof", k: "3", e: "☔" },
              { w: "loudspeaker", k: "3", e: "📢" },
              { w: "grandparent", k: "3", e: "👴" },
              { w: "undertake", k: "3", e: "💪" },
            ],
          },
        ],
      },
      {
        k: "cmiss",
        g: "🔊 Phonics · Compound words",
        t: "The missing part",
        en: "Homework booklet page 30",
        ic: "🧩",
        from: "Homework p. 30",
        items: [
          mp("over + __ (2 letters)", "overdo", "do", ["head", "go"], "😵"),
          mp("look + ___ (3 letters)", "lookout", "out", ["in", "at"], "🔭"),
          mp(
            "book + ____ (4 letters)",
            "bookcase",
            "case",
            ["shop", "mark"],
            "📚",
          ),
          mp("___ + born (3 letters)", "newborn", "new", ["sun", "old"], "👶"),
          mp(
            "____ + fire (4 letters)",
            "campfire",
            "camp",
            ["bone", "wild"],
            "🔥",
          ),
          mp(
            "rail + ____ (4 letters)",
            "railroad",
            "road",
            ["way", "line"],
            "🛤️",
          ),
          mp(
            "_____ + parent (5 letters)",
            "grandparent",
            "grand",
            ["great", "step"],
            "👴",
          ),
          mp(
            "water + _____ (5 letters)",
            "waterproof",
            "proof",
            ["melon", "fall"],
            "☔",
          ),
          mp(
            "____ + head (4 letters)",
            "overhead",
            "over",
            ["fore", "red"],
            "⬆️",
          ),
          mp(
            "under + ____ (4 letters)",
            "undertake",
            "take",
            ["line", "wear"],
            "💪",
          ),
          mp(
            "blind + ____ (4 letters)",
            "blindfold",
            "fold",
            ["spot", "side"],
            "🙈",
          ),
          mp("desk + ___ (3 letters)", "desktop", "top", ["mat", "lamp"], "🖥️"),
          mp(
            "____ + speaker (4 letters)",
            "loudspeaker",
            "loud",
            ["soft", "fast"],
            "📢",
          ),
          mp(
            "your + ____ (4 letters)",
            "yourself",
            "self",
            ["shelf", "own"],
            "🪞",
          ),
          mp(
            "____ + bowl (4 letters)",
            "fishbowl",
            "fish",
            ["soup", "rice"],
            "🐠",
          ),
          mp(
            "___ + spread (3 letters)",
            "bedspread",
            "bed",
            ["mid", "out"],
            "🛌",
          ),
          mp(
            "clothes + ____ (4 letters)",
            "clothesline",
            "line",
            ["pin", "horse"],
            "👕",
          ),
        ],
      },
      {
        k: "cspell",
        g: "🔊 Phonics · Compound words",
        t: "Find the spelling mistakes",
        en: "Classwork booklet page 40",
        ic: "✏️",
        from: "Classwork p. 40",
        items: [
          {
            type: "tapw",
            fix: true,
            q: "Six compound words are written as two words. Tap the [second part] of each one.",
            s: "Camping may seem like a good idea, but do your self a favor and try it at home first! Camping under the stars is a brave thing to under take. Use your backyard as a test to see if you like it. You may not be able to build a camp fire, but at least you’ll see what it is like to rough it outdoors.\nTo sleep outside, you’ll need a water proof tent and a sleeping bag. You might also want to grab a pillow from your bed room. It is best to try it in the summer (and not in a snow storm in the middle of the winter!). Before you march outside with your flashlight, be sure to ask your parents’ permission. If you’re lucky, they might even join you!",
            ans: {
              self: "yourself",
              take: "undertake",
              fire: "campfire",
              proof: "waterproof",
              room: "bedroom",
              storm: "snowstorm",
            },
            emoji: "⛺🌟",
            x: "yourself · undertake · campfire · waterproof · bedroom · snowstorm",
          },
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Write about whether you would like to go camping under the stars. Use at least four words from the spelling list.",
            a: "I would like to go camping with my grandparent. We would sit by the campfire and look at the stars overhead. I would bring a waterproof tent and a bedspread. If a snowstorm came, we would go back to my bedroom!",
            vis: SC(
              "night",
              [
                { e: "⛺", x: 36, y: 62, s: 34 },
                { e: "🔥", x: 66, y: 70, s: 20, a: "pulse" },
                { e: "⭐", x: 70, y: 22, s: 14, a: "blink" },
              ],
              "camping under the stars",
            ),
          },
        ],
      },

      // ---------- Vocabulary ----------
      {
        k: "vocab",
        keep: true,
        g: "🔤 Vocabulary",
        t: "Vocabulary",
        en: "Homework booklet page 31",
        ic: "🔤",
        from: "Homework p. 31",
        items: [
          cj(
            "Parents have a ___ about their children crossing the street alone.",
            ["concern", "advancements", "characteristics", "prevalent"],
            "😟🚸",
          ),
          cj(
            "Medical ___ help doctors to treat and cure diseases more effectively.",
            ["advancements", "concern", "characteristics", "prevalent"],
            "🧑‍⚕️💉",
          ),
          cj(
            "Using smartphones has become ___ in our society.",
            ["prevalent", "concern", "advancements", "characteristics"],
            "📱",
          ),
          cj(
            "Honesty is one of the ___ that is highly appreciated in a person’s personality.",
            ["characteristics", "advancements", "concern", "prevalent"],
            "😇",
          ),
          {
            type: "match",
            pairs: [
              {
                vis: SC("grass", [{ e: "🌱", x: 50, y: 50, s: 40 }], "inherit"),
                label: "to receive something from one’s parents",
              },
              {
                vis: SC(
                  "grass",
                  [{ e: "🚜", x: 50, y: 50, s: 40 }],
                  "agriculture",
                ),
                label: "the science of raising crops",
              },
              {
                vis: SC(
                  "grass",
                  [{ e: "🛡️", x: 50, y: 50, s: 40 }],
                  "resistance",
                ),
                label: "the act of fighting against something",
              },
            ],
          },
          // unverified: a model sentence
          {
            type: "open",
            q: "Put the word [disagree] in a sentence of your own.",
            a: "My sister and I disagree about which movie to watch.",
            vis: SC(
              "room",
              [
                { e: "🙋", x: 30, y: 58, s: 28 },
                { e: "🙅", x: 70, y: 58, s: 28, a: "shake" },
              ],
              "disagree",
            ),
          },
        ],
      },

      // ---------- Vocabulary strategy · Greek roots ----------
      {
        k: "greek1",
        g: "🧱 Vocabulary strategy · Greek roots",
        t: "Greek roots and context clues",
        en: "Classwork booklet page 44",
        ic: "🏛️",
        from: "Classwork p. 44",
        // unverified: the meanings are my wording
        items: [
          gr(
            "“For many years, physicists, biologists, botanists, and other scientists have studied how we can use the awesome power of water to help humanity.”",
            "physicists",
            "scientists who study nature and how things work",
            ["people who grow plants", "doctors for animals"],
            "🔬",
            "[phys] = nature or body.",
          ),
          gr(
            "“Many hydroponic systems grow plants in tanks or trays filled with nutrient-rich water.”",
            "hydroponic",
            "growing plants in water, not soil",
            ["growing plants in sand", "growing plants in the dark"],
            "💧🌱",
            "[hydro] = water.",
          ),
          gr(
            "“Plants produce food during a process called photosynthesis. They use energy from the sun, carbon dioxide, and water to produce sugar, which is their food.”",
            "photosynthesis",
            "how plants use light to make their food",
            ["how plants drink water", "how plants make seeds"],
            "☀️🌿",
            "[photo] = light.",
          ),
          gr(
            "“Astronauts have even used hydroponics to grow plants in space!”",
            "astronauts",
            "people who travel into space, to the stars",
            ["people who study plants", "people who build ships"],
            "🧑‍🚀🚀",
            "[astro] = stars.",
          ),
        ],
      },
      {
        k: "greek2",
        g: "🧱 Vocabulary strategy · Greek roots",
        t: "Choose the meaning",
        en: "Classwork booklet pages 45–46",
        ic: "🏛️",
        from: "Classwork p. 45–46",
        items: [
          gr(
            "As a young scientist, she had studied physiology.",
            "physiology",
            "the science of studying the human body",
            ["the science of studying water"],
            "🩺",
            "[phys] = nature or body.",
          ),
          gr(
            "There is a plan to build a hydroelectric dam.",
            "hydroelectric",
            "water electricity",
            ["earth electricity"],
            "💧⚡",
            "[hydro] = water.",
          ),
          gr(
            "I went on a photography course to learn how to capture good photos.",
            "photography",
            "using light to make photos",
            ["using nature to make photos"],
            "📷",
            "[photo] = light.",
          ),
          gr(
            "We have to arrange the events in a chronological order.",
            "chronological",
            "time sequence",
            ["stars sequence"],
            "⏳",
            "[chron] = time.",
          ),
          gr(
            "The government is developing technologies to improve the citizen’s safety.",
            "technologies",
            "the practical method of knowledge",
            ["the natural knowledge"],
            "💻",
            "[techn] = art, skill, method.",
          ),
          gr(
            "The rainfall also had a big impact for much of the agriculture in our country.",
            "agriculture",
            "related to fields for growing food plants",
            ["related to methods of planting food crops"],
            "🌾",
            "[agr] = field.",
          ),
          gr(
            "The astrologer studied the stars to predict people’s future.",
            "astrologer",
            "someone who studies stars",
            ["someone who studies the light"],
            "⭐",
            "[astro] = stars.",
          ),
          gr(
            "The scientist studied the genetic characteristics of the plants to understand how they inherit characteristics from their parents.",
            "genetic",
            "related to kinds",
            ["related to fields"],
            "🧬",
            "[gen] = race or kind.",
          ),
        ],
      },
      {
        k: "greek3",
        g: "🧱 Vocabulary strategy · Greek roots",
        t: "Greek roots: more words",
        en: "Homework booklet pages 37–39",
        ic: "🏛️",
        from: "Homework p. 37–39",
        items: [
          gr(
            "The site isn’t photogenic enough for a film set.",
            "photogenic",
            "produced by light",
            ["produced by water"],
            "📷🎬",
            "[photo] = light.",
          ),
          gr(
            "The physician examined the patient’s health.",
            "physician",
            "a person who studies human bodies",
            ["a person who uses methods"],
            "🩺",
            "[phys] = nature or body.",
          ),
          gr(
            "We learned about hydropower in the science class.",
            "hydropower",
            "power generated by water",
            ["power generated by sunlight"],
            "💧⚡",
            "[hydro] = water.",
          ),
          gr(
            "This generation of children likes to play outside.",
            "generation",
            "a group of people born around the same time",
            ["a kind of skill"],
            "👧👦",
            "[gen] = race or kind.",
          ),
          gr(
            "The chronicle of events was fascinating to read.",
            "chronicle",
            "a record of time",
            ["a type of light photos"],
            "📜",
            "[chron] = time.",
          ),
          gr(
            "We saw a beautiful astronomical show about the distant galaxies.",
            "astronomical",
            "the study of stars",
            ["the study of light"],
            "🌌",
            "[astro] = stars.",
          ),
          gr(
            "The school had a special technical class where students learned about computers.",
            "technical",
            "skills class",
            ["art class"],
            "💻",
            "[techn] = art, skill, method.",
          ),
          gr(
            "Farmers often depend on agrochemical products to protect their crops from pests.",
            "agrochemical",
            "chemicals used in fields",
            ["types of food crops"],
            "🚜🧪",
            "[agr] = field.",
          ),
        ],
      },

      // ---------- Reading · Argumentative text ----------
      {
        k: "prosCons",
        g: "📖 Reading · Argumentative text",
        t: "Pros and cons of daily homework",
        en: "Homework booklet page 44",
        ic: "⚖️",
        from: "Homework p. 44",
        // unverified: open answers
        items: [
          {
            type: "open",
            q: "Should students have daily homework? Write three [pros]: good things about having daily homework.",
            a: "We practice what we learned in class. · We learn to plan our time and be responsible. · Our parents can see what we learn.",
            src: "img/unit3-week5/homework.jpg",
          },
          {
            type: "open",
            q: "Write three [cons]: challenges of having daily homework.",
            a: "We have less time to play and rest. · We can feel tired and stressed. · Some homework is hard to do without help.",
            src: "img/unit3-week5/homework.jpg",
          },
          {
            type: "open",
            q: "What’s your opinion? Do you think students should have homework every day? Why or why not?",
            a: "I think students should have a little homework every day, because it helps us remember what we learned. But it should be short, so we still have time to play and rest.",
            src: "img/unit3-week5/homework.jpg",
          },
        ],
      },
    ],
  };
  // a revision page can load several weeks: each one keeps its data here (Term 2 weeks: "u<unit>w<week>")
  (window.EN_DATA = window.EN_DATA || {}).u3w5 = window.LESSON;
})();
