"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Copy, Check } from "lucide-react";

const socials = [
  {
    label: "LinkedIn",
    handle: "sarthak-verma-8628b21ba",
    href: "https://linkedin.com/in/sarthak-verma-8628b21ba",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: "#0077b5",
  },
  {
    label: "GitHub",
    handle: "sarthak939",
    href: "https://github.com/sarthak939",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    color: "#e2e8f0",
  },
  {
    label: "Portfolio",
    handle: "sarthak939.github.io",
    href: "https://sarthak939.github.io",
    icon: <Globe className="w-[18px] h-[18px]" />,
    color: "#10b981",
  },
];

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "sarthakverma939@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      className="w-full flex items-center justify-between p-5 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
          <Mail className="w-4 h-4 text-white/50" />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Email</p>
          <p className="text-white/70 text-sm font-medium">{email}</p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Check className="w-4 h-4 text-emerald-400" />
          </motion.div>
        ) : (
          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Copy className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function SocialCard({ s, i }: { s: typeof socials[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      className="relative overflow-hidden flex items-center justify-between p-5 border border-white/[0.07] rounded-2xl bg-white/[0.01] transition-colors"
      style={{ borderColor: hovered ? `${s.color}40` : undefined, background: hovered ? `${s.color}08` : undefined }}
    >
      {/* Sweep effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: hovered ? "200%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ background: `linear-gradient(90deg, transparent, ${s.color}15, transparent)` }}
      />

      <div className="flex items-center gap-4 relative z-10">
        <motion.div animate={{ color: hovered ? s.color : "rgba(255,255,255,0.4)" }} transition={{ duration: 0.2 }}>
          {s.icon}
        </motion.div>
        <div>
          <p className="text-white/60 font-medium group-hover:text-white text-sm">{s.label}</p>
          <p className="text-white/25 text-xs font-mono">@{s.handle}</p>
        </div>
      </div>

      <motion.svg
        animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0, opacity: hovered ? 0.7 : 0.2 }}
        transition={{ duration: 0.2 }}
        className="w-4 h-4 text-white relative z-10"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
      </motion.svg>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section className="relative z-20 w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-white/10 pb-10">
          <div>
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono mb-3">Get In Touch</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Let's Connect</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 rounded-full bg-emerald-500/5 self-start md:self-auto"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <span className="text-emerald-400/80 text-xs font-mono tracking-wider">Available for work</span>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left */}
          <div className="space-y-4">
            <p className="text-white/40 text-base leading-relaxed mb-6">
              Open to collaborating on data engineering, analytics, and BI projects. Let's build something meaningful together.
            </p>

            {/* Copy email button */}
            <CopyEmailButton />

            {/* Phone */}
            <motion.a
              href="tel:+918278803661"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 p-5 border border-white/[0.07] rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                <Phone className="w-4 h-4 text-white/50" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Phone</p>
                <p className="text-white/70 text-sm font-medium">+91 8278803661</p>
              </div>
            </motion.a>

            {/* Location */}
            <div className="flex items-center gap-4 p-5 border border-white/[0.07] rounded-2xl bg-white/[0.01]">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white/50" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Location</p>
                <p className="text-white/70 text-sm font-medium">Chandigarh, India</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono mb-5">Find me on</p>
            <div className="space-y-3">
              {socials.map((s, i) => <SocialCard key={i} s={s} i={i} />)}
            </div>
            <p className="text-white/20 text-xs font-mono mt-10">
              © {new Date().getFullYear()} Sarthak Verma. Built with Next.js & Framer Motion.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
