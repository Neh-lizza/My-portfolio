import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Jean-Pierre M.",
    role: "CTO, JongoHub",
    text: "Neh's ability to architect complex systems while maintaining clean, readable code is exceptional. He delivered our entire real-time platform ahead of schedule with zero security incidents.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Product Manager, TechStart",
    text: "Working with Neh was a game-changer. He doesn't just write code — he understands the business problem and builds solutions that actually scale. Our deployment time dropped by 60%.",
    rating: 5,
  },
  {
    name: "David A.",
    role: "Founder, SecureFlow",
    text: "The Chrome extension Neh built for us handles sensitive auth flows flawlessly. His security-first mindset and attention to edge cases saved us from multiple potential vulnerabilities.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider">
            {"// what they say"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full glass rounded-2xl p-8 md:p-12 text-center relative"
              >
                <Quote
                  size={40}
                  className="text-primary/10 absolute top-6 left-6"
                />
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>
                <div>
                  <p className="font-bold text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
