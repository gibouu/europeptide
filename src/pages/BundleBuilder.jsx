import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RevealCard from "../components/RevealCard";
import MediaSlot from "../components/MediaSlot";
import { CATEGORIES, PRODUCTS, formatPrice, categoryLabel, localize } from "../data/products";
import { useStore } from "../context/StoreContext";
import { useLang } from "../i18n.jsx";
import * as FR from "../data/products.fr.js";

// Bundle lab: the buyer picks exactly 3 compounds (always their choice),
// then opens the box to reveal which BONUS landed — a discount or freebie,
// never a product. DEV ONLY: the reward roll below is client-side so the
// flow is demoable; in production it MUST come from the roll-reward Edge
// Function (supabase/functions/roll-reward) so it can't be tampered with
// and is recorded against the order.
//
// "Random pack" is a SHUFFLE/SHORTCUT only: it fills the three slots with
// random catalogue items the buyer then reviews and can swap. It is NOT a
// curated combination and carries no claim that the three are meant to be
// used together — that line is firm (see README product rules).

const REWARDS = [
  { id: "10pct", label: "10% off", detail: "your whole bundle", rarity: "Common", pct: 10, weight: 50 },
  { id: "15pct", label: "15% off", detail: "your whole bundle", rarity: "Uncommon", pct: 15, weight: 25 },
  { id: "ship", label: "Free shipping", detail: "+ bacteriostatic water add-on", rarity: "Uncommon", pct: 0, weight: 17 },
  { id: "20pct", label: "20% off", detail: "your whole bundle", rarity: "Rare", pct: 20, weight: 8 },
];

function rollRewardDev() {
  const total = REWARDS.reduce((s, r) => s + r.weight, 0);
  let roll = Math.random() * total;
  for (const r of REWARDS) {
    if ((roll -= r.weight) <= 0) return r;
  }
  return REWARDS[0];
}

// Fisher–Yates pick of 3 distinct slugs — a browsing shuffle, nothing more.
function randomThree() {
  const pool = PRODUCTS.map((p) => p.slug);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

export default function BundleBuilder() {
  const { lang, t } = useLang();
  const [picks, setPicks] = useState([]);
  const [stage, setStage] = useState("picking"); // picking | reveal
  const [reward, setReward] = useState(null);
  const [opened, setOpened] = useState(false);
  const { addToCart, setBundleReward } = useStore();
  const navigate = useNavigate();

  const toggle = (slug) =>
    setPicks((p) =>
      p.includes(slug) ? p.filter((s) => s !== slug) : p.length < 3 ? [...p, slug] : p
    );

  const picked = useMemo(() => picks.map((s) => PRODUCTS.find((p) => p.slug === s)), [picks]);
  const bundleTotal = picked.reduce((s, p) => s + (p?.priceCents ?? 0), 0);

  const confirm = () => {
    setReward(rollRewardDev());
    setStage("reveal");
  };

  const toCart = () => {
    picks.forEach((slug) => addToCart(slug));
    setBundleReward(reward);
    navigate("/cart");
  };

  if (stage === "reveal") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 flex flex-col items-center text-center">
        <p className="spec-label text-clay">{t("bundle.confirmedKicker")}</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">{t("bundle.confirmedTitle")}</h1>
        <p className="text-ink-soft max-w-md mb-2">{picked.map((p) => p.name).join(" · ")}</p>
        <p className="text-sm text-ink-soft max-w-md mb-10"
           dangerouslySetInnerHTML={{ __html: t("bundle.knowExactly") }} />

        <RevealCard reward={reward} opened={opened} onOpen={() => setOpened(true)} />

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <p className="text-ink-soft text-sm">
                {t("bundle.bundleWord")} {formatPrice(bundleTotal, lang)}
                {reward.pct > 0 && <> → <strong className="text-ink">{formatPrice(Math.round(bundleTotal * (1 - reward.pct / 100)), lang)}</strong> {t("bundle.withBonus")}</>}
              </p>
              <div className="flex gap-3">
                <button className="btn-ink" onClick={toCart}>{t("bundle.addToCart")}</button>
                <button className="btn-ghost" onClick={() => { setStage("picking"); setOpened(false); setReward(null); }}>
                  {t("bundle.rebuild")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="spec-label text-clay">{t("bundle.label")}</p>
      <h1 className="font-display text-5xl md:text-6xl mt-2">{t("bundle.title")}</h1>
      <p className="text-ink-soft mt-3 max-w-xl leading-relaxed">{t("bundle.intro")}</p>

      {/* MEDIA SLOT 3 of 4 — bundle banner clip */}
      <div className="mt-8">
        <MediaSlot id="bundle" rounded />
      </div>

      <div className="mt-6">
        <button onClick={() => setPicks(randomThree())} className="btn-ghost">
          {picks.length ? t("bundle.reroll") : t("bundle.random")}
        </button>
        <p className="text-[11px] text-ink-soft leading-relaxed mt-3 max-w-xl">{t("bundle.randomNote")}</p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          {CATEGORIES.map((cat) => {
            const items = PRODUCTS.filter((p) => p.category === cat);
            return (
              <section key={cat}>
                <h2 className="spec-label border-b border-ink pb-2 mb-4">{categoryLabel(cat, lang, FR)}</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {items.map((base) => {
                    const p = localize(base, lang, FR);
                    const selected = picks.includes(base.slug);
                    const full = picks.length >= 3 && !selected;
                    return (
                      <button
                        key={base.slug}
                        onClick={() => toggle(base.slug)}
                        disabled={full}
                        className={`flex items-center justify-between gap-3 border px-4 py-3 text-left text-sm transition-all
                          ${selected ? "border-ink bg-ink text-paper shadow-[3px_3px_0_0_var(--color-acid)]" : "border-line bg-paper hover:border-ink"}
                          ${full ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <span>
                          <span className="block font-medium">{base.name}</span>
                          <span className={`block text-xs ${selected ? "text-paper/60" : "text-ink-soft"}`}>{base.sizeMg}</span>
                        </span>
                        <span className="font-mono text-xs shrink-0">{formatPrice(base.priceCents, lang)}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* sticky picker rail */}
        <aside className="lg:sticky lg:top-32 h-fit card-rule p-6">
          <p className="spec-label mb-4">{t("bundle.yours")} · {picks.length}/3</p>
          <div className="space-y-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`border px-3 py-2.5 text-sm ${picked[i] ? "border-ink" : "border-dashed border-line text-ink-soft"}`}>
                {picked[i] ? (
                  <span className="flex justify-between items-center gap-2">
                    {picked[i].name}
                    <button onClick={() => toggle(picked[i].slug)} className="font-mono text-xs hover:text-clay">✕</button>
                  </span>
                ) : `${t("bundle.slot")} ${i + 1}`}
              </div>
            ))}
          </div>
          {picks.length === 3 && <p className="font-mono text-sm mb-4">{t("bundle.subtotal")} {formatPrice(bundleTotal, lang)}</p>}
          <button className="btn-ink w-full justify-center" disabled={picks.length !== 3} onClick={confirm}>
            {t("bundle.confirm")}
          </button>
          <p className="text-[11px] text-ink-soft leading-relaxed mt-4">
            {t("bundle.note")} <Link to="/legal/terms" className="underline">{t("bundle.termsLink")}</Link>
          </p>
        </aside>
      </div>
    </main>
  );
}
