"use client";

import { motion } from "framer-motion";
import { uiFont } from "../lib/font";

/**
 * A muted horizontal strip of festival / publication / client credits.
 * Replace the strings below with real entries (or swap for SVG/IMG logos
 * when you have brand assets).
 */
const credits: string[] = [
  "Im Kasten Film Festival",
  "Independent Danes International Film Fest",
  "Paradise Film Festival",
  "Brest Surf Film Festival",
  "Independent International Film Festival",
  "Bilbao Surf Film Festival",
  "Jung und Abgedreht Kurzfilm Festival",
  "Cinemare Ocean Film Festival",
  "Schwäbisches Jugend- und Filmfestival",
  "Hi5 Film Festival",
  "Corto Montagna Premio",
  "Climbing Film Tour",
];

export default function PressStrip() {
  return (
    <section
      aria-label="Press and collaborators"
      className="border-y border-cinema-ash/60 bg-cinema-dark/30"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-10">
        <div className="flex items-center gap-6 md:gap-10 overflow-hidden">
          <span
            className={`${uiFont.className} shrink-0 text-cinema-gold text-caption uppercase hidden md:block`}
          >
            As featured in
          </span>
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className={`${uiFont.className} flex items-center gap-10 md:gap-14 whitespace-nowrap text-cinema-smoke/70 text-xs md:text-sm uppercase tracking-[0.2em]`}
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {[...credits, ...credits].map((c, i) => (
                <span key={i} className="inline-flex items-center gap-10 md:gap-14">
                  <span className="hover:text-cinema-gold transition-colors duration-300">
                    {c}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block w-1 h-1 rounded-full bg-cinema-gold/30"
                  />
                </span>
              ))}
            </motion.div>
            {/* Fades on either edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cinema-dark/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cinema-dark/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
