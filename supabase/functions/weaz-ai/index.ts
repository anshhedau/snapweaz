import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

const requestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  path: z.string().trim().max(120).optional().default("/"),
  history: z.array(messageSchema).max(8).optional().default([]),
});

const SYSTEM_PROMPT = `You are Weaz AI, the helpful website assistant for SnapWeaz.

Your job:
- Help visitors explore SnapWeaz clearly and confidently.
- Explain what SnapWeaz does, which services fit their needs, and where to go on the site.
- Encourage qualified visitors to contact the team when they want to start a project or ask for custom guidance.

Brand facts:
- SnapWeaz is a creative technology studio.
- Tagline: Design · Engineering · Innovation.
- Based in India and serving clients globally.
- Contact email: info@snapweaz.in.
- Response time: usually within 24 hours.

What visitors can explore:
- /about: studio story, values, timeline.
- /services: Brand & Identity Design, UI/UX Design, Web & Software Development, Growth & Marketing.
- /divisions: six specialized divisions including design, software, cloud, growth, ops, and ventures.
- /work: selected client and project work.
- /blog and /press: updates and news.
- /founder: founder information.
- /contact: project inquiries and general contact.

Services summary:
- Brand & Identity Design: logo and visual identity, brand guidelines, collateral, packaging.
- UI/UX Design: user research, wireframes, prototypes, visual design, design systems.
- Web & Software Development: web apps, mobile apps, API development, cloud infrastructure.
- Growth & Marketing: digital marketing, SEO and content, analytics, campaign management.

About summary:
- SnapWeaz believes design and engineering should work together from day one.
- The studio has grown into a full-service creative technology studio with six specialized divisions.

Rules:
- Be warm, concise, practical, and natural.
- Write in plain text only. Do not use markdown, bullets, asterisks, bold formatting, headings, or symbols like *, -, #, or ** unless the visitor explicitly asks for a list.
- Sound like a helpful human guide. Use simple words and short sentences.
- Prefer one short paragraph. Use at most two short paragraphs if needed.
- Use only the information provided here and the conversation context.
- If something is not clear or not on the site, say so honestly and suggest contacting the team.
- Never invent pricing, project timelines, or guarantees.
- When useful, mention the most relevant page path naturally in the sentence.
- If the visitor seems ready to hire, collaborate, or ask for a quote, guide them to /contact.
- Keep most answers under 160 words.`;

const projectIntentPatterns = /(start|project|quote|hire|work with|collaborate|contact|consult|estimate|budget)/i;
const serviceIntentPatterns = /(service|design|branding|ui|ux|website|web app|mobile app|software|growth|marketing|seo)/i;
const workIntentPatterns = /(work|portfolio|case study|projects|clients)/i;
const aboutIntentPatterns = /(about|founder|team|story|who are you)/i;

function getCtaForMessage(message: string) {
  if (projectIntentPatterns.test(message)) {
    return { label: "Start your project", href: "/contact" };
  }

  if (workIntentPatterns.test(message)) {
    return { label: "See our work", href: "/work" };
  }

  if (serviceIntentPatterns.test(message)) {
    return { label: "Explore services", href: "/services" };
  }

  if (aboutIntentPatterns.test(message)) {
    return { label: "Learn about SnapWeaz", href: "/about" };
  }

  return { label: "Contact SnapWeaz", href: "/contact" };
}

function getSuggestionsForMessage(message: string) {
  if (projectIntentPatterns.test(message)) {
    return [
      "What should I include before contacting SnapWeaz?",
      "Which SnapWeaz service fits my idea best?",
      "How fast does SnapWeaz usually reply?",
    ];
  }

  if (serviceIntentPatterns.test(message)) {
    return [
      "Which SnapWeaz service fits my business?",
      "Can SnapWeaz handle both design and development?",
      "Show me where to see SnapWeaz work.",
    ];
  }

  if (workIntentPatterns.test(message)) {
    return [
      "What kind of projects does SnapWeaz do?",
      "Which page shows recent SnapWeaz work?",
      "How do I contact SnapWeaz about a similar project?",
    ];
  }

  return [
    "What services does SnapWeaz offer?",
    "Which SnapWeaz team is right for my project?",
    "How do I start a project with SnapWeaz?",
  ];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body = requestSchema.safeParse(await req.json());
    if (!body.success) {
      return new Response(JSON.stringify({ error: body.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { history, message, path } = body.data;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `Current page path: ${path}` },
          ...history,
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please top up your workspace credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw new Error(`AI gateway error [${response.status}]: ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("AI gateway returned an empty response");
    }

    return new Response(
      JSON.stringify({
        reply,
        cta: getCtaForMessage(message),
        suggestions: getSuggestionsForMessage(message),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("weaz-ai error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
