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

function Pin({ cx, cy, r = 11, opacity = 1, pulse = false }: { cx: number; cy: number; r?: number; opacity?: number; pulse?: boolean }) {
  const tip = cy + r * 2.2;
  return (
    <g opacity={opacity}>
      {pulse && <>
        <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="rgba(37,99,168,0.12)" strokeWidth="1">
          <animate attributeName="r" from={r} to={r + 18} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r={r + 2} fill="none" stroke="rgba(37,99,168,0.09)" strokeWidth="1">
          <animate attributeName="r" from={r - 4} to={r + 12} dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </>}
      <path
        d={`M${cx + r * 1.18} ${cy} C${cx + r * 1.18} ${cy - r * 1.1} ${cx + r * 0.5} ${cy - r * 1.9} ${cx} ${cy - r * 1.9} C${cx - r * 0.5} ${cy - r * 1.9} ${cx - r * 1.18} ${cy - r * 1.1} ${cx - r * 1.18} ${cy} C${cx - r * 1.18} ${cy + r * 1.1} ${cx} ${tip} ${cx} ${tip} C${cx} ${tip} ${cx + r * 1.18} ${cy + r * 1.1} ${cx + r * 1.18} ${cy}Z`}
        fill="url(#pinGrad)"
        filter="url(#pinShadowSm)"
      />
      <circle cx={cx} cy={cy - r * 0.4} r={r * 0.55} fill="white" />
      <circle cx={cx} cy={cy - r * 0.4} r={r * 0.25} fill="#2563a8" />
      <ellipse cx={cx} cy={tip + 3} rx={r * 0.6} ry={r * 0.18} fill="rgba(37,99,168,0.1)" />
    </g>
  );
}

