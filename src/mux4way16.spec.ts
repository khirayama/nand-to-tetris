import assert from 'power-assert';
import { Word, Binary2, Binary } from './types';
import { b } from './helpers';
import { mux4way16 } from './mux4way16';

describe('mux4way16', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(
      mux4way16(
        b<Word>('1000 0000 0000 0000'),
        b<Word>('0100 0000 0000 0000'),
        b<Word>('0010 0000 0000 0000'),
        b<Word>('0001 0000 0000 0000'),
        b<Binary2>('00'),
      ),
      b<Word>('1000 0000 0000 0000'),
    );
    assert.deepEqual(
      mux4way16(
        b<Word>('1000 0000 0000 0000'),
        b<Word>('0100 0000 0000 0000'),
        b<Word>('0010 0000 0000 0000'),
        b<Word>('0001 0000 0000 0000'),
        b<Binary2>('01'),
      ),
      b<Word>('0100 0000 0000 0000'),
    );
    assert.deepEqual(
      mux4way16(
        b<Word>('1000 0000 0000 0000'),
        b<Word>('0100 0000 0000 0000'),
        b<Word>('0010 0000 0000 0000'),
        b<Word>('0001 0000 0000 0000'),
        b<Binary2>('10'),
      ),
      b<Word>('0010 0000 0000 0000'),
    );
    assert.deepEqual(
      mux4way16(
        b<Word>('1000 0000 0000 0000'),
        b<Word>('0100 0000 0000 0000'),
        b<Word>('0010 0000 0000 0000'),
        b<Word>('0001 0000 0000 0000'),
        b<Binary2>('11'),
      ),
      b<Word>('0001 0000 0000 0000'),
    );
  });
});
