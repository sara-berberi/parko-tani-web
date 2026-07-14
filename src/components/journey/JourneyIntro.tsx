"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

/* The title card. Full-bleed, quiet, and it hands you straight
   into the pinned drive below. */
export function JourneyIntro() {
  const { t } = useLanguage();
  const j = t.journey;

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-paper overflow-hidden pt-[120px] pb-24">
      {/* A single street, drawn once, receding into the page */}
      <BackdropStreet />

      <div className="container-x relative">
        <motion.div {...fadeUp(0)} className="eyebrow mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          {j.badge}
        </motion.div>

        <motion.h1
          {...fadeUp(0.06)}
          className="display text-[52px] sm:text-[76px] lg:text-[104px] leading-[0.94] tracking-[-0.035em] max-w-[14ch]"
        >
          {j.headline1} <span className="text-ocean">{j.headline2}</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.12)}
          className="mt-10 text-[17px] lg:text-[19px] text-ink-500 max-w-lg leading-[1.6]"
        >
          {j.subtitle}
        </motion.p>

        <motion.div
          {...fadeUp(0.18)}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <a href="#download" className="btn-primary">
            {j.cta}
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
          <a href="#journey" className="btn-secondary">
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        {/* <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-ink-400">
          {j.scrollHint}
        </span> */}
        <div className="relative w-px h-10 bg-ink/12 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 h-4 bg-ocean"
            animate={{ y: ["-100%", "260%"] }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* A quiet perspective road behind the type — the journey, implied. */
function BackdropStreet() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="introFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1220" stopOpacity={0} />
          <stop offset="100%" stopColor="#0b1220" stopOpacity={0.07} />
        </linearGradient>
      </defs>

      {/* Receding road */}
      <path
        d="M 980 900 L 1180 380 L 1260 380 L 1240 900 Z"
        fill="url(#introFade)"
      />

      {/* Lane dashes running to the vanishing point */}
      <motion.path
        d="M 1108 900 L 1216 385"
        fill="none"
        stroke="#c88a2e"
        strokeOpacity={0.3}
        strokeWidth={3}
        strokeDasharray="26 30"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.35, ease }}
      />

      {/* Horizon */}
      <motion.line
        x1={860}
        y1={380}
        x2={1440}
        y2={380}
        stroke="#0b1220"
        strokeOpacity={0.08}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease }}
      />

      {/* Cross streets */}
      {[520, 640, 780].map((y, i) => (
        <motion.line
          key={y}
          x1={760 + i * 20}
          y1={y}
          x2={1440}
          y2={y}
          stroke="#0b1220"
          strokeOpacity={0.05}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6 + i * 0.1, ease }}
        />
      ))}
    </svg>
  );
}
