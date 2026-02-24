import { Footer } from "@/app/components";
import { images } from "@/app/lib/constants/images";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const image = images.find((img) => img.link === params.slug);

  if (!image) {
    return {
      title: "Image not found",
    };
  }

  return {
    title: `${image.title} | Photography | Lorenz Naegele `,
    description: image.description,
    alternates: {
      canonical: `https://lorenzvisuals.com/images/${image.link}`,
    },
    openGraph: {
      title: image.title,
      description: image.description,
      images: [
        {
          url: image.path,
          width: 1200,
          height: 800,
        },
      ],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return images.map((img) => ({
    slug: img.link,
  }));
}

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
