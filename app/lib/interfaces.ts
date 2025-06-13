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

export interface VideoThumbnail {
  path: string;
  link: string;
  dateTaken: string;
  alt: string;
}
