import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDismissOnPointerDown } from "@/hooks/use-dismiss-on-pointer-down";
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
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dismissRefs = useMemo(() => [mobileMenuRef, mobileMenuTriggerRef], []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useDismissOnPointerDown({
    enabled: isMobileMenuOpen,
    refs: dismissRefs,
    onDismiss: closeMobileMenu,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "py-2.5 backdrop-blur-2xl bg-background/55 border-b border-white/10 shadow-[0_8px_32px_-12px_hsl(var(--accent)/0.25)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="SnapWeaz Logo"
                className="h-11 w-11 object-contain md:h-12 md:w-12"
              />
            </motion.div>
          </Link>

          <nav className="hidden items-center gap-0.5 rounded-full px-1.5 py-1.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 ${
                  location.pathname === link.href
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-foreground/70 hover:bg-background/50 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <Button
              size="sm"
              className="h-10 rounded-full bg-accent px-7 text-[13px] font-medium text-accent-foreground shadow-md transition-all duration-500 hover:bg-accent hover:shadow-xl"
              asChild
            >
              <Link to="/contact">Start a project</Link>
            </Button>
          </div>

          <button
            ref={mobileMenuTriggerRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl lg:hidden"
          >
            <motion.div
              ref={mobileMenuRef}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="container-wide pt-24"
            >
              <nav className="flex flex-col gap-1 rounded-[2rem] border border-border/60 bg-background/90 px-6 py-6 shadow-xl">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-4 font-serif text-2xl transition-colors ${
                        location.pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"
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
                  className="mt-8 border-t border-border pt-8"
                >
                  <Button
                    size="lg"
                    className="h-14 w-full rounded-full bg-accent text-base font-medium text-accent-foreground"
                    asChild
                  >
                    <Link to="/contact">Start a project</Link>
                  </Button>
                  <p className="mt-6 text-center text-sm text-muted-foreground">info@snapweaz.com</p>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
