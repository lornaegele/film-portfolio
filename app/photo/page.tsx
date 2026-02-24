import { Footer } from "@/app/components";
import PhotoTeaser from "@/app/components/PhotoTeaser";
import { images } from "@/app/lib/constants/images";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nature Photography | Lorenz Naegele",
  description:
    "A curated collection of nature and outdoor photography capturing landscapes, light, and movement in the wild.",
  alternates: {
    canonical: "https://lorenzvisuals.com/photo",
  },
  openGraph: {
    title: "Nature Photography | Your Name",
    description:
      "Outdoor and nature photography focused on atmosphere, landscape, and storytelling.",
    url: "https://lorenzvisuals.com/photo",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <div className="p-4 pt-0 flex flex-wrap flex-row justify-center md:gap-12 gap-6 max-w-[1500px] mx-auto md:items-center">
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
      <Footer />
    </div>
  );
}
