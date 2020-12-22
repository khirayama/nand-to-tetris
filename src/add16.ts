import { Binary, Word } from './types';
import { fulladder } from './fulladder';

export function add16(a: Word, b: Word): Word {
  const out: Binary[] = [];
  let carry: Binary = 0;
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const res = fulladder(a[i], b[i], carry);
    out.unshift(res[0]);
    carry = res[1];
  }
  return out as Word;
}
