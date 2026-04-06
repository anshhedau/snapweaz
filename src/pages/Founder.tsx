import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import logo from "@/assets/logo.png";
import stamp from "@/assets/stamp.png";
import defaultFounderPhoto from "@/assets/founder.png";
import { getFounderInfo } from "@/lib/content";

const Founder = () => {
  const founder = getFounderInfo();
  const founderPhoto = founder.photo || defaultFounderPhoto;

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
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-4">
                Meet the <span className="text-accent italic">founder</span>
              </h1>
              <p className="text-2xl md:text-3xl text-background/70 font-serif">Ansh A. Hedau</p>
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
                <div className="sticky top-32">
                  <div className="aspect-[3/4] rounded-3xl bg-secondary/50 border border-border/30 overflow-hidden">
                    {/* <img src={founderPhoto} alt="Ansh A. Hedau - Founder" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground tracking-[0.15em]">Ansh A. Hedau</p>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] mt-0.5">Founder & CEO</p>
                  </div>
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
                      <div className="space-y-4">
                        {section.text.split('\n\n').map((para, i) => (
                          <p key={i} className="text-muted-foreground leading-relaxed text-lg">{para}</p>
                        ))}
                      </div>
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
