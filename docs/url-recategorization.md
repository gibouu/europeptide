# URL re-categorization — getting eurpep.com out of "high-risk" filters

**Why:** brand-new domains, especially peptide/research-chemical ones, get auto-sorted
into "high-risk / uncategorized" by enterprise and network URL filters (the kind that
produced the "Web Page Blocked" screen). Submitting the domain to the major filter
vendors for review fixes most of them. It also improves on its own as the domain ages.

These are captcha-gated web forms — they have to be submitted by hand (a few minutes
total). For each: look up `eurpep.com`, then request the category below.

**Category to request (use the same everywhere for consistency):**
> **Shopping** (online retailer). If a "Shopping" option isn't offered, use
> **Business / Health & Medicine**. In the comment box:
> *"Legitimate e-commerce site selling laboratory research reagents. Not malware,
> phishing, or illegal content. Please re-categorize from high-risk."*

| Vendor | Submission URL | Notes |
|---|---|---|
| **Cisco Talos / Umbrella** | https://talosintelligence.com/reputation_center | Search the domain → "Submit a Dispute" (free Cisco account needed). Umbrella is the most common corporate filter. |
| **Fortinet FortiGuard** | https://www.fortiguard.com/webfilter | Look up domain → "Request Review" / submit rating change. |
| **Palo Alto Networks** | https://urlfiltering.paloaltonetworks.com/ | "Test A Site" → submit a Change Request with the new category. |
| **Zscaler** | https://sitereview.zscaler.com/ | Look up → submit category review. |
| **Symantec / Broadcom WebPulse** | https://sitereview.bluecoat.com/ | Look up → "Request a Re-evaluation". |

**Also worth doing (SEO + reputation, not filter-related):**
- Verify the domain in **Google Search Console** (https://search.google.com/search-console)
  — confirms Google sees no security issues and helps indexing.
- Check **Google Safe Browsing** status: https://transparencyreport.google.com/safe-browsing/search?url=eurpep.com
  (currently clean — no action needed unless that changes).

**Re-check after ~1–2 weeks.** Most vendors review within a few business days. Filters
on individual corporate/school networks may still block by their own policy — that part
is the network admin's decision, not something a re-categorization can override.
