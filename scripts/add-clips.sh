#!/usr/bin/env bash
# Add your four clips to the home-page media slots, then build + deploy.
#
# Usage (from the repo root, in order clip1 clip2 clip3 clip4):
#   ./scripts/add-clips.sh FILE1 FILE2 FILE3 FILE4
#
# Example:
#   ./scripts/add-clips.sh ~/Downloads/a.mp4 ~/Downloads/b.mp4 \
#                          ~/Downloads/c.mp4 ~/Downloads/d.mp4
#
# Each file is copied into public/media/ as clip1..clip4 (keeping its
# extension), src/data/media.js is pointed at it, and the site is rebuilt
# and deployed. Re-run any time to swap clips.

set -euo pipefail
cd "$(dirname "$0")/.."   # repo root

if [ "$#" -ne 4 ]; then
  echo "Need exactly 4 files, in order. Usage:"
  echo "  ./scripts/add-clips.sh clip1 clip2 clip3 clip4"
  exit 1
fi

mkdir -p public/media

i=0
for f in "$@"; do
  i=$((i + 1))
  if [ ! -f "$f" ]; then echo "✗ not found: $f"; exit 1; fi
  ext="${f##*.}"
  ext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
  dest="public/media/clip${i}.${ext}"
  cp "$f" "$dest"
  # point media.js at it (replaces whatever src clipN currently has)
  sed -i '' -E "s#(clip${i}: \{ src: )[^,]*#\1\"/media/clip${i}.${ext}\"#" src/data/media.js
  echo "✓ clip${i}  ←  $(basename "$f")  →  ${dest}"
done

echo
echo "Building…"
VITE_BASE=/ npm run build >/dev/null
echo "Deploying to Cloudflare Pages…"
npx wrangler pages deploy dist --project-name europeptide --branch main --commit-dirty=true | tail -1
echo
echo "Done. Live at https://eurpep.com  (hard-refresh: Cmd-Shift-R)"
