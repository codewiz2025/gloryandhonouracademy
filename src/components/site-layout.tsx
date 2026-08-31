import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, MapPin, Sparkles } from "lucide-react";
import crest from "@/assets/crest.png";
import { FloatingDock } from "./floating-dock";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/gallery", label: "Gallery" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
] as const;

export const PHONES = ["08060063814", "07044655635"];
export const EMAIL = "glory.honour.academy@gmail.com";
export const MAP_URL = "https://maps.app.goo.gl/1t7aGqJhx5dQ6bXy9";

function NoticeBar() {
  return (
    <div className="overflow-hidden border-b border-gold/30 bg-gold text-gold-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
        <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse" />
        <span className="animate-fade-in truncate">
          Demo website — this site is not sold yet · built by JayTech
        </span>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-gold bg-navy text-navy-foreground">
      <NoticeBar />
      <div
        className={`mx-auto flex max-w-6xl items-center gap-3 px-5 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-navy-foreground/25 transition-all duration-300 hover:scale-105 hover:border-gold hover:text-gold active:scale-95 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="group flex flex-1 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={crest}
            alt="Glory & Honour Academy crest"
            width={48}
            height={48}
            className={`object-contain transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 ${
              scrolled ? "h-10 w-10" : "h-12 w-12"
            }`}
          />
          <span className="leading-none">
            <span className="block font-display text-lg tracking-wide uppercase">
              Glory <span className="text-gold">&</span> Honour
            </span>
            <span className="block text-[0.65rem] tracking-[0.4em] uppercase text-gold">Academy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold after:scale-x-100" }}
              className="relative font-display text-sm uppercase tracking-widest transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-gold hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${PHONES[0]}`}
            className="flex items-center gap-2 rounded-md bg-gold px-4 py-2 font-display text-xs uppercase tracking-widest text-gold-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Phone className="h-3.5 w-3.5" /> Call us
          </a>
        </nav>
      </div>

      {/* Left-side slide-in drawer (mobile) */}
      {open && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="animate-fade-only fixed inset-0 top-0 z-40 bg-navy/60 backdrop-blur-sm"
          />
          <div className="animate-slide-in-left fixed left-0 top-0 z-50 h-full w-72 max-w-[80vw] overflow-y-auto border-r-4 border-gold bg-navy shadow-2xl">
            <div className="flex items-center justify-between border-b border-navy-foreground/15 px-5 py-4">
              <span className="font-display text-sm uppercase tracking-[0.3em] text-gold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-navy-foreground/25 transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-gold bg-navy-foreground/5" }}
                  className="border-b border-navy-foreground/10 px-5 py-3.5 font-display text-sm uppercase tracking-widest transition-colors hover:bg-navy-foreground/5 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-b border-navy-foreground/10 px-5 py-3.5 font-display text-sm uppercase tracking-widest text-gold"
              >
                <MapPin className="h-4 w-4" /> Get directions
              </a>
              <a
                href={`tel:${PHONES[0]}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-5 py-3.5 font-display text-sm uppercase tracking-widest text-gold"
              >
                <Phone className="h-4 w-4" /> {PHONES[0]}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t-4 border-gold bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <img src={crest} alt="" width={72} height={72} loading="lazy" className="h-18 w-18 object-contain" />
          <p className="mt-4 max-w-xs font-serif text-lg italic text-gold">
            Raising Godly Leaders, Building a Better Tomorrow.
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Reach Us</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {PHONES.map((p) => (
              <li key={p}>
                <a href={`tel:${p}`} className="transition-colors hover:text-gold">
                  {p}
                </a>
              </li>
            ))}
            <li className="break-all">
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-gold">
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <MapPin className="h-4 w-4" /> View us on Google Maps
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-gold">Own this site</h2>
          <p className="mt-4 text-sm text-navy-foreground/75">
            This is a live demo built by JayTech and it's available for purchase. Want a polished site like this for your
            school or business? Let's talk.
          </p>
          <a
            href="https://jaytech26.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-md bg-gold px-4 py-2 font-display text-xs uppercase tracking-widest text-gold-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Contact JayTech
          </a>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15 px-5 py-5 text-center text-xs tracking-wide text-navy-foreground/70">
        © {new Date().getFullYear()} Glory & Honour Academy. Nurturing minds. Inspiring futures.
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingDock />
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl motion-safe:animate-float-slow"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="animate-fade-in font-display text-xs uppercase tracking-[0.45em] text-gold">{eyebrow}</p>
        <h1
          className="animate-fade-in mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        <p className="animate-fade-in mt-5 max-w-2xl text-navy-foreground/80" style={{ animationDelay: "160ms" }}>
          {lead}
        </p>
      </div>
    </section>
  );
}
