import { MEDIA, isVideo } from "../data/media.js";

// Renders the media for a slot id, or a labelled placeholder while empty.
// Add files via src/data/media.js — see the header there. `dark` switches
// the placeholder palette for use on the dark (ink) band.

export default function MediaSlot({ id, className = "", rounded = false, dark = false }) {
  const slot = MEDIA[id];
  if (!slot) return null;

  const frame = `relative w-full overflow-hidden border border-ink ${rounded ? "rounded-2xl" : ""} ${className}`;
  const style = { aspectRatio: slot.aspect };

  if (slot.src) {
    return (
      <div className={frame} style={style}>
        {isVideo(slot.src) ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={slot.src}
            poster={slot.poster ?? undefined}
            autoPlay muted loop playsInline
          />
        ) : (
          <img className="absolute inset-0 w-full h-full object-cover" src={slot.src} alt={slot.label} />
        )}
      </div>
    );
  }

  // Empty placeholder
  const base = dark
    ? "bg-paper/5 text-paper border-paper/40"
    : "bg-paper-deep text-ink-soft";
  return (
    <div
      className={`${frame} ${base} flex flex-col items-center justify-center gap-2 text-center px-6`}
      style={{ ...style, borderStyle: "dashed" }}
    >
      <span className="font-mono text-3xl opacity-40">▶</span>
      <span className="spec-label">{slot.label}</span>
      <span className="font-mono text-[10px] opacity-60">slot id: {id} · {slot.aspect}</span>
      <span className="text-[11px] max-w-xs leading-relaxed opacity-70">{slot.note}</span>
      <span className="font-mono text-[10px] opacity-50">add via src/data/media.js</span>
    </div>
  );
}
