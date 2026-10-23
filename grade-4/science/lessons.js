// Science lessons for Grade 4 (Elevate Science), all terms. One entry per book topic (a folder topic-N/ with its lessons);
// add one entry per lesson (and its files to "also" in games.js for offline use).
// path and cover are relative to the topic folder.
window.CS_LESSONS = {
  grade: 4,
  part: "Topic",
  intro:
    "Pick a lesson. Each lesson has big pictures from the book, games, and the school exercises. Everything can be read aloud.",
  chapters: [
    {
      n: 1,
      dir: "topic-1",
      title: "Energy and Motion",
      items: [
        {
          n: 1,
          title: "Energy, Speed and Moving Objects",
          en: "Potential and kinetic energy, transfer and transform, forms of energy, speed, direction, forces",
          path: "lesson-1.html",
          cover: "img/lesson-1/coaster.jpg",
          note: "15 picture cards · 5 games · 7 exercises",
        },
        {
          n: 2,
          title: "Collisions",
          en: "Objects bump into each other: energy moves, sound and heat, Newton's cradle, fast crashes",
          path: "lesson-2.html",
          cover: "img/lesson-2/pins.jpg",
          note: "9 picture cards · 4 games · book questions",
        },
        {
          n: 3,
          title: "Energy Transfer",
          en: "Heat from hot to cold, conduction, convection, radiation, light, sound and waves",
          path: "lesson-3.html",
          cover: "img/lesson-3/kitchen.jpg",
          note: "17 picture cards · 1 video · 5 games · 9 exercises",
        },
        {
          n: 4,
          title: "Electric Circuits",
          en: "Electric charge, attract and repel, current, conductors and insulators, circuits, resistors",
          path: "lesson-4.html",
          cover: "img/lesson-4/circuit.jpg",
          note: "11 picture cards · 4 games · 7 exercises",
        },
      ],
    },
    {
      n: 2,
      dir: "topic-2",
      title: "Human Uses of Energy",
      items: [
        {
          n: 1,
          title: "Energy Conversions",
          en: "Fuels, combustion, the power plant (boiler, turbine, generator), batteries",
          path: "lesson-1.html",
          cover: "img/lesson-1/power-plant.jpg",
          note: "13 picture cards · 3 games · book questions",
        },
        {
          n: 2,
          title: "Nonrenewable Energy Sources",
          en: "Fossil fuels: coal, petroleum, natural gas; nuclear fuel; they run out",
          path: "lesson-2.html",
          cover: "img/lesson-2/oil-rigs.jpg",
          note: "11 picture cards · 4 games · book questions",
        },
        {
          n: 3,
          title: "Renewable Energy Sources",
          en: "Solar, wind, hydropower, geothermal, biomass: energy that does not run out",
          path: "lesson-3.html",
          cover: "img/lesson-3/renewable-all.jpg",
          note: "11 picture cards · 4 games · book questions",
        },
        {
          n: 4,
          title: "Environmental Impacts of Energy Use",
          en: "Pollution, acid rain, greenhouse gases, mining, oil spills, and how we can help",
          path: "lesson-4.html",
          cover: "img/lesson-4/ecosystems.jpg",
          note: "12 picture cards · 3 games · book questions",
        },
      ],
    },
    {
      n: 3,
      dir: "topic-3",
      title: "Waves and Information",
      items: [
        {
          n: 1,
          title: "Properties of Waves",
          en: "Crest, trough, amplitude, wavelength, frequency; transverse and longitudinal waves",
          path: "lesson-1.html",
          cover: "img/lesson-1/surfer.jpg",
          note: "12 picture cards · 4 games · book questions",
        },
        {
          n: 2,
          title: "Patterns of Waves",
          en: "Oscillation, circular and line waves, superposition",
          path: "lesson-2.html",
          cover: "img/lesson-2/circular.jpg",
          note: "9 picture cards · 4 games · book questions",
        },
        {
          n: 3,
          title: "Waves and the Electromagnetic Spectrum",
          en: "Reflect, refract, absorb; how the eye sees colors; transparent, translucent, opaque; X-rays",
          path: "lesson-3.html",
          cover: "img/lesson-3/banana-eye.jpg",
          note: "11 picture cards · 4 games · book questions",
        },
      ],
    },
  ],
};
