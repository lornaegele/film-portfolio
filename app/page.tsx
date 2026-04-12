import HeroSection from "./components/HeroSection";
import FilmCard from "./components/FilmCard";
import ArtistStatement from "./components/ArtistStatement";
import AboutPreview from "./components/AboutPreview";
import ContactCTA from "./components/ContactCTA";
import AnimatedSection from "./components/AnimatedSection";
import { videos } from "./lib/constants/videos";
import { headingFont, uiFont } from "./lib/font";
import Link from "next/link";
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
              <Link
                href="/video"
                className={`${uiFont.className} text-cinema-smoke hover:text-cinema-gold uppercase text-xs tracking-[0.2em] transition-colors duration-300 hidden md:block`}
              >
                View All Films
              </Link>
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-8 md:gap-12">
            {featuredFilms.map((film, index) => (
              <FilmCard key={film.link} film={film} index={index} />
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center md:hidden">
            <Link
              href="/video"
              className={`${uiFont.className} text-cinema-smoke hover:text-cinema-gold uppercase text-xs tracking-[0.2em] transition-colors duration-300`}
            >
              View All Films
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Artist Statement */}
      <ArtistStatement />

      {/* About Preview */}
      <AboutPreview />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
