"use client";

import Image from "next/image";
import { portraitImage } from "../lib/constants/imagePaths";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "../components";

export default function page() {
  return (
    <div className="p-6 pt-0 flex flex-col gap-6 max-w-5xl mx-auto text-gray-900">
      <div>
        <Image
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
          src={portraitImage.path} // Make sure 'link' contains the valid image path
          width={1024}
          height={1000}
          alt={portraitImage.title}
        />
        <p className="text-sm uppercase text-black text-right pt-2">
          February 2024
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium text-gray-800 px-4">
          Hello there! I&apos;m Lorenz Naegele from Germany, welcome to my page!
        </p>
        <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Freelance Web & App Development
          </h2>
          <p className="text-gray-700">
            As a freelance web developer, I offer professional web and app
            development services tailored to your needs. I specialize in finding
            custom solutions that help bring your ideas to life. Whether you
            need a modern website, a mobile app, or a complex web application, I
            can deliver clean, efficient, and scalable results.
          </p>
          <p className="text-gray-700">
            My skills include: JavaScript, TypeScript, React, React Native,
            Next.js, Angular, Tailwind CSS, OpenAI API, REST API and more.
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <h2 className="text-xl font-bold text-gray-900">
            My Filmmaking and Photography
          </h2>
          <p>
            My filmmaking is mostly focused on outdoor documentaries, telling
            authentic stories set in nature and the world of adventure sports.
            I’m passionate about capturing beauty, emotion, and the small
            details that reveal the heart of a story. Whether following a surfer
            chasing a perfect wave or a mountaineer reaching a summit, I strive
            to preserve the essence of each person and place. Through film and
            photography, I aim to inspire awareness, evoke emotion, and invite
            viewers to experience the world through my lens.
          </p>
        </div>
        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="font-bold text-xl">Contact:</h3>
          <div>
            <div>
              <Link className="underline" href="mailto:lorenznaegele@mail.de">
                lorenznaegele@mail.de
              </Link>
            </div>
            <div>
              <Link className="underline" href="mailto:lorenznaegele@mail.de">
                +49 1520 8536 210
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
