import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import logo from "@/assets/logo.png";
import stamp from "@/assets/stamp.png";
import { getFounderInfo } from "@/lib/content";

const Founder = () => {
  const founder = getFounderInfo();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[18vw] text-background/[0.03] whitespace-nowrap">Founder</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Leadership</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95]">
                Meet the <span className="text-accent italic">founder</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <div className="aspect-[3/4] rounded-3xl bg-secondary/50 border border-border/30 flex items-center justify-center sticky top-32 overflow-hidden">
                  {founder.photo ? (
                    <img src={founder.photo} alt="Founder" loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <img src={logo} alt="SnapWeaz" className="w-28 h-28 object-contain opacity-60 mx-auto mb-4" />
                      <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Founder & CEO</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-7 lg:col-start-6"
              >
                <div className="space-y-10">
                  {founder.sections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-t border-border/30 pt-8"
                    >
                      <h2 className="font-serif text-2xl text-foreground mb-4">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">{section.text}</p>
                    </motion.div>
                  ))}

                  {/* Connect */}
                  <div className="border-t border-border/30 pt-8">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Connect</h2>
                    <div className="flex flex-wrap gap-2">
                      {founder.social.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full bg-secondary/50 border border-border/30 text-sm text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 inline-flex items-center gap-2"
                        >
                          {social.name}
                          <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="pt-12 text-right">
                    <p className="text-sm text-muted-foreground mb-2">For SnapWeaz</p>
                    <img src={stamp} alt="SnapWeaz Stamp" className="w-28 h-auto ml-auto my-2" />
                    <p className="text-sm text-muted-foreground">Founder</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Founder;
