"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, delay, ease },
});

/* The landing after the drive. Dark, so the journey visibly "ends"
   and the page changes register. */
export function JourneyOutro() {
  const { t } = useLanguage();
  const o = t.journey.outro;

  const stats = [
    { value: o.statTime, label: o.statTimeLabel },
    { value: o.statSpots, label: o.statSpotsLabel },
    { value: o.statLive, label: o.statLiveLabel },
  ];

  return (
    <section className="relative section-y bg-ink text-paper overflow-hidden">
      {/* The route, resolved — a single line coming to rest */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <motion.path
          d="M -50 620 C 260 620, 340 420, 620 420 S 1000 250, 1490 250"
          fill="none"
          stroke="#7fa3d2"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease }}
        />
        <motion.circle
          r={6}
          fill="#3a9d7a"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.9, duration: 0.4 }}
          cx={1200}
          cy={250}
        />
      </svg>

      <div className="container-x relative">
        <motion.div
          {...rise(0)}
          className="eyebrow mb-6 text-paper/50 [&::before]:bg-paper/25"
        >
          {o.eyebrow}
        </motion.div>

        <motion.h2
          {...rise(0.05)}
          className="font-display font-extrabold tracking-tight text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.0] max-w-[16ch]"
        >
          {o.title}{" "}
          <span className="text-ocean-300">{o.titleAccent}</span>
        </motion.h2>

        <motion.p
          {...rise(0.1)}
          className="mt-8 text-[17px] lg:text-[19px] text-paper/55 max-w-lg leading-[1.6]"
        >
          {o.body}
        </motion.p>

        <motion.div {...rise(0.15)} className="mt-12">
          <a
            href="#download"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-paper text-ink text-[14px] font-medium tracking-tight transition-all duration-300 hover:bg-ocean hover:text-paper active:scale-[0.98]"
          >
            {t.journey.cta}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...rise(0.22)}
          className="mt-20 grid sm:grid-cols-3 gap-10 sm:gap-6 pt-10 hairline-b-light"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <div className="font-display font-extrabold text-[32px] lg:text-[38px] text-paper leading-none tabular-nums">
                {s.value}
              </div>
              <div className="mt-2.5 text-[13px] text-paper/45 leading-relaxed max-w-[22ch]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
