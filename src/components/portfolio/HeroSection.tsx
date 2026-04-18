import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, FileText } from "lucide-react";

const roles = [
  "secure systems",
  "scalable platforms",
  "real-time applications",
  "production-grade APIs",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cvClicked, setCvClicked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.slice(0, text.length + 1));
        if (text.length === currentRole.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setText(currentRole.slice(0, text.length - 1));
        if (text.length === 0) { setIsDeleting(false); setRoleIndex((prev) => (prev + 1) % roles.length); }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

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
    // 👉 Replace YOUR_GOOGLE_DRIVE_FILE_ID with your actual CV file ID from Google Drive
    window.open("https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view?usp=sharing", "_blank");
    setTimeout(() => setCvClicked(false), 4200);
  };

  const socials = [
    {
      label: "GitHub", href: "https://github.com/Neh-lizza/", color: "#e2e8f0",
      icon: <svg viewBox="0 0 98 96" fill="currentColor" width="24" height="24"><path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>,
    },
    {
      label: "LinkedIn", href: "https://www.linkedin.com/in/neh-lizza/", color: "#0a66c2",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      label: "Email", href: "mailto:nehhlizza@gmail.com", color: "#ea4335",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>,
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center hero-grid overflow-hidden">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-[15%] w-16 h-16 border-2 border-primary/20 rounded-lg" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[60%] left-[8%] w-12 h-12 border-2 border-accent/20" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-[30%] right-[10%] w-6 h-6 rounded-full bg-primary/10" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[35%] left-[5%] w-3 h-3 rounded-full bg-accent/20" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <motion.div style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }} className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-sm text-primary mb-6 tracking-wider">{"// full-stack engineer"}</p>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
              Software Engineer<span className="text-gradient">.</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl font-light">Systems Builder<span className="text-gradient">.</span></span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-8">
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                I build{" "}<span className="font-mono text-primary font-medium">{text}<span className="animate-pulse">|</span></span>
              </p>
              <p className="text-muted-foreground mt-3 max-w-xl lg:max-w-lg">Production-grade platforms that solve real problems — not just interfaces.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <a href="#work" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary">See My Work</a>
              <a href="#contact" className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-all">Let's Talk</a>
            </motion.div>

            {/* Socials + CV */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              {socials.map(({ label, href, color, icon }) => (
                <div key={label} className="iso-social" style={{ "--sc": color } as React.CSSProperties}>
                  <span className="iso-sh iso-sh1" />
                  <span className="iso-sh iso-sh2" />
                  <span className="iso-sh iso-sh3" />
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <div className="iso-icon">{icon}</div>
                  </a>
                  <div className="iso-lbl">{label}</div>
                </div>
              ))}

              {/* CV button */}
              <div className={`cv-wrap${cvClicked ? " cv-on" : ""}`} onClick={handleCvClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleCvClick()}>
                <div className="cv-circle">
                  <svg className="cv-ico cv-arr" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
                  </svg>
                  <FileText className="cv-ico cv-doc" size={18} />
                  <div className="cv-sq" />
                </div>
                <p className="cv-txt cv-dl">Download CV</p>
                <p className="cv-txt cv-op">Opening!</p>
              </div>
            </motion.div>
          </div>

          {/* Right — Rotating Gradient Border Card */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative flex-shrink-0 flex flex-col items-center gap-6">

            <div className="rgb-wrap">
              {/* The spinning conic gradient — creates the animated border glow */}
              <div className="rgb-spin" />
              {/* Card content sits on top */}
              <div className="rgb-inner">
                <div className="rgb-badge">Full-Stack Engineer</div>
                <div className="rgb-initials">NL</div>
                <div className="rgb-name">Neh Lizza Ndikongsoh</div>
                <div className="rgb-sub">Systems Builder · Douala 🇨🇲</div>
                <div className="rgb-divider" />
                <div className="rgb-pills">
                  {["React","Node.js","TypeScript","PostgreSQL","Security"].map(t => (
                    <span key={t} className="rgb-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="glass rounded-xl px-6 py-4 text-center w-full max-w-xs">
              <h3 className="text-lg font-bold text-foreground">Neh Lizza Ndikongsoh</h3>
              <p className="text-xs text-primary font-mono mb-2">Full-Stack Developer</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><Mail size={12} className="text-primary" /><span>nehhlizza@gmail.com</span></div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><Phone size={12} className="text-primary" /><span>+237 651 354 402</span></div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><MapPin size={12} className="text-primary" /><span>Douala, Cameroon</span></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors">
        <ArrowDown size={20} className="animate-bounce" />
      </motion.a>

      <style>{`
        /* ── ROTATING GRADIENT BORDER CARD ── */
        .rgb-wrap {
          position: relative;
          width: 280px;
          border-radius: 22px;
          padding: 2px;
          overflow: hidden;
          /* Outer ambient glow */
          box-shadow: 0 0 40px -8px hsla(217,91%,60%,0.25), 0 32px 60px rgba(0,0,0,0.5);
        }
        /* The spinning conic that forms the animated border */
        .rgb-spin {
          position: absolute;
          inset: -55%;
          background: conic-gradient(
            from 0deg,
            transparent   0deg,
            transparent  55deg,
            hsl(217,91%,60%)  90deg,
            hsl(262,83%,68%) 125deg,
            hsl(190,90%,62%) 148deg,
            transparent  178deg,
            transparent  360deg
          );
          animation: rgbSpin 3s linear infinite;
          border-radius: 50%;
        }
        @keyframes rgbSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* Hover: widen the light sweep */
        .rgb-wrap:hover .rgb-spin {
          background: conic-gradient(
            from 0deg,
            transparent   0deg,
            transparent  40deg,
            hsl(217,91%,65%)  80deg,
            hsl(262,83%,72%) 130deg,
            hsl(190,90%,65%) 160deg,
            transparent  200deg,
            transparent  360deg
          );
          filter: blur(0.5px);
        }
        .rgb-inner {
          position: relative;
          z-index: 2;
          background: hsl(222,47%,7%);
          border-radius: 20px;
          padding: 28px 22px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .rgb-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: hsl(217,91%,65%);
          background: hsla(217,91%,60%,0.1);
          border: 1px solid hsla(217,91%,60%,0.2);
          padding: 4px 12px;
          border-radius: 20px;
        }
        .rgb-initials {
          font-size: 82px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -4px;
          background: linear-gradient(135deg, hsl(217,91%,72%), hsl(262,83%,72%), hsl(190,90%,68%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 18px hsla(217,91%,60%,0.35));
        }
        .rgb-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          text-align: center;
        }
        .rgb-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          color: hsla(215,20%,52%,1);
          letter-spacing: 0.3px;
          text-align: center;
        }
        .rgb-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, hsla(217,91%,60%,0.25), transparent);
          margin: 2px 0;
        }
        .rgb-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: center;
        }
        .rgb-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          padding: 3px 8px;
          border-radius: 6px;
          background: hsla(222,40%,13%,0.9);
          border: 1px solid hsla(215,25%,20%,0.7);
          color: rgba(255,255,255,0.45);
        }

        /* ── ISO SOCIALS ── */
        .iso-social { position:relative; cursor:pointer; }
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
