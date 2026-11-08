# Pictures for the Social Studies Chapter 1 revision (Visual Review p. 37, Chapter Assessment pp. 38–40).
# Run from the repo root: python3 -I .claude/skills/social-studies-lesson/scripts/pictures/chapter-1-review.py
# Writes grade-4/social-studies/chapter-1/img/review/*.jpg: book crops (spreads 045–046) and e-*.jpg drawings (draw.py from the Science skill).
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "../../../science-lesson/scripts/pictures"))
from PIL import Image  # noqa: E402
from draw import BLUE, H, INK, RED, W, canvas, label, save  # noqa: E402

BOOK = os.path.expanduser("~/Documents/2026-2027/Alex/S.S.English/book")
OUT = "grade-4/social-studies/chapter-1/img/review"
os.makedirs(OUT, exist_ok=True)
sv = lambda im, n: save(im, OUT, n)
GREEN, BROWN, SKY, WATER = (110, 170, 80), (170, 120, 70), (215, 235, 250), (70, 150, 230)


def crop(spread, box):
    return Image.open(os.path.join(BOOK, f"{spread:03d}.png")).convert("RGB").crop(box)


# --- the Visual Review photos (p. 37), one per lesson ---
sv(crop(45, (752, 160, 1012, 326)), "vr-land")
sv(crop(45, (1041, 160, 1302, 326)), "vr-weather")
sv(crop(45, (752, 500, 1012, 662)), "vr-resources")
sv(crop(45, (1041, 500, 1302, 662)), "vr-people")

# --- the water cycle (p. 38) with the empty label box marked "?" in red ---
X0, Y0 = 410, 600
im = crop(46, (X0, Y0, 670, 836))
im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
from PIL import ImageDraw  # noqa: E402

d = ImageDraw.Draw(im)
d.rectangle([0, 0, (465 - X0) * 2, (692 - Y0) * 2], fill="white")  # the answer lines of question 4
bx = ((590 - X0) * 2, (670 - Y0) * 2, (666 - X0) * 2, (694 - Y0) * 2)
d.rounded_rectangle(bx, radius=10, outline=RED, width=6, fill="white")
label(d, ((bx[0] + bx[2]) // 2, (bx[1] + bx[3]) // 2), "?", size=40)
sv(im, "water-cycle")

# --- a mesa: a hill with a flat top ---
im, d = canvas()
d.rectangle([0, 0, W, 330], fill=SKY)
d.rectangle([0, 330, W, H], fill=(225, 190, 130))
d.polygon([(170, 330), (250, 150), (470, 150), (550, 330)], fill=(200, 110, 70), outline=INK)
d.line([(250, 150), (470, 150)], fill=RED, width=10)
label(d, (360, 110), "flat top", size=36)
label(d, (360, 395), "mesa: a hill with a flat top", col=INK, size=30)
sv(im, "e-mesa")

# --- a flood plain: flat land along a river that floods ---
im, d = canvas()
d.rectangle([0, 0, W, 160], fill=SKY)
d.rectangle([0, 160, W, H], fill=GREEN)
d.polygon([(0, 160), (160, 160), (110, 440), (0, 440)], fill=BROWN)  # hills on both sides
d.polygon([(720, 160), (560, 160), (610, 440), (720, 440)], fill=BROWN)
d.rectangle([160, 230, 560, 380], fill=(150, 200, 240))  # the flooded plain (light blue)
d.rectangle([160, 230, 560, 380], outline=RED, width=7)
d.rectangle([310, 160, 410, H], fill=WATER)  # the river
label(d, (360, 120), "river", col=BLUE, size=32)
label(d, (360, 305), "flood plain", size=36)
label(d, (360, 415), "the river floods the flat land", col=INK, size=26)
sv(im, "e-flood-plain")

# word cards for question 1 (match each word to its definition): the picture and the word
from draw import word_card  # noqa: E402

L1 = "grade-4/social-studies/chapter-1/img/lesson-1"
for name, src, w in [
    ("w-flood-plain", os.path.join(OUT, "e-flood-plain.jpg"), "flood plain"),
    ("w-mesa", os.path.join(OUT, "e-mesa.jpg"), "mesa"),
    ("w-canyon", os.path.join(L1, "lf-canyon.jpg"), "canyon"),
    ("w-plateau", os.path.join(L1, "lf-plateau.jpg"), "plateau"),
]:
    im = Image.open(src)
    if "/e-" in src:  # our drawings: leave out the caption under the picture (it says the definition)
        im = im.crop((0, 0, im.width, 370))
    sv(word_card(im, w), name)
