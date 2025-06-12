import { Teaser } from "./components";
import teaserImages from "./lib/constants/images";

export default function Home() {
  return (
    <div className="p-6 md:p-8 md:pt-4 pt-2 grid custom-grid max-w-[1400px] mx-auto ">
      {teaserImages.map((image) => (
        <div className="md:h-[calc(100svh_-_188px)] h-[calc(50svh_-_76px)]">
          <Teaser key={image.link} teaserImage={image} />
        </div>
      ))}
    </div>
  );
}
