# VIALWORKS — research reagent storefront

React + Vite + Tailwind v4 + Framer Motion storefront for laboratory research reagents, built from
the build spec (`docs/` in the original conversation). Supabase schema and a server-side reward
Edge Function are included but not yet wired; the frontend runs standalone on seed data.

## Non-negotiable product rules

These come from the build spec and must survive every future change:

- **No mystery products.** The buyer always chooses exactly what they purchase. The pack-opening
  animation only ever reveals a **discount or freebie** on a bundle the buyer already selected —
  never which compound they receive.
- **No dosing or human-use content.** All product copy is reagent-framed (compound properties,
  purity, research context). No administration, dosing, titration, or results language anywhere.
- **No medical claims.** The before/after slider uses neutral illustrative imagery (a stylised
  culture well at two timepoints) and is never captioned with results attributed to a compound.
- The age + research-use gate and the legal pages are **necessary but not sufficient**: a consent
  gate and privacy policy do not by themselves make selling these compounds to a given buyer in a
  given country lawful. Confirming what may lawfully be sold, to whom, and under what
  authorisations is the owner's responsibility — get a lawyer in each destination market before
  launch.

## Run it

```sh
npm install
npm run dev
```

## What's implemented

- **Gate** — age (21+) + research-use declaration interstitial; blocks the app until accepted;
  legal pages remain readable pre-consent. Stored in localStorage for now.
- **Home** — hero, category marquee, featured products, before/after slider demo (illustrative
  culture-well SVGs), bundle teaser.
- **Catalogue** — all 30 compounds across 9 categories, filterable.
- **Product detail** — reagent-framed specs, price, add to cart, RUO notice.
- **Bundle lab** — pick exactly 3 compounds → confirm → pack-opening card flip reveals the bundle
  bonus (10%/15%/20% off or free shipping) with a confetti burst.
- **Cart** — quantities, bundle bonus line, total. Checkout button is a stub (see below).
- **Legal** — Privacy, Terms, Disclaimer, Cookies, Imprint, Returns as GDPR-shaped templates with
  highlighted `[placeholders]` and a visible template notice on every page.
- **Cookie banner** — opt-in, nothing pre-ticked, reject-all equal prominence, granular option.

## Production wiring (not yet done)

1. **Supabase** — create a project, run `supabase/schema.sql`, seed `products` from
   `src/data/products.js`, switch the frontend to read from the `products` table.
2. **Reward roll** — deploy `supabase/functions/roll-reward` and replace `rollRewardDev()` in
   `src/pages/BundleBuilder.jsx` with a call to it. The client-side roll is dev-only scaffolding;
   odds and outcomes must be decided server-side and recorded on the order.
3. **Consent log** — once auth exists, also insert the gate declaration into `consent_log`
   (localStorage is not an audit trail).
4. **Stripe** — add a `create-checkout-session` Edge Function (cart → Stripe Checkout session,
   amounts computed server-side from the `products` table, discount from the order's rolled
   reward) and point the Cart checkout button at it. Never trust client-side prices.
5. **Margin check** — before going live, model the reward table against your cheapest 3-item
   bundle so the worst-case 20% reward still clears the target margin (weights live in the
   `rewards` table so they can be tuned without a deploy).
6. **Prices** — all `priceCents` values are placeholders.

## Stack

Vite · React 19 · Tailwind CSS v4 (`@tailwindcss/vite`) · Framer Motion · React Router ·
Supabase (Postgres + RLS + Edge Functions) · Stripe Checkout (planned)
