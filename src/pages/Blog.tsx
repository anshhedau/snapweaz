import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const featuredPost = {
  title: "The Future of Digital Design: Trends Shaping 2025",
  excerpt: "Explore the emerging design trends that will define the digital landscape in 2025, from AI-powered interfaces to sustainable design practices.",
  author: "SnapWeaz Team",
  date: "January 10, 2025",
  readTime: "8 min read",
  category: "Design Trends",
  color: "bg-accent/10",
};

const posts = [
  {
    title: "Building Scalable Web Applications with Modern Architecture",
    excerpt: "Learn how to architect web applications that can grow with your business without compromising performance.",
    author: "Software Team",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "Development",
    color: "bg-blue-100",
  },
  {
    title: "Brand Identity: More Than Just a Logo",
    excerpt: "Discover why a comprehensive brand identity system is essential for business success in today's competitive market.",
    author: "Design Team",
    date: "December 28, 2024",
    readTime: "5 min read",
    category: "Branding",
    color: "bg-violet-100",
  },
  {
    title: "The Art of User-Centered Design",
    excerpt: "How putting users at the center of your design process leads to products that people actually want to use.",
    author: "UX Team",
    date: "December 20, 2024",
    readTime: "7 min read",
    category: "UX Design",
    color: "bg-emerald-100",
  },
  {
    title: "Startup Growth Strategies That Actually Work",
    excerpt: "Proven tactics for early-stage startups to acquire users, build traction, and scale sustainably.",
    author: "Growth Team",
    date: "December 15, 2024",
    readTime: "10 min read",
    category: "Growth",
    color: "bg-amber-100",
  },
  {
    title: "Cloud Infrastructure Best Practices",
    excerpt: "Essential guidelines for building secure, reliable, and cost-effective cloud infrastructure.",
    author: "Cloud Team",
    date: "December 10, 2024",
    readTime: "8 min read",
    category: "Cloud",
    color: "bg-sky-100",
  },
  {
    title: "Design Systems: A Complete Guide",
    excerpt: "Everything you need to know about building and maintaining a design system that scales.",
    author: "Design Team",
    date: "December 5, 2024",
    readTime: "12 min read",
    category: "Design",
    color: "bg-rose-100",
  },
];

const categories = ["All", "Design", "Development", "Branding", "UX Design", "Growth", "Cloud"];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Blog
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
                Insights &
                <span className="text-accent"> perspectives</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Thoughts, tutorials, and insights from our team on design,
                development, and building great digital products.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-background border-b border-border/30">
          <div className="container-wide">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    index === 0
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-accent hover:text-background"
                  }`}
                >
                  {category}
                </motion.button>
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
              transition={{ duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className={`${featuredPost.color} rounded-3xl p-8 md:p-12 lg:p-16`}>
                <div className="max-w-3xl">
                  <span className="inline-block px-4 py-1.5 bg-accent text-background text-xs font-medium uppercase tracking-wider rounded-full mb-6">
                    Featured
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Latest articles
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className={`${post.color} rounded-2xl aspect-[4/3] mb-6 flex items-center justify-center`}>
                    <span className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium">
                    Read article
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                Stay in the loop
              </h2>
              <p className="text-lg text-background/70 mb-8">
                Subscribe to our newsletter for the latest insights, tutorials,
                and updates from the SnapWeaz team.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-14 px-6 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="h-14 px-8 bg-background text-foreground rounded-full font-medium hover:bg-accent hover:text-background transition-all duration-300"
                >
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

export default Blog;
