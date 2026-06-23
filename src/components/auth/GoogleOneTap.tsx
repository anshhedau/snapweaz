import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const GOOGLE_CLIENT_ID =
  "174465739964-5ptaies7jf0ddo0v23m1e139uot1lgh6.apps.googleusercontent.com";

declare global {
  interface Window {
    google?: any;
    __googleOneTapInit?: boolean;
  }
}

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomNonce(len = 32) {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const GoogleOneTap = () => {
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) return;

        const nonce = randomNonce();
        const hashedNonce = await sha256(nonce);

        await new Promise<void>((resolve, reject) => {
          if (window.google?.accounts?.id) return resolve();
          const existing = document.querySelector<HTMLScriptElement>(
            'script[src="https://accounts.google.com/gsi/client"]',
          );
          if (existing) {
            existing.addEventListener("load", () => resolve());
            existing.addEventListener("error", () => reject());
            return;
          }
          const s = document.createElement("script");
          s.src = "https://accounts.google.com/gsi/client";
          s.async = true;
          s.defer = true;
          s.onload = () => resolve();
          s.onerror = () => reject();
          document.head.appendChild(s);
        });

        if (cancelled || !window.google?.accounts?.id) return;
        if (window.__googleOneTapInit) return;
        window.__googleOneTapInit = true;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          nonce: hashedNonce,
          auto_select: false,
          cancel_on_tap_outside: false,
          use_fedcm_for_prompt: true,
          callback: async (response: { credential: string }) => {
            try {
              await supabase.auth.signInWithIdToken({
                provider: "google",
                token: response.credential,
                nonce,
              });
            } catch (e) {
              // silent
            }
          },
        });

        window.google.accounts.id.prompt();
      } catch {
        // silent
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};
