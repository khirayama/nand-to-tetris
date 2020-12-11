import assert from 'power-assert';
import { halfadder } from './halfadder';

describe('HalfAdder', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(halfadder(0, 0), [0, 0]);
    assert.deepEqual(halfadder(1, 0), [1, 0]);
    assert.deepEqual(halfadder(0, 1), [1, 0]);
    assert.deepEqual(halfadder(1, 1), [0, 1]);
  });
});
