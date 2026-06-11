import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";

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
  const featured = PRODUCTS.filter((p) =>
    ["bpc-157", "glp-3-rt", "ghk-cu", "thymosin-alpha-1", "nad-plus", "semax"].includes(p.slug)
  );

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 md:pt-24 pb-12">
        <motion.p {...fadeUp} className="spec-label text-clay">Catalogue 2026 · 30 reference compounds</motion.p>
        <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-4 max-w-4xl">
          Research reagents,<br />
          <em className="text-pine">catalogued</em> with care.
        </motion.h1>
        <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }}
          className="text-lg text-ink-soft mt-6 max-w-xl leading-relaxed">
          Batch-tested peptides and research compounds for laboratory use. Every vial ships with a
          certificate of analysis. In-vitro research use only.
        </motion.p>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.24 }} className="flex flex-wrap gap-3 mt-8">
          <Link to="/catalogue" className="btn-ink">Browse catalogue</Link>
          <Link to="/bundle" className="btn-ghost">Build a bundle ⚗</Link>
        </motion.div>
      </section>

      {/* Category strip */}
      <section className="border-y border-ink bg-paper-deep overflow-hidden">
        <div className="flex gap-8 py-3 whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
             style={{ width: "max-content" }}>
          {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <Link key={i} to={`/catalogue?cat=${encodeURIComponent(c)}`} className="spec-label hover:text-clay">
              {c} <span className="text-line mx-2">／</span>
            </Link>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-8">
          <h2 className="font-display text-4xl md:text-5xl">Frequently catalogued</h2>
          <Link to="/catalogue" className="spec-label underline shrink-0">All 30 →</Link>
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
            <p className="spec-label !text-acid">Interactive demo</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Compare timepoints,<br />drag the line.</h2>
            <p className="text-paper/70 mt-4 leading-relaxed max-w-md">
              A stylised culture well observed at two timepoints — an illustration of how comparison
              imaging is read in the lab. Illustrative only; not data from, or a claim about, any
              listed compound.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <BeforeAfterSlider
              before={<WellPane density={18} tint="#ece9de" />}
              after={<WellPane density={70} tint="#e3edd2" />}
              beforeLabel="T = 0 h"
              afterLabel="T + 48 h"
            />
          </motion.div>
        </div>
      </section>

      {/* Bundle teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div {...fadeUp} className="card-rule p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <p className="spec-label text-clay">The fun part</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Pick three. Open the box.<br />See what bonus landed.</h2>
            <p className="text-ink-soft mt-4 max-w-lg leading-relaxed">
              Choose any three compounds for your bundle — you always know exactly what you're buying.
              The mystery is the bonus: open the box to reveal which discount or freebie you unlocked.
            </p>
          </div>
          <Link to="/bundle" className="btn-ink shrink-0">Build a bundle ⚗</Link>
        </motion.div>
      </section>
    </main>
  );
}
