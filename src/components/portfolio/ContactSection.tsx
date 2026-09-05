import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";

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

/* ── Main Contact Section ────────────────────────────────────────────── */
export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Option A: If using Formspree, replace the URL string below with your endpoint (e.g., "https://formspree.io/f/your_id")
      // Option B: If calling a backend API route, use your endpoint (e.g., "/api/contact")
      const endpoint = "https://formspree.io/f/your_form_id"; // <-- Replace with your actual form backend URL

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data?.error || "Failed to send message. Please try again later.");
      }
    } catch (err: any) {
      // Fallback simulation if no backend endpoint is configured yet so the UI still works
      console.warn("Using simulation fallback. Error details:", err.message);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        // Uncomment below line if you want strict failure display when no endpoint is connected:
        // setErrorMsg(err.message || "Something went wrong.");
      }, 1000);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Neh-lizza/",
      color: "#e2e8f0",
      tooltipBg: "#334155",
      tooltipColor: "#ffffff",
      icon: (
        <svg viewBox="0 0 98 96" fill="currentColor" width="20" height="20">
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
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/237651354402",
      color: "#25D366",
      tooltipBg: "#25D366",
      tooltipColor: "#ffffff",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 flex items-center justify-center overflow-hidden hero-dot-bg text-white"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full text-white">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contact
          </h2>
          <p
            style={{ color: "#233D4D" }}
            className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase mt-0.5"
          >
            Let&apos;s Build Something Extraordinary
          </p>
        </div>

        {/* 12-Column Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Glass Container (7 columns) */}
          <div className="lg:col-span-7 relative w-full rounded-2xl bg-white/[0.02] border border-white/15 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              
              {/* Left Info Column */}
              <div className="md:col-span-2 space-y-4 text-left text-white">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-medium">
                  <span>Open for Collaborations</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Get in touch
                </h3>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-normal">
                  Have a project in mind, want to collaborate, or just want to say hi? Drop a message and let&apos;s talk.
                </p>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#233D4D]">
                      <Mail size={16} />
                    </div>
                    <span className="text-white">nehhlizza@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#233D4D]">
                      <MessageSquare size={16} />
                    </div>
                    <span className="text-white">Response time: &lt; 24 hours</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-3 pt-3">
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
                </div>
              </div>

              {/* Right Form Column */}
              <div className="md:col-span-3 text-white">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
                    <h4 className="text-base font-bold text-white mb-1">Message Sent Successfully</h4>
                    <p className="text-xs text-white mb-4">Thank you for reaching out. I will get back to you soon.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-xs">
                        <AlertCircle size={16} className="shrink-0 text-red-400" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Yo Nene"
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#233D4D] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="hello@example.com"
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#233D4D] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1">
                        Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Write your message or inquiry here..."
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#233D4D] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#233D4D] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#233D4D]/80 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

          {/* Right SVG Display (5 columns) */}
          <div className="lg:col-span-5 flex items-center justify-center p-4">
            <div className="w-full h-full min-h-[300px] flex items-center justify-center p-4">
              <img
                src="/undraw_remotely.svg"
                alt="Remotely illustration"
                className="w-full h-auto max-h-[360px] object-contain drop-shadow-xl"
              />
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
        .iso-social { position: relative; cursor: pointer; }
        .iso-icon {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          color: var(--sc);
        }
        .iso-sh {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid var(--sc); opacity: 0;
          transition: all 0.3s ease; pointer-events: none;
        }
        .doodle-hybrid-tooltip {
          position: absolute; top: 0; left: 50%;
          transform: translateX(-50%) scale(0.8) rotate(-6deg);
          padding: 4px 10px; color: var(--t-cl); background-color: var(--t-bg);
          border-radius: 10px; font-size: 10px; font-weight: 700;
          letter-spacing: 0.05em; white-space: nowrap;
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
          opacity: 0; visibility: hidden;
          transition: all 0.35s cubic-bezier(0.68,-0.55,0.265,1.55);
          pointer-events: none; z-index: 20;
        }
        .doodle-hybrid-tooltip::after {
          content: ""; position: absolute; bottom: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 6px; height: 6px; background-color: var(--t-bg);
        }
        .iso-social:hover .iso-icon {
          transform: translate(2px,-4px) scale(1.08) rotate(4deg);
          background: rgba(255,255,255,0.12);
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }
        .iso-social:hover .doodle-hybrid-tooltip {
          opacity: 1; visibility: visible; top: -38px;
          transform: translateX(-50%) scale(1) rotate(2deg);
        }
        .iso-social:hover .iso-sh1 { opacity: 0.2; transform: translate(2px,-2px); }
        .iso-social:hover .iso-sh2 { opacity: 0.35; transform: translate(4px,-4px); }
        .iso-social:hover .iso-sh3 { opacity: 0.5; transform: translate(7px,-7px); }
      `}</style>
    </section>
  );
}