"use client";

import { motion } from "framer-motion";
import { headingFont } from "../lib/font";
import AnimatedSection from "./AnimatedSection";

const ArtistStatement = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        {/* Gold rule top */}
        <motion.div
          className="w-12 h-[1px] bg-cinema-gold mx-auto mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        />

        <AnimatedSection delay={0.1}>
          <blockquote
            className={`${headingFont.className} italic text-display text-cinema-cream mb-8 leading-tight`}
          >
            &ldquo;I believe in giving a voice to those who don&apos;t have one,
            and evoking emotions that connect us all.&rdquo;
          </blockquote>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-cinema-silver text-lg leading-relaxed max-w-2xl mx-auto">
            My filmmaking is focused on outdoor documentaries, telling authentic
            stories set in nature and the world of adventure sports. I&apos;m
            passionate about capturing beauty, emotion, and the small details
            that reveal the heart of a story. Through film, I aim to inspire
            awareness and invite viewers to experience the world through my lens.
          </p>
        </AnimatedSection>

        {/* Gold rule bottom */}
        <motion.div
          className="w-12 h-[1px] bg-cinema-gold mx-auto mt-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </section>
  );
};

export default ArtistStatement;
