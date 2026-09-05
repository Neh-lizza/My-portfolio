import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";

/* ============================================================
   FILM GRAIN CANVAS BACKGROUND (Matching Skills Section)
============================================================ */
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

/* ============================================================
   TYPES & DATA
============================================================ */
interface Project {
  id: string;
  number: string;
  date: string;
  subtitle: string;
  title: string;
  description: string;
  theGoal: string;
  theSystem: string;
  images: string[];
  techStack: string[];
  liveUrl?: string;
  isIframe?: boolean;
  iframeCode?: string;
}

const projects: Project[] = [
  {
    id: "01",
    number: "01 / 06",
    date: "Live Platform",
    subtitle: "Back2U",
    title: "Back2U: Cameroon Lost & Found Platform",
    description: "A web-based lost and found platform built specifically for Cameroon featuring AI image similarity, GPS proximity matching, secure in-app chat with ownership verification, and mobile money subscriptions via MeSomb.",
    theGoal: "To streamline the recovery of lost items, found objects, and missing persons across Cameroon using automated AI matching algorithms and verified peer-to-peer communication.",
    theSystem: "Built with Next.js 16 App Router, TypeScript, and Supabase (PostgreSQL with PostGIS and pgvector), integrating Hugging Face CLIP/BART models, Mapbox GL JS, OneSignal, and MeSomb payments.",
    images: [
      "b2u1.jpeg",
      "b2u2.jpeg",
      "b2u3.jpeg"
    ],
    techStack: ["Next.js 16", "TypeScript", "Supabase", "PostGIS", "Tailwind CSS"],
    liveUrl: "https://back2u-cmr.vercel.app"
  },
  {
  id: "02",
  number: "02 / 06",
  date: "Current Build",
  subtitle: "Portfolio & Interactive Showcase",
  title: "Personal Portfolio v2: Solutions, Not Just Screens",
  description:
    "My portfolio focused on real solutions: secure, scalable systems across web, AI, and data. Features interactive case studies, live project previews, and a clean, no‑fluff interface.",
  theGoal:
    "To show how I solve problems end‑to‑end — from idea to production‑ready systems",
  theSystem:
    "Built with React, TypeScript, Tailwind CSS, and Framer Motion.",
  images: ["about.png"],
  techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  liveUrl: "https://neh-lizza.vercel.app/"
},
  {
    id: "03",
    number: "03 / 06",
    date: "2026",
    subtitle: "UniSell: Student Secondhand Marketplace",
    title: "UniSell: Campus Trading ",
    description: "A full‑stack marketplace for university students in Cameroon to buy and sell campus items — beds, fridges, fans, electronics, textbooks, and more. Replaces chaotic WhatsApp trading with search, structure, and basic fraud protection.",
    theGoal: "To give students a simple, affordable place to trade secondhand goods without paying channel owners just to post, and without getting lost in endless WhatsApp threads.",
    theSystem: "Built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase, featuring decoupled ML models (Random Forest, Isolation Forest, TF-IDF recommendations) running via Google Colab.",
    images: [
      "unisell1.PNG"
    ],
    techStack: ["Next.js 16", "TypeScript", "Supabase", "Python", "Docker"],
    liveUrl: "https://unisell-coral.vercel.app"
  },
  {
    id: "04",
    number: "04 / 06",
    date: "Special Tribute",
    subtitle: "Birthday Interactive Web Experience",
    title: "Happy Birthday Mummy Kate ✦",
    description: "An immersive, multi-scene interactive web tribute featuring dynamic star fields, shooting stars, an electric glowing greeting card, fuzzy typography, and a 3D spinning photo sphere gallery.",
    theGoal: "To design a heartfelt, visually stunning, and highly engaging digital birthday experience filled with customized animations and memories.",
    theSystem: "Built with vanilla HTML5 canvas, custom 3D math transformations for the photo dome, particle engines for shooting stars and emoji rains, and smooth framer motion transitions.",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80"
    ],
    techStack: ["HTML5 Canvas", "JavaScript", "CSS3 Animations", "Tailwind CSS"],
    liveUrl: "https://happy-birthday-mummy-one.vercel.app",
    isIframe: true,
    iframeCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Happy Birthday Mummy Kate ✦</title>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{width:100%;height:100%;overflow:hidden;font-family:Georgia,serif;background:radial-gradient(ellipse at bottom,#1b2735,#090a0f);}
#bgCanvas{position:fixed;top:0;left:0;z-index:0;}
.night{position:fixed;width:100%;height:100%;z-index:1;pointer-events:none;}
.shooting_star{position:absolute;height:2px;background:linear-gradient(-45deg,#5f91ff,transparent);border-radius:999px;filter:drop-shadow(0 0 6px #699bff);animation:tail 3s ease-in-out infinite,shooting 3s ease-in-out infinite;}
.shooting_star::before,.shooting_star::after{content:'';position:absolute;right:0;height:2px;background:linear-gradient(-45deg,transparent,#5f91ff,transparent);border-radius:100%;animation:shining 3s ease-in-out infinite;}
.shooting_star::before{transform:translateX(50%) rotate(45deg);}
.shooting_star::after{transform:translateX(50%) rotate(-45deg);}
.shooting_star:nth-child(1){top:8%;left:15%;animation-delay:0s;}
.shooting_star:nth-child(2){top:25%;left:55%;animation-delay:.8s;}
.shooting_star:nth-child(3){top:65%;left:35%;animation-delay:1.6s;}
@keyframes tail{0%{width:0}30%{width:clamp(60px,12vw,120px)}100%{width:0}}
@keyframes shining{0%{width:0}50%{width:clamp(20px,5vw,30px)}100%{width:0}}
@keyframes shooting{0%{transform:translateX(0)}100%{transform:translateX(clamp(180px,35vw,320px))}}
#burstCanvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;pointer-events:none;}
#app{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10;display:flex;align-items:center;justify-content:center;}
.scene{display:none;text-align:center;width:92%;max-width:780px;max-height:100vh;overflow-y:auto;padding:10px 0;}
#scene1{display:flex;flex-direction:column;align-items:center;}
@keyframes glow{0%,100%{text-shadow:0 0 40px rgba(127,249,255,.35)}50%{text-shadow:0 0 90px rgba(127,249,255,.8)}}
.hbd-line1{color:#fff;font-size:clamp(22px,7vw,50px);font-weight:300;letter-spacing:4px;animation:glow 2.5s ease-in-out infinite;}
.hbd-line2{color:#7df9ff;font-size:clamp(26px,8vw,60px);font-style:italic;animation:glow 2.5s ease-in-out infinite .3s;}
.star-btn{padding:12px 30px;background:#fec195;font-size:15px;color:#181818;border:3px solid #fec195;border-radius:8px;cursor:pointer;margin-top:20px;font-family:Georgia,serif;}
</style>
</head>
<body>
<canvas id="bgCanvas"></canvas>
<div class="night"><div class="shooting_star"></div><div class="shooting_star"></div><div class="shooting_star"></div></div>
<div id="app">
  <div class="scene" id="scene1" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
    <div class="hbd-line1">Happy Birthday</div>
    <div class="hbd-line2" style="margin-top:10px;">Mummy Kate</div>
    <p style="color:rgba(127,249,255,0.6);margin-top:15px;font-size:14px;letter-spacing:2px;">✦ A Special Tribute from Nene to Mummy Kate</p>

  </div>
</div>
<script>
var c=document.getElementById('bgCanvas'),x=c.getContext('2d');
var w=c.width=window.innerWidth,h=c.height=window.innerHeight,s=[];
for(var i=0;i<120;i++)s.push({x:Math.random()*w,y:Math.random()*h,sz:Math.random()*1.8,sp:Math.random()*.25+.05});
function draw(){x.fillStyle='#110E19';x.fillRect(0,0,w,h);x.fillStyle='#fff';s.forEach(function(p){p.x-=p.sp;if(p.x<0)p.x=w;x.fillRect(p.x,p.y,p.sz,p.sz);});requestAnimationFrame(draw);}
draw();
window.addEventListener('resize',function(){w=c.width=window.innerWidth;h=c.height=window.innerHeight;});
</script>
</body>
</html>`
  },
  {
    id: "05",
    number: "05 / 06",
    date: "In Development",
    subtitle: "Inventory-Management-System",
    title: "Modern Inventory Management System",
    description: "A modern inventory management system featuring role-based dashboards for Shop Owners, Inventory Managers, and Sales Agents with inventory tracking, warehouse management, and a responsive point-of-sale interface.",
    theGoal: "To streamline multi-role commercial operations, stock transfers, purchase orders, and supplier tracking through a unified interface.",
    theSystem: "Built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui components for robust performance and a sleek user experience.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
    ],
    techStack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "#"
  },
  {
    id: "06",
    number: "06 / 06",
    date: "Event Platform",
    subtitle: "Kwiz237",
    title: "Kwiz237: Live Multiplayer Event Quiz Platform",
    description: "A live, host-controlled multiplayer quiz competition platform built for in-person events where multiple groups play separate live sessions throughout the day with automatic server-side scoring.",
    theGoal: "To provide a seamless trivia and event competition ecosystem featuring dedicated host admin dashboards, projector display outputs, and mobile-first player interfaces.",
    theSystem: "Built with Next.js App Router, TypeScript, and Tailwind CSS v4, supporting host controls (`/host/login`, `/host/dashboard`), mobile participant entry (`/join`, `/play`), and public TV/projector screens (`/display`).",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS v4", "Supabase"],
    liveUrl: "#"
  }
];

/* ============================================================
   FULL-SCREEN IMMERSIVE PROJECT VIEWER
============================================================ */
interface FullScreenProjectModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const FullScreenProjectModal: React.FC<FullScreenProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#121212] flex flex-col overflow-hidden text-white"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212] select-none z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
            CASE STUDY {project.number}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/15 hover:bg-white/25 text-xs font-mono tracking-wider uppercase transition text-white font-medium"
          >
            CLOSE <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Split Layout Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Side: Preview Window */}
        <div className="lg:col-span-8 bg-black/60 p-6 lg:p-10 flex flex-col justify-center items-center relative overflow-y-auto border-r border-white/10">
          <div className="relative w-full max-w-4xl bg-[#1c1c1c] rounded-xl border border-white/15 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Window Browser Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#262626] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-300 truncate max-w-sm">
                {project.liveUrl !== "#" ? project.liveUrl : `https://${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.app`}
              </span>
              <div className="w-10" />
            </div>

            {/* Screen Content: Interactive Iframe or Image Gallery */}
            {project.isIframe && project.iframeCode ? (
              <div className="relative w-full h-[50vh] lg:h-[60vh] bg-black">
                <iframe
                  srcDoc={project.iframeCode}
                  title={project.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            ) : (
              <div className="relative w-full h-[50vh] lg:h-[60vh] bg-black/40 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={project.images[activeImageIndex]}
                    alt={project.title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
                      }
                      className="absolute left-4 p-2.5 rounded-full bg-black/80 border border-white/30 text-white hover:bg-black transition shadow-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
                      }
                      className="absolute right-4 p-2.5 rounded-full bg-black/80 border border-white/30 text-white hover:bg-black transition shadow-lg"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Bottom Gallery Controls / Info */}
            {!project.isIframe && project.images.length > 1 && (
              <div className="p-4 bg-[#181818] border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">
                  Gallery View ({activeImageIndex + 1} / {project.images.length})
                </span>
                <div className="flex gap-2">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-10 h-6 rounded overflow-hidden border transition ${
                        idx === activeImageIndex ? "border-white opacity-100 scale-105" : "border-white/30 opacity-60"
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Carousel Controls for switching between projects */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-mono text-white hover:bg-white/20 transition font-medium"
            >
              <ChevronLeft size={16} /> PREV PROJECT
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-mono text-white hover:bg-white/20 transition font-medium"
            >
              NEXT PROJECT <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Editorial Specifications panel */}
        <div className="lg:col-span-4 bg-[#f4f2ee] text-slate-900 p-8 lg:p-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest font-bold mb-2 text-[#233D4D]">
                {project.subtitle}
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold font-serif tracking-tight text-slate-900 leading-tight">
                {project.title}
              </h1>
              <p className="text-xs font-mono text-slate-600 font-semibold mt-2">{project.date}</p>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-300">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1">
                  THE GOAL
                </h3>
                <p className="text-sm leading-relaxed text-slate-900">
                  {project.theGoal}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1">
                  THE SYSTEM
                </h3>
                <p className="text-sm leading-relaxed text-slate-900">
                  {project.theSystem}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-2">
                TECH STACK
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-slate-200 border border-slate-300 text-[11px] font-mono font-bold text-[#233D4D]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-300">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition shadow-md ${project.liveUrl === "#" ? "opacity-50 pointer-events-none" : ""}`}
            >
              <span>{project.liveUrl === "#" ? "STILL IN DEVELOPMENT (NOT YET DEPLOYED)" : "VISIT THE LIVE PROJECT"}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN STACKED PROJECTS SECTION
============================================================ */
export default function StackedProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const currentProject = projects[activeProjectIndex];

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="work"
      className="relative py-24 px-4 md:px-8 min-h-screen hero-dot-bg overflow-hidden flex flex-col items-center justify-center"
    >
      <Noise />

      {/* Background Radial Vignette (Matching Skills Section) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Projects
        </h2>
        <p className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase mt-0.5 text-slate-300">
          My Recent Work
        </p>
      </div>

      {/* Main Glass Stack Card Box */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-black/50 border border-white/20 backdrop-blur-xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
        
        {/* Carousel Top Navigation Row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition shadow-md"
            aria-label="Previous Project"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-center px-4">
            <h3 className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-white drop-shadow-sm">
              {currentProject.subtitle}
            </h3>
            <p className="text-xs mt-1 font-mono font-semibold tracking-wide text-slate-300">
              {currentProject.date}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition shadow-md"
            aria-label="Next Project"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Project Card Triggering Full-Screen Immersive View */}
        <div
          onClick={() => setIsFullScreenOpen(true)}
          className="bg-black/60 border border-white/15 rounded-xl p-5 sm:p-6 cursor-pointer group hover:border-white/40 transition-all shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 flex flex-col justify-center space-y-3">
              <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-slate-200 transition-colors">
                {currentProject.title}
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {currentProject.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProject.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[11px] font-mono font-bold text-white shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 h-36 sm:h-44 border border-white/20 rounded-xl overflow-hidden shadow-inner bg-black/40 relative">
              <img
                src={currentProject.images[0]}
                alt={currentProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex justify-between items-center text-xs">
            <span className="inline-flex items-center gap-1.5 text-white font-bold group-hover:underline transition">
              Open Full-Screen Case Study <ExternalLink size={12} />
            </span>
            <span className="font-mono text-[11px] font-bold text-slate-200">
              Project {currentProject.id} of {projects.length}
            </span>
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveProjectIndex(idx)}
              aria-label={`Go to project ${proj.id}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeProjectIndex ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Full-Screen Immersive Case Study Modal */}
      <AnimatePresence>
        {isFullScreenOpen && (
          <FullScreenProjectModal
            project={currentProject}
            onClose={() => setIsFullScreenOpen(false)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>

      <style>{`
        .hero-dot-bg {
          background-color: #000000;
          background-image: radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
}