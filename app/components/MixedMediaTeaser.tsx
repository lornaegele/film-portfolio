import Image from "next/image";
import { CustomImage, VideoThumbnail } from "../lib/interfaces";
import Link from "next/link";

interface MixedMediaTeaserProps {
  image: CustomImage | VideoThumbnail;
}

const MixedMediaTeaser = ({ image }: MixedMediaTeaserProps) => {
  const link = "visual-work/" + image.type + "/" + image.link;
  return (
    <Link href={link} className="relative overflow-hidden group">
      <Image
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
        src={image.path} // Make sure 'link' contains the valid image path
        width={500}
        height={1000}
        alt={image.alt}
      />
      <p className="absolute -mt-7 ml-3 text-white opacity-80 text-sm uppercase">
        {image.path}
      </p>
    </Link>
  );
};

export default MixedMediaTeaser;
