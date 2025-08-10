import Image from "next/image";
import { CustomImage, VideoThumbnail } from "../lib/interfaces";
import Link from "next/link";

interface PhotoTeaserProps {
  image: CustomImage;
}

const PhotoTeaser = ({ image }: PhotoTeaserProps) => {
  const link = image.type + "/" + image.link;
  return (
    <Link href={link} className="relative overflow-hidden group">
      <Image
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
        src={image.path} // Make sure 'link' contains the valid image path
        width={500}
        height={1000}
        alt={image.alt}
      />
    </Link>
  );
};

export default PhotoTeaser;
