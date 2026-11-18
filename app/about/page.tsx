import Image from "next/image";
import type { Metadata } from "next";
import { portraitImage } from "../lib/constants/imagePaths";
import SplitTitle from "../components/SplitTitle";
import CopyEmail from "../components/CopyEmail";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About | Lorenz Naegele Documentary Filmmaker",
  description:
    "Lorenz Naegele is a German documentary filmmaker and photographer based in Spain, making climbing and surf films.",
  alternates: {
    canonical: "https://lorenzvisuals.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="about page">
        <div className="wrap">
          <SplitTitle lines={["Hello, I'm", "Lorenz"]} label="About Lorenz Naegele" />
          <div className="a-grid">
            <figure className="me">
              <Image
                src={portraitImage.path}
                alt="Double-exposure portrait of Lorenz Naegele, filmmaker and photographer"
                fill
                sizes="(max-width: 860px) 100vw, 55vw"
                priority
              />
            </figure>
            <div className="bio rv">
              <p>
                I&apos;m a German filmmaker and photographer, currently based in Spain. Most of my films are about{" "}
                <em>climbing and surfing</em>.
              </p>
              <p>
                I follow climbers on the hardest route of their lives and surfers chasing a perfect wave, and try to
                keep what makes each person and place their own.
              </p>
              <p>
                I care about the small details that reveal the heart of a story. Through film and photography I want
                to make people feel something, and maybe look at the world a little differently.
              </p>
            </div>
          </div>
          <dl className="facts rv">
            <div><dt className="mono">From</dt><dd>Germany</dd></div>
            <div><dt className="mono">Based in</dt><dd>Spain</dd></div>
            <div><dt className="mono">Focus</dt><dd>Climbing &amp; surf films, outdoor photography</dd></div>
          </dl>
          <div className="contact rv">
            <span className="mono">Let&apos;s make something · click to copy</span>
            <CopyEmail />
            <div className="links mono">
              <a href="https://www.instagram.com/lorenznaegele" target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
