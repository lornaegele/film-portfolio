import AnimatedSection from "../components/AnimatedSection";
import { Button } from "../components/Button";
import { headingFont, uiFont } from "../lib/font";
import { FaInstagram } from "react-icons/fa";
import PhoneReveal from "../components/PhoneReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Lorenz Naegele Documentary Filmmaker",
  description: "Get in touch with documentary filmmaker Lorenz Naegele.",
};

export default function ContactPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 md:px-10 py-16">
      <div className="max-w-xl w-full text-center">
        <AnimatedSection>
          <span
            className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-4`}
          >
            Say hello
          </span>
          <h1
            className={`${headingFont.className} text-display text-cinema-cream mb-4`}
          >
            Get in Touch
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-cinema-silver text-body-lg mb-12">
            Have a story to tell? Let&apos;s bring it to life together.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex flex-col items-center gap-5">
            <Button href="mailto:lorenznaegele@mail.de" variant="primary" size="lg">
              lorenznaegele@mail.de
            </Button>
            <div
              className={`${uiFont.className} flex flex-col items-center gap-3 mt-2`}
            >
              <PhoneReveal className="text-cinema-silver hover:text-cinema-cream" />
              <a
                href="https://www.instagram.com/lorenznaegele"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cinema-smoke hover:text-cinema-gold transition-colors duration-300 mt-2"
              >
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
