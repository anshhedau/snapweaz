import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Founder", href: "/founder" },
  ],
  services: [
    { name: "Design", href: "/services#design" },
    { name: "Development", href: "/services#development" },
    { name: "Branding", href: "/services#branding" },
    { name: "Strategy", href: "/services#strategy" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com/snapweaz.in" },
    { name: "LinkedIn", href: "https://linkedin.com/company/snapweaz" },
    { name: "Twitter", href: "https://twitter.com/snapweaz" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden noise-overlay">
      {/* Orb */}
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />

      {/* Large CTA */}
      <div className="container-wide py-24 md:py-32 lg:py-40 border-b border-background/10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-accent" />
            <span className="text-sm text-accent uppercase tracking-[0.3em]">Let's collaborate</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 leading-[0.95] max-w-4xl">
            Ready to build something{" "}
            <span className="text-accent italic">meaningful</span>?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 glass-card-dark rounded-full font-medium hover:bg-accent/10 hover:border-accent/30 transition-all duration-500 group text-lg text-background"
          >
            Start a conversation
            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Links Grid */}
      <div className="container-wide py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="SnapWeaz" className="w-10 h-10 object-contain" />
            </div>
            <p className="text-background/30 text-[10px] uppercase tracking-[0.15em] mb-8 whitespace-nowrap">
              Design · Engineering · Innovation
            </p>
            <div className="space-y-3 text-sm text-background/30">
              <a href="mailto:info@snapweaz.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} />info@snapweaz.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} />India · Global
              </div>
            </div>
          </div>

          {[
            { title: "Company", links: footerLinks.company, internal: true },
            { title: "Services", links: footerLinks.services, internal: true },
            { title: "Legal", links: footerLinks.legal, internal: true },
            { title: "Connect", links: footerLinks.social, internal: false },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-medium mb-6 text-background/20 uppercase tracking-[0.2em]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {col.internal ? (
                      <Link to={link.href} className="text-sm text-background/40 hover:text-accent transition-colors duration-300">
                        {link.name}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-background/40 hover:text-accent transition-colors duration-300 inline-flex items-center gap-1"
                      >
                        {link.name}<ArrowUpRight size={10} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-wide py-6 border-t border-background/10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/20">
          <p>©SnapWeaz. All rights reserved.</p>
          <p>Designed with precision and care.</p>
        </div>
      </div>
    </footer>
  );
};
