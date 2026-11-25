/* Social Studies (Arabic) · Grade 4 (Alex) · Revision 2, the November revision (Term 2, mid-term exam card):
   «تدريبات الكتاب المدرسي على مقرر شهر نوفمبر» (20261123-تدريبات الكتاب المدرسي علي مقرر شهر نوفم.pdf, 2026-11-23, 3 pages):
   the book's Unit 2 exercises (book pp. 68–69) and the exercises of Unit 3 lesson 1 (book p. 77), with the teacher's answers written in (the key).
   What the November exam covers: 20261123-الصفالرابع الابتدائى.pdf (2026-11-23): Unit 2 lessons 1–5 and Unit 3 lesson 1.
   Lessons: u2-lesson-1 … u2-lesson-5, u3-lesson-1 (their text, tashkeel and pictures reused; pictures copied into img/revision-2/).
   Sections in the sheet's order (the p. 77 questions join the section of their kind): right or wrong, choose, complete, explain why,
   results (ما النتائج المترتبة · ماذا يحدث إذا · حدد نتيجة), prove & link, what is meant by, the flags in order (p. 77: one question per flag, cropped from the book).
   Written answers are the key's answer + 2 wrong ones. Nothing of the sheet left out.
   Key terms: أهم المصطلحات of the teacher's handouts (lessons 3, 4, 5, U3 L1) and the main words of the lessons' Learn parts (lessons 1, 2). */
