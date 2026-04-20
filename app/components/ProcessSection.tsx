"use client";

import Image from "next/image";
import { headingFont, uiFont } from "../lib/font";
import AnimatedSection from "./AnimatedSection";

const stills = [
  {
    src: "/fotos/shape_the_future_2.webp",
    alt: "On set — Kiel workshop",
    caption: "Live, not staged",
  },
  {
    src: "/fotos/sport_climbing_mattia-1.webp",
    alt: "Hanging on a rope, Jesuswandl",
    caption: "Meeting the subject where they are",
  },
  {
    src: "/fotos/waves_of_wisdom_3.webp",
    alt: "Longboarding at Lobitos",
    caption: "Patience before the shot",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span
                className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-3`}
              >
                Behind the Lens
              </span>
              <h2
                className={`${headingFont.className} text-display text-cinema-cream max-w-xl`}
              >
                How the films come together
              </h2>
            </div>
            <p className="text-cinema-silver max-w-md leading-relaxed">
              I spend days with the people I film before the camera comes out.
              The shot only matters if the trust is real.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stills.map((still, i) => (
            <AnimatedSection key={still.src} delay={i * 0.1}>
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src={still.src}
                    alt={still.alt}
                    fill
                    className="object-cover transition-all duration-[900ms] group-hover:scale-[1.04] group-hover:brightness-[1.08]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption
                  className={`${uiFont.className} mt-4 text-cinema-smoke text-caption uppercase flex items-center gap-3`}
                >
                  <span className="text-cinema-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{still.caption}</span>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
