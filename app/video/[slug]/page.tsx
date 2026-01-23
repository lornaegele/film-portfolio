import { Footer } from "@/app/components";
import { videos } from "@/app/lib/constants/videos";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.link,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  // Find the image with the matching link
  const video = videos.find((img) => img.link === params.slug);

  // If no image is found, handle that case
  if (!video) {
    return <div>No video found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 text-center flex flex-col gap-2">
      <div>
        {video.ytLink ? (
          <Link
            href={video.ytLink}
            className="relative overflow-hidden group block"
          >
            <Image
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
              src={video.thumbnail.path!}
              width={500}
              height={1000}
              alt={video.alt}
            />

            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <FaYoutube className="text-white text-5xl opacity-80 drop-shadow-lg" />
            </div>
          </Link>
        ) : (
          <Image
            className="h-full w-full object-cover"
            src={video.thumbnail.path!}
            width={500}
            height={1000}
            alt={video.alt}
          />
        )}
        <div className="text-right">{video.dateTaken}</div>
      </div>

      <h1 className="text-3xl font-bold text-left">{video.alt}</h1>
      <p className="text-left">{video.description}</p>
      <p className="text-gray-600 mb-2">{video.thumbnail.description}</p>

      {video.images.map((img, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center mb-4 gap-6`}
        >
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 text-left">{img.description}</p>
          </div>
          {img.path && (
            <div className="w-full md:w-1/2">
              <Image
                src={img.path}
                alt={video.alt}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      ))}

      <Footer />
    </div>
  );
}
