"use client";

import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/data/photos.generated";
import { overlayStyleFromText } from "@/lib/utils";
import Reveal from "@/components/animations/Reveal";

export default function ClosingSection({ photo }: { photo: Photo }) {
  const overlay = overlayStyleFromText(photo.text);
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/80" />

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
          <p className="display-hero text-4xl md:text-6xl max-w-3xl">
            {photo.title}
          </p>
        </Reveal>
      </div>

      <div className="absolute bottom-10 inset-x-0 flex items-center justify-between container-wide text-[11px] uppercase tracking-[0.25em] text-bone/70">
        <Link href="/gallery" className="link-hover">
          See the archive
        </Link>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="link-hover"
        >
          Back to top ↑
        </button>
      </div>
    </section>
  );
}
