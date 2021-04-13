import { Binary, Word } from './types';
import { and } from './and';

export function and16(a: Word, b: Word): Word {
  const out: Binary[] = [];
  for (let i = 0; i < a.length; i += 1) {
    out.push(and(a[i], b[i]));
  }
  return out as Word;
}
