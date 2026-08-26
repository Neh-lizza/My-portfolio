import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, FileText } from "lucide-react";

const HeroSection = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cvClicked, setCvClicked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const role = "secure, not just functional";

  // Typewriter loop for a single phrase
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && text === role) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
    } else {
      timer = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? role.slice(0, prev.length - 1)
            : role.slice(0, prev.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -120]);
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const rawOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
  const rawScale = useTransform(scrollY, [0, 400], [1, 0.92]);
  const smoothScale = useSpring(rawScale, { stiffness: 60, damping: 20 });

  const handleCvClick = () => {
    if (cvClicked) return;
    setCvClicked(true);
    // 👉 Replace YOUR_GOOGLE_DRIVE_FILE_ID with your actual file ID
    window.open(
      "https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view?usp=sharing",
      "_blank"
    );
    setTimeout(() => setCvClicked(false), 4200);
  };

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Neh-lizza/",
      color: "#e2e8f0",
      icon: (
        <svg viewBox="0 0 98 96" fill="currentColor" width="24" height="24">
          <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/neh-lizza/",
      color: "#0a66c2",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:nehhlizza@gmail.com",
      color: "#ea4335",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pattern-background"
    >
      {/* No floating shapes anymore — cleaned hero */}

      <motion.div
        style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* LEFT: Text + Info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-sm text-primary mb-6 tracking-wider">
                {"// full-stack engineer"}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
            >
              Software Engineer<span className="text-gradient">.</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl font-light">
                Systems Architect<span className="text-gradient">.</span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                I build{" "}
                <span className="font-mono text-primary font-medium">
                  {text}
                  <span className="animate-pulse">|</span>
                </span>
              </p>
              <p className="text-muted-foreground mt-3 max-w-xl lg:max-w-lg">
                The one you call when it has to be right.
              </p>
            </motion.div>

            {/* Name + Contact Info Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="glass rounded-xl px-6 py-4 text-center lg:text-left w-full max-w-md mx-auto lg:mx-0 mb-8"
            >
              <h3 className="text-lg font-bold text-foreground">
                Neh Lizza Ndikongsoh
              </h3>
              <p className="text-xs text-primary font-mono mb-3">
                Full-Stack Developer
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
                  <Mail size={12} className="text-primary" />
                  <a
                    href="mailto:nehhlizza@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    nehhlizza@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
                  <Phone size={12} className="text-primary" />
                  <span>+237 651 354 402</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
                  <MapPin size={12} className="text-primary" />
                  <span>Douala, Cameroon</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="#work"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary"
              >
                See My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-all"
              >
                Let's Talk
              </a>
            </motion.div>

            {/* Social Links + CV */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              {socials.map(({ label, href, color, icon }) => (
                <div
                  key={label}
                  className="iso-social"
                  style={{ "--sc": color } as React.CSSProperties}
                >
                  <span className="iso-sh iso-sh1" />
                  <span className="iso-sh iso-sh2" />
                  <span className="iso-sh iso-sh3" />
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <div className="iso-icon">{icon}</div>
                  </a>
                  <div className="iso-lbl">{label}</div>
                </div>
              ))}

              <div
                className={`cv-wrap${cvClicked ? " cv-on" : ""}`}
                onClick={handleCvClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleCvClick()}
              >
                <div className="cv-circle">
                  <svg
                    className="cv-ico cv-arr"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 19V5m0 14-4-4m4 4 4-4"
                    />
                  </svg>
                  <FileText className="cv-ico cv-doc" size={18} />
                  <div className="cv-sq" />
                </div>
                <p className="cv-txt cv-dl">Download CV</p>
                <p className="cv-txt cv-op">Opening!</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Only Profile Picture in a Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0 flex flex-col items-center"
          >
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl">
              <img
                src="/profile.jpg"
                alt="Neh Lizza Ndikongsoh"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.a>

      <style>{`
        /* ── PATTERN BACKGROUND (black with white dots) ── */
        .pattern-background {
          position: relative;
          overflow: hidden;
          background-color: #000000;
        }

        .pattern-background::before {
          content: "";
          position: absolute;
          inset: -100%;
          transform: rotate(45deg);
          transform-origin: center;
          background-color: #000000;
          opacity: 0.6;
          background-image: radial-gradient(circle, #ffffff 2.16px, transparent 2.16px);
          background-size: 27px 27px;
          pointer-events: none;
        }

        /* ── ISO SOCIALS ── */
        .iso-social { position: relative; cursor: pointer; }
        .iso-icon { width:44px;height:44px;border-radius:50%;display:flex;justify-content:center;align-items:center;background:hsla(222,40%,12%,0.6);border:1px solid hsla(215,25%,25%,0.45);backdrop-filter:blur(12px);transition:all 0.3s ease;box-shadow:inset 0 0 14px rgba(255,255,255,0.06),0 4px 10px rgba(0,0,0,0.25);color:var(--sc); }
        .iso-sh { position:absolute;inset:0;border-radius:50%;border:1px solid var(--sc);opacity:0;transition:all 0.3s ease;pointer-events:none; }
        .iso-lbl { opacity:0;position:absolute;top:-30px;left:50%;transform:translateX(-50%);font-size:10px;font-family:'JetBrains Mono',monospace;color:var(--sc);background:hsla(222,40%,10%,0.9);border:1px solid hsla(215,25%,25%,0.5);padding:3px 8px;border-radius:6px;white-space:nowrap;transition:all 0.3s ease;pointer-events:none; }
        .iso-social:hover .iso-icon { transform:translate(5px,-5px);box-shadow:inset 0 0 14px rgba(255,255,255,0.1),0 8px 22px rgba(0,0,0,0.3); }
        .iso-social:hover .iso-lbl { opacity:1;top:-36px; }
        .iso-social:hover .iso-sh1 { opacity:0.2;transform:translate(2px,-2px); }
        .iso-social:hover .iso-sh2 { opacity:0.35;transform:translate(5px,-5px); }
        .iso-social:hover .iso-sh3 { opacity:0.5;transform:translate(9px,-9px); }

        /* ── CV BUTTON ── */
        .cv-wrap { background:transparent;border:2px solid hsla(217,91%,60%,0.65);display:flex;align-items:center;border-radius:50px;width:178px;cursor:pointer;transition:all 0.4s ease;padding:5px;position:relative;user-select:none; }
        .cv-wrap::before { content:"";position:absolute;top:0;bottom:0;left:0;right:0;background:#fff;width:8px;height:8px;transition:all 0.4s ease;border-radius:100%;margin:auto;opacity:0;visibility:hidden; }
        .cv-circle { height:44px;width:44px;border-radius:50%;background:hsl(217,91%,60%);display:flex;justify-content:center;align-items:center;transition:all 0.4s ease;position:relative;overflow:hidden;flex-shrink:0; }
        .cv-circle::before { content:"";position:absolute;left:0;top:0;background:hsl(217,71%,44%);width:100%;height:0;transition:all 0.4s ease; }
        .cv-ico { color:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:all 0.3s ease;z-index:2; }
        .cv-arr { width:26px; }
        .cv-doc { opacity:0;visibility:hidden; }
        .cv-sq { aspect-ratio:1;width:14px;border-radius:2px;background:#fff;opacity:0;visibility:hidden;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:all 0.4s ease;z-index:2; }
        .cv-txt { font-size:14px;color:#fff;transition:all 0.4s ease;position:absolute;right:16px;bottom:13px;font-family:'Space Grotesk',sans-serif;font-weight:500;white-space:nowrap; }
        .cv-op { opacity:0;visibility:hidden; }
        .cv-on { width:58px;animation:cvDone 0.4s ease 3.5s forwards; }
        .cv-on::before { animation:cvRing 3s ease-in-out 0.4s forwards; }
        .cv-on .cv-circle { animation:cvPulse 1s forwards,cvHide 0.2s ease 3.5s forwards;rotate:180deg; }
        .cv-on .cv-circle::before { animation:cvFill 3s ease-in-out forwards; }
        .cv-on .cv-arr { opacity:0;visibility:hidden; }
        .cv-on .cv-doc { opacity:1!important;visibility:visible!important; }
        .cv-on .cv-sq { opacity:1;visibility:visible; }
        .cv-on .cv-dl { opacity:0;visibility:hidden; }
        .cv-on .cv-op { animation:cvShow 0.4s ease 3.5s forwards; }
        @keyframes cvPulse { 0%{scale:.95;box-shadow:0 0 0 0 rgba(255,255,255,0.7);} 70%{scale:1;box-shadow:0 0 0 14px rgba(255,255,255,0);} 100%{scale:.95;box-shadow:0 0 0 0 rgba(255,255,255,0);} }
        @keyframes cvFill { from{height:0;} to{height:100%;} }
        @keyframes cvRing { 0%{transform:rotate(-90deg) translate(27px) rotate(0);opacity:1;visibility:visible;} 99%{transform:rotate(270deg) translate(27px) rotate(270deg);opacity:1;visibility:visible;} 100%{opacity:0;visibility:hidden;} }
        @keyframes cvDone { 100%{width:168px;border-color:rgb(35,174,35);} }
        @keyframes cvHide { 100%{opacity:0;visibility:hidden;} }
        @keyframes cvShow { 100%{opacity:1;visibility:visible;right:52px;} }
      `}</style>
    </section>
  );
};

export default HeroSection;