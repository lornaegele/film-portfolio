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
    <Link href={link} className="relative overflow-hidden group">
      <Image
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
        src={image.type == "video" ? image.thumbnail.path! : image.path} // Make sure 'link' contains the valid image path
        width={500}
        height={1000}
        alt={image.alt}
      />
      {image.type == "video" && (
        <FaYoutube className="absolute inset-0 m-auto flex text-white text-5xl justify-center items-center opacity-70" />
      )}
    </Link>
  );
};

export default MixedMediaTeaser;
