import { Footer } from "@/app/components";
import PhotoTeaser from "../components/PhotoTeaser";
import { images, mediaMixed } from "../lib/constants/images";

export default function page() {
  return (
    <div>
      <div className="p-6 pt-0 flex flex-wrap flex-row justify-center md:gap-12 gap-6 max-w-[1500px] mx-auto md:items-center">
        {mediaMixed.map((media) => (
          <PhotoTeaser key={media.link} image={media} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
