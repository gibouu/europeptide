import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const { cartDetail, setQty, removeFromCart, subtotalCents, bundleReward, discountCents, clearCart } = useStore();

  const checkout = () => {
    // Stripe wiring point (see README §Checkout): POST the cart to a
    // create-checkout-session Edge Function and redirect to session.url.
    // Never compute the charged amount client-side.
    alert("Checkout is not wired yet — connect Stripe via the create-checkout-session Edge Function (see README).");
  };

  if (cartDetail.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Cart is empty.</h1>
        <p className="text-ink-soft mt-3">Browse the catalogue or build a three-compound bundle.</p>
        <div className="flex justify-center gap-3 mt-8">
          <Link to="/catalogue" className="btn-ink">Catalogue</Link>
          <Link to="/bundle" className="btn-ghost">Bundle lab</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-5xl md:text-6xl mb-10">Cart</h1>

      <div className="space-y-3">
        {cartDetail.map(({ product, qty }) => (
          <div key={product.slug} className="flex items-center gap-4 border border-ink bg-paper px-4 py-3">
            <div className="flex-1 min-w-0">
              <Link to={`/product/${product.slug}`} className="font-medium hover:underline">{product.name}</Link>
              <p className="spec-label text-ink-soft mt-0.5">{product.catNo} · {product.sizeMg}</p>
            </div>
            <div className="flex items-center border border-ink">
              <button className="px-3 py-1.5 font-mono hover:bg-paper-deep" onClick={() => setQty(product.slug, qty - 1)}>−</button>
              <span className="px-3 font-mono text-sm">{qty}</span>
              <button className="px-3 py-1.5 font-mono hover:bg-paper-deep" onClick={() => setQty(product.slug, qty + 1)}>+</button>
            </div>
            <p className="font-mono w-24 text-right">{formatPrice(product.priceCents * qty)}</p>
            <button className="font-mono text-sm hover:text-clay" onClick={() => removeFromCart(product.slug)}>✕</button>
          </div>
        ))}
      </div>

      <div className="mt-8 ml-auto max-w-sm space-y-2">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-mono">{formatPrice(subtotalCents)}</span></div>
        {bundleReward && (
          <div className="flex justify-between text-sm text-pine">
            <span>Bundle bonus — {bundleReward.label}</span>
            <span className="font-mono">{discountCents > 0 ? `−${formatPrice(discountCents)}` : "applied"}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ink pt-2 font-medium">
          <span>Total</span><span className="font-mono">{formatPrice(subtotalCents - discountCents)}</span>
        </div>
        <button className="btn-ink w-full justify-center mt-4" onClick={checkout}>Checkout →</button>
        <button className="spec-label underline text-ink-soft w-full text-center mt-2" onClick={clearCart}>Clear cart</button>
        <p className="text-[11px] text-ink-soft leading-relaxed pt-3">
          By checking out you confirm the research-use declaration made at entry. All items are
          laboratory reagents for in-vitro use only.
        </p>
      </div>
    </main>
  );
}
