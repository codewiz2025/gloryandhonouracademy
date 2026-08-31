import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import campus from "@/assets/campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Glory & Honour Academy" },
      {
        name: "description",
        content:
          "Our mission, vision and values: academic excellence rooted in integrity, discipline and faith at Glory & Honour Academy.",
      },
      { property: "og:title", content: "About Glory & Honour Academy" },
      {
        property: "og:description",
        content: "Academic excellence rooted in integrity, discipline and faith.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  { title: "Integrity", body: "We teach children to be truthful when no one is watching." },
  { title: "Discipline", body: "Order, punctuality and respect shape the rhythm of school life." },
  { title: "Excellence", body: "Good is never good enough where a child's potential is concerned." },
  { title: "Faith", body: "Godly principles guide our conduct, our teaching and our care." },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About the academy"
        title="A school with a purpose"
        lead="Glory & Honour Academy exists to raise godly leaders — children who are academically strong, morally grounded and ready for the world ahead of them."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-tight text-navy">Our mission</h2>
          <p className="mt-4 text-muted-foreground">
            To provide a conducive, well-resourced learning environment where every pupil is known, stretched and
            supported by qualified, dedicated teachers — and where character is taught as deliberately as any subject.
          </p>
          <h2 className="mt-10 font-display text-2xl uppercase tracking-tight text-navy">Our vision</h2>
          <p className="mt-4 text-muted-foreground">
            To be a school whose graduates are recognised anywhere for their competence and their conduct: nurturing
            minds and inspiring futures, one child at a time.
          </p>
        </div>
        <img
          src={campus}
          alt="The academy campus"
          width={1024}
          height={768}
          loading="lazy"
          className="rounded-xl object-cover shadow-lg"
        />
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl uppercase tracking-tight text-navy">Core values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border-t-4 border-gold bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg uppercase tracking-wide text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="font-serif text-2xl italic leading-relaxed text-navy">
          “We do not simply prepare children for examinations. We prepare them for life — to be honest, diligent and
          kind wherever they find themselves.”
        </p>
        <p className="mt-6 font-display text-sm uppercase tracking-[0.3em] text-gold">The Head Teacher</p>
      </section>
    </SiteLayout>
  );
}
