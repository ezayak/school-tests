# Pictures for Social Studies Chapter 2 Lesson 2 « A New Nation » (book pp. 56–61) and its stories (The American Revolution, Lewis and Clark).
# Run from the repo root: python3 -I .claude/skills/social-studies-lesson/scripts/pictures/chapter-2-lesson-2.py
# Writes grade-4/social-studies/chapter-2/img/lesson-2/*.jpg: book crops (spread n = pages 2(n−28), 2(n−28)+1), the booklet's
# First Continental Congress drawing (Term 2 booklet p. 12), and drawings (draw.py from the Science skill): timelines, the Senate and
# the House, the American flag (booklet p. 13), word cards.
import os
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "../../../science-lesson/scripts/pictures"))
from PIL import Image  # noqa: E402
from draw import BLUE, GRAY, H, INK, RED, W, canvas, emoji, font, label, save  # noqa: E402

DOCS = os.path.expanduser("~/Documents/2026-2027/Alex/S.S.English")
BOOK = os.path.join(DOCS, "book")
BOOKLET = os.path.join(DOCS, "20261105-G4- Social Studies - Term Two.pdf")
OUT = "grade-4/social-studies/chapter-2/img/lesson-2"
os.makedirs(OUT, exist_ok=True)
sv = lambda im, n: save(im, OUT, n)


def crop(spread, box, name):
    sv(Image.open(os.path.join(BOOK, f"{spread:03d}.png")).convert("RGB").crop(box), name)


# --- book crops (coordinates on the 1368×858 spread) ---
crop(56, (58, 585, 650, 812), "washington-army")  # p. 56: Washington leads the Americans (the caption box left out)
crop(57, (58, 38, 284, 365), "shays")  # p. 58: Shays' Rebellion
crop(57, (1138, 155, 1316, 358), "madison")  # p. 59: James Madison
crop(57, (1098, 468, 1306, 662), "first-amendment")  # p. 59: The First Amendment box
crop(58, (57, 450, 655, 812), "map-1804")  # p. 60: The United States, 1804 (Louisiana Purchase, Lewis and Clark)

# --- the booklet's First Continental Congress drawing (p. 12) ---
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(["pdftoppm", "-r", "150", "-f", "12", "-l", "12", "-png", BOOKLET, os.path.join(tmp, "p")], check=True)
    page = Image.open(os.path.join(tmp, os.listdir(tmp)[0])).convert("RGB")
    sv(page.crop((96, 276, 1147, 1322)).resize((700, 697), Image.LANCZOS), "congress")


# --- timelines ---
def timeline(points, name, title):
    im, d = canvas()
    label(d, (W // 2, 40), title, col=INK, size=30)
    d.line([(30, 220), (690, 220)], fill=INK, width=8)
    step = 660 // len(points)
    for k, (year, t1, t2, e) in enumerate(points):
        x = 30 + step // 2 + k * step
        emoji(im, (x, 125), e, 64)
        d.ellipse([x - 15, 205, x + 15, 235], fill=RED, outline=INK, width=4)
        label(d, (x, 275), year, size=34)
        d.text((x, 330), t1, fill=INK, font=font(18), anchor="mm")
        d.text((x, 358), t2, fill=INK, font=font(18), anchor="mm")
    sv(im, name)


timeline(
    [
        ("1775", "War", "begins", "⚔️"),
        ("1776", "Declaration", "", "📜"),
        ("1777", "Saratoga", "", "🎖️"),
        ("1781", "Yorktown", "", "🏆"),
        ("1783", "War", "ends", "🕊️"),
    ],
    "e-timeline-war",
    "The American Revolution",
)
timeline(
    [
        ("1781", "Articles", "", "🤝"),
        ("1786", "Shays", "", "😠"),
        ("1787", "Constitution", "", "📜"),
        ("1789", "President", "Washington", "🇺🇸"),
        ("1803", "Louisiana", "", "🗺️"),
    ],
    "e-timeline-nation",
    "A new nation",
)

# --- the compromise: the Senate (2 for every state) and the House (more for a big state) ---
im, d = canvas()
d.line([(360, 20), (360, 420)], fill=GRAY, width=4)
label(d, (180, 40), "Senate", size=40)
label(d, (540, 40), "House", col=BLUE, size=40)
for cx, people, side in ((180, (2, 2), "same"), (540, (1, 4), "pop")):
    for row, (state, n) in enumerate(zip(("small state", "big state"), people)):
        y = 140 + row * 150
        d.text((cx, y), state, fill=INK, font=font(24), anchor="mm")
        emoji(im, (cx, y + 60), "🧑" * n, 64)
label(d, (180, 420), "2 for every state", size=24)
label(d, (540, 420), "more people, more seats", col=BLUE, size=24)
sv(im, "e-senate-house")

# --- the American flag (booklet p. 13): 13 stripes, 7 red and 6 white; 50 stars on blue ---
im, d = canvas()
X0, Y0, FW, FH = 60, 40, 600, 360
for k in range(13):
    d.rectangle([X0, Y0 + k * FH / 13, X0 + FW, Y0 + (k + 1) * FH / 13], fill=(178, 34, 52) if k % 2 == 0 else "white")
d.rectangle([X0, Y0, X0 + 240, Y0 + 7 * FH / 13], fill=(60, 59, 110))
for r in range(9):
    for c in range(6 if r % 2 == 0 else 5):
        x = X0 + 20 + c * 40 + (20 if r % 2 else 0)
        y = Y0 + 12 + r * 20.5
        d.regular_polygon((x, y, 7), 5, fill="white")
d.rectangle([X0, Y0, X0 + FW, Y0 + FH], outline=INK, width=4)
sv(im, "e-flag")
