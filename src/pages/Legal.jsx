import { useParams, Link } from "react-router-dom";

// EU compliance layer — TEMPLATE legal pages per build spec §7.
// Every [bracketed placeholder] must be filled in, and the whole set must be
// reviewed by a lawyer qualified in the destination market before launch.
// A privacy policy does not by itself make a given sale lawful: the owner is
// responsible for confirming what may lawfully be sold, to whom, and under
// what authorisations in each target country.

const P = ({ children }) => <span className="placeholder">{children}</span>;

const DOCS = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <h2>1. Data controller</h2>
        <p><P>[Company legal name]</P>, <P>[registered address]</P>, <P>[country]</P> — contact: <P>[privacy email]</P>. We are the controller of personal data processed through this site under Regulation (EU) 2016/679 (GDPR).</p>

        <h2>2. What we collect and why</h2>
        <h3>Account & order data</h3>
        <p>Name, email, shipping address, order contents and history. <strong>Legal basis:</strong> performance of a contract (Art. 6(1)(b) GDPR).</p>
        <h3>Payment data</h3>
        <p>Processed by Stripe; we never store card numbers. We receive only payment status and a transaction reference. <strong>Legal basis:</strong> performance of a contract.</p>
        <h3>Access declaration</h3>
        <p>Your age and research-use declarations, with a timestamp and IP address, kept as evidence of eligibility. <strong>Legal basis:</strong> legitimate interest (Art. 6(1)(f)) and legal obligation where applicable.</p>
        <h3>Analytics</h3>
        <p>Only with your opt-in cookie consent (Art. 6(1)(a)). You can withdraw consent at any time via the cookie settings.</p>

        <h2>3. Processors and transfers</h2>
        <p>We use the following processors: Supabase (database & authentication), Stripe (payments), <P>[hosting provider]</P>, and — only with consent — <P>[analytics provider]</P>. Some processors may process data outside the EEA; where they do, transfers rely on adequacy decisions or Standard Contractual Clauses.</p>

        <h2>4. Retention</h2>
        <p>Order and invoice data: as required by tax law (<P>[e.g. 10 years in France/Germany]</P>). Account data: until you delete your account. Consent logs: <P>[duration]</P>. Cookie choices: 12 months.</p>

        <h2>5. Your rights</h2>
        <ul>
          <li>Access, rectification, and erasure of your data</li>
          <li>Restriction of and objection to processing</li>
          <li>Data portability</li>
          <li>Withdrawal of consent at any time, without affecting prior processing</li>
        </ul>
        <p>Exercise these by writing to <P>[privacy email]</P>. You also have the right to lodge a complaint with a supervisory authority — in France, the CNIL (cnil.fr); elsewhere, your national authority.</p>

        <h2>6. Cookies</h2>
        <p>See the <Link to="/legal/cookies" className="underline">Cookie Policy</Link> for the full list and lifetimes.</p>
      </>
    ),
  },

  terms: {
    title: "Terms & Conditions",
    body: (
      <>
        <h2>1. Scope and seller</h2>
        <p>These terms govern all orders placed with <P>[Company legal name]</P>, <P>[address]</P> ("we"). By ordering you accept them.</p>

        <h2>2. Research use only — buyer declarations</h2>
        <p>All products are supplied <strong>strictly as laboratory research reagents for in-vitro use</strong>. They are not medicines, foods, supplements, cosmetics, or medical devices, and are <strong>not for human, veterinary, or diagnostic use</strong>. By ordering you declare that you are 21 or older, act in a scientific research capacity, and will use the products for in-vitro research only. We may refuse or cancel orders where these declarations appear untrue, and may request evidence of institutional affiliation.</p>

        <h2>3. Bundle bonus</h2>
        <p>The bundle bonus is a randomised <strong>discount or free add-on</strong> applied to a bundle whose contents you selected yourself. The bonus never determines which products you receive. Bonus odds: 10% off (50%), 15% off (25%), free shipping + add-on (17%), 20% off (8%). One bonus per bundle; not exchangeable for cash.</p>

        <h2>4. Prices, payment, delivery</h2>
        <p>Prices are in EUR and <P>[include / exclude]</P> VAT. Payment via Stripe. Delivery to <P>[list of countries served]</P> within <P>[delivery window]</P>. Risk passes on delivery.</p>

        <h2>5. Right of withdrawal</h2>
        <p>EU consumers normally have a 14-day right of withdrawal. Note that under Art. 16 of Directive 2011/83/EU this right may not apply to <strong>sealed goods unsealed after delivery that are not suitable for return for health-protection or hygiene reasons</strong>. See <Link to="/legal/returns" className="underline">Returns & Refunds</Link>. <P>[Confirm scope with counsel — consumer-law exemptions are construed narrowly.]</P></p>

        <h2>6. Liability</h2>
        <p>We are liable without limitation for intent, gross negligence, and injury to life, body, or health. Otherwise liability is limited to foreseeable, contract-typical damage. Products are used in research at the buyer's own responsibility; misuse contrary to the declarations in §2 is at the buyer's sole risk.</p>

        <h2>7. Governing law & disputes</h2>
        <p>Law of <P>[country]</P>, without prejudice to mandatory consumer protections of the buyer's habitual residence. The European Commission's ODR platform: <a href="https://ec.europa.eu/consumers/odr" className="underline">ec.europa.eu/consumers/odr</a>.</p>
      </>
    ),
  },

  disclaimer: {
    title: "Disclaimer",
    body: (
      <>
        <h2>Research reagents only</h2>
        <p>All products sold on this site are supplied strictly as <strong>laboratory research reagents for in-vitro use</strong>. They have not been evaluated or approved by the FDA, the EMA, the ANSM, or any other national health authority. Nothing on this site is a medical claim, medical advice, or an instruction for use in or on the human body. No statement on this site has been evaluated by any health authority.</p>
        <h2>Buyer responsibility</h2>
        <p>The buyer is solely responsible for the truth of the access declarations, for compliance with the laws and regulations applicable to them, and for the safe handling, storage, and lawful use of all materials in a qualified research setting.</p>
        <h2>Illustrations</h2>
        <p>Interactive demos and imagery on this site (including the timepoint-comparison slider) are stylised illustrations of laboratory methodology and are not data from, or claims about, any listed compound.</p>
      </>
    ),
  },

  cookies: {
    title: "Cookie Policy",
    body: (
      <>
        <h2>How we use cookies and local storage</h2>
        <h3>Strictly necessary (no consent required)</h3>
        <ul>
          <li><strong>vw-consent</strong> — stores your access declaration · 12 months</li>
          <li><strong>vw-cart / vw-reward</strong> — cart contents and bundle bonus · session</li>
          <li><strong>vw-cookies</strong> — your cookie choices · 12 months</li>
        </ul>
        <h3>Analytics (opt-in only)</h3>
        <p><P>[Analytics provider + cookie names + lifetimes — currently none are installed.]</P> These load only after you opt in via the cookie banner, and you can withdraw consent at any time by clearing the choice and re-opening the banner.</p>
        <p>Consent is requested on first visit; nothing optional is pre-ticked, and "Reject all" is offered with equal prominence, in line with GDPR and the ePrivacy rules.</p>
      </>
    ),
  },

  imprint: {
    title: "Imprint / Impressum",
    body: (
      <>
        <h2>Legal disclosure</h2>
        <p>Required in several EU member states (e.g. §5 DDG in Germany; loi pour la confiance dans l'économie numérique in France).</p>
        <ul>
          <li>Company: <P>[legal name and form]</P></li>
          <li>Registered address: <P>[address]</P></li>
          <li>Commercial register & number: <P>[register, number]</P></li>
          <li>VAT ID: <P>[VAT number]</P></li>
          <li>Managing director / responsible person: <P>[name]</P></li>
          <li>Contact: <P>[email]</P> · <P>[phone]</P></li>
        </ul>
      </>
    ),
  },

  returns: {
    title: "Returns & Refunds",
    body: (
      <>
        <h2>14-day withdrawal (EU consumers)</h2>
        <p>You may withdraw from your purchase within 14 days of delivery without giving a reason, by clear declaration to <P>[returns email]</P>. We refund all payments including standard delivery within 14 days of receiving the returned goods or proof of return.</p>
        <h2>Exemption for unsealed goods</h2>
        <p>Sealed vials that have been <strong>unsealed after delivery</strong> are not suitable for return for health-protection and hygiene reasons and are exempt from withdrawal under Art. 16(e) of Directive 2011/83/EU. Unopened, sealed products remain returnable. <P>[Confirm with counsel for each destination market.]</P></p>
        <h2>Damaged or incorrect items</h2>
        <p>Statutory warranty rights are unaffected. Report transit damage or wrong items within <P>[period]</P> and we will replace or refund, including return shipping.</p>
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
        <h1 className="font-display text-4xl">Document not found.</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="spec-label text-clay">Legal</p>
      <h1 className="font-display text-5xl md:text-6xl mt-2">{page.title}</h1>
      <div className="border border-clay/50 bg-clay/5 p-4 mt-8">
        <p className="text-xs text-ink-soft leading-relaxed">
          <strong className="text-clay">Template notice:</strong> this document is a template. Highlighted
          fields must be completed, and the full set must be reviewed by a lawyer qualified in your
          destination market before launch. A privacy policy does not by itself make a given sale lawful —
          confirming what may lawfully be sold, to whom, and under what authorisations is the site
          owner's responsibility.
        </p>
      </div>
      <div className="prose-legal mt-4">{page.body}</div>
    </main>
  );
}
