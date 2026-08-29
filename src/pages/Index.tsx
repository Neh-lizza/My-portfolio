import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import PageLoader from "@/components/portfolio/PageLoader";
import { ScrollProgress, ScrollToTop } from "@/components/portfolio/ScrollElements";

const Index = () => {
  return (
    <PageLoader>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />
        <main>
          <HeroSection />
        </main>
      </div>
    </PageLoader>
  );
};

export default Index;
