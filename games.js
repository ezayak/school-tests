// Catalog of all quiz games. To add a game: put the .html file in
// grade-N/term-N/<period>/ and add one entry below. The index page groups by
// grade → term → period → subject automatically.
//
// period: use one of the names in PERIODS (index.html) so it sorts correctly,
// e.g. "Mid-term 1", "Final term 1", "Mid-term 2", "Final term 2".
window.GAMES = [
  { grade: 3, term: 1, period: "Mid-term 1", subject: "Science", title: "Motion Quest",
    lesson: "Topic 1 · L1 Motion, L2 Patterns in Motion",
    topics: "Position, reference point, direction, distance, speed, patterns of motion",
    path: "grade-3/term-1/mid-term-1/science-motion.html", questions: 51, year: "2026–2027" },
  { grade: 3, term: 1, period: "Mid-term 1", subject: "Social Studies", title: "Climate Quest",
    lesson: "Ch. 1 L2 · Weather, Climate, and Forces of Nature",
    topics: "Weather vs climate, types of climates, vegetation, ecosystems, natural hazards",
    path: "grade-3/term-1/mid-term-1/social-studies-weather-climate.html", questions: 57, year: "2026–2027" },
  { grade: 3, term: 1, period: "Mid-term 1", subject: "French", title: "La Présentation",
    lesson: "Leçon 1 · La présentation",
    topics: "Se présenter, les personnages, les consignes, mets en ordre, voyelles",
    path: "grade-3/term-1/mid-term-1/french-la-presentation.html", questions: 65, year: "2026–2027" },
  { grade: 4, term: 1, period: "Mid-term 1", subject: "Science", title: "Energy Quest",
    lesson: "Topic 1 · Energy, speed & motion; Energy transfer",
    topics: "Potential & kinetic energy, transfer & transformation, heat, light, sound",
    path: "grade-4/term-1/mid-term-1/science-energy.html", questions: 61, year: "2026–2027" },
  { grade: 4, term: 1, period: "Mid-term 1", subject: "Social Studies", title: "USA Explorer",
    lesson: "Ch. 1 · L1 Land and Regions, L2 Weather and Climate",
    topics: "Landforms, 5 regions of the USA, weather, climate, climates of the USA",
    path: "grade-4/term-1/mid-term-1/social-studies-land-regions-climate.html", questions: 63, year: "2026–2027" },
  { grade: 4, term: 1, period: "Mid-term 1", subject: "French", title: "La Rencontre",
    lesson: "Leçon 1 · La rencontre",
    topics: "Le verbe s'appeler, Qui est-ce ?, le son « ou », mets en ordre, compréhension",
    path: "grade-4/term-1/mid-term-1/french-la-rencontre.html", questions: 71, year: "2026–2027" },
];
