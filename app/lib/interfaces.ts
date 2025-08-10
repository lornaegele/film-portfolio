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

export interface Image {
  path?: string;
  description?: string;
}

export interface Thumbnail {
  images: Image[];
  thumbnail: Image;
  description: string;
  link: string;
  ytLink: string;
  dateTaken: string;
  alt: string;
  type: "video";
}
export interface DevProject {
  images: Image[];
  thumbnail: Image;
  description: string;
  link: string;
  ytLink: string;
  dateTaken: string;
  alt: string;
  type: "video";
}
