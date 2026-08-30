#!/usr/bin/env bash
# Swap the portrait used across the site and regenerate its responsive variants.
#
#   ./scripts/set-photo.sh ~/Desktop/my-new-photo.jpg
#
# Writes public/portrait.jpg (1000px wide) and public/portrait-sm.jpg (500px
# wide). Both are resampled to an EXACT width, so the `srcset` width
# descriptors in the markup stay correct for any source photo — swapping the
# photo never requires a code change. Height follows the source aspect ratio;
# the frames that display it are fixed-aspect and crop with object-fit.

set -euo pipefail

SRC="${1:-}"
if [[ -z "$SRC" ]]; then
  echo "usage: $0 <path-to-photo>" >&2
  exit 1
fi
if [[ ! -f "$SRC" ]]; then
  echo "error: no such file: $SRC" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public"

# Normalise first: sips won't resample straight from every source format (HEIC).
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
sips -s format png "$SRC" --out "$TMP/src.png" >/dev/null

sips --resampleWidth 1000 -s format jpeg -s formatOptions 82 "$TMP/src.png" --out "$OUT/portrait.jpg"    >/dev/null
sips --resampleWidth  500 -s format jpeg -s formatOptions 76 "$TMP/src.png" --out "$OUT/portrait-sm.jpg" >/dev/null

echo "wrote:"
for f in "$OUT/portrait.jpg" "$OUT/portrait-sm.jpg"; do
  dims=$(sips -g pixelWidth -g pixelHeight "$f" | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w"x"h}')
  size=$(du -h "$f" | cut -f1 | tr -d ' ')
  echo "  ${f#"$ROOT"/}  ${dims}  ${size}"
done
