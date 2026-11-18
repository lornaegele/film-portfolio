// Run with `npm test` (Node's built-in test runner + type stripping, no extra deps).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { videos } from "../app/lib/constants/videos.ts";

const publicPath = (p: string) => join(import.meta.dirname, "..", "public", p);

test("film slugs are unique", () => {
  const slugs = videos.map((v) => v.link);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("every image a film page uses exists in /public", () => {
  for (const v of videos) {
    const paths = [v.thumbnail.path, v.cover, v.laurel, ...v.images.map((i) => i.path)].filter(Boolean) as string[];
    for (const p of paths) assert.ok(existsSync(publicPath(p)), `${v.link}: ${p} not found`);
  }
});

test("every film has a genre, a location and a clean cover still", () => {
  for (const v of videos) {
    assert.ok(v.genre, `${v.link}: no genre`);
    assert.ok(v.place, `${v.link}: no place`);
    assert.ok(v.cover, `${v.link}: no cover`);
  }
});

test("only the DOK.fest winner shows the laurel", () => {
  const withLaurel = videos.filter((v) => v.laurel).map((v) => v.link);
  assert.deepEqual(withLaurel, ["sport_climbing_mattia"]);
  const film = videos.find((v) => v.link === "sport_climbing_mattia")!;
  assert.ok(film.festivals?.some((f) => f.award === "Winner" && f.name.includes("DOK.fest")));
});

test("Echoes of the Ocean links to the new YouTube upload", () => {
  const echoes = videos.find((v) => v.link === "echoes_of_the_ocean");
  assert.equal(echoes?.ytLink, "https://youtu.be/7S_wxLpNH7A");
});

test("Shape the Future: chapter 01 still is the hero, chapters 01 and 03 swap pictures", () => {
  const f = videos.find((v) => v.link === "shape_the_future")!;
  assert.equal(f.cover, "/fotos/shape_the_future_2.webp");
  assert.deepEqual(
    f.images.map((i) => i.path),
    ["/fotos/shape_the_future_4.webp", "/fotos/shape_the_future_1.webp", "/fotos/shape_the_future_2.webp", "/fotos/shape_the_future_3.webp"],
  );
  // texts stay in their places
  assert.match(f.images[0].description!, /^Surfing has always been/);
  assert.match(f.images[2].description!, /^I spent a week in Kiel/);
});

test("Echoes of the Ocean: the overview tile leads with the second still", () => {
  const f = videos.find((v) => v.link === "echoes_of_the_ocean")!;
  assert.equal(f.cover, "/fotos/echoes_of_the_ocean_1.webp");
});

test("the No Service film is titled just 'Unser erster Song' (URL unchanged)", () => {
  const f = videos.find((v) => v.link === "no_service")!;
  assert.equal(f.alt, "Unser erster Song");
});
