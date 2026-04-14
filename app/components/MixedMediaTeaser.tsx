import Image from "next/image";
import { CustomImage, VideoThumbnail } from "../lib/interfaces";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

interface MixedMediaTeaserProps {
  image: CustomImage | VideoThumbnail;
}

const MixedMediaTeaser = ({ image }: MixedMediaTeaserProps) => {
  const link = image.type + "/" + image.link;
  return (
    <Link href={link} className="relative overflow-hidden group block">
      <Image
        className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
        src={image.type === "video" ? image.thumbnail.path! : image.path}
        width={500}
        height={1000}
        alt={image.alt}
      />

      {image.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <FaYoutube className="text-white text-5xl opacity-80 drop-shadow-lg video-pulse" />
        </div>
      )}
    </Link>
  );
};

export default MixedMediaTeaser;
