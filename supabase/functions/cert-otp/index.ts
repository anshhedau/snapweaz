import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const action = body?.action;

    if (action === "send") {
      const { certificate_id, intern_id, email, recipient_name } = body ?? {};
      if (!certificate_id || !intern_id || !isEmail(email)) {
        return json({ error: "Missing or invalid fields" }, 400);
      }

      // Rate limit: max 3 sends per certificate per 10 minutes
      const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { count } = await admin
        .from("cert_otps")
        .select("id", { count: "exact", head: true })
        .eq("certificate_id", certificate_id)
        .gte("created_at", tenMinAgo);
      if ((count ?? 0) >= 3) {
        return json({ error: "Too many requests. Please try again later." }, 429);
      }

      const code = String(Math.floor(100000 + Math.random() * 900000));
      const code_hash = await sha256(`${certificate_id}:${code}`);
      const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Invalidate any previous unused codes for this cert
      await admin
        .from("cert_otps")
        .update({ used: true })
        .eq("certificate_id", certificate_id)
        .eq("used", false);

      const { error: insErr } = await admin.from("cert_otps").insert({
        certificate_id,
        intern_id,
        code_hash,
        expires_at,
      });
      if (insErr) {
        console.error("insert error", insErr.message);
        return json({ error: "Could not create verification code" }, 500);
      }

      // Send via built-in transactional email
      const { error: sendErr } = await admin.functions.invoke("send-transactional-email", {
        body: {
          templateName: "cert-otp",
          recipientEmail: email,
          idempotencyKey: `cert-otp-${certificate_id}-${Date.now()}`,
          templateData: { code, name: recipient_name ?? "", expiresInMinutes: 10 },
        },
      });
      if (sendErr) {
        console.error("email send error", sendErr.message);
        return json({
          error: "Verification code created but email could not be sent. Email delivery may not be configured yet.",
        }, 502);
      }

      return json({ ok: true, message: "Verification code sent." });
    }

    if (action === "verify") {
      const { certificate_id, code } = body ?? {};
      if (!certificate_id || typeof code !== "string" || !/^\d{6}$/.test(code)) {
        return json({ error: "Invalid code" }, 400);
      }

      const code_hash = await sha256(`${certificate_id}:${code}`);
      const { data, error } = await admin
        .from("cert_otps")
        .select("id, expires_at, used, attempts")
        .eq("certificate_id", certificate_id)
        .eq("code_hash", code_hash)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("verify lookup", error.message);
        return json({ error: "Verification failed" }, 500);
      }
      if (!data) {
        return json({ error: "Incorrect code" }, 400);
      }
      if (data.used) return json({ error: "Code already used" }, 400);
      if (new Date(data.expires_at).getTime() < Date.now()) {
        return json({ error: "Code expired. Request a new one." }, 400);
      }
      if (data.attempts >= 5) {
        return json({ error: "Too many attempts" }, 429);
      }

      await admin.from("cert_otps").update({ used: true }).eq("id", data.id);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("unhandled", (e as Error).message);
    return json({ error: "Unexpected error" }, 500);
  }
});
