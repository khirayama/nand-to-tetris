import assert from 'power-assert';
import { Clock } from './Clock';
import { DFF } from './DFF.clock';

describe('DFF', function () {
  it('should return correct Binary', function () {
    const clock = new Clock();
    const dff = new DFF();
    dff.write(clock, 1);
    assert.equal(dff.read(clock), 0);
    clock.next();

    dff.write(clock, 1);
    assert.equal(dff.read(clock), 1);
    clock.next();

    dff.write(clock, 0);
    assert.equal(dff.read(clock), 1);
    clock.next();

    assert.equal(dff.read(clock), 0);
  });
});
