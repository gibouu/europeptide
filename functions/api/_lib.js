// Shared helpers for Cloudflare Pages Functions (the production payment API).
// Mirrors server/index.mjs (local dev). Stateless: the Mollie payment id is
// the order ref — no KV needed until orders move to Supabase (issue #1).

import { PRODUCTS } from "../../src/data/products.js";

// Mirrors the `rewards` table in supabase/schema.sql.
export const REWARDS = {
  "10pct": { pct: 10 },
  "15pct": { pct: 15 },
  "ship":  { pct: 0 },
  "20pct": { pct: 20 },
};

export const mollie = async (env, path, init = {}) => {
  const res = await fetch(`https://api.mollie.com/v2${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.MOLLIE_API_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const body = res.status === 204 ? {} : await res.json();
  if (!res.ok) throw new Error(`Mollie ${res.status}: ${body.detail ?? body.title ?? "error"}`);
  return body;
};

export const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

// Recompute the total from the canonical product list — client-sent prices
// are never trusted; the reward only applies to a qualifying (>=3 item) cart.
export function priceCart(items, rewardId) {
  if (!Array.isArray(items) || items.length === 0) throw new Error("empty cart");
  let subtotal = 0, qtyTotal = 0;
  const lines = [];
  for (const { slug, qty } of items) {
    const product = PRODUCTS.find((p) => p.slug === slug);
    const q = Math.floor(Number(qty));
    if (!product || q < 1 || q > 50) throw new Error(`bad item: ${slug}`);
    subtotal += product.priceCents * q;
    qtyTotal += q;
    lines.push(`${q}x ${product.catNo}`);
  }
  const reward = rewardId ? REWARDS[rewardId] : null;
  const discount = reward && qtyTotal >= 3 ? Math.round((subtotal * reward.pct) / 100) : 0;
  return { totalCents: subtotal - discount, discount, description: `EUROPEPTIDE ${lines.join(", ")}`.slice(0, 255) };
}
