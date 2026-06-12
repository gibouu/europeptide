import { Link } from "react-router-dom";
import { useLang } from "../i18n.jsx";

const LEGAL_LINKS = [
  ["terms", "/legal/terms"],
  ["privacy", "/legal/privacy"],
  ["disclaimer", "/legal/disclaimer"],
  ["cookies", "/legal/cookies"],
  ["imprint", "/legal/imprint"],
  ["returns", "/legal/returns"],
  ["shipping", "/legal/shipping"],
];

const LABELS = {
  en: { terms: "Terms & Conditions", privacy: "Privacy Policy", disclaimer: "Disclaimer", cookies: "Cookie Policy", imprint: "Legal Notice", returns: "Returns & Refunds", shipping: "Shipping" },
  fr: { terms: "Conditions Générales de Vente", privacy: "Politique de confidentialité", disclaimer: "Clause de non-responsabilité", cookies: "Politique cookies", imprint: "Mentions légales", returns: "Retours & remboursements", shipping: "Livraison" },
};

export default function Footer() {
  const { lang, t } = useLang();
  const labels = LABELS[lang];
  return (
    <footer className="border-t border-ink mt-24 bg-paper-deep">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">EUROPEPTIDE</p>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed max-w-xs">{t("footer.blurb")}</p>
        </div>
        <div>
          <p className="spec-label mb-4">{t("footer.legal")}</p>
          <ul className="space-y-2">
            {LEGAL_LINKS.map(([key, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm hover:underline">{labels[key]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="spec-label mb-4">{t("footer.notice")}</p>
          <p className="text-xs text-ink-soft leading-relaxed">{t("footer.noticeBody")}</p>
          <p className="spec-label mt-6 text-ink-soft">© EUROPEPTIDE — [Company legal name]</p>
        </div>
      </div>
    </footer>
  );
}
