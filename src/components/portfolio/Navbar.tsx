import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import useActiveSection from "@/hooks/useActiveSection";

const navLinks = [
  { label: "About",      href: "#about",      id: "about" },
  { label: "Work",       href: "#work",        id: "work" },
  { label: "Experience", href: "#experience",  id: "experience" },
  { label: "Contact",    href: "#contact",     id: "contact" },
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
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="text-xl font-bold text-gradient">
  Neh<span className="text-primary">.</span>
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
          className="text-foreground md:hidden"
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
            className="md:hidden glass border-t border-border overflow-hidden"
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
              
              Let's Talk
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;