import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ============================================================
   TYPES & DATA
============================================================ */
interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  accentColor: string;
  cardBg: string;
  svgIcon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "01",
    number: "01",
    title: "Secure Distributed Architecture",
    description:
      "A fault-tolerant distributed system focusing on high-throughput data processing, end-to-end encryption, and automated load balancing.",
    tags: ["React", "TypeScript", "Node.js", "Docker", "AWS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    accentColor: "#38bdf8",
    cardBg: "#161E2E",
    svgIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    id: "02",
    number: "02",
    title: "Intelligent Analytics Engine",
    description:
      "Real-time event tracking and analytical processing pipeline designed to aggregate millions of daily data points with minimal latency.",
    tags: ["Next.js", "Python", "Tailwind CSS", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    accentColor: "#818cf8",
    cardBg: "#1A1B2F",
    svgIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "03",
    number: "03",
    title: "Next-Gen User Product Platform",
    description:
      "A modern, highly accessible digital interface tailored to seamless user onboarding, real-time collaboration, and contextual workflows.",
    tags: ["TypeScript", "Framer Motion", "GraphQL", "Redis"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    accentColor: "#34d399",
    cardBg: "#14231E",
    svgIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

/* ============================================================
   BLACK & WHITE ASCII DEFAULT -> IMAGE HOVER COMPONENT
============================================================ */
const AsciiImageHover: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const width = 70;
      const height = 40;
      canvas.width = width * 7;
      canvas.height = height * 9;

      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, width, height);
      const imgData = offCtx.getImageData(0, 0, width, height).data;

      const chars = " .:-=+*#%@";
      ctx.fillStyle = "#0B0D12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "9px monospace";

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          const r = imgData[offset];
          const g = imgData[offset + 1];
          const b = imgData[offset + 2];
          const brightness = (r + g + b) / 3;
          const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
          const char = chars[charIndex];

          // Pure monochrome black & white mapping
          const shade = Math.floor(brightness);
          ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;

          ctx.fillText(char, x * 7, y * 9);
        }
      }
    };
  }, [src]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-lg bg-[#0E1117] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      />
    </div>
  );
};

/* ============================================================
   SINGLE STACKED CARD COMPONENT
============================================================ */
interface CardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Card: React.FC<CardProps> = ({ project, index, total, progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const targetScale = 1 - (total - index - 1) * 0.04;
  const start = index / total;

  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const topOffset = index * 42; 

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-[65vh] flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${topOffset}px)`,
          backgroundColor: project.cardBg,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative w-full max-w-4xl h-[340px] md:h-[380px] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-5 md:p-8 flex flex-col justify-between pointer-events-auto"
      >
        {/* Card Header */}
        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg bg-black/30 border border-white/10"
              style={{ color: project.accentColor }}
            >
              {project.svgIcon}
            </div>
            <div>
              <span
                className="font-mono text-xs tracking-widest uppercase font-semibold block"
                style={{ color: project.accentColor }}
              >
                Project {project.number}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                {project.title}
              </h3>
            </div>
          </div>
          <span className="text-3xl md:text-5xl font-extrabold text-white/10 font-mono leading-none">
            {project.number}
          </span>
        </div>

        {/* Card Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10 my-auto">
          {/* Text & Tags */}
          <div className="md:col-span-7 space-y-3">
            <p className="text-slate-300/80 text-xs md:text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-black/40 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* B&W ASCII -> Image Hover Preview */}
          <div className="md:col-span-5 h-28 md:h-40 border border-white/10 rounded-lg overflow-hidden">
            <AsciiImageHover src={project.image} alt={project.title} />
          </div>
        </div>

        {/* Card Footer Link */}
        <div className="z-10 pt-2 border-t border-white/10 flex justify-between items-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Hover preview for original photo
          </span>
          <a
            href="#"
            style={{ color: project.accentColor }}
            className="text-[11px] font-mono tracking-widest uppercase hover:underline flex items-center gap-1.5"
          >
            View Case Study <span>→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

/* ============================================================
   MAIN STACKED SECTION
============================================================ */
export default function StackedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0B0D12] text-slate-100 px-4 md:px-8 py-10"
    >
      {/* SVG Noise Texture Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-25 mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Dotted Grid Pattern Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none z-0" />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto pt-6 pb-2">
        <p className="text-sky-400 font-mono text-xs tracking-widest uppercase font-semibold mb-1">
          Featured Work
        </p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
          System Architecture & Engineering.
        </h2>
      </div>

      {/* Stacked Cards Container */}
      <div className="relative z-10 pb-20">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
} 