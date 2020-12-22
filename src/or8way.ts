import { Binary, Binary8 } from './types';
import { or } from './or';

export function or8way(input: Binary8): Binary {
  let out: Binary = or(input[0], input[1]);
  for (let i = 2; i < input.length; i += 1) {
    out = or(out, input[i]);
  }
  return out;
}
