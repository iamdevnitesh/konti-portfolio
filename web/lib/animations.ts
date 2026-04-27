// Shared animation tokens and Framer Motion variants.

export const ease = [0.16, 1, 0.3, 1] as const;
export const easeIn = [0.7, 0, 0.84, 0] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});
