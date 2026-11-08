# Explanation pictures for Topic 3 Lesson 1 (waves): one idea per picture, the part that matters in red, a short label.
# Run from the repo root: python3 -I .claude/skills/science-lesson/scripts/pictures/topic-3-lesson-1.py
# Writes grade-4/science/topic-3/img/lesson-1/e-*.jpg (720×440: shown big beside a question and small on an answer).
import math
import os
from PIL import Image, ImageDraw, ImageFont

OUT = "grade-4/science/topic-3/img/lesson-1"
W, H = 720, 440
INK, RED, BLUE, GRAY = (27, 36, 64), (220, 50, 40), (40, 110, 210), (170, 175, 190)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
f = lambda s: ImageFont.truetype(FONT, s)


def canvas():
    im = Image.new("RGB", (W, H), "white")
    return im, ImageDraw.Draw(im)


def sine(x0, x1, ymid, amp, wl, phase=0.25):
    # phase 0.25: starts at a crest's left side, so the first crest is a quarter wave in
    return [
        (x, ymid - amp * math.sin(2 * math.pi * ((x - x0) / wl + phase - 0.25)))
        for x in range(int(x0), int(x1) + 1, 2)
    ]


def wave(d, x0=60, x1=660, ymid=230, amp=110, wl=300, w=7, col=INK):
    pts = sine(x0, x1, ymid, amp, wl)
    d.line(pts, fill=col, width=w, joint="curve")
    return pts


def rest(d, ymid=230, x0=40, x1=680):
    for x in range(x0, x1, 24):
        d.line([(x, ymid), (x + 12, ymid)], fill=GRAY, width=3)


def arrow(d, a, b, col=RED, w=7, both=False, head=22):
    d.line([a, b], fill=col, width=w)
    for p, q in [(b, a)] + ([(a, b)] if both else []):
        ang = math.atan2(p[1] - q[1], p[0] - q[0])
        for s in (2.6, -2.6):
            d.line([p, (p[0] + head * math.cos(ang + s), p[1] + head * math.sin(ang + s))], fill=col, width=w)


def label(d, xy, t, col=RED, size=40, anchor="mm"):
    d.text(xy, t, fill=col, font=f(size), anchor=anchor, stroke_width=5, stroke_fill="white")


def dot(d, x, y, r=13, col=RED):
    d.ellipse([x - r, y - r, x + r, y + r], fill=col)


def save(im, name):
    im.save(os.path.join(OUT, name + ".jpg"), quality=88)
    print(name)


# crests: x0 + wl/4 + k*wl; troughs: x0 + 3wl/4 + k*wl (wave() defaults)
X0, WL, YM, A = 60, 300, 230, 110
crests = [X0 + WL / 4 + k * WL for k in range(2)]
troughs = [X0 + 3 * WL / 4 + k * WL for k in range(2)]

im, d = canvas(); rest(d); wave(d)
for x in crests:
    dot(d, x, YM - A)
label(d, (360, 60), "crest = the top")
save(im, "e-crest")

im, d = canvas(); rest(d); wave(d)
for x in troughs:
    dot(d, x, YM + A)
label(d, (360, 400), "trough = the bottom")
save(im, "e-trough")

im, d = canvas(); rest(d); wave(d)
arrow(d, (crests[0], YM - 8), (crests[0], YM - A + 14), both=True)
label(d, (crests[0] - 15, YM + 45), "amplitude", size=36)
label(d, (560, YM + 30), "middle (rest)", col=GRAY, size=26)
save(im, "e-amplitude")

im, d = canvas(); rest(d); wave(d, ymid=260)
arrow(d, (crests[0], 110), (crests[1], 110), both=True)
for x in crests:
    d.line([(x, 120), (x, 260 - A)], fill=RED, width=3)
label(d, (360, 60), "wavelength")
save(im, "e-wavelength")

im, d = canvas(); rest(d); wave(d)
d.rectangle([X0, YM - A - 20, X0 + WL, YM + A + 20], outline=RED, width=5)
d.line(sine(X0, X0 + WL, YM, A, WL), fill=RED, width=9)
label(d, (X0 + WL / 2, 400), "1 complete wave")
save(im, "e-one-wave")

im, d = canvas(); rest(d); wave(d, wl=150, amp=100)
for k in range(4):
    label(d, (X0 + 150 / 4 + k * 150, 95), str(k + 1), col=BLUE, size=38)
label(d, (360, 400), "number of crests: 4", col=BLUE)
save(im, "e-count")


def freq(n, name, text):
    im, d = canvas()
    d.rounded_rectangle([40, 70, 680, 360], 20, outline=GRAY, width=4)
    rest(d, 215, 50, 670)
    wave(d, 50, 670, 215, 100, 620 / n)
    label(d, (360, 38), "in 1 second", col=INK, size=30)
    label(d, (360, 400), text)
    save(im, name)


freq(6, "e-freq-high", "many waves: high frequency")
freq(1.5, "e-freq-low", "few waves: low frequency")


