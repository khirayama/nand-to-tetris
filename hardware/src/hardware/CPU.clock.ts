import { Binary, Binary3, Binary6, Binary15, Word } from './types';
import { b, zero } from './helpers';
import { Clock } from './Clock';
import { Register } from './Register.clock';
import { PC } from './PC.clock';
import { alu } from './alu';
import { mux16 } from './mux16';
import { not } from './not';
import { or } from './or';
import { and } from './and';

export class CPU {
  public aRegister: Register = new Register();

  public dRegister: Register = new Register();

  private outM: Word = zero();

  private writeDst: Word = zero();

  private pc: PC = new PC();

  public write(clock: Clock, inM: Word, instruction: Word, reset: Binary) {
    const [i, /* xx, */ a, cccccc, ddd, jjj] = this.decode(instruction);
    console.log('instruction', instruction.join(''));
    console.log('decoded instruction', '' + i, '' + a, cccccc.join(''), ddd.join(''), jjj.join(''));

    const tmpClock = clock.get() === 0 ? new Clock().next() : new Clock();
    console.log('tmpClock', '' + tmpClock.get());
    const [aluout, zr, ng] = alu(
      this.dRegister.read(tmpClock),
      mux16(this.aRegister.read(tmpClock), inM, a),
      cccccc[0],
      cccccc[1],
      cccccc[2],
      cccccc[3],
      cccccc[4],
      cccccc[5],
    );
    console.log('aluout', aluout.join(''));
    console.log('zr', '' + zr);
    console.log('ng', '' + ng);
    const ps = not(or(zr, ng));
    if (clock.get() === 0) {
      this.outM = mux16(this.outM, aluout, i);
    }
    this.dRegister.write(clock, aluout, and(ddd[1], i));

    const jumpFlag = or(or(and(jjj[0], ng), and(jjj[1], zr)), and(jjj[2], ps));
    this.pc.write(clock, this.aRegister.read(tmpClock), 1, and(jumpFlag, i), reset);

    console.log(instruction.join(''), aluout.join(''), i);
    this.aRegister.write(clock, mux16(instruction, aluout, i), or(not(i), ddd[0]));

    const writeM = and(ddd[2], i);
    const writeDest0 = this.aRegister.read(clock);
    const writeDest1 = writeDest0.concat() as Word;
    writeDest1[0] = writeM;
    // NOTE 条件分岐いるかも?
    console.log(writeDest0.join(''), writeDest1.join(''), i);
    this.writeDst = mux16(writeDest0, writeDest1, i);
    // NOTE ここ間違ってるかも
    const newClock = new Clock();
    newClock.next();
  }

  public read(clock: Clock) {
    const writeDest = this.writeDst;
    const writeM = writeDest[0];
    const addressM = writeDest.slice(1) as Binary15;
    const pc = this.pc.read(clock);
    const count = pc.slice(1) as Binary15;

    return [this.outM, writeM, addressM, count];
  }

  private decode(instruction: Word): [Binary, /* Binary2, */ Binary, Binary6, Binary3, Binary3] {
    return [
      instruction[0],
      // [instruction[1], instruction[2]],
      instruction[3],
      [instruction[4], instruction[5], instruction[6], instruction[7], instruction[8], instruction[9]],
      [instruction[10], instruction[11], instruction[12]],
      [instruction[13], instruction[14], instruction[15]],
    ];
  }
}
