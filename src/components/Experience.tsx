"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, ExternalLink, GraduationCap, BookOpen } from "lucide-react";

const workExperiences = [
  {
    period: "Jul 2025 — Mar 2026",
    role: "Data Analyst",
    company: "Grow Nutrition",
    location: "Zirakpur, Punjab",
    type: "Full-time",
    color: "#6366f1",
    impact: [
      { val: "500K+", label: "Rows Analyzed" },
      { val: "40%", label: "Reporting Cut" },
      { val: "18%", label: "Targeting Boost" },
    ],
    points: [
      "Analyzed 500K+ rows of sales & consumer data, uncovering 8 key trends",
      "Built 4 Power BI dashboards with DAX KPIs, cutting reporting time by 40%",
      "Automated 6 ETL workflows (Python, SQL, N8N), reducing turnaround by 35%",
      "A/B tested 5 campaigns — improved targeting precision by 18%, conversion +15%",
    ],
    skills: ["Power BI", "DAX", "Python", "SQL", "N8N", "A/B Testing"],
  },
  {
    period: "May 2025 — Jul 2025",
    role: "Data Analyst",
    company: "EOXS",
    location: "Remote",
    type: "Contract",
    color: "#06b6d4",
    impact: [
      { val: "200K+", label: "Records" },
      { val: "90%+", label: "Accuracy" },
      { val: "60%", label: "Query Speedup" },
    ],
    points: [
      "Processed 200K+ records generating demand forecasts at 90%+ accuracy",
      "Optimized 30+ SQL queries, cutting execution time from 8 min to under 2 min",
      "Produced 10+ analytical reports enforcing data governance standards",
      "Reduced data discrepancies by 25% through governance policies",
    ],
    skills: ["SQL", "Forecasting", "Data Governance", "Python", "Excel"],
  },
];

const certifications = [
  { name: "Career Essentials in Business Analysis", org: "Microsoft & LinkedIn Learning", done: true },
  { name: "Google Data Analytics Certificate", org: "Coursera", done: false },
  { name: "Power BI Data Analyst (PL-300)", org: "Microsoft", done: false },
];

