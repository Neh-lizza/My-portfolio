import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Rocket, Clock, Smile } from "lucide-react";

const featuredProjects = [
  {
    title: "Back2U Platform",
    description:
      "Full-stack lost-and-found platform that connects people who lost items with those who found them, intelligent matching system, secure user communication, verification flow, and admin moderation dashboard, built from scratch.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "Realtime"],
    challenge:
      "Accurate item matching + secure user verification to prevent false claims",
    role: "Full-Stack Engineer",
    results:
      "MVP in progress · Designed for scalable community adoption · Trust-focused system architecture",
    link: "#",
    github: "https://github.com/Neh-lizza/back2u",
    image: "/b2u.jpg",
  },
  {
    title: "FixMate Platform",
    description:
      "Lightweight service marketplace connecting users to trusted local professionals with instant WhatsApp contact and zero friction.",
    tags: ["Next.js", "JavaScript", "Tailwind CSS", "EmailJS", "WhatsApp API"],
    challenge:
      "Fast service discovery with no-login experience while maintaining trust",
    role: "Full-Stack Engineer",
    results:
      "Deployed MVP · Reduced user friction · Instant service access via WhatsApp",
    link: "#",
    github: "https://github.com/Neh-lizza/fixmate",
    image: "/fixmate.jpg",
  },
  {
    title: "DevOps Dashboard",
    description:
      "Live infrastructure dashboard with real-time metrics, alerts, and deployment tracking across services.",
    tags: ["React", "Node.js", "WebSocket", "Docker", "PostgreSQL"],
    challenge: "Sub-second latency for real-time system monitoring",
    role: "Full-Stack Developer",
    results:
      "99.9% uptime · 50ms response time · Multi-service monitoring",
    link: "#",
    github: "https://github.com/Neh-lizza/devops-dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

const upcomingProjects = [
  {
    title: "AI Code Reviewer",
    description:
      "LLM-powered tool that reviews pull requests, detects security issues, and suggests improvements automatically.",
    tags: ["Python", "OpenAI", "GitHub API"],
    status: "In Progress",
    image: "/images/ai-code-reviewer.jpg",
  },
  {
    title: "Real-time Collaborative Editor",
    description:
      "Google Docs-style editor with CRDT-based conflict-free syncing.",
    tags: ["React", "Yjs", "WebSocket"],
    status: "Planning",
    image: "/images/collab-editor.jpg",
  },
];

const conceptProjects = [
  {
    title: "Back2U Feature Phone Companion",
    description:
      "A lightweight feature-phone inspired system designed for offline-first access, helping users report and track lost items even in low connectivity regions.",
    tags: ["Concept", "UI/UX", "Offline Systems"],
  },
  {
    title: "Mini UI Experiments",
    description:
      "Creative frontend experiments exploring animations, micro-interactions, and interface ideas.",
    tags: ["React", "Framer Motion", "CSS"],
  },
];

type Tab = "featured" | "upcoming" | "concept";

const ProjectsSection = () => {
  const [tab, setTab] = useState<Tab>("featured");

  return (
    <section id="work" className="py-14 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div className="mb-8">
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">
            {"// selected work"}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Projects <span className="text-gradient">Showcase</span>
          </h2>

          {/* TABS */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "featured" as Tab, label: "Featured", icon: Rocket },
              { key: "upcoming" as Tab, label: "Coming Soon", icon: Clock },
              { key: "concept" as Tab, label: "Concepts", icon: Smile },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === key
                    ? "bg-primary text-white"
                    : "glass text-muted-foreground hover:text-white"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* FEATURED */}
          {tab === "featured" && (
            <motion.div key="featured" className="space-y-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.title}
                  className="glass rounded-2xl overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 h-48 md:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">
                        {project.title}
                      </h3>

                      <div className="flex gap-2">
                        <a
                          href={project.link}
                          className="p-2 rounded-lg glass hover:text-primary"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <a
                          href={project.github}
                          className="p-2 rounded-lg glass hover:text-primary"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-secondary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm">
                      <span className="text-primary">Challenge:</span>{" "}
                      {project.challenge}
                    </p>
                    <p className="text-sm">
                      <span className="text-primary">Role:</span>{" "}
                      {project.role}
                    </p>
                    <p className="text-sm">
                      <span className="text-primary">Results:</span>{" "}
                      {project.results}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* UPCOMING */}
          {tab === "upcoming" && (
            <motion.div key="upcoming" className="grid md:grid-cols-2 gap-6">
              {upcomingProjects.map((project) => (
                <div key={project.title} className="glass p-6 rounded-2xl">
                  <h3 className="font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <span className="text-xs text-primary mt-2 inline-block">
                    {project.status}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* CONCEPTS */}
          {tab === "concept" && (
            <motion.div key="concept" className="grid md:grid-cols-2 gap-6">
              {conceptProjects.map((project) => (
                <div key={project.title} className="glass p-6 rounded-2xl">
                  <Smile className="text-primary mb-3" size={18} />
                  <h3 className="font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;