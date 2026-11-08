# Pictures for Social Studies Chapter 1 Lesson 4 « People and the Land » (book pp. 28–33) and the story « Marjory Stoneman Douglas » (p. 36).
# Run from the repo root: python3 -I .claude/skills/social-studies-lesson/scripts/pictures/chapter-1-lesson-4.py
# Writes grade-4/social-studies/chapter-1/img/lesson-4/*.jpg and img/douglas/*.jpg:
#   book crops (the book is scanned as two-page spreads, 1368×858: spread n = pages 2(n−27) and 2(n−27)+1),
#   the booklet's irrigation drawing (Term 2 booklet p. 6), and e-*.jpg explanation drawings (720×440, draw.py from the Science skill).
import os
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "../../../science-lesson/scripts/pictures"))
from PIL import Image  # noqa: E402
from draw import BLUE, GRAY, H, INK, RED, W, arrow, canvas, label, save  # noqa: E402

DOCS = os.path.expanduser("~/Documents/2026-2027/Alex/S.S.English")
BOOK = os.path.join(DOCS, "book")
BOOKLET = os.path.join(DOCS, "20261105-G4- Social Studies - Term Two.pdf")
OUT = "grade-4/social-studies/chapter-1/img/lesson-4"
STORY = "grade-4/social-studies/chapter-1/img/douglas"
os.makedirs(OUT, exist_ok=True)
os.makedirs(STORY, exist_ok=True)
sv = lambda im, n: save(im, OUT, n)
GREEN, BROWN, SKY, WATER = (60, 150, 60), (150, 105, 60), (215, 235, 250), (70, 150, 230)


def crop(spread, box, out, name, width=None):
    im = Image.open(os.path.join(BOOK, f"{spread:03d}.png")).convert("RGB").crop(box)
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    save(im, out, name)


# --- book crops (coordinates on the 1368×858 spread) ---
crop(41, (90, 585, 482, 812), OUT, "mountain-home")  # p. 28: a home on the side of a mountain
crop(41, (752, 655, 1306, 810), OUT, "stilts")  # p. 29: beach houses on stilts
crop(42, (225, 22, 651, 266), OUT, "bulldozer")  # p. 30: clearing land with heavy machines
crop(42, (1083, 52, 1306, 440), OUT, "ogallala-map")  # p. 31: the Ogallala Aquifer map
crop(42, (760, 660, 1300, 810), OUT, "pivot")  # p. 31: irrigation with water from the aquifer
crop(43, (54, 462, 640, 812), OUT, "wind-turbines")  # p. 32: wind turbines
crop(45, (58, 152, 246, 390), STORY, "douglas")  # p. 36: Marjory Stoneman Douglas in the Everglades
crop(45, (96, 600, 252, 812), STORY, "everglades")  # p. 36: water lilies in the Everglades

# --- the booklet's irrigation drawing (p. 6) ---
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(["pdftoppm", "-r", "150", "-f", "6", "-l", "6", "-png", BOOKLET, os.path.join(tmp, "p")], check=True)
    page = Image.open(os.path.join(tmp, os.listdir(tmp)[0])).convert("RGB")
    save(page.crop((90, 140, 905, 610)), OUT, "irrigation-drawing")


# --- explanation drawings ---
def ground(d, y=300):
    d.rectangle([0, 0, W, y], fill=SKY)
    d.rectangle([0, y, W, H], fill=(205, 170, 120))


