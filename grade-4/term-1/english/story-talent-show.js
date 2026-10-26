// The Talent Show (Wonders Reading/Writing Companion, Unit 1 Text Set 2, Shared Read, pages 38–41). Engine: shared/story.js.
// Questions: the book's Find Text Evidence, Make Predictions and Plot pages with the school's model answers.
window.STORY = {
  key: "en4-talent-show",
  title: "The Talent Show",
  kind: "Realistic fiction · Shared read",
  cover: "img/talent-show/girls.jpg",
  lesson: { path: "unit1-week3.html", label: "Unit 1 · Week 3" },
  question: "How do your actions affect others?",
  gloss: {
    juggling: "throwing and catching some balls again and again",
    juggle: "to throw and catch some balls again and again",
    bulletin: "a bulletin board = a board on the wall for notices",
    grip: "how tightly you hold something",
    grinned: "smiled a big smile",
    individuals: "single people, one person alone",
    uncomfortably: "in a way that does not feel good or easy",
    hesitated: "waited a moment, because she was not sure",
    interrupted: "started talking while someone else was talking",
    eye: "see eye to eye = agree",
    resentful: "a little angry, because something is not fair",
    desperately: "very, very much",
    inspiration: "something that gives you a great new idea",
    routine: "a dance routine = a dance with steps you practise",
    costumes: "special clothes for a show",
    considered: "thought about it",
    humiliated: "felt very ashamed and silly in front of others",
    recess: "the break time at school, when children play",
    steam: "let off steam = run and play to use up your energy",
    tongue: "“Cat got your tongue?” = Why are you so quiet?",
    respectful: "showing that you think someone is important",
    accountable: "it is your job, so you must answer for it",
    advise: "to tell someone what you think they should do",
    "self-esteem": "feeling good about yourself",
    curt: "she answered with very few words, not friendly",
    standing: "standing up for myself = saying what I want",
    pay: "pay off = bring a good result",
  },
  pages: [
    {
      img: "img/talent-show/girls.jpg",
      text: [
        "“Tina, there’s a school talent show in three weeks,” I shouted to my best friend. My older brother had been teaching me juggling, and I knew he’d help me with my act for the show.",
        "Tina ran over to the bulletin board and read the poster. “Maura, what’s our act going to be?” Tina asked me.",
        "“Our act?” I said, taking a tighter grip on my books.",
        "Tina grinned, pointed to the poster, and said, “It says acts can be individuals, partners, or small groups.”",
      ],
      easy: "Maura tells her friend Tina about the talent show. Maura wants to juggle. Tina wants them to do an act together.",
    },
    {
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "👧🏽", x: 30, y: 62, s: 30 },
          { e: "📚", x: 40, y: 74, s: 14, a: "squeeze" },
          { e: "👧", x: 68, y: 62, s: 30, a: "nod" },
          { t: "Let’s talk at lunch!", x: 66, y: 28, s: 7 },
          { t: "I’ve got an idea…", x: 28, y: 30, s: 6, a: "pop:0.8" },
        ],
        cap: "Tina interrupts Maura.",
      },
      text: [
        "My grip on my books became uncomfortably tight. “You want to do an act together?”",
        "“It’ll be fun,” Tina said.",
        "I hesitated for a second before continuing. “I’ve got an idea and…”",
        "Tina interrupted me. “Yeah, me too; let’s talk at lunch.”",
      ],
      easy: "Maura does not feel good. She starts to tell her idea, but Tina stops her.",
    },
    {
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { t: "2 + 3 = ?", x: 50, y: 37, s: 9, c: "light" },
          { e: "👧🏽", x: 35, y: 70, s: 32 },
          { e: "💭", x: 62, y: 66, s: 22, a: "pop:0.4" },
          { e: "🤹", x: 62, y: 64, s: 10, a: "pop:0.9 float:1.5" },
          { e: "🏆", x: 82, y: 76, s: 14, a: "pulse" },
        ],
        cap: "Maura wants her own act.",
      },
      text: [
        "During math, I tried to think of how I would tell Tina that I wanted to do my own act. After all, we are best friends; we should be able to see eye to eye about this. The problem is Tina always takes charge, I don’t speak up, and then I end up feeling resentful about the whole situation.",
        "I desperately wanted to win, but it was more than that. I wanted to win on my own—with an act that was all mine.",
      ],
      easy: "This is the problem: Tina always decides, and Maura does not speak up. Maura wants an act that is all hers.",
    },
    {
      img: "img/talent-show/tina.jpg",
      text: [
        "At lunch, Tina started talking as soon as we sat down. “I have it all planned out. My inspiration came from that new TV show, *You’ve Got Talent*. We can sing along to a song and do a dance routine, and my mother can make us costumes.”",
        "“Yeah, that’s good,” I said. “But I had another idea.” I told her about my juggling act.",
        "Tina considered it. “Nah, I don’t think I can learn to juggle in three weeks and I’d probably drop the balls,” she said. “We don’t want to be humiliated, right?”",
      ],
      easy: "Tina wants to sing and dance. Maura tells her about juggling. Tina does not like the juggling idea.",
    },
    {
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🏃‍♀️", x: 14, y: 70, s: 24, dx: 34, a: "go", f: 1 },
          { e: "💨", x: 6, y: 74, s: 12, dx: 34, a: "go blink" },
          { e: "🚗", x: 76, y: 74, s: 30 },
          { e: "👵", x: 72, y: 66, s: 13 },
          { t: "Cat got your tongue?", x: 66, y: 30, s: 7, a: "pop:1.2" },
        ],
        cap: "Maura runs. Then Grandma picks her up.",
      },
      text: [
        "At recess, I ran around the track a couple of times just to let off steam.",
        "When my grandmother picked me up after school, she drove a few minutes and finally said, “Cat got your tongue?”",
        "I explained about the talent show as she listened carefully. “So, Tina is not being respectful of your ideas, but it sounds as if you aren’t either.”",
        "“What?” I shouted. “I told Tina her idea was good.”",
        "“No,” said my grandmother, “I said that you weren’t respectful of your own ideas, or you would have spoken up. I understand that you’re friends, but you’re still accountable for your own actions.”",
      ],
      easy: "Maura runs to feel better. Grandma says: Maura did not respect her own idea, because she did not speak up.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👵", x: 28, y: 58, s: 34 },
          { t: "Tell the truth!", x: 36, y: 18, s: 8, a: "pop:0.3" },
          { e: "👧🏽", x: 72, y: 60, s: 32, a: "nod" },
          { e: "⭐", x: 86, y: 26, s: 12, a: "pop:1.2 pulse:1.8" },
        ],
        cap: "Grandma gives good advice.",
      },
      text: [
        "I thought about this. “So what should I do?” I asked.",
        "“I advise you to tell the truth,” she said. “It wouldn’t hurt to let Tina know what you want. Besides,” my grandmother added, “it will be good for your self-esteem!”",
      ],
      easy: "Grandma says: tell Tina the truth. It will help you feel good about yourself.",
    },
    {
      img: "img/talent-show/maura.jpg",
      text: [
        "When we got home, I took 12 deep breaths, called Tina, and told her that I was going to do my juggling act. She was curt on the phone, and I spent all night worrying she would be mad at me.",
        "The next day, she described her act and her costume. But the biggest surprise came at recess, when we played a game that I chose, not Tina.",
        "I guess standing up for myself did pay off.",
      ],
      easy: "Maura calls Tina and tells the truth. The next day Tina lets Maura choose the game. Speaking up was good!",
    },
  ],
  summary: [
    {
      t: "Characters",
      img: "img/talent-show/girls.jpg",
      text: "Maura tells the story. Tina is her best friend. Maura’s grandmother helps her.",
    },
    {
      t: "Setting",
      vis: {
        kind: "scene",
        bg: "stage",
        items: [
          { e: "🎤", x: 50, y: 50, s: 34, a: "pulse" },
          { e: "⭐", x: 30, y: 30, s: 14, a: "blink" },
        ],
      },
      text: "At school and at home. There will be a school talent show in three weeks.",
    },
    {
      t: "Problem",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "👧🏽", x: 34, y: 62, s: 30 },
          { e: "😣", x: 34, y: 24, s: 14, a: "shake" },
          { e: "👧", x: 68, y: 62, s: 30 },
        ],
      },
      text: "Maura does not want to do an act with Tina, but she is afraid to tell her.",
    },
    {
      t: "Events",
      img: "img/talent-show/tina.jpg",
      text: "Maura tells Tina about her juggling act. Tina does not like the idea. Maura tells her grandmother why she is upset. Grandma advises her to tell Tina the truth.",
    },
    {
      t: "Solution",
      img: "img/talent-show/maura.jpg",
      text: "Maura calls Tina and tells her that she wants to do her act alone. The next day Tina lets Maura choose a game.",
    },
    {
      t: "Message",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🙋‍♀️", x: 40, y: 56, s: 36, a: "jump" },
          { e: "💪", x: 70, y: 46, s: 22, a: "pulse" },
        ],
      },
      text: "Stand up for yourself. Tell your friends how you really feel. Standing up for herself paid off for Maura.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/talent-show/girls.jpg",
      q: "What kind of story is “The Talent Show”?",
      o: ["realistic fiction", "fantasy", "argumentative text"],
      x: "The characters say and do things real people might say and do. All the events could really happen.",
    },
    {
      tag: "Plot",
      type: "open",
      img: "img/talent-show/girls.jpg",
      q: "Which words show that Tina likes to take charge? Why is this important to the story?",
      a: "“Maura, what’s our act going to be?” and “Yeah, me too; let’s talk at lunch.” It shows what kind of person Tina is and why Maura hesitates to tell her idea.",
    },
    {
      tag: "Plot: Conflict",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "👧🏽", x: 34, y: 62, s: 30 },
          { e: "😣", x: 34, y: 24, s: 14, a: "shake" },
          { e: "👧", x: 68, y: 62, s: 30 },
        ],
      },
      q: "What is Maura’s problem?",
      o: [
        "Tina always takes charge, and Maura doesn’t speak up.",
        "Maura cannot juggle.",
        "Maura does not want to be in the talent show.",
      ],
      x: "The problem is Tina always takes charge, Maura doesn’t speak up, and then she ends up feeling resentful.",
    },
    {
      tag: "Plot: Conflict",
      type: "open",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "👧🏽", x: 40, y: 60, s: 34 },
          { e: "🤐", x: 66, y: 34, s: 20, a: "pulse" },
        ],
      },
      q: "What can you tell about Maura?",
      a: "Maura is not good at saying what she wants.",
    },
    {
      tag: "Idioms",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🏃‍♀️", x: 16, y: 70, s: 26, dx: 60, a: "go", f: 1 },
          { e: "💨", x: 8, y: 74, s: 12, dx: 60, a: "go blink" },
        ],
      },
      q: "“At recess, I ran around the track a couple of times just to let off steam.” What does “let off steam” mean?",
      o: [
        "to release energy and feel better",
        "to cook some food",
        "to make a train go",
      ],
      x: "The words “I ran around the track a couple of times” help you understand it.",
    },
    {
      tag: "Idioms",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👵", x: 30, y: 58, s: 34 },
          { e: "👧🏽", x: 70, y: 60, s: 32 },
          { t: "…", x: 72, y: 26, s: 10 },
        ],
      },
      q: "Grandma says, “Cat got your tongue?” Why does she say it?",
      o: ["Maura is very quiet.", "Maura has a cat.", "Maura is eating."],
    },
    {
      tag: "Make predictions",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👵", x: 28, y: 58, s: 34 },
          { t: "Tell the truth!", x: 36, y: 18, s: 8 },
          { e: "👧🏽", x: 72, y: 60, s: 32 },
        ],
      },
      q: "What does Grandma say to help Maura speak up? What do you predict will happen next?",
      a: "Grandma says, “I advise you to tell the truth. It will be good for your self-esteem!” I think Maura will speak up for herself now.",
    },
    {
      tag: "Plot: Conflict",
      type: "open",
      img: "img/talent-show/maura.jpg",
      q: "What does Maura’s grandmother want her to do?",
      a: "She wants Maura to tell Tina the truth about her talent show act.",
    },
    {
      tag: "Synthesize",
      type: "open",
      img: "img/talent-show/maura.jpg",
      q: "How do Maura’s actions affect Tina by the end of the story?",
      a: "Instead of taking charge of what games they play, Tina plays a game that Maura chooses. Tina seems to be paying more attention to what Maura wants.",
    },
    {
      tag: "Resolution",
      img: "img/talent-show/maura.jpg",
      q: "How is the problem solved?",
      o: [
        "Maura calls Tina and tells her she will do her juggling act.",
        "Tina learns to juggle.",
        "Grandma calls Tina.",
      ],
      x: "Maura is worried Tina will be mad, but she calls her anyway. The next day Tina lets Maura choose a game.",
    },
    {
      tag: "Plot",
      type: "open",
      img: "img/talent-show/tina.jpg",
      q: "Choose an event. How does it help the plot?",
      a: "Maura tells her grandmother about her problem with Tina and the talent show. This helps the plot because when her grandmother finds out about the problem, she helps Maura to solve it.",
    },
    {
      tag: "Make predictions",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "👧🏽", x: 30, y: 60, s: 30 },
          { e: "👫", x: 72, y: 62, s: 30 },
          { t: "I feel…", x: 34, y: 20, s: 8, a: "pop:0.4" },
        ],
      },
      q: "How do you think Maura will solve a problem with her friends in the future?",
      a: "I think in the future Maura will tell her friends how she really feels.",
    },
  ],
};
