// English · Grade 4 · Unit 1 · Week 3 « Compound Sentences ». Engine: shared/computer-lesson.js (data-subject="English").
// Sources: Classwork Booklet Term 1 (pages 3–10), Homework Booklet Term 1 (pages 4–10), Graded Homework (vocabulary),
// the Reading Companion (The Talent Show, with the school's model answers), the Mid-term memo.
// Every word is read aloud and lights up; the vocabulary has animated pictures (Kit.scene in shared/common.js).
(function () {
  // an animated picture: background, items, caption (see Kit.scene)
  const SC = (bg, items, cap) => ({ kind: "scene", bg, items, cap });
  // sentence blocks (see Kit.blocks): rows of [text, kind]
  const BL = (rows, more) => ({ kind: "blocks", rows, ...more });
  // simple or compound?
  const sc = (q, a, emoji) => ({
    type: "mc",
    q,
    opts: a === "s" ? ["simple", "compound"] : ["compound", "simple"],
    keep: ["simple", "compound"],
    icons: a === "s" ? ["1️⃣", "🔗"] : ["🔗", "1️⃣"],
    two: true,
    emoji,
    x:
      a === "s"
        ? "One independent clause = a [simple] sentence."
        : "Two independent clauses joined = a [compound] sentence.",
  });
  // choose the conjunction: q has ___ ; o = [right, wrong, wrong]
  const cj = (q, o, emoji, x) => ({ type: "mc", q, opts: o, emoji, x });
  // a long e rhyme (Homework page 5)
  const rh = (w, o, emoji) => ({
    type: "mc",
    q: `Which word rhymes with [${w}]?`,
    opts: o,
    emoji,
  });

  window.LESSON = {
    n: 3,
    key: "en4-u1w3",
    grade: 4,
    title: "Compound Sentences",
    unit: "Unit 1 · Week 3",
    book: "Wonders",
    hub: "index.html",
    imgDir: "img/unit1-week3",
    cover: "cover",
    question: {
      q: "How do your [actions] affect others?",
      a: "What we do can make other people feel [happy] or [hurt]. Being [honest] and [kind] helps everyone.",
      img: "cover",
    },

    /* ---------- Learn: the stories (their own pages) ---------- */
    stories: [
      {
        t: "The Talent Show",
        en: "Shared read · realistic fiction",
        path: "story-talent-show.html",
        cover: { src: "img/talent-show/girls.jpg" },
      },
      {
        t: "Stormy Weather",
        en: "Classwork booklet · realistic fiction",
        path: "story-stormy-weather.html",
        cover: { src: "img/stormy-weather/science-fair.jpg" },
      },
      {
        t: "An Honestly Fun Camp",
        en: "Homework booklet · realistic fiction",
        path: "story-honest-camp.html",
        cover: { src: "img/honest-camp/boy.jpg" },
      },
      {
        t: "A Surprise for Emily",
        en: "Homework booklet · realistic fiction",
        path: "story-surprise-emily.html",
        cover: { src: "img/surprise-emily/paints.jpg" },
      },
      {
        t: "The Dream Team",
        en: "Reading book · realistic fiction",
        path: "story-dream-team.html",
        cover: { src: "img/dream-team/cover.jpg" },
      },
    ].map((s) => ({ ...s, g: "📖 Stories" })),

    /* ---------- Learn: card decks ---------- */
    decks: [
      {
        k: "words",
        g: "🔤 Vocabulary",
        t: "8 new words",
        en: "Words from The Talent Show",
        ic: "🔤",
        cover: {
          vis: SC("plain", [
            { e: "💡", x: 30, y: 45, s: 40, a: "pulse" },
            { e: "✨", x: 62, y: 35, s: 26, a: "blink" },
            { t: "words", x: 50, y: 80, s: 14 },
          ]),
        },
        cards: [
          {
            t: "accountable",
            lines: [
              "[accountable] = it is your job, so you must do it and answer for it.",
              "In the story: “You’re still [accountable] for your own actions.”",
            ],
            vis: SC(
              "room",
              [
                { e: "🧒", x: 30, y: 58, s: 38 },
                { e: "🧹", x: 48, y: 64, s: 28, a: "nod" },
                { e: "📋", x: 75, y: 38, s: 24 },
                { e: "✅", x: 82, y: 31, s: 13, a: "pop:1.2" },
                { t: "My job!", x: 28, y: 18, a: "pop:0.5" },
              ],
              "It is my job. I must do it.",
            ),
          },
          {
            t: "self-esteem",
            lines: [
              "[self-esteem] = feeling good about yourself: respect, pride and confidence.",
              "In the story: “It will be good for your [self-esteem]!”",
            ],
            vis: SC(
              "room",
              [
                { e: "🪞", x: 66, y: 48, s: 46 },
                { e: "😊", x: 66, y: 44, s: 18 },
                { e: "🧒", x: 30, y: 56, s: 38 },
                { e: "⭐", x: 82, y: 18, s: 14, a: "pulse" },
                { e: "⭐", x: 14, y: 20, s: 10, a: "pulse:0.6" },
                { t: "I can do it!", x: 30, y: 16, a: "pop:0.5" },
              ],
              "feeling good about yourself",
            ),
          },
          {
            t: "desperately",
            lines: [
              "[desperately] = very, very much, because things look hopeless.",
              "In the story: “I [desperately] wanted to win.”",
            ],
            vis: SC(
              "grass",
              [
                { e: "🏆", x: 74, y: 40, s: 30, a: "float" },
                { e: "😫", x: 30, y: 46, s: 30, a: "shake" },
                { e: "🙏", x: 30, y: 74, s: 20, a: "shake:0.2" },
                { t: "Please, please!", x: 34, y: 14, a: "pop:0.4" },
              ],
              "wanting it very, very much",
            ),
          },
          {
            t: "hesitated",
            lines: [
              "[hesitated] = waited a moment, because you were not sure.",
              "In the story: “I [hesitated] for a second before continuing.”",
            ],
            vis: SC(
              "room",
              [
                { e: "🚪", x: 76, y: 52, s: 50 },
                { e: "🧒", x: 34, y: 58, s: 36, dx: 14, a: "go" },
                { e: "🤔", x: 34, y: 22, s: 18, dx: 14, a: "go" },
                { t: "Should I…?", x: 60, y: 12, a: "pop:0.5" },
              ],
              "stop… not sure… wait",
            ),
          },
          {
            t: "humiliated",
            lines: [
              "[humiliated] = feeling very ashamed and silly in front of other people.",
              "In the story: “We don’t want to be [humiliated], right?”",
            ],
            vis: SC(
              "stage",
              [
                { e: "🤹", x: 50, y: 42, s: 30, a: "hide" },
                { e: "😳", x: 50, y: 46, s: 26, a: "show" },
                { e: "⚾", x: 38, y: 30, s: 9, dy: 40, a: "shoot" },
                { e: "⚾", x: 62, y: 28, s: 9, dy: 42, a: "shoot:0.15" },
                { e: "😂", x: 22, y: 78, s: 14, a: "jump" },
                { e: "😂", x: 50, y: 80, s: 14, a: "jump:0.3" },
                { e: "😂", x: 78, y: 78, s: 14, a: "jump:0.6" },
              ],
              "Everyone laughs. So ashamed!",
            ),
          },
          {
            t: "advise",
            lines: [
              "[advise] = to tell someone what you think they should do.",
              "In the story: “I [advise] you to tell the truth,” said Grandma.",
            ],
            vis: SC(
              "room",
              [
                { e: "👵", x: 28, y: 56, s: 38 },
                { t: "Tell the truth!", x: 40, y: 16, a: "pop:0.4" },
                { e: "👧", x: 74, y: 60, s: 32, a: "nod" },
                { e: "👍", x: 88, y: 36, s: 14, a: "pop:1.4" },
              ],
              "Grandma tells her what to do",
            ),
          },
          {
            t: "inspiration",
            lines: [
              "[inspiration] = something that gives you a great new idea.",
              "In the story: “My [inspiration] came from that new TV show.”",
            ],
            vis: SC(
              "room",
              [
                { e: "📺", x: 26, y: 50, s: 36 },
                { e: "🎤", x: 26, y: 48, s: 14, a: "nod" },
                { e: "👧", x: 70, y: 62, s: 34 },
                { e: "💡", x: 70, y: 24, s: 22, a: "pop:0.8 pulse:1.4" },
                { e: "✨", x: 84, y: 16, s: 12, a: "blink" },
              ],
              "The TV show gives her an idea!",
            ),
          },
          {
            t: "uncomfortably",
            lines: [
              "[uncomfortably] = in a way that does not feel good or easy.",
              "In the story: “My grip on my books became [uncomfortably] tight.”",
            ],
            vis: SC(
              "room",
              [
                { e: "🪑", x: 50, y: 66, s: 36 },
                { e: "😬", x: 50, y: 36, s: 26, a: "shake" },
                { e: "📚", x: 50, y: 52, s: 16, a: "squeeze" },
                { e: "💦", x: 64, y: 26, s: 10, a: "blink" },
              ],
              "not at ease, not comfortable",
            ),
          },
        ],
      },
      {
        k: "grammar",
        g: "🧩 Grammar · Compound sentences",
        t: "Simple and compound sentences",
        en: "Clauses, FANBOYS, comma, semicolon",
        ic: "🧩",
        cover: {
          vis: BL(
            [
              [
                ["I wanted to play", "i"],
                [",", "p"],
                ["but", "c"],
                ["it rained.", "i"],
              ],
            ],
            {
              legend: false,
            },
          ),
        },
        cards: [
          {
            t: "A clause",
            lines: [
              "A [clause] is a group of words with a [subject] and a [verb].",
              "An [independent clause] can stand alone as a sentence.",
              "Example: I love playing video games.",
            ],
            vis: BL(
              [
                [
                  ["I", "c"],
                  ["love", "d"],
                  ["playing video games.", "i"],
                ],
              ],
              {
                title: "subject + verb",
                legend: false,
                note: "I = subject (who?) · love = verb (what do I do?)",
              },
            ),
          },
          {
            t: "A simple sentence",
            lines: [
              "A [simple sentence] has [one] independent clause.",
              "Example: Devon played with the puppy.",
            ],
            vis: BL([[["Devon played with the puppy.", "i"]]], {
              title: "1 clause = simple",
            }),
          },
          {
            t: "A compound sentence",
            lines: [
              "A [compound sentence] has [two or more] independent clauses.",
              "A [comma] and a [conjunction] join them.",
              "Example: I wanted to go to the mall, but I had to finish my chores.",
            ],
            vis: BL(
              [
                [
                  ["I wanted to go to the mall", "i"],
                  [",", "p"],
                  ["but", "c"],
                  ["I had to finish my chores.", "i"],
                ],
              ],
              { title: "2 clauses = compound" },
            ),
          },
          {
            t: "FANBOYS",
            lines: [
              "The 7 [coordinating conjunctions] join two sentences.",
              "[for] · [and] · [nor] · [but] · [or] · [yet] · [so]",
              "Their first letters spell [FANBOYS].",
            ],
            vis: SC(
              "grass",
              [
                { e: "🚂", x: 7, y: 56, s: 14, dx: 4, a: "go" },
                { t: "for", x: 21, y: 56, s: 5.5, a: "pop:0.2" },
                { t: "and", x: 33, y: 56, s: 5.5, a: "pop:0.4" },
                { t: "nor", x: 45, y: 56, s: 5.5, a: "pop:0.6" },
                { t: "but", x: 57, y: 56, s: 5.5, a: "pop:0.8" },
                { t: "or", x: 68, y: 56, s: 5.5, a: "pop:1" },
                { t: "yet", x: 79, y: 56, s: 5.5, a: "pop:1.2" },
                { t: "so", x: 90, y: 56, s: 5.5, a: "pop:1.4" },
                {
                  t: "F A N B O Y S",
                  x: 50,
                  y: 22,
                  s: 11,
                  c: "good",
                  a: "pop:1.8",
                },
              ],
              "for · and · nor · but · or · yet · so",
            ),
          },
          {
            t: "and · or · so",
            lines: [
              "[and] adds one more thing ➕: The boys played music, and the girls sang.",
              "[or] gives a choice 🔀: We can go to the park, or we can stay at home.",
              "[so] tells what happened next ➡️: It started to rain, so we went inside.",
            ],
            vis: SC(
              "rain",
              [
                { e: "🌧️", x: 26, y: 26, s: 30 },
                { e: "💧", x: 20, y: 40, s: 7, dy: 40, a: "fall" },
                { e: "💧", x: 32, y: 42, s: 7, dy: 40, a: "fall:0.7" },
                { t: "so", x: 52, y: 50, s: 12, c: "good", a: "pulse" },
                { e: "🏠", x: 78, y: 56, s: 30 },
                { e: "🧒", x: 66, y: 70, s: 18, dx: 10, a: "go" },
              ],
              "It started to rain, so we went inside.",
            ),
          },
          {
            t: "but · yet · for · nor",
            lines: [
              "[but] and [yet] show something different, a surprise ↔️: I studied, yet the test was hard.",
              "[for] means [because] ❓: I brought a stool, for I could not reach the cabinet.",
              "[nor] means [not this and not that] 🚫: She doesn't like apples, nor does she like oranges.",
            ],
            vis: SC(
              "room",
              [
                { e: "🍎", x: 30, y: 46, s: 26 },
                { e: "🚫", x: 30, y: 46, s: 34, a: "pop:0.6" },
                { t: "nor", x: 50, y: 46, s: 11, c: "good", a: "pulse" },
                { e: "🍊", x: 70, y: 46, s: 26 },
                { e: "🚫", x: 70, y: 46, s: 34, a: "pop:1.2" },
              ],
              "not apples, nor oranges",
            ),
          },
          {
            t: "The comma ,",
            lines: [
              "Put a [comma] before the conjunction.",
              "Haruto was hungry for lunch, but the food wasn't ready.",
            ],
            vis: BL(
              [
                [
                  ["Haruto was hungry for lunch", "i"],
                  [",", "p"],
                  ["but", "c"],
                  ["the food wasn’t ready.", "i"],
                ],
              ],
              { title: "comma + conjunction" },
            ),
          },
          {
            t: "The semicolon ;",
            lines: [
              "A [semicolon] can join two independent clauses [without] a conjunction.",
              "Anya loved baseball; she was the best pitcher in the league.",
            ],
            vis: BL(
              [
                [
                  ["Anya loved baseball", "i"],
                  [";", "p"],
                  ["she was the best pitcher in the league.", "i"],
                ],
              ],
              { title: "semicolon, no conjunction" },
            ),
          },
          {
            t: "Common error: the comma splice",
            lines: [
              "Two sentences joined with [only a comma] is a mistake: a [comma splice].",
              "Fix it: add a conjunction after the comma, or use a semicolon.",
            ],
            vis: BL(
              [
                [
                  ["He ran", "i"],
                  [",", "x"],
                  ["the car stopped.", "i"],
                ],
                [
                  ["He ran", "i"],
                  [",", "p"],
                  ["and", "c"],
                  ["the car stopped.", "i"],
                ],
              ],
              { join: "✗ → ✓" },
            ),
          },
        ],
      },
      {
        k: "phonics",
        g: "🔊 Phonics · Long e",
        t: "Long e: 8 spellings",
        en: "e · ee · ea · e_e · ie · ei · ey · y",
        ic: "🌳",
        cover: {
          vis: SC("grass", [
            { e: "🌳", x: 32, y: 50, s: 44 },
            { t: "ee", x: 70, y: 46, s: 18, c: "good", a: "pulse" },
          ]),
        },
        cards: [
          ["e", "we", "🙋", "we · me · be · zebra · evening", "e"],
          [
            "ee",
            "tree",
            "🌳",
            "teeth · deed · indeed · speech · sleek · reef · wheeze",
            "ee",
          ],
          ["ea", "seat", "💺", "league · healer · breathe · creature", "ea"],
          ["e_e", "these", "👉", "scheme · concrete · complete · eve", "e_e"],
          ["ie", "piece", "🍰", "belief · chief · grief · thief", "ie"],
          ["ei", "receive", "📨", "receive · ceiling · conceive", "ei"],
          ["ey", "key", "🔑", "honey · donkey · monkey · chimney", "ey"],
          ["y", "happy", "😄", "family · scary · party · empty", "y"],
        ].map(([p, w, e, more, k]) => ({
          t: `Long e spelled ${p}`,
          lines: [`[${p}] as in [${w}]`, more],
          vis: SC("plain", [
            { e, x: 32, y: 48, s: 42, a: "float" },
            { t: p, x: 72, y: 36, s: 18, c: "good", a: "pop:0.3" },
            { t: w, x: 72, y: 68, s: 12, a: "pop:0.8" },
          ]),
          k,
        })),
      },
    ],
    ideas: [],

    /* ---------- Play ---------- */
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
                  [
                    { e: "😬", x: 50, y: 40, s: 40 },
                    { e: "🪑", x: 50, y: 75, s: 30 },
                  ],
                  "uncomfortably",
                ),
                label: "not feeling good or easy",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "🤔", x: 40, y: 45, s: 40 },
                    { e: "🚪", x: 78, y: 50, s: 40 },
                  ],
                  "hesitated",
                ),
                label: "waited because you were unsure",
              },
              {
                vis: SC(
                  "room",
                  [{ e: "💡", x: 50, y: 42, s: 50 }],
                  "inspiration",
                ),
                label: "something that gives you an idea",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "😳", x: 40, y: 45, s: 40 },
                    { e: "🙈", x: 74, y: 45, s: 30 },
                  ],
                  "humiliated",
                ),
                label: "felt very ashamed in front of others",
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
                    { e: "🙋", x: 40, y: 45, s: 40 },
                    { e: "✅", x: 76, y: 40, s: 26 },
                  ],
                  "accountable",
                ),
                label: "responsible for something",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "😊", x: 40, y: 45, s: 40 },
                    { e: "⭐", x: 76, y: 40, s: 26 },
                  ],
                  "self-esteem",
                ),
                label: "respect, pride and confidence",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "😫", x: 40, y: 45, s: 40 },
                    { e: "🙏", x: 76, y: 50, s: 26 },
                  ],
                  "desperately",
                ),
                label: "very, very much, things look hopeless",
              },
              {
                vis: SC(
                  "room",
                  [
                    { e: "👵", x: 36, y: 50, s: 40 },
                    { e: "💬", x: 74, y: 30, s: 26 },
                  ],
                  "advise",
                ),
                label: "tell someone what they should do",
              },
            ],
          },
        ],
      },
      {
        k: "fanboys",
        g: "🧩 Grammar",
        t: "FANBOYS race",
        en: "Pick the right joining word",
        ic: "🚂",
        items: [
          cj(
            "It started to rain, ___ we went inside.",
            ["so", "but", "or"],
            "🌧️🏠",
          ),
          cj(
            "Do you want lemonade, ___ do you prefer orange juice?",
            ["or", "and", "yet"],
            "🍋🍊",
          ),
          cj(
            "I like cats, ___ my brother likes dogs.",
            ["but", "so", "or"],
            "🐱🐶",
          ),
          cj(
            "She sings, ___ he plays the guitar.",
            ["and", "or", "nor"],
            "🎤🎸",
          ),
          cj(
            "I didn't eat lunch, ___ I was very hungry.",
            ["so", "or", "nor"],
            "🍽️😋",
          ),
          cj(
            "He went to bed early, ___ he was tired.",
            ["for", "or", "nor"],
            "😴🛏️",
            "[for] = because.",
          ),
        ],
      },
      {
        k: "lsort",
        g: "🔊 Phonics",
        t: "Long e sort",
        en: "ee · ea · ey · y",
        ic: "🌳",
        items: [
          {
            type: "sort",
            q: "Put each word in the box of its long e spelling.",
            cols: [
              { k: "ee", t: "ee", ex: "tree", e: "🌳" },
              { k: "ea", t: "ea", ex: "seat", e: "💺" },
              { k: "ey", t: "ey", ex: "key", e: "🔑" },
              { k: "y", t: "y", ex: "happy", e: "😄" },
            ],
            words: [
              { w: "feet", k: "ee", e: "🦶" },
              { w: "bee", k: "ee", e: "🐝" },
              { w: "sheep", k: "ee", e: "🐑" },
              { w: "leaf", k: "ea", e: "🍃" },
              { w: "beach", k: "ea", e: "🏖️" },
              { w: "eat", k: "ea", e: "🍽️" },
              { w: "monkey", k: "ey", e: "🐒" },
              { w: "honey", k: "ey", e: "🍯" },
              { w: "donkey", k: "ey", e: "🫏" },
              { w: "baby", k: "y", e: "👶" },
              { w: "puppy", k: "y", e: "🐶" },
              { w: "candy", k: "y", e: "🍬" },
            ],
          },
        ],
      },
    ],

    /* ---------- Exercises: the booklets, grouped by topic ---------- */
    exercises: [
      {
        k: "sc1",
        g: "🧩 Grammar · Compound sentences",
        t: "Simple or compound?",
        en: "Classwork booklet page 3",
        ic: "1️⃣",
        from: "Classwork p. 3",
        items: [
          sc(
            "I wanted to go to the concert, but my parents wouldn’t let me.",
            "c",
            "🎵🚫",
          ),
          sc(
            "Mrs. Gupta lives on a very busy road in the middle of the city.",
            "s",
            "🏙️🚗",
          ),
          sc(
            "He got a hot dog, she got a hamburger, and you got a salad.",
            "c",
            "🌭🍔🥗",
          ),
          sc("Can we go to the movies later this evening?", "s", "🎬🌆"),
          sc(
            "There are too many stars in the sky to count all of them.",
            "s",
            "✨🌌",
          ),
          sc(
            "The little puppy was adopted quickly, for it was very sweet.",
            "c",
            "🐶💕",
          ),
          sc(
            "The balloon drifted up into the fluffy clouds above.",
            "s",
            "🎈☁️",
          ),
          sc(
            "We left early, yet the traffic on the highway still made us late.",
            "c",
            "🚗🚗⏰",
          ),
          sc(
            "Do you want to read a book, or would you like to take a walk?",
            "c",
            "📖🚶",
          ),
          sc(
            "My cousin thinks he was lucky to get into his favorite college.",
            "s",
            "🎓🍀",
          ),
        ],
      },
      {
        k: "sc2",
        g: "🧩 Grammar · Compound sentences",
        t: "S or C?",
        en: "Homework booklet page 8",
        ic: "🔗",
        from: "Homework p. 8",
        items: [
          sc("They left early, so they arrived first.", "c", "🏃🥇"),
          sc("Sam practices the guitar every day.", "s", "🎸📅"),
          sc("The building has several elevators and stairwells.", "s", "🏢🛗"),
          sc(
            "They didn’t brush their teeth, nor did they comb their hair.",
            "c",
            "🪥💇",
          ),
          sc("We took the city bus, but it was crowded.", "c", "🚌👥"),
          sc("Some grocery stores are open on Sundays.", "s", "🛒📅"),
          sc(
            "I didn’t eat any cookies, yet there are none left in the jar.",
            "c",
            "🍪🫙",
          ),
          sc(
            "He finished his book, and he has nothing left to read.",
            "c",
            "📕✅",
          ),
          sc("The birds are singing in the trees and the bushes.", "s", "🐦🌳"),
          sc("Emily won the game, so she received a medal.", "c", "🏅😀"),
          sc("Alexia drove to work.", "s", "🚗🏢"),
          sc("She doesn’t like green or orange.", "s", "💚🧡"),
          sc("He has to find a job, for he is unemployed.", "c", "💼🔍"),
          sc("We can go now, or we can go later.", "c", "⏰🚶"),
          sc("They visited Canada and Australia.", "s", "🇨🇦🇦🇺"),
        ],
      },
      {
        k: "cj1",
        g: "🧩 Grammar · Compound sentences",
        t: "Circle the conjunction",
        en: "Classwork p. 4 · Homework p. 9",
        ic: "⭕",
        from: "Classwork p. 4 · Homework p. 9",
        items: [
          cj(
            "We can go to Florida for vacation, ___ we can visit California.",
            ["or", "nor"],
            "🌴🏖️",
            "[or] = a choice.",
          ),
          cj(
            "My sister asked me to go with her, ___ I did not want to.",
            ["but", "for"],
            "👧🙅",
            "[but] = something different.",
          ),
          cj(
            "I brought a stool into the kitchen, ___ I could not reach the cabinet.",
            ["for", "or"],
            "🪜🗄️",
            "[for] = because.",
          ),
          cj(
            "The ostrich has feathers and wings, ___ this bird cannot fly.",
            ["yet", "nor"],
            "🪶🚫✈️",
            "[yet] = a surprise: it has wings, but it can't fly.",
          ),
          cj(
            "Haley is good at math, ___ Raul is better at science.",
            ["but", "for"],
            "➗🔬",
            "[but] = something different.",
          ),
          cj(
            "Ben likes to race his car fast, ___ he should think about his safety.",
            ["but", "and", "or"],
            "🏎️⚠️",
          ),
          cj(
            "I folded my clothes, ___ I placed them in my dresser.",
            ["and", "yet", "for"],
            "👕🗄️",
          ),
          cj(
            "You finished your homework, ___ you have to put your school bag away.",
            ["so", "nor", "or"],
            "📚🎒",
          ),
          cj(
            "Martha likes chocolate, ___ she doesn’t like candies.",
            ["but", "and", "so"],
            "🍫🍬",
          ),
          cj(
            "Do you want lemonade, ___ do you prefer orange juice?",
            ["or", "and", "yet"],
            "🍋🍊",
          ),
          cj(
            "I will be late for the party, ___ I will be having dinner with my parents first.",
            ["for", "and", "or"],
            "🎉🍽️",
            "[for] = because.",
          ),
          cj(
            "She doesn’t like apples, ___ does she like oranges.",
            ["nor", "and", "or"],
            "🍎🍊",
            "[nor] = not this and not that.",
          ),
          cj(
            "He had an exam the following day, ___ he watched movies throughout the night.",
            ["yet", "so", "or"],
            "📝📺",
            "[yet] = a surprise: he had an exam, but he watched movies!",
          ),
          cj(
            "It started to rain, ___ we went inside.",
            ["so", "for", "nor"],
            "🌧️🏠",
          ),
          cj(
            "You can finish your homework now, ___ you can do it after dinner.",
            ["or", "but", "so"],
            "📚🍽️",
          ),
          cj(
            "They won the competition, ___ they practiced hard.",
            ["for", "but", "yet"],
            "🏆💪",
            "[for] = because they practiced hard.",
          ),
          cj(
            "Sue went to the party, ___ she enjoyed her time.",
            ["and", "or", "nor"],
            "🎉😀",
          ),
        ],
      },
      {
        k: "cj2",
        g: "🧩 Grammar · Compound sentences",
        t: "Join the two sentences",
        en: "Classwork p. 8 · Homework p. 10",
        ic: "🔗",
        from: "Classwork p. 8 · Homework p. 10",
        items: [
          cj(
            "I won’t go to the park, ___ will my sister.",
            ["nor", "and", "so"],
            "🌳🚫",
            "I won’t go to the park. My sister will not go. → [nor]",
          ),
          cj(
            "He read this paragraph three times, ___ he did not understand anything.",
            ["but", "so", "or"],
            "📄🤷",
          ),
          cj(
            "We were bored this afternoon, ___ we went to the cinema.",
            ["so", "nor", "or"],
            "🥱🎬",
          ),
          cj(
            "Water is better for you, ___ juice has a lot of sugar.",
            ["for", "or", "nor"],
            "💧🧃",
            "[for] = because juice has a lot of sugar.",
          ),
          cj(
            "The boys played on the musical instruments, ___ the girls sang.",
            ["and", "nor", "or"],
            "🥁🎤",
          ),
          cj(
            "We can go to the park, ___ we can stay at home.",
            ["or", "nor", "so"],
            "🌳🏠",
          ),
          cj(
            "I really need a holiday, ___ I have a lot of work.",
            ["for", "or", "nor"],
            "🏝️💼",
            "[for] = because I have a lot of work.",
          ),
          cj(
            "Our car broke down, ___ we took a taxi.",
            ["so", "or", "nor"],
            "🚗💥🚕",
          ),
          cj(
            "Summer is my favorite season, ___ I love playing on the beach.",
            ["for", "but", "nor"],
            "☀️🏖️",
          ),
          cj(
            "The spelling test was easy, ___ I got A+.",
            ["so", "yet", "for"],
            "📝🅰️",
          ),
          cj(
            "I will go swimming, ___ I will go to the park.",
            ["or", "but", "yet"],
            "🏊🌳",
          ),
          cj(
            "Harry met me this morning, ___ he didn’t mention the camp.",
            ["yet", "so", "and"],
            "🤝⛺",
          ),
          cj(
            "Linda invited me to the party, ___ I won’t be able to go.",
            ["but", "so", "or"],
            "💌🙅",
          ),
          cj(
            "Aunt Ann is sick, ___ let’s visit her today.",
            ["so", "and", "but"],
            "🤒💐",
          ),
          cj(
            "My phone is dead, ___ I forgot to charge it last night.",
            ["for", "yet", "but"],
            "📱🔋",
          ),
          cj(
            "I want to go to school, ___ I feel too sick.",
            ["but", "and", "or"],
            "🏫🤒",
          ),
        ],
      },
      {
        k: "punct",
        g: "🧩 Grammar · Compound sentences",
        t: "Comma or semicolon",
        en: "Classwork page 5",
        ic: "✏️",
        from: "Classwork p. 5",
        items: [
          {
            type: "mc",
            q: "Which compound sentence is written correctly?",
            opts: [
              "I am good at football, but Luis is a better player than I am.",
              "I am good at football but, Luis is a better player than I am.",
              "I am good at football, Luis is a better player than I am.",
            ],
            emoji: "⚽🏃",
            x: "A [comma] goes [before] the conjunction.",
          },
          {
            type: "mc",
            q: "Which compound sentence is written correctly?",
            opts: [
              "There is no milk left, for my friends drank it all.",
              "There is no milk left for, my friends drank it all.",
              "There is no milk left my friends drank it all.",
            ],
            emoji: "🥛😮",
          },
          {
            type: "mc",
            q: "Which compound sentence is written correctly?",
            opts: [
              "The class can take a trip to the zoo, or we can visit the museum.",
              "The class can take a trip to the zoo or, we can visit the museum.",
              "The class can take a trip to the zoo, we can visit the museum.",
            ],
            emoji: "🦁🏛️",
          },
          {
            type: "mc",
            q: "Join with a semicolon. Which one is right?",
            opts: [
              "Alligators have wide snouts; crocodiles have narrow snouts.",
              "Alligators have wide snouts; and crocodiles have narrow snouts.",
              "Alligators have; wide snouts crocodiles have narrow snouts.",
            ],
            emoji: "🐊🐊",
            x: "A [semicolon] joins two sentences [without] a conjunction.",
          },
          {
            type: "mc",
            q: "Join with a semicolon. Which one is right?",
            opts: [
              "I could not remember the answer; I had to take a guess.",
              "I could not remember; the answer I had to take a guess.",
              "I could not remember the answer; so, I had to take a guess.",
            ],
            emoji: "🤔❓",
          },
          {
            type: "tapw",
            q: "From “The Talent Show”: tap the 2 [conjunctions] that join the compound sentences.",
            s: "“No,” said my grandmother. “I said that you weren’t respectful of your own ideas, or you would have spoken up. I understand that you’re friends, but you’re still accountable for your own actions.”",
            ans: { or: "conjunction", but: "conjunction" },
            src: "img/talent-show/maura.jpg",
            x: "“…of your own ideas, [or] you would have spoken up.” and “…you’re friends, [but] you’re still accountable…”",
          },
        ],
      },
      {
        k: "proof",
        g: "🧩 Grammar · Compound sentences",
        t: "Proofreading",
        en: "Classwork page 6",
        ic: "🔍",
        from: "Classwork p. 6",
        items: [
          {
            type: "mc",
            q: "“These horses once roamed free; yet today there are few remaining.” Which is right?",
            opts: [
              "These horses once roamed free, yet today there are few remaining.",
              "These horses once roamed free yet; today there are few remaining.",
              "These horses once roamed free; yet, today there are few remaining.",
            ],
            emoji: "🐎🌵",
            x: "With a conjunction (yet) we use a [comma], not a semicolon.",
          },
          {
            type: "mc",
            q: "“People are trying to save the mustangs that are left. And we should do what we can to help.” Which is right?",
            opts: [
              "People are trying to save the mustangs that are left, and we should do what we can to help.",
              "People are trying to save the mustangs that are left and, we should do what we can to help.",
              "People are trying to save the mustangs that are left, we should do what we can to help.",
            ],
            emoji: "🐎🤝",
            x: "Don't start a sentence with “And”: join the two sentences with [, and].",
          },
          {
            type: "open",
            q: "Read the whole paragraph again, the right way.",
            a: "The mustang is America’s symbol of the Wild West. These horses once roamed free[, yet] today there are few remaining. People are trying to save the mustangs that are left[, and] we should do what we can to help.",
            emoji: "🐎🇺🇸",
          },
        ],
      },
      {
        k: "test",
        g: "🧩 Grammar · Compound sentences",
        t: "Test: simple and compound",
        en: "Classwork page 7",
        ic: "📝",
        from: "Classwork p. 7",
        items: [
          {
            type: "mc",
            q: "(1) Everyone in my class is good at different things. (2) Aaron is the fastest runner in the entire school. (3) Shari, my best friend, can throw a ball farther than anyone I know. (4) What about me? (5) I am good at some things, and I am bad at others. Which sentence is a [compound] sentence?",
            opts: ["Sentence 5", "Sentence 1", "Sentence 2", "Sentence 4"],
            emoji: "🏃⚾🙋",
            x: "“I am good at some things, [and] I am bad at others.” = two clauses.",
          },
          {
            type: "mc",
            q: "“I am good at some things, and I am bad at others.” Which word is the [coordinating conjunction]?",
            opts: ["and", "am", "at", "bad"],
            emoji: "🔗",
          },
          {
            type: "mc",
            q: "(1) He does not play video games. (2) He does not watch television. Which conjunction best combines sentences 1 and 2?",
            opts: [
              "He does not play video games, and he does not watch television.",
              "He does not play video games, for he does not watch television.",
              "He does not play video games, but he does not watch television.",
              "He does not play video games, or he does not watch television.",
            ],
            emoji: "🎮🚫📺",
          },
          {
            type: "mc",
            q: "(3) He goes to bed early. (4) He is still tired the next day. Which conjunction best combines sentences 3 and 4?",
            opts: [
              "He goes to bed early, but he is still tired the next day.",
              "He goes to bed early, or he is still tired the next day.",
              "He goes to bed early, for he is still tired the next day.",
              "He goes to bed early, nor he is still tired the next day.",
            ],
            emoji: "🛏️🥱",
            x: "[but] = something different: he sleeps early, but he is still tired.",
          },
        ],
      },
      {
        k: "find",
        g: "🔊 Phonics · Long e",
        t: "Find the long e words",
        en: "Classwork page 9",
        ic: "🔎",
        from: "Classwork p. 9",
        items: [
          [
            "This boy saved the cat. He is a hero.",
            { He: "e", hero: "e" },
            "🦸🐱",
          ],
          ["I have to complete my homework now.", { complete: "e_e" }, "📚✅"],
          [
            "Sally was very hungry, so I gave her a piece of cake.",
            { Sally: "y", very: "y", hungry: "y", piece: "ie" },
            "🍰😋",
          ],
          [
            "My friends will meet the organizer next week to set a plan for the party.",
            { meet: "ee", week: "ee", party: "y" },
            "📅🎉",
          ],
          ["Bring me some papers please.", { me: "e", please: "ea" }, "📄🙏"],
          [
            "We must change the color of the ceiling.",
            { We: "e", ceiling: "ei" },
            "🎨🏠",
          ],
          [
            "I was so scared when I found a rat inside the chimney.",
            { chimney: "ey" },
            "🐀🏠",
          ],
          [
            "My bottle is empty; I will refill it and come back.",
            { empty: "y", refill: "e" },
            "🍼🚰",
          ],
          [
            "Tomorrow they will announce the winning team.",
            { team: "ea" },
            "🏆👥",
          ],
          [
            "The weather will be windy next Sunday.",
            { be: "e", windy: "y" },
            "🌬️📅",
          ],
        ].map(([s, ans, emoji]) => ({
          type: "tapw",
          q: "Tap every word with the [long e] sound.",
          s,
          ans,
          emoji,
          x: Object.keys(ans)
            .map((w) => `[${w}] → ${ans[w]}`)
            .join(" · "),
        })),
      },
      {
        k: "wsort",
        g: "🔊 Phonics · Long e",
        t: "Word sort",
        en: "Homework booklet page 4",
        ic: "🗂️",
        from: "Homework p. 4",
        items: [
          {
            type: "sort",
            q: "Sort the spelling words by their long e spelling.",
            cols: [
              { k: "ee", t: "ee", ex: "teeth", e: "🦷" },
              { k: "ea", t: "ea", ex: "seat", e: "💺" },
              { k: "e_e", t: "e_e", ex: "these", e: "👉" },
              { k: "ie", t: "ie", ex: "grief", e: "😢" },
              { k: "ey", t: "ey", ex: "key", e: "🔑" },
              { k: "y", t: "y", ex: "scary", e: "👻" },
              { k: "e", t: "e", ex: "we", e: "🙋" },
            ],
            words: [
              { w: "indeed", k: "ee", e: "✅" },
              { w: "deed", k: "ee", e: "🤝" },
              { w: "speech", k: "ee", e: "🎤" },
              { w: "sleek", k: "ee", e: "🐆" },
              { w: "reef", k: "ee", e: "🪸" },
              { w: "wheeze", k: "ee", e: "😮‍💨" },
              { w: "breathe", k: "ea", e: "🌬️" },
              { w: "healer", k: "ea", e: "🩺" },
              { w: "league", k: "ea", e: "⚽" },
              { w: "squeaky", k: ["ea", "y"], e: "🐭" },
              { w: "weary", k: ["ea", "y"], e: "🥱" },
              { w: "scheme", k: "e_e", e: "📝" },
              { w: "concrete", k: "e_e", e: "🧱" },
              { w: "belief", k: "ie", e: "🙏" },
              { w: "chief", k: "ie", e: "👨‍🍳" },
              { w: "honey", k: "ey", e: "🍯" },
              { w: "donkey", k: "ey", e: "🫏" },
              { w: "family", k: "y", e: "👨‍👩‍👧" },
              { w: "zebra", k: "e", e: "🦓" },
              { w: "evening", k: ["e", "e_e"], e: "🌆" },
            ],
          },
        ],
      },
      {
        k: "rhyme",
        g: "🔊 Phonics · Long e",
        t: "Rhymes and ABC order",
        en: "Homework booklet page 5",
        ic: "🎵",
        from: "Homework p. 5",
        items: [
          rh("reach", ["speech", "rich", "patch"], "🤚🎤"),
          rh("peeler", ["healer", "parlor", "seller"], "🥔🩺"),
          rh("dream", ["scheme", "rein", "deep"], "💭📝"),
          rh("teethe", ["breathe", "reed", "with"], "🦷🌬️"),
          rh("mistreat", ["concrete", "reset", "create"], "🧱"),
          rh("creaky", ["squeaky", "shaky", "funny"], "🚪🐭"),
          rh("leaf", ["chief", "left", "stuff"], "🍃👨‍🍳"),
          rh("reread", ["indeed", "complete", "rounded"], "📖✅"),
          rh("weak", ["sleek", "deck", "sink"], "🐆"),
          rh("beef", ["belief", "birth", "feed"], "🥩🙏"),
          rh("money", ["honey", "many", "penny"], "💰🍯"),
          rh("thief", ["reef", "third", "cliff"], "🦹🪸"),
          rh("cheery", ["weary", "very", "chair"], "😀🥱"),
          rh("bead", ["deed", "lend", "belt"], "📿🤝"),
          rh("please", ["wheeze", "need", "this"], "🙏😮‍💨"),
          {
            type: "order",
            t: "Put the words in ABC order",
            ask: "Put these words in alphabetical order: evening, donkey, league, zebra, family.",
            hint: "a b c d e f … Look at the first letter.",
            steps: [
              { say: "donkey", e: "🫏" },
              { say: "evening", e: "🌆" },
              { say: "family", e: "👨‍👩‍👧" },
              { say: "league", e: "⚽" },
              { say: "zebra", e: "🦓" },
            ],
            emoji: "🔤",
          },
        ],
      },
      {
        k: "spell",
        g: "🔊 Phonics · Long e",
        t: "Find the spelling mistakes",
        en: "Classwork page 10",
        ic: "✏️",
        from: "Classwork p. 10",
        items: [
          {
            type: "tapw",
            fix: true,
            q: "Tap the [6] words that are spelled wrong.",
            s: "Being sick is not fun. A cold can give you a sore throat and a runny nose. Sometimes you may cough or wheze. A cold can be worse in the eavening, when you go to bed. It can even keep you up all night. This makes you feel fuzzy and wearie in the morning.\nPeople do different things to get rid of a cold. Some people drink hot water or tea with hony. Others breethe steamy air to feel better. They may even see a doctor or other heler. Most of the time, rest is the best way to get rid of a cold.",
            ans: {
              wheze: "wheeze",
              eavening: "evening",
              wearie: "weary",
              hony: "honey",
              breethe: "breathe",
              heler: "healer",
            },
            emoji: "🤧🍵",
            x: "wheeze · evening · weary · honey · breathe · healer",
          },
        ],
      },
      {
        k: "vfill",
        g: "🔤 Vocabulary",
        t: "Fill in the word",
        en: "Homework p. 7 · Graded homework",
        ic: "✍️",
        from: "Homework p. 7 · Graded HW",
        items: [
          cj(
            "Where does the ___ of your artwork come from?",
            ["inspiration", "advise", "humiliated"],
            "🎨💡",
          ),
          cj(
            "The student sat ___ on the wooden chair.",
            ["uncomfortably", "inspiration", "advise"],
            "🪑😬",
          ),
          cj(
            "The actor was ___ when he fell on the stage.",
            ["humiliated", "uncomfortably", "advise"],
            "🎭😳",
          ),
          cj(
            "I ___ you to clean your room daily.",
            ["advise", "inspiration", "humiliated"],
            "🧹🛏️",
          ),
          cj(
            "After losing his phone, John searched for it ___.",
            ["desperately", "hesitated", "accountable"],
            "📱🔦",
          ),
          cj(
            "Sarah ___ for a moment before entering the new classroom.",
            ["hesitated", "self-esteem", "desperately"],
            "🚪🤔",
          ),
          cj(
            "Students are ___ for keeping their desks clean and organized.",
            ["accountable", "hesitated", "self-esteem"],
            "🧽🪑",
          ),
          cj(
            "Believing in yourself and trying your best can help build high ___.",
            ["self-esteem", "accountable", "desperately"],
            "😊⭐",
          ),
        ],
      },
      {
        k: "vmatch",
        g: "🔤 Vocabulary",
        t: "Match the meaning",
        en: "Homework booklet page 7",
        ic: "🔗",
        from: "Homework p. 7",
        items: [
          {
            type: "match",
            pairs: [
              {
                vis: { kind: "lines", rows: ["hesitated"] },
                label: "waited because you are unsure",
              },
              {
                vis: { kind: "lines", rows: ["self-esteem"] },
                label: "having respect, pride, and confidence",
              },
              {
                vis: { kind: "lines", rows: ["accountable"] },
                label: "to be responsible for something",
              },
              {
                vis: { kind: "lines", rows: ["desperately"] },
                label: "trying to change a hopeless situation",
              },
            ],
          },
        ],
      },
      {
        k: "vuse",
        g: "🔤 Vocabulary",
        t: "Use the word",
        en: "Graded homework",
        ic: "💬",
        from: "Graded HW",
        items: [
          {
            type: "open",
            q: "Finish the sentence: The boy felt [humiliated] when …",
            a: "The boy felt humiliated when he fell down in front of the whole class.",
            emoji: "😳🙈",
          },
          {
            type: "open",
            q: "Finish the sentence: My teacher [advised] me to …",
            a: "My teacher advised me to read every night before bed.",
            emoji: "👩‍🏫📖",
          },
          {
            type: "open",
            q: "Finish the sentence: I waited [uncomfortably] for …",
            a: "I waited uncomfortably for the doctor to give me my shot.",
            emoji: "🪑😬",
          },
          {
            type: "open",
            q: "Finish the sentence: I got an [inspiration] for my painting from …",
            a: "I got an inspiration for my painting from the beautiful sunset at the beach.",
            emoji: "🎨🌅",
          },
          {
            type: "open",
            q: "Say a sentence of your own with the word [accountable].",
            a: "I am accountable for feeding my cat every morning.",
            emoji: "🐱🥣",
          },
        ],
      },
      {
        k: "frame",
        g: "📖 Reading · The Talent Show",
        t: "Summary of The Talent Show",
        en: "Homework p. 6 · writing frame",
        ic: "🗺️",
        from: "Homework p. 6",
        items: [
          [
            "This story is about two best friends and what they wanted to do for the talent show. Maura wanted to ___ on her own.",
            ["juggle", "sing", "dance"],
            "🤹",
          ],
          [
            "But Tina wanted to do an act with ___.",
            ["Maura", "her mother", "her brother"],
            "👭",
          ],
          [
            "Maura had a [problem]. Tina always told Maura ___.",
            ["what to do", "a joke", "a secret"],
            "👉",
          ],
          ["This made Maura feel ___.", ["upset", "proud", "sleepy"], "😣"],
          [
            "At lunch, Tina told Maura they should do a ___ and dance routine together.",
            ["song", "juggling", "magic"],
            "🎤💃",
          ],
          [
            "Then Maura told Tina about her ___.",
            ["juggling act", "costume", "TV show"],
            "🤹",
          ],
          [
            "After school, Maura explained her [problem] to her ___.",
            ["grandmother", "teacher", "brother"],
            "👵",
          ],
          [
            "Maura's grandmother said Tina did not respect her idea, but Maura did not think her own idea was ___.",
            ["important", "funny", "bad"],
            "🤔",
          ],
          [
            "Maura's grandmother explained, “You are responsible for ___.”",
            ["your own actions", "Tina's act", "the talent show"],
            "🙋",
          ],
          [
            "Maura's grandmother said Maura must tell Tina ___.",
            ["the truth", "a story", "goodbye"],
            "💬",
          ],
          [
            "At home, Maura called Tina. Maura told Tina that she was going to do her own ___.",
            ["juggling act", "dance", "song"],
            "📞🤹",
          ],
          [
            "Maura was worried that Tina was ___.",
            ["mad", "happy", "sick"],
            "😠",
          ],
          [
            "The next day, Tina described her act and her ___ for the show.",
            ["costume", "juggling", "grandmother"],
            "👗",
          ],
          [
            "The big surprise came at recess, when Tina let Maura choose ___ to play.",
            ["a game", "a song", "a book"],
            "🎲",
          ],
        ].map(([q, opts, emoji]) => ({ type: "mc", q, opts, emoji })),
      },
    ],
  };
})();
