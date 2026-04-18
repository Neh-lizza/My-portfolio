import { motion } from "framer-motion";

const experiences = [
  {
    period: "2024 — Present",
    title: "Technical Project Lead — Internship",
    company: "JongoHub • Douala / Remote",
    description:
      "Led architecture, security model, real-time features and team delivery for community platform.",
  },
  {
    period: "2023",
    title: "Freelance Full-Stack Developer",
    company: "Remote",
    description:
      "Delivered responsive, performant web applications with strong focus on accessibility and SEO.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-14 md:py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">
            {"// career path"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-8 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[3.5px] ring-4 ring-background" />

                <span className="font-mono text-xs text-primary mb-2 block">
                  {exp.period}
                </span>
                <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
