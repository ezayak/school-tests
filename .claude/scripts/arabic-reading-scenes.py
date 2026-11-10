# Emoji scene pictures (700x420) for the texts of Arabic reading step 10.
from PIL import Image, ImageDraw, ImageFont
F = ImageFont.truetype("/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf", 109)
OUT = "/home/olena/projects/school-tests/arabic-reading/img/sentences/"
INK = (27, 36, 64)
def emoji(e, size):
    im = Image.new("RGBA", (160, 160), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((10, 10), e, font=F, embedded_color=True)
    im = im.crop(im.getbbox())
    r = size / max(im.size)
    return im.resize((int(im.width * r), int(im.height * r)), Image.LANCZOS)
def scene(name, items, sky=(228, 240, 251), ground=(198, 219, 174)):
    im = Image.new("RGB", (700, 420), sky)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 300, 700, 420), fill=ground)
    n = len(items); size = 190 if n <= 2 else 160 if n == 3 else 135
    gap = (700 - n * size) / (n + 1)
    for i, e in enumerate(items):  # right to left, like the Arabic sentence
        e_im = emoji(e, size)
        x = int(700 - gap * (i + 1) - size * (i + 1) + (size - e_im.width) / 2)
        y = int(310 - e_im.height)
        im.paste(e_im, (x, y), e_im)
    d.rectangle((0, 0, 699, 419), outline=INK, width=4)
    im.save(OUT + name + ".jpg", quality=85)
S = {
    "sellers": ["🧑", "🛒", "🍊"],
    "rabbit": ["🐇", "😱", "💨"],
    "toy": ["👦", "🎁", "🐇", "☂️"],
    "shelf": ["🧸", "🚗", "🪀", "🧹"],
    "friday": ["👦", "🚗", "🚂", "⚽"],
    "neighbour": ["👦", "⚽", "👶", "😢"],
    "thanks": ["👶", "🙏", "⚽"],
    "sara-car": ["👧", "🚗", "😟"],
    "sara-school": ["👩‍🏫", "👧", "😊", "🏫"],
    "neighbours": ["🏠", "❤️", "🏠"],
    "trader": ["🧔", "🏪", "🤝"],
    "roses": ["🌹", "👃", "✨"],
    "reader": ["🧑‍🎓", "📖", "🏆"],
    "farmer": ["🧑‍🌾", "🌾"],
    "prevention": ["🧼", "🛡️", "💊"],
    "food": ["🥗", "🍎", "💪"],
    "egypt": ["🐫", "🏛️", "🇪🇬"],
}
for k, v in S.items():
    scene(k, v)
print(len(S))
