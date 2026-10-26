// English · Grade 4 · Unit 1 · Week 4 « Complex Sentences » and Idioms. Engine: shared/computer-lesson.js (data-subject="English").
// Sources: Classwork Booklet Term 1 (pages 15–24), Homework Booklet Term 1 (pages 19–27), the school's model answers (phonics review),
// the Idioms picture dictionary. Every word is read aloud and lights up; each idiom has two animated pictures:
// what the words say, and what it really means (Kit.idiom in shared/common.js).
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
  // independent or dependent clause?
  const id = (q, a, emoji, sub) => ({
    type: "mc",
    q,
    opts:
      a === "I" ? ["independent", "dependent"] : ["dependent", "independent"],
    keep: ["independent", "dependent"],
    icons: a === "I" ? ["💪", "🤝"] : ["🤝", "💪"],
    two: true,
    emoji,
    x:
      a === "I"
        ? "It can stand alone as a sentence: [independent] (I)."
        : `It cannot stand alone. It begins with [${sub}]: [dependent] (D).`,
  });
  // compound or complex?
  const cc = (q, a, conj, emoji) => ({
    type: "mc",
    q,
    opts: a === "cd" ? ["compound", "complex"] : ["complex", "compound"],
    keep: ["compound", "complex"],
    icons: a === "cd" ? ["🔗", "🧩"] : ["🧩", "🔗"],
    two: true,
    emoji,
    x:
      a === "cd"
        ? `[${conj}] is a coordinating conjunction (FANBOYS): [compound].`
        : `[${conj}] is a subordinating conjunction: [complex].`,
  });
  // complex sentence, dependent clause or independent clause? (Homework page 23)
  const k3 = (q, a, emoji) => ({
    type: "mc",
    q,
    opts: [
      a,
      ...["complex sentence", "dependent clause", "independent clause"].filter(
        (x) => x !== a,
      ),
    ],
    keep: ["complex sentence", "dependent clause", "independent clause"],
    emoji,
  });
  // build a complex sentence from cards (the clauses, the conjunction)
  const build = (t, cards, emoji) => ({
    type: "order",
    t,
    ask: "Put the cards in order to make a complex sentence. " + t,
    hint: "Tap the cards in order, or drag them. Watch the comma!",
    steps: cards.map((say) => ({ say })),
    emoji,
  });

  // the 12 idioms: [idiom, meaning, words picture, meaning picture, example]
  const IDIOMS = [
    [
      "see eye to eye",
      "to agree",
      SC(
        "plain",
        [
          { e: "👁️", x: 26, y: 46, s: 30, dx: 10, a: "go" },
          { e: "👁️", x: 74, y: 46, s: 30, dx: -10, a: "go", f: 1 },
        ],
        "eye to eye",
      ),
      SC(
        "sky",
        [
          { e: "🧒", x: 28, y: 62, s: 30, a: "nod" },
          { e: "👧", x: 72, y: 62, s: 30, a: "nod:0.3" },
          { t: "Yes!", x: 28, y: 20, s: 9, c: "good", a: "pop:0.4" },
          { t: "Yes!", x: 72, y: 20, s: 9, c: "good", a: "pop:0.9" },
          { e: "✅", x: 50, y: 46, s: 18, a: "pop:1.4" },
        ],
        "We agree!",
      ),
      "We are best friends; we should be able to see eye to eye.",
    ],
    [
      "let off steam",
      "to release energy",
      SC(
        "room",
        [
          { e: "🫖", x: 46, y: 62, s: 40 },
          { e: "☁️", x: 64, y: 40, s: 14, dx: 6, a: "puff" },
          { e: "☁️", x: 64, y: 40, s: 14, dx: -4, a: "puff:0.8" },
          { e: "☁️", x: 64, y: 40, s: 14, dx: 10, a: "puff:1.6" },
        ],
        "a kettle letting off steam",
      ),
      SC(
        "grass",
        [
          { e: "🏃", x: 16, y: 66, s: 26, dx: 64, a: "go", f: 1 },
          { e: "⚡", x: 50, y: 26, s: 14, a: "blink" },
          { e: "⚡", x: 80, y: 30, s: 12, a: "blink:0.5" },
        ],
        "run, jump, play!",
      ),
      "At recess, I ran around the track a couple of times just to let off steam.",
    ],
    [
      "cat got your tongue",
      "when you find it hard to say anything",
      SC(
        "room",
        [
          { e: "🐈", x: 30, y: 62, s: 34, dx: 40, a: "go", f: 1 },
          { e: "👅", x: 44, y: 56, s: 16, dx: 40, a: "go" },
        ],
        "a cat runs off with a tongue!",
      ),
      SC(
        "room",
        [
          { e: "😶", x: 34, y: 52, s: 40 },
          { t: "…", x: 70, y: 30, s: 14, a: "blink" },
        ],
        "can't say a word",
      ),
      "Grandma said, “Cat got your tongue?”",
    ],
    [
      "stand up for",
      "to speak or act in support of someone",
      SC(
        "room",
        [
          { e: "🪑", x: 40, y: 66, s: 34 },
          { e: "🧍", x: 44, y: 56, s: 34, dx: 22, dy: -6, a: "go" },
          { e: "⬆️", x: 76, y: 30, s: 14, a: "jump" },
        ],
        "standing up",
      ),
      SC(
        "grass",
        [
          { e: "😠", x: 82, y: 58, s: 26 },
          { e: "🧒", x: 20, y: 66, s: 22 },
          { e: "🧑", x: 30, y: 62, s: 30, dx: 22, a: "go" },
          { t: "Stop! She is my friend.", x: 50, y: 18, s: 7, a: "show" },
          { e: "❤️", x: 12, y: 30, s: 12, a: "pulse" },
        ],
        "I'm on your side!",
      ),
      "I guess standing up for myself did pay off.",
    ],
    [
      "pay off",
      "to be rewarded; to bring a good result",
      SC(
        "plain",
        [
          { e: "🤲", x: 22, y: 56, s: 26 },
          { e: "💵", x: 34, y: 50, s: 22, dx: 34, a: "go" },
          { e: "🪙", x: 74, y: 20, s: 10, dy: 50, a: "fall" },
          { e: "🪙", x: 84, y: 20, s: 10, dy: 50, a: "fall:0.8" },
        ],
        "paying money",
      ),
      SC(
        "room",
        [
          { e: "📚", x: 30, y: 56, s: 34, a: "hide" },
          { e: "🏆", x: 50, y: 52, s: 40, a: "show" },
          { t: "hard work = reward", x: 50, y: 14, s: 7 },
        ],
        "hard work pays off",
      ),
      "If you work hard, there will be a great pay off at the end.",
    ],
    [
      "butterflies in my stomach",
      "to feel nervous and restless",
      SC(
        "plain",
        [
          { e: "🧍", x: 50, y: 52, s: 70 },
          { e: "🦋", x: 46, y: 50, s: 9, a: "wander" },
          { e: "🦋", x: 54, y: 56, s: 8, a: "wander:1" },
          { e: "🦋", x: 50, y: 44, s: 7, a: "wander:2" },
        ],
        "butterflies in the tummy",
      ),
      SC(
        "school",
        [
          { e: "😰", x: 40, y: 64, s: 30, a: "shake" },
          { e: "📝", x: 72, y: 70, s: 20 },
          { e: "💦", x: 56, y: 52, s: 10, a: "blink" },
        ],
        "feeling nervous",
      ),
      "Every time I got on the school bus, I felt sick, and got butterflies in my stomach.",
    ],
    [
      "between a rock and a hard place",
      "facing a hard decision",
      SC(
        "plain",
        [
          { e: "🪨", x: 22, y: 56, s: 40 },
          { e: "🧍", x: 50, y: 56, s: 34, a: "squeeze" },
          { e: "🧱", x: 78, y: 56, s: 40 },
        ],
        "rock | person | wall",
      ),
      SC(
        "grass",
        [
          { t: "A?", x: 22, y: 26, s: 10 },
          { t: "B?", x: 78, y: 26, s: 10 },
          { e: "🧍", x: 50, y: 64, s: 32, a: "nod" },
          { e: "❓", x: 64, y: 40, s: 14, a: "pulse" },
        ],
        "a hard choice",
      ),
      "I felt like I was stuck between a rock and a hard place.",
    ],
    [
      "get off on the wrong foot",
      "to make a bad impression at the start",
      SC(
        "plain",
        [
          { e: "🦶", x: 34, y: 50, s: 34, f: 1 },
          { t: "LEFT", x: 34, y: 76, s: 6 },
          { e: "✅", x: 34, y: 24, s: 12, a: "pop:0.4" },
          { e: "🦶", x: 66, y: 50, s: 34 },
          { t: "RIGHT", x: 66, y: 76, s: 6 },
          { e: "❌", x: 66, y: 50, s: 30, a: "pop:1" },
        ],
        "starting on the wrong foot",
      ),
      SC(
        "room",
        [
          { e: "😮", x: 30, y: 56, s: 30 },
          { t: "Oops!", x: 30, y: 20, s: 8, a: "pop:0.4" },
          { e: "😠", x: 70, y: 56, s: 30 },
          { t: "Hmm…", x: 70, y: 20, s: 8, c: "bad", a: "pop:1" },
        ],
        "a bad first impression",
      ),
      "I didn’t want to get off on the wrong foot or make a bad impression.",
    ],
    [
      "right off the bat",
      "immediately, right away",
      SC(
        "grass",
        [
          { e: "🏏", x: 30, y: 60, s: 34, a: "swing" },
          { e: "⚾", x: 44, y: 56, s: 12, dx: 46, dy: -44, a: "shoot" },
        ],
        "the ball flies off the bat",
      ),
      SC(
        "plain",
        [
          { e: "⏰", x: 34, y: 50, s: 36, a: "shake" },
          { e: "⚡", x: 64, y: 46, s: 26, a: "blink" },
          { t: "NOW!", x: 64, y: 72, s: 9, c: "bad", a: "pop:0.3" },
        ],
        "right away",
      ),
      "Right off the bat, the very first week of school, I was in deep trouble.",
    ],
    [
      "piece of cake",
      "very easy",
      SC(
        "room",
        [
          { e: "🍰", x: 46, y: 54, s: 40, a: "pulse" },
          { e: "🍴", x: 76, y: 50, s: 20, a: "nod" },
        ],
        "a piece of cake",
      ),
      SC(
        "school",
        [
          { t: "1 + 1 = 2", x: 50, y: 37, s: 9, c: "light" },
          { e: "😎", x: 34, y: 72, s: 24 },
          { e: "✅", x: 66, y: 70, s: 22, a: "pop:0.6" },
        ],
        "so easy!",
      ),
      "The test was a piece of cake because the questions were so easy.",
    ],
    [
      "cut it out",
      "to stop doing something",
      SC(
        "plain",
        [
          { e: "📄", x: 50, y: 52, s: 54 },
          { e: "✂️", x: 32, y: 52, s: 22, dx: 34, a: "go" },
        ],
        "cutting it out",
      ),
      SC(
        "room",
        [
          { e: "🗣️", x: 24, y: 60, s: 26, a: "shake hide" },
          { e: "🛑", x: 62, y: 42, s: 36, a: "pulse" },
          { t: "STOP!", x: 62, y: 74, s: 8, c: "bad" },
        ],
        "stop doing that!",
      ),
      "He kept bothering me until I told him to cut it out.",
    ],
    [
      "raining cats and dogs",
      "to rain a lot and very heavily",
      SC(
        "sky",
        [
          { e: "☁️", x: 50, y: 14, s: 36 },
          { e: "🐱", x: 30, y: 18, s: 11, dy: 70, a: "fall" },
          { e: "🐶", x: 52, y: 18, s: 11, dy: 70, a: "fall:0.7" },
          { e: "🐱", x: 72, y: 18, s: 11, dy: 70, a: "fall:1.4" },
        ],
        "cats and dogs falling!",
      ),
      SC(
        "rain",
        [
          { e: "☁️", x: 50, y: 12, s: 36 },
          ...[18, 30, 42, 54, 66, 78].map((x, i) => ({
            e: "💧",
            x,
            y: 22,
            s: 7,
            dy: 60,
            a: `fall:${(i % 3) * 0.4}`,
          })),
          { e: "☂️", x: 70, y: 66, s: 22 },
          { e: "🧒", x: 70, y: 78, s: 12 },
        ],
        "very heavy rain",
      ),
      "We couldn’t play outside, as it was raining cats and dogs.",
    ],
  ];
  const idiomVis = (i) => ({
    kind: "idiom",
    words: IDIOMS[i][2],
    means: IDIOMS[i][3],
  });
  const idiomEx = (q, o, emoji) => ({ type: "mc", q, opts: o, emoji });

  window.LESSON = {
    n: 4,
    key: "en4-u1w4",
    grade: 4,
    title: "Complex Sentences",
    unit: "Unit 1 · Week 4",
    book: "Wonders",
    hub: "index.html",
    imgDir: "img/unit1-week4",
    cover: "cover",
    question: {
      q: "What is a [complex sentence]?",
      a: "An [independent clause] and a [dependent clause] that begins with a [subordinating conjunction], like because, when or after.",
      img: "cover",
    },

    stories: [
      {
        t: "The Talent Show",
        en: "Find the idioms in the story",
        path: "story-talent-show.html",
        cover: { src: "img/talent-show/girls.jpg" },
      },
      {
        t: "Stormy Weather",
        en: "Weeks 3 and 4 · find the idioms",
        path: "story-stormy-weather.html",
        cover: { src: "img/stormy-weather/science-fair.jpg" },
      },
    ].map((s) => ({ ...s, g: "📖 Stories" })),

    decks: [
      {
        k: "idioms",
        g: "🐱 Vocabulary strategy · Idioms",
        t: "12 idioms",
        en: "What the words say · what they really mean",
        cover: { vis: IDIOMS[11][2] },
        cards: IDIOMS.map(([t, m, , , ex], i) => ({
          t,
          lines: [`It really means: [${m}].`, `Example: ${ex}`],
          vis: idiomVis(i),
        })),
      },
      {
        k: "what",
        g: "🐱 Vocabulary strategy · Idioms",
        t: "What is an idiom?",
        en: "Words that mean something else",
        ic: "🤔",
        cover: { vis: IDIOMS[9][2] },
        cards: [
          {
            t: "What is an idiom?",
            lines: [
              "An [idiom] is a group of words with a meaning that is [different] from the meaning of each word.",
              "“A piece of cake” is not really cake. It means [very easy].",
            ],
            vis: idiomVis(9),
          },
          {
            t: "Context clues",
            lines: [
              "Look at the [other words] in the sentence. They help you understand the idiom.",
              "“The test was a piece of cake [because the questions were so easy].”",
            ],
            vis: SC(
              "school",
              [
                { e: "🔍", x: 34, y: 66, s: 30, a: "wander" },
                { t: "so easy!", x: 66, y: 70, s: 9, c: "good", a: "pulse" },
              ],
              "look for clues",
            ),
          },
        ],
      },
      {
        k: "grammar",
        g: "🧩 Grammar · Complex sentences",
        t: "Clauses and complex sentences",
        en: "Independent, dependent, subordinating conjunctions",
        ic: "🧩",
        cover: {
          vis: BL(
            [
              [
                ["When I exercise", "d"],
                [",", "p"],
                ["I walk in the park.", "i"],
              ],
            ],
            { legend: false },
          ),
        },
        cards: [
          {
            t: "Independent clause",
            lines: [
              "An [independent clause] has a subject and a verb.",
              "It can [stand alone] as a sentence: My dad flew on a plane to Texas.",
            ],
            vis: BL([[["My dad flew on a plane to Texas.", "i"]]], {
              title: "can stand alone 💪",
            }),
          },
          {
            t: "Dependent clause",
            lines: [
              "A [dependent clause] usually begins with a [subordinating conjunction].",
              "It [cannot stand alone]: before the sun rose.",
            ],
            vis: BL(
              [
                [
                  ["before", "c"],
                  ["the sun rose", "d"],
                ],
              ],
              {
                title: "cannot stand alone 🤝",
                note: "Before the sun rose … what happened? It is not finished!",
              },
            ),
          },
          {
            t: "Subordinating conjunctions",
            lines: [
              "They begin a dependent clause:",
              "after · although · because · before · when · whenever · while · until · if · as",
            ],
            vis: BL(
              [
                [
                  ["after", "c"],
                  ["although", "c"],
                  ["because", "c"],
                  ["before", "c"],
                  ["when", "c"],
                ],
                [
                  ["whenever", "c"],
                  ["while", "c"],
                  ["until", "c"],
                  ["if", "c"],
                  ["as", "c"],
                ],
              ],
              { title: "subordinating conjunctions", legend: false },
            ),
          },
          {
            t: "A complex sentence",
            lines: [
              "A [complex sentence] = an independent clause + one or more dependent clauses.",
              "I like to walk in the park when I exercise.",
            ],
            vis: BL(
              [
                [
                  ["I like to walk in the park", "i"],
                  ["when", "c"],
                  ["I exercise.", "d"],
                ],
              ],
              {
                title: "complex sentence",
              },
            ),
          },
          {
            t: "Way 1: no comma",
            lines: [
              "Independent clause + subordinating conjunction + dependent clause.",
              "When the independent clause comes first: [no comma].",
              "Sam is very sleepy because he slept late last night.",
            ],
            vis: BL(
              [
                [
                  ["Sam is very sleepy", "i"],
                  ["because", "c"],
                  ["he slept late last night.", "d"],
                ],
              ],
              {
                title: "independent first → no comma",
              },
            ),
          },
          {
            t: "Way 2: a comma",
            lines: [
              "Subordinating conjunction + dependent clause + [comma] + independent clause.",
              "When the dependent clause comes first: use a [comma].",
              "When I exercise, I like to walk in the park.",
            ],
            vis: BL(
              [
                [
                  ["When", "c"],
                  ["I exercise", "d"],
                  [",", "p"],
                  ["I like to walk in the park.", "i"],
                ],
              ],
              {
                title: "dependent first → comma",
              },
            ),
          },
          {
            t: "Compound or complex?",
            lines: [
              "[Compound]: two independent clauses + FANBOYS (and, but, so …).",
              "[Complex]: an independent clause + a dependent clause (because, when, after …).",
            ],
            vis: BL(
              [
                [
                  ["🔗 compound:", "l"],
                  ["Talia slept late", "i"],
                  [",", "p"],
                  ["yet", "c"],
                  ["she was on time.", "i"],
                ],
                [
                  ["🧩 complex:", "l"],
                  ["After Tim ate lunch", "d"],
                  [",", "p"],
                  ["he went to the gym.", "i"],
                ],
              ],
              {},
            ),
          },
        ],
      },
      {
        k: "phonics",
        g: "🔊 Phonics · Long i",
        t: "Long i: 5 spellings",
        en: "i · i_e · ie · igh · y",
        ic: "🪁",
        cover: {
          vis: SC("sky", [
            { e: "🪁", x: 34, y: 40, s: 40, a: "float" },
            { t: "i_e", x: 72, y: 56, s: 16, c: "good" },
          ]),
        },
        cards: [
          [
            "i",
            "mind",
            "🧠",
            "mind · find · kind · climb · minding · item · idea · iron",
          ],
          [
            "i_e",
            "pride",
            "🦁",
            "kite · pride · twice · drive · prime · slice · wipe · file · hive · polite",
          ],
          ["ie", "pie", "🥧", "pie · pies · die · lie · tie · dried"],
          [
            "igh",
            "night",
            "🌙",
            "night · height · slight · sigh · fright · fight · bright",
          ],
          [
            "y",
            "fly",
            "🪰",
            "fly · shy · sly · pry · spy · fry · reply · cycle",
          ],
        ].map(([p, w, e, more]) => ({
          t: `Long i spelled ${p}`,
          lines: [`[${p}] as in [${w}]`, more],
          vis: SC("plain", [
            { e, x: 32, y: 48, s: 42, a: "float" },
            { t: p, x: 72, y: 36, s: 18, c: "good", a: "pop:0.3" },
            { t: w, x: 72, y: 68, s: 12, a: "pop:0.8" },
          ]),
        })),
      },
    ],
    ideas: [],

    games: [
      {
        k: "idmatch",
        g: "🐱 Idioms",
        t: "Idiom pictures",
        en: "Match the picture to the meaning",
        ic: "🔗",
        items: [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
        ].map((g) => ({
          type: "match",
          pairs: g.map((i) => ({ vis: IDIOMS[i][2], label: IDIOMS[i][1] })),
        })),
      },
      {
        k: "idwhich",
        g: "🐱 Idioms",
        t: "Which idiom?",
        en: "Look at what it really means",
        ic: "🤔",
        items: IDIOMS.map(([t], i) => ({
          type: "mc",
          q: "Look at the pictures. Which idiom is it?",
          opts: [t, IDIOMS[(i + 3) % 12][0], IDIOMS[(i + 7) % 12][0]],
          vis: idiomVis(i),
        })),
      },
      {
        k: "isort",
        g: "🔊 Phonics",
        t: "Long i sort",
        en: "i_e · ie · igh · y",
        ic: "🪁",
        items: [
          {
            type: "sort",
            q: "Put each word in the box of its long i spelling.",
            cols: [
              { k: "i_e", t: "i_e", ex: "kite", e: "🪁" },
              { k: "ie", t: "ie", ex: "pie", e: "🥧" },
              { k: "igh", t: "igh", ex: "night", e: "🌙" },
              { k: "y", t: "y", ex: "fly", e: "🪰" },
            ],
            words: [
              { w: "bike", k: "i_e", e: "🚲" },
              { w: "five", k: "i_e", e: "5️⃣" },
              { w: "smile", k: "i_e", e: "😊" },
              { w: "tie", k: "ie", e: "👔" },
              { w: "pie", k: "ie", e: "🥧" },
              { w: "light", k: "igh", e: "💡" },
              { w: "night", k: "igh", e: "🌙" },
              { w: "right", k: "igh", e: "👉" },
              { w: "sky", k: "y", e: "🌤️" },
              { w: "cry", k: "y", e: "😢" },
              { w: "fly", k: "y", e: "🪰" },
            ],
          },
        ],
      },
    ],

    exercises: [
      {
        k: "clause",
        g: "🧩 Grammar · Complex sentences",
        t: "Independent or dependent?",
        en: "Classwork booklet page 15",
        ic: "💪",
        from: "Classwork p. 15",
        items: [
          id("She got a perfect score.", "I", "💯😀"),
          id("Because she was so smart.", "D", "🧠✨", "Because"),
          id("When it was time to go.", "D", "⏰🚪", "When"),
          id("The school bell rang.", "I", "🔔🏫"),
          id("Because of the heat outside.", "D", "☀️🥵", "Because"),
          id("I felt very sleepy.", "I", "😴🛏️"),
          id("The doctor helped.", "I", "🧑‍⚕️🤝"),
          id("Before I could ask.", "D", "🙋❓", "Before"),
          id("When people drive fast.", "D", "🚗💨", "When"),
          id("It can be dangerous.", "I", "⚠️"),
        ],
      },
      {
        k: "kk",
        g: "🧩 Grammar · Complex sentences",
        t: "Complex sentence or clause?",
        en: "Homework booklet page 23",
        ic: "🧩",
        from: "Homework p. 23",
        items: [
          k3("because I want to help other people.", "dependent clause", "🤝"),
          k3(
            "After Taylor brushes her teeth every morning.",
            "dependent clause",
            "🪥🌅",
          ),
          k3(
            "We worked on the project until we were too tired to keep working.",
            "complex sentence",
            "📋😴",
          ),
          k3(
            "My teacher lets us choose our partners to read together.",
            "independent clause",
            "👩‍🏫📖",
          ),
          k3(
            "My family and I will go on vacation when we have summer break.",
            "complex sentence",
            "🏖️☀️",
          ),
          k3(
            "I always look out the window at the farms while we are driving to my grandma’s house.",
            "complex sentence",
            "🚗🌾",
          ),
          k3("As she is a vegetarian,", "dependent clause", "🥗"),
          k3(
            "Shawn finished his homework very quickly and correctly.",
            "independent clause",
            "📚✅",
          ),
        ],
      },
      {
        k: "ccx",
        g: "🧩 Grammar · Complex sentences",
        t: "Compound or complex?",
        en: "Homework booklet page 21",
        ic: "🔗",
        from: "Homework p. 21",
        items: [
          cc(
            "They spoke to Jack in Spanish, but he responded in English.",
            "cd",
            "but",
            "🇪🇸🇬🇧",
          ),
          cc(
            "After Tim ate lunch at The Cheesecake Factory, he went to the gym to exercise.",
            "cx",
            "After",
            "🍰🏋️",
          ),
          cc(
            "Although we have lived there for ten years, we are moving in May.",
            "cx",
            "Although",
            "🏠📦",
          ),
          cc(
            "Talia slept late, yet she made it to school on time.",
            "cd",
            "yet",
            "😴🏫",
          ),
          cc(
            "Carly played outside in the yard until it was too dark to see.",
            "cx",
            "until",
            "🌳🌙",
          ),
          cc(
            "We didn’t go to the park yesterday because it was raining cats and dogs.",
            "cx",
            "because",
            "🌧️🐱🐶",
          ),
          cc(
            "Although Mom drank a lot of coffee, she is getting sleepy.",
            "cx",
            "Although",
            "☕😴",
          ),
          cc(
            "Lia gets scared very easily, but she decided to stay up late and watch a scary movie.",
            "cd",
            "but",
            "😱🎬",
          ),
        ],
      },
      {
        k: "sub",
        g: "🧩 Grammar · Complex sentences",
        t: "Choose the subordinating conjunction",
        en: "Classwork booklet page 19",
        ic: "🧩",
        from: "Classwork p. 19",
        items: [
          cj(
            "You can go to bed ___ you brush your teeth.",
            ["after", "although", "because"],
            "🪥🛏️",
          ),
          cj(
            "I put the pizza in the microwave ___ it was cold.",
            ["because", "before", "while"],
            "🍕🔥",
          ),
          cj(
            "___ entering the room, you have to knock the door.",
            ["Before", "Because", "Although"],
            "🚪✊",
          ),
          cj(
            "___ it was very cold, Ben refused to put on his jacket.",
            ["Although", "Because", "After"],
            "🥶🧥",
          ),
          cj(
            "Luke was watching the television ___ the bell rang.",
            ["when", "although", "because"],
            "📺🔔",
          ),
          cj(
            "The girl was scared ___ she saw a shadow on the wall.",
            ["when", "although", "before"],
            "👧👤",
          ),
          cj(
            "My dad washed the car ___ he arrived home.",
            ["after", "although", "because"],
            "🚗🧽",
          ),
          cj(
            "My brother was drawing ___ my mom was reading a book.",
            ["while", "because", "although"],
            "✏️📖",
          ),
        ],
      },
      {
        k: "buildA",
        g: "🧩 Grammar · Complex sentences",
        t: "Build it: independent clause first",
        en: "Classwork p. 20 · Homework p. 24 (A)",
        ic: "🧱",
        from: "Classwork p. 20 · Homework p. 24",
        items: [
          build(
            "Sam is very sleepy. / He slept late last night. (because)",
            ["Sam is very sleepy", "because", "he slept late last night."],
            "😴🌙",
          ),
          build(
            "Sally arrived early. / The meeting had started. (before)",
            ["Sally arrived early", "before", "the meeting had started."],
            "⏰👩‍💼",
          ),
          build(
            "Lucy listened to music. / She was studying. (while)",
            ["Lucy listened to music", "while", "she was studying."],
            "🎧📚",
          ),
          build(
            "I didn’t want to sleep. / I was very tired. (although)",
            ["I didn’t want to sleep", "although", "I was very tired."],
            "🥱🛏️",
          ),
          build(
            "Linda collects seashells. / She goes to the beach. (whenever)",
            ["Linda collects seashells", "whenever", "she goes to the beach."],
            "🐚🏖️",
          ),
          build(
            "He walked in the park. / He finished his work. (after)",
            ["He walked in the park", "after", "he finished his work."],
            "🌳🚶",
          ),
        ],
      },
      {
        k: "buildB",
        g: "🧩 Grammar · Complex sentences",
        t: "Build it: dependent clause first",
        en: "Classwork p. 20 · Homework p. 24 (B)",
        ic: "🧱",
        from: "Classwork p. 20 · Homework p. 24",
        items: [
          build(
            "I left him a message. / He phoned me. (After)",
            ["After", "I left him a message,", "he phoned me."],
            "📩📞",
          ),
          build(
            "It rains. / Paul wears his blue coat. (Whenever)",
            ["Whenever", "it rains,", "Paul wears his blue coat."],
            "🌧️🧥",
          ),
          build(
            "It was late. / He continued working on his project. (Although)",
            [
              "Although",
              "it was late,",
              "he continued working on his project.",
            ],
            "🌙💻",
          ),
          build(
            "Jenny went to the store. / She had finished her homework. (Before)",
            [
              "Before",
              "Jenny went to the store,",
              "she had finished her homework.",
            ],
            "🛒📚",
          ),
          build(
            "He plays the guitar. / His sister sings. (While)",
            ["While", "he plays the guitar,", "his sister sings."],
            "🎸🎤",
          ),
          build(
            "The cat was slow. / The mouse ran away. (Because)",
            ["Because", "the cat was slow,", "the mouse ran away."],
            "🐈🐭",
          ),
        ],
      },
      {
        k: "comma",
        g: "🧩 Grammar · Complex sentences",
        t: "Comma or no comma?",
        en: "Classwork pages 16 and 17",
        ic: "✏️",
        from: "Classwork pp. 16–17",
        items: [
          {
            type: "mc",
            q: "When I get up in the morning I am hungry.",
            opts: [
              "When I get up in the morning, I am hungry.",
              "No change needed.",
              "When I get up, in the morning I am hungry.",
            ],
            emoji: "🌅🥣",
            x: "The dependent clause comes first, so we need a [comma].",
          },
          {
            type: "mc",
            q: "Before the clock struck twelve Cinderella had to be home.",
            opts: [
              "Before the clock struck twelve, Cinderella had to be home.",
              "No change needed.",
              "Before, the clock struck twelve Cinderella had to be home.",
            ],
            emoji: "🕛👸",
          },
          {
            type: "mc",
            q: "Camille closes her eyes before going underwater.",
            opts: [
              "No change needed.",
              "Camille closes her eyes, before going underwater.",
              "Camille, closes her eyes before going underwater.",
            ],
            emoji: "🏊😌",
            x: "The independent clause comes first: [no comma].",
          },
          {
            type: "mc",
            q: "Ants are amazing because they work together to complete a task.",
            opts: [
              "No change needed.",
              "Ants are amazing, because they work together to complete a task.",
              "Ants are amazing because, they work together to complete a task.",
            ],
            emoji: "🐜🐜",
          },
          {
            type: "mc",
            q: "Because of the wind did the power lines come down.",
            opts: [
              "Because of the wind, the power lines came down.",
              "Because of the wind did, the power lines come down.",
              "No change needed.",
            ],
            emoji: "🌬️⚡",
          },
          {
            type: "mc",
            q: "I was four years old, when my brother was born.",
            opts: [
              "I was four years old when my brother was born.",
              "No change needed.",
              "I was four years old when, my brother was born.",
            ],
            emoji: "👶🎂",
            x: "The independent clause comes first: [no comma].",
          },
          {
            type: "mc",
            q: "She welcomed the people who just moved in?",
            opts: [
              "She welcomed the people who just moved in.",
              "No change needed.",
              "She welcomed, the people who just moved in?",
            ],
            emoji: "🏠👋",
            x: "It is not a question: end with a [period].",
          },
          {
            type: "mc",
            q: "When a year has passed Earth has revolved once around the sun.",
            opts: [
              "When a year has passed, Earth has revolved once around the sun.",
              "No change needed.",
              "When a year, has passed Earth has revolved once around the sun.",
            ],
            emoji: "🌍☀️",
          },
          {
            type: "mc",
            q: "Turn off the timer, that is buzzing in the kitchen.",
            opts: [
              "Turn off the timer that is buzzing in the kitchen.",
              "No change needed.",
              "Turn off, the timer that is buzzing in the kitchen.",
            ],
            emoji: "⏲️🍳",
          },
          {
            type: "mc",
            q: "Before I got my shoes I put on my socks.",
            opts: [
              "Before I got my shoes, I put on my socks.",
              "No change needed.",
              "Before I got, my shoes I put on my socks.",
            ],
            emoji: "🧦👟",
          },
        ],
      },
      {
        k: "test",
        g: "🧩 Grammar · Complex sentences",
        t: "Test: clauses and complex sentences",
        en: "Classwork booklet page 18",
        ic: "📝",
        from: "Classwork p. 18",
        items: [
          {
            type: "mc",
            q: "“Because it was fall, the leaves were falling off the trees.” Which part is an [independent clause]?",
            opts: [
              "the leaves were falling off the trees",
              "Because it was fall",
              "Because it was fall, the leaves",
              "falling off the trees",
            ],
            emoji: "🍂🌳",
          },
          {
            type: "mc",
            q: "“I didn’t know who it was.” Which word is the [subordinating conjunction]?",
            opts: ["who", "didn’t", "know", "was"],
            emoji: "🚪❓",
          },
          {
            type: "mc",
            q: "“I hope they come before the soup gets cold!” Which part is a [dependent clause]?",
            opts: [
              "before the soup gets cold",
              "I hope they come",
              "they come before",
              "the soup gets cold",
            ],
            emoji: "🍲⏰",
          },
          {
            type: "mc",
            q: "“Because it was fall, the leaves were falling off the trees.” Which word is the [subordinating conjunction]?",
            opts: ["Because", "was", "were", "off"],
            emoji: "🍂",
          },
          {
            type: "mc",
            q: "“You should follow me because I go home.” What is the correct way to write this sentence?",
            opts: [
              "You should follow me when I go home.",
              "You should follow me who I go home.",
              "You should follow me, when I go home.",
              "No change needs to be made.",
            ],
            emoji: "🚶🏠",
          },
        ],
      },
      {
        k: "isort1",
        g: "🔊 Phonics · Long i",
        t: "Sort the long i words",
        en: "Classwork booklet page 21",
        ic: "🗂️",
        from: "Classwork p. 21",
        items: [
          {
            type: "sort",
            q: "Read the words. Sort them by their long i spelling.",
            cols: [
              { k: "i", t: "i", ex: "mind", e: "🧠" },
              { k: "ie", t: "ie", ex: "pie", e: "🥧" },
              { k: "igh", t: "igh", ex: "night", e: "🌙" },
              { k: "i_e", t: "i_e", ex: "kite", e: "🪁" },
              { k: "y", t: "y", ex: "fly", e: "🪰" },
            ],
            words: [
              { w: "fry", k: "y", e: "🍳" },
              { w: "surprise", k: "i_e", e: "🎁" },
              { w: "fight", k: "igh", e: "🥊" },
              { w: "lie", k: "ie", e: "🤥" },
              { w: "item", k: "i", e: "📦" },
              { w: "lightening", k: "igh", e: "⚡" },
              { w: "idea", k: "i", e: "💡" },
              { w: "reply", k: "y", e: "💬" },
              { w: "dried", k: "ie", e: "🌾" },
              { w: "hive", k: "i_e", e: "🐝" },
              { w: "iron", k: "i", e: "🧺" },
              { w: "cycle", k: "y", e: "🚲" },
              { w: "tie", k: "ie", e: "👔" },
              { w: "polite", k: "i_e", e: "🙇" },
              { w: "bright", k: "igh", e: "☀️" },
            ],
          },
        ],
      },
      {
        k: "isort2",
        g: "🔊 Phonics · Long i",
        t: "Word sort",
        en: "Homework booklet page 19",
        ic: "🗂️",
        from: "Homework p. 19",
        items: [
          {
            type: "sort",
            q: "Sort the spelling words by their long i spelling.",
            cols: [
              { k: "i_e", t: "i_e", ex: "pride", e: "🦁" },
              { k: "igh", t: "igh", ex: "night", e: "🌙" },
              { k: "y", t: "y", ex: "fly", e: "🪰" },
              { k: "ie", t: "ie", ex: "pie", e: "🥧" },
              { k: "i", t: "i", ex: "mind", e: "🧠" },
            ],
            words: [
              { w: "pride", k: "i_e", e: "🦁" },
              { w: "kite", k: "i_e", e: "🪁" },
              { w: "twice", k: "i_e", e: "2️⃣" },
              { w: "drive", k: "i_e", e: "🚗" },
              { w: "prime", k: "i_e", e: "🔢" },
              { w: "slice", k: "i_e", e: "🍕" },
              { w: "wipe", k: "i_e", e: "🧽" },
              { w: "file", k: "i_e", e: "📁" },
              { w: "height", k: "igh", e: "📏" },
              { w: "slight", k: "igh", e: "🤏" },
              { w: "sigh", k: "igh", e: "😮‍💨" },
              { w: "fright", k: "igh", e: "😱" },
              { w: "shy", k: "y", e: "🙈" },
              { w: "sly", k: "y", e: "🦊" },
              { w: "pry", k: "y", e: "🔧" },
              { w: "spy", k: "y", e: "🕵️" },
              { w: "pies", k: "ie", e: "🥧" },
              { w: "die", k: "ie", e: "🥀" },
              { w: "climb", k: "i", e: "🧗" },
              { w: "minding", k: "i", e: "👀" },
            ],
          },
        ],
      },
      {
        k: "irhyme",
        g: "🔊 Phonics · Long i",
        t: "Rhymes and ABC order",
        en: "Homework booklet page 20",
        ic: "🎵",
        from: "Homework p. 20",
        items: [
          rh("time", ["prime", "thin", "came"], "⏰🔢"),
          rh("bite", ["height", "late", "split"], "🦷📏"),
          rh("tie", ["spy", "fine", "rim"], "👔🕵️"),
          rh("while", ["file", "will", "pail"], "📁"),
          rh("guys", ["pies", "toys", "breeze"], "👦🥧"),
          rh("nice", ["twice", "race", "wise"], "2️⃣"),
          rh("chime", ["climb", "find", "sign"], "🔔🧗"),
          rh("lie", ["sly", "glide", "lay"], "🦊"),
          rh("advice", ["slice", "cries", "voice"], "🍕"),
          rh("might", ["kite", "wait", "big"], "🪁"),
          rh("white", ["fright", "hit", "what"], "⚪😱"),
          rh("bye", ["die", "kind", "bait"], "👋"),
          rh("right", ["slight", "thigh", "grind"], "👉🤏"),
          rh("high", ["shy", "filled", "night"], "⬆️🙈"),
          rh("my", ["sigh", "mine", "rein"], "😮‍💨"),
          {
            type: "order",
            t: "Put the words in ABC order",
            ask: "Put these words in alphabetical order, to the third letter: pry, drive, pride, wipe, minding.",
            hint: "Same first letters? Look at the next letter: pri… before pry.",
            steps: [
              { say: "drive", e: "🚗" },
              { say: "minding", e: "👀" },
              { say: "pride", e: "🦁" },
              { say: "pry", e: "🔧" },
              { say: "wipe", e: "🧽" },
            ],
            emoji: "🔤",
          },
        ],
      },
      {
        k: "ispell",
        g: "🔊 Phonics · Long i",
        t: "Find the spelling mistakes",
        en: "Classwork booklet page 22",
        ic: "✏️",
        from: "Classwork p. 22",
        items: [
          {
            type: "tapw",
            fix: true,
            q: "Tap the [6] words that are spelled wrong.",
            s: "How many stars can you spie at night? The prighm time to see stars is when there is no moon in the sky. This is when it is very dark out. Even a slyce of moon can change what you see in the sky at night.\nPeople leave the city to see the stars. They may clime a hill to get closer to the sky. Or they may driv to the top of a mountain. The hite of the place does not really matter. The darker it is, the more stars you will see.",
            ans: {
              spie: "spy",
              prighm: "prime",
              slyce: "slice",
              clime: "climb",
              driv: "drive",
              hite: "height",
            },
            emoji: "🌌🔭",
            x: "spy · prime · slice · climb · drive · height",
          },
        ],
      },
      {
        k: "idfind",
        g: "🐱 Vocabulary strategy · Idioms",
        t: "Find the idiom",
        en: "Classwork booklet page 23",
        ic: "🔎",
        from: "Classwork p. 23",
        items: [
          {
            type: "mc",
            q: "Every time I got on the school bus, I felt sick, and got butterflies in my stomach. I had recently moved to a new school, and no one on the bus talked to me. Which is the idiom?",
            opts: [
              "butterflies in my stomach",
              "the school bus",
              "a new school",
            ],
            vis: idiomVis(5),
            x: "Context clues: “I felt sick”, “no one on the bus talked to me”: he was [nervous].",
          },
          {
            type: "mc",
            q: "Right off the bat, the very first week of school, I was in deep trouble. Which is the idiom?",
            opts: [
              "right off the bat",
              "the very first week",
              "in deep trouble",
            ],
            vis: idiomVis(8),
            x: "Context clue: “the very first week of school” = [right away].",
          },
          {
            type: "mc",
            q: "I felt like I was stuck between a rock and a hard place. I wanted desperately to tell the truth, but that would mean getting Corey into trouble. Which is the idiom?",
            opts: [
              "between a rock and a hard place",
              "tell the truth",
              "getting Corey into trouble",
            ],
            vis: idiomVis(6),
            x: "Context clue: tell the truth, [but] get Corey into trouble = a [hard decision].",
          },
          {
            type: "mc",
            q: "I didn’t want to get off on the wrong foot or make a bad impression. Which is the idiom?",
            opts: [
              "get off on the wrong foot",
              "didn’t want",
              "a bad impression",
            ],
            vis: idiomVis(7),
            x: "Context clue: “or make a bad impression”.",
          },
          {
            type: "mc",
            q: "The test was a piece of cake because the questions were so easy. What does “a piece of cake” mean?",
            opts: ["very easy", "very hard", "something to eat"],
            vis: idiomVis(9),
          },
          {
            type: "mc",
            q: "He kept bothering me until I told him to cut it out. What does “cut it out” mean?",
            opts: ["to stop doing something", "to use scissors", "to go out"],
            vis: idiomVis(10),
          },
        ],
      },
      {
        k: "idfill",
        g: "🐱 Vocabulary strategy · Idioms",
        t: "Complete with an idiom",
        en: "Classwork booklet page 24",
        ic: "✍️",
        from: "Classwork p. 24",
        items: [
          idiomEx(
            "It’s good that you finally have a team member who ___ with you on most things.",
            ["sees eye to eye", "lets off steam", "pays off"],
            "👫✅",
          ),
          idiomEx(
            "We would often have a party to ___ after the exam.",
            ["let off steam", "stand up for", "cut it out"],
            "🎉🏃",
          ),
          idiomEx(
            "You must ___ what you believe.",
            ["stand up for", "pay off", "see eye to eye"],
            "🙋❤️",
          ),
          idiomEx(
            "If you work hard, there will be a great ___ at the end.",
            ["pay off", "piece of cake", "let off steam"],
            "💪🏆",
          ),
          idiomEx(
            "The shy boy did not want to speak up, so his mates kept asking him, “___?”",
            ["Cat got your tongue", "Cut it out", "Piece of cake"],
            "😶💬",
          ),
          idiomEx(
            "He had ___ while waiting for the results of his exam.",
            [
              "butterflies in his stomach",
              "a piece of cake",
              "raining cats and dogs",
            ],
            "😰📝",
          ),
          idiomEx(
            "I can’t make up my mind whose side I am on; I’m caught ___.",
            [
              "between a rock and a hard place",
              "right off the bat",
              "on the wrong foot",
            ],
            "🪨🧱",
          ),
          idiomEx(
            "The first time I put on ice skates, I fell down ___.",
            [
              "right off the bat",
              "between a rock and a hard place",
              "eye to eye",
            ],
            "⛸️💥",
          ),
          idiomEx(
            "He ___ about his new job when he had a short conversation with his manager.",
            ["got off on the wrong foot", "let off steam", "paid off"],
            "💼😠",
          ),
          idiomEx(
            "They said the exam would be difficult, but it was a ___.",
            ["piece of cake", "cat got your tongue", "pay off"],
            "📝😎",
          ),
          idiomEx(
            "Mom is trying to get some sleep, so please stop fighting and ___.",
            ["cut it out", "see eye to eye", "pay off"],
            "😴🛑",
          ),
          idiomEx(
            "We couldn’t play outside, as it was ___.",
            ["raining cats and dogs", "a piece of cake", "right off the bat"],
            "🌧️🏠",
          ),
        ],
      },
      {
        k: "idmatch",
        g: "🐱 Vocabulary strategy · Idioms",
        t: "Match each idiom to its meaning",
        en: "Homework booklet page 26",
        ic: "🔗",
        from: "Homework p. 26",
        items: [
          [0, 4, 8, 10],
          [1, 3, 6, 9],
          [2, 5, 7, 11],
        ].map((g) => ({
          type: "match",
          pairs: g.map((i) => ({
            vis: { kind: "lines", rows: [IDIOMS[i][0]] },
            label: IDIOMS[i][1],
          })),
        })),
      },
    ],
  };
})();
