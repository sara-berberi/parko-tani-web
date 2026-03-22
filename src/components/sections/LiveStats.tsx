"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  // Match a leading number (e.g. "500+" or "30s"), otherwise fall back to static display
  const match = value.match(/^(\d+)(.*)$/);
  const numericPart = match ? parseInt(match[1]) : null;
  const afterNumber = match ? match[2] : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || numericPart === null) return;
    let start = 0;
    const end = numericPart;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericPart]);

  return (
    <span ref={ref}>
      {numericPart !== null ? `${count}${afterNumber}` : value}{suffix}
    </span>
  );
}

function InteractiveMap({ freeLabel, limitedLabel }: { freeLabel: string; limitedLabel: string }) {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50 border border-brand-200/40 shadow-card">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-brand-200/20" />

      <svg className="relative w-full h-full" viewBox="0 0 540 540" fill="none">
        {/* Roads */}
        <line x1="0" y1="180" x2="540" y2="180" stroke="#c4d8ee" strokeWidth="16" />
        <line x1="0" y1="180" x2="540" y2="180" stroke="white" strokeWidth="2" strokeDasharray="14,10" strokeOpacity="0.8" />
        <line x1="0" y1="360" x2="540" y2="360" stroke="#c4d8ee" strokeWidth="16" />
        <line x1="0" y1="360" x2="540" y2="360" stroke="white" strokeWidth="2" strokeDasharray="14,10" strokeOpacity="0.8" />
        <line x1="180" y1="0" x2="180" y2="540" stroke="#c4d8ee" strokeWidth="16" />
        <line x1="180" y1="0" x2="180" y2="540" stroke="white" strokeWidth="2" strokeDasharray="14,10" strokeOpacity="0.8" />
        <line x1="380" y1="0" x2="380" y2="540" stroke="#c4d8ee" strokeWidth="16" />

        {/* Blocks */}
        <rect x="10" y="10" width="158" height="158" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="198" y="10" width="170" height="158" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="392" y="10" width="138" height="158" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="10" y="198" width="158" height="150" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="198" y="198" width="170" height="150" rx="10" fill="#dff0df" stroke="#c8e2cc" strokeWidth="2" />
        <rect x="392" y="198" width="138" height="150" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="10" y="374" width="158" height="156" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="198" y="374" width="170" height="156" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />
        <rect x="392" y="374" width="138" height="156" rx="10" fill="#e8f0f9" stroke="white" strokeWidth="2" />

        {/* P zone markers */}
        <text x="62" y="102" fontFamily="sans-serif" fontWeight="800" fontSize="30" fill="rgba(37,99,168,0.15)">P</text>
        <text x="430" y="290" fontFamily="sans-serif" fontWeight="800" fontSize="30" fill="rgba(37,99,168,0.15)">P</text>
        <text x="62" y="468" fontFamily="sans-serif" fontWeight="800" fontSize="30" fill="rgba(37,99,168,0.15)">P</text>

        {/* Pulse rings */}
        <circle cx="283" cy="273" r="50" fill="none" stroke="rgba(37,99,168,0.06)" strokeWidth="1">
          <animate attributeName="r" from="30" to="60" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="283" cy="273" r="35" fill="none" stroke="rgba(37,99,168,0.1)" strokeWidth="1">
          <animate attributeName="r" from="20" to="45" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        {/* Main active pin */}
        <defs>
          <linearGradient id="pinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3577d4" />
            <stop offset="100%" stopColor="#1848a0" />
          </linearGradient>
          <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#2563a8" floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#pinShadow)">
          <path d="M320 290 C320 260 298 240 270 240 C242 240 220 260 220 290 C220 320 270 358 270 358 C270 358 320 320 320 290Z" fill="url(#pinGrad)" />
          <circle cx="270" cy="283" r="18" fill="white" />
          <circle cx="270" cy="283" r="8" fill="#2563a8" />
        </g>
        <ellipse cx="270" cy="365" rx="16" ry="5" fill="rgba(37,99,168,0.12)" />

        {/* Secondary pins */}
        <g opacity="0.6">
          <path d="M118 105 C118 90 108 80 95 80 C82 80 72 90 72 105 C72 120 95 136 95 136 C95 136 118 120 118 105Z" fill="#2563a8" />
          <circle cx="95" cy="102" r="9" fill="white" />
        </g>
        <g opacity="0.4">
          <path d="M460 450 C460 438 452 428 443 428 C434 428 426 438 426 450 C426 462 443 472 443 472 C443 472 460 462 460 450Z" fill="#2563a8" />
          <circle cx="443" cy="448" r="7" fill="white" />
        </g>
      </svg>

      {/* HTML availability badges — proper font rendering */}
      <div className="absolute top-[48%] left-[36%] -translate-x-1/2 -translate-y-1/2">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-green text-white text-[11px] font-bold tracking-wider uppercase shadow-md shadow-accent-green/30 whitespace-nowrap">
          {freeLabel}
        </span>
      </div>
      <div className="absolute top-[79%] left-[76%] -translate-x-1/2 -translate-y-1/2">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-amber text-white text-[11px] font-bold tracking-wider uppercase shadow-md shadow-accent-amber/30 whitespace-nowrap">
          {limitedLabel}
        </span>
      </div>
    </div>
  );
}

export function LiveStats() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: t.stats.spots, label: t.stats.spotsLabel, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { value: t.stats.time, label: t.stats.timeLabel, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )},
    { value: t.stats.availability, label: t.stats.availabilityLabel, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <section ref={sectionRef} id="stats" className="relative section-padding bg-white overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200/50 to-transparent" />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-500/[0.06] border border-brand-500/10 text-brand-500 eyebrow mb-7">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-blink" />
                {t.stats.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="section-heading mb-6"
            >
              {t.stats.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base md:text-lg text-brand-400 leading-relaxed mb-12 max-w-lg"
            >
              {t.stats.subtitle}
            </motion.p>

            <div className="space-y-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="card-premium flex items-center gap-5 !p-5 md:!p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/[0.07] flex items-center justify-center text-brand-500 flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="flex items-baseline gap-4 flex-1">
                    <span className="font-display font-extrabold text-3xl md:text-4xl text-brand-500 tracking-tight">
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className="text-sm md:text-base text-brand-300 font-medium">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <InteractiveMap freeLabel={t.stats.free} limitedLabel={t.stats.limited} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
