import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import SkillsMarquee from "@/components/portfolio/SkillsMarquee";
import AboutSection from "@/components/portfolio/AboutSection";
import StrategySection from "@/components/portfolio/StrategySection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CodeShowcase from "@/components/portfolio/CodeShowcase";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import PageLoader from "@/components/portfolio/PageLoader";
import { ScrollProgress, ScrollToTop } from "@/components/portfolio/ScrollElements";

const Index = () => {
  return (
    <PageLoader>
      <div className="min-h-screen bg-background text-foreground scroll-smooth">
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />
        <main>
          <HeroSection />
          <SkillsMarquee />
          <AboutSection />
          <StrategySection />
          <ProjectsSection />
          <CodeShowcase />
          <TestimonialsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageLoader>
  );
};

export default Index;
