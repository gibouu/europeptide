import { createContext, useContext, useEffect, useState } from "react";

// Lightweight EN/FR i18n. t("a.b") resolves from the dictionary for the
// active language; missing keys fall back to EN, then to the key itself.

const DICT = {
  en: {
    nav: { catalogue: "Catalogue", bundle: "Bundle lab", cart: "Cart", ruo: "For laboratory research use only — not for human or veterinary use", tagline: "research reagents" },
    gate: {
      label: "Access declaration", title: "Research use only.",
      age: "I am <b>21 or older</b>.",
      research: "I work in a <b>scientific research capacity</b> (laboratory, institute, R&D) and am purchasing these compounds for <b>in-vitro use only</b>. No human, veterinary, or diagnostic use is intended.",
      enter: "Enter catalogue →",
      fine: "Products on this site are supplied strictly as research reagents. They have not been evaluated by the FDA, EMA, or any national health authority, and are not medicines, foods, supplements, or cosmetics. You are responsible for the truth of the declarations above. See our",
      disclaimer: "Disclaimer", terms: "Terms", and: "and", leave: "Not you? Leave this site",
    },
    home: {
      kicker: "Catalogue 2026 · 30 reference compounds",
      h1a: "Research reagents,", h1b: "catalogued", h1c: "with care.",
      sub: "Batch-tested peptides and research compounds for laboratory use. Every vial ships with a certificate of analysis. In-vitro research use only.",
      browse: "Browse catalogue", build: "Build a bundle ⚗",
      featured: "Frequently catalogued", all: "All 30 →",
      demoKicker: "Interactive demo", demoTitle1: "Compare timepoints,", demoTitle2: "drag the line.",
      demoBody: "A stylised culture well observed at two timepoints — an illustration of how comparison imaging is read in the lab. Illustrative only; not data from, or a claim about, any listed compound.",
      t0: "T = 0 h", t48: "T + 48 h",
      teaserKicker: "The fun part", teaserTitle1: "Pick three. Open the box.", teaserTitle2: "See what bonus landed.",
      teaserBody: "Choose any three compounds for your bundle — you always know exactly what you're buying. The mystery is the bonus: open the box to reveal which discount or freebie you unlocked.",
    },
    catalogue: { label: "Catalogue", title: "All compounds", all: "All" },
    product: {
      add: "Add to cart", added: "Added ✓", viaBundle: "Add via bundle",
      ruoTitle: "Research use only",
      ruoBody: "Supplied strictly as a laboratory research reagent for in-vitro use. Not for human, veterinary, or diagnostic use. Not a medicine, food, supplement, or cosmetic. Not evaluated by the FDA, EMA, or any national health authority.",
      notFound: "Compound not found.", back: "Back to catalogue", lyo: "Lyophilized",
    },
    bundle: {
      label: "Bundle lab", title: "Pick any three.",
      intro: "You choose every compound — no surprises about what's in the box. Confirm your three, then open the box to reveal the bonus that landed on your bundle.",
      random: "⚄ Random pack", reroll: "⚄ Re-roll",
      randomNote: "Random picks are just a browsing shortcut — review the three compounds it chose and swap any of them before confirming. The grouping is not a statement about combined use. Research use only.",
      yours: "Your bundle", slot: "Slot", subtotal: "Subtotal",
      confirm: "Confirm & open box ⚗",
      note: "The box reveals a bundle bonus (discount or freebie). Your compounds are exactly the three you chose.",
      termsLink: "Terms",
      confirmedKicker: "Bundle confirmed", confirmedTitle: "Your three are locked in.",
      knowExactly: "You know exactly what you're getting — the box only hides your <b>bonus</b>.",
      bundleWord: "Bundle", withBonus: "with your bonus",
      addToCart: "Add bundle to cart →", rebuild: "Rebuild",
      tap: "Tap to open", bonusCard: "Your bundle bonus",
    },
    cart: {
      title: "Cart", emptyTitle: "Cart is empty.", emptySub: "Browse the catalogue or build a three-compound bundle.",
      subtotal: "Subtotal", bonus: "Bundle bonus", applied: "applied", total: "Total",
      checkout: "Checkout →", opening: "Opening secure checkout…", clear: "Clear cart",
      note: "By checking out you confirm the research-use declaration made at entry. All items are laboratory reagents for in-vitro use only.",
      serverHint: "is the payment server running? (npm run server)",
    },
    pay: {
      ref: "Order ref",
      checking: ["Checking your payment…", "One moment."],
      open: ["Payment in progress…", "Waiting for confirmation from the payment provider."],
      pending: ["Payment pending…", "Waiting for confirmation from the payment provider."],
      paid: ["Payment received. ✓", "Thank you — your order is confirmed. A confirmation email follows."],
      canceled: ["Payment canceled.", "No charge was made. Your cart is untouched."],
      expired: ["Payment expired.", "The checkout session timed out. Your cart is untouched."],
      failed: ["Payment failed.", "No charge was made. Please try again or use another method."],
      unknown: ["Status unknown.", "We couldn't verify this payment. If you were charged, contact support with your order reference."],
      backCat: "Back to catalogue", backCart: "Back to cart",
    },
    cookie: {
      label: "Cookies",
      body: "We use strictly necessary cookies to run the cart and remember your access declaration. Optional analytics cookies are used only with your consent.",
      policy: "Cookie Policy", necessary: "Strictly necessary (always on)", analytics: "Analytics",
      acceptAll: "Accept all", save: "Save choices", rejectAll: "Reject all", options: "Options",
    },
    footer: {
      blurb: "Laboratory research reagents. Every product on this site is supplied for in-vitro research use only and is not for human, veterinary, or diagnostic use.",
      legal: "Legal", notice: "Notice",
      noticeBody: "Products have not been evaluated by the FDA, EMA, or any national health authority. Statements on this site describe research context only and are not medical claims. Purchase requires the research-use declaration completed at entry.",
    },
    legal: {
      label: "Legal", notFound: "Document not found.",
      noticeTitle: "Template notice:",
      notice: "this document is a template. Highlighted fields must be completed, and the full set must be reviewed by a lawyer qualified in your destination market before launch. A privacy policy does not by itself make a given sale lawful — confirming what may lawfully be sold, to whom, and under what authorisations is the site owner's responsibility.",
    },
  },

  fr: {
    nav: { catalogue: "Catalogue", bundle: "Atelier packs", cart: "Panier", ruo: "Réservé à la recherche en laboratoire — usage humain ou vétérinaire interdit", tagline: "réactifs de recherche" },
    gate: {
      label: "Déclaration d'accès", title: "Recherche uniquement.",
      age: "J'ai <b>21 ans ou plus</b>.",
      research: "J'exerce une <b>activité de recherche scientifique</b> (laboratoire, institut, R&D) et j'achète ces composés pour un <b>usage in vitro uniquement</b>. Aucun usage humain, vétérinaire ou diagnostique n'est prévu.",
      enter: "Entrer dans le catalogue →",
      fine: "Les produits de ce site sont fournis strictement comme réactifs de recherche. Ils n'ont été évalués ni par la FDA, ni par l'EMA, ni par aucune autorité de santé nationale, et ne sont ni des médicaments, ni des aliments, ni des compléments, ni des cosmétiques. Vous êtes responsable de la véracité des déclarations ci-dessus. Voir notre",
      disclaimer: "Clause de non-responsabilité", terms: "CGV", and: "et nos", leave: "Ce n'est pas vous ? Quitter le site",
    },
    home: {
      kicker: "Catalogue 2026 · 30 composés de référence",
      h1a: "Des réactifs de recherche,", h1b: "catalogués", h1c: "avec soin.",
      sub: "Peptides et composés de recherche testés par lot, pour usage en laboratoire. Chaque flacon est livré avec son certificat d'analyse. Usage in vitro uniquement.",
      browse: "Parcourir le catalogue", build: "Composer un pack ⚗",
      featured: "Les plus catalogués", all: "Les 30 →",
      demoKicker: "Démo interactive", demoTitle1: "Comparez deux instants,", demoTitle2: "glissez la ligne.",
      demoBody: "Un puits de culture stylisé observé à deux instants — une illustration de la lecture d'images comparatives au laboratoire. Purement illustratif ; ni donnée ni allégation concernant un composé du catalogue.",
      t0: "T = 0 h", t48: "T + 48 h",
      teaserKicker: "La partie fun", teaserTitle1: "Choisissez-en trois. Ouvrez la boîte.", teaserTitle2: "Découvrez votre bonus.",
      teaserBody: "Composez votre pack de trois composés — vous savez toujours exactement ce que vous achetez. Le mystère, c'est le bonus : ouvrez la boîte pour révéler la remise ou le cadeau débloqué.",
    },
    catalogue: { label: "Catalogue", title: "Tous les composés", all: "Tous" },
    product: {
      add: "Ajouter au panier", added: "Ajouté ✓", viaBundle: "Ajouter via un pack",
      ruoTitle: "Recherche uniquement",
      ruoBody: "Fourni strictement comme réactif de laboratoire pour usage in vitro. Pas d'usage humain, vétérinaire ou diagnostique. Ni médicament, ni aliment, ni complément, ni cosmétique. Non évalué par la FDA, l'EMA ou une autorité de santé nationale.",
      notFound: "Composé introuvable.", back: "Retour au catalogue", lyo: "Lyophilisé",
    },
    bundle: {
      label: "Atelier packs", title: "Choisissez-en trois.",
      intro: "Vous choisissez chaque composé — aucune surprise sur le contenu de la boîte. Confirmez vos trois choix, puis ouvrez la boîte pour révéler le bonus de votre pack.",
      random: "⚄ Pack aléatoire", reroll: "⚄ Relancer",
      randomNote: "La sélection aléatoire n'est qu'un raccourci de navigation — vérifiez les trois composés proposés et remplacez-en autant que vous voulez avant de confirmer. Ce regroupement ne constitue pas une indication d'usage combiné. Recherche uniquement.",
      yours: "Votre pack", slot: "Emplacement", subtotal: "Sous-total",
      confirm: "Confirmer & ouvrir la boîte ⚗",
      note: "La boîte révèle un bonus de pack (remise ou cadeau). Vos composés sont exactement les trois que vous avez choisis.",
      termsLink: "CGV",
      confirmedKicker: "Pack confirmé", confirmedTitle: "Vos trois choix sont verrouillés.",
      knowExactly: "Vous savez exactement ce que vous recevez — la boîte ne cache que votre <b>bonus</b>.",
      bundleWord: "Pack", withBonus: "avec votre bonus",
      addToCart: "Ajouter le pack au panier →", rebuild: "Recomposer",
      tap: "Touchez pour ouvrir", bonusCard: "Votre bonus de pack",
    },
    cart: {
      title: "Panier", emptyTitle: "Panier vide.", emptySub: "Parcourez le catalogue ou composez un pack de trois composés.",
      subtotal: "Sous-total", bonus: "Bonus de pack", applied: "appliqué", total: "Total",
      checkout: "Paiement →", opening: "Ouverture du paiement sécurisé…", clear: "Vider le panier",
      note: "En payant, vous confirmez la déclaration d'usage recherche effectuée à l'entrée. Tous les articles sont des réactifs de laboratoire pour usage in vitro uniquement.",
      serverHint: "le serveur de paiement tourne-t-il ? (npm run server)",
    },
    pay: {
      ref: "Réf. commande",
      checking: ["Vérification du paiement…", "Un instant."],
      open: ["Paiement en cours…", "En attente de confirmation du prestataire de paiement."],
      pending: ["Paiement en attente…", "En attente de confirmation du prestataire de paiement."],
      paid: ["Paiement reçu. ✓", "Merci — votre commande est confirmée. Un email de confirmation suit."],
      canceled: ["Paiement annulé.", "Aucun débit effectué. Votre panier est intact."],
      expired: ["Session expirée.", "La session de paiement a expiré. Votre panier est intact."],
      failed: ["Paiement échoué.", "Aucun débit effectué. Réessayez ou utilisez un autre moyen."],
      unknown: ["Statut inconnu.", "Impossible de vérifier ce paiement. Si vous avez été débité, contactez le support avec votre référence."],
      backCat: "Retour au catalogue", backCart: "Retour au panier",
    },
    cookie: {
      label: "Cookies",
      body: "Nous utilisons des cookies strictement nécessaires pour le panier et votre déclaration d'accès. Les cookies de mesure d'audience ne sont déposés qu'avec votre consentement.",
      policy: "Politique cookies", necessary: "Strictement nécessaires (toujours actifs)", analytics: "Mesure d'audience",
      acceptAll: "Tout accepter", save: "Enregistrer", rejectAll: "Tout refuser", options: "Options",
    },
    footer: {
      blurb: "Réactifs de recherche en laboratoire. Chaque produit de ce site est fourni pour un usage de recherche in vitro uniquement — pas d'usage humain, vétérinaire ou diagnostique.",
      legal: "Légal", notice: "Avertissement",
      noticeBody: "Les produits n'ont été évalués par aucune autorité de santé (FDA, EMA, ANSM). Les contenus de ce site décrivent un contexte de recherche et ne sont pas des allégations médicales. L'achat requiert la déclaration d'usage recherche effectuée à l'entrée.",
    },
    legal: {
      label: "Légal", notFound: "Document introuvable.",
      noticeTitle: "Document modèle :",
      notice: "les champs surlignés doivent être complétés et l'ensemble relu par un avocat qualifié dans chaque marché de destination avant mise en ligne. Une politique de confidentialité ne rend pas, à elle seule, une vente licite — vérifier ce qui peut être vendu, à qui, et sous quelles autorisations relève de l'exploitant.",
    },
  },
};

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("ep-lang");
    if (saved === "en" || saved === "fr") return saved;
    return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
  });
  useEffect(() => {
    localStorage.setItem("ep-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    const get = (l) => key.split(".").reduce((o, k) => o?.[k], DICT[l]);
    return get(lang) ?? get("en") ?? key;
  };

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// Renders dictionary strings containing <b>…</b> emphasis.
export function T({ k }) {
  const { t } = useLang();
  const parts = t(k).split(/<b>|<\/b>/);
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}</>;
}
