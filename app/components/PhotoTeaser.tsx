import Image from "next/image";
import Link from "next/link";
import { CustomImage } from "../lib/interfaces";

interface PhotoTeaserProps {
  image: CustomImage;
}

const PhotoTeaser = ({ image }: PhotoTeaserProps) => {
  return (
    <Link
      href={`/${image.type}/${image.link}`}
      className="relative overflow-hidden rounded-sm group block"
    >
      <Image
        className="h-full w-full object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.08]"
        src={image.path}
        width={1200}
        height={0}
        sizes="(max-width: 768px) 100vw, 50vw"
        alt={image.alt}
        style={{ height: "auto" }}
      />
    </Link>
  );
};

export default PhotoTeaser;
