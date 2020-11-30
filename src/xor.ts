import { Binary } from './types';
import { nand } from './nand';

export function xor(a: Binary, b: Binary): Binary {
  const nand1 = nand(a, b);
  const nand2 = nand(a, nand1);
  const nand3 = nand(b, nand1);
  const nand4 = nand(nand2, nand3);
  return nand(nand4, nand4);
}
