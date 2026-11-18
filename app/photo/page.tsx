import { Metadata } from "next";
import { images } from "@/app/lib/constants/images";
import SplitTitle from "@/app/components/SplitTitle";
import Footer from "@/app/components/Footer";
import PhotoGrid from "@/app/components/PhotoGrid";

export const metadata: Metadata = {
  title: "Photography | Lorenz Naegele",
  description:
    "Outdoor photography by Lorenz Naegele from Peru, Bolivia, Chile and Argentina: mountains, deserts, coastlines and the people who live there.",
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
    <>
      <section className="page wrap" aria-labelledby="photos-h">
        <div className="page-head">
          <SplitTitle lines={["Photos"]} id="photos-h" />
          <p className="mono">Peru · Bolivia · Chile · Argentina</p>
        </div>
        <PhotoGrid
          photos={images.map((image) => ({ path: image.path, title: image.title, alt: image.alt, href: `/photo/${image.link}` }))}
        />
      </section>
      <Footer />
    </>
  );
}
