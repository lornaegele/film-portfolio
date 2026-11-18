import type { Metadata } from "next";
import { videos } from "@/app/lib/constants/videos";
import FilmReel from "@/app/components/FilmReel";
import SplitTitle from "@/app/components/SplitTitle";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Climbing, Surfing & Outdoor Documentary Films | Lorenz Naegele",
  description:
    "Climbing and surf documentaries by Lorenz Naegele: Finding Flow in the Fight (DOK.fest München 2026 winner), Shape the Future, Waves of Wisdom and more.",
  alternates: {
    canonical: "https://lorenzvisuals.com/video",
  },
  openGraph: {
    title: "Climbing & Surf Films | Lorenz Naegele",
    description:
      "Short climbing and surf documentaries about people, nature and adventure.",
    url: "https://lorenzvisuals.com/video",
    type: "website",
  },
};

export default function FilmsPage() {
  return (
    <>
      <section className="page wrap" aria-labelledby="films-h">
        <div className="page-head">
          <SplitTitle lines={["Films"]} id="films-h" />
        </div>
        <div className="reels">
          {videos.map((v, i) => (
            <FilmReel
              key={v.link}
              href={`/video/${v.link}`}
              title={v.alt}
              genre={v.genre}
              date={v.dateTaken}
              frames={[v.thumbnail.path!, ...v.images.map((img) => img.path!)]}
              index={i}
              priority={i < 2}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
