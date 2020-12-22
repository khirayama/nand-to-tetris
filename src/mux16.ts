import { Binary, Word } from './types';
import { mux } from './mux';

export function mux16(a: Word, b: Word, sel: Binary): Word {
  const out: Binary[] = [];
  for (let i = 0; i < a.length; i += 1) {
    out.push(mux(a[i], b[i], sel));
  }
  return out as Word;
}
