import { test } from "node:test";
import assert from "node:assert/strict";
import { irisPolygon, transitionFor } from "../app/lib/transition.ts";

test("films and about open with the clapperboard, each its own scene", () => {
  assert.deepEqual(transitionFor("/video"), { kind: "clap", scene: "01", roll: "Films" });
  assert.deepEqual(transitionFor("/about"), { kind: "clap", scene: "02", roll: "About" });
});

test("photos only get the aperture snap (photos are not film)", () => {
  assert.deepEqual(transitionFor("/photo"), { kind: "snap" });
});

test("home and detail pages keep the default curtain", () => {
  for (const p of ["/", "/video/sport_climbing_mattia", "/photo/salkantay", "/contact"]) {
    assert.deepEqual(transitionFor(p), { kind: "none" }, p);
  }
});

test("a trailing slash still counts as the same page", () => {
  assert.equal(transitionFor("/video/").kind, "clap");
});

test("iris: closed collapses to the centre, open clears the screen corners", () => {
  const w = 1600, h = 900;
  for (const [x, y] of irisPolygon(1, w, h)) {
    assert.ok(Math.abs(x) < 1e-9 && Math.abs(y) < 1e-9);
  }
  const halfDiagonal = Math.hypot(w, h) / 2;
  const open = irisPolygon(0, w, h);
  assert.equal(open.length, 7);
  // the inscribed circle of the polygon must still be outside the corners
  const inradius = Math.hypot(...open[0]) * Math.cos(Math.PI / open.length);
  assert.ok(inradius > halfDiagonal, `inradius ${inradius} <= ${halfDiagonal}`);
});
