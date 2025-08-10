import { videos } from "@/app/lib/constants/videos";
import VideoTeaser from "@/app/components/VideoTeaser";
import { Footer } from "@/app/components";

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