/* ── Glow card wrapper ── */
function GlowCard({ color, children }: { color: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 250, damping: 28 });
  const glowY = useSpring(mouseY, { stiffness: 250, damping: 28 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="relative rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${hovered ? `${color}35` : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.3s",
      }}
    >
      {/* Cursor spotlight */}
      {hovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full blur-3xl"
          style={{
            width: 280,
            height: 280,
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

/* ── Work accordion card ── */
function WorkCard({ exp, i }: { exp: typeof workExperiences[0]; i: number }) {
  const [open, setOpen] = useState(i === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlowCard color={exp.color}>
        {/* Header */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.99 }}
          className="w-full text-left p-6 md:p-8 flex items-start gap-5 group transition-colors duration-300"
          style={{ background: open ? `${exp.color}0a` : "transparent" }}
        >
          {/* Dot */}
          <motion.div
            animate={{ scale: open ? 1.4 : 1, boxShadow: open ? `0 0 14px ${exp.color}` : "none" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: exp.color }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border transition-colors duration-300" style={{ color: exp.color, borderColor: `${exp.color}40` }}>
                {exp.type}
              </span>
              <span className="text-white/25 font-mono text-xs">{exp.period}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/60">{exp.company}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/30 text-sm">{exp.location}</span>
            </div>
          </div>

          {/* Impact numbers */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            {exp.impact.map((m, j) => (
              <div key={j} className="text-right">
                <motion.p animate={{ color: open ? exp.color : "rgba(255,255,255,0.7)" }} className="font-black text-lg tracking-tighter transition-colors">
                  {m.val}
                </motion.p>
                <p className="text-[10px] text-white/25 font-mono tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>

          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="mt-1 flex-shrink-0">
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.button>

        {/* Expandable */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 pl-[3.75rem] border-t border-white/[0.05]">
                <ul className="space-y-3 mt-6 mb-6">
                  {exp.points.map((pt, j) => (
                    <motion.li key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.06 }}
                      className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                      {pt}
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s, j) => (
                    <motion.span key={j} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + j * 0.04 }}
                      className="text-[11px] font-mono text-white/40 border rounded px-2.5 py-1" style={{ borderColor: `${exp.color}30` }}>
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>
    </motion.div>
  );
}

/* ── Resume CTA with mouse glow ── */
function ResumeCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 200, damping: 24 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 24 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="mt-12 relative rounded-3xl overflow-hidden cursor-default"
      style={{
        border: `1px solid ${hovered ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.4s",
        background: "#0f0f0f",
      }}
    >
      {/* Mouse spotlight */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: hovered
            ? "radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 40%, transparent 70%)"
            : "transparent",
          transition: "background 0.4s",
        }}
      />

      {/* Faint watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[9rem] md:text-[12rem] font-black tracking-tighter leading-none"
          style={{ color: hovered ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.02)", transition: "color 0.5s" }}
        >
          CV
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 px-8 md:px-12 py-10">
        <div>
          <p className="text-xs text-white/25 tracking-[0.3em] uppercase font-mono mb-3">Full Profile</p>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-2">
            Want the full picture?
          </h3>
          <p className="text-white/35 text-sm font-mono">
            All experience, skills &amp; certifications in one place.
          </p>
        </div>

        {/* Button */}
        <motion.a
          href="https://drive.google.com/file/d/1Ui_MqVzCKRdUxJdLd-Xa39G38_PmKSr_/view"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex-shrink-0 group flex items-center gap-3 px-7 py-4 rounded-2xl border font-mono text-sm font-semibold transition-all duration-300"
          style={{
            borderColor: hovered ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.1)",
            color: hovered ? "#f59e0b" : "rgba(255,255,255,0.6)",
            background: hovered ? "rgba(245,158,11,0.07)" : "rgba(255,255,255,0.03)",
          }}
        >
          {/* Subtle glow behind button */}
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: "rgba(245,158,11,0.2)", transform: "scale(1.2)" }}
            />
          )}
          <span className="relative">View Full Resume</span>
          <motion.svg
            className="relative w-4 h-4"
            animate={hovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <>
      {/* ───────── WORK EXPERIENCE ───────── */}
      <section className="relative z-20 w-full bg-[#121212] py-28 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-12">
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono mb-3">Where I've Worked</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Experience</h2>
              {/* Resume button */}
              <motion.a
                href="https://drive.google.com/file/d/1Ui_MqVzCKRdUxJdLd-Xa39G38_PmKSr_/view"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-3 self-start md:self-auto px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Sweep glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.5 }}
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                />
                <div className="relative flex items-center gap-2">
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors font-mono">View Resume</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
              </motion.a>
            </div>
          </div>

          <div className="space-y-4">
            {workExperiences.map((exp, i) => <WorkCard key={i} exp={exp} i={i} />)}
          </div>
        </div>
      </section>

      {/* ───────── EDUCATION ───────── */}
      <section className="relative z-20 w-full bg-[#0f0f0f] py-28 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          <div className="border-b border-white/10 pb-8 mb-12">
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono mb-3">Academic Background</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Education</h2>
          </div>

          {/* Degree card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard color="#f59e0b">
              <div className="p-8 md:p-10" style={{ background: "rgba(245,158,11,0.03)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                        <GraduationCap className="w-6 h-6" style={{ color: "#f59e0b" }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border" style={{ color: "#f59e0b", borderColor: "rgba(245,158,11,0.35)" }}>
                          MBA
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">Business Analytics</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-white/60 font-medium">Chandigarh Group of Colleges</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-white/30 text-sm">Punjab, India</span>
                    </div>

                    <ul className="space-y-3 mb-7">
                      {[
                        "Specialization in Data Analytics & Statistical Analysis",
                        "Business Intelligence & Data Governance focus",
                        "Applied machine learning to real business case studies",
                        "Led cross-functional analytics projects for capstone",
                      ].map((pt, j) => (
                        <motion.li key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          transition={{ delay: j * 0.07 }}
                          className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#f59e0b" }} />
                          {pt}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {["Statistics", "BI Tools", "ML Fundamentals", "Data Governance", "SQL", "Excel"].map((s, j) => (
                        <span key={j} className="text-[11px] font-mono text-white/40 border rounded px-2.5 py-1" style={{ borderColor: "rgba(245,158,11,0.25)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: period + highlight stat */}
                  <div className="flex flex-col items-start lg:items-end gap-4">
                    <div className="lg:text-right">
                      <p className="text-white/60 font-mono text-sm">Aug 2022 — Sep 2024</p>
                      <p className="text-white/25 font-mono text-xs mt-1">2 Years Full-time</p>
                    </div>
                    <div className="flex lg:flex-col gap-6 lg:gap-4 lg:items-end mt-2">
                      {[{ val: "MBA", label: "Degree" }, { val: "4", label: "Specializations" }].map((m, j) => (
                        <div key={j} className="lg:text-right">
                          <p className="font-black text-2xl tracking-tighter" style={{ color: "#f59e0b" }}>{m.val}</p>
                          <p className="text-[10px] text-white/25 font-mono tracking-wider">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Certifications */}
          <div className="mt-14 border-t border-white/[0.07] pt-10">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-4 h-4 text-white/30" />
              <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono">Certifications</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                  whileHover={{ y: -3, borderColor: c.done ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)" }}
                  className="border border-white/[0.07] rounded-2xl p-5 bg-white/[0.01] cursor-default transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <motion.span
                      animate={!c.done ? { opacity: [1, 0.3, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-1.5 h-1.5 rounded-full ${c.done ? "bg-emerald-400" : "bg-amber-400"}`}
                    />
                    <span className={`text-[10px] font-mono tracking-widest uppercase ${c.done ? "text-emerald-400/70" : "text-amber-400/70"}`}>
                      {c.done ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm font-medium leading-snug mb-1">{c.name}</p>
                  <p className="text-white/25 text-xs font-mono">{c.org}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resume CTA — Mouse Glow */}
          <ResumeCTA />

        </div>
      </section>
    </>
  );
}
