// Computer · Grade 3 · Unit 1 · Lesson 2 « Print » (book pages 13–17).
// All the content of the lesson. Same format as lesson-1.js. The school videos are in video/ (online only).
window.LESSON = {
  n: 2,
  grade: 3,
  title: "Print",
  unit: "Unit 1 · Lesson 2",
  book: "Book pages 13–17",
  cover: "desk-printer",
  question: {
    q: "How do printers help us [share] information? When do you need to [print] something?",
    a: "A printer puts what is on the screen onto [paper]: homework, photos, cards. Then we can [share] it and keep it.",
    img: "desk-printer",
  },

  ideas: [
    {
      t: "From screen to paper",
      lines: [
        "Anything on the screen can be [printed] on paper.",
        "Text, numbers, images and photos.",
        "The device that does this is a [printer].",
      ],
      img: "desk-printer",
    },
    {
      t: "Connect the printer",
      lines: [
        "The printer connects with a [USB cable] or [Wi-Fi].",
        "Turn the printer [on] before you print.",
      ],
      vis: { kind: "emoji", e: "💻 🔌 🖨️" },
    },
    {
      t: "Paper, stickers, envelopes",
      lines: [
        "You can print on paper of different [sizes].",
        "You can also print on [stickers] or [envelopes].",
      ],
      img: "girl-envelope",
    },
    {
      t: "Inkjet printer",
      lines: [
        "The [most common] printer.",
        "It sprays [tiny drops] of ink on the paper.",
        "It is [cheaper] than other printers. Use [photo paper] for clear photos.",
      ],
      img: "inkjet",
      video: "l2-inkjet-laser",
    },
    {
      t: "4 colours of ink",
      lines: [
        "An inkjet printer uses [4 colours] of ink:",
        "[cyan] (blue), [magenta] (pink), [yellow] and [black].",
        "With 4 colours it can print almost anything!",
      ],
      vis: { kind: "ink" },
    },
    {
      t: "Refill and save",
      lines: [
        "Is the cartridge empty? [Refill] it.",
        "You [save money] and protect the [environment].",
      ],
      img: "cartridge",
    },
    {
      t: "Laser printer",
      lines: [
        "It prints with [laser] rays.",
        "Very [fast] and very [good quality].",
        "Black and white or colour. [More expensive] than inkjet.",
      ],
      img: "laser",
      video: "l2-inkjet-laser",
    },
    {
      t: "Thermal printer",
      lines: [
        "Shops, supermarkets and restaurants print [receipts].",
        "The paper is [long and narrow].",
        "It usually prints in [black].",
      ],
      img: "thermal",
      video: "l2-thermal",
    },
    {
      t: "3D printer",
      lines: [
        "It makes [3D objects], not pictures on paper.",
        "It uses [plastic], [resin] or [metal].",
        "It builds the object [layer by layer].",
      ],
      img: "3d-printer",
      video: "l2-3d-printer",
    },
    {
      t: "Dot matrix printer",
      lines: [
        "The [oldest] printer. It is hardly used now.",
        "It prints [many copies] at the same time, but the quality is [low].",
      ],
      img: "dot-matrix",
    },
    {
      t: "Plotter",
      lines: [
        "The [biggest] printer.",
        "It prints [building plans] and big [banners].",
      ],
      img: "plotter",
      video: "l2-plotter",
    },
    {
      t: "Scanner",
      lines: [
        "A scanner takes a [picture] of a page.",
        "Then it sends the picture [into the computer].",
      ],
      img: "scanner",
    },
    {
      t: "Think about the planet",
      lines: ["[Recycle] paper, ink and toner cartridges."],
      vis: { kind: "emoji", e: "♻️ 🖨️ 🌍" },
    },
  ],

  videos: [
    {
      k: "inkjet-laser",
      t: "Inkjet vs laser",
      video: "l2-inkjet-laser",
      img: "inkjet",
    },
    { k: "thermal", t: "Thermal printer", video: "l2-thermal", img: "thermal" },
    { k: "plotter", t: "Plotter", video: "l2-plotter", img: "plotter" },
    { k: "3d", t: "3D printer", video: "l2-3d-printer", img: "3d-printer" },
  ],

  games: [
    {
      k: "shop",
      t: "Printer shop",
      en: "Pick the right printer for each job",
      ic: "🏪",
      items: [
        {
          type: "place",
          q: "A customer needs a [receipt] in the supermarket.",
          thing: { emoji: "🧾", label: "A receipt" },
          spots: [
            { t: "Thermal", img: "thermal" },
            { t: "Plotter", img: "plotter" },
            { t: "3D printer", img: "3d-printer" },
          ],
        },
        {
          type: "place",
          q: "An engineer needs a big [building plan].",
          thing: { emoji: "🏗️", label: "A building plan" },
          spots: [
            { t: "Plotter", img: "plotter" },
            { t: "Thermal", img: "thermal" },
            { t: "Dot matrix", img: "dot-matrix" },
          ],
        },
        {
          type: "place",
          q: "Mum wants a [colourful photo] for the wall.",
          thing: { emoji: "🖼️", label: "A colour photo" },
          spots: [
            { t: "Inkjet", img: "inkjet" },
            { t: "Thermal", img: "thermal" },
            { t: "Dot matrix", img: "dot-matrix" },
          ],
          x: "Use [photo paper] for clear photos.",
        },
        {
          type: "place",
          q: "Lucas wants a [toy car] he can hold in his hand.",
          thing: { emoji: "🚗", label: "A toy car" },
          spots: [
            { t: "3D printer", img: "3d-printer" },
            { t: "Laser", img: "laser" },
            { t: "Inkjet", img: "inkjet" },
          ],
        },
        {
          type: "place",
          q: "The school needs [200 pages], fast and clear.",
          thing: { emoji: "📚", label: "200 pages" },
          spots: [
            { t: "Laser", img: "laser" },
            { t: "Thermal", img: "thermal" },
            { t: "3D printer", img: "3d-printer" },
          ],
          x: "A laser printer is [fast] and very [good quality].",
        },
        {
          type: "place",
          q: "A shop needs a big [advertising banner].",
          thing: { emoji: "🪧", label: "A banner" },
          spots: [
            { t: "Plotter", img: "plotter" },
            { t: "Inkjet", img: "inkjet" },
            { t: "Scanner", img: "scanner" },
          ],
        },
        {
          type: "place",
          q: "Put a [drawing on paper] into the computer.",
          thing: { emoji: "🎨", label: "A drawing" },
          spots: [
            { t: "Scanner", img: "scanner" },
            { t: "Laser", img: "laser" },
            { t: "Plotter", img: "plotter" },
          ],
        },
      ],
    },
    {
      k: "match",
      t: "Match the printers",
      en: "Pictures and names",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "inkjet", label: "Inkjet" },
            { img: "laser", label: "Laser" },
            { img: "thermal", label: "Thermal" },
            { img: "3d-printer", label: "3D printer" },
            { img: "plotter", label: "Plotter" },
            { img: "dot-matrix", label: "Dot matrix" },
          ],
        },
      ],
    },
    {
      k: "tf",
      t: "True or false?",
      en: "Printer facts",
      ic: "✅",
      items: [
        {
          type: "tf",
          q: "A 3D printer builds objects layer by layer.",
          a: true,
          img: "3d-printer",
        },
        {
          type: "tf",
          q: "A thermal printer prints big banners.",
          a: false,
          img: "thermal",
          x: "It prints [receipts]. The [plotter] prints banners.",
        },
        {
          type: "tf",
          q: "An inkjet printer is cheaper than a laser printer.",
          a: true,
          img: "inkjet",
        },
        {
          type: "tf",
          q: "A scanner puts a picture of a page into the computer.",
          a: true,
          img: "scanner",
        },
        {
          type: "tf",
          q: "Throw away empty ink cartridges.",
          a: false,
          img: "cartridge",
          x: "[Refill] or [recycle] them.",
        },
        {
          type: "tf",
          q: "The dot matrix printer is the newest printer.",
          a: false,
          img: "dot-matrix",
          x: "It is the [oldest] printer.",
        },
        {
          type: "tf",
          q: "The printer connects with a USB cable or Wi-Fi.",
          a: true,
          img: "desk-printer",
        },
      ],
    },
    {
      k: "video",
      t: "Watch and answer",
      en: "Questions about the school videos",
      ic: "🎬",
      items: [
        {
          type: "mc",
          q: "Which printer prints the receipt in a shop?",
          opts: ["Thermal printer", "3D printer", "Plotter"],
          pics: ["thermal", "3d-printer", "plotter"],
        },
        {
          type: "mc",
          q: "Which printer makes a [real object] you can hold?",
          opts: ["3D printer", "Laser printer", "Scanner"],
          pics: ["3d-printer", "laser", "scanner"],
        },
        {
          type: "mc",
          q: "Which printer prints on a very [big roll] of paper?",
          opts: ["Plotter", "Thermal printer", "Inkjet printer"],
          pics: ["plotter", "thermal", "inkjet"],
        },
        {
          type: "mc",
          q: "Which printer uses [ink drops]?",
          opts: ["Inkjet printer", "Laser printer", "Thermal printer"],
          pics: ["inkjet", "laser", "thermal"],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "handson",
      t: "True or false",
      en: "Book · Hands on 1.1–1.6",
      ic: "✅",
      from: "Book · Hands on! 1.1–1.6",
      items: [
        {
          type: "tf",
          q: "If you were printing a building design plan, you would use a plotter.",
          a: true,
          img: "plotter",
        },
        {
          type: "tf",
          q: "An inkjet printer uses black, white, and red ink.",
          a: false,
          img: "inkjet",
          x: "It uses [cyan], [magenta], [yellow] and [black].",
        },
        {
          type: "tf",
          q: "You can print many copies at the same time using a dot matrix printer.",
          a: true,
          img: "dot-matrix",
        },
        {
          type: "tf",
          q: "A laser printer is more expensive than an inkjet printer.",
          a: true,
          img: "laser",
        },
        {
          type: "tf",
          q: "Shops print receipts using thermal printers.",
          a: true,
          img: "thermal",
        },
        {
          type: "tf",
          q: "Inkjet printers are more expensive than other types of printers.",
          a: false,
          img: "inkjet",
          x: "Inkjet printers are [less expensive].",
        },
      ],
    },
    {
      k: "words",
      t: "Choose the word",
      en: "Book · Hands on 2.1–2.4",
      ic: "🔤",
      from: "Book · Hands on! 2.1–2.4",
      items: [
        {
          type: "mc",
          q: "___ printers are best for printing high-quality photos.",
          opts: ["Inkjet", "Thermal", "Dot matrix"],
        },
        {
          type: "mc",
          q: "___ printers are commonly used in shops to print receipts.",
          opts: ["Thermal", "Inkjet", "3D"],
        },
        {
          type: "mc",
          q: "You can print on different materials, like stickers or ___.",
          opts: ["envelopes", "water", "wood"],
          img: "girl-envelope",
        },
        {
          type: "mc",
          q: "___ printers are known for their speed and high-quality printing, especially for documents.",
          opts: ["Laser", "Thermal", "Dot matrix"],
        },
      ],
    },
    {
      k: "think",
      t: "Think and answer",
      en: "Book · Hands on 3–4",
      ic: "💭",
      from: "Book · Hands on! 3–4",
      items: [
        {
          type: "open",
          q: "You need to print 200 pages of a book quickly and in high quality. Which printer would you choose: inkjet, laser, or thermal? Why?",
          a: "A [laser] printer, because it is very [fast] and the quality is very [high].",
          img: "laser",
        },
        {
          type: "open",
          q: "If you had to choose one type of printer for your school, which one would you pick and why?",
          a: "For example: a [laser] printer, because it prints many pages [fast] and [clearly].",
          img: "desk-printer",
        },
      ],
    },
    {
      k: "cw2",
      t: "Graded Classwork 2",
      en: "True or false, fill in, match",
      ic: "📝",
      from: "Graded Classwork (2)",
      items: [
        {
          type: "tf",
          q: "The printer is usually connected to the computer with a USB cable or via Wi-Fi.",
          a: true,
          img: "desk-printer",
        },
        {
          type: "tf",
          q: "An inkjet printer uses black, white and red ink.",
          a: false,
          img: "inkjet",
        },
        {
          type: "tf",
          q: "A thermal printer usually prints text in black ink.",
          a: true,
          img: "thermal",
        },
        {
          type: "mc",
          q: "The ___ printer is more expensive than an inkjet printer.",
          opts: ["laser", "3D", "thermal", "plotter"],
        },
        {
          type: "mc",
          q: "The ___ printer is used in supermarkets and restaurants.",
          opts: ["thermal", "laser", "3D", "plotter"],
        },
        {
          type: "mc",
          q: "The ___ printer is used to build objects layer by layer using plastic or metal.",
          opts: ["3D", "laser", "thermal", "plotter"],
        },
        {
          type: "mc",
          q: "The ___ printer is used to make large advertising banners.",
          opts: ["plotter", "laser", "3D", "thermal"],
        },
        {
          type: "match",
          pairs: [
            { img: "laser", label: "Laser printer" },
            { img: "inkjet", label: "Inkjet printer" },
            { img: "thermal", label: "Thermal printer" },
          ],
        },
      ],
    },
    {
      k: "assign",
      t: "Assignments A and B",
      en: "Choose the answer",
      ic: "🅰️",
      from: "Assignment A · B",
      items: [
        {
          type: "mc",
          q: "What does a thermal printer use to print receipts?",
          opts: ["Special paper", "Plastic", "Photo paper", "Metal"],
          img: "thermal",
        },
        {
          type: "mc",
          q: "What device can take a picture of a page and send it to your computer?",
          opts: ["Scanner", "Mouse", "Printer", "Camera"],
        },
        {
          type: "mc",
          q: "What is the main use of a 3D printer?",
          opts: [
            "To create three-dimensional objects",
            "To print receipts",
            "To print text",
            "To print photos",
          ],
          img: "3d-printer",
        },
        {
          type: "mc",
          q: "What is special about a plotter?",
          opts: [
            "It prints large design plans",
            "It prints photos",
            "It prints receipts",
            "It prints books",
          ],
          img: "plotter",
        },
        {
          type: "mc",
          q: "What kind of printer is often used for creating banners?",
          opts: [
            "Plotter",
            "Inkjet printer",
            "Thermal printer",
            "Laser printer",
          ],
        },
        {
          type: "mc",
          q: "What is a smart way to save money when using a printer?",
          opts: [
            "Refill ink cartridges",
            "Ignore empty cartridges",
            "Buy a new printer",
            "Throw away cartridges",
          ],
          img: "cartridge",
        },
        {
          type: "mc",
          q: "Which type of printer is best for printing colorful photos?",
          opts: [
            "Inkjet printer",
            "Dot matrix printer",
            "Laser printer",
            "Thermal printer",
          ],
        },
        {
          type: "mc",
          q: "What can a 3D printer make?",
          opts: [
            "Three-dimensional objects",
            "Photos",
            "Text documents",
            "Receipts",
          ],
        },
      ],
    },
    {
      k: "pa2",
      t: "Practical Assessment 2",
      en: "Booklet · Print",
      ic: "📒",
      from: "Booklet · Practical Assessment (2)",
      items: [
        {
          type: "tf",
          q: "The inkjet printer uses four colours of ink.",
          a: true,
          vis: { kind: "ink" },
          x: "Cyan (blue), magenta (pink), yellow and black.",
        },
        {
          type: "tf",
          q: "The laser printer is more expensive than inkjet.",
          a: true,
          img: "laser",
        },
        {
          type: "tf",
          q: "The thermal printer usually prints in black.",
          a: true,
          img: "thermal",
        },
        {
          type: "tf",
          q: "The printer doesn't connect with a USB cable or Wi-Fi.",
          a: false,
          img: "desk-printer",
          x: "It connects with a [USB cable] or [Wi-Fi].",
        },
        {
          type: "mc",
          q: "What is the thermal printer used for?",
          opts: ["Print a receipt", "Print a T-shirt"],
          img: "thermal",
        },
        {
          type: "mc",
          q: "What kind of paper does a thermal printer use?",
          opts: ["Long and narrow", "Short and wide"],
          img: "thermal",
        },
        {
          type: "multi",
          q: "Choose the [materials] a 3D printer can use to print.",
          opts: [
            { t: "Metal", emoji: "🔩", ok: true },
            { t: "Plastic", emoji: "🧴", ok: true },
            { t: "Resin", emoji: "🧪", ok: true },
            { t: "Paper", emoji: "📄" },
          ],
        },
        {
          type: "mc",
          q: "What does a 3D printer make?",
          opts: ["Three-dimensional objects", "A flat picture"],
          img: "3d-printer",
        },
        {
          type: "mc",
          q: "Which printer is used for large advertising banners?",
          opts: ["Plotter", "Laser"],
          pics: ["plotter", "laser"],
        },
      ],
    },
    {
      k: "wsearch",
      t: "Word search",
      en: "Booklet activity · printer types",
      ic: "🔎",
      from: "Booklet · Activity",
      items: [
        {
          type: "wsearch",
          q: "Find the [printer types] hidden in the puzzle.",
          words: [
            "3D PRINTER",
            "THERMAL",
            "INKJET",
            "LASER",
            "DOT MATRIX",
            "PLOTTER",
          ],
          size: 10,
        },
      ],
    },
  ],
};
