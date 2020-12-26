import { Binary, Binary2, Binary3, Binary6, Word } from './types';
import { zero } from './helpers';
import { Clock } from './Clock';
import { Register } from './Register.clock';
import { PC } from './PC.clock';

export class CPU {
  private aRegister: Register = new Register();

  private dRegister: Register = new Register();

  private outM: Word = zero();

  private writeDst: Word = zero();

  private pc: PC = new PC();

  public write(clock: Clock, inM: Word, instruction: Word, reset: Binary) {}

  private decode(instruction: Word): [Binary, Binary2, Binary, Binary6, Binary3, Binary3] {
    return [
      instruction[0],
      [instruction[1], instruction[2]],
      instruction[3],
      [instruction[4], instruction[5], instruction[6], instruction[7], instruction[8], instruction[9]],
      [instruction[10], instruction[11], instruction[12]],
      [instruction[13], instruction[14], instruction[15]],
    ];
  }
}
