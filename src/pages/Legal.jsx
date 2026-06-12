import { useParams, Link } from "react-router-dom";

// Couche légale FR/EU — pages MODÈLES, calquées sur la couverture des pages
// légales habituelles d'un fournisseur français de réactifs (CGV, politique
// de confidentialité, clause de non-responsabilité, mentions légales,
// retours, livraison) mais rédigées pour CE site — pas de copie verbatim.
// Chaque [champ entre crochets] doit être complété, et l'ensemble doit être
// relu par un avocat qualifié dans chaque marché de destination avant mise
// en ligne. Une politique de confidentialité ne rend pas, à elle seule, une
// vente licite : vérifier ce qui peut être vendu, à qui, et sous quelles
// autorisations reste la responsabilité de l'exploitant.
//
// Divergence assumée vs certains concurrents : pas d'exclusion totale du
// droit de rétractation (clause probablement illicite en droit de la
// consommation UE) — on garde le délai de 14 jours avec l'exemption
// « produits scellés » de l'art. 16 de la directive 2011/83/UE.

const P = ({ children }) => <span className="placeholder">{children}</span>;

const DOCS = {
  terms: {
    title: "Conditions Générales de Vente",
    body: (
      <>
        <h2>Article 1 — Identité du vendeur</h2>
        <p><P>[Dénomination sociale]</P>, <P>[forme juridique]</P> au capital de <P>[capital]</P>, immatriculée au RCS de <P>[ville]</P> sous le n° <P>[numéro]</P>, siège social : <P>[adresse]</P> — contact : <P>[email]</P> (« EUROPEPTIDE », « nous »).</p>

        <h2>Article 2 — Accès et éligibilité</h2>
        <p>La vente est réservée aux personnes majeures (21 ans et plus sur ce site), disposant de la capacité juridique, déclarant agir dans un cadre de recherche scientifique (laboratoire, institut, R&amp;D). Nous nous réservons le droit de refuser ou d'annuler toute commande dont l'usage déclaré paraît inexact, et de demander un justificatif d'affiliation institutionnelle.</p>

        <h2>Article 3 — Usage exclusivement réservé à la recherche (RUO)</h2>
        <p>Tous les produits sont des <strong>réactifs de laboratoire destinés exclusivement à la recherche in vitro</strong>. Ils ne sont ni des médicaments, ni des denrées alimentaires, ni des compléments, ni des cosmétiques, ni des dispositifs médicaux, et ne sont <strong>pas destinés à un usage humain, vétérinaire ou diagnostique</strong>. Tout usage clinique, thérapeutique ou personnel est interdit.</p>

        <h2>Article 4 — Spécifications des produits</h2>
        <p>Produits lyophilisés, pureté contrôlée par HPLC (certificat d'analyse disponible par lot sur demande). L'acheteur est responsable de vérifier l'adéquation du réactif à son protocole de recherche.</p>

        <h2>Article 5 — Prix et paiement</h2>
        <p>Prix en euros, <P>[TTC / HT]</P>, modifiables à tout moment pour les commandes futures. Paiement intégral avant expédition, via Mollie (cartes, virement, méthodes locales). Nous pouvons refuser une commande en cas de suspicion de fraude ou de non-conformité réglementaire.</p>

        <h2>Article 6 — Bonus de lot (« bundle »)</h2>
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
  },

  privacy: {
    title: "Politique de confidentialité",
    body: (
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
  },

  disclaimer: {
    title: "Clause de non-responsabilité",
    body: (
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
  },

  cookies: {
    title: "Politique cookies",
    body: (
      <>
        <h2>Cookies et stockage local utilisés</h2>
        <h3>Strictement nécessaires (sans consentement)</h3>
        <ul>
          <li><strong>vw-consent</strong> — votre déclaration d'accès · 12 mois</li>
          <li><strong>vw-cart / vw-reward</strong> — panier et bonus de lot · session</li>
          <li><strong>vw-cookies</strong> — vos choix cookies · 12 mois</li>
        </ul>
        <h3>Mesure d'audience (opt-in uniquement)</h3>
        <p><P>[Outil + noms de cookies + durées — aucun n'est installé à ce jour.]</P> Chargés uniquement après opt-in via le bandeau, consentement retirable à tout moment. Conformément aux lignes directrices CNIL : aucune case pré-cochée, « Tout refuser » aussi accessible que « Tout accepter ».</p>
      </>
    ),
  },

  imprint: {
    title: "Mentions légales",
    body: (
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
        <ul>
          <li>Hébergeur : <P>[raison sociale, adresse, téléphone]</P></li>
        </ul>
        <p>Conformément à la loi pour la confiance dans l'économie numérique (LCEN) du 21 juin 2004.</p>
      </>
    ),
  },

  returns: {
    title: "Retours & remboursements",
    body: (
      <>
        <h2>Rétractation — 14 jours</h2>
        <p>Vous pouvez vous rétracter dans les 14 jours suivant la livraison, sans motif, par déclaration claire à <P>[email retours]</P> (modèle de formulaire fourni sur demande). Remboursement intégral, y compris la livraison standard, sous 14 jours après réception du retour ou preuve d'expédition.</p>
        <h2>Exception — produits scellés</h2>
        <p>Les flacons scellés <strong>ouverts après livraison</strong> ne peuvent être retournés pour des raisons d'hygiène et de protection de la santé (art. L.221-28 3° C. consom. ; art. 16 e) directive 2011/83/UE). Les produits scellés non ouverts restent retournables. <P>[À confirmer par avocat pour chaque marché de destination.]</P></p>
        <h2>Produits endommagés ou erronés</h2>
        <p>Les garanties légales de conformité et des vices cachés s'appliquent. Signalez tout dommage de transport ou erreur de préparation sous <P>[délai]</P> : remplacement ou remboursement, frais de retour inclus.</p>
      </>
    ),
  },

  shipping: {
    title: "Livraison",
    body: (
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
  const page = DOCS[doc];

  if (!page) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Document introuvable.</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="spec-label text-clay">Légal</p>
      <h1 className="font-display text-5xl md:text-6xl mt-2">{page.title}</h1>
      <div className="border border-clay/50 bg-clay/5 p-4 mt-8">
        <p className="text-xs text-ink-soft leading-relaxed">
          <strong className="text-clay">Document modèle :</strong> les champs surlignés doivent être
          complétés et l'ensemble relu par un avocat qualifié dans chaque marché de destination avant
          mise en ligne. Une politique de confidentialité ne rend pas, à elle seule, une vente licite —
          vérifier ce qui peut être vendu, à qui, et sous quelles autorisations relève de l'exploitant.
        </p>
      </div>
      <div className="prose-legal mt-4">{page.body}</div>
    </main>
  );
}
