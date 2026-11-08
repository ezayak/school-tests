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


EMOJI = "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf"


def emoji(im, xy, t, size=120):
    """Colour emoji t centred at xy, about size px high (Noto Color Emoji is drawn at 109 px, then scaled)."""
    f = ImageFont.truetype(EMOJI, 109)
    w = round(f.getlength(t)) + 20
    e = Image.new("RGBA", (w, 140), (0, 0, 0, 0))
    ImageDraw.Draw(e).text((10, 10), t, font=f, embedded_color=True)
    e = e.crop(e.getbbox())
    e = e.resize((round(e.width * size / e.height), size), Image.LANCZOS)
    im.paste(e, (xy[0] - e.width // 2, xy[1] - e.height // 2), e)


def two_pictures(left, right, labels, cols=(INK, INK)):
    """Two pictures side by side (a PIL image or an emoji string each), a label above each: 'then / now' cards."""
    im, d = canvas()
    for k, (p, t, c) in enumerate(zip((left, right), labels, cols)):
        cx = 180 + k * 360
        if isinstance(p, str):
            emoji(im, (cx, 250), p, 150)
        else:
            p = p.copy()
            p.thumbnail((340, 340), Image.LANCZOS)
            if p.height < 300:  # small book photos: enlarge to fill the half
                s = min(340 / p.width, 340 / p.height)
                p = p.resize((round(p.width * s), round(p.height * s)), Image.LANCZOS)
            im.paste(p, (cx - p.width // 2, 250 - p.height // 2 + 15))
        label(d, (cx, 40), t, col=c, size=30)
    d.line([(360, 80), (360, 420)], fill=GRAY, width=4)
    return im


def word_card(p, word):
    """A match card: the picture (a PIL image or an emoji string) big on top, the word in big letters under it
    (a picture strip in a match shows the picture too small)."""
    im, d = canvas()
    if isinstance(p, str):
        emoji(im, (W // 2, 170), p, 220)
    else:
        p = p.convert("RGB")
        s = min(700 / p.width, 330 / p.height)
        p = p.resize((round(p.width * s), round(p.height * s)), Image.LANCZOS)
        im.paste(p, ((W - p.width) // 2, 10 + (330 - p.height) // 2))
    d.text((W // 2, 392), word, fill=INK, font=font(56), anchor="mm")
    return im
