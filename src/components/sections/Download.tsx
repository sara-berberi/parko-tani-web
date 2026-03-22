"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "../Logo";

export function Download() {
  const { t } = useLanguage();

  return (
    <section id="download" className="relative section-padding bg-brand-950 overflow-hidden noise-overlay">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-950 to-brand-950" />

      {/* Stars */}
      <div className="absolute inset-0">
        {[
          { l: 11, tp: 8, s: 1.5, o: 0.5 },
          { l: 26, tp: 4, s: 1, o: 0.3 },
          { l: 42, tp: 12, s: 2, o: 0.4 },
          { l: 56, tp: 6, s: 1.5, o: 0.6 },
          { l: 69, tp: 10, s: 1, o: 0.25 },
          { l: 83, tp: 4, s: 2, o: 0.4 },
          { l: 35, tp: 18, s: 1.5, o: 0.35 },
          { l: 65, tp: 14, s: 1, o: 0.3 },
          { l: 94, tp: 7, s: 1.5, o: 0.5 },
          { l: 5, tp: 22, s: 1, o: 0.2 },
          { l: 50, tp: 3, s: 1, o: 0.4 },
          { l: 78, tp: 20, s: 1.5, o: 0.3 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.l}%`, top: `${s.tp}%`, width: s.s * 2, height: s.s * 2, opacity: s.o }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/[0.08] rounded-full blur-[100px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(91,163,245,0.06) 1px, transparent 0)",
        backgroundSize: "48px 48px",
      }} />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eyebrow text-accent-blue/50 mb-4"
            >
              {t.download.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="font-display text-display-md sm:text-display-lg lg:text-display-xl text-white mb-6"
            >
              {t.download.title}{" "}
              <span className="bg-gradient-to-r from-accent-blue to-blue-400 bg-clip-text text-transparent">
                {t.download.titleAccent}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-base md:text-lg text-white/30 leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
            >
              {t.download.subtitle}
            </motion.p>

            {/* Store buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <a href="#" className="group w-full sm:w-auto flex items-center gap-4 px-6 py-4 glass-dark rounded-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]">
                <svg className="w-7 h-7 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider leading-none font-medium">{t.download.comingSoon}</p>
                  <p className="text-[15px] font-semibold text-white mt-0.5">{t.download.appStore}</p>
                </div>
              </a>

              <a href="#" className="group w-full sm:w-auto flex items-center gap-4 px-6 py-4 glass-dark rounded-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]">
                <svg className="w-7 h-7 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider leading-none font-medium">{t.download.comingSoon}</p>
                  <p className="text-[15px] font-semibold text-white mt-0.5">{t.download.playStore}</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute -inset-16 bg-brand-500/[0.08] rounded-full blur-[60px]" />

              {/* Phone frame */}
              <div className="relative w-[260px] md:w-[280px]"
                style={{ boxShadow: "0 32px 80px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}
              >
                <div className="bg-brand-800 rounded-[2.75rem] p-[10px] border border-white/[0.06]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-brand-800 rounded-b-2xl z-20" />

                  <div className="bg-gradient-to-b from-brand-700 to-brand-800 rounded-[2.25rem] overflow-hidden aspect-[9/19.5]">
                    <div className="p-5 h-full flex flex-col">
                      {/* Status bar */}
                      <div className="flex items-center justify-between mb-5 pt-3">
                        <span className="text-[9px] text-white/30 font-medium">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-3 h-2 rounded-sm bg-white/20" />
                          <div className="w-3 h-2 rounded-sm bg-white/20" />
                          <div className="w-3 h-2 rounded-sm bg-white/20" />
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-2.5 mb-5">
                        <Logo className="w-6 h-6" />
                        <span className="text-[11px] font-bold text-white tracking-tight">Parko Tani</span>
                        <div className="ml-auto w-2 h-2 rounded-full bg-accent-green animate-blink" />
                      </div>

                      {/* Search bar */}
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.06] mb-4">
                        <svg className="w-3.5 h-3.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span className="text-[10px] text-white/15 font-medium">Search parking...</span>
                      </div>

                      {/* Map area */}
                      <div className="flex-1 rounded-2xl bg-brand-600/30 border border-white/[0.04] relative overflow-hidden">
                        {/* Mini grid */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/4 left-0 right-0 h-px bg-white/20" />
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15" />
                          <div className="absolute top-3/4 left-0 right-0 h-px bg-white/20" />
                          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/20" />
                          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15" />
                          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/20" />
                        </div>

                        {/* Pulse ring */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-10 h-10 rounded-full border border-brand-500/30 animate-ping" />
                        </div>

                        {/* Center pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 rounded-full bg-brand-500 border-[2.5px] border-white shadow-glow-sm" />
                        </div>

                        {/* Mini availability badge */}
                        <div className="absolute top-[35%] left-[30%] px-2 py-0.5 rounded-full bg-accent-green text-[7px] font-bold text-white">
                          3 free
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="mt-4 py-3 bg-brand-500 rounded-2xl text-center shadow-glow-sm">
                        <span className="text-[11px] font-bold text-white">{t.hero.cta}</span>
                      </div>

                      {/* Bottom indicator */}
                      <div className="flex justify-center mt-3">
                        <div className="w-24 h-1 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* City silhouette */}
      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <svg className="w-full h-28 md:h-36" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" fill="#0e2444">
          <rect x="40" y="40" width="80" height="80" />
          <rect x="140" y="15" width="100" height="105" />
          <rect x="270" y="50" width="70" height="70" />
          <rect x="360" y="5" width="90" height="115" />
          <rect x="480" y="0" width="60" height="120" />
          <rect x="570" y="35" width="70" height="85" />
          <rect x="670" y="15" width="90" height="105" />
          <rect x="790" y="45" width="70" height="75" />
          <rect x="880" y="25" width="150" height="95" />
          <rect x="1060" y="40" width="80" height="80" />
          <rect x="1160" y="20" width="90" height="100" />
          <rect x="1280" y="35" width="160" height="85" />
        </svg>
      </div>
    </section>
  );
}
