import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDismissOnPointerDown } from "@/hooks/use-dismiss-on-pointer-down";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatResponse = {
  reply: string;
  cta?: {
    label: string;
    href: string;
  };
  suggestions?: string[];
};

const defaultSuggestions = [
  "What services does SnapWeaz offer?",
  "Which SnapWeaz team is right for my project?",
  "How do I start a project with SnapWeaz?",
  "Show me what makes SnapWeaz different.",
];

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I’m Weaz AI. I can help you explore SnapWeaz, understand services, answer common questions, and guide you to start a project.",
  },
];

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/divisions": "Divisions",
  "/work": "Work",
  "/contact": "Contact",
  "/careers": "Careers",
  "/blog": "Blog",
  "/press": "Press",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/founder": "Founder",
  "/sitemap": "Sitemap",
};

const routePattern = /(^|[\s(])((?:\/(?:[a-z0-9-]+)?)+(?:\/[a-z0-9-]+)*)(?=[$\s).,!?:;])/gi;

const getRouteLabel = (path: string) => {
  const normalizedPath = path.toLowerCase();
  return routeLabels[normalizedPath] ?? normalizedPath.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const renderMessageContent = (content: string) => {
  const elements: JSX.Element[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(routePattern)) {
    const fullMatch = match[0];
    const prefix = match[1] ?? "";
    const path = match[2];
    const matchIndex = match.index ?? 0;
    const pathIndex = matchIndex + prefix.length;

    if (matchIndex > lastIndex) {
      elements.push(
        <span key={`text-${lastIndex}`}>{content.slice(lastIndex, matchIndex)}</span>,
      );
    }

    if (prefix) {
      elements.push(<span key={`prefix-${pathIndex}`}>{prefix}</span>);
    }

    elements.push(
      <Link
        key={`link-${pathIndex}-${path}`}
        to={path}
        className="font-medium text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-foreground"
      >
        {getRouteLabel(path)}
      </Link>,
    );

    lastIndex = pathIndex + path.length;
    if (matchIndex + fullMatch.length > lastIndex) {
      lastIndex = matchIndex + fullMatch.length;
    }
  }

  if (lastIndex < content.length) {
    elements.push(<span key={`text-${lastIndex}`}>{content.slice(lastIndex)}</span>);
  }

  return elements.length > 0 ? elements : content;
};

export const WeazAI = () => {
  const location = useLocation();
  const endRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [cta, setCta] = useState<ChatResponse["cta"]>();
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);
  const dismissRefs = useMemo(() => [panelRef, triggerRef], []);
  const closePanel = useCallback(() => setIsOpen(false), []);

  useDismissOnPointerDown({
    enabled: isOpen,
    refs: dismissRefs,
    onDismiss: closePanel,
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const sendMessage = async (explicitMessage?: string) => {
    const content = (explicitMessage ?? input).trim();

    if (!content || isLoading) return;
    if (content.length > 500) {
      toast.error("Please keep your message under 500 characters.");
      return;
    }

    const nextUserMessage: ChatMessage = { role: "user", content };
    const nextHistory = [...messages, nextUserMessage];

    setMessages(nextHistory);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke<ChatResponse>("weaz-ai", {
        body: {
          message: content,
          path: location.pathname,
          history: messages.slice(-8),
        },
      });

      if (error) throw error;
      if (!data?.reply) throw new Error("Empty AI response");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setCta(data.cta);
      setSuggestions(data.suggestions?.length ? data.suggestions.slice(0, 4) : defaultSuggestions);
    } catch (error) {
      console.error("Weaz AI error:", error);
      toast.error("Weaz AI is unavailable right now. Please try again or contact SnapWeaz directly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            ref={panelRef}
            id="weaz-ai-panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-24 z-50 sm:inset-x-auto sm:right-5 sm:w-[24rem]"
            aria-label="Weaz AI chat panel"
          >
            <div className="relative flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-background/95 shadow-xl backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-warm opacity-10" />

              <div className="relative flex shrink-0 items-center justify-between border-b border-border/60 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl section-dark shadow-md">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-serif text-xl leading-none text-foreground">Weaz AI</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      SnapWeaz helper
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closePanel}
                  className="rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Close Weaz AI"
                >
                  <X size={16} />
                </button>
              </div>

              <div
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5"
              >
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={
                          message.role === "user"
                            ? "max-w-[85%] rounded-[1.5rem] rounded-br-md bg-accent px-4 py-3 text-sm leading-6 text-accent-foreground shadow-md"
                            : "max-w-[92%] rounded-[1.5rem] rounded-bl-md bg-secondary px-4 py-3 text-sm leading-6 text-foreground"
                        }
                      >
                        <p className="whitespace-pre-wrap">
                          {message.role === "assistant" ? renderMessageContent(message.content) : message.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="inline-flex items-center gap-2 rounded-[1.5rem] rounded-bl-md bg-secondary px-4 py-3 text-sm text-muted-foreground">
                        <Loader2 size={16} className="animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  )}

                  <div ref={endRef} />
                </div>
              </div>

              <div className="shrink-0 border-t border-border/60 px-5 py-4">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Quick actions
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void sendMessage(suggestion)}
                      disabled={isLoading}
                      className="rounded-full border border-border bg-secondary px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-accent hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {cta && (
                  <Link
                    to={cta.href}
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
                  >
                    {cta.label}
                    <ArrowUpRight size={16} />
                  </Link>
                )}

                <label
                  htmlFor="weaz-ai-input"
                  className="mb-2 block text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Ask Weaz AI
                </label>
                <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-background p-1 pl-2 focus-within:border-accent">
                  <Input
                    id="weaz-ai-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    maxLength={500}
                    placeholder="Type your question here..."
                    className="h-10 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
                    aria-label="Ask Weaz AI"
                  />
                  <Button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!canSend}
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-full"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </Button>
                </div>

                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Weaz AI shares SnapWeaz site guidance and can point you to the best next step.
                </p>
              </div>


      <div className="fixed bottom-5 right-5 z-50">
        <Button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          size="lg"
          className="group h-14 rounded-full px-5 shadow-xl"
          aria-expanded={isOpen}
          aria-controls="weaz-ai-panel"
        >
          <MessageSquare size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          Weaz AI
        </Button>
      </div>
    </>
  );
};

