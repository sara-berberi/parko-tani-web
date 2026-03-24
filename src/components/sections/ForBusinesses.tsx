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

function PhoneMockup() {
  return (
    /* Outer phone shell */
    <div
      className="relative mx-auto"
      style={{ width: 300, filter: "drop-shadow(0 40px 80px rgba(15,34,64,0.22)) drop-shadow(0 8px 24px rgba(37,99,168,0.18))" }}
    >
      {/* Phone border */}
      <div
        className="relative rounded-[3rem] overflow-hidden border-[3px] border-white/60"
        style={{ background: "#dce8f5", boxShadow: "inset 0 2px 8px rgba(255,255,255,0.8), inset 0 -2px 6px rgba(15,34,64,0.08)" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/60 rounded-b-2xl z-20 flex items-center justify-center">
          <div className="w-10 h-1.5 bg-white/80 rounded-full" />
        </div>

        {/* Map scene background */}
        <div className="relative overflow-hidden" style={{ height: 560, background: "linear-gradient(155deg,#eaf3fc,#d4e6f4 50%,#c6dced)" }}>
          {/* Roads */}
          <div className="absolute left-0 right-0 bg-[#c0d5e6]" style={{ top: "19%", height: 14, borderTop: "1px solid rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.55)" }} />
          <div className="absolute left-0 right-0 bg-[#c0d5e6]" style={{ top: "51%", height: 11, borderTop: "1px solid rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.55)" }} />
          <div className="absolute top-0 bottom-0 bg-[#c0d5e6]" style={{ left: "32%", width: 12, borderLeft: "1px solid rgba(255,255,255,0.55)", borderRight: "1px solid rgba(255,255,255,0.55)" }} />
          <div className="absolute top-0 bottom-0 bg-[#c0d5e6]" style={{ left: "68%", width: 10, borderLeft: "1px solid rgba(255,255,255,0.55)", borderRight: "1px solid rgba(255,255,255,0.55)" }} />
          {/* Blocks */}
          {[
            { top:"2%",  left:"34%", w:"32%", h:"15%" },
            { top:"24%", left:"0%",  w:"30%", h:"25%" },
            { top:"24%", left:"34%", w:"32%", h:"25%" },
            { top:"24%", left:"70%", w:"30%", h:"25%" },
            { top:"56%", left:"0%",  w:"30%", h:"18%" },
            { top:"56%", left:"34%", w:"32%", h:"18%" },
            { top:"56%", left:"70%", w:"30%", h:"18%" },
          ].map((b, i) => (
            <div key={i} className="absolute rounded" style={{ top:b.top, left:b.left, width:b.w, height:b.h, background:"rgba(255,255,255,0.28)", border:"1px solid rgba(255,255,255,0.52)" }} />
          ))}
          {/* P zones */}
          {[
            { top:"26%", left:"1%", w:"18%", h:"11%" },
            { top:"57%", left:"35%", w:"14%", h:"9%" },
          ].map((z, i) => (
            <div key={i} className="absolute flex items-center justify-center rounded" style={{ top:z.top, left:z.left, width:z.w, height:z.h, background:"rgba(37,99,168,0.065)", border:"1.5px dashed rgba(37,99,168,0.22)" }}>
              <span style={{ fontWeight:700, fontSize:9, color:"rgba(37,99,168,0.42)" }}>P</span>
            </div>
          ))}
          {/* Floating pins */}
          {[
            { top:"20%", left:"7%" },
            { top:"52%", left:"38%" },
          ].map((p, i) => (
            <div key={i} className="absolute flex flex-col items-center" style={{ top:p.top, left:p.left }}>
              <div className="w-5 h-5 rounded-full rounded-bl-none -rotate-45 bg-[#2563a8] border border-white/60 flex items-center justify-center" style={{ boxShadow:"0 2px 6px rgba(37,99,168,0.35)" }}>
                <span className="rotate-45 font-bold text-white" style={{ fontSize:7 }}>P</span>
              </div>
              <div className="w-1.5 h-1 bg-[#2563a8]/20 rounded-full mt-0.5 blur-[1px]" />
            </div>
          ))}

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-7 pb-3 px-4 flex items-center gap-2.5"
            style={{ background:"rgba(255,255,255,0.78)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 2px 10px rgba(15,34,64,0.07)" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", boxShadow:"0 2px 8px rgba(124,58,237,0.28)", border:"1.5px solid rgba(255,255,255,0.8)" }}>
              M
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#0f2240] leading-none" style={{ fontSize:13 }}>Hello, Maria 👋</div>
              <div className="text-[#6b89a5] mt-0.5" style={{ fontSize:10 }}>Manage your parking spots</div>
            </div>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center relative flex-shrink-0"
              style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563a8" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border border-white flex items-center justify-center text-white font-bold" style={{ fontSize:6 }}>2</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="absolute left-0 right-0 z-10 flex" style={{ top: 82, background:"rgba(255,255,255,0.65)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.75)" }}>
            {["My Spots", "Reservations"].map((tab, i) => (
              <div key={tab} className="flex-1 flex items-center justify-center gap-1 py-2.5 relative" style={{ fontSize:10, fontWeight: i===0 ? 600 : 500, color: i===0 ? "#2563a8" : "#6b89a5" }}>
                {tab}
                {i === 1 && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-semibold" style={{ background:"rgba(37,99,168,0.07)", color:"#2563a8", border:"1px solid rgba(37,99,168,0.13)" }}>2</span>}
                {i === 0 && <div className="absolute bottom-0 left-[15%] right-[15%] h-[2px] rounded-t bg-[#2563a8]" />}
              </div>
            ))}
          </div>

          {/* Scrollable content */}
          <div className="absolute left-0 right-0 bottom-0 flex flex-col gap-2 px-3 pb-3 overflow-hidden" style={{ top: 120 }}>
            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-1.5">
              {[{ val:"2", lbl:"Spots", color:"#2563a8" },{ val:"8", lbl:"Available", color:"#16a34a" },{ val:"2.4K", lbl:"ALL Today", color:"#d97706" }].map(s => (
                <div key={s.lbl} className="text-center rounded-xl py-2" style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 3px 8px rgba(15,34,64,0.06)" }}>
                  <div className="font-bold leading-none" style={{ fontSize:14, color:s.color }}>{s.val}</div>
                  <div className="text-[#6b89a5] mt-0.5 uppercase font-medium tracking-wide" style={{ fontSize:7 }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Spot card 1 */}
            <div className="rounded-2xl p-3" style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 4px 14px rgba(15,34,64,0.07)" }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="font-bold text-[#0f2240]" style={{ fontSize:11 }}>City Center Garage</div>
                  <div className="flex items-center gap-1 text-[#6b89a5] mt-0.5" style={{ fontSize:8 }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2"/></svg>
                    41.32710, 19.81870
                  </div>
                </div>
                <div className="rounded-lg px-2.5 py-1 flex items-center gap-1 flex-shrink-0" style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)", fontSize:8, fontWeight:600, color:"#2563a8" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </div>
              </div>
              {/* Occupancy bar */}
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="uppercase tracking-wide text-[#6b89a5]" style={{ fontSize:7, fontWeight:500 }}>Occupancy</span>
                  <span style={{ fontSize:7, fontWeight:700, color:"#16a34a" }}>8/10 · 80%</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height:4, background:"rgba(180,200,222,0.3)" }}>
                  <div className="h-full rounded-full" style={{ width:"80%", background:"linear-gradient(90deg,#22c55e,#16a34a)" }} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  { lbl:"8/10 slots", cls:"rgba(34,197,94,0.1)", color:"#16a34a", border:"rgba(34,197,94,0.2)" },
                  { lbl:"60 min max", cls:"rgba(251,191,36,0.12)", color:"#b45309", border:"rgba(251,191,36,0.25)" },
                  { lbl:"500 ALL/hr", cls:"rgba(37,99,168,0.07)", color:"#2563a8", border:"rgba(37,99,168,0.13)" },
                ].map(t => (
                  <span key={t.lbl} className="rounded-full px-2 py-0.5" style={{ fontSize:8, fontWeight:600, background:t.cls, color:t.color, border:`1px solid ${t.border}` }}>{t.lbl}</span>
                ))}
              </div>
            </div>

            {/* Spot card 2 */}
            <div className="rounded-2xl p-3" style={{ background:"rgba(255,255,255,0.78)", border:"1.5px solid rgba(255,255,255,0.92)", boxShadow:"0 4px 14px rgba(15,34,64,0.07)" }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="font-bold text-[#0f2240]" style={{ fontSize:11 }}>Mall Parking Lot B</div>
                  <div className="flex items-center gap-1 text-[#6b89a5] mt-0.5" style={{ fontSize:8 }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2"/></svg>
                    41.33102, 19.82241
                  </div>
                </div>
                <div className="rounded-lg px-2.5 py-1 flex items-center gap-1 flex-shrink-0" style={{ background:"rgba(37,99,168,0.07)", border:"1px solid rgba(37,99,168,0.13)", fontSize:8, fontWeight:600, color:"#2563a8" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="uppercase tracking-wide text-[#6b89a5]" style={{ fontSize:7, fontWeight:500 }}>Occupancy</span>
                  <span style={{ fontSize:7, fontWeight:700, color:"#dc2626" }}>20/20 · Full</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height:4, background:"rgba(180,200,222,0.3)" }}>
                  <div className="h-full rounded-full" style={{ width:"100%", background:"linear-gradient(90deg,#f87171,#dc2626)" }} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  { lbl:"Full", cls:"rgba(239,68,68,0.1)", color:"#dc2626", border:"rgba(239,68,68,0.2)" },
                  { lbl:"120 min max", cls:"rgba(251,191,36,0.12)", color:"#b45309", border:"rgba(251,191,36,0.25)" },
                  { lbl:"Free", cls:"rgba(107,137,165,0.1)", color:"#6b89a5", border:"rgba(107,137,165,0.15)" },
                ].map(t => (
                  <span key={t.lbl} className="rounded-full px-2 py-0.5" style={{ fontSize:8, fontWeight:600, background:t.cls, color:t.color, border:`1px solid ${t.border}` }}>{t.lbl}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-4 py-2" style={{ background:"rgba(255,255,255,0.82)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 -3px 12px rgba(15,34,64,0.07)" }}>
            {[
              { lbl:"Home", active:false, icon:<><path d="m3 9 9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
              { lbl:"My Spots", active:true, icon:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></> },
              { lbl:"Bookings", active:false, icon:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
              { lbl:"Profile", active:false, icon:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
            ].map(item => (
              <div key={item.lbl} className="flex flex-col items-center gap-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={item.active ? "#2563a8" : "#6b89a5"} strokeWidth="2">{item.icon}</svg>
                <span style={{ fontSize:7, fontWeight: item.active ? 600 : 500, color: item.active ? "#2563a8" : "#6b89a5" }}>{item.lbl}</span>
              </div>
            ))}
          </div>
        </div>
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
            <PhoneMockup />
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
