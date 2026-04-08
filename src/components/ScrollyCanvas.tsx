"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

const FRAME_COUNT = 160;

const preloadImages = () => {
  const images = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    const index = i.toString().padStart(3, "0");
    img.src = `/sequence/frame_${index}_delay-0.05s.png`;
    images.push(img);
  }
  return images;
};

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Offset ensures that when the top of the container hits the top of the viewport it's 0%
  // And when the bottom of the container hits the bottom of the viewport it's 100%
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.1
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const preloaded = preloadImages();
    setImages(preloaded);
    
    // Wait for the first image to load to do an initial draw
    preloaded[0].onload = () => {
      setLoaded(true);
      drawFrame(0, preloaded);
    };
  }, []);

  const drawFrame = (index: number, imgs: HTMLImageElement[] = images) => {
    if (!canvasRef.current || !imgs[index] || !imgs[index].complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imgs[index];
    
    const dpr = window.devicePixelRatio || 1;
    // Dynamically size the canvas base resolution using dpr
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Scale drawing context to match dpr
    ctx.scale(dpr, dpr);
    
    // Object-fit: cover equivalent calculation
    const scale = Math.max(window.innerWidth / img.width, window.innerHeight / img.height);
    const x = (window.innerWidth / 2) - (img.width / 2) * scale;
    const y = (window.innerHeight / 2) - (img.height / 2) * scale;
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    const handleResize = () => drawFrame(Math.floor(frameIndex.get()));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  useEffect(() => {
    if (!loaded) return;
    const unsubscribe = frameIndex.on("change", (latestVal) => {
      drawFrame(Math.floor(latestVal));
    });
    return () => unsubscribe();
  }, [loaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Loading overlay if first image is still loading */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
            <span className="text-white/50 animate-pulse text-sm">Loading visual experience...</span>
          </div>
        )}

        {/* We can place the parallax overlay components here */}
        {children}
      </div>
    </div>
  );
}
