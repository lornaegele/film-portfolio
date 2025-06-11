import Image from "next/image";
import { CustomImage } from "../lib/interfaces";
import Link from "next/link";

interface PhotoTeaserProps {
  image: CustomImage;
}

const PhotoTeaser = ({ image }: PhotoTeaserProps) => {
  const link = "photo-gallery/" + image.link;

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
        {/* {image.dateTaken} */}
      </p>
    </Link>
  );
};

export default PhotoTeaser;
