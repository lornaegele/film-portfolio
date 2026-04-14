import { videos } from "@/app/lib/constants/videos";
import FilmPosterCard from "@/app/components/FilmPosterCard";
import AnimatedSection from "@/app/components/AnimatedSection";
import { headingFont } from "@/app/lib/font";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Films | Lorenz Naegele — Documentary Filmmaker",
  description:
    "A collection of climbing, surfing and outdoor documentary films exploring movement, nature, and personal stories.",
  alternates: {
    canonical: "https://lorenzvisuals.com/video",
  },
  openGraph: {
    title: "Films | Lorenz Naegele",
    description:
      "Documentary films focused on surfing, climbing, music, and authentic human stories.",
    url: "https://lorenzvisuals.com/video",
    type: "website",
  },
};

export default function FilmsPage() {
  return (
    <div className="px-6 md:px-10 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <AnimatedSection className="pt-8 md:pt-12 mb-12 md:mb-16">
          <h1
            className={`${headingFont.className} text-display text-cinema-cream`}
          >
            Films
          </h1>
        </AnimatedSection>

        {/* Film Grid — 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {videos.map((video, index) => (
            <FilmPosterCard key={video.link} film={video} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
