import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  Loader2,
  Calendar,
  CalendarCheck,
  Linkedin,
  Github,
  Download,
  ArrowLeft,
  Share2,
  Check,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { getCertificate, type CertificateStatus } from "@/lib/content";
import logo from "@/assets/logo.png";
import stamp from "@/assets/stamp.png";

const UDYAM = "UDYAM-MH-11-0040646";

const STATUS_META: Record<
  CertificateStatus,
  { label: string; sub: string; icon: typeof BadgeCheck; tone: string; ring: string }
> = {
  verified: {
    label: "Verified",
    sub: "Authenticated by SnapWeaz",
    icon: BadgeCheck,
    tone: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
    ring: "shadow-[0_0_80px_-10px_rgba(52,211,153,0.55)]",
  },
  working: {
    label: "Currently Working Here",
    sub: "Active engagement in progress",
    icon: Loader2,
    tone: "bg-blue-400/15 text-blue-300 border-blue-400/30",
    ring: "shadow-[0_0_80px_-10px_rgba(96,165,250,0.55)]",
  },
  incomplete: {
    label: "Incomplete",
    sub: "Program not fully completed",
    icon: ShieldAlert,
    tone: "bg-red-500/15 text-red-400 border-red-500/30",
    ring: "shadow-[0_0_80px_-10px_rgba(248,113,113,0.55)]",
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
    <main className="flex-1 flex items-center section-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-red-500/[0.07] blur-[140px]" />
      </div>
      <div className="container-wide relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto rounded-3xl border border-border/40 bg-secondary/25 backdrop-blur-xl p-8 sm:p-10 text-center shadow-[0_0_80px_-30px_rgba(248,113,113,0.4)]"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/25 mb-6">
            <ShieldAlert size={24} className="text-red-400" />
          </div>
          <p className="text-[10px] text-red-400/90 uppercase tracking-[0.3em] mb-3">Not Found</p>
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">
            Certificate not <span className="text-accent italic">found</span>
          </h1>
          <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
            We couldn't verify{" "}
            <span className="font-mono text-foreground/90 bg-background/60 px-2 py-0.5 rounded border border-border/40">
              {id || "unknown"}
            </span>{" "}
            in our records. Double-check the link, or search by your Intern ID.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild className="bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-full">
              <Link to="/verify"><Search size={14} className="mr-2" /> Verify by Intern ID</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/"><ArrowLeft size={14} className="mr-2" /> Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
    <Footer hideCta />
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

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/certificate/${cert.certificate_id}`
      : `https://www.snapweaz.com/certificate/${cert.certificate_id}`;

  const shareCertificate = async () => {
    try {
      const shareData = {
        title: `${cert.recipient_name} — ${cert.program}`,
        text: `${cert.recipient_name} — ${cert.program} at ${cert.issuer || "SnapWeaz"}`,
        url: shareUrl,
      };
      const nav = typeof navigator !== "undefined" ? (navigator as Navigator & { share?: (d: ShareData) => Promise<void> }) : undefined;
      if (nav?.share) {
        await nav.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };

  const program = cert.program?.trim() || "";
  const startsWithVowel = /^[aeiou]/i.test(program);
  const article = startsWithVowel ? "an" : "a";
  const issuer = cert.issuer || "SnapWeaz";
  const workingSentence = (
    <>is currently working as {article} <span className="text-accent italic">{program}</span> at {issuer}.</>
  );
  const completedSentence = (
    <>has successfully completed the <span className="text-accent italic">{program}</span> program at {issuer}.</>
  );
  const incompleteSentence = (
    <>was enrolled in the <span className="text-accent italic">{program}</span> program at {issuer}.</>
  );
  const sentence = status === "working" ? workingSentence : status === "incomplete" ? incompleteSentence : completedSentence;

  // Per-candidate share preview
  const statusLine =
    status === "working"
      ? `is currently working as ${article} ${program} at ${issuer}.`
      : status === "incomplete"
      ? `was enrolled in the ${program} program at ${issuer}.`
      : `has successfully completed the ${program} program at ${issuer}.`;
  const shareTitle = `${cert.recipient_name} · ${program}`;
  const shareDescription = `${cert.recipient_name} ${statusLine} Verified via SnapWeaz.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: `${program} — ${cert.recipient_name}`,
    credentialCategory: "Certificate",
    recognizedBy: { "@type": "Organization", name: issuer, url: "https://www.snapweaz.com" },
    identifier: cert.certificate_id,
    dateCreated: cert.start_date,
    ...(cert.end_date ? { validFrom: cert.end_date } : {}),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={shareTitle}
        description={shareDescription}
        path={`/certificate/${cert.certificate_id}`}
        jsonLd={jsonLd}
      />
      <Header />
      <main className="section-dark relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px]" />
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="container-wide relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
          {/* Verification header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-6 sm:mb-8 flex items-center justify-between gap-3 flex-nowrap"
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-foreground/50 uppercase tracking-[0.2em] sm:tracking-[0.25em] whitespace-nowrap min-w-0">
              <ShieldCheck size={14} className="text-accent shrink-0" />
              <span className="truncate">SnapWeaz Certificate Verification</span>
            </div>
            <button
              onClick={shareCertificate}
              className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-foreground/60 hover:text-foreground transition uppercase tracking-[0.2em] whitespace-nowrap shrink-0"
            >
              {copied ? <Check size={12} className="text-accent" /> : <Share2 size={12} />}
              <span>{copied ? "Copied" : "Share Certificate"}</span>
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
            <div className="relative px-5 sm:px-8 md:px-14 pt-7 sm:pt-10 md:pt-14 pb-7 sm:pb-10 border-b border-border/30">
              <div className="flex flex-row items-start justify-between gap-3 sm:gap-6 mb-7 sm:mb-10">
                <img src={logo} alt="SnapWeaz" className="h-8 sm:h-9 w-auto object-contain shrink-0" />

                <div
                  className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] shrink-0 ${meta.tone}`}
                >
                  <StatusIcon
                    size={12}
                    className={status === "working" ? "animate-spin [animation-duration:3s]" : ""}
                  />
                  {meta.label}
                </div>
              </div>

              <p className="text-[10px] sm:text-xs text-foreground/50 uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2.5 sm:mb-4">
                Certificate of {status === "incomplete" ? "Enrollment" : status === "working" ? "Engagement" : "Completion"}
              </p>
              <h1 className="font-serif text-[28px] leading-[1.1] sm:text-4xl md:text-6xl md:leading-[1.05] mb-4 sm:mb-6 break-words">
                {cert.recipient_name}
              </h1>
              <p className="text-sm sm:text-lg text-foreground/70 max-w-2xl leading-relaxed">
                {sentence}
              </p>
              <p className="text-xs sm:text-sm text-foreground/50 mt-2 sm:mt-3">{meta.sub}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border/20">
              {cert.intern_id && (
                <Detail icon={<BadgeCheck size={14} />} label="Intern ID" value={cert.intern_id} />
              )}
              <Detail icon={<Calendar size={14} />} label="Start Date" value={formatDate(cert.start_date)} />
              <Detail
                icon={<CalendarCheck size={14} />}
                label="End Date"
                value={cert.end_date ? formatDate(cert.end_date) : status === "working" ? "Present" : "—"}
              />
            </div>

            {/* Social / links + stamp */}
            {(cert.linkedin || cert.github) && (
              <div className="px-5 sm:px-8 md:px-14 py-6 sm:py-8 border-t border-border/30 flex flex-wrap items-center justify-between gap-5">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {cert.linkedin && (
                    <a
                      href={cert.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition"
                    >
                      <Linkedin size={14} /> LinkedIn Profile
                    </a>
                  )}
                  {cert.github && (
                    <a
                      href={cert.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition"
                    >
                      <Github size={14} /> GitHub Profile
                    </a>
                  )}
                </div>
                <img
                  src={stamp}
                  alt="SnapWeaz Official Stamp"
                  loading="lazy"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-90 select-none pointer-events-none ml-auto -rotate-6 drop-shadow-[0_0_18px_rgba(248,167,145,0.25)]"
                  draggable={false}
                />
              </div>
            )}

            {/* Notes */}
            {cert.body && (
              <div className="px-5 sm:px-8 md:px-14 py-6 sm:py-8 border-t border-border/30">
                <p className="text-[10px] sm:text-xs text-foreground/50 uppercase tracking-[0.3em] mb-2 sm:mb-3">Notes</p>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">{cert.body}</p>
              </div>
            )}

            {/* PDF download */}
            {cert.certificate_pdf && (
              <div className="px-5 sm:px-8 md:px-14 py-7 sm:py-10 border-t border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-[10px] sm:text-xs text-foreground/50 uppercase tracking-[0.3em]">Certificate Document</p>
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

            {/* Footer with UDYAM in the middle */}
            <div className="px-5 sm:px-8 md:px-14 py-4 sm:py-6 border-t border-border/30 grid grid-cols-3 items-center gap-2 text-[10px] sm:text-xs text-foreground/50">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <ShieldCheck size={12} className="text-accent shrink-0" />
                <span className="truncate">
                  Verified {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="text-center font-mono tracking-[0.15em] text-foreground/70 text-[9px] sm:text-[11px] whitespace-nowrap">
                {UDYAM}
              </div>
              <Link to="/" className="justify-self-end hover:text-foreground transition">
                snapweaz.com
              </Link>
            </div>
          </motion.article>
        </div>
      </main>
      <Footer hideCta />
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
  <div className="bg-background/40 px-5 sm:px-8 md:px-10 py-5 sm:py-6">
    <div className="flex items-center gap-2 text-[10px] text-foreground/50 uppercase tracking-[0.3em] mb-1.5 sm:mb-2">
      {icon} {label}
    </div>
    <p className="text-foreground/90 text-sm sm:text-base">{value}</p>
  </div>
);

export default Certificate;
