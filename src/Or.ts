import { Binary } from './types';
import { Nand } from './Nand';

export function Or(a: Binary, b: Binary): Binary {
  return Nand(Nand(a, a), Nand(b, b));
}
