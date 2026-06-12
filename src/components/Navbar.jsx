import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useLang } from "../i18n.jsx";

const navLink = ({ isActive }) =>
  `spec-label px-3 py-2 transition-colors ${isActive ? "bg-ink text-paper" : "hover:bg-paper-deep"}`;

export default function Navbar() {
  const { cartCount } = useStore();
  const { lang, setLang, t } = useLang();
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">EUROPEPTIDE</span>
          <span className="spec-label text-ink-soft hidden sm:inline">{t("nav.tagline")}</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/catalogue" className={navLink}>{t("nav.catalogue")}</NavLink>
          <NavLink to="/bundle" className={navLink}>{t("nav.bundle")}</NavLink>
          <NavLink to="/cart" className={navLink}>
            {t("nav.cart")}{cartCount > 0 && <span className="ml-1.5 inline-flex items-center justify-center bg-acid text-ink rounded-full size-5 text-[11px]">{cartCount}</span>}
          </NavLink>
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="spec-label px-3 py-2 border border-ink ml-1 hover:bg-ink hover:text-paper transition-colors"
            aria-label="Switch language"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
        </nav>
      </div>
      <div className="bg-ink text-paper text-center py-1.5">
        <p className="spec-label !text-[10px]">{t("nav.ruo")}</p>
      </div>
    </header>
  );
}
