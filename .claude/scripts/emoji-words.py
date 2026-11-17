# Builds the emoji word lists of the dictation maker: shared/emoji-words-<lang>.js (en, uk, fr, ar).
# Sources (Unicode, free licence), downloaded into an empty folder first:
#   https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-annotations-full/annotations/<lang>/annotations.json
#     → ann-<lang>.json (the emoji names and keywords in that language)
#   https://unicode.org/Public/emoji/latest/emoji-test.txt (every emoji, its version and its order)
# Use: python3 -I .claude/scripts/emoji-words.py <folder with the sources> shared/ && prettier --write shared/emoji-words-*.js
# Only emoji of Emoji 14.0 or older (2021) are kept: newer ones show as empty boxes on older tablets.
# Each word gets at most 12 emoji, best first: the emoji's whole name, a word of its name, a keyword, a word of a keyword.
import json, re, sys, os

src, out = sys.argv[1], sys.argv[2]
MAX_VER = 14.0
PER_WORD = 12
# extra words for English school spelling lists that the Unicode keywords do not have
EXTRA = {
    "en": {
        "color": "🎨🌈🖍️",
        "colour": "🎨🌈🖍️",
        "favorite": "⭐❤️",
        "favourite": "⭐❤️",
        "runner": "🏃",
        "bird": "🐦",
        "path": "🛤️",
        "pathway": "🛤️",
        "truth": "✅",
        "lunch": "🥪🍱",
        "thick": "📚",
        "pitch": "⚾🏟️",
        "stretch": "🤸",
        "fuzzy": "🧸",
        "them": "👥",
        "much": "➕",
        "today": "📅",
        "soft": "🧸",
        "hatch": "🐣",
        "chick": "🐤",
        "boat": "⛵",
    }
}

# emoji-test.txt: fully-qualified emoji, their version and order; skin tones and components are left out
order, by_bare = {}, {}
group = ""
for line in open(os.path.join(src, "emoji-test.txt"), encoding="utf-8"):
    if line.startswith("# group:"):
        group = line.split(":", 1)[1].strip()
        continue
    m = re.match(r"^([0-9A-F ]+);\s*fully-qualified\s*#\s*(\S+)\s+E(\d+\.\d+)", line)
    if not m or group == "Component":
        continue
    cps = [int(c, 16) for c in m.group(1).split()]
    if any(0x1F3FB <= c <= 0x1F3FF for c in cps) or float(m.group(3)) > MAX_VER:
        continue
    e = "".join(chr(c) for c in cps)
    order[e] = len(order)
    by_bare[e.replace("\ufe0f", "")] = e

TOK = re.compile(r"[^\W\d_](?:[^\W\d_]|['’])*", re.UNICODE)


# Arabic keys: no tashkeel, one alef, ى → ي, ة → ه (the maker looks words up the same way: norm() in dictation-store.js)
def ar_norm(s):
    s = re.sub("[\u064B-\u065F\u0670\u0640]", "", s)
    return re.sub("[أإآٱ]", "ا", s).replace("ى", "ي").replace("ة", "ه")


def toks(s):
    return [t.lower().replace("’", "'") for t in TOK.findall(s)]


def emoji_split(s):
    out, i = [], 0
    keys = sorted(order, key=len, reverse=True)
    while i < len(s):
        k = next((k for k in keys if s.startswith(k, i)), None)
        if not k:
            i += 1
            continue
        out.append(k)
        i += len(k)
    return out


for lang in ["en", "uk", "fr", "ar"]:
    ann = json.load(open(os.path.join(src, f"ann-{lang}.json"), encoding="utf-8"))
    ann = ann["annotations"]["annotations"]
    best = {}  # word → {emoji: rank}

    def put(w, e, r):
        d = best.setdefault(w, {})
        if r < d.get(e, 9):
            d[e] = r

    for k, v in ann.items():
        e = by_bare.get(k.replace("\ufe0f", ""))
        if not e:
            continue
        if lang == "ar":
            v = {f: [ar_norm(x) for x in v.get(f, [])] for f in ("tts", "default")}
        for name in v.get("tts", []):
            t = toks(name)
            if len(t) == 1:
                put(t[0], e, 0)
            for w in t:
                put(w, e, 1)
        for kw in v.get("default", []):
            t = toks(kw)
            if len(t) == 1:
                put(t[0], e, 2)
            for w in t:
                put(w, e, 3)
    for w, es in EXTRA.get(lang, {}).items():
        for i, e in enumerate(emoji_split(es)):
            put(w, e, -1 - (len(es) - i) / 100)
    lines = []
    for w in sorted(best):
        es = sorted(best[w].items(), key=lambda x: (x[1], order[x[0]]))[:PER_WORD]
        if len(w) > 1:
            lines.append(w + " " + " ".join(e for e, _ in es))
    data = "\n".join(lines)
    js = (
        f"// Emoji for the words of one language ({lang}), for the dictation maker (shared/dictation-maker.js).\n"
        "// Made by .claude/scripts/emoji-words.py from the Unicode emoji names and keywords (CLDR); don't edit by hand.\n"
        "// One line per word: the word, then its emoji, best first.\n"
        "window.EMOJI_WORDS = window.EMOJI_WORDS || {};\n"
        f"window.EMOJI_WORDS.{lang} = {json.dumps(data, ensure_ascii=False)};\n"
    )
    p = os.path.join(out, f"emoji-words-{lang}.js")
    open(p, "w", encoding="utf-8").write(js)
    print(p, len(lines), "words", len(js.encode()) // 1024, "kB")
