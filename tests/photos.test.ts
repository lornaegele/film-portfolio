import { test } from "node:test";
import assert from "node:assert/strict";
import { imagesWithDesc } from "../app/lib/constants/imagePaths.ts";

// the photos page lists imagesWithDesc in order (app/lib/constants/images.ts)
test("the photos page opens with Wander Unshod", () => {
  assert.equal(imagesWithDesc[0].path, "/fotos/uyuni-guide.WEBP");
});

test("no photo is listed twice", () => {
  const paths = imagesWithDesc.map((i) => i.path);
  assert.equal(new Set(paths).size, paths.length);
});
