import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AiChatPanel } from "./ai-chat";
import jaytech from "@/assets/jaytech-logo.png";

export function FloatingDock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* AI assistant — bottom-left */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-3">
        {open && (
          <div className="pointer-events-auto w-[min(22rem,calc(100vw-2rem))] origin-bottom-left animate-scale-in">
            <AiChatPanel compact />
          </div>
        )}

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close AI assistant" : "Open AI assistant"}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-navy"
          >
            {!open && (
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" aria-hidden="true" />
            )}
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-navy px-2 py-1 text-xs uppercase tracking-widest text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100">
              Ask our AI
            </span>
          </button>
        </div>
      </div>

      {/* JayTech badge — bottom-right */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60]">
        <a
          href="https://jaytech26.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Built by JayTech — visit JayTech"
          className="group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-xl ring-1 ring-border transition-all duration-300 hover:scale-110 hover:ring-gold"
        >
          <img
            src={jaytech}
            alt="JayTech logo"
            width={56}
            height={56}
            className="h-12 w-12 rounded-full object-contain transition-transform duration-500 group-hover:rotate-6"
          />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-navy px-2 py-1 text-xs uppercase tracking-widest text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100">
            Built by JayTech
          </span>
        </a>
      </div>
    </>
  );
}
