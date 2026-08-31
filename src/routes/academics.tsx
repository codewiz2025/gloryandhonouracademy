import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import nursery from "@/assets/nursery.jpg";
import heroStudents from "@/assets/hero-students.jpg";
import science from "@/assets/science.jpg";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics & Programmes | Glory & Honour Academy" },
      {
        name: "description",
        content:
          "Nursery, primary, junior secondary, after school care and ICT & creative learning at Glory & Honour Academy.",
      },
      { property: "og:title", content: "Academics at Glory & Honour Academy" },
      {
        property: "og:description",
        content: "Nursery to junior secondary, plus after school care and ICT & creative learning.",
      },
    ],
  }),
  component: Academics,
});

const PROGRAMMES = [
  {
    name: "Nursery",
    image: nursery,
    body: "Play-led early years learning: phonics, numbers, songs and social skills in a warm, closely supervised setting.",
    points: ["Ages 2–5", "Low pupil-to-teacher ratio", "Daily reading and creative play"],
  },
  {
    name: "Primary",
    image: heroStudents,
    body: "A firm academic foundation with continuous assessment, a strong reading culture and weekly character lessons.",
    points: ["Basic 1–6", "English, Maths, Science, Social Studies", "Clubs, sports and cultural day"],
  },
  {
    name: "Junior Secondary",
    image: science,
    body: "Rigorous preparation for BECE with practical science, languages and guided study time.",
    points: ["JSS 1–3", "Laboratory and ICT practicals", "Termly parent–teacher reviews"],
  },
];

const EXTRAS = [
  { title: "After school care", body: "Supervised homework, snacks and safe play for parents who close late." },
  { title: "ICT & creative learning", body: "Computer literacy, typing, coding basics, art and music." },
];

function Academics() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="What we offer"
        title="Academics"
        lead="A full learning pathway from the first day of nursery to the end of junior secondary — with support that continues after the closing bell."
      />

      <section className="mx-auto max-w-6xl space-y-16 px-5 py-20">
        {PROGRAMMES.map((p, i) => (
          <article key={p.name} className="grid items-center gap-10 md:grid-cols-2">
            <img
              src={p.image}
              alt={p.name}
              width={1024}
              height={768}
              loading="lazy"
              className={`rounded-xl object-cover shadow-lg ${i % 2 ? "md:order-2" : ""}`}
            />
            <div>
              <h2 className="font-display text-3xl uppercase tracking-tight text-navy">{p.name}</h2>
              <p className="mt-4 text-muted-foreground">{p.body}</p>
              <ul className="mt-6 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl uppercase tracking-tight text-navy">Beyond the classroom</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {EXTRAS.map((e) => (
              <div key={e.title} className="rounded-xl border-t-4 border-gold bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg uppercase tracking-wide text-navy">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/admissions"
            className="mt-10 inline-block rounded-md bg-navy px-6 py-3 font-display text-sm uppercase tracking-widest text-navy-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            Start an application
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
