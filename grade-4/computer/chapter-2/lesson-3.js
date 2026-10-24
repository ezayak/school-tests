// Computer · Grade 4 · Chapter 2 · Unit 2 · Lesson 3 « Editing and grammar check » (book pages 80–85).
// All the content of the lesson. The how-to's are done in Mini Word (shared/wordsim.js). Same format as lesson-1.js.
(function () {
  const D = { doc: "dolphin" };
  const PEOPLE = [
    {
      act: "type",
      t: "rp:find",
      text: "people",
      say: "In [Find what], type [people].",
    },
    {
      act: "type",
      t: "rp:with",
      text: "persons",
      say: "In [Replace with], type [persons].",
    },
  ];
  window.LESSON = {
    n: 3,
    grade: 4,
    title: "Editing and grammar check",
    unit: "Unit 2 · Lesson 3",
    book: "Book pages 80–85",
    cover: "find-replace",
    question: {
      q: "Why would a tool for [finding words] help? Why is a [grammar check] helpful in long documents?",
      a: "[Find and Replace] changes a word everywhere in one step. The [grammar check] finds the mistakes we don't see.",
      img: "girl-ctrlh",
    },
    words: [
      {
        w: "Find and Replace",
        m: "finds a word or phrase and puts a new one in its place",
      },
      { w: "Replace", m: "changes one place at a time" },
      { w: "Replace All", m: "changes it everywhere in the document" },
      { w: "Find Next", m: "goes to the next place where the word is" },
      {
        w: "Spelling and Grammar",
        m: "checks the text for mistakes and gives ideas to fix them",
      },
      {
        w: "Double blue line",
        m: "a grammar mistake (a red wavy line is spelling)",
      },
    ],

    ideas: [
      {
        t: "Change a word everywhere",
        lines: [
          'You wrote "hero" many times, but now you want "main character".',
          "Reading the whole text takes a long time. Word can do it [for you]!",
        ],
        img: "replace-btn",
      },
      {
        t: "Find and Replace",
        lines: [
          "[Home] tab › [Editing] group › [Replace].",
          "[Find what]: the old word. [Replace with]: the new word.",
        ],
        img: "find-replace",
        tip: {
          img: "girl-ctrlh",
          say: "Press [Ctrl] + [H] to open the Find and Replace window.",
        },
        howto: "replace",
      },
      {
        t: "Replace, Replace All, Find Next",
        lines: [
          "[Replace]: one place at a time.",
          "[Replace All]: everywhere in the document. Double-check first!",
          "[Find Next]: go to the next place.",
        ],
        img: "find-replace",
        howto: "one",
      },
      {
        t: "One at a time or all?",
        lines: [
          "The same word everywhere → [Replace All].",
          "Only some places → [Find Next] and [Replace], one by one.",
        ],
        vis: {
          kind: "lines",
          rows: ["people → persons", "1 · 2 · 3 … all!"],
        },
        howto: "one",
      },
      {
        t: "Grammar check",
        lines: [
          "A [double blue line] under words = a [grammar] problem.",
          "Mistake: He [don't] like vegetables. Correct: He [doesn't] like vegetables.",
        ],
        img: "grammar",
        howto: "grammar",
      },
      {
        t: "The Editor",
        lines: [
          "[Review] tab › [Spelling and Grammar] (or [F7]).",
          "In the [Editor]: Corrections › [Grammar]. Click the right word.",
        ],
        img: "grammar",
        howto: "grammar",
      },
      {
        t: "Read context and Stop checking",
        lines: [
          "[Read context] reads the sentence aloud, to help you check it.",
          "[Stop checking for this] ignores this mistake everywhere.",
        ],
        img: "grammar",
        howto: "f7",
      },
      {
        t: "Smart tip",
        lines: [
          "A spelling mistake? [Right-click] the word.",
          "The ideas to fix it appear in [bold]. Click the right one.",
        ],
        vis: { kind: "emoji", e: "🖱️ ➡ ✅" },
      },
    ],

    howto: [
      {
        k: "replace",
        t: "Replace a word everywhere",
        code: "2.3.1",
        ic: "🔁",
        img: "find-replace",
        start: D,
        steps: [
          {
            act: "click",
            t: "edit:replace",
            say: "On the [Home] tab, in the [Editing] group, click [Replace].",
          },
          ...PEOPLE,
          { act: "click", t: "rp:all", say: "Click [Replace All]." },
          {
            act: "click",
            t: "rp:ok",
            say: "Word made 2 replacements. Click [OK].",
          },
        ],
      },
      {
        k: "keys",
        t: "Open it with the keys",
        code: "Ctrl + H",
        ic: "⌨️",
        img: "girl-ctrlh",
        start: D,
        steps: [
          {
            act: "key",
            t: "key:Ctrl+H",
            key: "Ctrl+H",
            say: "Press [Ctrl] + [H].",
          },
          ...PEOPLE,
          { act: "click", t: "rp:all", say: "Click [Replace All]." },
        ],
      },
      {
        k: "one",
        t: "Replace one at a time",
        code: "Find Next · Replace",
        ic: "1️⃣",
        img: "find-replace",
        start: { doc: "dolphin", replace: true },
        steps: [
          ...PEOPLE,
          {
            act: "click",
            t: "rp:next",
            say: "Click [Find Next]. Word selects the first [people].",
          },
          {
            act: "click",
            t: "rp:replace",
            say: "Click [Replace]. Word changes it and finds the next one.",
          },
          {
            act: "click",
            t: "rp:replace",
            say: "Click [Replace] again.",
          },
          {
            act: "click",
            t: "rp:ok",
            say: "Word finished the document. Click [OK].",
          },
        ],
      },
      {
        k: "grammar",
        t: "Check the grammar",
        code: "2.3.2",
        ic: "✍️",
        img: "grammar",
        start: { doc: "grammar" },
        steps: [
          { act: "click", t: "tab:Review", say: "Click the [Review] tab." },
          {
            act: "click",
            t: "rev:spelling",
            say: "Click [Spelling and Grammar].",
          },
          {
            act: "click",
            t: "edc:grammar",
            say: "In the Editor, under [Corrections], click [Grammar].",
          },
          {
            act: "click",
            t: "sug:doesn't",
            say: "Click [doesn't] to correct the mistake.",
          },
        ],
      },
      {
        k: "f7",
        t: "F7 and Read context",
        code: "F7",
        ic: "🔊",
        img: "grammar",
        start: { doc: "grammar" },
        steps: [
          {
            act: "key",
            t: "key:F7",
            key: "F7",
            say: "Press [F7]. The Editor opens.",
          },
          { act: "click", t: "edc:grammar", say: "Click [Grammar]." },
          {
            act: "click",
            t: "ed:read",
            say: "Click [Read context]: Word reads the sentence.",
          },
          { act: "click", t: "sug:doesn't", say: "Click [doesn't]." },
        ],
      },
    ],

    games: [
      {
        k: "tool",
        t: "Which tool?",
        en: "Find, Replace, Spelling and Grammar",
        ic: "🧰",
        items: [
          {
            type: "mc",
            q: "Find [every place] a word is used.",
            opts: ["Find", "Spelling and Grammar", "Replace"],
            oi: ["find", "spelling", "replace"],
          },
          {
            type: "mc",
            q: "Change a word for [another word].",
            opts: ["Replace", "Find", "Spelling and Grammar"],
            oi: ["replace", "find", "spelling"],
          },
          {
            type: "mc",
            q: "Look for [mistakes] in the text.",
            opts: ["Spelling and Grammar", "Replace", "Find"],
            oi: ["spelling", "replace", "find"],
          },
          {
            type: "mc",
            q: "Open [Find and Replace] with the keys.",
            opts: ["Ctrl + H", "Ctrl + F", "F7"],
            oi: ["key:Ctrl+H", "key:Ctrl+F", "key:F7"],
          },
          {
            type: "mc",
            q: "Open the [Editor] with one key.",
            opts: ["F7", "Ctrl + H", "Ctrl + P"],
            oi: ["key:F7", "key:Ctrl+H", "key:Ctrl+P"],
          },
        ],
      },
      {
        k: "lines",
        t: "Red or blue line?",
        en: "Spelling or grammar mistake",
        ic: "〰️",
        items: [
          {
            type: "mc",
            q: "A [double blue line] under the words means…",
            img: "grammar",
            opts: ["a grammar mistake", "a spelling mistake", "no mistake"],
          },
          {
            type: "mc",
            q: "A [red wavy line] under a word means…",
            vis: { kind: "lines", rows: ["feild 〰️", "(red wavy line)"] },
            opts: ["a spelling mistake", "a grammar mistake", "a bold word"],
          },
          {
            type: "mc",
            q: "He [don't] like to eat vegetables. What is right?",
            vis: { kind: "emoji", e: "👦 🙅 🥦" },
            opts: ["He doesn't like", "He don't likes", "He not like"],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Word",
        en: "Replace and fix",
        ic: "📝",
        items: [
          {
            type: "sim",
            q: "Change [people] to [persons] everywhere.",
            start: { doc: "dolphin", replace: true },
            steps: [
              ...PEOPLE,
              { act: "click", t: "rp:all", say: "Click [Replace All]." },
            ],
          },
          {
            type: "sim",
            q: "Fix the [grammar] mistake.",
            start: { doc: "grammar", editor: true },
            steps: [
              { act: "click", t: "edc:grammar", say: "Click [Grammar]." },
              { act: "click", t: "sug:doesn't", say: "Click [doesn't]." },
            ],
          },
          {
            type: "sim",
            q: "Find the [first] word [people], then change only that one.",
            start: { doc: "dolphin", replace: true },
            steps: [
              ...PEOPLE,
              { act: "click", t: "rp:next", say: "Click [Find Next]." },
              { act: "click", t: "rp:replace", say: "Click [Replace]." },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Editing facts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "Replace is on the Home tab, in the Editing group.",
            a: true,
            img: "replace-btn",
          },
          {
            type: "tf",
            q: "Replace All asks you before every change.",
            a: false,
            x: "Replace All changes [everywhere at once]. [Replace] goes one at a time.",
            img: "find-replace",
          },
          {
            type: "tf",
            q: "F7 opens Spelling and Grammar.",
            a: true,
            icon: "key:F7",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "replace" },
          { type: "order", howto: "grammar" },
        ],
      },
    ],

    exercises: [
      {
        k: "tools",
        t: "What does this tool do?",
        en: "Book · Hands on 1.1–1.4",
        ic: "🧰",
        from: "Book · Hands on! 1.1–1.4",
        items: [
          {
            type: "mc",
            q: "What does this tool do in Microsoft Word?",
            icon: "find",
            opts: [
              "Allows you to locate every instance of a particular word or phrase within a document.",
              "Finds a specific word or phrase and lets you change it throughout the entire document in one step.",
              "Checks for spelling and grammar mistakes and provides suggestions for corrections.",
              "Lets you replace a single word or phrase with another in selected parts of the document.",
            ],
          },
          {
            type: "mc",
            q: "What does this tool do in Microsoft Word?",
            icon: "spelling",
            opts: [
              "Checks your work for mistakes and gives ideas to fix them",
              "Finds a specific word or phrase and lets you change it throughout the entire document in one step",
              "Helps you find every time a word or phrase is used in the document",
              "Lets you replace a word or phrase with another in selected parts of the document",
            ],
          },
          {
            type: "mc",
            q: "What does this tool do in Microsoft Word?",
            vis: { kind: "lines", rows: ["Replace"] },
            opts: [
              "Lets you replace a word or phrase with another in selected parts of the document",
              "Finds a specific word or phrase and lets you change it throughout the entire document in one step",
              "Helps you find every time a word or phrase is used in the document",
              "Checks your work for mistakes and gives ideas to fix them",
            ],
          },
          {
            type: "mc",
            q: "What does this tool do in Microsoft Word?",
            vis: { kind: "lines", rows: ["Replace All"] },
            opts: [
              "Finds a specific word or phrase and lets you change it throughout the entire document in one step",
              "Helps you find every time a word or phrase is used in the document",
              "Checks your work for mistakes and gives ideas to fix them",
              "Lets you replace a word or phrase with another in selected parts of the document",
            ],
          },
        ],
      },
      {
        k: "fill",
        t: "Complete the sentence",
        en: "Book · Hands on 2.1–2.4",
        ic: "✏️",
        from: "Book · Hands on! 2.1–2.4",
        items: [
          {
            type: "mc",
            q: 'To search for a certain word or phrase, go to the ___ tab and select "Find."',
            opts: ["Home", "Insert", "Review", "View"],
            img: "replace-btn",
          },
          {
            type: "mc",
            q: 'To check for spelling and grammar mistakes, click "Spelling and Grammar" under the ___ tab.',
            opts: ["Review", "Home", "Insert", "View"],
            img: "grammar",
          },
          {
            type: "mc",
            q: 'To replace a word with a different word each time it appears in a document, type the new text in the ___ box and click "Replace All."',
            opts: ["Replace with", "Find what", "Search"],
            img: "find-replace",
          },
          {
            type: "mc",
            q: 'To open the "Find and Replace" dialog box, you can press ___ on your keyboard.',
            opts: ["Ctrl + H", "Ctrl + F", "Ctrl + P", "F7"],
            img: "girl-ctrlh",
          },
        ],
      },
      {
        k: "handson",
        t: "True or false",
        en: "Book · Hands on 3.1–3.5",
        ic: "⚖️",
        from: "Book · Hands on! 3.1–3.5",
        items: [
          {
            type: "tf",
            q: 'The "Replace" tool helps you find and change words in your document.',
            a: true,
            img: "find-replace",
          },
          {
            type: "tf",
            q: '"Replace All" changes a word or phrase everywhere in the document without asking for permission each time.',
            a: true,
            img: "find-replace",
          },
          {
            type: "tf",
            q: "Grammar issues in Microsoft Word are marked with a double red underline.",
            a: false,
            x: "Grammar is a [double blue] line. A [red wavy] line is spelling.",
            img: "grammar",
          },
          {
            type: "tf",
            q: 'The "Read context" tool reads selected text aloud to help with proofreading and understanding.',
            a: true,
            img: "grammar",
          },
          {
            type: "tf",
            q: 'The "Spelling and Grammar" tool does not fix mistakes for you. It shows suggestions that you can choose to accept or ignore.',
            a: true,
            icon: "spelling",
          },
        ],
      },
      {
        k: "marco",
        t: "Dear Marco",
        en: "Book · Hands on 4 · fix and replace",
        ic: "✉️",
        from: "Book · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Fix the mistakes with [Spelling and Grammar]: 1 grammar, 3 spelling.",
            img: "marco",
            start: { doc: "marco" },
            steps: [
              { act: "click", t: "tab:Review", say: "Click the [Review] tab." },
              {
                act: "click",
                t: "rev:spelling",
                say: "Click [Spelling and Grammar].",
              },
              { act: "click", t: "edc:grammar", say: "Click [Grammar]." },
              {
                act: "click",
                t: "sug:hope",
                say: "I [hop] you are well? Click [hope].",
              },
              { act: "click", t: "edc:spelling", say: "Click [Spelling]." },
              { act: "click", t: "sug:field", say: "Click [field]." },
              { act: "click", t: "sug:arrived", say: "Click [arrived]." },
              {
                act: "click",
                t: "sug:dinosaurs",
                say: "Click [dinosaurs].",
              },
            ],
          },
          {
            type: "sim",
            q: "Change the word [museum] to [center] every time it appears.",
            start: { doc: "marcoFixed" },
            steps: [
              {
                act: "key",
                t: "key:Ctrl+H",
                key: "Ctrl+H",
                say: "Press [Ctrl] + [H].",
              },
              {
                act: "type",
                t: "rp:find",
                text: "museum",
                say: "In [Find what], type [museum].",
              },
              {
                act: "type",
                t: "rp:with",
                text: "center",
                say: "In [Replace with], type [center].",
              },
              { act: "click", t: "rp:all", say: "Click [Replace All]." },
            ],
          },
          {
            type: "mc",
            q: "How many times did you replace the word [museum]?",
            img: "marco",
            opts: ["2", "1", "3"],
            x: "[Science Museum] and [the museum]: 2 times.",
          },
        ],
      },
    ],
  };
})();
