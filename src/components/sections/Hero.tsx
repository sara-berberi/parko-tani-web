"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base grid pattern */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,168,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,168,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Road network */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main roads */}
        <line x1="0" y1="300" x2="1440" y2="300" stroke="rgba(37,99,168,0.08)" strokeWidth="24" />
        <line x1="0" y1="300" x2="1440" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="2" strokeDasharray="28,20" />
        <line x1="0" y1="600" x2="1440" y2="600" stroke="rgba(37,99,168,0.06)" strokeWidth="18" />
        <line x1="480" y1="0" x2="480" y2="900" stroke="rgba(37,99,168,0.08)" strokeWidth="24" />
        <line x1="480" y1="0" x2="480" y2="900" stroke="rgba(255,255,255,0.03)" strokeWidth="2" strokeDasharray="28,20" />
        <line x1="960" y1="0" x2="960" y2="900" stroke="rgba(37,99,168,0.06)" strokeWidth="18" />

        {/* Roundabout */}
        <circle cx="720" cy="450" r="50" stroke="rgba(37,99,168,0.1)" strokeWidth="20" fill="none" />
        <circle cx="720" cy="450" r="20" fill="rgba(37,99,168,0.06)" />

        {/* City blocks */}
        <rect x="40" y="40" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />
        <rect x="520" y="40" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />
        <rect x="1000" y="40" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />
        <rect x="40" y="340" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />
        <rect x="1000" y="340" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />
        <rect x="40" y="640" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />
        <rect x="1000" y="640" width="400" height="220" rx="12" fill="rgba(37,99,168,0.025)" stroke="rgba(37,99,168,0.04)" strokeWidth="1" />

        {/* P markers with subtle glow */}
        <text x="200" y="170" fontFamily="Outfit" fontWeight="800" fontSize="48" fill="rgba(91,163,245,0.12)">P</text>
        <text x="1160" y="470" fontFamily="Outfit" fontWeight="800" fontSize="48" fill="rgba(91,163,245,0.12)">P</text>
        <text x="200" y="770" fontFamily="Outfit" fontWeight="800" fontSize="48" fill="rgba(91,163,245,0.12)">P</text>
        <text x="1160" y="770" fontFamily="Outfit" fontWeight="800" fontSize="48" fill="rgba(91,163,245,0.12)">P</text>
      </svg>

      {/* Center glow — large diffuse gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] animate-pulse-glow">
        <div className="w-full h-full rounded-full" style={{
          background: "radial-gradient(circle, rgba(37,99,168,0.25) 0%, rgba(37,99,168,0.08) 40%, transparent 70%)"
        }} />
      </div>

      {/* Secondary glow — top right */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] opacity-40">
        <div className="w-full h-full rounded-full" style={{
          background: "radial-gradient(circle, rgba(91,163,245,0.15) 0%, transparent 60%)"
        }} />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-950 to-transparent" />
    </div>
  );
}

function FloatingPin({
  className,
  size = "lg",
  delay = 0,
  opacity = 1,
}: {
  className: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
  opacity?: number;
}) {
  const sizes = {
    sm: { pin: "w-10 h-10", text: "text-sm", shadow: "w-3 h-1" },
    md: { pin: "w-14 h-14", text: "text-lg", shadow: "w-4 h-1.5" },
    lg: { pin: "w-16 h-16 md:w-[72px] md:h-[72px]", text: "text-xl md:text-2xl", shadow: "w-5 h-2" },
  };
  const s = sizes[size];

  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      style={{ opacity }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <div className={`${s.pin} rounded-full rounded-bl-none -rotate-45 bg-gradient-to-br from-brand-500 to-brand-600 border-[3px] border-white/25 flex items-center justify-center`}
        style={{ boxShadow: "0 8px 32px rgba(37,99,168,0.5), 0 0 60px rgba(37,99,168,0.15)" }}
      >
        <span className={`rotate-45 font-extrabold text-white ${s.text}`}>P</span>
      </div>
      <div className={`${s.shadow} mx-auto mt-1.5 bg-brand-500/20 rounded-full blur-sm`} />
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-950 noise-overlay"
    >
      {/* Parallax background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <MapBackground />
      </motion.div>

      {/* Floating pins — parallax layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <FloatingPin className="top-[12%] left-[6%] md:left-[10%] hidden sm:block" size="lg" delay={0} />
        <FloatingPin className="top-[18%] right-[8%] md:right-[12%] hidden sm:block" size="md" delay={1.8} />
        <FloatingPin className="bottom-[25%] left-[14%] hidden md:block" size="sm" delay={0.9} opacity={0.5} />
        <FloatingPin className="top-[35%] right-[22%] hidden lg:block" size="sm" delay={2.5} opacity={0.3} />
        <FloatingPin className="bottom-[35%] right-[8%] hidden lg:block" size="md" delay={1.2} opacity={0.4} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-accent-blue/60 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-blink" />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-[-0.04em] text-white mb-7 md:mb-8"
        >
          {t.hero.headline1}
          <br />
          <span className="bg-gradient-to-r from-accent-blue via-blue-400 to-accent-blue bg-clip-text text-transparent">
            {t.hero.headline2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg lg:text-xl text-white/35 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed font-light"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#download"
            className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-[18px] bg-brand-500 text-white font-display font-bold text-base rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              boxShadow: "0 0 0 1px rgba(91,163,245,0.2), 0 8px 32px rgba(37,99,168,0.4), 0 0 80px rgba(37,99,168,0.15)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              {t.hero.cta}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a
            href="#stats"
            className="group w-full sm:w-auto px-8 md:px-10 py-4 md:py-[18px] text-white/35 hover:text-white/60 font-medium text-base transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            {t.hero.ctaSecondary}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 md:mt-20 text-[13px] text-white/15 font-medium tracking-wide"
        >
          {t.hero.tagline}
        </motion.p>
      </motion.div>

      {/* Bottom fade with subtle branding */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="section-container flex items-center justify-between py-6 md:py-8">
          <span className="text-[13px] text-white/15 font-medium tracking-wide">@parkotani</span>
          <span className="font-display font-extrabold text-lg text-white/10 tracking-tight">
            Parko <span className="text-accent-blue/20">Tani</span>
          </span>
        </div>
      </div>
    </section>
  );
}
