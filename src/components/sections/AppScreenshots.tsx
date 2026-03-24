"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── shared map background inside each phone ── */
function MapScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(155deg,#eaf3fc 0%,#d4e6f4 50%,#c6dced 100%)",
      }}
    >
      {/* roads horizontal */}
      {[
        { top: "19%", h: 14 },
        { top: "51%", h: 11 },
        { top: "76%", h: 14 },
      ].map((r, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bg-[#c0d5e6]"
          style={{ top: r.top, height: r.h, borderTop: "1px solid rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.55)" }}
        />
      ))}
      {/* roads vertical */}
      {[
        { left: "16%", w: 12 },
        { left: "46%", w: 10 },
        { left: "72%", w: 12 },
      ].map((r, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 bg-[#c0d5e6]"
          style={{ left: r.left, width: r.w, borderLeft: "1px solid rgba(255,255,255,0.55)", borderRight: "1px solid rgba(255,255,255,0.55)" }}
        />
      ))}
      {/* city blocks */}
      {[
        { top:"2%",  left:"19%", w:"25%", h:"15%" },
        { top:"2%",  left:"49%", w:"21%", h:"15%" },
        { top:"24%", left:"0%",  w:"14%", h:"25%" },
        { top:"24%", left:"19%", w:"25%", h:"25%" },
        { top:"24%", left:"49%", w:"21%", h:"25%" },
        { top:"24%", left:"75%", w:"25%", h:"25%" },
        { top:"56%", left:"0%",  w:"14%", h:"18%" },
        { top:"56%", left:"19%", w:"25%", h:"18%" },
        { top:"56%", left:"49%", w:"21%", h:"18%" },
        { top:"56%", left:"75%", w:"25%", h:"18%" },
        { top:"80%", left:"0%",  w:"14%", h:"19%" },
        { top:"80%", left:"19%", w:"25%", h:"19%" },
        { top:"80%", left:"49%", w:"21%", h:"19%" },
        { top:"80%", left:"75%", w:"25%", h:"19%" },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-[3px]"
          style={{ top:b.top, left:b.left, width:b.w, height:b.h, background:"rgba(255,255,255,0.28)", border:"1px solid rgba(255,255,255,0.52)" }}
        />
      ))}
      {/* P zones */}
      {[
        { top:"26%", left:"20%", w:"11%", h:"11%" },
        { top:"57%", left:"50%", w:"9%",  h:"9%"  },
        { top:"81%", left:"76%", w:"10%", h:"9%"  },
      ].map((z, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center rounded"
          style={{ top:z.top, left:z.left, width:z.w, height:z.h, background:"rgba(37,99,168,0.065)", border:"1.5px dashed rgba(37,99,168,0.22)" }}
        >
          <span style={{ fontWeight:700, fontSize:9, color:"rgba(37,99,168,0.42)" }}>P</span>
        </div>
      ))}
      {/* Pins */}
      {[
        { top:"20%", left:"28%" },
        { top:"54%", left:"54%" },
        { top:"78%", left:"78%" },
      ].map((p, i) => (
        <div key={i} className="absolute flex flex-col items-center" style={{ top:p.top, left:p.left }}>
          <div
            className="w-5 h-5 rounded-full rounded-bl-none -rotate-45 bg-[#2563a8] border border-white/60 flex items-center justify-center"
            style={{ boxShadow:"0 2px 6px rgba(37,99,168,0.35)" }}
          >
            <span className="rotate-45 font-bold text-white" style={{ fontSize:7 }}>P</span>
          </div>
          <div className="w-1.5 h-1 bg-[#2563a8]/20 rounded-full mt-0.5 blur-[1px]" />
        </div>
      ))}
    </div>
  );
}

