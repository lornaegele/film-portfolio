"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { VideoThumbnail } from "../lib/interfaces";
import { headingFont, uiFont } from "../lib/font";
import { HiOutlineCalendar } from "react-icons/hi2";

interface FilmCardProps {
  film: VideoThumbnail;
  index: number;
}

const FilmCard = ({ film, index }: FilmCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link href={`/video/${film.link}`} className="group block">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
          <Image
            src={film.thumbnail.path || ""}
            alt={film.alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
          />
        </div>

        {/* Date */}
        <div className="mt-3">
          <span
            className={`${uiFont.className} flex items-center gap-1.5 text-cinema-smoke text-xs uppercase tracking-[0.15em]`}
          >
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            {film.dateTaken}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default FilmCard;
