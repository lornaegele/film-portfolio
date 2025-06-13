import { Footer } from "@/app/components";
import PhotoTeaser from "../../components/PhotoTeaser";
import { images } from "../../lib/constants/images";

export default function page() {
  return (
    <div>
      <div className="p-4 pt-0 flex flex-wrap justify-center gap-4 max-w-[1500px] mx-auto sm:flex-col sm:items-center">
        {images.map((image) => (
          <PhotoTeaser key={image.link} image={image} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
