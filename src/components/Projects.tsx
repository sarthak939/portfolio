"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    index: "01",
    title: "Sales Forecasting Dashboard",
    description: "Ingested 1M+ records into BigQuery; built Power BI dashboard delivering 12-week forecasts at 88% accuracy for C-suite planning.",
    tags: ["Power BI", "BigQuery", "DAX", "Forecasting"],
    stat: "88%",
    statLabel: "Forecast Accuracy",
    link: "#",
    color: "#6366f1",
  },
  {
    index: "02",
    title: "Automated ETL Pipeline",
    description: "Architected modular DBT and PySpark pipeline for 15 daily jobs, cutting processing time by 50% and achieving real-time data freshness (T+0).",
    tags: ["DBT", "PySpark", "Python", "SQL"],
    stat: "50%",
    statLabel: "Faster Processing",
    link: "#",
    color: "#06b6d4",
  },
  {
    index: "03",
    title: "Customer Segmentation & A/B Testing",
    description: "Clustered 80K+ customers into 5 cohorts via K-Means; ran A/B tests improving marketing ROI by 22% and email open rates by 18%.",
    tags: ["Python", "Machine Learning", "A/B Testing", "K-Means"],
    stat: "+22%",
    statLabel: "Marketing ROI",
    link: "#",
    color: "#f59e0b",
  },
  {
    index: "04",
    title: "Grow Nutrition Analytics",
    description: "Analyzed 500K+ rows of sales data, automated 6 ETL workflows using Python & N8N, and built Power BI dashboards reducing manual reporting by 40%.",
    tags: ["Python", "N8N", "Power BI", "SQL"],
    stat: "40%",
    statLabel: "Reporting Reduced",
    link: "#",
    color: "#10b981",
  },
];

function ProjectRow({ project, i }: { project: typeof projects[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-b border-white/[0.06] overflow-hidden cursor-pointer"
      style={{ borderColor: hovered ? `${project.color}30` : undefined }}
    >
      {/* Cursor glow */}
      {hovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full blur-2xl"
          style={{
            width: 200,
            height: 200,
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        style={{ background: project.color, transformOrigin: "top" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="py-8 pl-6 pr-4 md:pr-8 grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-4 md:gap-8 items-center">

        {/* Index */}
        <motion.span
          animate={{ color: hovered ? project.color : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.2 }}
          className="font-mono text-sm"
        >
          {project.index}
        </motion.span>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <motion.h3
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="text-lg md:text-xl font-bold text-white tracking-tight"
            >
              {project.title}
            </motion.h3>
            <motion.div animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </motion.div>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="text-white/40 text-sm leading-relaxed"
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, j) => (
              <motion.span
                key={j}
                animate={{
                  borderColor: hovered ? `${project.color}50` : "rgba(255,255,255,0.08)",
                  color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.2, delay: hovered ? j * 0.03 : 0 }}
                className="text-[11px] font-mono border rounded-full px-3 py-1"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 md:pl-4">
          {/* Stat pill */}
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1, opacity: hovered ? 1 : 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="hidden md:flex flex-col items-end"
          >
            <span className="font-black text-2xl tracking-tighter" style={{ color: project.color }}>{project.stat}</span>
            <span className="text-[10px] text-white/30 font-mono tracking-wider whitespace-nowrap">{project.statLabel}</span>
          </motion.div>

          {/* Links */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            <a href={project.link} className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors whitespace-nowrap">
              <Code2 className="w-3 h-3" /> Code
            </a>
            <a href={project.link} className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors whitespace-nowrap">
              <ExternalLink className="w-3 h-3" /> Live
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="relative z-20 w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono mb-3">Portfolio</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Selected Works</h2>
          </div>
          <span className="text-white/20 font-mono text-sm hidden md:block">{projects.length} projects</span>
        </div>
        <div>
          {projects.map((p, i) => <ProjectRow key={i} project={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
