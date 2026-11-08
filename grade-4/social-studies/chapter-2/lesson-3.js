// Social Studies · Grade 4 · Chapter 2 · Lesson 3 « Growth and Civil War » (myWorld Interactive 4, book pp. 64–69).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Learn: the book's text in easy words (picture cards), the book's vocabulary, the story « The Civil War » (pp. 66–67, story-civil-war.html).
// Exercises: Term 2 booklet, Lesson 3 exercise sheet (pp. 14–16: A choose, B fill in, E ✓/✗, F answer; the sheet has no C or D),
// the Civil War word search (p. 18, the lesson's words), and the book's Reading Checks and Lesson 3 Check.
// No answer key: answers from the book (grade-4/social-studies/UNVERIFIED.md).
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-3.py

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-3/ or 1–2 emoji.
const mc = (q, answers, more) => {
  const isImg = (p) => /^[a-z.][a-z0-9./-]*$/.test(p);
  const opts = answers.map((a) => a[0]);
  const pics = answers.map((a) => (isImg(a[1]) ? a[1] : null));
  const icons = answers.map((a) => (isImg(a[1]) ? null : a[1]));
  return {
    type: "mc",
    q,
    opts,
    ...(pics.some(Boolean) ? { pics } : {}),
    ...(icons.some(Boolean) ? { icons } : {}),
    ...more,
  };
};
const pic = (p) => (/^[a-z]/.test(p) ? { img: p } : { emoji: p });
// the people of the lesson, each with a picture
const WHO = {
  "Abraham Lincoln": "lincoln",
  "Frederick Douglass": "douglass",
  "Harriet Tubman": "tubman",
  "Jefferson Davis": "🎩",
  "Robert E. Lee": "🎖️",
  "Ulysses S. Grant": "⭐",
  "Chief Joseph": "chief-joseph",
  "Blanche Bruce": "bruce",
  "John F. Kennedy": "👔",
};
const who = (...names) => names.map((n) => [n, WHO[n]]);
// North (the Union) or South (the Confederacy)?
const N = ["The North (the Union)", "🏭"],
  S = ["The South (the Confederacy)", "🌾"];
const side = (q, p, north, x) =>
  mc(q, north ? [N, S] : [S, N], { ...pic(p), two: true, ...(x ? { x } : {}) });
// the booklet's word box (sheet B), each word with a picture
const BOX = {
  "Fort Sumter": "💥🏰",
  "Harriet Tubman": "tubman",
  west: "🌅",
  immigrant: "🧳",
  North: "🏭",
  "enslaved Africans": "⛓️",
  Confederate: "🌾",
};
const fill = (q, words, p) =>
  mc(
    q,
    words.map((w) => [w, BOX[w]]),
    pic(p),
  );
// ✓ / ✗: a: true (correct) or false; x = the corrected sentence
const tf = (q, a, p, x) => ({
  type: "tf",
  q,
  a,
  yes: ["Correct", "Wrong"],
  ...pic(p),
  x,
});

