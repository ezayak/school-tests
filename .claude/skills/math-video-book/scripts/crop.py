# Crop a picture (the Be Curious photo, a book drawing) from a frame into a lesson's img folder, as .jpg.
# Usage: python3 -I crop.py <frame.png> <out.jpg> x0 y0 x1 y1   (pixels of the frame, 1191 × 881)
import sys
from PIL import Image

f, out = sys.argv[1], sys.argv[2]
box = tuple(int(v) for v in sys.argv[3:7])
im = Image.open(f).convert("RGB").crop(box)
im.save(out, quality=85)
print(out, im.size)
