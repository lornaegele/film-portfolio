import { CustomImage, ImageTeaser, VideoThumbnail } from "../interfaces";
import { imagesWithDesc } from "./imagePaths";
import { videos } from "./videos";

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
      type: "photo",
    };
  });

type MediaItem = CustomImage | VideoThumbnail;

function structuredMix(
  images: CustomImage[],
  videos: VideoThumbnail[],
): MediaItem[] {
  const mixed: MediaItem[] = [];
  const imageQueue = [...images];
  const videoQueue = [...videos];

  const pattern = [0, 0, 2, 2, 0, 2, 0, 3, 0, 1]; // 0: video, number: images
  let patternIndex = 0;

  while (imageQueue.length || videoQueue.length) {
    const next = pattern[patternIndex % pattern.length];
    patternIndex++;

    if (next === 0) {
      if (videoQueue.length) {
        mixed.push(videoQueue.shift()!);
      } else if (imageQueue.length) {
        mixed.push(imageQueue.shift()!);
      }
    } else {
      for (let i = 0; i < next && imageQueue.length; i++) {
        mixed.push(imageQueue.shift()!);
      }
    }
  }

  return mixed;
}

export const mediaMixed: (CustomImage | VideoThumbnail)[] = structuredMix(
  images,
  videos,
);
