import { Binary, Bus16 } from './types';
import { mux16 } from './mux16';
import { mux4way16 } from './mux4way16';

/*
 * 000 a
 * 001 b
 * 010 c
 * 011 d
 * 100 e
 * 101 f
 * 110 g
 * 111 h
 */

export function mux8way16(
  a: Bus16,
  b: Bus16,
  c: Bus16,
  d: Bus16,
  e: Bus16,
  f: Bus16,
  g: Bus16,
  h: Bus16,
  sel: [Binary, Binary, Binary],
): Bus16 {
  const w1 = mux4way16(a, c, e, g, [sel[0], sel[1]]);
  const w2 = mux4way16(b, d, f, h, [sel[0], sel[1]]);
  return mux16(w1, w2, sel[2]);
}
