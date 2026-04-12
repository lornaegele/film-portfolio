"use client";

import { headingFont, uiFont } from "../lib/font";
import AnimatedSection from "./AnimatedSection";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cinema-dark">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <h2
            className={`${headingFont.className} text-display text-cinema-cream mb-6`}
          >
            Let&apos;s Create Together
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-cinema-silver text-lg mb-10">
            Have a story to tell? I&apos;d love to hear about it.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className={`${uiFont.className} flex flex-col items-center gap-4`}>
            <Link
              href="mailto:lorenznaegele@mail.de"
              className="text-cinema-gold hover:text-cinema-cream transition-colors duration-300 text-lg tracking-wide"
            >
              lorenznaegele@mail.de
            </Link>
            <Link
              href="tel:+4915208536210"
              className="text-cinema-smoke hover:text-cinema-cream transition-colors duration-300 tracking-wide"
            >
              +49 1520 8536 210
            </Link>
            <a
              href="https://www.instagram.com/lorenznaegele"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-smoke hover:text-cinema-gold transition-colors duration-300 mt-2"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactCTA;
