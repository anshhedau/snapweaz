import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  Loader2,
  Calendar,
  Clock,
  Linkedin,
  Github,
  Download,
  FileText,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { getCertificate, type CertificateStatus } from "@/lib/content";
import logo from "@/assets/logo.png";

const STATUS_META: Record<
  CertificateStatus,
  { label: string; sub: string; icon: typeof BadgeCheck; tone: string; ring: string }
> = {
  verified: {
    label: "Verified",
    sub: "Authenticated by SnapWeaz",
    icon: BadgeCheck,
    tone: "bg-accent/15 text-accent border-accent/30",
    ring: "shadow-[0_0_60px_-15px_hsl(var(--accent)/0.6)]",
  },
  working: {
    label: "Currently Working Here",
    sub: "Active engagement in progress",
    icon: Loader2,
    tone: "bg-blue-400/15 text-blue-300 border-blue-400/30",
    ring: "shadow-[0_0_60px_-15px_rgba(96,165,250,0.5)]",
  },
  incomplete: {
    label: "Incomplete",
    sub: "Program not fully completed",
    icon: ShieldAlert,
    tone: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    ring: "shadow-[0_0_60px_-15px_rgba(251,191,36,0.4)]",
  },
};

function formatDate(d: string): string {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const NotFoundView = ({ id }: { id: string | undefined }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <SEO
      title="Certificate Not Found"
      description="This certificate could not be verified."
      path={`/certificate/${id ?? ""}`}
      noindex
    />
    <Header />
    <main className="flex-1 flex items-center section-dark">
      <div className="container-wide">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-8">
              <ShieldAlert size={28} className="text-red-400" />
            </div>
            <p className="text-xs text-red-400 uppercase tracking-[0.3em] mb-4">Not Found</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-5">
              Certificate not <span className="text-accent italic">found</span>
            </h1>
            <p className="text-foreground/60 mb-8 leading-relaxed">
              The certificate ID{" "}
              <span className="font-mono text-foreground/90 bg-secondary/40 px-2 py-1 rounded">
                {id || "unknown"}
              </span>{" "}
              could not be verified in our records. Double-check the link or contact the issuer.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" /> Back to SnapWeaz
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

const Certificate = () => {
  const { id } = useParams<{ id: string }>();
  const cert = id ? getCertificate(id) : undefined;
  const [copied, setCopied] = useState(false);

  if (!cert) return <NotFoundView id={id} />;

  const status: CertificateStatus = cert.status ?? "verified";
  const meta = STATUS_META[status];
  const StatusIcon = meta.icon;

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(cert.certificate_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${cert.recipient_name} — Certificate ${cert.certificate_id}`}
        description={`${cert.recipient_name} — ${cert.program}. ${meta.label} certificate issued by ${cert.issuer || "SnapWeaz"}.`}
        path={`/certificate/${cert.certificate_id}`}
        noindex
      />
      <Header />
      <main className="section-dark relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px]" />
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="container-wide relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Verification header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-8 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 text-xs text-foreground/50 uppercase tracking-[0.25em]">
              <ShieldCheck size={14} className="text-accent" />
              <span>SnapWeaz Certificate Verification</span>
            </div>
            <button
              onClick={copyId}
              className="flex items-center gap-2 text-xs text-foreground/60 hover:text-foreground transition font-mono"
            >
              {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
              <span>{cert.certificate_id}</span>
            </button>
          </motion.div>

          {/* Main certificate card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`max-w-4xl mx-auto rounded-3xl border border-border/40 bg-gradient-to-b from-secondary/30 to-background/60 backdrop-blur-xl overflow-hidden ${meta.ring}`}
          >
            {/* Header band */}
            <div className="relative px-8 md:px-14 pt-10 md:pt-14 pb-10 border-b border-border/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <img src={logo} alt="SnapWeaz" className="h-9 w-auto object-contain" />

                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] ${meta.tone}`}
                >
                  <StatusIcon
                    size={14}
                    className={status === "working" ? "animate-spin [animation-duration:3s]" : ""}
                  />
                  {meta.label}
                </div>
              </div>

              <p className="text-xs text-foreground/50 uppercase tracking-[0.3em] mb-4">
                Certificate of {status === "incomplete" ? "Enrollment" : status === "working" ? "Engagement" : "Completion"}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.02] mb-6">
                {cert.recipient_name}
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
                {status === "working" ? "is currently working with " : status === "incomplete" ? "was enrolled in " : "has successfully completed "}
                <span className="text-accent italic">{cert.program}</span>
                {" "}at {cert.issuer || "SnapWeaz Studio"}.
              </p>
              <p className="text-sm text-foreground/50 mt-3">{meta.sub}</p>
            </div>

            {/* Details grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-border/20">
              {cert.intern_id && (
                <Detail icon={<BadgeCheck size={14} />} label="Intern ID" value={cert.intern_id} />
              )}
              <Detail icon={<Calendar size={14} />} label="Issue Date" value={formatDate(cert.issued_date)} />
              {cert.duration && (
                <Detail icon={<Clock size={14} />} label="Duration" value={cert.duration} />
              )}
              <Detail
                icon={<FileText size={14} />}
                label="Issuer"
                value={cert.issuer || "SnapWeaz Studio"}
              />
            </div>

            {/* Social / links */}
            {(cert.linkedin || cert.github) && (
              <div className="px-8 md:px-14 py-8 border-t border-border/30 flex flex-wrap gap-3">
                {cert.linkedin && (
                  <a
                    href={cert.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition"
                  >
                    <Linkedin size={14} /> LinkedIn Profile
                  </a>
                )}
                {cert.github && (
                  <a
                    href={cert.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition"
                  >
                    <Github size={14} /> GitHub Profile
                  </a>
                )}
              </div>
            )}

            {/* Notes */}
            {cert.body && (
              <div className="px-8 md:px-14 py-8 border-t border-border/30">
                <p className="text-xs text-foreground/50 uppercase tracking-[0.3em] mb-3">Notes</p>
                <p className="text-foreground/75 leading-relaxed">{cert.body}</p>
              </div>
            )}

            {/* PDF download */}
            {cert.certificate_pdf && (
              <div className="px-8 md:px-14 py-10 border-t border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-foreground/50 uppercase tracking-[0.3em]">Certificate Document</p>
                  <Button
                    asChild
                    className="bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-full"
                  >
                    <a href={cert.certificate_pdf} download target="_blank" rel="noopener noreferrer">
                      <Download size={16} className="mr-2" /> Download PDF
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-8 md:px-14 py-6 border-t border-border/30 flex flex-wrap items-center justify-between gap-3 text-xs text-foreground/50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-accent" />
                Verified on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </div>
              <Link to="/" className="hover:text-foreground transition">
                snapweaz.com
              </Link>
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Detail = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-background/40 px-8 md:px-10 py-6">
    <div className="flex items-center gap-2 text-[10px] text-foreground/50 uppercase tracking-[0.3em] mb-2">
      {icon} {label}
    </div>
    <p className="text-foreground/90 text-base">{value}</p>
  </div>
);

export default Certificate;
