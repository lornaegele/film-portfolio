import type { Metadata } from "next";
import Hero, { type HeroSlide } from "./components/Hero";

export const metadata: Metadata = {
  title: "Lorenz Naegele | Documentary Filmmaker",
  description:
    "Climbing and surf documentaries by Lorenz Naegele, German filmmaker and photographer based in Spain. Winner at DOK.fest München 2026.",
  alternates: {
    canonical: "https://lorenzvisuals.com/",
  },
  openGraph: {
    title: "Lorenz Naegele | Documentary Filmmaker",
    description:
      "Climbing and surf documentaries and outdoor photography by Lorenz Naegele.",
    url: "https://lorenzvisuals.com/",
    siteName: "Lorenz Visuals",
    type: "website",
  },
};

// Only photos from the Photos page (film stills are too low-res for full screen).
const slides: HeroSlide[] = [
  { src: "/fotos/cerro-torre.WEBP", alt: "Cerro Torre rising above the Patagonian ice", place: "Cerro Torre, Argentina" },
  { src: "/fotos/lobitos-surfer.WEBP", alt: "Surfer in Lobitos, Peru", place: "Lobitos, Peru" },
  { src: "/fotos/uyuni-guide.WEBP", alt: "A barefoot guide walking across the Uyuni salt flat", place: "Salar de Uyuni, Bolivia" },
  { src: "/fotos/pitumarca-man.WEBP", alt: "Peruvian shepherd in Pitumarca", place: "Pitumarca, Peru" },
  { src: "/fotos/huacachina-desert.WEBP", alt: "Dunes of the Huacachina desert", place: "Huacachina, Peru" },
  { src: "/fotos/red-llamas.WEBP", alt: "Llamas on red earth in the Andes", place: "Andes, Peru" },
];

export default function Home() {
  return <Hero slides={slides} />;
}
