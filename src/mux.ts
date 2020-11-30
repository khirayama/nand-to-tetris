import { Binary } from './types';
import { not } from './not';
import { and } from './and';
import { or } from './or';

export function mux(a: Binary, b: Binary, sel: Binary) {
  const notsel = not(sel);
  const w1 = and(a, notsel);
  const w2 = and(b, sel);
  return or(w1, w2);
}
