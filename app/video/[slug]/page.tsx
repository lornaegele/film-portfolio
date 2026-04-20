import { videos } from "@/app/lib/constants/videos";
import type { Metadata } from "next";
import FilmDetailContent from "./FilmDetailContent";

const SITE = "https://lorenzvisuals.com";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const video = videos.find((v) => v.link === params.slug);

  if (!video) {
    return { title: "Video not found" };
  }

  const ogImage =
    video.posterPath || video.thumbnail.path || "/fotos/lobitos-surfer.WEBP";
  const canonical = `${SITE}/video/${video.link}`;

  return {
    title: `${video.alt} | Lorenz Naegele Documentary Filmmaker`,
    description: video.description,
    alternates: { canonical },
    openGraph: {
      title: `${video.alt} — Short Documentary`,
      description: video.description,
      url: canonical,
      siteName: "Lorenz Visuals",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: video.alt,
        },
      ],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: video.alt,
      description: video.description,
      images: [ogImage],
      creator: "@lorenznaegele",
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

  const currentIndex = videos.findIndex((v) => v.link === params.slug);
  const prevFilm = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextFilm =
    currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  // JSON-LD VideoObject structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.alt,
    description: video.description,
    thumbnailUrl: [
      video.thumbnail.path && `${SITE}${video.thumbnail.path}`,
      video.posterPath && `${SITE}${video.posterPath}`,
    ].filter(Boolean) as string[],
    uploadDate: parseUploadDate(video.dateTaken),
    duration: parseDuration(video.duration),
    embedUrl: video.ytLink,
    contentUrl: video.ytLink,
    director: {
      "@type": "Person",
      name: "Lorenz Naegele",
      url: SITE,
    },
    creator: {
      "@type": "Person",
      name: "Lorenz Naegele",
      url: SITE,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FilmDetailContent video={video} prevFilm={prevFilm} nextFilm={nextFilm} />
    </>
  );
}

function parseUploadDate(dateTaken: string): string | undefined {
  // e.g. "September 2025" -> "2025-09-01"
  const months: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };
  const [monthRaw, yearRaw] = dateTaken.trim().toLowerCase().split(/\s+/);
  const month = months[monthRaw];
  if (!month || !yearRaw) return undefined;
  return `${yearRaw}-${month}-01`;
}

function parseDuration(duration?: string): string | undefined {
  // "15 min" -> "PT15M"
  if (!duration) return undefined;
  const m = duration.match(/(\d+)\s*min/i);
  if (!m) return undefined;
  return `PT${m[1]}M`;
}
