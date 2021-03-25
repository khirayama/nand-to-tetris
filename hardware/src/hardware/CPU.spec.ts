import { Word, Binary15 } from './types';
import { CPU } from './CPU';

import { zero, b } from './helpers';

import assert = require('assert');
import { Memory } from './Memory';

describe('CPU', function () {
  it('should work correcty with 1010 1010 1010 1010', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('1010 1010 1010 1010'), 0);
  });

  it('should work correcty with 1000 1000 1000 1000', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('1000 1000 1000 1000'), 0);
    cpu.write(zero(), b<Word>('1000 1000 1000 1000'), 0);
  });

  it('should work correcty with 1110 0000 1001 0000', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
  });

  it('should work correcty with 2 + 3', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('0000 0000 0000 0010'), 0);
    cpu.write(zero(), b<Word>('1110 1100 0001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0011'), 0);
    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0000'), 0);
    cpu.write(zero(), b<Word>('1110 0011 0000 1000'), 0);
  });

  it('should work correcty with 3 + 3', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('0000 0000 0000 0011'), 0);
    cpu.write(zero(), b<Word>('1110 1100 0001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0011'), 0);
    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0000'), 0);
    cpu.write(zero(), b<Word>('1110 0011 0000 1000'), 0);
  });

  it('should work correcty with 12 + 15', function () {
    const cpu = new CPU();

    cpu.write(zero(), b<Word>('0000 0000 0000 1100'), 0);
    cpu.write(zero(), b<Word>('1110 1100 0001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 1111'), 0);
    cpu.write(zero(), b<Word>('1110 0000 1001 0000'), 0);
    cpu.write(zero(), b<Word>('0000 0000 0000 0000'), 0);
    cpu.write(zero(), b<Word>('1110 0011 0000 1000'), 0);
  });
});