def house(d, x, y, w, h, roof):
    """A house with its bottom-left corner at (x, y); roof = height of the roof."""
    d.rectangle([x, y - h, x + w, y], fill=(250, 240, 220), outline=INK, width=5)
    d.rectangle([x + w // 2 - 18, y - 60, x + w // 2 + 18, y], fill=BROWN, outline=INK, width=4)
    d.polygon([(x - 15, y - h), (x + w // 2, y - h - roof), (x + w + 15, y - h)], fill=(180, 60, 50), outline=INK)
    return y - h - roof


# a steep roof: snow slides off; a flat roof: the snow stays on top
im, d = canvas()
ground(d, 380)
top = house(d, 80, 380, 200, 120, 150)
d.line([(165, top + 20), (180, top + 8)], fill="white", width=14)
for k in range(4):  # snow sliding down
    d.ellipse([290 + k * 14, 150 + k * 40, 312 + k * 14, 172 + k * 40], fill="white", outline=GRAY, width=2)
arrow(d, (215, 120), (320, 250), col=RED, w=8)
d.rectangle([440, 200, 660, 380], fill=(250, 240, 220), outline=INK, width=5)
d.rectangle([425, 185, 675, 200], fill=(180, 60, 50), outline=INK, width=3)
d.rounded_rectangle([425, 135, 675, 188], radius=25, fill="white", outline=GRAY, width=3)  # heavy snow stays
for x, y in [(100, 40), (300, 60), (500, 30), (620, 80), (400, 90), (200, 70)]:
    d.ellipse([x, y, x + 14, y + 14], fill="white", outline=GRAY)  # snowflakes
label(d, (180, 415), "steep: snow slides off", size=26)
label(d, (550, 415), "flat: snow stays", col=INK, size=26)
sv(im, "e-roof")

# a skyway: a glass tunnel between two buildings, high above the snowy street
im, d = canvas()
d.rectangle([0, 0, W, H], fill=(200, 215, 235))
d.rectangle([0, 380, W, H], fill="white")
for x0 in (40, 480):
    d.rectangle([x0, 60, x0 + 200, 380], fill=(150, 160, 185), outline=INK, width=5)
    for wy in range(90, 360, 50):
        for wx in (x0 + 25, x0 + 85, x0 + 145):
            d.rectangle([wx, wy, wx + 30, wy + 28], fill=(240, 240, 200))
d.rectangle([240, 170, 480, 240], fill=(190, 230, 250), outline=RED, width=8)  # the glass tunnel
for px in (300, 400):  # people walking inside, warm
    d.ellipse([px - 10, 185, px + 10, 205], fill=INK)
    d.line([(px, 205), (px, 232)], fill=INK, width=6)
arrow(d, (290, 255), (430, 255), col=RED, w=6, head=16)
for x, y in [(260, 300), (330, 330), (420, 290), (450, 350), (290, 360), (380, 120), (300, 90)]:
    d.ellipse([x, y, x + 12, y + 12], fill="white", outline=GRAY)
label(d, (360, 140), "skyway", size=40)
label(d, (360, 415), "walk inside, out of the cold", col=INK, size=28)
sv(im, "e-skyway")

# an aquifer: a layer of rock under the ground that holds water; a pump brings it up to the crops
im, d = canvas()
d.rectangle([0, 0, W, 150], fill=SKY)
d.rectangle([0, 150, W, 230], fill=(170, 120, 70))  # soil
d.rectangle([0, 230, W, 360], fill=(200, 200, 205))  # porous rock with water
for x in range(20, W, 40):
    for y in (255, 295, 335):
        d.ellipse([x + (y % 20), y - 9, x + (y % 20) + 18, y + 9], fill=WATER)
d.rectangle([0, 360, W, H], fill=(120, 110, 105))  # hard rock below
d.rectangle([0, 230, W - 2, 360], outline=RED, width=7)
for x in range(330, 700, 45):  # crops
    d.line([(x, 150), (x, 110)], fill=GREEN, width=6)
    d.ellipse([x - 14, 92, x + 14, 116], fill=GREEN)
d.rectangle([140, 80, 200, 150], fill=GRAY, outline=INK, width=4)  # pump
d.line([(170, 150), (170, 300)], fill=INK, width=12)
arrow(d, (230, 280), (230, 170), col=BLUE, w=8)
d.line([(200, 100), (320, 100)], fill=BLUE, width=8)
label(d, (110, 40), "pump", col=INK, size=30)
label(d, (480, 40), "crops", col=GREEN, size=30)
label(d, (470, 295), "aquifer: water in the rock", size=32)
label(d, (360, 190), "soil", col=INK, size=26)
sv(im, "e-aquifer")

# open ditches lose water to the sun (evaporation); tunnels under the ground keep it
im, d = canvas()
d.rectangle([0, 0, W, 220], fill=SKY)
d.rectangle([0, 220, W, H], fill=(200, 165, 115))
d.line([(360, 0), (360, H)], fill=INK, width=4)
d.ellipse([40, 20, 120, 100], fill=(250, 200, 40))  # sun
d.polygon([(60, 220), (300, 220), (270, 260), (90, 260)], fill=WATER)  # open ditch
for x in (110, 170, 230):
    arrow(d, (x, 210), (x, 120), col=RED, w=6, head=16)
d.rounded_rectangle([400, 290, 690, 340], radius=22, fill=WATER, outline=INK, width=5)  # tunnel
arrow(d, (430, 315), (660, 315), col="white", w=6, head=16)
label(d, (180, 330), "ditch: water is lost", size=26)
label(d, (545, 390), "tunnel: water is saved", col=GREEN, size=26)
sv(im, "e-tunnel")

# a scrubber cleans the dirty air from a factory before it goes out
im, d = canvas()
d.rectangle([0, 0, W, H], fill=SKY)
d.rectangle([0, 360, W, H], fill=(160, 190, 130))
d.rectangle([30, 220, 230, 360], fill=(170, 170, 180), outline=INK, width=5)  # factory
d.rectangle([60, 140, 100, 220], fill=(150, 150, 160), outline=INK, width=4)
for x, y in [(70, 105), (95, 75), (130, 55)]:  # dirty smoke
    d.ellipse([x, y, x + 50, y + 40], fill=(90, 90, 95))
d.line([(230, 290), (330, 290)], fill=INK, width=14)
d.rectangle([330, 170, 450, 360], fill="white", outline=RED, width=8)  # scrubber
for y in range(200, 340, 30):
    d.line([(355, y), (425, y + 12)], fill=BLUE, width=4)
d.rectangle([450, 120, 490, 200], fill=(150, 150, 160), outline=INK, width=4)
for x, y in [(470, 80), (510, 50)]:  # clean air
    d.ellipse([x, y, x + 46, y + 36], fill="white", outline=GRAY, width=2)
label(d, (390, 395), "scrubber", size=34)
label(d, (130, 395), "factory", col=INK, size=28)
label(d, (600, 120), "clean air", col=GREEN, size=28)
sv(im, "e-scrubber")

# water treatment: river → plant → clean water to homes → wastewater → plant → back into the river
im, d = canvas()
d.rectangle([0, 0, W, H], fill="white")
d.rectangle([0, 340, W, H], fill=WATER)
label(d, (360, 400), "river", col=INK, size=34)
for x0, t in ((40, "clean"), (520, "clean")):
    d.rectangle([x0, 170, x0 + 160, 290], fill=(220, 235, 245), outline=RED, width=7)
    d.ellipse([x0 + 30, 200, x0 + 130, 270], fill=WATER, outline=INK, width=3)
house(d, 290, 170, 140, 90, 50)
arrow(d, (120, 340), (120, 295), col=BLUE, w=8, head=18)
arrow(d, (205, 140), (285, 140), col=BLUE, w=8, head=18)
arrow(d, (435, 140), (515, 140), col=BROWN, w=8, head=18)
arrow(d, (600, 295), (600, 340), col=BLUE, w=8, head=18)
label(d, (120, 120), "treatment", size=24)
label(d, (600, 120), "treatment", size=24)
label(d, (245, 105), "clean", col=BLUE, size=22)
label(d, (475, 105), "dirty", col=BROWN, size=22)
label(d, (360, 30), "water is cleaned before and after we use it", col=INK, size=22)
sv(im, "e-treatment")
