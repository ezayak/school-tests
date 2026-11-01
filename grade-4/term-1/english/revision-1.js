// English · Grade 4 · Revision for the final exam of Term 1. Engine: shared/computer-lesson.js (data-subject="English").
// Made from the school's Final exam memo (24 Oct), in its order: compound sentences (Week 3), complex sentences (Week 4),
// the 8 words, long o, argumentative text (graphs & headings, central idea, reread), suffixes -ly -ive -ity, writing (Week 5).
// The page also loads unit1-week3/4/5.js: ref("5:vfill") takes exercise "vfill" of Week 5 (decks and games the same way).
// New exercises use Dollars and Sense and Start Small, Think Big; the summary frame (Homework p. 32) has no key: written from the text.
(function () {
  const D = window.EN_DATA || {};
  // ref("3:sc1", "exercises", g) → a copy of that week's exercise / deck / game, shown in section g of the revision
  const ref = (r, list, g) => {
    const [n, k] = r.split(":");
    return { ...D[n][list].find((x) => x.k === k), k: `w${n}-${k}`, g };
  };
  const G = {
    comp: "🧩 Compound sentences",
    cx: "🧩 Complex sentences",
    words: "🔤 8 words",
    o: "🔊 Long o",
    read: "📖 Argumentative text",
    sfx: "🧱 Suffixes",
    write: "✍️ Writing",
  };
  const DS = (n) => ({ src: `img/dollars-sense/${n}.jpg` });
  const SS = (n) => ({ src: `img/start-small/${n}.jpg` });
  const mc = (q, opts, pic, x) => ({ type: "mc", q, opts, ...pic, x });
  // tap the long o words of a sentence from the texts
  const lo = (s, ans, pic) => ({
    type: "tapw",
    q: `Tap the [${Object.keys(ans).length}] ${Object.keys(ans).length > 1 ? "words" : "word"} with the [long o] sound.`,
    s,
    ans,
    ...pic,
    x: Object.keys(ans)
      .map((w) => `[${w}] → ${ans[w]}`)
      .join(" · "),
  });
  // a suffix: which part is the suffix, and what does the word mean
  const sfx = (sentence, word, base, suffix, meaning, wrong, pic) => [
    mc(
      `${sentence} What is the [suffix] in “${word}”?`,
      [suffix, base, suffix === "-ly" ? "-ive" : "-ly"],
      pic,
      `${word} = ${base} + [${suffix}]`,
    ),
    mc(`What does “${word}” mean?`, [meaning, ...wrong], pic),
  ];
  // the parts of an argument in order: claim, reasons, example, conclusion
  const plan = (t, steps, emoji) => ({
    type: "order",
    t,
    ask: `Put the parts of the argument in order. ${t}`,
    hint: "Claim → reasons → example → conclusion. Tap the cards in order, or drag them.",
    steps: steps.map((say) => ({ say })),
    emoji,
  });

  window.LESSON = {
    n: "r1",
    key: "en4-rev1",
    grade: 4,
    title: "Final Exam Revision",
    unit: "Term 1",
    book: "Wonders",
    hub: "index.html",
    imgDir: "img/dollars-sense",
    cover: "volunteers",
    question: {
      q: "What is on the English [final exam]?",
      a: "[Compound] and [complex] sentences, the [8 words], [long o], an [argumentative text] you have not seen (graphs, headings, central idea), [suffixes] -ly, -ive, -ity, and [writing].",
      img: "volunteers",
    },

    stories: [
      [
        "Dollars and Sense",
        "Shared read · headings and a graph",
        "story-dollars-sense.html",
        "img/dollars-sense/shoes.jpg",
      ],
      [
        "Start Small, Think Big",
        "Leveled reader · a line graph",
        "story-start-small.html",
        "img/start-small/cover.jpg",
      ],
      [
        "A Helping Hand",
        "Classwork booklet · headings and a graph",
        "story-helping-hand.html",
        "img/helping-hand/graph.jpg",
      ],
      [
        "Should Kids Have Homework Every Day?",
        "Homework booklet · argumentative",
        "story-homework.html",
        "img/homework/kids.jpg",
      ],
      [
        "Should Kids Have Pets?",
        "Homework booklet · argumentative",
        "story-pets.html",
        "img/pets/pets.jpg",
      ],
    ].map(([t, en, path, src]) => ({
      t,
      en,
      path,
      cover: { src },
      g: G.read,
    })),

    decks: [
      {
        k: "exam",
        t: "What is on the exam?",
        en: "The school’s list, part by part",
        ic: "📋",
        cover: DS("volunteers"),
        cards: [
          {
            t: "Week 3 · Compound sentences",
            lines: [
              "Two [independent clauses] joined by a [comma + FANBOYS] or a [semicolon].",
            ],
            emoji: "🧩",
          },
          {
            t: "Week 4 · Complex sentences",
            lines: [
              "An [independent clause] + a [dependent clause] that starts with because, when, although …",
            ],
            emoji: "🔗",
          },
          {
            t: "Week 5 · 8 words",
            lines: [
              "innovative · compassionate · enterprise · funds · process · routine · undertaking · exceptional",
              "Read them, know what they mean, and use them in [your own sentences].",
            ],
            emoji: "🔤",
          },
          {
            t: "Week 5 · Long o",
            lines: ["[o] cold · [ow] low · [oa] boat · [oe] toe · [o_e] note"],
            emoji: "⛵",
          },
          {
            t: "Week 5 · Argumentative text",
            lines: [
              "A text you have [not seen] before.",
              "Reread · graphs and headings · central idea and relevant details.",
            ],
            src: "img/dollars-sense/graph.jpg",
          },
          {
            t: "Week 5 · Suffixes",
            lines: ["[-ly] quickly · [-ive] inventive · [-ity] creativity"],
            emoji: "🧱",
          },
          {
            t: "Writing",
            lines: [
              "A topic you have [not seen] before: say what you think, give reasons, and finish with a conclusion.",
            ],
            emoji: "✍️",
          },
        ],
      },
      ref("3:grammar", "decks", G.comp),
      ref("4:grammar", "decks", G.cx),
      ref("5:words", "decks", G.words),
      ref("5:phonics", "decks", G.o),
      ref("5:reading", "decks", G.read),
      ref("5:suffix", "decks", G.sfx),
      {
        k: "write",
        g: G.write,
        t: "How to write an argument",
        en: "Claim, reasons, example, conclusion",
        ic: "✍️",
        cards: [
          {
            t: "1 · The claim",
            lines: [
              "Say what [you think].",
              "“[I think] kids should help in their community.”",
            ],
            emoji: "🙋",
          },
          {
            t: "2 · Reasons",
            lines: [
              "Give [two reasons]. Start with [First], [Also], [Another reason is].",
              "“First, helping makes the community a better place.”",
            ],
            emoji: "✌️",
          },
          {
            t: "3 · An example",
            lines: [
              "Show it with an [example]: [For example] …",
              "“For example, kids can clean a park or collect food.”",
            ],
            emoji: "🌳",
          },
          {
            t: "4 · The other side",
            lines: [
              "You can say what other people think: [On the other hand] …",
              "“On the other hand, some kids are very busy with homework.”",
            ],
            emoji: "⚖️",
          },
          {
            t: "5 · The conclusion",
            lines: [
              "Say your claim again: [To sum up] …",
              "“To sum up, helping others is good for everyone.”",
            ],
            emoji: "🏁",
          },
        ],
      },
    ],
    ideas: [],

    games: [
      ref("3:fanboys", "games", G.comp),
      ref("5:vmatch", "games", G.words),
      ref("5:osort", "games", G.o),
      ref("5:suffix", "games", G.sfx),
    ],

    exercises: [
      // Week 3 · compound sentences
      ref("3:sc1", "exercises", G.comp),
      ref("3:cj1", "exercises", G.comp),
      ref("3:cj2", "exercises", G.comp),
      ref("3:punct", "exercises", G.comp),
      ref("3:test", "exercises", G.comp),
      // Week 4 · complex sentences
      ref("4:clause", "exercises", G.cx),
      ref("4:ccx", "exercises", G.cx),
      ref("4:sub", "exercises", G.cx),
      ref("4:buildB", "exercises", G.cx),
      ref("4:comma", "exercises", G.cx),
      ref("4:test", "exercises", G.cx),
      // Week 5 · the 8 words
      {
        k: "inbook",
        g: G.words,
        t: "The words in the books",
        en: "Dollars and Sense · Start Small, Think Big",
        ic: "📖",
        from: "Dollars and Sense · Start Small, Think Big",
        items: [
          mc(
            "A ___ company knows that making money is not the only way to measure success.",
            ["compassionate", "routine", "process"],
            DS("volunteers"),
          ),
          mc(
            "After starting and running four businesses, Blake Mycoskie wanted a break from his usual ___.",
            ["routine", "funds", "enterprise"],
            DS("shoes"),
          ),
          mc(
            "For this inventive new ___, Mycoskie started the business using his own money.",
            ["undertaking", "routine", "funds"],
            DS("shoes"),
          ),
          mc(
            "Mycoskie immediately set up his ___ one-for-one program.",
            ["innovative", "process", "funds"],
            DS("employees"),
          ),
          mc(
            "In 1990, the company launched a new ___: charity.",
            ["enterprise", "routine", "compassionate"],
            DS("hard-rock"),
          ),
          mc(
            "One way the company raises ___ for charity is by selling a line of T-shirts.",
            ["funds", "process", "routine"],
            DS("hard-rock"),
          ),
          mc(
            "The ___ starts with rock stars designing the art that goes on the shirts.",
            ["process", "funds", "exceptional"],
            DS("hard-rock"),
          ),
          mc(
            "The restaurant in Hollywood, Florida, worked with some ___ students from two Florida high schools.",
            ["exceptional", "funds", "routine"],
            DS("hard-rock"),
          ),
          mc(
            "Amadeo Giannini was a ___ person. He started a business to help others.",
            ["compassionate", "routine", "process"],
            SS("giannini"),
          ),
          mc(
            "The Wallaces raised enough ___ to print 5,000 copies of Reader’s Digest.",
            ["funds", "routine", "process"],
            SS("readers-digest"),
          ),
        ],
      },
      ref("5:vfill", "exercises", G.words),
      ref("5:vmatch", "exercises", G.words),
      ref("5:vuse", "exercises", G.words),
      // Week 5 · long o
      {
        k: "otext",
        g: G.o,
        t: "Long o in the books",
        en: "Homework p. 29: find the long o words",
        ic: "🔎",
        from: "Homework p. 29 · Dollars and Sense · Start Small, Think Big",
        items: [
          lo(
            "A compassionate company knows that making money is not the only way to measure success.",
            { knows: "ow", only: "o" },
            DS("volunteers"),
          ),
          lo(
            "He also visited poor villages where very few of the children had shoes.",
            { also: "o" },
            DS("shoes"),
          ),
          lo(
            "He named it TOMS: Shoes for Tomorrow.",
            { Tomorrow: "ow" },
            DS("shoes"),
          ),
          lo(
            "By 2016, TOMS had donated over 60 million pairs.",
            { donated: "o", over: "o" },
            DS("employees"),
          ),
          lo(
            "I never thought I could do both at the same time.",
            { both: "o" },
            DS("employees"),
          ),
          lo(
            "Then the shirts are sold on the Internet.",
            { sold: "o" },
            DS("hard-rock"),
          ),
          lo(
            "If you own a business, making a profit is a necessity.",
            { own: "ow" },
            DS("graph"),
          ),
          lo(
            "The spiced paper was also natural. It broke down in the trash.",
            { also: "o", broke: "o_e" },
            SS("kavita"),
          ),
          lo(
            "Check your budget each week to see how close you are to your goal.",
            { close: "o_e", goal: "oa" },
            SS("budget"),
          ),
          lo(
            "His most famous dance routine is Revelations.",
            { most: "o" },
            SS("ailey"),
          ),
        ],
      },
      {
        k: "osortb",
        g: G.o,
        t: "Sort the long o words",
        en: "Words from the books",
        ic: "🗂️",
        from: "Dollars and Sense · Start Small, Think Big",
        items: [
          {
            type: "sort",
            q: "Put each word in the box of its long o spelling.",
            cols: [
              { k: "o", t: "o", ex: "cold", e: "🥶" },
              { k: "ow", t: "ow", ex: "low", e: "❄️" },
              { k: "oa", t: "oa", ex: "boat", e: "⛵" },
              { k: "oe", t: "oe", ex: "toe", e: "🦶" },
              { k: "o_e", t: "o_e", ex: "note", e: "🎵" },
            ],
            words: [
              { w: "only", k: "o", e: "☝️" },
              { w: "both", k: "o", e: "✌️" },
              { w: "sold", k: "o", e: "💵" },
              { w: "hotels", k: "o", e: "🏨" },
              { w: "knows", k: "ow", e: "🧠" },
              { w: "own", k: "ow", e: "🏠" },
              { w: "tomorrow", k: "ow", e: "📅" },
              { w: "goal", k: "oa", e: "🥅" },
              { w: "goes", k: "oe", e: "🚶" },
              { w: "broke", k: "o_e", e: "💔" },
              { w: "close", k: "o_e", e: "📏" },
            ],
          },
        ],
      },
      ref("5:osort2", "exercises", G.o),
      ref("5:orhyme", "exercises", G.o),
      ref("5:ofind", "exercises", G.o),
      ref("5:ospell", "exercises", G.o),
      // Week 5 · reading: argumentative text
      {
        k: "genre",
        g: G.read,
        t: "What is an argumentative text?",
        en: "Claim, reasons, facts",
        ic: "⚖️",
        from: "Genre study · argumentative text",
        items: [
          mc(
            "An argumentative text ___",
            [
              "gives the author’s claim and reasons to make you agree",
              "tells a made-up story with characters",
              "tells a story about magic",
            ],
            DS("volunteers"),
          ),
          mc(
            "What is a [claim]?",
            [
              "what the author thinks and wants you to agree with",
              "a small title above a part of the text",
              "the words under a graph",
            ],
            DS("volunteers"),
          ),
          mc(
            "“Helping others is good business!” What is this sentence?",
            ["the author’s claim", "a heading", "a caption"],
            DS("graph"),
          ),
          mc(
            "Which one is a [fact], not an opinion?",
            [
              "By 2016, TOMS had donated over 60 million pairs.",
              "Helping others is good business!",
              "Good business is not always about the bottom line.",
            ],
            DS("employees"),
            "A fact can be checked: a number of pairs. An opinion is what someone thinks.",
          ),
          mc(
            "Which reason supports the claim “Kids should have pets”?",
            [
              "Pets teach kids responsibility.",
              "Pets can be expensive.",
              "Some kids lose interest in their pets.",
            ],
            { src: "img/pets/pets.jpg" },
          ),
          mc(
            "Which words show [the other side] of the argument?",
            ["On the other hand", "For example", "Additionally"],
            { src: "img/homework/kids.jpg" },
          ),
          mc(
            "Which words start the [conclusion]?",
            ["To sum up", "For example", "Some people believe"],
            { src: "img/homework/kids.jpg" },
          ),
          mc(
            "Why do authors use [headings] and [graphs]?",
            [
              "to give readers a quick overview of information",
              "to make the text longer",
              "to tell a funny story",
            ],
            DS("graph"),
            "Readers to Writers, Companion page 71.",
          ),
        ],
      },
      {
        k: "features",
        g: G.read,
        t: "Graphs and headings",
        en: "Read the graph, find the heading",
        ic: "📊",
        from: "Companion pp. 67 and 71 · Start Small, Think Big",
        items: [
          mc(
            "Look at the graph. Which charity got the second most donations in 2016?",
            [
              "Task Force for Global Health",
              "Feeding America",
              "United Way Worldwide",
            ],
            DS("graph"),
          ),
          mc(
            "How much money did Feeding America raise?",
            ["$2,150,000,000", "$1,904,000,000", "$3,708,000,000"],
            DS("graph"),
          ),
          mc(
            "What does the [caption] under the graph tell you?",
            [
              "the American charities that got the most donations in 2016",
              "who wrote the text",
              "how TOMS makes shoes",
            ],
            DS("graph"),
          ),
          mc(
            "Which [heading] tells about TOMS shoes?",
            ["Hearts and Soles", "Giving Back Rocks!", "The Bottom Line"],
            DS("shoes"),
          ),
          mc(
            "Under which [heading] do you read about Hard Rock Cafe?",
            ["Giving Back Rocks!", "Hearts and Soles", "The Bottom Line"],
            DS("hard-rock"),
          ),
          mc(
            "What does this [line graph] show?",
            [
              "how many copies of Reader’s Digest were sold each year",
              "how much money the Wallaces gave away",
              "how many banks Giannini opened",
            ],
            SS("graph"),
          ),
          mc(
            "Look at the graph of A Helping Hand. Who gave the most donations?",
            ["individuals", "corporations", "foundations"],
            { src: "img/helping-hand/graph.jpg" },
          ),
          mc(
            "A [heading] tells you ___",
            [
              "what the section is mostly about",
              "numbers as a picture",
              "the end of the story",
            ],
            DS("hard-rock"),
          ),
        ],
      },
      {
        k: "central",
        g: G.read,
        t: "Central idea and relevant details",
        en: "What is it mostly about?",
        ic: "🎯",
        from: "Companion p. 73 · the booklet texts",
        items: [
          mc(
            "What is “Dollars and Sense” mostly about?",
            [
              "businesses that are successful in helping others",
              "how to make shoes",
              "rock music",
            ],
            DS("volunteers"),
          ),
          mc(
            "Central idea: Blake wanted to help children without shoes. Which is a [relevant detail]?",
            [
              "For every pair of shoes he sells, he gives one pair away.",
              "He learned to sail and to dance.",
              "Argentina is in South America.",
            ],
            DS("shoes"),
          ),
          mc(
            "Central idea: Hard Rock Cafe gives back to the community. Which detail does [not] support it?",
            [
              "The company runs restaurants and hotels.",
              "It sells T-shirts and gives part of the money to charity.",
              "Employees are encouraged to raise money for their community.",
            ],
            DS("hard-rock"),
          ),
          mc(
            "What is the central idea of Chapter 3 of Start Small, Think Big?",
            [
              "Giannini started a bank to help ordinary people.",
              "San Francisco had an earthquake.",
              "The Golden Gate Bridge is in San Francisco.",
            ],
            SS("giannini"),
          ),
          mc(
            "What is the central idea of “Should Kids Have Pets?”",
            [
              "Pets bring joy and teach lessons, but they need a lot of time, money, and responsibility.",
              "Dogs need to be walked.",
              "Hamsters are small.",
            ],
            { src: "img/pets/pets.jpg" },
          ),
          mc(
            "Central idea: we should all help our community. Which is a relevant detail?",
            [
              "You can collect food for a food bank.",
              "Parks have trees.",
              "Activity books have pages.",
            ],
            { src: "img/helping-hand/graph.jpg" },
          ),
        ],
      },
      {
        k: "reread",
        g: G.read,
        t: "Reread",
        en: "Read it again, then answer",
        ic: "🔁",
        from: "Companion p. 70 · Start Small, Think Big",
        items: [
          mc(
            "You don’t understand a part of the text. What do you do?",
            [
              "Reread it slowly and look for the words that help you.",
              "Skip to the end.",
              "Close the book.",
            ],
            DS("volunteers"),
          ),
          mc(
            "Reread: “The company has expanded to sell eyeglasses. In a similar program, one pair of eyeglasses is donated for every pair that is bought.” What does TOMS do with eyeglasses?",
            [
              "It gives one pair away for every pair that is bought.",
              "It sells eyeglasses only to rich people.",
              "It stopped selling eyeglasses.",
            ],
            DS("employees"),
          ),
          mc(
            "Reread: “Employees at Hard Rock Cafe locations are encouraged to raise money for their community. Every store does it differently.” What do the employees do?",
            [
              "They raise money for their community.",
              "They design T-shirts.",
              "They give away shoes.",
            ],
            DS("hard-rock"),
          ),
          mc(
            "Reread: “Giannini set up his bank out on the street. He loaned businesses money so they could rebuild after the quake.” Why did he loan money?",
            [
              "so businesses could rebuild after the earthquake",
              "so people could buy magazines",
              "so he could build a new bank",
            ],
            SS("earthquake"),
          ),
          mc(
            "Reread: “She invented the Smart Lid to keep chemicals safe. The lid has an alarm.” Why did Kavita invent the Smart Lid?",
            [
              "to keep chemicals safe",
              "to keep food fresh",
              "to open bottles faster",
            ],
            SS("kavita"),
          ),
          {
            type: "open",
            q: "Reread page 66 of “Dollars and Sense”. What is another example of a company giving back to the community?",
            a: "Hard Rock Cafe is another example of a company giving back to the community.",
            ...DS("hard-rock"),
          },
        ],
      },
      // Week 5 · suffixes
      {
        k: "sfxb",
        g: G.sfx,
        t: "Suffixes in the books",
        en: "-ly · -ive · -ity",
        ic: "🧱",
        from: "Dollars and Sense · Start Small, Think Big · the booklet texts",
        items: [
          ...sfx(
            "For this inventive new undertaking, Mycoskie started the business.",
            "inventive",
            "invent",
            "-ive",
            "good at making new things",
            ["not new at all", "very old"],
            DS("shoes"),
          ),
          ...sfx(
            "Mycoskie immediately set up his innovative program.",
            "immediately",
            "immediate",
            "-ly",
            "right away",
            ["after a long time", "never"],
            DS("employees"),
          ),
          ...sfx(
            "Every store does it differently.",
            "differently",
            "different",
            "-ly",
            "in a different way",
            ["in the same way", "very fast"],
            DS("hard-rock"),
          ),
          ...sfx(
            "There is also something you can do with your creativity.",
            "creativity",
            "creative",
            "-ity",
            "being able to make new things",
            ["being very tired", "being very fast"],
            { src: "img/helping-hand/graph.jpg" },
          ),
          ...sfx(
            "Homework also teaches responsibility.",
            "responsibility",
            "responsible",
            "-ity",
            "being in charge of a job and doing it well",
            ["having fun", "being lonely"],
            { src: "img/homework/kids.jpg" },
          ),
          ...sfx(
            "We should all be active and make a difference.",
            "active",
            "act",
            "-ive",
            "busy doing things",
            ["sleeping all day", "sad and alone"],
            { src: "img/helping-hand/graph.jpg" },
          ),
        ],
      },
      ref("5:sfx1", "exercises", G.sfx),
      ref("5:sfx2", "exercises", G.sfx),
      // writing
      {
        k: "frame",
        g: G.write,
        t: "Summary of Dollars and Sense",
        en: "Homework p. 32 · writing frame",
        ic: "📝",
        from: "Homework p. 32 · Shared Read Writing Frame",
        keep: true,
        items: [
          mc(
            "This selection is [mostly about] businesses that are successful in helping others. Many large companies are trying to help people ___.",
            ["in need", "at school", "in hotels"],
            DS("volunteers"),
          ),
          mc(
            "[For example], Blake Mycoskie started a ___ company called TOMS.",
            ["shoe", "T-shirt", "bank"],
            DS("shoes"),
          ),
          mc(
            "For every pair of shoes TOMS sells, it gives away ___ to a kid in need.",
            ["one pair of shoes", "ten pairs of shoes", "one T-shirt"],
            DS("shoes"),
          ),
          mc(
            "TOMS now sells and gives away ___, too.",
            ["eyeglasses", "T-shirts", "magazines"],
            DS("employees"),
          ),
          mc(
            "[Another example] of a company helping others is the Hard Rock Cafe. It raises ___ and gives it to charity.",
            ["money", "shoes", "eyeglasses"],
            DS("hard-rock"),
          ),
          mc(
            "Hard Rock Cafe raises money by ___.",
            [
              "selling a line of T-shirts",
              "selling shoes",
              "selling magazines",
            ],
            DS("hard-rock"),
          ),
          mc(
            "People who work at the company are encouraged to raise money for their ___.",
            ["community", "shoes", "hotels"],
            DS("hard-rock"),
          ),
          mc(
            "Many companies are thinking of ___ to help people in need.",
            ["innovative ways", "exceptional students", "a usual routine"],
            DS("volunteers"),
          ),
          mc(
            "These businesses think that helping others is ___.",
            ["good business", "too expensive", "not important"],
            DS("graph"),
          ),
          mc(
            "The top five biggest American charities that got the most donations recently are United Way Worldwide, Task Force for Global Health, Feeding America, The Salvation Army, and ___.",
            ["YMCA of the USA", "Hard Rock Cafe", "TOMS"],
            DS("graph"),
          ),
        ],
      },
      {
        k: "plan",
        g: G.write,
        t: "Put the argument in order",
        en: "Claim → reasons → example → conclusion",
        ic: "🔢",
        from: "Writing · argumentative paragraph",
        items: [
          plan(
            "Should kids help in their community?",
            [
              "I think kids should help in their community.",
              "First, helping makes the community a better place.",
              "Also, kids learn teamwork and meet new people.",
              "For example, they can clean a park or collect food.",
              "To sum up, helping others is good for everyone.",
            ],
            "🤝🌳",
          ),
          plan(
            "Should businesses help others?",
            [
              "I think every business should help others.",
              "First, it helps people in need.",
              "Also, people like to buy from a company that helps.",
              "For example, TOMS gives one pair of shoes for every pair it sells.",
              "To sum up, helping others is good business.",
            ],
            "👟❤️",
          ),
          plan(
            "Should kids save money?",
            [
              "I think kids should save some of their money.",
              "First, they can buy something big, like a bike.",
              "Also, they can give some money to help others.",
              "For example, a budget can show $2 for charity every week.",
              "To sum up, saving money is a smart idea.",
            ],
            "🐷🚲",
          ),
        ],
      },
      {
        k: "own",
        g: G.write,
        t: "Write your own argument",
        en: "Say it, then write it in your notebook",
        ic: "✍️",
        from: "Writing · a topic you have not seen",
        items: [
          [
            "Should kids have pets?",
            "I think kids should have pets. First, pets teach kids responsibility, because they have to feed and clean them. Also, pets are good friends, so kids feel less lonely. On the other hand, pets cost money. To sum up, a pet is a good idea if the family can take care of it.",
            { src: "img/pets/pets.jpg" },
          ],
          [
            "Should kids have homework every day?",
            "I think kids should have a little homework every day. First, it helps them practice what they learned. Also, it teaches responsibility. On the other hand, kids need time to play and rest. To sum up, a little homework is good, but not too much.",
            { src: "img/homework/kids.jpg" },
          ],
          [
            "Should every business help others?",
            "I think every business should help others. First, there are many people in need. Also, a compassionate company makes people happy to buy from it. For example, Hard Rock Cafe sells T-shirts and gives money to charity. To sum up, helping others is good business.",
            DS("hard-rock"),
          ],
          [
            "Should kids start their own small business?",
            "I think kids can start a small business. First, they learn how to plan and save money. Also, they can use some of the money to help others. For example, Kavita Shukla started a business when she was 13. To sum up, kids can start small and think big.",
            SS("kavita"),
          ],
        ].map(([t, a, pic]) => ({
          type: "open",
          q: `${t} Write what you think, two reasons, and a conclusion.`,
          a,
          ...pic,
        })),
      },
      ref("5:internet", "exercises", G.write),
    ],
  };
})();
