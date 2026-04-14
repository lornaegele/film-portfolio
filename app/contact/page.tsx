import AnimatedSection from "../components/AnimatedSection";
import { headingFont, uiFont } from "../lib/font";
import Link from "next/link";
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
          <h1
            className={`${headingFont.className} text-display text-cinema-cream mb-4`}
          >
            Get in Touch
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-cinema-silver text-lg mb-12">
            Have a story to tell? Let&apos;s bring it to life together.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className={`${uiFont.className} flex flex-col items-center gap-5`}>
            <Link
              href="mailto:lorenznaegele@mail.de"
              className="text-cinema-gold hover:text-cinema-cream transition-colors duration-300 text-xl tracking-wide"
            >
              lorenznaegele@mail.de
            </Link>
            <PhoneReveal className="text-cinema-silver hover:text-cinema-cream text-lg" />
            <a
              href="https://www.instagram.com/lorenznaegele"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinema-smoke hover:text-cinema-gold transition-colors duration-300 mt-4"
            >
              <FaInstagram size={28} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
