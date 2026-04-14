import Image from "next/image";
import { portraitImage } from "../lib/constants/imagePaths";
import Link from "next/link";
import { Footer } from "../components";
import { headingFont } from "../lib/font";

export default function page() {
  return (
    <div className="p-6 pt-0 flex flex-col gap-6 max-w-5xl mx-auto text-gray-900">
      <div>
        <Image
          className="h-full w-full object-cover"
          src={portraitImage.path}
          width={1024}
          height={1000}
          alt={portraitImage.title}
        />
        <p className="text-sm uppercase text-black text-right pt-2">
          February 2024
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <p className="text-gray-700 text-lg">
            <span className={`${headingFont.className} text-2xl text-black inline-block`}>
              Hello there!
            </span>
            <svg className="squiggle-underline block" width="120" height="8" viewBox="0 0 120 8" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,5 Q15,0 30,5 T60,5 T90,5 T120,5" fill="none" stroke="#ffda09" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="mt-1 block">
              I&apos;m Lorenz Naegele from Germany, welcome to my page!
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <h2 className={`text-xl text-gray-900 ${headingFont.className}`} style={{ transform: "rotate(-1deg)" }}>
            My Filmmaking and Photography
          </h2>
          <p className="text-lg text-gray-500">
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
        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
