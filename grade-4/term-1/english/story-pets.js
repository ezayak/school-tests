// Should Kids Have Pets? (Homework Booklet Term 1, pages 40–42, Unit 1 Week 5, argumentative text). Engine: shared/story.js.
// The booklet has no model answers: the answers here are written from the text.
window.STORY = {
  key: "en4-pets",
  title: "Should Kids Have Pets?",
  kind: "Argumentative text · Homework booklet",
  cover: "img/pets/pets.jpg",
  lesson: { path: "unit1-week5.html", label: "Unit 1 · Week 5" },
  question: "Should kids have pets?",
  gloss: {
    hamster: "a small furry animal, like a little mouse",
    responsibility: "a job you must do and take care of",
    friendship: "being friends",
    lonely: "sad because you are alone",
    comfort: "something that makes you feel better",
    stressed: "worried and tired",
    additionally: "also",
    "self-confidence": "believing that you can do things",
    thrive: "grow strong and healthy",
    argue: "say why they think something",
    schedules: "plans of what to do and when",
    require: "need",
    attention: "time and care",
    regularly: "often, again and again",
    interfere: "get in the way",
    moreover: "also",
    expensive: "costing a lot of money",
    vet: "an animal doctor",
    afford: "to have enough money for something",
    valuable: "very useful and important",
  },
  pages: [
    {
      img: "img/pets/pets.jpg",
      text: [
        "Many kids dream of having a pet, whether it’s a dog, cat, hamster, or fish. But not everyone agrees on whether kids should have pets. Some people think it’s a great idea, while others believe it might be too much responsibility.",
      ],
      easy: "Many kids want a pet. Some people think it is a great idea. Other people think it is too much work.",
    },
    {
      ch: "Pets are good for kids 👍",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🧒", x: 30, y: 62, s: 30 },
          { e: "🐶", x: 62, y: 70, s: 26, a: "jump" },
          { e: "🥣", x: 80, y: 80, s: 14 },
          { e: "❤️", x: 46, y: 30, s: 16, a: "pulse" },
          { e: "🌱", x: 82, y: 34, s: 12, a: "grow" },
        ],
        cap: "care · friendship · comfort · confidence",
      },
      text: [
        "Some people believe that pets can teach kids important life lessons. For example, having a pet helps children learn responsibility. They have to feed, clean, and take care of their pet every day, which teaches them how to care for another living being. Pets can also provide friendship. Many kids feel less lonely when they have a pet to play with and talk to. Pets can be a source of comfort, especially when kids are feeling sad or stressed. Additionally, taking care of a pet can help kids build self-confidence as they see their pet grow and thrive because of their care.",
      ],
      easy: "Good things about pets: kids learn responsibility, pets are friends, they comfort us, and they help kids feel confident.",
    },
    {
      ch: "Pets are too much work 👎",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🧒", x: 20, y: 64, s: 24 },
          { e: "🎮", x: 30, y: 78, s: 12 },
          { e: "🐕", x: 56, y: 70, s: 24, a: "jump" },
          { e: "👩", x: 80, y: 60, s: 28 },
          { e: "😩", x: 80, y: 26, s: 14, a: "shake" },
          { e: "⏰", x: 50, y: 24, s: 14, a: "nod" },
        ],
        cap: "time · attention · the job falls to parents",
      },
      text: [
        "Other people argue that having a pet is too much responsibility for kids. They believe that while kids might promise to take care of a pet, the job often falls to the parents. This can be a problem if the parents already have busy schedules. Pets also require a lot of time and attention, which some kids might not be able to give. For example, dogs need to be walked and played with regularly, and this might interfere with schoolwork or other activities.",
      ],
      easy: "Bad things about pets: often the parents do the work, and pets need a lot of time.",
    },
    {
      ch: "Pets are too much work 👎",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "💲", x: 20, y: 30, s: 14, dy: 40, a: "fall" },
          { e: "💲", x: 36, y: 30, s: 14, dy: 40, a: "fall:0.7" },
          { e: "🦴", x: 30, y: 70, s: 18 },
          { e: "🧑‍⚕️", x: 66, y: 62, s: 28 },
          { e: "🐈", x: 84, y: 72, s: 20, a: "hide" },
        ],
        cap: "food · toys · the vet",
      },
      text: [
        "Moreover, pets can be expensive. Buying food, toys, and paying for vet visits can add up quickly, and not all families can afford these costs. Finally, some kids might lose interest in their pet after a while, leaving the animal without proper care.",
      ],
      easy: "Pets cost a lot of money. Some kids stop caring for their pet after a while.",
    },
    {
      ch: "What the author thinks",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "⚖️", x: 50, y: 44, s: 40, a: "nod" },
          { e: "😄", x: 22, y: 60, s: 16 },
          { e: "💲", x: 78, y: 60, s: 16 },
        ],
        cap: "joy, but a lot of work",
      },
      text: [
        "I think pets can bring a lot of joy and teach kids valuable lessons, but they also require a lot of time, money, and responsibility.",
      ],
      easy: "The author thinks pets bring joy and teach lessons, but they need a lot of time, money and work.",
    },
  ],
  summary: [
    {
      t: "The question",
      img: "img/pets/pets.jpg",
      text: "Should kids have pets?",
    },
    {
      t: "Yes 👍",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🧒", x: 34, y: 60, s: 30 },
          { e: "🐶", x: 66, y: 66, s: 28, a: "jump" },
        ],
      },
      text: "Kids learn responsibility. Pets give friendship and comfort. Kids build self-confidence.",
    },
    {
      t: "No 👎",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "💲", x: 34, y: 50, s: 30 },
          { e: "⏰", x: 66, y: 50, s: 30 },
        ],
      },
      text: "The job often falls to the parents. Pets need time and attention. Pets are expensive. Kids might lose interest.",
    },
    {
      t: "The author’s point of view",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [{ e: "⚖️", x: 50, y: 50, s: 44, a: "nod" }],
      },
      text: "Pets bring joy and teach lessons, but they need a lot of time, money, and responsibility.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/pets/pets.jpg",
      q: "Why is this text an argumentative text?",
      o: [
        "It gives facts and tries to persuade others to agree with the author.",
        "The characters are real.",
        "The events are real.",
      ],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🧒", x: 34, y: 60, s: 30 },
          { e: "🐶", x: 66, y: 66, s: 28, a: "jump" },
        ],
      },
      q: "Which one is a reason why kids *should* have pets?",
      o: [
        "Pets can provide friendship.",
        "Pets are expensive.",
        "Pets need a lot of time.",
      ],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "💲", x: 34, y: 50, s: 30 },
          { e: "🧑‍⚕️", x: 68, y: 56, s: 30 },
        ],
      },
      q: "Which one is a reason why kids *should* *not* have pets?",
      o: [
        "Pets can be expensive.",
        "Pets help kids feel less lonely.",
        "Pets teach responsibility.",
      ],
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [{ e: "👍", x: 50, y: 50, s: 40, a: "pulse" }],
      },
      q: "What are two reasons people think kids should have pets?",
      a: "Having a pet helps children learn responsibility. Pets can also provide friendship, so kids feel less lonely.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [{ e: "👎", x: 50, y: 50, s: 40, a: "pulse" }],
      },
      q: "What are two reasons people think kids should not have pets?",
      a: "The job of caring for the pet often falls to the parents. Pets can also be expensive: food, toys and vet visits cost a lot.",
    },
    {
      tag: "Point of view",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [{ e: "⚖️", x: 50, y: 50, s: 44, a: "nod" }],
      },
      q: "What is the author’s point of view?",
      a: "The author thinks pets can bring a lot of joy and teach kids valuable lessons, but they also need a lot of time, money, and responsibility.",
    },
  ],
};
