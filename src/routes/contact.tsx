import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin, Navigation, Car, Bus, Sparkles } from "lucide-react";
import { SiteLayout, PageHeader, PHONES, EMAIL, MAP_URL } from "@/components/site-layout";
import { EnquiryForm } from "@/components/enquiry-form";
import { AiChatPanel } from "@/components/ai-chat";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions | Glory & Honour Academy" },
      {
        name: "description",
        content:
          "Call 08060063814 or 07044655635, email glory.honour.academy@gmail.com, chat with HAGA AI or get directions to Glory & Honour Academy.",
      },
      { property: "og:title", content: "Contact Glory & Honour Academy" },
      {
        property: "og:description",
        content: "Phone, email, school hours, directions and an AI assistant ready to answer your questions.",
      },
    ],
  }),
  component: Contact,
});

const STEPS = [
  {
    icon: Navigation,
    title: "Open the map",
    body: "Tap “Open in Google Maps” below — it launches turn-by-turn directions straight from your current location.",
  },
  {
    icon: Car,
    title: "Coming by car",
    body: "Follow the map to the school gate. Parking is available in front of the compound during drop-off and pick-up.",
  },
  {
    icon: Bus,
    title: "Coming by public transport",
    body: "Drop at the nearest junction shown on the map and walk to the gate — our security team will welcome you in.",
  },
  {
    icon: Phone,
    title: "Lost on the way?",
    body: "Call 08060063814 and we will guide you the rest of the way over the phone.",
  },
];

const CARDS = [
  { icon: Phone, label: "Phone", lines: PHONES, hrefs: PHONES.map((p) => `tel:${p}`) },
  { icon: Mail, label: "Email", lines: [EMAIL], hrefs: [`mailto:${EMAIL}`] },
  {
    icon: Clock,
    label: "School hours",
    lines: ["Mon – Fri, 7:30am – 3:00pm", "After school care until 5:30pm"],
  },
  {
    icon: MapPin,
    label: "Find us",
    lines: ["Open our location on Google Maps"],
    hrefs: [MAP_URL],
  },
];

function Contact() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        lead="Call, email, chat with our AI assistant or simply follow the directions below and visit us in person."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.label} delay={i * 90}>
              <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-navy">
                  <card.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-sm uppercase tracking-[0.25em] text-gold">{card.label}</h2>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {card.lines.map((line, j) => {
                    const href = card.hrefs?.[j];
                    return (
                      <li key={line} className="break-words">
                        {href ? (
                          <a
                            href={href}
                            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="text-navy transition-colors hover:text-gold"
                          >
                            {line}
                          </a>
                        ) : (
                          line
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.45em] text-gold">Visit us</p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-tight text-navy md:text-4xl">
              How to find the school
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <ol className="space-y-5">
                {STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm uppercase tracking-widest text-navy">
                        {i + 1}. {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 font-display text-sm uppercase tracking-widest text-navy-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-navy hover:shadow-xl"
              >
                <Navigation className="h-4 w-4" /> Open in Google Maps
              </a>
            </Reveal>

            <Reveal delay={120} className="order-1 lg:order-2">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border-4 border-gold shadow-xl"
              >
                <iframe
                  title="Map showing the location of Glory & Honour Academy"
                  src="https://www.google.com/maps?q=Masters+Lodge&ftid=0x104e73d20ce411df:0x84b81969af9aff0d&ll=8.988046,7.3605062&z=17&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full border-0 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-navy/90 px-4 py-2 font-display text-xs uppercase tracking-widest text-navy-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <MapPin className="h-4 w-4 text-gold" /> Tap for directions
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <p className="font-display text-xs uppercase tracking-[0.45em] text-gold">Instant answers</p>
          </div>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-tight text-navy">Chat with our AI assistant</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            HAGA AI answers questions about programmes, admissions, hours and directions around the clock. Anything it
            cannot answer can be sent straight to our admissions inbox in one tap.
          </p>
          <div className="mt-6">
            <AiChatPanel />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </section>
    </SiteLayout>
  );
}
