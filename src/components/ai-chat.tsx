import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Loader2, Mail } from "lucide-react";
import { EMAIL } from "./site-layout";

type Msg = { role: "user" | "assistant"; content: string };

const ESCALATE = "[[ESCALATE]]";

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi there! I'm HAGA AI, the Glory & Honour Academy assistant. Ask me about our programmes, school hours, admissions or how to find us.",
};

const SUGGESTIONS = [
  "What programmes do you offer?",
  "How do I apply for admission?",
  "What are your school hours?",
  "How do I get to the school?",
];

export function AiChatPanel({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m.content) }),
      });
      if (!response.ok || !response.body) {
        const detail = await response.text();
        setMessages([
          ...next,
          { role: "assistant", content: `${detail || "Something went wrong."}\n${ESCALATE}` },
        ]);
        return;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) {
        setMessages([
          ...next,
          { role: "assistant", content: `I couldn't reach an answer just now.\n${ESCALATE}` },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: `I'm having trouble connecting.\n${ESCALATE}` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg ${
        compact ? "h-[26rem]" : "h-[32rem]"
      }`}
    >
      <div className="flex items-center gap-3 border-b border-border bg-navy px-4 py-3 text-navy-foreground">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <Sparkles className="h-5 w-5" />
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm uppercase tracking-widest">Ask HAGA AI</p>
          <p className="text-[0.7rem] text-navy-foreground/70">AI assistant · replies in seconds</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => {
          const escalate = m.content.includes(ESCALATE);
          const text = m.content.replace(ESCALATE, "").trim();
          if (m.role === "assistant" && !text && busy && i === messages.length - 1) {
            return (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-gold" /> HAGA AI is typing…
              </div>
            );
          }
          return (
            <div key={i} className={`animate-fade-in ${m.role === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
                  m.role === "user"
                    ? "rounded-br-sm bg-navy text-navy-foreground"
                    : "rounded-bl-sm bg-secondary text-foreground"
                }`}
              >
                {text}
              </div>
              {escalate && (
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("Question from the website")}&body=${encodeURIComponent(lastUser)}`}
                  className="mt-2 inline-flex items-center gap-2 rounded-md border border-gold px-3 py-2 text-xs font-semibold uppercase tracking-widest text-navy transition-all hover:bg-gold hover:text-navy"
                >
                  <Mail className="h-3.5 w-3.5" /> Email this to the school
                </a>
              )}
            </div>
          );
        })}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5 hover:border-gold hover:text-navy"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-border p-3"
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Type your question…"
          className="max-h-24 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-shadow focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy text-navy-foreground transition-all hover:bg-gold hover:text-navy disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
