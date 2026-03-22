"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [
  <svg key="rt" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>,
  <svg key="zw" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  <svg key="lt" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
];

export function ValueProposition() {
  const { t } = useLanguage();

  return (
    <section className="relative section-padding bg-brand-950 overflow-hidden noise-overlay">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-950 to-brand-950" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(91,163,245,0.06) 1px, transparent 0)",
        backgroundSize: "48px 48px",
      }} />

      {/* Glow accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-brand-500/[0.06] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-accent-blue/[0.04] rounded-full blur-[80px]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-accent-blue/50 mb-4"
          >
            {t.value.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="font-display text-display-sm sm:text-display-md lg:text-display-lg text-white"
          >
            {t.value.title}{" "}
            <span className="bg-gradient-to-r from-accent-blue to-blue-400 bg-clip-text text-transparent">
              {t.value.titleAccent}
            </span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {t.value.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="card-dark group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-blue/10 border border-accent-blue/15 flex items-center justify-center text-accent-blue mb-7 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-sm">
                {icons[i]}
              </div>
              <h3 className="font-display font-bold text-xl text-white tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-[15px] text-white/30 leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
