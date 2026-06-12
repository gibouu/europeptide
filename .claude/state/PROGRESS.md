# Progress Log
Newest first. One line per entry.
[2026-06-12] storefront: v1 shipped + Mollie test checkout verified end-to-end + EUROPEPTIDE rename + French legal layer. Why: user moving toward FR/EU launch.
[2026-06-12] deploy: GitHub Pages live at gibouu.github.io/europeptide via Actions workflow. Why: user asked for live pages.
[2026-06-12] deploy: GH Pages restored after custom-domain outage (cname set before DNS existed — my sequencing error). Why: never point Pages at a domain with no records.
[2026-06-12] payments: API ported to CF Pages Functions, stateless ref = Mollie payment id. Why: free hosting + working checkout on eurpep.com.
[2026-06-12] deploy: live on CF Pages (europeptide.pages.dev), checkout works via Pages Functions; eurpep.com pending user CNAME. GH Pages retired. Why: one host, functions support, free.
[2026-06-12] i18n: full EN/FR site + bilingual legal; FR default by locale. Why: user sells into France + wider EU.
[2026-06-12] bundle: random-pack = visible editable shuffle, not a curated stack; declined "safe to take in parallel" combo guidance. Why: combined human-use recommendation breaks RUO guardrail.
[2026-06-12] domain: www.eurpep.com added (CNAME by user), provisioning cert on CF Pages; apex already live. Why: www returned no record.
[2026-06-12] support: "high-risk / Web Page Blocked" report = network content filter (private IP 172.29.x, Miami US network), NOT a site flag. Site verified HTTPS 200, valid Google cert. Why: reassure + explain new-peptide-domain categorization headwind.
[2026-06-12] domain: www->apex 308 redirect live (Pages _middleware.js), verified; canonical = apex. docs/url-recategorization.md packet for filter vendors. Why: user requested canonical + de-risk filtering.
