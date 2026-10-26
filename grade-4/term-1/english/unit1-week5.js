// English · Grade 4 · Unit 1 · Week 5 « Run-On Sentences », suffixes and argumentative text. Engine: shared/computer-lesson.js (data-subject="English").
// Sources: Classwork Booklet Term 1 (pages 26–37), Homework Booklet Term 1 (pages 29–43), Vocabulary Related Words sheet, the Final exam memo.
// Every word is read aloud and lights up; the vocabulary has animated pictures (Kit.scene in shared/common.js).
(function () {
  const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
  const BL = (rows, more) => ({ kind: "blocks", rows, ...more });
  const cj = (q, o, emoji, x) => ({ type: "mc", q, opts: o, emoji, x });
  const rh = (w, o, emoji) => ({
    type: "mc",
    q: `Which word rhymes with [${w}]?`,
    opts: o,
    emoji,
  });
  // which sentence is written correctly? o = [right, wrong, wrong]
  const fix = (q, o, emoji, x) => ({
    type: "mc",
    q: q
      ? `“${q}” Which is the right way to write it?`
      : "Which sentence is written correctly?",
    opts: o,
    emoji,
    x,
  });
  // the types of run-on sentences (Classwork page 27)
  const TYPES = [
    "C · written correctly",
    "1 · no comma, no conjunction",
    "2 · comma splice",
    "3 · too many clauses",
  ];
  const ty = (q, a, emoji) => ({
    type: "mc",
    q,
    opts: [TYPES[a], ...TYPES.filter((_, i) => i !== a)],
    keep: TYPES,
    emoji,
  });
  // a suffix: which part is the suffix, and what does the word mean
  const sfx = (sentence, word, base, suffix, meaning, wrong, emoji) => [
    {
      type: "mc",
      q: `${sentence} What is the [suffix] in “${word}”?`,
      opts: [suffix, base, suffix === "-ly" ? "-ive" : "-ly"],
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
  // find the long o words (Classwork page 32)
  const lo = (s, ans, emoji) => ({
    type: "tapw",
    q: "Tap the [2] words with the [long o] sound.",
    s,
    ans,
    emoji,
    x: Object.keys(ans)
      .map((w) => `[${w}] → ${ans[w]}`)
      .join(" · "),
  });

  window.LESSON = {
    n: 5,
    key: "en4-u1w5",
    grade: 4,
    title: "Run-On Sentences",
    unit: "Unit 1 · Week 5",
    book: "Wonders",
    hub: "index.html",
    imgDir: "img/unit1-week5",
    cover: "cover",
    question: {
      q: "How can starting a [business] help others?",
      a: "A business can [give money] or [things people need] to people in need, and it can bring people together to [help their community].",
      img: "cover",
    },

    stories: [
      {
        t: "A Helping Hand",
        en: "Classwork booklet · headings and a graph",
        path: "story-helping-hand.html",
        cover: { src: "img/helping-hand/graph.jpg" },
      },
      {
        t: "Should Kids Have Homework Every Day?",
        en: "Homework booklet · argumentative",
        path: "story-homework.html",
        cover: { src: "img/homework/kids.jpg" },
      },
      {
        t: "Should Kids Have Pets?",
        en: "Homework booklet · argumentative",
        path: "story-pets.html",
        cover: { src: "img/pets/pets.jpg" },
      },
    ].map((s) => ({ ...s, g: "📖 Reading · Argumentative text" })),

    decks: [
      {
        k: "reading",
        g: "📖 Reading · Argumentative text",
        t: "How to read an argument",
        en: "Claim, reasons, headings, graphs",
        ic: "🧭",
        cover: {
          vis: SC("plain", [
            { e: "🗣️", x: 34, y: 50, s: 36 },
            { e: "👍", x: 70, y: 46, s: 26, a: "pulse" },
          ]),
        },
        cards: [
          {
            t: "Argumentative text",
            lines: [
              "The author tells what he or she [thinks] (the claim).",
              "The author gives [reasons] and [facts] to make you [agree].",
              "Example: “We should all be active and make a difference.”",
            ],
            vis: SC(
              "sky",
              [
                { e: "🧑‍🏫", x: 30, y: 60, s: 34 },
                { t: "We should help!", x: 34, y: 18, s: 8, a: "pop:0.3" },
                { e: "👍", x: 72, y: 40, s: 20, a: "pop:1 pulse:1.6" },
                { e: "🧒", x: 74, y: 70, s: 22, a: "nod" },
              ],
              "the author wants you to agree",
            ),
          },
          {
            t: "Central idea and relevant details",
            lines: [
              "The [central idea] is what the text is mostly about.",
              "[Relevant details] tell more about the central idea.",
              "Central idea: help your community. Details: clean a park, feed someone in need.",
            ],
            vis: SC(
              "plain",
              [
                { t: "Help your community", x: 50, y: 18, s: 8, c: "good" },
                { e: "🌳", x: 20, y: 64, s: 18, a: "pop:0.4" },
                { e: "👵", x: 40, y: 64, s: 18, a: "pop:0.8" },
                { e: "🥫", x: 60, y: 64, s: 18, a: "pop:1.2" },
                { e: "📒", x: 80, y: 64, s: 18, a: "pop:1.6" },
              ],
              "1 big idea + details",
            ),
          },
          {
            t: "Text features: headings",
            lines: [
              "A [heading] is a small title above a part of the text.",
              "It tells you what that part is about: “Clean a Park”, “Meet New People”.",
            ],
            vis: SC(
              "plain",
              [
                { t: "Clean a Park", x: 50, y: 20, s: 9, c: "good" },
                { t: "— — — — — — —", x: 50, y: 36, s: 6, c: "plain" },
                { t: "Meet New People", x: 50, y: 56, s: 9, c: "good" },
                { t: "— — — — — — —", x: 50, y: 72, s: 6, c: "plain" },
              ],
              "headings",
            ),
          },
          {
            t: "Text features: graphs",
            lines: [
              "A [graph] shows numbers as a picture.",
              "The [caption] under it tells what it shows.",
              "The tallest bar is the biggest number.",
            ],
            src: "img/helping-hand/graph.jpg",
          },
          {
            t: "Reread",
            lines: [
              "Don’t understand? [Read it again], slowly.",
              "Look for the [words that help you]. Then answer.",
            ],
            vis: SC(
              "room",
              [
                { e: "📖", x: 40, y: 56, s: 34 },
                { e: "🔁", x: 70, y: 36, s: 20, a: "spin" },
                { e: "🤔", x: 72, y: 70, s: 18, a: "nod" },
              ],
              "read it again",
            ),
          },
        ],
      },
      {
        k: "words",
        g: "🔤 Vocabulary",
        t: "8 new words",
        en: "Words for the final exam",
        ic: "🔤",
        cover: {
          vis: SC("plain", [
            { e: "🏪", x: 32, y: 50, s: 38 },
            { e: "💡", x: 70, y: 40, s: 24, a: "pulse" },
          ]),
        },
        cards: [
          {
            t: "innovative",
            lines: [
              "[innovative] = doing something in a [new] way.",
              "The team had an innovative idea: shoes made from old bottles.",
            ],
            vis: SC(
              "room",
              [
                { e: "🕯️", x: 30, y: 54, s: 30, a: "hide" },
                { e: "💡", x: 30, y: 50, s: 34, a: "show" },
                { e: "🧑‍🔬", x: 70, y: 60, s: 30 },
                { t: "a new way!", x: 66, y: 18, s: 8, c: "good", a: "show" },
              ],
              "a new idea, a new way",
            ),
          },
          {
            t: "compassionate",
            lines: [
              "[compassionate] = kind; caring about people who need help.",
              "The compassionate group gives food to people in need.",
            ],
            vis: SC(
              "room",
              [
                { e: "🧒", x: 26, y: 62, s: 30 },
                { e: "🍞", x: 40, y: 60, s: 14, dx: 24, a: "go" },
                { e: "👴", x: 74, y: 60, s: 30 },
                { e: "❤️", x: 50, y: 24, s: 16, a: "pulse" },
              ],
              "kind and caring",
            ),
          },
          {
            t: "enterprise",
            lines: [
              "[enterprise] = a business, or a hard project that a person tries to do.",
              "Selling lemonade was the children’s first enterprise.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🍋", x: 24, y: 58, s: 20 },
                { e: "🥤", x: 40, y: 60, s: 20 },
                { t: "Lemonade 50¢", x: 32, y: 26, s: 7 },
                { e: "👧", x: 70, y: 62, s: 28 },
                { e: "🪙", x: 56, y: 40, s: 10, dx: 10, dy: 18, a: "go" },
              ],
              "a small business",
            ),
          },
          {
            t: "funds",
            lines: [
              "[funds] = money that is saved for something.",
              "The class raised funds to buy books for the hospital.",
            ],
            vis: SC(
              "plain",
              [
                { e: "🐷", x: 50, y: 64, s: 40 },
                { e: "💵", x: 40, y: 10, s: 14, dy: 40, a: "fall" },
                { e: "🪙", x: 56, y: 10, s: 10, dy: 44, a: "fall:0.8" },
                { e: "🪙", x: 48, y: 10, s: 10, dy: 44, a: "fall:1.5" },
              ],
              "money saved for a plan",
            ),
          },
          {
            t: "process",
            lines: [
              "[process] = a series of actions, done step by step.",
              "Making bread is a long process.",
            ],
            vis: SC(
              "room",
              [
                { e: "🌾", x: 18, y: 54, s: 22, a: "pop:0.2" },
                { t: "→", x: 34, y: 54, s: 10, c: "plain" },
                { e: "🥣", x: 50, y: 54, s: 22, a: "pop:0.9" },
                { t: "→", x: 66, y: 54, s: 10, c: "plain" },
                { e: "🍞", x: 82, y: 54, s: 22, a: "pop:1.6" },
                { t: "1", x: 18, y: 22, s: 7 },
                { t: "2", x: 50, y: 22, s: 7 },
                { t: "3", x: 82, y: 22, s: 7 },
              ],
              "step by step",
            ),
          },
          {
            t: "routine",
            lines: [
              "[routine] = the things you do every day, in the same order.",
              "Brushing my teeth is part of my bedtime routine.",
            ],
            vis: SC(
              "room",
              [
                { e: "⏰", x: 16, y: 50, s: 18, a: "pop:0.2" },
                { e: "🪥", x: 38, y: 50, s: 18, a: "pop:0.7" },
                { e: "🥣", x: 60, y: 50, s: 18, a: "pop:1.2" },
                { e: "🎒", x: 82, y: 50, s: 18, a: "pop:1.7" },
                { t: "every day", x: 50, y: 18, s: 8, c: "good" },
              ],
              "every day the same",
            ),
          },
          {
            t: "undertaking",
            lines: [
              "[undertaking] = a big job or task that someone tries to do.",
              "Building the treehouse was a big undertaking.",
            ],
            vis: SC(
              "grass",
              [
                { e: "🌳", x: 30, y: 46, s: 50 },
                { e: "🏠", x: 30, y: 30, s: 16, a: "pop:1" },
                { e: "🧑‍🔧", x: 70, y: 64, s: 28 },
                { e: "🔨", x: 82, y: 56, s: 14, a: "swing" },
              ],
              "a big job",
            ),
          },
          {
            t: "exceptional",
            lines: [
              "[exceptional] = much better than usual; excellent.",
              "She is an exceptional singer.",
            ],
            vis: SC(
              "stage",
              [
                { e: "🎤", x: 36, y: 56, s: 20 },
                { e: "👩", x: 50, y: 58, s: 32 },
                { e: "⭐", x: 30, y: 22, s: 12, a: "pulse" },
                { e: "⭐", x: 50, y: 16, s: 14, a: "pulse:0.3" },
                { e: "⭐", x: 70, y: 22, s: 12, a: "pulse:0.6" },
              ],
              "very, very good!",
            ),
          },
        ],
      },
      {
        k: "grammar",
        g: "🧩 Grammar · Run-on sentences",
        t: "Run-ons and fragments",
        en: "Spot them and fix them",
        ic: "🧩",
        cover: {
          vis: BL(
            [
              [
                ["Summer is coming", "i"],
                ["✗", "x"],
                ["I can’t wait.", "i"],
              ],
            ],
            { legend: false },
          ),
        },
        cards: [
          {
            t: "A run-on sentence",
            lines: [
              "A [run-on sentence] joins two or more independent clauses the [wrong] way.",
              "I walked in the snow it was cold. ✗",
            ],
            vis: BL(
              [
                [
                  ["I walked in the snow", "i"],
                  ["?", "x"],
                  ["it was cold.", "i"],
                ],
              ],
              {
                title: "nothing joins them ✗",
              },
            ),
          },
          {
            t: "A comma splice",
            lines: [
              "A [comma splice]: two independent clauses joined with [only a comma].",
              "He ran in the street, the car stopped. ✗",
            ],
            vis: BL(
              [
                [
                  ["He ran in the street", "i"],
                  [",", "x"],
                  ["the car stopped.", "i"],
                ],
              ],
              {
                title: "only a comma ✗",
              },
            ),
          },
          {
            t: "3 kinds of run-ons",
            lines: [
              "1. No comma and no conjunction: Summer is coming I can’t wait for summer break.",
              "2. A comma splice: Summer is coming, I can’t wait for summer break.",
              "3. Too many clauses: Summer is coming, and I can’t wait for summer break, and I am excited to go swimming.",
            ],
            vis: SC(
              "sky",
              [
                { e: "☀️", x: 24, y: 30, s: 26, a: "spin" },
                { e: "🏊", x: 64, y: 62, s: 30, a: "float" },
                { t: "1 · 2 · 3", x: 64, y: 22, s: 9, c: "bad" },
              ],
              "3 kinds of run-ons",
            ),
          },
          {
            t: "Fix it: 3 ways",
            lines: [
              "Make [two sentences]: I walked in the snow. It was cold.",
              "Use a [semicolon]: I walked in the snow; it was cold.",
              "Use a [comma] and a [conjunction]: I walked in the snow, and it was cold.",
            ],
            vis: BL(
              [
                [
                  ["I walked in the snow", "i"],
                  [".", "p"],
                  ["It was cold.", "i"],
                ],
                [
                  ["I walked in the snow", "i"],
                  [";", "p"],
                  ["it was cold.", "i"],
                ],
                [
                  ["I walked in the snow", "i"],
                  [",", "p"],
                  ["and", "c"],
                  ["it was cold.", "i"],
                ],
              ],
              { title: "✓ ✓ ✓" },
            ),
          },
          {
            t: "A fragment",
            lines: [
              "A sentence needs a [subject] (who?) and a [predicate] (what do they do?).",
              "A [fragment] is missing one of them. Finish the thought!",
              "Talk on the phone. ✗ → We talk on the phone. ✓",
            ],
            vis: BL(
              [
                [["Talk on the phone.", "f"]],
                [
                  ["We", "c"],
                  ["talk on the phone.", "i"],
                ],
              ],
              { join: "✗ ↓ ✓", legend: false },
            ),
          },
        ],
      },
      {
        k: "phonics",
        g: "🔊 Phonics · Long o",
        t: "Long o: 5 spellings",
        en: "o · o_e · oe · oa · ow",
        ic: "⛵",
        cover: {
          vis: SC("sky", [
            { e: "⛵", x: 34, y: 54, s: 40, a: "float" },
            { t: "oa", x: 72, y: 46, s: 16, c: "good" },
          ]),
        },
        cards: [
          [
            "o",
            "cold",
            "🥶",
            "cold · bold · told · mold · bolt · toll · ocean · piano",
          ],
          [
            "o_e",
            "note",
            "🎵",
            "note · smoke · stone · stove · stole · quote · sole · chose · mole · phone",
          ],
          ["oe", "toe", "🦶", "toe · foe · woe · hoe · goes · Joe"],
          [
            "oa",
            "boat",
            "⛵",
            "boat · oats · goal · load · groan · roasting · coat · coach",
          ],
          [
            "ow",
            "low",
            "❄️",
            "low · slow · snow · blown · flow · lower · mows · shadow · yellow · window",
          ],
        ].map(([p, w, e, more]) => ({
          t: `Long o spelled ${p}`,
          lines: [`[${p}] as in [${w}]`, more],
          vis: SC("plain", [
            { e, x: 32, y: 48, s: 42, a: "float" },
            { t: p, x: 72, y: 36, s: 18, c: "good", a: "pop:0.3" },
            { t: w, x: 72, y: 68, s: 12, a: "pop:0.8" },
          ]),
        })),
      },
      {
        k: "suffix",
        g: "🧱 Vocabulary strategy · Suffixes",
        t: "Suffixes -ly, -ive, -ity",
        en: "Word endings that change the meaning",
        ic: "🧱",
        cover: {
          vis: BL(
            [
              [
                ["easy", "i"],
                ["+ ly", "c"],
                ["= easily", "l"],
              ],
            ],
            { legend: false },
          ),
        },
        cards: [
          {
            t: "What is a suffix?",
            lines: [
              "A [suffix] is a word part at the [end] of a word.",
              "It changes the meaning of the word: kind → kindly.",
            ],
            vis: BL(
              [
                [
                  ["kind", "i"],
                  ["+ ly", "c"],
                  ["= kindly", "l"],
                ],
              ],
              {
                title: "base word + suffix",
                legend: false,
              },
            ),
          },
          {
            t: "-ly",
            lines: [
              "[-ly] means “in a … way”.",
              "easily = in an easy way · politely = in a polite way · truly = really",
            ],
            vis: SC(
              "room",
              [
                { e: "🙇", x: 30, y: 58, s: 32 },
                { t: "Thank you!", x: 30, y: 18, s: 8, a: "pop:0.4" },
                { t: "polite + ly", x: 70, y: 50, s: 9, c: "good" },
              ],
              "politely = in a polite way",
            ),
          },
          {
            t: "-ive",
            lines: [
              "[-ive] means “doing that, or able to do that”.",
              "active = doing things · creative = able to create · protective = wants to protect",
            ],
            vis: SC(
              "plain",
              [
                { e: "🐻", x: 34, y: 56, s: 38 },
                { e: "🧸", x: 60, y: 70, s: 16 },
                { t: "protect + ive", x: 70, y: 22, s: 9, c: "good" },
              ],
              "protective = wants to keep safe",
            ),
          },
          {
            t: "-ity",
            lines: [
              "[-ity] makes a [thing] word: “being …”.",
              "ability = being able · equality = being equal · responsibility = being responsible",
            ],
            vis: SC(
              "plain",
              [
                { e: "⚖️", x: 34, y: 54, s: 38, a: "nod" },
                { t: "equal + ity", x: 70, y: 30, s: 9, c: "good" },
              ],
              "equality = being equal",
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
                vis: SC(
                  "room",
                  [{ e: "💡", x: 50, y: 44, s: 46 }],
                  "innovative",
                ),
                label: "doing something in a new way",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "🤝", x: 36, y: 46, s: 36 },
                    { e: "❤️", x: 72, y: 40, s: 22 },
                  ],
                  "compassionate",
                ),
                label: "kind and caring",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "🐷", x: 40, y: 50, s: 40 },
                    { e: "💵", x: 76, y: 36, s: 22 },
                  ],
                  "funds",
                ),
                label: "money saved for something",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "⏰", x: 30, y: 46, s: 28 },
                    { e: "🪥", x: 70, y: 46, s: 28 },
                  ],
                  "routine",
                ),
                label: "the things you do every day",
              },
            ],
          },
          {
            type: "match",
            pairs: [
              {
                vis: SC(
                  "room",
                  [
                    { e: "🍋", x: 34, y: 50, s: 30 },
                    { e: "🪙", x: 72, y: 44, s: 24 },
                  ],
                  "enterprise",
                ),
                label: "a business or a hard project",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "🌾", x: 22, y: 46, s: 22 },
                    { e: "🍞", x: 76, y: 46, s: 22 },
                  ],
                  "process",
                ),
                label: "actions done step by step",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "🌳", x: 36, y: 44, s: 40 },
                    { e: "🔨", x: 76, y: 50, s: 22 },
                  ],
                  "undertaking",
                ),
                label: "a big job someone tries to do",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "⭐", x: 30, y: 44, s: 26 },
                    { e: "🏆", x: 70, y: 46, s: 30 },
                  ],
                  "exceptional",
                ),
                label: "much better than usual",
              },
            ],
          },
        ],
      },
      {
        k: "suffix",
        g: "🧱 Suffixes",
        t: "Word + suffix",
        en: "-ly · -ive · -ity",
        ic: "🧱",
        items: [
          cj("quick + ly = ___", ["quickly", "quickive", "quickity"], "🏃💨"),
          cj("act + ive = ___", ["active", "actly", "activity"], "🤸"),
          cj("able + ity = ___", ["ability", "ably", "abletive"], "💪"),
          cj(
            "He talked ___ to his grandma. (polite)",
            ["politely", "politive", "politity"],
            "🙇👵",
          ),
          cj(
            "She is very ___. She makes beautiful art. (create)",
            ["creative", "creately", "creatity"],
            "🎨",
          ),
          cj(
            "Boys and girls have ___. They are equal. (equal)",
            ["equality", "equally", "equative"],
            "⚖️",
          ),
          cj(
            "___, the boy caught the bus. (lucky)",
            ["Luckily", "Luckive", "Luckity"],
            "🍀🚌",
          ),
        ],
      },
      {
        k: "osort",
        g: "🔊 Phonics",
        t: "Long o sort",
        en: "o_e · oa · ow · oe",
        ic: "⛵",
        items: [
          {
            type: "sort",
            q: "Put each word in the box of its long o spelling.",
            cols: [
              { k: "o_e", t: "o_e", ex: "note", e: "🎵" },
              { k: "oa", t: "oa", ex: "boat", e: "⛵" },
              { k: "ow", t: "ow", ex: "snow", e: "❄️" },
              { k: "oe", t: "oe", ex: "toe", e: "🦶" },
            ],
            words: [
              { w: "rose", k: "o_e", e: "🌹" },
              { w: "bone", k: "o_e", e: "🦴" },
              { w: "phone", k: "o_e", e: "📱" },
              { w: "goat", k: "oa", e: "🐐" },
              { w: "coat", k: "oa", e: "🧥" },
              { w: "toast", k: "oa", e: "🍞" },
              { w: "bow", k: "ow", e: "🎀" },
              { w: "snow", k: "ow", e: "❄️" },
              { w: "bowl", k: "ow", e: "🥣" },
              { w: "toe", k: "oe", e: "🦶" },
              { w: "hoe", k: "oe", e: "🧑‍🌾" },
            ],
          },
        ],
      },
    ],

    exercises: [
      {
        k: "ron1",
        g: "🧩 Grammar · Run-on sentences",
        t: "Correct the run-on",
        en: "Classwork booklet page 26",
        ic: "🔧",
        from: "Classwork p. 26",
        items: [
          fix(
            "We have a new car it is bright red.",
            [
              "We have a new car. It is bright red.",
              "We have a new car, it is bright red.",
              "We have a new car it, is bright red.",
            ],
            "🚗🔴",
          ),
          fix(
            "I must hurry up, the store will close shortly.",
            [
              "I must hurry up, for the store will close shortly.",
              "I must hurry up, the store, will close shortly.",
              "No change needed.",
            ],
            "🏃🏪",
            "A comma alone is a comma splice: add a conjunction.",
          ),
          fix(
            "The dog ran to meet its owner it was happy to see him.",
            [
              "The dog ran to meet its owner. It was happy to see him.",
              "The dog ran to meet its owner, it was happy to see him.",
              "No change needed.",
            ],
            "🐕🧑",
          ),
          fix(
            "The baby looked up the sun was shining but clouds were rolling in.",
            [
              "The baby looked up. The sun was shining, but clouds were rolling in.",
              "The baby looked up the sun was shining, but clouds were rolling in.",
              "The baby looked up, the sun was shining but clouds were rolling in.",
            ],
            "👶🌤️",
          ),
          fix(
            "Snowflakes come in different sizes but I like big snowflakes best.",
            [
              "Snowflakes come in different sizes, but I like big snowflakes best.",
              "Snowflakes come in different sizes but, I like big snowflakes best.",
              "No change needed.",
            ],
            "❄️❄️",
            "Put a [comma] before the conjunction.",
          ),
          fix(
            "She was nervous when she got on stage there were so many people!",
            [
              "She was nervous when she got on stage. There were so many people!",
              "She was nervous, when she got on stage there were so many people!",
              "No change needed.",
            ],
            "😰🎤",
          ),
        ],
      },
      {
        k: "ron2",
        g: "🧩 Grammar · Run-on sentences",
        t: "Which kind of run-on?",
        en: "Classwork booklet page 27",
        ic: "🔢",
        from: "Classwork p. 27",
        items: [
          ty("We tried to catch the mouse, it got away.", 2, "🐭🏃"),
          ty("The student was shy and did not make friends quickly.", 0, "🙈"),
          ty("The joke was funny everyone laughed at it.", 1, "😂"),
          ty(
            "You should bring an umbrella because it is raining outside.",
            0,
            "☂️🌧️",
          ),
          ty(
            "I have a game, and my family plays it with me, and it is fun.",
            3,
            "🎲👨‍👩‍👧",
          ),
          {
            type: "mc",
            q: "From “Kids in Business”: The compassionate group gathers and distributes food to people in need. Local businesses pitch in by providing food and helping hands. Which joins them the right way?",
            opts: [
              "The compassionate group gathers and distributes food to people in need, and local businesses pitch in by providing food and helping hands.",
              "The compassionate group gathers and distributes food to people in need, local businesses pitch in by providing food and helping hands.",
              "The compassionate group gathers and distributes food to people in need local businesses pitch in by providing food and helping hands.",
            ],
            emoji: "🥫🤝",
          },
        ],
      },
      {
        k: "frag",
        g: "🧩 Grammar · Run-on sentences",
        t: "Fragments and run-ons",
        en: "Classwork p. 28 · Homework p. 34",
        ic: "🧩",
        from: "Classwork p. 28 · Homework p. 34",
        items: [
          fix(
            "Likes to eat oatmeal and waffles for dinner sometimes.",
            [
              "She likes to eat oatmeal and waffles for dinner sometimes.",
              "Likes to eat oatmeal, and waffles for dinner sometimes.",
              "No change needed.",
            ],
            "🥣🧇",
            "It needs a [subject]: who likes to eat?",
          ),
          fix(
            "Told her to call me later, but she didn’t.",
            [
              "I told her to call me later, but she didn’t.",
              "Told her to call me later but she didn’t.",
              "No change needed.",
            ],
            "📞",
          ),
          fix(
            "They carried the bags, I held the door for them.",
            [
              "They carried the bags, and I held the door for them.",
              "They carried the bags I held the door for them.",
              "No change needed.",
            ],
            "🛍️🚪",
          ),
          fix(
            "I practice hard but I’m still not the best player.",
            [
              "I practice hard, but I’m still not the best player.",
              "I practice hard but, I’m still not the best player.",
              "No change needed.",
            ],
            "🏀💪",
          ),
          fix(
            "ran around the tree.",
            [
              "The dog ran around the tree.",
              "ran around the tree, and.",
              "Around the tree.",
            ],
            "🐕🌳",
            "It needs a [subject]: who ran?",
          ),
          fix(
            "My cute little fluffy kitten",
            [
              "My cute little fluffy kitten sleeps on my bed.",
              "My cute little fluffy kitten.",
              "Cute little fluffy.",
            ],
            "🐱🛏️",
            "It needs a [predicate]: what does the kitten do?",
          ),
          fix(
            "Whenever I walk the dog",
            [
              "Whenever I walk the dog, I take a ball.",
              "Whenever I walk the dog.",
              "I walk whenever.",
            ],
            "🐕⚾",
            "A dependent clause cannot stand alone: finish the thought.",
          ),
          fix(
            "On the way to the store, we",
            [
              "On the way to the store, we saw our teacher.",
              "On the way to the store, we.",
              "The store, we.",
            ],
            "🏪👩‍🏫",
          ),
          fix(
            "Chases sticks wherever I throw them.",
            [
              "My dog chases sticks wherever I throw them.",
              "Chases sticks, wherever I throw them.",
              "Wherever I throw them.",
            ],
            "🐕🪵",
          ),
          fix(
            "She was hungry, she ate a whole box of pizza.",
            [
              "She was hungry, so she ate a whole box of pizza.",
              "She was hungry she ate a whole box of pizza.",
              "No change needed.",
            ],
            "🍕😋",
          ),
          fix(
            "I know the answer of the question I can’t tell you.",
            [
              "I know the answer to the question, but I can’t tell you.",
              "I know the answer of the question, I can’t tell you.",
              "No change needed.",
            ],
            "🤐❓",
          ),
          fix(
            "Tom wore his jacket the weather was cold",
            [
              "Tom wore his jacket because the weather was cold.",
              "Tom wore his jacket, the weather was cold",
              "No change needed.",
            ],
            "🧥🥶",
          ),
          fix(
            "Should we go by train, should we take the bus?",
            [
              "Should we go by train, or should we take the bus?",
              "Should we go by train should we take the bus?",
              "No change needed.",
            ],
            "🚆🚌",
          ),
          fix(
            "Sara packed her bag she checked her homework.",
            [
              "Sara packed her bag, and she checked her homework.",
              "Sara packed her bag, she checked her homework.",
              "No change needed.",
            ],
            "🎒📚",
          ),
        ],
      },
      {
        k: "ron3",
        g: "🧩 Grammar · Run-on sentences",
        t: "Fix these run-on sentences",
        en: "Classwork p. 31 · Homework p. 33",
        ic: "🔧",
        from: "Classwork p. 31 · Homework p. 33",
        items: [
          fix(
            "The girls played tennis the boys played soccer.",
            [
              "The girls played tennis, and the boys played soccer.",
              "The girls played tennis, the boys played soccer.",
              "The girls played, tennis the boys played soccer.",
            ],
            "🎾⚽",
          ),
          fix(
            "The sun was shining we decided to go to the park.",
            [
              "The sun was shining, so we decided to go to the park.",
              "The sun was shining, we decided to go to the park.",
              "No change needed.",
            ],
            "☀️🌳",
          ),
          fix(
            "My brother likes basketball I prefer soccer.",
            [
              "My brother likes basketball, but I prefer soccer.",
              "My brother likes basketball, I prefer soccer.",
              "No change needed.",
            ],
            "🏀⚽",
          ),
          fix(
            "We can watch a movie we can play a board game.",
            [
              "We can watch a movie, or we can play a board game.",
              "We can watch a movie, we can play a board game.",
              "No change needed.",
            ],
            "🎬🎲",
          ),
          fix(
            "My parents surprised us, they told us we were going to England.",
            [
              "My parents surprised us. They told us we were going to England.",
              "My parents surprised us they told us we were going to England.",
              "No change needed.",
            ],
            "🎁🇬🇧",
          ),
          fix(
            "Jack was very hungry he forgot his lunch.",
            [
              "Jack was very hungry because he forgot his lunch.",
              "Jack was very hungry, he forgot his lunch.",
              "No change needed.",
            ],
            "😋🍱",
          ),
          fix(
            "We can swim, or we can build a sandcastle, or we can fish.",
            [
              "We can swim, build a sandcastle, or fish.",
              "We can swim we can build a sandcastle we can fish.",
              "No change needed.",
            ],
            "🏊🏰🎣",
            "Too many clauses: make it shorter.",
          ),
          fix(
            "",
            [
              "I shot the ball, but I missed the target.",
              "I shot the ball, I missed the target.",
              "I shot the ball I missed the target.",
            ],
            "⚽🥅",
          ),
          fix(
            "",
            [
              "They arrived early, so they enjoyed the party.",
              "They arrived early they enjoyed the party.",
              "They arrived early, they enjoyed the party.",
            ],
            "🎉⏰",
          ),
          fix(
            "",
            [
              "It was too cold. The weather was cloudy.",
              "It was too cold the weather was cloudy.",
              "It was too cold, the weather was cloudy.",
            ],
            "🥶☁️",
          ),
          fix(
            "",
            [
              "I like to write stories. I write one every day, but sometimes I don’t have enough time.",
              "I like to write stories, and I write one every day, but sometimes I don’t have enough time.",
              "I like to write stories, I write one every day, but sometimes I don’t have enough time.",
            ],
            "✍️📖",
          ),
        ],
      },
      {
        k: "proof",
        g: "🧩 Grammar · Run-on sentences",
        t: "Proofreading",
        en: "Classwork booklet page 29",
        ic: "🔍",
        from: "Classwork p. 29",
        items: [
          {
            type: "open",
            q: "Venus is a planet in our solar system. It is about the same size as Earth, it is much hotter than Earth, is closer to the sun. Venus is too hot for people to live on it. There are many volcanoes there are also many mountains. Fix the run-ons and fragments. Say it the right way.",
            a: "Venus is a planet in our solar system. It is about the same size as Earth, but it is much hotter than Earth because it is closer to the sun. Venus is too hot for people to live on it. There are many volcanoes, and there are also many mountains.",
            emoji: "🪐🌋",
          },
          {
            type: "open",
            q: "I live in Florida, but my Aunt Ana. I only see her a few times every year. Sometimes she visits me sometimes I visit her. Like going to Puerto Rico. It is warm, and it is sunny, and the markets have delicious foods. My favorite thing to do with Aunt Ana. Fix the run-ons and fragments.",
            a: "I live in Florida, but my Aunt Ana lives in Puerto Rico. I only see her a few times every year. Sometimes she visits me, and sometimes I visit her. I like going to Puerto Rico. It is warm and sunny, and the markets have delicious foods. Shopping at the markets is my favorite thing to do with Aunt Ana.",
            emoji: "🌴☀️",
          },
        ],
      },
      {
        k: "test",
        g: "🧩 Grammar · Run-on sentences",
        t: "Test: run-on sentences",
        en: "Classwork booklet page 30",
        ic: "📝",
        from: "Classwork p. 30",
        items: [
          {
            type: "mc",
            q: "(1) It was night, and my mom and I were out on a group hike. (2) The stars glittered in the sky; they were so far away. (3) The ground was soft in one spot, so we did not step there. (4) The group leader brought a map, she didn’t need it. (5) We will visit more national parks, nature trails, and landmarks on vacation. Which sentence is a [run-on]?",
            opts: ["Sentence 4", "Sentence 2", "Sentence 3", "Sentence 5"],
            emoji: "🌌🥾",
            x: "“The group leader brought a map, she didn’t need it.” = a comma splice.",
          },
          {
            type: "mc",
            q: "Which sentences are [NOT] run-on sentences?",
            opts: [
              "Sentences 1 and 3",
              "Sentences 2 and 4",
              "Sentences 3 and 4",
              "Sentences 4 and 5",
            ],
            emoji: "✅✅",
          },
          {
            type: "mc",
            q: "“We are supposed to go shopping, and I am ready to go, but Mom can’t find her shoes!” What is the correct way to write it?",
            opts: [
              "We are supposed to go shopping. I am ready to go, but Mom can’t find her shoes!",
              "We are supposed to go shopping, I am ready to go! But Mom can’t find!",
              "We are supposed to go shopping. I am ready to go! But can’t find her shoes!",
              "No change needs to be made.",
            ],
            emoji: "🛍️👟",
          },
          {
            type: "mc",
            q: "“The shop is filled with items I am careful not to break anything.” What is the correct way to write it?",
            opts: [
              "The shop is filled with items, but I am careful not to break anything.",
              "The shop is filled with items, I am careful not to break anything.",
              "The shop is filled with items because I am careful not to break anything.",
              "No change needs to be made.",
            ],
            emoji: "🏺🛒",
          },
        ],
      },
      {
        k: "ofind",
        g: "🔊 Phonics · Long o",
        t: "Find the long o words",
        en: "Classwork booklet page 32",
        ic: "🔎",
        from: "Classwork p. 32",
        items: [
          lo(
            "I have oats and yogurt for breakfast.",
            { oats: "oa", yogurt: "o" },
            "🥣",
          ),
          lo(
            "Joe drove his car extremely fast.",
            { Joe: "oe", drove: "o_e" },
            "🚗💨",
          ),
          lo(
            "Can you locate where the coast is on the map?",
            { locate: "o", coast: "oa" },
            "🗺️🏖️",
          ),
          lo(
            "I had a new yellow phone case.",
            { yellow: "ow", phone: "o_e" },
            "📱💛",
          ),
          lo(
            "The boy focused on what the coach had said.",
            { focused: "o", coach: "oa" },
            "🧑‍🏫⚽",
          ),
          lo("I saw a crow flying alone.", { crow: "ow", alone: "o_e" }, "🐦‍⬛"),
          lo(
            "At the moment, he finished playing the piano. Everyone clapped.",
            { moment: "o", piano: "o" },
            "🎹👏",
          ),
          lo("She lost her own coat.", { own: "ow", coat: "oa" }, "🧥"),
          lo(
            "The new fellow told us a secret.",
            { fellow: "ow", told: "o" },
            "🤫",
          ),
          lo(
            "She opened the window when the weather was too hot.",
            { opened: "o", window: "ow" },
            "🪟☀️",
          ),
        ],
      },
      {
        k: "osort1",
        g: "🔊 Phonics · Long o",
        t: "Sort the long o words",
        en: "Homework booklet page 35",
        ic: "🗂️",
        from: "Homework p. 35",
        items: [
          {
            type: "sort",
            q: "Read the words. Sort them by their long o spelling.",
            cols: [
              { k: "o", t: "o", ex: "cold", e: "🥶" },
              { k: "o_e", t: "o_e", ex: "note", e: "🎵" },
              { k: "oe", t: "oe", ex: "toe", e: "🦶" },
              { k: "oa", t: "oa", ex: "boat", e: "⛵" },
              { k: "ow", t: "ow", ex: "low", e: "❄️" },
            ],
            words: [
              { w: "toe", k: "oe", e: "🦶" },
              { w: "shadow", k: "ow", e: "👤" },
              { w: "ocean", k: "o", e: "🌊" },
              { w: "load", k: "oa", e: "📦" },
              { w: "slope", k: "o_e", e: "⛷️" },
              { w: "tomorrow", k: "ow", e: "📅" },
              { w: "toaster", k: "oa", e: "🍞" },
              { w: "explode", k: "o_e", e: "💥" },
              { w: "hoe", k: "oe", e: "🧑‍🌾" },
              { w: "buffalo", k: "o", e: "🦬" },
              { w: "goes", k: "oe", e: "🚶" },
              { w: "notice", k: "o", e: "📋" },
              { w: "boat", k: "oa", e: "⛵" },
              { w: "telephone", k: "o_e", e: "☎️" },
              { w: "throw", k: "ow", e: "⚾" },
            ],
          },
        ],
      },
      {
        k: "osort2",
        g: "🔊 Phonics · Long o",
        t: "Word sort",
        en: "Homework booklet page 29",
        ic: "🗂️",
        from: "Homework p. 29",
        items: [
          {
            type: "sort",
            q: "Sort the spelling words by their long o spelling.",
            cols: [
              { k: "o_e", t: "o_e", ex: "note", e: "🎵" },
              { k: "oe", t: "oe", ex: "toe", e: "🦶" },
              { k: "ow", t: "ow", ex: "low", e: "❄️" },
              { k: "o", t: "o", ex: "cold", e: "🥶" },
              { k: "oa", t: "oa", ex: "boat", e: "⛵" },
            ],
            words: [
              { w: "stone", k: "o_e", e: "🪨" },
              { w: "stove", k: "o_e", e: "🍳" },
              { w: "stole", k: "o_e", e: "🦹" },
              { w: "quote", k: "o_e", e: "💬" },
              { w: "sole", k: "o_e", e: "👟" },
              { w: "chose", k: "o_e", e: "👉" },
              { w: "mole", k: "o_e", e: "🐀" },
              { w: "woe", k: "oe", e: "😢" },
              { w: "blown", k: "ow", e: "🌬️" },
              { w: "shadow", k: "ow", e: "👤" },
              { w: "flow", k: "ow", e: "🌊" },
              { w: "lower", k: "ow", e: "⬇️" },
              { w: "mows", k: "ow", e: "🌱" },
              { w: "mold", k: "o", e: "🍞" },
              { w: "toll", k: "o", e: "🛣️" },
              { w: "bolt", k: "o", e: "🔩" },
              { w: "roasting", k: "oa", e: "🍗" },
              { w: "goal", k: "oa", e: "🥅" },
              { w: "load", k: "oa", e: "📦" },
              { w: "groan", k: "oa", e: "😩" },
            ],
          },
        ],
      },
      {
        k: "orhyme",
        g: "🔊 Phonics · Long o",
        t: "Rhymes and ABC order",
        en: "Homework booklet page 30",
        ic: "🎵",
        from: "Homework p. 30",
        items: [
          rh("bowl", ["goal", "pond", "house"], "🥣🥅"),
          rh("rolled", ["mold", "doll", "found"], "🍞"),
          rh("show", ["woe", "cow", "saw"], "😢"),
          rh("boat", ["quote", "late", "spot"], "⛵💬"),
          rh("sowed", ["load", "feed", "few"], "🌱📦"),
          rh("moan", ["blown", "train", "on"], "😩🌬️"),
          rh("grove", ["stove", "give", "save"], "🌳🍳"),
          rh("so", ["flow", "frog", "sod"], "🌊"),
          rh("goes", ["chose", "gold", "chop"], "🚶👉"),
          rh("foal", ["toll", "poke", "rail"], "🐴🛣️"),
          rh("bowl", ["stole", "growl", "told"], "🥣🦹"),
          rh("own", ["groan", "foul", "paw"], "😩"),
          rh("loan", ["stone", "lead", "said"], "🪨"),
          rh("coal", ["mole", "fall", "clock"], "🐀"),
          rh("hose", ["mows", "shop", "mope"], "🌱"),
          {
            type: "order",
            t: "Put the words in ABC order",
            ask: "Put these words in alphabetical order, to the second letter: bolt, shadow, roasting, sole, lower.",
            hint: "shadow and sole both start with s: look at the second letter, h before o.",
            steps: [
              { say: "bolt", e: "🔩" },
              { say: "lower", e: "⬇️" },
              { say: "roasting", e: "🍗" },
              { say: "shadow", e: "👤" },
              { say: "sole", e: "👟" },
            ],
            emoji: "🔤",
          },
        ],
      },
      {
        k: "ospell",
        g: "🔊 Phonics · Long o",
        t: "Find the spelling mistakes",
        en: "Classwork booklet page 33",
        ic: "✏️",
        from: "Classwork p. 33",
        items: [
          {
            type: "tapw",
            fix: true,
            q: "Tap the [6] words that are spelled wrong.",
            s: "There are many things to do in your home if your gole is to help. You can clean your room and sweep the floors. You can even rake the lawn. Rather than grone and act as if you are filled with wowe, why not have some fun while you do it?\nOne fun activity you can help with is cooking—just make sure you do it with an adult. You can start off small by preheating the stoav or getting things from loer shelves in the pantry. Helping out in the kitchen is a great way to get to know about food. One day you’ll be rowsting dinner all by yourself!",
            ans: {
              gole: "goal",
              grone: "groan",
              wowe: "woe",
              stoav: "stove",
              loer: "lower",
              rowsting: "roasting",
            },
            emoji: "🧹🍳",
            x: "goal · groan · woe · stove · lower · roasting",
          },
        ],
      },
      {
        k: "vfill",
        g: "🔤 Vocabulary",
        t: "Fill in the word",
        en: "Homework booklet page 31",
        ic: "✍️",
        from: "Homework p. 31",
        items: [
          cj(
            "Organizing the show has been a massive ___.",
            ["undertaking", "routine", "funds"],
            "🎪📋",
          ),
          cj(
            "Listening to music is a part of my morning ___.",
            ["routine", "undertaking", "exceptional"],
            "🎧🌅",
          ),
          cj(
            "Our business’s greatest problem is the lack of ___.",
            ["funds", "routine", "compassionate"],
            "💵❓",
          ),
          cj(
            "Mohamed Salah is an ___ football player.",
            ["exceptional", "funds", "undertaking"],
            "⚽⭐",
          ),
          cj(
            "My mom is a kind, ___ person.",
            ["compassionate", "exceptional", "routine"],
            "👩❤️",
          ),
        ],
      },
      {
        k: "vmatch",
        g: "🔤 Vocabulary",
        t: "Match the meaning",
        en: "Homework booklet page 31",
        ic: "🔗",
        from: "Homework p. 31",
        items: [
          {
            type: "match",
            pairs: [
              {
                vis: { kind: "lines", rows: ["enterprise"] },
                label: "something difficult that a person tries to do",
              },
              {
                vis: { kind: "lines", rows: ["process"] },
                label: "a series of actions performed when doing something",
              },
              {
                vis: { kind: "lines", rows: ["innovative"] },
                label: "doing something in a new way",
              },
            ],
          },
          {
            type: "mc",
            q: "Which word is [related] to “compassionate”? (It has the same base word.)",
            opts: ["compassion", "company", "compass"],
            emoji: "❤️🤝",
            x: "compassion · compassionate · compassionately: they all have [passion].",
          },
          {
            type: "mc",
            q: "Which word is [related] to “funds”?",
            opts: ["fundraiser", "fun", "find"],
            emoji: "🐷💵",
            x: "fund · funds · funding · fundraiser · refund",
          },
        ],
      },
      {
        k: "vuse",
        g: "🔤 Vocabulary",
        t: "Use the word",
        en: "Say a sentence of your own",
        ic: "💬",
        from: "Final exam: use the words",
        items: [
          [
            "innovative",
            "My brother has an innovative idea for a robot that cleans the table.",
            "🤖💡",
          ],
          [
            "compassionate",
            "The compassionate girl helped the old man carry his bags.",
            "👧👴",
          ],
          [
            "enterprise",
            "Our class started a small enterprise selling cookies.",
            "🍪🏪",
          ],
          ["funds", "We collected funds to help the animal shelter.", "🐶💵"],
          ["process", "Planting a tree is a process with many steps.", "🌱🌳"],
          [
            "routine",
            "My morning routine is to wake up, wash my face and eat breakfast.",
            "🌅🥣",
          ],
          [
            "undertaking",
            "Cleaning the whole school garden was a big undertaking.",
            "🧹🌳",
          ],
          [
            "exceptional",
            "Our team had an exceptional day and won every game.",
            "🏆⭐",
          ],
        ].map(([w, a, emoji]) => ({
          type: "open",
          q: `Say a sentence of your own with the word [${w}].`,
          a,
          emoji,
        })),
      },
      {
        k: "sfx1",
        g: "🧱 Vocabulary strategy · Suffixes",
        t: "Suffixes in A Helping Hand",
        en: "Classwork booklet page 37",
        ic: "🧱",
        from: "Classwork p. 37",
        items: [
          ...sfx(
            "Helping can truly make a difference.",
            "truly",
            "true",
            "-ly",
            "really; in a true way",
            ["not true", "very fast"],
            "🤝✨",
          ),
          ...sfx(
            "We should all be active in promoting changes to better our community.",
            "active",
            "act",
            "-ive",
            "busy doing things; taking part",
            ["very tired", "a game"],
            "🤸🏘️",
          ),
          ...sfx(
            "You can easily learn about other people who live near you.",
            "easily",
            "easy",
            "-ly",
            "in an easy way, without trouble",
            ["in a hard way", "very slowly"],
            "😌📖",
          ),
          ...sfx(
            "It is everyone’s responsibility to help people who are in need.",
            "responsibility",
            "responsible",
            "-ity",
            "a job or duty you must do",
            ["a free time", "a big party"],
            "🙋✅",
          ),
        ],
      },
      {
        k: "sfx2",
        g: "🧱 Vocabulary strategy · Suffixes",
        t: "Find the suffix",
        en: "Homework booklet page 36",
        ic: "🧱",
        from: "Homework p. 36",
        items: [
          ...sfx(
            "Tom talked politely to his teacher to explain what happened.",
            "politely",
            "polite",
            "-ly",
            "in a polite, nice way",
            ["in a rude way", "very loudly"],
            "🙇👩‍🏫",
          ),
          ...sfx(
            "The protective mother bear watched over her tiny cubs.",
            "protective",
            "protect",
            "-ive",
            "wanting to keep someone safe",
            ["very hungry", "very sleepy"],
            "🐻🧸",
          ),
          ...sfx(
            "Her ability to learn new skills impressed her boss at work.",
            "ability",
            "able",
            "-ity",
            "being able to do something",
            ["being lazy", "being late"],
            "💪📚",
          ),
          ...sfx(
            "The artist used a variety of materials to make this creative piece of art.",
            "creative",
            "create",
            "-ive",
            "able to make new things",
            ["very old", "very small"],
            "🎨🖼️",
          ),
          ...sfx(
            "The nurse was very supportive of her patients.",
            "supportive",
            "support",
            "-ive",
            "giving help and support",
            ["very angry", "very quiet"],
            "🧑‍⚕️🤝",
          ),
          ...sfx(
            "Luckily, the little boy was able to catch the bus.",
            "Luckily",
            "lucky",
            "-ly",
            "by good luck",
            ["sadly", "slowly"],
            "🍀🚌",
          ),
          ...sfx(
            "The organization decided to fight for gender equality and fair treatment.",
            "equality",
            "equal",
            "-ity",
            "being equal; the same for everyone",
            ["being different", "being first"],
            "⚖️👫",
          ),
        ],
      },
      {
        k: "internet",
        g: "📖 Reading · Argumentative text",
        t: "Share your ideas: the Internet",
        en: "Homework booklet page 43",
        ic: "🌐",
        from: "Homework p. 43",
        items: [
          {
            type: "open",
            q: "Say one [advantage] (+) of the Internet.",
            a: "We can learn and find information for school very quickly.",
            vis: SC(
              "room",
              [
                { e: "🧒", x: 30, y: 62, s: 30 },
                { e: "💻", x: 66, y: 62, s: 30 },
                { e: "📚", x: 66, y: 26, s: 18, a: "pop:0.5" },
              ],
              "learn",
            ),
          },
          {
            type: "open",
            q: "Say another [advantage] (+) of the Internet.",
            a: "We can talk with our family and friends who live far away, with video calls.",
            vis: SC(
              "room",
              [
                { e: "📱", x: 40, y: 54, s: 36 },
                { e: "👵", x: 40, y: 50, s: 14 },
                { e: "👋", x: 70, y: 46, s: 20, a: "wave" },
              ],
              "video calls",
            ),
          },
          {
            type: "open",
            q: "Say one [disadvantage] (−) of the Internet.",
            a: "We can spend too much time in front of the screen and not play or sleep enough.",
            vis: SC(
              "night",
              [
                { e: "🧒", x: 34, y: 62, s: 30 },
                { e: "💻", x: 66, y: 62, s: 26 },
                { e: "⏰", x: 70, y: 22, s: 16, a: "shake" },
              ],
              "too much screen time",
            ),
          },
          {
            type: "open",
            q: "Say another [disadvantage] (−) of the Internet.",
            a: "Some websites have viruses or are not safe, and some people online are strangers.",
            vis: SC(
              "room",
              [
                { e: "💻", x: 40, y: 56, s: 36 },
                { e: "🦠", x: 46, y: 50, s: 14, a: "pulse" },
                { e: "⚠️", x: 74, y: 30, s: 20, a: "blink" },
              ],
              "viruses and strangers",
            ),
          },
        ],
      },
    ],
  };
})();
