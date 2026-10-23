// Computer · Grade 3 · Chapter 2 · Unit 2 · Lesson 4 « Checking and saving » (book pages 61–69).
// All the content of the lesson. The how-to's are done in Mini Word (wordsim.js). Same format as lesson-2.js.
// Start doc "robotsMiss" has the book's mistake "arround" (word w:1:3); "olympic" has "bigest" and "arond".
(function () {
  const M = { doc: "robotsMiss" };
  window.LESSON = {
    n: 4,
    grade: 3,
    title: "Checking and saving",
    unit: "Unit 2 · Lesson 4",
    book: "Book pages 61–69",
    cover: "saved",
    question: {
      q: "Have you seen a [red line] under a word while typing? Why should you [check] your work before you save it?",
      a: "The red line means the word may be [spelled wrong]. Check and [correct] it, then [save] your work so you don't lose it.",
      img: "spelling",
    },

    ideas: [
      {
        t: "The red line",
        lines: [
          "A word with a [red line] under it may have a [spelling mistake].",
          "Word can help you [correct] it.",
        ],
        img: "spelling",
      },
      {
        t: "Spelling and Grammar",
        lines: [
          "[Review] tab › Proofing › [Spelling and Grammar].",
          "The [Editor] pane opens. Click the right word.",
        ],
        img: "editor",
        howto: "spell",
      },
      {
        t: "F7 opens the Editor",
        lines: ["Press [F7] on the keyboard to open the [Editor]."],
        vis: { kind: "lines", rows: ["F7  →  Editor"] },
        howto: "f7",
      },
      {
        t: "Ignore once, Ignore all",
        lines: [
          "[Ignore once] skips the word without changing it.",
          "[Ignore all] skips it every time in the document.",
        ],
        img: "editor",
        howto: "ignore",
      },
      {
        t: "Save in a folder",
        lines: [
          "[File] tab › [Save As] › [Browse].",
          "Choose a folder, for example [Documents].",
          "Type a [file name] and click [Save].",
        ],
        img: "dialog",
        howto: "saveas",
      },
      {
        t: "Your file is saved!",
        lines: [
          "Now you can find your file in the folder.",
          "Save it where you can [find it] later.",
        ],
        img: "saved",
      },
      {
        t: "Save again",
        lines: [
          "Click [Save] on the [Quick Access Toolbar], or press [Ctrl] + [S].",
          "It keeps your work in the [same place] with the [same name].",
        ],
        img: "qat",
        tip: {
          img: "boy-save",
          say: "Once you have saved your document, clicking [Save] again keeps your work saved in the same place.",
        },
        howto: "save",
      },
      {
        t: "Important!",
        lines: [
          "If you [don't save] the file, the computer will [not keep] your last changes.",
        ],
        vis: { kind: "emoji", e: "💾 ❗" },
      },
    ],

    howto: [
      {
        k: "spell",
        t: "Check your spelling",
        code: "2.4.1",
        ic: "🔤",
        img: "spelling",
        start: M,
        steps: [
          { act: "click", t: "tab:Review", say: "Click the [Review] tab." },
          {
            act: "click",
            t: "rev:spelling",
            say: "Click [Spelling and Grammar].",
          },
          {
            act: "click",
            t: "sug:around",
            say: "The Editor pane opens. Click [around].",
          },
          {
            act: "look",
            t: "w:1:3",
            say: "The mistake has been corrected!",
            wait: 1200,
          },
        ],
      },
      {
        k: "f7",
        t: "Open the Editor with F7",
        code: "Smart tip",
        ic: "⌨️",
        start: M,
        steps: [
          { act: "key", t: "key:F7", key: "F7", say: "Press [F7]." },
          { act: "click", t: "sug:around", say: "Click [around]." },
        ],
      },
      {
        k: "ignore",
        t: "Ignore a word",
        code: "2.4.1",
        ic: "⊘",
        img: "editor",
        start: M,
        steps: [
          {
            act: "key",
            t: "key:F7",
            key: "F7",
            say: "Press [F7] to open the Editor.",
          },
          {
            act: "click",
            t: "ed:ignore1",
            say: "Click [Ignore once]: the word stays the same.",
          },
        ],
      },
      {
        k: "saveas",
        t: "Save in a folder",
        code: "2.4.2",
        ic: "💾",
        img: "saveas",
        start: { doc: "robotsList" },
        steps: [
          { act: "click", t: "tab:File", say: "Click the [File] tab." },
          { act: "click", t: "file:saveas", say: "Click [Save As]." },
          { act: "click", t: "saveas:browse", say: "Click [Browse]." },
          { act: "click", t: "dlg:nav:Documents", say: "Choose [Documents]." },
          {
            act: "type",
            t: "dlg:filename",
            text: "Robots around us",
            say: "Type the file name: [Robots around us].",
          },
          { act: "click", t: "dlg:save", say: "Click [Save]." },
        ],
      },
      {
        k: "save",
        t: "Save your changes",
        code: "Quick Access Toolbar",
        ic: "🔁",
        img: "qat",
        start: { doc: "robotsList", saved: "Robots around us" },
        steps: [
          { act: "select", t: "w:0:0", say: "Select [Robots!]" },
          { act: "click", t: "fmt:bold", say: "Make it [bold]." },
          {
            act: "click",
            t: "qat-save",
            say: "Click [Save] on the Quick Access Toolbar.",
          },
        ],
      },
    ],

    games: [
      {
        k: "fix",
        t: "Fix the mistakes",
        en: "Use the Editor in Mini Word",
        ic: "🔤",
        items: [
          {
            type: "sim",
            q: "Correct the word with the [red line].",
            start: M,
            steps: [
              { act: "click", t: "tab:Review", say: "Click the [Review] tab." },
              {
                act: "click",
                t: "rev:spelling",
                say: "Click [Spelling and Grammar].",
              },
              {
                act: "click",
                t: "sug:around",
                say: "Click the right word: [around].",
              },
            ],
          },
          {
            type: "sim",
            q: "Correct the 2 mistakes in the Olympic text.",
            start: { doc: "olympic" },
            steps: [
              { act: "key", t: "key:F7", key: "F7", say: "Press [F7]." },
              { act: "click", t: "sug:biggest", say: "Click [biggest]." },
              { act: "click", t: "sug:around", say: "Click [around]." },
            ],
          },
        ],
      },
      {
        k: "savegame",
        t: "Save it!",
        en: "Save files in Mini Word",
        ic: "💾",
        items: [
          {
            type: "sim",
            q: "Save the text in [Documents] as [My robots].",
            start: { doc: "robots" },
            steps: [
              { act: "click", t: "tab:File", say: "Click the [File] tab." },
              { act: "click", t: "file:saveas", say: "Click [Save As]." },
              { act: "click", t: "saveas:browse", say: "Click [Browse]." },
              {
                act: "click",
                t: "dlg:nav:Documents",
                say: "Choose [Documents].",
              },
              {
                act: "type",
                t: "dlg:filename",
                text: "My robots",
                say: "Type [My robots].",
              },
              { act: "click", t: "dlg:save", say: "Click [Save]." },
            ],
          },
          {
            type: "sim",
            q: "Save again with the [keys].",
            start: { doc: "robots", saved: "My robots" },
            steps: [
              {
                act: "key",
                t: "key:Ctrl+S",
                key: "Ctrl+S",
                say: "Press [Ctrl] + [S].",
              },
            ],
          },
        ],
      },
      {
        k: "which",
        t: "Which one?",
        en: "Tabs, buttons and keys",
        ic: "🤔",
        items: [
          {
            type: "mc",
            q: "Check the [spelling and grammar].",
            opts: ["Spelling and Grammar", "Find", "Symbol"],
            oi: ["spelling", "find", "symbol"],
          },
          {
            type: "mc",
            q: "[Save] your work.",
            opts: ["Save", "Undo", "Print"],
            oi: ["save", "undo", "print"],
          },
          {
            type: "mc",
            q: "Open the [Editor].",
            opts: ["F7", "Ctrl + S", "Ctrl + F"],
            oi: ["key:F7", "key:Ctrl+S", "key:Ctrl+F"],
          },
          {
            type: "mc",
            q: "Save with the [keys].",
            opts: ["Ctrl + S", "Ctrl + Z", "Ctrl + B"],
            oi: ["key:Ctrl+S", "key:Ctrl+Z", "key:Ctrl+B"],
          },
          {
            type: "mc",
            q: "Which tab has [Spelling and Grammar]?",
            opts: ["Review", "Insert", "View"],
          },
          {
            type: "mc",
            q: "What colour is the line under a [misspelled] word?",
            opts: ["Red", "Blue", "Green"],
            img: "spelling",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "spell" },
          { type: "order", howto: "saveas" },
        ],
      },
    ],

    exercises: [
      {
        k: "choose",
        t: "Choose the answer",
        en: "Book · Hands on 1.1–1.3",
        ic: "✅",
        from: "Book · Hands on! 1.1–1.3",
        items: [
          {
            type: "mc",
            q: "If you want to check your spelling and grammar in a document, which tab do you go to?",
            opts: ['The "Review" tab', 'The "Insert" tab', 'The "View" tab'],
          },
          {
            type: "mc",
            q: "Which button should you click to save your document after checking for spelling mistakes?",
            opts: [
              'The "Save" button',
              'The "Symbol" button',
              'The "Undo" button',
            ],
          },
          {
            type: "mc",
            q: "What color is the line that is used under a misspelled word in Microsoft Word?",
            opts: ["Red", "Blue", "Green"],
          },
        ],
      },
      {
        k: "handson",
        t: "True or false",
        en: "Book · Hands on 2.1–2.4",
        ic: "⚖️",
        from: "Book · Hands on! 2.1–2.4",
        items: [
          {
            type: "tf",
            q: 'You can open the "Editor" tool by pressing F7.',
            a: true,
          },
          {
            type: "tf",
            q: 'Clicking "Ignore once" skips the word without changing it.',
            a: true,
          },
          {
            type: "tf",
            q: 'The "Ignore all" option skips the word every time it appears throughout the document.',
            a: true,
          },
          {
            type: "tf",
            q: 'Every time you click the "Save" button, the document is saved with a new name.',
            a: false,
            x: "It is saved in the [same place] with the [same name].",
          },
        ],
      },
      {
        k: "think",
        t: "Think and answer",
        en: "Book · Hands on 3",
        ic: "💭",
        from: "Book · Hands on! 3",
        items: [
          {
            type: "open",
            q: "Why is it helpful to check and correct spelling and grammar errors before sharing your document?",
            a: "So the text has [no mistakes]. It is [easy to read] and people understand it.",
            img: "corrected",
          },
        ],
      },
      {
        k: "word",
        t: "Do it in Word",
        en: "Book · Hands on 4 · the Olympic Games",
        ic: "🏅",
        from: "Book · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Check the spelling and grammar. How many mistakes are there?",
            start: { doc: "olympic" },
            steps: [
              { act: "click", t: "tab:Review", say: "Click the [Review] tab." },
              {
                act: "click",
                t: "rev:spelling",
                say: "Click [Spelling and Grammar].",
              },
              {
                act: "click",
                t: "sug:biggest",
                say: "Mistake 1: click [biggest].",
              },
              {
                act: "click",
                t: "sug:around",
                say: "Mistake 2: click [around].",
              },
            ],
          },
          {
            type: "mc",
            q: "How many mistakes were there in the Olympic text?",
            opts: ["2", "1", "5"],
            x: "[bigest] → biggest and [arond] → around.",
          },
          {
            type: "sim",
            q: 'Save the document in [Documents] as "Olympic Games".',
            start: { doc: "olympic" },
            steps: [
              { act: "click", t: "tab:File", say: "Click the [File] tab." },
              { act: "click", t: "file:saveas", say: "Click [Save As]." },
              { act: "click", t: "saveas:browse", say: "Click [Browse]." },
              {
                act: "click",
                t: "dlg:nav:Documents",
                say: "Choose [Documents].",
              },
              {
                act: "type",
                t: "dlg:filename",
                text: "Olympic Games",
                say: "Type [Olympic Games].",
              },
              { act: "click", t: "dlg:save", say: "Click [Save]." },
            ],
          },
        ],
      },
      {
        k: "pa5",
        t: "Practical Assessment 5",
        en: "Booklet · Checking and saving",
        ic: "📒",
        from: "Booklet · Practical Assessment (5)",
        items: [
          {
            type: "mc",
            q: "Who am I? You should use me to check the spelling and grammar.",
            opts: ["Review", "References", "Mailings", "View", "Help"],
          },
          {
            type: "mc",
            q: "To save your file:",
            opts: ["File tab", "View tab", "F7"],
          },
          {
            type: "mc",
            q: "To check the grammar:",
            opts: ["Review tab", "View tab", "File tab"],
          },
          {
            type: "mc",
            q: "To get the Editor:",
            opts: ["F7", "File tab", "View tab"],
          },
          {
            type: "mc",
            q: "AutoSave · Save · Undo · Redo at the top of Word is called:",
            opts: ["Quick Access Toolbar", "Ribbon bar", "Taskbar"],
            img: "qat",
          },
          {
            type: "mc",
            q: "You use ___ to save your work in the current location.",
            opts: ["Save", "Open"],
          },
          {
            type: "mc",
            q: "Can the computer keep your last work without saving the file first?",
            opts: ["No", "Yes"],
            x: "If you don't save the file, the computer will [not keep] your last changes.",
          },
        ],
      },
      {
        k: "revision",
        t: "Term revision",
        en: "Booklet · Revision: shortcut keys",
        ic: "🏆",
        from: "Booklet · Revision",
        items: [
          {
            type: "match",
            pairs: [
              { icon: "key:F7", label: "Get the Editor" },
              { icon: "key:Ctrl+B", label: "Bold the selected text" },
              { icon: "key:Ctrl+U", label: "Underline the selected text" },
              { icon: "key:Ctrl+Z", label: "Get back the last action" },
            ],
          },
          {
            type: "match",
            pairs: [
              { icon: "key:Ctrl+F", label: "Find a word" },
              { icon: "key:Shift+Enter", label: "Start a new line" },
              { icon: "key:Ctrl+S", label: "Save your file" },
            ],
          },
        ],
      },
    ],
  };
})();
