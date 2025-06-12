// fonts.ts
import { DynaPuff, Luckiest_Guy, NTR } from "next/font/google";

export const mainFont = NTR({ weight: "400", subsets: ["latin"] });
export const headingFont = DynaPuff({ weight: "400", subsets: ["latin"] });
export const subHeadingFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});
