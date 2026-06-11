import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { bySlug } from "../data/products";

// Cart + consent state, persisted to localStorage.
// Production note (see README): consent must ALSO be recorded server-side
// (consent_log table) once Supabase auth is wired up — localStorage alone
// is not an audit trail.

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [consent, setConsent] = useState(() => load("vw-consent", null));
  const [cookieChoice, setCookieChoice] = useState(() => load("vw-cookies", null));
  const [cart, setCart] = useState(() => load("vw-cart", [])); // [{slug, qty}]
  const [bundleReward, setBundleReward] = useState(() => load("vw-reward", null));

  useEffect(() => { localStorage.setItem("vw-consent", JSON.stringify(consent)); }, [consent]);
  useEffect(() => { localStorage.setItem("vw-cookies", JSON.stringify(cookieChoice)); }, [cookieChoice]);
  useEffect(() => { localStorage.setItem("vw-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("vw-reward", JSON.stringify(bundleReward)); }, [bundleReward]);

  const addToCart = (slug, qty = 1) =>
    setCart((c) => {
      const existing = c.find((i) => i.slug === slug);
      return existing
        ? c.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
        : [...c, { slug, qty }];
    });

  const removeFromCart = (slug) => setCart((c) => c.filter((i) => i.slug !== slug));
  const setQty = (slug, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.slug !== slug) : c.map((i) => (i.slug === slug ? { ...i, qty } : i))));
  const clearCart = () => { setCart([]); setBundleReward(null); };

  const cartDetail = useMemo(() => cart.map((i) => ({ ...i, product: bySlug(i.slug) })).filter((i) => i.product), [cart]);
  const subtotalCents = useMemo(() => cartDetail.reduce((s, i) => s + i.product.priceCents * i.qty, 0), [cartDetail]);
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  // Reward applies only while the cart still holds at least the 3 bundle items.
  const bundleEligible = cartCount >= 3;
  const discountCents = bundleReward && bundleEligible && bundleReward.pct
    ? Math.round((subtotalCents * bundleReward.pct) / 100)
    : 0;

  const value = {
    consent, setConsent,
    cookieChoice, setCookieChoice,
    cart, cartDetail, cartCount, subtotalCents,
    addToCart, removeFromCart, setQty, clearCart,
    bundleReward, setBundleReward, discountCents,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
