"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   OVARY ICON – A stylized, anatomically-inspired icon
   showing the uterus + fallopian tubes + ovaries with
   animated draw-on and subtle follicle pulsing.
   ────────────────────────────────────────────────────────── */
export const OvaryIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="ovary-glow-l" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="ovary-glow-r" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Uterus body */}
    <motion.path
      d="M52 58 C52 48, 46 42, 46 36 C46 32, 48 30, 52 30 L68 30 C72 30, 74 32, 74 36 C74 42, 68 48, 68 58 C68 72, 60 82, 60 90 C60 82, 52 72, 52 58Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.08"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    />

    {/* Left fallopian tube */}
    <motion.path
      d="M46 36 C40 34, 32 30, 26 32 C20 34, 16 38, 18 44 C20 48, 24 48, 26 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
    />

    {/* Right fallopian tube */}
    <motion.path
      d="M74 36 C80 34, 88 30, 94 32 C100 34, 104 38, 102 44 C100 48, 96 48, 94 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
    />

    {/* Left ovary – outer shape */}
    <motion.ellipse
      cx="22" cy="46" rx="12" ry="14"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.06"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "backOut" }}
    />
    {/* Left ovary glow */}
    <motion.ellipse
      cx="22" cy="46" rx="16" ry="18"
      fill="url(#ovary-glow-l)"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ delay: 2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Right ovary – outer shape */}
    <motion.ellipse
      cx="98" cy="46" rx="12" ry="14"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.06"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "backOut" }}
    />
    {/* Right ovary glow */}
    <motion.ellipse
      cx="98" cy="46" rx="16" ry="18"
      fill="url(#ovary-glow-r)"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ delay: 2.3, duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Left follicles */}
    {[
      { cx: 17, cy: 40, r: 2, delay: 2.0 },
      { cx: 26, cy: 42, r: 1.5, delay: 2.2 },
      { cx: 20, cy: 50, r: 2.5, delay: 2.4 },
      { cx: 28, cy: 50, r: 1.8, delay: 2.1 },
      { cx: 16, cy: 48, r: 1.2, delay: 2.6 },
    ].map((f, i) => (
      <motion.circle
        key={`lf-${i}`}
        cx={f.cx} cy={f.cy} r={f.r}
        fill="currentColor"
        fillOpacity="0.35"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.7, 1] }}
        transition={{ delay: f.delay, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}

    {/* Right follicles */}
    {[
      { cx: 93, cy: 40, r: 2, delay: 2.1 },
      { cx: 102, cy: 44, r: 1.5, delay: 2.3 },
      { cx: 96, cy: 52, r: 2.5, delay: 2.5 },
      { cx: 104, cy: 48, r: 1.8, delay: 2.0 },
      { cx: 92, cy: 50, r: 1.2, delay: 2.7 },
    ].map((f, i) => (
      <motion.circle
        key={`rf-${i}`}
        cx={f.cx} cy={f.cy} r={f.r}
        fill="currentColor"
        fillOpacity="0.35"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.7, 1] }}
        transition={{ delay: f.delay, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </svg>
);

/* ──────────────────────────────────────────────────────────
   ANIMATED OVARY BACKGROUND – Large, ghostly ovary shapes
   float in the background with parallax, orbital follicles,
   and flowing fallopian-tube curves.
   ────────────────────────────────────────────────────────── */

// A large, ghostly ovary silhouette for the background with "evolution" animations
const GhostOvary = ({ side, delay, scrollYProgress }: { side: "left" | "right"; delay: number; scrollYProgress: any }) => {
  const isLeft = side === "left";
  
  // Evolutionary transforms based on scroll (using pixel ranges)
  const complexity = useTransform(scrollYProgress, [0, 800], [1, 1.3]);
  const follicleOpacity = useTransform(scrollYProgress, [0, 800], [0.03, 0.12]);
  const rotation = useTransform(scrollYProgress, [0, 1000], [0, isLeft ? -15 : 15]);

  return (
    <motion.div
      className={`absolute ${isLeft ? "left-[-8%] top-[15%]" : "right-[-8%] top-[10%]"}`}
      style={{ rotate: rotation }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ 
        opacity: [0, 1, 0.8, 1],
        scale: [0.95, 1, 0.98, 1.02, 1],
      }}
      transition={{ 
        duration: 8, 
        delay, 
        repeat: Infinity, 
        repeatType: "reverse",
        ease: "easeInOut" 
      }}
    >
      <svg
        width="380" height="420"
        viewBox="0 0 380 420"
        fill="none"
        className={`opacity-[0.08] ${isLeft ? "" : "scale-x-[-1]"}`}
      >
        {/* Ovary body with pulsing stroke */}
        <motion.ellipse
          cx="190" cy="210" rx="140" ry="170"
          stroke="#ec4899"
          strokeWidth="1.5"
          fill="url(#ovary-body-grad)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeWidth: [1, 2, 1] }}
          transition={{ duration: 4, delay: delay + 0.5, ease: "easeInOut", strokeWidth: { repeat: Infinity, duration: 4 } }}
        />
        <defs>
          <radialGradient id="ovary-body-grad" cx="190" cy="210" r="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
          </radialGradient>
        </defs>

        {/* Inner follicle ring with "maturation" pulse */}
        <motion.ellipse
          cx="190" cy="210" rx="90" ry="110"
          stroke="#a855f7"
          strokeWidth="0.8"
          strokeDasharray="6 8"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Follicle circles with "maturation" animation linked to scroll complexity */}
        {[
          { cx: 140, cy: 140, r: 22, t: 3 },
          { cx: 240, cy: 130, r: 18, t: 4 },
          { cx: 120, cy: 240, r: 25, t: 5 },
          { cx: 260, cy: 220, r: 20, t: 3.5 },
          { cx: 170, cy: 310, r: 16, t: 4.5 },
          { cx: 220, cy: 290, r: 24, t: 6 },
          { cx: 150, cy: 180, r: 14, t: 3.2 },
          { cx: 230, cy: 180, r: 12, t: 4.8 },
        ].map((f, i) => (
          <motion.circle
            key={i}
            cx={f.cx} cy={f.cy} 
            r={f.r}
            style={{ 
              scale: complexity,
              opacity: follicleOpacity
            }}
            stroke="#ec4899"
            strokeWidth="0.6"
            fill="#ec4899"
            fillOpacity="0.03"
            animate={{ 
              scale: [1, 1.1, 0.95, 1],
              fillOpacity: [0.03, 0.1, 0.03],
            }}
            transition={{
              delay: delay + i * 0.3,
              duration: f.t,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Fallopian tube extending from the top */}
        <motion.path
          d="M190 40 C200 20, 260 10, 300 30 C340 50, 360 100, 340 140"
          stroke="#a855f7"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={{ pathLength: [0.95, 1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

export default function AnimatedOvaryBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; duration: number; delay: number; color: string; type: 'follicle' | 'cell' }[]>([]);
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, -80]);
  const yRangeOpposite = useTransform(scrollY, [0, 500], [0, 60]);
  const rotateLeft = useTransform(scrollY, [0, 1000], [0, -15]);
  const rotateRight = useTransform(scrollY, [0, 1000], [0, 15]);

  useEffect(() => {
    setMounted(true);
    const colors = ["#ec4899", "#a855f7", "#6366f1", "#f472b6", "#c084fc"];
    const newParticles = [...Array(40)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: i % 3 === 0 ? 'cell' : 'follicle' as 'follicle' | 'cell',
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-950">
      {/* Dynamic Grid / Cellular Texture */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: `radial-gradient(#ec4899 0.5px, transparent 0.5px)`,
             backgroundSize: '40px 40px'
           }}
      />

      {/* Evolution Transitions – Large ghostly ovary shapes */}
      <motion.div style={{ y: yRange }}>
        <GhostOvary side="left" delay={0.3} scrollYProgress={scrollY} />
      </motion.div>
      <motion.div style={{ y: yRangeOpposite }}>
        <GhostOvary side="right" delay={0.8} scrollYProgress={scrollY} />
      </motion.div>

      {/* Ambient hormonal glow orbs */}
      <motion.div
        style={{ y: yRange }}
        className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-pink-600/5 rounded-full blur-[150px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.07, 0.03] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: yRangeOpposite }}
        className="absolute bottom-[10%] right-[-5%] w-[55vw] h-[55vw] bg-purple-600/5 rounded-full blur-[160px]"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.03, 0.06, 0.03] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* "Hormonal Flow" lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="tube-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="30%" stopColor="#ec4899" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic paths representing hormonal signaling */}
        {[
          "M 0 300 Q 300 150 600 300 T 1200 300",
          "M 0 500 Q 300 650 600 500 T 1200 500",
          "M 200 0 Q 400 400 200 800",
          "M 1000 0 Q 800 400 1000 800"
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#tube-grad-1)"
            strokeWidth={i < 2 ? "1.5" : "0.5"}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, delay: i * 0.5, ease: "easeInOut" }}
            className="opacity-20"
          />
        ))}

        {/* Orbiting "signal" particles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`signal-${i}`}
            r="2"
            fill={i % 2 === 0 ? "#ec4899" : "#a855f7"}
            filter="url(#glow)"
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            style={{ 
              offsetPath: `path('${i % 2 === 0 ? "M 0 300 Q 300 150 600 300 T 1200 300" : "M 0 500 Q 300 650 600 500 T 1200 500"}')` 
            } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* Evolution/Cellular Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.type === 'cell' ? 'border border-white/5' : 'rounded-full'}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.type === 'follicle' ? p.color : 'transparent',
            borderRadius: p.type === 'follicle' ? '50%' : '20%',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.cos(i) * 30, 0],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: p.type === 'cell' ? [0, 180, 360] : 0
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
