import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full bg-[#121212] flex flex-col min-h-screen font-sans selection:bg-white/20">
      
      {/* 500vh Scrubbing Area container */}
      <div className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* Grid below the scrub section */}
      <Projects />
      <Experience />
      <Contact />
      
    </main>
  );
}
