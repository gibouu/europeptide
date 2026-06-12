# EUROPEPTIDE — research reagent storefront

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
cp .env.example .env   # then set MOLLIE_API_KEY (test_... key in dev)
npm run server         # payment API on :3001
npm run dev            # site on :5173 (proxies /api to the server)
```

## Adding your own clips / images (4 media slots)

The site has **four labelled media slots** ready for your own animations or images
(no syringes — bring compliant clips). They show a dashed placeholder until filled.

| slot id     | where it appears            | shape    |
|-------------|-----------------------------|----------|
| `hero`      | Home, under the headline    | 16:10    |
| `process`   | Home, on the dark lab band  | 4:3      |
| `bundle`    | Bundle lab header           | 21:9     |
| `catalogue` | Catalogue header            | 21:9     |

To fill one:

1. Drop your file in **`public/media/`** (e.g. `public/media/hero.mp4`).
2. Open **`src/data/media.js`** and set that slot's `src` to the path, e.g.
   `src: "/media/hero.mp4"`. For video you may also set `poster: "/media/hero.jpg"`.
3. `npm run deploy`.

Supported: `.mp4` / `.webm` (autoplay, muted, looped) and `.jpg` / `.png` / `.webp`.
Keep files under ~5 MB and match the slot's aspect ratio. That one file is the only
place you edit — no code changes needed.

## Deployment (Cloudflare Pages)

Live at **https://europeptide.pages.dev** (custom domain: **eurpep.com**). The payment API runs as
Pages Functions (`functions/api/`), so checkout works on the live site; `MOLLIE_API_KEY` is an
encrypted Pages secret (`wrangler pages secret put MOLLIE_API_KEY --project-name europeptide`).

```sh
npm run deploy   # build with root base + wrangler pages deploy
```

GitHub Pages was retired in favour of Cloudflare (single host, functions support).

## Payments (Mollie)

`server/index.mjs` is a small Node server that creates Mollie payments. The flow:
cart → `POST /api/create-payment` (slugs + quantities + reward id only) → server recomputes the
total from the canonical product list, validates the reward, creates the Mollie payment →
browser redirects to Mollie checkout → Mollie redirects back to `/payment/return?ref=…` which
polls `GET /api/payment-status`.

- **The API key never ships to the client or the repo** — it lives in `.env` (gitignored). The
  live key only ever goes into the production host's secret store.
- Client-sent prices are never trusted; amounts are computed server-side.
- The webhook (`POST /api/webhooks/mollie`) re-fetches the payment by id and is only registered
  when `PUBLIC_URL` is set (Mollie can't reach localhost). Order persistence + fulfilment hooks
  move to Supabase in production (issues #1–#2).

## What's implemented

- **Gate** — age (21+) + research-use declaration interstitial; blocks the app until accepted;
  legal pages remain readable pre-consent. Stored in localStorage for now.
- **Home** — hero, category marquee, featured products, before/after slider demo (illustrative
  culture-well SVGs), bundle teaser.
- **Catalogue** — all 30 compounds across 9 categories, filterable.
- **Product detail** — reagent-framed specs, price, add to cart, RUO notice.
- **Bundle lab** — pick exactly 3 compounds → confirm → pack-opening card flip reveals the bundle
  bonus (10%/15%/20% off or free shipping) with a confetti burst.
- **Cart** — quantities, bundle bonus line, total, live Mollie checkout (test mode).
- **Legal** — CGV, Politique de confidentialité, Clause de non-responsabilité, Politique cookies,
  Mentions légales, Retours & remboursements, Livraison — French-market templates with highlighted
  `[placeholders]` and a visible template notice on every page. Coverage modeled on what French
  research-reagent suppliers publish, written fresh for this site (not copied). Deliberate
  divergence: no blanket "all sales final" clause — EU consumers keep the 14-day withdrawal right
  with the sealed-goods exemption (Art. 16(e), Directive 2011/83/EU).
- **Cookie banner** — opt-in, nothing pre-ticked, reject-all equal prominence, granular option.

## Production wiring (not yet done)

1. **Supabase** — create a project, run `supabase/schema.sql`, seed `products` from
   `src/data/products.js`, switch the frontend to read from the `products` table.
2. **Reward roll** — deploy `supabase/functions/roll-reward` and replace `rollRewardDev()` in
   `src/pages/BundleBuilder.jsx` with a call to it. The client-side roll is dev-only scaffolding;
   odds and outcomes must be decided server-side and recorded on the order.
3. **Consent log** — once auth exists, also insert the gate declaration into `consent_log`
   (localStorage is not an audit trail).
4. **Mollie in production** — deploy `server/index.mjs` (or port it to a Supabase Edge Function),
   set `PUBLIC_URL` so webhooks register, persist orders to the `orders` table, take the reward
   from the order row written by `roll-reward`, and supply the live key via the host's secret
   store only.
5. **Margin check** — before going live, model the reward table against your cheapest 3-item
   bundle so the worst-case 20% reward still clears the target margin (weights live in the
   `rewards` table so they can be tuned without a deploy).
6. **Prices** — all `priceCents` values are placeholders.

## Stack

Vite · React 19 · Tailwind CSS v4 (`@tailwindcss/vite`) · Framer Motion · React Router ·
Supabase (Postgres + RLS + Edge Functions) · Mollie Payments (test mode wired)
