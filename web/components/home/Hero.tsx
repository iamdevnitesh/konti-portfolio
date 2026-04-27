"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ease } from "@/lib/animations";
import { overlayStyleFromText } from "@/lib/utils";
import type { Photo } from "@/data/photos.generated";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Hero({ photo }: { photo: Photo }) {
  const isMobile = useIsMobile();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, (v) => `${v * 18}px`);
  const ty = useTransform(sy, (v) => `${v * 12}px`);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      mx.set(cx);
      my.set(cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, mx, my]);

  const overlay = overlayStyleFromText(photo.text);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
        style={{ x: tx, y: ty }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />
      </motion.div>

      <div className="relative z-10 container-wide flex h-full flex-col justify-between pt-28 pb-12 md:pt-32">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease }}
        >
          A cinematic archive — 2026
        </motion.p>

        <div
          className="absolute pointer-events-none"
          style={{
            left: overlay.left,
            top: overlay.top,
            transform: overlay.transform,
            textAlign: overlay.textAlign,
            color: overlay.color,
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.2, ease }}
            className="display-hero text-display"
          >
            {photo.title}
          </motion.h1>
          {photo.caption && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease }}
              className="mt-4 max-w-md text-sm md:text-base text-bone/80"
              style={{ marginInline: overlay.textAlign === "center" ? "auto" : undefined }}
            >
              {photo.caption}
            </motion.p>
          )}
        </div>

        <motion.div
          className="flex items-end justify-between text-[11px] uppercase tracking-[0.25em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span>{photo.category || "Portrait"}</span>
          <span className="flex items-center gap-3" aria-hidden>
            scroll
            <span className="block h-[1px] w-10 bg-muted/60" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
