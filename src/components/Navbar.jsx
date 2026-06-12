import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const navLink = ({ isActive }) =>
  `spec-label px-3 py-2 transition-colors ${isActive ? "bg-ink text-paper" : "hover:bg-paper-deep"}`;

export default function Navbar() {
  const { cartCount } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">EUROPEPTIDE</span>
          <span className="spec-label text-ink-soft hidden sm:inline">research reagents</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/catalogue" className={navLink}>Catalogue</NavLink>
          <NavLink to="/bundle" className={navLink}>Bundle lab</NavLink>
          <NavLink to="/cart" className={navLink}>
            Cart{cartCount > 0 && <span className="ml-1.5 inline-flex items-center justify-center bg-acid text-ink rounded-full size-5 text-[11px]">{cartCount}</span>}
          </NavLink>
        </nav>
      </div>
      <div className="bg-ink text-paper text-center py-1.5">
        <p className="spec-label !text-[10px]">For laboratory research use only — not for human or veterinary use</p>
      </div>
    </header>
  );
}
