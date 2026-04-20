"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * Signature letterbox page transition: two black bars sweep in from top
 * and bottom, then retract — echoing an aspect-ratio change (cinema).
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Letterbox bars — sweep in, hold a beat, sweep out */}
        <LetterboxBars key={`bars-${pathname}`} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function LetterboxBars() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[60] pointer-events-none"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 bg-cinema-black origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.05,
        }}
        style={{ height: "50vh" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-cinema-black origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.05,
        }}
        style={{ height: "50vh" }}
      />
      {/* Thin gold rule that flashes between the bars */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px bg-cinema-gold -translate-x-1/2 -translate-y-1/2"
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "100%", opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      />
    </div>
  );
}
