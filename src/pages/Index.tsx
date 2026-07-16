import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { CTASection } from "@/components/home/CTASection";
import { SceneReveal } from "@/components/fx/SceneReveal";
import { StoryScrollSection } from "@/components/home/StoryScrollSection";
import { SEO } from "@/components/seo/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SEO
        title="SnapWeaz"
        description="SnapWeaz is a premium design and engineering company crafting exceptional digital experiences for startups, founders, and forward-thinking brands."
        path="/"
      />
      <Header />
      <main className="relative">
        <HeroSection />
        <StoryScrollSection />
        <SceneReveal>
          <ClientsSection />
        </SceneReveal>
        <SceneReveal>
          <ServicesSection />
        </SceneReveal>
        <SceneReveal>
          <AboutSection />
        </SceneReveal>
        <SceneReveal>
          <ProcessSection />
        </SceneReveal>
        <SceneReveal>
          <TestimonialsSection />
        </SceneReveal>
        <SceneReveal>
          <CTASection />
        </SceneReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
