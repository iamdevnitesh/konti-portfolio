import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { galleryPhotos, allPhotos } from "@/data/photos.generated";
import { nextPhoto, prevPhoto, overlayStyleFromText } from "@/lib/utils";
import Reveal from "@/components/animations/Reveal";

export function generateStaticParams() {
  return allPhotos.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const photo = allPhotos.find((p) => p.slug === params.slug);
  if (!photo) return { title: "Moment — konti" };
  return {
    title: `${photo.title} — konti`,
    description: photo.caption || `${photo.title} · ${photo.category}`,
  };
}

export default function MomentPage({ params }: { params: { slug: string } }) {
  const photo = allPhotos.find((p) => p.slug === params.slug);
  if (!photo) notFound();

  // Use the gallery list as nav scope (or the section the photo belongs to).
  const nav = galleryPhotos.length ? galleryPhotos : allPhotos;
  const inNav = nav.find((p) => p.slug === photo.slug) ? nav : allPhotos;
  const prev = prevPhoto(inNav, photo.slug);
  const next = nextPhoto(inNav, photo.slug);
  const overlay = overlayStyleFromText(photo.text);

  return (
    <article className="bg-ink">
      <section className="relative h-[100svh] w-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/80 pointer-events-none" />
        <div
          className="absolute"
          style={{
            left: overlay.left,
            top: overlay.top,
            transform: overlay.transform,
            textAlign: overlay.textAlign,
            color: overlay.color,
          }}
        >
          <Reveal>
            <p className="eyebrow text-bone/80">
              {photo.category}
              {photo.date ? ` · ${photo.date}` : ""}
            </p>
            <h1 className="display-hero text-5xl md:text-8xl mt-4 max-w-3xl">
              {photo.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container-wide py-24 md:py-32 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4 text-[11px] uppercase tracking-[0.25em] text-muted space-y-3">
          <p>Filed under</p>
          <p className="text-bone">{photo.category || "Untitled"}</p>
          {photo.date && (
            <>
              <p className="pt-6">Year</p>
              <p className="text-bone">{photo.date}</p>
            </>
          )}
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <p className="display-hero text-3xl md:text-4xl text-bone/90 leading-snug max-w-3xl">
              {photo.caption ||
                "An ordinary scene, slowed down — soft fur, indifferent eyes, the quiet authority of a small creature."}
            </p>
          </Reveal>
        </div>
      </section>

      <nav
        className="container-wide pb-32 flex items-center justify-between border-t border-white/10 pt-10"
        aria-label="Moment navigation"
      >
        <Link
          href={`/moments/${prev.slug}`}
          className="group flex flex-col gap-2 link-hover"
        >
          <span className="eyebrow">← Previous</span>
          <span className="display-hero text-2xl md:text-4xl">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/moments/${next.slug}`}
          className="group flex flex-col gap-2 link-hover text-right items-end"
        >
          <span className="eyebrow">Next →</span>
          <span className="display-hero text-2xl md:text-4xl">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