def amp(a, name, text):
    im, d = canvas(); rest(d)
    wave(d, amp=a)
    label(d, (360, 405), text)
    save(im, name)


amp(150, "e-loud", "big amplitude = loud")
amp(35, "e-quiet", "small amplitude = quiet")

# transverse: particles up and down, the wave goes sideways
im, d = canvas(); rest(d, 210); wave(d, ymid=210, amp=80)
for x in (X0 + 20, X0 + 150, X0 + 380):
    y = sine(X0, X0 + 600, 210, 80, 300)[int((x - X0) / 2)][1]
    dot(d, x, y, 11)
    arrow(d, (x, y - 55), (x, y + 55), w=5, both=True, head=16)
arrow(d, (120, 375), (600, 375), col=BLUE, w=9)
label(d, (360, 345), "the wave moves this way", col=BLUE, size=28)
label(d, (360, 30), "particles: up and down", size=30)
save(im, "e-transverse")


def spring(d, y=210, h=90, gaps=None):
    # a spring seen from the side: vertical coils, close together (compression) or far apart (rarefaction)
    x = 50
    xs = []
    for g in gaps:
        d.line([(x, y - h), (x, y + h)], fill=INK, width=5)
        xs.append(x)
        x += g
    return xs


GAPS = [8] * 7 + [26] * 6 + [8] * 7 + [26] * 6 + [8] * 7
GAPS = [g * 1.1 for g in GAPS]


def long_pic(name, mark=None, text=None, arrows=False):
    im, d = canvas()
    xs = spring(d, gaps=GAPS)
    c1, r1, c2 = (xs[0] + xs[6]) / 2, (xs[7] + xs[12]) / 2, (xs[13] + xs[19]) / 2
    if mark == "comp":
        d.ellipse([c1 - 55, 95, c1 + 55, 325], outline=RED, width=7)
        d.ellipse([c2 - 55, 95, c2 + 55, 325], outline=RED, width=7)
    if mark == "rare":
        d.ellipse([r1 - 85, 95, r1 + 85, 325], outline=RED, width=7)
    if mark == "wl":
        arrow(d, (c1, 75), (c2, 75), both=True)
    if arrows:
        arrow(d, (150, 365), (330, 365), w=6, both=True, head=16)
        label(d, (240, 405), "particles: back and forth", size=24)
        arrow(d, (420, 375), (680, 375), col=BLUE, w=9)
        label(d, (550, 405), "the wave", col=BLUE, size=24)
    if text:
        label(d, (360, 40 if mark != "wl" else 30), text, size=36)
    save(im, name)


long_pic("e-longitudinal", text="squeeze and spread", arrows=True)
long_pic("e-compression", "comp", "compression = squeezed")
long_pic("e-rarefaction", "rare", "rarefaction = spread out")
long_pic("e-wavelength-long", "wl", "wavelength")

# perpendicular / parallel: the particles' arrow and the wave's arrow
im, d = canvas()
arrow(d, (120, 300), (620, 300), col=BLUE, w=10)
label(d, (440, 345), "wave", col=BLUE, size=32)
arrow(d, (250, 90), (250, 300 - 10), w=8, both=True)
label(d, (275, 140), "particles", anchor="lm", size=32)
d.rectangle([250, 260, 290, 300], outline=INK, width=4)
label(d, (360, 405), "perpendicular", col=INK, size=36)
save(im, "e-perpendicular")

im, d = canvas()
arrow(d, (120, 280), (620, 280), col=BLUE, w=10)
label(d, (370, 325), "wave", col=BLUE, size=32)
arrow(d, (180, 160), (460, 160), w=8, both=True)
label(d, (320, 110), "particles", size=32)
label(d, (360, 405), "parallel", col=INK, size=36)
save(im, "e-parallel")


# Armando's waves on graph paper: number of crests and height
def graph(name, n, h, text):
    im, d = canvas()
    for x in range(40, 690, 25):
        d.line([(x, 60), (x, 360)], fill=(225, 228, 235), width=2)
    for y in range(60, 361, 25):
        d.line([(40, y), (680, y)], fill=(225, 228, 235), width=2)
    wave(d, 40, 680, 210, h, 640 / n)
    label(d, (360, 405), text, col=INK, size=34)
    save(im, name)


graph("e-wave-t", 8, 60, "T: 8 crests · 10 cm high")
graph("e-wave-s", 8, 130, "S: 8 crests · 20 cm high")

# Q and R: the same number of crests, different heights → the height does not depend on the frequency
im, d = canvas()
rest(d, 100); wave(d, ymid=100, amp=35, wl=150)
rest(d, 290); wave(d, ymid=290, amp=75, wl=150)
label(d, (30, 30), "Q: 4 crests · 10 cm", col=INK, size=28, anchor="lm")
label(d, (30, 175), "R: 4 crests · 20 cm", col=INK, size=28, anchor="lm")
label(d, (360, 410), "same crests, not the same height", size=30)
save(im, "e-q-r")
