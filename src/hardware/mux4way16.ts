import { Binary, Binary2, Word } from './types';
import { mux16 } from './mux16';

export function mux4way16(a: Word, b: Word, c: Word, d: Word, sel: Binary2): Word {
  const w1 = mux16(a, c, sel[0]);
  const w2 = mux16(b, d, sel[0]);
  return mux16(w1, w2, sel[1]);
}
