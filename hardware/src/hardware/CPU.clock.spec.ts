import { Word, Binary15, Binary } from './types';
import { CPU } from './CPU.clock';

import { b } from './helpers';

import assert = require('assert');
import { Clock } from './Clock';

describe('CPU', function () {
  it('should work', function () {
    const clock = new Clock();
    const cpu = new CPU();

    const word0 = b<Word>('0000 0000 0000 0000');
    const word1 = b<Word>('1111 1111 1111 1111');
    const word015 = b<Binary15>('000 0000 0000 0000');

    // ROUND 1
    cpu.write(clock, word0, b<Word>('0011 0000 0011 1001'), 0);
    let [outM, writeM, addressM, pc] = cpu.read(clock);
    assert.deepEqual(outM, word0);
    assert.deepEqual(writeM, 0);
    assert.deepEqual(addressM, word015);
    assert.deepEqual(pc, word015);

    clock.next();

    // ROUND 2
    cpu.write(clock, word0, b<Word>('0011 0000 0011 1001'), 0);
    [outM, writeM, addressM, pc] = cpu.read(clock);
    // assert.deepEqual(outM, word0);
    // assert.deepEqual(writeM, 0);
    // assert.deepEqual(addressM, word015);
    // assert.deepEqual(pc, b<Binary15>('000 0000 0000 0001'));
    // assert.deepEqual(cpu.aRegister.read(clock), b<Word>('0011 0000 0011 1001'));
  });
});
