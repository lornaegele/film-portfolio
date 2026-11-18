import { test } from "node:test";
import assert from "node:assert/strict";
import { driftFocus, pickSlide, scrollFocus } from "../app/lib/focus.ts";

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

test("focus holds while a finger is still on the screen, even without moving", () => {
  assert.equal(driftFocus(0.5, 2000, true), 0.5);
});

test("focus waits a moment after the last input, then drifts back to sharp", () => {
  assert.equal(driftFocus(0.5, 100, false), 0.5);
  const k = driftFocus(0.5, 400, false);
  assert.ok(k < 0.5 && k > 0.4, String(k));
  assert.equal(driftFocus(0.001, 400, false), 0);
});
