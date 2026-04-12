"use client";

import Image from "next/image";
import Link from "next/link";
import { headingFont, uiFont } from "../lib/font";
import AnimatedSection from "./AnimatedSection";

const AboutPreview = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Portrait */}
          <AnimatedSection className="w-full md:w-2/5 shrink-0" direction="left">
            <div className="overflow-hidden rounded-sm">
              <Image
                src="/fotos/portrait_double.webp"
                alt="Lorenz Naegele — Documentary Filmmaker"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection className="w-full md:w-3/5" delay={0.15}>
            <h2
              className={`${headingFont.className} text-display text-cinema-cream mb-6`}
            >
              About Me
            </h2>
            <p className="text-cinema-silver text-lg leading-relaxed mb-4">
              I&apos;m Lorenz Naegele, a documentary filmmaker from Germany. I
              tell stories about people who live with passion and purpose —
              surfers chasing waves across Peru, climbers pushing through fear on
              the rock, craftsmen shaping a more sustainable future.
            </p>
            <p className="text-cinema-smoke leading-relaxed mb-8">
              My work is driven by curiosity and a deep respect for the people I
              film. I believe every person carries a story worth telling, and
              through cinema, we can make those stories felt.
            </p>
            <Link
              href="/about"
              className={`${uiFont.className} text-cinema-gold hover:text-cinema-cream uppercase text-xs tracking-[0.2em] transition-colors duration-300`}
            >
              More About Me
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
