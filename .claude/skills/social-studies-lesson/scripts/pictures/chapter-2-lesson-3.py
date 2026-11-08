# Pictures for Social Studies Chapter 2 Lesson 3 « Growth and Civil War » (book pp. 64–69) and the story « The Civil War » (pp. 66–67).
# Run from the repo root: python3 -I .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-3.py
# Writes grade-4/social-studies/chapter-2/img/lesson-3/*.jpg: book crops (spread n = pages 2(n−28), 2(n−28)+1) and drawings
# (draw.py from the Science skill): the North and the South, a timeline.
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "../../../science-lesson/scripts/pictures"))
from PIL import Image  # noqa: E402
from draw import INK, RED, W, canvas, emoji, font, label, save, two_pictures  # noqa: E402

BOOK = os.path.expanduser("~/Documents/2026-2027/Alex/S.S.English/book")
OUT = "grade-4/social-studies/chapter-2/img/lesson-3"
os.makedirs(OUT, exist_ok=True)
sv = lambda im, n: save(im, OUT, n)


def crop(spread, box, name):
    sv(Image.open(os.path.join(BOOK, f"{spread:03d}.png")).convert("RGB").crop(box), name)


# --- book crops (coordinates on the 1368×858 spread) ---
crop(60, (138, 524, 680, 800), "san-francisco")  # p. 64: San Francisco during the Gold Rush (caption left out)
crop(60, (1137, 170, 1306, 490), "pony-express")  # p. 65: Pony Express advertisement
crop(61, (84, 38, 252, 232), "douglass")  # p. 66: Frederick Douglass
crop(61, (84, 308, 266, 522), "tubman")  # p. 66: Harriet Tubman
crop(61, (1124, 38, 1306, 234), "lincoln")  # p. 67: Abraham Lincoln
crop(61, (752, 337, 1309, 692), "map-1861")  # p. 67: Union and Confederate States, 1861
crop(62, (80, 38, 252, 234), "bruce")  # p. 68: Blanche Bruce
crop(62, (1124, 38, 1306, 234), "chief-joseph")  # p. 69: Chief Joseph

# --- the North and the South (p. 66) ---
sv(two_pictures("🏭🏙️", "🌾🧺", ("North: factories", "South: farms")), "e-north-south")

# --- a timeline: 1848 → 1865 ---
im, d = canvas()
label(d, (W // 2, 40), "Growth and Civil War", col=INK, size=30)
d.line([(30, 220), (690, 220)], fill=INK, width=8)
points = [
    ("1848", "Gold in", "California", "⛏️"),
    ("1860", "Lincoln", "president", "🎩"),
    ("1861", "War", "begins", "💥"),
    ("1865", "War", "ends", "🕊️"),
    ("1874", "Blanche Bruce", "Senate", "🏛️"),
]
step = 660 // len(points)
for k, (year, t1, t2, e) in enumerate(points):
    x = 30 + step // 2 + k * step
    emoji(im, (x, 125), e, 64)
    d.ellipse([x - 15, 205, x + 15, 235], fill=RED, outline=INK, width=4)
    label(d, (x, 275), year, size=34)
    d.text((x, 330), t1, fill=INK, font=font(18), anchor="mm")
    d.text((x, 358), t2, fill=INK, font=font(18), anchor="mm")
sv(im, "e-timeline")
