import { mollie, json } from "./_lib.js";

export async function onRequestGet({ request, env }) {
  const ref = new URL(request.url).searchParams.get("ref");
  if (!/^tr_[A-Za-z0-9]+$/.test(ref ?? "")) return json({ error: "bad ref" }, 400);
  try {
    const payment = await mollie(env, `/payments/${ref}`);
    return json({ status: payment.status });
  } catch {
    return json({ error: "unknown ref" }, 404);
  }
}
