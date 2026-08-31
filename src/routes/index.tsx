import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PHONES } from "@/components/site-layout";
import crest from "@/assets/crest.png";
import heroStudents from "@/assets/hero-students.jpg";
import nursery from "@/assets/nursery.jpg";
import science from "@/assets/science.jpg";
import campus from "@/assets/campus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glory & Honour Academy | Raising Godly Leaders" },
      {
        name: "description",
        content:
          "A nursery, primary and junior secondary school where learning meets purpose and character is built. Enrol your child today.",
      },
      { property: "og:title", content: "Glory & Honour Academy | Raising Godly Leaders" },
      {
        property: "og:description",
        content: "Where learning meets purpose and character is built — nursery, primary and junior secondary.",
      },
    ],
  }),
  component: Index,
});

const REASONS = [
  { title: "Qualified & dedicated teachers", body: "Experienced educators who know each child by name and track their progress closely." },
  { title: "Conducive learning environment", body: "Safe, airy classrooms and well-kept grounds designed for focus and play." },
  { title: "Integrity, discipline & excellence", body: "Character formation runs through every lesson, assembly and club." },
  { title: "Academic excellence with moral values", body: "Strong results built on a foundation of faith, respect and responsibility." },
];

const PROGRAMMES = [
  { name: "Nursery", image: nursery, body: "Play-led early years learning for our youngest pupils." },
  { name: "Primary", image: heroStudents, body: "A firm foundation in literacy, numeracy and curiosity." },
  { name: "Junior Secondary", image: science, body: "Sciences, humanities and languages taught with rigour." },
];

function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:py-16">
          <div className="flex items-center gap-5">
            <img src={crest} alt="Glory & Honour Academy crest" width={120} height={138} className="h-24 w-auto shrink-0 object-contain" />
            <h1 className="font-display text-4xl uppercase leading-[0.9] tracking-tight md:text-6xl">
              Glory <span className="text-gold">&</span> Honour
              <span className="mt-2 block text-sm tracking-[0.45em] text-navy-foreground/80">Academy</span>
            </h1>
          </div>
          <div>
            <p className="font-serif text-xl italic text-gold md:text-2xl">
              Raising Godly Leaders, Building a Better Tomorrow.
            </p>
            <p className="mt-3 max-w-md text-sm text-navy-foreground/75">
              A nursery, primary and junior secondary school where learning meets purpose and character is built.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/admissions"
                className="rounded-md bg-gold px-6 py-3 font-display text-sm uppercase tracking-widest text-gold-foreground transition-opacity hover:opacity-90"
              >
                Apply for admission
              </Link>
              <a
                href={`tel:${PHONES[0]}`}
                className="rounded-md border border-navy-foreground/40 px-6 py-3 font-display text-sm uppercase tracking-widest transition-colors hover:border-gold hover:text-gold"
              >
                Call {PHONES[0]}
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold/40" aria-hidden="true" />
              <img
                src={heroStudents}
                alt="Pupils of Glory & Honour Academy studying in class"
                width={1600}
                height={1100}
                className="relative h-56 w-full rounded-[1.75rem] object-cover shadow-2xl md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-display text-xs uppercase tracking-[0.45em] text-gold">Why choose us?</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl uppercase leading-tight tracking-tight text-navy md:text-4xl">
          Nurturing minds. Inspiring futures.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.title} className="hover-lift rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg uppercase tracking-wide text-navy">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl uppercase tracking-tight text-navy md:text-4xl">We offer</h2>
            <Link to="/academics" className="font-display text-sm uppercase tracking-widest text-navy underline decoration-gold decoration-2 underline-offset-4">
              See all programmes
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {PROGRAMMES.map((p) => (
              <article key={p.name} className="hover-lift group overflow-hidden rounded-xl bg-card shadow-sm">
                <img src={p.image} alt={p.name} width={1024} height={768} loading="lazy" className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="border-t-4 border-gold p-6">
                  <h3 className="font-display text-xl uppercase tracking-wide text-navy">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <img src={campus} alt="Glory & Honour Academy campus" width={1024} height={768} loading="lazy" className="rounded-xl object-cover shadow-lg" />
        <div>
          <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-navy md:text-4xl">
            Where learning meets purpose and <span className="text-gold">character is built</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            From nursery through junior secondary, our pupils grow in knowledge and in conduct. After school care and ICT
            & creative learning round out a day that keeps every child engaged, supervised and inspired.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block rounded-md bg-navy px-6 py-3 font-display text-sm uppercase tracking-widest text-navy-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            About the academy
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
