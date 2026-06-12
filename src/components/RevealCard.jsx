import { motion } from "framer-motion";
import { useLang } from "../i18n.jsx";

// Pack-opening reveal — the payoff is which DISCOUNT/freebie landed on a
// bundle the buyer already chose. Per the build spec this must never reveal
// or assign a product: the buyer always knows exactly what they bought.
// The reward itself is decided server-side in production (see
// supabase/functions/roll-reward) — this component only animates it.

export default function RevealCard({ reward, opened, onOpen }) {
  const { t } = useLang();
  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <motion.div
        className="relative w-60 h-80"
        animate={{ rotateY: opened ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* face down */}
        <motion.button
          onClick={onOpen}
          disabled={opened}
          whileHover={!opened ? { scale: 1.04, rotate: -1.5 } : {}}
          whileTap={!opened ? { scale: 0.97 } : {}}
          className="absolute inset-0 bg-ink text-paper border border-ink shadow-[6px_6px_0_0_var(--color-acid)] flex flex-col items-center justify-center gap-4 cursor-pointer"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            ⚗
          </motion.span>
          <span className="spec-label !text-paper">{t("bundle.tap")}</span>
          <span className="font-display text-2xl italic">{t("bundle.bonusCard")}</span>
        </motion.button>

        {/* face up */}
        <div
          className="absolute inset-0 bg-acid text-ink border border-ink shadow-[6px_6px_0_0_var(--color-ink)] flex flex-col items-center justify-center gap-3 px-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="spec-label">{reward?.rarity}</span>
          <span className="font-display text-4xl leading-tight">{reward?.label}</span>
          <span className="text-sm">{reward?.detail}</span>
        </div>
      </motion.div>

      {opened && (
        <ConfettiBurst />
      )}
    </div>
  );
}

const PIECES = Array.from({ length: 14 }, (_, i) => i);

function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {PIECES.map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 block size-2"
          style={{ background: i % 3 === 0 ? "var(--color-clay)" : i % 3 === 1 ? "var(--color-ink)" : "var(--color-acid-deep)" }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: Math.cos((i / PIECES.length) * Math.PI * 2) * (90 + (i % 4) * 30),
            y: Math.sin((i / PIECES.length) * Math.PI * 2) * (90 + (i % 4) * 30) - 40,
            opacity: 0,
            rotate: 200 + i * 30,
          }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.45 }}
        />
      ))}
    </div>
  );
}
