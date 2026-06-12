import { useParams, Link } from "react-router-dom";
import { useLang } from "../i18n.jsx";

// Bilingual legal layer — TEMPLATE pages. EN + FR document sets, selected by
// the active language. Coverage modeled on what French research-reagent
// suppliers publish, written fresh for this site (not copied). Every
// [bracketed placeholder] must be filled in, and the whole set reviewed by a
// lawyer qualified in each destination market before launch. A privacy
// policy does not by itself make a sale lawful.
//
// Deliberate divergence from some competitors: no blanket "all sales final"
// clause (likely unlawful against EU consumers) — we keep the 14-day
// withdrawal right with the sealed-goods exemption (Art. 16(e), Dir.
// 2011/83/EU).

const P = ({ children }) => <span className="placeholder">{children}</span>;

const TITLES = {
  en: { terms: "Terms & Conditions", privacy: "Privacy Policy", disclaimer: "Disclaimer", cookies: "Cookie Policy", imprint: "Legal Notice", returns: "Returns & Refunds", shipping: "Shipping" },
  fr: { terms: "Conditions Générales de Vente", privacy: "Politique de confidentialité", disclaimer: "Clause de non-responsabilité", cookies: "Politique cookies", imprint: "Mentions légales", returns: "Retours & remboursements", shipping: "Livraison" },
};

