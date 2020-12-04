import { Bus16 } from './types';
import { add16 } from './add16';

export function inc16(input: Bus16): Bus16 {
  return add16(input, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
}
