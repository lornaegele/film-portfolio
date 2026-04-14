import Image from "next/image";
import { VideoThumbnail } from "../lib/interfaces";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

interface VideoTeaserProps {
  video: VideoThumbnail;
}

const VideoTeaser = ({ video }: VideoTeaserProps) => {
  return (
    <Link
      href={`video/${video.link}`}
      className="relative overflow-hidden group"
    >
      <Image
        className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
        src={video.thumbnail.path!} // Make sure 'link' contains the valid image path
        width={1024}
        height={1000}
        alt={video.alt}
      />
      <p className="uppercase text-gray-500 text-right md:pt-1 md:text-base text-sm">
        {video.dateTaken}
      </p>
    </Link>
  );
};

export default VideoTeaser;
