"use client";

import { motion } from "framer-motion";
import { headingFont, uiFont } from "../lib/font";
import AnimatedSection from "./AnimatedSection";

/**
 * Single pull-quote from a collaborator. Swap `quote`, `attribution`
 * for a real testimonial when you have one.
 */
const quote =
  "Lorenz captures the quiet moments other filmmakers miss — the breath before the drop-in, the pause between holds. He makes you feel like you were there.";
const attribution = "Martin · Surfboard Shaper, Kiel";

export default function Testimonial() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cinema-dark/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.svg
          viewBox="0 0 120 2"
          className="w-16 h-[2px] mx-auto mb-8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.line
            x1="0"
            y1="1"
            x2="120"
            y2="1"
            stroke="#D4A853"
            strokeWidth="1"
          />
        </motion.svg>

        <AnimatedSection delay={0.1}>
          <blockquote
            className={`${headingFont.className} italic text-subtitle md:text-2xl text-cinema-cream leading-[1.45]`}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <cite
            className={`${uiFont.className} block not-italic mt-8 text-cinema-gold text-caption uppercase`}
          >
            {attribution}
          </cite>
        </AnimatedSection>
      </div>
    </section>
  );
}
