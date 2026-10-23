// Science · Grade 4 · Topic 4 · Lesson 3 « Rocks, Minerals, and Soil » (book pages 174–183).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
const ROCKS = [
  ["Igneous", "igneous"],
  ["Sedimentary", "sedimentary"],
  ["Metamorphic", "slate"],
];
window.LESSON = {
  n: 3,
  key: "sci4-t4-l3",
  grade: 4,
  title: "Rocks, Minerals, and Soil",
  unit: "Topic 4 · Lesson 3",
  book: "Book pages 174–183",
  cover: "rock-cycle",
  question: {
    q: "How do [rocks] and [soil] form?",
    a: "Rocks form in 3 ways: from hot [magma] (igneous), from [layers] (sedimentary), or changed by [heat and pressure] (metamorphic). Soil is [broken rock], air, water and dead plants.",
    img: "rock-cycle",
  },
  // the book's vocabulary + academic vocabulary (page 174) + words of the lesson
  words: [
    { w: "Igneous rock", m: "forms when hot magma or lava cools" },
    {
      w: "Sedimentary rock",
      m: "forms from layers of sand and mud stuck together",
    },
    { w: "Metamorphic rock", m: "rock changed by heat and pressure" },
    { w: "Magma", m: "hot liquid rock inside the Earth" },
    { w: "Rock cycle", m: "rocks change from one type to another" },
    { w: "Mineral", m: "what rocks are made of; it has crystals" },
    { w: "Soil", m: "broken rock, air, water and dead plants" },
    { w: "Characteristic", m: "a feature, a quality" },
  ],

  ideas: [
    {
      t: "Rocks are everywhere",
      lines: [
        "Phones, computers and toasters have materials from [rocks] and [minerals].",
        "Phone glass has [quartz], a mineral from rocks.",
      ],
      img: "phone",
    },
    {
      t: "Igneous rock",
      lines: [
        "Hot liquid rock is [magma]. On the surface it is [lava].",
        "When it [cools], it becomes [igneous] rock.",
        "Igneous rock is found where there are [volcanoes].",
      ],
      img: "igneous",
    },
    {
      t: "Sedimentary rock",
      lines: [
        "Sand and mud settle in [layers].",
        "Over time the layers stick together like glue: [sedimentary] rock.",
      ],
      img: "sedimentary",
    },
    {
      t: "Kinds of sedimentary rock",
      lines: [
        "[Sandstone]: from sand.",
        "[Conglomerate]: chunks of rock glued together.",
        "[Limestone]: from bones and shells of sea animals.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "sandstone", label: "Sandstone" },
          { img: "conglomerate", label: "Conglomerate" },
          { img: "limestone", label: "Limestone" },
        ],
      },
    },
    {
      t: "Metamorphic rock",
      lines: [
        "[Heat] and [pressure] change a rock: [metamorphic] rock.",
        "Limestone becomes [marble]. Shale becomes [slate].",
      ],
      img: "slate",
    },
    {
      t: "The rock cycle",
      lines: [
        "Rocks change from one type to another over millions of years.",
        "Magma cools → igneous. Bits settle → sedimentary.",
        "Heat and pressure → metamorphic. Rock melts → magma again.",
      ],
      img: "rock-cycle",
    },
    {
      t: "Minerals",
      lines: [
        "Rocks are made of [minerals].",
        "Minerals differ in color, shine ([luster]), [streak] and [hardness].",
        "[Talc] is the softest. [Diamond] is the hardest.",
      ],
      img: "minerals",
    },
    {
      t: "Soil",
      lines: [
        "Soil = broken rock ([sand], [silt], [clay]) + air + water + dead plants.",
        "[Topsoil] is on top. It is rich and good for plants.",
        "Below are [subsoil] and broken rock.",
      ],
      img: "soil",
    },
  ],

  games: [
    {
      k: "type",
      t: "Which kind of rock?",
      en: "Igneous, sedimentary, metamorphic",
      ic: "🪨",
      items: [
        ["Hot magma cools and hardens.", 0],
        ["Layers of sand stick together.", 1],
        ["Heat and pressure change a rock.", 2],
        ["Lava from a volcano cools.", 0],
        ["Shells and bones of sea animals pile up: limestone.", 1],
        ["Limestone is squeezed and heated into marble.", 2],
      ].map(([q, k]) => {
        const o = [ROCKS[k], ...ROCKS.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "cycle",
      t: "The rock cycle",
      en: "Put it in order",
      ic: "🔄",
      items: [
        {
          type: "order",
          t: "The [rock cycle]",
          ask: "Put the steps of the rock cycle in order.",
          hint: "Start with the hot magma.",
          steps: [
            { say: "Hot magma cools: igneous rock", img: "igneous" },
            { say: "Rain breaks rock into bits", e: "🌧️" },
            {
              say: "The bits settle in layers: sedimentary rock",
              img: "sedimentary",
            },
            { say: "Heat and pressure: metamorphic rock", img: "slate" },
            { say: "The rock melts into magma again", e: "🌋" },
          ],
        },
      ],
    },
    {
      k: "soil",
      t: "Minerals and soil",
      en: "Hard, soft, topsoil",
      ic: "💎",
      items: [
        {
          type: "mc",
          q: "The [hardest] mineral is ___",
          opts: ["diamond", "talc", "chalk"],
          icons: ["💎", "🧂", "🖍️"],
          img: "minerals",
        },
        {
          type: "mc",
          q: "The [softest] mineral is ___",
          opts: ["talc", "diamond", "gold"],
          icons: ["🧂", "💎", "🪙"],
          img: "minerals",
        },
        {
          type: "mc",
          q: "Which soil layer is best for plants?",
          opts: ["Topsoil", "Parent material", "Subsoil"],
          img: "soil",
        },
        {
          type: "multi",
          q: "What is soil made of? (choose all)",
          opts: [
            { t: "Broken rock", emoji: "🪨", ok: true },
            { t: "Air", emoji: "💨", ok: true },
            { t: "Water", emoji: "💧", ok: true },
            { t: "Dead plants", emoji: "🍂", ok: true },
            { t: "Plastic", emoji: "🧴" },
          ],
        },
        {
          type: "mc",
          q: "Water goes through [sandy] soil ___",
          opts: ["quickly", "slowly"],
          two: true,
          emoji: "🏖️ 💧",
        },
      ],
    },
    {
      k: "land",
      t: "Rocky landforms",
      en: "Mountain, plateau, cliff",
      ic: "⛰️",
      items: [
        {
          type: "match",
          pairs: [
            { img: "mountain", label: "Mountain" },
            { img: "plateau", label: "Plateau" },
            { img: "cliff", label: "Coastal cliff" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 3 Check and more",
      ic: "📕",
      from: "Book · Lesson 3",
      items: [
        {
          type: "open",
          q: "How are soil, rocks and minerals related?",
          a: "Rocks are made of [minerals]. Soil is made of [broken rock], plus air, water and dead plants.",
          img: "soil",
        },
        {
          type: "open",
          q: "How could you sort minerals by their properties?",
          a: "By [color], [luster] (shine), [streak], [hardness], or metal and gem.",
          img: "minerals",
        },
        {
          type: "open",
          q: "Igneous rock is found along plate boundaries. Why?",
          a: "There are [volcanoes] there. Magma comes up and cools into igneous rock.",
          img: "igneous",
        },
        {
          type: "open",
          q: "Sedimentary rock wears away quickly; igneous and metamorphic slowly. Which might make up a coastal cliff? Why?",
          a: "[Igneous] or [metamorphic] rock. It is hard, so the waves wear it away slowly.",
          img: "cliff",
        },
        {
          type: "open",
          q: "What might happen if you grow crops in soil with little topsoil?",
          a: "The crops would [not grow well]. Topsoil has the food plants need.",
          img: "soil",
        },
        {
          type: "open",
          q: "What everyday things might contain rocks or minerals?",
          a: "[Glass], [phones], [coins], [jewelry], pencils, salt.",
          img: "phone",
        },
        {
          type: "open",
          q: "What would you feel if you touched each kind of rock?",
          a: "Sandstone: [rough] and sandy. Slate: [smooth]. Conglomerate: [bumpy].",
          vis: {
            kind: "strip",
            items: [
              { img: "sandstone", label: "Sandstone" },
              { img: "slate", label: "Slate" },
              { img: "conglomerate", label: "Conglomerate" },
            ],
          },
        },
      ],
    },
  ],
};
