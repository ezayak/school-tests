// An Honestly Fun Camp (Homework Booklet Term 1, pages 11–13, Unit 1 Week 3, realistic fiction). Engine: shared/story.js.
// Questions 1–5 with the school's model answers (Homework Booklet pages 12–13 model answer); the others are extra.
window.STORY = {
  key: "en4-honest-camp",
  title: "An Honestly Fun Camp",
  kind: "Realistic fiction · Homework booklet",
  cover: "img/honest-camp/boy.jpg",
  lesson: { path: "unit1-week3.html", label: "Unit 1 · Week 3" },
  question: "How do your actions affect others?",
  gloss: {
    disappoint: "to make someone sad because things are not as they hoped",
    disappointing: "making someone sad because things are not as they hoped",
    lousy: "very bad",
    canoeing: "going on the water in a canoe, a small long boat",
    canoe: "a small long boat you move with a paddle",
    responded: "answered",
    honest: "telling the truth",
    honesty: "telling the truth",
    counselors: "the grown-ups who take care of the children at camp",
    counselor: "a grown-up who takes care of the children at camp",
    comfortable: "feeling good and easy",
    assigned: "given to him",
    horseback: "on a horse",
    base: "first base = one of the places a player must run to in baseball",
    catcher: "the baseball player who catches the ball behind the batter",
    switched: "changed",
    bow: "the front of a boat",
    stern: "the back of a boat",
    paddler: "a person who moves a canoe with a paddle",
    steering: "making it go left or right",
    imagined: "pictured it in his mind",
    extra: "more",
  },
  pages: [
    {
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "⛺", x: 26, y: 58, s: 34 },
          { e: "🧒", x: 60, y: 66, s: 30 },
          { e: "😕", x: 60, y: 30, s: 14, a: "shake" },
          { e: "📅", x: 84, y: 22, s: 16 },
          { t: "August", x: 84, y: 40, s: 5 },
        ],
        cap: "Will at summer camp",
      },
      text: [
        "Will couldn’t wait for September when school would start. It was early August, and he was at the same summer camp he had been going to for the last five years. His dad went to the camp when he was a boy and loved it, so Will didn’t want to disappoint his dad by telling him that he didn’t even like it.",
      ],
      easy: "Will is at summer camp. He does not like it. His dad loved this camp, so Will does not tell him.",
    },
    {
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🐴", x: 18, y: 60, s: 22, a: "nod" },
          { e: "⚾", x: 40, y: 60, s: 16, a: "jump" },
          { e: "🛶", x: 62, y: 66, s: 22, a: "float" },
          { e: "🍲", x: 84, y: 62, s: 18 },
          { e: "🤢", x: 84, y: 30, s: 14, a: "shake" },
        ],
        cap: "enough of everything!",
      },
      text: [
        "By the middle of August, Will had had more than enough. He had had enough of the horses, enough of the baseball games, enough of the canoeing and enough of the lousy camp food.",
      ],
      easy: "Will is tired of the horses, the baseball, the canoe and the bad food.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "✉️", x: 24, y: 48, s: 26, dx: 46, a: "go" },
          { e: "👩", x: 80, y: 58, s: 32 },
          { t: "I am always honest.", x: 60, y: 18, s: 7, a: "show" },
        ],
        cap: "Will writes to his mom.",
      },
      text: [
        "He wrote to his mom and asked her if she would pick him up early, but he didn’t want his mom to tell his dad. She responded in a letter which said, “I can’t do that. I am always honest with your dad. If you really want to leave, I will talk to him about it.”",
      ],
      easy: "Will asks his mom to take him home, but not to tell his dad. Mom says: I always tell Dad the truth.",
    },
    {
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "⛺", x: 24, y: 58, s: 30 },
          { e: "🧒", x: 56, y: 66, s: 28 },
          { t: "I will stay.", x: 56, y: 26, s: 7, a: "pop:0.5" },
          { e: "🍝", x: 84, y: 30, s: 16, a: "float" },
        ],
        cap: "Will stays for two more weeks.",
      },
      text: [
        "Will was still too worried about disappointing his dad, so he wrote back to his mom that he would stay for the last two weeks and try to make the best of it. He asked his mom if she would make his favorite meal when he got home.",
      ],
      easy: "Will decides to stay at camp. He asks Mom to cook his favorite meal when he comes home.",
    },
    {
      img: "img/honest-camp/boy.jpg",
      text: [
        "During that last week, Will was looking so forward to the meal his mom would be making that every time he ate a camp meal, he imagined he was eating his mom’s cooking. All of a sudden, the food didn’t taste as bad.",
      ],
      easy: "Will thinks of Mom’s cooking when he eats. Now the camp food is not so bad.",
    },
    {
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🐎", x: 30, y: 60, s: 30, a: "hide" },
          { e: "🐴", x: 30, y: 60, s: 30, a: "show" },
          { t: "Misty", x: 30, y: 30, s: 7, a: "show" },
          { e: "🧑", x: 72, y: 62, s: 28 },
          { e: "🧒", x: 54, y: 70, s: 20, a: "nod" },
        ],
        cap: "a new horse: Misty",
      },
      text: [
        "Will decided to be honest with his camp counselors. He told the head horseback counselor that he wasn’t comfortable with the horse he had been assigned. The counselor asked Will which horse he might feel better riding. Will was then assigned to Misty for the last week, and he started to like horseback riding.",
      ],
      easy: "Will tells the truth about the horse. He gets a new horse, Misty. Now he likes riding.",
    },
    {
      img: "img/honest-camp/glove.jpg",
      text: [
        "Will never liked playing baseball because he didn’t like playing first base. He told the baseball counselor, and the counselor switched him to play catcher. Will started to actually like baseball.",
      ],
      easy: "Will tells the truth about baseball. Now he is the catcher, and he likes baseball.",
    },
    {
      img: "img/honest-camp/canoe.jpg",
      text: [
        "As for canoeing, Will always ended up sitting in the bow of the canoe. He told his counselor that he would like to try sitting in the stern. Once he was able to take on the role of the stern paddler, he started to enjoy canoeing because he liked steering the canoe.",
      ],
      easy: "Will asks to sit at the back of the canoe. Now he can steer the canoe, and he enjoys it.",
    },
    {
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "👨", x: 22, y: 60, s: 30 },
          { e: "👩", x: 42, y: 60, s: 30 },
          { e: "🧒", x: 72, y: 66, s: 28, a: "jump" },
          {
            t: "Best summer ever!",
            x: 66,
            y: 22,
            s: 7,
            c: "good",
            a: "pop:0.4",
          },
        ],
        cap: "Will tells the truth: he loved it!",
      },
      text: [
        "When Will’s parents came to pick him up from camp, he said to them in all honesty, “This was the best summer at camp ever.” He then added that he couldn’t wait for next year’s camp, and he might even want to stay for an extra week or two.",
      ],
      easy: "At the end, Will really likes camp. He wants to come back next year.",
    },
  ],
  summary: [
    {
      t: "Characters",
      img: "img/honest-camp/boy.jpg",
      text: "Will, his mom and dad, and the camp counselors.",
    },
    {
      t: "Setting",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "⛺", x: 40, y: 58, s: 36 },
          { e: "☀️", x: 78, y: 22, s: 20, a: "spin" },
        ],
      },
      text: "A summer camp, in August.",
    },
    {
      t: "Problem",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🧒", x: 40, y: 62, s: 32 },
          { e: "😕", x: 40, y: 24, s: 16, a: "shake" },
        ],
      },
      text: "Will doesn’t like the camp, but he does not want to disappoint his dad.",
    },
    {
      t: "Events",
      img: "img/honest-camp/glove.jpg",
      text: "Will is honest with his counselors. He gets a new horse, plays catcher, and sits in the stern of the canoe.",
    },
    {
      t: "Solution",
      img: "img/honest-camp/canoe.jpg",
      text: "He decided to be honest with his counselors, and they changed his activities so he could enjoy them.",
    },
    {
      t: "Message",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🗣️", x: 34, y: 50, s: 30 },
          { e: "👍", x: 70, y: 50, s: 26, a: "pulse" },
        ],
      },
      text: "Be honest. When you tell people how you feel, they can help you.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/honest-camp/boy.jpg",
      q: "What is the genre of this text?",
      o: ["realistic fiction", "fantasy", "argumentative text"],
    },
    {
      tag: "Problem",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "⛺", x: 26, y: 58, s: 30 },
          { e: "🧒", x: 62, y: 62, s: 30 },
          { e: "😕", x: 62, y: 26, s: 14, a: "shake" },
        ],
      },
      q: "What was the problem at the beginning of the story?",
      o: [
        "Will didn’t like the camp.",
        "Will’s dad didn’t like the camp.",
        "Will wanted to go back home.",
      ],
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "👨", x: 30, y: 60, s: 32 },
          { e: "💭", x: 64, y: 30, s: 26 },
          { e: "⛺", x: 64, y: 28, s: 12 },
        ],
      },
      q: "Why did Will think his dad would be disappointed if he learned that Will didn’t like the camp?",
      a: "Will thought his dad would be disappointed because his dad went to the same camp when he was a boy and loved it.",
    },
    {
      tag: "Solution",
      type: "open",
      img: "img/honest-camp/canoe.jpg",
      q: "What did Will do to solve his problem?",
      a: "He decided to be honest with his counselors, and they changed his activities so he could enjoy them.",
    },
    {
      tag: "Character",
      type: "open",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🧒", x: 50, y: 62, s: 32, a: "jump" },
          { t: "Best summer ever!", x: 50, y: 20, s: 8, c: "good" },
        ],
      },
      q: "At the end of the story, what was Will’s opinion about the camp?",
      a: "He thought it was the best summer at camp ever.",
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "✉️", x: 30, y: 50, s: 26 },
          { e: "👩", x: 72, y: 58, s: 30 },
        ],
      },
      q: "Why didn’t Mom pick Will up early without telling his dad?",
      o: [
        "She is always honest with his dad.",
        "She was too busy.",
        "She liked the camp food.",
      ],
    },
    {
      tag: "Details",
      img: "img/honest-camp/boy.jpg",
      q: "Why did the camp food stop tasting so bad?",
      o: [
        "Will imagined he was eating his mom’s cooking.",
        "The camp got a new cook.",
        "Will ate at home.",
      ],
    },
    {
      tag: "Details",
      img: "img/honest-camp/glove.jpg",
      q: "What did the baseball counselor do?",
      o: [
        "He switched Will to play catcher.",
        "He sent Will home.",
        "He gave Will a new horse.",
      ],
    },
  ],
};
