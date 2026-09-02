/** Clamp a number to a range. */
export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/** Linear interpolation. */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Normalize a value to 0..1. */
export const invLerp = (a, b, value) => a === b ? 0 : clamp((value - a) / (b - a));

/** Map a value from one range to another. */
export const mapRange = (value, inMin, inMax, outMin, outMax) => lerp(outMin, outMax, invLerp(inMin, inMax, value));
