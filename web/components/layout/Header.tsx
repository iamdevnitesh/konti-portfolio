"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MagneticLink from "@/components/animations/MagneticLink";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#moments", label: "Moments" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-editorial",
          scrolled ? "backdrop-blur-md bg-ink/40" : "bg-transparent"
        )}
      >
        <div className="container-wide flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            className="display-hero text-2xl md:text-[28px] tracking-tight"
            aria-label="konti — home"
          >
            <MagneticLink strength={0.25}>konti</MagneticLink>
          </Link>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-9 text-[12px] uppercase tracking-[0.22em]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-hover focus-visible:outline-none focus-visible:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="md:hidden text-[12px] uppercase tracking-[0.22em]"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-30 bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav
              className="flex h-full items-center justify-center"
              aria-label="Mobile"
            >
              <ul className="space-y-8 text-center">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.15, duration: 0.6 }}
                  >
                    <Link
                      href={item.href}
                      className="display-hero text-5xl"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
