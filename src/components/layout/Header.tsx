import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Divisions", href: "/divisions" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo - Only image + tagline, no "SNAPWEAZ" text */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <img 
                src={logo} 
                alt="SnapWeaz Logo" 
                className="w-12 h-12 md:w-14 md:h-14 object-contain" 
              />
              <span className="hidden sm:block text-[11px] text-muted-foreground tracking-[0.2em] uppercase font-medium">
                Design · Engineering · Innovation
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${
                  location.pathname === link.href
                    ? "text-accent bg-accent/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 h-10 text-sm font-medium transition-all duration-300"
              asChild
            >
              <Link to="/contact">Start a project</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-foreground hover:bg-secondary rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-background pt-24"
            >
              <nav className="container-wide flex flex-col gap-1 pt-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 text-2xl font-serif transition-colors ${
                        location.pathname === link.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-8 pt-8 border-t border-border"
                >
                  <Button
                    size="lg"
                    className="w-full bg-foreground text-background rounded-full h-14 text-base font-medium"
                    asChild
                  >
                    <Link to="/contact">Start a project</Link>
                  </Button>
                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    info@snapweaz.in
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
