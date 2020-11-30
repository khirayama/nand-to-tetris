import { Bus16 } from './types';
import { not } from './not';

export function not16(input: Bus16): Bus16 {
  return input.map((i) => not(i)) as Bus16;
}
