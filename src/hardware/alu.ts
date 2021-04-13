import { Binary, Binary8, Word } from './types';
import { mux16 } from './mux16';
import { not16 } from './not16';
import { and16 } from './and16';
import { add16 } from './add16';
import { or8way } from './or8way';
import { or } from './or';
import { not } from './not';

export function alu(
  x: Word,
  y: Word,
  zx: Binary,
  nx: Binary,
  zy: Binary,
  ny: Binary,
  f: Binary,
  no: Binary,
): [Word, /* zr */ Binary, /* ng */ Binary] {
  const z: Word = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; /* 0000 0000 0000 0000 */

  const w1 = mux16(x, z, zx);
  const w2 = mux16(y, z, zy);

  const notw1 = not16(w1);
  const w3 = mux16(w1, notw1, nx);
  const notw2 = not16(w2);
  const w4 = mux16(w2, notw2, ny);

  const xandy = and16(w3, w4);
  const addxy = add16(w3, w4);
  const w5 = mux16(xandy, addxy, f);

  const notw5 = not16(w5);
  const out = mux16(w5, notw5, no);

  // const out0to7 = out.concat().splice(8, 8) as Binary8;
  // const out8to15 = out.concat().splice(0, 8) as Binary8;
  const out0to7 = out.slice(8, 16) as Binary8;
  const out8to15 = out.slice(0, 8) as Binary8;
  const ng = out[0];

  const or0to7 = or8way(out0to7);
  const or8to15 = or8way(out8to15);
  const or0to16 = or(or0to7, or8to15);
  const zr = not(or0to16);

  return [out, zr, ng];
}
