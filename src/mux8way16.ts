import { Binary3, Word } from './types';
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
export function mux8way16(a: Word, b: Word, c: Word, d: Word, e: Word, f: Word, g: Word, h: Word, sel: Binary3): Word {
  const w1 = mux4way16(a, c, e, g, [sel[0], sel[1]]);
  const w2 = mux4way16(b, d, f, h, [sel[0], sel[1]]);
  return mux16(w1, w2, sel[2]);
}
