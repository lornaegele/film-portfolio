/**
 * Encode quality for every next/image. The sources are already-compressed WebP/JPEG, so the default (75)
 * compresses them a second time and smears detail; 90 keeps them close to the originals.
 */
export const IMG_QUALITY = 90;
