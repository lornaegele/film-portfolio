export interface NavItem {
  name: string;
  link: string;
  external?: boolean;
}

export interface ImagesWithDesc {
  path: string;
  description: string;
  title: string;
}

export interface CustomImage {
  title: string;
  path: string;
  alt: string;
  description: string;
  link: string;
  type: "photo";
}

export interface VideoThumbnailImage {
  path?: string;
  description?: string;
}

export type FestivalAward =
  | "Official Selection"
  | "Honorable Mention"
  | "Finalist"
  | "Nominee"
  | "Winner";

export interface Festival {
  name: string;
  award: FestivalAward;
}

export interface VideoThumbnail {
  images: VideoThumbnailImage[];
  thumbnail: VideoThumbnailImage;
  posterPath?: string;
  duration?: string;
  description: string;
  link: string;
  ytLink?: string;
  dateTaken: string;
  alt: string;
  type: "video";
  festivals?: Festival[];
  externalLink?: {
    url: string;
    label: string;
  };
  /** overview caption, e.g. "Surf documentary" */
  genre: string;
  place: string;
  /** clean still for the film page hero (the thumbnail has title art baked in) */
  cover: string;
  /** festival laurel image shown on the film page (DOK.fest win) */
  laurel?: string;
}

