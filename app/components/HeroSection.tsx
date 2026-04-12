"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { headingFont, uiFont } from "../lib/font";
import ScrollIndicator from "./ScrollIndicator";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end -mt-20 md:-mt-24">
      {/* Background Still Image */}
      <Image
        src="/fotos/lobitos-surfer.WEBP"
        alt="Lorenz Visuals — Documentary Filmmaker"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/60 to-cinema-black/30" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-10 pb-20 md:pb-24 max-w-6xl mx-auto w-full">
        <motion.p
          className={`${uiFont.className} text-cinema-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Documentary Filmmaker
        </motion.p>

        <motion.h1
          className={`${headingFont.className} text-hero text-cinema-cream leading-[0.95] mb-6`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Evoking Emotions
          <br />
          <span className="italic text-cinema-gold">Through Film</span>
        </motion.h1>

        <motion.p
          className="text-cinema-silver text-subtitle max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Giving a voice to those who don&apos;t have one. Crafting authentic
          stories set in nature and the world of adventure.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
