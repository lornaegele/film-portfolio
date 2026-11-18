import { test } from "node:test";
import assert from "node:assert/strict";
import { pickSlide, scrollFocus } from "../app/lib/focus.ts";

test("scrolling down defocuses, scrolling up refocuses, by the same amount", () => {
  const down = scrollFocus(0, 300, 900);
  assert.equal(down, 300 / 900);
  assert.equal(scrollFocus(down, -300, 900), 0);
});

test("focus stays between sharp (0) and fully out of focus (1)", () => {
  assert.equal(scrollFocus(0, -500, 900), 0);
  assert.equal(scrollFocus(0.9, 500, 900), 1);
});

test("a random slide index is always a valid one", () => {
  assert.equal(pickSlide(6, () => 0), 0);
  assert.equal(pickSlide(6, () => 0.9999), 5);
  for (let i = 0; i < 100; i++) {
    const k = pickSlide(6);
    assert.ok(Number.isInteger(k) && k >= 0 && k < 6);
  }
});
