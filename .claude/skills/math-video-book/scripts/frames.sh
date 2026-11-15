#!/bin/bash
# Frames of a scrolling e-book screencast: every distinct screen, then one frame each time the page has moved more than half a screen.
# Usage (repo root): frames.sh "<video.mp4>" <out folder>   (on disk, e.g. ~/.cache/school-tests/math-video/v2: a long video is GBs of frames, too big for /tmp)
#   <out>/all/  every non-duplicate frame (4 a second, mpdecimate), named by time: f00420.png = 420 / 4 = 105 s = 1:45 in the video
#   <out>/keep/ the frames to read, k000_f00012.png … (the f number = the frame in all/, for looking between two kept frames)
# Long videos take a while on the Raspberry Pi (about 1 minute of work per 3 minutes of video): run it in the background.
set -e
VID="$1"; OUT="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$OUT/all"
nice ffmpeg -v error -i "$VID" -vf "fps=4,mpdecimate=hi=2000:lo=600:frac=0.1" -fps_mode vfr -frame_pts 1 "$OUT/all/f%05d.png"
python3 -I "$HERE/pick.py" "$OUT/all" "$OUT/keep"
