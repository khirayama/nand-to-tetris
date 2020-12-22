import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { not16 } from './not16';

describe('16-bit Not', function () {
  it('should return correct Word', function () {
    assert.deepEqual(not16(b<Word>('0000 0000 0000 0000')), b<Word>('1111 1111 1111 1111'));
    assert.deepEqual(not16(b<Word>('1111 1111 1111 1111')), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(not16(b<Word>('1111 0000 1111 0000')), b<Word>('0000 1111 0000 1111'));
  });
});
