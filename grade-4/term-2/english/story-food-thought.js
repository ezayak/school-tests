// Food for Thought (Wonders Genre Passages, Grade 4 Unit 3 Week 5, argumentative text). Classwork Booklet Term 2, pages 41–43. Engine: shared/story.js.
// The headings of the text are shown above each page; the diagram is from page 42. No answer key: the open answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-food-thought",
  title: "Food for Thought",
  kind: "Argumentative text · Classwork booklet",
  cover: "img/food-thought/diagram.jpg",
  lesson: { path: "unit3-week5.html", label: "Unit 3 · Week 5" },
  hub: "../../term-1/english/index.html",
  question: "In what ways can advances in science be helpful or harmful?",
  gloss: {
    vegetable: "a plant we eat, like a carrot",
    soil: "the earth that plants grow in",
    hydroponics: "growing plants in water, without soil",
    produce: "to make",
    process: "a set of steps",
    photosynthesis: "how plants use light to make food",
    dioxide: "carbon dioxide = a gas in the air that plants use",
    systems: "sets of parts that work together",
    tank: "a big box for water",
    tray: "a flat open box",
    nutrient: "something that helps a living thing grow",
    nutrients: "things that help living things grow",
    substances: "kinds of matter",
    nitrogen: "a gas that helps plants grow",
    potassium: "a mineral that helps plants grow",
    pump: "a machine that moves water",
    roots: "the parts of a plant under the ground",
    mineral: "a natural thing from the ground, like a stone",
    perlite: "a light white mineral",
    support: "to hold up",
    pellets: "small balls",
    benefits: "good things",
    recycled: "used again",
    diseases: "illnesses",
    pests: "small animals or insects that hurt plants",
    harsh: "strong and hurting",
    chemicals: "strong substances made by people",
    laboratories: "rooms where scientists work",
    astronauts: "people who travel into space",
    expensive: "costing a lot of money",
    requires: "needs",
    affect: "to change something",
    constantly: "all the time",
    properly: "in the right way",
    challenges: "difficult things",
    efficient: "working well without wasting",
    hydroponically: "in water, without soil",
    method: "a way of doing something",
    headings: "the titles above the parts of a text",
    diagram: "a drawing that shows how something works",
    persuade: "to make someone agree with you",
    argument: "the reasons for what you think",
  },
  pages: [
    {
      ch: "Food for Thought",
      img: "img/unit3-week5/cover.jpg",
      text: [
        "When you think of a vegetable garden, you probably picture plants growing in the soil. However, a science called hydroponics makes it possible for people to grow plants by placing them in water, not soil.",
      ],
      easy: "Most plants grow in soil. With hydroponics, people grow plants in water, not soil.",
    },
    {
      ch: "How Plants Produce Their Food",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "☀️", x: 80, y: 20, s: 22, a: "pulse" },
          { e: "🌱", x: 40, y: 62, s: 34, a: "grow" },
          { e: "💧", x: 62, y: 74, s: 14, a: "pop:0.6" },
          { t: "light + air + water → sugar", x: 50, y: 90, s: 7, c: "plain" },
        ],
        cap: "photosynthesis",
      },
      text: [
        "Plants produce food in their leaves with the process of photosynthesis. They use light, carbon dioxide, and water to make sugar for food. But plants do not need soil for photosynthesis.",
      ],
      easy: "Plants make their food in their leaves. They need light, air and water. They do not need soil.",
    },
    {
      ch: "How Does Hydroponics Work?",
      img: "img/food-thought/diagram.jpg",
      text: [
        "The word hydroponics comes from two Greek words. The word hydro means “water,” and the word ponos means “work.” In hydroponics, the water does the work of growing the plant.",
        "In many hydroponic systems, plants are grown in a tank or tray full of nutrient-filled water. The nutrients are substances such as nitrogen and potassium. They help the plants grow. A pump moves the water around the plant’s roots. In other systems, the plants are set in a tube where water and nutrients flow to the plants’ roots. A mineral called perlite is used to support the plants. Some gardeners use clay pellets.",
      ],
      easy: "Hydro means water. The plants grow in a tray of water with food for plants in it. A pump moves the water to the roots.",
    },
    {
      ch: "The Benefits and Problems of Hydroponics",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🚀", x: 30, y: 50, s: 30, a: "float" },
          { e: "🧑‍🚀", x: 60, y: 46, s: 26, a: "float:0.4" },
          { e: "🌱", x: 76, y: 66, s: 20, a: "grow" },
        ],
        cap: "plants in space",
      },
      text: [
        "Plants in hydroponic systems can grow much faster than plants grown in soil. In addition, the nutrients can be recycled. Diseases and pests can also be controlled without the use of harsh chemicals.",
        "Hydroponics allows plants to grow in places where they could not before. It can be used in small spaces, such as apartments and sheds. Hydroponics plants can grow in laboratories. Astronauts have even used hydroponics to grow plants in space!",
      ],
      easy: "Good things: the plants grow faster, the plant food is used again, and plants can grow in small places, labs, and even in space.",
    },
    {
      ch: "The Benefits and Problems of Hydroponics",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "💰", x: 24, y: 56, s: 24 },
          { e: "🐛", x: 50, y: 66, s: 20, dx: 10, a: "go" },
          { e: "🥀", x: 74, y: 60, s: 28, a: "shake" },
        ],
        cap: "problems",
      },
      text: [
        "Hydroponics does have some problems. Hydroponic gardening is more expensive than gardening using soil. It also requires a certain amount of skill and knowledge to be successful.",
        "If diseases or pests get into the water of a hydroponic system, they can spread quickly and affect all the plants. Also, if the pumps break down, plants in a hydroponic system can die. Gardeners must be very careful and constantly check the system to make sure it is working properly.",
      ],
      easy: "Problems: it costs more money, you need skill, pests can spread to all the plants, and if the pump breaks the plants can die.",
    },
    {
      ch: "The Bottom Line",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌱", x: 24, y: 60, s: 24, a: "grow" },
          { e: "🥬", x: 50, y: 58, s: 28, a: "grow:0.4" },
          { e: "🍅", x: 76, y: 60, s: 24, a: "grow:0.8" },
          { e: "👍", x: 50, y: 20, s: 18, a: "pop:1.2" },
        ],
        cap: "an important way to grow plants",
      },
      text: [
        "Although it has some challenges, hydroponics is an important way to grow plants. Hydroponics is efficient and allows plants to grow in different places. Although not all plants grow well hydroponically, this method can make growing plants and feeding people easier.",
      ],
      easy: "The author thinks hydroponics is a good way to grow plants and feed people, even with its problems.",
    },
  ],
  summary: [
    {
      t: "What the text is about",
      img: "img/food-thought/diagram.jpg",
      text: "Hydroponics is a way to grow plants in water with nutrients, not in soil. A pump moves the water to the roots.",
    },
    {
      t: "Benefits",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "⚡", x: 24, y: 50, s: 24 },
          { e: "♻️", x: 50, y: 50, s: 24 },
          { e: "🚀", x: 76, y: 50, s: 24 },
        ],
      },
      text: "Plants grow faster, the nutrients are recycled, no harsh chemicals, and plants can grow in small spaces, labs and space.",
    },
    {
      t: "Problems",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "💰", x: 24, y: 50, s: 24 },
          { e: "🐛", x: 50, y: 56, s: 22 },
          { e: "🥀", x: 76, y: 50, s: 26 },
        ],
      },
      text: "It costs more, needs skill, pests spread quickly, and plants can die if the pump breaks.",
    },
    {
      t: "The author’s argument",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🥬", x: 40, y: 56, s: 30 },
          { e: "👍", x: 66, y: 40, s: 22, a: "pop" },
        ],
      },
      text: "The author thinks hydroponics is an important way to grow plants and feed people.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/food-thought/diagram.jpg",
      q: "What is “Food for Thought”?",
      o: ["an argumentative text", "a poem", "realistic fiction"],
      x: "The author gives reasons to make you agree: hydroponics is a good way to grow plants.",
    },
    {
      tag: "Details",
      img: "img/food-thought/diagram.jpg",
      q: "In hydroponics, plants grow in …",
      o: ["water with nutrients", "soil", "sand"],
    },
    {
      tag: "Vocabulary",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [{ e: "💧", x: 50, y: 50, s: 36, a: "pulse" }],
      },
      q: "What does the Greek word “hydro” mean?",
      o: ["water", "work", "plant"],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🔧", x: 40, y: 50, s: 28 },
          { e: "🥀", x: 66, y: 56, s: 28, a: "shake" },
        ],
      },
      q: "What can happen if the pump breaks down?",
      o: [
        "The plants can die.",
        "The plants grow faster.",
        "The water gets cleaner.",
      ],
    },
    // unverified: the booklet's open questions (Classwork p. 43)
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "How Does Hydroponics Work?", x: 50, y: 30, s: 7, c: "plain" },
          {
            t: "Benefits and Problems",
            x: 50,
            y: 52,
            s: 7,
            c: "plain",
            a: "pop:0.5",
          },
          { t: "The Bottom Line", x: 50, y: 74, s: 7, c: "good", a: "pop:1" },
        ],
      },
      q: "How does the author use headings to present his argument for hydroponic systems?",
      a: "Each heading tells what the next part is about. First the author explains how plants make food and how hydroponics works. Then the heading “The Benefits and Problems of Hydroponics” gives both sides. Last, “The Bottom Line” gives the author’s opinion: hydroponics is an important way to grow plants.",
    },
    {
      tag: "Text evidence",
      type: "open",
      img: "img/food-thought/diagram.jpg",
      q: "How does the diagram help you understand how hydroponics works?",
      a: "The diagram shows the plants in a tray above a tank of water. The arrows show how the water pump moves the water up to the roots and how the water flows back down into the tank.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🥬", x: 36, y: 56, s: 30 },
          { e: "👍", x: 66, y: 40, s: 22 },
        ],
      },
      q: "How does the author try to persuade the reader that hydroponics is a good way to grow plants?",
      a: "The author gives facts about its benefits: plants grow faster, nutrients are recycled, no harsh chemicals are needed, and plants can grow in small spaces and even in space. The author also tells the problems, but says that hydroponics is efficient and can make feeding people easier.",
    },
  ],
};
