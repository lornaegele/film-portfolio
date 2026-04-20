import {
  DynaPuff,
  Playfair_Display,
  DM_Sans,
  Space_Grotesk,
} from "next/font/google";

export const logoFont = DynaPuff({ weight: "400", subsets: ["latin"] });

export const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const uiFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
