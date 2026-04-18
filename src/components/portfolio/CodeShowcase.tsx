import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";

const codeLines = [
  { text: "const", color: "text-accent" },
  { text: " buildSecureAPI", color: "text-primary" },
  { text: " = ", color: "text-muted-foreground" },
  { text: "async", color: "text-accent" },
  { text: " () => {", color: "text-foreground" },
];

const codeBlock = `const buildSecureAPI = async () => {
  const auth = await initAuth({
    strategy: "jwt",
    encryption: "AES-256-GCM",
    rotation: true,
  });

  const db = createPool({
    ssl: true,
    maxConnections: 20,
    idleTimeout: 30_000,
  });

  return createServer({ auth, db })
    .middleware(rateLimiter(100))
    .middleware(cors(origins))
    .listen(3000);
};

// ✅ 0 vulnerabilities
// ✅ 99.9% uptime
// ✅ <50ms response time`;

const metrics = [
  { label: "Response Time", value: "47ms", bar: 15 },
  { label: "Uptime", value: "99.97%", bar: 99 },
  { label: "Security Score", value: "A+", bar: 100 },
  { label: "Test Coverage", value: "94%", bar: 94 },
];

const CodeShowcase = () => {
  const [copied, setCopied] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-grid opacity-50" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">
            {"// what sets me apart"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Code That <span className="text-gradient">Speaks</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            I don't just build — I engineer. Clean architecture, bulletproof security, and performance that scales.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Code editor */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 glass rounded-2xl overflow-hidden"
          >
            {/* Editor header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/40" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  secure-api.ts
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Code content */}
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                {codeBlock.split("\n").map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex"
                  >
                    <span className="text-muted-foreground/40 w-8 text-right mr-4 select-none text-xs">
                      {i + 1}
                    </span>
                    <span className={
                      line.includes("const") || line.includes("async") || line.includes("return") || line.includes("await")
                        ? ""
                        : line.startsWith("//")
                        ? "text-primary/70"
                        : "text-foreground/80"
                    }>
                      {line.split(/(const|async|await|return|true|false|\d+)/g).map((part, j) => {
                        if (["const", "async", "await", "return"].includes(part))
                          return <span key={j} className="text-accent">{part}</span>;
                        if (["true", "false"].includes(part))
                          return <span key={j} className="text-primary">{part}</span>;
                        if (/^\d+$/.test(part))
                          return <span key={j} className="text-primary">{part}</span>;
                        return <span key={j}>{part}</span>;
                      })}
                    </span>
                  </motion.div>
                ))}
              </code>
            </pre>
          </motion.div>

          {/* Live metrics panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Terminal size={16} className="text-primary" />
                <span className="text-sm font-mono text-muted-foreground">live metrics</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              <div className="space-y-4">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`transition-all duration-500 ${
                      i === activeMetric ? "scale-105" : "opacity-70"
                    }`}
                  >
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className={`font-mono font-medium ${
                        i === activeMetric ? "text-primary" : "text-foreground"
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                        className={`h-full rounded-full ${
                          i === activeMetric
                            ? "bg-gradient-to-r from-primary to-accent"
                            : "bg-primary/40"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick terminal output */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-mono text-muted-foreground mb-3">$ npm run audit</p>
              <div className="space-y-1 text-xs font-mono">
                <p className="text-primary">✓ 0 vulnerabilities found</p>
                <p className="text-primary">✓ All dependencies up to date</p>
                <p className="text-primary">✓ No deprecated packages</p>
                <p className="text-muted-foreground mt-2">audited 847 packages in 2.1s</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;
