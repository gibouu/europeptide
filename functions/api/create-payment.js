import { mollie, json, priceCart } from "./_lib.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { items, rewardId } = await request.json();
    const origin = new URL(request.url).origin; // never trust a client-sent origin
    const { totalCents, discount, description } = priceCart(items, rewardId);

    const payment = await mollie(env, "/payments", {
      method: "POST",
      body: JSON.stringify({
        amount: { currency: "EUR", value: (totalCents / 100).toFixed(2) },
        description,
        redirectUrl: `${origin}/payment/return`,
        webhookUrl: `${origin}/api/webhooks/mollie`,
        metadata: { rewardId: rewardId ?? null, discountCents: discount },
      }),
    });

    // Put the payment id in the return URL so status polling works without
    // storage (Mollie allows updating an open payment's redirectUrl).
    await mollie(env, `/payments/${payment.id}`, {
      method: "PATCH",
      body: JSON.stringify({ redirectUrl: `${origin}/payment/return?ref=${payment.id}` }),
    }).catch(() => {}); // non-fatal: client also keeps the ref in localStorage

    return json({ checkoutUrl: payment._links.checkout.href, ref: payment.id });
  } catch (err) {
    const msg = String(err.message ?? err);
    return json({ error: msg }, /^(empty cart|bad item)/.test(msg) ? 400 : 500);
  }
}
