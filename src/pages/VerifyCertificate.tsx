import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, ShieldAlert, ArrowRight, Mail, ArrowLeft, Loader2 } from "lucide-react";
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

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

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
      setInfo(`A 6-digit code was sent to ${maskEmail(c.email!)}.`);
      setCooldown(45);
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
      // No email on file — allow direct view (fallback so admins can still verify).
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
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] text-accent uppercase tracking-[0.25em] mb-6">
              <ShieldCheck size={12} /> Certificate Verification
            </div>

            <AnimatePresence mode="wait">
              {step === "search" && (
                <motion.form
                  key="search"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={onSearch}
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
                    disabled={loading}
                    className="bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-xl h-auto px-6 py-3.5 group"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (<>Verify <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" /></>)}
                  </Button>
                </motion.form>
              )}

              {step === "otp" && cert && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-border/40 bg-secondary/30 backdrop-blur-xl p-6 sm:p-8 text-left shadow-[0_0_60px_-25px_hsl(var(--accent)/0.5)]"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <Mail size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-[0.25em]">Step 2 of 2</p>
                      <p className="text-foreground font-medium">Enter the code we emailed you</p>
                    </div>
                  </div>

                  <form onSubmit={onVerify} className="flex flex-col sm:flex-row gap-3">
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
                      placeholder="000000"
                      autoFocus
                      className="flex-1 bg-background/60 border border-border/40 rounded-xl px-4 py-3.5 outline-none text-foreground placeholder:text-foreground/30 font-mono tracking-[0.5em] text-center text-lg"
                    />
                    <Button
                      type="submit"
                      disabled={loading || code.length !== 6}
                      className="bg-accent text-accent-foreground hover:opacity-90 hover:text-accent-foreground rounded-xl h-auto px-6 py-3.5"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : (<>Confirm <ArrowRight size={16} className="ml-2" /></>)}
                    </Button>
                  </form>

                  <div className="flex items-center justify-between gap-3 mt-5 text-xs">
                    <button
                      onClick={() => {
                        setStep("search");
                        setCode("");
                        setCert(null);
                        setError(null);
                        setInfo(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition"
                    >
                      <ArrowLeft size={12} /> Change ID
                    </button>
                    <button
                      disabled={cooldown > 0 || loading}
                      onClick={() => sendOtp(cert)}
                      className="text-foreground/60 hover:text-foreground transition disabled:opacity-40"
                    >
                      {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {info && !error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 inline-flex items-start gap-3 text-left rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-foreground/80"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{info}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 inline-flex items-start gap-3 text-left rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-300"
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyCertificate;
