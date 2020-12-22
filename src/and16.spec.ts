import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { and16 } from './and16';

describe('16-bit And', function () {
  it('should return correct Bus16', function () {
    assert.deepEqual(
      and16(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000')),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      and16(b<Word>('0000 0000 0000 0000'), b<Word>('1111 1111 1111 1111')),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      and16(b<Word>('1111 1111 1111 1111'), b<Word>('0000 0000 0000 0000')),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      and16(b<Word>('1111 1111 1111 1111'), b<Word>('1111 1111 1111 1111')),
      b<Word>('1111 1111 1111 1111'),
    );
  });
});
