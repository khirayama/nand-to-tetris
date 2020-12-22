import assert from 'power-assert';
import { Clock } from './Clock';
import { DFF } from './DFF';

const clock = new Clock();

describe('DFF', function () {
  it('should return correct Binary', function () {
    const dff = new DFF();
    dff.write(1, clock);
    assert.equal(dff.read(clock), 0);
    clock.next();

    dff.write(1, clock);
    assert.equal(dff.read(clock), 1);
    clock.next();

    dff.write(0, clock);
    assert.equal(dff.read(clock), 1);
    clock.next();

    assert.equal(dff.read(clock), 0);
  });
});
