/**
 * Home focus ring: scroll moves the focus 1:1 with the wheel/finger, signed.
 * 0 = sharp, 1 = fully out of focus; `full` is the scroll distance for the whole range.
 */
export function scrollFocus(k: number, delta: number, full: number): number {
  return Math.min(1, Math.max(0, k + delta / full));
}

/** random photo for this visit of the home page */
export function pickSlide(count: number, random: () => number = Math.random): number {
  return Math.min(count - 1, Math.floor(random() * count));
}

/**
 * One animation frame of the focus drifting back to sharp. Nothing happens while a finger is still down
 * (`holding`) or within 220ms of the last scroll; then it eases back and snaps to 0 when nearly sharp.
 */
export function driftFocus(k: number, msSinceInput: number, holding: boolean): number {
  if (holding || msSinceInput <= 220) return k;
  return k < 0.002 ? 0 : k * 0.93;
}
