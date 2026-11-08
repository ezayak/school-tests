# Pictures for Social Studies Chapter 2 Lesson 1 « America and Europe » (book pp. 48–53) and the story « Columbus Reaches the Americas » (p. 50).
# Run from the repo root: python3 -I .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-1.py
# Writes grade-4/social-studies/chapter-2/img/lesson-1/*.jpg: book crops (two-page spreads 1368×858; in Chapter 2, spread n = pages 2(n−28) and 2(n−28)+1)
# and e-*.jpg explanation drawings (720×440, draw.py from the Science skill).
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "../../../science-lesson/scripts/pictures"))
from PIL import Image, ImageDraw  # noqa: E402
from draw import BLUE, INK, RED, arrow, canvas, font, label, save, two_pictures  # noqa: E402

BOOK = os.path.expanduser("~/Documents/2026-2027/Alex/S.S.English/book")
OUT = "grade-4/social-studies/chapter-2/img/lesson-1"
os.makedirs(OUT, exist_ok=True)
sv = lambda im, n: save(im, OUT, n)


def crop(spread, box, name):
    sv(Image.open(os.path.join(BOOK, f"{spread:03d}.png")).convert("RGB").crop(box), name)


# --- book crops (coordinates on the 1368×858 spread) ---
crop(52, (60, 570, 650, 812), "kihn")  # p. 48: W. Langdon Kihn's painting of Native Americans
crop(52, (1046, 433, 1305, 786), "routes-map")  # p. 49: Routes of First Americans
crop(53, (57, 496, 655, 812), "explorers-map")  # p. 50: Explorers in the Americas
crop(53, (1017, 38, 1345, 490), "jamestown")  # p. 51: daily life at Jamestown today
crop(54, (75, 60, 248, 305), "from-americas")  # p. 52: plants and animals the Americas shared with Europe
crop(54, (90, 500, 252, 742), "from-europe")  # p. 52: plants and animals Europeans brought to the Americas

# --- a timeline: Columbus 1492 → Jamestown 1607 → House of Burgesses 1619 ---
im, d = canvas()
d.line([(40, 200), (680, 200)], fill=INK, width=8)
for x, year, t1, t2 in [
    (120, "1492", "Columbus", "arrives"),
    (360, "1607", "Jamestown", "colony"),
    (600, "1619", "House of", "Burgesses"),
]:
    d.ellipse([x - 18, 182, x + 18, 218], fill=RED, outline=INK, width=4)
    label(d, (x, 130), year, size=46)
    d.text((x, 270), t1, fill=INK, font=font(28), anchor="mm")
    d.text((x, 310), t2, fill=INK, font=font(28), anchor="mm")
label(d, (360, 400), "first  →  next  →  last", col=BLUE, size=32)
sv(im, "e-timeline")

# --- the Columbian Exchange: the book's two panels (p. 52), big, side by side, with arrows ---
# (a picture strip shows them too small to see)
im, d = canvas()
for name, x0 in (("from-americas", 20), ("from-europe", 440)):
    p = Image.open(os.path.join(OUT, name + ".jpg"))
    p = p.resize((round(p.width * 360 / p.height), 360), Image.LANCZOS)
    im.paste(p, (x0 + (260 - p.width) // 2, 70))
d = ImageDraw.Draw(im)
arrow(d, (305, 190), (415, 190), col=RED, w=9)
arrow(d, (415, 290), (305, 290), col=BLUE, w=9)
label(d, (150, 35), "Americas → Europe", col=RED, size=24)
label(d, (570, 35), "Europe → Americas", col=BLUE, size=24)
sv(im, "exchange")

# Jamestown 1607 and Plymouth 1620 (a picture strip shows a book photo too small)
sv(two_pictures(Image.open(os.path.join(OUT, "jamestown.jpg")), "⛵🙏", ("1607: Jamestown", "1620: Plymouth")), "jamestown-plymouth")
