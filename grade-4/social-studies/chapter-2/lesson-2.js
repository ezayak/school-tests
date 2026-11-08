// Social Studies · Grade 4 · Chapter 2 · Lesson 2 « A New Nation » (myWorld Interactive 4, book pp. 56–61).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Learn: the book's text in easy words (picture cards), the book's vocabulary, the stories « The American Revolution » (p. 57)
// and « Lewis and Clark Explore the West » (p. 61), the American flag (booklet p. 13).
// Exercises: Term 2 booklet, Lesson 2 exercise sheet (pp. 8–10: A fill in, B ✓/✗, C choose, D answer), the flag worksheet (p. 13),
// and the book's Reading Checks and Lesson 2 Check. No answer key: answers from the book (grade-4/social-studies/UNVERIFIED.md).
// Left out: the book's Map and Graph Skills (pp. 62–63, Spanish claims timeline), the colouring of booklet pp. 12–13.
// Pictures: .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-2.py

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-2/ or 1–2 emoji.
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
  "George Washington": "washington-army",
  "Thomas Jefferson": "✍️📜",
  "Patrick Henry": "🗣️",
  "King George III": "👑",
  "Daniel Shays": "shays",
  "James Madison": "madison",
  Napoleon: "🇫🇷",
  "Lewis and Clark": "🛶",
  Sacagawea: "🧭",
};
const who = (...names) => names.map((n) => [n, WHO[n]]);
// the booklet's word box (sheet A), each word with a picture
const BOX = {
  "George Washington": "washington-army",
  Britain: "🇬🇧",
  "Thomas Jefferson": "✍️📜",
  Independence: "🗽",
  "Townshend Acts": "💷📜",
  confederation: "🤝",
  "Mississippi River": "🏞️",
  Philadelphia: "🏛️",
};
const fill = (q, words, p, x) =>
  mc(
    q,
    words.map((w) => [w, BOX[w]]),
    { ...pic(p), ...(x ? { x } : {}) },
  );
// ✓ / ✗: a: true (correct) or false; x = the corrected sentence
const tf = (q, a, p, x) => ({
  type: "tf",
  q,
  a,
  yes: ["Correct", "Wrong"],
  ...pic(p),
  ...(x ? { x } : {}),
});

