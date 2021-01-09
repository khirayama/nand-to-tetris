import { Binary } from './types';
import { nand } from './nand';

export function not(a: Binary): Binary {
  return nand(a, a);
}
