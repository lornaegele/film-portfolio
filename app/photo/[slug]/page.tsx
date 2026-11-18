import { images } from "@/app/lib/constants/images";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SplitTitle, { toLines } from "@/app/components/SplitTitle";
import Footer from "@/app/components/Footer";

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
    return <p className="page wrap mono">Photo not found.</p>;
  }

  return (
    <>
      <article className="page wrap photo-detail">
        <Link className="back mono" href="/photo">
          ← All photos
        </Link>
        <div className="shot">
          <Image
            src={image.path}
            alt={image.alt}
            width={1600}
            height={1200}
            sizes="(max-width: 1600px) 100vw, 1600px"
            priority
          />
        </div>
        <SplitTitle lines={toLines(image.title, 16)} />
        <p className="rv">{image.description}</p>
      </article>
      <Footer />
    </>
  );
}
