import { Word, Binary15 } from './types';
import { CPU } from './CPU';

import { zero, b } from './helpers';

import assert = require('assert');

describe('CPU', function () {
  it('should work correcty with 1010 1010 1010 1010', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('1010 1010 1010 1010'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1010 1010 1010 1010'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 1);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 1);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0000'));
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
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 1);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0000'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0000'));
  });

  it('should work correcty with 1000 1000 1000 1000', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('1000 1000 1000 1000'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1000 1000 1000 1000'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.zr, 1);
    assert.deepEqual(cpu.debug.internalPins.ng, 0);
    assert.deepEqual(cpu.debug.internalPins.notzr, 0);
    assert.deepEqual(cpu.debug.internalPins.notng, 1);
    assert.deepEqual(cpu.debug.internalPins.w1, 0);
    assert.deepEqual(cpu.debug.internalPins.w2, 0);
    assert.deepEqual(cpu.debug.internalPins.w3, 0);
    assert.deepEqual(cpu.debug.internalPins.w4, 0);
    assert.deepEqual(cpu.debug.internalPins.w5, 0);
    assert.deepEqual(cpu.debug.internalPins.w6, 0);
    // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 1);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0001'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0000'));

    cpu.write(zero(), b<Word>('1000 1000 1000 1000'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1000 1000 1000 1000'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.zr, 1);
    assert.deepEqual(cpu.debug.internalPins.ng, 0);
    assert.deepEqual(cpu.debug.internalPins.notzr, 0);
    assert.deepEqual(cpu.debug.internalPins.notng, 1);
    assert.deepEqual(cpu.debug.internalPins.w1, 0);
    assert.deepEqual(cpu.debug.internalPins.w2, 0);
    assert.deepEqual(cpu.debug.internalPins.w3, 0);
    assert.deepEqual(cpu.debug.internalPins.w4, 0);
    assert.deepEqual(cpu.debug.internalPins.w5, 0);
    assert.deepEqual(cpu.debug.internalPins.w6, 0);
    // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 1);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0010'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0000'));
  });

  it('should work correcty with 1110 0000 1001 0000', function () {
    const cpu = new CPU();
    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1110 0000 1001 0000'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 1);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.zr, 1);
    assert.deepEqual(cpu.debug.internalPins.ng, 0);
    assert.deepEqual(cpu.debug.internalPins.notzr, 0);
    assert.deepEqual(cpu.debug.internalPins.notng, 1);
    assert.deepEqual(cpu.debug.internalPins.w1, 0);
    assert.deepEqual(cpu.debug.internalPins.w2, 0);
    assert.deepEqual(cpu.debug.internalPins.w3, 0);
    assert.deepEqual(cpu.debug.internalPins.w4, 0);
    assert.deepEqual(cpu.debug.internalPins.w5, 0);
    assert.deepEqual(cpu.debug.internalPins.w6, 0);
    // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0001'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0000'));
  });

  it('should work correcty with 2 + 3', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('0000 0000 0000 0010'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    assert.deepEqual(cpu.debug.internalPins.noti15, 1);
    assert.deepEqual(cpu.debug.internalPins.loadA, 1);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0000'));
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
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0001'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0000'));

    cpu.write(zero(), b<Word>('1110 1100 0001 0000'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1110 1100 0001 0000'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 1);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0010'));
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
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0010'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0010'));

    cpu.write(zero(), b<Word>('0000 0000 0000 0011'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    assert.deepEqual(cpu.debug.internalPins.noti15, 1);
    assert.deepEqual(cpu.debug.internalPins.loadA, 1);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.internalPins.zr, 0);
    assert.deepEqual(cpu.debug.internalPins.ng, 0);
    assert.deepEqual(cpu.debug.internalPins.notzr, 1);
    assert.deepEqual(cpu.debug.internalPins.notng, 1);
    assert.deepEqual(cpu.debug.internalPins.w1, 0);
    assert.deepEqual(cpu.debug.internalPins.w2, 1);
    assert.deepEqual(cpu.debug.internalPins.w3, 1);
    assert.deepEqual(cpu.debug.internalPins.w4, 1);
    assert.deepEqual(cpu.debug.internalPins.w5, 0);
    assert.deepEqual(cpu.debug.internalPins.w6, 1);
    // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0011'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0010'));

    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    // inputPins
    assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1110 0000 1001 0000'));
    assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // internalPins
    assert.deepEqual(cpu.debug.internalPins.loadD, 1);
    assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 1000'));
    assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 1000'));
    assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0101'));
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
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 1000'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0100'));
    // registers
    assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0011'));
    assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0101'));

    cpu.write(zero(), b<Word>('0000 0000 0000 0000'), 0);
    // // inputPins
    // assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // // internalPins
    // assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    // assert.deepEqual(cpu.debug.internalPins.noti15, 1);
    // assert.deepEqual(cpu.debug.internalPins.loadA, 1);
    // assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    // assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.internalPins.zr, 1);
    // assert.deepEqual(cpu.debug.internalPins.ng, 0);
    // assert.deepEqual(cpu.debug.internalPins.notzr, 0);
    // assert.deepEqual(cpu.debug.internalPins.notng, 1);
    // assert.deepEqual(cpu.debug.internalPins.w1, 0);
    // assert.deepEqual(cpu.debug.internalPins.w2, 0);
    // assert.deepEqual(cpu.debug.internalPins.w3, 0);
    // assert.deepEqual(cpu.debug.internalPins.w4, 0);
    // assert.deepEqual(cpu.debug.internalPins.w5, 0);
    // assert.deepEqual(cpu.debug.internalPins.w6, 0);
    // // outputPins
    // assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.outputPins.writeM, 0);
    // assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0101'));
    // // registers
    // assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0101'));

    cpu.write(zero(), b<Word>('1110 0011 0000 1000'), 0);
    // // inputPins
    // assert.deepEqual(cpu.debug.inputPins.inM, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.inputPins.instruction, b<Word>('1110 0011 0000 1000'));
    // assert.deepEqual(cpu.debug.inputPins.reset, 0);
    // // internalPins
    // assert.deepEqual(cpu.debug.internalPins.loadD, 0);
    // assert.deepEqual(cpu.debug.internalPins.noti15, 0);
    // assert.deepEqual(cpu.debug.internalPins.loadA, 0);
    // assert.deepEqual(cpu.debug.internalPins.aluout, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.internalPins.mux0out, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.internalPins.aout, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.internalPins.loadPC, 0);
    // assert.deepEqual(cpu.debug.internalPins.mux1out, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.internalPins.dout, b<Word>('0000 0000 0000 0101'));
    // assert.deepEqual(cpu.debug.internalPins.zr, 0);
    // assert.deepEqual(cpu.debug.internalPins.ng, 0);
    // assert.deepEqual(cpu.debug.internalPins.notzr, 1);
    // assert.deepEqual(cpu.debug.internalPins.notng, 1);
    // assert.deepEqual(cpu.debug.internalPins.w1, 0);
    // assert.deepEqual(cpu.debug.internalPins.w2, 0);
    // assert.deepEqual(cpu.debug.internalPins.w3, 0);
    // assert.deepEqual(cpu.debug.internalPins.w4, 0);
    // assert.deepEqual(cpu.debug.internalPins.w5, 0);
    // assert.deepEqual(cpu.debug.internalPins.w6, 0);
    // // outputPins
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0101'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 1);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0110'));
    // // registers
    // assert.deepEqual(cpu.debug.aregister, b<Word>('0000 0000 0000 0000'));
    // assert.deepEqual(cpu.debug.dregister, b<Word>('0000 0000 0000 0101'));
  });

  it('should work correcty with 3 + 3', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('0000 0000 0000 0011'), 0);
    cpu.write(zero(), b<Word>('1110 1100 0001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0011'), 0);
    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0000'), 0);
    cpu.write(zero(), b<Word>('1110 0011 0000 1000'), 0);
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0000 0110'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 1);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0110'));
  });

  it('should work correcty with 12 + 15', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('0000 0000 0000 1100'), 0);
    cpu.write(zero(), b<Word>('1110 1100 0001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 1111'), 0);
    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0000'), 0);
    cpu.write(zero(), b<Word>('1110 0011 0000 1000'), 0);
    assert.deepEqual(cpu.debug.outputPins.outM, b<Word>('0000 0000 0001 1011'));
    assert.deepEqual(cpu.debug.outputPins.writeM, 1);
    assert.deepEqual(cpu.debug.outputPins.addressM, b<Binary15>('000 0000 0000 0000'));
    assert.deepEqual(cpu.debug.outputPins.pc, b<Binary15>('000 0000 0000 0110'));
  });
});