/* ── Phone 1: Home screen with reservations ── */
function PhoneHome() {
  return (
    <div
      className="relative mx-auto rounded-[2.8rem] overflow-hidden border-[3px] border-white/60"
      style={{
        width: 270,
        height: 560,
        background: "#dce8f5",
        boxShadow: "inset 0 2px 8px rgba(255,255,255,0.8)",
      }}
    >
      <MapScene />

      {/* notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/60 rounded-b-2xl z-20" />

      {/* overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col">
        {/* header */}
        <div
          className="pt-6 pb-2.5 px-3.5 flex items-center gap-2.5"
          style={{ background:"rgba(255,255,255,0.78)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 2px 10px rgba(15,34,64,0.07)" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
            style={{ background:"linear-gradient(135deg,#2563a8,#4a82c8)", boxShadow:"0 2px 8px rgba(37,99,168,0.25)", border:"1.5px solid rgba(255,255,255,0.8)" }}
          >
            J
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#0f2240] leading-none" style={{ fontSize:12 }}>Hello, John 👋</div>
            <div className="mt-0.5" style={{ fontSize:9, color:"#6b89a5" }}>
              <span style={{ color:"#2563a8", fontWeight:600 }}>2 active</span> reservation(s)
            </div>
          </div>
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center relative flex-shrink-0"
            style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563a8" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center text-white font-bold" style={{ fontSize:5 }}>3</span>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 overflow-hidden px-3 pt-2.5 flex flex-col gap-2">
          {/* quick actions */}
          <div className="grid grid-cols-2 gap-1.5">
            <div
              className="rounded-2xl p-2.5 flex flex-col gap-1.5"
              style={{ background:"#2563a8", boxShadow:"0 4px 14px rgba(37,99,168,0.28)" }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background:"rgba(255,255,255,0.18)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white leading-none" style={{ fontSize:10 }}>Find Parking</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.7)", marginTop:1 }}>47 spots nearby</div>
              </div>
            </div>
            <div
              className="rounded-2xl p-2.5 flex flex-col gap-1.5"
              style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 3px 10px rgba(15,34,64,0.07)" }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background:"rgba(37,99,168,0.07)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563a8" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" rx="2"/>
                  <path d="M16 8h4l3 3v5h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-[#0f2240] leading-none" style={{ fontSize:10 }}>My Cars</div>
                <div style={{ fontSize:8, color:"#6b89a5", marginTop:1 }}>2 vehicles</div>
              </div>
            </div>
          </div>

          {/* section header */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0f2240]" style={{ fontSize:11 }}>Reservations</span>
            <span style={{ fontSize:9, color:"#2563a8", fontWeight:500 }}>See all →</span>
          </div>

          {/* active reservation card */}
          <div
            className="rounded-2xl p-2.5"
            style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 4px 14px rgba(15,34,64,0.07)" }}
          >
            <div className="flex items-start justify-between gap-1 mb-1.5">
              <span className="font-bold text-[#0f2240]" style={{ fontSize:10 }}>City Center Garage</span>
              <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 flex-shrink-0" style={{ background:"rgba(34,197,94,0.12)", fontSize:8, fontWeight:600, color:"#16a34a" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />
                Active
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563a8" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <span style={{ fontSize:9, color:"#1a3558" }}>Toyota Corolla</span>
              <span className="rounded px-1.5 py-0.5" style={{ fontSize:8, fontWeight:600, color:"#6b89a5", background:"rgba(37,99,168,0.07)", letterSpacing:"0.04em" }}>AB 123 CD</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1" style={{ fontSize:8, color:"#6b89a5" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                60 min left
              </div>
              <span style={{ fontSize:8, color:"rgba(107,137,165,0.4)" }}>·</span>
              <div className="flex items-center gap-1" style={{ fontSize:8, color:"#2563a8", fontWeight:600 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                500 ALL
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="flex-1 rounded-xl py-1.5 flex items-center justify-center gap-1" style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.18)", fontSize:8, fontWeight:600, color:"#dc2626" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Cancel
              </div>
              <div className="rounded-xl px-2.5 py-1.5 flex items-center justify-center gap-1" style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)", fontSize:8, fontWeight:600, color:"#2563a8" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Extend
              </div>
            </div>
          </div>

          {/* expired reservation card */}
          <div
            className="rounded-2xl p-2.5 opacity-70"
            style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 4px 14px rgba(15,34,64,0.07)" }}
          >
            <div className="flex items-start justify-between gap-1 mb-1.5">
              <span className="font-bold text-[#6b89a5]" style={{ fontSize:10 }}>Mall of Albania</span>
              <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 flex-shrink-0" style={{ background:"rgba(107,137,165,0.1)", fontSize:8, fontWeight:600, color:"#6b89a5" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#6b89a5] flex-shrink-0" />
                Expired
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1" style={{ fontSize:8, color:"#6b89a5" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                30 min · Ended
              </div>
              <span style={{ fontSize:8, color:"rgba(107,137,165,0.4)" }}>·</span>
              <span style={{ fontSize:8, color:"#6b89a5" }}>Free</span>
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div
          className="grid grid-cols-4 py-2"
          style={{ background:"rgba(255,255,255,0.82)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 -3px 12px rgba(15,34,64,0.07)" }}
        >
          {[
            { lbl:"Home", active:true,  icon:<><path d="m3 9 9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
            { lbl:"Find",    active:false, icon:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></> },
            { lbl:"Bookings",active:false, icon:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
            { lbl:"Profile", active:false, icon:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
          ].map(item => (
            <div key={item.lbl} className="flex flex-col items-center gap-0.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={item.active ? "#2563a8" : "#6b89a5"} strokeWidth="2">{item.icon}</svg>
              <span style={{ fontSize:7, fontWeight: item.active ? 600 : 500, color: item.active ? "#2563a8" : "#6b89a5" }}>{item.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Phone 2: Reservations history screen ── */
function PhoneReservations() {
  const sessions = [
    { name:"City Center Garage", date:"Mar 20", plate:"AB 123 DJ", cost:"17 ALL",  active:true  },
    { name:"delijorgji",         date:"Mar 20", plate:"AB 123 DJ", cost:"24 ALL",  active:false },
    { name:"Mall Parking Lot B", date:"Mar 19", plate:"CD 456 EF", cost:"120 ALL", active:false },
  ];

  return (
    <div
      className="relative mx-auto rounded-[2.8rem] overflow-hidden border-[3px] border-white/60"
      style={{
        width: 270,
        height: 560,
        background: "#dce8f5",
        boxShadow: "inset 0 2px 8px rgba(255,255,255,0.8)",
      }}
    >
      <MapScene />

      {/* notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/60 rounded-b-2xl z-20" />

      <div className="absolute inset-0 z-10 flex flex-col">
        {/* header */}
        <div
          className="pt-6 pb-2.5 px-3.5"
          style={{ background:"rgba(255,255,255,0.78)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 2px 10px rgba(15,34,64,0.07)" }}
        >
          <div className="font-bold text-[#0f2240]" style={{ fontSize:13, letterSpacing:"-0.02em" }}>Reservations</div>
          <div style={{ fontSize:9, color:"#6b89a5", marginTop:1 }}>Your booking history</div>
        </div>

        {/* list */}
        <div className="flex-1 overflow-hidden px-3 pt-2.5 flex flex-col gap-2">
          {sessions.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-2.5"
              style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 4px 14px rgba(15,34,64,0.07)" }}
            >
              <div className="flex items-start justify-between gap-1 mb-1.5">
                <span className="font-bold text-[#0f2240]" style={{ fontSize:10 }}>{s.name}</span>
                <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5 flex-shrink-0"
                  style={{ background: s.active ? "rgba(34,197,94,0.12)" : "rgba(107,137,165,0.1)", fontSize:8, fontWeight:600, color: s.active ? "#16a34a" : "#6b89a5" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.active ? "#22c55e" : "#6b89a5" }} />
                  {s.active ? "Active" : "Completed"}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563a8" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <span className="rounded px-1.5 py-0.5" style={{ fontSize:8, fontWeight:600, color:"#6b89a5", background:"rgba(37,99,168,0.07)", letterSpacing:"0.04em" }}>{s.plate}</span>
                <span style={{ fontSize:8, color:"#6b89a5" }}>{s.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize:10, fontWeight:700, color:"#2563a8" }}>{s.cost}</span>
                <div className="w-6 h-6 rounded-xl flex items-center justify-center" style={{ background:"#2563a8" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom nav */}
        <div
          className="grid grid-cols-4 py-2"
          style={{ background:"rgba(255,255,255,0.82)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 -3px 12px rgba(15,34,64,0.07)" }}
        >
          {[
            { lbl:"Home",     active:false, icon:<><path d="m3 9 9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
            { lbl:"Find",     active:false, icon:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></> },
            { lbl:"Bookings", active:true,  icon:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
            { lbl:"Profile",  active:false, icon:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
          ].map(item => (
            <div key={item.lbl} className="flex flex-col items-center gap-0.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={item.active ? "#2563a8" : "#6b89a5"} strokeWidth="2">{item.icon}</svg>
              <span style={{ fontSize:7, fontWeight: item.active ? 600 : 500, color: item.active ? "#2563a8" : "#6b89a5" }}>{item.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */
export function AppScreenshots() {
  const { t } = useLanguage();

  return (
    <section id="app" className="relative section-padding bg-brand-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600/40 to-transparent" />

      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full" style={{ background:"radial-gradient(circle,rgba(37,99,168,0.4) 0%,transparent 70%)" }} />
      </div>

      <div className="section-container relative">
        {/* heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.p
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5 }}
            className="eyebrow text-brand-400 mb-4"
          >
            {t.screenshots.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay:0.06 }}
            className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight leading-tight"
          >
            {t.screenshots.title}{" "}
            <span className="bg-gradient-to-r from-accent-blue via-blue-400 to-accent-blue bg-clip-text text-transparent">
              {t.screenshots.titleAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay:0.12 }}
            className="mt-5 text-base md:text-lg text-white/35 leading-relaxed"
          >
            {t.screenshots.subtitle}
          </motion.p>
        </div>

        {/* phones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24">
          {[
            { component: <PhoneHome />, caption: t.screenshots.screen1Caption },
            { component: <PhoneReservations />, caption: t.screenshots.screen2Caption },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.65, delay: i * 0.15, ease:[0.22,1,0.36,1] }}
              className="flex flex-col items-center gap-5"
              style={{ filter:"drop-shadow(0 40px 80px rgba(15,34,64,0.35)) drop-shadow(0 8px 24px rgba(37,99,168,0.2))" }}
            >
              {item.component}
              <p className="text-sm text-white/35 font-medium text-center max-w-[220px] leading-snug">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600/40 to-transparent" />
    </section>
  );
}
