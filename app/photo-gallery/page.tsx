import PhotoTeaser from "../components/PhotoTeaser";
import { images } from "../lib/constants/images";

export default function page() {
  return (
    <div className="p-4 pt-0 grid custom-grid max-w-[1500px] mx-auto ">
      {images.map((image) => (
        <PhotoTeaser key={image.link} image={image} />
      ))}
    </div>
  );
}
