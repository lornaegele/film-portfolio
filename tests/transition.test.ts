import { test } from "node:test";
import assert from "node:assert/strict";
import { transitionFor } from "../app/lib/transition.ts";

test("films and about open with the clapperboard, each its own scene", () => {
  assert.deepEqual(transitionFor("/video"), { kind: "clap", scene: "01", roll: "Films" });
  assert.deepEqual(transitionFor("/about"), { kind: "clap", scene: "02", roll: "About" });
});

test("photos only get the aperture snap (photos are not film)", () => {
  assert.deepEqual(transitionFor("/photo"), { kind: "snap" });
});

test("home and detail pages get the curtain (covers, shows the page name, lifts)", () => {
  for (const p of ["/", "/video/sport_climbing_mattia", "/photo/salkantay", "/contact"]) {
    assert.deepEqual(transitionFor(p), { kind: "curtain" }, p);
  }
});

test("a trailing slash still counts as the same page", () => {
  assert.equal(transitionFor("/video/").kind, "clap");
});