window.LESSON = {
  n: 3,
  key: "ss4-c2-l3",
  grade: 4,
  title: "Growth and Civil War",
  unit: "Chapter 2 · Lesson 3",
  book: "Book pp. 64–69",
  cover: "map-1861",
  question: {
    q: "What [divided] the growing nation and led to the [Civil War]?",
    a: "The North and the South had different ways of life. The South depended on [slavery]; many Northerners wanted to end it. After [Lincoln] was elected, the Southern states [seceded], and the war began in [1861].",
    img: "map-1861",
  },
  // the book's Vocabulary and Academic Vocabulary (p. 64), + the booklet's words
  words: [
    { w: "Immigrant", m: "a person who comes to live in a new land" },
    { w: "Industry", m: "the part of the economy where machines do the work" },
    {
      w: "Manifest Destiny",
      m: "the idea that the USA should grow from coast to coast",
    },
    { w: "States' rights", m: "each state should solve its own problems" },
    { w: "Abolitionist", m: "a person who wants to end slavery completely" },
    { w: "Secede", m: "to break away, to leave" },
    { w: "Union", m: "the Northern states" },
    { w: "Confederacy", m: "the Southern states that seceded" },
    { w: "Reconstruction", m: "the time when the South was rebuilt" },
    { w: "Segregation", m: "keeping groups of people apart" },
    { w: "Reservation", m: "land set aside for American Indians" },
    { w: "Productive", m: "able to make a lot of goods" },
    { w: "Pursue", m: "to chase" },
  ],

  ideas: [
    // p. 64
    {
      t: "Americans on the move",
      lines: [
        "In 1847, [San Francisco] was a tiny town.",
        "In [1848], [gold] was found nearby.",
        "By the end of 1849, about [25,000] people lived there.",
      ],
      img: "san-francisco",
    },
    // p. 65: Manifest Destiny
    {
      t: "Manifest Destiny",
      lines: [
        "Americans moved [west] to find land, gold or furs.",
        "[Manifest Destiny]: the idea that the USA should grow [bigger and bigger], from coast to coast.",
        "But [Native Americans] lived there. The two groups fought for the land.",
      ],
      emoji: "🧭🌅",
    },
    {
      t: "From ocean to ocean",
      lines: [
        "The USA and [Mexico] fought a war for the Southwest. It ended in [1848].",
        "The nation went from the [Atlantic] to the [Pacific].",
      ],
      emoji: "🌊🇺🇸",
    },
    // p. 65: New Industries
    {
      t: "Immigrants and industry",
      lines: [
        "In the 1840s, many [immigrants] came from Europe. An immigrant comes to live in a new land.",
        "They helped build the [industry]: the part of the economy where [machines] do the work.",
      ],
      emoji: "🧳🏭",
    },
    {
      t: "The Industrial Revolution",
      lines: [
        "Machines in big [factories] made more and more goods.",
        "Farmers used machines too. The economy was very [productive].",
      ],
      emoji: "🏭⚙️",
    },
    {
      t: "Travel and messages",
      lines: [
        "[Railroads] let people travel faster. Better roads and the [Erie Canal] helped people go west.",
        "The [telegraph] helped people communicate.",
        "The [Pony Express] carried mail to California (1860–1861).",
      ],
      img: "pony-express",
    },
    // p. 66: The North and the South
    {
      t: "The North and the South",
      lines: [
        "The [North]: more people, cities and [factories].",
        "The [South]: mostly [farms]. It depended on [enslaved Africans] to work in the [cotton] fields.",
      ],
      img: "e-north-south",
    },
    {
      t: "States' rights",
      lines: [
        "Southern states wanted [states' rights]: each state solves its own problems.",
        "New states could allow slavery if they wanted.",
        "Many Northerners did [not] want slavery in the new states.",
      ],
      emoji: "⚖️",
    },
    {
      t: "Abolitionists",
      lines: [
        "An [abolitionist] wants to end slavery completely.",
        "[Black and white] abolitionists worked together to help people escape.",
        "[Frederick Douglass] was an abolitionist and a newspaper publisher.",
      ],
      img: "douglass",
    },
    {
      t: "Harriet Tubman",
      lines: [
        "[Harriet Tubman] was an abolitionist.",
        "She helped people [escape] slavery.",
      ],
      img: "tubman",
    },
    {
      t: "Abraham Lincoln",
      lines: [
        "In [1860], [Abraham Lincoln] was elected president.",
        "He wanted to [stop the spread of slavery].",
        "Southerners were furious. Many said his election could lead to war.",
      ],
      img: "lincoln",
    },
    // p. 66: The Civil War
    {
      t: "The South secedes",
      lines: [
        "[Secede] means to break away. [South Carolina] seceded first, then ten more Southern states.",
        "They called themselves the [Confederate States of America]. Their president was [Jefferson Davis].",
      ],
      img: "map-1861",
    },
    {
      t: "The war begins",
      lines: [
        "The [Civil War] began in April [1861], with a battle over [Fort Sumter] in South Carolina.",
        "Lincoln called for 75,000 volunteers to fight for the [Union].",
      ],
      emoji: "💥🏰",
    },
    {
      t: "A long war",
      lines: [
        "It went on for [four years]. More than [2.3 million] soldiers fought.",
        "More than [1 million] of them died or were wounded.",
        "Leaders: [Robert E. Lee] for the Confederacy, [Ulysses S. Grant] for the Union.",
      ],
      emoji: "⚔️",
    },
    {
      t: "The war ends",
      lines: [
        "On [April 9, 1865], General Lee [surrendered]. The [Union] won.",
        "Five days later, President Lincoln was [shot and killed].",
      ],
      img: "e-timeline",
    },
    // p. 68: Rebuilding the Nation
    {
      t: "Reconstruction",
      lines: [
        "[Reconstruction]: the time when the South was [rebuilt].",
        "Congress made rules to help the newly freed [African Americans].",
      ],
      emoji: "🔨🏠",
    },
    {
      t: "Three amendments",
      lines: [
        "The [13th Amendment] made slavery against the law.",
        "The [14th] gave equal rights. The [15th] gave African American men the right to [vote].",
      ],
      emoji: "📜🗳️",
    },
    {
      t: "Blanche Bruce",
      lines: [
        "During Reconstruction, the first [African Americans] were elected to Congress.",
        "[Blanche Bruce] was elected to the [Senate] in 1874. He represented Mississippi.",
      ],
      img: "bruce",
    },
    {
      t: "Segregation",
      lines: [
        "[Discrimination] is treating someone unfairly because of race.",
        "[Jim Crow laws] kept African Americans and white people apart: [segregation].",
      ],
      emoji: "🚫",
    },
    // p. 69: Changes for American Indians
    {
      t: "Reservations",
      lines: [
        "Americans settled the [Plains], where the Cheyenne, Lakota, Comanche and Nez Percé lived.",
        "The government forced them onto [reservations]: land set aside for American Indians.",
      ],
      emoji: "🪶⛺",
    },
    {
      t: "Chief Joseph",
      lines: [
        "Nez Percé leader [Chief Joseph] led his people from Oregon to Montana.",
        "United States troops [pursued] (chased) them. Finally they gave up.",
        "Chief Joseph said: “I will fight no more forever.”",
      ],
      img: "chief-joseph",
    },
  ],

  stories: [
    {
      t: "The Civil War",
      en: "Story · the North and the South",
      path: "story-civil-war.html",
      cover: { src: "img/lesson-3/map-1861.jpg" },
    },
  ],

  games: [
    {
      k: "side",
      t: "North or South?",
      en: "The Union or the Confederacy?",
      ic: "🧭",
      items: [
        side("More factories and cities", "🏭🏙️", true),
        side("Depended on enslaved Africans in the cotton fields", "🌾", false),
        side("Called the Confederate States of America", "map-1861", false),
        side("Called the Union", "map-1861", true),
        side("President: Abraham Lincoln", "lincoln", true),
        side("President: Jefferson Davis", "🎩", false),
        side("General Robert E. Lee", "🎖️", false),
        side("General Ulysses S. Grant", "⭐", true),
        side(
          "Won the Civil War",
          "🏆",
          true,
          "On April 9, 1865, Lee surrendered: the [Union] won.",
        ),
      ],
    },
    {
      k: "who",
      t: "Who was it?",
      en: "The people of the lesson",
      ic: "🧑",
      items: [
        mc(
          "He was elected president in 1860. He wanted to stop the spread of slavery.",
          who("Abraham Lincoln", "Jefferson Davis", "Frederick Douglass"),
          { emoji: "🗳️" },
        ),
        mc(
          "He was an abolitionist and a newspaper publisher.",
          who("Frederick Douglass", "Abraham Lincoln", "Chief Joseph"),
          { emoji: "📰" },
        ),
        mc(
          "She helped people escape slavery.",
          who("Harriet Tubman", "Blanche Bruce", "Robert E. Lee"),
          { emoji: "🏃" },
        ),
        mc(
          "He was the president of the Confederate States.",
          who("Jefferson Davis", "Abraham Lincoln", "Ulysses S. Grant"),
          { img: "map-1861" },
        ),
        mc(
          "He was a Confederate general. He surrendered in 1865.",
          who("Robert E. Lee", "Ulysses S. Grant", "Frederick Douglass"),
          { emoji: "🏳️" },
        ),
        mc(
          "He was elected to the Senate in 1874.",
          who("Blanche Bruce", "Chief Joseph", "Jefferson Davis"),
          { emoji: "🏛️" },
        ),
        mc(
          "He said: “I will fight no more forever.”",
          who("Chief Joseph", "Abraham Lincoln", "Robert E. Lee"),
          { emoji: "🪶" },
        ),
      ],
    },
    {
      k: "time",
      t: "What came first?",
      en: "Put the events in order",
      ic: "📅",
      items: [
        {
          type: "order",
          t: "From 1848 to 1874",
          ask: "Put the events in order: the oldest first.",
          hint: "Gold was found in 1848.",
          img: "e-timeline",
          steps: [
            { say: "1848: gold is found in California.", img: "san-francisco" },
            { say: "1860: Lincoln is elected president.", img: "lincoln" },
            { say: "1861: the war begins at Fort Sumter.", e: "💥" },
            { say: "1865: General Lee surrenders.", e: "🏳️" },
            {
              say: "1874: Blanche Bruce is elected to the Senate.",
              img: "bruce",
            },
          ],
        },
      ],
    },
    {
      k: "words",
      t: "Which word?",
      en: "The lesson's words",
      ic: "🔤",
      items: [
        mc(
          "A person who comes to live in a new land.",
          [
            ["Immigrant", "🧳"],
            ["Abolitionist", "douglass"],
            ["Industry", "🏭"],
          ],
          { emoji: "🚢" },
        ),
        mc(
          "A person who wants to end slavery completely.",
          [
            ["Abolitionist", "tubman"],
            ["Immigrant", "🧳"],
            ["Reservation", "⛺"],
          ],
          { img: "douglass" },
        ),
        mc(
          "To break away from the Union.",
          [
            ["Secede", "✂️"],
            ["Pursue", "🏃"],
            ["Reconstruction", "🔨"],
          ],
          { img: "map-1861" },
        ),
        mc(
          "The time when the South was rebuilt.",
          [
            ["Reconstruction", "🔨🏠"],
            ["Segregation", "🚫"],
            ["Industry", "🏭"],
          ],
          { emoji: "🔨" },
        ),
        mc(
          "Keeping African Americans and white people apart.",
          [
            ["Segregation", "🚫"],
            ["Reconstruction", "🔨🏠"],
            ["Manifest Destiny", "🧭"],
          ],
          { emoji: "↔️" },
        ),
        mc(
          "Land set aside for American Indians.",
          [
            ["Reservation", "⛺"],
            ["Territory", "🗺️"],
            ["Industry", "🏭"],
          ],
          { img: "chief-joseph" },
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "bk-choose",
      t: "Choose",
      en: "Booklet · Exercise sheet A",
      ic: "🔘",
      from: "Booklet · Lesson 3 exercise sheet · A (pp. 14–15)",
      keep: true,
      items: [
        mc(
          "___ is the idea that the United States should grow bigger and bigger.",
          [
            ["Manifest Destiny", "🧭🌅"],
            ["Fort Sumter", "💥🏰"],
          ],
          { emoji: "🇺🇸➡️", two: true },
        ),
        mc(
          "The Louisiana Purchase ___ the size of the United States.",
          [
            ["doubled", "✖️2️⃣"],
            ["tripled", "✖️3️⃣"],
          ],
          {
            img: "../lesson-2/map-1804",
            two: true,
            x: "The country became [2 times] bigger: it doubled.",
          },
        ),
        mc(
          "There were big changes in transportation and communication such as ___.",
          [
            ["the Erie Canal and the telegraph", "🚢📠"],
            ["cell phones and cars", "📱🚗"],
          ],
          {
            img: "pony-express",
            two: true,
            x: "In the 1800s there were no cell phones or cars: there were [canals], [railroads] and the [telegraph].",
          },
        ),
        mc(
          "The Northerners did not want ___ in the new states.",
          [
            ["slavery", "⛓️"],
            ["independence", "🗽"],
          ],
          { img: "e-north-south", two: true },
        ),
        mc(
          "A\\An ___ is a person who wants to end slavery completely.",
          [
            ["abolitionist", "douglass"],
            ["immigrant", "🧳"],
          ],
          { emoji: "⛓️💥", two: true },
        ),
        mc(
          "___ was known as an abolitionist and newspaper publisher.",
          who("Frederick Douglass", "Abraham Lincoln", "Harriet Tubman"),
          { emoji: "📰" },
        ),
        mc(
          "The ___ won the Civil War.",
          [
            ["Union", "🏭"],
            ["Confederacy", "🌾"],
            ["British", "🇬🇧"],
          ],
          { img: "map-1861" },
        ),
        mc(
          "The Civil War began in ___.",
          [
            ["1861", "💥"],
            ["1860", "🗳️"],
            ["1865", "🕊️"],
          ],
          {
            img: "e-timeline",
            x: "Lincoln was elected in 1860, the war began in [1861] and ended in 1865.",
          },
        ),
        mc(
          "During the Civil War, ___ million soldiers fought in the war and more than 1 million of them died or were wounded.",
          [
            ["2.3", "⚔️"],
            ["2.5", "5️⃣"],
            ["2.2", "2️⃣"],
          ],
          { emoji: "🪖" },
        ),
        mc(
          "One of the amendments was to ___ in the United States.",
          [
            ["end slavery", "⛓️💥"],
            ["raise taxes", "💵⬆️"],
          ],
          {
            emoji: "📜",
            two: true,
            x: "The [13th Amendment] made slavery against the law.",
          },
        ),
      ],
    },
    {
      k: "bk-fill",
      t: "Fill in the blanks",
      en: "Booklet · Exercise sheet B",
      ic: "📝",
      from: "Booklet · Lesson 3 exercise sheet · B (p. 15) · words: Fort Sumter, Harriet Tubman, west, immigrant, North, enslaved Africans, Confederate",
      keep: true,
      items: [
        fill(
          "Americans started moving ___ in search of land, gold, and furs.",
          ["west", "North", "Fort Sumter"],
          "⛏️🦫",
        ),
        fill(
          "A/An ___ is a person who moves to a new land.",
          ["immigrant", "Confederate", "west"],
          "🚢",
        ),
        fill(
          "The ___ had a larger population and more factories.",
          ["North", "Confederate", "enslaved Africans"],
          "🏭🏙️",
        ),
        fill(
          "The South depended on ___ to work in cotton fields.",
          ["enslaved Africans", "immigrant", "Harriet Tubman"],
          "🌾",
        ),
        fill(
          "___ was an abolitionist who helped African people to escape slavery.",
          ["Harriet Tubman", "Fort Sumter", "North"],
          "🏃",
        ),
        fill(
          "The Southern states called themselves the ___ states of America.",
          ["Confederate", "North", "immigrant"],
          "map-1861",
        ),
        fill(
          "The Civil War started with a battle over ___.",
          ["Fort Sumter", "west", "Confederate"],
          "💥",
        ),
      ],
    },
    {
      k: "bk-tf",
      t: "Correct or wrong?",
      en: "Booklet · Exercise sheet E (✓ / ✗ and correct)",
      ic: "✅",
      from: "Booklet · Lesson 3 exercise sheet · E (p. 16)",
      keep: true,
      items: [
        tf(
          "The North depended on farming.",
          false,
          "e-north-south",
          "The [South] depended on farming. The North had more factories.",
        ),
        tf(
          "John F. Kennedy became president in 1860.",
          false,
          "lincoln",
          "[Abraham Lincoln] became president in 1860.",
        ),
        tf(
          "Congress made four amendments after the Civil War.",
          false,
          "📜📜📜",
          "Congress made [three] amendments after the Civil War: the 13th, 14th and 15th.",
        ),
        tf(
          "The Civil War ended on August 9, 1865.",
          false,
          "🏳️",
          "The Civil War ended on [April 9], 1865.",
        ),
        tf(
          "The Northerners States were called the Confederacy.",
          false,
          "map-1861",
          "The [Southern] states were called the Confederacy. The Northern states were the [Union].",
        ),
        tf(
          "Black and white abolitionists worked together to help Africans escape slavery.",
          true,
          "douglass",
          "Black and white [abolitionists] worked together to help people escape.",
        ),
        tf(
          "Abraham Lincoln wanted to stop the spread of slavery.",
          true,
          "lincoln",
          "Lincoln wanted to [stop the spread] of slavery.",
        ),
      ],
    },
    {
      k: "bk-answer",
      t: "Answer",
      en: "Booklet · Exercise sheet F",
      ic: "✏️",
      from: "Booklet · Lesson 3 exercise sheet · F (p. 16)",
      items: [
        // unverified: no model answer; written from the book pp. 65–66
        {
          type: "open",
          q: "Why did the southern states [secede] (leave) the United States?",
          a: "In 1860 [Abraham Lincoln] was elected president. He wanted to stop the spread of [slavery]. The South depended on enslaved Africans and wanted [states' rights], so the Southern states left the Union.",
          img: "map-1861",
        },
        {
          type: "open",
          q: "What were the new ways that helped people [travel] and [communicate] in the 1800s?",
          a: "[Railroads], better roads and the [Erie Canal] helped people travel. The [telegraph] (and the Pony Express) helped people communicate.",
          img: "pony-express",
        },
      ],
    },
    {
      k: "wsearch",
      t: "Civil War word search",
      en: "Booklet · word search (the lesson's words)",
      ic: "🔎",
      from: "Booklet · Civil War Word Search Puzzle (p. 18)",
      items: [
        {
          type: "wsearch",
          q: "Find the Civil War words.",
          img: "map-1861",
          words: [
            "UNION",
            "NORTH",
            "SOUTH",
            "SLAVERY",
            "SECESSION",
            "REBEL",
            "CANNONS",
            "RICHMOND",
            "YANKEE",
            "CONFEDERACY",
          ],
          size: 12,
        },
      ],
    },
    {
      k: "check",
      t: "Book questions",
      en: "Reading Checks and Lesson 3 Check",
      ic: "📘",
      from: "Book pp. 67–69 · Reading Checks 1–2, Lesson 3 Check 3–5",
      keep: true,
      items: [
        mc(
          "Analyze the map. Which has more land, the [Union] States or the [Confederate] States?",
          [
            ["The Union States", "🟦"],
            ["The Confederate States", "⬜"],
          ],
          {
            img: "map-1861",
            two: true,
            x: "The blue Union states and the yellow Union territories cover much more land than the grey Confederate states.",
          },
        ),
        // unverified: open questions, model answers written from the book
        {
          type: "open",
          q: "Causes and effects of the Civil War: what happened after the Southern states [seceded]? What caused [Reconstruction]?",
          a: "Southern states secede from the Union → the [Civil War] begins (1861). The Union wins the war (1865) → [Reconstruction] begins.",
          img: "e-timeline",
        },
        {
          type: "open",
          q: "Jim Crow laws show conflict between white Americans and African Americans. Identify an example of [cooperation] between them from the 1800s.",
          a: "[Black and white abolitionists] worked together to help people escape slavery.",
          img: "douglass",
        },
        {
          type: "open",
          q: "Many Americans moved west in the 1800s. Describe how your family or a family you know has been shaped by [moving].",
          a: "Example: my family moved to a new country. We learned a new language, made new friends and found new work.",
          emoji: "🧳🏠",
        },
        {
          type: "open",
          q: "Identify the issues that people in the North and South viewed differently. Choose one issue and explain how it led to war.",
          a: "[Slavery] and [states' rights]. The South wanted slavery in new states; the North did not. When Lincoln was elected, the South seceded, and the war began.",
          img: "e-north-south",
        },
      ],
    },
  ],
};
