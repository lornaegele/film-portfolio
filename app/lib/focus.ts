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
