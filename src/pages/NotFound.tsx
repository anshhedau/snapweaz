import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Giant 404 background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif text-[30vw] md:text-[25vw] text-foreground/[0.03] leading-none">
            404
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-wide relative z-10 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="text-sm text-accent uppercase tracking-[0.3em]">Page not found</span>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            Lost in the <span className="text-accent italic">void</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 section-dark rounded-full font-medium hover:bg-accent transition-colors duration-300 group"
          >
            Back to home
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
