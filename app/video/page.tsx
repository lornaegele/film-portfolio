import { videos } from "@/app/lib/constants/videos";
import VideoTeaser from "@/app/components/VideoTeaser";
import { Footer } from "@/app/components";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Climbing, Surfing & Outdoor Documentary Films | Lorenz Naegele",
  description:
    "A collection of climbing, surfing and outdoor films exploring movement, nature, and personal progression on real rock.",
  alternates: {
    canonical: "https://yourdomain.com/videos",
  },
  openGraph: {
    title: "Climbing & Outdoor Films | Lorenz Naegele",
    description:
      "Short climbing or Surfing documentaries and outdoor films focused on flow, fear, and progression.",
    url: "https://yourdomain.com/videos",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <div className="p-4 pt-0 flex flex-col md:gap-4 gap-2 max-w-5xl mx-auto ">
        {videos.map((video) => (
          <VideoTeaser key={video.thumbnail.path} video={video} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
