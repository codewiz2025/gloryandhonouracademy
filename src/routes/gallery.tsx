import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import heroStudents from "@/assets/hero-students.jpg";
import nursery from "@/assets/nursery.jpg";
import science from "@/assets/science.jpg";
import campus from "@/assets/campus.jpg";
import playground from "@/assets/gallery-playground.jpg";
import library from "@/assets/gallery-library.jpg";
import arts from "@/assets/gallery-arts.jpg";
import assembly from "@/assets/gallery-assembly.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Glory & Honour Academy" },
      {
        name: "description",
        content:
          "Photo gallery of life at Glory & Honour Academy — classrooms, library, science, ICT, arts and assembly.",
      },
      { property: "og:title", content: "Gallery | Glory & Honour Academy" },
      {
        property: "og:description",
        content: "A look inside classrooms, the library, science lab, arts and assembly at the academy.",
      },
    ],
  }),
  component: Gallery,
});

const PHOTOS = [
  { src: heroStudents, alt: "Pupils studying together in class", caption: "In the classroom" },
  { src: playground, alt: "Children playing in the schoolyard during recess", caption: "Recess & play" },
  { src: library, alt: "Children reading in the school library", caption: "Library time" },
  { src: science, alt: "Pupils in a science lesson", caption: "Science lab" },
  { src: arts, alt: "Pupils painting and drawing in art class", caption: "Creative arts" },
  { src: assembly, alt: "Pupils lined up for morning assembly", caption: "Morning assembly" },
  { src: nursery, alt: "Nursery pupils at play-based learning", caption: "Nursery" },
  { src: campus, alt: "The academy campus", caption: "Our campus" },
];

function Gallery() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="A look inside"
        lead="Moments from classrooms, the library, the lab and assembly — a glimpse of everyday life at the academy."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-gold" />
          <p className="font-display text-xs uppercase tracking-[0.45em] text-gold">Campus life</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.caption} delay={i * 70}>
              <figure className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="border-t-2 border-gold px-4 py-3 font-display text-xs uppercase tracking-widest text-navy">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
