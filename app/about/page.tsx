"use client";

import Image from "next/image";
import { portraitImage } from "../lib/constants/imagePaths";
import Link from "next/link";
import { useState } from "react";

export default function page() {
  return (
    <div className="p-4 pt-0 flex flex-col gap-2 max-w-5xl mx-auto ">
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
      <button className="border-1 p-4 border-black bg-black text-white">
        hallo
      </button>
      <div className="flex flex-col gap-4">
        <p>Hello there! I'm Lorenz Naegele from Germany, welcome to my page!</p>
        <div className="flex flex-col gap-2">
          <h2 className="font-extrabold">My goal with my photography</h2>
          <p>
            I want to create awareness of the beauty that lays all around us and
            within everything. And sometimes I capture a photograph simply
            because I find something beautiful. Other times I aim to capture my
            thoughts and emotions in certain situations to drag you into the
            moment.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-extrabold">My goal with my videography</h2>
          <p>
            Through my videography, I aim to capture the world as I see it,
            offering viewers a glimpse into moments through my eyes. My goal is
            to preserve beauty, emotion, and the subtle details that tell a
            story. I want to share my perspective and invite others to connect
            with the world in a way that feels both personal and relatable.
          </p>
        </div>
        <p>
          Contact:{" "}
          <Link className="underline" href="mailto:lorenznaegele@mail.de">
            lorenznaegele@mail.de
          </Link>
        </p>
      </div>
    </div>
  );
}
