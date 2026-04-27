"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Mount-only fade-in. We deliberately avoid `AnimatePresence mode="wait"` here:
// some pages mount GSAP ScrollTrigger pins (which mutate the DOM via pin-spacer
// wrappers), and holding the old tree during an exit animation causes React's
// commit phase to fail with "Failed to execute 'removeChild'" when it tries to
// reconcile DOM that GSAP has rewritten. A simple keyed fade-in on the new
// route gives a similar editorial feel without the unmount conflict.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}
