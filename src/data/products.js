// Product catalogue — seed data mirroring supabase/schema.sql `products`.
// All copy is reagent-framed: properties of the compound as a research material.
// No dosing, administration, or human-use language anywhere in this file.
// Prices are placeholders (cents) — set real prices in Supabase before launch.

export const CATEGORIES = [
  "Weight Loss & Metabolism",
  "Tissue Recovery & Repair",
  "Skin, Hair & Beauty",
  "Growth Hormone & Muscle",
  "Anti-Inflammatory & Immunity",
  "Anti-Aging & Longevity",
  "Sleep & Circadian Rhythm",
  "Cognition & Mental Health",
  "Sexual Health & Libido",
];

let n = 0;
const cat = () => `VW-${String(++n).padStart(4, "0")}`;

export const PRODUCTS = [
  // Weight Loss & Metabolism
  { slug: "glp-3-rt", catNo: cat(), name: "GLP-3 (RT)", category: CATEGORIES[0], sizeMg: "10 / 20 / 30 mg", priceCents: 18900, tagline: "Triple-action metabolic research compound", bullets: ["GLP-1 + GIP + glucagon receptor agonist", "Lyophilized powder, ≥99% purity (HPLC)", "Supplied with certificate of analysis"] },
  { slug: "mots-c", catNo: cat(), name: "MOTS-c", category: CATEGORIES[0], sizeMg: "10 mg", priceCents: 6900, tagline: "Mitochondrial-derived peptide", bullets: ["AMPK-pathway research applications", "16 amino acid sequence", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "aod-9604", catNo: cat(), name: "AOD-9604", category: CATEGORIES[0], sizeMg: "5 mg", priceCents: 5900, tagline: "GH fragment (aa 176–191)", bullets: ["Lipolysis research applications", "Modified C-terminal hGH fragment", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "cagrilintide", catNo: cat(), name: "Cagrilintide", category: CATEGORIES[0], sizeMg: "5 mg", priceCents: 12900, tagline: "Long-acting amylin analog", bullets: ["Amylin-receptor research", "Lipidated analog, extended stability", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "5-amino-1mq", catNo: cat(), name: "5-Amino-1MQ", category: CATEGORIES[0], sizeMg: "50 mg", priceCents: 7900, tagline: "Selective NNMT inhibitor", bullets: ["Small-molecule NNMT research", "Membrane-permeable", "≥99% purity (HPLC)"] },

  // Tissue Recovery & Repair
  { slug: "bpc-157", catNo: cat(), name: "BPC-157", category: CATEGORIES[1], sizeMg: "5 mg", priceCents: 5500, tagline: "Pentadecapeptide for tissue-repair research", bullets: ["15 amino acid synthetic fragment", "Angiogenesis & cytoprotection research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "glow-blend", catNo: cat(), name: "GLOW (BPC-157 + TB-500 + GHK-Cu)", category: CATEGORIES[1], sizeMg: "70 mg", priceCents: 14900, tagline: "Triple regenerative research blend", bullets: ["Three-compound co-formulation", "Tissue-repair pathway research", "Lyophilized blend, batch-tested"] },
  { slug: "klow-blend", catNo: cat(), name: "KLOW (GLOW + KPV)", category: CATEGORIES[1], sizeMg: "80 mg", priceCents: 16900, tagline: "Quad regenerative + anti-inflammatory blend", bullets: ["Four-compound co-formulation", "Inflammation-pathway research", "Lyophilized blend, batch-tested"] },
  { slug: "wolverine-stack", catNo: cat(), name: "BPC-157 / TB-500 (Wolverine)", category: CATEGORIES[1], sizeMg: "10 / 10 mg", priceCents: 10900, tagline: "Recovery research stack", bullets: ["Equal-ratio two-compound blend", "Tissue-repair pathway research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "tb-500", catNo: cat(), name: "TB-500", category: CATEGORIES[1], sizeMg: "5 mg", priceCents: 6500, tagline: "Thymosin Beta-4 fragment (43 aa)", bullets: ["Actin-binding research peptide", "Cell-migration studies", "Lyophilized, ≥99% purity (HPLC)"] },

  // Skin, Hair & Beauty
  { slug: "ghk-cu", catNo: cat(), name: "GHK-Cu", category: CATEGORIES[2], sizeMg: "100 mg", priceCents: 7500, tagline: "Copper tripeptide", bullets: ["Skin & tissue research applications", "Copper-bound tripeptide complex", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "melanotan-1", catNo: cat(), name: "Melanotan I (Afamelanotide)", category: CATEGORIES[2], sizeMg: "10 mg", priceCents: 8500, tagline: "Alpha-MSH analog", bullets: ["Melanogenesis research", "Linear 13-residue analog", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "snap-8", catNo: cat(), name: "SNAP-8", category: CATEGORIES[2], sizeMg: "10 mg", priceCents: 4900, tagline: "Octapeptide for topical research", bullets: ["SNARE-complex research", "Cosmetic-science applications", "Lyophilized, ≥98% purity (HPLC)"] },

  // Growth Hormone & Muscle
  { slug: "tesamorelin", catNo: cat(), name: "Tesamorelin", category: CATEGORIES[3], sizeMg: "10 mg", priceCents: 11900, tagline: "GHRH analog", bullets: ["Stabilized 44-residue analog", "GH-axis research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "cjc-1295-ipamorelin", catNo: cat(), name: "CJC-1295 / Ipamorelin (No DAC)", category: CATEGORIES[3], sizeMg: "5 / 5 mg", priceCents: 9900, tagline: "GH secretagogue research blend", bullets: ["Two-compound co-formulation", "GHRH + ghrelin-receptor research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "ipamorelin", catNo: cat(), name: "Ipamorelin", category: CATEGORIES[3], sizeMg: "5 mg", priceCents: 5900, tagline: "GH secretagogue", bullets: ["Selective ghrelin-receptor pentapeptide", "GH-axis research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "igf-1-lr3", catNo: cat(), name: "IGF-1 LR3", category: CATEGORIES[3], sizeMg: "1 mg", priceCents: 13900, tagline: "Long-acting IGF-1 analog", bullets: ["83-residue analog, reduced IGFBP binding", "Growth-factor signaling research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "sermorelin", catNo: cat(), name: "Sermorelin", category: CATEGORIES[3], sizeMg: "12 mg", priceCents: 8900, tagline: "GHRH (first 29 aa)", bullets: ["GRF(1-29) fragment", "GH-axis research", "Lyophilized, ≥99% purity (HPLC)"] },

  // Anti-Inflammatory & Immunity
  { slug: "kpv", catNo: cat(), name: "KPV", category: CATEGORIES[4], sizeMg: "10 mg", priceCents: 5500, tagline: "Alpha-MSH fragment", bullets: ["C-terminal tripeptide", "Inflammation-pathway research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "thymosin-alpha-1", catNo: cat(), name: "Thymosin Alpha-1", category: CATEGORIES[4], sizeMg: "10 mg", priceCents: 9900, tagline: "Thymic peptide", bullets: ["28-residue immunomodulation research peptide", "Immune-signaling studies", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "ll-37", catNo: cat(), name: "LL-37", category: CATEGORIES[4], sizeMg: "4 mg", priceCents: 10900, tagline: "Human cathelicidin", bullets: ["Antimicrobial-peptide research", "37-residue amphipathic helix", "Lyophilized, ≥95% purity (HPLC)"] },

  // Anti-Aging & Longevity
  { slug: "nad-plus", catNo: cat(), name: "NAD+", category: CATEGORIES[5], sizeMg: "500 / 1000 mg", priceCents: 8900, tagline: "Cellular-energy research", bullets: ["Nicotinamide adenine dinucleotide", "Redox & metabolism research", "≥99% purity"] },
  { slug: "glutathione", catNo: cat(), name: "Glutathione", category: CATEGORIES[5], sizeMg: "600 mg", priceCents: 5900, tagline: "Master antioxidant (GSH tripeptide)", bullets: ["Reduced-form tripeptide", "Oxidative-stress research", "≥99% purity"] },
  { slug: "epithalon", catNo: cat(), name: "Epithalon", category: CATEGORIES[5], sizeMg: "10 mg", priceCents: 6500, tagline: "Telomerase research peptide", bullets: ["Synthetic tetrapeptide (AEDG)", "Telomere-biology research", "Lyophilized, ≥99% purity (HPLC)"] },

  // Sleep & Circadian Rhythm
  { slug: "dsip", catNo: cat(), name: "DSIP", category: CATEGORIES[6], sizeMg: "5 mg", priceCents: 5500, tagline: "Delta sleep-inducing nonapeptide", bullets: ["9-residue neuropeptide", "Circadian-biology research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "pinealon", catNo: cat(), name: "Pinealon", category: CATEGORIES[6], sizeMg: "10 mg", priceCents: 5900, tagline: "Pineal neuropeptide", bullets: ["Synthetic tripeptide (EDR)", "Neuro-regulation research", "Lyophilized, ≥99% purity (HPLC)"] },

  // Cognition & Mental Health
  { slug: "selank", catNo: cat(), name: "Selank", category: CATEGORIES[7], sizeMg: "12 mg", priceCents: 6900, tagline: "Anxiolytic research peptide", bullets: ["Tuftsin-analog heptapeptide", "Neuro-signaling research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "semax", catNo: cat(), name: "Semax", category: CATEGORIES[7], sizeMg: "12 mg", priceCents: 6900, tagline: "Nootropic research peptide", bullets: ["ACTH(4-7) analog heptapeptide", "Neurotrophin research", "Lyophilized, ≥99% purity (HPLC)"] },

  // Sexual Health & Libido
  { slug: "melanotan-2", catNo: cat(), name: "Melanotan II (MT2)", category: CATEGORIES[8], sizeMg: "10 mg", priceCents: 5900, tagline: "Alpha-MSH analog", bullets: ["Cyclic heptapeptide analog", "Melanogenesis research", "Lyophilized, ≥99% purity (HPLC)"] },
  { slug: "pt-141", catNo: cat(), name: "PT-141 (Bremelanotide)", category: CATEGORIES[8], sizeMg: "10 mg", priceCents: 6900, tagline: "Melanocortin MC4R agonist", bullets: ["Cyclic heptapeptide", "Melanocortin-receptor research", "Lyophilized, ≥99% purity (HPLC)"] },
];

export const bySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const formatPrice = (cents) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(cents / 100);
