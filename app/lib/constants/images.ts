import { CustomImage, ImageTeaser } from "../interfaces";
import { imagesWithDesc, portraitImage } from "./imagePaths";

export const images: CustomImage[] = imagesWithDesc
  .filter((path) => !path.path.includes("self-portrait"))
  .map((path) => {
    const link = path.path.split("/").pop()?.replace(".WEBP", "");
    return {
      title: path.title,
      path: path.path,
      alt: path.title,
      description: path.description,
      link: link || "",
    };
  });

// Function to find an image by alt name
const findImageByAlt = (path: string): CustomImage | undefined => {
  return images.find((image) => image.link === path);
};

// Create the teaserImages array
const teaserImages: ImageTeaser[] = [
  {
    path: "/fotos/person-coding.WEBP",
    alt: "peron-coding",
    link: "dev",
    displayName: "Code & Development",
  },
  {
    path: "/fotos/san-pedro-valley_2.WEBP",
    alt: "forrest",
    link: "visual-work",
    displayName: "Visual work",
  },
];

export default teaserImages;
