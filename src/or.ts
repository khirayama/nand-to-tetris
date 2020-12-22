import { Binary } from './types';
import { nand } from './nand';

export function or(a: Binary, b: Binary): Binary {
  return nand(nand(a, a), nand(b, b));
}
