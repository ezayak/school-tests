// The Arabic alphabet (classical Arabic, full tashkeel, as in the Arabic lessons): one card per letter, a word for each with an emoji picture.
// lo: the letter; name: its name, said by the voice (أَلِف، بَاء…); w: the word, its first letter with its haraka in [ ];
// ic: the picture (emoji); k: v = a long vowel letter (ا و ي, red), none = consonant (blue).
// snd / wsnd: a recording of the letter / the word ("audio/b.mp3", from this folder) instead of the voice.
window.SPEECH_LETTERS = {
  lang: "ar",
  items: [
    { lo: "ا", name: "أَلِف", w: "[أَ]رْنَب", ic: "🐰", k: "v" },
    { lo: "ب", name: "بَاء", w: "[بَ]طَّة", ic: "🦆" },
    { lo: "ت", name: "تَاء", w: "[تُ]فَّاحَة", ic: "🍎" },
    { lo: "ث", name: "ثَاء", w: "[ثَ]عْلَب", ic: "🦊" },
    { lo: "ج", name: "جِيم", w: "[جَ]مَل", ic: "🐪" },
    { lo: "ح", name: "حَاء", w: "[حِ]صَان", ic: "🐴" },
    { lo: "خ", name: "خَاء", w: "[خَ]رُوف", ic: "🐑" },
    { lo: "د", name: "دَال", w: "[دُ]بّ", ic: "🐻" },
    { lo: "ذ", name: "ذَال", w: "[ذُ]رَة", ic: "🌽" },
    { lo: "ر", name: "رَاء", w: "[رَ]جُل", ic: "👨" },
    { lo: "ز", name: "زَاي", w: "[زَ]رَافَة", ic: "🦒" },
    { lo: "س", name: "سِين", w: "[سَ]مَكَة", ic: "🐟" },
    { lo: "ش", name: "شِين", w: "[شَ]مْس", ic: "☀️" },
    { lo: "ص", name: "صَاد", w: "[صَ]قْر", ic: "🦅" },
    { lo: "ض", name: "ضَاد", w: "[ضِ]فْدَع", ic: "🐸" },
    { lo: "ط", name: "طَاء", w: "[طَ]ائِرَة", ic: "✈️" },
    { lo: "ظ", name: "ظَاء", w: "[ظَ]رْف", ic: "✉️" },
    { lo: "ع", name: "عَيْن", w: "[عِ]نَب", ic: "🍇" },
    { lo: "غ", name: "غَيْن", w: "[غَ]زَال", ic: "🦌" },
    { lo: "ف", name: "فَاء", w: "[فِ]يل", ic: "🐘" },
    { lo: "ق", name: "قَاف", w: "[قِ]طَّة", ic: "🐱" },
    { lo: "ك", name: "كَاف", w: "[كَ]لْب", ic: "🐶" },
    { lo: "ل", name: "لَام", w: "[لَ]يْمُون", ic: "🍋" },
    { lo: "م", name: "مِيم", w: "[مَ]وْز", ic: "🍌" },
    { lo: "ن", name: "نُون", w: "[نَ]حْلَة", ic: "🐝" },
    { lo: "ه", name: "هَاء", w: "[هِ]لَال", ic: "🌙" },
    { lo: "و", name: "وَاو", w: "[وَ]رْدَة", ic: "🌹", k: "v" },
    { lo: "ي", name: "يَاء", w: "[يَ]د", ic: "✋", k: "v" },
  ],
};
