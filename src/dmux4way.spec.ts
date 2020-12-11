import assert from 'power-assert';
import { dmux4way } from './dmux4way';

describe('DMux4Way', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(dmux4way(0, [0, 0]), [0, 0, 0, 0]);
    assert.deepEqual(dmux4way(1, [0, 0]), [1, 0, 0, 0]);
    assert.deepEqual(dmux4way(1, [0, 1]), [0, 1, 0, 0]);
    assert.deepEqual(dmux4way(1, [1, 0]), [0, 0, 1, 0]);
    assert.deepEqual(dmux4way(1, [1, 1]), [0, 0, 0, 1]);
  });
});
