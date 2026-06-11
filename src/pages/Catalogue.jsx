import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const active = params.get("cat");
  const shown = active ? PRODUCTS.filter((p) => p.category === active) : PRODUCTS;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="spec-label text-clay">Catalogue</p>
      <h1 className="font-display text-5xl md:text-6xl mt-2 mb-8">All compounds</h1>

      <div className="flex flex-wrap gap-2 mb-10">
        <button onClick={() => setParams({})}
                className={`spec-label px-3 py-2 border border-ink transition-colors ${!active ? "bg-ink text-paper" : "hover:bg-paper-deep"}`}>
          All ({PRODUCTS.length})
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setParams({ cat: c })}
                  className={`spec-label px-3 py-2 border border-ink transition-colors ${active === c ? "bg-ink text-paper" : "hover:bg-paper-deep"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </main>
  );
}
