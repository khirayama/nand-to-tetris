import assert from 'power-assert';
import { dmux } from './dmux';

describe('DMux', function () {
  it('should return collect Binary', function () {
    assert.deepEqual(dmux(0, 0), [0, 0]);
    assert.deepEqual(dmux(1, 0), [1, 0]);
    assert.deepEqual(dmux(0, 1), [0, 0]);
    assert.deepEqual(dmux(1, 1), [0, 1]);
  });
});
