"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Photo } from "@/data/photos.generated";
import GalleryLightbox from "./GalleryLightbox";

const ease = [0.16, 1, 0.3, 1] as const;

export default function GalleryClient({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4"
      >
        {photos.map((p, i) => (
          <li key={p.slug}>
            <motion.button
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease, delay: (i % 8) * 0.04 }}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-black/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label={`Open ${p.title}`}
              data-cursor="hover"
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                quality={75}
                className="object-cover transition-transform duration-[1000ms] ease-editorial group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-[10px] uppercase tracking-[0.22em] text-bone/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {p.title}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onIndex={setIndex}
      />
    </>
  );
}
