"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [
  <svg key="ls" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>,
  <svg key="ar" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="ea" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>,
];

function DashboardMockup() {
  return (
    <div className="relative rounded-3xl bg-brand-900 overflow-hidden border border-white/[0.06] noise-overlay"
      style={{ boxShadow: "0 32px 64px -16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[11px] font-medium text-white/20 tracking-wide">dashboard.parkotani.al</span>
        <div className="w-12" />
      </div>

      <div className="p-5 md:p-6 space-y-4">
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-brand-500/15 rounded-full blur-[60px]" />

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-3">
          {[
            { val: "12", label: "Spots", color: "text-accent-blue" },
            { val: "8", label: "Active", color: "text-accent-green" },
            { val: "24", label: "Today", color: "text-accent-amber" },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              <p className={`font-display font-extrabold text-2xl ${s.color}`}>{s.val}</p>
              <p className="text-[11px] text-white/25 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Reservation items */}
        {[
          { name: "Andi M.", spot: "#4 · 14:30", status: "Confirmed", statusColor: "bg-accent-green/15 text-accent-green", iconColor: "#22c55e", icon: <polyline points="20 6 9 17 4 12" /> },
          { name: "Sara K.", spot: "#7 · 15:00", status: "Pending", statusColor: "bg-accent-amber/15 text-accent-amber", iconColor: "#f59e0b", icon: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></> },
          { name: "Drini L.", spot: "#2 · 15:30", status: "New", statusColor: "bg-accent-blue/15 text-accent-blue", iconColor: "#5ba3f5", icon: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></> },
        ].map((item) => (
          <div key={item.name} className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] transition-colors hover:bg-white/[0.04]">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.iconColor} strokeWidth="2.2">
                {item.icon}
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/60 truncate">{item.name}</p>
              <p className="text-[11px] text-white/20">Spot {item.spot}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${item.statusColor} flex-shrink-0`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ForBusinesses() {
  const { t } = useLanguage();

  return (
    <section id="business" className="relative section-padding bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <DashboardMockup />
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eyebrow text-brand-300 mb-4"
            >
              {t.business.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="section-heading mb-5"
            >
              {t.business.title}{" "}
              <span className="text-brand-500">{t.business.titleAccent}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-base md:text-lg text-brand-300 leading-relaxed mb-12 max-w-lg"
            >
              {t.business.subtitle}
            </motion.p>

            <div className="space-y-6 mb-12">
              {t.business.features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.18 + i * 0.08 }}
                  className="flex gap-5 items-start group"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/[0.06] border border-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0 transition-all duration-300 group-hover:bg-brand-500/[0.1] group-hover:scale-110">
                    {icons[i]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-brand-700 mb-1.5 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-[15px] text-brand-300 leading-relaxed">{feat.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              href="mailto:partner@parkotani.al"
              className="group inline-flex items-center gap-2.5 px-7 py-4 bg-brand-500 hover:bg-brand-600 text-white font-display font-bold text-[15px] rounded-2xl transition-all duration-300 hover:shadow-glow-md active:scale-[0.98]"
            >
              {t.business.cta}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
