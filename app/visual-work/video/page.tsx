import VideoTeaser from "../../components/VideoTeaser";
import { videoThumbnails } from "../../lib/constants/imagePaths";

export default function page() {
  return (
    <div className="p-4 pt-0 flex flex-col gap-4 max-w-5xl mx-auto ">
      {videoThumbnails.map((video) => (
        <VideoTeaser key={video.path} video={video} />
      ))}
    </div>
  );
}
