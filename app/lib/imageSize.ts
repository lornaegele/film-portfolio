import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface Size {
  width: number;
  height: number;
}

/**
 * Pixel size of an image in /public, read from its file header (JPEG, PNG, WebP).
 * Server/build-time only: lets frames take each image's own aspect ratio so nothing gets cropped.
 */
export function imageSize(publicPath: string): Size {
  const b = readFileSync(join(process.cwd(), "public", publicPath));

  // PNG: IHDR right after the signature
  if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };

  // WebP: RIFF....WEBP + VP8 / VP8L / VP8X chunk
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const v = b.readUInt32LE(21);
      return { width: (v & 0x3fff) + 1, height: ((v >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  }

  // JPEG: walk the segments to the first SOFn frame header
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }

  throw new Error(`imageSize: unsupported or unreadable image ${publicPath}`);
}
