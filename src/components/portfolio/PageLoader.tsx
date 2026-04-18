import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <motion.div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-3"
              >
                Neh<span className="text-primary">.</span>
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                className="h-[2px] bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs font-mono text-muted-foreground mt-4"
              >
                loading experience...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
