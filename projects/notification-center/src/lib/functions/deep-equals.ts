import equal from 'fast-deep-equal';

/**
 * deep equals 2 objects
 */
export function deepEquals(x: unknown, y: unknown): boolean {
  return equal(x, y);
}
