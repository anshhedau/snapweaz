CREATE TABLE public.cert_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id text NOT NULL,
  intern_id text NOT NULL,
  code_hash text NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL,
  used boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.cert_otps TO service_role;
ALTER TABLE public.cert_otps ENABLE ROW LEVEL SECURITY;
CREATE INDEX cert_otps_lookup_idx ON public.cert_otps (certificate_id, created_at DESC);
CREATE INDEX cert_otps_intern_idx ON public.cert_otps (intern_id, created_at DESC);