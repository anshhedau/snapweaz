import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, ShieldAlert, ArrowRight, Mail, ArrowLeft, Loader2, KeyRound, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { findCertificateByInternId, type Certificate } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

type Step = "search" | "otp";

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "your email";
  const visible = user.slice(0, Math.min(2, user.length));
  return `${visible}${"•".repeat(Math.max(1, user.length - 2))}@${domain}`;
}

const VerifyCertificate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("search");
  const [internId, setInternId] = useState("");
  const [cert, setCert] = useState<Certificate | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  useEffect(() => {
    if (expiresIn <= 0) return;
    const t = setInterval(() => setExpiresIn((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [expiresIn]);

  const sendOtp = async (c: Certificate) => {
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("cert-otp", {
        body: {
          action: "send",
          certificate_id: c.certificate_id,
          intern_id: c.intern_id,
          email: c.email,
          recipient_name: c.recipient_name,
        },
      });
      if (fnErr) throw new Error(fnErr.message || "Could not send code");
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      setInfo(`Code sent to ${maskEmail(c.email!)}. Valid for 2 minutes.`);
      setCooldown(45);
      setExpiresIn(120);
    } catch (e) {
      setError((e as Error).message || "Could not send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = internId.trim();
    setError(null);
    setInfo(null);
    if (!trimmed) return setError("Please enter your Intern ID.");
    const found = findCertificateByInternId(trimmed);
    if (!found) return setError(`No intern exists with the ID "${trimmed}".`);
    if (!found.email) {
      navigate(`/certificate/${found.certificate_id}`);
      return;
    }
    setCert(found);
    setStep("otp");
    await sendOtp(found);
  };

  const onVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!cert) return;
    setError(null);
    if (!/^\d{6}$/.test(code)) return setError("Enter the 6-digit code.");
    setLoading(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("cert-otp", {
        body: { action: "verify", certificate_id: cert.certificate_id, code },
      });
      if (fnErr) throw new Error(fnErr.message || "Verification failed");
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      navigate(`/certificate/${cert.certificate_id}`);
    } catch (err) {
      setError((err as Error).message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const mmss = `${String(Math.floor(expiresIn / 60)).padStart(1, "0")}:${String(expiresIn % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Verify Certificate"
        description="Verify a SnapWeaz internship certificate using your Intern ID."
        path="/verify"
      />
      <Header />
      <main className="section-dark relative overflow-hidden">
        {/* Layered ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] -left-40 w-[600px] h-[600px] rounded-full bg-accent/12 blur-[160px]" />
          <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-accent/[0.08] blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(hsl(var(--accent))_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <div className="container-wide relative z-10 pt-28 pb-20 sm:pt-36 md:pt-44 md:pb-32">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-12"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] text-accent uppercase tracking-[0.25em] mb-6">
                <ShieldCheck size={12} /> Certificate Verification
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-4">
                Verify your <span className="text-accent italic">certificate</span>
              </h1>
              <p className="text-sm sm:text-base text-foreground/60 max-w-lg mx-auto leading-relaxed">
                Enter the Intern ID printed on your certificate. We'll email a one-time code to confirm it's really you.
              </p>
            </motion.div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              <span className={step === "search" ? "text-accent" : ""}>1 · Search</span>
              <span className="w-6 h-px bg-border/60" />
              <span className={step === "otp" ? "text-accent" : ""}>2 · Verify</span>
            </div>

            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-[32px] bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-2xl opacity-60 pointer-events-none" />

              <AnimatePresence mode="wait">
                {step === "search" && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-[28px] border border-border/50 bg-gradient-to-b from-secondary/40 to-background/70 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_80px_-30px_hsl(var(--accent)/0.5)]"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <Search size={17} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-foreground/50 uppercase tracking-[0.25em]">Step 1</p>
                        <p className="text-foreground font-medium text-sm sm:text-base">Enter your Intern ID</p>
                      </div>
                    </div>

                    <form onSubmit={onSearch} className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={internId}
                          onChange={(e) => {
                            setInternId(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="e.g. SWi2026xxxx"
                          autoFocus
                          className="w-full bg-background/60 border border-border/50 rounded-2xl px-5 py-4 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition text-foreground placeholder:text-foreground/30 font-mono text-sm sm:text-base"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-2xl h-auto py-4 text-sm sm:text-base group"
                      >
                        {loading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            Continue <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-[11px] text-foreground/40 mt-5 flex items-center gap-1.5 justify-center">
                      <Sparkles size={11} className="text-accent/70" /> Your Intern ID is on your offer & certificate.
                    </p>
                  </motion.div>
                )}

                {step === "otp" && cert && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-[28px] border border-border/50 bg-gradient-to-b from-secondary/40 to-background/70 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_80px_-30px_hsl(var(--accent)/0.5)]"
                  >
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                          <KeyRound size={17} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-foreground/50 uppercase tracking-[0.25em]">Step 2</p>
                          <p className="text-foreground font-medium text-sm sm:text-base truncate">Enter the 6-digit code</p>
                        </div>
                      </div>
                      {expiresIn > 0 && (
                        <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-foreground/60 font-mono shrink-0">
                          Expires <span className="text-accent">{mmss}</span>
                        </div>
                      )}
                    </div>

                    <form onSubmit={onVerify} className="space-y-4">
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                          if (error) setError(null);
                        }}
                        placeholder="••••••"
                        autoFocus
                        className="w-full bg-background/60 border border-border/50 rounded-2xl px-4 py-5 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition text-foreground placeholder:text-foreground/20 font-mono tracking-[0.5em] sm:tracking-[0.7em] text-center text-2xl sm:text-3xl"
                      />
                      <Button
                        type="submit"
                        disabled={loading || code.length !== 6}
                        className="w-full bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-2xl h-auto py-4 text-sm sm:text-base"
                      >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : (<>Confirm <ArrowRight size={16} className="ml-2" /></>)}
                      </Button>
                    </form>

                    <div className="flex items-center justify-between gap-3 mt-5 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("search");
                          setCode("");
                          setCert(null);
                          setError(null);
                          setInfo(null);
                          setExpiresIn(0);
                        }}
                        className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition"
                      >
                        <ArrowLeft size={12} /> Change ID
                      </button>
                      <button
                        type="button"
                        disabled={cooldown > 0 || loading}
                        onClick={() => sendOtp(cert)}
                        className="text-foreground/60 hover:text-accent transition disabled:opacity-40"
                      >
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {info && !error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-3 text-left rounded-2xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-foreground/80"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{info}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-3 text-left rounded-2xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              >
                <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <p className="text-xs text-foreground/40 mt-10 text-center">
              Lost your Intern ID? Contact us at{" "}
              <a href="mailto:info@snapweaz.com" className="text-accent hover:underline">
                info@snapweaz.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer hideCta />
    </div>
  );
};

export default VerifyCertificate;
