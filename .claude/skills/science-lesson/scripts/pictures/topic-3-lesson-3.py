# Explanation pictures for Topic 3 Lesson 3 (light and the eye).
# Run from the repo root: python3 -I .claude/skills/science-lesson/scripts/pictures/topic-3-lesson-3.py
# Writes grade-4/science/topic-3/img/lesson-3/e-*.jpg.
import os
import sys

sys.dont_write_bytecode = True  # no __pycache__ next to draw.py
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from draw import BLUE, GRAY, H, INK, RED, W, arrow, canvas, label, save  # noqa: E402

OUT = "grade-4/science/topic-3/img/lesson-3"
YEL = (245, 190, 30)
sv = lambda im, n: save(im, OUT, n)


# --- the eye from the side: light comes in from the left ---
def eye_side(mark=None, text=None):
    im, d = canvas()
    cx, cy, r = 330, 215, 150
    hit = lambda part: RED if mark == part else INK
    # optic nerve to the brain (right)
    d.polygon([(cx + r - 10, cy - 22), (680, cy - 40), (680, cy + 4), (cx + r - 10, cy + 22)],
              fill=(255, 220, 215) if mark == "nerve" else (230, 232, 240), outline=hit("nerve"))
    d.line([(cx + r - 10, cy - 22), (680, cy - 40)], fill=hit("nerve"), width=6)
    d.line([(cx + r - 10, cy + 22), (680, cy + 4)], fill=hit("nerve"), width=6)
    # eyeball
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(245, 246, 250), outline=INK, width=6)
    # retina: the back of the eye
    d.arc([cx - r + 12, cy - r + 12, cx + r - 12, cy + r - 12], -70, 70,
          fill=hit("retina"), width=16 if mark == "retina" else 8)
    # iris (two short walls) with the pupil (the gap) between them
    for y0, y1 in ((cy - 95, cy - 32), (cy + 32, cy + 95)):
        d.line([(cx - r + 30, y0), (cx - r + 30, y1)], fill=hit("iris"), width=16 if mark == "iris" else 10)
    if mark == "pupil":
        d.ellipse([cx - r + 14, cy - 30, cx - r + 46, cy + 30], outline=RED, width=7)
    # lens: behind the pupil
    lw = 8 if mark == "lens" else 5
    d.ellipse([cx - r + 45, cy - 55, cx - r + 95, cy + 55],
              fill=(255, 220, 215) if mark == "lens" else "white", outline=hit("lens"), width=lw)
    # light coming in
    for dy in (-18, 0, 18):
        arrow(d, (20, cy + dy * 3), (cx - r + 20, cy + dy), col=YEL, w=5, head=14)
    if text:
        label(d, (360, 410), text)
    return im


for part, text in [
    ("pupil", "pupil: the hole that lets light in"),
    ("lens", "lens: focuses the light"),
    ("retina", "retina: gets the picture"),
    ("nerve", "optic nerve: to the brain"),
]:
    sv(eye_side(part, text), "e-eye-" + part)


# --- the eye from the front: iris and pupil ---
def eye_front(pupil, mark=None, text=None):
    im, d = canvas()
    cx, cy = 360, 200
    d.ellipse([cx - 250, cy - 130, cx + 250, cy + 130], fill="white", outline=INK, width=6)
    d.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], fill=(90, 150, 110),
              outline=RED if mark == "iris" else INK, width=10 if mark == "iris" else 4)
    d.ellipse([cx - pupil, cy - pupil, cx + pupil, cy + pupil], fill=(10, 10, 10),
              outline=RED if mark == "pupil" else None, width=8)
    if text:
        label(d, (360, 400), text)
    return im


sv(eye_front(80, text="big pupil: more light in"), "e-pupil-big")
sv(eye_front(22, text="small pupil: less light in"), "e-pupil-small")
sv(eye_front(45, "pupil", "pupil = the black hole"), "e-front-pupil")
sv(eye_front(45, "iris", "iris = the colored ring"), "e-front-iris")


# --- light: rays, reflect, refract, absorb ---
def bulb(d, x, y):
    d.ellipse([x - 45, y - 45, x + 45, y + 45], fill=YEL, outline=INK, width=4)


im, d = canvas()
bulb(d, 90, 200)
for k in range(-2, 3):
    arrow(d, (150, 200 + k * 30), (660, 200 + k * 75), col=(220, 150, 0), w=7)
label(d, (400, 405), "rays: straight lines")
sv(im, "e-rays")

im, d = canvas()
bulb(d, 90, 200)
import math  # noqa: E402

for k in (-1, 0, 1):
    pts = [(150 + t, 200 + k * 90 + 30 * math.sin(t / 40)) for t in range(0, 500, 4)]
    d.line(pts, fill=GRAY, width=7)
label(d, (400, 405), "curved lines", col=INK)
sv(im, "e-curved")

im, d = canvas()
d.rectangle([60, 300, 660, 330], fill=(190, 200, 215), outline=INK, width=4)
label(d, (360, 360), "mirror", col=INK, size=30)
arrow(d, (120, 60), (360, 296), col=(220, 150, 0), w=9)
arrow(d, (360, 296), (600, 60), col=RED, w=9)
label(d, (360, 40), "reflect = bounce")
sv(im, "e-reflect")

