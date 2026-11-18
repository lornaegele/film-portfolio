import { test } from "node:test";
import assert from "node:assert/strict";
import { toLines } from "../app/lib/text.ts";

test("toLines keeps words whole and packs them up to the limit", () => {
  assert.deepEqual(toLines("Finding flow in the Fight"), ["Finding flow", "in the Fight"]);
  assert.deepEqual(toLines("Shape the future"), ["Shape the", "future"]);
});

test("toLines never splits a word longer than the limit", () => {
  assert.deepEqual(toLines("Huacachina Desert", 6), ["Huacachina", "Desert"]);
});
