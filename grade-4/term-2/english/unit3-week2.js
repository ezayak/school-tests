// English · Grade 4 · Unit 3 · Week 2 « Verb Tenses », subject-verb agreement, silent letters, context clues. Engine: shared/computer-lesson.js (data-subject="English").
// Sources: Classwork Booklet Term 2 (pages 16–27, 31), Homework Booklet Term 2 (pages 18–27); see SOURCES.md. No answer key: answers are unverified (UNVERIFIED.md).
// The booklet has no Talk About It page for this week: the cover is the picture from "How Vera Helped", and the question is not the book's Essential Question.
// Every word is read aloud and lights up; the cards have animated pictures (Kit.scene in shared/common.js).
(function () {
  const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
  const cj = (q, opts, emoji, x) => ({ type: "mc", q, opts, emoji, x });
  // name the tense of the verb; set = the names the sheet lets you choose from
  const TENSES = [
    "present simple",
    "present progressive",
    "past simple",
    "past progressive",
    "future simple",
    "future progressive",
  ];
  const tn = (s, verb, name, set, emoji) => ({
    type: "mc",
    q: `“${s}” Which tense is the verb?`,
    opts: [name, ...set.filter((x) => x !== name)],
    keep: set,
    emoji,
    x: `The verb: [${verb}] → ${name}.`,
  });
  // complete the sentence with the verb in brackets; o = [right, wrong, wrong]
  const vf = (s, base, tense, o, emoji) => ({
    type: "mc",
    q: `${s} (${base} · ${tense})`,
    opts: o,
    emoji,
  });
  // circle the present-tense verb, then choose the progressive form (Classwork page 16)
  const prog = (s, verb, o, emoji) => [
    {
      type: "tapw",
      q: "Tap the [present-tense verb].",
      s,
      ans: { [verb]: "present" },
      emoji,
    },
    {
      type: "mc",
      q: `“${s}” Which sentence has the [progressive form]?`,
      opts: o,
      emoji,
    },
  ];
  // circle the word with a silent letter; ans = {word: "pattern"}
  const sil = (s, ans, emoji, x) => ({
    type: "tapw",
    q:
      Object.keys(ans).length > 1
        ? `Tap the [${Object.keys(ans).length}] words with a silent letter.`
        : "Tap the word with a [silent letter].",
    s,
    ans,
    emoji,
    x,
  });
  // fill in the missing letter of a spelling word (Homework page 20)
  const ml = (gap, word, letter, wrong, emoji) => ({
    type: "mc",
    q: `${gap} → which letter is missing?`,
    opts: [letter, ...wrong],
    emoji,
    x: `[${word}]`,
  });
  // context clues: which words help, and what the word means
  const ctx = (s, word, clue, wrongClues, meaning, wrong, emoji) => [
    {
      type: "mc",
      q: `“${s}” Which words help you understand [${word}]?`,
      opts: [clue, ...wrongClues],
      emoji,
    },
    {
      type: "mc",
      q: `What does “${word}” mean?`,
      opts: [meaning, ...wrong],
      emoji,
    },
  ];

  window.LESSON = {
    n: 26,
    key: "en4-u3w2",
    grade: 4,
    title: "Verb Tenses",
    unit: "Unit 3 · Week 2",
    book: "Wonders",
    hub: "../../term-1/english/index.html",
    imgDir: "img/unit3-week2",
    cover: "cover",
    // unverified: not the book's Essential Question (no Talk About It page in the booklets)
    question: {
      q: "How can we [help] the people around us?",
      a: "We can see what people [need] and share what we have. Vera collects the extra food at lunch and brings it to [older neighbors] who cannot easily leave their homes. In the end, Brad wants to help too.",
      img: "cover",
    },

    stories: [
      {
        t: "How Vera Helped",
        en: "Classwork booklet · realistic fiction",
        path: "story-vera.html",
        cover: { src: "img/vera/door.jpg" },
        g: "📖 Reading · Realistic fiction",
      },
    ],

    decks: [
      {
        k: "tenses",
        g: "🧩 Grammar · Verb tenses",
        t: "Verb tenses",
        en: "Past, present, future · simple and progressive",
        ic: "⏰",
        cover: {
          vis: SC("plain", [
            { t: "was", x: 22, y: 46, s: 11, c: "plain" },
            { t: "is", x: 50, y: 46, s: 11, c: "good", a: "pop:0.5" },
            { t: "will", x: 78, y: 46, s: 11, c: "plain", a: "pop:1" },
          ]),
        },
        cards: [
          {
            t: "The verb tense",
            lines: [
              "The [verb tense] tells [when] an action happens.",
              "Past: I walked. · Present: I walk. · Future: I will walk.",
            ],
            vis: SC(
              "plain",
              [
                { e: "⬅️", x: 20, y: 44, s: 18, a: "pop:0.2" },
                { e: "🚶", x: 50, y: 44, s: 30, a: "pop:0.6" },
                { e: "➡️", x: 80, y: 44, s: 18, a: "pop:1" },
                { t: "past · present · future", x: 50, y: 82, s: 8, c: "good" },
              ],
              "when?",
            ),
          },
          {
            t: "Present simple",
            lines: [
              "A habit, something we do [over and over]: My parents walk the dog every morning.",
              "One person (he, she, it): add [-s] or [-es]: Teri takes piano lessons. He watches. She goes.",
              "A consonant + y? Change the y to [ies]: study → studies, fly → flies.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🧑", x: 34, y: 62, s: 28, dx: 20, a: "go" },
                { e: "🐕", x: 52, y: 70, s: 20, dx: 20, a: "go" },
                { e: "🌅", x: 80, y: 26, s: 18 },
              ],
              "every morning",
            ),
          },
          {
            t: "Present progressive",
            lines: [
              "The action is happening [right now].",
              "[am], [is], [are] + verb-[ing]: I am listening. She is walking. They are talking.",
            ],
            vis: SC(
              "school",
              [
                { e: "🧒", x: 34, y: 62, s: 30 },
                { e: "👂", x: 50, y: 40, s: 14, a: "pulse" },
                { e: "🧑‍🏫", x: 72, y: 60, s: 30 },
                { t: "is listening", x: 50, y: 16, s: 8, c: "good" },
              ],
              "right now",
            ),
          },
          {
            t: "Past simple",
            lines: [
              "The action happened and is [finished].",
              "verb + [ed]: walked, visited. A consonant + y: hurry → [hurried].",
              "Irregular verbs have their own past form: swim → swam, take → took, break → broke.",
            ],
            vis: SC(
              "sky",
              [
                { e: "🏊", x: 40, y: 64, s: 30 },
                { t: "yesterday", x: 70, y: 24, s: 8, c: "plain" },
                { e: "✅", x: 76, y: 60, s: 18, a: "pop:0.8" },
              ],
              "I swam yesterday.",
            ),
          },
          {
            t: "Past progressive",
            lines: [
              "[was] or [were] + verb-[ing]: I was drawing when the bell rang.",
              "Use it for an action that another action [interrupted], for two actions at the same time, or for a long action in the past.",
              "he, she, it, I → [was] · we, you, they → [were]",
            ],
            vis: SC(
              "school",
              [
                { e: "🧒", x: 30, y: 62, s: 28 },
                { e: "🖍️", x: 46, y: 70, s: 14, a: "nod" },
                { e: "🔔", x: 74, y: 30, s: 22, a: "pop:1 shake:1.3" },
              ],
              "I was drawing when the bell rang.",
            ),
          },
          {
            t: "Future simple",
            lines: [
              "Something that is going to happen [in the future].",
              "[will] + verb: We will travel to America next summer.",
            ],
            vis: SC(
              "sky",
              [
                { e: "✈️", x: 20, y: 60, s: 26, dx: 60, a: "go" },
                { t: "next summer", x: 66, y: 22, s: 8, c: "plain" },
              ],
              "will travel",
            ),
          },
          {
            t: "Future progressive",
            lines: [
              "Something that will be happening at a [time] we know.",
              "[will be] + verb-[ing]: My father will be calling you in 5 minutes.",
            ],
            vis: SC(
              "room",
              [
                { e: "👨", x: 34, y: 60, s: 30 },
                { e: "📱", x: 50, y: 52, s: 14, a: "shake" },
                { e: "⏱️", x: 74, y: 34, s: 20, a: "pulse" },
              ],
              "in 5 minutes",
            ),
          },
          {
            t: "Subject-verb agreement",
            lines: [
              "One person or thing (he, she, it, Amir): add [-s] or [-es]: Amir starts a business.",
              "I, you, we, they, or a plural noun: [no -s]: We start a business.",
            ],
            vis: SC(
              "room",
              [
                { e: "🧑", x: 22, y: 60, s: 26 },
                { t: "starts", x: 22, y: 22, s: 8, c: "good" },
                { e: "🧑", x: 62, y: 60, s: 24 },
                { e: "👩", x: 80, y: 60, s: 24 },
                { t: "start", x: 71, y: 22, s: 8, c: "good", a: "pop:0.8" },
              ],
              "one → starts · two → start",
            ),
          },
        ],
      },
      {
        k: "silent",
        g: "🔊 Phonics · Silent letters",
        t: "Silent letters",
        en: "mb · kn · gn · wr · h",
        ic: "🤫",
        cover: {
          vis: SC("plain", [
            { e: "🤫", x: 30, y: 50, s: 34 },
            { t: "k·nee", x: 68, y: 46, s: 12, c: "good", a: "pop:0.6" },
          ]),
        },
        cards: [
          {
            t: "A silent letter",
            lines: [
              "A [silent letter] is a letter we write but do [not] say.",
              "knight: we say “nite” · hour: we say “our”",
            ],
            vis: SC(
              "stage",
              [
                { e: "🛡️", x: 34, y: 56, s: 32 },
                { t: "k̶night", x: 68, y: 40, s: 11, c: "good", a: "pop:0.6" },
              ],
              "the k is silent",
            ),
          },
          {
            t: "b after m",
            lines: [
              "The letter [b] is often silent when an [m] comes before it.",
              "dumb, thumbs, lambs, combs, plumber, climb",
              "b is also silent in doubtful and debt.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🐑", x: 30, y: 60, s: 30 },
                { e: "👍", x: 70, y: 56, s: 26, a: "nod" },
                { t: "lambs · thumbs", x: 50, y: 18, s: 8, c: "good" },
              ],
              "silent b",
            ),
          },
          {
            t: "g and k before n",
            lines: [
              "The letters [g] and [k] are often silent before the letter [n].",
              "gnome, gnat, resign · known, knew, kneel, knives, knead, knot, knock",
            ],
            vis: SC(
              "grass",
              [
                { e: "🧙", x: 30, y: 58, s: 28 },
                { e: "🔪", x: 68, y: 58, s: 24 },
                { t: "gn · kn", x: 50, y: 18, s: 9, c: "good" },
              ],
              "silent g, silent k",
            ),
          },
          {
            t: "w before r",
            lines: [
              "The letter [w] is silent when it comes before the letter [r].",
              "written, wrinkle, wriggle, wrapper, wrench, wrist, wrong",
              "w is also silent in answer.",
            ],
            vis: SC(
              "room",
              [
                { e: "🔧", x: 34, y: 56, s: 30, a: "spin" },
                { e: "🍬", x: 70, y: 56, s: 24 },
                { t: "wrench · wrapper", x: 50, y: 18, s: 8, c: "good" },
              ],
              "silent w",
            ),
          },
          {
            t: "Silent h and silent n",
            lines: [
              "[h] can be silent at the start: hour, honest, honor.",
              "[n] is silent after m: condemn, autumn.",
            ],
            vis: SC(
              "grass",
              [
                { e: "⏰", x: 30, y: 54, s: 28 },
                { e: "🍂", x: 70, y: 54, s: 26, a: "float" },
                { t: "hour · autumn", x: 50, y: 18, s: 8, c: "good" },
              ],
              "silent h, silent n",
            ),
          },
          {
            t: "The 20 spelling words",
            lines: [
              "silent b: thumbs, lambs, plumber, combs, doubtful",
              "silent k: kneel, knives, knew, known, knead · silent g: resign",
              "silent w: wrinkle, answer, wrapper, wriggle, wrench",
              "silent h: honest, hour, honor · silent n: condemn",
            ],
            vis: SC(
              "school",
              [
                { e: "📝", x: 40, y: 54, s: 36 },
                { t: "20 words", x: 68, y: 26, s: 9, c: "good", a: "pop" },
              ],
              "Homework p. 18",
            ),
          },
          {
            t: "Silent e: VCe syllables",
            lines: [
              "Vowel + consonant + [e]: cake, compete, invite.",
              "The vowel is [long], and the final e is silent.",
            ],
            vis: SC(
              "room",
              [
                { e: "🎂", x: 34, y: 56, s: 32 },
                { t: "cak(e)", x: 68, y: 44, s: 12, c: "good", a: "pop:0.6" },
              ],
              "the e is silent",
            ),
          },
        ],
      },
      {
        k: "context",
        g: "🧱 Vocabulary strategy · Context clues",
        t: "Context clues",
        en: "The words around a new word",
        ic: "🔍",
        cover: {
          vis: SC("plain", [
            { e: "📖", x: 36, y: 56, s: 34 },
            { e: "🔍", x: 66, y: 40, s: 26, a: "nod" },
          ]),
        },
        cards: [
          {
            t: "Context clues",
            lines: [
              "[Context clues] are words near a new word. They help you understand what it means.",
              "Read the sentence before and the sentence after.",
            ],
            vis: SC(
              "school",
              [
                { e: "🧒", x: 30, y: 62, s: 28 },
                { e: "📖", x: 50, y: 70, s: 18 },
                { e: "🔍", x: 70, y: 40, s: 24, a: "wander" },
              ],
              "look around the word",
            ),
          },
          {
            t: "The meaning is in the sentence",
            lines: [
              "Sometimes the sentence tells the meaning after [or]:",
              "The volunteers worked with several organizations, [or groups of people who work together].",
            ],
            vis: SC(
              "grass",
              [
                { e: "🧑", x: 24, y: 62, s: 22 },
                { e: "👩", x: 42, y: 62, s: 22 },
                { e: "🧒", x: 60, y: 62, s: 22 },
                { e: "🤝", x: 78, y: 40, s: 22, a: "pulse" },
              ],
              "organizations = groups",
            ),
          },
          {
            t: "The next sentence explains",
            lines: [
              "The students were selective when choosing their books. [They carefully picked the books.]",
              "So selective = [careful about choosing].",
            ],
            vis: SC(
              "school",
              [
                { e: "📚", x: 34, y: 56, s: 30 },
                { e: "🤔", x: 68, y: 56, s: 28, a: "nod" },
              ],
              "selective",
            ),
          },
          {
            t: "Words from “How Vera Helped”",
            lines: [
              "[bulging]: the bag had boxes pushing out → very full.",
              "[elderly]: “the older man” → old.",
              "[perplexed]: “He didn’t know what to think” → confused.",
            ],
            src: "img/vera/door.jpg",
          },
        ],
      },
    ],
    ideas: [],

    games: [
      {
        k: "tsort",
        g: "🧩 Grammar · Verb tenses",
        t: "Past, present or future?",
        en: "Sort the sentences",
        ic: "⏰",
        items: [
          {
            type: "sort",
            q: "Tap a sentence, then its box.",
            cols: [
              { k: "past", t: "past", ex: "walked · was walking", e: "⬅️" },
              { k: "pres", t: "present", ex: "walks · is walking", e: "⏺️" },
              {
                k: "fut",
                t: "future",
                ex: "will walk · will be walking",
                e: "➡️",
              },
            ],
            words: [
              { w: "Sue visited her grandparents.", k: "past", e: "👵" },
              { w: "He was writing a letter.", k: "past", e: "✉️" },
              { w: "I swam in the pool.", k: "past", e: "🏊" },
              { w: "The sun rises every morning.", k: "pres", e: "🌅" },
              { w: "The dogs are barking.", k: "pres", e: "🐕" },
              { w: "My cousins live in Canada.", k: "pres", e: "🍁" },
              { w: "I will help you.", k: "fut", e: "🤝" },
              { w: "We will be driving spaceships.", k: "fut", e: "🚀" },
              { w: "Tom will celebrate his birthday.", k: "fut", e: "🎂" },
            ],
          },
        ],
      },
      {
        k: "tform",
        g: "🧩 Grammar · Verb tenses",
        t: "Make the verb",
        en: "One verb, six tenses",
        ic: "🧱",
        items: [
          cj(
            "play · present simple · She ___",
            ["plays", "play", "is playing"],
            "👧⚽",
          ),
          cj(
            "play · present progressive · She ___",
            ["is playing", "was playing", "plays"],
            "👧⚽",
          ),
          cj(
            "play · past simple · She ___",
            ["played", "plays", "was playing"],
            "👧⚽",
          ),
          cj(
            "play · past progressive · They ___",
            ["were playing", "was playing", "played"],
            "👫⚽",
          ),
          cj(
            "play · future simple · They ___",
            ["will play", "will be playing", "played"],
            "👫⚽",
          ),
          cj(
            "play · future progressive · They ___",
            ["will be playing", "will play", "are playing"],
            "👫⚽",
          ),
          cj(
            "study · present simple · Kim ___",
            ["studies", "studys", "study"],
            "👧📚",
            "A consonant + y: change the y to [ies].",
          ),
          cj(
            "hurry · past simple · He ___",
            ["hurried", "hurryed", "hurry"],
            "🏃",
            "A consonant + y: change the y to [ied].",
          ),
        ],
      },
      {
        k: "sgame",
        g: "🔊 Phonics · Silent letters",
        t: "Which letter is silent?",
        en: "Say the word, find the quiet letter",
        ic: "🤫",
        items: [
          cj("Which letter is silent in [knee]?", ["k", "n", "e"], "🦵"),
          cj("Which letter is silent in [lamb]?", ["b", "m", "l"], "🐑"),
          cj("Which letter is silent in [write]?", ["w", "r", "t"], "✍️"),
          cj("Which letter is silent in [hour]?", ["h", "o", "r"], "⏰"),
          cj("Which letter is silent in [gnome]?", ["g", "n", "m"], "🧙"),
          cj("Which letter is silent in [thumb]?", ["b", "t", "h"], "👍"),
          cj("Which letter is silent in [wrench]?", ["w", "r", "c"], "🔧"),
          cj("Which letter is silent in [autumn]?", ["n", "m", "t"], "🍂"),
        ],
      },
      {
        k: "cmatch",
        g: "🧱 Vocabulary strategy · Context clues",
        t: "Words and meanings",
        en: "Match the word to its meaning",
        ic: "🔗",
        items: [
          {
            type: "match",
            pairs: [
              {
                vis: SC(
                  "room",
                  [{ e: "🛍️", x: 50, y: 50, s: 44, a: "pulse" }],
                  "bulging",
                ),
                label: "very full, pushing out",
              },
              {
                vis: SC("room", [{ e: "👴", x: 50, y: 50, s: 44 }], "elderly"),
                label: "old",
              },
              {
                vis: SC(
                  "room",
                  [{ e: "😕", x: 50, y: 50, s: 44, a: "nod" }],
                  "perplexed",
                ),
                label: "confused",
              },
              {
                vis: SC(
                  "grass",
                  [{ e: "🍂", x: 50, y: 50, s: 40, a: "float" }],
                  "scattered",
                ),
                label: "spread around",
              },
              {
                vis: SC(
                  "room",
                  [{ e: "🎁", x: 50, y: 50, s: 40 }],
                  "generosity",
                ),
                label: "willingness to share and give",
              },
            ],
          },
        ],
      },
    ],

    exercises: [
      // ---------- Grammar · Verb tenses ----------
      {
        k: "vpres",
        keep: true,
        g: "🧩 Grammar · Verb tenses",
        t: "Present tense and progressive form",
        en: "Classwork booklet page 16",
        ic: "🧩",
        from: "Classwork p. 16",
        items: [
          ...prog(
            "She turns the light on.",
            "turns",
            [
              "She is turning the light on.",
              "She are turning the light on.",
              "She was turns the light on.",
            ],
            "👧💡",
          ),
          ...prog(
            "We ride the bus to school.",
            "ride",
            [
              "We are riding the bus to school.",
              "We is riding the bus to school.",
              "We are ride the bus to school.",
            ],
            "🚌🏫",
          ),
          ...prog(
            "He eats a turkey sandwich.",
            "eats",
            [
              "He is eating a turkey sandwich.",
              "He are eating a turkey sandwich.",
              "He is eats a turkey sandwich.",
            ],
            "🥪",
          ),
          ...prog(
            "I paint a picture of my backyard.",
            "paint",
            [
              "I am painting a picture of my backyard.",
              "I is painting a picture of my backyard.",
              "I am paint a picture of my backyard.",
            ],
            "🎨🏡",
          ),
          ...prog(
            "Mom and Dad try to build the bookcase.",
            "try",
            [
              "Mom and Dad are trying to build the bookcase.",
              "Mom and Dad is trying to build the bookcase.",
              "Mom and Dad are try to build the bookcase.",
            ],
            "👩👨",
          ),
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Write a paragraph about a pet or a wild animal. Use the present tense and at least three [progressive] verbs.",
            a: "My cat Luna is sleeping on the sofa. She sleeps there every afternoon. Now she is stretching her legs. Her tail is moving slowly. Soon she wakes up and asks for food.",
            vis: SC(
              "room",
              [
                { e: "🛋️", x: 44, y: 66, s: 40 },
                { e: "🐈", x: 44, y: 52, s: 22, a: "nod" },
                { e: "💤", x: 64, y: 32, s: 14, a: "float" },
              ],
              "is sleeping · is stretching",
            ),
          },
        ],
      },
      {
        k: "vmore",
        keep: true,
        g: "🧩 Grammar · Verb tenses",
        t: "Past, future and progressive",
        en: "Classwork booklet page 17",
        ic: "⏰",
        from: "Classwork p. 17",
        items: [
          ...[
            [
              "The telephone was ringing all day.",
              "was ringing",
              "past progressive",
              "☎️",
            ],
            ["I watched the deer in the woods.", "watched", "past", "🦌🌲"],
            ["My grandmother will call soon.", "will call", "future", "👵📞"],
            [
              "Dr. Lewis will be teaching a course next year.",
              "will be teaching",
              "future progressive",
              "🧑‍🏫",
            ],
            ["The television broke a long time ago.", "broke", "past", "📺💥"],
          ].map(([s, v, name, e]) =>
            tn(
              s,
              v,
              name,
              ["past", "past progressive", "future", "future progressive"],
              e,
            ),
          ),
          // the excerpt is printed on the page; "Partaking in Public Service" itself is not in the booklet
          {
            type: "mc",
            q: "“Kids [join] local volunteer groups to help their communities.” Write the future progressive form of join.",
            opts: ["will be joining", "will join", "were joining"],
            emoji: "🧒🤝",
          },
          {
            type: "mc",
            q: "“They [work] together to improve their schools and neighborhoods.” Write the future progressive form of work.",
            opts: ["will be working", "will work", "are working"],
            emoji: "🧹🏫",
          },
          {
            type: "mc",
            q: "“Some [raise] money for local charities.” Write the future progressive form of raise.",
            opts: ["will be raising", "will raise", "was raising"],
            emoji: "💰❤️",
          },
        ],
      },
      {
        k: "sva",
        g: "🧩 Grammar · Verb tenses",
        t: "Subject-verb agreement",
        en: "Classwork booklet page 18",
        ic: "🤝",
        from: "Classwork p. 18",
        items: [
          cj(
            "Miguel ___ the doorbell at his neighbor’s house. (ring)",
            ["rings", "ring", "ringes"],
            "🔔🏠",
            "Miguel = one person → [rings].",
          ),
          cj(
            "Shamese and Kim ___ twice around the track. (run)",
            ["run", "runs", "runes"],
            "🏃‍♀️🏃‍♀️",
            "Shamese and Kim = two people → [run].",
          ),
          cj(
            "I ___ a salad and an apple for lunch. (choose)",
            ["choose", "chooses", "choosees"],
            "🥗🍎",
            "I → no -s: [choose].",
          ),
          cj(
            "She ___ at the silly costume. (chuckle)",
            ["chuckles", "chuckle", "chuckless"],
            "😄🤡",
            "She → [chuckles].",
          ),
          cj(
            "We ___ our lines for the play. (practice)",
            ["practice", "practices", "practicees"],
            "🎭",
            "We → no -s: [practice].",
          ),
          cj(
            "Renee ___ her chores early on the weekend. (do)",
            ["does", "do", "dos"],
            "🧹",
            "do ends in o → add [-es]: does.",
          ),
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Imagine that you take a trip to another country. Write three sentences about what you see there. Include at least three verbs.",
            a: "I visit Paris with my family. The Eiffel Tower stands tall in the middle of the city. People walk by the river and eat fresh bread.",
            vis: SC(
              "sky",
              [
                { e: "🗼", x: 40, y: 54, s: 40 },
                { e: "🥖", x: 72, y: 66, s: 20 },
                { e: "✈️", x: 76, y: 22, s: 16, a: "float" },
              ],
              "a trip",
            ),
          },
        ],
      },
      {
        k: "vproof",
        g: "🧩 Grammar · Verb tenses",
        t: "Correct the verbs",
        en: "Classwork booklet page 19",
        ic: "✏️",
        from: "Classwork p. 19",
        items: [
          cj(
            "“We was cheering for our team at the football game.” (past progressive) Which is right?",
            [
              "We were cheering for our team at the football game.",
              "We was cheered for our team at the football game.",
              "We are cheering for our team at the football game.",
            ],
            "📣🏈",
            "We → [were] + cheering.",
          ),
          cj(
            "“You is go to the science fair next weekend.” (future) Which is right?",
            [
              "You will go to the science fair next weekend.",
              "You will goes to the science fair next weekend.",
              "You is going to the science fair next weekend.",
            ],
            "🔬🏆",
            "Future: [will] + go.",
          ),
          cj(
            "“Cammy is reach for the sugar on the top shelf.” (present) Which is right?",
            [
              "Cammy reaches for the sugar on the top shelf.",
              "Cammy reach for the sugar on the top shelf.",
              "Cammy reached for the sugar on the top shelf.",
            ],
            "👧🍬",
            "Cammy = one person; reach ends in ch → [reaches].",
          ),
          cj(
            "“I was gets another balloon for her.” (past progressive) Which is right?",
            [
              "I was getting another balloon for her.",
              "I were getting another balloon for her.",
              "I was get another balloon for her.",
            ],
            "🎈",
            "I → [was] + getting.",
          ),
          cj(
            "“The train will be zoom past my stop!” (future progressive) Which is right?",
            [
              "The train will be zooming past my stop!",
              "The train will zooming past my stop!",
              "The train will be zoomed past my stop!",
            ],
            "🚆💨",
            "[will be] + zooming.",
          ),
        ],
      },
      {
        k: "vtest",
        g: "🧩 Grammar · Verb tenses",
        t: "Test: verb tenses",
        en: "Classwork booklet page 20",
        ic: "📝",
        from: "Classwork p. 20",
        items: [
          cj(
            "Which sentence has the correct subject-verb agreement?",
            [
              "Trisha asks for a pencil.",
              "You brings your flute to school.",
              "He know the answer.",
              "Ms. Katz give a test today.",
            ],
            "✏️",
            "Trisha = one person → [asks].",
          ),
          cj(
            "Which sentence has the correct subject-verb agreement?",
            [
              "I watched an hour of television.",
              "We eats breakfast early.",
              "They drives down the road.",
              "The neighbor water his lawn.",
            ],
            "📺",
            "watched is past: it is the same for I, you, he, we and they.",
          ),
          cj(
            "(1) So many things happen on my street in the summer. What is the past-tense form of the verb in sentence 1?",
            [
              "happened",
              "was happening",
              "will be happening",
              "Make no change.",
            ],
            "🏘️☀️",
          ),
          cj(
            "(2) Uncle Bill tells stories on the stoop. What is the past progressive form of the verb in sentence 2?",
            ["was telling", "told", "were telling", "Make no change."],
            "👨📖",
            "Uncle Bill = one person → [was] telling.",
          ),
          cj(
            "(3) We climb the jungle gym in the neighbor’s backyard. What is the future-tense form of the verb in sentence 3?",
            ["will climb", "climbed", "will be climbing", "Make no change."],
            "🧗",
          ),
          cj(
            "(5) The ball rolls down the street. What is the future progressive form of the verb in sentence 5?",
            ["will be rolling", "will roll", "was rolling", "Make no change."],
            "⚽",
          ),
        ],
      },
      {
        k: "tpres",
        keep: true,
        g: "🧩 Grammar · Verb tenses",
        t: "Present simple or progressive?",
        en: "Classwork booklet page 21",
        ic: "⏺️",
        from: "Classwork p. 21",
        items: [
          ...[
            [
              "Johnny is reading an interesting book now.",
              "is reading",
              "present progressive",
              "👦📖",
            ],
            [
              "Sally needs coffee every morning.",
              "needs",
              "present simple",
              "☕",
            ],
            [
              "Eric and Sam are sending the e-mail at the moment.",
              "are sending",
              "present progressive",
              "📧",
            ],
            [
              "My neighbors invite lots of people for dinner every week.",
              "invite",
              "present simple",
              "🍽️",
            ],
            [
              "British people write hundreds of Christmas cards every year.",
              "write",
              "present simple",
              "🎄✉️",
            ],
          ].map(([s, v, name, e]) =>
            tn(s, v, name, ["present simple", "present progressive"], e),
          ),
          vf(
            "Listen, someone ___ the piano up there.",
            "play",
            "present progressive",
            ["is playing", "plays", "are playing"],
            "🎹",
          ),
          vf(
            "Rosa usually ___ out every night.",
            "go",
            "present simple",
            ["goes", "go", "is going"],
            "👩🌙",
          ),
          vf(
            "Sam and Eric ___ football every Wednesday.",
            "play",
            "present simple",
            ["play", "plays", "are playing"],
            "⚽",
          ),
          vf(
            "My best friends ___ their horses now.",
            "ride",
            "present progressive",
            ["are riding", "is riding", "ride"],
            "🐎",
          ),
          vf(
            "Paul ___ to Paris once a year.",
            "fly",
            "present simple",
            ["flies", "flys", "is flying"],
            "✈️🗼",
          ),
        ],
      },
      {
        k: "tpast",
        keep: true,
        g: "🧩 Grammar · Verb tenses",
        t: "Past simple or progressive?",
        en: "Classwork booklet page 22",
        ic: "⬅️",
        from: "Classwork p. 22",
        items: [
          ...[
            [
              "My mom was cooking lunch when I got home.",
              "was cooking",
              "past progressive",
              "👩‍🍳",
            ],
            [
              "Someone took Peter’s bag, and he can’t find it.",
              "took",
              "past simple",
              "🎒",
            ],
            [
              "I swam in the pool yesterday morning.",
              "swam",
              "past simple",
              "🏊",
            ],
            [
              "The plane was flying to Paris when it crashed.",
              "was flying",
              "past progressive",
              "✈️",
            ],
            [
              "Sam and Carl were driving their cars when a policeman stopped them.",
              "were driving",
              "past progressive",
              "🚗👮",
            ],
          ].map(([s, v, name, e]) =>
            tn(s, v, name, ["past simple", "past progressive"], e),
          ),
          vf(
            "My mother ___ at the airport at six o’clock last week.",
            "arrive",
            "past simple",
            ["arrived", "arrives", "was arriving"],
            "👩🛬",
          ),
          vf(
            "Last summer, John ___ to the beach with his parents.",
            "travel",
            "past simple",
            ["traveled", "travels", "was traveling"],
            "🏖️",
          ),
          vf(
            "She ___ her hands when her mom came into the bathroom.",
            "wash",
            "past progressive",
            ["was washing", "were washing", "washed"],
            "🧼",
          ),
          vf(
            "Yesterday, I ___ a little kitten under the bench.",
            "notice",
            "past simple",
            ["noticed", "noticeed", "was noticing"],
            "🐱",
          ),
          vf(
            "When they ___ lunch, the phone rang.",
            "have",
            "past progressive",
            ["were having", "was having", "had"],
            "🍽️📞",
          ),
        ],
      },
      {
        k: "tfut",
        keep: true,
        g: "🧩 Grammar · Verb tenses",
        t: "Future simple or progressive?",
        en: "Classwork booklet page 23",
        ic: "➡️",
        from: "Classwork p. 23",
        items: [
          ...[
            [
              "By the morning, it will be raining for over 12 hours.",
              "will be raining",
              "future progressive",
              "🌧️",
            ],
            [
              "We will travel to America next summer.",
              "will travel",
              "future simple",
              "✈️🗽",
            ],
            [
              "Fourth grade students will be reading 100 books by the end of the year.",
              "will be reading",
              "future progressive",
              "📚",
            ],
            [
              "She will recover from her illness so soon.",
              "will recover",
              "future simple",
              "🤒",
            ],
            [
              "My father will be calling you in 5 minutes.",
              "will be calling",
              "future progressive",
              "📱",
            ],
          ].map(([s, v, name, e]) =>
            tn(s, v, name, ["future simple", "future progressive"], e),
          ),
          vf(
            "Tom ___ his birthday next Tuesday.",
            "celebrate",
            "future simple",
            ["will celebrate", "will be celebrate", "celebrated"],
            "🎂",
          ),
          vf(
            "Catherine ___ to you tomorrow.",
            "speak",
            "future simple",
            ["will speak", "will speaking", "spoke"],
            "👩🗣️",
          ),
          vf(
            "I ___ my office at 7 o’clock.",
            "leave",
            "future progressive",
            ["will be leaving", "will leave", "will be leave"],
            "🏢🕖",
          ),
          vf(
            "They ___ you the truth when I leave.",
            "tell",
            "future simple",
            ["will tell", "will be tell", "told"],
            "🗣️",
          ),
          vf(
            "Sally ___ your book tomorrow morning.",
            "return",
            "future progressive",
            ["will be returning", "will return", "is returning"],
            "📕",
          ),
        ],
      },
      {
        k: "tmix",
        g: "🧩 Grammar · Verb tenses",
        t: "Complete with the right tense",
        en: "Classwork booklet page 24",
        ic: "⏰",
        from: "Classwork p. 24",
        items: [
          vf(
            "Kim ___ every day after school.",
            "study",
            "present simple",
            ["studies", "studys", "is studying"],
            "👧📚",
          ),
          vf(
            "My dog ___ the ball quickly.",
            "catch",
            "past simple",
            ["caught", "catched", "catches"],
            "🐕⚾",
          ),
          vf(
            "The teacher ___ the lesson tomorrow.",
            "explain",
            "future simple",
            ["will explain", "explained", "will be explain"],
            "🧑‍🏫",
          ),
          vf(
            "The children ___ in the garden.",
            "play",
            "present progressive",
            ["are playing", "is playing", "were playing"],
            "🧒🌳",
          ),
          vf(
            "The singer ___ perfectly last night.",
            "sing",
            "past progressive",
            ["was singing", "were singing", "sang"],
            "🎤",
          ),
          vf(
            "The shop ___ at 7 o’clock.",
            "open",
            "future progressive",
            ["will be opening", "will open", "was opening"],
            "🏪🕖",
          ),
        ],
      },
      {
        k: "tname",
        keep: true,
        g: "🧩 Grammar · Verb tenses",
        t: "Name the tense",
        en: "Homework booklet page 24",
        ic: "🏷️",
        from: "Homework p. 24",
        items: [
          [
            "The boy is playing basketball.",
            "is playing",
            "present progressive",
            "🏀",
          ],
          [
            "Luke was studying for his exam.",
            "was studying",
            "past progressive",
            "📖",
          ],
          [
            "Ben will travel to the USA next week.",
            "will travel",
            "future simple",
            "✈️",
          ],
          ["Sue visited her grandparents.", "visited", "past simple", "👵👴"],
          [
            "The girls will be painting a picture.",
            "will be painting",
            "future progressive",
            "🎨",
          ],
          ["My cousins live in Canada.", "live", "present simple", "🍁"],
          ["The sun rises every morning.", "rises", "present simple", "🌅"],
          [
            "My friend will call me tomorrow.",
            "will call",
            "future simple",
            "📞",
          ],
          ["I will help you.", "will help", "future simple", "🤝"],
          ["He was writing a letter.", "was writing", "past progressive", "✉️"],
          [
            "They were talking together.",
            "were talking",
            "past progressive",
            "🗣️",
          ],
          [
            "By 3019, we will be driving spaceships.",
            "will be driving",
            "future progressive",
            "🚀",
          ],
          [
            "Joanne will be traveling on a vacation.",
            "will be traveling",
            "future progressive",
            "🧳",
          ],
          [
            "The dogs are barking loudly.",
            "are barking",
            "present progressive",
            "🐕",
          ],
          [
            "I am listening to the teacher.",
            "am listening",
            "present progressive",
            "👂",
          ],
          [
            "He removed the picture from the wall.",
            "removed",
            "past simple",
            "🖼️",
          ],
          ["She invited me to her birthday.", "invited", "past simple", "🎂"],
        ].map(([s, v, name, e]) => tn(s, v, name, TENSES, e)),
      },
      {
        k: "tfill",
        g: "🧩 Grammar · Verb tenses",
        t: "Use the right tense",
        en: "Homework booklet page 25",
        ic: "✍️",
        from: "Homework p. 25",
        items: [
          vf(
            "I ___ the movie.",
            "enjoy",
            "past simple",
            ["enjoyed", "enjoied", "was enjoying"],
            "🎬",
          ),
          vf(
            "Tomorrow at 12, my mom ___ a cake.",
            "bake",
            "future progressive",
            ["will be baking", "will bake", "was baking"],
            "🎂",
          ),
          vf(
            "Dave ___ to school every morning.",
            "walk",
            "present simple",
            ["walks", "walk", "is walking"],
            "🚶🏫",
          ),
          vf(
            "Susan ___ a party for her best friend.",
            "organize",
            "future simple",
            ["will organize", "will be organize", "organized"],
            "🎉",
          ),
          vf(
            "They ___ English.",
            "study",
            "past progressive",
            ["were studying", "was studying", "studied"],
            "📘",
          ),
          vf(
            "I ___ to the shop to buy some milk.",
            "go",
            "present progressive",
            ["am going", "is going", "go"],
            "🥛",
          ),
          vf(
            "The children always ___ up at 7am.",
            "get",
            "present simple",
            ["get", "gets", "are getting"],
            "⏰",
          ),
          vf(
            "I ___ you after I finish my homework.",
            "call",
            "future simple",
            ["will call", "will be call", "called"],
            "📞",
          ),
          vf(
            "I ___ my bag last night.",
            "pack",
            "past simple",
            ["packed", "packs", "was packing"],
            "🎒",
          ),
          vf(
            "Luke ___ for his car keys.",
            "look",
            "present progressive",
            ["is looking", "are looking", "looks"],
            "🔑",
          ),
          vf(
            "The man ___ in the lake when it started to rain.",
            "swim",
            "past progressive",
            ["was swimming", "were swimming", "swam"],
            "🏊🌧️",
          ),
          vf(
            "The girls ___ the Christmas tree.",
            "decorate",
            "future progressive",
            ["will be decorating", "will decorate", "are decorating"],
            "🎄",
          ),
          vf(
            "Sam and I ___ our mother.",
            "help",
            "present progressive",
            ["are helping", "am helping", "help"],
            "👩🤝",
          ),
          vf(
            "The baby ___ when the bell rang.",
            "sleep",
            "past progressive",
            ["was sleeping", "were sleeping", "slept"],
            "👶🔔",
          ),
          vf(
            "Sandy always ___ the dishes.",
            "wash",
            "present simple",
            ["washes", "washs", "wash"],
            "🍽️🧽",
          ),
        ],
      },

      // ---------- Phonics · Silent letters ----------
      {
        k: "silent",
        g: "🔊 Phonics · Silent letters",
        t: "Find the silent letter",
        en: "Classwork booklet pages 25–26",
        ic: "🤫",
        from: "Classwork p. 25–26",
        // unverified: tight, light (gh) and whistle (t) are silent letters too, so they count
        items: [
          sil(
            "Make sure to tie a tight knot in your shoes so they don't untie while running.",
            { knot: "kn", tight: "gh" },
            "👟🪢",
          ),
          sil(
            "We had to wait for one hour outside the museum before the doors opened.",
            { hour: "h" },
            "⏰🏛️",
          ),
          sil(
            "Be careful not to hurt your wrist when you lift that heavy box.",
            { wrist: "wr" },
            "📦💪",
          ),
          sil(
            "A tiny gnat kept buzzing around our heads during the outdoor lunch.",
            { gnat: "gn" },
            "🦟",
          ),
          sil(
            "The monkey managed to climb to the top branch of the tall oak tree.",
            { climb: "mb" },
            "🐒🌳",
          ),
          sil(
            "The driver admitted that taking a left turn at the light was the wrong way to go.",
            { light: "gh", wrong: "wr" },
            "🚗🚦",
          ),
          sil(
            "Leaves begin to turn orange, yellow, and red during the cool months of autumn.",
            { autumn: "mn" },
            "🍂",
          ),
          sil(
            "Before entering the classroom, please knock softly on the door.",
            { knock: "kn" },
            "🚪✊",
          ),
          sil(
            "The referee blew his whistle to give a clear sign that the game was starting.",
            { whistle: "t", sign: "gn" },
            "🧑‍⚖️⚽",
          ),
          sil(
            "The students worked hard to pay off his debt before the end of the year.",
            { debt: "bt" },
            "💵",
          ),
        ],
      },
      {
        k: "lsort",
        g: "🔊 Phonics · Silent letters",
        t: "Sort the spelling words",
        en: "Homework booklet page 18",
        ic: "🗂️",
        from: "Homework p. 18",
        items: [
          {
            type: "sort",
            q: "Tap a word, then the box of its silent letter.",
            cols: [
              { k: "b", t: "silent b", ex: "dumb", e: "🐑" },
              { k: "h", t: "silent h", ex: "hour", e: "⏰" },
              { k: "k", t: "silent k", ex: "known", e: "🦵" },
              { k: "n", t: "silent n", ex: "autumn", e: "🍂" },
              { k: "w", t: "silent w", ex: "written", e: "✍️" },
              { k: "g", t: "silent g", ex: "gnome", e: "🧙" },
            ],
            words: [
              { w: "thumbs", k: "b", e: "👍" },
              { w: "lambs", k: "b", e: "🐑" },
              { w: "plumber", k: "b", e: "🔧" },
              { w: "combs", k: "b", e: "🪮" },
              { w: "doubtful", k: "b", e: "🤔" },
              { w: "honest", k: "h", e: "😇" },
              { w: "hour", k: "h", e: "⏰" },
              { w: "honor", k: "h", e: "🎖️" },
              { w: "kneel", k: "k", e: "🧎" },
              { w: "knives", k: "k", e: "🔪" },
              { w: "knew", k: "k", e: "💡" },
              { w: "known", k: "k", e: "👍" },
              { w: "knead", k: "k", e: "🍞" },
              { w: "condemn", k: "n", e: "👎" },
              { w: "wrinkle", k: "w", e: "👕" },
              { w: "answer", k: "w", e: "💬" },
              { w: "wrapper", k: "w", e: "🍬" },
              { w: "wriggle", k: "w", e: "🪱" },
              { w: "wrench", k: "w", e: "🔧" },
              { w: "resign", k: "g", e: "🚪" },
            ],
          },
        ],
      },
      {
        k: "lmean",
        g: "🔊 Phonics · Silent letters",
        t: "Spelling words: meaning",
        en: "Homework booklet page 19",
        ic: "🔤",
        from: "Homework p. 19",
        items: [
          cj(
            "I have the ___ to your question.",
            ["answer", "honor", "known"],
            "💬",
          ),
          cj(
            "The soldier’s actions showed courage and ___.",
            ["honor", "answer", "hour"],
            "🎖️",
          ),
          cj(
            "Call the ___ to fix the kitchen faucet.",
            ["plumber", "wrapper", "lambs"],
            "🔧🚰",
          ),
          cj(
            "The brushes and ___ were lined up on the dresser.",
            ["combs", "thumbs", "knives"],
            "🪮",
          ),
          cj(
            "I am able to bend my ___ back to my wrist.",
            ["thumbs", "combs", "lambs"],
            "👍",
          ),
          cj(
            "I need a ___ to help me fix this.",
            ["wrench", "wrinkle", "wrapper"],
            "🔧",
          ),
          cj(
            "Don’t your knees hurt when you ___ for a long time?",
            ["kneel", "knead", "knew"],
            "🧎",
          ),
          cj(
            "I will iron the shirt until the last ___ is gone!",
            ["wrinkle", "wriggle", "wrench"],
            "👕",
          ),
          cj(
            "He will have to go to bed in one ___.",
            ["hour", "honor", "answer"],
            "⏰🛏️",
          ),
          cj(
            "It is a ___ fact that Earth both rotates and revolves.",
            ["known", "knew", "honest"],
            "🌍",
          ),
          cj("realized = ___", ["knew", "known", "kneel"], "💡"),
          cj("truthful = ___", ["honest", "honor", "doubtful"], "😇"),
          cj("press = ___", ["knead", "kneel", "knew"], "🍞"),
          cj("disapprove = ___", ["condemn", "resign", "honor"], "👎"),
          cj("unlikely = ___", ["doubtful", "honest", "known"], "🤔"),
          cj("leave = ___", ["resign", "condemn", "wriggle"], "🚪"),
          cj("jiggle = ___", ["wriggle", "wrinkle", "wrench"], "🪱"),
          cj("sheep = ___", ["lambs", "thumbs", "combs"], "🐑"),
          cj("utensils = ___", ["knives", "knead", "combs"], "🔪"),
          cj("covering = ___", ["wrapper", "wrinkle", "plumber"], "🍬"),
        ],
      },
      {
        k: "lmiss",
        g: "🔊 Phonics · Silent letters",
        t: "The missing silent letter",
        en: "Homework booklet page 20",
        ic: "🧩",
        from: "Homework p. 20",
        items: [
          ml("_riggle", "wriggle", "w", ["r", "k"], "🪱"),
          ml("dou_tful", "doubtful", "b", ["p", "d"], "🤔"),
          ml("_nown", "known", "k", ["g", "w"], "👍"),
          ml("plum_er", "plumber", "b", ["p", "m"], "🔧"),
          ml("thum_s", "thumbs", "b", ["p", "m"], "👍"),
          ml("condem_", "condemn", "n", ["m", "b"], "👎"),
          ml("_nead", "knead", "k", ["g", "w"], "🍞"),
          ml("_onor", "honor", "h", ["w", "k"], "🎖️"),
          ml("_rench", "wrench", "w", ["r", "k"], "🔧"),
          ml("com_s", "combs", "b", ["p", "m"], "🪮"),
          ml("_neel", "kneel", "k", ["g", "w"], "🧎"),
          ml("resi_n", "resign", "g", ["k", "h"], "🚪"),
          ml("_nives", "knives", "k", ["g", "w"], "🔪"),
          ml("lam_s", "lambs", "b", ["p", "m"], "🐑"),
          ml("_onest", "honest", "h", ["w", "k"], "😇"),
          ml("_rinkle", "wrinkle", "w", ["r", "k"], "👕"),
          ml("ans_er", "answer", "w", ["h", "k"], "💬"),
          ml("_new", "knew", "k", ["g", "w"], "💡"),
          ml("_our", "hour", "h", ["w", "k"], "⏰"),
          ml("_rapper", "wrapper", "w", ["r", "k"], "🍬"),
          {
            type: "order",
            t: "Put the words in ABC order",
            ask: "Put these words in alphabetical order, to the third letter: wrinkle, honor, wrench, hour, resign.",
            hint: "Same first letters? Look at the next letter: hon… before hou…, wre… before wri….",
            steps: [
              { say: "honor", e: "🎖️" },
              { say: "hour", e: "⏰" },
              { say: "resign", e: "🚪" },
              { say: "wrench", e: "🔧" },
              { say: "wrinkle", e: "👕" },
            ],
            emoji: "🔤",
          },
        ],
      },
      {
        k: "lspell",
        g: "🔊 Phonics · Silent letters",
        t: "Find the spelling mistakes",
        en: "Classwork booklet page 27",
        ic: "✏️",
        from: "Classwork p. 27",
        items: [
          {
            type: "tapw",
            fix: true,
            q: "Tap the [6] words that are spelled wrong.",
            s: "My brother Sam could never make up his mind about what he wanted to be when he grew up. He just new that he wanted to do something interesting. At one time, he wanted to be a farmer. He thought about raising sheep and lams. But he also liked tools. He would make a great plumer, too. It was a tough choice!\nThen one day he decided to be a judge. It was the perfect job for him! He was always onest and good at finding the ansers to problems. But then Sam changed his mind again, so I am doutful that he is ready to make a choice. Whatever he decides, I know my brother will be great at it!",
            ans: {
              new: "knew",
              lams: "lambs",
              plumer: "plumber",
              onest: "honest",
              ansers: "answers",
              doutful: "doubtful",
            },
            emoji: "👦🤔",
            x: "knew · lambs · plumber · honest · answers · doubtful",
          },
          // unverified: a model for the writing task
          {
            type: "open",
            q: "Write about an interesting job of someone you know. Use at least four words from the spelling list.",
            a: "My uncle is a plumber. He has known how to fix pipes since he was young. He carries a big wrench and kneels under sinks for an hour. He is honest, and he always has an answer to every problem.",
            vis: SC(
              "room",
              [
                { e: "👨‍🔧", x: 36, y: 58, s: 34 },
                { e: "🔧", x: 64, y: 62, s: 20, a: "spin" },
                { e: "🚰", x: 80, y: 40, s: 20 },
              ],
              "a plumber",
            ),
          },
        ],
      },

      // ---------- Vocabulary strategy · Context clues ----------
      {
        k: "ctx1",
        keep: true,
        g: "🧱 Vocabulary strategy · Context clues",
        t: "Context clues in “How Vera Helped”",
        en: "Classwork booklet page 31",
        ic: "🔍",
        from: "Classwork p. 31",
        // unverified: the clues and the meanings are my wording
        items: [
          ...ctx(
            "Vera had been collecting food since the beginning of the school year. It was November now, and Brad was questioning what happened to all those juice boxes and food he gave away.",
            "questioning",
            "what happened to all those juice boxes and food",
            ["the beginning of the school year", "It was November now"],
            "wondering, asking himself",
            ["eating", "giving away"],
            "🤔🧃",
          ),
          ...ctx(
            "Her shopping bag was bulging, with boxes pushing out against the bag.",
            "bulging",
            "with boxes pushing out against the bag",
            ["Her shopping bag", "against the bag"],
            "very full, pushing out",
            ["empty", "torn"],
            "🛍️",
          ),
          ...ctx(
            "He felt unsure as he said it, since her family had a lovely house with a tidy yard. But he was truly perplexed. He didn’t know what to think.",
            "perplexed",
            "He felt unsure · He didn’t know what to think",
            ["a lovely house", "a tidy yard"],
            "confused, puzzled",
            ["happy", "angry"],
            "😕",
          ),
          ...ctx(
            "She knocked on the front door. A moment later, an elderly man opened the door. Brad couldn’t hear what the older man said to Vera.",
            "elderly",
            "the older man",
            ["the front door", "A moment later"],
            "old",
            ["young", "angry"],
            "👴🚪",
          ),
          {
            type: "open",
            q: "Use each word in a sentence of your own: questioning, bulging, perplexed, elderly.",
            a: "I was questioning where my lost pencil went. My backpack is bulging with books. The hard puzzle left me perplexed. We help our elderly neighbor carry her shopping.",
            src: "img/vera/door.jpg",
          },
        ],
      },
      {
        k: "ctx2",
        g: "🧱 Vocabulary strategy · Context clues",
        t: "Choose the meaning from context",
        en: "Homework booklet pages 26–27",
        ic: "🔍",
        from: "Homework p. 26–27",
        items: [
          cj(
            "The students were [selective] when choosing their books. They carefully picked the books they wanted to read.",
            ["careful about choosing", "careless", "quick", "noisy"],
            "📚🤔",
            "Clue: “They [carefully picked] the books.”",
          ),
          cj(
            "The volunteers worked with several [organizations], or groups of people who work together for a purpose.",
            ["groups of people", "buildings", "schools", "families"],
            "🤝",
            "Clue: “or [groups of people] who work together”.",
          ),
          cj(
            "The children walked [gingerly] across the wet floor. They moved very carefully so they would not slip.",
            ["carefully", "quickly", "loudly", "angrily"],
            "🚶💧",
            "Clue: “They moved [very carefully]”.",
          ),
          cj(
            "The papers were [scattered] all over the classroom. Some were on the floor, while others were on the desks.",
            ["spread around", "gathered together", "hidden", "folded"],
            "📄📄",
            "Clue: “Some were [on the floor], others [on the desks].”",
          ),
          cj(
            "The [residents] of the neighborhood helped clean the park. The people who lived there worked together.",
            [
              "people who live in a place",
              "visitors",
              "teachers",
              "workers from another city",
            ],
            "🏘️🧹",
            "Clue: “The [people who lived there]”.",
          ),
          cj(
            "The teacher [assigned] each student a job. Sara was given the task of handing out the papers. What does assigned mean?",
            [
              "gave a task to someone",
              "forgot",
              "finished a task",
              "changed a task",
            ],
            "🧑‍🏫📄",
            "Clue: “Sara [was given the task]”.",
          ),
          cj(
            "The students showed [generosity] by sharing their snacks with classmates who had forgotten theirs. What does generosity mean?",
            [
              "willingness to share and give",
              "ability to work quickly",
              "fear of others",
              "desire to win",
            ],
            "🍪🤝",
            "Clue: “by [sharing] their snacks”.",
          ),
          cj(
            "After working on the project for several weeks, Omar showed that he was [mature]. He behaved responsibly and made thoughtful choices. What does mature mean?",
            [
              "acting responsibly and like an adult",
              "acting silly",
              "being very young",
              "being careless",
            ],
            "🧑✅",
            "Clue: “He [behaved responsibly]”.",
          ),
        ],
      },
    ],
  };
  // a revision page can load several weeks: each one keeps its data here (Term 2 weeks: "u<unit>w<week>")
  (window.EN_DATA = window.EN_DATA || {}).u3w2 = window.LESSON;
})();
