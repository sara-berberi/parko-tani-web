"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { n: "01", title: t.howItWorks.step1Title, body: t.howItWorks.step1Body },
    { n: "02", title: t.howItWorks.step2Title, body: t.howItWorks.step2Body },
    { n: "03", title: t.howItWorks.step3Title, body: t.howItWorks.step3Body },
  ];

  return (
    <section id="how-it-works" className="section-y bg-paper hairline-t">
      <div className="container-x">
        <div className="max-w-xl mb-16 md:mb-20">
          <div className="eyebrow mb-5">{t.howItWorks.eyebrow}</div>
          <h2 className="display text-display-md md:text-display-lg">
            {t.howItWorks.title}{" "}
            <span className="text-ocean">{t.howItWorks.titleAccent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${i > 0 ? "md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}
              style={i < 2 ? { borderRight: "1px solid rgba(11,18,32,0.08)" } : undefined}
            >
              <div className="font-display font-extrabold text-[56px] text-ocean/25 leading-none mb-5 tabular-nums">
                {step.n}
              </div>
              <h3 className="font-display text-[22px] text-ink mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-[14.5px] text-ink-500 leading-[1.6] max-w-xs">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
