import { motion } from "framer-motion";
import { ArrowUpRight, Download, Calendar, FileText, User, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getPressPosts, type PressPost } from "@/lib/content";

const pressPosts = getPressPosts();

const featuredPost = pressPosts.find((p) => p.featured) ?? pressPosts[0];
const otherPosts = pressPosts.filter((p) => p !== featuredPost);

const categories = ["All", ...Array.from(new Set(pressPosts.map((p) => p.category)))];

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

        {/* Categories */}
        <section className="py-6 bg-background border-b border-border/30 sticky top-[72px] z-30 backdrop-blur-xl bg-background/90">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                    index === 0
                      ? "bg-foreground text-background"
                      : "bg-secondary/50 text-foreground/70 hover:bg-accent hover:text-background border border-border/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
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

        {/* Featured Post */}
        {featuredPost && (
          <section className="section-padding bg-background">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-accent/5 rounded-3xl p-10 md:p-16 border border-border/30 hover:border-accent/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-8 right-8 md:top-12 md:right-12">
                    <ArrowUpRight size={32} className="text-accent/20 group-hover:text-accent transition-colors" />
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-accent text-background text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full mb-8">
                    Featured
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6 max-w-3xl group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><User size={14} />{featuredPost.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={14} />{featuredPost.date}</span>
                    <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em]">{featuredPost.category}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        {otherPosts.length > 0 && (
          <section className="section-padding bg-secondary/30">
            <div className="container-wide">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">Latest updates</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group cursor-pointer bg-background rounded-3xl p-8 border border-border/30 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em]">{post.category}</span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{post.date}</span>
                      <span className="inline-flex items-center gap-1 text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Media Features */}
        <section className="section-padding bg-background">
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
                  className="group bg-secondary/30 rounded-3xl p-8 border border-border/30 hover:border-accent/30 transition-colors cursor-pointer"
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
