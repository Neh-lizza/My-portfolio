import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent z-[60]"
    />
  );
};

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
          style={{ width: 48, height: 48 }}
        >
          {/* Rotating gradient border wrapper */}
          <div style={{
            position: "relative",
            width: 48,
            height: 48,
            borderRadius: 14,
            padding: 2,
            overflow: "hidden",
            cursor: "pointer",
          }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* Spinning conic gradient border */}
            <div style={{
              position: "absolute",
              inset: "-60%",
              background: "conic-gradient(from 0deg, transparent 0deg, transparent 50deg, hsl(217,91%,60%) 90deg, hsl(262,83%,70%) 130deg, hsl(190,90%,60%) 155deg, transparent 190deg, transparent 360deg)",
              animation: "scrollBtnSpin 2.5s linear infinite",
              borderRadius: "50%",
            }} />
            {/* Inner button */}
            <div style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              borderRadius: 12,
              background: "hsl(222,47%,7%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "hsl(217,91%,65%)",
              transition: "background 0.2s",
            }}
              className="hover:bg-primary/20"
            >
              <ArrowUp size={18} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
