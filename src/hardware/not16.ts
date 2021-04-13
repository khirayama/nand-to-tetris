import { Word } from './types';
import { not } from './not';

export function not16(input: Word): Word {
  return input.map((i) => not(i)) as Word;
}
