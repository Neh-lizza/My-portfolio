import { motion } from "framer-motion";
import { Shield, Zap, Code2, Server, BookOpen, Piano } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: "4+", label: "Production systems", icon: Server },
  { value: "Tech Lead", label: "JongoHub", icon: Code2 },
  { value: "Secure Auth", label: "Chrome Extension", icon: Shield },
  { value: "100%", label: "Uptime mindset", icon: Zap },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-14 md:py-20 relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-20 h-20 border border-primary/5 rounded-full hidden md:block"
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm text-primary mb-3 tracking-wider">
              {"// about me"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hey, I'm <span className="text-gradient">Neh Lizza</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Full-stack engineer and technical lead from{" "}
                <span className="text-foreground font-medium">Cameroon</span>.
              </p>
              <p>
                I specialize in building reliable and maintainable systems 
                systems where reliability matters more than appearance.
              
                Powered by <span className="text-primary font-medium">curiosity</span>,{" "}
                <span className="text-primary font-medium">consistency</span>, and{" "}
                <span className="text-primary font-medium">obsession with reliability</span>.
              </p>
              <p>
                When I'm not building, I'm reading, or finding new ways to think about old problems.
  I work best with people who care about what they ship. I like having my perspectives challenged.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              {[
                { icon: BookOpen, label: "Blogs" },
                { icon: Piano, label: "Music" },
                { icon: Code2, label: "Open Source" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground"
                >
                  <item.icon size={12} />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="glass rounded-xl p-6 hover:glow-primary transition-all duration-500 group"
              >
                <stat.icon
                  size={20}
                  className="text-primary mb-3 group-hover:scale-110 transition-transform"
                />
                <AnimatedCounter value={stat.value} className="text-2xl font-bold text-foreground" />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutSection;
