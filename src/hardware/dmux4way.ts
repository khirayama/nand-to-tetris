import { Binary } from './types';
import { dmux } from './dmux';

/*
 * 00 a
 * 01 b
 * 10 c
 * 11 d
 */

export function dmux4way(input: Binary, sel: [Binary, Binary]): [Binary, Binary, Binary, Binary] {
  const [w1, w2] = dmux(input, sel[0]);
  return [...dmux(w1, sel[1]), ...dmux(w2, sel[1])];
}
