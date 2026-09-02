import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Sparkles, MessageSquare, CheckCircle2 } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative py-20 flex items-center justify-center overflow-hidden hero-dot-bg"
      style={{ backgroundColor: "#000000" }}
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
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

        {/* Glass Container */}
        <div className="relative w-full rounded-2xl bg-white/[0.02] border border-white/15 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="md:col-span-2 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-medium">
               
                <span>Available for Projects</span>
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
                  <span>nehhlizza@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#233D4D]">
                    <MessageSquare size={16} />
                  </div>
                  <span>Response time: &lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="md:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">Message Sent Successfully</h4>
                  <p className="text-xs text-white mb-4">Thank you for reaching out. I will get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#233D4D] transition-all"
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
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#233D4D] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#233D4D] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#233D4D] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#233D4D]/80 transition-all cursor-pointer disabled:opacity-50"
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
}