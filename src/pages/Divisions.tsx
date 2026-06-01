import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Rocket, Cloud, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SceneReveal } from "@/components/fx/SceneReveal";
import { getDivisions } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette, Code2, Rocket, Cloud, TrendingUp, Shield,
};

const Divisions = () => {
  const divisions = getDivisions();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden section-dark">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[15vw] text-foreground/[0.03] whitespace-nowrap">Divisions</span>
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
              <p className="text-xl text-foreground/60 max-w-xl">
                Specialized divisions working in harmony to deliver comprehensive solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Divisions List */}
        <SceneReveal>
          <section className="section-padding bg-background">
            <div className="container-wide">
              <div className="space-y-0 border-t border-border/30">
                {divisions.map((division, index) => {
                  const Icon = iconMap[division.icon] || Palette;
                  return (
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
                        <div className="lg:col-span-2 flex items-center gap-4">
                          <span className="font-serif text-5xl text-foreground/[0.08]">{division.number}</span>
                          <div className="inline-flex p-3 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                            <Icon size={22} className="text-accent" />
                          </div>
                        </div>
                        <div className="lg:col-span-4">
                          <h2 className="font-serif text-3xl text-foreground mb-2 group-hover:text-accent transition-colors">
                            {division.name}
                          </h2>
                          <p className="text-sm text-accent italic mb-4">{division.tagline}</p>
                          <p className="text-muted-foreground leading-relaxed">{division.description}</p>
                        </div>
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
                        <div className="lg:col-span-1 flex justify-end">
                          <Link to="/contact" className="text-muted-foreground/30 group-hover:text-accent transition-colors">
                            <ArrowUpRight size={24} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        </SceneReveal>

        {/* CTA */}
        <SceneReveal>
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
                  className="inline-flex items-center gap-2 px-10 py-4 section-dark rounded-full font-medium hover:bg-accent transition-colors duration-300 group"
                >
                  Start a conversation
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </div>
          </section>
        </SceneReveal>
      </main>

      <Footer />
    </div>
  );
};

export default Divisions;
