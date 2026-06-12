import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { useLang, T } from "../i18n.jsx";

// Age + research-use interstitial. Blocks the whole app until accepted.
// A consent gate is standard for a reagent business, but it is NOT a licence
// to add human-use or dosing content anywhere on the site — keep all copy
// reagent-framed (see README, non-negotiable product rules).

export default function Gate() {
  const { setConsent } = useStore();
  const { t } = useLang();
  const [age, setAge] = useState(false);
  const [research, setResearch] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="card-rule max-w-lg w-full p-8 md:p-10"
      >
        <p className="spec-label text-clay">{t("gate.label")}</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 mb-6">{t("gate.title")}</h1>

        <label className="flex items-start gap-3 mb-4 cursor-pointer">
          <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)}
                 className="mt-1 size-4 accent-(--color-ink)" />
          <span className="text-sm leading-relaxed"><T k="gate.age" /></span>
        </label>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input type="checkbox" checked={research} onChange={(e) => setResearch(e.target.checked)}
                 className="mt-1 size-4 accent-(--color-ink)" />
          <span className="text-sm leading-relaxed"><T k="gate.research" /></span>
        </label>

        <button
          className="btn-ink w-full justify-center"
          disabled={!age || !research}
          onClick={() => setConsent({ age: true, research: true, at: new Date().toISOString() })}
        >
          {t("gate.enter")}
        </button>

        <p className="text-xs text-ink-soft leading-relaxed mt-6">
          {t("gate.fine")}{" "}
          <Link to="/legal/disclaimer" className="underline">{t("gate.disclaimer")}</Link> {t("gate.and")}{" "}
          <Link to="/legal/terms" className="underline">{t("gate.terms")}</Link>.
        </p>

        <a href="https://www.google.com" className="spec-label inline-block mt-5 text-ink-soft underline">
          {t("gate.leave")}
        </a>
      </motion.div>
    </div>
  );
}
