import { Binary, Bus16 } from './types';
import { and } from './and';
import { not } from './not';
import { or } from './or';
import { alu } from './alu';
import { mux16 } from './mux16';
import { PC } from './PC';
import { Register } from './Register';

export class CPU {
  private aregister: Register = new Register();

  private dregister: Register = new Register();

  private pc: PC = new PC();

  write(inM: Bus16, instruction: Bus16, reset: Binary) {
    const loadPC = 0;
    let aluout: Bus16 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const writeM = and(instruction[3], instruction[15]);
    const loadD = and(instruction[4], instruction[15]);
    const noti15 = not(instruction[15]);
    const loadA = or(instruction[5], noti15);

    const mux0out = mux16(instruction, aluout, instruction[15]);
    const aout = this.aregister.write(mux0out, loadA);
    const addressM = aout.concat().slice(0, 15);
    const tmp = this.pc.write(aout, loadPC, 1, reset);
    const pc = tmp.concat().slice(0, 15);
    const mux1out = mux16(aout, inM, instruction[12]);
    const dout = this.dregister.write(mux0out, loadD);

    const result = alu(
      dout,
      mux1out,
      instruction[11],
      instruction[10],
      instruction[9],
      instruction[8],
      instruction[7],
      instruction[6],
    );
    aluout = result[0];
    const outM = result[0];
    const zr = result[1];
    const ng = result[2];
  }
}