const DOCS = {
  en: {
    terms: (
      <>
        <h2>Article 1 — Seller identity</h2>
        <p><P>[Company legal name]</P>, <P>[legal form]</P>, registered at <P>[address]</P> under company number <P>[number]</P> — contact: <P>[email]</P> ("EUROPEPTIDE", "we").</p>
        <h2>Article 2 — Access & eligibility</h2>
        <p>Sales are restricted to persons aged 21 or over with legal capacity, declaring that they act in a scientific research capacity (laboratory, institute, R&amp;D). We may refuse or cancel any order whose declared use appears untrue, and may request proof of institutional affiliation.</p>
        <h2>Article 3 — Research use only (RUO)</h2>
        <p>All products are <strong>laboratory research reagents for in-vitro use only</strong>. They are not medicines, foods, supplements, cosmetics, or medical devices, and are <strong>not for human, veterinary, or diagnostic use</strong>. Any clinical, therapeutic, or personal use is prohibited.</p>
        <h2>Article 4 — Product specifications</h2>
        <p>Lyophilized products, purity verified by HPLC (certificate of analysis available per batch on request). The buyer is responsible for verifying the suitability of the reagent for their research protocol.</p>
        <h2>Article 5 — Prices & payment</h2>
        <p>Prices in EUR, <P>[incl. / excl.]</P> VAT, changeable at any time for future orders. Full payment before dispatch, via Mollie (cards, bank transfer, local methods). We may refuse an order on fraud or regulatory grounds.</p>
        <h2>Article 6 — Bundle bonus</h2>
        <p>The bundle bonus is a randomised <strong>discount or free add-on</strong> applied to a bundle whose contents the buyer selected. The bonus never determines the products received. Odds: 10% (50%), 15% (25%), free shipping + add-on (17%), 20% (8%). One bonus per bundle; non-exchangeable, not redeemable for cash.</p>
        <h2>Article 7 — Delivery & transfer of risk</h2>
        <p>Areas served: <P>[country list]</P>, indicative time <P>[window]</P>. Risk passes on delivery for consumers. The buyer is responsible for the lawfulness of importation and any customs formalities in their country. See <Link to="/legal/shipping" className="underline">Shipping</Link>.</p>
        <h2>Article 8 — Right of withdrawal</h2>
        <p>Consumers have a 14-day right of withdrawal from delivery (Art. L.221-18 French Consumer Code / Dir. 2011/83/EU). This does not apply to <strong>sealed goods unsealed after delivery that cannot be returned for hygiene or health-protection reasons</strong> (Art. 16(e)). Unopened sealed vials remain returnable. See <Link to="/legal/returns" className="underline">Returns &amp; Refunds</Link>.</p>
        <h2>Article 9 — Abusive chargebacks</h2>
        <p>Any manifestly unfounded payment dispute breaches these terms; we may refuse future orders and recover sums due.</p>
        <h2>Article 10 — Intellectual property</h2>
        <p>Site content (text, graphics, logos, product data) is our exclusive property. Reproduction or extraction without written permission is prohibited.</p>
        <h2>Article 11 — Prohibited conduct</h2>
        <p>Prohibited in particular: human or veterinary use of the products, false eligibility declarations, unauthorised resale, any interference with site security.</p>
        <h2>Article 12 — Liability</h2>
        <p>We are liable without limitation for intent, gross negligence, and injury to life, body, or health. Otherwise liability is limited to foreseeable, contract-typical damage, capped at the order amount. Misuse contrary to Article 3 is at the buyer's sole risk.</p>
        <h2>Article 13 — Indemnification</h2>
        <p>The buyer indemnifies us against third-party claims arising from misuse of the products, breach of these terms, or regulatory non-compliance attributable to the buyer.</p>
        <h2>Article 14 — Force majeure</h2>
        <p>We are not liable for non-performance due to force majeure (supply disruption, carrier delay, customs hold, natural disaster, pandemic, cyber incident, etc.).</p>
        <h2>Article 15 — Personal data</h2>
        <p>See the <Link to="/legal/privacy" className="underline">Privacy Policy</Link>.</p>
        <h2>Article 16 — Changes to terms</h2>
        <p>The terms in force on the order date apply. Any change is published on this page.</p>
        <h2>Article 17 — Governing law & disputes</h2>
        <p>Law of <P>[country]</P>, without prejudice to the mandatory consumer protections of the buyer's country of residence. Amicable resolution sought first; consumer mediation: <P>[mediator]</P>. EU ODR platform: <a href="https://ec.europa.eu/consumers/odr" className="underline">ec.europa.eu/consumers/odr</a>.</p>
      </>
    ),
    privacy: (
      <>
        <h2>1. Data controller</h2>
        <p><P>[Company legal name]</P>, <P>[address]</P> — contact: <P>[privacy email]</P>. Processing governed by the GDPR (Regulation (EU) 2016/679).</p>
        <h2>2. Data processed & purposes</h2>
        <h3>Account & orders</h3>
        <p>Name, email, shipping address, order contents and history. <strong>Legal basis:</strong> performance of a contract (Art. 6(1)(b)).</p>
        <h3>Payment</h3>
        <p>Handled by Mollie B.V.; we never store card numbers — only payment status and a transaction reference. <strong>Legal basis:</strong> performance of a contract.</p>
        <h3>Access declaration</h3>
        <p>Age and research-use declarations, timestamped with IP, kept as proof of eligibility. <strong>Legal basis:</strong> legitimate interest (Art. 6(1)(f)) and, where applicable, legal obligation.</p>
        <h3>Analytics</h3>
        <p>Only with your consent (Art. 6(1)(a)), withdrawable at any time via cookie settings.</p>
        <h2>3. Recipients & transfers</h2>
        <p>Processors: Supabase (database & authentication), Mollie (payment), <P>[host]</P>, and — with consent — <P>[analytics]</P>. Some may process data outside the EEA under an adequacy decision or Standard Contractual Clauses.</p>
        <h2>4. Retention</h2>
        <p>Invoicing data: 10 years (accounting obligation). Account: until deletion. Consent logs: <P>[duration]</P>. Cookie choices: 12 months.</p>
        <h2>5. Your rights</h2>
        <ul>
          <li>Access, rectification, erasure</li>
          <li>Restriction and objection</li>
          <li>Portability</li>
          <li>Withdrawal of consent at any time, without retroactive effect</li>
        </ul>
        <p>Exercise: <P>[privacy email]</P>. You may lodge a complaint with the CNIL (cnil.fr) or your national authority.</p>
        <h2>6. Cookies</h2>
        <p>See the <Link to="/legal/cookies" className="underline">Cookie Policy</Link>.</p>
      </>
    ),
    disclaimer: (
      <>
        <h2>Research reagents only</h2>
        <p>All products sold on this site are <strong>laboratory research reagents for in-vitro use only</strong>. They are in no way intended for human consumption or for medical, therapeutic, diagnostic, cosmetic, or veterinary use. They have not been evaluated by the FDA, EMA, ANSM, or any other health authority. No content on this site is medical advice or a therapeutic claim.</p>
        <h2>Buyer declarations</h2>
        <p>By ordering, the buyer declares: that they are a qualified researcher or act for a research organisation; that they assume full responsibility for safe handling and storage; that they comply with all applicable local, national, and international laws; and that products are supplied "as is", with no warranty beyond mandatory statutory warranties.</p>
        <h2>Limitation of liability</h2>
        <p>EUROPEPTIDE disclaims all liability for misuse, use contrary to the declarations above, or regulatory non-compliance attributable to the buyer, without prejudice to liabilities that cannot lawfully be excluded.</p>
        <h2>Illustrations</h2>
        <p>Interactive demos and visuals on this site (including the comparison slider) are stylised illustrations of laboratory methodology and are neither data nor claims about any catalogue compound.</p>
      </>
    ),
    cookies: (
      <>
        <h2>Cookies & local storage used</h2>
        <h3>Strictly necessary (no consent required)</h3>
        <ul>
          <li><strong>vw-consent</strong> — your access declaration · 12 months</li>
          <li><strong>vw-cart / vw-reward</strong> — cart and bundle bonus · session</li>
          <li><strong>vw-cookies</strong> — your cookie choices · 12 months</li>
          <li><strong>ep-lang</strong> — your language choice · 12 months</li>
        </ul>
        <h3>Analytics (opt-in only)</h3>
        <p><P>[Tool + cookie names + lifetimes — none installed yet.]</P> Loaded only after opt-in via the banner, withdrawable at any time. No pre-ticked boxes; "Reject all" as accessible as "Accept all".</p>
      </>
    ),
    imprint: (
      <>
        <h2>Site publisher</h2>
        <ul>
          <li>Name: <P>[legal name and form]</P></li>
          <li>Share capital: <P>[amount]</P></li>
          <li>Registered office: <P>[address]</P></li>
          <li>Trade register: <P>[city + number]</P> · VAT: <P>[number]</P></li>
          <li>Publication director: <P>[name]</P></li>
          <li>Contact: <P>[email]</P> · <P>[phone]</P></li>
        </ul>
        <h2>Hosting</h2>
        <ul><li>Host: Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA</li></ul>
      </>
    ),
    returns: (
      <>
        <h2>14-day withdrawal</h2>
        <p>You may withdraw within 14 days of delivery without reason, by clear declaration to <P>[returns email]</P>. Full refund, including standard delivery, within 14 days of receiving the return or proof of dispatch.</p>
        <h2>Sealed-goods exception</h2>
        <p>Sealed vials <strong>unsealed after delivery</strong> cannot be returned for hygiene and health-protection reasons (Art. 16(e), Dir. 2011/83/EU). Unopened sealed products remain returnable. <P>[Confirm per destination market with counsel.]</P></p>
        <h2>Damaged or incorrect items</h2>
        <p>Statutory warranties apply. Report transit damage or wrong items within <P>[period]</P>: replacement or refund, return shipping included.</p>
      </>
    ),
    shipping: (
      <>
        <h2>Areas & times</h2>
        <p>Dispatch to <P>[country list]</P> within <P>[prep time]</P>, delivery in <P>[carrier time]</P> via <P>[carriers]</P>. Tracking by email.</p>
        <h2>Packaging</h2>
        <p>Lyophilized products in sealed vials, packaged for laboratory reagents. Recommended storage on receipt: <P>[storage conditions]</P> (reagent-handling information, not a use instruction).</p>
        <h2>Costs</h2>
        <p>Calculated at cart; free above <P>[threshold]</P> or via the "free shipping" bundle bonus.</p>
        <h2>Customs & import compliance</h2>
        <p>For destinations outside <P>[dispatch country]</P>, the buyer is responsible for import lawfulness and any duties or formalities.</p>
      </>
    ),
  },

  fr: {
    terms: (
      <>
        <h2>Article 1 — Identité du vendeur</h2>
        <p><P>[Dénomination sociale]</P>, <P>[forme juridique]</P> au capital de <P>[capital]</P>, immatriculée au RCS de <P>[ville]</P> sous le n° <P>[numéro]</P>, siège social : <P>[adresse]</P> — contact : <P>[email]</P> (« EUROPEPTIDE », « nous »).</p>
        <h2>Article 2 — Accès et éligibilité</h2>
        <p>La vente est réservée aux personnes majeures (21 ans et plus), disposant de la capacité juridique, déclarant agir dans un cadre de recherche scientifique (laboratoire, institut, R&amp;D). Nous nous réservons le droit de refuser ou d'annuler toute commande dont l'usage déclaré paraît inexact, et de demander un justificatif d'affiliation institutionnelle.</p>
        <h2>Article 3 — Usage exclusivement réservé à la recherche (RUO)</h2>
        <p>Tous les produits sont des <strong>réactifs de laboratoire destinés exclusivement à la recherche in vitro</strong>. Ils ne sont ni des médicaments, ni des denrées alimentaires, ni des compléments, ni des cosmétiques, ni des dispositifs médicaux, et ne sont <strong>pas destinés à un usage humain, vétérinaire ou diagnostique</strong>. Tout usage clinique, thérapeutique ou personnel est interdit.</p>
        <h2>Article 4 — Spécifications des produits</h2>
        <p>Produits lyophilisés, pureté contrôlée par HPLC (certificat d'analyse disponible par lot sur demande). L'acheteur est responsable de vérifier l'adéquation du réactif à son protocole de recherche.</p>
        <h2>Article 5 — Prix et paiement</h2>
        <p>Prix en euros, <P>[TTC / HT]</P>, modifiables à tout moment pour les commandes futures. Paiement intégral avant expédition, via Mollie (cartes, virement, méthodes locales). Nous pouvons refuser une commande en cas de suspicion de fraude ou de non-conformité réglementaire.</p>
        <h2>Article 6 — Bonus de lot</h2>
        <p>Le bonus de lot est une <strong>remise ou un avantage aléatoire</strong> appliqué à un lot dont l'acheteur a lui-même choisi le contenu. Le bonus ne détermine jamais les produits reçus. Probabilités : 10&nbsp;% (50&nbsp;%), 15&nbsp;% (25&nbsp;%), livraison offerte + accessoire (17&nbsp;%), 20&nbsp;% (8&nbsp;%). Un bonus par lot ; non échangeable, non remboursable en espèces.</p>
        <h2>Article 7 — Livraison et transfert des risques</h2>
        <p>Zones desservies : <P>[liste des pays]</P>, délai indicatif <P>[délai]</P>. Le transfert des risques s'opère à la livraison pour les consommateurs. L'acheteur est responsable de la licéité de l'importation dans son pays et des éventuelles formalités douanières. Voir la page <Link to="/legal/shipping" className="underline">Livraison</Link>.</p>
        <h2>Article 8 — Droit de rétractation</h2>
        <p>Le consommateur dispose d'un délai de rétractation de 14 jours à compter de la livraison (art. L.221-18 C. consom.). Ce droit ne s'applique pas aux <strong>produits scellés ouverts après livraison ne pouvant être renvoyés pour des raisons d'hygiène ou de protection de la santé</strong> (art. L.221-28 3° ; art. 16 e) directive 2011/83/UE). Les flacons scellés non ouverts restent retournables. Voir <Link to="/legal/returns" className="underline">Retours &amp; remboursements</Link>.</p>
        <h2>Article 9 — Rétrofacturations abusives</h2>
        <p>Toute contestation de paiement manifestement infondée constitue une violation des présentes CGV ; nous nous réservons le droit de refuser les commandes ultérieures et de recouvrer les sommes dues.</p>
        <h2>Article 10 — Propriété intellectuelle</h2>
        <p>Le contenu du site (textes, graphismes, logos, données produits) est notre propriété exclusive. Toute reproduction ou extraction sans autorisation écrite est interdite.</p>
        <h2>Article 11 — Comportements interdits</h2>
        <p>Sont notamment interdits : l'usage humain ou vétérinaire des produits, les fausses déclarations d'éligibilité, la revente non autorisée, toute atteinte à la sécurité du site.</p>
        <h2>Article 12 — Responsabilité</h2>
        <p>Notre responsabilité est engagée sans limitation en cas de dol, de faute lourde ou d'atteinte à la vie, au corps ou à la santé. Pour le reste, elle est limitée au dommage prévisible et typique du contrat, plafonné au montant de la commande. Le mésusage contraire à l'article 3 relève de la seule responsabilité de l'acheteur.</p>
        <h2>Article 13 — Garantie d'éviction (indemnisation)</h2>
        <p>L'acheteur nous garantit contre toute réclamation de tiers résultant d'un mésusage des produits, d'une violation des présentes CGV ou d'un manquement réglementaire qui lui est imputable.</p>
        <h2>Article 14 — Force majeure</h2>
        <p>Nous ne répondons pas des inexécutions dues à un cas de force majeure (rupture d'approvisionnement, retard transporteur, blocage douanier, catastrophe naturelle, pandémie, incident cyber, etc.).</p>
        <h2>Article 15 — Données personnelles</h2>
        <p>Voir la <Link to="/legal/privacy" className="underline">Politique de confidentialité</Link>.</p>
        <h2>Article 16 — Modification des CGV</h2>
        <p>Les CGV applicables sont celles en vigueur au jour de la commande. Toute modification est publiée sur cette page.</p>
        <h2>Article 17 — Droit applicable et litiges</h2>
        <p>Droit <P>[français]</P>, sans préjudice des protections impératives du consommateur de son pays de résidence. Résolution amiable recherchée en priorité ; médiation de la consommation : <P>[médiateur désigné]</P>. Plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" className="underline">ec.europa.eu/consumers/odr</a>.</p>
      </>
    ),
    privacy: (
      <>
        <h2>1. Responsable de traitement</h2>
        <p><P>[Dénomination sociale]</P>, <P>[adresse]</P> — contact : <P>[email confidentialité]</P>. Traitements régis par le RGPD (règlement (UE) 2016/679) et la loi Informatique et Libertés.</p>
        <h2>2. Données traitées et finalités</h2>
        <h3>Compte et commandes</h3>
        <p>Nom, email, adresse de livraison, contenu et historique des commandes. <strong>Base légale :</strong> exécution du contrat (art. 6(1)(b)).</p>
        <h3>Paiement</h3>
        <p>Traité par Mollie B.V. ; nous ne stockons jamais les numéros de carte — nous ne recevons que le statut du paiement et une référence de transaction. <strong>Base légale :</strong> exécution du contrat.</p>
        <h3>Déclaration d'accès</h3>
        <p>Déclarations d'âge et d'usage recherche, horodatées avec adresse IP, conservées comme preuve d'éligibilité. <strong>Base légale :</strong> intérêt légitime (art. 6(1)(f)) et, le cas échéant, obligation légale.</p>
        <h3>Mesure d'audience</h3>
        <p>Uniquement avec votre consentement (art. 6(1)(a)), retirable à tout moment via les réglages cookies.</p>
        <h2>3. Destinataires et transferts</h2>
        <p>Sous-traitants : Supabase (base de données et authentification), Mollie (paiement), <P>[hébergeur]</P>, et — avec consentement — <P>[outil d'audience]</P>. Certains peuvent traiter des données hors EEE ; ces transferts reposent sur une décision d'adéquation ou des clauses contractuelles types.</p>
        <h2>4. Durées de conservation</h2>
        <p>Données de facturation : 10 ans (obligation comptable). Compte : jusqu'à suppression. Journaux de consentement : <P>[durée]</P>. Choix cookies : 12 mois.</p>
        <h2>5. Vos droits</h2>
        <ul>
          <li>Accès, rectification, effacement</li>
          <li>Limitation et opposition</li>
          <li>Portabilité</li>
          <li>Retrait du consentement à tout moment, sans effet rétroactif</li>
          <li>Directives post-mortem (art. 85 loi I&amp;L)</li>
        </ul>
        <p>Exercice : <P>[email confidentialité]</P>. Vous pouvez saisir la CNIL (cnil.fr) ou l'autorité de contrôle de votre pays.</p>
        <h2>6. Cookies</h2>
        <p>Voir la <Link to="/legal/cookies" className="underline">Politique cookies</Link>.</p>
      </>
    ),
    disclaimer: (
      <>
        <h2>Réactifs de recherche uniquement</h2>
        <p>Tous les produits vendus sur ce site sont <strong>exclusivement destinés à la recherche en laboratoire et à l'analyse in vitro</strong>. Ils ne sont en aucun cas destinés à la consommation humaine ni à un usage médical, thérapeutique, diagnostique, cosmétique ou vétérinaire. Ils n'ont été évalués ni par la FDA, ni par l'EMA, ni par l'ANSM, ni par aucune autre autorité de santé. Aucun contenu de ce site ne constitue un avis médical ou une allégation thérapeutique.</p>
        <h2>Déclarations de l'acheteur</h2>
        <p>En commandant, l'acheteur déclare : être un chercheur qualifié ou agir pour un organisme de recherche ; assumer l'entière responsabilité de la manipulation et du stockage sûrs des produits ; respecter l'ensemble des lois locales, nationales et internationales applicables ; accepter que les produits soient fournis « en l'état », sans garantie expresse ou implicite au-delà des garanties légales impératives.</p>
        <h2>Limites de responsabilité</h2>
        <p>EUROPEPTIDE décline toute responsabilité en cas de mésusage, d'usage contraire aux déclarations ci-dessus ou de non-conformité réglementaire imputable à l'acheteur, sans préjudice des responsabilités ne pouvant être légalement exclues.</p>
        <h2>Illustrations</h2>
        <p>Les démonstrations interactives et visuels du site (y compris le comparateur à curseur) sont des illustrations stylisées de méthodologie de laboratoire et ne constituent ni des données ni des allégations relatives à un composé du catalogue.</p>
      </>
    ),
    cookies: (
      <>
        <h2>Cookies et stockage local utilisés</h2>
        <h3>Strictement nécessaires (sans consentement)</h3>
        <ul>
          <li><strong>vw-consent</strong> — votre déclaration d'accès · 12 mois</li>
          <li><strong>vw-cart / vw-reward</strong> — panier et bonus de lot · session</li>
          <li><strong>vw-cookies</strong> — vos choix cookies · 12 mois</li>
          <li><strong>ep-lang</strong> — votre choix de langue · 12 mois</li>
        </ul>
        <h3>Mesure d'audience (opt-in uniquement)</h3>
        <p><P>[Outil + noms de cookies + durées — aucun n'est installé à ce jour.]</P> Chargés uniquement après opt-in via le bandeau, consentement retirable à tout moment. Conformément aux lignes directrices CNIL : aucune case pré-cochée, « Tout refuser » aussi accessible que « Tout accepter ».</p>
      </>
    ),
    imprint: (
      <>
        <h2>Éditeur du site</h2>
        <ul>
          <li>Dénomination : <P>[dénomination sociale et forme]</P></li>
          <li>Capital social : <P>[montant]</P></li>
          <li>Siège : <P>[adresse]</P></li>
          <li>RCS : <P>[ville + numéro]</P> · TVA intracommunautaire : <P>[numéro]</P></li>
          <li>Directeur de la publication : <P>[nom]</P></li>
          <li>Contact : <P>[email]</P> · <P>[téléphone]</P></li>
        </ul>
        <h2>Hébergement</h2>
        <ul><li>Hébergeur : Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA</li></ul>
        <p>Conformément à la loi pour la confiance dans l'économie numérique (LCEN) du 21 juin 2004.</p>
      </>
    ),
    returns: (
      <>
        <h2>Rétractation — 14 jours</h2>
        <p>Vous pouvez vous rétracter dans les 14 jours suivant la livraison, sans motif, par déclaration claire à <P>[email retours]</P>. Remboursement intégral, y compris la livraison standard, sous 14 jours après réception du retour ou preuve d'expédition.</p>
        <h2>Exception — produits scellés</h2>
        <p>Les flacons scellés <strong>ouverts après livraison</strong> ne peuvent être retournés pour des raisons d'hygiène et de protection de la santé (art. L.221-28 3° C. consom. ; art. 16 e) directive 2011/83/UE). Les produits scellés non ouverts restent retournables. <P>[À confirmer par avocat pour chaque marché de destination.]</P></p>
        <h2>Produits endommagés ou erronés</h2>
        <p>Les garanties légales de conformité et des vices cachés s'appliquent. Signalez tout dommage de transport ou erreur de préparation sous <P>[délai]</P> : remplacement ou remboursement, frais de retour inclus.</p>
      </>
    ),
    shipping: (
      <>
        <h2>Zones et délais</h2>
        <p>Expédition vers <P>[liste des pays desservis]</P> sous <P>[délai de préparation]</P>, livraison en <P>[délai transporteur]</P> via <P>[transporteurs]</P>. Suivi communiqué par email.</p>
        <h2>Conditionnement</h2>
        <p>Produits lyophilisés expédiés en flacons scellés, emballage adapté aux réactifs de laboratoire. Conservation recommandée à réception : <P>[conditions de stockage]</P> (information de manipulation de réactif, non une instruction d'utilisation).</p>
        <h2>Frais</h2>
        <p>Frais calculés au panier ; offerts à partir de <P>[seuil]</P> ou via le bonus de lot « livraison offerte ».</p>
        <h2>Douanes et conformité import</h2>
        <p>Pour les destinations hors <P>[pays d'expédition]</P>, l'acheteur est responsable de la licéité de l'importation et des éventuels droits et formalités dans son pays.</p>
      </>
    ),
  },
};

export default function Legal() {
  const { doc } = useParams();
  const { lang, t } = useLang();
  const body = DOCS[lang]?.[doc] ?? DOCS.en[doc];
  const title = TITLES[lang]?.[doc];

  if (!body) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">{t("legal.notFound")}</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="spec-label text-clay">{t("legal.label")}</p>
      <h1 className="font-display text-5xl md:text-6xl mt-2">{title}</h1>
      <div className="border border-clay/50 bg-clay/5 p-4 mt-8">
        <p className="text-xs text-ink-soft leading-relaxed">
          <strong className="text-clay">{t("legal.noticeTitle")}</strong> {t("legal.notice")}
        </p>
      </div>
      <div className="prose-legal mt-4">{body}</div>
    </main>
  );
}
