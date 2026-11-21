#!/usr/bin/env python3
"""Get new teacher files ready to read cheaply: contact sheets, page text, video frames.

  prep.py [--ocr ara] <file>...   one folder per file in ~/.cache/school-inbox/ (path as in ~/Documents/2026-2027)
  inbox.py prep <subject>    the same for every new file of a subject (the usual way)

Per file:
  PDF    sheet-1.jpg, sheet-2.jpg … (12 numbered page thumbnails each), pages/p-N.jpg (one per page, for the sorting page),
         text.txt (the text layer, "=== p. N ==="), ocr.txt (Tesseract, for the pages without a text layer)
  photo  photo.jpg (at most 1200px), ocr.txt
  video  sheet-1.jpg (12 frames with their time), info.txt (length, size)
Done once per file version: run again only when the file changes. Then open a page at full size only when needed:
  pdftoppm -f N -l N -r 150 -png <file.pdf> <out>
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path("~/Documents/2026-2027").expanduser()
CACHE = Path("~/.cache/school-inbox").expanduser()
THUMB = 360  # px, the long side of a page thumbnail
COLS, ROWS = 4, 3
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
TESSDATA = Path("~/.local/share/tessdata").expanduser()  # eng, ara, fra, ukr (tessdata_best)
BIDI = re.compile(r"[​-‏‪-‮⁦-⁩﻿]")


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, timeout=600, **kw).stdout


def font(size):
    try:
        return ImageFont.truetype(FONT, size)
    except OSError:
        return ImageFont.load_default()


def contact(images, labels, out_dir):
    """Thumbnails in a grid, a red label on each; one sheet per 12. Returns the sheet paths."""
    sheets = []
    per = COLS * ROWS
    f = font(22)
    for start in range(0, len(images), per):
        group = images[start : start + per]
        thumbs = []
        for p in group:
            im = Image.open(p).convert("RGB")
            im.thumbnail((THUMB, THUMB))
            thumbs.append(im)
        cw = max(t.width for t in thumbs) + 8
        ch = max(t.height for t in thumbs) + 8
        cols = min(COLS, len(thumbs))
        rows = (len(thumbs) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * cw, rows * ch), "white")
        d = ImageDraw.Draw(sheet)
        for i, t in enumerate(thumbs):
            x, y = (i % cols) * cw + 4, (i // cols) * ch + 4
            sheet.paste(t, (x, y))
            d.rectangle([x, y, x + t.width - 1, y + t.height - 1], outline="#999")
            text = labels[start + i]
            box = d.textbbox((0, 0), text, font=f)
            d.rectangle([x, y, x + box[2] + 10, y + box[3] + 6], fill="#d00")
            d.text((x + 5, y + 2), text, fill="white", font=f)
        name = out_dir / f"sheet-{start // per + 1}.jpg"
        sheet.save(name, quality=80)
        sheets.append(name)
    return sheets


def ocr(image, lang):
    """Tesseract text of one picture ("" when Tesseract or the language is missing)."""
    env = dict(os.environ, TESSDATA_PREFIX=str(TESSDATA)) if TESSDATA.is_dir() else None
    try:
        t = subprocess.run(["tesseract", str(image), "-", "-l", lang, "--psm", "3"], capture_output=True, text=True, timeout=300, env=env).stdout
    except (OSError, subprocess.TimeoutExpired):
        return ""
    return re.sub(r"\n{3,}", "\n\n", BIDI.sub("", t)).strip()


def prep_pdf(src, out, lang):
    pages_dir = out / "pages"
    pages_dir.mkdir()
    run(["pdftoppm", "-jpeg", "-scale-to", str(THUMB * 2), str(src), str(pages_dir / "p")])
    pages = sorted(pages_dir.glob("p-*.jpg"), key=lambda p: int(p.stem.split("-")[1]))
    for p in pages:  # p-01.jpg → p-1.jpg, whatever pdftoppm's zero padding
        p.rename(pages_dir / f"p-{int(p.stem.split('-')[1])}.jpg")
    pages = [pages_dir / f"p-{n}.jpg" for n in range(1, len(pages) + 1)]
    sheets = contact(pages, [f"p. {n}" for n in range(1, len(pages) + 1)], out)
    texts, scanned = [], []
    for n in range(1, len(pages) + 1):
        t = run(["pdftotext", "-f", str(n), "-l", str(n), "-layout", str(src), "-"])
        t = BIDI.sub("", unicodedata.normalize("NFKC", t)).strip()
        texts.append(f"=== p. {n} ===\n{t}\n")
        if len(t) < 40:
            scanned.append(n)
    has_text = len(scanned) < len(pages)
    if has_text:
        (out / "text.txt").write_text("\n".join(texts))
    if lang and scanned:
        parts = []
        with tempfile.TemporaryDirectory() as tmp:
            for n in scanned:
                run(["pdftoppm", "-f", str(n), "-l", str(n), "-r", "300", "-gray", "-png", str(src), f"{tmp}/o"])
                img = next(Path(tmp).glob("o*.png"), None)
                if img:
                    parts.append(f"=== p. {n} ===\n{ocr(img, lang)}\n")
                    img.unlink()
        (out / "ocr.txt").write_text("\n".join(parts))
    return {"pages": len(pages), "sheets": sheets, "text": has_text, "ocr": bool(lang and scanned)}


def prep_photo(src, out, lang):
    im = Image.open(src)
    im = im.convert("RGB")
    im.thumbnail((1200, 1200))
    name = out / "photo.jpg"
    im.save(name, quality=85)
    if lang:
        (out / "ocr.txt").write_text(ocr(src, lang) + "\n")
    return {"sheets": [name], "ocr": bool(lang)}


def prep_video(src, out):
    info = json.loads(run(["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", str(src)]) or "{}")
    length = float(info.get("format", {}).get("duration", 0) or 0)
    v = next((s for s in info.get("streams", []) if s.get("codec_type") == "video"), {})
    (out / "info.txt").write_text(f"length {int(length // 60)}:{int(length % 60):02d} · {v.get('width')}x{v.get('height')}\n")
    frames, labels = [], []
    with tempfile.TemporaryDirectory() as tmp:
        n = COLS * ROWS
        for i in range(n):
            t = length * (i + 0.5) / n
            p = Path(tmp) / f"f{i:02d}.jpg"
            run(["ffmpeg", "-v", "quiet", "-ss", f"{t:.2f}", "-i", str(src), "-frames:v", "1", "-vf", "scale=480:-2", str(p)])
            if p.exists():
                frames.append(p)
                labels.append(f"{int(t // 60)}:{int(t % 60):02d}")
        sheets = contact(frames, labels, out) if frames else []
    return {"length": round(length), "sheets": sheets}


def prep(src, lang=None):
    """Prepare one file (a path under ROOT); lang = Tesseract languages ("ara", "fra+eng") or None for no OCR.
    Returns what was made; reuses it when the file and the language have not changed."""
    src = Path(src).expanduser().resolve()
    rel = src.relative_to(ROOT)
    out = CACHE / rel.parent / rel.stem
    stamp = out / ".source"
    key = f"{src.stat().st_size}|{int(src.stat().st_mtime)}|{lang or ''}"
    ext = src.suffix.lower()
    if stamp.exists() and stamp.read_text() == key:
        made = {
            "sheets": sorted(out.glob("sheet-*.jpg")) or sorted(out.glob("photo.jpg")),
            "text": (out / "text.txt").exists(),
            "ocr": (out / "ocr.txt").exists(),
        }
    else:
        out.mkdir(parents=True, exist_ok=True)
        shutil.rmtree(out)
        out.mkdir(parents=True)
        if ext == ".pdf":
            made = prep_pdf(src, out, lang)
        elif ext in (".jpg", ".jpeg", ".png", ".webp"):
            made = prep_photo(src, out, lang)
        elif ext in (".mp4", ".mov", ".webm", ".mkv"):
            made = prep_video(src, out)
        else:
            made = {"sheets": []}
        stamp.write_text(key)
    made["dir"] = out
    return made


def line(rel, made):
    bits = [f"{len(made['sheets'])} sheet(s)"]
    if made.get("text"):
        bits.append("text.txt")
    if made.get("ocr"):
        bits.append("ocr.txt")
    if (made["dir"] / "info.txt").exists():
        bits.append((made["dir"] / "info.txt").read_text().strip())
    return f"- `{rel}` → `{made['dir']}/` · " + " · ".join(bits)


if __name__ == "__main__":
    args, lang = sys.argv[1:], None
    if args[:1] == ["--ocr"]:
        lang, args = args[1], args[2:]
    for a in args:
        p = Path(a).expanduser()
        if not p.is_absolute():
            p = ROOT / a if (ROOT / a).exists() else p.resolve()
        print(line(p.relative_to(ROOT), prep(p, lang)))
