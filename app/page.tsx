import HeroSection from "./components/HeroSection";
import FilmCard from "./components/FilmCard";
import ArtistStatement from "./components/ArtistStatement";
import AboutPreview from "./components/AboutPreview";
import ContactCTA from "./components/ContactCTA";
import AnimatedSection from "./components/AnimatedSection";
import TextLink from "./components/TextLink";
import PressStrip from "./components/PressStrip";
import AwardHighlight from "./components/AwardHighlight";
import Testimonial from "./components/Testimonial";
import ProcessSection from "./components/ProcessSection";
import { videos } from "./lib/constants/videos";
import { headingFont } from "./lib/font";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorenz Naegele | Documentary Filmmaker",
  description:
    "Documentary filmmaker crafting authentic stories about people, nature, and adventure. Evoking emotions through cinematic storytelling.",
  alternates: {
    canonical: "https://lorenzvisuals.com/",
  },
  openGraph: {
    title: "Lorenz Naegele | Documentary Filmmaker",
    description:
      "Evoking emotions through film. Authentic outdoor documentaries about people, nature, and adventure.",
    url: "https://lorenzvisuals.com/",
    siteName: "Lorenz Visuals",
    type: "website",
  },
};

export default function Home() {
  const featuredFilms = videos.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Press / festivals strip */}
      <PressStrip />

      {/* Subtle highlight: DOK.fest München win */}
      <AwardHighlight />

      {/* Featured Films */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12 md:mb-16">
              <h2
                className={`${headingFont.className} text-display text-cinema-cream`}
              >
                Selected Work
              </h2>
              <div className="hidden md:block">
                <TextLink href="/video" tone="smoke">
                  View All Films
                </TextLink>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {featuredFilms.map((film, index) => (
              <FilmCard key={film.link} film={film} index={index} />
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center md:hidden">
            <TextLink href="/video" tone="smoke">
              View All Films
            </TextLink>
          </AnimatedSection>
        </div>
      </section>

      {/* Artist Statement */}
      <ArtistStatement />

      {/* Process / Behind the Lens */}
      <ProcessSection />

      {/* Testimonial pull-quote */}
      <Testimonial />

      {/* About Preview */}
      <AboutPreview />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
