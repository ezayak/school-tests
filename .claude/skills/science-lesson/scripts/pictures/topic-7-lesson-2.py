# Explanation pictures for Topic 7 Lesson 2 (outside parts of plants).
# Run from the repo root: python3 -I .claude/skills/science-lesson/scripts/pictures/topic-7-lesson-2.py
# Writes grade-4/science/topic-7/img/lesson-2/e-*.jpg.
import os
import sys

sys.dont_write_bytecode = True  # no __pycache__ next to draw.py
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from draw import BLUE, INK, RED, canvas, label, save  # noqa: E402

OUT = "grade-4/science/topic-7/img/lesson-2"
GREEN, LEAF, PINK, YEL = (60, 140, 70), (120, 190, 110), (245, 170, 200), (245, 200, 40)
sv = lambda im, n: save(im, OUT, n)


# a flower cut in half: stem, sepals, petals, stamens with pollen, the pistil with the ovary at its base
def flower(mark=None, text=None):
    im, d = canvas()
    hl = lambda part, col: RED if mark == part else col
    w = lambda part, n: n + 5 if mark == part else n
    cx, base = 360, 300
    d.line([(cx, base), (cx, 430)], fill=GREEN, width=14)  # stem
    # sepals: small green leaves under the flower
    for s in (-1, 1):
        sep = [(cx, base - 5), (cx + s * 150, base + 10), (cx + s * 60, base + 45)]
        d.polygon(sep, fill=(255, 205, 200) if mark == "sepal" else LEAF)
        d.line(sep + [sep[0]], fill=hl("sepal", GREEN), width=w("sepal", 3))
    # petals
    for s in (-1, 1):
        d.polygon([(cx + s * 20, base - 10), (cx + s * 230, base - 190), (cx + s * 200, base - 60)],
                  fill=(255, 205, 200) if mark == "petal" else PINK, outline=hl("petal", (200, 90, 140)))
        d.line([(cx + s * 20, base - 10), (cx + s * 230, base - 190), (cx + s * 200, base - 60), (cx + s * 20, base - 10)],
               fill=hl("petal", (200, 90, 140)), width=w("petal", 3))
    # stamens: stalks with pollen heads
    for s, h in ((-1, 170), (1, 170), (-1, 130), (1, 130)):
        x = cx + s * (60 if h == 170 else 95)
        d.line([(cx + s * 12, base - 20), (x, base - h)], fill=hl("stamen", (120, 110, 60)), width=w("stamen", 5))
        d.ellipse([x - 16, base - h - 12, x + 16, base - h + 12], fill=hl("pollen", YEL) if mark == "pollen" else YEL,
                  outline=hl("stamen", INK), width=w("stamen", 2))
    if mark == "pollen":
        for x, y in ((280, 70), (440, 70), (250, 110), (470, 110)):
            d.ellipse([x - 7, y - 7, x + 7, y + 7], fill=RED)
    # pistil: the middle stalk; the ovary is its round base
    d.line([(cx, base - 40), (cx, base - 190)], fill=hl("pistil", GREEN), width=w("pistil", 9))
    d.ellipse([cx - 20, base - 205, cx + 20, base - 180], fill=hl("pistil", GREEN))
    d.ellipse([cx - 36, base - 60, cx + 36, base], fill=(255, 210, 205) if mark == "ovary" else LEAF,
              outline=hl("ovary", hl("pistil", GREEN)), width=w("ovary", 4) + (3 if mark == "pistil" else 0))
    if text:
        label(d, (360, 30), text, size=34)
    return im


for part, text in [
    ("petal", "petals: colors call pollinators"),
    ("sepal", "sepal: wraps the bud"),
    ("stamen", "stamen: male, makes pollen"),
    ("pollen", "pollen: from the stamen"),
    ("pistil", "pistil: female, gets the pollen"),
    ("ovary", "ovary: inside the pistil"),
]:
    sv(flower(part, text), "e-flower-" + part)


# a leaf: the waxy cuticle keeps water in; the stomata let air in
def leaf(mark, text):
    im, d = canvas()
    pts = [(80, 220), (200, 110), (380, 80), (560, 120), (660, 220), (560, 320), (380, 360), (200, 330)]
    d.polygon(pts, fill=LEAF)
    d.line(pts + [pts[0]], fill=RED if mark == "cuticle" else GREEN, width=16 if mark == "cuticle" else 6)
    d.line([(80, 220), (660, 220)], fill=GREEN, width=6)
    if mark == "cuticle":
        for x, y in ((300, 180), (420, 260), (520, 190)):
            d.ellipse([x - 14, y - 20, x + 14, y + 16], fill=BLUE)
    if mark == "stomata":
        for x, y in ((260, 160), (400, 280), (500, 160), (300, 270)):
            d.ellipse([x - 22, y - 12, x + 22, y + 12], fill=(30, 90, 40), outline=RED, width=5)
    label(d, (360, 405), text, size=34)
    return im


sv(leaf("cuticle", "cuticle: a waxy coat, water stays in"), "e-cuticle")
sv(leaf("stomata", "stomata: tiny holes, air goes in"), "e-stomata")