window.SSA_REV = {
  key: "ssa4-r2",
  eyebrow: "Grade 4 Social Studies (Arabic) · November revision",
  sub: "تَدْرِيبَاتُ الْكِتَابِ الْمَدْرَسِيِّ عَلَى مُقَرَّرِ شَهْرِ نُوفَمْبِرَ",
  img: "img/revision-2/",
  units: [
    { k: "1", t: "U2 L1" },
    { k: "2", t: "U2 L2" },
    { k: "3", t: "U2 L3" },
    { k: "4", t: "U2 L4" },
    { k: "5", t: "U2 L5" },
    { k: "6", t: "U3 L1" },
    { k: "all", t: "All" },
  ],
  mix: 15,
  sheet: [
    {
      k: "tf",
      ic: "⚖️",
      t: "Right or wrong",
      ar: "اكْتُبْ (صَوَابٌ) أَوْ (خَطَأٌ)",
      qs: [
        {
          q: "تَطْوِيرُ الْمُدُنِ يَشْمَلُ تَوْسِيعَ الطُّرُقِ وَتَحْدِيثَ وَسَائِلِ الْمُوَاصَلَاتِ.",
          en: "Developing cities includes widening roads and modernising transport.",
          tf: true,
          p: "train-new",
        },
        {
          q: "تَعْمَلُ الْمَنَاطِقُ الصِّنَاعِيَّةُ عَلَى تَنْقِيَةِ الْهَوَاءِ فِي الْمَدِينَةِ.",
          en: "Industrial areas clean the air in the city.",
          tf: false,
          x: "Green spaces (الْمَسَاحَاتُ الْخَضْرَاءُ) clean the air; factories pollute it, so they are built on the edges of cities.",
          p: "factory",
        },
        {
          q: "تُقَدِّمُ الشُّرْطَةُ خَدَمَاتٍ تَعْلِيمِيَّةً لِلْمُوَاطِنِينَ.",
          en: "The police give people education services.",
          tf: false,
          x: "The police give security services (خَدَمَاتٌ أَمْنِيَّةٌ); schools give education services.",
          p: "police",
        },
        {
          q: "نَجَحَتِ الْمُقَاوَمَةُ الشَّعْبِيَّةُ فِي حِمَايَةِ مَدِينَةِ السُّوَيْسِ خِلَالَ حَرْبِ أُكْتُوبَرَ.",
          en: "The people's resistance managed to protect the city of Suez during the October War.",
          tf: true,
          p: "suez-war",
        },
        {
          q: "تُقَدِّمُ مَرَاكِزُ الْحِمَايَةِ الْمَدَنِيَّةِ خَدَمَاتٍ أَمْنِيَّةً لِلْمُوَاطِنِينَ.",
          en: "Civil protection centres give people security services.",
          tf: true,
          p: "fire-truck",
        },
        {
          q: "تَمَّ تَقْسِيمُ مِصْرَ إِلَى مُحَافَظَاتٍ لِتَسْهِيلِ إِدَارَتِهَا.",
          en: "Egypt was divided into governorates to make it easier to run.",
          tf: true,
          p: "gov-map",
          fit: 1,
        },
        {
          q: "تَقَعُ الْعَاصِمَةُ الْإِدَارِيَّةُ الْجَدِيدَةُ شَرْقَ مُحَافَظَةِ الْقَاهِرَةِ.",
          en: "The New Administrative Capital is east of Cairo Governorate.",
          tf: true,
          p: "new-capital",
        },
        {
          q: "تُطِلُّ مَدِينَةُ الْغَرْدَقَةِ عَلَى سَاحِلِ الْبَحْرِ الْمُتَوَسِّطِ.",
          en: "The city of Hurghada lies on the coast of the Mediterranean Sea.",
          tf: false,
          x: "Hurghada is on the coast of the Red Sea (الْبَحْرُ الْأَحْمَرُ); Alexandria and Port Said are on the Mediterranean.",
          p: "coast-city",
        },
        {
          q: "يُعَبِّرُ عَلَمُ الدَّوْلَةِ عَنْ تَارِيخِهَا وَشَعْبِهَا.",
          en: "A country's flag shows its history and its people.",
          tf: true,
          p: "flag",
        },
        {
          q: "يُرْفَعُ عَلَمُ مِصْرَ فِي الْمُؤْتَمَرَاتِ وَالْمُنَاسَبَاتِ الدَّوْلِيَّةِ.",
          en: "Egypt's flag is raised at conferences and international occasions.",
          tf: true,
          p: "conference",
        },
        {
          q: "يَرْمُزُ اللَّوْنُ الْأَبْيَضُ فِي عَلَمِ مِصْرَ إِلَى السَّلَامِ.",
          en: "White in Egypt's flag stands for peace.",
          tf: true,
          p: "colors",
        },
        {
          q: "يَجُوزُ لَنَا أَنْ نَرْسُمَ عَلَى عَلَمِ مِصْرَ إِذَا أَرَدْنَا تَزْيِينَهُ.",
          en: "We may draw on Egypt's flag if we want to decorate it.",
          tf: false,
          x: "We must never write or draw on the flag: it is the symbol of our country.",
          p: "salute",
        },
      ],
    },
    {
      k: "choose",
      ic: "✅",
      t: "Choose",
      ar: "اخْتَرِ الْإِجَابَةَ الصَّحِيحَةَ",
      qs: [
        {
          q: "تُعَدُّ الْأَسْوَاقُ أَحَدَ الْأَمَاكِنِ الَّتِي تُقَدِّمُ خَدَمَاتٍ ___.",
          en: "Markets are one of the places that give ___ services.",
          o: [
            ["تِجَارِيَّةً", "trade"],
            ["أَمْنِيَّةً", "security"],
            ["صِحِّيَّةً", "health"],
            ["تَعْلِيمِيَّةً", "education"],
          ],
          p: "market",
        },
        {
          q: "إِحْدَى الْمَنَاطِقِ الَّتِي يَجِبُ بِنَاؤُهَا عَلَى أَطْرَافِ الْمُدُنِ هِيَ الْمَنَاطِقُ ___.",
          en: "One kind of area that must be built on the edges of cities is the ___ areas.",
          o: [
            ["الصِّنَاعِيَّةُ", "industrial"],
            ["التَّرْفِيهِيَّةُ", "leisure"],
            ["السَّكَنِيَّةُ", "residential"],
            ["التِّجَارِيَّةُ", "trade"],
          ],
          p: "w-factory",
        },
        {
          q: "شِعَارُ مُحَافَظَةِ الْقَاهِرَةِ يَحْتَوِي عَلَى صُورَةِ ___.",
          en: "The emblem of Cairo Governorate has a picture of ___.",
          o: [
            ["الْجَامِعِ الْأَزْهَرِ", "Al-Azhar Mosque"],
            ["قَلْعَةِ صَلَاحِ الدِّينِ", "Saladin's Citadel"],
            ["الْأَهْرَامَاتِ", "the Pyramids"],
            ["نَهْرِ النِّيلِ", "the Nile"],
          ],
          p: "cairo-old",
        },
        {
          q: "يُمْكِنُنَا الْحُصُولُ عَلَى الْخَدَمَاتِ الصِّحِّيَّةِ عِنْدَ زِيَارَةِ ___.",
          en: "We can get health services when we visit ___.",
          o: [
            ["الْمُسْتَشْفَى", "the hospital"],
            ["الْمَنْزِلِ", "the house"],
            ["الْمَصْنَعِ", "the factory"],
            ["الْمَتْحَفِ", "the museum"],
          ],
          p: "doctor",
        },
        {
          q: "اسْتَخْدَمَ الْمِصْرِيُّونَ الْقُدَمَاءُ «الرَّايَاتِ» لِتَمْيِيزِ ___.",
          en: "The ancient Egyptians used banners to tell apart their ___.",
          o: [
            ["مُدُنِهِمْ", "cities"],
            ["مَنَازِلِهِمْ", "houses"],
            ["مَقَابِرِهِمْ", "tombs"],
            ["أَسْلِحَتِهِمْ", "weapons"],
          ],
          p: "banners",
        },
        {
          q: "اللَّوْنُ الَّذِي يَرْمُزُ إِلَى فَتَرَاتِ الِاسْتِعْمَارِ فِي عَلَمِ مِصْرَ هُوَ ___.",
          en: "The colour of Egypt's flag that stands for colonial times is ___.",
          o: [
            ["الْأَسْوَدُ", "black"],
            ["الذَّهَبِيُّ", "gold"],
            ["الْأَحْمَرُ", "red"],
            ["الْأَبْيَضُ", "white"],
          ],
          p: "colors",
        },
      ],
    },
    {
      k: "comp",
      ic: "✏️",
      t: "Complete",
      ar: "أَكْمِلِ الْعِبَارَاتِ التَّالِيَةَ بِمَا يُنَاسِبُهَا",
      qs: [
        {
          q: "تَقَعُ بُورَسَعِيدُ عَلَى سَاحِلِ الْبَحْرِ ___.",
          en: "Port Said lies on the coast of the ___ Sea.",
          o: [
            ["الْمُتَوَسِّطِ", "Mediterranean"],
            ["الْأَحْمَرِ", "Red"],
            ["الْمَيِّتِ", "Dead"],
          ],
          p: "portsaid",
        },
        {
          q: "أَقْدَمُ الْمَسَاجِدِ الَّتِي بُنِيَتْ فِي مِصْرَ هُوَ جَامِعُ ___.",
          en: "The oldest mosque built in Egypt is the Mosque of ___.",
          o: [
            ["عَمْرِو بْنِ الْعَاصِ", "Amr ibn al-As"],
            ["الْأَزْهَرِ", "Al-Azhar"],
            ["مُحَمَّدٍ عَلِيٍّ", "Muhammad Ali"],
          ],
          p: "mosque",
        },
        {
          q: "نَحْصُلُ عَلَى الْخَدَمَاتِ التَّعْلِيمِيَّةِ مِنَ ___.",
          en: "We get education services from the ___.",
          o: [
            ["الْمَدْرَسَةِ", "school"],
            ["الْمُسْتَشْفَى", "hospital"],
            ["قِسْمِ الشُّرْطَةِ", "police station"],
          ],
          p: "school",
        },
        {
          q: "أُطْلِقَ اسْمُ «جَوْهَرَةِ الشَّرْقِ» عَلَى مَدِينَةِ ___.",
          en: "The name «Jewel of the East» was given to the city of ___.",
          o: [
            ["الْقَاهِرَةِ", "Cairo"],
            ["السُّوَيْسِ", "Suez"],
            ["الْغَرْدَقَةِ", "Hurghada"],
          ],
          p: "cairo-old",
        },
        {
          q: "تُعَدُّ مُحَافَظَتَا الْجِيزَةِ وَقِنَا مِنْ مُحَافَظَاتِ الْوَجْهِ ___.",
          en: "Giza and Qena are governorates of ___ Egypt.",
          o: [
            ["الْقِبْلِيِّ", "Upper (the south)"],
            ["الْبَحْرِيِّ", "Lower (the north)"],
            ["الشَّرْقِيِّ", "Eastern"],
          ],
          p: "gov-map",
          fit: 1,
        },
      ],
    },
    {
      k: "why",
      ic: "🤔",
      t: "Explain why",
      ar: "بِمَ تُفَسِّرُ؟",
      ask: "بِمَ تُفَسِّرُ؟",
      askE: "Why?",
      qs: [
        {
          q: "إِنْشَاءُ الْمَسَاحَاتِ الْخَضْرَاءِ دَاخِلَ الْمُدُنِ.",
          en: "Green spaces are made inside cities.",
          o: [
            ["لِتَنْقِيَةِ الْهَوَاءِ", "To clean the air"],
            ["لِبِنَاءِ الْمَصَانِعِ فِيهَا", "To build factories on them"],
            ["لِزِيَادَةِ الزِّحَامِ", "To make more crowds"],
          ],
          p: "green",
        },
        {
          q: "ضَرُورَةُ التَّخْطِيطِ الْجَيِّدِ عِنْدَ بِنَاءِ الْمُدُنِ.",
          en: "Good planning is needed when cities are built.",
          o: [
            [
              "لِتَقْلِيلِ التَّلَوُّثِ وَالِازْدِحَامِ",
              "To reduce pollution and crowding",
            ],
            [
              "لِزِيَادَةِ عَدَدِ السَّيَّارَاتِ فِي الشَّوَارِعِ",
              "To put more cars in the streets",
            ],
            [
              "لِبِنَاءِ الْمَصَانِعِ وَسَطَ الْبُيُوتِ",
              "To build factories among the houses",
            ],
          ],
          p: "plan",
        },
        {
          q: "أَهَمِّيَّةُ اسْتِخْدَامِ التِّكْنُولُوجْيَا فِي بِنَاءِ مُدُنِ الْمُسْتَقْبَلِ.",
          en: "Technology matters in building the cities of the future.",
          o: [
            ["لِتَحْسِينِ جَوْدَةِ الْحَيَاةِ", "To make life better"],
            [
              "لِهَدْمِ كُلِّ الْمَبَانِي الْقَدِيمَةِ",
              "To knock down all the old buildings",
            ],
            ["لِتَقْلِيلِ عَدَدِ الْمَدَارِسِ", "To have fewer schools"],
          ],
          p: "solar",
        },
        {
          q: "تَقْسِيمُ مِصْرَ إِلَى مُحَافَظَاتٍ.",
          en: "Egypt is divided into governorates.",
          o: [
            ["لِاتِّسَاعِ مِسَاحَتِهَا", "Because it is a very large country"],
            [
              "لِأَنَّ عَدَدَ سُكَّانِهَا قَلِيلٌ",
              "Because few people live there",
            ],
            [
              "لِيَكُونَ لِكُلِّ مُحَافَظَةٍ عَلَمٌ بَدَلَ عَلَمِ مِصْرَ",
              "So that each governorate has a flag instead of Egypt's flag",
            ],
          ],
          p: "gov-map",
          fit: 1,
        },
        {
          q: "وُجُودُ شِعَارٍ خَاصٍّ لِكُلِّ مُحَافَظَةٍ.",
          en: "Each governorate has its own emblem.",
          o: [
            [
              "لِيُعَبِّرَ عَنْ تَارِيخِهَا أَوْ نَشَاطِ سُكَّانِهَا",
              "To show its history or what its people do",
            ],
            ["لِتَزْيِينِ الشَّوَارِعِ فَقَطْ", "Only to decorate the streets"],
            [
              "لِيَحِلَّ مَحَلَّ عَلَمِ مِصْرَ",
              "To take the place of Egypt's flag",
            ],
          ],
          p: "logo-damietta",
        },
        {
          q: "تَسْمِيَةُ الْكَنِيسَةِ الْمُعَلَّقَةِ بِهَذَا الِاسْمِ.",
          en: "The Hanging Church has this name.",
          o: [
            [
              "لِأَنَّهَا بُنِيَتْ فَوْقَ بُرْجَيْنِ لِحِصْنٍ قَدِيمٍ",
              "Because it was built on top of two towers of an old fort",
            ],
            [
              "لِأَنَّهَا مُعَلَّقَةٌ بِالْحِبَالِ",
              "Because it hangs from ropes",
            ],
            [
              "لِأَنَّهَا بُنِيَتْ عَلَى قِمَّةِ جَبَلٍ",
              "Because it was built on top of a mountain",
            ],
          ],
          p: "church",
        },
        {
          q: "ضَرُورَةُ احْتِرَامِنَا لِعَلَمِ بَلَدِنَا.",
          en: "We must respect our country's flag.",
          o: [
            [
              "لِأَنَّهُ رَمْزُ كَرَامَتِنَا وَوَحْدَتِنَا وَاعْتِزَازِنَا بِوَطَنِنَا الْغَالِي مِصْرَ",
              "Because it is the symbol of our dignity, our unity and our pride in our dear country Egypt",
            ],
            [
              "لِأَنَّهُ قِطْعَةُ قُمَاشٍ غَالِيَةُ الثَّمَنِ",
              "Because it is an expensive piece of cloth",
            ],
            [
              "لِأَنَّهُ يُرْفَعُ فِي الْمَدْرَسَةِ فَقَطْ",
              "Because it is raised only at school",
            ],
          ],
          p: "salute",
        },
        {
          q: "اسْتِخْدَامُ مُلُوكِ مِصْرَ الْقَدِيمَةِ لِلْأَعْلَامِ فِي الْمَعَارِكِ.",
          en: "The kings of ancient Egypt used flags in battles.",
          o: [
            [
              "لِتَمْيِيزِ جُيُوشِهِمْ وَتَشْجِيعِ الْجُنُودِ عَلَى الْقِتَالِ",
              "To tell their armies apart and encourage the soldiers to fight",
            ],
            [
              "لِتَزْيِينِ جُدْرَانِ الْمَعَابِدِ فَقَطْ",
              "Only to decorate the temple walls",
            ],
            [
              "لِيَحْمُوا الْجُنُودَ مِنَ الشَّمْسِ",
              "To protect the soldiers from the sun",
            ],
          ],
          p: "banners",
        },
        {
          q: "يَتَوَسَّطُ عَلَمَ مِصْرَ نَسْرٌ لَوْنُهُ أَصْفَرُ.",
          en: "A yellow eagle is in the middle of Egypt's flag.",
          o: [
            [
              "رَمْزٌ لِلْقُوَّةِ، مُسْتَوْحًى مِنْ نَسْرِ صَلَاحِ الدِّينِ الْأَيُّوبِيِّ",
              "It is a symbol of strength, taken from the eagle of Saladin",
            ],
            [
              "رَمْزٌ لِلسَّلَامِ وَالتَّفَاؤُلِ",
              "It is a symbol of peace and hope",
            ],
            [
              "رَمْزٌ لِفَتَرَاتِ الِاسْتِعْمَارِ",
              "It is a symbol of colonial times",
            ],
          ],
          p: "f1984",
        },
      ],
    },
    {
      k: "res",
      ic: "➡️",
      t: "What happens?",
      ar: "مَا النَّتَائِجُ الْمُتَرَتِّبَةُ عَلَى…؟ · مَاذَا يَحْدُثُ إِذَا…؟",
      qs: [
        {
          ask: "مَا النَّتَائِجُ الْمُتَرَتِّبَةُ عَلَى:",
          askE: "What is the result of:",
          q: "انْتِشَارُ الْمَنَاطِقِ الزِّرَاعِيَّةِ حَوْلَ الْمُدُنِ.",
          en: "Farming areas spread around cities.",
          o: [
            ["الْحُصُولُ عَلَى الْغِذَاءِ", "We get food"],
            ["زِيَادَةُ تَلَوُّثِ الْهَوَاءِ", "More air pollution"],
            [
              "قِلَّةُ الْخُضْرَوَاتِ فِي الْأَسْوَاقِ",
              "Fewer vegetables in the markets",
            ],
          ],
          p: "farms",
        },
        {
          ask: "مَا النَّتَائِجُ الْمُتَرَتِّبَةُ عَلَى:",
          askE: "What is the result of:",
          q: "تَطْوِيرُ الْمَدِينَةِ.",
          en: "The city is developed.",
          o: [
            ["تَحْسِينُ حَيَاةِ السُّكَّانِ", "The people's life gets better"],
            [
              "اخْتِفَاءُ الْخَدَمَاتِ مِنَ الْمَدِينَةِ",
              "The services disappear from the city",
            ],
            [
              "هِجْرَةُ كُلِّ السُّكَّانِ إِلَى الْقُرَى",
              "All the people move to villages",
            ],
          ],
          p: "housing",
        },
        {
          ask: "مَاذَا يَحْدُثُ إِذَا:",
          askE: "What happens if:",
          q: "لَمْ تَهْتَمَّ الدَّوْلَةُ بِبِنَاءِ الْمُسْتَشْفَيَاتِ؟",
          en: "the state did not take care to build hospitals?",
          o: [
            ["يَمُوتُ الْمَرْضَى", "Sick people die"],
            ["تَتَحَسَّنُ صِحَّةُ النَّاسِ", "People's health gets better"],
            [
              "تَزِيدُ الْخَدَمَاتُ الصِّحِّيَّةُ",
              "There are more health services",
            ],
          ],
          p: "hospital",
        },
        {
          ask: "حَدِّدْ نَتِيجَةً وَاحِدَةً تَرَتَّبَتْ عَلَى:",
          askE: "Give one result of:",
          q: "اتِّحَادُ مِصْرَ وَلِيبِيَا وَسُورِيَا.",
          en: "The union of Egypt, Libya and Syria.",
          o: [
            ["تَغْيِيرُ شَكْلِ عَلَمِ مِصْرَ", "Egypt's flag changed"],
            ["تَغْيِيرُ اسْمِ نَهْرِ النِّيلِ", "The Nile got a new name"],
            [
              "بِنَاءُ الْعَاصِمَةِ الْإِدَارِيَّةِ الْجَدِيدَةِ",
              "The New Administrative Capital was built",
            ],
          ],
          p: "f1971",
        },
      ],
    },
    {
      k: "prove",
      ic: "🔗",
      t: "Prove & link",
      ar: "مَا الْعَلَاقَةُ بَيْنَ؟ · دَلِّلْ",
      qs: [
        {
          ask: "مَا الْعَلَاقَةُ بَيْنَ:",
          askE: "What is the link between:",
          q: "الْحِمَايَةِ الْمَدَنِيَّةِ وَتَحْقِيقِ الْأَمَانِ فِي الْمَدِينَةِ؟",
          en: "civil protection and keeping the city safe?",
          o: [
            [
              "مَرْكَزُ الْحِمَايَةِ الْمَدَنِيَّةِ يُحَقِّقُ الْأَمَانَ فِي الْمَدِينَةِ",
              "The civil protection centre keeps the city safe",
            ],
            ["لَا عَلَاقَةَ بَيْنَهُمَا", "There is no link"],
            [
              "الْحِمَايَةُ الْمَدَنِيَّةُ تَبِيعُ السِّلَعَ لِلنَّاسِ",
              "Civil protection sells goods to people",
            ],
          ],
          p: "firefighter",
        },
        {
          ask: "دَلِّلْ عَلَى صِحَّةِ الْعِبَارَةِ:",
          askE: "Prove it:",
          q: "يُرْفَعُ الْعَلَمُ الْمِصْرِيُّ فِي كَثِيرٍ مِنَ الْأَمَاكِنِ.",
          en: "The Egyptian flag is raised in many places.",
          o: [
            [
              "فِي الْوِزَارَاتِ وَالْهَيْئَاتِ الْحُكُومِيَّةِ، وَالْمَوَاقِعِ السِّيَاحِيَّةِ، وَالْمُؤْتَمَرَاتِ، وَوَسَائِلِ النَّقْلِ",
              "On ministries and government offices, at tourist sites, at conferences and on transport",
            ],
            [
              "لَا يُرْفَعُ إِلَّا فِي الْمَدَارِسِ",
              "It is raised only at schools",
            ],
            [
              "يُرْفَعُ فِي بُيُوتِ الْمُوَاطِنِينَ فَقَطْ",
              "It is raised only in people's homes",
            ],
          ],
          p: "trains",
        },
      ],
    },
    {
      k: "def",
      ic: "📖",
      t: "What does it mean?",
      ar: "مَا الْمَقْصُودُ بِكُلٍّ مِنْ…؟",
      ask: "مَا الْمَقْصُودُ بِـ:",
      askE: "What is meant by:",
      qs: [
        {
          q: "الْقَرْيَةُ",
          en: "the village",
          o: [
            [
              "تَجَمُّعٌ سَكَنِيٌّ بِهِ أَنْشِطَةٌ مِثْلُ الزِّرَاعَةِ وَتَرْبِيَةِ الْحَيَوَانَاتِ",
              "A place where people live, with activities like farming and raising animals",
            ],
            [
              "تَجَمُّعٌ سَكَنِيٌّ تَتَرَكَّزُ فِيهِ الصِّنَاعَةُ وَالتِّجَارَةُ",
              "A place where people live, with mostly industry and trade",
            ],
            [
              "جُزْءٌ مِنَ الدَّوْلَةِ يَضُمُّ مَرَاكِزَ وَأَحْيَاءً",
              "A part of the country made of districts and centres",
            ],
          ],
          p: "farms",
        },
        {
          q: "الْأَمَاكِنُ الْخِدْمِيَّةُ",
          en: "service places",
          o: [
            [
              "مُنْشَآتٌ لِتَقْدِيمِ الْخَدَمَاتِ لِلْمُوَاطِنِينَ لِتَسْهِيلِ حَيَاتِهِمْ",
              "Buildings that give people services to make their life easier",
            ],
            ["أَمَاكِنُ لِلتَّرْفِيهِ فَقَطْ", "Places only for fun"],
            ["مَنَاطِقُ لِزِرَاعَةِ الْمَحَاصِيلِ", "Areas for growing crops"],
          ],
          p: "services",
        },
        {
          q: "شِعَارُ الْمُحَافَظَةِ",
          en: "the governorate's emblem",
          o: [
            [
              "رَايَةٌ لِلْمُحَافَظَةِ تُعَبِّرُ عَنْ تَارِيخِهَا أَوْ نَشَاطِ سُكَّانِهَا",
              "The governorate's banner, showing its history or what its people do",
            ],
            [
              "خَرِيطَةٌ تُوَضِّحُ حُدُودَ الْمُحَافَظَةِ",
              "A map showing the governorate's borders",
            ],
            [
              "الْمَبْنَى الَّذِي يَعْمَلُ فِيهِ الْمُحَافِظُ",
              "The building where the governor works",
            ],
          ],
          p: "logo-cairo",
        },
        {
          q: "الْعَلَمُ",
          en: "the flag",
          o: [
            [
              "رَمْزٌ لِلدَّوْلَةِ يُمَثِّلُهَا وَيُعَبِّرُ عَنْ تَارِيخِهَا وَشَعْبِهَا",
              "A symbol of the country that stands for it and shows its history and its people",
            ],
            [
              "قِطْعَةُ قُمَاشٍ لِلزِّينَةِ فَقَطْ",
              "A piece of cloth only for decoration",
            ],
            [
              "شِعَارُ إِحْدَى الْمُحَافَظَاتِ",
              "The emblem of one governorate",
            ],
          ],
          p: "flag",
        },
      ],
    },
    {
      k: "order",
      ic: "🚩",
      t: "Flags in order",
      ar: "رَتِّبْ مَرَاحِلَ تَطَوُّرِ عَلَمِ مِصْرَ مِنَ الْقَدِيمِ إِلَى الْحَدِيثِ",
      ask: "رَتِّبْ مَرَاحِلَ تَطَوُّرِ عَلَمِ مِصْرَ:",
      askE: "Put Egypt's flags in order:",
      qs: [
        {
          q: "هَذَا الْعَلَمُ هُوَ ___.",
          en: "This flag is ___.",
          o: [
            [
              "(١) عَلَمُ ثَوْرَةِ يُولْيُو (١٩٥٢ - ١٩٥٨)",
              "(1) the flag of the July Revolution (1952–1958)",
            ],
            [
              "(٢) عَلَمُ مِصْرَ وَسُورِيَا (١٩٥٨ - ١٩٧١)",
              "(2) the flag of Egypt and Syria (1958–1971)",
            ],
            [
              "(٣) عَلَمُ مِصْرَ وَسُورِيَا وَلِيبِيَا (١٩٧١ - ١٩٨٤)",
              "(3) the flag of Egypt, Syria and Libya (1971–1984)",
            ],
            [
              "(٤) عَلَمُ مِصْرَ الْحَالِيُّ (مِنْ ١٩٨٤)",
              "(4) Egypt's flag today (from 1984)",
            ],
          ],
          p: "f1952",
        },
        {
          q: "هَذَا الْعَلَمُ هُوَ ___.",
          en: "This flag is ___.",
          o: [
            [
              "(٢) عَلَمُ مِصْرَ وَسُورِيَا (١٩٥٨ - ١٩٧١)",
              "(2) the flag of Egypt and Syria (1958–1971)",
            ],
            [
              "(١) عَلَمُ ثَوْرَةِ يُولْيُو (١٩٥٢ - ١٩٥٨)",
              "(1) the flag of the July Revolution (1952–1958)",
            ],
            [
              "(٣) عَلَمُ مِصْرَ وَسُورِيَا وَلِيبِيَا (١٩٧١ - ١٩٨٤)",
              "(3) the flag of Egypt, Syria and Libya (1971–1984)",
            ],
            [
              "(٤) عَلَمُ مِصْرَ الْحَالِيُّ (مِنْ ١٩٨٤)",
              "(4) Egypt's flag today (from 1984)",
            ],
          ],
          p: "f1958",
        },
        {
          q: "هَذَا الْعَلَمُ هُوَ ___.",
          en: "This flag is ___.",
          o: [
            [
              "(٣) عَلَمُ مِصْرَ وَسُورِيَا وَلِيبِيَا (١٩٧١ - ١٩٨٤)",
              "(3) the flag of Egypt, Syria and Libya (1971–1984)",
            ],
            [
              "(١) عَلَمُ ثَوْرَةِ يُولْيُو (١٩٥٢ - ١٩٥٨)",
              "(1) the flag of the July Revolution (1952–1958)",
            ],
            [
              "(٢) عَلَمُ مِصْرَ وَسُورِيَا (١٩٥٨ - ١٩٧١)",
              "(2) the flag of Egypt and Syria (1958–1971)",
            ],
            [
              "(٤) عَلَمُ مِصْرَ الْحَالِيُّ (مِنْ ١٩٨٤)",
              "(4) Egypt's flag today (from 1984)",
            ],
          ],
          p: "f1971",
        },
        {
          q: "هَذَا الْعَلَمُ هُوَ ___.",
          en: "This flag is ___.",
          o: [
            [
              "(٤) عَلَمُ مِصْرَ الْحَالِيُّ (مِنْ ١٩٨٤)",
              "(4) Egypt's flag today (from 1984)",
            ],
            [
              "(١) عَلَمُ ثَوْرَةِ يُولْيُو (١٩٥٢ - ١٩٥٨)",
              "(1) the flag of the July Revolution (1952–1958)",
            ],
            [
              "(٢) عَلَمُ مِصْرَ وَسُورِيَا (١٩٥٨ - ١٩٧١)",
              "(2) the flag of Egypt and Syria (1958–1971)",
            ],
            [
              "(٣) عَلَمُ مِصْرَ وَسُورِيَا وَلِيبِيَا (١٩٧١ - ١٩٨٤)",
              "(3) the flag of Egypt, Syria and Libya (1971–1984)",
            ],
          ],
          p: "f1984",
        },
      ],
    },
  ],
  terms: [
    {
      u: 1,
      w: "الْمَدِينَةُ",
      we: "The city",
      t: "تَجَمُّعٌ سَكَنِيٌّ تَتَرَكَّزُ فِيهِ الْخَدَمَاتُ وَالْأَنْشِطَةُ مِثْلَ الصِّنَاعَةِ وَالتِّجَارَةِ",
      en: "A place where many people live, with services and activities such as industry and trade.",
      p: "city",
    },
    {
      u: 1,
      w: "الْقَرْيَةُ",
      we: "The village",
      t: "تَجَمُّعٌ سَكَنِيٌّ تَتَرَكَّزُ فِيهِ أَنْشِطَةُ الزِّرَاعَةِ وَتَرْبِيَةِ الْحَيَوَانَاتِ",
      en: "A place where people live, where farming and raising animals are the main activities.",
      p: "farms",
    },
    {
      u: 1,
      w: "الْمَنَاطِقُ الزِّرَاعِيَّةُ",
      we: "Farming areas",
      t: "مَنَاطِقُ تَنْتَشِرُ فِي الْقُرَى وَحَوْلَ بَعْضِ الْمُدُنِ وَتُنْتِجُ الْمَحَاصِيلَ وَالْغِذَاءَ",
      en: "Areas in villages and around some cities that produce crops and food.",
      p: "farms",
    },
    {
      u: 2,
      w: "الْمُقَاوَمَةُ الشَّعْبِيَّةُ",
      we: "The people's resistance",
      t: "أَهْلُ الْمَدِينَةِ الَّذِينَ تَصَدَّوْا لِلْعَدُوِّ مَعَ الْجَيْشِ وَالشُّرْطَةِ وَمَنَعُوهُ مِنْ دُخُولِ السُّوَيْسِ",
      en: "The people of the city who, with the army and the police, stood up to the enemy and kept it out of Suez.",
      p: "suez-war",
    },
    {
      u: 2,
      w: "تَطْوِيرُ الْمَدِينَةِ",
      we: "Developing the city",
      t: "تَوْسِيعُ الطُّرُقِ وَتَحْدِيثُ الْمُوَاصَلَاتِ وَالْمَسَاكِنِ وَالْخَدَمَاتِ لِتَحْسِينِ حَيَاةِ السُّكَّانِ",
      en: "Widening roads and modernising transport, housing and services to make people's life better.",
      p: "train-new",
    },
    {
      u: 3,
      w: "الْأَمَاكِنُ الْخِدْمِيَّةُ",
      we: "Service places",
      t: "مُنْشَآتٌ مُخَصَّصَةٌ لِتَقْدِيمِ الْخَدَمَاتِ الْمُتَنَوِّعَةِ لِلنَّاسِ مِثْلَ الْخَدَمَاتِ التَّعْلِيمِيَّةِ وَالصِّحِّيَّةِ وَالْأَمْنِيَّةِ وَالتِّجَارِيَّةِ",
      en: "Buildings made to give people all kinds of services: education, health, security and trade.",
      p: "services",
    },
    {
      u: 3,
      w: "مَرْكَزُ الْحِمَايَةِ الْمَدَنِيَّةِ",
      we: "The civil protection centre",
      t: "مَرْكَزٌ يُخْمِدُ الْحَرَائِقَ وَيُنْقِذُ النَّاسَ فِي الْحَوَادِثِ وَالْكَوَارِثِ",
      en: "A centre that puts out fires and rescues people in accidents and disasters.",
      p: "fire-truck",
    },
    {
      u: 4,
      w: "التَّخْطِيطُ لِبِنَاءِ الْمُدُنِ",
      we: "Planning to build cities",
      t: "التَّفْكِيرُ الْمُسْبَقُ لِتَنْظِيمِ اسْتِخْدَامِ الْأَرْضِ وَتَحْسِينِ حَيَاةِ السُّكَّانِ",
      en: "Thinking ahead to organise how land is used and to make people's life better.",
      p: "plan",
    },
    {
      u: 4,
      w: "الطَّاقَةُ الشَّمْسِيَّةُ",
      we: "Solar energy",
      t: "ضَوْءُ الشَّمْسِ نُحَوِّلُهُ إِلَى طَاقَةٍ كَهْرَبَائِيَّةٍ مِنْ خِلَالِ الْأَلْوَاحِ الشَّمْسِيَّةِ",
      en: "Sunlight that we turn into electricity with solar panels.",
      p: "solar",
    },
    {
      u: 5,
      w: "الْمُحَافَظَةُ",
      we: "The governorate",
      t: "جُزْءٌ مِنَ الدَّوْلَةِ يَضُمُّ مَجْمُوعَةً مِنَ الْمَرَاكِزِ أَوِ الْأَحْيَاءِ",
      en: "A part of the country made of a group of districts.",
      p: "gov-map",
    },
    {
      u: 5,
      w: "شِعَارُ الْمُحَافَظَةِ",
      we: "The governorate's emblem",
      t: "رَايَةٌ تَتَّخِذُهَا الْمُحَافَظَةُ رَمْزًا لَهَا لِتُعَبِّرَ عَنْ نَشَاطِ سُكَّانِهَا أَوْ جُزْءٍ مِنْ تَارِيخِهَا",
      en: "A banner the governorate takes as its symbol, showing what its people do or part of its history.",
      p: "logo-cairo",
    },
    {
      u: 5,
      w: "الْعَاصِمَةُ",
      we: "The capital",
      t: "الْمَدِينَةُ الَّتِي يَتِمُّ اخْتِيَارُهَا لِتَكُونَ الْمَقَرَّ الرَّسْمِيَّ لِلْحُكْمِ وَالْإِدَارَةِ",
      en: "The city chosen to be the official seat of government.",
      p: "new-capital",
    },
    {
      u: 6,
      w: "الْعَلَمُ",
      we: "The flag",
      t: "رَمْزٌ لِلدَّوْلَةِ يُمَثِّلُهَا وَيُعَبِّرُ عَنْ تَارِيخِهَا وَشَعْبِهَا",
      en: "A symbol of the country that stands for it and shows its history and its people.",
      p: "flag",
    },
    {
      u: 6,
      w: "الرَّايَاتُ",
      we: "Banners",
      t: "أَعْلَامٌ اسْتَخْدَمَهَا الْمِصْرِيُّونَ الْقُدَمَاءُ لِتَمْيِيزِ أَقَالِيمِهِمْ وَمُدُنِهِمْ وَجُيُوشِهِمْ",
      en: "Flags the ancient Egyptians used to tell apart their regions, cities and armies.",
      p: "banners",
    },
    {
      u: 6,
      w: "النَّسْرُ",
      we: "The eagle",
      t: "رَمْزُ الْقُوَّةِ فِي وَسَطِ عَلَمِ مِصْرَ، مُسْتَوْحًى مِنْ نَسْرِ صَلَاحِ الدِّينِ الْأَيُّوبِيِّ",
      en: "The symbol of strength in the middle of Egypt's flag, taken from the eagle of Saladin.",
      p: "f1984",
    },
  ],
};
