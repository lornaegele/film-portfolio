"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { VideoThumbnail } from "@/app/lib/interfaces";
import { headingFont, uiFont } from "@/app/lib/font";
import AnimatedSection from "@/app/components/AnimatedSection";

interface FilmDetailContentProps {
  video: VideoThumbnail;
  prevFilm: VideoThumbnail | null;
  nextFilm: VideoThumbnail | null;
}

export default function FilmDetailContent({
  video,
  prevFilm,
  nextFilm,
}: FilmDetailContentProps) {
  return (
    <div>
      {/* Hero Section typographic */}
      <section className="relative px-6 md:px-10 pt-8 md:pt-16 pb-16 md:pb-24 overflow-hidden">
        {/* Decorative large background text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className={`${headingFont.className} text-[12vw] leading-none text-cinema-cream whitespace-nowrap`}>
            {video.alt}
          </span>
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Date label */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-12 h-px bg-cinema-gold" />
            <p className={`${uiFont.className} text-cinema-gold uppercase tracking-[0.25em] text-xs md:text-sm`}>
              Short Documentary · {video.dateTaken}
              {video.duration && ` · ${video.duration}`}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`${headingFont.className} text-4xl md:text-6xl lg:text-7xl text-cinema-cream mb-8 max-w-3xl`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {video.alt}
          </motion.h1>

          {/* Watch button */}
          {video.ytLink && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <a
                href={video.ytLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${uiFont.className} inline-flex items-center gap-3 border border-cinema-gold/60 hover:border-cinema-gold text-cinema-gold hover:bg-cinema-gold/10 px-6 py-3 rounded-sm uppercase text-sm tracking-[0.15em] transition-all duration-300`}
              >
                <FaYoutube size={20} />
                Watch Film
              </a>
            </motion.div>
          )}

        </div>
      </section>

      {/* Poster + Description */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Poster */}
            {video.posterPath && (
              <AnimatedSection className="w-full md:w-2/5 shrink-0" direction="left">
                <Image
                  src={video.posterPath}
                  alt={`${video.alt} Poster`}
                  width={600}
                  height={849}
                  className="w-full h-auto rounded-sm"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </AnimatedSection>
            )}

            {/* Description */}
            <div className="flex flex-col justify-center gap-6">
              <AnimatedSection delay={0.1}>
                <p className="text-lg md:text-xl text-cinema-silver leading-relaxed">
                  {video.description}
                </p>
              </AnimatedSection>

              {video.duration && (
                <AnimatedSection delay={0.2}>
                  <p className={`${uiFont.className} text-cinema-smoke text-sm uppercase tracking-[0.15em]`}>
                    Duration: {video.duration}
                  </p>
                </AnimatedSection>
              )}

              {video.thumbnail.description && (
                <AnimatedSection delay={0.25}>
                  <p className="text-cinema-smoke leading-relaxed">
                    {video.thumbnail.description}
                  </p>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      {video.images.length > 0 && (
        <section className="px-6 md:px-10 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="mb-12 md:mb-16">
              <h2
                className={`${headingFont.className} text-display text-cinema-cream`}
              >
                Behind the Scenes
              </h2>
            </AnimatedSection>

            <div className="flex flex-col gap-16 md:gap-24">
              {video.images.map((img, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-12`}
                >
                  {/* Text */}
                  <AnimatedSection
                    className="w-full md:w-1/2"
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={0.1}
                  >
                    <div className="border-l-2 border-cinema-gold/40 pl-6">
                      <p className="text-cinema-silver leading-relaxed">
                        {img.description}
                      </p>
                    </div>
                  </AnimatedSection>

                  {/* Image */}
                  {img.path && (
                    <AnimatedSection
                      className="w-full md:w-1/2"
                      direction={index % 2 === 0 ? "right" : "left"}
                      delay={0.2}
                    >
                      <div className="overflow-hidden rounded-sm">
                        <Image
                          src={img.path}
                          alt={`${video.alt} - Behind the scenes ${index + 1}`}
                          width={800}
                          height={533}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-auto"
                        />
                      </div>
                    </AnimatedSection>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="border-t border-cinema-ash">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex justify-between items-center">
            {prevFilm ? (
              <Link
                href={`/video/${prevFilm.link}`}
                className="group flex flex-col gap-1"
              >
                <span
                  className={`${uiFont.className} text-cinema-smoke text-xs uppercase tracking-[0.15em]`}
                >
                  Previous
                </span>
                <span
                  className={`${headingFont.className} text-lg md:text-xl text-cinema-cream group-hover:text-cinema-gold transition-colors duration-300`}
                >
                  {prevFilm.alt}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextFilm ? (
              <Link
                href={`/video/${nextFilm.link}`}
                className="group flex flex-col gap-1 text-right"
              >
                <span
                  className={`${uiFont.className} text-cinema-smoke text-xs uppercase tracking-[0.15em]`}
                >
                  Next
                </span>
                <span
                  className={`${headingFont.className} text-lg md:text-xl text-cinema-cream group-hover:text-cinema-gold transition-colors duration-300`}
                >
                  {nextFilm.alt}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
