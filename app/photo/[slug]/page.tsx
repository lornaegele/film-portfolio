import { images } from "@/app/lib/constants/images";
import { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/app/components/AnimatedSection";
import { headingFont } from "@/app/lib/font";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const image = images.find((img) => img.link === params.slug);

  if (!image) {
    return { title: "Image not found" };
  }

  return {
    title: `${image.title} | Photography | Lorenz Naegele`,
    description: image.description,
    alternates: {
      canonical: `https://lorenzvisuals.com/photo/${image.link}`,
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

export default function PhotoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const image = images.find((img) => img.link === params.slug);

  if (!image) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-cinema-smoke">
        Photo not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <AnimatedSection>
        <Image
          src={image.path}
          alt={image.alt}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 900px"
          className="w-full h-auto rounded-sm"
          priority
        />
      </AnimatedSection>
      <AnimatedSection delay={0.15} className="mt-6">
        <h1
          className={`${headingFont.className} text-2xl md:text-3xl text-cinema-cream mb-3`}
        >
          {image.title}
        </h1>
        <p className="text-cinema-silver leading-relaxed">{image.description}</p>
      </AnimatedSection>
    </div>
  );
}
