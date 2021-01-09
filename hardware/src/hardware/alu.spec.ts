import assert from 'power-assert';
import { Binary, Binary8, Word } from './types';
import { b } from './helpers';
import { alu } from './alu';

/*
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 */
describe('ALU', function () {
  it('should return correct [Bus16, Binary, Binary]', function () {
    // zx = 0, nx = 0, zy = 0, ny = 0, f = 0, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000'), 0, 0, 0, 0, 0, 0), [
      b<Word>('0000 0000 0000 0000'),
      1,
      0,
    ]);
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0010'), b<Word>('0000 0000 0000 0011'), 0, 0, 0, 0, 0, 0), [
      b<Word>('0000 0000 0000 0010'),
      0,
      0,
    ]);
    // zx = 0, nx = 0, zy = 0, ny = 0, f = 1, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000'), 0, 0, 0, 0, 1, 0), [
      b<Word>('0000 0000 0000 0000'),
      1,
      0,
    ]);
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0010'), b<Word>('0000 0000 0000 0011'), 0, 0, 0, 0, 1, 0), [
      b<Word>('0000 0000 0000 0101'),
      0,
      0,
    ]);
    assert.deepEqual(alu(b<Word>('1111 1111 1111 1111'), b<Word>('1111 1111 1111 1111'), 0, 0, 0, 0, 1, 0), [
      b<Word>('1111 1111 1111 1110'),
      0,
      1,
    ]);
    // zx = 1, nx = 0, zy = 0, ny = 0, f = 0, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 1, 0, 0, 0, 0, 0), [
      b<Word>('0000 0000 0000 0000'),
      1,
      0,
    ]);
    // zx = 1, nx = 0, zy = 0, ny = 0, f = 1, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 1, 0, 0, 0, 1, 0), [
      b<Word>('0000 0000 0000 0011'),
      0,
      0,
    ]);
    // zx = 0, nx = 1, zy = 0, ny = 0, f = 0, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 0, 1, 0, 0, 0, 0), [
      b<Word>('0000 0000 0000 0010'),
      0,
      0,
    ]);
    // zx = 0, nx = 1, zy = 0, ny = 0, f = 1, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 0, 1, 0, 0, 1, 0), [
      b<Word>('0000 0000 0000 0001'),
      0,
      0,
    ]);
    // zx = 0, nx = 0, zy = 1, ny = 0, f = 0, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 0, 0, 1, 0, 0, 0), [
      b<Word>('0000 0000 0000 0000'),
      1,
      0,
    ]);
    // zx = 0, nx = 0, zy = 1, ny = 0, f = 1, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 0, 0, 1, 0, 1, 0), [
      b<Word>('0000 0000 0000 0001'),
      0,
      0,
    ]);
    // zx = 0, nx = 0, zy = 0, ny = 1, f = 0, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 0, 0, 0, 1, 0, 0), [
      b<Word>('0000 0000 0000 0000'),
      1,
      0,
    ]);
    // zx = 0, nx = 0, zy = 0, ny = 1, f = 1, no = 0
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 0011'), 0, 0, 0, 1, 1, 0), [
      b<Word>('1111 1111 1111 1101'),
      0,
      1,
    ]);
    // zx = 0, nx = 0, zy = 0, ny = 0, f = 0, no = 1
    assert.deepEqual(alu(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000'), 0, 0, 0, 0, 0, 1), [
      b<Word>('1111 1111 1111 1111'),
      0,
      1,
    ]);
  });
});
