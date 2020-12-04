import { Binary } from './types';
import { halfadder } from './halfadder';
import { or } from './or';

export function fulladder(a: Binary, b: Binary, c: Binary): [Binary, Binary] {
  const [s1, c1] = halfadder(a, b);
  const [sum, c2] = halfadder(s1, c);
  const carry = or(c1, c2);
  return [sum, carry];
}
