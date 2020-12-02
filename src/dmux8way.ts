import { Binary, Bus8 } from './types';
import { dmux } from './dmux';
import { dmux4way } from './dmux4way';

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

export function dmux8way(input: Binary, sel: [Binary, Binary, Binary]): Bus8 {
  const [w1, w2, w3, w4] = dmux4way(input, [sel[0], sel[1]]);
  return [...dmux(w1, sel[2]), ...dmux(w2, sel[2]), ...dmux(w3, sel[2]), ...dmux(w4, sel[2])];
}
