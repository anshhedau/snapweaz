import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WeazAI } from "@/components/weaz/WeazAI";
import { GoogleOneTap } from "@/components/auth/GoogleOneTap";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Divisions from "./pages/Divisions";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Founder from "./pages/Founder";
import Certificate from "./pages/Certificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import { getPageVisibility } from "@/lib/content";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

// Lazy-load heavy WebGL particle field so it does not block LCP.
const ParticleField = lazy(() =>
  import("@/components/fx/ParticleField").then((m) => ({ default: m.ParticleField })),
);

const queryClient = new QueryClient();

const App = () => {
  const { founder_enabled } = getPageVisibility();
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SmoothScroll />
        <Suspense fallback={null}><ParticleField /></Suspense>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {founder_enabled && <Route path="/founder" element={<Founder />} />}
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/certificate/:id" element={<Certificate />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WeazAI />
        <GoogleOneTap />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
