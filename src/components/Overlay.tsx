"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.1
  });

  // Section 1: 0% to 15%
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.15, 1], [0, -100, -100]);

  // Section 2: 25% to 45%
  const opacity2 = useTransform(smoothProgress, [0, 0.2, 0.3, 0.4, 0.45, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(smoothProgress, [0, 0.2, 0.45, 1], [100, 100, -100, -100]);

  // Section 3: 50% to 70%
  const opacity3 = useTransform(smoothProgress, [0, 0.49, 0.5, 0.6, 0.7, 0.75, 1], [0, 0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(smoothProgress, [0, 0.5, 0.75, 1], [100, 100, -100, -100]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10 flex flex-col justify-between">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-center flex flex-col items-center justify-center w-full px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-lg">
            SARTHAK VERMA
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mt-4 font-light tracking-wide">
            Data Analyst
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-6 md:left-[15%] lg:left-[20%] text-left max-w-[500px]"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-md">
            Transforming data into <span className="text-white/50 italic">actionable</span> insights.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute right-6 md:right-[15%] lg:right-[20%] text-right max-w-[500px]"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-md">
            Bridging data and <span className="text-white/50 italic">business</span> strategy.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
