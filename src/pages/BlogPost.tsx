import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { marked } from "marked";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SceneReveal } from "@/components/fx/SceneReveal";
import { SEO } from "@/components/seo/SEO";
import { getBlogPosts } from "@/lib/content";

marked.setOptions({ gfm: true, breaks: false });

function formatDate(d: unknown): string {
  if (d instanceof Date) return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return String(d ?? "");
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const posts = getBlogPosts();
  const post = posts.find((p) => slugify(p.title) === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const published = typeof post.date === "string" ? post.date : undefined;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: published,
    mainEntityOfPage: `https://www.snapweaz.com/blog/${slug}`,
    publisher: { "@type": "Organization", name: "SnapWeaz", logo: { "@type": "ImageObject", url: "https://www.snapweaz.com/favicon.png" } },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${slug}`}
        type="article"
        publishedTime={published}
        author={post.author}
        jsonLd={articleLd}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[40vh] flex items-end overflow-hidden section-dark">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[14vw] text-foreground/[0.03] whitespace-nowrap">{post.category}</span>
          </div>
          <div className="container-wide relative z-10 pb-16 md:pb-24 pt-40">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-accent mb-8 hover:underline">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-sm text-accent uppercase tracking-[0.3em]">{post.category}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] leading-[1.05] mb-6 max-w-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-5 text-sm text-foreground/60">
                <span className="flex items-center gap-2"><User size={14} />{post.author}</span>
                <span className="flex items-center gap-2"><Calendar size={14} />{formatDate(post.date)}</span>
                <span className="flex items-center gap-2"><Clock size={14} />{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <SceneReveal>
          <section className="section-padding bg-background">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
                >
                  {post.body ? (
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(post.body) as string }} />
                  ) : (
                    <p className="text-muted-foreground text-lg leading-relaxed">{post.excerpt}</p>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </SceneReveal>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
