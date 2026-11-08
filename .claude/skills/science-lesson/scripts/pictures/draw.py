# Helpers for the explanation pictures (720×440 JPEG): one idea per picture, the part that matters in red, a short label.
# Shown big beside a question and 180 px wide on an answer, so keep lines thick and words few.
import math
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 720, 440
INK, RED, BLUE, GRAY = (27, 36, 64), (220, 50, 40), (40, 110, 210), (170, 175, 190)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def font(size):
    return ImageFont.truetype(FONT, size)


def canvas(bg="white"):
    im = Image.new("RGB", (W, H), bg)
    return im, ImageDraw.Draw(im)


def arrow(d, a, b, col=RED, w=7, both=False, head=22):
    d.line([a, b], fill=col, width=w)
    for p, q in [(b, a)] + ([(a, b)] if both else []):
        ang = math.atan2(p[1] - q[1], p[0] - q[0])
        for s in (2.6, -2.6):
            d.line(
                [p, (p[0] + head * math.cos(ang + s), p[1] + head * math.sin(ang + s))],
                fill=col,
                width=w,
            )


def label(d, xy, t, col=RED, size=40, anchor="mm"):
    d.text(xy, t, fill=col, font=font(size), anchor=anchor, stroke_width=5, stroke_fill="white")


def save(im, out, name):
    im.save(os.path.join(out, name + ".jpg"), quality=88)
    print(name)
