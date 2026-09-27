"""Offline, frame-selection-only H-03 preview. No interpolation or pixel filters.
Run: FFMPEG=/path/to/existing/ffmpeg python3 scripts/retime-h03.py
"""
import json
import os
import subprocess
import tempfile
from pathlib import Path

ffmpeg = os.environ.get('FFMPEG', 'ffmpeg')
source = Path('.local-evidence/stabilization-2026-09-27/public/homepage/h03-desktop-raw.mp4')
target = Path('.local-evidence/stabilization-2026-09-27/public/homepage/h03-desktop-retimed.mp4')
frame_bytes = 1920 * 1080 * 3 // 2
mapping = []
with tempfile.TemporaryDirectory(prefix='h03-retime-') as temp:
    decoded = Path(temp) / 'source.yuv'
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
                    '-map', '0:v:0', '-an', '-pix_fmt', 'yuv420p', '-f', 'rawvideo', str(decoded)], check=True)
    assert decoded.stat().st_size == 121 * frame_bytes, 'Unexpected source; do not silently retime different media'
    encoder = subprocess.Popen([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
        '-f', 'rawvideo', '-pixel_format', 'yuv420p', '-video_size', '1920x1080',
        '-framerate', '24', '-i', 'pipe:0', '-an', '-frames:v', '121', '-c:v', 'libopenh264',
        '-b:v', '12000000', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target)], stdin=subprocess.PIPE)
    try:
        with decoded.open('rb') as frames:
            for output in range(121):
                t = output / 24
                u = min(t / 4.375, 1)
                index = int(120 * (1 - (1 - u) ** 2.2))
                frames.seek(index * frame_bytes)
                encoder.stdin.write(frames.read(frame_bytes))
                mapping.append({'output': output, 'time': t, 'source': index})
    finally:
        encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError('Preview encoding failed')
Path('.local-evidence/stabilization-2026-09-27/frame-map.json').write_text(json.dumps(mapping, indent=2) + '\n')
print(json.dumps({'frames': len(mapping), 'unique_source_frames': len({x['source'] for x in mapping}),
                  'final_frame_begins': next(x['time'] for x in mapping if x['source'] == 120)}))
