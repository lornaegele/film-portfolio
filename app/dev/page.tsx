import { Footer } from "../components";
import PortfolioTeaser from "../components/PortfolioTeaser";

const page = () => {
  return (
    <div>
      <div className="p-4 pt-0 flex flex-wrap flex-row justify-center md:gap-12 gap-6 max-w-[1500px] mx-auto md:items-center">
        <PortfolioTeaser />
      </div>
      <Footer />
    </div>
  );
};

export default page;
