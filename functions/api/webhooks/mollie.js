import { mollie } from "../_lib.js";

// Mollie posts `id=tr_xxx` form-encoded; always re-fetch, never trust the body.
export async function onRequestPost({ request, env }) {
  const id = new URLSearchParams(await request.text()).get("id");
  if (id && /^tr_[A-Za-z0-9]+$/.test(id)) {
    const payment = await mollie(env, `/payments/${id}`).catch(() => null);
    if (payment) console.log(`[webhook] ${id} -> ${payment.status}`);
    // production: update the order row + trigger fulfilment (issue #1)
  }
  return new Response("ok");
}
