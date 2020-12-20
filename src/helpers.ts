import { Bus16 } from './types';

// TODO Generics で return valueをかえるように
export function zero(): Bus16 {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as Bus16;
}

// TODO Generics で return valueをかえるように
export function b(str: string): Bus16 {
  return str
    .replace(/ /g, '')
    .split('')
    .map((n) => Number(n)) as Bus16;
}
