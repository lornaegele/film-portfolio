"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { VideoThumbnail } from "../lib/interfaces";
import { headingFont, uiFont } from "../lib/font";
import { HiOutlineCalendar } from "react-icons/hi2";

interface FilmPosterCardProps {
  film: VideoThumbnail;
  index: number;
}

const FilmPosterCard = ({ film, index }: FilmPosterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link href={`/video/${film.link}`} className="group block">
        {/* Thumbnail Image (16:9) */}
        <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
          <Image
            src={film.thumbnail.path || ""}
            alt={film.alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        </div>

        {/* Date */}
        <div className={`${uiFont.className} flex items-center gap-4 mt-3`}>
          <span className="flex items-center gap-1.5 text-cinema-smoke text-xs uppercase tracking-[0.15em]">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            {film.dateTaken}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default FilmPosterCard;
