import { Link } from "react-router-dom";

const LEGAL_LINKS = [
  ["Conditions Générales de Vente", "/legal/terms"],
  ["Politique de confidentialité", "/legal/privacy"],
  ["Clause de non-responsabilité", "/legal/disclaimer"],
  ["Politique cookies", "/legal/cookies"],
  ["Mentions légales", "/legal/imprint"],
  ["Retours & remboursements", "/legal/returns"],
  ["Livraison", "/legal/shipping"],
];

export default function Footer() {
  return (
    <footer className="border-t border-ink mt-24 bg-paper-deep">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">EUROPEPTIDE</p>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed max-w-xs">
            Laboratory research reagents. Every product on this site is supplied for in-vitro research
            use only and is not for human, veterinary, or diagnostic use.
          </p>
        </div>
        <div>
          <p className="spec-label mb-4">Legal</p>
          <ul className="space-y-2">
            {LEGAL_LINKS.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm hover:underline">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="spec-label mb-4">Notice</p>
          <p className="text-xs text-ink-soft leading-relaxed">
            Products have not been evaluated by the FDA, EMA, or any national health authority. Statements
            on this site describe research context only and are not medical claims. Purchase requires the
            research-use declaration completed at entry.
          </p>
          <p className="spec-label mt-6 text-ink-soft">© EUROPEPTIDE — [Company legal name]</p>
        </div>
      </div>
    </footer>
  );
}
