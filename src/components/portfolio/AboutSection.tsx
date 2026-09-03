import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, BookOpen, Music } from "lucide-react";

/* ── Light Film Grain Canvas ───────────────────────────────────────── */
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
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = v * 0.07;
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
      style={{ imageRendering: "pixelated" }}
    />
  );
};

/* ── Compact About Section ─────────────────────────────────────────── */
const AboutSection = () => {
  const interests = [
    {
      label: "Reading",
      icon: <BookOpen size={20} />,
      color: "#233D4D",
      tooltipBg: "#233D4D",
      tooltipColor: "#ffffff",
    },
    {
      label: "Music",
      icon: <Music size={20} />,
      color: "#475569",
      tooltipBg: "#475569",
      tooltipColor: "#ffffff",
    },
    {
      label: "Open Source",
      icon: <Code2 size={20} />,
      color: "#0F172A",
      tooltipBg: "#0F172A",
      tooltipColor: "#ffffff",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden about-dot-bg-white py-8 md:py-10 flex items-center justify-center"
    >
      {/* ── Film Grain Noise ── */}
      <Noise />

      {/* ── Soft Radial Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.04) 100%)",
        }}
      />

      {/* ── CSS Background & Custom Tooltip Styles ── */}
      <style>{`
        .about-dot-bg-white {
          background-color: #ffffff !important;
          background-image: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
        }

        .iso-badge { position: relative; cursor: pointer; }
        .iso-badge-icon {
          width: 44px; 
          height: 44px; 
          border-radius: 50%;
          display: flex; 
          justify-content: center; 
          align-items: center;
          background: #ffffff;
          border: 1px solid #CBD5E1;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          color: var(--sc);
        }
        .iso-badge-sh {
          position: absolute; 
          inset: 0; 
          border-radius: 50%;
          border: 1px solid var(--sc); 
          opacity: 0;
          transition: all 0.3s ease; 
          pointer-events: none;
        }
        .doodle-badge-tooltip {
          position: absolute; 
          top: 0; 
          left: 50%;
          transform: translateX(-50%) scale(0.8) rotate(-6deg);
          padding: 4px 10px; 
          color: var(--t-cl); 
          background-color: var(--t-bg);
          border-radius: 10px; 
          font-size: 11px; 
          font-weight: 700;
          letter-spacing: 0.04em; 
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          opacity: 0; 
          visibility: hidden;
          transition: all 0.35s cubic-bezier(0.68,-0.55,0.265,1.55);
          pointer-events: none; 
          z-index: 20;
        }
        .doodle-badge-tooltip::after {
          content: ""; 
          position: absolute; 
          bottom: -4px; 
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 6px; 
          height: 6px; 
          background-color: var(--t-bg);
        }
        .iso-badge:hover .iso-badge-icon {
          transform: translate(3px,-4px) scale(1.06) rotate(3deg);
          background: #ffffff;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        .iso-badge:hover .doodle-badge-tooltip {
          opacity: 1; 
          visibility: visible; 
          top: -42px;
          transform: translateX(-50%) scale(1) rotate(2deg);
        }
        .iso-badge:hover .iso-badge-sh1 { opacity: 0.15; transform: translate(2px,-2px); }
        .iso-badge:hover .iso-badge-sh2 { opacity: 0.25; transform: translate(4px,-4px); }
        .iso-badge:hover .iso-badge-sh3 { opacity: 0.4; transform: translate(7px,-7px); }
      `}</style>

      {/* ── Content ── */}
      <div className="relative z-[4] max-w-6xl mx-auto px-6 w-full">
        {/* On mobile: grid layout with absolute/overlapping positioning. On desktop (md:): standard 2-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative">

          {/* Left Column: Image (Shifts behind text on mobile using absolute positioning with low opacity, normal block on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 md:relative md:inset-auto flex justify-center items-center pointer-events-none md:pointer-events-auto z-0 md:z-auto opacity-15 md:opacity-100"
          >
            <div className="relative w-full max-w-[280px] md:max-w-[360px] aspect-square flex items-center justify-center">
              <img
                src="/about.png"
                alt="Neh Lizza Illustration"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </motion.div>

          {/* Right Column: Bio Content (Stays cleanly on top on mobile with a higher z-index) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 md:z-auto py-4 md:py-0"
          >
            {/* Main Heading */}
            <h2
              className="tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "#0B1020",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}
            >
              Hey, I'm{" "}
              <span style={{ color: "#0B1020" }}>
                Neh Lizza
              </span>
            </h2>

            {/* Body Copy */}
            <div
              className="space-y-2.5 text-xs md:text-sm"
              style={{ color: "#494d57", lineHeight: 1.6 }}
            >
              <p>
                Curious first,{" "}
                <span className="text-[#0B1020] font-semibold border-b border-slate-300">
                  Consistent always
                </span>
                . Drawn to web apps, product tools, SecDevOps, and AI‑powered systems .. anywhere data, logic, and real users meet.
              </p>

              <p>
               Deeply interested in AI and machine learning, how models learn, how
      systems reason, and how intelligence can be embedded into real products.
      Equally drawn to security and DevOps tooling, designing systems that are
      not only smart, but also safe, reliable, and operable in production.
              </p>

              <p>
                When I'm not building, I'm reading, listening to music, or finding new ways to think about old problems. I like having my perspectives challenged.
              </p>
            </div>

            {/* Interest Badges */}
            <div className="flex items-center gap-4 flex-wrap mt-6 pt-2">
              {interests.map(({ label, icon, color, tooltipBg, tooltipColor }) => (
                <div
                  key={label}
                  className="iso-badge"
                  style={{ "--sc": color, "--t-bg": tooltipBg, "--t-cl": tooltipColor } as React.CSSProperties}
                >
                  <span className="iso-badge-sh iso-badge-sh1" />
                  <span className="iso-badge-sh iso-badge-sh2" />
                  <span className="iso-badge-sh iso-badge-sh3" />
                  <div className="iso-badge-icon">{icon}</div>
                  <div className="doodle-badge-tooltip">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;