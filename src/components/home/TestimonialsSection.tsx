import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { getTestimonials } from "@/lib/content";

export const TestimonialsSection = () => {
  const testimonials = getTestimonials();
  const featured = testimonials.find((t) => t.featured) || testimonials[0];
  const rest = testimonials.filter((t) => t !== featured);

  const headingText = "Testimonials";
  const headingRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(headingText.slice(0, i));
      if (i >= headingText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isInView]);

  if (!testimonials.length) return null;

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-mesh)' }} />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-accent" />
            <p ref={headingRef} className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
              {displayedText}
              {isInView && displayedText.length < headingText.length && (
                <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 animate-pulse align-middle" />
              )}
            </p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-[1.1] max-w-2xl">
            Trusted by founders
            <br />
            <span className="text-accent italic">& teams</span> worldwide
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden"
          >
            <Quote size={60} className="text-accent/10 absolute top-8 right-8" />
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug mb-10">
              "{featured.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-lg">
                {featured.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground text-lg">{featured.author}</p>
                <p className="text-muted-foreground">{featured.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Other testimonials */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((t, index) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="glass-card rounded-3xl p-8 flex-1 flex flex-col justify-between"
              >
                <p className="text-foreground leading-relaxed mb-6 text-[15px]">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-medium">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
