// The American Revolution (myWorld Interactive 4, Chapter 2 Lesson 2, book p. 57). Engine: shared/story.js.
// Text exactly as printed, cut into short pages. No Questions tab (the booklet's questions are in lesson-2.html).
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-2.py
window.STORY = {
  key: "ss4-revolution",
  subject: "Social Studies",
  title: "The American Revolution",
  kind: "A New Nation · Book p. 57",
  cover: "img/lesson-2/washington-army.jpg",
  lesson: { path: "lesson-2.html", label: "Lesson 2" },
  hub: "../index.html",
  question: "How did the 13 English colonies become a new, independent nation?",
  gloss: {
    expensive: "costing a lot of money",
    tax: "money people must pay to the government",
    colonists: "people who live in a colony",
    stamp: "the Stamp Act: a tax on paper",
    townshend: "the Townshend Acts: taxes on tea, glass and paint",
    speech: "a talk in front of people",
    opposing: "saying no to",
    ruler: "the king or queen who rules a country",
    angered: "made angry",
    proclamation: "an official order",
    imaginary: "not real, only on a map",
    expanding: "getting bigger",
    feared: "were afraid",
    declaration: "an official paper that says something",
    independence: "freedom from rule by others",
    independent: "free, ruled by nobody else",
    remain: "stay",
    organizing: "forming a group",
    continental: "of all the colonies together",
    army: "the soldiers of a country",
    general: "the leader of an army",
    furious: "very, very angry",
    soldiers: "people who fight in an army",
    movement: "people working together for one idea",
    battles: "fights between armies",
    navy: "the ships and sailors of a country",
    defeat: "a fight that is lost",
    defeated: "won against",
    involved: "taking part",
    battlefield: "the place where a battle is fought",
    victory: "a win",
  },
  pages: [
    {
      ch: "The American Revolution",
      emoji: "💷📜",
      text: [
        "In 1763, the British won an expensive war against France in North America. The British wanted to tax the colonists to help pay for it. They passed tax laws such as the Stamp Act and the Townshend Acts.",
      ],
      easy: "Britain needed money after a war. So Britain made the colonists pay taxes.",
    },
    {
      ch: "The American Revolution",
      emoji: "😠🗣️",
      text: [
        "The colonists were very angry. Patrick Henry, a member of the Virginia House of Burgesses, gave a speech opposing the Stamp Act.",
      ],
      easy: "The colonists were angry. Patrick Henry spoke against the Stamp Act.",
    },
    {
      ch: "The American Revolution",
      emoji: "👑⛰️",
      text: [
        "The British ruler, King George III, did something else that angered colonists. The Proclamation of 1763 drew an imaginary line along the Appalachian Mountains. He said no colonists could live west of the line. Since colonies were expanding, colonists wanted to be able to move west to find new land.",
      ],
      easy: "King George III said: no colonists west of the Appalachian Mountains. The colonists wanted to move west.",
    },
    {
      ch: "The American Revolution",
      emoji: "✍️📜",
      text: [
        "Many colonists feared that they were losing their right to self-government. So, in 1776, leaders from the different colonies met in Philadelphia and asked Thomas Jefferson to write the Declaration of Independence.",
      ],
      easy: "In 1776, the leaders met in Philadelphia. Thomas Jefferson wrote the Declaration of Independence.",
    },
    {
      ch: "The American Revolution",
      emoji: "🗽",
      text: [
        "The Declaration marks the time when the colonies broke free from British rule and became independent. However, some Americans and most British disagreed and wanted the colonies to remain under Britain's government.",
      ],
      easy: "The colonies said: we are free from Britain now. But Britain did not agree.",
    },
    {
      ch: "The American Revolution",
      img: "img/lesson-2/washington-army.jpg",
      text: [
        "The colonists began organizing and planning to fight for independence. When the war started in 1775, they formed the Continental Army. Its leader was General George Washington of Virginia. King George III was furious. He sent soldiers to the colonies. Their job was to stop the independence movement.",
      ],
      easy: "The war started in 1775. George Washington led the Continental Army. The king sent soldiers to stop them.",
    },
    {
      ch: "The American Revolution",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "⚔️", x: 50, y: 45, s: 26, a: "shake" },
          { e: "🇺🇸", x: 20, y: 70, s: 18 },
          { e: "🇬🇧", x: 80, y: 70, s: 18 },
        ],
        cap: "Trenton and Saratoga",
      },
      text: [
        "The colonists were successful in small, early battles. But they faced a strong British army and navy. Soon it looked as if the colonists might lose. After a defeat in New York, Washington won a battle at Trenton, New Jersey.",
        "In 1777, the Continental Army won an important battle. They defeated the British at Saratoga, New York. Seeing that the Americans could win, France agreed to help the colonists.",
      ],
      easy: "The British army was strong. But in 1777 the Americans won at Saratoga, and France helped them.",
    },
    {
      ch: "The American Revolution",
      img: "img/lesson-2/e-timeline-war.jpg",
      text: [
        "Across the colonies, more people became involved. About 5,000 Black colonists joined the Continental Army. Women worked at home to help. Some fought on the battlefield. In 1781, George Washington led his soldiers to victory at Yorktown, Virginia. By 1783, the long war would finally be over.",
      ],
      easy: "5,000 Black colonists and many women helped. In 1781 Washington won at Yorktown. In 1783 the war ended.",
    },
  ],
  summary: [
    {
      t: "Why",
      emoji: "💷😠",
      text: "Britain made the colonists pay taxes, and King George III said they could not move west.",
    },
    {
      t: "1776",
      emoji: "✍️📜",
      text: "Thomas Jefferson wrote the Declaration of Independence: the colonies broke free from Britain.",
    },
    {
      t: "The war",
      img: "img/lesson-2/washington-army.jpg",
      text: "The war started in 1775. George Washington led the Continental Army.",
    },
    {
      t: "Help",
      emoji: "🇫🇷🧑🏿",
      text: "After the win at Saratoga in 1777, France helped. 5,000 Black colonists and many women helped too.",
    },
    {
      t: "The end",
      img: "img/lesson-2/e-timeline-war.jpg",
      text: "1781: victory at Yorktown. 1783: the war was over. The colonies were independent.",
    },
  ],
};
