import { images } from "@/app/lib/constants/images";
import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
  // Find the image with the matching link
  const image = images.find((img) => img.link === params.slug);

  // If no image is found, you might want to handle that case
  if (!image) {
    return <div>No image found.</div>;
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <Image
        src={image.path}
        alt={image.alt}
        width={500} // Specify the width you want
        height={300} // Specify the height you want
      />
      <p>{image.description}</p>
    </div>
  );
}
