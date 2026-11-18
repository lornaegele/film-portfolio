import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { images } from "@/app/lib/constants/images";
import SplitTitle from "@/app/components/SplitTitle";
import Footer from "@/app/components/Footer";

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
        <div className="grid">
          {images.map((image, i) => (
            <Link key={image.link} className="frame rv" href={`/photo/${image.link}`} data-cursor="View">
              <span className="pic">
                <Image
                  src={image.path}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  priority={i < 3}
                />
              </span>
              <span className="t mono">{image.title}</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
