"use client";

import Link from "next/link";
import Image from "next/image";
import type { Photo } from "@/data/photos.generated";
import Reveal from "@/components/animations/Reveal";

export default function GalleryPreview({ photos }: { photos: Photo[] }) {
  const preview = photos.slice(0, 6);
  return (
    <section className="container-wide section-padding" aria-label="Gallery preview">
      <Reveal>
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="eyebrow">Index</p>
            <h2 className="display-hero text-5xl md:text-7xl mt-3">
              The full archive
            </h2>
          </div>
          <Link
            href="/gallery"
            className="link-hover text-[12px] uppercase tracking-[0.22em]"
          >
            Open gallery →
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {preview.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              href={`/moments/${p.slug}`}
              className="group block relative aspect-[4/5] overflow-hidden bg-black/40"
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.22em] text-bone/80">
                {String(i + 1).padStart(2, "0")} · {p.title}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
