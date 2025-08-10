import { Footer } from "@/app/components";
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
    <div className="max-w-3xl mx-auto p-4">
      <Image
        src={image.path}
        alt={image.alt}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
      />
      <h1 className="mt-4 text-2xl font-bold">{image.title}</h1>
      <p className="  text-gray-600">{image.description}</p>
      <Footer />
    </div>
  );
}
