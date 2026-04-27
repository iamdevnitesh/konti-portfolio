"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/data/photos.generated";

const ease = [0.16, 1, 0.3, 1] as const;

export default function GalleryLightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [info, setInfo] = useState(false);
  const open = index !== null;
  const photo = open ? photos[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndex((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndex]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndex((index + 1) % photos.length);
  }, [index, photos.length, onIndex]);

  // Keyboard: ←/→ navigate, Esc closes, "i" toggles info.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "i" || e.key === "I") setInfo((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goNext, goPrev]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Reset info panel when navigating to a different photo.
  useEffect(() => {
    setInfo(false);
  }, [index]);

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
        >
          {/* Image stage — clicks here don't close */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.slug}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease }}
                className="relative h-full w-full max-w-[1400px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  priority
                  sizes="100vw"
                  quality={85}
                  className="object-contain"
                />

                {/* Vignette — strengthens when info is on */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  initial={false}
                  animate={{ opacity: info ? 1 : 0.15 }}
                  transition={{ duration: 0.6, ease }}
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(5,5,5,0) 35%, rgba(5,5,5,0.92) 100%)",
                  }}
                />

                {/* Context panel — only when info is on */}
                <AnimatePresence>
                  {info && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.45, ease }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-6 pb-12 md:pb-16"
                    >
                      <div className="max-w-2xl text-center">
                        <p className="eyebrow text-bone/70">
                          {[photo.category, photo.date].filter(Boolean).join(" · ") || "Moment"}
                        </p>
                        <p className="display-hero text-3xl md:text-5xl mt-3 text-bone">
                          {photo.title}
                        </p>
                        {photo.caption && (
                          <p className="mt-4 text-sm md:text-base text-bone/85 leading-relaxed">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Top controls */}
          <div
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={() => setInfo((s) => !s)}
              aria-pressed={info}
              aria-label={info ? "Hide caption" : "Show caption"}
              active={info}
            >
              <span className="font-display italic text-lg leading-none">i</span>
            </IconButton>
            <IconButton onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </div>

          {/* Prev / next */}
          <NavButton
            side="left"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            label="Previous photo"
          />
          <NavButton
            side="right"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            label="Next photo"
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[11px] uppercase tracking-[0.25em] text-bone/70 pointer-events-none">
            {String((index ?? 0) + 1).padStart(2, "0")} <span className="opacity-50">/</span>{" "}
            {String(photos.length).padStart(2, "0")}
          </div>

          {/* Hint */}
          <div className="hidden md:block absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.25em] text-bone/40 pointer-events-none">
            ← → navigate · i for info · esc to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconButton({
  children,
  active = false,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      {...rest}
      className={
        "flex h-10 w-10 items-center justify-center rounded-full border border-bone/30 text-bone/90 backdrop-blur-md transition-colors duration-300 ease-editorial hover:border-bone/80 hover:bg-bone/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bone/80 " +
        (active ? "bg-bone text-ink border-bone" : "bg-transparent")
      }
    >
      {children}
    </button>
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={
        "absolute top-1/2 -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-bone/30 text-bone/90 backdrop-blur-md transition-colors duration-300 ease-editorial hover:border-bone/80 hover:bg-bone/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bone/80 md:flex " +
        (side === "left" ? "left-4 md:left-8" : "right-4 md:right-8")
      }
    >
      {side === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
