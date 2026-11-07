# Usage (from the repo root): python3 .claude/skills/arabic-hw-tests/scripts/add-pictures.py lesson-N hw-a.jpg hw-b.jpg
import sys, re
d, names = sys.argv[1], sys.argv[2:]
g = open("games.js", encoding="utf8").read()
pre = f'      "grade-3/term-1/arabic/img/{d}/'
lines = g.split("\n")
idx = [i for i, l in enumerate(lines) if l.startswith(pre)]
assert idx, "no block"
block = sorted(set(lines[idx[0]: idx[-1] + 1] + [f'{pre}{n}",' for n in names]))
lines[idx[0]: idx[-1] + 1] = block
open("games.js", "w", encoding="utf8").write("\n".join(lines))
print(len(block), "pictures in", d)
