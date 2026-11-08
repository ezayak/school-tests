// The Civil War (myWorld Interactive 4, Chapter 2 Lesson 3, "The North and the South" and "The Civil War", book pp. 66–67). Engine: shared/story.js.
// Text exactly as printed, cut into short pages; the title is the book's second heading. No Questions tab.
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-3.py
window.STORY = {
  key: "ss4-civil-war",
  subject: "Social Studies",
  title: "The Civil War",
  kind: "Growth and Civil War · Book pp. 66–67",
  cover: "img/lesson-3/map-1861.jpg",
  lesson: { path: "lesson-3.html", label: "Lesson 3" },
  hub: "../index.html",
  question: "What divided the growing nation and led to the Civil War?",
  gloss: {
    largely: "mostly",
    farming: "growing crops and animals",
    region: "an area",
    slavery: "owning people and forcing them to work",
    enslaved: "not free, forced to work",
    cotton: "a plant used to make cloth",
    factories: "buildings where machines make things",
    cloth: "material for clothes",
    growers: "farmers",
    relied: "depended, needed",
    argued: "said strongly",
    rights: "what people are allowed to do",
    belief: "an idea you think is true",
    labor: "work",
    abolitionists: "people who want to end slavery",
    abolitionist: "a person who wants to end slavery",
    abolish: "to end",
    escape: "to get away",
    published: "printed",
    protected: "kept safe",
    horrors: "very bad, terrible things",
    divided: "split into parts",
    elected: "chosen by voting",
    furious: "very, very angry",
    spread: "growing to more places",
    threatened: "said they would do something bad",
    union: "the United States (the North)",
    seceded: "broke away",
    secede: "to break away",
    withdraw: "to leave",
    confederate: "of the Southern states that broke away",
    nations: "countries",
    battle: "a fight between armies",
    fort: "a place for soldiers with walls",
    volunteers: "people who choose to help",
    wounded: "hurt",
    general: "the leader of an army",
    defeated: "won against",
    confederacy: "the Southern states that broke away",
    surrendered: "gave up",
    terrible: "very bad",
    healing: "getting well again",
  },
  pages: [
    {
      ch: "The North and the South",
      img: "img/lesson-3/e-north-south.jpg",
      text: [
        "The North and the South had different ways of life. The North had more people, cities, and factories. The South was largely a farming region. At the heart of all of the differences was slavery.",
      ],
      easy: "The North had cities and factories. The South had farms. The big difference was slavery.",
    },
    {
      ch: "The North and the South",
      emoji: "🌾⛓️",
      text: [
        "The South depended on enslaved Africans to work in cotton fields. Northern factories needed cotton to make cloth. As a result, Southern growers relied more on enslaved workers.",
      ],
      easy: "In the South, enslaved Africans were forced to work in the cotton fields.",
    },
    {
      ch: "The North and the South",
      emoji: "⚖️",
      text: [
        "Southern states argued for states’ rights. This was a belief that each state should solve its own problems. It also meant that new states could allow slavery if they wanted.",
      ],
      easy: "The South wanted states' rights: each new state could choose to have slavery.",
    },
    {
      ch: "The North and the South",
      img: "img/lesson-3/douglass.jpg",
      text: [
        "Many Northerners, however, did not want slavery in new states. They believed in free labor. Many were abolitionists. An abolitionist is someone who wants to abolish, or end, slavery completely.",
      ],
      easy: "Many people in the North did not want slavery. Abolitionists wanted to end it.",
    },
    {
      ch: "The North and the South",
      img: "img/lesson-3/tubman.jpg",
      text: [
        "Black and white abolitionists worked together to help men, women, and children escape from slavery. Abolitionists published newspapers and spoke out at public meetings. They protected enslaved people who had run away. They told about the horrors of slavery.",
      ],
      easy: "Black and white abolitionists worked together. They helped people escape from slavery.",
    },
    {
      ch: "The North and the South",
      img: "img/lesson-3/lincoln.jpg",
      text: [
        "By the mid-1800s, the nation was growing more divided and angry. In 1860, Abraham Lincoln was elected president. Southerners were furious after his election. Lincoln wanted to stop the spread of slavery.",
      ],
      easy: "In 1860, Abraham Lincoln became president. He wanted to stop slavery from spreading.",
    },
    {
      ch: "The North and the South",
      emoji: "😠💥",
      text: [
        "Southern states threatened to leave the Union. Many said Lincoln’s election could lead to war. Sadly, it did.",
      ],
      easy: "The Southern states said they would leave. Then a war came.",
    },
    {
      ch: "The Civil War",
      img: "img/lesson-3/map-1861.jpg",
      text: [
        "After the election, South Carolina seceded from the Union. To secede means to break away from or officially withdraw. Soon after, ten more Southern states seceded. They called themselves the Confederate States of America and elected a president: Jefferson Davis.",
      ],
      easy: "South Carolina and ten more Southern states left. They became the Confederate States of America.",
    },
    {
      ch: "The Civil War",
      emoji: "🇺🇸✂️",
      text: [
        "The United States had become two nations. Southerners said they had a right to do this. President Lincoln said they did not.",
      ],
      easy: "Now there were two countries. Lincoln said: the South cannot do this.",
    },
    {
      ch: "The Civil War",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🏰", x: 50, y: 55, s: 30 },
          { e: "💥", x: 30, y: 35, s: 18, a: "pop:0.3 pulse:1" },
          { e: "💥", x: 70, y: 30, s: 14, a: "pop:0.8 pulse:1.5" },
        ],
        cap: "Fort Sumter, April 1861",
      },
      text: [
        "The Civil War began in April 1861. It started with a battle over Fort Sumter. This fort belonged to the United States, but it was in South Carolina, a Confederate state.",
      ],
      easy: "The Civil War began in April 1861, with a battle at Fort Sumter.",
    },
    {
      ch: "The Civil War",
      emoji: "🪖⚔️",
      text: [
        "Soon the president called for 75,000 volunteers to fight for the Union. People believed the war would be over soon. They were wrong. It would go on for four years. More than 2.3 million soldiers fought in the war. More than 1 million of them died or were wounded.",
      ],
      easy: "The war lasted four years. 2.3 million soldiers fought. More than 1 million died or were hurt.",
    },
    {
      ch: "The Civil War",
      emoji: "🎖️⭐",
      text: [
        "The North and South fought on land and at sea. They fought along the Mississippi River and as far west as New Mexico. Each side had strong leaders. Robert E. Lee of Virginia was a Confederate general. Ulysses S. Grant of Ohio was a Union general.",
      ],
      easy: "Robert E. Lee led the South. Ulysses S. Grant led the North.",
    },
    {
      ch: "The Civil War",
      img: "img/lesson-3/e-timeline.jpg",
      text: [
        "Finally, the Union defeated the Confederacy. On April 9, 1865, General Lee surrendered. The terrible war was over. Now the job of healing the nation began.",
      ],
      easy: "On April 9, 1865, the South gave up. The North won. The war was over.",
    },
  ],
  summary: [
    {
      t: "Two ways of life",
      img: "img/lesson-3/e-north-south.jpg",
      text: "The North had cities and factories. The South had farms and depended on enslaved Africans.",
    },
    {
      t: "Abolitionists",
      img: "img/lesson-3/tubman.jpg",
      text: "Black and white abolitionists worked together to end slavery and help people escape.",
    },
    {
      t: "1860",
      img: "img/lesson-3/lincoln.jpg",
      text: "Abraham Lincoln was elected president. He wanted to stop the spread of slavery.",
    },
    {
      t: "The South secedes",
      img: "img/lesson-3/map-1861.jpg",
      text: "Eleven Southern states left the Union: the Confederate States of America.",
    },
    {
      t: "The war",
      emoji: "💥🏰",
      text: "1861: the war began at Fort Sumter. It lasted four years; 2.3 million soldiers fought.",
    },
    {
      t: "The end",
      img: "img/lesson-3/e-timeline.jpg",
      text: "April 9, 1865: General Lee surrendered. The Union won.",
    },
  ],
};
