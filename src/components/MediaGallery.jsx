import { motion } from "framer-motion";
import MediaSlot from "./MediaSlot";
import { GALLERY_SLOTS } from "../data/media.js";
import { useLang } from "../i18n.jsx";

// Four 9:16 portrait clips in a film-strip row. On the dark band, so the
// placeholders (and your dark cinematic clips) sit well. Drop clips in via
// src/data/media.js.

export default function MediaGallery() {
  const { t } = useLang();
  return (
    <section className="border-y border-ink bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="spec-label !text-acid">{t("gallery.kicker")}</p>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-8 max-w-2xl">{t("gallery.title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_SLOTS.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            >
              <MediaSlot id={id} rounded dark />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
