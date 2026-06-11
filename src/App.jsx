import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import Gate from "./components/Gate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./pages/ProductDetail";
import BundleBuilder from "./pages/BundleBuilder";
import Cart from "./pages/Cart";
import Legal from "./pages/Legal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Shell() {
  const { consent } = useStore();
  const { pathname } = useLocation();
  // Legal pages are readable pre-consent (linked from the gate itself).
  const gated = !consent?.age && !pathname.startsWith("/legal");

  return (
    <>
      <ScrollToTop />
      {gated && <Gate />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/bundle" element={<BundleBuilder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/legal/:doc" element={<Legal />} />
      </Routes>
      <Footer />
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
