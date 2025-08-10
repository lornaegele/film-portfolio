import { Footer } from "@/app/components";
import MixedMediaTeaser from "../components/MixedMediaTeaser";
import { images, mediaMixed } from "../lib/constants/images";

export default function page() {
  return (
    <div>
      <div className="p-4 pt-0 flex flex-wrap flex-row justify-center md:gap-12 gap-6 max-w-[1500px] mx-auto md:items-center">
        {mediaMixed.map((media, index) => {
          const sizeClass =
            index % 4 === 0
              ? "w-full md:w-1/2"
              : index % 4 === 1
              ? "w-4/5 md:w-2/5"
              : index % 4 === 2
              ? "w-[90%] md:w-[40%]"
              : "w-5/6 md:w-1/3";
          return (
            <div key={media.link} className={`${sizeClass} `}>
              <MixedMediaTeaser image={media} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
