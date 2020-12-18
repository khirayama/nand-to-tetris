import { Binary, Binary15, Bus16 } from './types';
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

  public write(inM: Bus16, instruction: Bus16, reset: Binary): [Bus16, Binary, Binary15, Binary15] {
    let aluout: Bus16 = this.dregister.read();
    console.log('aluout0', aluout.join(''));

    const noti15 = not(instruction[0]);
    const loadA = or(instruction[10], noti15);
    const loadD = and(instruction[11], instruction[0]);
    const writeM = and(instruction[12], instruction[0]);

    const mux0out = mux16(instruction, aluout, instruction[0]);
    console.log('mux0out', mux0out.join(''));
    const dout = this.dregister.write(mux0out, loadD);
    const aout = this.aregister.write(mux0out, loadA);
    const addressM: Binary15 = aout.concat().slice(1, 16) as Binary15;

    const mux1out = mux16(aout, inM, instruction[3]);
    // const tmp = and(instruction[0], instruction[3]);
    // const mux1out = mux16(aout, inM, tmp);

    const result = alu(
      dout,
      mux1out,
      instruction[4],
      instruction[5],
      instruction[6],
      instruction[7],
      instruction[8],
      instruction[9],
    );
    aluout = result[0];
    const outM = result[0];
    const zr = result[1];
    const ng = result[2];

    console.log('aluout1', aluout.join(''));
    // this.dregister.write(aluout, 1);
    console.log('aluout2', this.dregister.read().join(''));

    const notzr = not(zr);
    const notng = not(ng);
    const w1 = and(instruction[13], ng);
    const w2 = and(instruction[15], notng);
    const w3 = or(w1, w2);
    const w4 = and(notzr, w3);
    const w5 = and(instruction[14], zr);
    const w6 = or(w4, w5);
    const loadPC = and(instruction[0], w6);
    const tmp = this.pc.write(aout, 1, loadPC, reset);
    const pc: Binary15 = tmp.concat().slice(1, 16) as Binary15;
    // const ngorzr = or(ng, zr);
    // const ps = not(ngorzr);
    // const jmpne = and(instruction[13], ng);
    // const jmpzr = and(instruction[14], zr);
    // const jmpps = and(instruction[15], ps);
    // const jmp1 = or(jmpne, jmpps);
    // const jmp2 = or(jmp1, jmpzr);
    // const jmp = and(jmp2, instruction[0]);
    // const inc = not(jmp);
    //
    // const pctmp = this.pc.write(aout, jmp, inc, reset);
    // const pc = pctmp.concat().slice(0, 15) as Binary15;

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
    // this.display();
    return [outM, writeM, addressM, pc];
  }

  public read(): [Bus16, Bus16] {
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
