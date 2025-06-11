import { Teaser } from "./components";
import teaserImages from "./lib/constants/images";

export default function Home() {
  return (
    <div className="p-4 pt-0 grid custom-grid max-w-[1500px] mx-auto ">
      {teaserImages.map((image) => (
        <div className="md:h-[calc(100svh_-_72px)] h-[calc(50svh_-_46px)]">
          <Teaser key={image.link} teaserImage={image} />
        </div>
      ))}
    </div>
  );
}