function InteractiveMap({ freeLabel, limitedLabel, threeLabel, oneLabel, fullLabel }: { freeLabel: string; limitedLabel: string; threeLabel: string; oneLabel: string; fullLabel: string }) {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50 border border-brand-200/40 shadow-card">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-brand-200/20" />

      <svg className="relative w-full h-full" viewBox="0 0 540 540" fill="none">
        <defs>
          <linearGradient id="pinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3577d4" />
            <stop offset="100%" stopColor="#1848a0" />
          </linearGradient>
          <filter id="pinShadowSm" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563a8" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* ── Roads ── */}
        {/* Rr. e Kavajës — diagonal */}
        <line x1="0" y1="430" x2="540" y2="90" stroke="#c4d8ee" strokeWidth="17" />
        <line x1="0" y1="430" x2="540" y2="90" stroke="white" strokeWidth="2" strokeDasharray="16,12" strokeOpacity="0.9" />
        {/* Bulevardi Zogu I — horizontal */}
        <line x1="0" y1="255" x2="540" y2="255" stroke="#c4d8ee" strokeWidth="14" />
        <line x1="0" y1="255" x2="540" y2="255" stroke="white" strokeWidth="2" strokeDasharray="14,10" strokeOpacity="0.8" />
        {/* Bl. Bajram Curri — vertical */}
        <line x1="172" y1="0" x2="172" y2="540" stroke="#c4d8ee" strokeWidth="13" />
        <line x1="172" y1="0" x2="172" y2="540" stroke="white" strokeWidth="2" strokeDasharray="14,10" strokeOpacity="0.8" />
        {/* Rr. Abdyl Frashëri — vertical right */}
        <line x1="385" y1="0" x2="385" y2="540" stroke="#c4d8ee" strokeWidth="11" />
        <line x1="385" y1="0" x2="385" y2="540" stroke="white" strokeWidth="2" strokeDasharray="12,9" strokeOpacity="0.7" />
        {/* Rr. e Durrësit — horizontal lower */}
        <line x1="0" y1="395" x2="540" y2="395" stroke="#c4d8ee" strokeWidth="11" />
        <line x1="0" y1="395" x2="540" y2="395" stroke="white" strokeWidth="2" strokeDasharray="12,9" strokeOpacity="0.7" />
        {/* Rr. Myslym Shyri — horizontal upper */}
        <line x1="0" y1="138" x2="540" y2="138" stroke="#c4d8ee" strokeWidth="9" />
        <line x1="0" y1="138" x2="540" y2="138" stroke="white" strokeWidth="1.5" strokeDasharray="10,8" strokeOpacity="0.7" />
        {/* Rr. Ismail Qemali — vertical center-right */}
        <line x1="290" y1="0" x2="290" y2="540" stroke="#c4d8ee" strokeWidth="9" />
        <line x1="290" y1="0" x2="290" y2="540" stroke="white" strokeWidth="1.5" strokeDasharray="10,8" strokeOpacity="0.7" />
        {/* Rr. Pjetër Bogdani — horizontal mid-lower */}
        <line x1="0" y1="330" x2="540" y2="330" stroke="#c4d8ee" strokeWidth="8" />
        <line x1="0" y1="330" x2="540" y2="330" stroke="white" strokeWidth="1.5" strokeDasharray="10,8" strokeOpacity="0.6" />
        {/* Rr. Tefta Tashko — vertical far-left */}
        <line x1="68" y1="0" x2="68" y2="540" stroke="#c4d8ee" strokeWidth="7" />
        {/* Rr. Themistokli Gërmenji — vertical far-right */}
        <line x1="480" y1="0" x2="480" y2="540" stroke="#c4d8ee" strokeWidth="7" />
        {/* Rr. Muhamet Gjollesha — horizontal top */}
        <line x1="0" y1="52" x2="540" y2="52" stroke="#c4d8ee" strokeWidth="7" />
        {/* Rr. Sami Frashëri — horizontal bottom */}
        <line x1="0" y1="480" x2="540" y2="480" stroke="#c4d8ee" strokeWidth="7" />

        {/* ── Blocks ── */}
        <rect x="10"  y="10"  width="46"  height="116" rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="80"  y="10"  width="80"  height="116" rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="184" y="10"  width="94"  height="116" rx="6" fill="#edf4fb" stroke="#d8e8f4" strokeWidth="1.5" />
        <rect x="300" y="10"  width="73"  height="116" rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="394" y="10"  width="74"  height="116" rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="494" y="10"  width="36"  height="116" rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />

        <rect x="10"  y="150" width="46"  height="93"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="80"  y="150" width="80"  height="93"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="184" y="150" width="94"  height="93"  rx="6" fill="#dff0e8" stroke="#c8e2cc" strokeWidth="1.5" />
        <rect x="300" y="150" width="73"  height="93"  rx="6" fill="#dff0e8" stroke="#c8e2cc" strokeWidth="1.5" />
        <rect x="394" y="150" width="74"  height="93"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="494" y="150" width="36"  height="93"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />

        <rect x="10"  y="267" width="46"  height="51"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="80"  y="267" width="80"  height="51"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="184" y="267" width="94"  height="51"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="300" y="267" width="73"  height="51"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="394" y="267" width="74"  height="51"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="494" y="267" width="36"  height="51"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />

        <rect x="10"  y="342" width="46"  height="41"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="80"  y="342" width="80"  height="41"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="184" y="342" width="94"  height="41"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="300" y="342" width="73"  height="41"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="394" y="342" width="74"  height="41"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="494" y="342" width="36"  height="41"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />

        <rect x="10"  y="407" width="46"  height="61"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="80"  y="407" width="80"  height="61"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="184" y="407" width="94"  height="61"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="300" y="407" width="73"  height="61"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="394" y="407" width="74"  height="61"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="494" y="407" width="36"  height="61"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />

        <rect x="10"  y="492" width="46"  height="38"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="80"  y="492" width="80"  height="38"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="184" y="492" width="94"  height="38"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="300" y="492" width="73"  height="38"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="394" y="492" width="74"  height="38"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />
        <rect x="494" y="492" width="36"  height="38"  rx="6" fill="#e8f0f9" stroke="white" strokeWidth="1.5" />

        {/* ── Street name labels ── */}
        <text x="270" y="248" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="rgba(37,99,168,0.4)" letterSpacing="0.4">Bulevardi Zogu I</text>
        <text x="270" y="388" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.32)" letterSpacing="0.3">Rruga e Durrësit</text>
        <text x="270" y="323" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.28)" letterSpacing="0.3">Rr. Pjetër Bogdani</text>
        <text x="270" y="131" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.28)" letterSpacing="0.3">Rr. Myslym Shyri</text>
        <text x="270" y="45"  textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" fill="rgba(37,99,168,0.22)" letterSpacing="0.3">Rr. Muhamet Gjollesha</text>
        <text x="172" y="535" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.32)" transform="rotate(-90 172 535)" letterSpacing="0.3">Bl. Bajram Curri</text>
        <text x="385" y="535" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.28)" transform="rotate(-90 385 535)" letterSpacing="0.3">Rr. Abdyl Frashëri</text>
        <text x="290" y="535" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.25)" transform="rotate(-90 290 535)" letterSpacing="0.3">Rr. Ismail Qemali</text>
        <text x="68"  y="535" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" fill="rgba(37,99,168,0.22)" transform="rotate(-90 68 535)" letterSpacing="0.3">Rr. Tefta Tashko</text>
        <text x="100" y="118" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="600" fill="rgba(37,99,168,0.28)" transform="rotate(-32 100 118)" letterSpacing="0.3">Rr. e Kavajës</text>

        {/* ── Neighborhood labels ── */}
        <text x="231" y="175" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="800" fill="rgba(37,99,168,0.16)" letterSpacing="1.2">BLLOKU</text>
        <text x="231" y="65"  textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="800" fill="rgba(37,99,168,0.13)" letterSpacing="0.8">SH. SKËNDERBEJ</text>
        <text x="40"  y="108" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="700" fill="rgba(37,99,168,0.12)" letterSpacing="0.5">QENDRA</text>
        <text x="437" y="80"  textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="700" fill="rgba(37,99,168,0.11)" letterSpacing="0.5">PAZARI</text>
        <text x="437" y="210" textAnchor="middle" fontFamily="sans-serif" fontSize="7"   fontWeight="700" fill="rgba(37,99,168,0.10)" letterSpacing="0.5">KOMUNA E PARISIT</text>
        <text x="40"  y="370" textAnchor="middle" fontFamily="sans-serif" fontSize="7"   fontWeight="700" fill="rgba(37,99,168,0.10)" letterSpacing="0.4">SELVIA</text>
        <text x="437" y="370" textAnchor="middle" fontFamily="sans-serif" fontSize="7"   fontWeight="700" fill="rgba(37,99,168,0.10)" letterSpacing="0.4">STADIUMI</text>
        <text x="231" y="460" textAnchor="middle" fontFamily="sans-serif" fontSize="7"   fontWeight="700" fill="rgba(37,99,168,0.10)" letterSpacing="0.4">KOMBINAT</text>

        {/* ── Pins ── */}
        {/* Blloku — main, pulsing */}
        <Pin cx={231} cy={192} r={13} pulse opacity={1} />
        {/* Sheshi Skënderbej */}
        <Pin cx={231} cy={72}  r={11} opacity={0.82} />
        {/* Rr. Abdyl Frashëri / Komuna e Parisit */}
        <Pin cx={437} cy={195} r={10} opacity={0.72} />
        {/* Rr. e Kavajës mid */}
        <Pin cx={112} cy={318} r={9}  opacity={0.60} />
        {/* Pazari i Ri */}
        <Pin cx={437} cy={68}  r={9}  opacity={0.58} />
        {/* Rr. Ismail Qemali / Zogu I crossing */}
        <Pin cx={290} cy={255} r={9}  opacity={0.65} />
        {/* Rr. Myslym Shyri / Bajram Curri */}
        <Pin cx={172} cy={138} r={8}  opacity={0.52} />
        {/* Rr. Durrësit west */}
        <Pin cx={40}  cy={395} r={8}  opacity={0.45} />
        {/* Rr. Durrësit east */}
        <Pin cx={480} cy={395} r={8}  opacity={0.45} />
        {/* Selvia area */}
        <Pin cx={40}  cy={355} r={7}  opacity={0.38} />
        {/* Stadiumi */}
        <Pin cx={480} cy={310} r={7}  opacity={0.38} />
        {/* Rr. Pjetër Bogdani mid */}
        <Pin cx={340} cy={330} r={7}  opacity={0.40} />
        {/* Kombinat / lower center */}
        <Pin cx={231} cy={450} r={7}  opacity={0.32} />
        {/* Far top-left corner */}
        <Pin cx={40}  cy={40}  r={6}  opacity={0.28} />
        {/* Far bottom-right */}
        <Pin cx={510} cy={510} r={6}  opacity={0.25} />
      </svg>

      {/* ── Blloku badge — green ── */}
      <div className="absolute" style={{ top:"40%", left:"46%", transform:"translate(-50%,-50%)" }}>
        <div className="flex flex-col items-start gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-green text-white text-[11px] font-bold shadow-md shadow-accent-green/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />{freeLabel}
          </span>
          <span className="ml-1 text-[10px] font-semibold text-brand-500">Blloku</span>
        </div>
      </div>

      {/* ── Sheshi Skënderbej badge — amber ── */}
      <div className="absolute" style={{ top:"20%", left:"50%", transform:"translate(-50%,-50%)" }}>
        <div className="flex flex-col items-start gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-amber text-white text-[11px] font-bold shadow-md shadow-accent-amber/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />{limitedLabel}
          </span>
          <span className="ml-1 text-[10px] font-semibold text-brand-500">Sh. Skënderbej</span>
        </div>
      </div>

      {/* ── Rr. e Kavajës badge — red ── */}
      <div className="absolute" style={{ top:"62%", left:"22%", transform:"translate(-50%,-50%)" }}>
        <div className="flex flex-col items-start gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-400 text-white text-[11px] font-bold shadow-md shadow-red-400/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />{fullLabel}
          </span>
          <span className="ml-1 text-[10px] font-semibold text-brand-500">Rr. e Kavajës</span>
        </div>
      </div>

      {/* ── Komuna e Parisit badge — green ── */}
      <div className="absolute" style={{ top:"42%", left:"84%", transform:"translate(-50%,-50%)" }}>
        <div className="flex flex-col items-start gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-green text-white text-[10px] font-bold shadow-sm shadow-accent-green/30 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-white/80" />{threeLabel}
          </span>
          <span className="ml-0.5 text-[9px] font-semibold text-brand-400">Komuna e Parisit</span>
        </div>
      </div>

      {/* ── Pazari i Ri badge — amber ── */}
      <div className="absolute" style={{ top:"16%", left:"84%", transform:"translate(-50%,-50%)" }}>
        <div className="flex flex-col items-start gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-amber text-white text-[10px] font-bold shadow-sm shadow-accent-amber/30 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-white/80" />{oneLabel}
          </span>
          <span className="ml-0.5 text-[9px] font-semibold text-brand-400">Pazari i Ri</span>
        </div>
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
            <InteractiveMap freeLabel={t.stats.free} limitedLabel={t.stats.limited} threeLabel={t.stats.three} oneLabel={t.stats.one} fullLabel={t.stats.full} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
