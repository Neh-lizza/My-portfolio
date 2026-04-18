import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Code2, Rocket, ArrowRight, Terminal } from "lucide-react";

const strategies = [
  {
    icon: Lightbulb,
    title: "Planning & Strategy",
    description: "We'll collaborate to map out your project's goals, architecture, and key milestones.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5",
  },
  {
    icon: Terminal,
    title: "Development & Build",
    description: "From architecture to deployment — clean code, modern technologies, zero shortcuts.",
    color: "text-accent",
    bgColor: "from-accent/10 to-accent/5",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description: "Smooth deployment with CI/CD, monitoring, and ongoing support as your project grows.",
    color: "text-primary",
    bgColor: "from-primary/10 to-accent/5",
  },
];

const StrategySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      {/* Background shapes */}
      <motion.div
        animate={{ rotate: 45 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -top-20 -right-20 w-40 h-40 border border-primary/5 rounded-3xl"
      />
      <motion.div
        animate={{ rotate: -45 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -bottom-10 -left-10 w-32 h-32 border border-accent/5 rounded-2xl"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">
            {"// my process"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-gradient">Strategy</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {strategies.map((strategy, i) => (
            <motion.div
              key={strategy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative glass rounded-2xl p-8 cursor-pointer group overflow-hidden transition-all duration-500 hover:glow-primary"
            >
              {/* Hover gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                className={`absolute inset-0 bg-gradient-to-b ${strategy.bgColor} transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className={`${strategy.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <strategy.icon size={32} />
                </div>
                <span className="font-mono text-xs text-muted-foreground mb-3 block">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
                  {strategy.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {strategy.description}
                </p>
                <ArrowRight
                  size={16}
                  className={`${strategy.color} transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
