import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Loader2, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "ready" | "already" | "invalid" | "confirming" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      setMessage("This unsubscribe link is missing a token.");
      return;
    }
    (async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
        const res = await fetch(url, {
          headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string },
        });
        const data = await res.json();
        if (data?.valid) setState("ready");
        else if (data?.reason === "already_unsubscribed") setState("already");
        else {
          setState("invalid");
          setMessage(data?.error || "This link is invalid or has expired.");
        }
      } catch {
        setState("error");
        setMessage("Could not validate this link. Please try again.");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("confirming");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw new Error(error.message);
      if ((data as { success?: boolean })?.success) setState("done");
      else if ((data as { reason?: string })?.reason === "already_unsubscribed") setState("already");
      else {
        setState("error");
        setMessage((data as { error?: string })?.error || "Could not process unsubscribe.");
      }
    } catch (e) {
      setState("error");
      setMessage((e as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Unsubscribe" description="Manage your SnapWeaz email preferences." path="/unsubscribe" noindex />
      <Header />
      <main className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px]" />
        </div>
        <div className="container-wide relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center rounded-2xl border border-border/40 bg-secondary/30 backdrop-blur-xl p-8"
          >
            {state === "loading" && (
              <>
                <Loader2 className="mx-auto mb-4 text-accent animate-spin" />
                <p className="text-foreground/70">Checking your link…</p>
              </>
            )}
            {state === "ready" && (
              <>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 mb-5">
                  <ShieldCheck className="text-accent" />
                </div>
                <h1 className="font-serif text-3xl mb-3">Unsubscribe from emails</h1>
                <p className="text-foreground/60 mb-6">
                  Click below to confirm and stop receiving these emails from SnapWeaz.
                </p>
                <Button onClick={confirm} className="bg-accent text-accent-foreground hover:opacity-90 rounded-full">
                  Confirm unsubscribe
                </Button>
              </>
            )}
            {state === "confirming" && (
              <>
                <Loader2 className="mx-auto mb-4 text-accent animate-spin" />
                <p className="text-foreground/70">Processing…</p>
              </>
            )}
            {state === "done" && (
              <>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 mb-5">
                  <Check className="text-emerald-300" />
                </div>
                <h1 className="font-serif text-3xl mb-3">You're unsubscribed</h1>
                <p className="text-foreground/60 mb-6">You won't receive further emails from this list.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">Back to SnapWeaz</Link>
                </Button>
              </>
            )}
            {state === "already" && (
              <>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 mb-5">
                  <Check className="text-accent" />
                </div>
                <h1 className="font-serif text-3xl mb-3">Already unsubscribed</h1>
                <p className="text-foreground/60 mb-6">This email address is already opted out.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">Back to SnapWeaz</Link>
                </Button>
              </>
            )}
            {(state === "invalid" || state === "error") && (
              <>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 mb-5">
                  <ShieldAlert className="text-red-400" />
                </div>
                <h1 className="font-serif text-3xl mb-3">Link problem</h1>
                <p className="text-foreground/60 mb-6">{message}</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/">Back to SnapWeaz</Link>
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
