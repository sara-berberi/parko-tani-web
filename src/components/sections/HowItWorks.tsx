"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const steps = [
  {
    num: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    titleKey: "step1Title" as const,
    bodyKey: "step1Body" as const,
    color: "from-brand-500 to-blue-600",
    shadow: "shadow-brand-500/20",
  },
  {
    num: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    titleKey: "step2Title" as const,
    bodyKey: "step2Body" as const,
    color: "from-brand-500 to-indigo-600",
    shadow: "shadow-brand-500/20",
  },
  {
    num: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    titleKey: "step3Title" as const,
    bodyKey: "step3Body" as const,
    color: "from-accent-green to-emerald-600",
    shadow: "shadow-accent-green/20",
  },
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative section-padding bg-brand-50/30 overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,168,0.04) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="section-container relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-brand-300 mb-4"
          >
            {t.howItWorks.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="section-heading"
          >
            {t.howItWorks.title}
            <br />
            <span className="text-brand-500">{t.howItWorks.titleAccent}</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group relative"
            >
              {/* Connector line for desktop */}
              {i < 2 && (
                <div className="hidden md:block absolute top-14 -right-2.5 lg:-right-4 w-5 lg:w-8 h-px bg-gradient-to-r from-brand-200 to-brand-200/0 z-10" />
              )}

              <div className="card-premium h-full !p-7 md:!p-8 lg:!p-10">
                {/* Step number watermark */}
                <span className="absolute top-4 right-6 font-display font-extrabold text-[72px] md:text-[88px] leading-none tracking-tighter text-brand-500/[0.04] select-none">
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-7 shadow-lg ${step.shadow} transition-transform duration-300 group-hover:scale-110`}>
                  {step.icon}
                </div>

                <h3 className="font-display font-bold text-xl md:text-[22px] text-brand-700 tracking-tight mb-3 leading-snug">
                  {t.howItWorks[step.titleKey]}
                </h3>
                <p className="text-[15px] text-brand-300 leading-relaxed">
                  {t.howItWorks[step.bodyKey]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
