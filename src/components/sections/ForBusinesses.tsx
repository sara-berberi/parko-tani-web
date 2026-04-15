"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export function ForBusinesses() {
  const { t } = useLanguage();

  return (
    <section id="business" className="section-y bg-paper hairline-t">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left — copy */}
          <div className="lg:col-span-6">
            <div className="eyebrow mb-5">{t.business.eyebrow}</div>
            <h2 className="display text-display-md md:text-display-lg mb-6">
              {t.business.title}{" "}
              <span className="text-ocean">{t.business.titleAccent}</span>
            </h2>
            <p className="text-[17px] text-ink-500 leading-relaxed max-w-lg mb-10">
              {t.business.subtitle}
            </p>
            <a href="#download" className="btn-primary">
              {t.business.cta}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right — numbered feature list */}
          <div className="lg:col-span-6 lg:pl-8">
            <dl className="space-y-8">
              {t.business.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[auto,1fr] gap-6 pb-8 hairline-b last:border-0 last:pb-0 last:shadow-none"
                >
                  <dt className="font-display font-extrabold text-[28px] text-ocean/35 tabular-nums leading-none pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </dt>
                  <div>
                    <div className="font-display text-[19px] text-ink mb-2">{f.title}</div>
                    <dd className="text-[14.5px] text-ink-500 leading-relaxed max-w-md">{f.body}</dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
