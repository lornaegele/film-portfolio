/**
 * Page transitions: Films and About open with the clapperboard, Photos with an aperture snap,
 * every other page (home, film / photo pages) with the curtain that shows the page name.
 */
export type Transition =
  | { kind: "clap"; scene: string; roll: string }
  | { kind: "snap" }
  | { kind: "curtain" };

const ROUTES: Record<string, Transition> = {
  "/video": { kind: "clap", scene: "01", roll: "Films" },
  "/about": { kind: "clap", scene: "02", roll: "About" },
  "/photo": { kind: "snap" },
};

export function transitionFor(pathname: string): Transition {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ROUTES[p] ?? { kind: "curtain" };
}
