import { videos } from "@/app/lib/constants/images";
import VideoTeaser from "../../components/VideoTeaser";
import { Footer } from "@/app/components";

export default function page() {
  return (
    <div>
      <div className="p-4 pt-0 flex flex-col gap-4 max-w-5xl mx-auto ">
        {videos.map((video) => (
          <VideoTeaser key={video.path} video={video} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
