import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { add16 } from './add16';

describe('Add16', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(
      add16(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 000')),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      add16(b<Word>('0000 0000 0000 0001'), b<Word>('0000 0000 0000 000')),
      b<Word>('0000 0000 0000 0001'),
    );
    assert.deepEqual(
      add16(b<Word>('1000 0000 0000 0000'), b<Word>('0000 0000 0000 000')),
      b<Word>('1000 0000 0000 0000'),
    );
    assert.deepEqual(
      add16(b<Word>('1000 0000 0000 0000'), b<Word>('1000 0000 0000 000')),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      add16(b<Word>('1111 1111 1111 1111'), b<Word>('1111 1111 1111 1111')),
      b<Word>('1111 1111 1111 1110'),
    );
  });
});
