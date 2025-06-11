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
      target="_blank"
      href={video.ytLink}
      className="relative overflow-hidden group"
    >
      <Image
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
        src={video.path} // Make sure 'link' contains the valid image path
        width={1024}
        height={1000}
        alt={video.alt}
      />
      {/* <p className="text-sm uppercase text-black text-right pt-1">
        {video.dateTaken}
      </p> */}
      <FaYoutube className="absolute inset-0 m-auto hidden text-white text-6xl group-hover:flex justify-center items-center opacity-60" />
    </Link>
  );
};

export default VideoTeaser;
