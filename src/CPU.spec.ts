import { Bus16 } from './types';
import { CPU } from './CPU';

import assert = require('assert');

function zero(): Bus16 {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as Bus16;
}

function b(str: string): Bus16 {
  return str
    .replace(/ /g, '')
    .split('')
    .map((n) => Number(n)) as Bus16;
}

describe('CPU', function () {
  it('should work correcty', function () {
    const cpu = new CPU();

    cpu.write(zero(), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    assert.deepEqual(cpu.debug.internalPins.noti15, 1);
    assert.deepEqual(cpu.debug.internalPins.loadA, 1);
    assert.deepEqual(cpu.debug.internalPins.aluout, b('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.aout, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.dout, b('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.zr, 1);
    assert.deepEqual(cpu.debug.internalPins.ng, 0);
    assert.deepEqual(cpu.debug.internalPins.notzr, 0);
    assert.deepEqual(cpu.debug.internalPins.notng, 1);
    assert.deepEqual(cpu.debug.internalPins.w1, 0);
    assert.deepEqual(cpu.debug.internalPins.w2, 0);
    assert.deepEqual(cpu.debug.internalPins.w3, 0);
    assert.deepEqual(cpu.debug.internalPins.w4, 0);
    assert.deepEqual(cpu.debug.internalPins.w5, 1);
    assert.deepEqual(cpu.debug.internalPins.w6, 1);
    // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b('000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.pc, b('000 0000 0000 0001'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.dregister, b('0000 0000 0000 0000'));

    cpu.write(zero(), [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b('1110 1100 0001 0000'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 1);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    assert.deepEqual(cpu.debug.internalPins.aluout, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.aout, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.dout, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.zr, 0);
    assert.deepEqual(cpu.debug.internalPins.ng, 0);
    assert.deepEqual(cpu.debug.internalPins.notzr, 1);
    assert.deepEqual(cpu.debug.internalPins.notng, 1);
    assert.deepEqual(cpu.debug.internalPins.w1, 0);
    assert.deepEqual(cpu.debug.internalPins.w2, 0);
    assert.deepEqual(cpu.debug.internalPins.w3, 0);
    assert.deepEqual(cpu.debug.internalPins.w4, 0);
    assert.deepEqual(cpu.debug.internalPins.w5, 0);
    assert.deepEqual(cpu.debug.internalPins.w6, 0);
    // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b('000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.pc, b('000 0000 0000 0010'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.dregister, b('0000 0000 0000 0010'));

    // res = cpu.write(zero(), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], 0);
    // assert.deepEqual(res, [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    //   0,
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    // ]);
    // assert.deepEqual(cpu.read(), [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    // ]);
    //
    // res = cpu.write(zero(), [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], 0);
    // assert.deepEqual(res, [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    //   0,
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    // ]);
    // assert.deepEqual(cpu.read(), [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    // ]);
    // cpu.write(zero(), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0);
    // assert.deepEqual(cpu.read(), [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    // ]);
    // cpu.write(zero(), [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0], 0);
    // assert.deepEqual(cpu.read(), [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    // ]);
    // console.log(JSON.stringify(res));
  });
});
