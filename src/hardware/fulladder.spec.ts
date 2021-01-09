import assert from 'power-assert';
import { fulladder } from './fulladder';

describe('FullAdder', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(fulladder(0, 0, 0), [0, 0]);
    assert.deepEqual(fulladder(0, 0, 1), [1, 0]);
    assert.deepEqual(fulladder(0, 1, 0), [1, 0]);
    assert.deepEqual(fulladder(0, 1, 1), [0, 1]);
    assert.deepEqual(fulladder(1, 0, 0), [1, 0]);
    assert.deepEqual(fulladder(1, 0, 1), [0, 1]);
    assert.deepEqual(fulladder(1, 1, 0), [0, 1]);
    assert.deepEqual(fulladder(1, 1, 1), [1, 1]);
  });
});
