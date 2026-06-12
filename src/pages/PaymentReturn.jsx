import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useLang } from "../i18n.jsx";

// Mollie redirects here after checkout. The redirect itself carries no
// outcome, so we poll /api/payment-status (Mollie statuses: open, pending,
// paid, canceled, expired, failed).

const TERMINAL = ["paid", "canceled", "expired", "failed"];

export default function PaymentReturn() {
  const [params] = useSearchParams();
  const ref = params.get("ref") ?? localStorage.getItem("ep-last-payment");
  const [status, setStatus] = useState("checking");
  const { clearCart } = useStore();
  const { t } = useLang();
  const cleared = useRef(false);

  useEffect(() => {
    if (!ref) return setStatus("unknown");
    let tries = 0;
    let timer;
    const poll = async () => {
      try {
        const res = await fetch(`/api/payment-status?ref=${encodeURIComponent(ref)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setStatus(data.status);
        if (data.status === "paid" && !cleared.current) {
          cleared.current = true;
          clearCart();
        }
        if (!TERMINAL.includes(data.status) && ++tries < 15) timer = setTimeout(poll, 2000);
      } catch {
        setStatus("unknown");
      }
    };
    poll();
    return () => clearTimeout(timer);
  }, [ref, clearCart]);

  const [title, body] = t(`pay.${status}`) ?? [status, ""];
  const tone = status === "paid" ? "text-pine" : TERMINAL.includes(status) ? "text-clay" : "";

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="spec-label text-ink-soft">{t("pay.ref")} · {ref ?? "—"}</p>
      <h1 className={`font-display text-5xl md:text-6xl mt-3 ${tone}`}>{title}</h1>
      <p className="text-ink-soft mt-4">{body}</p>
      <div className="flex justify-center gap-3 mt-10">
        {status === "paid"
          ? <Link to="/catalogue" className="btn-ink">{t("pay.backCat")}</Link>
          : <Link to="/cart" className="btn-ink">{t("pay.backCart")}</Link>}
      </div>
    </main>
  );
}
