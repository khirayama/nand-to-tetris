import { Binary } from './types';
import { not } from './not';
import { xor } from './xor';
import { and } from './and';

export function halfadder(a: Binary, b: Binary): [Binary, Binary] {
  const sum = not(xor(a, b));
  const carry = and(a, b);
  return [sum, carry];
}
