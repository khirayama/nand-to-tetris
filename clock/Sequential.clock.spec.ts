import assert from 'power-assert';
import { Word } from './types';
import { b } from './helpers';
import { Clock } from './Clock';
import { DFF } from './DFF.clock';
import { Bit } from './Bit.clock';
import { Register } from './Register.clock';
import { RAM8 } from './RAM8.clock';
import { RAM64 } from './RAM64.clock';
import { PC } from './PC.clock';
import { inc16 } from './inc16';

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

describe('RAM8', function () {
  it('work correctly', function () {
    const clock = new Clock();
    const ram8 = new RAM8();

    const wordi = b<Word>('1010 1100 0101 0011');
    const wordo = b<Word>('0101 0011 1010 1100');
    const word0 = b<Word>('0000 0000 0000 0000');

    ram8.write(clock, wordi, 1, [0, 0, 0]);
    assert.deepEqual(ram8.read(clock, [0, 0, 0]), word0);

    clock.next();

    // Nothing happened
    ram8.write(clock, word0, 0, [0, 0, 0]);
    assert.deepEqual(ram8.read(clock, [0, 0, 0]), wordi);

    clock.next();

    ram8.write(clock, wordo, 0, [0, 0, 0]);
    assert.deepEqual(ram8.read(clock, [0, 0, 0]), wordi);

    clock.next();

    // Nothing happened
    ram8.write(clock, wordo, 1, [0, 0, 0]);
    assert.deepEqual(ram8.read(clock, [0, 0, 0]), wordi);

    clock.next();

    ram8.write(clock, wordo, 1, [0, 0, 0]);
    assert.deepEqual(ram8.read(clock, [0, 0, 0]), wordi);

    clock.next();

    // Nothing happened
    ram8.write(clock, wordo, 1, [0, 0, 0]);
    assert.deepEqual(ram8.read(clock, [0, 0, 0]), wordo);

    clock.next();

    ram8.write(clock, wordo, 1, [0, 0, 1]);
    assert.deepEqual(ram8.read(clock, [0, 0, 1]), word0);

    clock.next();

    ram8.write(clock, wordi, 0, [0, 0, 1]);
    assert.deepEqual(ram8.read(clock, [0, 0, 1]), wordo);

    clock.next();

    ram8.write(clock, wordi, 0, [0, 0, 1]);
    assert.deepEqual(ram8.read(clock, [0, 0, 1]), wordo);

    clock.next();

    ram8.write(clock, wordi, 1, [0, 0, 1]);
    assert.deepEqual(ram8.read(clock, [0, 0, 1]), wordo);

    clock.next();

    ram8.write(clock, wordi, 1, [0, 0, 1]);
    assert.deepEqual(ram8.read(clock, [0, 0, 1]), wordo);

    clock.next();

    ram8.write(clock, wordi, 1, [0, 0, 1]);
    assert.deepEqual(ram8.read(clock, [0, 0, 1]), wordi);

    clock.next();
  });
});

