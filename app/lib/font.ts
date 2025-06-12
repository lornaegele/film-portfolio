// fonts.ts
import { Montserrat, DynaPuff, Luckiest_Guy } from "next/font/google";

export const mainFont = Montserrat({ weight: "400", subsets: ["latin"] });
export const headingFont = DynaPuff({ weight: "400", subsets: ["latin"] });
export const subHeadingFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});
