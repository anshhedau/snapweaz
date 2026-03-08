import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useRef } from "react";

const values = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every project is an opportunity to create something meaningful. We pour our hearts into every pixel and line of code.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We push boundaries, embrace new technologies, and constantly evolve our craft to deliver cutting-edge solutions.",
  },
  {
    icon: Target,
    title: "Precision Engineering",
    description: "Details matter. We obsess over performance, accessibility, and scalability to ensure flawless products.",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "We're not vendors — we're partners. Your success is our success, and we're invested in your journey.",
  },
];

const timeline = [
  { year: "2020", title: "The Beginning", description: "Founded with a mission: bridge the gap between exceptional design and robust engineering." },
  { year: "2021", title: "Growing the Team", description: "Expanded capabilities with designers, developers, and strategists who share our vision." },
  { year: "2022", title: "Establishing Divisions", description: "Launched specialized divisions for deeper expertise in design, software, cloud, and growth." },
  { year: "2023", title: "Global Reach", description: "Extended services worldwide, working with startups and enterprises across industries." },
  { year: "2024", title: "Innovation Hub", description: "Launched SnapWeaz Ventures to support and incubate promising startups." },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero - Full-bleed statement */}
        <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">About Us</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] mb-8 max-w-4xl">
                We believe in the
                <br />
                power of <span className="text-accent italic">great design</span>
              </h1>
              <p className="text-xl text-background/60 max-w-2xl leading-relaxed">
                SnapWeaz is a creative technology studio that helps ambitious companies
                build products, brands, and experiences that matter.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Story - Asymmetric layout */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] mb-8">
                  Our story began with a
                  <br />
                  <span className="text-accent italic">simple belief</span>
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Design and engineering shouldn't exist in silos. The best digital
                    products emerge when creative thinking and technical excellence
                    work hand in hand from day one.
                  </p>
                  <p>
                    We founded SnapWeaz to prove this. What started as a small team
                    passionate about beautiful, functional products has grown into a
                    full-service creative technology studio serving clients worldwide.
                  </p>
                  <p>
                    Today, our six specialized divisions work in harmony — from brand
                    strategy and design to development, cloud infrastructure, and growth.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 lg:col-start-9"
              >
                <div className="aspect-square rounded-3xl bg-secondary/50 border border-border/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5" />
                  <div className="relative text-center">
                    <img src={logo} alt="SnapWeaz" className="w-28 h-28 mx-auto object-contain mb-4" />
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                      Est. 2020
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values - Editorial grid */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm text-accent uppercase tracking-[0.2em]">Our Values</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
                Principles that guide <span className="text-accent italic">everything</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-px bg-border/30 rounded-3xl overflow-hidden">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background p-10 md:p-14 group"
                >
                  <div className="inline-flex p-3.5 rounded-2xl bg-accent/10 mb-8 group-hover:bg-accent/20 transition-colors">
                    <value.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline - Minimal horizontal */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm text-accent uppercase tracking-[0.2em]">Our Journey</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
                Building the <span className="text-accent italic">future</span>
              </h2>
            </motion.div>

            <div className="space-y-0 border-l-2 border-border/30 ml-4 md:ml-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10 md:pl-16 py-8 group"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-10 w-3 h-3 rounded-full bg-accent -translate-x-[7px] group-hover:scale-150 transition-transform" />
                  <span className="font-serif text-3xl md:text-4xl text-accent mb-2 block">{item.year}</span>
                  <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground max-w-lg">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                  Ready to work <span className="text-accent italic">together</span>?
                </h2>
                <p className="text-lg text-background/60 mb-8">
                  Let's discuss how we can help bring your vision to life.
                </p>
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-accent hover:text-background rounded-full px-8 h-14 group transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">
                    Get in touch
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
