export interface NavItem {
  name: string;
  link: string;
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

export interface ImageTeaser {
  path: string;
  alt: string;
  link: string;
  displayName: string;
}

export interface Title {
  name: string;
}

export interface VideoThumbnailImage {
  path?: string;
  description?: string;
}

export interface VideoThumbnail {
  images: VideoThumbnailImage[];
  thumbnail: VideoThumbnailImage;
  description: string;
  link: string;
  ytLink: string;
  dateTaken: string;
  alt: string;
  type: "video";
}
