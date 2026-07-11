import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ShieldCheck, Calendar, Award, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { getCertificate } from "@/lib/content";
import logo from "@/assets/logo.png";

const Certificate = () => {
  const { id } = useParams<{ id: string }>();
  const cert = id ? getCertificate(id) : undefined;
  const found = !!cert && cert.valid !== false;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={found ? `Certificate ${cert!.certificate_id} — SnapWeaz` : "Certificate not found — SnapWeaz"}
        description="Verify the authenticity of a SnapWeaz issued certificate."
        path={`/certificate/${id}`}
        noindex
      />
      <Header />
      <main className="section-padding section-dark min-h-screen flex items-center">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-border/40 bg-secondary/20 backdrop-blur-xl p-10 md:p-14 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-10 relative">
                <img src={logo} alt="SnapWeaz" className="h-10 w-auto object-contain" />
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] ${
                    found ? "bg-accent/15 text-accent" : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {found ? (
                    <>
                      <ShieldCheck size={14} /> Verified
                    </>
                  ) : (
                    <>
                      <XCircle size={14} /> Invalid
                    </>
                  )}
                </div>
              </div>

              {found ? (
                <div className="relative">
                  <p className="text-xs text-foreground/50 uppercase tracking-[0.3em] mb-4">
                    Certificate of Completion
                  </p>
                  <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-8">
                    {cert!.recipient_name}
                  </h1>
                  <p className="text-lg text-foreground/70 mb-10 max-w-xl leading-relaxed">
                    has successfully completed{" "}
                    <span className="text-accent italic">{cert!.program}</span> issued by{" "}
                    {cert!.issuer || "SnapWeaz Studio"}.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-6 mb-10">
                    <Detail icon={<Calendar size={14} />} label="Issued" value={cert!.issued_date} />
                    {cert!.duration && (
                      <Detail icon={<Clock size={14} />} label="Duration" value={cert!.duration} />
                    )}
                    {cert!.grade && (
                      <Detail icon={<Award size={14} />} label="Grade" value={cert!.grade} />
                    )}
                  </div>

                  {cert!.body && (
                    <p className="text-sm text-foreground/60 leading-relaxed border-t border-border/30 pt-6">
                      {cert!.body}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border/30 text-xs text-foreground/50">
                    <CheckCircle2 size={14} className="text-accent" />
                    <span>
                      Certificate ID: <span className="font-mono text-foreground/80">{cert!.certificate_id}</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative py-6">
                  <h1 className="font-serif text-3xl md:text-5xl leading-[1.05] mb-4">
                    Certificate not found
                  </h1>
                  <p className="text-foreground/60">
                    The certificate ID <span className="font-mono text-foreground/80">{id}</span> could not be verified.
                    Please double-check the link or contact the issuer.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Detail = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div>
    <div className="flex items-center gap-2 text-[10px] text-foreground/50 uppercase tracking-[0.3em] mb-2">
      {icon} {label}
    </div>
    <p className="text-foreground/90">{value}</p>
  </div>
);

export default Certificate;
