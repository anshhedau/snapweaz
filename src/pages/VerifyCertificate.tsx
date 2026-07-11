import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { findCertificateByInternId } from "@/lib/content";

const VerifyCertificate = () => {
  const navigate = useNavigate();
  const [internId, setInternId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const trimmed = internId.trim();
    if (!trimmed) {
      setError("Please enter your Intern ID.");
      return;
    }
    const cert = findCertificateByInternId(trimmed);
    if (!cert) {
      setError(`No intern exists with the ID "${trimmed}". Double-check and try again.`);
      return;
    }
    setError(null);
    navigate(`/certificate/${cert.certificate_id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Verify Certificate"
        description="Verify a SnapWeaz internship certificate using your Intern ID."
        path="/verify"
      />
      <Header />
      <main className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px]" />
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="container-wide relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] text-accent uppercase tracking-[0.25em] mb-6">
              <ShieldCheck size={12} /> Certificate Verification
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border/40 bg-secondary/30 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 shadow-[0_0_60px_-25px_hsl(var(--accent)/0.5)]"
            >
              <div className="flex items-center gap-3 flex-1 rounded-xl bg-background/60 border border-border/40 px-4">
                <Search size={16} className="text-foreground/50 shrink-0" />
                <input
                  type="text"
                  value={internId}
                  onChange={(e) => {
                    setInternId(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. SWi2026xxxx"
                  autoFocus
                  className="w-full bg-transparent border-0 outline-none py-3.5 text-foreground placeholder:text-foreground/40 font-mono text-sm"
                />
              </div>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-xl h-auto px-6 py-3.5 group"
              >
                Verify <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            {searched && error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 inline-flex items-start gap-3 text-left rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              >
                <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <p className="text-xs text-foreground/40 mt-8">
              Lost your Intern ID? Contact us at{" "}
              <a href="mailto:info@snapweaz.com" className="text-accent hover:underline">
                info@snapweaz.com
              </a>
              .
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyCertificate;
