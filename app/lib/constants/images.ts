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
    ...findImageByAlt("san-petro-valley_2")!,
    link: "photo-gallery",
    displayName: "photo gallery",
  },
  {
    ...findImageByAlt("lobitos-surfer")!,
    link: "video-projects",
    displayName: "video projects",
  },
  // {
  //   ...findImageByAlt("uyuni-guide")!,
  //   link: "web-development",
  //   displayName: "web development",
  // },
  // {
  //   path: portraitImage.path,
  //   alt: portraitImage.title,
  //   link: "about",
  //   displayName: "about",
  // },
];

export default teaserImages;
