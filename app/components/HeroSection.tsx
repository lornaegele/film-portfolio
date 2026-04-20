"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { headingFont, uiFont } from "../lib/font";
import ScrollIndicator from "./ScrollIndicator";

const heroImage = "/fotos/lobitos-surfer.WEBP";
// Drop a short muted MP4 at /public/hero-reel.mp4 to activate the cinematic loop.
// Falls back to the still image automatically if the file is absent.
const heroVideo: string | null = null;

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the background layer only
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = "Evoking Emotions";
  const accent = "Through Film";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end -mt-20 md:-mt-24 overflow-hidden"
    >
      {/* Background layer (parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        {heroVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={heroVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={heroImage}
            alt="Lorenz Visuals Documentary Filmmaker"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/60 to-cinema-black/30" />

      {/* Edge vignette (cinematic) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-10 pb-20 md:pb-24 max-w-6xl mx-auto w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className={`${uiFont.className} text-cinema-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Documentary Filmmaker
        </motion.p>

        {/* Editorial split-serif masthead */}
        <h1
          className={`${headingFont.className} text-hero text-cinema-cream leading-[0.95] mb-4`}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {headline.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.035,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Thin gold rule — draws itself in */}
        <motion.div
          className="h-px bg-cinema-gold my-5 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ width: "min(12rem, 40vw)" }}
        />

        <motion.h2
          className={`${headingFont.className} italic text-hero text-cinema-gold leading-[0.95] mb-8`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {accent}
        </motion.h2>

        <motion.p
          className="text-cinema-silver text-subtitle max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          Giving a voice to those who don&apos;t have one. Crafting authentic
          stories set in nature and the world of adventure.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
