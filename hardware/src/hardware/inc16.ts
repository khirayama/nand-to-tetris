import { Word } from './types';
import { b } from './helpers';
import { add16 } from './add16';

export function inc16(input: Word): Word {
  return add16(input, b<Word>('0000 0000 0000 0001'));
}
