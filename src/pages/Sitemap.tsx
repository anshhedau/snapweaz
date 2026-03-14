import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "Main",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Divisions", href: "/divisions" },
      { name: "Work", href: "/work" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Content",
    links: [
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Founder", href: "/founder" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  },
];

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="container-wide relative z-10 pb-16 md:pb-20 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Navigation</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl leading-[0.95] mb-4">
                Site<span className="text-accent italic">map</span>
              </h1>
              <p className="text-lg text-background/60 max-w-lg">
                All pages at a glance.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {sections.map((section, sIdx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.1 }}
                >
                  <h2 className="font-serif text-2xl text-foreground mb-6 pb-3 border-b border-border/30">
                    {section.title}
                  </h2>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-muted-foreground hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 group"
                        >
                          {link.name}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
