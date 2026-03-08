import { motion } from "framer-motion";
import { ArrowUpRight, Download, Calendar, FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const pressReleases = [
  { date: "January 2025", title: "SnapWeaz Expands Global Operations", excerpt: "Expansion of services to Europe and North America.", category: "Company News" },
  { date: "December 2024", title: "SnapWeaz Ventures Launches Startup Incubator", excerpt: "New initiative to support early-stage startups.", category: "Product Launch" },
  { date: "October 2024", title: "SnapWeaz Partners with Leading Tech Firms", excerpt: "Strategic partnerships for enterprise-grade solutions.", category: "Partnership" },
  { date: "August 2024", title: "SnapWeaz Recognized as Top Design Agency", excerpt: "Industry recognition for excellence in UI/UX design.", category: "Award" },
];

const mediaFeatures = [
  { outlet: "TechCrunch", title: "How SnapWeaz is Redefining Digital Agency Standards", date: "November 2024" },
  { outlet: "Forbes India", title: "Rising Design Studios Shaping India's Tech Landscape", date: "September 2024" },
  { outlet: "Product Hunt", title: "Top Design Agencies for Startups in 2024", date: "July 2024" },
];

const Press = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[22vw] text-background/[0.03] whitespace-nowrap">Press</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">Press & Media</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] mb-6">
                News & <span className="text-accent italic">announcements</span>
              </h1>
              <p className="text-xl text-background/60 max-w-xl">
                Stay updated with the latest from SnapWeaz.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Press Kit */}
        <section className="py-16 bg-background">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary/30 rounded-3xl p-8 md:p-10 border border-border/30"
            >
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-2">Press Kit</h3>
                <p className="text-muted-foreground">Download logos, brand assets, and company information.</p>
              </div>
              <Button variant="outline" className="rounded-full group shrink-0"
                onClick={() => window.open('mailto:info@snapweaz.in?subject=Press Kit Request', '_blank')}
              >
                <Download size={18} className="mr-2" />
                Request Press Kit
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm text-accent uppercase tracking-[0.2em]">Press Releases</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Latest announcements</h2>
            </motion.div>

            <div className="space-y-3">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-secondary/30 rounded-2xl p-6 md:p-8 border border-border/30 hover:border-accent/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em]">{release.category}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} />{release.date}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">{release.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{release.excerpt}</p>
                    </div>
                    <ArrowUpRight size={20} className="text-muted-foreground/30 group-hover:text-accent shrink-0 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Features */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm text-accent uppercase tracking-[0.2em]">In The Media</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Featured coverage</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {mediaFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-background rounded-3xl p-8 border border-border/30 hover:border-accent/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <FileText size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">{feature.outlet}</span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-4 group-hover:text-accent transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                Media <span className="text-accent italic">inquiries</span>
              </h2>
              <p className="text-lg text-background/60 mb-10">
                For press inquiries, interview requests, or media opportunities.
              </p>
              <a
                href="mailto:info@snapweaz.in"
                className="inline-flex items-center gap-2 px-10 py-4 bg-background text-foreground rounded-full font-medium hover:bg-accent hover:text-background transition-all duration-300 group"
              >
                info@snapweaz.in
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
