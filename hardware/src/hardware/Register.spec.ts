import assert from 'power-assert';
import { b } from './helpers';
import { Word } from './types';
import { Register } from './Register';

describe('Register', function () {
  it('should return collect Binary', function () {
    const register = new Register();
    register.write(b<Word>('0101 0101 0101 0101'), 0);
    assert.deepEqual(register.read(), b<Word>('0000 0000 0000 0000'));
    register.write(b<Word>('0101 0101 0101 0101'), 0);
    assert.deepEqual(register.read(), b<Word>('0000 0000 0000 0000'));
    register.write(b<Word>('0101 0101 0101 0101'), 1);
    assert.deepEqual(register.read(), b<Word>('0101 0101 0101 0101'));
    register.write(b<Word>('0000 0000 0000 0000'), 0);
    assert.deepEqual(register.read(), b<Word>('0101 0101 0101 0101'));
    register.write(b<Word>('0000 0000 0000 0000'), 1);
    assert.deepEqual(register.read(), b<Word>('0000 0000 0000 0000'));
  });
});
