"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { VideoThumbnail, FestivalAward } from "@/app/lib/interfaces";
import { headingFont, uiFont } from "@/app/lib/font";
import AnimatedSection from "@/app/components/AnimatedSection";
import { Button } from "@/app/components/Button";

interface FilmDetailContentProps {
  video: VideoThumbnail;
  prevFilm: VideoThumbnail | null;
  nextFilm: VideoThumbnail | null;
}

function awardStyle(award: FestivalAward): string {
  if (award === "Honorable Mention")
    return "border-cinema-gold text-cinema-gold/80";
  if (award === "Finalist")
    return "border-cinema-gold/70 text-cinema-gold/90 bg-cinema-gold/5";
  if (award === "Nominee") return "border-cinema-gold/50 text-cinema-gold/80";
  return "border-cinema-ash text-cinema-silver";
}

function extractPullQuote(description: string): string {
  // Pull the first sentence or the first 140 chars, whichever ends sooner.
  const firstStop = description.indexOf(". ");
  if (firstStop > 30 && firstStop < 200)
    return description.slice(0, firstStop + 1);
  return description.slice(0, 160) + (description.length > 160 ? "…" : "");
}

export default function FilmDetailContent({
  video,
  prevFilm,
  nextFilm,
}: FilmDetailContentProps) {
  const pullQuote = extractPullQuote(video.description);

  // Press-kit metadata derived from the film data (fallbacks where missing).
  const meta: { label: string; value: string }[] = [
    { label: "Year", value: video.dateTaken },
    { label: "Runtime", value: video.duration ?? "—" },
    { label: "Format", value: "Short Documentary" },
    { label: "Role", value: "Director · Cinematographer · Editor" },
  ];

  return (
    <div>
      {/* Hero — typographic */}
      <section className="relative px-6 md:px-10 pt-8 md:pt-16 pb-16 md:pb-24 overflow-hidden">
        {/* Decorative large background text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span
            className={`${headingFont.className} text-[12vw] leading-none text-cinema-cream whitespace-nowrap`}
          >
            {video.alt}
          </span>
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-12 h-px bg-cinema-gold" />
            <p
              className={`${uiFont.className} text-cinema-gold uppercase tracking-[0.25em] text-xs md:text-sm`}
            >
              Short Documentary · {video.dateTaken}
              {video.duration && ` · ${video.duration}`}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`${headingFont.className} text-4xl md:text-6xl lg:text-7xl text-cinema-cream mb-10 max-w-3xl`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {video.alt}
          </motion.h1>

          {/* Metadata strip — press kit style */}
          <motion.dl
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10 border-t border-b border-cinema-ash/60 py-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt
                  className={`${uiFont.className} text-cinema-gold text-caption uppercase mb-2`}
                >
                  {m.label}
                </dt>
                <dd
                  className={`${uiFont.className} text-cinema-cream text-sm leading-tight`}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Watch button */}
          {video.ytLink && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Button href={video.ytLink} variant="ghost" size="lg" external>
                <FaYoutube size={20} />
                Watch Film
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Poster + Description */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {video.posterPath && (
              <AnimatedSection
                className="w-full md:w-2/5 shrink-0"
                direction="left"
              >
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

            <div className="flex flex-col justify-center gap-6">
              <AnimatedSection delay={0.1}>
                <p className="text-lg md:text-xl text-cinema-silver leading-relaxed">
                  {video.description}
                </p>
              </AnimatedSection>

              {video.duration && (
                <AnimatedSection delay={0.2}>
                  <p
                    className={`${uiFont.className} text-cinema-smoke text-caption uppercase`}
                  >
                    Duration · {video.duration}
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

      {/* Pull quote */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="w-12 h-[1px] bg-cinema-gold mx-auto mb-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <AnimatedSection>
            <blockquote
              className={`${headingFont.className} italic text-display-sm md:text-display text-cinema-cream leading-[1.2]`}
            >
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
          </AnimatedSection>
          <motion.div
            className="w-12 h-[1px] bg-cinema-gold mx-auto mt-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          />
        </div>
      </section>

      {/* Behind the Scenes (existing rich imagery) */}
      {video.images.length > 0 && (
        <section className="px-6 md:px-10 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="mb-12 md:mb-16">
              <span
                className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-3`}
              >
                Field notes
              </span>
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

      {/* Festival laurels */}
      {video.festivals && video.festivals.length > 0 && (
        <section className="px-6 md:px-10 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <span
                className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-6`}
              >
                Festival Recognition
              </span>
              <div className="flex flex-wrap gap-3">
                {video.festivals.map((f) => (
                  <div
                    key={f.name}
                    className={`${uiFont.className} inline-flex flex-col items-center border rounded-sm px-4 py-3 text-center ${awardStyle(f.award)}`}
                  >
                    <span className="text-[0.6rem] uppercase tracking-[0.18em] mb-1 opacity-70">
                      {f.award}
                    </span>
                    <span className="text-xs leading-snug max-w-[140px]">
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Next film — subtle inline teaser */}
      {nextFilm && (
        <section className="px-6 md:px-10 pb-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <Link
                href={`/video/${nextFilm.link}`}
                className="group flex items-center gap-6 md:gap-10 py-8 border-t border-cinema-ash/60 hover:border-cinema-gold/40 transition-colors duration-300"
              >
                {/* Small thumbnail */}
                {nextFilm.thumbnail.path && (
                  <div className="relative w-20 h-12 md:w-28 md:h-16 shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={nextFilm.thumbnail.path}
                      alt={nextFilm.alt}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      sizes="112px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span
                    className={`${uiFont.className} text-cinema-gold text-caption uppercase block mb-2`}
                  >
                    Next Film
                  </span>
                  <h3
                    className={`${headingFont.className} text-cinema-cream text-xl md:text-2xl group-hover:text-cinema-gold transition-colors duration-300 truncate`}
                  >
                    {nextFilm.alt}
                  </h3>
                  <span
                    className={`${uiFont.className} text-cinema-smoke text-caption uppercase mt-1 block`}
                  >
                    {nextFilm.dateTaken}
                    {nextFilm.duration && ` · ${nextFilm.duration}`}
                  </span>
                </div>
                <span className="text-cinema-gold/40 group-hover:text-cinema-gold transition-colors duration-300 shrink-0">
                  →
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
