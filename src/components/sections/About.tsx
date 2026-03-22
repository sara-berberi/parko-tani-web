"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative section-padding bg-brand-50/30 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />

      {/* Background skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56 opacity-[0.025]">
        <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" fill="currentColor">
          <rect x="60" y="60" width="80" height="140" />
          <rect x="160" y="20" width="100" height="180" />
          <rect x="290" y="80" width="70" height="120" />
          <rect x="380" y="30" width="90" height="170" />
          <rect x="500" y="10" width="70" height="190" />
          <rect x="600" y="50" width="70" height="150" />
          <rect x="700" y="20" width="90" height="180" />
          <rect x="820" y="60" width="70" height="140" />
          <rect x="910" y="40" width="150" height="160" />
          <rect x="1090" y="60" width="80" height="140" />
          <rect x="1190" y="30" width="90" height="170" />
          <rect x="1310" y="50" width="130" height="150" />
        </svg>
      </div>

      <div className="section-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left header — spans 2 cols */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eyebrow text-brand-300 mb-4"
            >
              {t.about.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="section-heading"
            >
              {t.about.title}{" "}
              <span className="text-brand-500">{t.about.titleAccent}</span>
            </motion.h2>
          </div>

          {/* Right content — spans 3 cols */}
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-[17px] text-brand-400 leading-[1.75] mb-6"
            >
              {t.about.body1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-base md:text-[17px] text-brand-400 leading-[1.75] mb-12"
            >
              {t.about.body2}
            </motion.p>

            {/* Mission statement */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="relative p-7 md:p-9 rounded-3xl bg-white border border-brand-100/60"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 8px 32px rgba(37,99,168,0.04)" }}
            >
              {/* Left accent line */}
              <div className="absolute top-6 bottom-6 left-0 w-1 rounded-full bg-gradient-to-b from-brand-500 to-accent-blue" />

              <p className="font-display font-bold text-lg md:text-xl text-brand-700 leading-relaxed pl-5">
                &ldquo;{t.about.mission}&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
