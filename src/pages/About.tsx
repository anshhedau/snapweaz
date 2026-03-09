import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useRef } from "react";
import { getAboutContent, parseAccentText } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart, Lightbulb, Target, Users,
};

const About = () => {
  const content = getAboutContent();
  const heroHeadline = parseAccentText(content.hero_headline);
  const storyHeadline = parseAccentText(content.story_headline);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
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
                <span className="text-sm text-accent uppercase tracking-[0.3em]">{content.hero_eyebrow}</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] mb-8 max-w-4xl">
                {heroHeadline.before}
                {heroHeadline.accent && (
                  <>
                    <br />
                    <span className="text-accent italic">{heroHeadline.accent}</span>
                  </>
                )}
                {heroHeadline.after}
              </h1>
              <p className="text-xl text-background/60 max-w-2xl leading-relaxed">
                {content.hero_description}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Story */}
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
                  {storyHeadline.before}
                  <br />
                  {storyHeadline.accent && (
                    <span className="text-accent italic">{storyHeadline.accent}</span>
                  )}
                  {storyHeadline.after}
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                  {content.story_paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
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
                    <img src={logo} alt="SnapWeaz" className="w-28 h-28 mx-auto object-contain" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
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
              {content.values.map((value, index) => {
                const Icon = iconMap[value.icon] || Heart;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background p-10 md:p-14 group"
                  >
                    <div className="inline-flex p-3.5 rounded-2xl bg-accent/10 mb-8 group-hover:bg-accent/20 transition-colors">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
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
              {content.timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10 md:pl-16 py-8 group"
                >
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
