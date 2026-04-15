"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export function Download() {
  const { t } = useLanguage();

  return (
    <section id="download" className="section-y bg-ink text-paper relative overflow-hidden">
      {/* Single diagonal accent */}
      <div
        aria-hidden
        className="absolute top-0 right-10 w-px h-24 bg-ocean-300/30 hidden md:block"
      />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="eyebrow mb-6 text-paper/50 before:bg-paper/30">{t.download.eyebrow}</div>
          <h2 className="display text-display-md md:text-display-lg text-paper">
            {t.download.title}{" "}
            <span className="text-ocean-300">{t.download.titleAccent}</span>
          </h2>
          <p className="text-[17px] text-paper/55 mt-6 leading-relaxed max-w-lg">
            {t.download.subtitle}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <StoreButton
              platform="ios"
              label={t.download.appStore}
              small={t.download.comingSoon}
            />
            <StoreButton
              platform="android"
              label={t.download.playStore}
              small={t.download.comingSoon}
            />
          </div>
        </motion.div>

        {/* Beta tester CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20"
        >
          <div
            className="rounded-[20px] p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="flex-1">
                <div
                  className="font-bold uppercase tracking-[0.2em] mb-3"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}
                >
                  Beta Program
                </div>
                <h3
                  className="font-display font-extrabold leading-[1.1] tracking-[-0.02em] mb-3 text-paper"
                  style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                >
                  Dëshironi të jeni beta tester?{" "}
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>
                    Është falas.
                  </span>
                </h3>
                <p
                  className="leading-relaxed max-w-lg"
                  style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}
                >
                  Jemi duke u hapur për bizneset e para. Testoni platformën para lançimit dhe formësoni produktin bashkë me ne.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://instagram.com/parkotani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-200"
                  style={{
                    padding: "12px 24px",
                    fontSize: 14,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#ffffff",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                  }}
                >
                  Na kontaktoni
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoreButton({
  platform,
  label,
  small,
}: {
  platform: "ios" | "android";
  label: string;
  small: string;
}) {
  return (
    <button
      type="button"
      disabled
      className="group inline-flex items-center gap-3 h-14 pl-4 pr-6 rounded-full bg-paper/[0.05] hover:bg-paper/[0.08] ring-1 ring-paper/15 hover:ring-paper/25 transition-all duration-300 disabled:cursor-not-allowed"
    >
      <span className="flex items-center justify-center w-8 h-8 text-paper">
        {platform === "ios" ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.6 2.3C3.2 2.6 3 3 3 3.6v16.8c0 .6.2 1 .6 1.3l9-9-9-9zm10.4 10l2.7 2.7-10.6 6c-.2.1-.5.1-.7 0l8.6-8.7zm0-2l-8.6-8.7c.2-.1.5-.1.7 0l10.6 6-2.7 2.7zm5.3-.3l-3.3 1.9 3-3c.2-.3.2-.6 0-.9l-3-3 3.3 1.9c.6.3.6 1.2 0 1.5l.1-.4z"/>
          </svg>
        )}
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-wider text-paper/40 mb-1">{small}</span>
        <span className="text-[14px] font-medium text-paper">{label}</span>
      </span>
    </button>
  );
}
