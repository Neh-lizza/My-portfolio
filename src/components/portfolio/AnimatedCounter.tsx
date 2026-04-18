import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

const AnimatedCounter = ({ value, className }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  // Extract numeric part
  const numMatch = value.match(/^(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = numMatch ? value.slice(numMatch[0].length) : value;
  const isNumeric = numMatch !== null;

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * num);
      setDisplay(String(start));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, num, isNumeric]);

  if (!isNumeric) {
    return (
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {value}
      </motion.p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {display}{suffix}
    </p>
  );
};

export default AnimatedCounter;
