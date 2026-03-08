import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const featuredPost = {
  title: "The Future of Digital Design: Trends Shaping 2025",
  excerpt: "Explore the emerging design trends that will define the digital landscape in 2025, from AI-powered interfaces to sustainable design practices.",
  author: "SnapWeaz Team",
  date: "January 10, 2025",
  readTime: "8 min read",
  category: "Design Trends",
};

const posts = [
  { title: "Building Scalable Web Applications with Modern Architecture", excerpt: "Learn how to architect web applications that grow with your business.", author: "Software Team", date: "January 5, 2025", readTime: "6 min", category: "Development" },
  { title: "Brand Identity: More Than Just a Logo", excerpt: "Why a comprehensive brand identity system is essential for success.", author: "Design Team", date: "December 28, 2024", readTime: "5 min", category: "Branding" },
  { title: "The Art of User-Centered Design", excerpt: "Putting users at the center leads to products people want to use.", author: "UX Team", date: "December 20, 2024", readTime: "7 min", category: "UX Design" },
  { title: "Startup Growth Strategies That Actually Work", excerpt: "Proven tactics for early-stage startups to acquire and retain users.", author: "Growth Team", date: "December 15, 2024", readTime: "10 min", category: "Growth" },
  { title: "Cloud Infrastructure Best Practices", excerpt: "Essential guidelines for secure, reliable cloud infrastructure.", author: "Cloud Team", date: "December 10, 2024", readTime: "8 min", category: "Cloud" },
  { title: "Design Systems: A Complete Guide", excerpt: "Building and maintaining a design system that scales.", author: "Design Team", date: "December 5, 2024", readTime: "12 min", category: "Design" },
];

const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

const Press = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

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
                Insights & <span className="text-accent italic">perspectives</span>
              </h1>
              <p className="text-xl text-background/60 max-w-xl">
                Thoughts, tutorials, and insights on design, development, and digital products.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-background border-b border-border/30 sticky top-[72px] z-30 backdrop-blur-xl bg-background/90">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                    activeCategory === category
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

        {/* Featured Post */}
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
                  <span className="flex items-center gap-2"><Clock size={14} />{featuredPost.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Latest articles</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
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
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
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

        {/* Newsletter */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-wide">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                Stay in the <span className="text-accent italic">loop</span>
              </h2>
              <p className="text-lg text-background/60 mb-10">
                Subscribe for the latest insights and updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-14 px-6 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors"
                />
                <button type="submit" className="h-14 px-8 bg-background text-foreground rounded-full font-medium hover:bg-accent hover:text-background transition-all duration-300">
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
