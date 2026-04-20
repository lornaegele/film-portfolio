import { images } from "@/app/lib/constants/images";
import { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/app/components/AnimatedSection";
import TextLink from "@/app/components/TextLink";
import { headingFont, uiFont } from "@/app/lib/font";

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
    twitter: {
      card: "summary_large_image",
      title: image.title,
      description: image.description,
      images: [image.path],
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
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <AnimatedSection>
        <div className="mb-6">
          <TextLink href="/photo" tone="smoke">
            ← All Photography
          </TextLink>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
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

      <AnimatedSection delay={0.15} className="mt-8">
        <span
          className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-3`}
        >
          Still
        </span>
        <h1
          className={`${headingFont.className} text-display-sm text-cinema-cream mb-4`}
        >
          {image.title}
        </h1>
        <p className="text-cinema-silver text-body-lg leading-relaxed">
          {image.description}
        </p>
      </AnimatedSection>
    </div>
  );
}
