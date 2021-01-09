import assert from 'power-assert';
import { b } from './helpers';
import { Word } from './types';
import { Register } from './Register';

describe('Register', function () {
  it('should return collect Binary', function () {
    const register = new Register();
    assert.deepEqual(register.write(b<Word>('0101 0101 0101 0101'), 0), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(register.write(b<Word>('0101 0101 0101 0101'), 1), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(register.write(b<Word>('0000 0000 0000 0000'), 0), b<Word>('0101 0101 0101 0101'));
    assert.deepEqual(register.write(b<Word>('0000 0000 0000 0000'), 1), b<Word>('0101 0101 0101 0101'));
    assert.deepEqual(register.write(b<Word>('0000 0000 0000 0000'), 1), b<Word>('0000 0000 0000 0000'));
  });
});
