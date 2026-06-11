import { useRef, useState } from "react";

// Reusable image-comparison slider. Demo only — per the build spec it must
// use neutral/illustrative imagery and never be captioned with medical
// results attributed to a named compound.

export default function BeforeAfterSlider({
  before,            // ReactNode or image src
  after,
  beforeLabel = "T = 0",
  afterLabel = "T + N",
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);

  const handleMove = (clientX) => {
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const renderPane = (pane, alt) =>
    typeof pane === "string"
      ? <img src={pane} alt={alt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      : <div className="absolute inset-0">{pane}</div>;

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/3] overflow-hidden border border-ink select-none cursor-ew-resize touch-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onMouseDown={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {renderPane(after, afterLabel)}
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="absolute inset-y-0 left-0" style={{ width: ref.current?.offsetWidth ?? "100vw" }}>
          {renderPane(before, beforeLabel)}
        </div>
      </div>

      <div className="absolute top-0 bottom-0 w-0.5 bg-ink" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-10 rounded-full bg-acid border border-ink shadow-[3px_3px_0_0_var(--color-ink)] flex items-center justify-center font-mono text-sm">
          ↔
        </div>
      </div>

      <span className="absolute bottom-3 left-3 spec-label bg-ink text-paper px-2 py-1">{beforeLabel}</span>
      <span className="absolute bottom-3 right-3 spec-label bg-ink text-paper px-2 py-1">{afterLabel}</span>
    </div>
  );
}
