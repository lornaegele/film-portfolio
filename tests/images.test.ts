import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const appDir = join(import.meta.dirname, "..", "app");
const tsxFiles = (readdirSync(appDir, { recursive: true }) as string[]).filter((f) => f.endsWith(".tsx"));

// The sources are already-compressed WebP/JPEG; next/image's default quality (75) re-encodes them a second time
// and visibly smears detail. Every <Image> has to ask for the shared high quality instead.
test("every next/image sets quality={IMG_QUALITY}", () => {
  for (const f of tsxFiles) {
    const src = readFileSync(join(appDir, f), "utf8");
    const tags = src.match(/<Image\b[\s\S]*?\/>/g) ?? [];
    for (const tag of tags) assert.match(tag, /quality=\{IMG_QUALITY\}/, `${f}: ${tag.slice(0, 80)}`);
  }
});
