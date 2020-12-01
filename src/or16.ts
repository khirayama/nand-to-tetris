import { Binary, Bus16 } from './types';
import { or } from './or';

export function or16(a: Bus16, b: Bus16): Bus16 {
  const out: Binary[] = [];
  for (let i = 0; i < a.length; i += 1) {
    out.push(or(a[i], b[i]));
  }
  return out as Bus16;
}
