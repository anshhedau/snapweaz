import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
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
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="container-wide section-padding border-b border-background/10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1]">
            Ready to build something{" "}
            <span className="text-accent">meaningful</span>?
          </h2>
          <p className="text-lg text-background/60 mb-10 max-w-2xl leading-relaxed">
            Let's create experiences that inspire, products that scale, and
            brands that resonate. Your vision, our craft.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground rounded-full font-medium hover:bg-accent hover:text-background transition-all duration-300 group"
          >
            Start a conversation
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>

      {/* Links Grid */}
      <div className="container-wide py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="SnapWeaz" className="w-12 h-12 object-contain" />
            </div>
            <p className="text-background/50 text-sm mb-8 max-w-xs leading-relaxed whitespace-nowrap">
              Design · Engineering · Innovation
            </p>
            <div className="space-y-3 text-sm text-background/50">
              <a
                href="mailto:info@snapweaz.in"
                className="flex items-center gap-2 hover:text-accent transition-colors duration-300"
              >
                <Mail size={16} />
                info@snapweaz.in
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                India · Global
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium mb-5 text-background/40 uppercase tracking-[0.15em]">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-medium mb-5 text-background/40 uppercase tracking-[0.15em]">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium mb-5 text-background/40 uppercase tracking-[0.15em]">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-medium mb-5 text-background/40 uppercase tracking-[0.15em]">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/60 hover:text-accent transition-colors duration-300 inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-wide py-6 border-t border-background/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/40">
          <p>© SnapWeaz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
