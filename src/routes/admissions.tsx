import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, PHONES, EMAIL } from "@/components/site-layout";
import { EnquiryForm } from "@/components/enquiry-form";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions | Glory & Honour Academy" },
      {
        name: "description",
        content:
          "How to enrol at Glory & Honour Academy: application steps, requirements for each level and an enquiry form for parents.",
      },
      { property: "og:title", content: "Admissions at Glory & Honour Academy" },
      { property: "og:description", content: "Application steps, requirements and enquiries for new pupils." },
    ],
  }),
  component: Admissions,
});

const STEPS = [
  { n: "01", title: "Enquire", body: "Call us or send the enquiry form. We will answer your questions and share current fees." },
  { n: "02", title: "Visit & assess", body: "Tour the school and book a short placement assessment for your child." },
  { n: "03", title: "Enrol", body: "Complete the admission form, pay the term's fees and collect the resumption checklist." },
];

const REQUIREMENTS = [
  { level: "Nursery", items: ["Birth certificate or age declaration", "2 passport photographs", "Immunisation record"] },
  { level: "Primary", items: ["Birth certificate", "Last report card from previous school", "2 passport photographs"] },
  { level: "Junior Secondary", items: ["Primary 6 result / transfer certificate", "Birth certificate", "2 passport photographs"] },
];

function Admissions() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Admissions"
        title="Join the academy"
        lead="Admission is open for nursery, primary and junior secondary. Places are limited each term so that classes stay small."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl uppercase tracking-tight text-navy">How to apply</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <span className="font-display text-4xl text-gold">{s.n}</span>
              <h3 className="mt-3 font-display text-lg uppercase tracking-wide text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl uppercase tracking-tight text-navy">What to bring</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REQUIREMENTS.map((r) => (
              <div key={r.level} className="rounded-xl border-t-4 border-gold bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg uppercase tracking-wide text-navy">{r.level}</h3>
                <ul className="mt-3 space-y-2">
                  {r.items.map((i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Fees vary by level and are reviewed each session. Call{" "}
            <a href={`tel:${PHONES[0]}`} className="font-semibold text-navy underline">
              {PHONES[0]}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-navy underline">
              {EMAIL}
            </a>{" "}
            for the current fee schedule.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <EnquiryForm title="Admission enquiry" />
      </section>
    </SiteLayout>
  );
}
