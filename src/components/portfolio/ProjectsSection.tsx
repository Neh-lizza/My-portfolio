import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Rocket, Clock } from "lucide-react";

const featuredProjects = [
  {
    title: "JongoHub Platform",
    description:
      "Full-stack community & job board for African tech talent — multi-tenant auth, real-time messaging, job matching engine, and complete admin dashboard, shipped from scratch.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "Realtime"],
    challenge: "Secure multi-tenant auth + real-time everywhere",
    role: "Technical Lead & Full-Stack Engineer",
    results: "MVP shipped in 8 weeks · 1k+ concurrent users · 0 security incidents",
    link: "https://jongohub.com",
    github: "https://github.com/Neh-lizza/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Secure Auth Extension",
    description:
      "Browser extension with E2E encrypted auth, biometric login, automatic token rotation, and zero-trust architecture — built for teams handling sensitive data.",
    tags: ["Chrome APIs", "TypeScript", "Web Crypto", "OAuth 2.0"],
    challenge: "Zero-trust auth in a browser extension context",
    role: "Solo Developer",
    results: "500+ installs · 0 reported vulnerabilities · 4.8★ Chrome Web Store",
    link: "#",
    github: "https://github.com/Neh-lizza/",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    title: "DevOps Dashboard",
    description:
      "Live infrastructure dashboard with WebSocket metrics, intelligent alerting, log aggregation, and one-click deployment tracking across multiple environments.",
    tags: ["React", "Node.js", "WebSocket", "Docker", "PostgreSQL"],
    challenge: "Sub-second latency for real-time metrics at scale",
    role: "Full-Stack Developer",
    results: "99.9% uptime · 50ms avg response · 12 live services monitored",
    link: "#",
    github: "https://github.com/Neh-lizza/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

const upcomingProjects = [
  {
    title: "AI Code Reviewer",
    description: "LLM-powered PR review bot that catches security issues and suggests improvements.",
    tags: ["Python", "OpenAI", "GitHub API"],
    status: "In Progress",
  },
  {
    title: "Real-time Collab Editor",
    description: "Google Docs-style collaborative editor with CRDT-based conflict resolution.",
    tags: ["React", "Yjs", "WebSocket"],
    status: "Planning",
  },
];

type Tab = "featured" | "upcoming";

const ProjectsSection = () => {
  const [tab, setTab] = useState<Tab>("featured");

  return (
    <section id="work" className="py-14 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">
            {"// selected work"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { key: "featured" as Tab, label: "Featured", icon: Rocket },
              { key: "upcoming" as Tab, label: "Coming Soon", icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  tab === key
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "featured" ? (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500 group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Project image */}
                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
                    </div>

                    {/* Project info */}
                    <div className="flex-1 p-8 md:p-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          <a
                            href={project.link}
                            className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
                            aria-label="View project"
                          >
                            <ExternalLink size={16} />
                          </a>
                          <a
                            href={project.github}
                            className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
                            aria-label="View source"
                          >
                            <Github size={16} />
                          </a>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-5">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-1.5 text-sm">
                        <p>
                          <span className="text-primary font-medium">Challenge:</span>{" "}
                          <span className="text-muted-foreground">{project.challenge}</span>
                        </p>
                        <p>
                          <span className="text-primary font-medium">Role:</span>{" "}
                          <span className="text-muted-foreground">{project.role}</span>
                        </p>
                        <p>
                          <span className="text-primary font-medium">Results:</span>{" "}
                          <span className="text-muted-foreground">{project.results}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {upcomingProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-2xl p-8 border-dashed border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
                >
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono ${
                      project.status === "In Progress"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-accent/10 text-accent border border-accent/20"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <Clock size={20} className="text-primary/40 mb-4" />
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/50 text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
