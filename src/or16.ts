import { Binary, Word } from './types';
import { or } from './or';

export function or16(a: Word, b: Word): Word {
  const out: Binary[] = [];
  for (let i = 0; i < a.length; i += 1) {
    out.push(or(a[i], b[i]));
  }
  return out as Word;
}
