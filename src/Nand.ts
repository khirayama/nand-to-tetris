import { Binary } from './types';

export function Nand(a: Binary, b: Binary): Binary {
  return a === 1 && b === 1 ? 0 : 1;
}
