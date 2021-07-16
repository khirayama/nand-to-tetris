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

    const result = assembler(addASM.join('\n'));
    assert.deepEqual(result, addHack);
  });

  it('Run correctly with Max asm', function () {
    const maxASM = `
@R0
D=M
@R1
D=D-M
@OUTPUT_FIRST
D;JGT
@R1
D=M
@OUTPUT_D
0;JMP
(OUTPUT_FIRST)
@R0             
D=M
(OUTPUT_D)
@R2
M=D
(INFINITE_LOOP)
@INFINITE_LOOP
0;JMP
`;

    const maxHack = [
      '0000000000000000',
      '1111110000010000',
      '0000000000000001',
      '1111010011010000',
      '0000000000001010',
      '1110001100000001',
      '0000000000000001',
      '1111110000010000',
      '0000000000001100',
      '1110101010000111',
      '0000000000000000',
      '1111110000010000',
      '0000000000000010',
      '1110001100001000',
      '0000000000001110',
      '1110101010000111',
    ];

    const result = assembler(maxASM);
    assert.deepEqual(result, maxHack);
  });

  it('Run correctly with Rect asm', function () {
    const rectASM = `@0
D=M
@INFINITE_LOOP
D;JLE 
@counter
M=D
@SCREEN
D=A
@address
M=D
(LOOP)
@address
A=M
M=-1
@address
D=M
@32
D=D+A
@address
M=D
@counter
MD=M-1
@LOOP
D;JGT
(INFINITE_LOOP)
@INFINITE_LOOP
0;JMP
`;

    const rectHack = [
      '0000000000000000',
      '1111110000010000',
      '0000000000010111',
      '1110001100000110',
      '0000000000010000',
      '1110001100001000',
      '0100000000000000',
      '1110110000010000',
      '0000000000010001',
      '1110001100001000',
      '0000000000010001',
      '1111110000100000',
      '1110111010001000',
      '0000000000010001',
      '1111110000010000',
      '0000000000100000',
      '1110000010010000',
      '0000000000010001',
      '1110001100001000',
      '0000000000010000',
      '1111110010011000',
      '0000000000001010',
      '1110001100000001',
      '0000000000010111',
      '1110101010000111',
    ];

    const result = assembler(rectASM);
    assert.deepEqual(result, rectHack);
  });
});
