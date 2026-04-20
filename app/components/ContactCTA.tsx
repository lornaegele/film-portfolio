"use client";

import { headingFont, uiFont } from "../lib/font";
import AnimatedSection from "./AnimatedSection";
import { FaInstagram } from "react-icons/fa";
import { Button } from "./Button";
import PhoneReveal from "./PhoneReveal";

const ContactCTA = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cinema-black">
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
          <div className="flex flex-col items-center gap-5">
            <Button href="mailto:lorenznaegele@mail.de" variant="primary" size="lg">
              Get in Touch
            </Button>
            <div
              className={`${uiFont.className} flex flex-col items-center gap-3 mt-2`}
            >
              <PhoneReveal className="text-cinema-smoke hover:text-cinema-cream" />
              <a
                href="https://www.instagram.com/lorenznaegele"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cinema-smoke hover:text-cinema-gold transition-colors duration-300 mt-1"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactCTA;
