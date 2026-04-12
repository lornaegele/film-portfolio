import PhotoTeaser from "@/app/components/PhotoTeaser";
import AnimatedSection from "@/app/components/AnimatedSection";
import { images } from "@/app/lib/constants/images";
import { headingFont } from "@/app/lib/font";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography | Lorenz Naegele",
  description:
    "A curated collection of nature and outdoor photography capturing landscapes, light, and movement in the wild.",
  alternates: {
    canonical: "https://lorenzvisuals.com/photo",
  },
  openGraph: {
    title: "Photography | Lorenz Naegele",
    description:
      "Outdoor and nature photography focused on atmosphere, landscape, and storytelling.",
    url: "https://lorenzvisuals.com/photo",
    type: "website",
  },
};

export default function PhotoPage() {
  return (
    <div className="px-6 md:px-10 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection className="pt-8 md:pt-12 mb-12 md:mb-16">
          <h1
            className={`${headingFont.className} text-display text-cinema-cream`}
          >
            Photography
          </h1>
        </AnimatedSection>

        <div className="flex flex-wrap flex-row justify-center md:gap-10 gap-6 md:items-center">
          {images.map((image, index) => {
            const sizeClass =
              index % 4 === 0
                ? "w-full md:w-1/2"
                : index % 4 === 1
                  ? "w-4/5 md:w-2/5"
                  : index % 4 === 2
                    ? "w-[90%] md:w-[40%]"
                    : "w-5/6 md:w-1/3";
            return (
              <div key={image.link} className={`${sizeClass}`}>
                <PhotoTeaser image={image} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
