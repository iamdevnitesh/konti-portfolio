"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Photo } from "@/data/photos.generated";
import { overlayStyleFromText } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedMoments({ photos }: { photos: Photo[] }) {
  const isMobile = useIsMobile(900);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Refs to the inner image wrappers (one per card) for the parallax pass.
  const imageRefs = useRef<HTMLDivElement[]>([]);
  imageRefs.current = [];
  const registerImage = (el: HTMLDivElement | null) => {
    if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el);
  };

  useEffect(() => {
    if (isMobile) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;

      // Main horizontal scroll: track translates left as user scrolls down.
      const mainTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Per-image parallax: each card's inner image translates within its
      // frame as the card moves through the viewport, so the photo "drifts"
      // independently of the card. This is the camillemormal-style depth
      // effect — image moves slower than its container.
      imageRefs.current.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: mainTween,
              start: "left right",
              end: "right left",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [isMobile, photos.length]);

  if (!photos.length) return null;

  return (
    <section
      id="moments"
      ref={sectionRef}
      className="relative bg-ink"
      aria-label="Featured moments"
    >
      <div className="container-wide pt-24 md:pt-32 pb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Featured · Moments</p>
          <h2 className="display-hero text-5xl md:text-7xl mt-3">
            Selected stills
          </h2>
        </div>
        <p className="hidden md:block text-sm text-muted max-w-xs">
          A short editorial sequence — scroll to drift through.
        </p>
      </div>

      {isMobile ? (
        <div className="container-wide grid gap-12 pb-10">
          {photos.map((p) => (
            <FeaturedCard key={p.slug} photo={p} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-[100svh] items-center gap-8 px-[8vw] will-change-transform"
            style={{ width: "max-content" }}
          >
            {photos.map((p, i) => (
              <FeaturedCard
                key={p.slug}
                photo={p}
                large
                imageRef={registerImage}
                priority={i === 0}
              />
            ))}
            <div className="flex h-full w-[20vw] flex-shrink-0 items-end pb-10 text-[11px] uppercase tracking-[0.25em] text-muted">
              <span>End of selection — keep scrolling</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FeaturedCard({
  photo,
  large = false,
  imageRef,
  priority = false,
}: {
  photo: Photo;
  large?: boolean;
  imageRef?: (el: HTMLDivElement | null) => void;
  priority?: boolean;
}) {
  const overlay = overlayStyleFromText(photo.text);

  return (
    <figure
      className={
        large
          ? "relative h-[78vh] w-[60vw] flex-shrink-0 overflow-hidden bg-black/60"
          : "relative aspect-[4/5] w-full overflow-hidden bg-black/60"
      }
    >
      {/* Inner wrapper is wider than the figure so the parallax translate
          never reveals the edge. The image fills this oversized wrapper. */}
      <div
        ref={imageRef}
        className="absolute -inset-x-[12%] inset-y-0 will-change-transform"
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          sizes={large ? "60vw" : "100vw"}
          quality={80}
          priority={priority}
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10 pointer-events-none" />

      <figcaption
        className="absolute pointer-events-none max-w-md"
        style={{
          left: overlay.left,
          top: overlay.top,
          transform: overlay.transform,
          textAlign: overlay.textAlign,
          color: overlay.color,
        }}
      >
        <p className="eyebrow text-bone/70">
          {photo.category}
          {photo.date ? ` · ${photo.date}` : ""}
        </p>
        <p className="display-hero text-3xl md:text-5xl mt-2">{photo.title}</p>
        {photo.caption && (
          <p className="mt-3 text-sm md:text-base text-bone/80">
            {photo.caption}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
