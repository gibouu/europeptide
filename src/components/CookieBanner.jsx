import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { useLang } from "../i18n.jsx";

// GDPR cookie consent: opt-in, nothing pre-ticked, reject-all is as easy as
// accept-all. No analytics script may load unless cookieChoice.analytics is
// true — there are none in this build; keep that invariant when adding any.

export default function CookieBanner() {
  const { cookieChoice, setCookieChoice } = useStore();
  const { t } = useLang();
  const [showOptions, setShowOptions] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  if (cookieChoice) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-40 card-rule p-6"
    >
      <p className="spec-label text-clay">{t("cookie.label")}</p>
      <p className="text-sm leading-relaxed mt-2">
        {t("cookie.body")}{" "}
        <Link to="/legal/cookies" className="underline">{t("cookie.policy")}</Link>
      </p>

      {showOptions && (
        <div className="mt-4 space-y-2 border-t border-line pt-4">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked disabled className="size-4" />
            {t("cookie.necessary")}
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)}
                   className="size-4 accent-(--color-ink)" />
            {t("cookie.analytics")}
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <button className="btn-ink !py-2 !px-4 !text-[11px]"
                onClick={() => setCookieChoice({ necessary: true, analytics: showOptions ? analytics : true, at: new Date().toISOString() })}>
          {showOptions ? t("cookie.save") : t("cookie.acceptAll")}
        </button>
        <button className="btn-ghost !py-2 !px-4 !text-[11px]"
                onClick={() => setCookieChoice({ necessary: true, analytics: false, at: new Date().toISOString() })}>
          {t("cookie.rejectAll")}
        </button>
        {!showOptions && (
          <button className="spec-label underline text-ink-soft" onClick={() => setShowOptions(true)}>
            {t("cookie.options")}
          </button>
        )}
      </div>
    </motion.div>
  );
}
