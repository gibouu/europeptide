// roll-reward — rolls the bundle bonus SERVER-SIDE and records it on the
// order, so odds and outcomes can't be tampered with from the client
// (build spec §5). Deploy: supabase functions deploy roll-reward
//
// POST { order_id: uuid }  ->  { id, label, detail, rarity, pct }

import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { order_id } = await req.json();
  if (!order_id) return Response.json({ error: "order_id required" }, { status: 400 });

  // One roll per order — never re-roll an order that already has a reward.
  const { data: order, error: orderErr } = await supabase
    .from("orders").select("id, reward_label, subtotal_cents").eq("id", order_id).single();
  if (orderErr || !order) return Response.json({ error: "order not found" }, { status: 404 });
  if (order.reward_label) return Response.json({ error: "already rolled" }, { status: 409 });

  const { data: rewards, error: rewardsErr } = await supabase
    .from("rewards").select("*").eq("active", true);
  if (rewardsErr || !rewards?.length) return Response.json({ error: "no rewards configured" }, { status: 500 });

  const total = rewards.reduce((s, r) => s + r.weight, 0);
  let roll = crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff * total;
  const won = rewards.find((r) => (roll -= r.weight) <= 0) ?? rewards[0];

  const discount = Math.round((order.subtotal_cents ?? 0) * won.pct / 100);
  await supabase.from("orders")
    .update({ reward_label: won.label, discount_cents: discount })
    .eq("id", order_id);

  return Response.json({ id: won.id, label: won.label, detail: won.detail, rarity: won.rarity, pct: won.pct });
});
