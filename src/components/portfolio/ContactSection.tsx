import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // Uses Web3Forms — free, no backend needed, delivers to your email
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "51f57738-4a36-470b-9c62-f87c2e722e2a", /* 👉 web3forms.com/create → use nehhlizza@gmail.com */ // 👉 Get free key: web3forms.com/create → enter nehhlizza@gmail.com, // 👈 replace with key from web3forms.com
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Contact Form",
          message: formData.message,
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setErrorMsg("Something went wrong. Please email me directly at nehhlizza@gmail.com");
      setStatus("error");
    }
  };

  const contactLinks = [
    { icon: Mail, label: "nehhlizza@gmail.com", href: "mailto:nehhlizza@gmail.com" },
    { icon: Phone, label: "+237 651 354 402", href: "tel:+237651354402" },
    { icon: MapPin, label: "Douala, Cameroon", href: "#" },
    { icon: Github, label: "github.com/Neh-lizza", href: "https://github.com/Neh-lizza/" },
    { icon: Linkedin, label: "linkedin.com/in/neh-lizza", href: "https://www.linkedin.com/in/neh-lizza/" },
  ];

  return (
    <section id="contact" className="py-14 md:py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">{"// get in touch"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
  Got something that needs to be <span className="text-gradient">built right?</span>
</h2>
         <p className="text-muted-foreground">
  I'm selective about what I take on which means if we talk, I'm already interested.
</p> </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Always open to interesting projects, freelance work, or just a good conversation about tech. Reach out! I respond within 24 hours.
            </p>
            {contactLinks.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon size={15} className="text-primary" />
                </div>
                <span>{label}</span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-primary mb-1.5">Name *</label>
                  <input
                    type="text" placeholder="Your name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-primary mb-1.5">Email *</label>
                  <input
                    type="email" placeholder="your@email.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-primary mb-1.5">Subject</label>
                <input
                  type="text" placeholder="Project inquiry, collaboration..." value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-primary mb-1.5">Message *</label>
                <textarea
                  placeholder="Tell me about your project..." rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
                  required
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle size={15} />{errorMsg}
                </div>
              )}

              {status === "success" ? (
                <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-primary/10 text-primary font-medium">
                  <CheckCircle size={17} /> Message sent! I'll get back to you soon.
                </div>
              ) : (
                <button
                  type="submit" disabled={status === "loading"}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <Send size={15} />
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
