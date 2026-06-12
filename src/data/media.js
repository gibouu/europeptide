// ────────────────────────────────────────────────────────────────────────
// MEDIA SLOTS — the only file you edit to add your own clips/images.
//
// HOW TO ADD A CLIP (per slot):
//   1. Put your file in  public/media/   e.g.  public/media/hero.mp4
//   2. Set `src` below to its path under /media, e.g.  src: "/media/hero.mp4"
//   3. (video only, optional) add a still frame as `poster: "/media/hero.jpg"`
//      so something shows before the video loads.
//   4. Save — the slot fills automatically. Run `npm run deploy` to publish.
//
// Supported: .mp4 / .webm (autoplay, muted, looped) and .jpg / .png / .webp.
// While `src` is null the slot shows a labelled placeholder, so the layout
// is final now and the clips just drop in later.
//
// Recommended: keep files under ~5 MB each and match the slot's aspect ratio
// (listed below) so nothing is cropped awkwardly.
// ────────────────────────────────────────────────────────────────────────

export const MEDIA = {
  hero: {
    src: null,                 // e.g. "/media/hero.mp4"
    poster: null,              // e.g. "/media/hero.jpg"
    label: "Hero clip",
    aspect: "16 / 10",
    note: "Home hero — landscape, ~1280×800. Sets the tone of the page.",
  },
  process: {
    src: null,                 // e.g. "/media/process.mp4"
    poster: null,
    label: "Lab / process clip",
    aspect: "4 / 3",
    note: "Home 'in the lab' band — vials, pipettes, powder, bench.",
  },
  bundle: {
    src: null,                 // e.g. "/media/bundle.mp4"
    poster: null,
    label: "Bundle banner clip",
    aspect: "21 / 9",
    note: "Bundle lab header — wide banner, ~1680×720.",
  },
  catalogue: {
    src: null,                 // e.g. "/media/catalogue.mp4"
    poster: null,
    label: "Catalogue banner clip",
    aspect: "21 / 9",
    note: "Catalogue header — wide banner, ~1680×720.",
  },
};

const VIDEO_RE = /\.(mp4|webm|mov)$/i;
export const isVideo = (src) => !!src && VIDEO_RE.test(src);
