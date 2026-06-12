// ────────────────────────────────────────────────────────────────────────
// MEDIA SLOTS — the only file you edit to add your own clips/images.
//
// Four 9:16 PORTRAIT slots, sized to match your source format exactly:
//   720 × 1280, ~5 s loop, muted. Make your new clips that size and they
//   drop straight in with no cropping.
//
// HOW TO ADD A CLIP (per slot):
//   1. Put your file in  public/media/   e.g.  public/media/clip1.mp4
//   2. Set `src` below to its path under /media, e.g.  src: "/media/clip1.mp4"
//   3. (video only, optional) add a still frame as `poster: "/media/clip1.jpg"`
//   4. Save, then `npm run deploy`.
//
// Supported: .mp4 / .webm (autoplay, muted, looped) and .jpg / .png / .webp.
// While `src` is null the slot shows a labelled placeholder, so the layout
// is final now and the clips just drop in later. Keep files under ~5 MB.
// ────────────────────────────────────────────────────────────────────────

export const MEDIA = {
  clip1: { src: null, poster: null, label: "Clip 1", aspect: "9 / 16", note: "720×1280 · ~5 s loop" },
  clip2: { src: null, poster: null, label: "Clip 2", aspect: "9 / 16", note: "720×1280 · ~5 s loop" },
  clip3: { src: null, poster: null, label: "Clip 3", aspect: "9 / 16", note: "720×1280 · ~5 s loop" },
  clip4: { src: null, poster: null, label: "Clip 4", aspect: "9 / 16", note: "720×1280 · ~5 s loop" },
};

export const GALLERY_SLOTS = ["clip1", "clip2", "clip3", "clip4"];

const VIDEO_RE = /\.(mp4|webm|mov)$/i;
export const isVideo = (src) => !!src && VIDEO_RE.test(src);
