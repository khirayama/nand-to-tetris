import { Binary, Binary15, Word } from './types';
import { and } from './and';
import { not } from './not';
import { or } from './or';
import { alu } from './alu';
import { mux16 } from './mux16';
import { PC } from './PC';
import { Register } from './Register';
import { zero } from './helpers';

export class CPU {
  private aregister: Register = new Register();

  private dregister: Register = new Register();

  private pc: PC = new PC();

  public write(inM: Word, instruction: Word, reset: Binary): [Word, Binary, Binary15, Binary15] {
    const writeM = and(instruction[12], instruction[0]);

    const noti15 = not(instruction[0]);
    const loadA = or(instruction[10], noti15);

    let mux0out = mux16(instruction, this.dregister.read(), instruction[0]);
    this.aregister.write(mux0out, loadA);
    const aout = this.aregister.read();
    const mux1out = mux16(aout, inM, instruction[3]);
    this.aregister.write(mux1out, loadA);

    const result = alu(
      this.dregister.read(),
      mux1out,
      instruction[4],
      instruction[5],
      instruction[6],
      instruction[7],
      instruction[8],
      instruction[9],
    );
    const aluout = result[0];

    const outM = aluout;
    const zr = result[1];
    const ng = result[2];

    const loadD = and(instruction[11], instruction[0]);
    this.dregister.write(aluout, loadD);

    mux0out = mux16(instruction, aluout, instruction[0]);

    const notzr = not(zr);
    const notng = not(ng);
    const w1 = and(instruction[13], ng);
    const w2 = and(instruction[15], notng);
    const w3 = or(w1, w2);
    const w4 = and(notzr, w3);
    const w5 = and(instruction[14], zr);
    const w6 = or(w4, w5);
    const loadPC = and(instruction[0], w6);
    this.pc.write(aout, 1, loadPC, reset);
    const pc: Binary15 = this.pc.read().concat().slice(1, 16) as Binary15;

    const addressM = aout.concat().slice(1, 16) as Binary15;

    return [outM, writeM, addressM, pc];
  }

  public read(): [Word, Word] {
    return [this.aregister.read(), this.dregister.read()];
  }

  public reset(): void {
    this.pc.write(zero(), 1, 1, 1);
    this.aregister.write(zero(), 1);
    this.dregister.write(zero(), 1);
  }

  public status() {
    return {
      aregister: this.aregister.read(),
      dregister: this.dregister.read(),
      pc: this.pc.read(),
    };
  }
}
