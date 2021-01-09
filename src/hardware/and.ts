import { Binary } from './types';
import { nand } from './nand';

export function and(a: Binary, b: Binary): Binary {
  return nand(nand(a, b), nand(a, b));
}
