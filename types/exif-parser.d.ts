declare module "exif-parser" {
  interface Tags {
    DateTimeOriginal?: number;
    [key: string]: any;
  }

  interface ImageMetadata {
    tags: Tags;
    [key: string]: any;
  }

  interface ExifParser {
    parse: () => ImageMetadata;
  }

  const create: (buffer: Buffer) => ExifParser;

  export { create };
}
