/* Social Studies (Arabic) · Grade 4 (Alex) · Revision 1, Mid-term exam Term 1: the October revision sheet (مراجعة دروس شهر أكتوبر), Unit 1, lessons 1–4.
   Moved from grade-4/term-1/mid-term-1/social-studies-arabic-revision.html (the page's code is now ../../../shared/ss-arabic-revision.js; this file is its data).
   Question: {q: Arabic (___ = the gap), en: English, o: [right, wrong, ...], p: picture, fit?: show the whole picture (maps)}
   Each choice is [Arabic, English]. True/false: {q, en, tf: true|false, x?: why it is false}
   The sheet's written answers (explain, prove, link, answer) become choices: the sheet's answer + 2 wrong ones.
   Pictures: img/revision-1/<p>.jpg, from the lesson handouts and the sheet's maps.
   Key terms (أهم المصطلحات) from the end of each lesson handout: {u: lesson, w: term, we: English term, t: Arabic definition, en: English, p: picture}. */
window.SSA_REV = {
  key: "ssa4",
  eyebrow: "Grade 4 Social Studies (Arabic) · October revision",
  sub: "مراجعة دروس شهر أكتوبر",
  img: "img/revision-1/",
  units: [
    { k: "1", t: "Lesson 1" },
    { k: "2", t: "Lesson 2" },
    { k: "3", t: "Lesson 3" },
    { k: "4", t: "Lesson 4" },
    { k: "all", t: "All" },
  ],
  mix: 15,
  sheet: [
    {
      k: "map",
      ic: "🗺️",
      t: "Read the maps",
      ar: "لاحظ الخرائط ثم أجب",
      qs: [
        {
          q: "يشير رقم (١) على الخريطة إلى أحد عناصر الخريطة، وهو ___.",
          en: "Number (1) on the map points to one of the map elements: ___.",
          o: [
            ["وردة البوصلة", "the compass rose"],
            ["مقياس الرسم", "the scale"],
            ["مفتاح الخريطة", "the map key"],
          ],
          p: "map1",
          fit: 1,
        },
        {
          q: "ما أهمية العنصر رقم (٢) على الخريطة؟",
          en: "What is element number (2) on the map for?",
          o: [
            [
              "يوضح النسبة بين المسافة على الخريطة وما يقابلها على الطبيعة",
              "It shows the ratio between a distance on the map and the real distance",
            ],
            [
              "يوضح الاتجاهات على الخريطة",
              "It shows the directions on the map",
            ],
            ["يوضح موضوع الخريطة", "It shows what the map is about"],
          ],
          p: "map1",
          fit: 1,
        },
        {
          q: "اختر عنوانًا مناسبًا للخريطة.",
          en: "Choose a good title for the map.",
          o: [
            ["خريطة مصر", "Map of Egypt"],
            ["خريطة العالم", "Map of the world"],
            ["خريطة القاهرة", "Map of Cairo"],
          ],
          p: "map1",
          fit: 1,
        },
        {
          q: "العنصر رقم (١) على الخريطة هو ___.",
          en: "Element number (1) on the map is ___.",
          o: [
            ["وردة البوصلة", "the compass rose"],
            ["مقياس الرسم", "the scale"],
            ["عنوان الخريطة", "the map title"],
          ],
          p: "map2",
          fit: 1,
        },
        {
          q: "العنصر رقم (٢) على الخريطة هو ___.",
          en: "Element number (2) on the map is ___.",
          o: [
            ["مقياس الرسم", "the scale"],
            ["مفتاح الخريطة", "the map key"],
            ["وردة البوصلة", "the compass rose"],
          ],
          p: "map2",
          fit: 1,
        },
        {
          q: "العنصر رقم (٣) على الخريطة هو ___.",
          en: "Element number (3) on the map is ___.",
          o: [
            ["مفتاح الخريطة", "the map key"],
            ["عنوان الخريطة", "the map title"],
            ["مقياس الرسم", "the scale"],
          ],
          p: "map2",
          fit: 1,
        },
        {
          q: "العنصر الناقص في الخريطة هو ___.",
          en: "The element missing from the map is ___.",
          o: [
            ["عنوان الخريطة", "the map title"],
            ["وردة البوصلة", "the compass rose"],
            ["مقياس الرسم", "the scale"],
          ],
          p: "map2",
          fit: 1,
        },
        {
          q: "اختر عنوان الخريطة.",
          en: "Choose the title of the map.",
          o: [
            [
              "خريطة المسطحات المائية في مصر",
              "Map of the water bodies in Egypt",
            ],
            ["خريطة المرتفعات في مصر", "Map of the highlands in Egypt"],
            ["خريطة المدن في مصر", "Map of the cities in Egypt"],
          ],
          p: "map3b",
          fit: 1,
        },
        {
          q: "في مفتاح هذه الخريطة، اللون الأزرق يعني ___.",
          en: "In this map key, the blue colour means ___.",
          o: [
            ["مسطحات مائية", "water bodies"],
            ["جبال", "mountains"],
            ["صحراء", "desert"],
          ],
          p: "map3b",
          fit: 1,
        },
        {
          q: "العنصر المفقود في الخريطة هو ___.",
          en: "The element missing from the map is ___.",
          o: [
            ["وردة البوصلة", "the compass rose"],
            ["مفتاح الخريطة", "the map key"],
            ["عنوان الخريطة", "the map title"],
          ],
          p: "map3",
          fit: 1,
        },
      ],
    },
    {
      k: "comp",
      ic: "✏️",
      t: "Complete",
      ar: "أكمل العبارات",
      qs: [
        {
          q: "من أشهر العلماء العرب الذين برعوا في رسم الخرائط ___.",
          en: "One of the most famous Arab scholars who were great at drawing maps is ___.",
          o: [
            ["الإدريسي", "al-Idrisi"],
            ["ابن سينا", "Ibn Sina"],
            ["الخوارزمي", "al-Khwarizmi"],
          ],
          p: "idrisi",
        },
        {
          q: "رسم المصريون القدماء الخرائط على ورق ___.",
          en: "The ancient Egyptians drew maps on ___ paper.",
          o: [
            ["البردي", "papyrus"],
            ["الشجر", "tree"],
            ["القطن", "cotton"],
          ],
          p: "papyrus",
        },
        {
          q: "رسم الإدريسي خريطة لـ___.",
          en: "Al-Idrisi drew a map of ___.",
          o: [
            ["العالم", "the world"],
            ["القاهرة", "Cairo"],
            ["النيل", "the Nile"],
          ],
          p: "idrisi",
        },
        {
          q: "استخدم المصريون القدماء الخرائط لوصف مسار ___.",
          en: "The ancient Egyptians used maps to describe the course of ___.",
          o: [
            ["نهر النيل", "the river Nile"],
            ["القطارات", "the trains"],
            ["الطائرات", "the planes"],
          ],
          p: "cover3",
        },
        {
          q: "يعرض تطبيق GPS خرائط ___.",
          en: "The GPS app shows ___ maps.",
          o: [
            ["رقمية", "digital"],
            ["يدوية", "hand-drawn"],
            ["ورقية", "paper"],
          ],
          p: "satellite",
        },
        {
          q: "استخدم المصريون القدماء الخرائط لتحديد مواقع ___.",
          en: "The ancient Egyptians used maps to find the places of ___.",
          o: [
            ["المناجم", "the mines"],
            ["المطارات", "the airports"],
            ["المدارس", "the schools"],
          ],
          p: "cover3",
        },
        {
          q: "يعتمد نظام GPS في تحديد المواقع على ___.",
          en: "GPS finds places using ___.",
          o: [
            ["الأقمار الصناعية", "satellites"],
            ["النجوم", "the stars"],
            ["الشمس", "the sun"],
          ],
          p: "satellite",
        },
        {
          q: "المعلومات الصحيحة التي تم التأكد منها تُعد ___.",
          en: "Correct information that has been checked is called ___.",
          o: [
            ["حقائق", "facts"],
            ["آراء", "opinions"],
            ["شائعات", "rumours"],
          ],
          p: "kids",
        },
        {
          q: "من المصادر الثانوية الكتب و___.",
          en: "Secondary sources include books and ___.",
          o: [
            ["المقالات", "articles"],
            ["البرديات", "papyri"],
            ["الآثار", "monuments"],
          ],
          p: "articles",
        },
        {
          q: "من المصادر الأولية الآثار و___.",
          en: "Primary sources include monuments and ___.",
          o: [
            ["البرديات", "papyri"],
            ["المقالات", "articles"],
            ["الأفلام التاريخية", "historical films"],
          ],
          p: "carving",
        },
        {
          q: "أحد مصادر المعلومات، ويتمثل في كل ما تركه القدماء من مبانٍ وتماثيل، هو ___.",
          en: "One source of information, which is everything the ancients left behind such as buildings and statues, is ___.",
          o: [
            ["الآثار", "monuments"],
            ["المقالات", "articles"],
            ["الكتب", "books"],
          ],
          p: "pyramid",
        },
        {
          q: "المصادر التي كُتبت أثناء وقوع الحدث تُعد مصادر ___.",
          en: "Sources written while the event was happening are ___ sources.",
          o: [
            ["أولية", "primary"],
            ["ثانوية", "secondary"],
            ["حديثة", "modern"],
          ],
          p: "writings",
        },
        {
          q: "نقل الأخبار والمعلومات دون التحقق من صدقها يُعد ___.",
          en: "Passing on news and information without checking it is called ___.",
          o: [
            ["شائعات", "rumours"],
            ["حقائق", "facts"],
            ["مصادر أولية", "primary sources"],
          ],
          p: "kids",
        },
        {
          q: "المسؤول عن تصميم وبناء المنازل هو ___.",
          en: "The person in charge of designing and building houses is ___.",
          o: [
            ["المهندس", "the engineer"],
            ["الطبيب", "the doctor"],
            ["المزارع", "the farmer"],
          ],
          p: "users",
        },
        {
          q: "المكان الذي يتعلم فيه التلميذ هو ___.",
          en: "The place where a pupil learns is ___.",
          o: [
            ["المدرسة", "the school"],
            ["السوق", "the market"],
            ["المستشفى", "the hospital"],
          ],
          p: "cover4",
        },
        {
          q: "أقرب طريق للوصول إلى مكان ما هو الطريق ___.",
          en: "The shortest way to get to a place is the ___ way.",
          o: [
            ["المباشر", "direct"],
            ["الطويل", "long"],
            ["المتعرج", "winding"],
          ],
          p: "cover1",
        },
        {
          q: "استخدم الإنسان قديمًا لتحديد الاتجاهات نهارًا ___.",
          en: "Long ago, people used ___ to find directions in the daytime.",
          o: [
            ["الشمس", "the sun"],
            ["القمر", "the moon"],
            ["النجم القطبي", "the North Star"],
          ],
          p: "sunface",
        },
        {
          q: "يشير النجم القطبي في السماء لاتجاه ___.",
          en: "The North Star in the sky points ___.",
          o: [
            ["الشمال", "north"],
            ["الجنوب", "south"],
            ["الشرق", "east"],
          ],
          p: "star",
        },
        {
          q: "أحد عناصر الخريطة يمكننا استخدامه لحساب المسافة بين مدينتين على الخريطة وما يقابلها على الطبيعة هو ___.",
          en: "The map element we can use to work out the real distance between two cities on the map is ___.",
          o: [
            ["مقياس الرسم", "the scale"],
            ["وردة البوصلة", "the compass rose"],
            ["مفتاح الخريطة", "the map key"],
          ],
          p: "mapparts",
        },
      ],
    },
    {
      k: "why",
      ic: "🤔",
      t: "Explain why",
      ar: "بم تفسر؟",
      ask: "بم تفسر؟",
      askE: "Why?",
      qs: [
        {
          q: "اهتمام المصريين القدماء برسم الخرائط.",
          en: "The ancient Egyptians cared a lot about drawing maps.",
          o: [
            [
              "لوصف مسار نهر النيل ومواقع المناجم",
              "To describe the course of the Nile and where the mines were",
            ],
            [
              "لتزيين جدران بيوتهم فقط",
              "Only to decorate the walls of their houses",
            ],
            [
              "لأنهم كانوا يسافرون إلى الفضاء",
              "Because they travelled to space",
            ],
          ],
          p: "cover3",
        },
        {
          q: "أهمية الصور الجوية.",
          en: "Why aerial photos are important.",
          o: [
            [
              "لأنها من أهم مصادر رسم الخرائط",
              "They are one of the most important sources for drawing maps",
            ],
            ["لأنها تحدد أوقات الصلاة", "They tell the prayer times"],
            [
              "لأنها تُلتقط من الفضاء بالأقمار الصناعية",
              "They are taken from space by satellites",
            ],
          ],
          p: "aerial",
        },
        {
          q: "تلقيب مريم عالمة الفلك بمريم الإسطرلابية.",
          en: "Why Mariam the astronomer is called Mariam al-Astrulabi.",
          o: [
            [
              "لأنها قامت بحسابات رياضية دقيقة لتطوير الإسطرلاب",
              "She did exact maths to improve the astrolabe",
            ],
            ["لأنها رسمت خريطة العالم", "She drew the map of the world"],
            [
              "لأنها اخترعت البوصلة الرقمية",
              "She invented the digital compass",
            ],
          ],
          p: "mariam",
        },
        {
          q: "تُعد البرديات من المصادر الأولية.",
          en: "Papyri are primary sources.",
          o: [
            [
              "لأنها سجلت أخبار وأحداث المصريين القدماء في وقت وقوع الحدث",
              "They recorded the news and events of the ancient Egyptians when they happened",
            ],
            [
              "لأنها كُتبت بعد وقوع الحدث بفترة طويلة",
              "They were written long after the events",
            ],
            ["لأنها تعبر عن آراء شخصية", "They give personal opinions"],
          ],
          p: "papyrus",
        },
        {
          q: "تُعد الكتب والموسوعات من المصادر الثانوية.",
          en: "Books and encyclopedias are secondary sources.",
          o: [
            [
              "لأنها سُجلت بعد وقوع الحدث بفترة زمنية طويلة، ويسهل الحصول عليها",
              "They were written long after the events, and they are easy to get",
            ],
            [
              "لأنها سُجلت في زمن وقوع الحدث",
              "They were written when the events happened",
            ],
            ["لأنها محفورة على الحجر", "They are carved in stone"],
          ],
          p: "books",
        },
        {
          q: "تُعد الأفلام التاريخية من المصادر الثانوية.",
          en: "Historical films are secondary sources.",
          o: [
            [
              "لأنها سُجلت بعد وقوع الحدث بفترة زمنية طويلة، ويسهل الحصول عليها",
              "They were made long after the events, and they are easy to get",
            ],
            [
              "لأنها صُوّرت في زمن وقوع الحدث",
              "They were filmed when the events happened",
            ],
            ["لأنها شائعات", "They are rumours"],
          ],
          p: "films",
        },
        {
          q: "أهمية البوصلة الرقمية في حياتنا.",
          en: "Why the digital compass is important in our lives.",
          o: [
            [
              "تُستخدم في تحديد الاتجاهات بسرعة ودقة",
              "It finds directions quickly and exactly",
            ],
            ["تُستخدم في قياس درجة الحرارة", "It measures the temperature"],
            [
              "تُستخدم في حساب المسافات على الخريطة",
              "It works out distances on the map",
            ],
          ],
          p: "compass",
        },
        {
          q: "أهمية النجم القطبي الشمالي عند المصريين القدماء.",
          en: "Why the North Star was important to the ancient Egyptians.",
          o: [
            [
              "استعانوا به في تحديد الاتجاهات ليلًا",
              "They used it to find directions at night",
            ],
            [
              "استعانوا به في تحديد الاتجاهات نهارًا",
              "They used it to find directions in the daytime",
            ],
            ["استخدموه في صناعة البردي", "They used it to make papyrus"],
          ],
          p: "star",
        },
        {
          q: "أهمية الخريطة للمزارع.",
          en: "Why a map is important to a farmer.",
          o: [
            [
              "يستخدمها في تحديد موقع الأرض الزراعية",
              "He uses it to find where the farmland is",
            ],
            [
              "يستخدمها في تحديد المواقع العسكرية",
              "He uses it to find military positions",
            ],
            [
              "يستخدمها في تحديد مسار الرحلات",
              "He uses it to plan flight routes",
            ],
          ],
          p: "users",
        },
        {
          q: "ما أهمية مفتاح الخريطة؟",
          en: "What is the map key for?",
          o: [
            [
              "يوضح معنى الرموز والألوان على الخريطة",
              "It explains what the symbols and colours on the map mean",
            ],
            [
              "يوضح الاتجاهات على الخريطة",
              "It shows the directions on the map",
            ],
            ["يوضح موضوع الخريطة", "It shows what the map is about"],
          ],
          p: "mapparts",
        },
        {
          q: "أهمية الخريطة للجندي.",
          en: "Why a map is important to a soldier.",
          o: [
            [
              "يستخدمها في تحديد المواقع العسكرية",
              "He uses it to find military positions",
            ],
            [
              "يستخدمها في تحديد موقع الأرض الزراعية",
              "He uses it to find farmland",
            ],
            [
              "يستخدمها للتخطيط لإنشاء المباني والطرق",
              "He uses it to plan buildings and roads",
            ],
          ],
          p: "users",
        },
        {
          q: "ما أهمية عنوان الخريطة؟",
          en: "What is the map title for?",
          o: [
            ["يوضح موضوع الخريطة", "It shows what the map is about"],
            [
              "يوضح الاتجاهات على الخريطة",
              "It shows the directions on the map",
            ],
            [
              "يوضح معنى الرموز والألوان",
              "It explains the symbols and colours",
            ],
          ],
          p: "mapparts",
        },
        {
          q: "أهمية الخريطة للمهندس.",
          en: "Why a map is important to an engineer.",
          o: [
            [
              "يستخدمها للتخطيط لإنشاء المباني والطرق",
              "He uses it to plan buildings and roads",
            ],
            [
              "يستخدمها في تحديد المواقع العسكرية",
              "He uses it to find military positions",
            ],
            [
              "يستخدمها للوصول إلى الأماكن السياحية",
              "He uses it to get to tourist places",
            ],
          ],
          p: "users",
        },
        {
          q: "ما أهمية وردة البوصلة على الخريطة؟",
          en: "What is the compass rose on the map for?",
          o: [
            [
              "توضح الاتجاهات على الخريطة",
              "It shows the directions on the map",
            ],
            ["توضح موضوع الخريطة", "It shows what the map is about"],
            [
              "توضح النسبة بين المسافة على الخريطة وما يقابلها على الطبيعة",
              "It shows the ratio between map distance and real distance",
            ],
          ],
          p: "compass",
        },
      ],
    },
    {
      k: "prove",
      ic: "🔗",
      t: "Prove & link",
      ar: "دلل · ما العلاقة بين؟",
      qs: [
        {
          ask: "دلل (أثبت):",
          askE: "Prove it:",
          q: "المصريون القدماء أول من عرفوا رسم الخرائط.",
          en: "The ancient Egyptians were the first to draw maps.",
          o: [
            [
              "رسموا الخرائط على ورق البردي وجدران المعابد، واستخدموها في وصف مسار نهر النيل",
              "They drew maps on papyrus and temple walls and used them to describe the course of the Nile",
            ],
            [
              "رسموا خرائط رقمية على الهواتف",
              "They drew digital maps on phones",
            ],
            [
              "رسموا خريطة العالم بالأقمار الصناعية",
              "They drew the world map with satellites",
            ],
          ],
          p: "papyrus",
        },
        {
          ask: "دلل (أثبت):",
          askE: "Prove it:",
          q: "تقدير العالم حديثًا لجهود عالمة الفلك مريم الإسطرلابية.",
          en: "Today the world honours the work of the astronomer Mariam al-Astrulabi.",
          o: [
            [
              "تمت تسمية أحد الكويكبات المكتشفة باسمها",
              "An asteroid was named after her",
            ],
            [
              "رُسمت صورتها على كل الخرائط",
              "Her picture is drawn on every map",
            ],
            [
              "سُميت مدينة في مصر باسمها",
              "A city in Egypt was named after her",
            ],
          ],
          p: "mariam",
        },
        {
          ask: "دلل (أثبت):",
          askE: "Prove it:",
          q: "براعة المصريين القدماء في علم الفلك.",
          en: "The ancient Egyptians were skilled in astronomy.",
          o: [
            [
              "استعانوا بالنجم القطبي الشمالي في تحديد الاتجاهات ليلًا",
              "They used the North Star to find directions at night",
            ],
            ["اخترعوا نظام GPS", "They invented GPS"],
            ["التقطوا الصور الفضائية", "They took space photos"],
          ],
          p: "star",
        },
        {
          ask: "ما العلاقة بين:",
          askE: "What is the link between:",
          q: "الصور الجوية والخرائط",
          en: "Aerial photos and maps",
          o: [
            [
              "الصور الجوية من أهم مصادر رسم الخرائط",
              "Aerial photos are one of the most important sources for drawing maps",
            ],
            [
              "الصور الجوية تحدد أوقات الصلاة",
              "Aerial photos tell the prayer times",
            ],
            [
              "الصور الجوية تُلتقط من الفضاء خارج الكرة الأرضية",
              "Aerial photos are taken from space, outside the Earth",
            ],
          ],
          p: "aerial",
        },
        {
          ask: "ما العلاقة بين:",
          askE: "What is the link between:",
          q: "مريم عالمة الفلك والإسطرلاب",
          en: "Mariam the astronomer and the astrolabe",
          o: [
            [
              "قامت مريم بحسابات رياضية دقيقة لتطوير الإسطرلاب",
              "Mariam did exact maths to improve the astrolabe",
            ],
            [
              "رسمت مريم خريطة النيل على الإسطرلاب",
              "Mariam drew a map of the Nile on the astrolabe",
            ],
            [
              "اشترت مريم الإسطرلاب من السوق",
              "Mariam bought the astrolabe at the market",
            ],
          ],
          p: "astrolabe",
        },
        {
          ask: "ما العلاقة بين:",
          askE: "What is the link between:",
          q: "الصور الفضائية والخرائط",
          en: "Space photos and maps",
          o: [
            [
              "الصور الفضائية من أهم مصادر رسم الخرائط",
              "Space photos are one of the most important sources for drawing maps",
            ],
            [
              "الصور الفضائية تُلتقط بواسطة الطائرات",
              "Space photos are taken by aeroplanes",
            ],
            [
              "الصور الفضائية من المصادر الأولية للتاريخ",
              "Space photos are primary sources of history",
            ],
          ],
          p: "space",
        },
        {
          ask: "ما العلاقة بين:",
          askE: "What is the link between:",
          q: "الشمس والاتجاهات",
          en: "The sun and directions",
          o: [
            [
              "كانت الشمس تُستخدم قديمًا في تحديد الاتجاهات نهارًا",
              "Long ago the sun was used to find directions in the daytime",
            ],
            [
              "كانت الشمس تُستخدم قديمًا في تحديد الاتجاهات ليلًا",
              "Long ago the sun was used to find directions at night",
            ],
            [
              "الشمس تشير دائمًا إلى اتجاه الشمال",
              "The sun always points north",
            ],
          ],
          p: "sunface",
        },
        {
          ask: "ما العلاقة بين:",
          askE: "What is the link between:",
          q: "النجم القطبي الشمالي والاتجاهات",
          en: "The North Star and directions",
          o: [
            [
              "كان النجم القطبي الشمالي يُستخدم قديمًا في تحديد الاتجاهات ليلًا",
              "Long ago the North Star was used to find directions at night",
            ],
            [
              "كان النجم القطبي الشمالي يُستخدم في تحديد الاتجاهات نهارًا",
              "The North Star was used to find directions in the daytime",
            ],
            [
              "النجم القطبي يشير دائمًا إلى اتجاه الجنوب",
              "The North Star always points south",
            ],
          ],
          p: "star",
        },
      ],
    },
    {
      k: "ans",
      ic: "💡",
      t: "Answer",
      ar: "أجب عما يلي",
      qs: [
        {
          q: "اذكر استخدامين للإسطرلاب.",
          en: "Name two uses of the astrolabe.",
          o: [
            [
              "تحديد اتجاه القبلة وأوقات الصلاة",
              "Finding the direction of the qibla and the prayer times",
            ],
            ["قياس الوزن والتقاط الصور", "Weighing things and taking pictures"],
            [
              "قياس درجة الحرارة وسرعة الرياح",
              "Measuring temperature and wind speed",
            ],
          ],
          p: "astrolabe",
        },
        {
          q: "أيهما أدق: الخرائط الرقمية أم الخرائط اليدوية؟ ولماذا؟",
          en: "Which are more exact, digital maps or hand-drawn maps? Why?",
          o: [
            [
              "الخرائط الرقمية أدق، لأن الخرائط اليدوية بسيطة مرسومة باليد",
              "Digital maps, because hand-drawn maps are simple and drawn by hand",
            ],
            [
              "الخرائط اليدوية أدق، لأنها مرسومة باليد",
              "Hand-drawn maps, because they are drawn by hand",
            ],
            ["كلاهما بنفس الدقة", "Both are just as exact"],
          ],
          p: "satellite",
        },
        {
          q: "اشرح كيفية تحديد الاتجاهات عند المصريين القدماء ليلًا.",
          en: "Explain how the ancient Egyptians found directions at night.",
          o: [
            [
              "بالاستعانة بالنجم القطبي الشمالي الذي يشير دائمًا لاتجاه الشمال، ومنه يمكن تحديد باقي الاتجاهات",
              "Using the North Star, which always points north; from north you can find the other directions",
            ],
            [
              "بالنظر إلى الشمس عند شروقها",
              "By looking at the sun when it rises",
            ],
            ["باستخدام البوصلة الرقمية", "By using a digital compass"],
          ],
          p: "star",
        },
        {
          q: "ما أهمية المدرسة بالنسبة لنا؟",
          en: "Why is school important to us?",
          o: [
            [
              "تعتبر بيتنا الثاني، والمكان الذي نتعلم فيه ونقضي وقتًا ممتعًا مع الأصدقاء والمعلمين",
              "It is our second home, where we learn and have a good time with friends and teachers",
            ],
            ["هي مكان لشراء الطعام فقط", "It is only a place to buy food"],
            ["هي مكان للنوم", "It is a place to sleep"],
          ],
          p: "cover4",
        },
        {
          q: "اشرح كيفية تحديد الاتجاهات بالنهار قديمًا.",
          en: "Explain how people found directions in the daytime long ago.",
          o: [
            [
              "باستخدام الشمس: عندما نقف أمامها عند شروقها نتجه نحو الشرق، والغرب خلفنا، والجنوب على يميننا، والشمال على يسارنا",
              "Using the sun: facing the sunrise we face east, west is behind us, south is on our right and north is on our left",
            ],
            [
              "باستخدام الشمس: عندما نقف أمامها عند شروقها نتجه نحو الغرب، والشرق خلفنا",
              "Using the sun: facing the sunrise we face west, and east is behind us",
            ],
            ["باستخدام النجم القطبي الشمالي", "Using the North Star"],
          ],
          p: "sunface",
        },
        {
          q: "ما واجبنا نحو مدرستنا؟",
          en: "What is our duty towards our school?",
          o: [
            [
              "المحافظة عليها واتباع القوانين بها",
              "To take care of it and follow its rules",
            ],
            ["الكتابة على جدرانها", "To write on its walls"],
            ["ترك الفصل غير نظيف", "To leave the classroom dirty"],
          ],
          p: "cover4",
        },
        {
          q: "اشرح مدلول اللون البني على الخريطة مع تقديم مثال.",
          en: "Explain what brown means on a map, with an example.",
          o: [
            [
              "يعبر عن المرتفعات مثل الجبال والهضاب (مثل جبل سانت كاترين وهضبة التيه)",
              "Highlands such as mountains and plateaus (e.g. Mount Saint Catherine and the Tih Plateau)",
            ],
            [
              "يعبر عن المسطحات المائية مثل البحار والبحيرات",
              "Water bodies such as seas and lakes",
            ],
            [
              "يعبر عن المناطق الأقل ارتفاعًا مثل السهول",
              "Low land such as plains",
            ],
          ],
          p: "mapparts",
        },
        {
          q: "اشرح مدلول اللون الأخضر على الخريطة مع إعطاء مثال.",
          en: "Explain what green means on a map, with an example.",
          o: [
            [
              "يعبر عن المناطق الأقل ارتفاعًا مثل السهول",
              "Low land such as plains",
            ],
            [
              "يعبر عن المرتفعات مثل الجبال والهضاب",
              "Highlands such as mountains and plateaus",
            ],
            [
              "يعبر عن المسطحات المائية مثل البحار والبحيرات",
              "Water bodies such as seas and lakes",
            ],
          ],
          p: "mapparts",
        },
        {
          q: "اشرح مدلول اللون الأزرق على الخريطة مع تقديم مثال.",
          en: "Explain what blue means on a map, with an example.",
          o: [
            [
              "يعبر عن المسطحات المائية مثل البحار والبحيرات (مثل البحر الأحمر والبحر المتوسط وبحيرة ناصر)",
              "Water bodies such as seas and lakes (e.g. the Red Sea, the Mediterranean and Lake Nasser)",
            ],
            [
              "يعبر عن المرتفعات مثل الجبال والهضاب",
              "Highlands such as mountains and plateaus",
            ],
            [
              "يعبر عن المناطق الأقل ارتفاعًا مثل السهول",
              "Low land such as plains",
            ],
          ],
          p: "map3",
        },
      ],
    },
    {
      k: "choose",
      ic: "✅",
      t: "Choose the answer",
      ar: "اختر الإجابة الصحيحة",
      qs: [
        {
          q: "المسؤول عن تصميم وبناء المنازل والمدارس هو ___.",
          en: "The person in charge of designing and building houses and schools is ___.",
          o: [
            ["المهندس", "the engineer"],
            ["المعلم", "the teacher"],
            ["الطبيب", "the doctor"],
            ["المزارع", "the farmer"],
          ],
          p: "users",
        },
        {
          q: "ما الاتجاه الذي يكون على يسارك إذا واجهت الشمس عند شروقها؟",
          en: "Which direction is on your left when you face the rising sun?",
          o: [
            ["الشمال", "north"],
            ["الجنوب", "south"],
            ["الغرب", "west"],
            ["الشرق", "east"],
          ],
          p: "cover1",
        },
        {
          q: "الاتجاه الفرعي الذي يقع بين الشمال والشرق هو ___.",
          en: "The in-between direction that lies between north and east is ___.",
          o: [
            ["الشمال الشرقي", "north-east"],
            ["الجنوب الشرقي", "south-east"],
            ["الشمال الغربي", "north-west"],
            ["الجنوب الغربي", "south-west"],
          ],
          p: "compass",
        },
        {
          q: "أي من العناصر التالية يعبر عن موضوع الخريطة؟",
          en: "Which of these elements tells what the map is about?",
          o: [
            ["عنوان الخريطة", "the map title"],
            ["مفتاح الخريطة", "the map key"],
            ["وردة البوصلة", "the compass rose"],
            ["مقياس الرسم", "the scale"],
          ],
          p: "mapparts",
        },
        {
          q: "أي من هؤلاء يستخدم الخريطة في تحديد المواقع العسكرية؟",
          en: "Which of these people uses a map to find military positions?",
          o: [
            ["الجندي", "the soldier"],
            ["المعلم", "the teacher"],
            ["السائح", "the tourist"],
            ["المزارع", "the farmer"],
          ],
          p: "users",
        },
        {
          q: "ساعد الإسطرلاب قديمًا في ___.",
          en: "Long ago the astrolabe helped with ___.",
          o: [
            ["تحديد المواقع", "finding places"],
            ["قياس الوزن", "weighing things"],
            ["قياس المسافات", "measuring distances"],
            ["التقاط الصور", "taking pictures"],
          ],
          p: "astrolabe",
        },
        {
          q: "أشهر من رسم الخرائط من العلماء العرب هو ___.",
          en: "The most famous Arab scholar who drew maps is ___.",
          o: [
            ["الإدريسي", "al-Idrisi"],
            ["ابن سينا", "Ibn Sina"],
            ["ابن خلدون", "Ibn Khaldun"],
            ["الخوارزمي", "al-Khwarizmi"],
          ],
          p: "idrisi",
        },
        {
          q: "أحد المصادر الأولية التي يمكن استخدامها عند كتابة بحث عن تاريخ مصر هو ___.",
          en: "One primary source you can use when writing a project about the history of Egypt is ___.",
          o: [
            ["كتابات المؤرخين", "the writings of historians"],
            ["الإنترنت", "the internet"],
            ["المقالات الصحفية", "newspaper articles"],
            ["الأبحاث", "research papers"],
          ],
          p: "writings",
        },
      ],
    },
    {
      k: "tf",
      ic: "⚖️",
      t: "Right or wrong",
      ar: "صواب أم خطأ؟",
      qs: [
        {
          q: "يستخدم الطيار الخريطة في تحديد مسار الرحلات.",
          en: "A pilot uses a map to plan the route of flights.",
          tf: true,
          p: "users",
        },
        {
          q: "المصادر الأولية أكثر دقة من الثانوية.",
          en: "Primary sources are more exact than secondary sources.",
          tf: true,
          p: "carving",
        },
        {
          q: "يكون اتجاه الغرب على يمينك عند مواجهة الشمس صباحًا.",
          en: "West is on your right when you face the sun in the morning.",
          tf: false,
          x: "Facing the morning sun, west is behind you; south (الجنوب) is on your right.",
          p: "compass",
        },
        {
          q: "يقتصر استخدام الخرائط على مهندسي الطرق.",
          en: "Only road engineers use maps.",
          tf: false,
          x: "Many people use maps: farmers, soldiers, tourists, pilots and engineers.",
          p: "users",
        },
        {
          q: "يقع اتجاه الشمال الغربي بين الغرب والشرق.",
          en: "North-west lies between west and east.",
          tf: false,
          x: "North-west (الشمال الغربي) lies between north and west.",
          p: "compass",
        },
        {
          q: "يصعب قراءة الخريطة بدون مفتاح الخريطة.",
          en: "It is hard to read a map without its key.",
          tf: true,
          p: "mapparts",
        },
      ],
    },
  ],
  terms: [
    {
      u: 1,
      w: "النجم القطبي",
      we: "The North Star",
      t: "هو نجم لامع في السماء يشير دائمًا إلى اتجاه الشمال",
      en: "A bright star in the sky that always points north.",
      p: "star",
    },
    {
      u: 1,
      w: "البوصلة",
      we: "The compass",
      t: "هي أداة تحتوي على إبرة مغناطيسية تشير دائمًا إلى الشمال المغناطيسي",
      en: "A tool with a magnetic needle that always points to magnetic north.",
      p: "compass",
    },
    {
      u: 2,
      w: "المخطط",
      we: "The plan",
      t: "شكل مبسط لفكرة الخريطة",
      en: "A simple drawing that gives the idea of a map.",
      p: "cover2",
    },
    {
      u: 2,
      w: "الخريطة",
      we: "The map",
      t: "رسم مصغر لسطح الأرض أو جزء منه باستخدام الرموز والألوان ومقياس رسم محدد",
      en: "A small drawing of the Earth's surface, or part of it, using symbols, colours and a set scale.",
      p: "mapparts",
    },
    {
      u: 2,
      w: "مقياس الرسم",
      we: "The scale",
      t: "هو النسبة بين المسافة على الخريطة وما يقابلها على الطبيعة",
      en: "The ratio between a distance on the map and the real distance on the ground.",
      p: "map2",
    },
    {
      u: 3,
      w: "نظام تحديد المواقع العالمي",
      we: "GPS (Global Positioning System)",
      t: "نظام يعتمد على الأقمار الصناعية في تحديد المواقع والاتجاهات",
      en: "A system that uses satellites to find places and directions.",
      p: "satellite",
    },
    {
      u: 3,
      w: "الصورة الجوية",
      we: "Aerial photo",
      t: "صورة يتم التقاطها من الجو بواسطة الطائرات",
      en: "A picture taken from the air by aeroplanes.",
      p: "aerial",
    },
    {
      u: 3,
      w: "الصورة الفضائية",
      we: "Space photo",
      t: "صورة يتم التقاطها من الفضاء خارج الكرة الأرضية بواسطة الأقمار الصناعية",
      en: "A picture taken from space, outside the Earth, by satellites.",
      p: "space",
    },
    {
      u: 3,
      w: "الإسطرلاب",
      we: "The astrolabe",
      t: "أداة فلكية قديمة استُخدمت لتحديد المواقع والاتجاهات من خلال النجوم",
      en: "An old astronomy tool used to find places and directions from the stars.",
      p: "astrolabe",
    },
    {
      u: 4,
      w: "المصادر الأولية",
      we: "Primary sources",
      t: "هي مصادر سُجلت في زمن وقوع الحدث",
      en: "Sources recorded at the time the event happened.",
      p: "carving",
    },
    {
      u: 4,
      w: "المصادر الثانوية",
      we: "Secondary sources",
      t: "هي مصادر سُجلت بعد وقوع الحدث بفترة زمنية طويلة، وتعتمد على المصادر الأولية",
      en: "Sources recorded a long time after the event, based on primary sources.",
      p: "books",
    },
    {
      u: 4,
      w: "الآثار",
      we: "Monuments",
      t: "كل ما تركه القدماء من مبانٍ وتماثيل وأدوات وغيرها",
      en: "Everything the ancients left behind: buildings, statues, tools and more.",
      p: "pyramid",
    },
    {
      u: 4,
      w: "النقوش الأثرية",
      we: "Ancient carvings",
      t: "تشمل الصور والكتابات والرموز المحفورة على الحجر وغيره",
      en: "Pictures, writing and symbols carved on stone and other materials.",
      p: "carving",
    },
    {
      u: 4,
      w: "البرديات",
      we: "Papyri",
      t: "أحد أنواع الورق ابتكره المصريون القدماء لتسجيل أخبارهم وأحداث حياتهم، صُنع من نبات البردي الذي ينمو على ضفاف نهر النيل",
      en: "A kind of paper the ancient Egyptians invented to record their news and lives, made from the papyrus plant that grows on the banks of the Nile.",
      p: "papyrus",
    },
    {
      u: 4,
      w: "كتابات المؤرخين",
      we: "Writings of historians",
      t: "كل ما كتبه المؤرخون الذين عاصروا الحدث",
      en: "Everything written by historians who lived at the time of the event.",
      p: "writings",
    },
    {
      u: 4,
      w: "الحقائق",
      we: "Facts",
      t: "معلومات صحيحة تم التأكد منها ويمكن إثباتها",
      en: "Correct information that has been checked and can be proved.",
      p: "kids",
    },
    {
      u: 4,
      w: "الآراء",
      we: "Opinions",
      t: "تعبر عن وجهات نظر شخصية، قد تكون صحيحة أو غير صحيحة",
      en: "Personal points of view; they may be right or wrong.",
      p: "kids",
    },
    {
      u: 4,
      w: "الشائعات",
      we: "Rumours",
      t: "الأحاديث غير الصحيحة التي يتناقلها الناس دون معرفة مصادرها",
      en: "Untrue talk that people pass on without knowing where it came from.",
      p: "kids",
    },
  ],
};
