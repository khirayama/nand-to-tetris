import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { Clock } from './Clock';
import { DFF } from './DFF.clock';
import { Bit } from './Bit.clock';
import { Register } from './Register.clock';

describe('Clock', function () {
  it('work correctly', function () {
    const clock = new Clock();

    assert.equal(clock.get(), 0);
    clock.next();
    assert.equal(clock.get(), 1);
    clock.next();
    assert.equal(clock.get(), 0);
  });
});

describe('DFF', function () {
  it('work correctly', function () {
    const clock = new Clock();
    const dff = new DFF();

    dff.write(clock, 1);
    assert.equal(dff.read(clock), 0);
    clock.next();

    dff.write(clock, 0);
    assert.equal(dff.read(clock), 1);
    clock.next();

    dff.write(clock, 0);
    assert.equal(dff.read(clock), 1);
    clock.next();

    dff.write(clock, 1);
    assert.equal(dff.read(clock), 0);
  });
});

describe('Bit', function () {
  it('work correctly', function () {
    const clock = new Clock();
    const bit = new Bit();

    bit.write(clock, 1, 1);
    assert.equal(bit.read(clock), 0);

    clock.next();

    bit.write(clock, 0, 0);
    assert.equal(bit.read(clock), 1);

    clock.next();

    bit.write(clock, 0, 0);
    assert.equal(bit.read(clock), 1);

    clock.next();

    bit.write(clock, 0, 1);
    assert.equal(bit.read(clock), 1);

    clock.next();

    bit.write(clock, 0, 1);
    assert.equal(bit.read(clock), 1);

    clock.next();

    bit.write(clock, 1, 0);
    assert.equal(bit.read(clock), 0);
  });
});

describe('Register', function () {
  it('work correctly', function () {
    const clock = new Clock();
    const register = new Register();

    register.write(clock, b<Word>('1111 1111 1111 1111'), 1);
    assert.deepEqual(register.read(clock), b<Word>('0000 0000 0000 0000'));

    clock.next();

    register.write(clock, b<Word>('0000 0000 0000 0000'), 0);
    assert.deepEqual(register.read(clock), b<Word>('1111 1111 1111 1111'));

    clock.next();

    register.write(clock, b<Word>('0000 0000 0000 0000'), 0);
    assert.deepEqual(register.read(clock), b<Word>('1111 1111 1111 1111'));

    clock.next();

    register.write(clock, b<Word>('0000 0000 0000 0000'), 1);
    assert.deepEqual(register.read(clock), b<Word>('1111 1111 1111 1111'));

    clock.next();

    register.write(clock, b<Word>('0000 0000 0000 0000'), 1);
    assert.deepEqual(register.read(clock), b<Word>('1111 1111 1111 1111'));

    clock.next();

    register.write(clock, b<Word>('1111 1111 1111 1111'), 0);
    assert.deepEqual(register.read(clock), b<Word>('0000 0000 0000 0000'));
  });
});
