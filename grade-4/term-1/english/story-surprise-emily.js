// A Surprise for Emily (Homework Booklet Term 1, pages 14–16, Unit 1 Week 3, realistic fiction). Engine: shared/story.js.
// Questions 1–5 with the school's model answers (Homework Booklet pages 15–16 model answer); the others are extra.
window.STORY = {
  key: "en4-surprise-emily",
  title: "A Surprise for Emily",
  kind: "Realistic fiction · Homework booklet",
  cover: "img/surprise-emily/paints.jpg",
  lesson: { path: "unit1-week3.html", label: "Unit 1 · Week 3" },
  question: "How do your actions affect others?",
  gloss: {
    rush: "to go or do something very fast",
    pajamas: "clothes you sleep in",
    strange: "not like usual",
    whispering: "talking very quietly",
    subject: "what people talk about",
    curious: "wanting to know",
    ruin: "to spoil, to make something bad",
    chores: "small jobs at home, like cleaning",
    groaned: "made a sad, unhappy sound",
    laundry: "clothes that are washed",
    wrapped: "covered in paper, like a present",
    watercolor: "paint that you mix with water",
    exclaimed: "said loudly, with surprise",
    mysteriously: "in a way that keeps a secret",
    studio: "a room where an artist works",
    expensive: "costing a lot of money",
    workshop: "a class where you learn by doing",
    techniques: "ways of doing something",
  },
  pages: [
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👧", x: 24, y: 62, s: 30 },
          { e: "📖", x: 36, y: 72, s: 12 },
          { e: "👩", x: 66, y: 60, s: 26 },
          { e: "👨", x: 84, y: 60, s: 26 },
          { t: "psst…", x: 75, y: 26, s: 7, a: "blink" },
          { e: "❓", x: 24, y: 26, s: 14, a: "pulse" },
        ],
        cap: "Mom and Dad are whispering…",
      },
      text: [
        "Emily loved Saturdays because it was the only day she didn’t have to rush. She could spend the morning in her pajamas, reading her favorite book, or helping her mom bake cookies. But this Saturday was different. Emily’s parents had been acting strange all week, whispering to each other and quickly changing the subject whenever she entered the room. Emily was curious but didn’t want to ruin any surprises they might be planning.",
      ],
      easy: "Emily loves Saturdays. Her mom and dad whisper and stop talking when she comes in. What is the secret?",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🧹", x: 18, y: 60, s: 22, a: "nod" },
          { e: "👕", x: 40, y: 66, s: 18, a: "pop:0.5" },
          { e: "🛏️", x: 62, y: 66, s: 22 },
          { e: "🎁", x: 84, y: 58, s: 24, a: "show" },
        ],
        cap: "chores, then a present!",
      },
      text: [
        "After breakfast, Emily’s mom asked her to help with some chores. Emily groaned, but she agreed, knowing she would have the rest of the day to relax. She cleaned the living room, folded laundry, and even cleaned her room without being asked. When she was finally done, her mom handed her a small box wrapped in bright pink paper.",
      ],
      easy: "Emily helps her mom clean the house. Then Mom gives her a small pink box.",
    },
    {
      img: "img/surprise-emily/paints.jpg",
      text: [
        "“What’s this?” Emily asked, her eyes wide with surprise.",
        "“Open it and see,” her mom said with a smile.",
        "Emily carefully opened the box. Inside, there was a new set of watercolor paints. The colors were so bright and beautiful, and there were even different-sized brushes included.",
        "“Thank you!” Emily exclaimed, hugging her mom tightly. She had been wanting new paints for months, but she didn’t expect to get them so soon.",
      ],
      easy: "In the box there are new paints and brushes. Emily is very happy.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🚪", x: 80, y: 54, s: 40 },
          { e: "👨", x: 62, y: 60, s: 28 },
          { e: "👧", x: 20, y: 64, s: 26, dx: 20, a: "go" },
          { t: "You’ll see!", x: 60, y: 20, s: 7, a: "pop:0.5" },
        ],
        cap: "Where are we going?",
      },
      text: [
        "“Now, get dressed,” her mom said, “We have somewhere special to go.”",
        "Emily rushed to her room, quickly changed out of her pajamas, and grabbed her shoes. When she came back downstairs, her dad was waiting by the door with a big smile on his face.",
        "“Ready to go?” he asked.",
        "“Where are we going?” Emily asked.",
        "“You’ll see,” her dad replied mysteriously.",
      ],
      easy: "Mom says: get dressed, we are going somewhere special. Dad does not say where.",
    },
    {
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🏫", x: 34, y: 58, s: 40 },
          { e: "🎨", x: 34, y: 30, s: 14 },
          {
            t: "Free Kids’ Art Workshop!",
            x: 66,
            y: 20,
            s: 6,
            c: "good",
            a: "pop:0.5",
          },
          { e: "👧", x: 78, y: 70, s: 24, a: "jump" },
        ],
        cap: "the art studio",
      },
      text: [
        "They stopped in front of the art studio that Emily loved to visit. She had always wanted to take a class there, but it was too expensive. Today, though, the sign outside read “Free Kids’ Art Workshop!”",
        "“We signed you up for the workshop,” her dad explained. “We thought it would be the perfect way to use your new paints.”",
      ],
      easy: "They go to the art studio. Mom and Dad signed Emily up for a free art class.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🖼️", x: 30, y: 46, s: 34 },
          { e: "🖌️", x: 46, y: 52, s: 16, a: "wave" },
          { e: "👧", x: 70, y: 60, s: 30 },
          { e: "😄", x: 88, y: 40, s: 14, a: "pulse" },
          {
            t: "Best surprise ever!",
            x: 50,
            y: 12,
            s: 6,
            c: "good",
            a: "pop:0.8",
          },
        ],
        cap: "Emily paints for two hours.",
      },
      text: [
        "Emily couldn’t believe it. She spent the next two hours learning new techniques, mixing colors, and creating a painting. As they left the studio, she couldn’t stop smiling.",
        "“Thank you, thank you, thank you!” Emily said as she climbed back into the car. “This is the best surprise ever!”",
        "Her parents just smiled, happy to see their daughter so excited.",
      ],
      easy: "Emily paints and learns a lot. She is very, very happy: the best surprise ever!",
    },
  ],
  summary: [
    {
      t: "Characters",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👩", x: 26, y: 60, s: 30 },
          { e: "👧", x: 50, y: 66, s: 26 },
          { e: "👨", x: 74, y: 60, s: 30 },
        ],
      },
      text: "Emily, her mom and her dad.",
    },
    {
      t: "Setting",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🏠", x: 32, y: 56, s: 32 },
          { e: "🎨", x: 70, y: 56, s: 26 },
        ],
      },
      text: "On a Saturday, at home and at the art studio.",
    },
    {
      t: "Problem",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👧", x: 34, y: 60, s: 30 },
          { e: "❓", x: 66, y: 40, s: 26, a: "pulse" },
        ],
      },
      text: "Emily’s parents act strange all week. They are planning a surprise.",
    },
    {
      t: "Events",
      img: "img/surprise-emily/paints.jpg",
      text: "Emily helps with the chores. Mom gives her a box with new watercolor paints. They go somewhere special.",
    },
    {
      t: "Solution",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🎨", x: 34, y: 50, s: 32 },
          { e: "👧", x: 70, y: 60, s: 30, a: "jump" },
        ],
      },
      text: "The surprise: a free art workshop at the art studio!",
    },
    {
      t: "Message",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [{ e: "💝", x: 50, y: 50, s: 40, a: "pulse" }],
      },
      text: "Kind actions make people happy. Emily’s parents are happy to see her so excited.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/surprise-emily/paints.jpg",
      q: "Why is this text a realistic fiction text?",
      o: [
        "Its events can happen in real life.",
        "Its characters can’t be found in real life.",
        "It gives real information.",
      ],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👧", x: 30, y: 62, s: 30 },
          { e: "🛌", x: 70, y: 62, s: 26 },
          { e: "📖", x: 44, y: 72, s: 12 },
        ],
      },
      q: "Emily loved Saturdays because …",
      o: [
        "she didn’t need to rush.",
        "it was her birthday.",
        "she attended painting sessions.",
      ],
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👩", x: 40, y: 60, s: 28 },
          { e: "👨", x: 62, y: 60, s: 28 },
          { t: "psst…", x: 50, y: 24, s: 8, a: "blink" },
        ],
      },
      q: "Why did Emily think her parents were acting strange?",
      a: "She thought her parents were acting strange because they were whispering and quickly changing the subject when she walked in.",
    },
    {
      tag: "Text evidence",
      type: "open",
      img: "img/surprise-emily/paints.jpg",
      q: "How did Emily’s parents surprise her?",
      a: "They gave her a new watercolor paint set and signed her up for an art workshop.",
    },
    {
      tag: "Character",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "👧", x: 50, y: 60, s: 32, a: "jump" },
          { e: "😄", x: 50, y: 22, s: 16, a: "pulse" },
        ],
      },
      q: "How did Emily feel at the end of the story?",
      a: "Emily felt extremely happy and excited.",
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [{ e: "🎁", x: 50, y: 50, s: 40, a: "pulse" }],
      },
      q: "What was inside the pink box?",
      o: ["a new set of watercolor paints", "a new book", "cookies"],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🏫", x: 40, y: 56, s: 36 },
          { e: "💲", x: 72, y: 40, s: 22, a: "pulse" },
        ],
      },
      q: "Why didn’t Emily take a class at the art studio before?",
      o: [
        "It was too expensive.",
        "It was too far.",
        "She didn’t like painting.",
      ],
    },
  ],
};
