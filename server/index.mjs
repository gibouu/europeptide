// EUROPEPTIDE payment server — Mollie integration.
// Run: npm run server  (reads MOLLIE_API_KEY from .env via --env-file)
//
// All amounts are computed HERE from the canonical product list; client-sent
// prices are never trusted. The reward discount is validated against the
// server's reward table and only applied to a qualifying (>=3 item) cart.
// In production this moves behind Supabase (orders persisted, reward taken
// from the order row written by roll-reward) — see issues #1–#3.

import { createServer } from "node:http";
import { PRODUCTS } from "../src/data/products.js";

const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;
const PORT = Number(process.env.PORT ?? 3001);
const PUBLIC_URL = process.env.PUBLIC_URL; // unset in dev — Mollie can't reach localhost

if (!MOLLIE_API_KEY) {
  console.error("MOLLIE_API_KEY missing — copy .env.example to .env and set it.");
  process.exit(1);
}

// Mirrors the `rewards` table in supabase/schema.sql.
const REWARDS = {
  "10pct": { pct: 10 },
  "15pct": { pct: 15 },
  "ship":  { pct: 0 },
  "20pct": { pct: 20 },
};

const mollie = async (path, init = {}) => {
  const res = await fetch(`https://api.mollie.com/v2${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${MOLLIE_API_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Mollie ${res.status}: ${body.detail ?? body.title ?? "error"}`);
  return body;
};

const readBody = (req) =>
  new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
  });

const json = (res, status, obj) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  try {
    if (req.method === "POST" && url.pathname === "/api/create-payment") {
      const { items, rewardId, origin } = JSON.parse(await readBody(req) || "{}");

      if (!Array.isArray(items) || items.length === 0) return json(res, 400, { error: "empty cart" });
      if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) && origin !== PUBLIC_URL)
        return json(res, 400, { error: "bad origin" });

      let subtotal = 0;
      let qtyTotal = 0;
      const lines = [];
      for (const { slug, qty } of items) {
        const product = PRODUCTS.find((p) => p.slug === slug);
        const q = Math.floor(Number(qty));
        if (!product || q < 1 || q > 50) return json(res, 400, { error: `bad item: ${slug}` });
        subtotal += product.priceCents * q;
        qtyTotal += q;
        lines.push(`${q}x ${product.catNo}`);
      }

      const reward = rewardId ? REWARDS[rewardId] : null;
      const discount = reward && qtyTotal >= 3 ? Math.round((subtotal * reward.pct) / 100) : 0;
      const totalCents = subtotal - discount;

      const payment = await mollie("/payments", {
        method: "POST",
        body: JSON.stringify({
          amount: { currency: "EUR", value: (totalCents / 100).toFixed(2) },
          description: `EUROPEPTIDE ${lines.join(", ")}`.slice(0, 255),
          redirectUrl: `${origin}/payment/return`,
          ...(PUBLIC_URL ? { webhookUrl: `${PUBLIC_URL}/api/webhooks/mollie` } : {}),
          metadata: { rewardId: rewardId ?? null, discountCents: discount },
        }),
      });

      // The payment id is the order ref — patch it into the return URL so
      // status polling needs no storage (matches functions/api/, the CF port).
      await mollie(`/payments/${payment.id}`, {
        method: "PATCH",
        body: JSON.stringify({ redirectUrl: `${origin}/payment/return?ref=${payment.id}` }),
      }).catch(() => {}); // non-fatal: client also keeps the ref in localStorage

      return json(res, 200, { checkoutUrl: payment._links.checkout.href, ref: payment.id });
    }

    if (req.method === "GET" && url.pathname === "/api/payment-status") {
      const ref = url.searchParams.get("ref");
      if (!/^tr_[A-Za-z0-9]+$/.test(ref ?? "")) return json(res, 400, { error: "bad ref" });
      const payment = await mollie(`/payments/${ref}`).catch(() => null);
      if (!payment) return json(res, 404, { error: "unknown ref" });
      return json(res, 200, { status: payment.status }); // open|pending|paid|canceled|expired|failed
    }

    if (req.method === "POST" && url.pathname === "/api/webhooks/mollie") {
      // Mollie posts `id=tr_xxx` form-encoded; always re-fetch, never trust the body.
      const id = new URLSearchParams(await readBody(req)).get("id");
      if (id) {
        const payment = await mollie(`/payments/${id}`);
        console.log(`[webhook] ${id} -> ${payment.status}`);
        // production: update the order row + trigger fulfilment here
      }
      res.writeHead(200);
      return res.end("ok");
    }

    if (req.method === "GET" && url.pathname === "/api/health") {
      return json(res, 200, { ok: true });
    }

    json(res, 404, { error: "not found" });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: String(err.message ?? err) });
  }
}).listen(PORT, () => console.log(`payment server on :${PORT}`));
