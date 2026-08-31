import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        {/* Additional portfolio sections go here */}
      </main>
    </div>
  );
};

export default Index;