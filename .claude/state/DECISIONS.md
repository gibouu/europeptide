# Decisions
One line per decision. Format: [YYYY-MM-DD] area: decision. Why: reason.
[2026-06-12] payments: Mollie via local Node server (server/index.mjs), amounts server-side only. Why: API key must never reach client/public repo.
[2026-06-12] legal: French templates written fresh, coverage modeled on frenchpeptides.com; kept 14-day withdrawal + sealed-goods exemption. Why: verbatim copy = copyright + likely-unlawful "all sales final" clause.
[2026-06-12] content: declined AI "transformation" videos (self-injection + body results). Why: human-use depiction breaks firm RUO guardrails.
[2026-06-12] hosting: Cloudflare Pages over GH Pages. Why: Pages Functions run the payment API; domain same account.
[2026-06-12] domain: canonical = apex (eurpep.com); www 308-redirects via CF Pages _middleware.js. Why: app-level redirect needs no DNS/zone write scope.
