import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useStore } from "../context/StoreContext";
import { useLang } from "../i18n.jsx";

export default function Cart() {
  const { cart, cartDetail, setQty, removeFromCart, subtotalCents, bundleReward, discountCents, clearCart } = useStore();
  const { lang, t } = useLang();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // Amounts are computed server-side from the canonical product list — the
  // server only receives slugs/quantities and the reward id to validate.
  const checkout = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, rewardId: bundleReward?.id ?? null, origin: window.location.origin }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error ?? "checkout failed");
      localStorage.setItem("ep-last-payment", data.ref); // fallback ref for /payment/return
      window.location.href = data.checkoutUrl;
    } catch (e) {
      setError(`${e.message} — ${t("cart.serverHint")}`);
      setBusy(false);
    }
  };

  if (cartDetail.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">{t("cart.emptyTitle")}</h1>
        <p className="text-ink-soft mt-3">{t("cart.emptySub")}</p>
        <div className="flex justify-center gap-3 mt-8">
          <Link to="/catalogue" className="btn-ink">{t("nav.catalogue")}</Link>
          <Link to="/bundle" className="btn-ghost">{t("nav.bundle")}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-5xl md:text-6xl mb-10">{t("cart.title")}</h1>

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
            <p className="font-mono w-24 text-right">{formatPrice(product.priceCents * qty, lang)}</p>
            <button className="font-mono text-sm hover:text-clay" onClick={() => removeFromCart(product.slug)}>✕</button>
          </div>
        ))}
      </div>

      <div className="mt-8 ml-auto max-w-sm space-y-2">
        <div className="flex justify-between text-sm"><span>{t("cart.subtotal")}</span><span className="font-mono">{formatPrice(subtotalCents, lang)}</span></div>
        {bundleReward && (
          <div className="flex justify-between text-sm text-pine">
            <span>{t("cart.bonus")} — {bundleReward.label}</span>
            <span className="font-mono">{discountCents > 0 ? `−${formatPrice(discountCents, lang)}` : t("cart.applied")}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ink pt-2 font-medium">
          <span>{t("cart.total")}</span><span className="font-mono">{formatPrice(subtotalCents - discountCents, lang)}</span>
        </div>
        <button className="btn-ink w-full justify-center mt-4" onClick={checkout} disabled={busy}>
          {busy ? t("cart.opening") : t("cart.checkout")}
        </button>
        {error && <p className="text-xs text-clay leading-relaxed">{error}</p>}
        <button className="spec-label underline text-ink-soft w-full text-center mt-2" onClick={clearCart}>{t("cart.clear")}</button>
        <p className="text-[11px] text-ink-soft leading-relaxed pt-3">{t("cart.note")}</p>
      </div>
    </main>
  );
}
