import { Binary } from './types';

export function zero<T>(len: number = 16): T {
  const result = [];
  for (let i = 0; i < len; i += 1) {
    result.push(0);
  }
  return (result as unknown) as T;
}

export function b<T>(str: string): T {
  return (str
    .replace(/ /g, '')
    .split('')
    .map((n) => Number(n)) as unknown) as T;
}

export function b2s(b: Binary[]): string {
  let result = '';
  for (let i = b.length - 1; 0 <= i; i -= 1) {
    if ((b.length - 1 - i) % 4 === 0 && i !== b.length - 1) {
      result = ' ' + result;
    }
    result = String(b[i]) + result;
  }

  return result;
}
