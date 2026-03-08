import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Rocket, Cloud, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const divisions = [
  {
    id: "design", icon: Palette, name: "SnapWeaz Design", tagline: "Where creativity takes form",
    description: "Visual experiences that captivate, communicate, and convert.",
    services: ["Brand Identity", "UI/UX Design", "Motion Graphics", "Campaign Design", "Illustration", "Packaging"],
    number: "01",
  },
  {
    id: "software", icon: Code2, name: "SnapWeaz Software", tagline: "Engineering excellence",
    description: "Robust, scalable software using modern tech and best practices.",
    services: ["Web Applications", "Mobile Apps", "Custom Software", "API Development", "E-commerce", "SaaS Platforms"],
    number: "02",
  },
  {
    id: "ventures", icon: Rocket, name: "SnapWeaz Ventures", tagline: "Launching tomorrow's leaders",
    description: "Partnering with founders to transform ideas into successful products.",
    services: ["Startup Incubation", "MVP Development", "Go-to-Market Strategy", "Pitch Deck Design", "Investor Readiness", "Product Strategy"],
    number: "03",
  },
  {
    id: "cloud", icon: Cloud, name: "SnapWeaz Cloud", tagline: "Infrastructure that scales",
    description: "Cloud solutions that grow with your business — secure, reliable, cost-effective.",
    services: ["Cloud Architecture", "DevOps & CI/CD", "SaaS Development", "Database Design", "Security & Compliance", "Performance Optimization"],
    number: "04",
  },
  {
    id: "growth", icon: TrendingUp, name: "SnapWeaz Growth", tagline: "Accelerating your reach",
    description: "Data-driven marketing that finds, engages, and converts your ideal customers.",
    services: ["Digital Marketing", "SEO & Content", "Social Media", "Email Marketing", "Analytics", "Conversion Optimization"],
    number: "05",
  },
  {
    id: "ops", icon: Shield, name: "SnapWeaz Ops", tagline: "Reliable delivery, always",
    description: "Solid operational foundation ensuring on-time, on-budget delivery.",
    services: ["Project Management", "Quality Assurance", "Security Audits", "Documentation", "Maintenance & Support", "Process Optimization"],
    number: "06",
  },
];

const Divisions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[15vw] text-background/[0.03] whitespace-nowrap">Divisions</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Our Divisions</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-6 max-w-4xl">
                Six expert teams,
                <br />
                <span className="text-accent italic">one vision</span>
              </h1>
              <p className="text-xl text-background/60 max-w-xl">
                Specialized divisions working in harmony to deliver comprehensive solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Divisions List - Editorial */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="space-y-0 border-t border-border/30">
              {divisions.map((division, index) => (
                <motion.div
                  key={division.id}
                  id={division.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group border-b border-border/30 py-14 md:py-20"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Number + Icon */}
                    <div className="lg:col-span-2 flex items-center gap-4">
                      <span className="font-serif text-5xl text-foreground/[0.08]">{division.number}</span>
                      <div className="inline-flex p-3 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <division.icon size={22} className="text-accent" />
                      </div>
                    </div>

                    {/* Title + Description */}
                    <div className="lg:col-span-4">
                      <h2 className="font-serif text-3xl text-foreground mb-2 group-hover:text-accent transition-colors">
                        {division.name}
                      </h2>
                      <p className="text-sm text-accent italic mb-4">{division.tagline}</p>
                      <p className="text-muted-foreground leading-relaxed">{division.description}</p>
                    </div>

                    {/* Services tags */}
                    <div className="lg:col-span-5">
                      <div className="flex flex-wrap gap-2">
                        {division.services.map((service) => (
                          <span
                            key={service}
                            className="px-4 py-2 rounded-full bg-secondary/50 border border-border/30 text-sm text-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="lg:col-span-1 flex justify-end">
                      <Link to="/contact" className="text-muted-foreground/30 group-hover:text-accent transition-colors">
                        <ArrowUpRight size={24} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-accent/5">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                The right team for your <span className="text-accent italic">challenge</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Not sure which division you need? Let's find the perfect expertise for your project.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors duration-300 group"
              >
                Start a conversation
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Divisions;
