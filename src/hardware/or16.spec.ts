import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { or16 } from './or16';

describe('16-bit Or', function () {
  it('should return correct Binary16', function () {
    assert.deepEqual(
      or16(b<Word>('0000 0000 0000 0000'), b<Word>('0000 0000 0000 0000')),
      b<Word>('0000 0000 0000 0000'),
    );
    assert.deepEqual(
      or16(b<Word>('0000 0000 0000 0000'), b<Word>('1111 1111 1111 1111')),
      b<Word>('1111 1111 1111 1111'),
    );
    assert.deepEqual(
      or16(b<Word>('1111 1111 1111 1111'), b<Word>('0000 0000 0000 0000')),
      b<Word>('1111 1111 1111 1111'),
    );
    assert.deepEqual(
      or16(b<Word>('1111 1111 1111 1111'), b<Word>('1111 1111 1111 1111')),
      b<Word>('1111 1111 1111 1111'),
    );
  });
});
