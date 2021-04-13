import { Word } from './types';
import { add16 } from './add16';

export function inc16(input: Word): Word {
  return add16(input, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
}
