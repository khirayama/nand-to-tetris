import { Binary, Bus16 } from './types';
import { and } from './and';

export function and16(a: Bus16, b: Bus16): Bus16 {
  const out: Binary[] = [];
  for (let i = 0; i < a.length; i += 1) {
    out.push(and(a[i], b[i]));
  }
  return out as Bus16;
}
