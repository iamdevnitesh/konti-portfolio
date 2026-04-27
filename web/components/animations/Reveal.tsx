"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { ease } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

export default function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  direction = "up",
  className,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const offset = 28;
  const initial = {
    opacity: 0,
    x: direction === "left" ? -offset : direction === "right" ? offset : 0,
    y: direction === "up" ? offset : direction === "down" ? -offset : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration, ease, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
