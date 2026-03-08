import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import logo from "@/assets/logo.png";
import stamp from "@/assets/stamp.png";

const Founder = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-[780px] mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-[32px] md:text-[42px] font-semibold text-foreground mb-2 tracking-tight">
                Meet the Founder
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                The vision behind SnapWeaz
              </p>

              <div className="space-y-8">
                {/* Founder Image Placeholder */}
                <div className="aspect-square max-w-xs rounded-2xl bg-secondary/50 flex items-center justify-center border border-border/50">
                  <img src={logo} alt="SnapWeaz" className="w-32 h-32 object-contain opacity-80" />
                </div>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Vision & Mission
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    SnapWeaz was founded with a clear vision: to bridge the gap between exceptional design
                    and robust engineering. We believe that the best digital products emerge when creative
                    thinking and technical excellence work hand in hand from day one.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Our Philosophy
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    We don't just build products — we craft experiences. Every project is an opportunity
                    to push boundaries, embrace innovation, and create something that truly makes a difference.
                    Our work is driven by passion, precision, and a relentless pursuit of excellence.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    The Journey
                  </h2>
                  <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
                    What started as a small team passionate about beautiful, functional products has grown
                    into a full-service creative technology studio serving clients around the world. Today,
                    our specialized divisions work in harmony to deliver end-to-end solutions — from brand
                    strategy and design to development, cloud infrastructure, and growth marketing.
                  </p>
                </section>

                <section>
                  <h2 className="text-[17px] font-semibold text-foreground border-t border-border pt-6 mb-2 before:content-['—_'] before:text-muted-foreground/50">
                    Connect
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <a
                      href="https://instagram.com/anshhedau_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-secondary text-sm text-foreground hover:bg-accent hover:text-background transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Instagram
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href="https://linkedin.com/in/anshhedau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-secondary text-sm text-foreground hover:bg-accent hover:text-background transition-all duration-300 inline-flex items-center gap-2"
                    >
                      LinkedIn
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href="https://twitter.com/anshhedau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-secondary text-sm text-foreground hover:bg-accent hover:text-background transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Twitter
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </section>

                {/* Signature */}
                <div className="mt-16 text-right">
                  <p className="text-sm text-muted-foreground mb-1">For SnapWeaz</p>
                  <img src={stamp} alt="SnapWeaz Stamp" className="w-28 h-auto ml-auto my-2" />
                  <p className="text-sm text-muted-foreground">Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Founder;
