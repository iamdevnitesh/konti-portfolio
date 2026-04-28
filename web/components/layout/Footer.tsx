"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="container-wide flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display-hero text-3xl">konti</p>
          <p className="text-muted mt-2 max-w-md text-sm">
            A cinematic archive of quiet chaos, soft paws, and royal attitude.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-[12px] uppercase tracking-[0.22em] md:items-end">
          <Link href="/gallery" className="link-hover">
            Gallery
          </Link>
          <Link href="/about" className="link-hover">
            About
          </Link>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="link-hover text-left md:text-right"
          >
            Back to top
          </button>
        </div>
      </div>
      <div className="container-wide pb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[10px] uppercase tracking-[0.3em] text-muted">
        <span>© {new Date().getFullYear()} — archived with care</span>
        <span>Photographs upscaled with AI · contents unaltered</span>
      </div>
    </footer>
  );
}
