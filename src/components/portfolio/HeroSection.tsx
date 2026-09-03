import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";

/* ── Film grain noise canvas ───────────────────────────────────────────── */
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
        data[i + 3] = 18;
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
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ imageRendering: "pixelated", zIndex: 3, opacity: 1 }}
    />
  );
};

/* ── Hero Section ──────────────────────────────────────────────────────── */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const rawY  = useTransform(scrollY, [0, 600], [0, -120]);
  const rawOp = useTransform(scrollY, [0, 400], [1, 0]);
  const rawSc = useTransform(scrollY, [0, 400], [1, 0.92]);
  const smoothY  = useSpring(rawY,  { stiffness: 60, damping: 20 });
  const smoothOp = useSpring(rawOp, { stiffness: 60, damping: 20 });
  const smoothSc = useSpring(rawSc, { stiffness: 60, damping: 20 });

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Neh-lizza/",
      color: "#e2e8f0",
      tooltipBg: "#334155",
      tooltipColor: "#ffffff",
      icon: (
        <svg viewBox="0 0 98 96" fill="currentColor" width="22" height="22">
          <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/neh-lizza/",
      color: "#0a66c2",
      tooltipBg: "#0a66c2",
      tooltipColor: "#ffffff",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:nehhlizza@gmail.com",
      color: "#ea4335",
      tooltipBg: "#ea4335",
      tooltipColor: "#ffffff",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-dot-bg"
    >
      <Noise />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.72) 100%)" }}
      />

      <div className="star-glow" />

      <motion.div
        style={{ y: smoothY, opacity: smoothOp, scale: smoothSc }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 sm:pt-20 pb-8 sm:pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-end gap-6 sm:gap-10">

          <div className="flex flex-col text-left lg:pb-12">

            {/* Mobile Split Layout Top Row: Headline Left, Social Icons Right */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-[11px] sm:text-[12px] tracking-[0.18em] uppercase mb-2 sm:mb-[18px]"
                  style={{ color: "rgba(255, 255, 255, 0.55)" }}
                >
                  {/* <span className="text-white font-medium">Software Engineer</span> */}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="font-extrabold tracking-tight leading-[0.92] max-w-[650px]"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5.8rem)" }}
                >
                  Neh
                  <span
                    className="block text-transparent"
                    style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)" }}
                  >
                    Lizza.
                  </span>
                </motion.h1>

                {/* Adjacent Download CV Button directly under title on Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-4 lg:hidden"
                >
                  <a
                    href="https://drive.google.com/uc?export=download&id=1sj6HkpAChLDbM2t_sHFrAj6ejX-kNl96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.15)] text-white text-[12px] sm:text-[13px] font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:border-[#233D4D] hover:bg-[rgba(35,61,77,0.2)] hover:shadow-[0_0_20px_rgba(35,61,77,0.4)]"
                  >
                    <FileText size={15} className="text-white/70 group-hover:text-white transition-colors" />
                    <span>Download CV</span>
                    <ArrowDown size={13} className="text-white/50 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                  </a>
                </motion.div>
              </div>

              {/* Right Side Social Icons (Visible only on Mobile) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center gap-3 pt-1 lg:hidden"
              >
                {socials.map(({ label, href, color, tooltipBg, tooltipColor, icon }) => (
                  <div
                    key={label}
                    className="iso-social"
                    style={{ "--sc": color, "--t-bg": tooltipBg, "--t-cl": tooltipColor } as React.CSSProperties}
                  >
                    <span className="iso-sh iso-sh1" />
                    <span className="iso-sh iso-sh2" />
                    <span className="iso-sh iso-sh3" />
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <div className="iso-icon">{icon}</div>
                    </a>
                    <div className="doodle-hybrid-tooltip">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Sub-headline quote retained directly below */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-[520px] text-[15px] sm:text-[20px] font-semibold text-white/90 leading-snug tracking-wide font-sans"
            >
              The one you call when it has to be right.
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 mt-6 mb-4 items-center"
            >
              <a
                href="#work"
                className="inline-flex items-center justify-center min-w-[125px] sm:min-w-[140px] px-5 sm:px-6 py-2.5 sm:py-[14px] rounded-[30px] bg-[#233D4D] text-white text-[12px] sm:text-[13px] font-bold tracking-[0.02em] hover:-translate-y-[3px] hover:bg-[#1d323f] transition-all duration-300"
              >
                See My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center min-w-[125px] sm:min-w-[140px] px-5 sm:px-6 py-2.5 sm:py-[14px] rounded-[30px] bg-[rgba(255,255,255,0.04)] text-white text-[12px] sm:text-[13px] font-bold tracking-[0.02em] border border-[rgba(255,255,255,0.22)] hover:-translate-y-[3px] hover:border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
              >
                Let's Talk
              </a>

              {/* Desktop Download CV Button placed below See My Work & Let's Talk */}
              <div className="hidden lg:block w-full mt-2">
                <a
                  href="https://drive.google.com/uc?export=download&id=1sj6HkpAChLDbM2t_sHFrAj6ejX-kNl96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.15)] text-white text-[13px] font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:border-[#233D4D] hover:bg-[rgba(35,61,77,0.2)] hover:shadow-[0_0_20px_rgba(35,61,77,0.4)]"
                >
                  <FileText size={15} className="text-white/70 group-hover:text-white transition-colors" />
                  <span>Download CV</span>
                  <ArrowDown size={13} className="text-white/50 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                </a>
              </div>
            </motion.div>

            {/* Desktop Social Icons Row placed below CTA buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden lg:flex items-center gap-3 mt-4"
            >
              {socials.map(({ label, href, color, tooltipBg, tooltipColor, icon }) => (
                <div
                  key={label}
                  className="iso-social"
                  style={{ "--sc": color, "--t-bg": tooltipBg, "--t-cl": tooltipColor } as React.CSSProperties}
                >
                  <span className="iso-sh iso-sh1" />
                  <span className="iso-sh iso-sh2" />
                  <span className="iso-sh iso-sh3" />
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <div className="iso-icon">{icon}</div>
                  </a>
                  <div className="doodle-hybrid-tooltip">{label}</div>
                </div>
              ))}
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0 flex justify-center items-center w-full lg:w-auto mt-2 sm:mt-0"
          >
            <div className="arch-frame" />
          </motion.div>

        </div>
      </motion.div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 hover:text-primary transition-colors z-20"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <ArrowDown size={18} className="animate-bounce" />
      </motion.a>

      <style>{`
        .hero-dot-bg {
          background-color: #000000;
          background-image: radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .star-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          right: 20%;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(35,61,77,0.6), transparent 70%);
          filter: blur(60px);
          z-index: 1;
          pointer-events: none;
        }
        .arch-frame {
          position: relative;
          width: 100%;
          max-width: 440px;
          height: 55vh;
          background: #233D4D;
          border-radius: 240px 240px 0 0;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .iso-social { position: relative; cursor: pointer; }
        .iso-icon {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          color: var(--sc);
        }
        @media (min-width: 640px) {
          .iso-icon { width: 46px; height: 46px; }
          .arch-frame { height: 72vh; }
        }
        .iso-sh {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid var(--sc); opacity: 0;
          transition: all 0.3s ease; pointer-events: none;
        }
        .doodle-hybrid-tooltip {
          position: absolute; top: 0; left: 50%;
          transform: translateX(-50%) scale(0.8) rotate(-6deg);
          padding: 5px 12px; color: var(--t-cl); background-color: var(--t-bg);
          border-radius: 12px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.05em; white-space: nowrap;
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
          opacity: 0; visibility: hidden;
          transition: all 0.35s cubic-bezier(0.68,-0.55,0.265,1.55);
          pointer-events: none; z-index: 20;
        }
        .doodle-hybrid-tooltip::after {
          content: ""; position: absolute; bottom: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px; height: 8px; background-color: var(--t-bg);
        }
        .iso-social:hover .iso-icon {
          transform: translate(3px,-5px) scale(1.08) rotate(4deg);
          background: rgba(255,255,255,0.12);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .iso-social:hover .doodle-hybrid-tooltip {
          opacity: 1; visibility: visible; top: -42px;
          transform: translateX(-50%) scale(1) rotate(2deg);
        }
        .iso-social:hover .iso-sh1 { opacity: 0.2; transform: translate(2px,-2px); }
        .iso-social:hover .iso-sh2 { opacity: 0.35; transform: translate(5px,-5px); }
        .iso-social:hover .iso-sh3 { opacity: 0.5; transform: translate(9px,-9px); }
        @media (max-width: 1024px) {
          .arch-frame { max-width: 320px; height: 42vh; border-radius: 180px 180px 0 0; }
        }
        @media (max-width: 640px) {
          .arch-frame { max-width: 280px; height: 35vh; border-radius: 140px 140px 0 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;