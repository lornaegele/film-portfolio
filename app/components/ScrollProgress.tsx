"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold bar at the very top of the viewport that fills as the user scrolls.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] bg-cinema-gold origin-left z-[55]"
      style={{ scaleX }}
    />
  );
}
