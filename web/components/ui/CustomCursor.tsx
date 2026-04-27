"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-cursor='hover']");
      setHovering(Boolean(interactive));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isMobile, x, y]);

  if (isMobile) return null;

  return (
    <motion.div
      aria-hidden
      style={{ translateX: sx, translateY: sy }}
      animate={{
        width: hovering ? 56 : 12,
        height: hovering ? 56 : 12,
        opacity: hovering ? 0.9 : 0.7,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/60 mix-blend-difference"
    />
  );
}
