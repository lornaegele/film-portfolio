import Image from "next/image";
import { ImageTeaser } from "../lib/interfaces";
import Link from "next/link";

interface TeaserProps {
  teaserImage: ImageTeaser;
}

const Teaser = ({ teaserImage }: TeaserProps) => {
  return (
    <Link href={teaserImage.link} className="relative overflow-hidden group">
      <Image
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
        src={teaserImage.path} // Make sure 'link' contains the valid image path
        width={500}
        height={1000}
        alt={teaserImage.alt}
      />
      <p className="absolute -mt-7 ml-3 text-white opacity-80 text-sm uppercase">
        {teaserImage.displayName}
      </p>
    </Link>
  );
};

export default Teaser;
