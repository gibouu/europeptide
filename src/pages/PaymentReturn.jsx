import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";

// Mollie redirects here after checkout. The redirect itself carries no
// outcome, so we poll /api/payment-status (Mollie statuses: open, pending,
// paid, canceled, expired, failed).

const TERMINAL = ["paid", "canceled", "expired", "failed"];

export default function PaymentReturn() {
  const [params] = useSearchParams();
  const ref = params.get("ref") ?? localStorage.getItem("ep-last-payment");
  const [status, setStatus] = useState("checking");
  const { clearCart } = useStore();
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

  const view = {
    checking: { title: "Checking your payment…", body: "One moment.", tone: "" },
    open:     { title: "Payment in progress…", body: "Waiting for confirmation from the payment provider.", tone: "" },
    pending:  { title: "Payment pending…", body: "Waiting for confirmation from the payment provider.", tone: "" },
    paid:     { title: "Payment received. ✓", body: "Thank you — your order is confirmed. A confirmation email follows.", tone: "text-pine" },
    canceled: { title: "Payment canceled.", body: "No charge was made. Your cart is untouched.", tone: "text-clay" },
    expired:  { title: "Payment expired.", body: "The checkout session timed out. Your cart is untouched.", tone: "text-clay" },
    failed:   { title: "Payment failed.", body: "No charge was made. Please try again or use another method.", tone: "text-clay" },
    unknown:  { title: "Status unknown.", body: "We couldn't verify this payment. If you were charged, contact support with your order reference.", tone: "text-clay" },
  }[status] ?? { title: status, body: "", tone: "" };

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="spec-label text-ink-soft">Order ref · {ref ?? "—"}</p>
      <h1 className={`font-display text-5xl md:text-6xl mt-3 ${view.tone}`}>{view.title}</h1>
      <p className="text-ink-soft mt-4">{view.body}</p>
      <div className="flex justify-center gap-3 mt-10">
        {status === "paid"
          ? <Link to="/catalogue" className="btn-ink">Back to catalogue</Link>
          : <Link to="/cart" className="btn-ink">Back to cart</Link>}
      </div>
    </main>
  );
}
