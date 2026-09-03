import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import useActiveSection from "@/hooks/useActiveSection";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0B0D12]/80 backdrop-blur-md border-b border-white/10"
    >
      {/* Background SVG Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="navbarNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#navbarNoise)" />
        </svg>
      </div>

      {/* Dotted Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="text-xl font-bold text-white flex items-center gap-0.5">
          <span style={{ color: "#233D4D" }}>Neh.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1" style={{ position: "relative" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "relative",
                padding: "0.38em 1.1em",
                borderRadius: 8,
                fontSize: "0.875rem",
                fontWeight: activeSection === link.id ? 600 : 400,
                color: activeSection === link.id
                  ? "#ffffff"
                  : hoveredId === link.id
                  ? "#ffffff"
                  : "rgba(255,255,255,0.55)",
                textDecoration: "none",
                transition: "color 0.2s",
                zIndex: 2,
              }}
            >
              {/* Sliding hover background pill */}
              {hoveredId === link.id && (
                <motion.span
                  layoutId="nav-hover-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.09)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    zIndex: -1,
                  }}
                />
              )}

              {/* Active section gradient underline */}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-active-line"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "12%",
                    right: "12%",
                    height: 2,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, hsl(217,91%,60%), hsl(262,83%,68%))",
                    boxShadow: "0 0 8px hsla(217,91%,60%,0.7)",
                  }}
                />
              )}

              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground md:hidden relative z-10"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0D12]/95 backdrop-blur-md border-t border-white/10 overflow-hidden relative z-10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors ${
                    activeSection === link.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;