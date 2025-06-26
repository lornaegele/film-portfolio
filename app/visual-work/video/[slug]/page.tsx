import { videos } from "@/app/lib/constants/videos";
import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
  // Find the image with the matching link
  const video = videos.find((img) => img.link === params.slug);

  // If no image is found, you might want to handle that case
  if (!video) {
    return <div>No video found.</div>;
  }

  return (
    <div>
      <h1>{video.link}</h1>
      <p>{video.path}</p>
      <Image
        src={video.path}
        alt={video.alt}
        width={500} // Specify the width you want
        height={300} // Specify the height you want
      />
      <p>{video.link}</p>
    </div>
  );
}
