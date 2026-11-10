# Cover tiles for Arabic reading steps 4 and 5, in the style of the step 1-3 tiles (700x700, grid, ink cards).
import sys
from PIL import Image, ImageDraw, ImageFont
INK = (27, 36, 64)
FONT = "/usr/share/fonts/truetype/noto/NotoNaskhArabic-Bold.ttf"
H = "ًٌٍَُِّْ"

def base(bg, line):
    im = Image.new("RGB", (700, 700), bg)
    d = ImageDraw.Draw(im)
    for x in range(0, 701, 50):
        d.line([(x, 0), (x, 700)], fill=line, width=2)
        d.line([(0, x), (700, x)], fill=line, width=2)
    return im, d

def card(d, box, fill=(255, 255, 255), r=28):
    x0, y0, x1, y1 = box
    d.rounded_rectangle((x0 + 12, y0 + 12, x1 + 12, y1 + 12), r, fill=INK)
    d.rounded_rectangle(box, r, fill=fill, outline=INK, width=6)

def text(d, xy, s, size, color=INK, mark=None, anchor="mm"):
    """draw s; mark = (color, "harakat"): the harakat in that colour, or (color, n): the last n letters in that colour"""
    f = ImageFont.truetype(FONT, size, layout_engine=ImageFont.Layout.RAQM)
    if not mark:
        d.text(xy, s, font=f, fill=color, anchor=anchor, direction="rtl")
        return
    c, what = mark
    d.text(xy, s, font=f, fill=c, anchor=anchor, direction="rtl")
    if what == "harakat":  # the letters drawn again in ink: only the marks stay coloured
        d.text(xy, "".join(ch for ch in s if ch not in H), font=f, fill=INK, anchor=anchor, direction="rtl")
    else:  # all but the last letter in ink; a joiner keeps the letter before it in its joined shape
        head = s
        for _ in range(what):
            head = head.rstrip(H)[:-1]
        d.text(xy, head + "‍", font=f, fill=INK, anchor="rs" if anchor[0] == "r" else anchor, direction="rtl")

out = sys.argv[1]  # python3 .claude/scripts/arabic-reading-tiles.py <folder>: writes the <step>-tile.jpg files there
# step 4: sukun · يَلْ + عَبْ ▼ يَلْعَبْ (the sukun marks coloured)
im, d = base((228, 240, 251), (205, 222, 242))
BLUE = (52, 116, 207)
card(d, (360, 110, 610, 290)); text(d, (485, 215), "يَلْ", 120, mark=(BLUE, "harakat"))
card(d, (90, 110, 340, 290)); text(d, (215, 215), "عَبْ", 120, mark=(BLUE, "harakat"))
d.line([(334, 200), (366, 200)], fill=BLUE, width=9); d.line([(350, 184), (350, 216)], fill=BLUE, width=9)
d.polygon([(320, 315), (380, 315), (350, 365)], fill=BLUE)
card(d, (140, 390, 560, 590), fill=(255, 248, 230)); text(d, (350, 505), "يَلْعَبْ", 140, mark=(BLUE, "harakat"))
im.save(out + "/sukun-tile.jpg", quality=88)

# step 5: ta · بِنْت / كُرَة / مِيَاه, the last letter coloured
im, d = base((239, 232, 251), (222, 210, 244))
PUR = (138, 92, 201)
for i, w in enumerate(["بِنْت", "كُرَة", "مِيَاه"]):
    y = 100 + i * 180
    card(d, (135, 0 + y, 565, 145 + y))
    f = ImageFont.truetype(FONT, 100, layout_engine=ImageFont.Layout.RAQM)
    d.text((520, 105 + y), w, font=f, fill=PUR, anchor="rs", direction="rtl")
    head = w.rstrip(H)[:-1]
    d.text((520, 105 + y), head + "‍", font=f, fill=INK, anchor="rs", direction="rtl")
    d.polygon([(175, 72 + y), (215, 52 + y), (215, 92 + y)], fill=PUR)
    d.line([(212, 72 + y), (262, 72 + y)], fill=PUR, width=8)
im.save(out + "/ta-tile.jpg", quality=88)