describe('RAM64', function () {
  it('work correctly', function () {
    const clock = new Clock();
    const ram64 = new RAM64();

    const wordi = b<Word>('1010 1100 0101 0011');
    const wordo = b<Word>('0101 0011 1010 1100');
    const word0 = b<Word>('0000 0000 0000 0000');

    ram64.write(clock, wordi, 1, [0, 0, 0, 0, 0, 0]);
    assert.deepEqual(ram64.read(clock, [0, 0, 0, 0, 0, 0]), word0);

    clock.next();

    // Nothing happened
    ram64.write(clock, wordo, 0, [0, 0, 0, 0, 0, 0]);
    assert.deepEqual(ram64.read(clock, [0, 0, 0, 0, 0, 0]), wordi);

    clock.next();

    ram64.write(clock, wordo, 0, [0, 0, 0, 0, 0, 0]);
    assert.deepEqual(ram64.read(clock, [0, 0, 0, 0, 0, 0]), wordi);

    clock.next();

    // Nothing happened
    ram64.write(clock, wordo, 1, [0, 0, 0, 0, 0, 0]);
    assert.deepEqual(ram64.read(clock, [0, 0, 0, 0, 0, 0]), wordi);

    clock.next();

    ram64.write(clock, wordo, 1, [0, 0, 0, 0, 0, 0]);
    assert.deepEqual(ram64.read(clock, [0, 0, 0, 0, 0, 0]), wordi);

    clock.next();

    // Nothing happened
    ram64.write(clock, wordo, 1, [0, 0, 0, 0, 0, 0]);
    assert.deepEqual(ram64.read(clock, [0, 0, 0, 0, 0, 0]), wordo);

    clock.next();

    ram64.write(clock, wordo, 1, [0, 0, 1, 0, 0, 1]);
    assert.deepEqual(ram64.read(clock, [0, 0, 1, 0, 0, 1]), word0);

    clock.next();

    ram64.write(clock, wordi, 0, [0, 0, 1, 0, 0, 1]);
    assert.deepEqual(ram64.read(clock, [0, 0, 1, 0, 0, 1]), wordo);

    clock.next();

    ram64.write(clock, wordi, 0, [0, 0, 1, 0, 0, 1]);
    assert.deepEqual(ram64.read(clock, [0, 0, 1, 0, 0, 1]), wordo);

    clock.next();

    ram64.write(clock, wordi, 1, [0, 0, 1, 0, 0, 1]);
    assert.deepEqual(ram64.read(clock, [0, 0, 1, 0, 0, 1]), wordo);

    clock.next();

    ram64.write(clock, wordi, 1, [0, 0, 1, 0, 0, 1]);
    assert.deepEqual(ram64.read(clock, [0, 0, 1, 0, 0, 1]), wordo);

    clock.next();

    ram64.write(clock, wordi, 1, [0, 0, 1, 0, 0, 1]);
    assert.deepEqual(ram64.read(clock, [0, 0, 1, 0, 0, 1]), wordi);

    clock.next();
  });
});

describe('RAM512', function () {
  it.skip('work correctly', function () {});
});

describe('RAM4K', function () {
  it.skip('work correctly', function () {});
});

describe('RAM16K', function () {
  it.skip('work correctly', function () {});
});

describe('PC', function () {
  it('work correctly', function () {
    const clock = new Clock();
    const pc = new PC();

    const word0 = b<Word>('0000 0000 0000 0000');
    const word1 = b<Word>('0000 0000 0000 0001');
    const input = b<Word>('0010 0100 1001 0010');

    pc.write(clock, word0, 1, 0, 0);
    assert.deepEqual(pc.read(clock), word0);

    clock.next();

    pc.write(clock, word0, 1, 0, 0);
    assert.deepEqual(pc.read(clock), word1);

    clock.next();

    pc.write(clock, word0, 1, 0, 0);
    assert.deepEqual(pc.read(clock), inc16(word0));

    clock.next();

    pc.write(clock, word0, 1, 0, 0);
    assert.deepEqual(pc.read(clock), inc16(inc16(word0)));

    clock.next();

    pc.write(clock, word0, 0, 0, 1);
    assert.deepEqual(pc.read(clock), inc16(inc16(word0)));

    clock.next();

    pc.write(clock, input, 0, 1, 0);
    assert.deepEqual(pc.read(clock), word0);

    clock.next();

    pc.write(clock, input, 0, 1, 0);
    assert.deepEqual(pc.read(clock), word0);

    clock.next();

    pc.write(clock, word0, 0, 0, 0);
    assert.deepEqual(pc.read(clock), input);

    clock.next();

    pc.write(clock, word0, 0, 0, 0);
    assert.deepEqual(pc.read(clock), input);

    clock.next();

    pc.write(clock, word0, 0, 0, 0);
    assert.deepEqual(pc.read(clock), input);
  });
});
