#!/usr/bin/env python3
# The text of pages of the Savchuk reading book (Optima Українська література), decoded.
# The PDF's text layer is cp1251 read as Latin-1 («Ïðî÷èòàé» = «Прочитай»); this turns it back into Ukrainian.
# Usage (from anywhere): python3 -I .claude/scripts/savchuk-text.py FIRST [LAST] [--raw]
#   --raw keeps the line ends and hyphens as printed; without it, words cut at a line end are joined.
# Left as printed: «џ» = a bullet (•), a combining ´ = the book's stress mark (dropped by default), «�» = a lost letter (read the picture).
import glob, os, re, subprocess, sys

BOOK = glob.glob(os.path.expanduser("~/Documents/2026-2027/Lucas/Optima/ПІДРУЧНИК_Савчук*.pdf"))[0]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
first = int(args[0])
last = int(args[1]) if len(args) > 1 else first
raw = "--raw" in sys.argv


def fix(t):
    out = []
    for ch in t:
        if 0xA0 <= ord(ch) <= 0xFF:
            try:
                out.append(ch.encode("latin-1").decode("cp1251"))
                continue
            except UnicodeError:
                pass
        out.append(ch)
    return "".join(out)


for p in range(first, last + 1):
    t = subprocess.run(
        ["pdftotext", "-f", str(p), "-l", str(p), "-layout", BOOK, "-"],
        capture_output=True,
        text=True,
    ).stdout
    t = fix(t).replace("џ", "•")
    if not raw:
        t = t.replace("́", "").replace("́", "")
        t = re.sub(r"(\w)-\n\s*(\w)", r"\1\2", t)  # дізна-\nєтеся → дізнаєтеся
        t = re.sub(r"(\w) (\w)", lambda m: m.group(0), t)
    print(f"===== с. {p} =====")
    print(t.rstrip())