im, d = canvas()
d.rectangle([0, 220, W, H], fill=(190, 220, 245))
label(d, (640, 250), "water", col=BLUE, size=28)
label(d, (640, 190), "air", col=INK, size=28)
arrow(d, (110, 40), (330, 220), col=(220, 150, 0), w=9)
arrow(d, (330, 220), (420, 410), col=RED, w=9)
d.line([(330, 220), (510, 367)], fill=GRAY, width=3)
label(d, (220, 300), "refract = bend", size=36)
sv(im, "e-refract")

im, d = canvas()
d.rectangle([420, 90, 640, 340], fill=(25, 25, 25))
arrow(d, (60, 215), (415, 215), col=(220, 150, 0), w=9)
label(d, (530, 380), "absorb = take in", size=36)
label(d, (230, 160), "no light comes out", col=INK, size=26)
sv(im, "e-absorb")

# white light through a prism → all the colors of the rainbow
im, d = canvas()
d.polygon([(330, 70), (230, 330), (430, 330)], fill=(225, 235, 245), outline=INK)
d.line([(330, 70), (230, 330), (430, 330), (330, 70)], fill=INK, width=5)
d.line([(30, 230), (282, 200)], fill=INK, width=22)
d.line([(30, 230), (282, 200)], fill=(255, 255, 255), width=14)
rainbow = [(230, 40, 40), (245, 140, 20), (245, 210, 20), (40, 170, 70), (40, 110, 210), (75, 0, 130), (140, 60, 200)]
for k, c in enumerate(rainbow):
    d.line([(380, 205 + k * 4), (700, 150 + k * 32)], fill=c, width=9)
label(d, (150, 300), "white light", col=INK, size=30)
label(d, (360, 410), "all the colors of the rainbow")
sv(im, "e-white-light")

# the visible light: a rainbow bar from 380 to 780 nanometers
im, d = canvas()
for x in range(60, 661):
    t = (x - 60) / 600
    k = t * (len(rainbow) - 1)
    a, b = rainbow[int(k)], rainbow[min(int(k) + 1, len(rainbow) - 1)]
    f = k - int(k)
    d.line([(x, 150), (x, 260)], fill=tuple(int(a[i] + (b[i] - a[i]) * f) for i in range(3)))
d.rectangle([60, 150, 660, 260], outline=INK, width=4)
label(d, (60, 300), "780", col=INK, size=40, anchor="mm")
label(d, (660, 300), "380", col=INK, size=40, anchor="mm")
label(d, (360, 90), "visible light", col=INK, size=36)
label(d, (360, 390), "380 to 780 nanometers")
sv(im, "e-visible")

# shapes: rectangle, square
for name, box in (("e-rectangle", [140, 120, 580, 320]), ("e-square", [260, 120, 460, 320])):
    im, d = canvas()
    d.rectangle(box, fill=(225, 235, 245), outline=INK, width=8)
    label(d, (360, 390), name[2:], col=INK)
    sv(im, name)


# Cody's samples Q, R, S, T
def sample(name, text, drawfn):
    im, d = canvas()
    drawfn(d)
    label(d, (360, 400), text, col=INK, size=32)
    sv(im, name)


sample("e-sample-q", "Q: round, transparent, colorless",
       lambda d: (d.ellipse([240, 50, 480, 290], fill=(235, 245, 255), outline=(120, 160, 200), width=6),
                  d.ellipse([290, 90, 340, 140], fill="white")))
sample("e-sample-r", "R: rectangle, opaque, shiny",
       lambda d: (d.rectangle([170, 90, 550, 280], fill=(170, 175, 185), outline=INK, width=5),
                  d.polygon([(200, 110), (260, 110), (200, 200)], fill=(240, 242, 248))))
sample("e-sample-s", "S: round, opaque, rough, dull",
       lambda d: (d.ellipse([240, 50, 480, 290], fill=(130, 95, 70), outline=INK, width=5),
                  [d.ellipse([x, y, x + 14, y + 14], fill=(90, 60, 45)) for x, y in
                   ((290, 120), (350, 90), (400, 160), (320, 210), (420, 230), (300, 170), (380, 120))]))
sample("e-sample-t", "T: cube, transparent, green",
       lambda d: (d.polygon([(260, 110), (320, 60), (500, 60), (440, 110)], fill=(170, 230, 180), outline=(40, 140, 60)),
                  d.polygon([(440, 110), (500, 60), (500, 240), (440, 290)], fill=(140, 210, 150), outline=(40, 140, 60)),
                  d.rectangle([260, 110, 440, 290], fill=(190, 240, 200), outline=(40, 140, 60), width=5)))

# light goes through a transparent thing and bends; bounces off a shiny one
im, d = canvas()
d.rectangle([300, 80, 420, 360], fill=(215, 235, 255), outline=(120, 160, 200), width=5)
arrow(d, (40, 120), (300, 200), col=(220, 150, 0), w=9)
d.line([(300, 200), (420, 260)], fill=RED, width=9)
arrow(d, (420, 260), (680, 340), col=(220, 150, 0), w=9)
label(d, (360, 410), "light goes through and bends")
sv(im, "e-through")
