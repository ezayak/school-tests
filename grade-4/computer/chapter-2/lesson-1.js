// Computer · Grade 4 · Chapter 2 · Unit 2 · Lesson 1 « Format a paragraph » (book pages 57–67).
// All the content of the lesson. The how-to's are done in Mini Word (shared/wordsim.js). Same format as Grade 3 chapter 2.
(function () {
  const A = { doc: "animals" };
  const D = { doc: "dolphin" };
  const SEL1 = {
    act: "select",
    t: "para:1",
    say: "Select the paragraph: drag from [You] to [why...]",
  };
  window.LESSON = {
    n: 1,
    grade: 4,
    title: "Format a paragraph",
    unit: "Unit 2 · Lesson 1",
    book: "Book pages 57–67",
    cover: "shading",
    question: {
      q: "Why is it good to keep your writing [straight] and [spaced evenly]?",
      a: "Neat paragraphs are [easy to read]. [Colour] and [lines] around words make them [stand out].",
      img: "unit-boy",
    },
    words: [
      {
        w: "Indentation",
        m: "how far a paragraph is from the left or the right margin",
      },
      { w: "Line spacing", m: "the space between the lines of a paragraph" },
      { w: "Spacing", m: "the space above or below a paragraph" },
      { w: "Shading", m: "a colour behind a word, a sentence or a paragraph" },
      {
        w: "Borders",
        m: "lines on the top, bottom, sides or all around the text",
      },
      { w: "Character spacing", m: "the space between the letters of a word" },
      {
        w: "Non-printable characters",
        m: "symbols for Space, Enter and Tab; they are not printed",
      },
    ],

    ideas: [
      {
        t: "Format a paragraph",
        lines: [
          "Word helps you make a paragraph [neat].",
          "Move it from the [margin], change the [line spacing], add [borders] and [colours].",
        ],
        img: "unit-boy",
      },
      {
        t: "Indentation",
        lines: [
          "Home tab › Paragraph group.",
          "[Increase Indent]: the text moves [farther] from the left margin.",
          "[Decrease Indent]: the text moves [closer] to the left margin.",
        ],
        img: "indent",
        howto: "indent",
      },
      {
        t: "Indent the first line",
        lines: [
          "Click at the [beginning] of the paragraph.",
          "Press [Tab]. Only the [first line] moves in.",
        ],
        vis: {
          kind: "icons",
          items: [{ type: "key:Tab", label: "Tab" }],
        },
        howto: "tab",
      },
      {
        t: "Line spacing",
        lines: [
          "The space [between the lines].",
          "More space makes the text [easier to read].",
          "Line and Paragraph Spacing › [1.5]",
        ],
        img: "line-spacing",
        howto: "spacing",
      },
      {
        t: "The ruler",
        lines: [
          "[View] tab › Show group › [Ruler].",
          "It shows centimetres or inches. 1 cm is about 0.4 inches.",
        ],
        vis: { kind: "icons", items: [{ type: "ruler", label: "Ruler" }] },
        howto: "ruler",
      },
      {
        t: "Paragraph spacing",
        lines: [
          "The space [above] or [below] a paragraph.",
          "[Add Space Before Paragraph]",
          "[Remove Space After Paragraph]: the next paragraph comes closer.",
        ],
        img: "para-spacing",
        howto: "paraspace",
      },
      {
        t: "Shading",
        lines: [
          "A [colour behind] a word, a sentence or a paragraph.",
          "Click the small arrow next to [Shading] and choose a colour.",
        ],
        img: "shading",
        howto: "shading",
      },
      {
        t: "Borders",
        lines: [
          "[Lines] on the top, bottom, sides, or [all around] the text.",
          "Click the small arrow next to [Borders] › [Outside Borders].",
        ],
        img: "borders",
        tip: {
          img: "boy-point",
          say: "If you select more than one paragraph, you can also add [borders between] the paragraphs.",
        },
        howto: "borders",
      },
      {
        t: "Which border?",
        lines: [
          "A [Bottom border] makes a heading stand out.",
          "[Outside borders] around notes show they are [important].",
        ],
        img: "border-kinds",
      },
      {
        t: "Character spacing",
        lines: [
          "The space [between the letters] of a word.",
          "Font group › expand button › [Advanced] › Spacing: [Expanded], By: [3 pt].",
          "[Condensed] brings the letters closer.",
        ],
        img: "char-spacing",
        howto: "charspace",
      },
      {
        t: "Show/Hide ¶",
        lines: [
          "It shows where you pressed keys:",
          "[·] Space   [¶] Enter   [→] Tab   [↵] Shift + Enter",
          "They help you find [extra spaces]. They are [not printed].",
        ],
        img: "marks",
        tip: {
          img: "girl-tip",
          say: "Don't worry about these symbols. They are [not printed]. Click [Show/Hide] again to hide them.",
        },
        howto: "marks",
      },
      {
        t: "Be safe!",
        lines: [
          "Take a [5-minute break] after every 45 to 50 minutes of work.",
        ],
        vis: { kind: "emoji", e: "💻 ⏰ 🧃" },
      },
    ],

    howto: [
      {
        k: "indent",
        t: "Change the indentation",
        code: "2.1.1",
        ic: "➡️",
        img: "indent",
        start: D,
        steps: [
          {
            act: "select",
            t: "para:2",
            say: "Select the paragraph that starts with [However].",
          },
          {
            act: "click",
            t: "para:indent-inc",
            say: "Click [Increase Indent]. The text moves away from the margin.",
          },
          {
            act: "click",
            t: "para:indent-dec",
            say: "Click [Decrease Indent]. The text moves back.",
          },
        ],
      },
      {
        k: "tab",
        t: "Indent the first line",
        code: "Tab",
        ic: "⇥",
        start: D,
        steps: [
          {
            act: "click",
            t: "pstart:2",
            say: "Click at the [beginning] of the paragraph, before [However].",
          },
          {
            act: "key",
            t: "key:Tab",
            key: "Tab",
            say: "Press [Tab]. The first line moves in.",
          },
        ],
      },
      {
        k: "spacing",
        t: "Change the line spacing",
        code: "2.1.2",
        ic: "↕️",
        img: "line-spacing",
        start: A,
        steps: [
          SEL1,
          {
            act: "click",
            t: "para:spacing",
            say: "Click [Line and Paragraph Spacing].",
          },
          { act: "click", t: "ls:1.5", say: "Click [1.5]." },
        ],
      },
      {
        k: "ruler",
        t: "Show the ruler",
        code: "View › Ruler",
        ic: "📏",
        start: A,
        steps: [
          { act: "click", t: "tab:View", say: "Click the [View] tab." },
          { act: "click", t: "view:ruler", say: "Click [Ruler]." },
        ],
      },
      {
        k: "paraspace",
        t: "Space between paragraphs",
        code: "2.1.3",
        ic: "↧",
        img: "para-spacing",
        start: A,
        steps: [
          SEL1,
          {
            act: "click",
            t: "para:spacing",
            say: "Click [Line and Paragraph Spacing].",
          },
          {
            act: "click",
            t: "sp:before",
            say: "Click [Add Space Before Paragraph].",
          },
        ],
      },
      {
        k: "shading",
        t: "Add shading",
        code: "2.1.4",
        ic: "🪣",
        img: "shading",
        start: A,
        steps: [
          SEL1,
          {
            act: "click",
            t: "shade-arrow",
            say: "Click the small arrow next to [Shading].",
          },
          {
            act: "click",
            t: "shade:0",
            say: "Click the colour [Dark Blue, Text 2, Lighter 90%].",
          },
        ],
      },
      {
        k: "borders",
        t: "Add a border",
        code: "2.1.5",
        ic: "🔲",
        img: "borders",
        start: A,
        steps: [
          SEL1,
          {
            act: "click",
            t: "borders-arrow",
            say: "Click the small arrow next to [Borders].",
          },
          {
            act: "click",
            t: "border:outside",
            say: "Click [Outside Borders].",
          },
        ],
      },
      {
        k: "charspace",
        t: "Character spacing",
        code: "2.1.6",
        ic: "↔️",
        img: "char-spacing",
        start: D,
        steps: [
          {
            act: "select",
            t: "w:1:6",
            say: "Select the word [intelligence].",
          },
          {
            act: "click",
            t: "font-dlg",
            say: "In the Font group, click the [expand] button.",
          },
          { act: "click", t: "fd:tab:Advanced", say: "Click [Advanced]." },
          {
            act: "click",
            t: "fd:spacing",
            say: "Click the [Spacing] list.",
          },
          { act: "click", t: "fdsp:Expanded", say: "Click [Expanded]." },
          {
            act: "type",
            t: "fd:by",
            text: "3 pt",
            say: "In the [By] box, type [3 pt].",
          },
          { act: "click", t: "fd:ok", say: "Click [OK]." },
        ],
      },
      {
        k: "marks",
        t: "Show or hide the marks",
        code: "2.1.7",
        ic: "¶",
        img: "marks",
        start: A,
        steps: [
          { act: "click", t: "para:marks", say: "Click [Show/Hide ¶]." },
          {
            act: "look",
            t: "para:1",
            say: "Look: [·] is a space, [¶] is Enter.",
            wait: 1500,
          },
          {
            act: "click",
            t: "para:marks",
            say: "Click [Show/Hide ¶] again to hide them.",
          },
        ],
      },
    ],

    games: [
      {
        k: "button",
        t: "Which button?",
        en: "Find the right button",
        ic: "🔘",
        items: [
          {
            type: "mc",
            q: "Move the text [farther] from the left margin.",
            opts: ["Increase Indent", "Decrease Indent", "Borders"],
            oi: ["indent-inc", "indent-dec", "borders"],
          },
          {
            type: "mc",
            q: "Move the text [closer] to the left margin.",
            opts: ["Decrease Indent", "Increase Indent", "Shading"],
            oi: ["indent-dec", "indent-inc", "shading"],
          },
          {
            type: "mc",
            q: "Put more space [between the lines].",
            opts: ["Line and Paragraph Spacing", "Show/Hide", "Borders"],
            oi: ["linespacing", "marks", "borders"],
          },
          {
            type: "mc",
            q: "Put a [colour behind] the paragraph.",
            opts: ["Shading", "Borders", "Increase Indent"],
            oi: ["shading", "borders", "indent-inc"],
          },
          {
            type: "mc",
            q: "Put [lines around] the paragraph.",
            opts: ["Borders", "Shading", "Line and Paragraph Spacing"],
            oi: ["borders:outside", "shading", "linespacing"],
          },
          {
            type: "mc",
            q: "See where you pressed [Space] and [Enter].",
            opts: ["Show/Hide", "Borders", "Decrease Indent"],
            oi: ["marks", "borders", "indent-dec"],
          },
        ],
      },
      {
        k: "match",
        t: "What does it do?",
        en: "Match the button and its job",
        ic: "🔗",
        items: [
          {
            type: "match",
            pairs: [
              { icon: "indent-inc", label: "Indents the text" },
              { icon: "linespacing", label: "Adds space between lines" },
              { icon: "shading", label: "Shades the text" },
              { icon: "borders:outside", label: "Adds borders to the text" },
            ],
          },
          {
            type: "match",
            pairs: [
              { icon: "borders:bottom", label: "Bottom border" },
              { icon: "borders:top", label: "Top border" },
              { icon: "borders:outside", label: "Outside borders" },
              { icon: "borders:none", label: "No border" },
            ],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Word",
        en: "Indent, spacing, shading, borders",
        ic: "📝",
        items: [
          {
            type: "sim",
            q: "Move the [However] paragraph away from the margin.",
            start: { doc: "dolphin", sel: "para:2" },
            steps: [
              {
                act: "click",
                t: "para:indent-inc",
                say: "The paragraph is selected. Click [Increase Indent].",
              },
            ],
          },
          {
            type: "sim",
            q: "Make the line spacing [2.0].",
            start: { doc: "animals", sel: "para:1" },
            steps: [
              {
                act: "click",
                t: "para:spacing",
                say: "Click [Line and Paragraph Spacing].",
              },
              { act: "click", t: "ls:2.0", say: "Click [2.0]." },
            ],
          },
          {
            type: "sim",
            q: "Put a [bottom border] under the heading [True friendship].",
            start: { doc: "animals", sel: "para:2" },
            steps: [
              {
                act: "click",
                t: "borders-arrow",
                say: "Click the small arrow next to [Borders].",
              },
              {
                act: "click",
                t: "border:bottom",
                say: "Click [Bottom Border].",
              },
            ],
          },
          {
            type: "sim",
            q: "Shade the heading [Amazing animals] in [yellow].",
            start: { doc: "animals", sel: "para:0" },
            steps: [
              {
                act: "click",
                t: "shade-arrow",
                say: "Click the small arrow next to [Shading].",
              },
              { act: "click", t: "shade:8", say: "Click [Yellow]." },
            ],
          },
          {
            type: "sim",
            q: "Show the [hidden marks] for spaces and Enter.",
            start: { doc: "animals" },
            steps: [
              { act: "click", t: "para:marks", say: "Click [Show/Hide ¶]." },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Paragraph facts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "Line spacing is the space between the lines of a paragraph.",
            a: true,
            img: "line-spacing",
          },
          {
            type: "tf",
            q: "Shading puts lines around the text.",
            a: false,
            x: "Shading is a [colour behind] the text. [Borders] are lines.",
            img: "shading",
          },
          {
            type: "tf",
            q: "The ¶ marks are printed on the paper.",
            a: false,
            x: "They are [not printed].",
            img: "marks",
          },
          {
            type: "tf",
            q: "Expanded character spacing puts more space between the letters.",
            a: true,
            img: "char-spacing",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "shading" },
          { type: "order", howto: "borders" },
          { type: "order", howto: "charspace" },
        ],
      },
    ],

    exercises: [
      {
        k: "handson",
        t: "True or false",
        en: "Book · Hands on 1.1–1.6",
        ic: "⚖️",
        from: "Book · Hands on! 1.1–1.6",
        items: [
          {
            type: "tf",
            q: 'Using the "Increase Indent" button, you can align text to the right.',
            a: false,
            x: "Increase Indent moves the text [farther from the left margin]. Align Right is another button.",
            icon: "indent-inc",
          },
          {
            type: "tf",
            q: "Indentation helps make paragraphs stand out from the left or right margin.",
            a: true,
            img: "indent",
          },
          {
            type: "tf",
            q: "Line spacing adjusts the space between words within a single sentence.",
            a: false,
            x: "Line spacing is the space [between the lines].",
            img: "line-spacing",
          },
          {
            type: "tf",
            q: "Non-printable characters do not include symbols for Enter, Spacebar, and Tab.",
            a: false,
            x: "They [do] show Enter ¶, Spacebar · and Tab →.",
            img: "marks",
          },
          {
            type: "tf",
            q: "Character spacing options allow you to increase or decrease the space between letters in a word.",
            a: true,
            img: "char-spacing",
          },
          {
            type: "tf",
            q: "Borders can only go around the whole document, not one paragraph.",
            a: false,
            x: "A border can go around [one paragraph] too.",
            img: "borders",
          },
        ],
      },
      {
        k: "buttons",
        t: "What does this button do?",
        en: "Book · Hands on 2.1–2.5",
        ic: "🔘",
        from: "Book · Hands on! 2.1–2.5",
        items: [
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "linespacing",
            opts: [
              "Adds more space between lines in a paragraph",
              "Moves the text closer to or farther from the margins",
              "Shows hidden characters like spaces, tabs, and paragraph marks",
              "Adds borders to selected text",
              "Adds shading to selected text",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "marks",
            opts: [
              "Shows hidden characters like spaces, tabs, and paragraph marks",
              "Moves the text closer to or farther from the margins",
              "Adds more space between lines in a paragraph",
              "Adds borders to selected text",
              "Adds shading to selected text",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "indent-inc",
            opts: [
              "Moves the text closer to or farther from the margins",
              "Adds more space between lines in a paragraph",
              "Shows hidden characters like spaces, tabs, and paragraph marks",
              "Adds borders to selected text",
              "Adds shading to selected text",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "shading",
            opts: [
              "Adds shading to selected text",
              "Moves the text closer to or farther from the margins",
              "Adds more space between lines in a paragraph",
              "Shows hidden characters like spaces, tabs, and paragraph marks",
              "Adds borders to selected text",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "borders",
            opts: [
              "Adds borders to selected text",
              "Moves the text closer to or farther from the margins",
              "Adds more space between lines in a paragraph",
              "Shows hidden characters like spaces, tabs, and paragraph marks",
              "Adds shading to selected text",
            ],
          },
        ],
      },
      {
        k: "think",
        t: "Think and answer",
        en: "Book · Hands on 3 and page 66",
        ic: "💭",
        from: "Book · Hands on! 3",
        items: [
          {
            type: "open",
            q: 'How does the "Show/Hide" button help you find and fix formatting issues in a document?',
            a: "It shows the [hidden marks]: · for a space, ¶ for Enter, → for Tab. You can see [extra spaces] and [empty lines] and delete them.",
            img: "marks",
          },
          {
            type: "open",
            q: "How can special markers in a document help you find extra spaces or blank lines?",
            a: "Two [·] side by side are an [extra space]. A [¶] alone on a line is a [blank line].",
            img: "girl-tip",
          },
        ],
      },
      {
        k: "tiny",
        t: "Tiny and Leo",
        en: "Book · Hands on 4 · format the story",
        ic: "🐭",
        from: "Book · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Make the title like the book: [blue] shading, [white] letters, in the [center], size [20].",
            img: "tiny-leo",
            start: { doc: "tiny" },
            steps: [
              {
                act: "select",
                t: "para:0",
                say: "Select the title [Tiny and Leo].",
              },
              {
                act: "click",
                t: "shade-arrow",
                say: "Click the small arrow next to [Shading].",
              },
              { act: "click", t: "shade:6", say: "Click [Blue]." },
              {
                act: "click",
                t: "color-arrow",
                say: "Click the small arrow next to [Font Color].",
              },
              { act: "click", t: "color:white", say: "Click [white]." },
              { act: "click", t: "align:center", say: "Click [Center]." },
              {
                act: "click",
                t: "font-size",
                say: "Click the [Font Size] list.",
              },
              { act: "click", t: "size:20", say: "Click [20]." },
            ],
          },
          {
            type: "sim",
            q: "Put [space between the letters] of the name [Tiny.]",
            start: { doc: "tiny" },
            steps: [
              { act: "select", t: "w:1:7", say: "Select the word [Tiny.]" },
              {
                act: "click",
                t: "font-dlg",
                say: "In the Font group, click the [expand] button.",
              },
              { act: "click", t: "fd:tab:Advanced", say: "Click [Advanced]." },
              {
                act: "click",
                t: "fd:spacing",
                say: "Click the [Spacing] list.",
              },
              { act: "click", t: "fdsp:Expanded", say: "Click [Expanded]." },
              {
                act: "type",
                t: "fd:by",
                text: "3 pt",
                say: "In the [By] box, type [3 pt].",
              },
              { act: "click", t: "fd:ok", say: "Click [OK]." },
            ],
          },
          {
            type: "sim",
            q: "Make the lion's words [bold], [blue] and on the [right].",
            start: { doc: "tiny", sel: "para:5" },
            steps: [
              {
                act: "click",
                t: "align:right",
                say: "The sentence is selected. Click [Align Right].",
              },
              { act: "click", t: "fmt:bold", say: "Click [Bold]." },
              {
                act: "click",
                t: "color-arrow",
                say: "Click the small arrow next to [Font Color].",
              },
              { act: "click", t: "color:blue", say: "Click [blue]." },
            ],
          },
          {
            type: "sim",
            q: "Add [space before] the lion's words, without the Spacebar.",
            start: { doc: "tiny", caret: [5, 10] },
            steps: [
              {
                act: "click",
                t: "para:spacing",
                say: "The cursor is in the lion's words. Click [Line and Paragraph Spacing].",
              },
              {
                act: "click",
                t: "sp:before",
                say: "Click [Add Space Before Paragraph].",
              },
            ],
          },
          {
            type: "sim",
            q: "Make the last paragraph [straight] on both sides.",
            start: { doc: "tiny" },
            steps: [
              {
                act: "click",
                t: "w:7:5",
                say: "Click in the last paragraph, after [He].",
              },
              { act: "click", t: "align:justify", say: "Click [Justify]." },
            ],
          },
        ],
      },
      {
        k: "hw2",
        t: "Homework 2",
        en: "School · HW2 for Term 1 · U2 L1",
        ic: "🏠",
        from: "School · HW2 (U2 L1)",
        items: [
          {
            type: "tf",
            q: "Line spacing adjusts the space between words within a sentence.",
            a: false,
            x: "Line spacing is the space [between the lines].",
            img: "line-spacing",
          },
          {
            type: "tf",
            q: "Borders can only go around the whole document.",
            a: false,
            x: "A border can go around [one paragraph] or a few words too.",
            img: "borders",
          },
          {
            type: "tf",
            q: 'You should click "Home tab" to indent the paragraph.',
            a: true,
            x: "Home tab › Paragraph group › [Increase Indent].",
            img: "indent",
          },
          {
            type: "tf",
            q: "You can add borders to all sides of the text.",
            a: true,
            img: "border-kinds",
          },
          {
            type: "tf",
            q: "You can add shading to the whole paragraph.",
            a: true,
            img: "shading",
          },
          {
            type: "tf",
            q: "Indentation is the space before the text starts.",
            a: true,
            x: "It is the distance from the [margin] to the text.",
            img: "indent",
          },
          {
            type: "match",
            pairs: [
              { icon: "linespacing", label: "Adds space between lines" },
              { icon: "indent-inc", label: "Indents the text" },
              { icon: "shading", label: "Shades the text" },
              { icon: "borders", label: "Adds borders to the text" },
            ],
          },
        ],
      },
    ],
  };
})();
