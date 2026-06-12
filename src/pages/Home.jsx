import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import MediaSlot from "../components/MediaSlot";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS, categoryLabel } from "../data/products";
import { useLang } from "../i18n.jsx";
import * as FR from "../data/products.fr.js";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Neutral illustrative panes for the comparison slider — a stylised culture
// well at two timepoints. Deliberately NOT a body photo and NOT attributed
// to any compound (spec §4).
function WellPane({ density, tint }) {
  const dots = Array.from({ length: density }, (_, i) => ({
    cx: 12 + ((i * 37) % 376),
    cy: 12 + ((i * 53) % 276),
    r: 3 + (i % 3),
  }));
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ background: tint }}>
      <circle cx="200" cy="150" r="130" fill="none" stroke="#13140f" strokeWidth="2" opacity="0.5" />
      {dots.map((d, i) => (
        <circle key={i} {...d} fill="#1f4d3a" opacity={0.25 + (i % 5) * 0.12}
                style={{ clipPath: "circle(130px at 200px 150px)" }} />
      ))}
    </svg>
  );
}

export default function Home() {
  const { lang, t } = useLang();
  const featured = PRODUCTS.filter((p) =>
    ["bpc-157", "glp-3-rt", "ghk-cu", "thymosin-alpha-1", "nad-plus", "semax"].includes(p.slug)
  );

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24 pb-12">
        <motion.p {...fadeUp} className="spec-label text-clay">{t("home.kicker")}</motion.p>
        <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-4 max-w-4xl">
          {t("home.h1a")}<br />
          <em className="text-pine">{t("home.h1b")}</em> {t("home.h1c")}
        </motion.h1>
        <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }}
          className="text-lg text-ink-soft mt-6 max-w-xl leading-relaxed">
          {t("home.sub")}
        </motion.p>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.24 }} className="flex flex-wrap gap-3 mt-8">
          <Link to="/catalogue" className="btn-ink">{t("home.browse")}</Link>
          <Link to="/bundle" className="btn-ghost">{t("home.build")}</Link>
        </motion.div>

        {/* MEDIA SLOT 1 of 4 — hero clip */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.32 }} className="mt-12">
          <MediaSlot id="hero" rounded />
        </motion.div>
      </section>

      {/* Category strip */}
      <section className="border-y border-ink bg-paper-deep overflow-hidden">
        <div className="flex gap-8 py-3 whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
             style={{ width: "max-content" }}>
          {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <Link key={i} to={`/catalogue?cat=${encodeURIComponent(c)}`} className="spec-label hover:text-clay">
              {categoryLabel(c, lang, FR)} <span className="text-line mx-2">／</span>
            </Link>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-8">
          <h2 className="font-display text-4xl md:text-5xl">{t("home.featured")}</h2>
          <Link to="/catalogue" className="spec-label underline shrink-0">{t("home.all")}</Link>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.div key={p.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Slider demo */}
      <section className="border-y border-ink bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div {...fadeUp}>
            <p className="spec-label !text-acid">{t("home.demoKicker")}</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">{t("home.demoTitle1")}<br />{t("home.demoTitle2")}</h2>
            <p className="text-paper/70 mt-4 leading-relaxed max-w-md">{t("home.demoBody")}</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <BeforeAfterSlider
              before={<WellPane density={18} tint="#ece9de" />}
              after={<WellPane density={70} tint="#e3edd2" />}
              beforeLabel={t("home.t0")}
              afterLabel={t("home.t48")}
            />
          </motion.div>
        </div>

        {/* MEDIA SLOT 2 of 4 — lab / process clip (on the dark band) */}
        <div className="mx-auto max-w-6xl px-4 pb-16 -mt-2">
          <MediaSlot id="process" rounded dark />
        </div>
      </section>

      {/* Bundle teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div {...fadeUp} className="card-rule p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <p className="spec-label text-clay">{t("home.teaserKicker")}</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">{t("home.teaserTitle1")}<br />{t("home.teaserTitle2")}</h2>
            <p className="text-ink-soft mt-4 max-w-lg leading-relaxed">{t("home.teaserBody")}</p>
          </div>
          <Link to="/bundle" className="btn-ink shrink-0">{t("home.build")}</Link>
        </motion.div>
      </section>
    </main>
  );
}
