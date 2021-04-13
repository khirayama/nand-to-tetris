import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { inc16 } from './inc16';

describe('Inc16', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(inc16(b<Word>('0000 0000 0000 0000')), b<Word>('0000 0000 0000 0001'));
    assert.deepEqual(inc16(b<Word>('0000 0000 0000 0001')), b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(inc16(b<Word>('1111 1111 1111 1111')), b<Word>('0000 0000 0000 0000'));
  });
});