window.LESSON = {
  n: 2,
  key: "ss4-c2-l2",
  grade: 4,
  title: "A New Nation",
  unit: "Chapter 2 · Lesson 2",
  book: "Book pp. 56–61",
  cover: "washington-army",
  question: {
    q: "How did the 13 English colonies become a new, [independent] nation?",
    a: "They declared [independence] in 1776 and won the war against Britain in 1783. Then they wrote the [Constitution], chose [George Washington] as president, and the country grew to the west.",
    img: "washington-army",
  },
  // the book's Vocabulary and Academic Vocabulary (p. 56), + the booklet's words
  words: [
    { w: "Independence", m: "freedom from rule by others" },
    { w: "Confederation", m: "a union of states that agree to work together" },
    { w: "Congress", m: "a group of people who make a country's laws" },
    { w: "Constitution", m: "a plan of government" },
    { w: "Delegate", m: "a person who speaks for a group of people" },
    { w: "Ratify", m: "to approve" },
    { w: "Amendment", m: "a change or addition (to the Constitution)" },
    { w: "Bill of Rights", m: "the first ten amendments" },
    { w: "Territory", m: "land governed by a country, but not a state" },
    { w: "Senate", m: "a group where every state has two members" },
    { w: "Expedition", m: "a journey made for a special purpose" },
    { w: "Organize", m: "to form a group" },
    { w: "Compromise", m: "an agreement" },
  ],

  ideas: [
    // p. 56
    {
      t: "Independence",
      lines: [
        "Britain ruled the [13 colonies].",
        "In July [1776], in [Philadelphia], more than 50 men said: these colonies are now free and [independent].",
        "[Independence] is freedom from rule by others.",
      ],
      emoji: "🗽📜",
    },
    // p. 57: The American Revolution
    {
      t: "Taxes",
      lines: [
        "In 1763, Britain won an expensive war against France.",
        "To pay for it, Britain [taxed] the colonists: the [Stamp Act] and the [Townshend Acts].",
        "The colonists were very angry. [Patrick Henry] gave a speech against the Stamp Act.",
      ],
      emoji: "💷😠",
    },
    {
      t: "A line on the map",
      lines: [
        "[King George III] drew a line along the [Appalachian Mountains] (1763).",
        "No colonists could live west of the line.",
        "But the colonists wanted to move west, to find new land.",
      ],
      emoji: "👑⛰️",
    },
    {
      t: "The Declaration of Independence",
      lines: [
        "In [1776], leaders of the colonies met in [Philadelphia].",
        "[Thomas Jefferson] wrote the [Declaration of Independence].",
        "The colonies broke free from Britain. But many British people wanted to keep them.",
      ],
      emoji: "✍️📜",
    },
    {
      t: "The Continental Army",
      lines: [
        "The war started in [1775]. The colonists [organized] the [Continental Army].",
        "Its leader was General [George Washington].",
        "[King George III] was furious. He sent soldiers to stop the colonists.",
      ],
      img: "washington-army",
    },
    {
      t: "Winning the war",
      lines: [
        "The British army and navy were strong. After a defeat in New York, Washington won at [Trenton].",
        "[1777]: an important win at [Saratoga], New York. Then [France] helped the colonists.",
        "[1781]: Washington won at [Yorktown], Virginia. [1783]: the war was over.",
      ],
      img: "e-timeline-war",
    },
    {
      t: "Everyone helped",
      lines: [
        "About [5,000 Black colonists] joined the Continental Army.",
        "[Women] worked at home to help. Some fought in the battles.",
      ],
      emoji: "🧑🏿👩",
    },
    // p. 58: A Hard Job
    {
      t: "A hard job",
      lines: [
        "The 13 new states called themselves the [United States of America].",
        "But each state felt independent: they did not work together.",
        "[1781]: the [Articles of Confederation]. A [confederation] is a union of states that agree to work together.",
      ],
      emoji: "🤝",
    },
    {
      t: "Congress",
      lines: [
        "A [congress] is a group of people who make a country's [laws].",
        "The leaders of the states argued about [money]: each state printed its own money.",
        "They also argued about who owned the land in the west.",
      ],
      img: "congress",
    },
    {
      t: "Shays' Rebellion",
      lines: [
        "Taxes went up, and people had little money.",
        "[1786]: [Daniel Shays] and about [1,200 farmers] attacked government buildings.",
        "It was time for change.",
      ],
      img: "shays",
    },
    {
      t: "A new Constitution",
      lines: [
        "A [constitution] is a plan of government. The plan is still used today.",
        "[May 1787]: 55 [delegates] met in Philadelphia. A [delegate] speaks for a group of people.",
        "[James Madison] helped a lot: he is called the Father of the Constitution.",
      ],
      img: "madison",
    },
    // p. 59
    {
      t: "A compromise",
      lines: [
        "Big states and small states all wanted the same power.",
        "They made a [compromise] (an agreement):",
        "the [Senate]: 2 members for every state; the [House of Representatives]: more for a big state.",
      ],
      img: "e-senate-house",
    },
    {
      t: "Not another king",
      lines: [
        "Some people wanted a [strong central government].",
        "Others wanted the [states] to have more power: a strong leader could be like another [king].",
        "The Constitution had to balance this.",
      ],
      emoji: "⚖️👑",
    },
    {
      t: "Ratify and amendments",
      lines: [
        "[Ratify] means to approve. One by one, each state ratified the Constitution.",
        "An [amendment] is a change or addition.",
        "The first ten amendments are the [Bill of Rights].",
      ],
      emoji: "✅📜",
    },
    {
      t: "The First Amendment",
      lines: [
        "It protects freedom of [religion], of [speech] and of the [press] (newspapers).",
        "People can [gather] peacefully, and [ask the government] to make changes.",
      ],
      img: "first-amendment",
    },
    {
      t: "The first president",
      lines: [
        "On [April 30, 1789], [George Washington] became the first [president].",
        "He promised to “preserve, protect and defend the Constitution.”",
      ],
      img: "e-timeline-nation",
    },
    // p. 60: The New Nation Grows
    {
      t: "Territories",
      lines: [
        "After independence, the nation went from the [Atlantic Ocean] to the [Mississippi River].",
        "A [territory] is land governed by a country, but it is not a state.",
        "The Northwest Territory became Ohio, Indiana, Illinois, Michigan and Wisconsin.",
      ],
      img: "map-1804",
    },
    {
      t: "The Louisiana Purchase",
      lines: [
        "[1803]: President [Thomas Jefferson] bought the [Louisiana Territory] from [Napoleon], the leader of France.",
        "It cost [$15 million]: less than 3 cents an acre.",
        "It [doubled] the size of the United States.",
      ],
      img: "map-1804",
    },
    // p. 61: Lewis and Clark
    {
      t: "Lewis and Clark",
      lines: [
        "Jefferson sent [Lewis and Clark] on an [expedition] to the West, to find a river route to the Pacific.",
        "[Sacagawea], an American Indian, was their guide.",
        "The trip was almost [8,000 miles] and took more than [2 years].",
      ],
      img: "map-1804",
    },
    // booklet p. 13: the American flag
    {
      t: "The American flag",
      lines: [
        "The flag is a [rectangle].",
        "It has [13 stripes]: [7 red] and [6 white], for the 13 first colonies.",
        "It has [50 stars] on [blue], one for each state.",
      ],
      img: "e-flag",
    },
    {
      t: "The colours of the flag",
      lines: [
        "[Red]: being brave and strong (valor and hardiness).",
        "[White]: purity and innocence.",
        "[Blue]: watching carefully, not giving up, and justice (vigilance, perseverance and justice).",
      ],
      img: "e-flag",
    },
  ],

  stories: [
    {
      t: "The American Revolution",
      en: "Story · 1763–1783",
      path: "story-revolution.html",
      cover: { src: "img/lesson-2/washington-army.jpg" },
    },
    {
      t: "Lewis and Clark Explore the West",
      en: "Story · the expedition",
      path: "story-lewis-clark.html",
      cover: { src: "img/lesson-2/map-1804.jpg" },
    },
  ],

  games: [
    {
      k: "who",
      t: "Who was it?",
      en: "The people of the lesson",
      ic: "🧑",
      items: [
        mc(
          "He was the leader of the Continental Army.",
          who("George Washington", "Patrick Henry", "Thomas Jefferson"),
          { emoji: "⚔️" },
        ),
        mc(
          "He wrote the Declaration of Independence.",
          who("Thomas Jefferson", "George Washington", "King George III"),
          { emoji: "📜" },
        ),
        mc(
          "He gave a speech against the Stamp Act.",
          who("Patrick Henry", "Daniel Shays", "James Madison"),
          { emoji: "💷" },
        ),
        mc(
          "He was the British ruler. He sent soldiers to stop the colonists.",
          who("King George III", "Napoleon", "George Washington"),
          { emoji: "💂" },
        ),
        mc(
          "He and 1,200 farmers attacked government buildings.",
          who("Daniel Shays", "Patrick Henry", "Thomas Jefferson"),
          { emoji: "😠" },
        ),
        mc(
          "He is called the Father of the Constitution.",
          who("James Madison", "Daniel Shays", "King George III"),
          { emoji: "📜" },
        ),
        mc(
          "He sold the Louisiana Territory to the United States.",
          who("Napoleon", "King George III", "James Madison"),
          { img: "map-1804" },
        ),
        mc(
          "They led the expedition to the West.",
          who("Lewis and Clark", "Sacagawea", "Napoleon"),
          { img: "map-1804" },
        ),
        mc(
          "She was the guide of Lewis and Clark.",
          who("Sacagawea", "Lewis and Clark", "Napoleon"),
          { emoji: "🛶" },
        ),
        mc(
          "He became the first president, on April 30, 1789.",
          who("George Washington", "Thomas Jefferson", "James Madison"),
          { emoji: "🇺🇸" },
        ),
      ],
    },
    {
      k: "words",
      t: "Which word?",
      en: "The lesson's words",
      ic: "🔤",
      items: [
        mc(
          "Freedom from rule by others.",
          [
            ["Independence", "🗽"],
            ["Territory", "🗺️"],
            ["Amendment", "✏️📜"],
          ],
          { emoji: "🕊️" },
        ),
        mc(
          "A plan of government.",
          [
            ["Constitution", "📜"],
            ["Congress", "congress"],
            ["Delegate", "🙋"],
          ],
          { img: "madison" },
        ),
        mc(
          "A group of people who make a country's laws.",
          [
            ["Congress", "congress"],
            ["Territory", "🗺️"],
            ["Independence", "🗽"],
          ],
          { img: "congress" },
        ),
        mc(
          "A change or addition to the Constitution.",
          [
            ["Amendment", "✏️📜"],
            ["Compromise", "🤝"],
            ["Delegate", "🙋"],
          ],
          { emoji: "✏️" },
        ),
        mc(
          "Land governed by a country, but not a state.",
          [
            ["Territory", "map-1804"],
            ["Congress", "congress"],
            ["Constitution", "📜"],
          ],
          { img: "map-1804" },
        ),
        mc(
          "To approve.",
          [
            ["Ratify", "✅"],
            ["Organize", "👥"],
            ["Compromise", "🤝"],
          ],
          { emoji: "👍" },
        ),
        mc(
          "An agreement.",
          [
            ["Compromise", "🤝"],
            ["Independence", "🗽"],
            ["Territory", "🗺️"],
          ],
          { img: "e-senate-house" },
        ),
        mc(
          "A person who speaks for a group of people.",
          [
            ["Delegate", "🙋"],
            ["Amendment", "✏️📜"],
            ["Territory", "🗺️"],
          ],
          { emoji: "🙋👥" },
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
          t: "The American Revolution",
          ask: "Put the events in order: the oldest first.",
          hint: "The war began in 1775.",
          img: "e-timeline-war",
          steps: [
            { say: "1775: the war begins.", e: "⚔️" },
            { say: "1776: the Declaration of Independence.", e: "📜" },
            { say: "1777: the win at Saratoga.", e: "🎖️" },
            { say: "1781: the win at Yorktown.", e: "🏆" },
            { say: "1783: the war ends.", e: "🕊️" },
          ],
        },
        {
          type: "order",
          t: "A new nation",
          ask: "Put the events in order: the oldest first.",
          hint: "The Articles of Confederation came first, in 1781.",
          img: "e-timeline-nation",
          steps: [
            { say: "1781: the Articles of Confederation.", e: "🤝" },
            { say: "1786: Shays' Rebellion.", img: "shays" },
            { say: "1787: the Constitution.", e: "📜" },
            { say: "1789: Washington becomes president.", e: "🇺🇸" },
            { say: "1803: the Louisiana Purchase.", img: "map-1804" },
          ],
        },
      ],
    },
    {
      k: "flag",
      t: "The flag",
      en: "Stripes, stars and colours",
      ic: "🇺🇸",
      items: [
        mc(
          "How many stripes does the flag have?",
          [
            ["13", "🟥⬜"],
            ["50", "⭐"],
            ["7", "🟥"],
          ],
          { img: "e-flag", x: "[13] stripes, for the 13 first colonies." },
        ),
        mc(
          "How many stars does the flag have?",
          [
            ["50", "⭐"],
            ["13", "🟥⬜"],
            ["10", "🔟"],
          ],
          { img: "e-flag", x: "[50] stars: one for each state." },
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "bk-fill",
      t: "Fill in the blanks",
      en: "Booklet · Exercise sheet A",
      ic: "📝",
      from: "Booklet · Lesson 2 exercise sheet · A (p. 8) · words: George Washington, Britain, Thomas Jefferson, Independence, Townshend Acts, confederation, Mississippi River, Philadelphia",
      keep: true,
      items: [
        fill(
          "Each of the 13 colonies was governed by ___.",
          ["Britain", "Philadelphia", "George Washington"],
          "🇬🇧👑",
        ),
        fill(
          "Great Britain passed tax laws such as the ___.",
          ["Townshend Acts", "confederation", "Mississippi River"],
          "💷",
        ),
        fill(
          "In 1776, ___ wrote the Declaration of Independence in Philadelphia.",
          ["Thomas Jefferson", "George Washington", "Britain"],
          "📜",
        ),
        fill(
          "In 1776, Thomas Jefferson wrote the Declaration of Independence in ___.",
          ["Philadelphia", "Mississippi River", "Britain"],
          "📜",
        ),
        fill(
          "___ was the leader of the Continental Army.",
          ["George Washington", "Thomas Jefferson", "Townshend Acts"],
          "washington-army",
        ),
        fill(
          "___ is freedom from rule by others.",
          ["Independence", "confederation", "Philadelphia"],
          "🕊️",
        ),
        fill(
          "A ___ is the union of states that agreed to cooperate.",
          ["confederation", "Independence", "Townshend Acts"],
          "🤝",
        ),
        fill(
          "After independence, the new nation stretched from the Atlantic Ocean to the ___.",
          ["Mississippi River", "Philadelphia", "Britain"],
          "map-1804",
        ),
      ],
    },
    {
      k: "bk-tf",
      t: "Correct or wrong?",
      en: "Booklet · Exercise sheet B (✓ / ✗ and correct)",
      ic: "✅",
      from: "Booklet · Lesson 2 exercise sheet · B (p. 8)",
      keep: true,
      items: [
        tf(
          "George Washington gave a speech opposing the Stamp Act.",
          false,
          "🗣️💷",
          "[Patrick Henry] gave a speech opposing the Stamp Act.",
        ),
        tf(
          "The British rule passed tax laws such as the Stamp Act.",
          true,
          "💷📜",
          "Britain passed the [Stamp Act] and the [Townshend Acts].",
        ),
        tf(
          "Patrick Henry sent soldiers to stop the American independence movement.",
          false,
          "💂",
          "[King George III] sent soldiers to stop the American independence movement.",
        ),
        tf(
          "The Continental Army defeated the British in California.",
          false,
          "washington-army",
          "The Continental Army defeated the British at [Saratoga], New York (1777) and at [Yorktown], Virginia (1781).",
        ),
        tf(
          "In 1783, the American leaders formed the Continental Army to fight against the British Rule.",
          false,
          "e-timeline-war",
          "In [1775], the American leaders formed the Continental Army. In 1783 the war ended.",
        ),
        tf(
          "France helped the colonists in the war.",
          true,
          "🇫🇷🤝",
          "After Saratoga (1777), [France] agreed to help the colonists.",
        ),
        // unverified: Jefferson became president in 1801; the book only says he was president in 1803
        tf(
          "In 1803, Thomas Jefferson became the president.",
          true,
          "map-1804",
          "The book says: in [1803], Thomas Jefferson was the president. (He became president in 1801.)",
        ),
      ],
    },
    {
      k: "bk-choose",
      t: "Choose",
      en: "Booklet · Exercise sheet C",
      ic: "🔘",
      from: "Booklet · Lesson 2 exercise sheet · C (pp. 9–10)",
      keep: true,
      items: [
        mc(
          "About ___ black colonists joined the Continental Army.",
          [
            ["5,000", "🧑🏿"],
            ["7,000", "7️⃣"],
            ["9,000", "9️⃣"],
          ],
          { img: "washington-army" },
        ),
        mc(
          "In ___, the long war ended.",
          [
            ["1783", "🕊️"],
            ["1775", "⚔️"],
            ["1776", "📜"],
          ],
          {
            img: "e-timeline-war",
            x: "The war began in 1775 and ended in [1783].",
          },
        ),
        mc(
          "The 13 colonies signed the ___ to govern the country.",
          [
            ["Articles of Confederation", "🤝"],
            ["Congress", "congress"],
            ["Independence", "🗽"],
          ],
          { emoji: "✍️" },
        ),
        mc(
          "A/An ___ is a group of people who are responsible of making a country's laws.",
          [
            ["congress", "congress"],
            ["confederation", "🤝"],
            ["independence", "🗽"],
          ],
          { emoji: "⚖️" },
        ),
        mc(
          "Because of the high taxes ___ and about 1,200 Massachusetts farmers attacked government buildings.",
          [
            ["Daniel Shays", "shays"],
            ["Patrick Henry", "🗣️"],
            ["George Washington", "washington-army"],
          ],
          { emoji: "😠🏛️" },
        ),
        mc(
          "A/An ___ is a plan for the government.",
          [
            ["constitution", "📜"],
            ["congress", "congress"],
            ["independence", "🗽"],
          ],
          { img: "madison" },
        ),
        mc(
          "Every state wanted the same amount of power so they agreed that there would be ___ to represent them.",
          [
            ["a senate", "e-senate-house"],
            ["a leader", "🧑‍💼"],
            ["a president", "🇺🇸"],
          ],
          {
            emoji: "⚖️",
            x: "In the [Senate], every state has 2 members: the same power.",
          },
        ),
        mc(
          "A / An ___ is a change or addition to the new constitution.",
          [
            ["amendment", "✏️📜"],
            ["congress", "congress"],
            ["constitution", "📜"],
          ],
          { emoji: "✏️" },
        ),
        mc(
          "The first ten amendments were called ___.",
          [
            ["Bill of Rights", "📜🔟"],
            ["independence", "🗽"],
          ],
          { img: "first-amendment", two: true },
        ),
        mc(
          "Thomas Jefferson purchased ___ for $15 million from the leader of France, Napoleon.",
          [
            ["the Louisiana Territory", "map-1804"],
            ["Alaska Purchase", "🏔️❄️"],
          ],
          { emoji: "💵🇫🇷", two: true },
        ),
        mc(
          "___ led expedition west. It took them more than 2 years.",
          [
            ["Lewis and Clark", "🛶"],
            ["George Washington and Thomas Jefferson", "washington-army"],
          ],
          {
            img: "map-1804",
            two: true,
            x: "Jefferson sent [Lewis and Clark]; Sacagawea was their guide.",
          },
        ),
        mc(
          "On ___, 1789, George Washington became the first president of the United States of America.",
          [
            ["April 30", "🌷"],
            ["September 10", "🍂"],
            ["December 9", "❄️"],
          ],
          { img: "washington-army" },
        ),
      ],
    },
    {
      k: "bk-answer",
      t: "Answer",
      en: "Booklet · Exercise sheet D",
      ic: "✏️",
      from: "Booklet · Lesson 2 exercise sheet · D (p. 10)",
      items: [
        // unverified: no model answer; written from the book pp. 57, 60–61
        {
          type: "open",
          q: "What were [Thomas Jefferson]'s most important achievements for the United States?",
          a: "He wrote the [Declaration of Independence] (1776). As president, he bought the [Louisiana Territory] (1803), which doubled the size of the country. He sent [Lewis and Clark] to explore the West.",
          img: "map-1804",
        },
      ],
    },
    {
      k: "flag",
      t: "American flag worksheet",
      en: "Booklet · the flag (colouring left out)",
      ic: "🇺🇸",
      from: "Booklet · American flag worksheet (p. 13)",
      keep: true,
      // unverified: the worksheet has no key; the colours follow the usual meaning (red valor, white purity, blue justice)
      items: [
        mc(
          "What is the shape of this flag?",
          [
            ["rectangle", "▬"],
            ["square", "⬛"],
            ["circle", "⚫"],
          ],
          { img: "e-flag" },
        ),
        mc(
          "How many [red] stripes are there?",
          [
            ["7", "7️⃣"],
            ["6", "6️⃣"],
            ["13", "🔢"],
          ],
          {
            img: "e-flag",
            x: "[7] red stripes and 6 white stripes: 13 in all.",
          },
        ),
        mc(
          "How many [white] stripes are there?",
          [
            ["6", "6️⃣"],
            ["7", "7️⃣"],
            ["50", "⭐"],
          ],
          {
            img: "e-flag",
            x: "7 red stripes and [6] white stripes: 13 in all.",
          },
        ),
        mc(
          "The colour [red] means…",
          [
            ["being brave and strong (valor and hardiness)", "🦁💪"],
            ["purity and innocence", "🕊️"],
            ["justice", "⚖️"],
          ],
          {
            emoji: "🟥",
            x: "[Red] stands for valor (being brave) and hardiness (being strong).",
          },
        ),
        mc(
          "The colour [white] means…",
          [
            ["purity and innocence", "🕊️"],
            ["being brave and strong (valor and hardiness)", "🦁💪"],
            ["justice", "⚖️"],
          ],
          { emoji: "⬜", x: "[White] stands for purity and innocence." },
        ),
        mc(
          "The colour [blue] means…",
          [
            ["vigilance, perseverance and justice", "👀⚖️"],
            ["purity and innocence", "🕊️"],
            ["being brave and strong (valor and hardiness)", "🦁💪"],
          ],
          {
            emoji: "🟦",
            x: "[Blue] stands for vigilance (watching carefully), perseverance (not giving up) and justice.",
          },
        ),
      ],
    },
    {
      k: "check",
      t: "Book questions",
      en: "Reading Checks and Lesson 2 Check",
      ic: "📘",
      from: "Book pp. 58–61 · Reading Checks 1–3, Lesson 2 Check 4–6",
      keep: true,
      items: [
        // unverified: open questions, model answers written from the book
        {
          type: "open",
          q: "Explain how the [Articles of Confederation] led to the [Constitution].",
          a: "Under the Articles, the states did not work together: they argued about money and land, and the economy was bad (Shays' Rebellion). So the leaders met in 1787 and wrote a new plan: the [Constitution].",
          img: "shays",
        },
        {
          type: "open",
          q: "Analyze the summary of the [First Amendment]. Then explain why you think it is important.",
          a: "It protects freedom of religion, speech and the press, and people can gather and ask the government for changes. It is important because people can say what they think and live freely.",
          img: "first-amendment",
        },
        mc(
          "Look at the map. How did the size of the country change after the [Louisiana Purchase]?",
          [
            ["It doubled (2 times bigger).", "✖️2️⃣"],
            ["It got smaller.", "📉"],
            ["It stayed the same.", "🟰"],
          ],
          {
            img: "map-1804",
            x: "The orange Louisiana Territory is as big as the whole country before: the size [doubled].",
          },
        ),
        {
          type: "open",
          q: "Write a summary to explain [Thomas Jefferson]'s contributions to the early history of the United States.",
          a: "Jefferson wrote the [Declaration of Independence] in 1776. As president, he bought the [Louisiana Territory] in 1803 and sent [Lewis and Clark] to explore the West.",
          emoji: "✍️📜",
        },
        {
          type: "open",
          q: "Analyze the history of your state. How has it changed over time? In 1804, was it a state, a territory, or something else?",
          a: "Example: Ohio. It was part of the Northwest Territory. On the 1804 map it is already a state (it became a state in 1803).",
          img: "map-1804",
        },
        {
          type: "open",
          q: "Describe one event that happened during the late 1700s or early 1800s that changed America. Who was involved with that event and why?",
          a: "The [Louisiana Purchase] (1803): President [Thomas Jefferson] bought the land from [Napoleon]. He wanted the Mississippi River, and it doubled the size of the country.",
          img: "map-1804",
        },
      ],
    },
  ],
};
