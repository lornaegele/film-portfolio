import Image from "next/image";
import { portraitImage } from "../lib/constants/imagePaths";
import AnimatedSection from "../components/AnimatedSection";
import TextLink from "../components/TextLink";
import { headingFont, uiFont } from "../lib/font";
import { FaInstagram } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Lorenz Naegele Documentary Filmmaker",
  description:
    "Lorenz Naegele is a documentary filmmaker from Germany, focused on outdoor documentaries and authentic storytelling.",
};

export default function AboutPage() {
  return (
    <div className="px-6 md:px-10 py-8 md:py-16 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Portrait */}
        <AnimatedSection className="w-full md:w-2/5 md:sticky md:top-28 md:self-start">
          <div className="overflow-hidden rounded-sm">
            <Image
              className="w-full h-auto object-cover"
              src={portraitImage.path}
              width={600}
              height={750}
              alt={portraitImage.title}
              priority
            />
          </div>
        </AnimatedSection>

        {/* Bio Content */}
        <div className="w-full md:w-3/5 flex flex-col gap-10">
          <AnimatedSection delay={0.1}>
            <span
              className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-4`}
            >
              About
            </span>
            <h1
              className={`${headingFont.className} text-display text-cinema-cream mb-6`}
            >
              The films I make are the ones I wish existed.
            </h1>
            <p className="text-cinema-silver text-body-lg leading-relaxed mb-4">
              I tell stories about people who live with passion and purpose:
              surfers chasing waves across South America, climbers pushing
              through fear on the rock, craftsmen shaping a more sustainable
              future.
            </p>
            <p className="text-cinema-silver text-body-lg leading-relaxed">
              I&apos;m Lorenz Naegele, a documentary filmmaker from Germany with
              a deep love for the outdoors and the stories that unfold within it.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2
              className={`${headingFont.className} text-display-sm text-cinema-cream mb-4`}
            >
              My Filmmaking
            </h2>
            <p className="text-cinema-silver text-body-lg leading-relaxed">
              I believe every person carries a story worth telling. Whether
              following a local surf legend through the coast of Peru or
              documenting a band&apos;s very first song, I strive to capture the
              raw emotion and authenticity that makes each story unique. Through
              cinema, I want to give a voice to those who don&apos;t have one
              and create films that move people.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="border-l-2 border-cinema-gold/40 pl-6">
              <p
                className={`${headingFont.className} italic text-display-sm text-cinema-cream leading-relaxed`}
              >
                &ldquo;I believe in giving a voice to those who don&apos;t have
                one, and evoking emotions that connect us all.&rdquo;
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h3
              className={`${uiFont.className} text-cinema-gold text-eyebrow uppercase mb-4`}
            >
              Contact
            </h3>
            <div className={`${uiFont.className} flex flex-col gap-3 items-start`}>
              <TextLink
                href="mailto:lorenznaegele@mail.de"
                tone="cream"
                uppercase={false}
              >
                lorenznaegele@mail.de
              </TextLink>
              <TextLink href="tel:+4915208536210" tone="smoke" uppercase={false}>
                +49 1520 8536 210
              </TextLink>
              <a
                href="https://www.instagram.com/lorenznaegele"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cinema-smoke hover:text-cinema-gold transition-colors duration-300 mt-2 inline-block"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
