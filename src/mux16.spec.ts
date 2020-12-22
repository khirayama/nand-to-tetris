import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { mux16 } from './mux16';

describe('16-bit Mux', function () {
  it('should return correct Bus16', function () {
    assert.deepEqual(
      mux16(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000'), 0),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      mux16(b<Word>('0000 0000 0000 0000'), b<Word>('1111 1111 1111 1111'), 0),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      mux16(b<Word>('1111 1111 1111 1111'), b<Word>('0000 0000 0000 0000'), 0),
      b<Word>('1111 1111 1111 1111'),
    );
    assert.deepEqual(
      mux16(b<Word>('1111 1111 1111 1111'), b<Word>('1111 1111 1111 1111'), 0),
      b<Word>('1111 1111 1111 1111'),
    );
    assert.deepEqual(
      mux16(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000'), 1),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      mux16(b<Word>('0000 0000 0000 0000'), b<Word>('1111 1111 1111 1111'), 1),
      b<Word>('1111 1111 1111 1111'),
    );
    assert.deepEqual(
      mux16(b<Word>('1111 1111 1111 1111'), b<Word>('0000 0000 0000 0000'), 1),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      mux16(b<Word>('1111 1111 1111 1111'), b<Word>('1111 1111 1111 1111'), 1),
      b<Word>('1111 1111 1111 1111'),
    );
  });
});
