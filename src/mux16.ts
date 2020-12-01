import { Binary, Bus16 } from './types';
import { mux } from './mux';

export function mux16(a: Bus16, b: Bus16, sel: Binary): Bus16 {
  const out: Binary[] = [];
  for (let i = 0; i < a.length; i += 1) {
    out.push(mux(a[i], b[i], sel));
  }
  return out as Bus16;
}
