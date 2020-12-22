import assert from 'power-assert';
import { Clock } from './Clock';
import { Bit } from './Bit';

describe('Bit', function () {
  it('should return correct Binary', function () {
    const clock = new Clock();
    const bit = new Bit();

    bit.write(clock, 1, 0);
    assert.equal(bit.read(clock), 0);
    clock.next();

    bit.write(clock, 1, 0);
    assert.equal(bit.read(clock), 0);
    clock.next();

    bit.write(clock, 1, 1);
    assert.equal(bit.read(clock), 0);
    clock.next();

    bit.write(clock, 1, 0);
    assert.equal(bit.read(clock), 1);
    clock.next();

    bit.write(clock, 1, 0);
    assert.equal(bit.read(clock), 1);
  });
});
