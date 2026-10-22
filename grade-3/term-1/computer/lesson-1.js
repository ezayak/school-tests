// Computer · Grade 3 · Unit 1 · Lesson 1 « Storage » (book pages 8–12).
// All the content of the lesson. The engine is shared/computer-lesson.js (Grade 3 has no Mini Windows).
// Same format as the Grade 4 lessons: ideas = picture cards, games, exercises (book, homework, booklet).
window.LESSON = {
  n: 1,
  grade: 3,
  title: "Storage",
  unit: "Unit 1 · Lesson 1",
  book: "Book pages 8–12",
  cover: "usb",
  question: {
    q: "Why do we need [different] storage devices? How do you choose the [best] one?",
    a: "Each one is good for something: [big] space, [small] size, or [easy to carry]. Choose the one that fits your data.",
    img: "hdd",
  },

  ideas: [
    {
      t: "Saving your data",
      lines: [
        "The computer saves data on the [internal hard disk drive].",
        "We call it the [C: drive].",
        "Too much data? Use an [external] storage device.",
      ],
      vis: { kind: "emoji", e: "💻 💾" },
    },
    {
      t: "Hard disk drive",
      lines: [
        "The [hard disk drive] has the [largest] space of all.",
        "It can store [a thousand movies] or [a million songs].",
      ],
      img: "hdd",
    },
    {
      t: "USB flash drive",
      lines: [
        "Save your data and [move] it to another computer.",
        "It is [cheap], [light] and hard to break.",
        "Put it on your [key chain] and carry it with you!",
      ],
      img: "usb",
    },
    {
      t: "Memory card",
      lines: [
        "Very [thin] and [small].",
        "Used in [smartphones], [cameras], tablets and game consoles.",
        "Move photos from your phone to the [computer].",
      ],
      img: "memory-card",
    },
    {
      t: "CD and DVD",
      lines: [
        "A [CD] holds music and documents, but [no movies]: not enough space.",
        "A [DVD] holds [several movies].",
        "Don't [scratch] them, or your data is lost!",
      ],
      img: "cd-dvd",
    },
    {
      t: "Blu-ray",
      lines: [
        "[Blu-ray] is newer than DVD. It looks the same.",
        "It holds [much more]: [high definition] movies and thousands of songs.",
      ],
      img: "blu-ray",
    },
    {
      t: "Which holds more?",
      lines: [
        "From [small] to [big]:",
        "[CD] → [DVD] → [Blu-ray] → [hard disk drive].",
      ],
      vis: {
        kind: "bars",
        items: [
          { e: "💿", label: "CD", v: 1, note: "music, documents" },
          { e: "📀", label: "DVD", v: 2, note: "several movies" },
          { img: "blu-ray", label: "Blu-ray", v: 4, note: "HD movies" },
          { img: "hdd", label: "Hard disk", v: 9, note: "1000 movies" },
        ],
      },
    },
    {
      t: "Long names",
      lines: [
        "[CD] = Compact Disc",
        "[DVD] = Digital Versatile Disc",
        "[HDD] = Hard Disk Drive",
      ],
      vis: {
        kind: "lines",
        rows: [
          "CD = Compact Disc",
          "DVD = Digital Versatile Disc",
          "HDD = Hard Disk Drive",
        ],
      },
    },
    {
      t: "Long ago: the floppy disk",
      lines: [
        "In the 70s and 80s we saved data on a [floppy disk].",
        "It had very [little] space. Now it is [old].",
      ],
      vis: { kind: "emoji", e: "💾" },
    },
  ],

  games: [
    {
      k: "desk",
      t: "Device desk",
      en: "Put each device in its place",
      ic: "🖥️",
      items: [
        {
          type: "place",
          q: "Plug the [USB flash drive] into the computer.",
          thing: { img: "usb", label: "USB flash drive" },
          spots: [
            { t: "Computer (USB port)", emoji: "💻" },
            { t: "Phone", emoji: "📱" },
            { t: "Disc tray", emoji: "📀" },
          ],
        },
        {
          type: "place",
          q: "Put the [memory card] in the device that takes photos.",
          thing: { img: "memory-card", label: "Memory card" },
          spots: [
            { t: "Smartphone / camera", emoji: "📱📷" },
            { t: "Disc tray", emoji: "📀" },
            { t: "Key chain", emoji: "🔑" },
          ],
        },
        {
          type: "place",
          q: "Put the [DVD] where it can play.",
          thing: { img: "cd-dvd", label: "DVD" },
          spots: [
            { t: "Disc tray", img: "blu-ray" },
            { t: "USB port", emoji: "🔌" },
            { t: "Phone", emoji: "📱" },
          ],
        },
        {
          type: "place",
          q: "Too much data! Connect the [external hard disk drive].",
          thing: { img: "hdd", label: "External hard disk" },
          spots: [
            { t: "Laptop (with a cable)", emoji: "💻" },
            { t: "Camera", emoji: "📷" },
            { t: "Game pad", emoji: "🎮" },
          ],
        },
        {
          type: "place",
          q: "Take your [USB flash drive] everywhere. Where do you put it?",
          thing: { img: "usb", label: "USB flash drive" },
          spots: [
            { t: "On a key chain", emoji: "🔑" },
            { t: "In the fridge", emoji: "🧊" },
            { t: "In the printer", emoji: "🖨️" },
          ],
        },
      ],
    },
    {
      k: "which",
      t: "Which one would you use?",
      en: "Choose the best device",
      ic: "🤔",
      items: [
        {
          type: "mc",
          q: "Save [a thousand] movies and songs.",
          opts: ["Hard disk drive", "USB flash drive", "CD"],
          pics: ["hdd", "usb", "cd-dvd"],
        },
        {
          type: "mc",
          q: "Carry your homework to school [in your pocket].",
          opts: ["USB flash drive", "Hard disk drive", "Blu-ray"],
          pics: ["usb", "hdd", "blu-ray"],
        },
        {
          type: "mc",
          q: "Store [more photos] on your smartphone.",
          opts: ["Memory card", "DVD", "Hard disk drive"],
          pics: ["memory-card", "cd-dvd", "hdd"],
        },
        {
          type: "mc",
          q: "Watch a movie in [high definition].",
          opts: ["Blu-ray", "CD", "Memory card"],
          pics: ["blu-ray", "cd-dvd", "memory-card"],
        },
        {
          type: "mc",
          q: "Music on a [disc], but no movies.",
          opts: ["CD", "Blu-ray", "USB flash drive"],
          pics: ["cd-dvd", "blu-ray", "usb"],
        },
        {
          type: "mc",
          q: "The computer saves its files here. It is called [C:].",
          opts: ["Internal hard disk drive", "Memory card", "CD"],
          emoji: "💻",
        },
      ],
    },
    {
      k: "order",
      t: "Small to big",
      en: "Which holds more?",
      ic: "📊",
      items: [
        {
          type: "order",
          t: "From the [smallest] space to the [biggest]",
          ask: "Put them in order, from the smallest space to the biggest.",
          hint: "Tap the smallest first.",
          steps: [
            { say: "CD", e: "💿" },
            { say: "DVD", e: "📀" },
            { say: "Blu-ray", img: "blu-ray" },
            { say: "Hard disk drive", img: "hdd" },
          ],
        },
        {
          type: "order",
          t: "From the [largest] storage to the [smallest]",
          ask: "Put the discs in order, from the largest storage to the smallest.",
          hint: "Tap the biggest first.",
          steps: [
            { say: "Blu-ray", img: "blu-ray" },
            { say: "DVD", e: "📀" },
            { say: "CD", e: "💿" },
          ],
        },
      ],
    },
    {
      k: "match",
      t: "Match",
      en: "Pictures and names",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "usb", label: "USB flash drive" },
            { img: "memory-card", label: "Memory card" },
            { img: "cd-dvd", label: "CD / DVD" },
            { img: "hdd", label: "Hard disk drive" },
            { img: "blu-ray", label: "Blu-ray" },
          ],
        },
      ],
    },
    {
      k: "tf",
      t: "True or false?",
      en: "Storage facts",
      ic: "✅",
      items: [
        {
          type: "tf",
          q: "The hard disk drive has the largest space.",
          a: true,
          img: "hdd",
        },
        {
          type: "tf",
          q: "A USB flash drive is heavy and breaks easily.",
          a: false,
          img: "usb",
          x: "It is [light] and hard to damage.",
        },
        {
          type: "tf",
          q: "You can use a memory card in a camera.",
          a: true,
          img: "memory-card",
        },
        {
          type: "tf",
          q: "A CD has space for movies.",
          a: false,
          img: "cd-dvd",
          x: "A [DVD] or [Blu-ray] holds movies.",
        },
        {
          type: "tf",
          q: "If you scratch a DVD, you can lose your data.",
          a: true,
          img: "cd-dvd",
        },
        {
          type: "tf",
          q: "Today we save our data on floppy disks.",
          a: false,
          emoji: "💾",
          x: "The floppy disk is [old]. It had very little space.",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "hw1",
      t: "Graded Homework 1",
      en: "Storage devices",
      ic: "📝",
      from: "Graded Homework (1)",
      items: [
        {
          type: "mc",
          q: "What is special about Blu-ray disc?",
          opts: ["It stores high-definition movies", "It stores pictures only"],
          img: "blu-ray",
        },
        {
          type: "mc",
          q: "Which device has the largest storage space?",
          opts: ["Hard disk drive", "Flash memory"],
          pics: ["hdd", "usb"],
        },
        {
          type: "mc",
          q: "What is the purpose of a hard disk drive in a computer?",
          opts: [
            "To store a thousand movies or a million songs",
            "To store a little data",
          ],
          img: "hdd",
        },
        {
          type: "mc",
          q: "Which device can be attached to a key chain for easy transport?",
          opts: ["USB flash drive", "Memory card"],
          pics: ["usb", "memory-card"],
        },
        {
          type: "order",
          t: "Arrange the discs from the [largest] storage to the [smallest]",
          ask: "Arrange the storage discs from the largest storage to the smallest.",
          hint: "Tap the biggest first.",
          steps: [
            { say: "Blu-ray", img: "blu-ray" },
            { say: "DVD", e: "📀" },
            { say: "CD", e: "💿" },
          ],
        },
        {
          type: "mc",
          q: "Write the full name: [DVD] = ___",
          opts: [
            "Digital Versatile Disc",
            "Digital Video Drive",
            "Data Very Deep",
          ],
        },
        {
          type: "mc",
          q: "Write the full name: [CD] = ___",
          opts: ["Compact Disc", "Computer Drive", "Colour Disc"],
        },
        {
          type: "mc",
          q: "Write the full name: [HDD] = ___",
          opts: ["Hard Disk Drive", "High Data Disc", "Hard Drive Door"],
        },
      ],
    },
    {
      k: "pa1",
      t: "Who am I?",
      en: "Booklet · Practical Assessment 1",
      ic: "🕵️",
      from: "Booklet · Practical Assessment (1)",
      items: [
        {
          type: "mc",
          q: "I have the largest storage space of all storage devices.",
          opts: ["Hard disk", "CD"],
          pics: ["hdd", "cd-dvd"],
        },
        {
          type: "mc",
          q: "I can easily move data from one computer to another device.",
          opts: ["Flash memory", "Local Disk (E:)"],
          pics: ["usb", null],
        },
        {
          type: "mc",
          q: "I am thin and very small.",
          opts: ["Memory card", "Hard disk"],
          pics: ["memory-card", "hdd"],
        },
        {
          type: "mc",
          q: "You use me with smartphones to store more photos.",
          opts: ["Memory card", "Recycle Bin"],
          pics: ["memory-card", null],
        },
        {
          type: "mc",
          q: "I am Local Disk C:, the ___ hard drive.",
          opts: ["internal", "external"],
          emoji: "💻",
        },
        {
          type: "match",
          pairs: [
            { img: "usb", label: "USB flash drive" },
            { img: "memory-card", label: "Memory card" },
            { img: "cd-dvd", label: "CD / DVD" },
            { img: "hdd", label: "Hard disk drive" },
          ],
        },
        {
          type: "mc",
          q: "Which of these stores high-definition movies?",
          opts: ["Blu-ray", "DVD", "CD"],
          pics: ["blu-ray", "cd-dvd", "cd-dvd"],
        },
      ],
    },
  ],
};
