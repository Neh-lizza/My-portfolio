import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        {/* Additional portfolio sections go here */}
      </main>
    </div>
  );
};

export default Index;