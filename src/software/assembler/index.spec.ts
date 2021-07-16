import assert from 'power-assert';
import { assembler } from './';

describe('assembler', function () {
  it('Run correctly with Add asm', function () {
    const addASM = ['@2', 'D=A', '@3', 'D=D+A', '@0', 'M=D'];

    const addHack = [
      '0000000000000010',
      '1110110000010000',
      '0000000000000011',
      '1110000010010000',
      '0000000000000000',
      '1110001100001000',
    ];

    const result = assembler(addASM);
    assert.deepEqual(result, addHack);
  });
});
