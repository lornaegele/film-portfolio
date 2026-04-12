import { videos } from "@/app/lib/constants/videos";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import type { Metadata } from "next";
import FilmDetailContent from "./FilmDetailContent";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const video = videos.find((v) => v.link === params.slug);

  if (!video) {
    return { title: "Video not found" };
  }

  return {
    title: `${video.alt} | Lorenz Naegele — Documentary Filmmaker`,
    description: video.description,
    openGraph: {
      title: video.alt,
      description: video.description,
      images: [
        {
          url: video.thumbnail.path!,
          width: 1200,
          height: 630,
        },
      ],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: video.alt,
      description: video.description,
      images: [video.thumbnail.path!],
    },
  };
}

export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.link,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const video = videos.find((v) => v.link === params.slug);

  if (!video) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-cinema-smoke">
        Film not found.
      </div>
    );
  }

  // Find prev/next films
  const currentIndex = videos.findIndex((v) => v.link === params.slug);
  const prevFilm = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextFilm =
    currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  return (
    <FilmDetailContent
      video={video}
      prevFilm={prevFilm}
      nextFilm={nextFilm}
    />
  );
}
