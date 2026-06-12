import { Link } from "react-router-dom";
import { formatPrice, localize } from "../data/products";
import { useLang } from "../i18n.jsx";
import * as FR from "../data/products.fr.js";

export default function ProductCard({ product }) {
  const { lang } = useLang();
  const p = localize(product, lang, FR);
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block border border-ink bg-paper p-5 transition-all hover:shadow-[5px_5px_0_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="spec-label text-ink-soft">{product.catNo}</p>
        <p className="spec-label bg-paper-deep px-1.5 py-0.5">{product.sizeMg}</p>
      </div>
      <h3 className="font-display text-2xl mt-3 leading-tight group-hover:underline decoration-(--color-acid-deep) decoration-2">
        {product.name}
      </h3>
      <p className="text-sm text-ink-soft mt-1">{p.tagline}</p>
      <div className="flex items-center justify-between mt-5">
        <p className="font-mono text-base">{formatPrice(product.priceCents, lang)}</p>
        <span className="spec-label text-acid-deep opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
      </div>
    </Link>
  );
}
