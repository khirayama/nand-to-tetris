import { Binary, Bus16 } from './types';
import { mux16 } from './mux16';

export function mux4way16(a: Bus16, b: Bus16, c: Bus16, d: Bus16, sel: [Binary, Binary]): Bus16 {
  const w1 = mux16(a, c, sel[0]);
  const w2 = mux16(b, d, sel[0]);
  return mux16(w1, w2, sel[1]);
}
