import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe, Sparkles, Cloud, Cpu, Network } from "lucide-react";

/* ── Film Grain Canvas Background ────────────────────────────────────── */
const Noise = () => {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const SIZE = 1024;

    const resize = () => {
      canvas.width = SIZE;
      canvas.height = SIZE;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const draw = () => {
      const img = ctx.createImageData(SIZE, SIZE);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 16;
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = () => {
      if (frame % 2 === 0) draw();
      frame++;
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-[3]"
      style={{ imageRendering: "pixelated", opacity: 0.8 }}
    />
  );
};

/* ── Carousel Data ─────────────────────────────────────────────────── */
const techCategories = [
  {
    category: "Programming & Development",
    subtitle: "Everyday tools powering my software development workflow.",
    techs: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  },
  {
    category: "Full Stack Development",
    subtitle: "Front-end, back-end, mobile, and database technologies.",
    techs: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    category: "Data & AI",
    subtitle: "Tools used to query data, train models, and deploy AI solutions.",
    techs: [
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
      { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
      { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
    ],
  },
  {
    category: "Tools & Workflow",
    subtitle: "Developer tools, version control, and productivity utilities.",
    techs: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ],
  },
];

/* ── Main Skills Section ────────────────────────────────────────────── */
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const nextCategory = () => {
    setActiveCategory((prev) => (prev + 1) % techCategories.length);
  };

  const prevCategory = () => {
    setActiveCategory((prev) => (prev - 1 + techCategories.length) % techCategories.length);
  };

  const currentTechs = techCategories[activeCategory].techs;

  return (
    <section
      id="skills"
      className="relative py-12 flex items-center justify-center overflow-hidden hero-dot-bg"
    >
      <Noise />

      {/* Background Radial Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Main Title Outside Glass Box */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skills
          </h2>
          <p style={{ color: "#233D4D" }} className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase mt-0.5">
            My TechStack
          </p>
        </div>

        {/* COMPACT GLASS CONTAINER */}
        <div className="relative w-full rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl p-4 sm:p-6 shadow-xl overflow-hidden">
          
          {/* Dynamic Carousel Section */}
          <div className="relative flex items-center justify-between gap-2 mb-2">
            <button
              onClick={prevCategory}
              className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-all z-20 cursor-pointer"
              aria-label="Previous Category"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex-1 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex flex-col items-center text-center px-1"
                >
                  <h3 style={{ color: "#233D4D" }} className="text-sm sm:text-base font-bold mb-0.5">
                    {techCategories[activeCategory].category}
                  </h3>
                  <p className="text-[11px] text-white/60 mb-4 max-w-md">
                    {techCategories[activeCategory].subtitle}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                    {currentTechs.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center group-hover:border-[#233D4D] group-hover:bg-[#233D4D]/20 group-hover:scale-105 transition-all duration-200">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain filter drop-shadow"
                          />
                        </div>
                        <span className="text-[10px] text-white/80 mt-1 font-medium group-hover:text-[#233D4D] transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextCategory}
              className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-all z-20 cursor-pointer"
              aria-label="Next Category"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mb-5">
            {techCategories.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(i)} 
                className="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{ 
                  background: i === activeCategory ? "#233D4D" : "rgba(255,255,255,0.2)", 
                  transform: i === activeCategory ? "scale(1.3)" : "scale(1)" 
                }} 
              />
            ))}
          </div>

          {/* Bottom Grid: Languages & Currently Interested In */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
            
            {/* Languages Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Globe className="w-4 h-4 text-[#233D4D]" />
                  <h3 className="text-xs sm:text-sm font-bold text-white">Languages</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[#233D4D] bg-[#233D4D]/20 px-1.5 py-0.5 rounded">En</span>
                      <div>
                        <p className="text-xs font-semibold text-white">English</p>
                        <p className="text-[10px] text-white/50">Native</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[#233D4D] bg-[#233D4D]/20 px-1.5 py-0.5 rounded">Fr</span>
                      <div>
                        <p className="text-xs font-semibold text-white">French</p>
                        <p className="text-[10px] text-white/50">Elementary</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Currently Interested In Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Sparkles className="w-4 h-4 text-[#233D4D]" />
                  <h3 className="text-xs sm:text-sm font-bold text-white">Currently Interested In</h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Cloud */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 text-center group hover:border-[#233D4D] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-[#233D4D]/20 border border-[#233D4D]/40 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <Cloud className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">Cloud</span>
                    <span className="text-[9px] text-white/50 mt-0.5">AWS</span>
                  </div>

                  {/* AI */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 text-center group hover:border-[#233D4D] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-[#233D4D]/20 border border-[#233D4D]/40 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">AI</span>
                    <span className="text-[9px] text-white/50 mt-0.5">LLMs</span>
                  </div>

                  {/* Blockchain */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 text-center group hover:border-[#233D4D] transition-all">
                    <div className="w-7 h-7 rounded-lg bg-[#233D4D]/20 border border-[#233D4D]/40 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                      <Network className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">Blockchain</span>
                    <span className="text-[9px] text-white/50 mt-0.5">Web3</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .hero-dot-bg {
          background-color: #000000;
          background-image: radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;