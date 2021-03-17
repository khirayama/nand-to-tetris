import { Binary, Binary15, Word } from './types';
import { and } from './and';
import { not } from './not';
import { or } from './or';
import { alu } from './alu';
import { mux16 } from './mux16';
import { PC } from './PC';
import { Register } from './Register';

export class CPU {
  public debug: any;

  private aregister: Register = new Register();

  private dregister: Register = new Register();

  private pc: PC = new PC();

  public write(inM: Word, instruction: Word, reset: Binary): [Word, Binary, Binary15, Binary15] {
    // 1000 1000 1000 1000
    const writeM = and(instruction[12], instruction[0]);

    const noti15 = not(instruction[0]);
    const loadA = or(instruction[10], noti15);

    let mux0out = mux16(instruction, this.dregister.read(), instruction[0]);
    this.aregister.write(mux0out, loadA);
    const aout = this.aregister.read();
    const mux1out = mux16(aout, inM, instruction[3]);

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
    const dout = this.dregister.read();

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

    this.debug = {
      inputPins: {
        inM,
        instruction,
        reset,
      },
      internalPins: {
        loadD,
        noti15,
        loadA,
        aluout,
        mux0out,
        aout,
        loadPC,
        mux1out,
        dout,
        zr,
        ng,
        notzr,
        notng,
        w1,
        w2,
        w3,
        w4,
        w5,
        w6,
      },
      outputPins: {
        outM,
        writeM,
        addressM,
        pc,
      },
      aregister: this.aregister.read(),
      dregister: this.dregister.read(),
    };
    return [outM, writeM, addressM, pc];
  }

  public read(): [Word, Word] {
    return [this.aregister.read(), this.dregister.read()];
  }

  public display(): void {
    console.log(`*** Input pins ***
inM[16]        : ${this.debug.inputPins.inM.join('')}
instruction[16]: ${this.debug.inputPins.instruction.join('')}
reset          : ${this.debug.inputPins.reset}`);
    console.log(`*** Internal pins ***
loadD      : ${this.debug.internalPins.loadD}
noti15     : ${this.debug.internalPins.noti15}
loadA      : ${this.debug.internalPins.loadA}
aluout[16] : ${this.debug.internalPins.aluout.join('')}
mux0out[16]: ${this.debug.internalPins.mux0out.join('')}
aout[16]   : ${this.debug.internalPins.aout.join('')}
loadPC     : ${this.debug.internalPins.loadPC}
mux1out[16]: ${this.debug.internalPins.mux1out.join('')}
dout[16]   : ${this.debug.internalPins.dout.join('')}
zr         : ${this.debug.internalPins.zr}
ng         : ${this.debug.internalPins.ng}
notzr      : ${this.debug.internalPins.notzr}
notng      : ${this.debug.internalPins.notng}
w1         : ${this.debug.internalPins.w1}
w2         : ${this.debug.internalPins.w2}
w3         : ${this.debug.internalPins.w3}
w4         : ${this.debug.internalPins.w4}
w5         : ${this.debug.internalPins.w5}
w6         : ${this.debug.internalPins.w6}`);
    console.log(`*** Output pins ***
outM[16]    : ${this.debug.outputPins.outM.join('')}
writeM      : ${this.debug.outputPins.writeM}
addressM[15]: ${this.debug.outputPins.addressM.join('')}
pc[15]      : ${this.debug.outputPins.pc.join('')}`);
  }
}
