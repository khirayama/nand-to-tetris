import assert from 'power-assert';
import { b } from './helpers';
import { Clock } from './Clock';
import { Register } from './Register';
import { Word } from './types';

describe('Register', function () {
  it('should return correct Binary', function () {
    const clock = new Clock();
    const register = new Register();

    register.write(clock, b<Word>('0101 0101 0101 0101'), 0);
    assert.deepEqual(register.read(clock), b<Word>('0000 0000 0000 0000'));
    clock.next();
    clock.next();

    register.write(clock, b<Word>('0101 0101 0101 0101'), 1);
    assert.deepEqual(register.read(clock), b<Word>('0000 0000 0000 0000'));
    clock.next();
    clock.next();

    register.write(clock, b<Word>('0000 0000 0000 0000'), 1);
    assert.deepEqual(register.read(clock), b<Word>('0101 0101 0101 0101'));
    clock.next();
    clock.next();

    register.write(clock, b<Word>('0101 0101 0101 0101'), 1);
    assert.deepEqual(register.read(clock), b<Word>('0000 0000 0000 0000'));
  });
});
