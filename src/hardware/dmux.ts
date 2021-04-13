import { Binary } from './types';
import { not } from './not';
import { and } from './and';

export function dmux(input: Binary, sel: Binary): [Binary, Binary] {
  const a = and(input, not(sel));
  const b = and(input, sel);
  return [a, b];
}
