// Science · Grade 4 · Topic 3 · Lesson 4 « Waves and Information » (book pages 134–141).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 4,
  key: "sci4-t3-l4",
  grade: 4,
  title: "Waves and Information",
  unit: "Topic 3 · Lesson 4",
  book: "Book pages 134–141",
  cover: "cell-call",
  question: {
    q: "How do we send [information] with waves?",
    a: "A [transmitter] sends radio waves, an [antenna] takes them in, and a [receiver] changes them into sound, pictures or data.",
    img: "cell-call",
  },
  // the book's vocabulary + academic vocabulary (page 134)
  words: [
    { w: "Signal", m: "a message with information" },
    { w: "Transmitter", m: "sends out radio signals" },
    { w: "Antenna", m: "takes in the radio waves" },
    {
      w: "Receiver",
      m: "changes radio waves into a message: sound, pictures, data",
    },
    { w: "Digital", m: "in clear steps, like numbers: on or off" },
    { w: "Analog", m: "a smooth, continuous stream" },
    { w: "Range", m: "everything between two ends" },
    { w: "Code", m: "signs that stand for letters or words" },
  ],

  ideas: [
    {
      t: "Messages long ago",
      lines: [
        "Long ago people used [smoke signals].",
        "Letters went on horseback: the [Pony Express].",
        "Messages took [days] to arrive.",
      ],
      vis: { kind: "emoji", e: "🔥 💨 🐎 ✉️" },
    },
    {
      t: "Marconi and radio waves",
      lines: [
        "In the 1890s Marconi sent messages with [radio waves].",
        "Invisible waves carried messages [far] and [fast].",
      ],
      img: "towers",
    },
    {
      t: "Waves we cannot see",
      lines: [
        "[X-rays]: very short waves. They make pictures of bones.",
        "[Microwaves]: they heat food.",
        "[Radio waves]: we use them to communicate.",
      ],
      img: "xray-hand",
    },
    {
      t: "Radio waves carry signals",
      lines: [
        "A [signal] is a message with information.",
        "Radio waves carry signals for radio, TV, [cell phones] and the Internet.",
      ],
      img: "cell-tower",
    },
    {
      t: "A radio system",
      lines: [
        "[Transmitter]: sends out the radio signal.",
        "[Antenna]: takes in the radio waves.",
        "[Receiver]: changes the waves into music, pictures or data.",
      ],
      vis: { kind: "emoji", e: "📤 📡 📥" },
    },
    {
      t: "A cell phone call",
      lines: [
        "Your phone changes your voice into [radio waves].",
        "Antennas and a network send the signal to the other phone.",
        "The other phone changes it back into [sound].",
      ],
      img: "cell-call",
    },
    {
      t: "Why antennas are tall",
      lines: [
        "Antennas are put on [tall] towers.",
        "From high up, signals go [farther] and do not hit buildings and hills.",
      ],
      img: "antennas",
    },
    {
      t: "Digital and analog",
      lines: [
        "[Digital]: clear steps, like numbers (on / off).",
        "[Analog]: a smooth, continuous stream.",
        "Sing each note separately = digital. Slide your voice up = analog.",
      ],
      img: "digital",
    },
    {
      t: "Digital signals are useful",
      lines: [
        "Digital signals are easy to send [far] with radio waves.",
        "Computers use them to connect to the [Internet].",
      ],
      vis: { kind: "emoji", e: "💻 📶" },
    },
    {
      t: "Codes",
      lines: [
        "A [code] uses signs for letters or words.",
        "Morse code uses [dots] and [dashes]. It can be sent with waves.",
        "Braille uses raised dots that you [feel].",
      ],
      img: "code-wheel",
    },
    {
      t: "Technology copies life",
      lines: [
        "Our [ears] and [eyes] collect waves. Our brain decodes them.",
        "A [microphone] collects sound, like an ear.",
      ],
      img: "microphone",
    },
  ],

  games: [
    {
      k: "tar",
      t: "Transmitter, antenna or receiver?",
      en: "The parts of a radio system",
      ic: "📡",
      items: [
        ["It [sends out] the radio signal.", 0, "📻 ➡️"],
        ["It [takes in] the radio waves.", 1, "cell-tower"],
        ["It [changes] the waves into music or pictures.", 2, "📺"],
        ["Your phone changes your voice into radio waves.", 0, "📱 🗣️"],
        ["The tall tower that picks up phone signals.", 1, "antennas"],
        ["The radio plays music for you.", 2, "📻 🎵"],
      ].map(([q, k, p]) => {
        const all = [
          ["Transmitter", "📤"],
          ["Antenna", "📡"],
          ["Receiver", "📥"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)]; // the right one first
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
        };
      }),
    },
    {
      k: "da",
      t: "Digital or analog?",
      en: "Steps or a smooth stream",
      ic: "🔢",
      items: [
        ["Singing each note separately", true, "🎵"],
        ["Sliding your voice slowly up", false, "🎶"],
        ["On / off, 1 / 0", true, "💡"],
        ["A smooth, continuous stream", false, "〰️"],
        ["What computers use", true, "💻"],
        ["Morse code: dots and dashes", true, "• — •"],
      ].map(([t, dig, e]) => ({
        type: "mc",
        q: `[${t}]: digital or analog?`,
        opts: dig ? ["Digital", "Analog"] : ["Analog", "Digital"],
        icons: dig ? ["🔢", "〰️"] : ["〰️", "🔢"],
        two: true,
        emoji: e,
      })),
    },
    {
      k: "which",
      t: "Which wave?",
      en: "What we use them for",
      ic: "〰️",
      items: [
        ["Pictures of bones", 0, "xray-hand"],
        ["Heating food", 1, "🍲"],
        ["Cell phones, radio and TV", 2, "cell-tower"],
        ["The colors we see", 3, "🌈"],
      ].map(([t, k, p]) => {
        const all = [
          ["X-rays", "🩻"],
          ["Microwaves", "🍲"],
          ["Radio waves", "📻"],
          ["Visible light", "👁️"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q: `[${t}]: which waves?`,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
        };
      }),
    },
    {
      k: "order",
      t: "Put it in order",
      en: "A phone call, messages over time",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "A [phone call]",
          ask: "Put the steps of a phone call in order.",
          hint: "You speak first.",
          steps: [
            { say: "You speak into your phone", e: "🗣️" },
            { say: "Your phone makes radio waves", e: "📱" },
            { say: "An antenna picks up the signal", img: "cell-tower" },
            { say: "The network finds the other phone", e: "🌐" },
            { say: "The other phone changes it back into sound", e: "👂" },
          ],
        },
        {
          type: "order",
          t: "Messages, from [long ago] to [today]",
          ask: "Put the ways of sending messages in order, from long ago to today.",
          hint: "Smoke signals are the oldest.",
          steps: [
            { say: "Smoke signals", e: "🔥" },
            { say: "The Pony Express", e: "🐎" },
            { say: "Marconi's radio towers", img: "towers" },
            { say: "Cell phones", e: "📱" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 4 Check and more",
      ic: "📕",
      from: "Book · Lesson 4",
      items: [
        {
          type: "open",
          q: "What are three necessary parts of a radio communication system?",
          a: "A [transmitter], an [antenna] and a [receiver].",
          emoji: "📤 📡 📥",
        },
        {
          type: "open",
          q: "Morse code uses dots and dashes. Could it be sent easily as a digital signal? Why?",
          a: "[Yes]. Dots and dashes are clear steps, like on and off.",
          emoji: "• — •",
        },
        {
          type: "open",
          q: "Why do you think Marconi built tall towers?",
          a: "To send radio signals [farther].",
          img: "towers",
        },
        {
          type: "open",
          q: "Why are antennas put on tall structures?",
          a: "From high up the signals go [farther] and do not hit buildings and hills.",
          img: "antennas",
        },
        {
          type: "open",
          q: "What signals can you send or receive yourself?",
          a: "[Phone calls], text messages, TV, radio, Wi-Fi.",
          emoji: "📱 📺 📻",
        },
        {
          type: "open",
          q: "How is a microphone similar to an ear?",
          a: "Both [collect sound waves].",
          img: "microphone",
        },
        {
          type: "open",
          q: "Look at the two digital signals. What changed from the first to the second?",
          a: "The [frequency]: the second signal has more pulses in the same time.",
          img: "digital",
        },
        {
          type: "open",
          q: "People in a small town cannot use their cell phones. What questions would you ask?",
          a: "Is the [antenna] working? Is the network down? Is something [blocking] the signal?",
          img: "cell-tower",
        },
        {
          type: "open",
          q: "In a crowded, dark museum, would a digital or an analog signal be easier to send?",
          a: "[Digital]: clear on / off signals, like a blinking light, are easier to understand.",
          emoji: "🏛️ 🔦",
        },
      ],
    },
  ],
};
