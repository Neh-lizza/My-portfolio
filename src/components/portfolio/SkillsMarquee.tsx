import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Shield,
  Server,
  Globe,
  Smartphone,
  Terminal,
  GitBranch,
  Cpu,
  Cloud,
  Lock,
  Layers,
} from "lucide-react";

const skills = [
  { name: "React", icon: Code2 },
  { name: "TypeScript", icon: Terminal },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Server },
  { name: "Express", icon: Layers },
  { name: "PostgreSQL", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "Supabase", icon: Cloud },
  { name: "Docker", icon: Cpu },
  { name: "Git", icon: GitBranch },
  { name: "OAuth 2.0", icon: Lock },
  { name: "REST APIs", icon: Shield },
  { name: "React Native", icon: Smartphone },
  { name: "Tailwind CSS", icon: Code2 },
];

const SkillsMarquee = () => {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/50">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-primary tracking-wider text-center"
        >
          {"// tech stack"}
        </motion.p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...skills, ...skills].map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 px-5 py-3 glass rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300 cursor-default group"
            >
              <skill.icon size={16} className="group-hover:scale-110 transition-transform" />
              {skill.name}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
            <div
              key={`rev-${skill.name}-${i}`}
              className="flex items-center gap-2 px-5 py-3 glass rounded-xl text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 cursor-default group"
            >
              <skill.icon size={16} className="group-hover:scale-110 transition-transform" />
              {skill.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
