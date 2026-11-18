import { test } from "node:test";
import assert from "node:assert/strict";
import { imageSize } from "../app/lib/imageSize.ts";
import { videos } from "../app/lib/constants/videos.ts";

// reference sizes from macOS `sips`
test("reads JPEG, PNG and WebP (lossy, lossless/extended) sizes from /public paths", () => {
  assert.deepEqual(imageSize("/fotos/shape_the_future_thumbnail.jpg"), { width: 1280, height: 720 });
  assert.deepEqual(imageSize("/fotos/dokfest_muenchen_laurel.png"), { width: 1122, height: 508 });
  assert.deepEqual(imageSize("/fotos/shape_the_future_2.webp"), { width: 3402, height: 1778 });
  assert.deepEqual(imageSize("/fotos/sport_climbing_mattia-1.webp"), { width: 1355, height: 2032 });
  assert.deepEqual(imageSize("/fotos/no_service.webp"), { width: 1274, height: 711 });
});

test("every film cover and thumbnail has a readable size (grid and film page use it for the frame)", () => {
  for (const v of videos) {
    for (const p of [v.cover, v.thumbnail.path]) {
      const s = imageSize(p!);
      assert.ok(s.width > 0 && s.height > 0, `${v.link}: ${p}`);
    }
  }
});