def last_col(d, xy, w, size, c):
    """the word with its last letter (and its marks) in colour c, anchored right-baseline at xy"""
    f = ImageFont.truetype(FONT, size, layout_engine=ImageFont.Layout.RAQM)
    d.text(xy, w, font=f, fill=c, anchor="rs", direction="rtl")
    d.text(xy, w.rstrip(H)[:-1] + "‍", font=f, fill=INK, anchor="rs", direction="rtl")

def first_col(d, xy, w, size, c, n=1):
    """the word with its first n letters in colour c: draw in colour, then the rest in ink from a joiner"""
    f = ImageFont.truetype(FONT, size, layout_engine=ImageFont.Layout.RAQM)
    d.text(xy, w, font=f, fill=INK, anchor="rs", direction="rtl")
    # the first letters (with their marks) again in colour, followed by a joiner so they keep the joined shape
    i, k = 0, 0
    while i < len(w) and k < n:
        i += 1
        while i < len(w) and w[i] in H:
            i += 1
        k += 1
    d.text(xy, w[:i] + "‍", font=f, fill=c, anchor="rs", direction="rtl")

# step 6: shadda · دَرَّسَ ▼ دَرْ + رَسَ (the shadda coloured)
im, d = base((253, 236, 225), (246, 216, 196))
ORA = (232, 102, 26)
card(d, (140, 90, 560, 290), fill=(255, 248, 230)); text(d, (350, 200), "دَرَّسَ", 140, mark=(ORA, "harakat"))
d.polygon([(320, 315), (380, 315), (350, 365)], fill=ORA)
card(d, (360, 400, 610, 580)); text(d, (485, 500), "دَرْ", 120, mark=(ORA, "harakat"))
card(d, (90, 400, 340, 580)); text(d, (215, 500), "رَسَ", 120, mark=(ORA, "harakat"))
d.line([(334, 490), (366, 490)], fill=ORA, width=9); d.line([(350, 474), (350, 506)], fill=ORA, width=9)
im.save(out + "/shadda-tile.jpg", quality=88)

# step 7: tanween · بَابٌ / بَابٍ / بَابًا (the tanween coloured)
im, d = base((227, 244, 236), (200, 228, 214))
GRN = (28, 143, 78)
for i, w in enumerate(["بَابٌ", "بَابٍ", "بَابًا"]):
    x0 = 450 - i * 205
    card(d, (x0, 220, x0 + 190, 460))
    text(d, (x0 + 95, 345), w, 76, mark=(GRN, "harakat"))
im.save(out + "/tanween-tile.jpg", quality=88)

# step 8: sun and moon lam · ☀ الشَّمْسُ / ☾ الْقَمَرُ (the lam and the next letter's mark coloured)
im, d = base((255, 243, 214), (246, 226, 180))
SUN, MOON = (242, 183, 5), (52, 116, 207)
card(d, (120, 90, 600, 300)); text(d, (300, 210), "الشَّمْسُ", 110, mark=(ORA, "harakat"))
d.ellipse((475, 145, 565, 235), fill=SUN, outline=INK, width=5)
card(d, (120, 380, 600, 590)); text(d, (300, 500), "الْقَمَرُ", 110, mark=(MOON, "harakat"))
d.ellipse((475, 435, 565, 525), fill=(235, 240, 250), outline=INK, width=5)
d.ellipse((500, 425, 590, 515), fill=(255, 255, 255))
im.save(out + "/lam-tile.jpg", quality=88)

# step 9: hamza · أَخَذَ / ابْنٌ / عَلَى (أ, ا and ى coloured)
im, d = base((252, 230, 241), (244, 206, 225))
PINK = (214, 63, 150)
for i, (w, side) in enumerate([("أَخَذَ", 0), ("ابْنٌ", 0), ("عَلَى", 1)]):
    y = 100 + i * 180
    card(d, (135, y, 565, 145 + y))
    (last_col if side else first_col)(d, (520, 105 + y), w, 100, PINK)
im.save(out + "/hamza-tile.jpg", quality=88)

# step 10: sentences · a short sentence on a card, the words underlined one by one
im, d = base((239, 232, 251), (222, 210, 244))
card(d, (70, 170, 630, 530), fill=(255, 248, 230))
text(d, (350, 300), "عِنْدَ مُهَنَّدٍ", 96)
text(d, (350, 440), "لُعْبَةٌ جَدِيدَةٌ.", 96)
for y in (352, 492):
    d.line([(130, y), (570, y)], fill=PUR, width=6)
im.save(out + "/sentences-tile.jpg", quality=88)
