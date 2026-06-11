import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bySlug, formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = bySlug(slug);
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Compound not found.</h1>
        <Link to="/catalogue" className="btn-ghost mt-6">Back to catalogue</Link>
      </main>
    );
  }

  const add = () => {
    addToCart(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 grid gap-12 lg:grid-cols-2">
      {/* stylised vial plate */}
      <div className="card-rule aspect-square flex items-center justify-center bg-paper-deep">
        <div className="text-center">
          <div className="mx-auto w-24 h-44 border-2 border-ink rounded-b-2xl rounded-t-md relative bg-paper">
            <div className="absolute top-0 inset-x-0 h-5 bg-ink rounded-t-md" />
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-acid/60 rounded-b-2xl" />
            <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 spec-label !text-[9px]">{product.catNo}</p>
          </div>
          <p className="spec-label mt-6 text-ink-soft">Lyophilized · {product.sizeMg}</p>
        </div>
      </div>

      <div>
        <p className="spec-label text-ink-soft">{product.catNo} · {product.category}</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3 leading-[0.95]">{product.name}</h1>
        <p className="text-lg text-ink-soft mt-3">{product.tagline}</p>
        <p className="font-mono text-3xl mt-6">{formatPrice(product.priceCents)}</p>

        <ul className="mt-8 space-y-3">
          {product.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-acid-deep font-mono">▪</span> {b}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex gap-3">
          <button className="btn-ink" onClick={add}>{added ? "Added ✓" : "Add to cart"}</button>
          <Link to="/bundle" className="btn-ghost">Add via bundle</Link>
        </div>

        <div className="mt-10 border border-clay/50 bg-clay/5 p-4">
          <p className="spec-label text-clay mb-1">Research use only</p>
          <p className="text-xs text-ink-soft leading-relaxed">
            Supplied strictly as a laboratory research reagent for in-vitro use. Not for human,
            veterinary, or diagnostic use. Not a medicine, food, supplement, or cosmetic. Not
            evaluated by the FDA, EMA, or any national health authority.
          </p>
        </div>
      </div>
    </main>
  );
}
