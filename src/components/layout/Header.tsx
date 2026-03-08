import { useState, useEffect, useRef } from "react";
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
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Sliding pill indicator
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setPillStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    } else {
      setPillStyle(null);
    }
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/40 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="SnapWeaz Logo"
                className="w-11 h-11 md:w-12 md:h-12 object-contain"
              />
              <span className="hidden sm:block text-[10px] text-muted-foreground tracking-[0.25em] uppercase font-medium">
                Design · Engineering · Innovation
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation with sliding pill */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-0.5 relative">
            {/* Sliding pill */}
            <AnimatePresence>
              {pillStyle && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute top-0 h-full rounded-full bg-accent/8 border border-accent/15"
                  initial={false}
                  animate={{ left: pillStyle.left, width: pillStyle.width }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </AnimatePresence>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  data-active={isActive}
                  className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-300 rounded-full z-10 ${
                    isActive
                      ? "text-accent"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-full px-7 h-10 text-sm font-medium transition-all duration-500"
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
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
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
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 text-3xl font-serif transition-colors ${
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
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="mt-10 pt-8 border-t border-border"
                >
                  <Button
                    size="lg"
                    className="w-full bg-foreground text-background hover:bg-accent rounded-full h-14 text-base font-medium"
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
