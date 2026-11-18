/** Page transitions: Films and About open with the clapperboard, Photos with an aperture snap. */
export type Transition =
  | { kind: "clap"; scene: string; roll: string }
  | { kind: "snap" }
  | { kind: "none" };

const ROUTES: Record<string, Transition> = {
  "/video": { kind: "clap", scene: "01", roll: "Films" },
  "/about": { kind: "clap", scene: "02", roll: "About" },
  "/photo": { kind: "snap" },
};

export function transitionFor(pathname: string): Transition {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ROUTES[p] ?? { kind: "none" };
}

export const IRIS_BLADES = 7;

/**
 * Aperture hole as a regular polygon centred on (0,0).
 * k = 0 is fully open (hole wider than the screen), k = 1 closed (a point); the blades turn as they close.
 */
export function irisPolygon(k: number, w: number, h: number, blades = IRIS_BLADES): [number, number][] {
  // radius whose inscribed circle still clears the corners
  const open = Math.hypot(w, h) / 2 / Math.cos(Math.PI / blades) + 40;
  const r = open * (1 - k);
  const rot = (k * 70 * Math.PI) / 180;
  return Array.from({ length: blades }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / blades;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });
}
