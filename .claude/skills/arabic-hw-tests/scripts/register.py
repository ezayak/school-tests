# Usage (from the repo root):
#   python3 .claude/skills/arabic-hw-tests/scripts/register.py test N nAr en cover note
#   python3 .claude/skills/arabic-hw-tests/scripts/register.py hw N nAr title en cover note
import sys, re
kind = sys.argv[1]
A = "grade-3/term-1/arabic/"
p = A + "lessons.js"; s = open(p, encoding="utf8").read()
if kind == "test":
    n, nar, en, cover, note = sys.argv[2:7]; title = "التَّقْيِيمُ الْأُسْبُوعِيُّ"; arr = "window.TESTS"; path = f"test-{n}.html"
else:
    n, nar, title, en, cover, note = sys.argv[2:8]; arr = "window.HOMEWORK"; path = f"hw-{n}.html"
entry = f'  {{\n    n: {n},\n    nAr: "{nar}",\n    title: "{title}",\n    en: "{en}",\n    path: "{path}",\n    cover: "{cover}",\n    note: "{note}",\n  }},\n'
i = s.index(arr); j = s.index("\n];", i) + 1
body = s[i:j]
blocks = re.findall(r"  \{\n.*?\n  \},\n", body, re.S)
assert not any(f'path: "{path}"' in b for b in blocks), "already there"
blocks.append(entry); blocks.sort(key=lambda b: int(re.search(r"n: (\d+),", b).group(1)))
head = body[: body.index("  {\n")] if "  {\n" in body else body
s = s[:i] + head + "".join(blocks) + s[j:]
open(p, "w", encoding="utf8").write(s)
nt = s[s.index("window.TESTS"):].split("\n];")[0].count("    n: ")
nh = s[s.index("window.HOMEWORK"):].split("\n];")[0].count("    n: ")
g = open("games.js", encoding="utf8").read()
stem = path[:-5]
also = re.compile(r'(      "grade-3/term-1/arabic/(?:test|hw)-\d+\.(?:html|js)",\n)+')
m = also.search(g)
lines = re.findall(r'"(grade-3/term-1/arabic/(?:test|hw)-\d+)\.(?:html|js)"', m.group(0))
stems = sorted(set(lines + [A + stem]), key=lambda x: (x.split("/")[-1].split("-")[0] != "test", int(x.split("-")[-1])))
g = g[: m.start()] + "".join(f'      "{x}.html",\n      "{x}.js",\n' for x in stems) + g[m.end():]
g = re.sub(r'"8 lessons · \d+ tests · \d+ homework"', f'"8 lessons · {nt} tests · {nh} homework"', g)
g = re.sub(r"Tests 1–\d+ · ", f"Tests 1–{nt} · ", g)
open("games.js", "w", encoding="utf8").write(g)
print("tests", nt, "homework", nh)
