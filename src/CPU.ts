import { Binary, Bus16 } from './types';
import { and } from './and';
import { not } from './not';
import { or } from './or';

export class CPU {
  write(inM: Bus16, instruction: Bus16, reset: Binary) {
    const writeM = and(instruction[3], instruction[15]);
    const loadD = and(instruction[4], instruction[15]);
    const noti15 = not(instruction[15]);
    const loadA = or(instruction[5], noti15);
  }
}
